---
title: Model predictive Control 
parent: Courses Nonlinear Control
layout: default
nav_order: 7
author: Julian Ruiz Rodriguez (EPFL)
---

<!-- # Model predictive Control -->

<!--Decompose the course into chapters

You can use Slotine's book and lectures: https://web.mit.edu/nsl/www/videos/lectures.html to help you construct the course.

You can also use some of the material from Alireza Karimi's course. Make sure to add all sources in credits.

 -->

- Table of Contents
{:toc}

<!-- Styles definitions for the page -->

<style>
  .ytb-window{
    border-left: 4px solid #053838;
    background: #f8f9fa;
    padding: 1em;
  }

  .formula-window{
    border-left: 4px solid #E7250C; 
    background: #f8f9fa; 
    padding: 1em;
  }

.lemma-window {
  border: 2px solid #e7260c;   /* Red outline */
  border-radius: 10px;         /* Rounded edges */
  background: #ffffff;         /* Clean white background */
  width: 725px;
  margin: 2em auto;
  padding: 1em 1.2em;          /* Add padding for readability */
  box-shadow: 0 2px 8px rgba(226, 42, 60, 0.05);
}
.lemma-title {
  font-weight: bold;           
  font-size: 1em;              /* Same size as normal text */
  background: none;            /* Remove red background */
  color: #e7260c;              /* Make text red to match the outline */
  margin-bottom: 0.5em;        /* Add spacing after the title */
}
 .remark-window {
  border: 2px solid #4F3DDB;   /* Red outline */
  border-radius: 10px;         /* Rounded edges */
  background: #ffffff;         /* Clean white background */
  width: 725px;
  margin: 2em auto;
  padding: 1em 1.2em;          /* Add padding for readability */
  box-shadow: 0 2px 8px rgba(226, 42, 60, 0.05);
}
.remark-title {
  font-weight: bold;           
  font-size: 1em;              /* Same size as normal text */
  background: none;            /* Remove red background */
  color: #4F3DDB;              /* Make text red to match the outline */
  margin-bottom: 0.5em;        /* Add spacing after the title */
}

  .tab-window {
    border: 2px solid #4F3DDB;
    border-radius: 10px;
    background: #f8f9fa;
    width: 740px;
    margin: 1.5em auto;
    box-shadow: 0 2px 8px rgba(42,122,226,0.08);
  }

  .quizz-window {
    border: 2px solid #73C47C;
    border-radius: 10px;
    background: #f8f9fa;
    width: 700px;
    margin: 2em auto;
    box-shadow: 0 2px 8px rgba(48, 226, 42, 0.08);
  }

  .tab-title {
    background: #4F3DDB; 
    padding: 0.5em; 
    font-size: 1.2em; 
    font-weight: bold; 
    color: #fff; 
    border-top-left-radius: 5px; 
    border-top-right-radius: 5px;
  }

  .quizz-title {
    background: #73C47C; 
    padding: 0.5em; 
    font-size: 1.2em; 
    font-weight: bold; 
    color: #f8f9fa; 
    border-top-left-radius: 5px; 
    border-top-right-radius: 5px;
  }


  .tab-header {
    display: flex;
    border-bottom: 1px solid #4F3DDB;
  }

  .quizz-header {
    display: flex; 
    align-items: center; 
    gap: 16px; 
    margin-bottom: 12px;
  }

  .images{
    display: flex; 
    justify-content: center; 
    gap: 20px;
  }

  .tab-btn {
    flex: 1;
    padding: 0.7em 1em;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
    color: #2a7ae2;
    transition: background 0.2s;
  }
  .tab-btn.active {
    background: #4F3DDB;
    color: #fff;
  }
  .tab-content {
    display: none;
    padding: 1em;
  }
  .tab-content.active {
    display: block;
  }
  .code-window {
  background: #f4f4f8;
  border: 2px solid #4F3DDB;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(79,61,219,0.08);
  padding: 1.2em;
  margin: 2em 0;
  font-size: 0.8em;
  overflow-x: auto;
}
.code-window code {
  background: none;
  color: #222;
  font-family: 'Fira Mono', 'Consolas', 'Menlo', 'Monaco', monospace;
  font-size: 1em;
}
</style>

<!-- Script definitions for the page -->

<script>
function checkQuizAnswer(quizId) {
  var quiz = document.getElementById(quizId);
  var radios = quiz.querySelectorAll('input[type="radio"]');
  var result = quiz.querySelector('#quizResult');
  var selected = '';
  radios.forEach(radio => { if (radio.checked) selected = radio.value; });
  if (!selected) {
    result.textContent = 'Please select an answer.';
    result.style.color = '#E7250C';
    return;
  }
  if (quizId === 'quizzConvex1') {
    if (selected === 'a') {
      result.textContent = 'Correct! This set is indeed convex.';
      result.style.color = '#73C47C';
    } else if (selected === 'b') {
      result.innerHTML = 'Incorrect. This set is not convex. If a line segment connects two points in Set B, it may lie outside the set.<br> <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_noncovex_shape_correction.png" alt="nonconvex set" width="130"/>';
      result.style.color = '#E7250C';
    } else if (selected === 'c') {
      result.textContent = 'Incorrect. This set is not convex. Some borders of the set are not defined, that\'s why a segment connecting two points on the edge lie outside the set.';
      result.style.color = '#E7250C';
    }
  }
}
</script>

<script>
function showTab(idx, windowId) {
  var windowElem = document.getElementById(windowId);
  var btns = windowElem.querySelectorAll('.tab-btn');
  var tabs = windowElem.querySelectorAll('.tab-content');
  btns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
  tabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
}
</script>

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  TeX: {
    equationNumbers: {
      autoNumber: "AMS"
    },
    extensions: ["AMSmath.js", "AMSsymbols.js"]
  }
});
</script>

<style>
  #back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color:rgb(0, 0, 0); /* Green background */
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    font-size: 30px;
    cursor: pointer;
    text-decoration: none;
    z-index: 1000;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  #back-to-top:hover {
    opacity: 1;
  }
</style>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# 6.3 Model Predictive Control

*Feedback: because the universe refuses to wait for you to get it right.*

## 6.3.1 Prerequisites

* Linear Algebra
* Differential equations
* probability and statistics
* Control theory :
    - First- and second-order system response
    - Transfer functions and feedback
    - Linear Time Invariant (LTI) Systems
* Signals and Systems :
    - Time-domain analysis
    - Frequency-domain analysis
* Optimization :
    - Convex sets and functions
    - Unconstrained and constrained optimization
    - Numerical optimization methods

---

## 6.3.2 Notations

<!-- ## Mathematical notation -->

<!-- | Symbol                            | Meaning                                                           |
|-----------------------------------|-------------------------------------------------------------------|
| $\exists$                         | there exists                                                      |
| $\in$                             | is an element of                                                  |
| $\forall$                         | for all                                                           |
| $\Rightarrow, \; \Leftarrow$      | implies; is implied by                                            |
| $\nRightarrow, \; \nLeftarrow$    | does not imply; is not implied by                                 |
| $a := b$                          | $a$ is defined to be equal to $b$                                 |
| $a =: b$                          | $b$ is defined to be equal to $a$                                 |
| $\approx$                         | approximately equal                                               |
| $V(\cdot)$                        | function $V$                                                      |
| $V: A \to B$                     | $V$ is a function mapping set $A$ into set $B$                    |
| $x \mapsto V(x)$                  | function $V$ maps variable $x$ to value $V(x)$                    |
| $x^+$                             | value of $x$ at next sample time (discrete time system)           |
| $\dot{x}$                         | time derivative of $x$ (continuous time system)                   |
| $f_x$                             | partial derivative of $f(x)$ with respect to $x$                  |
| $\nabla$                          | nabla or del operator                                             |
| $\delta$                          | unit impulse or delta function                                    |
| $\|x\|$                           | absolute value of scalar; norm of vector (two-norm unless stated) |
| **x** or $x$                | sequence of vector-valued variable $x$, $(x(0), x(1), \dots)$     |
| $\|x\|$                           | $\sup_{i \geq 0} \|x(i)\|$ (sup norm over a sequence)             |
| $\|x\|_{a:b}$                     | $\max_{a \leq i \leq b} \|x(i)\|$                                 | -->

<!-- ## Subscripts, Superscripts, and Accents -->

Throughout this lecture notes, we will use the following subscripts, superscripts, and accents to denote specific meanings:

- $x \in \mathbb{R}^{1\times n}$: vector $x$ of dimension $n$
- $x_i$ with $i \in \mathbb{N}$, $i=1,\cdots,n$ for $x\in\mathbb{R}^{1\times n}$: component $i$ of vector $x$
- $x_k$: value of $x$ at time step $k$ (discrete time)
<!-- - $x_{i\mid k}$ with $i \in \mathbb{N}$, $i=1,\cdots,n$ for $x\in\mathbb{R}^{1\times n}$: component $i$ of vector $x$ at time step $k$ -->
- $x^+$ or $x_{k+1}$: value of $x$ at next time step (discrete time)
- $\dot{x}$: time derivative of $x$ (continuous time)
- $x^*$: optimal value of $x$
- $x^\top$: transpose of vector or matrix $x$
- $\hat{x}$: estimate of variable $x$ (see chapter on [State Estimation](#-14-intro-to-state-estimation-))
- $\hat{x}^-$: estimate of variable $x$ before measurement update
- $\tilde{x}$: estimation error of variable $x$
- $x_s$: steady state value of variable $x$


<!-- | Symbol         | Meaning                                               |
|----------------|-------------------------------------------------------|
| $\hat{x}$      | estimate                                              |
| $\hat{x}^-$    | estimate before measurement                           |
| $\tilde{x}$    | estimate error                                        |
| $x_s$          | steady state                                          |
| $x_i$          | subsystem $i$ in a decomposed large-scale system      |
| $x_{sp}$       | setpoint                                              |
| $V^0$          | optimal                                               |
| $V^{uc}$       | unconstrained                                         |
| $V^{sp}$       | unreachable setpoint                                  | -->

---

## 6.3.3 General Motivation

<!-- Introduce limitation of "classical feedback control" and the need for more, -->

Even though feedback control has been applied for more than two millennia, the systematic analysis of dynamical systems is relatively recent, beginning with James Clerk Maxwell’s pioneering work about 150 years ago. Since then, the field has advanced spectacularly, driven by contributions from mathematicians, engineers, and physicists alike. Laplace, Lyapunov, Kolmogorov, Wiener, Nyquist, Bode, and Bellman are just a few of the towering figures who shaped what we know today as control theory.

Despite these advancements, classical control methods often struggle with complex, high-dimensional systems, particularly those with constraints and uncertainties. This has led to the exploration of more advanced control strategies, such as Model Predictive Control (MPC), which explicitly considers system constraints and optimizes control actions over a prediction horizon.

In the pursuit of optimality one is therefore forced to consider approximate solutions, and this is perhaps the single most important reason behind the phenomenal success of model predictive control (MPC). MPC is arguably the most widely accepted modern control strategy because it offers, through its receding horizon implementation, an eminently sensible compromise between optimality and speed of computation.

MPC has found applications in various fields, including chemical process control, automotive systems, aerospace, and robotics. Its ability to handle multivariable systems and constraints makes it a powerful tool for modern control challenges.

---

## 6.3.4 Course Content

### 6.3.4.1: Introduction to MPC

[See notations](#notations)

In control theory, we usually talk about controllers and regulators. A controller is a device or algorithm that manages the behavior of a system to achieve a desired outcome. Controllers can be simple, like a thermostat that maintains room temperature, or complex, like those used in aerospace applications to stabilize aircraft. A regulator, on the other hand, is a specific type of controller that focuses on maintaining a system's output at a desired setpoint, often by minimizing deviations from that setpoint. Regulators are commonly used in systems where stability and precision are crucial, such as in power supply systems or industrial processes.

---

#### Linear Quadratic Regulator (LQR)

In this introductory chapter, we will explore a specific type of regulator known as the Linear Quadratic Regulator (LQR). The LQR is a fundamental concept in control theory that provides an optimal solution for controlling linear systems with quadratic cost functions. We will delve into the mathematical formulation of LQR, its properties, and its applications in various engineering fields. To help illustrate these concepts, we will refer to a video lecture by Christopher Lum, which provides a comprehensive overview of LQR.

You might ask yourself, why quadratic? The quadratic cost function is chosen for several reasons:
1. **Mathematical Convenience**: Quadratic functions are mathematically tractable, allowing for analytical solutions in many cases. This makes it easier to derive optimal control laws.
2. **Convexity**: Quadratic functions are convex, which ensures that any local minimum is also a global minimum. This property is crucial for optimization problems, as it guarantees that the solution found is the best possible one. (see the mathematical foundation on [optimization](optimization))

<iframe width="735" height="413"
  src="https://www.youtube.com/embed/wEevt2a4SKI?si=jZOiS9c6RWdX-cTm?&start=1165"
  title="LQR - Linear Quadratic Regulator" 
  frameborder="0" 
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

<div class="ytb-window">
    This video provides a comprehensive overview of the Linear Quadratic Regulator (LQR), a fundamental concept in control theory. It explains how LQR is used to design optimal controllers for linear systems by minimizing a quadratic cost function, balancing performance and control effort. The video covers the mathematical formulation, solution methods, and practical applications of LQR in various engineering fields.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Video from 19:25 to 41:35 | Source: Christopher Lum - YouTube  
        <a href="https://youtu.be/wEevt2a4SKI?si=jZOiS9c6RWdX-cTm" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

<!-- **Video transcript :** -->

<u>Setting up the optimization problem:</u>

To understand the Linear Quadratic Regulator (LQR), let's consider a practical example. We will consider a dynamical system with multiple states and multiple control inputs, such as a satellite for example. Our system has several states that need to be controlled or monitored, for example its orientation, position, etc. We represent the state of the satellite as a vector $x(t) \in \mathbb{R}^n$, where $t$ is the time and $n$ is the dimension of the vector, i.e. the amount of state that we identified in the system. We will denote $x_i$ with $i \in \mathbb{N}$, $i = 1, \cdots, n$ the state $i$ of the satellite. The state vector is represented as follow: 

<div>
  \[
    x(t) = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ \end{bmatrix} \quad \left\{\begin{matrix} \text{orientation} \\ \text{position} \\ \vdots \\ \end{matrix}\right.
  \]
</div>

The satellite might have also multiple control inputs that we can use to influence its state, for example main thrusters, electrical thrusters, momentum wheels, etc. We represent the control inputs as a vector $u(t) \in \mathbb{R}^m$, with $m$ input commands identified by the components $u_i$ with $i=1,\cdots, m$. The control vector is represented as follow:

<div>
  \[
    u(t) = \begin{bmatrix} u_1 \\ u_2 \\ u_3 \\ \vdots \\ \end{bmatrix} \quad \left\{\begin{matrix} \text{main thrusters} \\ \text{electrical thrusters} \\ \text{momentum wheels} \\ \vdots \\ \end{matrix}\right.
  \]
</div>

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_satellite.jpg" alt="Satellite" width="450"/>
    </figure>
</div>

We will assume that the dynamics of this system is linear, governed by the following state-space representation:
$$
\dot{x}(t) = Ax(t) + Bu(t)\tag{1.1.1}\label{eq:1_1_dynamics}
$$

With $A \in \mathbb{R}^{n \times n}$ the state matrix and $B \in \mathbb{R}^{n \times m}$ the input matrix. These matrices define how the state of the system evolves over time and how the control inputs affect the state, they are usually fixed and defined by the physics of the system. The goal of the controller is to determine the appropriate control inputs $u(t)$ that will drive the state $x(t)$ to a desired state, often the origin (zero state), while minimizing a cost function that penalizes deviations from the desired state and excessive control effort.

<div class="lemma-window">
  <div class="lemma-title" id="cost-func">LQR cost function</div>
  <div>
  In this context, we formulate a cost function for our optimization problem (continuous time):
  \[
  J(x(t),u(t)) = \int_0^\infty \left( x(t)^\top Q x(t) + u(t)^\top R u(t) \right) dt \tag{1.1.2} \label{eq:cost_func_ct}
  \]
  \[
  \begin{aligned}
  \text{Where:} \quad & x(t) \in \mathbb{R}^{n\times 1} \text{ continuous time state vector} \\ 
  & u(t) \in \mathbb{R}^{m\times 1} \text{ continuous time control vector}\\ 
  & Q \in \mathbb{R}^{n\times n}, Q \geq 0 \text{ or } Q \succeq 0 \text{, symmetric positive semi-definite matrix} \\ 
  & R \in \mathbb{R}^{m\times m}, R > 0 \text{ or } R \succ 0  \text{, symmetric positive definite matrix}
  \end{aligned}
  \]

  We can also defined the cost function $J(x, u)$ for discrete time systems and a finite horizon, as follows:
  \[
    J(x, u) = \sum_{t=0}^{T-1} \left( x_t^\top Q x_t + u_t^\top R u_t \right) + x_T^\top S x_T \tag{1.1.3} \label{eq:cost_func_dt}
  \]
  \[
    \begin{aligned}
    \text{Where:} \quad & x \in \mathbb{R}^{n\times 1} \text{ discrete time state vector}\\ 
    & u \in \mathbb{R}^{m\times 1} \text{ discrete time control vector}\\ 
    & Q \in \mathbb{R}^{n\times n}, \succeq 0 \text{ symmetric positive semi-definite matrix} \\ 
    & R \in \mathbb{R}^{m\times m}, \succ 0 \text{ symmetric positive definite matrix} \\
    & S \in \mathbb{R}^{n\times n}, \succeq 0 \text{ symmetric positive semi-definite matrix (terminal cost)}
    \end{aligned}
  \]
  </div>
</div>

<details markdown="1">
<summary><strong>Positivity semi-definite and definite matrices</strong></summary>
  Positive semi-definite:
  $$
    x^\top Q x \geq 0, \quad \forall\ x
  $$
  <div>
    \[
      \begin{align}
      \text{Where:} \quad & x \in \mathbb{R}^{1 \times n} \\
      & Q \in \mathbb{R}^{n \times n} \\
      & x^\top \in\mathbb{R}^{n \times 1} \\
      \end{align}
    \]
  </div>
  Similarly, positive definite:
  $$
  u^\top R u > 0, \quad \forall\ u
  $$
  <div>
    \[
      \begin{align}
      \text{Where:} \quad & u \in \mathbb{R}^{1 \times m} \\
      & R \in \mathbb{R}^{m \times m} \\
      & u^\top \in \mathbb{R}^{m \times 1} \\
      \end{align}
    \]
  </div>

  The terms $x(t)^\top Q x(t)$ and $u(t)^\top R u(t)$ are scalars. This is because:
  - $x(t)^\top$ is a $1 \times n$ vector
  - $Q$ is a $n \times n$ matrix
  - $x(t)$ is a $n \times 1$ vector
  
  Thus, the multiplication $x(t)^\top Q x(t)$ results in a $1 \times 1$ matrix, which is a scalar. The same reasoning applies to the term $u(t)^\top R u(t)$.
<!-- 
  We can notice the that is exactly the terms that we have in the cost function \eqref{eq:cost_func_ct}. -->
</details>

The way the **cost function** $J$ is set up here leads to the integral always being positive (due to the properties of $Q$ and $R$), for any $x(t)$ and $u(t)$ combination. The matrices $Q$ and $R$ are weighting matrices that allow us to tune the cost function, where these matrices tradeoff between non-zero states and non-zero control inputs. We will be thinking about $Q$ and $R$ as weights to determine how much we value state compared to how much we value control.

The next step is to formulate the optimization problem, which consists in finding the control input $u(t)$ that minimizes the cost function $J$ while satisfying the dynamics of the system \eqref{eq:1_1_dynamics}. This can be expressed mathematically by the value function $V(x)$ defined in the box below.

<div class="lemma-window">
  <div class="lemma-title" id="value-func">Value function</div>
  <div>

  The value function for a continuous time system $V(x)$ is defined as the minimum cost-to-go, starting from state $x$ at time $t$:

  \[
    \tag{1.1.4} \label{eq:value-func-ct}
    \begin{aligned}
      V(x) = \inf_{u(\cdot) \in \mathcal{U}} & \int_{0}^{\infty} \left( x(\tau)^\top Q x(\tau) + u(\tau)^\top R u(\tau) \right) d\tau \\
      \text{s.t.} \quad & \dot{x}(\tau) = A x(\tau) + B u(\tau) \\
      & x(0) = x
    \end{aligned}
  \]

  The value function for a discrete time system is defined as:

  \[
    \tag{1.1.5} \label{eq:value-func-dt}
    \begin{aligned}
      V_t(x) = \min_{u_t, \ldots, u_{T-1}} & \sum_{k=t}^{T-1} \left( x_k^\top Q x_k + u_k^\top R u_k \right) + x_T^\top S x_T \\
      \text{s.t.} \quad & x_{k+1} = A x_k + B u_k, \quad k = t, \ldots, T-1 \\
      & x_t = x
    \end{aligned}
  \]

  $V_0(x_0)$ is the optimal cost.

  </div>
</div>

It is basicly saying that we want to find the control input $u(t)$ that minimizes the cost function $J$ while satisfying the dynamics of the system \eqref{eq:1_1_dynamics}.
<!-- 
**Visualization Example:** -->

If we take an initial non-zero state for our satellite, i.e. $x(0) \neq 0$, the satellite is at some weird orientation and position, non-zero (unwanted state). Thus the term $x(t)^\top Q x(t)$ in the cost function \eqref{eq:cost_func_ct} is non-zero and **positive**. If left in that state without any control input, the cost function $J$ will blow up to infinity as time goes on. This is because the integral from time 0 to infinity in \eqref{eq:cost_func_ct} accumulates the positive value of $x(t)^\top Q x(t)$ over time.

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_state_no_ctrl.png" alt="cst state" width="280"/>
        <figcaption style="text-align: center;">Constant state</figcaption>
    </figure>
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_cost_explosion.png" alt="growth J" width="280"/>
        <figcaption style="text-align: center;">Growth of cost function for a constant state$^*$</figcaption>
    </figure>
</div>

This is not an optimal solution, we can't leave the satellite in that state as it will yields a cost value of infinity. Instead, what is better is to try to bring back the system to the origin, i.e. $x(t) \to 0$. This will make the term $x(t)^\top Q x(t)$ in the cost function \eqref{eq:cost_func_ct} decrease over time, thus the integral will converge to a finite value. This is a much better solution as it minimizes the cost function $J$.

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_state_decrease.png" alt="cst state" width="280"/>
        <figcaption style="text-align: center;">Decreasing state</figcaption>
    </figure>
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_finit_cost.png" alt="finite J" width="280"/>
        <figcaption style="text-align: center;">Growth of cost function for a decreasing state$^*$</figcaption>
    </figure>
</div>

$^*$_The plots are illustrative and not based on actual numerical simulations._

The flip side of the story is how to bring the state back to zero. In our case, we can use thrusters, momentum wheels, etc. to influence the state of the satellite, meaning we can use the control input $u(t)$. However, using $u(t)$ also comes with a cost, represented by the term $u(t)^\top R u(t)$ in the cost function \eqref{eq:cost_func_ct}. If we use too much control input, this term will become large and will also contribute to increasing the cost function $J$.

The cost function is a combination of how long the system is away from the origin (non-zero state) and how much non-zero control input we are using to bring it back to the origin. The goal is to find a balance between these two competing objectives, minimizing the overall cost function $J$.

The matrices $Q$ and $R$ allow us to determine how much we value the state being zero compared to how much we value the control input to be zero. For example, if we set $Q$ to be very "large" and $R$ to be very "small", we are saying that we care a lot about bringing the state back to zero, even if it means using a lot of control input. Conversely, if we set $Q$ to be very "small" and $R$ to be very "large", we are saying that we care more about minimizing the control input, even if it means the state takes longer to return to zero. We say that a control policy is **aggressive** when $Q$ is large and $R$ is small, and **conservative** when $Q$ is small and $R$ is large.

_Note: the terms "large" and "small" here are relative knowing that $Q$ and $R$ are matrices and can be of different sizes._

<details markdown="1">
  <summary><strong>Example: 2 states, 2 control system</strong></summary>
  <div style="border: 2px dashed #2a7ae2; border-radius: 10px; background: #f8f9fa; padding: 1.5em; margin: 2em 0;">
    <strong style="color: #2a7ae2; font-size: 1.1em;">2 states, 2 control system</strong><br><br>
    Let's consider a simple example with 2 states and 2 control inputs. The state vector $x(t)$ and control vector $u(t)$ can be represented as:
    \[
    x(t) = \begin{bmatrix} x_1(t) \\ x_2(t) \end{bmatrix}
    \quad
    u(t) = \begin{bmatrix} u_1(t) \\ u_2(t) \end{bmatrix}
    \]
    In this case, the matrices $Q$ and $R$ will be $2\times 2$ matrices. Let's choose:
    \[
    Q = \begin{bmatrix} q_{11} & 0 \\ 0 & q_{22} \end{bmatrix} 
    \quad
    R = \begin{bmatrix} r_{11} & 0 \\ 0 & r_{22} \end{bmatrix}
    \]
    Where $q_{11}, q_{22}, r_{11}, r_{22}$ are positive scalars. 

    Let's compute the integrand of the cost function $J$:
    \[
    x(t)^\top Q x(t) + u(t)^\top R u(t) = q_{11} x_1(t)^2 + q_{22} x_2(t)^2 + r_{11} u_1(t)^2 + r_{22} u_2(t)^2
    \]

    We can identify $q_{11}$ as the penalty or the weight on the non-zero state $x_1(t)$, $q_{22}$ as the penalty on the non-zero state $x_2(t)$. The $Q$ matrix, by tunning the entries appropriately, allows us to tune how much we care about each state being non-zero.

    Similarly, $r_{11}$ as the penalty on the non-zero control input $u_1(t)$, and $r_{22}$ as the penalty on the non-zero control input $u_2(t)$. Hence, the $R$ matrix allows us to tune how much we care about each control input being non-zero.

    By adjusting these weights, we can shape the behavior of the optimal control policy to meet our specific requirements.
  </div>
</details>

This allows us to set up the optimization problem that we want to solve and to have a good understanding of what the cost function represents and how the matrices $Q$ and $R$ influence the solution.

<div class="ytb-window">
  This concludes the transcript of the video. The following section provides additional exercises and/or explanations not included in the video.
</div>

We will see in the next chapter that in order to solve the optimization problem, we will need to solve the Riccati equation.

While the LQR provides an elegant and powerful solution for unconstrained linear systems with quadratic costs, it falls short in many practical scenarios. Real-world systems often have constraints on states and inputs (such as actuator limits, safety boundaries, or physical restrictions) that LQR cannot handle directly. Moreover, LQR assumes perfect model knowledge and does not account for disturbances or uncertainties.

Model Predictive Control (MPC) extends the ideas of LQR by explicitly incorporating constraints and optimizing control actions over a finite prediction horizon. MPC can handle multivariable systems, constraints, and even nonlinearity, making it a much more versatile and practical approach for modern control problems. Understanding MPC is therefore essential for advancing in control theory and tackling real-world engineering challenges.

---

#### The Riccati Equation

<iframe width="735" height="413"
  src="https://www.youtube.com/embed/wEevt2a4SKI?si=jZOiS9c6RWdX-cTm?&start=2497"
  title="Riccati Equation - LQR Part 2" 
  frameborder="0" 
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>

<div class="ytb-window">
    This video is the continuation of the previous one on the Linear Quadratic Regulator (LQR). It delves deeper into the mathematical formulation and solution of the LQR problem, focusing on the Riccati equation. The video explains how to derive the optimal state feedback control law using the solution of the Riccati equation, and discusses its implications for system stability and performance. It also covers practical aspects of implementing LQR in real-world control systems.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Video from 41:35 to 1:01:05 | Source: Christopher Lum - YouTube  
        <a href="https://youtu.be/wEevt2a4SKI?si=jZOiS9c6RWdX-cTm" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

**Video transcript :**

Now that we have set up the optimization problem for the Linear Quadratic Regulator (LQR), we want to solve it. We want to find a control law $u(t)$ which will make the whole system optimal. 

<div class="formula-window">
  <strong>Recall the optimization problem:</strong>
  \[
  \min_{u(t) \in \mathbb{R}^m} \quad J = \int_0^\infty \left( x(t)^\top Q x(t) + u(t)^\top R u(t) \right) dt
  \]
  \[
  \text{s.t.} \quad \dot{x}(t) = Ax(t) + Bu(t)
  \]
</div>

It is beyond the scope of this lecture to derive the solution of this optimization problem, but the optimal control law is given by a state feedback law of the form:
<div>
  \[
    u(t) = -Kx(t) \tag{1.2.1} \label{eq:feedback_law_riccati}
  \]
</div>
Where $K$ is the feedback gain matrix, which is given by:
$$
K = R^{-1} B^\top S
$$
Where $S$ is the solution of the (continuous time) algebraic Riccati equation (CARE) ($S$ as size $n \times n +$ symmetric):
<div>
\[
  A^\top S + S A - S B R^{-1} B^\top S + Q = 0 \tag{1.2.2} \label{eq:riccati}
\]
</div>

If we look back only at \eqref{eq:feedback_law_riccati}, we can see that it is only a full state feedback controller, in other words the optimal way to solve the optimization problem is to use a full state feedback controller. But in order to compute the gain matrix $K$, we need go through several steps.

<div class="lemma-window">
  <div class="lemma-title">Procedure to solve LQR problems</div>
  <div>
    <ol>
      <li>Define the system dynamics: $A$, $B$ (known from the plant)</li>
      <li>Define the cost function weights: $Q$, $R$ (tuning parameters)</li>
      <li>Solve the Riccati equation \eqref{eq:riccati} for $S$</li>
      <li>Compute the optimal gain matrix: $K = R^{-1} B^\top S$</li>
      <li>Choose the $K$ solution that yield a stable system</li>
    </ol>
  </div>
</div>

Let take an example to illustrate the procedure. Consider a mass damper system, in which a mass $m$ is on a smooth surface (ice for example) and there is some viscous damping with coefficient c between the surface and the block. We will only consider the horizontal position and velocity of the block as states, and a unique control input which is a force $F(t)$ that we can apply to the block. The dynamics of this system are given by newton's second law of motion:
<div>
\[
m\ddot{p}(t) = F(t) - c\dot{p}(t)
\]
</div>
Where $p(t)$ is the position of the block, $\dot{p}(t)$ is the velocity and $\ddot{p}(t)$ is the acceleration.

Let define the state and control vectors as:
<div>
\[
x(t) = \begin{bmatrix} p(t) \\ \dot{p}(t) \end{bmatrix}, \quad u(t) = \begin{bmatrix} F(t) \end{bmatrix}
\]
</div>
With:
- $x(t) \in \mathbb{R}^2$ because there are **two states**: position and velocity.  
- $u(t) \in \mathbb{R}^1$ because there is a **single control input**, the force $F(t)$.

We can rewrite the dynamics in state-space form as:
<div>
\[
\dot{x}(t) = Ax+Bu= \begin{bmatrix} 0 & 1 \\ 0 & -\frac{c}{m} \end{bmatrix} x(t) + \begin{bmatrix} 0 \\ \frac{1}{m} \end{bmatrix} u(t)
\]
</div>
With:
- $A$ is $2\times 2$ because it maps a 2-dimensional state to a 2-dimensional derivative.  
- $B$ is $2\times 1$ because it maps a single input to the 2-dimensional state derivative.

Let's choose some numerical values for the parameters: $m = 1$ and $c = 0.2$. Thus the matrices $A$ and $B$ are given by:
<div>
\[
A = \begin{bmatrix} 0 & 1 \\ 0 & -\frac{1}{5} \end{bmatrix}, \quad B = \begin{bmatrix} 0 \\ 1 \end{bmatrix}
\]
</div>
With this, we completed the first step of the procedure.

In step two, we need to define the cost function weights $Q$ and $R$. Let's choose:
<div>
\[
  Q = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}, \quad R = \begin{bmatrix} 0.01 \end{bmatrix}
\]
</div>
With:
- $Q$ must be $2 \times 2$ to match the 2-dimensional state vector $x(t)$.  
- $R$ must be $1 \times 1$ to match the 1-dimensional control vector $u(t)$.

For the sake of this example we choose $Q$ as the identity matrix, meaning that we care equally about both states being zero. We choose $R$ to be a small value, meaning that we are willing to use a lot of control input to bring the states back to zero. We will later solve problems with matrices that are not identities.

The next step is to solve the Riccati equation \eqref{eq:riccati} for $S$. This can be done using numerical methods or software tools like MATLAB, Python, etc. For this example, let's use Mathematica in order to solve the Riccati equation.

In Mathematica, we need to use function like `Transpose`, `Simplify`, and `Inverse` to manipulate matrices. The Riccati equation is a matrix equation, so we need to express it in a form that Mathematica can understand. After setting up the equation in Mathematica, we can use the `Solve` function to find the matrix $S$ that satisfies the Riccati equation. As mentioned before, we get several solutions for $S$, but we will only keep the one that yield a stable system.

In order to determine which of the solutions for $S$ yield a stable system, we need to compute the gain matrix $K$ for each solution using the formula $K = R^{-1} B^\top S$. Then, we can analyze the closed-loop system dynamics given by $\dot{x}(t) = (A - BK)x(t)$. A system is considered stable if all the eigenvalues of the matrix $(A - BK)$ have negative real parts. We can compute the eigenvalues in Mathematica using the `Eigenvalue` function. By checking the eigenvalues for each solution of $S$, we can identify which one leads to a stable closed-loop system.

<div class="remark-window">
  <div class="remark-title">Remark</div>
  Mathematically, all the solutions for $S$ are valid, but from an engineering perspective, we are only interested in the solution that yield a stable system.
</div>


From running the calculations in Mathematica, we find that the gain matrix $K$ is given by:
$$
K = \begin{bmatrix} 10.0 & 10.76 \end{bmatrix}
$$

Another way to solve this problem is to use Matlab, which has a built-in function `lqr` that can directly compute the gain matrix $K$ given the matrices $A$, $B$, $Q$, and $R$. Using Matlab's `lqr` function, we obtain as a result the matrices $K$, $S$ and the closed-loop eigenvalues: 
$$
\begin{bmatrix} K, & S, & E \end{bmatrix} = \text{lqr}(A, B, Q, R)
$$

<div class="ytb-window">
  This concludes the transcript of the video. The following section provides additional exercises and/or explanations not included in the video.
</div>

---

#### Dynamic Programming

In the previous video, we used the continuous-time algebraic Riccati equation (CARE) to solve the Linear Quadratic Regulator (LQR) problem. However, the derivation of the Riccati equation from the LQR problem was not covered in detail. Here, we will look at the discrete-time version of the LQR problem and derive the discrete-time Riccati equation (DARE) using **Dynamic programming**.

<u>Key assumptions:</u>

**Markovian assumption:** 
* There exists a Markovian state that evolves according to 
$$
x_{t+1} = f_t(x_t, u_t) \quad \text{discrete-time dynamical system}
$$
* The initial state $x_0$ is known.
* The cost is additive over time 
$$
J = \sum_{t} g_t(x_t, u_t)
$$

**Bellman's principle of optimality**

* _"An optimal policy has the property that whatever the initial state and initial decisions are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision."_

Meaning we can optimize the first decision instead of all the decisions at once and then make the optimal decision at each time step. We can break down the optimization problem into smaller subproblem and solve them recursively using the value function $V_t(x)$ defined in [previous section](#value-func):

<div class="formula-window">
  <div>
    \[
      V_{0}(X_{0}) 
      = \min_{u_{0}} \Biggl\{ 
          \begin{array}{cc}
            & \min_{u_{1}, \ldots, u_{T} \atop x_{1}, \ldots, x_{T}} &
                  \sum_{t=1}^{T} g_{t}(x_{t}, u_{t}) \\
            g_{0}(X_{0}, u_{0}) + &\text{s.t.} & x_{t+1} = f_{t}(x_{t}, u_{t}) \\
            &            & x_{1} = f_{0}(X_{0}, u_{0})
          \end{array}
      \Biggr\}
    \]
  </div>

  where $g_t(x_t, u_t)$ is an arbitrary cost function.
</div>

Note that
$$
\min_{\substack{u_{1}, \ldots, u_{T} \\ x_{1}, \ldots, x_{T}}} \sum_{t=1}^{T} g_{t}(x_{t}, u_{t}) = V_{1}(x_{1}) = V_{1}(f_{0}(X_{0}, u_{0}))
$$
The problem are nested minimization, we can solve them recursively.

<u>Derivation of the discrete-time Riccati equation (DARE):</u>

We us **Dynamic programming** to solve the discrete-time LQR problem. The idea is to break down the optimization problem into smaller subproblem and solve them recursively. We can first look at the last stage of the optimization problem, at that terminal-step, the solution is trivial as there is no future cost to consider (no input anymore). 
$$
V_T(x_T) = g_T(x_T)
$$
We can then move one step back in time and compute the cost function for $T-1$:
<div>
  \[
    \begin{align}
      V_{T-1}(x_{T-1}) =& \min_{u_{T-1}} \left( g_{T-1}(x_{T-1}, u_{T-1}) + V_T(x_T)\right) \\
      &\text{s.t.} \quad x_T = f_{T-1}(x_{T-1}, u_{T-1})
      \end{align}
  \]
</div>
That is 
$$
\min_{u_{T-1}} \left( g_{T-1}(x_{T-1}, u_{T-1}) + V_T(f_{T-1}(x_{T-1}, u_{T-1})) \right)
$$

We can continue this process recursively until we reach the initial time step. At each time step, we solve a smaller optimization problem that considers the current state, control input, and the cost-to-go from the next time step. That way the optimal control problem is decomposed into **stages problems** that can be solved using backward induction.

Now if we introduce the specific quadratic cost function and linear dynamics of the discrete-time LQR problem:
$$
V_t(x) = \min_{u_t,\cdots,u_{T-1}} \left( x_t^\top Q x_t + u_t^\top R u_t + V_{t+1}(A x + B u) \right)
$$
with the terminal cost $ V_T(x)=x^\top Sx$.

In the following section we will derive the induction step of the dynamic programming algorithm, which will lead us to the discrete-time Riccati equation (DARE).

The assumptions are the following: 
- the cost function is quadratic,
- the dynamics are linear,
- there are no constraints on the system.

$$
V_T(x) = x^\top S x
$$
$$
V_{T+1}(x) = x^\top P_t x
$$
On can show that $V_t(x)=x^\top P_tx$ (see proof in the note below) and then derive a formula for $P_t$

<details markdown="1">
  <summary><strong>Proof that $V_t(x)=x^\top P_t x$</strong></summary>
  <div>
    \[
    \begin{align}
    V_t(x) &= x^\top Q x + \min_{u}\left(u^\top R u + V_{T+1}(Ax+Bu)\right) \\
    &= x^\top Q x + \min_{u}\left(u^\top R u + (Ax+Bu)^\top P_{T+1}(Ax+Bu)\right) \\
    &= x^\top Q x + \min_{u}\left(u^\top\left(R+B^\top P_{T+1} B\right)u 
              + 2 B^\top P_{T+1} A x + x^\top A^\top P_{T+1} A x\right) \\
    &= x^\top Q x + x^\top A^\top P_{T+1} A x 
              + \min_{u}\left(u^\top\left(R+B^\top P_{T+1} B\right)u + 2 B^\top P_{T+1} A x\right) \\
    &= x^\top\left(Q+A^\top P_{T+1} A\right)x 
              + x^\top A P_{T+1} B\left(R+B^\top P_{T+1} B\right)^{-1}\left(R+B^\top P_{T+1} B\right) \\
    &\quad \left(R+B^\top P_{T+1} B\right)^{-1} B^\top P_{T+1} A x 
          - 2 x^\top A^\top P_{T+1} B\left(R+B^\top P_{T+1} B\right)^{-1} B^\top P_{T+1} A x \\
    &= x^\top\left(Q + A^\top P_{T+1} A 
              - A^\top P_{T+1} B\left(R+B^\top P_{T+1} B\right)^{-1} B^\top P_{T+1} A\right) x \\
    V_t(x) &= x^\top P_t x
    \end{align}
    \]
  </div>
  <details markdown="1">
  <summary><strong>How to remove $\min_{u}(\cdots)$</strong></summary>
  <div>
    We use the gradient to find the minimum for $u$, denoted $u^*$:
    \[
    \begin{aligned}
    \frac{1}{2}\text{gradient}&=\left(R+B^\top P_{T+1}B\right)u+B^\top P_{T+1}Ax=0\\ 
    u^* &= -\left(R+B^\top P_{T+1}B\right)^{-1}B^\top P_{T+1}Ax
    \end{aligned}
    \]
  </div>
</details>
</details>

<div class="formula-window">
  This derivation allowed to find an optimal feedback control:
  \[
  u_t=-\left(R+B^\top P_{T+1}B\right)^{-1}B^\top P_{T+1}Ax_t
  \]
  where 
  \[
  P_{t-1}=Q+A^\top P_{T+1}A - A^\top P_{T+1}B\left(R+B^\top P_{T+1}B\right)^{-1}B^\top P_{T+1}A
  \]
  For $t\to -\infty$, $P_t$ converges to a constant matrix $P$, the solution of the <strong>discrete-time algebraic Riccati equation</strong> (DARE):
  \[
  P=Q+A^\top PA - A^\top PB\left(R+B^\top PB\right)^{-1}B^\top PA
  \]
</div>

---

#### Controllability and Observability

**Controllability**

We consider the following system 

$$
\dot{x} = Ax + Bu
$$

<div>
\[
\begin{align}
\text{where } & x\in \mathbb{R}^n \text{ is the state vector,} \\
&u \in \mathbb{R}^m \text{ is the input vector,} \\
&A \in \mathbb{R}^{n\times n} \text{ is the system matrix,} \\
&B \in \mathbb{R}^{n\times m} \text{ is the input matrix.}
\end{align}
\]
</div>

We want to set the eigenvalues of $A$ to be in the left half plane, so that the system is stable. We can use the feedback control given by the matrix $B$ and the input $u$ to do so. But first, we need to check if the dynamics of the system allow us to manipulate the eigenvalues of $A$ using the input $u$. This is where the concept of **controllability** comes into play. If the system is controllable, then we can design a control law that will allow us to place the eigenvalues of $A$ in the left half plane. 

For linear systems, we know that an optimal control law is given by $u=-Kx$, where $K \in \mathbb{R}^{m \times n}$. Which leads to the dynamics:
$$
\dot{x} = Ax - BKx = (A-BK)x
$$

The system is controllable if we can chose $u=-Kx$ and it allows us to place the eigenvalues of the system wherever we want in the complex plane. Moreover, a controllable system means that we can drive the state $x$ from any initial state $x(0)$ to any final state $x_f$ in a finite time using an appropriate input $u(t)$.

In most of the systems, the matrices $A$ and $B$ are given and fixed due to the physical properties of the system, but we get to choose the input $u(t)$. The only thing that impacts whether the system is controllable or not are the matrices $A$ and $B$, depending on those matrices, the system can be easy to control or impossible to control.

To check if a system is controllable, we can use the **controllability matrix** defined as:
$$
\mathcal{C} = \begin{bmatrix} B & AB & A^2B & \cdots & A^{n-1}B \end{bmatrix}
$$

The system is controllable if the controllability matrix $\mathcal{C}$ has full row rank, i.e. $\text{rank}(\mathcal{C}) = n$. If the rank of $\mathcal{C}$ is less than $n$, then the system is not controllable.

<div class="lemma-window">
  <div class="lemma-title" id="HPB-controllability">Hautus for controllability</div>
  <div>
    Another way to check if a system is controllable is with the <strong>Popov-Belevitch-Hautus (PBH) test</strong>. The PBH test states that the system is controllable if and only if
    
    \[
    \text{rank}\begin{bmatrix} \lambda I - A & B \end{bmatrix} = n
    \]

    for every eigenvalue $\lambda$ of $A$. If there exists an eigenvalue $\lambda$ such that the rank condition is not satisfied, then the system is not controllable.
  </div>
</div>

**Observability**

Similarly to controllability, we consider the following system

$$
\dot{x} = Ax + Bu
$$

<div>
\[
\begin{align}
\text{where } & x\in \mathbb{R}^n \text{ is the state vector,} \\
&u \in \mathbb{R}^m \text{ is the input vector,} \\
&A \in \mathbb{R}^{n\times n} \text{ is the system matrix,} \\
&B \in \mathbb{R}^{n\times m} \text{ is the input matrix.}
\end{align}
\]
</div>

We also consider the output equation:
$$
y = Cx + Du
$$

<div>
\[
\begin{align}
\text{where } & y\in \mathbb{R}^p \text{ is the output vector,} \\
&C \in \mathbb{R}^{p\times n} \text{ is the output matrix,} \\
&D \in \mathbb{R}^{p\times m} \text{ is the feedthrough matrix.}
\end{align}
\]
</div>

We want to be able to estimate the state $x$ of the system using the output $y$. This is where the concept of **observability** comes into play. If the system is observable, then we can design an observer that will allow us to estimate the state $x$ using the output $y$.

To check if a system is observable, we can use the **observability matrix** defined as:
$$
\mathcal{O} = \begin{bmatrix} C \\ CA \\ CA^2 \\ \vdots \\ CA^{n-1} \end{bmatrix}
$$

The system is observable if the observability matrix $\mathcal{O}$ has full column rank, i.e. $\text{rank}(\mathcal{O}) = n$. If the rank of $\mathcal{O}$ is less than $n$, then the system is not observable.

<div class="lemma-window">
  <div class="lemma-title" id="HPB-observability">Hautus for observability</div>
  <div>
    The same way as for controllability, we can use the <strong>Popov-Belevitch-Hautus (PBH) test</strong> to check if a system is observable. The PBH test states that the system is observable if and only if
    
    \[
    \text{rank}\begin{bmatrix} \lambda I - A \\ C \end{bmatrix} = n
    \]

    for every eigenvalue $\lambda$ of $A$. If there exists an eigenvalue $\lambda$ such that the rank condition is not satisfied, then the system is not observable.
  </div>
</div>

<!-- ## 1.5: Introduction to state estimation

In most practical applications, it is not possible to directly measure all the states of a system. Even in the few cases where this is feasible, the measurements are often corrupted by sensor and process noise. This creates the challenge of obtaining reliable state estimates from noisy and incomplete output measurements—precisely the goal of **state estimation**.

In this section, we introduce the probabilistic framework for state estimation in its simplest form: a linear discrete-time model subject to normally distributed process and measurement noise. In this setting, the **Kalman filter** provides the optimal state estimator. Later in the course, we will revisit the state estimation problem in more general contexts and present analytical solutions such as the Kalman filter in greater detail.

We assume that the reader is familiar with the concepts of a random variable, probability density and distribution, the multivariate normal distribution, mean and variance, statistical independence, and conditional probability.  -->
<!-- create an appendix for it ??? -->

---

#### Exercises

[See notations](#notations)

**Exercise 1.1: State space form for chemical reaction model**
<!-- Exercise 1.1: State space form for chemical reaction model - Model Predictive Control: Theory, Computation, and Design 2nd Edition -->

Consider the following chemical reaction kinematics for a two-step series reaction:
$$
A \xrightarrow{\;k_1\;} B \quad B\xrightarrow{\;k_2\;} C 
$$
We wish to follow the reaction in a constant volume, well-mixed, batch reactor. As taught in th undergraduate chemical engineering curriculum, we proceed by writing material balances for the three species giving
$$
\frac{dc_A}{dt}=-r_1 \quad \frac{dc_B}{dt}=r_1-r_2 \quad \frac{dc_C}{dt}=r_2
$$
in which $c_j$ is the concentration of species $j$, and $r_1$ and $r_2$ are the rates (mol/(time$\cdot$vol)) at which the two reactions occur. We then assume some rate law for the reaction kinetics, such as
$$
r_1=k_1c_A \quad r_2 = k_2c_B
$$
We substitute the rate laws into the material balances and specify the starting concentrations to produce three differential equations for te three species concentrations.

<ol type="a">
  <li>Write the linear state space model for the deterministic series chemical reaction model. Assume we can measure the component A concentration. What are $x$, $y$, $A$, $B$, $C$, and $D$ for this model?</li>
  <li>(Optional) Simulate this model with initial conditions and parameters given by 
  <div>\[ c_{A0}=1 \quad c_{B0}=c_{C0}=0 \quad k_1=2 \quad k_2=1\]</div></li>
</ol>

<details markdown="1">
  <summary><strong>Correction</strong></summary>
  <em>Note: This correction reflects my interpretation of the exercise as a master's student. I am not a professional in the field, and while I have done my best, errors may still be present.</em>

  <div>
    1. We first need to determine the state and output vectors, namely $x$ and $y$. Since the output of this chemical reaction is component C, we define the concentration of that component as our output. The state of our system is the concentration of all the components taking part in the reaction:
    \[
    x = \begin{bmatrix} c_A \\ c_B \\ c_C \end{bmatrix} \quad y = \begin{bmatrix} c_C \end{bmatrix}  
    \]

    From control theory, the state-space equations are:
    \[
    \begin{align}
      \dot{x} &= Ax + Bu \\
      y &= Cx + Du
    \end{align}
    \]

    From the given dynamics, we derive:
    \[
    \begin{align}
      \frac{dc_A}{dt}= \dot x_1 &= -r_1 = -k_1 x_1 \\
      \frac{dc_B}{dt}= \dot x_2 &= r_1-r_2 = k_1 x_1 - k_2 x_2 \\
      \frac{dc_C}{dt}= \dot x_3 &= r_2 = k_2 x_2
    \end{align}
    \]

    \[
    \begin{align}
      \dot{x} &= \begin{bmatrix} -k_1 & 0 & 0 \\ k_1 & -k_2 & 0 \\ 0 & k_2 & 0 \end{bmatrix} x + \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} u\\
      y &= \begin{bmatrix} 0 & 0 & 1 \end{bmatrix} x + \begin{bmatrix} 0 \end{bmatrix} u
    \end{align}  
    \]

    Thus we have
   
    \[
    A = \begin{bmatrix} -k_1 & 0 & 0 \\ k_1 & -k_2 & 0 \\ 0 & k_2 & 0 \end{bmatrix} \quad B = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} \quad C = \begin{bmatrix} 0 & 0 & 1 \end{bmatrix} \quad D = \begin{bmatrix} 0 \end{bmatrix}
    \]

    2. Here is a simple script to simulate the system dynamics:
  </div>
  
  <div class="tab-window" id="exampleTabs">
    <div class="tab-title">Code</div>
    <div class="tab-header">
      <button class="tab-btn active" onclick="showTab(0, 'exampleTabs')">Python</button>
      <button class="tab-btn" onclick="showTab(1, 'exampleTabs')">MATLAB</button>
    </div>
    <div class="tab-content active">
      <pre><code class="language-python">
        import control as ctrl
        import numpy as np
        import matplotlib.pyplot as plt

        # Define the values
        c_A0 = 1.0  # Initial concentration of A (mol/L)
        c_B0 = 0.0  # Initial concentration of B (mol/L)
        c_C0 = 0.0  # Initial concentration of C (mol/L)
        k1 = 2.0    # Rate constant for A -> B (1/min)
        k2 = 1.0    # Rate constant for B -> C (1/min)

        A_0 = 5.0  # Initial concentration of A

        T = np.linspace(0, 10, 100)    # time vector
        U = np.zeros_like(T)           # input (no input)
        X0 = [A_0, 0, 0]               # initial state

        # Define the state-space representation
        A = [[-k1, 0, 0],
             [k1, -k2, 0],
             [0, k2, 0]]
        B = [[0], [0], [0]]  # No input
        C = [[0, 0, 1]]      # Output is concentration of C
        D = [[0]]

        # Create the state-space system
        system = ctrl.StateSpace(A, B, C, D)
        T, yout, xout = ctrl.forced_response(system, T, U, X0, return_states=True)

        def plot_dynamics(T, yout, xout):
            """Plot the dynamics of the system."""
            plt.figure(figsize=(10, 6))
            plt.plot(T, xout[0, :], label='Concentration of A', color='blue', linestyle='--')
            plt.plot(T, xout[1, :], label='Concentration of B', color='green', linestyle='--')
            plt.plot(T, yout.T, label='Concentration of C', color='red', linewidth=2)
            plt.xlabel('Time')
            plt.ylabel('Concentration (mol/L)')
            plt.title('System Dynamics initial state A=5 mol/L')
            plt.legend()
            plt.show()

        # Plot the results
        plot_dynamics(T, yout, xout)
      </code></pre>
      <div style="text-align:center; margin:1.2em 0;">
        <a class="download-btn" href="{{ site.baseurl }}/assets/downloads/MPC/System_dynamics.py" download="System_dynamics.py" style="display:inline-block; padding:8px 12px; background:#4F3DDB; color:#fff; border-radius:6px; text-decoration:none;">
          Download System_dynamics.py
        </a>
      </div>
      This gives the following result for a starting concentration of component $A_0 = 5$ (mol/L):
      <div class="images">
        <figure>
            <img src="{{ site.baseurl }}/assets/images/MPC/EX_2_1_system_dynamics.png" alt="Dynamics" width="650"/>
            <figcaption style="text-align: center;">System dynamics</figcaption>
        </figure>
      </div>
    </div>
    <div class="tab-content">
      <pre><code class="language-matlab">
        % Define the values
        c_A0 = 1.0;   % Initial concentration of A (mol/L)
        c_B0 = 0.0;   % Initial concentration of B (mol/L)
        c_C0 = 0.0;   % Initial concentration of C (mol/L)
        k1 = 2.0;     % Rate constant for A -> B (1/min)
        k2 = 1.0;     % Rate constant for B -> C (1/min)

        A_0 = 5.0;    % Initial concentration of A

        % Time vector
        T = linspace(0, 10, 100);    
        U = zeros(size(T));          % Input (none, zero vector)
        X0 = [A_0; 0; 0];            % Initial state

        % Define the state-space representation
        A = [-k1   0    0;
              k1  -k2   0;
              0    k2   0];
        B = [0; 0; 0];         % No input
        C = [0 0 1];           % Output is concentration of C
        D = 0;

        % Create the state-space system
        system = ss(A, B, C, D);

        % Simulate system response with initial conditions
        [yout, T, xout] = initial(system, X0, T);

        % Plot dynamics
        figure;
        plot(T, xout(:,1), '--b', 'DisplayName', 'Concentration of A'); hold on;
        plot(T, xout(:,2), '--g', 'DisplayName', 'Concentration of B');
        plot(T, yout, '-r', 'LineWidth', 2, 'DisplayName', 'Concentration of C');
        xlabel('Time (min)');
        ylabel('Concentration (mol/L)');
        title('System Dynamics initial state A = 5 mol/L');
        legend('show');
        grid on;
      </code></pre>
      <div style="text-align:center; margin:1.2em 0;">
        <a class="download-btn" href="{{ site.baseurl }}/assets/downloads/MPC/System_dynamics.m" download="System_dynamics.m" style="display:inline-block; padding:8px 12px; background:#4F3DDB; color:#fff; border-radius:6px; text-decoration:none;">
          Download System_dynamics.m
        </a>
      </div>
      This gives the following result for a starting concentration of component $A_0 = 5$ (mol/L):
      <div class="images">
        <figure>
            <img src="{{ site.baseurl }}/assets/images/MPC/EX_2_1_system_dynamics_MATLAB.png" alt="Dynamics" width="650"/>
            <figcaption style="text-align: center;">System dynamics</figcaption>
        </figure>
      </div>
    </div>
  </div>
</details>

**Exercise 1.2: Time to Laplace domain**
<!-- Exercise 1.4: Time to Laplace domain - Model Predictive Control: Theory, Computation, and Design 2nd Edition -->

Take the Laplace Transform of the following det of differential equations and fine the transfer function, G(s) connecting $u(s)$ and $y(s)$, $y=Gu$.

<div>
\[
\begin{align}
  \frac{dx}{dt}&=Ax+Bu \\
  y&=Cx+Du
\end{align}
\]
</div>
For $x\in\mathbb{R}^n$, $y\in\mathbb{R}^p$ and $u\in\mathbb{R}^m$, what is the dimension of the $G$ matrix? What happens to the initial condition, $x(0)=x_0$?

<details markdown="1">
  <summary><strong>Solution</strong></summary>
  We know that $\mathcal{L}(x(t))=X(s)$ and $\mathcal{\dot{x}(t)}=sX(s)-x(0)$, then
  <div>
  \[
  \begin{align}
  \mathcal{L}(\frac{dx}{dt})&=\mathcal{L}(Ax+Bu) \\
  sX(s)-x_0&=AX(s)+BU(s) \\
  X(s)(sI-A)&=x_0+BU(s)\\
  X(s) &= (sI-A)^{-1}x_0 + (sI-A)^{-1}BU(s) 
  \end{align}  
  \]
  </div>

  <ul>
    <li>$x\in\mathbb R^n$ so $A$ is $n\times n$.</li>
    <li>$u\in\mathbb R^m$ so $B$ is $n\times m$.</li>
    <li>$y\in\mathbb R^p$ so $C$ is $p\times n$</li>
    <li>$D$ is $p\times m$.</li>
  </ul>
  Thus $G(s)=C(sI-A)^{-1}B+D$ is a $p\times m$ matrix (maps m-vectors $U(s)$ to p-vectors $Y(s)$).

  The initial state $x_0$ produces the extra term $C(sI-A)^{-1}x_0$ in $Y(s)$. This term is independent of the input $U(s)$ and represents the system’s natural (homogeneous) response due to the initial condition. If the initial condition is zero ($x_0=0$), the extra term vanishes and $Y(s)=G(s)U(s)$.
</details>

**Exercise 1.3: Sum of quadratic functions**
<!-- Example 1.1: Sum of quadratic functions - Model Predictive Control: Theory, Computation, and Design 2nd Edition -->

Consider the two quadratic unctions given by: 
$$
V_1(x)=\frac{1}{2}(x-a)^\top A(x-a) \quad V_2(x)=\frac{1}{2}(x-b)^\top B(x-b)
$$
in which $A$, $B>0$ are positive definite matrices and $a$ and $b$ are n-vectors locating the minimum of each function. The figure below displays the ellipses defined by the level set $V_1(x)=\frac{1}{4}$ and $V_2(x)=\frac{1}{4}$ for the following parameters:
$$
A=\begin{bmatrix} 1.25 & 0.75 \\\\ 0.75 & 1.25 \end{bmatrix}
\quad 
a=\begin{bmatrix} -1 \\\\ 0 \end{bmatrix}
\quad 
B=\begin{bmatrix} 1.5 & -0.5 \\\\ -0.5 & 1.5 \end{bmatrix}
\quad
b=\begin{bmatrix} 1 \\\\ 1 \end{bmatrix}
$$

<div class="images">
  <figure>
    <img src="{{ site.baseurl }}/assets/images/MPC/2_1_level_set_ex.png" alt="Exercise" width="550"/>
    <figcaption style="text-align: center;">Level sets of $V_1(x)$ and $V_2(x)$</figcaption>
  </figure>
</div>

(a) Show that the sum $V(x)=V_1(x)+V_2(x)$ is also quadratic
$$
V(x)=\frac{1}{2}((x-v)^\top H(x-v)+d)
$$
in which 
$$
H=A+B \quad v=H^{-1}(Aa+Bb)
$$
$$
d=-(Aa+Bb)^\top H^{-1}(Aa+Bb)+a^\top Aa+b^\top Bb
$$
and verify the three ellipses given in the figure above.

(b) Considere the generalization useful in the discussion of the upcoming regulation and estimation problems. Let 
$$
V_1(x)=\frac{1}{2}(x-a)^\top A(x-a) \quad V_2(x)=\frac{1}{2}(x-b)^\top B(x-b)
$$
Derive the expressions for $H$, $v$ and $d$ in this case.

(c) Use the matrix inversion lemma and show that $V(x)$ of part (b) can be expressed also in an inverse form, which is useful in state estimation problems

$$
V(x)=\frac{1}{2}((x-v)^\top\tilde{H}^{-1}(x-v)+\text{constant})
$$
$$
H^{-1}=A^{-1}-A^{-1}C^\top(CA^{-1}C^\top+B^{-1})^{-1}CA^{-1}
$$
$$
v=a+A^{-1}C^\top(CA^{-1}C^\top+B^{-1})^{-1}(b-Ca)
$$

<details markdown="1">
<summary><strong>Matrix inversion lemma</strong></summary>
  This lemma is presented under the shape of an exercise to be solved.
  Let the matrix $Z$ be defined as
  $$
  Z=\begin{bmatrix} B & C \\\\ D & E \end{bmatrix}
  $$
  and assume that $Z^{1}$, $B^{-1}$ and $E^{-1}$ exist.

  (a) Perform row elimination and show that 
  $$
  Z^{-1}=\begin{bmatrix} B^{-1} + B^{-1} C (E - D B^{-1} C)^{-1} D B^{-1} & -B^{-1} C (E - D B^{-1} C)^{-1} \\\\ -(E - D B^{-1} C)^{-1} D B^{-1} & (E - D B^{-1} C)^{-1} \end{bmatrix}
  $$
  Note that this result is still valid if $E$ is singular.

  (b) Perform column elimination and show that
  $$
  Z^{-1}=\begin{bmatrix} (B - C E^{-1} D)^{-1} & -(B - C E^{-1} D)^{-1} C E^{-1} \\\\ -E^{-1} D (B - C E^{-1} D)^{-1} & E^{-1} + E^{-1} D (B - C E^{-1} D)^{-1} C E^{-1} \end{bmatrix}
  $$
  Note that this result is still valid if $B$ is singular.

  (c) A host of other useful control-related inversion formulas follow from these results. Equate the (1,1) or (2,2) entries of $Z^{-1}$ and derive the identity
  $$
  (A + B C D)^{-1} = A^{-1} - A^{-1} B (DA^{-1} B + C^{-1})^{-1} D A^{-1} \tag{1.54} \label{1.54}
  $$
  A useful special case of this result is 
  $$
  (I+X^{-1})^{-1}=I-(I+X)^{-1}
  $$

  (d) Equate the (1,2) or (2,1) entries of $Z^{-1}$ and derive the identity
  $$
  (A+BCD)^{-1} BC= A^{-1} B (D A^{-1} B + C^{-1})^{-1} \tag{1.55} \label{1.55}
  $$
  Equations \eqref{1.54} and \eqref{1.55} prove especially useful in rearranging formulas in least squares estimation.
</details>

<details markdown="1">
  <summary><strong>Solution of the exercise</strong></summary>
  (a) The sum of two quadratics is also quadratic, so we parametrize the sum as 
  $$
  V(x)=\frac{1}{2}((x-v)^\top H(x-v)+d)
  $$
  and solve for $v$, $H$ and $d$. Comparing the expansion of the quadratic of the right- and left-hand sides gives 
  $$
  x^\top Hx-2x^\top Hv+v^\top Hv+d=x^\top(A+B)x-2x^\top(Aa+Bb)+a^\top Aa+b^\top Bb
  $$
  Equating terms at each order gives 
  <div>
    \[
    \begin{align}
    H&=A+B \\
    v&=H^{-1}(Aa+Bb) \\
    d&=-v^\top Hv+a^\top Aa+b^\top Bb=-(Aa+Bb)^\top H^{-1}(Aa+Bb)+a^\top Aa+b^\top Bb
    \end{align}  
    \]
  </div>

  Notice that $H$ is positive definite since $A$ and $B$ are positive definite. Substituting the values of $a$, $A$, $b$ and $B$ gives
  $$
  H=\begin{bmatrix} 2.75 & 0.25 \\\\ 0.25 & 2.75 \end{bmatrix} 
  \quad
  v=\begin{bmatrix} -0.1 \\\\ 0.1 \end{bmatrix}
  \quad
  d=3.2
  $$
  The level set $V(x)=2$ is also plotted in figure above.

  (b) Expanding and comparing terms as before, we obtain
  <div>
    \[
    \begin{align}
    H&=A+C^\top bC \\
    v&=H^{-1}(Aa+C^\top Bb) \\
    d&=-(Aa+C^\top Bb)^\top H^{-1}(Aa+C^\top Bb)+a^\top Aa+b^\top Bb \tag{*} \label{d_expanded}
    \end{align}  
    \]
  </div>
  Notice the $H$ is positive definite since $A$ is positive definite and $C^\top BC$ is positive semi-definite for any $C$.

  (c)Define $x=x-a$ and $y=b-Ca$ and express the problem as 
  $$
  V(x)=\frac{1}{2}x^\top Ax+\frac{1}{2}(C(x+a)-b)^\top B(Cx+a-b)=\frac{1}{2}x^\top Ax+\frac{1}{2}(Cx-b)^\top B(Cx-b)
  $$
  Apply the solution from part (b) to obtain 
  $$
  V(x)=\frac{1}{2}((x-v)^\top H(x-v)+d) \\\\
  $$
  $$
  H=A+C^\top BC \quad v=H^{-1}C^\top Bb\\\\
  $$
  and we do not need to evaluate $d$. From the matrix inversion lemma, use (1.54) on $H$ and (1.55) on $v$ to obtain 
  $$
  \tilde{H}=A^{-1}-A^{-1}C^\top (CA^{-1}C^\top +B^{-1})^{-1}CA^{-1}
  $$
  $$
  v=A^{-1}C^\top (CA^{-1}C^\top +B^{-1})^{-1}(b-Ca)
  $$
  The function $V(x)$ can be expressed as
  <div>
    \[
    \begin{align}
    V(x)&=\frac{1}{2}((x-v)^\top H(x-v)+d) \\
    &=\frac{1}{2}((x-a-v)^\top H(x-a-v)+d) \\
    &=\frac{1}{2}((x-v)^\top H(x-v)+d)
    \end{align}  
    \]
  </div>
  where
  $$
  v=a+A^{-1}C^\top(CA^{-1}C^\top+B^{-1})^{-1}(b-Ca) \quad \quad □
  $$
</details>

---

### 6.3.4.2 Classical MPC

[See notations](#notations)

#### Introduction

Model Predictive Control (MPC) is an advanced method of process control that has been widely adopted in various industries due to its ability to handle multivariable control problems with constraints. The core idea of MPC is to use a model of the system to predict future behavior and optimize control actions over a finite time horizon.

MPC is a form of control in which the control action is obtained by solving, at each sampling instant (*online*), a finite horizon optimal control problem, using the current state of the plant as the initial state. The optimization yields an optimal control sequence and the first control in this sequence is applied to the plant. This process is repeated at the next sampling instant, creating a feedback loop. MPC differs, therefore, from traditional control methods, which typically rely on a fixed control law derived offline.

The great advantage of MPC is that open-loop optimal control problems often can be solved rapidly enough, using standard mathematical programming algorithms, to permit the use of MPC even though the system being controlled is nonlinear, and hard constraints on states and controls must be satisfied.

In this chapter we study MPC for the case when the state is known. This case is particularly important, even though it rarely arises in practice, because important properties, such as stability and performance, may be relatively easily established.

---

#### Invariant Sets

**Invariance**

<div class="lemma-window">
  <div class="lemma-title" id="def-2-1-positive-invariant">Definition 2.1: Positively invariant set</div>
  <div>
    A set $\mathcal{X} \subseteq \mathbb{R}^{n_x}$ is positively invariant under the dynamics defined by
    \[
      u_{k} = K x_{k}, \quad k = N, N+1, \cdots \tag{2.2.1} \label{eq:u_control}
    \]
    and
    \[
      x_{k+1} = \Phi x_{k}, \quad k = N, N+1, \cdots \tag{2.2.2} \label{eq:x_dynamics}
    \]
    (where $\Phi = A+BK$ and $x_{0\mid k}=x_k$)
    and the constraints 
    \[
    Fx+Gu \leq \mathbf{1} \quad \text{with} \quad \mathbf{1}=\begin{bmatrix} 1 & \cdots & 1 \end{bmatrix}^\top \in \mathbb{R}^{n_c} \tag{2.2.3} \label{eq:constraints}
    \]
    if and only if $(Fx+Gu \leq \mathbf{1})$ and $\Phi x \in \mathcal{X}$, for all $ \in\mathcal{X}$.
  </div>
</div>

The invariant set will provide a set of initial states for which the trajectories will never violate the system constraints. In order to increase the applicability of the MPC algorithm, and in particular to increase the size of the set of initial conditions $x_{0}$ for which the terminal condition $x_{N} \in \mathcal{X}_T$ can be met, it is important to choose the maximal positively invariant set as the terminal constraint set. This set is defined as follows. 

<div class="lemma-window">
  <div class="lemma-title" id="def-2-2-max-positive-invariant">Definition 2.2: Maximal positively invariant set</div>
  <div>
    The maximal positively invariant (MPI) set under the dynamics of \eqref{eq:u_control} and \eqref{eq:x_dynamics} and the constraints \eqref{eq:constraints} is the union of all sets that are positively invariant under these dynamics and constraints. We will denote this set as $\mathcal{X}_\infty$ of $\mathcal{X}^{\text{MPI}}$.
  </div>
</div>

<div class="images">
  <figure>
    <img src="{{ site.baseurl }}/assets/images/MPC/2_1_terminal_constraint_set.png" alt="Terminal set" width="600"/>
  </figure>
</div>

<div class="lemma-window">
  <div class="lemma-title" id="th-2-1">Theorem 2.1</div>
  <div>
  The MPI set for the dynamics defined by \eqref{eq:u_control} and \eqref{eq:x_dynamics} and the constraints \eqref{eq:constraints} can be expressed
  \[
    \mathcal{X}  \: \colon =  \{ x \: \colon \: (F+GK)\Phi^i x \leq \mathbf{1}, \quad i=0, \cdots, v\} \tag{2.2.4} \label{eq:mpi_set}
  \]
  where $v$ is the smallest positive integer such that $(F+GK)\Phi^{v+1}x\leq \mathbf{1}$, for all $x$ satisfying $(F+GK)\Phi^{i}, i=0, \cdots, v$. If $\Phi$ i strictly stable and $(\Phi, F+GK)$ is observable, then $v$ is necessarily finite.
  </div>
</div>

<details markdown="1">
  <summary><strong>Proof</strong></summary>

  Let consider 
  
  <div>
  \[
    \mathcal{X}^{(n)}= \{ x \, \colon \, (F+GK)\Phi^i x \leq \mathbf{1}, i=0, \cdots, n \} \quad \text{for } n \geq 0
  \] 
  </div>
  
  then it can be shown that \eqref{eq:mpi_set} holds for some finite $v$ using the [definition on maximal positively invariant set](#def-2-2-max-positive-invariant) to show that the MPI set $\mathcal{X}^{\text{MPI}}$ is equal to $\mathcal{X}^{(v)}$ for finite $v$.

  In particular, if $x_{0\mid k} \notin \mathcal{X}^{(n)}$ for a given $n$, then the constraint \eqref{eq:constraints} must be violated under the dynamics of \eqref{eq:u_control} and \eqref{eq:x_dynamics}. By [Definition 2.2](#def-2-2-max-positive-invariant) therefore, any $x\notin \mathcal{X}^{(n)}$ cannot lie in $\mathcal{X}^{\text{MPI}}$, so $\mathcal{X}^{(n)}$ must contain $\mathcal{X}^{\text{MPI}}$, for all $n\geq0$.

  Furthemore, if $(F+GK)\Phi^{v+1}x\leq \mathbf{1}$, for all $x \in \mathcal{X}^{(v)}$, then $\Phi x\in\mathcal{X}^{(v)}$ must hold hold whenever $x \in \mathcal{X}^{(v)}$ (since $x \in \mathcal{X}^{(v)}$ and $(F+GK)\Phi^{v+1} \leq \mathbf{1}$ imply $(F+GK)\Phi^{v+1}(\Phi x) \leq \mathbf{1}$ for $i=0, \cdots, v$). But from the definition of $\mathcal{X}^{(v)}$ we have $(F+GK)x\leq \mathbf{1}$ for all $x\in\mathcal{X}^{(v)}$, and therefore $\mathcal{X}^{(v)}$ is positively invariant \eqref{eq:u_control}, \eqref{eq:x_dynamics} and \eqref{eq:constraints}. From [Definition 2.2](#def-2-2-max-positive-invariant) it can be concluded that $\mathcal{X}^{(v)}$ is a subset of $\mathcal{X}^{\text{MPI}}$, and therefore equal to $\mathcal{X}^{\text{MPI}}$.

  Finally, for $v \geq n_x$, the set $\mathcal{X}^{(v)}$ is necessarily bounded if $(\Phi,F+GK)$ is observable, and, since $\Phi$ is strictly stable, the set 
  
  <div>
  \[
    \{x \mid (F+KG)\Phi^{(v+1)}x\leq\mathbf{1}\}
  \]
  </div>
  
  must contain $\mathcal{X}^{(v)}$ for finite $v$; therefore $\mathcal{X}^{\text{MPI}}$ must be defined by \eqref{eq:mpi_set} for some finite $v$.
</details>

**Pre-Sets**

<div class="lemma-window">
  <div class="lemma-title" id="def-2-3-pre-set">Pre Set</div>
  <div>
  Given a set $\mathcal{X}$ and the system describe by the dynamic \eqref{eq:constraints}, the <strong>pre-set</strong> of $\mathcal{X}$ is the of states that evolve into the target set $\mathcal{X}$ in one step:
  \[
    \text{pre}(\mathcal{X}) \: \colon = \{x \: \mid \: (Fx+Bu)\in\mathcal{X}\}
  \]
  </div>
</div>

<div><strong>Example: Pendulum</strong></div>

The dynamics of the pendulum can be described as follow
<div>
\[
  x^+=x+\begin{bmatrix} x_{2} \\ -9.8\sin(x_{1})-x_{2} \end{bmatrix}
\]
</div>
Discretized with forward Euler at 1Hz, where $x_{1}$ is the position, $x_{2}$ is the velocity.

The target set is defined as 
<div>
\[
  T \colon = \{x \mid \|x\|_2 \leq 1\}
\]
</div>

Consider the phase diagram below, which shows the target set $T$, the pre-set of $T$ is represented by the red area. The pre-set of $T$ is the set of states that will evolve into the target set $T$ in one step. For example, the state $x=[0, 1]^\top$ is in the pre-set of $T$ since it will evolve into the target set $T$ in one step (see the red arrow). However, the state $x=[1, 0]^\top$ is not in the pre-set of $T$ since it will not evolve into the target set $T$ in one step (illustrated by the orange arrow).

<div class="images">
  <figure>
    <img src="{{ site.baseurl }}/assets/images/MPC/2_1_pre_set_1.png" alt="Target set" width="500"/>
    <figcaption style="text-align: center;">Target set $T$</figcaption>
  </figure>

  <figure>
    <img src="{{ site.baseurl }}/assets/images/MPC/2_1_pre_set_2.png" alt="Pre-set of target" width="500"/>
    <figcaption style="text-align: center;">Pre-set of the target set $T$</figcaption>
  </figure>
</div>

<div class="lemma-window">
  <div class="lemma-title">Theorem 2.2: Geometric condition for invariance</div>
  <div>
  A set $\mathcal{X}$ is positively invariant under the dynamics defined by \eqref{eq:u_control} and \eqref{eq:x_dynamics} and the constraints \eqref{eq:constraints} if and only if $\mathcal{X} \subseteq \text{pre}(\mathcal{X})$.
  </div>
</div>

We prove the contrapositive for both the necessary and sufficient conditions.

**Necessary condition**: Assume that $\mathcal{X} \not\subseteq \text{pre}(\mathcal{X})$. Then there exists an $x \in \mathcal{X}$ such that $x \notin \text{pre}(\mathcal{X})$. From the definition of pre-set, this means that $(F+GK)x \leq \mathbf{1}$ but $\Phi x \notin \mathcal{X}$. Therefore, from [Definition 2.1](#def-2-1-positive-invariant), $\mathcal{X}$ is not positively invariant.

**Sufficient condition**: Assume that $\mathcal{X}$ is not positively invariant. Then, from [Definition 2.1](#def-2-1-positive-invariant), $\exists x \in \mathcal{X}$ such that $(F+GK)x \leq \mathbf{1}$ but $\Phi x \notin \mathcal{X}$. From the definition of pre-set, this means that $x \notin \text{pre}(\mathcal{X})$. Therefore, $\mathcal{X} \not\subseteq \text{pre}(\mathcal{X})$.

_Note that $\mathcal{X} \subseteq \text{pre}(\mathcal{X})$ is equivalent to $\text{pre}(\mathcal{X}) \cap \mathcal{X} = \mathcal{X}$._

<div style="border: 2px dashed #2a7ae2; border-radius: 10px; background: #f8f9fa; padding: 1.1em; margin: 1em 0;">
    <strong style="color: #2a7ae2; font-size: 1.1em;">Algorithm to compute invariant set</strong><br><br>
    \[
    \begin{aligned}
    &\textbf{Input: } ( f, \mathbb{X} ) & \\
    &\textbf{Output: } ( \mathcal{X}_{\infty} ) \\
    & \\
    &\Omega_{0} \leftarrow \mathbb{X} \\
    &\textbf{loop} \\
    &\quad \Omega_{k+1} \leftarrow \text{pre}(\Omega_{k}) \cap \Omega_{k} \\
    &\quad \textbf{if } \Omega_{k+1} = \Omega_{k} \textbf{ then} \\
    &\qquad \text{return } \mathcal{X}_{\infty} = \Omega_{k} \\
    &\quad \textbf{end if} \\
    &\textbf{end loop}
    \end{aligned}
    \]

    The algorithm generates the set sequence $\{\Omega_k\}$ satisfying $\Omega_{k+1} \subseteq \Omega_k$ for all $k \geq 0$. If the sequence converges in finite time, i.e., $\exists k^* \geq 0$ such that $\Omega_{k^*+1} = \Omega_{k^*}$, then the limit set $\mathcal{X}_{\infty} = \Omega_{k^*}$ is the maximal positively invariant set contained in $\mathbb{X}$.
</div>

**Controlled Invariance**

<div class="lemma-window">
  <div class="lemma-title">Control invariant set</div>
  <div>
  A set $\mathcal{C} \in \mathbb{X}$ is said to be a controlled invariant set if 
  \[
    x_i \in \mathcal{C} \quad \exists u_i \in \mathbb{U} \text{ such that } f(x_i,u_i)\in \mathcal{C} \quad \text{for all } x_i \in \mathbb{N}^+
  \]
  </div>
</div>

This defines the states for which there exist a **controller** that will satisfy the constraints at all time.

<div class="lemma-window">
  <div class="lemma-title">Maximal control invariant set</div>
  <div>
  The set $\mathcal{C}_\infty$ is said to be the maximal control invariant set for the system $x^+=f(x,u)$ subject to the constraints $(x,u)\in \mathbb{X}\times\mathbb{U}$ if it is control invariant and contains all control invariant sets contained in $\mathbb{X}$.
  </div>
</div>

The concept of **pre-sets** we saw in the previous section can be extended to control invariant set in order to comput the maximal control invariant set (MCPI).

The maximum control invariant set is the best a controller can do.

From this control invariant set, we can derive a control law, this control law $\kappa(x)$ will guarantee that the system $x^+=f(x,\kappa(x))$ will satisfy the constrains at all time if:
$$
f(x, \kappa(x)) \in \mathcal{C} \quad \text{for all } x\in\mathcal{C} \quad \text{with } \mathcal{C} \text{ a control invariant set of the system}
$$

We can use this to synthesize a control law from a control invariant set by solving an optimization problem:
<div>
\[
\kappa(x) \colon= \text{argmin } \{ g(x,u)\mid f(x,\kappa(x)\in\mathcal{C} \}
\]
</div>
Where $g$ is any function.

<p style="text-align: center;"><strong>Why don't we compute maximal control invariant set for all systems !?</strong></p>

We can't ! We often deal with linear system for which the the dynamics are usually too complex to be able to compute those sets, and when we deal with nonlinear system dynamics, it is almost always too complex to compute those sets.

That's where MPC comes into play, we will use MPC to approximate the control invariant set such that it is easier to represent and compute.

---

#### Model Predictive Control

To study model predictive control, we consider the following system dynamics
<div>
\[
  \boxed{x^+=f(x,u) \quad (x,u)\in\mathbb{X}, \mathbb{U}} \tag{2.3.1} \label{eq:system_dynamics_mpc}
\]
</div>
where $x\in\mathbb{R}^{n}$ is the state vector and $u\in\mathbb{R}^{m}$ is the control input vector. The function $f$ is assumed to be continuous and continuously differentiable with respect to its arguments.

The goal is to design a control law $u=\kappa(x)$ such that the following points ar respected
- the system satisfy the constraints: $\{x_k\}\subset \mathbb{X}, \{u_k\} \subset \mathbb{U}$
- it is stable: $\lim_{k\to\infty}x_k=0$
- it optimizes "performance" (we will develop this idea later on)
- it maximizes teh set of initial states $\{x_0\}$
- (later) it is robust to noise
- (later) it can be computed efficiently and reliably

The control law with the best properties is the solution of the infinite horizon, constrained optimal control problem for which the cost function is

<div>
\[
  \tag{2.3.2} \label{eq:infinite_horizon_control_law}
  \begin{aligned}
  u^{*}(x) \;\colon= \text{argmin} \quad & \sum_{t=0}^{N-1} \ell(x_t,u_t) + V_f(x_N) &&\\
  \quad \text{s.t.} \quad & x_{0}=x && \text{measurement}\\
  & x_{t+1}=f(x_t,u_t) && \text{system dynamics}\\
  & g(x_t,u_t)\leq 0 && \text{constraints}\\
  \end{aligned}
\]
</div>

The function $\ell(x,u)$ is the stage cost, it describes the "cost" of being in state $x$ and applying input $u$. It is assumed to be continuous and continuously differentiable with respect to its arguments. And $g(x,u)$ is a vector of constraint functions, which are also assumed to be continuous and continuously differentiable with respect to their arguments. 

The goal of the optimal control problem is to find a control law 
<div>
\[
  u^{*}(x) = \{u^*_0, u^*_1, \cdots, u^*_{N-1}\}
\]
</div>
that minimizes the cost function while satisfying the system dynamics and constraints, from which the input $u^{\*}_0$ will be applied to the system.

The optimal control problem is defined as follows:
<div class="lemma-window">
  <div class="lemma-title">Infinite horizon optimal control problem</div>
  <div>
    \[
      \tag{2.3.3} \label{eq:infinite_horizon_ocp}
      \begin{aligned}
      V^*(x_0) = \min_{u(\cdot)} & \sum_{t=0}^\infty \ell(x_t,u_t) \\
      \text{s.t.} \quad & x_{t+1}=f(x_t,u_t) \\
      & (x_t,u_t)\in\mathbb{X}, \mathbb{U}
      \end{aligned}
    \]
  </div>
</div>

If $\ell(\cdot)$ is positive definite, then the optimal cost $V_\infty^{\*}(x_0)$ is a Lyapunov function for the closed-loop system obtained by applying the optimal control law $u^{\*}(t)$ to the system. The optimal control law $u^{\*}(t)$ is therefore stabilizing the system to the origin.

However, solving the infinite horizon optimal control problem is often intractable, especially when the system is nonlinear and/or when there are constraints on the states and inputs. Therefore, we approximate the infinite horizon optimal control problem by a finite horizon optimal control problem, which is more tractable. This leads to the approach:
<div>
\[
  \tag{2.3.4} \label{eq:finite_horizon_ocp}
  \begin{aligned}
  V_N^{*}(x_0) = \min_{u(\cdot)} & \sum_{t=0}^{N-1} \ell(x_t,u_t) + V_f(x_N) \\
  \text{s.t.} \quad & x_{t+1}=f(x_t,u_t) \\
  & (x_t,u_t)\in\mathbb{X}, \mathbb{U} \\
  & x_N \in \mathcal{X}_f
  \end{aligned}
\]
</div>
where $N$ is the prediction horizon, $V_f(x)$ is the terminal cost, and $\mathcal{X}_f$ is the terminal constraint set. The terminal cost and terminal constraint set are used to approximate cost of the system from $N$ to $\infty$ and to ensure stability of the closed-loop system.

**Example: Toy problem**

In this example we consider a simple linear system with a time horizon of 1 and a scalar integrator system:
<div>
\[
  \tag{2.3.5} \label{eq:toy_problem}
  \begin{aligned}
  \min_{u_0,x_1} \quad & x_1^2 + u_0^2 \\
  \text{s.t.} \quad & x_1 = x_0 + u_0 \\
  & x_1 \leq 1 \\
  \end{aligned}
\]
</div>

* Quadratic problem with linear constraints
* Parametric solution $u_0^{\*}(x_0)$
* The equality constraints (model) allows to eliminate $x_1$
* Convex problem $\Rightarrow$ KKT conditions are necessary and sufficient

<div class="lemma-window">
  <div class="lemma-title">KKT conditions (only inequalities)</div>
  <div>
    The KKT conditions are given by
    <div>
    \[
      \begin{aligned}
        \min_{x}\; f(x)\quad\text{s.t.}\quad g(x)\le 0
        \quad\longrightarrow\quad
        \begin{cases}
          \nabla f(x) + \mu^\top \nabla g(x) = 0,\\[6pt]
          g(x) \le 0,\\[6pt]
          \mu \ge 0,\\[6pt]
          \mu_i\,g_i(x) = 0 \quad\forall i
        \end{cases}
      \end{aligned}
    \]
    </div>
  </div>
</div>

The optimization problem for the toy problem can be rewritten as 
<div>
\[
  \begin{aligned}
  \min_{u_0} \quad & (x_0+u_0)^2 + u_0^2 \\
  \text{s.t.}\quad & x_0 + u_0 \leq 1
  \end{aligned}
\]
</div>

We can identify two cases for the KKT conditions:
- Case 1: $\mu=0$ and $g(u_0)<0$ (constraint not active)
- Case 2: $\mu>0$ and $g(u_0)=0$ (constraint active)

**Case 1**: $\mu=0$ and $g(u_0)<0$ (constraint not active)
<div>
\[
  \begin{aligned}
  \nabla f(u_0) &= 2(x_0+u_0) + 2u_0 = 0 \\
  \Rightarrow u_0^{*}(x_0) &= -\frac{x_0}{2} \\
  g(u_0^{*}) &= x_0 - \frac{x_0}{2} - 1 < 0 \\
  \Rightarrow x_0 &< 2
  \end{aligned}
\]
</div>

**Case 2**: $\mu>0$ and $g(u_0)=0$ (constraint active)
<div>
\[
  \begin{aligned}
  g(u_0) &= x_0 + u_0 - 1 = 0 \\
  \Rightarrow u_0^{*}(x_0) &= 1 - x_0 \\
  \nabla f(u_0) + \mu \nabla g(u_0) &= 2(x_0+u_0) + 2u_0 + \mu = 0 \\
  \Rightarrow \mu &= -2(1-x_0+x_0) - 2(1-x_0) = 2(x_0-2) > 0 \\
  \Rightarrow x_0 &\geq 2
  \end{aligned}
\]
</div>

The optimal control law is therefore given by
<div>
\[
  u_0^{*}(x_0) = \begin{cases}
    -\frac{x_0}{2}, & x_0 < 2 \\
    1 - x_0, & x_0 \geq 2
  \end{cases}
\]
</div>

<div class="images">
  <figure>
    <img src="{{ site.baseurl }}/assets/images/MPC/piecewise_function_plot.png" alt="Toy problem solution" width="600"/>
  </figure>
</div>

---

#### Stability and Convergence

<!-- ### Lyapunov analysis -->

<div class="lemma-window">
  <div class="lemma-title">Stable equilibrium</div>
  <div>
  The equilibrium point $x=0$ pf the system $x^+=f(x,u)$ is said to be stable if a small perturbation of the state perturbs the state trajectory in a continuous way. More formally:

  \[
    \forall \epsilon > 0, \exists \delta > 0 \text{ such that } \|x_0\| < \delta \Rightarrow \|x_k\| < \epsilon, \forall k \geq 0
  \]

  The equilibrium point $x=0$ is said to be asymptotically stable if it is stable and, in addition, all state trajectories starting sufficiently close to the equilibrium converge to the equilibrium:

  \[
    \exists \delta > 0 \text{ such that } \|x_0\| < \delta \Rightarrow \lim_{k\to\infty} \|x_k\| = 0
  \]
  </div>
</div>

---

#### Examples of MPC

---

#### Exercises
[See notations](#notations)

**Exercise 2.1: Maximum invariant**
<!-- Exercise 4 p59 in Model Predictive Control textbook -->

A discret time system is described by the model $x_{k+1}=Ax_k+Bu_k$ with
$$
A=\begin{bmatrix} 0.3 & -0.9 \\\\ -0.4 & -2.1 \end{bmatrix} \quad B=\begin{bmatrix} 0.5 \\\\ 1 \end{bmatrix}
$$
where $u_k=Kx_k$ for $K = \begin{bmatrix} 0.224 & 1.751 \end{bmatrix}$, and for all $k=0,1,\cdots$ the state $x_k$ is subject to the constraints
$$
\mid\begin{bmatrix} 1 & -1 \end{bmatrix}x\mid \, \leq \, 1
$$

(a) Describe a procedure based on linear programming for determining the largest invariant set compatible with constraints $\mid\begin{bmatrix} 1 & -1 \end{bmatrix}x\mid\,\leq \,1$.

(b) Demonstrate by solving a linear program that the maximal invariant set is defined by
<div>
  \[
  \left\{ x \colon \, Fx \leq 1 \text{ and } F\Phi x \leq 1 \right\}
  \]
</div>
$$
\text{where } F = \begin{bmatrix} 1 & -1 \\\\ -1 & 1 \end{bmatrix} \text{ and } \Phi = \begin{bmatrix} 0.42 & -0.025 \\\\ -0.16 & -0.35 \end{bmatrix}
$$

<details markdown="1">
  <summary><strong>Solution</strong></summary>
  (a) The largest invariant set compatible with the constraints is given by

  <div>
  \[
    \mathcal{S}_v = \{ x \; \colon \; F\Phi^i x \leq 1, i=0,\cdots,v \}, F = \begin{bmatrix} 1 & -1 \\\\ -1 & 1 \end{bmatrix}, \Phi = \begin{bmatrix} 0.42 & -0.025 \\\\ -0.16 & -0.35 \end{bmatrix}
  \]
  </div>

  where $v$ is such that $F\Phi^{v+1}x \leq 1$ for all $x \in \mathcal{S}_v$. Since $\mathcal{S}_v$ is symmetric about $x=0$, this condition can be checked by solving the linear program:

  <div>
  \[
    \mu = \max_{x \in \mathcal{S}_v} \begin{bmatrix} 1 & -1 \end{bmatrix} \Phi^{v+1} x
  \]
  </div>

  (b) To check $v=1$:

  <div>
  \[
    \mu=\max_{x} \begin{bmatrix} 0.193 & -0.127 \end{bmatrix} x \quad \text{subject to } \begin{bmatrix} 1 & -1 \\\\ -1 & 1 \\\\ 0.578 & 0.324 \\\\ -0.578 & -0.324 \end{bmatrix} x \leq \begin{bmatrix} 1 \\\\ 1 \\\\ 1 \\\\ 1 \end{bmatrix}
  \]
  </div>

  gives $\mu=0.224$, so $\mu\leq 1$ as required. The set $\mathcal{S}_v$ is therefore invariant for $v=1$.

</details>

---

### 6.3.4.3: Robust MPC  - In Progress
[See notations](#notations)

---

#### Introduction

---

#### A Game Theoretic Approach

---

#### Prediction Dynamics in Robust MPC

---

#### Robust Min-Max MPC

---

#### To go further - Tube MPC

---

#### Exercises
[See notations](#notations)

---

### 6.3.4.4: Economic MPC  - In Progress
[See notations](#notations)

---

#### Stage cost

---

#### Horizon

---

#### Economic MPC vs MPC

---

#### Exercises
[See notations](#notations)

---


## 6.3.4 Credits
<!-- List all the sources that you used to create the page   -->

- Saverio Bolognani's lectures: **Computational Control** at ETH Zurich in spring 2024
- Colin Jones' lectures: **Model Predictive Control (ME-425)** at EPFL in Automn 2024
- **Model Predictive Control: Classical, Robust and Stochastic** textbook by Basil Kouvaritakis, Mark Cannon, 2016
- **Model Predictive Control: Theory, Computation, and Design** James B. Rawlings, David Q. Mayne, Moritz M. Diehl, 2nd Edition, 2022, available for free [here](https://sites.engineering.ucsb.edu/~jbraw/mpc/MPC-book-2nd-edition-1st-printing.pdf)
- **An Introduction to Optimization** Edwin K.P Chong, Stanislaw H. Zak, 2th Edition, available for free [here](https://www.gipsa-lab.grenoble-inp.fr/~ahmad.hably/Documents/IntroOptimization.pdf)

---

## 6.3.5 Additional Resources  - In Progress

---

<!-- ### Additional Resources: -->
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->