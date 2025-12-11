---
title: Multirotor
parent: "Chapter 9: Locomotion"
layout: default
nav_order: 7
# math: mathjax
---
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<link rel="stylesheet" href="../styles.css">

<a href="/docs/aerial_robotics/multirotor/multirotor_2" id="go-to-previous" title="Go to Previous Chapter">⬅​</a>

<a href="/docs/aerial_robotics/multirotor/multirotor_4" id="go-to-next" title="Go to Next Chapter">➡​</a>

# Multirotor Drones: Chapter 2

- Table of Contents
{:toc}

## 1. Prerequisites
Kinematics, Dynamics, linear algebra, pid control, mpc, sensors and sensing 

## 2. General Motivation

## Chapter 2: Modeling & Dynamics
<div class="note-box">
  <strong>Objective:</strong> Derive Equations of motion relating torque and thrust to angular rates.
</div>

### 2.1 Intuitive Physics/Remote Control

As mentioned before, the bottleneck for quadcopters in the 20th century was the imprecise control of motor speeds. What are the conditions on the individual motors for a quadrotor to take-off, hover, turn and move forward?

![video](https://www.youtube.com/watch?v=C0KBu2ihp-s)
><sub>Drones flight dynamics. Video from Sabin Civil Engineering available at: https://www.youtube.com/watch?v=C0KBu2ihp-s</sub>

<span style="color: red;">Add schema with forces and torques</span>

> To **take off**, all rotors increase their speed until the generated lift force is greater than the weight of the drone. If the the lift force exactly balances the gravitational force, the drone hovers. 

> Each rotor does not only generate lift, but also a **torque**, which will spin the drone in the opposite direction. To prevent spinning of the drone during flight rotorcrafts use an equal number of clockwise and anticlockwise spinning rotors. The torques from each pair cancel each other out, ensuring stability during flight.

> Movement in 3D space for quadcopter is initiated by changing the rotation speeds of some of the propellers. To generate a **pitch** movement front rotor speeds are decreased and back rotor speeds increased, which will tilt the drone forward (or vie-versa to tilt backward). If now the rotor speeds are again balanced, the lift force has an angle to the gravitational force and the non-parallel part is a thrust moving the drone forwards. The same principle applies to create a **roll** movement and move sideways. Finally to create a **yaw** rotation, the speeds of clockwise and anticlockwise rotors are adapted to rotate the drone to the left or right.


configuration, angle of propellers, size and maneuverability, position of coG, position of sensors/autopilot, drag impact from fuselage, vibration, noise

Types of multirotors:  
Quadrotor, hexrotor, octorotor, redundant systems

### 2.2 Kinematics:
Relationship between position, velocity and orientation
mapping angular velocity to euler rates

### 2.3 Rigid Body Dynamics
Newton-Euler Equations  
Thrust model  
state-space model: x'=f(x,u)
## Additional Resources

### Credits:
<!-- List all the sources that you used to create the page   -->

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->


