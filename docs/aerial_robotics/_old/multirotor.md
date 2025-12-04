---
title: Multirotor
parent: Courses
layout: default
nav_order: 7
# math: mathjax
---
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

# Multirotor Drones

- Table of Contents
{:toc}

## 1. Prerequisites
Kinematics, Dynamics, linear algebra, pid control, mpc, sensors and sensing 

## 2. General Motivation


## Chapter 0 : Mathematical tools for modelling and control of UAV's
<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Objective:</strong> Introduce language and math notations for future chapters.
</div>

### Coordinate System 
In order to control a drone we need to describe the position and orientation of the drone relative to a fixed frame. In this module we use the ENU convention which is standard in robotics.

The **world-fixed frame** or also **inertial frame** is a coordinate frame fixed at an arbitrary point on the ground (i.e. ground station or take-off point) and has the *x-axis* pointing East, the *y-axis* pointing North and the *z-axis* pointing up.  
For the rest of this module we will refer to this frame as the *world frame* and denote $\mathcal{W}$ or ${W}$ with its axes $\mathbf{x}_W$, $\mathbf{y}_W$, and $\mathbf{z}_W$.

<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Note: </strong>For the duration and speed of quadrotor flights in this course, we assume the World Frame is an Inertial Frame. We neglect the rotation of the Earth (Coriolis effect) and the curvature of the Earth.
</div>


The **body frame** $\mathcal{B}$ or ${B}$ is a right-handed coordinate system fixed on the drone, typically located at its center of mass. Using the FLU convention it has the *x-axis* pointing forward to the nose/head, *y-axis* to the left and the *z-axis* pointing upwards. We denote them with $\mathbf{x}_B$, $\mathbf{y}_B$, and $\mathbf{z}_B$.

<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/multirotor/drone_frames.png" alt="World frame and body frame illustration." style="width: 90%; height: auto;">
  <p style="font-size: small;">Illustration of reference frames used in this module. The body frame is fixed on the drone while the world frame is fixed on the ground.</p>
</div>

For rotations of the drones we use the following convention:
1. *Roll angle* $\phi$ describes a rotation around the $\mathbf{x}_B$ axis.
2. *Pitch angle* $\theta$ describes a rotation around the $\mathbf{y}_B$ axis.
3. *Yaw angle* $\psi$ describes a rotation around the $\mathbf{z}_B$ axis.

The positive direction of the angles are defined using the right-hand-rule.

### Attitude Representation
The attitude is the orientation of the drone in the 3D space. We describe the orientation of the **body frame** $\mathcal{B}$ relative to the **world frame** $\mathcal{W}$ using a rotation. Below we will briefly describe three methods to do so for a drone: rotation matrices, Euler angles and quaternions.

#### Rotation Matrices
Rotation matrices provide the most fundamental and mathematically rigorous way to describe the orientation of a rigid body in a different frame. They are explained in more detail in the fundamental chapter about [kinematics](/docs/kinematics#chapter-1-coordinate-transformations-in-2D).

A **Rotation Matrix** $R\in \mathbb{R}^{3 \times 3}$ is a transformation that, when multiplied by a vector expressed in the body frame, yields the coordinates of that same vector expressed in the world frame. We will denote it by $R_\mathcal{B}^\mathcal{W}$.

If for instance $\mathbf{p}_B$ is a point measured in the body frame and $\mathbf{p}_W$ is the same point expressed in the world frame, the transformation is:

<script type="math/tex; mode=display">
\mathbf{p}_W = R_\mathcal{B}^\mathcal{W} \mathbf{p}_B
</script>

To construct the rotation matrix $R_\mathcal{B}^\mathcal{W}$ you simply express the basis vectors of the body frame ( $\mathbf{x}_B$, $\mathbf{y}_B$, $\mathbf{z}_B$) which then correspond to the columns of the rotation matrix:

<script type="math/tex; mode=display">
R_{\mathcal{B}}^{\mathcal{W}} =
\begin{bmatrix}
\vert & \vert & \vert \\
\mathbf{x}_B & \mathbf{y}_B & \mathbf{z}_B \\
\vert & \vert & \vert
\end{bmatrix}_{\mathcal{W}}
</script>

**Drawbacks**: While rotation matrices are mathematically complete, easy to use and simple to understand they have one big draw back which is the redundancy. They need 9 parameters to represent only three degrees of freedom which makes them computationally expensive.

#### Euler Angles
A more intuitive and compact way to express a rotation is with the euler angles. This representation uses three sequential rotations around the principal axes: *roll*, *pitch* and *yaw*.

The order in which these three rotations are applied matters. Rotating 90° in roll and then 90° in pitch results in a different final orientation than pitch and then roll. In robotics the standard convention is the $RPY$ sequence:
1. Rotate around the $\mathbf{x_1}$-axis (roll, $\psi$)
2. Rotate around the intermediate $\mathbf{y_2}$-axis (pitch, $\theta$)
3. Rotate around the final $\mathbf{z_3}$-axis (yaw, $\psi$)

<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/multirotor/drone_rotations.png" alt="Illustration for rotation angles." style="width: 90%; height: auto;">
  <p style="font-size: small;">Euler angles describe a sequence of rotations around the three principal axes. First the yaw-rotation around the z-axis, then a pitch rotation around th y-axis and finally a roll rotation around the x-axis are applied.</p>
</div>

The total rotation matrix $R_\mathcal{B}^\mathcal{W}$ is the product of the three individual elementary rotations:

$$
R_{tot} = R_\mathcal{B}^\mathcal{W} = R_\psi R_\theta R_\phi
$$

where the elementary rotations are:

<script type="math/tex; mode=display">
R_\psi =
\begin{bmatrix}
cos(\psi) & -sin(\psi) & 0 \\
sin(\psi) & cos(\psi) & 0 \\
0 & 0 & 1
\end{bmatrix}, \\
R_\theta =
\begin{bmatrix}
cos(\theta) & 0 & sin(\theta) \\
0 & 1 & 0 \\
-sin(\theta) & 0 & cos(\theta)
\end{bmatrix}, \\
R_\phi =
\begin{bmatrix}
1 & 0 & 0 \\
0 & cos(\phi) & -sin(\phi) \\
0 & sin(\phi) & cos(\phi)
\end{bmatrix}
</script>

**Singularities**:  
When using Euler angles you encounter singularities: some attitudes do not have an *unique* Euler angle representation. For a pitch angle of $\theta = \pm \pi/2$ there are infinite many RPY angles representing the same attitude. Mathematically the following product produces the same rotation matrix for any choice of $\delta$:

<script type="math/tex; mode=display">
  R = R_\psi(\delta) R_\theta(\pi/2) R_\phi(\alpha + \delta)
</script>

This phenomena is called *Gimbal lock*. Furthermore it is proven that no 3 parameter representation can be free of singularities. They occur whenever the second Euler angle aligns the first and third rotation axes causing the loss of a degree of freedom.

#### Unit Quaternions
To overcome singularities of euler angles and the redundancy of rotation matrices, a fourth parameter is sufficient. **Unit quaternions** integrate the idea to rotate an angle $\alpha$ around an arbitrary axis $\mathcal{v}$.

A quaternion $\mathbf{q}$ extends complex numbers into four dimensions. It consists of a scalar part $q_w$ (sometimes denoted $q_0$) and a vector part $\mathbf{q}_v = [q_x, q_y, q_z]^T$:

$$
\mathbf{q} = q_x i + q_y j + q_z k + q_w= \begin{bmatrix} \mathbf{q}_v  \\ q_w \end{bmatrix}
$$

The basis elements $i, j, k$ satisfy the fundamental Hamilton's rule: $i^2 = j^2 = k^2 = ijk = -1$.

If a point rotates by an angle $\alpha$ around a unit axis unit vector $\mathbf{v} = [v_x, v_y, v_z]^T$, the corresponding quaternion is:

$$
\mathbf{q} = \begin{bmatrix} \mathbf{v} \sin(\alpha/2) \\ \cos(\alpha/2) \end{bmatrix} = \begin{bmatrix} v_x \sin(\alpha/2) \\ v_y \sin(\alpha/2) \\ v_z \sin(\alpha/2) \\ \cos(\alpha/2) \end{bmatrix}
$$



<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Note: </strong>For a quaternion to represent a valid pure rotation, it must be a <strong>Unit Quaternion</strong>, meaning its norm must be equal to 1:
  <script type="math/tex; mode=display">\|\mathbf{q}\| = \sqrt{q_w^2 + q_x^2 + q_y^2 + q_z^2} = 1</script>
</div>

**Rotating a Vector**  
To rotate a vector $\mathbf{p}_B$ (point in body frame) to $\mathbf{p}_W$ (world frame) using quaternions, we first treat the vector $\mathbf{p}$ as a "pure quaternion" (where the scalar part is 0): $\mathbf{p}' = [0, \mathbf{p}_B]^T$.
The rotation is performed using the **Hamilton product** (denoted by $\otimes$) and the conjugate $\mathbf{q}^*$:

<script type="math/tex; mode=display">
\mathbf{p}_{W}' = \mathbf{q} \otimes \mathbf{p}_{B}' \otimes \mathbf{q}^*
</script>

Where the conjugate and inverse is $\mathbf{q}^* = \mathbf{q}^{-1} =[-\mathbf{q}_v, q_w]^T$.



**Composition of Rotations**  
Unlike Euler angles, composing rotations with quaternions is straightforward and computationally efficient. If we have a rotation $\mathbf{q}_1$ followed by a rotation $\mathbf{q}_2$, the total rotation is simply the product of the two quaternions:

<script type="math/tex; mode=display">
\mathbf{q}_{tot} = \mathbf{q}_2 \otimes \mathbf{q}_1
</script>

**Drawbacks**:
- **Double Cover**: The quaternions $\mathbf{q}$ and $-\mathbf{q}$ represent the exact same rotation. This can cause control issues if the controller tries to take the "long way around" to get to the negative quaternion.
- **Visualization**: Unlike Euler angles ($30^\circ$ roll), quaternions are not human-readable. You cannot look at $[0.707, 0, 0.707, 0]$ and immediately visualize the orientation without calculation.


<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Note: </strong>Here we only looked at pure rotations assuming that the body and world frame share the same origin. In reality this is never the case and we need to use a translation as well. If we know the coordinate of a point $\mathbf{b}$ in the body frame and want to express it in the world frame we can use:

  <script type="math/tex; mode=display">
    \mathbf{b}_W = R_B^W \mathbf{b}_B + \mathbf{p}_W
    </script>
  Where $\mathbf{p}_W$ is the relative pose of the body frame expressed in the world frame. <br>
  Are more compact and mathematically more interesting way of representing these transformations are with the use of <bold>homogenous</bold> matrices. They were introduced in the chapter about Kinematics and won't be repeated here.
</div>


### Exercises

**EXERCISE 1:**
Prove that the following expression is indeed independent of $\delta$:
<script type="math/tex; mode=display">
  R = R_\psi(\delta) R_\theta(\pi/2) R_\phi(\alpha + \delta)
</script>

<details markdown="1">
<summary><strong>Solutions</strong></summary>

**Exercise 1**:
Let us proceed by inspection and compute the product $R_z(\delta) R_y(\pi/2)$.
Recalling that $\psi, \theta, \phi$ correspond to rotations around $z, y, x$:

$$
R_z(\delta) R_y(\pi/2) = \begin{bmatrix} \cos(\delta) & -\sin(\delta) & 0 \\ \sin(\delta) & \cos(\delta) & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & 0 & 1 \\ 0 & 1 & 0 \\ -1 & 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -\sin(\delta) & \cos(\delta) \\ 0 & \cos(\delta) & \sin(\delta) \\ -1 & 0 & 0 \end{bmatrix}
$$

Now doing the overall multiplication with the third matrix $R_x(\alpha + \delta)$:

<script type="math/tex; mode=display">
\begin{aligned}
R_{tot} &= \begin{bmatrix} 0 & -\sin(\delta) & \cos(\delta) \\ 0 & \cos(\delta) & \sin(\delta) \\ -1 & 0 & 0 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos(\alpha + \delta) & -\sin(\alpha + \delta) \\ 0 & \sin(\alpha + \delta) & \cos(\alpha + \delta) \end{bmatrix} \\
&= \begin{bmatrix} 
0 & -\sin(\delta)\cos(\delta + \alpha) + \cos(\delta)\sin(\delta + \alpha) & \sin(\delta)\sin(\delta + \alpha) + \cos(\delta)\cos(\delta + \alpha) \\ 
0 & \sin(\delta)\sin(\delta + \alpha) + \cos(\delta)\cos(\delta + \alpha) & \sin(\delta)\cos(\delta + \alpha) - \cos(\delta)\sin(\delta + \alpha) \\ 
-1 & 0 & 0 
\end{bmatrix}
\end{aligned}
</script>

Using the trigonometric difference identities $\sin(A-B)$ and $\cos(A-B)$, where $A=(\delta+\alpha)$ and $B=\delta$:

$$
\begin{bmatrix} 
0 & \sin((\delta + \alpha) - \delta) & \cos((\delta + \alpha) - \delta) \\ 
0 & \cos((\delta + \alpha) - \delta) & -\sin((\delta + \alpha) - \delta) \\ 
-1 & 0 & 0 
\end{bmatrix} = \begin{bmatrix} 
0 & \sin(\alpha) & \cos(\alpha) \\ 
0 & \cos(\alpha) & -\sin(\alpha) \\ 
-1 & 0 & 0 
\end{bmatrix}
$$

The result is **independent from $\delta$**, proving the claim.


</details>


### Other prerequisites
Link to other foundations that are needed such as mpc, optimization and

## Chapter 1 : System Architecture & Component Modeling

<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
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

## Chapter 2: Modeling & Dynamics
<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
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

## Chapter 3: Control & Allocation

<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Objective:</strong> Implement the industry-standard control architecture used in commercial drones.
</div>

### 3.1 Control Allocation

### 3.2 Cascaded Control

## Chapter 4: Measurement Model and State Estimation
<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Objective:</strong> Estimate the true state of the drone ($\mathbf{x}$) from noisy sensor measurements ($\mathbf{y}$).
</div>
 
### 4.1 Observability

### 4.2 Sensor Fusion/Kalman Filter
Classic/Extended Kalman Filter

### 4.3 State Estimation of Drones
Attitude Estimation

Position Estimation

Velocity Estimation

### 4.4 Visual Inertial Odometry (VIO):
GPS-denied navigation  
pipeline  
challenges

## Chapter 5: Trajectory Generation & Planning
<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Objective:</strong> Generate smooth, feasible paths that respect the drone's physical limits.
</div>

### 5.1 Differential Flatness

### 5.2 Polynomial Trajectories
minimum snap trajectory

## Chapter 6: Advanced Control (MPC)

<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Objective:</strong> Generate smooth, feasible paths that respect the drone's physical limits.
</div>

### 6.1 Geometric Control
### 6.2 MPC 
#### 6.2.1 Formulation
#### 6.2.2 Linear/non-linear
Linear vs. Non-linear MPC
#### 6.2.3 constraints


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


