---
title: "Section 3: Singularities in Parallel Robots — Screw Theory"
parent: "Advanced Kinematics"
layout: numbered
math: mathjax
---

<!-- This chapter relies on /assets/js/questions.js (or questions.js) being loaded globally
     e.g., via your layout or page front matter as in rasu_course.md. -->

<style>
/* Lightweight styling for callouts and quizzes */
.quick-fact, .assignment, .example, .slide {
  border-left: 4px solid #0ea5e9; padding: 0.75rem 1rem; margin: 1rem 0; background:#0ea5e90d;
}
.slide { border-left-color:#22c55e; background:#22c55e0d; }
.assignment { border-left-color:#f59e0b; background:#f59e0b0d; }
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

# Chapter 1 — Singularities in Parallel Robots via Screw Theory

This chapter builds the foundations for analyzing **parallel-robot singularities** using **screw theory**. We follow the structure in Dimiter Zlatanov’s notes on *Vector Spaces, Wrenches, Twists, and Screws* and related material. Key notions include **vector spaces**, **screws & pitch**, **wrenches & twists**, **virtual power**, and **reciprocity** to connect **allowable motions** to **admissible constraints** in parallel mechanisms.

- Table of Contents
  {:toc}

---

## 1. Mathematical Preliminaries — Vector Spaces (and why “closure” matters)

A (real) **vector space** $V$ is a set equipped with **vector addition** and **scalar multiplication** satisfying the usual axioms (associativity, commutativity of addition, identities, inverses, and distributivity).

<div class="slide">
<strong>Slide — Examples vs. counterexamples</strong><br>
• Forces acting at a <em>single point</em> → closed under addition & scalar multiplication → vector space.<br>
• Couples (pure moments) → vector space.<br>
• Arbitrary forces on a rigid body (applied at different points) → <em>not</em> closed under addition → <em>not</em> a vector space unless we include the accompanying moment (i.e., use wrenches). 
</div>

<div class="quick-fact">
<strong>Quick fact.</strong> The failure of “forces alone on a rigid body” to be a vector space comes from lack of <em>closure under addition</em> unless all forces share the same line-of-action reference; including the moment fixes this (the wrench space). 
</div>

---

## 2. Screws, Chasles’ Theorem, pitch, and direction

**Chasles’ theorem.** Any rigid body displacement equals a rotation about some axis plus a translation along that axis — i.e., a **screw motion**. A **screw** is characterized by an axis (a directed line) and a **pitch** $h$: the ratio between translation along the axis and rotation about it.

- $h=0$ → pure rotation
- $h=\infty$ → pure translation
- $h\neq 0,\infty$ → helical motion

For an instantaneous representation, we use **twists** (motions) and **wrenches** (systems of forces). The **canonical form** aligns force/moment (or angular/linear velocity) with the screw axis; pitch appears in the moment/linear-velocity component parallel to the axis.

<div class="example">
<strong>Example.</strong> The axis and pitch of a wrench $\mathbf{w}=(\mathbf{f},\,\mathbf{m}_O)$ can be recovered via
$h=\dfrac{\mathbf{f}\cdot\mathbf{m}_O}{\mathbf{f}\cdot\mathbf{f}}$ and the axis location using
$\mathbf{r}=\dfrac{\mathbf{f}\times\mathbf{m}_O}{\mathbf{f}\cdot\mathbf{f}}$ (closest point to origin). 
</div>

---

## 3. Wrenches and Twists: why forces and moments form vector spaces

- A **wrench** is $\mathbf{w} = (\mathbf{f}, \mathbf{m}_O)$, with the shifting law
  $\mathbf{m}_O = \mathbf{m}_{O'} + (\mathbf{r}_O - \mathbf{r}_{O'}) \times \mathbf{f}$.


- A **twist** is $\mathbf{t}=(\boldsymbol{\omega},\mathbf{v}_O)$ with **shifting law**  
  $\mathbf{v}_O=\mathbf{v}_{O'}+\overrightarrow{O'O}\times\boldsymbol{\omega}$; twists form a vector space (often denoted $\mathfrak{se}(3)$).

<div class="quick-fact">
<strong>Why forces alone fail but wrenches succeed.</strong> Adding two forces applied at different points produces not only a resultant force but also a <em>couple</em>; to retain closure, the moment must be part of the object → use wrenches. Similarly, velocities require both angular and linear components → use twists. 
</div>

---

## 4. Virtual Power (the reciprocal product)

The **instantaneous power** delivered by a wrench $\mathbf{w}$ to a twist $\mathbf{t}$ is
\[
P=\mathbf{w}\cdot\mathbf{t}
= \mathbf{f}\cdot\mathbf{v}_O + \mathbf{m}_O\cdot\boldsymbol{\omega}.
\]
When $P=0$, we say **wrench and twist are reciprocal** (orthogonal in the dual pairing). This is the bridge between **constraints** (wrenches that can be sustained) and **allowable motions** (twists that can occur).

---

## 5. Reciprocal screws and parallel-robot singularities

Let $U\subset \mathfrak{se}(3)$ be a motion subspace (twists). Its reciprocal set
\[
U^\perp=\{\mathbf{w}\in\mathfrak{se}^*(3)\;|\;\mathbf{w}\cdot \mathbf{t}=0,\;\forall\,\mathbf{t}\in U\}
\]
is a wrench subspace (constraints that do no power on any twist in $U$). In parallel robots:
- The **constraint wrench system** is reciprocal to the **allowable motion twist system**.
- At a **Type-II** singularity (constraint singularity), constraint wrenches become linearly dependent → allowable motion space grows unexpectedly (loss of constraint).
- At a **Type-I** singularity (actuation/forward singularity), the allowable twist space collapses relative to commanded actuation (loss of controllability).  
  (Notation/interpretation consistent with the screw-systems formalism.)

<div class="slide">
<strong>Slide — Reciprocity rules (geometric intuition)</strong><br>
• Translation along an axis is reciprocal to a couple about the <em>same</em> axis.<br>
• Rotation about an axis is reciprocal to a force along the <em>same</em> axis.<br>
• A general twist is reciprocal to all wrenches that exert zero power on it → use the power formula to test. 
</div>

<div class="example">
<strong>Worked example — Planar 3-RRR</strong><br>
For a typical planar platform, allowable twists lie in <code class="k">se(2)</code> (two translations in-plane + one rotation about <em>z</em>). The reciprocal wrench system comprises wrenches that do no power on any planar twist: they reduce to <em>out-of-plane</em> forces/couples that do zero work on in-plane motions. Computing the nullspace of the twist basis under the power pairing retrieves these constraints explicitly. 
</div>

---

## 6. Interactive Quizzes

<div class="mcq" data-answer="A,B,D">
  <h4>Quiz 1 — Which sets form a vector space?</h4>
  <div class="options">
    <label><input type="checkbox" value="A"> (A) Forces applied at a single point</label>
    <label><input type="checkbox" value="B"> (B) Couples (pure moments)</label>
    <label><input type="checkbox" value="C"> (C) Arbitrary forces on a rigid body (points of application differ)</label>
    <label><input type="checkbox" value="D"> (D) Velocities of a free particle</label>
  </div>
  <div class="actions"><button class="check-mcq">Check</button></div>
  <div class="result"></div>
  <small>Hint: think “closure under addition.” </small>
</div>

<div class="mcq" data-answer="B">
  <h4>Quiz 2 — A pure translation corresponds to a screw with:</h4>
  <div class="options">
    <label><input type="radio" name="q2" value="A"> (A) Pitch \(h=0\)</label>
    <label><input type="radio" name="q2" value="B"> (B) Pitch \(h=\infty\)</label>
    <label><input type="radio" name="q2" value="C"> (C) Pitch \(h=1\)</label>
    <label><input type="radio" name="q2" value="D"> (D) Undefined pitch</label>
  </div>
  <div class="actions"><button class="check-mcq">Check</button></div>
  <div class="result"></div>
  <small>Use Chasles’ theorem. </small>
</div>

<div class="mcq" data-answer="B">
  <h4>Quiz 3 — If a wrench does no work on a twist, then they are:</h4>
  <div class="options">
    <label><input type="radio" name="q3" value="A"> (A) Parallel</label>
    <label><input type="radio" name="q3" value="B"> (B) Reciprocal</label>
    <label><input type="radio" name="q3" value="C"> (C) Dependent</label>
    <label><input type="radio" name="q3" value="D"> (D) Invalid</label>
  </div>
  <div class="actions"><button class="check-mcq">Check</button></div>
  <div class="result"></div>
  <small>Power pairing \( \mathbf{w}\cdot\mathbf{t} \). </small>
</div>

<div class="mcq" data-answer="A,C">
  <h4>Quiz 4 — Reciprocity quick check:</h4>
  <div class="options">
    <label><input type="checkbox" value="A"> (A) Translation along \(x\) is reciprocal to a couple about \(x\)</label>
    <label><input type="checkbox" value="B"> (B) Rotation about \(z\) is reciprocal to a force along \(x\)</label>
    <label><input type="checkbox" value="C"> (C) Rotation about \(z\) is reciprocal to a force along \(z\)</label>
    <label><input type="checkbox" value="D"> (D) Any couple is reciprocal to any translation</label>
  </div>
  <div class="actions"><button class="check-mcq">Check</button></div>
  <div class="result"></div>
  <small>See reciprocity rules in the slides. </small>
</div>

---

## 7. Assignments

<div class="assignment">
<ol>
  <li><strong>Axis & pitch from components.</strong> Compute the screw axis and pitch for the wrench
  \( \mathbf{w} = (-\mathbf{i}+\mathbf{j},\, -2\mathbf{i}+2\mathbf{k}) \).
  Show your steps and draw the axis in 3D. (From the slides’ exercise.) </li>

  <li><strong>Planar parallel manipulator (3-RRR).</strong> Derive the twist space of the moving platform at a generic nonsingular pose. Then compute its reciprocal wrench space \(U^\perp\) and interpret each basis wrench physically.</li>

  <li><strong>Numerical reciprocity test.</strong> Implement a script (Python/Matlab) that: (i) accepts a set of twist basis vectors and wrench basis vectors, (ii) evaluates the power matrix \(P_{ij}=\mathbf{w}_i\cdot\mathbf{t}_j\), and (iii) reports whether the sets are reciprocal (all zeros within a tolerance).</li>
</ol>
</div>

---

## 8. Quick reference (for your notes)

- **Twist:** \( \mathbf{t}=(\boldsymbol{\omega},\mathbf{v}_O) \) with shift law \( \mathbf{v}_O=\mathbf{v}_{O'}+\overrightarrow{O'O}\times\boldsymbol{\omega} \).
- **Wrench:** \( \mathbf{w}=(\mathbf{f},\mathbf{m}_O) \) with shift law \( \mathbf{m}_O=\mathbf{m}_{O'}+\overrightarrow{O'O}\times\mathbf{f} \).
- **Power pairing:** \( \mathbf{w}\cdot\mathbf{t}=\mathbf{f}\cdot\mathbf{v}_O+\mathbf{m}_O\cdot\boldsymbol{\omega} \).
- **Pitch/axis (wrench):** \( h=\dfrac{\mathbf{f}\cdot\mathbf{m}_O}{\mathbf{f}\cdot\mathbf{f}}, \;
  \mathbf{r}=\dfrac{\mathbf{f}\times\mathbf{m}_O}{\mathbf{f}\cdot\mathbf{f}} \).  
  All as presented in Zlatanov’s notes.

---
