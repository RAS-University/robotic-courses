<!-- Draft - Chapter 0: Introduction to Singularities -->

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

### Types of Singularities (High-Level)
- Workspace Boundary Singularities: Occur at the limits of reach (e.g., arm fully stretched or folded).
- Structural Singularities: Caused by specific geometric alignments of joint axes (e.g., wrist singularities where two axes align).
- Algorithmic/Representation Singularities: Due to parameterizations (e.g., Euler-angle gimbal lock) rather than the mechanism itself.
- Parallel vs Serial:
  - Serial: Usually tied to J(q) losing invertibility (square manipulators) or conditioning (redundant manipulators).
  - Parallel: Constraint Jacobians lead to different singular sets (to be detailed in Chapter 1).

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

### References and Further Reading (Intro Level)
- J. J. Craig, Introduction to Robotics: Mechanics and Control, 4th ed., Pearson.
- B. Siciliano et al., Robotics: Modelling, Planning and Control, Springer.
- T. Yoshikawa, “Manipulability of Robotic Mechanisms,” IJRR, 1985.
- R. Murray, Z. Li, S. Sastry, A Mathematical Introduction to Robotic Manipulation, CRC.
