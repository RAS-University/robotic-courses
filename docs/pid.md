---
title: Control Systems and PID
parent: Courses
layout: default
math: mathjax
author: Salim Boussofara (EPFL)
---
<script src="questions.js"></script>


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

  .pid-simulator-container {
      max-width: 900px;
      margin: 20px auto;
      padding: 20px;
      background-color: #f0f2f5;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .pid-controls {
      display: grid;
      grid-template-columns: 100px 1fr 50px;
      gap: 10px;
      align-items: center;
      margin-bottom: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  input[type="range"] {
      width: 100%;
  }
  .slider-value {
      text-align: center;
      font-weight: bold;
  }
  .pid-chart-container {
      position: relative;
      height: 500px;
      padding: 15px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
</style>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


- Table of Contents
{:toc}


<!--This guide explores the fundamental principles of control systems, with a particular focus on the widely adopted Proportional-Integral-Derivative (PID) controller. We will delve into how these controllers manage, command, and regulate system behavior, making precise and predictable operations possible across various applications in robotics and beyond. The aim is to provide a solid foundation for understanding how systems achieve desired outputs by actively controlling inputs based on feedback.-->

# Prerequisites
* Linear Algebra
* Classical mechanics
* Control theory:
    - First- and second-order system response
    - Transfer functions and feedback
* Basic Robotics
    - Joint-space vs. task-space
    - Kinematics and dynamics


<!--In many control problems, the system's objective is to follow a predefined trajectory or achieve a specific state as accurately as possible. This is crucial for precise operations where external forces are negligible or undesirable. The fundamental principles discussed here are essential for any higher-level autonomous system, forming the backbone for more complex behaviors.

A typical task might involve a robotic arm moving from point A to point B in an empty space, or a system maintaining a precise temperature. In such scenarios, the focus is entirely on the system's kinematic and dynamic accuracy in achieving its desired position, velocity, or other controlled variable.-->

# Motivation
![Overview](https://www.youtube.com/watch?v=UR0hOmjaHp0)
> <sub>*PID Control - A Brief Introduction. YouTube video. Available at: https://www.youtube.com/watch?v=UR0hOmjaHp0*</sub>  


In the world of robotics, simply giving a command is often not enough to get the desired result. An **open-loop** system, where we send a command without checking if it was executed correctly, is unreliable. Things like friction, changing loads, or unexpected disturbances can cause a system to fail without it ever knowing.

A **controller** addresses this fragility by closing the loop. Indeed, **feedback control** constantly measures the actual output, compares it to the desired output, and uses that error to adjust its command. This creates a loop that corrects itself until the system reaches its target.

Among all feedback controllers, the PID (Proportional-Integral-Derivative) is the most popular and effective. It's so widespread because it offers a complete solution by combining three distinct actions to correct errors. Each of these terms addresses a specific part of the problem, allowing the controller to react to the current error, eliminate any lingering errors, and even anticipate future errors. This makes the PID controller a powerful tool to ensure systems are not only accurate but also stable and responsive.

Over the course of this lesson, you will learn how each of these components works and how to combine them to obtain the desired behavior from any system.

# Chapter 1: Open-loop vs closed-loop control systems

<!--
![Control Systems + TP by Colin Jones (45 min)](https://www.youtube.com/watch?v=IClLushtEMA&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=32)  
><sub>*Jones, C. (2020) Control systems + TP. YouTube video, 8 September. Available at: https://www.youtube.com/watch?v=IClLushtEMA&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=32*</sub>  
>  
> *This video offers a clear introduction to control fundamentals, focusing on the difference between open-loop and closed-loop systems*  
-->

A **control system** is a system designed to manage, command, direct or regulate the behavior of other devices or systems. These systems are integral to modern technology, ranging from simple household appliances to complex industrial machinery. At its core, a control system ensures that a desired response is achieved by actively controlling an output based on an input.


Consider a fundamental representation of a control system:

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/control.png" alt="basic control diagram">
  <figcaption><center><em>Basic control system block diagram</em></center> </figcaption>
</figure>

 
This system can be further broken down into two main components: the **plant** and the **controller**.

- The **plant** refers to the physical system or process to be controlled such as a motor, furnace, or traffic signal.
- The **controller** is the device or algorithm that determines the appropriate input to the plant to ensure the output behaves as desired.

From a control perspective, we are less concerned with the internal dynamics of the plant and more focused on providing the optimal command that leads the plant to perform in the intended way. While this command can be applied manually, an automated approach is often more reliable and efficient. But here's the core challenge: how do we determine the exact command input that will lead to the desired plant’s behavior? There are two general approaches:

* **Open-loop (Feedforward) control:** 
  ![Open-Loop Control Systems](https://www.youtube.com/watch?v=FurC2unHeXI)
  > <sub>*MATLAB — Understanding Control Systems, Part 1: Open-Loop Control Systems. YouTube video. Available at: https://www.youtube.com/watch?v=FurC2unHeXI*</sub>  
  >
  > *This very short video introduces open-loop control through everyday examples and highlights why open-loop breaks under disturbances, setting up the need for feedback in the next section.*

  The control action is independent of the system's actual output. There is no measurement of the output that is fed back to influence or correct the input signal. The system relies solely on pre-determined inputs or a pre-programmed sequence of actions.

  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/open-loop.png" alt="open-loop control system">
    <figcaption><center><em>Open-loop control system</em></center> </figcaption>
  </figure>

  Here, an input is processed by a controller, which generates an actuating or controlling signal. This signal is then fed into the plant, which in turn produces the controlled output. A straightforward example of an open-loop control system is a traffic light system. In its most basic form, a sequence of input signals (e.g., pre-programmed timing for each light) is applied. The system then outputs the illumination of red, yellow, or green lights for specified durations, while the other lights remain off. This time-based operation, determined by traffic studies at an intersection, exemplifies a control system where inputs directly dictate outputs.

    * **Pros:**
        - Simple to design and implement.
        - Generally more economical due to fewer components (no sensors or feedback mechanisms).
        - Requires less maintenance.
    * **Cons:**
        - Controller design needs full knowledge of the model
        - Less accurate and reliable, as it cannot self-correct for disturbances or inaccuracies in the system model.
        - Highly sensitive to changes in system parameters or external disturbances.
        - Cannot be used for systems that require the output to continuously track a varying setpoint without manual intervention.
        - Unable to stabilize inherently unstable systems.
<br><br>

* **Closed-loop (feedback) control:** 
  ![Feedback Control Systems](https://www.youtube.com/watch?v=5NVjIIi9fkY)
  > <sub>*MATLAB — Understanding Control Systems, Part 2: Feedback Control Systems. YouTube video. Available at: https://www.youtube.com/watch?v=5NVjIIi9fkY*</sub>  
  >
  > *This video explains why feedback is needed, defines setpoint–measurement–error, and shows how a controller uses error to reject disturbances and handle model variations. It is, therefore, a natural follow-on to the open-loop video and a bridge to PID.*

  It features a feedback path where the actual output is measured and continuously compared to the desired input (setpoint). The resulting difference, termed the **error signal**, is then used by the controller to adjust the control action. This mechanism allows the system to automatically correct any deviations from the desired output, making them highly adaptive and precise. 

  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/closed-loop.png" alt="closed-loop control system">
    <figcaption><center><em>Closed-loop control system</em></center> </figcaption>
  </figure>

  In this setup, an **error detector** calculates the error signal by subtracting a feedback signal (derived from the measured output) from the input setpoint. This error signal, rather than the direct input, drives the controller. The controller, then, produces an actuating signal that drives the plant. This continuous adjustment ensures that the system's output automatically converges towards the desired response. An advanced traffic light system that uses sensors to detect real-time traffic density and adjust light timings accordingly is an example of a closed-loop system.

    * **Pros:**
      - Feedback allows precise control by correcting deviations.
      - Automatically adjusts to disturbances or changes in the plant.
      - Can stabilize systems that would otherwise be unstable.
      - Reduces waste by optimizing performance continuously.

    * **Cons:**
      - More complex to design and implement.
      - Requires additional components (sensors, feedback paths).
      - Higher initial cost and maintenance.
    
<details markdown="1">
<summary><strong>Conceptual Exercise</strong></summary>

**EXERCISE 1:**
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Control Schemes – Dropdown Table</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: center;
    }
    th {
      background-color: #eee;
    }
    select {
      width: 100%;
      padding: 6px;
    }
  </style>
</head>
<body>

<p>Select the correct option in each cell, then click <strong>Check Answers</strong>.</p>

<table id="control-table">
  <thead>
    <tr>
      <th>Feature</th>
      <th>Open-loop control</th>
      <th>Closed-loop control</th>
    </tr>
  </thead>
  <tbody> 
    <tr>
      <td><strong>Feedback Path</strong></td>
      <td>
        <select data-answer="Absent" class="answer">
          <option value="">-- Select --</option>
          <option>Absent</option>
          <option>Present</option>
        </select>
      </td>
      <td>
        <select data-answer="Present" class="answer">
          <option value="">-- Select --</option>
          <option>Absent</option>
          <option>Present</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><strong>Control Action</strong></td>
      <td>
        <select data-answer="Independent of output" class="answer">
          <option value="">-- Select --</option>
          <option>Dependent of output</option>
          <option>Independent on output</option>
        </select>
      </td>
      <td>
        <select data-answer="Dependent on output" class="answer">
          <option value="">-- Select --</option>
          <option>Dependent of output</option>
          <option>Independent on output</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><strong>Accuracy</strong></td>
      <td>
        <select data-answer="Less accurate; requires calibration" class="answer">
          <option value="">-- Select --</option>
          <option>Less accurate; requires calibration</option>
          <option>More accurate; self-correcting</option>
        </select>
      </td>
      <td>
        <select data-answer="More accurate; self-correcting" class="answer">
          <option value="">-- Select --</option>
          <option>Less accurate; requires calibration</option>
          <option>More accurate; self-correcting</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><strong>Reliability</strong></td>
      <td>
        <select data-answer="Less reliable; prone to external disturbances" class="answer">
          <option value="">-- Select --</option>
          <option>More reliable; robust against disturbances and parameter variations</option>
          <option>Less reliable; prone to external disturbances</option>
        </select>
      </td>
      <td>
        <select data-answer="More reliable; robust against disturbances and parameter variations" class="answer">
          <option value="">-- Select --</option>
          <option>More reliable; robust against disturbances and parameter variations</option>
          <option>Less reliable; prone to external disturbances</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><strong>Complexity</strong></td>
      <td>
        <select data-answer="Simple to design and build" class="answer">
          <option value="">-- Select --</option>
          <option>Simple to design and build</option>
          <option>More complex to design and build</option>
        </select>
      </td>
      <td>
        <select data-answer="More complex to design and build" class="answer">
          <option value="">-- Select --</option>
          <option>Simple to design and build</option>
          <option>More complex to design and build</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><strong>Cost</strong></td>
      <td>
        <select data-answer="Generally less expensive" class="answer">
          <option value="">-- Select --</option>
          <option>Generally less expensive</option>
          <option>Generally more expensive</option>
        </select>
      </td>
      <td>
        <select data-answer="Generally more expensive" class="answer">
          <option value="">-- Select --</option>
          <option>Generally less expensive</option>
          <option>Generally more expensive</option>
        </select>
      </td>
    </tr>
    <tr>
      <td><strong>Stability</strong></td>
      <td>
        <select data-answer="Can only control stable plants" class="answer">
          <option value="">-- Select --</option>
          <option>Can stabilize inherently unstable plants</option>
          <option>Can only control stable plants</option>
        </select>
      </td>
      <td>
        <select data-answer="Can stabilize inherently unstable plants" class="answer">
          <option value="">-- Select --</option>
          <option>Can stabilize inherently unstable plants</option>
          <option>Can only control stable plants</option>
        </select>
      </td>
    </tr>
  </tbody>
</table>

<button onclick="checkAnswers()">Check Answers</button>
<p id="feedback" style="font-weight: bold; margin-top: 10px;"></p>

<script>
function checkAnswers() {
  let correctCount = 0;
  const totalAnswers = document.querySelectorAll('#control-table .answer').length;
  const answers = document.querySelectorAll('#control-table .answer');
  
  answers.forEach(selectElement => {
    const selectedOption = selectElement.options[selectElement.selectedIndex].text;
    const correctAnswer = selectElement.getAttribute('data-answer');
    
    if (selectedOption === correctAnswer) {
      correctCount++;
      selectElement.style.borderColor = 'green';
    } else {
      selectElement.style.borderColor = 'red';
    }
  });

  const feedbackElement = document.getElementById('feedback');
  if (feedbackElement) {
    if (correctCount === totalAnswers) {
      feedbackElement.style.color = 'green';
      feedbackElement.textContent = `✅ You got ${correctCount}/${totalAnswers} correct. Excellent!`;
    } else {
      feedbackElement.style.color = 'red';
      feedbackElement.textContent = `❌ You got ${correctCount}/${totalAnswers} correct. Try again!`;
    }
  }
}
</script>

</body>
</html>

**EXERCISE 2:**
<p>Drag each control task to the correct category:</p>

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
    min-height: 175px;
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
  <div class="drop-zone" id="open-loop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Open-Loop Control</h3>
  </div>

  <div class="drop-zone" id="closed-loop-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Closed-Loop Control</h3>
  </div>
</div>

<div class="drag-container" id="drag-items-control-types">
  <div class="drag-item" id="item_fixed_traffic" draggable="true" ondragstart="drag(event)">Traffic light (fixed timer)</div>
  <div class="drag-item" id="item_human_driving" draggable="true" ondragstart="drag(event)">Human driving a car</div>
  <div class="drag-item" id="irrigation" draggable="true" ondragstart="drag(event)">Timed garden irrigation system</div>
  <div class="drag-item" id="item_thermostat" draggable="true" ondragstart="drag(event)">Thermostat controlling room temperature</div>
  <div class="drag-item" id="item_cruise_control" draggable="true" ondragstart="drag(event)">Automobile cruise control</div>
  <div class="drag-item" id="item_robot_assembly" draggable="true" ondragstart="drag(event)">Robot arm performing precise assembly</div>
  <div class="drag-item" id="item_toaster" draggable="true" ondragstart="drag(event)">Toaster</div>
  <div class="drag-item" id="autopilot" draggable="true" ondragstart="drag(event)">Airplane autopilot maintaining altitude</div>
  <div class="drag-item" id="item_washing_machine" draggable="true" ondragstart="drag(event)">Basic washing machine (pre-programmed cycle)</div>

</div>

<script>
const correctMappingControlTypes = {
  "open-loop-zone": ["item_fixed_traffic", "item_washing_machine", "item_toaster", "irrigation"],
  "closed-loop-zone": ["item_human_driving", "item_thermostat", "item_cruise_control", "item_robot_assembly", "autopilot"]
};
</script>

<button class="check-button" onclick="checkDragDropAnswer(correctMappingControlTypes, 'feedback-control-types')">Check Answer</button>
<div class="feedback" id="feedback-control-types"></div>

<details markdown ="1">
  <summary><strong>Detailed answer</strong></summary>

  * **Open-Loop Control:**
    - **Traffic light (fixed timer):** Operates on a pre-set schedule without sensing actual traffic flow.
    - **Basic washing machine (pre-programmed cycle):** Follows a fixed sequence of operations (wash, rinse, spin) regardless of how clean the clothes are.
    - **Toaster:** Operates for a set time or until a bimetallic strip heats up, without directly measuring the toast's browning level.
    - **Timed garden irrigation system**: Waters for a fixed period without checking soil moisture levels.

  * **Closed-Loop Control:**
    - **Human driving a car:** The driver continuously observes the road, speed, and other vehicles, making adjustments (feedback) to maintain the desired path and speed.
    - **Thermostat controlling room temperature:** Measures the actual room temperature and compares it to the desired setting, turning the heating/cooling on or off as needed.
    - **Automobile cruise control:** Measures the vehicle's speed and adjusts the engine throttle to maintain a constant speed despite changes in road incline or wind resistance.
    - **Robot arm performing precise assembly:** Uses sensors (e.g., encoders, vision) to measure its current position and adjust its joint commands to achieve high accuracy for the assembly task.
    - **Airplane autopilot maintaining altitude**: Uses sensors to monitor altitude and control flaps/thrust to stay at target level.


  → The key difference lies in whether the system uses feedback from the output to adjust its control action.

</details>

</details>

## Requirements of feedback control

Feedback control is essential to achieve high-performance and reliable system operation. Several key requirements underscore its importance:

* **Stability:** A stable control system is one that, after being disturbed, either returns to its original equilibrium or reaches a new, desired equilibrium without exhibiting unbounded oscillations or runaway behavior. Without appropriate feedback, systems can become unstable, leading to erratic or potentially damaging operation. In more precise terms, internal stability is achieved if, for all initial conditions and all bounded signals injected at any place in the system, all states remain also bounded.
  <details markdown="1">
  <summary><strong>Stability: basic reminder</strong></summary>
    If you have opened this tab, it may mean that you are not very familiar with basic control theory. In this case, these videos can help you grasp the most important concepts: 
    
    * [Control systems review: LTI systems](https://www.youtube.com/watch?v=tK6HpTX61BI&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=1)
    * [Control systems review: Impulse response](https://www.youtube.com/watch?v=S8XJjHf6xeg&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=2)
    * [Control systems review: Transfer functions](https://www.youtube.com/watch?v=-em43MIcRvs&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=3)
    * [Control systems review: Closed-loop transfer functions](https://www.youtube.com/watch?v=b7QT6S19Xho&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=4)

    A stable control system is one that, after being disturbed, either returns to its original equilibrium or reaches a new, desired equilibrium without exhibiting unbounded oscillations or runaway behavior. Without appropriate feedback, systems can become unstable, leading to erratic or potentially damaging operation.
    This is absolutely critical in robotics: an unstable system can make a robot arm vibrate violently, drift indefinitely, or even cause hardware damage. Stability ensures that the control commands you send lead to safe and reliable motions over time.
    Even without diving deep into control theory, it’s useful to understand that stability can be **analyzed using the system’s transfer function** which describes how outputs respond to inputs in the frequency domain.

    Let's take the case of a simple closed-loop system which is what we will focus on for the rest of the course:
    <figure>
      <img src="{{ site.baseurl }}/assets/images/pid/disturbances_closed-loop_2.png" alt="realistic closed-loop control system ">
      <figcaption><center><em>Realistic closed-loop control system</em></center> </figcaption>
    </figure>

    A simple closed-loop system can be represented using a transfer function like this:  $T(s) = \frac{G(s)}{1 + G(s)K(s)}$

    Stability is determined by the **poles** of this function which, **if no zero and pole are cancelled when forming $G(s)K(s)$**, correspond to the **zeros** of $1 + G(s)K(s)$. What matters is where they lie in the complex plane:

    - **Stable system**: All poles are in the **left-hand side** of the complex plane which is usually called **Left-Half Plane (LHP)**.
    - **Unstable system**: Any pole in the **right-half plane (RHP)** causes runaway behavior.
    - **Marginally stable**: Poles on the imaginary axis may cause constant oscillation.

    <figure>
      <img src="{{ site.baseurl }}/assets/images/pid/stability.png" alt="Feedback control of dynamic systems. G.F. Franklin, J. Powell, A.F. Emami-Naeini. 2015, Pearson">
      <figcaption><center><em>Stability in respect to the placement of the poles</em><br><sub>Feedback control of dynamic systems. G.F. Franklin, J. Powell, A.F. Emami-Naeini. 2015, Pearson</sub></center> </figcaption>
    </figure>


    <details markdown = "1">
    <summary><strong>Mathematical exercise</strong></summary>
    <p>Suppose that $G(s) = \dfrac{2s - 1}{s^2 + 2}$</p>
    <p>Is the closed-loop system internally stable with <strong>$K(s) = 1$</strong>?</p>
    <form id="q-stability-1">
      <input type="radio" name="q-stability-1" value="a">Yes<br>
      <input type="radio" name="q-stability-1" value="b">No<br><br>
      <button type="button" onclick="checkMCQ('q-stability-1', 'a', 
        'Correct! The closed-loop system is internally stable with this controller K(s).', 
        'Incorrect. Try again!')">
        Check Answer
      </button>
      <p id="q-stability-1-feedback"></p>
    </form>

    <p>Is the closed-loop system internally stable with <strong>$K(s) = \dfrac{4s + 2}{2s - 1}$</strong>?</p>
    <form id="q-stability-2">
      <input type="radio" name="q-stability-2" value="a">Yes<br>
      <input type="radio" name="q-stability-2" value="b">No<br><br>
      <button type="button" onclick="checkMCQ('q-stability-2', 'b', 
        'Correct! The closed-loop system is not internally stable with this controller K(s).', 
        'Incorrect. Try again!')">
        Check Answer
      </button>
      <p id="q-stability-2-feedback"></p>
    </form>

    <details markdown="1">
    <summary><strong>Solution</strong></summary>
    - **Exercise 1: $K(s) = 1$**
    <br>
    First, compute the closed-loop transfer function:
    $$
    T(s) = \frac{G(s)}{1 + G(s)K(s)} = \frac{\left(\frac{2s - 1}{s^2 + 2}\right)}{1 + \left(\frac{2s - 1}{s^2 + 2}\right) \times 1}
    $$
    Then, find the characteristic equation by setting the denominator to zero:
    $$
    1 + \frac{2s - 1}{s^2 + 2} = 0 \implies \frac{(s^2 + 2) + (2s - 1)}{s^2 + 2} = 0 \implies s^2 + 2s + 1 = 0
    $$
    The characteristic equation factors to $(s + 1)^2 = 0$. The closed-loop poles are at $s = -1$, which are in the **LHP**. Therefore, it is stable.

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Answer:** **Yes**
    <br>

    - **Exercise 2: $K(s) = \frac{4s + 2}{2s - 1}$**
    First, compute the closed-loop transfer function:
    $$
    T(s) = \frac{G(s)}{1 + G(s)K(s)} = \frac{\frac{2s - 1}{s^2 + 2}}{1 + \left(\frac{2s - 1}{s^2 + 2}\right)\left(\frac{4s + 2}{2s - 1}\right)}
    $$
    Then, observe the pole-zero cancellation $(2s-1)$. Therefore, we cannot directly take the zeros of $1 + G(s)K(s)$ because if simplfied there will still be a pole left in the nominator $(2s-1)$. In this case, the poles of the closed loop transfer function $T(s)$ are the union of the zeros of $1 + G(s)K(s)$ and the poles of $G(s)$ being the nominator of $T(s)$.

    $$
    1 + G(s)K(s) = 0 \implies 1 + \frac{4s + 2}{s^2 + 2} = 0 \implies \frac{(s^2 + 2) + (4s + 2)}{s^2 + 2} = 0$$
    $$ \implies s^2 + 4s + 4 = 0 \implies s=-2 \in \textbf{LHP}$$
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The denominator of $G(s)$ being ${2s-1}$, its pole is $s=\frac{1}{2} \in$ **RHP**. Therefore, it is not stable

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**Answer:** **No**
    </details> 
    </details>

    </details>

* **Tracking:** This refers to the system's ability to accurately follow a desired input or reference signal over time **in the absence of disturbance**. In robotics, excellent tracking means a manipulator's end-effector precisely adheres to a predefined trajectory, which is critical for tasks like welding or painting.
* **Regulation:** This is the system's capacity to maintain its output at a desired constant value despite the **presence of external disturbances**. For a robotic system, this could entail holding a specific joint position even when subjected to varying loads or unexpected forces.
* **Steady-state error:** In many control systems, there can be a persistent, non-zero difference between the desired output and the actual output once all transient behaviors have subsided. This difference is known as the **steady-state error** and ideally it should be driven to zero.
  <details markdown="1">
  <summary><strong>How to calculate steady-state error?</strong></summary>
  To better understand how a control system performs in steady state, an important theorem should be introduced first.

  {: #final-value-theorem}

  <div style="border: 2px solid #3498db; background-color: #ebf3fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
  <h4 style="margin-top: 0; color: #2980b9;">Final Value Theorem (FVT)</h4>
  <p>For a <strong>stable</strong> LTI system that produces <em>x(t)</em>,</p>
  <p style="text-align: center; font-size: 1.2em; margin: 15px 0;">
  \[\lim_{t\to\infty} x(t) \;=\; \lim_{s\to 0} s\,X(s).\]
  </p>
  </div>


  The system **must be stable**; otherwise the FVT gives the wrong answer.

    <details markdown="1">  
    <summary><em>Proof sketch of the Final value theorem</em></summary>  
      
    1) Start from the Laplace transform of the derivative and integrate by parts:

    $$ \mathcal{L}{ \frac{dx}{dt}}= \int_{0}^{\infty} \frac{dx}{dt} e^{-st} \, dt  = [x(t)e^{-st}]^{\infty} - \int_{0}^{\infty}x(t)(-s)e^{-st} \, dt = -x(0) + s \int_{0}^{\infty} x(t) e^{-st} \, dt = -x(0) + sX(s) $$

    2) Let $s \to 0^+$ and use the identity:

    $$
    \int_{0}^{\infty} \frac{dx}{dt} \, dt
    = \lim_{t \to \infty} x(t) - x(0)
    $$

    Then:

    $$
    \lim_{s \to 0} \int_{0}^{\infty} \frac{dx}{dt} \, e^{-st} \, dt
    = -x(0) + \lim_{s \to 0} sX(s)
    = \lim_{t \to \infty} x(t) - x(0)
    $$

    Rearranging gives:

    $$
    \lim_{t \to \infty} x(t) = \lim_{s \to 0} sX(s)
    $$

    which is the final value theorem.  
    <hr>
    </details>
    
  The steady-state error is the difference between the reference input and the actual output once the system has settled. In other words, it's the error that remains as time goes to infinity. To compute this, it's much more convenient to work in the Laplace domain using transfer functions rather than dealing with time-domain differential equations. This is where the Final value theorem becomes very useful. It allows us to compute the value of a signal at infinity using its Laplace transform. So to calculate the steady-state error, we simply use:
  $$
    e_{ss} = \lim_{t \to \infty} e(t) = \lim_{s \to 0} sE(s)
  $$

  </details>

* **Disturbance rejection:** This is the ability of the control system to minimize the adverse impact of unwanted external inputs (disturbances) on the system's output. For example, a robotic system should maintain its path despite unexpected air currents or minor collisions.
* **Sensitivity:** This measures how much the system's performance changes in response to variations in its own internal parameters (e.g., changes in motor efficiency due to temperature fluctuations, or wear and tear). Feedback generally reduces sensitivity to such internal variations, making the system more robust.
* **Fast transient response:** This refers to the system’s ability to react quickly and effectively to changes in the input or disturbances. A fast transient response means the system can reach its desired operating point in a short amount of time without excessive overshoot or oscillations. In practical terms, this is related to having a sufficiently large control bandwidth. For example, in robotics, a manipulator arm should rapidly adjust its position after receiving a new command so that it operates smoothly and efficiently in real-time tasks.
* **Robustness:** It is the system’s ability to maintain acceptable performance even when there are uncertainties in parameters or unmodeled dynamics. Real-world systems often face variations due to aging components, environmental changes, or simplifications in the mathematical model. A robust control system continues to function reliably despite these uncertainties.

<!--
**Common Signals in Control Systems:**
To analyze and characterize the behavior of control systems, various standard input signals are used:

| Time Domain $r(t)$       | Laplace Transform $R(s)$ | Description                                                      |
| :----------------------- | :------------------------- | :--------------------------------------------------------------- |
| Unit Impulse $\delta(t)$ | $1$                        | A theoretical signal of infinite amplitude and infinitesimal duration (integral of one), used to test a system's instantaneous response. |
| Unit Step $u(t)$         | $1/s$                      | A sudden, instantaneous change from one constant level to another, used to evaluate a system's response to a sudden command. |
| Unit Ramp $t$            | $1/s^2$                    | A signal that increases linearly with time, used to assess how well a system tracks a constantly changing input. |
| Unit Parabolic $t^2/2$   | $1/s^3$                    | A signal that increases quadratically with time, used for testing tracking capabilities under accelerating inputs. |
-->

# Chapter 2: Proportional, Integral and Derivative actions

But what exactly lies inside the **controller**, the *black box* of a feedback system?

  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/disturbances_closed-loop_2.png" alt="Realistic closed-loop system">
    <figcaption><center><em>Realistic closed-loop control system</em></center> </figcaption>
  </figure>

There are many types of controllers, each differing in complexity, application, and cost... But the PID controller is one of the most common control algorithm. Most feedback loops are controlled by this algorithm or minor variations of it. Some of its strengths are its simplicity and its ability to achieve a good performance in a wide variety of situations without the need to know in detail the plant to be controlled.

![Introduction (9 min)](https://www.youtube.com/watch?v=_VzHpLjKeZ8&start=0&end=544)  
> <sub>*Lum, C. (2023) Control Theory: Proportional Integral Derivative (PID) Control. YouTube video, May. Available at: [YouTube](https://www.youtube.com/watch?v=_VzHpLjKeZ8)*</sub>  
>
> *This 9-minute introduction provides an intuitive overview of feedback and PID control. Lum introduces the motivation behind PID, explains where it fits within control systems, and outlines its components.*

The standard form of the PID control law is:


$$
\mathbf{u}(t) \;=\; \mathbf{K_p} \, \mathbf{e}(t) \;+\; \mathbf{K_i} \int_0^t \mathbf{e}(\tau)\, d\tau \;+\; \mathbf{K_d} \, \frac{d\mathbf{e}(t)}{dt}
$$

where:

- Dimensions:
  - $m$ = number of **control inputs** (actuators), $n$ = number of **measured outputs**.
  - $\mathbf{u}(t) \in \mathbb{R}^{m}$ is the **control signal** sent to the plant/actuator.  
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)
  - $\mathbf{e}(t) \in \mathbb{R}^{n}$ is the **tracking error** between the desired **setpoint/reference output** $y_{sp}(t)$ (what we want to achieve) and the **measured system output** $y(t)$. It is defined as  $ e(t) = y_{sp}(t) - y(t)$.
  *Units: same as $y$, e.g. position in $\mathrm{m}$, temperature in $\mathrm{^\circ C}$, etc.*
  - $\displaystyle \int_{0}^{t} \mathbf{e}(\tau)\, d\tau \in \mathbb{R}^n$ is the element-wise time integral, and $\dfrac{d\mathbf{e}(t)}{dt}\in \mathbb{R}^n$ the element-wise time derivative.

- Gains:
  - $\mathbf{K_p} \in \mathbb{R}^{m\times n}$ is the **proportional gain**.    
  *Units: $\dfrac{u}{y}$ (e.g. $\mathrm{V/m}$ if input is voltage and output is position).*
  - $\mathbf{K_i} \in \mathbb{R}^{m\times n}$ is the **integral gain**.  
  - $\mathbf{K_d} \in \mathbb{R}^{m\times n}$ is the **derivative gain**.  


*NB: For a single-input single-output system, set $m=n=1$:*
- *$\mathbf{u}(t)\to u(t)\in \mathbb{R}$, $\mathbf{e}(t)\to e(t)\in \mathbb{R}$*
- *$\mathbf{K}_p,\mathbf{K}_i,\mathbf{K}_d$ reduce to scalars*


This equation might look intimidating at first, but its concept is quite straightforward. The total control signal $ u(t) $ is the **sum of three components**:
- A **P-term** : proportional to the current error
- An **I-term**: proportional to the cumulative (integrated) error over time,
- A **D-term**: proportional to the predicted future error (via its rate of change).

Each component of the PID acts independently, in the sense that each one computes its own output contribution toward achieving the desired response. The three components are, then, added together to give the controller’s output. Each one fulfills a certain function and improves a certain part of the response. And when the three components work together in the right proportion, they achieve great performance.

## Chapter 2.1: Proportional (P) control

![Proportional control (6 min)](https://www.youtube.com/watch?v=_VzHpLjKeZ8&start=544&end=903)  
> <sub>*Lum, C. (2023) Control Theory: Proportional Integral Derivative (PID) Control. YouTube video, May. Available at: https://www.youtube.com/watch?v=_VzHpLjKeZ8&t=544s*</sub>  
>
> *This segment (from 9:04 to 15:03) explains the Proportional (P) term in PID. It shows how this term affects the controller’s response in proportion to the current error, with visual examples of overshoot and steady-state error.*

In pure proportional control, the control action is directly proportional to the current error signal. 

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/proportional_controller.png" alt="https://www.youtube.com/watch?v=tFVAaUcOm4I">
  <figcaption>
    <center>
      <em>Proportional controller</em><br>
      <sub>DigiKey (2023). <em>What is a PID Controller?</em> YouTube video, 21 August. Available at: https://www.youtube.com/watch?v=tFVAaUcOm4I.</sub>
    </center>
  </figcaption>
</figure>


The control law is expressed as:
$$
\mathbf{u}(t) \;=\; \mathbf{K_p} \, \mathbf{e}(t) \;+\; \mathbf{u_b}
$$

where:

- **Dimensions:**
  - $m$ = number of **control inputs** (actuators), $n$ = number of **measured outputs**.
  - $\mathbf{u}(t) \in \mathbb{R}^{m}$ is the **control signal** sent to the plant/actuator.  
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)
  - $\mathbf{e}(t) \in \mathbb{R}^{n}$ is the **tracking error** between the desired **setpoint/reference output** $y_{sp}(t)$ (what we want to achieve) and the **measured system output** $y(t)$. It is defined as  $ e(t) = y_{sp}(t) - y(t)$.
  *Units: same as $y$, e.g. position in $\mathrm{m}$, temperature in $\mathrm{^\circ C}$, etc.*

- **Gains and bias:**
  - $\mathbf{K_p} \in \mathbb{R}^{m\times n}$ is the **proportional gain**.    
  *Units: $\dfrac{u}{y}$ (e.g. $\mathrm{V/m}$ if input is voltage and output is position).*
  - $\mathbf{u_b} \in \mathbb{R}^{m}$ is the **bias (reset) vector**. When the error is zero, the control variable takes this value. It can sometimes be manually adjusted to achieve zero steady-state error at a specific operating point.
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)


### Hands-on exercise: Exploring proportional control

Let's use an interactive simulation to understand the behavior and limitations of proportional control. It shows a typical second-order system with a pure delay of 1 step driven by a PID controller.
  <details markdown='1'>
  <summary><strong>How does a second-order system look like ?</strong></summary>
  {: #second-order}

  >![Second-Order Error Dynamics](https://www.youtube.com/watch?v=4zOGHJWuxlg&list=PLggLP4f-rq02N54sD6xwdDWlDScvb32Pp&index=5)
  > > <sub>*Northwestern Robotics (2018) Modern Robotics, Chapter 11.2.2.2: Second-Order Error Dynamics. YouTube video, 16 March. Available at: https://www.youtube.com/watch?v=4zOGHJWuxlg*</sub>  
  > >
  > > *The video models error dynamics as a linear second-order system and characterizes stable responses as overdamped, critically damped, or underdamped.*

  >A linear time-invariant second-order system is commonly written as
  >$$
  >\ddot{x}(t)+2\zeta\omega_n\,\dot{x}(t)+\omega_n^2\,x(t)=\omega_n^2\,u(t),
  >$$
  >with the corresponding transfer function
  >$$
  >G(s)=\frac{X(s)}{U(s)}=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}.
  >$$
  >
  >Here, $\omega_n>0$ is the natural frequency (rad/s) that fixes the time scale, and $\zeta\ge 0$ is the damping ratio that shapes the transient behavior.
  >
  >The characteristic roots are
  >$$
  >s_{1,2}=-\zeta\omega_n \pm \omega_n\sqrt{\zeta^2-1}.
  >$$
  >They shape the qualitative behavior of the step response:
  >- **Overdamped ($\zeta>1$):** the system has two distinct real negative poles. The response does not oscillate and returns to equilibrium monotonically, typically with a slower transient.
  >- **Critically damped ($\zeta=1$):** the poles coincide on the real axis. The system achieves the fastest return to equilibrium without overshoot or oscillation.
  >- **Underdamped ($0<\zeta<1$):** the poles form a complex-conjugate pair. The response oscillates with an exponentially decaying envelope at the damped frequency  
  >  $$
  >  \omega_d=\omega_n\sqrt{1-\zeta^2}.
  >  $$
  >- **Undamped ($\zeta=0$):** the poles are purely imaginary. The system oscillates indefinitely at $\omega_n$ with no decay.
  >
  >**Useful design relations and terminology (for $0<\zeta<1$)**
  >
  >For a step command that changes the setpoint from $y_{sp,0}$ to a final value $y_{sp,\infty}$ and produces a response $y(t)$ with $y_\infty=\lim_{t\to\infty}y(t)$:
  >
  >- **Percent overshoot ($M_p$):**  This is the maximum excursion of the response above the final value, expressed as a percentage of that final value:
  >  $$
  >  M_p \;=\; \frac{\max_{t\ge 0} y(t) - y_\infty}{\,y_\infty\,}\times 100\%
  >  \;\;\approx\;\;
  >  \exp\!\left(-\frac{\pi\zeta}{\sqrt{1-\zeta^2}}\right)\times 100\%.
  >  $$
  >
  >- **Settling time ($t_s$):** This is the earliest time after which the response remains within a prescribed tolerance band around the final value. With a $2\%$ band:
  >  $$
  >  t_s \;\approx\; \frac{4}{\zeta\,\omega_n},
  >  \qquad
  >  \text{meaning } |y(t)-y_\infty|\le 0.02\,|y_\infty| \ \text{for all } t\ge t_s.
  >  $$
  >
  >- **Peak time ($t_p$):**  This is the time at which the first (largest) peak occurs in the underdamped response:
  >  $$
  >  t_p \;\approx\; \frac{\pi}{\omega_d},
  >  \qquad
  >  \omega_d=\omega_n\sqrt{1-\zeta^2}.
  >  $$
  >- **Rise time $(t_r):$** This is the time required for $y(t)$ to move from **10%** to **90%** of the final value (other conventions such as 5–95% or 0–100% are sometimes used).
  >- **Deadtime (time delay)** $(L)$**:**  This represents the delay between a change in input or process conditions and the observable effect at the sensor or output. It is often modeled as a factor $e^{-Ls}$ in the transfer function and may arise from transport lags, sensor placement, or actuator latency.
  ><hr>
  </details>

In the plot, three signals are displayed to help visualize the closed-loop dynamics and the role of the controller.  
  * The blue dashed line represents the **desired value** (setpoint).
  * The purple line represents the **plant’s position/output** that we are getting from the sensors. The desired behavior is to have it lined up with the desired value. 
  * The yellow line represents the **control signal** $u(t)$ that drives the plant (e.g. actuator force). It is plotted on the right y-axis. A big, spiky yellow curve means high actuator demand.

Your task is to vary the value of the proportional gain $(K_p)$. You can, for example, try $K_p = 0.5$, $K_p = 1$ and $K_p = 3$, $K_p=10$ or $K_p=40$ . What do you observe in terms of:
  * **Response speed and oscillations**: What happens to the speed at which the output approaches the setpoint (**rise time**) as you increase Kp? What happens to the oscillations ?
  * **Steady-state error:** Does the output ever perfectly match the setpoint, or is there always a small, persistent difference (**offset**)? This persistent difference is called the steady-state error. Can you reduce it to zero by only adjusting $K_p$ ?

  <div id="pid-simulator-1" class="pid-simulator-container">
      <h2>P-controller simulation</h2>
      <div class="pid-controls">
          <label><strong>Kp</strong></label>
          <input type="range" class="kp-slider" min="0" max="40" step="0.1" value="0">
          <span class="kp-value slider-value"></span>
          <label><strong>Ki</strong></label>
          <input type="range" class="ki-slider" min="0" max="10" step="0.02" value="0">
          <span class="ki-value slider-value"></span>
          <label><strong>Kd</strong></label>
          <input type="range" class="kd-slider" min="0" max="40" step="0.1" value="0">
          <span class="kd-value slider-value"></span>
      </div>
      <div class="pid-chart-container">
          <canvas class="pid-chart"></canvas>
      </div>
      <div class="pid-buttons">
          <button class="reset-button">Reset</button>
      </div>
  </div>


<details markdown="1">
  <summary><strong>What you should observe ?</strong></summary>
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/P_controller_sim.png" >
    </figure>

  > The system output initially overshoots the setpoint, then enters a damped oscillatory phase before stabilizing at a steady-state value below the setpoint. The control signal exhibits similar transient behavior with high initial amplitude, followed by decaying oscillations, and finally settles at a constant value. Both curves show that the system reaches a stable state with steady-state error and nonzero actuator effort. If you further increase $K_p$, the system destabilizes.

</details>

### Conclusions from the Exercise

Based on your observations from the simulation, you should have identified the great influence of the proportional gain $K_p$ as well as the following properties and limitations of proportional control:

* **Faster response:** Increasing the proportional gain $K_p$ generally leads to a faster initial response, reducing the time it takes for the system output to approach the setpoint (i.e., faster rise time). If we have a small $K_p$, the system will take a long time to reach the setpoint, because we are giving "little power" to the actuator. If we increase it, we manage to decrease the response time.

  * Intuitive example: Small $K_p$: Imagine controlling the temperature of a room where your setpoint is 20°C, and the current temperature is 18°C. With a small $K_p$, you turn on the heater a little. The temperature slowly rises to 19°C, then to 19.5°C. It takes a long time to get close to 20°C.

* **Increased oscillations and potential instability:** While a higher $K_p$ speeds up the response, it also increases overshoot and the tendency for the system to oscillate. If $K_p$ is set too high, the system can become unstable, leading to continuous oscillations or an unbounded, runaway response.

  * Intuitive example: Medium $K_p$: You turn on the heater more strongly. When you see 18°C, you apply significant heat, and the next measurement might be 21°C. You've gone too far! You lower the heat, and the temperature drops to 19°C. You raise it again to 20.5°C. You've achieved a stable temperature, but you might have overshot the target and then undershot it a few times before settling.

  * Intuitive example: Large $K_p$: When you see 18°C, you turn the heater on full blast. The next measurement might be 32°C! This is a huge overshoot. So, you quickly turn off the heater, and perhaps even turn on the air conditioning. The temperature plummets to 14°C. You react again, blasting the heat, and it shoots up to 45°C. This cycle of extreme overshoots and undershoots means your system is oscillating wildly and has become unstable. This demonstrates that an overly large $K_p$ leads to instability and excessive oscillations.

* **Persistent steady-state error**: A significant limitation of proportional control is its persistent steady-state error. The output will settle at a value close to the setpoint, but almost never exactly on it. While increasing the proportional gain $K_p$ can reduce this error, it can't eliminate it completely without causing excessive oscillations or even instability. This happens because the proportional controller needs a non-zero error to produce a non-zero control output. 

  * Intuitive example: In a heating system, the controller needs a persistent difference between the desired and actual temperature to keep the heater on and provide the energy needed to maintain the temperature against heat loss to the environment. Without this error, the controller would turn off, and the temperature would drop. This is the fundamental trade-off of proportional control. There will always be a small persistent error required to generate the necessary control output.

* **Higher control effort required**: A higher $K_p$ also means a stronger control action is applied for the same amount of error. This can demand more from the actuators, potentially leading to wear or limitations if the actuator cannot respond fast or strongly enough. This effect is visible in the simulation through a larger controller output when $K_p$ increases.

This exercise demonstrates that while proportional control provides an immediate corrective action, it inherently struggles with eliminating steady-state errors and can lead to instability if tuned too aggressively. This highlights the need for additional control actions, such as integral and derivative terms, to achieve more robust and precise system performance.

  <details markdown="1">
  <summary><strong>Mathematical exercise</strong></summary>

  Consider the closed-loop system shown below with a plant $G(s)$ and a proportional controller, i.e. $u(t) = K_p e(t)$ which translated
  s to $ U(s) = K_p E(s)$ in the frequency domain.

  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/proportional_controller_karimi.png" alt="Cours karimi">
    <figcaption><center><em>Proportionnal controller</em></center> </figcaption>
  </figure>



  **(a)** Derive the transfer function between the error signal $E(s)$ and the reference signal $R(s)$ considering no disturbance $w(t)=0$.
  <form id="q-prop-control"> 
    <input type="radio" name="q-prop-control" value="a"> $\; \dfrac{E(s)}{R(s)} = \dfrac{K_p G(s)}{1 + K_p G(s)}$ <br>
    <input type="radio" name="q-prop-control" value="b"> $\; \dfrac{E(s)}{R(s)} = \dfrac{K_p}{1 + K_p G(s)}$ <br>
    <input type="radio" name="q-prop-control" value="c"> $\; \dfrac{E(s)}{R(s)} = \dfrac{1}{K_p G(s)}$ <br>
    <input type="radio" name="q-prop-control" value="d"> $\; \dfrac{E(s)}{R(s)} = \dfrac{1}{1 + K_p G(s)}$ <br><br>


    <button type="button" onclick="checkMCQ('q-prop-control', 'd', 
      'Correct! Well done, that is the right transfer function.', 
      'Incorrect. Try again!')">
      Check Answer
    </button>

    <p id="q-prop-control-feedback"></p>
  </form>

  **(b)** Assume the reference input is a unit step:
  $$
  r(t) = 1, \quad R(s) = \frac{1}{s}.
  $$
  Compute the steady-state error using the [final value theorem](#final-value-theorem).

  <form id="q-prop-control-b"> 
    <input type="radio" name="q-prop-control-b" value="a"> $0$ <br><br>
    <input type="radio" name="q-prop-control-b" value="b"> $\dfrac{k_P G(0)}{1 + K_p G(0)}$ <br><br>
    <input type="radio" name="q-prop-control-b" value="c"> $\dfrac{1}{1 + K_p G(0)}$ <br><br>
    <input type="radio" name="q-prop-control-b" value="d"> $\dfrac{K_p}{K_p G(0)}$ <br><br>

    <button type="button" onclick="checkMCQ('q-prop-control-b', 'c', 
      'Correct! The proportional controller did not eliminate the steady-state errors.', 
      'Incorrect. Try again!')">
      Check Answer
    </button>

    <p id="q-prop-control-b-feedback"></p>
  </form>

  <details markdown="1">
  <summary><strong>Solution</strong></summary>

  **(a) Derive the transfer function $E(s)/R(s)$:**

  From the closed-loop structure:

  $$
  E(s) = R(s) - Y(s), \qquad Y(s) = G(s)\,U(s) = G(s)\,k_P\,E(s).
  $$

  So:

  $$
  E(s) = R(s) - k_P G(s) E(s).
  $$

  Rearrange:

  $$
  E(s)\big(1 + k_P G(s)\big) = R(s).
  $$

  Thus:

  $$
  \frac{E(s)}{R(s)} = \frac{1}{1 + k_P G(s)}.
  $$


  **(b) Apply the final value theorem to compute the steady-state error for a unit step input:**

  The [final value theorem](#final-value-theorem) gives:

  $$
  e_{\text{ss}} = \lim_{t \to \infty} e(t) = \lim_{s \to 0} s E(s).
  $$

  Since

  $$
  E(s) = \frac{1}{1 + k_P G(s)} \cdot \frac{1}{s},
  $$

  we have

  $$
  e_{\text{ss}} = \lim_{s \to 0} s \cdot \frac{1}{1 + k_P G(s)} \cdot \frac{1}{s} = \frac{1}{1 + k_P G(0)}
  $$
  <hr>
  </details>

  </details>


<details markdown="1">
<summary><strong>Proportional control:  DC motor as a practical example</strong></summary>
{: #video-proportional-control}

![Proportional control — DC motor](https://www.youtube.com/watch?v=WRmJ_pm53PA&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=34)  
> <sub>*Jones, C. (2020) Proportional control. YouTube video, 9 September. Available at: https://www.youtube.com/watch?v=WRmJ_pm53PA*</sub>  
>
> *This short video introduces proportional control on a **DC motor**. It sets up the motor model, closes the loop with $K_p$, and shows how changing $K_p$ affects the response (speed, overshoot) and the steady-state offset.*
<br>
*NB: If you would like to see where the DC motor model comes from in more detail, see this [video](https://www.youtube.com/watch?v=EQe0fLSj7rg&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A) explaining its derivation from first principles.*
</details>


## Chapter 2.2: Integral (I) action
![Integral control (10 min)](https://www.youtube.com/watch?v=_VzHpLjKeZ8&start=903&end=1470)  
> <sub>*Lum, C. (2023) Control Theory: Proportional Integral Derivative (PID) Control. YouTube video, May. Available at: https://www.youtube.com/watch?v=_VzHpLjKeZ8&t=903s*</sub>  
>
> *From 15:03 to 24:49, Lum explores the Integral (I) term and how it eliminates steady-state error by accumulating past error. This section also discusses the risk of integral windup and how to manage it.*


The primary function of integral action is to **eliminate steady-state error**. While proportional control often leaves a residual offset, integral action ensures that the process output eventually converges precisely to the setpoint in steady state.

The integral term is proportional to the accumulation (integral) of the error over time. When combined with proportional action, it forms a Proportional-Integral (PI) controller as shown below:

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/PI_controller.png" alt="https://www.youtube.com/watch?v=tFVAaUcOm4I">
  <figcaption><center><em>Proportionnal integral (PI) controller</em><br><sub>DigiKey (2023). <em>What is a PID Controller?</em> YouTube video, 21 August. Available at: https://www.youtube.com/watch?v=tFVAaUcOm4I.</sub></center> </figcaption>
</figure>

The control law is expressed as:

$$ \mathbf{u}(t) = \mathbf{K_p} e(t) + \mathbf{K_i} \int_{0}^{t} \mathbf{e}(\tau)d\tau + \mathbf{u_b} $$


where:

- **Dimensions**
  - $m$ = number of **control inputs** (actuators), $n$ = number of **measured outputs**.
  - $\mathbf{u}(t) \in \mathbb{R}^{m}$ is the **control signal** sent to the plant/actuator.  
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)
  - $\mathbf{e}(t) \in \mathbb{R}^{n}$ is the **tracking error** between the desired **setpoint/reference output** $y_{sp}(t)$ (what we want to achieve) and the **measured system output** $y(t)$. It is defined as  $ e(t) = y_{sp}(t) - y(t)$.
  *Units: same as $y$, e.g. position in $\mathrm{m}$, temperature in $\mathrm{^\circ C}$, etc.*
  - $\displaystyle \int_{0}^{t} \mathbf{e}(\tau)\, d\tau \in \mathbb{R}^{n}$ is the **element-wise time integral**.

- **Gains and bias**
  - $\mathbf{K_p} \in \mathbb{R}^{m \times n}$ is the **proportional gain matrix**.  
  *Units: $\dfrac{u}{y}$ (e.g. $\mathrm{V/m}$ if input is voltage and output is position).*
  - $\mathbf{K_i} \in \mathbb{R}^{m \times n}$ is the **integral gain matrix**.  
  - $\mathbf{u_b} \in \mathbb{R}^{m}$ is the **bias (reset) vector**. When the error is zero, the control variable takes this value. It can sometimes be manually adjusted to achieve zero steady-state error at a specific operating point.
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)


<!--
Where:
* $T_i$: The **integral time** (or reset time), which is inversely proportional to the integral gain. A smaller $T_i$ indicates a stronger integral action, leading to faster elimination of steady-state error.
-->

<!--
**How Integral Action Eliminates Steady-State Error**:
If a steady-state error $e_0$ exists (i.e., $e_0 \neq 0$), the integral term $\int e(\tau)d\tau$ will continuously accumulate this error. This accumulation of  will cause the control signal $u(t)$ to continuously increase (if $e_0 > 0$) or decrease (if $e_0 < 0$). This adjustment continues until the error itself becomes zero. As long as there is any persistent error, the integral term will keep pushing the control signal, thereby ensuring that the system eventually settles precisely at the setpoint with no offset.

Conceptually, integral action can be viewed as an automatic mechanism that continuously adjusts the bias term $u_b$ of a proportional controller until the error is nulled.
-->

### Hands-on exercise: Exploring integral control
Let's use again the interactive simulation to understand the behavior and limitations of integral control. 

It shows a typical [second-order system](#second-order) with a pure delay of 1 step driven by a PID controller. In the plot, three signals are displayed to help visualize the closed-loop dynamics and the role of the controller.  
  * The blue dashed line represents the **desired value** (setpoint).
  * The purple line represents the **plant’s position/output** that we are getting from the sensors. The desired behavior is to have it lined up with the desired value. 
  * The yellow line represents the **control signal** $u(t)$ that drives the plant (e.g. actuator force). It is plotted on the right y-axis. A big, spiky yellow curve means high actuator demand.

Your task is to gradually increase the value of the integral gain $K_i$ while keeping the proportional gain $K_p$ you found in the previous hands-on-exercise (e.g. 3). You can, for example, try $K_i=0.1$, $K_i=0.5$, $K_i=1$ or $K_i=2$. What do you observe in terms of:
  * **Steady-state error:** What happens to the steady-state error as you increase Ki? Does the output eventually reach the setpoint precisely?
  * **Impact on oscillations**: How does a very large Ki affect the system's oscillations and overall stability? Can too much integral action lead to new problems?

  <div id="pid-simulator-2" class="pid-simulator-container">
      <h2>PI-controller simulation</h2>
      <div class="pid-controls">
          <label>Kp:</label>
          <input type="range" class="kp-slider" min="0" max="40" step="0.1" value="3">
          <span class="kp-value slider-value"></span>
          <label>Ki:</label>
          <input type="range" class="ki-slider" min="0" max="10" step="0.02" value="0">
          <span class="ki-value slider-value"></span>
          <label>Kd:</label>
          <input type="range" class="kd-slider" min="0" max="40" step="0.1" value="0">
          <span class="kd-value slider-value"></span>
      </div>
      <div class="pid-chart-container">
          <canvas class="pid-chart"></canvas>
      </div>
      <div class="pid-buttons">
          <button class="reset-button">Reset</button>
      </div>
  </div>

<details markdown="1">
  <summary><strong>What you should obtain ?</strong></summary>
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/PI_controller_sim.png">
    </figure>

  > The system output quickly rises, overshoots the setpoint, and goes through a damped oscillatory phase before settling exactly at the reference with no steady-state error. Compared to the P controller, the addition of the integral term eliminates the offset. The control signal starts with high amplitude, oscillates similarly to the output, and eventually stabilizes at a higher constant value than in the P case, reflecting the accumulated integral action needed to maintain zero error. 
</details>

### Conclusions from the Exercise
Based on your observations from the simulation, and consistent with the principles of integral action, you should have identified the following:

* **Elimination of steady-state error:** The primary and most significant role of integral action is to eliminate steady-state error. If a steady-state error $e_0$ exists (i.e., $e_0 \neq 0$), the integral term $\int e(\tau)d\tau$ will continuously accumulate this error. This accumulation will cause the control signal u(t) to continuously increase (if $e_0 > 0$) or decrease (if $e\_0 \< 0$). This adjustment continues until the error itself becomes zero. As long as there is any persistent error, the integral term will keep pushing the control signal, thereby ensuring that the system eventually settles precisely at the setpoint with no offset. Conceptually, integral action can be viewed as an automatic mechanism that reacts to the memory of past errors by continuously adjusting the bias term $u_b$ of a proportional controller until the error is nulled.
 <br>
  *Please note, however, that this is only valid in the case of a constant desired value. A more complex desired form would require adding more integrators.* 

* **Increased oscillations and overshoot:**  While integral action is essential for eliminating steady-state error, an overly aggressive integral action (a very large $K_i$) can introduce undesirable oscillations, increase overshoot, and potentially make the system respond sluggishly or even become unstable due to the accumulated past errors. Therefore, a careful balance is required when tuning $K_i$.


This exercise highlights that integral control effectively solves the steady-state error problem of proportional-only control but must be tuned carefully to avoid introducing excessive oscillations.

<details markdown="1">
<summary><strong> Going Deeper: Mathematical analysis of a PI controller</strong></summary>

![PI Control](https://www.youtube.com/watch?v=dxp6vNJrQcA&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=6)  
> <sub>*Jones, C. (2020) PI Control. YouTube video, 23 August. Available at: https://www.youtube.com/watch?v=dxp6vNJrQcA*</sub>  
>
> *This video provides a mathematical explanation of PI control, focusing on how the integral term eliminates steady-state error. It derives the closed-loop transfer function in the Laplace domain and shows, step by step, why a properly tuned PI controller drives the output exactly to the reference under step inputs. This complements the intuitive discussion given above with a more formal, equation-based perspective. You can skip the part on the final value theorem as it was presented before.*  

In this section, the calculations made in the video above are reproduced with the goal to derive the steady-state behavior of a simple system under PI control, showing mathematically why the integral term can eliminate steady-state error and when it might not.



We consider a simple DC motor as the plant of the system. Its dynamics can be simplified to a **first-order differential equation** relating the angular velocity of the shaft $\omega(t)$ to the input voltage $u(t)$ applied:

$$
\dot{\omega}(t) + \alpha \, \omega(t) = \beta \, u(t).
$$

Here:  
- $\omega(t)$ is the **angular velocity** of the motor shaft (rad/s).  
- $u(t)$ is the **control input** (typically the applied voltage).  
- $\alpha > 0$ is a **damping constant** that models friction and electrical resistance.  
- $\beta > 0$ is a **gain constant** that converts input voltage into acceleration of the shaft.  

This compact equation simply states that the shaft acceleration depends on the input drive but is opposed by natural damping.  

Moving to the Laplace domain (with zero initial conditions), the equation becomes:

$$
s \, \Omega(s) + \alpha \, \Omega(s) = \beta \, U(s),
$$

*NB: To understand in more details how this expression was derived, please refer to [this video](#video-proportional-control)*


The PI controller has the form:

$$
u(t) = K_p e(t) + K_i \int_0^t e(\tau)\, d\tau = K_p \left[e(t) + \frac{1}{T_i} \int_0^t e(\tau) \, d\tau \right]
$$
$$
U(s) = K_p \left[ E(s) + \frac{1}{T_i s} E(s) \right] = K_p \left( 1 + \frac{1}{T_i s} \right) E(s)
$$

with $e(t) = \omega_c(t) - \omega(t) $ and $ \Omega_c(s) $ the reference and $T_i$ begin identified by $K_i=\frac{K_d}{T_i}$.

**Step 1: Closed-loop equation in Laplace domain**

Substituting $U(s)$ into the plant equation:

$$
(s + \alpha) \, \Omega(s) = \beta K_p \left( 1 + \frac{1}{T_i s} \right) \big[ \Omega_c(s) - \Omega(s) \big]
$$

Multiply both sides by $T_i s$:

$$
(T_i s^2 + \alpha T_i s) \, \Omega(s) = \beta K_p (T_i s + 1) \, \Omega_c(s) - \beta K_p (T_i s + 1) \, \Omega(s)
$$

**Step 2: Gathering terms**

$$
\big[ T_i s^2 + (\alpha T_i + \beta K_p T_i) s + \beta K_p \big] \Omega(s) = \beta K_p (T_i s + 1) \, \Omega_c(s)
$$

The closed-loop transfer function from $\Omega_c$ to $\Omega$ is:

$$
\frac{\Omega(s)}{\Omega_c(s)} =
\frac{\beta K_p (T_i s + 1)}{T_i s^2 + (\alpha T_i + \beta K_p T_i) s + \beta K_p}
$$


**Step 3: Steady-state analysis (Final Value Theorem)**

For a **step input** $\omega_c(t) = \bar{\omega}_c$, we have:

$$
\Omega_c(s) = \frac{\bar{\omega}_c}{s}
$$

Applying the final value theorem:

$$
\lim_{t \to \infty} \omega(t) = \lim_{s \to 0} s \, \Omega(s)
$$

$$
= \lim_{s \to 0} s \cdot \frac{\beta K_p (T_i s + 1)}{T_i s^2 + (\alpha T_i + \beta K_p T_i) s + \beta K_p} \cdot \frac{\bar{\omega}_c}{s}
$$

The $s$ terms cancel, and as $s \to 0$:
- Numerator $\to \beta K_p$  
- Denominator $\to \beta K_p$  

Thus:
$$
\lim_{t \to \infty} \omega(t) = \frac{\beta K_p}{\beta K_p} \, \bar{\omega}_c = \bar{\omega}_c
$$

**Conclusion:** The output exactly matches the step reference in steady state guaranteeing, therefore, a **zero steady-state error** thanks to the integral term in the controller.

<div style="border-left: 4px solid #e17055; background-color: #fdf2e9; padding: 15px; margin: 20px 0;">

<span style="font-size: 1.25em; font-weight: bold;">Be careful: "Integral ≠ magic"</span>
<br>

The above proof holds <strong>only</strong> under certain conditions:

<ol>
<li><strong>Closed-loop stability:</strong><br>
   If the PI gains make the system unstable, the output will never settle, and steady-state error becomes meaningless.</li>

<li><strong>Type of input and system order:</strong><br>
   <ul>
   <li>A <strong>type-1 system</strong> (one integrator in open loop) achieves zero error for <strong>step</strong> inputs, but not for ramps.</li>
   <li>A <strong>type-2 system</strong> is needed for zero ramp error.</li>
   <li>For higher-order references (e.g., parabolic), even more integrators are required.</li>
   </ul>
</li>

<li><strong>Actuator and system limits:</strong><br>
   If the actuator saturates or physical limits are reached, the integrator may "wind up" — error remains even if the math predicts zero.</li>
</ol>

<strong>In short:</strong> the integral term eliminates steady-state error <em>only</em> if the loop is stable, the input type matches the system's type, and no hard constraints prevent the output from reaching the target.
</div>

---

<span style="font-size: 1.25em; font-weight: bold;">Extension: Transient Response with PI Control </span>

The denominator of the closed-loop transfer function derived above can be compared with the [standard second-order](#second-order) equation:

$$
s^2 + 2\zeta \omega_n s + \omega_n^2.
$$  

The denominator is $T_i s^2 + (\alpha T_i + \beta K_p T_i) s + \beta K_p$. Therefore, by inspection:

- **Natural frequency:**  
  $$
  \omega_n = \sqrt{\tfrac{\beta K_p}{T_i}}
  $$  

- **Damping relation:**  
  $$
  2\zeta \omega_n = \alpha + \beta K_p
  \quad \Longrightarrow \quad 
  \zeta = \frac{\alpha + \beta K_p}{2\sqrt{\beta K_p / T_i}}
  $$  

**Conclusions:**

- Increasing **$K_i = \tfrac{K_p}{T_i}$** → raises the natural frequency $\omega_n$ leading, therefore, to a faster and more agressive response but reduces $\zeta$ making the system more oscillatory.  making the system more oscillatory. The combined effect is that increasing $K_i$ does not always lead to a faster overall response, since the added oscillations can increase the settling time
- Increasing **$K_p$** with a fixed **$K_i$** → directly increases damping $\zeta$, reducing oscillations.  


</details>


## Chapter 2.3: Derivative (D) action

![Derivative control (6 min)](https://www.youtube.com/watch?v=_VzHpLjKeZ8&start=1489&end=1841)  
> <sub>*Lum, C. (2023) Control Theory: Proportional Integral Derivative (PID) Control. YouTube video, May. Available at: https://www.youtube.com/watch?v=_VzHpLjKeZ8&t=1489s*</sub>  
>
> *This short clip (24:49–30:41) introduces the Derivative (D) term. It provides damping by anticipating future error, helping reduce overshoot and oscillation. Lum explains when and how it’s useful — and where it can go wrong.*


The purpose of derivative action is primarily to **improve the closed-loop stability** and to enhance the speed of response by anticipating future errors. It achieves this by acting based on the rate of change of the error signal.

When combined with proportional action, it forms a Proportional-Derivative (PD) controller as shown below:
<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/PD_controller.png" alt="https://www.youtube.com/watch?v=tFVAaUcOm4I">
  <figcaption><center><em>Proportionnal derivative (PD) controller</em><br><sub>DigiKey (2023). <em>What is a PID Controller?</em> YouTube video, 21 August. Available at: https://www.youtube.com/watch?v=tFVAaUcOm4I.</sub></center> </figcaption>
</figure>

The control law is expressed as:

$$
\mathbf{u}(t) \;=\; \mathbf{K_p} \, \mathbf{e}(t) \;+\; \mathbf{K_d} \frac{de(t)}{dt} + \mathbf{u_b}
$$

where:

- **Dimensions:**
  - $m$ = number of **control inputs** (actuators), $n$ = number of **measured outputs**.
  - $\mathbf{u}(t) \in \mathbb{R}^{m}$ is the **control signal** sent to the plant/actuator.  
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)
  - $\mathbf{e}(t) \in \mathbb{R}^{n}$ is the **tracking error** between the desired **setpoint/reference output** $y_{sp}(t)$ (what we want to achieve) and the **measured system output** $y(t)$. It is defined as  $ e(t) = y_{sp}(t) - y(t)$.
  *Units: same as $y$, e.g. position in $\mathrm{m}$, temperature in $\mathrm{^\circ C}$, etc.*
  - $\dfrac{d\mathbf{e}(t)}{dt}\in \mathbb{R}^n$ the element-wise time derivative.

- **Gains and bias:**
  - $\mathbf{K_p} \in \mathbb{R}^{m\times n}$ is the **proportional gain**.    
  *Units: $\dfrac{u}{y}$ (e.g. $\mathrm{V/m}$ if input is voltage and output is position).*
  - $\mathbf{K_d} \in \mathbb{R}^{m\times n}$ is the **derivative gain**. 
  - $\mathbf{u_b} \in \mathbb{R}^{m}$ is the **bias (reset) vector**. When the error is zero, the control variable takes this value. It can sometimes be manually adjusted to achieve zero steady-state error at a specific operating point.
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)




<!--
Where:
* $T_d$: The **derivative time**. A larger $T_d$ implies a stronger derivative action, making the controller more sensitive to the rate of change of the error.
-->
<!--
**Interpretation of Derivative Action**:
Derivative action can be intuitively understood as a form of "predictive control." By sensing how quickly the error is changing, the controller can predict what the error will be in the near future (e.g., through linear extrapolation of the error curve, as shown in the image below). This anticipation allows the controller to apply a corrective control action even before the full magnitude of the error manifests. This predictive capability helps to effectively damp oscillations, reduce overshoot, and improve the overall transient response, thereby significantly enhancing system stability.


As demonstrated in simulations, incorporating derivative action adds significant damping to the system, which helps reduce oscillations and minimize overshoot. However, a critical consideration is that derivative action is highly sensitive to noise present in the error signal or sensor measurements. Differentiating noisy signals amplifies the noise, which can lead to erratic and chattering control actions, increased wear on actuators, and potentially instability. Consequently, derivative action is almost universally implemented in conjunction with a low-pass filter to smooth out these high-frequency components.
-->


### Hands-on Exercise: Exploring derivative control
Let's use again the interactive simulation to understand the behavior and limitations of derivative control.
It shows a typical [second-order system](#second-order)  with a pure delay of 1 step driven by a PID controller.
In the plot, three signals are displayed to help visualize the closed-loop dynamics and the role of the controller.  
  * The blue dashed line represents the **desired value** (setpoint).
  * The purple line represents the **plant’s position/output** that we are getting from the sensors. The desired behavior is to have it lined up with the desired value. 
  * The yellow line represents the **control signal** $u(t)$ that drives the plant (e.g. actuator force). It is plotted on the right y-axis. A big, spiky yellow curve means high actuator demand.

Your task is to gradually increase the value of the derivative gain $K_d$ while keeping the proportional gain $K_p$ you found in the first hands-on-exercise (e.g. 3). You can, for example, try $K_d=0.5$, $K_d =4$, $K_d=7$, $K_d=10$ or $K_d=20$  . What do you observe in terms of:
  * **Oscillations and overshoot:** What happens to the oscillations and overshoot as you increase Kd? Does the system become more stable and settle faster?
  * **Sensitivity to noise and rough Behavior:**: Does the output (in green) become rough or erratic? How might this relate to measurement noise in a real system? (Note: Try extreme values of Kd. Furthermore, The simulator does not perfectly show noise, but consider the theoretical implications.)

  <div id="pid-simulator-3" class="pid-simulator-container">
      <h2>PD-controller simulation</h2>
      <div class="pid-controls">
          <label>Kp:</label>
          <input type="range" class="kp-slider" min="0" max="40" step="0.1" value="3">
          <span class="kp-value slider-value"></span>
          <label>Ki:</label>
          <input type="range" class="ki-slider" min="0" max="10" step="0.02" value="0">
          <span class="ki-value slider-value"></span>
          <label>Kd:</label>
          <input type="range" class="kd-slider" min="0" max="40" step="0.1" value="0">
          <span class="kd-value slider-value"></span>
      </div>
      <div class="pid-chart-container">
          <canvas class="pid-chart"></canvas>
      </div>
      <div class="pid-buttons">
         <button class="reset-button">Reset</button>
      </div>
  </div>


<details markdown="1">
  <summary><strong>What you should obtain?</strong></summary>
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/PD_controller_sim.png">
    </figure>

  > The output rises quickly and overshoots slightly, but settles much faster than in the P or PI cases, with reduced oscillations. However, it does not reach the setpoint, there's still steady-state error. The control signal shows a sharp peak at the beginning, reflecting the derivative action responding to the rapid change in error, then decays smoothly and stabilizes.
</details>

### Conclusions from the Exercise
Based on your observations from the simulation, and consistent with the principles of derivative action, you should have identified the following:

* **Improvement in stability and damping:** Derivative action effectively improves the closed-loop stability and enhances the speed of response by anticipating future errors. It achieves this by acting based on the rate of change of the error signal. Derivative action can be intuitively understood as a form of predictive control. By sensing how quickly the error is changing, the controller can predict what the error will be in the near future (e.g., through linear extrapolation of the error curve, as shown below). This anticipation allows the controller to apply a corrective control action even before the full magnitude of the error manifests. This predictive capability helps to effectively damp oscillations, reduce overshoot, and improve the overall transient response, thereby significantly enhancing system stability. As demonstrated in simulations, incorporating derivative action adds significant damping to the system, which helps reduce oscillations and minimize overshoot. The derivative component improves the overall response of many systems for moderate values of $K_d$.
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/derivative_error.png" alt="https://mrcet.com/downloads/digital_notes/ECE/II%20Year/Control%20Systems.pdf">
    <figcaption><center><sub>Rajashekar, I., Pradeep Ramagiri, and J. Suresh Kumar. 2020. Control Systems: Lecture Notes, B.Tech II Year – II Sem (2020–21). Department of Electronics and Communication Engineering, MRCET. Available at: https://mrcet.com/downloads/digital_notes/ECE/II%20Year/Control%20Systems.pdf.</sub></center> </figcaption>
  </figure>

* **Rough behavior and actuator demands:** If we go overboard with $K_d$, we will see a lack of smoothness in the response, and other weird behaviors. The derivative component is sometimes a little rough because it demands very large actions. Imagine, for example, an instantaneous change in the setpoint. The derivative component would demand an infinite action that the actuator cannot satisfy. Since the actuator cannot provide the action requested by the controller, we would have deviations from what was calculated, or we could even damage the actuator. Consequently, derivative action is almost universally implemented in conjunction with a low-pass filter to smooth out these high-frequency components.

* **Sensitivity to noise:** A critical downside of the derivative action is that it is highly sensitive to noise present in the error signal or sensor measurements. Differentiating noisy signals amplifies the noise, which can lead to erratic control actions, increased wear on actuators, and potentially instability.

<!--
**Classical Implementation of Derivative Action**:
Historically, derivative action, like integral action, was often implemented using a first-order lag, which inherently provides a filtering effect to mitigate noise sensitivity.

<figure>
  <img src="https://i.imgur.com/example_classical_deriv_imp.png" alt="Classical implementation of derivative action">
  <figcaption><center><em>A block diagram illustrating a classical implementation of derivative action. (Similar to Figure 3.7 in "3.PID Control.pdf", page 69)</em></center></figcaption>
</figure>
-->

<details markdown="1">
<summary><strong>Going Deeper: Mathematical analysis of a PD controller</strong></summary>

![PD Control (6 min)](https://www.youtube.com/watch?v=6pL_VPJEuHc&list=PLG9XfFeUwHFxUAuQILIRvkwSuc3IfHt7A&index=7)  
> <sub>*Jones, C. (2020) PD Control. YouTube video, 25 August. Available at: https://www.youtube.com/watch?v=6pL_VPJEuHc*</sub>
>
> *This video gives a clear math view of PD control. It derives the closed-loop transfer function for a classical example of a simple DC motor and shows, step by step, how the derivative time $T_d$ shows up in the damping term. It also explains how the derivative is done in practice and why this matters for noise. This complements the intuitive notes above with an equation-based perspective.*

### How does the derivative action introduce damping ?

We, again, consider a simple **DC motor** as the plant to be controlled.  
Its dynamics can be expressed in terms of **angular velocity** $\omega(t)$ and **shaft position** $\theta(t)$:  

$$
\dot{\omega}(t) + \alpha \, \omega(t) = \beta \, u(t), 
\qquad \dot{\theta}(t) = \omega(t).
$$

Here:  
- $\theta(t)$ is the **angular position** of the motor shaft (rad).  
- $\omega(t)$ is the **angular velocity**, i.e. $\dot{\theta}(t)$.  
- $u(t)$ is the **control input** (voltage applied to the motor).  
- $\alpha > 0$ models damping effects such as friction and resistance.  
- $\beta > 0$ is a gain constant relating input to acceleration.  

Substituting $\omega(t) = \dot{\theta}(t)$ into the velocity equation gives a **second-order differential equation** for the motor position:  

$$
\ddot{\theta}(t) + \alpha \, \dot{\theta}(t) = \beta \, u(t).
$$  

This shows the motor behaves like a **second-order system**, making it a natural test case for analyzing damping and oscillations.

*NB: To understand in more details how this expression was derived, please refer to [this video](#video-proportional-control)*

The error is defined as the difference between the desired and actual position:  
$$
e(t) = \theta_c(t) - \theta(t),
$$
where $\theta_c(t)$ is the reference command.  

The PD controller has the form:
$$
u(t)=K_p\left(e(t)+T_d\,\frac{de}{dt}(t)\right)
     =K_p\left(\theta_c-\theta + T_d\,\dot{\theta_c}- T_d\,\dot{\theta}\right),\quad K_d:=K_pT_d .
$$

However, as explained in the video, keeping $\dot{\theta_c}$ in the equation leads to instabilities in the usual case of abrupt changes in the reference (derivative going towards infinity). Therefore, it's usually omitted in the equation. Therefore:
$$
u(t)=K_p\left(\theta_c-\theta - T_d\,\dot{\theta}\right),\quad K_d:=K_pT_d .
$$

Laplace and substitute:
$$
(s^2+\alpha s)\,\Theta(s)=\beta K_p\Big(\Theta_c(s)-\Theta(s)-T_d s\,\Theta(s)\Big).
$$

Collect terms:
$$
\left[s^2+s\big(\alpha+\beta K_pT_d\big)+\beta K_p\right]\Theta(s)=\beta K_p\,\Theta_c(s)
$$

Closed-loop transfer:
$$
\frac{\Theta(s)}{\Theta_c(s)}=\frac{\beta K_p}{s^2+s(\alpha+\beta K_pT_d)+\beta K_p}.
$$

This is a standard format of a [second order system](#second-order) $(s^2+2\zeta\omega_n s+\omega_n^2)$ characterized by a natural frequency $\omega_n$ and a damping ratio $\zeta$:
$$
\omega_n=\sqrt{\beta K_p},\qquad
\boxed{\;\zeta=\dfrac{\alpha+\beta K_pT_d}{2\sqrt{\beta K_p}}\;}
$$

**Result:** The term $K_pT_d = K_d$ sits in the damping ratio $\zeta$⇒ $K_d$ directly **adds damping** showing the stabilizing effect of $K_d$. Note also that the natural frequency is proportional to $K_p$, meaning that a bigger $K_p$ leads to a faster response.

<!--
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!! NOT SURE !!!!!!!!!!!!!!!!!!!!!!!!!!
### How the derivative is implemented ?

**(a) “Look-ahead” view (why PD feels predictive)**  
Using a first-order Taylor expansion,
$$
e(t+T_d) \approx e(t) + T_d\,\frac{de}{dt}(t)
\;\Rightarrow\;
u(t) = K_p\,e(t+T_d).
$$
So a PD controller is like proportional control on a short **extrapolation** of the error $T_d$ seconds ahead. This is why it damps oscillations: it reacts to where the error is heading.

**(b) Finite-difference derivative (what you actually compute)**
$$
\frac{de}{dt}(t_k) \approx \frac{e(t_k) - e(t_{k-1})}{\Delta}
\quad\Rightarrow\quad
u_k \approx K_p\,e_k \;+\; K_p T_d\,\frac{e_k - e_{k-1}}{\Delta}.
$$
Simple and effective, but it **amplifies high-frequency noise** (the difference is divided by the small sampling time $\Delta$). That is why, the derivation action is highly sensitive to noise.

**(c) Low-pass filter (the standard fix)**  
To avoid blowing up noise, use a one-pole low-pass in the D path:
$$
T_d s \;\longrightarrow\; \frac{T_d s}{\tfrac{T_d}{N}s + 1}, \qquad N \gg 1.
$$
At low frequency it behaves like a derivative; at high frequency the gain **saturates** (≈ $N$), which keeps the command smooth and protects actuators.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
-->

</details>


## Chapter 2.4: The full PID controller

![This short video (9 min)](https://www.youtube.com/watch?v=wkfEZmsQqiA&list=PLn8PRpmsu08pQBgjxYFXSsODEF3Jqmm-y&index=1)  
><sub>*Brian Douglas (n.d.) Introduction to Control Systems. YouTube video. Available at: https://www.youtube.com/watch?v=wkfEZmsQqiA*</sub>  
>  
> *This short video by Brian Douglas revisits key control concepts through fresh examples. It’s a great way to reinforce the intuition behind open-loop vs closed-loop systems and sets the stage for understanding PID in context.*  

To summarize, the **PID controller** is the most widely used control algorithm in industry, effectively combining the strengths of all three fundamental control actions:

* **Proportional (P) term**: Provides a control action directly proportional to the current error (**the present**), influencing the rise time and affecting the steady-state error. It gives the controller an immediate response to deviations from the setpoint.
* **Integral (I) term**: Accumulates past errors to ensure the complete elimination of steady-state offset, guaranteeing that the output eventually reaches and settles precisely at the setpoint. It addresses the memory of the error (**the past**).
* **Derivative (D) term**: Anticipates **future** errors based on the rate of change of the current error. This term improves system stability, reduces overshoot, and speeds up the overall response by providing damping.

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/PID_controller.png" alt="https://www.youtube.com/watch?v=tFVAaUcOm4I">
  <figcaption><center><em>Proportionnal integral derivative (PID) controller</em><br><sub>>DigiKey (2023). <em>What is a PID Controller?</em> YouTube video, 21 August. Available at: https://www.youtube.com/watch?v=tFVAaUcOm4I.</sub></center> </figcaption>
</figure>

The complete PID control law is, therefore, given by:

$$
\mathbf{u}(t) \;=\; \mathbf{K_p} \, \mathbf{e}(t) \;+\; \mathbf{K_i} \int_0^t \mathbf{e}(\tau)\, d\tau \;+\; \mathbf{K_d} \, \frac{d\mathbf{e}(t)}{dt}
$$

where:

- Dimensions:
  - $m$ = number of **control inputs** (actuators), $n$ = number of **measured outputs**.
  - $\mathbf{u}(t) \in \mathbb{R}^{m}$ is the **control signal** sent to the plant/actuator.  
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)
  - $\mathbf{e}(t) \in \mathbb{R}^{n}$ is the **tracking error** between the desired **setpoint/reference output** $y_{sp}(t)$ (what we want to achieve) and the **measured system output** $y(t)$. It is defined as  $ e(t) = y_{sp}(t) - y(t)$.
  *Units: same as $y$, e.g. position in $\mathrm{m}$, temperature in $\mathrm{^\circ C}$, etc.*
  - $\displaystyle \int_{0}^{t} \mathbf{e}(\tau)\, d\tau \in \mathbb{R}^n$ is the element-wise time integral, and $\dfrac{d\mathbf{e}(t)}{dt}\in \mathbb{R}^n$ the element-wise time derivative.

- Gains:
  - $\mathbf{K_p} \in \mathbb{R}^{m\times n}$ is the **proportional gain**.    
  *Units: $\dfrac{u}{y}$ (e.g. $\mathrm{V/m}$ if input is voltage and output is position).*
  - $\mathbf{K_i} \in \mathbb{R}^{m\times n}$ is the **integral gain**.  
  - $\mathbf{K_d} \in \mathbb{R}^{m\times n}$ is the **derivative gain**.  
    - $\mathbf{u_b} \in \mathbb{R}^{m}$ is the **bias (reset) vector**. When the error is zero, the control variable takes this value. It can sometimes be manually adjusted to achieve zero steady-state error at a specific operating point.
  *Units depend on the actuator input* (e.g. voltage $\mathrm{V}$, force $\mathrm{N}$, or torque $\mathrm{Nm}$)


Another very intuitive way to perceive the three components involved in a PID controller is presented in the rest of the video

![Physical implementation (13 min)](https://www.youtube.com/watch?v=_VzHpLjKeZ8&start=1841)  
><sub>*Lum, C. (2023) Control Theory: Proportional Integral Derivative (PID) Control. YouTube video, May. Available at: https://www.youtube.com/watch?v=_VzHpLjKeZ8&start=1841&end=2656*</sub>  
>
> In this final part, an intuitive analogy of a PID controller is presented:
> * The proportional (P) component can be thought of as a spring. It provides a restoring force proportional to the displacement (error).
> * The derivative (D) component acts like a damper (or viscous fluid). It resists the rate of change of motion (error), providing a damping effect.
> * The integral (I) component is harder to visualize but it is vaguely analogized to a inertia/momentum. It accumulates past error, steadily increasing its pull or push to eliminate any persistent offset, much like accumulated momentum continues to move an object even when the initial force is removed. This persistent action ensures that the system eventually settles precisely at the setpoint, taking over the control authority once the error becomes zero.

### Hands-on Exercise: Exploring PID controller
Now that you fully understand the individual effects of each component of the PID controller, let's go back to the simulation and tune the different gains. Try to identify the values that achieve the best performance in terms of:

* **Rise Time**: The output should reach the vicinity of the setpoint as quickly as possible.
* **Overshoot**: The output should exceed as less as possible the setpoint before settling.
* **Settling Time**: The oscillations should die down as fast as possible.
* **Steady-State Error**: The final difference between the setpoint and the actual output should be zero.
* **Stability**: The system's output should remains bounded or not behave erraticly.

*(Note that is is harder than before because, apart from the individual effects, you are also observing the combined effect of the different changes)*

  <div id="pid-simulator-4" class="pid-simulator-container">
      <h2>PID-controller simulation</h2>
      <div class="pid-controls">
          <label>Kp:</label>
          <input type="range" class="kp-slider" min="0" max="40" step="0.1" value="0">
          <span class="kp-value slider-value"></span>
          <label>Ki:</label>
          <input type="range" class="ki-slider" min="0" max="10" step="0.02" value="0">
          <span class="ki-value slider-value"></span>
          <label>Kd:</label>
          <input type="range" class="kd-slider" min="0" max="40" step="0.1" value="0">
          <span class="kd-value slider-value"></span>
      </div>
      <div class="pid-chart-container">
          <canvas class="pid-chart"></canvas>
      </div>
      <div class="pid-buttons">
          <button class="ziegler-nichols-button">Ziegler-Nichols</button>
          <button class="reset-button">Reset</button>
      </div>
  </div>


<details markdown="1">
  <summary><strong>What you should obtain?</strong></summary>
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/PID_controller_sim.png">
    </figure>

  > The system reaches the setpoint quickly with minimal overshoot and a fast settling time. The oscillations die out smoothly, and the output stabilizes exactly at the desired value without steady-state error. Throughout the response, the system remains stable and well-behaved, showing no signs of erratic or unbounded behavior. The control signal shows a strong initial response that quickly stabilizes, combining contributions from all three terms to achieve fast, accurate, and stable behavior.
</details>


## Chapter 2.5: Summary exercises
### 2.5.1 Conceptual exercise
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>PID Tuning Effects – Dropdown Table</title>
  <style>
    table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; }
    th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
    th { background-color: #eee; }
    select { width: 100%; padding: 6px; }
    .correct { outline: 2px solid #4caf50; }
    .incorrect { outline: 2px solid #f44336; }
  </style>
</head>
<body>

<p>Select the correct qualitative effect of <strong>increasing</strong> each PID parameter independently, then click <em>Check answers</em>.</p>

<div id="pid-exercise">
<table>
  <thead>
    <tr>
      <th>Parameter ↑</th>
      <th>Rise time</th>
      <th>Overshoot</th>
      <th>Settling time</th>
      <th>Steady-state error</th>
      <th>Stability</th>
    </tr>
  </thead>
  <tbody>
    <!-- kP row -->
    <tr>
      <td><strong>k<sub>P</sub></strong></td>
      <td>
        <select class="answer" data-answer="Decrease">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Increase">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
          <option>No effect</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Minor">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Decrease">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>No effect</option>
          <option>Eliminate</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Degrade">
          <option value="">-- Select --</option>
          <option>Improve (for small kD)</option>
          <option>Degrade</option>
          <option>No effect</option>
        </select>
      </td>
    </tr>

    <!-- kI row -->
    <tr>
      <td><strong>k<sub>I</sub></strong></td>
      <td>
        <select class="answer" data-answer="Decrease">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Increase">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
          <option>No effect</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Increase">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Eliminate">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>No effect</option>
          <option>Eliminate</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Degrade">
          <option value="">-- Select --</option>
          <option>Improve (for small kD)</option>
          <option>Degrade</option>
          <option>No effect</option>
        </select>
      </td>
    </tr>

    <!-- kD row -->
    <tr>
      <td><strong>k<sub>D</sub></strong></td>
      <td>
        <select class="answer" data-answer="Minor">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Decrease">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
          <option>No effect</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Decrease">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>Minor</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="No effect">
          <option value="">-- Select --</option>
          <option>Decrease</option>
          <option>Increase</option>
          <option>No effect</option>
          <option>Eliminate</option>
        </select>
      </td>
      <td>
        <select class="answer" data-answer="Improve (for small kD)">
          <option value="">-- Select --</option>
          <option>Improve (for small kD)</option>
          <option>Degrade</option>
          <option>No effect</option>
        </select>
      </td>
    </tr>
  </tbody>
</table>
</div>

<button onclick="checkDropdownAnswers('#pid-exercise','dropdown-feedback')">Check answers</button>
<p id="dropdown-feedback" style="font-weight: bold; margin-top: 10px;"></p>

<script>
  function checkDropdownAnswers(containerSelector, feedbackId) {
    const container = document.querySelector(containerSelector);
    const selects = container.querySelectorAll('select.answer'); // only inside container
    let correctCount = 0;

    selects.forEach(sel => {
      sel.classList.remove('correct', 'incorrect');
      const correct = sel.dataset.answer;
      const user = sel.value;
      if (user === correct) {
        sel.classList.add('correct');
        correctCount++;
      } else {
        sel.classList.add('incorrect');
      }
    });

    const el = document.getElementById(feedbackId);
    if (!el) return;
    if (correctCount === selects.length) {
      el.textContent = 'Perfect! All answers are correct.';
      el.style.color = '#2e7d32';
    } else {
      el.textContent = `${correctCount}/${selects.length} correct. Cells in red need revision.`;
      el.style.color = '#c62828';
    }
  }
</script>

</body>
</html>



<!--
<details markdown="1">
<summary><strong>Conceptual Exercise</strong></summary>

**Which PID controller term(s) primarily help to:**

<form id="q-pid-terms">
  <ol>
    <li>**Eliminate steady-state error?**<br>
      <input type="radio" name="q1" value="P"> P<br>
      <input type="radio" name="q1" value="I"> I<br>
      <input type="radio" name="q1" value="D"> D<br>
      <input type="radio" name="q1" value="PI"> P and I<br>
    </li>
    <li>**Reduce overshoot and oscillations?**<br>
      <input type="radio" name="q2" value="P"> P<br>
      <input type="radio" name="q2" value="I"> I<br>
      <input type="radio" name="q2" value="D"> D<br>
      <input type="radio" name="q2" value="PD"> P and D<br>
    </li>
    <li>**Increase the speed of response (reduce rise time)?**<br>
      <input type="radio" name="q3" value="P"> P<br>
      <input type="radio" name="q3" value="I"> I<br>
      <input type="radio" name="q3" value="D"> D<br>
      <input type="radio" name="q3" value="PD"> P and D<br>
    </li>
  </ol>
  <button type="button" onclick="checkMultipleMCQs()">Check Answers</button>
  <p id="q-pid-terms-feedback"></p>
</form>

<script>
function checkMultipleMCQs() {
  const correctAnswers = {
    "q1": "I",
    "q2": "D",
    "q3": "P" // While D helps, P is primary for initial speed.
  };
  let allCorrect = true;
  let feedbackMessage = "";

  for (const qName in correctAnswers) {
    const selected = document.querySelector(`input[name="${qName}"]:checked`);
    if (!selected || selected.value !== correctAnswers[qName]) {
      allCorrect = false;
    }
  }

  const feedbackElement = document.getElementById("q-pid-terms-feedback");
  if (allCorrect) {
    feedbackElement.style.color = 'green';
    feedbackElement.textContent = 'Correct! Good job on understanding the role of each PID term.';
  } else {
    feedbackElement.style.color = 'red';
    feedbackElement.textContent = 'Incorrect. Review the roles of P, I, and D terms and try again!';
  }
}
</script>

<details markdown="1">
<summary><strong>Solution</strong></summary>

1.  **Eliminate steady-state error?** **I (Integral)**: The integral term continuously accumulates the error over time, causing the control output to change until the error is eliminated.
2.  **Reduce overshoot and oscillations?** **D (Derivative)**: The derivative term responds to the rate of change of the error, providing a damping effect that helps to stabilize the system and reduce oscillations.
3.  **Increase the speed of response (reduce rise time)?** **P (Proportional)**: Increasing the proportional gain ($K_p$) directly increases the control action for a given error, making the system respond faster to reach the setpoint. (While D can also contribute to a faster *settling* by reducing overshoot, P primarily drives the initial speed.)

</details>

</details>
-->

### 2.5.2 Programming exercise: implementing a PID control loop

You are asked to complete a simple PID control loop that runs every `dt` seconds. The loop computes the **error**, its **derivative**, and **integral**, and then combines them to compute a control output `u`.

Select the correct expressions from the dropdown menus below to fill in the missing parts.

<div style="background-color:#f8f8f8; padding:12px; border-radius:6px; font-family: monospace; white-space:pre;">
    eint  = 0
    eprev = 0
    edot  = 0

    repeat every dt seconds { <br>
        &nbsp; <span style="color: #008000;"># Compute the error as setpoint minus the measured output</span><br>
        &nbsp; e = desired - 
        <select id="sensor" style="width: 200px;">
          <option value="">[...]</option>
          <option value="read_sensor()">read_sensor()</option>
          <option value="actual">actual</option>
          <option value="0">0</option>
        </select> 
        <br><br>

        &nbsp; <span style="color: #008000;"># Compute the derivative term to capture how fast the error is changing</span><br>
        &nbsp; edot = (e - eprev) / dt 
        <br><br>

        &nbsp; <span style="color: #008000;"># Update the integral term by summing the error over time</span><br>
        &nbsp; eint = eint + 
        <select id="eint" style="width: 120px;">
          <option value="">[...]</option>
          <option value="e">e</option>
          <option value="eprev">eprev</option>
          <option value="u">u</option>
        </select> * dt
        <br><br>

        &nbsp; <span style="color: #008000;"># Combine proportional, integral and derivative terms into the control signal</span><br>
        &nbsp; u = Kp * 
        <select id="e_term" style="width: 120px;">
          <option value="">[...]</option>
          <option value="e">e</option>
          <option value="eint">eint</option>
          <option value="edot">edot</option>
        </select> <br>
        &nbsp;&nbsp;&nbsp; + Ki * eint <br>
        &nbsp;&nbsp;&nbsp; + Kd * 
        <select id="edot" style="width: 120px;">
          <option value="">[...]</option>
          <option value="edot">edot</option>
          <option value="e">e</option>
          <option value="eprev">eprev</option>
        </select>
        <br><br>

        &nbsp; <span style="color: #008000;"># Save the current error for the next iteration</span><br>
        &nbsp; eprev = e
        <br><br>

        &nbsp; <span style="color: #008000;"># Send the control signal to the actuator</span><br>
        &nbsp; send_control(u)
        <br>
    }
    <br>
</div>


<button class="check-button" onclick="checkDropdownPID()">Check Answer</button>
<div class="feedback" id="pid-feedback" style="margin-top: 12px; font-weight: bold;"></div>

<script>
function checkDropdownPID() {
  const sensor = document.getElementById("sensor").value;
  const eint = document.getElementById("eint").value;
  const e_term = document.getElementById("e_term").value;
  const edot = document.getElementById("edot").value;

  const correct = (
    sensor === "read_sensor()" &&
    eint === "e" &&
    e_term === "e" &&
    edot === "edot"
  );

  const feedback = document.getElementById("pid-feedback");
  if (correct) {
    feedback.innerHTML = "✅ Well done! You've correctly implemented the PID loop.";
    feedback.style.color = "green";
  } else {
    feedback.innerHTML = "❌ Hmm... something's off. Recheck each term and try again!";
    feedback.style.color = "red";
  }
}
</script>

<!--
<details markdown="1">
  <summary><strong>Hint</strong></summary>

  - The **sensor reading** is obtained using `read_sensor()`
  - The **error** is `desired - actual`, and you compute its **integral** and **derivative** over time
  - The final `u` signal uses all 3 components: proportional (error), integral (sum of past errors), and derivative (rate of change of error)

</details>
-->
  <div style="margin-left: 1rem;">

  <details markdown="1">
  <summary><strong>Solution</strong></summary>

  ```python
  eint   = 0
  eprev  = 0

  repeat every dt seconds { 
      # Compute the error as setpoint minus the measured output
      e     = desired - read_sensor()

      # Compute the derivative term to capture how fast the error is changing.
      edot  = (e - eprev) / dt

      # Update the integral term by summing the error over time.
      eint  = eint + e * dt

      # Combine proportional, integral and derivative contribution into the final control signal.
      u     = Kp * e + Ki * eint + Kd * edot

      # Save the current error for the next loop iteration.
      eprev = e

      # Send the control signal to the actuator.
      send_control(u)
  }
  ``` 
  This loop implements a discrete-time PID controller:
  * The error term $e$ provides an immediate correction.
  * The integral term accumulates past errors to remove steady-state offset.
  * The derivative term anticipates future behavior by looking at the error rate.
  * All three terms are weighted by the gains $K_p$, $K_i$, and $K_d$, then summed to form the control signal $u$.
  * Finally, eprev is updated so the derivative term can be computed correctly on the next iteration.
  This structure ensures that the controller reacts to present, past, and predicted future error

  <!--
  <div style="margin-left: 1rem;">

  <details markdown="1">
  <summary><strong>Do you want to make it better ?</strong></summary>

  ![Video](https://www.youtube.com/watch?v=La9vll93h44)
  > <sub>"Lynch, K. (2015) <i>Improving the basic PID control algorithm</i>. Northwestern Robotics. YouTube video, 8 December. Available at: https://www.youtube.com/watch?v=La9vll93h44"</sub>
  >
  > *Kevin Lynch demonstrates three practical upgrades to a basic PID: low-pass filtering the derivative to tame sensor noise, clamping the integral (anti-windup) so it can’t run away during saturation, and limiting the actuator command to its feasible range. These tweaks make a textbook PID behave robustly on real hardware.*

  **Make your PID sturdier in the real world**

  - **Low-pass the derivative (DSP filter).** Raw `de/dt` is noise-sensitive. Use a 1st-order low-pass with time constant `tau` via `alpha = dt / (tau + dt)`.
  - **Limit the integral (anti-windup).** Clamp `eint` to `[eint_min, eint_max]` to prevent windup when the actuator saturates or the setpoint is far away.
  - **Limit the output (actuator saturation).** Compute `u_unsat`, then clamp to `[umin, umax]`. This pairs naturally with integral limiting.

  ```python
  # initial state
  eint   = 0
  eprev  = 0
  edot_f = 0   # filtered derivative

  # tunables
  tau = 0.05                   # derivative low-pass time constant (s)
  umin, umax = -1.0, 1.0       # actuator limits
  eint_min, eint_max = -0.5, 0.5  # integral limits

  repeat every dt seconds {
      e     = desired - read_sensor()
      edot  = (e - eprev) / dt

      # 1st-order low-pass filter on the derivative
      alpha  = dt / (tau + dt)          # 0 < alpha < 1
      edot_f = (1 - alpha) * edot_f + alpha * edot

      # integral with anti-windup clamp
      eint = eint + e * dt
      if (eint > eint_max) { eint = eint_max }
      if (eint < eint_min) { eint = eint_min }

      # unsaturated control effort
      u_unsat = Kp * e + Ki * eint + Kd * edot_f

      # output saturation
      u = u_unsat
      if (u > umax) { u = umax }
      if (u < umin) { u = umin }

      eprev = e
      send_control(u)
  }
  ```
  </details>
  </div>
  -->
  <hr>
  </details>
  </div>


Despite its popularity, it must said that currently the PID is not the best controller available. But in most cases, it is more than enough. On the other hand, many of the most modern controllers are nothing more than improved versions of a PID, such as the different families based on PID with adaptive parameters. 
Also, one should mention that, in this course, the focus was put on explaining the PID structure that is traditionally presented in the academic textbooks, the **parallel structure**. 
<details markdown="1">
<summary>For the sake of completion, you can find below the main PID controller structures:</summary>


- **Parallel (the form analyzed in this course)**
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/structure_parallel.png" alt="https://blog.opticontrols.com/archives/124">
    <figcaption>
      <center>Parallel structure<br>
        <sub>Smuts, J. (2010) PID Controller Forms. OptiControls Blog. Available at: https://blog.opticontrols.com/archives/124</sub>
      </center>
    </figcaption>
  </figure>

  - Equation in the Laplace domain:  
    $$
    U(s) = (K_p + \frac{K_i}{s} + K_d s)E(s)
    $$
  - Each action (P, I, D) has its **own gain**, independent of the others.  
  - Easy to read, but less intuitive to tune: changing $k_p$ does **not** scale integral and derivative actions.  

- **Series**
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/structure_series.png" alt="https://blog.opticontrols.com/archives/124">
    <figcaption>
      <center>Series structure<br>
        <sub>Smuts, J. (2010) PID Controller Forms. OptiControls Blog. Available at: https://blog.opticontrols.com/archives/124</sub>
      </center>
    </figcaption>
  </figure>
  - Equation in the Laplace domain:  
    $$
    U(s) = K_c\left(1 + \frac{1}{T_i s}\right)\left(1 + T_d s\right)E(s)
    $$
  - Single **controller gain $K_c$** multiplies all terms affecting all 3 modes (proportional, derivative, integral)
  - Oldest arrangement (pneumatic/electronic controllers).  
  - Basis of Ziegler-Nichols tuning rules  
  - Mathematically equivalent to parallel. It is always possible to switch to a parallel form, using these formulas:  
    $$
    K_p = K_c\left(1+\frac{T_d}{T_i}\right),\quad
    K_i = \frac{K_c}{T_i},\quad
    K_d = K_c\,T_d
    $$

- **Standard or Mixed**
  <figure>
    <img src="{{ site.baseurl }}/assets/images/pid/structure_mixed.png" alt="https://blog.opticontrols.com/archives/124">
    <figcaption>
      <center>Mixed (standard) structure<br>
        <sub>Smuts, J. (2010) PID Controlle Forms. OptiControls Blog. Available at: https://blog.opticontrols.com/archives/124</sub>
      </center>
    </figcaption>
  </figure>
  - Equation:  
    $$
    U(s) = K_c\left(1 + \frac{1}{T_i s} + T_d s\right)E(s)
    $$
  - Very common in **industry**.  
  - Single **controller gain $K_c$** multiplies all terms affecting all 3 modes (proportional, derivative, integral)
  - Non-interacting: changing $T_i$ does not affect the D path.  
  - Conversion to parallel:  
    $$
    K_p= K_c, \quad K_i = \frac{K_p}{T_i}, \quad K_d = K_c T_d
    $$  
<hr>
</details>




# Chapter 3: Practical implementation considerations for PID control


Effectively implementing PID controllers in real-world systems goes beyond theoretical understanding and requires careful consideration of several practical aspects.

## Chapter 3.1: PID gain tuning
As you have already experienced in the simulations, obtaining the desired response from a PID controller is not a trivial task. Even if the simulated system is simple, with no measurement noise and only a pure time delay, finding a set of parameters that yield a satisfactory response requires careful effort. It is therefore natural to expect that, in real-world applications, the problem becomes even more complex.  

The difficulty lies in the fact that the three parameters of the controller, $K_p$, $K_i$, and $K_d$, do not act independently. Instead, they strongly influence one another and the overall response is always the result of their combined effect. For example, increasing the proportional gain may improve the speed of the response but also amplify oscillations, which then require an adjustment of the derivative gain for damping, while the integral gain might simultaneously introduce long-term stability issues. Thus, it is not sufficient to adjust each of them in isolation. Rather, there exists a certain zone within the three-dimensional parameter space where the behavior of the controller is acceptable, and navigating towards this zone is the main challenge of tuning.  

From an implementation point of view, writing a PID controller is easy. A few lines of code are enough to compute the three terms and combine them into the control action. The real difficulty, and the essence of PID control engineering, is to determine appropriate values for the gains. Tuning is, therefore, the step where most of the intellectual and experimental effort is required.

![Understanding PID Control, Part 4: Tuning Overview](https://www.youtube.com/watch?v=sFOEsA0Irjs)  
> <sub>Douglas, B. (2018) PID Tuning Guide | Understanding PID Control, Part 4. YouTube video, 3 July. Available at: https://www.youtube.com/watch?v=sFOEsA0Irjs</sub>
>
>*This video introduces the main families of PID tuning methods and highlights when each of them is most appropriate.*  

In practice, there are three main approaches to tuning PID controllers. 
* **empirical tuning:** It relies on the engineer’s knowledge of control theory and on systematic trial-and-error adjustments. 
* **rule-based tuning:** It consists in applying heuristic procedures that have been established and tested by experts, such as the well-known Ziegler–Nichols method. 
* **model-based tuning:** It builds upon an explicit model of the plant and uses analytical or computational tools to calculate the controller parameters. 
* **software-based auto-tuning**: Many modern industrial controllers and advanced simulation environments offer auto-tuning functionalities. These tools can automatically determine suitable PID gains by analyzing the system's step response or by running automated tests. 

Empirical and rule-based approaches are often simple to apply and can provide useful first estimates, but they also have limitations. They may not work well for plants with significant delays, for high-order dynamics, or for systems that are unstable in open loop. In contrast, model-based methods are systematic and powerful, since they rely on the mathematical description of the plant. They allow one to tune the controller to meet specified performance objectives, such as overshoot, settling time, or robustness margins. However, they require either a physical model of the plant or experimental identification of a suitable approximation, both are not trivial to identify.  

In the following sections, we will only examine the empirical tuning and rule-based tuning in more detail. The model-based tuning requires a level of understanding in control that is too advanced for this course. However, you can find an introduction to it in the following hidden section.

<details markdown="1">
<summary><strong>Introduction to model-based tuning</strong></summary>
<h3>Building a model of the plant</h3>

![3 Ways to Build a Model for Control System Design](https://www.youtube.com/watch?v=qhIjIu-Zk10) 
> <sub>"Douglas, B. (2018) 3 Ways to Build a Model for Control System Design | Understanding PID Control, Part 5. YouTube video, 10 July. Available at: https://www.youtube.com/watch?v=qhIjIu-Zk10"</sub>
> 
>*This video illustrates three complementary ways to obtain a usable model: from first principles, from input–output experiments, or from frequency response measurements.*

The starting point of any model-based method is to obtain a mathematical description of the plant. This model does not need to capture every physical detail; rather, it must approximate the plant’s behavior well enough around the operating point where control is required. There are three practical strategies.  

* The first is to derive the model from **first principles**, using the physics of the system. This is possible, for instance, when the relevant parameters such as mass, damping, stiffness, or motor constants are known or can be measured.  

* The second strategy is **system identification in the time domain**. In this case, one applies a small test input to the plant, such as a step change, records the output, and then fits a simple model such as a first-order-plus-dead-time (FOPDT) or second-order-plus-dead-time (SOPDT) system. These approximations are sufficient for many controller design tasks.  

* Finally, one can use **frequency response identification**. Here, sinusoidal signals of different frequencies are injected into the plant, and the resulting output is measured. The ratio of input and output amplitudes and phases across frequencies gives a Bode diagram, from which a transfer function model can be fitted.  

Regardless of the method, the essential goal is to obtain a control-oriented model that is simple enough for analysis yet sufficiently accurate to predict the closed-loop dynamics under PID control.

<h3>From requirements to controller design</h3>
![Manual and Automatic PID Tuning Methods](https://www.youtube.com/watch?v=qj8vTO1eIHo)  
<sub>*This video explains two equivalent perspectives for model-based PID design: tuning the gains directly, or considering the placement of the controller zeros relative to the plant poles.*</sub>  

Once a model is available, the next step is to translate performance requirements into specifications for the closed-loop system. These requirements may be expressed in the time domain, such as desired settling time, overshoot, or steady-state error, or in the frequency domain, such as crossover frequency and phase margin.  

From the frequency perspective, the PID controller introduces two zeros through its integral and derivative terms. By carefully placing these zeros relative to the plant poles, one can increase phase margin, improve stability, and adjust the bandwidth of the closed loop. The proportional gain then scales the response to achieve the desired crossover frequency.  

Alternatively, from the gains perspective, one begins by increasing the proportional gain until the response is acceptably fast, then adds integral action to eliminate steady-state error, and finally introduces derivative action to reduce overshoot and oscillations. Although this procedure appears sequential, in reality the three actions interact, so multiple iterations are typically needed.  

These two viewpoints are equivalent and complementary. The choice between them depends on the tools at hand and on the familiarity of the engineer with time- or frequency-domain reasoning.
</details>

### Chapter 3.1.1: Empirical tuning

![Empirical PID Gain Tuning](https://www.youtube.com/watch?v=uXnDwojRb1g)  
<sub>*This video demonstrates a hands-on procedure for adjusting the three gains step by step, while observing the effect on the system’s response.*</sub>  

When no model is available, or when a quick adjustment is required, empirical tuning can be applied. The procedure is conceptually simple. One begins with a controller that contains only proportional action, with integral and derivative gains set to zero. The proportional gain is then increased gradually until the system responds quickly but remains stable. At this stage, some overshoot is usually present.  

Next, integral action is introduced to eliminate steady-state error. The integral gain is increased carefully, since excessive integral action can make the response sluggish or even destabilize the system through oscillations.  

Finally, derivative action is added to provide damping. This reduces overshoot and oscillations but must be used with caution, because high derivative gains amplify measurement noise and delays. If the response becomes noisy, the derivative gain should be reduced or filtered as will be presented in a next section.  

This is the method that you most probably have implemented when doing the simulation exercise. Though iterative, it is straightforward and builds valuable intuition. However, it may take considerable time to converge to acceptable performance, and if applied carelessly on hardware, it can stress the actuators or destabilize the system.

### Chapter 3.1.2: Rule-based techniques  

Although empirical tuning provides an intuitive understanding of how each term of the PID controller affects the response, it is neither efficient nor reliable in many practical situations. The iterative trial-and-error process may require significant time, and the final result often depends on the skill and experience of the engineer. Moreover, manual tuning may lead to aggressive parameter values that cause actuator saturation or unstable oscillations. To overcome these limitations, **rule-based tuning methods** have been developed. These methods are based on systematic procedures derived from empirical observations and experimental studies, and they provide reproducible results with less effort.  

<h3> (a) Closed-loop Ziegler–Nichols method  </h3>
![Designing a PID Controller Using the Ziegler–Nichols Method](https://www.youtube.com/watch?v=n829SwSUZ_c)  
>
>*This video illustrates the closed-loop Ziegler–Nichols method, from the ultimate gain test to the calculation of controller parameters.*

The most well-known procedure is the **closed-loop Ziegler–Nichols method** (ultimate gain test). Its principle is to experimentally determine the *ultimate gain* $K_u$ and the *ultimate period* $P_u$, and then compute the PID parameters through simple formulas.  

Steps:  
1. Disable integral and derivative actions.  
2. Increase the proportional gain $K_p$ until the system oscillates with constant amplitude.  
3. Record the gain value $K_u$ (ultimate gain) and the oscillation period $P_u$ (ultimate period).  
4. Use the Ziegler–Nichols table to calculate controller gains:  

| Controller | $K_p$        | $T_i = \frac{K_p}{K_i}$      | $T_d = \frac{K_d}{K_p}$      |  
|------------|----------------|--------------|--------------|  
| P          | $0.5 K_u$    | –            | –            |  
| PI         | $0.45 K_u$   | $P_u / 1.2$| –            |  
| PID        | $0.6 K_u$    | $0.5 P_u$  | $0.125 P_u$|  
{: #closed-Ziegler}


This method is simple and systematic, but it has drawbacks: the sustained oscillations can be unsafe for sensitive plants, and the resulting tuning often yields aggressive responses with overshoot. Thus, the results are usually used as starting points.  


<h3> (b) Open-loop Ziegler–Nichols method  </h3>

The **open-loop Ziegler–Nichols method** is based on the **open-loop step response** of the plant. It is particularly useful when closed-loop experiments are not possible or would endanger the system.  

<!--
<details markdown="1">
<summary><strong>But what is step response ?</strong></summary>

  ![Video](https://www.youtube.com/watch?v=pKjR0h3jWvY)  
  > <sub>"Douglas, B. (2020) La réponse indicielle | Les systèmes de contrôle en pratique. YouTube video, 26 June. Available at: https://www.youtube.com/watch?v=pKjR0h3jWvY"</sub>  
  >
  > *This great video introduces the concept of the step response in control systems. It can, also, be useful to understand concepts that were brought up before like rise time, overshoot, settling time and steady-state error*

</details>
-->


The procedure is as follows:  
{: #open-Ziegler}
<ol>
  <li>
    Apply a unit step input to the plant in open-loop.
  </li>

  <li>
    Record the output response and approximate it by a first-order-plus-dead-time (FOPDT) model
    $G(s) \approx \frac{K}{T s + 1} e^{-Ls}$ where $K$ is the process gain, $L$ is the apparent dead time, $T$ is the process time constant.
    <strong>In practice</strong>, $L$ and the slope $R$ of the <strong>tangent</strong> at the inflection point are measured from the step response curve. 

    <figure>
      <img src="{{ site.baseurl }}/assets/images/pid/ZN_1.jpg" alt="Step response of a 4th order system">
      <figcaption><center><em>Step response of a 4th order system \(G(s)=\frac{1}{(s+1)^4}\)</em></center></figcaption>
    </figure>
  </li>

  <li>
    Use the Ziegler–Nichols open-loop tuning rules (depending on controller type):

    <table>
      <thead>
        <tr><th>Controller</th><th>$K_p$</th><th>$T_i=\frac{K_p}{K_i}$</th><th>$T_d=\frac{K_d}{K_p}$</th></tr>
      </thead>
      <tbody>
        <tr><td>P</td><td>$\frac{1}{RL}\$</td><td>–</td><td>–</td></tr>
        <tr><td>PI</td><td>$\frac{0.9}{RL}$</td><td>$\frac{L}{0.3}$</td><td>–</td></tr>
        <tr>
          <td>PID</td>
          <td>$\tfrac{1.2}{R\,L}$</td>
          <td>$2L$</td>
          <td>$0.5L$</td>
        </tr>
      </tbody>
    </table>
  </li>
</ol>


This method is safer because it avoids driving the system to instability. However, its accuracy depends on how well the process can be approximated by the FOPDT model. Moreover, like the closed-loop version, it tends to produce aggressive tuning and may require refinement.  

In summary, both Ziegler–Nichols methods provide systematic, quick rules for tuning. The closed-loop test is often more direct but riskier, while the open-loop method is safer but relies on model approximation. In both cases, the obtained controller should be viewed as an initial design, to be further refined for robustness and performance.  


<details markdown="1">
<summary><strong>Mathematical exercise</strong></summary>

*This exercise is taken from **Franklin, Powell, & Emami-Naeini (2015), Problem 4.36 in *Feedback Control of Dynamic Systems* (7th ed., Pearson)**.*  

The unit-step response of a paper machine is shown in Fig. X(a) where the input into the system is stock flow onto the wire and the output is basis weight (thickness). The time delay $L$ and slope $R$ of the transient response may be determined from the figure.  

**(a)** Find the proportional, PI, and PID-controller parameters using the open-loop Ziegler–Nichols method.  

**(b)** Using proportional feedback control, control designers have obtained a closed-loop system with the unit impulse response shown in Fig. X(b). When the gain $K_u = 8.556$, the system is on the verge of instability. Determine the proportional, PI, and PID-controller parameters according to the closed-loop Ziegler–Nichols method.  

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/ZN_exercise.jpg" alt="Karimi">
</figure>
<br>

<details markdown="1">
<summary><strong>Solution</strong></summary>

**How to obtain $L$ and $R$ from the step response ?**

1. Locate the **inflection point** of the step response.
2. Draw the **tangent line** at that point.
3. **$L$** is the time where this tangent intersects the axis $y=0$ (time axis) which corresponds to the delay time in this particular example.
4. **$R$** is the slope of the tangent. For example, you can read two points on the tangent and compute $R=\dfrac{\Delta y}{\Delta t}$.

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/ZN_exercise_1.png" alt="Karimi">
</figure>

Therefore, $L \approx 0.65 sec$ and $R=\frac{0.2}{1.25 - 065}=0.3$

From the [open-loop Ziegler Nichols table](#open-Ziegler) :
- **P:**   $  K = \frac{1}{RL} = 4.62 $

- **PI:**  $  K = \frac{0.9}{RL} = 4.15, \quad T_I = \frac{L}{0.3} = 2.17 $

- **PID:**  $  K = \frac{1.2}{RL} = 5.54, \quad T_I = 2L = 1.30, \quad T_D = 0.5L = 0.33 $
  


**(b) From impulse response:**  

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/ZN_exercise_2.png" alt="Kariimi">
</figure>

From the oscillation we find $P_u \approx 2.33 \,\text{s}$.

As given in the question $K_u = 8.556$, from the [closed-loop Ziegler Nichols table](#closed-Ziegler), we find :

- **P:**  $ K = 0.5 K_u = 4.28 $

- **PI:**  $ K = 0.45 K_u = 3.85, \quad T_I = \frac{P_u}{1.2} = 1.86$

- **PID:**    $  K = 0.6 K_u = 5.13, \quad T_I = \frac{P_u}{2} = 1.12, \quad T_D = \frac{P_u}{8} = 0.28$

</details>
<hr>
</details>

Other classical rule-based tuning methods also exist. **Cohen–Coon**, for instance, offers more nuanced formulas that account for the ratio of dead time to time constant, making it better suited for systems where the delay is a significant fraction of the dynamics. You can explore these methods in depth in this excellent resource: [PID Tuning via Classical Methods](https://eng.libretexts.org/Bookshelves/Industrial_and_Systems_Engineering/Chemical_Process_Dynamics_and_Controls_(Woolf)/09%3A_Proportional-Integral-Derivative_(PID)_Control/9.03%3A_PID_Tuning_via_Classical_Methods)  


## Chapter 3.2: Anti-windup

![Video](https://www.youtube.com/watch?v=NVLXCwc8HzM)
> <sub>"Douglas, B. (2018) Anti-windup for PID Control | Understanding PID Control, Part 2. YouTube video, 5 June. Available at: https://www.youtube.com/watch?v=NVLXCwc8HzM"</sub>
>
> *This short video by Brian Douglas, part of the MATLAB Tech Talk series, clearly explains the concept of integrator wind-up in PID controllers and why it occurs when actuators saturate. It, then, walks through the anti-windup strategy, showing how to modify the controller to avoid performance degradation.*

**Integral windup** is a common problem encountered in PID controllers, particularly when the actuator driving the system reaches its saturation limits (i.e., its maximum or minimum output capacity). If the control error persists while the actuator is saturated, the integral term will continue to accumulate to a very large value, leading to a control signal that cannot be physically implemented. When the error finally changes direction or is corrected, it takes a significant amount of time for the integral term to "unwind" before the control signal moves back within the actuator's operational range. This delay causes large overshoots and sluggish system behavior.


To mitigate the detrimental effects of integral windup, various **anti-windup** schemes are employed:
* **Clamping the Integrator**: This is one of the simplest and most common methods. The integration is stopped (or clamped) when the actuator output reaches its limits and the control signal is attempting to drive it further in the same direction.
* **Conditional Integration**: In this approach, the integral term only updates when the control signal is within the actuator's non-saturated operating limits.
* **Back-calculation**: This method uses the difference between the saturated control signal (what was actually applied) and the unsaturated control signal (what the controller calculated) to "reset" or adjust the integral term, preventing it from accumulating excessively.

Anti-windup mechanisms may seem like a secondary detail compared to the design of controller gains, but in practice they are crucial for stability and performance. Even a well-tuned PID controller can fail dramatically if integral windup is not managed, especially in systems where actuators frequently reach their limits. Therefore, implementing an anti-windup scheme is a standard step in professional control engineering practice.  



## Chapter 3.3: Noise filtering for derivative action  

![Video](https://www.youtube.com/watch?v=7dUVdrs1e18&list=PLn8PRpmsu08pQBgjxYFXSsODEF3Jqmm-y&index=3)  
> <sub>“Douglas, B. (2018) Filtering Derivative Action | Understanding PID Control, Part 3. YouTube video, 12 June. Available at: https://www.youtube.com/watch?v=7dUVdrs1e18”</sub>  
>
> *This short video explains why the derivative term amplifies high-frequency noise and shows how a low-pass filter on the D path mitigates the problem without sacrificing the useful damping of derivative action.*


One of the main limitations of the derivative term in PID controllers is its high sensitivity to measurement noise. The derivative is, by definition, the slope of the error signal; small high-frequency fluctuations which characterize noise are therefore amplified in the control output, which can lead to erratic commands, unnecessary actuator wear and even loss of closed-loop stability.

To see where this sensitivity arises in practice, recall that the derivative is commonly computed in discrete time with a finite difference:
$$
\frac{de}{dt}(t_k)\;\approx\;\frac{e(t_k)-e(t_{k-1})}{\Delta t}.
$$
When $\Delta t$ is small, even tiny sensor variations yield large derivative estimates. The controller reacts not only to the true dynamics but also to spurious noise.

The standard solution is to **filter the derivative action** so that it responds to genuine trends in the error while attenuating high-frequency components. This is implemented by inserting a first-order low-pass filter in the D path. A widely used form is
$$
G_D(s)\;=\;\frac{T_d\,s}{1+\tfrac{T_d}{N}\,s},\qquad N\gg 1,
$$
where $T_d$ is the derivative time constant and $N$ is the derivative filter coefficient. At low frequencies (where the plant dynamics lie), à $G_D(s)\approx T_d s$ and the controller behaves like an ideal derivative, providing phase lead and damping. At high frequencies (where noise dominates), the gain approaches a finite value $\approx N$, preventing uncontrolled amplification and keeping the commanded input smooth.

This filtered derivative also has a clear intuitive interpretation. Using a first-order Taylor expansion,
$$
e(t+T_d)\;\approx\;e(t)+T_d\,\frac{de}{dt}(t),
$$
a PD controller can be viewed as proportional control applied to a short **extrapolation** of the error $T_d$ seconds into the future:
$$
u(t) = K_p e(t+T_d).
$$
Filtering preserves this predictive quality while ensuring that rapid, high-frequency fluctuations (typical of sensor noise) do not dominate the control effort.

In practice, almost every industrial PID implementation includes this modification by default. The parameter $N$ must be tuned: 
* **larger $N$** (smaller effective filter time constant) yields a more responsive derivative but passes more noise
* **smaller $N$** provides stronger smoothing at the cost of added lag. 
Selecting $N$ is therefore a compromise between responsiveness and robustness and should be treated as an essential part of PID tuning.

<details markdown="1">
<summary><strong>Going deeper: other practical issues when implementing PID</strong></summary>

![Other PID Implementation Problems](https://www.youtube.com/watch?v=yr6om0e0oAQ)  
> <sub>*Lum, C. (2021) Practical Implementation Issues with a PID Controller. YouTube video, 17 May. Available at: https://www.youtube.com/watch?v=yr6om0e0oAQ.*</sub>  
>
> *This long video goes further in explaining the critical challenges in making PID work on real hardware, including derivative noise, noncausal behavior and integrator windup. It also introduces remedies such as filtering, prefilters, and anti-windup schemes, situating them within a broader control design perspective.*

In addition to anti-windup and derivative filtering, several **additional challenges** appear in practice:

- **Noncausal realization of derivatives:** a true derivative would require knowledge of the future signal, which is not physically realizable. Practical designs therefore approximate derivatives with causal, filtered versions that balance responsiveness and noise rejection.  

- **Integrator dynamics:** while integral action is necessary to remove steady-state error, it can also introduce sluggish transients or undesirable accumulation effects. Careful tuning or limiting is required to prevent these problems.  

- **Prefiltering of reference commands:** directly applying abrupt setpoint changes can demand excessive actuator effort and excite undesirable dynamics. Prefilters smooth or shape the reference signal before it enters the control loop, reducing overshoot and actuator stress.  

These considerations highlight that practical PID controllers must be carefully adapted to the realities of sensing, actuation, and implementation constraints rather than applied in their ideal textbook form.

</details>
 

### Programming exercise: Make your PID more robust
  ![Video](https://www.youtube.com/watch?v=La9vll93h44)
  > <sub>"Lynch, K. (2015) <i>Improving the basic PID control algorithm</i>. Northwestern Robotics. YouTube video, 8 December. Available at: https://www.youtube.com/watch?v=La9vll93h44"</sub>
  >
  > *Kevin Lynch demonstrates three practical upgrades to a basic PID: low-pass filtering the derivative to tame sensor noise, clamping the integral (anti-windup) so it can’t run away during saturation, and limiting the actuator command to its feasible range. These tweaks make a textbook PID behave robustly on real hardware.*

  As presented in the last sections and in the last video, basic PID loop is good but it works only in ideal systems.  real systems need a few upgrades to behave robustly. Your task is, therefore, to make the PID you designed previously more robust by fillin g in the missing pieces to implement:

<div style="margin-left: 0.5rem;" markdown="1">

1. **First-order low-pass on the derivative**

   The raw derivative `edot` is very sensitive to measurement noise. To reduce this effect, we use a
   *filtered* derivative `edot_f`. Update it at each time step as follows:

   $$
   \alpha = \frac{dt}{\tau + dt}
   $$

   $$
   \text{edot\_f} \;\leftarrow\; (1-\alpha)\,\text{edot\_f} + \alpha\,\text{edot}
   $$

   - $\tau$ is the **filter time constant**. A small $\tau$ reacts quickly but lets more noise through; a large $\tau$ is smoother but slower.  
   - $\alpha$ is a weight in $(0,1)$ that blends the previous filtered value and the new raw derivative.  

2. **Limit the integral (anti-windup).** Clamp `eint` to `[eint_min, eint_max]` to prevent windup when the actuator saturates or the setpoint is far away.
3. **Limit the output (actuator saturation).** Compute `u_unsat`, then clamp to the actuator limits `[umin, umax]`. This pairs naturally with integral limiting.


</div>

<div style="background-color:#f8f8f8; padding:12px; border-radius:6px; font-family: monospace; white-space:pre;">
eint   = 0<br>
eprev  = 0<br>
edot_f = 0<br><br>

<span style="color:#008000;"># Tunables</span><br>
tau = 0.05             &nbsp; <span style="color:#008000;">    # derivative filter time constant (s)</span><br>
umin, umax = -1.0, 1.0            &nbsp; <span style="color:#008000;">  # actuator limits</span><br> 
eint_min, eint_max = -0.5, 0.5    &nbsp; <span style="color:#008000;">  # integral limits</span><br><br>

repeat every dt seconds { <br>
  &nbsp; e    = desired - read_sensor()<br>
  &nbsp; edot = (e - eprev) / dt<br><br>

  &nbsp; <span style="color:#008000;"># (1) First-order low-pass filter on the derivative</span><br>
  &nbsp; alpha = 
  <select id="alpha" style="width: 220px;">
    <option value="">[...]</option>
    <option value="dt / (tau + dt)">dt / (tau + dt)</option>
    <option value="tau / (tau + dt)">tau / (tau + dt)</option>
    <option value="dt / tau">dt / tau</option>
  </select><br>
  &nbsp; edot_f = 
  <select id="edotf" style="width: 380px;">
    <option value="">[...]</option>
    <option value="(1 - alpha) * edot_f + alpha * edot">(1 - alpha) * edot_f + alpha * edot</option>
    <option value="alpha * edot_f + (1 - alpha) * edot">alpha * edot_f + (1 - alpha) * edot</option>
    <option value="edot">edot</option>
  </select><br><br>

  &nbsp; <span style="color:#008000;"># (2) Integrate + clamp (anti-windup)</span><br>
  &nbsp; eint = eint + e * dt<br>
  &nbsp; eint = 
  <select id="clampI" style="width: 380px;">
    <option value="">[...]</option>
    <option value="max(eint_min, min(eint, eint_max))">max(eint_min, min(eint, eint_max))</option>
    <option value="min(eint_min, max(eint, eint_max))">min(eint_min, max(eint, eint_max))</option>
    <option value="eint">eint</option>
  </select><br><br>

  &nbsp; <span style="color:#008000;"># (3) Compute unsaturated control</span><br>
  &nbsp; u_unsat = Kp * e + Ki * eint + Kd * edot_f<br><br>

  &nbsp; <span style="color:#008000;"># (4) Apply actuator saturation</span><br>
  &nbsp; u = 
  <select id="clampU" style="width: 320px;">
    <option value="">[...]</option>
    <option value="max(umin, min(u_unsat, umax))">max(umin, min(u_unsat, umax))</option>
    <option value="min(umin, max(u_unsat, umax))">min(umin, max(u_unsat, umax))</option>
    <option value="u_unsat">u_unsat</option>
  </select><br><br>

  &nbsp; eprev = e<br>
  &nbsp; send_control(u)<br>
}
</div>

<button class="check-button" onclick="checkHardenedPID()">Check Answer</button>
<div class="feedback" id="hardened-feedback" style="margin-top: 12px; font-weight: bold;"></div>

<script>
function checkHardenedPID() {
  const ok =
    document.getElementById("alpha").value  === "dt / (tau + dt)" &&
    document.getElementById("edotf").value  === "(1 - alpha) * edot_f + alpha * edot" &&
    document.getElementById("clampI").value === "max(eint_min, min(eint, eint_max))" &&
    document.getElementById("clampU").value === "max(umin, min(u_unsat, umax))";

  const feedback = document.getElementById("hardened-feedback");
  if (ok) {
    feedback.innerHTML = "✅ Correct. Your PID now includes derivative filtering, anti-windup, and actuator saturation.";
    feedback.style.color = "green";
  } else {
    feedback.innerHTML = "❌ Not quite. Revisit the filter update, the integral clamp, and the saturation clamp.";
    feedback.style.color = "red";
  }
}
</script>

<details markdown="1">
<summary><strong>Solution</strong></summary>

```python
eint   = 0
eprev  = 0
edot_f = 0

# tunables
tau = 0.05
umin, umax = -1.0, 1.0
eint_min, eint_max = -0.5, 0.5

repeat every dt seconds {
    e    = desired - read_sensor()
    edot = (e - eprev) / dt

    # 1) derivative low-pass (first-order)
    alpha  = dt / (tau + dt)              # 0 < alpha < 1
    edot_f = (1 - alpha) * edot_f + alpha * edot

    # 2) integrate + clamp (anti-windup)
    eint = eint + e * dt
    eint = max(eint_min, min(eint, eint_max))

    # 3) unsaturated control
    u_unsat = Kp * e + Ki * eint + Kd * edot_f

    # 4) actuator saturation
    u = max(umin, min(u_unsat, umax))

    eprev = e
    send_control(u)
}
```
Derivative filtering tempers noise sensitivity; integral clamping prevents runaway accumulation during saturation; and output limits keep the command feasible. Together they make the discrete PID behave robustly on hardware.
<hr>
</details>

<!--
As previously discussed, the derivative term of a PID controller is highly sensitive to and amplifies high-frequency noise present in the error signal or the sensor measurements. This amplification can result in erratic, "chattering" control actions, increased wear and tear on actuators, and potentially destabilize the system. To address this issue, a low-pass filter is almost universally applied to the derivative term.

A common implementation involves using a first-order low-pass filter. The derivative action is then calculated either from a filtered version of the error or directly from the filtered error signal itself. This is often represented as:

$$ G_D(s) = \frac{T_d s}{1 + \alpha T_d s} \quad \text{or} \quad G_D(s) = \frac{D_s}{1 + T_f s} $$

Where $\alpha$ (a small constant, typically 0.05 to 0.2) or $T_f$ (filter time constant) determines the cutoff frequency of the filter. A smaller $\alpha$ or $T_f$ allows more high-frequency components through, making the derivative action faster but more susceptible to noise. Conversely, a larger value smooths the derivative action but introduces more lag into the control loop.

<figure>
  <img src="https://i.imgur.com/example_deriv_filter_diagram.png" alt="Block diagram of a PID controller with a filter on the derivative term">
  <figcaption><center><em>A block diagram of a PID controller incorporating a low-pass filter on the derivative term to reduce noise amplification.</em></center></figcaption>
</figure>
-->

<!--#### 5.4 Cascaded Control Loops (Optional)

For more complex systems, particularly those exhibiting multiple levels of dynamics (e.g., a motor's fast current loop, a slower velocity loop, and an even slower position loop), **cascaded control loops** are a powerful and widely adopted control architecture.

<figure>
  <img src="https://i.imgur.com/example_cascade_control.png" alt="Block Diagram of a Cascade Control System">
  <figcaption><center><em>A block diagram illustrating a cascade control system with inner and outer loops. (Similar to "0@pdf_1664808499882.pdf", page 67)</em></center></figcaption>
</figure>

In a cascade control system:
* An **inner loop** (or secondary loop) is designed to control a faster, more immediate process variable (e.g., motor current or velocity). This loop typically has a much larger bandwidth and responds very quickly to disturbances.
* An **outer loop** (or primary loop) controls a slower, primary process variable (e.g., robot arm position or end-effector force). Crucially, the output of the outer loop controller serves as the setpoint for the inner loop.

**Advantages of Cascade Control**:
* **Improved Disturbance Rejection**: The inner loop can quickly detect and reject disturbances before they have a significant impact on the main process variable controlled by the outer loop.
* **Better Tracking**: Each loop can be tuned relatively independently to optimize its performance, leading to better overall tracking of desired trajectories.
* **Easier Tuning**: Complex systems are decomposed into simpler, more manageable sub-systems, making the tuning process more straightforward compared to tuning a single, complex PID controller for the entire system.
* **Protection and Limiting**: Internal signals can be limited by saturation blocks within the inner loops, providing inherent protection against excessive commands and ensuring safe operation.

<figure>
  <img src="https://i.imgur.com/example_position_cascade.png" alt="Example of a position control system with cascade loops">
  <figcaption><center><em>An example of a position control system using cascaded loops, typically with an inner velocity/current loop and an outer position loop.</em></center></figcaption>
</figure>

#### 5.5 Discrete Systems and Digital Implementation (Optional)

While PID controllers are often conceptualized using continuous-time mathematics, the vast majority of modern control systems are implemented digitally using microcontrollers, Digital Signal Processors (DSPs), or industrial PCs. This implies that continuous-time signals are sampled at discrete time intervals, and the control algorithm is executed as a series of calculations at these specific moments.

The continuous PID equation must be converted into a discrete-time equivalent for digital implementation. Common approximation methods for integration and differentiation include:
* **Rectangular Approximation (Euler)**: This is a simple method where integration is approximated by summation and differentiation by finite differences.
* **Trapezoidal Approximation (Tustin or Bilinear Transform)**: Generally provides better accuracy for integration compared to the rectangular method, particularly for faster sampling rates.

The choice of **sampling rate** (how frequently the system measures inputs and updates outputs) is crucial. A sampling rate that is too slow can lead to loss of information, resulting in poor control performance, instability, or aliasing effects. Conversely, an excessively fast sampling rate can increase computational burden without providing significant benefits in control accuracy, and may even introduce new challenges related to noise and quantization. Careful consideration of the system dynamics and available computational resources is essential for selecting an appropriate sampling rate.
-->

<!--
pas intro to control, I want very quickly say what is a control system and why is it useful and then directly open loop vs closed loop and here intro in details  ---- Done
and link it to the 45mn of colin jones, control towards PID
open and closed loop -- Done 
requirements of closed loop -- Done
so what's inside this black box that meets these requierements -- Intuition video de matlab
Ok let's go deeper and understand each part more thourghouly
Proportional controller (6mn du chinois)
  How to calculate this steady state error ? 
    in general : how to calculate error, explain quickly final value theorem and mettre les trucs ed karimi ou détailler tout ça dans les requirements
Integrative controller (chinois)
  No steady state error but does it mean we don't have error at all ?
DErivative action

Practical implementation :
 ZN nichols tuning
 Anti windup
 noise filtering
-->


<!--
This can be useful for PID tuning + code + critically damped
https://www.youtube.com/watch?v=tFVAaUcOm4I

https://www.youtube.com/watch?v=wkfEZmsQqiA&list=PLn8PRpmsu08pQBgjxYFXSsODEF3Jqmm-y
-->

# Do you want to try a more complex simulation ?

For those who enjoyed experimenting with the simple second-order system, here is a chance to push things further.  
This interactive **cart–pole PID balancer** lets you test your controller design on a much more challenging system: balancing an inverted pendulum.  

[Try the simulation here](https://sparshg.dev/pid-balancer/) (source code available on [GitHub](https://github.com/sparshg/pid-balancer/)).  

<figure>
  <img src="{{ site.baseurl }}/assets/images/pid/cartpole.jpg" alt="https://github.com/sparshg/pid-balancer/">
  <figcaption><center><em>Interactive cart–pole PID balancer</em><br><sub>Source: https://github.com/sparshg/pid-balancer/</sub></center> </figcaption>
</figure>

The appeal of this simulation is that it exposes you to **many parameters** you can tune in real time: PID gains, cart mass, pole length, and more. Each change produces an immediate and often dramatic effect on stability.  
It is not only fun to play with, but also an excellent way to build intuition about how parameter choices interact with system dynamics in a real-world–like scenario.  

# Do you want to implement a real project ?
![PID Control Explained: The Ultimate Guide from Basics to Implementation](https://www.youtube.com/watch?v=osd7jbJpGLA)  
> <sub>*Circuit Helper (2024). PID Control Explained: The Ultimate Guide from Basics to Implementation. YouTube video, Dec. Available at: https://www.youtube.com/watch?v=osd7jbJpGLA*</sub>  
>
> *This project demonstrates how to implement a practical PID controller using a Raspberry Pi Pico, a resistive heater, and a thermocouple. By tuning the constants `Kp`, `Ki`, and `Kd`, you can directly observe overdamped, underdamped, and critically damped system responses.*  

Having completed this course, you now have all the foundations needed to bring PID control to life in a real system. This project is the perfect way to put your knowledge into practice: you will see the theory from the lectures applied directly to hardware, and experience how tuning the controller affects the behavior of a real process.  

The setup requires only simple and affordable components such as a **Raspberry Pi Pico (or ESP32 alternatives), a resistive heater, and a thermocouple sensor**, along with basic prototyping gear like a breadboard and jumper wires. If you’d like to find direct links to these components, check the [description of the video](https://www.youtube.com/watch?v=osd7jbJpGLA).  

This is your opportunity to take the concepts you’ve mastered and transform them into hands-on skills. Try it out, experiment with the tuning, and experience PID in action for yourself!  


<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="pid_simulator.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        initializePIDSimulator('pid-simulator-1');
        initializePIDSimulator('pid-simulator-2');
        initializePIDSimulator('pid-simulator-3');
        initializePIDSimulator('pid-simulator-4');
    });
</script>

# Credits  

This course was created by **Salim Boussofara, MSc in Robotics at EPFL**, and funded by **IEEE RAS** and **EPFL**.  

It makes use of selected material from:  

- K. J. Åström and T. Hägglund, Advanced PID Control. ISA, 2006. [Online]. Available: https://skoge.folk.ntnu.no/puublications_others/books/Åstrom-2006_Advanced%20PID%20Control/3.PID%20Control.pdf
- Y. Li, K. H. Ang, and G. C. Y. Chong, “PID control system analysis and design”, IEEE Control Systems Magazine, vol. 26, no. 1, pp. 32–41, 2006. Available: https://eprints.gla.ac.uk/3815/  
- L. Llamas, “Control theory: Arduino PID controller”. Available: https://www.luisllamas.es/en/control-theory-arduino-pid-controller/


It has also been inspired by: 
- A. Karimi, Feedback Control Systems, Lecture notes for Control Systems and Discrete-Time Control, EPFL, Fall 2022.
