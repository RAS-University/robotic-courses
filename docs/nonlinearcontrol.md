---
title: Nonlinear Control
parent: Courses
has_children: true
layout: default
nav_order: 7
author: Julian Ruiz Rodriguez (EPFL)
---

<h1 style="font-size: 3em; text-align: center;">Nonlinear Control</h1>

- Table of Contents
{:toc}

<style>
  .chart-container {
      position: relative;
      width: 100%;
      height: 600px; /* Fixed height for better visibility */
  }
  /* Add for aligned, uniform sliders */
  .controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
      margin-bottom: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 420px;
  }
  .controls label {
      min-width: 70px;
      margin-right: 8px;
      font-weight: 500;
  }
  .controls input[type="range"] {
      width: 250px;
      margin: 0 10px 0 0;
      vertical-align: middle;
      display: inline-block;
  }
  .controls span.slider-value {
      min-width: 40px;
      display: inline-block;
      text-align: left;
      font-weight: bold;
  }
  .controls > * {
      display: flex;
      align-items: center;
      width: 100%;
  }
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
    width: 740px;
    margin: 1.5em auto;
    box-shadow: 0 2px 8px rgba(42,122,226,0.08);
  }
  .quiz-window {
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
  .quiz-title {
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
  .quiz-header {
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
    align-items: center;       /* ensure vertical centering of children */
    width: 100%;               /* allow container to use full available width */
    flex-wrap: wrap;           /* avoid overflow when children are wide */
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
<!-- List courses required for this, including all course of Chapter 1 coming prior to this one, hence close-loop control, MPC, etc.  -->
* Linear Algebra
* Differential Equations
* Laplace Transforms
* Control Systems
  - Linear state
  - Transfer Functions
  - Controllability/observability

---

# Motivation

The subject of nonlinear control deals with the analysis and design of control systems that exhibit nonlinear behavior, i.e., a control system in which one or more components are nonlinear. In the analysis of nonlinear control systems, we study the stability, controllability, and observability of these systems using various mathematical tools and techniques.

One can wonder why nonlinear control is necessary when linear control techniques are well-established and widely used. Many reasons justify the need for nonlinear control:
- Improvement of performances: Linear control systems operate in a narrow range around an equilibrium point, when the range of control need to be extended, linear controllers fails to provide the desired performance. Nonlinear control techniques can be used to design controllers that can operate over a wider range of operating conditions, leading to improved performance.
- Hard nonlinearity: Many real-world systems exhibit hard nonlinearity, such as saturation, dead zones, and hysteresis, which cannot be adequately modeled using linear control techniques. Nonlinear control techniques can be used to design controllers that can handle these hard nonlinearity effectively.
- Model uncertainties: many control problems involve uncertainties in the model parameters. A linear controller based on an inaccurate model may lead to poor performance or instability. Nonlinear control techniques can be used to design controllers that are robust to model uncertainties, leading to improved performance and stability.

The subject of nonlinear control is an important area of research in control theory. It has applications in various fields, including robotics, aerospace, automotive systems, and process control. Nonlinear control techniques are used to design controllers for complex systems that exhibit nonlinear behavior, leading to improved performance, stability, and robustness. 

---

# Chapter 1: System Definitions

## 1.1: Superposition Principle

A linear system with an output $u$ and an input $y$ follow the superposition principle.

<div class="lemma-window">
  <div class="lemma-title" id="def_1.1">Definition 1.1 - Superposition principle</div>
  <div style="padding: 1.5em;">
  Consider two input signals, $u_1$ and $u_2$, creating the output signals $y_1$ and $y_2$. The system's response to the sum of the inputs $u=u_1+u_2$ is the sum of the individual responses, i.e. $y=y_1+y_2$.
  </div>
</div> 

This definition leads to the following characteristic: if the input signal is amplified by a factor of $\alpha$, the output will be amplified by the same factor $\alpha$. In mathematical terms, if the output of the system is $y$ for an input $u$, the if the input becomes $\alpha u$ the output will be $\alpha y$.

A linear system is thus simply defined as: 

<div class="lemma-window">
  <div class="lemma-title" id="def_1.2">Definition 1.2 - Linear system</div>
  <div style="padding: 1.5em;">
  All systems that satisfy the superposition principle is a linear system
  </div>
</div>

Subsequently, every system that do not satisfy the superposition theorem is a nonlinear system, which is the focus of this lecture.

---

## 1.2: Nonlinearities

Nonlinearities can be classified in two categories, *inherent (natural)* or *intentional (artificial)*.

Inherent nonlinearity naturally comes from the system hardware and motion. To cite a few as an example, there is the centripetal forces, or the Coulomb interaction forces. Usually, those nonlinearities are undesirable and control system have to properly compensate for them. Intentional nonlinearities, on the other hand, are artificially introduces by the designer in the system. 

Nonlinearities can also be classified mathematically, as *continuous* or *discontinuous*. Because of their discontinuous nature, discontinuous nonlinearities are often referred as *hard nonlinearities*, while continuous nonlinearities are called *soft nonlinearities*. Examples of hard nonlinearities include saturation, dead zones, and backlash, it can appear in both small and large range operation systems.

---

## 1.3: Non Symmetrical Unit Response

Consider the simple linear system defined by the differential equation:

$$
\dot{x} = -x + u
$$

When applying a step input of amplitude 1, the system will respond as shown in the blue dashed curve in [Figure 1.1](#fig_1.1_asymmetrical_response). If we now apply a step input of amplitude -1, the system will respond symmetrically, as shown by the blue dashed curve in [Figure 1.1](#fig_1.1_asymmetrical_response).

Now consider the nonlinear system defined by the differential equation:

$$
\dot{x} = -\|x\|x + u
$$

When applying a step input of amplitude 1, the system will respond as shown in the red solid curve in [Figure 1.1](#fig_1.1_asymmetrical_response). If we now apply a step input of amplitude -1, the system will respond asymmetrically, as shown by the red solid curve in [Figure 1.1](#fig_1.1_asymmetrical_response).

<div class="images">
  <figure id="fig_1.1_asymmetrical_response">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch1_asymmetrical_response.png" alt="Step Response" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 1.1:</strong> Step response of a linear system (blue dashed curve) and a nonlinear system (red curve)</figcaption>
  </figure>
</div>

---

## 1.4: Multiple Equilibrium Points

Nonlinear systems can exhibit multiple equilibrium points, which are points where the system's state does not change over time. This is in contrast to linear systems, which typically have a single equilibrium point. One classic example of a nonlinear system with multiple equilibrium points is systems with higher order polynomial nonlinearities, such as the cubic nonlinearity.

$$
\dot{x} = - x + x^2
$$

We consider several initial conditions and simulate the system dynamics. The results are shown in [Figure 1.2](#fig_1.2_multiple_eq_pts).

<div class="images">
  <figure id="fig_1.2_multiple_eq_pts">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch1_multiple_eq_pts.png" alt="Multiple equilibrium points" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 1.2:</strong> Solutions of $\dot{x}=-x+x^2$ with initial conditions $x_0= ±0.2, ±0.4, ±0.6, ±0.8, ±1.01, ±1.1$</figcaption>
  </figure>
</div>

We can observe that the system has two equilibrium points at $x=0$ and $x=1$. For different initial conditions, the system exhibits different behaviors, converging to either of the equilibrium points or diverging to infinity. This illustrates the complexity of nonlinear systems and the need for specialized analysis and control techniques.

This lead us to the Remark:
<div class="lemma-window">
  <div class="lemma-title" id="rem_1.3">Remark 1.3 - Multiple Equilibrium points</div>
  <div style="padding: 1.5em;">
  As opposed to linear systems, the stability of nonlinear systems can depend on the initial conditions, leading to multiple equilibrium points with different stability properties.
  </div>
</div>

---

## 1.5: Chaos

While a small change in initial conditions in a linear system will lead to a small change in the system's behavior, in nonlinear systems, a phenomenon called *chaos* can occur, where small changes in initial conditions can lead to vastly different outcomes.
The essential feature of chaos is the unpredictability of the system's long-term behavior, despite being deterministic in nature. This means that even though the system follows a set of well-defined rules, its future state can be highly sensitive to initial conditions, making it difficult to predict over extended periods.

However, chaotic systems must be distinguished from random motion or noise. In random motion, the system's behavior is inherently unpredictable due to stochastic influences. In contrast, chaotic systems are deterministic, meaning that their future behavior is fully determined by their initial conditions and governing equations, even though this behavior appears random and unpredictable over time.

Observe the system given by the following differential equation:

$$
\ddot{x} +0.1\dot{x}+ x^5 = 6\sin(t)
$$

In [Figure 1.3](#fig_1.3_chaotic_traj), we simulate the system's response for two slightly different initial conditions: $x_0=(0.1, 0.2)$, $x_0=(0.105, 0.2)$ and $x_0=(0.095, 0.2)$. We can observe that the trajectories diverge significantly over time, illustrating the sensitive dependence on initial conditions characteristic of chaotic systems.

<div class="images">
  <figure id="fig_1.3_chaotic_traj">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch1_chaotic_traj.png" alt="Chaos" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 1.3:</strong> Chaotic behavior of the system $\ddot{x} +0.1\dot{x}+ x^5 = 6\sin(t)$</figcaption>
  </figure>
</div>

**To go further on chaos**, we recommend the following video by **Veritasium** on YouTube, which explore the concept of chaos and the butterfly effect in a clear and engaging manner.

<iframe width="735" height="413" src="https://www.youtube.com/embed/fDek6cYijxI?si=3hu_bFoMzFVvjudq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<div class="ytb-window">
    Chaos: The Science of the Butterfly Effect
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Source: Veritasium - YouTube  
        <a href="https://youtu.be/fDek6cYijxI?si=rvVWCDbpGaH6kHtW" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

---

# Chapter 2: Phase Plane Analysis

Phase plane analysis is a graphical method used to study the behavior of nonlinear dynamical systems. It involves plotting the system's state variables against each other in a two-dimensional plane, known as the phase plane. This technique provides insights into the system's stability, equilibrium points, and overall dynamics.

This analysis allow one to visualize trajectories of the nonlinear system for various initial conditions. However, it is important to note that phase plane analysis is limited to systems with two state variables, as the study of higher-dimensional systems requires more complex techniques and is graphically challenging.

In this chapter, we will study several methods for analyzing nonlinear systems in the phase plane, including:
* computer methods:
  - numerical solution for diverse initial conditions
  - plotting vector fields
* analytical methods (pencil-and-paper):
  - explicit solution (elimination explicit/implicit of time)
* mixt methods:
  - isoclines method

---

## 2.1: Concepts of Phase Plane Analysis

The phase plane method is concerned with the study of two-dimensional autonomous systems of the form:

$$
\dot{x}_1 = f_1(x_1, x_2)
$$
$$
\dot{x}_2 = f_2(x_1, x_2)
$$

Where $x_1$ and $x_2$ are the state variables, and $f_1$ and $f_2$ are nonlinear functions that describe the system's dynamics. The phase plane is a two-dimensional plot where the horizontal axis represents $x_1$ and the vertical axis represents $x_2$. Each point in the phase plane corresponds to a specific state of the system.

To illustrate the phase plane analysis, consider the following simple mass-spring system. The system consists of a mass attached to a spring, and its dynamics can be described by the following second-order differential equation:
$$
\ddot{x} + x = 0
$$
With the mass initially at rest at position $x(0) = x_0$. We can write the solution of this second-order equation as:
$$
x(t) = x_0 \cos(t) 
$$
$$
\dot{x}(t) = -x_0 \sin(t)
$$
By eliminating the time variable $t$, we can express the relationship between $x$ and $\dot{x}$ as:
$$
x^2 + \dot{x}^2 = x_0^2
$$
This equation represents a circle in the phase plane, centered at the origin with a radius of $x_0$, as shown in [Figure 2.1](#fig_2.1_mass_spring). The trajectories in the phase plane are closed curves, indicating that the system exhibits periodic motion.
<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_2.1_mass_spring">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_mass_spring_ppa.png" alt="Mass-spring system" width="450"/>
    <figcaption style="text-align: center;"><strong>Figure 2.1:</strong> representation of the mass-spring system (a) and the resulting phase plane (b)</figcaption>
  </figure>
</div>

We just used an analytical method to derive the phase plane trajectories for this simple system. More generally, this method consist of computing a functional relation between the two phase variables $x_1$ and $x_2$ in the form
$$
g(x_1, x_2, c) = 0
$$
where $c$ is a constant determined by the initial conditions. This relation defines the trajectories in the phase plane, allowing us to analyze the system's behavior. This process requires to eliminate the time dependency from the system of equations. Two methods allow to do so.

The first technique consist of explicitly canceling the time variable by computing first the phase variable as function of time (as we did in our previous example):
$$
x_1(t) = g_1(t) \quad x_2(t)=g_2(t)
$$
Then, by eliminating $t$ from these two equations, we can obtain the desired relation between $x_1$ and $x_2$.

The second technique consist of implicitly eliminating the time variable by dividing the two differential equations:
$$
\frac{dx_2}{dx_1} = \frac{f_2(x_1, x_2)}{f_1(x_1, x_2)}
$$

One can also use numerical methods to plot the phase plane trajectories for various initial conditions. This approach is particularly useful for more complex nonlinear systems where analytical solutions may not be feasible. A number of software tools and libraries are available to perform numerical simulations and generate phase plane plots, to name a few: Maple, Mathematica, MATLAB, Python (with libraries such as NumPy, SciPy, and Matplotlib), etc.

---

## 2.2: The Isoclines Method

The vector field analysis is based on a arbitrary grid of points in the phase plane. At each point $(x_1, x_2)$, a vector is drawn with components $(\dot{x}_1, \dot{x}_2)$. This vector represents the direction and magnitude of the system's state change at that point. The idea behind the isoclines method is to find if there are several points in the phase plane, along which the vector calculation is simplified. For example, we can look for points where the vector has a constant direction or magnitude. By varying the constant value, we can draw back the vector field in the phase plane. Hence, from our system of differential equations $\dot{x}_1 = f_1(x_1, x_2)$ and $\dot{x}_2 = f_2(x_1, x_2)$, eliminating the time dependency, we can write:
$$
\frac{dx_2}{dx_1} = \frac{f_2(x_1, x_2)}{f_1(x_1, x_2)}=\alpha
$$
Where $\alpha$ is a constant. $\frac{dx_2}{dx_1}=\alpha$ defines the slope of the vector at each point in the phase plane.

Coming back to our mass-spring system example, we can apply the isoclines method to analyze its phase plane. The system is described by the following equations $\dot{x}+x =0$, we get:
$$
\alpha = \frac{-x_1}{x_2}
$$
$$
x_2 = -\frac{1}{\alpha} x_1
$$
With $\alpha=1$, we get the isocline $x_2 = -x_1$, which is represented by the blue line in [Figure 2.2](#fig_2.2_isoclines). At each point along this line, the vector has a slope of 1, indicating that the system's state changes equally in both $x_1$ and $x_2$ directions.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_2.2_isoclines">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_mass_spring_isoclines.png" alt="Isoclines method" width="200"/>
    <figcaption style="text-align: center;"><strong>Figure 2.2:</strong> Isoclines for the mass-spring system with $\alpha=1$ and $\alpha=-1$</figcaption>
  </figure>
</div>

---

## 2.3: Equilibrium Points and Stability

We can represent the second order system as follows:

<div>
\[
  \begin{align}
  \dot{x}_1 &= a_{11}x_1 + a_{12}x_2 \\
  \dot{x}_2 &= a_{21}x_1 + a_{22}x_2
  \end{align}
\]
</div>

$$
\Rightarrow \dot{x}=Ax
$$

Where $A$ is the system matrix. The trajectories of this system in the phase plane are determined by the eigenvalues and eigenvectors of the matrix $A$. Considering the eigenvalues $\lambda_1$ and $\lambda_2$ of the matrix $A$, given by solving $\|A - \lambda I\|=0$, we can classify the equilibrium point at the origin $(0,0)$ in four cases:
- If $\lambda_1$ and $\lambda_2$ are real and have the same sign, the equilibrium point is a node (stable if both are negative, unstable if both are positive).
- If $\lambda_1$ and $\lambda_2$ are real and have opposite signs, the equilibrium point is a saddle point (always unstable).
- If $\lambda_1$ and $\lambda_2$ are purely imaginary, the equilibrium point is a center (neutrally stable).
- If $\lambda_1$ and $\lambda_2$ are complex conjugates with positive/negative real parts, the equilibrium point is an unstable/stable focus (spiral).
[Figure 2.3](#fig_2.3_equilibrium_points) illustrates these four cases.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_2.3_equilibrium_points">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_fixed_point_1.png" alt="Equilibrium points" width="350"/>
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_fixed_point_2.png" alt="Equilibrium points" width="350"/>
    <figcaption style="text-align: center;"><strong>Figure 2.3:</strong> Types of equilibrium points in the phase plane</figcaption>
  </figure>
</div>

---

## 2.4: Limit Cycles

A limit cycle is a closed trajectory in the phase plane that represents a periodic solution of a dynamical system. Limit cycles are important in the study of nonlinear systems because they can indicate the presence of stable or unstable oscillatory behavior. To be considered a limit cycle, a trajectory must be isolated, meaning that there are no other closed trajectories in its immediate vicinity. Taking again the mass-spring system as an example, we can observe that the trajectories in the phase plane are closed curves, however, they are not isolated since there are infinitely many closed trajectories corresponding to different initial conditions. Therefore, the mass-spring system does not exhibit limit cycles.

<div class="lemma-window">
  <div class="lemma-title" id="def_2.4">Definition 2.4 - Limit Cycle</div>
  <div style="padding: 1.5em;">
  A system $\dot{x} = f(x)$ has a limit cycle $\mathcal{C}$ if there exists a range of time $[t_0, t_0+T]$ and a starting point $x(t_0) \in \mathcal{C}$ such that the solution of the system $\mathcal{X}(x_0, t)$, with initial condition $\mathcal{X}(x_0, t_0) = x_0$, satisfies:
  <ul>
  <li>$\mathcal{X}(x_0, t) \in \mathcal{C} \quad \forall t \in [t_0, t_0+T]$,</li>
  <li>$\mathcal{X}(x_0, t_0+T) = x_0$.</li>
  </ul>
  </div>
</div>

Limit cycles can be classified into three types based on their stability properties:
- Stable limit cycles, if all trajectories starting close to the limit cycle converge toward $\mathcal{C}$ as time goes to infinity.
- Unstable limit cycles, if all trajectories starting close to the limit cycle diverge away from $\mathcal{C}$ as time goes to infinity.
- Semi-stable limit cycles, if some trajectories starting close to the limit cycle converge toward $\mathcal{C}$ while others diverge away from it.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_2.4_limit_cycles">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_limit_cycles.png" alt="Limit cycles" width="530"/>
    <figcaption style="text-align: center;"><strong>Figure 2.4:</strong> Types of limit cycles: stable (left), unstable (center), semi-stable (right)</figcaption>
  </figure>
</div>

---

## 2.5: Index 

The index is a topological properties of systems in the phase plane. It allows to determine the necessary existence of limit cycles in a given region of the phase plane and gives information on the stability of an enclosed fixed point.

<div class="lemma-window">
  <div class="lemma-title" id="def_2.5">Definition 2.5 - Index of a point of the phase plane</div>
  <div style="padding: 1.5em;">
  In order to compute the index of a point $P$ in the phase plane, one must choose:
  <ul>
  <li>a closed curve $\Omega$ in the phase plane that encircles the point $P$ but no other fixed points. The closed curve can be arbitrarily chosen, however it must be comprised in a sufficiently small disc,</li>
  <li>a rotation in the positive trigonometric direction along the curve $\Omega$,</li>
  <li>an arbitrary set of points along the curve $\Omega$, numbered following the positive trigonometric direction ($x_i, i=1,\cdots,n$).</li>
  </ul>
  The index is defined by reporting each vector of the vector field with origin at the corresponding point $x_i$ on the curve $\Omega$. Then, one counts the number of complete rotations made by the vector field when moving along the curve $\Omega$ in the positive trigonometric direction. The index is then given by the angle modulo $2\pi$ made by the vector field along the curve $\Omega$.
  
  The possible values for the index of a point are: 0, +1, -1.
  </div>
</div>

**Remark:** The index is independent of the choice of the curve $\Omega$, as long as it encircles only the point $P$ and no other fixed points, of the chosen points $x_i$ along the curve and their number $n$.

<iframe width="735" height="413" src="https://www.youtube.com/embed/wZvFKcQ_3Rc?si=GEd-scAtYdobSwdZ&amp;start=126" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<div class="ytb-window">
    This video provides a visual explanation of limit cycles and their stability properties in nonlinear dynamical systems.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Video from 2:04 | Source: Virtually Passed - YouTube  
        <a href="https://youtu.be/wZvFKcQ_3Rc?si=nBAnaKUrG8s8nWv5" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

An index can be calculated for each of the fixed points in the phase plane mentioned in Section 2.3. Independently of their stability properties, nodes centers and foci have an index of +1, while saddle points have an index of -1. We introduce the notation $N$ and $S$ respectively the number of nodes (including centers and foci) and the number of saddle points in a given closed curve $\Omega$. The following theorem holds:

<div class="lemma-window">
  <div class="lemma-title" id="thm_2.6">Theorem 2.6 - Poincaré Index theorem</div>
  <div style="padding: 1.5em;">
  Consider $N$ the number of nodes (including centers and foci) and $S$ the number of saddle points in a closed curve $\Omega$. If a limit cycle exists, the singular points ($\bar{x}$ s.t. $f(\bar{x})=0$) inside the curve $\Omega$ satisfy $N = S+1$.
  </div>
</div>

Consider: 
$$
\dot{x}_1=f_1(x_1, x_2)\tag{2.1}\label{eq_2.1}
$$
$$
\dot{x}_2=f_2(x_1, x_2)\tag{2.2}\label{eq_2.2}
$$

<div class="lemma-window">
  <div class="lemma-title" id="thm_2.7">Theorem 2.7 - Bendixson Theorem</div>
  <div style="padding: 1.5em;">
  For a system defined by equations \eqref{eq_2.1} and \eqref{eq_2.2}, no limit cycle can exists in the region $\Omega$ of the phase plane where the $\partial f_1 // \partial x_1 + \partial f_2 // \partial x_2$ do not change sign and is not equal to zero.
  </div>
</div>

---

## Exercises

<div class="formula-window">
  <em>Disclaimer: Solutions are provided for self-assessment purposes only. It is recommended to attempt solving the exercises independently before consulting the solutions.</em>
</div>

**2.1: Saturation and linear system**

Consider the following system:

<div>
\[
\begin{align}
\dot{x}_1 &= x_1 + \text{sat}(-\frac{9}{2}x_1+\frac{1}{2}x_2) \\
\dot{x}_2 &= -x_2 + \text{sat}(-\frac{9}{2}x_1 + \frac{1}{2}x_2)
\end{align}
\]
</div>

with sat($\cdot$) defined as:
<div>
\[
  \text{sat}(u) = 
  \begin{cases}
    1 & \text{if } u > 1 \\
    u & \text{if } -1 \leq u \leq 1 \\
    -1 & \text{if } u < -1
  \end{cases}
\]
</div>

1. Show that there exist 3 equilibrium points for this system.
2. Compute the eigenvalues of the linearized system around each equilibrium point and deduce their index (*Hint: two are -1 and on is +1*)
3. If a limit cycle exists, where should it be located?
4. Draw the phase plane of the system and the vector field.
5. Apply the Isoclines method.
6. Draw several trajectories for different initial conditions.

<details markdown="1">
<summary><strong>Solution</strong></summary>
  <strong>Q1:</strong> To find the equilibrium points, we need to solve $\dot{x}_1 = 0$ and $\dot{x}_2 = 0$. Setting the equations to zero gives us:
  <div>
  \[
  \begin{align}
  0 &= x_1 + \text{sat}(-\frac{9}{2}x_1+\frac{1}{2}x_2) \\
  \Rightarrow  -x_1 &= \text{sat}(-\frac{9}{2}x_1+\frac{1}{2}x_2) \tag{2.1.1}\label{eq_2.1.1_ch2_ex1}\\
  & \\
  0 &= -x_2 + \text{sat}(-\frac{9}{2}x_1 + \frac{1}{2}x_2)\\
  \Rightarrow x_2 &= \text{sat}(-\frac{9}{2}x_1 + \frac{1}{2}x_2) \tag{2.1.2}\label{eq_2.1.2_ch2_ex1}
  \end{align}
  \]
  </div>
  This leads to the equality $x_2 = -x_1$. Thus we can substitute $x_2$ in equation \eqref{eq_2.1.1_ch2_ex1}:
  $$
  -x_1 = \text{sat}(-5x_1)
  $$
  We can now analyze the three cases for the saturation function:
  <ul>
  <li>Case 1: $-5x_1 > 1 \Rightarrow x_1 < -\frac{1}{5}$. In this case, $\text{sat}(-5x_1) = 1$, leading to $-x_1 = 1 \Rightarrow x_1 = -1$. Thus, one equilibrium point is $(-1, 1)$.</li>
  <li>Case 2: $-1 \leq -5x_1 \leq 1 \Rightarrow -\frac{1}{5} \leq x_1 \leq \frac{1}{5}$. In this case, $\text{sat}(-5x_1) = -5x_1$, leading to $-x_1 = -5x_1 \Rightarrow 4x_1 = 0 \Rightarrow x_1 = 0$. Thus, another equilibrium point is $(0, 0)$.</li>
  <li>Case 3: $-5x_1 < -1 \Rightarrow x_1 > \frac{1}{5}$. In this case, $\text{sat}(-5x_1) = -1$, leading to $-x_1 = -1 \Rightarrow x_1 = 1$. Thus, the third equilibrium point is $(1, -1)$.</li>
  </ul>

  <strong>Q2:</strong> The linearized system around each equilibrium point can be obtained by computing the Jacobian matrix of the system. The Jacobian matrix $J$ is given by:
  $$
  J = \begin{bmatrix}
  \frac{\partial \dot{x}_1}{\partial x_1} & \frac{\partial \dot{x}_1}{\partial x_2} \\
  \frac{\partial \dot{x}_2}{\partial x_1} & \frac{\partial \dot{x}_2}{\partial x_2}
  \end{bmatrix}
  $$

  In this cas we need to consider the derivative of the saturation function, which is 0 outside the linear region and equal to the internal derivative inside the linear region. Thus, we have:
  <ul>
  <li>At the equilibrium point $E_1=(-1, 1)$, the Jacobian matrix is:
  \[
  J_{E_1} = \begin{bmatrix}
  \frac{\partial}{\partial x_1}(x_1+1) & \frac{\partial}{\partial x_2}(x_1+1) \\
  \frac{\partial}{\partial x_1}(-x_2+1) & \frac{\partial}{\partial x_2}(-x_2+1)
  \end{bmatrix} = \begin{bmatrix}
  1 & 0 \\
  0 & -1
  \end{bmatrix}
  \]
  The eigenvalues of $J_{E_1}$ are $\lambda_1 = 1$ and $\lambda_2 = -1$, indicating that $E_1$ is a saddle point with index -1.</li>
  <li>At the equilibrium point $E_2=(1, -1)$, the Jacobian matrix is:
  \[
  J_{E_2} = \begin{bmatrix}
  \frac{\partial}{\partial x_1}(x_1-1) & \frac{\partial}{\partial x_2}(x_1-1) \\
  \frac{\partial}{\partial x_1}(-x_2-1) & \frac{\partial}{\partial x_2}(-x_2-1)
  \end{bmatrix} = \begin{bmatrix} 
  1 & 0 \\
  0 & -1
  \end{bmatrix}
  \]
  The eigenvalues of $J_{E_2}$ are $\lambda_1 = 1$ and $\lambda_2 = -1$, indicating that $E_2$ is a saddle point with index -1.</li>
  <li>At the equilibrium point $E_3=(0, 0)$, the Jacobian matrix is:
  \[
  J_{E_3} = \begin{bmatrix}
  \frac{\partial}{\partial x_1}(x_1-\frac{9}{2}x_1+\frac{1}{2}x_2) & \frac{\partial}{\partial x_2}(x_1-\frac{9}{2}x_1+\frac{1}{2}x_2) \\
  \frac{\partial}{\partial x_1}(-x_2-\frac{9}{2}x_1+\frac{1}{2}x_2) & \frac{\partial}{\partial x_2}(-x_2-\frac{9}{2}x_1+\frac{1}{2}x_2)
  \end{bmatrix} = \begin{bmatrix}
  -\frac{7}{2} & \frac{1}{2} \\
  -\frac{9}{2} & -\frac{1}{2}
  \end{bmatrix}
  \]
  The eigenvalues of $J_{E_3}$ are $\lambda_1, \lambda_2 = -2$, indicating that $E_3$ is a (stable) node with an index of +1.</li>
  </ul>

  <strong>Q3:</strong> From [Poincaré Index theorem](#thm_2.6), to have a limit cycle, we need to have $N = S + 1$. Here, we have $N = 1$ (one node) and $S = 2$ (two saddle points), so if a limit cycle exists, it should be located around the equilibrium point $E_3=(0, 0)$, ($N=1$ and $S=0$) and not enclose the other two equilibrium points ($N=1$ and $S\geq 1$).

  <strong>Q4, Q5, Q6:</strong> See the phase plane plot below, which includes the vector field, isoclines, and trajectories for different initial conditions.

  <div class="images" style="justify-content:center; text-align:center;">
    <figure>
      <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_ex1_phase_plane.png" alt="Phase plane solution" width="700"/>
      <figcaption style="text-align: center;"><strong>Figure:</strong> Phase plane of the system with vector field, isoclines, and trajectories for different initial conditions</figcaption>
    </figure>
  </div>

  The isoclines can be observed in the plot as dashed lines, with the red line representing the $dx_1/dt = 0$ isocline and the blue line representing the $dx_2/dt = 0$ isocline. They are calculated by setting $\dot{x}_1 = 0$ and $\dot{x}_2 = 0$ respectively:

  <div>
  \[
    \frac{dx_1}{dt} = 0 \Rightarrow x_1 = -\text{sat}(-\frac{9}{2}x_1+\frac{1}{2}x_2) \Rightarrow
    \begin{cases}
      x_1=-1 & \text{if } -\frac{9}{2}x_1+\frac{1}{2}x_2 > 1 \\
      x_1=\frac{1}{7}x_2 & \text{if } -1 \leq -\frac{9}{2}x_1+\frac{1}{2}x_2 \leq 1 \\
      x_1=1 & \text{if } -\frac{9}{2}x_1+\frac{1}{2}x_2 < -1
    \end{cases}
  \]
  </div>
  <div>
  \[
    \frac{dx_2}{dt} = 0 \Rightarrow x_2 = -\text{sat}(-\frac{9}{2}x_1+\frac{1}{2}x_2) \Rightarrow
     \begin{cases}
      x_2=-1 & \text{if } -\frac{9}{2}x_1+\frac{1}{2}x_2 > 1 \\
      x_2=9x_1 & \text{if } -1 \leq -\frac{9}{2}x_1+\frac{1}{2}x_2 \leq 1 \\
      x_2=1 & \text{if } -\frac{9}{2}x_1+\frac{1}{2}x_2 < -1
    \end{cases}
  \]
  </div>

  You can use the following Python/MATLAB code to generate the phase plane plot.

  <div class="tab-window" id="exampleTabs">
    <div class="tab-title">Code</div>
    <div class="tab-header">
      <button class="tab-btn active" onclick="showTab(0, 'exampleTabs')">Python</button>
      <button class="tab-btn" onclick="showTab(1, 'exampleTabs')">MATLAB</button>
    </div>
    <div class="tab-content active">
      <strong style="color: #2a7ae2; font-size: 1.1em;">Phase_plane_plot.py</strong><br><br>
      <pre><code class="language-python">
        import numpy as np
        import matplotlib.pyplot as plt
        from scipy.integrate import solve_ivp

        def sat(u):
            """Saturation function: clips input to the range [-1, 1]."""
            return np.clip(u, -1.0, 1.0)

        def f(t, z):
            """Defines the system of ODEs (signature compatible with solve_ivp)."""
            x1, x2 = z
            u = -9/2 * x1 + 1/2 * x2
            dx1 = x1 + sat(u)
            dx2 = -x2 + sat(u)
            return [dx1, dx2]

        # grid for vector field
        xmin, xmax, ymin, ymax = -4, 4, -3, 3
        nx, ny = 25, 25
        x1 = np.linspace(xmin, xmax, nx)
        x2 = np.linspace(ymin, ymax, ny)
        X1, X2 = np.meshgrid(x1, x2)

        # vector field for the specified system:
        U = X1 + sat(-4.5 * X1 + 0.5 * X2)
        V = -X2 + sat(-4.5 * X1 + 0.5 * X2)

        # normalize arrows for nicer display
        M = np.hypot(U, V)
        M[M == 0] = 1.0
        U2, V2 = U / M, V / M

        fig, ax = plt.subplots(figsize=(15, 8))
        ax.set_xlim(xmin, xmax)
        ax.set_ylim(ymin, ymax)
        ax.set_xlabel('x1', fontsize=14)
        ax.set_ylabel('x2', fontsize=14)
        ax.set_title('Phase plane: vector field + trajectories', fontsize=20)

        # quiver (sparse arrows)
        ax.quiver(X1, X2, U2, V2, M, pivot='mid', cmap='plasma', alpha=0.75)

        # nullclines: plot contours where dx/dt = 0 and dy/dt = 0 (computed on grid)
        DX = U  # dx/dt on grid
        DY = V  # dy/dt on grid
        ax.contour(X1, X2, DX, levels=[0], colors='r', linestyles='--', linewidths=2)
        ax.contour(X1, X2, DY, levels=[0], colors='b', linestyles='--', linewidths=2)

        # sample trajectories from several initial conditions (original list)
        ic_list = [[-0.5, 2.4], 
                  [-1.01, -1.5], 
                  [-0.99, -1.5],
                  [0, -2.75], 
                  [0, -1.0], 
                  [1.001, 2], 
                  [0.999, 2]]

        # plot trajectories (shorter time for illustration)
        tspan = (0, 40)
        t_eval = np.linspace(tspan[0], tspan[1], 2000)
        for ic in ic_list:
            sol = solve_ivp(f, tspan, ic, t_eval=t_eval, rtol=1e-6)
            ax.plot(sol.y[0], sol.y[1], '-k', lw=1, alpha=0.9)

        # mark the starting points of each trajectory with a red cross
        for ic in ic_list:
            ax.plot(ic[0], ic[1], marker='x', color='red', markersize=8, mew=2, linestyle='None')

        # create legend entries for nullclines, trajectories, and starting points
        ax.plot([], [], 'r--', lw=2, label='dx1/dt = 0 (nullcline)')
        ax.plot([], [], 'b--', lw=2, label='dx2/dt = 0 (nullcline)')
        ax.plot([], [], '-k', label='trajectories')
        ax.plot([], [], marker='x', color='red', linestyle='None', label='trajectory start')
        ax.legend(loc='upper right', fontsize=14)

        ax.grid(alpha=0.4)
        plt.tight_layout()
        plt.savefig('Phase_plane_plot.png', dpi=300)
        plt.show()
        plt.close()
  </code></pre>
  <div style="text-align:center; margin:1.2em 0;">
    <a class="download-btn" href="{{ site.baseurl }}/assets/downloads/Nonlinear_Control/Phase_plane_plot.py" download="Phase_plane_plot.py" style="display:inline-block; padding:8px 12px; background:#4F3DDB; color:#fff; border-radius:6px; text-decoration:none;">
      Download Phase_plane_plot.py
    </a>
  </div>
  </div>
    <div class="tab-content">
    <strong style="color: #2a7ae2; font-size: 1.1em;">Phase_plane_plot.m</strong><br><br>
    <pre><code class="language-matlab">
    function phase_plane_saturation()
      % Phase plane analysis of the nonlinear system with saturation
      % dot{x1} = x1 + sat(-9/2*x1 + 1/2*x2)
      % dot{x2} = -x2 + sat(-9/2*x1 + 1/2*x2)

      % Define grid for vector field
      xmin = -4; xmax = 4;
      ymin = -3; ymax = 3;
      nx = 25; ny = 25;
      [X1, X2] = meshgrid(linspace(xmin, xmax, nx), linspace(ymin, ymax, ny));

      % Vector field
      U = X1 + sat(-4.5 * X1 + 0.5 * X2);
      V = -X2 + sat(-4.5 * X1 + 0.5 * X2);

      % Normalize arrows for nicer quiver plot
      M = hypot(U, V);
      M(M == 0) = 1;
      U2 = U ./ M;
      V2 = V ./ M;

      % Plot setup
      figure('Position', [200 100 1000 600]); hold on;
      quiver(X1, X2, U2, V2, 0.6, 'Color', [0.5 0.5 0.5]);
      colormap('parula');

      xlabel('x_1', 'FontSize', 14);
      ylabel('x_2', 'FontSize', 14);
      title('Phase plane: vector field + trajectories', 'FontSize', 18);
      xlim([xmin xmax]);
      ylim([ymin ymax]);
      grid on;

      % Compute and plot nullclines (dx/dt = 0 and dy/dt = 0)
      DX = U;
      DY = V;
      contour(X1, X2, DX, [0 0], 'r--', 'LineWidth', 2);
      contour(X1, X2, DY, [0 0], 'b--', 'LineWidth', 2);

      % List of initial conditions
      ic_list = [
          -0.5,  2.4;
          -1.01, -1.5;
          -0.99, -1.5;
          0,   -2.75;
          0,   -1.0;
          1.001, 2;
          0.999, 2
      ];

      % Time span for integration
      tspan = [0 40];

      % Simulate trajectories
      for k = 1:size(ic_list,1)
          ic = ic_list(k,:);
          [t, z] = ode45(@(t, z) f(t, z), tspan, ic);
          plot(z(:,1), z(:,2), '-k', 'LineWidth', 1);
          plot(ic(1), ic(2), 'xr', 'LineWidth', 2, 'MarkerSize', 8);
      end

      % Legend
      legend({'Vector field', 'dx1/dt = 0', 'dx2/dt = 0', ...
          'Trajectories', 'Start points'}, ...
          'Location', 'northeastoutside');

      hold off;

      % Save figure
      saveas(gcf, 'Phase_plane_plot_MATLAB.png');
    end

    %-------------------------------------------------------------
    % System dynamics
    function dz = f(~, z)
        x1 = z(1);
        x2 = z(2);
        u = -4.5 * x1 + 0.5 * x2;
        dx1 = x1 + sat(u);
        dx2 = -x2 + sat(u);
        dz = [dx1; dx2];
    end

    %-------------------------------------------------------------
    % Saturation function
    function y = sat(u)
        y = min(max(u, -1), 1);
    end
  </code></pre>
  <div style="text-align:center; margin:1.2em 0;">
    <a class="download-btn" href="{{ site.baseurl }}/assets/downloads/Nonlinear_Control/Phase_plane_plot.m" download="Phase_plane_plot.m" style="display:inline-block; padding:8px 12px; background:#4F3DDB; color:#fff; border-radius:6px; text-decoration:none;">
      Download Phase_plane_plot.m
    </a>
  </div>
  </div>
</div>
</details>

**2.2: Study of a nonlinear system**

Consider the following nonlinear system:
<div>
\[
\begin{align}
\dot{x}_1 &= x_1^2 + x_2^2-2 \\
\dot{x}_2 &= -x_1^2 + x_2
\end{align}
\]
</div>

1. Determine all the equilibrium points of the system.
2. Linearize the system around each equilibrium point and compute the eigenvalues of the linearized system. Deduce the type and stability of each equilibrium point.
3. Draw the phase plane of the system and the vector field.
4. Determine the index of each equilibrium point, using the graphical method discussed in the chapter.
5. Determine the index by computing the sign of the Jacobian determinant for each equilibrium.
6. Find the index of a circle of radius 2 centered at the origin, first using the graphical method, then using the index theorem.

<details markdown="1">
 <summary><strong>Solution</strong></summary>
  <strong>Q1:</strong> In order to find the equilibrium points, we need to solve the equations
  <div>
  \[
    \begin{align}
    0 &= x_1^2 + x_2^2 - 2 \\
    0 &= -x_1^2 + x_2
    \end{align}
  \]
  </div>
  From the second equation, we have $x_2 = x_1^2$. Substituting this into the first equation gives:
  $$
  0 = x_2 + x_2^2 - 2
  $$
  From which we find $x_2 = 1$ or $x_2 = -2$. The value $x_2=1$ gives $x_1 = \pm 1$, leading to two equilibrium points: $(1, 1)$ and $(-1, 1)$. The value $x_2 = -2$ does not yield any real solutions for $x_1$. Therefore, the system has two equilibrium points: $(1, 1)$ and $(-1, 1)$.

  <strong>Q2:</strong> The linear approximation of the system around an equilibrium point $(x_1^\*, x_2^\*)$ is given by the Jacobian matrix evaluated at that point.
  - case 1: at the equilibrium point $(-1, 1)$
  <div>
  \[
    A_{(-1,1)} = \left.\begin{bmatrix}
    \frac{\partial \dot{x}_1}{\partial x_1} & \frac{\partial \dot{x}_1}{\partial x_2} \\
    \frac{\partial \dot{x}_2}{\partial x_1} & \frac{\partial \dot{x}_2}{\partial x_2}
    \end{bmatrix}\right\rvert_{(-1,1)}
    = \left.\begin{bmatrix}
    2x_1 & 2x_2 \\
    -2x_1 & 1\end{bmatrix}\right\rvert_{(-1,1)}
    = \begin{bmatrix}
    -2 & 2 \\
    2 & 1
    \end{bmatrix}
  \]
  </div>

  - case 2: at the equilibrium point $(1, 1)$
  <div>
  \[
    A_{(1,1)} = \left.\begin{bmatrix}
    2x_1 & 2x_2 \\
    -2x_1 & 1\end{bmatrix}\right\rvert_{(1,1)}
    = \begin{bmatrix}
    2 & 2 \\
    -2 & 1
    \end{bmatrix}
  \]
  </div>

  The eigenvalues of the first equilibrium point $(-1, 1)$ are $\lambda(A_{(-1,1)}) = {-3,2}$ , indicating that it is a saddle point and thus unstable. The eigenvalues of the second equilibrium point $(1, 1)$ are $\lambda(A_{(1,1)}) = {\frac{3\pm i\sqrt{15}}{2}}$, since $\Re(\lambda(A_{(1,1)}))>0$, this equilibrium is an unstable focus (see [Figure 2.3](#fig_2.3_equilibrium_points)).

  <strong>Q3:</strong> See the phase plane plot below, which includes the vector field and several trajectories for different initial conditions.

  <div class="images" style="justify-content:center; text-align:center;">
    <figure>
      <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_ex_2_2_Phase_plane_plot.png" alt="Phase plane solution" width="500"/>
      <figcaption style="text-align: center;"><strong>Figure:</strong> Phase plane of the system with vector field and trajectories for different initial conditions</figcaption>
    </figure>
  </div>

  <strong>Q4:</strong> Using the graphical method, we chose a closed curve around each equilibrium point, containing only one equilibrium at a time. We use here a circle of radius 1 centered at each equilibrium point for simplicity. By observing the direction of the vector field along the curve, we can determine the index of each equilibrium point:
  - For the equilibrium point $(-1, 1)$, the vector field rotates in a clockwise direction as we traverse the circle, indicating an index of -1 (saddle point).
  - For the equilibrium point $(1, 1)$, the vector field rotates in a counterclockwise direction as we traverse the circle, indicating an index of +1 (unstable focus).

  <div class="images" style="justify-content:center; text-align:center;">
    <figure>
      <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_Index_plot_ex2-2_1.png" alt="Index graphical method" width="500"/>
      <figcaption style="text-align: center;"><strong>Figure:</strong> Graphical method to determine the index of equilibrium points</figcaption>
    </figure>
  </div>

  <strong>Q5:</strong> The index of each equilibrium point can also be determined by computing the sign of the Jacobian determinant at each point:
  - For the equilibrium point $(-1, 1)$:
  $$
  \text{sgn}(\text{det}(A_{(-1,1)})) = \text{sgn}((-2)(1) - (2)(2)) = \text{sgn}(-6) = -1
  $$
  - For the equilibrium point $(1, 1)$:
  $$
  \text{sgn}(\text{det}(A_{(1,1)})) = \text{sgn}((2)(1) - (2)(-2)) = \text{sgn}(6) = +1
  $$
  Thus, the index of the equilibrium point $(-1, 1)$ is -1, and the index of the equilibrium point $(1, 1)$ is +1, which is consistent with the results obtained using the graphical method.

  <strong>Q6:</strong> To find the index of a circle of radius 2 centered at the origin, we can use both the graphical method and the index theorem.
  - Using the graphical method, we observe the vector field along the circle of radius 2 centered at the origin. As we traverse the circle, the vector field does not complete a full rotation, indicating that the index is 0.
  - Using the index theorem, we sum the indices of the equilibrium points enclosed by the circle. The circle of radius 2 centered at the origin encloses both equilibrium points $(-1, 1)$ and $(1, 1)$. Therefore, the total index is:
  $$
  \text{Index} = \text{Index}(-1, 1) + \text{Index}(1, 1) = -1 + 1 = 0
  $$

  Both methods confirm that the index of the circle of radius 2 centered at the origin is 0.

  <div class="images" style="justify-content:center; text-align:center;">
    <figure>
      <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch2_Index_plot_ex2-2_2.png" alt="Index circle graphical method" width="500"/>
      <figcaption style="text-align: center;"><strong>Figure:</strong> Graphical method to determine the index of a circle of radius 2 centered at the origin</figcaption>
    </figure>
  </div>
</details>

---

# Chapter 3: First Harmonics Method

In this chapter, we will explore the First Harmonics Method, understanding its principles and applications in analyzing nonlinear systems. This method can be applied on a restricted class of nonlinear systems, but nonetheless frequently encountered in practice. The importance of this class of systems lies in the imperfections of real-world actuators, which often exhibit nonlinear behaviors such as saturation, dead zones, and hysteresis. These nonlinearities do not disappear when the system is linearized around an equilibrium point, making it essential to consider them in control design and analysis

Those nonlinearities cannot be ignored or removed physically, as they are inherent to the system's operation. Therefore, understanding and applying the First Harmonics Method allows engineers to effectively analyze and design controllers for systems with such nonlinear characteristics, ensuring robust performance in real-world applications.

In this part, we will only consider static nonlinearities, meaning that the nonlinearity depends solely on the current value of the input and not on its history or rate of change. Additionally, we will focus on single-input single-output (SISO) systems for simplicity. 

---

## 3.1: Static Nonlinearity

We consider a SISO nonlinear system represented in the block diagram below ([Figure 3.1](#fig_3.1_block_diagram)), where a nonlinearity $N.L.$ is placed in series with a linear time-invariant (LTI) system $G(s)$. We call $u$ the input of the nonlinearity, $y$ its output, which is also the input pf the LTI system $G(s)$, and $z$ its the output.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.1_block_diagram">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_block_diagram.jpeg" alt="Static Nonlinearity Block Diagram" width="400"/>
    <figcaption style="text-align: center;"><strong>Figure 3.1:</strong> Block diagram of a SISO system with a static nonlinearity ($N.L.$) in series with an LTI system ($G(s)$)</figcaption>
  </figure>
</div>

We can see that we make a clear separation between the nonlinear part of the system (the static nonlinearity) and the linear part (the LTI system). This separation allows us to analyze and design control strategies for each part independently, simplifying the overall process. We also only consider a static nonlinearity, meaning that the output of the nonlinearity at any given time depends solely on the current input value, then the output $y(t)$ can be expressed as a function of the input $u(t)$:
$$
y(t) = \Phi(u(t))
$$
where $\Phi(\cdot)$ represents the nonlinear function characterizing the static nonlinearity.

To illustrate this concept, let's consider a saturation nonlinearity as the first block in our system. To stimulate the system, we apply a sinusoidal input signal, with amplitude $A$ and pulsation $\omega$, to the nonlinearity:
$$
u(t) = A \sin(\omega t)
$$
The saturation is defined as:
<div>
\[
  \tag{3.1}\label{eq:saturation_nonlinearity}
\hat{\Phi}(u(t)) = \begin{cases}
ka & \text{if } u(t) > a \\
ku(t) & \text{if } -a \leq u(t) \leq a \\
-ka & \text{if } u(t) < -a
\end{cases}
\]
</div>
where $k$ is the gain in the linear region and $a$ is the saturation limit. The output of the nonlinearity $y(t)$ is presented in [Figure 3.2](#fig_3.2_saturation_nonlinearity).

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.2_saturation_nonlinearity">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_Saturation_nonlinearity.png" alt="Saturation Nonlinearity Output" width="650"/>
    <figcaption style="text-align: center;"><strong>Figure 3.2:</strong> Output of a saturation nonlinearity excited by a sinusoidal input signal</figcaption>
  </figure>
</div>

The goal is to determine a complex gain $N$ that approximates the behavior of the nonlinearity when the system is excited by a sinusoidal input. This gain, known as the equivalent gain of the nonlinearity, allows us to analyze the system in a simpler way. To find the value of N, one can rely on a trial-and-error approach. For simple systems, it can be determined relatively easily; however, it is important to note that $N$ generally depends on the amplitude $A$ and the angular frequency $\omega$, making harder to determine using a trial-and-error approach. Once the equivalent gain $N$ is determined, we can replace the nonlinearity in the block diagram with its equivalent gain, resulting in a simplified system as shown in [Figure 3.3](#fig_3.3_block_diagram_2).

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.3_block_diagram_2">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_block_diagram_2.jpeg" alt="Static Nonlinearity Block Diagram 2" width="400"/>
    <figcaption style="text-align: center;"><strong>Figure 3.3:</strong> Block diagram of a SISO system with the equivalent gain ($N$) in series with an LTI system ($G(s)$)</figcaption>
  </figure>
</div>

---

## 3.2: First Harmonic

As previously mentioned, it is not optimal to determine the equivalent gain $N$ using simulations and a trial-and-error approach, especially when $N$ depends on the amplitude $A$ and the angular frequency $\omega$. To address this issue, we can formulate a method to compute $N$ analytically.

The static nonlinearity exhibits interesting properties. In addition to being time-invariant, it preserves the period of the input signal. Indeed, for an input signal defined as $u(t) = A\sin(\omega t)$, the output signal will have the same period $T = 2\pi / \omega$. This property allows us to analyze $y(t)$ using a Fourier series decomposition. 

<div>
\[
  y(t)=\frac{a_0}{2}+\sum_{l=1}^\infty\left[a_l\cos(l\omega t)+b_l\sin(\omega t)\right] \tag{3.2}\label{eq:Fourier_series}
\]
</div>
with
<div>
\[
  a_0 = \frac{1}{\pi}\int_{-\pi}^\pi y(t) d(\omega t) \tag{3.3}\label{eq:Fourier_series_a0}
\]
</div>
<div>
\[
  a_l = \frac{1}{\pi}\int_{-\pi}^\pi y(t) \cos(l\omega t) d(\omega t) \tag{3.4}\label{eq:Fourier_series_al}
\]
</div>
<div>
\[
  b_l = \frac{1}{\pi}\int_{-\pi}^\pi y(t) \sin(l\omega t) d(\omega t) \tag{3.5}\label{eq:Fourier_series_bl}
\]
</div>

The principal drawback of this decomposition is that it involves an infinite number of harmonics, which can be computationally intensive. However, in many practical cases, the first harmonic (i.e., $l=1$) provides a good approximation of the output signal. It is also important to note that teh components $a_0$, $a_l$ and $b_l$ depend on the amplitude $A$ and the angular frequency $\omega$ of the input signal. Formally, we should write $a_0(A,\omega)$, $a_l(A,\omega)$ and $b_l(A,\omega)$, but in order to improve the readability, we will continue to use $a_0$, $a_1$ and $b_1$ without the mention of the amplitude and pulsation dependency.

Using only the first harmonic, we can approximate the output of the nonlinearity as:
$$
y(t) \approx a_0 + a_1 \cos(\omega t) + b_1 \sin(\omega t) = a_0 + M \sin(\omega t + \alpha)
$$
Where the amplitude $M$ and phase $\alpha$ are given by the coefficients $a_1$ and $b_1$ as follows:
<div>
\[
  \begin{align}
  M &= \sqrt{a_1^2 + b_1^2} \\
  \alpha(A, \omega) &= \arctan\left(\frac{a_1}{b_1}\right)
  \end{align}
  \]
</div>

When the nonlinearity is perfectly symmetric ($a_0 = 0$) teh equivalent gain can be expressed as: 
$$
N(A, \omega) = M \frac{e^{j\omega t + \alpha}}{Ae^{j\omega t}}=\frac{M}{A}e^{j\alpha}=\frac{1}{A}(b_1+ja_1)
$$

If we revisit the saturation example \eqref{eq:saturation_nonlinearity} introduced in the previous section, we can now compute the equivalent gain analytically. However, it is necessary to distinguish between two cases in our analysis:  

- **When $A \leq a$:** the system does not saturate, and no particular attention needs to be given to its dynamics.  
- **When $A > a$:** the system enters the saturation region, and the behavior must be analyzed more carefully.  

These two cases can be expressed as follows:  

<div>
\[
\begin{align}
A \leq a, \quad & y(t) = kA\sin(\omega t) \\[6pt]
A > a, \quad & y(t) =
  \begin{cases}
    kA\sin(\omega t), & 0 \leq \omega t \leq \gamma, \\[4pt]
    ka, & \gamma < \omega t \leq 2\pi
  \end{cases}
\end{align}
\]
</div>

Here, $\gamma$ is an arbitrary variable representing the instant when the signal transitions from the linear region $A \leq a$ to the saturated region $A > a$.  

We notice that the saturation is perfectly symmetric, meaning $\hat{\Phi}(-u)=\hat{\Phi}(u)$, this leads to:
$$
a_0 = \frac{1}{\pi}\int_{-\pi}^{\pi}y(t)d(\omega t)=0
$$
Similarly, due to the symmetry of $\hat{\Phi}(\cdot)$, we have $a_1=0$. However the component $b_1$ is different from zero and the case $A > a$ requires special attention. In this case, we can compute $b_1$ as follow for a quarter of period (due to the symmetry):
<div>
\[
  b_1 = \frac{1}{\pi}\int_0^\gamma A \sin^2(\omega t)d\omega t + \frac{1}{\pi}\int_\gamma^{2\pi} ka \sin(\omega t)d\omega t = \frac{kA}{2\pi}\left[\gamma + \frac{a}{A}\sqrt{1-\frac{a^2}{A^2}}\right]
\]
</div>
After multiplying by 4, we get the equivalent gain:
<div>
\[
  N(A)=\begin{cases}
  k & \quad A\leq a\\
  \frac{2k}{\pi}\left[\arcsin(\frac{a}{A}) + \frac{a}{A}\sqrt{1-\frac{a^2}{A^2}}\right] & \quad A>a
  \end{cases}
\]
</div>
for $\gamma=\arcsin(a/A)$, you can find bellow the graph of $N$ for the coefficient value used in the system represented in [Figure 3.2](#fig_3.2_saturation_nonlinearity).

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.4_equivalent_gain_saturation">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_N_function_saturation.png" alt="Equivalent Gain Saturation" width="500"/>
    <figcaption style="text-align: center;"><strong>Figure 3.4:</strong> Equivalent gain $N$ of a saturation nonlinearity as a function of the input amplitude ratio $\tfrac{A}{a}$</figcaption>
  </figure>
</div>

---

## 3.3: Types of Nonlinearities

In this section, we introduce several common types of nonlinearities found in control systems, including the **Saturation**, **Dead Zone**, **Relay**, and **Hysteresis** nonlinearities. We begin with the **Saturation**, as many of the others can be derived from it as a fundamental building block.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.6_nonlinearity_types">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_nonlinearity_types.png" alt="Nonlinearity types" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 3.6:</strong> Typical types of nonlinearities</figcaption>
  </figure>
</div>

**Saturation**

A *saturation* occurs when a system is required to produce an output that exceeds its physical or operational limits. In this situation, the output no longer increases proportionally with the input but remains fixed at a maximum or minimum value (see [Figure 3.6](#fig_3.6_nonlinearity_types)).

The mathematical representation of a saturation nonlinearity is given by:

<div>
\[
\tag{3.6}\label{eq:saturation_nonlinearity_2}
\Phi_{\text{sat}}(u(t)) =
\begin{cases}
ka, & \text{if } u(t) > a, \\[4pt]
ku(t), & \text{if } -a \leq u(t) \leq a, \\[4pt]
-ka, & \text{if } u(t) < -a.
\end{cases}
\]
</div>

As shown in the previous section, the equivalent gain of a saturation nonlinearity is expressed as:

<div>
\[
N(A) =
\begin{cases}
k, & \quad A \leq a, \\[6pt]
\dfrac{2k}{\pi} \left[ \arcsin\!\left(\dfrac{a}{A}\right) + \dfrac{a}{A}\sqrt{1 - \dfrac{a^2}{A^2}} \right], & \quad A > a.
\end{cases}
\]
</div>

The variation of the equivalent gain as a function of $\tfrac{A}{a}$ is illustrated in [Figure 3.4](#fig_3.4_equivalent_gain_saturation).

**Example:**  
Saturation is common in **electrical amplifiers** or **actuators** that can only provide a limited voltage, current, or torque. Once this limit is reached, the output remains constant regardless of additional input.

**Dead Zone**

A *dead zone* represents a range of input values around zero for which the output remains zero. This effect is often caused by mechanical backlash, friction, or electronic thresholding. For inputs exceeding the threshold $\delta$, the output increases linearly with a gain $k$ (see [Figure 3.6](#fig_3.6_nonlinearity_types)).

The mathematical representation of a dead zone nonlinearity is:

<div>
\[
\tag{3.7}\label{eq:dead_zone_nonlinearity}
\Phi_{\text{dz}}(u(t)) =
\begin{cases}
k(u(t) - \delta), & u(t) > \delta, \\[4pt]
0, & -\delta \leq u(t) \leq \delta, \\[4pt]
k(u(t) + \delta), & u(t) < -\delta.
\end{cases}
\]
</div>

This nonlinearity can be constructed from the saturation function by shifting the input signal by $a = \delta$, giving  
<div>
\[
\Phi_{\text{dz}} = k - \Phi_{\text{sat}}.
\]
</div>

The equivalent gain of a dead zone nonlinearity is derived from that of the saturation as:

<div>
\[
N(A) =
\begin{cases}
0, & \quad A \leq \delta, \\[6pt]
\dfrac{2k}{\pi} \left[\dfrac{\pi}{2} - \arcsin\!\left(\dfrac{\delta}{A}\right) - \dfrac{\delta}{A}\sqrt{1 - \dfrac{\delta^2}{A^2}} \right], & \quad A > \delta.
\end{cases}
\]
</div>

The graphical representation of the equivalent gain $N(A)$ is presented below.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.5_equivalent_gain_dead_zone">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_N_function_dead_zone.png" alt="Equivalent Gain Dead Zone" width="500"/>
    <figcaption style="text-align: center;"><strong>Figure 3.5:</strong> Equivalent gain $N$ of a dead zone nonlinearity as a function of the input amplitude $A$</figcaption>
  </figure>
</div>

**Example:**  
A dead zone can be observed in **hydraulic valves** that require a minimum pressure to open, or in **DC motors** that need a minimum voltage to overcome static friction before rotation begins.

**Relay**

A *relay* acts as an on–off switch that outputs two constant values depending on the sign of the input. When the input is positive, the output is $+M$; when it is negative, the output is $-M$ (see [Figure 3.6](#fig_3.6_nonlinearity_types)).  

Mathematically, this can be described as:

<div>
\[
\Phi_{\text{re}}(u(t)) =
\begin{cases}
+M, & u(t) > 0, \\[4pt]
0, & u(t) = 0, \\[4pt]
-M, & u(t) < 0.
\end{cases}
\]
</div>

To compute its equivalent gain, we can express the relay as a limiting case of the saturation function by setting $k = \tfrac{a}{M}$ and letting $a \to 0$:

<div>
\[
\Phi_{\text{re}}(u(t)) = \lim_{a \to 0} \Phi_{\text{sat}}\!\left(a,\, k = \tfrac{a}{M},\, u(t)\right).
\]
</div>

This leads to:

<div>
\[
N(A) = \dfrac{4M}{\pi A}.
\]
</div>

**Example:**  
Relay behavior appears in **thermostats** (heating/cooling control), **bang-bang controllers**, or **digital switches**, where the actuator can only be fully on or fully off.

**Hysteresis**

*Hysteresis* occurs when the system’s output depends not only on the current input but also on its past values. This memory effect can cause oscillations, limit cycles, or delayed responses in control systems.  

A common example is **mechanical backlash** between gears: when motion reverses direction, there is a small delay before one gear engages the other.  

The first harmonic components of the hysteresis nonlinearity are given by:

<div>
\[
\begin{align}
a_1 &= \dfrac{4k\delta}{\pi}\left(\dfrac{\delta}{A} - 1\right), \\[6pt]
b_1 &= \dfrac{Ak}{\pi}\left[\dfrac{\pi}{2} - \arcsin\!\left(\dfrac{2\delta}{A} - 1\right) - \left(\dfrac{2\delta}{A} - 1\right)\sqrt{1 - \left(\dfrac{2\delta}{A} - 1\right)^2}\right], \\[6pt]
\lVert N(A) \rVert &= \dfrac{1}{A}\sqrt{a_1^2 + b_1^2}, \\[6pt]
\angle N(A) &= \arctan\!\left(\dfrac{a_1}{b_1}\right).
\end{align}
\]
</div>

**Example:**  
Hysteresis is encountered in **magnetic materials** (magnetization curve), **thermostats with differential thresholds**, and **piezoelectric actuators** with memory effects.

---

## 3.4: Stability Analysis

---

## Exercises

**3.1: Demonstration of the First Harmonic Method**

During the chapter, we saw that the output of a static nonlinearity ($y(t)=\Phi(u(t))$) excited by a sinusoidal input ($u(t) A\sin(\omega t)$) can be approximated by its first harmonic:
$$
y(t) \approx a_1 \cos(\omega t) + b_1 \sin(\omega t)
$$
Show that the equivalent gain $N$ is, in that case, given by:
$$
N(A, \omega) = \frac{1}{A}(b_1 + j a_1)
$$

You can proceed in the following way:
- use the Euler's formula to express the sine and cosine function as a combination of complex exponential: $\sin(\omega t) = \frac{e^{j\omega t} - e^{-j\omega t}}{2j}$ and $\cos(\omega t) = \frac{e^{j\omega t} + e^{-j\omega t}}{2}$
- Refactor the expression by grouping the terms in $e^{j\omega t}$ and $e^{-j\omega t}$. Then the two expressions should be equal to zero.
- Explain the appearing contradiction.

<details markdown="1">
  <summary><strong>Solution</strong></summary>
  The relationship between the input and output of the static nonlinearity can be expressed by the equivalent gain $N$ as follows:
  $$
  y(t) = N u(t) \Rightarrow a_1 \cos(\omega t) + b_1 \sin(\omega t) = N A \sin(\omega t)
  $$
  Using Euler's formula, we can express the sine and cosine functions in terms of complex exponential:
  $$
  a_1 \left(\frac{e^{j\omega t} + e^{-j\omega t}}{2}\right) + b_1 \left(\frac{e^{j\omega t} - e^{-j\omega t}}{2j}\right) = N A \left(\frac{e^{j\omega t} - e^{-j\omega t}}{2j}\right)
  $$
  Factoring the expression by grouping the terms in $e^{j\omega t}$ and $e^{-j\omega t}$, we get:
  <div>
  \[
    \begin{align*}
    \left(N-\frac{1}{A}(b_1 + j a_1)\right) e^{j\omega t} &= 0 \\
    \left(N+\frac{1}{A}(b_1 - j a_1)\right) e^{-j\omega t} &= 0
    \end{align*}
  \]
  </div>
  This situation leads to an apparent contradiction, since both expressions cannot be equal to zero at the same time unless  
  \[
  N = \frac{1}{A}(b_1 + j a_1) \quad \text{and} \quad N = \frac{1}{A}(b_1 - j a_1),
  \]  
  which is clearly impossible.  

  The issue arises from using the same symbol $N$ for both terms. In fact, the first expression provides the value of $N$, while the second corresponds to the **negative frequency component**, for which we must use the **complex conjugate** of $N$. This is consistent with the general property of harmonic transfer functions: $G(-j\omega) = G^*(j\omega)$.

  Therefore, we can write:  
  <div>
  \[
  \left(N^* + \frac{1}{A}(b_1 - j a_1)\right)e^{-j\omega t} = 0,
  \]  
  </div>
  and finally conclude that the equivalent gain is:  
  <div>
  \[
  N = \frac{1}{A}(b_1 + j a_1).
  \]
  </div>
</details>

---

# Chapter 4: Lyapunov Stability Theorem

---

# Chapter ?: Frobenius Theorem

---

# Chapter ?: Control Design Methods

---

<!--  

Decompose the course into chapters

You can use Slotine's book and lectures: https://web.mit.edu/nsl/www/videos/lectures.html to help you construct the course.

You can also use some of the material from Alireza Karimi's course. Make sure to add all sources in credits.

Topics it should entail:
-   general intro to DS, time-explicit and autonomous/time-invariant systems
 - introduce stability of linear systems, notion of stable, instable pts, limit cycles and bifurcations -  you can also use some resources from scholarpedia: http://www.scholarpedia.org/article/Encyclopedia:Dynamical_systems  and crossrefer to some of these pages for more info. Some of the notions presented there could also be expected in prerequisites (e.g. differential equations)

  - Lyapunov theory for control (stability of linear, nonlinear systems, exponential stability, etc.)

Then move to 
- 	Sliding Mode Control
 -   Robust Control
 -   Adaptive control

It would be good to also have a section on nonlinear MPC (but could be moved to MPC)
-->

## Additional Resources

### Credits:
- Slotine's Nonlinear Control Book and Lectures: https://web.mit.edu/nsl/www/videos/lectures.html
- Philippe Müllhaupt's lecture: **Nonlinear Control Course (ME-523)** at EPFL in Autumn 2024
- **Introduction à l'analyse et à la commande des systems non linéaires** textbook by Philippe Müllhaupt, first edition (french)

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including  the page on haptics under Human-Robot Interaction chapter -->

