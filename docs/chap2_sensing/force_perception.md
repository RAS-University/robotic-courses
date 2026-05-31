---
title: 2.3 Force Perception 
parent: "Chapter 2: Sensing in Robotics"
has_children: false
nav_order: 3
layout: numbered
author: Mael Studer, Aude Billard (EPFL)
chapter: 2
section: 3
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<!-- Back-To-Top Button -->
<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

<!-- Style definitions -->
<style>

  .goal-title {
    /* Text */
    font-weight: bold;
    font-style: normal;
    color: #0053d9ff;
  }
  .goal-window {
    /* Layout */
    display: inline-block;
    margin: 0.6em auto 0.3em auto; /* vertical spacing */
    padding: 0.6em 1.4em; /* inner spacing */
    /* Border and shape */
    border-left: 4px solid #0053d9ff;
    /* Text */
    color: #053838;
  }

  .window-title {
    /* Text */
    font-weight: bold;
    font-style: normal;
    text-align: left;
  }

  .note-window {
    /* Layout */
    max-width: 600px;
    margin: 3em 0 3em auto;
    padding: 0.6em 1.4em;
    /* Border and shape */
    border-right: 4px solid #999;
    border-radius: 10px 0 0 10px;
    /* Background */
    background: #f5f5f5;
    /* Text */
    color: #717171ff;
    font-size: 0.8em;
  }

  .quiz-btn {
    /* Layout */
    display: inline-block;
    margin: 2em auto 1.5em auto;
    padding: 0.55em 1.2em;
    /* Border and shape */
    border: 1px solid #f0bf1fff;
    border-radius: 10px;
    /* Background */
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(186, 115, 2, 0.08);
    /* Text */
    color: #dfb21dff;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }
  .quiz-btn:hover {
    background: #f9efcfff;
  }
  .quiz-btn:active {
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(186, 115, 2, 0.08);
  }
  .quiz-details {
    margin: 1em 0;
    text-align: center;
  }
  .quiz-details > *:not(summary) {
    text-align: left;
  }
  .quiz-details > summary {
    list-style: none;
  }
  .quiz-details > summary::-webkit-details-marker {
    display: none;
  }
  .quiz-details > summary .quiz-label::after {
    content: " (tap to show)";
    font-weight: 700;
  }
  .quiz-details[open] > summary .quiz-label::after {
    content: " (tap to hide)";
    font-weight: 700;
  }
  .quiz-window {
    /* Layout */
    margin: 0 auto 0 auto; /* space below button */
    padding: 0.6em 1.4em;
    /* Border and shape */
    border: 1px solid #333;
    border-radius: 10px;
  }
  .quiz-question-text {
    /* Layout */
    margin-bottom: 0.6em;
    /* Text */
    font-weight: 600;
    color: #333;
  }

  .section-title {
    /* Layout - Reduced margins and padding to match text flow */
    margin: 1em 0; 
    padding: 0.3em 0.8em; 
    /* Border and shape */
    border: 1px solid #ddd;
    border-radius: 8px;
    /* Background */
    background: #fafafa;
    /* Text */
    font-size: 1em; 
    font-weight: 500; /* Use 400 for completely normal*/
    line-height: normal;
  }
  .section-label {
    font-weight: 500;
    color: #4F3DDB;
    margin-right: 0.4em;
  }

  .solution-btn {
    /* Layout */
    display: inline-block;
    margin: 0.4em 0 0.4em 1.2em;
    /* Border & shape */
    border-radius: 6px;
    /* Background */
    background: transparent;
    /* Text */
    color: #2e7d32;
    font-weight: 600;
    font-size: 0.95em;
    cursor: pointer;
    user-select: none;
  }
  .solution-btn:hover {
    text-decoration: underline;
  }
  .solution-details > summary .solution-label::before {
    content: "▶ ";
    font-size: 1.2em;
  }
  .solution-details[open] summary .solution-label::before {
    content: "▼ ";
    font-size: 1.2em;
  }
  .solution-details > summary .solution-label::after {
    content: " (tap to show)";
    font-weight: 400;
  }
  .solution-details[open] > summary .solution-label::after {
    content: " (tap to hide)";
  }
  .solution-details > summary {
    list-style: none;
  }
  .solution-details > summary::-webkit-details-marker {
    display: none;
  }
  .solution-window {
    /* Layout */
    margin: 0.6em 0 1em 0;
    padding: 0.6em 1em;
    /* Border */
    border-left: 4px solid #2e7d32;
    /* Background */
    background: #f6fbf7;
    /* Text */
    color: #2b2b2b;
  }

  .optional-btn {
    /* Layout */
    display: inline-block;
    margin: 0.6em 0 0.6em 0;
    /* Shape */
    border-radius: 6px;
    /* Background */
    background: transparent;
    /* Text */
    color: #555555;
    font-weight: 600;
    font-size: 0.95em;
    cursor: pointer;
    user-select: none;
  }
  .optional-btn:hover {
    text-decoration: underline;
  }
  .optional-details summary .optional-label::before {
    content: "▶ ";
    font-size: 1.2em;
  }
  .optional-details[open] > summary .optional-label::before {
    content: "▼ ";
    font-size: 1.2em;
  }
  .optional-details > summary .optional-label::after {
    content: " (optional)";
    font-weight: 400;
    color: #777777;
  }
  .optional-details[open] > summary .optional-label::after {
    content: " (tap to hide)";
  }
  .optional-details > summary {
    list-style: none;
  }
  .optional-details > summary::-webkit-details-marker {
    display: none;
  }
  .optional-window {
    /* Layout */
    margin: 0.6em 0 1em 0;
    padding: 0.6em 1em;
    /* Border */
    border-left: 4px solid #000000;
    /* Background */
    background: #f2f2f2;
    /* Text */
    font-size: 0.95em;
  }

</style>

# Force Perception (in Robotics)

- Table of Contents
{:toc}

## Prerequisites

<!-- ⚠️ Adapt in the end ⚠️ -->

- Read [Kinematics]({{ '/docs/chap1_basic_motion_ctrl/kinematics' | relative_url }}) and [Dynamics]({{ '/docs/chap1_basic_motion_ctrl/dynamics' | relative_url }})
- Read [Sensors and Sensing]({{ '/docs/chap2_sensing/new-sensors-for-robotics' | relative_url }}) page
- Basics of mechanics (Hooke's Law, stress-strain curve, etc.)

## General Motivation

Robots are expected to interact closely and safely with humans as well as with their environment. When a robot gets into **physical interaction** with another real-world **agent**, such as a human, an object, or even another robot, forces are exchanged between two agents. This chapter focuses on how to measure these interaction **forces**.

Same as humans, robots can perceive interaction forces at different levels. When lifting an object, humans first sense the **overall force**, such as its weight, then acquire more **fine-grained** information through touch, such as local pressure distribution. This distinction leads to the use of **force sensing** for global interaction forces and **tactile sensing** for localized contact information in robotics. On this page we will focus on force sensing, more about tactile sensing can be found [here]({{ '/docs/chap2_sensing/tactile_perception' | relative_url }}).  

Force perception is almost always needed in interactions between a robot and another active agent (human/robot). During these interactions, the robot continuously acts, perceives and **adapts in real time** based on the feedback it receives from the other agent. This enables, for example, safe operation of robots **around humans**: the robot can detect abnormal contact and **adjust its movement** to avoid harm. Have a look at the example below.

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/force_perception/reaction_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Robotic Hand interacting with Fake Arm
    (<a href="https://doi.org/10.1007/s10514-020-09934-9">M. Khoramshahi, A. Billard, ICRA 2020</a>)
  </i></sub></div>
</div>

*Key points of the video:*  
A robotic hand is shown holding continuous contact with a fake human arm. The **arm is moved** by a person, making it a **dynamic interaction** involving another active agent. A **force sensor** located at the robot’s end-effector measures the interaction forces, which allows the robotic hand to adapt its movement continuously. In the end of the video, we can see that the robot reacts differently to fast disturbing contacts: non-consistent disturbances are rejected. This shows that the robot can **distinguish intentional human guidance from accidental disturbances**.  

As you can imagine, force perception is used in many areas. From biomedical robotics such as [surgical robots]({{ '/docs/chap14_robotic_application_domain_II/surgical' | relative_url }}), to rehabilitation systems like [exoskeletons]({{ '/docs/chap14_robotic_application_domain_II/Exoskeletons' | relative_url }}) and [humanoid robots]({{ '/docs/chap10_robotic_application_domain_I/humanoids' | relative_url }}).

---

<!--

Before moving on, try the quiz below.

<details class="quiz-details" markdown="1">
<summary class="quiz-btn"><span class="quiz-label">Quiz</span></summary>
<div class="quiz-window">

<div class="quiz-question-text">
Why is the sense of touch used in robotics? (multiple answers possible)
</div>

<form id="quiz-motivation">

  <input type="checkbox" name="quiz-motivation" value="option1">
  It enables robots to interact safely with humans and their environment.<br>

  <input type="checkbox" name="quiz-motivation" value="option2">
  It replaces the need for vision in all robotic tasks.<br>

  <input type="checkbox" name="quiz-motivation" value="option3">
  It allows robots to perceive forces exchanged during physical interactions.<br>

  <input type="checkbox" name="quiz-motivation" value="option4">
  It helps robots adapt their behavior during physical contact.<br><br>

  <button type="button" onclick="checkMultipleAnswersMapped(
    'quiz-motivation',
    ['option1', 'option3', 'option4'],
    {
      option1: 'A) Correct. Touch sensing is essential for safe physical interaction with humans and the environment',
      option2: 'B) Incorrect. Touch does not replace vision, but complements it.',
      option3: 'C) Correct. Touch allows robots to perceive forces exchanged during contact.',
      option4: 'D) Correct. Touch sensing allows robots to adapt their behavior in real time during physical contact.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-motivation-feedback"></p>
</form>

<div class="quiz-question-text">
Which statements correctly describe the three interaction categories seen earlier? (multiple answers possible)
</div>

<form id="quiz-categories">
  <input type="checkbox" name="quiz-categories" value="option1">
  In manipulation, the robot uses touch to physically control an object and adapt its actions based on interaction forces.<br>

  <input type="checkbox" name="quiz-categories" value="option2">
  In exploration, the robot uses touch to discover object properties, with the goal of controlling the object during interaction.<br>

  <input type="checkbox" name="quiz-categories" value="option3">
  In reaction, the robot adapts its behavior in real time to assure safe interaction with another active agent.<br><br>

  <button type="button" onclick="checkMultipleAnswersMapped(
    'quiz-categories',
    ['option1', 'option3'],
    {
      option1: 'A) Correct. Manipulation focuses on physically controlling an object and adapting actions based on interaction forces.',
      option2: 'B) Incorrect. Exploration targets learning about object properties only, not at directly controlling the object.',
      option3: 'C) Correct.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-categories-feedback"></p>
</form>

</div>
</details>

---

-->

## Course Content

Now that we have seen **why** robots need to perceive forces, we can dive into **how** force perception is implemented. Force perception is referred to as **intrinsic sensing**, based on the **location of the sensors** on the robot (see figure below). Intrinsic sensing relies on sensors placed **within the mechanical structure** of the robot.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/intrinsic_sensors.jpg' }}"
       width="530"
       alt="Location of intrinsic sensors on a robot arm">
  <figcaption>
    <sub><i>
      Figure 1: Location of intrinsic sensors on a robot arm
      (<a href="https://www.photonics.com/Articles/Force-Torque-Sensors-Expand-Robotic-Capabilities/a63234" target="_blank">Photonics</a>)
    </i></sub>
  </figcaption>
</figure>

<div class="goal-window">
  <div class="goal-title">Summary</div>
  <strong>Force sensing</strong> measures the global forces and torques applied to the system at a specific point, considered infinitesimally small. It captures the <strong>overall push, pull and twist</strong> experienced by the robot at that location, usually at a joint or a structural element.  
</div>

<!--
<div class="note-window">
  <div class="window-title">Note</div>
  The separation of force perception into intrinsic and extrinsic sensing was proposed in 
  <a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5" target="_blank">Tactile Sensing Technologies, Springer</a>.
</div>
-->

This page is separated into the following sections:

- **Section 2.3.3.1: Introduction to Wrench vector**  
  Definition of the 6D force-torque vector.

- **Section 2.3.3.2: Force/Torque Sensors**  
  Sensing principle and sensor implementation.

- **Section 2.3.3.3: Sensorless Force/Torque Estimation**  
  Model-based and model-free force/torque estimation.

---

### Introduction to Wrench Vector

Let us begin with a quick reminder of **forces** and **torques** (also called moments) we want to measure. Force is given in Newtons [N] and produces **linear** movement, whereas torque is given in Newton-meters [Nm] and produces **rotational** movement. They are both **vector** quantities defined in 3D space, meaning they can be decomposed into components of the orthonormal basis of $\mathbb{R}^3$ (x, y, and z axis).

$$\text{Force: } \mathbf{F} = (F_{x}, F_{y}, F_{z}) \in \mathbb{R}^3$$
$$\text{Torque: } \mathbf{M} = (M_{x}, M_{y}, M_{z}) \in \mathbb{R}^3$$

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/forces-moments-schematic.png' }}"
       width="240"
       alt="Forces and moments schematic (Fx, Fy, Fz, Mx, My, Mz)">
  <figcaption>
    <sub><i>
      Figure 2: Forces and torques acting on sensor 
      (<a href="https://link.springer.com/chapter/10.1007/978-981-99-1509-5_32">ICDEC 2022, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

The goal of **force-torque (F/T) sensing** is to obtain a complete description of all forces and torques exchanged at the contact location. This is possible because the sum of all forces and the sum of all moments acting on the system must be equal to zero (in static equilibrium):

$$ \sum \mathbf{F} = 0 \qquad \sum \mathbf{M} = 0 $$

At this point, we can introduce the **wrench vector** $W$. It represents the complete mechanical interaction at the contact point, combining the force and torque vectors into a single vector in $\mathbb{R}^6$. The wrench is the **unknown quantity** to be determined in F/T sensing.

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

Where $F_c$ and $M_c$ are the force and moment vectors applied at the contact location.

As described earlier, F/T sensing in robotics relies on intrinsic sensors, which are **embedded** within the robot’s structure. In this chapter, we will have a look at two different F/T sensing approaches: first, dedicated **F/T sensors** that **directly** measure these quantities, and second, **sensorless methods** that estimate forces and torques **indirectly**.

Try the quiz to make sure that you understood forces and torques.

<details class="quiz-details" markdown="1">
<summary class="quiz-btn"><span class="quiz-label">Quiz</span></summary>
<div class="quiz-window">

<div class="quiz-question-text">
Which statements correctly describe forces? (multiple answers possible)
</div>

<form id="quiz-forces">
  <input type="checkbox" name="quiz-forces" value="option1">
  Forces are vector quantities that can be decomposed along the three axes of $\mathbb{R}^3$.<br>

  <input type="checkbox" name="quiz-forces" value="option2">
  Forces are measured in Newton-meters [Nm] and mainly produce rotational movement.<br>

  <input type="checkbox" name="quiz-forces" value="option3">
  Forces produce linear movement and are expressed in Newtons [N].<br><br>

  <button type="button" onclick="checkMultipleAnswersMapped(
    'quiz-forces',
    ['option1', 'option3'],
    {
      option1: 'A) Correct. Forces are 3D vectors and can be decomposed along the x, y, and z axes.',
      option2: 'B) Incorrect. Newton-meter is the unit of torque, not force.',
      option3: 'C) Correct. Forces are expressed in Newtons and produce linear movement.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-forces-feedback"></p>
</form>

<div class="quiz-question-text">
Which statement correctly describes torques? (multiple answers possible)
</div>

<form id="quiz-torques">
  <input type="checkbox" name="quiz-torques" value="option1">
  Torques are scalar quantities that describe the intensity of a rotational effect.<br>

  <input type="checkbox" name="quiz-torques" value="option2">
  Torques can only be measured if the system is not in static equilibrium.<br>

  <input type="checkbox" name="quiz-torques" value="option3">
  Torques are vector quantities expressed in Newton-meters [Nm] that produce rotational motion.<br><br>

  <button type="button" onclick="checkMultipleAnswersMapped(
    'quiz-torques',
    ['option3'],
    {
      option1: 'A) Incorrect. Torques are vector quantities, not scalars.',
      option2: 'C) Incorrect. Torques can be measured even in static equilibrium.',
      option3: 'B) Correct. Torques are vectors expressed in Newton-meters and produce rotational motion.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-torques-feedback"></p>
</form>

</div>
</details>

---

### Force/Torque Sensors

Force-torque sensors are classified based on the number of axes (or degrees of freedom DOF) they measure.

- **Three-Dimensional Force Sensors (3DOF):**  

  These sensors measure **only forces**, not torques. They provide information about the three translational force components along the $x$, $y$ and $z$ axes. The corresponding wrench vector is:

  $$
  W = [F_x, F_y, F_z]^T \in \mathbb{R}^3
  $$

  3DOF sensors are used when only translational forces matter. They are often mounted near the end-effector and can for example measure the weight of an object or detect simple contact with a surface.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/3DOF-translation-forces.png' }}"
       width="420"
       alt="Translational forces acting on end-effector">
  <figcaption>
    <sub><i>
      Figure 3: Illustration of translational forces acting on the end-effector. (a) diagonal force, (b) vertical force
    </i></sub>
  </figcaption>
</figure>

- **Six-Dimensional Force/Torque Sensors (6DOF):**  

  These sensors measure both **forces and torques**, covering the three translational and three rotational axes. Besides pushing or pulling forces, they can also measure bending and twisting effects. The wrench vector they measure is:

  $$
  W = [F_x, F_y, F_z, M_x, M_y, M_z]^T \in \mathbb{R}^6
  $$

#### A) Sensing Principle and Mechanical Implementation

The sensing principle of F/T sensors relies on detecting **strain** (deformation) in an elastic structure. When a force is applied, the elastic structure deforms and this deformation is converted into an electrical signal using strain gauges. By measuring the strain in the structure, the applied force can be determined using **Hooke’s law**. The detail of the mathematical model is shown later.

Below are examples of **elastic structures** used in F/T sensors:

<h4 class="section-title">1) Cross-Beam Structure:</h4>

  The elastic base is shaped like a **crossbar**, consisting of an **inner ring** (central hub) connected to the fixed **outer ring** by flexible supporting beams. The whole piece is machined out of a single piece of material, to ensure high stiffness and to avoid hysteresis.  

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/cross-beam-structure.png' }}"
       width="420"
       alt="Cross-beam force/torque sensor structure with square and round base">
  <figcaption>
    <sub><i>
      Figure 4: Cross-Beam force/torque sensor structure. (a) square base, (b) round base  
      (<a href="https://doi.org/10.1080/15397734.2024.2382841">B. Sümer, M. Özin et al., Mechanics Based Design of Structures and Machines 2025</a>)
    </i></sub>
  </figcaption>
</figure>

  When load is applied to the central hub, the **beams deform** depending on the force direction. Vertical forces ($F_z$) cause the beams to bend up or down, while shear forces and torques induce a complex combination of tension and compression across the different arms of the cross. Below we can observe the effect of a horizontal force $Fx$ and a torque $Mz$ acting on the central hub.

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px;">

  <div style="flex: 1;">
    <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/cross-beam-structure-Fx.png' }}"
         width="300"
         alt="Deformation due to horizontal force Fx">
    <figcaption>
      <sub><i>
        (a) Deformation due to horizontal force $F_x$
      </i></sub>
    </figcaption>
  </div>
  <div style="flex: 1;">
    <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/cross-beam-structure-Mz.png' }}"
         width="300"
         alt="Deformation due to moment Mz">
    <figcaption>
      <sub><i>
        (b) Deformation due to moment $M_z$
      </i></sub>
    </figcaption>
  </div>

  </div>

  <figcaption style="margin-top: 8px;">
    <sub><i>
      Figure 5: Visualisation of the cross-beam structure deformation  
      (<a href="https://doi.org/10.1080/15397734.2024.2382841">B. Sümer, M. Özin et al., Mechanics Based Design of Structures and Machines 2025</a>)
    </i></sub>
  </figcaption>

</figure>

  **Strain gauges** are directly bonded on the surfaces of the beams to measure their strain.  

<h4 class="section-title">2) Parallel Structure (Stewart Platform):</h4>

  This structure consists of an **upper mobile** platform and a **lower fixed** base connected by **six legs**. An example of a miniature stewart platform is shown in the next figure.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/stewart-platform-structure.png' }}"
       width="240"
       alt="Monolithic Stewart platform force/torque sensor structure with flexural joints">
  <figcaption>
    <sub><i>
      Figure 6: Example of monolithic Stewart platform structure  
      (<a href="https://doi.org/10.1109/icinfa.2015.7279538">K. Li, B. Pan et al., ICInfA 2015</a>)
    </i></sub>
  </figcaption>
</figure>

  This design distributes the applied load through the structure, causing primarily axial strain (tension or compression) along the longitudinal axis of the limbs. **Strain gauges** are bonded on both sides (front and back) of the legs connecting the two platforms to measure the strain.

#### B) Mathematical Model

From the electrical signal obtained from the strain gauges, we can determine the forces and torques acting on the sensor.

Let us first recall **Hooke’s law** in its **one-dimensional** form. It is stating that for an elastic element, the applied force is proportional to its deformation (like a spring):

$$
F = k \cdot u
$$

where $F$ is the applied force, $u$ is the deformation and $k$ is the stiffness of the elastic element.  

*Assumption: The elastic structure stays within the **linear region** of the stress–strain curve, where Hooke’s law applies. This linear relationship is assumed in the mathematical model.*

By extending Hooke’s law to **multiple dimensions**, we can write the relationship between the applied wrench $W$ and the measured strain vector $u$ as follows:

$$
W = K \cdot u
$$

where:
- $W \in \mathbb{R}^6$ is the wrench vector (combining forces and torques)  
- $K \in \mathbb{R}^{6 \times n}$ is the stiffness matrix of the elastic structure
- $u = [u_1, u_2, \dots, u_n]^T$ is the vector of strain measurements
- $n \geq 6$ is the number of strain sensing points (strain gauges)

The stiffness matrix $K$ depends on the geometry and material properties of the elastic structure.  
In practice, $K$ is often determined **experimentally** during a **calibration procedure**, by applying known loads to the sensor and measuring the resulting strain.  

---

### Sensorless Force/Torque Estimation  

It is also possible to determine external forces and torques without embedding dedicated sensors. **Sensorless** methods rely on the robot’s internal data (available without special hardware), such as the amount of current drawn by its motors. In most motors, the generated torque is proportional to the motor current. By comparing the **actual torque** output (derived from current) with the **theoretically required torque**, it is possible to determine the existence and magnitude of an external force.

Below, we have a look at two different approaches to estimate external forces using motor current: **model-based** and **model-free** (Neural Network–based).

#### A) Model-Based Estimation

This approach is called model-based, as it uses the **robot’s dynamics and kinematics** (= model) to compute the external force applied on the robot.  

Contact force estimation follows three steps:  

- Estimate the external **joint torques** induced by the force  
- Compute the **Jacobian** at the contact location  
- Convert the joint torques into **cartesian force**

<h4 class="section-title">1) Estimating the external joint torque \(\tau_{\text{ext}}\)</h4>

The total physical effort acting on the robot's joints is the sum of the torque produced by the motors and the torque coming from the external environment:

$$ \tau_{\text{total}} = \tau_{\text{motor}} + \tau_{\text{ext}} \in \mathbb{R}^n$$

In this equation:

- $n$: Number of joints
- $\tau_{\text{motor}}$: Vector of torques applied by the robot's motors. We know these values because it is what our controller commands.  
- $\tau_{\text{ext}}$: Vector of unknown torques induced by the external contact force. This is what we want to find.  

We start with the basic **Lagrangian expression** of the robot’s dynamics (seen previously in the [Dynamics](/docs/chap1_basic_motion_ctrl/dynamics#part2-the-lagrangian-formulation-of-dynamics) course):

$$
M(\theta)\ddot{\theta} + C(\theta,\dot{\theta})\dot{\theta} + g(\theta) = \tau_{\text{total}}
$$

Where:

- $\theta \in \mathbb{R}^n$: vector of joint variables (position)
- $\ddot{\theta}, \dot{\theta}$: joint acceleration and velocity
- $M(\theta)$: mass matrix
- $C(\theta,\dot{\theta})\dot{\theta}$: vector accounting for Coriolis or centrifugal torques  
- $g(\theta)$: vector of gravity torques
- $\tau_{\text{total}}$: sum of all torques applied on the robot ($\tau_{\text{motor}} + \tau_{\text{ext}}$)

We could simply solve this Lagrangian equation for $\tau_{\text{ext}}$, but real-world acceleration data ($\ddot{\theta}$) is too noisy to be used. Instead, we use the **Residual Method**, which transforms the problem into an **integral-based** problem. This allows us to estimate $\tau_{\text{ext}}$ using only the clean data we have: joint positions ($\theta$), joint velocities ($\dot{\theta}$) and motor torques ($\tau_{\text{motor}}$).

A complete description of that computation step is shown in the drop-down below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Going deeper: Mathematical derivation of $\tau_{\text{ext}}$</span>
  </summary>

  <div class="optional-window">

    <h5 style="margin-top: 20px;">1. Law of Momentum</h5>

    <p>
      We use the <b>Law of Momentum</b>. In robotics, the generalized momentum is defined as:
    </p>

    \[ p = M(\theta)\dot{\theta} \]

    <p>
      Next, we take the derivative of the momentum (\(\dot{p}\)):
    </p>

    \[ \dot{p} = M(\theta)\ddot{\theta} + \dot{M}(\theta)\dot{\theta} \]

    <p>
      This is where we need the <b>Lagrangian Dynamics</b> formula that we have seen above. Let's arrange the terms:
    </p>

    \[ M(\theta)\ddot{\theta}  = \tau_{\text{motor}} + \tau_{\text{ext}} - C(\theta, \dot{\theta})\dot{\theta} - g(\theta)\]

    <p>
      Then replace the \( M(\theta)\ddot{\theta} \) term in our momentum derivative with this entire Lagrangian expression. Like this we can get rid of the noisy acceleration \(\ddot{\theta}\):
    </p>

    \[ \dot{p} = \tau_{\text{motor}} + \tau_{\text{ext}} - C(\theta, \dot{\theta})\dot{\theta} - g(\theta) + \dot{M}(\theta)\dot{\theta} \]

    <p>
      Moreover, we can use the mass matrix property \( \dot{M}(\theta) = C(\theta, \dot{\theta}) + C^T(\theta, \dot{\theta}) \). After replacing it in the formula and simplifying, we get to the following relationship:
    </p>

    \[ \dot{p} = \tau_{\text{motor}} + \tau_{\text{ext}} + C^T(\theta, \dot{\theta})\dot{\theta} - g(\theta) \]

    <h5 style="margin-top: 20px;">2. Defining the Residual \(r(t)\)</h5>

    <p>
      We define the <b>Residual \(r\)</b>, a variable that imitates the external torque.
    </p>

    \[ r \rightarrow \tau_{\text{ext}} \]

    <p>
      The idea is to define the <b>change</b> in our estimate (\(\dot{r}\)) so that it is proportional to the error between the true external torque and our current estimate:
      \[ \dot{r} = K (\tau_{\text{ext}} - r) \]
    </p>

    <p>
      Where <b>\(K\)</b> is the diagonal gain matrix, which determines how fast the residual reacts.
    </p>

    <p>
      From our momentum balance we can isolate \(\tau_{\text{ext}} \):
      \[ \tau_{\text{ext}} = \dot{p} - \tau_{\text{motor}} - C^T(\theta, \dot{\theta})\dot{\theta} + g(\theta) \]
    </p>

    <p>
      When then plug this expression of \(\tau_{\text{ext}} \) back into \(\dot{r}\):
      \[ \dot{r} = K (\dot{p} - \tau_{\text{motor}} + C^T(\theta, \dot{\theta})\dot{\theta} + g(\theta) - r) \]
    </p>

    <p>
      Finally, we integrate both sides from \(0\) to \(t\). The derivative of momentum (\(\dot{p}\)) turns back into the original momentum (\(p = M\dot{\theta}\)).
    </p>

    <p>
      This final implementation uses only data we have (joint positions, joint velocities and motor torques):
    </p>

    \[ r(t) = K \Bigg[ M(\theta)\dot{\theta} - \int_{0}^{t} \left( \tau_{\text{motor}} + C^T(\theta, \dot{\theta})\dot{\theta} - g(\theta) + r(s) \right) ds \Bigg] \]

    <p>
      Now, this residual detects the motion induced by external contact forces and rises until:
      \[ r(t) \approx \tau_{\text{ext}} \]
    </p>

  </div>
</details>

<h4 class="section-title">2) Computing the Jacobian at the contact location \(J_c\)</h4>


If you need a quick reminder about Jacobians, have a look at the [Kinematics](/docs/chap1_basic_motion_ctrl/kinematics#1137-velocity-kinematics---meet-the-jacobian-) course.

Once $\tau_{\text{ext}}$ is estimated, the next step is to determine **how** this external force **affects the joints**. A force applied at a specific contact point $p_c$ creates both **linear forces and rotational torques** at the link origin. To map these effects back to the joints, we use a transformation matrix.

The contact may happen on a link or at the robot end-effector, and its location determines **which joints are affected**. As shown in the figure below, a force applied on a specific link $i$ (panel (a)) only affects the joints located between that link and the robot's base. In contrast, a force applied at the end-effector (panel (b)) affects all joints along the entire kinematic chain.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/jacobian-contact-point.png' }}"
       width="420"
       alt="Force applied on link (a) and end-effector (b)">
  <figcaption>
    <sub><i>
      Figure 7: External force applied on: (a) link, (b) end-effector 
      (<a href="https://doi.org/10.3390/s19112603">S.-H. Yen , P.-C. Tang et al., Sensors 2019</a>)
    </i></sub>
  </figcaption>
</figure>

To identify the external force, we focus our efforts on the **link where the contact occurs**. Our goal is to shift our kinematic perspective from the robot's end-effector to this specific contact location.

The **position of the contact point** relative to the origin of the contact link $i$ is obtained through simple geometry. If we assume the absolute contact location $p_c(\theta)$ is known, we can compute its relative distance to the origin of that specific link $i$ by subtracting the absolute position of the link's origin, denoted $p_i(\theta)$, from the absolute contact point:

$$
p_{i,c}(\theta) = p_{c}(\theta) - p_i(\theta)
$$

In the figure below, we can see the **cartesian-space** referential at the bottom ($x_0, y_0, z_0$) and the local **joint-space** referential ($x_i, y_i, z_i$) at the origin of the contact link. The vector $p_{i,c}(\theta)$ acts as the physical bridge between these two spaces.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/contact_point_relative_to_joint.png' }}"
       width="210"
       alt="Geometrical representation of the contact point regarding the contact link">
  <figcaption>
    <sub><i>
      Figure 8: Definition of the contact vector \(p_{i,c}\) in the joint-space of link i
      (<a href="https://doi.org/10.1109/IROS.2014.6942848">E. Magrini, F. Flacco and A. De Luca, IROS 2014</a>)
    </i></sub>
  </figcaption>
</figure>

By defining this **lever arm** vector, we can determine the torque created by the force.  

Once $p_{i,c}(\theta)$ is found, we can compute the **contact-point Jacobian** $J_c(\theta)$. This is derived from the **link Jacobian** $J_i(\theta)$, which represents the velocity and angular velocity of the **origin of the $i$-th link**. To map this motion to the specific point of contact, we apply the following transformation:

$$
J_c(\theta)
=
\begin{bmatrix}
I & -\,S(p_{i,c}(\theta)) \cr
0 & I
\end{bmatrix}
J_i(\theta)
$$

The term $S(p_{i,c}(\theta))$ is the **skew-symmetric matrix** constructed from the components of $p_{i,c}$. Considering $p_{i,c}(\theta) = (x, y, z)$, we have:

$$
S(p_{i,c}(\theta)) = \begin{bmatrix} 0 & -z & y \\ z & 0 & -x \\ -y & x & 0 \end{bmatrix}
$$

The skew-symmetric matrix is a mathematical tool used to represent a **cross product** in matrix form. It shows how the force creates torque due to the distance $p_{i,c}$.

If needed for clarification, the formulas are rewritten in full matrix expansion in the drop-down below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Example: Formulas with Matrix Expansion</span>
  </summary>

  <div class="optional-window">
    <p>
      Let's look at an example where an external force acts on <b>link 4</b> of a robot (\( i = 4 \)).
    </p>

    <h5>1. Define the coordinates</h5>
    <p>
      Assuming we know the following positions in cartesian space:
      <ul>
        <li>Contact point: \( p_c = \begin{bmatrix} a_1 & a_2 & a_3 \end{bmatrix}^T \)</li>
        <li>Origin of link 4: \( p_4 = \begin{bmatrix} b_1 & b_2 & b_3 \end{bmatrix}^T \)</li>
      </ul>
    </p>

    <h5>2. Compute the relative vector \( p_{4,c} \)</h5>
    <p>
      Subtracting the link origin from the contact point gives us the <b>lever arm</b> components \((x, y, z)\):
      \[ p_{4,c} = p_c - p_4 = \begin{bmatrix} a_1 - b_1 \\ a_2 - b_2 \\ a_3 - b_3 \end{bmatrix} = \begin{bmatrix} x \\ y \\ z \end{bmatrix} \]
    </p>

    <h5>3. Build the link Jacobian \( J_4 \)</h5>
    <p>
      The link Jacobian is obtained directly from the full robot Jacobian \( J \). Since the contact is on link 4, only the first 4 joints are affected. We take the first 4 columns of the robot's kinematic chain and set the remaining columns to zero:
      \[ J_4 = \begin{bmatrix} \text{col}_1 & \text{col}_2 & \text{col}_3 & \text{col}_4 & 0 & \dots & 0 \end{bmatrix} \]
    </p>

    <h5>4. Build the transformation matrix</h5>
    <p>
      We plug the skew-symmetric matrix into the transformation matrix, as seen earlier:
    </p>

    \[
    J_c =
    \begin{bmatrix} I & -S(p_{4,c}) \\ 0 & I \end{bmatrix} J_4 = 
    \begin{bmatrix} 
    1 & 0 & 0 & 0 & z & -y \\
    0 & 1 & 0 & -z & 0 & x \\
    0 & 0 & 1 & y & -x & 0 \\
    0 & 0 & 0 & 1 & 0 & 0 \\
    0 & 0 & 0 & 0 & 1 & 0 \\
    0 & 0 & 0 & 0 & 0 & 1
    \end{bmatrix} J_4
    \]

  </div>
</details>

<h4 class="section-title">3) Computing the contact force</h4>

Finally, we can compute the wrench $W \in \mathbb{R}^6$ by resolving the following equation:

$$
\tau_{\text{ext}} = 
J_c^T(\theta)
W
$$

$$
\Leftrightarrow W = (J_c^T(\theta))^{-1} \ \tau_{\text{ext}}
$$

<!-->
<div class="note-window">
  <div class="window-title">Note</div>
  This three-step approach is based on <a href="https://doi.org/10.1109/IROS.2014.6942848">Estimation of Contact Forces Using a Virtual Force Sensor, IROS 2014</a> (E. Magrini, F. Flacco and A. De Luca).
</div>
-->

Let's check your understanding with two exercices.

---

<div class="quiz-question-text">
  Exercise 1: Force estimation at the tool tip
</div>

Consider the 2D-planar robot illustrated below. In this simplified configuration, the robot has 3 joints located at positions $p_1$, $p_2$ and $p_3$ respectively, with a fixed base at the origin.

An external force $F_{ext}$ is applied at the tool tip, denoted as the contact point $p_c$.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/Force_estimation_exercise1.png' }}"
       width="340"
       alt="Contact scenario at the tool-tip">
  <figcaption>
    <sub><i>
      Figure 9: External force applied at the tool tip (modified from <a href="https://www.bila-as.com/products/universal-robots/ur20/">Universal Robots, UR20</a>)
    </i></sub>
  </figcaption>
</figure>

<div style="margin-left: 1.2em;">
  <p>
    <strong>1)</strong>  
    Using the grid (where each block represents \(10\) cm), identify the coordinates for \(p_3\) and \(p_c\). Compute the relative vector \(p_{3,c} = p_c - p_3\) and construct its skew-symmetric matrix \(S(p_{3,c})\). The referential origin \(O\) is located at the center of Joint 1.
  </p>
  <p>
    <strong>2)</strong>  
    Compute the contact Jacobian \(J_c\) by applying the transformation matrix to the link Jacobian \(J_3\). For this specific pose, \(J_3\) is given as:

    \[
    J_3 = \begin{bmatrix} 
    -0.9 & -0.4 & 0 \\ 
    0 & 0 & 0 \\ 
    0.1 & 0.6 & 0 \\ 
    0 & 0 & 0 \\ 
    1 & 1 & 1 \\ 
    0 & 0 & 0 
    \end{bmatrix}
    \]
  </p>

  <p>
    <strong>3)</strong>  
    The external joint torque vector \(\tau_{ext}\) has been estimated using the residual method:
    \[ \tau_{ext} = \begin{bmatrix} 11.0 \\ 6.0 \\ 1.0 \end{bmatrix} \text{Nm} \]
    Compute the resulting wrench \(W = [F_x, F_z, M_y]^T\) applied by the external force using the formula seen in the course (\(\tau_{ext} = J_c^T W\)).
  </p>
</div>

<details class="solution-details" markdown="1">
  <summary class="solution-btn">
    <span class="solution-label">Solution</span>
  </summary>

  <div class="solution-window">

  <p><strong>1) Relative vector \(p_{3,c}\) and skew-symmetric matrix</strong></p>

  <p>
    Based on the grid coordinates provided:
    <ul>
      <li>\(p_3 = \begin{bmatrix} 0.15 & 0 & 0.9 \end{bmatrix}^T\ \text{m}\)</li>
      <li>\(p_c = \begin{bmatrix} 0.3 & 0 & 0.8 \end{bmatrix}^T\ \text{m}\)</li>
    </ul>
  </p>

  <p>
    The relative vector \(p_{3,c}\) is:
    \[
    p_{3,c} = p_c - p_3 = \begin{bmatrix} 0.3 - 0.15 \\ 0 \\ 0.8 - 0.9 \end{bmatrix} = \begin{bmatrix} 0.15 \\ 0 \\ -0.1 \end{bmatrix}
    \]
  </p>

  <p>
    Following the definition of the skew-symmetric matrix \(S(p_{3,c})\):
    \[
    S(p_{3,c}) = \begin{bmatrix} 0 & 0.1 & 0 \\ -0.1 & 0 & -0.15 \\ 0 & 0.15 & 0 \end{bmatrix}
    \]
  </p>

  <hr>

  <p><strong>2) Compute the contact Jacobian \(J_c\)</strong></p>

  <p>
    We apply the transformation matrix to the link Jacobian \(J_3\):

    \[
    J_c = \begin{bmatrix} I & -S(p_{3,c}) \\ 0 & I \end{bmatrix} J_3 = 
    \begin{bmatrix} 
    1 & 0 & 0 & 0 & -0.1 & 0 \\
    0 & 1 & 0 & 0.1 & 0 & 0.15 \\
    0 & 0 & 1 & 0 & -0.15 & 0 \\
    0 & 0 & 0 & 1 & 0 & 0 \\
    0 & 0 & 0 & 0 & 1 & 0 \\
    0 & 0 & 0 & 0 & 0 & 1
    \end{bmatrix} 
    \begin{bmatrix} 
    -0.9 & -0.4 & 0 \\ 
    0 & 0 & 0 \\ 
    0.1 & 0.6 & 0 \\ 
    0 & 0 & 0 \\ 
    1 & 1 & 1 \\ 
    0 & 0 & 0 
    \end{bmatrix}
    \]
  </p>

  <p>
    After matrix multiplication, we obtain the \(6 \times 3\) contact Jacobian:
    \[
    J_c = 
    \begin{bmatrix} 
    -1.0 & -0.5 & -0.1 \\
    0 & 0 & 0 \\
    -0.05 & 0.45 & -0.15 \\
    0 & 0 & 0 \\
    1 & 1 & 1 \\
    0 & 0 & 0
    \end{bmatrix}
    \]
  </p>

  <hr>

  <p><strong>3) Wrench \(W\)</strong></p>

  <p>
    We solve for the wrench \(W = [F_x, F_y, F_z, M_x, M_y, M_z]^T\) using \(\tau_{ext} = J_c^T W\). 
    Let's first transpose \(J_c\):
    \[
    J_c^T = 
    \begin{bmatrix} 
    -1.0 & 0 & -0.05 & 0 & 1 & 0 \\ 
    -0.5 & 0 & 0.45 & 0 & 1 & 0 \\ 
    -0.1 & 0 & -0.15 & 0 & 1 & 0 
    \end{bmatrix}
    \]
  </p>

  <p>
    Given \(\tau_{ext} = [11.0, 6.0, 1.0]^T\ \text{Nm}\), we obtain the following set of equations:

    \[
    \begin{cases}
    \tau_{ext,1} = 11 = - F_x - 0.05 F_z + M_y \\
    \tau_{ext,2} = 6 = -0.5 F_x + 0.45 F_z + M_y \\
    \tau_{ext,3} = 1 = -0.1 F_x - 0.15 F_z + M_y
    \end{cases}
    \]
  </p>

  <p>
    By solving for the variables, we find:
    \[ W = \begin{bmatrix} F_x & F_z & M_y \end{bmatrix}^T = \boxed{\begin{bmatrix} -11 & -1 & 0.05 \end{bmatrix}^T} \]
  </p>

  </div>
</details>

---

<div class="quiz-question-text">
  Exercise 2: Force estimation for a mid-link contact
</div>

Let's consider the same robotic arm as in the previous exercise. However this time, the external force $F_{ext}$ is applied to link 2 instead of the tool tip.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/Force_estimation_exercise2.png' }}"
       width="340"
       alt="Contact scenario on Link 2">
  <figcaption>
    <sub><i>
      Figure 10: External force applied on link 2 (modified from <a href="https://www.bila-as.com/products/universal-robots/ur20/">Universal Robots, UR20</a>)
    </i></sub>
  </figcaption>
</figure>

<div style="margin-left: 1.2em;">
  <p>
    <strong>1)</strong>
    Using the joint angles \(\theta_1\), \(\theta_2 \) and \(\theta_3\), derive the general Jacobian \(J(\theta)\) for the end-effector of this 3-DOF planar arm.
  </p>
  <p>
    <em>Hint:</em> Review the <a href="/docs/chap1_basic_motion_ctrl/kinematics#1137-velocity-kinematics---meet-the-jacobian-">Kinematics</a> course if you need a refresher on how to deriving the Jacobian matrix.
  </p>
  <p>
    <strong>2)</strong>
    Deduce the link Jacobian \(J_2(\theta)\) from the general Jacobian \(J(\theta)\). Note that since the contact occurs on link 2, the motion of joint 3 does not affect the contact point. Consider the following link lengths \(L_1 = 0.7\)m, \(L_2 = 0.75\)m and \(L_3 = 0.2\)m.
  </p>
  <p>
    <strong>3)</strong>
    Identify the coordinates of \(p_2\) and \(p_c\) from the grid. Compute the relative vector \(p_{2,c} = p_c - p_2\) and construct its skew-symmetric matrix \(S(p_{2,c})\).
  </p>
  <p>
    <strong>4)</strong>
    Find the contact Jacobian \(J_{c,2}(\theta)\) by applying the transformation matrix to the link Jacobian \(J_2(\theta)\).
  </p>
  <p>
    <strong>5)</strong>
    Derive the resulting wrench \(W = [F_x, F_z, M_y]^T\) applied by the external force using the formula seen in the course (\(\tau_{ext} = J_c^T W\)). Consider the following joint torque vector \(\tau_{ext}\): \[ \tau_{ext} = \begin{bmatrix} 11.0 \\ 6.0 \\ 0 \end{bmatrix} \text{Nm} \]
  </p>
  <p>
    <strong>6)</strong> 
    Finally, calculate the numerical values of the wrench for the specific pose shown in the figure:
    \(\theta_1 = 135^\circ\), \(\theta_2 = -100^\circ\) and \(\theta_3 = -75^\circ\).
  </p>
</div>

<details class="solution-details" markdown="1">
  <summary class="solution-btn">
    <span class="solution-label">Solution</span>
  </summary>

  <div class="solution-window">

  <p><strong>1) End-effector Jacobian \(J(\theta)\)</strong></p>

  <p>
    Remember, in order to find the Jacobian we need to derivate the position and orientation of the end-effector in the cartesian space with respect to time.
  </p>

  <p>
    <i>Recall: $s_{12} = \sin(\theta_1 + \theta_2)$.</i>
  </p>

  <p>
    The position and orientation of the tool tip in the X-Z plane are:
    \[ \begin{cases}
      x = L_1 c_1 + L_2 c_{12} + L_3 c_{123} \\
      y = 0 \\
      z = L_1 s_1 + L_2 s_{12} + L_3 s_{123} \\
      \theta_x = 0 \\
      \theta_y = \theta_1 + \theta_2 + \theta_3 \\
      \theta_z = 0
    \end{cases} \]
  </p>

  <p>
    By differentiating these coordinates with respect to time:
    \[ \begin{cases}
      \dot{x} = -L_1 s_1 \dot{\theta}_1 - L_2 s_{12} (\dot{\theta}_1 + \dot{\theta}_2) - L_3 s_{123} (\dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3) \\
      \dot{y} = 0 \\
      \dot{z} = L_1 c_1 \dot{\theta}_1 + L_2 c_{12} (\dot{\theta}_1 + \dot{\theta}_2) + L_3 c_{123} (\dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3) \\
      \dot{\theta}_x = 0 \\
      \dot{\theta}_y = \dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3 \\
      \dot{\theta}_z = 0
    \end{cases} \]
  </p>

  <p>
    And by rearranging the terms, such that \(\dot{\mathbf{x}}=J \dot{\mathbf{\theta}}\), we obtain the \(6 \times 3\) Jacobian:

    \[ J(\theta) = \begin{bmatrix}
      -L_1 s_1 - L_2 s_{12} - L_3 s_{123} & -L_2 s_{12} - L_3 s_{123} & -L_3 s_{123} \\
      0 & 0 & 0 \\
      L_1 c_1 + L_2 c_{12} + L_3 c_{123} & L_2 c_{12} + L_3 c_{123} & L_3 c_{123} \\
      0 & 0 & 0 \\
      1 & 1 & 1 \\
      0 & 0 & 0 
    \end{bmatrix} \]
  </p>

  <hr>

  <p><strong>2) Deduce the link Jacobian \(J_2(\theta)\)</strong></p>

  <p>  
    The link Jacobian \(J_2\) describes the motion of the <b>origin</b> of link 2 (joint 2). Because the contact occurs on Link 2, Joint 3 is downstream and has no effect (column 3 is zero). Moreover, 2e must also remove all existing terms related to \(L_2\) and \(L_3\), since they do not affect the motion of the origin of joint 2:

    \[J_2(\theta) = \begin{bmatrix}
      -L_1 s_1 & 0 & 0 \\
      0 & 0 & 0 \\
      L_1 c_1 & 0 & 0 \\
      0 & 0 & 0 \\
      1 & 1 & 0 \\
      0 & 0 & 0
    \end{bmatrix} \]

    Replace \(L_1\) by its numerical value:
  
    \[J_2(\theta) = \begin{bmatrix}
      -0.7 s_1 & 0 & 0 \\
      0 & 0 & 0 \\
      0.7 c_1 & 0 & 0 \\
      0 & 0 & 0 \\
      1 & 1 & 0 \\
      0 & 0 & 0
    \end{bmatrix} \]

  </p>

  <hr>

  <p><strong>3) Relative vector \(p_{2,c}\) and skew-symmetric matrix</strong></p>

  <p>
    Using the provided coordinates:
    <ul>
      <li>\(p_2 = \begin{bmatrix} -0.5 & 0 & 0.5 \end{bmatrix}^T\ \text{m}\)</li>
      <li>\(p_c = \begin{bmatrix} 0.2 & 0 & 0.7 \end{bmatrix}^T\ \text{m}\)</li>
    </ul>
    \[ p_{2,c} = p_c - p_2 = \begin{bmatrix} 0.2 - (-0.5) \\ 0 \\ 0.7 - 0.5 \end{bmatrix} = \begin{bmatrix} 0.7 \\ 0 \\ 0.2 \end{bmatrix} \]
  </p>
  <p>
    We can deduce the skew-symmetric matrix \(S(p_{2,c})\):
    \[
    S(p_{2,c}) = \begin{bmatrix} 0 & -0.2 & 0 \\ 0.2 & 0 & -0.7 \\ 0 & 0.7 & 0 \end{bmatrix}
    \]
  </p>

  <hr>

  <p><strong>4) Compute the contact Jacobian \(J_c(\theta)\)</strong></p>

  <p>
    Applying the transformation matrix:
    \[
    J_c(\theta) = \begin{bmatrix} I & -S(p_{2,c}) \\ 0 & I \end{bmatrix} J_2(\theta) = 
    \begin{bmatrix} 
    1 & 0 & 0 & 0 & 0.2 & 0 \\
    0 & 1 & 0 & -0.2 & 0 & 0.7 \\
    0 & 0 & 1 & 0 & -0.7 & 0 \\
    0 & 0 & 0 & 1 & 0 & 0 \\
    0 & 0 & 0 & 0 & 1 & 0 \\
    0 & 0 & 0 & 0 & 0 & 1
    \end{bmatrix} J_2(\theta)
    \]
    Resulting in:
    \[
    J_c(\theta) = \begin{bmatrix}
    -0.7 s_1 + 0.2 & 0.2 & 0 \\
    0 & 0 & 0 \\
    0.7 c_1 - 0.7 & -0.7 & 0 \\
    0 & 0 & 0 \\
    1 & 1 & 0 \\
    0 & 0 & 0
    \end{bmatrix}
    \]
  </p>

  <hr>

  <p><strong>5) Wrench \(W\)</strong></p>

  <p>
    The external wrench \(W = [F_x, F_y, F_z, M_x, M_y, M_z]^T\) is found via \(\tau_{ext} = J_c^T W\). The relationship becomes:

    \[ 
    \begin{cases}
    \tau_{ext,1} = 11 = (-0.7 s_1 + 0.2)F_x + (0.7 c_1 - 0.7)F_z + M_y \\
    \tau_{ext,2} = 6 = 0.2 F_x - 0.7 F_z + M_y \\
    \tau_{ext,3} = 0
    \end{cases}
    \]

    This system is underdetermined, as we have 2 equations for 3 unknowns (\(F_x, F_z, M_y\)). In order to fully determine the wrench, additionnal information will be needed.
  </p>

  <hr>

  <p><strong>6) Numerical application</strong></p>

  <p>
    In the pose \(\theta_1 = 135^\circ\):  
    \[s_1 \approx 0.7\, \quad c_1 \approx -0.7\]
  </p>
  <p>
    The equations of 5) become:
    \[ 
    \begin{cases}
    -0.3 F_x - 1.2 F_z + M_y = 11\\
    0.2 F_x - 0.7 F_z + M_y = 6
    \end{cases}
    \]
  </p>
  <p>
    <ul>
      <li>First, let's consider a purely vertical force: \(F_x = 0\)</li>
    </ul>
    \[ W = \begin{bmatrix} F_x & F_z & M_y \end{bmatrix}^T = \boxed{\begin{bmatrix} 0 & -10 & -1 \end{bmatrix}^T} \]

    <ul>
      <li>Second, a purely horizontal force: \(F_z = 0\)</li>
    </ul>
    \[ W = \boxed{\begin{bmatrix} -10 & 0 & 8 \end{bmatrix}^T} \]

    <ul>
      <li>Lastly, a force that produces no torque: \(M_y = 0\)</li>
    </ul>
    \[ W = \boxed{\begin{bmatrix} -1.1 & -8.9 & 0 \end{bmatrix}^T} \]
  </p>

  </div>
</details>

---

#### B) Model-Free Estimation

The second proposed approach is machine learning based and does **not rely on any physics equation**. Instead of using a model, the wrench vector $W \in \mathbb{R}^6$ is determined by a neural network (NN). To train the NN, this approach needs real-world data, that can be collected using an actual F/T sensor. Data is usually obtained through **learning from demonstration**, a method whereby an operator passively moves the robot to show how to perform a given task. Data on F/T perception are gathered as the robot makes various contacts with the environment, see course on <a href="https://www.ieee-ras.org/ras-university/?ras_page=docs/chap12_learning/LfD.html"> learning from demonstration</a>. 

The variables fed to the NN are the robot’s internal state signals, such as joint **currents**, joint **positions** $\theta$, joint **velocities** $\dot{\theta}$ and joint **accelerations** $\ddot{\theta}$. All these inputs are put together into one input vector $x_n$.

For example, for an $n$-joint robot, an input vector may look like:

$$
x_n = 
\begin{bmatrix}
I_1, \ldots, I_n, \\
\theta_1, \ldots, \theta_n, \\
\dot{\theta}_1, \ldots, \dot{\theta}_n, \\
\ddot{\theta}_1, \ldots, \ddot{\theta}_n
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
      Figure 11: Neural network–based estimation of force and torque
      (<a href="https://doi.org/10.1109/LRA.2023.3341770">S. Shan and Q.-C. Pham, LRA 2024</a>)
    </i></sub>
  </figcaption>
</figure>

The **performance** of this approach can be seen in the video below.

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
      Neural-network based sensorless F/T estimation in action  
      (from <a href="https://doi.org/10.1109/LRA.2023.3341770">S. Shan and Q.-C. Pham, LRA 2024</a> available on <a href="https://www.youtube.com/watch?v=spztx3GzPzc">YouTube</a>)
    </i></sub>
</div>

*Key points of the video:*  
In the first part, the end-effector of the robot gets in contact with a surface and therefore external forces are created. On the plot, we can see that the estimated forces **closely match** the measurements obtained from the built-in F/T sensor. In the second part, an application example is shown in which the pin is inserted into a corresponding hole. During this task, the **F/T sensor is disabled** and F/T feedback is only given by the estimator. In the last part, the authors show that sensorless force estimation can also be used for **human guidance**.

<div class="note-window">
  <div class="window-title">Note</div>
  This approach was taken from <a href="https://doi.org/10.1109/LRA.2023.3341770">Fine Robotic Manipulation without Force/Torque Sensor</a> (S. Shan and Q.-C. Pham, LRA 2024).
</div>

For **additional information** and another example of sensorless F/T estimation, feel free to read the paper linked below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Further Reading: Intrinsic sense of touch</span>
  </summary>

  <div class="optional-window">
    <p>
      In this paper, the authors present a <strong>sensorless intrinsic sense of touch</strong> method, that goes one step further as the force estimation we saw before. The robot is able not only to estimate interaction forces, but also to localize the contacts and reconstruct touch trajectories over its body. This enables interactions like <strong>virtual buttons</strong>, <strong>writing on the robot</strong> surface and more intuitive physical human–robot interaction (see figure below). It is showing that sensorless estimation can also provide tactile feedback and not only force feedback.
      <strong>An illustrative video is provided by following the link.</strong>
    </p>
    <p>
      <a href="https://doi.org/10.1126/scirobotics.adn4008" target="_blank" rel="noopener">
        Intrinsic sense of touch for intuitive physical human-robot interaction
      </a>
      <br>
      <em>M. Iskandar et al., Sci. Robot. 2024</em>
    </p>

    <figure style="text-align: center;"> 
      <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/sensorless_sense_of_touch.jpg' }}" 
          width="420" 
          alt="Virtual buttons using sensorless force estimation"> 
      <figcaption> 
        <sub><i> 
          Figure 12: Virtual buttons using sensorless force estimation. Top: Actual contact by finger, bottom: estimated contact 
          (<a href="https://doi.org/10.1126/scirobotics.adn4008" target="_blank">M. Iskandar et al., Sci. Robot. 2024</a>) 
        </i></sub> 
      </figcaption> 
    </figure>
  </div>

</details>

<!--
---
<div class="quiz-question-text">
  Programming exercise: Sensorless force estimation
</div>

Question text

<div style="margin-left: 1.2em;">

  <p>
  <strong>1) ...</strong>
  </p>

  <p>
  <strong>2) ... </strong>
  </p>

  <p>
  <strong>3) ...</strong>
  </p>

</div>

<details class="solution-details" markdown="1">
  <summary class="solution-btn">
    <span class="solution-label">Solution</span>
  </summary>

  <div class="solution-window">

  <p><strong>1) Answer ...</strong></p>

  <p><strong>2) Answer ...</strong></p>

  <p><strong>3) Answer ...</strong></p>

  </div>
</details>

---
-->

In the continuity of sensorless force estimation, interaction forces can also be determined using **external vision**. If interested, have a look at the drop-down below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Further Reading: Contact Force Estimation from Vision</span>
  </summary>

  <div class="optional-window">
    <p>
      In this research, the authors demonstrate that interaction forces can be estimated in a reliable way using vision alone. While this approach uses and additional sensor (an RGB-D camera), it remains "sensorless" in the sense that there is no need for a traditional F/T sensor.
    </p>
    <p>
      Estimating forces from vision is an <strong>indeterminant problem</strong>: a single observed motion can generally be caused by an <strong>infinite distribution of possible forces</strong>. For example, different grip strengths can produce the same hand-object motion trajectories.
    </p>
    <p>
      To solve this, the authors propose a hybrid framework that combines <strong>model-free learning</strong> and <strong>model-based optimization</strong>. A Recurrent Neural Network (RNN) is first used to learn the mapping between kinematic features and human-like manipulation forces. These predictions are then refined using <strong>physics-based optimization</strong> (Second-Order Cone Programming) to ensure the final force distributions are physically plausible and consistent with the observed equations of motion. Results of such vision-based force estimation are shown in the figure below.
    </p>

    <p>
      <a href="https://doi.org/10.1109/TPAMI.2017.2759736" target="_blank" rel="noopener">
        Hand-Object Contact Force Estimation from Markerless Visual Tracking
      </a>
      <br>
      <em>T.-H. Pham, N. Kyriazis et al., TPAMI 2017</em>
    </p>

    <figure style="text-align: center;">
      <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/vision_based_force_estimation.jpg' }}"
           width="400"
           alt="Estimated forces from vision-based tracking">
      <figcaption>
        <sub><i>
          Figure 13: Interaction force estimation using visual tracking. Predicted forces are in red versus ground-truth measurements in grey.
          (<a href="https://doi.org/10.1109/TPAMI.2017.2759736" target="_blank">T.-H. Pham, N. Kyriazis et al., TPAMI 2017</a>)
        </i></sub>
      </figcaption>
    </figure>

  </div>
</details>

To conclude sensorless F/T estimation, here are its main advantages and disadvantages compared to actual F/T sensors:

| **Advantages**                 | **Disadvantages**                                           |
|--------------------------------|-------------------------------------------------------------|
| No dedicated F/T sensor needed | Dependence on model accuracy (model-based approach)         |
| Reduced hardware complexity    | Dependence on training data (model-free approach)           |
| Lower system cost              | Performance degrades in unmodeled or untrained situations   |

Try the wrap-up quiz about force sensing below.

<details class="quiz-details" markdown="1">
<summary class="quiz-btn"><span class="quiz-label">Quiz</span></summary>
<div class="quiz-window">

<div class="quiz-question-text">
A robot arm is equipped with a 6DOF F/T sensor at its end-effector. Below are three scenarios where this robot end-effector pushes on a horizontal surface.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/F-T-sensor-exercice-scenarios.png' }}"
       width="600"
       alt="Force–torque sensing scenarios at the end-effector">
  <figcaption>
    <sub><i>
      Front view of three contact scenarios.
      Red arrows are contact forces, black arrows are the motion of the robot end-effector.
    </i></sub>
  </figcaption>
</figure>

1) The F/T sensor measures:\[F_z > 0, \quad M_y \neq 0, \quad F_x = 0 \]

Which contact scenario could produce this output? (single answer possible)
</div>

<form id="quiz-ft-scenario-select">
  <input type="radio" name="quiz-ft-scenario-select" value="option1">
  Scenario (a): Pure vertical push through the center of the end-effector (force line passes through the sensor origin).<br>

  <input type="radio" name="quiz-ft-scenario-select" value="option2">
  Scenario (b): Pure vertical push, but the contact point is shifted to the side of the end-effector (force line does NOT pass through the sensor origin).<br>

  <input type="radio" name="quiz-ft-scenario-select" value="option3">
  Scenario (c): Vertical push with tangential friction force along x-axis (sliding contact).<br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'quiz-ft-scenario-select',
    'option2',
    {
      option1: 'A centered vertical push gives \\(F_z > 0\\) but no torque, so \\(M_y = 0\\).',
      option2: 'An off-center vertical push creates a torque around the y-axis due to the lever arm: \\(M_y = r_x F_z\\neq 0\\), while \\(F_x = 0\\).',
      option3: 'Sliding contact introduces a tangential friction force, so \\(F_x\\neq 0\\), which contradicts the measurement.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-ft-scenario-select-feedback"></p>
</form>

<div class="quiz-question-text">
2) The robot is in scenario (c). It pushes down on a horizontal surface while the contact is sliding, so friction acts along the x-axis.<br><br>

Which measurement output is corresponding to that scenario? (single answer possible)
</div>

<form id="quiz-ft-output-predict">

  <input type="radio" name="quiz-ft-output-predict" value="option1">
  $F_x > 0$, $F_z > 0$, $M_y \neq 0$<br>

  <input type="radio" name="quiz-ft-output-predict" value="option2">
  $F_x = 0$, $F_z > 0$, $M_y = 0$<br>

  <input type="radio" name="quiz-ft-output-predict" value="option3">
  $F_x > 0$, $F_z > 0$, $M_y = 0$<br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'quiz-ft-output-predict',
    'option1',
    {
      option1: 'Sliding contact creates a tangential friction force \\(F_x\\). Since this force acts below the sensor origin, it generates a torque around the y-axis: \\(M_y = r_z F_x \\neq 0\\), in addition to the normal force \\(F_z\\).',
      option2: 'Sliding contact implies the presence of a tangential friction force, so \\(F_x = 0\\) is not realistic.',
      option3: 'The tangential friction force creates a torque around the y-axis.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-ft-output-predict-feedback"></p>
</form>

<div class="quiz-question-text">
3) The robot is in scenario (b). A pure vertical force is applied. The contact point is shifted from the center.
The contact point moves further to the left along the x-axis. The magnitude of the applied vertical force stays the same.

<br><br>

Which of the following statements is correct? (single answer possible)
</div>

<form id="quiz-ft-invariance">

  <input type="radio" name="quiz-ft-invariance" value="option2">
  $F_z$ increases, $M_y$ remains unchanged.<br>

  <input type="radio" name="quiz-ft-invariance" value="option3">
  $F_z$ and $M_y$ remain unchanged.<br>

  <input type="radio" name="quiz-ft-invariance" value="option1">
  $F_z$ remains unchanged, $M_y$ increases.<br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'quiz-ft-invariance',
    'option1',
    {
      option1: 'The measured force $F_z$ depends only on the applied normal force, which is unchanged. The torque $M_y = r_x F_z$ increases because the lever arm $r_x$ increases as the contact point moves further from the sensor origin.',
      option2: 'The normal force $F_z$ does not depend on the contact point location, but the torque does.',
      option3: '$F_z$ remains unchanged, but the torque increases due to the larger lever arm.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-ft-invariance-feedback"></p>
</form>

<div class="quiz-question-text">
4) The robot was originally equipped with a 6DOF F/T sensor, but it is now damaged and can't be used anymore.
Due to cost, replacing the sensor is not an option.<br><br>

Which solution is the most appropriate to still estimate interaction forces? (single answer possible)
</div>

<form id="quiz-sensorless-choice">

  <input type="radio" name="quiz-sensorless-choice" value="option1">
  Install a new tactile skin covering the entire robot arm.<br>

  <input type="radio" name="quiz-sensorless-choice" value="option2">
  Use sensorless F/T estimation based on motor currents and the robot dynamics.<br>

  <input type="radio" name="quiz-sensorless-choice" value="option3">
  Install a camera and estimate forces using vision only, without any physical model.<br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'quiz-sensorless-choice',
    'option2',
    {
      option1: 'A tactile skin needs significantly more hardware, which implies increasing cost. Tactile skins are adressed later.',
      option2: 'Sensorless F/T estimation relies on internal robot signals and does not require additional hardware. This is a suitable option in that case.',
      option3: 'Vision is not the preferred option here, as it implies installing an external camera.'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-sensorless-choice-feedback"></p>
</form>

<div class="quiz-question-text">
5) A neural-network-based sensorless force estimator is trained and tested extensively in the laboratory.
After moving the robot to its real work place and changing the end-effector, the force estimation performance degrades significantly.<br><br>

What is the most likely reason for this behavior? (single answer possible)
</div>

<form id="quiz-sensorless-failure">

  <input type="radio" name="quiz-sensorless-failure" value="option1">
  The F/T sensor was not recalibrated properly.<br>

  <input type="radio" name="quiz-sensorless-failure" value="option2">
  The training data no longer matches the robot dynamics and contact conditions.<br>

  <input type="radio" name="quiz-sensorless-failure" value="option3">
  Neural networks can't estimate forces in real time.<br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'quiz-sensorless-failure',
    'option2',
    {
      option1: 'The estimator is sensorless and does not rely on the physical F/T sensor.',
      option2: 'Changing the end-effector and environment changes the robot dynamics and contact behavior, leading to a mismatch with the used training data.',
      option3: 'Neural networks can operate in real time (sometimes with a minimal delay).'
    }
  )">
    Check Answer
  </button>

  <p id="quiz-sensorless-failure-feedback"></p>
</form>

</div>
</details>

---

## Credits

This page was created by Mael Studer, under the supervision of Prof. Aude Billard and Prof. Ravinder Dahiya.

The following resources were used:

<!-- List all the sources that you used to create the page   -->

- [Handbook of Robotics, Springer](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20) (Chapter 19. Force and Tactile Sensors)

- [Force-Torque Sensing in Robotics](https://hdl.handle.net/11567/942466) (A. Chavez and F. Javier)

- [Estimation of contact forces using a virtual force sensor](https://doi.org/10.1109/IROS.2014.6942848) (E. Magrini, F. Flacco and A. De Luca, IROS 2014)

- [Tactile Sensing—From Humans to Humanoids](https://doi.org/10.1109/TRO.2009.2033627) (R. Dahiya, G. Metta et al., TRO 2010)

- [Fine Robotic Manipulation Without Force/Torque Sensor](https://doi.org/10.1109/LRA.2023.3341770) (S. Shan and Q.-C. Pham, LRA 2024)

### Additional Resources
<!-- List all the sources that could be relevant to a reader who would like to know more, including  the page on haptics under Human-Robot Interaction chapter -->

- [Intrinsic sense of touch for intuitive physical human-robot interaction](https://www.science.org/stoken/author-tokens/ST-2065/full#) (M. Iskandar, A. Albu-Schäffer and A. Dietrich)

[Back to Top](#start)