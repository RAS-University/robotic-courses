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

  /* Details layout */
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
  /* Show label */
  .quiz-details > summary .quiz-label::after {
    content: " (tap to show)";
    font-weight: 700;
  }
  /* Hide label */
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
    margin-bottom: 0.6em;          /* space before options */

    /* Text */
    font-weight: 600;              /* semi-bold */
    color: #333;                   /* strong contrast */
  }

  .section-title {
    /* Layout */
    margin: 2em 0 1.6em 0;
    padding: 0.6em 1em;
    /* Border and shape */
    border: 1px solid #ddd;
    border-radius: 10px;
    /* Background */
    background: #fafafa;
    /* Text */
    font-weight: 700;
  }

  .section-label {
    font-weight: 700;
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
- Basics of electrical circuits (resistance, capacitance, voltage-divider, etc.)
- Basics of mechanics (Hooke's Law, stress-strain curve, etc.)

## General Motivation

Robots are expected to interact closely and safely with humans as well as with their environment. To achieve this, there is one sense that humans use all the time but is often neglected in robotics: the sense of **touch**.  

In robotics, touch refers to situations where a robot gets into **physical interaction** with another real-world **agent**, such as a human, an object, or even another robot. During that interaction, forces are exchanged between two agents. This chapter focuses on how to measure these interaction **forces**.

Same as humans, robots can perceive interaction forces at different levels. When lifting an object, humans first sense the **overall force**, such as its weight, then acquire more **fine-grained** information through touch, such as local pressure distribution. This distinction leads to the use of **force sensing** for global interaction forces and **tactile sensing** for localized contact information in robotics. But more about this later.

Let us first have a look at some examples. Below are some illustrations and explanations of the three main interaction categories in which touch is used in robotics: **manipulation, exploration** and **reaction**.

<h4 class="section-title">Manipulation</h4>

<div class="goal-window">
  <div class="goal-title">Goal</div>
  Use touch to physically control an object.  
</div>

$\Rightarrow$ Interaction between a robot (active agent) and an object (passive agent).

During manipulation, the robot senses the object and adapts its actions to **control** it accordingly. Object manipulation is essential in fields like industrial robotics. In tasks like **grasping**, force perception is used to estimate the grasp force applied by the robotic hand, to prevent damaging the object or slipping. More about grasping can be found on its dedicated page ([click here]({{ '/docs/chap7_manipulation/grasping' | relative_url }})).  

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/force_perception/manipulation_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Robotic Hand manipulating a Champagne Glass
    (<a href="https://ieeexplore.ieee.org/document/10146043">F. Khadivar, A. Billard, IEEE T-RO 2023</a>)
  </i></sub></div>
</div>

*Key points of the video:*  
A robotic hand manipulates a **water-filled champagne glass**. As the hand tilts the glass, the moving water changes the internal mass distribution, creating disturbances during manipulation. Using **tactile sensors at the fingertips**, the robotic fingers adapt their movement and contact forces to control the glass despite these disturbances. In the end of the sequence, a larger motion causes the water to spill.  

<h4 class="section-title">Exploration</h4>

<div class="goal-window">
  <div class="goal-title">Goal</div>
  Use touch to learn about object properties.  
</div>

$\Rightarrow$ Interaction between a robot (active agent) and an object (passive agent).

During exploration, the robot performs movements to **discover unknown properties** of an object, without the objective of directly controlling it. Touch can be used to determine material properties such as **softness**, **surface texture**, **shape**, **temperature** or sometimes even the **friction coefficient**. For example, it is possible to determine whether an object is stiff or compliant, smooth or rough.

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/force_perception/exploration_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Humanoid Robot performs Shape Detection
    (<a href="https://ieeexplore.ieee.org/document/6907804">N. Sommer, M. Li, A. Billard, ICRA 2014</a>)
  </i></sub></div>
</div>

*Key points of the video:*  
A **humanoid robot** explores different objects by moving its fingers along their surface, trying to **identify** them through touch. First it explores a bottle, then a jar, a telephone handset and finally a glass. Tactile sensors at the robot’s fingertips provide **contact information** as the fingers slide over the object. These contact points are accumulated into a noisy point cloud, which is then used to **reconstruct an approximate shape** of the object. This type of tactile exploration is useful in situations where **vision is unavailable**, for example due to bad lighting conditions.  

<h4 class="section-title">Reaction</h4>

<div class="goal-window">
  <div class="goal-title">Goal</div>
  Use touch to ensure safe interaction with another active agent.  
</div>

$\Rightarrow$ Interaction between a robot (active agent) and another active agent (human/robot).

During reaction interactions, the robot continuously acts, perceives and **adapts in real time** based on the feedback it receives from the other agent. This enables, for example, safe operation of robots **around humans**: the robot can detect abnormal contact and **adjust its movement** to avoid harm. In the field of **haptics** and more specifically **teleoperation**, touch also allows humans to guide robots while receiving force feedback. More on haptics can be found on the dedicated page ([click here]({{ '/docs/chap12_hri/haptics-for-robotics' | relative_url }})).  

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

---

As you can imagine, force perception is used in many areas. From biomedical robotics such as [surgical robots]({{ '/docs/chap14_robotic_application_domain_II/surgical' | relative_url }}), to rehabilitation systems like [exoskeletons]({{ '/docs/chap14_robotic_application_domain_II/Exoskeletons' | relative_url }}) and [humanoid robots]({{ '/docs/chap10_robotic_application_domain_I/humanoids' | relative_url }}).

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
      option2: 'C) Incorrect. Touch does not replace vision, but complements it.',
      option3: 'B) Correct. Touch allows robots to perceive forces exchanged during contact.',
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

<!--
<div class="note-window">
  <div class="window-title">Note</div>
  On this page, the terms <strong>sense of touch</strong>, <strong>tactile sensing</strong> and <strong>force perception</strong> all refer to the robot’s ability to perceive and interpret physical interaction.
</div>
-->

---

## Course Content

Now that we have seen **why** robots need to perceive forces, we can dive into **how** force perception is implemented. As introduced earlier, robots can perceive interaction forces at different levels of detail, from global interaction forces (**force sensing** or **intrinsic sensing**) to more fine-grained contact information (**tactile sensing** or **extrinsic sensing**).  

The distinction between intrinsic and extrinsic sensing is based on the **location of the sensors** on the robot (see figure below). Intrinsic sensing, relies on sensors placed **within the mechanical structure** of the robot. On the other hand, extrinsic sensing, refers to sensors mounted directly at the robot’s **contact surface**.  


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

In summary:

- **Force sensing** (intrinsic) measures the global forces and torques applied to the system at a specific point, considered infinitesimally small. It captures the **overall push, pull and twist** experienced by the robot at that location, usually at a joint or a structural element.  

- **Tactile sensing** (extrinsic) measures stress or **pressure distributions over a surface** rather than at a single point. It relies on an array of sensing elements, forming what can be thought of as an **electronic skin**. Because multiple contact points are available, tactile sensing can detect slippage and precise contact location.  

<div class="note-window">
  <div class="window-title">Note</div>
  The separation of force perception into intrinsic and extrinsic sensing was proposed in 
  <a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>.
</div>

On this page, we will move gradually from **force sensing**, which describes interactions occurring at a single point, to **tactile sensing**, where sensing extends across a bigger surface. Although the examples shown in the introduction mainly focused on hands and fingertips, tactile sensing can be applied to the **entire body** of a robot. However, challenges such as wiring complexity and limited mechanical flexibility must also be addressed. We will see that later.

<!-- ⚠️ Adapt in the end ⚠️ -->

- **Section 2.2.3.1: Force Sensing**  
  Introduction to force and torque sensing methods.

<!-- - **Section 2.2.3.2: Tactile Sensing**  
  Overview of the main tactile sensing principles (resistive, capacitive, etc.).

- **Section 2.2.3.3: Advanced Tactile Sensing**  
  Presentation of flexible, stretchable and vision-based tactile sensors.

- **Section 2.2.3.4: Issues and Difficulties**  
  Discussion of how tactile data are acquired, including the challenges related to wiring, data rate and power consumption. -->

<!--
- **Section 2.2.3.5: Sensor Location and Integration**  
  Summary of where sensors are typically placed (in joints, links, or fingertips) and how placement affects measurement quality and task performance.
-->

---

### Force Sensing

<!--
Main ref: [Force-Torque Sensing in Robotics](https://unige.iris.cineca.it/handle/11567/942466) (F. J. Andrade Chavez)
-->

<!-- ⚠️ add that not only force but also torque sensing ⚠️ -->

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
      (<a href="https://link.springer.com/chapter/10.1007/978-981-99-1509-5_32">Proceedings of International Conference on Data, Electronics and Computing, Springer</a>)
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

#### A) Force/Torque Sensors

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

<br>
<h4 class="section-title">Sensing Principle and Mechanical Implementation:</h4>

The sensing principle of F/T sensors relies on detecting **strain** (deformation) in an elastic structure. When a force is applied, the elastic structure deforms and this deformation is converted into an electrical signal using strain gauges. By measuring the strain in the structure, the applied force can be determined using **Hooke’s law**. The detail of the mathematical model is shown later.

Below are examples of **elastic structures** used in F/T sensors:

*1) Cross-Beam Structure:*  

  The elastic base is shaped like a **crossbar**, consisting of an **inner ring** (central hub) connected to the fixed **outer ring** by flexible supporting beams. The whole piece is machined out of a single piece of material, to ensure high stiffness and to avoid hysteresis.  

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/cross-beam-structure.png' }}"
       width="420"
       alt="Cross-beam force/torque sensor structure with square and round base">
  <figcaption>
    <sub><i>
      Figure 4: Cross-Beam force/torque sensor structure. (a) square base, (b) round base  
      (<a href="https://doi.org/10.1080/15397734.2024.2382841">B. Sümer et al., in Mechanics Based Design of Structures and Machines (2025)</a>)
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
      (<a href="https://doi.org/10.1080/15397734.2024.2382841">B. Sümer et al., in Mechanics Based Design of Structures and Machines (2025)</a>)
    </i></sub>
  </figcaption>

</figure>

  **Strain gauges** are directly bonded on the surfaces of the beams to measure their strain.  

*2) Parallel Structure (Stewart Platform):*  

  This structure consists of an **upper mobile** platform and a **lower fixed** base connected by **six legs**. An example of a miniature stewart platform is shown in the next figure.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/stewart-platform-structure.png' }}"
       width="240"
       alt="Monolithic Stewart platform force/torque sensor structure with flexural joints">
  <figcaption>
    <sub><i>
      Figure 6: Example of monolithic Stewart platform structure  
      (<a href="https://ieeexplore.ieee.org/document/7279538">K. Li, B. Pan et al.</a>)
    </i></sub>
  </figcaption>
</figure>

  This design distributes the applied load through the structure, causing primarily axial strain (tension or compression) along the longitudinal axis of the limbs. **Strain gauges** are bonded on both sides (front and back) of the legs connecting the two platforms to measure the strain.

<br>
<h4 class="section-title">Mathematical Model:</h4>

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

#### B) Sensorless Force/Torque Estimation  

It is also possible to determine external forces and torques without embedding dedicated sensors. This **sensorless** method relies on the robot’s internal data (available without special hardware), such as the amount of current drawn by its motors. In most motors, the generated torque is proportional to the motor current. By comparing the **actual torque** output (derived from current) with the **theoretically required torque**, it is possible to determine the existence and magnitude of an external force.

Below, we look at two different approaches to estimate external forces using motor current: **model-based** and **model-free** (Neural Network–based).

<h4 class="section-title">
  <span class="section-label">Approach A</span>
  Model-Based Estimation
</h4>

This approach is called model-based, as it uses the **robot’s dynamics and kinematics** (= model) to compute the external force applied on the robot. If you need a quick reminder about the Jacobian, have a look at the [Kinematics](/docs/chap1_basic_motion_ctrl/kinematics#1137-velocity-kinematics---meet-the-jacobian-) course.

Contact force estimation follows three steps:  

- Estimate the external **joint torques** induced by the force  
- Compute the **Jacobian** at the contact location  
- Convert the joint torques into **cartesian force**

*1) Estimating the external joint torque $\tau_{\text{ext}}$*

We start with the basic **Lagrangian expression** of the robot’s dynamics (seen previously in the [Dynamics](/docs/chap1_basic_motion_ctrl/dynamics#part2-the-lagrangian-formulation-of-dynamics) course):

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

By computing the difference between the theoretical model torque and the measured motor torque, we finally obtain the **external joint torque** $\tau_{\text{ext}}$.  

<div class="note-window">
  <div class="window-title">Note</div>
  Refer to <a href="https://ieeexplore.ieee.org/document/6942848">Estimation of Contact Forces Using a Virtual Force Sensor</a> (E. Magrini, F. Flacco & A. De Luca, IROS 2014) for complete description of that computation step.
</div>

*2) Computing the Jacobian at the contact location $J_c$*  

Once $\tau_{\text{ext}}$ is estimated, the next step is to determine **how** a force at the contact point **affects the joints**. As shown in the figure below, a contact may occur on a link (panel (a)) or on the end-effector (panel (b)). The contact point determines which joints are affected.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/jacobian-contact-point.png' }}"
       width="420"
       alt="Force applied on link (a) and end-effector (b)">
  <figcaption>
    <sub><i>
      Figure 7: Force applied on link (a) and end-effector (b)
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

where $S(\cdot)$ is the [skew-symmetric matrix](https://en.wikipedia.org/wiki/Skew-symmetric_matrix#Cross_product), composed of the components of the vector $p_{i,c}(\theta)$:.  

This Jacobian describes how a force applied at the contact point generates joint torques.

*3) Computing the contact force*  

Finally we can compute the wrench $W \in \mathbb{R}^6$ by resolving the following equation:

$$
\tau_{\text{ext}} = 
J_c^T(\theta)
W
$$

<div class="note-window">
  <div class="window-title">Note</div>
  This three-step approach is based on <a href="https://ieeexplore.ieee.org/document/6942848">Estimation of Contact Forces Using a Virtual Force Sensor</a> (E. Magrini, F. Flacco, A. De Luca).
</div>

<h4 class="section-title">
  <span class="section-label">Approach B</span>
  Model-Free Estimation (Neural Network Based)
</h4>

The second proposed approach is machine learning based and does **not rely on any physics equation**. Instead of using a model, the wrench vector $W \in \mathbb{R}^6$ is determined by a neural network (NN). To train the NN, this approach needs real-world data, that can be collected using an actual F/T sensor. Data is usually obtained through *learning from demonstration*, a method whereby an operator passively moves the robot to show how to perform a given task. Data on F/T perception are gathered as the robot makes various contacts with the environment, see course on <a href="https://www.ieee-ras.org/ras-university/?ras_page=docs/chap12_learning/LfD.html"> learning from demonstration</a>. 

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
      Figure 8: Neural network–based estimation of force and torque
      (<a href="https://arxiv.org/html/2301.13413v2">S. Shan, Q. Pham</a>)
    </i></sub>
  </figcaption>
</figure>

<div class="note-window">
  <div class="window-title">Note</div>
  This approach was taken from <a href="https://arxiv.org/html/2301.13413v2">Fine Robotic Manipulation without Force/Torque Sensor</a> (S. Shan, Q. Pham).
</div>

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
      (from <a href="https://arxiv.org/html/2301.13413v2">S. Shan, Q. Pham</a> available on <a href="https://www.youtube.com/watch?v=spztx3GzPzc">YouTube</a>)
    </i></sub>
</div>

*Key points of the video:*  
In the first part, the end-effector of the robot gets in contact with a surface and therefore external forces are created. On the plot, we can see that the estimated forces **closely match** the measurements obtained from the built-in F/T sensor. In the second part, an application example is shown in which the pin is inserted into a corresponding hole. During this task, the **F/T sensor is disabled** and F/T feedback is only given by the estimator. In the last part, the authors show that sensorless force estimation can also be used for **human guidance**.

To conclude sensorless F/T estimation, here are its main advantages and disadvantages:

| **Advantages**                 | **Disadvantages**                                           |
|--------------------------------|-------------------------------------------------------------|
| No dedicated F/T sensor needed | Dependence on model accuracy (model-based approach)         |
| Reduced hardware complexity    | Dependence on training data (model-free approach)           |
| Lower system cost              | Performance degrades in unmodeled or untrained situations   |

For **additional information** and another example of sensorless F/T estimation, feel free to read the paper linked below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Further Reading: Intrinsic sense of touch</span>
  </summary>

  <div class="optional-window">
    <p>
      In this paper, the authors present a <strong>sensorless intrinsic sense of touch</strong> method, that goes one step further as the force estimation we saw before. The robot is able not only to estimate interaction forces, but also to localize the contacts and reconstruct touch trajectories over its body. This enables interactions like <strong>virtual buttons</strong>, <strong>writing on the robot</strong> surface and more intuitive physical human–robot interaction. It is showing that sensorless estimation can also provide tactile feedback and not only force feedback.
      <strong>A video is also available by following the link.</strong>
    </p>
    <p>
      <a href="https://www.science.org/stoken/author-tokens/ST-2065/full#" target="_blank" rel="noopener">
        Intrinsic sense of touch for intuitive physical human–robot interaction
      </a>
      <br>
      <em>M. Iskandar, A. Albu-Schäffer and A. Dietrich</em>
    </p>
  </div>

</details>

Before moving on, answer the questions about force sensing in the quiz below.

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
4) The robot was originally equipped with a 6DOF F/T, but the sensor is now damaged and can't be used anymore.
Due to cost, replacing the sensor is not an option.<br><br>

Which solution is the most appropriate to still estimate interaction forces? (single answer possible)
</div>

<form id="quiz-sensorless-choice">

  <input type="radio" name="quiz-sensorless-choice" value="option1">
  Install a new tactile skin covering the entire robot arm.<br>

  <input type="radio" name="quiz-sensorless-choice" value="option2">
  Use sensorless F/T estimation based on motor currents and the robot dynamics.<br>

  <input type="radio" name="quiz-sensorless-choice" value="option3">
  Install a cheap camera and estimate forces using vision only, without any physical model.<br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'quiz-sensorless-choice',
    'option2',
    {
      option1: 'A tactile skin needs additional hardware, wiring and cost. Tactile sensors will be adressed in the next section.',
      option2: 'Sensorless F/T estimation relies on internal robot signals and does not require additional hardware. This is a suitable option in that case.',
      option3: 'Vision alone can\'t reliably estimate interaction forces during physical contact.'
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

This page was created by Mael Studer, under the supervision of Prof. Aude Billard.

This page used the following resources:

<!-- List all the sources that you used to create the page   -->

- [Handbook of Robotics, Springer](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20) (Chapter 19. Force and Tactile Sensors)

- [Tactile Sensing Technologies, Springer](https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5)

<!-- - [Force-Torque Sensing in Robotics](https://unige.iris.cineca.it/handle/11567/942466) (F. J. Andrade Chavez) -->

<!-- 
### Videos

- [Adaptive Fingers Coordination for Robust Grasp and In-Hand Manipulation Under Disturbances and Unknown Dynamics](https://ieeexplore.ieee.org/document/10146043) (F. Khadivar, A. Billard, IEEE Transactions on Robotics, 2023)  
*Video example: Moving a Champagne Glass*

- [Bimanual compliant tactile exploration for grasping unknown objects](https://ieeexplore.ieee.org/document/6907804) (N. Sommer, M. Li, A. Billard, ICRA 2014)  
*Example of Exploration: Shape detection*

- [A dynamical system approach for detection and reaction to human guidance in physical human–robot interaction](https://doi.org/10.1007/s10514-020-09934-9) (M. Khoramshahi, A. Billard, ICRA 2020)  
*Example of Reaction: Arm Massage by Robot*
-->

### Additional Resources
<!-- List all the sources that could be relevant to a reader who would like to know more, including  the page on haptics under Human-Robot Interaction chapter -->

- [Intrinsic sense of touch for intuitive physical human-robot interaction](https://www.science.org/stoken/author-tokens/ST-2065/full#) (M. Iskandar, A. Albu-Schäffer and A. Dietrich)

- [Measurement Methods for Capacitances in the Range of 1 pF–1 nF: A Review](https://www.sciencedirect.com/science/article/pii/S0263224122003335) (O. Kanoun et al.)

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

