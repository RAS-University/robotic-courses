# dobot_dynamics.py
#
# Webots controller for the Dobot robot — Dynamics Exercise
# Goal: implement the forward dynamics simulation loop
#
#   θ̈ = M(θ)⁻¹ (τ - c(θ,θ̇) - g(θ))
#
# and validate using energy conservation.

print("loading dobot_dynamics.py...")

import math
import numpy as np
from controller import Robot

EVENT_LOOP_DT = 5  # ms

class DobotDynamics(Robot):
    def __init__(self):
        super().__init__()

        robot_name = self.getName()
        print("%s: dynamics controller connected." % robot_name)

        # Robot physical parameters (2-link planar approximation)
        self.m1 = 0.5    # mass of link 1 [kg]
        self.m2 = 0.3    # mass of link 2 [kg]
        self.L1 = 0.135  # length of link 1 [m]
        self.L2 = 0.147  # length of link 2 [m]
        self.g  = 9.81   # gravity [m/s²]

        # Fetch joint motors
        self.motor1 = self.getDevice('motor1')
        self.motor2 = self.getDevice('motor2')

        # Fetch position sensors
        self.sensor1 = self.getDevice('joint1')
        self.sensor2 = self.getDevice('joint2')
        self.sensor1.enable(EVENT_LOOP_DT)
        self.sensor2.enable(EVENT_LOOP_DT)

        # Switch to torque control (disable position control)
        self.motor1.setPosition(float('inf'))
        self.motor2.setPosition(float('inf'))
        self.motor1.setVelocity(0)
        self.motor2.setVelocity(0)

        # Integration state
        self.dtheta = np.zeros(2)
        self.dt     = EVENT_LOOP_DT / 1000.0

        # Energy logging
        self.time_list   = []
        self.energy_list = []

    #================================================================
    def mass_matrix(self, theta):
        """Compute the 2x2 configuration-dependent mass matrix M(θ).

        Recall from the mathematical exercises (Exercise 1f):
            τ = M(θ)θ̈ + c(θ,θ̇) + g(θ)

        M maps joint accelerations to required torques (inertial terms).
        It depends only on θ2 through cos(θ2).
        """
        t1, t2 = theta
        M = np.zeros((2, 2))

        # ── COMPLETE THESE LINES OF CODE ────────────────────────────
        # Hint: c2 = cos(θ2)
        c2 = __________

        # M[0,0]: total inertia of both links about joint 1
        M[0, 0] = __________

        # M[1,1]: inertia of link 2 about joint 2
        M[1, 1] = __________

        # M[0,1] = M[1,0]: coupling term (symmetric matrix)
        M[0, 1] = __________
        M[1, 0] = __________
        # ────────────────────────────────────────────────────────────

        return M 

    #================================================================
    def bias_torque(self, theta, dtheta):
        """Compute h(θ,θ̇) = c(θ,θ̇) + g(θ).

        c(θ,θ̇): Coriolis and centripetal torques
            - τ1 gets a Coriolis term  proportional to θ̇1*θ̇2
            - τ2 gets a centripetal term proportional to θ̇1²

        g(θ): gravity compensation torques at each joint
            - torque needed to hold each link against gravity
        """
        t1, t2   = theta
        dt1, dt2 = dtheta
        h = np.zeros(2)

        # ── COMPLETE THESE LINES OF CODE ────────────────────────────
        # Hint: s2 = sin(θ2)
        s2  = __________

        # Coriolis term for joint 1:
        c1  = __________

        # Centripetal term for joint 2:
        c2  = __________

        # Gravity torque at joint 1:
        g1  = __________

        # Gravity torque at joint 2:
        g2  = __________

        h[0] = c1 + g1
        h[1] = c2 + g2
        # ────────────────────────────────────────────────────────────

        return h

    #================================================================
    def total_energy(self, theta, dtheta):
        """Compute total mechanical energy E = K + P.
        Recall
        K = ½ θ̇ᵀ M(θ) θ̇       (kinetic energy)
        P = m1*g*h1 + m2*g*h2  (potential energy)

        With τ=0, E should remain approximately constant.
        Use this to validate your implementation.
        """
        t1, t2 = theta

        # ── COMPLETE THESE LINES OF CODE ────────────────────────────
        # Kinetic energy:
        M = self.mass_matrix(theta)
        K = __________

        # Height of CoM of link 1:
        h1 = __________

        # Height of CoM of link 2:
        h2 = __________

        # Potential energy:
        P  = __________
        # ────────────────────────────────────────────────────────────

        return K + P

    #================================================================
    def run(self):
        while self.step(EVENT_LOOP_DT) != -1:

            # Read current joint angles from sensors
            theta = np.array([
                self.sensor1.getValue(),
                self.sensor2.getValue()
            ])

            # ── COMPLETE THIS LINE OF CODE ───────────────────────────
            # Apply zero torque: let the robot fall freely under gravity.
            # Once working, try: tau = np.array([0.5, 0.0]) and observe which joint moves.
            tau = __________
            # ────────────────────────────────────────────────────────

            # Forward dynamics: compute joint accelerations
            M       = self.mass_matrix(theta)
            h       = self.bias_torque(theta, self.dtheta)
            ddtheta = np.linalg.solve(M, tau - h)

            # Euler integration
            self.dtheta += ddtheta * self.dt

            # Apply torques to motors
            self.motor1.setTorque(tau[0])
            self.motor2.setTorque(tau[1])

            # Log and print energy (should stay ~constant with tau=0)
            t = self.getTime()
            E = self.total_energy(theta, self.dtheta)
            self.time_list.append(t)
            self.energy_list.append(E)
            print(f"t={t:.2f}s | θ={np.round(theta,3)} | E={E:.4f} J")


################################################################
if __name__ == "__main__":
    robot = DobotDynamics()
    robot.run()