"""
Solution_LIP.py
=================================
SOLUTION — Programming Exercise : LIP Footstep Planning and DCM Balance Control
"""

import time
import numpy as np
from lip_env import LIPEnv

# =========================================================================
# LIP parameters
# =========================================================================
Z0    = 0.60
G     = 9.81
DT    = 0.01
OMEGA = np.sqrt(G / Z0)


# =========================================================================
# TODO 1 — SOLUTION
# =========================================================================
def lip_next_state(x, xdot, xbase, dt):
    """
    Exact LIP propagation via the closed-form solution.

        x(t) = A*exp(-w*t) + B*exp(w*t) + xbase
        A = (-xdot/w + x - xbase) / 2
        B = ( xdot/w + x - xbase) / 2
    """
    w   = OMEGA
    A   = (-xdot / w + x - xbase) / 2.0
    B   = ( xdot / w + x - xbase) / 2.0
    x_new    = A * np.exp(-w * dt) + B * np.exp(w * dt) + xbase
    xdot_new = -A * w * np.exp(-w * dt) + B * w * np.exp(w * dt)
    return x_new, xdot_new


# =========================================================================
# TODO 2 — SOLUTION
# =========================================================================
def compute_dcm(x, xdot):
    """
    Divergent Component of Motion:
        xi = x + xdot / omega
    """
    return x + xdot / OMEGA


# =========================================================================
# TODO 3 — SOLUTION
# =========================================================================
def dcm_footstep_target(x, xdot):
    """
    Step to xi: this freezes the DCM (xi_dot = 0) and lets the
    convergent component drive x -> xi -> stop.
    """
    return compute_dcm(x, xdot)


# =========================================================================
# Scenario 1 — Uncontrolled LIP
# =========================================================================
def scenario_uncontrolled():
    print("\n=== Scenario 1: Uncontrolled LIP (fixed foot) ===")
    print("Watch the CoM (orange) drift away from the fixed foot (green).\n")

    env = LIPEnv(z0=Z0, render=True)
    x, xdot = env.reset(x0=0.05, xdot0=0.0, x_base=0.0)
    xbase = 0.0

    t = 0.0
    while t < 3.0:
        x, xdot = lip_next_state(x, xdot, xbase, DT)
        state, done = env.step(xbase)
        xi = compute_dcm(x, xdot)
        env.draw_dcm(xi)
        t += DT
        if done:
            print("  CoM too far from foot – simulation stopped.")
            break

    print(f"  Final state: x={x:.3f} m, xdot={xdot:.3f} m/s")
    time.sleep(1.0)
    env.close()


# =========================================================================
# Scenario 2 — DCM-based recovery
# =========================================================================
def scenario_dcm_recovery():
    print("\n=== Scenario 2: DCM recovery from a push ===")
    print("Watch the robot place its foot at the DCM (purple) each step.\n")

    STEP_DURATION   = 0.40
    STEPS_PER_EPISODE = 8

    env = LIPEnv(z0=Z0, render=True)
    x0, xdot0 = 0.08, 0.30
    xbase = 0.0
    x, xdot = env.reset(x0=x0, xdot0=xdot0, x_base=xbase)

    print(f"  Initial state:  x={x:.3f} m, xdot={xdot:.3f} m/s")

    for step in range(STEPS_PER_EPISODE):
        # Place foot at the current DCM — the instantaneous capture point
        xbase = dcm_footstep_target(x, xdot)
        env.draw_footstep(xbase, current=True)
        env.draw_dcm(xbase)

        t_in_step = 0.0
        while t_in_step < STEP_DURATION:
            x, xdot = lip_next_state(x, xdot, xbase, DT)
            state, done = env.step(xbase)
            xi = compute_dcm(x, xdot)
            env.draw_dcm(xi)
            t_in_step += DT

        print(f"  After step {step+1}: x={x:.3f} m, xdot={xdot:.3f} m/s"
              f"  |  DCM xi={compute_dcm(x, xdot):.3f} m")

        if abs(xdot) < 0.01 and abs(x - xbase) < 0.005:
            print("  Robot has come to a stop.")
            break

    time.sleep(2.0)
    env.close()


# =========================================================================
# Scenario 3 — Walking
# =========================================================================
def scenario_walking():
    """
    Continuous walking: step short of xi by a fixed offset delta.
    The residual DCM divergence keeps the robot moving forward.
    """
    print("\n=== Scenario 3 : continuous walking ===\n")

    STEP_DURATION   = 0.35
    N_STEPS         = 12
    DELTA           = 0.06   # step short of xi by this amount

    env = LIPEnv(z0=Z0, render=True)
    x, xdot = env.reset(x0=0.05, xdot0=0.15, x_base=0.0)
    xbase   = 0.0

    for step in range(N_STEPS):
        xi    = compute_dcm(x, xdot)
        xbase = xi - DELTA          # step short → keeps moving
        env.draw_footstep(xbase, current=True)
        env.draw_dcm(xi)

        t_in_step = 0.0
        while t_in_step < STEP_DURATION:
            x, xdot = lip_next_state(x, xdot, xbase, DT)
            state, done = env.step(xbase)
            env.draw_dcm(compute_dcm(x, xdot))
            t_in_step += DT

        print(f"  Step {step+1:2d}: x={x:.3f} m  xdot={xdot:.3f} m/s")

    time.sleep(2.0)
    env.close()


# =========================================================================
# Entry point
# =========================================================================
if __name__ == "__main__":
    print("=" * 60)
    print("  Practical : LIP Footstep Planning & DCM Control  [SOLUTION]")
    print("=" * 60)

    scenario_uncontrolled()
    scenario_dcm_recovery()
    scenario_walking()
