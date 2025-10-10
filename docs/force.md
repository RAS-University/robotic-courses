---
title: Force Perception 
parent: Courses
layout: default
nav_order: 7
author: Mael Studer (EPFL)
---

<!-- Link external JavaScript file -->
<script src="questions.js"></script>

<!-- Back-To-Top Button -->
<a name="top"></a>

<style>
  #back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color:rgba(0, 0, 0, 1);
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

## 1. Prerequisites

- add at the end
- closed-loop control page (controller definition)
- (read course about sensors and sensing)

---

## 2. General Motivation

Robots are expected to interact closely and safely with humans aswell as with their environement. Besides interaction modalities like vision (refer to vision page), there is one modality that humans use all the time, but is often neglected in robotics: **touch** (or physical interaction).  

**Physical interaction** happens when a robot gets in touch with a human or an object of the real world. There is either a force generated from the robot towards the object or vice-versa. Physical interaction is classified into three catergories according to the executed task: **manipulation, exploration** and **reaction**. These categories are explained and illustrated below.  

- **Manipulation:** (robot: active agent - object: passive agent)  
*Goal: Use perception to perform an action on an object successfully.*  
During manipulation, a robot senses an object and adapts its actions accordingly. An example of manipulation is the grasping of objects, essential in industrial applications. During grasping, touch could be used to maximize the contact surface between the robotic hand and the object or to prevent slippage of the object. (->link to grasping page)  
Slippage can arise in scenarios like dealing with soft objects (e.g. fruit), when objects change weight mid grasp (e.g. water bottle filled during manipulation) or just while moving objects from one place to another. The latter is shown in the video below.  
From the point of view of signals, the action related information flows from the manipulated object towards the controller.

![Manipulation Example](https://www.youtube.com/watch?v=teOeMzuwMpo)
><sub>*Example of Manipulation: Lifting a Tennis Ball. Available on [YouTube](https://www.youtube.com/watch?v=teOeMzuwMpo)*</sub>

- **Exploration:** (robot: active agent - object: passive agent)  
*Goal: Learn about object properties.*  
As in manipulation, exploration is when a robot interacts with an object, except the robot performs movements to learn about the object (action reveals perception).  
In exploration, touch is used to measure material properties like softness (stiff or compliant), surface texture (e.g. smooth vs rough), shape, temperature or even friction coefficient.  
In the video below, a robotic finger moves over objects trying to identify their shape. The action related information flows from controller towards contact; the object has no infulence on action.

![Exploration Example](https://www.youtube.com/watch?v=UWMRR38hNWA)
><sub>*Example of Exploration: Shape detection. Available on [YouTube](https://www.youtube.com/watch?v=UWMRR38hNWA)*</sub>

- **Reaction:** (robot: active agent - human/robot: activ agent)  
*Goal: Enable safe interactions with another active agent.*  
Reaction refers to an interaction between a robot and a human (or another robot). The robot not only perceives and acts, but also adapts in real-time to the other agent by interpreting the constant feedback.  
Therefore there is a bi-directional information flow, known as closed-loop control. This enables safe operation of robots around humans.  
For example, in the field of *haptics*, humans can guide robots and feel force feedback (e.g. teleoperation).
More on *haptics* can be found on the dedicated page (link to haptics).
In the video below, there is an example of a human shaking hands with a robot.

![Reaction Example](https://www.youtube.com/watch?v=TFwVKe3W41Y)
><sub>*Example of Reaction: Handshake between Human and Robot. Available on [YouTube](https://www.youtube.com/watch?v=TFwVKe3W41Y)*</sub>

---

Some promising fields in which force perception is used are biomedical robotics (e.g. surgical robotics -> link to page), rehabilitation (e.g. exoskeletons -> link to page) or humanoids (link to humanoids page).

> On this page, the terms *sense of touch*, *tactile sensing* and *force perception* refer to the robot’s ability to perceive and interpret physical interaction.

---

## 3. Course Content

Now that we have seen **why** robots need a sense of touch, we can dive into **how** force perception is implemented.

It is possible to distinguish two types of force perception: intrinsic sensing and extrinsic sensing.
Intrinsic sensing is more inner — the sensors are located within the mechanical structure of the robot. They measure the overall forces applied on the system. Therefore, we speak of **force feedback**.

On the other hand, extrinsic sensing refers to sensors mounted near the contact area of the robot — more outer. These sensors deal with localized regions and provide **tactile feedback**.

- **Force feedback (intrinsic sensing)** measures the global forces and torques applied at one specific point or interface. This point is considered infinitesimally small, meaning it has a low spatial resolution. We can think of it as the overall push/pull and twist that the robot feels at that contact point.  

- **Tactile feedback (extrinsic sensing)** measures pressure distributions. It does not concern a single point anymore but a whole area (an array of sensing points). We can think of it as an electronic skin. Because it has multiple contact points, it can detect slippage, surface texture or the exact contact location on the array. Depending on the material used, tactile sensors can be designed as hard-skin or soft-skin types.


TODO -> CONTINUE HERE


The structure of the content will be as follows:

- Chapter 1
- Chapter 2
- Chapter 3
- Chapter 4
- Chapter 5

---

### Chapter 1 : Force/Torque Sensors

-> also presented in chapter about "sensors and sensing" (discuss to not be redundant)

#### 1.1 Traditionnal Force Sensors

-> example: ATI multi-axis F/T sensor

#### 1.2 Motor-Current based Force sensing

- For electric servo motors
- only for significant torques (not accurate in low ranges)

---

### Chapter 2 : Tactile Sensors

From simple tactile sensors (yes or no / logic high or low) to more sophisticated ones.

-> different working principles (resistive, piezoresistive, capacitive, optical, magnetic, piezoelectric, ultrasonic)
-> then mechanical nature of the sensor (rigid, flexible, compliant, stretchable)

#### 2.1 Resistive Sensors

detect force by change in resistance of material (tactile sensing 5.2.1)

#### 2.2 Capacitive Sensors

detect changes in capacitance due to deformation of dielectric (tactile sensing 5.2.2)

#### 2.3 Piezoelectric Sensors

generate charge proportional to applied forces (tactile sensing 5.2.)

#### 2.4 Optical Sensors

tactile sensing 5.2.3

#### 2.5 Magnetism-based Sensors

tactile sensing 5.2.4

#### 2.6 Electrorheological / Magnetorheological

tactile sensing 5.2.7–5.2.8).  

---

### Chapter 3: Advanced Tactile Sensors

#### 3.1 Flexible Tactile Sensors

-> stretchable (Review of Printable Flexible and Stretchable Tactile Sensors, Kumar et al.)
-> have a look at meta's fingertip tactile sensor

#### 3.2 Stretchable Tactile Sensors

#### 3.3 Vision-Based Tactile Sensors

-> make link to vision course
-> video from TEDX MIT, guy explains how his vision based tactile sensor works

---

### Chapter 4 : Information Processing

(??? is this worth a chapter or should it just be beneath the concerned parts)

add challenges of electronics: wiring, data transfer, power consumption  
-> examples of how it is done today

---

### Chapter 5 : Sensor Location

#### 0.1 Joint

-> encoder, potentiometer, motor-current, etc.

#### 0.2 Links

#### 0.2 Tip

-> tactile arrays, 6D F/T sensors, etc.

#### 0.3 Challenges  

add the challenges that come with the sensor location (integrated into skin surfaces, adequate friction to handle objects securely, robust enough to survive repeated impacts, etc.)  
-> these are task related challenges (chapter 4 tactile sensing)

---

## Additional Resources

### Credits
<!-- List all the sources that you used to create the page   -->
- [Springer Handbook of Robotics](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20) (Chapter 19. Force and Tactile Sensors)

### Additional Resources
<!-- List all the sources that could be relevant to a reader who would like to know more, including  the page on haptics under Human-Robot Interaction chapter -->

---

## Questions:

- should I tacle all traditionnal tactile sensing technologies? (magnetic, ultrasonic, electrorheological)


<!--  

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