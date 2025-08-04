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


---

![Lagrangian Part 2](https://www.youtube.com/watch?v=BjD-pL819LA)  
><sub>Modern Robotics, Chapter 8.1: Lagrangian Formulation of Dynamics (Part 2 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=BjD-pL819LA</sub>


In this video, we take a deeper look at the **velocity-product terms** in the dynamic equations of motion:

$$
\tau = M(\theta)\ddot{\theta} + c(\theta, \dot{\theta}) + g(\theta)
$$

---

#### Velocity-Product Terms: What Are They?

These terms arise from the **nonlinear interaction** of joint velocities.

#### Two Key Types:
- **Centripetal Terms**:  
  Terms with a **squared joint velocity**, like $\dot{\theta}_1^2$.  
  They arise when one joint rotates and a mass moves in a circular path around that joint.

- **Coriolis Terms**:  
  Terms with a **product of two different joint velocities**, like $\dot{\theta}_1 \dot{\theta}_2$.  
  These arise when multiple joints move simultaneously.

---

#### Example: 2R Planar Robot

We analyze a **2R robot arm** under different conditions (neglecting gravity and accelerations for clarity):

1. **Only $\dot{\theta}_1 > 0$, $\dot{\theta}_2 = 0$**  
   - Mass 2 moves in a circular arc around joint 1.  
   - It experiences **centripetal acceleration** $\propto \dot{\theta}_1^2$ toward joint 1.  
   - Joint 2 must apply positive torque; joint 1 **does not** need torque.

2. **Only $\dot{\theta}_2 > 0$, $\dot{\theta}_1 = 0$**  
   - Mass 2 circles around joint 2.  
   - Centripetal acceleration is proportional to \( \dot{\theta}_2^2 \).  
   - Only joint 2 provides torque.

3. **Both $\dot{\theta}_1 > 0$ and $\dot{\theta}_2 > 0$**  
   - A **Coriolis acceleration** appears, directed toward joint 2.  
   - Joint 1 must apply **negative torque** to keep constant speed — similar to the **ice skater effect** (spinning faster when arms are pulled in).

---

#### Writing the Velocity-Product Term Mathematically

##### Option 1: General Notation  
We often write the velocity-product term as:

$$
c(\theta, \dot{\theta}) = \dot{\theta}^\top \Gamma(\theta) \dot{\theta}
$$

- $\Gamma(\theta)$: A 3D tensor (size $n \times n \times n$)  
- The terms $\Gamma_{i,j,k}$ are called **Christoffel symbols** of the mass matrix

##### Option 2: Component-wise

Christoffel symbols:

$$
\Gamma_{i,j,k} = \frac{1}{2} \left( \frac{\partial M_{i,k}}{\partial \theta_j} + \frac{\partial M_{i,j}}{\partial \theta_k} - \frac{\partial M_{j,k}}{\partial \theta_i} \right)
$$

The $i$-th component of $c(\theta, \dot{\theta})$ is:

$$
c_i(\theta, \dot{\theta}) = \sum_{j=1}^n \sum_{k=1}^n \Gamma_{i,j,k}(\theta) \dot{\theta}_j \dot{\theta}_k
$$

---

#### Physical Intuition

- Just like a **changing mass** affects linear momentum in simple systems, a **configuration-dependent mass matrix** in robots leads to extra forces (velocity-product terms).
- These terms are essential for maintaining or resisting motion even when **accelerations are zero**.

---

#### Alternative Representations

1. **Coriolis Matrix** form:  
   Another way to express the velocity-product term:

   $$
   c(\theta, \dot{\theta}) = C(\theta, \dot{\theta}) \dot{\theta}
   $$

   Where $ C(\theta, \dot{\theta}) $ is the **Coriolis matrix**, assembled using Christoffel symbols.

2. **Combined vector** notation:

   $$
   h(\theta, \dot{\theta}) = c(\theta, \dot{\theta}) + g(\theta)
   $$

   Often used to **group all non-acceleration-dependent terms** together.

---

#### SUMMARY

- **Velocity-product terms** are quadratic in joint velocities and arise naturally in robotic motion.
- They include **centripetal and Coriolis effects**.
- They ensure that even without accelerations or external forces, **internal inertial effects still generate torque requirements**.
- You can represent them using:
  - Christoffel symbols  
  - A Coriolis matrix  
  - Or compact vector notation \( h(\theta, \dot{\theta}) \)

Understanding these terms is essential for **accurate simulation, control, and physical intuition** in robotic systems.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What is a centripetal term in the context of robot dynamics?</strong></p>
<form id="q3b-1">
  <input type="radio" name="q3b-1" value="A"> A constant force pulling the robot to its base<br>
  <input type="radio" name="q3b-1" value="B"> A term involving the square of a joint velocity<br>
  <input type="radio" name="q3b-1" value="C"> A gravitational force acting on the robot<br>
  <input type="radio" name="q3b-1" value="D"> A damping term that slows down motion<br>
  <button type="button"
    onclick="checkTrueFalse('q3b-1', 'B',
      'Correct! Centripetal terms involve squared joint velocities like $\\dot{\\theta}_1^2$.',
      'Not quite. Remember, centripetal terms arise from circular motion and involve velocity squared.')">
    Check Answer
  </button>
  <p id="q3b-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: What makes a term a Coriolis term?</strong></p>
<form id="q3b-2">
  <input type="radio" name="q3b-2" value="A"> It contains only joint angles<br>
  <input type="radio" name="q3b-2" value="B"> It involves gravity and torque<br>
  <input type="radio" name="q3b-2" value="C"> It involves the product of two different joint velocities<br>
  <input type="radio" name="q3b-2" value="D"> It cancels out when the robot is stationary<br>
  <button type="button"
    onclick="checkTrueFalse('q3b-2', 'C',
      'Correct! Coriolis terms involve cross-products of different joint velocities, like $\\dot{\\theta}_1 \\dot{\\theta}_2$.',
      'Not quite. Coriolis terms come from the interaction between moving joints.')">
    Check Answer
  </button>
  <p id="q3b-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Which of the following is true about the Christoffel symbols in robot dynamics?</strong></p>
<form id="q3b-3">
  <input type="radio" name="q3b-3" value="A"> They are constants<br>
  <input type="radio" name="q3b-3" value="B"> They are elements of the inertia matrix<br>
  <input type="radio" name="q3b-3" value="C"> They are computed from the partial derivatives of the mass matrix<br>
  <input type="radio" name="q3b-3" value="D"> They represent damping in joints<br>
  <button type="button"
    onclick="checkTrueFalse('q3b-3', 'C',
      'Correct! Christoffel symbols are computed from derivatives of $M(\\theta)$ and define how velocities interact.',
      'Incorrect. They’re derived from how the mass matrix changes with configuration.')">
    Check Answer
  </button>
  <p id="q3b-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: What happens to joint 1 when both $\\dot{\\theta}_1$ and $\\dot{\\theta}_2$ are positive?</strong></p>
<form id="q3b-4">
  <input type="radio" name="q3b-4" value="A"> It experiences a Coriolis torque and must apply a negative torque<br>
  <input type="radio" name="q3b-4" value="B"> It experiences no effect<br>
  <input type="radio" name="q3b-4" value="C"> It must apply a positive torque<br>
  <input type="radio" name="q3b-4" value="D"> It becomes locked<br>
  <button type="button"
    onclick="checkTrueFalse('q3b-4', 'A',
      'Correct! The Coriolis force creates a negative moment about joint 1, requiring a negative torque.',
      'Not quite. Remember the skater analogy — motion in joint 2 can cause unintended acceleration in joint 1.')">
    Check Answer
  </button>
  <p id="q3b-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: Why can $c(\\theta, \\dot{\\theta})$ be written as $\\dot{\\theta}^\\top \\Gamma(\\theta) \\dot{\\theta}$?</strong></p>
<form id="q3b-5">
  <input type="radio" name="q3b-5" value="A"> Because the robot has constant mass<br>
  <input type="radio" name="q3b-5" value="B"> Because the velocity-product terms are linear<br>
  <input type="radio" name="q3b-5" value="C"> Because the velocity-product terms are quadratic in joint velocities<br>
  <input type="radio" name="q3b-5" value="D"> Because Christoffel symbols are angles<br>
  <button type="button"
    onclick="checkTrueFalse('q3b-5', 'C',
      'Correct! $c(\\theta, \\dot{\\theta})$ is quadratic in $\\dot{\\theta}$, which is why we can write it in this form.',
      'Not quite. The form $\\dot{\\theta}^T \\Gamma \\dot{\\theta}$ shows that $c$ is quadratic in velocity.')">
    Check Answer
  </button>
  <p id="q3b-5-feedback"></p>
</form>

</details>

<!-- 
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

🔧 In this chapter, you will learn how to derive these equations step by step — starting with single-link systems and building up to complete open-chain robots. 

</details> -->

---

### Chapter 2: Understanding the Mass Matrix
- Deriving the mass matrix from kinetic energy  
- Properties: Symmetry, positive-definiteness, configuration dependence  
- Example: Two-link planar robot

In this video we focus on better understanding of the mass matrix M of theta
![Mass Matrix](https://www.youtube.com/watch?v=7PFQou5l9do&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=36)  
><sub>Modern Robotics, Chapter 8.1.3: Understanding the Mass Matrix. YouTube video. Available at: https://www.youtube.com/watch?v=7PFQou5l9do&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=36</sub>


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

### Chapter 3 (Part1): Dynamics of a Single Rigid Body
- Newton-Euler equations for a free rigid body  
- Linear and angular momentum  
- Inertia tensor and spatial representation

![dyn of single rigid body 1](https://www.youtube.com/watch?v=9pdqePt1Nbg&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=37)  
><sub>Modern Robotics, Chapter 8.2: Dynamics of a Single Rigid Body (Part 1 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=7PFQou5l9do&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=37</sub>

This chapter introduces the **Newton–Euler method** for modeling the dynamics of a rigid body — the foundation for building full robot dynamics. Unlike the Lagrangian approach, which uses energy, the Newton–Euler formulation is built directly from:

> **Force = mass × acceleration**  
> **Torque = moment of inertia × angular acceleration**

---

#### Rigid Body Basics

- A **rigid body** is modeled as a collection of point masses rigidly connected.
- A **body frame {b}** is fixed at the **center of mass (COM)** of the body.
- The **twist** of the body in the {b} frame is denoted by:

  $$
  V_b = \begin{bmatrix} \omega_b \\ v_b \end{bmatrix}
  $$

  Where:
  - $\omega_b$: Angular velocity of the body (in {b})
  - $v_b$: Linear velocity of the COM (in {b})

---

#### Kinematics of the Point Masses

For the $i$-th point mass:
- Position relative to the COM: $p_i$
- Velocity:  
  $$
  \dot{p}_i = v_b + \omega_b \times p_i
  $$
- Acceleration (after differentiating):  
  $$
  \ddot{p}_i = \dot{v}_b + \dot{\omega}_b \times p_i + \omega_b \times (v_b + \omega_b \times p_i)
  $$

---

#### Newton–Euler Dynamics

Using $f_i = m_i \ddot{p}_i$ and summing over all point masses:

##### Total Force:
$$
f_b = m \left( \dot{v}_b + \omega_b \times v_b \right)
$$

##### Total Moment:
$$
m_b = I_b \dot{\omega}_b + \omega_b \times (I_b \omega_b)
$$

Where:
- $I_b$: Inertia matrix of the rigid body (in {b})
- The full **wrench** applied on the body is:  
  $$
  F_b = \begin{bmatrix} m_b \\ f_b \end{bmatrix}
  $$

---

#### Inertia Matrix

The **inertia matrix** $I_b \in \mathbb{R}^{3 \times 3}$ describes how mass is distributed around the center of mass.

- **Symmetric and positive definite**
- Diagonal terms (e.g., $ I_{xx} $) are **moments of inertia**
- Off-diagonal terms (e.g., $ I_{xy} $) are **products of inertia**

##### Computation (for point masses):

$$
I_b = -\sum_i m_i [p_i]_\times^2
$$

- $[p_i]_\times$: Skew-symmetric matrix of vector $p_i$

---

#### From Discrete to Continuous Mass

- When replacing point masses with a continuous **mass density** $\rho(x,y,z)$,  
  the summation becomes an integral:

  $$
  I_b = \int_{\text{Body}} \rho(x,y,z) [p]_\times^2 \, dV
  $$

---

#### Kinetic Energy of a Rigid Body

Rotational kinetic energy in frame {b}:

$$
K = \frac{1}{2} \omega_b^\top I_b \omega_b
$$

Just like joint-space kinetic energy used the mass matrix, rotational energy uses the **inertia matrix**.

---

#### Principal Axes and Diagonalization

- The **principal axes of inertia** are the eigenvectors of $I_b$ (called $R_{bp}$)
- The **principal moments of inertia** are the eigenvalues of $I_b$
- In the **{p} frame** (aligned with principal axes), $I_p$ is **diagonal**:

  $$
  I_p = R_{bp}^\top I_b R_{bp}
  $$

- Using the principal axes simplifies the rotational equations of motion.

---

#### SUMMARY

- **Linear equation**:
  $$
  \boxed{f_b = m (\dot{v}_b + \omega_b \times v_b)}
  $$

- **Rotational equation**:
  $$
  \boxed{m_b = I_b \dot{\omega}_b + \omega_b \times (I_b \omega_b)}
  $$

These equations form the **building blocks** for modeling full robot dynamics using recursive Newton–Euler algorithms in later chapters.


<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What physical quantity does the inertia matrix $I_b$ describe?</strong></p>
<form id="q3-1">
  <input type="radio" name="q3-1" value="A"> The robot's linear velocity<br>
  <input type="radio" name="q3-1" value="B"> How mass is distributed around the center of mass<br>
  <input type="radio" name="q3-1" value="C"> The robot's position in the world<br>
  <input type="radio" name="q3-1" value="D"> The stiffness of the body<br>
  <button type="button"
    onclick="checkTrueFalse('q3-1', 'B', 
      'Correct! The inertia matrix encodes how the mass is distributed relative to the rotation center.',
      'Not quite. Remember that the inertia matrix is linked to rotation and mass distribution.')">
    Check Answer
  </button>
  <p id="q3-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: What does the twist $V_b$ of a rigid body represent?</strong></p>
<form id="q3-2">
  <input type="radio" name="q3-2" value="A"> Only the angular velocity<br>
  <input type="radio" name="q3-2" value="B"> Only the position of the center of mass<br>
  <input type="radio" name="q3-2" value="C"> Both the linear and angular velocity of the body<br>
  <input type="radio" name="q3-2" value="D"> The force and torque applied to the body<br>
  <button type="button"
    onclick="checkTrueFalse('q3-2', 'C', 
      'Correct! The twist includes both linear velocity $v_b$ and angular velocity $\\omega_b$.',
      'Incorrect. The twist captures both types of motion — rotation and translation.')">
    Check Answer
  </button>
  <p id="q3-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: What is true about the inertia matrix $I_b$?</strong></p>
<form id="q3-3">
  <input type="radio" name="q3-3" value="A"> It is always diagonal in any coordinate frame<br>
  <input type="radio" name="q3-3" value="B"> It is symmetric and positive definite<br>
  <input type="radio" name="q3-3" value="C"> It depends on the linear velocity<br>
  <input type="radio" name="q3-3" value="D"> It stays constant for all body shapes<br>
  <button type="button"
    onclick="checkTrueFalse('q3-3', 'B', 
      'Correct! $I_b$ is symmetric and positive definite by definition.',
      'Incorrect. Only answer B reflects the general mathematical properties of inertia matrices.')">
    Check Answer
  </button>
  <p id="q3-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: What is the benefit of aligning the body frame with the principal axes of inertia?</strong></p>
<form id="q3-4">
  <input type="radio" name="q3-4" value="A"> It eliminates the mass<br>
  <input type="radio" name="q3-4" value="B"> It minimizes the torque<br>
  <input type="radio" name="q3-4" value="C"> It simplifies the inertia matrix to a diagonal form<br>
  <input type="radio" name="q3-4" value="D"> It makes the frame fixed in space<br>
  <button type="button"
    onclick="checkTrueFalse('q3-4', 'C', 
      'Correct! Aligning the frame with principal axes diagonalizes the inertia matrix.',
      'Incorrect. The goal is simplification — especially making the inertia matrix diagonal.')">
    Check Answer
  </button>
  <p id="q3-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: The rotational equation $m_b = I_b \dot{\omega}_b + \omega_b \times (I_b \omega_b)$ includes what kind of terms?</strong></p>
<form id="q3-5">
  <input type="radio" name="q3-5" value="A"> Only linear velocity terms<br>
  <input type="radio" name="q3-5" value="B"> Only constant coefficients<br>
  <input type="radio" name="q3-5" value="C"> Velocity-product (nonlinear) terms<br>
  <input type="radio" name="q3-5" value="D"> Only time-invariant matrices<br>
  <button type="button"
    onclick="checkTrueFalse('q3-5', 'C', 
      'Correct! The cross-product term $\\omega_b \\times (I_b \\omega_b)$ is a nonlinear velocity-product term.',
      'Incorrect. This equation includes angular velocity multiplied by itself — that’s a velocity-product term.')">
    Check Answer
  </button>
  <p id="q3-5-feedback"></p>
</form>

</details>

### Chapter 3 (Part2): Dynamics of a Single Rigid Body – Spatial Inertia and Equations of Motion

![dyn of single rigid body 2](https://www.youtube.com/watch?v=9pdqePt1Nbg&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=38)  
><sub>Modern Robotics, Chapter 8.2: Dynamics of a Single Rigid Body (Part 2 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=7PFQou5l9do&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=38</sub>

In this chapter, we extend the Newton-Euler formulation using **spatial vector algebra** to derive compact dynamic equations for a single rigid body.

---

#### Key Concepts

We represent rigid body motion with a **spatial twist**:

$$
V_b = \begin{bmatrix} \omega_b \\ v_b \end{bmatrix}
$$

We define the **spatial inertia matrix** $G_b$ in the body frame `{b}` as:

$$
G_b =
\begin{bmatrix}
I_b & 0 \cr
0 & m \cdot I_{3 \times 3}
\end{bmatrix}
$$


Where:
- $I_b$: Rotational inertia matrix about the center of mass  
- $m$: Total mass of the rigid body  
- $I_{3 \times 3}$: Identity matrix  

---

#### Kinetic Energy

The **kinetic energy** of the rigid body becomes:

$$
K = \frac{1}{2} V_b^T G_b V_b
$$

---

#### Lie Bracket for Twists

The **Lie bracket** of two spatial twists $V_1$ and $V_2$ is an acceleration measuring how motion along these twist change if the body follows the other twist :

$$
[V_1, V_2] = \text{ad}_{V_1} V_2
$$

The **little adjoint operator** is:

$$
\text{ad}_V =
\begin{bmatrix}
[\omega] & 0 \cr
[v] & [\omega]
\end{bmatrix}
$$

Where $[\cdot]$ represents the skew-symmetric matrix (cross-product bracket).

---

#### Equations of Motion in Frame {b}

The spatial Newton-Euler equation becomes:

$$
F_b = G_b \dot{V_b} - \text{ad}_{V_b}^T G_b V_b
$$

Where:
- $F_b$: Wrench (torque + force)  
- $V_b$: Spatial twist  
- $\dot{V}_b$: Spatial acceleration  
- $\text{ad}_{V_b}^T G_b V_b$: Velocity-product term  

This equation generalizes the classic rigid body dynamics with:

- Twist instead of angular velocity  
- Spatial inertia instead of scalar inertia  
- Lie bracket instead of cross product  

---

#### Frame Change to {a}

Given a transform $T_{ba}$ from frame `{b}` to `{a}`, the spatial inertia transforms as:

$$
G_a = \text{ad}_{T_{ba}}^T G_b \text{ad}_{T_{ba}}
$$

And the equation of motion becomes:

$$
F_a = G_a \dot{V_a} - \text{ad}_{V_a}^T G_a V_a
$$

---

#### Inverse and Forward Dynamics

**Inverse Dynamics (compute wrench from motion):**

$$
F_b = G_b \dot{V_b} - \text{ad}_{V_b}^T G_b V_b
$$

**Forward Dynamics (compute acceleration from wrench):**

$$
\dot{V_b} = G_b^{-1} \left( F_b + \text{ad}_{V_b}^T G_b V_b \right)
$$

---

#### SUMMARY

- The spatial inertia matrix $G_b$ combines mass and rotational inertia into a single $6 \times 6$ matrix.
- Spatial dynamics equations use **twists**, **wrenches**, and the **Lie bracket** to unify motion representation.
- This lays the foundation for the **recursive Newton-Euler algorithm** for full robot manipulators.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What physical quantity does the inertia matrix $I_b$ describe?</strong></p>
<form id="q3-1">
  <input type="radio" name="q3-1" value="A"> The robot's linear velocity<br>
  <input type="radio" name="q3-1" value="B"> How mass is distributed around the center of mass<br>
  <input type="radio" name="q3-1" value="C"> The robot's position in the world<br>
  <input type="radio" name="q3-1" value="D"> The stiffness of the body<br>
  <button type="button"
    onclick="checkTrueFalse('q3-1', 'B', 
      'Correct! The inertia matrix encodes how the mass is distributed relative to the rotation center.',
      'Not quite. Remember that the inertia matrix is linked to rotation and mass distribution.')">
    Check Answer
  </button>
  <p id="q3-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: Why is the spatial inertia matrix $G_b$ a 6×6 matrix?</strong></p>
<form id="q3-2">
  <input type="radio" name="q3-2" value="A"> It includes both linear and angular mass properties<br>
  <input type="radio" name="q3-2" value="B"> It represents a block diagonal rotation matrix<br>
  <input type="radio" name="q3-2" value="C"> It tracks six different link positions<br>
  <input type="radio" name="q3-2" value="D"> It defines a 3D transformation<br>
  <button type="button"
    onclick="checkTrueFalse('q3-2', 'A', 
      'Correct! The 6x6 matrix captures both linear and rotational inertia.',
      'Try again. Think about how spatial inertia extends beyond rotation.')">
    Check Answer
  </button>
  <p id="q3-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: What does the Lie bracket $[V_1, V_2]$ represent in spatial dynamics?</strong></p>
<form id="q3-3">
  <input type="radio" name="q3-3" value="A"> A linear transformation of velocity<br>
  <input type="radio" name="q3-3" value="B"> An acceleration resulting from two combined motions<br>
  <input type="radio" name="q3-3" value="C"> A rotation matrix<br>
  <input type="radio" name="q3-3" value="D"> A constant torque applied to the robot<br>
  <button type="button"
    onclick="checkTrueFalse('q3-3', 'B', 
      'Correct! The Lie bracket captures the change in motion due to interacting twists.',
      'Not quite. Consider what happens when multiple motions interact.')">
    Check Answer
  </button>
  <p id="q3-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: Why do we sometimes prefer to use the principal axes of inertia when modeling a rigid body?</strong></p>
<form id="q3-4">
  <input type="radio" name="q3-4" value="A"> It reduces rotational noise<br>
  <input type="radio" name="q3-4" value="B"> It simplifies the inertia matrix to a diagonal form<br>
  <input type="radio" name="q3-4" value="C"> It helps detect collisions<br>
  <input type="radio" name="q3-4" value="D"> It improves the robot's visual appearance<br>
  <button type="button"
    onclick="checkTrueFalse('q3-4', 'B', 
      'Correct! Principal axes simplify the matrix, making computations more efficient.',
      'Think again. What happens to the inertia matrix when the off-diagonal terms vanish?')">
    Check Answer
  </button>
  <p id="q3-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: In spatial dynamics, what does the velocity-product term $\text{ad}_{V_b}^T G_b V_b$ represent?</strong></p>
<form id="q3-5">
  <input type="radio" name="q3-5" value="A"> Gravitational force<br>
  <input type="radio" name="q3-5" value="B"> The inverse of the mass matrix<br>
  <input type="radio" name="q3-5" value="C"> Forces arising from the body's current motion<br>
  <input type="radio" name="q3-5" value="D"> A linear projection of angular velocity<br>
  <button type="button"
    onclick="checkTrueFalse('q3-5', 'C', 
      'Correct! This term captures Coriolis and centrifugal forces due to motion.',
      'Try again. This term accounts for motion-induced forces, not static ones.')">
    Check Answer
  </button>
  <p id="q3-5-feedback"></p>
</form>

</details>


---

### Chapter 4: Inverse Dynamics with Newton-Euler
- Recursive Newton-Euler algorithm  
- Computing joint torques given a motion  
- Efficiency advantages for real-time control

![inverse dynamics](https://www.youtube.com/watch?v=9pdqePt1Nbg&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=39)  
><sub>Modern Robotics, Chapter 8.3: Newton-Euler inverse Dynamics. YouTube video. Available at: https://www.youtube.com/watch?v=7PFQou5l9do&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=38</sub>

### Chapter 4: Inverse Dynamics with Newton-Euler

In this chapter, we apply the **inverse dynamics of a rigid body** to compute the joint torques for an **open-chain robot** using the **Newton–Euler algorithm**.

We consider an **n-link robot** with:

- Frame `{0}` fixed in the world  
- Frames `{1}` to `{n}` at each link's **center of mass**  
- Frame `{n+1}` at the **end-effector**

We define:

- $V_i$: Twist of link $i$, expressed in frame $\{i\}$
- $\tau_i$: Joint torque applied at joint $i$
- $A_i$: Joint screw axis of joint $i$ (expressed in frame $\{i\}$)
- $T_{i,i-1}$: Transformation from frame $\{i-1\}$ to $\{i\}$
- $F_{n+1} = F_{\text{tip}}$: External wrench applied by the end-effector
- $\dot{V}_0$: Base acceleration to model gravity

---

#### Step 1: Forward Iteration (from base to end-effector)

Compute twists and accelerations:

**1. Compute transformation**  
$$
T_{i,i-1} = e^{-A_i \theta_i} M_i
$$

**2. Compute twist**  
$$
V_i = \text{Ad}_{T_{i,i-1}} V_{i-1} + A_i \dot{\theta}_i
$$

**3. Compute acceleration**  
$$
\dot{V}_i = \text{Ad}_{T_{i,i-1}} \dot{V}_{i-1} + \text{ad}_{A_i \dot{\theta}_i} V_i + A_i \ddot{\theta}_i
$$

Where:
- $\text{Ad}_{T_{i,i-1}}$: Adjoint transformation from frame $\{i-1\}$ to $\{i\}$
- $\text{ad}_V$: Lie bracket operator (captures velocity-product terms)

---

#### Step 2: Backward Iteration (from end-effector to base)

Compute wrenches and torques:

**4. Compute wrench**  
$$
F_i = \text{Ad}_{T_{i+1,i}}^T F_{i+1} + G_i \dot{V}_i - \text{ad}_{V_i}^T G_i V_i
$$

Where:
- $G_i$: Spatial inertia matrix of link $i$

**5. Compute joint torque**  
$$
\tau_i = A_i^T F_i
$$

Only the component of $F_i$ **along $A_i$** must be supplied by the joint actuator.

---

#### Final Output

After forward and backward passes, we obtain:
- Joint torques $\tau = [\tau_1, \dots, \tau_n]^T$ required for:
  - Joint positions $\theta$
  - Velocities $\dot{\theta}$
  - Accelerations $\ddot{\theta}$
  - End-effector wrench $F_{\text{tip}}$

---

#### Advantages

- **No differentiation** is required  
- **Recursive algorithm** → computationally efficient  
- Suitable for **model-based robot control**

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What is the main goal of the Newton-Euler inverse dynamics algorithm?</strong></p>
<form id="q4-1">
  <input type="radio" name="q4-1" value="A"> To compute joint angles from torques<br>
  <input type="radio" name="q4-1" value="B"> To determine joint torques given desired joint motions and end-effector wrench<br>
  <input type="radio" name="q4-1" value="C"> To simulate external forces acting on a robot<br>
  <input type="radio" name="q4-1" value="D"> To visualize robot motion in 3D<br>
  <button type="button"
    onclick="checkTrueFalse('q4-1', 'B', 
      'Correct! The Newton-Euler inverse dynamics algorithm computes the required joint torques.',
      'Not quite. The goal is to compute torques given joint positions, velocities, and accelerations.')">
    Check Answer
  </button>
  <p id="q4-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: What does the forward iteration of the Newton-Euler algorithm compute?</strong></p>
<form id="q4-2">
  <input type="radio" name="q4-2" value="A"> End-effector position only<br>
  <input type="radio" name="q4-2" value="B"> Joint torques<br>
  <input type="radio" name="q4-2" value="C"> Twists and accelerations of each link<br>
  <input type="radio" name="q4-2" value="D"> Inertia matrices<br>
  <button type="button"
    onclick="checkTrueFalse('q4-2', 'C', 
      'Correct! The forward pass computes configuration, twist, and acceleration for each link.',
      'Not quite. The forward iteration is about computing each link’s twist and acceleration.')">
    Check Answer
  </button>
  <p id="q4-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: How is joint torque $\tau_i$ computed from the wrench $F_i$?</strong></p>
<form id="q4-3">
  <input type="radio" name="q4-3" value="A"> By integrating $F_i$ over time<br>
  <input type="radio" name="q4-3" value="B"> By projecting $F_i$ along the joint screw axis $A_i$<br>
  <input type="radio" name="q4-3" value="C"> Using the Lie bracket of $F_i$ and $A_i$<br>
  <input type="radio" name="q4-3" value="D"> By subtracting gravity from $F_i$<br>
  <button type="button"
    onclick="checkTrueFalse('q4-3', 'B', 
      'Correct! Only the component of the wrench along the screw axis needs to be applied by the actuator.',
      'Not quite. The torque is the projection of the wrench onto the screw axis.')">
    Check Answer
  </button>
  <p id="q4-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: What role does the Lie bracket term $\text{ad}_{A_i \dot{\theta}_i} V_i$ play in the algorithm?</strong></p>
<form id="q4-4">
  <input type="radio" name="q4-4" value="A"> It accounts for gravitational acceleration<br>
  <input type="radio" name="q4-4" value="B"> It modifies the screw axis orientation<br>
  <input type="radio" name="q4-4" value="C"> It represents velocity-product terms that arise from joint motion<br>
  <input type="radio" name="q4-4" value="D"> It nullifies inertial forces<br>
  <button type="button"
    onclick="checkTrueFalse('q4-4', 'C', 
      'Correct! The Lie bracket captures interactions between joint velocity and current twist.',
      'Not quite. It’s related to velocity-product terms from joint movement.')">
    Check Answer
  </button>
  <p id="q4-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: Why is the Newton-Euler algorithm considered efficient?</strong></p>
<form id="q4-5">
  <input type="radio" name="q4-5" value="A"> It uses symbolic computation<br>
  <input type="radio" name="q4-5" value="B"> It ignores velocity and acceleration<br>
  <input type="radio" name="q4-5" value="C"> It is recursive and avoids numerical integration or differentiation<br>
  <input type="radio" name="q4-5" value="D"> It uses machine learning to predict torques<br>
  <button type="button"
    onclick="checkTrueFalse('q4-5', 'C', 
      'Correct! Its recursive structure eliminates the need for differentiation, making it fast and scalable.',
      'Not quite. The algorithm’s efficiency comes from being recursive and avoiding differentiation.')">
    Check Answer
  </button>
  <p id="q4-5-feedback"></p>
</form>

</details>


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
