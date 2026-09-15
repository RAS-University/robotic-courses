# dobot_dynamics_solution.py
#
# SOLUTION — Forward Dynamics Simulation Loop
# Webots controller for the Dobot robot

print("loading dobot_dynamics_solution.py...")

import math
import numpy as np
from controller import Robot

EVENT_LOOP_DT = 5  # ms

class DobotDynamics(Robot):
    def __init__(self):
        super().__init__()

        robot_name = self.getName()
        print("%s: dynamics controller connected." % robot_name)

        # Robot physical parameters
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

        # Switch to torque control
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
        t1, t2 = theta
        M  = np.zeros((2, 2))

        c2 = np.cos(t2)

        M[0, 0] = self.m1*self.L1**2 + self.m2*(self.L1**2 + 2*self.L1*self.L2*c2 + self.L2**2)
        M[1, 1] = self.m2 * self.L2**2
        M[0, 1] = self.m2 * (self.L1*self.L2*c2 + self.L2**2)
        M[1, 0] = M[0, 1]

        return M

    #================================================================
    def bias_torque(self, theta, dtheta):
        t1, t2   = theta
        dt1, dt2 = dtheta
        h = np.zeros(2)

        s2 = np.sin(t2)

        # Coriolis/centripetal
        c1 = -self.m2 * self.L1 * self.L2 * s2 * (2*dt1*dt2 + dt2**2)
        c2 =  self.m2 * self.L1 * self.L2 * s2 * dt1**2

        # Gravity
        g1 = (self.m1 + self.m2)*self.L1*self.g*np.cos(t1) + self.m2*self.L2*self.g*np.cos(t1+t2)
        g2 =  self.m2*self.L2*self.g*np.cos(t1+t2)

        h[0] = c1 + g1
        h[1] = c2 + g2

        return h

    #================================================================
    def total_energy(self, theta, dtheta):
        t1, t2 = theta

        M = self.mass_matrix(theta)
        K = 0.5 * dtheta @ M @ dtheta

        h1 = self.L1 * np.sin(t1)
        h2 = self.L1 * np.sin(t1) + self.L2 * np.sin(t1 + t2)

        P = self.m1*self.g*h1 + self.m2*self.g*h2

        return K + P

    #================================================================
    def run(self):
        while self.step(EVENT_LOOP_DT) != -1:

            theta = np.array([
                self.sensor1.getValue(),
                self.sensor2.getValue()
            ])

            MODE = 3  # change this: 1=freefall, 2=driven, 3=natural pendulum
            t = self.getTime()

            if MODE == 1:
                # Free fall — watch energy conservation
                tau = np.zeros(2)

            elif MODE == 2:
                # Driven vertical pendulum
                tau = np.array([0.0, np.sin(t * 1.5) * 5.0])

            elif MODE == 3:
                # Natural pendulum around equilibrium
                theta2_eq = 0.5
                tau = np.array([0.0, -8.0 * (theta[1] - theta2_eq)])
            

            # Forward dynamics
            M       = self.mass_matrix(theta)
            h       = self.bias_torque(theta, self.dtheta)
            ddtheta = np.linalg.solve(M, tau - h)

            # Euler integration
            self.dtheta += ddtheta * self.dt

            # Apply torques
            self.motor1.setTorque(tau[0])
            self.motor2.setTorque(tau[1])

            # Energy log
            t = self.getTime()
            E = self.total_energy(theta, self.dtheta)
            self.time_list.append(t)
            self.energy_list.append(E)
            print(f"t={t:.2f}s | θ={np.round(theta,3)} | E={E:.4f} J")


################################################################
if __name__ == "__main__":
    robot = DobotDynamics()
    robot.run()