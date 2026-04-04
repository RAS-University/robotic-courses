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

- **Section 2.2.3.2: Tactile Sensing**  
  Overview of the main tactile sensing principles (resistive, capacitive, etc.).

- **Section 2.2.3.3: Advanced Tactile Sensing**  
  Presentation of flexible, stretchable and vision-based tactile sensors.

- **Section 2.2.3.4: Issues and Difficulties**  
  Discussion of how tactile data are acquired, including the challenges related to wiring, data rate and power consumption.

<!--
- **Section 2.2.3.5: Sensor Location and Integration**  
  Summary of where sensors are typically placed (in joints, links, or fingertips) and how placement affects measurement quality and task performance.
-->

---

### Force Sensing

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

This approach is called model-based, as it uses the **robot’s dynamics and kinematics** (= model) to compute the external force applied on the robot.  

Contact force estimation follows three steps:  

- Estimate the external **joint torques** induced by the force  
- Compute the **Jacobian** at the contact location  
- Convert the joint torques into **cartesian force**

*1) Estimating the external joint torque $\tau_{\text{ext}}$*

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
      Next, we take the devirative of the momentum (\(\dot{p}\)):
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

*2) Computing the Jacobian at the contact location $J_c$*  

If you need a quick reminder about Jacobians, have a look at the [Kinematics](/docs/chap1_basic_motion_ctrl/kinematics#1137-velocity-kinematics---meet-the-jacobian-) course.

Once $\tau_{\text{ext}}$ is estimated, the next step is to determine **how** this external force **affects the joints**. A force applied at a specific contact point $p_c$ creates both **linear forces and rotational torques** at the link origin. To map these effects back to the joints, we use a transformation matrix.

The contact may happen on a link or at the robot end-effector, and its location determines **which joints are affected**. As shown in the figure below, a force applied on a specific link $i$ (panel (a)) only affects the joints located between that link and the robot's base. In contrast, a force applied at the end-effector (panel (b)) affects all joints along the entire kinematic chain.

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
      Figure 7: Definition of the contact vector \(p_{i,c}\) in the joint-space of link i
      (<a href="https://ieeexplore.ieee.org/document/6942848">E. Magrini, F. Flacco, A. De Luca</a>)
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

*3) Computing the contact force*  

Finally, we can compute the wrench $W \in \mathbb{R}^6$ by resolving the following equation:

$$
\tau_{\text{ext}} = 
J_c^T(\theta)
W
$$

$$
\Leftrightarrow W = (J_c^T(\theta))^{-1} \ \tau_{\text{ext}}
$$

<div class="note-window">
  <div class="window-title">Note</div>
  This three-step approach is based on <a href="https://ieeexplore.ieee.org/document/6942848">Estimation of Contact Forces Using a Virtual Force Sensor</a> (E. Magrini, F. Flacco, A. De Luca).
</div>

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
      Scenario 1: External force applied at the tool tip (<a href="https://www.bila-as.com/products/universal-robots/ur20/">Universal Robots, UR20</a>)
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

  <p><strong>2) Compute the Contact Jacobian \(J_c\)</strong></p>

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

Let's consider the same robotic arm as in the previous exercise. This time, however, the external force $F_{ext}$ is applied to link 2 instead of the tool tip.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/Force_estimation_exercise2.png' }}"
       width="340"
       alt="Contact scenario on Link 2">
  <figcaption>
    <sub><i>
      Scenario 2: External force applied on Link 2 (Inspired by <a href="https://www.bila-as.com/products/universal-robots/ur20/">Universal Robots, UR20</a>)
    </i></sub>
  </figcaption>
</figure>

<div style="margin-left: 1.2em;">
  <p>
    <strong>1)</strong>
    Using the joint angles \(\theta_1, \theta_2 \text{and} \theta_3\), derive the general Jacobian \(J(\theta)\) for the end-effector of this 3-DOF planar arm.
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

  <p><strong>6) Numerical Application</strong></p>

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






<h4 class="section-title">
  <span class="section-label">Approach B</span>
  Model-Free Estimation (Neural Network Based)
</h4>

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

Before moving on to tactile sensing, answer the questions about force sensing in the quiz below.

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
      option3: 'Vision is not the preferred option here, as it implies installing an external camera. However, your intuition is right: vision combined with physical models can be used to estimate contact forces. <a href=&quot;#c-vision-based-force-sensors&quot;>Vision-Based Force Sensors</a> are the topic of the next section'
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

#### C) Vision-Based Force Sensors  

In the continuity of sensorless force estimation, interaction forces can also be determined using **external vision**.

<!--
Traditionally, measuring forces requires mounting costly and cumbersome transducers onto objects or the robot, which can alter the object's physical properties and obstruct the natural range of motion. Vision-based force sensing (FSV) establishes that these forces can be estimated in a reliable, non-intrusive way using a single **RGB-D camera**.

This method is a **hybrid approach**: it combines the flexibility of **Model-Free estimation** (Neural Networks) with the strict physical guardrails of **Model-Based estimation** (Physics-based optimization).

### The Multi-Contact Challenge
Estimating forces from a video feed is an "ill-posed" or indeterminate problem. In multi-contact scenarios, such as a five-finger grasp, an infinity of different force distributions can result in the same observed motion. To solve this, the estimation framework follows two main steps.

*1) Markerless Kinematics Tracking*

Instead of internal motor signals, the system tracks the motion of the object and the hand.

- **Motion Capture**: To handle occlusions and fast movements, the hand and object are often tracked as a single **rigid compound**.
- **Kinematics Estimation**: By analyzing the object's position and orientation over time, the system uses numerical differentiation to compute the **acceleration** ($a$) and **rotational velocity** ($\omega$). 

These kinematic values are linked to the net contact forces through the **Newton-Euler equations**:

$$
\mathcal{F}_c = m a - \mathcal{F}_d
$$

Where:
- $\mathcal{F}_c$: net force due to individual contact forces
- $m$: mass of the object
- $a$: translational acceleration
- $\mathcal{F}_d$: net force due to non-contact forces (e.g., gravity) 

*2) The Hybrid Estimation Framework*

To determine how much force each individual finger is applying, the system uses two layers in a "closed-loop" architecture:

- **The Learning Layer (RNN)**: A Recurrent Neural Network (RNN) learns the mapping between motion and force. It captures how humans naturally distribute forces over time based on "human-like" patterns found in manipulation datasets.
- **The Physics Layer (SOCP Optimizer)**: Because neural networks can predict impossible forces, a **Second-Order Cone Program (SOCP)** acts as a "physical checker". It refines the RNN predictions to ensure they align with physics, such as ensuring fingers only "push" (positivity) and stay within the **friction cone**.



### Why use this hybrid approach?
By combining these methods, the system ensures both **realism** and **consistency**:
- **Consistency**: The Optimizer ensures that predicted forces never break physical laws, matching the observed motion and preventing unrealistic "pulling" forces.
- **Realism**: The Neural Network allows the system to capture the "intuitive" ways humans apply force, which a purely mathematical model might miss.

<div class="note-window">
  <div class="window-title">Note</div>
  This approach is based on <a href="https://ieeexplore.ieee.org/document/8085119">Hand-Object Contact Force Estimation from Markerless Visual Tracking</a> (T. Pham, N. Kyriazis, A.A. Argyros & A. Kheddar, IEEE 2018).
</div>

-->

---

### Tactile Sensing

This section presents the following tactile sensing technologies:

- Resistive sensors  
- Capacitive sensors  
- Piezoelectric sensors  
- Optical sensors  
- Magnetism-based sensors  
- Electrorheological / magnetorheological sensors  

Let's begin with **resistive tactile** sensors.

#### A) Resistive Sensors

There are two different types of resistive tactile sensors:

- **Type 1:** Sensors designed to determine the **contact location** on a surface.
- **Type 2:** Sensors designed to measure the **contact force or pressure**.

We will first take a closer look at resistive tactile sensors of the **first type** and see how resistive technology can be used to localize contact on a surface.  

<h4 class="section-title">
  <span class="section-label">Type 1</span>
  Determination of contact location
</h4>

We begin with **single-strip resistive sensors** to understand the working principle of resistive tactile sensing. We then extend this concept to a more complete version: **the multi-strip resistive sensor**.

*1) Single-strip resistive sensors:*  

Resistive tactile sensors are usually composed of **two thin sheets coated with a resistive material** and placed on top of each other. The two layers are separated by **microscopic spacer elements** (microspheres), which keep them **electrically isolated** when no contact is applied.

When an object presses on the sensor surface, the applied pressure **locally** brings the two resistive layers into contact. This **contact location** corresponds to the point where an **electrical connection** is created between the layers. The structure of this sensor is seen in panel (a) of the figure below, where the first resistive layer is shown in green and the second layer in grey.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/single-strip-resistive-sensor.png' }}"
       width="640px"
       alt="Analog resistive strip sensor schematic">
  <figcaption>
    <sub><i>
      Figure 9: Schematic of analog resistive touch sensing
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

To determine the **contact location** on the sensor surface, the **x- and y-coordinates** of the contact point must be extracted. This is achieved by energising the two resistive layers **one after the other**, never simultaneously.

The measurement procedure follows these key steps:

<div style="margin-left: 1.6em;">
  <ol>
    <li>One resistive layer is energised by applying a <strong>uniform voltage</strong> across it.</li>
    <li>The other resistive layer is left in a <strong>high-impedance</strong> (Hi-Z) configuration. Because the Hi-Z input draws almost no current, it does <strong>not disturb the voltage distribution</strong> along the active layer.</li>
    <li>When contact happens, the contact point between the two layers forms a <strong>measurement node</strong>, transferring the local voltage of the active layer to the passive one.</li>
    <li>This measured output voltage corresponds to the position of the contact along the active resistive layer and can be <strong>used to compute the corresponding coordinate</strong>.</li>
  </ol>
</div>

In panel (b), $V_x$ is applied to the green layer while the grey layer is set to Hi-Z, allowing the **x-coordinate** of the contact to be extracted.  

In panel (c), the **roles** of the layers are **swapped**: $V_y$ is applied to the grey layer and the green layer is set to Hi-Z, which provides the **y-coordinate** of the contact.  

In practice, the sensor **switches rapidly** between measuring the x- and y-coordinates. The layers are energised one after the other at a **high frequency**, making the switching imperceptible to a human user (response times of 10 ms or faster).  

The measured **output voltages** correspond to the voltages read at the measurement node. The contact point divides the active resistive layer into **two resistive segments**. As a result, the measured output voltage is given by a voltage divider between these two resistances. The equivalent electrical circuit is shown in panel (d) of the figure above.

The simplified expressions are:  

$$
V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x
$$

$$
V_{y,\text{out}} = \frac{R_{y2}}{R_{y1} + R_{y2}} \, V_y
$$

Where, $V_x$ and $V_y$ are the **voltages applied** to the x- and y-layers, $V_{x,\text{out}}$ and $V_{y,\text{out}}$ are the **measured output voltages**. The resistances $R_{x1}$ and $R_{x2}$ correspond to the **resistive segments** between the contact point and the left and right boundaries of the x-layer, $R_{y1}$ and $R_{y2}$ are the equivalent resistances on the y-layer.

---

<div class="quiz-question-text">
  Exercise: Contact localization with a single-strip resistive sensor
</div>

A single-strip resistive sensor of total length $L = 100\ \text{mm}$ is energised with a voltage $V_x = 5\ \text{V}$.  

<div style="margin-left: 1.2em;">
  <p>
    <strong>1)</strong> The measured output voltage is \(V_{x,\text{out}} = 2.3\ \text{V}\).<br>
    Compute the x-coordinate of the touch point (distance from the left boundary).
  </p>
  <p>
    <strong>2)</strong> The contact point is located at \(x = 70\ \text{mm}\) from the left boundary.<br>
    Compute the expected output voltage \(V_{x,\text{out}}\).
  </p>
  <p>
    <strong>3)</strong> What output voltage is expected if the contact occurs exactly at the center of the sensor?
  </p>
  <p>
    <em>Hint:</em> the resistance is proportional to length (\(R_{x1} \propto x\)).
  </p>
</div>


<details class="solution-details" markdown="1">
  <summary class="solution-btn">
    <span class="solution-label">Solution</span>
  </summary>

  <div class="solution-window">

  <!-- ===================== PART 1 ===================== -->
  <p><strong>1) Determine the x-coordinate of the contact location</strong></p>

  <p>
    As mentioned, the resistance is proportional to length for a
    <strong>uniform</strong> resistive strip. Therefore we have:
  </p>
  <ul>
    <li>\( R_{x1} \propto x \)</li>
    <li>\( R_{x2} \propto L - x \)</li>
  </ul>

  <p>
    We can replace these expressions in the formula seen above:
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x
    = \frac{L - x}{L} \, V_x
    \]
  </p>

  <p>
    Solving for \(x\):
  </p>
  <p>
    \[
    x = L - L \frac{V_{x,\text{out}}}{V_x}
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 0.1\,\text{m}\), \(V_x = 5\,\text{V}\), \(V_{x,\text{out}} = 2.3\,\text{V}\)):
  </p>
  <p>
    \[
    x = 0.1 - 0.1 \cdot \frac{2.3}{5}
    = \boxed{0.054 \, \text{m}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the contact is located at \(x = 54\ \text{mm}\) from the left boundary.
  </p>

  <hr>

  <!-- ===================== PART 2 ===================== -->
  <p><strong>2) Predict the output voltage</strong></p>

  <p>
    We again start from the voltage divider relation:
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{L - x}{L}\, V_x
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 100\,\text{mm}\), \(x = 70\,\text{mm}\), \(V_x = 5\,\text{V}\)):
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{100 - 70}{100}\cdot 5
    = 0.3 \cdot 5
    = \boxed{1.5\ \text{V}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the expected output voltage is \(V_{x,\text{out}} = 1.5\ \text{V}\).
  </p>

  <hr>

  <!-- ===================== PART 3 ===================== -->
  <p><strong>3) Contact exactly at the center of the sensor</strong></p>

  <p>
    At the center, the contact is located at:
  </p>
  <p>
    \[
    x = \frac{L}{2}
    \]
  </p>

  <p>
    Using the same expression:
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{L - x}{L}\, V_x
    \]
  </p>

  <p>
    Substitute \(x = \frac{L}{2}\):
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{L - \frac{L}{2}}{L}\, V_x
    = \frac{1}{2} V_x
    \]
  </p>

  <p>
    With \(V_x = 5\,\text{V}\):
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{1}{2}\cdot 5
    = \boxed{2.5\ \text{V}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    if the contact occurs at the center, the output voltage is \(V_{x,\text{out}} = 2.5\ \text{V}\).
  </p>

  </div>
</details>

Single-strip resistive sensors have an important drawback: they **can't distinguish multiple simultaneous touch points**, which is why multi-strip resistive sensors are used.

---

*2) Multi-strip resistive sensors:*  

As in the single-strip version, the **multi-strip resistive sensor** also consists of two resistive layers and the **measuring principle remains** the same. However, each layer is **divided into multiple strips** along its length, as can be seen in the figure below. In this configuration, **multiple simultaneous contacts** can be detected, as each strip provides its own independent measurement. As in the single-strip version, the output voltage of a given strip depends on the contact position. However, because the strips are **narrow**, it also depends on the **contact width**.

For a **single strip**, the measured **output voltage** is given by:

$$
V_{\text{out}} = \frac{l_x + \frac{w}{2}}{L - \frac{w}{2}} \, V_{\text{ref}}
$$

where,  
- $l_x$ is the distance from the left boundary of the strip to the **centre** of the applied contact,
- $w$ is the **width** of the contact area (for example, the width of a fingertip),
- $L$ is the **total** length of the strip,
- $V_{\text{ref}}$ is the applied reference voltage.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/multi-strip-resistive-sensor.png' }}"
       width="640px"
       alt="Multi-strip analog resistive sensor schematic">
  <figcaption>
    <sub><i>
      Figure 10: Schematic of multi-strip analog resistive touch sensing
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

Now, instead of performing only one measurement per layer, we need to make **$n$ separate measurements** for all $n$ strips. If both resistive layers are divided into $n$ strips, this increases the total number of measurements from only $2$ to $2n$. As a result, scanning the entire sensor becomes **more time-consuming**.  

In addition, the **wiring complexity** increases. While the single-strip version requires only four connection wires, the multi-strip version needs $2+2n$ wires: one for $V_{\text{ref}}$, one for ground and $n$ measurement wires for each of the two stripped layers. The wiring complexity issue will be addressed later.

<div class="quiz-question-text">
  Exercise: Contact position and width estimation on a multi-strip resistive sensor
</div>

A single strip of length $L = 60\ \text{mm}$ is energised with a reference voltage
$V_{\text{ref}} = 5\ \text{V}$.

<div style="margin-left: 1.2em;">

  <p>
    <strong>1)</strong>
    The measured output voltage is \(V_{\text{out}} = 2.5\ \text{V}\).
    Assuming a point contact (\(w = 0\)), compute the contact position \(l_x\)
    from the left boundary.
  </p>

  <p>
    <strong>2)</strong>
    A fingertip presses on the strip at a position whose centre is located at
    \(l_x = 25\ \text{mm}\) from the left boundary.
    The measured output voltage is \(V_{\text{out}} = 3.75\ \text{V}\).
    Compute the contact width \(w\).
  </p>

</div>

<details class="solution-details" markdown="1">
  <summary class="solution-btn">
    <span class="solution-label">Solution</span>
  </summary>

  <div class="solution-window">

  <!-- ===================== PART 1 ===================== -->
  <p><strong>1) Determine the contact position \(l_x\)</strong></p>

  <p>
    For a point contact, the contact width is \(w = 0\). The output voltage
    expression simplifies to:
  </p>
  <p>
    \[
    V_{\text{out}} = \frac{l_x}{L}\, V_{\text{ref}}
    \]
  </p>

  <p>
    Solving for \(l_x\):
  </p>
  <p>
    \[
    l_x = L\,\frac{V_{\text{out}}}{V_{\text{ref}}}
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 0.06\,\text{m}\),
    \(V_{\text{out}} = 2.5\,\text{V}\),
    \(V_{\text{ref}} = 5\,\text{V}\)):
  </p>
  <p>
    \[
    l_x = 0.06 \cdot \frac{2.5}{5}
    = \boxed{0.03\,\text{m}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the contact is located at \(l_x = 30\ \text{mm}\) from the left boundary.
  </p>

  <hr>

  <!-- ===================== PART 2 ===================== -->
  <p><strong>2) Determine the contact width \(w\)</strong></p>

  <p>
    Using the given formula:
  </p>
  <p>
    \[
    V_{\text{out}} = \frac{l_x + \frac{w}{2}}{L - \frac{w}{2}} \, V_{\text{ref}}
    \]
  </p>

  <p>
    Solving for \(w\):
  </p>
  <p>
    \[
    w = 2 \cdot \frac{ \frac{V_{\text{out}}}{V_{\text{ref}}} \cdot L - l_x}{1 + \frac{V_{\text{out}}}{V_{\text{ref}}}}
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 0.06\,\text{m}\),
    \(V_{\text{out}} = 3.75\,\text{V}\),
    \(V_{\text{ref}} = 5\,\text{V}\), \(l_x = 0.025\,\text{m}\)):
  </p>
  <p>
    \[
    w = 2 \cdot \frac{ \frac{3.75}{5} \cdot 0.06 - 0.025}{1 + \frac{3.75}{5}}
    = \boxed{0.0229 \, \text{m}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the contact width is \(w \approx 22.9\ \text{mm}\).
  </p>

  </div>
</details>

Now we move on to sensors of the second type: how resistive tactile sensors are used to **measure force and pressure**.

<h4 class="section-title">
  <span class="section-label">Type 2</span>
  Determination of applied force or pressure
</h4>

As said, sensors of this type are designed to measure how much force or pressure is applied on the surface. These sensors rely on **piezoresistive materials**, whose electrical resistance changes when they are mechanically deformed. When an external force compresses the sensitive material, its resistance varies and by measuring this resistance change, the applied pressure can be estimated.

Note that the resistance change is **not** the quantity **measured directly**. Instead, the electronics measure the resulting voltage drop at the boundaries of the piezoresistive layer. This is usually done using a voltage-divider configuration.

Materials used as piezoresistive layers are conductive **rubber**, conductive **polymers**, conductive **gels**, and others.

An example of piezoresistive tactile sensor is the *Force Sensing Resistor (FSR)*. These sensors combine two electrodes and a piezoresistive layer. When a voltage is applied across the electrodes, current flows **through the piezoresistive layer** from one electrode to the other. On panel (a) of the figure below, the different layers of the FSR can be observed. Panel (b) shows a commercially available FSR from [Interlink Electronics](https://www.interlinkelectronics.com).

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
      Figure 11: Force Sensing Resistor (FSR)
    </i></sub>
  </figcaption>

</figure>

These sensors are **low cost**, offer good sensitivity and have **simple electronics**, but their main drawback is the presence of **hysteresis**, meaning that the sensor does not follow the same resistance–pressure curve when the force increases as when it decreases.



<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Illustrative video about Force Sensing Resistors</span>
  </summary>

  <div class="optional-window"><br>

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
        Force Sensitive Resistors  
        (available on <a href="https://youtu.be/sSdEwA7s8bE">YouTube</a>)
      </i></sub>
  </div>

  <p>
    <em>Key points of the video:</em><br>
    This video is a practical introduction to FSRs. It first presents FSRs with <strong>different shapes and sizes</strong>, then the video shows the key operating principle: their electrical resistance decreases as the applied pressure increases. Towards the end, a simple electrical circuit is shown, where an operational amplifier is used in comparator mode to turn on an LED when pressure is applied.
  </p>

  </div>
</details>

Test you knowledge about resistive tactile sensors in the quiz below.

<details class="quiz-details" markdown="1">
  <summary class="quiz-btn"><span class="quiz-label">Quiz</span></summary>
  <div class="quiz-window">

  <!-- ===================== QUESTION 1 ===================== -->
  <div class="quiz-question-text">
    What is the role of the high-impedance (Hi-Z) connection in a single-strip resistive sensor?
    (single answer possible)
  </div>

  <form id="type1-q1">
  <input type="radio" name="type1-q1" value="option2">
  To increase the sensitivity of the sensor. <br>

  <input type="radio" name="type1-q1" value="option1">
  To ensure that almost no current flows through the reading layer. <br>

  <input type="radio" name="type1-q1" value="option3">
  To reduce the resistance of the active strip. <br>

  <input type="radio" name="type1-q1" value="option4">
  To allow both resistive layers to be energised simultaneously. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type1-q1',
    'option1',
    {
      option1: 'The Hi-Z input draws almost no current, so it does not disturb the voltage distribution along the active layer.',
      option2: 'The Hi-Z configuration does not increase sensitivity, it prevents loading the active layer.',
      option3: 'The resistance of the active strip is determined by its geometry and material, not by the Hi-Z connection.',
      option4: 'The two layers are never energised simultaneously, they are switched one after the other.'
    }
  )">
    Check Answer
  </button>

  <p id="type1-q1-feedback"></p>
  </form>

  <!-- ===================== QUESTION 2 ===================== -->
  <div class="quiz-question-text">
    In a single-strip resistive sensor, the output voltage is given by
    \(V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x\).
    What does a larger value of \(V_{x,\text{out}}\) indicate?
    (single answer possible)
  </div>

  <form id="type1-q2">
  <input type="radio" name="type1-q2" value="option1">
  The contact point is closer to the right boundary of the strip. <br>

  <input type="radio" name="type1-q2" value="option2">
  The contact point is in the middle of the strip. <br>

  <input type="radio" name="type1-q2" value="option3">
  The strip has a lower overall resistance. <br>

  <input type="radio" name="type1-q2" value="option4">
  The sensor is detecting multiple simultaneous touch points. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type1-q2',
    'option1',
    {
      option1: 'A larger $V_{x,\\text{out}}$ means that $R_{x2}$ is larger relative to $R_{x1}$, which corresponds to a contact closer to the right boundary.',
      option2: 'A middle contact would produce an output voltage close to half of $V_x$, not necessarily a larger value.',
      option3: 'The overall resistance of the strip does not affect the voltage ratio used for localisation.',
      option4: 'Single-strip sensors cannot distinguish multiple simultaneous contacts.'
    }
  )">
    Check Answer
  </button>

  <p id="type1-q2-feedback"></p>
  </form>

  <!-- ===================== QUESTION 3 ===================== -->
  <div class="quiz-question-text">
    What happens inside a piezoresistive tactile sensor when a force is applied?
    (single answer possible)
  </div>

  <form id="type2-q1">

  <input type="radio" name="type2-q1" value="option2">
  The electrodes move apart, breaking the electrical contact. <br>

  <input type="radio" name="type2-q1" value="option3">
  The sensor generates a voltage internally, like a piezoelectric element. <br>

  <input type="radio" name="type2-q1" value="option4">
  The electronics directly measure the resistance without using a voltage drop. <br>

  <input type="radio" name="type2-q1" value="option1">
  The resistance of the piezoresistive layer changes due to mechanical deformation. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type2-q1',
    'option1',
    {
      option1: 'Piezoresistive materials change their electrical resistance when mechanically deformed by an applied force.',
      option2: 'The electrodes remain in contact. The resistance change occurs in the piezoresistive material.',
      option3: 'Piezoresistive sensors do not generate a voltage themselves. We will see more about piezoelectric sensors later.',
      option4: 'In practice, the resistance change is inferred through a voltage-divider configuration.'
    }
  )">
    Check Answer
  </button>

  <p id="type2-q1-feedback"></p>
  </form>

  <!-- ===================== QUESTION 4 ===================== -->
  <div class="quiz-question-text">
    Which of the following is a known limitation of Force Sensing Resistors (FSRs)?
    (single answer possible)
  </div>

  <form id="type2-q2">
  <input type="radio" name="type2-q2" value="option2">
  They require complex multi-strip wiring like localisation sensors. <br>

  <input type="radio" name="type2-q2" value="option3">
  They can't be used to measure pressure, only position. <br>

  <input type="radio" name="type2-q2" value="option4">
  They must be operated with a high-impedance reading layer to avoid disturbing the voltage distribution. <br>

  <input type="radio" name="type2-q2" value="option1">
  They exhibit hysteresis, with different resistance–pressure curves when loading and unloading. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type2-q2',
    'option1',
    {
      option1: 'FSRs are known to exhibit hysteresis, meaning their response differs when the applied force increases or decreases.',
      option2: 'FSRs are simple sensors and do not require multi-strip wiring.',
      option3: 'FSRs are designed to measure force or pressure.',
      option4: 'The Hi-Z configuration is used for resistive localisation sensors, not for FSRs.'
    }
  )">
    Check Answer
  </button>

  <p id="type2-q2-feedback"></p>
  </form>

  </div>
</details>

---

#### B) Capacitive Sensors

**Capacitive tactile sensors** make use of the fact that the electrical capacitance between two conductive electrodes changes when the geometry of the capacitor is modified. When a force or pressure is applied on the surface of the sensor, the deformation of the structure leads to a measurable **variation of capacitance**. This variation is then used to estimate the contact force or to detect touch.

<h4 class="section-title">Basic parallel-plate capacitive sensor:</h4>

The simplest capacitive tactile sensor can be modelled as a **parallel-plate capacitor**. It consists of two conductive plates (electrodes) separated by a flexible dielectric layer (figure below).

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/parallel-plate-capacitor.png' }}"
       width="320px"
       alt="Parallel-plate capacitive tactile sensor schematic">
  <figcaption>
    <sub><i>
      Figure 12: Parallel-plate capacitive sensor (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

The formula of the capacitance of a parallel-plate capacitor is given by

$$
C = \varepsilon \frac{A}{d},
$$

where,

- $A$ is the area of the electrodes,
- $d$ is the thickness of the dielectric layer separating the electrodes,
- $\varepsilon$ is the permittivity of the dielectric material placed between the electrodes.

When a force $F$ presses on the sensor surface, the dielectric layer is compressed and the distance $d$ between the two electrodes decreases. The key principle is the **inverse proportionality** between capacitance and distance ($C \propto \tfrac{1}{d}$): as the distance $d$ becomes smaller, the capacitance $C$ increases.

This change in capacitance is then converted into an **electrical output signal**. The electronics circuitry used for this purpose is beyond the scope if this class. If interested, a review of different methods can be found below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Further Reading: Capacitance Measurement Techniques</span>
  </summary>

  <div class="optional-window">
    <p>
      In this paper, the authors provide an overview of the main <strong>electronic methods</strong> used to measure capacitance in capacitive sensors. They review classical and modern readout circuits that convert small capacitance changes into voltage, frequency or digital signals. Then they compare the different measurement approaches in terms of accuracy, complexity and robustness.  
    </p>
    <p>
      <a href="https://www.sciencedirect.com/science/article/pii/S0263224122003335" target="_blank" rel="noopener">
        Measurement Methods for Capacitances in the Range of 1 pF–1 nF: A Review
      </a>
      <br>
      <em>O. Kanoun, A. Y. Kallel, A. Fendri</em>
    </p>
  </div>
</details>

Note that in this basic model the object deforms the capacitor mechanically. It does not need to be a conductive object, as it does not interact electrically with the capacitor.

<h4 class="section-title">Capacitive sensing systems:</h4>

Capacitive tactile sensors are of two types: **self-capacitance** and **mutual capacitance**. Self-capacitance measures the change in capacitance between a **single electrode** and ground when contact happens, whereas mutual capacitance measures the change in coupling between **two electrodes** when being touched.

*1) Self-capacitance type*  
In the self-capacitance mode, there is only one electrode, instead of two as in the parallel-plate capacitor seen above. *Self-capacitance* refers to the intrinsic capacitance an electrode has with respect to the circuit ground ($C_{electrode}$), shown in panel (a) of the figure below.


<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/self-capacitance-type.png' }}"
       width="500px"
       alt="Self-capacitance touch sensing schematic">
  <figcaption>
    <sub><i>
      Figure 13: Self-capacitance touch sensing (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

When a conducting object (such as a finger) touches or approaches the dielectric layer, it acts as the second plate of the capacitor. As a result, an additional capacitance $C_{touch}$ appears in parallel with the electrode’s intrinsic capacitance, **increasing** the total measured capacitance. This is illustrated on panel (b).

*2) Mutual capacitance type*  

In the mutual-capacitance mode, the two electrodes are arranged orthogonally (X- and Y-direction electrodes). Each electrode has its own intrinsic capacitance $C_{electrode}$, and together they form a coupling capacitor with capacitance $C_{mutual}$, as shown in panel (a) of the next figure.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/mutual-capacitance-type.png' }}"
       width="640px"
       alt="Mutual-capacitance touch sensing schematic">
  <figcaption>
    <sub><i>
      Figure 14: Mutual-capacitance touch sensing (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
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
      Figure 15: Mutual-capacitance tactile sensing array
    </i></sub>
  </figcaption>

</figure>

In this example, the mutual capacitance $C_{mutual}$ of a single sensing node is read in $100\,\mu\text{s}$, which results in the entire grid being scanned 20 times per second. Such fast scanning is needed for generating a high-resolution tactile image in real time, like for mobile touch screens.

<details class="quiz-details" markdown="1">
  <summary class="quiz-btn"><span class="quiz-label">Quiz</span></summary>
  <div class="quiz-window">

  <!-- ===================== QUESTION 1 ===================== -->
  <div class="quiz-question-text">
    In a parallel-plate capacitive tactile sensor, what happens when the dielectric layer is compressed by an external force?
    (single answer possible)
  </div>

  <form id="cap-q1">

  <input type="radio" name="cap-q1" value="option3">
  The capacitance $C$ remains unchanged because the permittivity is constant. <br>

  <input type="radio" name="cap-q1" value="option2">
  The capacitance $C$ decreases because the electrode area $A$ becomes smaller. <br>

  <input type="radio" name="cap-q1" value="option1">
  The capacitance $C$ increases because the distance $d$ between the electrodes becomes smaller. <br>

  <input type="radio" name="cap-q1" value="option4">
  The capacitance $C$ remains unchanged because compression does not affect the capacitor geometry. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q1',
    'option1',
    {
      option1: 'Compressing the dielectric reduces the distance $d$ between the electrodes. Since $C = \\varepsilon A / d$, the capacitance increases.',
      option2: 'The electrode area $A$ does not change when pressure is applied.',
      option3: 'The permittivity $\\varepsilon$ is assumed constant. The capacitance change comes from geometry, not material properties.',
      option4: 'Compression directly modifies the geometry of the capacitor by reducing $d$.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q1-feedback"></p>
  </form>

  <!-- ===================== QUESTION 2 ===================== -->
  <div class="quiz-question-text">
    In a self-capacitance tactile sensor, why does the measured capacitance increase when a finger approaches the electrode?
    (single answer possible)
  </div>

  <form id="cap-q2">
  <input type="radio" name="cap-q2" value="option4">
  Because the electrode spacing decreases under pressure. <br>

  <input type="radio" name="cap-q2" value="option1">
  Because the finger increases the dielectric constant of the material. <br>

  <input type="radio" name="cap-q2" value="option2">
  Because the finger acts as a conductive object, adding an extra capacitance $C_{touch}$ in parallel. <br>

  <input type="radio" name="cap-q2" value="option3">
  Because the electrode self-capacitance naturally increases over time. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q2',
    'option2',
    {
      option2: 'In self-capacitance sensing, a conductive finger behaves like a second electrode, adding a parallel capacitance $C_{touch}$.',
      option4: 'Self-capacitance sensing does not rely on mechanical compression of a dielectric.',
      option1: 'The dielectric material itself is not modified by the finger.',
      option3: 'The change is caused by interaction with the finger, not by time-dependent effects.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q2-feedback"></p>
  </form>

  <!-- ===================== QUESTION 3 ===================== -->
  <div class="quiz-question-text">
    In a mutual-capacitance tactile sensor, why does the measured capacitance decrease when a finger touches an X–Y electrode crossing?
    (single answer possible)
  </div>

  <form id="cap-q3">
  <input type="radio" name="cap-q3" value="option3">
  Because the finger electrically shorts the X and Y electrodes. <br>

  <input type="radio" name="cap-q3" value="option1">
  Because the dielectric layer is compressed and the distance $d$ decreases. <br>

  <input type="radio" name="cap-q3" value="option4">
  Because the permittivity of air decreases when displaced by the finger. <br>

  <input type="radio" name="cap-q3" value="option2">
  Because the finger distorts the electric field and reduces the coupling between the electrodes. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q3',
    'option2',
    {
      option2: 'In mutual capacitance, a conductive finger distorts the electric field and reduces coupling between the X and Y electrodes.',
      option3: 'The electrodes are not shorted together by the finger.',
      option1: 'Mutual capacitance sensing does not rely on mechanical compression.',
      option4: 'The dominant effect is field distortion, not a change in permittivity.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q3-feedback"></p>
  </form>

  <!-- ===================== QUESTION 4 ===================== -->
  <div class="quiz-question-text">
    Which statement correctly distinguishes the basic parallel-plate capacitive sensor from the mutual-capacitance sensor?
    (single answer possible)
  </div>

  <form id="cap-q4">
  <input type="radio" name="cap-q4" value="option1">
  In both cases, the object must be conductive to affect the capacitance. <br>

  <input type="radio" name="cap-q4" value="option4">
  The basic model relies on electric-field disturbance, whereas mutual capacitance relies on mechanical deformation. <br>

  <input type="radio" name="cap-q4" value="option2">
  The basic model relies on mechanical deformation of $d$, while mutual capacitance requires a conductive object that disturbs the electric field. <br>

  <input type="radio" name="cap-q4" value="option3">
  Mutual capacitance changes only when the dielectric layer is compressed. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q4',
    'option2',
    {
      option2: 'The parallel-plate model measures capacitance changes due to mechanical compression, while mutual capacitance relies on electric field distortion by a conductive object.',
      option1: 'The basic parallel-plate model does not require a conductive object.',
      option4: 'The roles are reversed: mechanical deformation applies to the basic model, not to mutual capacitance.',
      option3: 'Mutual capacitance does not depend on compression of the dielectric layer.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q4-feedback"></p>
  </form>

  </div>
</details>

By the way, most touch screens use the mutual-capacitance principle. Ever wondered why you can’t operate them with gloves or wet hands?

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Complement: Touch screens</span>
  </summary>

  <div class="optional-window"><br>

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

  <p>
    <!-- <em>Key points of the video:</em><br> -->

  </p>

  </div>
</details>

---

#### C) Piezoelectric Sensors

<!-- >generate charge proportional to applied forces (tactile sensing 5.2.) -->

#### D) Optical Sensors

<!-- tactile sensing 5.2.3 -->

#### E) Magnetism-based Sensors

<!-- tactile sensing 5.2.4 -->

#### F) Electrorheological / Magnetorheological

<!-- tactile sensing 5.2.7 – 5.2.8 -->

---

### Advanced Tactile Sensing

Now that we have seen different tactile sensing technologies, let’s take a closer look at some more advanced tactile sensors.

When used in robotics, tactile sensors often need to cover broad areas. This can be challenging, as the surfaces where the sensors must be attached can have many different shapes (cylindrical, spherical, etc.). To cover these surfaces in the best possible way, tactile sensing grids need to be flexible (for cylindrical surfaces) or even stretchable (for spherical surfaces). The difference between flexible and stretchable lies in the fact that a flexible sensor can bend, whereas a stretchable sensor can both bend and expand (i.e. become longer). Below are some examples of flexible and stretchable tactile sensors.

Lastly, there also exist alternative ways to sense touch. One advanced tactile sensing technique makes use of vision. These vision-based tactile sensors are presented below.

#### A) Flexible Tactile Sensors

<!-- Flexible tactile sensors are those that **bend** but do not undergo large tensile strain.  

-> stretchable (Review of Printable Flexible and Stretchable Tactile Sensors, Kumar et al.)
-> have a look at meta's fingertip tactile sensor

tactile sensing chapter 4.4.1 

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

#### B) Stretchable Tactile Sensors

<!-- Stretchable tactile sensors must withstand **large strain** (tens to hundreds of percent). 

tactile sensing chapter 4.4.3 

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

#### C) Vision-Based Tactile Sensors

<!--
-> make link to vision course
-> video from TEDX MIT, guy explains how his vision based tactile sensor works

vision used for force sensing, address this here: https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=8085141
-->

---

### Issues and Difficulties

<!--  tactile sensing chapter 4 (4.5 Electronics/Electrical requirements) -->

#### A) Wealth of Computation

#### B) Wiring Complexity

While integrating tactile sensors on a robot body, the wires that transmit the tactile data can be a big issue. The number of needed wires increases with the number of tactile sensors used. Often, the available space for wires is limited.

<!--
add challenges of electronics: wiring, data transfer, power consumption  
-> examples of how it is done today
-> look at latest paper of Gordon Cheng (TUM) on humanoïd robot
-->

<!--
add challenges of electronics: wiring, data transfer, power consumption  
-> examples of how it is done today
-> look at latest paper of Gordon Cheng (TUM) on humanoïd robot
-->

<!-- 
tactile sensing chapter 4.4.5
emphasize the wealth of computation, issues with electronic and cabling to tackle so much input, compute, etc. give examples of how this is computed today.
-->

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

-->

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

