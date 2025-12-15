---
title: 3.3 DS-planning
parent: "Chapter 3: Motion Planning and Navigation"
nav_order: 3
layout: numbered
has_children: false
math: mathjax
chapter: 3
section: 3
---
<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


# Dynamical-Systems-Based Planning {#start}

- Table of Contents
{:toc}

## Prerequisites
* Basic knowledge of dynamical systems (DS)
* Control theory, system stability
* Diffeomorphic mapping

## General Motivation
![Overview](https://www.youtube.com/watch?v=7fKLhzgeBac&ab_channel=LASA)

In **trajectory planning** problems, the robot’s objective is to generate smooth, stable, and goal-directed motions that can adapt to changes in the environment or task — beyond simply following a fixed path. This is where **dynamical systems (DS)** offer a powerful framework: instead of relying on time-parameterized trajectories, DS-based approaches define a continuous vector field that governs the robot’s motion toward a target.

While the idea of using DS may appear conceptually simple, it provides a flexible and reactive foundation for robot motion generation. A key advantage lies in its ability to generalize to different start positions, adapt online to perturbations, and naturally handle convergence, stability, and obstacle avoidance within a unified structure.

This is why, in recent years, dynamical system-based methods have gained prominence in robotic motion planning and control, particularly in scenarios requiring real-time adaptation. In industrial robotics, DS approaches have been successfully applied to tasks such as surface finishing, spraying, and assembly, where motion must adapt to variations in the environment. In physical human-robot interaction, DS frameworks also enable robots to generate compliant and predictable motions that respond continuously to human inputs — making shared control and learning from demonstration both efficient and intuitive.



<details markdown="1">
<summary><strong>Conceptual Exercise</strong></summary>
**Drag each task to the correct category:**

<style>
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 10px;
    min-height: 255px;
    width: 100%;
    background-color: #f9f9f9;
  }

  .drag-item {
    background-color: #e3e3e3;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    margin: 4px;
  }

  .check-button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 10px;
    font-weight: bold;
  }
</style>

<div class="drag-container">
  
  <!-- Serial Robot Zone -->
  <div class="drop-zone" id="motion-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Key features of DS-based Planning</h3>
  </div>
</div>

<!-- Draggable items -->
<div class="drag-container" id="drag-items">
  <div class="drag-item" id="Real_Time_Adaptability" draggable="true" ondragstart="drag(event)">Real-Time Adaptability</div>
  <div class="drag-item" id="Goal_convergence" draggable="true" ondragstart="drag(event)">Goal Convergence</div>
  <div class="drag-item" id="Reactive_to_perturbations" draggable="true" ondragstart="drag(event)">Reactive to perturbations</div>
  <div class="drag-item" id="Open_loop_execution" draggable="true" ondragstart="drag(event)">Open-loop execution</div>
  <div class="drag-item" id="Requires_full_trajectory_specification_in_advance" draggable="true" ondragstart="drag(event)">Requires full trajectory specification in advance</div>
  <div class="drag-item" id="High_reliance_on_precise_timing" draggable="true" ondragstart="drag(event)">High reliance on precise timing</div>
</div>

<script>
const correctMapping = {
  "motion-zone": ["Real_Time_Adaptability", "Goal_convergence","Reactive_to_perturbations"]
};
</script>

<!-- Trigger + Feedback -->
<button class="check-button" onclick="checkDragDropAnswer(correctMapping, 'feedback-drag')">Check Answer</button>
<div class="feedback" id="feedback-drag"></div>



</details>

## Course Content

### Dynamical-Systems–Based Planning Overview

#### Motivation & Programming-by-Demonstration

Robotic path planning via dynamical systems learns continuous, time-invariant vector fields from human demonstrations (“Programming by Demonstration”) rather than hand-crafting trajectories<sup><a href="#ref1">1</a></sup>. By modeling motions as autonomous systems

$$
\dot\xi = f(\xi),
$$

robots react immediately to perturbations, offering smooth, robust replanning<sup><a href="#ref2">2</a></sup>.

<figure>
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/5953529-fig-15-source-large.gif" alt="Dynamical system example" width="600">
  <figcaption><center><em>Figure: Dynamical system model embedding different ways of performing a task in one single model. The robot follows an arc, a sine, or a straight line starting from different points in the workspace. </em><br><sub>Shiferaw, T. (2025) Advanced robotic manipulation with impedance control. MathWorks. Available at: https://ch.mathworks.com/company/technical-articles/enhancing-robot-precision-and-safety-with-impedance-control.html</sub></center> </figcaption>
</figure>



Nonlinear dynamical systems have recently emerged as a powerful framework for capturing robotic motor skills.  In particular, endpoint-to-endpoint behaviors can be encoded directly as time-invariant vector fields, forming reusable “movement primitives” (MPs) that drive a wide array of manipulation tasks.  Unlike traditional trajectory planners, DS-based methods naturally absorb disturbances by treating the goal as a globally attracting equilibrium, while the precise motion profiles are acquired from demonstration data.
<!-- Nonlinear dynamical systems have recently emerged as a powerful framework for capturing robotic motor skills<sup><a href="#refN1">N1</a>–<a href="#refN3">N3</a></sup>.  In particular, endpoint-to-endpoint behaviors can be encoded directly as time-invariant vector fields, forming reusable “movement primitives” (MPs)<sup><a href="#refN4">N4</a>,<a href="#refN5">N5</a></sup> that drive a wide array of manipulation tasks<sup><a href="#refN6">N6</a></sup>.  Unlike traditional trajectory planners, DS-based methods naturally absorb disturbances by treating the goal as a globally attracting equilibrium, while the precise motion profiles are acquired from demonstration data<sup><a href="#refN7">N7</a>–<a href="#refN10">N10</a></sup>. -->


#### Classical DS Models

- **Dynamic Movement Primitives (DMP)**: encodes each degree of freedom separately with a time-dependent forcing term; yields fast one-shot learning but limited coupling across dimensions<sup><a href="#ref3">3</a></sup>.  
DMP formulates motions as a non-autonomous dynamical system. In essence, a DMP augments a simple linear attractor with a learned nonlinear forcing term to reproduce complex trajectories from demonstrations. To guarantee convergence, the nonlinear component is gradually attenuated near the goal by a phase variable, smoothly reverting the system to its stable linear form. However, this external phase-driven modulation can warp the timing of the original motion, limiting DMP’s ability to extrapolate beyond the demonstrated paths.
<!-- DMP formulates motions as a non-autonomous dynamical system. In essence, a DMP augments a simple linear attractor with a learned nonlinear forcing term to reproduce complex trajectories from demonstrations. To guarantee convergence, the nonlinear component is gradually attenuated near the goal by a phase variable, smoothly reverting the system to its stable linear form. However, this external phase-driven modulation can warp the timing of the original motion, limiting DMP’s ability to extrapolate beyond the demonstrated paths<sup><a href="#refN11">N11</a></sup>. -->


To address this limitation, more recent approaches adopt **time-independent** models that maintain the spatial and temporal structure of demonstrations under perturbations. By decoupling motion generation from an explicit phase, these methods focus on “what to imitate” rather than “when to imitate,” enabling robust generalization to unseen regions of the workspace.  An appealing alternative is the Stable Estimator of Dynamical Systems (SEDS) <sup><a href="#ref2">2</a></sup>.

- **Stable Estimator of Dynamical Systems (SEDS)**: fits a Gaussian Mixture Model (GMM) to demonstrations under convex constraints guaranteeing global asymptotic stability at the goal<sup><a href="#ref2">2</a></sup>.  However, its quadratic Lyapunov-function constraint can limit reproduction accuracy when demonstrations violate purely contractive dynamics.  
- **Control-Lyapunov Function DS (CLF-DM)**: learns a Lyapunov candidate by constrained regression, ensuring stability via sum-of-squares certificates<sup><a href="#ref4">4</a></sup>.  
- **LAGS-DS (Locally Active, Globally Stable DS)**: augments a stable global attractor with local, state-dependent modulation for higher fidelity near demonstrations, yet retains global convergence<sup><a href="#ref6">6</a></sup>.  
- **Gaussian-Process DS**: Bayesian nonparametric vector fields with posterior uncertainty and stability enforced via contraction metrics<sup><a href="#ref7">7</a></sup>.  
- **Neural ODEs for DS**: parameterize $f(\xi)$ as a continuous-depth neural network, with stability imposed by spectral normalization or contraction theory<sup><a href="#ref8">8</a></sup>.

#### Benchmarks & Tools

- **LASA Handwriting Dataset**: 24 handwriting motions used extensively to compare DS methods<sup><a href="#ref9">9</a></sup>.  
- **Toolboxes**:  
  - EPFL-LASA’s SEDS ROS packages (https://github.com/epfl-lasa/icra-lfd-tutorial)  
  - EPFL-LASA’s LAGSDS ROS tasks (https://github.com/epfl-lasa/kuka-lagsds-tasks)

---

### Stability

Within a dynamical systems (DS) framework, achieving system stability alongside accuracy is essential. As robots learn motor skills via imitation learning (IL), robustness becomes paramount: the controller must generalize reliably and continue to converge on the intended behavior despite disturbances or variations. To reinforce stability in DS, three primary approaches are typically employed: Lyapunov functions (LF), Contraction Theory (CT), and diffeomorphic transformations. Each of these methods strengthens the learning system’s resilience by mitigating deviations and external perturbations. In the following, we examine the fundamental principles of these three techniques and their roles in enhancing DS stability.

#### Lyapunov stability

Lyapunov functions (LFs) provide a scalar measure—often thought of as the “energy” or “potential”—of a dynamical system. In control theory, they are indispensable for proving that a system will remain stable and converge to a target behavior. When applied to imitation learning, LF-based methods seek to construct a function that satisfies the usual Lyapunov conditions, then tune it via optimization (e.g., gradient descent, trust-region algorithms or neural-network training). By showing that this function consistently decreases along the system’s trajectories, these approaches guarantee that the learned policy is both stable and convergent.

To address this, LAGS-DS improves local tracking by allowing state-dependent gains near the demonstration manifold, yet sacrifices some of the stiffness of a pure global attractor<sup><a href="#ref6">6</a></sup>.

<!-- Reinhart et al. trained two parallel neural networks for the iCub—one for accuracy and one for stability—but this decoupled scheme is complex and lacks formal guarantees.   -->

The CLF-DM approach reduces conservatism by learning a control Lyapunov function via weighted asymmetric quadratics, yet it applies runtime corrections that can disrupt the learned DS.  

Although Artstein and Sontag’s theory of control Lyapunov functions provides the foundation for stability enforcement, balancing precision and robustness in learned systems remains an open challenge.

Lemme et al.’s Neurally Imprinted Stable Vector Fields (NIVF) employ a neurally learned Lyapunov candidate with quadratic programming, achieving high accuracy but only local stability and requiring expensive ex-post verification.  

<!-- Reinhart et al. trained two parallel neural networks for the iCub—one for accuracy and one for stability—but this decoupled scheme is complex and lacks formal guarantees<sup><a href="#refN10">N10</a></sup>.  

The CLF-DM approach<sup><a href="#refN15">N15</a>,<a href="#refN16">N16</a></sup> reduces conservatism by learning a control Lyapunov function via weighted asymmetric quadratics, yet it applies runtime corrections that can disrupt the learned DS.  

Although Artstein and Sontag’s theory of control Lyapunov functions<sup><a href="#refN17">N17</a>,<a href="#refN18">N18</a></sup> provides the foundation for stability enforcement, balancing precision and robustness in learned systems remains an open challenge.

Lemme et al.’s Neurally Imprinted Stable Vector Fields (NIVF)<sup><a href="#refN8">N8</a></sup> employ a neurally learned Lyapunov candidate with quadratic programming, achieving high accuracy but only local stability and requiring expensive ex-post verification<sup><a href="#refN19">N19</a></sup>.   -->


#### Contraction theory
Contraction theory (CT) offers a powerful means to certify stability and robustness in imitation‐learned controllers. Rather than tracking a single nominal trajectory, CT examines how distance between any two trajectories evolves over time. By identifying a metric under which the system’s dynamics cause all trajectories to shrink toward each other—i.e., to “contract”—one can guarantee exponential convergence to the desired behavior, even in the presence of disturbances or modeling errors.

- **Partial Contraction DS**: learns contracting subspaces so that local behaviors track demonstrations, then uses contraction theory for stability<sup><a href="#ref7">7</a></sup>.


#### Diffeomorphic mapping
Diffeomorphisms, a key concept in differential geometry and topology, are smooth, bijective mappings between differentiable manifolds that preserve differentiability. When you apply a diffeomorphism to the state space of a dynamical system, the resulting transformed system inherits the exact same stability properties as the original. Their power in stability analysis comes from the fact that by reparameterizing the system’s coordinates or state variables, one can often recast a complicated dynamical system into a simpler, hand‐specified stable system (HSDS) whose stability is already established. In this way, picking the right diffeomorphic transformation can greatly simplify the task of proving stability.

- **τ-SEDS**: augments SEDS with a diffeomorphic pre-mapping to relax Lyapunov constraints, boosting accuracy while retaining stability<sup><a href="#ref10">10</a></sup>.  This framework overcomes the stability–accuracy dilemma by integrating the Lyapunov candidate into a diffeomorphic transformation, yielding provably globally stable DS that faithfully reproduce demonstrations.  




---

### Diffeomorphic Mapping for DS

Mapping a simple, hand-designed—but provably stable—DS through a smooth, bijective transformation (a **diffeomorphism**) allows one to inherit stability while recovering complex accuracy.

#### Why Diffeomorphic Mapping --- Stability–Accuracy Dilemma

Robust DS must satisfy two often-conflicting goals:

1. **Stability**: provable global convergence to a target under any perturbation.  
2. **Accuracy**: faithful reproduction of the demonstrated trajectory.

Khansari-Zadeh et al. first highlighted the stability–accuracy trade-off in SEDS, noting that although their Gaussian-mixture stability constraints guarantee global convergence, “these global stability conditions might be too stringent to accurately model some complex motions”<sup><a href="#ref2">2</a></sup>.  <a href="#fig1">Figure 1</a> illustrates this: the left panel shows C-shaped demonstrations from the LASA dataset overlaid on equipotential contours of the quadratic Lyapunov function, while the right panel superimposes the DS flow (blue arrows), original trajectories (black), and reproductions (red), revealing stable yet imprecise tracking.

<!-- Khansari-Zadeh et al. first highlighted the stability–accuracy trade-off in SEDS, noting that although their Gaussian-mixture stability constraints guarantee global convergence, “these global stability conditions might be too stringent to accurately model some complex motions”<sup><a href="#ref2">2</a></sup>.  <a href="#fig1">Figure 1</a> illustrates this: the left panel shows C-shaped demonstrations from the LASA dataset<sup><a href="#refN14">N14</a></sup> overlaid on equipotential contours of the quadratic Lyapunov function, while the right panel superimposes the DS flow (blue arrows), original trajectories (black), and reproductions (red), revealing stable yet imprecise tracking. -->

<figure id="fig1">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/lyapunov.png" alt="Dynamical system example" width="600">
  <figcaption><center><em>Figure: The conflict between demonstration data and a DS constrained by a quadratic Lyapunov function. In the left panel, C-shaped trajectories from the LASA dataset are superimposed on the contour lines of the quadratic Lyapunov candidate, revealing their mismatch. The right panel shows the DS flow and its reproductions, which, although guaranteed stable, diverge noticeably from the original demonstrations. </em><br><sub>Shiferaw, T. (2025) Advanced robotic manipulation with impedance control. MathWorks. Available at: https://ch.mathworks.com/company/technical-articles/enhancing-robot-precision-and-safety-with-impedance-control.html</sub></center>  </figcaption>
</figure>

Compared to Lyapunov‐function–based and contraction‐theory–based methods, the diffeomorphic‐mapping–based DS method can handle demonstration data on Riemannian manifolds and, by leveraging the properties of the mapping, guarantee that even complex motion models remain globally stable.

#### Theory of Diffeomorphic Transformations <sup><a href="#ref22">22</a></sup>


A diffeomorphism $\psi\colon \mathcal{Y}\to \mathcal{X}$ is a smooth, bijective map with a smooth inverse, thereby providing a coordinate transformation between two differentiable manifolds $\mathcal{Y}$ and $\mathcal{X}$. According to Lee <sup><a href="#ref11">11</a></sup>, any such diffeomorphism can be realized as a flow generated by an infinitesimal generator $\mathbf{V}$, often represented as a vector field on a smooth manifold. Specifically, let $\mathbf{V}\colon \mathbb{R}^d \to \mathbb{R}^d$ be a time-independent vector field and the flow $\gamma\colon \mathbb{R}\times\mathbb{R}^d\to\mathbb{R}^d$ be defined by

$$
\gamma(t,y) = y + \int_{0}^{t} \mathbf{V}\bigl(\gamma(u,y)\bigr)du
= x.
$$

This flow $\gamma(t,y)$ provides the position $x$ at time $t$ of a trajectory starting at $y$ when $t=0$. For each fixed time $t$, this flow defines a diffeomorphism $\psi_t\colon \mathcal{Y}\to\mathcal{X}$ by $\psi(y):=\gamma(t,y)$. Therefore, the flow defines an invertible mapping, whose inverse can be computed by reversing the direction of time:

$$
\gamma(-t,x) = x + \int_{-t}^{0} \mathbf{V}\bigl(\gamma(u,x)\bigr)du
= y.
$$

Note that this flow-based diffeomorphism $\psi(y):=\gamma(t,y)$ maps the initial point $y\in\mathcal{Y}$ to the point $x=\gamma(t,y)\in\mathcal{X}$. Furthermore, given a vector field $f\colon \mathcal{X}\to T\mathcal{X}$, where $f(x)$ assigns a tangent vector in $T_x\mathcal{X}$ to each point $x\in\mathcal{X}$, we can use $\psi$ to pull back $f$ to a vector field on $\mathcal{Y}$. Specifically, let $J_{\psi}$ be the Jacobian of $\psi$, then the pullback of $f$ via $\psi$ is

$$
\dot y = J_{\psi}^{-1}f\bigl(\psi(y)\bigr),
$$

thereby transforming tangent vectors on $\mathcal{X}$ to corresponding tangent vectors on $\mathcal{Y}$.



If the system on the manifold $\mathcal{Y}$,

$$
\dot y = J_{\psi}^{-1}f\bigl(\psi(y)\bigr),
$$

is globally asymptotically stable at an equilibrium $y^*\in\mathcal{Y}$, then the mapped system on $\mathcal{X}$,

$$
x = \psi(y), 
\quad
\dot x = D\psi\bigl(y\bigr)\dot y
           = D\psi\bigl(\psi^{-1}(x)\bigr)J_{\psi}^{-1}f\bigl(x\bigr),
$$

is also globally asymptotically stable at the corresponding equilibrium $x^* = \psi(y^*)\in\mathcal{X}$.  




#### How to build a Diffeomorphic Mapping for DS
Step 1: Build latent space based on data
In the latent space, we aim for dynamics that are simple and whose stability is easy to prove. Common choices include:
1. **Linear or Quadratic DS**  
   - **Linearized demonstrations**: e.g., t-SEDS, Laplacian-based dimensionality reduction that projects high-dimensional trajectories into a low-dimensional linear space.  
   - **Stochastic linear dynamics**: including FDM, E-Flow, and I-Flow, which approximate demonstrations via linear differential equations with Gaussian models or random terms.
2. **Stable Neural ODEs**  
   - Modeling latent-space dynamics with Neural ODEs constrained for global asymptotic stability, combining expressiveness with convergence guarantees.

3. **Nonlinear DS and Limit Cycles**  
   - For cyclic motions (limit cycles), introduce phase-based scaling maps; for surfaces or other manifolds, embed them into the latent space via landmark matching or conformal maps.

4. When designing the latent space, also consider the latent space’s dimension and order:  
  - **Non-Euclidean demonstrations** (e.g., finger joints, rotations): express them in the latent space using Riemannian manifolds or Lie group structures.  
  - **Environmental changes and obstacle avoidance**: incorporate infinitesimal generators of flows, space curvature, or rotational avoidance terms in the latent dynamics.  
  - **Second-order or dissipative systems**: simulate energy dissipation and inertial effects via phase-based scaling or higher-dimensional Euclidean representations.




Step 2: Train mapping between the original space and the latent space
After constructing the latent-space DS, the key is learning an **invertible mapping** that preserves stability while accurately reproducing demonstration trajectories. Main methods include:

1. **Classical Optimal Methods**  
   - Large Deformation Diffeomorphic Metric Mapping (LDDMM)  
   - Optimal Transport–based mapping  
   - Locally weighted translations with geometric constraints

2. **Geometry/Physics-Constrained Methods**  
   - Riemannian Gaussian Mixture Models for smooth manifold transformations  
   - Hamiltonian-based diffeomorphic flows  
   - Mappings defined on Lie groups

3. **Neural Network Approaches**  
   - **Normalizing Flows** (invertible neural networks): I-Flow, E-Flow, Jacobian-Constrained Networks, Non-Volume-Preserving flows  
   - **Diffeomorphic Neural Networks**: using Neural ODE structures to ensure invertibility and diffeomorphic properties  
   - **Invertible Residual Networks**: approximating invertible mappings with residual structures



#### Key Challenges: 
Although diffeomorphism is theoretically attractive, practical applications must address:

1. **Model Accuracy vs. Dimensionality Curse**  
   - High accuracy often requires a higher-dimensional latent space, leading to increased training and inference costs.

2. **Approximation Errors**  
   - Approximating diffeomorphic mappings on Riemannian or non-Euclidean spaces can introduce errors that affect strict stability guarantees.

3. **Practical Deployment**  
   - How to deploy on real robotic platforms with sufficient speed while handling sensor noise and real-time control requirements.

---

### State-of-the-Art Approaches to Training the Mapping

The current methods for computing diffeomorphisms are mainly flow-based approaches, which generate a series of transport equations to iteratively alter the spatial structure and design a cost function to ensure minimization of the deformation.

#### Fast diffeomorphic matching (FDM)
FDM propose a new diffeomorphic matching algorithm and use it to learn nonlinear dynamical systems with the guarantee that the learned systems have global asymptotic stability.
##### Iterative Locally Weighted Matching

A novel approach to diffeomorphic matching is based on **diffeomorphic locally weighted translations**. This method applies smooth, localized updates iteratively to approximate the diffeomorphism efficiently.

- **Parameters:** Fix the number of iterations $K$, with $0 < \\mu < 1$ (safety margin) and $0 < \\beta \\leq 1$ (learning rate). Typically, $K = 150$, $\\mu \\approx 0.9$, and $\\beta \\approx 0.5$.
- **Initialization:** Set $Z := X$.

At each iteration $j$:

1. Select the point $p_j$ in $Z$ furthest from its target $q$ in $Y$.
2. Define the translation $\\psi_{\\rho_j, p_j, v_j}$ with direction $v_j = \\beta (q - p_j)$ and Gaussian RBF kernel, where $\\rho_j \\in [0, \\mu \\rho_{\\max}(v_j)]$ is optimized to minimize the distance between $\\psi_{\\rho_j, p_j, v_j}(Z)$ and $Y$.
3. Update $Z := \\psi_{\\rho_j, p_j, v_j}(Z)$.

The final diffeomorphism is the composition of all local updates:

$$
\\Phi = \\psi_{\\rho_K, p_K, v_K} \\circ \\cdots \\circ \\psi_{\\rho_2, p_2, v_2} \\circ \\psi_{\\rho_1, p_1, v_1}.
$$

---

##### Pseudo-code

<!-- Algorithm: Fast Diffeomorphic Matching (for Just the Docs + MathJax)
     Paste this block into your .md file. -->

<style>
.algo-box {
  border: 1px solid #ddd; border-radius: 6px; padding: 12px 14px;
  background: #f9fafb; margin: 1rem 0;
}
.algo-box .title { font-weight: 700; }
.algo-box .kw { font-weight: 600; }
</style>

<div class="algo-box" markdown="1">
<span class="title">Algorithm — Fast Diffeomorphic Matching (FDM)</span>  

**Input:** $X=(x_i)_{i=0,\dots,N}$ and $Y=(y_i)_{i=0,\dots,N}$  
**Parameters:** $K \in \mathbb{N}_{>0}, 0 < \mu < 1, 0 < \beta \leq 1$  

Initialize: $Z = (z_i)_{i=0,\dots,N}$  
Set $Z := X$  

**<span class="kw">for</span>** $j = 1$ **to** $K$ **do**  
$\qquad m := \arg\max_{i \in \{0,\dots,N\}}  \lVert z_i - y_i \rVert$  
$\qquad p_j := z_m$  
$\qquad q := y_m$  
$\qquad v_j := \beta (q - p_j)$  
$\qquad \rho_j := \arg\min_{\rho \in [0, \mu \rho_{\max}(v_j)]} \mathrm{dist}\big(\psi_{\rho, p_j, v_j}(Z), Y\big)$  
$\qquad Z := \psi_{\rho_j, p_j, v_j}(Z)$  
**<span class="kw">end for</span>**  

**return** $\{ \rho_j \}_{j=1,\dots,K}, \{ p_j \}_{j=1,\dots,K}, \{ v_j \}_{j=1,\dots,K}$
</div>


This iterative matching scheme is both efficient and robust, yielding a smooth diffeomorphism by composing a sequence of locally weighted translations.

With our **tutorial code**, you can **inspect the mapping results** and the **DS constructed** using this method.

<figure id="fig6">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/FDM.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: DS mapping results for the FDM method: the left figure shows the velocity vector field, and the right figure shows the potential field.</em></center>  </figcaption>
</figure>

<figure id="fig7">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/fdm_map.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: Grid representations of the latent space and original space, showing that the linear trajectory becomes the desired shape after mapping.</em></center>  </figcaption>
</figure>

---

#### Euclideanizing Flows （E-flow）
Inspired by recent works in density estimation, E-flow propose to represent the diffeomorphism as a composition of simple parameterized diffeomorphisms. 

By definition, a diffeomorphism must be **bijective** and **continuously differentiable**. To achieve this, we model it as a composition of $K$ mappings:

$$
\\psi = \\psi_1 \\circ \\psi_2 \\circ \\cdots \\circ \\psi_K, \\quad \\psi_k : \\mathbb{R}^n \\to \\mathbb{R}^n.
$$

Each mapping $\\psi_k$ is implemented with a **coupling layer** that splits the input $z_{k-1}$ into two halves and applies scaling and translation:

$$
\psi_k(z_{k-1}) = \begin{bmatrix}
  z_{k-1}^a \\
  z_{k-1}^b \odot \exp\big(s_k(z_{k-1}^a)\big) + t_k\big(z_{k-1}^a\big)
\end{bmatrix}
$$

where $s_k$ and $t_k$ are scaling and translation functions. This guarantees bijectivity and differentiability, so the composition $\\psi$ is a valid diffeomorphism.

---

##### Learning Objective from Demonstrations

Suppose we have $N$ human demonstrations, each consisting of $T_i$ pairs $(x_{i,t}, \\dot{x}_{i,t})$. We aim to learn a dynamical system

$$
\\dot{x} = f_{\\psi}(x)
$$

that reproduces the demonstrations while ensuring stability. With a coordinate transform $y = \\psi(x)$, the system becomes a gradient flow

$$
\\dot{y} = -\\nabla_y \\Phi(y), \\quad \\Phi(y) = \\| y - y^* \\|, \\quad y^* = \\psi(x^*).
$$

The learning problem reduces to minimizing the trajectory error:

$$
\hat{\theta} = \arg\min_{\theta}
\frac{1}{\sum_{i=1}^{N} T_i}
\sum_{i=1}^{N}\sum_{t=1}^{T_i}
\left\| \dot{x}_{i,t} - f_{\psi_{\theta}}(x_{i,t}) \right\|^{2}
$$

---

##### Kernelized Coupling Layers

To enforce smoothness, we parameterize $s_k$ and $t_k$ with Gaussian kernels:

$$
k(z, z') = \\exp\\Big(-\\frac{\\lVert z - z' \\rVert^2}{2l^2}\\Big).
$$

Using random Fourier features:

$$
\\varphi(z) = \\sqrt{\\tfrac{2}{m}} [\\cos(a_1^T z + b_1), \\ldots, \\cos(a_m^T z + b_m)]^T,
$$

with $a_j \\sim \\mathcal{N}(0, l^{-2} I)$ and $b_j \\sim U(0,2\\pi)$. Then,

$$
s_k(z) = \\varphi(z)^T W_{s_k}, \\quad t_k(z) = \\varphi(z)^T W_{t_k},
$$

where $W_{s_k}, W_{t_k}$ are learnable parameters.



With our **tutorial code**, you can **inspect the mapping results** and the **DS constructed** using this method.

<figure id="fig8">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/eflow.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: DS mapping results for the FDM method: the left figure shows the velocity vector field, and the right figure shows the potential field.</em></center>  </figcaption>
</figure>

<figure id="fig9">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/eflow_map.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: Grid representations of the latent space and original space, showing that the linear trajectory becomes the desired shape after mapping.</em></center>  </figcaption>
</figure>


---

#### Imitation Flow


**ImitationFlow** extends the framework of stochastic dynamical systems by integrating **normalizing flows** into the emission function, providing both stability guarantees and expressive modeling power.  
The method is designed to learn stable stochastic dynamical systems from demonstration data while preserving asymptotic stability of the dynamics.

---

##### Model Formulation
In the latent space $\mathcal{Z}$, the system evolves according to a stochastic differential equation (SDE):

$$
dz(t) = f_{\phi}(z(t))dt + g_{\phi}(z(t))dB(t),
$$

where $f_{\phi}$ and $g_{\phi}$ are the drift and diffusion terms parameterized by $\phi$, and $B(t)$ is a $d$-dimensional Brownian motion.  
The observation space $\mathcal{Y}$ is linked to the latent space via a diffeomorphic transformation $h_{\theta}$:

$$
y = h_{\theta}(z),
$$

where $h_{\theta}$ is bijective, smooth, and parameterized by $\theta$.  
This guarantees that the learned mapping preserves the stability properties of the latent dynamics in the observation space.

---

##### Equivalent Dynamics in the Observation Space
Given the Jacobian of the transformation $J_{\theta}(y) = \frac{dz}{dy}$, the stochastic dynamics of $y(t)$ can be rewritten as:

$$
dy(t) = J_{\theta}(y) f_{\phi}\left(h_{\theta}^{-1}(y)\right)dt
      + J_{\theta}(y) g_{\phi}\left(h_{\theta}^{-1}(y)\right) dB(t).
$$

This formulation ensures that the transformed dynamics remain stable while enabling expressive modeling of complex motion patterns.

---

##### Learning Algorithm
The goal is to maximize the likelihood of the observed trajectories under the ImitationFlow model:

$$
\psi^* = \arg\max_{\psi=\{\theta,\phi\}}  \mathcal{L}_{\psi}(\mathcal{T}),
$$

where $\mathcal{T}$ is the set of expert demonstrations and $\mathcal{L}_{\psi}$ is the trajectory likelihood.  
By leveraging the change-of-variable rule of normalizing flows, the probability of trajectories in $\mathcal{Y}$ is rewritten in terms of the latent dynamics in $\mathcal{Z}$:

$$
p(y) = p(z) \left|\det \frac{\partial z}{\partial y}\right|.
$$

Thus, the learning process consists of two coupled steps:
1. Estimating the stable latent dynamics parameters $\phi$;
2. Optimizing the flow transformation $h_{\theta}$ to faithfully reproduce demonstrations in the observation space.

---

##### Pseudo-code

<!-- Algorithm 1: ImitationFlow Learning (for Just the Docs + MathJax)
     Paste this anywhere in your .md page (outside code blocks). 
     It uses HTML with markdown="1" so MathJax will render correctly. -->

<style>
.algo-box {
  border: 1px solid #ddd; border-radius: 6px; padding: 12px 14px;
  background: #f9fafb; margin: 1rem 0;
}
.algo-box .title { font-weight: 700; }
.algo-box .kw { font-weight: 600; }
</style>

<div class="algo-box" markdown="1">
<span class="title">Algorithm 1 — ImitationFlow Learning</span>  

**Input:** $\mathcal{T}$ trajectories  
**Parameters:** $\phi$ dynamics, $\theta$ NormalizingFlow  

**<span class="kw">while</span>** not converged **<span class="kw">do</span>**  
$\qquad \tau_y \leftarrow \{\mathcal{T}\}$  
$\qquad \Delta T \leftarrow \text{Get a sampling time}$  
$\qquad \tau_z, \lvert J_{\tau_z}^{-1}\rvert \leftarrow h_{\theta}^{-1}(\tau_y)$  
$\qquad z_{(0:T-\Delta T)}, z_{(\Delta T:T)}, z_n \leftarrow \mathrm{SplitTime}(\tau_z, \Delta T)$  
$\qquad p(\cdot \mid z_i+\Delta T;\phi), p_n(\cdot;\phi) \leftarrow \mathrm{GetDensFunc}\big(z_{(\Delta T:T)}, z_n\big)$  
$\qquad \mathcal{L} = p_n(z_n;\phi)\,\lvert J_{n}^{-1}\rvert \prod_i p\big(z_i \mid z_{i+\Delta T};\phi\big)\,\lvert J_{i}^{-1}\rvert$  
$\qquad \Delta\theta, \Delta\phi \propto -\nabla_{\theta}\mathcal{L}, -\nabla_{\phi}\mathcal{L}$  
**<span class="kw">end while</span>**
</div>

With our **tutorial code**, you can **inspect the mapping results** and the **DS constructed** using this method.

<figure id="fig10">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/iflow.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: DS mapping results for the FDM method: the left figure shows the velocity vector field, and the right figure shows the potential field.</em></center>  </figcaption>
</figure>

<figure id="fig11">
  <img src="{{ site.baseurl }}/assets/images/DS-based-planning/iflow_map.png" alt="compare results" width="600">
  <figcaption><center><em>Figure: Grid representations of the latent space and original space, showing that the linear trajectory becomes the desired shape after mapping.</em></center>  </figcaption>
</figure>
---

### Programming exercise for classical methods

#### Tutroial code repository

We create a code repository where you can test and try different Diffeomorphic mapping methods for DS training.

[GitHub – RLoad/Tutorial_DS_mapping](https://github.com/RLoad/Tutorial_DS_mapping)

Here we list the method we used in our code structure, and thank them for their open source code repositories.

#### Methods List

- **Fast Diffeomorphic Matching (FDM)**: Perrin & Schlehuber-Caissier (2016) introduce FDM to align a reference attractor to the demonstration manifold by solving large-deformation diffeomorphism matching with stability certificates<sup><a href="#ref12">12</a></sup>.

- **Euclideanizing Flows (E-FLOW)**: Rana, Fox & Qiu (2020) view diffeomorphism learning as a normalizing flow: compose simple parameterized maps so that $x=\phi(z)$, with $z$ following a linear stable DS. Stability follows directly from the base flow<sup><a href="#ref13">13</a></sup>.

- **Imitation Flows (I-FLOW) (On going)**: Urain et al. (2020) extend E-FLOW to stochastic stabilization, pushing a simple contracting SDE through a learnable diffeomorphism via normalizing flows, ensuring both stability and expressivity<sup><a href="#ref14">14</a></sup>.

- **Riemannian Stable DS (RSDS) (On going)**: Saveriano, Abu-Dakka & Kyrki (2023) learn diffeomorphic maps on manifolds (e.g. orientation on $\mathrm{SO}(3)$) via neural manifold ODEs, enforcing Lyapunov stability on Riemannian manifolds<sup><a href="#ref15">15</a></sup>.

- **More is coming ...**

#### Code Structure Overview

The purpose of this code framework is fourfold:
- Define the core scenario: DS-based skill learning and generalization via geometric configuration
- Provide a concise yet representative example to demonstrate key concepts
- Offer modular code and rich visualizations to facilitate learner understanding
- Enable method comparison and metric selection for objective evaluation


The repository is organized into modular components that follow the stages outlined in the DS diffeomorphic mapping tutorial:

1. **Toy Data Generation**
   - Generates synthetic trajectories based on LASA handwriting data.
   - Supports both 2D S-shaped curves and 3D curved surfaces for refinement.
   - Visualizes raw and target trajectories.

    <figure id="fig2">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture1.png" alt="toy data" width="600">
      <figcaption><center><em>Figure: The toy data generated by our code structure. Left: 2D LASA handwrite data; Right: 3D toy data</em></center>  </figcaption>
    </figure>

2. **Mapping Methods choice**
   - **τ-SEDS**: Stable Estimation of Dynamical Systems using Gaussian mixture models.
   - **Fast Diffeomorphic Mapping**: Efficient algorithms for time-variant diffeomorphic transformations.
   - **Euclideanizing Flows**: Flow-based models that map curved dynamics into Euclidean latent spaces.
   - **Imitation Flows**: Neural network–based residual flows for trajectory imitation.
   - **More ...**: 

3. **Training Pipeline**
   - Constructs latent space structure and prepares paired datasets. We can construct the latent space using either a linear or a quadratic form.
    <figure id="fig3">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture5.png" alt="latent space" width="600">
      <figcaption><center><em>Figure: The latent-space vector field and its potential energy. Left: Vector field; Right: Potential energy</em></center>  </figcaption>
    </figure>
      
   - Obtain the training dataset for both latent and original spaces.
    <figure id="fig4">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture7.png" alt="linearize" width="300">
      <figcaption><center><em>Figure: The original dataset and its linearized counterpart.</em></center>  </figcaption>
    </figure>

   - Selects model parameters and network architecture via command-line interface.
    <figure id="fig5">
      <img src="{{ site.baseurl }}/assets/images/DS-based-planning/Picture8.png" alt="NN structure" width="600">
      <figcaption><center><em>Figure: Common neural network architectures commonly used for training DS mappings.</em></center>  </figcaption>
    </figure>

   - Design the neural network architecture (Option).
   - Training scripts (`train_*.py`) log progress, plot loss curves, and save checkpoints.

4. **Evaluation & Visualization**
   - Computes metrics: Root Mean Squared Error (RMSE), Dynamic Time Warping Distance (DTWD), and Fréchet Distance (FD).
   - Vector field simulation to test learned DS trajectories against ground truth.
   - Plotting utilities for 2D, 3D, and vector field visualizations.

   **here we will have a interaction interface to direct test code**

5. **Utilities**
   - Common functions for data loading, logging, and plotting.
   - Configuration loader and argument parsers.

---

##### Getting Started

```bash
# Clone the repository
git clone https://github.com/RLoad/Tutorial_DS_mapping.git
cd Tutorial_DS_mapping

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```


### Want to implement a real project?

[TODO]

## Credits

## References

1. <a id="ref1"></a>Argall, B. D., Chernova, S., Veloso, M., & Browning, B. (2009). *A survey of robot learning from demonstration.* Robotics and Autonomous Systems, 57(5), 469–483.  
2. <a id="ref2"></a>Khansari-Zadeh, S. M., & Billard, A. (2011). *Learning stable nonlinear dynamical systems with Gaussian mixture models.* IEEE Transactions on Robotics, 27(5), 943–957.  
3. <a id="ref3"></a>Pastor, P., Hoffmann, H., Asfour, T., & Schaal, S. (2009). *Learning and generalization of motor skills by learning from demonstration.* In 2009 IEEE International Conference on Robotics and Automation (ICRA) (pp. 763–768).  
4. <a id="ref4"></a>Khansari-Zadeh, S. M., & Billard, A. (2014). *Learning control Lyapunov functions to ensure stability of dynamical system–based robot reaching motions.* Robotics and Autonomous Systems, 62(6), 752–765.  
5. <a id="ref5"></a>Khansari-Zadeh, S. M., & Billard, A. (2012). *A dynamical system approach to real-time obstacle avoidance.* Autonomous Robots, 32(4), 433–454.  
6. <a id="ref6"></a>Kronander, K., Khansari-Zadeh, S. M., & Billard, A. (2015). *Incremental motion learning with locally modulated dynamical systems.* Robotics and Autonomous Systems, 70, 52–62.  
7. <a id="ref7"></a>Kolter, J. Z., & Manek, G. (2019). *Learning stable deep dynamics models.* Advances in Neural Information Processing Systems, 32, 11128–11136.  
8. <a id="ref8"></a>Kang, Q., Song, Y., Ding, Q., & Tay, W. P. (2021). *Stable Neural ODE with Lyapunov-Stable Equilibrium Points for Defending Against Adversarial Attacks.* In Advances in Neural Information Processing Systems, 34, 14925–14937.  
9. <a id="ref9"></a>Khansari-Zadeh, S. M., & Billard, A. (2014). *The LASA handwriting dataset for evaluation of trajectory generation algorithms.* Technical Report, LASA Lab, EPFL.  
10. <a id="ref10"></a>Neumann, K., & Steil, J. J. (2015). *Learning robot motions with stable dynamical systems under diffeomorphic transformations.* Robotics and Autonomous Systems, 70, 1–15.  
11. <a id="ref11"></a>Lee, J. M. (2013). *Introduction to Smooth Manifolds* (2nd ed., Graduate Texts in Mathematics, Vol. 218). Springer.  
12. <a id="ref12"></a>Perrin, N., & Schlehuber‐Caissier, P. (2016). *Fast diffeomorphic matching to learn globally asymptotically stable nonlinear dynamical systems.* Systems & Control Letters, 96, 51–59.  
13. <a id="ref13"></a>Rana, M. A., Li, A., Fox, D., Boots, B., Ramos, F., & Ratliff, N. (2020). *Euclideanizing flows: Diffeomorphic reduction for learning stable dynamical systems.* In Learning for Dynamics and Control (pp. 630–639). PMLR.  
14. <a id="ref14"></a>Urain, J., Ginesi, M., Tateo, D., & Peters, J. (2020). *ImitationFlow: Learning deep stable stochastic dynamical systems by normalizing flows.* In 2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) (pp. 5231–5237).  
15. <a id="ref15"></a>Saveriano, M., Abu-Dakka, F. J., & Kyrki, V. (2023). *Learning stable robotic skills on Riemannian manifolds.* Robotics and Autonomous Systems, 169, 104510.  
16. <a id="ref16"></a>Gupta, S., Nayak, A., & Billard, A. (2022). *Learning high dimensional demonstrations using Laplacian eigenmaps.* IEEE Robotics and Automation Letters, 7(4), 10219–10226.  
17. <a id="ref17"></a>Ravanbakhsh, H., & Sankaranarayanan, S. (2019). *Learning control-Lyapunov functions from counterexamples and demonstrations.* Autonomous Robots, 43, 275–307.  
18. <a id="ref18"></a>Jin, Z., Si, W., Liu, A., Zhang, W. A., Yu, L., & Yang, C. (2023). *Learning a flexible neural energy function with a unique minimum for globally stable and accurate demonstration learning.* IEEE Transactions on Robotics, 39(6), 4520–4538.  
19. <a id="ref19"></a>Zhi, W., Lai, T., Ott, L., & Ramos, F. (2022). *Diffeomorphic Transforms for Generalised Imitation Learning.* In Learning for Dynamics and Control, 23, 508–519.  
20. <a id="ref20"></a>Huber, L., Slotine, J. J., & Billard, A. (2023). *Avoidance of concave obstacles through rotation of nonlinear dynamics.* IEEE Transactions on Robotics, 40, 1983–2002.  
21. <a id="ref21"></a>Boumal, N. (2023). *An Introduction to Optimization on Smooth Manifolds* (2nd ed.). Cambridge University Press. ISBN 978-1108426292.
22. 

**Want to learn more ? --> Free Online Courses** TODO?

**Books**

- [Learning for Adaptive and Reactive Robot Control: A Dynamical Systems Approach](https://www.epfl.ch/labs/lasa/mit-press-book-learning/) (Chapter 9: Obstacle avoidance with Dynamical Systems)



[Back to Top](#start)