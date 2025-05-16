---
title: DS-planning
parent: Courses
layout: default
math: mathjax
---
<!-- Link external JavaScript file -->
<script src="questions.js"></script>

# Dynamical-Systems-Based Planning {#start}

- Table of Contents
{:toc}


### Books

- [Learning for Adaptive and Reactive Robot Control: A Dynamical Systems Approach ](https://www.epfl.ch/labs/lasa/mit-press-book-learning/) (Chapter 9. Obstacle avoidance with Dynamical Systems)

## Prerequisites
* Basic knowledge of Dynamical system (DS)
* Control theory, system stability
* diffeomorphic mapping

## Motivation
![Overview](https://www.youtube.com/watch?v=9fQkLQZe3u8&ab_channel=SteveBrunton)

In **trajectory planning** problems, the robot’s objective is to generate smooth, stable, and goal-directed motions that can adapt to changes in the environment or task — beyond simply following a fixed path. This is where **dynamical systems (DS)** offer a powerful framework: instead of relying on time-parameterized trajectories, DS-based approaches define a continuous vector field that governs the robot’s motion toward a target.

While the idea of using DS may appear conceptually simple, it provides a flexible and reactive foundation for robot motion generation. A key advantage lies in its ability to generalize to different start positions, adapt online to perturbations, and naturally handle convergence, stability, and obstacle avoidance within a unified structure.

This is why, in recent years, dynamical system-based methods have gained prominence in robotic motion planning and control, particularly in scenarios requiring real-time adaptation. In industrial robotics, DS approaches have been successfully applied to tasks such as surface finishing, spraying, and assembly, where motion must adapt to variations in the environment. In physical human-robot interaction, DS frameworks also enable robots to generate compliant and predictable motions that respond continuously to human inputs — making shared control and learning from demonstration both efficient and intuitive.



<details markdown="1">
<summary><strong>Conceptual Exercise</strong></summary>
**Drag each task to the correct category:**

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
  
  <!-- Serial Robot Zone -->
  <div class="drop-zone" id="motion-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Motion Control</h3>
  </div>

  <!-- Parallel Robot Zone -->
  <div class="drop-zone" id="force_zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3> Force Control</h3>
  </div>
</div>

<!-- Draggable items -->
<div class="drag-container" id="drag-items">
  <div class="drag-item" id="pick_place" draggable="true" ondragstart="drag(event)">Pick-and-place in free space</div>    <div class="drag-item" id="Peg_in_hole" draggable="true" ondragstart="drag(event)">Peg-in-hole assembly</div>
  <div class="drag-item" id="Wiping" draggable="true" ondragstart="drag(event)">Wiping a window</div>
  <div class="drag-item" id="3D_print" draggable="true" ondragstart="drag(event)">3D printing</div>
  <div class="drag-item" id="Drone" draggable="true" ondragstart="drag(event)">Flying a drone for inspection</div>
  <div class="drag-item" id="Polishing" draggable="true" ondragstart="drag(event)">Surface polishing</div>
  <div class="drag-item" id="hand_shaking" draggable="true" ondragstart="drag(event)">Human handshaking robot </div>
</div>

<script>
const correctMapping = {
  "motion-zone": ["pick_place", "3D_print", "Drone"],
  "force_zone": ["Peg_in_hole", "Polishing", "hand_shaking", "Wiping"]
};
</script>

<!-- Trigger + Feedback -->
<button class="check-button" onclick="checkDragDropAnswer(correctMapping, 'feedback-drag')">Check Answer</button>
<div class="feedback" id="feedback-drag"></div>


<details markdown ="1">
  <summary><strong>Detailed answer</strong></summary>

  * **Force control :**
    - Peg-in-hole assembly : without force control, the peg might jam or break if misaligned; force control lets the robot feel contact and adjust insertion force to guide it in. 
    - Surface polishing : a position-only robot might either press too hard (damaging the surface/tool) or too lightly (ineffective polishing); force control maintains a consistent polishing pressure. 
    - Human handshaking robot : purely position-controlled handshake could crush the person’s hand or miss it entirely, whereas force control allows gentle, adaptive gripping. 
    - Wiping a table or window : Maintaining consistent contact pressure across a surface is difficult with pure motion control; uneven force leads to missed spots or excess wear.

  * **Motion control :**
    - Pick-and-place in free space : If there’s no contact with the environment during transit, motion control ensures fast, smooth, and precise movement.
    - 3D printing : The tool follows a precisely planned trajectory to deposit material. Contact with the environment is minimal and highly predictable.
    - Flying a drone for inspection : Drones typically avoid contact; path following through motion control is sufficient for inspection unless manipulation is involved.

  → Force control prevents excessive force and adapts to uncertainties in contact

</details>

</details>

## Chapter 1 : Interaction control overview



[Back to Top](#start)