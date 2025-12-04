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
-  [Kinematics](kinematics) - In progress
-  [Dynamics](dynamics) - In progress
-  [System Identification](identification) - 
-  [Close-loop Control](Closeloop&PID) - In progress
-  [Model Predictive Control](MPC) - In progress
-  [Force Control](force-control) - In progress

**Chapter 2: Sensing in Robotics**
-  [Sensors and Sensing](new-sensors-for-robotics) - In progress
-  [Vision](vision-for-robotics) - In progress
-  [Force Perception](force_perception) - In progress

**Chapter 3: Motion Planning and Navigation**
{% include_relative motion_planning.md %}

# Robotics Advanced Topics I# 
**Chapter 4: Advanced Mathematical Foundations**
{% include_relative advanced_math.md %}

**Chapter 5: Advanced Kinematics**
{% include_relative adv_kin.md %}

**Chapter 6: Advanced Control**
-  [Robust Control](nonlinearcontrol) - In progress
-  [Nonlinear Control](nonlinearcontrol) - In progress
  
**Chapter 7: Manipulation**
-  [Operational Space and Null Space Control](Null-Space) 
-  [Grasping](grasping)  - In progress
-  [Dexterous Manipulation](dexterousmanipulation) 

**Chapter 8: Locomotion**
-  [Central Pattern Generator](wholebody)
-  [Stability](wholebody)
-  [Whole-Body Control](wholebody)

**Chapter 9: Aerial Robotics**
{% include_relative aerial.md %}
-  [Aerial Manipulation](aerialmanip)
-  [Collective](aerialmanip)
-  [Vision for UAVs](vision_UAV)

**Chapter 10: Robotic Application Domains Part - I**

-  [Humanoids](humanoids)
-  [Underwater Robotics](underwater)
-  [Space Exploration](space)


# Robotics Advanced Topics II# 

**Chapter 11: Robot Learning**
-  [Learning from Demonstration](LfD) - In progress
-  [Reinforcement Learning](RL)
-  [End-to-End Learning](End-to-End)
-  [Sim-to-Real and Back](Sim-to-Real)
-  [Active Learning](Active)
-  [Constraint Learning](Constraint)
-  [Transfer Learning](Transfer) - In progress

**Chapter 12: Human-Robot Interaction**
-  [Interfaces for Human-Robot Interaction](interfaces-for-HRI) - In progress
-  [Haptics for Virtual Reality, Teleoperation and Prostheses](haptics-for-robotics) - In progress
-  [Safety in Design and Control](Safety)
-  [Shared-Control](Shared-Control)
-  [Cognitive Robotics](Social)

**Chapter 13: Soft Robotics**
-  [Materials](Materials)
-  [Design and Fabrication](Fabrication)
-  [Modeling and Control](Mod-Control)
-  [Hybrid Design](Hybrid)
  
**Chapter 14: Robotic Application Domains Part - II**
-  [Exoskeletons](Exoskeletons)
-  [Educational Robotics](Education)
-  [Surgical Robotics](surgical) - In Progress
-  [Micro-Robotics](Microrobots)

**Chapter 15: Novel Trendy Research Areas in Robotics**
-  [Supernumerary Limbs](Supernumerary)
-  [Sustainable Robotics](Sustainable) - In Progress
-  [Robotics and Arts](Arts)
