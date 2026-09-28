"""
Exercise_LIP.py
========================
Programming Exercise : LIP Footstep Planning and DCM Balance Control
-----------------------------------------------------------------------
In this practical you will:

  1. Implement the LIP closed-form solution to propagate the CoM state
     analytically over one footstep.
  2. Observe how the CoM diverges exponentially when no footstep
     correction is applied.
  3. Implement the DCM-based footstep rule that brings the robot to a
     controlled stop from an arbitrary initial push.

The visualisation runs in PyBullet:
  - Orange sphere  = Center of Mass (CoM)
  - Dark line      = telescopic leg connecting foot to CoM
  - Green disc     = current support foot
  - Grey disc(s)   = past footsteps
  - Purple line    = Divergent Component of Motion (DCM)
  - Blue trace     = CoM ground-projection trajectory

Run this file directly:
    python Exercise_LIP.py

Requirements: pybullet, pybullet_utils, numpy
"""

import time
import numpy as np
from lip_env import LIPEnv

# =========================================================================
# LIP parameters  (do not modify)
# =========================================================================
Z0    = 0.60    # constant CoM height          [m]
G     = 9.81    # gravitational acceleration   [m/s^2]
DT    = 0.01    # simulation timestep          [s]
OMEGA = np.sqrt(G / Z0)   # LIP characteristic frequency [rad/s]


# =========================================================================
# TODO 1 : LIP closed-form propagation
# =========================================================================
def lip_next_state(x, xdot, xbase, dt):
    """
    Propagate the LIP state (x, xdot) forward by one timestep dt,
    with the support foot at xbase.

    Args:
        x     (float): current CoM position [m]
        xdot  (float): current CoM velocity [m/s]
        xbase (float): support foot position [m]
        dt    (float): timestep [s]

    Returns:
        x_new    (float): CoM position  after dt [m]
        xdot_new (float): CoM velocity after dt [m/s]
    """
    # ---- TODO 1: compute A, B, x_new, xdot_new ----
    # A = ...
    # B = ...
    # x_new    = ...
    # xdot_new = ...

    raise NotImplementedError("TODO 1: implement lip_next_state")
    return x_new, xdot_new


# =========================================================================
# TODO 2 : Divergent Component of Motion (DCM)
# =========================================================================
def compute_dcm(x, xdot):
    """
    Compute the instantaneous Divergent Component of Motion:

        xi = x + xdot / omega

    This is the point where the robot could step to come to a
    complete stop (the instantaneous capture point).

    Args:
        x    (float): CoM position  [m]
        xdot (float): CoM velocity [m/s]

    Returns:
        xi (float): DCM value [m]
    """
    # ---- TODO 2: compute xi ----
    raise NotImplementedError("TODO 2: implement compute_dcm")
    return xi


# =========================================================================
# TODO 3 : DCM footstep rule
# =========================================================================
def dcm_footstep_target(x, xdot):
    """
    Return the footstep position that would bring the robot to a
    complete stop if placed at the START of the next step.

    By the DCM derivation: setting  xbase = xi  makes xi_dot = 0,
    so xi freezes and x converges to xi.

    In practice you may also implement a *walking* controller by
    stepping slightly short of xi (see the going-further section
    in the course). For this exercise simply return xi.

    Args:
        x    (float): CoM position  [m]
        xdot (float): CoM velocity [m/s]

    Returns:
        xbase_target (float): desired next footstep position [m]
    """
    # ---- TODO 3: return the footstep target ----
    raise NotImplementedError("TODO 3: implement dcm_footstep_target")
    return xbase_target


# =========================================================================
# Scenario 1 : Uncontrolled LIP (fixed footstep, CoM diverges)
# =========================================================================
def scenario_uncontrolled():
    """
    Simulate the LIP with a *fixed* support foot at x_base = 0.
    Initial CoM position: x0 = 0.05 m  (small offset from above foot)
    Initial velocity:     xdot0 = 0.0 m/s

    Observe the growing exponential: the CoM drifts further and
    further from the foot even though no external force is applied.
    This illustrates why active footstep planning is necessary.
    """
    print("\n=== Scenario 1: Uncontrolled LIP (fixed foot) ===")
    print("Watch the CoM (orange) drift away from the fixed foot (green).\n")

    env = LIPEnv(z0=Z0, render=True)
    x, xdot = env.reset(x0=0.05, xdot0=0.0, x_base=0.0)
    xbase = 0.0

    t = 0.0
    while t < 3.0:
        # ---------- TODO 1 in use ----------
        x, xdot = lip_next_state(x, xdot, xbase, DT)
        state, done = env.step(xbase)
        # -----------------------------------
        xi = compute_dcm(x, xdot)     # TODO 2 in use
        env.draw_dcm(xi)
        t += DT
        if done:
            print("  CoM too far from foot : simulation stopped.")
            break

    print(f"  Final state: x={x:.3f} m, xdot={xdot:.3f} m/s")
    time.sleep(1.0)
    env.close()


# =========================================================================
# Scenario 2 — DCM-based recovery from a push
# =========================================================================
def scenario_dcm_recovery():
    """
    The robot receives a forward push (x0=0.08 m, xdot0=0.30 m/s).
    At the end of each step (every STEP_DURATION seconds), the
    controller computes the next footstep using the DCM rule
    (TODO 3) and places the foot there.

    Observe: after a few steps, the CoM velocity decays to zero and
    the robot comes to a controlled stop.
    """
    print("\n Scenario 2: DCM recovery from a push ")
    print("Watch the robot place its foot at the DCM (purple) each step.\n")

    STEP_DURATION = 0.40    # seconds per footstep
    STEPS_PER_EPISODE = 8

    env = LIPEnv(z0=Z0, render=True)

    # Initial push
    x0    = 0.08
    xdot0 = 0.30
    xbase = 0.0
    x, xdot = env.reset(x0=x0, xdot0=xdot0, x_base=xbase)

    print(f"  Initial state:  x={x:.3f} m, xdot={xdot:.3f} m/s")

    for step in range(STEPS_PER_EPISODE):
        # ---------- TODO 3 in use ----------
        xbase = dcm_footstep_target(x, xdot)
        # -----------------------------------
        env.draw_footstep(xbase, current=True)
        env.draw_dcm(xbase)

        # Simulate one full footstep
        t_in_step = 0.0
        while t_in_step < STEP_DURATION:
            # ---------- TODO 1 in use ----------
            x, xdot = lip_next_state(x, xdot, xbase, DT)
            state, done = env.step(xbase)
            # -----------------------------------
            xi = compute_dcm(x, xdot)   # TODO 2 in use
            env.draw_dcm(xi)
            t_in_step += DT

        print(f"  After step {step+1}: x={x:.3f} m, xdot={xdot:.3f} m/s"
              f"  |  DCM xi={compute_dcm(x, xdot):.3f} m")

        # Stop if effectively at rest
        if abs(xdot) < 0.01 and abs(x - xbase) < 0.005:
            print("  Robot has come to a stop.")
            break

    time.sleep(2.0)
    env.close()

# =========================================================================
def scenario_walking():
    """
    Instead of stopping, implement a *walking* controller:
    step slightly short of xi so that the CoM keeps moving forward
    at a desired average speed.

    Hint: if you set  xbase = xi - delta  for some small delta > 0,
    the DCM will not freeze but will oscillate around a moving target,
    producing steady walking. Experiment with delta and STEP_DURATION.
    """
    print("\n=== Scenario 3 (optional): continuous walking ===")
    print("Implement this yourself – see the docstring for hints.\n")
    # Your code here
    pass


# =========================================================================
# Entry point
# =========================================================================
if __name__ == "__main__":
    print("=" * 60)
    print("  Practical 3 – LIP Footstep Planning & DCM Control")
    print("=" * 60)

    # Run required scenarios sequentially, the window will refresh from one scenario to the next.
    scenario_uncontrolled()
    scenario_dcm_recovery()
    scenario_walking()
