---
title: "5.2 Singularity Analysis"
parent: "Chapter 5: Advanced Kinematics"
has_children: false
nav_order: 2
layout: numbered
math: mathjax
chapter: 5
section: 2
---

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">Top</a>

# Singularity Analysis

- Table of Contents
{:toc}

## Prerequisites

- Screw theory notation from Section 5.1
- Jacobian matrices and geometric interpretation of rank
- Basic familiarity with serial and parallel robot architectures

## General Motivation

Singularities are not only determinant-zero events. They are configurations where a robot suddenly loses motion capability, gains uncontrollable motion, or changes its force-transmission properties. In this chapter, we will study singularities using the language introduced in screw theory so that the geometry and the algebra remain aligned.

The goal is to build an interpretation that is useful for analysis, design, and later path-planning questions.

## Course Content

### 5.2.1 Serial Robot Singularities

- Geometric Jacobian and joint-screw viewpoint
- Column dependence and loss of attainable twists
- Typical serial-manipulator singular configurations

### 5.2.2 Parallel Robot Singularities

- Constraint equations and reciprocal screws
- Loss of constraint or gain of uncontrollable motion
- Force and motion interpretations through virtual work

### 5.2.3 Classification and Interpretation

- Instantaneous motion space vs constraint space
- Rank drop, degeneracy, and architectural insight
- Practical consequences for control and planning

### 5.2.4 Transition to Later Sections

- Why singularity-free does not guarantee branch-consistent motion
- How singularity structure connects to cuspidal robots
- Why planning must respect kinematic topology

## Credits

This course page was created by Durgesh Haribhau Salunkhe and Prof. Andreas Müller, with Prof. Aude Billard and funded by IEEE RAS and EPFL.

## Resources

1. A. Muller and D. Zlatanov (eds.), *Singular Configurations of Mechanisms and Manipulators*.
2. D. S. Zlatanov, *Generalized Singularity Analysis of Mechanisms*, Ph.D. dissertation, University of Toronto, 1998.
3. M. Conconi and M. Carricato, "A New Assessment of Singularities of Parallel Kinematic Chains," *IEEE Transactions on Robotics*, vol. 25, no. 4, pp. 757-770, 2009.
4. J. Selig, *Geometric Fundamentals of Robotics*.
5. R. Murray, Z. Li, and S. Sastry, *A Mathematical Introduction to Robotic Manipulation*, CRC.
