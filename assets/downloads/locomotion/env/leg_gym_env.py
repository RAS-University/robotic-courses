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

"""This file implements the gym environment for a quadruped. """
import os, inspect
# so we can import files
currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
os.sys.path.insert(0, currentdir)

import time, datetime
import numpy as np
# gym
import gym
from gym import spaces
from gym.utils import seeding
# pybullet
import pybullet
import pybullet_utils.bullet_client as bc
import pybullet_data
import random
random.seed(10)
# leg and configs
import leg
import configs_leg as robot_config


VIDEO_LOG_DIRECTORY = 'videos/' + datetime.datetime.now().strftime("vid-%Y-%m-%d-%H-%M-%S-%f")

# Motor control modes:
#   - "TORQUE": 
#         supply raw torques to each motor (2)
#   - "PD": 
#         supply desired joint positions to each motor (2)
#         torques are computed based on the joint position/velocity error

EPISODE_LENGTH = 10   # how long before we reset the environment (max episode length for RL)


class LegGymEnv(gym.Env):
  """The gym environment for a quadruped leg.

  Simplified, not using for RL.
  """
  def __init__(
      self,
      robot_config=robot_config,
      isRLGymInterface=False,
      time_step=0.001,
      action_repeat=10,  
      motor_control_mode="PD",
      on_rack=True,
      render=False,
      record_video=False,
      **kwargs): # any extra arguments from legacy
    """Initialize the leg gym environment.

    Args:
      robot_config: The robot config file, contains A1 parameters.
      isRLGymInterface: If the gym environment is being run as RL or not. Affects
        if the actions should be scaled.
      time_step: Simulation time step.
      action_repeat: The number of simulation steps where the same actions are applied.
      motor_control_mode: Whether to use torque control, PD, control, etc.
      on_rack: Whether to place the leg in the air, good for debugging. 
      render: Whether to render the simulation.
      record_video: Whether to record a video of each trial.
    """
    self._robot_config = robot_config
    self._isRLGymInterface = isRLGymInterface
    self._time_step = time_step
    self._action_repeat = action_repeat
    self._motor_control_mode = motor_control_mode
    self._hard_reset = True # must fully reset simulation at init
    self._on_rack = on_rack
    self._is_render = render
    self._is_record_video = record_video

    # other bookkeeping 
    self._num_bullet_solver_iterations = int(300 / action_repeat) 
    self._env_step_counter = 0
    self._sim_step_counter = 0
    self._last_frame_time = 0.0 # for rendering 
    self._MAX_EP_LEN = EPISODE_LENGTH # max sim time in seconds, arbitrary
    self._action_bound = 1.0

    self._action_dim = action_dim = 2
    action_high = np.array([1] * action_dim)
    self.action_space = spaces.Box(-action_high, action_high, dtype=np.float32)
    self.observation_space = spaces.Box(-np.ones(2), np.ones(2), dtype=np.float32)

    if self._is_render:
      self._pybullet_client = bc.BulletClient(connection_mode=pybullet.GUI)
    else:
      self._pybullet_client = bc.BulletClient()
    self._configure_visualizer()

    self.videoLogID = None
    self.seed()
    self.reset()
  
  ######################################################################################
  # Step simulation, RL gym interface
  ######################################################################################
  def _noisy_observation(self):
    return np.zeros(2)

  def step(self, action):
    """ Step forward the simulation, given the action. """
    curr_act = action.copy()
    
    for _ in range(self._action_repeat):
      proc_action = curr_act 
      self.robot.ApplyAction(proc_action)
      self._pybullet_client.stepSimulation()
      self._sim_step_counter += 1

      if self._is_render:
        self._render_step_helper()

    self._env_step_counter += 1
    done = False
    if self.get_sim_time() > self._MAX_EP_LEN:
      done = True

    return self._noisy_observation(), 0, done, {} 

  ######################################################################################
  # Reset
  ######################################################################################
  def reset(self):
    """ Set up simulation environment. """
    mu_min = 0.5
    if self._hard_reset:
      # set up pybullet simulation
      self._pybullet_client.resetSimulation()
      self._pybullet_client.setPhysicsEngineParameter(
          numSolverIterations=int(self._num_bullet_solver_iterations))
      self._pybullet_client.setTimeStep(self._time_step)
      self.plane = self._pybullet_client.loadURDF(pybullet_data.getDataPath()+"/plane.urdf", 
                                                  basePosition=[0,0,0]) 
      self._pybullet_client.changeVisualShape(self.plane, -1, rgbaColor=[1, 1, 1, 0.9])
      self._pybullet_client.configureDebugVisualizer(
          self._pybullet_client.COV_ENABLE_PLANAR_REFLECTION, 0)
      self._pybullet_client.setGravity(0, 0, -9.8)
      self.robot = (leg.Leg(pybullet_client=self._pybullet_client,
                                         robot_config=self._robot_config,
                                         motor_control_mode=self._motor_control_mode,
                                         on_rack=self._on_rack,
                                         render=self._is_render))

      # random coefficient of friction 
      ground_mu_k = mu_min+(1-mu_min)*np.random.random()
      self._ground_mu_k = ground_mu_k
      self._pybullet_client.changeDynamics(self.plane, -1, lateralFriction=ground_mu_k)
      if self._is_render:
        print('ground friction coefficient is', ground_mu_k)

    else:
      self.robot.Reset(reload_urdf=False)

    self._env_step_counter = 0
    self._sim_step_counter = 0

    if self._is_render:
      self._pybullet_client.resetDebugVisualizerCamera(self._cam_dist, self._cam_yaw,
                                                       self._cam_pitch, [0, 0, 0])

    self._settle_robot()
    if self._is_record_video:
      self.recordVideoHelper()
    return self._noisy_observation()


  def _settle_robot(self):
    """ Settle robot and add noise to init configuration. """
    # change to PD control mode to set initial position, then set back..
    tmp_save_motor_control_mode_ENV = self._motor_control_mode
    tmp_save_motor_control_mode_ROB = self.robot._motor_control_mode
    self._motor_control_mode = "PD"
    self.robot._motor_control_mode = "PD"
    try:
      tmp_save_motor_control_mode_MOT = self.robot._motor_model._motor_control_mode
      self.robot._motor_model._motor_control_mode = "PD"
    except:
      pass
    init_motor_angles = self._robot_config.INIT_MOTOR_ANGLES + self._robot_config.JOINT_OFFSETS
    if self._is_render:
      time.sleep(0.2)
    for _ in range(1000):
      self.robot.ApplyAction(init_motor_angles)
      if self._is_render:
        time.sleep(0.001)
      self._pybullet_client.stepSimulation()
    
    # set control mode back
    self._motor_control_mode = tmp_save_motor_control_mode_ENV
    self.robot._motor_control_mode = tmp_save_motor_control_mode_ROB
    try:
      self.robot._motor_model._motor_control_mode = tmp_save_motor_control_mode_MOT
    except:
      pass

  ######################################################################################
  # Render, record videos, bookkeping, and misc pybullet helpers.  
  ######################################################################################
  def startRecordingVideo(self,name):
    self.videoLogID = self._pybullet_client.startStateLogging(
                            self._pybullet_client.STATE_LOGGING_VIDEO_MP4, 
                            name)

  def stopRecordingVideo(self):
    self._pybullet_client.stopStateLogging(self.videoLogID)

  def close(self):
    if self._is_record_video:
      self.stopRecordingVideo()
    self._pybullet_client.disconnect()

  def recordVideoHelper(self, extra_filename=None):
    """ Helper to record video, if not already, or end and start a new one """
    # If no ID, this is the first video, so make a directory and start logging
    if self.videoLogID == None:
      directoryName = VIDEO_LOG_DIRECTORY
      assert isinstance(directoryName, str)
      os.makedirs(directoryName, exist_ok=True)
      self.videoDirectory = directoryName
    else:
      # stop recording and record a new one
      self.stopRecordingVideo()

    if extra_filename is not None:
      output_video_filename = self.videoDirectory + '/' + datetime.datetime.now().strftime("vid-%Y-%m-%d-%H-%M-%S-%f") +extra_filename+ ".MP4"
    else:
      output_video_filename = self.videoDirectory + '/' + datetime.datetime.now().strftime("vid-%Y-%m-%d-%H-%M-%S-%f") + ".MP4"
    logID = self.startRecordingVideo(output_video_filename)
    self.videoLogID = logID


  def configure(self, args):
    self._args = args

  def seed(self, seed=None):
    self.np_random, seed = seeding.np_random(seed)
    return [seed]

  def _render_step_helper(self):
    """ Helper to configure the visualizer camera during step(). """
    # Sleep, otherwise the computation takes less time than real time,
    # which will make the visualization like a fast-forward video.
    time_spent = time.time() - self._last_frame_time
    self._last_frame_time = time.time()
    # time_to_sleep = self._action_repeat * self._time_step - time_spent
    time_to_sleep = self._time_step - time_spent
    if time_to_sleep > 0 and (time_to_sleep < self._time_step):
      time.sleep(time_to_sleep)
      
    base_pos = self.robot.GetBasePosition()
    # base_pos = np.array([base_pos[0],base_pos[1],0.3])
    camInfo = self._pybullet_client.getDebugVisualizerCamera()
    curTargetPos = camInfo[11]
    distance = camInfo[10]
    yaw = camInfo[8]
    pitch = camInfo[9]
    targetPos = [
        0.95 * curTargetPos[0] + 0.05 * base_pos[0], 0.95 * curTargetPos[1] + 0.05 * base_pos[1],
        curTargetPos[2]
    ]
    self._pybullet_client.resetDebugVisualizerCamera(distance, yaw, pitch, base_pos)

  def _configure_visualizer(self):
    """ Remove all visualizer borders, and zoom in """
    # default rendering options
    self._render_width = 960
    self._render_height = 720
    self._cam_dist = 0.75 #1.0 
    self._cam_yaw = 0
    self._cam_pitch = -20 
    # get rid of visualizer things
    self._pybullet_client.configureDebugVisualizer(self._pybullet_client.COV_ENABLE_RGB_BUFFER_PREVIEW,0)
    self._pybullet_client.configureDebugVisualizer(self._pybullet_client.COV_ENABLE_DEPTH_BUFFER_PREVIEW,0)
    self._pybullet_client.configureDebugVisualizer(self._pybullet_client.COV_ENABLE_SEGMENTATION_MARK_PREVIEW,0)
    self._pybullet_client.configureDebugVisualizer(self._pybullet_client.COV_ENABLE_GUI,0)

  def render(self, mode="rgb_array", close=False):
    if mode != "rgb_array":
      return np.array([])
    base_pos = self.robot.GetBasePosition()
    view_matrix = self._pybullet_client.computeViewMatrixFromYawPitchRoll(
        cameraTargetPosition=base_pos,
        distance=self._cam_dist,
        yaw=self._cam_yaw,
        pitch=self._cam_pitch,
        roll=0,
        upAxisIndex=2)
    proj_matrix = self._pybullet_client.computeProjectionMatrixFOV(fov=60,
                                                                   aspect=float(self._render_width) /
                                                                   self._render_height,
                                                                   nearVal=0.1,
                                                                   farVal=100.0)
    (_, _, px, _,
     _) = self._pybullet_client.getCameraImage(width=self._render_width,
                                               height=self._render_height,
                                               viewMatrix=view_matrix,
                                               projectionMatrix=proj_matrix,
                                               renderer=pybullet.ER_BULLET_HARDWARE_OPENGL)
    rgb_array = np.array(px)
    rgb_array = rgb_array[:, :, :3]
    return rgb_array

  def addLine(self,lineFromXYZ,lineToXYZ,lifeTime=0,color=[1,0,0]):
    """ Add line between point A and B for duration lifeTime"""
    self._pybullet_client.addUserDebugLine(lineFromXYZ,
                                            lineToXYZ,
                                            lineColorRGB=color,
                                            lifeTime=lifeTime)

  def get_sim_time(self):
    """ Get current simulation time. """
    return self._sim_step_counter * self._time_step
