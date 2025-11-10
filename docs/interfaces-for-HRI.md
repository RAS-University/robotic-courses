---
title: Interfaces for Human-Robot Interaction
parent: Courses
layout: default
nav_order: 7
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


# Interfaces for Human-Robot Interaction

*Table of Contents*

- [1. General Motivation](#1-general-motivation)
- [2. Course Content](#2-course-content)
  - [Chapter 1: Types of Interfaces](#chapter-1-types-of-interfaces)
    - [1. Tele-operation](#1-tele-operation)
      - [1.1. Graphical User Interface / Tablet](#11-graphical-user-interfacetablet)
      - [1.2. Joysticks](#12-joysticks)
      - [1.3. Exoskeletons](#13-exoskeletons)
      - [1.4. Telepresence](#14-telepresence)
      - [1.5. Haptic Interfaces](#15-haptic-interfaces)
      - [1.6. Haptic Devices & Teleoperation](#16-haptice-devices--teleoperation)
    - [2. Kinesthetic Teaching](#2-kinesthetic-teaching)
    - [3. Observational Learning](#3-observational-learning)
      - [3.1. Vision Systems](#31-vision-systems)
      - [3.2. Motion Capture Systems](#32-motion-capture-systems)
  - [Chapter 2: Challenges](#chapter-2-challenges)
    - [1. Correspondence Problem](#1-correspondence-problem)
    - [2. Learning is Data-Sensitive](#2-learning-is-data-sensitive)
    - [3. Variability in Task Definition](#3-variability-in-task-definition)
    - [4. Generalizing Control Law – Beyond the Demonstrations](#4-generalizing-control-law--beyond-the-demonstrations)
- [Credits](#credits)
- [Resources](#resources)
  - [Books](#books)
  - [Papers](#papers)
- [Additional Resources](#additional-resources)

<br>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/FtjC-BXGgAE" frameborder="0" allowfullscreen></iframe>
</p>

><sub>The Chief Cook Robot (short version): A humanoid robot learning to cook an omelet by whipping eggs, cutting ham and grating cheese. YouTube video, Apr 2008.</sub>

## 1. General Motivation

Our main motivation is to transmit skills to robots so they can perform different tasks. We want to teach our robots how to carry out a task. The most trivial solution would be to teach the robot by moving it, just as we do with a baby. However, unlike with a baby, this is by no means trivial with a robot. This is because our bodies differ from robot bodies. As a result, to solve this discrepancy between the human body and the robot body, we need **interfaces**.

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/TeachRobotGolf.jpg" alt="Teaching a Robot to Play Golf" width="600" height="338">
</p>

><sub>S. M. Khansari-Zadeh, K. Kronander, and A. Billard, "Learning to playminigolf: A dynamical system-based approach," Adv. Robot., vol. 26,no. 17, pp. 1967–1993, 2012. [Online]. Available: [http://infoscience.epfl.ch/record/181052](http://infoscience.epfl.ch/record/181052)</sub>
>
><sub>Teaching a Robot to Play Golf

## 2. Course Content

### Chapter 1: Types of Interfaces

The interfaces we use to gather data from humans for teaching the robots revolve around three main themes:
> - **Teleoperation:** User controls the robot through the interface and teleoperates the robot with some distance.
> - **Kinesthetic Teaching:** User physically moves the robot (like how it is done while teaching a child or teaching a sport).
> - **Observational learning:** Robot learns from observation of the demonstration (not necessarily through vision systems like cameras but also through motion capture systems).
Each of these methods has its own advantages and disadvantages. We will go through each of them in more details.

#### **1. Tele-operation:**
In tele-operation, users control robots using some interface to perform the task from some **distance**. The quality of learning and performance is sensitive to: **1.Interface Design** and **2. Teacher Experience**.
This means that the person teleoperating the robot needs to be skilled and understand the device they are using. As a result, current research follows two main trends. In the first trend, the interface is simple and requires little pretraining, but this limits what can be taught to the robot. In the second trend, a more complex interface is designed. It takes time for the human to learn to use it effectively, but it allows for teaching the robot more complex tasks.

##### **1.1. Graphical user interface/Tablet**
The simplest interface that can be used is a tablet. It is very user-friendly, as almost everyone knows how to use one these days. Moreover, tablets are relatively inexpensive and can be easily integrated into existing setups. They can even come in the form of smartphones, which nearly everyone owns today.
<br>
Tablets have been used since the 1990s, and they have become more capable with the advancements of modern devices. Yet, they remain a simple system. The user can communicate the desired motion by mimicking it on the tablet or by indicating a desired target.
<br>
In addition to planar displacements, planar rotation can also be provided by rotating the tablet. As a result, all three degrees of planar movement can be represented through a tablet interface, allowing certain motions to be effectively conveyed this way. However, since the displacement is confined to a plane, the overall field of motion is limited. Consequently, a tablet interface remains restricted in what it can transfer. In the end, the field of motion provided by this interface is quite reduced.
<br>
In the left example, the user operates the robotic hand using a tablet interface. The opening and closing of all the fingers can be controlled, and the movement of the user’s hand on the tablet is directly translated to the robotic hand.
<br>
In the right example, the user controls the robot to pick up different objects. The robot’s point of view is rendered on the interface, providing a visual representation of the scene on the tablet.


<div style="display: flex; justify-content: space-between; gap: 10px;">
  <div style="width: 48%;">
    <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/Graphical_Interface_1.jpg" alt="Image 1" style="width: 100%; height: 300px; object-fit: cover;">
    <br><sub>Dexterous Telemanipulation With a Multi-Touch Interface. Toh et al. <a href="http://graphics.cs.cmu.edu/?p=223">http://graphics.cs.cmu.edu/?p=223</a></sub>
  </div>
  <div style="width: 48%;">
    <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/Graphical_Interface_2.jpg" alt="Image 2" style="width: 100%; height: 300px; object-fit: cover;">
    <br><sub>A Knowledge-Driven Shared Autonomy Human-Robot Interface for Tablet Computers. Birkenkampf et al. <a href="https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=7041352">https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=7041352</a></sub>
  </div>
</div>

<!-- Conceputal Exercise -->
<details markdown="1">
  <summary>Conceptual Exercise</summary>

<p><strong>Drag and drop each feature into the correct box. Advantages and Disadvantages of using a Tablet/GUI for Human-Robot Interaction:</strong></p>


<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/interfaces-for-HRI/Drag&DropStyle.css">

<div class="all-items-container" id="items-to-drag">
  <div class="drag-item" draggable="true" id="item-1" data-correct-zone="Pros">User-friendly</div>
  <div class="drag-item" draggable="true" id="item-2" data-correct-zone="Cons">Limited in what can be transferred</div>
  <div class="drag-item" draggable="true" id="item-3" data-correct-zone="Pros">Cheap</div>
  <div class="drag-item" draggable="true" id="item-4" data-correct-zone="Pros">Easily integrable to existing set-ups</div>
</div>

<div class="drag-container">
  <div class="drop-zone" id="pros-zone" data-zone-type="Pros">
    <h4>✅ ADVANTAGES (PROS)</h4>
  </div>
  <div class="drop-zone" id="cons-zone" data-zone-type="Cons">
    <h4>❌ DISADVANTAGES (CONS)</h4>
  </div>
</div>

<div class="button-group">
  <button id="check-button" class="action-button">Check Answers</button>
  <button id="reset-button" class="action-button">Reset</button>
</div>

<script src="{{ site.baseurl }}/assets/js/interfaces-for-HRI/Drag&Drop.js"></script>

</details>


##### **1.2. Joysticks**

With this interface, the user controls the robot’s end-effector using a 3-DOF or 6-DOF joystick. With a 6-DOF joystick, both the position and orientation of the end-effector, encompassing all its degrees of freedom, are controlled by the user. Note that the user is not directly controlling the joints; instead, they control the translation and orientation of the end-effector, which implicitly allows control of the tool being held. This is achieved through inverse kinematics, as the user relies on the robot’s internal controller to perform the necessary inverse kinematics computations.
<br>
Similar to tablets, joysticks are inexpensive and user-friendly. Although using a joystick may not feel as intuitive as using a tablet, it is still relatively easy to operate. A joystick can communicate the desired motion in 3D or even 6D and can be easily integrated into a wide range of applications.
<br>
Using a joystick often requires both hands. This depends on the specific type of joystick, but it is often necessary to use one hand to control translation and the other to control orientation. Furthermore, joysticks are limited in what can be transferred: forces cannot be transmitted; only displacements and speeds are conveyed. (It is still a step forward compared to tablets, as the range of teachable actions increases; though this comes at the cost of reduced user-friendliness.) Moreover, the performance of this interface depends on the user’s point of view. The user must be positioned to have a clear view of the scene; for example, if the user is behind the robot, visibility is greatly reduced. (Comparing to tablet interfaces, tablets have the advantage that they can display a rendering of the scene from the robot’s point of view.) Finally, joystick interfaces are sensitive to the user’s experience level. They tend to be less user-friendly than tablets and often require some training before they can be used effectively.

<!--
> - **Pros:** 
> + Can communicate the desired motion in 3D or even 6D, easily amenable to control 6DOFs robot arm in position and orientation 
-->

<p align="center">
  <img src="https://iliad.stanford.edu/images/posts/losey2019controlling/image11.gif" width="600" height="338"/>
</p>

<sub>Losey, Dylan P., et al. "Controlling assistive robots with learned latent actions." 2020 IEEE International Conference on Robotics and Automation (ICRA). IEEE, 2020. Video Source: [https://iliad.stanford.edu/research/interactions](https://iliad.stanford.edu/research/interactions)</sub>

<!--
> +  User-friendly
> +  Cheap
> +  Easily integrable for a vast range of applications

> - **Cons:**
> - Often requires the use of the two hands: This depends on which joystick to use, but it is often the case in order to control for translation with one hand and orientation with the other hand.
> - Limited in what can be transferred: Force can't be transfeered, it is only displacement and speed that are transferred. (Note that it is still one step forward compared to tablets; there is an increase in the number of things that can be taught, which on the other hand results in being a bit less user-friendly.)
> - Depends on the point of view of the user: The user should be well placed to have a relatively good view. For example, if the user is behind the robot, she/he can't see much (A positive point about tablets is that a rendering of the scene, viewed from robot's point of view, is provided).
> - Sensitive to experience of teacher: It is a bit less user-firendly compared to tablets and often requires a bit of training before usage.
-->

Inverse kinematics can present challenges in teleoperation. The user may command an infeasible motion; for example, a rapid rotation that violates the robot’s joint limits. In such cases, an alternative path must be computed. Consequently, the user needs to learn how to operate the robot effectively.
<br>
On the other hand, teleoperation offers a significant advantage: the user can teach robots that are entirely different from themselves. A good example of this is teaching drones.

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/M-QUkgk3HyE" frameborder="0" allowfullscreen></iframe>
</p>

><sub>A. Ng, A. Coates, M. Diel, V. Ganapathi, J. Schulte, B. Tse, E. Berger, E. Liang, Inverted autonomous helicopter flight via reinforcement learning, in: International Symposium on Experimental Robotics, 2004. </sub>

In the example above, a helicopter is taught to perform very complex maneuvers. An underlying controller is used to stabilize the helicopter; this is a pre-existing stabilization controller and is not part of the training process. The training instead focuses on learning the complex trajectory. Since both position and orientation need to be controlled, a 6-DOF joystick is an appropriate tool. The system relies on the underlying controller to handle many aspects that humans can not control directly, such as stabilization and inverse kinematics. In this case, a highly experienced and skilled operator is required to teach the robot such complex maneuvers.


<!-- Conceputal Questions -->
<details open markdown="2">
<summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Compared to tablets, joysticks are more sensitive to the teacher's experience.</strong></p>
<form id="q1">
  <input type="radio" name="q1" value="True"> True<br>
  <input type="radio" name="q1" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q1', 'True', 
      'Correct! Joysticks are less user-friendly and require more trianing and experience before usage.',
      'Incorrect. Using a tablet is more intuitive than using a joystick. The user can control for more DOFs with a joystick, which comes at the cost of being less user-friendly and requiring more training and experience.')">
    Check Answer
  </button>
  <p id="q1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: A 3-DOF joystick can be a proper interface to control for position and orientation of a 6-DOF robotic arm. </strong></p>
<form id="q2">
  <input type="radio" name="q2" value="True"> True<br>
  <input type="radio" name="q2" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q2', 'False', 
      'Correct! The proper interface here is a 6-DOF joystick, which can control for both position and orientation of the 6-DOF robotic arm.',
      'Incorrect. A 6-DOF joystick is required here, as the goal is to control for both position and orientation of a 6-DOF arm.')">
    Check Answer
  </button>
  <p id="q2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Since joysticks can control for both position and oreintation of the end-effector, encompassing all the degrees of freedom, they are not limited in what can be transferred.</strong></p>
<form id="q3">
  <input type="radio" name="q3" value="True"> True<br>
  <input type="radio" name="q3" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q3', 'False', 
      'Correct! Forces cannot be transmitted',
      'Incorrect. Although all degrees of freedom of the end-effector are covered, forces still can not be transmitted.')">
    Check Answer
  </button>
  <p id="q3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: Despite tablets, joysticks don't rely on internal inverse kinematics controllers, since they control at joint level.</strong></p>
<form id="q4">
  <input type="radio" name="q4" value="True"> True<br>
  <input type="radio" name="q4" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q4', 'False', 
      'Correct! Both tablets and joysticks do not control at joint level and rely on internal inverse kinematics controllers. ',
      'Incorrect. Joysticks do not directly control the joints, they control for the position and orientation of the end-effector. Consequently, they rely on internal inverse kinematics controllers.')">
    Check Answer
  </button>
  <p id="q4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: Which of the following is a disadvantage of joysticks compared to tablets?</strong></p>
<form id="q5-fk">
  <input type="radio" name="q5-fk" value="option1"> limited in what can be transferred<br>
  <input type="radio" name="q5-fk" value="option2"> dependence on the point of view of the user<br>
  <input type="radio" name="q5-fk" value="option3"> both of the above options<br>

  <button type="button" onclick="checkMCQ('q5-fk', 'option2',
    'Correct! Tablets have the advantage that they can display a rendering of the scene from the robot’s point of view.',
    'Incorrect. Although joysticks are limited in what can be transferred, they can still do better than tablets. (They can communicate the desired motion even in 6D.)')">
    Check Answer
  </button>

  <p id="q5-fk-feedback"></p>
</form>

</details>

<script src="quiz.js"></script>

  

##### **1.3. Exoskeletons**

In exoskeletons, there is a direct mapping between your body (arms or legs) and the robot's body. In the video below, the user is guiding the robot's arms directly with his arms. The advantage as an interface is that using exoskeletons, the user can control the joints directly. User has control for cartesian position and orientation of each joint. Mentioning the disadvantages, most exoskeletones are heavy and cumbersome. With the advancements in materials and motors, there is hope for this problem to be tackled; resulting in increased popularity of exoskeletones. Another problem with exoskeletone is that it is designed for an sepcific user size and user strenght, making it not fit for everybody. Some of the exoskeletones (note that this is not the case for all exoskeletones), render the force at contact, meaning that when the robot is imposed to some force in touch, the user also senses some force. In this case, the question is which force does the user sense? Is it only the force at the end point or other areas are also included? For example, if the robot hits something at the elbow, does the user sense this force at her/his elbow? Rendering this in real time is still difficult and challenging. However, exoskeletones can be very useful if these challenges are overcome.
> + **Pros:** 
> + Conveys directly the dynamics of the motion (embodied transmission)
> + Allows to control all joints as well as movement in Cartesian space

> - **Cons:**
> - Heavy, cumbersome
> - Does not fit all sizes and strengths
> - Does not convey nor render forces at contact

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/pFnSl6oOLco" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Capio Upper Body Exoskeleton for Teleoperation by the DFKI GmbH Robotics Innovation Center. YouTube video, Nov 2012. </sub>

##### **1.4. Telepresence**
There are situations where it is necessary to teleoperate and not send a human agent directly. Examples of such situations are operations in radioactive environments, search and rescue operations or any other operations in dangerous environments. However, to teleoperate in such situations, it is important to be very precise and careful. As a result, it is necessary to render some aspects of the environment for the user. Here come the challenges in communications, i.e., delays. More distance between the robot and the user results in longer delays. Hours of delays in communication can happen in space missions in which the robot is teleoperated from the earth.These are the issues that we must tackle in this field. <br>
In the example below, the surgeon is not directly operating on the patient; he is doing it through an interface. This interface is the da Vinci surgical robot. These operations are fairly frequent these days. Advantages of such systmes are that the user should not be present on site and can do the task remotely. In cases of surgery, a very expert surgeon can perform the operation from her/his own office on a patient who can be in another region of the world. Consequently, it is more efficient, more secure, etc. However, it relies on good rendering of the environment. <br>
In terms of rendering the environment, it is interesting to note that nowadays, surgeons are only provided with a two-dimensional visual rendering of the scene. However, by moving the camera and instruments, surgeons actully build a three-dimensional model of the scene in their minds and map it to the two-dimensional provided rendering. They are not provided with feedback on forces. They cut the tissues and move things without sensing the force applied. This can be important in the sense that how deep the cut should be. Moreover, some tissues may be stiffer than other tissues. Such surgeons have the ability to map their visual observations such as deformations of the tissues to perception of force, thanks to their skill and expertise. However, there can be mistakes and providing richer renderings of the scenes can help in this regard.
In such operations, delays in transmissions can be incredibly determinal. In fact, one of the most important topics in this research area is how to compensate for these delays to make sure the controller is stable. To make this challenge clearer, imagine that the surgeon is applying some force, in order for the force to be transmitted. Even if the surgeon perceives the force and senses a resistance, by the time she/he senses the resistance, she/he continues moving. Then, once sensed, the surgeon starts reacting and for example decreases the force, however, it may be too late. In such scenario, the closed loop control system is completely unstable.

> + **Pros:** 
> + Enables to perform tasks when remote
> + Can offer a more efficient and more secure mean to intervene (in disastrous or dangerous environments)

> - **Cons:**
> - Need to provide good visual rendering of the scene
> - Delays in transmission can be detrimental if task is too rapid
> - Force not always (well) rendered

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/Davinci.jpg" alt="Davinci Surgical Robot" width="600" height="338">
</p>

><sub>Davinci Surgical Robot</sub>

##### **1.5. Haptic interfaces**
It is important to note that the forces are not always very well rendered. As a result, huge amount of research is being done on haptic interfaces, on how to render the force and transmit it directly. In the video below, a typical haptic device can be seen. This device is on of the oldest ones, where the user can control for both the position and the orientation at the end point, as well as the force. So it transmits and renders the force. This device is a closed loop system. The delay depends on first, the distance between the user and the endpoint, and second, the type of communication used. Usually, this delay is between 100 ms (milliseconds) and 400 ms. However, it can be much longer depending on the distance. This delay can generate incorrect responses and unstable behavior.

> + **Pros:** 
> + Transmits the forces applied by the user
> + Renders the forces perceived by the robot to the user

> - **Cons:**
> - Close-loop system induces delays of 100-400ms depending on distance and medium used
> - Delays may lead to incorrect response and instable behavior

<p align="center">
  <video width="600" height="338" controls>
    <source src="{{ site.baseurl }}/assets/videos/Interfaces-for-HRI/HapticInterfaces.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

><sub>LASA Lab / EPFL in collaboration with JRL / TsukubaL</sub>

##### **1.6. Haptice Devices & Teleoperation**
New finger-based haptic devices leverage on sense of touch mounted on robots' fingers to perceive contact and render these through hand exoskeleton. In this setting, two robotic hands are mounted with tactile sensors. The touch perceived at the endpoint is rendered into the exoskeleton that the user wears on her/his hand. This exoskeleton allows the user to both control very precisely for every single finger and sense the touch at the fingertips. While the rendering of the force is only happening at the fingertips here, in some cases, picking up objects requires rendering of forces at more areas of the hand. For example, to move an object within one's hand, a rendering of the force inside is required. If it is requried to avoid the slipping of the object, this rendering should happen at a speed of milliseconds. As a result, these delays are important issues when it comes down to verifying manipulation. Another point to note is that the range of motion in robotics hands is way more limited compared to human hands.

> + **Pros:** 
> + Offers higher resolution
> + Closer to human touch

> - **Cons:**
> - Covers only fingertips, but sense of touch is all along fingers, palm, top of the hand
> - Suffers from drifts, calibration can be an issue

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/rEoq7DMgaEc" frameborder="0" allowfullscreen></iframe>
</p>

><sub>HaptX haptic glove integrated with Shadow Robot hand
Footage from Adam Savage's Tested + ShadowRobot Company and Syntouch. YouTube video, Nov 2012. </sub>

#### **2. Kinesthetic Teaching** 
In kinesthetic teaching, the teacher physically moves the robot. This is possible due to the backdrivability of the robot. The robot is completely compliant to the user's motion. The advantage here is that the user is working directly with the feasible space of the robot. Forces applied by the user are now transmitted directly to the robot. The user can directly sense the forces of the task since she/he is applying these forces directly. Then, once the user has trained the robot, the robot can reproduce the task and generalize.

> + **Pros:** 
> + Direct control motion of robot
> + Can transmit forces
> + Can perceive forces at contact

> - **Cons:**
> - Cumbersome
> - Limited in the number of joints / limbs one can move at once

<div style="display: flex; justify-content: space-between; gap: 10px;">
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="/assets/videos/interfaces-for-HRI/Kinesthetic1.webm" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="/assets/videos/interfaces-for-HRI/Kinesthetic1.webm" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
</div>

In the left example above, the robot has been taught to pick up the objects and go through the narrow passage. In the meanwhile, this robot allows for many disturbances and is resilient to them.
More complex tasks, for example tasks requiring bimanual coordination, can also be taught to the robot with this method. An example of such tasks is shown in the right video above. Since the task requires bimanual coordination here, the user has to hold the two arms of the robot. Once trained, the robot can reproduce the forces and the tasks. Mentioning the limitations, it's still cumbersome. The user, with her/his two arms, can only hold the two endpoints of the robot. It is limited in the number of joints the user can move at once. The user can not control for the elbow and the motion of each of the joints and still relies on an internal inverse kinematic controller to be able to do so.

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/xIK6U52TjRM" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Learning by Demonstration, Bimanual Coordinated Task, LASA, Nov 2016. </sub>


#### **3. Observational Learning:**
##### **3.1. Vision Systems**
In vision systems, RGB-D cameras are used and body motion are reconstructed automatically.
The example below is a tracking of the human hand. The motion of the hand is reconstructed in fast speed and transmitted directly to the robot. This is very nice as the user does not have to wear anything. The user just shows the tasks by doing them. He/she should adapt to the field of view of the camera and the precision. This is one of the ideal means because it doesn't require any complex hardware; essentialy only a camera is required. The difficulty is in the interpretation of the scene viewed from the point of view of the camera; so it is more algorithmic. Another difficulty is that the user should learn what is well-transmitted and what is not. There is no rendering of the forces. The setting is purely visual but can be quite powerful.

> + **Pros:** 
> + Enables users to perform task in a natural manner
> + Can be extended to analysing any videos of human motion, not necessarily videos of human teaching a robot

> - **Cons:**
> - Can be slow (live analysis of camera image is below 50Hz)
> - Can be imprecise, especially in face of large occlusion (as a result, forces user to face cameras)

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/qGE-deYfb8I" frameborder="0" allowfullscreen></iframe>
</p>

><sub>DexPilot: Vision Based Teleoperation of Dexterous Robotic Hand-Arm System, Handa et al. ICRA 2020,
 YouTube video, Oct 2019. </sub>


##### **3.2. Motion Capture Systems**
In motion capture systems, markers attached to body parts are tracked by infra-red cameras at high resolution.
In the example below, observational learning is happening for full body motion. The interesting point here is that the human and the robot are of different sizes. The rendering is done at the joint level. The human's joints correspond to the robot's joints and the map in between is accessible.

> + **Pros:** 
> + Conveys directly the dynamics of the motion (embodied transmission)
> + Allows to control all joints including hand movements

> - **Cons:**
> - Requires a set-up with several high resolution cameras
> - Suits does not fit all sizes and strengths
> - Does not convey nor render forces at contact

<p align="center">
  <video width="600" height="338" controls>
    <source src="{{ site.baseurl }}/assets/videos/Interfaces-for-HRI/MotionCapture1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

><sub>LASA Lab / EPFL</sub>

Another very popular and more pragmatic method is to use a motion sensor. In this case, markers are tracked by cameras. These cameras are usually infrared-based. The translation and rotation of the marker is mapped to the translation and rotatoin of the end point of the robot. This allows the user to guide the position of the robot from a distance. This method can be quite accurate.

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/ggLge1Rw2z4?t=79" frameborder="0" allowfullscreen></iframe>
</p>

><sub>C. Stanton, A. Bogdanovych, E. Ratanasena: Teleoperation of a humanoid robot using full-body motion capture, example movements, and machine learning. In proceedings of Australasian Conference on Robotics and Automation (ACRA 2012), Wellington, New Zealand, 3-5 December 2012. 
YouTube video, Feb 2012. </sub>

The previous setting can be developed for more complex problems. In the example below, the user is wearing a marker-based system that tracks full motion of the arm, as well as the fingers. These motions are directly mapped onto the robot. This setting still requires the wearing of a device. It is not as heavy as the exoskelton, but it is not as ideal as not wearing anything and using purely an outside camera either. In order to have such setting, there should be cameras all around the room, tracking at very high resolution. Moreover, the system is marker based, which means that tracking is lost as soon as some of the markers are obstructed.

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/LM4rDfW8-TU" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Low-latency marker following using an ABB IRB1200 with EGM and an OptiTrack motion capture rig. 
System built on the HAL Robotics Framework streaming packages with a flexible interface to easily replace the sensors.
 YouTube video, Jun 2019. </sub>

Both in vision systems and motion capture systems, obstruction results in the loss of data. Research is being done on compensating for this loss of data to be able to interpret to interpolate between the available datapoints. If you are gathering data this way, you have to be aware of the fact that there has been some interpolation in the transmission of the data. As a result, the data you have is not completely to be trusted. Another issue with this system is that it doesn't fit all sizes. Furthermore, it doesn't convey force at the contact

<br>

### **Chapter 2: Challenges**

#### **1. Correspondence Problem**
The main difficulty in teaching a robot is that human bodies and robotic bodies differ dramatically. Even when the robot looks more like the human, its body does not have the same range and dynamics of motion. Differences exist in the kinematics of joints: while humans benefit from ball joints, most robots do not. Differences also exist at the level of actuators. Our muscles behave differently from most robotic motors, and the control mechanisms are different. The acceleration profiles of actuators vary as well. Sometimes we can produce much higher accelerations; as a result, actions that are dynamically feasible for us, such as reaching out very quickly, can be impossible for a robot. Conversely, robots can sometimes perform actions that the human body cannot, such as moving at a constant velocity. Moreover, humans have limited ranges of motion in their kinematics.

<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
  <div style="display: flex; justify-content: space-between; gap: 10px; width: 100%;">
    <div style="width: 48%;">
      <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/CorrespondenceBody1.png" alt="Image 1" style="width: 100%; height: 300px; object-fit: cover;">
    </div>
    <div style="width: 48%;">
      <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/CorrespondenceBody2.png" alt="Image 2" style="width: 100%; height: 300px; object-fit: cover;">
    </div>
  </div>
  <div style="text-align: center; font-style: italic; max-width: 80%;">
    Even when the robot looks more like the human, its body does not have the same range and dynamics of motion.
  </div>
</div>

We humans and robots also differ at the sensor level. Robots do not perceive things like we do. Sonars, infrared sensors and lasers are common on robots and easier to process than information from cameras. Humans have different sensors, located in different places and with different densities. This becomes more of an issue when we want the end user to understand what a robot can do. To make this clearer, consider the example where an end user wants to understand how an autonomous car drives. In this case, the user should understand what the car sees. The car sees with Lidars. However, Lidars and human eyes are very different. Lots of effort should be done here in order to render this for the human, so that she/he can understand what the car can see. Moreover, humans should also understand what the car can not see. As pedestrians, humans should be aware of the situations when they can not be detected by these systems. While you are more visible in light clothes rather than dark ones for human eyes, in the case of Lidars, it is not the color of your clothes; it is the reflectiveness of the material of your clothes that makes you visible or not.

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/CorrespondenceSensor.png" alt="Correspondence Problem, Sensors" width="600" height="338">
  <br>
  <em>Robots do not perceive things like we do.</em>
</p>

It is very difficult to teach a robot! Teachers need to train themselves on how to guide the robots before actually training the robots. These robots are generally much bigger than humans, their limbs are bigger. 

<p align="center">
  <video width="600" height="338" controls>
    <source src="{{ site.baseurl }}/assets/videos/Interfaces-for-HRI/Correspondence.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

><sub>LASA Lab / EPFL</sub>

#### **2. Learning is Data-Sensitive**
Learning is data-sensitive. This is the biggest problem we have! Teaching a task will differ depending on the kinematics and dynamics of the robot; the same motion in Cartesian space will lead to different trajectories in joint space. If one robot with a particular kinematics is trained, this doesn't necessarily transfer well to another robot. For example, the training may have been done on a robot with six degrees of freedom. If it is required to transfer this knowledge to another robot with seven degrees of freedom, it is going to be problematic. Even if there are two robotics arm with the same degrees of freedom (for example 7), where one has a high payload and the other has a low payload, they do not share the same dynamics of motion.

<div style="display: flex; justify-content: space-between; gap: 10px;">
  <div style="width: 48%;">
    <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/6DOF.jpg" alt="Image 1" style="width: 100%; height: 300px; object-fit: contain;">
    <br>
    <sub>UR5: 6DOF</sub>
  </div>
  <div style="width: 48%;">
    <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/7DOF.jpg" alt="Image 2" style="width: 100%; height: 300px; object-fit: contain;">
    <br>
    <sub>Franka Panda: 7DOF</sub>
  </div>
</div>

Data is environment-dependent. In the videos below, a successful example of training in different environments is shown. However, it doesn't always work like this. The task here is to open the tray of a printer. This is an interesting task because static friction is present to some point. Then, it gives up and gets replaced by kinetic friction. The robot has to adapt to this and it is not aware of when the friction will give up. A 7 DOF robotic arm is trained to this task at EPFL. This has been transferred nicely to a robot that looks compeletely different, a humanoid, at AIST/JRL in Japan.

<div style="display: flex; justify-content: space-between; gap: 10px;">
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="/assets/videos/interfaces-for-HRI/ArmEPFL.mp4" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>Model Learned at EPFL</sub>
  </div>
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="/assets/videos/interfaces-for-HRI/HumanoidJapan.mp4" type="video/webm">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>Model transferred at AIST/JRL</sub>
  </div>
</div>

#### **3. Variability in Task Definition**
The key question here is: What does it mean to perform a task? There are multiple ways to accomplish a task. If a robot is trained to grate carrots, it depends on the grator. Moreover, it is not the same motion. It even depends on the carrot! As a result, it is not so easy to transmit skills across robots. Despite humans who are fairly good in transferring and generalizing, this is not the case for robots.

<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
  <div style="display: flex; justify-content: space-between; gap: 10px; width: 100%;">
    <div style="width: 48%;">
      <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/GratingCarrot1.jpg" alt="Image 1" style="width: 100%; height: 300px; object-fit: cover;">
    </div>
    <div style="width: 48%;">
      <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/GratingCarrot2.jpg" alt="Image 2" style="width: 100%; height: 300px; object-fit: cover;">
    </div>
  </div>
  <div style="text-align: center; font-style: italic; max-width: 80%;">
    Multiple ways to accomplish a task: Multiple Motions, Multiple Tools
  </div>
</div>

#### **4. Generalizing Control Law – Beyond the Demonstrations**
Another important aspect is to be able to generalize. The robot should infer that the task is composed of sequence of actions. Each action is relative to the object the robot must manipulate; but as a priori, it should look at several predefined frames of reference. It is important for the robot to understand that it is not about where the objects are placed in space globally, but it's the relative positions and the relative forces that matters. There are multiple frames of reference assigned to the different objects in the scene and the robot should extract the knowledge of which of these frames matters when.

<p align="center">
  <video width="600" height="338" controls>
    <source src="{{ site.baseurl }}/assets/videos/Interfaces-for-HRI/Generalization.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

><sub>LASA Lab / EPFL</sub>

<br>

### Credits:
<!-- List all the sources that you used to create the page   -->
This course page is based on the content of the second lecture (Lecture 02: Acquiring Data for Learning) of the course ["MICRO-462, Learning and Adaptive Control for Robots"](https://edu.epfl.ch/coursebook/fr/learning-and-adaptive-control-for-robots-MICRO-462), taught at EPFL by Professor [Aude Billard](https://people.epfl.ch/aude.billard).

### Resources:
#### **Books**:
1. [Billard, A., Mirrazavi, S., & Figueroa, N. (2022). Learning for adaptive and reactive robot control: A dynamical systems approach. MIT Press.](https://mitpress.mit.edu/9780262046169/learning-for-adaptive-and-reactive-robot-control/)

#### **Papers**:
1. S. M. Khansari-Zadeh, K. Kronander, and A. Billard, “Learning to playminigolf: A dynamical system-based approach,” Adv. Robot., vol. 26,no. 17, pp. 1967–1993, 2012. [Online]
2. Yue Peng Toh, Shan Huang, Joy Lin, Maria Bajze, Garth Zeglin, Nancy S. Pollard (2012). Dexterous TeleManipulation With a Multi-Touch Interface. 2012 12th IEEE-RAS International Conference on Humanoid Robots, 8.
3. P. Birkenkampf, D. Leidner and C. Borst, "A knowledge-driven shared autonomy human-robot interface for tablet computers," 2014 IEEE-RAS International Conference on Humanoid Robots, Madrid, Spain, 2014, pp. 152-159, doi: 10.1109/HUMANOIDS.2014.7041352.
4. Losey, Dylan P., et al. “Controlling assistive robots with learned latent actions.” 2020 IEEE International Conference on Robotics and Automation (ICRA). IEEE, 2020.
5. A. Ng, A. Coates, M. Diel, V. Ganapathi, J. Schulte, B. Tse, E. Berger, E. Liang, Inverted autonomous helicopter flight via reinforcement learning, in: International Symposium on Experimental Robotics, 2004.
6. DexPilot: Vision Based Teleoperation of Dexterous Robotic Hand-Arm System, Handa et al. ICRA 2020
7. C. Stanton, A. Bogdanovych, E. Ratanasena: Teleoperation of a humanoid robot using full-body motion capture, example movements, and machine learning. In proceedings of Australasian Conference on Robotics and Automation (ACRA 2012), Wellington, New Zealand, 3-5 December 2012.

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->
1. [Billard, A.G., Calinon, S., Dillmann, R. (2016). Learning from Humans. In: Siciliano, B., Khatib, O. (eds) Springer Handbook of Robotics. Springer Handbooks. Springer, Cham. https://doi.org/10.1007/978-3-319-32552-1_74](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_74#citeas)

