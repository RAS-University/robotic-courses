---
title: Interfaces for Human-Robot Interaction
parent: Courses
layout: default
nav_order: 7
---
# Interfaces for Human-Robot Interaction

*Table of Contents*
{:toc}
**FIX TABLE OF CONTENT**

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/FtjC-BXGgAE" frameborder="0" allowfullscreen></iframe>
</p>

><sub>The Chief Cook Robot (short version): A humanoid robot learning to cook an omelet by whipping eggs, cutting ham and grating cheese. YouTube video, Apr 2008. Available at: https://www.youtube.com/watch?v=FtjC-BXGgAE</sub>

## 0. Prerequisites

## 1. General Motivation

Our main motivation is to transmit skills to robots so they can perform different tasks. We want to teach our robots how to carry out a task. The most trivial solution would be to teach the robot by moving it, just as we do with a baby. However, unlike with a baby, this is by no means trivial with a robot. This is because our bodies differ from robot bodies. As a result, to solve this discrepancy between the human body and the robot body, we need **interfaces**.

## 2. Course Content

### Chapter 1: Data-driven Learning

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/TeachRobotGolf.jpg" alt="Teaching a Robot to Play Golf" width="600" height="338">
</p>

><sub>S. M. Khansari-Zadeh, K. Kronander, and A. Billard, "Learning to playminigolf: A dynamical system-based approach," Adv. Robot., vol. 26,no. 17, pp. 1967–1993, 2012. [Online]. Available: [http://infoscience.epfl.ch/record/181052](http://infoscience.epfl.ch/record/181052)</sub>
>
><sub>Teaching a Robot to Play Golf

Imagine that we want to teach a robot how to play golf, or more precisely, how to hit a target and have the target sink into a specific goal. To learn, we need data. All of this revolves around the idea of **data-driven learning**. So, we need to gather data. The key question is: **how do we gather data?**
<br>
We can think of two main approaches to gathering data. In the first method, the robot learns on its own through trial and error. It tries different actions, receives some form of **reward** from the environment or a user, and learns from this feedback. This is referred to as **reinforcement learning**.
<br>
An alternative is to learn from demonstration, where an **expert** provides examples and the robot learns from them. This is referred to as **learning from demonstration**. In this case, the expert data must be transmitted to the robot in a way that conveys what needs to be done. This can happen in two ways: either a **knowledgeable human expert** demonstrates the task to the robot, or the data is generated using **optimal control**. In other words, optimal control provides the required data.

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/MethodsToTrainRobots.png" alt="Main Methods to Train Robots" width="600" height="338">
</p>

> Main Methods to Train Robots

**Bootstrapping the Search:**

**1. Reinforcement Learning:** Looking at the reinforcement learning approach, the idea is to use an algorithm that searches for possible solutions. However, searching for a path from one point to another in a high-dimensional space requires an enormous search space. Moreover, you don't even know how to get started in the first place. You must be careful, since the robot cannot move in all possible directions; it may collide with itself—and the algorithm might request velocities that exceed what is physically feasible.
<br>
To reduce the search space and bootstrap the process, you need to warm-start from a **feasible set of parameters**. In other words, at least one example of a feasible strategy should be provided. This can be done either through **human demonstration** or **simulation**. In the case of human demonstration, the robot explores around the demonstrated example and receives some guidance through feedback. In the case of simulation, all possible solutions can be tested and evaluated without the risk of damaging the robot. At least one feasible solution can be identified in this way, after which the real robot can continue its search around that solution.
<br>
**2. learning from Demonstration:** In this case, the robot learns directly and purely from experts. It receives examples provided by the expert and tries to mimic them as closely as possible.
<br>
In this way, the search is bootstrapped by starting with one set of feasible parameters and then exploring around it. Furthermore, the demonstration can also help in reducing the search space by indicating how far around the example the robot should explore. As a result, the human shows not only what to do but also what not to do, thereby constraining the bounds of the feasible set to some extent. The algorithm can then search within this set to find the best solution.
<br>

** To be continued with more explanation**

### Chapter 2: Types of Interfaces

How we gather data from humans revolves around three main themes:
> - **Teleoperation:** User controls the robot through the interface.
> - **Kinesthetic Teaching:** User physically moves the robot. 
> - **Observational learning:** Robot learns from visual observation of the demonstration.

#### **1. Tele-operation:**
In tele-operation, users control robots using some **interface** to perform the task. The quality of learning and performance is sensitive to: **1.Interface Design** and **2. Teacher Experience**.

##### **1.1. Graphical user interface/Tablet**

The user can communicate the desired motion by mimicking the motion on the tablet, or desired target.
> - **Pros:** User-friendly, Cheap, Easily integrable to existing set-up.
> - **Cons:** Limited in what can be transferred (displacement is in a plane adn therefore the field of motion is reduced.)

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

##### **1.2. Joysticks**

The user controls the robot's end-effector through a 3DOFs or 6DOFs joystick.
> - **Pros:** 
> + + Can communicate the desired motion in 3D or even 6D, easily amenable to control 6DOFs robot arm in position and orientation 

<p align="center">
  <img src="https://iliad.stanford.edu/images/posts/losey2019controlling/image11.gif" width="600" height="338"/>
</p>

><sub>Losey, Dylan P., et al. "Controlling assistive robots with learned latent actions." 2020 IEEE International Conference on Robotics and Automation (ICRA). IEEE, 2020. Video Source: https://iliad.stanford.edu/research/interactions</sub>

> + + Can communicate the desired motion in 3D or even 6D, easily amenable to control robots that differ from humans (drones here) - control in position and orientation

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/M-QUkgk3HyE" frameborder="0" allowfullscreen></iframe>
</p>

><sub>A. Ng, A. Coates, M. Diel, V. Ganapathi, J. Schulte, B. Tse, E. Berger, E. Liang, Inverted autonomous helicopter flight via reinforcement learning, in: International Symposium on Experimental Robotics, 2004. Available at: https://www.youtube.com/watch?v=M-QUkgk3HyE</sub>

> +  + User-friendly, cheap, easily integrable for a vast range of applications
> - **Cons:**
> - - Often requires the use of the two hands
> - - Limited in what can be transferred (in terms of displacement and speed, not forces)
> - - Sensitive to experience of teacher

##### **1.3. Exoskeletons**
> + **Pros:** 
> + + Conveys directly the dynamics of the motion (embodied transmission)
> + + Allows to control all joints as well as movement in Cartesian space

> - **Cons:**
> - - Heavy, cumbersome
> - - Does not fit all sizes and strengths
> - - Does not convey nor render forces at contact

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/pFnSl6oOLco" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Capio Upper Body Exoskeleton for Teleoperation by the DFKI GmbH Robotics Innovation Center. YouTube video, Nov 2012. Available at: https://www.youtube.com/watch?v=pFnSl6oOLco</sub>

##### **1.4. Telepresence**
> + **Pros:** 
> + + Enables to perform tasks when remote
> + + Can offer a more efficient and more secure mean to intervene (in disastrous or dangerous environments)

> - **Cons:**
> - - Need to provide good visual rendering of the scene
> - - Delays in transmission can be detrimental if task is too rapid
> - - Force not always (well) rendered

<p align="center">
  <img src="{{ site.baseurl }}/assets/images/Interfaces_for_HRI/Davinci.jpg" alt="Davinci Surgical Robot" width="600" height="338">
</p>

><sub>Davinci Surgical Robot</sub>

##### **1.5. Haptic interfaces**
> + **Pros:** 
> + + Transmit the forces applied by the user
> + + Renders the forces perceived by the robot to the user

> - **Cons:**
> - - Close-loop system induces delays of 100-400ms depending on distance and medium used
> - - Delays may lead to incorrect response and instable behavior

<p align="center">
  <video width="600" height="338" controls>
    <source src="{{ site.baseurl }}/assets/videos/Interfaces-for-HRI/HapticInterfaces.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</p>

><sub>LASA Lab / EPFL in collaboration with JRL / TsukubaL</sub>

##### **1.6. Haptice Devices & Teleoperation**
New finger-based haptic devices leverage on sense of touch mounted on robots' fingers to perceive contact and render these through hand exoskeleton.

> + **Pros:** 
> + + offer higher resolution
> + + Closer to human touch

> - **Cons:**
> - - Covers only fingertips, but sense of touch is all along fingers, palm, top of the hand
> - - Suffers from drifts, calibration can be an issue

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/rEoq7DMgaEc" frameborder="0" allowfullscreen></iframe>
</p>

><sub>HaptX haptic glove integrated with Shadow Robot hand
Footage from Adam Savage's Tested + ShadowRobot Company and Syntouch. YouTube video, Nov 2012. Available at: https://youtu.be/rEoq7DMgaEc</sub>

#### **2. Kinesthetic Teaching** 
In kinesthetic teaching, the teacher physically moves the robot.

> + **Pros:** 
> + + Direct control motion of robot
> + + Can transmit forces
> + + Can perceive forces at contact

> - **Cons:**
> - - Cumbersome
> - - Limited in the number of joints / limbs one can move at once

<div style="display: flex; justify-content: space-between; gap: 10px;">
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="{{ site.baseurl }}/assets/videos/interfaces-for-HRI/Kinesthetic1.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
  <div style="width: 48%;">
    <video controls style="width: 100%; height: 300px; object-fit: cover;">
      <source src="{{ site.baseurl }}/assets/videos/interfaces-for-HRI/Kinesthetic2.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <br>
    <sub>LASA Lab / EPFL</sub>
  </div>
</div>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/xIK6U52TjRM" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Learning by Demonstration, Bimanual Coordinated Task, LASA, Nov 2016. Available at: https://www.youtube.com/watch?v=xIK6U52TjRM</sub>

#### **3. Observational Learning**
**TO BE CONTINUED**

### **Chapter 3: Challenges**
The main difficulty in teaching a robot is that human bodies and robotic bodies differ dramatically. Differences exist in the kinematics of joints: while humans benefit from ball joints, most robots do not. Differences also exist at the level of actuators. Our muscles behave differently from most robotic motors, and the control mechanisms are different. The acceleration profiles of actuators vary as well. Sometimes we can produce much higher accelerations; as a result, actions that are dynamically feasible for us, such as reaching out very quickly, can be impossible for a robot. Conversely, robots can sometimes perform actions that the human body cannot, such as moving at a constant velocity.
<br>
We also differ at the sensor level. Humans have different sensors, located in different places and with different densities. Moreover, humans have limited ranges of motion in their kinematics. All of this makes transferring information from a human to a robot non-trivial. To manage this discrepancy between human and robot bodies, we need appropriate interfaces.
<br>
**TO BE CONTINUED**


=======




## Additional Resources

### Credits:
<!-- List all the sources that you used to create the page   -->

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->

