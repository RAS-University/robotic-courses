---
title: 5.2 Cuspidal Robots
parent: "Chapter 5: Advanced Kinematics"
has_children: false
nav_order: 2
layout: numbered
math: mathjax
chapter: 5
section: 2
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

# Cuspidal Robots

- Table of Contents
{:toc}

## Prerequisites

- Jacobian rank and singularities in serial manipulators
- Inverse kinematics solutions (IKS) and configuration labels
- Basic topology ideas: connected region and boundary

## General Motivation

Most industrial path planners implicitly assume:
1. a change of IKS requires crossing a singularity,
2. each singularity-free region contains one IKS branch.

Cuspidal robots violate this assumption. They can switch IKS inside one singularity-free region. This is powerful, but it creates hidden path-planning and repeatability issues if the planner does not track branch changes.

<div class="definition" markdown="1">
**Working definition.**  
A serial robot is *cuspidal* if two distinct IKS can be connected by a continuous joint-space path that does not cross a Jacobian singularity.
</div>

---

## Course Content

### Introduction

For a fixed end-effector pose, let the set of inverse solutions be
$$
\mathcal{I}(x)=\{q_1,\dots,q_m\}.
$$
In non-cuspidal robots, moving from one branch to another usually requires crossing singularity boundaries. In cuspidal robots, at least one pair of branches is connected inside a singularity-free aspect.

This section first builds 3R intuition, then moves to 6R and 7R cases used in modern collaborative robots.

<form id="q-cusp-intro">
  <p><strong>Quick check:</strong> A cuspidal robot can change IKS without crossing a singularity.</p>
  <input type="radio" name="q-cusp-intro" value="true"> True<br>
  <input type="radio" name="q-cusp-intro" value="false"> False<br>
  <button type="button" onclick="checkTrueFalse('q-cusp-intro','true','Correct. That is the defining property.','Incorrect. This statement is true by definition.')">Check Answer</button>
  <p id="q-cusp-intro-feedback"></p>
</form>

---

### Serial 3R Robot

The 3R family is the cleanest place to understand cuspidality because singularities can be visualized in 2D cross-sections of joint space/workspace.

#### Orthogonal 3R

For orthogonal 3R structures, cusp-point geometry gives strong classification tools. A central result used in this course is:
- existence of cusp-point behavior is a reliable indicator of non-singular branch switching,
- orthogonal subclasses allow explicit parameter-space partitions and workspace topology interpretation.

<div class="example" markdown="1">
In practice, this means a robot can trace a smooth path around a cusp-related region and return to the same Cartesian neighborhood on a different IKS branch, without hitting $\det(J)=0$.
</div>

<form id="q-3r-orth">
  <p><strong>Quiz (Orthogonal 3R):</strong> Why is orthogonal 3R often used as the reference model?</p>
  <input type="radio" name="q-3r-orth" value="a"> It has no singularities.<br>
  <input type="radio" name="q-3r-orth" value="b"> It allows tractable geometric classification of cuspidal behavior.<br>
  <input type="radio" name="q-3r-orth" value="c"> It always has exactly two IKS.<br>
  <button type="button" onclick="checkMCQ('q-3r-orth','b','Correct. Orthogonal 3R is analytically tractable and reveals cusp/uniqueness structure clearly.','Incorrect. The key reason is analytical tractability for classification.')">Check Answer</button>
  <p id="q-3r-orth-feedback"></p>
</form>

#### Generic 3R

For generic 3R robots, cusp analysis is connected to critical values and conic interpretation in the \((c_3,s_3)\)-plane. A useful statement for design and analysis is:

<div class="definition" markdown="1">
For generic 3R robots, cusp-point existence is used as a necessary-and-sufficient criterion for cuspidality in the standard framework developed in the thesis.
</div>

Key takeaways:
- multiple IKS may lie in one aspect,
- pseudosingularity and critical-value structure explain how nonsingular IKS switching happens,
- uniqueness domains are smaller than aspects and are the right objects for branch-aware planning.

<form id="q-3r-generic">
  <p><strong>Quiz (Generic 3R):</strong> In cuspidal robots, which set is usually safer for branch-consistent planning?</p>
  <input type="radio" name="q-3r-generic" value="a"> Aspect only<br>
  <input type="radio" name="q-3r-generic" value="b"> Uniqueness domain<br>
  <button type="button" onclick="checkMCQ('q-3r-generic','b','Correct. Uniqueness domains preserve one-to-one branch mapping better than raw aspects.','Incorrect. Use uniqueness domains for safer branch-consistent planning.')">Check Answer</button>
  <p id="q-3r-generic-feedback"></p>
</form>

---

### Serial 6R Robot

6R cuspidality matters directly in industry because many collaborative manipulators show this behavior.

#### Simplified 6R cuspidal robots

The thesis studies simplified geometric families (for example wrist-at-end, wrist-at-beginning, wrist-in-middle decouplings) to isolate architectural causes of cuspidality.

Engineering interpretation:
- decoupled subchain structure can transfer cusp behavior from a positional subproblem,
- determinant structure and singular manifold organization indicate whether branch switching can happen without singular crossing,
- architecture is not neutral: some families are naturally more prone to cuspidality.

<form id="q-6r-simplified">
  <p><strong>Quiz (Simplified 6R):</strong> Why study simplified 6R families first?</p>
  <input type="radio" name="q-6r-simplified" value="a"> To isolate geometric causes before full generic analysis.<br>
  <input type="radio" name="q-6r-simplified" value="b"> Because generic 6R has only one IKS.<br>
  <button type="button" onclick="checkMCQ('q-6r-simplified','a','Correct. Simplified families expose causal geometry and determinant structure clearly.','Incorrect. The purpose is isolating architecture-driven causes.')">Check Answer</button>
  <p id="q-6r-simplified-feedback"></p>
</form>

#### Commercial 6R cuspidal robots

The IJRR study highlights practical issues observed in commercial-like settings:
- hidden branch switches along continuous motions,
- trajectory infeasibility due to unexpected branch evolution under constraints,
- repeatability loss for closed paths when planner assumptions ignore cuspidality.

<div class="note" markdown="1">
Practical rule: A path planner should be IKS-aware, not only collision/singularity-aware.
</div>

The same work provides branch-aware decision flow for open and closed paths and discusses cuspidality-deciding workflows for 6R robots.

<form id="q-6r-commercial">
  <p><strong>Quiz (Commercial 6R):</strong> Which risk is most typical when cuspidality is ignored?</p>
  <input type="radio" name="q-6r-commercial" value="a"> Guaranteed faster motion<br>
  <input type="radio" name="q-6r-commercial" value="b"> Hidden IKS switches causing infeasibility or non-repeatability<br>
  <button type="button" onclick="checkMCQ('q-6r-commercial','b','Correct. This is the key practical failure mode reported in 6R cuspidal applications.','Incorrect. The main risk is hidden branch switching and resulting planning failures.')">Check Answer</button>
  <p id="q-6r-commercial-feedback"></p>
</form>

---

### Serial 7R Robots

#### Redundancy parameterization and analysis

For special 7R classes, redundancy can be parameterized (for example with a redundant angle \(\theta_r\)) so each slice behaves like an equivalent lower-dimensional positional problem. This enables:
- classification of IKS evolution over \(\theta_r\),
- comparison between noncuspidal and cuspidal redundant architectures,
- explicit analysis of when non-singular IKS switching can appear in redundant robots.

<div class="definition" markdown="1">
Redundancy does not remove cuspidal issues; it can amplify them by creating more branch-continuation possibilities.
</div>

This is particularly relevant for collaborative 7R arms where repeatable human-facing behavior is required.

<form id="q-7r">
  <p><strong>Quiz (7R):</strong> What is the role of a redundancy parameterization such as \(\theta_r\)?</p>
  <input type="radio" name="q-7r" value="a"> It removes all singularities from the model.<br>
  <input type="radio" name="q-7r" value="b"> It organizes the analysis into lower-dimensional slices for IKS/singularity study.<br>
  <button type="button" onclick="checkMCQ('q-7r','b','Correct. Slicing by a redundancy parameter makes classification and branch tracking tractable.','Incorrect. The parameterization is for tractable analysis, not singularity elimination.')">Check Answer</button>
  <p id="q-7r-feedback"></p>
</form>

---

## Wrap-Up

Cuspidality is not a rare curiosity anymore. It is a design and planning property that now appears in 3R teaching models, 6R collaborative robots, and redundant 7R systems. The key practical idea across all cases is:

1. identify branch structure and uniqueness domains,
2. track branch connectivity along the path,
3. evaluate repeatability and feasibility together.

<div class="assignment" markdown="1">
**Mini exercise.**  
Choose one 6R robot model you use in class/lab. Write a one-page planning checklist with:
1) IKS branch labeling method,  
2) connectivity test for each waypoint,  
3) repeatability test for closed loops.
</div>

## Credits

This section was prepared for the Chapter 5 cuspidal module and aligned with the existing repository style.

---

[Back to Top](#start)

<!-- keeps MathJax stable on this page -->
$$
.
$$
