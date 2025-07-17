---
title: Dynamics
parent: Courses
layout: default
nav_order: 3
---

<script src="questions.js"></script>

<a name="top"></a>

<style>
  #back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color:rgb(0, 0, 0); /* Green background */
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    font-size: 30px;
    cursor: pointer;
    text-decoration: none;
    z-index: 1000;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  #back-to-top:hover {
    opacity: 1;
  }
</style>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Dynamics [In progress]


<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1. Prerequisites
To get the most out of this **Dynamics module**, it’s strongly recommended that you have already completed:

1. **[Kinematics](kinematics)**  
- A solid understanding of robot configurations, coordinate transformations and velocity kinematics.
- Familiarity with forward and inverse kinematics, jacobians and joint-space vs task-space representations. 

2. **Basic Mechanical Physics**
- Newton’s laws of motion, especially **force = mass × acceleration (F = ma)**.
- Concepts of **moment of inertia**, **torque**, and **rotational motion**.
- Understanding of **Coriolis** and **centrifugal forces**, which play a key role in the equations of motion for moving reference frames like robotic arms.
- Energy principles like **kinetic energy**, **potential energy**, and **conservation of energy**.

These prerequisites are essential because dynamics connects the dots between motion and its causes

---

## 2. General Motivation

![ANYmal Parkour](https://www.youtube.com/watch?v=QDU_FicBPDo)
><sub>Parkour in the Wild: ANYmal leaping over rubble and gaps. YouTube video, Mai 2025. Available at: https://www.youtube.com/watch?v=QDU_FicBPDo</sub>

![Boston Dynamics](https://www.youtube.com/watch?v=I44_zbEwz_w)
><sub>Boston Dynamics Atlas crawling, running, and balancing. YouTube video, April 2025. Available at: https://www.youtube.com/watch?v=I44_zbEwz_w</sub>


How do robots jump over gaps, crawl under obstacles, or balance on one leg?

It’s not magic — it’s **dynamics**.

If kinematics is the geometry of movement, dynamics is the physics behind it. It answers questions like:
- How much torque does a joint need to lift a leg while climbing a beam?
- What forces act on a robot when landing after a leap?
- How can a robot balance itself when slipping or being pushed?

Dynamics is the part of robotics that deals with **forces, torques, mass, and motion**. Whether a robot is controlled with code or trained with AI, it still needs to obey the laws of physics.

In these videos, the robots are not just following a path — they are reacting to **gravity, inertia, and impact** in real time.

Studying dynamics helps you:
- Predict how robots move when pushed or land from a jump
- Design systems that stay stable on rough, slippery, or uneven terrain
- Understand the real physics behind motion 

If you want to make robots that **move like athletes**, **adapt like animals**, and **react like pros**, then ***dynamics*** is your next step.

---

## 3. Course Content


### Chapter 0: Why Dynamics?
- Motivation: Why kinematics isn't enough  
- What dynamics adds: Forces, torques, and real-world behavior  
- Examples: Balancing, jumping, slipping, and interacting with the world

---

### Chapter 1: Energy-Based Modeling – The Lagrangian Formulation
- Generalized coordinates and velocities  
- Kinetic and potential energy of robotic systems  
- Euler–Lagrange equations  
- Example: Pendulum and simple manipulators

---

### Chapter 2: Understanding the Mass Matrix
- Deriving the mass matrix from kinetic energy  
- Properties: Symmetry, positive-definiteness, configuration dependence  
- Example: Two-link planar robot

---

### Chapter 3: Dynamics of a Single Rigid Body
- Newton-Euler equations for a free rigid body  
- Linear and angular momentum  
- Inertia tensor and spatial representation

---

### Chapter 4: Inverse Dynamics with Newton-Euler
- Recursive Newton-Euler algorithm  
- Computing joint torques given a motion  
- Efficiency advantages for real-time control

---

### Chapter 5: Forward Dynamics of Open Chains
- Computing motion from applied torques  
- Articulated body algorithm (brief overview)  
- Simulation pipelines

---

### Chapter 6: Task-Space Dynamics
- Mapping dynamics from joint space to end-effector (operational) space  
- Operational space inertia matrix  
- Force control and impedance concepts

---

### Chapter 7: Constrained Dynamics
- Dealing with closed kinematic chains and contact  
- Constraint forces and Lagrange multipliers  
- Applications in legged robots and grasping

---

### Chapter 8: Actuation, Gearing & Friction
- Modeling motors and gear ratios  
- Viscous and Coulomb friction  
- Backdrivability and actuator limitations





<!-- 
Let us start by introducing the projection of the world to an image plane. Assume that a point in the world $(X, Y, Z)$ has coordinates $(X_{ci}, Y_{ci}, Z_{ci})$ with respect to the coordinate system of a camera $c_i$, related to each other by the following transformation:

$$\begin{pmatrix} X_{ci} \\ Y_{ci} \\ Z_{ci} \end{pmatrix} = R_i \begin{pmatrix} X \\ Y \\ Z \\ 1 \end{pmatrix} + T_i$$

where $R_i$ is a rotation matrix whose columns are the world axes with respect to the camera. The translation vector $T_i$ is starting from the origin of the camera and ending at the origin of the world coordinate system.

The rotation matrix is orthogonal, $R^T R = I\$, with determinant one. We assume that the center of projection is the origin of the coordinate system and that the optical axis is the $Z_{ci}$ axis of the camera. If we assume that the image plane is the plane $Z_{ci} = 1$, then the image coordinates $(x_i, y_i)$ are given by:

$$
x_i = \frac{X_{ci}}{Z_{ci}}, \quad y_i = \frac{Y_{ci}}{Z_{ci}} \tag{32.2}
$$

In practice, what we measure are the pixel coordinates $(u_i, v_i)$ in the image, which are related to the image coordinates $(x_i, y_i)$ with the affine transformation:

$$
u_i = f (\alpha x_i + \beta y_i + c_u), \quad v_i = f(y_i + c_v) \tag{32.3}
$$

where $f$ is the distance of the image plane to the projection center measured in pixels. It is also called the focal length, because they are considered approximately equal. The aspect ratio $\alpha$ is a scaling induced by nonsquare sensor cells or different sampling rates horizontally and vertically. The skew factor $\beta$ accounts for a shearing induced by a nonperfectly frontal image plane. The image center $(c_u, c_v)$ is the point of intersection of the image plane with the optical axis, called the image center. These five parameters are called intrinsic parameters, and the process of recovering them is called intrinsic calibration. Upon recovering them, we can talk about a calibrated system, and we can work with the image coordinates $(x_i, y_i)$ instead of the pixel coordinates $(u_i, v_i)$.

In many vision systems, particularly on mobile robots, wide-angle lenses introduce a radial distortion around the image center, which can be modeled polynomially:

$$
x_{dist} = x_i \left(1 + k_1 r + k_2 r^2 + k_3 r^3 + \dots \right)
$$

$$
y_{dist} = y_i \left(1 + k_1 r + k_2 r^2 + k_3 r^3 + \dots \right)
$$

$$
r^2 = x_i^2 + y_i^2
$$

We temporarily assume that the image center is at $(0,0)$. The image coordinates $(x_i, y_i)$ in equation (32.3) should be replaced with the distorted coordinates $(x_{dist}, y_{dist})$.
 -->
