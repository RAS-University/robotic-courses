---
title: 8.1 Central Pattern Generator
parent: "Chapter 8: Locomotion"
has_children: false
nav_order: 1
layout: numbered
math: mathjax
chapter: 8
section: 1
publish: true
nav_exclude: true
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


# Central Pattern Generator 

<!-- bundle exec jekyll serve -->
<style>
/* Hide headings below level 2 from the table of contents */
#markdown-toc > li > ul > li > ul {
  display: none;
}
</style>
- Table of Contents
{:toc}

## Course overview

### Prerequisites

To get the most out of this Central Pattern Generator module, it’s helpful to have:

- Basic proficiency in **Python programming**
- Familiarity with fundamental concepts in **robotics, kinematics, and dynamics**
- Basic knowledge of **linear algebra, differential equations, and feedback control**

Previous coursework in **robot control**, or **model predictive control** is recommended but not mandatory.

Students without this background can still follow the course, provided they are prepared to review the necessary programming and control concepts when needed.



### Motivation

Legged locomotion enables robots to move across uneven terrain, stairs, obstacles, and other environments that are difficult for wheeled platforms. This capability is becoming increasingly relevant as industry shifts from fixed robots in structured factories toward mobile systems operating in uncertain, human-centered, and outdoor environments.

A central challenge is generating stable, coordinated, and adaptable rhythmic motion. Central Pattern Generators (CPGs) provide a bio-inspired solution by producing oscillatory signals that can coordinate multiple legs and generate gaits such as walking, trotting, and bounding. Their compact structure also makes them suitable for real-time control, gait transitions, and integration with sensory feedback.

This course develops these ideas progressively, from single-leg modeling and force control to quadruped locomotion, CPG-based gait generation, and reinforcement learning. It prepares students to understand how dynamics, feedback, rhythmic control, and learning can be combined to create robust locomotion systems for emerging robotic applications.

Here is a video to for you to explore Anymal, a legged robot developped by Anybotics a spin-off from ETH Zurich :

![ANYmal : parkour](https://www.youtube.com/watch?v=REvNnUzVDAA)


---

## Module 1 : Foundation of legged locomotion

### 1. Introduction :
We will start with a video that raise the foundational questions for our course :

![5 Horse gaits](https://www.youtube.com/watch?v=RV9P0w8vZi8)

Animals run, jump, recover from disturbances, and change gait almost effortlessly. Why is reproducing these abilities in a machine so difficult?
How can the same body, muscles, and joints generate several distinct locomotion patterns?

This Icelandic horse you have seen can walk, trot, canter, tölt, and perform a flying pace. Its mechanical structure does not change between these gaits. What changes is the coordination of its limbs: their timing, phase relationships, contact sequences, and interaction with the ground.

This observation introduces a central idea of legged locomotion:

> **A gait emerges from the interaction between the body, its actuation, and the coordination strategy controlling it.**

Before studying how Central Pattern Generators produce and coordinate rhythmic movements, we must first understand the physical system on which these rhythms act. This lecture therefore examines how legged robots evolved, how their bodies and legs are structured, and how their actuators generate the forces required for locomotion.




In this lecture, we simplify a robotic leg as a planar mechanism composed of two rigid links connected by rotational joints. This model is simple enough to analyse mathematically while still capturing the main motion of the hip, knee, and foot.

> **Image slot 1:** Quadruped robot with one leg highlighted.

The objective is to understand how joint movements determine the position of the foot. This relationship is the starting point for controlling foot trajectories, applying forces to the ground, and eventually producing locomotion.


### 2. Mechanical Structure of a Robotic Leg

A robotic leg is generally composed of:

- rigid links representing the different leg segments;
- joints allowing relative motion between the links;
- actuators producing joint torques;
- a foot or end effector interacting with the environment.

The number and arrangement of joints determine the leg's **degrees of freedom** and the positions that the foot can reach.

For a typical quadruped, each leg often contains three actuated joints. However, when studying motion in the sagittal plane, the leg can be simplified to two links and two rotational joints.

> **Image slot 2:** Real quadruped leg beside its two-link planar approximation.

This simplified model is commonly called a **double pendulum** or a **two-link manipulator**.


### 3. Actuation in legged robots

Actuators generate the torques that move the joints. Legged robots may use electric, hydraulic, pneumatic, or compliant actuators.

For the study of kinematics, the exact actuator technology is not yet essential. Kinematics describes the geometry of motion independently of the forces producing it.

However, actuator properties will later influence:

- how rapidly the joints can move;
- how accurately torque can be controlled;
- how the leg reacts to impacts;
- how safely it interacts with the ground.

> **Image slot 3:** Hip and knee actuators identified on a robotic leg.

For now, we assume that the two joints can be commanded independently through the joint variables \(q_1\) and \(q_2\).



### 4. The Planar Two-Link Leg

The model contains:

- two links of lengths \(l_1\) and \(l_2\);
- a fixed hip joint;
- a knee connecting the two links;
- a foot located at the end of the second link;
- two joint angles \(q_1\) and \(q_2\).

In the convention used here, both joint angles are measured with respect to the downward vertical direction.

The joint configuration is written as:

$$ \mathbf{q} = \begin{bmatrix} q_1 \\ q_2 \end{bmatrix} $$

The foot position in Cartesian space is written as:

$$ \mathbf{p} = \begin{bmatrix} x \\ y \end{bmatrix}$$

> **Image slot 4:** Annotated two-link leg showing \(q_1\), \(q_2\), \(l_1\), \(l_2\), the \(x\)-axis, the \(y\)-axis, the knee, and the foot.

This model creates two different descriptions of the same leg:

- **Joint space:** the leg is described using \(q_1\) and \(q_2\).
- **Cartesian space:** the leg is described using the foot coordinates \(x\) and \(y\).

Leg control frequently requires moving between these two representations.
### 5. Leg kinematics

#### 5.1 Forward Kinematics

**Forward kinematics** determines the position of the leg from its joint angles.

Its input is the joint configuration:

$$ (q_1 , q_2) $$

Its output is the Cartesian position of the knee and foot.

For the knee:

$$ x_1 = l_1\sin(q_1) $$

$$ y_1 = -l_1\cos(q_1) $$

For the foot:

$$ x_2 = l_1\sin(q_1)+l_2\sin(q_2) $$

$$ y_2 = -l_1\cos(q_1)-l_2\cos(q_2) $$

$$ \dot{x_1} = l_1\cos(q_1)\dot{q_1}$$

$$ \dot{y_1} = l_1\sin(q_1)\dot{q_1}$$

$$ \dot{x_2} = l_1\cos(q_1)\dot{q_1} + l_2\cos(q_2)\dot{q_2} $$

$$ \dot{y_2} = l_1\sin(q_1)\dot{q_1} + l_1\sin(q_2)\dot{q_2}$$
These equations define the geometric mapping:

$$ \mathbf{p}=f(\mathbf{q}) $$

In other words, once the joint angles are known, the position of the foot can be calculated.

> **Image slot 5:** Several configurations of the leg with their corresponding foot positions.


#### 5.2 Inverse Kinematics

**Inverse kinematics** considers the opposite problem:

> Given a desired foot position, which joint angles place the foot there?

Its input is:

$$ (x,y) $$

Its output is one or more possible joint configurations:

$$ (q_1,q_2) $$

Unlike forward kinematics, the inverse problem may not have a unique solution. The same foot position can sometimes be reached using different leg configurations.

> **Image slot 6:** Two different joint configurations reaching the same foot position.

Some desired positions may also be unreachable because of the finite lengths of the links. The set of all reachable foot positions defines the leg's **workspace**.



#### 5.3 Why Kinematics Matters for Locomotion

During locomotion, the controller must reason both about the joints and about the foot.

Examples include:

- placing the foot at a desired location;
- generating a swing trajectory;
- maintaining contact with the ground;
- controlling the height of the robot;
- preparing the leg for landing;
- coordinating several legs during a gait.

Forward and inverse kinematics provide the geometric foundation for these operations.

> **Image slot 7:** Course progression: joint angles → foot position → Jacobian → Cartesian control → hopping.


Kinematics describes how the joint angles determine the position and velocity of the leg. **Dynamics** describes how forces and joint torques produce motion.

For the two-link leg, the joint variables are:

$$ \mathbf{q} = \begin{bmatrix} q_1 \\ q_2 \end{bmatrix},
\qquad
\dot{\mathbf{q}} = \begin{bmatrix} \dot{q}_1 \\ \dot{q}_2 \end{bmatrix},
\qquad
\ddot{\mathbf{q}} = \begin{bmatrix} \ddot{q}_1 \\ \ddot{q}_2 \end{bmatrix} $$

The actuator torques are:

$$
\boldsymbol{\tau}
=
\begin{bmatrix}
\tau_1 \\
\tau_2
\end{bmatrix}
$$

<!-- IMAGE SLOT:
Insert the two-link leg model showing:
- q1 and q2
- l1 and l2
- m1 and m2
- gravity g
- torques tau1 and tau2
-->

> **Angle convention:** in this practical, \(q_1\) and \(q_2\) are both measured with respect to the downward vertical direction. Therefore, \(q_2\) is an absolute link orientation rather than a relative knee angle.

### 6. Leg dynamics

#### 6.1 General Equation of Motion

The dynamics of a robotic system can be written as:

$$
\boldsymbol{\tau} =
\mathbf{B}(\mathbf{q})\ddot{\mathbf{q}}
+
\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})
+
\mathbf{g}(\mathbf{q})
$$

where:

- $\mathbf{B}(\mathbf{q})$ is the inertia matrix ;
- $\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})$ contains velocity-dependent effects;
- $\mathbf{g}(\mathbf{q})$ contains the gravitational torques;
- $\boldsymbol{\tau}$ contains the actuator torques.

Friction and other non-conservative effects may be added as:

$$
\boldsymbol{\tau}
=
\mathbf{B}(\mathbf{q})\ddot{\mathbf{q}}
+
\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})
+
\mathbf{g}(\mathbf{q})
+
\mathbf{F}(\mathbf{q},\dot{\mathbf{q}})
$$

In the following derivation, friction is neglected.

---

#### 6.2 Lagrangian Method

The equations of motion can be derived using the Lagrangian:

$$
L(\mathbf{q},\dot{\mathbf{q}})
=
T(\mathbf{q},\dot{\mathbf{q}})
-
V(\mathbf{q})
$$

where:

- $T$ is the total kinetic energy;
- $V$ is the total potential energy.

For each joint $q_i$, the Euler–Lagrange equation is:

$$
\frac{d}{dt}
\left(
\frac{\partial L}{\partial \dot{q}_i}
\right)
-
\frac{\partial L}{\partial q_i}
=
\tau_i
$$

For the two-link leg:

$$
\frac{d}{dt}
\left(
\frac{\partial L}{\partial \dot{q}_1}
\right)
-
\frac{\partial L}{\partial q_1}
=
\tau_1
$$

$$
\frac{d}{dt}
\left(
\frac{\partial L}{\partial \dot{q}_2}
\right)
-
\frac{\partial L}{\partial q_2}
=
\tau_2
$$

---

#### 6.3 Potential Energy

Potential energy depends on the configuration \(\mathbf{q}\), but not on the joint velocities.

The vertical positions of the two masses are:

$$ y_1=-l_1\cos(q_1) $$

$$ y_2=-l_1\cos(q_1)-l_2\cos(q_2) $$

The potential energy associated with \(m_1\) is:

$$ V_1=m_1gy_1 $$

Therefore:

$$ V_1=-m_1gl_1\cos(q_1) $$

For the second mass:

$$ V_2=m_2gy_2 $$

Therefore:

$$ V_2 = -m_2g\left(l_1\cos(q_1)+l_2\cos(q_2)\right)$$

The total potential energy is:

$$ V(\mathbf{q})=V_1+V_2 $$

Hence:

$$ V(\mathbf{q}) = -(m_1+m_2)gl_1\cos(q_1) - m_2gl_2\cos(q_2) $$

<!-- IMAGE SLOT:
Insert the two-link model with the vertical positions y1 and y2 highlighted.
-->



#### 6.4 Kinetic Energy

Kinetic energy depends on both the configuration and the joint velocities.

For a point mass:

$$ T_i = \frac{1}{2}m_i \left(\dot{x}_i^2+\dot{y}_i^2\right)$$

For the first mass:

$$ T_1 = \frac{1}{2}m_1l_1^2\dot{q}_1^2 $$

For the second mass:

$$ T_2 = \frac{1}{2}m_2 \left[ l_1^2\dot{q}_1^2 + l_2^2\dot{q}_2^2 + 2l_1l_2\cos(q_1-q_2) \dot{q}_1\dot{q}_2 \right] $$

The total kinetic energy is:

$$ T=T_1+T_2 $$

Therefore:

$$ T = \frac{1}{2}(m_1+m_2)l_1^2\dot{q}_1^2 + \frac{1}{2}m_2l_2^2\dot{q}_2^2 + m_2l_1l_2 \cos(q_1-q_2)\dot{q}_1\dot{q}_2 $$

<!-- IMAGE SLOT:
Insert the two-link model with the velocity vectors of m1 and m2.
-->

Once the kinetic and potential energies are known, define the Lagrangian:

$$
L(\mathbf{q},\dot{\mathbf{q}})=T(\mathbf{q},\dot{\mathbf{q}})-V(\mathbf{q})
$$

The kinetic energy can always be written as:

$$
T=
\frac{1}{2}
\dot{\mathbf{q}}^{T}
\mathbf{B}(\mathbf{q})
\dot{\mathbf{q}}
$$

The inertia matrix is therefore obtained by identifying the coefficients of the quadratic velocity terms:

$$
B_{ij}
=
\frac{\partial^2 T}
{\partial \dot{q}_i\,\partial \dot{q}_j}
$$

The potential energy gives the gravity vector:

$$
\mathbf{g}(\mathbf{q})
=
\frac{\partial V}{\partial \mathbf{q}}
$$

Finally, applying the Euler–Lagrange equations produces the complete dynamics:

$$
\boldsymbol{\tau}
=
\mathbf{B}(\mathbf{q})\ddot{\mathbf{q}}
+
\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})
+
\mathbf{g}(\mathbf{q})
$$

#### 6.5 Inertia Matrix

The inertia matrix is:

$$ \mathbf{B}(\mathbf{q}) = \begin{bmatrix}(m_1+m_2)l_1^2 & m_2l_1l_2\cos(q_1-q_2)\\ m_2l_1l_2\cos(q_1-q_2) & m_2l_2^2 \end{bmatrix} $$

The diagonal terms describe the inertia associated with each joint. The off-diagonal terms describe the dynamic coupling between the two links.


#### 6.6 Velocity-Dependent Terms

The velocity-dependent vector is:

$$ \mathbf{C}(\mathbf{q},\dot{\mathbf{q}}) = \begin{bmatrix}m_2l_1l_2 \sin(q_1-q_2)\dot{q}_2^2 \\ -m_2l_1l_2\sin(q_1-q_2)\dot{q}_1^2 \end{bmatrix}$$

These terms arise because the two links move together and influence each other's motion.

---

#### 6.7 Gravity Vector

The gravitational contribution is obtained from the derivatives of the potential energy:

$$ \mathbf{g}(\mathbf{q}) = \frac{\partial V}{\partial \mathbf{q}}$$

Therefore:

$$ \mathbf{g}(\mathbf{q}) = \begin{bmatrix}(m_1+m_2)gl_1\sin(q_1)\\ m_2gl_2\sin(q_2) \end{bmatrix}
$$


#### 6.8 Complete Dynamics

The complete equation of motion is:

$$ \begin{bmatrix} \tau_1 \\ \tau_2 \end{bmatrix} = \begin{bmatrix} (m_1+m_2)l_1^2 & m_2l_1l_2\cos(q_1-q_2) \\ m_2l_1l_2\cos(q_1-q_2) & m_2l_2^2 \end{bmatrix}
\begin{bmatrix} \ddot{q}_1 \\ \ddot{q}_2 \end{bmatrix} $$

$$ + \begin{bmatrix} m_2l_1l_2\sin(q_1-q_2)\dot{q}_2^2 \\ -m_2l_1l_2\sin(q_1-q_2)\dot{q}_1^2 \end{bmatrix} + \begin{bmatrix} (m_1+m_2)gl_1\sin(q_1) \\ m_2gl_2\sin(q_2 \end{bmatrix} $$

Equivalently:

$$
\tau_1
=
(m_1+m_2)l_1^2\ddot{q}_1
+
m_2l_1l_2\cos(q_1-q_2)\ddot{q}_2
+
m_2l_1l_2\sin(q_1-q_2)\dot{q}_2^2
+
(m_1+m_2)gl_1\sin(q_1)
$$

$$
\tau_2
=
m_2l_1l_2\cos(q_1-q_2)\ddot{q}_1
+
m_2l_2^2\ddot{q}_2
-
m_2l_1l_2\sin(q_1-q_2)\dot{q}_1^2
+
m_2gl_2\sin(q_2)
$$

<!-- IMAGE SLOT:
Insert a visual decomposition of the dynamics into:
1. inertia terms;
2. velocity-dependent terms;
3. gravity terms.
-->

#### 6.9 Forward and Inverse Dynamics

---

### 7. From Leg Modeling to Control

The kinematic and dynamic models allow us to compute the torques required to control the leg. The controller may operate either in:

- **joint space**, using joint angles and velocities;
- **Cartesian space**, using the position, velocity, and force of the foot.

---

#### 7.1 The Jacobian

The forward kinematics defines the foot position as a function of the joint configuration:

$$ \mathbf{p}=f(\mathbf{q}) $$

For the planar two-link leg:

$$
\mathbf{p} = \begin{bmatrix} x_2 \\ y_2 \end{bmatrix}
$$

with:

$$
x_2=l_1\sin(q_1)+l_2\sin(q_2)
$$

$$
y_2=-l_1\cos(q_1)-l_2\cos(q_2)
$$

Differentiating the foot position gives:

$$
\dot{x}_2 =
l_1\cos(q_1)\dot{q}_1
+
l_2\cos(q_2)\dot{q}_2
$$

$$
\dot{y}_2
=
l_1\sin(q_1)\dot{q}_1
+
l_2\sin(q_2)\dot{q}_2
$$

These equations can be written in matrix form:

$$ \begin{bmatrix} \dot{x}_2 \\ \dot{y}_2 \end{bmatrix} = \begin{bmatrix} l_1\cos(q_1) & l_2\cos(q_2) \\ l_1\sin(q_1) & l_2\sin(q_2) \end{bmatrix}
\begin{bmatrix} \dot{q}_1 \\ \dot{q}_2 \end{bmatrix} $$

The matrix relating joint velocity to foot velocity is the **Jacobian**:

$$
\mathbf{J}(\mathbf{q})
=
\frac{\partial \mathbf{p}}{\partial \mathbf{q}}
$$

Therefore:

$$
\mathbf{J}(\mathbf{q}) = \begin{bmatrix} l_1\cos(q_1) & l_2\cos(q_2) \\ l_1\sin(q_1) & l_2\sin(q_2) \end{bmatrix}
$$

The velocity relationship becomes:

$$
\mathbf{v}
=
\mathbf{J}(\mathbf{q})\dot{\mathbf{q}}
$$

where:

$$
\mathbf{v}
=
\dot{\mathbf{p}}
=
\begin{bmatrix}
\dot{x}_2 \\ \dot{y}_2
\end{bmatrix}
$$

The Jacobian therefore provides a local mapping between:

$$
\text{joint velocity}
\quad \longrightarrow \quad
\text{foot velocity}
$$

<!-- IMAGE SLOT:
Insert the two-link leg with:
- joint velocities qdot_1 and qdot_2;
- Cartesian foot velocity v;
- the mapping v = J(q)qdot.
-->

#### 7.2 Cartesian PD Control

A Cartesian controller directly controls the position of the foot rather than the individual joint angles.

Let $ \mathbf{p}_d $ be the desired foot position and, $ \mathbf{v}_d $ the desired foot velocity.

The position and velocity errors are:

$$
\mathbf{e}_p = \mathbf{p}_d-\mathbf{p}
$$

$$
\mathbf{e}_v = \mathbf{v}_d-\mathbf{v}
$$

A Cartesian PD controller computes a corrective Cartesian force:

<div class="math-display">
\[
\mathbf{F}_{PD} = \mathbf{K}_{p}(\mathbf{p}_{d}-\mathbf{p}) + \mathbf{K}_{d}(\mathbf{v}_{d}-\mathbf{v})
\]
</div>

where:

- $\mathbf{K}_{p,C}$ is the Cartesian proportional gain;
- $\mathbf{K}_{d,C}$ is the Cartesian derivative gain.

This Cartesian force must then be converted into joint torques:

<div class="math-display">
\[
\boldsymbol{\tau}_{\mathrm{Cartesian}} = \mathbf{J}^{T}(\mathbf{q})\mathbf{F}_{\mathrm{PD}}
\]
</div>

Therefore:

<div class="math-display">
\[
\boldsymbol{\tau}_{Cartesian}
=
\mathbf{J}^{T}(\mathbf{q})
\left[
\mathbf{K}_{p,C}
\left(
\mathbf{p}_d-\mathbf{p}
\right)
+
\mathbf{K}_{d,C}
\left(
\mathbf{v}_d-\mathbf{v}
\right)
\right]
\]
</div>

The controller follows three steps:

1. Measure the current joint configuration $\mathbf{q}$.
2. Use forward kinematics and the Jacobian to compute $\mathbf{p}$ and $\mathbf{v}$.
3. Convert the Cartesian correction into joint torques using $\mathbf{J}^{T}$.

<!-- IMAGE SLOT:
Insert the Cartesian PD control loop:

Desired foot position
        ↓
Cartesian position and velocity errors
        ↓
Desired Cartesian force
        ↓ J(q)^T
Joint torques
        ↓
Two-link leg
-->

---

#### 7.3 Force Control

The Jacobian transpose also maps a desired foot force into the corresponding joint torques:

$$
\boldsymbol{\tau}
=
\mathbf{J}^{T}(\mathbf{q})\mathbf{F}
$$

This relationship follows from the **principle of virtual work**.

For a small virtual joint displacement:

$$
\delta\mathbf{q}
$$

the corresponding virtual foot displacement is:

$$
\delta\mathbf{p}
=
\mathbf{J}(\mathbf{q})\delta\mathbf{q}
$$

The virtual work produced by the Cartesian force is:

$$
\delta W_F
=
\mathbf{F}^{T}\delta\mathbf{p}
$$

Substituting the displacement relationship gives:

$$
\delta W_F
=
\mathbf{F}^{T}
\mathbf{J}(\mathbf{q})
\delta\mathbf{q}
$$

The virtual work produced by the joint torques is:

$$
\delta W_{\tau}
=
\boldsymbol{\tau}^{T}\delta\mathbf{q}
$$

Because both expressions represent the same work:

$$
\boldsymbol{\tau}^{T}\delta\mathbf{q}
=
\mathbf{F}^{T}
\mathbf{J}(\mathbf{q})
\delta\mathbf{q}
$$

Therefore:

$$
\boldsymbol{\tau}
=
\mathbf{J}^{T}(\mathbf{q})\mathbf{F}
$$

This allows the controller to command a desired ground-contact force without explicitly calculating desired joint angles.

An additional force can also be combined with joint-space and Cartesian controllers:

<div class="math-display">
\[
\boldsymbol{\tau}_{final}
=
\boldsymbol{\tau}_{joint}
+
\boldsymbol{\tau}_{Cartesian}
+
\mathbf{J}^{T}(\mathbf{q})\mathbf{F}_{extra}

\]
</div>

<!-- IMAGE SLOT:
Insert the leg in contact with the ground, showing:
- Cartesian force F at the foot;
- joint torques tau_1 and tau_2;
- the mapping tau = J(q)^T F.
-->

---

#### 7.4 Inverse Kinematics versus Force Control

There are two main ways to command the foot toward a desired position.

##### Inverse Kinematics with Joint PD Control

Inverse kinematics first computes the desired joint configuration:

$$
\mathbf{q}_d
=
f^{-1}(\mathbf{p}_d)
$$

A joint-space PD controller then tracks this configuration:

<div class="math-display">
\[
\boldsymbol{\tau}_{joint}
=
\mathbf{K}_{p,j}
\left(
\mathbf{q}_d-\mathbf{q}
\right)
+
\mathbf{K}_{d,j}
\left(
\dot{\mathbf{q}}_d-\dot{\mathbf{q}}
\right)

\]
</div>

The control sequence is:

<div class="math-display">
\[
\mathbf{p}_d
\longrightarrow
\mathbf{q}_d
\longrightarrow
\boldsymbol{\tau}_{joint}
\]
</div>


Inverse kinematics can be computed analytically or numerically.

##### Analytical Inverse Kinematics

For a two-link mechanism, the solution can be derived geometrically using the cosine rule.

Using the coordinate convention $(x,z)$ and relative joint angles $\theta_1$ and $\theta_2$:

$$
\theta_2
=
\pm
\cos^{-1}
\left(
\frac{x^2+z^2-l_1^2-l_2^2}
{2l_1l_2}
\right)
$$

Then:

$$
\theta_1
=
\operatorname{atan2}(z,x)
\mp
\operatorname{atan2}
\left(
l_2\sin(\theta_2),
l_1+l_2\cos(\theta_2)
\right)
$$

The two signs represent two possible configurations, often described as two different knee or elbow orientations.

> **Reference-frame note:** these equations use the angle and axis convention shown in the inverse-kinematics derivation. Signs must be adapted when using a different simulation reference frame.

Analytical inverse kinematics is fast and exact, but the equations are specific to the robot geometry and become difficult for complex mechanisms.

<!-- IMAGE SLOT:
Insert two different leg configurations reaching the same foot position.
-->

##### Iterative Inverse Kinematics

For more complex robots, inverse kinematics can be solved numerically.

Starting from an initial configuration $\mathbf{q}_0$, compute the Cartesian error:

$$
\Delta\mathbf{p}
=
\mathbf{p}_d-\mathbf{p}
$$

The joint configuration is updated using the Jacobian pseudo-inverse:

$$
\mathbf{q}_{k+1}
=
\mathbf{q}_k
+
\alpha
\mathbf{J}^{+}(\mathbf{q}_k)
\Delta\mathbf{p}
$$

where:

- $\mathbf{J}^{+}$ is the Moore–Penrose pseudo-inverse;
- $\alpha$ is the update step size.

The procedure is repeated until:

$$
\left\|
\mathbf{p}_d-\mathbf{p}
\right\|
<
\varepsilon
$$

Near singular configurations, a damped pseudo-inverse can improve numerical stability:

$$
\mathbf{J}^{+}_{\lambda}
=
\mathbf{J}^{T}
\left(
\mathbf{J}\mathbf{J}^{T}
+
\lambda^2\mathbf{I}
\right)^{-1}
$$

A larger damping factor $\lambda$ improves stability but makes the result less similar to the exact pseudo-inverse.

<!-- IMAGE SLOT:
Insert the iterative inverse-kinematics loop:

Initial joint configuration
        ↓
Forward kinematics
        ↓
Foot-position error
        ↓
Jacobian pseudo-inverse
        ↓
Updated joint configuration
        ↺
-->

##### Comparison

| Method | Main operation | Main advantage | Main limitation |
|---|---|---|---|
| Inverse kinematics with joint PD | Convert desired foot position into desired joint angles | Direct joint reference and accurate geometric positioning | Requires an inverse solution and selection between possible configurations |
| Cartesian PD control | Convert Cartesian position and velocity errors into a corrective force | Controls the foot directly in task space | Performance depends on Cartesian gains and the Jacobian |
| Force control | Convert a desired foot force directly into joint torques | Well suited to ground contact and physical interaction | Does not directly impose an exact foot position |

Inverse kinematics answers:

> **Which joint angles place the foot at the desired position?**

Cartesian and force control answer:

> **Which joint torques produce the desired Cartesian behaviour or contact force?**

#### 7.5 Single leg hopping
Single-leg hopping combines the control methods introduced previously. The leg must maintain a suitable configuration while generating a Cartesian force at the foot to push against the ground.

<!-- IMAGE SLOT:
Insert the single-leg hopping model showing:
- joint torques tau_1 and tau_2;
- vertical foot force F_z;
- optional horizontal force F_x.
-->

A hopping controller may combine:

- joint PD control to regulate the leg configuration;
- Cartesian PD control to regulate the foot position;
- an additional foot-force command to generate the jump.

The total commanded torque is:
<div class="math-display">
\[
\boldsymbol{\tau}_{\mathrm{final}} = \boldsymbol{\tau}_{\mathrm{joint}} + \boldsymbol{\tau}_{\mathrm{Cartesian}} + \mathbf{J}^{T}(\mathbf{q})\mathbf{F}
\]
</div>

where the desired foot force is:

$$
\mathbf{F} = \begin{bmatrix} F_x \\ F_z \end{bmatrix}
$$

For a vertical jump, the main command is the vertical force $F_z$. A single force pulse produces one jump, while a periodic force profile can produce continuous hopping.

<!-- IMAGE SLOT:
Insert a plot of:
- a single vertical force pulse;
- a periodic force profile for continuous hopping.
-->

The hopping behaviour depends on several controller parameters:

- peak vertical force;
- hopping frequency;
- initial or nominal leg position;
- joint-space gains;
- Cartesian-space gains;
- gains used during contact and flight.

These parameters determine the jump height, repetition rate, leg posture, and stability of the motion.

They may also be optimized by defining a parameter vector such as:

$$
\mathbf{x} = \begin{bmatrix} f & F_{z,\mathrm{peak}} & \cdots \end{bmatrix}^{T}
$$

and selecting an objective, for example maximizing the jump height while respecting suitable parameter bounds.

At the end of this section, you will implement and tune a single-leg hopping controller as an exercise.

##  Module 2 : Model-based control quadruped
##  Module 3 : Advanced locomotion control : CPG



## Credits

## Ressources




---

[Back to Top](#start)