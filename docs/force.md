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
- (read course about sensors and sensing)

---

## 2. General Motivation

Let's start this course with a question:

<p><strong>Why does force perception matter in robotics?</strong> (multiple answers possible)</p>
<form id="intro">
  <input type="checkbox" name="intro" value="option1">
  Object handling<br>

  <input type="checkbox" name="intro" value="option2">
  Detection of material and surface properties (softness, roughness, etc.) <br>

  <input type="checkbox" name="intro" value="option3">
  Impact and contact recognition <br>

  <button type="button" onclick="checkMultipleAnswers(
    'intro',
    ['option1','option2','option3'],
    'Correct!',
    'Incorrect. Try again.'
  )">
    Check Answer
  </button>

  <p id="intro-feedback"></p>
</form>

As you may have guessed, all the above answers are correct. Force and tactile perception is essential for robots in three main domains: **manipulation, exploration and response**. The figure below illustrates these three main functions.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/force_perception/uses_of_tactile_sensing.png' }}" 
       width="500px" 
       alt="Diagram showing manipulation, exploration, and response as the main uses of tactile sensing in robotics">
  <figcaption style="margin-top: 8px; font-style: italic;">
    Uses of tactile sensing in robotics (<a href="https://link.springer.com/rwe/10.1007/978-3-540-30301-5_20">Springer Handbook of Robotics</a>, Chapter 19) -> ask permission
  </figcaption>
</figure>

Add robotics applications fields of tactile sensing (biomedical, HRI, prosthetics, etc.)
-> have a look at chapter 1.3 of SPRINGER tactile sensing.

---

## 3. Course Content

- Chapter 0 is about where sensors are located and why
- Chapter 1 and 2 give some sensor examples, emphasis on tactile sensors
- Chapter 3 is about the interpretation of the obtained information

### Chapter 0 : Sensor Location

#### 0.1 Joint

-> encoder, potentiometer, motor-current, etc.

#### 0.2 Links

#### 0.2 Tip

-> tactile arrays, 6D F/T sensors, etc.

#### 0.3 Challenges  

add the challenges that come with the sensor location (integrated into skin surfaces, adequate friction to handle objects securely, robust enough to survive repeated impacts, etc.)  
-> these are task related challenges (chapter 4 tactile sensing)

---

### Chapter 1 : Force/Torque Sensors

#### 1.1 Traditionnal Force Sensors

-> example: ATI multi-axis F/T sensor

#### 1.2 Motor-Current based Force sensing

- For electric servo motors
- only for significant torques (not accurate in low ranges)

---

### Chapter 2 : Tactile Sensors

From simple tactile sensors (yes or no / logic high or low) to more sophisticated ones.

#### 2.1 Traditionnal Tactile Sensors

-> resistive, capacitive, piezoelectrical, etc. 

- **Resistive sensors**: detect force by change in resistance of material (tactile sensing 5.2.1)
- **Capacitive sensors**: detect changes in capacitance due to deformation of dielectric (tactile sensing 5.2.2)  
- **Piezoelectric sensors**: generate charge proportional to applied forces (tactile sensing 5.2.6) 

- **Optical sensors**: tactile sensing 5.2.3
- **Magnetism-based sensors**: tactile sensing 5.2.4
- **electrorheological/magnetorheological**: tactile sensing 5.2.7–5.2.8).  

#### 2.2 Advanced Tactile Sensors

-> stretchable (Review of Printable Flexible and Stretchable Tactile Sensors, Kumar et al.)
-> have a look at meta's fingertip tactile sensor

#### 2.3 Vision-Based Tactile Sensors

-> make link to vision course
-> video from TEDX MIT, guy explains how his vision based tactile sensor works

---

### Chapter 3 : Information Processing

add challenges of electronics: wiring, data transfer, power consumption  
-> examples of how it is done today

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