---
layout: default
title: Sampling-Based Planning
nav_order: 2
---

# Sampling-Based Planning

---

## Books
- *Planning Algorithms* – Steven LaValle (2006) [Free Online](http://lavalle.pl/planning/)
- *Sampling-Based Motion Planning: A Comparative Review* – Andreas Orthey, Constantinos Chamzas, Lydia E. Kavraki, arXiv:2309.13119 [cs.RO], 2023. [arXiv link](https://arxiv.org/abs/2309.13119) 

---

## Prerequisites
- Basic probability theory (random sampling, distributions)
- Robot kinematics and configuration space (C-space)
- Graph search algorithms (Dijkstra, A*, BFS)
- Collision checking in robot environments

---

# Chapter 1 : History of Motion Planning
- Pre-sampling Era (1979–1989): C-space formalization, NP-hardness proofs, potential fields.  
- Sampling Advent (1990–1999): First PRM, EST, RRT.  
- Consolidation (2000–2009): Biased sampling, dynamic-domain RRT.  
- Optimality & Learning (2010–today): RRT*/PRM*, learning-based sampling.  

---

# Chapter 2 : Motion Planning Problem
![Overview of Motion Planning](https://www.youtube.com/watch?v=aC4LQuB4Cic&list=PLggLP4f-rq01Q3clJrnWFPRtpUwSlr4mG)
><sub>*Overview of Motion Planning. YouTube video, 16 March 2018. Available at: https://www.youtube.com/watch?v=aC4LQuB4Cic&list=PLggLP4f-rq01Q3clJrnWFPRtpUwSlr4mG*</sub>

- Definition: $X\_{free}, x\_I, X\_G$

- Variants:  
  - Path planning (geometry only)  
  - Kinodynamic planning (dynamics, control limits)  
  - Optimal planning (minimize cost functional)  


---

# Chapter 3 : Sampling-Based Planning

<video width="600" autoplay loop muted playsinline controls>
  <source src="{{ '/assets/videos/sampling_planning/alpha_puzzle.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>


*Source: [James J. Kuffner](http://www.kuffner.org/james/plan/)*


---

# Chapter 3 : Components of SBMP
## 3.1 Sampling Functions
- Biased, unbiased
- Uniform, obstacle-based, clearance-based, deterministic sequences (Halton, Sukharev).  

## 3.2 Local Planning
- Connect samples with feasible short paths (straight-line, steering functions, forward propagation).  

---

# Chapter 4 : Categories of Planners
## 4.1 Graph-based (PRM family)
- Multi-query  
- Reusable roadmaps  
- Example: PRM, Lazy PRM, SPARS  

**Exercise:**  
Implement PRM on 2D maze problem. 

## 4.2 Tree-based (RRT family)
- Single-query  
- Fast online growth  
- Example: RRT, RRT-Connect, EST, FMT  

**Exercise:**  
Implement RRT on 2D maze problem. 

---

# Chapter 5 : General-purpose Improvements
- Lazy checking  
- Bidirectional search  
- Sparsity (memory-efficient roadmaps)  
- Asymptotic optimality (RRT*/PRM*)  
- Informed heuristics (BIT*, AIT*)  
- Parameter tuning & auto-optimization  

---

# Chapter 6 : Optimality guarantees
- planner property: probabilistic completeness
- asymptotic optimality: RRT*, PRM*, BIT*

---

# Chapter 7 : Kinodynamic planning
- steering method
- forward propagation

---

# Chapter 8 : Alternative Frameworks
- **Motion Optimization** (CHOMP, TrajOpt, KOMO).  
- **Motion Primitives** (RMPflow, learned primitives).  
- **Search-based Planning** (A*, SBPL).  
- **Control-based Planning** (PID, LQR, MPC, RL).  

---

<!-- # Chapter 8 : Comparative Evaluations
- Large-scale OMPL benchmarks on **24 scenarios**.  
- Classical tests (maze, cubicles, apartment).  
- Manipulation problems (UR5 shelf, Baxter table).  
- Narrow passages (bugtrap, snake).  
- Dynamic systems (Dubins car, UAV).  

**Observation:**  
No single planner dominates across all tasks. Planner choice depends on robot, environment, and task.   -->

---

# Final Project
- Implement and compare RM, RRT, RRT on a chosen benchmark.  
- Evaluate success rate, runtime, and path quality.  
- Extend to one special case (kinodynamic, narrow passage, or uncertainty).  

---

