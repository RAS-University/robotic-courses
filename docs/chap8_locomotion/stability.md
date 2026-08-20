---
title: 8.2 Stability, Models Criteria, and Locomotion Metrics
parent: "Chapter 8: Locomotion"
has_children: false
nav_order: 2
layout: numbered
math: mathjax
chapter: 8
section: 2
publish: true
nav_exclude: true
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Stability, Models Criteria, and Locomotion Metrics

<!-- bundle exec jekyll serve -->
<style>
/* Hide headings below level 2 from the table of contents */
#markdown-toc > li > ul > li > ul {
  display: none;
}

/* Styling for the collapsible quiz / exercise accordions used throughout this page */
.exercise-accordion {
  margin: 1.5rem 0;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  overflow: hidden;
}
.exercise-accordion > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  background-color: #f6f8fa;
  list-style: none;
}
.exercise-accordion > summary::-webkit-details-marker {
  display: none;
}
.exercise-accordion > summary::after {
  content: "▾";
  font-size: 1.2rem;
  transition: transform 0.25s ease;
}
.exercise-accordion[open] > summary::after {
  transform: rotate(180deg);
}
.exercise-accordion-content {
  padding: 1.25rem;
  border-top: 1px solid #d0d7de;
}
.notation-box {
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}
.coming-soon {
  background-color: #fff8e6;
  border: 1px solid #f0d998;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1rem 0;
  color: #7a5c00;
}
</style>
- Table of Contents
{:toc}

## Course overview

In 8.1, we described gaits qualitatively: footfall patterns, duty factor, and a first informal distinction between statically and dynamically stable locomotion. That distinction is intuitive but not yet a tool you could code into a controller. This page turns it into one.

The rest of this chapter will introduce simplified models and stability tools that help us understand some of the principles behind these complex behaviors.

We will do three things, in this order:

1. Go deep into the two template models introduced qualitatively just below, the **Linear Inverted Pendulum (LIP)** and the **Spring-Loaded Inverted Pendulum (SLIP)**, since several of the stability criteria below are derived directly from them.
2. Make "is the robot stable?" into a precise, computable question, first for the simple case where the robot barely moves (**static stability margin**), then for the general dynamic case (**Center of Pressure**, **Zero Moment Point**, **capture point / Divergent Component of Motion**, and **Poincaré / return-map analysis**).
3. Introduce **locomotion metrics** (Cost of Transport, Froude number) that let us compare how *well* a gait performs, not just whether it is stable.


Dynamic walking, running, jumping, disturbance recovery and rapid changes of motion may look very different, but they all rely on the same fundamental challenge: **controlling the motion of the robot while continuously managing balance and interaction with the ground**. The following video offers a glimpse of what modern legged robots are capable of

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/IGSVOp_BAdY"
    title="Intro to stability"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

### A note on notation

This page is more mathematical than 8.1, so before diving in, here is the notation used throughout, gathered in one place:

<div class="notation-box" markdown="1">

- $m$: total mass of the robot (kg); $g$: gravitational acceleration (m/s²)
- $\mathbf{p} = (x, y)$ or $(x,y,z)$: a position vector; a **projection** of a 3D point onto the ground plane is written the same way, with the vertical coordinate dropped
- $\mathbf{CoM}$: the robot's center of mass; "the CoM projection" means its vertical projection onto the ground
- $F\_i$: the (vertical) ground reaction force measured at contact point $i$
- $\dot{x}, \ddot{x}$: first and second time derivatives of $x$ (velocity, acceleration), as already used in 8.1
- $z\_0$: the constant height of the point mass in the LIP model
- $\omega = \sqrt{g/z\_0}$: the LIP's characteristic (angular) frequency, units rad/s
- $\xi$: the Divergent Component of Motion (DCM), a position-like quantity with the same units as $x$
- $k$: leg stiffness in the SLIP model (N/m); $L\_0$: the leg's rest length (m); $\alpha\_0$: angle of attack (rad or °)
- $\beta$: duty factor, already introduced in 8.1

New symbols are also re-introduced in words the first time they appear in each section, so you do not need to memorize this table before continuing.

</div>

---

## Models of legged locomotion

### Why do we need models and stability criteria?

Kinematic and dynamic models are used throughout the legged-robot development pipeline, not only inside the final controller:

- to decide and design the **mechanical structure** of the robot (degrees of freedom, mass distribution, actuator sizing);
- to build **physics-based simulators** for testing controllers before deployment;
- inside **model-based controllers**, for footstep placement and balance control (the subject of 8.3);
- inside **optimization-based approaches**, e.g. trajectory optimization and model predictive control;
- for **post-processing**, i.e. characterizing and comparing locomotion properties after an experiment or a simulation run.

A particularly important class of model for this page is the **template model**: a deliberately simplified dynamic model, often with just one point mass and one massless leg, that discards most of the robot's real complexity but still reproduces its dominant dynamic behavior. Where does that idea come from? It comes directly from looking at measured ground reaction forces.

**What walking and running actually look like, mechanically.** If you put a walking person on a force plate, the vertical ground reaction force traces a characteristic **double-hump** ("camel-back") shape over each step, with a brief dip in the middle. That dip coincides with **double support**: a short window where both feet are on the ground at once, momentarily forming a closed kinematic chain between the two legs. If you do the same for running, the vertical force instead shows a **single, smooth peak** per step, and there is no double-support window at all, the body is briefly airborne between steps (a flight phase) rather than always in contact with the ground.

The center of mass tells the same story from a different angle. During walking, its kinetic and gravitational potential energy rise and fall **out of phase**: as the body vaults forward and upward over the stance leg it slows down (kinetic energy converts to potential energy), then it speeds up again as it falls back down (potential converts back to kinetic), almost exactly like a playground swing exchanging height for speed. During running, kinetic and potential energy instead rise and fall **in phase**: both reach their minimum at the same instant, at mid-stance, where the body is simultaneously at its lowest *and* at its slowest, and both recover together as the leg re-extends and throws it back up into flight. Energy is not being exchanged with gravity here; while the body drops and slows, the missing energy is stored elastically, in tendons, muscles, and the leg's effective compliance, and it is returned on the way back up.

These two energy signatures are exactly what the two template models below are built to reproduce:

- The **inverted pendulum** picture treats the stance leg as a rigid, massless strut that the point-mass body vaults over. Because a pendulum naturally exchanges kinetic and potential energy as it swings, this single mechanical idea reproduces walking's out-of-phase energy signature and its camel-back vertical force, without needing any muscles, springs, or control to be added by hand.
- The **spring-mass** picture instead treats the stance leg as a linear spring: the point mass bounces on it, storing elastic energy as the spring compresses on impact and returning it as the spring extends on lift-off. This reproduces running's in-phase energy signature and its single-peaked vertical force just as directly.

A striking empirical fact motivates taking these crude pictures seriously: despite enormous differences in size, mass, and number of legs, walking and running animals across the board, humans, dogs, birds, insects, even simulated and physical robots, reuse essentially the same two energy-exchange strategies. The detailed anatomy barely matters for predicting the center-of-mass trajectory; what matters is which of the two strategies (pendulum-like vaulting, or spring-like bouncing) the gait is using.

One more asymmetry is worth flagging early, since it shapes how the rest of this page treats the two gaits. At the level of the **full multi-body robot**, walking is the more awkward problem, and double support is the reason: once both feet share the ground at the same time, the two legs close a kinematic chain, and the equations of motion become correspondingly more involved. Bipedal running never has this problem, at every instant at most one foot is on the ground, so there is no closed chain to account for.

At the level of the **template models**, however, the difficulty is inverted, and it is worth knowing this in advance so that the next two sections do not come as a surprise. The LIP buys an exact, closed-form solution, but only by paying for it with an extra assumption that walking does not actually obey: a constant center-of-mass height (Section 8.2.2.2). The SLIP refuses that concession, keeping a compliant leg and a freely varying height, and pays a different price: its equations are nonlinear and have to be integrated numerically (Section 8.2.2.3). Neither model is simply "easier" than the other, they trade realism against solvability in opposite directions.

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin: 1.5rem auto;">

  <figure style="margin: 0; text-align: center; max-width: 460px;">
    <div style="display: flex; justify-content: center; align-items: flex-end; gap: 14px;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot40a.png' | relative_url }}"
        alt="Stick-figure sequence of a person walking, showing the hip tracing a curved path over the stance leg"
        style="width: 42%; height: auto;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot40.png' | relative_url }}"
        alt="Inverted pendulum model of walking: the center of mass follows a circular arc pivoting about the stance foot"
        style="width: 52%; height: auto;">
    </div>
    <figcaption style="font-size: 0.9rem; color: #4b5563; margin-top: 0.4rem;">
      <strong>Figure 1: Inverted-pendulum picture of walking.</strong> Left: a real walking stride, the hip (marked) traces a curved path over each stance leg in turn. Right: the same idea reduced to its essentials, a rigid strut vaulting a point mass over the stance foot, so kinetic and potential energy of the CoM oscillate out of phase.
    </figcaption>
  </figure>

  <figure style="margin: 0; text-align: center; max-width: 460px;">
    <div style="display: flex; justify-content: center; align-items: flex-end; gap: 14px;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot41a.png' | relative_url }}"
        alt="Stick-figure sequence of a person running, showing a bent, spring-like stance leg and an airborne flight phase"
        style="width: 42%; height: auto;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot41.png' | relative_url }}"
        alt="Spring-mass model of running: the leg acts as a spring that compresses and extends during stance"
        style="width: 52%; height: auto;">
    </div>
    <figcaption style="font-size: 0.9rem; color: #4b5563; margin-top: 0.4rem;">
      <strong>Figure 2: Spring-mass picture of running.</strong> Left: a real running stride, the stance leg bends and straightens like a spring, with a visible airborne phase between steps. Right: the same idea reduced to a leg-spring that compresses then extends, so kinetic and potential energy of the CoM oscillate in phase.
    </figcaption>
  </figure>

</div>

The rest of this page turns these two pictures, and the informal static/dynamic stability distinction from 8.1, into precise, computable tools. We build up the two template models in depth first, because the more advanced stability criteria (capture point, return maps) are defined *in terms of* those models, and only then turn to the stability criteria themselves.


Before moving on to the main models of walking and running, here is a video giving an quick introduction of these models :

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/3jJa2QJeyTo"
    title="Intro to LIP and SLIP models"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

*Source : ME585 2.3.1 SLIP model intro (https://www.youtube.com/watch?v=3jJa2QJeyTo)*

---

### The Linear Inverted Pendulum (LIP)

The inverted-pendulum picture of walking from Section 8.2.2.1 is, as it stands, a **nonlinear** dynamical system, and the reason is worth being precise about. If the leg were a rigid rod of fixed length, the point mass would be constrained to a circular arc, its height would rise and fall as it swings, and the equation of motion would be the classic pendulum equation with its $\sin$ term, which has no solution in elementary functions.

Kajita and Tani (1991) proposed a simplification that removes exactly that difficulty. It trades a little realism for an **exact, closed-form solution**, and that solution is what makes real-time footstep planning possible; it is also the model from which the capture point of Section 8.2.3.3 is derived.

#### The modelling assumption

> **In the Linear Inverted Pendulum, the point mass is assumed to stay at a constant height $z\_0$, and the (massless) leg is telescopic.**

Both halves of that sentence matter:

- **Constant height.** The mass is confined to the horizontal line $z = z\_0$. It does not vault up and over as in the true pendulum; it translates horizontally.
- **Telescopic, massless leg.** To keep the mass at a fixed height while its horizontal position changes, the leg must be able to *change length*. So, writing $l$ for the instantaneous leg length and $\alpha$ for the leg's angle from the vertical, the geometry is

$$
x = l \sin\alpha, \qquad z = z\_0 = l \cos\alpha .
$$

Note carefully what this implies: **the pendulum length $l$ is not a constant**. It is $l = z\_0 / \cos\alpha$, growing as the leg tilts away from vertical. That is the price paid for the constant height, and it is why the leg is drawn as a telescopic strut rather than a rigid rod.

#### Derivation of the equation of motion

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot44.png' | relative_url }}"
    alt="Force diagram of the 2D linear inverted pendulum: the leg pushes along its axis with force Fp, gravity Fg acts downward, and the resultant F has only a horizontal component Fx"
    style="width: 42%; max-width: 300px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 3: Forces in the 2D Linear Inverted Pendulum.</strong> The mass sits at constant height $z = z\_0$, at horizontal position $x$, on a telescopic leg tilted by $\alpha$ from the vertical. The leg pushes along its own axis with force $\mathbf{F}\_p$ (red, up the leg); gravity $\mathbf{F}\_g$ pulls straight down. Their resultant $\mathbf{F}$ (blue) is purely horizontal, of magnitude $F\_x$, because the vertical components must cancel to hold the height constant. Direction of movement is to the right. Adapted from the Legged Robots course (EPFL).
  </figcaption>

</figure>

The derivation is short, and every step follows from the assumption above.

**Step 1: the vertical direction is already settled.** The mass is held at $z = z\_0$ for all time, so

$$
\ddot{z} = 0 .
$$

By Newton's second law along $z$, the *net* vertical force must therefore vanish:

$$
F\_z = 0 .
$$

The leg's push $\mathbf{F}\_p$ and the weight $\mathbf{F}\_g = -mg\,\hat{z}$ cancel exactly in the vertical direction. This is the entire content of the constant-height assumption, expressed as a force balance.

**Step 2: what is left is horizontal.** Since the two forces cancel vertically but are not collinear, their resultant $\mathbf{F}$ is purely horizontal. Resolving the leg force along the leg axis (tilted by $\alpha$) and imposing the vertical cancellation gives its magnitude:

$$
\lVert \mathbf{F} \rVert = \lvert\, m g \tan\alpha \,\rvert ,
\qquad\text{so}\qquad
F\_x = m g \tan\alpha .
$$

Here $\tan\alpha$ appears for a simple geometric reason: the vertical component of the leg force must equal $mg$, and the horizontal component is related to it by the leg's tilt, so the ratio horizontal-to-vertical is exactly $\tan\alpha$.

**Step 3: convert the angle into a position.** This is the step that produces the linearity. From the geometry set out in the modelling assumption above, dividing $x = l\sin\alpha$ by $z\_0 = l\cos\alpha$ makes the unknown length $l$ cancel:

$$
\tan\alpha = \frac{x}{z\_0}.
$$

The constant height has turned a trigonometric function of the angle into a **linear function of the horizontal position**.

**Step 4: assemble.** Newton's second law along $x$ reads $\ddot{x} = F\_x / m$. Substituting $F\_x = mg\tan\alpha$ and then $\tan\alpha = x/z\_0$:

$$
\ddot{x} \;=\; \frac{F\_x}{m} \;=\; g \tan\alpha \;=\; \frac{g}{z\_0}\,x .
$$

> **This is a linear differential equation, and therefore it has a closed-form solution.**

Compare this with the true pendulum, whose equation contains $\sin\alpha$ rather than $\alpha$ or $x$. That single difference, bought by fixing the CoM height, is what the entire usefulness of the LIP rests on.

Two remarks before moving on. First, note that the mass $m$ has cancelled: the LIP's motion does not depend on how heavy the robot is, only on the height $z\_0$. Second, the same derivation runs independently in the lateral direction, giving $\ddot{y} = (g/z\_0)y$; this is why we can treat the 3D model as two decoupled 2D problems, and why we only ever write the $x$ equation.

Finally, if the support foot is not at the origin but at some position $x\_{base}$, only the lever arm changes, and the equation becomes

$$
\ddot{x}(t) = \frac{g}{z\_0}\bigl(x(t) - x\_{base}\bigr),
\qquad
\omega \triangleq \sqrt{\frac{g}{z\_0}} ,
$$

where $\omega$, with units of rad/s, is the model's single characteristic frequency: it is set entirely by the CoM height and gravity.

#### Closed-form solution

Because the equation is linear with constant coefficients, we can solve it once and for all. The general solution is a combination of a decaying and a growing exponential, offset by the foot position:

$$
x(t) = A\,e^{-\omega t} + B\,e^{\omega t} + x\_{base},
$$

and matching the initial position $x(0)$ and initial velocity $\dot{x}(0)$ fixes the two constants:

$$
A = \frac{-\dot x(0)/\omega + x(0) - x\_{base}}{2},
\qquad
B = \frac{\dot x(0)/\omega + x(0) - x\_{base}}{2}.
$$

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot45.png' | relative_url }}"
    alt="The LIP mass at successive instants: the telescopic leg pivots about a fixed base point while the point mass translates horizontally at constant height"
    style="width: 42%; max-width: 300px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 4: The LIP in motion, and its closed-form trajectory.</strong> The point mass $m$ travels horizontally at the constant height $z\_0$, while the telescopic leg pivots about the fixed support point $x\_{base}$ and lengthens as it tilts. Successive snapshots (grey to black) show the mass at increasing $x(t)$; gravity $g$ acts downward throughout. Because $x(t)$ is known analytically, the whole future trajectory can be predicted from the current state and the chosen $x\_{base}$. Adapted from the Legged Robots course (EPFL).
  </figcaption>

</figure>

We thus have a **closed-form (i.e. analytical) solution that predicts the forward movement of the center of mass**. No numerical integration is needed: given where the CoM is and how fast it is going right now, and given where we decide to put the foot, we can evaluate $x(t)$ at any future time directly.

#### Consequences and limitations

**The growing exponential is the important one.** The term $B e^{\omega t}$ means that, left uncontrolled, the LIP is an **unstable** system: unless $B$ happens to be exactly zero, any small horizontal offset from directly above the foot grows without bound. This is not a defect of the model, it is the honest statement that standing and walking are fundamentally unstable balancing acts, held up by continually choosing where to put the next foot rather than by any passive equilibrium. That instability is the entire reason footstep planning exists, and the form of $B$ is precisely what the capture point of Section 8.2.3.3 exploits.

**It is fast enough to run online.** Because $x(t)$ is available in closed form, many real biped robots use the LIP for **online footstep planning**: from the current CoM state, the controller solves analytically for where the next foot must land to achieve a desired future state, at control-loop rates.

**The cost is a crouch.** Keeping $z\_0$ genuinely constant is not free: a real robot must actively enforce it, and the only way to have vertical travel available in both directions is to walk with **bent, crouched knees**. This is why classical ZMP-and-LIP humanoids have their distinctive, slightly seated gait. It looks markedly non-human, and it is not energy-efficient, since the legs must continuously support the body against gravity without ever locking straight. Recovering a more natural, more efficient gait is one of the motivations for the richer models and methods in 8.3.

**A connection worth noticing.** Compare the equation of motion above with the simplified ZMP formula from Section 8.2.3.2, $x\_{ZMP} = x - (z\_0/g)\ddot{x}$. Substituting $\ddot{x} = (g/z\_0)(x - x\_{base})$ into it gives $x\_{ZMP} = x\_{base}$ exactly. In other words, **in the LIP the ZMP sits precisely at the support point**: the two models are the same statement viewed from opposite ends, one solving for the motion given the foot, the other solving for the foot given the motion.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 1 (pen &amp; paper) : LIP trajectory prediction</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A biped's CoM is held at a constant height $z\_0 = 0.5\text{ m}$, with $g = 9.81\text{ m/s}^2$. At $t=0$, the support foot is at $x\_{base} = 0$, the CoM is at $x(0) = 0.05\text{ m}$, and it has velocity $\dot x(0) = 0.1\text{ m/s}$.

##### Question 1 (Numeric): The characteristic frequency

<p>
$\omega = \sqrt{g/z\_0}$ (rad/s, 2 decimals): <input type="text" id="ex1-omega" size="8">
</p>

##### Question 2 (Numeric): Position at $t = 0.2\text{ s}$

Using your value of $\omega$ (or a recomputed one), find $A$ and $B$ from the boxed formula above, then evaluate $x(t) = Ae^{-\omega t} + Be^{\omega t} + x\_{base}$ at $t = 0.2\text{ s}$. A calculator is expected here.

<p>
$x(0.2)$ (m, 3 decimals): <input type="text" id="ex1-x" size="8">
</p>

<br>

<button type="button" onclick="checkEx1()">Check answers</button>
<p id="ex1-feedback"></p>

<script>
function checkEx1() {
  const g = 9.81, z0 = 0.5, x0 = 0.05, xd0 = 0.1, xbase = 0, t = 0.2;
  const trueOmega = Math.sqrt(g / z0);
  const A = (-xd0/trueOmega + x0 - xbase) / 2;
  const B = (xd0/trueOmega + x0 - xbase) / 2;
  const trueX = A*Math.exp(-trueOmega*t) + B*Math.exp(trueOmega*t) + xbase;

  const uOmega = parseFloat(document.getElementById('ex1-omega').value);
  const uX = parseFloat(document.getElementById('ex1-x').value);
  const okOmega = approxEqual(uOmega, trueOmega, 0.05, 0.02);
  const okX = approxEqual(uX, trueX, 0.005, 0.08);

  let msgs = [];
  msgs.push(okOmega ? ("✅ ω correct (≈ " + trueOmega.toFixed(2) + " rad/s).") : ("❌ ω off. Expected ≈ " + trueOmega.toFixed(2) + " rad/s."));
  msgs.push(okX ? ("✅ x(0.2) correct (≈ " + trueX.toFixed(3) + " m).") : ("❌ x(0.2) off. Expected ≈ " + trueX.toFixed(3) + " m (A ≈ " + A.toFixed(4) + ", B ≈ " + B.toFixed(4) + ")."));

  const feedback = document.getElementById('ex1-feedback');
  feedback.innerHTML = msgs.join("<br>");
  feedback.style.color = (okOmega && okX) ? "green" : "orange";
}
</script>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Compute $\omega$ first, then plug it into the formulas for $A$ and $B$ before evaluating the exponentials. Keep at least 4 significant figures for $A$ and $B$; the two exponential terms partially cancel, so early rounding will noticeably shift your final answer.

  </div>
</details>

</div>
</details>

---

### The Spring-Loaded Inverted Pendulum (SLIP)

The LIP captured walking by making the leg a rigid, telescopic strut. Running is a different mechanical problem: as we saw in Section 8.2.2.1, its energy signature is elastic, not pendular, and it has a flight phase during which no foot touches the ground at all. The **Spring-Loaded Inverted Pendulum (SLIP)** is the template model for exactly that regime, and it is built by replacing the LIP's rigid strut with a **spring**.

#### Predictive validity and biological relevance

Before the equations, it is worth knowing how much this crude model buys. The SLIP is a well-known model that predicts correctly:

- the **ground reaction forces** measured under running animals, and
- the **center of mass trajectories** they follow,

and it does so for running animals **with different numbers of legs**. A two-legged human, a four-legged dog, a six-legged cockroach and an eight-legged crab do not resemble one another anatomically, yet when running, each behaves as though it were bouncing on a single effective leg-spring, producing the same single-humped vertical force and the same biphasic fore-aft force.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot47.png' | relative_url }}"
    alt="The SLIP template applied to two-, four-, six- and eight-legged runners, all reducing to the same single spring-loaded leg and producing the same force signature"
    style="width: 75%; max-width: 560px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 5: The SLIP as a universal running template.</strong> Human, dog, cockroach and crab all collapse onto the same template: a point mass bouncing on one effective leg-spring, producing a single-peaked vertical force and a biphasic fore-aft force. Filled and open circles mark which legs are on the ground at each instant. Adapted from Holmes, Full, Koditschek &amp; Guckenheimer (2006), via the Legged Robots course (EPFL).
  </figcaption>

</figure>

Because of this, the SLIP is used both as a **descriptive tool in biomechanics**, giving a convenient base to explore the dynamics of running systems, and as a **design tool in robotics**: it underlies the controllers of hopping and running machines, most famously Marc Raibert's **Virtual Leg control**, which we return to in 8.3.

#### Model definition and notation

> **The model is kept very simple: the body is a point mass $m$, and the leg is a massless linear spring of stiffness $k$ and length $L\_0$ when fully extended.**

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot48.png' | relative_url }}"
    alt="One SLIP stride: flight phase with the leg held at the angle of attack, stance phase where the spring compresses and extends, then flight again"
    style="width: 85%; max-width: 640px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 6: One SLIP stride, and all of its symbols.</strong> During <strong>flight</strong> the mass follows a ballistic arc with the leg held at the fixed angle of attack $\alpha\_0$. At touch-down the <strong>stance</strong> phase begins: the spring compresses to its minimum at mid-stance and re-extends, sweeping the leg through the angle $\Delta\varphi$, before take-off returns the mass to flight. Adapted from Geyer et al. (2004), via the Legged Robots course (EPFL).
  </figcaption>

</figure>

The symbols, gathered once:

| Symbol | Meaning |
|---|---|
| $m$ | point mass (the whole body) |
| $L\_0$ | leg rest length, i.e. its length fully extended |
| $\alpha\_0$ | leg **angle of attack** during flight |
| $g$ | gravitational acceleration |
| $k$ | spring stiffness |
| $r$ | radial position of the point mass (current leg length) |
| $\varphi$ | angular position of the point mass |
| $\Delta\varphi$ | angle swept by the leg during stance |

#### Modelling assumptions and their implications

Five assumptions define the model, and each has a consequence worth naming:

1. **The leg is massless**, so it has no moment of inertia. This is inherited directly from the LIP, and it is what lets us write the dynamics for a single point mass rather than a multi-body chain.
2. **The leg touches the ground with a constant angle of attack $\alpha\_0$.** Every touch-down happens at the same leg angle, regardless of what happened on previous steps.
3. **During stance, the leg angle changes naturally with the motion.** Once the foot is planted, nothing steers the leg: $\varphi$ evolves purely as a consequence of the dynamics.
4. **During flight, the angle of attack is reset to $\alpha\_0$.** Note what this quietly requires in practice: on a real hopping robot, resetting the leg to a precise angle in mid-air is an active control task, and it needs a good controller. The "passive" model conceals a real actuation requirement.
5. **Friction and other non-conservative forces are neglected**, so the system is **energy conservative**. No energy is lost at touch-down or dissipated in the spring, and none is injected during stance. This is why the SLIP can hop forever without any actuator doing work, and it is also why the self-stability discussed below is genuinely mechanical rather than a control artifact.

#### Equations of motion: Newton-Euler formulation

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot58.png' | relative_url }}"
    alt="Force diagram for the SLIP stance phase: the compressed leg-spring pushes the point mass along the leg axis with force Fs, while gravity Fg acts downward"
    style="width: 42%; max-width: 300px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 7: Forces during the SLIP stance phase.</strong> The mass sits at $(x, y)$, carried on a leg-spring whose rest length is $L\_0$. The compressed spring pushes along the leg axis with force $\mathbf{F}\_s$ (red, up the leg), while gravity $\mathbf{F}\_g$ pulls straight down. Movement is to the right. Note the angle convention: $\alpha\_0$ is measured from the left, and $\varphi$ from the right. Adapted from the Legged Robots course (EPFL).
  </figcaption>

</figure>

Applying the **Newton-Euler** method, we resolve the spring force into Cartesian components. The spring's compression, measured along each axis, is the difference between where the mass would be if the leg were at rest length and where it actually is:

$$
F\_{s,x} = k\,\Delta x = k\bigl(L\_0\cos\varphi - x\bigr),
\qquad
F\_{s,y} = k\,\Delta y = k\bigl(L\_0\sin\varphi - y\bigr).
$$

Dividing by $m$ and adding gravity to the vertical equation gives the **stance-phase** dynamics:

$$
\ddot{x} = \frac{k}{m}\bigl(L\_0\cos\varphi - x\bigr),
\qquad
\ddot{y} = \frac{k}{m}\bigl(L\_0\sin\varphi - y\bigr) - g .
$$

> **This is a set of nonlinear differential equations, and it needs numerical integration.**

This is the decisive contrast with the LIP. There, the constant-height trick turned $\tan\alpha$ into $x/z\_0$ and produced a linear equation with a closed-form solution. Here no such trick is available: $\cos\varphi$ and $\sin\varphi$ depend on where the mass currently is, so the right-hand sides are genuinely nonlinear in $x$ and $y$. There is no analytical solution to write down; you integrate numerically and see what happens. That is the price of admitting a compliant leg and a varying CoM height.

During **flight**, there is no ground contact and therefore no spring force at all, so the mass is simply a projectile:

$$
\ddot{x} = 0, \qquad \ddot{y} = -g .
$$

#### Hybrid dynamics and phase-transition conditions

The two sets of equations above are stitched together by **geometric switching conditions**, evaluated at each instant:

$$
\underbrace{y \le L\_0\sin\alpha\_0}\_{\text{touch-down: flight} \,\rightarrow\, \text{stance}},
\qquad
\underbrace{\sqrt{x^2+y^2} \ge L\_0}\_{\text{take-off: stance} \,\rightarrow\, \text{flight}} .
$$

Both read naturally once you picture the leg. **Touch-down** happens when the falling mass drops low enough that a leg held at angle $\alpha\_0$ would reach the ground, and the height of the foot-end of such a leg is exactly $L\_0\sin\alpha\_0$. **Take-off** happens when the spring, measured from the planted foot at the origin, has re-extended back to its rest length $L\_0$; beyond that it would have to pull the mass down, which a leg cannot do, so contact is released.

This makes the SLIP a **hybrid dynamical system**: continuous dynamics within each phase, punctuated by discrete switches. That structure is exactly why Section 8.2.3.4's Poincaré/return-map machinery is the right tool for analyzing its stability.

#### Design parameters and degrees of freedom

Everything above is fixed by the model except three quantities, which the designer or the controller is free to choose:

$$
v\_0 = \dot{x}\_0 \;\text{(initial horizontal velocity)},
\qquad
\alpha\_0 \;\text{(angle of attack)},
\qquad
k \;\text{(leg stiffness)} .
$$

The entire behaviour of the model, whether it hops steadily forever or tumbles after two steps, is decided by this triple.

#### Passive self-stabilisation and parameter sensitivity

Here is the result that made the SLIP influential. For suitable combinations of $k$ and $\alpha\_0$, repeated hopping is **self-stabilizing**: small perturbations to the apex height die out over successive steps *with no active feedback control whatsoever*. The mechanics alone reject the disturbance. Recall from assumption 5 that the model is energy-conservative, so this is not damping, it is the geometry of the touch-down and take-off conditions doing the work.

This is checked numerically, by the simplest possible method: **count how many steps the model completes before falling**, for each pair $(k, \alpha\_0)$, and plot the result.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot49.png' | relative_url }}"
    alt="Number of steps to fall as a function of leg stiffness and angle of attack, showing a narrow region of self-stable parameter combinations with human running data overlaid"
    style="width: 48%; max-width: 360px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 8: The self-stabilization region of the SLIP.</strong> Steps survived before falling (darker means more steps) as a function of leg stiffness $k\_{LEG}$ and angle of attack $\alpha\_0$, at $v\_{x,0} = 5$ m/s. Self-stable hopping exists only in a narrow band, and the arrows mark its boundary. Circles are measurements from real human running, which fall inside the band. Adapted from Seyfarth, Geyer, Günther &amp; Blickhan (2002), via the Legged Robots course (EPFL).
  </figcaption>

</figure>

Two things to read off this figure. First, **self-stability is not automatic**: for a given leg stiffness $k\_{LEG}$, the angle of attack $\alpha\_0$ must be chosen carefully, and most of the parameter plane corresponds to falling within a few steps. Second, and more strikingly, **real human running data land inside the stable band**, which is a strong argument that this two-parameter template really does capture something the biological system is also doing.

The practical consequence for robotics closes the loop back to assumption 4: since $\alpha\_0$ must be held accurately for self-stability to appear, a real hopping robot needs a controller that sets the angle of attack during each flight phase. This is precisely what Raibert's Virtual Leg control does, and why a model with no controller at all still tells us what the controller must achieve.

The following video is provided as a complementary explanation of the Spring-Loaded Inverted Pendulum model. It revisits the main ideas introduced in this section and can help reinforce your understanding of the SLIP assumptions, its flight and stance phases, and the role of the compliant leg in generating running and hopping dynamics.

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/qI_94iU1S0c"
    title="Spring-Loaded Inverted Pendulum Explanation"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

Video : Simulation of the Spring-Loaded Inverted Pendulum.

*Source : Legged Robotics 12b: Spring-load inverted pendulum model (Spring 2021) (https://www.youtube.com/watch?v=qI_94iU1S0c)*



Here is also a video for a simulation of the SLIP model :

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/ZTL4L9i174Y"
    title="Spring-Loaded Inverted Pendulum Simulation"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

*Source : Bipedal Walking in PyBullet (Spring-Loaded Inverted Pendulum) (https://www.youtube.com/embed/ZTL4L9i174Y)*

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 2 (pen &amp; paper) : Working with the SLIP equations</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A SLIP-modeled runner has leg rest length $L\_0 = 1.0\text{ m}$, angle of attack $\alpha\_0 = 70°$, and leg stiffness $k = 6000\text{ N/m}$.

##### Question 1: Stance or flight?

At a given instant during descent, the mass is at height $y = 0.85\text{ m}$. Using the touch-down condition $y \le L\_0 \sin\alpha\_0$, is the leg currently in stance or in flight?

<label style="display: block;">
  <input type="radio" name="ex2-phase" value="stance"> Stance (already touched down)
</label>
<label style="display: block;">
  <input type="radio" name="ex2-phase" value="flight"> Flight (not yet touched down)
</label>

##### Question 2 (Numeric): Spring force

At another instant, the leg is compressed to a radial length $r = 0.92\text{ m}$. Compute the magnitude of the spring force $F\_s = k(L\_0 - r)$.

<p>
$F\_s$ (N): <input type="text" id="ex2-fs" size="8">
</p>

<br>

<button type="button" onclick="checkEx2()">Check answers</button>
<p id="ex2-feedback"></p>

<script>
function checkEx2() {
  const L0 = 1.0, alpha0 = 70 * Math.PI / 180, k = 6000, y = 0.85, r = 0.92;
  const threshold = L0 * Math.sin(alpha0);
  const truePhase = (y <= threshold) ? 'stance' : 'flight';
  const trueFs = k * (L0 - r);

  const phaseChoice = document.querySelector('input[name="ex2-phase"]:checked');
  const okPhase = phaseChoice && phaseChoice.value === truePhase;

  const uFs = parseFloat(document.getElementById('ex2-fs').value);
  const okFs = approxEqual(uFs, trueFs, 5, 0.05);

  let msgs = [];
  msgs.push(okPhase ? ("✅ Correct: with L0 sin(α0) ≈ " + threshold.toFixed(3) + " m and y = 0.85 m, the leg is in " + truePhase + ".") : ("❌ Not quite. L0 sin(α0) ≈ " + threshold.toFixed(3) + " m; compare that to y = 0.85 m."));
  msgs.push(okFs ? ("✅ Spring force correct (≈ " + trueFs.toFixed(0) + " N).") : ("❌ Spring force off. Expected ≈ " + trueFs.toFixed(0) + " N."));

  const feedback = document.getElementById('ex2-feedback');
  feedback.innerHTML = msgs.join("<br>");
  feedback.style.color = (okPhase && okFs) ? "green" : "orange";
}
</script>

</div>
</details>

---

## Stability criteria

### The static stability margin

A gait is called **statically stable** if the vertical projection of the center of mass (CoM) stays inside the **support polygon**, the convex hull of the ground-contact points, at every instant. This is a useful first test, but it is only a yes/no test: it does not say *how* stable the robot is, only whether it currently is, and it implicitly assumes the robot moves slowly enough that inertial effects can be neglected (quasi-static motion). The **magnitude of the static stability margin** (McGhee & Frank, 1968) turns this into a number: it is the shortest distance from the CoM projection to the boundary of the support polygon.

$$
\text{margin} = \min\_{\mathbf{q} \in \partial \mathcal{P}} \; \lVert \mathbf{CoM}\_{proj} - \mathbf{q} \rVert,
$$

where $\mathcal{P}$ is the support polygon and $\partial \mathcal{P}$ is its boundary. By convention, the margin is taken **positive** when the CoM projection is inside $\mathcal{P}$, and **negative** once it has left the polygon, at which point the robot is, by this criterion, falling. McGhee and Frank originally introduced this quantity for statically stable quadruped and hexapod *creeping gaits*, walking patterns slow enough that at least three (for a hexapod) or three-plus (for a quadruped, momentarily) feet stay on the ground at all times, precisely so the support polygon never degenerates to a line or a point.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot42.png' | relative_url }}"
    alt="Static stability margin: shortest distance from the CoM projection to the boundary of the support polygon"
    style="width: 55%; max-width: 460px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto;">
    <strong>Figure 9: Static stability margin.</strong> Filled circles are legs on the ground, open circles are legs in the air; the support polygon (red) is the convex hull of the grounded feet, and the margin (purple) is the shortest distance from the CoM projection (orange) to its boundary.
  </figcaption>

  <p style="max-width: 700px; margin: 0.4rem auto; font-size: 0.85rem; color: #6b7280;">
    Reference: McGhee, R. B., &amp; Frank, A. A. (1968). On the stability properties of quadruped creeping gaits. <em>Mathematical Biosciences</em>, 3, 331&ndash;351. <a href="https://doi.org/10.1016/0025-5564(68)90090-4">doi.org/10.1016/0025-5564(68)90090-4</a>
  </p>

</figure>

A larger margin means the robot can absorb a larger disturbance before tipping, which is exactly why this quantity, simple as it is, is still used today to compare footstep placements or to keep a design margin during trajectory generation for statically stable gaits (e.g. hexapod tripod gaits).

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 3 (pen &amp; paper) : Computing a static stability margin</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A hexapod's support polygon, at some instant, is the axis-aligned rectangle with corners at $(-0.3, -0.2)$ and $(0.3, 0.2)$ (in meters). Its CoM projects onto the ground at $(0.1,\ 0.05)$.

For an axis-aligned rectangle, the distance from a point $(x\_{CoM}, y\_{CoM})$ inside it to the nearest edge is simply

$$
\text{margin} = \min\bigl(x\_{CoM} - x\_{min},\ x\_{max} - x\_{CoM},\ y\_{CoM} - y\_{min},\ y\_{max} - y\_{CoM}\bigr).
$$

##### Question 1 (Numeric): The margin

<p>
Static stability margin (m, 2 decimals): <input type="text" id="ex3-margin" size="8">
</p>

##### Question 2: Which edge is closest?

<label style="display: block;">
  <input type="radio" name="ex3-edge" value="a"> The left edge ($x = -0.3$)
</label>
<label style="display: block;">
  <input type="radio" name="ex3-edge" value="b"> The right edge ($x = 0.3$)
</label>
<label style="display: block;">
  <input type="radio" name="ex3-edge" value="c"> The bottom edge ($y = -0.2$)
</label>
<label style="display: block;">
  <input type="radio" name="ex3-edge" value="d"> The top edge ($y = 0.2$)
</label>

<br>

<button type="button" onclick="checkEx3()">Check answers</button>
<p id="ex3-feedback"></p>

<script>
function checkEx3() {
  const xmin=-0.3, xmax=0.3, ymin=-0.2, ymax=0.2, xc=0.1, yc=0.05;
  const dists = {a: xc-xmin, b: xmax-xc, c: yc-ymin, d: ymax-yc};
  let closest = 'a';
  for (const k in dists) { if (dists[k] < dists[closest]) closest = k; }
  const trueMargin = dists[closest];

  const uMargin = parseFloat(document.getElementById('ex3-margin').value);
  const okMargin = approxEqual(uMargin, trueMargin, 0.01, 0.05);

  const edgeChoice = document.querySelector('input[name="ex3-edge"]:checked');
  const okEdge = edgeChoice && edgeChoice.value === closest;

  let msgs = [];
  msgs.push(okMargin ? ("✅ Margin correct (≈ " + trueMargin.toFixed(2) + " m).") : ("❌ Margin off. Expected ≈ " + trueMargin.toFixed(2) + " m."));
  msgs.push(okEdge ? "✅ Correct edge." : "❌ Not quite, recompute all four distances and take the minimum.");

  const feedback = document.getElementById('ex3-feedback');
  feedback.innerHTML = msgs.join("<br>");
  feedback.style.color = (okMargin && okEdge) ? "green" : "orange";
}
</script>

</div>
</details>

---

### Center of Pressure and the Zero Moment Point

The static stability margin only makes sense while the robot is (approximately) not accelerating. Real walking and running are dynamic: the CoM constantly accelerates, and inertial effects matter as much as gravity. We need a criterion that accounts for that.

#### Center of Pressure (CoP)

The **Center of Pressure** is the point of application of the resultant ground reaction force, and can be measured directly from foot load sensors or a force plate:

$$
\mathbf{CoP} = \frac{\sum\_i F\_i\, \mathbf{X}\_i}{\sum\_i F\_i},
$$

a force-weighted average of the sensor positions $\mathbf{X}\_i$. The CoP coincides with the CoM projection only when the robot is standing still; once the robot accelerates, the two separate.

Two limitations follow directly from that definition, and they are different from one another:

- **The CoP exists only while contact does.** During a flight phase every $F\_i$ is zero, the denominator $\sum\_i F\_i$ vanishes, and the expression is simply undefined. So the CoP has nothing to say about running or hopping between footfalls.
- **The CoP can never leave the support polygon.** Because the ground can only push and never pull, every $F\_i \ge 0$, so the CoP is a weighted average of points of the contact area with non-negative weights, and such an average is always inside the convex hull of those points. No manoeuvre, however violent, can push it out; it saturates at the edge of the foot instead.

The second limitation is the one that matters here. It means the CoP can never, on its own, tell you that the robot is about to tip, exactly the situation we most want to detect. That is the gap the Zero Moment Point is built to fill, and we return to this point in detail once it is defined.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 4 (pen &amp; paper) : Computing a Center of Pressure</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A robot's foot has four load sensors, at the corners of a $1\text{ m} \times 1\text{ m}$ square: $(0,0)$, $(1,0)$, $(0,1)$, $(1,1)$, reading $F\_1 = 50\text{ N}$, $F\_2 = 70\text{ N}$, $F\_3 = 30\text{ N}$, and $F\_4 = 50\text{ N}$ respectively (in the order given above).

<figure style="margin: 1rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot54.png' | relative_url }}"
    alt="Four load sensors at the corners of a one meter square, with upward arrows sized proportionally to each sensor's force reading"
    style="width: 50%; max-width: 340px; height: auto;">

  <figcaption style="max-width: 550px; margin: 0.4rem auto; font-size: 0.85rem; color: #6b7280;">
    <strong>Figure 10: Setup for Exercise 4.</strong> The four sensors $F\_1$&ndash;$F\_4$ sit at the corners of the square; arrow length is proportional to each sensor's reading. The CoP is the force-weighted average of the four corner positions, it is not marked here since finding it is the point of the exercise.
  </figcaption>

</figure>

<p>
$\text{CoP}\_x$ (m, 2 decimals): <input type="text" id="ex4-copx" size="8">
</p>
<p>
$\text{CoP}\_y$ (m, 2 decimals): <input type="text" id="ex4-copy" size="8">
</p>

<br>

<button type="button" onclick="checkEx4()">Check answers</button>
<p id="ex4-feedback"></p>

<script>
function checkEx4() {
  const X = [[0,0],[1,0],[0,1],[1,1]];
  const F = [50,70,30,50];
  const sumF = F.reduce((a,b)=>a+b,0);
  const trueX = X.reduce((acc,p,i)=>acc+p[0]*F[i],0) / sumF;
  const trueY = X.reduce((acc,p,i)=>acc+p[1]*F[i],0) / sumF;

  const ux = parseFloat(document.getElementById('ex4-copx').value);
  const uy = parseFloat(document.getElementById('ex4-copy').value);
  const okX = approxEqual(ux, trueX, 0.02, 0.05);
  const okY = approxEqual(uy, trueY, 0.02, 0.05);

  const feedback = document.getElementById('ex4-feedback');
  feedback.innerHTML =
    (okX ? "✅ CoP_x correct (≈ " + trueX.toFixed(2) + " m). " : "❌ CoP_x off, expected ≈ " + trueX.toFixed(2) + " m. ") + "<br>" +
    (okY ? "✅ CoP_y correct (≈ " + trueY.toFixed(2) + " m)." : "❌ CoP_y off, expected ≈ " + trueY.toFixed(2) + " m.");
  feedback.style.color = (okX && okY) ? "green" : "orange";
}
</script>

</div>
</details>

#### The Zero Moment Point (ZMP)

The CoP tells us where the ground is pushing *right now*, from sensor readings. But a planner needs to answer a different question, **before** the robot moves: *if I command this motion, will the robot tip over?* The **Zero Moment Point** (Vukobratović, 1969; Kajita & Espiau, 2008) answers exactly that, and it is the single most widely used dynamic stability criterion in biped robotics.

Before defining it, we need to be precise about two things that are easy to gloss over: what the support polygon actually is here, and what "zero moment" is a statement about.

##### What counts as the support polygon?

In Section 8.2.3.1 the legs were idealized as *points*, so the support polygon was the convex hull of a handful of contact points. A biped with real, flat feet is different: each foot touches the ground over a whole **surface**, not a point. The support polygon is therefore the convex hull of the entire **contact area**:

- **Single support** (one foot on the ground): the support polygon is the outline of that foot's sole. Even standing on one foot, you have a real polygon to work with, roughly 25 cm by 10 cm for an adult human, which is precisely why you can lean slightly without falling.
- **Double support** (both feet on the ground): the support polygon is the convex hull of *both* soles, and this crucially **includes the empty gap between the feet**. Nothing is touching the floor in that gap, but the ground reaction forces from the two feet can combine to produce a resultant that acts anywhere in the hull, so it counts as support.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot55.png' | relative_url }}"
    alt="Support polygon of a biped: in single support it is the outline of the stance foot sole; in double support it is the convex hull of both soles including the gap between them"
    style="width: 85%; max-width: 620px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 11: The support polygon for a biped (top view).</strong> Left: in single support it is the sole of the stance foot alone. Right: in double support it is the convex hull of both soles, which includes the gap between the feet even though nothing touches the ground there.
  </figcaption>

</figure>

This also explains a limitation that will matter in 8.3: a robot with **point feet** (or a quadruped in a two-leg trot phase) has a support polygon that degenerates to a point or a line segment. A region with zero area cannot "contain" anything, so the ZMP criterion becomes vacuous, and those robots need the different tools we meet in Sections 8.2.3.3 and 8.2.3.4.

##### "Zero moment" of what, exactly?

Pick any point on the ground. Add up the moments (torques) that **gravity and inertia** produce about that point: the weight of each link, and the inertial term of each link that is accelerating or rotating. (The ground reaction forces are deliberately *not* in this list; we come back to why in a moment.) The result is a moment **vector** $\mathbf{M}$ with three components, and the two kinds of component mean very different things:

- The two **horizontal** components, $M\_x$ and $M\_y$, are **tipping moments**. They rotate the robot about a horizontal axis lying in the ground plane, pitching it forward/backward or rolling it sideways. These are the dangerous ones, this is what falling over *is*.
- The **vertical** component, $M\_z$, is a **yaw moment**: it spins the robot about the vertical axis, like pivoting on your heel. Unpleasant, perhaps, but it does not tip you over, so the criterion deliberately ignores it.

The **Zero Moment Point is the unique point on the ground where the two horizontal (tipping) components vanish.** That is the whole idea: the ZMP is the point about which the robot has no tendency to tip, and the vertical component is allowed to be anything.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot56.png' | relative_url }}"
    alt="Three candidate points along the foot sole; at points A and B the net moment tips the foot, at the ZMP the horizontal moment is zero"
    style="width: 75%; max-width: 560px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 12: What "zero moment" means.</strong> Computing the net moment about different ground points gives different answers. About point A the robot has a net moment tipping it one way, about point B the other way; somewhere between them lies the single point where the horizontal moment is exactly zero. That point is the ZMP.
  </figcaption>

</figure>

##### The definition, term by term

Consider a robot made of $N$ rigid links. Link $i$ has mass $m\_i$, its center of mass sits at $\mathbf{p}\_i$, and it has linear acceleration $\mathbf{a}\_i$, inertia tensor $\mathbf{I}\_i$, angular velocity $\boldsymbol{\omega}\_i$ and angular acceleration $\boldsymbol{\alpha}\_i$. Let $\mathbf{g} = (0, 0, -g)^T$ be the gravity vector.

For a candidate ground point $\mathbf{p}\_{ZMP}$, write the vector pointing from that candidate point to link $i$:

$$
\mathbf{r}\_i = \mathbf{p}\_i - \mathbf{p}\_{ZMP}.
$$

The total moment about the candidate point is then the sum, over all links, of four contributions:

$$
\mathbf{M}(\mathbf{p}\_{ZMP}) = \sum\_{i=1}^{N} \Bigl(
\underbrace{\mathbf{r}\_i \times m\_i\mathbf{a}\_i}\_{\text{(1) inertial}}
\; + \; \underbrace{\mathbf{I}\_i\boldsymbol{\alpha}\_i}\_{\text{(2) angular accel.}}
\; + \; \underbrace{\boldsymbol{\omega}\_i \times \mathbf{I}\_i\boldsymbol{\omega}\_i}\_{\text{(3) gyroscopic}}
\; - \; \underbrace{\mathbf{r}\_i \times m\_i\mathbf{g}}\_{\text{(4) gravity}}
\Bigr).
$$

Reading the four terms:

1. $\mathbf{r}\_i \times m\_i\mathbf{a}\_i$: the moment of link $i$'s **inertial term** $m\_i\mathbf{a}\_i$, the net force needed to accelerate it; the cross product with the lever arm $\mathbf{r}\_i$ turns that force into a moment. This is the term that makes the criterion *dynamic* rather than static.
2. $\mathbf{I}\_i\boldsymbol{\alpha}\_i$: the moment required to **angularly accelerate** the link, i.e. to make it spin up or slow its rotation. A swinging leg or a rotating torso contributes here.
3. $\boldsymbol{\omega}\_i \times \mathbf{I}\_i\boldsymbol{\omega}\_i$: the **gyroscopic** term, which appears whenever an already-rotating rigid body has a non-symmetric inertia tensor. It is usually small for slow walking and often neglected in practice, but it is part of the exact expression.
4. $-\mathbf{r}\_i \times m\_i\mathbf{g}$: *minus* the moment of the link's **weight** $m\_i\mathbf{g}$. Terms (1) and (4) are best read together, since they combine into $\mathbf{r}\_i \times m\_i(\mathbf{a}\_i - \mathbf{g})$, the moment of the *effective* force on the link. This pair is all that survives if the robot stands perfectly still (every $\mathbf{a}\_i = 0$), which is why the ZMP reduces to the CoM projection at standstill.

The defining condition is that the horizontal part of this vector vanishes:

$$
\mathbf{M}(\mathbf{p}\_{ZMP}) = (0,\ 0,\ M\_z)^T,
\qquad \text{i.e.} \qquad
M\_x = 0 \;\text{ and }\; M\_y = 0 .
$$

The $M\_z$ entry is left free, that is the yaw component we agreed to ignore. So this is a system of **two scalar equations in two scalar unknowns**, $p\_{ZMP,x}$ and $p\_{ZMP,y}$ (the third coordinate is fixed at $z = 0$, since the ZMP is by definition a point on the ground). Given the robot's current state and a dynamic model, it has a unique solution whenever the net vertical force is non-zero, that is, whenever the robot is actually in contact with the ground.

**Where did the ground reaction forces go?** They were never needed. Newton's and Euler's laws say that the contact wrench and the gravity-plus-inertia wrench are equal and opposite, so the moment the ground exerts about any point is exactly the negative of the sum written above. Requiring one to have no horizontal component is therefore the *same* condition as requiring it of the other, and the two standard definitions of the ZMP, "the ground point where the contact forces exert no tipping moment" and "the ground point where gravity and inertia exert no tipping moment", pick out the same point. The version above is the useful one in practice, because it can be evaluated from the robot's planned state alone, **before** the motion is executed and before any contact force exists to measure.

##### A far more usable form

The full sum above is what you implement for a many-link robot, but it hides the intuition. If we collapse the robot to a single point mass at $\mathbf{p}\_{CoM} = (x, y, z)$ and neglect the angular terms (2) and (3), the algebra reduces to something you can read at a glance:

$$
x\_{ZMP} = x - \frac{z}{\ddot{z} + g}\,\ddot{x},
\qquad
y\_{ZMP} = y - \frac{z}{\ddot{z} + g}\,\ddot{y}.
$$

And if the CoM is additionally held at a constant height $z = z\_0$ (so $\ddot{z} = 0$), this becomes simply

$$
x\_{ZMP} = x - \frac{z\_0}{g}\,\ddot{x}.
$$

Read that last equation carefully, it is the single most useful sentence in this section:

> **The ZMP is the CoM's ground projection, shifted opposite to the CoM's horizontal acceleration.**

Stand still ($\ddot{x} = 0$) and the ZMP sits exactly under your CoM. Accelerate forward ($\ddot{x} > 0$) and the ZMP shifts *backward*, toward your heels. Brake ($\ddot{x} < 0$) and it shifts forward, toward your toes, which is exactly why you pitch onto your toes when you stop abruptly. We already met this equation in Section 8.2.2.2, where it is the LIP model in disguise.

##### The stability rule, and what it really means

> **Locomotion is dynamically stable, in the sense of not tipping, if the ZMP stays inside the support polygon over time.**

Now for the subtlety that trips most people up. It rests on the CoP limitation we met earlier, which is worth restating here in its proper place.

**The CoP can never leave the support polygon.** The ground can only *push*, never pull, on the robot's feet, a property called **unilateral contact**, and a weighted average of push-only forces is mathematically forced to lie inside the convex hull of the contact area. There is no physical mechanism that could place it outside. **The computed ZMP is under no such constraint**: it is the solution of an equation, not an average of measured forces, and nothing prevents that solution from landing off the foot.

So what happens if you compute the ZMP for some planned motion and the formula returns a point *outside* the foot? It means the motion you planned would require the ground to pull down on the robot somewhere outside the support polygon, in order to supply the moment that would keep it from tipping. The ground cannot do that. What happens instead is that the real CoP saturates at the edge of the foot, an unbalanced tipping moment remains, and **the robot rotates about that edge**. In the literature this out-of-polygon solution is called a **fictitious ZMP** (FZMP): a useful number, because how far outside it lands tells you the direction and severity of the impending tip, but not a physically realized point.

Two honest caveats. First, tipping is not the same as falling: a robot whose ZMP briefly exits the support polygon may still recover by taking a step, which is exactly what the capture point of Section 8.2.3.3 formalizes. Second, this whole criterion presumes a foot is on the ground, so it says nothing at all about the flight phase of a running or hopping robot; Section 8.2.3.4 provides the right tool there.

##### What *can* leave the support polygon

If the CoP cannot leave, what does dynamic walking actually look like? The answer is that the quantity free to wander outside is the **ground projection of the center of mass**.

This is the essential difference between the static criterion of Section 8.2.3.1 and the dynamic one here. Static stability demanded that the CoM projection stay inside the support polygon. Dynamic stability makes no such demand: the CoM projection may be well outside the feet, as long as the robot is accelerating in the right way to keep the *ZMP* inside.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot57.gif' | relative_url }}"
    alt="Animation of an accelerating biped: the center of mass projection moves outside the support polygon while the ZMP remains inside, so the robot does not tip"
    style="width: 60%; max-width: 460px; height: auto; border: 1px solid #e5e7eb; border-radius: 8px;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 13: The CoM projection may leave the support polygon; the ZMP may not.</strong> As the body leans and accelerates forward, its CoM projection (orange) crosses outside the foot, which would be an immediate fall by the static criterion of Section 8.2.3.1. The ZMP (purple) stays inside the foot throughout, so no tipping moment develops and the motion is dynamically stable.
  </figcaption>

</figure>

A sprinter at the blocks is the extreme case: the body is pitched far forward, the CoM projection is well ahead of the feet, and yet nothing tips, because the forward acceleration is large enough to hold the ZMP back inside the contact patch. By $x\_{ZMP} = x - (z\_0/g)\ddot{x}$, a large positive $\ddot{x}$ subtracts a large amount from $x$. Stop accelerating in that posture and you fall on your face, which is precisely what the equation predicts.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot43.png' | relative_url }}"
    alt="ZMP trajectory staying inside successive footprint polygons during a biped turning walk">

  <figcaption style="max-width: 700px; margin: 0.5rem auto;">
    <strong>Figure 14: A planned ZMP trajectory.</strong> As the biped walks and turns, the reference ZMP trajectory (red) is designed to stay inside each successive support polygon (dashed), the classical ZMP-based approach to generating a walking pattern (Kajita et al., 2003).
  </figcaption>

</figure>

##### Related criteria

Two variants appear often enough in the literature to be worth recognizing. The **Foot Rotation Indicator (FRI)** coincides with the ZMP while the foot is flat and stationary, but, unlike the ZMP, is *allowed* to leave the support polygon; how far outside it lies quantifies the rotational acceleration of the foot, making it the natural tool for analyzing a foot that is already tipping. The **Centroidal Moment Pivot (CMP)** is the point where the ground reaction force line would have to intersect the ground for the net moment about the CoM to be zero, and it separates from the CoP exactly when the robot generates angular momentum about its CoM (by swinging its arms, for example). Popovic, Goswami and Herr (2005) give a careful comparison of all three.

Finally, a note on terminology: there is real, long-running disagreement in the literature about the precise definition of the ZMP and its relationship to the CoP (Sardain & Bessonnet, 2004, is the standard reference on this). Some authors reserve "ZMP" for the always-inside quantity identical to the CoP; others use it for the computed quantity that may go outside. In this course we use the second convention and call the out-of-polygon case a fictitious ZMP, and in practice the engineering rule, "keep the ZMP inside the support polygon", is the same either way.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 1 : Static margin, CoP, and ZMP</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Sign convention of the static margin

By convention, what does a **negative** static stability margin mean?

<label style="display: block;">
  <input type="radio" name="mod3-q1" value="a"> The CoM projection is exactly on the boundary of the support polygon
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q1" value="b"> The CoM projection has left the support polygon; the robot is falling by this criterion
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q1" value="c"> The robot is accelerating too fast
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q1" value="d"> The support polygon is too small
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod3-q1',
    'b',
    'Correct! A negative margin means the CoM projection is outside the support polygon boundary, i.e. the robot is statically falling.',
    'Incorrect. The sign of the margin directly encodes whether the CoM projection is inside (positive) or outside (negative) the support polygon.'
  )">
  Check answer
</button>

<p id="mod3-q1-feedback"></p>

---

##### Question 2 (True/False): Can the CoP leave the support polygon?

During a violent manoeuvre, the Center of Pressure can be pushed outside the support polygon.

<label style="display: block;">
  <input type="radio" name="mod3-q2" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q2" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'mod3-q2',
    'false',
    'Correct! The ground can only push, never pull (unilateral contact), so the CoP is a weighted average of push-only forces and is mathematically forced to stay inside the convex hull of the contact area. It saturates at the edge instead, and the robot tips about that edge.',
    'Incorrect. The ground can only push, never pull, so the CoP is an average of push-only forces and cannot leave the convex hull of the contact area. It is the *computed* ZMP that can land outside (a fictitious ZMP), which signals that the robot is about to tip.'
  )">
  Check answer
</button>

<p id="mod3-q2-feedback"></p>

---

##### Question 3 (True/False): What may leave the support polygon?

During dynamically stable walking, the ground projection of the center of mass may lie outside the support polygon.

<label style="display: block;">
  <input type="radio" name="mod3-q2b" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q2b" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'mod3-q2b',
    'true',
    'Correct! This is exactly what separates dynamic from static stability. The static criterion requires the CoM projection to stay inside the polygon; the dynamic (ZMP) criterion does not, provided the acceleration keeps the ZMP inside.',
    'Incorrect. It is the *static* criterion that requires the CoM projection to stay inside the support polygon. In dynamic walking it routinely leaves, as long as the ZMP stays inside.'
  )">
  Check answer
</button>

<p id="mod3-q2b-feedback"></p>

---

##### Question 4: The ZMP stability rule

According to the ZMP criterion, when is a biped's locomotion considered (dynamically) stable?

<label style="display: block;">
  <input type="radio" name="mod3-q3" value="a"> When the ZMP stays inside the support (foot-print) polygon at all times
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q3" value="b"> When the CoM stays directly above the ZMP at all times
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q3" value="c"> When the ZMP is always at the exact center of the foot
</label>
<label style="display: block;">
  <input type="radio" name="mod3-q3" value="d"> When the static stability margin is exactly zero
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod3-q3',
    'a',
    'Correct! The rule is about the ZMP staying inside the support polygon over time, not about the CoM position or the ZMP being centered.',
    'Incorrect. Re-read the boxed stability rule in Section 8.2.3.2.'
  )">
  Check answer
</button>

<p id="mod3-q3-feedback"></p>

</div>
</details>

---

### Capture point and the Divergent Component of Motion (DCM)

We now return to walking, and to the LIP. The ZMP of Section 8.2.3.2 tells you whether you are *currently* tipping, and the LIP of Section 8.2.2.2 tells you how the CoM will move once a foot is planted. Neither answers the question a balance controller actually faces after a push: **where should I put the next foot?** This section derives the answer, and it falls directly out of the LIP's closed-form solution.

#### Capturability: the qualitative notion

We begin with the concept, before the algebra.

> A **capture point** is a point on the ground where the robot could step **in order to come to a complete stop**. The **capture region** is the set of all such points.

This definition, due to Pratt, Carff, Drakunov and Goswami (2006), reframes balance as a reachability question. Rather than asking "am I stable?", it asks "is there somewhere I could put my foot that would let me stop?" Comparing the capture region against two other regions on the ground then yields three qualitatively different situations:

1. **The capture region intersects the current base of support.** The robot can come to a stop *without stepping at all*, simply by shifting its Center of Pressure within the foot it already has planted. A small push, absorbed by leaning.
2. **The capture region is disjoint from the base of support, but lies within the kinematic workspace of the swing leg.** The robot cannot recover by leaning, but it *can* recover: it must take a step, and the capture region tells it exactly where to put the foot.
3. **The capture region lies outside the swing leg's kinematic workspace.** No single step reaches a stopping point. The robot cannot stop in one step; it must either take several steps or fall.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot46.png' | relative_url }}"
    alt="Three push-recovery cases: the capture region overlapping the support foot, disjoint but reachable by the swing leg, and beyond the swing leg's workspace"
    style="width: 40%; max-width: 290px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 15: Capture point and capture region.</strong> A humanoid is pushed by a force $F$. <strong>Top:</strong> the capture region (green) intersects the base of support, so the robot modulates its CoP and does not need to step. <strong>Middle:</strong> capture region and base of support are disjoint, so a step is required. <strong>Bottom:</strong> the capture region lies outside the kinematic workspace of the swing foot, so the robot cannot stop in one step. Adapted from Pratt, Carff, Drakunov &amp; Goswami (2006), via the Legged Robots course (EPFL).
  </figcaption>

</figure>

Notice that this is a strictly stronger notion than the ZMP criterion. The ZMP told us whether a tipping moment exists right now; capturability tells us whether a *recovery strategy* exists at all, and, in case 2, what that strategy is. What it does not yet give us is a formula. For that we return to the LIP.

#### Change of variables: decoupling the LIP dynamics

Recall the 2D LIP equation of motion derived in Section 8.2.2.2, with the support point at $x\_{base}$:

$$
\ddot{x}(t) = \frac{g}{z\_0}\bigl(x(t) - x\_{base}\bigr),
\qquad
\omega = \sqrt{\frac{g}{z\_0}} .
$$

This is one second-order equation. The key analytical step is to introduce a **new state variable**, conventionally written with the lower-case Greek letter $\xi$ (xi):

$$
\boxed{\;\xi = x + \frac{\dot{x}}{\omega}\;}
$$

The variable $\xi$ has the units of a position: it is the current CoM position, offset by the current CoM velocity scaled by the characteristic time $1/\omega$. Loosely, it is "where the CoM is heading", a position extrapolated forward from the present state.

With this substitution, the single second-order equation splits into **two first-order linear differential equations**:

$$
\underbrace{\dot{\xi} = \omega\bigl(\xi - x\_{base}\bigr)}\_{\textbf{divergent component}},
\qquad
\underbrace{\dot{x} = -\omega\bigl(x - \xi\bigr)}\_{\textbf{convergent component}} .
$$

This decomposition is the whole point of the change of variables, and the two halves behave in opposite ways:

- **The divergent component.** The variable $\xi$ is the **Divergent Component of Motion (DCM)**. Its equation has a *positive* coefficient $+\omega$, so $\xi$ is **pushed away** from $x\_{base}$, growing exponentially. This is the unstable part of the LIP, isolated into a single scalar.
- **The convergent component.** The variable $x$ has a *negative* coefficient $-\omega$, so the CoM is **attracted to** $\xi$, converging exponentially toward it. This is the stable part.

The instability we identified in Section 8.2.2.2, the growing exponential $Be^{\omega t}$, has now been cleanly separated out. All of the divergence lives in $\xi$, and none of it lives in $x$. That is what makes this change of variables so useful: instead of controlling a second-order unstable system, we need only steer one scalar quantity.

#### The instantaneous capture point

Now put the two ideas together. Look again at the divergent equation:

$$
\dot{\xi} = \omega\bigl(\xi - x\_{base}\bigr) .
$$

The support point $x\_{base}$ is not a fact of nature; it is a **control input**, chosen by deciding where to step. And this equation says that if we choose

$$
x\_{base} = \xi ,
$$

then $\dot\xi = 0$: the DCM stops moving. With $\xi$ frozen, the convergent equation $\dot{x} = -\omega(x - \xi)$ drives the CoM smoothly to $\xi$ and holds it there, so the CoM velocity decays to zero. **The pendulum stops.**

> **The DCM is the instantaneous capture point.** Stepping to the current value of $\xi$ brings the robot to rest.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot59.png' | relative_url }}"
    alt="The LIP mass travelling forward, with the DCM marked on the ground ahead of it as the location for the new support point"
    style="width: 40%; max-width: 290px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 16: Stepping to the DCM brings the robot to a stop.</strong> The mass travels forward over the current support point $x\_{base}$ (grey/black leg positions). The DCM $\xi$, computed from the current position $x(t)$ and velocity, lies ahead on the ground. Placing the next footstep there (red) makes $\dot\xi = 0$, so the CoM converges to that point and halts. Adapted from the Legged Robots course (EPFL).
  </figcaption>

</figure>

This is why the DCM is worth monitoring continuously during walking. It converts balance control into a concrete, computable instruction: evaluate $\xi = x + \dot{x}/\omega$ from the current state, and **plan the footsteps, that is, the successive values of $x\_{base}$, to bring the CoM where you want it and to prevent falling**. Choosing $x\_{base} = \xi$ stops the robot; choosing $x\_{base}$ short of $\xi$ leaves residual forward motion, which is precisely what you want when the goal is to keep walking rather than to halt.

#### Terminology and further reading

The same quantity appears in the literature under several names, which is worth knowing when reading papers. It is called the **Divergent Component of Motion (DCM)**, and equivalently the **extrapolated center of mass (XCoM)**, the latter term being more common in the biomechanics literature on human balance. Both refer to $\xi = x + \dot{x}/\omega$.

The DCM formulation underpins a family of modern biped balance controllers; Takenaka, Matsumoto and Yoshiike (2009) developed it for real-time walking pattern generation, and Englsberger et al. (2014) extended it to handle continuous leg forces during double support and heel-to-toe transitions. We will see in 8.3 how these ideas are embedded inside complete control architectures.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 5 (pen &amp; paper) : Where should the robot step?</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

At some instant, a LIP-modeled biped has $\omega = 4.43\text{ rad/s}$, $x = 0.06\text{ m}$, and $\dot x = 0.15\text{ m/s}$ (all relative to the current support foot).

##### Question 1 (Numeric): The DCM

<p>
$\xi = x + \dot{x}/\omega$ (m, 3 decimals): <input type="text" id="ex5-xi" size="8">
</p>

##### Question 2: Where to place the next foot

If the controller wants the robot to come to a **complete stop** with the very next step, where should it place $x\_{base}$?

<label style="display: block;">
  <input type="radio" name="ex5-step" value="a"> At $x\_{base} = 0$ (the current support foot's position)
</label>
<label style="display: block;">
  <input type="radio" name="ex5-step" value="b"> At $x\_{base} = x$ (directly under the current CoM)
</label>
<label style="display: block;">
  <input type="radio" name="ex5-step" value="c"> At $x\_{base} = \xi$ (the current DCM)
</label>
<label style="display: block;">
  <input type="radio" name="ex5-step" value="d"> As far forward as kinematically possible
</label>

<br>

<button type="button" onclick="checkEx5()">Check answers</button>
<p id="ex5-feedback"></p>

<script>
function checkEx5() {
  const omega = 4.43, x = 0.06, xd = 0.15;
  const trueXi = x + xd/omega;
  const uXi = parseFloat(document.getElementById('ex5-xi').value);
  const okXi = approxEqual(uXi, trueXi, 0.003, 0.05);

  const stepChoice = document.querySelector('input[name="ex5-step"]:checked');
  const okStep = stepChoice && stepChoice.value === 'c';

  let msgs = [];
  msgs.push(okXi ? ("✅ ξ correct (≈ " + trueXi.toFixed(3) + " m).") : ("❌ ξ off. Expected ≈ " + trueXi.toFixed(3) + " m."));
  msgs.push(okStep ? "✅ Correct: stepping exactly to ξ freezes the DCM (ξ̇ = 0). The CoM then converges to ξ and its velocity decays to zero — asymptotically, not at the instant of touch-down." : "❌ Not quite, re-read the definition of the DCM as the instantaneous capture point.");

  const feedback = document.getElementById('ex5-feedback');
  feedback.innerHTML = msgs.join("<br>");
  feedback.style.color = (okXi && okStep) ? "green" : "orange";
}
</script>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Programming Exercise 3 : LIP Footstep Planning and DCM Balance Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

This practical consolidates the core ideas of Sections 8.2.2.2 (the LIP) and 8.2.3.3 (the DCM):

- implementing the **LIP closed-form solution** to propagate the CoM state exactly, one timestep at a time;
- observing the **growing exponential instability** when no footstep correction is applied;
- implementing the **Divergent Component of Motion (DCM)** and using it to plan footsteps that bring the robot to a controlled stop;
- visualising all of the above in a live **PyBullet** simulation with a telescopic leg, footstep markers, and a real-time DCM indicator.

##### Download the exercise files

Download the complete exercise package, extract the ZIP file, and keep all files in the same folder.

<a
  href="{{ '/assets/downloads/locomotion/Exercise1_stability.zip' | relative_url }}"
  download
  style="
    display: inline-block;
    padding: 10px 16px;
    background-color: #0075db;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  ">
  Download Practical 3
</a>

##### What's in the package

```text
Exercise1_stability/
├── Exercise_LIP.py                  # exercise, fill in the three TODOs
├── Solution_LIP.py                  # reference solution
├── lip_env.py                       # LIP PyBullet environment (do not modify)
├── requirements.txt                 # Python dependencies
└── README.md                        # environment setup & step-by-step instructions
```

`Exercise_LIP` contains three functions to complete:

| TODO | Function | Concept |
|---|---|---|
| 1 | `lip_next_state` | LIP closed-form solution (Section 8.2.2.2) |
| 2 | `compute_dcm` | Divergent Component of Motion (Section 8.2.3.3) |
| 3 | `dcm_footstep_target` | Instantaneous capture-point rule (Section 8.2.3.3) |

**Full environment setup and instructions are in `README.md`** inside the downloaded package.

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 2 : LIP, SLIP and the capture point / DCM</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: What makes the LIP linear?

What is the key simplifying assumption that makes the LIP model's equation of motion linear?

<label style="display: block;">
  <input type="radio" name="mod3-lip-q1" value="a"> The center of mass height above the ground is held constant
</label>
<label style="display: block;">
  <input type="radio" name="mod3-lip-q1" value="b"> The leg length is held constant
</label>
<label style="display: block;">
  <input type="radio" name="mod3-lip-q1" value="c"> The horizontal velocity is held constant
</label>
<label style="display: block;">
  <input type="radio" name="mod3-lip-q1" value="d"> Friction is neglected
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod3-lip-q1',
    'a',
    'Correct! Fixing the CoM height z0 (with a mass-less, telescopic leg) makes tan(alpha) = x / z0 exactly linear in x.',
    'Incorrect. It is the constant CoM height z0, not a constant leg length, that linearizes the dynamics; the leg length is explicitly allowed to change to keep z0 fixed.'
  )">
  Check answer
</button>

<p id="mod3-lip-q1-feedback"></p>

---

##### Question 2 (True/False): Stability of the uncontrolled LIP

Left with a fixed support point $x\_{base}$ and no corrective foot placement, the LIP's horizontal position $x(t)$ remains bounded for all time.

<label style="display: block;">
  <input type="radio" name="mod3-lip-q2" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="mod3-lip-q2" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'mod3-lip-q2',
    'false',
    'Correct! The closed-form solution contains a growing exponential term Be^(omega t); unless B = 0 exactly, x(t) diverges. This is why footstep placement is required.',
    'Incorrect. The closed-form solution contains a growing exponential term, so x(t) generically diverges without corrective foot placement.'
  )">
  Check answer
</button>

<p id="mod3-lip-q2-feedback"></p>

---

##### Question 3: What does the DCM answer that the ZMP does not?

<label style="display: block;">
  <input type="radio" name="mod3-lip-q3" value="a"> Where the robot should step to come to a complete stop
</label>
<label style="display: block;">
  <input type="radio" name="mod3-lip-q3" value="b"> The total energy consumed by the robot
</label>
<label style="display: block;">
  <input type="radio" name="mod3-lip-q3" value="c"> The maximum achievable walking speed
</label>
<label style="display: block;">
  <input type="radio" name="mod3-lip-q3" value="d"> The joint torques required for a given trajectory
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod3-lip-q3',
    'a',
    'Correct! The DCM / capture point identifies where to step to bring the robot to a complete stop, a forward-looking, recovery-oriented question the ZMP does not directly answer.',
    'Incorrect. The DCM is specifically about where to place the next footstep to stop the robot; it is not an energy, speed, or torque criterion.'
  )">
  Check answer
</button>

<p id="mod3-lip-q3-feedback"></p>

</div>
</details>

---

### Poincaré maps and return-map analysis

The criteria of Sections 8.2.3.2 and 8.2.3.3 evaluate stability at a single instant, or over a single step. For strongly dynamic, cyclic gaits such as hopping and running, that is the wrong timescale. A hopping robot is never "in equilibrium" at any instant, yet it may nonetheless repeat the same motion indefinitely. What we want to know is whether the **cycle as a whole** repeats, and whether small disturbances shrink or grow from one cycle to the next. This is a question about periodic orbits, and the tool for it comes from nonlinear dynamics.

#### Poincaré maps: reducing a continuous flow to a discrete map

Poincaré maps are the standard technique for studying flows near a **periodic orbit**. The construction is as follows.

Consider an $n$-dimensional continuous dynamical system

$$
\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x}) .
$$

Choose an $(n-1)$-dimensional **surface of section** $S$. This surface must be **transverse** to the flow, meaning every trajectory starting on $S$ passes through it rather than running parallel to it. Now follow a trajectory from one intersection with $S$ to the next. If $\mathbf{x}\_k \in S$ denotes the $k$-th intersection, this defines the **Poincaré map** $P$, a mapping from $S$ to itself:

$$
\mathbf{x}\_{k+1} = P(\mathbf{x}\_k) .
$$

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot60.png' | relative_url }}"
    alt="A trajectory spiralling around a periodic orbit, intersecting the surface of section S at successive points that converge toward the fixed point"
    style="width: 42%; max-width: 320px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 17: Construction of a Poincaré map.</strong> The surface of section $S$ is placed transverse to the flow. Following the trajectory from one intersection $\mathbf{x}\_k$ to the next defines the map $\mathbf{x}\_{k+1} = P(\mathbf{x}\_k)$. Here successive intersections approach the fixed point $\mathbf{x}^\*$, so the underlying closed orbit is stable. Reproduced from Strogatz, <em>Nonlinear Dynamics and Chaos</em> (1994), via the Legged Robots course (EPFL).
  </figcaption>

</figure>

The value of this construction lies in what it does to the notion of a periodic orbit. Suppose $\mathbf{x}^\*$ is a **fixed point** of $P$, that is $P(\mathbf{x}^\*) = \mathbf{x}^\*$. Then a trajectory starting at $\mathbf{x}^\*$ returns to $\mathbf{x}^\*$ after some time $T$, and is therefore **a closed orbit** of the original system $\dot{\mathbf{x}} = \mathbf{f}(\mathbf{x})$. Moreover, by examining the behaviour of $P$ near that fixed point, we can determine the **stability** of the closed orbit.

> **The Poincaré map converts problems about closed orbits, which are difficult, into problems about fixed points of a mapping, which are easier in principle.**

Two properties are worth recording explicitly. First, this construction produces a **discrete dynamical system whose state space is one dimension smaller** than the original continuous system, which is a substantial simplification. Second, there is a practical catch: it is typically **impossible to find a formula for $P$** analytically. In legged locomotion this is not an obstacle, because we obtain $P$ numerically instead.

#### The return map and the choice of section

The **return map** is the particular kind of Poincaré map we use here. The methodology is:

> To analyse stability, look at a particular recurring **event**, and investigate **how repetitive it is** and **how it reacts after perturbations**.

For a hopping or running system, the natural choice of event, and hence of surface of section, is the **apex height**: the maxima of the height $y$, reached once per step at the top of each flight phase. The return map then investigates how this apex height changes from step to step, that is, it is the function

$$
y\_{i+1} = P(y\_i)
$$

mapping the apex height of one step to the apex height of the next.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot61.png' | relative_url }}"
    alt="Height trajectory over successive steps: a solid curve whose apex heights settle onto a constant value, and a dashed curve whose apex heights decay to zero as the model falls"
    style="width: 85%; max-width: 640px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 18: Apex height as the recurring event.</strong> The CoM height $y$ is sampled once per step, at each apex (red dots). <strong>Solid:</strong> stable running, the apex heights settle onto a constant steady-state value. <strong>Dashed:</strong> unstable motion, the apex heights decay step after step until the model falls over. Adapted from the Legged Robots course (EPFL).
  </figcaption>

</figure>

Sampling once per step is what makes the comparison meaningful. Within a single step the height varies continuously and tells us little; comparing the *same phase* of successive steps isolates whether the cycle is reproducing itself.

#### Conditions for a stable periodic gait

The system converges to stable hopping when **two conditions** are met.

**Condition 1: the solution is periodic.** There must exist a steady-state apex height $y^\*\_{APEX}$ that maps to itself:

$$
y\_{i+1} = y\_i = y^\*\_{APEX} .
$$

This is precisely the fixed-point condition $P(\mathbf{x}^\*) = \mathbf{x}^\*$ from the construction above, specialised to the apex-height section. It guarantees that a periodic gait *exists*, but says nothing about whether the system would return to it after a disturbance.

**Condition 2: deviations must diminish step by step.** The slope of the return map, evaluated at the fixed point, must have magnitude less than one:

$$
\left|\frac{dy\_{i+1}}{dy\_i}\right|\_{y^\*\_{APEX}} < 1 .
$$

The interpretation is direct. If the apex height is perturbed slightly away from $y^\*\_{APEX}$, the return map multiplies that deviation by approximately this slope at each subsequent step. A magnitude below one means successive deviations shrink geometrically and the gait recovers; a magnitude above one means they grow and the model falls, as in the dashed curve of Figure 18.

Both conditions are necessary: a periodic solution that fails Condition 2 exists mathematically but would never be observed, since any infinitesimal disturbance destroys it.

Finally, stability here is a matter of degree, not merely of yes or no:

> **The larger the basin of attraction, and the faster the convergence to steady state, the more stable the hopping is.**

The basin of attraction is the set of initial apex heights that eventually converge to $y^\*\_{APEX}$; a wide basin means the gait tolerates large disturbances. Convergence speed is governed by the slope magnitude, with smaller values giving faster recovery.

#### Application: the return map of the SLIP model

We can now make quantitative the "steps to fall" experiment of Section 8.2.2.3.

For the SLIP model, the return map $y\_{i+1}(y\_i)$ is a function defined for **a given set of open parameters** $(v\_0, \alpha\_0, k)$. It is **obtained numerically**, by integrating the differential equations of the SLIP model derived in Section 8.2.2.3 through one complete step, from one apex to the next. Once computed, it can be used to generate the entire series of apex heights from any initial condition $y\_0$.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot62.png' | relative_url }}"
    alt="Return map of the SLIP model: the curve crosses the diagonal at a fixed point, and a staircase construction from an initial apex height converges onto it"
    style="width: 55%; max-width: 400px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 19: Return map for the SLIP model.</strong> The red curve is $y\_{i+1}(y\_i)$, obtained by numerical integration; the dashed diagonal is the line $y\_{i+1} = y\_i$. Their intersection is the fixed point. Starting from the initial condition $y\_0$, the staircase construction (blue) reads off successive apex heights $y\_1, y\_2, y\_3, \dots$, which converge to $y\_\infty = y^\*\_{APEX}$. Both stability conditions are satisfied, so the fixed point is a <strong>stable attractor for the apex height</strong>. Adapted from the Legged Robots course (EPFL).
  </figcaption>

</figure>

The figure is read as follows. The intersection of the return-map curve with the diagonal $y\_{i+1} = y\_i$ locates the fixed point, satisfying Condition 1. The curve crosses the diagonal from above with a shallow slope, so the magnitude of $dy\_{i+1}/dy\_i$ there is below one, satisfying Condition 2. Consequently the staircase construction starting from an arbitrary $y\_0$ marches inward and converges to $y\_\infty$: the fixed point is a **stable attractor**, and the SLIP settles into steady hopping without any active control.

This is the analytical content behind the shaded region of Figure 8: for each $(k, \alpha\_0)$ pair in that plot, one may construct the corresponding return map and test the two conditions. The band of self-stable parameters is exactly the set for which both hold.

More broadly, return-map analysis is the standard tool for any strictly periodic, impact-driven legged system, including passive-dynamic walkers, and it reappears in 8.3 within the hybrid-zero-dynamics framework for underactuated bipeds.

---

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 6 (pen &amp; paper) : Reading a return map</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

Two candidate SLIP parameter sets both produce a periodic hopping solution, i.e. $y\_{i+1} = y\_i = y^\*\_{APEX}$ holds for both. Numerically evaluating the slope of the return map at that fixed point gives:

- Configuration A: $\left.\dfrac{dy\_{i+1}}{dy\_i}\right|\_{y^\*\_{APEX}} = 0.6$
- Configuration B: $\left.\dfrac{dy\_{i+1}}{dy\_i}\right|\_{y^\*\_{APEX}} = 1.3$

##### Question: Which configuration is self-stabilizing?

<label style="display: block;">
  <input type="radio" name="ex6-config" value="a"> Configuration A only
</label>
<label style="display: block;">
  <input type="radio" name="ex6-config" value="b"> Configuration B only
</label>
<label style="display: block;">
  <input type="radio" name="ex6-config" value="c"> Both
</label>
<label style="display: block;">
  <input type="radio" name="ex6-config" value="d"> Neither
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ex6-config',
    'a',
    'Correct! Both have a periodic solution, but only A has |slope| &lt; 1 (0.6 &lt; 1), so only A is self-stabilizing. B has |slope| &gt; 1: small deviations from y*_APEX would grow, not shrink.',
    'Incorrect. A periodic solution existing is not enough on its own, the slope magnitude at that fixed point must also be below 1 for small perturbations to shrink step to step.'
  )">
  Check answer
</button>

<p id="ex6-config-feedback"></p>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 3 : SLIP self-stability and return-map analysis</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: LIP vs. SLIP

What is the key structural difference between the LIP and the SLIP model?

<label style="display: block;">
  <input type="radio" name="mod3-slip-q1" value="a"> The LIP models walking with a constant-height rigid strut; the SLIP models running with a leg spring and does not fix the CoM height
</label>
<label style="display: block;">
  <input type="radio" name="mod3-slip-q1" value="b"> The LIP and SLIP are the same model with different names
</label>
<label style="display: block;">
  <input type="radio" name="mod3-slip-q1" value="c"> The SLIP is a linear model while the LIP is nonlinear
</label>
<label style="display: block;">
  <input type="radio" name="mod3-slip-q1" value="d"> The LIP has a flight phase, and the SLIP does not
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod3-slip-q1',
    'a',
    'Correct! The LIP fixes the CoM height with a mass-less telescopic strut; the SLIP uses a compliant leg-spring and lets the CoM height vary, which is what allows it to capture flight phases.',
    'Incorrect. It is the LIP that is the constant-height, linear model; the SLIP is the nonlinear leg-spring model, and it is the SLIP, not the LIP, that naturally has a flight phase.'
  )">
  Check answer
</button>

<p id="mod3-slip-q1-feedback"></p>

---

##### Question 2 (True/False): Self-stabilization is automatic

For any choice of leg stiffness $k$ and angle of attack $\alpha\_0$, the SLIP model produces self-stabilizing hopping.

<label style="display: block;">
  <input type="radio" name="mod3-slip-q2" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="mod3-slip-q2" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'mod3-slip-q2',
    'false',
    'Correct! Self-stabilization only occurs for specific (k, alpha0) combinations, as shown by the numerical stability region in Figure 8.',
    'Incorrect. Self-stabilization is not automatic: it only holds within a specific region of (k, alpha0) parameter space, found numerically via the return map.'
  )">
  Check answer
</button>

<p id="mod3-slip-q2-feedback"></p>

---

##### Question 3 (True/False): Return-map stability condition

For a periodic hopping motion analyzed with a return map $y\_{i+1}(y\_i)$, the motion is stable if the magnitude of the slope of the return map at the fixed point is **greater than** 1.

<label style="display: block;">
  <input type="radio" name="mod3-slip-q3" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="mod3-slip-q3" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'mod3-slip-q3',
    'false',
    'Correct! Stability requires the slope magnitude to be LESS than 1, so deviations shrink step to step. A slope magnitude greater than 1 means deviations grow, i.e. instability.',
    'Incorrect. It is the opposite: stability requires |dy_{i+1}/dy_i| &lt; 1 at the fixed point.'
  )">
  Check answer
</button>

<p id="mod3-slip-q3-feedback"></p>

</div>
</details>

---

## Locomotion performance metrics

Stability criteria establish *whether* a gait works. They say nothing about *how well* it works. This final section introduces two dimensionless metrics that make performance comparable across machines of different sizes, and between robots and animals.

Both are **dimensionless by construction**, which is the property that makes such comparisons legitimate: a quantity carrying units of joules or metres per second cannot meaningfully be compared between a 9 kg robot and a horse, whereas a pure number can.

### Cost of Transport

The **Cost of Transport (CoT)** is a dimensionless measure of the energy efficiency with which a system moves a given distance:

$$
\text{CoT} = \frac{E}{m g d},
\qquad\text{equivalently}\qquad
\text{CoT} = \frac{P}{m g v},
$$

where $E$ is the energy consumed (J), $P$ is power (W), $m$ is mass (kg), $g$ is gravitational acceleration (m/s²), $d$ is distance travelled (m) and $v$ is speed (m/s). The two forms are equivalent, the first being convenient when total energy over a trial is measured, the second when instantaneous power draw is logged.

The normalising quantity $mgd$ is the work required to lift the system's own weight through the distance travelled, so the CoT expresses energy expenditure as a multiple of that reference. **Lower values indicate greater efficiency.**

Some reference values, which are worth committing to memory as anchors:

| System | CoT |
|---|---|
| Cornell **Ranger** (most efficient legged robot to date) | $\approx 0.19$ |
| Human walking | $\approx 0.4$ |
| MIT Cheetah | $\approx 0.51$ |
| ASIMO | $\approx 2$ |
| BigDog | $\approx 15$ |

The spread across this table is nearly two orders of magnitude, and it is instructive. Ranger, a passive-dynamics-inspired walker, achieves a CoT *lower than human walking*, and famously covered a 65 km ultra-marathon on a single battery charge without human intervention (Bhounsule, Cortell & Ruina, 2012). Conventional actuated humanoids sit far higher, because energy is lost in non-backdrivable transmissions and cannot be recovered elastically, whereas compliant, spring-like legs return a large fraction of the energy stored at touch-down.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot50.png' | relative_url }}"
    alt="Log minimum cost of transport versus log body mass, comparing fliers, swimmers, runners and several robots"
    style="width: 75%; max-width: 620px; height: auto;">

  <figcaption style="max-width: 700px; margin: 0.5rem auto;">
    <strong>Figure 20: Cost of transport across animals and machines.</strong> Minimum cost of transport against body mass, both on logarithmic axes. For a given mass, terrestrial locomotion is systematically more costly than swimming or flying; the best legged robots are approaching, but generally remain above, animals of comparable mass. Adapted from Seok et al. (2013), via the Legged Robots course (EPFL).
  </figcaption>

</figure>

Two structural trends are visible in the figure. Within each mode of locomotion, CoT **decreases with body mass**, so larger systems are intrinsically more economical per unit weight. Across modes, **swimming is cheapest, flying intermediate, and terrestrial locomotion most expensive** at a given mass, reflecting the energy repeatedly spent accelerating and decelerating limbs and supporting the body against gravity.

### Froude number

The **Froude number** is a dimensionless measure of *speed*, which allows **dynamically similar gaits to be compared between small and large animals or robots**. A mouse and an elephant trot at very different absolute speeds; the Froude number identifies when they are nonetheless doing mechanically equivalent things.

It is derived from the inverted-pendulum picture of Section 8.2.2.1: modelling the stance leg as an inverted pendulum, the CoM traverses a circular arc centred at the foot, and the Froude number is the ratio of the centripetal force required for that arc to the weight of the system:

$$
\text{Fr} = \frac{\text{centripetal force}}{\text{gravitational force}}
= \frac{m v^2 / l}{m g}
= \frac{v^2}{g l},
$$

where $v$ is forward speed and $l$ is a characteristic length, typically the total leg length. Note that the mass cancels, as it did in the LIP derivation. Equivalently, using the stride frequency $f = v/l$:

$$
\text{Fr} = \frac{v^2}{g l} = \frac{(l f)^2}{g l} = \frac{l f^2}{g} .
$$

The interpretive rule of thumb is:

> $\text{Fr} < 1$ corresponds to **walking** gaits, and $\text{Fr} > 1$ to **running** gaits.

The reasoning behind the threshold is mechanical, not conventional. Vaulting over a straight stance leg requires a centripetal force directed toward the foot, and gravity is the only source of it. When $\text{Fr} > 1$ the required centripetal force exceeds what gravity can supply, so the CoM cannot follow the arc: contact is lost and a flight phase appears, which is the defining feature of running. Alexander (1984) uses this to compare gait transitions across a wide range of species, finding that animals of very different sizes switch gait near comparable Froude numbers.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 7 (pen &amp; paper) : Computing locomotion metrics</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1 (Numeric): Cost of Transport

A quadruped robot of mass $m = 45\text{ kg}$ travels $d = 500\text{ m}$ using $E = 30{,}000\text{ J}$ of energy. Take $g = 9.81\text{ m/s}^2$.

<p>
CoT (dimensionless, 3 decimals): <input type="text" id="ex7-cot" size="8">
</p>

##### Question 2 (Numeric + classification): Froude number

The same robot has leg length $l = 0.6\text{ m}$ and moves at $v = 1.8\text{ m/s}$.

<p>
Fr (dimensionless, 2 decimals): <input type="text" id="ex7-fr" size="8">
</p>

<label style="display: block;">
  <input type="radio" name="ex7-gaittype" value="walk"> This is more walk-like (Fr &lt; 1)
</label>
<label style="display: block;">
  <input type="radio" name="ex7-gaittype" value="run"> This is more run-like (Fr &gt; 1)
</label>

<br>

<button type="button" onclick="checkEx7()">Check answers</button>
<p id="ex7-feedback"></p>

<script>
function checkEx7() {
  const m = 45, d = 500, E = 30000, g = 9.81, l = 0.6, v = 1.8;
  const trueCot = E / (m * g * d);
  const trueFr = (v*v) / (g*l);
  const trueType = trueFr < 1 ? 'walk' : 'run';

  const uCot = parseFloat(document.getElementById('ex7-cot').value);
  const uFr = parseFloat(document.getElementById('ex7-fr').value);
  const okCot = approxEqual(uCot, trueCot, 0.01, 0.05);
  const okFr = approxEqual(uFr, trueFr, 0.02, 0.05);

  const typeChoice = document.querySelector('input[name="ex7-gaittype"]:checked');
  const okType = typeChoice && typeChoice.value === trueType;

  let msgs = [];
  msgs.push(okCot ? ("✅ CoT correct (≈ " + trueCot.toFixed(3) + ").") : ("❌ CoT off. Expected ≈ " + trueCot.toFixed(3) + "."));
  msgs.push(okFr ? ("✅ Fr correct (≈ " + trueFr.toFixed(2) + ").") : ("❌ Fr off. Expected ≈ " + trueFr.toFixed(2) + "."));
  msgs.push(okType ? "✅ Correct classification." : ("❌ With Fr ≈ " + trueFr.toFixed(2) + ", this is " + (trueType === 'walk' ? 'walk-like (Fr < 1).' : 'run-like (Fr > 1).')));

  const feedback = document.getElementById('ex7-feedback');
  feedback.innerHTML = msgs.join("<br>");
  feedback.style.color = (okCot && okFr && okType) ? "green" : "orange";
}
</script>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 4 : Locomotion metrics</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Interpreting Cost of Transport

A robot has a lower Cost of Transport than another robot of the same mass, traveling the same distance. What does this mean?

<label style="display: block;">
  <input type="radio" name="mod3-met-q1" value="a"> It used less energy to travel that distance, i.e. it is more energy-efficient
</label>
<label style="display: block;">
  <input type="radio" name="mod3-met-q1" value="b"> It moved faster
</label>
<label style="display: block;">
  <input type="radio" name="mod3-met-q1" value="c"> It is more statically stable
</label>
<label style="display: block;">
  <input type="radio" name="mod3-met-q1" value="d"> Its ZMP stayed closer to the center of its feet
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod3-met-q1',
    'a',
    'Correct! CoT = E / (mgd); for the same mass and distance, a lower CoT directly means less energy was consumed, i.e. better energetic efficiency.',
    'Incorrect. CoT measures energetic efficiency (energy per distance, normalized by weight), not speed, stability, or ZMP location.'
  )">
  Check answer
</button>

<p id="mod3-met-q1-feedback"></p>

---

##### Question 2 (True/False): Froude number and gait

A Froude number well above 1 is typically associated with walking gaits rather than running gaits.

<label style="display: block;">
  <input type="radio" name="mod3-met-q2" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="mod3-met-q2" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'mod3-met-q2',
    'false',
    'Correct! It is the opposite: Fr &gt; 1 is associated with running gaits (large centripetal forces, flight phases), while Fr &lt; 1 is associated with walking.',
    'Incorrect. Fr &lt; 1 is the walking regime; Fr &gt; 1 is the running regime, since running requires centripetal forces large enough to briefly lift the body off the ground.'
  )">
  Check answer
</button>

<p id="mod3-met-q2-feedback"></p>

</div>
</details>

---

## Credits

Figures 3–8 and 14–20 on this page are adapted from the **Legged Robots** course at EPFL, Lecture 2 ("Gaits, Models, Stability Criteria, and Locomotion Metrics") by **Pr. Auke Ijspeert**, with several figures within that lecture itself originally sourced from Holmes, Full, Koditschek & Guckenheimer (2006), Geyer et al. (2004), Seyfarth, Geyer, Günther & Blickhan (2002), Kajita & Tani (1991), Kajita et al. (2003), Kajita & Espiau (2008), Pratt, Carff, Drakunov & Goswami (2006), Strogatz (1994), and Seok et al. (2013), as credited individually in each figure caption. Figures 1, 2 and 9–13 (the inverted-pendulum and spring-mass pictures, the static stability margin, the Center of Pressure setup, the biped support polygon, the zero-moment illustration, and the CoM/ZMP animation) were created for this course; Figure 9 follows the definition of McGhee & Frank (1968). We thank Pr. Ijspeert for making this material available.

## Ressources

---

[Back to Top](#top)