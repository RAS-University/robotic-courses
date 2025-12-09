---
title: Courses
has_children: false
nav_order: 2
layout: default
---

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

<style>
.ak-drop { margin: .4rem 0 .8rem 0; border: 1px solid #e5e7eb; border-radius: .5rem; }
.ak-drop > summary { cursor: pointer; padding: .6rem .9rem; font-weight: 600; list-style: none; }
.ak-drop[open] > summary { border-bottom: 1px solid #e5e7eb; }
.ak-drop > .content { padding: .7rem .9rem .9rem; }
.ak-drop summary::-webkit-details-marker { display: none; }
.ak-drop summary::before { content: "▸"; display: inline-block; margin-right: .45rem; }
.ak-drop[open] summary::before { content: "▾"; }
</style>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Robotics Courses 

Explore the structured robotics courses below, designed to guide you from fundamental concepts to advanced robotics topics. Choose a topic to start your journey, and progressively build your robotics expertise. 

**Background/Prerequisites**: The RAS University assumes that you have an undergraduate-level training in mathematics. This includes knowledge of calculus, linear algrebra, probabilitis and statistics. 

If you are new to robotics, we recommend starting with Chapter 1 and progressing through the chapters in order. If you already have some background in the field, you may skip ahead to Advanced Topics I and II and explore the areas that interest you most. Each course begins with a list of prerequisites to help you determine whether you have the necessary foundation to follow along effectively. 
If you are already a robotics expert—or an expert in another field simply curious about the future of robotics—this course may not be the best fit. However, stay tuned: we will soon be launching an Executive Robotics Course Series designed specifically for you.


## Table of Contents 📚

# Robotics Foundation# 

**Chapter 0:** [Mathematical Foundation](mathematical-foundation) - In progress

**Chapter 1: Basics of Motion Control**
-  [1.1 Kinematics](kinematics)
-  [1.2 Dynamics](dynamics)
-  [1.3 System Identification](identification)
-  [1.4 Close-loop Control](Closeloop&PID)

**Chapter 2: Sensing in Robotics**
-  [2.2 Sensors and Sensing](new-sensors-for-robotics)
-  [2.3 Vision](vision-for-robotics)
-  [2.4 Force Perception](force_perception)

**Chapter 3: Motion Planning and Navigation**
- [3.1 Sampling-Based Planning](chap3_motion_planning/sampling-planning)
- [3.2 Geometric Methods for Planning](chap3_motion_planning/geometry-planning)
- [3.3 Dynamical Systems-Based Planning](chap3_motion_planning/DS-planning) - In Progress
- [3.4 Simultaneous Localization and Mapping (SLAM)](chap3_motion_planning/SLAM)

# Robotics Advanced Topics I# 
**Chapter 4: Advanced Mathematical Foundations**
- [4.1 Graph Theory](chap4_advanced_math/graph-theory) - In Progress
- [4.2 Group Theory](chap4_advanced_math/group-theory) - In Progress
- [4.3 Dual Quaternions](chap4_advanced_math/dual-quaternions) - In Progress


**Chapter 5: Advanced Kinematics**
- [5.1 Singularity analysis](chap5_adv_kin/01_singularity_analysis) - In Progress
- [5.2 Cuspidal Robots](chap5_adv_kin/02_cuspidal) - In Progress
- [5.3 Path Planning with Analytical Guarantees](chap5_adv_kin/03_path_analytical) - In Progress
- [5.4 Conformal Geometric Algebra](chap5_adv_kin/04_cga) - In Progress

**Chapter 6: Advanced Control**
-  [6.1 Robust Control](robustControl)
-  [6.2 Nonlinear Control](nonlinearcontrol)
-  [6.3 Model Predictive Control](MPC)
-  [6.4 Force Control](force-control)
  
**Chapter 7: Manipulation** - PENDING COMPLETION
-  [7.1 Operational Space and Null Space Control](Null-Space) 
-  [7.2 Grasping](grasping) 
-  [7.3 Dexterous Manipulation](dexterousmanipulation) 

**Chapter 8: Locomotion**  - PENDING COMPLETION
-  [8.1 Central Pattern Generator](wholebody)
-  [8.2 Stability](wholebody)
-  [8.3 Whole-Body Control](wholebody) 

**Chapter 9: Aerial Robotics**
-  [9.1 Introduction to UAVs](aerialmanip) - In Progress  TODO
-  [9.2. Multirotor Drones](aerialmanip) - In Progress   TODO
-  [9.3 Aerial Manipulation](aerialmanip)
-  [9.4 Collective](aerialmanip)
-  [9.5 Vision for UAVs](vision_UAV)

**Chapter 10: Robotic Application Domains Part - I**

-  [10.1 Humanoids](humanoids)
-  [10.2 Underwater Robotics](underwater)
-  [10.3 Space Exploration](space)


# Robotics Advanced Topics II# 

**Chapter 11: Robot Learning** 
-  [11.1 Learning from Demonstration](LfD) 
-  [11.2 Reinforcement Learning](RL) - NOT STARTED YET
-  [11.3 End-to-End Learning](End-to-End) - NOT STARTED YET
-  [11.4 Sim-to-Real and Back](Sim-to-Real) - NOT STARTED YET
-  [11.5 Active Learning](Active) - NOT STARTED YET
-  [11.6 Constraint Learning](Constraint) - NOT STARTED YET
-  [11.7 Transfer Learning](Transfer) - NOT STARTED YET

**Chapter 12: Human-Robot Interaction**
-  [12.1 Interfaces for Human-Robot Interaction](interfaces-for-HRI) - In progress
-  [12.2 Haptics for Virtual Reality, Teleoperation and Prostheses](haptics-for-robotics) - In progress
-  [12.3 Safety in Design and Control](Safety)
-  [12.4 Shared-Control](Shared-Control)
-  [12.5 Cognitive Robotics](Social)

**Chapter 13: Soft Robotics**
-  [13.1 Materials](Materials)
-  [13.2 Design and Fabrication](Fabrication)
-  [13.3 Modeling and Control](Mod-Control)
-  [13.4 Hybrid Design](Hybrid)
  
**Chapter 14: Robotic Application Domains Part - II**
-  [14.1 Exoskeletons](Exoskeletons)
-  [14.2 Educational Robotics](Education)
-  [14.3 Surgical Robotics](surgical) - In Progress
-  [14.4 Micro-Robotics](Microrobots)

**Chapter 15: Novel Trendy Research Areas in Robotics**
-  [15.1 Supernumerary Limbs](Supernumerary)
-  [15.2 Sustainable Robotics](Sustainable) - In Progress
-  [15.3 Robotics and Arts](Arts)
