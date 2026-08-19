"""
lip_env.py
==========
PyBullet environment for the LIP footstep-planning practical.

The scene contains:
  - A floating point mass (sphere) that obeys exact LIP dynamics
    (constant CoM height z0, horizontal motion driven by
     x_ddot = (g / z0) * (x - x_base)).
  - A telescopic leg visualised as a thin cylinder updated every step.
  - A ground plane with footstep markers.

The physics are computed analytically (not from PyBullet's solver),
so the LIP trajectory is exact. PyBullet is used purely for
real-time 3D visualisation.

Public API
----------
    env = LIPEnv(z0=0.6, render=True)
    state = env.reset(x0, xdot0, x_base)
    state, done = env.step(x_base)          # one simulation step
    env.draw_footstep(x_base)               # mark a footstep on the ground
    env.draw_dcm(xi)                        # draw the DCM target
    env.close()
"""

import time
import numpy as np
import pybullet
import pybullet_data
import pybullet_utils.bullet_client as bc


# ---------------------------------------------------------------------------
# Physical constants and scene parameters
# ---------------------------------------------------------------------------
G = 9.81            # gravitational acceleration (m/s^2)
DT = 0.01           # simulation timestep (s)
VIZ_DT = 0.01       # wall-clock sleep per step when rendering (s)

# Colours (RGBA)
COL_MASS      = [0.90, 0.45, 0.05, 1.0]   # orange  – CoM sphere
COL_LEG       = [0.20, 0.20, 0.20, 0.8]   # dark grey – telescopic leg
COL_FOOT_NEW  = [0.12, 0.60, 0.35, 1.0]   # green – current support foot
COL_FOOT_OLD  = [0.70, 0.70, 0.70, 0.6]   # grey  – past footsteps
COL_DCM       = [0.55, 0.10, 0.80, 1.0]   # purple – DCM marker
COL_TRAJECTORY= [0.20, 0.45, 0.90, 1.0]   # blue  – CoM ground trace
COL_GROUND    = [0.95, 0.95, 0.95, 1.0]   # near-white ground


class LIPEnv:
    """
    Minimal LIP visualisation environment.

    Parameters
    ----------
    z0 : float
        Constant CoM height (m).  Default 0.60 m.
    render : bool
        Open a GUI window when True.
    """

    def __init__(self, z0: float = 0.60, render: bool = True):
        self.z0 = float(z0)
        self.omega = np.sqrt(G / z0)          # LIP characteristic frequency
        self._render = render
        self._dt = DT

        # Connect to PyBullet
        if render:
            self._p = bc.BulletClient(connection_mode=pybullet.GUI)
            self._configure_camera()
        else:
            self._p = bc.BulletClient()

        self._setup_scene()

        # State: (x, x_dot)
        self._x     = 0.0
        self._xdot  = 0.0
        self._xbase = 0.0
        self._t     = 0.0

        # Debug-line IDs so we can remove them
        self._leg_line_id     = None
        self._dcm_line_id     = None
        self._trace_line_id   = None
        self._prev_com_xy     = None
        self._footstep_ids    = []           # (sphere_body_id, is_current)


    # ------------------------------------------------------------------
    # Public interface
    # ------------------------------------------------------------------

    def reset(self, x0: float = 0.05, xdot0: float = 0.10,
              x_base: float = 0.0):
        """
        Reset the CoM state and place the support foot.

        Parameters
        ----------
        x0     : initial horizontal CoM position (m)
        xdot0  : initial horizontal CoM velocity (m/s)
        x_base : support foot x-position (m)

        Returns
        -------
        np.ndarray  [x, x_dot]
        """
        self._x     = float(x0)
        self._xdot  = float(xdot0)
        self._xbase = float(x_base)
        self._t     = 0.0
        self._prev_com_xy = None

        # clear old footstep markers
        for fid in self._footstep_ids:
            self._p.removeBody(fid)
        self._footstep_ids = []

        self.draw_footstep(x_base, current=True)
        self._update_visuals()
        return self._get_state()

    def step(self, x_base: float):
        """
        Advance simulation by one timestep.

        Applies the exact LIP analytical solution for one dt step,
        then updates the PyBullet visualisation.

        Parameters
        ----------
        x_base : support foot x-position this step (m)

        Returns
        -------
        state : np.ndarray [x, x_dot]
        done  : bool  (True when |x| > 3 m, i.e. fallen off-screen)
        """
        self._xbase = float(x_base)
        self._x, self._xdot = self._lip_step(self._x, self._xdot,
                                              self._xbase, self._dt)
        self._t += self._dt
        self._update_visuals()

        if self._render:
            time.sleep(VIZ_DT)

        done = abs(self._x - self._xbase) > 3.0
        return self._get_state(), done

    def draw_footstep(self, x: float, current: bool = False):
        """
        Place a flat disc on the ground to mark a footstep.

        Parameters
        ----------
        x       : x-position of the footstep (m)
        current : if True, colour it green; grey otherwise
        """
        # colour old current footstep grey
        if current and len(self._footstep_ids) > 0:
            last_id = self._footstep_ids[-1]
            self._p.changeVisualShape(last_id, -1,
                                      rgbaColor=COL_FOOT_OLD)

        col = COL_FOOT_NEW if current else COL_FOOT_OLD

        vis  = self._p.createVisualShape(
                    self._p.GEOM_CYLINDER,
                    radius=0.06, length=0.004,
                    rgbaColor=col)
        body = self._p.createMultiBody(
                    baseMass=0,
                    baseVisualShapeIndex=vis,
                    basePosition=[x, 0, 0.002])
        self._footstep_ids.append(body)

    def draw_dcm(self, xi: float):
        """
        Draw a purple vertical line at the current DCM position.

        Parameters
        ----------
        xi : DCM value (m)
        """
        if self._dcm_line_id is not None:
            self._p.removeUserDebugItem(self._dcm_line_id)
        self._dcm_line_id = self._p.addUserDebugLine(
            [xi, 0, 0], [xi, 0, self.z0 * 0.6],
            lineColorRGB=COL_DCM[:3], lineWidth=3)

    def get_state(self):
        """Return current state [x, x_dot]."""
        return self._get_state()

    def compute_dcm(self):
        """
        Compute the current Divergent Component of Motion.

            xi = x + x_dot / omega

        Returns
        -------
        float
        """
        return self._x + self._xdot / self.omega

    def close(self):
        """Disconnect from PyBullet."""
        self._p.disconnect()


    # ------------------------------------------------------------------
    # LIP dynamics
    # ------------------------------------------------------------------

    def _lip_step(self, x, xdot, xbase, dt):
        """
        Exact LIP integration over one timestep dt.

        From the closed-form solution:
            x(t) = A*exp(-omega*t) + B*exp(omega*t) + xbase
        with A, B determined by (x0, xdot0).
        """
        w   = self.omega
        A   = (-xdot / w + x - xbase) / 2.0
        B   = ( xdot / w + x - xbase) / 2.0
        x_new    = A * np.exp(-w * dt) + B * np.exp(w * dt) + xbase
        xdot_new = -A * w * np.exp(-w * dt) + B * w * np.exp(w * dt)
        return x_new, xdot_new


    # ------------------------------------------------------------------
    # Scene setup
    # ------------------------------------------------------------------

    def _setup_scene(self):
        self._p.resetSimulation()
        self._p.setGravity(0, 0, -G)
        self._p.setTimeStep(self._dt)

        # Ground plane
        self._plane = self._p.loadURDF(
            pybullet_data.getDataPath() + "/plane.urdf",
            basePosition=[0, 0, 0])
        self._p.changeVisualShape(self._plane, -1, rgbaColor=COL_GROUND)

        # CoM sphere (mass = 0 → kinematic, moved analytically)
        com_vis = self._p.createVisualShape(
            self._p.GEOM_SPHERE, radius=0.06, rgbaColor=COL_MASS)
        self._com_body = self._p.createMultiBody(
            baseMass=0,
            baseVisualShapeIndex=com_vis,
            basePosition=[0, 0, self.z0])

        # Telescopic leg: updated as a debug line each step
        self._leg_line_id = self._p.addUserDebugLine(
            [0, 0, 0], [0, 0, self.z0],
            lineColorRGB=COL_LEG[:3], lineWidth=3)

        if self._render:
            self._p.configureDebugVisualizer(
                self._p.COV_ENABLE_GUI, 0)
            self._p.configureDebugVisualizer(
                self._p.COV_ENABLE_SHADOWS, 1)

        # Draw the ground-level x-axis as a thin reference line
        self._p.addUserDebugLine(
            [-3, 0, 0.001], [3, 0, 0.001],
            lineColorRGB=[0.8, 0.8, 0.8], lineWidth=1)


    # ------------------------------------------------------------------
    # Visualisation helpers
    # ------------------------------------------------------------------

    def _update_visuals(self):
        """Move the CoM sphere and redraw the telescopic leg."""
        com_pos = [self._x, 0, self.z0]

        # Move CoM sphere
        self._p.resetBasePositionAndOrientation(
            self._com_body, com_pos, [0, 0, 0, 1])

        # Redraw telescopic leg (foot to CoM)
        foot_pos = [self._xbase, 0, 0.001]
        if self._leg_line_id is not None:
            self._p.removeUserDebugItem(self._leg_line_id)
        self._leg_line_id = self._p.addUserDebugLine(
            foot_pos, com_pos,
            lineColorRGB=COL_LEG[:3], lineWidth=3)

        # Draw CoM ground trace (faint blue line from previous position)
        cur_xy = [self._x, 0, 0.005]
        if self._prev_com_xy is not None:
            if self._trace_line_id is not None:
                self._p.removeUserDebugItem(self._trace_line_id)
            self._trace_line_id = self._p.addUserDebugLine(
                self._prev_com_xy, cur_xy,
                lineColorRGB=COL_TRAJECTORY[:3], lineWidth=1,
                lifeTime=8.0)
        self._prev_com_xy = cur_xy

        # Step the sim once so PyBullet updates its display
        self._p.stepSimulation()

    def _configure_camera(self):
        self._p.configureDebugVisualizer(
            self._p.COV_ENABLE_RGB_BUFFER_PREVIEW, 0)
        self._p.configureDebugVisualizer(
            self._p.COV_ENABLE_DEPTH_BUFFER_PREVIEW, 0)
        self._p.configureDebugVisualizer(
            self._p.COV_ENABLE_SEGMENTATION_MARK_PREVIEW, 0)
        self._p.resetDebugVisualizerCamera(
            cameraDistance=2.5,
            cameraYaw=0,
            cameraPitch=-18,
            cameraTargetPosition=[0, 0, 0.3])

    def _get_state(self):
        return np.array([self._x, self._xdot])
