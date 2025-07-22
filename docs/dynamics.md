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


Kinematics helps us plan how a robot *should* move.  
But what about **how much force** a motor needs to apply?  
Or what happens when the robot lands from a jump?

That is where **dynamics** comes in.

Dynamics is the study of how **forces and torques** cause motion. It lets us:
- Predict how robots react to impacts, slopes, or slippery surfaces  
- Simulate realistic motion for design and testing  
- Control how fast and how strong each joint needs to move  
- Understand why motion doesn’t happen exactly as planned

If kinematics gives us a **map**, dynamics gives us the **engine** that drives the robot in the real world.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Which of the following best describes the difference between kinematics and dynamics?</strong></p>
<form id="q0-1">
  <input type="radio" name="q0-1" value="A"> Kinematics and dynamics both describe forces<br>
  <input type="radio" name="q0-1" value="B"> Kinematics is about motion caused by forces, while dynamics is only about geometry<br>
  <input type="radio" name="q0-1" value="C"> Kinematics describes motion without forces, dynamics includes forces and torques<br>
  <input type="radio" name="q0-1" value="D"> They are the same thing<br>
  <button type="button"
    onclick="checkTrueFalse('q0-1', 'C', 
      'Correct! Kinematics deals with geometry and motion; dynamics includes forces and torques.',
      'Not quite. Think about what causes motion, not just how it happens.')">
    Check Answer
  </button>
  <p id="q0-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: A robot follows a planned path but slips while walking downhill. Why might this happen?</strong></p>
<form id="q0-2">
  <input type="radio" name="q0-2" value="A"> The robot's motors were not strong enough<br>
  <input type="radio" name="q0-2" value="B"> The dynamics (forces, friction) weren't accounted for<br>
  <input type="radio" name="q0-2" value="C"> The robot had a sensor malfunction<br>
  <input type="radio" name="q0-2" value="D"> All of the above<br>
  <button type="button"
    onclick="checkTrueFalse('q0-2', 'D', 
      'Correct! All of these are possible reasons when dynamics isn’t considered properly.',
      'Not quite. Slipping usually comes from ignoring real-world physical forces.')">
    Check Answer
  </button>
  <p id="q0-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Which robot behavior is most likely influenced by dynamics?</strong></p>
<form id="q0-3">
  <input type="radio" name="q0-3" value="A"> Drawing a perfect square on paper<br>
  <input type="radio" name="q0-3" value="B"> Lifting a heavy object<br>
  <input type="radio" name="q0-3" value="C"> Solving a maze<br>
  <input type="radio" name="q0-3" value="D"> Turning on a light<br>
  <button type="button"
    onclick="checkTrueFalse('q0-3', 'B', 
      'Correct! Lifting an object requires calculating torque and motor force – core to dynamics.',
      'Incorrect. Think about which action requires real effort or force.')">
    Check Answer
  </button>
  <p id="q0-3-feedback"></p>
</form>

</details>


---

### Chapter 1: Energy-Based Modeling – The Lagrangian Formulation
> - Generalized coordinates and velocities  
> - Kinetic and potential energy of robotic systems  
> - Euler–Lagrange equations  
> - Example: Pendulum and simple manipulators

![Lagrangian Part 1](https://www.youtube.com/watch?v=1U6y_68CjeY)  
><sub>Modern Robotics, Chapter 8.1: Lagrangian Formulation of Dynamics (Part 1 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=1U6y_68CjeY</sub>

In this video, we explore the **dynamics of open-chain robots** and introduce two major approaches to deriving their equations of motion:

- **Forward Dynamics** — used for **simulation**. It tells us *how* a robot will move given known torques or forces.
- **Inverse Dynamics** — used in **control**. It tells us *what torques* are required to follow a desired motion.

Two key modeling approaches are compared:

1. **Lagrangian Formulation**  
   A **variational method** based on the robot’s **kinetic** and **potential energy**. It gives us compact, system-wide equations without dealing with forces on each individual link.

2. **Newton–Euler Formulation**  
   A **force-based method** applying **Newton’s second law** (\( F = ma \)) and torque equations link by link. It's more direct but less elegant for complex systems.

---

#### The Power of the Lagrangian Approach

In dynamics, we often ask:

> "Given a robot's configuration and energy, what equations govern its motion?"

The **Lagrangian formulation** answers this by defining a single scalar value called the **Lagrangian**:

$$
\boxed{L(\theta, \dot{\theta}) = K(\theta, \dot{\theta}) - P(\theta)}
$$

Where:
- $K$: Kinetic energy  
- $P$: Potential energy  
- $\theta$: Generalized coordinates (e.g., joint angles)  
- $\dot{\theta}$: Generalized velocities

Using the **Euler–Lagrange equation**, we can systematically derive the equations of motion:

$$
\frac{d}{dt} \left( \frac{\partial L}{\partial \dot{\theta}_i} \right) - \frac{\partial L}{\partial \theta_i} = \tau_i
$$

Where:
- $\theta_i$: The $i$-th generalized coordinate  
- $\dot{\theta}_i$: Its velocity  
- $\tau_i$: Torque or generalized force applied at joint $i$

---

#### From Theory to General Dynamic Equation

By applying the Lagrangian method to full robotic systems, we arrive at the **general equation of motion** for manipulators:

$$
\tau = M(\theta)\ddot{\theta} + c(\theta, \dot{\theta}) + g(\theta)
$$

Where:
- $\tau$: Vector of joint torques  
- $M(\theta)$: **Mass (inertia) matrix** — describes how mass is distributed across the robot  
- $c(\theta, \dot{\theta})$: **Velocity-product term** — includes **Coriolis** and **centrifugal** forces  
- $g(\theta)$: **Gravity term** — torques needed to compensate for gravity


This equation is central to **model-based control**, **trajectory planning**, and **robot simulation**. It explains how acceleration, motion-induced forces, and gravity affect the torques at each joint.


We can use it in two ways:

#### Forward Dynamics
**Given**: torques $\tau$  
**Compute**: joint accelerations $\ddot{\theta}$ (→ then velocities and positions)

This is used in **simulation** to see how a robot will move when forces are applied.

$$
\ddot{\theta} = M(\theta)^{-1} \left( \tau - c(\theta, \dot{\theta}) - g(\theta) \right)
$$

#### Inverse Dynamics
**Given**: desired motion $\theta(t), \dot{\theta}(t), \ddot{\theta}(t)$  
**Compute**: required joint torques $\tau$

This is used in **control** to determine the torques needed to follow a trajectory.

You can think of forward and inverse dynamics like this:
<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/Dynamics/dyna.png' }}" width="200px" alt="dyna">
</figure>

---

![Lagrangian Part 2](https://www.youtube.com/watch?v=BjD-pL819LA)  
><sub>Modern Robotics, Chapter 8.1: Lagrangian Formulation of Dynamics (Part 2 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=BjD-pL819LA</sub>

In this follow-up video, the focus is on the **velocity-product term** $c(\theta, \dot{\theta})$, which captures how motion affects internal forces.

Key insights:
- $c(\theta, \dot{\theta})$ includes both **Coriolis** and **centrifugal** effects.
- The term is derived and visualized using a **2R planar robot arm**.
- The video explains how $c(\theta, \dot{\theta})$ changes depending on the motion state:
  - If both joints are moving  
  - If only one joint moves  
  - If both joints are stationary

These examples help you build **intuition** about how joint interactions create complex dynamic behavior — especially important in fast or heavy motion.

---

#### Why the Lagrangian Formulation Matters

- It **scales well** for robots with many joints  
- It avoids repetitive force analysis for each link  
- It automatically produces structured outputs:  
  - The **mass matrix** $M(\theta)$  
  - The **Coriolis/centrifugal** term $c(\theta, \dot{\theta})$  
  - The **gravity term** $g(\theta)$

Using this method, we can model and control:
- Simple pendulums  
- Multi-link robotic arms  
- Complex manipulators in 2D or 3D space

---

🔧 In this chapter, you will learn how to derive these equations step by step — starting with single-link systems and building up to complete open-chain robots.

<details markdown="1">
  <summary>Conceptual Questions</summary>
<!-- Question 1 -->
<p><strong>Question 1: What does the Lagrangian represent?</strong></p>
<form id="lag-q1">
  <input type="radio" name="lag-q1" value="A"> The sum of kinetic and potential energy<br>
  <input type="radio" name="lag-q1" value="B"> The difference between kinetic and potential energy<br>
  <input type="radio" name="lag-q1" value="C"> Just the kinetic energy<br>
  <input type="radio" name="lag-q1" value="D"> The total energy including friction<br>
  <button type="button"
    onclick="checkTrueFalse('lag-q1', 'B', 
      'Correct! L = T – V is the foundation of the Lagrangian formulation.',
      'Not quite! Remember, L = kinetic energy minus potential energy.')">
    Check Answer
  </button>
  <p id="lag-q1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: What is the advantage of using the Lagrangian method for robots with many joints?</strong></p>
<form id="lag-q2">
  <input type="radio" name="lag-q2" value="A"> It avoids dealing directly with vector calculus<br>
  <input type="radio" name="lag-q2" value="B"> It automatically provides equations using a scalar function<br>
  <input type="radio" name="lag-q2" value="C"> It only works for static robots<br>
  <input type="radio" name="lag-q2" value="D"> It ignores external forces<br>
  <button type="button"
    onclick="checkTrueFalse('lag-q2', 'B', 
      'Correct! The Lagrangian method uses energy to generate motion equations — very elegant for multi-joint systems.',
      'Not quite. Think about what makes it easier to apply to multiple joints.')">
    Check Answer
  </button>
  <p id="lag-q2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Which of the following could be a "generalized coordinate" in robotics?</strong></p>
<form id="lag-q3">
  <input type="radio" name="lag-q3" value="A"> Joint angle<br>
  <input type="radio" name="lag-q3" value="B"> Position of the center of mass<br>
  <input type="radio" name="lag-q3" value="C"> Wheel rotation<br>
  <input type="radio" name="lag-q3" value="D"> All of the above<br>
  <button type="button"
    onclick="checkTrueFalse('lag-q3', 'D', 
      'Correct! Any variable that uniquely defines the system configuration can be a generalized coordinate.',
      'Incorrect. All of those are valid generalized coordinates.')">
    Check Answer
  </button>
  <p id="lag-q3-feedback"></p>
</form>

</details>

---

### Chapter 2: Understanding the Mass Matrix
- Deriving the mass matrix from kinetic energy  
- Properties: Symmetry, positive-definiteness, configuration dependence  
- Example: Two-link planar robot

In this video we focus on better understanding of the mass matrix M of theta
![Mass Matrix](https://www.youtube.com/watch?v=7PFQou5l9do&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=36)  
><sub>Modern Robotics, Chapter 8.1: Lagrangian Formulation of Dynamics (Part 1 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=7PFQou5l9do&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=36</sub>


In this video, we focus on gaining a deeper **intuition and mathematical understanding of the mass matrix** $M(\theta)$, which appears in the robot’s **kinetic energy expression** and **equations of motion**.

---

#### From Point Mass to Robot Arm

For a point mass:

$$
K = \frac{1}{2} m v^2
$$

But for a robot with multiple joints, the **kinetic energy** is expressed in joint coordinates as:

$$
K = \frac{1}{2} \dot{\theta}^\top M(\theta) \dot{\theta}
$$

Where:
- $\dot{\theta}$: Vector of joint velocities  
- $M(\theta)$: **Mass (inertia) matrix** — maps joint velocities to kinetic energy

---

#### Key Properties of the Mass Matrix

1. **Symmetry**  
   $$ M(\theta) = M(\theta)^\top $$

2. **Positive Definiteness**  
   $$ x^\top M(\theta) x > 0 \quad \text{for all } x \neq 0 $$  
   → This means the kinetic energy is always positive unless the robot is at rest.

3. **Configuration-Dependent**  
   - $M(\theta)$ depends on the **robot’s joint configuration**  
   - For example, a stretched-out arm has a different inertia than a folded one.

---

#### Physical Interpretation

- The **effective mass** at the robot’s **end-effector** changes with direction and configuration.  
- When you push the robot's end-effector by hand, it doesn’t behave like a point mass —  
  the **force and acceleration directions are not necessarily aligned**.
- This is because the inertia felt at the end-effector is **anisotropic** (depends on direction) and **configuration-dependent**.

---

#### Final Insight

After this chapter, you should have a solid understanding of the structure of a robot’s dynamic model:

$$
\tau = M(\theta)\ddot{\theta} + c(\theta, \dot{\theta}) + g(\theta)
$$

This equation is an extension of Newton’s second law:

> $F = ma$ → but here, $m$ and $a$ both depend on joint configuration and velocities,  
> plus additional forces are needed to balance gravity and create end-effector wrenches.

---

By understanding the mass matrix $M(\theta)$, you're one step closer to simulating and controlling robot motion with accuracy and intuition.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What is the role of the mass matrix $M(\theta)$ in robot dynamics?</strong></p>
<form id="q2-1">
  <input type="radio" name="q2-1" value="A"> It determines the robot's position in space<br>
  <input type="radio" name="q2-1" value="B"> It maps joint torques to joint velocities<br>
  <input type="radio" name="q2-1" value="C"> It maps joint velocities to kinetic energy and relates torques to accelerations<br>
  <input type="radio" name="q2-1" value="D"> It compensates for gravity<br>
  <button type="button"
    onclick="checkTrueFalse('q2-1', 'C', 
      'Correct! The mass matrix relates joint velocities to kinetic energy, and is also used in computing accelerations from torques.',
      'Not quite. Remember, $M(\\theta)$ is all about motion and energy, not just torque or position.')">
    Check Answer
  </button>
  <p id="q2-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: Which of the following is <em>not</em> a mathematical property of the mass matrix $M(\theta)$?</strong></p>
<form id="q2-2">
  <input type="radio" name="q2-2" value="A"> It is symmetric<br>
  <input type="radio" name="q2-2" value="B"> It is positive definite<br>
  <input type="radio" name="q2-2" value="C"> It is always constant<br>
  <input type="radio" name="q2-2" value="D"> It depends on joint configuration<br>
  <button type="button"
    onclick="checkTrueFalse('q2-2', 'C', 
      'Correct! The mass matrix usually varies with the robot configuration — it is not constant.',
      'Incorrect. The mass matrix is not constant in general.')">
    Check Answer
  </button>
  <p id="q2-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Why doesn't a robot's end-effector feel like a point mass when you push it by hand?</strong></p>
<form id="q2-3">
  <input type="radio" name="q2-3" value="A"> Robots don’t have mass<br>
  <input type="radio" name="q2-3" value="B"> Friction at joints causes this<br>
  <input type="radio" name="q2-3" value="C"> The apparent inertia varies with configuration and direction<br>
  <input type="radio" name="q2-3" value="D"> End-effectors are programmed to resist force<br>
  <button type="button"
    onclick="checkTrueFalse('q2-3', 'C', 
      'Correct! The robot’s apparent mass depends on its joint configuration and acceleration direction.',
      'Not quite. This is caused by the configuration-dependent nature of the mass matrix.')">
    Check Answer
  </button>
  <p id="q2-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: What does this expression represent? <br> $K = \frac{1}{2} \dot{\theta}^\top M(\theta) \dot{\theta}$</strong></p>
<form id="q2-4">
  <input type="radio" name="q2-4" value="A"> The robot’s total potential energy<br>
  <input type="radio" name="q2-4" value="B"> The torque needed to lift the robot<br>
  <input type="radio" name="q2-4" value="C"> The kinetic energy of the robot<br>
  <input type="radio" name="q2-4" value="D"> The force applied at the end-effector<br>
  <button type="button"
    onclick="checkTrueFalse('q2-4', 'C', 
      'Correct! This is the kinetic energy of the robot, expressed using joint velocities and the mass matrix.',
      'Not quite. This is the standard quadratic form for kinetic energy in joint space.')">
    Check Answer
  </button>
  <p id="q2-4-feedback"></p>
</form>

</details>



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
