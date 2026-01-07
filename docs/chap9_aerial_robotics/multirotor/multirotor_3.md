---
title: 9.6 Modeling & Dynamics
parent: "Multirotor Drones"
layout: default
nav_order: 6
chapter: 9
section: 6
publish: false
nav_exclude: true
---
<!-- <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script> -->

<script type="text/javascript">
    MathJax = {
        tex: {
            tags: 'ams', // Enables automatic numbering
            useLabelIds: true // Enables referencing with labels
        }
    };
</script>
<script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  TeX: {
    equationNumbers: {
      autoNumber: "AMS"
    },
    extensions: ["AMSmath.js", "AMSsymbols.js"]
  }
});
</script>


<link rel="stylesheet" href="../styles.css">

<a href="/docs/chap9_aerial_robotics/multirotor/multirotor_2" id="go-to-previous" title="Go to Previous Chapter">⬅​</a>

<a href="/docs/chap9_aerial_robotics/multirotor/multirotor_4" id="go-to-next" title="Go to Next Chapter">➡​</a>

# Multirotor Drones: Chapter 2

- Table of Contents
{:toc}

## 1. Prerequisites
Kinematics, Dynamics, linear algebra, pid control, mpc, sensors and sensing 
[Newton-Euler Equation](/docs/dynamics#newtoneuler-dynamics) introduced in the fundamental chapter about dynamics.

## 2. General Motivation

## Notations
Throughout this lecture notes, we will use the following subscripts, superscripts, and accents to denote specific meanings:

- $_B$: subscript $B$ for variables expressed in the body frame $\mathcal{B}$
- $_W$: subscript $W$ for variables expressed in the world frame $\mathcal{W}$
- $\mathbf{var}$: bold variables for vectors or matrices. Otherwise the variable describes a scalar.

- $\mathbf{\tau}$: Torque [UNIT]
- $\mathbf{a}$: linear acceleration (vector $3 \times 1$)
- $\mathbf{\alpha}$: angular acceleration
- $\mathbf{F}$: force
- $\mathbf{J}$: Moment of inertia
- $\mathbf{I}_n$: Identity matrix of dimension $n \times n$



- $x \in \mathbb{R}^{1\times n}$: vector $x$ of dimension $n$
- $x_i$ with $i \in \mathbb{N}$, $i=1,\cdots,n$ for $x\in\mathbb{R}^{1\times n}$: component $i$ of vector $x$
- $x_k$: value of $x$ at time step $k$ (discrete time)
<!-- - $x_{i\mid k}$ with $i \in \mathbb{N}$, $i=1,\cdots,n$ for $x\in\mathbb{R}^{1\times n}$: component $i$ of vector $x$ at time step $k$ -->
- $x^+$ or $x_{k+1}$: value of $x$ at next time step (discrete time)
- $\dot{x}$: time derivative of $x$ (continuous time)
- $x^*$: optimal value of $x$
- $x^\top$: transpose of vector or matrix $x$
- $\hat{x}$: estimate of variable $x$ (see chapter on [State Estimation](#-14-intro-to-state-estimation-))
- $\hat{x}^-$: estimate of variable $x$ before measurement update
- $\tilde{x}$: estimation error of variable $x$
- $x_s$: steady state value of variable $x$


## Chapter 2: Modeling & Dynamics
<div class="note-box">
  <strong>Objective:</strong> Derive Equations of motion relating torque and thrust to angular rates.
</div>

### 2.1 Intuitive Physics/Remote Control

As mentioned before, the bottleneck for quadcopters in the 20th century was the imprecise control of motor speeds. What are the conditions on the individual motors for a quadrotor to take-off, hover, turn and move forward?

This section aims to give an intuitive understanding of the dynamics of a drone. The next section will then formulate those in mathematical equations. 

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
thrust always in direction of z_B axis, principal components of forces. 
gravity always in -z_W direction  
to have forces in world frame --> rotation matrix  
for torque:
  - only consider two terms: drag from rotor speeds and thrust
  - torque from thrust: thrust in z_B --> drag along x_B and/or y_B axis depending on drone configuration
  - torque from rotor drag: drag causes torque in opposite direction than direction of rotation of propellers.  

Other terms are (not considered here, aso for small speeds factor 10 smaller): Hub force, Hub Moment, Rolling Moment, Ground effect.

Explain why we are interested in having the force in world frame and torque in body frame.

**Newton-Euler Equations**  

A compact way of describing the Newton-Euler equation of a rigid body is:

<script type="math/tex; mode=display">
\begin{equation}
\begin{bmatrix}
\mathbf{f}_W \\ \mathbf{\tau}_B
\end{bmatrix} = 
\begin{bmatrix}
m \mathbf{I}_3 & \mathbf{0} \\ \mathbf{0} & \mathbf{J}
\end{bmatrix} 
\begin{bmatrix} \mathbf{a}_W \\ \mathbf{\alpha}_B \end{bmatrix} + \begin{bmatrix} \mathbf{0} \\ \mathbf{\omega}_B \times \mathbf{J} \mathbf{\omega}_B \end{bmatrix}
\label{eq:euler_newton}
\end{equation}
</script>

| Variable                | Description                                                                                     | Units                |
|-------------------------|-------------------------------------------------------------------------------------------------|----------------------|
| $\mathbf{f}_W$          | Force vector expressed in the world frame                                                      | Newtons (N)          |
| $\mathbf{\tau}_B$       | Torque vector expressed in the body frame                                                      | Newton-meters (Nm)   |
| $m$                     | Mass of the drone                                                                              | Kilograms (kg)       |
| $\mathbf{I}_3$          | Identity matrix of dimension $3 \times 3$                                                      | Dimensionless        |
| $\mathbf{0}$            | Zero matrix of appropriate dimensions                                                          | Dimensionless        |
| $\mathbf{J}$            | Moment of inertia matrix                                                                       | kg·m²                |
| $\mathbf{a}_W$          | Linear acceleration vector expressed in the world frame                                        | m/s²                 |
| $\mathbf{\alpha}_B$     | Angular acceleration vector expressed in the body frame                                        | rad/s²               |
| $\mathbf{\omega}_B$     | Angular velocity vector expressed in the body frame                                            | rad/s                |

Now we need to discuss the nature of the forces $\mathbf{f}_W$ and $\mathbf{\tau}_B$.

#### Gravity
Gravity is an external force constantly acting on the drone. It acts in the negative z-axis of the world frame. Instead of including it in $\mathbf{a}_W$ we add it as a constant term. Hence the above equation can be rewritten as:

<script type="math/tex; mode=display">
\begin{bmatrix}
\mathbf{f}_W \\ \mathbf{\tau}_B
\end{bmatrix} = 
\begin{bmatrix}
m \mathbf{I}_3 & \mathbf{0} \\ \mathbf{0} & \mathbf{J}
\end{bmatrix} 
\begin{bmatrix} \mathbf{a}_W \\ \mathbf{\alpha}_B \end{bmatrix} + \begin{bmatrix} -m\mathbf{g}_W \\ \mathbf{\omega}_B \times \mathbf{J} \mathbf{\omega}_B \end{bmatrix}
</script>

Where $\mathbf{g}_W \in \mathbb{R}^3$ is the gravity vector expressed in the world frame (i.e. normally $\begin{bmatrix} 0 & 0 & g \end{bmatrix}^T$).

#### Thrust Model
The other contribution to the force that we are considering comes from the thrust. The thrust is a force produced by each propeller attached to a motor. For simplicity we only consider _leveled_ designs here. Meaning the propeller disks horizontally - they are perpendicular to the $z_B$ axis of the drone.  
In that case ever propeller $P_i$ produces a thrust parallel to the drones z-axis. The thrust of a single rotor expressed in the rotor frame $P_i$ can be modeled as:

<script type="math/tex; mode=display">
\mathbf{T}_{P_i} = c_f w_i \lvert w_i \rvert \mathbf{e}_3
</script>

With $c_f$ being a thrust constant, $w_i \lvert w_i \rvert$ the squared speed of propeller $i$, and $\mathbf{e}_3 = \begin{bmatrix} 0 & 0 & 1 \end{bmatrix}^T$ being the unit vector in z-direction of the propeller frame.  
Hence the thrust force pushes in the vertical axis of the propeller frame. Since in our case the vertical (z-axis) of each propeller is aligned with the z-axis of the body frame, the total thrust in the body frame can be expressed:

<script type="math/tex; mode=display">
\mathbf{f}_{B, thrust} = \sum_{i=1}^4 \mathbf{T}_{P_i}
</script>

The thrust force in the world frame can then be expressed by multiplying with the rotation matrix $\mathbf{R}_B^W$.

For the torque we will consider two contributions: drag from the propellers and the torque caused by the thrust. There are other contributions that we won't consider for now as their magnitude is at low speed flights a factor 10 smaller than the other two's.

#### Torque from Thrust
For levelled drone configurations, where the thrust vector is perpendicular to the drones z-axis, the thrust of each propeller causes a moment around the center of gravity. This introduces a combination of roll and pitch torque, depending of the placement of the drone.  
Let's consider a single propeller mounted $\mathbf{p}_i$ away from the CoG of the drone. Where $\mathbf{p}_i$ is a vector expressed in the body frame. We therefore get:

<script type="math/tex; mode=display">
\mathbf{\tau}_{B, i} = \mathbf{p}_i \times \mathbf{T}_{P_i}
</script>

The total torque caused by all propellers can then be written as:

<script type="math/tex; mode=display">
\mathbf{\tau}_{thrust}^B = \sum_{i=1}^4 \mathbf{p}_i^B \times \mathbf{T}_{P_i}
</script>

Another contribution to the torque is the drag acting on each rotating propeller. This leads to a reaction force around the drones center of gravity trying to spin the drone in the opposite direction than the propeller - hence  torque acting on the yaw-axis.  
Mathematically this can be expressed as:

<script type="math/tex; mode=display">
\mathbf{\tau}_{i, drag}^B = (-1)^{i+1} c_d w_i \lvert w_i \rvert \mathbf{e}_3
</script>

With $c_d$ being a drag constant, $w_i \lvert w_i \rvert$ the squared speed of propeller $i$, and the term $(-1)^{i+1}$ accounts for half of the propeller spinning clockwise and the others anti-clockwise.

The total contribution of drag torque can hence be written as:

<script type="math/tex; mode=display">
\mathbf{\tau}^B_{drag} = \sum_{i=1}^4 (-1)^{i+1} c_d w_i \lvert w_i \rvert \mathbf{e}_3
</script>

<script type="math/tex; mode=display">
\mathbf{f}^W = \mathbf{R}_B^W \mathbf{f}^B
</script>

<script type="math/tex; mode=display">
\mathbf{\tau}^B = \mathbf{\tau}^B_{drag} + \mathbf{\tau}^B_{thrust}
</script>

Rearranging terms of \eqref{eq:euler_newton} leads to:

<script type="math/tex; mode=display">
\begin{equation}
\begin{bmatrix} m \mathbf{a}^W  \\ \mathbf{J} \mathbf{\alpha}^B \end{bmatrix} = 
\begin{bmatrix} m\mathbf{g}_W \\ -\mathbf{\omega}_B \times \mathbf{J} \mathbf{\omega}_B \end{bmatrix} + \begin{bmatrix}
m \mathbf{R}_B^W & \mathbf{0} \\ \mathbf{0} & \mathbf{I}_3
\end{bmatrix} 
\begin{bmatrix} \mathbf{f}^B_{thrust} \\ \mathbf{\tau}^B_{drag} + \mathbf{\tau}^B_{thrust} \end{bmatrix}
\end{equation}
</script>

Thrust model  
state-space model: x'=f(x,u)
## Additional Resources

### Credits:
<!-- List all the sources that you used to create the page   -->
This course page was created by **Lisa Romana Schneider, MSc in Robotics at EPFL**, and funded by **IEEE RAS** and **EPFL**.

This course page is partly based on the Aerial Robotics class taught by [Prof. Dario Floreano](https://people.epfl.ch/dario.floreano) at EPFL (Ecole Polytéchnique Fédérale de Lausanne).

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->
[Introduction to Multicopter Design and Control (Quan Quan)](https://link.springer.com/book/10.1007/978-981-10-3382-7)- Textbook offering a systematic overview over multicopters from basic design guidelines to high-level control. 


