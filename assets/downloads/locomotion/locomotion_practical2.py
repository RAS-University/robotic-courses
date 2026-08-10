# Exercise 2 - Single-Leg Hopping
#
# Combine the Jacobian, Cartesian PD, and force control into a hopping controller

from env.leg_gym_env import LegGymEnv
import numpy as np
import matplotlib.pyplot as plt
from check_hopping import check_hopping

# --- Jacobian (provided) ---------------------------------------------
# q = [q0, q1]: q0 = absolute thigh angle from vertical, q1 = relative knee angle.
# x = -(l1*sin(q0) + l2*sin(q0+q1)), z = -(l1*cos(q0) + l2*cos(q0+q1))
# Verified vs. finite differences over 5000 random configs (max err ~8e-11).
L1 = 0.209
L2 = 0.195


def jacobian_rel(q, l1=L1, l2=L2):
    q0, q1 = q
    dx_dq0 = -(l1 * np.cos(q0) + l2 * np.cos(q0 + q1))
    dx_dq1 = -l2 * np.cos(q0 + q1)
    dz_dq0 = l1 * np.sin(q0) + l2 * np.sin(q0 + q1)
    dz_dq1 = l2 * np.sin(q0 + q1)
    J = np.array([[dx_dq0, dx_dq1], [dz_dq0, dz_dq1]])
    x = -(l1 * np.sin(q0) + l2 * np.sin(q0 + q1))
    z = -(l1 * np.cos(q0) + l2 * np.cos(q0 + q1))
    return J, np.array([x, z])


env = LegGymEnv(render=True,
                on_rack=False,
                motor_control_mode='TORQUE',
                action_repeat=1,
                # record_video=True
                )

NUM_SECONDS = 5
NUM_STEPS = NUM_SECONDS * 1000

SINGLE_JUMP = False   # False = continuous hopping, True = one jump

ROBOT_MASS = 2.429   # kg, update to match your robot
GRAVITY = 9.81

kpCartesian = np.diag([500, 300])
kdCartesian = np.diag([30, 20])

# --- [Exercise 1] Force profile -------------------------------------------
# Design force_traj_z (and optionally force_traj_x) from Fz_max, f, t.
# Hint: clipped sine wave -- force should only push (<= 0), never pull.

def ik_geometrical(xz, angleMode="<", l1=0.209, l2=0.195):
    """Law-of-cosines IK. jacobian_rel's FK was reverse-engineered to match this."""
    q = np.zeros(2)
    sign = -1 if angleMode == "<" else 1
    q[1] = None # TODO: fill in the formula for q[1] using the law of cosines
    q[0] = None # TODO: fill in the formula for q[0]
    return q


t = np.linspace(0, NUM_SECONDS, NUM_STEPS + 1)

Fx_max = 40
Fz_max = 90
f = 1.5

if SINGLE_JUMP: # (1) sets Fz_max, f, gains
    kpCartesian = None # TODO
    kdCartesian = None  # TODO
    Fx_max = 0
    Fz_max = 2000
    f = 1.05

force_traj_x = np.zeros(len(t))   # TODO (fill the force trajectory with the right formula instead of zeros)
force_traj_x[force_traj_x > 0] = 0


if SINGLE_JUMP:
    # TODO: after the first push, hold ~ -ROBOT_MASS*GRAVITY to stay upright
    pass

force_traj_z = np.zeros(len(t))   # TODO (fill the force trajectory with the right formula instead of zeros)
force_traj_z[force_traj_z > 0] = 0

# --- Control loop -------------------------------------------------------
nominal_foot_pos = np.array([0.0, -0.2])
nominal_foot_q = ik_geometrical(nominal_foot_pos)

max_base_z = 0
nominal_base_z = None
base_z_history = np.zeros(NUM_STEPS)

for i in range(NUM_STEPS):
    tau = np.zeros(2)   # recompute each step, do not accumulate

    J, ee_pos_legFrame = jacobian_rel(env.robot.GetMotorAngles())
    velocity = J @ env.robot.GetMotorVelocities()

    # [TODO 2] Add Cartesian PD control
    tau += np.zeros(2)

    # [TODO 3] Add Force profile control
    tau += np.zeros(2)

    env.step(tau)

    base_pos = env.robot.GetBasePosition()
    base_z_history[i] = base_pos[2]
    if nominal_base_z is None:
        nominal_base_z = base_pos[2]
    if base_pos[2] > max_base_z:
        max_base_z = base_pos[2]

jump_height = max_base_z - nominal_base_z
print(f"Nominal base height: {nominal_base_z:.3f} m")
print(f"Peak base height:    {max_base_z:.3f} m")
print(f"Jump height:         {jump_height:.3f} m")

# --- [TODO 4] Plots -------------------------------------------------------
plt.figure()
plt.plot(t, force_traj_z)
plt.xlabel('Time (s)'); plt.ylabel('Fz (N)'); plt.grid()

plt.figure()
plt.plot(t, force_traj_x)
plt.xlabel('Time (s)'); plt.ylabel('Fx (N)'); plt.grid()

# TODO: plot base_z_history vs. time

plt.show()

check_hopping(base_z_history, nominal_base_z, single_jump=SINGLE_JUMP)