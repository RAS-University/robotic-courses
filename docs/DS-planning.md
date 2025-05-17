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

Robotic path planning via dynamical systems learns continuous, time-invariant vector fields from human demonstrations (“Programming by Demonstration”) rather than hand‐crafting trajectories^[1].  By modeling motions as autonomous systems
$$
\dot \xi = f(\xi),
$$
robots react immediately to perturbations, offering smooth, robust replanning^[2].

### 1.2 Classical DS Models

- **Dynamic Movement Primitives (DMP)**: encodes each degree of freedom separately with a time-dependent forcing term; yields fast one-shot learning but limited coupling across dimensions^[3].  
- **Stable Estimator of Dynamical Systems (SEDS)**: fits a Gaussian Mixture Model (GMM) to demonstrations under convex constraints guaranteeing global asymptotic stability at the goal^[4].  
- **Control-Lyapunov Function DS (CLF-DM)**: learns a Lyapunov candidate by constrained regression, ensuring stability via sum-of-squares certificates^[5].

- **LAGS-DS (Locally Active, Globally Stable DS)**: augments a stable global attractor with local, state-dependent modulation for higher fidelity near demonstrations, yet retains global convergence^[6].  
- **Gaussian-Process DS**: Bayesian nonparametric vector fields with posterior uncertainty and stability enforced via contraction metrics^[7].  
- [TODO] **Neural ODEs for DS**: parameterize \(f(\xi)\) as a continuous-depth neural network, with stability imposed by spectral normalization or contraction theory^[8].

### 1.3 Benchmarks & Tools

- **LASA Handwriting Dataset**: 24 handwriting motions used extensively to compare DS methods^[9].  
- **Toolboxes**: 
  - EPFL-LASA’s SEDS ROS packages (http: [TODO])
  - EPFL-LASA's LAGSDS ROS package (http: [TODO])
  - more [TODO]
---

## Chapter 2 : Stability–Accuracy Dilemma

Robust DS must satisfy two often-conflicting goals:

1. **Stability**: provable global convergence to a target under any perturbation.  
2. **Accuracy**: faithful reproduction of the demonstrated trajectory.

### 2.1 Trade-off in GMM-Based DS

SEDS enforces stability by constraining the GMM covariance and means to satisfy Lyapunov inequalities, but these constraints can “flatten” the mixture components, reducing fit quality far from the goal^[4].

### 2.2 State-Dependent Modulation

LAGS-DS improves local tracking by allowing state-dependent gains near the demonstration manifold, yet sacrifices some of the stiffness of a pure global attractor^[6].

### 2.3 Extensions & Partial Contraction

- **τ-SEDS**: augments SEDS with a diffeomorphic pre-mapping to relax Lyapunov constraints, boosting accuracy while retaining stability^[10].  
- **Partial Contraction DS**: learns contracting subspaces so that local behaviors track demonstrations, then uses contraction theory for stability^[7].

---

## Chapter 3 : Diffeomorphic Mapping for DS

Mapping a simple, hand-designed—but provably stable—DS through a smooth, bijective transformation (a **diffeomorphism**) allows one to inherit stability while recovering complex accuracy.

### 3.1 Theory of Diffeomorphic Transformations

A diffeomorphism \(\phi:\mathbb{R}^d\to\mathbb{R}^d\) is smooth, invertible, with smooth inverse.  If
$$
\dot z = g(z)
$$
is globally stable at \(z^*\), then
$$
x = \phi(z), 
\quad 
\dot x = D\phi\bigl(\phi^{-1}(x)\bigr)\,g\bigl(\phi^{-1}(x)\bigr)
$$
is also globally stable at \(x^*=\phi(z^*)\)^[11].

### 3.2 Fast Diffeomorphic Matching (FDM)

Perrin & Schlehuber‐Caissier (2016) introduce FDM to align a reference attractor to the demonstration manifold by solving large-deformation diffeomorphism matching with stability certificates^[12].

### 3.3 τ-SEDS: Diffeomorphic SEDS

Neumann & Steil (2015) embed a quadratic Lyapunov‐function DS into a richer class via a learned diffeomorphism \(\phi\), enabling non-quadratic behaviors (e.g. spirals) while proving global stability^[10].

### 3.4 Euclideanizing Flows (E-FLOW)

Rana, Fox et al. (2020) view diffeomorphism learning as a normalizing flow: compose simple parameterized maps so that \(x=\phi(z)\), with \(z\) following a linear stable DS.  Stability follows directly from the base flow^[13].

### 3.5 Imitation Flows (I-FLOW)

Extending E-FLOW to stochastic stabilization, “Imitation Flow” models noisy demonstrations by pushing a simple contracting SDE through a learnable diffeomorphism via normalizing flows, ensuring both stability and expressivity^[14].

### 3.6 Riemannian Stable DS (RSDS)

Zhang et al. (2022) learn diffeomorphic maps on manifolds (e.g. orientation on \(\mathrm{SO}(3)\)) via neural manifold ODEs, enforcing Lyapunov stability on Riemannian manifolds^[15].

---

## Chapter 4 : State-of-the-Art Approaches to Training the Mapping

### 4.1 Kernel & Variational Methods

- **Kernel-based Diffeo Learning**: Euclideanizing Flows initially used RKHS kernels to parameterize small diffeomorphic steps^[13].  
- **Variational Normalizing Flows**: combine neural nets with change-of-variables to maximize demonstration likelihood under the push-forward DS^[13].

### 4.2 Graph-Laplacian Embedding for Latent Space

Stith & Bernardo use Laplacian Eigenmaps to linearize complex, multi-attractor DS into a low-dimensional latent space before learning diffeomorphisms, blending manifold learning with DS stability^[16].

### 4.3 Neural-Lyapunov & Energy-Based Models

- **Diffeomorphic Lyapunov Functions**: learn a simple \(V(z)\) in latent, then use \(\phi\) to obtain a complex Lyapunov certificate in \(x\)-space^[17].  
- **Neural Energy Models**: flexible energy-based vector fields with guaranteed unique minima, re-parameterized by diffeo to capture spirals and limit cycles^[18].

### 4.4 Contraction & Partial Contraction Training

Learn contracting metrics in latent (e.g. via semi-definite programming or NN approximations) and enforce contraction under \(\phi\) for guaranteed exponential convergence^[7].

### 4.5 Obstacle Avoidance & Higher-Order DS

- **Diffeomorphic Transforms for Imitation Learning**: Zhi et al. use learned diffeo to warp DS around obstacles, yielding reactive, stable avoidance behaviors^[19].  
- **Second-Order DS**: extend to acceleration-level control by learning diffeo on phase space, e.g. rotation-based obstacle avoidance combined with diffeomorphic stability^[20].

### 4.6 Optimization on Smooth Manifolds

Underpinning many of these methods is Riemannian optimization.  Boumal’s textbook “An Introduction to Optimization on Smooth Manifolds” provides the theoretical and algorithmic foundations for gradient-based learning on \(\mathrm{SO}(3)\), SPD, and general manifolds^[21].

---

## Programming exercise
[TODO]

## Want to implement a real project?
[TODO]

## References

1. Argall, B. D., Chernova, S., Veloso, M., & Browning, B. (2009). A survey of robot learning from demonstration. Robotics and autonomous systems, 57(5), 469-483.
2. Khansari-Zadeh, S. M., & Billard, A. (2011). Learning stable nonlinear dynamical systems with gaussian mixture models. IEEE Transactions on Robotics, 27(5), 943-957.
3. Pastor, P., Hoffmann, H., Asfour, T., & Schaal, S. (2009, May). Learning and generalization of motor skills by learning from demonstration. In 2009 IEEE international conference on robotics and automation (pp. 763-768). IEEE.
4. Khansari-Zadeh, S. M., & Billard, A. (2014). Learning control Lyapunov function to ensure stability of dynamical system-based robot reaching motions. Robotics and Autonomous Systems, 62(6), 752-765.
5. Khansari-Zadeh, S. M., & Billard, A. (2012). A dynamical system approach to realtime obstacle avoidance. Autonomous Robots, 32, 433-454.
6. Kronander, K., Khansari, M., & Billard, A. (2015). Incremental motion learning with locally modulated dynamical systems. Robotics and Autonomous Systems, 70, 52-62.
7. Kolter, J. Z., & Manek, G. (2019). Learning stable deep dynamics models. Advances in neural information processing systems, 32.
8. Kang, Q., Song, Y., Ding, Q., & Tay, W. P. (2021). Stable neural ode with lyapunov-stable equilibrium points for defending against adversarial attacks. Advances in Neural Information Processing Systems, 34, 14925-14937.
9. Khansari-Zadeh, S. M., & Billard, A. (2014). *The LASA handwriting dataset for evaluation of trajectory generation algorithms.* Technical Report, LASA Lab, EPFL.  
10. Neumann, K., & Steil, J. J. (2015). Learning robot motions with stable dynamical systems under diffeomorphic transformations. Robotics and Autonomous Systems, 70, 1-15.
11. Lee, J. M., & Lee, J. M. (2003). Smooth manifolds (pp. 1-29). Springer New York.
12. Perrin, N., & Schlehuber-Caissier, P. (2016). Fast diffeomorphic matching to learn globally asymptotically stable nonlinear dynamical systems. Systems & Control Letters, 96, 51-59.
13. Rana, M. A., Li, A., Fox, D., Boots, B., Ramos, F., & Ratliff, N. (2020, July). Euclideanizing flows: Diffeomorphic reduction for learning stable dynamical systems. In Learning for Dynamics and Control (pp. 630-639). PMLR.
14. Urain, J., Ginesi, M., Tateo, D., & Peters, J. (2020, October). Imitationflow: Learning deep stable stochastic dynamic systems by normalizing flows. In 2020 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS) (pp. 5231-5237). IEEE.
15. Saveriano, M., Abu-Dakka, F. J., & Kyrki, V. (2023). Learning stable robotic skills on Riemannian manifolds. Robotics and Autonomous Systems, 169, 104510.
16. Gupta, S., Nayak, A., & Billard, A. (2022). Learning high dimensional demonstrations using laplacian eigenmaps. arXiv preprint arXiv:2207.08714.
17. Ravanbakhsh, H., & Sankaranarayanan, S. (2019). Learning control lyapunov functions from counterexamples and demonstrations. Autonomous Robots, 43, 275-307.
18. Jin, Z., Si, W., Liu, A., Zhang, W. A., Yu, L., & Yang, C. (2023). Learning a flexible neural energy function with a unique minimum for globally stable and accurate demonstration learning. IEEE Transactions on Robotics, 39(6), 4520-4538.
19. Zhi, W., Lai, T., Ott, L., & Ramos, F. (2022, May). Diffeomorphic Transforms for Generalised Imitation Learning. In L4DC (pp. 508-519).
20. Huber, L., Slotine, J. J., & Billard, A. (2023). Avoidance of concave obstacles through rotation of nonlinear dynamics. IEEE Transactions on Robotics, 40, 1983-2002.
21. Boumal, N. (2023). An introduction to optimization on smooth manifolds. Cambridge University Press.









# Want to learn more ? --> Free Online Courses

[Back to Top](#start)