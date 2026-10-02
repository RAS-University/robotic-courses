---
title: 9.5 System Architecture
parent: "Multirotor Drones"
layout: default
nav_order: 5
chapter: 9
section: 5
publish: true
nav_exclude: false
---
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<link rel="stylesheet" href="../styles.css">

<!-- <a href="/docs/aerial_robotics/multirotor/multirotor_1" id="go-to-previous" title="Go to Previous Chapter">⬅​</a> -->

<!-- <a href="/docs/aerial_robotics/multirotor/multirotor_3" id="go-to-next" title="Go to Next Chapter">➡​</a> -->


# Multirotor Drones: Chapter 1

- Table of Contents
{:toc}

## 1. Prerequisites
Kinematics, Dynamics, linear algebra, pid control, mpc, sensors and sensing 

## 2. General Motivation



## Chapter 1 : System Architecture & Component Modeling

<div class="note-box">
  <strong>Objective:</strong> Get to know the components of a drone and understand for what each part is used.
</div>

### 1.1 Frame/Airframe
Fuselage, arms and landing gear, duct.

material, weight, flexibility

### 1.2 Propulsion system
#### Actuators
types of actuators (servo, dc)  
brushless motors, max current/power, motor efficiency  
electronic speed controllers (ESC)

#### Propellers
Type, chord length, moment of inertia, number of blades, material (safe rotation rate before deformation), efficiency (propeller specific thrust)

#### Power System
Battery types and management
voltage, discharge capacity, internal resistance, discharge rate, energy density

modeling  
flight time, max payload, max flight speed

### Sensors/Perception
IMU, gyroscope, magnetometers, pressure sensors, airspeed sensors, GPS, camera, lidar, 

### Communication Systems
R/C receiver: frequency, modulation, channels, remote control distance,  
wifi, 5G

Ground Control Station

### Autopilot
Microncontroller & attitude sensors to control attitude, position and trajectory  
GPS, IMU, barometer, ultrasonic

## Additional Resources

### Credits:
<!-- List all the sources that you used to create the page   -->
This course page was created by **Lisa Romana Schneider, MSc in Robotics at EPFL**, and funded by **IEEE RAS** and **EPFL**.

This course page is partly based on the Aerial Robotics class taught by [Prof. Dario Floreano](https://people.epfl.ch/dario.floreano) at EPFL (Ecole Polytéchnique Fédérale de Lausanne).

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->
[Introduction to Multicopter Design and Control (Quan Quan)](https://link.springer.com/book/10.1007/978-981-10-3382-7)- Textbook offering a systematic overview over multicopters from basic design guidelines to high-level control. 


<div class="page-navigation">
  <a href="/docs/chap9_aerial_robotics/multirotor/multirotor_1"
     id="go-to-previous"
     title="Go to Previous Chapter">⬅</a>

  <a href="/docs/chap9_aerial_robotics/multirotor/multirotor_3"
     id="go-to-next"
     title="Go to Next Chapter">➡</a>
</div>
