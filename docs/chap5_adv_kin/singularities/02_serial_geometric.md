---
title: "Section 2. Singularity analysis in Serial Robots"
layout: default
math: mathjax
grand_parent: Courses
parent: Advanced Kinematics
nav_order: 1
---

### Running Example: 2R Planar Arm
Consider a 2-link planar manipulator with link lengths l1, l2 and joint angles q1, q2. The Jacobian determinant is proportional to sin(q2). When q2 = 0 or q2 = π, the arm is fully stretched or folded, and det(J) = 0. Consequences:
- Motion perpendicular to the forearm becomes difficult or impossible.
- Joint velocities must become very large to achieve certain Cartesian velocities.

### Indicators and Metrics
- det(J) or det(JJT) (square cases): Zero indicates singularity.
- Manipulability w = sqrt(det(J J^T)) (Yoshikawa): Near zero indicates near-singularity.
- Condition number κ(J): Large values indicate poor conditioning and potential numerical instability.

### Practical Detection Checklist
- Compute J(q) along a planned path; monitor w and κ.
- Visualize manipulability ellipsoids to understand available motion directions.
- Check for known structural alignments (e.g., axis collinearity in wrists).
- For redundant robots, monitor smallest singular value σ_min(J).

### Common Pitfalls
- Confusing parameterization singularities (e.g., Euler angles) with mechanism singularities.
- Ignoring near-singular effects: even if not exactly singular, poor conditioning can break controllers.
- Overreliance on det(J): For non-square J, use σ_min(J) or manipulability instead.

### Summary
Singularities are configurations where the Jacobian loses rank, leading to loss of controllability or the need for unbounded joint speeds. Recognizing and avoiding or managing these regions is central to advanced kinematics, trajectory generation, and control. The next chapters deepen this foundation: Chapter 1 treats parallel robots via screw theory; Chapter 2 addresses serial robots geometrically; later chapters cover cuspidal behavior, analytical path guarantees, redundancy resolution, and CGA perspectives.

### Quick Self-Check
1) What does rank(J) represent physically?
2) Why can joint velocities blow up near a singularity?
3) Name two configurations of a 2R arm that are singular.