---
title: 12.1 Interfaces for Learning from Human Demonstrations
parent: "Chapter 12: Human-Robot Interaction"
has_children: false
nav_order: 1
layout: numbered
math: mathjax
chapter: 12
section: 1
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>
<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Interfaces for Learning from Human Demonstrations
- Table of Contents
{:toc}
<!-- *Table of Contents*
- [1. General Motivation](#1-general-motivation)
- [2. Course Content](#2-course-content)
  - [2.1: Types of Interfaces](#chapter-1-types-of-interfaces)
  - [2.2. Tele-operation](#1-tele-operation)
    - [2.2.1. Graphical User Interface / Tablet](#11-graphical-user-interfacetablet)
    - [2.2.2. Joysticks](#12-joysticks)
    - [2.2.3. Exoskeletons](#13-exoskeletons)
    - [2.2.5. Haptic Interfaces](#15-haptic-interfaces)
  - [2.3. Kinesthetic Teaching](#2-kinesthetic-teaching)
  - [2.4. Observational Learning](#3-observational-learning)
    - [2.4.1. Vision Systems](#31-vision-systems)
    - [2.4.2. Motion Capture Systems](#32-motion-capture-systems)
  - [2.5 Applications for Telepresence](#14-telepresence)
- [Credits](#credits)
- [Resources](#resources)
  - [Books](#books)
  - [Papers](#papers)
- [Additional Resources](#additional-resources) -->

<br>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/FtjC-BXGgAE" frameborder="0" allowfullscreen></iframe>
</p>

><sub>A small humanoid robot is taught how to cook an omelet by whipping eggs, cutting ham and grating cheese. Teaching is provided through kinesthetic teaching, a method whereby the teacher guides the robot arms through the steps of the movements. Source: EPFL [LASA](http://lasa.epfl.ch]) - YouTube video, Apr 2008.</sub>

## General Motivation
[
Learning from demonstration](https://ras-university.github.io/robotic-courses/docs/chap11_learning/LfD) is a method to transmit skills to robots so they can perform different tasks. While it seems easy, teaching robots to do tasks we, as humans, do easily is not so trivial. This is because our bodies differ from robots' bodies. This is known as the *[correspondence problem](https://ras-university.github.io/robotic-courses/docs/chap11_learning/LfD#challenges-of-learning-from-demonstration)*. To solve this discrepancy between the human body and the robot body, we need **interfaces**. This course gives a brief overview of the various popular interfaces, underlying in each case the pros and cons of each interface.

## Course Content

### Types of Interfaces

Interfaces used to gather data from humans for teaching the robots revolve around three main themes:
> - **Teleoperation:** User controls the robot through the interface and teleoperates the robot with some distance.
> - **Kinesthetic Teaching:** User physically moves the robot (like how it is done while teaching a child or teaching a sport).
> - **Observational learning:** Robot learns from observation of the demonstration (not necessarily through vision systems like cameras but also through motion capture systems).
Each of these methods has its own advantages and disadvantages. We will go through each of them in more details.

### Tele-operation:
In teleoperation, users control robots remotely through a designated interface. The quality of both learning and task performance depends heavily on two factors: the <ins>_user-friendliness of the design_</ins> of the interface and the <ins>_operator’s expertise_</ins>. Effective teleoperation requires that the human operator not only be skilled but also have a solid understanding of the device they are using. As such, the interface should be user friendly, while being effective, two goals that can be conflicting.

As a result, current research has split into two main directions. The first focuses on developing simple interfaces that require little to no pretraining; however, these interfaces restrict the range and complexity of behaviors that can be taught to the robot. The second trend explores more sophisticated interfaces that offer greater expressive power. Although these interfaces demand more training time for the human operator, they enable the robot to learn significantly more complex tasks.

#### Graphical user interface/Tablet
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


<link rel="stylesheet" href="/assets/css/interfaces-for-HRI/Drag&DropStyle.css">

<div class="all-items-container" id="items-to-drag">
  <div class="drag-item" draggable="true" id="item-1" data-correct-zone="Pros">Usability (user experience)</div>
  <div class="drag-item" draggable="true" id="item-2" data-correct-zone="Cons">Capacity in what can be transferred</div>
  <div class="drag-item" draggable="true" id="item-3" data-correct-zone="Pros">Cost</div>
  <div class="drag-item" draggable="true" id="item-4" data-correct-zone="Pros">Integrability to existing set-ups</div>
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

<script src="/assets/js/interfaces-for-HRI/Drag&Drop.js"></script>

</details>


#### Joysticks

With this interface, the user controls the robot’s end-effector using a 3-DOF or 6-DOF joystick. With a 6-DOF joystick, both the position and orientation of the end-effector, encompassing all its degrees of freedom, are controlled by the user. Note that the user is not directly controlling the joints; instead, they control the translation and orientation of the end-effector, which implicitly allows control of the tool being held. This is achieved through inverse kinematics, as the user relies on the robot’s internal controller to perform the necessary inverse kinematics computations.
<br>
<ins>_Pros_</ins>: Similar to tablets, joysticks are inexpensive and user-friendly. Although using a joystick may not feel as intuitive as using a tablet, it is still relatively easy to operate. A joystick can communicate the desired motion in 3D or even 6D and can be easily integrated into a wide range of applications.
<br>
<ins>_Cons_</ins>: Using a joystick often requires both hands. This depends on the specific type of joystick, but it is often necessary to use one hand to control translation and the other to control orientation. Furthermore, joysticks are limited in what can be transferred: forces cannot be transmitted; only displacements and speeds are conveyed. (It is still a step forward compared to tablets, as the range of teachable actions increases; though this comes at the cost of reduced user-friendliness.) Moreover, the performance of this interface depends on the user’s point of view. The user must be positioned to have a clear view of the scene; for example, if the user is behind the robot, visibility is greatly reduced. (Comparing to tablet interfaces, tablets have the advantage that they can display a rendering of the scene from the robot’s point of view.) Finally, joystick interfaces are sensitive to the user’s experience level. They tend to be less user-friendly than tablets and often require some training before they can be used effectively.

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
Another limitation comes from the fact that, when transfering motion via a joystick, one can transfer solely displacement in cartesian space, namely translation and rotation of the end-effector. For the robot to reproduce these movements require to solve the [inverse kinematics](kinematics). This can present challenges, as the user may command an infeasible motion; for example, a rapid rotation that violates the robot’s joint limits. In such cases, an alternative path must be computed. Consequently, the user needs to learn how to operate the robot effectively.
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
      'Correct answer! Joysticks are less user-friendly and require more trianing and experience before usage.',
      'Incorrect answer! Using a tablet is more intuitive than using a joystick. The user can control for more DOFs with a joystick, which comes at the cost of being less user-friendly and requiring more training and experience.')">
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
      'Correct answer! The proper interface here is a 6-DOF joystick, which can control for both position and orientation of the 6-DOF robotic arm.',
      'Incorrect answer! A 6-DOF joystick is required here, as the goal is to control for both position and orientation of a 6-DOF arm.')">
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
      'Correct answer! Forces cannot be transmitted',
      'Incorrect answer! Although all degrees of freedom of the end-effector are covered, forces still can not be transmitted.')">
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
      'Correct answer! Both tablets and joysticks do not control at joint level and rely on internal inverse kinematics controllers. ',
      'Incorrect answer! Joysticks do not directly control the joints, they control for the position and orientation of the end-effector. Consequently, they rely on internal inverse kinematics controllers.')">
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
    'Correct answer! Tablets have the advantage that they can display a rendering of the scene from the robot’s point of view.',
    'Incorrect answer! Although joysticks are limited in what can be transferred, they can still do better than tablets. (They can communicate the desired motion even in 6D.)')">
    Check Answer
  </button>

  <p id="q5-fk-feedback"></p>
</form>

</details>

<script src="quiz.js"></script>

<br>

#### Exoskeletons

An exoskeleton consists of a wearable mechanism that can measure the displacement, and at times, the forces generated by the operator. To demonstrate a task lies in that there is a direct mapping between the user’s body (arms or legs) and the robot’s body. For example, in the video below, the user guides the robot’s arms directly with their own arms. 

<ins>_Pros_</ins>: The advantage of this interface is that, by using exoskeletons, the user can control the joints directly. The user has control over the Cartesian position and orientation of each joint.
<br>
Some exoskeletons (though not all) render the contact forces, meaning that when the robot experiences a force during contact, the user also senses a corresponding force. In this case, the question arises: Which force does the user actually sense? Is it only the force at the end effector, or are forces at other parts of the robot also conveyed? For example, if the robot impacts something with its elbow, does the user feel this force at their own elbow? Rendering such feedback in real time is still difficult and challenging.
<br>
<ins>_Cons_</ins>: Regarding disadvantages, most exoskeletons are heavy and cumbersome. With advancements in materials and actuators, there is hope that this issue will be mitigated, leading to increased adoption of exoskeletons. Another limitation is that an exoskeleton is typically designed for a specific user’s size and strength, making it unsuitable for everyone. However, exoskeletons can be extremely useful if these challenges are addressed.
<br>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/pFnSl6oOLco" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Capio Upper Body Exoskeleton for Teleoperation by the DFKI GmbH Robotics Innovation Center. YouTube video, Nov 2012. </sub>
<br>
<br>


<!-- Conceputal Questions -->
<details open markdown="3">
<summary>Conceptual Questions</summary>


<!-- Question 1 -->
<p><strong>Question 1: Which of the following statements is true?</strong></p>
<form id="q1-fk">
  <input type="radio" name="q1-fk" value="option1"> Exoskeletons rely on internal inverse kinematics controllers.<br>
  <input type="radio" name="q1-fk" value="option2"> The dynamics of motion is conveyed directly in exoskeletons.<br>

  <button type="button" onclick="checkMCQ('q1-fk', 'option2',
    'Correct answer! There is a direct mapping between the user\'s body and the robot\'s body and the joints are controlled directly.',
    'Incorrect answer! Using exoskeletons, joints are controlled directly and there is no need for the internal inverse kinematics controllers.')">
    Check Answer
  </button>

  <p id="q1-fk-feedback"></p>
</form>


<!-- Question 2 -->
<p><strong>Question 2: Which of the following statements is false?</strong></p>
<form id="q2-fk">
  <input type="radio" name="q2-fk" value="option1"> No rendering of the scene can be provided for the user through exoskeletons.<br>
  <input type="radio" name="q2-fk" value="option2"> An exoskeletons is designed for a specific size and does not fit everybody.<br>

  <button type="button" onclick="checkMCQ('q2-fk', 'option1',
    'Correct answer! Some exoskeletons can actually provide rendering of the contact forces.',
    'Incorrect answer! Exoskeletons are designed for specific user characteristics and do not fit all sizes and strengths.')">
    Check Answer
  </button>

  <p id="q2-fk-feedback"></p>
</form>

</details>

<script src="quiz.js"></script>

<!--
> + **Pros:** 
> + Conveys directly the dynamics of the motion (embodied transmission)
> + Allows to control all joints as well as movement in Cartesian space

> - **Cons:**
> - Heavy, cumbersome
> - Does not fit all sizes and strengths
> - Does not convey nor render forces at contact
-->

<br>

#### Haptic interfaces
Haptic interfaces transmit the forces applied by the user so they can be executed at the end effector. They also render the forces perceived by the robot back to the user. In the video below, a typical haptic device can be seen. This device is one of the earliest models, allowing the user to control the position and orientation of the endpoint, as well as the force. Thus, it both transmits and renders force.
<br>
This device operates as a closed-loop system and introduces delays. The delay depends first on the distance between the user and the endpoint, and second on the type of communication used. Typically, this delay ranges between 100 ms and 400 ms. However, it can be much longer depending on the distance. Such delays can lead to incorrect responses and unstable behavior.

<br>

<!--
<p align="center">
  <iframe width="600" height="338" src="https://youtu.be/yULQsB4XXn4" frameborder="0" allowfullscreen></iframe>
</p>

><sub>LASA / EPFL (Switzerland) - JRL / AIST (Japan). Source: EPFL [LASA](http://lasa.epfl.ch])</sub>
-->

<p align="center">
  <video width="600" height="338" controls>
    <source src="/assets/videos/interfaces-for-HRI/Hapticinterfaces.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

><sub>LASA / EPFL (Switzerland) - JRL / AIST (Japan)</sub>

<br>


<!-- Conceputal Questions -->
<details open markdown="5">
<summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Choose the correct option.</strong></p>
<form id="q1-haptic">
  <input type="radio" name="q1-haptic" value="option1"> Haptic interfaces can both transmit the forces applied by the user and render the forces perceived by the robot to the user.<br>
  <input type="radio" name="q1-haptic" value="option2"> Haptic interfaces can only transmit the forces applied by the user.<br>
  <input type="radio" name="q1-haptic" value="option3"> Haptic interfaces can only render the forces perceived by the robot to the user.<br>

  <button type="button" onclick="checkMCQ('q1-haptic', 'option1',
    'Correct answer! Haptic interfaces can both transmit and render forces.',
    'Incorrect answer! Haptic interfaces can not only transmit the forces applied by the user but also render the forces perceived by the robot to the user.')">
    Check Answer
  </button>

  <p id="q1-haptic-feedback"></p>
</form>


<!-- Question 2 -->
<p><strong>Question 2: The delay introduced by the closed loop depends on:</strong></p>
<form id="q2-haptic">
  <input type="radio" name="q2-haptic" value="option1"> Distance<br>
  <input type="radio" name="q2-haptic" value="option2"> The medium used<br>
  <input type="radio" name="q2-haptic" value="option3"> Both of the above<br>

  <button type="button" onclick="checkMCQ('q2-haptic', 'option3',
    'Correct answer! The delay depends on both the distance and the medium used.',
    'Incorrect answer! The delay depends on both the distance and the type of communication used.')">
    Check Answer
  </button>

  <p id="q2-haptic-feedback"></p>
</form>


<!-- Question 3 -->
<p><strong>Question 3: The delays in haptic interfaces lead to decreased quality of the interface, but do not result in instability. </strong></p>
<form id="q3-haptic">
  <input type="radio" name="q3-haptic" value="True"> True<br>
  <input type="radio" name="q3-haptic" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q3-haptic', 'False', 
      'Correct answer! These delays can result in unstable behavior.',
      'Incorrect answer! These delays may lead to incorrect responses and unstable behavior.')">
    Check Answer
  </button>
  <p id="q3-haptic-feedback"></p>
</form>


</details>

<script src="quiz.js"></script>

<!--
> + **Pros:** 
> + Transmits the forces applied by the user
> + Renders the forces perceived by the robot to the user

> - **Cons:**
> - Close-loop system induces delays of 100-400ms depending on distance and medium used
> - Delays may lead to incorrect response and instable behavior
-->

<br>


New finger-based haptic devices leverage the sense of touch, using sensors mounted on robotic fingers to perceive contact and render it through a hand exoskeleton. In this setup, two robotic hands are equipped with tactile sensors. The touch perceived at the endpoint is rendered through the exoskeleton worn by the user. This exoskeleton allows the user to precisely control each individual finger and to sense touch at the fingertips. As a result, this device offers higher resolution and is closer to natural human touch.
<br>
While force rendering occurs only at the fingertips in this system, some tasks—such as grasping or manipulating objects—require force rendering over a larger area of the hand. For example, moving an object within the hand requires rendering forces on the interior surfaces. If preventing the object from slipping is necessary, this rendering must occur within milliseconds. Consequently, delays become a significant issue when it comes to reliable manipulation.
<br>
This system also suffers from drift, and calibration can be challenging. Another point to note is that the range of motion in robotic hands is far more limited compared to human hands.


<!--
> + **Pros:** 
> + Offers higher resolution
> + Closer to human touch

> - **Cons:**
> - Covers only fingertips, but sense of touch is all along fingers, palm, top of the hand
> - Suffers from drifts, calibration can be an issue
-->

<br>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/rEoq7DMgaEc" frameborder="0" allowfullscreen></iframe>
</p>

><sub>HaptX haptic glove integrated with Shadow Robot hand
Footage from Adam Savage's Tested + ShadowRobot Company and Syntouch. YouTube video, Nov 2012. </sub>

<br>

### Kinesthetic Teaching 
In kinesthetic teaching, the teacher physically moves the robot. This is possible due to the robot’s backdrivability. The robot is completely compliant to the user’s motion. The advantage is that the user interacts directly with the robot’s feasible workspace. Forces applied by the user are transmitted directly to the robot, and the user can directly sense the forces involved in the task. Once the user has trained the robot, the robot can then reproduce the task and generalize.
<br>
Kinesthetic teaching is particularly well suited for transmitting information about tasks that require accurate force control. The forces applied by the user are transmitted directly to the robot, and the user can directly sense the forces involved in the task.
<br>
Kinesthetic teaching is also useful when training robots that differ significantly from the human body, such as industrial robot arms. It helps resolve part of the correspondence problem, as the teacher or operator is forced to adapt their movements to the robot’s feasible workspace. Note that when the robot is trained through passive compliant motion, there is a risk that the teacher shows movement with a speed or acceleration that cannot be matched by the robot, as it may exceed the robot's joints' acceleration bounds.

<br>
<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/TeachRobotGolf.jpg" alt="Teaching a Robot to Play Golf" width="600" height="338">
</p>

><sub>S. M. Khansari-Zadeh, K. Kronander, and A. Billard, "Learning to playminigolf: A dynamical system-based approach," Adv. Robot., vol. 26,no. 17, pp. 1967–1993, 2012. [Online]. Available: [http://infoscience.epfl.ch/record/181052](http://infoscience.epfl.ch/record/181052)</sub>
>
><sub>Teaching a Robot to Play Golf. Teaching is provided through kinesthetic teaching, a method whereby the teacher guides the robot arms through the steps of the movements. Source: EPFL [LASA]([http://lasa.epfl.ch])) 

<!--
> + **Pros:** 
> + Direct control motion of robot
> + Can transmit forces
> + Can perceive forces at contact

> - **Cons:**
> - Cumbersome
> - Limited in the number of joints / limbs one can move at once
-->

<!--
<div style="display: flex; justify-content: space-between; gap: 10px;">
  <div style="width: 48%;">
    <iframe width="100%" height="300" src="https://www.youtube.com/embed/9jNg5mBkbrk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
  <div style="width: 48%;">
    <iframe width="100%" height="300" src="https://www.youtube.com/embed/vJRYortGfR0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
</div>
-->

<br>

<div style="display: flex; justify-content: space-between; gap: 10px;">
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="/assets/videos/interfaces-for-HRI/Kinesthetic1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="/assets/videos/interfaces-for-HRI/Kinesthetic1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
</div>

<br>

In the left example above, the robot has been taught to pick up objects and move through the narrow passage. Meanwhile, the robot can tolerate many disturbances and is resilient to them. More complex tasks, for example, tasks requiring bimanual coordination, can also be taught to the robot using this method. An example of such a task is shown in the right video above. Since the task requires bimanual coordination, the user must hold both arms of the robot. Once trained, the robot can reproduce the forces and the task.
<br>
Regarding the limitations, it is still cumbersome. The user, with only two arms, can hold only the two endpoints of the robot. This limits the number of joints the user can move at once. The user cannot directly control the elbow or the motion of each joint and must still rely on an internal inverse kinematics controller to achieve these movements.
<br>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/xIK6U52TjRM" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Learning by Demonstration, Bimanual Coordinated Task, LASA, Nov 2016. </sub>


<!-- Conceputal Questions -->
<details open markdown="6">
<summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Which option is not an advantage of kinesthetic teaching?</strong></p>
<form id="q1-kin">
  <input type="radio" name="q1-kin" value="option1"> Direct control motion of the robot<br>
  <input type="radio" name="q1-kin" value="option2"> No need for internal inverse kinematics controllers<br>
  <input type="radio" name="q1-kin" value="option3"> Ability to perceive forces at contact<br>
  <input type="radio" name="q1-kin" value="option4"> Ability to transmit forces<br>

  <button type="button" onclick="checkMCQ('q1-kin', 'option2',
    'Correct answer! The user cannot directly control the the motion of each joint and must still rely on an internal inverse kinematics controller.',
    'Incorrect answer! Try again.')">
    Check Answer
  </button>

  <p id="q1-kin-feedback"></p>
</form>


<!-- Question 2 -->
<p><strong>Question 2: In kinesthetic teaching, the teacher directly moves the robot. As a result, there is no need for and internal inverse kinematics controller.</strong></p>
<form id="q2-kin">
  <input type="radio" name="q2-kin" value="True"> True<br>
  <input type="radio" name="q2-kin" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q2-kin', 'False', 
      'Correct answer! There still exists the need for an internal inverse kinematics controller.',
      'Incorrect answer! The user cannot directly control the motion of each joint and must still rely on an internal inverse kinematics controller to achieve these movements.')">
    Check Answer
  </button>
  <p id="q2-kin-feedback"></p>
</form>


</details>

<script src="quiz.js"></script>


### Observational Learning:
#### Vision Systems
In vision systems, RGB-D cameras are used and body motion is reconstructed automatically. In the example below, the motion of a human hand is tracked. The hand’s motion is reconstructed at high speed and transmitted directly to the robot. This is advantageous because the user does not need to wear any equipment; they simply demonstrate the tasks by performing them. This allows users to perform tasks in a natural manner. It is one of the ideal approaches because it does not require complex hardware; essentially only a camera is needed.
<br>
The difficulty lies in interpreting the scene from the camera’s point of view, making the challenge primarily algorithmic. Another issue is that the user must learn which motions are transmitted accurately and which are not. There is no force rendering in this setup. The system is purely visual, but it can still be quite powerful.
<br>
Another disadvantage is that the setup can be slow, as live analysis of camera images typically runs below 50 Hz. Moreover, it can be imprecise, especially in the presence of significant occlusion. As a result, the user must adapt to the camera’s field of view (i.e., face the camera) and account for precision limitations.

<!--
> + **Pros:** 
> + Enables users to perform task in a natural manner
> + Can be extended to analysing any videos of human motion, not necessarily videos of human teaching a robot

> - **Cons:**
> - Can be slow (live analysis of camera image is below 50Hz)
> - Can be imprecise, especially in face of large occlusion (as a result, forces user to face cameras)
-->

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/qGE-deYfb8I" frameborder="0" allowfullscreen></iframe>
</p>

><sub>DexPilot: Vision Based Teleoperation of Dexterous Robotic Hand-Arm System, Handa et al. ICRA 2020,
 YouTube video, Oct 2019. </sub>


<!-- Conceputal Questions -->
<details open markdown="7">
<summary>Conceptual Question</summary>

<!-- Question -->
<p><strong>Vision systems can be extended to analysing any videos of human motion, not necessarily videos of human teaching a robot.</strong></p>
<form id="q1-vis">
  <input type="radio" name="q1-vis" value="True"> True<br>
  <input type="radio" name="q1-vis" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q1-vis', 'True', 
      'Correct answer!',
      'Incorrect answer! Try again!')">
    Check Answer
  </button>
  <p id="q1-vis-feedback"></p>
</form>


</details>

<script src="quiz.js"></script>


#### Motion Capture Systems
In motion capture systems, markers attached to body parts are tracked by infrared cameras at high resolution. These systems directly convey the dynamics of the motion (embodied transmission). In the example below, observational learning is performed for full-body motion. These systems allow control of all joints. An interesting aspect, as seen in the example below, is that the human and the robot can be of different sizes. Control is done at the joint level: the human’s joints correspond to the robot’s joints, and the mapping between them is accessible.

<!--
> + **Pros:** 
> + Conveys directly the dynamics of the motion (embodied transmission)
> + Allows to control all joints including hand movements

> - **Cons:**
> - Requires a set-up with several high resolution cameras
> - Suits does not fit all sizes and strengths
> - Does not convey nor render forces at contact
-->

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/ggLge1Rw2z4?t=79" frameborder="0" allowfullscreen></iframe>
</p>

><sub>C. Stanton, A. Bogdanovych, E. Ratanasena: Teleoperation of a humanoid robot using full-body motion capture, example movements, and machine learning. In proceedings of Australasian Conference on Robotics and Automation (ACRA 2012), Wellington, New Zealand, 3-5 December 2012. 
YouTube video, Feb 2012. </sub>
<br>
<br>
Another very popular and more practical method is to use a motion sensor. In this case, markers are tracked by cameras, which are usually infrared-based. The translation and rotation of the marker are mapped to the translation and rotation of the robot’s endpoint. This allows the user to guide the robot’s position from a distance. This method can be quite accurate.

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/LM4rDfW8-TU" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Low-latency marker following using an ABB IRB1200 with EGM and an OptiTrack motion capture rig. 
System built on the HAL Robotics Framework streaming packages with a flexible interface to easily replace the sensors.
 YouTube video, Jun 2019. </sub>

 <br>

The previous setting can be extended to more complex problems. In the example below, the user is wearing a marker-based system that tracks the full motion of the arm as well as the fingers. These motions are directly mapped onto the robot. This setup still requires the user to wear a device. It is not as heavy as an exoskeleton, but it is also not as ideal as wearing nothing and relying solely on an external camera system. To achieve such a setup, cameras must be placed around the entire room and must track motion at very high resolution. Moreover, the system is marker-based, which means tracking is lost as soon as markers become obstructed.

<!--
<p align="center">
  <iframe width="600" height="338" src="https://youtu.be/EUGeL9_ONvw" frameborder="0" allowfullscreen></iframe>
</p>

><sub>LASA Lab / EPFL</sub>
-->

<p align="center">
  <video width="600" height="338" controls>
    <source src="/assets/videos/interfaces-for-HRI/MotionCapture1.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

><sub>LASA Lab / EPFL</sub>


In both vision systems and motion capture systems, obstruction results in the loss of data. Research is being conducted on compensating for this loss in order to interpolate between the available data points. If you are gathering data in this way, you must be aware that some interpolation has occurred during data transmission. As a result, the data you obtain can not be fully trusted. Another issue with this type of system is that it does not fit all body sizes and strengths. Furthermore, it neither conveys nor renders forces at contact.


<br>

### Applications for Telepresence
The interfaces we listed above can be used also in a larger context, not necessarily aimed at teaching robots. One such example is telepresence, namely to enable a human operator to perform tasks remotely via a robotic systems. Examples include operations in radioactive environments, search-and-rescue missions, or any other tasks carried out in dangerous settings. 
<br>
Teleoperation in such situations requires great precision and care. As a result, it becomes necessary to render certain aspects of the environment for the operator. This introduces communication challenges, i.e. delays. Greater distance between the robot and the operator results in longer delays. Delays of several hours can occur in space missions where a robot is teleoperated from Earth. These are issues that must be addressed in this field.
<br>
In the example below, the surgeon is not operating directly on the patient; instead, the procedure is performed through an interface; the da Vinci surgical robot. Such operations have become fairly common today. These systems offer several advantages: the operator does not need to be physically present on site and can perform tasks remotely. In the case of surgery, an expert surgeon can carry out a procedure from their own office on a patient located in another region of the world. Consequently, this approach can be more efficient and safer. However, it relies heavily on high-quality rendering of the environment.

<br>
<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/Davinci.jpg" alt="Davinci Surgical Robot" width="600" height="338">
</p>

><sub>Davinci Surgical Robot</sub>

<br>
Regarding rendering the environment, it is interesting to note that surgeons today typically receive only a two-dimensional visual representation of the scene. Nevertheless, by moving the camera and instruments, they construct a three-dimensional model of the environment in their minds and map it onto the provided 2D imagery. They are not given force feedback; they cut tissues and move things without sensing the applied force. This can be critical; for example, when determining how deep a cut should be. Moreover, some tissues are stiffer than others. Skilled surgeons infer force information from visual observations, such as from tissue deformation, thanks to their expertise. However, mistakes can occur, and providing richer renderings of the scene could help reduce these mistakes.
<br>
In such operations, transmission delays can be extremely detrimental. In fact, one of the most important research challenges in this field is determining how to compensate for these delays to ensure controller stability. To illustrate this, imagine a surgeon applying a force: even if they eventually perceive a resistance as feedback, by the time the feedback reaches them, they will have continued moving. Once the resistance is sensed and the surgeon begins to react, such as by reducing the force, it may already be too late. In such a scenario, the closed-loop control system becomes completely unstable.


<!-- Conceputal Questions -->
<details open markdown="4">
<summary>Conceptual Questions</summary>


<!-- Question 1 -->
<p><strong>Question 1: Despite all the facilities telepresence provides, it is not yet possible to perform tasks fully remotely due to communication problems.</strong></p>
<form id="q1-tele">
  <input type="radio" name="q1-tele" value="True"> True<br>
  <input type="radio" name="q1-tele" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q1-tele', 'False', 
      'Correct answer! Telepresence enables tasks to be performed remotely. The da Vinci surgical robot is a great example that is widely used today.',
      'Incorrect answer! Although communication challenges, such as delays, can be detrimental in telepresence, it is successfully used worldwide.')">
    Check Answer
  </button>
  <p id="q1-tele-feedback"></p>
</form>


<!-- Question 2 -->
<p><strong>Question 2: What is the most challenging issue in telepresence?</strong></p>
<form id="q2-tele">
  <input type="radio" name="q2-tele" value="option1"> Delays in transmission can be determinal if the task is rapid, leading to an unstable control loop.<br>
  <input type="radio" name="q2-tele" value="option2"> A very good visual rendering of the scene must be provided to the user, as she/he is not present in the environment.<br>

  <button type="button" onclick="checkMCQ('q2-tele', 'option1',
    'Correct answer! Delays in transmission can lead to unstable behavior.',
    'Incorrect answer! Although it is important to provide a good rendering of the scene in telepresence, it is not as critical as the delays in transmission.')">
    Check Answer
  </button>

  <p id="q2-tele-feedback"></p>
</form>


</details>

<script src="quiz.js"></script>


<!--
> + **Pros:** 
> + Enables to perform tasks when remote
> + Can offer a more efficient and more secure mean to intervene (in disastrous or dangerous environments)

> - **Cons:**
> - Need to provide good visual rendering of the scene
> - Delays in transmission can be detrimental if task is too rapid
> - Force not always (well) rendered
-->


## Credits:
<!-- List all the sources that you used to create the page   -->
This course page is based on the content of the second lecture (Lecture 02: Acquiring Data for Learning) of the course ["MICRO-462, Learning and Adaptive Control for Robots"](https://edu.epfl.ch/coursebook/fr/learning-and-adaptive-control-for-robots-MICRO-462), taught at EPFL by Professor [Aude Billard](https://people.epfl.ch/aude.billard). It also benefitted from input from Dr. Ahalya Prabhakar.

## Resources:
### Books:
1. [Billard, A., Mirrazavi, S., & Figueroa, N. (2022). Learning for adaptive and reactive robot control: A dynamical systems approach. MIT Press.](https://mitpress.mit.edu/9780262046169/learning-for-adaptive-and-reactive-robot-control/)

### Papers:
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



























