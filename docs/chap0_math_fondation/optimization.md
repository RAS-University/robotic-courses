---
title: Optimization
parent: Mathematical Foundation, Courses
nav_order: 1  
layout: default
author: Julian Ruiz Rodriguez (EPFL)
---

<h1 style="font-size: 3em; text-align: center;">Optimization</h1>

- Table of Contents
{:toc}

<style>
.ytb-window{
    border-left: 4px solid #053838;k
    background: #f8f9fa;
    padding: 1em;
}

.images{
    display: flex; 
    justify-content: center; 
    gap: 20px;
}

.formula-window{
    border-left: 4px solid #E7250C; 
    background: #f8f9fa; 
    padding: 1em;
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

.lemma-window{
    border-left: 4px solid #e7260cb6; 
    border-radius: 10px;
    background: #f8f9fa; 
    width: 700px;
    margin: 2em auto;
    box-shadow: 0 2px 8px rgba(226, 42, 60, 0.08);
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

</style>


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

# Motivation

# Unconstrained Optimization - Newton's Method

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
f: \mathbb{R}^n \to \mathbb{R}
$$
$$
\min_{x \in \mathbb{R}^n} f(x)
$$

One way of finding the minimum could be to eyeball it after drawing the function, however this method would only work as the dimension of the function is inferior to 2 and even for those functions this method is not precise. In some application like Machine Learning or Robotics, the functions that we want to minimize can have tens, thousands, or even **millions of variables**, making it impractical to visualize them.

Some of the most useful and used algorithms belong to the families of iterative optimization algorithms, which progressively refine their estimates of the minimum. The **Newton's method** is one such algorithm as we will see.

The process of those algorithms is as follows:

* **Initialization**: Start with an initial guess $x_0$ for the minimum (often chosen randomly or based on prior knowledge).

<div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_1_init_unconstrained_opt.png" alt="Initialization step" width="250"/>
        <figcaption style="text-align: center;">Initialization step</figcaption>
    </figure>
</div>

* **Iteration**: Pick a direction, i.e. a vector $d_0$, and follow it to obtain $x_1$. To track how much progress have been made, calculate the value of $x_1 = f(x_1)$. Hopfully $f(x_1) \leq f(x_0)$, meaning we have descended the value on the graph traced by $f(x)$ in space. This direction $d_0$ is usualy called a **descent direction**. Then iteratively, at step $k$ we calculate $x_{k+1} = x_k + d_k$.

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

Where $\alpha$ is a step size (also called **learning rate**). This step size determines how far we move along the descent direction. If $\alpha$ is too large, we might overshoot the minimum; if it's too small, convergence will be slow. Trying to tune $\alpha$ in an optimal way it what leads us to **Newton's method**. 

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

# Convex Optimization

## Convex Set

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
    <p>A hyperplane is a flat affine subspace of one dimension less than its ambient space. Formally, in \(\mathbb{R}^n\), a hyperplane can be defined as the set of points \(\{x \in \mathbb{R}^n: a^T x = b\}\) for some \(a \in \mathbb{R}^n\) (\(a \neq 0\)) and \(b \in \mathbb{R}\).
</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_hyperplane.png" alt="Hyperplane" width="550"/>
    </figure>
</div>
  </div>
  <div class="tab-content">
    <p>A halfspace is the set of points on one side of a hyperplane. Formally, in \(\mathbb{R}^n\), a halfspace can be defined as the set of points \(\{x \in \mathbb{R}^n: a^T x \leq b\}\) for some \(a \in \mathbb{R}^n\) (\(a \neq 0\)) and \(b \in \mathbb{R}\).
</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_halfspace.png" alt="Halfspace" width="550"/>
    </figure>
</div>
</div>
<div class="tab-content">
    <p>A polyhedron is the intersection of a finite number of halfspaces. Formally, in \(\mathbb{R}^n\), a polyhedron can be defined as the set of points \(\{x \in \mathbb{R}^n: a_i^T x \leq b_i, \, i = 1, \ldots, m\}\) for some \(a_i \in \mathbb{R}^n\) (\(a_i \neq 0\)) and \(b_i \in \mathbb{R}\).
</p>
    <div class="images">
    <figure>
        <img src="{{ site.baseurl }}/assets/images/MPC/1_1_2_polyhedron.png" alt="Polyhedron" width="550"/>
    </figure>
</div>
</div>
<div class="tab-content">
    <p>A polytope is a bounded polyhedron. Formally, in \(\mathbb{R}^n\), a polytope can be defined as the set of points \(\{x \in \mathbb{R}^n: a_i^T x \leq b_i, \, i = 1, \ldots, m\}\) for some \(a_i \in \mathbb{R}^n\) (\(a_i \neq 0\)) and \(b_i \in \mathbb{R}\), with the additional constraint that the feasible region is bounded.
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

## Convex functions

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

## Convex optimization problem

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

Where $C:\mathbb{R}^{n \times m}$ is a matrix and $g: \mathbb{R}^n \to \mathbb{R}^m$.

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

# Exercises


## Exercise 1.1: Applying Newton's method
<!-- Ex 9.2 in https://www.gipsa-lab.grenoble-inp.fr/~ahmad.hably/Documents/IntroOptimization.pdf -->

Consider the problem of minimizing $f(x)=x^{\frac{4}{3}}=(\sqrt[3]{x})^4$. Note that 0 is a global minimizer of $f$.

<ol type="a">
  <li>Write down the algorithm for Newton's metod applied to this problem</li>
  <li>Show thar as long as the starting point is not 0, the algorithm in part 1. does not converge to 0 (no matter how close to 0 we start).</li>
</ol>

<details markdown="1">
  <summary><strong>Solution</strong></summary>
  <div>
    1. We compute $f'(x)$ and $f'\'(x)$:
    \[
    \begin{align}
    f'(x) &= \frac{4}{3} x^{\frac{1}{3}} \\
    f''(x) &= \frac{4}{9} x^{-\frac{2}{3}}
    \end{align}  
    \]
    Therefore the Newton's algorithm for this problem takes the form 
    \[
    x_{k+1} = x_k - \frac{\frac{4}{3} x_k^{\frac{1}{3}}}{\frac{4}{9} x_k^{-\frac{2}{3}}} = -2 x_k
    \]
    2. From part 1., we have $x_k = -2 x_k$. Therefore, as long as $x_0 \neq 0$, the sequence $\{x_k\}$ diverges and does not converge to 0.
  </div>

</details>

## Exercise 1.2: Convex Set
<!-- Ex 4.2 in https://www.gipsa-lab.grenoble-inp.fr/~ahmad.hably/Documents/IntroOptimization.pdf -->

Show that the set $(x\in \mathbb{R}^n \mid \|x\| \leq r)$ is convex, where $r>0$ is a given real number, and $\|x\| = \sqrt{x^\top x}$ is the Euclidean norm of $x\in \mathbb{R}^n$.

<details markdown="1">
  <summary><strong>Solution</strong></summary>
  Let $u, v \in \Theta = \{x\in \mathbb{R}^n: \|x\| \leq r\}$, and $\alpha \in [0, 1]$. Suppose $z=\alpha u + (1-\alpha)v$. To show that $\Theta$ is convex, we need to show that $z\in\Theta$, i.e., $\|z\| \leq r$. To this end,
  $$
  \begin{aligned}
    \|z\|^2 &= (\alpha u + (1-\alpha)v)^\top (\alpha u + (1-\alpha)v) \\
    &= \alpha^2 \|u\|^2 + 2 \alpha (1-\alpha)u^\top v + (1-\alpha)^2\|v\|^2
  \end{aligned}
  $$
  Since $u,v \in \Theta$, then $\|u\|^2 \leq r^2$ and $\|v\|^2 \leq r^2$. Furthermore, by the Cauchy-Schwarz inequality, we have $u^\top v \leq \|u\| \|v\| \leq r^2$. Therefore,
  $$
  \|z\|^2\leq\alpha^2 r^2 + 2 \alpha(1-\alpha)r^2 +(1-\alpha)^2 r^2 = r^2
  $$
  Hence, $z\in\Theta$, which shows that $\Theta$ is a convex set, i.e., any point on the line segment joining $u$ and $v$ is also in $\Theta$.
</details>
