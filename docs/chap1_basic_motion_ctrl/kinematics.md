---
title: 1.1 Kinematics
parent: "Chapter 1: Basics of Motion Control"
layout: default
math: mathjax
nav_order: 1
---

<!-- Link external JavaScript file -->
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


# 1.1 Kinematics 

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1.1.1 Prerequisites
To get the most out of this Kinematics module, it’s helpful to have:

 **Basic Mathematics**  
   - Familiarity with **[trigonometry](mathematical-foundation)** (sine, cosine, angle addition formulas).  
   - Understanding of **[linear algebra](mathematical-foundation)** (vectors, matrices, basic matrix operations).  
   - Comfort with **[calculus](mathematical-foundation)** (especially differentiation), which is useful for topics like velocity kinematics and the Jacobian.

 **Fundamental Physics or Mechanics**  
   - Basic concepts of **rigid-body motion** (translational and rotational movement).  
   - General understanding of **forces** and **torques** can be helpful, though kinematics itself does not address them directly.

While you don’t need to be an expert in any one of these areas, having a comfortable grasp of each will make your study of kinematics more productive and enjoyable.

 ⚠️ **Note on Course Level** 
>*This is a basic course on kinematics. Readers, interested in latest advances on kinematic control, should complete their training with the <a href="https://ras-university.github.io/robotic-courses/docs/singularities"> advanced kinematics module</a> treating singularities and other advanced kinematics analysis.*

---

## 1.1.2 General Motivation

![Delta Robot Pick and Place](https://www.youtube.com/watch?v=8j5hPlHTZI8)
><sub>*Delta robot Pick and Place. YouTube video, 14 June 2021. Available at: https://www.youtube.com/watch?v=8j5hPlHTZI8*</sub>

Have you ever watched a precision robot—like the <a href="https://en.wikipedia.org/wiki/Delta_robot">Delta robot</a> in the video—pick and place objects at incredible speed and accuracy? These agile machines seem are well known for their fluidity and precision. But behind the impressive motion lies a well-structured branch of mechanics called **kinematics**.

Kinematics, often referred to as the “**geometry of movement**,” is the study of *how bodies move in space without considering the forces or torques causing the motion*. By focusing on the geometry and arrangement of joints, links, and end-effectors, kinematics allows us to:

- ***Predict and Control Robot Positions***: For instance, a robotic arm used in an assembly line must position its **end-effector** (tip of the arm) at **exact points in space**. Kinematics equations compute a correspondence between a **robot joint configuration** (particular choice of value for each joint angle) and a specific position and orientation of the end-effector. This is necessary to translate a desired carthesian location for the robot is tip into a set of robot is joint values.

- ***Backbone to Path Planning***: From pick-and-place tasks to drawing complex shapes, kinematics helps in **calculating paths**, ensuring the robot can move smoothly from one point to another without collisions or awkward joint motions. Kinematics is the back bone to all standard and advanced path planning techniques. Whether it’s a Delta robot on a factory floor or a humanoid robot in a research lab, it is necessary to design the robot is kinematic structure to ensure that the path will be **kinematically feasible**, namely that it will satisfy the robot is mechanical constraints.

In this chapter, you will explore different ways of representing positions and orientations in 3D space, understand the kinematics behind common robotic arms, and learn a systematic way to map your robot’s geometry into kinematic equations to enable control. By mastering kinematics, you’ll have a strong foundation for starting your journey into controling robots. 

---

## 1.1.3 Course Content

⚠️ **Note on Notation**: 
>*Please be aware that notation, variable naming, and the style of writing equations may slightly differ between instructors. Always refer to the provided formulas and definitions in this course when working on assignments or exercises to avoid any confusion.*

### 1.1.3.0 : General Concepts
In this section we are first going to learn how to represent robots, what is a joint, degrees of freedom, etc. before diving into specific transformations (2D coordinate transformations, rotation matrices, homogeneous matrices) to link conceptual kinematic description of a robot to mathematical formalisms.

---
#### *Robot Structure:*

A traditional (rigid) robot is composed of a series of ***links***, attached to one another by ***joints***. The links move around the joints. 

The simplest of these joint-based linkage consists of attaching in sequence two links. This is what we refer to as ***revolute*** joint, also called ***hinge*** joint. It is also referred to as the elbow joint as it bears some vague resemblance to the attachment of the upeer and lower human arms. 

In place of enabling the links to rotate around the joint, the joint can also allow the links to slide along each other. One then refers to these links as ***prismatic*** joint, also called a sliding or linear joint. 

More interesting are joints that enable either the links to do more than one motion type (combining translation and rotation) or enable to connect three or more links simultaneously. The ***helical*** or ***screw*** joint allows simultaneous rotation and translation about a screw axis. The ***spherical*** joint, also called a ball-and-socket joint, enables rotation along three axes. 

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/joints.png' }}" width="500px" alt="Joints">
  <figcaption style="margin-top: 8px; font-style: italic;">
    Figure: Types of Joints in Kinematics (screenshot from the video <em>Modern Robotics, Chapter 2.2: Degrees of Freedom of a Robot</em>, by Kevin Lynch, available at <a href="https://www.youtube.com/watch?v=zI64DyaRUvQ">YouTube</a>).
  </figcaption>
</figure>

#### *Serial vs. Parallel robots*

Among the various configurations in which mechanical components can be arranged, two key topologies are particularly significant in robotics:
- ***Serial Chains***: These consist of a series of rigid links connected sequentially by joints. Each link (except the first and last) is connected to exactly two other links. Serial chains are commonly seen in robotic arms.
- ***Fully Parallel Mechanisms***: These mechanisms have two primary components (often the base and the end-effector) connected by multiple independent chains. Each of these connecting chains itself typically forms a serial structure. An example is the Delta robot used in high-speed pick-and-place tasks.

For a visual comparison of these two robot types, watch the following short video:
![serial_parallel](https://www.youtube.com/watch?v=3fbmguBgVPA)
><sub>*Video showing the differnece between Parallel (left) and Serial (right) robot. YouTube video, 13 juin 2019. Available at: https://www.youtube.com/watch?v=3fbmguBgVPA*</sub>
>

<!-- Conceputal questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<p><strong>Question 1: Drag each characteristic to the correct robot category (2 per category):</strong></p>

<style>
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 10px;
    min-height: 150px;
    width: 45%;
    background-color: #f9f9f9;
  }

  .drag-item {
    background-color: #e3e3e3;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    margin: 4px;
  }

  .check-button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 10px;
    font-weight: bold;
  }
</style>

<div class="drag-container">
  
  <!-- Serial Robot Zone -->
  <div class="drop-zone" id="serial-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Serial Robot</h3>
    <img src="{{ site.baseurl }}/assets/images/kinematics/serial.jpg" alt="Serial Robot" width="100%" style="max-width:90px; margin-bottom:10px;">
  </div>

  <!-- Parallel Robot Zone -->
  <div class="drop-zone" id="parallel-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3> Parallel Robot</h3>
    <img src="{{ site.baseurl }}/assets/images/kinematics/parallel.jpg" alt="Parallel Robot" width="100%" style="max-width:200px; margin-bottom:10px;">
  </div>

</div>

<!-- Draggable items -->
<div class="drag-container" id="drag-items">
  <div class="drag-item" id="open-chain" draggable="true" ondragstart="drag(event)">Open kinematic chain</div>
  <div class="drag-item" id="serially-linked" draggable="true" ondragstart="drag(event)">Three serially linked segments</div>
  <div class="drag-item" id="closed-chain" draggable="true" ondragstart="drag(event)">Closed kinematic chain robots</div>
  <div class="drag-item" id="fixed-motors" draggable="true" ondragstart="drag(event)">Two fixed bases</div>
</div>

<button class="check-button" onclick="checkRobotStructure()">Check Answer</button>
<div class="feedback" id="robot-feedback"></div>


<!-- First question  -->
<p><strong>Question 2: A serial robot is a closed kinematic chain structure</strong></p>
<form id="q1">
  <input type="radio" name="q1" value="True"> True<br>
  <input type="radio" name="q1" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q1', 'False', 
      'Correct! A serial robot has an open kinematic chain structure.',
      'Incorrect. A serial robot is an open kinematic chain, not closed.')">
    Check Answer
  </button>
  <p id="q1-feedback"></p>
</form>

<!-- Second question  -->
<p><strong>Question 3: Parallel robots are designed to move parrallel to a plane.</strong></p>
<form id="q2">
  <input type="radio" name="q2" value="True"> True<br>
  <input type="radio" name="q2" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q2', 'True', 
      'Correct! And this is why this mechanism sped up pick and place of marchandise moving along conveyer belts',
      'Incorrect. But there is exists closed-kinematic chain robots that are not parallel robots.')">
    Check Answer
  </button>
  <p id="q2-feedback"></p>
</form>

<!-- Third question  
<p><strong>Question 4: A parallel robot is a structure characterized by a closed kinematic loop</strong></p>
<form id="q3">
  <input type="radio" name="q3" value="True"> True<br>
  <input type="radio" name="q3" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q3', 'True', 
      'Correct!',
      'Incorrect.')">
    Check Answer
  </button>
  <p id="q3-feedback"></p>
</form>
-->
</details>


---

#### *Drawing kinematic diagrams*
In robotics, accurately representing the structure of robots (left image below) through **kinematic diagrams** (right image below) is crucial. These diagrams help us clearly visualize joints, links, and their connections.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_repre.png' }}" width="500px" alt="Kine">
  <figcaption style="margin-top: 8px; font-style: italic;">Figure: Structure of a 3-axes parralel robot (left) represented in an kinematic diagram (right)</figcaption>
</figure>

By learning how to sketch these diagrams, you will be better prepared to analyze robot motion and systematically compute essential parameters such as mobility and degrees of freedom.

To draw a proper diagram, one needs to identify the number of links and type of joint that connects them.

<!-- Step by step -->
<details markdown="1">
  <summary>Video Explanation</summary>

Here is a video explaining the step-by-step procedure to draw the kinematic diagram shown above.

<figure style="text-align: center;">
  <video width="640" height="360" controls>
    <source src="{{ '/assets/videos/kinematics/kine_diagra.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption style="margin-top: 8px; font-style: italic;">
    Video: Step-by-step procedure to draw the kinematic diagram (created by author).
  </figcaption>
</figure>


</details>

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Hands-on exercices </summary>

Here is an exercises to learn how to draw the **kinematic representation structures** for three closed-chain robots.
Give it a try !

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex1.jpg' }}" width="300px" alt="kine_ex1">
  <figcaption style="margin-top: 8px; font-style: italic;">
    Figure: Robot Structure 1  (adapted from the course <a href="https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en">Basics of Robotics for Manipulation</a>)
  </figcaption>
</figure>

<details markdown="2">
<summary><strong>Click here for Solution</strong></summary>

<figure style="text-align: center;">
  <video width="640" height="360" controls>
    <source src="{{ '/assets/videos/kinematics/kine_diagra_1.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption style="margin-top: 8px; font-style: italic;">
    Video: Step-by-step procedure to draw the kinematic diagram of Robot Structure 1 (created by author).
  </figcaption>
</figure>

</details>


---

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex2.jpg' }}" width="500px" alt="kine_ex2">
  <figcaption style="margin-top: 8px; font-style: italic;">
  Figure: Robot Structure 2 (adapted from 2017 Exams from Seoul National University, with solutions, Problem 1, Fig. 1(b), available at 
  <a href="https://hades.mech.northwestern.edu/images/2/28/SNU-2017-exams.pdf">this PDF</a>).
</figcaption>

</figure>


<details markdown="2">
<summary><strong>Click here for Solution</strong></summary>

<figure style="text-align: center;">
  <video width="640" height="360" controls>
    <source src="{{ '/assets/videos/kinematics/kine_diagra_2.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption style="margin-top: 8px; font-style: italic;">
    Video: Step-by-step procedure to draw the kinematic diagram of Robot Structure 2 (created by author).
  </figcaption>
</figure>

</details>


---

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex3.jpg' }}" width="300px" alt="kine_ex3">
  <figcaption style="margin-top: 8px; font-style: italic;">
  Figure: Robot Structure 3 (adapted from 2018 Exams from Seoul National University, with solutions, Problem 1, Fig. 1(a), available at 
  <a href="https://hades.mech.northwestern.edu/images/2/28/SNU-2018-exams.pdf">this PDF</a>).
  </figcaption>
</figure>


<details markdown="1">
<summary><strong>Click here for Solution</strong></summary>
<figure style="text-align: center;">
  <video width="640" height="360" controls>
    <source src="{{ '/assets/videos/kinematics/kine_diagra_3.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</figure>

</details>


</details>

---

#### *Formalism*

The structure of the robot determines entirely its mobility. For instance, the extent by which one link can move it determined by the extent to which it can rotate or slide only the joints it is attached to. The length of the robot is links and the range of motion at each joint determines the volume of the space surrounding the robot that can be reached or travelled through by the robot. To analyse this volume of motion is crucial. For instance, when controling robots tasked to pick and place objects, it allows to determine the regions the robot can reach the object successfully. It also enables to determine the regions of the space free of robot, and hence safe for humans to move around. To control robots, it is hence crucial to be able to express mathematically the range of motion it can do. We refer to this as the robot is structural mobility. 

The first key mathematical notion you must get accustomed to is the notion of:
- ***Degrees of Freedom (DoF):*** it refers to the number of independent parameters required to completely specify the position and orientation of a robot or its parts in space. For instance, a rigid body in three-dimensional space has six degrees of freedom—three translational (moving along the x, y, and z axes) and three rotational (rotating around these axes).

The state and structural mobility of the robot are expressed through its:
- ***Configuration***: consists of a the set of parameters that completely specifies the position and orientation of every robot is link. It is usually represented as a vector of joint angles. For instance, the two-link serial robot we saw earlier on is entirely specify by two scalars, denoting the two angles formed by the two joints with their based and with one another.  
- ***Configuration space (called C-space)*** is the space of all configurations that can be adopted by the robot.

See next a video that introduce this formalism:

<!-- ***Degrees of freedom*** is the dimension of the C-space, or the minimum number of real numbers you need to represent the configuration.

- ***Mobility*** typically refers to the number of controllable, active joints (motors) a robot possesses, directly determining its range of motion and the complexity of its achievable tasks.

To better understand these concepts, watch the following concise and clear explanation: -->

![Degrees of Freedom of a Rigid Body](https://www.youtube.com/watch?v=z29hYlagOYM)
><sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 2.1: Degrees of Freedom of a Rigid Body. YouTube video, 26 August 2017. Available at: https://www.youtube.com/watch?v=z29hYlagOYM*</sub>
>
><sub>*Lynch, K.M. and Park, F.C. (2017) Modern Robotics: Mechanics, Planning, and Control. Cambridge: Cambridge University Press.*</sub>

From this video, we have learned a general rule which holds for any system, not just rigid bodies: 
$$
\boxed{ \text{DoF} = \sum_{}^{} \text{freedoms of } \textbf{points} - \text{number of independent constraints} }
$$

And since the robots are made of rigid bodies, 
$$
\boxed{ \text{DoF} = \sum_{}^{} \text{freedoms of } \textbf{bodies} - \text{number of independent constraints} }
$$


The number of direction of motion enabled at a joint is described by the number of DoFs associetd to the joint. For instance, revolute (R), prismatic (P), and helical (H) joints all have one degree of freedom. Joints can also have multiple DoFs. The cylindrical joint (C) has two DoFs and allows independent translations and rotations about a single fixed joint axis. The universal joint (U) is another two-degree-of-freedom joint that consists of a pair of revolute joints arranged so that their joint axes are orthogonal. The spherical joint (S) has three DoFs. 


| Joint type       | dof \( f \) | Constraints \( c \) between two planar rigid bodies | Constraints \( c \) between two spatial rigid bodies |
|------------------|-------------|-----------------------------------------------------|------------------------------------------------------|
| Revolute (R)     | 1           | 2                                                   | 5                                                    |
| Prismatic (P)    | 1           | 2                                                   | 5                                                    |
| Helical (H)      | 1           | N/A                                                 | 5                                                    |
| Cylindrical (C)  | 2           | N/A                                                 | 4                                                    |
| Universal (U)    | 2           | N/A                                                 | 4                                                    |
| Spherical (S)    | 3           | N/A                                                 | 3                                                    |


---

#### *Grübler’s formula and its application*
***Grübler’s formula*** is a powerful tool to quickly calculate the DOFs of mechanisms, especially useful for complex robot configurations:
$$
\boxed{ \text{DoF} = m(N - 1 - J) + \sum_{i=1}^{J} \text{f}_i }
$$

Where:
- $m$ is the number of DoFs of the robot is body in space (e.g., $m = 3$ if robot is constrained to move in translation only, such as so called planar robots, $m = 6$ for robots that can both translate and rotate in space).
- $N$ is the number of links (including the frame).
- $J$ is the number of joints.
- $f_i$ is the number of DoFs permitted at each joint $i$.


To understand how this formula is applied, check out the following detailed explanation:

![Degrees of Freedom of a Robot](https://www.youtube.com/watch?v=zI64DyaRUvQ)
>  Detailed explanation of Grübler’s formula and practical examples of its application.
>
><sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 2.2: Degrees of Freedom of a Robot. YouTube video, 26 August 2017. Available at: https://www.youtube.com/watch?v=z29hYlagOYM*</sub>
>
><sub>*Lynch, K.M. and Park, F.C. (2017) Modern Robotics: Mechanics, Planning, and Control. Cambridge: Cambridge University Press.*</sub>



<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

<!-- 
CONTENT FROM MR.BOURRI

Now, try drawing the **kinematic representation structures** of the robots presented in **Exercises 2 and 3** from the set below.

Afterwards, compute the **mobility of the parallel robots**. (Note that, unlike serial robots, computing mobility for parallel robots requires using specific formulas.)

Here are some formulas that could be useful: -->

<!-- - **Grübler is Formula**

$$
\boxed{ \text{MO} = 6(n - k - 1) + \sum_{i=1}^{k} \text{MO}_i }
$$ -->


<!-- Where:

  - $ n $ is the number of solid bodies (including the fixed base)
  - $ k $ is the number of joints (connections)
  - $ \text{MO}_i $ is the mobility of each joint: -->

<!-- | Joint Type              | Mobility (MO) |
|-------------------------|---------------|
| Pivot (revolute)        | 1             |
| Cardan (universal)      | 2             |
| Spherical (ball joint)  | 3             |
| Prismatic (sliding)     | 1             | -->

<!-- - **Loops formula**

$$
\boxed{ \text{MO} = \sum_{i=1}^{k} \text{MO}_i - 6 \times lo}
$$

Where, $ lo $ is the number of closed kinematic loops. -->

Let is try to compute the DoF of the robot we have seen before:
<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine.png' }}" width="200px" alt="Kine">
  <figcaption style="margin-top: 8px; font-style: italic;">
  Figure: Robot Structure 1 (adapted from 2017 Exams from Seoul National University, with solutions, Problem 1, Fig. 1(c), available at 
  <a href="https://hades.mech.northwestern.edu/images/2/28/SNU-2017-exams.pdf">this PDF</a>).
  </figcaption>
</figure>


<details markdown="1">
<summary><strong>Click here for Solution</strong></summary>
Applying the spatial version ($ m =6 $) of Grübler’s formula leads to the following:

- $ N = 3 \times 3 \ (\text{links}) + 1 \ (\text{ground}) + 1 \ (\text{end effector}) = 11 $

- $ J = 3 \ (\text{R joints}) + 4 \times 3 \ (\text{S joints}) = 15 $

- $ \sum f_i = 3 \times 1 \ (\text{R joints}) + 3 \times 12 \ (\text{S joints}) = 39 $

- $ \text{dof} = m(N - 1 - J) + \sum f_i = 6(11 - 1 - 15) + 39 = 9 $

This Delta robot as designed with the parallel bars and spherical joints has **6 supplementary DoFs**, enabled by the **rotation of each bar around its principal axis**. 
These DoFs are referred to as **internal DoFs**, as they are not affecting the **translation of the mobile plate**. They are actually related to the **rotation of each bar around its principal axis**. 

</details>

--- 

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex2.jpg' }}" width="400px" alt="Kine">
  <figcaption style="margin-top: 8px; font-style: italic;">
  Figure: Robot Structure 1 (adapted from 2017 Exams from Seoul National University, with solutions, Problem 1, Fig. 1(b), available at 
  <a href="https://hades.mech.northwestern.edu/images/2/28/SNU-2017-exams.pdf">this PDF</a>).
  </figcaption>
</figure>

<details markdown="1">
<summary><strong>Click here for Solution</strong></summary>
Each box can be regarded as a link connected to ground by a 2-dof PP joint. Applying the spatial version ($ m =6 $) of Grübler’s formula leads to the following:

- $ N = 3 \times 2 \ (\text{links}) + 1 \ (\text{ground}) + 1 \ (\text{end effector}) = 8 $

- $ J = 3 \ (\text{R joints}) + 3 \ (\text{S joints}) + 3 \ (\text{2-dof joints}) = 9 $

- $ \sum f_i = 3 \times 1 \ (\text{R joints}) + 3 \times 3 \ (\text{S joints}) + 2 \times 3 \ (\text{2-dof joints}) = 18 $

- $ \text{dof} = m(N - 1 - J) + \sum f_i = 6(8 - 1 - 9) + 18 = 6 $
</details>

--- 

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex3.jpg' }}" width="200px" alt="Kine">
  <figcaption style="margin-top: 8px; font-style: italic;">
  Figure: Robot Structure 1 (adapted from 2018 Exams from Seoul National University, with solutions, Problem 1, Fig. 1(a), available at 
  <a href="https://hades.mech.northwestern.edu/images/2/28/SNU-2018-exams.pdf">this PDF</a>).
  </figcaption>
</figure>

> Here consider that the three prismatic joints and three revolute joints at the base are locked. 

<details markdown="1">
<summary><strong>Click here for Solution</strong></summary>
Applying the spatial version ($ m =6 $) of Grübler’s formula leads to the following:

- $ N = 3 \times 2 \ (\text{links}) + 1 \ (\text{ground}) + 1 \ (\text{end effector}) = 8 $

- $ J = 3 \ (\text{S joints}) + 3 \ (\text{P joints}) + 2 \times 3 \ (\text{PR joints}) = 9 $

- $ \sum f_i = 3 \times 3 \ (\text{S joints}) + 1 \times 3 \ (\text{P joints}) + 2 \times 3 \ (\text{PR joints}) = 18 $

- $ \text{dof} = m(N - 1 - J) + \sum f_i = 6(8 - 1 - 9) + 18 = 6 $

Observe that if the three prismatic joints and three revolute joints at the base are locked, then unless if the legs are all parallel, it is impossible for the legs to extend in length, implying that the mechanism becomes a structure in this case. Therefore this mechanism has **six dof.** 

</details>



<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_1.pdf'}}" width="100%" height="600px"></iframe> -->


</details>

---

### 1.1.3.1 : Introduction to Robotics | Kinematics & Modeling

Now that we have seen some basics notions, we move to an more in-depth exploration of kinematics and modeling. To start off, you may want to watch this short video that gives you an introduction of the meaning of kinematics and modeling and will present you how his videos will be strucured.

![Robotics 101: Full course for beginners](https://www.youtube.com/watch?v=K_xIJBlbjg4)
> This video gives you an introduction of the meaning of kinematics and modeling and will present you how his videos will be strucured.
> 
><sub> Introduction to Robotics 101 tutorial series (2022) Kinematics and modeling of 2D & 3D robots. YouTube video, 22 May 2022. Available at: https://www.youtube.com/watch?v=K_xIJBlbjg4


<!-- keys words on videos: forward kine, inv kine, gimbal rocks  -->


<!-- Conceputal questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- First question  -->
<p><strong>Question 1: Forward kinematics (FK) allows to compute...</strong></p>
<form id="q2-fk">
  <input type="radio" name="q2-fk" value="option1"> the position/orientation of the robot is end-effector from given robot is joint configuration<br>
  <input type="radio" name="q2-fk" value="option2"> the robot is joint configuration from the robot is end-effector position and orientation<br>
  <input type="radio" name="q2-fk" value="option3"> neither of these two<br>

  <button type="button" onclick="checkMCQ('q2-fk', 'option1',
    'Correct! Forward Kinematics computes the end-effector position and orientation from joint configuration for a robotic arm.',
    'Incorrect. Please try again!')">
    Check Answer
  </button>

  <p id="q2-fk-feedback"></p>
</form>


</details>

---

### 1.1.3.2: Coordinate Transformations in 2D | Mapping {#chapter-1-coordinate-transformations-in-2D}

In this chapter, we focus on 2D coordinate transformations—specifically, **pure translations** and **pure rotations** for planar (serial) robots.

![Coordinate Transformations in 2D : Mapping Part 1](https://www.youtube.com/watch?v=H_94DTWd8ck)
> This video gives you an introduction to 2D translations and rotations.
>
><sub> Coordinate Transformations in 2D (Part 1)| Mapping | Robotics 101. YouTube video, 22 May 2022. Available at: https://www.youtube.com/watch?v=H_94DTWd8ck


![Coordinate Transformations in 2D : Mapping Part 2](https://www.youtube.com/watch?v=TWTMoFvcBFc)
> Explains how translations and rotations combine simultaneously
>
><sub> Coordinate Transformations in 2D (Part 2)| Mapping | Robotics 101. YouTube video, 27 May 2022. Available at: https://www.youtube.com/watch?v=TWTMoFvcBFc



![Coordinate Transformations in 2D : Mapping Part 3](https://www.youtube.com/watch?v=R_hxO5xBYfI)
> Discusses how to handle successive coordinate transformations step by step
>
><sub> Coordinate Transformations in 2D (Part 3)| Mapping | Robotics 101. YouTube video, 27 May 2022. Available at: https://www.youtube.com/watch?v=R_hxO5xBYfI


As you have seen, a **general motion in the plane** can be described by a combination of translations and rotations around the origin. A sequence of translations and rotations comes up against the fact that the translation is a vector addition while the rotation a matrix multiplication.

It would be very desirable to be able to integrate rotation and translation in a single operation in order to be able to link them together. The **homogeneous matrices** allow this integration of the translation into the transformation matrix. The price to pay is to increase the order of the matrix by one. Within the **rotation matrix \(R\)**, with **orientation \(θ\)**, the **translation vector \(t\)** on x and y axis is added to the right and a line [0 0 1] at the bottom:

$$
\begin{bmatrix}
    R & \mathbf{t} \cr
    0 & 1 
\end{bmatrix} = 
\begin{bmatrix}
    \cos \theta & -\sin \theta & t_x  \cr
    \sin \theta & \cos \theta  & t_y  \cr
    0           & 0            & 1 
\end{bmatrix}
$$

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Is the following equality true?</strong></p>
<p>R(θ<sub>1</sub>) · R(θ<sub>2</sub>) = R(θ<sub>2</sub>) · R(θ<sub>1</sub>)</p>
<form id="eq-commutative">
  <input type="radio" name="eq-commutative" value="true"> True<br>
  <input type="radio" name="eq-commutative" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'eq-commutative', 
    'true', 
    'Correct! R(θ₁)·R(θ₂)=R(θ₁+θ₂)=R(θ₂+θ₁)=R(θ₂)·R(θ₁).', 
    'Incorrect. Rotation matrices commute in 2D rotations.'
  )">
    Check Answer
  </button>

  <p id="eq-commutative-feedback"></p>
</form>

<!-- Second question  -->
<p><strong>Question 2: The matrix 
  <p>\[
  \begin{bmatrix}
  \cos \theta & -\sin \theta & t_x \\
  \sin \theta & \cos \theta & t_y \\
  0 & 0 & 1
  \end{bmatrix}
  \]</p> correspond to ...</strong></p>
<form id="matrix-order">
  <input type="radio" name="matrix-order" value="option1"> A translation followed by a rotation<br>
  <input type="radio" name="matrix-order" value="option2"> A rotation followed by a translation<br>

  <button type="button" onclick="checkMCQ(
    'matrix-order', 
    'option2', 
    'Correct! This matrix represents a rotation followed by a translation.',
    'Incorrect. Please try again!'
  )">
    Check Answer
  </button>

  <p id="matrix-order-feedback"></p>
</form>

</details>


<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

**Calculate the following 2D rotation matrices:**

1. $R(\theta = 0)$.
2. $R(-\theta) $.
3. $ \left(R(\theta)\right)^{-1} $.
4. Find $\theta$ such that $R(\theta) = R(\theta_2)\,R(\theta_1) $.

5. Give the homogeneous **matrix** (no need to expand, just write the matrix product) for the follwing sequence of operations:
$$
t_1 → R(\theta_{1}) → t_2 → R(\theta_{1}) 
$$

*Hint: Start by computing the homogeneous matrix corresponding to the pure translation $t=\begin{bmatrix} t_x \\ t_y \end{bmatrix}$ and pure rotation $R(\theta)=\begin{bmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{bmatrix}$.*

> *Exercice insipired from the course <a href="https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en">Basics of Robotics for Manipulation</a>*

<!-- Practice what you've learned with Exercises **1**,**2**,**3** and **4**. -->

<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_2.pdf'}}" width="100%" height="600px"></iframe> -->

<details markdown="1">
<summary><strong>Click here for Solutions</strong></summary>

1: $R(\theta = 0)=\begin{bmatrix} 1 & 0 \\ 1 & 0 \end{bmatrix}$.

---

2: $R(-\theta)=\begin{bmatrix} \cos -\theta & -\sin -\theta \\ \sin -\theta & \cos -\theta \end{bmatrix} =\begin{bmatrix} \cos \theta & \sin \theta \\ -\sin \theta & \cos \theta \end{bmatrix}$.

---

3: As $\begin{bmatrix} a & b \\ c & d \end{bmatrix}^{-1} = \frac{1}{\text{det}} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$, therefore: 
$$
(R(-\theta))^{1}=\frac{1}{(\cos \theta)^2 + (\sin \theta)^2} \begin{bmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{bmatrix} =  \begin{bmatrix} \cos \theta & \sin \theta \\ -\sin \theta & \cos \theta \end{bmatrix} = (R(-\theta))^{T} = R(-\theta)
$$

---

4: $R(\theta_2)\,R(\theta_1)$
$$
= \begin{bmatrix} \cos \theta_{2} & \sin -\theta_{2} \\ \sin \theta_{2} & \cos \theta_{2} \end{bmatrix} \, \begin{bmatrix} \cos \theta_{1} & -\sin \theta_{1} \\ \sin \theta_{1} & \cos \theta_{1} \end{bmatrix}
= \begin{bmatrix} \cos \theta_{1+2} & -\sin \theta_{1+2} \\ \sin \theta_{1+2} & \cos \theta_{1+2} \end{bmatrix}
= R(\theta_{1} + \theta_{2}) 
$$

---

5: Let is proceed step by step: 

* Homogeneous matrix of a pure translation:
$$
M_t =
\begin{bmatrix}
1 & 0 & t_x \cr
0 & 1 & t_y \cr
0 & 0 & 1
\end{bmatrix}
$$

* Homogeneous matrix of a pure rotation with an angle $\theta$ around the origin  
($c=\cos\theta,\; s=\sin\theta\$):
$$
M_r =
\begin{bmatrix}
c & -s & 0 \cr
s & \;\;c & 0 \cr
0 & \;\;0 & 1
\end{bmatrix}
$$

* Homogeneous matrix for the sequence $t \rightarrow R(\theta)$:
$$
M_r M_t =
\begin{bmatrix}
c & -s & 0 \cr
s & \;\;c & 0 \cr
0 & \;\;0 & 1
\end{bmatrix}
\begin{bmatrix}
1 & 0 & t_x \cr
0 & 1 & t_y \cr
0 & 0 & 1
\end{bmatrix}
=
\begin{bmatrix}
c & -s & c\,t_x - s\,t_y \cr
s & \;\;c & s\,t_x + c\,t_y \cr
0 & \;\;0 & 1
\end{bmatrix}
=
\begin{bmatrix}
R(\theta) & R(\theta)\,t \cr
0 & 1
\end{bmatrix}
$$


Therefore: 
$$
\boxed{M_{r_2} M_{t_2} M_{r_1} M_{t_1}} =
\begin{bmatrix}
R(\theta_{1}) & R(\theta_{1})\,t \cr
0 & 1
\end{bmatrix}
\begin{bmatrix}
R(\theta_{2}) & R(\theta_{2})\,t \cr
0 & 1
\end{bmatrix}
$$

</details>

</details>


<!-- Additional Content -->
<details markdown="1">
  <summary>Additional Content</summary>

For further understanding of the definition of **Homogeneous Transformation Matrices**, the following concise and informative video is recommended:

![Homogeneous Transformation Matrices (Prof. Kevin Lynch)](https://www.youtube.com/watch?v=vlb3P7arbkU)
><sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 3.3.1: Homogeneous Transformation Matrices. YouTube video, 27 August 2017. Available at: https://www.youtube.com/watch?v=vlb3P7arbkU*</sub>
>
><sub>*Lynch, K.M. and Park, F.C. (2017) Modern Robotics: Mechanics, Planning, and Control. Cambridge: Cambridge University Press.*</sub>



</details>

--- 

### 1.1.3.3: Forward Kinematics of robots | Planar 2D robots


In robotics, understanding how each joint movement translates into precise actions is essential. 

Watch the following video for an intuitive overview of **forward kinematics** before we delve into the mathematical details.

![Forward Kinematics of robots](https://www.youtube.com/watch?v=svyhLDAoyKc)
> In this chapter, we will dive into **forward kinematics** (also called Direct Geometric Model, DGM), a fundamental method that allows us to calculate exactly where a robot’s end-effector (such as a gripper or tool) ends up in space based on its joint configurations (for example its position (x,y) and orientation(θ) in 2D). We will start by exploring simple planar 2D robots, laying a clear foundation for mastering more complex robotic systems.
>
><sub> Forward Kinematics of robots | Planar 2D robots | Robotics 101. YouTube video, 12 June 2022. Available at: https://www.youtube.com/watch?v=svyhLDAoyKc

---

### 1.1.3.4: Forward Kinematics (with solved examples) | Homogeneous Transformations 

Here you will see some examples of how to find this end effector positions in 2D using homogeneous transforms as we have seen in Section 1.1.3.1. 

![examples](https://www.youtube.com/watch?v=mO7JJxaVtkE)
> First solved example of how to find this end effector positions in 2D using homogeneous transforms
>
><sub> Homogeneous Transformations (example 1) | Robotics 101. YouTube video, 12 June 2022. Available at: https://www.youtube.com/watch?v=mO7JJxaVtkE

![examples2](https://www.youtube.com/watch?v=zg5sS9LZGAM)
> Second solved example of how to find this end effector positions in 2D using homogeneous transforms
>
><sub> Homogeneous Transformations (example 1) | Robotics 101. YouTube video, 12 June 2022. Available at: https://www.youtube.com/watch?v=zg5sS9LZGAM

Now that we have seen how to compute forward kinematics using homogeneous transformations, let is explore **another insightful way** to approach planar rotations. Sometimes, it is more intuitive or practical to represent motion as rotation around an **arbitrary point \( p \)** rather than just around the origin.

A rotation around an arbitrary point \( p \) can be expressed through three intuitive steps:

1. **Translate** the point \( p \) to the origin.
2. **Rotate** around the origin by angle \(θ\).
3. **Translate back** by moving the origin back to point \( p \).

Mathematically, this can be represented as:

$
\begin{bmatrix}
    I & p \cr
    0 & 1 
\end{bmatrix} \cdot
\begin{bmatrix}
    R & 0 \cr
    0 & 1 
\end{bmatrix} \cdot
\begin{bmatrix}
    I & -p \cr
    0 & 1 
\end{bmatrix} = 
\begin{bmatrix}
    R & p - R \cdot p \cr
    0 & 1 
\end{bmatrix}
$

This expression clearly shows that:

- **A rotation about any point \( p \)** is equivalent to **a rotation about the origin**, followed by a particular translation \( p - R p \).
- Conversely, **any combination of rotation and translation** in the plane can be represented as a pure rotation around a certain center \( p \).

Understanding this concept is powerful because it provides deeper insight into robot movements, especially when dealing with practical scenarios involving complex rotations or articulations around joints positioned away from the base.

Let is get familiriar with this type of method doing similar exercise:

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

Let is consider this following robotic arm. Give the forward kinematic model that expresses the coordinates (x,y) of point P as a function of the joint coordinates $\theta_1$ and $\theta_2$

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/ex1_chap4.png" width="450" height="auto" alt="Fig 1">
</figure>

*Hint: Use the homogeneous matrices of the transformations:*
1. *Rotation of $\theta_2$ around $(L_1,0)$*
2. *Rotation of $\theta_1$ around the origin $(0,0)$*

> *Exercice insipired from the course <a href="https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en">Basics of Robotics for Manipulation</a>*


<details markdown="1">
<summary><strong>Click here for Solutions</strong></summary>

First, place the arm in its reference position as shown in the figure below. Then, develop the homogeneous matrices at each joint, starting from the last one (the end effector). 

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/sol1_chap4.png" width="450" height="auto" alt="Fig 1 sol">
</figure>

1. Homogenous matrix corresponding to the rotation $\theta_2$ around the end of the first arm $p_{10}$ with coordinates $(L_1,0)$:
$$
H_{q_2} = 
\begin{bmatrix}
    R_2 & p_{10} - R_2 \cdot p_{10} \cr
    0 & 1 
\end{bmatrix} =
\begin{bmatrix}
    cos(\theta_2) & -sin(\theta_2) & L_1 (1-cos(\theta_2)) \cr
    sin(\theta_2) &  cos(\theta_2) & -L_1 sin(\theta_2) \cr
    0   &  0   & 1
\end{bmatrix}
$$

2. Homogenous matrix corresponding to the rotation $q_1$ around the origin:
$$
H_{\theta_1} = 
\begin{bmatrix}
    c_1 & -s_1 & 0 \cr
    s_1 &  c_1 & 0 \cr
    0   &  0   & 1
\end{bmatrix}
$$

The combined homogenous matrix of the sequence of the two rotations is equal to:
$$
H = H_{\theta_1} \cdot H_{\theta_2} = 
\begin{bmatrix}
    c_1 & -s_1 & 0 \cr
    s_1 &  c_1 & 0 \cr
    0   &  0   & 1
\end{bmatrix}
\cdot
\begin{bmatrix}
    c_2 & -s_2 & L_1 (1-c_2) \cr
    s_2 &  c_2 & -L_1 s_2 \cr
    0   &  0   & 1
\end{bmatrix}
=
\begin{bmatrix}
    c_{1+2} & -s_{1+2} & L_1 (c_1 (1-c_2) + s_1 s_2) \cr
    s_{1+2} &  c_{1+2} & L_1 (s_1 (1-c_2) - c_1 s_2) \cr
    0   &  0   & 1
\end{bmatrix}
$$

Therefore to find the coordinates $(x,y)$ of the point P:
$$
\boxed{
\begin{pmatrix}
    x \cr
    y \cr
    1
\end{pmatrix} = H \cdot 
\begin{pmatrix}
    L_1 + L_2 \cr
    0 \cr
    1
\end{pmatrix} = 
\begin{pmatrix}
    L_1 c_1 + L_2 c_{1+2} \cr
    L_1 s_1 + L_2 s_{1+2} \cr
    1
\end{pmatrix}
}
$$


<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_4_1-3.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>


--- 

### 1.1.3.5: Introduction to Quaternions 

<div style="float: left; margin-right: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/R.gif" alt="Quaternions Explained" style="width: 200px; height: auto;">
  <p style="font-size: small;">Quaternions Explained</p>
</div>

While Euler angles and rotation matrices are common ways to describe rotations in robotics, they have some limitations, notably the phenomenon known as **gimbal lock**: phenomenon that occurs when using Euler angles (roll, pitch, yaw) to represent orientations or rotations, typically in three-dimensional space. It happens when two of the rotation axes align, causing the loss of one degree of rotational freedom. In simpler terms, you become unable to rotate around one particular axis because two axes have essentially "collapsed" into one. Here is very nice [video](https://www.youtube.com/watch?v=zc8b2Jo7mno) explaining this phenomeon.

**Quaternions** are an elegant mathematical alternative for **representing 3D rotations**, avoiding issues like gimbal lock and allowing smooth rotational interpolations. They are widely used in robotics, computer graphics, and aerospace for their efficiency and accuracy in handling rotations.

For an intuitive, visual understanding of quaternions, it is recommended to watch the following engaging videos from the channel **[3Blue1Brown](https://www.youtube.com/@3blue1brown)**:

![Visualizing quaternions (4D numbers)](https://www.youtube.com/watch?v=d4EgbgTm0Bg)
> Definition about **Quaternions**
>
><sub> Visualizing quaternions (4D numbers) with stereographic projection. YouTube video, 6 September 2018. Available at: https://www.youtube.com/watch?v=d4EgbgTm0Bg

![Quaternions and 3D rotation, explained interactively](https://www.youtube.com/watch?v=zjMuIxRvygQ)
> With some reminder about euler angles and complex number, this video will introduce you how to describe 3D rotation using quaternions from *3:58*
>
><sub> Quaternions and 3D rotation, explained interactively. YouTube video, 26 October 2018. Available at: https://www.youtube.com/watch?v=zjMuIxRvygQ

As you have understood in these previous videos (if not we suggest you to re-watch from *17:25* on the [first video](https://www.youtube.com/watch?v=d4EgbgTm0Bg)), **Quaternions** are a generalization of complex numbers containing:
- **a real scalar part** $ \lambda_0 $
- **three imaginary components** $ [\lambda_1, \lambda_2, \lambda_3]^T$, which can be interpreted as a vector part $\underline{\lambda} $.

The **direction of the axis of rotation** $[x, y, z]^T$ is given by this vector $ \underline{\lambda} = [\lambda_1, \lambda_2, \lambda_3]^T $.

The **angle of rotation** $\theta$ is introduced in the following way in the quaternion $ Q $:

$$
\lambda_0 = \cos(\theta / 2), \quad \underline{\lambda} = \sin(\theta / 2)[x, y, z]^T,\quad ||x,y,z||=1  
$$

The rotations are therefore represented by **unit quaternions**:

$$
\lambda_0^2 + \lambda_1^2 + \lambda_2^2 + \lambda_3^2 = 1 
$$

The quaternion multiplication rules are a generalization of the complex number multiplication rules:

$$
\boxed{ Q = [ \{\lambda_0, \lambda_1, \lambda_2, \lambda_3\} ] = [ \{\lambda_0, \underline{\lambda}\} ] = [ \lambda_0 + i \lambda_1 + j \lambda_2 + k \lambda_3 ] }
$$

with

$$
i^2 = j^2 = k^2 = ijk = -1 
$$
$$
ij = k,\quad ji = -k,\quad jk = i,\quad kj = -i,\quad ki = j,\quad ik = -j 
$$

Note the **multiplication is non-commutative**! (William Rowan Hamilton, Dublin, 1843)

These rules lead to a sequence of rotation M and L:
$$
Q_M Q_L = \begin{pmatrix} \mu_0 \\ \underline{\mu} \end{pmatrix} \cdot \begin{pmatrix} \lambda_0 \\ \underline{\lambda} \end{pmatrix} = \begin{pmatrix} \mu_0\lambda_0 - \underline{\mu}^T\underline{\lambda} \\ \mu_0\underline{\lambda} + \lambda_0\underline{\mu} + \underline{\mu}\times\underline{\lambda} \end{pmatrix}
$$

<details markdown="1">
  <summary>Useful formulas</summary>

The conversion from quaternion to direction cosines (rotation matrix) and vice versa is given by:

$$
R = \begin{pmatrix} 2(\lambda_0^2 + \lambda_1^2) - 1 & 2(\lambda_1\lambda_2 - \lambda_0\lambda_3) & 2(\lambda_1\lambda_3 + \lambda_0\lambda_2) \\ 2(\lambda_1\lambda_2 + \lambda_0\lambda_3) & 2(\lambda_0^2 + \lambda_2^2) - 1 & 2(\lambda_2\lambda_3 - \lambda_0\lambda_1) \\ 2(\lambda_1\lambda_3 - \lambda_0\lambda_2) & 2(\lambda_2\lambda_3 + \lambda_0\lambda_1) & 2(\lambda_0^2 + \lambda_3^2) - 1 \end{pmatrix} = \begin{pmatrix} r_{11} & r_{21} & r_{31} \\ r_{12} & r_{22} & r_{23} \\ r_{13} & r_{23} & r_{33} \end{pmatrix}
$$

and the inverse transformation from the rotation matrix to quaternion is:

$
\lambda_0 = \frac{1}{2}\sqrt{r_{11}+r_{22}+r_{33}+1}
$

$
\underline{\lambda} = \frac{1}{2} \begin{pmatrix} \text{sgn}(r_{32}-r_{23})\sqrt{r_{11}-r_{22}-r_{33}+1} \\ \text{sgn}(r_{13}-r_{31})\sqrt{r_{22}-r_{11}-r_{33}+1} \\ \text{sgn}(r_{21}-r_{12})\sqrt{r_{33}-r_{22}-r_{11}+1} \end{pmatrix}
$

</details>


<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>
<!-- Question 1 -->
<p><strong>Question 1: Calculation of an orientation quaternion gives {1/2, 1/3, 1/3, 1/3}. Can this be correct?</strong></p>

<form id="q1-quaternion">
  <input type="radio" name="q1-quaternion" value="true"> True<br>
  <input type="radio" name="q1-quaternion" value="false"> False<br>

  <button type="button" onclick="checkMCQ('q1-quaternion', 'false', 
    'Correct! This cannot be correct because a valid quaternion representing orientation must have a unit norm (the sum of the squares of its elements should equal 1).', 
    'Incorrect. A valid quaternion representing orientation must have a unit norm.')">
    Check Answer
  </button>

  <p id="q1-quaternion-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: The quaternion {1/2, -1/2, -1/2, -1/2} represents a rotation of:</strong></p>

<form id="q2-rotation">
  <input type="radio" name="q2-rotation" value="60"> 60 degrees<br>
  <input type="radio" name="q2-rotation" value="120"> 120 degrees or -120 degrees, depending on axis direction<br>
  <input type="radio" name="q2-rotation" value="-60"> -60 degrees<br>
  <input type="radio" name="q2-rotation" value="invalid"> Is not a unit quaternion<br>

  <button type="button" onclick="checkMCQ('q2-rotation', '120', 
    'Correct! This quaternion corresponds to a rotation of 120 degrees (or -120 degrees, depending on the axis direction).', 
    'Incorrect. Please try again!')">
    Check Answer
  </button>

  <p id="q2-rotation-feedback"></p>
</form>


</details>



<!-- Mathematical Development Questions -->
<!--

EXERCICE DE LA EXERCISE-SET-4 EXERCISE 5 DE MR.BOURRI DE ROBOTIC FOR MANIPULATION
L'EXERCISE QUI SAPPLIQUE BIEN POUR LE CHAPITRE QUATERNION MAIS NA PAS PU ENCORE OBTENIR LACCORD DE MR BOURRI POUR LE METTRE SUR LE SITE, 

<details markdown="1">
  <summary>Mathematical Development Questions</summary>

> *Exercice insipired from the course <a href="https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en">Basics of Robotics for Manipulation</a>*

Consider the two sequences of rotations :
- Rotation of 90 degrees on the z axis followed by Rotation of 90 degrees on the y axis
- Rotation of 90 degrees on the y axis followed by Rotation of 90 degrees on the z axis

For each of these sequences:

1: Determine the resulting corresponding **quaternion**.

2: Deduce:
* (a) the corresponding **angles of rotation**.
* (b) the corresponding **unit axes of rotation**.

<details markdown="1">
<summary><strong>Click here for Solutions</strong></summary>

1: We start by calculating $Q_{y\,90^\circ}$ and $Q_{z\,90^\circ}$, the quaternions corresponding respectively to $R_y(90^\circ)$ and $R_z(90^\circ)$.


* For $Q_{y\,90^\circ}$, we have:
$$
\theta_y = 90^\circ \;\Rightarrow\; \cos(\theta_y/2)=\sin(\theta_y/2)=\frac{\sqrt{2}}{2}
$$

$$
\underline{\lambda}_y = \frac{\sqrt{2}}{2}
\begin{bmatrix}
0\cr
1\cr
0
\end{bmatrix}
(\underline{\lambda}_y\text{ is the axis part whose norm is } \sin(\theta/2))
$$

$$
\lambda_{y,0}=\cos(\theta_y/2)=\frac{\sqrt{2}}{2}
$$

And finally:
$$
Q_{y\,90^\circ}=
\begin{pmatrix}\lambda_{y,0}\cr
\underline{\lambda}_y
\end{pmatrix}
=\frac{\sqrt{2}}{2}
\begin{bmatrix}
1\cr
0\cr
1\cr
0
\end{bmatrix}
$$

* For $Q_{z\,90^\circ}$, we have:
$$
\theta_z = 90^\circ \;\Rightarrow\; \cos(\theta_z/2)=\sin(\theta_z/2)=\frac{\sqrt{2}}{2}
$$

$$
\underline{\lambda}_z = \frac{\sqrt{2}}{2}
\begin{bmatrix}
0\cr
0\cr
1
\end{bmatrix}
(\underline{\lambda}_z\text{ is the axis part whose norm is } \sin(\theta/2))
$$

$$
\lambda_{z,0}=\cos(\theta_z/2)=\frac{\sqrt{2}}{2}
$$

And finally:
$$
Q_{z\,90^\circ}=
\begin{pmatrix}\lambda_{z,0}\cr 
\underline{\lambda}_z
\end{pmatrix}
=\frac{\sqrt{2}}{2}
\begin{bmatrix}
1\cr
0\cr
0\cr
1
\end{bmatrix}
$$

We notice that the two quaternions are unitary (the opposite would have been surprising).

We then calculate the two sequences by multiplying the quaternions (the product is non‑commutative).

First sequence: $R_z(90^\circ) \rightarrow R_y(90^\circ)$

$$
Q_1 = Q_{y\,90^\circ}\,Q_{z\,90^\circ}
$$

Using $(a_0,\mathbf{a})(b_0,\mathbf{b})=(a_0 b_0-\mathbf{a}\cdot\mathbf{b},\; a_0\mathbf{b}+b_0\mathbf{a}+\mathbf{a}\times\mathbf{b})$, we get

$$
Q_1=\frac{1}{2}
\begin{bmatrix}
1\cr
1\cr
1\cr
1
\end{bmatrix}
$$

* Second sequence: $\mathbf{R_y}(90^\circ) \rightarrow \mathbf{R_z}(90^\circ)$

(Analogous computation gives another unit quaternion with different vector part due to non‑commutativity.)

$$
Q_2=\frac{1}{2}
\begin{bmatrix}
1\cr
-1\cr
1\cr
1
\end{bmatrix}
$$

---

2: (a) Corresponding rotation angles

* First sequence: $\mathbf{R_z}(90^\circ)\rightarrow\mathbf{R_y}(90^\circ)$:
$
\theta_1=2\arccos(\lambda_{1,0})=2\arccos\left(\frac{1}{2}\right)
$
and 
$
\theta_1 =2\arcsin\big(\lVert \lambda_{1} \rVert\big) = 
2\arcsin\left(\frac{\sqrt{3}}{2}\right)
\Rightarrow\;
\theta_1=\frac{2\pi}{3}\ \text{rad}=120^\circ
$

* Second sequence: $\mathbf{R_y}(90^\circ)\rightarrow\mathbf{R_z}(90^\circ)$:
$
\theta_2=2\arccos(\lambda_{2,0})=2\arccos\left(\frac{1}{2}\right)
$
and 
$
\theta_2 =2\arcsin\big(\lVert \lambda_{2} \rVert\big) 
=2\arcsin\left(\frac{\sqrt{3}}{2}\right)
\Rightarrow\;
\theta_2=\frac{2\pi}{3}\ \text{rad}=120^\circ
$


(b) Corresponding unit axes

* First sequence: $\mathbf{R_z}(90^\circ)\rightarrow\mathbf{R_y}(90^\circ)$:
$$
\mathbf{k}_1=\frac{\underline{\lambda}_1}{\sin(\theta_1/2)}
=\frac{1}{\sqrt{3}}
\begin{bmatrix}
1\cr
1\cr
1
\end{bmatrix}
$$

* Second sequence: $\mathbf{R_y}(90^\circ)\rightarrow\mathbf{R_z}(90^\circ)$:
$$
\mathbf{k}_2=\frac{\underline{\lambda}_2}{\sin(\theta_2/2)}
=\frac{1}{\sqrt{3}}
\begin{bmatrix}
-1\cr
1\cr
1
\end{bmatrix}
$$


</details>
-->


<!-- Additional Content -->
<details markdown="1">
  <summary>Additional Content</summary>

For further understanding of the definition of **Quaternions**, the following concise and **informative site** is recommended for **interactive version of these visuals**:

[Visualization Quaternions](https://eater.net/quaternions)

</details>

---

### 1.1.3.6: Collision Detection using Homogeneous Transforms  

In this chapter, we will explore how **collision detection** between robots can be performed using homogeneous transformations. 

Watch the following video to see this concept illustrated clearly:

![Homogeneous Transforms](https://www.youtube.com/watch?v=WQTnCIhkzNc)
> Here, you will compute a new homogeneous transformation matrix that describes the relationship between two end-effectors, given two separate transformation matrices ($H_1$ and $H_2$). This new matrix will provide the relative distances $d_x$ and $d_y$ between the two end-effectors. When both $d_x$ and $d_y$ become zero, it indicates that the two robots are in collision.
>
><sub> Avoid Collision using Homogeneous Transformations | Robotics 101. YouTube video, 13 July 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc

---

### 1.1.3.7: Inverse Kinematics of Robots
<!-- 
Inversly as the forward kinematics, inverse kinematics (also called Indirect Geometric Model, IGM) allow us to find the values of the joint positions given the position and orientation of the end-effector relative to the base and the values of all the geometric link parameters. -->

Inverse Kinematics (IK), also known as the **Indirect Geometric Model (IGM)**, allows us to determine the required joint positions (angles and link lengths) based on the desired position and orientation of the robot is end-effector, given the geometric parameters of its links. This process is essentially the opposite of forward kinematics.

**What exactly is Inverse Kinematics, and how can we use it to move a robot from point A to point B?**  
IK is one of the most intriguing and broadly used concepts in robotics. Simply put, inverse kinematics involves calculating the robot’s joint parameters (such as angles and link lengths) to position its end-effector precisely at a specified location and orientation.

If you have a solid understanding of forward kinematics, inverse kinematics becomes straightforward and intuitive.

Watch the following video for a clear introduction to inverse kinematics:

![Inverse Kinematics of Robots](https://www.youtube.com/watch?v=1-FJhmey7vk)
> In this video, you will explore another example of inverse kinematics using a planar robot. Interestingly, this robot features both revolute and prismatic joints, making its parameters a combination of joint angles and link lengths. This type of robot is specifically known as an **'RRP' robot**.
>
><sub> Inverse Kinematics of Robots | Robotics 101. YouTube video, 23 July 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc

![example_inverse_kinematics](https://www.youtube.com/watch?v=EzZDRwmk8Nw)
> Solved example of Inverse Kinematics with a planar robot
>
><sub> Inverse Kinematics of Robots (with solved example) | Robotics 101. YouTube video, 31 July 2022. Available at: https://www.youtube.com/watch?v=EzZDRwmk8Nw

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Inverse kinematics gives position and orientation of the end-effector in function of joint angles</strong></p>
<form id="inv-kin">
  <input type="radio" name="inv-kin" value="true"> True<br>
  <input type="radio" name="inv-kin" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'inv-kin', 
    'false', 
    'Correct!', 
    'Incorrect. It is the definition of direct kinematics.'
  )">
    Check Answer
  </button>

  <p id="inv-kin-feedback"></p>
</form>

</details>

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

Find the IGM (Inverse geometric model) of a 2DOF planar robot (see figure below): given x and y, what are $θ_1$ and $θ_2$?

- $x = L_1 \cos{\theta_1} + L_2 \cos{(\theta_1 + \theta_2)}$
- $y = L_1 \sin{\theta_1} + L_2 \sin{(\theta_1 + \theta_2)}$

*Hint: Use the trigonometric formulas for the sine and cosine of the sum of two angles, as well as the identity involving the sum of the squares of sine and cosine. Also, recall that we computed the forward kinematics in the exercise from Section 1.1.3.3

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/ex1_chap4.png" width="450" height="auto" alt="Fig 2">
</figure>

> *Exercice insipired from the course <a href="https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en">Basics of Robotics for Manipulation</a>*


<details markdown="1">
<summary><strong>Click here for Solutions</strong></summary>

As we have seen on the exercise from Section 1.1.3.3, 
- $x = L_1 c_1 + L_2 c_{1+2}$
- $y = L_1 s_1 + L_2 s_{1+2}$
and we also know that:
- $c^2 + s^2 = 1$

Using the law of cosines we see that the angle $\theta_2$ is given by:
- $c_2 = \frac{x^2 + y^2-L_{1}^2-L_{2}^2}{2 L_1 L_2}$
- $s_2 = \pm \sqrt(1-(c_2)^2)$

Hence, $\theta_2$ can be found by: 
$\boxed{\theta_2 = \arctan \frac{\pm \sqrt(1-(c_2)^2)}{c_2}}$

The choice of $\pm$ is arbitrary but important (it must be consistent) for pairs of final solutions.  

Moreover, finding the angle of $\theta_{2}$ by using the $\arctan$ function is advantageous, since it recovers both elbow-up and elbow-down solutions by choosing the positive and negative signs, respectively.

---

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/exsol_chap6.png" width="450" height="auto" alt="Fig 6">
</figure>

$\theta_1$ can be defined as $\theta_1 = \alpha - \beta$ where 
- $\alpha = \arctan \frac{y}{x}$
- $\beta = \arctan \frac{L_2 s_2}{L_1 + L_2 c_2}$

Therefore,  
$\boxed{\theta_1 = \arctan \frac{y}{x} - \arctan \frac{L_2 s_2}{L_1 + L_2 c_2}}$




<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_4_3.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>

---

### 1.1.3.8: Velocity Kinematics - Meet the Jacobian !

Ready to dive deeper into robotics? This section introduces you to one of the coolest concepts in robot motion: the **Jacobian Matrix**! 

Ever wondered how quickly and smoothly a robot is gripper moves in space? Here you will learn exactly how to calculate both the linear and angular velocities of a robot is end-effector. But that is not all—the Jacobian acts like a map , converting **joint velocities** into precise **end-effector movements**. Mastering it means you're unlocking a powerful tool that robotics experts use every day!

Watch the following video to get an understanding of velocity kinematics and the powerful Jacobian matrix:

![Velocity Kinematics & Jacobian Matrix](https://www.youtube.com/watch?v=Wud3aCXiSm8)
>
><sub> Velocity Kinematics & Jacobian Matrix | Robotics 101. YouTube video, 21 August 2022. Available at: https://www.youtube.com/watch?v=Wud3aCXiSm8

And there is even more! Discover how the Jacobian connects to the fascinating world of **Manipulability Ellipsoids**, showing you visually how robots move, avoid obstacles, and perform complex tasks efficiently.

Check it this video here:
![Velocity Kinematics & Manipulability Ellipsoids](https://www.youtube.com/watch?v=gdSTcJwf3L0)
>
><sub> Velocity Kinematics & Manipulability Ellipsoids | Robotics 101. YouTube video, 3 September 2022. Available at: https://www.youtube.com/watch?v=gdSTcJwf3L0


<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: The Jacobian matrix of a robot related the joint positions with the joint torques</strong></p>
<form id="jac">
  <input type="radio" name="jac" value="true"> True<br>
  <input type="radio" name="jac" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'jac', 
    'false', 
    'Correct!', 
    'Incorrect. See next question'
  )">
    Check Answer
  </button>

  <p id="jac-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: The Jacobian matrix of a robot relates the position at the level of the tool woth the articular positions</strong></p>
<form id="jac2">
  <input type="radio" name="jac2" value="true"> True<br>
  <input type="radio" name="jac2" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'jac2', 
    'false', 
    'Correct!', 
    'Incorrect.'
  )">
    Check Answer
  </button>

  <p id="jac2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: The Jacobian matrix of a robot relates the force applied to the level of the tool with the joint torques</strong></p>
<form id="jac3">
  <input type="radio" name="jac3" value="true"> True<br>
  <input type="radio" name="jac3" value="false"> False<br>

  <button type="button" onclick="checkTrueFalse(
    'jac3', 
    'true', 
    'Correct!', 
    'Incorrect.'
  )">
    Check Answer
  </button>

  <p id="jac3-feedback"></p>
</form>

</details>

Now that you have understood the exciting concept of the Jacobian, let is practice calculating it ourselves! Follow along with this detailed solved example in the video below, and then reinforce your skills with some hands-on exercises. Give it a try! 

![how to find Jacobian Matrix](https://www.youtube.com/watch?v=EdvAHmIONMs)
> Detailed example of how to solve jacobian Matrix
>
><sub> Jacobian | Robotics 101. YouTube video, 16 September 2022. Available at: https://www.youtube.com/watch?v=EdvAHmIONMs

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

> *From Practice Exercise 5.1, MODERN ROBOTICS, Practice Exercices*

**Exercice 1:**

Figure 4.1 shows the KUKA LBR iiwa 7R robot arm. The figure defines an {s} frame at the base with the ŷ_s-axis pointing out of the page and a {b} frame aligned with {s} at the end-effector. The robot is at its home configuration. The screw axes for the seven joints are illustrated (positive rotation about these axes is by the right-hand rule). The axes for joints 2, 4, and 6 are aligned, and the axes for joints 1, 3, 5, and 7 are identical at the home configuration. The dimensions are $L_1 = 0.34 \, m$, $L_2 = 0.4 \, m$, $L_3 = 0.4 \, m$, and $L_4 = 0.15 \, m$.  

**(a)**
What is the space Jacobian when the robot is at its home configuration?  

**(b)**
What is the body Jacobian when the robot is at its home configuration?  

**(c)** 
What is the rank of the space and body Jacobian at the home configuration? (It is always the same.) Is the home configuration a singularity?  
What is the dimension of the space of feasible twists at the home configuration?  

*For the remaining questions, assume the angles of the joints are $i\pi/16$ for joints $i = 1 \dots 7$*.  

**(d)** 
What is the space Jacobian? What joint torques are needed to generate the wrench  
$\mathcal{F}_s = (1 \, Nm, 1 \, Nm, 1 \, Nm, 1 \, Nm, 1 \, N, 1 \, N, 1 \, N)$?  
What is the manipulability measure $\mu_2$ for the angular velocity manipulability ellipsoid in the space frame?  
What is the manipulability measure $\mu_2$ for the linear manipulability ellipsoid in the space frame?  

**(e)** 
What is the body Jacobian? What joint torques are needed to generate the wrench  
$\mathcal{F}_b = (1 \, Nm, 1 \, Nm, 1 \, Nm, 1 \, Nm, 1 \, N, 1 \, N, 1 \, N)$?  
What is the manipulability measure $\mu_2$ for the angular velocity manipulability ellipsoid in the body frame?  
What is the manipulability measure $\mu_2$ for the linear manipulability ellipsoid in the body frame?  


<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/4.1.jpeg" width="450" height="auto" alt="Fig 4.1">
  <figcaption>
    <strong>Figure 4.1.</strong> The KUKA LBR iiwa 7-dof robot (LBR = Leichtbauroboter, German for lightweight robot; iiwa = intelligent industrial work assistant).
  </figcaption>
</figure>

---

> *From Practice Exercise 5.3, MODERN ROBOTICS, Practice Exercices*

**Exercice 2:**

Figure 5.1 shows an RPR robot that is confined to the plane of the page.  
An end-effector frame {b} is illustrated, where the $\hat{x}_b$-axis is out of the page.  
The directions of positive motion of the three joints are indicated by arrows.  
The axes of the two revolute joints are out of the page, and the prismatic joint moves in the plane of the page. Joint 1 is at $q_1 = (0, -5, -7)$ in {b} and joint 3 is at $q_3 = (0, -1, -3)$ in {b}.  

Write the body Jacobian $J_b(\theta)$ for the configuration shown.  
All entries of your $J_b(\theta)$ matrix should be numerical (no symbols or math).


<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/5.1.jpeg" width="300" height="auto" alt="Fig 5.1">
  <figcaption>
    <strong>Figure 5.1.</strong> An RPR robot
  </figcaption>
</figure>

<!-- Practice what you've learned with Exercises **1** and **2** below.
*(Note: Exercise 2.8 on finding singularities will be introduced in the next video.)* -->


<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_5.pdf'}}" width="100%" height="600px"></iframe> -->

<details markdown="1">
<summary><strong>Click here for Solutions</strong></summary>

**Exercice 1:**

Angular units are radians and linear units are mm.

**(a)**  
$$
J_s =
\begin{bmatrix}
0 & 1 & 0 & 1 & 0 & 1 & 0 \cr
0 & 0 & 0 & 0 & 0 & 0 & 0 \cr
1 & 0 & 1 & 0 & 1 & 0 & 1 \cr
0 & 0 & 0 & 0 & 0 & 0 & 0 \cr
0 & 0.34 & 0 & 0.74 & 0 & 1.14 & 0 \cr
0 & 0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix}.
$$

**(b)**  
$$
J_b =
\begin{bmatrix}
0 & 1 & 0 & 1 & 0 & 1 & 0 \cr
0 & 0 & 0 & 0 & 0 & 0 & 0 \cr
1 & 0 & 1 & 0 & 1 & 0 & 1 \cr
0 & 0 & 0 & 0 & 0 & 0 & 0 \cr
0 & -0.95 & 0 & -0.55 & 0 & -0.15 & 0 \cr
0 & 0 & 0 & 0 & 0 & 0 & 0
\end{bmatrix}.
$$

**(c)**  
The rank is three. Columns 2, 3, and 4 of the Jacobians are linearly independent;  
all feasible velocity directions are linear combinations of these three columns.  
The space of feasible twists is three dimensional.

**(d)**  Calculate $J_s(\theta)$ using **JacobianSpace**.

$$
\tau = J_s^{T}(\theta)\,\mathcal{F}_s
= \begin{bmatrix} 1 & 1.44 & 0.78 & 1.72 & 1.13 & 0.54 & 2.29 \end{bmatrix}^{T}.
$$

$$
\mu_2(J_{sw} J_{sw}^{T}) = 2.427, \qquad
\mu_2(J_{sv} J_{sv}^{T}) = 30.5.
$$

**(e)**  Calculate $J_b(\theta)$ using **JacobianBody**.

$$
\tau = J_b^{T}(\theta)\,\mathcal{F}_b
= \begin{bmatrix} -0.19 & 1.76 & 0.18 & 0.26 & 1.36 & -0.96 & 1 \end{bmatrix}^{T}.
$$

$$
\mu_2(J_{bw} J_{bw}^{T}) = 2.427, \qquad
\mu_2(J_{bv} J_{bv}^{T}) = 20.6.
$$


---

**Exercice 2:**
$$
J_b =
\begin{bmatrix}
1 & 0 & 1 \cr
0 & 0 & 0 \cr
0 & 0 & 0 \cr
0 & 0 & 0 \cr
-7 & 1/\sqrt(2) & -3 \cr
5 & 1/\sqrt(2) & 1 
\end{bmatrix}
$$

You can see this by visualization (imagine turntables at joints 1 and 3 and visualize the motion of a point at the origin of $b$, and imagine a conveyor moving in the direction of joint 2) or by recognizing that $\omega_1 = \omega_3 = (1, 0, 0)$ and points on the joint 1 and 3 axes are $q_1$ and $q_3$ and calculating $v_i = -\,\omega_i \times q_i$. For joint 2, the linear direction of positive motion is given by $v_2 = (q_3 - q_1)/\lVert q_3 - q_1 \rVert$.



<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_5.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>

---

### 1.1.3.9: Robot Singularities & how to find them

Singularities occur when a robot configuration causes it to lose the ability to move or become blocked in certain directions. Understanding and identifying these singularities is essential to safe and efficient robot operation.


![Robot Singularities & how to find them](https://www.youtube.com/watch?v=WXEOr7X2bPE)
> Definition of robot singularities are and how you can find them
>
><sub> Singularities | Robotics 101. YouTube video, 17 October 2022. Available at: https://www.youtube.com/watch?v=WXEOr7X2bPE

For *serial manipulators*, the singular positions result from the **loss of degrees of freedom** while in a *parallel manipulator*, they result of the **gain of one or more degrees of freedom**. Most of the time, passing through a singularity causes **over constraint**, to then inducing the loss of control of one or more degrees of freedom. Which means, not controllable, which is not good. 

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What condition must be satisfied to identify a robot is singularity ? det(J) = ...</strong></p>
<form id="q1-sing">
  <input type="radio" name="q1-sing" value="I"> Identity Matrix<br>
  <input type="radio" name="q1-sing" value="0"> 0<br>
  <input type="radio" name="q1-sing" value="non0"> Non-zero value<br>

  <button type="button" onclick="checkMCQ('q1-sing', '0', 
    'Correct! The determinant det(J) must equal 0 to identify singularities.', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q1-sing-feedback"></p>
</form>

<!-- Question 2 -->
**Question 2:** Consider the following Delta robot:

![Delta robot]({{ site.baseurl }}/assets/images/kinematics/delta_robot.png)

Which of the following diagrams represent singularities of this Delta robot? *(Multiple answers possible)*

![Singularities of Delta robot]({{ site.baseurl }}/assets/images/kinematics/delta_robot_sing.png)

<form id="q2-sing">
  <input type="checkbox" name="q2-sing" value="a"> <strong>a)</strong> When the 6 bars (3 pairs) are all parallel in the same direction<br>
  <input type="checkbox" name="q2-sing" value="b"> <strong>b)</strong> When 4 bars (2 pairs) are parallel<br>
  <input type="checkbox" name="q2-sing" value="c"> <strong>c)</strong> When 4 bars (2 pairs) lie in the same plane or two parallel planes<br>
  <input type="checkbox" name="q2-sing" value="d"> <strong>d)</strong> When the 3 parallelograms are arranged in three parallel or coincident planes<br><br>

  <button type="button" onclick="checkMultipleAnswers('q2-sing', ['a', 'b', 'c', 'd'], 
    'Correct! All four diagrams represent singularities of the Delta robot.<br><br>
    <ul>
      <li><strong>(a)</strong> The nacelle (platform connected by 6 bars) moves on a spherical surface and undesirably rotates around the vertical axis.</li>
      <li><strong>(b)</strong> The nacelle retains only one degree of freedom, allowing movement along an arc of a circle.</li>
      <li><strong>(c)</strong> The nacelle has one degree of freedom, rotating around the axis connecting the joints between the nacelle and the other two bars.</li>
      <li><strong>(d)</strong> The nacelle acquires three degrees of freedom: two undesired rotations around horizontal axes within its plane, and a small translation perpendicular to that plane.</li>
    </ul>
    ', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q2-sing-feedback"></p>
</form>

> *Exercice insipired from the course <a href="https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en">Basics of Robotics for Manipulation</a>*


</details>


<!-- Mathematical Development Questions -->
<!--

EXERCICE DE LA EXERCISE-SET-5 EXERCISE 2 DE MR.BOURRI DE ROBOTIC FOR MANIPULATION
L'EXERCISE QUI RESUME BIEN LE CHAPITRE ENTIER MAIS NA PAS PU ENCORE OBTENIR LACCORD DE MR BOURRI POUR LE METTRE SUR LE SITE, 
 

<details markdown="1">
  <summary>Mathematical Development Questions</summary>

> *Exercice insipired from the course <a href="https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en">Basics of Robotics for Manipulation</a>*

Consider the following Lambda robot:
<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/ex.chap8.jpeg" width="450" height="auto" alt="Fig chap 8">
</figure>

The two arms are of the length $l (AC=BC=l)$. 

**Kinematics:**

**a.** Is it a parallel or a serial robot? 

**b.** Give the number of DOF. 

**c.** Wrtie down the vector for:
* (1) the position of the end effector: $c$ = ()
* (2) the generalized coordinates: $q$ = ()
* (3) the output velocity:  $\dot(c)$ = ()
* (4) the joint velocity: $\dot(q)$ = ()

**d.** Suggest applications for this robot. 

**Modeling:** 

**e.** Find the DGM and IGM of this robot. 

**f.** Deduce the direct and inverse Jacobians of this robot. 

**g.** Explain the utility of Jacobian matrices. 

**h.** Find the singular positions of this robot. 

---

<details markdown="1">
<summary><strong>Click here for Solutions</strong></summary>

**a.**  This robot has parallel kinematics. 

---

**b.**  It is a robot with 2 DOF, a translation along $X$ and a translation along $Y$: 
- If both motorized joints move in the same direction at the same speed, the movement is only along $X$. 
- If both motorized joints move in opposite directions at the same speed, the movement is only along $Y$. 
- In all other cases, the movement is coupled. 

---

**c.** 
* (1) The tool position vector is $c = \frac{x}{y}$
* (2) The generalized coordinate vector is $q = \frac{q_1}{q_2}$
* (3) The output velocity vector is $\dot(c) = \frac{\dot(x)}{\dot(y)}$
* (4) The joint velocity vector is $\dot(q) = \frac{\dot(q_1)}{\dot(q_2)}$

---

**d.** The applications of this robot are multiple: 
- Seated position rehabilitation movements, Figure Lambda (a), [LHS-SA](https://www.lhs-sa.ch/)  
- Gait trainer from Reha Technology, Figure Lambda (b), [Reha Technology](https://www.rehatechnology.com/en)  

---


**e.** 

**Direct geometric model (DGM):**

$$
\begin{cases}
x \;=\; q_1 + \dfrac{q_2 - q_1}{2} \;=\; \dfrac{q_1}{2} + \dfrac{q_2}{2},\cr\cr
y \;=\; \sqrt{\,l^2 - \left(\dfrac{q_2 - q_1}{2}\right)^{2}}
\end{cases}
$$

**Inverse geometric model (IGM):**

$$
\begin{cases}
q_1 \;=\; x - \sqrt{\,l^2 - y^2},\cr\cr
q_2 \;=\; x + \sqrt{\,l^2 - y^2}
\end{cases}
$$

---

**f.** **Direct Jacobian matrix** $J$ (derivative of the DGM w.r.t. the joint variables $q_1,q_2$):

Since
$$
x=\tfrac{1}{2}q_1+\tfrac{1}{2}q_2, \qquad
y=\sqrt{\,l^2-\left(\dfrac{q_2-q_1}{2}\right)^2},
$$
we get
$$
\frac{\partial x}{\partial q_1}=\frac{1}{2},\quad
\frac{\partial x}{\partial q_2}=\frac{1}{2},\quad
\frac{\partial y}{\partial q_1}=\frac{q_2-q_1}{4\sqrt{\,l^2-\left(\dfrac{q_2-q_1}{2}\right)^2}},\quad
\frac{\partial y}{\partial q_2}=-\frac{q_2-q_1}{4\sqrt{\,l^2-\left(\dfrac{q_2-q_1}{2}\right)^2}}.
$$

Therefore
$$
J=
\begin{bmatrix}
\dfrac{\partial x}{\partial q_1} & \dfrac{\partial x}{\partial q_2} \cr
\dfrac{\partial y}{\partial q_1} & \dfrac{\partial y}{\partial q_2}
\end{bmatrix}
=
\begin{bmatrix}
\frac{1}{2} & \frac{1}{2} \cr
\dfrac{q_2-q_1}{4\sqrt{\,l^2-\left(\dfrac{q_2-q_1}{2}\right)^2}} &
-\dfrac{q_2-q_1}{4\sqrt{\,l^2-\left(\dfrac{q_2-q_1}{2}\right)^2}}
\end{bmatrix}.
$$

**Inverse Jacobian** $J^{-1}$ (derivative of the IGM w.r.t. the tool coordinates $(x,y)$):

From
$$
q_1=x-\sqrt{\,l^2-y^2}, \qquad q_2=x+\sqrt{\,l^2-y^2},
$$
we obtain
$$
\frac{\partial q_1}{\partial x}=1,\quad
\frac{\partial q_1}{\partial y}=\frac{y}{\sqrt{\,l^2-y^2}},\quad
\frac{\partial q_2}{\partial x}=1,\quad
\frac{\partial q_2}{\partial y}=-\frac{y}{\sqrt{\,l^2-y^2}}.
$$

Thus
$$
J^{-1} =
\begin{bmatrix}
\dfrac{\partial q_1}{\partial x} & \dfrac{\partial q_1}{\partial y} \cr
\dfrac{\partial q_2}{\partial x} & \dfrac{\partial q_2}{\partial y}
\end{bmatrix}
=
\begin{bmatrix}
1 & \dfrac{y}{\sqrt{\,l^2-y^2}} \cr
1 & -\dfrac{y}{\sqrt{\,l^2-y^2}}
\end{bmatrix}.
$$

---

**g.** The Jacobian matrices have multiple applications:  

1: Relation between the speeds:  

$$
\begin{pmatrix}
\dot{x} \cr
\dot{y}
\end{pmatrix}
= J(q_{1}, {q_2})
\begin{pmatrix}
\dot{q}_1 \cr
\dot{q}_2
\end{pmatrix}
$$

$$
= f_{direct}({q_1}, {q_2}, \dot{q}_1, \dot{q}_2)
$$

From the knowledge of the speeds of motors 1 and 2, we can deduce the speeds at the level of the tool.  
This matrix is a relationship between the tool and joint speeds: the direct Jacobian matrix is also a reduction matrix.  

$$
\begin{pmatrix}
\dot{q}_1 \cr
\dot{q}_2
\end{pmatrix}
= J^{-1}(x,y)
\begin{pmatrix}
\dot{x} \cr
\dot{y}
\end{pmatrix}
$$

$$
= f_{inverse}({x}, {y}, \dot{x}, \dot{y})
$$

Thanks to the knowledge of the desired speeds at the tool level, we can choose the motors (it is a question of dimensioning only the speed of the motors).  
It should be noted that these joint speeds (motors) depend on the working position of the robot, and it is necessary to do an in-depth analysis to size the worst case.  

2: Relation between joint and tool differential movements is as follows:  

$$
\begin{pmatrix}
\Delta x \cr
\Delta y
\end{pmatrix}
= J(q_1, q_2)
\begin{pmatrix}
\Delta q_1 \cr
\Delta q_2
\end{pmatrix}
= f_{direct}(q_1, q_2, \Delta q_1, \Delta q_2)
$$

Thus, from the joint resolutions (sensors at the level of the motors), we deduce the resolutions at the level of the tool.  
Note that this tool resolution depends on the working position.  

$$
\begin{pmatrix}
\Delta q_1 \cr
\Delta q_2
\end{pmatrix}
= J^{-1}(x,y)
\begin{pmatrix}
\Delta x \cr
\Delta y
\end{pmatrix}
= f_{inverse}(x, y, \Delta x, \Delta y)
$$

From the knowledge of the tool resolution specified by the specifications ($\Delta x$ and $\Delta y$), we deduce the joint resolutions at the level of the motors ($\Delta q_1$ and $\Delta q_2$).  
These joint resolutions (motor sensors) depend on the working position of the robot, and it is necessary to do an in-depth analysis to size the worst case.  

**h.** The direct Jacobian matrix is:  

$$
J =
\begin{bmatrix}
\frac{1}{2} & \frac{1}{2} \cr
\frac{q_2 - q_1}{4 \sqrt{l^2 - \left( \tfrac{q_2 - q_1}{2} \right)^2}} & \frac{q_1 - q_2}{4 \sqrt{l^2 - \left( \tfrac{q_2 - q_1}{2} \right)^2}}
\end{bmatrix}.
$$

and its determinant is  

$$
\frac{q_1 - q_2}{4 \sqrt{l^2 - \left( \tfrac{q_2 - q_1}{2} \right)^2}}
$$  

The singularities are found for a null determinant and for invalid values, i.e.:  

$$\boxed{q_1 = q_2 \quad \text{and} \quad q_2 = 2l + q_1}$$

<figure style="text-align:center;">
  <img src="{{ site.baseurl }}/assets/images/kinematics/sol.singul.chap8.jpeg" width="450" height="auto" alt="Fig. Sing">
  <figcaption>
    <strong>a.</strong> Parallel singularity: $q_1 = q_2$ (left) & <strong>b.</strong> Serial singularity: $q_2 = 2 l + q_1$ (right)
  </figcaption>
</figure>

We could have also found these values by using a drawing, as in the figure above. 

</details>

</details>
-->


<!-- Additional Content -->
<details markdown="1">
  <summary>Additional Content</summary>

For further understanding of the definition of **Singularities**, the following concise and informative video is recommended:

![Singularities (Prof. Kevin Lynch)](https://www.youtube.com/watch?v=vjJgTvnQpBs)
><sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 5.3: Singularities. YouTube video, 27 August 2017. Available at: https://www.youtube.com/watch?v=vjJgTvnQpBs*</sub>
>
><sub>*Lynch, K.M. and Park, F.C. (2017) Modern Robotics: Mechanics, Planning, and Control. Cambridge: Cambridge University Press.*</sub>


</details>

---

## 1.1.4 Programming

Let is move on to maybe the most exciting part: applying the kinematics concepts you have learned in code and seeing your robot working right in front of you!

*(Please refer to the **Install Webots** section if you haven't installed it yet.)*


## **Exercise 1: Dobot Pick-and-Place (Forward Kinematics)** Level: **

### Step 1: Setup your environment

1. 📁 [Download the `dobot` folder]({{ site.baseurl }}/assets/downloads/kinematics/dobot_2025.zip)
2. Extract the downloaded `.zip` file.
3. Launch Webots. From the top-left corner select **File → Open World**.
4. Navigate to the extracted `dobot_2025/world` folder and select your `.wbt` file.


### Step 2: Let is start coding!

Once successfully opened, your robot and its environment should appear, as illustrated in the screenshot below:

<img src="{{ site.baseurl }}{{ '/assets/images/kinematics/dobot.png' }}" width="500px" alt="Kinematics Image">


Now, follow the instructions provided on the right side panel within Webots, and complete the code to make your robot do the "**Pick and Place**".


> **💡 Helpful Suggestion:**  
> For detailed explanations of variables, robot schematics, and further clarifications that could greatly assist your understanding and coding, we strongly recommend reviewing the figures and content available on [this page from Robotics for Creative Practice](https://courses.ideate.cmu.edu/16-375/f2024/text/simulations/dobot.html).

> *If the Python file isn't open, select your robot in the scene tree (left panel), right-click and choose **Edit controller**, or load it manually via Webots' text editor (right panel) `dobot_2025/controllers/dobot` folder and select your `.py` .*

Once you have implemented all the "COMPLETE THIS LINE OF CODE" sections, click "Build" or "Save"(`CTRL+S`) to compile your project, and then start the simulation.

**Good luck and have fun!**

<details markdown="1">
  <summary>Answer</summary>

After you have attempted the exercise and want to verify your solution, you can download this file to check your answers and compare values:

📁 [Answers_Dobot]({{ site.baseurl }}/assets/downloads/kinematics/dobot.py)

</details>

---

## **Exercise 2: IRB Robot Inverse Kinematics (Using IKPy)** Level: *

### Step 1: Coding 

1. 📁 [Download the `irb` folder]({{ site.baseurl }}/assets/downloads/kinematics/irb_2025.zip) (follow the same step as before).
2. Extract the folder, open Webots, and load the `.wbt` file from the extracted `irb/worlds` folder.
3. Follow the on-screen instructions in Webots, filling in sections marked `"COMPLETE THIS LINE OF CODE"`.

<details markdown="1">
  <summary>Answer</summary>

After you have attempted the exercise and want to verify your solution, you can download this file to check your answers and compare values:

📁 [Answers_irl]({{ site.baseurl }}/assets/downloads/kinematics/inverse_kinematics.py)

</details>

### Step 2: Understanding the Process (Feedback)
As you have probably noticed by completing the coding exercise, manually programming inverse kinematics can become quite complex, especially for practical robotics applications. Usually, in real-world scenarios, specialized software or libraries are utilized to handle these calculations efficiently, rather than implementing all functions by hand. So you are very lucky for this chapter, you only need to understand how to use it !

In this example with your robot, a Python library called `ikpy` is used. This library provides convenient functions for computing inverse kinematics: you simply input the desired position (x, y, z), and the current joint positions, and `ikpy` performs all the necessary calculations.

If you're curious about how these calculations are done internally or if you'd like to learn more about this library, you can explore the official documentation [here](https://ikpy.readthedocs.io/en/latest/ikpy.html).

### Step 3: Observation 
You can also have some fun by clicking on the yellow-black sphere and translating or rotating it.
If your code is correct, the robot arm will continuously attempt to reach the sphere, as long as it remains within its workspace.

<!-- <video width="500" controls>
  <source src="{{ site.baseurl }}/assets/videos/inv_kinematics.mp4" type="video/mp4">
</video> -->

<video width="640" height="360" controls>
  <source src="{{ '/assets/videos/kinematics/inv_kinematics.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

<!-- STILL TO DO, enlever les trucs sur la video et checker les figures, exsol_chap4.png ou 6  est bizarre  -->

## 1.1.5 Credits

This course page was created by **Shujiro Shobayashi, MSc in Robotics at EPFL**, and funded by **IEEE RAS** and **EPFL**.  


This course uses videos content shared by [Mohammad Zainullah Khan](https://www.zainullah.com/) and closely follows the structure, videos and exercises from [Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html) courses, with some additional videos and conceptual and mathematical exercises.



<!-- 
This section of the course is primarily based on content shared by **Mohammad Zainullah Khan**, an engineer with a Master’s degree in Mechanical Engineering (specializing in robotics, design, and mechatronics) from the University of Dayton. You can find more information on his website: [www.zainullah.com](https://www.zainullah.com/).

Mohammad’s videos are **well-structured**, **visually engaging** and **not very long** (less than 10 minute), making them an excellent resource for anyone beginning to study kinematics for robotics. We recommend starting with the videos listed below to build a solid foundation. 

Additionally other videos from other youtubers that we have found the most relevant to explain the phenomenom or concepts are proposed. 

Once you’ve grasped the basics, you can further strengthen your understanding by working through  conceptual and mathematical exercises are inspired by [Prof. Mohamed Bouri](https://people.epfl.ch/mohamed.bour), Professor at EPFL. 

For those looking to deepen their understanding or seeking clear explanations of more complex topics, we also suggest additional short and highly instructive videos by [Prof. Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html), Professor of Mechanical Engineering at Northwestern University. These videos are based on the book "Modern Robotics:  Mechanics, Planning, and Control," by Kevin Lynch and Frank Park, Cambridge University Press 2017. See http://modernrobotics.org for information on the book, free software, and other materials. -->

## 1.1.6 Ressources

### Books
- [Modern Robotics:  Mechanics, Planning, and Control](http://modernrobotics.org)," by Kevin Lynch and Frank Park, Cambridge University Press 2017.

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_2) (Chapter 2. Kinematics)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/pick.html) (Chapter 3. Basic Pick and Place)

For those looking to deepen their understanding or seeking clear explanations of more complex topics, we also suggest additional short and highly instructive videos by [Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html). These videos are based on the book "Modern Robotics:  Mechanics, Planning, and Control," by Kevin Lynch and Frank Park, Cambridge University Press 2017. See http://modernrobotics.org for information on the book, free software, and other materials

### Videos

- Contents shared by **[Mohammad Zainullah Khan](https://www.zainullah.com/)**, an engineer with a Master’s degree in Mechanical Engineering (specializing in robotics, design, and mechatronics) from the University of Dayton.

- Contents shared by **[Prof. Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html)**, Professor of Mechanical Engineering at [Northwestern University](https://www.northwestern.edu/).

- [Robotic Manipulation](https://www.youtube.com/watch?v=ZOXp_wixIzo) (MIT 2020)

### Exercices 

- <a id="ref4"></a> **Modern Robotics — Practice Exercises (PDF)** (Dec 6, 2018) & **Exam Exercises from Seoul National University (PDF)** (2017-2020).  
  *Supplemental to* **Modern Robotics: Mechanics, Planning, and Control** (Cambridge University Press, 2017).  
  Contributions: Tito Fernandez, Kevin M. Lynch, Huan Weng, Zack Woodruff.  
  [https://hades.mech.northwestern.edu/images/e/ef/MR_practice_exercises.pdf](https://hades.mech.northwestern.edu/images/e/ef/MR_practice_exercises.pdf)

- <a id="ref6"></a> **[Basics of Robotics for Manipulation](https://isa.epfl.ch/imoniteur_ISAP/!itffichecours.htm?ww_i_matiere=2917228952&ww_x_anneeAcad=2840683608&ww_i_section=944263&ww_i_niveau=6683147&ww_c_langue=en) — Inspired Exercises**  
  *Inspired by the course* **Basics of Robotics for Manipulation** (EPFL).  
  Instructor: [Prof. Mohamed Bouri](https://people.epfl.ch/mohamed.bouri)  
  



<!-- ### Exercices 

- [IN PROGRESS]
<!-- - Conceptual and mathematical exercises are inspired by **[Mr. Mohamed Bouri](https://people.epfl.ch/mohamed.bour)**, giving the course [Basic of Robotics for Manipulation](https://edu.epfl.ch/coursebook/en/basics-of-robotics-for-manipulation-MICRO-450) at [EPFL](https://www.epfl.ch/fr/).  -->

<!-- ### Programming

- Exercises adapted from the course **[Robotics for Creative Practice](https://courses.ideate.cmu.edu/16-375/f2022/)** taught by **[Dr. Garth Zeglin](https://www.cs.cmu.edu/~garthz/)**, instructor at [Carnegie Mellon University](https://www.cmu.edu/).  
  Content licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 

 -->


---

[Back to Top](#start)