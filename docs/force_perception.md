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

⚠️ Adapt in the end ⚠️

- closed-loop control page (controller definition)
- (read course about sensors and sensing)
- basics in electronics (resistance, capacitance, etc.)

---

## 2. General Motivation

Robots are expected to interact closely and safely with humans aswell as with their environement. Besides interaction modalities like vision (refer to vision page), there is one modality that humans use all the time, but is often neglected in robotics: **touch** (or physical interaction).  

**Physical interaction** happens when a robot gets in touch with a human or an object of the real world. There is either a force generated from the robot towards the object or vice-versa. Physical interaction is classified into three catergories according to the executed task: **manipulation, exploration** and **reaction**. These categories are explained and illustrated below.  

- **Manipulation:** (robot: active agent - object: passive agent)  
*Goal: Use perception to perform an action on an object successfully.*  
During manipulation, a robot senses an object and adapts its actions accordingly. An example of manipulation is the grasping of objects, essential in industrial applications. During grasping, touch could be used to maximize the contact surface between the robotic hand and the object or to prevent slippage of the object. (->link to grasping page)  
Slippage can arise in scenarios like dealing with soft objects (e.g. fruit), when objects change weight mid-grasp (e.g. a water bottle being filled during manipulation), or simply while moving objects from one place to another. In the video below, an example is shown of a robotic hand manipulating a filled champagne glass.  
From the point of view of signals, the action related information flows from the manipulated object towards the controller.

<video width="640" controls>
  <source src="{{ '/assets/videos/force_perception/manipulation_ex.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
<sub><i>
Example of Manipulation: Moving a Champagne Glass
(<a href="https://ieeexplore.ieee.org/document/10146043">F. Khadivar, A. Billard, IEEE T-RO 2023</a>).
</i></sub>

<!--
![Manipulation Example](https://www.youtube.com/watch?v=teOeMzuwMpo)
><sub>*Example of Manipulation: Lifting a Tennis Ball. Available on [YouTube](https://www.youtube.com/watch?v=teOeMzuwMpo)*</sub>
-->

- **Exploration:** (robot: active agent - object: passive agent)  
*Goal: Learn about object properties.*  
As in manipulation, exploration is when a robot interacts with an object, except the robot performs movements to learn about the object (action reveals perception).  
In exploration, touch is used to measure material properties like softness (stiff or compliant), surface texture (e.g. smooth vs rough), shape, temperature or even friction coefficient. In the video below, a humanoid robot moves his fingers over objects trying to identify their shape.  
The action related information flows from controller towards contact; the object has no infulence on action.

<video width="640" controls>
  <source src="{{ '/assets/videos/force_perception/exploration_ex.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
<sub><i>
Example of Exploration: Shape detection
(<a href="https://ieeexplore.ieee.org/document/6907804">N. Sommer, M. Li, A. Billard, ICRA 2014</a>).
</i></sub>

<!--
![Exploration Example](https://www.youtube.com/watch?v=UWMRR38hNWA)
><sub>*Example of Exploration: Shape detection. Available on [YouTube](https://www.youtube.com/watch?v=UWMRR38hNWA)*</sub>
-->

- **Reaction:** (robot: active agent - human/robot: activ agent)  
*Goal: Enable safe interactions with another active agent.*  
Reaction refers to an interaction between a robot and a human (or another robot). The robot not only perceives and acts, but also adapts in real-time to the other agent by interpreting the constant feedback.  
Therefore there is a bi-directional information flow, known as closed-loop control. This enables safe operation of robots around humans.  
For example, in the field of *haptics*, humans can guide robots and feel force feedback (e.g. teleoperation).
More on *haptics* can be found on the dedicated page (link to haptics).  
In the video below, a robotic hand is shown trying to massage a fake human arm while being pushed away by a person.

<video width="640" controls>
  <source src="{{ '/assets/videos/force_perception/reaction_ex.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>
<sub><i>
Example of Reaction: Arm Massage by Robot
(<a href="https://doi.org/10.1007/s10514-020-09934-9">M. Khoramshahi, A. Billard, ICRA 2020</a>).
</i></sub>

<!--
![Reaction Example](https://www.youtube.com/watch?v=TFwVKe3W41Y)
><sub>*Example of Reaction: Handshake between Human and Robot. Available on [YouTube](https://www.youtube.com/watch?v=TFwVKe3W41Y)*</sub>
-->

Some promising fields in which force perception is used are biomedical robotics (e.g. [Surgical Robots](surgical)), rehabilitation (e.g. exoskeletons -> link to page, not created yet) or humanoids (link to humanoids page, not created yet).

> On this page, the terms *sense of touch*, *tactile sensing* and *force perception* refer to the robot’s ability to perceive and interpret physical interaction.

<details markdown="1">
<summary>Quiz (tap to expand)</summary>

  <p><strong>Why is touch used in robotics?</strong></p>
  <form id="quiz-touch">
    <input type="checkbox" name="quiz-touch" value="option1">
    Because it allows robots to adapt during physical interactions. <br>

    <input type="checkbox" name="quiz-touch" value="option2">
    Because it replaces the need for vision in robotic tasks. <br>

    <input type="checkbox" name="quiz-touch" value="option3">
    Because it helps robots generate speech responses. <br>

    <input type="checkbox" name="quiz-touch" value="option4">
    Because it enables robots to perceive forces exchanged with their environment. <br>

    <button type="button" onclick="checkMultipleAnswers(
      'quiz-touch',
      ['option1', 'option4'],
      'Correct!',
      'Incorrect!'
    )">
      Check Answer
    </button>

    <p id="quiz-touch-feedback"></p>
  </form>
</details>

---

## 3. Course Content

Now that we have seen **why** robots need a sense of touch, we can dive into **how** force perception is implemented.

It is possible to distinguish two types of force perception based on where the sensors are located: **intrinsic** and **extrinsic**. In **intrinsic sensing**, the sensors are placed within the mechanical structure of the robot (more inward) and we speak of **force feedback**. On the other hand, **extrinsic sensing** refers to sensors mounted at the robot’s contact area (more outward) and we refer to this as **tactile feedback**.

- **Force feedback (intrinsic)** measures the global forces and torques applied to the system at a specific point, considered infinitesimally small. It can be thought of as the overall push, pull and twist the robot feels at that contact point (usually at a joint).

- **Tactile feedback (extrinsic)** measures pressure or stress distributions over a surface rather than at a single point. It relies on an array of sensing elements, forming what can be thought of as an electronic skin. Because it includes multiple contact points, it can detect slippage, surface texture and the exact contact location on the array. Depending on the used materials, tactile sensors can be flexible, compliant, stiff and rigid.

<details markdown="1">
<summary>Quiz (tap de expand)</summary>

  <p><strong>What is a force?</strong></p>
  <form id="quiz1">
    <input type="checkbox" name="quiz1" value="option21">
    A 6D vector (x, y, z + rotations) <br>

    <input type="checkbox" name="quiz1" value="option2">
    A 3D vector (x, y, z coordinates) <br>

    <input type="checkbox" name="quiz1" value="option3">
    A quantity measured in Newton [N] or Pascal [Pa] <br>

    <input type="checkbox" name="quiz1" value="option4">
    A quantity measured in Newton/meter [N/m] <br>

    <button type="button" onclick="checkMultipleAnswers(
      'quiz1',
      ['option2', 'option3'],
      'Correct!',
      'Incorrect!'
    )">
      Check Answer
    </button>

    <p id="quiz1-feedback"></p>
  </form>
</details>

On this page, we will move gradually from **force feedback**, which describes interactions occurring at a single point, to **tactile feedback**, where sensing extends across a surface.  
Although the examples shown in the introduction mainly focused on hands and fingertips, tactile sensing can be applied to the entire body of a robot. However, challenges such as wiring complexity and limited mechanical flexibility must also be addressed.

<!-- This layout mirrors how robots evolve from simply feeling a global contact force to perceiving rich spatial details such as shape, texture and contact distribution. -->

<!-- To explore this, we will start with the classical principles of **force/torque sensing**, then move on to **tactile sensors** and their different working principles.  
Afterward, we will look at **advanced tactile technologies**, including flexible, stretchable, and vision-based sensors.  
Finally, we will address how tactile information is processed and how sensor location within the robot influences performance and robustness. -->

⚠️ Adapt in the end ⚠️

- **Chapter 1 — Force/Torque Sensors**  
  Introduction to classical F/T sensing methods.

- **Chapter 2 — Tactile Sensors**  
  Overview of the main tactile sensing principles (resistive, capacitive, piezoelectric, optical, magnetic, etc.) and their mechanical implementations (rigid, flexible, compliant, stretchable).

- **Chapter 3 — Advanced Tactile Sensors**  
  Presentation of flexible, stretchable, and vision-based tactile sensors.

- **Chapter 4 — Information Processing**  
  Discussion of how tactile data are acquired, including the challenges related to wiring, data rate, and power consumption.

- **Chapter 5 — Sensor Location and Integration (optional)**  
  Summary of where sensors are typically placed (in joints, links, or fingertips) and how placement affects measurement quality and task performance.

---

### Chapter 1 : Force/Torque Sensors

-> also presented in chapter about "sensors and sensing" (discuss to not be redundant)

<details markdown="1">
<summary>Quiz (tap de expand)</summary>

  <p><strong>Why do force sensors require calibration?</strong></p>
  <form id="quiz2">
    <input type="checkbox" name="quiz2" value="option1">
    Measurement depends on the mass, which varies depending on where you are on Earth <br>

    <input type="checkbox" name="quiz2" value="option2">
    Because calibration increases the sensor’s weight <br>

    <input type="checkbox" name="quiz2" value="option3">
    No sensors are perfectly identical <br>

    <input type="checkbox" name="quiz2" value="option4">
    To synchronize the sensor’s internal clock with the computer <br>

    <button type="button" onclick="checkMultipleAnswers(
      'quiz2',
      ['option3'],
      'Correct!',
      'Incorrect!'
    )">
      Check Answer
    </button>

    <p id="quiz2-feedback"></p>
  </form>
</details>

#### 1.1 Traditionnal Force Sensors

-> 3DOF and 6DOF
-> example: ATI multi-axis F/T sensor

#### 1.2 Motor-Current based Force sensing

- For electric servo motors
- only for significant torques (not accurate in low ranges)

---

### Chapter 2 : Tactile Sensors

<!--
-> From simple tactile sensors (yes or no / logic high or low) to more sophisticated ones.
-> different working principles
-->

#### 2.1 Resistive Sensors

There are two types of resistive tactile sensors: those that determine the contact location and those that determine the contact force or pressure.  
First, we will take a closer look at resistive sensors of the first type, how resistive technology can be used to determine where a contact happened on a surface.  
Then, we will move on to sensors of the second type and see how resistive technology is used to measure force.

- **Type 1: Determine contact location**  

*1/ Single-strip resistive sensor:*  

Resistive tactile sensors are usually made of two sheets coated with a resistive material, placed one on top of the other. The two layers are separated by microspheres so that they remain electrically isolated from each other. When an object touches the sensor, the pressure brings both layers into contact. This configuration can be seen in panel (a) of the figure below (with one layer shown in green and the second layer in grey).  

To determine the contact location, we need to extract both the x- and y-coordinates. This is done by energising the layers one at a time. A uniform voltage $V_x$ is applied along the first resistive layer (never both layers simultaneously), while the second layer is connected in a high-impedance (Hi-Z) configuration, able to read the voltage output. Because the Hi-Z connection draws almost no current, it does not disturb the voltage distribution on the active layer. This setup corresponds to panel (b).  

The contact between the sheets acts as the slider of a linear potentiometer (for more information about potentiometers refer to [Sensors and Sensing](new-sensors-for-robotics)). The resistance in the first layer depends on where along the strip the contact occurs. The voltage at the contact point is transferred through the second layer and thus provides the x-coordinate. Similarly, the x-coordinate is obtained by applying a uniform voltage $V_y$ to the second layer and leaving the first layer in Hi-Z, as shown in panel (c).  
The measured output voltages are the result of a voltage divider. The simplified expressions are:  

$$
V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x
$$

$$
V_{y,\text{out}} = \frac{R_{y2}}{R_{y1} + R_{y2}} \, V_y
$$

where $R_{x1}$ and $R_{x2}$ are the resistances from the contact point to the left and right boundaries of the x-layer, and $R_{y1}$ and $R_{y2}$ are the equivalent resistances on the y-layer (panel (d)). Panels (e) and (f) show the equivalent electrical circuits when the x- and y-layers are energised.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/single-strip-resistive-sensor.png' }}"
       width="640px"
       alt="Analog resistive strip sensor schematic">
  <figcaption>
    <sub><i>
      Figure 1: Schematic of analog resistive touch sensing
      (<a href="https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20">Springer Handbook of Robotics</a>)
    </i></sub>
  </figcaption>
</figure>

In practice, the sensor switches rapidly between measuring the x- and y-coordinates. The layers are energised one after the other at a high frequency, making the switching imperceptible to a human user (response can be provided in 10ms or faster). But this approach has an important drawback: it cannot distinguish multiple simultaneous touch points, which is why multi-strip resistive sensors are used.

Exercise: Determine the x-coordinate of the contact location

A single-strip resistive sensor of total length $L = 100\ \text{mm}$ is energised with a voltage $V_x = 5\ \text{V}$. The measured output voltage is $ V_{x,\text{out}} = 2.3\ \text{V}$.  

Compute the x-coordinate of the touch point (distance from the left boundary).  
Hint: the resistance is proportional to length ($R_{x1} \propto x$).

<details markdown="1">
<summary>Solution</summary>

As mentioned, the resistance is proportional to length for a **uniform** resistive strip. Therefore we have:

- $R_{x1} \propto x$
- $R_{x2} \propto L - x$

We can replace these expressions in the formula seen above:

$$
V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x = \frac{L - x}{L} \, V_x
$$

Solve for x:

$$
x = L - L \frac{V_{x,\text{out}}}{V_x}
$$

Insert numerical values:

$$
x = 0.1 - 0.1 \cdot \frac{2.3}{5} = \boxed{0.054 \, \text{m}}
$$

**Answer:** the contact is located at **$x = 54\ \text{mm}$** from the left boundary.
</details>

*2/ Multi-strip resistive sensor:*  

As in the single-strip version, the multi-strip resistive sensor also consists of two resistive layers and the measuring principle remains the same. However, each layer is divided into multiple strips along its length, as can be seen in the figure below. In this configuration, multiple simultaneous contacts can be detected, as each strip provides its own independent measurement. Because the strips are narrow, the output voltage of a given strip depends on the contact position aswell as on the contact width.

The output voltage for a single strip is given by:

$$
V_{\text{out}} = \frac{l_x + \frac{w}{2}}{L - \frac{w}{2}} \, V_{\text{ref}}
$$

where  
- $l_x$ is the distance from the left boundary of the strip to the **centre** of the applied contact
- $w$ is the **width** of the contact area (for example, the width of a fingertip)
- $L$ is the **total** length of the strip
- $V_{\text{ref}}$ is the applied reference voltage

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/multi-strip-resistive-sensor.png' }}"
       width="640px"
       alt="Multi-strip analog resistive sensor schematic">
  <figcaption>
    <sub><i>
      Figure 2: Schematic of multi-strip analog resistive touch sensing
      (<a href="https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20">Springer Handbook of Robotics</a>)
    </i></sub>
  </figcaption>
</figure>

Now, instead of performing only one measurement per layer, we need to make $n$ separate measurements for all $n$ strips. If the layers are divided into strips in both directions, this increases the total number of measurements from $2$ to $2n$. As a result, scanning the entire sensor becomes more time-consuming.  

In addition, the wiring complexity increases. While the single-strip version requires only four connection wires, the multi-strip version needs $2+2n$ wires: one for $V_{\text{ref}}$, one for the ground and $n$ measurement wires for each of the two stripped layers. The wiring complexity issue will be addressed later.

Exercise: Determine the contact width

A single strip of length $L = 60\ \text{mm}$ is energised with $V_{\text{ref}} = 5\ \text{V}$. A fingertip presses at a position whose centre is located at $l_x = 25\ \text{mm}$ from the left border. The measured voltage is $V_{\text{out}} = 3.75\ \text{V}$
Compute the contact width $w$.

<details markdown="1">
<summary>Solution</summary>

Using the given formula:

$$
V_{\text{out}} = \frac{l_x+\frac{w}{2}}{L - \frac{w}{2}}\,V_{\text{ref}}
$$

Solve for $w$:

$$
w = 2 \cdot \frac{\frac{V_{\text{out}}}{V_{\text{ref}}} \cdot L - l_x}{1 + \frac{V_{\text{out}}}{V_{\text{ref}}}}
$$

Insert numerical values:

$$
w = 2 \cdot \frac{\frac{3.75}{5} \cdot 0.06 - 0.025}{1 + \frac{3.75}{5}} = \boxed{0.0229 \, \text{m}}
$$

</details>

- **Type 2: Determine applied force or pressure**  

As seen in the [Sensors and Sensing](new-sensors-for-robotics) course, in piezoresistive materials the intrinsic resistance varies with applied pressure.


#### 2.2 Capacitive Sensors

detect changes in capacitance due to deformation of dielectric (tactile sensing 5.2.2)

#### 2.3 Piezoelectric Sensors

generate charge proportional to applied forces (tactile sensing 5.2.)

#### 2.4 Optical Sensors

tactile sensing 5.2.3

#### 2.5 Magnetism-based Sensors

tactile sensing 5.2.4

#### 2.6 Electrorheological / Magnetorheological

tactile sensing 5.2.7 – 5.2.8

---

### Chapter 3: Advanced Tactile Sensors

Now that we have seen different tactile sensing technologies, let’s take a closer look at some more advanced tactile sensors.

When used in robotics, tactile sensors often need to cover broad areas. This can be challenging, as the surfaces where the sensors must be attached can have many different shapes (cylindrical, spherical, etc.). To cover these surfaces in the best possible way, tactile sensing grids need to be flexible (for cylindrical surfaces) or even stretchable (for spherical surfaces). The difference between flexible and stretchable lies in the fact that a flexible sensor can bend, whereas a stretchable sensor can both bend and expand (i.e. become longer). Below are some examples of flexible and stretchable tactile sensors.

Lastly, there also exist alternative ways to sense touch. One advanced tactile sensing technique makes use of vision. These vision-based tactile sensors are presented below.

#### 3.1 Flexible Tactile Sensors

Flexible tactile sensors are those that **bend** but do not undergo large tensile strain.  

-> stretchable (Review of Printable Flexible and Stretchable Tactile Sensors, Kumar et al.)
-> have a look at meta's fingertip tactile sensor

<!--  tactile sensing chapter 4.4.1 

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

#### 3.2 Stretchable Tactile Sensors

Stretchable tactile sensors must withstand **large strain** (tens to hundreds of percent). 

<!--  tactile sensing chapter 4.4.3 

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

#### 3.3 Vision-Based Tactile Sensors

-> make link to vision course
-> video from TEDX MIT, guy explains how his vision based tactile sensor works

---

### Chapter 4 : Issues and Difficulties

<!--  tactile sensing chapter 4 (4.5 Electronics/Electrical requirements) -->

#### Wealth of Computation

#### Wiring Complexity

While integrating tactile sensors on a robot body, the wires that transmit the tactile data can be a big issue. The number of needed wires increases with the number of tactile sensors used. Often, the available space for wires is limited.

<!-- 
tactile sensing chapter 4.4.5
emphasize the wealth of computation, issues with electronic and cabling to tackle so much input, compute, etc. give examples of how this is computed today.
-->

add challenges of electronics: wiring, data transfer, power consumption  
-> examples of how it is done today

---

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

---

### Chapter 5 : Sensor Location

#### 5.1 Joint

-> encoder, potentiometer, motor-current, etc.

#### 5.2 Links

#### 5.2 Tip

-> tactile arrays, 6D F/T sensors, etc.

#### 5.3 Challenges  

add the challenges that come with the sensor location (integrated into skin surfaces, adequate friction to handle objects securely, robust enough to survive repeated impacts, etc.)  
-> these are task related challenges (chapter 4 tactile sensing)

---

### Chapter 6 : Exercices

<!-- add exercices
look at Aude's propositions on slack
Take same robot examples as in the kinematics course (delta ...) so that the student can work on the basis he already has
1/ Knowing the different tactile sensors from above, where should the sensor be placed if we wish F/T control of robot to lift object up and down (joint, wrist)
2/ ... push object
3/ peg in a hole
4/ ...
-->

---

QUESTIONS:  

-  

## Additional Resources

### Credits
<!-- List all the sources that you used to create the page   -->
- [Springer Handbook of Robotics](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20) (Chapter 19. Force and Tactile Sensors)

### Videos

- [Adaptive Fingers Coordination for Robust Grasp and In-Hand Manipulation Under Disturbances and Unknown Dynamics](https://ieeexplore.ieee.org/document/10146043) (F. Khadivar, A. Billard, IEEE Transactions on Robotics, 2023)  
*Video example: Moving a Champagne Glass*

- [Bimanual compliant tactile exploration for grasping unknown objects](https://ieeexplore.ieee.org/document/6907804) (N. Sommer, M. Li, A. Billard, ICRA 2014)  
*Example of Exploration: Shape detection*

- [A dynamical system approach for detection and reaction to human guidance in physical human–robot interaction](https://doi.org/10.1007/s10514-020-09934-9) (M. Khoramshahi, A. Billard, ICRA 2020)  
*Example of Reaction: Arm Massage by Robot*

### Additional Resources
<!-- List all the sources that could be relevant to a reader who would like to know more, including  the page on haptics under Human-Robot Interaction chapter -->

- [Intrinsic Sense of Touch](https://www.science.org/stoken/author-tokens/ST-2065/full#)


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