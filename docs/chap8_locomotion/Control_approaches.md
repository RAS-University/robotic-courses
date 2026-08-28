---
title: 8.3 Overview of Control Approaches
parent: "Chapter 8: Locomotion"
has_children: false
nav_order: 3
layout: numbered
math: mathjax
chapter: 8
section: 3
publish: true
nav_exclude: true
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Overview of Control Approaches

<!-- bundle exec jekyll serve -->
<style>
/* Hide headings below level 2 from the table of contents */
#markdown-toc > li > ul > li > ul {
  display: none;
}

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
.family-banner {
  border-left: 5px solid #0075db;
  background-color: #f2f7fd;
  border-radius: 6px;
  padding: 0.9rem 1.1rem;
  margin: 1.5rem 0;
}
.family-banner.learning { border-left-color: #7c3aed; background-color: #f6f2fd; }
.family-banner.bio      { border-left-color: #059669; background-color: #eefaf5; }
.proscons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.25rem 0;
}
.proscons > div {
  flex: 1 1 280px;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 0.75rem 1rem;
}
.proscons .pros { background-color: #f2fbf5; border-color: #b7e4c7; }
.proscons .cons { background-color: #fff6f5; border-color: #f5c6c0; }
.proscons h5 { margin-top: 0.2rem; }
</style>
- Table of Contents
{:toc}

## Course overview

In 8.1 we described legs, gaits and the mechanics of locomotion. In 8.2 we turned "is the robot stable?" into computable criteria and built the two template models, the LIP and the SLIP, that most of legged robotics reasons with. Both pages were about understanding and describing locomotion.

This page is about producing it. The guiding question is:

> **How can a legged robot decide what motion to execute, and convert that decision into motor commands, while remaining stable, reactive, and robust?**

The single most important thing to take away is that there is no universal answer. Sixty years of legged robotics have produced not one solution but three broad families of solution, each with a different idea of where the intelligence of a walking machine should live:

1. **Model-based (and heuristics-based) approaches**, rooted in traditional control engineering. The designer writes down a model of the robot and derives a controller from it.
2. **Learning-based approaches**, rooted in machine learning. The designer specifies *what good locomotion is worth* and lets an optimisation process discover the controller.
3. **Bio-inspired approaches**, rooted in computational neuroscience and biomechanics. The designer reproduces organising principles observed in animals, and lets the body's own mechanics do part of the work.

Throughout the page, keep the differences between these three families in view: they disagree about how much must be known in advance, how much can be left to the machine, and what counts as a guarantee that the robot will not fall.

We proceed in four steps. First we establish the common control architecture that every method must fit into. Then we work through representative methods from each family in turn. Finally we compare their assumptions, strengths, limitations and typical applications, and look at how modern systems combine them.

### Where this page sits

Nothing in 8.2 is re-derived here. Instead, each result from 8.2 reappears in its role as a *control* tool, and the page links back rather than repeating:

| Concept from 8.2 | Its role there | Its role here |
|---|---|---|
| **LIP** (§ 8.2.2.2) | simplified model of walking | generator of reference CoM trajectories and footsteps |
| **SLIP** (§ 8.2.2.3) | simplified model of running | the intuition behind Raibert's foot-placement heuristics |
| **ZMP** (§ 8.2.3.2) | stability criterion | planning constraint and online stabilisation target |
| **Capture point / DCM** (§ 8.2.3.3) | where you *could* step to stop | where the controller *decides* to step |
| **Poincaré return map** (§ 8.2.3.4) | analysis of periodic gaits | proof of stability in Hybrid Zero Dynamics; limit cycles in CPGs |
| **Cost of Transport** (§ 8.2.4) | efficiency metric | the objective that passive walkers optimise by construction |

### A note on notation

This page uses fewer equations than 8.2, but the symbols that do appear are used consistently. Following the convention of 8.1, every quantity is given with its dimension and units.

<div class="notation-box" markdown="1">

- $\mathbf{q} \in \mathbb{R}^{n}$: vector of joint positions (rad), where $n \in \mathbb{N}$ is the number of actuated joints
- $\boldsymbol{\tau} \in \mathbb{R}^{n}$: vector of joint torques (N·m)
- $\mathbf{J}(\mathbf{q}) \in \mathbb{R}^{m \times n}$: the Jacobian mapping joint velocities to task-space velocities, with $m \in \mathbb{N}$ the task-space dimension (see 8.1, Module 1)
- $\mathbf{F} \in \mathbb{R}^{m}$: a task-space (Cartesian) force (N)
- $\mathbf{x} \in \mathbb{R}^{n\_x}$: the state of the robot in a control formulation; $\mathbf{u} \in \mathbb{R}^{n\_u}$: the control input
- $f: \mathbb{R}^{n\_x} \times \mathbb{R}^{n\_u} \to \mathbb{R}^{n\_x}$: the (discrete-time) model used for prediction
- $\mathbf{s}$: an observation (or state) in the reinforcement-learning sense; $\mathbf{a}$: an action; $r \in \mathbb{R}$: a scalar reward
- $\pi(\mathbf{a} \mid \mathbf{s})$: a control policy, i.e. a rule assigning actions to observations
- $N \in \mathbb{N}$: the prediction horizon, in number of discrete steps

Symbols already defined in 8.2, such as $z\_0$, $\omega$, $\xi$, $k$, $L\_0$ and $\alpha\_0$, keep exactly the meanings they had there.

</div>

---

## From sensing to motor commands: the locomotion control architecture

Before separating methods into families, we need the structure they all share. Almost every legged robot, whatever its control philosophy, organises computation as a hierarchy running from an abstract goal down to motor currents, with a parallel path running back up from the sensors.

Understanding this architecture is not optional background: it is the reference frame for the whole page. Every method in the rest of this page will be described as replacing, modifying, or reorganising specific blocks of this diagram, and this is the sharpest way to see what actually distinguishes them.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/control_architecture.png' | relative_url }}"
    alt="Block diagram of a legged-robot control architecture. User input feeds Navigation, which feeds Planning, then Tracking, then Joint Control, then motor currents to the robot. A return path runs from Proprioception and Exteroception into State estimation and into Localization and Mapping, which feed back up into Tracking, Planning and Navigation. Approximate loop rates are marked above the forward chain: 100 Hz at Planning, 1 kHz at Tracking and 10 kHz at Joint Control."
    style="width: 100%; max-width: 900px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 1: The typical control architecture of a legged robot.</strong>
    The upper chain carries commands from left to right, from an abstract user goal down to the motor currents that reach the robot. The lower chain carries information back: the robot's own sensors (<em>proprioception</em>) and its sensors of the world (<em>exteroception</em>) feed <em>state estimation</em> and <em>localization and mapping</em>, whose outputs return upward into tracking, planning and navigation. The rates written above the forward chain, 100 Hz at planning, 1 kHz at tracking and 10 kHz at joint control, show the ordering that matters: the further down the chain, the faster and the more local the computation. Every control method on this page can be described by which of these blocks it replaces or reorganises.
  </figcaption>

</figure>

### What each block does

**User command.** The highest-level input, and the only one that comes from outside the robot: a target to reach, or a desired speed and heading. It says *what* is wanted, never *how*.

**Navigation.** Turns the goal into a feasible route: choosing heading and speed, avoiding obstacles, deciding to go around a wall rather than through it. Navigation reasons about the robot as a point moving through an environment; it does not think about legs.

**Planning.** The first block that knows the robot has legs. It produces the *references* that the rest of the chain will realise: the desired centre-of-mass motion (often as a ZMP or DCM trajectory, § 8.2.3.2 and § 8.2.3.3), where each foot should land, and sometimes complete joint-angle trajectories. This is where the models of 8.2 do their work.

**Tracking (feedback control).** Given a plan, make the real robot follow it despite the fact that the robot is not exactly the model and the world is not exactly the map. Tracking compares the *estimated* state to the *planned* state and computes corrections. It also enforces constraints and provides reactive behaviour, so it is the block that absorbs a push.

**Joint control.** The lowest and fastest layer: given a desired joint position or torque, produce it. This includes local position/torque loops, current control, and often inverse dynamics to convert desired accelerations into torques.

**Proprioception.** The robot sensing *itself*: joint encoders, an inertial measurement unit (IMU), and contact or force sensors in the feet. Always available, high rate, low latency.

**Exteroception.** The robot sensing *the world*: cameras, lidar, depth sensors. Richer, but slower, noisier, and capable of failing outright in fog, darkness, or on featureless ground.

**State estimation.** Proprioception and exteroception do not directly measure what the controller needs. No sensor reports "the centre of mass is here, moving at this velocity". State estimation fuses the available measurements into the quantities the controller actually uses: body posture, orientation, CoM position and velocity, contact state. It is the quiet block on which everything else depends, and it is a common cause of failure in practice.

**Localization and mapping.** Where the robot is within a larger map, and what that map contains. Needed for navigation over long distances, and, as we will see in § 8.3.3.5, absolutely critical for planning individual footholds on rough terrain.

### Planning versus feedback control

The distinction between planning and tracking is worth making explicit, because it recurs in every family below.

- **Planning is feedforward.** It decides in advance what should happen, using a model. It can look ahead, consider constraints, and optimise. But it is blind to what actually happens.
- **Tracking is feedback.** It reacts to the difference between what was planned and what is measured. It cannot anticipate, but it corrects.

A purely feedforward controller falls over the first time reality disagrees with the model. A purely feedback controller has nothing to track and no way to anticipate a step. Real systems need both, and much of what distinguishes the methods below is how the labour is divided between them, and how often each is recomputed.

### The hierarchy of control rates

The frequency band in Figure 1 encodes something important. Each layer typically runs about an order of magnitude faster than the one above:

- **Planning:** on the order of $100\ \text{Hz}$. Deciding where to put a foot involves optimisation or search, which is expensive, but the physical quantity being decided (a footstep) changes only a few times per second.
- **Tracking:** on the order of $1\ \text{kHz}$. Rejecting disturbances requires reacting far faster than the disturbance itself.
- **Joint / motor control:** on the order of $10\ \text{kHz}$, the figure quoted in Figure 1. Current loops inside a motor driver are faster still.

> These numbers are illustrative, not universal constants. Different robots use very different rates, and some architectures deliberately collapse layers together. What matters is the *hierarchy*: the higher the level of abstraction, the slower the loop; the closer to the hardware, the faster.

The reason for the hierarchy is economic. Each layer is a trade between how much you can reason about and how fast you can do it. A whole-body optimisation over a two-second horizon cannot run at $5\ \text{kHz}$; a motor current loop cannot afford to think about footholds. Splitting the problem lets each layer run at the rate its own physics demands.

This also explains a recurring failure mode: if a layer is too slow for the disturbance it must reject, no amount of cleverness inside it will help. A perfect footstep plan computed at $5\ \text{Hz}$ is useless against a shove that knocks the robot over in $200\ \text{ms}$.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 1 (conceptual) : Reading the control architecture</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

For each task below, decide which block of Figure 1 is primarily responsible.

##### Question 1: Fusing IMU and encoder readings into a CoM velocity estimate

<label style="display: block;">
  <input type="radio" name="ca-arch-q1" value="a"> Navigation
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q1" value="b"> Planning
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q1" value="c"> State estimation
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q1" value="d"> Joint control
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-arch-q1',
    'c',
    'Correct! No sensor measures CoM velocity directly. State estimation fuses proprioceptive (and sometimes exteroceptive) measurements into the quantities the controller actually needs.',
    'Incorrect. The clue is that no single sensor reports this quantity: it must be reconstructed by fusing several, which is exactly what state estimation does.'
  )">
  Check answer
</button>

<p id="ca-arch-q1-feedback"></p>

---

##### Question 2: Deciding that the next foot should land on a particular flat rock rather than in the gap beside it

<label style="display: block;">
  <input type="radio" name="ca-arch-q2" value="a"> Planning
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q2" value="b"> Tracking
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q2" value="c"> Joint control
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q2" value="d"> Proprioception
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-arch-q2',
    'a',
    'Correct! Foothold selection is a planning decision: it produces a reference that the lower layers will then realise.',
    'Incorrect. Choosing *where* to put a foot produces a reference for the layers below, which is the definition of planning. Tracking only makes the robot follow a reference that already exists.'
  )">
  Check answer
</button>

<p id="ca-arch-q2-feedback"></p>

---

##### Question 3: A robot is shoved sideways and must react within about 100 ms. Which layer must do the reacting?

<label style="display: block;">
  <input type="radio" name="ca-arch-q3" value="a"> Navigation, because the route must change
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q3" value="b"> Tracking, because it runs fast enough to correct within that window
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q3" value="c"> Localization and mapping, because the robot has moved
</label>
<label style="display: block;">
  <input type="radio" name="ca-arch-q3" value="d"> The user command, because the goal must be updated
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-arch-q3',
    'b',
    'Correct! Disturbance rejection belongs to the fast feedback layer. At roughly 1 kHz, tracking gets about a hundred corrections inside a 100 ms window; navigation, at the top of the hierarchy, would barely get one.',
    'Incorrect. Think about the rate hierarchy: only a layer running much faster than the disturbance can reject it. Navigation and mapping are far too slow, and the user command is not a control loop at all.'
  )">
  Check answer
</button>

<p id="ca-arch-q3-feedback"></p>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 1 : Architecture, feedforward and feedback</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1 (True/False): Rate hierarchy

In a typical legged-robot architecture, the planning layer runs at a higher frequency than the joint-control layer.

<label style="display: block;">
  <input type="radio" name="ca-q1-rate" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-q1-rate" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-q1-rate',
    'false',
    'Correct! It is the opposite. Planning is the slowest layer (~100 Hz) because it reasons about the most, while joint control is the fastest (around 10 kHz) because it reasons about the least.',
    'Incorrect. The hierarchy runs the other way: the more abstract the decision, the slower the loop. Planning ~100 Hz, tracking ~1 kHz, joint control ~10 kHz.'
  )">
  Check answer
</button>

<p id="ca-q1-rate-feedback"></p>

---

##### Question 2: Proprioception vs exteroception

Which statement best captures the practical difference between them?

<label style="display: block;">
  <input type="radio" name="ca-q1-sens" value="a"> Proprioception senses the robot's own body and is fast and always available; exteroception senses the environment and is richer but slower and easier to lose
</label>
<label style="display: block;">
  <input type="radio" name="ca-q1-sens" value="b"> Proprioception is used only for navigation, exteroception only for joint control
</label>
<label style="display: block;">
  <input type="radio" name="ca-q1-sens" value="c"> They are two names for the same set of sensors
</label>
<label style="display: block;">
  <input type="radio" name="ca-q1-sens" value="d"> Exteroception is always more reliable than proprioception
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-q1-sens',
    'a',
    'Correct! This asymmetry matters later: controllers that depend heavily on exteroception (such as terrain planners) degrade badly when vision fails, whereas proprioception-only controllers keep working blind.',
    'Incorrect. Proprioception (encoders, IMU, contact sensors) reports the robot to itself and is fast and dependable; exteroception (camera, lidar) reports the world and is richer but slower and more fragile.'
  )">
  Check answer
</button>

<p id="ca-q1-sens-feedback"></p>

---

##### Question 3 (True/False): Feedforward alone

A controller consisting only of a carefully optimised feedforward plan, with no feedback, is sufficient for a real robot as long as the plan is computed from an accurate model.

<label style="display: block;">
  <input type="radio" name="ca-q1-ff" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-q1-ff" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-q1-ff',
    'false',
    'Correct! No model is exact and no environment is fully known. Without feedback, small errors accumulate with nothing to correct them, and any unmodelled disturbance is unopposed. Recall from 8.2 that the LIP is inherently unstable: its growing exponential must be actively contained.',
    'Incorrect. Models are always approximate and disturbances are never fully predictable, so an open-loop plan drifts and any push goes uncorrected. Feedback is what closes that gap.'
  )">
  Check answer
</button>

<p id="ca-q1-ff-feedback"></p>

</div>
</details>

---

## Model-based and heuristics-based approaches

<div class="family-banner" markdown="1">

**Family 1 of 3, model-based.** Strongly influenced by traditional control engineering. The designer writes down a mathematical description of the robot, and derives the controller from it.

</div>

Until roughly five years ago, this was the dominant family in legged robotics, and it remains the one with the strongest theoretical foundations. The defining principle is simple:

> A **model-based controller** uses an explicit or implicit representation of the robot and/or its interaction with the environment in order to plan motion or compute control actions.

The word "model" covers a wide range of commitments, and choosing where to sit on that range is the central design decision of this family:

- a purely kinematic model (geometry only, no forces), enough for Virtual Model Control;
- a simplified dynamic template such as the LIP (§ 8.2.2.2) or the SLIP (§ 8.2.2.3), a point mass and a massless leg, deliberately discarding most of the robot;
- a reduced-order model, keeping the centroidal dynamics (total momentum and its rate of change) but not every link;
- or the full robot dynamics: all links, all inertias, all contact constraints.

Many modern systems use two models at once, in different layers: a simple template for planning at $100\ \text{Hz}$, and a full dynamic model for tracking and inverse dynamics at $1\ \text{kHz}$. This is the rate hierarchy of Figure 1 expressed as a hierarchy of models, and it is not a coincidence: a model you can afford to solve quickly is a model you had to simplify.

#### Reduced-order versus full-order: an unavoidable trade-off

A useful way to hold the whole family together is to see every method below as a particular answer to one question: how much of the robot do I keep in the model ?

Keeping more gives accuracy, and costs computation and modelling effort. Keeping less gives speed and analytical insight, and costs fidelity. The LIP keeps a point mass and gets a closed-form solution. Full-body nonlinear MPC keeps everything and needs a solver and a powerful computer.

Crucially, the error you make by simplifying does not disappear; it reappears as a disturbance that feedback must absorb. When a LIP-based planner assumes a constant CoM height and the real robot's height varies, the difference shows up as a tracking error. This is why model-based controllers are always paired with feedback, and why "model mismatch" is the characteristic failure mode of the entire family.

#### The six methods we will cover

Following the lecture, we examine six representative approaches, in roughly historical order:

1. **Trajectory-based methods** using the ZMP
2. **Virtual Leg Control** (Raibert)
3. **Virtual Model Control** (Pratt and colleagues)
4. **Hybrid Zero Dynamics** control (Grizzle, Chevallereau and colleagues)
5. **Planning methods for complex terrain** (the LittleDog project)
6. **Model Predictive Control**

A caveat that the lecture makes explicitly, and that matters for how you classify what you read: some of these methods use a model implicitly rather than inside the control loop. Raibert's Virtual Leg Control is the clearest case. Its control laws were *designed* using SLIP-like reasoning, but no dynamic model is evaluated at run time. These are better called heuristics-based methods, model-*inspired* rather than model-*driven*.

---

### Trajectory-based control and the ZMP

The oldest systematic approach to biped walking, and the one that carried the first generation of humanoids.

#### The methodology

The classical recipe has four steps:

1. **Generate desired locomotion trajectories**: joint angles over time, and/or a CoM path. Historically these came from human motion capture, from educated guesses refined by trial and error, or from a simple model such as the LIP. Today they usually come from offline optimisation.
2. **Use a dynamic model to check or enforce stability**: verify that the resulting motion keeps the **Zero Moment Point** inside the support polygon at every instant, and modify the trajectory until it does.
3. **Track the planned joint trajectories** on the real robot, with stiff, high-gain joint control.
4. **Add online stabilisation** to reject the disturbances the offline plan could not anticipate.

#### The ZMP changes role

> In 8.2, the ZMP was a stability criterion: a quantity you compute to *diagnose* whether a motion is about to tip the robot. Here the very same quantity becomes a design tool: a constraint the planner must satisfy, and a target the stabiliser must steer.

Recall the rule from § 8.2.3.2: locomotion is dynamically stable, in the sense of not tipping, as long as the ZMP stays inside the support polygon over time. Turned around, this says that *any* trajectory whose ZMP stays inside the footprints is admissible. The planner's job becomes searching for trajectories with that property, and Kajita et al. (2003) showed how to do it efficiently by treating the desired ZMP as a reference signal and solving for the CoM motion that produces it.

Recall too the connection derived in § 8.2.2.2: substituting the LIP dynamics into the simplified ZMP formula gives $x\_{ZMP} = x\_{base}$ exactly. In the LIP, the ZMP sits precisely at the support point. This is why LIP-based planning and ZMP-based stability are two views of one idea, and why they are almost always used together.

#### Online stabilisation

Steps 1 and 2 are open-loop: they produce a plan, offline, that would work on a perfect robot in a perfect world. Step 4 closes the loop. While a foot is in contact, the Centre of Pressure can be measured directly from foot force sensors (§ 8.2.3.2), giving a real-time estimate of where the ground reaction actually acts. The controller then manipulates the ZMP back toward its planned position, typically using:

- the hip actuators, generating angular momentum about the CoM to shift the effective ground reaction, or
- the ankle actuators, redistributing pressure within the stance foot.

Note the physical limit here: the ankle strategy can only move the CoP *within the foot*, so its authority is bounded by foot size. This is one reason classical humanoids were built with large flat feet.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/zmp_architecture.png' | relative_url }}"
    alt="Control architecture with the planning and joint-control blocks highlighted for trajectory-based ZMP control, and the tracking, navigation, localization and exteroception blocks greyed out. A callout states that the planning is mainly open-loop with online stabilisation of the ZMP using hip or ankle actuators."
    style="width: 100%; max-width: 900px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 2: Where trajectory-based ZMP control does its work.</strong>
    The blocks in colour are the ones this method actually uses; the greyed blocks are present in the general architecture but play little part here. Planning carries the load, producing a ZMP motion and joint angles, and the callout records the essential point: the planning is largely open-loop, with online stabilisation of the ZMP added through the hip or ankle actuators. Compare the distribution of effort with Figures 5, 9 and 12.
  </figcaption>

</figure>

#### Why crouched walking appears

Early ZMP humanoids all walk with visibly bent knees, and this is not an aesthetic choice. It follows directly from the modelling assumptions, as anticipated in § 8.2.2.2.

The LIP requires the CoM to stay at a constant height $z\_0$. To hold a constant height while the leg sweeps through a range of angles, the leg must be able to change its effective length in *both* directions, lengthening and shortening. A fully extended knee has no shortening margin left, and worse, it sits at a kinematic singularity where the Jacobian loses rank and small Cartesian corrections demand enormous joint velocities.

Walking with permanently bent knees keeps the robot away from that singularity and leaves vertical travel available in both directions. The price is that the knee extensors must carry the body's weight continuously, without ever locking, which is mechanically expensive. This is a direct cause of the poor Cost of Transport of that robot generation, quantified in § 8.2.4: ASIMO sits at $\text{CoT} \approx 2$, against roughly $0.2$ for human walking.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/asimo_crouched_gait.png' | relative_url }}"
    alt="Photograph of Honda's early ASIMO humanoid robot mid-stride, showing permanently bent knees and a trunk held at an almost constant height, with a caption noting the crouched gait and the almost horizontal centre-of-mass path."
    style="width: 62%; max-width: 520px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 3: The crouched gait of an early ZMP humanoid.</strong>
    Honda's early ASIMO, walking. The knees never straighten, and the centre of mass travels almost horizontally, which is exactly what the LIP assumption of a constant height $z\_0$ demands. The posture is not a stylistic choice: it is what keeps the leg away from the fully extended singularity while leaving vertical travel available in both directions, and it is a direct cause of this robot generation's poor Cost of Transport.
  </figcaption>

</figure>

#### Discussion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **A well-defined methodology for proving dynamic balance.** You can state precisely what the controller guarantees, and check it before the robot moves. Very few approaches on this page can say that.
- **Well suited to expensive robots that must never fall.** Conservatism is a feature when a fall costs a research budget.
- **Predictable and repeatable.** The same command produces the same motion, which matters for deployment and for debugging.

</div>
<div class="cons" markdown="1">

##### Limitations

- **Requires accurate knowledge of the robot's dynamics and of the environment.** Both assumptions fail outdoors.
- **Fragile against unexpected events.** The plan was computed for a world without pushes, and recovery authority is limited to what the online stabiliser can do within the support polygon.
- **Designing good trajectories is time-consuming**, and historically involved heavy manual tuning.
- **Energetically inefficient**, requiring stiff actuation and, as explained above, usually crouched-knee walking.
- **Assumes flat feet and a non-degenerate support polygon.** As noted in § 8.2.3.2, the criterion becomes vacuous for point-footed robots, so this approach simply does not apply to most quadrupeds.

</div>
</div>

---

### Virtual Leg Control

An important historical and conceptual transition: the moment legged robotics stopped trying to *impose* a trajectory and started trying to *shape* a natural dynamic behaviour.

Developed by **Marc Raibert** and colleagues (Carnegie Mellon, then the MIT Leg Laboratory, later Boston Dynamics) for hopping and running machines, this approach produced the most impressive legged locomotion in the world for roughly two decades. It is closely related to the SLIP model of § 8.2.2.3.

#### Three nearly independent control loops

Raibert's central insight was that running, which looks impossibly complex, decomposes into three nearly decoupled regulators:

1. **Hopping control**: support the body with a vertical bouncing motion, regulating hopping height by adjusting the energy injected into the leg during stance, typically by extending the telescopic leg against the spring.
2. **Attitude control**: regulate the orientation of the body by applying hip torques during stance. This works only during stance: with the foot planted, torque at the hip reacts against the ground. During flight the same torque would merely spin the leg.
3. **Speed control**: regulate forward speed by choosing where to place the foot at touch-down, that is, by selecting the angle of attack during flight. Stepping further forward than the "neutral point" decelerates the robot; stepping short accelerates it.

Each loop has essentially one input and one output, and each can be tuned separately. This is why the approach is described as three *independent* loops, and why it was implementable on 1980s hardware.

#### The connection to SLIP

The link to § 8.2.2.3 is direct and worth stating precisely.

The SLIP model showed that a point mass bouncing on a leg-spring reproduces the mechanics of running and, crucially, that for suitable combinations of leg stiffness $k$ and angle of attack $\alpha\_0$ the resulting hopping is passively self-stable: apex-height perturbations die out over successive steps with no feedback at all.

But the same analysis showed that self-stability is not automatic. It exists only in a narrow band of the $(k, \alpha\_0)$ plane, and $\alpha\_0$ must be set accurately at every touch-down. On a real robot, resetting the leg to a precise angle in mid-air is an active control task.

That is exactly what Raibert's speed-control loop does. The SLIP tells you what the controller must achieve, namely place the leg at the right angle of attack; Raibert's heuristic tells you *how* to compute that angle online from the measured forward velocity. The model explains why the heuristic works; the heuristic is what actually runs.

#### One virtual leg for many real legs

The second major idea extends all of this beyond one-legged machines:

> **When two or more legs are coordinated to act in unison, they can be represented by a single functionally equivalent *virtual leg*, producing the same net force and moment as the group.**

A quadruped trotting moves its diagonal pairs together; each pair behaves as one virtual leg, and the robot becomes, for control purposes, a biped. A quadruped bounding moves front and hind pairs together, and becomes a virtual hopper. This is why Raibert's group could reuse essentially one control architecture across one-, two- and four-legged machines: the number of physical legs changed, but the number of *virtual* legs, and therefore the controller, did not.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/virtual_leg_1_2_4.png' | relative_url }}"
    alt="Line drawings showing quadruped support patterns for trot, pace and bound alongside their equivalent reduced representations, in which each coordinated pair of legs is drawn as a single virtual leg producing the same net force and moment."
    style="width: 62%; max-width: 470px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 4: One virtual leg standing in for a pair of real ones.</strong>
    Each row pairs a real machine with its virtual equivalent. A quadruped trotting moves its diagonal pairs together, so each pair reduces to one virtual leg and the robot becomes, for control purposes, a biped; pacing and bounding reduce the same way. The virtual leg exerts the same forces and moments on the body as the pair it replaces, which is why one control architecture transfers across morphologies.
  </figcaption>

</figure>

#### Is this really model-based?

It is important to classify this correctly, because the literature is loose about it.

> **No explicit dynamic model is evaluated inside Raibert's control loop.** The three regulators are hand-designed feedback laws with tuned gains. What the SLIP model provided was the *insight* that made those particular laws the right ones to write.

The honest description is therefore a heuristics-based method, strongly inspired by the SLIP model: model-informed rather than model-driven. The distinction matters practically. Because no model is inverted online, the method is robust to model error and cheap to compute; for exactly the same reason, it comes with no analytical proof of stability.

#### Watch it work

You met the MIT Leg Lab machines in 8.1, where the three control loops were first mentioned. It is worth watching the same footage again now that you know what each loop does.

This time, look for the three regulators separately: the steady bouncing rhythm that persists even as the robot manoeuvres (hopping control), the body staying level while the leg swings beneath it (attitude control), and the leg reaching further forward when the machine needs to slow down (speed control). Notice also the two- and four-legged machines behaving like the one-legged hopper, which is the virtual-leg idea made visible.

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/XFXj81mvInc"
    title="Robots from MIT's Leg Lab"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

*Source: Robots from MIT's Leg Lab ([youtube.com/watch?v=XFXj81mvInc](https://www.youtube.com/watch?v=XFXj81mvInc))*

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/virtual_leg_architecture.png' | relative_url }}"
    alt="Control architecture in which the planning and tracking blocks are greyed out and replaced by three boxes labelled hopping control, attitude control and speed control, feeding joint torques and telescopic leg force directly to the joint-control block."
    style="width: 100%; max-width: 900px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 5: Virtual Leg Control replaces planning and tracking with three loops.</strong>
    Compare with Figure 2. The planning and tracking blocks are greyed out entirely and three regulators sit in their place: hopping control adjusting height, attitude control adjusting body orientation, and speed control adjusting step location through the angle of attack. The upper callout records that these controllers produce torques and forces directly, with no desired trajectory to track, and the lower one that the loops are inspired by the SLIP model of § 8.2.2.3.
  </figcaption>

</figure>

#### Discussion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **The most impressive locomotion skills in the world for many years**, from the Leg Lab hoppers through to BigDog.
- **Simple to implement.** No complex models, no online optimisation, modest computation.
- **Robust to model error**, precisely because no model is inverted at run time.
- **Transfers across morphologies** through the virtual-leg abstraction.

</div>
<div class="cons" markdown="1">

##### Limitations

- **Needs very powerful actuators**, historically hydraulic, to inject and absorb energy fast enough.
- **No analytical proof of stability.** Behaviour is validated empirically, not guaranteed.
- **Applicable to hopping and running, not walking.** The framework assumes a bouncing, flight-phase gait; it has nothing to say about a slow walk with double support.
- **Tuning is per-robot** and relies on designer intuition.

</div>
</div>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 2 (conceptual) : Diagnosing a Raibert controller</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A one-legged hopping robot is running across a laboratory floor. Telemetry shows that its hopping height is correct and its body attitude is level and steady, but it is travelling faster than the commanded speed.

##### Question 1: Which of the three control loops should primarily be modified?

<label style="display: block;">
  <input type="radio" name="ca-raibert-q1" value="a"> The hopping-control loop, by injecting less energy during stance
</label>
<label style="display: block;">
  <input type="radio" name="ca-raibert-q1" value="b"> The attitude-control loop, by increasing the hip torque gain
</label>
<label style="display: block;">
  <input type="radio" name="ca-raibert-q1" value="c"> The speed-control loop, by adjusting the foot placement at touch-down
</label>
<label style="display: block;">
  <input type="radio" name="ca-raibert-q1" value="d"> All three simultaneously, since they are strongly coupled
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-raibert-q1',
    'c',
    'Correct! Speed is regulated by foot placement, i.e. by the angle of attack chosen during flight. This is exactly the decoupling that makes the architecture usable: height and attitude are already correct, so those two loops are doing their job and should be left alone.',
    'Incorrect. Recall the assignment of the three loops: height is set by the energy injected during stance, attitude by hip torque during stance, and speed by where the foot is placed at touch-down. Only the speed loop is misbehaving here.'
  )">
  Check answer
</button>

<p id="ca-raibert-q1-feedback"></p>

---

##### Question 2: To slow the robot down, where should the foot be placed relative to the neutral point?

<label style="display: block;">
  <input type="radio" name="ca-raibert-q2" value="a"> Further forward than the neutral point
</label>
<label style="display: block;">
  <input type="radio" name="ca-raibert-q2" value="b"> Exactly at the neutral point
</label>
<label style="display: block;">
  <input type="radio" name="ca-raibert-q2" value="c"> Behind the neutral point
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-raibert-q2',
    'a',
    'Correct! Placing the foot ahead of the neutral point makes the leg push backward against the motion during stance, decelerating the body. This is the same intuition as the capture point of section 8.2.3.3: stepping to or beyond the DCM removes forward momentum.',
    'Incorrect. Think about which way the leg force points. A foot planted ahead of the body produces a braking force; a foot planted behind produces a propulsive one.'
  )">
  Check answer
</button>

<p id="ca-raibert-q2-feedback"></p>

---

##### Question 3 (True/False): Classification

Because Raibert's controller was designed using SLIP-based reasoning, it must evaluate the SLIP equations of motion online at every control step.

<label style="display: block;">
  <input type="radio" name="ca-raibert-q3" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-raibert-q3" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-raibert-q3',
    'false',
    'Correct! No model is evaluated in the loop. The SLIP shaped the design of the three feedback laws, but what runs on the robot is a set of tuned heuristics. This is why the method is best called heuristics-based, or model-inspired, rather than model-based.',
    'Incorrect. The SLIP model informed the design of the control laws, but it does not appear inside the control loop. The running controller is a set of hand-designed, tuned feedback rules, which is why we classify it as heuristics-based.'
  )">
  Check answer
</button>

<p id="ca-raibert-q3-feedback"></p>

</div>
</details>

---

### Virtual Model Control

If trajectory-based control asks *"what path should the joints follow?"* and Raibert's method asks *"what simple rules reproduce running?"*, Virtual Model Control asks a third question, and it is the most intuitive of the three.

#### The core idea, before any mathematics

Imagine you could attach imaginary mechanical components to your robot: a spring pulling the hips up to a comfortable height, a damper resisting sideways sway, a walking frame preventing it from toppling, a piece of elastic pulling it gently forward. If those components were physically present, the robot would behave well without any clever control at all.

You cannot bolt them on. But you can do something equivalent:

> **Imagine attaching fictitious springs, dampers, supports or other mechanical elements to the robot. Then, instead of physically installing them, compute the motor torques that reproduce exactly the forces those virtual elements would generate.**

The robot cannot tell the difference. From its own point of view, it is being held up by a spring; from the outside, it is being driven by motors computing what a spring would have done. This is why the method is described as intuitive: the designer reasons about *mechanisms*, not about control laws.

The vocabulary from Pratt and colleagues at the MIT Leg Lab is memorable and worth learning, because it tells you at a glance what each element is for:

- a **virtual spring** connecting the body to a desired height, keeping the robot upright;
- a **virtual damper** removing unwanted oscillation;
- a **virtual "granny walker"**: an imaginary walking frame supporting the body, used for balance control;
- a **virtual "bunny"**: an imaginary carrot dangling ahead of the robot, pulling it horizontally and thereby setting its forward velocity.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/virtual_elements.png' | relative_url }}"
    alt="Two stick-figure illustrations. On the left a biped is supported by an imaginary wheeled walking frame with springs, labelled virtual granny walker for balance control. On the right a biped walks towards an imaginary rabbit held ahead of it, labelled virtual bunny for velocity control."
    style="width: 100%; max-width: 820px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 6: The two virtual elements that make up a walking controller.</strong>
    Left: a virtual granny walker, an imaginary wheeled frame supporting the body, used for balance control. Right: a virtual bunny, an imaginary lure ahead of the robot, used for velocity control. Neither exists physically. Each is simply a rule turning the measured state into a desired Cartesian force $\mathbf{F}$ (N), which the Jacobian transpose then converts into joint torques.
  </figcaption>

</figure>


Each of these is just a rule that turns the measured state into a desired Cartesian force. Combining several of them, and summing their forces, produces a complete walking controller.

#### From virtual force to joint torque

Now the mathematics, which is a single equation you have already met in 8.1.

Suppose a virtual element demands a Cartesian force $\mathbf{F}$ applied at some point on the robot (typically the hip or the body). The joint torques that reproduce that force are given by the transpose of the Jacobian:

$$
\boldsymbol{\tau} = \mathbf{J}^{T}(\mathbf{q})\,\mathbf{F} .
$$

Every symbol, with its dimension and units:

- $\boldsymbol{\tau} \in \mathbb{R}^{n}$: the vector of joint torques the motors must produce, in N·m, with $n \in \mathbb{N}$ the number of joints in the chain;
- $\mathbf{J}(\mathbf{q}) \in \mathbb{R}^{m \times n}$: the Jacobian evaluated at the current joint configuration $\mathbf{q} \in \mathbb{R}^{n}$ (rad). It relates joint velocities to the velocity of the point where the virtual element attaches, so its entries have units of metres per radian. Here $m \in \mathbb{N}$ is the dimension of the task space, e.g. $m = 2$ for a planar leg;
- $\mathbf{F} \in \mathbb{R}^{m}$: the desired virtual Cartesian force, in N.

This relation was derived in 8.1, Module 1 (from the principle of virtual work: the power delivered in joint space, $\boldsymbol{\tau}^{T}\dot{\mathbf{q}}$, must equal the power delivered in Cartesian space, $\mathbf{F}^{T}\mathbf{v}$, and substituting $\mathbf{v} = \mathbf{J}\dot{\mathbf{q}}$ gives the result). We do not re-derive it here; what matters is its new interpretation.

> **The Jacobian transpose is what makes Virtual Model Control possible.** It converts a force you *wish* existed into the torques that *create* it. The whole method is: design forces in the space where physical intuition lives (Cartesian), then push them through $\mathbf{J}^{T}$ into the space where motors live (joint).

Notice what is *not* needed. Computing $\mathbf{J}(\mathbf{q})$ requires only the geometry of the robot: link lengths and joint angles. No masses, no inertias, no dynamic model. A purely kinematic model suffices. This is unusual among model-based methods and is the source of most of the method's advantages.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/vmc_force_to_torque.png' | relative_url }}"
    alt="Diagram of a planar three-segment leg with a force vector F applied at the top of the thigh and three labelled joint torques, tau-h at the hip, tau-k at the knee and tau-a at the ankle, together with coordinate frames at each joint."
    style="width: 52%; max-width: 380px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 7: Mapping a virtual force onto real joint torques.</strong>
    A single-leg implementation. The desired virtual force $\mathbf{F}$ (N) is shown acting on the body at the top; the three torques $\tau\_h$, $\tau\_k$ and $\tau\_a$ (N·m) at hip, knee and ankle are what the motors must actually produce. The Jacobian transpose is the whole of the conversion between them, and Exercise 3 asks you to carry it out for a two-joint case.
  </figcaption>

</figure>

#### Task space versus joint space

Virtual Model Control is the clearest illustration of a distinction that recurs throughout modern control:

- **Joint-space control** specifies what each joint should do. Natural for the hardware, but unnatural for the task: "keep the body level" is not obviously a statement about knee angle.
- **Task-space (Cartesian) control** specifies what the *body or foot* should do, in the space where the task is defined. Natural for the designer, but it must be converted before it can be executed.

Trajectory-based ZMP control is essentially joint-space (it tracks planned joint angles). Virtual Model Control is essentially task-space. The Jacobian, and its transpose, are the bridge between them.

#### Phase-dependent activation

One practical detail keeps the method honest. Not every virtual element should be active at every moment of the gait cycle. A virtual spring pushing the body upward makes sense through a leg that is on the ground; applied through a leg in swing, it would merely fling the leg about, since a swing leg has nothing to push against.

Virtual Model Control therefore pairs the virtual elements with a finite state machine: a small set of if-then rules that cycles through the phases of the locomotor cycle (left stance, double support, right stance, and so on) and activates the appropriate elements and legs in each. This is a modest amount of hand-designed logic, and it is where most of the per-robot tuning goes.

#### Discussion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **An intuitive way of designing a controller.** The designer thinks in springs and dampers, not in transfer functions.
- **No dynamic model needed**: only a kinematic one. Masses and inertias, the hardest parameters to identify accurately, never enter.
- **Does not need an accurate model of the environment.** The virtual elements respond to the robot's own measured state.
- **Robust against perturbations.** A virtual spring resists a push automatically, because the force it commands grows with the displacement, exactly as a real spring would.
- **Naturally compliant**, which is safer around people and gentler on the hardware than stiff position tracking.

</div>
<div class="cons" markdown="1">

##### Limitations

- **The virtual forces must actually be achievable.** If the commanded $\mathbf{F}$ exceeds what the motors can deliver, or what friction at the contact can support without slipping, the "virtual mechanism" silently fails to materialise.
- **Near a kinematic singularity**, some Cartesian force directions cannot be produced at all, whatever torque is applied.
- **Choosing and tuning the elements is an art.** There is no systematic procedure telling you which virtual elements to use.
- **Difficult to extend to running gaits**, where flight phases mean there is nothing to push against for part of the cycle.
- **No formal stability guarantee** for the resulting closed-loop system.

</div>
</div>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 3 (pen &amp; paper) : Computing a Virtual Model Control torque</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A planar two-link leg is in a configuration where its Jacobian, relating the two joint velocities to the horizontal and vertical velocity of the hip, is

$$
\mathbf{J}(\mathbf{q}) =
\begin{bmatrix}
-0.30 & -0.10 \\
\;\;\,0.20 & \;\;\,0.15
\end{bmatrix} \ \text{m/rad}.
$$

The controller has decided that a virtual spring and a virtual "bunny" together demand the Cartesian force

$$
\mathbf{F} =
\begin{bmatrix}
20 \\
50
\end{bmatrix} \ \text{N},
$$

where the first component is horizontal (forward positive) and the second is vertical (upward positive).

##### Question 1 (Numeric): The joint torques

Compute $\boldsymbol{\tau} = \mathbf{J}^{T}(\mathbf{q})\,\mathbf{F}$. Remember to transpose $\mathbf{J}$ first: the columns of $\mathbf{J}$ become the rows of $\mathbf{J}^{T}$.

<p>
$\tau\_1$ (N·m, 2 decimals): <input type="text" id="ca-vmc-t1" size="8">
</p>
<p>
$\tau\_2$ (N·m, 2 decimals): <input type="text" id="ca-vmc-t2" size="8">
</p>

##### Question 2: Physical interpretation

What do these two numbers represent?

<label style="display: block;">
  <input type="radio" name="ca-vmc-interp" value="a"> The torques the motors must apply so that the leg exerts on the body exactly the force the imagined spring-and-bunny mechanism would have exerted
</label>
<label style="display: block;">
  <input type="radio" name="ca-vmc-interp" value="b"> The torques produced by gravity acting on the two links
</label>
<label style="display: block;">
  <input type="radio" name="ca-vmc-interp" value="c"> The joint accelerations required to follow a planned trajectory
</label>
<label style="display: block;">
  <input type="radio" name="ca-vmc-interp" value="d"> The ground reaction force decomposed along the two links
</label>

<br>

<button type="button" onclick="checkCaVMC()">Check answers</button>
<p id="ca-vmc-feedback"></p>

<script>
function checkCaVMC() {
  const J = [[-0.30, -0.10], [0.20, 0.15]];
  const F = [20, 50];
  // tau = J^T F  ->  tau_j = sum_i J[i][j] * F[i]
  const t1 = J[0][0]*F[0] + J[1][0]*F[1];
  const t2 = J[0][1]*F[0] + J[1][1]*F[1];

  const u1 = parseFloat(document.getElementById('ca-vmc-t1').value);
  const u2 = parseFloat(document.getElementById('ca-vmc-t2').value);
  const ok1 = approxEqual(u1, t1, 0.02, 0.02);
  const ok2 = approxEqual(u2, t2, 0.02, 0.02);

  const choice = document.querySelector('input[name="ca-vmc-interp"]:checked');
  const okI = choice && choice.value === 'a';

  let msgs = [];
  msgs.push(ok1 ? ("✅ τ₁ correct (= " + t1.toFixed(2) + " N·m).")
                : ("❌ τ₁ off. Expected " + t1.toFixed(2) + " N·m, from (-0.30)(20) + (0.20)(50)."));
  msgs.push(ok2 ? ("✅ τ₂ correct (= " + t2.toFixed(2) + " N·m).")
                : ("❌ τ₂ off. Expected " + t2.toFixed(2) + " N·m, from (-0.10)(20) + (0.15)(50)."));
  msgs.push(okI ? "✅ Correct interpretation: these torques make the real leg reproduce the imagined virtual force."
                : "❌ Not quite. JᵀF converts a *desired* Cartesian force into the joint torques that generate it; it has nothing to do with gravity, accelerations, or decomposing a measured contact force.");

  const fb = document.getElementById('ca-vmc-feedback');
  fb.innerHTML = msgs.join("<br>");
  fb.style.color = (ok1 && ok2 && okI) ? "green" : "orange";
}
</script>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

$\mathbf{J}^{T}$ is obtained by reflecting $\mathbf{J}$ about its diagonal, so

$$
\mathbf{J}^{T} =
\begin{bmatrix}
-0.30 & 0.20 \\
-0.10 & 0.15
\end{bmatrix}.
$$

Then $\tau\_1$ is the first row of $\mathbf{J}^{T}$ dotted with $\mathbf{F}$, and $\tau\_2$ is the second row dotted with $\mathbf{F}$. A useful sanity check: the units work out as $(\text{m/rad}) \times (\text{N}) = \text{N·m/rad}$, which is the torque per unit joint rotation, reported simply as N·m.

  </div>
</details>

</div>
</details>

---

### Hybrid Zero Dynamics

Of all the methods on this page, this one offers the strongest theoretical guarantees, and it does so by taking underactuation seriously rather than trying to engineer it away.

Developed by Grizzle, Chevallereau, Westervelt and colleagues for the **RABBIT** and **MABEL** robots, both of which share one deliberate design property: they have no feet.

#### Why no feet changes everything

Every method in § 8.3.3.1 rested on the support polygon. A flat foot gives the robot a patch of ground over which it can shift its centre of pressure, and the ZMP criterion is a statement about staying inside that patch.

Take the feet away and the support polygon collapses to a point. As noted in § 8.2.3.2, a region of zero area cannot contain anything, so the ZMP criterion becomes vacuous. There is no ankle torque, and no way to apply a stabilising moment about the contact.

Such a robot is **underactuated**: it has more degrees of freedom than actuators, and the unactuated one (the rotation of the whole body about the contact point) is precisely the one that determines whether it falls. You cannot command it directly. You can only influence it through how you move everything else.

This sounds like a disadvantage. In fact it is the honest situation for most dynamic legged robots, humans included during much of a stride, and HZD is the framework built to handle it.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/rabbit_robot.png' | relative_url }}"
    alt="Photograph of the RABBIT experimental biped robot: a planar five-link machine with two legs ending in point feet, no ankle joints, mounted on a circular guide."
    style="width: 34%; max-width: 250px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 8: RABBIT, a biped deliberately built without feet.</strong>
    The machine has five links, four actuators and point contacts with the ground. There is no ankle, so there is no support polygon and no ability to apply a stabilising moment about the contact. The rotation of the body about that contact point is unactuated, and it is precisely the coordinate that decides whether the robot falls, which is what makes this an underactuated control problem rather than a balancing one.
  </figcaption>

</figure>

#### Virtual constraints

The key device is the **virtual constraint**.

A physical constraint is imposed by hardware: a gear pair forcing two shafts to turn together. A virtual constraint imposes the same kind of relationship *in software*, through feedback: the controller drives the joints so that they behave as though they were mechanically linked.

Concretely, instead of specifying each joint as a function of *time*, HZD specifies each actuated joint as a function of a single scalar quantity that measures how far through the step the robot is: typically the angle of the stance leg relative to the ground, which advances monotonically through a step.

This distinction is the heart of the method, and it is worth pausing on:

> Trajectory-based control says: *"at $t = 0.4\ \text{s}$, the knee should be at $0.3\ \text{rad}$."*
> HZD says: *"whenever the robot is 40% of the way through its step, the knee should be at $0.3\ \text{rad}$."*

The second formulation contains no clock. If the robot is running slightly late because it was pushed, a time-indexed controller fights to catch up, which is exactly the wrong response. A phase-indexed controller simply continues from where the robot actually is. The gait becomes a *shape* in configuration space rather than a schedule, and the robot is free to traverse that shape faster or slower as the physics dictates.

#### The reduction, step by step

Once the virtual constraints are enforced by the feedback controller, all the actuated degrees of freedom are slaved to the phase variable. What remains free is only the underactuated dynamics, and, remarkably, that remainder is low-dimensional enough to analyse by hand.

The logical chain is:

```text
Full robot dynamics
        ↓   many degrees of freedom, hybrid (stance + impact)
Virtual constraints couple several DOFs
        ↓   actuated joints become functions of one phase variable
Reduced-order "zero dynamics"
        ↓   only the underactuated DOF remains free
Periodic orbit
        ↓   one closed trajectory repeated every step
Poincaré return map
        ↓   sample the orbit once per step
Stability analysis
```

The word hybrid in the name refers to the same structure identified for the SLIP in § 8.2.2.3: continuous dynamics during stance, punctuated by a discrete event, here the impact when the swing foot strikes the ground, which instantaneously changes the velocities. HZD accounts for this impact explicitly, which is why it applies to real walking rather than to a smooth idealisation.

#### The Poincaré map returns

This is where 8.2 pays off directly.

In § 8.2.3.4 we introduced the return map as a tool for *analysing* a periodic gait: sample the state once per cycle, find a fixed point $\mathbf{x}^{\*}$ with $P(\mathbf{x}^{\*}) = \mathbf{x}^{\*}$, and check whether nearby states converge to it. For the SLIP we sampled the apex height and required $\lvert dy\_{i+1}/dy\_i \rvert < 1$.

HZD uses exactly the same reasoning, with one crucial difference: because the virtual constraints have reduced the free dynamics to a single scalar, the return map is a one-dimensional map that can be constructed and analysed essentially analytically. For the full robot it would be a high-dimensional map obtainable only numerically. The reduction is what turns an intractable stability question into a tractable one.

The result is a genuine theorem rather than an empirical observation: existence and asymptotic stability of a walking or running gait can be established on the basis of a scalar Poincaré return map. Very little else in legged robotics offers this.

#### Watch it work

MABEL was, at the time, among the fastest and most convincingly dynamic bipeds in the world, and it walked and ran with no feet at all.

While watching, notice two things. First, the machine is genuinely falling forward and catching itself every step: there is no support polygon to stand on, so this is not a balancing act but a controlled sequence of catches. Second, watch the springs in the drivetrain: MABEL has deliberate series compliance in its legs, which stores and returns energy exactly as the SLIP model of § 8.2.2.3 describes.

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/xlOwk6_xpWo"
    title="Biped Robot MABEL Runs Free!"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

*Source: Michigan Robotics, Dynamic Legged Locomotion Lab, "Biped Robot MABEL Runs Free!" ([youtube.com/watch?v=xlOwk6_xpWo](https://www.youtube.com/watch?v=xlOwk6_xpWo))*

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/hzd_architecture.png' | relative_url }}"
    alt="Control architecture with the planning block highlighted and listing virtual constraints, a reduced model and a Poincare map, the tracking block greyed out, and a callout noting that the robot has no feet and generates so-called compass gaits."
    style="width: 100%; max-width: 900px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 9: Hybrid Zero Dynamics reorganises planning around virtual constraints.</strong>
    Planning no longer produces a time-indexed trajectory. It produces virtual constraints, a reduced model and a Poincaré map, used together to certify that a stable periodic gait exists, and the tracking block is greyed out because there is no separate trajectory to follow. The lower callout records the design property that makes this necessary: the robot has no feet, so the support polygon degenerates and the ZMP criterion of § 8.2.3.2 says nothing.
  </figcaption>

</figure>

#### Discussion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **The most complete theoretical foundation of any method here.** Existence and asymptotic stability of the gait can be *proved*, not merely observed.
- **Handles underactuation directly**, including robots with point feet, for which the ZMP criterion is meaningless.
- **Phase-indexed rather than time-indexed**, which removes an entire class of disturbance-response pathologies.
- **Produces genuinely dynamic, efficient gaits**, since it does not require the robot to remain quasi-statically balanced.

</div>
<div class="cons" markdown="1">

##### Limitations

- **Hard to apply to systems with many degrees of freedom.** Designing virtual constraints for a 5-link planar biped is tractable; for a 30-DOF humanoid in three dimensions it is much harder.
- **Highly dependent on good state estimation.** The phase variable must be measured accurately, because everything is indexed by it.
- **Gaits are designed offline** and are less easily reconfigured on the fly than an MPC formulation.
- **The guarantees are only as good as the model** used to construct the reduced dynamics.

</div>
</div>

---

### Planning methods for complex terrain

Everything so far assumed, implicitly, that the ground is there when the foot arrives. On flat ground that is safe. On a pile of broken rock it is not, and a new problem appears:

> The controller must decide not only how to move, but also where each foot should land.

This is a qualitatively different question. On flat ground, foot placement is a continuous quantity that can be nudged in any direction. On discontinuous terrain, it becomes a discrete choice among a finite set of viable footholds, most of the surface being unusable: too steep, too small, too loose, or simply not there.

#### The LittleDog project

The reference example is DARPA's Learning Locomotion programme (2005–2009), built around **LittleDog**, a small quadruped built by Boston Dynamics: roughly 3 kg, about 30 cm long, three actuated degrees of freedom per leg (twelve in total), point feet, force sensors in the feet and an IMU.

Identical robots were given to five competing US teams, who then competed on the *software*. This is an unusually clean experiment: with hardware held fixed, the differences in performance were attributable entirely to the control and planning approach. Most teams relied heavily on planning methods; several also used learning, particularly for foothold selection.

The central design commitment was to provide the controller with very accurate 3-D information about both the ground and the robot's absolute position and orientation, and then to plan carefully within that known world.

#### The pipeline

Locomotion over rough terrain decomposes into a chain of sub-problems, each of which must work for the next to be meaningful:

1. **Terrain perception.** Build a 3-D model of the ground. In the LittleDog experiments this came from an external motion-capture system and a pre-scanned terrain map, deliberately generous, in order to isolate the planning problem from the perception problem.
2. **Foothold selection.** Score candidate footholds on the terrain map (flatness, size, slope, distance from an edge, reachability from the current configuration), then choose a sequence of footholds for the coming steps.
3. **Robot state estimation.** Determine precisely where the robot is *relative to that map*. An excellent map is worthless if the robot does not know where it stands on it.
4. **Body trajectory generation.** Given a chosen foothold sequence, generate the body and swing-leg motions that reach each foothold while keeping the robot balanced over the ones already planted, typically using the static-stability margin of § 8.2.3.1 for a slow crawl.
5. **Tracking.** Execute the planned motion, with compliance in the legs to absorb the inevitable small errors when the foot meets the rock slightly earlier or later than expected.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/terrain_planning.png' | relative_url }}"
    alt="Flowchart of a quadruped terrain-planning system, grouped into four horizontal bands labelled offline, pre-processing once per trial, online once per footstep, and real-time at 100 hertz. Boxes run from expert foothold demonstration and terrain height map through foothold ranking, reward map generation, body path planning, footstep planning, pose finding, body and swing-leg trajectory generation, inverse kinematics and finally PD control with inverse dynamics."
    style="width: 100%; max-width: 820px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 10: A full terrain-planning pipeline, and the rates its stages run at.</strong>
    The bracketed labels on the left are the important part: the stages are separated by how often each can afford to run. Learning the foothold ranking function happens <em>offline</em>; building the terrain reward map happens <em>once per trial</em>; foothold selection, pose finding and body and swing-leg trajectory generation happen <em>once per footstep</em>; only inverse dynamics and force control run in real time. This is the rate hierarchy of Figure 1 applied to one concrete system.
  </figcaption>

</figure>

#### Why accurate maps and localization were so critical

Steps 2 and 4 are only as good as steps 1 and 3. Consider the arithmetic: if footholds are selected with centimetre precision but the robot's estimate of its own position drifts by several centimetres, the foot lands somewhere other than the rock that was chosen. The plan is not merely degraded, it is wrong, and the leg may come down on a gap.

This is why the early planning-based systems leaned on motion capture and pre-built maps. It also identifies their central weakness honestly:

> **It is not clear how gracefully performance degrades when the sensory input is worse.** A method that requires a near-perfect map has not been shown to work when the map is merely good.

This limitation drove much of what came later. Modern systems address it from both directions: by making perception robust enough to build usable maps online, and, as we will see in § 8.3.4, by training controllers that fall back on proprioception alone when vision becomes unreliable.

#### Discussion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **Handles very complex terrain requiring careful, deliberate footholds**: the regime where reactive methods simply fail.
- **The decision is explicit and inspectable.** You can ask the planner why it chose a foothold and get an answer, which matters enormously for debugging and for safety cases.
- **Naturally incorporates constraints**: reachability, collision, kinematic limits.

</div>
<div class="cons" markdown="1">

##### Limitations

- **Requires very accurate 3-D maps of the ground** and accurate localization within them.
- **Unclear degradation** with poorer sensory input, as discussed above.
- **Not well suited to biped locomotion**, except for slow, statically stable walking: a biped has too few contacts to remain statically balanced while deliberating.
- **Slow.** Careful search costs time, which caps locomotion speed.

</div>
</div>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 4 (conceptual) : Choosing a foothold</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A quadruped is crossing a rocky field. Its perception system reports four candidate footholds within reach of the swing leg:

| Candidate | Surface | Size | Slope | Distance from the leg's neutral position |
|---|---|---|---|---|
| **A** | flat, solid rock | 8 cm across | 3° | far, at the edge of the workspace |
| **B** | flat, solid rock | 7 cm across | 5° | close to neutral |
| **C** | flat, solid rock | 12 cm across | 32° | close to neutral |
| **D** | loose gravel | 20 cm across | 2° | close to neutral |

##### Question 1: Which candidate should the planner select?

<label style="display: block;">
  <input type="radio" name="ca-foot-q1" value="a"> A: solid and nearly level, so the slope and surface are ideal
</label>
<label style="display: block;">
  <input type="radio" name="ca-foot-q1" value="b"> B: solid, nearly level, and comfortably inside the leg's workspace
</label>
<label style="display: block;">
  <input type="radio" name="ca-foot-q1" value="c"> C: by far the largest solid surface, so the margin for placement error is greatest
</label>
<label style="display: block;">
  <input type="radio" name="ca-foot-q1" value="d"> D: the largest surface overall and almost perfectly level
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-foot-q1',
    'b',
    'Correct! B is the only candidate that satisfies every criterion at once. A is solid but sits at the edge of the workspace, leaving no room to correct if the body drifts. C is large but a 32° slope risks the foot sliding, since the required friction grows with slope. D is level and large but gravel cannot be relied on to carry a load without shifting.',
    'Incorrect. A good foothold must satisfy *all* the criteria simultaneously, not just one. Check each candidate against surface solidity, slope, size, and reachability; only one passes on every count.'
  )">
  Check answer
</button>

<p id="ca-foot-q1-feedback"></p>

---

##### Question 2: Why is choosing a foothold at the very edge of the leg's workspace risky?

<label style="display: block;">
  <input type="radio" name="ca-foot-q2" value="a"> Because there is no margin left to correct the placement if the body drifts, and the leg is near a kinematic singularity where it can exert little force in some directions
</label>
<label style="display: block;">
  <input type="radio" name="ca-foot-q2" value="b"> Because the foot would touch down more quietly
</label>
<label style="display: block;">
  <input type="radio" name="ca-foot-q2" value="c"> Because exteroceptive sensors cannot see that far
</label>
<label style="display: block;">
  <input type="radio" name="ca-foot-q2" value="d"> Because the ZMP would necessarily leave the support polygon
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-foot-q2',
    'a',
    'Correct! Two problems compound: the planner loses the ability to adjust the target if the body moves, and near a singularity the Jacobian loses rank, so the leg cannot generate force in certain directions, the same issue that forces crouched knees in section 8.3.3.1.',
    'Incorrect. The issue is mechanical, not sensory: at the workspace boundary there is no room left to correct the placement, and the leg approaches a kinematic singularity where its ability to produce force becomes directionally limited.'
  )">
  Check answer
</button>

<p id="ca-foot-q2-feedback"></p>

---

##### Question 3 (True/False): Dependence on localization

If the terrain map is perfectly accurate, the quality of the robot's own state estimate no longer matters for foothold planning.

<label style="display: block;">
  <input type="radio" name="ca-foot-q3" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-foot-q3" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-foot-q3',
    'false',
    'Correct! A foothold is a point *in the map*, but the leg is commanded *relative to the robot*. If the robot misjudges where it stands on the map by a few centimetres, it aims the foot at the wrong physical location, and on rocky ground, a few centimetres is the difference between rock and gap.',
    'Incorrect. The map and the state estimate are multiplied together, in effect: the foot is commanded relative to the robot, so an error in knowing where the robot is translates directly into an error in where the foot lands, however good the map.'
  )">
  Check answer
</button>

<p id="ca-foot-q3-feedback"></p>

</div>
</details>

---

### Model Predictive Control

The dominant model-based method of the last decade, and the one you are most likely to meet in current research.

#### The idea, intuitively

Every method so far commits to something in advance: a trajectory, a set of heuristic gains, a set of virtual constraints, a foothold sequence. MPC refuses to commit. Instead:

> **Predict several possible futures. Evaluate them against what you want. Choose the best sequence of control actions. Then execute only the first step of that plan, throw the rest away, and solve the whole problem again from the robot's new state.**

The last part is what makes it work, and it is the part beginners skip. It seems wasteful to compute a two-second plan and use only the first $20\ \text{ms}$ of it. But that is precisely where the feedback comes from. Because the problem is re-solved from the *measured* state at every step, any disturbance, model error, or surprise is automatically taken into account at the next solve. This is called a **receding** or **rolling horizon**, and it is what converts an open-loop optimisation into a closed-loop controller.

<figure style="margin: 1.5rem auto; text-align: center;">

<svg viewBox="0 0 840 300" width="100%" style="max-width: 820px; height: auto;" role="img"
     aria-label="Rolling-horizon diagram. Three stacked timelines show successive control steps. In each, a plan is computed over a horizon of N steps into the future, but only the first action of that plan is executed before the horizon slides forward and the problem is re-solved from the new measured state.">
  <defs>
    <marker id="ar6" markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 z" fill="#4b5563"/>
    </marker>
  </defs>

  <!-- time axis -->
  <line x1="60" y1="268" x2="800" y2="268" stroke="#4b5563" stroke-width="1.5" marker-end="url(#ar6)"/>
  <text x="805" y="272" font-size="12" fill="#4b5563">time</text>

  <!-- solve 1 -->
  <text x="52" y="52" font-size="12.5" fill="#1f2937" text-anchor="end">solve 1</text>
  <rect x="60" y="34" width="40" height="28" rx="4" fill="#2563eb"/>
  <rect x="100" y="34" width="280" height="28" rx="4" fill="#dbeafe" stroke="#93b8e8"/>
  <text x="240" y="53" font-size="12" fill="#1e3a8a" text-anchor="middle">predicted, then discarded</text>
  <text x="80" y="82" font-size="11" fill="#1e3a8a" text-anchor="middle">executed</text>

  <!-- solve 2 -->
  <text x="52" y="132" font-size="12.5" fill="#1f2937" text-anchor="end">solve 2</text>
  <rect x="100" y="114" width="40" height="28" rx="4" fill="#2563eb"/>
  <rect x="140" y="114" width="280" height="28" rx="4" fill="#dbeafe" stroke="#93b8e8"/>
  <text x="280" y="133" font-size="12" fill="#1e3a8a" text-anchor="middle">predicted, then discarded</text>

  <!-- solve 3 -->
  <text x="52" y="212" font-size="12.5" fill="#1f2937" text-anchor="end">solve 3</text>
  <rect x="140" y="194" width="40" height="28" rx="4" fill="#2563eb"/>
  <rect x="180" y="194" width="280" height="28" rx="4" fill="#dbeafe" stroke="#93b8e8"/>
  <text x="320" y="213" font-size="12" fill="#1e3a8a" text-anchor="middle">predicted, then discarded</text>

  <!-- horizon bracket -->
  <path d="M60,26 L60,16 L380,16 L380,26" stroke="#1e3a8a" fill="none"/>
  <text x="220" y="12" font-size="12" fill="#1e3a8a" text-anchor="middle">horizon of N steps</text>

  <!-- state re-measurement arrows -->
  <path d="M100,66 L100,110" stroke="#059669" fill="none" marker-end="url(#ar6)"/>
  <path d="M140,146 L140,190" stroke="#059669" fill="none" marker-end="url(#ar6)"/>
  <text x="470" y="120" font-size="12" fill="#059669">green: the state is re-measured before each new solve,</text>
  <text x="470" y="138" font-size="12" fill="#059669">which is where the feedback enters</text>

  <text x="420" y="248" font-size="12.5" fill="#1f2937" text-anchor="middle">Only the dark blue block is ever executed. Everything else is thrown away and recomputed.</text>
</svg>

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 11: The rolling horizon of Model Predictive Control.</strong>
    At each control instant the optimiser plans $N$ steps into the future (light blue), but only the first action (dark blue) is applied to the robot. The horizon then slides forward and the problem is solved again from the newly measured state. Discarding most of each plan is not waste: re-solving from the measured state is exactly what turns a sequence of open-loop optimisations into a feedback controller.
  </figcaption>

</figure>

#### The formulation

MPC needs a model that predicts the future. Written in discrete time,

$$
\mathbf{x}\_{k+1} = f(\mathbf{x}\_k, \mathbf{u}\_k),
$$

where

- $\mathbf{x}\_k \in \mathbb{R}^{n\_x}$ is the state at discrete time step $k \in \mathbb{N}$. For a legged robot this typically holds the body position and orientation, their velocities, and sometimes the foot positions;
- $\mathbf{u}\_k \in \mathbb{R}^{n\_u}$ is the control input applied at step $k$, commonly the ground reaction forces at the feet, or joint torques;
- $f: \mathbb{R}^{n\_x} \times \mathbb{R}^{n\_u} \to \mathbb{R}^{n\_x}$ is the model of the robot, which may be complete or simplified.

At each control instant the controller solves

$$
\min\_{\mathbf{u}\_0,\ \ldots,\ \mathbf{u}\_{N-1}} \ \sum\_{k=0}^{N-1} \ell(\mathbf{x}\_k, \mathbf{u}\_k)
$$

subject to

$$
\mathbf{x}\_{k+1} = f(\mathbf{x}\_k, \mathbf{u}\_k),
\qquad
\mathbf{x}\_0 = \mathbf{x}^{\text{meas}},
\qquad
\mathbf{u}\_k \in \mathcal{U}, \quad \mathbf{x}\_k \in \mathcal{X},
$$

where

- $N \in \mathbb{N}$ is the prediction horizon, in number of steps, typically a few tenths of a second up to a couple of seconds for legged robots;
- $\ell(\mathbf{x}, \mathbf{u}) \in \mathbb{R}$ is the stage cost, a scalar saying how undesirable it is to be in state $\mathbf{x}$ while applying input $\mathbf{u}$;
- $\mathbf{x}^{\text{meas}}$ is the currently measured state, supplied by state estimation. This is the single line that closes the loop;
- $\mathcal{U}$ and $\mathcal{X}$ are the sets of admissible inputs and states, encoding the constraints.

Reading this out loud: *"choose the sequence of actions that makes the total cost over the next $N$ steps as small as possible, while obeying physics and all constraints, starting from where I actually am right now."*

#### What goes into the cost, and what goes into the constraints

The distinction between the two is important, and it is where engineering judgement lives.

**Costs express preferences**: things you want, traded off against each other:

- tracking a desired body velocity (speed and heading);
- regulating body posture: keeping the trunk level and at a target height;
- minimising energy, or minimising the magnitude of the contact forces;
- keeping the feet near a nominal gait pattern;
- smoothness, i.e. penalising abrupt changes in the commanded forces.

**Constraints express requirements**: things that must hold, with no trade-off:

- **friction cone constraints**: a foot can only push, never pull, and the tangential force cannot exceed $\mu$ times the normal force, or the foot slips. This is the same unilateral-contact fact that in § 8.2.3.2 forced the CoP to stay inside the support polygon;
- actuator torque and velocity limits;
- **contact scheduling**: a leg in swing must produce zero force;
- kinematic limits and self-collision avoidance.

> This is one of the great practical strengths of MPC: constraints are stated directly and honestly, rather than being approximated by a hand-tuned penalty. The ZMP criterion of § 8.2.3.1 was, in effect, a single scalar proxy for "do not tip". MPC can instead impose the actual physical conditions on every contact force at every step of the horizon.

#### Convex MPC, and why it matters

Solving the optimisation above at $100\ \text{Hz}$ or faster is hard, because $f$ for a real legged robot is nonlinear and the contact state changes discontinuously.

The practical breakthrough behind much of modern quadruped control was to make the problem **convex**. Loosely, a convex optimisation problem is one with a single "bowl-shaped" landscape: it has one minimum, and reliable algorithms find it quickly and predictably, which matters as much as speed, since a real-time controller cannot afford a solver that occasionally takes ten times longer than usual.

Di Carlo et al. (2018) achieved this for the **MIT Cheetah 3** by simplifying deliberately: treat the robot as a single rigid body (all the leg mass lumped into the trunk), assume the contact schedule is decided in advance by a chosen gait, and take the ground reaction forces as the decision variables. Under these approximations the dynamics become linear and the friction cones are approximated by linear pyramids, so the whole problem becomes a convex quadratic program solvable in well under a millisecond.

The lesson generalises, and it is the same trade-off that runs through this whole family: the art is choosing which simplifications buy tractability without destroying the behaviour you need.

#### Watch it work

The Cheetah 3 video demonstrates what versatile whole-body optimisation buys you. The same controller, with different cost weights and gait schedules, produces trotting, bounding, jumping onto a desk, and blind stair climbing.

While watching, pay attention to the blind locomotion sequences in particular: the robot climbs stairs without vision, relying on proprioception and on the MPC's ability to react to unexpected early or late contact. Notice also how the robot absorbs a shove and continues: no recovery behaviour was scripted; it emerges from re-solving the optimisation from a disturbed state.

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/q6zxCvCxhic"
    title="Dynamic Locomotion in the MIT Cheetah 3 Through Convex Model Predictive Control"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

*Source: MIT Biomimetics Robotics Lab ([youtube.com/watch?v=q6zxCvCxhic](https://www.youtube.com/watch?v=q6zxCvCxhic))*

#### Discussion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **Generates a very large class of movements** from one framework: walking, trotting, bounding, jumping, recovery. Changing behaviour means changing costs, not rewriting the controller.
- **Versatile across task space and joint space**, which makes whole-body control natural.
- **Constraints are handled explicitly and correctly**, including friction and actuator limits.
- **Feedback is built in** through the receding horizon, giving strong disturbance rejection.
- **Anticipates.** Unlike a pure feedback law, MPC can plan for something it knows is coming.

</div>
<div class="cons" markdown="1">

##### Limitations

- **Requires an accurate dynamic model.** Model error degrades predictions, and the whole method is built on prediction.
- **Requires iterative tuning of costs and constraints.** Choosing the relative weights is an empirical process, rarely reported in full in papers.
- **Computationally heavy**, although convex formulations now run comfortably online.
- **Guarantees are weaker than they look.** Nominal MPC does not by itself prove closed-loop stability; establishing it requires extra machinery.

</div>
</div>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 5 (pen &amp; paper) : Comparing two candidate MPC actions</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

A quadruped's forward velocity $v\_k$ (m/s) is predicted with the simple discrete model

$$
v\_{k+1} = v\_k + 0.2\,u\_k ,
$$

where $u\_k \in \mathbb{R}$ is a dimensionless commanded push at step $k$. The robot is currently at $v\_0 = 0.6\ \text{m/s}$ and the desired velocity is $v^{\ast} = 1.0\ \text{m/s}$. The horizon is $N = 2$ steps, and the cost is

$$
J = \underbrace{\sum\_{k=1}^{2}\left(v\_k - v^{\ast}\right)^2}\_{\text{tracking}}
\; + \;
\rho \underbrace{\sum\_{k=0}^{1} u\_k^{2}}\_{\text{effort}} .
$$

Two candidate action sequences are on the table:

- **Candidate A** (aggressive): $u\_0 = 2$, $u\_1 = 0$
- **Candidate B** (gentle): $u\_0 = 1$, $u\_1 = 1$

##### Question 1 (Numeric): Total cost with a small effort weight, $\rho = 0.01$

Propagate the model to get $v\_1$ and $v\_2$ for each candidate, then evaluate $J$.

<p>
$J\_A$ (3 decimals): <input type="text" id="ca-mpc-ja" size="8">
&nbsp;&nbsp; $J\_B$ (3 decimals): <input type="text" id="ca-mpc-jb" size="8">
</p>

##### Question 2: Which candidate does the controller execute, and what does it actually apply?

<label style="display: block;">
  <input type="radio" name="ca-mpc-pick" value="a"> Candidate A, applying the whole sequence $u\_0 = 2$ then $u\_1 = 0$ before re-solving
</label>
<label style="display: block;">
  <input type="radio" name="ca-mpc-pick" value="b"> Candidate A, applying only $u\_0 = 2$ and then re-solving from the newly measured state
</label>
<label style="display: block;">
  <input type="radio" name="ca-mpc-pick" value="c"> Candidate B, applying only $u\_0 = 1$ and then re-solving from the newly measured state
</label>
<label style="display: block;">
  <input type="radio" name="ca-mpc-pick" value="d"> Neither; MPC averages the two candidate sequences
</label>

##### Question 3 (Numeric): Now make effort expensive, $\rho = 0.05$

Recompute both costs with the larger effort weight.

<p>
$J\_A$ (3 decimals): <input type="text" id="ca-mpc-ja2" size="8">
&nbsp;&nbsp; $J\_B$ (3 decimals): <input type="text" id="ca-mpc-jb2" size="8">
</p>

<br>

<button type="button" onclick="checkCaMPC()">Check answers</button>
<p id="ca-mpc-feedback"></p>

<script>
function checkCaMPC() {
  const v0 = 0.6, vstar = 1.0, dt = 0.2;
  function cost(us, rho) {
    let v = v0, track = 0, eff = 0;
    for (let k = 0; k < us.length; k++) {
      eff += us[k] * us[k];
      v = v + dt * us[k];
      track += (v - vstar) * (v - vstar);
    }
    return track + rho * eff;
  }
  const A = [2, 0], B = [1, 1];
  const jA1 = cost(A, 0.01), jB1 = cost(B, 0.01);
  const jA2 = cost(A, 0.05), jB2 = cost(B, 0.05);

  const uA1 = parseFloat(document.getElementById('ca-mpc-ja').value);
  const uB1 = parseFloat(document.getElementById('ca-mpc-jb').value);
  const uA2 = parseFloat(document.getElementById('ca-mpc-ja2').value);
  const uB2 = parseFloat(document.getElementById('ca-mpc-jb2').value);

  const okA1 = approxEqual(uA1, jA1, 0.002, 0.05);
  const okB1 = approxEqual(uB1, jB1, 0.002, 0.05);
  const okA2 = approxEqual(uA2, jA2, 0.002, 0.05);
  const okB2 = approxEqual(uB2, jB2, 0.002, 0.05);

  const pick = document.querySelector('input[name="ca-mpc-pick"]:checked');
  const okPick = pick && pick.value === 'b';

  let msgs = [];
  msgs.push((okA1 && okB1)
    ? ("✅ With ρ = 0.01: J_A = " + jA1.toFixed(3) + ", J_B = " + jB1.toFixed(3) + ", so A is cheaper.")
    : ("❌ ρ = 0.01 costs off. Expected J_A = " + jA1.toFixed(3) + " (v₁ = v₂ = 1.0, so tracking = 0, effort = 0.01·4) and J_B = " + jB1.toFixed(3) + " (v₁ = 0.8, v₂ = 1.0, so tracking = 0.04, effort = 0.01·2)."));
  msgs.push(okPick
    ? "✅ Correct: MPC picks the cheaper sequence but executes only its FIRST action, then re-solves from the new measured state. That re-solve is where the feedback comes from."
    : "❌ Not quite. MPC computes a whole sequence but applies only the first action, discarding the rest and re-optimising at the next step: the receding horizon of Figure 11.");
  msgs.push((okA2 && okB2)
    ? ("✅ With ρ = 0.05: J_A = " + jA2.toFixed(3) + ", J_B = " + jB2.toFixed(3) + ": the ranking has FLIPPED, and B now wins.")
    : ("❌ ρ = 0.05 costs off. Expected J_A = " + jA2.toFixed(3) + " and J_B = " + jB2.toFixed(3) + "."));

  const allOk = okA1 && okB1 && okA2 && okB2 && okPick;
  if (allOk) {
    msgs.push("<br><strong>The point of the exercise:</strong> nothing about the robot or the model changed between Questions 1 and 3, only a single cost weight. Yet the controller now prefers the opposite behaviour. This is why MPC cost tuning is listed as a genuine limitation: the weights <em>are</em> the design.");
  }

  const fb = document.getElementById('ca-mpc-feedback');
  fb.innerHTML = msgs.join("<br>");
  fb.style.color = allOk ? "green" : "orange";
}
</script>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

For Candidate A: $v\_1 = 0.6 + 0.2(2) = 1.0$, and $v\_2 = 1.0 + 0.2(0) = 1.0$. Both match $v^{\ast}$, so the tracking term is exactly zero and only the effort term survives.

For Candidate B: $v\_1 = 0.6 + 0.2(1) = 0.8$ and $v\_2 = 0.8 + 0.2(1) = 1.0$. The tracking term picks up $(0.8 - 1.0)^2$ from the first step, but the effort term is smaller because $1^2 + 1^2 < 2^2 + 0^2$.

  </div>
</details>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 2 : Synthesis of the model-based family</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Which method needs only a kinematic model?

<label style="display: block;">
  <input type="radio" name="ca-q2-kin" value="a"> Trajectory-based ZMP control
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-kin" value="b"> Virtual Model Control
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-kin" value="c"> Hybrid Zero Dynamics
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-kin" value="d"> Convex Model Predictive Control
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-q2-kin',
    'b',
    'Correct! Virtual Model Control needs only the Jacobian, which depends purely on link geometry and joint angles. No masses or inertias appear, which is precisely why it is robust to the parameters that are hardest to identify.',
    'Incorrect. The Jacobian transpose relation requires only geometry, so Virtual Model Control alone escapes the need for a dynamic model. The other three all predict or constrain forces and accelerations, which requires masses and inertias.'
  )">
  Check answer
</button>

<p id="ca-q2-kin-feedback"></p>

---

##### Question 2 (True/False): Point feet

The classical ZMP criterion provides a useful stability test for a quadruped that is trotting on point feet.

<label style="display: block;">
  <input type="radio" name="ca-q2-pt" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-pt" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-q2-pt',
    'false',
    'Correct! In a trot only two diagonal feet touch, and with point feet the support polygon degenerates to a line segment of zero area. A region with no area cannot contain the ZMP, so the criterion is vacuous, which is exactly why HZD and MPC exist for these robots.',
    'Incorrect. Recall section 8.2.3.2: with point feet in a two-leg stance the support polygon has zero area, so nothing can be inside it and the criterion says nothing at all.'
  )">
  Check answer
</button>

<p id="ca-q2-pt-feedback"></p>

---

##### Question 3: Why is only the first action of an MPC plan executed?

<label style="display: block;">
  <input type="radio" name="ca-q2-mpc" value="a"> Because re-solving from the newly measured state at every step is what turns the optimisation into a feedback controller
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-mpc" value="b"> Because the solver cannot compute more than one action at a time
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-mpc" value="c"> Because later actions in the sequence violate the constraints
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-mpc" value="d"> To save battery power
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-q2-mpc',
    'a',
    'Correct! Executing a full plan open-loop would ignore whatever actually happened. Discarding the tail and re-optimising from the measured state is the entire mechanism by which MPC rejects disturbances and model error.',
    'Incorrect. The solver does compute the whole sequence, and the later actions are feasible. They are discarded deliberately: re-solving from the measured state is what provides the feedback.'
  )">
  Check answer
</button>

<p id="ca-q2-mpc-feedback"></p>

---

##### Question 4: Which method offers an analytical proof of gait stability?

<label style="display: block;">
  <input type="radio" name="ca-q2-proof" value="a"> Virtual Leg Control, because the SLIP model is self-stable
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-proof" value="b"> Hybrid Zero Dynamics, via a scalar Poincaré return map
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-proof" value="c"> Virtual Model Control, via the Jacobian transpose
</label>
<label style="display: block;">
  <input type="radio" name="ca-q2-proof" value="d"> All model-based methods provide one by definition
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-q2-proof',
    'b',
    'Correct! Virtual constraints reduce the free dynamics to a single scalar, so the return map of section 8.2.3.4 becomes low-dimensional enough to analyse and the existence and asymptotic stability of the gait can genuinely be proved.',
    'Incorrect. Virtual Leg Control is explicitly noted as having no analytical stability proof, and being model-based does not by itself guarantee anything. Only HZD reduces the problem enough for a scalar Poincaré map to certify the gait.'
  )">
  Check answer
</button>

<p id="ca-q2-proof-feedback"></p>

</div>
</details>

---

## Learning-based approaches

<div class="family-banner learning" markdown="1">

**Family 2 of 3, learning-based.** Strongly influenced by machine learning. The designer specifies *what good locomotion is worth*, and an optimisation process discovers the controller from experience.

</div>

Every method in § 8.3.3 shares an assumption so basic it is easy to miss: that a human can write down the control law. Sometimes as a trajectory, sometimes as three heuristic loops, sometimes as virtual constraints, sometimes as a cost function and a model. But always, the *form* of the solution comes from a person.

Learning-based methods start from a different question:

> Instead of explicitly writing down the control law, can the robot learn a policy from experience?

The change is one of specification. You no longer say *how* to walk. You say *what walking well means*: move at the commanded velocity, stay upright, do not waste energy, do not thrash the joints, and let an optimisation process search over millions of possible controllers for one that scores well.

Driven by progress in machine learning, cheap parallel computation and fast simulators, this family has become the most active area of legged-robot control in the last few years.

#### The vocabulary, kept minimal

We introduce only as much reinforcement learning (RL) as locomotion requires.

- **Observation (or state) $\mathbf{s}$.** What the controller can see at this instant. For a legged robot this typically includes joint positions and velocities, body orientation and angular velocity from the IMU, the commanded velocity, the previous action, and often a short history of these. It may also include exteroceptive terrain information.
- **Action $\mathbf{a}$.** What the controller outputs. Most commonly desired joint positions, which are then handed to a fast low-level PD loop; sometimes joint torques directly.
- **Policy $\pi(\mathbf{a} \mid \mathbf{s})$.** The rule mapping observations to actions; this *is* the controller. In practice it is a neural network with a few hidden layers, whose weights are the thing being learned.
- **Reward $r \in \mathbb{R}$.** A scalar score, emitted at each time step, saying how good that step was. The learning process adjusts the policy to maximise the total reward accumulated over time.

<div class="notation-box" markdown="1">

**Reward and cost are two views of one idea.** Compare the RL objective with the MPC objective of § 8.3.3.6:

- MPC minimises a cost $\sum_k \ell(\mathbf{x}\_k, \mathbf{u}\_k)$ over a horizon of $N$ steps, using a model, online, right now.
- RL maximises a reward $\sum_k r(\mathbf{s}\_k, \mathbf{a}\_k)$ over long horizons, using sampled experience, offline, during training.

Maximising reward and minimising cost are the same operation up to a sign, which is why RL is often described as a generalisation of optimal control. The genuine differences are *when* the optimisation happens (once, in advance, versus continuously at run time) and *what it uses* (sampled experience versus an explicit model). Everything else in this section follows from those two differences.

</div>

#### Where the policy sits in the architecture

The structural consequence is dramatic. In the classical pipeline, planning produces a reference and tracking follows it. A learned policy typically replaces both:

```text
Sensors / observations
        ↓
Learned policy  π(a | s)
        ↓
Desired joint positions / torques
        ↓
Robot
        ↓
New observations   (loop closes)
```

There is no reference trajectory, because there is nothing to track. The policy maps state directly to action at every control step, at $50$–$200\ \text{Hz}$, and the loop closes through the physical world.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/rl_architecture.png' | relative_url }}"
    alt="Control architecture in which the planning block is greyed out and replaced by a control policy block marked as learned first in simulation then transferred to the real robot, feeding joint positions or torques directly to the joint-control block."
    style="width: 100%; max-width: 900px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 12: A learned policy collapses the middle of the pipeline.</strong>
    Compare with Figures 2 and 9. The planning block is greyed out and a single control policy stands in its place, learned first in simulation and then transferred to the real robot. The callout states the structural consequence directly: a policy implemented as a multi-layered neural network replaces both planning and tracking, so no reference trajectory is produced and nothing is tracked.
  </figcaption>

</figure>

---

### Reinforcement learning for locomotion

#### How training works, in outline

Learning proceeds by trial and error over episodes. An episode starts with the robot in some initial configuration and runs until it falls or a time limit expires. During the episode:

1. The policy observes $\mathbf{s}$ and emits an action $\mathbf{a}$.
2. The simulator advances the physics.
3. A reward $r$ is computed for that step.
4. Repeat until the episode terminates.

After many episodes, an optimisation algorithm adjusts the network weights in the direction that increases the accumulated reward. Repeat for hundreds of millions of steps.

**Exploration** is essential and easy to overlook: the policy must try actions it has not tried before, or it will never discover that a different gait scores better. Early in training this makes the robot fall constantly, which is exactly what should happen. The tension between exploring new behaviours and exploiting what already works is one of the central difficulties of RL.

#### Reward design is the real engineering

The reward function is where the designer's effort actually goes, and it is far more delicate than it sounds. A locomotion reward is typically a weighted sum of many terms:

- **positive** for tracking the commanded linear and angular velocity;
- **negative** for body orientation deviating from level, for excessive joint torques or velocities, for energy consumption, for jerky action changes, for undesired contacts such as a knee touching the ground;
- often a survival bonus for each step not spent fallen over.

Two well-known pitfalls:

- **Reward hacking.** The optimiser maximises exactly what you wrote, not what you meant. A reward for forward velocity with no orientation penalty may produce a robot that falls forward repeatedly and drags itself, because that genuinely does score well.
- **Weight sensitivity.** As Exercise 5 showed for MPC costs, the relative weights determine the behaviour. Getting them right is an iterative process that papers rarely describe in full, a real reproducibility problem in the field.

> Note the parallel with § 8.3.3.6. Designing an RL reward and tuning an MPC cost are the *same* engineering activity, done at different times. Neither family escapes the need to say precisely what good locomotion means.

---

### Hierarchical versus end-to-end policies

Not all learned controllers replace the same amount of the pipeline. Two architectures sit at opposite ends of a spectrum.

#### Hierarchical

```text
High-level policy   (learned, slow: ~5–10 Hz)
        ↓
motion objective / gait / footstep target
        ↓
low-level controller   (learned or model-based, fast: ~1 kHz)
        ↓
motors
```

The high-level policy makes abstract decisions (where to step, what velocity to adopt, which gait to use) while a separate low-level controller realises them. The low level may itself be a model-based controller such as MPC, which makes this a natural meeting point between the two families. Peng et al. (2017) and Jain et al. (2019) are representative.

#### End-to-end

```text
sensor observations
        ↓
neural network policy
        ↓
low-level motor commands
```

A single network maps raw observations to joint commands, with no hand-designed structure in between.

#### The trade-off

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Hierarchical: benefits and risks

**Benefits.** Each level can be trained, tested and replaced separately. The abstraction barrier makes behaviour easier to interpret and to constrain, since you can inspect the chosen footstep. Existing model-based components can be reused, and safety constraints can be enforced at the low level regardless of what the high level asks for. Training is usually faster, because the high-level search space is much smaller.

**Risks.** The hand-designed interface between levels is a *choice*, and it caps what can be expressed. If footstep targets are the interface, the system can never learn a behaviour that is not describable as a sequence of footsteps, such as deliberately using a knee or an elbow to catch a fall.

</div>
<div class="cons" markdown="1">

##### End-to-end: benefits and risks

**Benefits.** No artificial interface, so nothing is excluded a priori. The policy can discover coordination strategies a designer would not have thought to allow, and can exploit the full richness of the sensor stream, including correlations no human would identify.

**Risks.** Much harder to train, since the search space is vastly larger. Almost impossible to interpret: when it fails, there is no intermediate quantity to inspect. Safety constraints are difficult to impose, because there is no place to put them. And the resulting behaviour can be brittle in ways that are not visible until the failure happens.

</div>
</div>

In practice, the most successful recent systems sit between these extremes: a learned policy that outputs desired joint positions, tracked by a fixed, well-understood low-level PD controller. That is already a two-level hierarchy, and the retained low level is exactly the part that is cheap, reliable and easy to verify.

---

### Simulation and sim-to-real transfer

This is the practical core of learning-based locomotion, and the part that determines whether a method works on hardware or only in a paper.

#### Why train in simulation

Reinforcement learning for locomotion typically needs hundreds of millions to billions of time steps. On a real robot at $200\ \text{Hz}$, a billion steps would take over 150 years of continuous operation. That alone settles the question, but there are four independent reasons:

- **Sample volume.** Simulators can be stepped much faster than real time.
- **Falling is free.** Early training consists almost entirely of falling over. On hardware this destroys gearboxes; in simulation it costs nothing.
- **Parallelism.** Thousands of simulated robots can be run simultaneously on a single GPU, on thousands of different terrains at once.
- **Perfect state and resets.** The simulator knows the true state exactly, and can reset instantly to any configuration.

Some groups do train directly on hardware, with careful safety measures and much greater sample efficiency, but the majority train in simulation and then face the central problem.

#### The reality gap

> **The reality gap** is the discrepancy between the simulated robot and the physical one. A policy optimised against a simulator learns to exploit *that simulator*, including its inaccuracies. Transferred to hardware, it can fail immediately.

The gap has identifiable sources: contact and friction models are approximations; actuators have dynamics, delays, temperature-dependent behaviour and torque saturation that idealised models ignore; real sensors are noisy and biased; and the communication chain introduces latency that simulation often omits.

The characteristic symptom is a policy that looks superb in simulation and produces a violently vibrating robot on hardware, because it learned a high-frequency strategy that the simulated actuators could follow and the real ones cannot.

#### Techniques for closing the gap

**Domain randomisation.** Rather than trying to build one perfect simulator, randomise its parameters across episodes and force the policy to work for *all* of them. If the policy must succeed across a wide range of frictions, masses and delays, the real robot is likely to fall somewhere inside that range. Common axes:

- **dynamics randomisation**: link masses and inertias, centre-of-mass offsets, joint friction and damping;
- **terrain randomisation**: slopes, stairs, gaps, steps, soft or slippery ground, procedurally generated;
- **sensor noise**: added noise, bias and drift on IMU and encoder readings;
- **latency**: randomised delays between observation, action and execution;
- **external disturbances**: random pushes applied during training, so recovery is learned rather than hoped for.

There is a real cost: randomising too aggressively yields a conservative policy that is robust but mediocre everywhere, because it has been asked to handle worlds that do not exist.

**Actuator modelling.** Rather than randomising around a poor actuator model, *learn a good one*. This is the key idea of the ANYmal work below.

#### The ANYmal pipeline

Hwangbo et al. (2019) demonstrated agile, dynamic skills on the **ANYmal** quadruped, and the result is worth studying because it is a careful combination of four ingredients rather than a single trick:

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/anymal_pipeline.png' | relative_url }}"
    alt="Circular four-stage diagram. Stage one, stochastic rigid body modelling from the real robot. Stage two, training an actuator network on real measured data. Stage three, reinforcement learning in simulation producing a policy network. Stage four, deploying the policy on the real system. Red labels mark the good simulator, the supervised learning of actuator dynamics, the reinforcement learning in simulation, and the sim-to-real transfer."
    style="width: 100%; max-width: 860px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 13: The four-step ANYmal learning pipeline.</strong>
    Read the numbered stages clockwise. (1) The physical parameters of the robot are identified for a rigid-body simulator. (2) An actuator network is trained by <em>supervised</em> learning on real measured torque data, which is the decisive step: the series-elastic actuators were the dominant source of the reality gap, so that is where the modelling effort was spent. (3) A control policy is trained by reinforcement learning inside the resulting hybrid simulator. (4) The trained policy is deployed directly on the real system.
  </figcaption>

</figure>

The four ingredients, and why each is needed:

1. **A good, fast simulator** for rigid-body dynamics and contact.
2. **Supervised learning of the actuator dynamics.** ANYmal uses series-elastic actuators whose behaviour (friction, elasticity, the internal controller) is hard to model analytically. So instead of modelling it, they *measured* it and fitted a small neural network mapping commanded position history to produced torque. This is the crucial insight: the actuator was the dominant source of the reality gap, so that is where the modelling effort was spent.
3. **Reinforcement learning in simulation**, using the hybrid simulator.
4. **Sim-to-real transfer** of the trained policy to the physical robot.

The results included running faster than previously achieved on that platform and, most memorably, recovering autonomously from arbitrary fallen configurations, a behaviour that would be extremely laborious to hand-design because it involves complex, unplanned contacts all over the body.

While watching, focus on the recovery-from-falling sequences. Notice that the robot uses whatever contacts help, including its shins and the sides of its body. No engineer specified those contacts; they emerged from the optimisation because they scored well. That is precisely the strength of this family, and, since nobody can say in advance what else the policy might do, precisely its risk.

<div style="text-align: center; margin: 1.5rem auto;">

  <iframe
    width="720"
    height="405"
    src="https://www.youtube.com/embed/aTDkYFZFWug"
    title="Learning Agile and Dynamic Motor Skills for Legged Robots"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

</div>

*Source: Robotic Systems Lab, ETH Zürich ([youtube.com/watch?v=aTDkYFZFWug](https://www.youtube.com/watch?v=aTDkYFZFWug)). The paper's supplementary movies are available with the article at [science.org/doi/10.1126/scirobotics.aau5872](https://www.science.org/doi/10.1126/scirobotics.aau5872).*

---

### Strengths and limitations of learning-based locomotion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Strengths

- **Generic design methodology.** Less per-robot control expertise is needed: much of the work moves from deriving controllers to specifying rewards and training environments.
- **Can exceed hand-designed controllers.** On several platforms, learned policies outperform the best model-based controllers previously available.
- **Generates behaviours that are difficult or impossible to hand-design**, such as recovery from arbitrary fallen postures.
- **Adaptability.** A policy trained across randomised terrain and dynamics can handle conditions never explicitly programmed.
- **Discovers unexpected strategies**, sometimes revealing solutions designers had not considered.
- **Cheap at run time.** Evaluating a small network is trivial compared with solving an optimisation problem, so the expensive part happens once, before deployment.

</div>
<div class="cons" markdown="1">

##### Limitations

- **Very long training**, needing substantial computation.
- **Reward design is difficult** and requires real expertise. The iterative process behind a published reward function is often not reported.
- **Strong reliance on simulation**, and therefore on sim-to-real transfer succeeding.
- **The reality gap** remains a fundamental obstacle.
- **Black-box controller.** The policy is a network of weights; there is no equation to inspect.
- **No proof of stability or performance.** Nothing corresponds to the HZD guarantee of § 8.3.3.4.
- **Failures are hard to diagnose.** When a model-based controller fails you can examine the model, the plan and the tracking error. When a policy fails, there is no intermediate quantity to look at, and it is often unclear whether the cause was the reward, the training distribution, the network, or the reality gap.

</div>
</div>

> **Learning is not simply superior to model-based control.** It trades formal guarantees and interpretability for flexibility and raw performance. Which trade is right depends entirely on the application: an expensive humanoid working near people, and a research quadruped exploring a forest, have very different tolerances for "we cannot prove it will not fall". Section 8.3.6 returns to how modern systems increasingly refuse to choose, and combine the two.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 6 (conceptual) : State, action, or reward?</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

An engineer is setting up reinforcement learning for a quadruped. Classify each of the following quantities.

##### Question 1: The measured body orientation reported by the IMU

<label style="display: block;">
  <input type="radio" name="ca-rl-q1" value="s"> Part of the observation $\mathbf{s}$
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q1" value="a"> Part of the action $\mathbf{a}$
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q1" value="r"> Part of the reward $r$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-rl-q1',
    's',
    'Correct! A measurement that the policy reads in order to decide belongs to the observation.',
    'Incorrect. This is something the policy *reads*, not something it outputs or is scored on, so it belongs to the observation.'
  )">
  Check answer
</button>

<p id="ca-rl-q1-feedback"></p>

---

##### Question 2: A penalty of $-0.5$ applied whenever the trunk tilts more than 20° from level

<label style="display: block;">
  <input type="radio" name="ca-rl-q2" value="s"> Part of the observation $\mathbf{s}$
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q2" value="a"> Part of the action $\mathbf{a}$
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q2" value="r"> Part of the reward $r$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-rl-q2',
    'r',
    'Correct! A scalar penalty scoring how good a step was is a reward term. Note that the same physical quantity, trunk orientation, appears in both the observation and the reward, playing completely different roles: the policy reads it to decide, and the reward uses it to judge.',
    'Incorrect. A numerical penalty expressing that something is undesirable is a reward term. Be careful: trunk orientation appears in the observation too, but there it is information to act on, not a score.'
  )">
  Check answer
</button>

<p id="ca-rl-q2-feedback"></p>

---

##### Question 3: The twelve desired joint positions sent to the low-level PD controller

<label style="display: block;">
  <input type="radio" name="ca-rl-q3" value="s"> Part of the observation $\mathbf{s}$
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q3" value="a"> Part of the action $\mathbf{a}$
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q3" value="r"> Part of the reward $r$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-rl-q3',
    'a',
    'Correct! This is the policy&apos;s output, and therefore the action. Note that many implementations then feed the previous action back in as part of the next observation, which is legitimate and helps the policy produce smooth motion.',
    'Incorrect. This is what the policy *outputs*, which is the definition of the action. Desired joint positions are the most common action space for learned locomotion.'
  )">
  Check answer
</button>

<p id="ca-rl-q3-feedback"></p>

---

##### Question 4: Reward hacking

A team rewards only forward velocity, with no other term. The trained policy makes the robot lunge forward, fall onto its chest, and drag itself along the floor, and it scores well. What is the correct diagnosis?

<label style="display: block;">
  <input type="radio" name="ca-rl-q4" value="a"> The optimiser failed and must be replaced
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q4" value="b"> The optimiser succeeded; the reward function did not express what the designers actually wanted
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q4" value="c"> The simulator is inaccurate and needs domain randomisation
</label>
<label style="display: block;">
  <input type="radio" name="ca-rl-q4" value="d"> The network is too small
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-rl-q4',
    'b',
    'Correct! This is reward hacking. The policy maximised exactly what was written. The fix is in the specification (add penalties for body contact and for trunk orientation), not in the algorithm. This is the learning-based counterpart of tuning an MPC cost, as in Exercise 5.',
    'Incorrect. The optimiser did its job perfectly: dragging really does maximise forward velocity. The error is in the reward specification, which failed to say that staying upright matters.'
  )">
  Check answer
</button>

<p id="ca-rl-q4-feedback"></p>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 3 : Simulation, transfer and the reality gap</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1 (True/False): Training on hardware

Because the reality gap is the main obstacle in learning-based locomotion, the obvious remedy is simply to train the policy directly on the real robot in all cases.

<label style="display: block;">
  <input type="radio" name="ca-q3-hw" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-hw" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-q3-hw',
    'false',
    'Correct! Typical training needs hundreds of millions of steps, which at a few hundred hertz would take decades on hardware, and early training consists mostly of falling, which destroys the robot. Some groups do train on hardware with much greater sample efficiency, but it is not a general remedy.',
    'Incorrect. The sample requirement makes this impractical: a billion steps at 200 Hz is over 150 years of real operation, and the robot would be destroyed by the falls long before that.'
  )">
  Check answer
</button>

<p id="ca-q3-hw-feedback"></p>

---

##### Question 2: The ANYmal actuator network

Why did Hwangbo et al. train a neural network to model the actuators, instead of just randomising the actuator parameters?

<label style="display: block;">
  <input type="radio" name="ca-q3-act" value="a"> Because the series-elastic actuator behaviour was the dominant source of the reality gap and was too complex to model analytically, so it was measured and learned instead
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-act" value="b"> Because neural networks are faster to evaluate than any analytical formula
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-act" value="c"> Because it removed the need for a rigid-body simulator
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-act" value="d"> Because it eliminated the need for a reward function
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-q3-act',
    'a',
    'Correct! The modelling effort was spent precisely where the gap was largest. Randomisation makes a policy robust to uncertainty; an accurate learned model removes the uncertainty in the first place, which is better when you can afford to measure it.',
    'Incorrect. The actuator network was a targeted fix for the biggest source of mismatch. The rigid-body simulator was still required, and both the reward function and the RL training remained entirely necessary.'
  )">
  Check answer
</button>

<p id="ca-q3-act-feedback"></p>

---

##### Question 3 (True/False): The cost of randomisation

Domain randomisation is free: randomising more parameters over wider ranges always produces a better policy.

<label style="display: block;">
  <input type="radio" name="ca-q3-dr" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-dr" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-q3-dr',
    'false',
    'Correct! Asking one policy to succeed across an enormous range of worlds forces it to be conservative, and it ends up mediocre in every one of them, including the real one. Randomisation ranges must be wide enough to contain reality but no wider.',
    'Incorrect. There is a genuine trade-off: excessive randomisation produces an over-conservative policy that performs poorly everywhere, because it is hedging against worlds that do not exist.'
  )">
  Check answer
</button>

<p id="ca-q3-dr-feedback"></p>

---

##### Question 4: Interpretability

A learned policy makes a quadruped stumble consistently on one particular type of obstacle. Why is diagnosing this typically harder than for an MPC controller?

<label style="display: block;">
  <input type="radio" name="ca-q3-interp" value="a"> Because there is no intermediate quantity (no plan, no model, no tracking error) to inspect, and the cause could lie in the reward, the training distribution, the network, or the reality gap
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-interp" value="b"> Because neural networks cannot be run in debug mode
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-interp" value="c"> Because the policy runs too fast to be observed
</label>
<label style="display: block;">
  <input type="radio" name="ca-q3-interp" value="d"> Because learned policies never fail in reproducible ways
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-q3-interp',
    'a',
    'Correct! MPC exposes its reasoning: you can inspect the predicted trajectory, the model, the active constraints and the tracking error. A policy exposes only weights, so the failure gives you very little to work with and several candidate causes.',
    'Incorrect. The difficulty is structural, not practical: an MPC controller leaves an inspectable trail of intermediate quantities, whereas a policy offers none, and several quite different causes produce the same visible symptom.'
  )">
  Check answer
</button>

<p id="ca-q3-interp-feedback"></p>

</div>
</details>

---

## Bio-inspired approaches

<div class="family-banner bio" markdown="1">

**Family 3 of 3, bio-inspired.** Strongly influenced by computational neuroscience and biomechanics. The designer reproduces organising principles observed in animals, and lets the body's own mechanics do part of the work.

</div>

The first two families, for all their differences, share a habit of thought: the controller is in charge, and the body is what it commands. Bio-inspired approaches start by questioning that.

> Instead of asking only how an *engineer* would solve locomotion, ask what principles *biological* locomotion appears to exploit.

Animals walk and run using neural circuits that are slow, noisy, and heavily delayed compared with any digital controller, on bodies whose parameters they never measure. They do this while consuming far less energy than any robot of comparable size, and they recover from disturbances no roboticist has enumerated. Whatever they are doing, it is not solving an optimisation problem at $1\ \text{kHz}$.

#### Embodied intelligence

Two ideas from the 1990s and 2000s underpin this family.

**Embodied intelligence** (Rolf Pfeifer and colleagues) holds that intelligent behaviour is not produced by a controller alone but by the interaction of brain, body and environment. The shape of a leg, the compliance of a tendon and the friction of a foot are not inconvenient details the controller must overcome; they are part of the computation. Change the body and you change what the controller has to do.

**"The world is its own best model"** (Rodney Brooks) makes the complementary point about representation. Building and maintaining an internal model of the world is expensive and always slightly wrong. But the world is right there, continuously, for free: instead of predicting where the ground is, let the foot *find* it and react.

Taken together, these suggest a different division of labour:

> **Mechanics, environment and neural control can cooperate, rather than having the controller cancel out the body's natural dynamics.**

That last phrase names the contrast precisely. A stiff, high-gain position controller *fights* the body's natural dynamics: whatever the leg would have done, the controller overrides it. The bio-inspired stance is that this is expensive and fragile, and that a well-designed body plus a modest controller can do better.

This is not a claim that biological inspiration is always superior. It is a claim that the body is a resource, and that ignoring it wastes energy.

#### Three approaches

Following the lecture, we look at three, in order of increasing neural sophistication:

1. **Passive and dynamic walkers**: no controller at all, or almost none.
2. **Sensory-driven (reflex-based) methods**: locomotion as a chain of reflexes.
3. **CPG-and-reflex methods**: a central rhythm, modulated by reflexes.

---

### Passive and dynamic walkers

The most radical demonstration in this whole page, because it removes the controller entirely.

#### Walking with no motors, no sensors, no computer

A **passive dynamic walker** is a purely mechanical device (legs, knees, sometimes arms, connected by ordinary joints) that, placed at the top of a gentle slope and given a push, walks down it with a remarkably human-like gait. It has no motors, no sensors, no battery and no controller. Its only energy source is the gravitational potential given up as it descends.

The tradition begins with McGeer (1990) and was developed at Cornell (Collins, Wisse and Ruina) and Delft. Collins et al. (2001) built a three-dimensional passive walker with knees that balances side to side as well as fore and aft.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/passive_walker.png' | relative_url }}"
    alt="Two photographs of a metal passive-dynamic walking robot with two legs and knees walking down a shallow wooden ramp, with a person's hand releasing it at the top of the ramp in the second frame."
    style="width: 100%; max-width: 760px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 14: A passive dynamic walker, mid-stride.</strong>
    Two frames of the Cornell three-dimensional passive-dynamic walker descending a shallow ramp. The machine has knees and swinging arms and no motors, no sensors, no battery and no controller of any kind. Its only energy source is the height it gives up as it descends, and the human hand in the right-hand frame is releasing it, not steering it.
  </figcaption>

</figure>

The result is genuinely startling on first encounter, and it makes a point no amount of argument could:

> **A large part of what looks like "control" in walking is not control at all. It is mechanics.** If a well-designed set of linkages produces a human-like gait with literally zero computation, then a controller that computes such a gait from scratch is doing work the body could have done for free.

#### Why it works: mechanical limit cycles

Connect this to § 8.2.3.4. The passive walker settles into a stable limit cycle: a periodic motion which, if perturbed slightly, is naturally returned to over the following steps.

The analysis is exactly the return-map argument from 8.2. Sample the state once per step, say the inter-leg angle at heel strike, and you obtain a map $\mathbf{x}\_{k+1} = P(\mathbf{x}\_k)$. The walker's gait is a fixed point of that map, and it is stable because the slope of the map at that fixed point has magnitude less than one, so step-to-step deviations shrink geometrically.

The stabilising mechanism is the impact at heel strike, which dissipates energy in an amount that depends on how the step went; a step that was too fast loses more, a step that was too slow loses less. That asymmetry is a negative feedback built into the geometry of the machine. The energy budget balances because each step also gains a fixed amount from descending the slope.

**Self-stabilisation is therefore not a metaphor here: it is the same mathematical property established for the SLIP in § 8.2.2.3**, arising from mechanics rather than from feedback control.

#### Dynamic walkers: adding just enough actuation

A passive walker has one obvious limitation: it can only go downhill. **Dynamic walkers** fix this minimally.

> **Dynamic walkers are passive walkers plus actuation**: but only enough to replace the energy that the slope was providing.

The design philosophy inverts the usual one. Rather than using powerful motors to impose a trajectory, dynamic walkers use the machine's natural frequencies and inject small amounts of energy at the right moment in the cycle, much as you pump a swing. Delft's robot Mike used pneumatic McKibben artificial muscles for precisely this.

The payoff is energetic, and 8.2 already quantified it. Recall the Cost of Transport table of § 8.2.4: the passive-dynamics-inspired **Cornell Ranger** reaches $\text{CoT} \approx 0.19$, against $\approx 2$ for ASIMO, roughly a factor of ten. Ranger walked 65 km on a single battery charge, untouched by a human (Bhounsule et al.). The comparison is not quite like for like, since Ranger does one thing and ASIMO does many, but the order of magnitude is the point.

#### Where the efficiency comes from

It is worth being precise about why the trajectory-tracking approach is expensive, because the reason is not obvious:

- **Stiff, high-gain control fights the natural dynamics.** If the leg would naturally swing forward like a pendulum and the controller insists on a different trajectory, the motors must actively oppose the pendulum motion. Energy is spent cancelling something that was free and useful.
- **Non-backdrivable transmissions cannot recover energy.** Highly geared drives dissipate the energy of a landing as heat rather than storing it. A compliant leg returns much of it on the next push-off, exactly as the SLIP model describes.
- **Crouched postures require continuous torque.** As explained in § 8.3.3.1, ZMP-style walking with permanently bent knees means the knee extensors carry the body weight throughout, without ever locking.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 7 (conceptual) : Why can stronger motors make things worse?</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: The core question

Why can equipping a walking robot with stronger, higher-gain motors sometimes make its locomotion less energetically efficient?

<label style="display: block;">
  <input type="radio" name="ca-bio-q1" value="a"> Because stiff high-gain control cancels the body's natural dynamics, so the motors spend energy opposing motions such as leg swing that would otherwise have happened for free
</label>
<label style="display: block;">
  <input type="radio" name="ca-bio-q1" value="b"> Because stronger motors always weigh more, and weight is the only factor in efficiency
</label>
<label style="display: block;">
  <input type="radio" name="ca-bio-q1" value="c"> Because stronger motors cannot be controlled accurately
</label>
<label style="display: block;">
  <input type="radio" name="ca-bio-q1" value="d"> Because efficiency depends only on the control frequency
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-bio-q1',
    'a',
    'Correct! This is the central bio-inspired insight. A passive walker gets a human-like gait for zero energy because it lets the pendulum dynamics of the leg do the work. A stiff tracking controller overrides those same dynamics, paying to suppress a motion it could have exploited. Mass does matter too, but it is not the mechanism being asked about here.',
    'Incorrect. The mechanism is that high-gain tracking actively opposes the leg&apos;s natural pendulum motion in order to force a prescribed trajectory. Energy is spent cancelling dynamics that were free and useful.'
  )">
  Check answer
</button>

<p id="ca-bio-q1-feedback"></p>

---

##### Question 2 (True/False): Passive walkers and limit cycles

The stability of a passive dynamic walker can be analysed with the same return-map reasoning used for the SLIP model in § 8.2.3.4.

<label style="display: block;">
  <input type="radio" name="ca-bio-q2" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-bio-q2" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-bio-q2',
    'true',
    'Correct! Sample the state once per step, find the fixed point of the resulting map, and check that the slope magnitude at that fixed point is below one. Both systems are hybrid, being continuous dynamics punctuated by an impact, so the same machinery applies, and in both cases the stability is mechanical rather than commanded.',
    'Incorrect. It is true. A passive walker is a hybrid periodic system exactly like the SLIP: sampling once per step gives a return map whose fixed point is the gait, stable when the slope magnitude at that point is less than one.'
  )">
  Check answer
</button>

<p id="ca-bio-q2-feedback"></p>

</div>
</details>

---

### Sensory-driven and reflex-based control

Passive walkers show how much mechanics can do alone. But a purely passive machine cannot start, stop, steer, or adapt. The next step adds the smallest possible nervous system.

#### Locomotion as a chain of reflexes

The **RunBot** project (Geng, Porr and Wörgötter, 2006) is the clearest example. RunBot is a small biped that walks quickly with no trajectory tracking of any kind. There is no planned joint trajectory, no desired CoM path, no internal model.

Instead, locomotion is organised as a chain of sensor-triggered reactions:

```text
Foot contact / joint angle reaches a threshold
        ↓
reflex rule fires
        ↓
motor activation
        ↓
mechanical motion (exploiting the leg's natural dynamics)
        ↓
new sensory event
        ↓
(the cycle continues)
```

Each reflex is a simple feedback law: *if the foot touches the ground, extend this joint; if the hip angle passes this threshold, trigger swing.* The controller is implemented as a small neural network of sensor- and motor-neuron models. Its parameters were tuned in real time using a policy-gradient reinforcement-learning algorithm, an early example of the hybrid approaches discussed in § 8.3.6.

The rhythm of walking is not stored anywhere in the controller. It emerges from the loop through the body and the ground. The gait exists in the interaction, not in the machine.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/runbot_controller.png' | relative_url }}"
    alt="Diagram of a small neural network controller for a biped, arranged as left and right hip and knee groups. Yellow circles mark sensor neurons and motor neurons, red lines mark inhibitory synapses and blue lines excitatory synapses, with a legend naming the stretch receptors, ground-contact neurons, and extensor and flexor motor and sensor neurons."
    style="width: 82%; max-width: 640px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 15: The whole of RunBot's controller.</strong>
    Every unit is either a sensor neuron reading a physical event or a motor neuron driving a joint, connected by excitatory and inhibitory synapses. Note what is absent: there is no trajectory, no model, no clock and no internal representation of the gait. The stretch receptors (AL, AR) and the ground-contact neurons (GL, GR) are what advance the cycle, which is also why a blocked leg can stall it indefinitely.
  </figcaption>

</figure>

This connects directly to "the world is its own best model": RunBot does not predict when its foot will touch down, it simply waits to be told. And it exploits its natural dynamics rather than overriding them, which is why it achieves a high relative speed with very modest actuation. The approach shares its logic with neuromechanical models of human walking, such as Geyer and Herr (2010).

#### The characteristic weakness

Tight sensory coupling is a strength until a sensor lies, and here the failure mode is severe and specific:

> Because there is no centrally generated rhythm, there is a non-negligible risk that locomotion stops completely if a sensor is damaged, or if an external constraint holds the robot in a posture where the next triggering event never occurs.

If the next step is triggered only by the foot touching the ground, and the foot is caught on an obstacle so that contact never registers, the robot does not adapt or improvise. It simply waits, and goes on waiting. The chain of reflexes has no next link.

Biological systems do not behave this way. A cat with disrupted sensory feedback still produces rhythmic stepping, because the rhythm is generated centrally. That observation motivates the third approach.

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **Very close link between the controller and what the robot is actually doing.** Control acts on real events, not predicted ones.
- **Can be highly energy-efficient**, by benefiting from passive dynamics rather than stiff actuation.
- **Extremely cheap computationally**: a handful of threshold rules.
- **No model of robot or environment required.**

</div>
<div class="cons" markdown="1">

##### Limitations

- **Locomotion can halt entirely** if sensors fail or the robot is mechanically blocked, as described above.
- **No rhythm of its own**, so no graceful behaviour when sensory information is ambiguous.
- **Limited behavioural repertoire.** Reflex chains do one gait well; they do not readily produce a range of gaits.
- **Tuning is delicate**, since thresholds interact through the mechanics in ways that are hard to predict.

</div>
</div>

---

### CPG-and-reflex control

The most developed bio-inspired approach, and the one that most directly anticipates the dedicated CPG material later in this course.

#### What a CPG is

> **CPG = Central Pattern Generator.**

In vertebrates and invertebrates alike, the basic rhythm of locomotion is produced by neural circuits in the spinal cord, not in the brain. These circuits generate rhythmic activity even when isolated from all sensory feedback and from descending commands: a decerebrate cat on a treadmill still produces coordinated stepping. This is the biological fact the approach is built on.

For our purposes, the engineering definition is:

> A CPG is a dynamical system capable of autonomously generating rhythmic activity, typically implemented as a set of coupled nonlinear oscillators or as a recurrent neural network.

Crucially, a CPG produces its rhythm on its own. Sensory feedback *modulates* it, speeding it, slowing it, resetting its phase, but is not required for it to exist. This is exactly what RunBot lacked, and it is why a CPG-driven robot keeps stepping when a sensor fails.

#### Limit cycles, and why they matter here

The mathematical object behind a CPG is one you already know.

> A **limit cycle** is an isolated periodic solution of a dynamical system: a closed orbit in state space that the system traverses repeatedly. If the limit cycle is stable, a perturbation moves the state off the cycle temporarily, and the system naturally returns to it.

Two properties make this the right tool:

- **Stability without tracking.** Return to the cycle is a property of the dynamics, not of an error-correcting controller. Nothing measures a deviation and computes a correction; the flow simply carries the state back.
- **Phase, not time.** A limit cycle has no clock. Perturbed, the system may return to the cycle at a *different phase* than it left. For locomotion this is precisely right: if a leg is delayed by an obstacle, the correct response is to continue the rhythm from where the body actually is, the same insight that motivated phase-indexed virtual constraints in HZD (§ 8.3.3.4).

The connection to § 8.2.3.4 is direct: sample the oscillator's state once per cycle, obtain a return map, and stability of the limit cycle is again the condition that deviations shrink from one cycle to the next. The same mathematics describes SLIP self-stability, passive-walker gaits, HZD periodic orbits, and CPG rhythms. That recurrence is one of the genuinely unifying ideas of this chapter.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/limit_cycle.png' | relative_url }}"
    alt="Phase-plane portrait showing a closed elliptical orbit with arrows indicating the direction of flow, and two further trajectories, one starting inside the orbit and one outside, both spiralling towards it."
    style="width: 72%; max-width: 470px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 16: A stable limit cycle.</strong>
    The closed orbit is the rhythm. Trajectories starting away from it, inside or outside, spiral onto it and stay there. Nothing measures an error and computes a correction: the return is a property of the flow itself. This is the same stability notion analysed with return maps in § 8.2.3.4, and it is what a CPG supplies to a locomotion controller.
  </figcaption>

</figure>


#### The architecture

A CPG-based controller combines a central rhythm with peripheral reactions:

```text
               High-level command
             (speed, heading, gait)
                       ↓
              CPG oscillator network
                 ↙            ↘
          limb rhythm      inter-limb
          per joint        coordination
                 ↓
              actuators
                 ↑
            proprioception
                 ↑
              reflexes
       (modulate the central rhythm)
```

Reading the diagram:

- The high-level command is deliberately low-bandwidth: a few parameters such as desired speed, heading, and gait. It does not specify joint angles. This is a genuine advantage: the interface between "decide where to go" and "generate the motion" is a handful of numbers.
- The CPG network produces coupled rhythmic signals, one per joint or per limb. The coupling between oscillators sets the phase relationships between limbs, which *is* the gait: change the coupling and a walk becomes a trot.
- **Reflexes** feed sensory events back in to modulate the central rhythm, by adjusting amplitude, shifting phase, or triggering a corrective action.

#### Reflexes modulate, they do not dictate

This is the essential difference from § 8.3.5.2, and it resolves that approach's weakness. In a purely sensory-driven controller, a sensory event *causes* the next phase. In a CPG-and-reflex controller, the next phase happens anyway; the sensory event shapes it.

Two reflexes from the Fukuoka, Kimura and Cohen quadruped make this concrete:

- **The stumbling-corrective reaction.** Contact on the *dorsum* (top) of the paw, meaning the leg has struck an obstacle during swing, triggers a response that depends on whether the limb is loaded: retract and lift higher to clear the obstacle if unloaded, or extend for support if loaded. The same stimulus produces opposite responses depending on the phase of the cycle, which is only possible because a phase exists independently of the stimulus.
- **The vestibulospinal reflex.** Body-orientation feedback adjusts limb extension to keep the trunk near horizontal, the biological analogue of the attitude-control loop in § 8.3.3.2.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/reflexes.png' | relative_url }}"
    alt="Two schematic diagrams of a quadruped body on sloping ground. In the pitch-plane diagram the downward-inclined leg is extended and the upward-inclined leg is flexed; in the roll-plane diagram the same extension and flexion pattern is applied to the left and right sides on a step."
    style="width: 44%; max-width: 320px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 17: The vestibulospinal reflex, in two planes.</strong>
    Trunk orientation is measured and the limbs are extended or flexed to bring the body back towards horizontal. In the pitch plane (top) the downhill leg extends while the uphill leg flexes; in the roll plane (bottom) the same rule is applied side to side. The reflex does not command a posture directly. It biases the rhythm the CPG is already producing.
  </figcaption>

</figure>

#### Origins and examples

- **Taga's neuromechanical model** (1994, 1995) simulated a biped in which stable walking *emerged* from the mutual entrainment of a neural oscillator network, a musculoskeletal body and the environment. Neither the neural system nor the body produced walking alone; the gait was a property of the coupled system. This result strongly influenced everything that followed.
- **Fukuoka, Kimura and Cohen (2003)** brought the idea to hardware: a quadruped with three actuated degrees of freedom per limb, walking adaptively over irregular terrain using a CPG plus the reflexes described above.
- **Matsuoka oscillators** are the most common mathematical building block: a pair of mutually inhibiting neurons whose interaction produces a stable rhythm, with tunable frequency and amplitude, that entrains readily to sensory input. *We do not derive the Matsuoka equations here*; they belong to the dedicated CPG section later in the course. For now, what matters is the behaviour: a small, stable, tunable oscillator that can be coupled to others.
- **Gait transitions** arise naturally: changing the coupling weights in the oscillator network changes the phase relationships between limbs, converting a walk into a trot or a bound without switching controllers. Compare this with a finite state machine, where each gait must be programmed separately.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/cpg_coupling.png' | relative_url }}"
    alt="Two oscillator network diagrams for a quadruped. Each shows four coupled oscillators labelled left fore, right fore, left hind and right hind, driven by a common tonic input, with labelled connection weights between them. The two diagrams differ only in which weights are present."
    style="width: 62%; max-width: 470px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 18: Coupling weights are the gait.</strong>
    Four oscillators, one per leg (LF, RF, LH, RH), each driven by the same tonic command $u\_0$ and coupled to the
    others through the weights $w\_{ij}$. Configurations (a) and (b) differ only in which couplings are active, and
    that difference is what changes the phase offsets between the limbs, and therefore the gait. A transition from
    walking to trotting is a change of weights, not a change of controller.
  </figcaption>

</figure>


#### Discussion

<div class="proscons" markdown="1">
<div class="pros" markdown="1">

##### Advantages

- **Distributed control**, potentially robust against hardware faults: losing one oscillator need not stop the rest.
- **Limit-cycle behaviour of the coupled controller–body–environment system**, giving stability that does not depend on accurate models.
- **Robust against perturbations**, and, unlike a pure reflex chain, the rhythm continues when sensory information is lost.
- **Smooth trajectories**, because oscillator outputs are inherently continuous, with no discontinuities to excite the hardware.
- **Low online computation**, and a very low-bandwidth interface to higher levels.
- **Gait transitions come for free** by modulating coupling parameters.

</div>
<div class="cons" markdown="1">

##### Limitations

- **Fewer mathematical tools** than the model-based family, and consequently weaker formal guarantees.
- **No clear design methodology yet.** There is no systematic procedure taking a robot description to a working CPG; in practice reinforcement learning or black-box optimisation is recommended for setting the parameters.
- **Many parameters**, whose effects are coupled and unintuitive.
- **Does not by itself handle deliberate foot placement**, so it is a poor fit for the stepping-stone problem of § 8.3.3.5.

</div>
</div>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Exercise 8 (conceptual) : Reflexes, rhythms and perturbations</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: A blocked leg

A robot's swing leg catches on an obstacle, so the foot-contact sensor that normally triggers the next phase never fires. What happens under each control scheme?

<label style="display: block;">
  <input type="radio" name="ca-cpg-q1" value="a"> Both a purely sensory-driven controller and a CPG-based controller will halt, since both depend on sensory events
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q1" value="b"> A purely sensory-driven controller may halt indefinitely, whereas a CPG keeps producing its rhythm because the oscillation is generated centrally
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q1" value="c"> A CPG will halt, whereas a sensory-driven controller continues
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q1" value="d"> Neither is affected, since foot contact is never used in legged control
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-cpg-q1',
    'b',
    'Correct! This is exactly the weakness of pure reflex chains and the reason CPGs exist. In a reflex chain the sensory event *causes* the next phase, so if it never arrives the chain has no next link. A CPG generates the rhythm autonomously; sensory feedback modulates it but is not required for it to continue.',
    'Incorrect. The distinction is where the rhythm comes from. A reflex chain has no rhythm of its own and stalls when its triggering event fails to arrive; a CPG oscillates autonomously, so it continues and gives the robot a chance to work free.'
  )">
  Check answer
</button>

<p id="ca-cpg-q1-feedback"></p>

---

##### Question 2: The stumbling-corrective reaction

Contact on the top of the paw during swing produces *retraction and lifting* when the limb is unloaded, but *extension for support* when it is loaded. What does this show about the reflex?

<label style="display: block;">
  <input type="radio" name="ca-cpg-q2" value="a"> That the reflex response depends on the phase and load state of the limb, which requires a phase to exist independently of the stimulus
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q2" value="b"> That the reflex is unreliable and should be removed
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q2" value="c"> That the paw sensor measures load rather than contact
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q2" value="d"> That reflexes are equivalent to trajectory tracking
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-cpg-q2',
    'a',
    'Correct! One stimulus, two opposite responses, selected by where the limb is in its cycle. This is only possible when the controller carries an internal phase, which is exactly what the CPG provides, and exactly what a stimulus-response chain lacks.',
    'Incorrect. The point is that the *same* sensory stimulus produces opposite responses depending on the limb&apos;s phase and load. That is evidence for an internally maintained rhythm that the reflex modulates rather than dictates.'
  )">
  Check answer
</button>

<p id="ca-cpg-q2-feedback"></p>

---

##### Question 3: Changing gait

In a CPG-based quadruped controller, how is a transition from walking to trotting most naturally achieved?

<label style="display: block;">
  <input type="radio" name="ca-cpg-q3" value="a"> By switching to a separate, independently programmed trot controller
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q3" value="b"> By changing the coupling weights between the oscillators, which changes the phase relationships between the limbs
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q3" value="c"> By increasing the gain of the joint-level PD controllers
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q3" value="d"> By disabling all reflexes
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-cpg-q3',
    'b',
    'Correct! The gait *is* the set of phase relationships between limbs, as defined in 8.1, and those relationships are set by the oscillator coupling. Adjusting the weights moves continuously between gaits with no controller switching and no discontinuity in the commanded motion.',
    'Incorrect. In a CPG the inter-limb phase offsets are what define the gait, and they are determined by the coupling weights. Changing those weights is the natural, continuous way to transition.'
  )">
  Check answer
</button>

<p id="ca-cpg-q3-feedback"></p>

---

##### Question 4 (True/False): One idea, four places

The limit-cycle stability notion used to explain CPG robustness is essentially the same mathematical idea used for SLIP self-stability, passive-walker gaits, and Hybrid Zero Dynamics.

<label style="display: block;">
  <input type="radio" name="ca-cpg-q4" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-cpg-q4" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-cpg-q4',
    'true',
    'Correct! In all four cases the object of study is a stable periodic orbit, and the tool is a return map sampled once per cycle: deviations shrink when the slope magnitude at the fixed point is below one. What differs is only where the periodicity comes from: mechanics for SLIP and passive walkers, virtual constraints for HZD, neural coupling for CPGs.',
    'Incorrect. It is true, and it is one of the unifying threads of this chapter: all four are stable periodic orbits analysed by the return-map reasoning of section 8.2.3.4. Only the origin of the periodicity differs.'
  )">
  Check answer
</button>

<p id="ca-cpg-q4-feedback"></p>

</div>
</details>

---

## Comparing the three families

We can now put the three families side by side. Read the table as a summary of *tendencies*, not of laws: the boundaries are real but permeable, and the final subsection explains why the most interesting modern systems sit between the columns.

| Aspect | Model-based | Learning-based | Bio-inspired |
|---|---|---|---|
| **Main design object** | mathematical model + controller | learned policy | oscillators, reflexes, morphology |
| **Explicit robot model** | usually yes | not necessarily | often simplified or implicit |
| **What the designer specifies** | the control law | what good behaviour is worth | the structure of the rhythm and the body |
| **Where the effort goes** | modelling and derivation | reward design and training setup | parameter tuning and mechanical design |
| **Interpretability** | high to medium | often low | medium |
| **Formal guarantees** | sometimes strong | usually limited | usually limited |
| **Computational cost** | medium to high online | high during training, low online | often low online |
| **Adaptation** | depends on design | potentially strong | often naturally reactive |
| **Typical strengths** | predictability, constraints, optimisation | complex behaviours, flexibility | robust rhythms, efficient use of mechanics |
| **Typical weaknesses** | model error, tuning, computation | training, sim-to-real, black box | less systematic design methodology |

### Reading the table honestly

A few entries deserve qualification, because the compressed form makes them sound more absolute than they are.

**"Formal guarantees: sometimes strong."** Only *sometimes*. Hybrid Zero Dynamics genuinely proves asymptotic stability of a gait. Trajectory-based ZMP control proves that a planned motion will not tip, *given* an accurate model. But Virtual Leg Control has no analytical proof at all despite being model-inspired, and nominal MPC does not by itself establish closed-loop stability. Being model-based does not confer guarantees; a specific method with specific assumptions does.

**"Computational cost."** The families spend their computation at different *times*, which the single column obscures. MPC is expensive online, every control step, forever. RL is enormously expensive once, before deployment, then nearly free at run time. A CPG is cheap in both phases, but expensive in designer time. If your robot has a small onboard computer, these are very different propositions.

**"Interpretability."** The practical question is: when it fails, what can you look at? Model-based control leaves a trail: the model, the predicted trajectory, the active constraints, the tracking error. A CPG leaves oscillator states and phases, which are meaningful if not always intuitive. A learned end-to-end policy leaves weights.

**Guarantees are not the same as robustness.** This is worth stating plainly. A method can be *provably* stable under assumptions that reality violates, and fall over; another can have no proof at all and survive an hour in a forest. HZD offers strong guarantees on a modelled robot; Raibert's heuristics offered none and produced the most capable machines of their era. Formal stability answers "is this correct under my assumptions?"; robustness answers "what happens when my assumptions are wrong?" You want both, and they are obtained by different means.

### Matching approach to problem

A more useful question than "which is best?" is "which is suited to *this* problem?"

- **Precise, deliberate foot placement on known terrain** (stepping stones, gaps, ladders) favours explicit planning (§ 8.3.3.5) or MPC with foothold constraints. The decision is discrete and consequential, and you want it inspectable.
- **Guaranteed non-tipping for a valuable robot on flat ground** favours trajectory-based ZMP methods, whose conservatism is the point.
- **Versatile dynamic behaviour on a torque-controlled robot** (trotting, bounding, jumping, push recovery) favours MPC.
- **Provably stable periodic gaits on an underactuated machine** favours HZD.
- **Rough, unknown, deformable terrain at speed**, where no accurate model or map is available, favours learning-based methods, which handle exactly the case where modelling assumptions break.
- **Energy efficiency as the dominant objective** favours passive-dynamics-inspired design, and the mechanical design becomes as important as the controller.
- **Robust rhythmic locomotion with minimal computation and graceful sensor degradation** favours CPG-and-reflex control.

Notice that two of these are not really controller choices at all. Efficiency is largely settled by the mechanics before any code is written, which is the deepest lesson of § 8.3.5.1.

### Mechanical design and control are one problem

That last point generalises, and it is the most important idea to carry out of this page.

Every family here has an implicit view of the hardware. Trajectory-based ZMP control requires flat feet and stiff, highly geared, position-controlled joints, and then pays for that stiffness with a Cost of Transport near 2. Raibert's methods require powerful, fast actuators able to inject and absorb energy within a stance phase. MPC requires torque-controllable, backdrivable actuators, which is why it arrived when it did: the control idea is older than the hardware that made it practical. Passive-dynamics approaches require well-designed compliance and appropriate natural frequencies, and give almost nothing to a robot that lacks them.

> **You cannot choose a control approach independently of the robot, and you should not design the robot without knowing the control approach.** A body and a controller that were designed for each other beat a good controller bolted onto an indifferent body.

### Hybrid approaches: how the field actually works now

The three families are a useful taxonomy for *understanding* the literature. They are increasingly poor at describing the best current *systems*, which combine components from several.

This convergence is not a compromise; it is the recognition that the families have complementary failure modes. Model-based methods are precise where the model is good and brittle where it is not. Learning handles what is hard to model but cannot promise anything. Bio-inspired structure provides robust rhythm and efficiency but not deliberate precision. Combining them lets each cover another's weakness:

- **Learned foothold policy + model-based MPC.** A network proposes where to step (a judgement involving terrain appearance, which is hard to model) while MPC computes the forces, enforcing friction and torque limits exactly. The learned part handles perception; the model-based part keeps the physics honest.
- **RL trained around a model-based controller.** The policy learns a *correction* to a nominal model-based controller rather than a controller from scratch. Training is faster, the nominal behaviour is a known-good fallback, and the learned part only has to cover model error.
- **CPG parameters optimised by reinforcement learning.** This directly answers the "no clear design methodology" weakness of § 8.3.5.3: keep the CPG's structure, which supplies rhythm and smoothness, and let optimisation set the many coupled parameters. RunBot already did a version of this in 2006.
- **Model-based whole-body control with learned perception.** Classical control on a learned terrain estimate, keeping the guarantees where they can be had and using learning only where models are weakest.
- **Learned actuator models inside model-based controllers.** The ANYmal idea of § 8.3.4.3 applies just as well to MPC: replace an inaccurate analytical actuator model with a measured, learned one.

The organising question is no longer *"which family?"* but "which part of this problem do I understand well enough to model, and which part should I learn or let the mechanics handle?"

---

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Final Quiz : Choosing an approach for a real scenario</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

These questions ask you to reason about realistic situations rather than recall definitions. More than one answer may look defensible; choose the best-supported one and read the feedback carefully.

##### Question 1: Stepping stones

A quadruped must cross a known field of stepping stones, where each foot must land within a few centimetres of a specific spot. An accurate 3-D map and reliable localization are available. Which approach is most naturally suited?

<label style="display: block;">
  <input type="radio" name="ca-fin-q1" value="a"> Explicit foothold planning over the terrain map, or MPC with foothold constraints
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q1" value="b"> A pure CPG-and-reflex controller
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q1" value="c"> A passive dynamic walker
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q1" value="d"> Raibert's Virtual Leg Control
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-fin-q1',
    'a',
    'Correct! Every condition favours deliberate planning: the terrain is known, a good map exists, and the requirement is discrete, precise foot placement. A CPG generates rhythm but does not choose individual footholds; a passive walker cannot be steered at all; Raibert&apos;s heuristics regulate speed through foot placement but do not select a specific rock.',
    'Incorrect. Precise placement on *known* terrain is exactly the regime where explicit planning excels. Rhythmic and heuristic controllers generate good motion but have no mechanism for choosing one particular landing spot over another.'
  )">
  Check answer
</button>

<p id="ca-fin-q1-feedback"></p>

---

##### Question 2: The same robot, unknown deformable terrain, at speed

The same quadruped must now run rapidly over unknown, deformable terrain (mud, loose sand, dense undergrowth) where vision is unreliable and no accurate contact model exists. How should the architecture change?

<label style="display: block;">
  <input type="radio" name="ca-fin-q2" value="a"> Keep the same foothold planner but increase its planning frequency
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q2" value="b"> Shift weight away from map-based planning toward proprioception-driven reactive control: a learned policy trained with terrain and dynamics randomisation, or a CPG-and-reflex scheme
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q2" value="c"> Switch to trajectory-based ZMP control with offline trajectories
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q2" value="d"> Remove all feedback and rely on a feedforward plan
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-fin-q2',
    'b',
    'Correct! The assumptions that made planning work have failed: there is no reliable map and no accurate contact model. The response is to rely on proprioception, which still works, and on controllers that do not require an accurate model: a randomisation-trained policy, or a rhythmic controller modulated by reflexes. Note that deformable ground also breaks the rigid-contact assumption underneath ZMP.',
    'Incorrect. Running the same planner faster does not help when its *inputs* are unreliable, and offline ZMP trajectories are the most model- and terrain-dependent option available. When the map and the contact model fail, shift toward what still works: proprioception and reactive control.'
  )">
  Check answer
</button>

<p id="ca-fin-q2-feedback"></p>

---

##### Question 3: A guarantee is required

A biped humanoid will work in a factory alongside people. Certification requires a documented argument that the robot will not tip during its nominal walking motion. Which is the most defensible choice?

<label style="display: block;">
  <input type="radio" name="ca-fin-q3" value="a"> An end-to-end learned policy, because it performs best in tests
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q3" value="b"> A model-based approach (ZMP-constrained planning, or HZD) whose assumptions and guarantees can be written down and checked
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q3" value="c"> A purely sensory-driven reflex controller
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q3" value="d"> A passive dynamic walker
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-fin-q3',
    'b',
    'Correct! The requirement is not the best average performance but a *documented argument*. Model-based methods state their assumptions explicitly and derive conclusions from them, which is what certification consumes. Strong empirical test results are valuable evidence, but they are not the same kind of claim.',
    'Incorrect. The deciding factor is that the guarantee must be written down and checked. A learned policy may well perform better on average while offering nothing to certify; a reflex chain can stall outright; a passive walker only goes downhill.'
  )">
  Check answer
</button>

<p id="ca-fin-q3-feedback"></p>

---

##### Question 4: Diagnosing a hybrid system

A team runs a learned foothold-selection policy on top of a convex-MPC force controller. The robot places its feet sensibly but its body oscillates and the contact forces saturate. Where should they look first?

<label style="display: block;">
  <input type="radio" name="ca-fin-q4" value="a"> The learned policy, since a neural network is involved and therefore is the likely culprit
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q4" value="b"> The MPC layer (its cost weights, model accuracy and constraint limits), since foot placement is reported as sensible while the symptoms are all in force generation and body regulation
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q4" value="c"> The user command, since it must be wrong
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q4" value="d"> Nothing can be diagnosed once learning is involved anywhere in the system
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ca-fin-q4',
    'b',
    'Correct! This is the practical payoff of a hierarchical hybrid design: the interface between the layers is inspectable, so the fault can be localised. The footholds are observably fine, and the symptoms, body oscillation and force saturation, belong to the layer that computes forces and regulates posture.',
    'Incorrect. Do not blame the learned component reflexively. The interface between the two layers is observable, and it tells you the footholds are good while the force-generation behaviour is not, which points squarely at the MPC layer.'
  )">
  Check answer
</button>

<p id="ca-fin-q4-feedback"></p>

---

##### Question 5 (True/False): Efficiency

Given a fixed robot, the choice of control approach is by far the dominant factor determining its Cost of Transport.

<label style="display: block;">
  <input type="radio" name="ca-fin-q5" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="ca-fin-q5" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'ca-fin-q5',
    'false',
    'Correct! Mechanical design dominates. Compliance, transmission backdrivability, mass distribution and natural frequencies largely fix the achievable efficiency before any code is written, which is why Cornell Ranger reaches a CoT near 0.19 while ASIMO sits near 2. The controller matters, but mainly through whether it exploits or fights those mechanics.',
    'Incorrect. The controller matters, but the mechanics matter more: compliance, backdrivability and natural frequencies set the achievable range. This is the central lesson of the passive-walker work in section 8.3.5.1.'
  )">
  Check answer
</button>

<p id="ca-fin-q5-feedback"></p>

</div>
</details>

---

## Key takeaways

1. **Every controller fits the same architecture.** From user command through navigation, planning, tracking and joint control to the actuators, with state estimation feeding back. The methods differ in which blocks they replace or reorganise, not in whether those functions are needed.

2. **The rate hierarchy is structural.** Planning around $100\ \text{Hz}$, tracking around $1\ \text{kHz}$, joint control around $10\ \text{kHz}$. These figures are illustrative, but the ordering is not: the more abstract the decision, the slower the loop. A layer too slow for the disturbance it must reject cannot help however clever it is.

3. **Planning is feedforward, tracking is feedback, and both are necessary.** Much of what distinguishes the methods is how the labour is divided between them and how often each is recomputed. MPC's insight is to make planning so frequent that it *becomes* feedback.

4. **Model-based control trades assumptions for guarantees.** It is the only family that can sometimes prove a robot will not fall, but the proof holds only under its assumptions, and simplification error reappears as a disturbance feedback must absorb.

5. **Raibert's Virtual Leg Control is heuristics-based, not model-based.** The SLIP shaped the design; no model runs in the loop. That is the source of both its robustness and its lack of any stability proof.

6. **Learning replaces "how" with "what it is worth".** It buys behaviours that are impractical to hand-design, and pays with training cost, simulation dependence, opacity and the absence of guarantees. Reward design and MPC cost tuning are the same engineering activity at different times.

7. **Sim-to-real is the central practical problem of learning-based locomotion**, addressed by randomising what you cannot model and *measuring* what dominates the gap, the lesson of the ANYmal actuator network.

8. **Bio-inspired approaches treat the body as part of the computation.** Passive walkers show that a large part of what looks like control is mechanics; CPGs show that a rhythm can be generated centrally and merely *modulated* by sensing, which is what a pure reflex chain cannot do.

9. **One mathematical idea recurs throughout.** SLIP self-stability, passive-walker gaits, HZD periodic orbits and CPG rhythms are all stable limit cycles, all analysed with the return-map reasoning of § 8.2.3.4. Only the origin of the periodicity differs.

10. **Guarantees and robustness are different things.** Formal stability answers "is this correct under my assumptions?"; robustness answers "what happens when my assumptions are wrong?"

11. **Mechanical design and control are one problem.** Each approach presupposes particular hardware, and efficiency is largely decided before any code is written.

12. **The frontier is hybrid.** Learned perception with model-based control, RL around a nominal controller, CPGs tuned by optimisation. The useful question is not "which family?" but "which part of this problem do I understand well enough to model?"


## Programming exercises

The three families of this page are not only ideas to compare on paper. The two exercises below build two of them on the same robot, a Unitree A1 quadruped in PyBullet, so that the comparison in § 8.3.6 becomes something you have measured rather than something you have read.

They are meant to be done in order, in one sitting each. Part 5 will not run until Part 4 works, because Part 5 is Part 4 with a policy on top.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Programming Exercises 4 &amp; 5 : CPG and CPG-RL locomotion on a quadruped</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Download the exercise files

Download the package, extract it, and keep every file in the extracted folder. Full
setup instructions are in the `README.md` inside.

<a
  href="{{ '/assets/downloads/locomotion/Exercise_CPG_RL.zip' | relative_url }}"
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
  Download Exercises 4 &amp; 5
</a>

You will need Python 3.9 or newer and a fresh environment: the dependencies differ
from the earlier practicals, and now include `stable-baselines3`.

##### What's in the package

```text
Exercise_CPG_RL/
├── env/
│   ├── hopf_network.py        # Part 4: the CPG itself
│   ├── quadruped_gym_env.py   # Part 5: the RL environment and your reward
│   ├── quadruped.py           # robot interface, read this first
│   ├── quadruped_motor.py     # motor model
│   └── configs_a1.py          # robot constants and gains
├── a1_description/            # URDF and meshes for the A1
├── utils/                     # helpers
├── run_cpg.py                 # Part 4: run the CPG
├── run_sb3.py                 # Part 5: training, already configured
├── load_sb3.py                # Part 5: evaluate what you trained
├── solutions/                 # reference solutions
└── requirements.txt
```

---

#### Part 4 : Locomotion with a CPG

This is § 8.3.5.3 built. You implement a network of four coupled Hopf oscillators,
one per leg, map their state to foot trajectories, and close the loop with inverse
kinematics and the Jacobian-transpose control of § 8.3.3.3.

Seven `TODO`s, in dependency order:

| TODO | File | What you write |
|---|---|---|
| 1 | `env/hopf_network.py` | the four gait coupling matrices |
| 2 | `env/hopf_network.py` | the Hopf equations and their integration |
| 3 | `env/hopf_network.py` | oscillator state to foot positions |
| 4 | `run_cpg.py` | read joint angles and velocities |
| 5 | `run_cpg.py` | inverse kinematics |
| 6 | `run_cpg.py` | joint PD torque |
| 7 | `run_cpg.py` | Cartesian PD torque, through $\mathbf{J}^{T}$ |

Three things are worth watching for as you go.

The coupling matrices are the gait. TODO 1 is the claim behind Figure 18, made
concrete: you will produce a trot, a walk, a pace and a bound by changing nothing
but a 4×4 matrix of phase offsets. The sign convention matters more than it looks.
Trot, pace and bound use offsets of $0$ or $\pm\pi$, where a sign error is invisible;
walk is the gait that will catch you.

The amplitude converges on its own. In TODO 2 the amplitude equation drives
$r \to \sqrt{\mu}$ from any non-zero start, with no error signal and nothing tracking
anything. That is the stable limit cycle of Figure 16, running in your own code.

TODO 7 is Virtual Model Control. You are hanging an imaginary spring and damper
between the foot's actual position and the position the CPG asked for, then using
$\boldsymbol{\tau} = \mathbf{J}^{T}\mathbf{F}$ to find the torques that reproduce it.
The same relation as Exercise 3, now driving a real gait.

Then measure, for all four gaits, the average speed and the Cost of Transport of
§ 8.2.4, and answer:

- **Q4.1** Which gait is cheapest, which is most expensive, and where does the A1
  land relative to ASIMO ($\approx 2$) and Cornell Ranger ($\approx 0.19$)?
- **Q4.2** Turn the Cartesian PD term off. What happens to foot tracking and to the
  Cost of Transport, and why?
- **Q4.3** Set `couple=False` so the four oscillators run independently. What happens
  to the gait, and what does that tell you about where the gait is actually stored?

---

#### Part 5 : Putting a learned policy on top

Now § 8.3.4 and § 8.3.6 together. The CPG keeps producing the rhythm; a policy
learns to modulate it, choosing the amplitude $\mu_i$ and frequency $\omega_i$ of each
oscillator at every control step. Eight numbers. It never learns to walk from
scratch.

| TODO | File | What you write |
|---|---|---|
| 8 | `env/hopf_network.py` | the RL version of the integration |
| 9 | `env/quadruped_gym_env.py` | **your reward function** |
| 10 | `env/quadruped_gym_env.py` | port your Part 4 mapping into the environment |
| 11–13 | `load_sb3.py` | evaluation logging and plots |

**Before writing any code, Q5.1.** The observation vector is given to you. Read it
and decide, block by block, what could honestly be measured on a real A1. One entry
cannot be measured directly at all. Finding it is the exercise; § 8.3.4.3 is the
relevant reading.

**TODO 9 is the real work**, and it is § 8.3.4.1 in practice. Two failure modes are
worth knowing in advance. The optimiser maximises exactly what you wrote, so a bare
forward-velocity reward invites the robot to discover that falling forwards scores
well. And if the total reward can go negative, ending the episode early becomes a
winning strategy, and the policy learns to fall over deliberately.

Training is already configured: PPO, six parallel environments, 250 000 steps,
roughly 20 to 40 minutes on a laptop. That budget is not a compromise, it is the
lesson. You are looking for a rising reward curve and a robot that moves forward,
not a polished gait.

- **Q5.2** Give your reward and explain each term. Which weight gave you the most
  trouble, and what did the robot do when it was wrong?
- **Q5.3** Compare the learned controller against your best hand-tuned CPG from
  Part 4, on speed and Cost of Transport. Which wins, and is the comparison fair?
- **Q5.4** From the contact diagram, which gait did the policy settle on? Is it one
  of the four you built, or something in between?
- **Q5.5** Re-run the evaluation with `add_noise=True`, which the policy never saw
  in training. What happens, and what does it suggest about sim-to-real transfer?
- **Q5.6** CPG-RL converges in a few hundred thousand steps; end-to-end RL on the
  same robot typically needs tens of millions. Explain the gap in terms of what each
  approach has to discover, and connect it to § 8.3.6.

That last question is the one the whole page has been building towards. When your
policy walks after twenty minutes of training, it is not because the learning is
clever. It is because the CPG handed it a working rhythm and asked it to do nothing
but tune it, which is exactly what a hybrid architecture buys.

</div>
</details>

---
---

## Credits

This page adapts **Lecture 3, "Overview of control approaches"**, from the *Legged Robots* course at EPFL by **Prof. Auke Jan Ijspeert**, whose organisation into model-based, learning-based and bio-inspired families, whose control-architecture diagram (itself adapted from Marco Hutter's lectures), and whose choice of representative methods and examples are preserved here. We thank Prof. Ijspeert for making this material available.

Figures on this page are cropped directly from the slides of that lecture, except for the rolling-horizon diagram (Figure 11), which was drawn for this course. The embedded videos are linked from their original sources and are credited individually beneath each one.

## Resources

#### Trajectory-based control and the ZMP

- Vukobratović, M., & Borovac, B. (2004). Zero-moment point: thirty five years of its life. *International Journal of Humanoid Robotics*, 1(1), 157–173.
- Kajita, S., Kanehiro, F., Kaneko, K., Fujiwara, K., Harada, K., Yokoi, K., & Hirukawa, H. (2003). Biped walking pattern generation by using preview control of zero-moment point. *ICRA 2003*. [doi.org/10.1109/ROBOT.2003.1241826](https://doi.org/10.1109/ROBOT.2003.1241826)
- Kajita, S., & Espiau, B. (2008). Legged Robots. In *Springer Handbook of Robotics*, 361–389. [doi.org/10.1007/978-3-540-30301-5_17](https://doi.org/10.1007/978-3-540-30301-5_17)

#### Virtual Leg Control

- Raibert, M. H., Chepponis, M., & Brown, H. B. (1986). Running on four legs as though they were one. *IEEE Journal of Robotics and Automation*, 2(2), 70–82.
- Raibert, M. H. (1990). Trotting, pacing and bounding by a quadruped robot. *Journal of Biomechanics*, 23(Suppl. 1), 79–98.
- Raibert, M. H., & Hodgins, J. K. (1993). Legged robots. In *Biological Neural Networks in Invertebrate Neuroethology and Robotics*, 319–354. Academic Press.

#### Virtual Model Control

- Pratt, J., Chew, C.-M., Torres, A., Dilworth, P., & Pratt, G. (2001). Virtual Model Control: an intuitive approach for bipedal locomotion. *The International Journal of Robotics Research*, 20(2), 129–143.

#### Hybrid Zero Dynamics

- Chevallereau, C., Abba, G., Aoustin, Y., Plestan, F., Westervelt, E. R., Canudas-de-Wit, C., & Grizzle, J. W. (2003). RABBIT: a testbed for advanced control theory. *IEEE Control Systems Magazine*, 23(5), 57–79.
- Chevallereau, C., Westervelt, E. R., & Grizzle, J. W. (2005). Asymptotically stable running for a five-link, four-actuator, planar bipedal robot. *IJRR*, 24(6), 431–464.
- Westervelt, E. R., Grizzle, J. W., Chevallereau, C., Choi, J. H., & Morris, B. (2007). *Feedback Control of Dynamic Bipedal Robot Locomotion*. CRC Press. [doi.org/10.1201/9781420053739](https://doi.org/10.1201/9781420053739)
- Sreenath, K., Park, H.-W., Poulakakis, I., & Grizzle, J. W. (2011). A compliant hybrid zero dynamics controller for stable, efficient and fast bipedal walking on MABEL. *IJRR*, 30(9), 1170–1193. [doi.org/10.1177/0278364910379882](https://doi.org/10.1177/0278364910379882)

#### Planning for complex terrain

- Buchli, J., Kalakrishnan, M., Mistry, M., Pastor, P., & Schaal, S. (2009). Compliant quadruped locomotion over rough terrain. *IROS 2009*, 814–820.
- Kalakrishnan, M., Buchli, J., Pastor, P., Mistry, M., & Schaal, S. (2011). Learning, planning, and control for quadruped locomotion over challenging terrain. *IJRR*, 30(2), 236–258. [doi.org/10.1177/0278364910388677](https://doi.org/10.1177/0278364910388677)
- Kolter, J. Z., Rodgers, M. P., & Ng, A. Y. (2008). A control architecture for quadruped locomotion over rough terrain. *ICRA 2008*.

#### Model Predictive Control

- Di Carlo, J., Wensing, P. M., Katz, B., Bledt, G., & Kim, S. (2018). Dynamic locomotion in the MIT Cheetah 3 through convex model-predictive control. *IROS 2018*, 1–9. [doi.org/10.1109/IROS.2018.8594448](https://doi.org/10.1109/IROS.2018.8594448)
- Faraji, S., Pouya, S., Atkeson, C. G., & Ijspeert, A. J. (2014). Versatile and robust 3D walking with a humanoid robot Atlas: a model predictive control approach. *ICRA 2014*.
- Herzog, A., Rotella, N., Mason, S., Grimminger, F., Schaal, S., & Righetti, L. (2016). Momentum control with hierarchical inverse dynamics on a torque-controlled humanoid. *Autonomous Robots*, 40(3), 473–491. [doi.org/10.1007/s10514-015-9476-6](https://doi.org/10.1007/s10514-015-9476-6)
- Neunert, M., Stäuble, M., Giftthaler, M., Bellicoso, C. D., Carius, J., Gehring, C., Hutter, M., & Buchli, J. (2018). Whole-body nonlinear model predictive control through contacts for quadrupeds. *IEEE RA-L*, 3(3), 1458–1465. [doi.org/10.1109/LRA.2018.2800124](https://doi.org/10.1109/LRA.2018.2800124)

#### Learning-based methods

- Hwangbo, J., Lee, J., Dosovitskiy, A., Bellicoso, D., Tsounis, V., Koltun, V., & Hutter, M. (2019). Learning agile and dynamic motor skills for legged robots. *Science Robotics*, 4(26), eaau5872. [doi.org/10.1126/scirobotics.aau5872](https://doi.org/10.1126/scirobotics.aau5872)
- Lee, J., Hwangbo, J., Wellhausen, L., Koltun, V., & Hutter, M. (2020). Learning quadrupedal locomotion over challenging terrain. *Science Robotics*, 5(47). [doi.org/10.1126/scirobotics.abc5986](https://doi.org/10.1126/scirobotics.abc5986)
- Peng, X. B., Berseth, G., Yin, K., & Van De Panne, M. (2017). DeepLoco: dynamic locomotion skills using hierarchical deep reinforcement learning. *ACM Trans. Graph.*, 36(4), 41:1–41:13. [doi.org/10.1145/3072959.3073602](https://doi.org/10.1145/3072959.3073602)
- Jain, D., Iscen, A., & Caluwaerts, K. (2019). Hierarchical reinforcement learning for quadruped locomotion. [arxiv.org/abs/1905.08926](https://arxiv.org/abs/1905.08926)
- Peng, X. B., Coumans, E., Zhang, T., Lee, T.-W., Tan, J., & Levine, S. (2020). Learning agile robotic locomotion skills by imitating animals. *RSS 2020*. [arxiv.org/abs/2004.00784](https://arxiv.org/abs/2004.00784)
- Ha, S., Xu, P., Tan, Z., Levine, S., & Tan, J. (2020). Learning to walk in the real world with minimal human effort. [arxiv.org/abs/2002.08550](https://arxiv.org/abs/2002.08550)
- Siekmann, J., Godse, Y., Fern, A., & Hurst, J. (2021). Sim-to-real learning of all common bipedal gaits via periodic reward composition. [arxiv.org/abs/2011.01387](https://arxiv.org/abs/2011.01387)
- Schulman, J., Levine, S., Abbeel, P., Jordan, M., & Moritz, P. (2015). Trust region policy optimization. *ICML 2015*, 1889–1897.

#### Bio-inspired methods

- Pfeifer, R., & Bongard, J. (2006). *How the Body Shapes the Way We Think: a New View of Intelligence*. MIT Press.
- Pfeifer, R., Lungarella, M., & Iida, F. (2007). Self-organization, embodiment, and biologically inspired robotics. *Science*, 318(5853), 1088–1093. [doi.org/10.1126/science.1145803](https://doi.org/10.1126/science.1145803)
- McGeer, T. (1990). Passive dynamic walking. *IJRR*, 9(2), 62–82.
- Collins, S. H., Wisse, M., & Ruina, A. (2001). A three-dimensional passive-dynamic walking robot with two legs and knees. *IJRR*, 20(7), 607–615.
- Collins, S., Ruina, A., Tedrake, R., & Wisse, M. (2005). Efficient bipedal robots based on passive-dynamic walkers. *Science*, 307(5712), 1082–1085.
- Bhounsule, P. A., Cortell, J., Grewal, A., Hendriksen, B., Karssen, J. G. D., Paul, C., & Ruina, A. (2014). Low-bandwidth reflex-based control for lower power walking: 65 km over 27 hours. *IJRR*, 33(10), 1305–1321.
- Geng, T., Porr, B., & Wörgötter, F. (2006). Fast biped walking with a sensor-driven neuronal controller and real-time online learning. *IJRR*, 25(3), 243–259.
- Geyer, H., & Herr, H. (2010). A muscle-reflex model that encodes principles of legged mechanics produces human walking dynamics and muscle activities. *IEEE Trans. Neural Systems and Rehabilitation Engineering*, 18(3), 263–273.
- Taga, G. (1994). Emergence of bipedal locomotion through entrainment among the neuro-musculo-skeletal system and the environment. *Physica D*, 75(1–3), 190–208.
- Taga, G. (1995). A model of the neuro-musculo-skeletal system for human locomotion. I. Emergence of basic gait. *Biological Cybernetics*, 73(2), 97–111.
- Fukuoka, Y., Kimura, H., & Cohen, A. H. (2003). Adaptive dynamic walking of a quadruped robot on irregular terrain based on biological concepts. *IJRR*, 22(3–4), 187–202.
- Matsuoka, K. (1985). Sustained oscillations generated by mutually inhibiting neurons with adaptation. *Biological Cybernetics*, 52(6), 367–376.
- Ijspeert, A. J. (2008). Central pattern generators for locomotion control in animals and robots: a review. *Neural Networks*, 21(4), 642–653.
- Brooks, R. A. (1991). Intelligence without representation. *Artificial Intelligence*, 47(1–3), 139–159.

---

[Back to Top](#top)
