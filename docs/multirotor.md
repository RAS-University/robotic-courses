---
title: Multirotor
parent: Courses
layout: default
nav_order: 7
---
# Multirotor Drones

- Table of Contents
{:toc}

## 1. Prerequisites
Kinematics, Dynamics, linear algebra, pid control,  

## 2. General Motivation


## 3. Course Content

### Chapter 0 : Mathematical tools for modelling and control of UAV's

#### Coordinate System and Transformation
Attitude representation: inertial frame, roll, pitch, yaw
<!-- 
<span style="color: red;">Question: Other mathematical tools would be: linear algebra, control theory basics, optimization techniques. But there are other modules about it/ are prerequesites, so probably not present here?</span> -->

### Chapter 1 : System Components

#### Frame/Airframe
Fuselage, arms and landing gear, duct.

material, weight, flexibility

#### Actuators
types of actuators (servo, dc)  
brushless motors, max current/power, motor efficiency  
electronic speed controllers (ESC)

#### Propellers
Type, chord length, moment of inertia, number of blades, material (safe rotation rate before deformation), efficiency (propeller specific thrust)

#### Power System
Battery types and management
voltage, discharge capacity, internal resistance, discharge rate, energy density

#### Sensors/Perception
IMU, gyroscope, magnetometers, pressure sensors, airspeed sensors, GPS, camera, lidar, 

#### Communication Systems
R/C receiver: frequency, modulation, channels, remote control distance,  
wifi, 5G

Ground Control Station

#### Autopilot
Microncontroller & attitude sensors to control attitude, position and trajectory  
GPS, IMU, barometer, ultrasonic

### Chapter 2: Design of multirotor

configuration, angle of propellers, size and maneuverability, position of coG, position of sensors/autopilot, drag impact from fuselage, vibration, noise

Types of multirotors:  
Quadrotor, hexrotor, octorotor, redundant systems

### Chapter 3: Dynamics of multirotor UAV's

#### Remote Control

As mentioned before, the bottleneck for quadcopters in the 20th century was the imprecise control of motor speeds. What are the conditions on the individual motors for a quadrotor to take-off, hover, turn and move forward?

![video](https://www.youtube.com/watch?v=C0KBu2ihp-s)
><sub>Drones flight dynamics. Video from Sabin Civil Engineering available at: https://www.youtube.com/watch?v=C0KBu2ihp-s</sub>

<span style="color: red;">Add schema with forces and torques</span>

> To **take off**, all rotors increase their speed until the generated lift force is greater than the weight of the drone. If the the lift force exactly balances the gravitational force, the drone hovers. 

> Each rotor does not only generate lift, but also a **torque**, which will spin the drone in the opposite direction. To prevent spinning of the drone during flight rotorcrafts use an equal number of clockwise and anticlockwise spinning rotors. The torques from each pair cancel each other out, ensuring stability during flight.

> Movement in 3D space for quadcopter is initiated by changing the rotation speeds of some of the propellers. To generate a **pitch** movement front rotor speeds are decreased and back rotor speeds increased, which will tilt the drone forward (or vie-versa to tilt backward). If now the rotor speeds are again balanced, the lift force has an angle to the gravitational force and the non-parallel part is a thrust moving the drone forwards. The same principle applies to create a **roll** movement and move sideways. Finally to create a **yaw** rotation, the speeds of clockwise and anticlockwise rotors are adapted to rotate the drone to the left or right.

#### Modeling?
propeller modeling, motor modeling, esc modeling, battery modeling  
flight time, max payload, max flight speed

#### Kinematics of Multirotors
Body Frame, World Frame  

Attitude representation:
Euler Angles, rotation matrices, quaternions

Exercises: Body Frame to World Frame, Transformation from Euler Angles -> rotation matrix -> quaternions

#### Dynamic Modeling
Forces and Moments

#### Aerodynamics
Thrust generation from rotors, dynamics and power consumption, drag model

### Chapter 4: Measurement Model and State Estimation

#### Observability

#### Sensor Fusion/Kalman Filter
Classic/Extended Kalman Filter

#### State Estimation
Attitude Estimation

Position Estimation

Velocity Estimation

### Chapter 5: Control of non-linear underactuated systems and reference trajectory generation

#### Control Allocation
Position Control, Velocity Control, Attitude, Rate control
Cascaded Controller

#### Motion Planning
Path planning

Trajectory planning

<!-- #### Disturbance Rejection -->

<!-- ### Chapter 4 : Control of fully-actuated and morphing UAV's

### Chapter 5 : Control for physical interaction of UAV's -->
<!--Decompose the course into chapters

You can start with following resources:
Gaballieri & Franchi's course at U. Twente, see https://utwente.osiris-student.nl/onderwijscatalogus/extern/cursus
and nice intro video:

Part of their course's structure is interesting:

You want to start with 
description of the system components of UAVs (mechanics, actuators, sensors, electronics, etc.) and their kinematics
then move to describe dynamics, taking examples of standard multirotor UAVs (aerodynamics, control allocation)
Control of fully-actuated UAVs

Then move to more complex systems:
- Control of nonlinear underactuated systems 
- Control in disturbances (wind, etc)
- Control of force during interaction with environment, with a glimpse on robots that pick up and carry objects

Offer a final section on new designs and make a link to the upcoming soft robotics section for more advanced current designs 

 and morphing UAVs


 -->
 
## Additional Resources

### Credits:
<!-- List all the sources that you used to create the page   -->

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->


