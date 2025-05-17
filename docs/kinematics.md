---
title: Kinematics
parent: Courses
layout: default
math: mathjax
nav_order: 2
---

<!-- Link external JavaScript file -->
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


# Kinematics 

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1. Prerequisites
To get the most out of this Kinematics module, it’s helpful to have:

1. **Basic Mathematics**  
   - Familiarity with **[trigonometry](mathematical-foundation)** (sine, cosine, angle addition formulas).  
   - Understanding of **[linear algebra](mathematical-foundation)** (vectors, matrices, basic matrix operations).  
   - Comfort with **[calculus](mathematical-foundation)** (especially differentiation), which is useful for topics like velocity kinematics and the Jacobian.

2. **Fundamental Physics or Mechanics**  
   - Basic concepts of **rigid-body motion** (translational and rotational movement).  
   - General understanding of **forces** and **torques** can be helpful, though kinematics itself does not address them directly.

While you don’t need to be an expert in any one of these areas, having a comfortable grasp of each will make your study of kinematics more productive and enjoyable.

---

## 2. General Motivation

![Delta Robot Pick and Place](https://www.youtube.com/watch?v=8j5hPlHTZI8)
><sub>*Delta robot Pick and Place. YouTube video, 14 June 2021. Available at: https://www.youtube.com/watch?v=8j5hPlHTZI8*</sub>

Have you ever watched a precision robot—like the Delta robot in the video—pick and place objects at incredible speed and accuracy? These agile machines seem are well known for their fluidity and precision. But behind the impressive motion lies a well-structured branch of mechanics called **kinematics**.

Kinematics, often referred to as the “**geometry of movement**,” is the study of *how bodies move in space without considering the forces or torques causing the motion*. By focusing on the geometry and arrangement of joints, links, and end-effectors, kinematics allows us to:

- ***Predict and Control Robot Positions***: From assembly lines to surgical suites, robots must position their end-effectors at **exact points in space**. Kinematics equations provide the road map, telling us how each joint angle translates into a specific position and orientation.

- ***Design Efficient Mechanisms***: Whether it’s a Delta robot on a factory floor or a humanoid robot in a research lab, well-planned kinematic structures enable robots to work **faster**, with better range of motion and fewer mechanical constraints.

- ***Streamline Path Planning***: From pick-and-place tasks to drawing complex shapes, kinematics helps in **calculating paths**, ensuring the robot can move smoothly from one point to another without collisions or awkward joint motions.

In this chapter, you’ll explore different ways of representing positions and orientations in 3D space, understand the kinematics behind common robotic joints, and learn a systematic way to map your robot’s geometry into the equations that bring the entire mechanism to life. By mastering kinematics, you’ll have a strong foundation for making robots move **precisely** and **reliably**, unlocking a world of innovative possibilities.

---

## 3. Course Content


<!-- This course closely follows videos content shared by [Mohammad Zainullah Khan](https://www.zainullah.com/) and [Prof. Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html) with some additional videos and conceptual and mathematical exercises. -->

<!-- 
This section of the course is primarily based on content shared by **Mohammad Zainullah Khan**, an engineer with a Master’s degree in Mechanical Engineering (specializing in robotics, design, and mechatronics) from the University of Dayton. You can find more information on his website: [www.zainullah.com](https://www.zainullah.com/).

Mohammad’s videos are **well-structured**, **visually engaging** and **not very long** (less than 10 minute), making them an excellent resource for anyone beginning to study kinematics for robotics. We recommend starting with the videos listed below to build a solid foundation. 

Additionally other videos from other youtubers that we have found the most relevant to explain the phenomenom or concepts are proposed. 

Once you’ve grasped the basics, you can further strengthen your understanding by working through  conceptual and mathematical exercises are inspired by [Prof. Mohamed Bouri](https://people.epfl.ch/mohamed.bour), Professor at EPFL. 

For those looking to deepen their understanding or seeking clear explanations of more complex topics, we also suggest additional short and highly instructive videos by [Prof. Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html), Professor of Mechanical Engineering at Northwestern University. These videos are based on the book "Modern Robotics:  Mechanics, Planning, and Control," by Kevin Lynch and Frank Park, Cambridge University Press 2017. See http://modernrobotics.org for information on the book, free software, and other materials. -->

⚠️ **Note on Notation**: 
>*Please be aware that notation, variable naming, and the style of writing equations may slightly differ between instructors. Always refer to the provided formulas and definitions in this course when working on assignments or exercises to avoid any confusion.*

### Chapter 0 : General Concepts
In this chapter we are first going to learn how to represent robots, what is a joint, degrees of freedom, etc. before diving into specific transformations (2D coordinate transformations, rotation matrices, homogeneous matrices) to clearly link theoretical concepts to mathematical formalisms.

#### **Serial vs. Parallel robots**
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
  <div class="drag-item" id="serially-linked" draggable="true" ondragstart="drag(event)">Serially linked actuated segments</div>
  <div class="drag-item" id="closed-chain" draggable="true" ondragstart="drag(event)">Closed kinematic chain robots</div>
  <div class="drag-item" id="fixed-motors" draggable="true" ondragstart="drag(event)">Fixed motors on the base</div>
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
<p><strong>Question 3: In general, a parallel robot is more rigid than a serial robot</strong></p>
<form id="q2">
  <input type="radio" name="q2" value="True"> True<br>
  <input type="radio" name="q2" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q2', 'True', 
      'Correct! ',
      'Incorrect. Refer to the definition of parallel and serial robot')">
    Check Answer
  </button>
  <p id="q2-feedback"></p>
</form>

<!-- Third question  -->
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

</details>

---

#### **Drawing kinematic diagrams**
In robotics, accurately representing the structure of robots (left image) through **kinematic diagrams** (right image) is crucial. These diagrams help us clearly visualize joints, links, and their connections, facilitating easier calculation of mobility, degrees of freedom, and overall system analysis.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_repre.png' }}" width="500px" alt="Kine">
  <figcaption style="margin-top: 8px; font-style: italic;">Figure: Structure of robots represented in kinematic diagrams</figcaption>
</figure>


By learning how to sketch these diagrams, you will be better prepared to analyze robot motion and systematically compute essential parameters such as mobility and degrees of freedom.

<!-- Step by step -->
<details markdown="1">
  <summary>Video Explanation</summary>

Here is a video explaining the step-by-step procedure to draw the kinematic diagram shown above.

<video width="640" height="360" controls>
  <source src="{{ '/assets/videos/kinematics/kine_diagra.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

</details>

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Hands-on exercices </summary>

Here are some exercie to learn how to draw the **kinematic representation structures** of these following robots.
Give it a try !

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex1.jpg' }}" width="300px" alt="kine_ex1">
  <!-- <figcaption style="margin-top: 8px; font-style: italic;">Figure: Types of Joints in Kinematics (Screenshot from previous video at 1:03)</figcaption> -->
</figure>

<details markdown="2">
<summary><strong>Click here for Solution</strong></summary>
<video width="640" height="360" controls>
  <source src="{{ '/assets/videos/kinematics/kine_diagra_1.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
</details>


<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex2.jpg' }}" width="500px" alt="kine_ex2">
  <!-- <figcaption style="margin-top: 8px; font-style: italic;">Figure: Types of Joints in Kinematics (Screenshot from previous video at 1:03)</figcaption> -->
</figure>


<details markdown="2">
<summary><strong>Click here for Solution</strong></summary>
<video width="640" height="360" controls>
  <source src="{{ '/assets/videos/kinematics/kine_diagra_2.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
</details>



<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex3.jpg' }}" width="300px" alt="kine_ex3">
  <!-- <figcaption style="margin-top: 8px; font-style: italic;">Figure: Types of Joints in Kinematics (Screenshot from previous video at 1:03)</figcaption> -->
</figure>


<details markdown="2">
<summary><strong>Click here for Solution</strong></summary>
<video width="640" height="360" controls>
  <source src="{{ '/assets/videos/kinematics/kine_diagra_3.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
</details>





<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_1.pdf'}}" width="100%" height="600px"></iframe>  -->


</details>

---

#### **Degrees of Freedom (DOF)**
<!-- - ***Degrees of Freedom (DOF)*** refer to the number of independent parameters required to completely specify the position and orientation of a robot or its parts in space. For instance, a rigid body in three-dimensional space has six degrees of freedom—three translational (moving along the x, y, and z axes) and three rotational (rotating around these axes).

- ***Mobility*** typically refers to the number of controllable, active joints (motors) a robot possesses, directly determining its range of motion and the complexity of its achievable tasks.

To better understand these concepts, watch the following concise and clear explanation: -->
![Degrees of Freedom of a Rigid Body](https://www.youtube.com/watch?v=z29hYlagOYM&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=4)
><sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 2.1: Degrees of Freedom of a Rigid Body. YouTube video, 26 August 2017. Available at: https://www.youtube.com/watch?v=z29hYlagOYM&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=4*</sub>
>
><sub>*Lynch, K.M. and Park, F.C. (2017) Modern Robotics: Mechanics, Planning, and Control. Cambridge: Cambridge University Press.*</sub>

- ***Configuration of a robot*** is a representation of the positions of all the points of the robot.
- ***Configuration space (called C-space)*** is the space of all configurations
- ***Degrees of freedom*** is the dimension of the C-space, or the minimum number of real numbers you need to represent the configuration.

General rule which holds for any system, not just rigid bodies: 
$$
\boxed{ \text{DoF} = \sum_{}^{} \text{freedoms of } \textbf{points} - \text{number of independent constraints} }
$$

And since the robots are made of rigid bodies, 
$$
\boxed{ \text{DoF} = \sum_{}^{} \text{freedoms of } \textbf{bodies} - \text{number of independent constraints} }
$$

<!-- Conceputal questions -->
<!-- <details markdown="1">
  <summary>Conceptual Questions</summary> -->

<!-- First question  -->
<!-- <p><strong>Question : Answer the following questions based on the robot structures shown below:</strong></p>
![Robot_Structures]({{ site.baseurl }}/assets/images/kinematics/ex1_1.png)

<p><strong>1. How many motors does each robot have?</strong></p>

**(a)** Left Robot:

<form id="q1a-motors">
  <input type="radio" name="q1a-motors" value="4"> 4 motors<br>
  <input type="radio" name="q1a-motors" value="5"> 5 motors<br>
  <input type="radio" name="q1a-motors" value="6"> 6 motors<br><br>

  <button type="button" onclick="checkMCQ('q1a-motors', '6', 
    'Correct! Left Robot has 6 motorized joints (RRR handler + RRR wrist).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q1a-motors-feedback"></p>
</form>

**(b)** Right robot:

<form id="q1b-motors">
  <input type="radio" name="q1b-motors" value="3"> 3 motors<br>
  <input type="radio" name="q1b-motors" value="5"> 5 motors<br>
  <input type="radio" name="q1b-motors" value="6"> 6 motors<br><br>

  <button type="button" onclick="checkMCQ('q1b-motors', '5', 
    'Correct! Right Robot has 5 motorized joints (RTT handler + RR wrist).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q1b-motors-feedback"></p>
</form>

**2. What is the Mobility (MO) of each robot?**

**(a)** Left Robot:

<form id="q2a-mo">
  <input type="radio" name="q2a-mo" value="4"> 4<br>
  <input type="radio" name="q2a-mo" value="5"> 5<br>
  <input type="radio" name="q2a-mo" value="6"> 6<br><br>

  <button type="button" onclick="checkMCQ('q2a-mo', '6', 
    'Correct! Mobility (MO) equals the number of motors (6) in case of serial robots.', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q2a-mo-feedback"></p>
</form>

**(b)** Rigth robot:

<form id="q2b-mo">
  <input type="radio" name="q2b-mo" value="3"> 3<br>
  <input type="radio" name="q2b-mo" value="5"> 5<br>
  <input type="radio" name="q2b-mo" value="6"> 6<br><br>

  <button type="button" onclick="checkMCQ('q2b-mo', '5', 
    'Correct! Mobility (MO) equals the number of motors (5) in case of serial robots.', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q2b-mo-feedback"></p>
</form>

**3. What is the number of Degrees of Freedom (DOF) for each robot?**

**(a)** Left Robot:

<form id="q3a-dof">
  <input type="radio" name="q3a-dof" value="3"> 3 DOF (translations only)<br>
  <input type="radio" name="q3a-dof" value="5"> 5 DOF (3 translations + 2 rotations)<br>
  <input type="radio" name="q3a-dof" value="6"> 6 DOF (3 translations + 3 rotations)<br><br>

  <button type="button" onclick="checkMCQ('q3a-dof', '6', 
    'Correct! Left Robot has 6 DOF (3 translations + 3 rotations).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q3a-dof-feedback"></p>
</form>

**(b)** Right robot:

<form id="q3b-dof">
  <input type="radio" name="q3b-dof" value="3"> 3 DOF (translations only)<br>
  <input type="radio" name="q3b-dof" value="5"> 5 DOF (3 translations + 2 rotations)<br>
  <input type="radio" name="q3b-dof" value="6"> 6 DOF (3 translations + 3 rotations)<br><br>

  <button type="button" onclick="checkMCQ('q3b-dof', '5', 
    'Correct! Right Robot has 5 DOF (3 translations + 2 rotations).', 
    'Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="q3b-dof-feedback"></p>
</form> 

</details> -->

---

#### **Grübler’s formula and its application**
***Grübler’s formula*** is a powerful tool to quickly calculate the degrees of freedom of mechanisms, especially useful for complex robot configurations:
$$
\boxed{ \text{DoF} = m(N - 1 - J) + \sum_{i=1}^{J} \text{f}_i }
$$

Where:
- $m$ is the dimension of the space (e.g., $m = 3$ for planar mechanisms, $m = 6$ for spatial mechanisms).
- $N$ is the number of links (including the frame).
- $J$ is the number of joints.
- $f_i$ is the number of degrees of freedom permitted by joint $i$.


To clearly understand how this formula is applied, check out the following detailed explanation:

![Degrees of Freedom of a Robot](https://www.youtube.com/watch?v=zI64DyaRUvQ&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=5)
>  Detailed explanation of Grübler’s formula and practical examples of its application.
>
><sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 2.2: Degrees of Freedom of a Robot. YouTube video, 26 August 2017. Available at: https://www.youtube.com/watch?v=z29hYlagOYM&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=4*</sub>
>
><sub>*Lynch, K.M. and Park, F.C. (2017) Modern Robotics: Mechanics, Planning, and Control. Cambridge: Cambridge University Press.*</sub>


**Different type of joints:**

| Joint type       | dof \( f \) | Constraints \( c \) between two planar rigid bodies | Constraints \( c \) between two spatial rigid bodies |
|------------------|-------------|-----------------------------------------------------|------------------------------------------------------|
| Revolute (R)     | 1           | 2                                                   | 5                                                    |
| Prismatic (P)    | 1           | 2                                                   | 5                                                    |
| Helical (H)      | 1           | N/A                                                 | 5                                                    |
| Cylindrical (C)  | 2           | N/A                                                 | 4                                                    |
| Universal (U)    | 2           | N/A                                                 | 4                                                    |
| Spherical (S)    | 3           | N/A                                                 | 3                                                    |

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/joints.png' }}" width="500px" alt="Joints">
  <figcaption style="margin-top: 8px; font-style: italic;">Figure: Types of Joints in Kinematics (Screenshot from previous video at 1:03)</figcaption>
</figure>

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

<!-- Now, try drawing the **kinematic representation structures** of the robots presented in **Exercises 2 and 3** from the set below.

Afterwards, compute the **mobility of the parallel robots**. (Note that, unlike serial robots, computing mobility for parallel robots requires using specific formulas.)

Here are some formulas that could be useful: -->

<!-- - **Grübler's Formula**

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

Let's try to compute the DoF of the robot we have seen before:
<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine.png' }}" width="200px" alt="Kine">
</figure>

<details markdown="1">
<summary><strong>Click here for Solution</strong></summary>
Applying the spatial version ($ m =6 $) of Grübler’s formula leads to the following:

- $ N = 3 \times 3 \ (\text{links}) + 1 \ (\text{ground}) + 1 \ (\text{end effector}) = 11 $

- $ J = 3 \ (\text{R joints}) + 4 \times 3 \ (\text{S joints}) = 15 $

- $ \sum f_i = 3 \times 1 \ (\text{R joints}) + 3 \times 12 \ (\text{S joints}) = 39 $

- $ \text{dof} = m(N - 1 - J) + \sum f_i = 6(11 - 1 - 15) + 39 = 9 $

This Delta robot as designed with the parallel bars and spherical joints has **6 supplementary mobilities**.
These mobilities concern **internal mobilities** not affecting the **pure translation of the mobile plate**. They are actually related to the **rotation of each bar around its principal axis**. 

</details>

--- 

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/kinematics/kine_ex2.jpg' }}" width="400px" alt="Kine">
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

### Chapter 1 : Introduction to Robotics | Kinematics & Modeling

Now that we have seen some basics notions, foundational concepts, proceed to the next chapter for an in-depth exploration of kinematics and modeling:

![Robotics 101: Full course for beginners](https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA)
> This video gives you an introduction of the meaning of kinematics and modeling and will present you how his videos will be strucured.
> 
><sub> Introduction to Robotics 101 tutorial series (2022) Kinematics and modeling of 2D & 3D robots. YouTube video, 22 May 2022. Available at: https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&t=1s


<!-- keys words on videos: forward kine, inv kine, gimbal rocks  -->


<!-- Conceputal questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- First question  -->
<p><strong>Question 1: Forward kinematics (FK) is...</strong></p>
<form id="q2-fk">
  <input type="radio" name="q2-fk" value="option1"> How to calculate the position/orientation from given joint variables<br>
  <input type="radio" name="q2-fk" value="option2"> Finding joint variables from end-effector position and orientation<br>
  <input type="radio" name="q2-fk" value="option3"> Calculating robot dynamics<br>

  <button type="button" onclick="checkMCQ('q2-fk', 'option1',
    'Correct! Forward Kinematics computes the position and orientation from joint variables.',
    'Incorrect. Please try again!')">
    Check Answer
  </button>

  <p id="q2-fk-feedback"></p>
</form>

</details>

---

### Chapter 2: Coordinate Transformations in 2D | Mapping {#chapter-1-coordinate-transformations-in-2D}

In this chapter, we focus on 2D coordinate transformations—specifically, **pure translations** and **pure rotations** for planar (serial) robots.

![Coordinate Transformations in 2D : Mapping Part 1](https://www.youtube.com/watch?v=H_94DTWd8ck&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=2)
> This video gives you an introduction to 2D translations and rotations.
>
><sub> Coordinate Transformations in 2D (Part 1)| Mapping | Robotics 101. YouTube video, 22 May 2022. Available at: https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&t=1s


![Coordinate Transformations in 2D : Mapping Part 2](https://www.youtube.com/watch?v=TWTMoFvcBFc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=3)
> Explains how translations and rotations combine simultaneously
>
><sub> Coordinate Transformations in 2D (Part 2)| Mapping | Robotics 101. YouTube video, 27 May 2022. Available at: https://www.youtube.com/watch?v=TWTMoFvcBFc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=3



![Coordinate Transformations in 2D : Mapping Part 3](https://www.youtube.com/watch?v=R_hxO5xBYfI&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=4)
> Discusses how to handle successive coordinate transformations step by step
>
><sub> Coordinate Transformations in 2D (Part 3)| Mapping | Robotics 101. YouTube video, 27 May 2022. Available at: https://www.youtube.com/watch?v=R_hxO5xBYfI&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=4


As you've seen, a **general motion in the plane** can be described by a combination of translations and rotations around the origin. A sequence of translations and rotations comes up against the fact that the translation is a vector addition while the rotation a matrix multiplication.

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

<!-- This is **the homogeneous matrix** of transformation in a two‐dimensional space (a plane), the third line has no spatial significance (no z axis for the moment !!). This matrix acts on a **homogeneous vector** in a two‐dimensional space which consists of its two coordinates plus a "scale factor" equal to one:
$$
\mathbf{v} =
\begin{bmatrix}
x \cr
y \cr
1
\end{bmatrix}.
$$   

To find the familiar vectors, just delete the last element. Matrices and homogeneous vectors for three dimensions contain four elements. -->

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
  c & -s & t_x \\
  s & c & t_y \\
  0 & 0 & 1
  \end{bmatrix}
  \]</p> correspond to ...</strong></p>
<form id="matrix-order">
  <input type="radio" name="matrix-order" value="option1"> A translation followed by a rotation<br>
  <input type="radio" name="matrix-order" value="option2"> A rotation followed by a translation<br>

  <button type="button" onclick="checkMCQ(
    'matrix-order', 
    'option2', 
    'Correct! This matrix represents a rotation followed by a translation (proved in mathematical development).',
    'Incorrect. Please try again!'
  )">
    Check Answer
  </button>

  <p id="matrix-order-feedback"></p>
</form>

</details>

<!-- Mathematical Development Questions -->
<!-- <details markdown="1">
  <summary>Mathematical Development Questions</summary>
<p><strong>Question 1: </strong> Express the homogeneous transformation matrix representing a rotation by angle θ followed by translation \( t = (t_x, t_y) \) in a 2D plane.</p>

  <details markdown="2">
    <summary>Answer Q1</summary>
    $
    \begin{aligned}
    M_t \cdot M_r &= \begin{bmatrix}
    1 & 0 & t_x \\
    0 & 1 & t_y \\
    0 & 0 & 1
    \end{bmatrix} \cdot
    \begin{bmatrix}
    \cos\theta & -\sin\theta & 0 \\
    \sin\theta & \cos\theta & 0 \\
    0 & 0 & 1
    \end{bmatrix} &=
    \begin{bmatrix}
    \cos\theta & -\sin\theta & t_x \\
    \sin\theta & \cos\theta & t_y \\
    0 & 0 & 1
    \end{bmatrix}
    = 
    \begin{bmatrix}
    R(\theta) & t \\
    0 & 1
    \end{bmatrix}
    \quad\text{where}\quad
    R(\theta) = 
    \begin{bmatrix}
    \cos\theta & -\sin\theta \\
    \sin\theta & \cos\theta
    \end{bmatrix}
    \end{aligned}
    $
  </details>


</details> -->


<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

[IN PROGRESS]

<!-- Practice what you've learned with Exercises **1**,**2**,**3** and **4**. -->

<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_2.pdf'}}" width="100%" height="600px"></iframe> -->

<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
[IN PROGRESS]

<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_2.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>


<!-- Additional Content -->
<details markdown="1">
  <summary>Additional Content</summary>

For further understanding of the definition of **Homogeneous Transformation Matrices**, the following concise and informative video is recommended:

![Homogeneous Transformation Matrices (Prof. Kevin Lynch)](https://www.youtube.com/watch?v=vlb3P7arbkU&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=16)
><sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 3.3.1: Homogeneous Transformation Matrices. YouTube video, 27 August 2017. Available at: https://www.youtube.com/watch?v=vlb3P7arbkU&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=16*</sub>
>
><sub>*Lynch, K.M. and Park, F.C. (2017) Modern Robotics: Mechanics, Planning, and Control. Cambridge: Cambridge University Press.*</sub>



</details>

--- 

### Chapter 3: Forward Kinematics of robots | Planar 2D robots


In robotics, understanding how each joint movement translates into precise actions is essential. 

Watch the following video for an intuitive overview of **forward kinematics** before we delve into the mathematical details.

![Forward Kinematics of robots](https://www.youtube.com/watch?v=svyhLDAoyKc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=5)
> In this chapter, we'll dive into **forward kinematics** (also called Direct Geometric Model, DGM), a fundamental method that allows us to calculate exactly where a robot’s end-effector (such as a gripper or tool) ends up in space based on its joint configurations (for example its position (x,y) and orientation(θ) in 2D). We'll start by exploring simple planar 2D robots, laying a clear foundation for mastering more complex robotic systems.
>
><sub> Forward Kinematics of robots | Planar 2D robots | Robotics 101. YouTube video, 12 June 2022. Available at: https://www.youtube.com/watch?v=svyhLDAoyKc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=5

---

### Chapter 4: Forward Kinematics (with solved examples) | Homogeneous Transformations 

Here you will see some examples of how to find this end effector positions in 2D using homogeneous transforms as we have seen in Chapter 1. 

![examples](https://www.youtube.com/watch?v=mO7JJxaVtkE&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=6)
> First solved example of how to find this end effector positions in 2D using homogeneous transforms
>
><sub> Homogeneous Transformations (example 1) | Robotics 101. YouTube video, 12 June 2022. Available at: https://www.youtube.com/watch?v=mO7JJxaVtkE&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=6

![examples2](https://www.youtube.com/watch?v=zg5sS9LZGAM&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=7)
> Second solved example of how to find this end effector positions in 2D using homogeneous transforms
>
><sub> Homogeneous Transformations (example 1) | Robotics 101. YouTube video, 12 June 2022. Available at: https://www.youtube.com/watch?v=zg5sS9LZGAM&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=7

Now that we've seen how to compute forward kinematics using homogeneous transformations, let's explore **another insightful way** to approach planar rotations. Sometimes, it's more intuitive or practical to represent motion as rotation around an **arbitrary point \( p \)** rather than just around the origin.

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

Let's get familiriar with this type of method doing similar exercise:

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

[IN PROGRESS]

<!-- Practice what you've learned with Exercises **1**,**2** and **3**. -->


<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_4_1-3.pdf'}}" width="100%" height="600px"></iframe> -->

<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
[IN PROGRESS]

<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_4_1-3.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>

--- 

### Chapter 4.5: Intro. to Quaternions 

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
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

Consider the two sequences of rotations :
- Rotation of 90 degrees on the z axis followed by Rotation of 90 degrees on the y axis
- Rotation of 90 degrees on the y axis followed by Rotation of 90 degrees on the z axis

For each of these sequences:

1. Determine the resulting corresponding **quaternion**.
2. Deduce:
    - (a) the corresponding **angles of rotation**.
    - (b) the corresponding **unit axes of rotation**.

<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
[IN PROGRESS]

<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_4_5.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>

<!-- Additional Content -->
<details markdown="1">
  <summary>Additional Content</summary>

For further understanding of the definition of **Quaternions**, the following concise and **informative site** is recommended for **interactive version of these visuals**:

[Visualization Quaternions](https://eater.net/quaternions)

</details>

---

### Chapter 5: Collision Detection using Homogeneous Transforms  

In this chapter, we’ll explore how **collision detection** between robots can be performed using homogeneous transformations. 

Watch the following video to see this concept illustrated clearly:

![Homogeneous Transforms](https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=8)
> Here, you will compute a new homogeneous transformation matrix that describes the relationship between two end-effectors, given two separate transformation matrices ($H_1$ and $H_2$). This new matrix will provide the relative distances $d_x$ and $d_y$ between the two end-effectors. When both $d_x$ and $d_y$ become zero, it indicates that the two robots are in collision.
>
><sub> Avoid Collision using Homogeneous Transformations | Robotics 101. YouTube video, 13 July 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=8

---

### Chapter 6: Inverse Kinematics of Robots
<!-- 
Inversly as the forward kinematics, inverse kinematics (also called Indirect Geometric Model, IGM) allow us to find the values of the joint positions given the position and orientation of the end-effector relative to the base and the values of all the geometric link parameters. -->

Inverse Kinematics (IK), also known as the **Indirect Geometric Model (IGM)**, allows us to determine the required joint positions (angles and link lengths) based on the desired position and orientation of the robot's end-effector, given the geometric parameters of its links. This process is essentially the opposite of forward kinematics.

**What exactly is Inverse Kinematics, and how can we use it to move a robot from point A to point B?**  
IK is one of the most intriguing and broadly used concepts in robotics. Simply put, inverse kinematics involves calculating the robot’s joint parameters (such as angles and link lengths) to position its end-effector precisely at a specified location and orientation.

If you have a solid understanding of forward kinematics, inverse kinematics becomes straightforward and intuitive.

Watch the following video for a clear introduction to inverse kinematics:

![Inverse Kinematics of Robots](https://www.youtube.com/watch?v=1-FJhmey7vk&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=9)
> In this video, you will explore another example of inverse kinematics using a planar robot. Interestingly, this robot features both revolute and prismatic joints, making its parameters a combination of joint angles and link lengths. This type of robot is specifically known as an **'RRP' robot**.
>
><sub> Inverse Kinematics of Robots | Robotics 101. YouTube video, 23 July 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=9

![example_inverse_kinematics](https://www.youtube.com/watch?v=EzZDRwmk8Nw&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=10)
> Solved example of Inverse Kinematics with a planar robot
>
><sub> Inverse Kinematics of Robots (with solved example) | Robotics 101. YouTube video, 31 July 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=9

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

<!-- Question 1 -->
<p><strong>Question 1: </strong> Find the IGM (Inverse geometric model) of a 2DOF planar robot (see figure below): given x and y, what are \(θ_1\) and \(θ_2\)?</p>

$
x = L_1 \cos{\theta_1} + L_2 \cos{(\theta_1 + \theta_2)}
$

$
y = L_1 \sin{\theta_1} + L_2 \sin{(\theta_1 + \theta_2)}
$

<p>
Hint : use the trigonometric formulas for the sine
and cosine of the sum of two angles, as well as the
one of the sum of squares of sine and cosine.
</p>

<img src="{{ site.baseurl }}/assets/images/kinematics/inv.png" alt="examples" width="200" />


<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
[IN PROGRESS]

<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_4_3.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>

---

### Chapter 7: Velocity Kinematics - Meet the Jacobian !

Ready to dive deeper into robotics? This chapter introduces you to one of the coolest concepts in robot motion: the **Jacobian Matrix**! 

Ever wondered how quickly and smoothly a robot's gripper moves in space? Here you'll learn exactly how to calculate both the linear and angular velocities of a robot's end-effector. But that's not all—the Jacobian acts like a map , converting **joint velocities** into precise **end-effector movements**. Mastering it means you're unlocking a powerful tool that robotics experts use every day!

Watch the following video to get an understanding of velocity kinematics and the powerful Jacobian matrix:

![Velocity Kinematics & Jacobian Matrix](https://www.youtube.com/watch?v=Wud3aCXiSm8&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=11)
>
><sub> Velocity Kinematics & Jacobian Matrix | Robotics 101. YouTube video, 21 August 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=11

And there's even more! Discover how the Jacobian connects to the fascinating world of **Manipulability Ellipsoids**, showing you visually how robots move, avoid obstacles, and perform complex tasks efficiently.

Check it this video here:
![Velocity Kinematics & Manipulability Ellipsoids](https://www.youtube.com/watch?v=gdSTcJwf3L0&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=12)
>
><sub> Velocity Kinematics & Manipulability Ellipsoids | Robotics 101. YouTube video, 3 September 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=12


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

Now that you've understood the exciting concept of the Jacobian, let's practice calculating it ourselves! Follow along with this detailed solved example in the video below, and then reinforce your skills with some hands-on exercises. Give it a try! 

![how to find Jacobian Matrix](https://www.youtube.com/watch?v=EdvAHmIONMs&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=13)
> Detailed example of how to solve jacobian Matrix
>
><sub> Jacobian | Robotics 101. YouTube video, 16 September 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=13


<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

[IN PROGRESS]

<!-- Practice what you've learned with Exercises **1** and **2** below.
*(Note: Exercise 2.8 on finding singularities will be introduced in the next video.)* -->


<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Exercise_set_5.pdf'}}" width="100%" height="600px"></iframe> -->

<details markdown="2">
<summary><strong>Click here for Solutions</strong></summary>
[IN PROGRESS]

<!-- <iframe src="{{ site.baseurl }}{{'/assets/pdfs/kinematics/Solution_set_5.pdf'}}" width="100%" height="600px"></iframe> -->
</details>

</details>

---

### Chapter 8: Robot Singularities & how to find them

Singularities occur when a robot configuration causes it to lose the ability to move or become blocked in certain directions. Understanding and identifying these singularities is essential to safe and efficient robot operation.


![Robot Singularities & how to find them](https://www.youtube.com/watch?v=WXEOr7X2bPE&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=14)
> Definition of robot singularities are and how you can find them
>
><sub> Singularities | Robotics 101. YouTube video, 17 October 2022. Available at: https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=13

For *serial manipulators*, the singular positions result from the **loss of degrees of freedom** while in a *parallel manipulator*, they result of the **gain of one or more degrees of freedom**. Most of the time, passing through a singularity causes **over constraint**, to then inducing the loss of control of one or more degrees of freedom. Which means, not controllable, which is not good. 

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What condition must be satisfied to identify a robot's singularity ? det(J) = ...</strong></p>
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




</details>


<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>
[IN PROGRESS]

<!-- Now, you can apply what you've learned by solving **Exercise 2.8** from the previous exercise set ! -->

</details>


<!-- Additional Content -->
<details markdown="1">
  <summary>Additional Content</summary>

For further understanding of the definition of **Singularities**, the following concise and informative video is recommended:

![Singularities (Prof. Kevin Lynch)](https://www.youtube.com/watch?v=vjJgTvnQpBs&list=PLggLP4f-rq02vX0OQQ5vrCxbJrzamYDfx&index=28)

</details>

<!-- 

### Types of Kinematic Chains and Mechanisms



#### Tree Structure  
A structure similar to a serial chain but can branch out. Each link can have multiple “child” links, forming a tree. A serial chain is a special case of a tree with no branching.

---

### Common Joint Types

- **Revolute (R)** — Rotational motion around a fixed axis (e.g., a hinge).  
- **Prismatic (P)** — Translational motion along a single axis (sliding joint).  
- **Helical (H)** — Combined rotation and translation along the same axis (like a screw).  
- **Cylindrical (C)** — A combination of one rotational DoF and one prismatic DoF about/along the same axis.  
- **Planar** — Allows motion in a plane, typically two translational DoF and one rotational DoF.  

---

### Homogeneous Transformations

#### Rotation/Translation Representation  

A **homogeneous transformation** matrix represents both rotation and translation in a $4\times4$ matrix form. For example, a rotation about the $z$-axis by an angle $ \Theta $ is given by:  

$$
\text{Rot}(z, \theta) = 
\begin{bmatrix}
    \cos \theta & -\sin \theta & 0 & 0 \\
    \sin \theta & \cos \theta  & 0 & 0 \\
    0           & 0            & 1 & 0 \\
    0           & 0            & 0 & 1
\end{bmatrix}
$$  

Homogeneous transformations are fundamental in describing the position and orientation of each link and the end-effector in robotics.

---

### Constraints in Robotic Mechanisms

#### Holonomic Constraints  
Constraints that can be written purely in terms of **position variables** (joint angles, link displacements). For instance, most standard joints (revolute, prismatic, etc.) impose constraints that do not require velocities or accelerations in the equations. The number of constraint equations is $6 - n$, where $ n $ is the DoF of the joint.

#### Nonholonomic Constraints  
Constraints that **cannot** be expressed solely in terms of the position variables. They involve **time derivatives** of those variables and cannot be integrated to yield a relationship only between the joint coordinates.  
- *Example:* The rolling constraints of wheeled mobile robots (no slipping/skidding).

---

<h2 id="forward-and-inverse-kinematics"> Forward and Inverse Kinematics:

#### Direct (Forward) Geometric Model (DGM)  
Also called **forward kinematics**, it provides the **position and orientation** of the robot’s end-effector as a function of the robot’s joint variables $ \Theta $. Formally:

$$
\mathbf{T}_{\text{end-effector}} = f(\Theta)
$$

where $ \Theta $ can include both rotational and prismatic joint variables.

- **Serial Robots**  
  For serial robots, the DGM generally has **a single unique solution** for a given set of joint variables (i.e., one specific end-effector pose).

- **Parallel Robots**  
  For parallel robots, the DGM can have **multiple solutions** (often called “contortions”) for a given set of joint variables.

#### Inverse Geometric Model (IGM)  
Also called **inverse kinematics**, it is the inverse problem: given a desired position and orientation of the end-effector, find the **joint variables** that achieve it. Formally:

$$
\Theta = f^{-1}(\mathbf{T}_{\text{desired}})
$$

This can have multiple solutions (or no solutions) depending on the robot’s geometry.

- **Serial Robots**  
  The IGM for serial robots may have **several solutions** or sometimes no solution at all, depending on the desired pose.

- **Parallel Robots**  
  The IGM for parallel robots typically has **a single unique solution**, in contrast to serial mechanisms.

#### Jacobian  
The **Jacobian matrix** describes how a small change in the joint variables translates to a change in the end-effector’s **velocity** (or differential displacement). It is crucial for understanding robot motion, detecting singularities, and implementing control algorithms.

---

### Additional Useful Terms 

- **Workspace** — The set of all points (and orientations) that the end-effector can reach. It can be subdivided into the **reachable workspace** (positions the end-effector can physically attain) and the **dexterous workspace** (positions the end-effector can reach with all orientations).
- **Singularity** — A configuration where the robot loses certain motion capabilities (the Jacobian becomes rank-deficient). In these positions, small changes in joint angles can result in large or unpredictable changes in the end-effector pose—or no movement in certain directions at all.

---

## Useful Formulas for Robotic Kinematics

### Grubler’s Formula (General Form in 3D)

Also known as Kutzbach criterion, it gives the mobility $ MO $ of a mechanism with $ n $ rigid bodies connected by $ k $ joints:

$$
MO = 6 \times (n - k) + \sum_{i=1}^{k} (\text{MO}_i),
$$

where $\text{MO}_i$ is the contribution to mobility from the $ i $-th joint (often the joint’s DoF).

> **Note:** Variations of this formula exist depending on whether you consider closed chains, higher-pair joints, and other special constraints.

---

### Rotation Matrices About Principal Axes
- **Rotation about the x-axis by $\alpha$**  

    $$
    R_x(\alpha) = 
    \begin{bmatrix}
        1 & 0 & 0 \\
        0 & \cos \alpha & -\sin \alpha \\
        0 & \sin \alpha & \cos \alpha
    \end{bmatrix}
    $$

- **Rotation about the y-axis by $\beta$**  

    $$
    R_y(\beta) = 
    \begin{bmatrix}
        \cos \beta & 0 & \sin \beta \\
        0 & 1 & 0 \\
        -\sin \beta & 0 & \cos \beta
    \end{bmatrix}
    $$

- **Rotation about the z-axis by $\gamma$**  

    $$
    R_z(\gamma) = 
    \begin{bmatrix}
        \cos \gamma & -\sin \gamma & 0 \\
        \sin \gamma & \cos \gamma & 0 \\
        0 & 0 & 1
    \end{bmatrix}
    $$

Any 3D rotation can be expressed as a product of these fundamental rotations.


Quaternions provide a non-singular way to interpolate and compute 3D orientations, often used in control and simulation. -->

---

## Programming

Let's move on to maybe the most exciting part: applying the kinematics concepts you've learned in code and seeing your robot working right in front of you!

*(Please refer to the **Install Webots** section if you haven't installed it yet.)*


## **Exercise 1: Dobot Pick-and-Place (Forward Kinematics)** Level: **

### Step 1: Setup your environment

1. 📁 [Download the `dobot` folder]({{ site.baseurl }}/assets/downloads/kinematics/dobot_2025.zip)
2. Extract the downloaded `.zip` file.
3. Launch Webots. From the top-left corner select **File → Open World**.
4. Navigate to the extracted `dobot_2025/world` folder and select your `.wbt` file.


### Step 2: Let's start coding!

Once successfully opened, your robot and its environment should appear, as illustrated in the screenshot below:

<img src="{{ site.baseurl }}{{ '/assets/images/kinematics/dobot.png' }}" width="500px" alt="Kinematics Image">


Now, follow the instructions provided on the right side panel within Webots, and complete the code to make your robot do the "**Pick and Place**".


> **💡 Helpful Suggestion:**  
> For detailed explanations of variables, robot schematics, and further clarifications that could greatly assist your understanding and coding, we strongly recommend reviewing the figures and content available on [this page from Robotics for Creative Practice](https://courses.ideate.cmu.edu/16-375/f2024/text/simulations/dobot.html).

> *If the Python file isn't open, select your robot in the scene tree (left panel), right-click and choose **Edit controller**, or load it manually via Webots' text editor (right panel) `dobot_2025/controllers/dobot` folder and select your `.py` .*

Once you've implemented all the "COMPLETE THIS LINE OF CODE" sections, click "Build" or "Save"(`CTRL+S`) to compile your project, and then start the simulation.

**Good luck and have fun!**

<details markdown="1">
  <summary>Answer</summary>

After you've attempted the exercise and want to verify your solution, you can download this file to check your answers and compare values:

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

After you've attempted the exercise and want to verify your solution, you can download this file to check your answers and compare values:

📁 [Answers_irl]({{ site.baseurl }}/assets/downloads/kinematics/inverse_kinematics.py)

</details>

### Step 2: Understanding the Process (Feedback)
As you've probably noticed by completing the coding exercise, manually programming inverse kinematics can become quite complex, especially for practical robotics applications. Usually, in real-world scenarios, specialized software or libraries are utilized to handle these calculations efficiently, rather than implementing all functions by hand. So you are very lucky for this chapter, you only need to understand how to use it !

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

## Resources

### Books
- [Modern Robotics:  Mechanics, Planning, and Control](http://modernrobotics.org)," by Kevin Lynch and Frank Park, Cambridge University Press 2017.

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_2) (Chapter 2. Kinematics)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/pick.html) (Chapter 3. Basic Pick and Place)

### Videos

- Contents shared by **[Mohammad Zainullah Khan](https://www.zainullah.com/)**, an engineer with a Master’s degree in Mechanical Engineering (specializing in robotics, design, and mechatronics) from the University of Dayton.

- Contents shared by **[Prof. Kevin Lynch](https://www.mccormick.northwestern.edu/research-faculty/directory/profiles/lynch-kevin.html)**, Professor of Mechanical Engineering at [Northwestern University](https://www.northwestern.edu/).

- [Robotic Manipulation](https://www.youtube.com/watch?v=ZOXp_wixIzo&list=PLkx8KyIQkMfVRPReg9FHtBk_RGEwnVxU-&index=3) (MIT 2020)

### Exercices 

- [IN PROGRESS]
<!-- - Conceptual and mathematical exercises are inspired by **[Mr. Mohamed Bouri](https://people.epfl.ch/mohamed.bour)**, giving the course [Basic of Robotics for Manipulation](https://edu.epfl.ch/coursebook/en/basics-of-robotics-for-manipulation-MICRO-450) at [EPFL](https://www.epfl.ch/fr/).  -->

### Programming

- Exercises adapted from the course **[Robotics for Creative Practice](https://courses.ideate.cmu.edu/16-375/f2022/)** taught by **[Dr. Garth Zeglin](https://www.cs.cmu.edu/~garthz/)**, instructor at [Carnegie Mellon University](https://www.cmu.edu/).  
  Content licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 


- 

---

[Back to Top](#start)