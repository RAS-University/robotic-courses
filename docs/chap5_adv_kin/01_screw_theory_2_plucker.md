---
title: "5.1 Screw Theory Plucker"
parent: "Chapter 5: Advanced Kinematics"
has_children: false
nav_order: 1
layout: numbered
math: mathjax
chapter: 5
section: 1
---
<style>
.algorithm {
  border-left: 4px solid #3b82f6; /* blue accent */
  background: #f0f7ff;            /* soft blue background */
  padding: 12px 16px;
  margin: 1em 0;
  border-radius: 6px;
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.algorithm strong {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}
</style>
<style>
.mcq input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  background: #fff;
  border: 2px solid #9ca3af;
  width: 18px;
  height: 18px;
  border-radius: 6px; /* <- makes it a rounded square */
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.mcq input[type="radio"]:checked {
  background-color: #111827;
  border-color: #111827;
  box-shadow: 0 0 0 2px #e5e7eb inset;
}
.mcq label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 15px;
  margin: 4px 0;
}
.mcq .options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 0.5rem;
}
</style>


<style>
/* Lightweight styling for callouts and quizzes */
.definition, .assignment, .example, .slide{
  border-left: 4px solid #0ea5e9; padding: 0.75rem 1rem; margin: 1rem 0; background: #0ea5e90d;
}

.note {
  border-left: 4px solid #e9620eff; padding: 0.75rem 1rem; margin: 1rem 0; background: #e9990e0d;
}

.slide { border-left-color:#22c55e; background:#22c55e0d; }
.assignment { border-left-color: #16a34a;background: #ecfdf5 }
.example { border-left-color:#a855f7; background:#a855f70d; }

.mcq { border:1px solid #e5e7eb; border-radius:8px; padding:1rem; margin:1rem 0; }
.mcq h4 { margin:0 0 0.5rem 0; }
.mcq .options { margin:0.5rem 0; }
.mcq label { display:block; cursor:pointer; margin:0.25rem 0; }
.mcq .actions { margin-top:0.5rem; }
.mcq button { border:0; padding:0.5rem 0.8rem; border-radius:6px; background:#111827; color:white; }
.mcq .result { margin-top:0.5rem; font-weight:600; }
.mcq.correct { border-color:#22c55e; background:#22c55e10; }
.mcq.incorrect { border-color:#ef4444; background:#ef444410; }
code.k { background:#f3f4f6; padding:0.1rem 0.3rem; border-radius:4px; }
</style>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Screw Theory

- Table of Contents
{:toc}

## Prerequisites

- Linear algebra: vectors, matrices, rank, and linear dependence
- Rigid-body kinematics: angular velocity, linear velocity, and reference frames
- Basic statics and mechanics: forces, moments, torques, and power

##### Quick quiz — prerequisites check
Answer the following questions, multiple options may be correct.

<div class="mcq">
<p><strong>For a point on a rigid body rotating about a fixed axis, which operation gives the point’s linear velocity from the angular velocity and its position relative to the axis?</strong></p>

<form id="q-st-p1">
  <input type="radio" name="q-st-p1" value="a"> Matrix determinant<br>
  <input type="radio" name="q-st-p1" value="b"> Cross product<br>
  <input type="radio" name="q-st-p1" value="c"> Eigenvalue decomposition<br>
  <input type="radio" name="q-st-p1" value="d"> Matrix trace<br>

  <button type="button"
    onclick="checkMCQ('q-st-p1', 'b',
      'Correct. If a point has position vector r relative to a point on the rotation axis, its linear velocity is v = ω × r. This cross product is also the operation that appears in the moment/linear part of a revolute screw.',
      'Incorrect, try again!')">
    Check Answer
  </button>

  <p id="q-st-p1-feedback"></p>
</form>
</div>

<div class="mcq" markdown="1">
<p><strong>What is the rank of the following matrix?</strong></p>

$$
A =
\begin{bmatrix}
1 & 2 & 3 \\ <br>
2 & 4 & 6 \\ <br>
0 & 1 & 1
\end{bmatrix}
$$

<p>
Recall: the rank of a matrix is the number of linearly independent rows or columns.
</p>

<form id="q-st-p2">
  <input type="radio" name="q-st-p2" value="a"> 1<br>
  <input type="radio" name="q-st-p2" value="b"> 2<br>
  <input type="radio" name="q-st-p2" value="c"> 3<br>
  <input type="radio" name="q-st-p2" value="d"> 0<br>

  <button type="button"
    onclick="checkMCQ('q-st-p2', 'b',
      'Correct. The second row is twice the first row, so these two rows are linearly dependent. However, the third row is independent of the first row, so the matrix has rank 2.',
      'Incorrect. The correct answer is 2. The second row is twice the first row, so the three rows are not all independent. But the first and third rows are independent, giving rank 2.')">
    Check Answer
  </button>

  <p id="q-st-p2-feedback"></p>
</form>
</div>


## General Motivation

Classical robot kinematics usually begins by attaching frames to links and joints, then multiplying the corresponding transformations. This works well for many introductory problems, but it can also make the geometry of motion feel secondary. In a spatial robot, the essential question is not only where each frame is placed, but what motion each joint permits between two neighboring bodies. Screw theory begins precisely from this motion-centered viewpoint. 

The key observation is that rigid-body motion in space has a natural axis-based structure. A finite displacement can be interpreted through a screw: a rotation about an axis combined with a translation along that axis. At the velocity level, the same idea appears as an instantaneous screw axis. Thus, screw theory gives us one geometric language for both displacement and velocity. Rotation, translation, and helical motion are no longer treated as unrelated cases; they become different forms of the same underlying object.

<p align="center">
  <img src="{{ '/assets/images/screw_theory/screw_general_motivation.svg' | relative_url }}"
       alt="Finite and instantaneous screw motion of a rigid body"
       style="width:100%; max-width:900px; height:auto;">
</p>

This viewpoint is especially useful in robotics because most elementary joints generate simple screw motions. A revolute joint corresponds to zero pitch, a prismatic joint corresponds to pure translation, and a helical joint corresponds to finite pitch. Therefore, instead of describing every joint through a special frame convention, we can describe it by its screw coordinates. For a joint axis with unit direction $\mathbf e$, a point $\mathbf p$ on the axis, and pitch $h$, the corresponding screw coordinate vector,$\mathcal{S}$, is written as:

$$
\mathcal{S} =
\begin{bmatrix}
\mathbf e \\ <br>
\mathbf p \times \mathbf e + \mathbf e \cdot h
\end{bmatrix}.
$$

The motion generated by this joint is then obtained through the exponential map which is the bridge from instantaneous motion to finite rigid-body motion. In other words, screw theory explains the geometry of the motion, while the exponential map provides the analytic mechanism that turns a joint coordinate into a rigid transformation.

<!-- ![A joint screw axis generating finite motion through the exponential map](path/to/joint_screw_exponential.png) -->

The advantage becomes clearer for serial robots. A robot with $n$ revolute joints, 'nR' robot, is not merely a chain of 'n' frame transformations; it is a system generated by 'n' joint screws. Its reachable positions, velocity directions, and singular configurations are shaped by the geometry of these 'n' axes. For example, a 6R robot can be viewed as six screw generators acting in sequence. The end-effector motion is then written as a product of exponentials,

$$
\mathbf H_i(\mathbf q)
=
\exp(Y_1q_1)\exp(Y_2q_2)\cdots\exp(Y_iq_i)A_i,
$$

where $Y_j$ is the screw coordinate vector of joint $j$ expressed in the inertial frame $F_0$ at the reference configuration, and $A_i=H_i(0)$ is the absolute reference configuration of body $i$.

This formula is not only compact; it changes how we think about forward kinematics. The robot is described by its joint axes and reference pose, rather than by a long sequence of auxiliary frames. This reduces the dependence on restrictive conventions such as Denavit-Hartenberg parameters and makes the geometry of the mechanism more explicit.

<p align="center">
  <img src="{{ '/assets/images/screw_theory/poe.svg' | relative_url }}"
       alt="Product of exponentials representation of a serial robot"
       style="width:100%; max-width:900px; height:auto;">
</p>

Screw theory also prepares the ground for velocity kinematics. The same screw coordinates that generate finite motions become the building blocks of twists and Jacobians. Each column of the geometric Jacobian can be interpreted as a joint screw transported to the current configuration. Singularities can then be studied as situations where the available joint screws lose rank or develop special geometric dependencies. This is why screw theory is more than a notation: it is a way to read the motion capability of a robot directly from the geometry of its axes.

For this chapter, the story is therefore simple. We start from the limitations of purely frame-based kinematics, introduce screws as the natural geometry of rigid-body motion, connect instantaneous and finite motion through the exponential map, and then use the Product of Exponentials formula to describe 3R and 6R robots. Once this language is established, twists, Jacobians, and singularities will appear as different views of the same geometric structure.

> **Exercise 5.1.2**
>
> Consider three one-degree-of-freedom joints: revolute, prismatic, and helical. For each joint, identify the screw axis direction $e$, the pitch $h$, and the physical meaning of the exponential motion $\exp(\widehat{X}q)$. Then explain why a 6R robot can be interpreted as six screw-generated motions composed in sequence.

##### Quick quiz — motivation
<div class="mcq">
<p><strong>Question: What is the main geometric idea behind screw theory?</strong></p>
<form id="q-st-m1">
  <input type="radio" name="q-st-m1" value="a"> Every robot must be modeled only with Denavit-Hartenberg frames.<br>
  <input type="radio" name="q-st-m1" value="b"> Rigid-body motion can be described through axis-based screw motions.<br>
  <input type="radio" name="q-st-m1" value="c"> Translational and rotational motions must always be analyzed separately.<br>
  <input type="radio" name="q-st-m1" value="d"> Singularities occur only in parallel robots.<br>
  <button type="button"
    onclick="checkMCQ('q-st-m1', 'b',
      'Correct. Screw theory treats rotation, translation, and helical motion as forms of one axis-based object.',
      'Incorrect. Correct answer: (b). The central idea is the axis-based description of rigid-body motion.')">
    Check Answer
  </button>
  <p id="q-st-m1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question: In the POE formula, what does each exponential factor represent?</strong></p>
<form id="q-st-m2">
  <input type="radio" name="q-st-m2" value="a"> The finite motion generated by one joint screw.<br>
  <input type="radio" name="q-st-m2" value="b"> The determinant of the robot Jacobian.<br>
  <input type="radio" name="q-st-m2" value="c"> The mass matrix of one link.<br>
  <input type="radio" name="q-st-m2" value="d"> A coordinate-frame label with no physical motion.<br>
  <button type="button"
    onclick="checkMCQ('q-st-m2', 'a',
      'Correct. Each exponential maps a joint screw and joint coordinate into a finite rigid motion.',
      'Incorrect. Correct answer: (a). A POE factor is the finite motion contributed by one joint screw.')">
    Check Answer
  </button>
  <p id="q-st-m2-feedback"></p>
</form>
</div>

## Course Content

### Notations

The following notations will be used throughout this chapter. They are fixed here so that the meaning of every symbol stays consistent as the ideas become more advanced.

- A scalar is written in standard italic form, for example $x \in \mathbb{R}$.
- A vector is written in bold lowercase, for example $\mathbf{r}, \mathbf{v}, \mathbf{f}$.
- A matrix is written in bold uppercase, for example $\mathbf{R}, \mathbf{J}, \mathbf{A}$.
- A vector quantity that is traditionally denoted by a Greek letter is written in bold Greek, for example the angular velocity $\boldsymbol{\omega}$.
- Every six-dimensional entity made of two three-dimensional vectors is written as a stacked column vector.
- The symbol $\phi$ denotes the (scalar) joint/motion parameter. For a revolute motion it is an angle; later it can itself be a function of time, $\phi=\phi(t)$.
- A dot denotes a time derivative (e.g., $\dot{\phi}=d\phi/dt$), while $d(\cdot)/d\phi$ denotes differentiation with respect to the motion parameter.

#### Reference frames and suffixes

We will use two reference frames:

- $\{S\}$: the fixed (spatial) frame
- $\{B\}$: the moving (body) frame attached to the rigid body

Whenever a vector (or screw) is expressed in coordinates of a particular frame, we indicate it with a **suffix** (a right superscript):

- $^S\mathbf{a}$: the coordinate vector of $\mathbf{a}$ expressed in frame $\{S\}$
- $^B\mathbf{a}$: the coordinate vector of $\mathbf{a}$ expressed in frame $\{B\}$

The same convention applies to screws, twists, and wrenches:

- $^S\mathcal{T},\ ^B\mathcal{T}$ for a twist expressed in $\{S\}$ or $\{B\}$
- $^S\mathcal{W},\ ^B\mathcal{W}$ for a wrench expressed in $\{S\}$ or $\{B\}$

Homogeneous transformations and rotation matrices carry **frame indices as a prefix**. We write:

- $^S\mathbf{R}_{B}\in SO(3)$ rotation that maps coordinates expressed in $\{B\}$ to coordinates expressed in $\{S\}$,
- $^S\mathbf{H}_{B}\in SE(3)$ for the homogeneous transformation (pose) of frame $\{B\}$ relative to frame $\{S\}$.

Concretely, $^S\mathbf{R}_{B}$ means:

$$
^S\mathbf{a} = ^S\mathbf{R}_{B}\,\mathbf{a}^B.
$$

You can read $^S\mathbf R_B$ as "**from $B$ to $S$**": it takes coordinates expressed in $\{B\}$ and returns the same geometric vector expressed in $\{S\}$. (Equivalently, $^B\mathbf R_S=(^S\mathbf R_B)^T$ maps from $\{S\}$ to $\{B\}$.)

Unless otherwise stated, when we write $\mathbf{R}(\phi)$ in this section we mean $^S\mathbf R_B(\phi)$, and similarly $\mathbf{H}(\phi)$ means $^S\mathbf H_B(\phi)\in SE(3)$.

In a **serial arm**, we will additionally use a *family* of frames $\{0\},\{1\},\dots,\{n\}$ attached to bodies/links (with $\{0\}$ typically the base frame and $\{n\}$ an end-effector frame). The same prefix notation applies:

- ${}^{i}\mathbf{H}_{j}$ is the pose of frame $\{j\}$ relative to frame $\{i\}$.
- Composition: $^i\mathbf H_k = ^i\mathbf H_j$ $^j\mathbf H_k$.
- Inverse: $^j\mathbf H_i = (^i\mathbf H_j)^{-1}$.

#### Skew and screw operators

We use two different "lift" operators:

- For a 3D vector $\mathbf{a}\in\mathbb{R}^3$, its skew-symmetric matrix is written with a tilde, $\tilde{\mathbf{a}}\in\mathbb{R}^{3\times 3}$, defined by $\tilde{\mathbf{a}}\,\mathbf{b}=\mathbf{a}\times \mathbf{b}$.
- For a twist/screw $\mathcal{T}=\begin{bmatrix}\boldsymbol{\omega}\\ \mathbf{v}\end{bmatrix}$, its $4\times 4$ matrix in $\mathfrak{se}(3)$ is written with a hat, $\hat{\mathcal{T}}$.

In addition, we will use the following symbols systematically:

- $\mathcal{S}$: a screw
- $\mathcal{T}$: a twist, that is, a motion screw
- $\mathcal{W}$: a wrench, that is, a force screw
- $\mathbf{x}$: the upper three-dimensional part of a generic screw
- $\mathbf{y}$: the lower three-dimensional part of a generic screw
- $\mathbf{f}$: a force vector
- $\mathbf{m}$: a moment vector
- $\mathbf{v}$: a linear velocity vector
- $\boldsymbol{\omega}$: an angular velocity vector
- $\mathbf{s}$: a unit direction vector along a screw axis
- $\mathbf{r}_{OP}$: the position vector from point $O$ to point $P$
- $\mathrm{span}\{\mathcal{S}_1,\dots,\mathcal{S}_k\}$: the subspace generated by the listed screws

Accordingly, a screw is written as a stacked six-dimensional entity:

$$
\mathcal{S}=
\begin{bmatrix}
\mathbf{x} \\ <br>
\mathbf{y}
\end{bmatrix}
$$

When the screw represents motion, we write the twist as:

$$
\mathcal{T}=
\begin{bmatrix}
\boldsymbol{\omega} \\ <br>
\mathbf{v}
\end{bmatrix}
$$

When it represents force transmission, we write the wrench as:

$$
\mathcal{W}=
\begin{bmatrix}
\mathbf{f} \\ <br>
\mathbf{m}
\end{bmatrix}
$$

This stacked notation will be maintained throughout the chapter whenever a six-dimensional object is composed of two three-dimensional vectors.

To discuss reciprocity, we will use $\odot$ to denote the reciprocal product between two screws:

$$
\mathcal{S}_1 \odot \mathcal{S}_2
=
\mathbf{x}_1 \cdot \mathbf{y}_2 + \mathbf{x}_2 \cdot \mathbf{y}_1
$$

In particular, for a wrench and a twist, the pairing becomes:

$$
\mathcal{W} \odot \mathcal{T}
=
\mathbf{f}\cdot\mathbf{v} + \mathbf{m}\cdot\boldsymbol{\omega}.
$$
This scalar is the quantity that will later encode power and reciprocity. A recurring idea in this chapter is that two screws are reciprocal when their pairing is zero.

##### Quick quiz — notation and 6D objects
<div class="mcq">
<p><strong>Question: In this chapter, what does the suffix in $^S\mathcal{T}$ indicate?</strong></p>
<form id="q-st-n1">
  <input type="radio" name="q-st-n1" value="a"> The twist is squared.<br>
  <input type="radio" name="q-st-n1" value="b"> The twist is expressed in frame $\{S\}$.<br>
  <input type="radio" name="q-st-n1" value="c"> The twist is a scalar quantity.<br>
  <input type="radio" name="q-st-n1" value="d"> The twist belongs only to spherical joints.<br>
  <button type="button"
    onclick="checkMCQ('q-st-n1', 'b',
      'Correct. The suffix tells us which frame is used to express the coordinates.',
      'Incorrect. Correct answer: (b). The suffix is a coordinate-frame label.')">
    Check Answer
  </button>
  <p id="q-st-n1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question: What is the reciprocal product $\mathcal{W}\odot\mathcal{T}$ used to encode for a wrench and a twist?</strong></p>
<form id="q-st-n2">
  <input type="radio" name="q-st-n2" value="a"> Instantaneous power<br>
  <input type="radio" name="q-st-n2" value="b"> Matrix size<br>
  <input type="radio" name="q-st-n2" value="c"> Link length only<br>
  <input type="radio" name="q-st-n2" value="d"> The determinant of $\mathbf{R}$<br>
  <button type="button"
    onclick="checkMCQ('q-st-n2', 'a',
      'Correct. The reciprocal product pairs wrench action with twist motion as power.',
      'Incorrect. Correct answer: (a). For a wrench and twist, the pairing is the instantaneous power scalar.')">
    Check Answer
  </button>
  <p id="q-st-n2-feedback"></p>
</form>
</div>

### Directed Lines, Plücker Coordinates, and Screws

Before introducing screw motion, it is useful to separate three closely related ideas:

1. a **directed line**, which is only geometry,
2. its **Plücker coordinates**, which are coordinates of that line,
3. a **screw**, which is a Plücker line together with a pitch.

#### Directed line

A directed line in space is specified by two pieces of information:

- a unit direction vector $\mathbf{s}$,
- one point $P$ on the line, with position vector $\mathbf{p}$ from the origin $O$.

Every point on the same line can be written as

$$
\mathbf{r}(\lambda)
=
\mathbf{p}+\lambda \mathbf{s},
\qquad \lambda\in\mathbb{R}.
$$

The vector $\mathbf{s}$ gives the direction of the line, while $\lambda$ moves us along the line.

#### Plücker coordinates of a line

The same directed line can be represented by the pair

$$
\mathcal{L}
=
\begin{bmatrix}
\mathbf{s} \\ <br>
\mathbf{m}_O
\end{bmatrix},
\qquad
\mathbf{m}_O = \mathbf{p}\times \mathbf{s}.
$$

Here, $\mathbf{m}_O$ is the **moment of the line about the origin**. It tells us where the line is located relative to the origin.

This representation does not depend on which point $P$ is chosen on the line. If we choose another point

$$
\mathbf{p}'=\mathbf{p}+\lambda \mathbf{s},
$$

then

$$
\mathbf{p}'\times \mathbf{s}
=
(\mathbf{p}+\lambda\mathbf{s})\times\mathbf{s}
=
\mathbf{p}\times\mathbf{s}.
$$

So $\mathbf{m}_O$ is a property of the line, not of the particular point used to compute it.

Because $\mathbf{m}_O=\mathbf{p}\times\mathbf{s}$, Plücker coordinates satisfy

$$
\mathbf{s}\cdot\mathbf{m}_O=0.
$$

Thus, a directed line can be encoded by a six-dimensional vector, but not every six-dimensional vector is a line. A valid line must satisfy the Plücker relation.

#### From Plücker coordinates to screws

A screw keeps the same axis geometry as a Plücker line, but adds a **pitch** $h$:

$$
\mathcal{S}
=
\begin{bmatrix}
\mathbf{s} \\ <br>
\mathbf{m}_O + h\mathbf{s}
\end{bmatrix}.
$$

The first part $\mathbf{s}$ gives the screw axis direction. The term $\mathbf{m}_O=\mathbf{p}\times\mathbf{s}$ locates the axis in space. The additional term $h\mathbf{s}$ adds translation along the same axis.

Special cases are important:

- $h=0$: a zero-pitch screw, corresponding to a pure rotation about the axis,
- $h\neq 0$: a finite-pitch screw, corresponding to rotation about the axis combined with translation along it,
- $\mathbf{s}=\mathbf{0}$: a pure translation direction, treated as a limiting screw.

For a general screw

$$
\mathcal{S}
=
\begin{bmatrix}
\mathbf{x} \\ <br>
\mathbf{y}
\end{bmatrix},
\qquad \mathbf{x}\neq\mathbf{0},
$$

the pitch can be recovered from

$$
h=
\frac{\mathbf{x}\cdot\mathbf{y}}{\mathbf{x}\cdot\mathbf{x}}.
$$

The Plücker moment of the underlying axis is then

$$
\mathbf{m}_O
=
\mathbf{y}-h\mathbf{x},
$$

which satisfies

$$
\mathbf{x}\cdot\mathbf{m}_O=0.
$$

#### Teaser: twists and wrenches

A twist is a **motion screw with magnitude**. Its magnitude is the rate of motion, such as an angular velocity or translational velocity. A wrench is a **force screw with magnitude**. Its magnitude is the force or torque intensity.

Therefore, twists and wrenches are not new geometric objects. They are screws used for two different physical purposes:

$$
\text{twist} = \text{motion screw},
\qquad
\text{wrench} = \text{force screw}.
$$

This is why the same six-dimensional language can later describe rigid-body velocities, joint axes, forces, moments, Jacobians, and singularities.


### Rotation, Exponentials, and Product of Exponentials

To make screw theory useful for robot kinematics, we need one more bridge: how an **instantaneous motion** gives rise to a **finite motion**. That bridge is provided by a differential equation and its solution through the matrix exponential.

#### Rotation as the solution of a differential equation

Before talking about screws in full generality, it helps to start with ordinary rotation.

The set $SO(3)$ is the set of all $3\times 3$ rotation matrices:

$$
SO(3) = \{ \mathbf{R} \in \mathbb{R}^{3 \times 3} \mid \mathbf{R}^T \mathbf{R} = \mathbf{I},\ \det(\mathbf{R}) = 1 \}.
$$

This notation means:

- $S$ stands for **special**, which here means determinant $+1$,
- $O$ stands for **orthogonal**, which means $\mathbf{R}^T\mathbf{R}=\mathbf{I}$,
- $(3)$ means we are in three-dimensional space.

So an element of $SO(3)$ is exactly a matrix that rotates vectors in 3D without stretching them, shrinking them, or reflecting them.

If a rigid body rotates, its orientation changes as the rotation angle accumulates, so we write

$$
\mathbf{R}(\phi)\in SO(3).
$$

The main question is then:

> If we know the body's instantaneous angular velocity, how do we recover the finite rotation after some rotation angle?

That is where the differential equation appears.

#### Simple intuition: one point moving on a circle

First consider a point rotating in the $x$-$y$ plane around the origin with constant angular speed $\omega$, so the rotation angle is $\phi(t)=\omega t$. Parameterizing the position by the angle, we write

$$
\mathbf{r}(\phi) = 
\begin{bmatrix}
\cos(\phi) \\ <br> 
\sin(\phi)\\ <br>
0
\end{bmatrix}
$$

From elementary kinematics, the velocity is tangent to the circle and perpendicular to the radius. In matrix form,

$$
\frac{d\mathbf{r}(\phi)}{d\phi}=
\begin{bmatrix}
0 & -1 & 0 \\ <br>
1 & 0 & 0 \\ <br>
0 & 0 & 0
\end{bmatrix}
\mathbf{r}(\phi)
$$

<figure>
  <img src="/assets/images/screw_theory/rotation_planar.png" alt="Planar rotation with radius vector and tangent velocity" style="display: block; max-width: 100%; height: auto; margin: 1rem auto;" />
  <figcaption><strong>Figure:</strong> The linear velocity at a point is normal to axis of rotation and its position vector, and is obtained by scaling by the angular speed.</figcaption>
</figure> 

So even in this simple planar case, the motion is already written as a linear differential equation of the form

$$
\frac{d\mathbf{r}}{d\phi} = \tilde{\mathbf{w}}\,\mathbf{r},
$$

where $\mathbf{w}$ is the (unit) axis of rotation (here $\mathbf{w}=\mathbf{e}_z$) and $\tilde{\mathbf{w}}$ is its skew-symmetric matrix.

The 3D case is the same idea, only now the generator is built from the angular velocity vector.

#### How the rotational differential equation appears

Using the skew-symmetric matrix associated with a unit rotation axis $\mathbf{n}$,

$$
\tilde{\mathbf{n}} =
\begin{bmatrix}
0 & -n_z & n_y \\ <br>
n_z & 0 & -n_x \\ <br>
-n_y & n_x & 0
\end{bmatrix},
$$

which is defined so that

$$
\tilde{\mathbf{n}}\,\mathbf{a}=\mathbf{n}\times \mathbf{a}
$$

for every vector $\mathbf{a}\in\mathbb{R}^3$.

Now take any vector $\mathbf{u}$ fixed in the body. As the body rotates, its coordinates in the spatial frame are

$$
\mathbf{r}(\phi)=\mathbf{R}(\phi)\mathbf{u}.
$$

Its rate of change with respect to the rotation angle must be

$$
\frac{d\mathbf{r}(\phi)}{d\phi}=\mathbf{n}\times \mathbf{r}(\phi)
=
\tilde{\mathbf{n}}\,\mathbf{r}(\phi).
$$

But since $\mathbf{u}$ is constant in the body,

$$
\frac{d\mathbf{r}(\phi)}{d\phi}=\frac{d\mathbf{R}(\phi)}{d\phi}\mathbf{u}.
$$

Combining the two expressions gives

$$
\frac{d\mathbf{R}(\phi)}{d\phi}\mathbf{u}
=
\tilde{\mathbf{n}}\,\mathbf{R}(\phi)\mathbf{u}
$$

for every body-fixed vector $\mathbf{u}$. Therefore,

$$
\frac{d\mathbf{R}(\phi)}{d\phi} = \tilde{\mathbf{n}}\,\mathbf{R}(\phi).
$$

This is the rotational differential equation with $\phi$ as the parameter. It says that the rate of change of orientation is produced by the infinitesimal rotation operator $\tilde{\mathbf{n}}$ acting on the current orientation. (Later, if $\phi=\phi(t)$, then $\boldsymbol{\omega}=\dot{\phi}\,\mathbf{n}$ and the usual time-based form is recovered.)

If the axis is constant, this linear differential equation has the solution

$$
\mathbf{R}(\phi)=\exp(\tilde{\mathbf{n}}\,\phi)\,\mathbf{R}(0).
$$

This is the first important idea: a **finite rotation** is obtained by integrating an **instantaneous rotational generator**, and the result is written with the matrix exponential.

##### Quick quiz — rotational generator
<div class="mcq">
<p><strong>Question: What does the skew-symmetric matrix $\tilde{\mathbf{n}}$ do to a vector $\mathbf{a}$?</strong></p>
<form id="q-st-r1">
  <input type="radio" name="q-st-r1" value="a"> It computes $\mathbf{n}\times\mathbf{a}$.<br>
  <input type="radio" name="q-st-r1" value="b"> It computes $\mathbf{n}\cdot\mathbf{a}$.<br>
  <input type="radio" name="q-st-r1" value="c"> It normalizes $\mathbf{a}$.<br>
  <input type="radio" name="q-st-r1" value="d"> It reflects $\mathbf{a}$ through the origin.<br>
  <button type="button"
    onclick="checkMCQ('q-st-r1', 'a',
      'Correct. The tilde operator turns cross product by n into matrix multiplication.',
      'Incorrect. Correct answer: (a). By definition, tilde n times a equals n cross a.')">
    Check Answer
  </button>
  <p id="q-st-r1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question: Why does $\frac{d\mathbf{R}}{d\phi}=\tilde{\mathbf{n}}\mathbf{R}$ lead naturally to an exponential?</strong></p>
<form id="q-st-r2">
  <input type="radio" name="q-st-r2" value="a"> It is a linear differential equation with a constant generator.<br>
  <input type="radio" name="q-st-r2" value="b"> It is a polynomial interpolation formula.<br>
  <input type="radio" name="q-st-r2" value="c"> It is a numerical integration error model.<br>
  <input type="radio" name="q-st-r2" value="d"> It applies only when $\mathbf{R}$ is not orthogonal.<br>
  <button type="button"
    onclick="checkMCQ('q-st-r2', 'a',
      'Correct. Constant linear generators integrate to matrix exponentials.',
      'Incorrect. Correct answer: (a). The exponential is the closed-form solution of this constant-generator differential equation.')">
    Check Answer
  </button>
  <p id="q-st-r2-feedback"></p>
</form>
</div>

#### The matrix exponential

For any square matrix $\mathbf{A}$, the exponential is defined by the power series

$$
\exp(\mathbf{A})=
\mathbf{I}+\mathbf{A}+\frac{\mathbf{A}^2}{2!}+\frac{\mathbf{A}^3}{3!}+\frac{\mathbf{A}^4}{4!}+\cdots
$$

So here we set

$$
\mathbf{A}=\tilde{\mathbf{n}}\,\phi.
$$

Then

$$
\exp(\tilde{\mathbf{n}}\,\phi)
=
\mathbf{I}
+
\tilde{\mathbf{n}}\,\phi
+
\frac{(\tilde{\mathbf{n}}\,\phi)^2}{2!}
+
\frac{(\tilde{\mathbf{n}}\,\phi)^3}{3!}
+
\frac{(\tilde{\mathbf{n}}\,\phi)^4}{4!}
+\cdots
$$

Now use the identities for a unit vector $\mathbf{n}$:

$$
(\tilde{\mathbf{n}})^2 = \mathbf{n}\mathbf{n}^T - \mathbf{I}, \quad (\tilde{\mathbf{n}})^3 = -\tilde{\mathbf{n}}, \quad (\tilde{\mathbf{n}})^4 = -(\tilde{\mathbf{n}})^2.
$$

Hence the powers repeat in cycles:

$$
(\tilde{\mathbf{n}})^{2k+1} = (-1)^k\tilde{\mathbf{n}}, \quad (\tilde{\mathbf{n}})^{2k+2} = (-1)^k(\tilde{\mathbf{n}})^2.
$$

Substituting into the power series gives

$$
\exp(\phi\tilde{\mathbf{n}})
=
\mathbf{I}
+
\left(\phi-\frac{\phi^3}{3!}+\frac{\phi^5}{5!}-\cdots\right)\tilde{\mathbf{n}}
+
\left(\frac{\phi^2}{2!}-\frac{\phi^4}{4!}+\frac{\phi^6}{6!}-\cdots\right)(\tilde{\mathbf{n}})^2.
$$

Recognizing the sine and cosine series,

$$
\sin\phi = \phi-\frac{\phi^3}{3!}+\frac{\phi^5}{5!}-\cdots, \quad
1-\cos\phi = \frac{\phi^2}{2!}-\frac{\phi^4}{4!}+\frac{\phi^6}{6!}-\cdots
$$

we obtain the Euler-Rodrigues formula:

$$
\exp(\phi\tilde{\mathbf{n}})
=
\mathbf{I}
+
\sin\phi\,\tilde{\mathbf{n}}
+
(1-\cos\phi)\,(\tilde{\mathbf{n}})^2.
$$

So the exponential is not an abstract symbol only. It is the compact closed-form expression for the finite rotation generated by a rotation of angle $\phi$ about axis $\mathbf{n}$.

<div id="rotation-exp-demo"></div>
<script src="/cuspidal_robots.js"></script>

<div id="serial-3r-demo"></div>
<script src="/serial_3r_robot.js"></script>

##### Quick quiz — matrix exponential
<div class="mcq">
<p><strong>Question: In $\exp(\phi\tilde{\mathbf{n}})$, what is the role of $\phi$?</strong></p>
<form id="q-st-e1">
  <input type="radio" name="q-st-e1" value="a"> The rotation angle about the unit axis $\mathbf{n}$<br>
  <input type="radio" name="q-st-e1" value="b"> The determinant of $\tilde{\mathbf{n}}$<br>
  <input type="radio" name="q-st-e1" value="c"> The link mass<br>
  <input type="radio" name="q-st-e1" value="d"> The pitch of every screw<br>
  <button type="button"
    onclick="checkMCQ('q-st-e1', 'a',
      'Correct. Phi scales the unit rotational generator to produce a finite rotation angle.',
      'Incorrect. Correct answer: (a). In this rotation formula, phi is the rotation parameter or angle.')">
    Check Answer
  </button>
  <p id="q-st-e1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question: What does the Euler-Rodrigues formula provide?</strong></p>
<form id="q-st-e2">
  <input type="radio" name="q-st-e2" value="a"> A closed form for the rotation matrix generated by an axis-angle pair<br>
  <input type="radio" name="q-st-e2" value="b"> A method for deleting the translation part of a pose<br>
  <input type="radio" name="q-st-e2" value="c"> A proof that all matrices are rotation matrices<br>
  <input type="radio" name="q-st-e2" value="d"> A formula for link inertia only<br>
  <button type="button"
    onclick="checkMCQ('q-st-e2', 'a',
      'Correct. It turns the exponential of a skew matrix into a closed-form rotation matrix.',
      'Incorrect. Correct answer: (a). Euler-Rodrigues is the closed-form axis-angle rotation formula.')">
    Check Answer
  </button>
  <p id="q-st-e2-feedback"></p>
</form>
</div>

### From rotations to rigid motions

Rigid-body motion in space involves both orientation and position. We therefore move from the rotation group $SO(3)$ to the rigid-motion group $SE(3)$.

A rigid motion is written as a homogeneous transformation

$$
^S\mathbf{H}_B(\phi)=
\begin{bmatrix}
^S\mathbf{R}_B(\phi) & ^S\mathbf{p}_B(\phi) \\ <br>
\mathbf{0}^T & 1
\end{bmatrix}\in SE(3)
$$

Here $\phi$ plays the role of a scalar motion parameter (for a revolute motion it is an angle; for a prismatic motion it is a distance).

Its motion per unit parameter $\phi$ from B to S is described by a twist

$$
\mathcal{T}=
\begin{bmatrix}
\boldsymbol{\omega} \\ <br>
\mathbf{v}
\end{bmatrix},
$$

or equivalently by the matrix form

$$
\hat{\mathcal{T}} =
\begin{bmatrix}
\tilde{\boldsymbol{\omega}} & \mathbf{v} \\ <br>
\mathbf{0}^T & 0
\end{bmatrix}
$$

The rigid motion then satisfies the analogous differential equation

$$
\frac{d\,^S\mathbf H_B(\phi)}{d\phi} = \hat{\mathcal{T}}\,^S\mathbf H_B(\phi).
$$

#### Spatial and body-fixed twists (two equivalent descriptions)

For kinematic analysis it is crucial to distinguish **how** a twist is represented.

Given a time-parameterized motion $^S\mathbf{H}_{B}(t)$, we define:

- the **spatial twist** (resolved in $\{S\}$):

$$
^B\hat{\mathcal{T}}^S
\;:=\;
\dot{^S\mathbf H_B}\,
(^S\mathbf H_B)^{-1},
$$

- the **body-fixed twist** (resolved in $\{B\}$):

$$
\hat{\mathcal T}
\;:=\;
(^S\mathbf H_B)^{-1}\,
\dot{^S\mathbf H_B}.
$$

They describe the **same physical motion** but in different coordinates. The two representations are related by the Adjoint mapping:

$$
^S\mathcal T = \mathrm{Ad}_{(^S\mathbf H_B)}^B\mathcal T
$$

$$
^B\mathcal{T}^B=\mathrm{Ad}_{(^S\mathbf H_B)^{-1}}^S\mathcal T.
$$

If the twist is constant, the solution is

$$
^S\mathbf H_B(\phi)=\exp(\hat{\mathcal{T}}\,\phi)\,^S\mathbf H_B(0).
$$

This is the finite version of a twist. In other words, a constant twist generates a finite **screw motion**. Rotation appears as a special case; pure translation appears as another limiting case; and the general case combines both in one unified object.

<figure>
  <p align="center">
    <img src="/assets/images/screw_theory/chasles_screw_motion.png" alt="Screw axis in space with simultaneous rotation and translation along the axis" style="display: block; max-width: 100%; height: auto; margin: 1rem auto;" />
  </p>
  <figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
    <small>Figure: A constant twist generates a screw motion: the body rotates about an axis while translating along the same axis according to the pitch.</small>
  </figcaption>
</figure>

##### Quick quiz — twists in $SE(3)$
<div class="mcq">
<p><strong>Question: What is stored in the twist $\mathcal{T}=\begin{bmatrix}\boldsymbol{\omega}\\ \mathbf{v}\end{bmatrix}$?</strong></p>
<form id="q-st-t1">
  <input type="radio" name="q-st-t1" value="a"> Angular and linear velocity components<br>
  <input type="radio" name="q-st-t1" value="b"> Mass and inertia only<br>
  <input type="radio" name="q-st-t1" value="c"> Two unrelated points in space<br>
  <input type="radio" name="q-st-t1" value="d"> A rotation matrix and a determinant<br>
  <button type="button"
    onclick="checkMCQ('q-st-t1', 'a',
      'Correct. A twist packages angular and linear velocity into a six-dimensional motion object.',
      'Incorrect. Correct answer: (a). The upper block is angular velocity and the lower block is linear velocity.')">
    Check Answer
  </button>
  <p id="q-st-t1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question: How are spatial and body-fixed twist coordinates related?</strong></p>
<form id="q-st-t2">
  <input type="radio" name="q-st-t2" value="a"> By the Adjoint transformation associated with the pose<br>
  <input type="radio" name="q-st-t2" value="b"> By changing every joint from revolute to prismatic<br>
  <input type="radio" name="q-st-t2" value="c"> By setting the translation vector to zero<br>
  <input type="radio" name="q-st-t2" value="d"> By taking the determinant of the homogeneous transform<br>
  <button type="button"
    onclick="checkMCQ('q-st-t2', 'a',
      'Correct. The Adjoint maps twist coordinates between frames.',
      'Incorrect. Correct answer: (a). Spatial and body twists describe the same motion in different coordinates, connected by an Adjoint map.')">
    Check Answer
  </button>
  <p id="q-st-t2-feedback"></p>
</form>
</div>

#### Product of exponentials

Once a single joint motion is written as an exponential, a serial chain can be built by composing those exponentials one after another.

#### Constructing joint screws from axis geometry (revolute / prismatic)

To *use* the POE formula on an actual serial robot, we need the joint screw coordinates $\mathcal{S}_i$ as a 6-vector
$
\mathcal{S}_i=
\begin{bmatrix}\boldsymbol{\omega}_i\\ \mathbf{v}_i\end{bmatrix}.
$

In a chosen reference configuration (typically the home pose), and expressed in a chosen frame (often $\{S\}$):

- **Revolute joint** about an axis with unit direction $\mathbf{s}$ passing through a point with position vector $\mathbf{q}$:

  $$
  \boldsymbol{\omega}=\mathbf{s},
  \qquad
  \mathbf{v}=-\,\boldsymbol{\omega}\times \mathbf{q}.
  $$

- **Prismatic joint** translating along unit direction $\mathbf{s}$:
  
  $$
  \boldsymbol{\omega}=\mathbf{0},
  \qquad
  \mathbf{v}=\mathbf{s}.
  $$

These formulas are the practical bridge between “axis in space” drawings and the algebraic $\exp(\hat{\mathcal{S}}_i q_i)$ factors used in POE.

Suppose joint $i$ is associated with a screw axis $\mathcal{S}_i$, expressed in a chosen reference configuration. If its joint variable is $q_i$, then the motion contributed by that joint is written as

$$
\exp(\hat{\mathcal{S}}_i\,q_i).
$$

For a serial manipulator with $n$ joints, the end-effector configuration can therefore be written as

$$
^S\mathbf{H}_{B}(q)
=
\exp(\hat{\mathcal{S}}_1 q_1)
\exp(\hat{\mathcal{S}}_2 q_2)
\cdots
\exp(\hat{\mathcal{S}}_n q_n)\,
\mathbf{A},
$$

where $\mathbf{A}:=^S\mathbf{H}_{B}(0)$ is the end-effector pose in the reference configuration.

This expression is called the **Product of Exponentials (POE)** formula. Each factor represents one joint screw acting on the body, and the complete forward kinematics is obtained by multiplying these finite joint motions in sequence.

The conceptual advantage is important:

- the model is written directly in terms of geometric joint axes,
- revolute, prismatic, and helical joints are treated in one common language,
- the kinematics is expressed without needing restrictive coordinate conventions such as Denavit-Hartenberg tables.

##### Quick quiz — POE and joint screws
<div class="mcq">
<p><strong>Question ST-POE1: For a revolute joint with unit axis $\mathbf{s}$ through point $\mathbf{q}$, what is the lower block $\mathbf{v}$ of its screw?</strong></p>
<form id="q-st-poe1">
  <input type="radio" name="q-st-poe1" value="a"> $-\boldsymbol{\omega}\times\mathbf{q}$<br>
  <input type="radio" name="q-st-poe1" value="b"> $\mathbf{0}$ for every revolute joint<br>
  <input type="radio" name="q-st-poe1" value="c"> $\mathbf{s}+\mathbf{q}$<br>
  <input type="radio" name="q-st-poe1" value="d"> $\det(\mathbf{R})\mathbf{s}$<br>
  <button type="button"
    onclick="checkMCQ('q-st-poe1', 'a',
      'Correct. The lower block records the moment part induced by the axis location.',
      'Incorrect. Correct answer: (a). For a revolute joint, v equals minus omega cross q.')">
    Check Answer
  </button>
  <p id="q-st-poe1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question ST-POE2: What is $\mathbf{A}$ in $^S\mathbf{H}_{B}(q)=\exp(\hat{\mathcal{S}}_1q_1)\cdots\exp(\hat{\mathcal{S}}_nq_n)\mathbf{A}$?</strong></p>
<form id="q-st-poe2">
  <input type="radio" name="q-st-poe2" value="a"> The end-effector pose in the reference configuration<br>
  <input type="radio" name="q-st-poe2" value="b"> The first joint velocity<br>
  <input type="radio" name="q-st-poe2" value="c"> The inverse of every screw axis<br>
  <input type="radio" name="q-st-poe2" value="d"> The determinant of the complete Jacobian<br>
  <button type="button"
    onclick="checkMCQ('q-st-poe2', 'a',
      'Correct. A is the home or reference pose multiplied after the joint motions.',
      'Incorrect. Correct answer: (a). A is the end-effector pose when the joint variables are at the reference configuration.')">
    Check Answer
  </button>
  <p id="q-st-poe2-feedback"></p>
</form>
</div>

#### From joint rates to end-effector twist (Jacobian)

The POE formula gives **finite pose** as a function of joint variables. The Jacobian appears when we ask the corresponding **instantaneous** question:

Given joint velocities $\dot{\mathbf{q}}=\begin{bmatrix}\dot{q}_1 & \cdots & \dot{q}_n\end{bmatrix}^T$, 
what is the end-effector twist?

**Step 1 (one joint): a Jacobian column is a screw.**

Consider a single joint motion

$$
^S\mathbf{H}_{B}(q)=\exp(\hat{\mathcal{S}}\,q)\,\mathbf{A},
$$

where $\mathcal{S}$ is the joint screw (twist per unit $q$). If $q=q(t)$ then by differentiating

$$
 \dot{\,^S\mathbf{H}_{B}}=\hat{\mathcal{S}}\,\dot{q}\,^S\mathbf{H}_{B}.
$$

By definition, the **spatial** end-effector twist $\mathcal{T}_{EE}^S$ satisfies

$$
\dot{\,^S\mathbf{H}_{B}}=\hat{\mathcal{T}}_{EE}^S\,^S\mathbf{H}_{B},
$$

so for one joint,

$$
\mathcal{T}_{EE}^S=\mathcal{S}\,\dot{q}.
$$

In other words, the "Jacobian" for a 1-DOF joint is just the screw itself.

**Step 2 (many joints): each joint contributes a screw scaled by $\dot{q}_i$.**  
For convenience, define the cumulative transformation up to joint $i$ (the prefix frame index is explicit):

$$
^S\mathbf{H}_{i}(q)
:=
\exp(\hat{\mathcal{S}}_1 q_1)\cdots \exp(\hat{\mathcal{S}}_i q_i),
\qquad ^S\mathbf{H}_{0}(q):=\mathbf{I}.
$$

Differentiating the product gives a sum of $n$ terms. Each term has the factor $\hat{\mathcal{S}}_i\,\dot{q}_i$ "inserted" at joint $i$ and then carried to the spatial frame by the previous joints. The result can be written compactly using the adjoint mapping:

$$
\mathcal{T}_{EE}^S
=
\sum_{i=1}^n \mathcal{S}_i^S(q)\,\dot{q}_i,
\qquad
\mathcal{S}_i^S(q)=\mathrm{Ad}_{(^S\mathbf{H}_{i-1}(q))}\,\mathcal{S}_i.
$$

For a homogeneous transform $^S\mathbf{H}_{B}=\begin{bmatrix}^S\mathbf{R}_{B} & ^S\mathbf{p}_{B} \\ \mathbf{0}^T & 1\end{bmatrix}$, the adjoint is the $6\times 6$ matrix

$$
\mathrm{Ad}_{(^S\mathbf{H}_{B})}
=
\begin{bmatrix}
^S\mathbf{R}_{B} & \mathbf{0} \\
\widetilde{\left(^S\mathbf{p}_{B}\right)}\,^S\mathbf{R}_{B} & ^S\mathbf{R}_{B}
\end{bmatrix}.
$$

**Step 3 (stack the screws): the Jacobian is "screws side by side."**  
Define the (spatial) manipulator Jacobian by stacking these instantaneous joint screws as columns:

$$
\mathbf{J}^S(q)=
\begin{bmatrix}
\mathcal{S}_1^S(q) & \mathcal{S}_2^S(q) & \cdots & \mathcal{S}_n^S(q)
\end{bmatrix}.
$$

Then the end-effector twist is simply

$$
\mathcal{T}_{EE}^S = \mathbf{J}^S(q)\,\dot{\mathbf{q}}.
$$

##### Quick quiz — Jacobian columns
<div class="mcq">
<p><strong>Question ST-J1: What does one column of the spatial Jacobian represent?</strong></p>
<form id="q-st-j1">
  <input type="radio" name="q-st-j1" value="a"> The instantaneous end-effector twist produced by that joint at unit joint rate<br>
  <input type="radio" name="q-st-j1" value="b"> The link length between two neighboring frames<br>
  <input type="radio" name="q-st-j1" value="c"> The final homogeneous transform by itself<br>
  <input type="radio" name="q-st-j1" value="d"> The gravitational torque of the joint<br>
  <button type="button"
    onclick="checkMCQ('q-st-j1', 'a',
      'Correct. A Jacobian column is a joint screw contribution to end-effector twist.',
      'Incorrect. Correct answer: (a). Each column answers what twist appears when that joint moves at unit rate.')">
    Check Answer
  </button>
  <p id="q-st-j1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question ST-J2: Why does the column $\mathcal{S}_i^S(q)$ use $\mathrm{Ad}_{(^S\mathbf{H}_{i-1}(q))}$?</strong></p>
<form id="q-st-j2">
  <input type="radio" name="q-st-j2" value="a"> To carry joint $i$'s screw through the preceding joint motions into the spatial frame<br>
  <input type="radio" name="q-st-j2" value="b"> To make the Jacobian independent of configuration<br>
  <input type="radio" name="q-st-j2" value="c"> To convert all angular velocities into forces<br>
  <input type="radio" name="q-st-j2" value="d"> To remove the need for joint variables<br>
  <button type="button"
    onclick="checkMCQ('q-st-j2', 'a',
      'Correct. Previous joints move the later joint axes, and the Adjoint transports the screw coordinates.',
      'Incorrect. Correct answer: (a). The Adjoint expresses the moved joint screw in the spatial frame.')">
    Check Answer
  </button>
  <p id="q-st-j2-feedback"></p>
</form>
</div>

#### Body Jacobian (often the cleaner choice for link-body analysis)

Using the body-fixed twist definition above, we can also write

$$
\mathcal{T}_{EE}^B = \mathbf{J}^B(q)\,\dot{\mathbf{q}}.
$$

The spatial and body Jacobians are equivalent descriptions and are related by the same Adjoint transformation that relates twist coordinates:

$$
\mathbf{J}^B(q)=\mathrm{Ad}_{(^S\mathbf{H}_{B}(q))^{-1}}\,\mathbf{J}^S(q),
\qquad
\mathbf{J}^S(q)=\mathrm{Ad}_{(^S\mathbf{H}_{B}(q))}\,\mathbf{J}^B(q).
$$

This distinction (spatial vs body-fixed) is that: both are valid; you pick the one that makes the algebra and interpretation easiest.

#### Pose error and the log map (why screws help in IK)

For iterative geometric IK, a standard construction is the **error transform**

$$
^S\mathbf{H}_{err} := (^S\mathbf{H}_{cur})^{-1}\,^S\mathbf{H}_{des}.
$$

Its matrix logarithm lies in $\mathfrak{se}(3)$:

$$
\hat{\mathcal{T}}_{err} := \log\!\left(^S\mathbf{H}_{err}\right),
$$

and the corresponding 6-vector (twist coordinates of the error) is what gets related to joint updates through a Jacobian (spatial or body, depending on convention).

##### Quick quiz — body Jacobian and log map
<div class="mcq">
<p><strong>Question: What does the body Jacobian map joint rates to?</strong></p>
<form id="q-st-b1">
  <input type="radio" name="q-st-b1" value="a"> The end-effector twist expressed in the body frame<br>
  <input type="radio" name="q-st-b1" value="b"> The determinant of the spatial rotation matrix<br>
  <input type="radio" name="q-st-b1" value="c"> The mass of the end-effector<br>
  <input type="radio" name="q-st-b1" value="d"> The fixed home pose only<br>
  <button type="button"
    onclick="checkMCQ('q-st-b1', 'a',
      'Correct. The body Jacobian produces the same physical twist resolved in body coordinates.',
      'Incorrect. Correct answer: (a). Body means the twist coordinates are expressed in the body frame.')">
    Check Answer
  </button>
  <p id="q-st-b1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question ST-B2: In IK, why is the matrix logarithm of an error transform useful?</strong></p>
<form id="q-st-b2">
  <input type="radio" name="q-st-b2" value="a"> It converts a finite pose error into twist coordinates that can be related to joint updates.<br>
  <input type="radio" name="q-st-b2" value="b"> It proves the robot has no singularities.<br>
  <input type="radio" name="q-st-b2" value="c"> It directly gives motor currents.<br>
  <input type="radio" name="q-st-b2" value="d"> It removes all dependence on the desired pose.<br>
  <button type="button"
    onclick="checkMCQ('q-st-b2', 'a',
      'Correct. The log map turns a pose displacement into an se(3) error twist.',
      'Incorrect. Correct answer: (a). The logarithm gives a twist-like representation of finite pose error.')">
    Check Answer
  </button>
  <p id="q-st-b2-feedback"></p>
</form>
</div>

#### Singularities as linear dependence of screws

Because the Jacobian is built by stacking joint screws as columns, a **kinematic singularity** is nothing more than a loss of linear independence among those screws.

Concretely, a configuration $q$ is singular whenever the Jacobian loses rank:

$$
\mathrm{rank}\big(\mathbf{J}^S(q)\big) < \min(6,n).
$$

Geometrically, this means that the set of instantaneous motions that the robot can generate shrinks: there exist nonzero joint rates $\dot{\mathbf{q}}\neq \mathbf{0}$ such that $\mathcal{T}_{EE}^S=\mathbf{0}$ (an internal self-motion), and/or there exist task-space twists that can no longer be produced.

**Linear dependence (what it means).**  
The columns are linearly dependent if there are scalars $c_1,\dots,c_n$, not all zero, such that

$$
c_1\mathcal{S}_1^S(q)+\cdots+c_n\mathcal{S}_n^S(q)=\mathbf{0}.
$$

In that case, at least one column can be written as a linear combination of the others, so stacking more screws does not increase the dimension of the reachable instantaneous motion space.

**Example (2-DOF intuition).**  
For $n=2$, the Jacobian is

$$
\mathbf{J}^S(q)=\begin{bmatrix}\mathcal{S}_1^S(q) & \mathcal{S}_2^S(q)\end{bmatrix}.
$$

This Jacobian is singular exactly when the two screws become dependent, i.e.,

$$
\mathcal{S}_2^S(q)=\alpha\,\mathcal{S}_1^S(q)
\quad \text{for some scalar } \alpha.
$$

In plain words: joint 2 produces the *same* instantaneous end-effector twist direction as joint 1 (up to scaling), so one degree of freedom is lost at the end-effector level.

<figure>
  <div style="border: 1px solid #999; padding: 1.4rem; margin: 1rem 0; text-align: center; background: #fafafa; color: #555;">
    Placeholder image: a serial manipulator with joint screw axes and the successive exponentials composing the end-effector pose.
  </div>
  <figcaption><strong>Figure:</strong> In a serial chain, each joint contributes one exponential map. Their ordered product gives the full end-effector configuration.</figcaption>
</figure>

##### Quick quiz — singularity interpretation
<div class="mcq">
<p><strong>Question ST-S1: What is the algebraic condition for a serial manipulator singularity in this section?</strong></p>
<form id="q-st-s1">
  <input type="radio" name="q-st-s1" value="a"> $\mathrm{rank}(\mathbf{J}^S(q)) < \min(6,n)$<br>
  <input type="radio" name="q-st-s1" value="b"> $\det(^S\mathbf{H}_{B})=0$ for every pose<br>
  <input type="radio" name="q-st-s1" value="c"> Every joint variable equals zero<br>
  <input type="radio" name="q-st-s1" value="d"> The robot has at least one prismatic joint<br>
  <button type="button"
    onclick="checkMCQ('q-st-s1', 'a',
      'Correct. A singularity appears when the Jacobian loses rank.',
      'Incorrect. Correct answer: (a). The screw columns no longer span the expected dimension.')">
    Check Answer
  </button>
  <p id="q-st-s1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question ST-S2: Geometrically, what does linear dependence of Jacobian screw columns mean?</strong></p>
<form id="q-st-s2">
  <input type="radio" name="q-st-s2" value="a"> At least one joint screw contribution is redundant with the others.<br>
  <input type="radio" name="q-st-s2" value="b"> The home pose must be the identity matrix.<br>
  <input type="radio" name="q-st-s2" value="c"> The robot can generate all possible twists with fewer joints than before.<br>
  <input type="radio" name="q-st-s2" value="d"> All screws become wrenches automatically.<br>
  <button type="button"
    onclick="checkMCQ('q-st-s2', 'a',
      'Correct. Dependence means one column lies in the span of the others, so it adds no new instantaneous motion direction.',
      'Incorrect. Correct answer: (a). The available screw directions have become redundant.')">
    Check Answer
  </button>
  <p id="q-st-s2-feedback"></p>
</form>
</div>

#### Why this matters for screw theory

This viewpoint gives screw theory a direct kinematic meaning. A screw is no longer only a six-dimensional stacked quantity: it becomes the generator of a finite rigid-body motion. The exponential map tells us how to pass from an instantaneous twist to an actual displacement, and the POE formula shows how several joint screws combine to produce the motion of an entire robot. This will be essential later when we express joint motions, derive Jacobian columns from joint screws, and interpret singularities as geometric changes in the screw systems that the robot can generate or resist.

### Summary

In this section we established the core bridge between screw theory and robot kinematics:

- A rigid-body instantaneous motion is a **twist** $\mathcal{T}=\begin{bmatrix}\boldsymbol{\omega}\\ \mathbf{v}\end{bmatrix}$, and a force system is a **wrench** $\mathcal{W}=\begin{bmatrix}\mathbf{f}\\ \mathbf{m}\end{bmatrix}$.
- Finite motions in $SO(3)$ and $SE(3)$ are obtained from instantaneous generators via the **matrix exponential**.
- A serial robot's forward kinematics can be written with the **Product of Exponentials (POE)** formula using joint screws $\mathcal{S}_i$.
- The end-effector twist is related to joint rates by $\mathcal{T}_{EE}^S=\mathbf{J}^S(q)\dot{\mathbf{q}}$, and the Jacobian is literally the joint screws stacked as columns.
- Singularities correspond to **linear dependence** (rank loss) of those screw columns.

In later sections we will emphasize that wrenches are also screws, and that twists and wrenches are connected through reciprocity. That connection will let us analyze constraints and singularities of **parallel robots** efficiently using the same screw-theoretic language.

### Temporary

#### Interactive Plücker line sketch

This sketch shows how a directed line becomes Plücker coordinates and how adding pitch turns it into a screw.

#### How to use

- Drag the circular handle to rotate the directed line.
- Drag the line itself to translate it with respect to the origin.
- Use the pitch slider to see how a Plücker line becomes a screw.

For a directed line with unit direction $\mathbf{s}$ and point $A$ on the line, the Plücker coordinates are

$$
\mathcal{L}
=
\begin{bmatrix}
\mathbf{s} \\ <br>
\mathbf{m}_O
\end{bmatrix},
\qquad
\mathbf{m}_O=\mathbf{r}_{OA}\times\mathbf{s}.
$$

A screw with pitch $h$ is then

$$
\mathcal{S}
=
\begin{bmatrix}
\mathbf{s} \\ <br>
\mathbf{m}_O+h\mathbf{s}
\end{bmatrix}.
$$

##### Quick quiz — Plücker coordinates
<div class="mcq">
<p><strong>Question: Why is $\mathbf{m}_O=\mathbf{p}\times\mathbf{s}$ independent of the point chosen on the line?</strong></p>
<form id="q-st-pl1">
  <input type="radio" name="q-st-pl1" value="a"> Because adding $\lambda\mathbf{s}$ to $\mathbf{p}$ gives $(\lambda\mathbf{s})\times\mathbf{s}=\mathbf{0}$.<br>
  <input type="radio" name="q-st-pl1" value="b"> Because every line must pass through the origin.<br>
  <input type="radio" name="q-st-pl1" value="c"> Because the direction vector is always zero.<br>
  <input type="radio" name="q-st-pl1" value="d"> Because the pitch is infinite.<br>
  <button type="button"
    onclick="checkMCQ('q-st-pl1', 'a',
      'Correct. Moving along the line changes p by a multiple of s, and s cross s is zero.',
      'Incorrect. Correct answer: (a). A different point on the same line differs by lambda s, whose cross product with s is zero.')">
    Check Answer
  </button>
  <p id="q-st-pl1-feedback"></p>
</form>
</div>

<div class="mcq">
<p><strong>Question: What condition must the Plücker coordinates of a directed line satisfy?</strong></p>
<form id="q-st-pl2">
  <input type="radio" name="q-st-pl2" value="a"> $\mathbf{s}\cdot\mathbf{m}_O=0$<br>
  <input type="radio" name="q-st-pl2" value="b"> $\mathbf{s}=\mathbf{m}_O$<br>
  <input type="radio" name="q-st-pl2" value="c"> $\mathbf{m}_O=\mathbf{0}$ for every line<br>
  <input type="radio" name="q-st-pl2" value="d"> $\det(\mathbf{R})=0$<br>
  <button type="button"
    onclick="checkMCQ('q-st-pl2', 'a',
      'Correct. Since m_O is p cross s, it is perpendicular to s.',
      'Incorrect. Correct answer: (a). A valid Plucker line satisfies s dot m_O equals zero.')">
    Check Answer
  </button>
  <p id="q-st-pl2-feedback"></p>
</form>
</div>

<style>
.temporary-screw-demo {
  border: 1px solid #111;
  background: #fff;
  padding: 1rem;
  margin: 1rem 0 1.5rem 0;
}

.temporary-screw-demo .demo-grid {
  display: grid;
  grid-template-columns: minmax(280px, 1.6fr) minmax(240px, 1fr);
  gap: 1rem;
  align-items: start;
}

.temporary-screw-demo svg {
  width: 100%;
  height: auto;
  display: block;
  border: 1px solid #111;
  background: #fff;
  touch-action: none;
}

.temporary-screw-demo .demo-panel {
  border: 1px solid #111;
  padding: 0.9rem;
  background: #fff;
}

.temporary-screw-demo .control-row {
  margin-bottom: 0.9rem;
}

.temporary-screw-demo label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.temporary-screw-demo input[type="range"] {
  width: 100%;
  accent-color: #111;
}

.temporary-screw-demo .readout {
  font-family: "Courier New", Courier, monospace;
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-line;
}

.temporary-screw-demo .hint {
  font-size: 0.95rem;
  margin: 0 0 0.8rem 0;
}

@media (max-width: 840px) {
  .temporary-screw-demo .demo-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="temporary-screw-demo">
  <div class="demo-grid">
    <div>
      <svg id="plucker-line-svg" viewBox="0 0 520 520" aria-label="Interactive Plucker coordinate sketch in the x-y plane">
        <rect x="0" y="0" width="520" height="520" fill="#fff"></rect>
        <g id="plucker-line-scene"></g>
      </svg>
    </div>

    <div class="demo-panel">
      <div class="control-row">
        <label for="plucker-line-angle">Direction of the line</label>
        <input id="plucker-line-angle" type="range" min="-180" max="180" value="30" step="1">
      </div>

      <div class="control-row">
        <label for="plucker-line-offset">Signed distance from the origin</label>
        <input id="plucker-line-offset" type="range" min="-140" max="140" value="70" step="1">
      </div>

      <div class="control-row">
        <label for="plucker-line-pitch">Pitch</label>
        <input id="plucker-line-pitch" type="range" min="-80" max="80" value="0" step="1">
      </div>

      <p class="hint">
        The line is represented by direction $\mathbf{s}$ and moment $\mathbf{m}_O=\mathbf{r}_{OA}\times\mathbf{s}$. The pitch slider adds $h\mathbf{s}$ to the lower part of the screw.
      </p>

      <div id="plucker-line-readout" class="readout"></div>
    </div>
  </div>
</div>

<script>
(function () {
  const svg = document.getElementById("plucker-line-svg");
  const scene = document.getElementById("plucker-line-scene");
  const angleInput = document.getElementById("plucker-line-angle");
  const offsetInput = document.getElementById("plucker-line-offset");
  const pitchInput = document.getElementById("plucker-line-pitch");
  const readout = document.getElementById("plucker-line-readout");

  if (!svg || !scene || !angleInput || !offsetInput || !pitchInput || !readout) return;

  const cx = 260;
  const cy = 260;
  const lineHalfLength = 210;
  let dragMode = null;

  function clamp(x, lo, hi) {
    return Math.max(lo, Math.min(hi, x));
  }

  function fmt(x) {
    return (Math.abs(x) < 1e-9 ? 0 : x).toFixed(3);
  }

  function worldToSvg(p) {
    return { x: cx + p.x, y: cy - p.y };
  }

  function svgToWorld(evt) {
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const inv = svg.getScreenCTM().inverse();
    const sp = pt.matrixTransform(inv);
    return { x: sp.x - cx, y: cy - sp.y };
  }

  function getState() {
    const theta = Number(angleInput.value) * Math.PI / 180;
    const d = Number(offsetInput.value);
    const h = Number(pitchInput.value) / 40;
    const s = { x: Math.cos(theta), y: Math.sin(theta) };
    const n = { x: Math.sin(theta), y: -Math.cos(theta) };
    const A = { x: d * n.x, y: d * n.y };
    const mz = A.x * s.y - A.y * s.x;
    return { theta, d, h, s, n, A, mz };
  }

  function lineEl(x1, y1, x2, y2, attrs) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "line");
    e.setAttribute("x1", x1);
    e.setAttribute("y1", y1);
    e.setAttribute("x2", x2);
    e.setAttribute("y2", y2);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function circleEl(x, y, r, attrs) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    e.setAttribute("cx", x);
    e.setAttribute("cy", y);
    e.setAttribute("r", r);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function textEl(x, y, text, attrs) {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "text");
    e.setAttribute("x", x);
    e.setAttribute("y", y);
    e.textContent = text;
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function draw() {
    const st = getState();
    scene.innerHTML = "";

    scene.appendChild(lineEl(30, cy, 490, cy, { stroke: "#999", "stroke-width": 1 }));
    scene.appendChild(lineEl(cx, 30, cx, 490, { stroke: "#999", "stroke-width": 1 }));
    scene.appendChild(textEl(492, cy - 8, "x", { "font-size": 14 }));
    scene.appendChild(textEl(cx + 8, 28, "y", { "font-size": 14 }));

    const O = worldToSvg({ x: 0, y: 0 });
    scene.appendChild(circleEl(O.x, O.y, 4, { fill: "#111" }));
    scene.appendChild(textEl(O.x + 7, O.y - 7, "O", { "font-size": 14 }));

    const p1 = worldToSvg({ x: st.A.x - lineHalfLength * st.s.x, y: st.A.y - lineHalfLength * st.s.y });
    const p2 = worldToSvg({ x: st.A.x + lineHalfLength * st.s.x, y: st.A.y + lineHalfLength * st.s.y });
    const line = lineEl(p1.x, p1.y, p2.x, p2.y, { stroke: "#111", "stroke-width": 4, "stroke-linecap": "round", "data-role": "line" });
    scene.appendChild(line);

    const A = worldToSvg(st.A);
    scene.appendChild(lineEl(O.x, O.y, A.x, A.y, { stroke: "#555", "stroke-width": 2, "stroke-dasharray": "6 5" }));
    scene.appendChild(circleEl(A.x, A.y, 5, { fill: "#111" }));
    scene.appendChild(textEl(A.x + 8, A.y - 8, "A", { "font-size": 14 }));

    const tipWorld = { x: st.A.x + 150 * st.s.x, y: st.A.y + 150 * st.s.y };
    const tip = worldToSvg(tipWorld);
    const handle = circleEl(tip.x, tip.y, 9, { fill: "#fff", stroke: "#111", "stroke-width": 3, "data-role": "handle" });
    scene.appendChild(handle);
    scene.appendChild(textEl(tip.x + 12, tip.y - 10, "s", { "font-size": 14 }));

    const momentText = st.mz >= 0 ? "+m_z" : "-m_z";
    scene.appendChild(textEl(28, 36, momentText, { "font-size": 14 }));

    const lowerX = st.h * st.s.x;
    const lowerY = st.h * st.s.y;
    const lowerZ = st.mz;

    readout.textContent =
      "s = [" + fmt(st.s.x) + ", " + fmt(st.s.y) + ", 0]\\n" +
      "r_OA = [" + fmt(st.A.x) + ", " + fmt(st.A.y) + ", 0]\\n" +
      "m_O = r_OA x s = [0, 0, " + fmt(st.mz) + "]\\n\\n" +
      "Plucker line L = [s ; m_O]\\n" +
      "h = " + fmt(st.h) + "\\n" +
      "Screw S = [s ; m_O + h s]\\n" +
      "lower part = [" + fmt(lowerX) + ", " + fmt(lowerY) + ", " + fmt(lowerZ) + "]";
  }

  svg.addEventListener("pointerdown", function (evt) {
    const role = evt.target.getAttribute("data-role");
    if (role === "handle" || role === "line") {
      dragMode = role;
      svg.setPointerCapture(evt.pointerId);
    }
  });

  svg.addEventListener("pointermove", function (evt) {
    if (!dragMode) return;
    const st = getState();
    const p = svgToWorld(evt);

    if (dragMode === "handle") {
      const dx = p.x - st.A.x;
      const dy = p.y - st.A.y;
      const deg = Math.atan2(dy, dx) * 180 / Math.PI;
      angleInput.value = String(clamp(deg, -180, 180));
    }

    if (dragMode === "line") {
      const d = p.x * st.n.x + p.y * st.n.y;
      offsetInput.value = String(clamp(d, -140, 140));
    }

    draw();
  });

  svg.addEventListener("pointerup", function () {
    dragMode = null;
  });

  svg.addEventListener("pointerleave", function () {
    dragMode = null;
  });

  angleInput.addEventListener("input", draw);
  offsetInput.addEventListener("input", draw);
  pitchInput.addEventListener("input", draw);

  draw();
})();
</script>


## Credits

This course page was created by Durgesh Haribhau Salunkhe and Prof. Andreas Müller, with Prof. Aude Billard and funded by IEEE RAS and EPFL.

## Resources

1. A. Muller and D. Zlatanov (eds.), *Singular Configurations of Mechanisms and Manipulators*.
2. D. S. Zlatanov, *Generalized Singularity Analysis of Mechanisms*, Ph.D. dissertation, University of Toronto, 1998.
3. M. Conconi and M. Carricato, "A New Assessment of Singularities of Parallel Kinematic Chains," *IEEE Transactions on Robotics*, vol. 25, no. 4, pp. 757-770, 2009.
4. J. Selig, *Geometric Fundamentals of Robotics*.
5. R. Murray, Z. Li, and S. Sastry, *A Mathematical Introduction to Robotic Manipulation*, CRC.

<script src="../questions.js"></script>
