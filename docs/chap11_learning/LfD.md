---
title: Learning from Demonstrations
parent: Courses
layout: default
math: mathjax
---
<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

# Learning from Demonstration {#start}
By [Ahalya Prabhakar]([[url](https://robotics.sydney.edu.au/our-people/)]) 
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


- Table of Contents
{:toc}

## Prerequisites
* Linear Algebra and multivariable calculus
* Classical Dynamics 
* Robotics (Optional, for Implementation)
  - Motion Planning and Optimal Control 
  - Basic Machine Learning and Reinforcement Learning

# Motivation

Enabling robots to learn to autonomously perform new tasks from scratch (i.e., without any prior knowledge) can be extremely difficult, particularly when trying to encode complex behaviors into generalized controllers that can generate successful performance even from new states. To solve this, **Learning from Demonstration (LfD)** enables robots to learn how to autonomously perform a task by observing and imitating a set of successful, expert demonstrations.

Because these methods do not require users to manually construct, encode and program task objectives and resulting motion planners and controllers, these methods allow novice users who do not necessarily have background in programming or robotics to successfully demonstrate and "teach" a robot how to perform novel tasks by simply providing task demonstrations. These methods are particularly useful for tasks that are difficult to formally define or engineer by experts. Furthermore, when these methods are successfully implemented into a robotic system, they provide a easy way to program new tasks or behaviors to the robot without expert (robotic) knowledge.

Learning from demonstration encompasses a wide range of research topics and methods, including Learning from Demonstration (LfD), imitation learning, programming by demonstrations (PbD), and inverse reinforcement learning (IRL) methods. A key goal of all LfD methods is to learn some form of generalized encoding (e.g., a controller, policy) of how to successfully perform a task. Different methods learn different encodings to generalize performance, as will be discussed later, but fundamentally LfD methods do not simply replay a demonstration, but generalize from the set of demonstrations how to perform the task. 

Before delving into details on the different types of methods, we will first cover some basics that applies to all methods. 


# Foundations of Learning from Demonstration

**LfD methods are primarily data-driven methods that seek to how to perform a task from observations of successful demonstrations.** They can do so either by directly learning a motion plan or policy, or inferring the task objective function which is then used to generate an optimal policy.

## Basic LfD Formulation

### Nomenclature and Notation

Depending on whether the LFD problem is formulated from a optimal control (Pontryagin) or reinforcement learning (Bellman) perspective, the notation will differ, though they are analagous. Both notations are provided below: 
<table>
  <tr>
    <th>Notation</th>
    <th>Optimal Control (Pontryagin)</th>
    <th>Reinforcement Learning (Bellman)</th>
  </tr>
  <tr>
    <td>State at time $t$</td>
    <td>$$x_t$$</td>
    <td>$$s_t$$</td>
  </tr>
  <tr>
    <td>Action at time $t$</td>
    <td>$$u_t$$</td>
    <td>$$a_t$$</td>
  </tr>
    <tr>
    <td>Task Objective Function</td>
    <td>Cost Function: $J(x_t,u_t)$</td>
    <td>Reward Function: $r(s_t,a_t)$</td>
  </tr>
  <tr>
    <td>Dynamics</td>
    <td>$x_{t+1} = f(x_t,u_t)$ or $p(x_{t+1} | x_t, u_t)$ </td>
    <td>$$p(s_{t+1} | s_t,a_t)$$</td>
  </tr>
    <tr>
    <td>Observations</td>
    <td>n/a </td>
    <td>$o_t$</td>
  </tr>
    <tr>
    <td>Demonstrations</td>
    <td>$D = [(x^n_t, u^n_t)]$ for $t \in [0,T]$ for $N$ demonstrations </td>
    <td>$D = [(s^n_t, a^n_t)]$ for $t \in [0,T]$ for $N$ demonstrations </td>
  </tr>
  <tr>
    <td>Optimal Action (to be learned)</td>
    <td>Optimal Control: $u^*(x)$ </td>
    <td>Learned Policy: $\pi_\theta(a|s)$ **or** learn reward parameters $r_\psi(s,a)$ and use to learn optimal policy $\pi^*(a|s)$ </td>
  </tr>
</table>

The general problem formulation for LfD is as follows: 
1. Given the expert demonstration data set $D$, consisting of a list of state-action pairs ($(s,a)$ or $(x,u)$)
2. Solve for the optimal task policy $\pi^*(s)$ that matches the expert demonstrations. This can be done either by:  
* Solving for the reward function $R(s,a)$, then using that to generate the optimal policy $\pi(s)$ 
* or directly solving for $\pi(s)$ that best matches the expert demonstrations. 

All methods involve some form of learning through a minimization problem that minimizes the distance between the reference expert demonstration actions and the output of the learned policy. Defining the learned parameters representing the task and resulting policy depends on the type of method used and how it represents the task and policy. For now, we will just call them $\theta_R$. 
Then, we can define the problem as: 

$ \underset{\theta_R}{\text{minimize}} \qquad \text{distance}(a_{d}(s_{d})-\pi(s))$,

 where $(a_d, s_d)$ reflect the expert state-action pairs and some distance measure (e.g. L2-norm, NN loss functions) are used to match the expert and learned policy outputs. 


Learning from demonstration methods use two main steps: 

1.  Gathering Demonstration dataset $D$
2. Learning from the data to generate a task policy $\pi(s)$

If and how the method specifies the two phases of the data collection determines the following properties of the method.  

## Data-Gathering Methods

Because demonstration learning methods are fundamentally data-driven learning approaches, one of the main topics when designing LfD paradigms is data collection. Demonstration Data collection methods fall into three main categories, each with their own pros and cons: 
* **Kinesthetic Teaching**: user physically moves the robot
* **Teleoperation**: user controls the robot through interface
* **Observational learning**: robot learns from observations of
demonstration

### Kinesthetic Teaching

<p style="width: 90%; margin: 0 auto; /* Center the paragraph if it's narrower than its container"> 
    <img src="{{ site.baseurl }}/assets/images/LfD/minigolf_kinesthetic.png" alt="Kinesthetic Teaching of Robot Demonstrations with a Robot Arm Playing Minigolf" title="Kinesthetic Teaching of Robot Demonstrations for Playing Minigolf" style="margin-bottom:10px;"> <br />
Kinesthetic Teaching of Robot Demonstrations for Playing Minigolf. User physically moves the robot through successful task execution to generate a demonstration (Image Source: Khansari-Zadeh,
et al. Learning to play minigolf: A dynamical system-based approach. Advanced Robotics (2012). <a href=" https://doi.org/10.1080/01691864.2012.728692"> DOI </a>)
</p>

The first category of data collection is kinesthetic teaching methods, where the user physically moves robot to generate demonstrations. Because these demonstrations directly record the motions of the robot using its onboard sensors (e.g., joint states and joint torques), a major benefit of kinesthetic teaching is no mapping or correspondence is needed between the demonstration data and the robot motion control itself. 

However, one of main drawbacks of kinesthetic teaching are that it can be cumbersome for the user to physically move the robot in the desired motion. Because the user needs two arms to move one robot arm, it can be challenging for the user to do so in a fluid motion and demonstrating bimanual tasks can be challenging. Dextrous manipulation tasks that require finger control can also be difficult to move and demonstrate in kinesthetic settings. Furthermore, it can be difficult or unintuitive for novice users to generate demonstrations, particularly for high degree of freedom (DOF) or complex dynamical systems. These dynamical systems can be difficult for users to relate to the kinematics and dynamics of the human motion, making generating desired robot motion difficult.

### Teleoperation
In teleoperation, the user controls the robotic system through an interface. Similar to kinesthetic teaching, the demonstrations directly record the robot states through its onboard sensors (e.g., joint angles and torques); however, the experimental design requires developing an interface from user inputs to robot motion and control. The ease of use of the robotic systems, and the resulting quality of the demonstration dataset, can be directly affected both by the user's experience with the teleoperated robotic system and the design of the interface. 

These systems allow the demonstrator to control the robotic system from a distance or even remote locations, allowing users to not be physically present with the robot to provide demonstrations. In addition, these methods facilitate safe control for users when controlling heavy machinery that could be dangerous to users in close proximity, as well as enabling control for tasks where the robotic system needs to move over distances, such as when teaching motion patterns or navigation.   

<p style="width: 90%; margin: 0 auto; /* Center the paragraph if it's narrower than its container"> 

<img src="{{ site.baseurl }}/assets/images/LfD/UR_joystick.jpg" alt="Universal Robots Wiretank
Joystick" width="30%" style= "display:inline-block;"> 
<img src="{{ site.baseurl }}/assets/images/LfD/davinci_surgical.jpg" alt="Da Vinci Surgical Robot System" width="30%" style= "display:inline-block;"> 
<img src="{{ site.baseurl }}/assets/images/LfD/capio_exoskeleton.jpeg" alt="Capio Dual-Arm Exoskeleton" width="30%" style="display:inline-block;"> 
<br/>
Teleoperation interfaces used to control robots can range from simple joysticks (<b>Left</b>: <a href= "https://www.universal-robots.com/marketplace/products/01tP40000071Nk1IAE/"> Universal Robots Wiretank Joystick</a>) and tablet interfaces to complex  interfaces, including surgical robots (<b>Middle</b>: <a href="https://www.intuitive.com/en-us/products-and-services/da-vinci"> Da Vinci Surgical Robot System</a>) and exoskeletons (<b>Right</b>: <a href="https://robotik.dfki-bremen.de/en/research/projects/capio"> Capio Dual-arm Exoskeleton</a> ).
</p>

Common interfaces for teleoperation include joysticks, graphical interfaces, haptic interfaces, or more complex multimodal interfaces. Common examples of teleoperation interfaces include: 

* **Joysticks** are typically used to directly control the motion of the system, either through direct joint control or through end-effector motion control in conjunction with an inverse dynamics controller. 
* **Graphical interfaces**, such as tablet interfaces, can be used to control a robot by either mimicking the motion on the tablet surface (e.g., such as ``drawing'' the desired motion in space for the system to follow) or by communicating high-level information (abstract or symbolic information) to the robotic system.
* **Haptic interfaces**, where a teleoperation interface (such as a joystick is combined with haptic force-feedback sensors) are considered bilateral interfaces that both send motion information to the robotic system and provide haptic force-feedback to the user. These are particularly useful in tasks where force-feedback is critical, such as in teloperated surgical robots. 
* Finally, teleoperation interfaces can be more complex devices, combining complex dynamical motion interfaces, such as **exoskeletons**, with multimodal sensor systems (vision, haptic, etc.) to give realistic, real-time feedback to the user. 

**Shadowing** is a subset of teleoperation demonstration gathering, where the robot mimics or shadows the demonstrator's motions, typically through some type of motion capture interface, and the **robot's** motions are recorded as demonstration data. With these interfaces, the demonstrator does not need familiarity with interacting with or controlling the robotic system. Instead, the human demonstrator independently performs the task and the robot follows the motions. This requires the mapping between the motion capture sensors on the human and the robot joint motions to be defined such that the robot can move analogously to the human user, such as with a humanoid robot or haptic wearable glove.

<p style="width: 90%; margin: 0 auto; /* Center the paragraph if it's narrower than its container"> 
    <img src="{{ site.baseurl }}/assets/images/LfD/capio_exoskeleton.jpeg" alt="Capio Dual-Arm Exoskeleton" width="45%" style="display:inline-block;"> 
        <img src="{{ site.baseurl }}/assets/images/LfD/touchdiver_haptic_glove.png" alt="WEART TouchDIVER G1 haptic glove for Manipulation" width="45%" style="display:inline-block;"> <br/>

Shadowing interfaces, including the <b>Left</b>: <a href="https://robotik.dfki-bremen.de/en/research/projects/capio"> Capio Dual-arm Exoskeleton </a> and <b>Right: </b> <a href="https://weart.it/haptic-vr-products/touchdiver-haptic-glove/"> WEART TouchDIVER G1 haptic glove</a>  shown here, require some form of mapping from the demonstration sensors to the robotic system during recording, so that the robotic system shadows the demonstrator’s motions and the robot motion is directly recorded as demonstrations.

</p>
### Observational Learning

<p style="width: 90%; margin: 0 auto; /* Center the paragraph if it's narrower than its container"> 

<img src="{{ site.baseurl }}/assets/images/LfD/dexpilot_vision_lfd.png" alt="DexPilot: Vision-based Learning using only Visual Camera Feedback " width="90%" style= "display:inline-block;"> 
<br/>
<img src="{{ site.baseurl }}/assets/images/LfD/dexcap_motioncapture.png" alt="DexCap: Motion Capture for Dextrous Manipulation" width="45%" style= "display:inline-block;"> 
<img src="{{ site.baseurl }}/assets/images/LfD/dexcap_hand.png" alt="DexCap Hand: mapping from human
to robot hand" width="45%" style="display:inline-block;"> 
<br/>
Observational learning interfaces can include vision, wearable, and other motion capture devices. All require some form of embodiment mapping from the demonstration sensor data to the robotic system. <b>Top:</b> <a href= "https://doi.org/10.1109/ICRA40945.2020.9197124"> DexPilot </a>: Vision-based Learning using only Visual Camera Feedback. <b>Bottom:</b> <a href="https://dex-cap.github.io/"> DexCap </a> Hand Motion Capture for Manipulation. <b>(Bottom Left)</b> A combination of hand pose data from the haptic gloves and visual feedback from the camera on the chest is used to collect demonstration data. <b>(Bottom Right)</b> Embodiment Mapping from human hand data from glove to 4-finger robotic hand. 
</p>

With observational learning methods, the robot learns by observing the task being done successfully and learns from "watching" these demonstrations. The observations are typically of human demonstrations, but may also be from another robotic system successfully performing the task. The key characteristic of these methods is that the learning is based on observations of these demonstrations, without any physical guidance of the robot's motions themselves. As such, acquiring demonstrations can be easy for the demonstrator, as no familiarity with the robotic system may be necessary. Furthermore, since these demonstrations need not be acquired with the robotic system, demonstrations can be acquired from remotely, making it easy to acquire larger numbers of demonstrations. 

The demonstrations can be recorded through a number of motion tracking mediums--- vision, wearable devices, exoskeletons, standard motion tracking systems (e.g., Optitrack, Microsoft Kinect). However, these methods require a good mapping between the observational data and the kinematics of the robotic system. If the kinematics between the observations and system are similar, for example between human demonstrations collected using a motion tracking system and a humanoid robot, the mapping can be more easily solved. However, if the dynamics are significantly different, the mapping can be hard to solve for--- this is known as the **correspondence problem**, discussed further below. 

<details markdown="1">

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Data Collection Methods – Dropdown Table</title>
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

<table>
  <thead>
    <tr>
      <th>Data Collection Type</th>
      <th> Demonstration Data Mapping Required</th>
      <th>Familiarity with Robot System Needed</th>
      <th>Remote Collection Possible</th>
    </tr>
  </thead>
  <tbody>
    <!-- Kinesthetic Teaching -->
    <tr>
      <td><strong>Kinesthetic Teaching</strong></td>
      <td><select data-answer="Not Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Not Possible" class="answer">
        <option value="">-- Select --</option>
        <option>Possible</option>
        <option>Not Possible</option>
      </select></td>
    </tr>
    <!-- Teleoperation -->
    <tr>
      <td><strong>Teleoperation</strong></td>
      <td><select data-answer="Not Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Possible" class="answer">
        <option value="">-- Select --</option>
        <option>Possible</option>
        <option>Not Possible</option>
      </select></td>
    </tr>
        <!-- Shadowing -->
    <tr>
      <td><strong>Shadowing</strong></td>
      <td><select data-answer="Not Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Not Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Possible" class="answer">
        <option value="">-- Select --</option>
        <option>Possible</option>
        <option>Not Possible</option>
      </select></td>
    </tr>
        <!-- Observational Learning -->
    <tr>
      <td><strong>Observational Learning</strong></td>
      <td><select data-answer="Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Not Required" class="answer">
        <option value="">-- Select --</option>
        <option>Required</option>
        <option>Not Required</option>
      </select></td>
      <td><select data-answer="Possible" class="answer">
        <option value="">-- Select --</option>
        <option>Possible</option>
        <option>Not Possible</option>
      </select></td>
    </tr>
  </tbody>
</table>

<button onclick="checkDropdownAnswers('dropdown-feedback')">Check Answers</button>
<p id="dropdown-feedback" style="font-weight: bold; margin-top: 10px;"></p>

<em><sub>This table was based on Table 1 from:Ravichandar, Harish, et al. "Recent advances in robot learning from demonstration." Annual review of control, robotics, and autonomous systems 3.1 (2020): 297-330. ![doi](https://doi.org/10.1146/annurev-control-100819-063206)</sub></em>

</body>
</html>

<summary><strong>Conceptual Exercise</strong></summary>
**Drag each type of demonstration interface example to the correct LfD Data Collection category:**

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
  <div class="drop-zone" id="kinesthetic-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Kinesthetic Teaching</h3>
  </div>

  <!-- Parallel Robot Zone -->
  <div class="drop-zone" id="teleop_zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3> Teleoperation </h3>
  </div>

  <!-- Parallel Robot Zone -->
  <div class="drop-zone" id="observational_zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3> Observational Learning</h3>
  </div>
</div>

<!-- Draggable items -->
<div class="drag-container" id="drag-items">
  <div class="drag-item" id="exoskeleton" draggable="true" ondragstart="drag(event)">Exoskeleton Interface to control and collect Humanoid Robot Motion</div>
  <div class="drag-item" id="camera" draggable="true" ondragstart="drag(event)"> Camera Recordings of Demonstration</div>
  <div class="drag-item" id="compliant_control" draggable="true" ondragstart="drag(event)">Robot Compliant Control Interface</div>   
  <div class="drag-item" id="motion-track" draggable="true" ondragstart="drag(event)"> Human Motion tracking with Kinect</div>
  <div class="drag-item" id="haptic-glove-recording" draggable="true" ondragstart="drag(event)">Haptic Wearable Glove to record human hand pose data during manipulation</div>
  <div class="drag-item" id="haptic-glove-teleop" draggable="true" ondragstart="drag(event)">Haptic Wearable Glove to move and record robot gripper pose data during manipulation</div>
</div>

<script>
const correctMapping = {
  "kinesthetic_zone": ["compliant_control"], 
  "teleop_zone": ["exoskeleton", "haptic-glove-teleop"],  
  "observational-zone": ["camera", "motion-track",  "haptic-glove-recording"]
};
</script>

<!-- Trigger + Feedback -->
<button class="check-button" onclick="checkDragDropAnswer(correctMapping, 'feedback-drag')">Check Answer</button>
<div class="feedback" id="feedback-drag"></div>


<details markdown ="1">
  <summary><strong>Detailed answer</strong></summary>

  * **Kinesthetic Teaching:**
    - Robot Compliant Control Interface: With compliant control robot interfaces, users move the robot through the motions to demonstrate successful task performance

  * **Teleoperation:**
    - Exoskeleton Interface for Humanoid Robot: Since the exoskeleton interface directly controls the humanoid robot, this is an example of a teleoperation interface. If the humanoid directly mimics the motion of the exoskeleton, it falls under the **shadowing** subcategory of teleoperation. 
    - Haptic Wearable Glove to move and record robot gripper pose data during manipulation: since the haptic glove is used to move the robot gripper and the  **robot's** end-effector pose is being recorded during demonstration gathering, this falls under the teleoperation category (shadowing sub-category). 

  * **Observational Learning:**
    - Camera Recordings of Demonstration: Because the robot is learning from camera observations of demonstrations and it's motion data is not being collected, this falls under observational learning. To be successful, the robot needs to have a mapping from the visual camera data and its own motion dynamics
    - Human Motion tracking with Kinect: Demonstrations consist of human motion demonstration data (i.e., human pose data). Since the robot is observing the human motions and needs a mapping from the human motion dynamics to its own dynamics, this falls under observational learning. 
    -Haptic Wearable Glove to record human hand pose data during manipulation: since the haptic wearable glove is directly recording human's hand pose (not the robot's) for demonstrations, this falls under observational learning. A mapping is needed from the human hand pose to robot end-effector pose. 
</details>

</details>

## Online vs. Offline Data Collection

One of the main distinguishing features of learning from demonstration methods is when the data collection occurs in the learning process--- i.e., whether it all happens prior to learning, or whether the learning method requires specification of the data collection. The two main categories are: 

* **Offline Learning**: Demonstration dataset is pre-collected initially as prior knowledge and all learning is performed on this dataset, with no further information or data being gathered in the environment. 
* **Online Learning**:  In Online learning (also called Interactive Learning),  demonstration data is collected with active interaction with the demonstrator. Some methods first use a precollected demonstration dataset for initial learning. The model is then updated and refined with interactions with the environment, often using expert feedback and corrections for generating additional demonstrations. Others directly interact with the demonstrator to collect all demonstrations. These can include methods with noise injection to encourage state space exploration or methods that actively query or interact with the user. 

## Learning Goals

Another distinctive feature for categorizing learning from demonstration methods is the **learning goal** of the method. Different methods extract different task representations from the demonstration set in order to ultimately generate a motion policy for robot task success. 

The main categories for learning goals are as follows:  
* **Motion Policy/Trajectory-Learning**: These methods directly learn a motion policy( state-action mapping function for generating desired behavior) or trajectory representation that matches the expert demonstration set. Unlike other methods discussed below, these methods directly learn policies to match the expert demonstrations, without trying to learn an underlying reward function or task objective. 

* **Task/Motion Plan**: These methods learn the highest-level abstraction of task motion or trajectory representation --- a motion plan. They assume some knowledge of available motions or actions that the robotic system can accomplish, such as a library of motion primitives. They use demonstrations to extract the task-relevant skills and actions and learn either a (sequential or hierarchical) motion plan, or set of actions, that when put together accomplishes the task successfully. 

* **Task Objective** : These methods learn the underlying task objective or representation that defines task success, and combine the learned objective function with optimization, control or RL techniques to generate successful policies. 


<head>
  <meta charset="UTF-8" />
  <title>Learning Goals Example</title>
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


<details markdown = "1">
<summary><strong>Conceptual Example</strong></summary>
<strong> Learning a Pick and Place Task with Obstacle Avoidance Task from Demonstrations. </strong> 
Consider the task of teaching a 7DOF Robot Arm a Pick-and-Place Task with Obstacle Avoidance. The diagram below shows an example task setup, where the task is to pick up an object (blue cube) and move it to the target (green x) while avoiding an obstacle (red cube).  A general outline of the LfD Process involves the following: 

<p style="width: 90%; margin: 0 auto; /* Center the paragraph if it's narrower than its container"> 

<img src="{{ site.baseurl }}/assets/images/LfD/Lfd-pickandplace-wdemos2.png" alt="Pick and Place Task Demonstrations on Robot Arm" width="30%" style= "display:inline-block;"> 
<img src="{{ site.baseurl }}/assets/images/LfD/Lfd-pickandplace-wdemos2-flow.png" alt="Learned Task Representation from Demonstrations using LfD Method" width="30%" style= "display:inline-block;"> 
<img src="{{ site.baseurl }}/assets/images/LfD/Lfd-pickandplace-flow-gentraj.png" alt="Novel Trajectory Generation from Learned Task Representation" width="30%" style="display:inline-block;"> 
<br/>
Expert Demonstrations <b>(purple)</b> are gathered for robot to learn a task representation <b>(yellow)</b> that it can use to generate a task motion policy <b>(green)</b>. The form of the learned task representation and resulting motion policy depends on the category of LfD method— examples are provided below.
</p>

<table>
  <thead>
    <tr>
      <th>Learning Goal </th>
      <th> Example Solution</th>
    </tr>
  </thead>
  <tbody>
    <!-- Task Plan  -->
    <tr>
      <td><strong>Task Plan </strong></td>
      <td> Open Gripper $\rightarrow$ Move Down $\rightarrow$ Close Gripper $\rightarrow$ Move Left $\rightarrow$ Move Up $\rightarrow$ Move Down $\rightarrow$ Open Gripper </td>
    </tr>
    <!-- Motion Policy -->
    <tr>
      <td><strong>Motion Policy</strong></td>
      <td> $a = \pi(s)$ function returns optimal action $a$ for a given state $s$; <br/> Example velocity vector field $v(s)$ of Policy $\pi(s)$ depicted in green 
      <img src="{{ site.baseurl }}/assets/images/LfD/Lfd-pickandplace-flow-vfield.png" alt=" Learned Velocity Vector Flow Field for Pick and Place Task" width="45%" style="display:inline-block;"> 
      </td>
    </tr>
        <!-- Task Representation -->
    <tr>
      <td><strong>Task Representation</strong></td>
      <td>  Learned Cost function $R(s,a)$ with task features: (Object distance to target) + (Collision Check with Obstacle) </td>
    </tr>
  </tbody>
</table>

</details>

# Challenges of Learning from Demonstration 
Below, we list some of the basic questions and considerations that we encounter in most LfD problems: 
## Correspondence Problem 
The correspondence problem refers to the problem of relating and learning an appropriate optimal behavior, or state-action mapping, when the kinematics and dynamics of the demonstrator differ from the robot. This problem is specific to cases of observational learning, when the robot must learn from observations of demonstrations, rather than demonstrations performed directly on the robotic system, as with kinesthetic and teleoperation demonstrations. In addition to differences in kinematics and dynamics between the demonstrator and the robotic system, sensor differences between the two can make generating effective mappings challenging. Humans primarily use vision for observations--- which camera sensors that match when recording observations. Robotic systems, on the other hand, may additionally use other sensor types, including sonars, infrared sensors, lasers, that can be easier to process than camera sensor data. 

## Data Sensitivity
An additional consideration in LfD methods is data sensitivity. Optimal policies/motion plans learned are specific to the robot systems (and corresponding dynamics) of that system. As such, even robotic arms that have different dynamics and degrees of freedom, transfer learning methods are needed to convert learned policies from one system to another. In addition, data is environment specific--- particularly relevant when the task involves interacting with and/or manipulating the environment, such as in pick-and-place tasks. Different methods address these issues in different ways, as discussed further below, but some general approaches involve learning task objectives or task features that are specific to the task but can be generalized to different robotic systems and environments. 


<p style="width: 90%; margin: 0 auto; /* Center the paragraph if it's narrower than its container"> 
    <img src="{{ site.baseurl }}/assets/images/LfD/ur5.jpeg" alt="Universal Robots UR5 6DOF Robot" width="45%" style="display:inline-block;"> 
        <img src="{{ site.baseurl }}/assets/images/LfD/Franka-Emika-Research-3.jpg" alt="Franka Emika Research 3 7DOF robot" width="45%" style="display:inline-block;"> <br/>

Two common robot arms (<b>Left:</b> Universal Robots UR5 6DOF Robot, <b>Right:</b> Franka Emika Research 3 7DOF robot) used for manipulation have different degrees of freedom and dynamics making demonstration data transfer between systems challenging. 
</p>

## Task Variability
One of the challenges of learning to perform a task successfully from demonstration is deciding what to learn. For many tasks, there can be multiple ways and motions to accomplish the task. In addition, different tasks can be accomplished using different tools, or forms of the same tools. Deciding what is most useful to learn about the task--- whether it is joint trajectories, end-effector trajectories, task features, objective functions, etc.--- is a crucial consideration in efficiently learning task encodings from demonstrations that can be generalized to new states, robotic systems, and environments.

## Demonstrator Quality
Another consideration for learning from human demonstrations is demonstrator quality. Many LfD methods operate on the assumption that the demonstrations are provided by an **expert demonstrator**--- and as such, the demonstrations (and learned policy) are optimal. However, in many cases, the demonstrator may not provide optimal actions. In cases where the human is interacting with the robotic system to provide demonstrations, through kinesthetic teaching or teleoperation, suboptimality can be due to unfamiliarity with the system or its dynamics. In the case of observational learning, where the robot is directly observing human demonstrations, this may be due to noisy or suboptimal human behaviors. It can also be due to differences in human and robot behaviors, where optimality in human actions is different from optimality in robot behaviors, for example due to differences in their dynamics. Current LfD research methods seek to solve this issue, often through the combination of preference-based learning methods with demonstration quality ranking. 

# LfD Methods Overview

In this section, we will go over some of the current methods, and categories of methods, both historical methods and in the state-of-the-art LfD research. We will provide a brief overview of the methods with citations and resources for further inquiry in each section. 
While we attempt to cover the most important or common methods here, please note that this is not a complete list of all LfD methods. For a deeper look into existing work, we recommend looking at the following survey papers on Learning from Demonstration methods: 

*  **Robot Programming by Demonstration Methods**: Billard, A., Calinon, S., Dillmann, R., Schaal, S.: Robot programming by demonstration. In: Springer Handbook of Robotics, pp. 1371–1394. Springer, 2008. [DOI](https://doi.org/10.1007/978-3-540-30301-5_60)
* **LfD Methods Survey with taxonomy and classification**: Argall, B.D., Chernova, S., Veloso, M., Browning, B.: A survey of robot learning from demonstration. Robotics and autonomous systems 57(5), 469–483 (2009). [DOI](https://doi.org/10.1016/j.robot.2008.10.024)
* **Modern LfD methods**: Ravichandar, H., Polydoros, A.S., Chernova, S., Billard, A.: Recent advances in robot learning from demonstration. Annual review of control, robotics, and autonomous systems 3(1), 297–330 (2020). [DOI](https://doi.org/10.1146/annurev-control-100819-063206)
* **Inverse Reinforcement Learning methods** : Adams, S., Cody, T., Beling, P.A.: A survey of inverse reinforcement learning. Artificial Intelligence Review 55(6), 4307–4346 (2022). [DOI](https://doi.org/10.1007/s10462-021-10108-x) 

The methods will be categorized based on their resulting learned output or learning goal as discussed above. 

## Motion Policy Learning Methods

### Motion Primitives & Dynamical Systems
Motion primitive methods learn robotic actions or motions from demonstrations. Fundamentally, each motion primitive encodes a movement that represents a particular action or skill, such as moving towards a target, screwing/unscrewing, grasping, etc. They typically reflect a motion from a start state to end state, and can be defined with respect only to the robot state (e.g. robot joint configuration) or in relation to goal state/task space (e.g. object state or target location). 

One category of methods use **statistical modeling** to learn motions or encode robot skills. Some use spline-fitting techniques between relevant keyframes to generate desired trajectories, while others use Hidden Markov Models (HMMs), Gaussian Mixture Models (GMMs) and Gaussian Mixture Regression (GMR) to capture the temporal and spatial relations of the motion signals. These signals and their correlations can be described in joint space or task space. Some examples of these methods include:

<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
* Akgun, Baris, et al. "Trajectories and keyframes for kinesthetic teaching: A human-robot interaction perspective." Proceedings of the seventh annual ACM/IEEE international conference on Human-Robot Interaction. 2012. [DOI](https://doi.org/10.1007/s12369-012-0160-0)
* Akgun, B., Cakmak, M., Yoo, J.W., Thomaz, A.L.: Trajectories and keyframes
for kinesthetic teaching: a human-robot interaction perspective. Association for
Computing Machinery, New York, NY, USA (2012). [DOI](https://doi.org/10.1145/2157689.2157815)
* Kulic, D., Takano, W., Nakamura, Y.: Representability of human motions by factorial hidden markov models. In: 2007 IEEE/RSJ International Conference on Intelligent Robots and Systems, pp. 2388–2393 (2007). [DOI](https://doi.org/10.1109/IROS.2007.4399325)
* Takano, W., Yamane, K., Sugihara, T., Yamamoto, K., Nakamura, Y.: Primitive communication based on motion recognition and generation with hierarchical mimesis model. In: Proceedings 2006 IEEE International Conference on Robotics and Automation, pp. 3602–3609. [DOI](https://doi.org/10.1109/ROBOT.2006.1642252)
* Calinon, S., Pistillo, A., Caldwell, D.G.: Encoding the time and space constraints of a task in explicit-duration hidden markov model. In: 2011 IEEE/RSJ International Conference on Intelligent Robots and Systems, pp. 3413–3418 (2011). [DOI](https://doi.org/10.1109/IROS.2011.6094418)
* Calinon, S., D’halluin, F., Sauser, E.L., Caldwell, D.G., Billard, A.G.: Learning and reproduction of gestures by imitation. IEEE Robotics Automation Magazine 17(2), 44–54 (2010). [DOI](https://doi.org/10.1109/MRA.2010.936947)
* Butterfield, J., Osentoski, S., Jay, G., Jenkins, O.C.: Learning from demonstration using a multi-valued function regressor for time-series data. In: 2010 10th IEEE-RAS International Conference on Humanoid Robots, pp. 328–333 (2010). [DOI](https://doi.org/10.1109/ICHR.2010.5686284)
* Calinon, S., Guenter, F., Billard, A.: On learning, representing, and generalizing a task in a humanoid robot. IEEE Transactions on Systems, Man, and Cybernetics, Part B (Cybernetics) 37(2), 286–298 (2007). [DOI](https://doi.org/10.1109/TSMCB.2006.886952)
</details>


<p style="width: 90%; margin: 0 auto; /* Center the paragraph if it's narrower than its container"> 
    <img src="{{ site.baseurl }}/assets/images/LfD/ds_watchmotions_fig.png" alt="Watch-making Demonstrations for learning DS" width="90%" style="display:inline-block;"> 
        <!-- <img src="{{ site.baseurl }}/assets/images/LfD/ds_demodata.png" alt="Example of learned Attractor Dynamical System from Demonstration " width="90%" style="display:inline-block;">  -->
        <br/>

Dynamical Systems (DS)-based methods learn a dynamical system representation of motion from demonstration data, showing how the state evolves. Figure shows learned DS from basic motions of watch-making. 
<!-- (Bottom) Example Dynamical System learned from demonstrations.  -->
<a href="https://www.epfl.ch/labs/lasa/sahr/research/ds-modeling/"> Image Source </a> 
</p>

A different approach to skill encoding represents the motion as a form of *nonlinear, stable dynamical system*, providing benefits of robustness to perturbations, stability, and generalization. **Dynamical Movement Primitives (DMPs)** learn a second-order spring-damper dynamical system, where the learned forcing term shapes the trajectory to the desired motion. 
Other methods encode motion primitives as **probabilistic models**, representing skills and movements as trajectory distributions.
Other methods  learn a model of the system's motion as **Dynamical Systems (DS)**, represented as differential equations, describing how the robot's state evolves over time for a motion. These methods can capture complex, multi-dimensional motions. 
<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
* Ijspeert, N.J. Auke Jan, Schaal, S.: Movement imitation with nonlinear dynamical
systems in humanoid robots. In: IEEE International Conference on Robotics and Automation (ICRA) (2002). [DOI](https://doi.org/10.1109/ROBOT.2002.1014739)
* Schaal, S., Peters, J., Nakanishi, J., Ijspeert, A. (2005). Learning Movement Primitives. In: Dario, P., Chatila, R. (eds) Robotics Research. The Eleventh International Symposium. Springer Tracts in Advanced Robotics, vol 15. Springer, Berlin, Heidelberg. [DOI](https://doi.org/10.1007/11008941_60)
* Saveriano, M., Abu-Dakka, F.J., Kramberger, A., Peternel, L.: Dynamic movement primitives in robotics: A tutorial survey. The International Journal of Robotics Research 42(13), 1133–1184 (2023). [DOI](https://doi.org/10.1177/02783649231201196)

* Ruan, S., Liu, W., Wang, X., Meng, X., Chirikjian, G.S.: Primp: Probabilistically-informed motion primitives for efficient affordance learning from demonstration. IEEE Transactions on Robotics 40, 2868–2887 (2024) [DOI](https://doi.org/10.1109/TRO.2024.3390052)
* Paraschos, A., Daniel, C., Peters, J.R., Neumann, G.: Probabilistic movement
primitives. In: Burges, C.J., Bottou, L., Welling, M., Ghahramani, Z., Weinberger,
K.Q. (eds.) Advances in Neural Information Processing Systems, vol. 26. (2013). [Paper](https://papers.nips.cc/paper_files/paper/2013/hash/e53a0a2978c28872a4505bdb51db06dc-Abstract.html)
* Lioutikov, R., Neumann, G., Maeda, G., Peters, J.: Learning movement primitive libraries through probabilistic segmentation. The International Journal of Robotics Research 36(8), 879–894 (2017). [DOI]( https://doi.org/10.1177/0278364917713116)

* Khansari-Zadeh, S.M., Billard, A.: Learning stable nonlinear dynamical systems with gaussian mixture models. IEEE Transactions on Robotics 27(5), 943–957 (2011). [DOI](https://doi.org/10.1109/TRO.2011.2159412)
* Khadivar, F., Lauzana, I., Billard, A.: Learning dynamical systems with bifurcations. Robotics and Autonomous Systems 136, 103700 (2021). [DOI](https://doi.org/10.1016/j.robot.2020.103700)
* Khoramshahi, M., Billard, A.: A dynamical system approach to task-adaptation in physical human–robot interaction. Autonomous Robots 43(4), 927–946 (2019). [DOI](https://doi.org/10.1007/s10514-018-9764-z)
</details>


### Behavior Cloning
Behavior cloning approaches learn a policy function (state-action mapping) from a set of expert demonstrations. This uses supervised learning methods that minimize the difference between the learned policy and the expert demonstrations based on some metric, in order to imitate the expert. 

<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
* Bain, M., Sammut, C.: A framework for behavioural cloning. In: Machine Intelligence 15, pp. 103–129 (1995). [Paper](https://cgi.cse.unsw.edu.au/~claude/papers/MI15.pdf)
* Torabi, F., Warnell, G., Stone, P.: Behavioral cloning from observation. Proceedings of the Twenty-Seventh International Joint Conference on Artificial Intelligence (IJCAI), pages 4950-4957, (2018). [DOI](https://doi.org/10.24963/ijcai.2018/687)
* Ly, A.O., Akhloufi, M.: Learning to drive by imitation: An overview of deep behavior cloning methods. IEEE Transactions on Intelligent Vehicles 6(2), 195–209 (2020). [DOI](https://doi.org/10.1109/TIV.2020.3002505)
* Sasaki, F., Yamashina, R.: Behavioral cloning from noisy demonstrations. In: International Conference on Learning Representations (2020). [Paper](https://openreview.net/forum?id=zrT3HcsWSAt)
</details>
### GAIL
Generative Adversarial Imitation Learning (GAIL) is an imitation learning method that formulates the problem as an adversarial learning problem. Specifically, GAIL simultaneously learns a generator policy and discriminator that discriminates between the expert demonstrations and the learned policy trajectories. 
<details markdown ="1">
  <summary><strong>Reference Paper</strong></summary>
* Ho, J., Ermon, S.: Generative adversarial imitation learning. Advances in neural
information processing systems 29 (2016) [Paper](https://papers.nips.cc/paper/6391-generative-adversarial-imitation-learning)
</details>

### Diffusion Policies 
Diffusion Policies are among the latest research thrusts in Behavior Cloning that learns a conditional denoising diffusion model---which encodes conditional action \emph{distribution}, generating a sequence of actions over time. Because the diffusion model represents a distribution of actions, these policies capture the multi-modality of human behaviors in demonstrations, demonstrating high performance for complex behaviors. Furthermore, these methods accommodate/utilize visuomotor policies, allowing them to generate action policies from visual feedback. For more information: https://diffusion-policy.cs.columbia.edu/

<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
* Chi, C., Xu, Z., Feng, S., Cousineau, E., Du, Y., Burchfiel, B., Tedrake, R., Song, S.: Diffusion policy: Visuomotor policy learning via action diffusion. The International Journal of Robotics Research, (2024). [Paper](https://arxiv.org/abs/2303.04137v5)
* Pearce, T., Rashid, T., Kanervisto, A., Bignell, D., Sun, M., Georgescu, R., Macua, S.V., Tan, S.Z., Momennejad, I., Hofmann, K., et al.: Imitating human behaviour with diffusion models. In: 11th International Conference on Learning Representations, ICLR 2023 (2023). [Paper](https://arxiv.org/abs/2301.10677)
* Wang, Y., Zhang, Y., Huo, M., Tian, T., Zhang, X., Xie, Y., Xu, C., Ji, P., Zhan, W., Ding, M., et al.: Sparse diffusion policy: A sparse, reusable, and flexible policy for robot learning. In: Conference on Robot Learning, pp. 649–665 (2025). [Paper](https://proceedings.mlr.press/v270/wang25c.html)
</details>

## High-Level Task Plan
These methods learn the highest-level abstraction of the task motion plan--- a set of actions that result in a successful performance. These can also include symbolic or specific keyframe states that result in task success. They require some definition of available motions or library of predefined skills or actions that can be combined into a higher-level task plan.
### Programming by Demonstration and Symbolic Reasoning
**Programming by Demonstration (PbD)** and symbolic reasoning, one of the first methods of demonstration learning falls under this category of learning. These methods learned a task motion plan that consisted of subgoals defined through motion primitives and key frames and a mapping that connected the different subgoals with transitions between each. Current research in PbD methods extend this work through automated and unstructured classification and learning of multistep motions, relying on Bayesian methods in combination with motion primitives. 
<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
*  Billard, A., Calinon, S., Dillmann, R., Schaal, S.: Robot programming by demonstration. In: Springer Handbook of Robotics, pp. 1371–1394. Springer, 2008. [DOI](https://doi.org/10.1007/978-3-540-30301-5_60)
* Niekum, S., Osentoski, S., Konidaris, G., Barto, A.G.: Learning and generalization of complex tasks from unstructured demonstrations. In: 2012 IEEE/RSJ International Conference on Intelligent Robots and Systems, pp. 5239–5246 (2012). [DOI](https://doi.org/10.1109/IROS.2012.6386006)
* Niekum, S., Osentoski, S., Konidaris, G., Chitta, S., Marthi, B., Barto, A.G.:
Learning grounded finite-state representations from unstructured demonstrations.
The International Journal of Robotics Research 34(2), 131–157 (2015). [DOI](https://doi.org/10.1177/0278364914554471)
</details>

### Multi-step Motion Planning
Other thrusts utilize methods from long-horizon or multistep motion planning, including **Integrated Task and Motion Planning (TAMP)** methods, **Skill Tree** construction  and **Temporal Logic** (e.g., LTL and STL) methods. 

<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
* Garrett, C.R., Chitnis, R., Holladay, R., Kim, B., Silver, T., Kaelbling, L.P.,
Lozano-P´erez, T.: Integrated task and motion planning. Annual Review of
Control, Robotics, and Autonomous Systems 4(Volume 4, 2021), 265–293 (2021). 
* Mandlekar, A., Garrett, C., Xu, D., Fox, D.: Human-in-the-loop task and motion
planning for imitation learning. In: 7th Annual Conference on Robot Learning
(2023). 
* Zhang, Y., Xue, T., Razmjoo, A., Calinon, S.: Logic learning from demonstrations for multi-step manipulation tasks in dynamic environments. IEEE Robotics and Automation Letters 9(8), 7214–7221 (2024). [DOI](https://doi.org/10.1109/LRA.2024.3418276)
* Perez-D’Arpino, C., Shah, J.A.: C-learn: Learning geometric constraints from demonstrations for multi-step manipulation in shared autonomy. In: 2017 IEEE International Conference on Robotics and Automation (ICRA), pp. 4058–4065 (2017). [DOI](https://doi.org/10.1109/ICRA.2017.7989466)
* Konidaris, G., Kuindersma, S., Grupen, R., Barto, A.: Constructing skill trees for reinforcement learning agents from demonstration trajectories. Advances in neural information processing systems 23 (2010). [Paper](https://papers.nips.cc/paper/3903-constructing-skill-trees-for-reinforcement-learning-agents-from-demonstration-trajectories)
* Wang, F.N.L.S.S.A. Yanwei, Shah, J.: Temporal logic imitation: Learning plan-
satisficing motion policies from demonstrations. Conference on Robot Learning
(CORL) (2023). [Paper](https://arxiv.org/abs/2206.04632)
* Puranic, A.G., Deshmukh, J.V., Nikolaidis, S.: Learning from demonstrations
using signal temporal logic in stochastic and continuous domains. IEEE Robotics and Automation Letters (RA-L) 6(4), 6250–6257 (2021) [DOI](https://doi.org/10.1109/LRA.2021.3092676)
</details>

## Task Representation Learning

These methods learn the **task objective**--- whether it be the cost function, reward function, relevant task features, or some other task representation. The goal of these methods rests on the idea that learning the task objective is the most concise and transferable understanding of task success. By extracting this, the robot will not only learn how to successfully accomplish the task, but also identify what relevant features leads to task success. This enables policy improvement as well as generalization across environments and robots. Once the task objective is learned, it can be combined with some form of policy generation, including reinforcement learning, optimal control, or planning/ trajectory optimization. One of the main challenges of these methods is that there are often many task objectives or reward functions that could generate the same behavior--- deciding which one is correct is one of the main challenges of these methods. Another is that these methods typically require some finite (predefined) list of possible features that could make up the reward function in order to be tractable. 

### Inverse Optimal Control and Inverse Reinforcement Learning

**Inverse Optimal Control (IOC)** learns a cost function, with respect to which the expert demonstrations would be optimal. Typically, these methods assuming the problem takes the form of a stable control system. First posed in 1964 by Kalman, current methods in IOC typically formulate the problem as some form of standard controls or optimization problem, or a stochastic control problem. While classical inverse optimal control problems learn from an optimal control signal, some methods are formulated to learn from data, such as demonstration trajectory signals or state-action pairs \cite{johnson2013inverse, dvijotham2010inverse, doerr2015direct, levine2012continuous, mombaur2010human, finn2016guided}. Note that these methods are often interchangeably called inverse reinforcement learning (IRL).
<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
  * Ab Azar, N., Shahmansoorian, A., Davoudi, M.: From inverse optimal control to inverse reinforcement learning: A historical review. Annual Reviews in Control 50, 119–138 (2020). [Paper](https://www.sciencedirect.com/science/article/abs/pii/S1367578820300511)
  * Kalman, R.E.: When is a linear control system optimal? (1964) [Paper](https://asmedigitalcollection.asme.org/fluidsengineering/article/86/1/51/392203/When-Is-a-Linear-Control-System-Optimal)
  * Nakamura, N., Nakamura, H., Nishitani, H.: Global inverse optimal control with guaranteed convergence rates of input affine nonlinear systems. IEEE Transactions on Automatic Control 56(2), 358–369 (2010). [DOI](https://doi.org/10.1109/TAC.2010.2053731)
  * Johnson, M., Aghasadeghi, N., Bretl, T.: Inverse optimal control for deterministic continuous-time nonlinear systems. In: 52nd IEEE Conference on Decision and Control, pp. 2906–2913 (2013). [Paper](http://publish.illinois.edu/science-of-security-lablet/files/2017/03/Inverse-Optimal-Control-for-Deterministic-Continuous-time-Nonlinear-Systems.pdf)
  * Dvijotham, K., Todorov, E.: Inverse optimal control with linearly-solvable MDPs. In: Proceedings of the 27th International Conference on Machine Learning pp. 335–342 (2010). [Paper](https://icml.cc/Conferences/2010/papers/571.pdf)
  * Doerr, A., Ratliff, N.D., Bohg, J., Toussaint, M., Schaal, S.: Direct loss minimization inverse optimal control. In: Robotics: Science and Systems (2015). [Paper](https://www.roboticsproceedings.org/rss11/p13.pdf)
  * Levine, S., Koltun, V.: Continuous inverse optimal control with locally optimal examples. ICML'12: Proceedings of the 29th International Coference on International Conference on Machine Learning
 (2012). [Paper](https://dl.acm.org/doi/10.5555/3042573.3042637)
  * Mombaur, K., Truong, A., Laumond, J.-P.: From human to humanoid locomotion—an inverse optimal control approach. Autonomous robots 28(3), 369–383 (2010). [Paper](https://link.springer.com/article/10.1007/s10514-009-9170-7)
  * Finn, C., Levine, S., Abbeel, P.: Guided cost learning: Deep inverse optimal control via policy optimization. In: International Conference on Machine Learning,pp. 49–58 (2016). [Paper](https://proceedings.mlr.press/v48/finn16.html)
</details>

**Inverse Reinforcement Learning(IRL)**, often used interchangeably with IOC, learns the reward function that would result in the (assumed optimal) expert demonstrations. Formulated as a Markov Decision Process (MDP), the goal of IRL is to learn a reward function that explains the expert's behavior in the demonstrations. Typical formulations for reward function learning include: 

* **Feature Expectation Matching**: These methods learn a reward function that weights reward features, assuming the reward consists of a linear combination of nonlinear features. They optimize the weights of the rewards that matches the expectation of features with that of the demonstrations. Apprenticeship learning methods involve an additional step of learning an optimal policy from this learned reward function. 
* **Max-margin planning** formulates the problem as a margin maximization problem, which predicts the reward feature combination that maximizes the reward of the demonstration behavior by a margin over all other possible behaviors. These methods learn a reward function that explains why the expert demonstration policy is optimal by some margin over all other policies.
* **Bayesian IRL** use Bayesian probability methods to learn a distribution of the reward function, from a prior distribution from an initialization or prior knowledge. They use the state-action pairs from the demonstration to update the posterior distribution, or the estimate of the reward function. 
* **Maximum Entropy-based IRL**: Max Entropy IRL is based on the principle of maximum entropy. In the context of IRL, by maximizing the entropy (while still maximizing reward feature matching with the expert demonstrations), Max-Ent IRL learns the reward probability distribution that best matches the expert demonstrators' policy (that the expert policy maximizes), while maximizing entropy (most uncertainty outside of those optimal expert actions). 
* **Adversarial IRL (AIRL)**: AIRL, similar to GAIL discussed above, uses a generative adversarial network (GAN) to learn a policy from expert demonstrations. However, GAIL only learns a policy from the demonstrations, while AIRL learns both a transferable reward function and a policy from the demonstrations.  

<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
* Ng, A.Y., Russell, S., et al.: Algorithms for inverse reinforcement learning. In:
International Conference on Machine Learning (ICML), vol. 1, p. 2 (2000). [Paper](https://ai.stanford.edu/~ang/papers/icml00-irl.pdf)
* Abbeel, P., Ng, A.Y.: Apprenticeship learning via inverse reinforcement learning. In: Proceedings of the Twenty-first International Conference on Machine Learning, p. 1 (2004). [Paper](https://dl.acm.org/doi/10.1145/1015330.1015430)
* Coates, A., Abbeel, P., Ng, A.Y.: Apprenticeship learning for helicopter control.
Communications of the ACM 52(7), 97–105 (2009). [Paper](https://dl.acm.org/doi/10.1145/1538788.1538812)
* Ratliff, N.D., Bagnell, J.A., Zinkevich, M.A.: Maximum margin planning. In: Proceedings of the 23rd International Conference on Machine Learning, pp. 729–736 (2006). [Paper](https://www.ri.cmu.edu/publications/maximum-margin-planning/)
* Bagnell, J., Chestnutt, J., Bradley, D., Ratliff, N.: Boosting structured prediction for imitation learning. Advances in Neural Information Processing Systems (2006). [Paper](https://papers.nips.cc/paper_files/paper/2006/hash/fdbd31f2027f20378b1a80125fc862db-Abstract.html)
* Ramachandran, D., Amir, E.: Bayesian inverse reinforcement learning. In: IJCAI,
vol. 7, pp. 2586–2591 (2007). [Paper](https://www.ijcai.org/Proceedings/07/Papers/416.pdf)
* Brown, D.S., Cui, Y., Niekum, S.: Risk-aware active inverse reinforcement
learning. In: Conference on Robot Learning, pp. 362–372 (2018) [Paper](https://proceedings.mlr.press/v87/brown18a.html)
* Brown, D., Niekum, S.: Efficient probabilistic performance bounds for inverse reinforcement learning. In: Proceedings of the AAAI Conference on Artificial Intelligence, vol. 32 (2018). [Paper](https://arxiv.org/abs/1707.00724)
* Ziebart, B.D., Maas, A.L., Bagnell, J.A., Dey, A.K., et al.: Maximum entropy inverse reinforcement learning. In: AAAI, vol. 8, pp. 1433–1438 (2008). Chicago, IL, USA. [Paper](https://aaai.org/Papers/AAAI/2008/AAAI08-227.pdf)
* Ziebart, Brian D., J. Andrew Bagnell, and Anind K. Dey. "Modeling interaction via the principle of maximum causal entropy." International Conference on Machine Learning (ICML) 2010. [Paper Link](https://www.cs.cmu.edu/~bziebart/publications/maximum-causal-entropy.pdf)
* Wulfmeier, M., Ondruska, P., Posner, I.: Maximum entropy deep inverse rein-
forcement learning. International Conference on Intelligent Robots (2015). [Paper](https://arxiv.org/abs/1507.04888)
* Fu, Justin, Katie Luo, and Sergey Levine. "Learning Robust Rewards with Adverserial Inverse Reinforcement Learning." International Conference on Learning Representations. 2018. [Paper](https://arxiv.org/abs/1710.11248)
</details>

## Online/Interactive Learning Methods

### Preference-Based Learning
**Preference-based learning** methods, also called **preference-based reinforcement learning (PbRL)** or **Reinforcement Learning from human feedback (RLHF)**, use human feedback on motion preference to inform learning. Common methods in preference-based IRL use user preferences to rank demonstrations or motion trajectories to inform reward-function learning. Other methods use user preferences or rankings to directly inform the policy learning. Both can incorporate methods from active learning for efficient querying to minimize the amount of feedback required to enable learning.
<details markdown ="1">
  <summary><strong>Reference Papers</strong></summary>
* Wirth, C., Akrour, R., Neumann, G., F¨urnkranz, J.: A survey of preference-based reinforcement learning methods. Journal of Machine Learning Research 18(136), 1–46 (2017). [Paper](https://jmlr.org/papers/v18/16-634.html)
* Kaufmann, T., Weng, P., Bengs, V., H¨ullermeier, E.: A survey of reinforcement learning from human feedback. Transactions on Machine Learning Research (TMLR) 2025. [Paper](https://arxiv.org/abs/2312.14925)
* Brown, D., Goo, W., Nagarajan, P., Niekum, S.: Extrapolating beyond suboptimal demonstrations via inverse reinforcement learning from observations. In: International Conference on Machine Learning, pp. 783–792 (2019). [Paper](https://proceedings.mlr.press/v97/brown19a/brown19a.pdf)
* Sadigh, D., Dragan, A.D., Sastry, S., Seshia, S.A.: Active preference-based learning of reward functions. Robotics Science and Systems (RSS) (2017). [Paper](https://www.roboticsproceedings.org/rss13/p53.html)
* Palan, M., Landolfi, N.C., Shevchuk, G., Sadigh, D.: Learning reward functions by
integrating human demonstrations and preferences. Robotics Science and Systems
(RSS) (2019). [Paper](https://www.roboticsproceedings.org/rss15/p23.pdf)
* Rafailov, R., Sharma, A., Mitchell, E., Manning, C.D., Ermon, S., Finn, C.: Direct preference optimization: Your language model is secretly a reward model. Advances in neural information processing systems 36, 53728–53741 (2023). [Paper](https://arxiv.org/abs/2305.18290)
* Akrour, R., Schoenauer, M., Sebag, M.: Preference-based policy learning. In: Joint European Conference on Machine Learning and Knowledge Discovery inDatabases, pp. 12–27 (2011). [Paper](https://link.springer.com/chapter/10.1007/978-3-642-23780-5_11)
* Griffith, S., Subramanian, K., Scholz, J., Isbell, C.L., Thomaz, A.L.: Policy shap-
ing: Integrating human feedback with reinforcement learning. Advances in neural information processing systems 26 (2013). [Paper](https://papers.nips.cc/paper/5187-policy-shaping-integrating-human-feedback-with-reinforcement-learning)
* Cheng, W., F¨urnkranz, J., H¨ullermeier, E., Park, S.-H.: Preference-based policy iteration: Leveraging preference learning for reinforcement learning. In: Joint European Conference on Machine Learning and Knowledge Discovery in Databases, pp. 312–327 (2011). [Paper](https://link.springer.com/chapter/10.1007/978-3-642-23780-5_30)
* Kim, C., Park, J., Shin, J., Lee, H., Abbeel, P., Lee, K.: Preference transformer: Modeling human preferences using transformers for rl. In: 11th International Conference on Learning Representations, ICLR 2023 (2023). [Paper](https://arxiv.org/abs/2303.00957)
* Christiano, P.F., Leike, J., Brown, T., Martic, M., Legg, S., Amodei, D.: Deep Reinforcement Learning from Human Preferences. Advances in neural information processing systems 30 (2017). [Paper](https://arxiv.org/abs/1706.03741)
* Zhu, B., Jordan, M., Jiao, J.: Principled reinforcement learning with human feedback from pairwise or k-wise comparisons. In: International Conference on Machine Learning, pp. 43037–43067 (2023). [Paper](https://proceedings.mlr.press/v202/zhu23f.html)
*  Kuhar, S., Cheng, S., Chopra, S., Bronars, M., Xu, D.: Learning to discern: Imitating heterogeneous human demonstrations with preference and representation learning. In: Conference on Robot Learning, pp. 1437–1449 (2023). [Paper](https://proceedings.mlr.press/v229/kuhar23a.html)
* Akrour, R., Schoenauer, M., Sebag, M.: April: Active preference learning-based reinforcement learning. In: Joint European Conference on Machine Learning and Knowledge Discovery in Databases, pp. 116–131 (2012). [Paper](https://link.springer.com/chapter/10.1007/978-3-642-33486-3_8)
* Biyik, E., Sadigh, D.: Batch active preference-based learning of reward func-
tions. In: Proceedings of The 2nd Conference on Robot Learning. Proceedings of
Machine Learning Research, vol. 87, pp. 519–528. [Paper](https://proceedings.mlr.press/v87/biyik18a.html) 
</details>

### DAgger (Dataset Aggregation)
With standard Offline Behavior Cloning approaches, policy errors compound as the robot acts sequentially and the robot state moves away from the distribution. **DAgger** is an online learning approach that actively queries an expert for corrective demonstrations to refine the learned policy, particularly when encountering out-of-distribution states. 

<details markdown ="1">
  <summary><strong>Reference Paper</strong></summary>
* Ross, S., Gordon, G., Bagnell, D.: A reduction of imitation learning and structured prediction to no-regret online learning. In: Proceedings of the Fourteenth International Conference on Artificial Intelligence and Statistics, pp. 627–635 (2011). JMLR Workshop and Conference Proceedings. [Paper](https://proceedings.mlr.press/v15/ross11a.html)
</details>
 
### DART: Noise Injection for Robust Imitation Learning
Behavior cloning errors compound when out-of-distribution, while online, active querying methods can be time-consuming for experts to generate sufficient data. **DART** is an offline learning approach that injects noise during the initial demonstration dataset collection itself in order to cover the full state space and generate demonstrator actions for recovery when moving away from expert trajectories. 
<details markdown ="1">
  <summary><strong>Reference Paper</strong></summary>
* Laskey, M., Lee, J., Fox, R., Dragan, A., Goldberg, K.: Dart: Noise injection for robust imitation learning. In: Conference on Robot Learning, pp. 143–156 (2017). [Paper](https://arxiv.org/abs/1703.09327)
</details>

# Simple Code Example
To see a basic code example of Learning from Demonstration, follow the link below to see a Github Repository with a simple tutorial example of Dynamical-Systems (DS)-based Learning from Demonstration. 
* Basic Tutorial Example: [https://github.com/apr600/lfd-tutorial](https://github.com/apr600/lfd-tutorial)

# Want to Learn More? 

For those interested in applying the concepts introduced in this course, the following list below include tutorials and resources for implementing and illustrating different Learning from Demonstration methods. 
* **Dynamical Systems(DS)-based Learning from Demonstration**: [LFD-DS ICRA 2019 Tutorial](https://epfl-lasa.github.io/TutorialICRA2019.io/) provides lectures, slides and example code of DS-motion policy learning from demonstrations, using a GMM-based learning approach. It provides illustrative examples for a simple 2D system, for learning linear and non-linear trajectory behaviors. 
* **Dynamic Motion Primitives(DMP)-based Learning from Demonstration**: [DMP Tutorial Survey and Code](https://doi.org/10.1177/02783649231201196). The following paper provides an overview and tutorial of Dynamic Movement Primitives and their corresponding LFD methods. It includes an introduction to the mathematical formulation of motion primitives and a literature survey of LFD methods using DMPs. It also includes references to available code implementations and includes additional open-source implementation for different DMP methods. Saveriano M, Abu-Dakka FJ, Kramberger A, Peternel L. Dynamic movement primitives in robotics: A tutorial survey. The International Journal of Robotics Research. 2023;42(13):1133-1184.
* **Imitation Learning (IL)**: [ICML 2018 Imitation Learning Tutorial](https://sites.google.com/view/icml2018-imitation-learning/home) provides lectures on a broad overview of imitation learning techniques and recent applications. [IL Implementations (imitiation.readthedocs.io)](https://imitation.readthedocs.io/en/latest/) provides implementations of imitation and reward learning algorithms, including Behavior Cloning (BC), Max Causal Entropy IRL, DAgger, GAIL, and AIRL that are modular with an easy-to-use API and can be incorporated into standard imitation learning examples and comparisons. [IL Implementation Tutorial](https://github.com/tsmatz/imitation-learning-tutorials) provides example implementations to compare basic Imitation Learning algorithms, including Behavior Cloning (BC) and Inverse Reinforcement Learning (IRL) algorithms. Example algorithm implementations include BC, GAIL, DAgger, MaxEntIRL, and other IRL algorithms. All implementations are illustrated on the Gridworld Environment.  

# References:

Reference papers have been included throughout the notes, with each corresponding section. For a complete list of all references, see below. 

<details markdown ="1">
  <summary><strong>References</strong></summary>

* Billard, A., Calinon, S., Dillmann, R., Schaal, S.: Robot programming by demonstration. In: Springer Handbook of Robotics, pp. 1371–1394. Springer, 2008. [DOI](https://doi.org/10.1007/978-3-540-30301-5_60)
* Argall, B.D., Chernova, S., Veloso, M., Browning, B.: A survey of robot learning from demonstration. Robotics and autonomous systems 57(5), 469–483 (2009). [DOI](https://doi.org/10.1016/j.robot.2008.10.024)
* Ravichandar, H., Polydoros, A.S., Chernova, S., Billard, A.: Recent advances in robot learning from demonstration. Annual review of control, robotics, and autonomous systems 3(1), 297–330 (2020). [DOI](https://doi.org/10.1146/annurev-control-100819-063206)
* Adams, S., Cody, T., Beling, P.A.: A survey of inverse reinforcement learning. Artificial Intelligence Review 55(6), 4307–4346 (2022). [DOI](https://doi.org/10.1007/s10462-021-10108-x) 
* Akgun, Baris, et al. "Trajectories and keyframes for kinesthetic teaching: A human-robot interaction perspective." Proceedings of the seventh annual ACM/IEEE international conference on Human-Robot Interaction. 2012. [DOI](https://doi.org/10.1007/s12369-012-0160-0)
* Akgun, B., Cakmak, M., Yoo, J.W., Thomaz, A.L.: Trajectories and keyframes
for kinesthetic teaching: a human-robot interaction perspective. Association for
Computing Machinery, New York, NY, USA (2012). [DOI](https://doi.org/10.1145/2157689.2157815)
* Kulic, D., Takano, W., Nakamura, Y.: Representability of human motions by factorial hidden markov models. In: 2007 IEEE/RSJ International Conference on Intelligent Robots and Systems, pp. 2388–2393 (2007). [DOI](https://doi.org/10.1109/IROS.2007.4399325)
* Takano, W., Yamane, K., Sugihara, T., Yamamoto, K., Nakamura, Y.: Primitive communication based on motion recognition and generation with hierarchical mimesis model. In: Proceedings 2006 IEEE International Conference on Robotics and Automation, pp. 3602–3609. [DOI](https://doi.org/10.1109/ROBOT.2006.1642252)
* Calinon, S., Pistillo, A., Caldwell, D.G.: Encoding the time and space constraints of a task in explicit-duration hidden markov model. In: 2011 IEEE/RSJ International Conference on Intelligent Robots and Systems, pp. 3413–3418 (2011). [DOI](https://doi.org/10.1109/IROS.2011.6094418)
* Calinon, S., D’halluin, F., Sauser, E.L., Caldwell, D.G., Billard, A.G.: Learning and reproduction of gestures by imitation. IEEE Robotics Automation Magazine 17(2), 44–54 (2010). [DOI](https://doi.org/10.1109/MRA.2010.936947)
* Butterfield, J., Osentoski, S., Jay, G., Jenkins, O.C.: Learning from demonstration using a multi-valued function regressor for time-series data. In: 2010 10th IEEE-RAS International Conference on Humanoid Robots, pp. 328–333 (2010). [DOI](https://doi.org/10.1109/ICHR.2010.5686284)
* Calinon, S., Guenter, F., Billard, A.: On learning, representing, and generalizing a task in a humanoid robot. IEEE Transactions on Systems, Man, and Cybernetics, Part B (Cybernetics) 37(2), 286–298 (2007). [DOI](https://doi.org/10.1109/TSMCB.2006.886952)
* Ijspeert, N.J. Auke Jan, Schaal, S.: Movement imitation with nonlinear dynamical
systems in humanoid robots. In: IEEE International Conference on Robotics and Automation (ICRA) (2002). [DOI](https://doi.org/10.1109/ROBOT.2002.1014739)
* Schaal, S., Peters, J., Nakanishi, J., Ijspeert, A. (2005). Learning Movement Primitives. In: Dario, P., Chatila, R. (eds) Robotics Research. The Eleventh International Symposium. Springer Tracts in Advanced Robotics, vol 15. Springer, Berlin, Heidelberg. [DOI](https://doi.org/10.1007/11008941_60)
* Saveriano, M., Abu-Dakka, F.J., Kramberger, A., Peternel, L.: Dynamic movement primitives in robotics: A tutorial survey. The International Journal of Robotics Research 42(13), 1133–1184 (2023). [DOI](https://doi.org/10.1177/02783649231201196)

* Ruan, S., Liu, W., Wang, X., Meng, X., Chirikjian, G.S.: Primp: Probabilistically-informed motion primitives for efficient affordance learning from demonstration. IEEE Transactions on Robotics 40, 2868–2887 (2024) [DOI](https://doi.org/10.1109/TRO.2024.3390052)
* Paraschos, A., Daniel, C., Peters, J.R., Neumann, G.: Probabilistic movement
primitives. In: Burges, C.J., Bottou, L., Welling, M., Ghahramani, Z., Weinberger,
K.Q. (eds.) Advances in Neural Information Processing Systems, vol. 26. (2013). [Paper](https://papers.nips.cc/paper_files/paper/2013/hash/e53a0a2978c28872a4505bdb51db06dc-Abstract.html)
* Lioutikov, R., Neumann, G., Maeda, G., Peters, J.: Learning movement primitive libraries through probabilistic segmentation. The International Journal of Robotics Research 36(8), 879–894 (2017). [DOI]( https://doi.org/10.1177/0278364917713116)

* Khansari-Zadeh, S.M., Billard, A.: Learning stable nonlinear dynamical systems with gaussian mixture models. IEEE Transactions on Robotics 27(5), 943–957 (2011). [DOI](https://doi.org/10.1109/TRO.2011.2159412)
* Khadivar, F., Lauzana, I., Billard, A.: Learning dynamical systems with bifurcations. Robotics and Autonomous Systems 136, 103700 (2021). [DOI](https://doi.org/10.1016/j.robot.2020.103700)
* Khoramshahi, M., Billard, A.: A dynamical system approach to task-adaptation in physical human–robot interaction. Autonomous Robots 43(4), 927–946 (2019). [DOI](https://doi.org/10.1007/s10514-018-9764-z)
* Bain, M., Sammut, C.: A framework for behavioural cloning. In: Machine Intelligence 15, pp. 103–129 (1995). [Paper](https://cgi.cse.unsw.edu.au/~claude/papers/MI15.pdf)
* Torabi, F., Warnell, G., Stone, P.: Behavioral cloning from observation. Proceedings of the Twenty-Seventh International Joint Conference on Artificial Intelligence (IJCAI), pages 4950-4957, (2018). [DOI](https://doi.org/10.24963/ijcai.2018/687)
* Ly, A.O., Akhloufi, M.: Learning to drive by imitation: An overview of deep behavior cloning methods. IEEE Transactions on Intelligent Vehicles 6(2), 195–209 (2020). [DOI](https://doi.org/10.1109/TIV.2020.3002505)
* Sasaki, F., Yamashina, R.: Behavioral cloning from noisy demonstrations. In: International Conference on Learning Representations (2020). [Paper](https://openreview.net/forum?id=zrT3HcsWSAt)
* Ho, J., Ermon, S.: Generative adversarial imitation learning. Advances in neural
information processing systems 29 (2016) [Paper](https://papers.nips.cc/paper/6391-generative-adversarial-imitation-learning)
* Chi, C., Xu, Z., Feng, S., Cousineau, E., Du, Y., Burchfiel, B., Tedrake, R., Song, S.: Diffusion policy: Visuomotor policy learning via action diffusion. The International Journal of Robotics Research, (2024). [Paper](https://arxiv.org/abs/2303.04137v5)
* Pearce, T., Rashid, T., Kanervisto, A., Bignell, D., Sun, M., Georgescu, R., Macua, S.V., Tan, S.Z., Momennejad, I., Hofmann, K., et al.: Imitating human behaviour with diffusion models. In: 11th International Conference on Learning Representations, ICLR 2023 (2023). [Paper](https://arxiv.org/abs/2301.10677)
* Wang, Y., Zhang, Y., Huo, M., Tian, T., Zhang, X., Xie, Y., Xu, C., Ji, P., Zhan, W., Ding, M., et al.: Sparse diffusion policy: A sparse, reusable, and flexible policy for robot learning. In: Conference on Robot Learning, pp. 649–665 (2025). [Paper](https://proceedings.mlr.press/v270/wang25c.html)
*  Billard, A., Calinon, S., Dillmann, R., Schaal, S.: Robot programming by demonstration. In: Springer Handbook of Robotics, pp. 1371–1394. Springer, 2008. [DOI](https://doi.org/10.1007/978-3-540-30301-5_60)
* Niekum, S., Osentoski, S., Konidaris, G., Barto, A.G.: Learning and generalization of complex tasks from unstructured demonstrations. In: 2012 IEEE/RSJ International Conference on Intelligent Robots and Systems, pp. 5239–5246 (2012). [DOI](https://doi.org/10.1109/IROS.2012.6386006)
* Niekum, S., Osentoski, S., Konidaris, G., Chitta, S., Marthi, B., Barto, A.G.:
Learning grounded finite-state representations from unstructured demonstrations.
The International Journal of Robotics Research 34(2), 131–157 (2015). [DOI](https://doi.org/10.1177/0278364914554471)
* Garrett, C.R., Chitnis, R., Holladay, R., Kim, B., Silver, T., Kaelbling, L.P.,
Lozano-P´erez, T.: Integrated task and motion planning. Annual Review of
Control, Robotics, and Autonomous Systems 4(Volume 4, 2021), 265–293 (2021). 
* Mandlekar, A., Garrett, C., Xu, D., Fox, D.: Human-in-the-loop task and motion
planning for imitation learning. In: 7th Annual Conference on Robot Learning
(2023). 
* Zhang, Y., Xue, T., Razmjoo, A., Calinon, S.: Logic learning from demonstrations for multi-step manipulation tasks in dynamic environments. IEEE Robotics and Automation Letters 9(8), 7214–7221 (2024). [DOI](https://doi.org/10.1109/LRA.2024.3418276)
* Perez-D’Arpino, C., Shah, J.A.: C-learn: Learning geometric constraints from demonstrations for multi-step manipulation in shared autonomy. In: 2017 IEEE International Conference on Robotics and Automation (ICRA), pp. 4058–4065 (2017). [DOI](https://doi.org/10.1109/ICRA.2017.7989466)
* Konidaris, G., Kuindersma, S., Grupen, R., Barto, A.: Constructing skill trees for reinforcement learning agents from demonstration trajectories. Advances in neural information processing systems 23 (2010). [Paper](https://papers.nips.cc/paper/3903-constructing-skill-trees-for-reinforcement-learning-agents-from-demonstration-trajectories)
* Wang, F.N.L.S.S.A. Yanwei, Shah, J.: Temporal logic imitation: Learning plan-
satisficing motion policies from demonstrations. Conference on Robot Learning
(CORL) (2023). [Paper](https://arxiv.org/abs/2206.04632)
* Puranic, A.G., Deshmukh, J.V., Nikolaidis, S.: Learning from demonstrations
using signal temporal logic in stochastic and continuous domains. IEEE Robotics and Automation Letters (RA-L) 6(4), 6250–6257 (2021) [DOI](https://doi.org/10.1109/LRA.2021.3092676)
  * Ab Azar, N., Shahmansoorian, A., Davoudi, M.: From inverse optimal control to inverse reinforcement learning: A historical review. Annual Reviews in Control 50, 119–138 (2020). [Paper](https://www.sciencedirect.com/science/article/abs/pii/S1367578820300511)
  * Kalman, R.E.: When is a linear control system optimal? (1964) [Paper](https://asmedigitalcollection.asme.org/fluidsengineering/article/86/1/51/392203/When-Is-a-Linear-Control-System-Optimal)
  * Nakamura, N., Nakamura, H., Nishitani, H.: Global inverse optimal control with guaranteed convergence rates of input affine nonlinear systems. IEEE Transactions on Automatic Control 56(2), 358–369 (2010). [DOI](https://doi.org/10.1109/TAC.2010.2053731)
  * Johnson, M., Aghasadeghi, N., Bretl, T.: Inverse optimal control for deterministic continuous-time nonlinear systems. In: 52nd IEEE Conference on Decision and Control, pp. 2906–2913 (2013). [Paper](http://publish.illinois.edu/science-of-security-lablet/files/2017/03/Inverse-Optimal-Control-for-Deterministic-Continuous-time-Nonlinear-Systems.pdf)
  * Dvijotham, K., Todorov, E.: Inverse optimal control with linearly-solvable MDPs. In: Proceedings of the 27th International Conference on Machine Learning pp. 335–342 (2010). [Paper](https://icml.cc/Conferences/2010/papers/571.pdf)
  * Doerr, A., Ratliff, N.D., Bohg, J., Toussaint, M., Schaal, S.: Direct loss minimization inverse optimal control. In: Robotics: Science and Systems (2015). [Paper](https://www.roboticsproceedings.org/rss11/p13.pdf)
  * Levine, S., Koltun, V.: Continuous inverse optimal control with locally optimal examples. ICML'12: Proceedings of the 29th International Coference on International Conference on Machine Learning
 (2012). [Paper](https://dl.acm.org/doi/10.5555/3042573.3042637)
  * Mombaur, K., Truong, A., Laumond, J.-P.: From human to humanoid locomotion—an inverse optimal control approach. Autonomous robots 28(3), 369–383 (2010). [Paper](https://link.springer.com/article/10.1007/s10514-009-9170-7)
  * Finn, C., Levine, S., Abbeel, P.: Guided cost learning: Deep inverse optimal control via policy optimization. In: International Conference on Machine Learning,pp. 49–58 (2016). [Paper](https://proceedings.mlr.press/v48/finn16.html)
  * Ng, A.Y., Russell, S., et al.: Algorithms for inverse reinforcement learning. In:
International Conference on Machine Learning (ICML), vol. 1, p. 2 (2000). [Paper](https://ai.stanford.edu/~ang/papers/icml00-irl.pdf)
* Abbeel, P., Ng, A.Y.: Apprenticeship learning via inverse reinforcement learning. In: Proceedings of the Twenty-first International Conference on Machine Learning, p. 1 (2004). [Paper](https://dl.acm.org/doi/10.1145/1015330.1015430)
* Coates, A., Abbeel, P., Ng, A.Y.: Apprenticeship learning for helicopter control.
Communications of the ACM 52(7), 97–105 (2009). [Paper](https://dl.acm.org/doi/10.1145/1538788.1538812)
* Ratliff, N.D., Bagnell, J.A., Zinkevich, M.A.: Maximum margin planning. In: Proceedings of the 23rd International Conference on Machine Learning, pp. 729–736 (2006). [Paper](https://www.ri.cmu.edu/publications/maximum-margin-planning/)
* Bagnell, J., Chestnutt, J., Bradley, D., Ratliff, N.: Boosting structured prediction for imitation learning. Advances in Neural Information Processing Systems (2006). [Paper](https://papers.nips.cc/paper_files/paper/2006/hash/fdbd31f2027f20378b1a80125fc862db-Abstract.html)
* Ramachandran, D., Amir, E.: Bayesian inverse reinforcement learning. In: IJCAI,
vol. 7, pp. 2586–2591 (2007). [Paper](https://www.ijcai.org/Proceedings/07/Papers/416.pdf)
* Brown, D.S., Cui, Y., Niekum, S.: Risk-aware active inverse reinforcement
learning. In: Conference on Robot Learning, pp. 362–372 (2018) [Paper](https://proceedings.mlr.press/v87/brown18a.html)
* Brown, D., Niekum, S.: Efficient probabilistic performance bounds for inverse reinforcement learning. In: Proceedings of the AAAI Conference on Artificial Intelligence, vol. 32 (2018). [Paper](https://arxiv.org/abs/1707.00724)
* Ziebart, B.D., Maas, A.L., Bagnell, J.A., Dey, A.K., et al.: Maximum entropy inverse reinforcement learning. In: AAAI, vol. 8, pp. 1433–1438 (2008). Chicago, IL, USA. [Paper](https://aaai.org/Papers/AAAI/2008/AAAI08-227.pdf)
* Ziebart, Brian D., J. Andrew Bagnell, and Anind K. Dey. "Modeling interaction via the principle of maximum causal entropy." International Conference on Machine Learning (ICML) 2010. [Paper Link](https://www.cs.cmu.edu/~bziebart/publications/maximum-causal-entropy.pdf)
* Wulfmeier, M., Ondruska, P., Posner, I.: Maximum entropy deep inverse rein-
forcement learning. International Conference on Intelligent Robots (2015). [Paper](https://arxiv.org/abs/1507.04888)
* Fu, Justin, Katie Luo, and Sergey Levine. "Learning Robust Rewards with Adverserial Inverse Reinforcement Learning." International Conference on Learning Representations. 2018. [Paper](https://arxiv.org/abs/1710.11248)
* Wirth, C., Akrour, R., Neumann, G., F¨urnkranz, J.: A survey of preference-based reinforcement learning methods. Journal of Machine Learning Research 18(136), 1–46 (2017). [Paper](https://jmlr.org/papers/v18/16-634.html)
* Kaufmann, T., Weng, P., Bengs, V., H¨ullermeier, E.: A survey of reinforcement learning from human feedback. Transactions on Machine Learning Research (TMLR) 2025. [Paper](https://arxiv.org/abs/2312.14925)
* Brown, D., Goo, W., Nagarajan, P., Niekum, S.: Extrapolating beyond suboptimal demonstrations via inverse reinforcement learning from observations. In: International Conference on Machine Learning, pp. 783–792 (2019). [Paper](https://proceedings.mlr.press/v97/brown19a/brown19a.pdf)
* Sadigh, D., Dragan, A.D., Sastry, S., Seshia, S.A.: Active preference-based learning of reward functions. Robotics Science and Systems (RSS) (2017). [Paper](https://www.roboticsproceedings.org/rss13/p53.html)
* Palan, M., Landolfi, N.C., Shevchuk, G., Sadigh, D.: Learning reward functions by
integrating human demonstrations and preferences. Robotics Science and Systems
(RSS) (2019). [Paper](https://www.roboticsproceedings.org/rss15/p23.pdf)
* Rafailov, R., Sharma, A., Mitchell, E., Manning, C.D., Ermon, S., Finn, C.: Direct preference optimization: Your language model is secretly a reward model. Advances in neural information processing systems 36, 53728–53741 (2023). [Paper](https://arxiv.org/abs/2305.18290)
* Akrour, R., Schoenauer, M., Sebag, M.: Preference-based policy learning. In: Joint European Conference on Machine Learning and Knowledge Discovery inDatabases, pp. 12–27 (2011). [Paper](https://link.springer.com/chapter/10.1007/978-3-642-23780-5_11)
* Griffith, S., Subramanian, K., Scholz, J., Isbell, C.L., Thomaz, A.L.: Policy shap-
ing: Integrating human feedback with reinforcement learning. Advances in neural information processing systems 26 (2013). [Paper](https://papers.nips.cc/paper/5187-policy-shaping-integrating-human-feedback-with-reinforcement-learning)
* Cheng, W., F¨urnkranz, J., H¨ullermeier, E., Park, S.-H.: Preference-based policy iteration: Leveraging preference learning for reinforcement learning. In: Joint European Conference on Machine Learning and Knowledge Discovery in Databases, pp. 312–327 (2011). [Paper](https://link.springer.com/chapter/10.1007/978-3-642-23780-5_30)
* Kim, C., Park, J., Shin, J., Lee, H., Abbeel, P., Lee, K.: Preference transformer: Modeling human preferences using transformers for rl. In: 11th International Conference on Learning Representations, ICLR 2023 (2023). [Paper](https://arxiv.org/abs/2303.00957)
* Christiano, P.F., Leike, J., Brown, T., Martic, M., Legg, S., Amodei, D.: Deep Reinforcement Learning from Human Preferences. Advances in neural information processing systems 30 (2017). [Paper](https://arxiv.org/abs/1706.03741)
* Zhu, B., Jordan, M., Jiao, J.: Principled reinforcement learning with human feedback from pairwise or k-wise comparisons. In: International Conference on Machine Learning, pp. 43037–43067 (2023). [Paper](https://proceedings.mlr.press/v202/zhu23f.html)
*  Kuhar, S., Cheng, S., Chopra, S., Bronars, M., Xu, D.: Learning to discern: Imitating heterogeneous human demonstrations with preference and representation learning. In: Conference on Robot Learning, pp. 1437–1449 (2023). [Paper](https://proceedings.mlr.press/v229/kuhar23a.html)
* Akrour, R., Schoenauer, M., Sebag, M.: April: Active preference learning-based reinforcement learning. In: Joint European Conference on Machine Learning and Knowledge Discovery in Databases, pp. 116–131 (2012). [Paper](https://link.springer.com/chapter/10.1007/978-3-642-33486-3_8)
* Biyik, E., Sadigh, D.: Batch active preference-based learning of reward func-
tions. In: Proceedings of The 2nd Conference on Robot Learning. Proceedings of
Machine Learning Research, vol. 87, pp. 519–528. [Paper](https://proceedings.mlr.press/v87/biyik18a.html)
* Ross, S., Gordon, G., Bagnell, D.: A reduction of imitation learning and structured prediction to no-regret online learning. In: Proceedings of the Fourteenth International Conference on Artificial Intelligence and Statistics, pp. 627–635 (2011). JMLR Workshop and Conference Proceedings. [Paper](https://proceedings.mlr.press/v15/ross11a.html)
* Laskey, M., Lee, J., Fox, R., Dragan, A., Goldberg, K.: Dart: Noise injection for robust imitation learning. In: Conference on Robot Learning, pp. 143–156 (2017). [Paper](https://arxiv.org/abs/1703.09327)

</details>

[Back to Top](#start)
