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
**Up next (next section we will write):**  
We will connect these preliminaries to **joint screws** and show how a serial chain builds a twist subspace by “cascading” joint twists to derive the **geometric Jacobian**.
</div>


### General Concepts



### References and Further Reading (Intro Level)
- D. S. Zlatanov, Generalized Singularity Analysis of Mechanisms, Ph.D. dissertation, University of Toronto, 1998
- M. Conconi and M. Carricato, “A New Assessment of Singularities of Parallel Kinematic Chains,” IEEE Transactions on Robotics, vol. 25, no. 4, pp. 757–770, 2009, doi: 10.1109/TRO.2009.2020353.
- J. Selig, Geometric Fundamentals of Robotics
- R. Murray, Z. Li, S. Sastry, A Mathematical Introduction to Robotic Manipulation, CRC.

## Credits

This course page was created by **Durgesh Haribhau Salunkhe, EPFL**, and funded by **IEEE RAS** and **EPFL**.

## Resources

[Back to Top](#start)

<script src="{{ '/docs/chap5_adv_kin/questions.js' | relative_url }}"></script>
<!-- voodoo, some issue with mathjax environment used in graph_theory.md -->
$$
.
$$
