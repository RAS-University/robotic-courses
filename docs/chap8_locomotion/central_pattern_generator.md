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

/* Styling for the collapsible quiz / exercise accordions used throughout this page */
.exercise-accordion {
  margin: 1.5rem 0;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  overflow: hidden;
}
.exercise-accordion > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  background-color: #f6f8fa;
  list-style: none;
}
.exercise-accordion > summary::-webkit-details-marker {
  display: none;
}
.exercise-accordion > summary::after {
  content: "▾";
  font-size: 1.2rem;
  transition: transform 0.25s ease;
}
.exercise-accordion[open] > summary::after {
  transform: rotate(180deg);
}
.exercise-accordion-content {
  padding: 1.25rem;
  border-top: 1px solid #d0d7de;
}
</style>
- Table of Contents
{:toc}

## Course overview

*Several figures in this module are adapted from other sources; full credit is given in the [Credits](#credits) section at the end of the page.*

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

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/REvNnUzVDAA"
    title="ANYmal performing parkour"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

ANYmal is a quadruped robot built for legged locomotion research. It walks, climbs, and recovers its balance on rough and uneven terrain, the kind of behavior this course explains.

*Source: "ANYmal can do parkour and walk across rubble," ETH Zürich, based on Rudin et al., "ANYmal Parkour: Learning Agile Navigation for Quadrupedal Robots," Science Robotics, 2023 ([youtube.com/watch?v=REvNnUzVDAA](https://www.youtube.com/watch?v=REvNnUzVDAA)).*

---

## Module 1 : Foundation of legged locomotion

### 1. Introduction :
We will start with a video that raise the foundational questions for our course :

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/RV9P0w8vZi8"
    title="Five gaits of the Icelandic horse"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

This horse produces five different gaits: walk, trot, canter, tölt, and flying pace. Its body stays the same; only the coordination between its legs changes.

*Source: "5 gaits of the Icelandic horse," YouTube, 2017 ([youtube.com/watch?v=RV9P0w8vZi8](https://www.youtube.com/watch?v=RV9P0w8vZi8)).*

Animals run, jump, recover from disturbances, and change gait almost effortlessly. Why is reproducing these abilities in a machine so difficult?
How can the same body, muscles, and joints generate several distinct locomotion patterns?

This Icelandic horse you have seen can walk, trot, canter, tölt, and perform a flying pace. Its mechanical structure does not change between these gaits. What changes is the coordination of its limbs: their timing, phase relationships, contact sequences, and interaction with the ground.

This observation introduces a central idea of legged locomotion:

> **A gait emerges from the interaction between the body, its actuation, and the coordination strategy controlling it.**

Before studying how Central Pattern Generators produce and coordinate rhythmic movements, we must first understand the physical system on which these rhythms act. This lecture therefore examines how legged robots evolved, how their bodies and legs are structured, and how their actuators generate the forces required for locomotion.




In this lecture, we simplify a robotic leg as a planar mechanism composed of two rigid links connected by rotational joints. This model is simple enough to analyse mathematically while still capturing the main motion of the hip, knee, and foot.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: flex-start;
    flex-wrap: wrap;" >

  <div style="width: 40%; min-width: 260px;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot11.png' | relative_url }}"
        alt="Physical quadruped leg showing its articulated mechanical structure"
        style="width: 100%; height: auto;">
      <p><strong>(a) Physical leg structure</strong></p>
  </div>

  <div style="width: 40%; min-width: 260px;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot12.png' | relative_url }}"
        alt="Planar two-link approximation of a quadruped leg"
        style="width: 100%; height: auto;">
      <p><strong>(b) Planar two-link model</strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 1 : Simplification of a robotic leg.</strong>
  </figcaption>

</figure>

What you can see in this figure is the complete leg contains several joints and moves in three-dimensional space. For the first modeling exercises, its sagittal motion is approximated using two rigid links connected by rotational joints. This abstraction preserves the main hip–knee–foot motion while reducing the complexity of
the kinematic and dynamic analysis.

The objective is to understand how joint movements determine the position of the foot. This relationship is the starting point for controlling foot trajectories, applying forces to the ground, and eventually producing locomotion.


### 2. Mechanical Structure of a Robotic Leg

A robotic leg is generally composed of:

- rigid links representing the different leg segments;
- joints allowing relative motion between the links;
- actuators producing joint torques;
- a foot or end effector interacting with the environment.

The number and arrangement of joints determine the leg's **degrees of freedom** and the positions that the foot can reach.

For a typical quadruped, each leg often contains three actuated joints. However, when studying motion in the sagittal plane, the leg can be simplified to two links and two rotational joints.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot2.png' | relative_url }}"
    alt="Quadruped leg and its planar two-link approximation">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 2 : Mechanical structure of a quadruped leg.</strong>
  </figcaption>

</figure>

From this figure, you see the mathematical model to analyze the leg, this simplified model is commonly called a **double pendulum** or a **two-link manipulator**.


### 3. Actuation in legged robots

Actuators generate the torques that move the joints. Legged robots may use electric, hydraulic, pneumatic, or compliant actuators.

For the study of kinematics, the exact actuator technology is not yet essential. Kinematics describes the geometry of motion independently of the forces producing it.

However, actuator properties will later influence:

- how rapidly the joints can move;
- how accurately torque can be controlled;
- how the leg reacts to impacts;
- how safely it interacts with the ground.
<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot4.png' | relative_url }}"
    alt="Comparison of actuator technologies used in legged robots"
    style="width: 45%; max-width: 600px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 3 : Actuation technologies for legged robots.</strong>
    
  </figcaption>

</figure>

Legged robots may use electric, hydraulic, pneumatic, or compliant actuators to generate joint motion and torque. The selected technology influences the available torque, response speed, control accuracy, impact tolerance, and interaction with the environment.

For now, we assume that the two joints can be commanded independently through the joint variables $q_1$ and $q_2$.

### 4. The Planar Two-Link Leg

The model contains:

- two links of lengths $l_1, l_2 \in \mathbb{R}_{>0}$ (meters);
- a fixed hip joint;
- a knee connecting the two links;
- a foot located at the end of the second link;
- two joint angles $q_1, q_2 \in \mathbb{R}$ (radians).

In the convention used here, both joint angles are measured with respect to the downward vertical direction.

The joint configuration is written as:

$$ \mathbf{q} = \begin{bmatrix} q_1 \\ q_2 \end{bmatrix} \in \mathbb{R}^2 $$

The foot position in Cartesian space is written as:

$$ \mathbf{p} = \begin{bmatrix} x \\ y \end{bmatrix} \in \mathbb{R}^2$$

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot3.png' | relative_url }}"
    alt="Planar two-link leg showing the hip, knee, foot, link lengths, joint angles, and Cartesian coordinate frame"
    style="width: 45%; max-width: 600px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 4 : Planar two-link leg model.</strong>
  </figcaption>

</figure>

In this figure, the robotic leg is represented by two rigid links connected through rotational joints. The angles $q_1$ and $q_2$ describe the absolute orientations of the thigh and calf, respectively. The parameters $l_1$ and $l_2$ are the lengths of the two links, while $m_1$ and $m_2$ represent the masses associated with the first and second links. The joint configuration determines the orientation of the links, whereas the Cartesian coordinates describe the position of the foot.

This model creates two different descriptions of the same leg:

- **Joint space:** the leg is described using $q_1$ and $q_2$.
- **Cartesian space:** the leg is described using the foot coordinates $x$ and $y$.

Leg control frequently requires moving between these two representations.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 1 : The Planar Two-Link Leg Model</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Meaning of $q_1$ and $q_2$

What do $q_1$ and $q_2$ represent in this model?

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="a">
  Absolute joint angles, each measured from the downward vertical direction
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="b">
  Relative angles between the two links
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="c">
  The Cartesian coordinates of the foot
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="d">
  The angular velocities of the joints
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'sec4-mcq1',
    'a',
    'Correct! In this convention, both q1 and q2 are absolute angles measured from the downward vertical.',
    'Incorrect. Revisit the angle convention described under Figure 4.'
  )">
  Check answer
</button>

<p id="sec4-mcq1-feedback"></p>

---

##### Question 2: Meaning of $l_1, l_2, m_1, m_2$

What do $l_1, l_2, m_1, m_2$ represent?

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="a">
  $l_1, l_2$ are the link lengths; $m_1, m_2$ are the masses associated with each link
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="b">
  $l_1, l_2$ are joint angles; $m_1, m_2$ are link lengths
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="c">
  $l_1, l_2$ are Cartesian coordinates; $m_1, m_2$ are torques
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="d">
  $l_1, l_2$ are motor torques; $m_1, m_2$ are joint angles
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'sec4-mcq2',
    'a',
    'Correct! l1 and l2 are the link lengths, and m1 and m2 are the associated link masses.',
    'Incorrect. Check the parameter definitions given below Figure 4.'
  )">
  Check answer
</button>

<p id="sec4-mcq2-feedback"></p>

---

##### Question 3: Joint space versus Cartesian space

Which statement correctly distinguishes joint space from Cartesian space?

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="a">
  Joint space describes the leg using $q_1, q_2$; Cartesian space describes the foot using $x, y$
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="b">
  Joint space uses $x, y$; Cartesian space uses $q_1, q_2$
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="c">
  Joint space and Cartesian space are always identical descriptions
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="d">
  Joint space only applies to the foot, and Cartesian space only applies to the hip
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'sec4-mcq3',
    'a',
    'Correct! Joint space uses q1, q2; Cartesian space uses the foot coordinates x, y.',
    'Incorrect. Reread the two bullet points defining joint space and Cartesian space.'
  )">
  Check answer
</button>

<p id="sec4-mcq3-feedback"></p>

---

##### Question 4 (True/False): Is $\mathbf{p}$ a joint-space quantity?

$\mathbf{p} = [x, y]^T$ describes the leg in joint space.

<label style="display: block;">
  <input type="radio" name="sec4-tf1" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="sec4-tf1" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'sec4-tf1',
    'false',
    'Correct! \\(\\mathbf{p}=[x,y]^T\\) is a Cartesian-space quantity, not a joint-space quantity.',
    'Incorrect. \\(\\mathbf{p}\\) describes the position of the foot in Cartesian coordinates.'
  )">
  Check answer
</button>

<p id="sec4-tf1-feedback"></p>

---

##### Question 5 (True/False): Uniqueness of the foot position

The same foot position can correspond to more than one joint configuration.

<label style="display: block;">
  <input type="radio" name="sec4-tf2" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="sec4-tf2" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'sec4-tf2',
    'true',
    'Correct! A two-link leg generally has (up to) two configurations reaching the same foot position &mdash; you will see this explicitly in the Inverse Kinematics quiz below.',
    'Incorrect. Think about a leg that can bend its knee either one way or the other while still reaching the same point.'
  )">
  Check answer
</button>

<p id="sec4-tf2-feedback"></p>

</div>
</details>

### 5. Leg kinematics

Before starting this section, students should be familiar with:

- [Forward and Inverse Kinematics]({{ 'docs/chap1_basic_motion_ctrl/kinematics/' | relative_url }})

You can check 1.1.3.3 and 1.1.3.6.

The following section will present exercises to revisit these concepts in the specific context of legged-robot modeling and locomotion.

The planar leg is modeled as a two-link serial mechanism, similar to a planar two-link robotic arm.

Its joint configuration is
$
\mathbf{q} =
\begin{bmatrix} q_1 \\ q_2 \end{bmatrix}
\in \mathbb{R}^2
$
and the Cartesian position of the foot is
$
\mathbf{p} =
\begin{bmatrix} x \\ y
\end{bmatrix}
\in \mathbb{R}^2.
$

#### 5.1 Forward Kinematics

Consider figure 4 for a planar two-link leg with link lengths

$$
l_1=l_2=0.50\text{ m}.
$$

The joint angles are

$$
q_1=30^\circ,
\qquad
q_2=-30^\circ.
$$

Both $q_1$ and $q_2$ are **absolute link orientations** measured relative to the downward vertical direction.

The joint angular velocities are

$$
\dot{q}_1=1.0\text{ rad/s},
\qquad
\dot{q}_2=-0.5\text{ rad/s}.
$$

---
<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 2 : Forward Kinematics of a Planar Leg</span>
</summary>

<div class="exercise-accordion-content" markdown="1">


##### Question 1: Knee position equations

Which equations correctly describe the Cartesian position of the knee?

<label style="display: block;">
  <input type="radio" name="fk-q1" value="a">
  $x_1=l_1\cos(q_1)$ and $y_1=l_1\sin(q_1)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q1" value="b">
  $x_1=l_1\sin(q_1)$ and $y_1=-l_1\cos(q_1)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q1" value="c">
  $x_1=-l_1\sin(q_1)$ and $y_1=l_1\cos(q_1)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q1" value="d">
  $x_1=l_1\cos(q_1)$ and $y_1=-l_1\sin(q_1)$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q1',
    'b',
    'Correct! The angle is measured from the downward vertical direction.',
    'Incorrect. Consider the angle convention and the direction of the vertical axis.'
  )">
  Check answer
</button>

<p id="fk-q1-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

When $q_1=0$, the first link points vertically downward. Therefore,

$$
x_1=0,
\qquad
y_1=-l_1.
$$

  </div>
</details>

---

##### Question 2: Numerical knee position

Using

$$
x_1=l_1\sin(q_1),
\qquad
y_1=-l_1\cos(q_1),
$$

what is the knee position?

<label style="display: block;">
  <input type="radio" name="fk-q2" value="a">
  $x_1=0.25\text{ m}$ and $y_1\approx-0.433\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q2" value="b">
  $x_1\approx0.433\text{ m}$ and $y_1=-0.25\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q2" value="c">
  $x_1=-0.25\text{ m}$ and $y_1\approx0.433\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q2" value="d">
  $x_1=0.50\text{ m}$ and $y_1=0\text{ m}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q2',
    'a',
    'Correct! The knee is 0.25 m forward and approximately 0.433 m below the hip.',
    'Incorrect. Substitute l1 = 0.50 m and q1 = 30 degrees into the knee-position equations.'
  )">
  Check answer
</button>

<p id="fk-q2-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Use

$$
\sin(30^\circ)=0.5
$$

and

$$
\cos(30^\circ)\approx0.866.
$$

  </div>
</details>

---

##### Question 3: Foot position equations

Which equations correctly describe the Cartesian position of the foot?

<label style="display: block;">
  <input type="radio" name="fk-q3" value="a">
  $x_2=l_1\sin(q_1)+l_2\sin(q_2)$ and
  $y_2=-l_1\cos(q_1)-l_2\cos(q_2)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q3" value="b">
  $x_2=l_1\sin(q_1)-l_2\sin(q_2)$ and
  $y_2=-l_1\cos(q_1)+l_2\cos(q_2)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q3" value="c">
  $x_2=l_1\cos(q_1)+l_2\cos(q_2)$ and
  $y_2=l_1\sin(q_1)+l_2\sin(q_2)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q3" value="d">
  $x_2=l_2\sin(q_2)$ and
  $y_2=-l_2\cos(q_2)$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q3',
    'a',
    'Correct! The foot position is the sum of the Cartesian contributions of both links.',
    'Incorrect. Begin at the hip and add the displacement produced by each link.'
  )">
  Check answer
</button>

<p id="fk-q3-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

The foot position is obtained by adding the hip-to-knee vector and the knee-to-foot vector.

Because $q_2$ is an absolute angle, the second-link contribution directly uses $\sin(q_2)$ and $\cos(q_2)$.

  </div>
</details>

---

##### Question 4: Numerical foot position

Using

$$
x_2=l_1\sin(q_1)+l_2\sin(q_2),
$$

$$
y_2=-l_1\cos(q_1)-l_2\cos(q_2),
$$

what is the foot position?

<label style="display: block;">
  <input type="radio" name="fk-q4" value="a">
  $x_2=0\text{ m}$ and $y_2\approx-0.866\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q4" value="b">
  $x_2=0.50\text{ m}$ and $y_2=0\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q4" value="c">
  $x_2=0\text{ m}$ and $y_2\approx-0.433\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q4" value="d">
  $x_2\approx0.866\text{ m}$ and $y_2=0\text{ m}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q4',
    'a',
    'Correct! The horizontal link contributions cancel, while the vertical contributions add.',
    'Incorrect. Remember that sin(-30 degrees) is negative and cos(-30 degrees) is positive.'
  )">
  Check answer
</button>

<p id="fk-q4-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

For the horizontal coordinate,

$$
x_2
=
0.50\sin(30^\circ)
+
0.50\sin(-30^\circ).
$$

For the vertical coordinate,

$$
y_2
=
-0.50\cos(30^\circ)
-
0.50\cos(-30^\circ).
$$

  </div>
</details>



---

##### Question 5: Knee velocity

Differentiating the knee-position equations gives

$$
\dot{x}_1=l_1\cos(q_1)\dot{q}_1,
$$

$$
\dot{y}_1=l_1\sin(q_1)\dot{q}_1.
$$

What is the velocity of the knee?

<label style="display: block;">
  <input type="radio" name="fk-q5" value="a">
  $\dot{x}_1\approx0.433\text{ m/s}$ and
  $\dot{y}_1=0.25\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q5" value="b">
  $\dot{x}_1=0.25\text{ m/s}$ and
  $\dot{y}_1\approx-0.433\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q5" value="c">
  $\dot{x}_1\approx-0.433\text{ m/s}$ and
  $\dot{y}_1=-0.25\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q5" value="d">
  $\dot{x}_1=0\text{ m/s}$ and
  $\dot{y}_1=0\text{ m/s}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q5',
    'a',
    'Correct! Differentiating the knee position gives approximately 0.433 m/s horizontally and 0.25 m/s vertically.',
    'Incorrect. Apply the chain rule and use dq1 = 1 rad/s.'
  )">
  Check answer
</button>

<p id="fk-q5-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Substitute

$$
l_1=0.50,
\qquad
q_1=30^\circ,
\qquad
\dot{q}_1=1.0.
$$

  </div>
</details>

---

##### Question 6: Foot velocity

The foot velocity is

$$
\dot{x}_2
=
l_1\cos(q_1)\dot{q}_1
+
l_2\cos(q_2)\dot{q}_2,
$$

$$
\dot{y}_2
=
l_1\sin(q_1)\dot{q}_1
+
l_2\sin(q_2)\dot{q}_2.
$$

What is the numerical foot velocity?

<label style="display: block;">
  <input type="radio" name="fk-q6" value="a">
  $\dot{x}_2\approx0.217\text{ m/s}$ and
  $\dot{y}_2=0.375\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q6" value="b">
  $\dot{x}_2\approx0.650\text{ m/s}$ and
  $\dot{y}_2=0.125\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q6" value="c">
  $\dot{x}_2=0\text{ m/s}$ and
  $\dot{y}_2\approx-0.866\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q6" value="d">
  $\dot{x}_2\approx-0.217\text{ m/s}$ and
  $\dot{y}_2=-0.375\text{ m/s}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q6',
    'a',
    'Correct! The two link contributions give a foot velocity of approximately 0.217 m/s horizontally and 0.375 m/s vertically.',
    'Incorrect. Differentiate each link contribution and multiply it by its corresponding angular velocity.'
  )">
  Check answer
</button>

<p id="fk-q6-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

For the horizontal velocity,

$$
\dot{x}_2
=
0.50\cos(30^\circ)(1.0)
+
0.50\cos(-30^\circ)(-0.5).
$$

For the vertical velocity,

$$
\dot{y}_2
=
0.50\sin(30^\circ)(1.0)
+
0.50\sin(-30^\circ)(-0.5).
$$

  </div>
</details>

</div>     
</details>


---

#### 5.2 Inverse Kinematics

A planar two-link leg must place its foot at the desired Cartesian position

$$
\mathbf{p}_d=
\begin{bmatrix} x_d \\ y_d \end{bmatrix} = \begin{bmatrix}
0.30 \\ -0.40 \end{bmatrix}
\text{ m}.
$$

The link lengths are

$$
l_1=l_2=0.50\text{ m}.
$$

The angle $\theta_1$ describes the orientation of the first link relative to the downward vertical direction. The angle $\theta_2$ is the relative angle between the first and second links.

The corresponding absolute-angle convention is

$$
q_1=\theta_1,
\qquad
q_2=\theta_1+\theta_2.
$$

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot5.png' | relative_url }}"
    alt="Two configurations of a planar two-link leg reaching the same desired foot position"
    style="width: 65%; max-width: 750px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 5: Multiple inverse-kinematics solutions.</strong>
    
  </figcaption>

</figure>


<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 3 : Inverse Kinematics of a Planar Leg</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Reachability

The distance between the hip and the desired foot position is

$$
r=\sqrt{x_d^2+y_d^2}.
$$

What is the value of $r$?

<label style="display: block;">
  <input type="radio" name="ik-q1" value="a">
  $r=0.25\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q1" value="b">
  $r=0.50\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q1" value="c">
  $r=0.70\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q1" value="d">
  $r=1.00\text{ m}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q1',
    'b',
    'Correct! The desired foot position is 0.50 m from the hip.',
    'Incorrect. Compute the Euclidean distance between the hip and the desired foot position.'
  )">
  Check answer
</button>

<p id="ik-q1-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Substitute the desired coordinates into

$$
r=\sqrt{x_d^2+y_d^2}.
$$

  </div>
</details>

---

##### Question 2: Workspace condition

A target is reachable when

$$
|l_1-l_2|\leq r\leq l_1+l_2.
$$

Is the desired foot position reachable?

<label style="display: block;">
  <input type="radio" name="ik-q2" value="a">
  Yes, because $0\leq 0.50\leq 1.00$.
</label>

<label style="display: block;">
  <input type="radio" name="ik-q2" value="b">
  No, because $r<l_1$.
</label>

<label style="display: block;">
  <input type="radio" name="ik-q2" value="c">
  No, because $r<l_1+l_2$.
</label>

<label style="display: block;">
  <input type="radio" name="ik-q2" value="d">
  Yes, because every Cartesian position is reachable.
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q2',
    'a',
    'Correct! The desired point lies inside the reachable workspace of the leg.',
    'Incorrect. Compare the hip-to-foot distance with the minimum and maximum leg extension.'
  )">
  Check answer
</button>

<p id="ik-q2-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

For this leg,

$$
|l_1-l_2|=0
$$

and

$$
l_1+l_2=1.00\text{ m}.
$$

  </div>
</details>

---

##### Question 3: Relative knee angle

The cosine rule gives

$$
\cos(\theta_2)
=
\frac{x_d^2+y_d^2-l_1^2-l_2^2}
{2l_1l_2}.
$$

What is the value of $\cos(\theta_2)$?

<label style="display: block;">
  <input type="radio" name="ik-q3" value="a">
  $\cos(\theta_2)=1$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q3" value="b">
  $\cos(\theta_2)=0.5$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q3" value="c">
  $\cos(\theta_2)=0$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q3" value="d">
  $\cos(\theta_2)=-0.5$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q3',
    'd',
    'Correct! Substitution into the cosine-rule expression gives -0.5.',
    'Incorrect. Substitute the desired position and both link lengths into the equation.'
  )">
  Check answer
</button>

<p id="ik-q3-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

First compute

$$
x_d^2+y_d^2
=
0.30^2+(-0.40)^2
=
0.25.
$$

Then substitute $l_1=l_2=0.50\text{ m}$.

  </div>
</details>

---

##### Question 4: Two knee configurations

Since

$$
\cos(\theta_2)=-0.5,
$$

which values of $\theta_2$ are possible?

<label style="display: block;">
  <input type="radio" name="ik-q4" value="a">
  $\theta_2=\pm30^\circ$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q4" value="b">
  $\theta_2=\pm60^\circ$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q4" value="c">
  $\theta_2=\pm90^\circ$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q4" value="d">
  $\theta_2=\pm120^\circ$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q4',
    'd',
    'Correct! The positive and negative solutions correspond to two different knee configurations.',
    'Incorrect. Evaluate the inverse cosine of -0.5.'
  )">
  Check answer
</button>

<p id="ik-q4-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Use

$$
\theta_2
=
\pm\cos^{-1}(-0.5).
$$

  </div>
</details>

</div>

</details>

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

Kinematics describes how the joint angles determine the position and velocity of the leg. **Dynamics** describes how forces and joint torques produce motion.

For the two-link leg, the joint variables are:

$$ \mathbf{q} = \begin{bmatrix} q_1 \\ q_2 \end{bmatrix} \in \mathbb{R}^2,
\qquad
\dot{\mathbf{q}} = \begin{bmatrix} \dot{q}_1 \\ \dot{q}_2 \end{bmatrix} \in \mathbb{R}^2,
\qquad
\ddot{\mathbf{q}} = \begin{bmatrix} \ddot{q}_1 \\ \ddot{q}_2 \end{bmatrix} \in \mathbb{R}^2 $$

The actuator torques are:

$$
\boldsymbol{\tau}
=
\begin{bmatrix}
\tau_1 \\
\tau_2
\end{bmatrix}
\in \mathbb{R}^2
$$

<!-- IMAGE SLOT:
Insert the two-link leg model showing:
- q1 and q2
- l1 and l2
- m1 and m2
- gravity g
- torques tau1 and tau2
-->

> **Angle convention:** in this practical, $q_1$ and $q_2$ are both measured with respect to the downward vertical direction. Therefore, \(q_2\) is an absolute link orientation rather than a relative knee angle.

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

- $\mathbf{B}(\mathbf{q}) \in \mathbb{R}^{2\times2}$ is the inertia matrix (symmetric, positive definite);
- $\mathbf{C}(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}^{2}$ is a vector containing the velocity-dependent (Coriolis/centrifugal) torques — note it is written here directly as a vector, not as a matrix multiplying $\dot{\mathbf{q}}$;
- $\mathbf{g}(\mathbf{q}) \in \mathbb{R}^{2}$ is the vector of gravitational torques;
- $\boldsymbol{\tau} \in \mathbb{R}^{2}$ is the vector of actuator torques.

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

where $\mathbf{F}(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}^{2}$ is the vector of friction torques.

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

- $T(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}$ is the total kinetic energy (a scalar, in joules);
- $V(\mathbf{q}) \in \mathbb{R}$ is the total potential energy (a scalar, in joules);
- $L(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}$ is therefore also a scalar.

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

The inertia matrix is therefore obtained by identifying the coefficients of the quadratic velocity terms, for $i,j \in \{1,2\}$:

$$
B_{ij}
=
\frac{\partial^2 T}
{\partial \dot{q}_i\,\partial \dot{q}_j}
\in \mathbb{R}
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

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Programming Exercise 1 : Modeling and Simulating a Two-Link Leg</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

This practical consolidates the concepts introduced in this section:

- forward kinematics;
- kinetic and potential energy;
- Lagrangian dynamics;
- inertia, velocity-dependent, and gravity terms;
- passive numerical simulation.

##### Download the exercise files

Download the complete exercise package, extract the ZIP file, and keep all files in the extracted folder.

<a
  href="{{ '/assets/files/locomotion/locomotion_practical1.zip' | relative_url }}"
  download
  style="
    display: inline-block;
    padding: 10px 16px;
    background-color: #0075db;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  ">
  Download Practical 1
</a>

##### What's in the package

```text
Exercise_1/
├── locomotion_practical1.ipynb            # the exercise notebook — fill in the TODOs
├── locomotion_practical1_solution.ipynb   # reference solution
├── assertion_check.py                     # validation logic used by the notebook
├── requirements_Ex1.txt                   # Python dependencies
└── README.md                              # environment setup & step-by-step instructions
```

The notebook walks through forward kinematics, energies, and the Lagrangian derivation from this section, one `TODO` cell at a time, each checked automatically against `assertion_check.py`.

**Full environment setup and instructions are in `README.md`** inside the downloaded package.

</div>
</details>

---

### 7. From Leg Modeling to Control

The kinematic and dynamic models allow us to compute the torques required to control the leg. The controller may operate either in:

- **joint space**, using joint angles and velocities;
- **Cartesian space**, using the position, velocity, and force of the foot.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot10.png' | relative_url }}"
    alt="Planar two-link leg illustrating forward kinematics, inverse kinematics, differential kinematics, and force-to-torque mapping"
    style="width: 60%; max-width: 800px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 6 : Main kinematic relationships for a planar leg.</strong>
  </figcaption>

</figure>

The joint configuration $\mathbf{q}$ determines the foot position $\mathbf{p}$ through forward kinematics, while inverse kinematics computes the joint configuration required to reach a desired foot position. The Jacobian $\mathbf{J}(\mathbf{q})$ relates joint velocities $\dot{\mathbf{q}}$ to the Cartesian foot velocity $\dot{\mathbf{p}}$, and its transpose maps a desired Cartesian foot force $\mathbf{F}$ to joint torques $\boldsymbol{\tau}$.

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

The matrix relating joint velocity to foot velocity is the **Jacobian**, $\mathbf{J}(\mathbf{q}) \in \mathbb{R}^{2\times2}$:

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

where $\mathbf{v} \in \mathbb{R}^2$ is the foot velocity:

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

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 4 : The Jacobian</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Dimension of $\mathbf{J}(\mathbf{q})$

For this planar two-link leg, what is the size of $\mathbf{J}(\mathbf{q})$?

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="a">
  $1\times2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="b">
  $2\times1$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="c">
  $2\times2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="d">
  $3\times3$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'jac-mcq1',
    'c',
    'Correct! J maps 2 joint velocities to a 2D Cartesian foot velocity, so it is 2x2.',
    'Incorrect. Count the rows (Cartesian dimensions of p) and columns (number of joints).'
  )">
  Check answer
</button>

<p id="jac-mcq1-feedback"></p>

---

##### Question 2: Physical meaning of a singular Jacobian

What does a singular (non-invertible) Jacobian mean physically for this leg?

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="a">
  The leg is at rest
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="b">
  The leg is fully extended or fully folded, and loses the ability to move the foot in some direction
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="c">
  The foot has exactly reached the desired position
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="d">
  The joint torques are all zero
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'jac-mcq2',
    'b',
    'Correct! Near full extension or full retraction, the two link vectors become (anti)parallel and the leg loses a direction of foot motion.',
    'Incorrect. Think about the geometric configurations where the two links become aligned.'
  )">
  Check answer
</button>

<p id="jac-mcq2-feedback"></p>

---

##### Question 3: Configuration dependence

Does $\mathbf{J}(\mathbf{q})$ depend on the current joint configuration?

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="a">
  No, it is constant
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="b">
  Yes, its entries depend on $q_1$ and $q_2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="c">
  It depends only on $l_1$ and $l_2$, never on $q_1, q_2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="d">
  It is only relevant for torque, not velocity
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'jac-mcq3',
    'b',
    'Correct! J(q) must be re-evaluated at the current configuration, as shown by the cos(q1), cos(q2), sin(q1), sin(q2) entries.',
    'Incorrect. Look at the entries of J(q) derived above &mdash; they contain q1 and q2.'
  )">
  Check answer
</button>

<p id="jac-mcq3-feedback"></p>

---

##### Question 4 (True/False): Constant Jacobian

The Jacobian is the same at every configuration of the leg.

<label style="display: block;">
  <input type="radio" name="jac-tf1" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="jac-tf1" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'jac-tf1',
    'false',
    'Correct! \\(\\mathbf{J}(\\mathbf{q})\\) changes as \\(q_1\\) and \\(q_2\\) change, which is why it must be recomputed at every step of the iterative IK algorithm.',
    'Incorrect. Re-examine the entries of J(q): they explicitly depend on q1 and q2.'
  )">
  Check answer
</button>

<p id="jac-tf1-feedback"></p>

---

##### Question 5 (True/False): Invertibility

$\mathbf{J}^{-1}$ always exists for any configuration $\mathbf{q}$.

<label style="display: block;">
  <input type="radio" name="jac-tf2" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="jac-tf2" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'jac-tf2',
    'false',
    'Correct! Near singular configurations J becomes non-invertible, which is exactly why a damped pseudo-inverse is introduced later in the Iterative Inverse Kinematics subsection.',
    'Incorrect. Consider what happens to J at full leg extension.'
  )">
  Check answer
</button>

<p id="jac-tf2-feedback"></p>

</div>
</details>

#### 7.2 Cartesian PD Control

A Cartesian controller directly controls the position of the foot rather than the individual joint angles.

Let $ \mathbf{p}_d \in \mathbb{R}^2$ be the desired foot position and $ \mathbf{v}_d \in \mathbb{R}^2$ the desired foot velocity.

The position and velocity errors, $\mathbf{e}_p, \mathbf{e}_v \in \mathbb{R}^2$, are:

$$
\mathbf{e}_p = \mathbf{p}_d-\mathbf{p}
$$

$$
\mathbf{e}_v = \mathbf{v}_d-\mathbf{v}
$$

A Cartesian PD controller computes a corrective Cartesian force $\mathbf{F}_{PD} \in \mathbb{R}^2$:

<div class="math-display">
\[
\mathbf{F}_{PD} = \mathbf{K}_{p}(\mathbf{p}_{d}-\mathbf{p}) + \mathbf{K}_{d}(\mathbf{v}_{d}-\mathbf{v})
\]
</div>

where:

- $\mathbf{K}_{p,C} \in \mathbb{R}^{2\times2}$ is the Cartesian proportional gain (typically diagonal);
- $\mathbf{K}_{d,C} \in \mathbb{R}^{2\times2}$ is the Cartesian derivative gain (typically diagonal).

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

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 5 : Cartesian PD Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Role of $\mathbf{K}_{p,C}$ versus $\mathbf{K}_{d,C}$

What is the role of $\mathbf{K}_{p,C}$ versus $\mathbf{K}_{d,C}$?

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="a">
  $\mathbf{K}_{p,C}$ acts on the position error; $\mathbf{K}_{d,C}$ acts on the velocity error
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="b">
  $\mathbf{K}_{p,C}$ acts on the velocity error; $\mathbf{K}_{d,C}$ acts on the position error
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="c">
  Both gains act only on the velocity error
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="d">
  Both gains are always identical matrices
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'cpd-mcq1',
    'a',
    'Correct! Kp,C multiplies the position error (pd - p), and Kd,C multiplies the velocity error (vd - v).',
    'Incorrect. Look again at the definition of F_PD.'
  )">
  Check answer
</button>

<p id="cpd-mcq1-feedback"></p>

---

##### Question 2: Why $\mathbf{J}^T$ is needed

Why is $\mathbf{J}^T(\mathbf{q})$ needed in the Cartesian PD controller?

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="a">
  To convert the corrective Cartesian force into joint torques
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="b">
  To convert joint angles into a Cartesian position
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="c">
  To compute the inertia matrix
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="d">
  To linearize the leg dynamics
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'cpd-mcq2',
    'a',
    'Correct! J^T maps the Cartesian force F_PD computed in task space into the joint torques that actually drive the leg.',
    'Incorrect. F_PD is a Cartesian force &mdash; the leg needs joint torques.'
  )">
  Check answer
</button>

<p id="cpd-mcq2-feedback"></p>

---

##### Question 3: Effect of removing damping

What happens if $\mathbf{K}_{d,C}=0$?

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="a">
  The system becomes critically damped
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="b">
  There is no velocity feedback, so the foot may oscillate or overshoot
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="c">
  The controller becomes a pure feedforward controller with no feedback at all
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="d">
  Nothing changes, since $\mathbf{K}_{d,C}$ only affects gravity compensation
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'cpd-mcq3',
    'b',
    'Correct! Without the damping term, only the position error is corrected, which typically leads to oscillation or overshoot.',
    'Incorrect. Removing Kd,C removes the velocity-error feedback term, not the position feedback.'
  )">
  Check answer
</button>

<p id="cpd-mcq3-feedback"></p>

---

##### Question 4 (Select all that apply): Increasing $\mathbf{K}_{p,C}$

Increasing $\mathbf{K}_{p,C}$ tends to:

<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="a"> Produce faster convergence toward $\mathbf{p}_d$</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="b"> Reduce the required joint torque</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="c"> Increase the risk of overshoot</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="d"> Have no effect on the closed-loop behaviour</label>

<br>

<button
  type="button"
  onclick="checkMultipleAnswers(
    'cpd-multi1',
    ['a','c'],
    'Correct! A higher proportional gain speeds up convergence but, without enough damping, also raises the risk of overshoot.',
    'Not quite. A higher Kp,C pulls the foot toward pd faster, at the cost of higher torque demand and possible overshoot.'
  )">
  Check answer
</button>

<p id="cpd-multi1-feedback"></p>

---

##### Question 5 (Select all that apply): Increasing $\mathbf{K}_{d,C}$

Increasing $\mathbf{K}_{d,C}$ tends to:

<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="a"> Reduce overshoot and oscillation</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="b"> Eliminate steady-state position error on its own</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="c"> Increase sensitivity to noise in the velocity estimate</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="d"> Guarantee stability regardless of $\mathbf{K}_{p,C}$</label>

<br>

<button
  type="button"
  onclick="checkMultipleAnswers(
    'cpd-multi2',
    ['a','c'],
    'Correct! Damping reduces oscillation but amplifies any noise present in the velocity signal; it does not by itself remove steady-state error or guarantee stability.',
    'Not quite. Kd,C damps velocity error, which reduces oscillation but also amplifies velocity-measurement noise.'
  )">
  Check answer
</button>

<p id="cpd-multi2-feedback"></p>

</div>
</details>

---

#### 7.3 Force Control

The Jacobian transpose also maps a desired foot force $\mathbf{F} \in \mathbb{R}^2$ into the corresponding joint torques:

$$
\boldsymbol{\tau}
=
\mathbf{J}^{T}(\mathbf{q})\mathbf{F}
$$

This relationship follows from the **principle of virtual work**.

For a small virtual joint displacement $\delta\mathbf{q} \in \mathbb{R}^2$:

$$
\delta\mathbf{q}
$$

the corresponding virtual foot displacement $\delta\mathbf{p} \in \mathbb{R}^2$ is:

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

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 6 : Force Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Principle behind $\boldsymbol{\tau}=\mathbf{J}^{T}\mathbf{F}$

Which principle is used to derive $\boldsymbol{\tau}=\mathbf{J}^{T}(\mathbf{q})\mathbf{F}$?

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="a">
  Newton's second law
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="b">
  The principle of virtual work
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="c">
  Conservation of energy
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="d">
  Lagrange multipliers on the ground-contact constraint
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'force-mcq1',
    'b',
    'Correct! Equating the virtual work done by F and by tau gives tau = J^T(q)F.',
    'Incorrect. Reread the derivation starting from a virtual joint displacement delta-q.'
  )">
  Check answer
</button>

<p id="force-mcq1-feedback"></p>

---

##### Question 2: Why no inverse kinematics is needed

Why does force control not require solving inverse kinematics first?

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="a">
  Because gravity is neglected
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="b">
  Because it maps a desired Cartesian force directly into joint torques, without needing $\mathbf{q}_d=f^{-1}(\mathbf{p}_d)$
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="c">
  Because friction is neglected
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="d">
  Because the Jacobian is always the identity matrix
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'force-mcq2',
    'b',
    'Correct! Force control skips the desired-joint-angle step entirely and goes straight from a desired force to torques.',
    'Incorrect. Compare this control sequence with the p_d -> q_d -> tau_joint sequence used for inverse kinematics.'
  )">
  Check answer
</button>

<p id="force-mcq2-feedback"></p>

---

##### Question 3: Composition of $\boldsymbol{\tau}_{final}$

What does $\boldsymbol{\tau}_{final}$ combine?

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="a">
  Only gravity compensation
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="b">
  $\boldsymbol{\tau}_{joint} + \boldsymbol{\tau}_{Cartesian} + \mathbf{J}^{T}(\mathbf{q})\mathbf{F}_{extra}$
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="c">
  Only the output of inverse kinematics
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="d">
  Only the Cartesian force term
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'force-mcq3',
    'b',
    'Correct! The three contributions -- joint-space, Cartesian, and an extra force term -- can be summed into a single commanded torque.',
    'Incorrect. Look again at the boxed equation for tau_final just above.'
  )">
  Check answer
</button>

<p id="force-mcq3-feedback"></p>

---

##### Question 4 (True/False): Exact positioning

Force control directly guarantees an exact foot position.

<label style="display: block;">
  <input type="radio" name="force-tf1" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="force-tf1" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'force-tf1',
    'false',
    'Correct! Force control commands a contact force, not a position &mdash; this is exactly the limitation listed in the comparison table below.',
    'Incorrect. Recall the comparison table&#39;s stated limitation for force control.'
  )">
  Check answer
</button>

<p id="force-tf1-feedback"></p>

---

##### Question 5 (True/False): Direction of the mapping

$\mathbf{J}^T$ maps a Cartesian force to joint torques, not the reverse.

<label style="display: block;">
  <input type="radio" name="force-tf2" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="force-tf2" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'force-tf2',
    'true',
    'Correct! \\(\\boldsymbol{\\tau}=\\mathbf{J}^{T}(\\mathbf{q})\\mathbf{F}\\) takes a Cartesian force F as input and produces joint torques tau as output.',
    'Incorrect. Look at which quantity is on the left-hand side of tau = J^T(q)F.'
  )">
  Check answer
</button>

<p id="force-tf2-feedback"></p>

</div>
</details>

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

A joint-space PD controller, with gains $\mathbf{K}_{p,j}, \mathbf{K}_{d,j} \in \mathbb{R}^{2\times2}$ (typically diagonal), then tracks this configuration $\mathbf{q}_d \in \mathbb{R}^2$:

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

Using the coordinate convention $(x,z)$ and relative joint angles $\theta_1, \theta_2 \in \mathbb{R}$:
<div style="display: flex; justify-content: center; gap: 20px; align-items: center;">

<img 
  src="{{ '/assets/images/locomotion/Image_slot7.png' | relative_url }}"
  alt="Quadruped leg"
  style="width: 40%; height: auto;">

<img 
  src="{{ '/assets/images/locomotion/Image_slot8.png' | relative_url }}"
  alt="Quadruped leg"
  style="width: 40%; height: auto;">
</div>
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

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot9.png' | relative_url }}"
    alt="Iterative inverse-kinematics algorithm using the Jacobian pseudoinverse to update joint angles until the desired foot position is reached">

  <figcaption style="max-width: 950px; margin: 0.5rem auto;">
    <strong>Figure 7 : Iterative inverse kinematics using the Jacobian pseudoinverse.</strong>
  </figcaption>

</figure>


For more complex robots, inverse kinematics can be solved numerically. We will go through the algorithm presented in Figure 7 in more details below :

Starting from an initial configuration $\mathbf{q}_0 \in \mathbb{R}^2$, compute the Cartesian error $\Delta\mathbf{p} \in \mathbb{R}^2$:

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

- $\mathbf{J}^{+} \in \mathbb{R}^{2\times2}$ is the Moore–Penrose pseudo-inverse;
- $\alpha \in \mathbb{R}_{>0}$ is the (scalar) update step size — not to be confused with the geometric angle $\alpha$ shown in the analytical-IK figure above.

The procedure is repeated until:

$$
\left\|
\mathbf{p}_d-\mathbf{p}
\right\|
<
\varepsilon
$$

where $\varepsilon \in \mathbb{R}_{>0}$ is a small scalar tolerance.

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

A larger scalar damping factor $\lambda \in \mathbb{R}_{\geq0}$ improves stability but makes the result less similar to the exact pseudo-inverse.

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

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 7 : Comparing Inverse Kinematics, Cartesian PD, and Force Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Which method needs an explicit inverse solution?

Which method requires an explicit inverse solution and a choice between possible joint configurations?

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="a">
  Inverse kinematics with joint PD
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="b">
  Cartesian PD control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="c">
  Force control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="d">
  None of these methods requires an inverse solution
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'comp-mcq1',
    'a',
    'Correct! Inverse kinematics must solve q_d = f^-1(p_d), which for a two-link leg has (up to) two valid solutions.',
    'Incorrect. Check the &quot;Main limitation&quot; column of the comparison table.'
  )">
  Check answer
</button>

<p id="comp-mcq1-feedback"></p>

---

##### Question 2: Which method suits ground contact?

Which method is best suited to ground contact and physical interaction?

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="a">
  Inverse kinematics with joint PD
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="b">
  Cartesian PD control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="c">
  Force control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="d">
  All three methods are equally suited to ground contact
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'comp-mcq2',
    'c',
    'Correct! Force control commands the contact force directly, which is exactly what is needed when interacting physically with the ground.',
    'Incorrect. Check the &quot;Main advantage&quot; column of the comparison table.'
  )">
  Check answer
</button>

<p id="comp-mcq2-feedback"></p>

---

##### Question 3: Main limitation of Cartesian PD

What is the main limitation of Cartesian PD control, according to the comparison table?

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="a">
  It cannot be used near the ground
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="b">
  Its performance depends on the Cartesian gains and the Jacobian
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="c">
  It requires choosing between multiple knee configurations
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="d">
  It cannot control the position of the foot at all
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'comp-mcq3',
    'b',
    'Correct! Because the Cartesian force is converted through J^T(q), the quality of tracking depends on both the chosen gains and the current Jacobian.',
    'Incorrect. Check the &quot;Main limitation&quot; column for Cartesian PD control.'
  )">
  Check answer
</button>

<p id="comp-mcq3-feedback"></p>

---

##### Question 4 (Match the method): Explicit inverse solution

Complete the sentence by selecting the correct method:

<p>
The method that requires selecting between two possible knee configurations from an inverse solution is
<select class="answer" data-answer="inverse kinematics with joint pd">
  <option value="">-- choose --</option>
  <option value="inverse kinematics with joint pd">Inverse kinematics with joint PD</option>
  <option value="cartesian pd control">Cartesian PD control</option>
  <option value="force control">Force control</option>
</select>.
</p>

---

##### Question 5 (Match the method): Contact force

Complete the sentence by selecting the correct method:

<p>
The method that is most naturally suited to controlling ground-contact force, without computing a desired joint angle, is
<select class="answer" data-answer="force control">
  <option value="">-- choose --</option>
  <option value="inverse kinematics with joint pd">Inverse kinematics with joint PD</option>
  <option value="cartesian pd control">Cartesian PD control</option>
  <option value="force control">Force control</option>
</select>.
</p>

<br>

<button type="button" onclick="checkDropdownAnswers('comp-dropdown-feedback')">Check answers</button>

<p id="comp-dropdown-feedback"></p>

</div>
</details>

#### 7.5 Single leg hopping

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot13.png' | relative_url }}"
    alt="Simulated planar two-link leg interacting with the ground"
    style="width: 45%; max-width: 600px; height: auto;">

  <figcaption style="max-width: 800px; margin: 0.5rem auto;">
    <strong>Figure 8 : Simulated planar two-link leg.</strong>
    
  </figcaption>

</figure>

The two-link leg model is simulated in contact with the ground, providing a simple environment for studying leg motion, foot placement, and the transition from kinematic modeling to locomotion control.

Single-leg hopping combines the control methods introduced previously. The leg must maintain a suitable configuration while generating a Cartesian force at the foot to push against the ground.

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

where the desired foot force $\mathbf{F} \in \mathbb{R}^2$ is:

$$
\mathbf{F} = \begin{bmatrix} F_x \\ F_z \end{bmatrix}
$$

For a vertical jump, the main command is the vertical force $F_z$. A single force pulse produces one jump, while a periodic force profile can produce continuous hopping.

<p style="text-align: center;">
 <img 
   src="{{ '/assets/images/locomotion/Image_slot14.png' | relative_url }}"
   alt="Quadruped leg">
</p>

The hopping behaviour depends on several controller parameters:

- peak vertical force;
- hopping frequency;
- initial or nominal leg position;
- joint-space gains;
- Cartesian-space gains;
- gains used during contact and flight.

These parameters determine the jump height, repetition rate, leg posture, and stability of the motion.

They may also be optimized by defining a parameter vector $\mathbf{x} \in \mathbb{R}^n$, where $n$ is the number of parameters being tuned, such as:

$$
\mathbf{x} = \begin{bmatrix} f & F_{z,\mathrm{peak}} & \cdots \end{bmatrix}^{T}
$$

and selecting an objective, for example maximizing the jump height while respecting suitable parameter bounds.

At the end of this section, you will implement and tune a single-leg hopping controller as an exercise.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 8 : Single-Leg Hopping</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Main driver of jump height

Which parameter has the most direct effect on jump height?

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="a">
  The peak vertical force $F_{z,\mathrm{peak}}$
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="b">
  The horizontal force $F_x$
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="c">
  The link length $l_1$ only
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="d">
  The knee mass $m_1$ only
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'hop-mcq1',
    'a',
    'Correct! The vertical impulse delivered during push-off, driven mainly by F_z,peak, sets the takeoff velocity and therefore the jump height.',
    'Incorrect. Jumping is primarily a vertical motion &mdash; think about which force component accelerates the body upward.'
  )">
  Check answer
</button>

<p id="hop-mcq1-feedback"></p>

---

##### Question 2: Single pulse versus periodic force

What is the difference between a single force pulse and a periodic force profile?

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="a">
  A single pulse produces one jump; a periodic profile can produce continuous hopping
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="b">
  A single pulse produces continuous hopping; a periodic profile produces one jump
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="c">
  Both always produce the same motion
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="d">
  Neither can produce a jump on its own
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'hop-mcq2',
    'a',
    'Correct! As stated in the text, a single force pulse produces one jump, while a periodic force profile produces continuous hopping.',
    'Incorrect. Reread the paragraph just above Figure 8&#39;s companion image on hopping force profiles.'
  )">
  Check answer
</button>

<p id="hop-mcq2-feedback"></p>

---

##### Question 3: Gains during flight versus contact

Why might a hopping controller use different gains during contact and during flight?

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="a">
  Because gains have no effect once the leg leaves the ground
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="b">
  Because the leg's interaction with the environment (and the control objective) changes between the contact and flight phases
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="c">
  Because $\mathbf{J}(\mathbf{q})$ is undefined during flight
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="d">
  Because gravity disappears during flight
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'hop-mcq3',
    'b',
    'Correct! During contact the controller regulates ground force; during flight it typically repositions the leg for the next landing, so different gains are often appropriate.',
    'Incorrect. Consider what the leg is physically doing, and what the controller should prioritize, in each phase.'
  )">
  Check answer
</button>

<p id="hop-mcq3-feedback"></p>

---

##### Question 4 & 5 (Numeric): Estimating takeoff velocity and jump height

Consider a hopping leg with total mass $m = 5\text{ kg}$. During the push-off (contact) phase, lasting $t_c = 0.2\text{ s}$, the controller applies a net average vertical force (i.e. the force above what is needed to support the leg's weight) of $F_{net} = 30\text{ N}$.

Using the impulse–momentum relation $v = \dfrac{F_{net}}{m}\,t_c$ and $v^2 = 2gh$ with $g = 9.81\text{ m/s}^2$:

<p>
Takeoff velocity $v$ (m/s):
<input type="text" id="hop-v" size="8">
</p>

<p>
Jump height $h$ (m):
<input type="text" id="hop-h" size="8">
</p>

<br>

<button type="button" onclick="checkHoppingExercise()">Check answers</button>

<p id="hop-numeric-feedback"></p>

<script>
function checkHoppingExercise() {
  const m = 5, tc = 0.2, Fnet = 30, g = 9.81;
  const vTrue = (Fnet / m) * tc;
  const hTrue = (vTrue * vTrue) / (2 * g);

  const uV = parseFloat(document.getElementById('hop-v').value);
  const uH = parseFloat(document.getElementById('hop-h').value);

  const okV = approxEqual(uV, vTrue, 0.1, 0.05);
  const okH = approxEqual(uH, hTrue, 0.01, 0.1);

  let results = [];
  results.push(okV ? "✅ Takeoff velocity correct (≈ " + vTrue.toFixed(2) + " m/s)" : "❌ Takeoff velocity off (expected ≈ " + vTrue.toFixed(2) + " m/s)");
  results.push(okH ? "✅ Jump height correct (≈ " + hTrue.toFixed(3) + " m)" : "❌ Jump height off (expected ≈ " + hTrue.toFixed(3) + " m)");

  const feedback = document.getElementById('hop-numeric-feedback');
  feedback.innerHTML = results.join("<br>");
  feedback.style.color = (okV && okH) ? "green" : "orange";
}
</script>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

First find the takeoff velocity from the impulse delivered during contact:

$$
v = \frac{F_{net}}{m}\,t_c.
$$

Then use projectile motion (the leg decelerates under gravity alone once airborne) to find the height:

$$
h = \frac{v^2}{2g}.
$$

  </div>
</details>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Programming Exercise 2 : Single-Leg Hopping Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

This practical consolidates the concepts introduced in this section:

- the Jacobian (defined and self-verified directly in the exercise files);
- Cartesian PD control;
- force control and $\mathbf{J}^T(\mathbf{q})$;
- single-leg hopping in a live PyBullet simulation.

##### Download the exercise files

Download the complete exercise package, extract the ZIP file, and keep all files in the extracted folder.

<a
  href="{{ '/assets/files/locomotion/locomotion_practical2.zip' | relative_url }}"
  download
  style="
    display: inline-block;
    padding: 10px 16px;
    background-color: #0075db;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  ">
  Download Practical 2
</a>

##### What's in the package

Add these files alongside your existing `env/` folder:

```text
Exercise_2/
├── locomotion_practical2.py    # main exercise — fill in the TODOs
├── check_hopping.py            # grading helper, run automatically at the end
├── requirements_Ex2.txt        # Python dependencies
└── README.md                   # environment setup & step-by-step instructions
```

`locomotion_practical2.py` is the exercise: design a force profile, add Cartesian PD control, and map both to joint torques so the leg hops — either once or continuously.

**Full environment setup and instructions are in `README.md`** inside the downloaded package.

</div>
</details>

##  Module 2 : Model-based control quadruped
##  Module 3 : Advanced locomotion control : CPG



## Credits

Several figures and the iterative inverse-kinematics algorithm box (Figure 7) in this module are adapted from the **Legged Robots** course at EPFL, supervised by **Pr.Auke Ijspeert**. We thank him for making this material available.

## Ressources




---

[Back to Top](#top)