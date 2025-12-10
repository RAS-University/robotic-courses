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

**Chapter 0:** [Mathematical Foundation](mathematical-foundation)


**Chapter 1: Basics of Motion Control**
-  [1.1 Kinematics](chap1_basic_motion_ctrl/kinematics)
-  [1.2 Dynamics](chap1_basic_motion_ctrl/dynamics)
-  [1.3 System Identification](chap1_basic_motion_ctrl/system_identification)
-  [1.4 Close-loop Control](chap1_basic_motion_ctrl/Closeloop&PID)

**Chapter 2: Sensing in Robotics**
-  [2.1 Sensors and Sensing](chap2_sensing/new-sensors-for-robotics)
-  [2.2 Vision](chap2_sensing/vision-for-robotics)
-  [2.3 Force Perception](chap2_sensing/force_perception)

**Chapter 3: Motion Planning and Navigation**
- [3.1 Sampling-Based Planning](chap3_motion_planning/sampling-planning)
- [3.2 Geometric Methods for Planning](chap3_motion_planning/geometry-planning)
- [3.3 Dynamical Systems-Based Planning](chap3_motion_planning/DS-planning)
- [3.4 Simultaneous Localization and Mapping (SLAM)](chap3_motion_planning/SLAM) - Under Construction (release Summer 2026)



# Robotics Advanced Topics I# 
**Chapter 4: Advanced Mathematical Foundations**
- [4.1 Graph Theory](chap4_advanced_math/graph-theory)
- [4.2 Group Theory](chap4_advanced_math/group-theory) - Under Construction (release Summer 2026)
- [4.3 Dual Quaternions](chap4_advanced_math/dual-quaternions) - Under Construction (release Summer 2026)

**Chapter 5: Advanced Kinematics**
- [5.1 Singularity analysis](chap5_adv_kin/01_singularity_analysis) - In Progress / Needs unified structure 
- [5.2 Cuspidal Robots](chap5_adv_kin/02_cuspidal) - Under Construction (release Summer 2026)
- [5.3 Path Planning with Analytical Guarantees](chap5_adv_kin/03_path_analytical)  - Under Construction (release Summer 2026)
- [5.4 Conformal Geometric Algebra](chap5_adv_kin/04_cga) - Under Construction (release Summer 2026)

**Chapter 6: Advanced Control**
-  [6.1 Robust Control](chap6_advanced_ctrl/robustControl) - Under Construction (release Summer 2026)
-  [6.2 Nonlinear Control](chap6_advanced_ctrl/nonlinearcontrol) - In Progress
-  [6.3 Model Predictive Control](chap6_advanced_ctrl/MPC)
-  [6.4 Force Control](chap6_advanced_ctrl/force-control)
  
**Chapter 7: Manipulation** - Under Construction (release Summer 2026)
-  [7.1 Operational Space and Null Space Control](chap7_manipulation/Null-Space)
-  [7.2 Grasping](chap7_manipulation/grasping) 
-  [7.3 Dexterous Manipulation](chap7_manipulation/dexterousmanipulation) 

**Chapter 8: Locomotion**  - Under Construction (release Summer 2026)
-  [8.1 Central Pattern Generator](chap8_locomotion/central_pattern_generator)
-  [8.2 Stability](chap8_locomotion/stability)
-  [8.3 Whole-Body Control](chap8_locomotion/whole_body_ctrl) 

**Chapter 9: Aerial Robotics** - Under Construction (release Summer 2026)
-  [9.1 Introduction to UAVs](chap9_aerial_robotics/aerial) - In Progress - Needs unified structure 
-  [9.2. Multirotor Drones](chap9_aerial_robotics/aerial) - In Progress - Needs unified structure 
-  [9.3 Aerial Manipulation](chap9_aerial_robotics/aerial_manipulation)
-  [9.4 Collective](chap9_aerial_robotics/collective)
-  [9.5 Vision for UAVs](chap9_aerial_robotics/vision_for_uavs)

**Chapter 10: Robotic Application Domains Part - I**  - Under Construction (release Summer 2026)
-  [10.1 Humanoids](chap10_robotic_application_domain_I/humanoids)
-  [10.2 Underwater Robotics](chap10_robotic_application_domain_I/underwater_robotics)
-  [10.3 Space Exploration](chap10_robotic_application_domain_I/space_exploration)

# Robotics Advanced Topics II# 
The Advanced Topic II pages are under Construction. Pages will be continuously updated.
Full release is planned for the summer 2026.

**Chapter 11: Robot Learning** 
-  [11.1 Learning from Demonstration](chap11_learning/LfD) - AVAILABLE
-  [11.2 Reinforcement Learning](chap11_learning/RL) 
-  [11.3 End-to-End Learning](chap11_learning/End-to-End) 
-  [11.4 Sim-to-Real and Back](chap11_learning/Sim-to-Real) 
-  [11.5 Active Learning](chap11_learning/Active) 
-  [11.6 Constraint Learning](chap11_learning/Constraint) 
-  [11.7 Transfer Learning](chap11_learning/Transfer)

**Chapter 12: Human-Robot Interaction**
-  [12.1 Interfaces for Human-Robot Interaction](chap12_hri/interfaces-for-LfD) - AVAILABLE
-  [12.2 Haptics for Virtual Reality, Teleoperation and Prostheses](chap12_hri/haptics-for-robotics) - AVAILABLE
-  [12.3 Safety in Design and Control](chap12_hri/Safety) 
-  [12.4 Shared-Control](chap12_hri/Shared-Control) 
-  [12.5 Cognitive Robotics](chap12_hri/Social) 

**Chapter 13: Soft Robotics** - Under Construction (release Summer 2026)
-  [13.1 Materials](chap13_soft_robotics/Materials)
-  [13.2 Design and Fabrication](chap13_soft_robotics/fabrication)
-  [13.3 Modeling and Control](chap13_soft_robotics/modeling_ctrl)
-  [13.4 Hybrid Design](chap13_soft_robotics/hybrid_design)
  
**Chapter 14: Robotic Application Domains Part - II** - Under Construction (release Summer 2026)
-  [14.1 Exoskeletons](chap14_robotic_application_domain_II/Exoskeletons)
-  [14.2 Educational Robotics](chap14_robotic_application_domain_II/Education)
-  [14.3 Surgical Robotics](chap14_robotic_application_domain_II/surgical) - In Progress
-  [14.4 Micro-Robotics](chap14_robotic_application_domain_II/Microrobots)

**Chapter 15: Novel Trendy Research Areas in Robotics** - Under Construction (release Summer 2026)
-  [15.1 Supernumerary Limbs](chap15_novel_trend/Supernumerary)
-  [15.2 Sustainable Robotics](chap15_novel_trend/Sustainable) 
-  [15.3 Robotics and Arts](chap15_novel_trend/Arts)
