---
title: 5.3 Path Planning with Analytical Guarantees
parent: "Chapter 5: Advanced Kinematics"
has_children: false
nav_order: 3
layout: numbered
math: mathjax
chapter: 5
section: 3
publish: false
nav_exclude: false
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

<style>
.definition, .assignment, .example, .note{
  border-left: 4px solid #0ea5e9; padding: 0.75rem 1rem; margin: 1rem 0; background: #0ea5e90d;
}
.note { border-left-color: #f59e0b; background: #f59e0b12; }
.example { border-left-color:#8b5cf6; background:#8b5cf614; }
.assignment { border-left-color:#16a34a; background:#16a34a12; }
.mcq { border:1px solid #e5e7eb; border-radius:8px; padding:1rem; margin:1rem 0; }
.mcq.correct { border-color:#22c55e; background:#22c55e10; }
.mcq.incorrect { border-color:#ef4444; background:#ef444410; }
</style>

# Path Planning for Cuspidal Robots

- Table of Contents
{:toc}

## Prerequisites

- Chapter 5.2 cuspidal terminology (IKS, aspects, uniqueness domains)
- Continuity of trajectories in joint and task spaces
- Basic constrained planning concepts (joint limits, collision checks)

## General Motivation

In cuspidal robots, singularity avoidance alone is not enough for robust planning. A path can remain nonsingular and still be:
- infeasible from a selected initial IKS,
- non-repeatable for closed loops,
- sensitive to hidden branch switches.

So the objective is branch-aware planning with analytical checks before trajectory optimization.

---

## Course Content

### Introduction

Given a workspace path \(x(s), s\in[0,1]\), planning is not just finding any \(q(s)\) with \(f(q(s))=x(s)\). We must also preserve a desired branch behavior.

Define a branch label \(\beta(s)\) for the selected IKS along the path. In cuspidal settings, \(\beta(s)\) may change even when
$$
\det\!\left(J(q(s))\right) \neq 0 \quad \forall s.
$$
Hence we need explicit connectivity analysis between local IKS choices.

<form id="q-pp-intro">
  <p><strong>Quick check:</strong> A nonsingular path is always branch-consistent and repeatable in cuspidal robots.</p>
  <input type="radio" name="q-pp-intro" value="true"> True<br>
  <input type="radio" name="q-pp-intro" value="false"> False<br>
  <button type="button" onclick="checkTrueFalse('q-pp-intro','false','Correct. Nonsingularity alone does not guarantee branch consistency or repeatability.','Incorrect. In cuspidal robots, nonsingularity is necessary but not sufficient for branch-consistent behavior.')">Check Answer</button>
  <p id="q-pp-intro-feedback"></p>
</form>

---

### Kinematic issues and mitigation

#### Kinematic issues

The IJRR framework highlights three recurring planning problems:
1. **Hidden IKS switching:** trajectory drifts to another branch without singular crossing.
2. **Feasibility mismatch:** workspace path appears valid but cannot be completed from chosen initial IKS under limits/collisions.
3. **Repeatability loss:** closed workspace loop returns to a different joint state/branch.

A practical diagnostic is to test connectivity from each sampled waypoint solution to both initial and terminal branch hypotheses before running full optimal control.

<form id="q-issues">
  <p><strong>Quiz (Issues):</strong> Which statement best describes repeatability loss in this context?</p>
  <input type="radio" name="q-issues" value="a"> The robot always crosses a singularity.
  <br>
  <input type="radio" name="q-issues" value="b"> A closed workspace loop may end on a different IKS branch.
  <br>
  <button type="button" onclick="checkMCQ('q-issues','b','Correct. This is the core repeatability issue in cuspidal planning.','Incorrect. Repeatability loss is about branch mismatch after loop closure, not mandatory singular crossing.')">Check Answer</button>
  <p id="q-issues-feedback"></p>
</form>

#### Mitigation workflow

A branch-aware workflow used in this chapter:

1. **Enumerate IKS** at sampled waypoints.
2. **Filter by constraints** (joint limits, collisions, actuator bounds).
3. **Build connectivity graph** between feasible IKS samples.
4. **Select branch-consistent path class** (open-path or closed-loop objective).
5. **Optimize trajectory** (time/energy/smoothness) inside the selected class.

<div class="definition" markdown="1">
**Planning rule.**  
First decide *which branch class is feasible and desired*, then optimize dynamics. Reversing this order can hide failures until late stages.
</div>

For closed-loop tasks, explicitly test:
$$
q(1) \stackrel{?}{=} q(0)
$$
or an accepted equivalent class if task-level repeatability allows branch offsets.

<form id="q-mitigation">
  <p><strong>Quiz (Mitigation):</strong> What should be done before time-optimal trajectory optimization in cuspidal robots?</p>
  <input type="radio" name="q-mitigation" value="a"> Only collision checking
  <br>
  <input type="radio" name="q-mitigation" value="b"> Branch/connectivity feasibility analysis
  <br>
  <button type="button" onclick="checkMCQ('q-mitigation','b','Correct. Branch feasibility should be decided before optimization.','Incorrect. Collision checks are necessary, but branch/connectivity analysis must come first in cuspidal planning.')">Check Answer</button>
  <p id="q-mitigation-feedback"></p>
</form>

---

## Summary

For cuspidal robots, robust path planning requires three guarantees:
1. kinematic feasibility,
2. branch consistency,
3. repeatability relative to task requirements.

These checks should be integrated at planning time, not treated as post-processing.

<div class="assignment" markdown="1">
**Mini exercise.**  
For one closed-loop end-effector path in your lab setup, compare two planners:
1) singularity/collision-only,
2) singularity/collision + branch connectivity.
Report whether both produce the same final IKS branch.
</div>

## Credits

This section follows the Chapter 5 methodology and uses the common quiz JavaScript utilities already present in the repository.

---

[Back to Top](#start)

<!-- keeps MathJax stable on this page -->
$$
.
$$
