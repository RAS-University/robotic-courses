# dobot.py
#
# Sample Webots controller file for driving the Dobot robot
# arm model.

# No copyright, 2022, Garth Zeglin.  This file is
# explicitly placed in the public domain.

print("loading dobot.py...")

# Import standard Python modules.
import math

# Import the Webots simulator API.
from controller import Robot

# Define the time step in milliseconds between controller updates.
EVENT_LOOP_DT = 200

def deg2rad(deg):
    return deg*(math.pi/180.0)

def rad2deg(rad):
    return rad*(180.0/math.pi)

################################################################
# The sample controller is defined as an class which is then instanced as a
# singleton control object.  This is conventional Python practice and also
# simplifies the implementation of the Arduino interface which connects this
# code to physical hardware.

class Dobot(Robot):
    def __init__(self):

        # Initialize the superclass which implements the Robot API.
        super().__init__()

        robot_name = self.getName()
        print("%s: controller connected." % (robot_name))

        # Define kinematic properties of arm.  This should be kept in sync with
        # the simulation geometry.  The following numbers are close to those derived from
        # observations of the Dobot controller.
        self.L1 = 150.0  # 149.8
        self.L2 = 150.0  # 148.0
        self.X0 =  90.0  # 92.8
        self.Z0 =   0.0  # 0.1

        # Fetch handles for the four axis motors.
        j1 = self.getDevice('motor1')
        j2 = self.getDevice('motor2')
        j3 = self.getDevice('motor3')
        j4 = self.getDevice('motor4')

        # Convenience list of all actuators.
        self.motors = [j1, j2, j3, j4]

        # Fetch handle for suction cup 'connector'.
        self.suction = self.getDevice('suction')
        self.suction.enablePresence(EVENT_LOOP_DT)

        # Initialize pose generators.
        # self.position = self.position_gen()
        self.position = self.cycle_gen()
        return

    #================================================================
    def forward_kinematics(self, j1, j2, j3, j4):
        """Compute the tool center point (TCP) position and rotation of the
        Dobot, accepting four joint angles in radians and returning a (x, y, z,
        r) tuple with the TCP position in millimeters and rotation in radians.
        """

        # calculate the radial distance of the TCP along the ground plane
        rad = self.X0 + self.L1 * math.sin(j2) + self.L2 * math.cos(j3)

        # calculate the height of the TCP above the ground plane
        z = self.Z0 + self.L1 * math.cos(j2) - self.L2 * math.sin(j3)

        # calculate the XY position of the TCP by rotating the radial distance using J1
        x = rad * math.cos(j1)
        y = rad * math.sin(j1)

        # The TCP frame rotation is determined entirely by J1 and J4
        rot = j1 + j4

        return x, y, z, rot

    #================================================================
    def inverse_kinematics(self, x, y, z, r):
        """Compute the joint angles of the robot, accepting a TCP location and
        rotation in millimeters and radians and returning a (j1, j2, j3, j4) tuple in radians."""

        # calculate the radial distance and orientation of the TCP projection on the ground plane
        rad = math.sqrt(x*x + y*y)
        j1  = math.atan2(y, x)

        # the end effector rotation transforms the j1 rotation to the TCP frame rotation
        j4 = r - j1

        # subtract the offsets to solve the two-link IK problem
        dr = rad - self.X0
        dz = z   - self.Z0

        # solve in polar XZ coordinates
        radiussq = dr*dr + dz*dz
        radius   = math.sqrt(radiussq)
        gamma    = math.atan2(dz, dr)

        # use the law of cosines to compute the upper internal angle
        #   R**2 = l1**2 + l2**2 - 2*l1*l2*cos(beta)
        acosarg = (radiussq - self.L1**2 - self.L2**2) / (-2 * self.L1 * self.L2)
        if acosarg < -1.0:  beta = math.pi
        elif acosarg > 1.0: beta = 0.0
        else:               beta = math.acos(acosarg)

        # use the law of sines to find the lower internal angle
        #  radius / sin(beta)  = l2 / sin(alpha)
        if radius > 0.0:
            alpha = math.asin(self.L2 * math.sin(beta) / radius)
        else:
            alpha = 0.0

        # calculate the joint angles
        j2 = math.pi/2 - alpha - gamma
        j3 = math.pi - beta - alpha - gamma

        return j1, j2, j3, j4

    #================================================================
    # cycle of poses to move a block back and forth
    def cycle_gen(self):
        home_pose = [0.0, 0.0, 0.0, 0.0]
        grasp1_pose = self.inverse_kinematics(250.0, 0.0, -46.0, 0.0) # xyzr
        print("IK grasp1 solution radians:", grasp1_pose)
        print("IK grasp1 solution degrees:", [rad2deg(a) for a in grasp1_pose])

        lift1_pose  = self.inverse_kinematics(250.0, 0.0, -26.0, 0.0) # xyzr

        x2 = 300.0
        y2 =  0.0
        grasp2_pose = self.inverse_kinematics(x2, y2, -46.0, 0.0) # xyzr
        lift2_pose  = self.inverse_kinematics(x2, y2, -26.0, 0.0) # xyzr

        while True:
            yield home_pose
            yield lift1_pose
            yield grasp1_pose
            self.suction.lock()
            yield lift1_pose
            yield lift2_pose
            yield grasp2_pose
            self.suction.unlock()
            yield lift2_pose

            yield home_pose
            yield lift2_pose
            yield grasp2_pose
            self.suction.lock()
            yield lift2_pose
            yield lift1_pose
            yield grasp1_pose
            self.suction.unlock()
            yield lift1_pose

    #================================================================
    def set_targets(self, pose):
        """Convenience function to set all joint targets."""
        for joint, angle in zip(self.motors, pose):
            joint.setPosition(angle)

    def run(self):
        iteration_count = 5
        cycle_count = iteration_count

        while robot.step(EVENT_LOOP_DT) != -1:

            # Read simulator clock time.
            t = robot.getTime()
            # print("Suction presence:", self.suction.getPresence())

            # Change the target position in a cycle with a two-second period.
            cycle_count -= 1
            if cycle_count <= 0:
                cycle_count = iteration_count
                angles = next(self.position)
                print(f"Moving to {angles}")
                self.set_targets(angles)

################################################################
# If running directly from Webots as a script, the following will begin execution.
# This will have no effect when this file is imported as a module.
if __name__ == "__main__":
    robot = Dobot()
    robot.run()
