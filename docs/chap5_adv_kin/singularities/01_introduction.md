---
title: "Section 1. Introduction to singularities"
layout: numbered
math: mathjax
grand_parent: Courses
parent: Advanced Kinematics
nav_order: 1
---

### Overview
Singularities are special robot configurations where the kinematic relationships become degenerate. Practically, this often means a sudden loss of controllable motion in some directions, or the need for unbounded joint velocities to achieve finite end-effector velocities. Understanding singularities is essential for safe motion planning, robust control, and reliable robot design.

### Learning Objectives
By the end of this chapter, you will be able to:
- Define a kinematic singularity using the robot Jacobian and rank deficiency.
- Explain the physical consequences of singularities (loss/gain of DOF, infinite velocities, poor conditioning).
- Identify common singularities in simple serial and parallel mechanisms.
- Use basic tools (Jacobian, determinant, manipulability) to detect and interpret singularities.

### Why Singularities Matter
- Safety: Near singularities, small command errors can cause large, unexpected motions.
- Performance: Controllers may saturate as joint speeds grow to maintain Cartesian motion.
- Planning: Paths that cross singularities can be discontinuous or infeasible.
- Design: Link lengths and joint layout affect where singularities occur and how frequently they are encountered.

### Core Definitions
- Configuration q: Vector of joint variables (angles or displacements).
- Forward Kinematics x = f(q): Maps joint space to task space pose.
- Differential Kinematics x_dot = J(q) q_dot: Jacobian J relates joint velocities to end-effector twist.
- Singular Configuration q*: J(q*) loses rank (rank(J) < min(task_dof, joint_dof)).
- Consequences:
    - If J loses row rank: some Cartesian directions cannot be produced (loss of task DOF).
    - If J loses column rank (or is non-invertible square): mapping from q_dot to x_dot is not one-to-one; infinite joint velocities may be required to realize finite x_dot.
