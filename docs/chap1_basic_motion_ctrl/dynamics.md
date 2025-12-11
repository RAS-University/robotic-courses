---
title: Dynamics
parent: Courses
layout: default
nav_order: 3
---

<script src="../questions.js"></script>

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

# 1.2 Dynamics 


<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1.2.1 Prerequisites
To get the most out of this **Dynamics module**, it is strongly recommended that you have already completed the course:

 **[Kinematics](kinematics)**  
- A solid understanding of robot configurations, coordinate transformations and velocity kinematics.
- Familiarity with forward and inverse kinematics, jacobians and joint-space vs task-space representations. 

 **Basic Mechanical Physics**
- Newton’s laws of motion, especially **force = mass × acceleration (F = ma)**.
- Concepts of **moment of inertia**, **torque**, and **rotational motion**.
- Understanding of **Coriolis** and **centrifugal forces**, which play a key role in the equations of motion for moving reference frames like robotic arms.
- Energy principles like **kinetic energy**, **potential energy**, and **conservation of energy**.

These prerequisites are essential because dynamics connects the dots between motion and its causes

---

## 1.2.2 General Motivation


How do robots jump over gaps, crawl under obstacles, or balance on one leg?

It’s not magic, it’s **dynamics**.

If kinematics is the geometry of movement, dynamics is the physics behind it. It answers questions like:
- How much torque does a joint need to lift a leg while climbing a beam?
- What forces act on a robot when landing after a leap?
- How can a robot balance itself when slipping or being pushed?

Dynamics is the part of robotics that deals with **forces, torques, mass, and motion**. Whether a robot is controlled with code or trained with AI, it still needs to obey the laws of physics.

In these videos below, the robots are not just following a path, they are reacting to **gravity, inertia, and impact** in real time.

Studying dynamics helps you:
- Predict how robots move when pushed or land from a jump
- Design systems that stay stable on rough, slippery, or uneven terrain
- Understand the real physics behind motion 

If you want to make robots that **move like athletes**, **adapt like animals**, and **react like pros**, then ***dynamics*** is your next step.

![ANYmal Parkour](https://www.youtube.com/watch?v=QDU_FicBPDo)
><sub>Parkour in the Wild: ANYmal leaping over rubble and gaps. YouTube video, Mai 2025. Available at: https://www.youtube.com/watch?v=QDU_FicBPDo</sub>

![Boston Dynamics](https://www.youtube.com/watch?v=I44_zbEwz_w)
><sub>Boston Dynamics Atlas crawling, running, and balancing. YouTube video, April 2025. Available at: https://www.youtube.com/watch?v=I44_zbEwz_w</sub>

> Similar robotic models are available in ***Webots***, where you can explore and analyze their implementations. These can be accessed via  
> ***File → Open Sample Robot → robots\boston_dynamics***.  
> By interacting with the provided code, it is possible to experiment with control strategies and observe the resulting behaviors in simulation.

---

## 1.2.3 Course Content


### 1.2.3.0: Why Dynamics?
> - Motivation: Why kinematics is not enough  
> - What dynamics adds: Forces, torques, and real-world behavior  
> - Examples: Balancing, jumping, slipping, and interacting with the world


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
<p><strong>Question 1: Which statement correctly distinguishes kinematics from dynamics?</strong></p>
<form id="q0-1">
  <input type="radio" name="q0-1" value="A"> Kinematics is about motion caused by forces, while dynamics is only about geometry<br>
  <input type="radio" name="q0-1" value="B"> Kinematics describes motion without forces, dynamics includes forces and torques<br>
  <input type="radio" name="q0-1" value="C"> There is no real difference; the terms are interchangeable.<br>
  <button type="button"
    onclick="checkTrueFalse('q0-1', 'B', 
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
  <input type="radio" name="q0-2" value="B"> The dynamics (forces, friction) were not accounted for<br>
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
<p><strong>Question 3: Which robot behaviors are influenced by having a correct model of the robot and environment' dynamics?</strong></p>
<form id="q0-3">
  <input type="radio" name="q0-3" value="A"> Drawing a perfect square on paper<br>
  <input type="radio" name="q0-3" value="B"> Lifting a heavy object<br>
  <input type="radio" name="q0-3" value="C"> Solving a maze<br>
  <input type="radio" name="q0-3" value="D"> Turning on a light<br>
  <button type="button"
    onclick="checkMultipleTrueFalseRadio(
      'q0-3',
      {
        'A': 'Partially Correct! Drawing on paper requires to compensate for the friction on the paper and the weight of the pen.',
        'B': 'Correct! Lifting an object requires calculating torque and motor force – core to dynamics - to compensate for the object s weight and ensure that it does not slip from the grip.',
        'D': 'Correct! Turning on a light requires to apply the right amount of force – core to dynamics - to let the switch move.',
        },
      'Incorrect. Think about which action requires real effort or force.'
    )">
    Check Answer
  </button>
  <p id="q0-3-feedback"></p>
</form>
</details>


---

### 1.2.3.1 (Part1): The Lagrangian Formulation of Dynamics 
> - Generalized coordinates and velocities  
> - Kinetic and potential energy of robotic systems  
> - Euler–Lagrange equations  
> - Example: Pendulum and simple manipulators

![Lagrangian Part 1](https://www.youtube.com/watch?v=1U6y_68CjeY)  
><sub>Modern Robotics, Chapter 8.1: Lagrangian Formulation of Dynamics (Part 1 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=1U6y_68CjeY</sub>

In this video, we explore the **dynamics of open-chain robots** and introduce two major approaches to deriving their equations of motion:

- **Forward Dynamics**: useful for **simulation**. It tells us *how* a robot will move given known torques or forces.
- **Inverse Dynamics**: useful in **control**. It tells us *what torques* are required to follow a desired motion.

Here two key modeling approaches are compared:

1. **Lagrangian Formulation**: a **variational method** based on the robot’s **kinetic** and **potential energy**. It gives us compact, system-wide equations without dealing with forces on each individual link.

2. **Newton–Euler Formulation** [(see section 1.2.3.3 (part 1))](#ch3-single): a **force-based method** applying **Newton’s second law** $ F = ma $ and torque equations link by link. It's more direct but less elegant for complex systems.

---

#### The Power of the Lagrangian Approach

In dynamics, we often ask:

> "Given a robot's configuration and energy, what equations govern its motion?"

The **Lagrangian formulation** answers this by defining a single scalar value called the **Lagrangian**:

$$
\boxed{L(\theta, \dot{\theta}) = K(\theta, \dot{\theta}) - P(\theta)}
$$

Where:
- $E_K$: Kinetic energy  
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

* ***Forward Dynamics::***
  <br>
**Given**: torques $\tau$
  <br>
**Compute**: joint accelerations $\ddot{\theta}$ (→ then velocities and positions)
  <p>
This is used in **simulation** to see how a robot will move when forces are applied.

$$
\ddot{\theta} = M(\theta)^{-1} \left( \tau - c(\theta, \dot{\theta}) - g(\theta) \right)
$$

* ***Inverse Dynamics::***
**Given**: desired motion $\theta(t), \dot{\theta}(t), \ddot{\theta}(t)$  
**Compute**: required joint torques $\tau$

This is used in **control** to determine the torques needed to follow a trajectory.

You can think of forward and inverse dynamics like this:
<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/Dynamics/dyna.png' }}" width="200px" alt="dyna">
  <figcaption>
    <strong>Figure:</strong> Explaining the relation between forward and inverse dynamics (created by author).
  </figcaption>
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
      'Not quite! Try again.')">
    Check Answer
  </button>
  <p id="lag-q1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: What is the advantage of using the Lagrangian method for robots with many joints?</strong></p>
<form id="lag-q2">
  <input type="radio" name="lag-q2" value="A"> It does not require any mass or inertia parameters.<br>
  <input type="radio" name="lag-q2" value="B"> It scales well: derive dynamics from energies to get the structured form $M(\theta)\ddot{\theta} + c(\theta, \dot{\theta}) + g(\theta)$ without summing forces link-by-link.<br>
  <input type="radio" name="lag-q2" value="C"> It eliminates Coriolis and centrifugal terms from the equations.<br>
  <input type="radio" name="lag-q2" value="D"> It ignores external forces<br>
  <button type="button"
    onclick="checkTrueFalse2('lag-q2', 'B', 
      'Correct! The energy-based approach yields compact, scalable equations for many-DOF robots.',
      'Not quite. Think about what makes it easier to apply to multiple joints.')">
    Check Answer
  </button>
  <p id="lag-q2-feedback"></p>
</form>

<!-- Question 3 -->
<!-- <p><strong>Question 3: Which of the following could be a "generalized coordinate" in robotics?</strong></p>
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
</form>  -->

</details>

---

### 1.2.3.1 (Part2): The Lagrangian Formulation of Dynamics 
![Lagrangian Part 2](https://www.youtube.com/watch?v=BjD-pL819LA)  
><sub>Modern Robotics, Chapter 8.1: Lagrangian Formulation of Dynamics (Part 2 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=BjD-pL819LA</sub>


In this video, we take a deeper look at the **velocity-product terms $c(\theta, \dot{\theta})$** in the dynamic equations of motion:

$$
\tau = M(\theta)\ddot{\theta} + c(\theta, \dot{\theta}) + g(\theta)
$$

---

#### Velocity-Product Terms: What Are They?

These terms arise from the **nonlinear interaction** of joint velocities.

***Two Key Types::***
- **Centripetal Terms**:  
  Terms with a **squared joint velocity**, like $\dot{\theta}_1^2$.  
  They arise when one joint rotates and a mass moves in a circular path around that joint.

- **Coriolis Terms**:  
  Terms with a **product of two different joint velocities**, like $\dot{\theta}_1 \dot{\theta}_2$.  
  These arise when multiple joints move simultaneously.

---
***Example: 2R Planar Robot::***

We analyze a **2R robot arm** under different conditions (neglecting gravity and accelerations for clarity):

1. **Only $\dot{\theta}_1 > 0$, $\dot{\theta}_2 = 0$**  
   - Mass 2 moves in a circular arc around joint 1.  
   - It experiences **centripetal acceleration** $\propto \dot{\theta}_1^2$ toward joint 1.  
   - Joint 2 must apply positive torque; joint 1 **does not** need torque.

2. **Only $\dot{\theta}_2 > 0$, $\dot{\theta}_1 = 0$**  
   - Mass 2 circles around joint 2.  
   - Centripetal acceleration is proportional to $ \dot{\theta}_2^2 $.  
   - Only joint 2 provides torque.

3. **Both $\dot{\theta}_1 > 0$ and $\dot{\theta}_2 > 0$**  
   - A **Coriolis acceleration** appears, directed toward joint 2.  
   - Joint 1 must apply **negative torque** to keep constant speed, similar to the **ice skater effect** (spinning faster when arms are pulled in).

---

#### Writing the Velocity-Product Term Mathematically

**Option 1: General Notation**
We often write the velocity-product term as:

$$
c(\theta, \dot{\theta}) = \dot{\theta}^\top \Gamma(\theta) \dot{\theta}
$$

- $\Gamma(\theta)$: A 3D tensor (size $n \times n \times n$) of **Christoffel symbols** derived from the mass matrix
- $\Gamma_{i}$: an $n \times n$ matrix
- $\Gamma_{i,j,k}$: the ($j,k$)th element of $\Gamma_{i}(\theta)$


**Option 2: Component-wise**

Christoffel symbols:

$$
\Gamma_{i,j,k} = \frac{1}{2} \left( \frac{\partial M_{i,k}}{\partial \theta_j} + \frac{\partial M_{i,j}}{\partial \theta_k} - \frac{\partial M_{j,k}}{\partial \theta_i} \right)
$$

The $ij$-th component of $c(\theta, \dot{\theta})$ is:

$$
c_{ij}(\theta, \dot{\theta}) = \sum_{k=1}^n \Gamma_{i,j,k}(\theta) \dot{\theta}_k
$$

---

***Physical Intuition***

- Just like a **changing mass** affects linear momentum in simple systems, a **configuration-dependent mass matrix** in robots leads to extra forces (velocity-product terms).
- These terms are essential for maintaining or resisting motion even when **accelerations are zero**.

---

***Alternative Representations***

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
  - Or compact vector notation $ h(\theta, \dot{\theta}) $

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
  onclick="checkTrueFalse2('q3b-1','B',
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
    onclick="checkTrueFalse2('q3b-2', 'C',
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
    onclick="checkTrueFalse2('q3b-3', 'C',
      'Correct! Christoffel symbols are computed from derivatives of $M(\\theta)$ and define how velocities interact.',
      'Incorrect. Try again.')">
    Check Answer
  </button>
  <p id="q3b-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: What happens to joint 1 when both $\dot{\theta}_1$ and $\dot{\theta}_2$ are positive?</strong></p>
<form id="q3b-4">
  <input type="radio" name="q3b-4" value="A"> It experiences a Coriolis torque and must apply a negative torque<br>
  <input type="radio" name="q3b-4" value="B"> It experiences no effect<br>
  <input type="radio" name="q3b-4" value="C"> It must apply a positive torque<br>
  <input type="radio" name="q3b-4" value="D"> It becomes locked<br>
  <button type="button"
    onclick="checkTrueFalse2('q3b-4', 'A',
      'Correct! The Coriolis force creates a negative moment about joint 1, requiring a negative torque.',
      'Not quite. Remember the skater analogy, motion in joint 2 can cause unintended acceleration in joint 1.')">
    Check Answer
  </button>
  <p id="q3b-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: Why can $c(\theta, \dot{\theta})$ be written as $\dot{\theta}^\top \Gamma(\theta) \dot{\theta}$?</strong></p>
<form id="q3b-5">
  <input type="radio" name="q3b-5" value="A"> Because the robot has constant mass<br>
  <input type="radio" name="q3b-5" value="B"> Because the velocity-product terms are linear<br>
  <input type="radio" name="q3b-5" value="C"> Because the velocity-product terms are quadratic in joint velocities<br>
  <input type="radio" name="q3b-5" value="D"> Because Christoffel symbols are angles<br>
  <button type="button"
    onclick="checkTrueFalse2('q3b-5', 'C',
      'Correct! $c(\\theta, \\dot{\\theta})$ is quadratic in $\\dot{\\theta}$, which is why we can write it in this form.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q3b-5-feedback"></p>
</form>

</details>

<details markdown = "1">
<summary>Mathematical exercises</summary>

> *From Practice Exercise 8.1, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 1:**

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.1.png" width="450" height="auto" alt="Fig 8.1">
  <figcaption>
    <strong>Figure 8.1.</strong> RP robot moving in a vertical plane. 
  </figcaption>
</figure>

Figure 8.1 illustrates an RP robot moving in a vertical plane. The mass of link 1 is $m_1$ and the center of mass is a distance $L_1$ from joint 1. The scalar inertia of link 1 about an axis through the center of mass and out of the plane is $I_1$. The mass of link 2 is $m_2$, the center of mass is a distance $\theta_{2}$ from joint 1, and the scalar inertia of link 2 about its center of mass is $I_2$. Gravity g acts downward on the page.


**(a)**
Let the location of the CoM of link $i$ be $(x_i, y_i)$ for $i=1,2$.
Find $(x_i(\theta), y_i(\theta))$ and their time derivatives $(\dot{x}_i, \dot{y}_i)$.

**(b)**
Write the potential energy of each link, $P_1$ and $P_2$, using the joint variables $\theta$.

**(c)**
Write the kinetic energy of each link, $E_{K_1}$ and $E_{K_2}$.
Use the planar rigid–body formula

$$
E_K \;=\; \tfrac{1}{2}\,m\,v^2 \;+\; \tfrac{1}{2}\,I\,\omega^2,
$$

where $m$ is the mass, $v$ is the scalar linear velocity at the CoM, $\omega$ is the scalar angular velocity, and $I$ is the scalar inertia of the rigid body about its CoM.

**(d)**
What is the Lagrangian in terms of $K_1$, $K_2$, $P_1$ and $P_2$ ?

**(e)**
One of the terms in the Lagrangian can be expressed as 

$$
\frac{1}{2}\,m_2\,\theta_2^{\,2}\,\dot{\theta}_1^{\,2}.
$$

If this were the complete Lagrangian, what would the equations of motion be? Derive these by hand (no symbolic math software assistance). Indicate which of the terms in your equations are a function of $\ddot{\theta}$ , which are Coriolis terms, which are centripetal terms, and which are gravity terms, if any.

**(f)** 
Now derive the equations of motion (either by hand or using symbolic
math software for assistance) for the full Lagrangian and put them in the form
$$
\tau \;=\; M(\theta)\,\ddot{\theta} \;+\; c(\theta,\dot{\theta}) \;+\; g(\theta)
$$

Identify which of the terms in $c(\theta,\dot{theta})$ are Coriolis and whihc are centripetal. Explain as if to someone who is unfamiliar with dynamics why these terms contribute to the joint forces and torques.

---
> *From Practice Exercise 8.3, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 2:**

The equations of motion for a particular 2R robot arm can be written $M(\theta)\,\ddot{\theta} + c(\theta,\dot{\theta}) + g(\theta) = \tau$. The Lagrangian $ \mathcal{L}(\theta,\dot{\theta}) $ for the robot can be written in components as
$$
L(\theta,\dot{\theta}) = L^{1}(\theta,\dot{\theta}) + \mathcal{L}^{2}(\theta,\dot{\theta}) + \mathcal{L}^{3}(\theta,\dot{\theta}) + \cdots
$$

One of these components is $\mathcal{L}^{1} = m\,\dot{\theta}_1\,\dot{\theta}_2\,\cos\theta_2$

**(a)** Find the joint torques $ \tau_1 $ and $ \tau_2 $ corresponding to the component $ \mathcal{L}^{1} $.

**(b)** (See [Section 1.2.3.2](#ch2-mass-mx) if necessary) Write the $2\times2$ mass matrix $M^{1}(\theta)$, the velocity-product vector $c^{1}(\theta,\dot{\theta})$, and the gravity vector $g^{1}(\theta)$ corresponding to $\mathcal{L}^{1}$.
(Notice that $M = M^{1} + M^{2} + M^{3} + \cdots$, $c = c^{1} + c^{2} + c^{3} + \cdots$, and $g = g^{1} + g^{2} + g^{3} + \cdots$.)

<details markdown="1">
<summary><strong>Solutions</strong></summary>

**EXERCISE 1:**

**(a) Centers of mass and their time derivatives**

Positions:

$$
x_1 = L_1\cos\theta_1,\qquad y_1 = L_1\sin\theta_1
$$

$$
x_2 = \theta_2\cos\theta_1,\qquad y_2 = \theta_2\sin\theta_1
$$

Velocities:

$$
\dot x_1 = -L_1\dot\theta_1\sin\theta_1,\qquad
\dot y_1 = \;\;L_1\dot\theta_1\cos\theta_1
$$

$$
\dot x_2 = \dot\theta_2\cos\theta_1-\theta_2\dot\theta_1\sin\theta_1,\qquad
\dot y_2 = \dot\theta_2\sin\theta_1+\theta_2\dot\theta_1\cos\theta_1
$$

---

**(b) Potential energies**

$$
\mathcal P_1 = m_1 g y_1 = m_1 g L_1 \sin\theta_1,
\qquad
\mathcal P_2 = m_2 g y_2 = m_2 g \theta_2 \sin\theta_1.
$$

---

**(c) Kinetic energies**

Link 1:

$$
\mathcal E_{K_1}
= \tfrac12 m_1(\dot x_1^2+\dot y_1^2) + \tfrac12 I_1 \dot\theta_1^{\,2}
= \tfrac12 (I_1+m_1L_1^{\,2})\,\dot\theta_1^{\,2}.
$$

Link 2:

$$
\mathcal E_{K_2}
= \tfrac12 m_2(\dot x_2^2+\dot y_2^2) + \tfrac12 I_2 \dot\theta_1^{\,2}
= \tfrac12\left( (I_2+m_2\theta_2^{\,2})\,\dot\theta_1^{\,2} + m_2\dot\theta_2^{\,2} \right).
$$

---

**(d) Lagrangian**

$$
\mathcal L = \mathcal K_1 + \mathcal K_2 - \mathcal P_1 - \mathcal P_2.
$$

---

**(e) Equations of motion**

$$
\tau_1 = 2 m_2 \theta_2 \dot\theta_1 \dot\theta_2 \;+\; m_2 \theta_2^{\,2}\ddot\theta_1,
\qquad
\tau_2 = -\,m_2 \theta_2\,\dot\theta_1^{\,2}.
$$

* In \$\tau\_1\$, the first term is **Coriolis**; the second multiplies \$\ddot\theta\_1\$ (a **mass-matrix** term).
* \$\tau\_2\$ is a **centripetal** term.

---

**(f) Full equations in standard form**

$$
\tau = M(\theta)\,\ddot\theta + c(\theta,\dot\theta) + g(\theta),
\qquad
\theta=\begin{bmatrix}\theta_1\\ \theta_2\end{bmatrix}.
$$

Mass matrix:

$$
M(\theta)=
\begin{bmatrix}
I_1 + I_2 + m_1L_1^{\,2} + m_2\theta_2^{\,2} & 0 \cr
0 & m_2
\end{bmatrix}.
$$

Velocity-product (Coriolis/centripetal) vector:

$$
c(\theta,\dot{\theta})=
\begin{bmatrix}
2 m_2 \theta_2 \dot\theta_1 \dot\theta_2 \cr
-m_2 \theta_2 \dot\theta_1^{\,2}
\end{bmatrix}.
$$

Gravity vector:

$$
g(\theta)=
\begin{bmatrix}
(m_1 L_1 + m_2 \theta_2)\, g \cos\theta_1 \cr
m_2 g \sin\theta_1
\end{bmatrix}.
$$

---

**EXERCISE 2:**

**(a)**
$$
\tau_1 = \frac{d}{dt}\left(\frac{\partial \mathcal{L}^{1}}{\partial \dot{\theta}_1}\right) - \frac{\partial \mathcal{L}^{1}}{\partial \theta_1} = \frac{d}{dt}\big(m\,\dot{\theta}_2 \cos\theta_2\big) - 0 = m\,\ddot{\theta}_2 \cos\theta_2 - m\,\dot{\theta}_2^{\,2}\sin\theta_2 .
$$

$$
\tau_2 = \frac{d}{dt}\left(\frac{\partial \mathcal{L}^{1}}{\partial \dot{\theta}_2}\right) - \frac{\partial \mathcal{L}^{1}}{\partial \theta_2}
= \frac{d}{dt}\big(m\,\dot{\theta}_1 \cos\theta_2\big) + m\,\dot{\theta}_1 \dot{\theta}_2 \sin\theta_2 = m\,\ddot{\theta}_1 \cos\theta_2 .
$$

**(b)**
$$
M^{1}(\theta) =
\begin{bmatrix}
0 & m\cos\theta_{2} \cr
m\cos\theta_{2} & 0
\end{bmatrix},
\qquad
c^{1}(\theta,\dot{\theta}) =
\begin{bmatrix}
-m \dot\theta_{2}^{2} \sin\theta_{2} \cr
0
\end{bmatrix},
\qquad
g^{1}(\theta) =
\begin{bmatrix}
0 \cr
0
\end{bmatrix}.
$$


</details>

</details>

---

### 1.2.3.2: Understanding the Mass Matrix {#ch2-mass-mx}
> - Deriving the mass matrix from kinetic energy  
> - Properties: Symmetry, positive-definiteness, configuration dependence  
> - Example: Two-link planar robot

In this video we focus on better understanding of the mass matrix M of theta
![Mass Matrix](https://www.youtube.com/watch?v=7PFQou5l9do)  
><sub>Modern Robotics, Chapter 8.1.3: Understanding the Mass Matrix. YouTube video. Available at: https://www.youtube.com/watch?v=7PFQou5l9do</sub>


In this video, we focus on gaining a deeper **intuition and mathematical understanding of the mass matrix** $M(\theta)$, which appears in the robot’s **kinetic energy expression** and **equations of motion**.

---

#### From Point Mass to Robot Arm

For a point mass:

$$
E_K = \frac{1}{2} m v^2
$$

But for a robot with multiple joints, the **kinetic energy** is expressed in joint coordinates as:

$$
E_K = \frac{1}{2} \dot{\theta}^\top M(\theta) \dot{\theta}
$$

Where:
- $\dot{\theta}$: Vector of joint velocities  
- $M(\theta)$: **Mass (inertia) matrix** maps joint velocities to kinetic energy

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

#### SUMMARY

After this section, you should have a solid understanding of the structure of a robot’s dynamic model:

$$
\tau = M(\theta)\ddot{\theta} + c(\theta, \dot{\theta}) + g(\theta)
$$

This equation is an extension of Newton’s second law:

> $F = ma$ → but here, $m$ and $a$ both depend on joint velocities and accelerations,  
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
    onclick="checkTrueFalse2('q2-1', 'C', 
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
    onclick="checkTrueFalse2('q2-2', 'C', 
      'Correct! The mass matrix usually varies with the robot configuration, it is not constant.',
      'Incorrect. Try again.')">
    Check Answer
  </button>
  <p id="q2-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Why does not a robot's end-effector feel like a point mass when you push it by hand?</strong></p>
<form id="q2-3">
  <input type="radio" name="q2-3" value="A"> Because the end-effector is rigidly fixed and cannot move independently of the robot’s structure.<br>
  <input type="radio" name="q2-3" value="B"> Friction at joints causes this<br>
  <input type="radio" name="q2-3" value="C"> The apparent inertia varies with configuration and direction<br>
  <input type="radio" name="q2-3" value="D"> End-effectors are programmed to resist force<br>
  <button type="button"
    onclick="checkTrueFalse('q2-3', 'C', 
      'Correct! The robot’s apparent mass depends on its joint configuration and acceleration direction.',
      'Incorrect. Try again.')">
    Check Answer
  </button>
  <p id="q2-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: What does this expression represent? <br> $E_K = \frac{1}{2} \dot{\theta}^\top M(\theta) \dot{\theta}$</strong></p>
<form id="q2-4">
  <input type="radio" name="q2-4" value="A"> The robot’s total potential energy<br>
  <input type="radio" name="q2-4" value="B"> The torque needed to lift the robot<br>
  <input type="radio" name="q2-4" value="C"> The kinetic energy of the robot<br>
  <input type="radio" name="q2-4" value="D"> The force applied at the end-effector<br>
  <button type="button"
    onclick="checkTrueFalse('q2-4', 'C', 
      'Correct! This is the kinetic energy of the robot, expressed using joint velocities and the mass matrix.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q2-4-feedback"></p>
</form>

</details>

<details markdown = "1">
<summary>Mathematical exercises</summary>

> *From Practice Exercise 8.2, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 3:**

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.2.png" width="450" height="auto" alt="Fig 8.2">
  <figcaption>
    <strong>Figure 8.2.</strong> A 2R robot with all mass concentrated at the ends of the links 
  </figcaption>
</figure>

The mass matrix of the 2R robot of Figure 8.2 is

$$
M(\theta)=
\begin{bmatrix}
m_1 L_1^{2} + m_2\left(L_1^{2} + 2 L_1 L_2 \cos \theta_2 + L_2^{2}\right) &
m_2\left(L_1 L_2 \cos \theta_2 + L_2^{2}\right) \cr 
m_2\left(L_1 L_2 \cos \theta_2 + L_2^{2}\right) &
m_2 L_2^{2}
\end{bmatrix},
$$

where each link is modeled as a point mass at the end of the link.
Explain in text and/or figures why each of the entries makes sense, for example using the joint accelerations \$\ddot{\theta}=(1,0)\$ and \$(0,1)\$.

---
> *From Practice Exercise 8.4, MODERN ROBOTICS, Practice Exercices*

**Exercise 4:**

For a given configuration $\theta$ of a two-joint robot, the mass matrix is 
$$
M(\theta)=
\begin{bmatrix}
3 & a \cr 
b & 2
\end{bmatrix},
$$
which has a determinant of $6-ab$ and eigenvalues $\frac{1}{2}\left(5 \pm \sqrt{1 + 4ab}\right)$. What constraints must $a$ and $b$ satisfy for this to be a valid mass matrix?

---
> *From Practice Exercise 8.1, MODERN ROBOTICS, Practice Exercices*

**Exercise 5:** *(this exercise is a continuation of exercise 1)*

Consider the configuration-dependent mass matrix \$M(\theta)\$ from your previous answer. When the robot is at rest (and ignoring gravity), the mass matrix can be visualized as the ellipse of joint forces/torques that are required to generate the unit circle of joint accelerations in \$\ddot{\theta}\$ space. As \$\theta\_2\$ increases, how does this ellipse change? Describe it in text and provide a drawing.



<details markdown="1">
<summary><strong>Solutions</strong></summary>

**Exercise 3:**

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.9.png" width="450" height="auto" alt="Fig 8.9">
  <figcaption>
    <strong>Figure 8.9.</strong>  The linear accelerations of the point masses of the 2R arm for joint accelerations (1,0) and (0,1).
  </figcaption>
</figure>

Let
$$
M =
\begin{bmatrix}
M_{11} & M_{12} \cr
M_{21} & M_{22}
\end{bmatrix},
$$
where
$$M_{11}=m_1 L_1^{2}+m_2(L_1^{2}+2L_1L_2\cos\theta_2+L_2^{2})$$
$$M_{12}=M_{21}=m_2(L_1L_2\cos\theta_2+L_2^{2})$$
$$M_{22}=m_2 L_2^{2}$$

Figure 8.9 shows the linear accelerations of the masses $m_1$ and $m_2$ for joint accelerations $(1,0)$ and $(0,1)$.

The terms $M_{11}$ and $M_{22}$ are relatively easy to understand.
The term $M_{11}$ is the inertia of the robot about joint 1 if joint 2 is locked.
The inertia contribution due to $m_1$ is $m_1 L_1^{2}$.
The distance of $m_2$ from joint 1 is $d_2=\sqrt{L_1^{2}+2L_1L_2\cos\theta_2+L_2^{2}}$ (by the law of cosines), and the inertia contribution due to $m_2$ is $m_2 d_2^{2}$.

The term $M_{22}$ is the inertia about joint 2 due to the mass $m_2$ a distance $L_2$ from the joint.

The off-diagonal term is harder to understand. But we know that if joint 1 accelerates, joint 2 has to apply a torque to keep joint 2 locked. And if joint 2 accelerates, joint 1 has to apply a torque to remain locked; otherwise, conservation of angular momentum about joint 1 would cause it to begin to rotate in a direction opposite joint 2. Using Figure 8.9 and some geometry, you could calculate the joint torque $\tau_2$ required to keep joint 2 stationary when $\dot{\theta}_1=1$, based on the moment about joint 2 generated by the line of force required to accelerate $m_2$.

---

**EXERCISE 4:**

$M(\theta)$ must be positive definite (and therefore symmetric), so $a=b$ and the eigenvalues must be positive, so $\lvert a \rvert = \lvert b \rvert < \sqrt{6}$. (The determinant $\det(M)=6-a^2$ must be positive, which gives the same condition on $\lvert a \rvert$.)

---

**Exercise 5:** *(this exercise is a continuation of exercise 1)*

The mass matrix \$M(\theta)\$ is diagonal, so the principal axes of the ellipse \$M(\theta),\ddot{\theta}\$ (for all \$\ddot{\theta}\$ satisfying \$\lvert\dot{\theta}\rvert = 1\$) are aligned with the \$\tau\_1\$ and \$\tau\_2\$ axes, and the lengths of those principal axes (the eigenvalues of \$M\$) are just the entries along the diagonal. As \$\theta\_2\$ gets larger, the top-left component of \$M\$ gets larger. This means that larger torques at joint 1 are required to generate accelerations in the \$\ddot{\theta}\_1\$ direction, due to the increased inertia of the robot about joint 1. Hence the ellipse gets wider in the \$\tau\_1\$ direction. See Figure 8.7.

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.7.png" width="450" height="auto" alt="Fig 8.7">
  <figcaption>
    <strong>Figure 8.7.</strong> The mass matrix $M(\theta)$ represented as the ellipse of joint forces and torques corresponding to a unit circle of joint accelerations $\ddot{\theta}$ (when gravity and the joint velocities are zero).
  </figcaption>
</figure>

</details>

</details>

---

### 1.2.3.3 (Part1): Dynamics of a Single Rigid Body {#ch3-single}
> - Newton-Euler equations for a free rigid body  
> - Linear and angular momentum  
> - Inertia tensor and spatial representation

![dyn of single rigid body 1](https://www.youtube.com/watch?v=9pdqePt1Nbg)  
><sub>Modern Robotics, Chapter 8.2: Dynamics of a Single Rigid Body (Part 1 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=7PFQou5l9do</sub>

This section introduces the **Newton–Euler method** for modeling the dynamics of a rigid body, the foundation for building full robot dynamics. Unlike the Lagrangian approach, which uses energy, the Newton–Euler formulation is built directly from:

> **Force = mass × acceleration**  
> **Torque = moment of inertia × angular acceleration**

---

#### Rigid Body Basics

- A **rigid body** is modeled as a collection of point masses rigidly connected.
- A **body frame `{b}`** is fixed at the **center of mass (COM)** of the body.
- The **twist** of the body in the `{b}` frame is denoted by:

  $$
  V_b = \begin{bmatrix} \omega_b \\ v_b \end{bmatrix}
  $$

  Where:
  - $\omega_b$: Angular velocity of the body (in `{b}`)
  - $v_b$: Linear velocity of the COM (in `{b}`)

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

**Total Force**:
$$
f_b = m \left( \dot{v}_b + \omega_b \times v_b \right)
$$

**Total Moment**:
$$
m_b = I_b \dot{\omega}_b + \omega_b \times (I_b \omega_b)
$$

Where:
- $I_b$: Inertia matrix of the rigid body (in `{b}`)
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

Computation (for point masses):

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

Rotational kinetic energy in frame `{b}`:

$$
E_K = \frac{1}{2} \omega_b^\top I_b \omega_b
$$

Just like joint-space kinetic energy used the mass matrix, rotational energy uses the **inertia matrix**.

---

#### Principal Axes and Diagonalization

- The **principal axes of inertia** are the eigenvectors of $I_b$ (called $R_{bp}$)
- The **principal moments of inertia** are the eigenvalues of $I_b$
- In the **`{p}` frame** (aligned with principal axes), $I_p$ is **diagonal**:

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

These equations form the **building blocks** for modeling full robot dynamics using recursive Newton–Euler algorithms in later sections.


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
    onclick="checkTrueFalse2('q3-2', 'C', 
      'Correct! The twist includes both linear velocity $v_b$ and angular velocity $\\omega_b$.',
      'Incorrect. Try again.')">
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
    onclick="checkTrueFalse2('q3-3', 'B', 
      'Correct! $I_b$ is symmetric and positive definite by definition.',
      'Incorrect. Try again.')">
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
      'Incorrect. Try again.')">
    Check Answer
  </button>
  <p id="q3-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: The rotational equation $m_b = I_b \dot{\omega}_b + \omega_b \times (I_b \omega_b)$ includes what kind of terms?</strong></p>
<form id="q3-5">
  <input type="radio" name="q3-5" value="A"> Only linear velocity terms<br>
  <input type="radio" name="q3-5" value="B"> Only constant coefficients<br>
  <input type="radio" name="q3-5" value="C"> Only time-invariant matrices<br>
  <input type="radio" name="q3-5" value="D"> Velocity-product (nonlinear) terms<br>
  <button type="button"
    onclick="checkTrueFalse2('q3-5', 'D', 
      'Correct! The cross-product term $\\omega_b \\times (I_b \\omega_b)$ is a nonlinear velocity-product term.',
      'Incorrect. Try again.')">
    Check Answer
  </button>
  <p id="q3-5-feedback"></p>
</form>

</details>

### 1.2.3.3 (Part2): Dynamics of a Single Rigid Body – Spatial Inertia and Equations of Motion

![dyn of single rigid body 2](https://www.youtube.com/watch?v=2rUWVdslaI4)  
><sub>Modern Robotics, Chapter 8.2: Dynamics of a Single Rigid Body (Part 2 of 2). YouTube video. Available at: https://www.youtube.com/watch?v=2rUWVdslaI4</sub>

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

***Kinetic Energy***

The **kinetic energy** of the rigid body becomes:

$$
E_K = \frac{1}{2} V_b^T G_b V_b
$$

---

***Lie Bracket for Twists***

The **Lie bracket** of two spatial twists $V_1$ and $V_2$ is an acceleration measuring how motion along these twist change if the body follows the other twist (here it measures how motion along the twist $V_2$ would change if the body follows the twist $V_1$):

$$
[V_1, V_2] = \text{ad}_{V_1}  V_2
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

***Equations of Motion in Frame `{b}`::***

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

***Frame Change to `{a}`::***

Given a transform $T_{ba}$ from frame `{b}` to `{a}`, the spatial inertia transforms as:

$$
G_a = \mathrm{Ad}(T_{ba})^{\mathrm{T}} \, G_b \, \mathrm{Ad}(T_{ba})
$$

And the equation of motion becomes:

$$
F_a = G_a \dot{V_a} - \text{ad}_{V_a}^T G_a V_a
$$

---

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

<!-- Question 2 -->
<p><strong>Question 1: Why is the spatial inertia matrix $G_b$ a 6×6 matrix?</strong></p>
<form id="q3-2-2">
  <input type="radio" name="q3-2-2" value="A"> It defines a 3D transformation<br>
  <input type="radio" name="q3-2-2" value="B"> It represents a block diagonal rotation matrix<br>
  <input type="radio" name="q3-2-2" value="C"> It tracks six different link positions<br>
  <input type="radio" name="q3-2-2" value="D"> It includes both linear and angular mass properties<br>
  <button type="button"
    onclick="checkTrueFalse('q3-2-2', 'D', 
      'Correct! The 6x6 matrix captures both linear and rotational inertia.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q3-2-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 2: What does the Lie bracket $[V_1, V_2]$ represent in spatial dynamics?</strong></p>
<form id="q3-2-3">
  <input type="radio" name="q3-2-3" value="A"> A linear transformation of velocity<br>
  <input type="radio" name="q3-2-3" value="B"> An acceleration resulting from two combined motions<br>
  <input type="radio" name="q3-2-3" value="C"> A rotation matrix<br>
  <input type="radio" name="q3-2-3" value="D"> A constant torque applied to the robot<br>
  <button type="button"
    onclick="checkTrueFalse('q3-2-3', 'B', 
      'Correct! The Lie bracket captures the change in motion due to interacting twists.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q3-2-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 3: Why do we sometimes prefer to use the principal axes of inertia when modeling a rigid body?</strong></p>
<form id="q3-2-4">
  <input type="radio" name="q3-2-4" value="A"> It reduces rotational noise<br>
  <input type="radio" name="q3-2-4" value="B"> It simplifies the inertia matrix to a diagonal form<br>
  <input type="radio" name="q3-2-4" value="C"> It helps detect collisions<br>
  <input type="radio" name="q3-2-4" value="D"> It improves the robot's visual appearance<br>
  <button type="button"
    onclick="checkTrueFalse('q3-2-4', 'B', 
      'Correct! Principal axes simplify the matrix, making computations more efficient.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q3-2-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 4: In spatial dynamics, what does the velocity-product term $\text{ad}_{V_b}^T G_b V_b$ represent?</strong></p>
<form id="q3-2-5">
  <input type="radio" name="q3-2-5" value="A"> Gravitational force<br>
  <input type="radio" name="q3-2-5" value="B"> The inverse of the mass matrix<br>
  <input type="radio" name="q3-2-5" value="C"> Forces arising from the body's current motion<br>
  <input type="radio" name="q3-2-5" value="D"> A linear projection of angular velocity<br>
  <button type="button"
    onclick="checkTrueFalse('q3-2-5', 'C', 
      'Correct! This term captures Coriolis and centrifugal forces due to motion (velocity-product term).',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q3-2-5-feedback"></p>
</form>

</details>


<details markdown = "1">
<summary>Mathematical exercises</summary>

> *From Practice Exercise 8.6, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 6:**

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.3.png" width="200" height="auto" alt="Fig 8.3">
  <figcaption>
    <strong>Figure 8.3.</strong> A ring of radius 3.
  </figcaption>
</figure>

Figure 8.3 shows a ring in the $\hat{y}\_b\$–\$\hat{z}\_b$ plane (the $\hat{x}\_b$ coordinate of each point on the ring is zero). The radius of the ring is $3$ (all mass is a distance \$3\$ from the $\hat{x}\_b$-axis). The mass of the ring is $10$, and the mass is uniformly distributed around the ring. Write the spatial inertia matrix $G\_b$. All entries should be numerical, no symbols or math.

---

> *From Practice Exercise 8.10, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 7:**
Consider the object in Figure 8.5 that consists of a cube and sphere that are rigidly attached. The \${c}\$ and \${s}\$ frames of each component are aligned with the principal axes and located at the center of mass. The \$z\$-axes of both frames are colinear. Given that the body inertia of a sphere is
$I_s=\left(\frac{2mr^2}{5}\right) I_{3\times3},$
the body inertia of a cube is
$I_c=\left(\frac{ml^2}{6}\right) I_{3\times3},$
\$r=1\$, \$l=2\$, the cube has mass \$2\$, and the sphere has mass \$1\$, solve for the spatial inertia matrix \$G\_b\$ for the object.


<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.5.png" width="250" height="auto" alt="Fig 8.5">
  <figcaption>
    <strong>Figure 8.5.</strong> Rigid object consisting of a sphere and cube.
  </figcaption>
</figure>

<details markdown="1">
<summary><strong>Solution</strong></summary>

**EXERCISE 6:**

$$
G_b \;=\;
\begin{bmatrix}
90 & 0 & 0 & 0 & 0 & 0 \cr
0 & 45 & 0 & 0 & 0 & 0 \cr
0 & 0 & 45 & 0 & 0 & 0 \cr
0 & 0 & 0 & 10 & 0 & 0 \cr
0 & 0 & 0 & 0 & 10 & 0 \cr
0 & 0 & 0 & 0 & 0 & 10
\end{bmatrix},
$$

where the inertia about the $\hat{x}\_b$-axis is $mR^2 = 90$ since $m = 10$ and $R = 3$. The inertia about the $\hat{y}\_b$ and $\hat{z}\_b$ axes is $\tfrac{1}{2} m R^2$ (derive this formula from the integral or look it up online).

---

**EXERCISE 7:**

$$
COM_s = (0,0,3), \quad COM_c = (0,0,1).
$$

$$
COM_b = \frac{COM_s\,m_s + COM_c\,m_c}{2}.
$$

$$
q_c = COM_b - COM_c
\quad,\quad
q_s = COM_b - COM_s
$$

$$
I_1 = I_c + m_c \left(q_c^{T} q_c\, I - q_c q_c^{T}\right)
$$

$$
I_2 = I_s + m_s \left(q_s^{T} q_s\, I - q_s q_s^{T}\right)
$$

$$
I_b = I_1 + I_2 = \operatorname{diag}(6.48,\, 6.48,\, 1.73)
$$

$$
G_b = \operatorname{diag}(6.48,\, 6.48,\, 1.73,\, 3,\, 3,\, 3)
$$

</details>

</details>

---

### 1.2.3.4: Inverse Dynamics with Newton-Euler
> - Recursive Newton-Euler algorithm  
> - Computing joint torques given a motion  
> - Efficiency advantages for real-time control

![inverse dynamics](https://www.youtube.com/watch?v=ZASVKAlegfQ)  
><sub>Modern Robotics, Chapter 8.3: Newton-Euler inverse Dynamics. YouTube video. Available at: https://www.youtube.com/watch?v=ZASVKAlegfQ</sub>

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
***Step 1: Forward Iteration (from base to end-effector)***

Compute twists and accelerations:

1.**Compute transformation**  
$$
T_{i,i-1} = e^{-A_i \theta_i} M_{i,i-1}
$$

2.**Compute twist**  
$$
V_{i} = Ad_{T_{i,i-1}} \, V_{i-1} + A_i \dot{\theta}_i
$$

3.**Compute acceleration**  
$$
\dot{V_i} = Ad_{T_{i,i-1}} \, \dot{V_{i-1}} + \text{ad}_{V_b} \, A_i \, \dot{\theta}_i + A_i \, \ddot{\theta}_i
$$

Where:
- $Ad_{T_{i,i-1}}$ is the Adjoint transformation from frame ${i-1}$ to ${i}$
- $\text{ad}_V$ is the Lie bracket operator (captures velocity-product terms)

***Step 2: Backward Iteration (from end-effector to base)***

Compute wrenches and torques:

4.**Compute wrench**  
$$
F_i = Ad_{T_{i+1,i}}^T F_{i+1} + G_i \dot{V_i} - \text{ad}_{V_i}^T G_i V_i
$$

Where:
- $G_i$: Spatial inertia matrix of link $i$

5.**Compute joint torque**  
$$
\tau_i = F_i^T A_i
$$

Only the component of $F_i$ **along $A_i$** must be supplied by the joint actuator.

---

***Final Output::***

After forward and backward passes, we obtain:
- Joint torques $\tau = [\tau_1, \dots, \tau_n]^T$ required for:
  - Joint positions $\theta$
  - Velocities $\dot{\theta}$
  - Accelerations $\ddot{\theta}$
  - End-effector wrench $F_{\text{tip}}$

---

#### SUMMARY

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
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q4-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: What does the forward iteration of the Newton-Euler algorithm compute?</strong></p>
<form id="q4-2">
  <input type="radio" name="q4-2" value="A"> End-effector position only<br>
  <input type="radio" name="q4-2" value="B"> Joint torques<br>
  <input type="radio" name="q4-2" value="C"> Inertia matrices<br>
  <input type="radio" name="q4-2" value="D"> Twists and accelerations of each link<br>
  <button type="button"
    onclick="checkTrueFalse('q4-2', 'D', 
      'Correct! The forward pass computes configuration, twist, and acceleration for each link.',
      'Not quite. Try again.')">
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
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q4-3-feedback"></p>
</form>

<!-- Question 4 -->
<!-- <p><strong>Question 4: What role does the Lie bracket term $\text{ad}_{A_i \dot{\theta}_i} V_i$ play in the algorithm?</strong></p>
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
</form> -->

<!-- Question 5 -->
<p><strong>Question 4: Why is the Newton-Euler algorithm considered efficient?</strong></p>
<form id="q4-5">
  <input type="radio" name="q4-5" value="A"> It uses symbolic computation<br>
  <input type="radio" name="q4-5" value="B"> It ignores velocity and acceleration<br>
  <input type="radio" name="q4-5" value="C"> It is recursive and avoids numerical integration or differentiation<br>
  <input type="radio" name="q4-5" value="D"> It uses machine learning to predict torques<br>
  <button type="button"
    onclick="checkTrueFalse('q4-5', 'C', 
      'Correct! Its recursive structure eliminates the need for differentiation, making it fast and scalable.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q4-5-feedback"></p>
</form>

</details>


<details markdown = "1">
<summary>Mathematical exercises</summary>

> *From Practice Exercise 8.5, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 8:**

Link $i$ of an open-chain robot has two frames attached to it, a frame ${b}$ at its center of mass and a frame ${a}$ on the axis of joint $i$, a revolute joint, that drives the link. In the frame ${a}$, the screw axis of the revolute joint is expressed as $S$. In the backward iterations of Newton–Euler inverse dynamics, it was determined that the wrench $F\_b$ (expressed in ${b}$) must be applied to the link. What joint torque $\tau\_i$ must be applied at joint $i$, in terms of $F\_b$, $S$, and the frames ${a}$ and ${b}$?

---

> *From Practice Exercise 8.11, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 9:**

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.6.png" width="450" height="auto" alt="Fig 8.6">
  <figcaption>
    <strong>Figure 8.6.</strong> 2D quadcopter and attached pendulum
  </figcaption>
</figure>

You are teaching **Newton–Euler inverse dynamics**, and you are using the **2R robot** from the beginning of section 1.2.3.8 (see also **Figure 8.6**) as an example. Each link has length $L_i$ and the mass of each link is $m_i$, concentrated at a point at the end of the link. You already know the correct dynamics from the Lagrangian derivation. Now you will show how to arrive at the same answer using Newton–Euler. Go through the method step by step, showing intermediate results if it is helpful.

**(a)** Give $M_i$, $M_{i-1,i}$, $A_i$, $S_i$, $g$, $\mathcal{G}_i$, $\mathcal{V}_0$, $\dot{\mathcal{V}}_0$. 
> *You can assume the frame ${3}$ is coincident with ${2}$ and $\mathcal{F}_{\text{tip}}$ is zero.*

**(b)** *Forward iteration:* First calculate the transformation, twist, and twist derivative for link 1, then calculate them for link 2.

**(c)** *Backward iteration:* First calculate $\mathcal{F}_2$ and $\tau_2$, then calculate $\mathcal{F}_1$ and $\tau_1$. Confirm that your final result agrees with the result in the notes.




<details markdown="1">
<summary><strong>Solutions</strong></summary>

**EXERCISE 8:**

Take the dot product of the wrench with the screw axis after they’ve been expressed in the same frame; e.g., in the frame ${b}$:

$$
\tau_i = F_b^{\top} \mathrm{Ad}_{T_ba} S .
$$

---

**Exercise 9:**

**(a)** Observe the drawing. Find the transformation matrix $\mathcal{M}_i \in SE(3)$ for each link. $\mathcal{M}_i$ is the transformation from the base frame $\{0\}$ to the frame $\{i\}$, which is attached to the center of mass of the $i$-th link, when the robot is in its home configuration.

$$
\mathcal{M}_{1} =
\begin{bmatrix}
1 & 0 & 0 & L_1 \cr
0 & 1 & 0 & 0 \cr
0 & 0 & 1 & 0 \cr
0 & 0 & 0 & 1
\end{bmatrix},
\qquad
\mathcal{M}_{{12}} =
\begin{bmatrix}
1 & 0 & 0 & L_1 + L_2 \cr
0 & 1 & 0 & 0 \cr
0 & 0 & 1 & 0 \cr
0 & 0 & 0 & 1
\end{bmatrix}.
$$



$\mathcal{M}_{12} \in SE(3)$ is the transformation matrix from the frame ${1}$ (attached to center of mass of link 1) to the frame ${2}$ (attached to the center of mass of link 2), when the arm is in its home configuration. 

Find $\mathcal{M}_{2}$ by observing the drawing or by using the equation:

$$\mathcal{M}_{12}=\mathcal{M}_1^{-1}\mathcal{M}_2$$.

$$
\mathcal{M}_{2} =
\begin{bmatrix}
1 & 0 & 0 & L_2 \cr
0 & 1 & 0 & 0 \cr
0 & 0 & 1 & 0 \cr
0 & 0 & 0 & 1
\end{bmatrix}.
$$

From observing the drawing, obtain the screw-axis $S_i$ for each joint, expressed in the space-frame:

$$
S_1 = [\,0,\;0,\;1,\;0,\;0,\;0\,]^\top,\qquad
S_2 = [\,0,\;0,\;1,\;0,\;-L_1,\;0\,]^\top .
$$

$A_i$ is the twist-vector for joint $i$ expressed in the frame $\{i\}$ when the arm is in its home configuration ($\theta_i=0$). For a simple 2R arm it can be obtained by observing the spatial velocity of frame $\{i\}$ when rotating about joint $i$ from the home configuration. Alternatively one may use the equation

$$
A_i = \mathrm{Ad}_{\mathcal{M}_i^{-1}}\,S_i .
$$

$$
A_1 = [\,0,\;0,\;1,\;0,\;L_1,\;0\,]^\top,\qquad
A_2 = [\,0,\;0,\;1,\;0,\;L_2,\;0\,]^\top .
$$

Define the gravity vector $g=[\,0,\;g,\;0\,]^\top$ with $g<0$. Define the spatial inertia matrix $G_i$ for each link $i$, expressed in the frame $\{i\}$. In this case we assume the mass is concentrated as a point mass:

$$
G_1=
\begin{bmatrix}
0&0&0&0&0&0\cr
0&0&0&0&0&0\cr
0&0&0&0&0&0\cr
0&0&0&m_1&0&0\cr
0&0&0&0&m_1&0\cr
0&0&0&0&0&m_1
\end{bmatrix},
\qquad
G_2=
\begin{bmatrix}
0&0&0&0&0&0\cr
0&0&0&0&0&0\cr
0&0&0&0&0&0\cr
0&0&0&m_2&0&0\cr
0&0&0&0&m_2&0\cr
0&0&0&0&0&m_2
\end{bmatrix}.
$$

The base is fixed to the ground. It therefore has no velocity. It is however subject to gravity. The gravity vector $g$ needs to be incorporated in $\dot{\mathcal{V}}_0$.

$$
\mathcal{V}_0=[\,0,\;0,\;0,\;0,\;0,\;0\,]^\top,\qquad
\dot{\mathcal{V}}_0=[\,0,\;0,\;0,\;0,\;g,\;0\,]^\top .
$$

---

**(b)** During the forward iteration of Newton–Euler inverse dynamics, we obtain the states and accelerations of the frames attached to each link. Because the velocity and acceleration of each link is influenced by those of its predecessors, we start our calculations at the base and incrementally move out-board until the states and accelerations for each link have been obtained. As a convention we will express velocities $\mathcal{V}_i$ and accelerations $\dot{\mathcal{V}}_i$ for each link $i$ in the frame $\{i\}$, which is attached to the center of mass of the respective link.

**Link 1 states and acceleration:**

We now calculate the transformation $T_{01}$ from link 1’s predecessor (frame $\{0\}$) to itself (frame $\{1\}$). The equation $T_{01}=\mathcal{M}_1 e^{[A_1]\theta_1}$ takes $\mathcal{M}_1$ (the transformation from the base frame $\{0\}$ to the frame $\{1\}$ when the robot is in its home configuration $\theta_1=\theta_2=0$) as a reference point, and incorporates twists (exponential coordinates $A_1\theta_1$) about joint 1 to find the transformation from frame $\{0\}$ to frame $\{1\}$ for any given $\theta_1$.

$$
T_{01}=
\begin{bmatrix}
\cos\theta_1 & -\sin\theta_1 & 0 & L_1\cos\theta_1\cr
\sin\theta_1 & \phantom{-}\cos\theta_1 & 0 & L_1\sin\theta_1\cr
0&0&1&0\cr
0&0&0&1
\end{bmatrix}.
$$

Calculate the absolute velocity $\mathcal{V}_1$ of the frame $\{1\}$ expressed in frame $\{1\}$.

<!-- *Detail*: $\mathcal{V}_1$ is composed of two terms:

$$
\mathcal{V}_1 \;=\; \Ad_{T_{1}}\,\mathcal{V}_0 \;+\; A_1\,\dot{\theta}_1 .
$$

First term: If joint 1 had a constant angle $\theta_1$, then the base, together with the first link, could be regarded as a single rigid body. Using the Adjoint of a transformation matrix $T_{10}$ (between two frames $\{1\}$ and $\{0\}$, that are assumed to be fixed to a rigid body), a spacial velocity of one point (i.e. frame $\{1\}$) can be expressed in terms of the spacial velocity of another point (i.e. frame $\{0\}$). The first term considers the portion of $\mathcal{V}_1$, as a result of being attached to a previous dynamic body. In this particular case the base body is stationary, $\mathcal{V}_0$ is zero and therefore the first term of the equation is also 0.

Second term: The joint angle $\theta_1$ of joint 1 is generally not constant and the joint-angle velocity $\dot{\theta}_1$ is not 0. The second term of the equation for $\mathcal{V}_1$ incorporates the additional velocity of the frame $\{1\}$ caused by rotating about joint 1. -->

$$
\mathcal{V}_1=[\,0,\;0,\;\dot{\theta}_1,\;0,\;L_1\dot{\theta}_1,\;0\,]^\top .
$$

Calculate the absolute acceleration $\dot{\mathcal{V}}_1$ of the frame $\{1\}$ expressed in frame $\{1\}$.

<!-- *Detail*: 

$$
\dot{\mathcal{V}}_1 = \mathrm{Ad}_{T_{10}} \dot{\mathcal{V}}_0 + [\mathcal{V}_1,A_1] \dot{\theta}_1 + A_1 \ddot{\theta}_1
$$ 

where $[\mathcal{V}_1,A_1]$ indicates the Lie-Bracket operation of $\mathcal{V}_1$ and $A_1$. 

* The first term considers the acceleration of the previous rigid body, i.e. the acceleration of the base frame $\{0\}$. 
* The second term considers the coriolis and centripetal accelerations.
* The third term considers accelerations of frame $\{1\}$, due to joint-angle accelerations $\ddot{\theta}_1$. -->

$$
\dot{\mathcal{V}}_1=[\,0,\;0,\;\dot{\theta}_1,\;g\sin(\theta_1),\;g\cos(\theta_1)+L_1\dot{\theta}_1,\;0\,]^\top .
$$

**Link 2 states and acceleration:**

We now calculate the transformation $T_{12}$ from link $\{2\}$’s predecessor (frame $\{1\}$) to itself (frame $\{2\}$). 

The equation:

$$
T_{12}=\mathcal{M}_{12} e^{[A_2]\theta_2}
$$ 

takes $\mathcal{M}_{12}$ (the transformation from frame $\{1\}$ to frame $\{2\}$ when the robot is in its home configuration $\theta_1=\theta_2=0$) as a reference point, and incorporates twists (exponential coordinates $A_2\theta_2$) about joint 2 to find the transformation from frame $\{1\}$ to frame $\{2\}$ for any given $\theta_2$.

$$
T_{12}=
\begin{bmatrix}
\cos\theta_2 & -\sin\theta_2 & 0 & L_2\cos\theta_2 \cr
\sin\theta_2 & \phantom{-}\cos\theta_2 & 0 & L_2\sin\theta_2 \cr
0&0&1&0 \cr
0&0&0&1
\end{bmatrix}.
$$

Calculate the absolute velocity $\mathcal{V}_2$ of the frame $\{2\}$ expressed in frame $\{2\}$.

<!-- *Detail:* $\mathcal{V}_2$ is composed of two terms:

$$
\mathcal{V}_2=\mathrm{Ad}_{T_{21}}\,\mathcal{V}_1 + A_2\dot{\theta}_2 .
$$

$$
\mathcal{V}_2 \;=\; \mathrm{Ad}_{T_{21}}\,\mathcal{V}_1 \;+\; A_2\,\dot{\theta}_2 .
$$

First term: If joint 2 had a constant angle $\theta_2$, then link 1, together with link 2, could be regarded as a single rigid body. Using the Adjoint of a transformation matrix $T_{21}$ (between two frames $\{2\}$ and $\{1\}$, that are assumed to be fixed to a rigid body) a spacial velocity of one point (i.e. frame $\{2\}$) can be expressed in terms of the spacial velocity of another point (i.e. frame $\{1\}$). The first term considers the portion of $\mathcal{V}_2$, as a result of being attached to a previous dynamic body.

Second term: The joint angle $\theta_2$ of joint 2 is generally not constant and the joint-angle velocity $\dot{\theta}_2$ is not 0. The second term of the equation for $\mathcal{V}_2$ incorporates the additional velocity of the frame $\{2\}$ expressed by rotating about joint 2.
 -->

</details>

</details>

---

### 1.2.3.5: Forward Dynamics of Open Chains
> - Computing motion from applied torques  
> - Articulated body algorithm (brief overview)  
> - Simulation pipelines

![forward dynamics](https://www.youtube.com/watch?v=L8zpJOxDbh4)  
><sub>Modern Robotics, Chapter 8.5: Forward Dynamics of Open Chains. YouTube video. Available at: https://www.youtube.com/watch?v=L8zpJOxDbh4</sub>


Forward dynamics answers the question: 

**Given joint torques $\tau$, what are the resulting joint accelerations $\ddot{\theta}$ ?**


It complements the Newton–Euler **inverse-dynamics** algorithm derived in the previous chapter.

---

#### Re-using Inverse Dynamics

1. **Bias torque (zero-acceleration call)**  
   Set $\ddot{\theta}=0$ and run inverse dynamics **once**.  
   The result is  

   $$
   \tau_{\text{bias}} \;=\; c(\theta,\dot{\theta}) \;+\; g(\theta) \;+\; J^{\top}(\theta) F_{\text{tip}}
   $$  

   capturing **Coriolis**, **gravity**, and any **end-effector wrench** terms.

2. **Mass-matrix construction**  
   Call inverse dynamics **n times** (one per joint):  
   * For call $i$, set $\ddot{\theta}$ = 1, all other $\ddot{\theta}$ = 0 , and set gravity, $F_{\text{tip}}$, and $\dot{\theta}$ to zero.  

   * The returned torque vector is **column $i$** of the mass matrix $M(\theta)$  

   * After n calls, assemble all columns to obtain the full symmetric matrix $M(\theta)$.

3. **Solve for accelerations**  

   $$
   M(\theta)\,\ddot{\theta} \;=\; \tau \;-\; \tau_{\text{bias}}
   $$  

   Use any efficient linear solver to obtain $\ddot{\theta}$.

---

#### Simulation Loop

At each simulation time-step:

1. Compute $\ddot{\theta}$ via forward dynamics.  
2. Integrate $\ddot{\theta}$ → update $\dot{\theta}$ and $\theta$ (Euler, Runge–Kutta, etc.).  
3. Repeat.

*Example*: A 6-R arm dropped with $\tau = 0$.  
With no friction, total mechanical **energy** (kinetic + potential) should remain nearly constant, an easy check on simulation accuracy.

---

#### SUMMARY

* **Forward dynamics**: torques → accelerations.  
  **Inverse dynamics**: accelerations → torques.  
* Needs only **n + 1** inverse-dynamics calls (one bias term + n columns of $M$).  
* Energy conservation is a quick simulator sanity-check.  
* Forward dynamics underpins trajectory simulation, controller testing, and physics-based animation.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/Dynamics/dyna.png' }}" width="200px" alt="dyna">
  <figcaption>
    <strong>Figure:</strong> Explaining the relation between forward and inverse dynamics (created by author).
  </figcaption>
</figure>

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What is the primary purpose of the forward-dynamics algorithm for an open-chain robot?</strong></p>
<form id="q5-1">
  <input type="radio" name="q5-1" value="A"> To compute joint torques from desired accelerations<br>
  <input type="radio" name="q5-1" value="B"> To measure joint friction experimentally<br>
  <input type="radio" name="q5-1" value="C"> To generate 3-D graphics of robot motion<br>
  <input type="radio" name="q5-1" value="D"> To determine joint accelerations $(\ddot{\theta})$ given torques, positions, and velocities<br>
  <button type="button"
    onclick="checkTrueFalse('q5-1','D',
      'Correct! Forward dynamics maps applied torques to resulting accelerations.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q5-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: How many inverse-dynamics calls are required to build the mass matrix $M(\theta)$ for an n-DOF robot?</strong></p>
<form id="q5-2">
  <input type="radio" name="q5-2" value="A"> 1<br>
  <input type="radio" name="q5-2" value="B"> n<br>
  <input type="radio" name="q5-2" value="C"> n + 1<br>
  <input type="radio" name="q5-2" value="D"> 2n<br>
  <button type="button"
    onclick="checkTrueFalse2('q5-2','B',
      'Correct! One inverse-dynamics call per joint (with unit acceleration) yields each column of $M$, i.e., n calls',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q5-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: The “bias torque” $\tau_{\text{bias}}$ (obtained with all $\ddot{\theta}=0$) contains which terms?</strong></p>
<form id="q5-3">
  <input type="radio" name="q5-3" value="A"> Only gravity<br>
  <input type="radio" name="q5-3" value="B"> Coriolis + gravity + end-effector wrench<br>
  <input type="radio" name="q5-3" value="C"> Only joint damping<br>
  <input type="radio" name="q5-3" value="D"> Mass-matrix columns<br>
  <button type="button"
    onclick="checkTrueFalse2('q5-3','B',
      'Correct! With zero accelerations, the inverse-dynamics output equals Coriolis, gravity, and any $J^T F_{tip}$ terms.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q5-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: When constructing column <i>i</i> of $M(\theta)$, which quantity is set to 1 while others are zero?</strong></p>
<form id="q5-4">
  <input type="radio" name="q5-4" value="A"> Joint i velocity $\dot{\theta}_i$<br>
  <input type="radio" name="q5-4" value="B"> Joint i acceleration $\ddot{\theta}_i$<br>
  <input type="radio" name="q5-4" value="C"> Gravity vector<br>
  <input type="radio" name="q5-4" value="D"> End-effector force magnitude<br>
  <button type="button"
    onclick="checkTrueFalse2('q5-4','B',
      'Correct! We set $\\ddot{\\theta}_i = 1$ (all others 0) to obtain column <i>i</i> of $M$.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q5-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: In a simulation with zero torques and zero friction, why should the robot’s total mechanical energy remain nearly constant?</strong></p>
<form id="q5-5">
  <input type="radio" name="q5-5" value="A"> Numerical damping removes energy<br>
  <input type="radio" name="q5-5" value="B"> Because mass matrix is diagonal<br>
  <input type="radio" name="q5-5" value="C"> Gravity continuously adds energy<br>
  <input type="radio" name="q5-5" value="D"> No external work or dissipation, so kinetic + potential energy is conserved<br>
  <button type="button"
    onclick="checkTrueFalse('q5-5','D',
      'Correct! Without friction or input power, energy is conserved, giving a good validation check.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q5-5-feedback"></p>
</form>

</details>


### 1.2.3.6: Task-Space Dynamics

> - Mapping dynamics from joint space to end-effector (operational) space  
> - Operational space inertia matrix  
> - Force control and impedance concepts

![task space dynamics](https://www.youtube.com/watch?v=iQa01aFgf8U)  
><sub>Modern Robotics, Chapter 8.6: Task-Space Dynamics. YouTube video. Available at: https://www.youtube.com/watch?v=iQa01aFgf8U</sub>

So far we have described robot dynamics in **joint space** (joint motions, forces, and torques).  
We can express the same dynamics directly in **task space**, the space of **end-effector twists** and **wrenches**.

---

#### Velocity and Acceleration in Task Space

- End-effector twist  
  $$ V = J(\theta)\, \dot{\theta} $$

- If the Jacobian $J(\theta)$ is **invertible**, differentiate once:
  $$
  \dot{V} = J(\theta)\, \ddot{\theta} + \dot{J}(\theta)\, \dot{\theta}
  $$

- Solve for $(\dot{\theta}, \ddot{\theta})$ in terms of $(V, \dot{V})$ and substitute into the joint-space dynamics.

---

#### Task-Space Dynamic Equation

The resulting wrench equation becomes

$$
\boxed{F_{\text{task-space dynamics}} \;=\; \Lambda(\theta)\, \dot{V} \;+\; \eta(\theta, V) \;+\; F_{\text{tip}}}
$$

where  

* **$\Lambda(\theta)$**: *task-space mass matrix* (a mapping from end-effector acceleration to wrench)  
  $$
  \Lambda(\theta) \;=\; J^{-T} M(\theta) J^{-1}
  $$

* **$\eta(\theta, V)$**: *task-space bias wrench* (Coriolis + gravity terms expressed at the end effector)  
  $$
  \eta(\theta, V) \;=\; J^{-T} h(\theta, J^{-1} V)- \Lambda(\theta) \dot{J}(\theta) J^{-1} V
  $$

* **$F_{\text{tip}}$**: any additional wrench applied directly by (or to) the tool.

> **Important:** $\Lambda$ and $\eta$ are functions of **joint positions $\theta$**, not directly of the task-space pose $X$, because multiple joint configurations can map to the same end-effector pose.

---

#### Why Task-Space Dynamics?

* **Intuitive control:** force/impedance control at the tool tip  
* **Decoupling:** $\Lambda(\theta)$ acts like an “apparent mass” felt at the end effector  
* **Planning & compliance:** specify motions and forces directly where the robot interacts with its environment

Task-space dynamics provides a powerful framework for advanced control strategies such as operational-space control, impedance control, and hybrid position/force control.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: In task-space dynamics, what does the matrix $\Lambda(\theta)$ represent?</strong></p>
<form id="q6-1">
  <input type="radio" name="q6-1" value="A"> The Jacobian transpose<br>
  <input type="radio" name="q6-1" value="B"> The task-space mass matrix (apparent inertia at the end-effector)<br>
  <input type="radio" name="q6-1" value="C"> The gravity vector<br>
  <input type="radio" name="q6-1" value="D"> The joint-space Coriolis matrix<br>
  <button type="button"
    onclick="checkTrueFalse2('q6-1', 'B',
      'Correct!  $\\Lambda(\\theta)$ is the mass matrix expressed in task space.', 
      'Not quite.  Try again.')">
    Check Answer
  </button>
  <p id="q6-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: Which term appear on the right-hand side (total force balance needed to achieve the motion in task space) of the task-space equation
$F_{\text{ee}} = \Lambda(\theta)\dot{V} + \eta(\theta,V) + F_{\text{tip}}$?</strong></p>
<form id="q6-2">
  <input type="radio" name="q6-2" value="A"> Only inertial (mass) forces<br>
  <input type="radio" name="q6-2" value="B"> Inertial forces plus bias (Coriolis&nbsp;+ gravity) wrench<br>
  <input type="radio" name="q6-2" value="C"> Bias wrench only<br>
  <input type="radio" name="q6-2" value="D"> Damping forces only<br>
  <button type="button"
    onclick="checkTrueFalse2('q6-2', 'B',
      'Correct!  The total wrench is inertia ($\\Lambda\\dot{V}$) plus bias ($\\eta$) plus any applied wrench $F_{tip}$.',
      'Not quite. Try again')">
    Check Answer
  </button>
  <p id="q6-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Why are $\Lambda$ and $\eta$ expressed as functions of joint positions $\theta$ rather than the end-effector pose $X$?</strong></p>
<form id="q6-3">
  <input type="radio" name="q6-3" value="A"> Because $X$ is always identical to $\theta$<br>
  <input type="radio" name="q6-3" value="B"> Because the Jacobian is always the identity matrix<br>
  <input type="radio" name="q6-3" value="C"> Because multiple joint configurations can result in the same end-effector pose<br>
  <input type="radio" name="q6-3" value="D"> For numerical convenience only<br>
  <button type="button"
    onclick="checkTrueFalse2('q6-3', 'C',
      'Correct!  A given pose $X$ may correspond to several joint solutions, so the dynamics depend on the specific $\\theta$.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q6-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: Which condition must hold to express $\dot{V}$ directly in terms of $\ddot{\theta}$ and $\theta$?</strong></p>
<form id="q6-4">
  <input type="radio" name="q6-4" value="A"> The Jacobian $J(\theta)$ must be invertible<br>
  <input type="radio" name="q6-4" value="B"> Gravity must be zero<br>
  <input type="radio" name="q6-4" value="C"> Joint velocities must be zero<br>
  <input type="radio" name="q6-4" value="D"> The end-effector wrench must be constant<br>
  <button type="button"
    onclick="checkTrueFalse2('q6-4', 'A',
      'Correct!  An invertible Jacobian lets us solve $\\dot{V}=J\\ddot{\\theta}+\\dot{J}\\dot{\\theta}$ for $\\ddot{\\theta}$ or vice-versa.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q6-4-feedback"></p>
</form>

<!-- Question 5 -->
<!-- <p><strong>Question 5: How does an externally applied end-effector wrench $F_{\text{tip}}$ enter the task-space dynamic equation?</strong></p>
<form id="q6-5">
  <input type="radio" name="q6-5" value="A"> It is multiplied by the Jacobian to produce joint torques<br>
  <input type="radio" name="q6-5" value="B"> It subtracts from the bias wrench<br>
  <input type="radio" name="q6-5" value="C"> It is added directly to the total wrench on the left-hand side<br>
  <input type="radio" name="q6-5" value="D"> It cancels the inertia term<br>
  <button type="button"
    onclick="checkTrueFalse2('q6-5', 'C',
      'Correct!  $F_{tip}$ is simply added to the wrench required at the end effector.',
      'Not quite.  $F_{tip}$ is added (not subtracted or multiplied) in the task-space equation.')">
    Check Answer
  </button>
  <p id="q6-5-feedback"></p>
</form> -->

<p><strong>Question 5:</strong> For a planar 2-DOF end effector, let:
$
J(\theta)=\begin{bmatrix}1&0\cr 0&2\end{bmatrix},
M(\theta)=\begin{bmatrix}2&0\cr 0&8\end{bmatrix}.
$
The task-space mass matrix is defined by $\Lambda(\theta)=J(\theta)^{-T}\,M(\theta)\,J(\theta)^{-1}$.

What is $\Lambda(\theta)$?</p>

<form id="q6-5">
  <input type="radio" name="q6-5" value="A">
  $\begin{bmatrix}2&0\cr 0&2\end{bmatrix}$ <br>
  <input type="radio" name="q6-5" value="B">
  $\begin{bmatrix}2&0\cr 0&8\end{bmatrix}$ <br>
  <input type="radio" name="q6-5" value="C">
  $J(\theta)^{T}M(\theta)J(\theta)$<br>
  <input type="radio" name="q6-5" value="D">
  $\begin{bmatrix}1&0\cr 0&1\end{bmatrix}$ <br><br>

  <button type="button"
    onclick="checkTrueFalse2('q6-5','A',
      'Correct!',
      'Not quite. Try again.')">
    Check Answer
  </button>

  <p id="q6-5-feedback"></p>
</form>

</details>


<details markdown = "1">
<summary>Mathematical exercises</summary>

> *From Practice Exercise 8.1.(h), MODERN ROBOTICS, Practice Exercices*

**EXERCISE 10:** *(this exercise is a continuation of exercise 1)*

**(h)** Now visualize the configuration-dependent end-effector mass matrix \$\Lambda(\theta)\$, where the “end-effector” is considered to be at the point \$(x\_2, y\_2)\$, the location of the center of mass of the second link. For a unit circle of accelerations \$(\ddot{x}\_2,\ddot{y}\_2)\$, consider the ellipse of linear forces that are required to be applied at the end-effector to realize these accelerations. How does the orientation of this ellipse change as \$\theta\_1\$ changes? How does the shape change as \$\theta\_2\$ increases from zero to infinity when \$\theta\_1=0\$? Provide a drawing for the case \$\theta\_1=0\$. If you have access to symbolic computation software (e.g., Mathematica), you can use the Jacobian \$J(\theta)\$ satisfying

$$
\begin{bmatrix}
\dot{x}_2 \cr
\dot{y}_2
\end{bmatrix}
=
J(\theta)\,\dot{\theta}\, .
$$

to calculate \$\Lambda(\theta) = J^{-T}(\theta),M(\theta),J^{-1}(\theta)\$ for the case \$\theta\_1 = 0\$. If you do not have access to symbolic computation software, you can plug in numerical values for \$I\_1\$, \$I\_2\$, \$m\_1\$, \$m\_2\$, and \$L\_1\$ (make them all equal to \$1\$, for example) to say something about how \$\Lambda\$ changes (and therefore how the ellipse changes) as \$\theta\_2\$ goes from zero to infinity while \$\theta\_1 = 0\$.

---

> *From Practice Exercise 8.8, MODERN ROBOTICS, Practice Exercices*

**EXERCISE 11:** 
 
Consider the four equivalent forms of dynamics shown below:

$$
\tau \;=\; M(\theta)\,\ddot{\theta} \;+\; h(\theta,\dot{\theta}) \;+\; J^{T}(\theta)\,F_{\text{tip}}
\tag{8.1}
$$

$$
\tau \;=\; M(\theta)\,\ddot{\theta} \;+\; c(\theta,\dot{\theta}) \;+\; g(\theta) \;+\; J^{T}(\theta)\,F_{\text{tip}}
\tag{8.2}
$$

$$
\tau \;=\; M(\theta)\,\ddot{\theta} \;+\; C(\theta,\dot{\theta})\,\dot{\theta} \;+\; g(\theta) \;+\; J^{T}(\theta)\,F_{\text{tip}}
\tag{8.3}
$$

$$
\tau \;=\; M(\theta)\,\ddot{\theta} \;+\; \dot{\theta}^{T}\Gamma(\theta)\dot{\theta} \;+\; g(\theta) \;+\; J^{T}(\theta)\,F_{\text{tip}}
\tag{8.4}
$$

**(a)** List the variables common to all of the equations, what they represent, their dimension, how they are derived, and any constraints they must always follow or properties they must satisfy.

**(b)** For the unique variables in each of the equations, describe what they represent and provide the dimension.


<details markdown="1">
<summary><strong>Solutions</strong></summary>

**EXERCISE 8:** *(this exercise is a continuation of exercise 1)*

The Jacobian relating joint velocities $\dot{\theta}$ to the velocity of the end-effector $(\dot{x}_2,\dot{y}_2)$ is
$$
J(\theta)=
\begin{bmatrix}
-\theta_2 \sin\theta_1 & \ \cos\theta_1 \cr
\ \theta_2 \cos\theta_1 & \ \sin\theta_1
\end{bmatrix}.
$$

and the end-effector mass matrix is
$$
\Lambda(\theta)=J^{-T} M J^{-1}.
$$

We are interested in the ellipse $\Lambda(\theta)[\ddot{x}_2\ \ddot{y}_2]^T$ (in the $(f_x,f_y)$ space) when the end-effector acceleration is a unit vector.  
The orientation of this ellipse rotates with $\theta_1$, so we can just consider the case for a particular constant $\theta_1$, i.e., $\theta_1=0$ (the end-effector is at $(x_2,y_2)=(\theta_2,0)$). In this case, a force applied to the end-effector in the $f_x$ direction acts to extend or retract joint 2 while a force in the $f_y$ direction acts to rotate the robot about joint 1.

Evaluating $\Lambda(\theta)$ with $\theta_1=0$, we get the diagonal matrix
$$
\begin{bmatrix}
m_2 & 0\cr
0 & \dfrac{(I_1+I_2+m_1 L_1^{2}+m_2 \theta_2^{2})}{\theta_2^{2}}
\end{bmatrix}
\;=\;
\begin{bmatrix}
m_2 & 0\cr
0 & \dfrac{(k+m_2 \theta_2^{2})}{\theta_2^{2}}
\end{bmatrix},
$$
where $k$ is a positive constant. Since the matrix is diagonal, the principal axes of the ellipse $\Lambda(\theta)[\ddot{x}_2\ \ddot{y}_2]^T$ (where the end-effector acceleration is a unit vector) are aligned with the $f_x$ and $f_y$ axes and the lengths of the principal components are the entries along the diagonal.

The apparent mass at the end-effector in the radial ($x$) direction is $m_2$, i.e., it is independent of $\theta_2$. The apparent mass in the tangential ($y$) direction depends on $\theta_2$, however. As $\theta_2$ approaches zero from above, the bottom-right component of $\Lambda$ approaches infinity. This means large $f_y$ forces are needed to accelerate the tip in the $y$ direction. This is because the torque about joint 1 provided by a force $f_y$ through the end-effector tends to zero as the end-effector approaches joint 1, and therefore $f_y$ must become large to generate the angular acceleration of the inertia about joint 1 needed to generate a modest $\ddot{y}_2$ acceleration. Accordingly, the principal axis of the end-effector mass ellipse in the $f_y$ direction becomes large (Figure 8.8). As $\theta_2$ approaches infinity, the bottom-right element of $\Lambda$ drops to $m_2$, and the end-effector mass matrix ellipse approaches a circle: the end-effector feels like a mass $m_2$ in every direction.

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/Dynamics/8.8.png" width="450" height="auto" alt="Fig 8.8">
  <figcaption>
    <strong>Figure 8.8.</strong>The end-effector mass matrix $\Lambda(\theta)$ represented as the ellipse of forces that must be applied to the end-effector to create a circle of accelerations $(\ddot{x}_2,\ \ddot{y}_2)$. As $\theta_2$ goes to infinity, the magnitude of the force required to generate a unit acceleration $(0,\ \ddot{y}_2)$ approaches $m_2$, i.e., the robot feels like a point mass with mass $m_2$.
  </figcaption>
</figure>

---

**EXERCISE 9:** 

**(a)**
* \$\tau\$: the torque or force at each of the joints represented by the generalized coordinates. Dimensions are \$n \times 1\$ array.
* \$M(\theta)\$: the configuration dependent mass matrix. Dimensions are \$n \times n\$ matrix. \$M\$ must be symmetric and positive definite.
* \$\theta\$: The generalized coordinates for the joints. Dimensions are \$n \times 1\$ array.
* \$\ddot{\theta}\$: The acceleration of the joints represented by the generalized coordinates. Dimensions are \$n \times 1\$ array.
* \$J(\theta)\$: The Jacobian (depends on configuration \$\theta\$). Dimensions are \$n \times n\$ matrix.
* \$\mathbf{F}\_{\text{tip}}\$: The force applied at the tip of the robot. Dimensions are \$n \times 1\$ array.

**(b)**
* **8.1:** The most general representation, and \$h(\theta,\dot{\theta})\$ is an \$n \times 1\$ array that contains the centripetal, coriolis, and gravity terms.
* **8.2:** \$c(\theta,\dot{\theta})\$ is an \$n \times 1\$ array that contains the centripetal and coriolis terms, and \$g(\theta)\$ is an \$n \times 1\$ array that contains the gravity terms.
* **8.3:** \$C(\theta,\dot{\theta})\$ is the \$n \times n\$ Coriolis matrix.
* **8.4:** \$\Gamma(\theta)\$ is the \$n \times n \times n\$ Christoffel matrix. Emphasizes that the Coriolis and centripetal (velocity product) terms are quadratic in the velocity and that \$\Gamma\$ depends only on \$\theta\$.

</details>

</details>

---

### 1.2.3.7: Constrained Dynamics
> - Dealing with closed kinematic chains and contact  
> - Constraint forces and Lagrange multipliers  
> - Applications in legged robots and grasping

![constrained dynamics](https://www.youtube.com/watch?v=E6Yp6DwJh24)  
><sub>Modern Robotics, Chapter 8.7: Constrained Dynamics. YouTube video. Available at: https://www.youtube.com/watch?v=E6Yp6DwJh24</sub>


Real robots often operate under **constraints**:

* **Loop-closure** constraints (parallel robots, humanoid feet on ground, gripped objects)  
* **Non-holonomic** constraints (wheeled vehicles)  
* **Surface-contact** constraints (e.g., an end-effector sliding on a whiteboard)

---

#### Describing the Constraints

* **Configuration constraints**  
  $$ b(\theta(t))=0 $$
* **Velocity (Pfaffian) constraints**  
  $$ \dot{b}=A(\theta)\,\dot{\theta}=0 \quad\text{with }A\in\mathbb{R}^{k\times n} $$
  * $k$ independent constraints on $n$ joints  
* **Work-less assumption**: forces that enforce the constraints do **no mechanical work**.

---
#### Splitting Joint Torques

Joint torques are decomposed into  
$$ \tau = \tau_{\text{motion}} + \tau_{\text{con}} $$
where  
* $\tau_{\text{motion}}$  drives the robot,  
* $\tau_{\text{con}} = A^{T}\lambda$  enforces the constraints (no work).

Here $\lambda\in\mathbb{R}^{k}$ are **Lagrange multipliers**.

---

#### Constrained Equations of Motion  

Unconstrained dynamics:  
$$
M(\theta)\,\ddot{\theta} + h(\theta,\dot{\theta}) = \tau
$$

Add constraints ⇒ solve the coupled system
$$
\tau = M(\theta)\,\ddot{\theta} + h(\theta,\dot{\theta})+ A(\theta)^{\top}\lambda,
$$

$$
A(\theta)\,\dot{\theta} = 0 \quad\rightarrow\quad
A(\theta)\,\ddot{\theta} + \dot A(\theta,\dot{\theta})\,\dot{\theta} = 0
$$

These give $n+k$ equations in $n+k$ unknowns: the $k$ multipliers $lambda$ and either the $n$ joint accelerations $\ddot{\theta}$ (for **constrained forward dynamics**, with $\tau$ given) or the $n$ joint torques $\tau$ (for **constrained inverse dynamics**, with $\ddot{\theta}$ given).

---

#### Projection Matrix  

Define an **$n\times n$ projector**  
$$
P(\theta)=I - A^{T}\bigl(A\,M^{-1}A^{T}\bigr)^{-1}A\,M^{-1}
$$
* rank$(P)=n-k$  
* projects any vector onto the **constraint-free subspace**

---

#### Constrained Inverse Dynamics  

Project the dynamics to eliminate $\lambda$:

$$
P\,\tau = P\,[M(\theta)\,\ddot{\theta} + h(\theta,\dot{\theta})]
$$

*Solving steps:*
1. Insert desired $(\theta,\dot{\theta},\ddot{\theta})$ → compute **motion-producing torque** $P\tau$.  
2. **Any** additional torque of the form $A^{\top}\lambda$ can be added without altering motion (pure constraint force).

---

#### SUMMARY

* Handles closed-loop mechanisms, wheeled bases, surface contacts  
* Forms the basis for **hybrid motion–force control** (Chapter 11)  
* Separates motion control (projected torques) from force control (constraint torques)

Constraint dynamics lets us model and control robots that must simultaneously **move** and **push/pull** against their environment.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What is the purpose of the projection matrix $P(\theta)$ in constrained dynamics?</strong></p>
<form id="q7-1">
  <input type="radio" name="q7-1" value="A"> To invert the Jacobian<br>
  <input type="radio" name="q7-1" value="B"> To project torques onto the motion-producing subspace and remove constraint forces<br>
  <input type="radio" name="q7-1" value="C"> To linearize the mass matrix<br>
  <input type="radio" name="q7-1" value="D"> To compute joint damping<br>
  <button type="button"
    onclick="checkTrueFalse2('q7-1', 'B',
      'Correct!  $P$ eliminates the torque components that enforce constraints, leaving only motion-producing torques.',
      'Not quite. Try again. ">
    Check Answer
  </button>
  <p id="q7-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: Constraint torques are expressed as $\tau_{\text{con}} = A^{\!\top}\lambda$.  What does the vector $\lambda$ represent?</strong></p>
<form id="q7-2">
  <input type="radio" name="q7-2" value="A"> Joint accelerations<br>
  <input type="radio" name="q7-2" value="B"> Motor friction parameters<br>
  <input type="radio" name="q7-2" value="C"> Gravity coefficients<br>
  <input type="radio" name="q7-2" value="D"> Lagrange multipliers enforcing the constraints<br>
  <button type="button"
    onclick="checkTrueFalse2('q7-2', 'D',
      'Correct!  Lagrange multipliers scale each constraint row to produce the necessary constraint forces.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q7-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: The velocity constraint $A(\theta)\dot{\theta}=0$ is called a Pfaffian constraint when it is:</strong></p>
<form id="q7-3">
  <input type="radio" name="q7-3" value="A"> Linear in $\dot{\theta}$<br>
  <input type="radio" name="q7-3" value="B"> Quadratic in $\dot{\theta}$<br>
  <input type="radio" name="q7-3" value="C"> Independent of $\theta$<br>
  <input type="radio" name="q7-3" value="D"> Time-varying only<br>
  <button type="button"
    onclick="checkTrueFalse2('q7-3', 'A',
      'Correct!  A Pfaffian constraint is linear in the generalized velocities ($\\dot\\theta$).',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q7-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: Why do we assume constraint forces are “workless” in this formulation?</strong></p>
<form id="q7-4">
  <input type="radio" name="q7-4" value="A"> To simplify the kinematics<br>
  <input type="radio" name="q7-4" value="B"> Because they do no mechanical work on the robot (torque·velocity = 0)<br>
  <input type="radio" name="q7-4" value="C"> Because gravity cancels them<br>
  <input type="radio" name="q7-4" value="D"> To eliminate friction modeling<br>
  <button type="button"
    onclick="checkTrueFalse2('q7-4', 'B',
      'Correct!  Workless constraint forces act perpendicular to allowable motion so torque·velocity is zero.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q7-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: In constrained inverse dynamics, what additional torque can we add without affecting the robot’s motion?</strong></p>
<form id="q7-5">
  <input type="radio" name="q7-5" value="A"> Any multiple of the identity matrix<br>
  <input type="radio" name="q7-5" value="B"> Any torque of the form $A^{\!\top}\lambda$<br>
  <input type="radio" name="q7-5" value="C"> Any damping torque proportional to velocity<br>
  <input type="radio" name="q7-5" value="D"> We cannot add any extra torque<br>
  <button type="button"
    onclick="checkTrueFalse2('q7-5', 'B',
      'Correct!  Torques along $A^{\\!T}$ enforce constraints but do not change generalized motion.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q7-5-feedback"></p>
</form>

</details>

---

### 1.2.3.8: Actuation, Gearing & Friction
> - Modeling motors and gear ratios  
> - Viscous and Coulomb friction  
> - Backdrivability and actuator limitations

![AGF](https://www.youtube.com/watch?v=w1kYLT3pETc)  
><sub>Modern Robotics, Chapter 8.9: Actuation, Gearing & Friction. YouTube video. Available at: https://www.youtube.com/watch?v=w1kYLT3pETc</sub>

Robot dynamics so far assumed “ideal” joint torques.  
Real joints use **actuators + transmissions** whose own dynamics can dominate the system.

---

#### Direct-Drive vs. Geared Actuation
* **Direct-drive** robots: motor outputs torque directly at the joint without any gearing --> uncommon (motors too fast, too little torque).  
* Practical robots add a **gearhead** or other transmission (belts, chains, etc.) to trade **speed** for **torque**.

---

#### Anatomy of a Typical Geared Motor
* **Rotor** (spins with the motor shaft)  
* **Stator** (motor housing)  
* **Gearhead** with ratio $G>1$  
  * Speed ↓ by factor $G$ , torque ↑ by factor $G$ (less when losses included).  
* **Encoder** measures motor (and thus joint) position.

---

#### Apparent Rotor Inertia
* Rotor spins **$G$ times faster** than the link.  
* Rotor kinetic energy  
  $$
  E_K_{\text{rotor}}=\tfrac12 \, I_{\text{rotor}}\,(G\,\dot{\theta})^{2}
  \;=\;\tfrac12\,(G^{2}I_{\text{rotor}})\,\dot{\theta}^{2}
  $$
* **Apparent inertia** about the joint axis is $G^{2}I_{\text{rotor}}$.  
  * Even a small real inertia becomes significant when $G$ is large (common ratios: 10 – 100+).

---

#### Effect on the Mass Matrix
* Example 2-R arm:  
  * Gear ratio 10 → moderate increase in diagonal entries.  
  * Gear ratio 100 → diagonal terms dominate; off-diagonal coupling & configuration dependence shrink.  
* **High gearing ⇒ robot behaves like $n$ nearly independent joints**.

---

#### Modified Newton–Euler Algorithm
* Treat the **rotor** as part of link $i$ (mass & enhanced inertia) and the stator as part of link $i-1$.  
* Recursive inverse-dynamics still applies, but motor torque must accelerate **both rotor & link**.  
* Controller often commands **motor current ∝ required torque**.

---

#### Joint Friction
* Gearheads introduce significant **friction** (often grows with $G$).  
* Add simple friction models (Coulomb, viscous, etc.) to torque commands for better simulation and control accuracy.

---

#### SUMMARY
* High gear ratios amplify rotor inertia (${\sim}G^{2}$), reshape the mass matrix, reduce dynamic coupling, and demand friction modeling.  
* Accurate actuator/transmission models are essential for realistic simulation and torque-based control.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Why are direct-drive joints (no gearing) uncommon in most industrial robots?</strong></p>
<form id="q8-1">
  <input type="radio" name="q8-1" value="A"> Motors supply too much torque and too little speed<br>
  <input type="radio" name="q8-1" value="B"> Motors supply high speed but insufficient torque for typical tasks<br>
  <input type="radio" name="q8-1" value="C"> Direct-drive requires hydraulic power<br>
  <input type="radio" name="q8-1" value="D"> Direct-drive always induces instability<br>
  <button type="button"
    onclick="checkTrueFalse2('q8-1','B',
      'Correct!  Electric motors typically run fast with low torque, so gearing is added to boost torque.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q8-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: If the gear ratio is $G$, the apparent rotor inertia reflected to the joint scales as ...</strong></p>
<form id="q8-2">
  <input type="radio" name="q8-2" value="A"> $I_{\text{rotor}}/G$<br>
  <input type="radio" name="q8-2" value="B"> $G\,I_{\text{rotor}}$<br>
  <input type="radio" name="q8-2" value="C"> $G^{2}\,I_{\text{rotor}}$<br>
  <input type="radio" name="q8-2" value="D"> independent of&nbsp;$G$<br>
  <button type="button"
    onclick="checkTrueFalse2('q8-2','C',
      'Correct!  Apparent inertia is multiplied by $G^{2}$.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q8-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: As gear ratios become very large, what generally happens to the off-diagonal elements of the mass matrix $M(\theta)$?</strong></p>
<form id="q8-3">
  <input type="radio" name="q8-3" value="A"> They dominate over the diagonal terms<br>
  <input type="radio" name="q8-3" value="B"> They stay the same magnitude<br>
  <input type="radio" name="q8-3" value="C"> They become relatively small compared to the diagonal terms<br>
  <input type="radio" name="q8-3" value="D"> They oscillate between positive and negative<br>
  <button type="button"
    onclick="checkTrueFalse2('q8-3','C',
      'Correct!  Large apparent rotor inertias enlarge the diagonal and reduce coupling.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q8-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: With very high gear ratios, the robot’s joint dynamics increasingly resemble...</strong></p>
<form id="q8-4">
  <input type="radio" name="q8-4" value="A"> $n$ independent single-joint systems<br>
  <input type="radio" name="q8-4" value="B"> a fully coupled multi-body system<br>
  <input type="radio" name="q8-4" value="C"> a mass-spring-damper chain<br>
  <input type="radio" name="q8-4" value="D"> a freely floating rigid body<br>
  <button type="button"
    onclick="checkTrueFalse2('q8-4','A',
      'Correct!  High gearing makes each joint’s inertia dominant, reducing coupling.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q8-4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: When adding friction to the joint-torque model, which statement is generally true?</strong></p>
<form id="q8-5">
  <input type="radio" name="q8-5" value="A"> Friction usually decreases with higher gear ratios<br>
  <input type="radio" name="q8-5" value="B"> Friction is negligible in geared joints and can be ignored<br>
  <input type="radio" name="q8-5" value="C"> Friction often increases with larger gear ratios and must be modeled<br>
  <input type="radio" name="q8-5" value="D"> Friction only affects brushless motors<br>
  <button type="button"
    onclick="checkTrueFalse2('q8-5','C',
      'Correct!  More gears typically mean more friction, so simple friction models are added.',
      'Not quite. Try again.')">
    Check Answer
  </button>
  <p id="q8-5-feedback"></p>
</form>

</details>

---

## 1.2.4 Mathematical Development Questions

For additional practice and deeper derivations, see the **PDF:** [Modern Robotics – Practice Exercises](https://hades.mech.northwestern.edu/images/e/ef/MR_practice_exercises.pdf). The **dynamics problems begin on page 55**, and the **solutions are on page 62**.

Additional exam-level exercises covering other chapters of the book [Modern Robotics]((http://modernrobotics.org)) and their solutions are also available here:

* [SNU 2017 Exams](https://hades.mech.northwestern.edu/images/2/28/SNU-2017-exams.pdf)
* [SNU 2018 Exams](https://hades.mech.northwestern.edu/images/5/56/SNU-2018-exams.pdf)
* [SNU 2019 Exams](https://hades.mech.northwestern.edu/images/0/0d/SNU-2019-exams.pdf)
* [SNU 2020 Exams](https://hades.mech.northwestern.edu/images/2/23/SNU-2020-exams.pdf)

---

## 1.2.5 Credits

This course page was created by **Shujiro Shobayashi, MSc in Robotics at EPFL**, under supervision of [Aude Billard](https://scholar.google.com/citations?user=tM4JMcQAAAAJ&hl=en&oi=ao), and funded by **IEEE RAS** and **EPFL**. We thank [Kevin Lynch](https://robotics.northwestern.edu/people/profiles/faculty/lynch-kevin.html) for agreeing to use material of his course. 

---

## 1.2.6 Additional Resources

### Books
- <a id="ref1"></a> [Modern Robotics:  Mechanics, Planning, and Control](http://modernrobotics.org)," by Kevin Lynch and Frank Park, Cambridge University Press 2017.

- <a id="ref2"></a> [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_3) (Chapter 3. Dynamics)

### Videos

- <a id="ref3"></a> Contents shared by **[Prof. Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html)**, Professor of Mechanical Engineering at [Northwestern University](https://www.northwestern.edu/).

### Exercices 

- <a id="ref4"></a> **Modern Robotics — Practice Exercises (PDF)** (Dec 6, 2018).  
  *Supplemental to* **Modern Robotics: Mechanics, Planning, and Control** (Cambridge University Press, 2017).  
  Contributions: Tito Fernandez, Kevin M. Lynch, Huan Weng, Zack Woodruff.  
  Dynamics exercises start on **p. 55**; solutions on **p. 62**.  
  [https://hades.mech.northwestern.edu/images/e/ef/MR_practice_exercises.pdf](https://hades.mech.northwestern.edu/images/e/ef/MR_practice_exercises.pdf)


[Back to Top](#start)
