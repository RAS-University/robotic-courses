# SPDX-FileCopyrightText: Copyright (c) 2022 Guillaume Bellegarda. All rights reserved.
# SPDX-License-Identifier: BSD-3-Clause
# 
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this
# list of conditions and the following disclaimer.
#
# 2. Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
#
# 3. Neither the name of the copyright holder nor the names of its
# contributors may be used to endorse or promote products derived from
# this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
# AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
# IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
# FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
# DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
# SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
# CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
# OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
# OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# Copyright (c) 2022 EPFL, Guillaume Bellegarda

"""Defines the robot leg constants and URDF specs."""
import numpy as np
import re
import pybullet as pyb
import os, inspect

currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)

URDF_ROOT = parentdir 
URDF_ROOT = currentdir
URDF_FILENAME = "pyb_data/urdf/leg.urdf"

##################################################################################
# Default robot configuration (i.e. base and joint positions, etc.)
##################################################################################
NUM_MOTORS = 2
NUM_LEGS = 1
MOTORS_PER_LEG = 2

INIT_RACK_POSITION = [0, 0, 0.5] # when hung up in air (for debugging)
INIT_POSITION = [0, 0, 0.305]  # normal initial height
IS_FALLEN_HEIGHT = 0.18        # height at which robot is considered fallen

INIT_ORIENTATION = (0, 0, 0, 1) 
_, INIT_ORIENTATION_INV = pyb.invertTransform(
        position=[0, 0, 0], orientation=INIT_ORIENTATION)

# default angles (for init)
DEFAULT_THIGH_ANGLE = np.pi/4 
DEFAULT_CALF_ANGLE = -np.pi/2 
INIT_JOINT_ANGLES = np.array([  DEFAULT_THIGH_ANGLE, 
                                DEFAULT_CALF_ANGLE] * NUM_LEGS)
INIT_MOTOR_ANGLES = INIT_JOINT_ANGLES
# Used to convert the robot SDK joint angles to URDF joint angles.
JOINT_DIRECTIONS = np.array([1, 1])

# joint offsets 
THIGH_JOINT_OFFSET = 0.0
CALF_JOINT_OFFSET = 0.0

# Used to convert the robot SDK joint angles to URDF joint angles.
JOINT_OFFSETS = np.array([  THIGH_JOINT_OFFSET,
                            CALF_JOINT_OFFSET] * NUM_LEGS)

# Kinematics
THIGH_LINK_LENGTH = 0.209 #0.2
CALF_LINK_LENGTH = 0.195  #0.2

##################################################################################
# Actuation limits/gains, position, and velocity limits
##################################################################################
# joint limits 
# UPPER_ANGLE_JOINT = np.array([ DEFAULT_THIGH_ANGLE + 1, DEFAULT_CALF_ANGLE + 1 ] * NUM_LEGS)
# LOWER_ANGLE_JOINT = np.array([-DEFAULT_THIGH_ANGLE - 1, DEFAULT_CALF_ANGLE - 1 ] * NUM_LEGS)

UPPER_ANGLE_JOINT = np.array([  np.pi,  np.pi ] * NUM_LEGS)
LOWER_ANGLE_JOINT = np.array([ -np.pi, -np.pi ] * NUM_LEGS)

# torque and velocity limits 
TORQUE_LIMITS   = np.asarray( [33.5] * NUM_MOTORS )
VELOCITY_LIMITS = np.asarray( [21.0] * NUM_MOTORS ) 

# Sample Joint Gains
MOTOR_KP = [55,55] * NUM_LEGS
MOTOR_KD = [0.8,0.8] * NUM_LEGS

# Sample Cartesian Gains
kpCartesian = np.diag([500,500])
kdCartesian = np.diag([10,10])


##################################################################################
# Hip, thigh, calf strings, naming conventions from URDF (don't modify)
##################################################################################
JOINT_NAMES = (
    "thigh_joint", 
    "calf_joint",
)
MOTOR_NAMES = JOINT_NAMES

# standard across all robots
_CHASSIS_NAME_PATTERN = re.compile(r"\w*floating_base\w*")
_HIP_NAME_PATTERN = re.compile(r"hip_j\w+")
_THIGH_NAME_PATTERN = re.compile(r"thigh_j\w+")
_CALF_NAME_PATTERN = re.compile(r"calf_j\w+")
_FOOT_NAME_PATTERN = re.compile(r"foot_\w+")
