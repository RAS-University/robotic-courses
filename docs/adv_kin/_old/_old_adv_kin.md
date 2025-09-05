---

title: "Advanced Kinematics"

parent: Courses

layout: default

math: mathjax

nav_order: 2

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


- Table of Contents

{:toc}



# Advanced Kinematics


This page covers the theory, application, and practical considerations of singularities in robotics. Understanding singularities is crucial for roboticists working on kinematics, motion planning, and advanced robotic systems.


---


## 1. Prerequisites


Before diving into singularities, you should be familiar with the following concepts:


- **Kinematics**: Understanding the motion of robots and their components.

- **Jacobian Matrix**: Essential for understanding the motion of robots and detecting singularities.

- **Screw Theory**: Useful for understanding parallel robots and their singularities.


> It is recommended to review the basic concepts of robotic kinematics before continuing.


---


## 2. General Motivation


Singularities represent configurations where a robot's performance breaks down, typically causing a loss of control or infinite velocities. Understanding singularities helps in designing more reliable and effective robots.


By addressing singularities, we can:


- Improve robot workspace efficiency.

- Avoid undesirable configurations during operation.

- Ensure smoother path planning and motion control.


---


## 3. Course Content


### Topics in this lecture

- Introduction to singularities

- Singularities in parallel robots (Screw Theory)

- Singularities in serial robots (Geometric perspective)

- Cuspidal robots and nontraditional configurations

- Path planning with analytical guarantees

- Leveraging kinematics with policy-based training

- Path planning for redundant robots

- Advanced topics: Conformal Geometric Algebra

- Programming exercises and practical implementations


### Chapter 0. Introduction to Singularities


Singularities are defined by the loss of rank in the robot's Jacobian matrix. This can lead to multiple issues such as uncontrollable robot motion or a loss of degrees of freedom.


{% include_relative adv_kin/chapter0_intro.md %}


---


### Chapter 1. Singularities in Parallel Robots: Screw Theory


Parallel robots exhibit unique types of singularities that can be described using **screw theory**. This theory provides a geometric interpretation of singularities, especially in terms of the robot's kinematic constraints.


{% include_relative adv_kin/chapter1_parallel_screw.md %}


---


### Chapter 2. Singularities in Serial Robots: Geometric Perspective


Serial robots experience singularities at specific configurations that can be described geometrically. These singularities often arise due to limitations in joint movements or actuator ranges.


{% include_relative adv_kin/chapter2_serial_geometric.md %}


---


### Chapter 3. Cuspidal Robots


Cuspidal robots are characterized by their non-traditional configurations and path planning strategies. Singularities in cuspidal robots require a different approach to motion planning.


{% include_relative adv_kin/chapter3_cuspidal.md %}


---


### Chapter 4. Path Planning with Analytical Guarantees


Path planning with analytical guarantees ensures that a robot can avoid singularities while navigating its workspace. This is crucial for autonomous robots and robotic arms in industrial applications.


{% include_relative adv_kin/chapter4_path_analytical.md %}


---


### Chapter 5. Leveraging Kinematics with Policy-based Training


Policy-based reinforcement learning (RL) can help robots learn to avoid singularities through continuous interaction with their environment. This chapter discusses the integration of kinematics with RL policies.


{% include_relative adv_kin/chapter5_policy_training.md %}


---


### Chapter 6. Path Planning for Redundant Robots


Redundant robots, with more degrees of freedom than necessary for a given task, provide flexibility in path planning. Managing redundancy helps in avoiding singularities and improving the overall task execution.


{% include_relative adv_kin/chapter6_redundant_path_planning.md %}


---


### Chapter 7. Advanced Kinematics Topics: Conformal Geometric Algebra


Conformal Geometric Algebra (CGA) offers an advanced framework for understanding and addressing singularities in complex kinematic systems, particularly in multi-body robotic systems.


{% include_relative adv_kin/chapter7_CGA.md %}


---


## 4. Programming


The following exercises will allow you to implement the concepts discussed:


- **Exercise 1**: Inverse kinematics of a generic 3R robot

- **Exercise 2**: Inverse kinematics of Industrial robots

- **Exercise 3**: Path planning in cuspidal robots

- **Exercise 4**: An example of connectivity for DS in joint space


{% include_relative adv_kin/programming.md %}


---


## 5. Exercises


### Exercise 1: Inverse Kinematics of a Generic 3R Robot

This exercise covers the process of solving inverse kinematics for a 3-link robot arm.


### Exercise 2: Inverse Kinematics of Industrial Robots

Explore inverse kinematics in real-world industrial robots like SCARA and articulated arms.


### Exercise 3: Path Planning in Cuspidal Robots

Learn path planning techniques for robots with non-traditional geometries.


### Exercise 4: Connectivity for Dynamical Systems in Joint Space

A hands-on example of analyzing robot configurations for dynamic stability and connectivity.


---


## 6. Resources


### Books

- *Robotics: Modelling, Planning, and Control* by Siciliano et al.

- *Introduction to Robotics: Mechanics and Control* by John J. Craig


### Videos

- [Understanding Robot Kinematics](https://www.youtube.com/watch?v=XXXX)

- [Path Planning for Redundant Robots](https://www.youtube.com/watch?v=YYYY)


### Programming

- [Python Robotics: Kinematics](https://github.com/python-robotics)

- [Robotics Toolbox for MATLAB](https://petercorke.com/robotics-toolbox/)
