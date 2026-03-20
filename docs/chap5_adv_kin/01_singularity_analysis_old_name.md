---
title: "5.1 Singularity analysis (Archived)"
parent: "Chapter 5 Archive"
has_children: false
nav_order: 1
layout: numbered
math: mathjax
chapter: 5
section: 1
publish: false
nav_exclude: true
---
<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

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

 
# Singularity analysis
- Table of Contents
{:toc}


## Prerequisites

This chapter assumes you are comfortable with:

- **Vectors and matrices**
  - 3D vectors, dot product, cross product
  - linear combinations, rank, null space (conceptually)
- **Rigid-body kinematics**
  - rotation matrices (or any equivalent representation)
  - the idea that a rigid body has 6 instantaneous degrees of freedom in 3D
- **Basic mechanics vocabulary**
  - force, moment (torque), and power (even informally is fine)

---

## General Motivation
Singularities are not just “when a Jacobian determinant becomes zero.”  
They are *geometric* events: certain instantaneous motions become impossible, or certain constraint forces stop being able to oppose motion. In screw theory, these statements become clean linear-algebra facts about **subspaces of twists** (allowable motions) and **subspaces of wrenches** (allowable constraints).

This chapter builds that viewpoint step by step: vector spaces → forces and moments → twists and wrenches → Chasles’ theorem → screws (axis and pitch) → Plücker coordinates. Short quizzes after each milestone check understanding and catch common confusions early, while the assignments turn the ideas into concrete calculations and geometric intuition, preparing you to understand degrees of freedom and interpret singularities, especially in parallel robots.

**Big picture.** Our goal is to use screw theory to answer questions like:

- *What motions can a mechanism produce at a given configuration?*  
- *What forces/constraints can it transmit?*  
- *When do these “capabilities” change suddenly (singularity)?*

In a serial robot, we typically build a Jacobian column-by-column from **joint screws**.  
In a parallel robot, we often reason from **constraint screws** (reciprocal to allowable motion screws) using **virtual work**.

> We will proceed slowly and carefully. If you understand the preliminaries in this chapter, the later singularity analysis becomes far less mysterious.

---

## Course Content

### Preliminaries
#### Notations (used throughout the chapter)
- A **point** in space is denoted by a capital letter: $O, P, Q$.
- A **vector** is bold: $ \mathbf{r}, \mathbf{f}, \boldsymbol{\omega} $.
- The vector from $O$ to $P$ is
  $$
  \mathbf{r}_{OP} := \mathbf{p} - \mathbf{o}.
  $$
- The **cross product** $\mathbf{a}\times \mathbf{b}$ is a vector orthogonal to both $\mathbf{a}$ and $\mathbf{b}$.
- A **frame** $Oxyz$ means origin $O$ with orthonormal axes $\hat{\mathbf{x}},\hat{\mathbf{y}},\hat{\mathbf{z}}$.

<div class="quick-fact" markdown="1">
**Dimensional sanity check.**  
Forces have units (N), moments have units (N·m), angular velocity is (rad/s), linear velocity is (m/s).  
Screw theory *mixes* these in 6-vectors — so we must be explicit about what each block means.
</div>

---

#### Vector spaces (why we start here)

A **(real) vector space** $V$ is a set of objects called “vectors” where you can:

1. add any two vectors in $V$, producing another vector in $V$
2. multiply any vector in $V$ by any real number, producing another vector in $V$

and the usual rules (associativity, distributivity, etc.) hold.

<div class="definition" markdown="1">
**Definition (span).**  
Given vectors $v_1,\dots,v_n \in V$, their **span** is
<!-- $$
\operatorname{Span}{v_1,\dots,v_n} = \{ \sum_{i=1}^n \alpha_i v_i | \alpha_i\in\mathbb{R} \}
$$ -->
$$
\operatorname{Span}\lbrace v_1,\dots,v_n\rbrace
=
\left\lbrace \sum_{i=1}^n \alpha_i v_i \ \middle|\ \alpha_i\in\mathbb{R} \right\rbrace
$$
It is the *smallest* subspace that contains all $v_i$.

</div>

**Why we care in kinematics.**  
“Possible instantaneous motions” form a subspace (a **twist subspace**).  
“Possible constraint actions” form a subspace (a **wrench subspace**).  
Singularity analysis becomes: *how do these subspaces change with configuration?*

<div class="slide" markdown="1">
**Examples vs. counterexamples (closure matters).**
- Forces acting on a **particle at a fixed point** behave like ordinary vectors → vector space.
- Pure moments (couples) also form a vector space.
- “Forces acting on a rigid body at arbitrary points” are **not** closed under naive addition unless you also track the accompanying moment → this motivates **wrenches**.
</div>

##### Quick quiz — closure intuition
<p><strong>Question 1: “All forces applied to a rigid body form a vector space under vector addition.”</strong></p>
<form id="q-vs-closure">
  <input type="radio" name="q-vs-closure" value="true"> True<br>
  <input type="radio" name="q-vs-closure" value="false"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q-vs-closure', 'false',
      'Correct. A force applied at different points generally produces different moments about a reference point, so “force alone” is not closed unless you enrich it (wrench).',
      'Incorrect. Correct answer: False. The issue is closure: adding forces with different lines of action changes the induced moment unless you include that moment as part of the object (a wrench).')">
    Check Answer
  </button>
  <p id="q-vs-closure-feedback"></p>
</form>

---

#### Forces, moments, and couples (rigid-body viewpoint)

##### Force
A **force** is a 3D vector $\mathbf{f}\in\mathbb{R}^3$. Physically, a force has:
- **magnitude** (how strong)
- **direction**
- **line of action** (where it acts)

When we say “a force applied at point $P$”, we mean:
- the vector $\mathbf{f}$, and
- the point $P$ (or equivalently the line of action)

##### Moment of a force about a point
Let $O$ be a reference point. The **moment** (torque) of $\mathbf{f}$ applied at point $P$ about $O$ is
$$
  \mathbf{m}_O := \mathbf{r}_P \times \mathbf{f}
$$
This is a 3D vector with units (N·m).

<div class="example" markdown="1">
**Example (door handle intuition).**  
A small force $\mathbf{f}$ applied far from the hinge produces a larger $\mathbf{m}_O$ because $\mathbf{r}_P$ is larger.  
That is exactly what $\mathbf{m}_O=\mathbf{r}_P\times\mathbf{f}$ encodes.
</div>

##### Changing the reference point
If you change the reference point from $O$ to another point $Q$, the moment changes as
$$
\mathbf{m}_Q = \mathbf{m}_O - \mathbf{r}_Q \times \mathbf{f}.
$$
So $\mathbf{m}_O$ is not “absolute”: it depends on the chosen reference point.

##### Couple (pure moment)
A **couple** is a *free moment*: a moment that does **not** depend on the choice of reference point.
You can realize a couple by two equal and opposite forces separated by a distance (net force = 0, net moment ≠ 0).

<div class="definition" markdown="1">
**Definition (couple).**  
A **couple** is a force system whose resultant force is zero but whose resultant moment is nonzero.
It can be represented by a single vector $\mathbf{c}\in\mathbb{R}^3$ (units N·m) that is the same about any point.
</div>

<p align="center">
  <img src="{{ '/assets/images/screw_theory/force_moment_couple.png' | relative_url }}"
       alt="Force, moment about a point, and a couple"
       width="700">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: (i) force at a point, (ii) moment about $O$, (iii) couple as two equal/opposite forces.
  </small>
</figcaption>

##### Quick quiz — couple vs moment
<p><strong>Question 2: Which statement best describes a couple?</strong></p>
<form id="q-couple">
  <input type="radio" name="q-couple" value="a"> A couple is the moment of a force about the origin only.<br>
  <input type="radio" name="q-couple" value="b"> A couple is a pure moment that is independent of the reference point.<br>
  <input type="radio" name="q-couple" value="c"> A couple is any force whose line of action passes through the origin.<br>
  <input type="radio" name="q-couple" value="d"> A couple is always equivalent to a single force through the origin.<br>
  <button type="button"
    onclick="checkMCQ('q-couple', 'b',
      'Correct. A couple is a pure moment (net force zero) whose moment vector is the same about any reference point.',
      'Incorrect. Correct answer: (b). Why the others are wrong: (a) is wrong because a couple does not depend on the origin; (c) is about a force line-of-action, not a pure moment; (d) is wrong because a couple has zero resultant force, so it cannot be represented by a single force.')">
    Check Answer
  </button>
  <p id="q-couple-feedback"></p>
</form>

---

#### Linear and angular velocity (instantaneous rigid-body motion)

Consider a rigid body moving in 3D. Pick a reference point $O$ fixed in the body.

- The **angular velocity** is a vector $\boldsymbol{\omega}\in\mathbb{R}^3$.
  Its direction is the instantaneous axis of rotation (right-hand rule), and its magnitude is the rotation rate.
- The **linear velocity** of point $O$ is $\mathbf{v}_O\in\mathbb{R}^3$.

A fundamental rigid-body kinematics fact is:

<div class="definition" markdown="1">
**Rigid-body velocity field.**  
For any point $P$ on the rigid body,
$$
\mathbf{v}_P = \mathbf{v}_O + \boldsymbol{\omega}\times \mathbf{r}_P.
$$
</div>

This formula is the reason rigid-body instantaneous motion is “6-dimensional”: $\boldsymbol{\omega}$ contributes 3 parameters, $\mathbf{v}_O$ contributes 3 parameters.

---

#### Twists and wrenches (the 6D objects we actually use)

Now we package the 3D quantities into **6D** objects.

##### Twist (instantaneous motion)
A **twist** is a pair
$$
\boldsymbol{\xi} :=
\begin{bmatrix}
\boldsymbol{\omega}, 
\mathbf{v}_O
\end{bmatrix}^T
\in \mathbb{R}^6,
$$

where:
- $\boldsymbol{\omega}$ = angular velocity of the rigid body
- $\mathbf{v}_O$ = linear velocity of the reference point $O$

> Different choices of $O$ change $\mathbf{v}_O$, but the *physical motion* is the same. Later we will exploit this in “screw axis” representations.

##### Wrench (force system)
A **wrench** is a pair
$$
\mathbf{w} :=
\begin{bmatrix}
\mathbf{f},
\mathbf{m}_O
\end{bmatrix}^T
\in \mathbb{R}^6,
$$
where:
- $\mathbf{f}$ = resultant force
- $\mathbf{m}_O$ = resultant moment about the reference point $O$

Again, $\mathbf{m}_O$ depends on $O$, but the underlying force system is the same.

<div class="quick-fact" markdown="1">
**Why wrenches fix the “closure problem.”**  
If you add two forces acting at different points on a rigid body, you cannot describe the result by a single 3D force vector *unless* you also carry the induced moment.  
A wrench carries both $\mathbf{f}$ and $\mathbf{m}_O$, so “addition” stays inside the same 6D space.
</div>

##### Power (the pairing between wrench and twist)
When a wrench $\mathbf{w}=(\mathbf{f},\mathbf{m}_O)$ acts on a body moving with twist $\boldsymbol{\xi}=(\boldsymbol{\omega},\mathbf{v}_O)$, the **instantaneous power** is
$$
\mathcal{P} = \mathbf{f}\cdot \mathbf{v}_O + \mathbf{m}_O\cdot \boldsymbol{\omega}.
$$

This single scalar is the key bridge to **virtual work** and **reciprocity** later.

##### Quick quiz — power pairing
<p><strong>Question 3: The expression $\mathbf{f}\cdot \mathbf{v}_O + \mathbf{m}_O\cdot \boldsymbol{\omega}$ represents the instantaneous power of a wrench acting on a twist (for a consistent choice of reference point $O$).</strong></p>
<form id="q-power">
  <input type="radio" name="q-power" value="true"> True<br>
  <input type="radio" name="q-power" value="false"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q-power', 'true',
      'Correct. This scalar pairing is exactly the (instantaneous) power delivered by the force system for the instantaneous motion.',
      'Incorrect. Correct answer: True.  The confusion is usually about mixing reference points: the formula is valid when $\mathbf{m}_O$ and $\mathbf{v}_O$ are taken about the same $O$.')">
    Check Answer
  </button>
  <p id="q-power-feedback"></p>
</form>

<div class="note" markdown="1">
**Preview (duality language).**  
We will later say: *wrenches are dual to twists* because a wrench maps a twist to a real number (power) by this pairing.
</div>

---

#### Chasles’ theorem (why “screws” appear in the first place)

**Chasles’ theorem** (19th century) states that any rigid-body displacement in 3D can be described as:
- a rotation about some axis, and
- a translation along that same axis.

This combined motion is called a **screw motion**.

<div class="slide" markdown="1">
**A bit of history (people worth knowing).**
- **Michel Chasles (1793–1880)**: established the geometric foundation of rigid-body displacements as screw motions.
- **Robert Stawell Ball (1840–1913)**: developed screw theory into a systematic tool for mechanics and kinematics (often cited as the classical “screw theory” reference).
- **Kenneth H. Hunt**: a key figure in kinematic geometry and screw theory for mechanisms; introduced influential concepts such as *connectivity* and *uncertainty configurations* (increased instantaneous mobility) that shaped modern singularity analysis.
</div>

<p align="center">
  <img src="{{ '/assets/images/screw_theory/chasles_screw_motion.png' | relative_url }}"
       alt="Chasles screw motion: rotation about an axis + translation along the axis"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: a rigid body undergoing a helical motion about a directed axis.
  </small>
</figcaption>

---

#### Screws: axis, pitch, and “same line, different amplitude”

A **geometric screw** is defined by:
1. a **directed line** (the screw axis) in 3D
2. a **pitch** $h$ (a real number)

**Pitch $h$** measures “translation per rotation” along the axis:
- $h=0$: pure rotation about the axis
- $h\to\infty$: pure translation along the axis (informally: rotation rate goes to zero)
- finite nonzero $h$: helical motion (like a screw thread)

##### Pitch from a twist
If $\boldsymbol{\omega}\neq \mathbf{0}$, one common definition of pitch is:
$$
h = \frac{\boldsymbol{\omega}\cdot \mathbf{v}_O}{\boldsymbol{\omega}\cdot \boldsymbol{\omega}},
$$
when $(\boldsymbol{\omega},\mathbf{v}_O)$ is written about a point $O$ on (or consistently related to) the screw axis.

> Interpretation: the component of $\mathbf{v}_O$ parallel to $\boldsymbol{\omega}$ encodes translation along the axis, and dividing by $\|\boldsymbol{\omega}\|^2$ normalizes by rotation rate.

##### Pitch from a wrench
If $\mathbf{f}\neq \mathbf{0}$, similarly:
$$
h = \frac{\mathbf{f}\cdot \mathbf{m}_O}{\mathbf{f}\cdot \mathbf{f}},
$$
for a wrench written in a consistent screw-axis form.

<div class="quick-fact" markdown="1">
**Projective idea (important later).**  
Scaling a twist by $2$ doubles the speed, but it represents the *same screw axis and pitch*.  
That is why we separate:
- the **geometric screw** (axis + pitch) from
- the **twist/wrench vector** (axis + pitch + amplitude).
</div>

##### Quick quiz — pitch meaning
<p><strong>Question 4: What does the pitch $h$ of a screw primarily quantify?</strong></p>
<form id="q-pitch">
  <input type="radio" name="q-pitch" value="a"> The distance from the origin to the screw axis.<br>
  <input type="radio" name="q-pitch" value="b"> The ratio of translation along the axis to rotation about the axis.<br>
  <input type="radio" name="q-pitch" value="c"> The angle between the screw axis and the z-axis.<br>
  <input type="radio" name="q-pitch" value="d"> The magnitude of angular velocity $\|\boldsymbol{\omega}\|$.<br>
  <button type="button"
    onclick="checkMCQ('q-pitch', 'b',
      'Correct. Pitch h measures translation per unit rotation along/about the screw axis.',
      'Incorrect. Correct answer: (b). Why the others are wrong: (a) is a geometry/location parameter, not pitch; (c) is an orientation parameter; (d) is an amplitude/rate, while pitch is a geometric ratio independent of speed scaling.')">
    Check Answer
  </button>
  <p id="q-pitch-feedback"></p>
</form>

---

#### Plücker coordinates (a clean way to encode a line)

A **directed line** $\ell$ in 3D can be represented by **Plücker coordinates**:
$$
(\mathbf{s},\ \mathbf{m}),
$$
where:
- $\mathbf{s}\in\mathbb{R}^3$ is a direction vector along the line (often unit-length),
- $\mathbf{m}\in\mathbb{R}^3$ is the **moment of the line** about the origin:
  $$
  \mathbf{m} := \mathbf{p}\times \mathbf{s},
  $$
  and $\mathbf{p}$ is the position vector of *any point* on the line.

**Key property (Plücker constraint).**
$$
\mathbf{s}\cdot \mathbf{m} = 0.
$$
(Geometrically: $\mathbf{m}$ is perpendicular to $\mathbf{s}$ because it is a cross product with $\mathbf{s}$.)

<div class="example" markdown="1">
**Example (build a line from two points).**  
Let the line pass through points $A$ and $B$, and define {% raw %}$\mathbf{s} := \mathbf{r}_{AB}${% endraw %} (or its unit version).  
Pick $\mathbf{p} := \mathbf{r}_A$. Then $\mathbf{m}=\mathbf{p}\times\mathbf{s}$.  
If you pick $\mathbf{p}:=\mathbf{r}_B$ instead, you get the **same** $\mathbf{m}$ (because $\mathbf{r}_B=\mathbf{r}_A+\lambda\mathbf{s}$, and $(\lambda\mathbf{s})\times\mathbf{s}=\mathbf{0}$).
</div>

##### Plücker form of a twist (preview)
A twist associated with a screw axis $(\mathbf{s},\mathbf{m})$ and pitch $h$ can be written (in one common convention) as:
$$
\boldsymbol{\xi} =
\begin{bmatrix}
\boldsymbol{\omega}, 
\mathbf{v}_O
\end{bmatrix}^T
=
\begin{bmatrix}
\dot{\theta}\,\mathbf{s}, 
\dot{\theta}\,(\mathbf{m} + h\,\mathbf{s})
\end{bmatrix}^T,
$$
when $\mathbf{s}$ is unit and $\dot{\theta}$ is the rotational rate about the axis.

- If $h=0$: $\mathbf{v}_O = \dot{\theta}\,\mathbf{m}$ corresponds to pure rotation about the axis.
- If $\dot{\theta}=0$ but translation exists: you get a pure translation twist (handled as a limiting case).

> Don’t worry if this feels abstract: we will make it concrete with robot joints soon.

##### Quick quiz — Plücker constraint
<p><strong>Question 5: For Plücker coordinates $(\mathbf{s},\mathbf{m})$ of a directed line, which condition must hold?</strong></p>
<form id="q-plucker">
  <input type="radio" name="q-plucker" value="a"> $\|\mathbf{s}\| = \|\mathbf{m}\|$.<br>
  <input type="radio" name="q-plucker" value="b"> $\mathbf{s}\cdot \mathbf{m} = 0$.<br>
  <input type="radio" name="q-plucker" value="c"> $\mathbf{s}\times \mathbf{m} = \mathbf{0}$.<br>
  <input type="radio" name="q-plucker" value="d"> $\mathbf{s} + \mathbf{m} = \mathbf{0}$.<br>
  <button type="button"
    onclick="checkMCQ('q-plucker', 'b',
      'Correct. Because m = p x s, we always have s.m = 0.',
      'Incorrect. Correct answer: (b). Why the others are wrong: (a) is not required (units and magnitudes differ); (c) would mean s and m are parallel, which contradicts m being a cross product with s; (d) has no geometric meaning for a general line.')">
    Check Answer
  </button>
  <p id="q-plucker-feedback"></p>
</form>

---

<div class="assignment" markdown="1">
### Mini-assignment 1 — build intuition with your own numbers (no robot yet)

1) **Moment shift practice.**  
Choose $\mathbf{f}=\begin{bmatrix}2, -1, 3\end{bmatrix}^T$ N applied at point $P$ with $\mathbf{r}_P=\begin{bmatrix}0.2, 0.0, 0.1\end{bmatrix}^T$ m.  
Compute $\mathbf{m}_O=\mathbf{r}_P\times\mathbf{f}$.  
Now let $Q$ be such that $\mathbf{r}_Q=\begin{bmatrix}0.0, 0.3, 0.0\end{bmatrix}^T$ m. Compute $\mathbf{m}_Q$ using  
$\mathbf{m}_Q=\mathbf{m}_O-\mathbf{r}_Q\times\mathbf{f}$.  
Explain in one sentence why $\mathbf{m}_Q\neq \mathbf{m}_O$ does **not** contradict “same force”.

2) **Plücker line practice.**  
Let a line pass through $A=(0.1,0,0)$ m and $B=(0.1,0.2,0.3)$ m.  
Compute {% raw %}$\mathbf{s}=\mathbf{r}_{AB}${% endraw %} and $\mathbf{m}=\mathbf{r}_A\times\mathbf{s}$.  
Verify $\mathbf{s}\cdot\mathbf{m}=0$.

3) **Explain in words.**  
Why is it helpful that a line can be encoded by two 3-vectors $(\mathbf{s},\mathbf{m})$ instead of “a point + a direction”?
</div>

---

<div class="note" markdown="1">
**Up next:**  
We will connect these preliminaries to **joint screws** and show how a serial chain builds a twist subspace by “cascading” joint twists to derive the **geometric Jacobian**.
</div>


### General concepts

The preliminaries introduced the *objects* of screw theory—vectors, forces and moments, twists and wrenches, screws and Plücker coordinates. We now introduce the *viewpoint* we will use for singularity analysis:

- what a mechanism can do instantaneously is captured by a **subspace of twists** (allowable motions),
- what a mechanism can transmit or resist is captured by a **subspace of wrenches** (allowable actions),
- singularities are configurations where these subspaces (and their relationship) become *degenerate* in a way that changes motion/constraint capability.

<p align="center">
  <img src="{{ '/assets/images/screw_theory/todo.png' | relative_url }}"
       alt="Concept map: from twists and wrenches to degrees of freedom and singularities"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: A learning map—twists and wrenches lead to subspaces, which lead to DOF counting and singularity interpretation.
  </small>
</figcaption>

---

#### Configuration versus instantaneous motion

A mechanism has a **configuration** described by joint variables
$$
q \in \mathbb{R}^n,
\qquad
\dot{q} \in \mathbb{R}^n.
$$

At each configuration, the end-effector (or platform) has an **instantaneous motion** described by a **twist**
$$
\mathbf{V} \in \mathbb{R}^6.
$$

For many systems, velocity kinematics is a linear relation between joint rates and twist.

<div class="definition" markdown="1">
**Serial velocity map.**  
For a serial chain, joint rates produce an end-effector twist:
$$
\mathbf{V} = J(q)\,\dot{q},
$$
where the geometric Jacobian $J(q)$ is typically a $6 \times n$ matrix.
</div>

Parallel mechanisms add constraints. One convenient form is to write constraint equations directly on the platform twist.

<div class="definition" markdown="1">
**Constraint velocity form (one common model).**  
For constrained motion, allowable platform twists satisfy
$$
A(q)\,\mathbf{V} = \mathbf{0},
$$
where rows of $A(q)$ represent instantaneous constraints.
</div>

<div class="note" markdown="1">
Singularity analysis is inherently **configuration-dependent** because both $J(q)$ and $A(q)$ change with $q$.
</div>

#### Quiz — configuration versus instantaneous motion
<p><strong>Question GC-1: Which object represents the instantaneous motion of a rigid body?</strong></p>
<form id="q-gc-1">
  <input type="radio" name="q-gc-1" value="a"> A wrench<br>
  <input type="radio" name="q-gc-1" value="b"> A twist<br>
  <button type="button"
    onclick="checkMCQ('q-gc-1', 'b',
      'Correct. A twist represents instantaneous motion (angular and linear velocity).',
      'Incorrect. Correct answer: A twist. A wrench represents action (force and moment), not motion.')">
    Check Answer
  </button>
  <p id="q-gc-1-feedback"></p>
</form>

---

#### Twist space and wrench space

At a fixed configuration $q$, a mechanism does not produce “any” motion or “any” wrench; it produces only those compatible with its joints and constraints.

<div class="definition" markdown="1">
**Twist space.**  
The **twist space** $\mathcal{S}_t(q)\subset \mathbb{R}^6$ is the set of all platform/end-effector twists that are instantaneously realizable at configuration $q$.
</div>

<div class="definition" markdown="1">
**Wrench space.**  
The **wrench space** $\mathcal{S}_w(q)\subset \mathbb{R}^6$ is the set of wrenches that the mechanism can transmit or enforce at configuration $q$ (through actuation and/or constraints).
</div>

A crucial idea is that **dimension equals capability**.

<div class="quick-fact" markdown="1">
**Dimension = local capability.**  
- $\dim(\mathcal{S}_t(q))$ counts independent instantaneous motion directions (local DOF).  
- $\dim(\mathcal{S}_w(q))$ counts independent action/constraint directions available at that configuration.
</div>

<p align="center">
  <img src="{{ '/assets/images/screw_theory/todo.png' | relative_url }}"
       alt="Twist and wrench spaces as subspaces inside a 6D space"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: Allowable twists and allowable wrenches can be viewed as subspaces inside $\mathbb{R}^6$. Singularities appear when this geometry becomes degenerate.
  </small>
</figcaption>

---

#### Reciprocity and virtual work (a preview you will use constantly)

When a wrench acts on a twist, it produces instantaneous **power**. If a rigid body has twist
$\mathbf{V} = (\boldsymbol{\omega}, \mathbf{v})$ and is subject to wrench
$\mathbf{W} = (\mathbf{f}, \mathbf{m})$, the instantaneous power is
$$
\mathcal{P} = \mathbf{f}\cdot \mathbf{v} + \mathbf{m}\cdot \boldsymbol{\omega}.
$$

<div class="definition" markdown="1">
**Reciprocity (virtual work condition).**  
A wrench $\mathbf{W}$ is **reciprocal** to a twist $\mathbf{V}$ if it does no instantaneous power on that motion:
$$
\mathcal{P} = 0.
$$
</div>

This single condition will later let us *construct constraint wrenches* for parallel robots and connect them to allowable motions without “guessing” from geometry.

<p align="center">
  <img src="{{ '/assets/images/screw_theory/todo.png' | relative_url }}"
       alt="Virtual work picture: a constraint wrench is reciprocal to an allowable twist"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: Visual intuition of reciprocity—constraint wrenches do zero virtual work on allowable twists.
  </small>
</figcaption>

---

#### Jacobian rank is a geometric event

A Jacobian is a **linear map** between vector spaces.

#### Serial chains
For a serial chain,
$$
\mathbf{V} = J(q)\,\dot{q}.
$$
The set of all achievable twists is the column space of $J(q)$, hence
$$
\mathcal{S}_t(q) = \operatorname{Col}(J(q)),
\qquad
\dim(\mathcal{S}_t(q)) = \operatorname{rank}(J(q)).
$$
A singularity is typically marked by a **rank drop** of $J(q)$, meaning the twist space loses dimension: at least one instantaneous motion direction becomes unavailable.

#### Parallel mechanisms and constraints
For constrained motion written as
$$
A(q)\,\mathbf{V} = \mathbf{0},
$$
the allowable twist space is the null space:
$$
\mathcal{S}_t(q) = \operatorname{Null}(A(q)).
$$
If the constraint rows become linearly dependent, constraints lose effectiveness and the platform may gain unexpected instantaneous motion (the geometric intuition behind “uncertainty” configurations).

<div class="slide" markdown="1">
**Two complementary failure modes.**  
- **Serial singularity:** loss of motion capability (a shrink of $\mathcal{S}_t$).  
- **Parallel constraint singularity:** loss of constraint capability (constraint wrenches become dependent), often causing an expansion of allowable motion directions.
</div>

<p align="center">
  <img src="{{ '/assets/images/screw_theory/todo.png' | relative_url }}"
       alt="Serial versus parallel singularity intuition: loss of motion vs loss of constraints"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: Serial singularities reduce attainable twist directions; constraint singularities reduce independent constraint wrenches and may introduce unintended platform motion.
  </small>
</figcaption>

#### Quiz — meaning of a rank drop
<p><strong>Question GC-2: For a serial robot, if the rank of $J(q)$ drops at a configuration, what is the most direct geometric meaning?</strong></p>
<form id="q-gc-2">
  <input type="radio" name="q-gc-2" value="a"> The end-effector gains additional independent motion directions.<br>
  <input type="radio" name="q-gc-2" value="b"> The end-effector loses at least one independent instantaneous motion direction.<br>
  <input type="radio" name="q-gc-2" value="c"> The robot becomes unusable for all tasks everywhere.<br>
  <input type="radio" name="q-gc-2" value="d"> The robot’s links must be deforming elastically.<br>
  <button type="button"
    onclick="checkMCQ('q-gc-2', 'b',
      'Correct. A rank drop means the dimension of the attainable twist space shrinks: at least one instantaneous motion direction is lost.',
      'Incorrect. Correct answer: (b). (a) is typical of losing constraints in parallel robots, not serial rank loss; (c) is too strong (the statement is local); (d) is a compliance issue, not a kinematic rank statement.')">
    Check Answer
  </button>
  <p id="q-gc-2-feedback"></p>
</form>

---

#### Degrees of freedom from subspaces (the roadmap)

Rather than memorizing mobility formulas, we will repeatedly use a single habit:

1. identify a set of candidate **twists** (from joint screws or allowable platform motions),  
2. identify a set of candidate **wrenches** (from constraints/actuation),  
3. compute dimensions via span, rank, and reciprocity.

For serial robots, the DOF is read from $\operatorname{rank}(J(q))$.  
For parallel robots, the DOF is often read from the dimension of $\operatorname{Null}(A(q))$, or equivalently from how many independent constraint wrenches exist.

<div class="assignment" markdown="1">
### Mini-assignment GC — think in subspaces

Consider three revolute joints whose axes (in a fixed base frame) are:

- Joint 1: axis along $ \hat{\mathbf{z}} $ through the origin  
- Joint 2: axis also along $ \hat{\mathbf{z}} $ and lying on the same line as Joint 1  
- Joint 3: axis along $ \hat{\mathbf{x}} $ through the origin  

1) Without computing any determinant, argue how many independent joint screw directions you expect in the attainable twist space.  
2) Explain why Joints 1 and 2 do not contribute two independent directions (hint: same screw axis, different amplitude).  
3) Describe (in words) a geometric alignment that could reduce the number of independent directions further (a singularity event).
</div>

---

#### Caution: Jacobians are powerful, but not a silver bullet

Expressions such as $J^{\mathsf{T}}J$ and $JJ^{\mathsf{T}}$ appear often (least squares, damping, manipulability measures). They are useful only when you keep track of:

- which vectors live in joint space versus twist space,
- the dimensions of $J$ (often $6\times n$, not square),
- the physical meaning of the metric you are implicitly introducing.

<div class="note" markdown="1">
We will return to this caution after deriving the geometric Jacobian and again in the parallel-robot singularity discussion. The guiding habit is always the same: interpret rank and null spaces as statements about **twist and wrench subspaces**.
</div>




### Singularities in a serial robot: building the Jacobian one joint at a time

A serial robot can be understood as a sequence of joints that each contribute an **instantaneous motion** to the end-effector. The geometric Jacobian appears naturally when we ask a simple question:

> *If only joint \(i\) moves (all other joints are frozen), what instantaneous twist does the end-effector experience?*

When we answer this question for every joint and stack the results, we obtain the Jacobian.

<p align="center">
  <img src="{{ '/assets/images/screw_theory/todo.png' | relative_url }}"
       alt="Serial chain intuition: each joint contributes an instantaneous motion at the end-effector"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: A serial chain. Each joint contributes one instantaneous twist at the end-effector; stacking these twists forms the Jacobian.
  </small>
</figcaption>

---

#### The “one joint moves” thought experiment

Fix a configuration $q$ (all joint values are fixed). Consider the end-effector frame with origin at a point $E$ attached to the last link. For each joint $i$:

- set $\dot{q}_i \neq 0$,
- set $\dot{q}_j = 0$ for every $j\neq i$.

The end-effector then has some instantaneous twist
$$
\mathbf{V}_E^{(i)} \in \mathbb{R}^6,
$$
which is the *contribution of joint \(i\)* to the end-effector twist.

Because velocity kinematics is linear in joint rates, the full end-effector twist is the sum of all contributions:
$$
\mathbf{V}_E = \sum_{i=1}^n \mathbf{V}_E^{(i)}.
$$

---

#### Revolute and prismatic joints as screws (end-effector contribution)

To write $\mathbf{V}_E^{(i)}$ explicitly, we describe each joint as a screw axis expressed in a common frame (typically the base frame).

##### Revolute joint \(i\)
A revolute joint has:
- an axis direction vector $\mathbf{s}_i$ (unit vector),
- a point $P_i$ on the axis.

Define the moment of the axis about the base origin $O$:
$$
\mathbf{m}_i = \mathbf{r}_{OP_i} \times \mathbf{s}_i.
$$

The angular velocity contribution at the end-effector due to joint $i$ is
$$
\boldsymbol{\omega}^{(i)} = \dot{q}_i \, \mathbf{s}_i.
$$

The linear velocity contribution of the end-effector point $E$ is
$$
\mathbf{v}_E^{(i)} = \boldsymbol{\omega}^{(i)} \times \mathbf{r}_{P_iE}
= \dot{q}_i \, \mathbf{s}_i \times \mathbf{r}_{P_iE}.
$$

So the end-effector twist contribution becomes
$$
\mathbf{V}_E^{(i)} =
\begin{bmatrix}
\boldsymbol{\omega}^{(i)}\\
\mathbf{v}_E^{(i)}
\end{bmatrix}
=
\dot{q}_i
\begin{bmatrix}
\mathbf{s}_i\\
\mathbf{s}_i \times \mathbf{r}_{P_iE}
\end{bmatrix}.
$$

##### Prismatic joint \(i\)
A prismatic joint has:
- a translation direction vector $\mathbf{s}_i$ (unit vector).

Its contribution has zero angular velocity and a linear velocity along the axis:
$$
\mathbf{V}_E^{(i)} =
\begin{bmatrix}
\mathbf{0}\\
\dot{q}_i\,\mathbf{s}_i
\end{bmatrix}.
$$

<div class="note" markdown="1">
The key pattern is simple:

- revolute joint column: an angular part \(\mathbf{s}_i\) and a linear part \(\mathbf{s}_i\times\mathbf{r}_{P_iE}\),
- prismatic joint column: angular part \(\mathbf{0}\), linear part \(\mathbf{s}_i\).

This is exactly the geometric meaning of “joint screws.”
</div>

<p align="center">
  <img src="{{ '/assets/images/screw_theory/todo.png' | relative_url }}"
       alt="Revolute joint contribution: axis direction and moment arm to end-effector create a twist column"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: A revolute joint contributes a twist at the end-effector. The linear part comes from the moment arm from the joint axis to the end-effector point.
  </small>
</figcaption>

---

#### Jacobian formation: stacking the joint contributions

Collect all the joint contributions into a single matrix by placing the twist generated by unit joint rate in each column.

For revolute joints, the \(i\)-th column is
$$
\mathbf{J}_i(q) =
\begin{bmatrix}
\mathbf{s}_i(q)\\
\mathbf{s}_i(q)\times\mathbf{r}_{P_iE}(q)
\end{bmatrix},
$$
and for prismatic joints it is
$$
\mathbf{J}_i(q) =
\begin{bmatrix}
\mathbf{0}\\
\mathbf{s}_i(q)
\end{bmatrix}.
$$

Stacking these columns gives the **geometric Jacobian**
$$
\mathbf{J}(\mathbf{q}) = \begin{bmatrix} \mathbf{J}_1(\mathbf{q}) & \mathbf{J}_2(\mathbf{q}) & \cdots & \mathbf{J}_n(\mathbf{q})\end{bmatrix}.
$$

Then the end-effector twist is simply
$$
\mathbf{V}_E = J(q)\,\dot{\mathbf{q}}.
$$

<div class="quick-fact" markdown="1">
**Why this is “natural.”**  
Each column answers the same physical question: *what twist appears at the end-effector if only joint \(i\) moves with unit rate?*  
The Jacobian is just these answers written side-by-side.
</div>

---

#### Serial singularities: loss of attainable twist directions

The set of all twists the end-effector can generate at configuration $q$ is the column space of $J(q)$:
$$
\mathcal{S}_t(q) = \operatorname{Col}(J(q)).
$$

Its dimension is
$$
\dim(\mathcal{S}_t(q)) = \operatorname{rank}(J(q)).
$$

A **serial singularity** occurs at configurations where the rank drops:
$$
\operatorname{rank}(J(q)) \text{ decreases.}
$$

Geometrically, this means at least one instantaneous motion direction that was possible nearby becomes impossible at that configuration. Equivalently, the columns of $J(q)$ become linearly dependent.

<p align="center">
  <img src="{{ '/assets/images/screw_theory/todo.png' | relative_url }}"
       alt="Rank drop picture: Jacobian columns become dependent so the attainable twist space shrinks"
       width="650">
</p>
<figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
  <small>
    Figure: At a serial singularity, Jacobian columns become dependent, shrinking the attainable twist subspace.
  </small>
</figcaption>

---

#### What “dependence of columns” means physically

If two joint columns become aligned in the 6D sense, their effects at the end-effector become redundant. Typical geometric causes include:

- two revolute axes becoming parallel (and positioned so their end-effector velocity contributions align),
- three axes becoming coplanar or intersecting in special ways,
- wrist alignment events (common in 6R wrists), where two rotation axes line up and one rotational direction is lost.

<div class="note" markdown="1">
The important point is not the specific “named singularity,” but the mechanism behind it:
**a singularity is a configuration where the joint screws fail to span the same set of twists as they do in a generic configuration.**
</div>

---

#### Quiz — how the Jacobian is formed
<p><strong>Question 3.1: What does the \(i\)-th column of the geometric Jacobian represent?</strong></p>
<form id="q-jac-col">
  <input type="radio" name="q-jac-col" value="a"> The position of joint \(i\) in the base frame.<br>
  <input type="radio" name="q-jac-col" value="b"> The end-effector twist produced when only joint \(i\) moves with unit rate.<br>
  <input type="radio" name="q-jac-col" value="c"> The torque required at joint \(i\) to hold a load.<br>
  <input type="radio" name="q-jac-col" value="d"> The end-effector acceleration produced by joint \(i\).<br>
  <button type="button"
    onclick="checkMCQ('q-jac-col', 'b',
      'Correct. Each Jacobian column is the end-effector twist corresponding to a unit rate at that joint (others frozen).',
      'Incorrect. Correct answer: (b). A Jacobian column is a velocity (twist) contribution, not a position, torque, or acceleration quantity.')">
    Check Answer
  </button>
  <p id="q-jac-col-feedback"></p>
</form>

<div class="assignment" markdown="1">
### Mini-assignment 3 — “spot the redundancy”

Consider a 3-joint serial mechanism with three revolute joints. Suppose that at a particular configuration:

- Joint 1 axis direction is \(\mathbf{s}_1 = \hat{\mathbf{z}}\),
- Joint 2 axis direction is \(\mathbf{s}_2 = \hat{\mathbf{z}}\) (parallel to joint 1),
- Joint 3 axis direction is \(\mathbf{s}_3 = \hat{\mathbf{x}}\).

1) Explain why \(\mathbf{s}_1\) and \(\mathbf{s}_2\) being parallel is a warning sign for a rank drop.  
2) Give a geometric condition involving the end-effector point \(E\) (relative to the two axes) that could make the full 6D columns truly dependent.  
3) In one sentence, state what motion you expect to be “hard” or “impossible” at the singular configuration.

*Goal:* practice translating “column dependence” into geometry.
</div>


### References and Further Reading (Intro Level)
- D. S. Zlatanov, Generalized Singularity Analysis of Mechanisms, Ph.D. dissertation, University of Toronto, 1998
- M. Conconi and M. Carricato, “A New Assessment of Singularities of Parallel Kinematic Chains,” IEEE Transactions on Robotics, vol. 25, no. 4, pp. 757–770, 2009, doi: 10.1109/TRO.2009.2020353.
- J. Selig, Geometric Fundamentals of Robotics
- R. Murray, Z. Li, S. Sastry, A Mathematical Introduction to Robotic Manipulation, CRC.

## Credits

This course page was created by **Durgesh Haribhau Salunkhe, EPFL**, and funded by **IEEE RAS** and **EPFL**.

## Resources

[Back to Top](#start)

<!-- <script src="{{ '/docs/chap5_adv_kin/questions.js' | relative_url }}"></script> -->
<script src="../questions.js"></script>
<!-- voodoo, some issue with mathjax environment used in graph_theory.md -->
$$
.
$$
