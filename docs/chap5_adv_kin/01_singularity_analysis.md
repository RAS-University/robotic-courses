---
title: "5.1 Singularity analysis"
parent: "Chapter 5: Advanced Kinematics"
has_children: false
nav_order: 1
layout: numbered
math: mathjax
chapter: 5
section: 1
---
<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Singularity analysis
- Table of Contents
{:toc}

## Prerequisites
## General Motivation
## Course Content

### General Concepts

- [Section 1. Introduction to singularities](singularities/01_introduction)
- [Section 2. Singularities in Parallel Robots: Screw Theory](singularities/02_serial_geometric)
- [Section 3. Singularities in Serial Robots: Geometric Perspective](singularities/03_parallel_screw)

### TL;DR
- Workspace Boundary Singularities: Occur at the limits of reach (e.g., arm fully stretched or folded).
- Structural Singularities: Caused by specific geometric alignments of joint axes (e.g., wrist singularities where two axes align).
- Algorithmic/Representation Singularities: Due to parameterizations (e.g., Euler-angle gimbal lock) rather than the mechanism itself.
- Parallel vs Serial:
    - Serial: Usually tied to J(q) losing invertibility (square manipulators) or conditioning (redundant manipulators).
    - Parallel: Constraint Jacobians lead to different singular sets (to be detailed in Chapter 1).


### References and Further Reading (Intro Level)
- J. J. Craig, Introduction to Robotics: Mechanics and Control, 4th ed., Pearson.
- B. Siciliano et al., Robotics: Modelling, Planning and Control, Springer.
- T. Yoshikawa, “Manipulability of Robotic Mechanisms,” IJRR, 1985.
- R. Murray, Z. Li, S. Sastry, A Mathematical Introduction to Robotic Manipulation, CRC.

## Credits

## Ressources