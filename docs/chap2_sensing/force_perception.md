---
title: 2.3 Force Perception 
parent: "Chapter 2: Sensing in Robotics"
has_children: false
nav_order: 3
layout: numbered
author: Mael Studer (EPFL)
chapter: 2
section: 3
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<!-- Back-To-Top Button -->
<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

<!-- Question templates -->
<details markdown="1">
<summary>Questions Templates</summary>
  
  <p><strong>Question? (single answer possible)</strong></p>
  <form id="example1">
    <input type="radio" name="example1" value="option1">
    ANSWER 1 <br>
  
    <input type="radio" name="example1" value="option2">
    ANSWER 2 <br>
  
    <input type="radio" name="example1" value="option3">
    ANSWER 3 <br>
  
    <button type="button" onclick="checkMCQ(
      'example1',
      'option1',
      'Correct!',
      'Incorrect!'
    )">
      Check Answer
    </button>
  
    <p id="example1-feedback"></p>
  </form>
  
  <p><strong>Question? (multiple answers possible)</strong></p>
  <form id="example2">
    <input type="checkbox" name="example2" value="option1">
    ANSWER 1<br>
  
    <input type="checkbox" name="example2" value="option2">
    ANSWER 2 <br>
  
    <input type="checkbox" name="example2" value="option3">
    ANSWER 3 <br>
  
    <button type="button" onclick="checkMultipleAnswers(
      'example2',
      ['option1','option2'],
      'Correct!',
      'Incorrect!'
    )">
      Check Answer
    </button>
  
    <p id="example2-feedback"></p>
  </form>

</details>

# Force Perception (in Robotics)

- Table of Contents
{:toc}

---

## Prerequisites

⚠️ Adapt in the end ⚠️

- closed-loop control page (controller definition)
- read course about sensors and sensing
- read course about kinematics and dynamics
- basics in electronics (resistance, capacitance, voltage-divider, etc.)

---

## General Motivation

Robots are expected to interact closely and safely with humans aswell as with their environement. Besides interaction modalities like vision (refer to vision page), there is one modality that humans use all the time, but is often neglected in robotics: **touch** (or physical interaction).  

**Physical interaction** happens when a robot gets in touch with a human or an object of the real world. There is either a force generated from the robot towards the object or vice-versa. Physical interaction is classified into three catergories according to the executed task: **manipulation, exploration** and **reaction**. These categories are explained and illustrated below.  

- **Manipulation:** (robot: active agent - object: passive agent)  
*Goal: Use perception to perform an action on an object successfully.*  
During manipulation, a robot senses an object and adapts its actions accordingly. An example of manipulation is the grasping of objects, essential in industrial applications. During grasping, touch could be used to maximize the contact surface between the robotic hand and the object or to prevent slippage of the object. (->link to grasping page)  
Slippage can arise in scenarios like dealing with soft objects (e.g. fruit), when objects change weight mid-grasp (e.g. a water bottle being filled during manipulation), or simply while moving objects from one place to another. In the video below, an example is shown of a robotic hand manipulating a filled champagne glass.  
From the point of view of signals, the action related information flows from the manipulated object towards the controller.

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/force_perception/manipulation_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Example of Manipulation: Moving a Champagne Glass
    (<a href="https://ieeexplore.ieee.org/document/10146043">F. Khadivar, A. Billard, IEEE T-RO 2023</a>)
  </i></sub></div>
</div>

<!--
![Manipulation Example](https://www.youtube.com/watch?v=teOeMzuwMpo)
><sub>*Example of Manipulation: Lifting a Tennis Ball. Available on [YouTube](https://www.youtube.com/watch?v=teOeMzuwMpo)*</sub>
-->

- **Exploration:** (robot: active agent - object: passive agent)  
*Goal: Learn about object properties.*  
As in manipulation, exploration is when a robot interacts with an object, except the robot performs movements to learn about the object (action reveals perception).  
In exploration, touch is used to measure material properties like softness (stiff or compliant), surface texture (e.g. smooth vs rough), shape, temperature or even friction coefficient. In the video below, a humanoid robot moves his fingers over objects trying to identify their shape.  
The action related information flows from controller towards contact; the object has no infulence on action.

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/force_perception/exploration_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Example of Exploration: Shape detection
    (<a href="https://ieeexplore.ieee.org/document/6907804">N. Sommer, M. Li, A. Billard, ICRA 2014</a>)
  </i></sub></div>
</div>

<!--
![Exploration Example](https://www.youtube.com/watch?v=UWMRR38hNWA)
><sub>*Example of Exploration: Shape detection. Available on [YouTube](https://www.youtube.com/watch?v=UWMRR38hNWA)*</sub>
-->

- **Reaction:** (robot: active agent - human/robot: activ agent)  
*Goal: Enable safe interactions with another active agent.*  
Reaction refers to an interaction between a robot and a human (or another robot). The robot not only perceives and acts, but also adapts in real-time to the other agent by interpreting the constant feedback.  
Therefore there is a bi-directional information flow, known as closed-loop control. This enables safe operation of robots around humans.  
For example, in the field of *haptics*, humans can guide robots and feel force feedback (e.g. teleoperation).
More on *haptics* can be found on the dedicated page (link to haptics).  
In the video below, a robotic hand is shown trying to massage a fake human arm while being pushed away by a person.

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/force_perception/reaction_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Example of Reaction: Arm Massage by Robot
    (<a href="https://doi.org/10.1007/s10514-020-09934-9">M. Khoramshahi, A. Billard, ICRA 2020</a>)
  </i></sub></div>
</div>

<!--
![Reaction Example](https://www.youtube.com/watch?v=TFwVKe3W41Y)
><sub>*Example of Reaction: Handshake between Human and Robot. Available on [YouTube](https://www.youtube.com/watch?v=TFwVKe3W41Y)*</sub>
-->

Some promising fields in which force perception is used are biomedical robotics (e.g. [Surgical Robots](surgical)), rehabilitation (e.g. exoskeletons -> link to page, not created yet) or humanoids (link to humanoids page, not created yet).

*Note: On this page, the terms **sense of touch**, **tactile sensing** and **force perception** refer to the robot’s ability to perceive and interpret physical interaction.*

---

<details markdown="1">
<summary>Quiz (tap to unfold)</summary>

<p><strong>Why is touch useful in robotics?</strong> (multiple answers possible)</p>
<form id="quiz-touch">
  <input type="checkbox" name="quiz-touch" value="option1">
  It allows robots to understand the forces exchanged with their environment.<br>

  <input type="checkbox" name="quiz-touch" value="option2">
  It allows robots to detect unexpected events such as slippage or loss of contact.<br>

  <input type="checkbox" name="quiz-touch" value="option3">
  It replaces the need for ALL other sensing modalities in robots, like vision, audio and proximity sensors.<br>

  <input type="checkbox" name="quiz-touch" value="option4">
  It enables robots to adapt during physical interactions with objects or humans.<br>

  <button type="button" onclick="checkMultipleAnswers(
    'quiz-touch',
    ['option1', 'option2', 'option4'],
    'Correct! Touch enables adaptation, provides force information and helps detect events such as slippage. It does not replace ALL other sensing modalities.',
    'Incorrect. Touch is essential for sensing forces, adapting during interactions and detecting contact events.It does not replace ALL other sensing modalities.'
  )">
    Check Answer
  </button>

  <p id="quiz-touch-feedback"></p>
</form>

<p><strong>Which statements correctly describe the categories of physical interaction?</strong> (multiple answers possible)</p>
<form id="quiz-categories">
  <input type="checkbox" name="quiz-categories" value="option1">
  Reaction involves real-time adaptation to another active agent, such as a human.<br>

  <input type="checkbox" name="quiz-categories" value="option2">
  Exploration uses touch to learn about an object’s properties, such as stiffness or texture.<br>

  <input type="checkbox" name="quiz-categories" value="option3">
  Manipulation and exploration rely on bi-directional information flow between robot and object.<br>

  <input type="checkbox" name="quiz-categories" value="option4">
  Manipulation uses perception to act successfully on an object.<br>

  <button type="button" onclick="checkMultipleAnswers(
    'quiz-categories',
    ['option1', 'option2', 'option4'],
    'Correct! Manipulation focuses on acting on objects, exploration focuses on learning object properties and reaction involves adapting to another active agent.',
    'Incorrect. Only reaction, exploration and manipulation match the definitions. Bi-directional information flow is specific to reaction, not manipulation or exploration.'
  )">
    Check Answer
  </button>

  <p id="quiz-categories-feedback"></p>
</form>

</details>

---

## Course Content

Now that we have seen **why** robots need a sense of touch, we can dive into **how** force perception is implemented.

It is possible to distinguish two types of force perception based on where the sensors are located: **intrinsic** and **extrinsic**. In **intrinsic sensing**, the sensors are placed within the mechanical structure of the robot (more inward) and we speak of **force feedback**. On the other hand, **extrinsic sensing** refers to sensors mounted at the robot’s contact area (more outward) and we refer to this as **tactile feedback**.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/intrinsic-extrinsic-sensors.png' }}"
       width="530"
       alt="Location of intrinsic and extrinsic sensors on a robot arm">
  <figcaption>
    <sub><i>
      Figure 1: Location of intrinsic (1) and extrinsic (2) sensors on a robot arm
      (<a href="https://www.photonics.com/Articles/Force-Torque-Sensors-Expand-Robotic-Capabilities/a63234">Photonics</a>)
    </i></sub>
  </figcaption>
</figure>

- **Force feedback (intrinsic)** measures the global forces and torques applied to the system at a specific point, considered infinitesimally small. It can be thought of as the overall push, pull and twist the robot feels at that contact point (usually at a joint).

- **Tactile feedback (extrinsic)** measures pressure or stress distributions over a surface rather than at a single point. It relies on an array of sensing elements, forming what can be thought of as an electronic skin. Because it includes multiple contact points, it can detect slippage, surface texture and the exact contact location on the array. Depending on the used materials, tactile sensors can be flexible, compliant, stiff and rigid.

*Note: This proposed separation of force perception into intrinsic and extrinsic sensing was taken from the [Tactile Sensing Technologies, Springer](https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5) book.*

---

On this page, we will move gradually from **force feedback**, which describes interactions occurring at a single point, to **tactile feedback**, where sensing extends across a surface.  
Although the examples shown in the introduction mainly focused on hands and fingertips, tactile sensing can be applied to the entire body of a robot. However, challenges such as wiring complexity and limited mechanical flexibility must also be addressed.

<!-- This layout mirrors how robots evolve from simply feeling a global contact force to perceiving rich spatial details such as shape, texture and contact distribution. -->

<!-- To explore this, we will start with the classical principles of **force/torque sensing**, then move on to **tactile sensors** and their different working principles.  
Afterward, we will look at **advanced tactile technologies**, including flexible, stretchable, and vision-based sensors.  
Finally, we will address how tactile information is processed and how sensor location within the robot influences performance and robustness. -->

⚠️ Adapt in the end ⚠️

- **Section 2.2.3.1: Force/Torque Sensing**  
  Introduction to F/T sensing methods.

- **Section 2.2.3.2: Tactile Sensing**  
  Overview of the main tactile sensing principles (resistive, capacitive, piezoelectric, optical, magnetic, etc.) and their mechanical implementations (rigid, flexible, compliant, stretchable).

- **Section 2.2.3.3: Advanced Tactile Sensing**  
  Presentation of flexible, stretchable and vision-based tactile sensors.

- **Section 2.2.3.4: Information Processing**  
  Discussion of how tactile data are acquired, including the challenges related to wiring, data rate and power consumption.

<!--
- **Section 2.2.3.5: Sensor Location and Integration**  
  Summary of where sensors are typically placed (in joints, links, or fingertips) and how placement affects measurement quality and task performance.
-->

---

### Force/Torque Sensing

Main ref: [Force-Torque Sensing in Robotics](https://unige.iris.cineca.it/handle/11567/942466) (F. J. Andrade Chavez)

Let’s begin with a quick reminder of the **forces** and **torques** (also called moments) we want to measure. Force is given in Newtons [N] and produces linear movement, whereas torque is given in Newton-meters [Nm] and produces rotational movement. They are both **vector** quantities defined in 3D space, meaning they can be decomposed into components of the orthonormal basis of $\mathbb{R}^3$ (x, y, and z axis).

$$\text{Force: } \mathbf{F} = (F_{x}, F_{y}, F_{z}) \in \mathbb{R}^3$$
$$\text{Torque: } \mathbf{M} = (M_{x}, M_{y}, M_{z}) \in \mathbb{R}^3$$

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/forces-moments-schematic.png' }}"
       width="240"
       alt="Forces and moments schematic (Fx, Fy, Fz, Mx, My, Mz)">
  <figcaption>
    <sub><i>
      Figure 2: Forces and torques acting on sensor 
      (<a href="https://ieeexplore.ieee.org/document/7992726">U. Kim et al., IEEE</a>)
    </i></sub>
  </figcaption>
</figure>

The goal of **force–torque (F/T) sensing** is to obtain a complete description of all forces and torques exchanged at the contact location. This is possible because the sum of all forces and the sum of all moments acting on the system must be equal to zero (in static equilibrium):

$$ \sum \mathbf{F} = 0 \qquad \sum \mathbf{M} = 0 $$

As described earlier, force-torque sensing in robotics relies on intrinsic sensors, which are **embedded** within the robot’s structure. In this chapter, we will have a look at two different F/T sensing approaches: first, dedicated **F/T sensors** that **directly** measure these quantities, and second, **sensorless methods** that estimate forces and torques **indirectly**.

---

<details markdown="1">
<summary>Quiz (tap to unfold)</summary>

<p><strong>Which statements correctly describe forces and torques?</strong> (multiple answers possible)</p>

<form id="quiz-ft">
  <input type="checkbox" name="quiz-ft" value="option1">
  A force is a vector in $\mathbb{R}^3$ that produces linear motion. <br>

  <input type="checkbox" name="quiz-ft" value="option2">
  A torque is a rotational quantity measured in Newton-meters [Nm]. <br>

  <input type="checkbox" name="quiz-ft" value="option3">
  A force belongs to $\mathbb{R}^6$ because it includes both translational and rotational components. <br>

  <input type="checkbox" name="quiz-ft" value="option4">
  Both force and torque can be decomposed into components along the three axes of $\mathbb{R}^3$. <br>

  <button type="button" onclick="checkMultipleAnswers(
    'quiz-ft',
    ['option1', 'option2', 'option4'],
    'Correct! Force is a vector in $\\mathbb{R}^3$ producing linear motion, torque is rotational and measured in [Nm]. Both quantities decompose along the three axes of $\\mathbb{R}^3$.',
    'Incorrect. Remember that force and torque are each vectors in $\\mathbb{R}^3$. Only the combined wrench belongs to $\\mathbb{R}^6$.'
  )">
    Check Answer
  </button>

  <p id="quiz-ft-feedback"></p>
</form>

</details>

---

#### 1.1 Force/Torque Sensors

Force sensors are classified based on the number of axes (or degrees of freedom DOF) they measure.

- **Three-Dimensional Force Sensors (3DOF):**  
  These sensors measure **only forces**, not torques. They provide information about the three translational force components along the $x$, $y$ and $z$ axes. The corresponding wrench vector is:

  $$
  W = [F_x, F_y, F_z]^T
  $$

  3DOF sensors are used when only translational forces matter. They are often mounted near the end-effector and can for example measure the weight of an object or detect simple contact with a surface.

  <figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/3DOF-translation-forces.png' }}"
       width="420"
       alt="Translational forces acting on end-effector">
  <figcaption>
    <sub><i>
      Figure 3: Translational forces acting on end-effector. (a) diagonal force, (b) vertical force
    </i></sub>
  </figcaption>
  </figure>

- **Six-Dimensional Force/Torque Sensors (6DOF):**  
  These sensors measure both forces and torques, covering the three translational and three rotational axes. Besides pushing or pulling forces, they can also measure bending and twisting effects. The wrench vector they measure is:

  $$
  W = [F_x, F_y, F_z, M_x, M_y, M_z]^T
  $$

**Mechanical Implementation and Sensing Principles**

The fundamental principle behind the majority of F/T sensors is detecting strain within an elastic element (strain gauge). ...

<!--
The elastic element is the component that responds directly to the force stimulus. Force measurement is achieved by converting the physical phenomenon—the change in resistance due to strain—into an electrical signal. This is done with the aim of ensuring the elastic element remains within the linear section of the stress-strain curve where Hooke’s law applies.

A typical force sensor combines this elastic element with a gauge (like a strain gauge) to measure the degree of compression or strain.

The material most commonly used for sensing in F/T sensors is silicon, exploiting the piezoresistive effect (the change in resistance of silicon due to strain).

The preferred mechanical designs, known as elastomers, include variations of cantilever beams in a cross-beam configuration and parallel structures:

-->

Detail most common mechanical structures:

1) Cross-Beam Structures:

<!--
   - These structures are characterized by an elastic element shaped like a crossbar with strain gauges placed on the cross and flexible supporting beams.
   - The structure often involves a fixed outer ring and an inner ring where external forces are applied, causing deformation.
   - They are known for being compact and offering high stiffness due to their monolithic structure. However, they may suffer from coupling effects and are complex to manufacture.
   - *Visual Reference:* The thesis references Figure 1.5, showing cross-shaped elastic elements. Figure 1.6 shows a finite element analysis of such an element.
-->

2) Stewart Platform / Parallel Structures:

<!--
   - These structures originate from the Stewart platform mechanism.
   - They consist of an upper platform (mobile platform) and a lower fixed base, connected by six or more elastic members (limbs or measuring branches).
   - The sensor works by having an external load cause axial strain in the limbs, which is measured by strain gauges.
   - Advantages include high stiffness due to load distribution and a compact radial structure.
   - Miniature sensors (around 10 mm in diameter) have been developed using a monolithic Stewart platform structure with flexural joints, especially for applications like Minimally Invasive Robotic Surgery (MIRS).
   - *Visual Reference:* Figure 3a in the review paper displays a Stewart platform structure. Figure 6a displays a monolithic Stewart platform structure.
-->

**Measurement and Mathematical Model**

-> Explain how the value is obtained:

Force sensors do not measure force directly. Measuring force is the result of converting physical phenomena (like strain) into an electrical signal.

<!--
The electrical signal derived from strain gauges (often arranged in a Wheatstone Bridge circuit) is related back to force using a calibration process. Since the design aims for linearity within the material’s operational range, a linear relationship is typically assumed for the mathematical model of the sensor.

The theoretical relationship between the force vector $F$ and the resulting strain vector $u$ (where $n$ is the number of strain points and $n \geq 6$) is defined by Hooke’s law:

$$
F = K \cdot u \quad (1)
$$

Where  
- $F \in \mathbb{R}^6$ represents the force/moment vector,  
- $K \in \mathbb{R}^{6 \times n}$ is the stiffness matrix,  
- $u = [u_1, u_2, \dots, u_n]^T$ is the strain vector.

For calibration purposes, the relationship between the applied forces and torques ($f$) and the sensor’s raw measurements ($r$, typically in bit counts or voltage output) uses a linear approximation model that incorporates a calibration matrix and an offset.

The most used model for predicting the six-dimensional forces is:

$$
\mathbf{f} = \mathbf{C}\mathbf{r} + \mathbf{o}
$$

In this equation:  
- $f \in \mathbb{R}^6$ is the 6D force vector (forces and torques).  
- $C \in \mathbb{R}^{6 \times m}$ is the calibration matrix (in N/bit).  
- $r \in \mathbb{R}^m$ represents the raw measurements.  
- $o \in \mathbb{R}^6$ is the offset (or bias) vector.

In the context of linear least-square decoupling used in static calibration, if the sensor output matrix is $U$ and the external load matrix is $F$ (where $k > 6$ is the number of external load components), the calibration matrix $C$ can be calculated as:

$$
C = F U^T (UU^T)^{-1} \quad (5)
$$
-->

---

#### Sensorless Force/Torque Estimation  

It is also possible to determine external forces and torques without embedding dedicated sensors. This **sensorless** method relies on the robot’s internal data (available without special hardware), such as the amount of current drawn by its motors. In most motors, the generated torque is proportional to the motor current. By comparing the **actual torque** output (derived from current) with the **theoretically required torque**, it is possible to determine the existence and magnitude of an external force.

Below, we look at two different approaches to estimate external forces using motor current: **model-based** and **model-free** (Neural Network–based).

---

- **Approach A: Model-Based Estimation**

This approach is called model-based, as it uses the **robot’s dynamics and kinematics** (= model) to compute the external force applied on the robot. If you need a quick reminder about the Jacobian, have a look at the [Kinematics](kinematics#chapter-7-velocity-kinematics---meet-the-jacobian-) course.

Contact force estimation follows three steps:  

- 1) Estimate the external joint torques induced by the force  
- 2) Compute the Jacobian at the contact location  
- 3) Convert the joint torques into cartesian force

*1) Estimating the external joint torque $\tau_{\text{ext}}$*

We start with the basic **Lagrangian expression** of the robot’s dynamics (seen previously in the [Dynamics](dynamics#chapter-1-part2-the-lagrangian-formulation-of-dynamics) course):

$$
M(\theta)\ddot{\theta} + C(\theta,\dot{\theta})\dot{\theta} + g(\theta) = \tau
$$

Where:

- $\theta \in \mathbb{R}^n$: vector of joint variables (position)
- $\ddot{\theta}, \dot{\theta}$: joint acceleration and velocity
- $M(\theta)$: mass matrix
- $C(\theta,\dot{\theta})\dot{\theta}$: vector accounting for Coriolis or centrifugal torques  
- $g(\theta)$: vector of gravity torques
- $\tau$: vector of torques applied by the robot's motors

To properly estimate external forces, we use and **extended dynamic model**, which includes the external torques:

$$
M(\theta)\ddot{\theta} + C(\theta,\dot{\theta})\dot{\theta} + g(\theta) = \tau + \tau_{\text{ext}}
$$

Where:
- $\tau_{\text{ext}}$: vector of induced torque by the external contact force

By computing the difference between the theoretical model torque and the measured motor torque, we finally obtain the external joint torque $\tau_{\text{ext}}$.  

Refer to <a href="https://ieeexplore.ieee.org/document/6942848">Estimation of Contact Forces Using a Virtual Force Sensor</a> (E. Magrini, F. Flacco & A. De Luca) for complete description of that computation step.

*2) Computing the Jacobian at the contact location $J_c$*  

Once $\tau_{\text{ext}}$ is estimated, the next step is to determine how a force at the contact point affects the joints. As shown in the figure below, a contact may occur on a link (panel (a)) or on the end-effector (panel (b)). The contact point determines which joints are affected.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/jacobian-contact-point.png' }}"
       width="420"
       alt="Force applied on link (a) and end-effector (b)">
  <figcaption>
    <sub><i>
      Figure 4: Force applied on link (a) and end-effector (b)
      (<a href="https://www.mdpi.com/1424-8220/19/11/2603">S. Yen et al.</a>)
    </i></sub>
  </figcaption>
</figure>

The position of the contact point relative to joint $i$, on which the contact is happening, is obtained by subtracting the absolute position of the origin of link $i$, denoted $p_i(\theta)$, from the absolute position of the contact point on that link, denoted $p_{c}(\theta)$:

$$
p_{i,c}(\theta) = p_{c}(\theta) - p_i(\theta)
$$

Having this, the **contact-point Jacobian** $J_c(\theta)$ can be computed. It is derived from the link Jacobian $J_i(\theta)$:

$$
J_c(\theta)
=
\begin{bmatrix}
I & -\,S(p_{i,c}(\theta)) \cr
0 & I
\end{bmatrix}
J_i(\theta)
$$

where $S(\cdot)$ is the [skew-symmetric matrix](https://en.wikipedia.org/wiki/Skew-symmetric_matrix#Cross_product).  

This Jacobian describes how a force applied at the contact point generates joint torques.

*3) Computing the contact force*  

To compute the contact force, we need to define the wrench vector:

$$
W =
\begin{bmatrix}
F_c \cr
M_c
\end{bmatrix}
\in \mathbb{R}^6,
\qquad
F_c = \begin{bmatrix}
F_x \cr
F_y \cr
F_z
\end{bmatrix},
\qquad
M_c = \begin{bmatrix}
M_x \cr
M_y \cr
M_z 
\end{bmatrix}
$$

$F_c$ and $M_c$ are the force and moment vectors applied at the contact location.

Finally we can compute the wrench $W$ by resolving the following equation:

$$
\tau_{\text{ext}} = 
J_c^T(\theta)
W
$$

*Note: This three-step approach is based on <a href="https://ieeexplore.ieee.org/document/6942848">Estimation of Contact Forces Using a Virtual Force Sensor</a> (E. Magrini, F. Flacco, A. De Luca).*

---

- **Approach B: Model-Free Estimation (Neural Network Based)**

The second proposed approach is machine learning based and does not rely on any physics equation. Instead of using a model, the wrench vector $W \in \mathbb{R}^6$ is determined by a neural network (NN). To train the NN, this approach needs vast amounts of real-world data, collected using an actual F/T sensor.

The variables fed to the NN are the robot’s internal state signals, such as joint currents, joint positions $\theta$, joint velocities $\dot{\theta}$ and joint accelerations $\ddot{\theta}$. All these inputs are put together into one input vector $x_n$.

For example, for an $n$-joint robot, an input vector may look like:

$$
x_n = 
\begin{bmatrix}
I_1 \ldots I_n \\
\theta_1 \ldots \theta_n \\
\dot{\theta}_1 \ldots \dot{\theta}_n \\
\ddot{\theta}_1 \ldots \ddot{\theta}_n
\end{bmatrix}^T
$$

At every instant, the NN takes the input signal vector $x_n$ and outputs the estimated external wrench vector $W$ in real time:

$$
W = NN(x_n)
$$

Where $NN(\cdot)$ represents the trained neural network structure.

An example of such a neural network is shown in the figure below.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/NN-sensorless-force-estimation.png' }}"
       width="340"
       alt="Neural network architecture for estimating force and torque">
  <figcaption>
    <sub><i>
      Figure 5: Neural network–based estimation of force and torque
      (<a href="https://arxiv.org/html/2301.13413v2">S. Shan, Q. Pham</a>)
    </i></sub>
  </figcaption>
</figure>

*Note: This approach was taken from <a href="https://arxiv.org/html/2301.13413v2">Fine Robotic Manipulation without Force/Torque Sensor</a> (S. Shan, Q. Pham)*

---

<details markdown="1">
<summary>Video: Force-torque estimation in action (tap to unfold)</summary>  

<div> </div>
<div style="text-align: center;">
  <iframe width="640" height="360"
          src="https://www.youtube.com/embed/spztx3GzPzc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
  </iframe>
</div>

<div style="text-align: center;">
    <sub><i>
      Neural-network based sensorless force-torque estimation in action  
      (from <a href="https://arxiv.org/html/2301.13413v2">S. Shan, Q. Pham</a> available on <a href="https://www.youtube.com/watch?v=spztx3GzPzc">YouTube</a>)
    </i></sub>
</div>

</details>

---

Advantages and limitations of sensorless force-torque estimation:

- **Advantages:**  
  Avoids the cost of expensive F/T sensors and reduces hardware complexity

- **Limitations:**  
  Accuracy depends a lot on the used model precision and friction approximation.

<!--
---

<details markdown="1">
<summary>Quiz (tap to unfold)</summary>

  <p><strong>Why do force sensors require calibration?</strong></p>
  <form id="quiz2">
    <input type="checkbox" name="quiz2" value="option1">
    Measurement depends on the mass, which varies depending on where you are on Earth <br>

    <input type="checkbox" name="quiz2" value="option2">
    Because calibration increases the sensor’s weight <br>

    <input type="checkbox" name="quiz2" value="option3">
    No sensors are perfectly identical <br>

    <input type="checkbox" name="quiz2" value="option4">
    To synchronize the sensor’s internal clock with the computer <br>

    <button type="button" onclick="checkMultipleAnswers(
      'quiz2',
      ['option3'],
      'Correct!',
      'Incorrect!'
    )">
      Check Answer
    </button>

    <p id="quiz2-feedback"></p>
  </form>

</details>
-->

---

<details markdown="1">
<summary>Further Reading: Intrinsic sense of touch (tap to unfold)</summary>

In the following research, Iskandar, Albu-Schäffer and Dietrich introduce an **intrinsic robotic sense of touch** that requires no external tactile sensors. By relying only on machine learning algorithms, the robot is able to detect and localize touch anywhere on its body. **Videos are available by following the link.**

[Intrinsic sense of touch for intuitive physical human-robot interaction](https://www.science.org/stoken/author-tokens/ST-2065/full#) (M. Iskandar, A. Albu-Schäffer and A. Dietrich)

</details>

---

### Tactile Sensing

#### Resistive Sensors

There are two types of resistive tactile sensors: those that determine the contact location and those that determine the contact force or pressure.  
First, we will take a closer look at resistive sensors of the first type, how resistive technology can be used to determine where a contact happened on a surface.  
Then, we will move on to sensors of the second type and see how resistive technology is used to measure force/pressure.

---

- **Type 1: Determine contact location**  

*1) Single-strip resistive sensor:*  

Resistive tactile sensors are usually made of two sheets coated with a resistive material, placed one on top of the other. The two layers are separated by microspheres so that they remain electrically isolated from each other. When an object touches the sensor, the pressure brings both layers into contact. This configuration can be seen in panel (a) of the figure below (with one layer shown in green and the second layer in grey).  

To determine the contact location, we need to extract both the x- and y-coordinates. This is done by energising the layers one at a time. A uniform voltage $V_x$ is applied along the first resistive layer (never both layers simultaneously), while the second layer is connected in a high-impedance (Hi-Z) configuration, able to read the voltage output. Because the Hi-Z connection draws almost no current, it does not disturb the voltage distribution on the active layer. This setup corresponds to panel (b).  

The contact between the sheets acts as the slider of a linear potentiometer (for more information about potentiometers refer to [Sensors and Sensing](new-sensors-for-robotics)). The resistance in the first layer depends on where along the strip the contact occurs. The voltage at the contact point is transferred through the second layer and thus provides the x-coordinate. Similarly, the x-coordinate is obtained by applying a uniform voltage $V_y$ to the second layer and leaving the first layer in Hi-Z, as shown in panel (c).  
The measured output voltages are the result of a voltage divider. The simplified expressions are:  

$$
V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x
$$

$$
V_{y,\text{out}} = \frac{R_{y2}}{R_{y1} + R_{y2}} \, V_y
$$

where $R_{x1}$ and $R_{x2}$ are the resistances from the contact point to the left and right boundaries of the x-layer, and $R_{y1}$ and $R_{y2}$ are the equivalent resistances on the y-layer (panel (d)). Panels (e) and (f) show the equivalent electrical circuits when the x- and y-layers are energised.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/single-strip-resistive-sensor.png' }}"
       width="640px"
       alt="Analog resistive strip sensor schematic">
  <figcaption>
    <sub><i>
      Figure 6: Schematic of analog resistive touch sensing
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

In practice, the sensor switches rapidly between measuring the x- and y-coordinates. The layers are energised one after the other at a high frequency, making the switching imperceptible to a human user (response can be provided in 10ms or faster). But this approach has an important drawback: it cannot distinguish multiple simultaneous touch points, which is why multi-strip resistive sensors are used.

---

**Exercise:** Determine the x-coordinate of the contact location

A single-strip resistive sensor of total length $L = 100\ \text{mm}$ is energised with a voltage $V_x = 5\ \text{V}$. The measured output voltage is $ V_{x,\text{out}} = 2.3\ \text{V}$.  

Compute the x-coordinate of the touch point (distance from the left boundary).  
Hint: the resistance is proportional to length ($R_{x1} \propto x$).

<details markdown="1">
<summary>Solution (tap to unfold)</summary>

---

As mentioned, the resistance is proportional to length for a **uniform** resistive strip. Therefore we have:

- $R_{x1} \propto x$
- $R_{x2} \propto L - x$

We can replace these expressions in the formula seen above:

$$
V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x = \frac{L - x}{L} \, V_x
$$

Solve for x:

$$
x = L - L \frac{V_{x,\text{out}}}{V_x}
$$

Insert numerical values:

$$
x = 0.1 - 0.1 \cdot \frac{2.3}{5} = \boxed{0.054 \, \text{m}}
$$

**Answer:** the contact is located at **$x = 54\ \text{mm}$** from the left boundary.

</details>  

---

*2) Multi-strip resistive sensor:*  

As in the single-strip version, the multi-strip resistive sensor also consists of two resistive layers and the measuring principle remains the same. However, each layer is divided into multiple strips along its length, as can be seen in the figure below. In this configuration, multiple simultaneous contacts can be detected, as each strip provides its own independent measurement. Because the strips are narrow, the output voltage of a given strip depends on the contact position aswell as on the contact width.

The output voltage for a single strip is given by:

$$
V_{\text{out}} = \frac{l_x + \frac{w}{2}}{L - \frac{w}{2}} \, V_{\text{ref}}
$$

where  
- $l_x$ is the distance from the left boundary of the strip to the **centre** of the applied contact
- $w$ is the **width** of the contact area (for example, the width of a fingertip)
- $L$ is the **total** length of the strip
- $V_{\text{ref}}$ is the applied reference voltage

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/multi-strip-resistive-sensor.png' }}"
       width="640px"
       alt="Multi-strip analog resistive sensor schematic">
  <figcaption>
    <sub><i>
      Figure 7: Schematic of multi-strip analog resistive touch sensing
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

Now, instead of performing only one measurement per layer, we need to make $n$ separate measurements for all $n$ strips. If the layers are divided into strips in both directions, this increases the total number of measurements from $2$ to $2n$. As a result, scanning the entire sensor becomes more time-consuming.  

In addition, the wiring complexity increases. While the single-strip version requires only four connection wires, the multi-strip version needs $2+2n$ wires: one for $V_{\text{ref}}$, one for the ground and $n$ measurement wires for each of the two stripped layers. The wiring complexity issue will be addressed later.

---

**Exercise:** Determine the contact width

A single strip of length $L = 60\ \text{mm}$ is energised with $V_{\text{ref}} = 5\ \text{V}$. A fingertip presses at a position whose centre is located at $l_x = 25\ \text{mm}$ from the left border. The measured voltage is $V_{\text{out}} = 3.75\ \text{V}$
Compute the contact width $w$.

<details markdown="1">
<summary>Solution (tap to unfold)</summary>

---

Using the given formula:

$$
V_{\text{out}} = \frac{l_x+\frac{w}{2}}{L - \frac{w}{2}}\,V_{\text{ref}}
$$

Solve for $w$:

$$
w = 2 \cdot \frac{\frac{V_{\text{out}}}{V_{\text{ref}}} \cdot L - l_x}{1 + \frac{V_{\text{out}}}{V_{\text{ref}}}}
$$

Insert numerical values:

$$
w = 2 \cdot \frac{\frac{3.75}{5} \cdot 0.06 - 0.025}{1 + \frac{3.75}{5}} = \boxed{0.0229 \, \text{m}}
$$

</details>

---

- **Type 2: Determine applied force or pressure**

Sensors of the second type are designed to measure how much force or pressure is applied on the surface. These sensors rely on **piezoresistive materials**, whose electrical resistance changes when they are mechanically deformed. When an external force compresses the sensitive material, its resistance varies and by measuring this resistance change, the applied pressure can be estimated.

Note that the resistance change is not the quantity measured directly. Instead, the electronics measure the resulting voltage drop at the boundaries of the piezoresistive layer. This is usually done using a voltage-divider configuration.

Materials used as piezoresistive layers are conductive rubber, conductive polymers, conductive gels, and others.

An example of piezoresistive tactile sensor is the *Force Sensing Resistor (FSR)*. These sensors combine two electrodes and a piezoresistive layer. When a voltage is applied across the electrodes, current flows through the piezoresistive layer from one electrode to the other. On panel (a) of the figure below, the different layers of the FSR can be observed. Panel (b) shows a commercially available FSR from [Interlink Electronics](https://www.interlinkelectronics.com).

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px;">

    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/fsr_schematic.png' }}"
           width="300px"
           alt="(a) Schematic structure of a force sensing resistor">
      <figcaption>
        <sub><i>
          (a) Schematic of a FSR
          (<a href="http://www.openmusiclabs.com/learning/sensors/fsr/index.html">OpenMusicLabs</a>)
        </i></sub>
      </figcaption>
    </div>

    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/fsr_interlink.png' }}"
           width="300px"
           alt="(b) Commercial Interlink FSR">
      <figcaption>
        <sub><i>
          (b) Commercial FSR from Interlink Electronics  
          (<a href="https://www.interlinkelectronics.com/fsr-400-series">FSR-400 Series</a>)
        </i></sub>
      </figcaption>
    </div>

  </div>

  <figcaption style="margin-top: 8px;">
    <sub><i>
      Figure 8: Force Sensing Resistor (FSR)
    </i></sub>
  </figcaption>

</figure>

These sensors are low cost, offer good sensitivity and have simple electronics, but their main drawback is the presence of hysteresis, meaning that the sensor does not follow the same resistance–pressure curve when the force increases as when it decreases.

---

<details markdown="1">
<summary>Video: Force Sensitive Resistors in Action (tap to unfold)</summary>  

<div> </div>
<div style="text-align: center;">
  <iframe width="640" height="360"
          src="https://www.youtube.com/embed/sSdEwA7s8bE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
  </iframe>
</div>

<div style="text-align: center;">
    <sub><i>
      Example of Force Sensitive Resistors (FSR)  
      (available on <a href="https://youtu.be/sSdEwA7s8bE">YouTube</a>)
    </i></sub>
</div>

</details>

---

<details markdown="1">
<summary>Quiz (tap to unfold)</summary>

<p><strong>What is the role of the high-impedance (Hi-Z) connection in a single-strip resistive sensor?</strong> (single answer possible)</p>

<form id="type1-q1">

  <input type="radio" name="type1-q1" value="option2">
  To increase the sensitivity of the sensor. <br>

  <input type="radio" name="type1-q1" value="option3">
  To reduce the resistance of the active strip. <br>

  <input type="radio" name="type1-q1" value="option1">
  To ensure that almost no current flows through the reading layer. <br>

  <input type="radio" name="type1-q1" value="option4">
  To allow both resistive layers to be energised simultaneously. <br>

  <button type="button" onclick="checkMCQ(
    'type1-q1',
    'option1',
    'Correct! The Hi-Z input draws almost no current, so it does not disturb the voltage distribution on the active layer.',
    'Incorrect. Remember that Hi-Z is used so that almost no current flows in the reading layer, without changing the strip resistance or energising both layers at the same time.'
  )">
    Check Answer
  </button>

  <p id="type1-q1-feedback"></p>
</form>

**In a single-strip resistive sensor, the output voltage is given by:  
$$V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x$$
What does a larger value of $V_{x,\text{out}}$ indicate?** (single answer possible)

<form id="type1-q2">

  <input type="radio" name="type1-q2" value="option1">
  The contact point is closer to the right boundary of the strip. <br>

  <input type="radio" name="type1-q2" value="option2">
  The contact point is in the middle of the strip. <br>

  <input type="radio" name="type1-q2" value="option3">
  The strip has a lower overall resistance. <br>

  <input type="radio" name="type1-q2" value="option4">
  The sensor is detecting multiple simultaneous touch points. <br>

  <button type="button" onclick="checkMCQ(
    'type1-q2',
    'option1',
    'Correct! A larger $V_{x,\text{out}}$ means $R_{x2}$ is larger compared to $R_{x1}$, so the contact point is closer to the right boundary.',
    'Incorrect. Recall that $V_{x,\text{out}}$ increases when $R_{x2}$ becomes larger relative to $R_{x1}$, meaning the contact moves toward the right boundary. It does not indicate a lower total resistance or multiple touches.'
  )">
    Check Answer
  </button>

  <p id="type1-q2-feedback"></p>
</form>

<p><strong>What happens inside a piezoresistive tactile sensor when a force is applied?</strong> (single answer possible)</p>

<form id="type2-q1">

  <input type="radio" name="type2-q1" value="option2">
  The electrodes move apart, breaking the electrical contact. <br>

  <input type="radio" name="type2-q1" value="option3">
  The sensor generates a voltage internally, like a piezoelectric element. <br>

  <input type="radio" name="type2-q1" value="option4">
  The electronics directly measure the resistance without using a voltage drop. <br>

  <input type="radio" name="type2-q1" value="option1">
  The resistance of the piezoresistive layer changes due to mechanical deformation. <br>

  <button type="button" onclick="checkMCQ(
    'type2-q1',
    'option1',
    'Correct! Piezoresistive sensors rely on a change in resistance when the material is compressed or deformed.',
    'Incorrect. The electrodes remain fixed, the sensor does not generate voltage like piezoelectric materials, and the electronics measure a voltage drop, not the resistance directly.'
  )">
    Check Answer
  </button>

  <p id="type2-q1-feedback"></p>
</form>

<p><strong>Which of the following is a known limitation of Force Sensing Resistors (FSRs)?</strong> (single answer possible)</p>

<form id="type2-q2">

  <input type="radio" name="type2-q2" value="option2">
  They require complex multi-strip wiring like localisation sensors. <br>

  <input type="radio" name="type2-q2" value="option1">
  They exhibit hysteresis, with different resistance–pressure curves when loading and unloading. <br>

  <input type="radio" name="type2-q2" value="option3">
  They cannot be used to measure pressure, only position. <br>

  <input type="radio" name="type2-q2" value="option4">
  They must be operated with a high-impedance reading layer to avoid disturbing the voltage distribution. <br>

  <button type="button" onclick="checkMCQ(
    'type2-q2',
    'option1',
    'Correct! FSRs are simple and low cost, but they suffer from hysteresis and show a non-linear response.',
    'Incorrect. FSRs do not require complex wiring, they are pressure sensors, and the Hi-Z configuration applies to localisation sensors, not FSRs.'
  )">
    Check Answer
  </button>

  <p id="type2-q2-feedback"></p>
</form>

</details>

---

#### Capacitive Sensors

**Capacitive tactile sensors** make use of the fact that the electrical capacitance between two conductive electrodes changes when the geometry of the capacitor is modified. When a force or pressure is applied on the surface of the sensor, the deformation of the structure leads to a measurable **variation of capacitance**. This variation is then used to estimate the contact force or to detect touch.

- **Basic parallel-plate capacitive sensor:**

The simplest capacitive tactile sensor can be modelled as a **parallel-plate capacitor**. It consists of two conductive plates (electrodes) separated by a flexible dielectric layer (figure below).

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/parallel-plate-capacitor.png' }}"
       width="320px"
       alt="Parallel-plate capacitive tactile sensor schematic">
  <figcaption>
    <sub><i>
      Figure 9: Parallel-plate capacitive sensor (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

The formula of the capacitance of a parallel-plate capacitor is given by

$$
C = \varepsilon \frac{A}{d},
$$

where

- $A$ is the area of the electrodes
- $d$ is the thickness of the dielectric layer separating the electrodes
- $\varepsilon$ is the permittivity of the dielectric material placed between the electrodes

When a force $F$ presses on the sensor surface, the dielectric layer is compressed and the distance $d$ between the two electrodes decreases. The key principle is the **inverse proportionality** between capacitance and distance ($C \propto \tfrac{1}{d}$): as the distance $d$ becomes smaller, the capacitance $C$ increases.

This change in capacitance is then converted into an **electrical output signal**. The electronics circuitry used for this purpose is beyond the scope if this class. If interested, a review of different methods can be found below.

Note that in this basic model the object deforms the capacitor mechanically. It does not need to be a conductive object, as it does not interact electrically with the capacitor.

---

<details markdown="1">
<summary>Further Reading: Capacitance Measurement Techniques (tap to unfold)</summary>

[Measurement Methods for Capacitances in the Range of 1 pF–1 nF: A Review](https://www.sciencedirect.com/science/article/pii/S0263224122003335) (O. Kanoun et al.)

</details>

---

- **Capacitive sensing systems**

Capacitive tactile sensors are of two types: **self-capacitance** and **mutual capacitance**. Self-capacitance measures the change in capacitance between a **single electrode** and ground when contact happens, whereas mutual capacitance measures the change in coupling between **two electrodes** when being touched.

*1/ Self-capacitance type*  
In the self-capacitance mode, there is only one electrode, instead of two as in the parallel-plate capacitor seen above. *Self-capacitance* refers to the intrinsic capacitance an electrode has with respect to the circuit ground ($C_{electrode}$), shown in panel (a) of the figure below.


<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/self-capacitance-type.png' }}"
       width="500px"
       alt="Self-capacitance touch sensing schematic">
  <figcaption>
    <sub><i>
      Figure 10: Self-capacitance touch sensing (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

When a conducting object (such as a finger) touches or approaches the dielectric layer, it acts as the second plate of the capacitor. As a result, an additional capacitance $C_{touch}$ appears in parallel with the electrode’s intrinsic capacitance, **increasing** the total measured capacitance. This is illustrated on panel (b).

*2/ Mutual capacitance type*  

In the mutual-capacitance mode, the two electrodes are arranged orthogonally (X- and Y-direction electrodes). Each electrode has its own intrinsic capacitance $C_{electrode}$, and together they form a coupling capacitor with capacitance $C_{mutual}$, as shown in panel (a) of the next figure.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/mutual-capacitance-type.png' }}"
       width="640px"
       alt="Mutual-capacitance touch sensing schematic">
  <figcaption>
    <sub><i>
      Figure 6: Mutual-capacitance touch sensing (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

When a conducting object presses on or approaches the sensor, it distorts the electric field and reduces the coupling between the crossing electrodes. As a result, the measured capacitance **decreases**.

The mutual capacitance type is usually used in tactile arrays, with multiple X and Y electrode lines. At each X–Y crossing a distinct sensing capacitor is formed. This configuration is suitable for high-resolution tactile skins capable of detecting **multiple simultaneous contacts**, making mutual capacitance attractive for larger tactile surfaces.

An illustrative implementation of a capacitive tactile array is the system developed by <a href="https://www.researchgate.net/publication/3330095_A_Flexible_Polymer_Tactile_Sensor_Fabrication_and_Modular_Expandability_for_Large_Area_Deployment">Lee et al.</a>, as shown in the figure below. This sensor employs a tactile array with $16 \times 16$ sensing points. These individual tactile modules can be combined to cover larger areas of a robot’s body, as presented in panel (a).  

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px;">

    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/mutual-capacitance-grid-on-robot.png' }}"
           width="300px"
           alt="(a) Modular mutual-capacitance tactile array deployed on a robotic arm">
      <figcaption>
        <sub><i>
          (a) Modular mutual-capacitance tactile array on robot arm  
          (<a href="https://www.researchgate.net/publication/3330095_A_Flexible_Polymer_Tactile_Sensor_Fabrication_and_Modular_Expandability_for_Large_Area_Deployment">Lee et al.</a>)
        </i></sub>
      </figcaption>
    </div>

    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/mutual-capacitance-grid.png' }}"
           width="300px"
           alt="(b) Close-up views of the mutual-capacitance sensor grid">
      <figcaption>
        <sub><i>
          (b) Close-up views of the mutual-capacitance sensor grid (<a href="https://www.researchgate.net/publication/3330095_A_Flexible_Polymer_Tactile_Sensor_Fabrication_and_Modular_Expandability_for_Large_Area_Deployment">Lee et al.</a>)
        </i></sub>
      </figcaption>
    </div>

  </div>

  <figcaption style="margin-top: 8px;">
    <sub><i>
      Figure 11: Mutual-capacitance tactile sensing array
    </i></sub>
  </figcaption>

</figure>

In this example, the mutual capacitance $C_{mutual}$ of a single sensing node is read in $100\,\mu\text{s}$, which results in the entire grid being scanned 20 times per second. Such fast scanning is essential for generating a high-resolution tactile image in real time, such as required in mobile touch screens.

---

<details markdown="1">
<summary>Quiz (tap to unfold)</summary>

---

1) In a parallel-plate capacitive tactile sensor, what happens when the dielectric layer is compressed by an external force? (single answer possible)

<form id="cap-q1">

  <input type="radio" name="cap-q1" value="option3">
  The capacitance $C$ remains unchanged because the permittivity is constant. <br>

  <input type="radio" name="cap-q1" value="option2">
  The capacitance $C$ decreases because the electrode area $A$ becomes smaller when pressed. <br>

  <input type="radio" name="cap-q1" value="option1">
  The capacitance $C$ increases because the distance $d$ between electrodes becomes smaller. <br> <!-- correct -->

  <input type="radio" name="cap-q1" value="option4">
  The capacitance $C$ remains unchanged because compression does not affect the mechanical stability of the capacitor. <br>

  <button type="button" onclick="checkMCQ(
    'cap-q1',
    'option1',
    'Correct! Compression reduces $d$, and since $C = \\\\varepsilon A / d$, the capacitance increases.',
    'Incorrect. Remember that decreasing $d$ increases $C$. The electrode area does not shrink under compression, permittivity stays constant, and mechanical stability does not determine capacitance.'
  )">
    Check Answer
  </button>

  <p id="cap-q1-feedback"></p>
</form>

---

2) In a self-capacitance tactile sensor, why does the measured capacitance increase when a finger approaches the electrode? (single answer possible)

<form id="cap-q2">

  <input type="radio" name="cap-q2" value="option4">
  Because the electrode spacing decreases under pressure. <br>

  <input type="radio" name="cap-q2" value="option1">
  Because the finger increases the dielectric constant of the material. <br>

  <input type="radio" name="cap-q2" value="option2">
  Because the finger acts as a conductive body, adding an extra capacitance $C_{touch}$ in parallel. <br> <!-- correct -->

  <input type="radio" name="cap-q2" value="option3">
  Because the electrode self-capacitance naturally increases over time. <br>

  <button type="button" onclick="checkMCQ(
    'cap-q2',
    'option2',
    'Correct! The finger acts like a second electrode, increasing the total capacitance measured by the system.',
    'Incorrect. The finger does not change the dielectric constant or compress the structure—the key is that it behaves as a conductive object that adds parallel capacitance.'
  )">
    Check Answer
  </button>

  <p id="cap-q2-feedback"></p>
</form>

---

3) In a mutual-capacitance tactile sensor, why does the measured capacitance decrease when a finger touches an X–Y electrode crossing? (single answer possible)

<form id="cap-q3">

  <input type="radio" name="cap-q3" value="option3">
  Because the finger electrically shorts the X and Y electrodes. <br>

  <input type="radio" name="cap-q3" value="option1">
  Because the dielectric layer is compressed and $d$ decreases. <br>

  <input type="radio" name="cap-q3" value="option4">
  Because the permittivity of air decreases when displaced by the finger. <br>

  <input type="radio" name="cap-q3" value="option2">
  Because the finger distorts the electric field and reduces coupling between the electrodes. <br> <!-- correct -->

  <button type="button" onclick="checkMCQ(
    'cap-q3',
    'option2',
    'Correct! A conductive finger steals electric field lines, reducing X–Y coupling and lowering the mutual capacitance.',
    'Incorrect. Mutual capacitance is not based on compression or dielectric change—the key effect is electric field distortion, not electrode shorting.'
  )">
    Check Answer
  </button>

  <p id="cap-q3-feedback"></p>
</form>

---

4) Which statement correctly distinguishes the basic parallel-plate sensor from the mutual-capacitance sensor? (single answer possible)

<form id="cap-q4">

  <input type="radio" name="cap-q4" value="option1">
  In both cases, the object must be conductive to affect the capacitance. <br>

  <input type="radio" name="cap-q4" value="option4">
  The basic model relies on electric-field disturbance, whereas mutual capacitance relies on mechanical deformation. <br>

  <input type="radio" name="cap-q4" value="option2">
  The basic model uses mechanical deformation of $d$, while mutual capacitance requires a conductive object that disturbs the electric field. <br> <!-- correct -->

  <input type="radio" name="cap-q4" value="option3">
  Mutual capacitance changes only when the dielectric layer is compressed. <br>

  <button type="button" onclick="checkMCQ(
    'cap-q4',
    'option2',
    'Correct! The parallel-plate sensor is mechanical, while mutual capacitance requires a conductive object affecting the electric field.',
    'Incorrect. The basic model does not require conductivity, nor does mutual capacitance rely on mechanical compression—only on electric field disturbance.'
  )">
    Check Answer
  </button>

  <p id="cap-q4-feedback"></p>
</form>

</details>

---

By the way, most touch screens use the mutual-capacitance principle. Ever wondered why you can’t operate them with gloves or wet hands?

<details markdown="1">
<summary>Complement: Touch screens (tap to unfold)</summary>

<div style="text-align: center;">
  <iframe width="640" height="360"
          src="https://www.youtube.com/embed/IdWXT391FJE"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
  </iframe>
</div>

<div style="text-align: center;">
    <sub><i>
      Effect of conductive object in capacitive tactile sensors (available on <a href="https://youtu.be/IdWXT391FJE">YouTube</a>)
    </i></sub>
</div>

</details>

---

#### Piezoelectric Sensors

generate charge proportional to applied forces (tactile sensing 5.2.)

#### Optical Sensors

tactile sensing 5.2.3

#### Magnetism-based Sensors

tactile sensing 5.2.4

#### Electrorheological / Magnetorheological

tactile sensing 5.2.7 – 5.2.8

---

### Advanced Tactile Sensing

Now that we have seen different tactile sensing technologies, let’s take a closer look at some more advanced tactile sensors.

When used in robotics, tactile sensors often need to cover broad areas. This can be challenging, as the surfaces where the sensors must be attached can have many different shapes (cylindrical, spherical, etc.). To cover these surfaces in the best possible way, tactile sensing grids need to be flexible (for cylindrical surfaces) or even stretchable (for spherical surfaces). The difference between flexible and stretchable lies in the fact that a flexible sensor can bend, whereas a stretchable sensor can both bend and expand (i.e. become longer). Below are some examples of flexible and stretchable tactile sensors.

Lastly, there also exist alternative ways to sense touch. One advanced tactile sensing technique makes use of vision. These vision-based tactile sensors are presented below.

#### Flexible Tactile Sensors

Flexible tactile sensors are those that **bend** but do not undergo large tensile strain.  

-> stretchable (Review of Printable Flexible and Stretchable Tactile Sensors, Kumar et al.)
-> have a look at meta's fingertip tactile sensor

<!--  tactile sensing chapter 4.4.1 

**Piezoresistive Flexible Sensors**
- CNT-based piezoresistive films on flexible substrates (e.g., CNT/TPU, CNT/PDMS).  
- Graphene-based flexible piezoresistive layers.  
- Silver, copper, or nickel nanoparticle inks printed on PET, PI, or paper.  
- Polymer composites such as PLA–graphene printed as thin flexible layers.

**Capacitive Flexible Sensors**
- Parallel-plate capacitors printed on PET or PEN films.  
- Inkjet-printed interdigitated capacitors on flexible substrates.  
- PDMS microstructured dielectric layers cast with 3D-printed molds and laminated onto flexible substrates.

**Piezoelectric Flexible Sensors**
- PVDF or PVDF-TrFE printed films (inkjet or electrospun) on flexible PET/PEN substrates.  
- Hybrid printed PVDF pressure sensors on flexible films.

**Triboelectric Flexible Sensors**
- 3D-printed triboelectric nanogenerators using flexible substrates such as ABS, PDMS, or paper.  
- Printed electrodes + triboelectric polymer layers without stretchability.
-->

#### Stretchable Tactile Sensors

Stretchable tactile sensors must withstand **large strain** (tens to hundreds of percent). 

<!--  tactile sensing chapter 4.4.3 

**Stretchable Piezoresistive Sensors**
- CNT/PDMS and CNT/TPU stretchable nanocomposites.  
- TPU/carbon-black/NaCl printable stretchable composites.  
- Silver nanoparticle + CNT elastomer composites.  
- Graphene aerogel stretchable sensors (often serpentine or 3D-printed).  
- Crack-induced Ag nanowire stretchable networks.  
- Printed liquid-metal (EGaIn) microchannels or LM-paste-based strain sensors.  
- Multicore–shell coaxially printed stretchable fibers (ionic liquid core + elastomer shell).

**Stretchable Capacitive Sensors**
- Stretchable dielectric elastomers (Ecoflex, PDMS) with printed stretchable electrodes (AgNW, CNT).  
- CNT/PDMS stretchable capacitive taxels.  
- Fully stretchable e-skin combining capacitive pressure + strain sensing.  
- Hybrid 3D-printed elastomer + silver-flake capacitive arrays.

**Stretchable Piezoelectric Sensors**
- PVDF nano/microfibers printed on wavy or buckled elastomeric substrates (prestretch-release method).  
- Self-powered piezoelectric stretchable pressure sensors.

**Stretchable Triboelectric Sensors**
- Fully 3D-printed ultraflexible triboelectric nanogenerators.  
- Stretchable triboelectric films combined with hydrogels or PDMS layers.

-->

#### Vision-Based Tactile Sensors

-> make link to vision course
-> video from TEDX MIT, guy explains how his vision based tactile sensor works

---

### Issues and Difficulties

<!--  tactile sensing chapter 4 (4.5 Electronics/Electrical requirements) -->

#### Wealth of Computation

#### Wiring Complexity

While integrating tactile sensors on a robot body, the wires that transmit the tactile data can be a big issue. The number of needed wires increases with the number of tactile sensors used. Often, the available space for wires is limited.

<!-- 
tactile sensing chapter 4.4.5
emphasize the wealth of computation, issues with electronic and cabling to tackle so much input, compute, etc. give examples of how this is computed today.
-->

add challenges of electronics: wiring, data transfer, power consumption  
-> examples of how it is done today
-> look at latest paper of Gordon Cheng (TUM) on humanoïd robot

<!-- 
### Expectations of Tactile Systems

#### Task Related Requirements

The task that has to be executed by the robotic system defines what type of tactile sensor is implemented in it.

The following expectations are specifically for humanoid applications -> make more general.
These requirements are more general stuff about sensors, not specifically about tactile sensors

#### Limited Space

Tactile systems are most often placed in areas of the robot where space is limited, typically on a finger. Therefore, it is desirable to use multifunctional sensors, for example sensors that can detect not only tactile but also thermal properties.

#### Spatial Resolution

The resolution of a tactile sensing array does not need to be the same across all locations. For example, a tactile sensor on a fingertip needs to be more sensitive than one on the shoulder and should therefore contain more elements in its sensing grid.

#### Sensing Range and Directionality

Depending on its application, a tactile sensor should be able to detect forces over a wide range. It should be capable of sensing both very light objects and heavier ones without being damaged. Moreover, the sensor should also be able to detect the direction of the applied force, providing a better understanding of the object being touched.

#### Reaction Time

When a tactile sensor is used for controlling a robot, it must provide feedback quickly in order to enable real-time reactions.
-->

<!--
---

### 2.2.3.5 : Sensor Location

#### Joint

-> encoder, potentiometer, motor-current, etc.

#### Links

#### Tip

-> tactile arrays, 6D F/T sensors, etc.

#### Challenges  

add the challenges that come with the sensor location (integrated into skin surfaces, adequate friction to handle objects securely, robust enough to survive repeated impacts, etc.)  
-> these are task related challenges (section 4 tactile sensing)
-->

<!-- 
---

### 2.2.3.6 : Exercices

add exercices
look at Aude's propositions on slack
Take same robot examples as in the kinematics course (delta ...) so that the student can work on the basis he already has
1/ Knowing the different tactile sensors from above, where should the sensor be placed if we wish F/T control of robot to lift object up and down (joint, wrist)
2/ ... push object
3/ peg in a hole
4/ ...
-->

---



## Credits
<!-- List all the sources that you used to create the page   -->

- [Handbook of Robotics, Springer](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20) (Chapter 19. Force and Tactile Sensors)

- [Tactile Sensing Technologies, Springer](https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5)

- [Force-Torque Sensing in Robotics](https://unige.iris.cineca.it/handle/11567/942466) (F. J. Andrade Chavez)

## Additional Resources

### Videos

- [Adaptive Fingers Coordination for Robust Grasp and In-Hand Manipulation Under Disturbances and Unknown Dynamics](https://ieeexplore.ieee.org/document/10146043) (F. Khadivar, A. Billard, IEEE Transactions on Robotics, 2023)  
*Video example: Moving a Champagne Glass*

- [Bimanual compliant tactile exploration for grasping unknown objects](https://ieeexplore.ieee.org/document/6907804) (N. Sommer, M. Li, A. Billard, ICRA 2014)  
*Example of Exploration: Shape detection*

- [A dynamical system approach for detection and reaction to human guidance in physical human–robot interaction](https://doi.org/10.1007/s10514-020-09934-9) (M. Khoramshahi, A. Billard, ICRA 2020)  
*Example of Reaction: Arm Massage by Robot*

### Additional Resources
<!-- List all the sources that could be relevant to a reader who would like to know more, including  the page on haptics under Human-Robot Interaction chapter -->

- [Measurement Methods for Capacitances in the Range of 1 pF–1 nF: A Review](https://www.sciencedirect.com/science/article/pii/S0263224122003335) (O. Kanoun et al.)

- [Intrinsic sense of touch for intuitive physical human-robot interaction](https://www.science.org/stoken/author-tokens/ST-2065/full#) (M. Iskandar, A. Albu-Schäffer and A. Dietrich)


<!--  
Initial comments:

Review means to perceive touch/force: list sensors from force measurement at joint versus along link, start with 3D force sensors and 6D force/torque sensors, move to tactile sensors (traditional rigid capacitive ones) to more advanced tactile sensors (bendable, stretchable and their applications), cover also new vision-based tactile sensors making a link to page on vision.

Review how to make sense of information provided by these sensors. For F/T sensors, how to detect accurately the direction and amplitude of the force, frequency, precision, emphasize issues with location of the sensor (size and must usually be placed at tip of a robot end-effector, sometimes at joint) - cover also alternative means to infer force from current on motors.

For tactile sensors, emphasize the wealth of computation, issues with electronic and cabling to tackle so much input, compute, etc. give examples of how this is computed today.

Resources you can start with are: 
https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5
https://ieeexplore.ieee.org/abstract/document/5339133

Focus on artificial sensors for robots here and use material on human skin and sensing for the haptics chapter. You can work on the two pages simultaneously if this helps.

and then for more recent sensors:
https://spj.science.org/doi/full/10.34133/2019/3018568

-->


[Back to Top](#start)