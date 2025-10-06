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

><sub>The Chief Cook Robot (short version): A humanoid robot learning to cook an omelet by whipping eggs, cutting ham and grating cheese. YouTube video, Apr 2008.</sub>

## 0. Prerequisites

## 1. General Motivation

Our main motivation is to transmit skills to robots so they can perform different tasks. We want to teach our robots how to carry out a task. The most trivial solution would be to teach the robot by moving it, just as we do with a baby. However, unlike with a baby, this is by no means trivial with a robot. This is because our bodies differ from robot bodies. As a result, to solve this discrepancy between the human body and the robot body, we need **interfaces**.

## 2. Course Content

### Chapter 1: Data-driven Learning

<br>

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

How we gather data from humans to teach the robots revolves around three main themes:
> - **Teleoperation:** User controls the robot through the interface and teleoperates the robot with some distance.
> - **Kinesthetic Teaching:** User physically moves the robot (like how it is done while teaching a child or teaching a sport).
> - **Observational learning:** Robot learns from observation of the demonstration (not necessarily through vision systems like cameras but also through motion capture systems).
Each of these methods has its own advantages and disadvantages. We will go through each of them in more detail.

#### **1. Tele-operation:**
In tele-operation, users control robots using some **interface** to perform the task. The quality of learning and performance is sensitive to: **1.Interface Design** and **2. Teacher Experience**.
This means that the person who teleoperates needs to be good at it and understand the device he/she is using. As a result, the research today follows two main trends. In the first trend, the interface used is simple so that it doesn’t require much pretraining for usage, however, this results in limited capacity in what can be taught to the robot. In the second trend, a complex interface is designed. It takes time for the human to train himself/herself in good use of the interface, but very complex things can be taught to the robot. 

##### **1.1. Graphical user interface/Tablet**
The simplest interface that can be used is a tablet. It was used back in the 90s; it is becoming more complex with the increased capacity of today’s tablets. However, it is still a simple system. The user can communicate the desired motion by mimicking the motion on the tablet, or desired target.

> + **Pros:** 
> +User-friendly: Almost everybody knows how to work with a tablet these days.
> + Cheap
> + Easily integrable to existing set-up: It can be posted even on smart cellphones which is something almost everybody owns these days.

> - **Cons:** 
> + Limited in what can be transferred (displacement is in a plane and therefore the field of motion is reduced.)

In the left example, the user is driving the robotic hand using a tablet interface. Opening and closing of all the fingers can be controlled. The movement of the user’s hand on the tablet interface is directly translated to a robotic hand.
In the right example, the user can drive the robot to pick up different objects. The vision from the robot’s standpoint is rendered to the interface (a rendering of the scene onto the tablet).
In addition to the planar displacements, planar rotation can also be provided by rotating the tablet. As a result, all the three dimensions of planar movement can be provided in a tablet interface. Although some desired motions can be provided this way, it is limited in what can be transferred in general. In the end, the field of motion is very reduced in this interface. 

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

The user controls the robot's end-effector through a 3DOFs or 6DOFs joystick. In a 6DOF joystick, both position and orientation of the end-effector, which includes all the degrees of freedom of the end-effector, are controlled by the user. Note that the user is not controling the joints, she/he is controling the translation and orientation of the end-effector, which allows to control implictly for the tool that is being held. This is possible using inverse kinematics (the user relies on the internal controller of the system to do the inverse kinematics).

> - **Pros:** 
> + Can communicate the desired motion in 3D or even 6D, easily amenable to control 6DOFs robot arm in position and orientation 

<p align="center">
  <img src="https://iliad.stanford.edu/images/posts/losey2019controlling/image11.gif" width="600" height="338"/>
</p>

<sub>Losey, Dylan P., et al. "Controlling assistive robots with learned latent actions." 2020 IEEE International Conference on Robotics and Automation (ICRA). IEEE, 2020. Video Source: [https://iliad.stanford.edu/research/interactions](https://iliad.stanford.edu/research/interactions)</sub>

> +  User-friendly
> +  Cheap
> +  Easily integrable for a vast range of applications

> - **Cons:**
> - Often requires the use of the two hands: This depends on which joystick to use, but it is often the case in order to control for translation with one hand and orientation with the other hand.
> - Limited in what can be transferred: Force can't be transfeered, it is only displacement and speed that are transferred. (Note that it is still one step forward compared to tablets; there is an increase in the number of things that can be taught, which on the other hand results in being a bit less user-friendly.)
> - Depends on the point of view of the user: The user should be well placed to have a relatively good view. For example, if the user is behind the robot, she/he can't see much (A positive point about tablets is that a rendering of the scene, viewed from robot's point of view, is provided).
> - Sensitive to experience of teacher: It is a bit less user-firendly compared to tablets and often requires a bit of training before usage.

The inverse kinematics can be an issue when it comes to teleoperation. The user may ask for an infeasible motion, for example, a very quick rotation that violates the joint limits. In such cases, an alternative path should be found. As a result, the user has to learn how to use the robot. On the other hand, there is a very nice advantage in teleoperation; the user can teach robots that are completely different from she/he. A good example of this is teaching drones.

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/M-QUkgk3HyE" frameborder="0" allowfullscreen></iframe>
</p>

><sub>A. Ng, A. Coates, M. Diel, V. Ganapathi, J. Schulte, B. Tse, E. Berger, E. Liang, Inverted autonomous helicopter flight via reinforcement learning, in: International Symposium on Experimental Robotics, 2004. </sub>

In the example above, a helicopter is taught to perform very complex manuevers. There exists an underlying controller which stabilizes the helicopter (this is a pre-exsisting controller for stabilization and is not trained). The training is on the very complex trajectory. Since it is desired to control for position and oreintation, 6DOF joystick is a proper tool. They rely on an underlying controller which can solve for a lot of issues that humans can't control. Stabilization and inverse kinematics are the examples. In this case, a very experienced and skilled teacher is required to teach the robot such complex manuvers.

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
In terms of rendering the environment, it is interesting to note that nowadays, surgeons are provided with two dimensional visual renderings of the scene. By moving the camera and instruments, surgeons actully build a three dimensional model of the scene in their mind and map it to the two dimensional provided rendering. They don't have feedback on forces. They cut the tissues and move things without sensing the force applied. This can be important in the sense that how deep the cut should be. Moreover, some tissues may be stiffer than other tissues. Such surgeons have the ability to map their visual observations such as deformations of the tissues to perception of force, thanks to their skill and expertise. However, there can be mistakes and providing richer renderings of the scenes can help in this regard.

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
New finger-based haptic devices leverage on sense of touch mounted on robots' fingers to perceive contact and render these through hand exoskeleton.

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
In kinesthetic teaching, the teacher physically moves the robot.

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

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/xIK6U52TjRM" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Learning by Demonstration, Bimanual Coordinated Task, LASA, Nov 2016. </sub>


#### **3. Observational Learning:**
##### **3.1. Vision Systems**
In vision systems, RGB-D cameras are used and body motion are reconstructed automatically.

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



##### **3.1. Motion Capture Systems**
In motion capture systems, markers attached to body parts are tracked by infra-red cameras at high resolution.

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

<br>
<br>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/ggLge1Rw2z4?t=79" frameborder="0" allowfullscreen></iframe>
</p>

><sub>C. Stanton, A. Bogdanovych, E. Ratanasena: Teleoperation of a humanoid robot using full-body motion capture, example movements, and machine learning. In proceedings of Australasian Conference on Robotics and Automation (ACRA 2012), Wellington, New Zealand, 3-5 December 2012. 
YouTube video, Feb 2012. </sub>

<br>
<br>

<p align="center">
  <iframe width="600" height="338" src="https://www.youtube.com/embed/LM4rDfW8-TU" frameborder="0" allowfullscreen></iframe>
</p>

><sub>Low-latency marker following using an ABB IRB1200 with EGM and an OptiTrack motion capture rig. 
System built on the HAL Robotics Framework streaming packages with a flexible interface to easily replace the sensors.
 YouTube video, Jun 2019. </sub>



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

