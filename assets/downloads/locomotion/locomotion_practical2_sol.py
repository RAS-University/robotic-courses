# locomotion_practical2 - Single-Leg Hopping - REFERENCE SOLUTION 

from env.leg_gym_env import LegGymEnv
import numpy as np
import matplotlib.pyplot as plt
from check_hopping import check_hopping

# --- Jacobian (same as practical4_hopping.py) -----------------------------
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


env = LegGymEnv(render=True, on_rack=True, motor_control_mode='TORQUE', action_repeat=1)

NUM_SECONDS = 5
NUM_STEPS = NUM_SECONDS * 1000
SINGLE_JUMP = True

ROBOT_MASS = 2.429
GRAVITY = 9.81

kpCartesian = np.diag([500, 300])
kdCartesian = np.diag([30, 20])
kpJoint = np.array([1, 1])
kdJoint = np.array([0.1, 0.1])


def ik_geometrical(xz, angleMode="<", l1=0.209, l2=0.195):
    """Law-of-cosines IK. jacobian_rel's FK was reverse-engineered to match this."""
    q = np.zeros(2)
    sign = -1 if angleMode == "<" else 1
    q[1] = sign * np.arccos((xz[0]**2 + xz[1]**2 - l1**2 - l2**2) / (2 * l1 * l2))
    q[0] = np.arctan2(-xz[0], -xz[1]) - np.arctan2(l2 * np.sin(q[1]), l1 + l2 * np.cos(q[1]))
    return q


t = np.linspace(0, NUM_SECONDS, NUM_STEPS + 1)
Fx_max = 40
Fz_max = 90
f = 1.5

if SINGLE_JUMP:  # (1) sets Fz_max, f, gains
    kpCartesian = np.diag([200, 200])
    kdCartesian = np.diag([10, 10])
    Fx_max = 0
    Fz_max = 120
    f = 0.6

force_traj_z = Fz_max * np.sin(2 * np.pi * f * t)
force_traj_z[force_traj_z > 0] = 0
if SINGLE_JUMP: # (2) needs force_traj_z from above
    force_traj_z[round(1 / f / 0.001):] = -ROBOT_MASS * GRAVITY

force_traj_x = Fx_max * np.sin(2 * np.pi * f * t)
force_traj_x[force_traj_x > 0] = 0

nominal_foot_pos = np.array([0.0, -0.2])
nominal_foot_q = ik_geometrical(nominal_foot_pos)

max_base_z = 0
nominal_base_z = None
base_z_history = np.zeros(NUM_STEPS)

for i in range(NUM_STEPS):
    tau = np.zeros(2)

    J, ee_pos_legFrame = jacobian_rel(env.robot.GetMotorAngles())
    velocity = J @ env.robot.GetMotorVelocities()

    tau += J.T @ (kpCartesian @ (nominal_foot_pos - ee_pos_legFrame) # tau += J.T @ (Kp(p_d-p) + Kd(v_d-v))
                  + kdCartesian @ (0 - velocity))
    tau += kpJoint * (nominal_foot_q - env.robot.GetMotorAngles()) \
         + kdJoint * (0 - env.robot.GetMotorVelocities())
    tau += J.T @ np.array([force_traj_x[i], force_traj_z[i]]) # tau += J.T @ F

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

plt.figure(); plt.plot(t, force_traj_z); plt.xlabel('Time (s)'); plt.ylabel('Fz (N)'); plt.grid()
plt.figure(); plt.plot(t, force_traj_x); plt.xlabel('Time (s)'); plt.ylabel('Fx (N)'); plt.grid()
plt.figure(); plt.plot(t[:-1], base_z_history)
plt.axhline(nominal_base_z, color='gray', linestyle='--')
plt.xlabel('Time (s)'); plt.ylabel('Base height z (m)'); plt.grid()
plt.show()

check_hopping(base_z_history, nominal_base_z, single_jump=SINGLE_JUMP)
