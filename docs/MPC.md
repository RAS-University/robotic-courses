---
title: Model predictive Control
parent: Courses
layout: default
nav_order: 7
author: Julian Ruiz Rodriguez (EPFL)
---

<h1 style="font-size: 3em; text-align: center;">Model Predictive Control</h1>
<p style="text-align: center; font-style: italic; font-size: 1em; color: #555;">
“Feedback: because the universe refuses to wait for you to get it right.”
</p>

<!-- # Model predictive Control -->

<!--Decompose the course into chapters

You can use Slotine's book and lectures: https://web.mit.edu/nsl/www/videos/lectures.html to help you construct the course.

You can also use some of the material from Alireza Karimi's course. Make sure to add all sources in credits.

 -->

 <!-- <div style="border-left: 4px solid #2a7ae2; background: #f8f9fa; padding: 1em;">
</div> -->

- Table of Contents
{:toc}

<!-- Styles definitions for the page -->

<style>
  .ytb-window{
    border-left: 4px solid #053838;k
    background: #f8f9fa;
    padding: 1em;
  }

  .formula-window{
    border-left: 4px solid #E7250C; 
    background: #f8f9fa; 
    padding: 1em;
  }

  .lemma-window{
    border-left: 4px solid #e7260cb6; 
    border-radius: 10px;
    background: #f8f9fa; 
    width: 700px;
    margin: 2em auto;
    box-shadow: 0 2px 8px rgba(226, 42, 60, 0.08);
  }

  .tab-window {
    border: 2px solid #4F3DDB;
    border-radius: 10px;
    background: #f8f9fa;
    width: 700px;
    margin: 2em auto;
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

  .lemma-title {
    background: #e7260cb6; 
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

  .lemma-header {
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

# Prerequisites

* Linear Algebra
* Differential equations
* Control theory :
    - First- and second-order system response
    - Transfer functions and feedback
    - Linear Time Invariant (LTI) Systems
* Signals and Systems :
    - Time-domain analysis
    - Frequency-domain analysis
    - System stability

# Notations

## Mathematical notation

| Symbol                            | Meaning                                                           |
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
| $V : A \to B$                     | $V$ is a function mapping set $A$ into set $B$                    |
| $x \mapsto V(x)$                  | function $V$ maps variable $x$ to value $V(x)$                    |
| $x^+$                             | value of $x$ at next sample time (discrete time system)           |
| $\dot{x}$                         | time derivative of $x$ (continuous time system)                   |
| $f_x$                             | partial derivative of $f(x)$ with respect to $x$                  |
| $\nabla$                          | nabla or del operator                                             |
| $\delta$                          | unit impulse or delta function                                    |
| $\|x\|$                           | absolute value of scalar; norm of vector (two-norm unless stated) |
| **x** or $\bar{x}$                | sequence of vector-valued variable $x$, $(x(0), x(1), \dots)$     |
| $\|x\|$                           | $\sup_{i \geq 0} \|x(i)\|$ (sup norm over a sequence)             |
| $\|x\|_{a:b}$                     | $\max_{a \leq i \leq b} \|x(i)\|$                                 |

## Subscripts, Superscripts, and Accents

| Symbol         | Meaning                                               |
|----------------|-------------------------------------------------------|
| $\hat{x}$      | estimate                                              |
| $\hat{x}^-$    | estimate before measurement                           |
| $\tilde{x}$    | estimate error                                        |
| $x_s$          | steady state                                          |
| $x_i$          | subsystem $i$ in a decomposed large-scale system      |
| $x_{sp}$       | setpoint                                              |
| $V^0$          | optimal                                               |
| $V^{uc}$       | unconstrained                                         |
| $V^{sp}$       | unreachable setpoint                                  |

# Chapter 0 : Motivation

<!-- Introduce limitation of "classical feedback control" and the need for more, -->


Even though feedback control has been applied by humans for more than two millennia, the systematic analysis of dynamical systems is relatively recent, beginning with James Clerk Maxwell’s pioneering work about 150 years ago. Since then, the field has advanced spectacularly, driven by contributions from mathematicians, engineers, and physicists alike. Laplace, Lyapunov, Kolmogorov, Wiener, Nyquist, Bode, and Bellman are just a few of the towering figures who shaped what we know today as control theory.

Despite these advancements, classical control methods often struggle with complex, high-dimensional systems, particularly those with constraints and uncertainties. This has led to the exploration of more advanced control strategies, such as Model Predictive Control (MPC), which explicitly considers system constraints and optimizes control actions over a prediction horizon.

In the pursuit of optimality one is therefore forced to consider approximate solutions, and this is perhaps the single most important reason behind the phenomenal success of model predictive control (MPC). MPC is arguably the most widely accepted modern control strategy because it offers, through its receding horizon implementation, an eminently sensible compromise between optimality and speed of computation.

MPC has found applications in various fields, including chemical process control, automotive systems, aerospace, and robotics. Its ability to handle multivariable systems and constraints makes it a powerful tool for modern control challenges.


# Chapter 1 : Review on optimization

## 1.1 : Unconstrained Optimization - Newton's Method

<!-- [Visually Explained: Newton's Method in Optimization](https://youtu.be/W7S94pq5Xuo?si=xKeMSgbhHonwVSQ3) -->

<iframe width="735" height="413"
  src="https://www.youtube.com/embed/W7S94pq5Xuo?start=15&end=460" 
  title="Visually Explained: Newton's Method in Optimization" 
  frameborder="0" 
  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>


<div class="ytb-window">
    This video offers a visual and intuitive explanation of Newton's Method, a fundamental optimization technique used to find local minima or maxima of functions. Through clear illustrations and step-by-step demonstrations, it delves into how this method accelerates convergence compared to gradient descent, especially near the optimum.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Video from 0:15 to 7:40 | Source: Visually Explained - YouTube  
        <a href="https://youtu.be/W7S94pq5Xuo?si=xKeMSgbhHonwVSQ3" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

**Video transcript :**

The focus is on unconstrained optimization, meaning we are given a multivariable function in $n$ variables $f$ without any constraints on the variables. We want to find the point $x$ that minimizes the function $f(x)$.

$$
f : \mathbb{R}^n \to \mathbb{R}
$$
$$
\min_{x \in \mathbb{R}^n} f(x)
$$

One way of finding the minimum could be to eyeball it after drawing the function, however this method would only work as the dimension of the function is inferior to 2 and even for those functions this method is not precise. In some application like Machine Learning or Robotics, the functions that we want to minimize can have tens, thousands, or even millions of variables, making it impractical to visualize them.

Some of the most useful and used algorithms belong to the families of iterative optimization algorithms, which progressively refine their estimates of the minimum. The **Newton's method** is one such algorithm as we will see.

The process of those algorithms is as follows:

* **Initialization**: Start with an initial guess $x_0$ for the minimum (often chosen randomly or based on prior knowledge).

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_1_init_unconstrained_opt.png" alt="Initialization step" width="250"/>
        <figcaption style="text-align: center;">Initialization step</figcaption>
    </figure>
</div>

* **Iteration**: Pick a direction, i.e. a vector $d_0$, and we follow it to obtain $x_1$. To track how much progress have been made, calculate the value of $x_1 = f(x_1)$. Hopfully $f(x_1) \leq f(x_0)$, meaning we have descended the value that the graph of $f(x)$ traces in space. This direction $d_0$ is usualy called a **descent direction**. This types of algorithm is called iterative because this step is repeated again and again until convergence is found. At step $k$ we calculate $x_{k+1} = x_k + d_k$.

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_1_1st_step_unconstrained_opt.png" alt="Initialization" width="250"/>
        <figcaption style="text-align: center;">1st step after direction $d_0$</figcaption>
    </figure>
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_1_kstep_unconstrained_opt.png" alt="Optimization step" width="250"/>
        <figcaption style="text-align: center;">k-th step after direction $d_k$</figcaption>
    </figure>
</div>

* **Convergence Check**: Repeat the iteration until convergence criteria are met (e.g., the change in function value is below a threshold).

The way to chose the direction step $d_k$ in the iteration step is crucial to achieve convergence to the optimal solution in a reasonable time frame. The chosen algorithm's will depend on the choice made for this direction. 

To pick a good descent direction, we need to understand how the function $f(x)$ behaves in the vicinity of the current point $x_k$. This is typically done using the gradient $\nabla f(x_k)$, which points in the direction of steepest increase. The negative gradient $-\nabla f(x_k)$, therefore, points in the direction of steepest descent.

**Example :** ($n=1$)
$$
f(x) = \frac{1}{20} x^4 - \frac{2}{5} x + 1
$$

$$
f'(x) = \frac{f(x) - f(x_k)}{x - x_k} \Rightarrow f(x) \approx 
f(x_k) + \color{orange}{f'(x_k)} \color{black}{(x - x_k)} \tag{1}
$$

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_1_fx.png" alt="graphical f(x)" width="280"/>
        <figcaption style="text-align: center;">Graphical representation of $f(x)$</figcaption>
    </figure>
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_1_fprime_x.png" alt="graphical f'(x)" width="280"/>
        <figcaption style="text-align: center;">Graphical representation of $f'(x)$</figcaption>
    </figure>
</div>

We can observe that locally around the point $x_k$, the function $f(x)$ can be approximated by a linear function. This is the essence of gradient-based optimization methods: they use the local linear approximation to guide the search for the minimum as linear functions are simpler to optimize.

We have then an iteration step using the gradient information:

$$
x_{k+1} = x_k - \alpha f'(x_k)
$$

Where $\alpha$ is a step size (also called learning rate). This step size determines how far we move along the descent direction. If $\alpha$ is too large, we might overshoot the minimum; if it's too small, convergence will be slow. Trying to tune $\alpha$ in an optimal way it what leads us to Newton's method. 

Newton's method comes from the observation that using the second-order derivative (the Hessian $\nabla^2 f(x_k)$) can provide a more accurate estimate of the function's curvature, allowing for more informed step sizes and directions. From calculus, we know that we can use the **Taylor expansion** we can refine the approximation made in equation (1).

$$
f(x) \approx f(x_k) + f'(x_k) (x - x_k) + \frac{1}{2} f\'\'(x_k) (x - x_k)^2 \tag{2}
$$

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_1_f_2nd_x.png" alt="2nd derivative" width="280"/>
        <figcaption style="text-align: center;">Graphical representation of $f''(x)$</figcaption>
    </figure>
</div>

This leads us to the following iteration step using both the first derivative and secound derivative information as $\alpha = \frac{1}{f'(x_k)}$:

$$
x_{k+1} = x_k - \frac{1}{f'(x_k)} f'(x_k)
$$

<div class="formula-window">
    Newton's method can be generalized in higher dimensions ($n\geq1$) as:
    \[
    x_{k+1} = x_k - \nabla^2 f(x_k)^{-1} \nabla f(x_k)
    \]
</div>

## 1.2 : Convex Optimization

**Convex Set**

A set $\mathcal{S}$ is **convex** if, for any two points $x_1, x_2 \in \mathcal{S}$ and any scalar $\lambda \in [0, 1]$, the point $\lambda x_1 + (1 - \lambda) x_2$ is also in $\mathcal{S}$. i.e. the line segment connecting any two points in the set lies entirely within the set.

<div class="formula-window">
    Mathematical definition of a convex set \( \mathcal{S} \):
    \[
    \lambda x_1 + (1 - \lambda) x_2 \in \mathcal{S}, \quad \forall x_1, x_2 \in \mathcal{S}, \forall \lambda \in [0, 1]
    \]
</div>

**Convex combination** of $x_1, \cdots, x_k$: any point $z$ of the form:
$$
z= \theta _1 z_1 + \theta _2 z_2 + \cdots + \theta _k z_k \quad \text{with} \quad \theta _1 + \cdots + \theta_k = 1, \theta _i \geq 0
$$



<div class="tab-window" id="convexSetExamples">
  <div class="tab-title">Convex Set Examples</div>
    <div class="tab-header">
    <button class="tab-btn active" onclick="showTab(0, 'convexSetExamples')">Hyperplane</button>
    <button class="tab-btn" onclick="showTab(1, 'convexSetExamples')">Halfspace</button>
    <button class="tab-btn" onclick="showTab(2, 'convexSetExamples')">Polyhedron</button>
    <button class="tab-btn" onclick="showTab(3, 'convexSetExamples')">Polytope</button>
  </div>
  <div class="tab-content active">
    <p>A hyperplane is a flat affine subspace of one dimension less than its ambient space. Formally, in \(\mathbb{R}^n\), a hyperplane can be defined as the set of points \(\{x \in \mathbb{R}^n : a^T x = b\}\) for some \(a \in \mathbb{R}^n\) (\(a \neq 0\)) and \(b \in \mathbb{R}\).
</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_hyperplane.png" alt="Hyperplane" width="550"/>
    </figure>
</div>
  </div>
  <div class="tab-content">
    <p>A halfspace is the set of points on one side of a hyperplane. Formally, in \(\mathbb{R}^n\), a halfspace can be defined as the set of points \(\{x \in \mathbb{R}^n : a^T x \leq b\}\) for some \(a \in \mathbb{R}^n\) (\(a \neq 0\)) and \(b \in \mathbb{R}\).
</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_halfspace.png" alt="Halfspace" width="550"/>
    </figure>
</div>
</div>
<div class="tab-content">
    <p>A polyhedron is the intersection of a finite number of halfspaces. Formally, in \(\mathbb{R}^n\), a polyhedron can be defined as the set of points \(\{x \in \mathbb{R}^n : a_i^T x \leq b_i, \, i = 1, \ldots, m\}\) for some \(a_i \in \mathbb{R}^n\) (\(a_i \neq 0\)) and \(b_i \in \mathbb{R}\).
</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_polyhedron.png" alt="Polyhedron" width="550"/>
    </figure>
</div>
</div>
<div class="tab-content">
    <p>A polytope is a bounded polyhedron. Formally, in \(\mathbb{R}^n\), a polytope can be defined as the set of points \(\{x \in \mathbb{R}^n : a_i^T x \leq b_i, \, i = 1, \ldots, m\}\) for some \(a_i \in \mathbb{R}^n\) (\(a_i \neq 0\)) and \(b_i \in \mathbb{R}\), with the additional constraint that the feasible region is bounded.
</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_polytop.png" alt="Polytop" width="550"/>
    </figure>
</div>
</div>
</div>

<div class="quizz-window" id="quizzConvex1">
    <div class="quizz-title">Quizz</div>
    <div style="padding: 1.5em;">
  <div style="margin-bottom: 1em;">Which of the following is a <span style="color: #73C47C; font-weight: bold;">convex set</span>?</div>
    <form id="quizForm">
      <div style="display: flex; flex-direction: row; justify-content: center; gap: 2em; margin-bottom: 1em;">
        <label style="display: flex; align-items: center; gap: 8px;">
          <input type="radio" name="answer" value="a" style="transform: scale(1.5);">
          <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_Octogone.png" alt="octogone" width="100"/>
        </label>
        <label style="display: flex; align-items: center; gap: 8px;">
          <input type="radio" name="answer" value="b" style="transform: scale(1.5);">
          <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_nonconvex_set.png" alt="shape" width="130"/>
        </label>
        <label style="display: flex; align-items: center; gap: 8px;">
          <input type="radio" name="answer" value="c" style="transform: scale(1.5);">
          <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_nonconvex_square.png" alt="square" width="100"/>
        </label>
      </div>
      <button type="button" onclick="checkQuizAnswer('quizzConvex1')" style="background: #73C47C; color: #fff; border: none; padding: 0.5em; border-radius: 6px; font-size: 1em; cursor: pointer;">Confirm</button>
    </form>
  <div id="quizResult" style="margin-top: 1em; font-weight: bold;"></div>
  </div>
</div>

**Convex functions**

<div class="formula-window">
    A function \( f: \mathcal{S} \to \mathbb{R} \) is convex if \(\mathcal{S}\) is a convex set and
    \[
    f(\lambda x_1 + (1 - \lambda) x_2) \leq \lambda f(x_1) + (1 - \lambda) f(x_2)
    \]
    \[
    \forall x_1, x_2 \in \mathcal{S}, \lambda \in [0,1]
    \]
</div>

<div class="images">
  <figure>
    <image src="{{ site.baseurl}}/assets/images/MPC/1_1_2_convex_def.png" alt="Convex function definition" width="450"/>
    <figcaption style="text-align: center;">Convex function definition</figcaption>
  </figure>
</div>

A function $f:\mathcal{S} \to \mathbb{R}$ is **strictly convex** if $\mathcal{S}$ is a convex set and for any two points $x_1, x_2 \in \mathcal{S}$ and any scalar $\lambda \in [0, 1]$, the following inequality holds:
$$
f(\lambda x_1 + (1 - \lambda) x_2) < \lambda f(x_1) + (1 - \lambda) f(x_2)
$$

A function $f:\mathcal{S} \to \mathbb{R}$ is **concave** if $\mathcal{S}$ is a convex set and $-f$ is convex.

**First-order condition for convexity:** Differentiable $f$ with convex domain is convex iff 
$$
f(y) \geq f(x) + \nabla f(x)^T (y - x), \quad \forall x, y \in \textbf{dom} f
$$

**Second-order condition for convexity:** Twice differentiable $f$ with open convex domain is convex iff
$$\nabla^2 f(x) \succeq 0, \quad \forall x \in \textbf{dom} f$$
i.e. the Hessian matrix is positive semidefinite for all $x$ in the domain of $f$.

<div class="tab-window" id="convexFunctionTabs">
  <div class="tab-title">Convex Function Examples</div>
  <div class="tab-header">
    <button class="tab-btn active" onclick="showTab(0, 'convexFunctionTabs')">Exponential</button>
    <button class="tab-btn" onclick="showTab(1, 'convexFunctionTabs')">Powers</button>
    <button class="tab-btn" onclick="showTab(2, 'convexFunctionTabs')">Logarithm</button>
  </div>
  <div class="tab-content active">
    <strong>Exponential Function Example:</strong>
    <p>\(f(x) = e^{ax}\), for any \(a \in \mathbb{R}\).</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_exp.png" alt="Exponential" width="550"/>
    </figure>
</div>
  </div>
  <div class="tab-content">
    <strong>Powers Function Example:</strong>
    <p>\(f(x) = x^a\) on \(\mathbb{R}_+\), for \(a \geq 1\) or \(a < 0\) (otherwise concave).</p>
     <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_powers.png" alt="Powers" width="550"/>
    </figure>
</div>
  </div>
  <div class="tab-content">
    <strong>Logarithm Function Example:</strong>
    <p>\(f(x) = -\log(x)\) on \(\mathbb{R}_{+}\).</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_log.png" alt="Logarithm" width="550"/>
    </figure>
</div>
  </div>
</div>

**Convex optimization problem**

A convex optimization problem is an optimization problem where the objective function is convex, and the feasible region (the set of points that satisfy the constraints) is also a convex set. This means that any local minimum is also a global minimum, making these problems easier to solve than general optimization problems.

<div class="formula-window">
    A convex optimization problem has the form:
    \[
    \begin{aligned}
    & \text{minimize}   && f(x) \\
    & \text{subject to} && g_i(x) \leq 0, \quad i = 1, \ldots, m \\
    &                   && h_i(x) = 0, \quad i = 1, \ldots, p
    \end{aligned}
    \]
    where \(f\) and \(g_i\) are convex functions, and \(h_i\) are affine functions.
</div>

With $f, g_i, \cdots, g_m$ convex functions and $c_i^T x = b_i$ affine functions (equality constrains are affine).

Often rewrite as follows:
$$
\begin{aligned}
& \text{min}   && f(x) \\\\
& \text{s.t.}  && g(x) \leq 0 \\\\
&              && Cx = b
\end{aligned}
$$

Where $C:\mathbb{R}^{n \times m}$ is a matrix and $g : \mathbb{R}^n \to \mathbb{R}^m$.

**Important properties:** Feasible set of a convex optimization problem is convex.

<div class="lemma-window">
  <div class="lemma-title">Lemma -  Convex problems: Local optima are global optima</div>
  <div style="padding: 1.5em;">
    Any locally optimal point of a convex problem is globally optimal.
  </div>
</div>

**Proof:** 
Assume $x$ is locally optimal and a feasible $y$ such that $f(y) < f(x)$. $x$ locally optimal implies that there exists an $R > 0$ such that $\left\| y - x \right\|_2 \leq R \Rightarrow f(y) \geq f(x)$.

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_2_convex_proof.png" alt="Proof" width="300"/>
    </figure>
</div>

<!-- ## 1.2 : Constrained systems -->

# Chapter 2 :  Linear Quadratic Regulation

## 2.1: Linear Quadratic Regulator (LQR)

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

**Video transcript :**

<u>Setting up the optimization problem:</u>

We can imagine a system that we want to control, for example a satellite. The satellite has several states that we want to control, for example its orientation, position, etc. We can represent the state of the satellite as a vector $\bar{x}(t)$, where $t$ is the time. Often represented as follow : 
$$
\bar{x}(t) = \begin{bmatrix}\text{orientation} \\ \text{position} \\ \vdots \\ \end{bmatrix} 
$$

The satellite might have also multiple control inputs that we can use to influence its state, for example main thrusters, electrical thrusters, momentum wheels, etc. We can represent the control inputs as a vector $\bar{u}(t)$.
$$
\bar{u}(t) = \begin{bmatrix}\text{main thrusters} \\ \text{electrical thrusters} \\ \text{momentum wheels} \\ \vdots \\ \end{bmatrix}
$$

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_satellite.jpg" alt="Satellite" width="300"/>
    </figure>
</div>

It is a dynamical system which has multiple states and multiple control. Let's assume that the dynamics of this system is linear, governed by the dynamics of the form:
$$
\dot{\bar{x}}(t) = A\bar{x}(t) + B\bar{u}(t)\tag{1}
$$

Stating that there is a relationship between how the state and the control interact.

<div class="formula-window">
  In this context, we formulate an optimization problem by defining a cost function that we aim to minimize.
  \[
  J = \int_0^\infty \left( \bar{x}(t)^T Q \bar{x}(t) + \bar{u}(t)^T R \bar{u}(t) \right) dt \tag{2}
  \]
  \[
  \begin{aligned}
  \text{Where:} \quad & \bar{x}(t) = n\times 1 \text{ state vector} \\ 
  & \bar{u}(t) = m\times 1 \text{ control vector}\\ 
  & Q = n\times n \text{ symmetric positive semi-definite matrix (} Q \geq 0 \text{ or } Q \succeq 0 \text{)} \\ 
  & R = m\times m \text{ symmetric positive definite matrix (} R > 0 \text{ or } R \succ 0 \text{)}
  \end{aligned}
  \]
</div>

<details markdown="1">
<summary><strong>Positivity semi-definite and definite matrices</strong></summary>
  Positive semi-definite:
  $$
  \displaystyle\bar{x}^T_{1\times n} \displaystyle Q_{n\times n} \bar{x}_{n\times 1} > 0, \quad \forall\ \bar{x}
  $$
  Similarly, positive definite:
  $$
  \bar{u}^T R \bar{u} > 0, \quad \forall\ \bar{u}
  $$
  We can notice the that is exactly the terms that we have in the cost function (2).
</details>

The way the **cost function** $J$ is set up here leads to the integral always being positive (due to the properties of $Q$ and $R$), for any $\bar{x}(t)$ and $\bar{u}(t)$ combination. We can have a feeling of what this cost function represents. The matrices $Q$ and $R$ are weighting matrices/values that allow us to tune the cost function, where these matrices tradeoff between non-zero states and non-zero control inputs. We will be thinking about $Q$ and $R$ as weights to determine how much we value state compared to how much we value control.

We can now formulate the optimization problem we would like to solve as follows:
$$
\min_{\bar{u}(t) \in \mathbb{R}^m} \quad J = \int_0^\infty \left( \bar{x}(t)^T Q \bar{x}(t) + \bar{u}(t)^T R \bar{u}(t) \right) dt
$$
$$
\text{s.t.} \quad \dot{\bar{x}}(t) = A\bar{x}(t) + B\bar{u}(t)
$$

It is basicly saying that we want to find the control input $\bar{u}(t)$ that minimizes the cost function $J$ while satisfying the dynamics of the system (1).
<!-- 
**Visualization Example:** -->

If we take an initial non-zero state for our satellite, i.e. $\bar{x}(0) \neq 0$, the satellite is at some weird orientation and position, not zero (unwanted state). Thus the term $\bar{x}(t)^T Q \bar{x}(t)$ in the cost function (2) is non-zero and positive. If left in that state without any control input, the cost function $J$ will blow up to infinity as time goes on. This is because the integral from time 0 to infinity in (2) accumulates the positive value of $\bar{x}(t)^T Q \bar{x}(t)$ over time.

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

This is not an optimal solution, we can't leave the satellite in that state as it will yields a cost value of infinity. Instead, what is better is to try to bring back the system to the origin, i.e. $\bar{x}(t) \to 0$. This will make the term $\bar{x}(t)^T Q \bar{x}(t)$ in the cost function (2) decrease over time, thus the integral will converge to a finite value. This is a much better solution as it minimizes the cost function $J$.

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_state_decrease.png" alt="cst state" width="280"/>
        <figcaption style="text-align: center;">Decreasing state</figcaption>
    </figure>
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/2_finit_cost.png" alt="finit J" width="280"/>
        <figcaption style="text-align: center;">Growth of cost function for a decreasing state$^*$</figcaption>
    </figure>
</div>

$^*$_The plots are illustrative and not based on actual numerical simulations._

The flip side of the story is how to bring the state back to zero. We can use thrusters, momentum wheels, etc. to influence the state of the satellite. However, using these control inputs also comes with a cost, represented by the term $\bar{u}(t)^T R \bar{u}(t)$ in the cost function (2). If we use too much control input, this term will become large and will also contribute to increasing the cost function $J$.

The cost function $J$ is a combination of how long the system is away from the origin (non-zero state) and how much non-zero control input we are using to bring it back to the origin. The goal is to find a balance between these two competing objectives, minimizing the overall cost function $J$.

The matrices $Q$ and $R$ allow us to determine how much we value the state being zero compared to how much we value the control input to be zero. For example, if we set $Q$ to be very "large" and $R$ to be very "small", we are saying that we care a lot about bringing the state back to zero, even if it means using a lot of control input. Conversely, if we set $Q$ to be very "small" and $R$ to be very "large", we are saying that we care more about minimizing the control input, even if it means the state takes longer to return to zero. We say that a control policy is **aggressive** when $Q$ is large and $R$ is small, and **conservative** when $Q$ is small and $R$ is large.

_Note: the terms "large" and "small" here are relative knowing that $Q$ and $R$ are matrices and can be of different sizes._

<details markdown="1">
  <summary><strong>Example: 2 states, 2 control system</strong></summary>
  <div style="border: 2px dashed #2a7ae2; border-radius: 10px; background: #f8f9fa; padding: 1.5em; margin: 2em 0;">
    <strong style="color: #2a7ae2; font-size: 1.1em;">2 states, 2 control system</strong><br><br>
    Let's consider a simple example with 2 states and 2 control inputs. The state vector $\bar{x}(t)$ and control vector $\bar{u}(t)$ can be represented as:
    \[
    \bar{x}(t) = \begin{bmatrix} x_1(t) \\ x_2(t) \end{bmatrix}
    \quad
    \bar{u}(t) = \begin{bmatrix} u_1(t) \\ u_2(t) \end{bmatrix}
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
    \bar{x}(t)^T Q \bar{x}(t) + \bar{u}(t)^T R \bar{u}(t) = q_{11} x_1(t)^2 + q_{22} x_2(t)^2 + r_{11} u_1(t)^2 + r_{22} u_2(t)^2
    \]

    We can identify $q_{11}$ as the penalty or the weight on the non-zero state $x_1(t)$, $q_{22}$ as the penalty on the non-zero state $x_2(t)$. The $Q$ matrix, by tunning the entries appropriatly, allows us to tune how much we care about each state being non-zero.

    Similarely, $r_{11}$ as the penalty on the non-zero control input $u_1(t)$, and $r_{22}$ as the penalty on the non-zero control input $u_2(t)$. Hence, the $R$ matrix allows us to tune how much we care about each control input being non-zero.

    By adjusting these weights, we can shape the behavior of the optimal control policy to meet our specific requirements.
  </div>
</details>

This allows us to set up the optimization problem that we want to solve and to have a good understanding of what the cost function represents and how the matrices $Q$ and $R$ influence the solution.

<div class="ytb-window">
  This concludes the transcript of the video. The following section provides additional exercises and/or explanations not included in the video.
</div>

**Exercise**

Consider the two quadratic unctions given by: 
$$
V_1(x)=\frac{1}{2}(x-a)^TA(x-a) \quad V_2(x)=\frac{1}{2}(x-b)^TB(x-b)
$$
in which $A$, $B>0$ are positive definite matrices and $a$ and $b$ are n-vectors locating the minimum of each function. The figure below displays the elipses defined by the level set $V_1(x)=\frac{1}{4}$ and $V_2(x)=\frac{1}{4}$ for the following parameters:
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
V(x)=\frac{1}{2}((x-v)^TH(x-v)+d)
$$
in which 
$$
H=A+B \quad v=H^{-1}(Aa+Bb)
$$
$$
d=-(Aa+Bb)^TH^{-1}(Aa+Bb)+a^TAa+b^TBb
$$
and verify the three ellipses given in the figure above.

(b) Considere the generalization useful in the discussion of th eupcomming regulation and estimation problems. Let 
$$
V_1(x)=\frac{1}{2}(x-a)^TA(x-a) \quad V_2(x)=\frac{1}{2}(x-b)^TB(x-b)
$$
Derive the expressions for $H$, $v$ and $d$ in this case.

(c) Use the matrix inversion lemma and show that $V(x)$ of part (b) can be expressed also in an inverse form, which is useful in state estimation problems

$$
V(x)=\frac{1}{2}((x-v)^T\tilde{H}^{-1}(x-v)+\text{constante})
$$
$$
H^{-1}=A^{-1}-A^{-1}C^T(CA^{-1}C^T+B^{-1})^{-1}CA^{-1}
$$
$$
v=a+A^{-1}C^T(CA^{-1}C^T+B^{-1})^{-1}(b-Ca)
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
  (A + B C D)^{-1} = A^{-1} - A^{-1} B (DA^{-1} B + C^{-1})^{-1} D A^{-1}\tag{(1.54)}
  $$
  A usefull special case of this result is 
  $$
  (I+X^{-1})^{-1}=I-(I+X)^{-1}
  $$

  (d) Equate the (1,2) or (2,1) entries of $Z^{-1}$ and derive the identity
  $$
  (A+BCD)^{-1} BC= A^{-1} B (D A^{-1} B + C^{-1})^{-1}\tag{(1.55)}
  $$
  Equations (1.54) and (1.55) prove especially useful in rearranging formulas in least squares estimation.
</details>

<details markdown="1">
  <summary><strong>Solution of the exercise</strong></summary>
  (a) The sum of two quadratics is also quadratic, so we parametrize the sum as 
  $$
  V(x)=\frac{1}{2}((x-v)^TH(x-v)+d)
  $$
  and solve for $v$, $H$ and $d$. Comparing the expension of the quadratic of the right- and left-hand sides gives 
  $$
  x^THx-2x^THv+v^THv+d=x^T(A+B)x-2x^T(Aa+Bb)+a^TAa+b^TBb
  $$
  Equating terms at each order gives 
  <div>
    \[
    \begin{align}
    H&=A+B \\
    v&=H^{-1}(Aa+Bb) \\
    d&=-v^THv+a^TAa+b^TBb=-(Aa+Bb)^TH^{-1}(Aa+Bb)+a^TAa+b^TBb
    \end{align}  
    \]
  </div>

  Notice that $H$ is positive definite sinc $A$ and $B$ are positive definite. Substituing the values of $a$, $A$, $b$ and $B$ gives
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
    H&=A+C^TbC \\
    v&=H^{-1}(Aa+C^TBb) \\
    d&=-(Aa+C^TBb)^TH^{-1}(Aa+C^TBb)+a^TAa+b^TBb \tag{*}
    \end{align}  
    \]
  </div>
  Notice the $H$ is positive definite since $A$ is positive definite and $C^TBC$ is positive semi-definite for any $C$.

  (c)Define $\bar{x}=x-a$ and $\bar{y}=b-Ca$ and express the problem as 
  $$
  V(x)=\frac{1}{2}\bar{x}^TA\bar{x}+\frac{1}{2}(C(\bar{x}+a)-b)^TB(C\bar{x}+a-b)=\frac{1}{2}\bar{x}^TA\bar{x}+\frac{1}{2}(C\bar{x}-\bar{b})^TB(C\bar{x}-\bar{b})
  $$
  Apply the solution from part (b) to obtain 
  $$
  V(x)=\frac{1}{2}((\bar{x}-\bar{v})^TH(\bar{x}-\bar{v})+d) \\\\
  $$
  $$
  H=A+C^TBC \quad \bar{v}=H^{-1}C^TB\bar{b}\\\\
  $$
  and we do not need to evaluate $d$. From the matrix invesion lemma, use (1.54) on $H$ and (1.55) on $\bar{v}$ to obtain 
  $$
  \tilde{H}=A^{-1}-A^{-1}C^T(CA^{-1}C^T+B^{-1})^{-1}CA^{-1}
  $$
  $$
  \bar{v}=A^{-1}C^T(CA^{-1}C^T+B^{-1})^{-1}\bar{b}
  $$
  The function $V(x)$ can be expressed as
  <div>
    \[
    \begin{align}
    V(x)&=\frac{1}{2}((\bar{x}-\bar{v})^TH(\bar{x}-\bar{v})+d) \\
    &=\frac{1}{2}((x-a-\bar{v})^TH(x-a-\bar{v})+d) \\
    &=\frac{1}{2}((x-v)^TH(x-v)+d)
    \end{align}  
    \]
  </div>
  where
  $$
  v=a+A^{-1}C^T(CA^{-1}C^T+B^{-1})^{-1}(b-Ca) \quad \quad □
  $$
</details>

We will see in the next chapter that in order to solve the optimization problem, we will need to solve the Riccati equation.

## 2.2: The Riccati Equation

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

Now that we have set up the optimization problem for the Linear Quadratic Regulator (LQR), we want to solve it. We want to find a control law $\bar{u}(t)$ which will make teh whole system optimimal. 

<div class="formula-window">
  <strong>Recall the optimization problem:</strong>
  \[
  \min_{\bar{u}(t) \in \mathbb{R}^m} \quad J = \int_0^\infty \left( \bar{x}(t)^T Q \bar{x}(t) + \bar{u}(t)^T R \bar{u}(t) \right) dt
  \]
  \[
  \text{s.t.} \quad \dot{\bar{x}}(t) = A\bar{x}(t) + B\bar{u}(t)
  \]
</div>

It is beyound the scope of this lecture to derive the solution of this optimization problem, but the optimal control law is given by a state feedback law of the form:
$$
\bar{u}(t) = -K\bar{x}(t) \tag{2.2.1}
$$
Where $K$ is the feedback gain matrix, which is given by:
$$
K = R^{-1} B^T S
$$
Where $S$ is the solution of the (continuous time) algebraic Riccati equation (CARE) ($S$ as size $n \times n +$ symmetric):
$$
A^T S + S A - S B R^{-1} B^T S + Q = 0 \tag{2.2.2}
$$

If we look back only at (2.2.1), we can see that it is only a full state feedback controller, in other words the optimal way to solve the optimization problem is to use a full state feedback controller. But in order to compute the gain matrix $K$, we need go through several steps.

<div class="lemma-window">
  <div class="lemma-title">Procedure for LQR:</div>
  <div style="padding: 1.5em;">
    <ol>
      <li>Define the system dynamics: $A$, $B$ (known from the plant)</li>
      <li>Define the cost function weights: $Q$, $R$ (tuning parameters)</li>
      <li>Solve the Riccati equation (2.2.2) for $S$</li>
      <li>Compute the optimal gain matrix: $K = R^{-1} B^T S$</li>
      <li>Choose the $K$ solution that yield a stable system</li>
    </ol>
  </div>
</div>

Let take an example to illustrate the procedure. Consider a mass damper system, in which a mass $m$ is on a smooth surface (ice for example) and there is some viscous damping with coefficient c between the surface and the block. We will only consider the horizontal position and velocity of the block as states, and a unique control input which is a force $F(t)$ that we can apply to the block. The dynamics of this system are given by newton's second law of motion:
$$
m\ddot{p}(t) = F(t) - c\dot{p}(t)
$$
Where $p(t)$ is the position of the block, $\dot{p}(t)$ is the velocity and $\ddot{p}(t)$ is the acceleration.

Let define the state and control vectors as:
$$
\bar{x}(t) = \begin{bmatrix} p(t) \\\\ v(t) \text{ or } \dot{p}(t) \end{bmatrix}, \quad \bar{u}(t) = \begin{bmatrix} F(t) \end{bmatrix}
$$
We can rewrite the dynamics in state-space form as:
$$
\dot{\bar{x}}(t) = \begin{bmatrix} 0 & 1 \\\\ 0 & -\frac{c}{m} \end{bmatrix} \bar{x}(t) + \begin{bmatrix} 0 \\\\ \frac{1}{m} \end{bmatrix} \bar{u}(t)
$$
Let's choose some numerical values for the parameters: $m = 1$ and $c = 0.2$. Thus the matrices $A$ and $B$ are given by:
$$
A = \begin{bmatrix} 0 & 1 \\\\ 0 & -\frac{1}{5} \end{bmatrix}, \quad B = \begin{bmatrix} 0 \\\\ 1 \end{bmatrix}
$$
With this, we completed the first step of the procedure.

In step two, we need to define the cost function weights $Q$ and $R$. Let's choose:
$$
Q = \begin{bmatrix} 1 & 0 \\\\ 0 & 1 \end{bmatrix}, \quad R = \begin{bmatrix} 0.01 \end{bmatrix}
$$
For the sake of this example we choose $Q$ as the identity matrix, meaning that we care equally about both states being zero. We choose $R$ to be a small value, meaning that we are willing to use a lot of control input to bring the states back to zero. We will later solve problems with matrices that are not identities.

The next step is to solve the Riccati equation (2.2.2) for $S$. This can be done using numerical methods or software tools like MATLAB, Python, etc. For this example, let's use Mathematica in order to solve the Riccati equation.

In Mathematica, we need to use function like `Transpose`, `Simplify`, and `Inverse` to manipulate matrices. The Riccati equation is a matrix equation, so we need to express it in a form that Mathematica can understand. After setting up the equation in Mathematica, we can use the `Solve` function to find the matrix $S$ that satisfies the Riccati equation. As mentionned before, we get several solutions for $S$, but we will only keep the one that yield a stable system.

In order to determine which of the solutions for $S$ yield a stable system, we need to compute the gain matrix $K$ for each solution using the formula $K = R^{-1} B^T S$. Then, we can analyze the closed-loop system dynamics given by $\dot{\bar{x}}(t) = (A - BK)\bar{x}(t)$. A system is considered stable if all the eigenvalues of the matrix $(A - BK)$ have negative real parts. We can compute the eigenvalues in Mathematica using the `Eigenvalue` function. By checking the eigenvalues for each solution of $S$, we can identify which one leads to a stable closed-loop system.

_Note: Mathematically, all the solutions for $S$ are valid, but from an engineering perspective, we are only interested in the solution that yield a stable system._

From running the calculations in Mathematica, we find that the gain matrix $K$ is given by:
$$
K = \begin{bmatrix} 10.0 & 10.76 \end{bmatrix}
$$

Another way to solve this problem is to use Matlab, which has a built-in function `lqr` that can directly compute the gain matrix $K$ given the matrices $A$, $B$, $Q$, and $R$. Using Matlab's `lqr` function, we obtain as a result the matrices $K$, $S$ and the closed-loop eigenvalues : 
$$
\begin{bmatrix} K, & S, & E \end{bmatrix} = \text{lqr}(A, B, Q, R)
$$

<div class="ytb-window">
  This concludes the transcript of the video. The following section provides additional exercises and/or explanations not included in the video.
</div>

**To go further: How to obtain the Riccati Equation from the LQR problem**

In the previous video, we used the continuous-time algebraic Riccati equation (CARE) to solve the Linear Quadratic Regulator (LQR) problem. However, the derivation of the Riccati equation from the LQR problem was not covered in detail. Here, we will look at the discret-time version of the LQR problem and derive the discrete-time Riccati equation (DARE).

<u>Key assuptions:</u>

**Markovian assumption:** 
* There exists a Markovian state that evolves according to 
$$
x_{t+1} = f_t(x_t, u_t) \quad \text{discrete-time dynamical system}
$$
* The initial state $x_0$ i sknowm.
* The cost is additive over time 
$$
J = \sum_{t} g_t(x_t, u_t)
$$

**Bellman's principle of optimality**

* _"An optimal policy has the property that whatever the initial state and initial decisions are, the remaining decisions must constitute an optimal policy with regard to the state resulting from the first decision."_

Meaning we can optimize the first decision instead of all the decisions at once and then make the optimal decision at each time step. The cost function is defined as:

<!-- $$
V_{0}(X_{0}) = \min_{u_{0}} \left(g_{0}(X_{0}, u_{0}) + 
  \min_{\substack{u_{1}, \ldots, u_{T} \\ x_{1}, \ldots, x_{T}}} 
      \sum_{t=1}^{T} g_{t}(x_{t}, u_{t})
\right)
$$
where the minimization is subject to the dynamics constraints:
$$
x_{t+1} = f_{t}(x_{t}, u_{t})
$$
$$
x_{1} = f_{0}(X_{0}, u_{0})
$$ -->

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

Note that
$$
\min_{\substack{u_{1}, \ldots, u_{T} \\ x_{1}, \ldots, x_{T}}} \sum_{t=1}^{T} g_{t}(x_{t}, u_{t}) = V_{1}(x_{1}) = V_{1}(f_{0}(X_{0}, u_{0}))
$$
The problem are nested minimizations, we can solve them recursively.

<u>Derivation of the discrete-time Riccati equation (DARE):</u>

We us **Dynamic programming** to solve the discrete-time LQR problem. The idea is to break down the optimization problem into smaller subproblems and solve them recursively. We can first look at the last stage of the optimization problem, at that tome-step , the solution is trivial as there is no future cost to consider (no input anymore). 
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
V_t(x) = \min_{u_t,\cdots,u_{T-1}} \left( x_t^T Q x_t + u_t^T R u_t + V_{t+1}(A x + B u) \right)
$$
with the terminal cost $ V_T(x)=x^TSx$.

In the following section we will derive the induction step of the dynamic programming algorithm, which will lead us to the discrete-time Riccati equation (DARE).

The assumptions are thate the cost function is quadratic, the dynamics are linear and there are no constraints on the system.

$$
V_T(x) = x^T S x
$$
$$
V_{T+1}(x) = x^T P_t x
$$
We will show that $V_t(x)=x^TP_tx$ and derive a formula for $P_t$
<div>
\[
\begin{align}
V_t(x) &= x^T Q x + \min_{u}\left(u^T R u + V_{T+1}(Ax+Bu)\right) \\
&= x^T Q x + \min_{u}\left(u^T R u + (Ax+Bu)^T P_{T+1}(Ax+Bu)\right) \\
&= x^T Q x + \min_{u}\left(u^T\left(R+B^T P_{T+1} B\right)u 
          + 2 B^T P_{T+1} A x + x^T A^T P_{T+1} A x\right) \\
&= x^T Q x + x^T A^T P_{T+1} A x 
          + \min_{u}\left(u^T\left(R+B^T P_{T+1} B\right)u + 2 B^T P_{T+1} A x\right) \\
&= x^T\left(Q+A^T P_{T+1} A\right)x 
          + x^T A P_{T+1} B\left(R+B^T P_{T+1} B\right)^{-1}\left(R+B^T P_{T+1} B\right) \\
&\quad \left(R+B^T P_{T+1} B\right)^{-1} B^T P_{T+1} A x 
      - 2 x^T A^T P_{T+1} B\left(R+B^T P_{T+1} B\right)^{-1} B^T P_{T+1} A x \\
&= x^T\left(Q + A^T P_{T+1} A 
          - A^T P_{T+1} B\left(R+B^T P_{T+1} B\right)^{-1} B^T P_{T+1} A\right) x \\
V_t(x) &= x^T P_t x
\end{align}
\]
</div>

<details markdown="1">
  <summary><strong>How to remove $\min_{u}(\cdots)$</strong></summary>
  <div>
    We use the gradient to find the minimum for $u$, denoted $u^*$:
    \[
    \begin{aligned}
    \frac{1}{2}\text{gradient}&=\left(R+B^TP_{T+1}B\right)u+B^TP_{T+1}Ax=0\\ 
    u^* &= -\left(R+B^TP_{T+1}B\right)^{-1}B^TP_{T+1}Ax
    \end{aligned}
    \]
  </div>
</details>

<div class="formula-window">
  This derivation allowed to find an uptimal feedback control:
  \[
  u_t=-\left(R+B^TP_{T+1}B\right)^{-1}B^TP_{T+1}Ax_t
  \]
  where 
  \[
  P_{t-1}=Q+A^TP_{T+1}A - A^TP_{T+1}B\left(R+B^TP_{T+1}B\right)^{-1}B^TP_{T+1}A
  \]
  For $t\to -\infty$, $P_t$ converges to a constant matrix $P$, the solution of the **discrete-time algebraic Riccati equation** (DARE):
  \[
  P=Q+A^TPA - A^TPB\left(R+B^TPB\right)^{-1}B^TPA
  \]
</div>

## Exercises

**Exercise 2.1: State space form for chemical reaction model**

Consider the following chemical reaction kinematics for a two-step series reaction:
$$
A \xrightarrow{\;k_1\;} B \quad B\xrightarrow{\;k_2\;} C 
$$
We wish to follow the reaction in a constant volume, well-mixed, batch reactor. As taught in th undergraduate chemical engineering curriculum, we proceed by writing material balances for the three species giving
$$
\frac{dc_A}{dt}=-r_1 \quad \frac{dc_B}{dt}=r_1-r_2 \quad \frac{dc_C}{dt}=r_2
$$
in which $c_j$ is the concentration of species $j$, and $r_1$ and $r_2$ are the rates (mol/(time$\cdot$vol)) at which the two reactions occur. We the assume some rate law for the reaction kinetics, such as
$$
r_1=k_1c_A \quad r_2 = k_2c_B
$$
We substitute the rate laws into the material balances and specify the starting concentrations to produce three differential equations for te three spiecies concentrations.

<ol type="a">
  <li>Write the linear state space model for the deterministic series chemical reaction model. Assume we can measure the component A concentration. What are $\bar{x}$, $\bar{y}$, $A$, $B$, $C$, and $D$ for this model?</li>
  <li>(Optional) Simulate this model with initial conditions and parameters given by 
  <div>\[ c_{A0}=1 \quad c_{B0}=c_{C0}=0 \quad k_1=2 \quad k_2=1\]</div></li>
</ol>

<details markdown="1">
  <summary><strong>Correction</strong></summary>
  <em>Note: This correction reflects my interpretation of the exercise as a master’s student. I am not a professional in the field, and while I have done my best, errors may still be present.</em>

  <div>
    1. We first need to determine the state and result vectors, namely $\bar{x}$ and $\bar{y}$. Since the resulting compenent of this chemical reactions is compenent C, we define the concentration of that compenent as our output. The state of our system would be the concentration of all the components taking part in the reaction:
    \[
    \bar{x} = \begin{bmatrix} c_A \\ c_B \\ c_C \end{bmatrix} \quad \bar{y} = \begin{bmatrix} c_C \end{bmatrix}  
    \]

    From our control lecture, we know that the state space equation of a dynamical system is written as follow: 
    \[
    \begin{align}
      \dot{\bar{x}} &= A\bar{x} + B\bar{u} \\
      \bar{y} &= C\bar{x} + D\bar{u}
    \end{align}
    \]

    From the given dynamics, we can derive
    \[
    \begin{align}
      \frac{dc_A}{dt}= \dot x_1 &= -r_1 = -k_1 x_1 \\
      \frac{dc_B}{dt}= \dot x_2 &= r_1-r_2 = k_1 x_1 - k_2 x_2 \\
      \frac{dc_C}{dt}= \dot x_3 &= r_2 = k_2 x_2
    \end{align}
    \]

    \[
    \begin{align}
      \dot{\bar{x}} &= \begin{bmatrix} -k_1 & 0 & 0 \\ k_1 & -k_2 & 0 \\ 0 & k_2 & 0 \end{bmatrix} \bar{x} + \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} \bar{u}\\
      y &= \begin{bmatrix} 0 & 0 & 1 \end{bmatrix} + \begin{bmatrix} 0 \end{bmatrix}
    \end{align}  
    \]

    Thus we have
    \[
    A = \begin{bmatrix} -k_1 & 0 & 0 \\ k_1 & -k_2 & 0 \\ 0 & k_2 & 0 \end{bmatrix} \quad B = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix} \quad C = \begin{bmatrix} 0 & 0 & 0 \end{bmatrix} \quad D = \begin{bmatrix} 0 \end{bmatrix}
    \]

    2. Here is a simple python script to simulate the system dynamics using the packages <code>control</code>, <code>numpy</code> and <code>matplotlib.pyplot</code>:
  </div>
  <div class="code-window">
  <pre><code class="language-python">
    import control as ctrl
    import numpy as np
    import matplotlib.pyplot as plt

    # Define the values
    c_A0 = 1.0  # Initial concentration of A (mol/L)
    C_B0 = 0.0  # Initial concentration of B (mol/L)
    C_C0 = 0.0  # Initial concentration of C (mol/L)
    k1 = 2.0    # Rate constant for A -> B (1/min)
    k2 = 1      # Rate constant for B -> C (1/min)

    A_0 = 5.0  # Initial concentration of A

    T = np.linspace(0, 10, 100)    # time vector
    U = np.zeros_like(T)           # input (step)
    X0 = [A_0, 0, 0]               # initial state

    # Define the state-space representation
    A = [[-k1, 0, 0],
        [k1, -k2, 0],
        [0, k2, 0]]
    B = [[0], [0], [0]]  # No input
    C = [[0, 0, 1]]  # We are interested in the concentration of C
    D = [[0]]

    # Create the state-space system
    system = ctrl.StateSpace(A, B, C, D)
    T, yout, xout = ctrl.forced_response(system, T, U, X0, return_states=True)

    def plot_dynamics(T, yout, xout):
        """Plot the dynamics of the system."""
        plt.figure(figsize=(10, 6))
        # Plot each state variable

        plt.plot(T, xout[0, :], label=f'Concentration of A', color='blue', linestyle='--')
        plt.plot(T, xout[1, :], label=f'Concentration of B', color='green', linestyle='--')
        plt.plot(T, yout.T, label=f'Concentration of C', color='red', linewidth=2)
        plt.xlabel('Time')
        plt.ylabel('Concentration (mol/L)')
        plt.title('System Dynamics initial state A=5 mol/L')
        plt.legend()
        plt.show()

    # Plot the results
    plot_dynamics(T, yout, xout)
  </code></pre>
  </div>
  
  This gives the following result for a starting concentration of component $A_0 = 5$ (mol/L):
  <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/EX_2_1_system_dynamics.png" alt="Dynamics" width="650"/>
        <figcaption style="text-align: center;">System dynamics</figcaption>
    </figure>
  </div>

</details>

# Chapter 3 : Classical MPC

## 3.? : Invariant Sets

## 3.? : Lyapunov stability

### Review on Lyapunov functions

# Chapter 4 : Robust MPC

# Chapter 5 : Economic MPC

# Additional Resources

## Credits:
<!-- List all the sources that you used to create the page   -->

- Saverio Bolognani's lectures : **Computational Control** at ETH Zurich in spring 2024
- Colin Jones' lectures : **Model Predictive Control ME-425** at EPFL in Automn 2024
- **Model Predictive Control : Classical, Robust and Stochastic** textbook by Basil Kouvaritakis, Mark Cannon, 2016
- **Model Predictive Control : Theory, Computation, and Design** James B. Rawlings, David Q. Mayne, Moritz M. Diehl, 2nd Edition, 2022, available for free [here](https://sites.engineering.ucsb.edu/~jbraw/mpc/MPC-book-2nd-edition-1st-printing.pdf)

<!-- I will ask for their permisions before using their materials -->

<!-- ### Additional Resources: -->
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->