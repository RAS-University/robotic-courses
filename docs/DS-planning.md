---
title: DS-planning
parent: Courses
layout: default
math: mathjax
---
<!-- Link external JavaScript file -->
<script src="questions.js"></script>

# Dynamical-Systems-Based Planning {#start}

- Table of Contents
{:toc}


### Books

- [Learning for Adaptive and Reactive Robot Control: A Dynamical Systems Approach ](https://www.epfl.ch/labs/lasa/mit-press-book-learning/) (Chapter 9. Obstacle avoidance with Dynamical Systems)

## Prerequisites
* Basic knowledge of Dynamical system (DS)
* Control theory, system stability
* diffeomorphic mapping

## Motivation
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
  <div class="drag-item" id="Goal_convergence" draggable="true" ondragstart="drag(event)">Goal convergence</div>
  <div class="drag-item" id="Reactive_to_perturbations" draggable="true" ondragstart="drag(event)">Reactive to perturbations</div>
  <div class="drag-item" id="Open_loop_execution" draggable="true" ondragstart="drag(event)">Open-loop execution </div>
  <div class="drag-item" id="Requires_full_trajectory_specification_in_advance" draggable="true" ondragstart="drag(event)">Requires full trajectory specification in advance </div>
  <div class="drag-item" id="High_reliance_on_precise_timing" draggable="true" ondragstart="drag(event)">High reliance on precise timing </div>
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

## Chapter 1 : Dynamical-Systems–Based Planning Overview

### 1.1 Motivation & Programming-by-Demonstration

Robotic path planning via dynamical systems learns continuous, time-invariant vector fields from human demonstrations (“Programming by Demonstration”) rather than hand-crafting trajectories<sup><a href="#ref1">1</a></sup>. By modeling motions as autonomous systems

$$
\dot\xi = f(\xi),
$$

robots react immediately to perturbations, offering smooth, robust replanning<sup><a href="#ref2">2</a></sup>.

### 1.2 Classical DS Models

- **Dynamic Movement Primitives (DMP)**: encodes each degree of freedom separately with a time-dependent forcing term; yields fast one-shot learning but limited coupling across dimensions<sup><a href="#ref3">3</a></sup>.  
- **Stable Estimator of Dynamical Systems (SEDS)**: fits a Gaussian Mixture Model (GMM) to demonstrations under convex constraints guaranteeing global asymptotic stability at the goal<sup><a href="#ref2">2</a></sup>.  
- **Control-Lyapunov Function DS (CLF-DM)**: learns a Lyapunov candidate by constrained regression, ensuring stability via sum-of-squares certificates<sup><a href="#ref4">4</a></sup>.  
- **LAGS-DS (Locally Active, Globally Stable DS)**: augments a stable global attractor with local, state-dependent modulation for higher fidelity near demonstrations, yet retains global convergence<sup><a href="#ref6">6</a></sup>.  
- **Gaussian-Process DS**: Bayesian nonparametric vector fields with posterior uncertainty and stability enforced via contraction metrics<sup><a href="#ref7">7</a></sup>.  
- **Neural ODEs for DS**: parameterize $f(\xi)$ as a continuous-depth neural network, with stability imposed by spectral normalization or contraction theory<sup><a href="#ref8">8</a></sup>.

### 1.3 Benchmarks & Tools

- **LASA Handwriting Dataset**: 24 handwriting motions used extensively to compare DS methods<sup><a href="#ref9">9</a></sup>.  
- **Toolboxes**:  
  - EPFL-LASA’s SEDS ROS packages (https://github.com/epfl-lasa/icra-lfd-tutorial)  
  - EPFL-LASA’s LAGSDS ROS tasks (https://github.com/epfl-lasa/kuka-lagsds-tasks)

---

## Chapter 2 : Stability–Accuracy Dilemma

Robust DS must satisfy two often-conflicting goals:

1. **Stability**: provable global convergence to a target under any perturbation.  
2. **Accuracy**: faithful reproduction of the demonstrated trajectory.

### 2.1 Trade-off in GMM-Based DS

SEDS enforces stability by constraining the GMM covariance and means to satisfy Lyapunov inequalities, but these constraints can “flatten” the mixture components, reducing fit quality far from the goal<sup><a href="#ref2">2</a></sup>.

### 2.2 State-Dependent Modulation

LAGS-DS improves local tracking by allowing state-dependent gains near the demonstration manifold, yet sacrifices some of the stiffness of a pure global attractor<sup><a href="#ref6">6</a></sup>.

### 2.3 Extensions & Partial Contraction

- **τ-SEDS**: augments SEDS with a diffeomorphic pre-mapping to relax Lyapunov constraints, boosting accuracy while retaining stability<sup><a href="#ref10">10</a></sup>.  
- **Partial Contraction DS**: learns contracting subspaces so that local behaviors track demonstrations, then uses contraction theory for stability<sup><a href="#ref7">7</a></sup>.

---

## Chapter 3 : Diffeomorphic Mapping for DS

Mapping a simple, hand-designed—but provably stable—DS through a smooth, bijective transformation (a **diffeomorphism**) allows one to inherit stability while recovering complex accuracy.

### 3.1 Theory of Diffeomorphic Transformations

A diffeomorphism $\phi: \mathbb{R}^d \to \mathbb{R}^d$ is smooth, invertible, with smooth inverse. If

$$
\dot z = g(z)
$$

is globally stable at $z^*$, then

$$
x = \phi(z), 
\quad
\dot x = D\phi\bigl(\phi^{-1}(x)\bigr)\,g\bigl(\phi^{-1}(x)\bigr),
$$

is also globally stable at $x^* = \phi(z^*)$<sup><a href="#ref11">11</a></sup>.

### 3.2 Fast Diffeomorphic Matching (FDM)

Perrin & Schlehuber-Caissier (2016) introduce FDM to align a reference attractor to the demonstration manifold by solving large-deformation diffeomorphism matching with stability certificates<sup><a href="#ref12">12</a></sup>.

### 3.3 τ-SEDS: Diffeomorphic SEDS

Neumann & Steil (2015) embed a quadratic Lyapunov-function DS into a richer class via a learned diffeomorphism $\phi$, enabling non-quadratic behaviors (e.g. spirals) while proving global stability<sup><a href="#ref10">10</a></sup>.

### 3.4 Euclideanizing Flows (E-FLOW)

Rana, Fox & Qiu (2020) view diffeomorphism learning as a normalizing flow: compose simple parameterized maps so that $x=\phi(z)$, with $z$ following a linear stable DS. Stability follows directly from the base flow<sup><a href="#ref13">13</a></sup>.

### 3.5 Imitation Flows (I-FLOW)

Urain et al. (2020) extend E-FLOW to stochastic stabilization, pushing a simple contracting SDE through a learnable diffeomorphism via normalizing flows, ensuring both stability and expressivity<sup><a href="#ref14">14</a></sup>.

### 3.6 Riemannian Stable DS (RSDS)

Saveriano, Abu-Dakka & Kyrki (2023) learn diffeomorphic maps on manifolds (e.g. orientation on $\mathrm{SO}(3)$) via neural manifold ODEs, enforcing Lyapunov stability on Riemannian manifolds<sup><a href="#ref15">15</a></sup>.

---

## Chapter 4 : State-of-the-Art Approaches to Training the Mapping

### 4.1 Kernel & Variational Methods

- **Kernel-based Diffeo Learning**: Euclideanizing Flows initially used RKHS kernels to parameterize small diffeomorphic steps<sup><a href="#ref13">13</a></sup>.  
- **Variational Normalizing Flows**: combine neural nets with change-of-variables to maximize demonstration likelihood under the push-forward DS<sup><a href="#ref13">13</a></sup>.

### 4.2 Graph-Laplacian Embedding for Latent Space

Gupta, Nayak & Billard (2022) use Laplacian eigenmaps to linearize complex, multi-attractor DS into a low-dimensional latent space before learning diffeomorphisms<sup><a href="#ref16">16</a></sup>.

### 4.3 Neural-Lyapunov & Energy-Based Models

- **Diffeomorphic Lyapunov Functions**: learn a simple $V(z)$ in latent, then use $\phi$ to obtain a complex Lyapunov certificate in $x$-space<sup><a href="#ref17">17</a></sup>.  
- **Neural Energy Models**: flexible energy-based vector fields with guaranteed unique minima, re-parameterized by diffeo to capture spirals and limit cycles<sup><a href="#ref18">18</a></sup>.

### 4.4 Contraction & Partial Contraction Training

Learn contracting metrics in latent (e.g. via semi-definite programming or NN approximations) and enforce contraction under $\phi$ for guaranteed exponential convergence<sup><a href="#ref7">7</a></sup>.

### 4.5 Obstacle Avoidance & Higher-Order DS

- **Diffeomorphic Transforms for Imitation Learning**: Zhi et al. (2022) use learned diffeo to warp DS around obstacles, yielding reactive, stable avoidance behaviors<sup><a href="#ref19">19</a></sup>.  
- **Second-Order DS**: Huber, Slotine & Billard (2023) extend to acceleration-level control by learning diffeo on phase space, e.g. rotation-based obstacle avoidance combined with diffeomorphic stability<sup><a href="#ref20">20</a></sup>.

### 4.6 Optimization on Smooth Manifolds

Underpinning many of these methods is Riemannian optimization. Boumal’s textbook *An Introduction to Optimization on Smooth Manifolds* provides the theoretical and algorithmic foundations for gradient-based learning on $\mathrm{SO}(3)$, SPD, and general manifolds<sup><a href="#ref21">21</a></sup>.

---

## Programming exercise

[TODO]

## Want to implement a real project?

[TODO]

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
21. <a id="ref21"></a>Boumal, N. (2023). *An Introduction to Optimization on Smooth Manifolds* (2nd ed.). Cambridge University Press. ISBN 978-1108426292  





# Want to learn more ? --> Free Online Courses

[Back to Top](#start)