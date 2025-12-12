---
title: 6.2 Nonlinear Control
parent: "Chapter 6: Advanced Control"
has_children: false
nav_order: 2
layout: default
author: Julian Ruiz Rodriguez (EPFL)
---

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
.thm-window {
  border: 2px solid #e7260c;   /* Red outline */
  border-radius: 10px;         /* Rounded edges */
  background: #ffffff;         /* Clean white background */
  width: 725px;
  margin: 2em auto;
  padding: 1em 1.2em;          /* Add padding for readability */
  box-shadow: 0 2px 8px rgba(226, 42, 60, 0.05);
}
.thm-title {
  font-weight: bold;           
  font-size: 1em;              /* Same size as normal text */
  background: none;            /* Remove red background */
  color: #e7260c;              /* Make text red to match the outline */
  margin-bottom: 0.5em;        /* Add spacing after the title */
}
.proof {
  position: relative;  /* Add this if missing */
  padding-right: 1.6em; /* Space for the QED symbol */
  margin-top: .8em;
  margin-bottom: .8em;
}
.proof .qed {
  position: absolute;
  right: 0;  /* Align fully to the right edge of the proof container */
  top: 0.2em;
  font-size: 0.95em;
  color: #333;
}
.def-title {
  font-weight: bold;           
  font-size: 1em;              /* Same size as normal text */
  background: none;            /* Remove red background */
  color: #FC814A;              /* Make text red to match the outline */
  margin-bottom: 0.5em;        /* Add spacing after the title */
}
.def-window {
  border: 2px solid #FC814A;   /* Red outline */
  border-radius: 10px;         /* Rounded edges */
  background: #ffffff;         /* Clean white background */
  width: 725px;
  margin: 2em auto;
  padding: 1em 1.2em;          /* Add padding for readability */
  box-shadow: 0 2px 8px rgba(226, 42, 60, 0.05);
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
.studyCase-window{
  border: 2px dashed #4F3DDB;
  border-radius: 10px;
  background: #f8f9fa;
  padding: 1em;
  margin: 2em auto;
}
.studyCase-title{
  font-weight: bold;         
  color: #4F3DDB;
  font-size: 1em;
  margin-bottom: 0.5em;
  text-align: center;
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
.quiz-situations {
  display:flex;
  flex-direction:column;
  gap:1em;
}
.situation {
  display:flex;
  align-items:center;
  gap:1em; 
}
.dropzone {
  min-width:100px;
  min-height:32px;
  border:2px dashed #bbb;
  border-radius:6px;
  background:#fff;
  display:inline-block;
  vertical-align:middle;
  }
.quiz-answers {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-top: 0.5em;
  min-height: 60px;    /* ✅ Ensures space even if empty */
}
.answer { 
  background:#e7e7fa; 
  border:1px solid #73C47C; 
  border-radius:6px; 
  padding:0.5em 1em; 
  cursor:grab; 
  font-weight:500;   
  display: flex;              /* makes alignment possible */
  justify-content: center;    /* centers horizontally */
  align-items: center;        /* centers vertically */
  text-align: center;         /* makes multiline text centered */
}
.answer:active { 
  opacity:0.7;
}
.quiz-bank {
  border: 2px dashed #73C47C;
  border-radius: 10px;
  padding: 1em;
  margin: 1.5em;
  background: #f8f9fa;
  min-height: 120px;   /* ✅ Keeps the bank area visible and consistent */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
</style>

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

<script>
function showTab(idx, windowId) {
  var windowElem = document.getElementById(windowId);
  var btns = windowElem.querySelectorAll('.tab-btn');
  var tabs = windowElem.querySelectorAll('.tab-content');
  btns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
  tabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
}

/* ============ Quiz Functions ============ */
function allowDrop(ev) { ev.preventDefault(); }
function drag(ev) { ev.dataTransfer.setData("text", ev.target.id); }
function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dropzone = ev.target.classList.contains('dropzone') ? ev.target : ev.target.closest('.dropzone');
  if (dropzone && !dropzone.querySelector('.answer')) {
    const dragged = document.getElementById(data);
    dropzone.appendChild(dragged);
  }
}
function checkQuiz() {
  let correct = 0, total = 0;
  document.querySelectorAll('.situation').forEach(sit => {
    total++;
    const ans = sit.querySelector('.dropzone .answer');
    if (ans && ans.dataset.value === sit.dataset.answer) correct++;
  });
  const result = document.getElementById('quiz-result');
  if (correct === total) {
    result.textContent = "✅ All correct!";
    result.style.color = "#2a7ae2";
  } else {
    result.textContent = `❌ ${correct} out of ${total} correct. Try again!`;
    result.style.color = "#e7260c";
  }
}
function dropBank(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const dropzone = ev.target.classList.contains('dropzone') ? ev.target : ev.target.closest('.dropzone');
  const dragged = document.getElementById(data);
  dropzone.appendChild(dragged);
}
</script>


# 6.2 System Identification 

## 6.2.1 Prerequisites
<!-- List courses required for this, including all course of Chapter 1 coming prior to this one, hence close-loop control, MPC, etc.  -->
* Linear Algebra
* Differential Equations
* Laplace Transforms
* Control Systems
  - Linear state
  - Transfer Functions
  - Controllability/observability

---
## 6.2.2 General Motivation

The study of **nonlinear control** focuses on the analysis and design of control systems that exhibit nonlinear behavior, that is, systems in which one or more components do not obey the principle of superposition. In such systems, the relationship between input and output is not simply proportional, and as a result, linear control theory no longer provides accurate predictions or guarantees of stability.

In the analysis of nonlinear control systems, our primary objectives are to understand **stability**, **controllability**, and **observability**, and to design control laws that ensure the desired behavior of the system under nonlinear dynamics.

One might naturally ask: *why do we need nonlinear control when linear control techniques are already well-established and widely used?*  
The answer lies in the limitations of linear methods and the complexity of real-world systems. Several key motivations justify the need for nonlinear control:

- **Improved performance:**  
  Linear control systems are typically designed to work around a small neighborhood of an equilibrium point. When the operating range of the system extends beyond this region, linear approximations lose accuracy, and performance can degrade significantly. Nonlinear control techniques allow us to design controllers that maintain high performance over a **wide range of operating conditions**.

- **Handling hard nonlinearities:**  
  Many physical systems display *hard nonlinearities*, such as **saturation**, **dead zones**, or **hysteresis**, which cannot be captured by linear models. Nonlinear control strategies provide tools to **explicitly model and compensate** for such behaviors, ensuring accurate and stable operation even when linearization fails.

- **Dealing with model uncertainties:**  
  In practice, system parameters are rarely known exactly. A linear controller designed for an idealized model may perform poorly or even cause instability if the real system deviates from that model. Nonlinear control methods, on the other hand, can be made **robust to model uncertainties** and **parameter variations**, leading to improved stability and reliability.

Nonlinear control is, therefore, an essential field within modern control theory. Its techniques find applications in **robotics**, **aerospace systems**, **automotive control**, **power electronics**, and **process engineering** — wherever system dynamics deviate from linearity.  
By embracing the nonlinear nature of these systems, engineers and researchers can design controllers that are more **accurate, robust, and efficient**, ultimately extending the reach of control theory to a much broader class of real-world problems.

---
## 6.2.3 Course Content

### 6.2.3.1: System Definitions

Before diving into nonlinear control, it is essential to establish a clear understanding of the basic notions of **system behavior**, particularly the distinction between **linear** and **nonlinear** systems.  
This chapter introduces the fundamental definitions and mathematical principles that form the foundation of system analysis.

---

#### Superposition Principle

A **linear system** is one in which the relationship between the input signal $u(t)$ and the output signal $y(t)$ satisfies the **principle of superposition**. This property implies that the response to a combination of inputs is equal to the combination of the corresponding individual responses.

<div class="def-window">
  <div class="def-title" id="def_1.1">Definition 1.1 — Superposition Principle</div>
  <div>
  Consider two input signals \( u_1(t) \) and \( u_2(t) \), producing the corresponding outputs \( y_1(t) \) and \( y_2(t) \).  
  The system satisfies the superposition principle if the response to the sum of the inputs \( u(t) = u_1(t) + u_2(t) \) is the sum of the individual responses:
  \[
  y(t) = y_1(t) + y_2(t)
  \]
  </div>
</div>

An immediate consequence of this definition is **homogeneity**: if the input signal is scaled by a constant factor $\alpha$, the output scales by the same factor.  
In other words, if an input $u(t)$ produces an output $y(t)$, then applying $\alpha u(t)$ yields an output $\alpha y(t)$.

This leads to the general definition of a linear system:

<div class="def-window">
  <div class="def-title" id="def_1.2">Definition 1.2 — Linear System</div>
  <div>
  A system is said to be <strong>linear</strong> if and only if it satisfies both the properties of <strong>additivity</strong> and <strong>homogeneity</strong>, i.e., if it obeys the superposition principle.
  </div>
</div>

Any system that **does not** satisfy the superposition principle is termed a **nonlinear system**.  
Such systems cannot be analyzed using the tools of linear system theory and form the primary focus of this lecture series on **nonlinear control**.

---

#### Nonlinearities

Nonlinearities can be classified in two categories, *inherent (natural)* or *intentional (artificial)*.

**Inherent nonlinearity** naturally comes from the system hardware and motion. To cite a few as an example, there is the centripetal forces, or the Coulomb interaction forces. Usually, those nonlinearities are undesirable and control system have to properly compensate for them. **Intentional nonlinearities**, on the other hand, are artificially introduces by the designer in the system. 

Nonlinearities can also be classified mathematically, as **continuous** or **discontinuous**. Because of their discontinuous nature, discontinuous nonlinearities are often referred as *hard nonlinearities*, while continuous nonlinearities are called *soft nonlinearities*. Examples of hard nonlinearities include saturation, dead zones, and backlash, it can appear in both small and large range operation systems.

---

#### Non-Symmetrical Unit Response

To better illustrate the fundamental difference between linear and nonlinear systems, let us compare their responses to simple step inputs.

Consider first the linear system defined by the differential equation:

$$
\dot{x} = -x + u
$$

When a unit step input of amplitude $+1$ is applied, the system exhibits an exponential response that gradually converges to the steady-state value $x = 1$.  If we now apply a step input of amplitude $-1$, the response will be perfectly symmetrical, converging to $x = -1$ with the same rate of decay. This symmetric behavior, shown by the **blue dashed curves** in [Figure 1.1](#fig_1.1_asymmetrical_response), is a direct consequence of the system’s **linearity**. In linear systems, the response to $-u$ is simply the negative of the response to $u$.

Now, consider the **nonlinear** system described by:

$$
\dot{x} = -\|x\|x + u
$$

Here, the term $-\|x\|x$ introduces a **state-dependent damping**, which makes the dynamics nonlinear. When a step input of amplitude $+1$ is applied, the system follows the **red solid curve** in [Figure 1.1](#fig_1.1_asymmetrical_response). However, when the input is switched to $-1$, the response is no longer symmetric, the convergence rate and steady-state behavior differ from the positive case. This **asymmetry** highlights a key characteristic of nonlinear systems: *the principle of superposition no longer holds*, and the system’s response depends on the **magnitude and sign** of the input.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_1.1_asymmetrical_response">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch1_asymmetrical_response.png" alt="Step Response" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 1.1:</strong> Step responses of a linear system (blue dashed curve) and a nonlinear system (red solid curve)</figcaption>
  </figure>
</div>

This simple comparison demonstrates how nonlinearity can lead to qualitative differences in system behavior, even for simple inputs, and motivates the need for dedicated analysis and control methods beyond the linear framework.

---

#### Multiple Equilibrium Points

Nonlinear systems can exhibit **multiple equilibrium points**, which are states where the system remains constant over time. This is in contrast to typical linear systems, which usually have a single equilibrium point. A classical example is a system with a **cubic nonlinearity**:

$$
\dot{x} = - x + x^2
$$

Simulating the system for several initial conditions produces the trajectories shown in [Figure 1.2](#fig_1.2_multiple_eq_pts).

<div class="images">
  <figure id="fig_1.2_multiple_eq_pts">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch1_stable_points.png" alt="Multiple equilibrium points" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 1.2:</strong> Solutions of $\dot{x}=-x+x^2$ for various initial conditions</figcaption>
  </figure>
</div>

From the simulations, we observe that the system has two equilibrium points at $x = 0$ and $x = 1$. Depending on the initial condition, trajectories either converge to one of these points or diverge to infinity. This illustrates the richer behavior of nonlinear systems and the importance of **specialized analysis and control methods**.

<div class="remark-window">
  <div class="remark-title" id="rem_1.1">Remark 1.1 — Multiple Equilibrium Points</div>
  <div>
  Unlike linear systems, the <strong>stability of nonlinear systems</strong> can depend on the initial conditions, leading to multiple equilibrium points with distinct stability properties.
  </div>
</div>

---

#### Chaos

In a linear system, a small change in initial conditions results in a proportionally small change in the system response. Nonlinear systems, however, can exhibit **chaos**, where tiny differences in initial conditions lead to drastically different trajectories.

The key feature of chaotic systems is that their **long-term behavior is highly sensitive** to initial conditions, despite being completely deterministic. This distinguishes chaos from random or noisy behavior: in chaotic systems, future states are fully determined by the governing equations and initial conditions, but appear unpredictable over time.

Consider the following nonlinear system:

$$
\ddot{x} + 0.1 \dot{x} + x^5 = 6 \sin(t)
$$

[Figure 1.3](#fig_1.3_chaotic_traj) shows the system's response for three slightly different initial conditions: $x_0 = (0.1, 0.2)$, $x_0 = (0.105, 0.2)$, and $x_0 = (0.095, 0.2)$. The trajectories diverge significantly over time, demonstrating the **sensitive dependence on initial conditions** characteristic of chaotic systems.

<div class="images">
  <figure id="fig_1.3_chaotic_traj">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch1_chaotic_traj.png" alt="Chaos" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 1.3:</strong> Chaotic behavior of the system $\ddot{x} + 0.1 \dot{x} + x^5 = 6 \sin(t)$ for slightly different initial conditions</figcaption>
  </figure>
</div>

**Further exploration:**  
The following Veritasium video provides an intuitive introduction to **chaos and the butterfly effect**, showing how tiny differences in initial conditions can lead to dramatically different outcomes.

<iframe width="735" height="413" src="https://www.youtube.com/embed/fDek6cYijxI?si=3hu_bFoMzFVvjudq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<div class="ytb-window">
    <strong>Chaos: The Science of the Butterfly Effect</strong><br>
    The video illustrates the butterfly effect, highlighting how tiny changes in initial conditions of a chaotic system can lead to vastly different outcomes, emphasizing the sensitivity and unpredictability of nonlinear dynamics.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Source: Veritasium - YouTube  
        <a href="https://youtu.be/fDek6cYijxI?si=rvVWCDbpGaH6kHtW" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

---

#### Exercises

**1.1: System analysis**

Consider the following system:
$$
\dot{x} = \begin{bmatrix} 4 & -1 \\ 16 & -4 \end{bmatrix} x + \begin{bmatrix} 2 \\ 5 \end{bmatrix} u
$$
<ol>
<li>We set the output as $y=x_1$. Derive the output $y$ until the input $u$ appears explicitly. Is it possible to stabilize the output using th input $u$ once it appeared?</li>
<li>Same question but with the output $y=-5x_1+2x_2$.</li>
<li>What could be the advantage of choosing the second output instead of the first one?</li>
</ol>

<details markdown="1">
  <summary>Solution</summary>
  <strong>(1)</strong> We have:
  <div>
  \begin{align}
    \dot{x_1} &= 4x_1 - x_2 + 2u \\
  \end{align}
  </div>
</details>


---

### 6.2.3.2: Phase Plane Analysis

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

#### Concepts of Phase Plane Analysis

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

#### The Isoclines Method

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

#### Equilibrium Points and Stability

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

#### Limit Cycles

A limit cycle is a closed trajectory in the phase plane that represents a periodic solution of a dynamical system. Limit cycles are important in the study of nonlinear systems because they can indicate the presence of stable or unstable oscillatory behavior. To be considered a limit cycle, a trajectory must be isolated, meaning that there are no other closed trajectories in its immediate vicinity. Taking again the mass-spring system as an example, we can observe that the trajectories in the phase plane are closed curves, however, they are not isolated since there are infinitely many closed trajectories corresponding to different initial conditions. Therefore, the mass-spring system does not exhibit limit cycles.

<div class="def-window">
  <div class="def-title" id="def_2.1">Definition 2.1 - Limit Cycle</div>
  <div>
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

#### Index 

The index is a topological properties of systems in the phase plane. It allows to determine the necessary existence of limit cycles in a given region of the phase plane and gives information on the stability of an enclosed fixed point.

<div class="def-window">
  <div class="def-title" id="def_2.2">Definition 2.2 - Index of a point of the phase plane</div>
  <div>
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

<div class="remark-window">
  <div class="remark-title" id="rem_2.1">Remark 2.1 — Interpretation of the Index</div>
  <div>
  The index provides insight into the nature of the fixed point enclosed by the curve $\Omega$. An index of +1 typically indicates a stable node or focus, while an index of -1 indicates a saddle point. An index of 0 suggests the presence of a center or a more complex structure. Moreover, the index is independent of the choice of the curve $\Omega$, as long as it encircles only the point $P$ and no other fixed points, of the chosen points $x_i$ along the curve and their number $n$.
  </div>
</div>

<iframe width="735" height="413" src="https://www.youtube.com/embed/wZvFKcQ_3Rc?si=GEd-scAtYdobSwdZ&amp;start=126" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<div class="ytb-window">
    This video provides a visual explanation of limit cycles and their stability properties in nonlinear dynamical systems.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Video from 2:04 | Source: Virtually Passed - YouTube  
        <a href="https://youtu.be/wZvFKcQ_3Rc?si=nBAnaKUrG8s8nWv5" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

An index can be calculated for each of the fixed points in the phase plane mentioned in Section 2.3. Independently of their stability properties, nodes centers and foci have an index of +1, while saddle points have an index of -1. We introduce the notation $N$ and $S$ respectively the number of nodes (including centers and foci) and the number of saddle points in a given closed curve $\Omega$. The following theorem holds:

<div class="thm-window">
  <div class="thm-title" id="thm_2.1">Theorem 2.1 - Poincaré Index theorem</div>
  <div>
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

<div class="thm-window">
  <div class="thm-title" id="thm_2.2">Theorem 2.2 - Bendixson Theorem</div>
  <div>
  For a system defined by equations \eqref{eq_2.1} and \eqref{eq_2.2}, no limit cycle can exists in the region $\Omega$ of the phase plane where the $\tfrac{\partial f_1}{\partial x_1} + \tfrac{\partial f_2}{\partial x_2}$ do not change sign and is not equal to zero.
  </div>
</div>

---

#### Exercises

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

  <strong>Q3:</strong> From [Poincaré Index theorem](#thm_2.1), to have a limit cycle, we need to have $N = S + 1$. Here, we have $N = 1$ (one node) and $S = 2$ (two saddle points), so if a limit cycle exists, it should be located around the equilibrium point $E_3=(0, 0)$, ($N=1$ and $S=0$) and not enclose the other two equilibrium points ($N=1$ and $S\geq 1$).

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

### 6.2.3.3 First Harmonics Method

In this chapter, we will explore the First Harmonics Method, understanding its principles and applications in analyzing nonlinear systems. This method can be applied on a restricted class of nonlinear systems, but nonetheless frequently encountered in practice. The importance of this class of systems lies in the imperfections of real-world actuators, which often exhibit nonlinear behaviors such as saturation, dead zones, and hysteresis. These nonlinearities do not disappear when the system is linearized around an equilibrium point, making it essential to consider them in control design and analysis

Those nonlinearities cannot be ignored or removed physically, as they are inherent to the system's operation. Therefore, understanding and applying the First Harmonics Method allows engineers to effectively analyze and design controllers for systems with such nonlinear characteristics, ensuring robust performance in real-world applications.

In this part, we will only consider static nonlinearities, meaning that the nonlinearity depends solely on the current value of the input and not on its history or rate of change. Additionally, we will focus on single-input single-output (SISO) systems for simplicity. 

---

#### Static Nonlinearity

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

#### First Harmonic

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

The principal drawback of this decomposition is that it involves an infinite number of harmonics, which can be computationally intensive. However, in many practical cases, the first harmonic (i.e., $l=1$) provides a good approximation of the output signal. It is also important to note that the components $a_0$, $a_l$ and $b_l$ depend on the amplitude $A$ and the angular frequency $\omega$ of the input signal. Formally, we should write $a_0(A,\omega)$, $a_l(A,\omega)$ and $b_l(A,\omega)$, but in order to improve the readability, we will continue to use $a_0$, $a_1$ and $b_1$ without the mention of the amplitude and pulsation dependency.

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

When the nonlinearity is perfectly symmetric ($a_0 = 0$) the equivalent gain can be expressed as: 
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
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_N_function_saturation.png" alt="Equivalent Gain Saturation" width="600"/>
    <figcaption style="text-align: center;"><strong>Figure 3.4:</strong> Equivalent gain $N$ of a saturation nonlinearity as a function of the input amplitude ratio $\tfrac{A}{a}$</figcaption>
  </figure>
</div>

---

#### Types of Nonlinearities

In this section, we introduce several common types of nonlinearities found in control systems, including the **Saturation**, **Dead Zone**, **Relay**, and **Hysteresis** nonlinearities. We begin with the **Saturation**, as many of the others can be derived from it as a fundamental building block.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.6_nonlinearity_types">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_nonlinearity_types.png" alt="Nonlinearity types" width="750"/>
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

<!-- **Example:**  
Saturation is common in **electrical amplifiers** or **actuators** that can only provide a limited voltage, current, or torque. Once this limit is reached, the output remains constant regardless of additional input. -->

**Dead Zone**

A *dead zone* represents a range of input values around zero for which the output remains zero. This effect is often caused by mechanical backlash, friction, or electronic threshold. For inputs exceeding the threshold $\delta$, the output increases linearly with a gain $k$ (see [Figure 3.6](#fig_3.6_nonlinearity_types)).

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

<!-- **Example:**  
A dead zone can be observed in **hydraulic valves** that require a minimum pressure to open, or in **DC motors** that need a minimum voltage to overcome static friction before rotation begins. -->

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

<!-- **Example:**  
Relay behavior appears in **thermostats** (heating/cooling control), **bang-bang controllers**, or **digital switches**, where the actuator can only be fully on or fully off. -->

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

<details markdown="1">
  <summary><strong>Quiz</strong></summary>
  <div class="quiz-window" style="max-width: 700px">
    <div class="quiz-title">Match the Situation to the Nonlinearity Type</div>
    <div id="quiz-desc" style="margin: 1em;">
      <strong>Drag the correct nonlinearity type to each situation.</strong>
    </div>
    <div class="quiz-situations" style="margin: 1.5em;">
      <div class="situation" data-answer="Relay">
        <span>Bang-bang controllers</span>
        <div class="dropzone" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      </div>
      <div class="situation" data-answer="Saturation">
        <span>Electrical amplifiers</span>
        <div class="dropzone" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      </div>
      <div class="situation" data-answer="Dead Zone">
        <span>DC motors</span>
        <div class="dropzone" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      </div>
      <div class="situation" data-answer="Hysteresis">
        <span>Magnetic materials</span>
        <div class="dropzone" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      </div>
      <div class="situation" data-answer="Dead Zone">
        <span>Hydraulic valves</span>
        <div class="dropzone" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      </div>
    </div>
    <div class="quiz-bank dropzone" ondrop="dropBank(event)" ondragover="allowDrop(event)">
    <div class="bank-title"><strong>Answer Bank</strong></div><br>
      <div class="answer" draggable="true" ondragstart="drag(event)" id="Relay" data-value="Relay">Relay</div>
      <div class="answer" draggable="true" ondragstart="drag(event)" id="Saturation" data-value="Saturation">Saturation</div>
      <div class="answer" draggable="true" ondragstart="drag(event)" id="DeadZone1" data-value="Dead Zone">Dead Zone</div>
      <div class="answer" draggable="true" ondragstart="drag(event)" id="DeadZone2" data-value="Dead Zone">Dead Zone</div>
      <div class="answer" draggable="true" ondragstart="drag(event)" id="Hysteresis" data-value="Hysteresis">Hysteresis</div>
  </div>
    <button onclick="checkQuiz()" style="margin-top:1em; margin-left:1em">Check Answers</button>
    <div id="quiz-result" style="margin-top:1em; margin-left:1em; margin-bottom:1em; font-weight:bold;"></div>
  </div>
</details>

---

#### Closed-loop Stability and Limit Cycles

We propose now to analyze the first harmonic method in a closed-loop configuration. We consider the following block diagram ([Figure 3.7](#fig_3.7_closed_loop_block_diagram)), where a static nonlinearity $N.L.$ is placed in the feedback loop of an LTI system $G(s)$.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.7_closed_loop_block_diagram">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_closed-loop.jpeg" alt="Closed Loop Block Diagram" width="400"/>
    <figcaption style="text-align: center;"><strong>Figure 3.7:</strong> Block diagram of a closed-loop system with a static nonlinearity ($N.L.$) in the feedback loop of an LTI system ($G(s)$)</figcaption>
  </figure>
</div>

For a limit cycle to exist in this closed-loop system, the following equations need to be satisfied:
<div>
  \begin{align}
    y(t) &= \Phi(u(t)) \tag{3.8}\label{eq:limit_cycle_1} \\
    z(t) &= \int_{0}^{t}g(t-\tau)y(\tau)d\tau \tag{3.9}\label{eq:limit_cycle_2} \\
    u(t) &= -z(t) \tag{3.10}\label{eq:limit_cycle_3}
  \end{align}
</div>
where $g(t)$ is the impulse response of the LTI system $G(s)$.

Satisfying these equations is equivalent to study the nature of the fixed point $z(\cdot)$, solution of the following functional equation:
<div>
\[
z(t) = -\int_{0}^{t}g(t-\tau)\Phi(-z(\tau))d\tau \tag{3.11}\label{eq:limit_cycle_4}
\]
</div>

To analyze the existence of limit cycles, we can use the first harmonic method to approximate the nonlinearity $\Phi(\cdot)$ by its equivalent gain $N(A, \omega)$, which is allowed here thanks to the low-pass characteristic of $G(s)$. This allows us to replace the nonlinearity in the block diagram with its equivalent gain, resulting in a simplified closed-loop system as shown in [Figure 3.8](#fig_3.8_closed_loop_block_diagram_2).

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_3.8_closed_loop_block_diagram_2">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch3_closed-loop_NA.jpeg" alt="Closed Loop Block Diagram 2" width="400"/>
    <figcaption style="text-align: center;"><strong>Figure 3.8:</strong> Block diagram of a closed-loop system with the equivalent gain ($N$) in the feedback loop of an LTI system ($G(s)$)</figcaption>
  </figure>
</div>

Thus, the previous set of equation that need to be satisfied for a limit cycle to exist can be rewritten as:
<div>
  \begin{align}
    Y(j\omega) &= N(A, \omega) U(j\omega) \tag{3.12}\label{eq:limit_cycle_5} \\
    Z(j\omega) &= G(j\omega) Y(j\omega) \tag{3.13}\label{eq:limit_cycle_6} \\
    U(j\omega) &= -Z(j\omega) \tag{3.14}\label{eq:limit_cycle_7}
  \end{align}
</div>
Combining these equations leads to the following characteristic equation:
<div>
\[
  Z(j\omega) = -G(j\omega) N(A, \omega) Z(j\omega) \tag{3.15}\label{eq:limit_cycle_8}
\]
</div>
This equation \eqref{eq:limit_cycle_8} is the approximation of the original functional equation \eqref{eq:limit_cycle_4} using the first harmonic method. It allows us to simplify the analysis by using $Z(j\omega)$ as a common factor, such simplification was not possible in the original equation \eqref{eq:limit_cycle_4}. For a non-trivial solution (i.e., $Z(j\omega) \neq 0$), the following condition must be satisfied:
<div>
\[
  1 = -G(j\omega) N(A, \omega) \tag{3.16}\label{eq:limit_cycle_9}
\]
</div>
This equation can have multiple solutions, one solution, or no solution at all, depending on the characteristics of the LTI system $G(s)$ and the nonlinearity $\Phi(\cdot)$. Each solution corresponds to a potential limit cycle in the closed-loop system, characterized by its amplitude $A$ and frequency $\omega$.

**Nyquist plot interpretation**

To visualize equation \eqref{eq:limit_cycle_9} geometrically, we can use a Nyquist plot. By plotting the harmonic response of the LTI system $G(j\omega)$ in the complex plane, for increasing values of $\omega$, we can identify the points where the curve intersects with the curve of $-1/N(A, \omega)$. Each intersection point indicate a potential limit cycle, with the corresponding frequency $\omega$ and amplitude $A$ determined by the intersection coordinates.

<details markdown="1">
  <summary><strong>Nyquist plot review</strong></summary>
  You can watch the following video to review how to plot a Nyquist diagram.

 <iframe width="735" height="413" src="https://www.youtube.com/embed/wVs0ou0iuqw?si=A9AED_4uCtx90_Qo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</details>

**Nyquist theorem**

<div class="def-window">
  <div class="def-title" id="def_3.1">Definition 3.1 - Nyquist criterion</div>
  <div>
    Consider a closed-loop system composed of a the open-loop gain $G(s)H(s)$. In order to determine the stability of the closed-loop system, we can use the Nyquist criterion, which states that:
    <ul>
      <li>Take the imaginary axis in the complex plane s, meaning $s = j\omega$ with $\omega \in [-\infty, +\infty]$</li>
      <li>Plot the Nyquist diagram of the open-loop transfer function $G(s)H(s)$.</li>
      <li>Count the number of encirclements $N$ of the point $-1$ in the clockwise direction (negative trigonometric direction).</li>
      <li>Determine the number of poles $P$ of the open-loop transfer function $G(s)H(s)$ that are located in the right half of the complex plane (i.e., with positive real part).</li>
    </ul>
    $Z=N+P$ gives the number of zeros of the characteristic equation (i.e., the closed-loop poles) in the right half of the complex plane, meaning the instable poles. If $Z=0$, then the closed-loop system is stable.
  </div>
</div>

When there is a constant gain $K$, the theorem can be applied directly by looking at the point $-1/K$ as follow:

<div class="def-window">
  <div class="def-title" id="def_3.2">Definition 3.2 - Nyquist criterion (for constant gain $K$)</div>
  <div>
    Consider a closed-loop system composed of a the open-loop gain $G(s)H(s)$. In order to determine the stability of the closed-loop system, we can use the Nyquist criterion, which states that:
    <ul>
      <li>Take the imaginary axis in the complex plane s, meaning $s = j\omega$ with $\omega \in [-\infty, +\infty]$</li>
      <li>Plot the Nyquist diagram of the open-loop transfer function $G(s)H(s)$.</li>
      <li>Count the number of encirclements $N$ of the point $-1/K$ in the clockwise direction (negative trigonometric direction).</li>
      <li>Determine the number of poles $P$ of the open-loop transfer function $G(s)H(s)$ that are located in the right half of the complex plane (i.e., with positive real part).</li>
    </ul>
    $Z=N+P$ gives the number of instable poles of the closed-loop system. If $Z=0$, then the closed-loop system is stable.
  </div>
</div>

---

#### Exercises

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

### 3.2.3.4: Lyapunov Stability

In control theory and dynamical systems, understanding whether a system remains stable under small disturbances is of fundamental importance. The concept of *stability* defines how a system behaves when perturbed — whether it returns to its equilibrium, deviates further, or oscillates around it. One of the most powerful and general approaches to analyze stability without explicitly solving the system’s differential equations is the **Lyapunov method**.

This approach was introduced by the Russian mathematician **Aleksandr Mikhailovich Lyapunov (1857–1918)** in his seminal 1892 doctoral dissertation *“The General Problem of the Stability of Motion”*. Lyapunov extended earlier ideas from classical mechanics and developed a rigorous mathematical framework to study the stability of equilibria in nonlinear systems — a framework that remains foundational in modern control theory, robotics, and nonlinear dynamics.

The essence of Lyapunov’s idea is to associate to a dynamical system a scalar function, called a **Lyapunov function**, which plays a role similar to that of an energy function. By studying how this function evolves over time, we can infer whether the system’s trajectories converge to an equilibrium point, remain bounded, or diverge.

Lyapunov’s methods come in two main forms:
- the **direct (second) method**, which studies stability using a suitable Lyapunov function without solving the system;
- and the **indirect (first) method**, which uses linearization around the equilibrium point.

---

#### Equilibrium Points and Linear Systems

Consider the following nonlinear dynamical system:
<div>
\[
\dot{x} = f(x, t) \tag{4.1}\label{eq:nonlinear_system}
\]
</div>

**Autonomous and Non-Autonomous systems**

We use generally the terms *time-varying* and *time-invariant* systems to classify linear systems, depending on whether the matrix $A$ varies with time or not. The same classification can be applied to nonlinear systems, where the terms are replaced by *autonomous* and *non-autonomous* systems. 

<div class="def-window">
  <div class="def-title" id="def_4.1">Definition 4.1 - Autonomous System</div>
  <div>
  The nonlinear system \eqref{eq:nonlinear_system} is said to be autonomous if the function $f$ does not depend explicitly on time, i.e., $f=f(x)$. Otherwise, the system is called non-autonomous, and the function $f$ depends explicitly on time, i.e., $f=f(x,t)$.
  </div>
</div>

Strictly speaking, all physical systems are non-autonomous, as they are influenced by external time-varying factors. This concept is an idealized notion, like the concept of linearity. However, many systems can be approximated as autonomous within a certain operating range or time frame, due to the important time scale of their varying parameters, making the analysis of autonomous systems highly relevant in practice.

It is important to note that the definition of autonomous systems presented here is made on the **closed-loop dynamics**. Indeed, a control system being composed of a plant and a controller, even if the open-loop system is non-autonomous (e.g., due to time-varying inputs or parameters), the closed-loop system can be designed to be autonomous through appropriate feedback control strategies.

The principal difference between autonomous and non-autonomous systems lies in the fact that the state of autonomous is independent of the starting time while the state of non-autonomous system generally is not. It is well known that the stability analysis of time invariant systems is generally simpler than that of time-varying systems, this particularity also holds for nonlinear systems. It is for this reason that we will focus in this chapter on autonomous systems.

**Equilibrium Points**

The equilibrium point, also known as fixed point or critical point, of a dynamical system is a state where the system doesn't continue evolve over time. 

<div class="def-window">
  <div class="def-title" id="def_4.2">Definition 4.2 - Equilibrium</div>
  <div>
  Consider the system \eqref{eq:nonlinear_system}, where $x \in \mathbb{R}^n$ is the state and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function. A point $\bar{x} \in \mathbb{R}^n$ is called an equilibrium point of the system if:
  \[
  \dot{x}=f(\bar{x}) = 0
  \]
  </div>
</div>

**Stability for linear systems**

Consider a linear system described by the following state-space representation: $\dot{x} = A x + B u $, where $x \in \mathbb{R}^n$ is the state vector, $u \in \mathbb{R}^m$ is the input vector, and $A \in \mathbb{R}^{n \times n}$ and $B \in \mathbb{R}^{n \times m}$ are constant matrices. We consider the system in close loop with the state feedback control law $u = -K x$, where $K \in \mathbb{R}^{m \times n}$ is the state feedback gain matrix. The closed-loop system can be expressed as:

<div>
\[
  \dot{x} = (A - BK)\,x = \widetilde{A}\,x \tag{4.2}\label{eq:linear_closed_loop_system}
\]
</div>

This system have a unique equilibrium point at the origin ($\bar{x} = 0$), unless $\widetilde{A}$ is singular, in that case there exists an infinite number of equilibrium points. Contrary to linear systems, nonlinear systems can have multiple equilibrium points, depending on the nature of the function $f(x)$. The stability of the equilibrium point can be determined by analyzing the eigenvalues of the matrix $\widetilde{A}$.

<div class="remark-window">
  <div class="remark-title" id="remark_4.1">Remark 4.1 - Stability conditions for linear systems</div>
  <div>
    Even though a nonlinear system may be approximated by a linear system around the equilibrium point using linearization techniques, the stability properties of the linearized system do not always guarantee the same properties for the original nonlinear system. Thus the study of the stability through the eigenvalues of the linearized system is not sufficient to conclude on the stability of the nonlinear system, and more advanced methods, such as Lyapunov's direct method, are required for a comprehensive analysis.
  </div>
</div>

All along this lecture, we mentioned a system being stable or unstable for a trajectory staying close or diverging from an equilibrium point. However, we did not give a formal definition of what is meant by "closeness". 

<div class="def-window">
  <div class="def-title" id="def_4.3">Definition 4.3 - Notion of distance</div>
  <div>
  A vectorial space $\mathcal{V}$ is said to be a normed vectorial space if there exists a function $\lVert \cdot \rVert: \mathcal{V} \rightarrow \mathbb{R}_{\geq 0}$, called a norm, that satisfies the following properties:
  <ul>
  <li><strong>Positive Definiteness</strong> $\lVert x \rVert \geq 0, \forall x \in \mathcal{V}$ and $\lVert x \rVert = 0$ if and only if $x = 0$.</li>
  <li><strong>Homogeneity</strong> $\lVert \alpha x \rVert = |\alpha| \lVert x \rVert, \forall c \in \mathbb{R}$ and $\forall x \in \mathcal{V}$.</li>
  <li><strong>Triangle Inequality</strong>: $\lVert x + y \rVert \leq \lVert x \rVert + \lVert y \rVert, \forall x,y \in \mathcal{V}$.</li>
  </ul>
  </div>
</div>

In that vectorial space, the distance between two points $x_1$ and $x_2$ is defined as the following possible norms:
- **Euclidean norm**: $\lVert x \rVert_2 = \sqrt{x_1^2 + x_2^2 + ... + x_n^2}$
- **1-norm**: $\lVert x \rVert_1 = \sum_{i=1}^n \|x_i\|$
- **Infinity norm**: $\lVert x \rVert_\infty = \max_{i=1}^n \|x_i\|$

---

#### Concept of Stability

From the beginning of this lecture, we used the term *stability* in a general sense, as a kind of well-behavedness of the system around a desired operating point. However, as nonlinear systems can exhibit a wide range of complex behaviors, this simple concept of stability needs to be refined and formalized, such as the concept of asymptotic stability, exponential stability or global stability (which will actually be developed in section [4.4](#44-global-and-local-stability-analysis)). In this section, we will formally define these different notions of stability for autonomous systems and explain their practical meanings.

<div class="def-window">
  <div class="def-title" id="def_4.4">Definition 4.4 - Formal definition of Stability </div>
  <div>
  Consider a system described by the ordinary differential equation $\dot{x} = f(x)$, where $x \in \mathbb{R}^n$ is the state vector and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function, with the initial condition $x(0) = x_0$ and the equilibrium point $x=0$. The solution for a time $t \in \mathbb{R}^+$ is denoted by $\mathcal{X}(x_0, t)$.

  The equilibrium state $x=0$ is <strong>stable in the sense of Lyapunov</strong> if, for all $R>0$, there exists $r>0$, such that if $\lVert x_0 \rVert < r$, then $\lVert \mathcal{X}(x_0, t) \rVert < R$ for all $t \geq 0$. Meaning the trajectories starting sufficiently close to the equilibrium point remain inside of the ball of radius $R$ centered at the origin for all future time. Otherwise, the equilibrium point is said to be <strong>unstable</strong>.
  </div>
</div>

This definition captures the idea that when the origin of a system is stable, it is always possible to constrain the system's trajectories within a desired ball $\mathcal{B}_R$ of radius $R$ by choosing the initial conditions carefully, that is, by selecting them within a sufficiently small radius $r(R)$.


<div class="remark-window">
  <div class="remark-title" id="remark_4.2">Remark 4.2 - Initial time choice</div>
  <div>
  For ordinary differential equations, even in the non-autonomous case $\dot{x} = f(x,t)$, stability is defined with respect to <i>an initial condition specified at some initial time</i> $t_0$. If a system is stable for initial conditions chosen at $t_0 = 0$, then the same stability property must also hold for any other initial time $t_0 \ge 0$; the choice of the origin of time has no impact on stability.
  </div>
</div>


In our context, we restrict ourselves to **autonomous systems**, where the dynamics do not depend explicitly on time, i.e. $\dot{x} = f(x)$. In such systems, the initial time has no intrinsic meaning: the system may start at any $t_0 \ge 0$, and this shift does not affect the trajectories. Therefore, using $t_0 = 0$ in the definition of stability is simply a convention, not an assumption. What truly matters is that the solution remains close to the equilibrium **for all future times relative to the chosen initial time**, irrespective of when this initial time occurs.

It is important to point out the difference between instability and the notion of "blowing up" (meaning state growing toward infinity as time increase). In a linear system, instability always leads to blowing up, as an instable pole leads to an exponential growth of the state. However, in a nonlinear system, instability does not necessarily imply that the state will blow up. The system may exhibit complex behaviors such as oscillations, limit cycles, or chaotic dynamics, where the state remains bounded but does not converge to the equilibrium point. We can illustrate this with the following example:

*Example: instability of the Van der Pol Oscillator*

The Van der Pol oscillator is a well-known nonlinear system that exhibits a variety of dynamic behaviors, including limit cycles and instability. It is described by the second-order differential equation:
<div>
\begin{align}
  \dot{x}_1 &= x_2 \\
  \dot{x}_2 &= -x_1 + (1 - x_2^2)x_2
\end{align}
</div>

A trivial equilibrium point of this system is the origin $(x_1, x_2) = (0, 0)$.

However, the dynamics of the system drive all trajectories that do not start exactly at the origin toward a stable limit cycle, as you can see on [Figure 4.1](#fig_4.1_van_der_pol_instability). This implies that if we choose $R$ as the radius of the ball $\mathcal{B}_R$, as defined in [4.4](#def_4.4), small enough so that the limit cycle lies outside this ball, then any initial condition chosen within $\mathcal{B}_r$ will eventually lead to trajectories that exit $\mathcal{B}_R$. This demonstrates that the origin is unstable.

Nonetheless, these trajectories do not diverge to infinity; instead, they converge to the limit cycle. This illustrates an important property of nonlinear systems: instability at an equilibrium does not necessarily imply unbounded growth.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_4.1_van_der_pol_instability">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch4_VanDerPol_stability_demo.png" alt="Van der Pol Instability" width="600"/>
    <figcaption style="text-align: center;"><strong>Figure 4.1:</strong> Trajectories of the Van der Pol oscillator showing instability at the origin but convergence to a limit cycle</figcaption>
  </figure>
</div>

This example highlights the nuanced nature of stability in nonlinear systems, and thus shows that in many engineering application, Lyapunov stability alone may be insufficient to fully characterize the system's behavior. For instance, in safety-critical applications, it is often necessary to ensure that the system not only remains stable but also converges to a desired state or operates within specific bounds. This leads to the consideration of stronger notions of stability, which bring us to the first refinement of Lyapunov stability: **asymptotic stability**.

<div class="def-window">
  <div class="def-title" id="def_4.5">Definition 4.5 - Asymptotic Stability</div>
  <div>
  Consider a system described by the ordinary differential equation $\dot{x} = f(x)$, where $x \in \mathbb{R}^n$ is the state vector and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function, with the initial condition $x(0) = x_0$ and the equilibrium point $x=0$. The solution for a time $t \in \mathbb{R}^+$ is denoted by $\mathcal{X}(x_0, t)$.

  The equilibrium state $x=0$ is <strong>asymptotically stable</strong> if it is stable in the sense of Lyapunov and, in addition, there exists $r'>0$ such that if $\lVert x_0 \rVert < r'$, then $\lim_{t \to +\infty} \mathcal{X}(x_0, t) = 0$. Meaning the trajectories starting sufficiently close to the equilibrium point not only remain close to it but also converge to it as time goes to infinity.
  </div>
</div>

However such definition of asymptotic stability present some limitations, such as the need to compute explicitly every solution $\mathcal{X}(x_0, t)$ to verify the convergence to the equilibrium point from all initial conditions within the ball $\mathcal{B}_{r'}$. Moreover, state convergence do not necessarily lead to stability in practical applications. Let's take fore instance the system studied by Vinograd in 1965, described by the equations:
<div>
\begin{align}
  \dot{x}_1 &= \dfrac{x_1^2(x_2-x_1)+x_2^5}{(x_1^2+x_2^2)(1+(x_1^2+x_2^2)^2)} \\
  \dot{x}_2 &= \dfrac{x_2^2(x_2-2x_1)}{(x_1^2+x_2^2)(1+(x_1^2+x_2^2)^2)}
\end{align}
</div>

As you can see on [Figure 4.2](#fig_4.2_vinograd_asymptotic_stability), the equilibrium point at the origin is asymptotically stable since all trajectories converge to it. However, for initial conditions close to the origin, the trajectories exhibit large excursions away from the equilibrium point before eventually converging back to it. This behavior can be problematic in practical applications where large deviations from the desired state are undesirable or unsafe. Thus this equilibrium point is not stable in the sense of Lyapunov, despite being asymptotically stable. Moreover, it is reasonable to think that in a real system, such large excursions could lead to saturation of actuators or other nonlinear effects that are not captured by the mathematical model, potentially causing the system to behave unpredictably or even become unstable.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_4.2_vinograd_asymptotic_stability">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch4_Vinograd_trajectories.png" alt="Vinograd Asymptotic Stability" width="600"/>
    <figcaption style="text-align: center;"><strong>Figure 4.2:</strong> Trajectories of Vinograd's system showing asymptotic stability at the origin but lack of Lyapunov stability due to large excursions</figcaption>
  </figure>
</div>

To address these limitations, we introduce the concept of **exponential stability**, which provides a stronger form of stability that ensures not only convergence to the equilibrium point but also a specific rate of convergence. This will allow us to estimate how quickly the system returns to equilibrium after a disturbance, which is crucial for many control applications.

<div class="def-window">
  <div class="def-title" id="def_4.6">Definition 4.6 - Exponential Stability</div>
  <div>
  Consider a system described by the ordinary differential equation $\dot{x} = f(x)$, where $x \in \mathbb{R}^n$ is the state vector and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function, with the initial condition $x(0) = x_0$ and the equilibrium point $x=0$. The solution for a time $t \in \mathbb{R}^+$ is denoted by $\mathcal{X}(x_0, t)$.

  The equilibrium state $x=0$ is <strong>exponentially stable</strong> if there a ball $\mathcal{B}_r$ of radius $r>0$ such that for all initial conditions $x_0 \in \mathcal{B}_r$, then:
  \[
  \lVert \mathcal{X}(x_0, t) \rVert \leq \alpha \lVert x_0 \rVert e^{-\lambda t}, \quad \forall t \geq 0
  \]
  for some positive constants $\alpha$ and $\lambda$ ($\lambda$ is called the rate of exponential convergence). Meaning the trajectories starting sufficiently close to the equilibrium point not only converge to it but do so at an exponential rate.
  </div>
</div>

---

#### Lyapunov's Direct Method

The **Lyapunov direct method** is a fundamental tool for studying the stability of equilibrium points in nonlinear dynamical systems without requiring explicit solutions of the differential equations. The underlying idea is inspired by the analysis of **energy** in mechanical and electrical systems. In those settings, one typically observes that if the total energy of a system **decreases over time**, the system naturally evolves toward a resting state—an equilibrium.

Lyapunov extended this physical intuition to general nonlinear systems by introducing the concept of a **Lyapunov function**: a scalar-valued function that acts as an abstract measure of “energy.” Instead of representing physical energy, a Lyapunov function captures the system’s tendency to move toward or away from an equilibrium point. By analyzing how this function evolves along system trajectories, we gain insight into stability properties without solving the system explicitly.

<div class="def-window">
  <div class="def-title" id="def_4.7">Definition 4.7 - Lyapunov observation</div>
  The behavior of a system is <strong>stable</strong> if the energy $E$ decreases over time, is conserved and is minimal at the equilibrium point.<br>
  However, the behavior is <strong>unstable</strong> if the energy $E$ increases over time or is not minimal at the equilibrium point.
</div>


<div class="remark-window">
  <div class="remark-title" id="remark_4.3">Remark 4.3 - Sufficiency</div>
  Only verifying the decrease of the energy is not sufficient to conclude on the stability of the system.
</div>

Let us consider the nonlinear system described by a mass-damper-string system, as shown on [Figure 4.3](#fig_4.3_mass_damper_spring_system). The dynamics of this system can be described by the second-order differential equation:
$$
  m \ddot{x} + b |\dot{x}|\dot{x} + k_0 x + k_1 x^3 = 0
$$

where:
- $m$ is the mass,
- $b$ is the damping coefficient,
- $k_0$ and $k_1$ are the linear and nonlinear spring constants,
- $x$ is the displacement of the mass from its equilibrium position.

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_4.3_mass_damper_spring_system">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch4_mass-damper-spring.jpeg" alt="Mass-Damper-Spring System" width="400"/>
    <figcaption style="text-align: center;"><strong>Figure 4.3:</strong> Mass-Damper-Spring System</figcaption>
  </figure>
</div>

When disturbing the mass from its equilibrium point, it is very difficult to know if the resulting motion will be stable or unstable by simply looking at the differential equation, the linearization cannot be used here since the system starts outside of the linear region. However, by using the total mechanical energy of the system, it can tell us a lot about the stability of the system. The total mechanical energy $V(x)$ of the system is given by the sum of its kinetic energy and potential energy :
<div>
\[
  V(x) = \dfrac{1}{2} m \dot{x}^2 + \dfrac{1}{2} k_0 x^2 + \dfrac{1}{4} k_1 x^4
\]
</div>

The mechanical energy $V(x)$ of the system can be linked to the concept of stability as follows:
- zero energy corresponds to the equilibrium point (i.e., when the mass is at rest in our example, $x=0$ and $\dot{x}=0$),
- asymptotic stability implies energy dissipation over time (i.e., due to the damper),
- instability would imply energy increase over time (i.e., if there were an external force adding energy to the system).

The rate of change of the mechanical energy can be computed as $\dot{V}(x)$, thus the stability of the system can be analyzed by examining this energy function and its time derivative. If $\dot{V}(x) < 0$ for all $x \neq 0$, it indicates that the system is dissipating energy and is asymptotically stable. If $\dot{V}(x) > 0$ for some $x$, it suggests that the system can gain energy and may be unstable.

Taking a generalization of the mass-damper-string system to any nonlinear system, we can define Lyapunov direct method. The basic procedure involves generating a scalar 'energy-like' function $V(x)$ for the dynamical system and analyzing its properties to infer stability. In that way, we can draw conclusions about the system's stability without using the difficult stability definitions or solving the system explicitly.

<div class="def-window">
  <div class="def-title" id="def_4.8">Definition 4.8 - Positive definite functions</div>
  A scalar function $f: \mathbb{R}^n \rightarrow \mathbb{R}$ is said to be <strong>positive definite</strong> if: 
  \[f(0) = 0 \quad \text{and} \quad f(x) > 0, \quad \forall x \neq 0 \]
</div>

<div class="def-window">
  <div class="def-title" id="def_4.9">Definition 4.9 - Lyapunov candidate</div>
  A continuous positive definite scalar function, denoted as $V: \mathbb{R}^n \rightarrow \mathbb{R}$, is called a <strong>Lyapunov candidate</strong>.
</div>

As mentioned in our example of the mass-damper-string system, when a system is stable, its energy decreases over time or stay constant. Thus, we will want the Lyapunov candidate function to have a non-positive time derivative along the system trajectories. 

<div class="def-window">
  <div class="def-title" id="def_4.10">Definition 4.10 - Lyapunov function</div>
  A Lyapunov function is a Lyapunov candidate $V(x)$, meaning a continuous function $V: \mathbb{R}^n \rightarrow \mathbb{R}$ such that:
  \[V(x) > 0, \quad \forall x \neq 0 \quad \text{and} \quad V(x) = 0 \;\; x = 0\]
  and has the additional property: 
  \[\dot{V}(x) = \dfrac{\partial V}{\partial x} \dot{x} \leq 0, \quad \forall x \neq 0\ \quad \text{and} \quad \dot{V}(x) = 0\ \;\; x = 0\]
</div>

We can now state the Lyapunov's direct method theorem, which provides sufficient conditions for stability and asymptotic stability based on the properties of a Lyapunov candidate function.

<div class="thm-window">
  <div class="thm-title" id="theorem_4.1">Theorem 4.1 - Lyapunov's second method (also called Direct Method)</div>
  Consider the autonomous system $\dot{x} = f(x)$, where $x \in \mathbb{R}^n$ is the state vector and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function. If this system admits a Lyapunov function $V(x)$ as defined in <a href="#def_4.10">4.10</a>, then this system is stable. Moreover, if the the time derivative of the Lyapunov function $\dot{V}(x) < 0 \quad \forall x \neq 0$, then the system is asymptotically stable.
</div>

<div class="studyCase-window">
  <div class="studyCase-title" id="studyCase_4.1">Study Case - Robot</div>
  To illustrate the application of Lyapunov's direct method, let's consider a simple robotic system with nonlinear dynamics. The robot have a set amount of joints, leading to $n$ degrees of freedom. Each joints is actuated by a motor, resulting in a motion along the corresponding axis.<br>

  <div class="images" style="justify-content:center; text-align:center; margin-top:10px; margin-bottom:10px;">
    <figure id="fig_4.4_robot_system">
      <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch4_robot_study_case.jpeg" alt="Robot System" width="400"/>
      <figcaption style="text-align: center;"><strong>Figure 4.4:</strong> Simple robotic system with $n$ degrees of freedom</figcaption>
    </figure>
  </div>

  In the control theory of linear systems, we often use proportional (P), proportional-derivative (PD), or proportional-integral-derivative (PID) controllers to regulate the position of the robot's joints (see course on <a href="Closeloop&PID">closed loop control</a>). Here we will focus on a PD controller, which is commonly used for its simplicity and effectiveness in many applications. The PD controller can be expressed as:
  <div>
  \[
    \tau = -K_p (q - q_d) - K_d \dot{q} \tag{4.3}\label{eq:PD_controller}
  \]
  </div>
  where:
  <ul>
  <li>$\tau \in \mathbb{R}^{1\times n}$ is the vector of control torques applied to the joints,</li>
  <li>$q \in \mathbb{R}^{1\times n}$ is the vector of joint positions,</li>
  <li>$q_d \in \mathbb{R}^{1\times n}$ is the desired joint position vector,</li>
  <li>$K_p$ and $K_d$ are positive definite gain matrices for the proportional and derivative terms, respectively.</li>
  </ul>

  The goal now is to justify the choice of this PD controller using Lyapunov's direct method to ensure the stability of the closed-loop system.<br>
  <br>The cinetic energy of the robot can be expressed as:

  \[
    E_c = \dfrac{1}{2} \dot{q}^\top M(q) \dot{q}
  \]
  The power supplied by the controller is given by:
  \[
    P = \tau^\top \dot{q}
  \]
  Thus the energy balance can be written as:
  \begin{align}
    \dfrac{d}{dt}E_c &= P \\
    \dfrac{d}{dt} \left( \dfrac{1}{2} \dot{q}^\top M(q) \dot{q} \right) &= \tau^\top \dot{q} \tag{4.4}\label{eq:robot_energy_balance}
  \end{align}

  Since the choice of the Lyapunov function is not unique, we can propose expressions that have no direct physical meaning but are mathematically convenient for the stability analysis. A common choice for robotic systems is to define the Lyapunov function as the sum of the kinetic energy and a potential energy-like term that penalizes deviations from the desired position:
  \[
    V(q, \dot{q}) = \dfrac{1}{2} \dot{q}^\top M(q) \dot{q} + \dfrac{1}{2} (q - q_d)^\top K_p (q - q_d)\tag{4.5}\label{eq:robot_lyapunov_function}
  \]
  This function is positive definite with respect to the equilibrium point $V(q) > 0$, $\forall q\neq q_d$ and $V(q_d, 0) = 0$.<br>
  <br>We need now to verify that this Lyapunov candidate is indeed a Lyapunov function as defined in <a href="#def_4.10">Definition 4.10</a>. To do so, we compute its time derivative along the system trajectories:
  \begin{align}
    \dot{V}(q, \dot{q}) &= \dfrac{d}{dt} \left( \dfrac{1}{2} \dot{q}^\top M(q) \dot{q} + \dfrac{1}{2} (q - q_d)^\top K_p (q - q_d) \right) \\
    &= \dot{q}^\top M(q) \ddot{q} + \dfrac{1}{2} \dot{q}^\top \dot{M}(q) \dot{q} + (q - q_d)^\top K_p \dot{q} \tag{4.6}\label{eq:robot_lyapunov_derivative}
  \end{align}
  Substituting the robot dynamics and the PD controller into this expression, we can analyze the sign of $\dot{V}(q, \dot{q})$. After some algebraic manipulation, we find that:
  \[
    \dot{V}(q, \dot{q}) = -\dot{q}^\top K_d \dot{q} \leq 0
  \]
  since $K_d$ is positive definite. This shows that the Lyapunov function decreases over time, indicating that the system is stable in the sense of Lyapunov. Indeed both conditions on Lyapunov function are satisfied.<br>
</div>

---

#### Local and Global Stability Analysis

In the previous sections, we discussed various notions of stability for nonlinear systems, including Lyapunov stability, asymptotic stability, and exponential stability. However, these definitions often depend on the region of the state space being considered. This leads us to distinguish between **local stability** and **global stability**.

##### Local Stability

<div class="thm-window">
  <div class="thm-title" id="theorem_4.2">Theorem 4.2 - Local Stability</div>
  If, in a ball $\mathcal{B}_{R_0}$, there exist a scalar function $V(x)$ with continuous first partial derivatives such that:
  <ul>
  <li>$V(x)>0$ ($\forall x \in \mathcal{B}_{R_0}, x \neq 0$) and $V(0)=0$,</li>
  <li>$\dot{V}(x) \leq 0$ (in $\mathcal{B}_{R_0}$).</li>
  </ul>
  Then the equilibrium point $x=0$ of the system $\dot{x} = f(x)$ is stable. Moreover, if $\dot{V}(x) < 0$ ($\forall x \in \mathcal{B}_{R_0}, x \neq 0$), then the equilibrium point is asymptotically stable.
</div>

<div class="proof">
  <strong>Proof</strong><br>
  All along this proof we will make the distinction between ball and sphere, where the ball represents the set of points whose distance to the center is less than or equal to a given radius, while the sphere represents the set of points whose distance to the center is exactly equal to that radius.

  <div class="def-window">
    <div class="def-title" id="def_4.11">Definition 4.11 - Ball and Sphere</div>
    A <i>sphere</i> of radius $r$ is denoted as $\mathcal{S}_r$ and a <i>ball</i> of same radius is denoted as $\mathcal{B}_r$:
    \begin{align*}
      \mathcal{S}_r &= \{ x \in \mathbb{R}^n \mid \lVert x \rVert = r \} \\
      \mathcal{B}_r &= \{ x \in \mathbb{R}^n \mid \lVert x \rVert < r \}
    \end{align*} 
  </div>

  In order to prove stability, we need to show that for any radius $R > 0$, there exists a smaller radius $r > 0$ such that if the initial condition $x_0$ is within the ball $\mathcal{B}_r$, then the trajectory $\mathcal{X}(x_0, t)$ remains within the ball $\mathcal{B}_R$ for all future time $t \ge 0$. 

  Let $m$ be the minimum value of the Lyapunov function $V(x)$ on the sphere $\mathcal{S}_R$. Since $V(x)$ is continuous and positive definite, such a minimum exists and is strictly positive, i.e., $m > 0$. Moreover, because $V(0) = 0$, we can find a radius $r > 0$ such that for all $x$ in the ball $\mathcal{B}_r$, we have $V(x) < m$.
  
  Consider an initial condition $x_0$ within the ball $\mathcal{B}_r$. The value of the Lyapunov function at this initial condition is $V(x_0) < m$. Since $V(x)$ is non-increasing in the ball $\mathcal{B}_{R_0}$, the value of $V(x)$ along the trajectory $\mathcal{X}(x_0, t)$ cannot increase over time. Therefore, for all future time $t \ge 0$, the value of $V(x)$ remains strictly less than $m$.

  This implies that the trajectory $\mathcal{X}(x_0, t)$ cannot reach the sphere $\mathcal{S}_R$, because if it did, the value of $V$ would be at least $m$. Consequently, the trajectory must remain within the ball $\mathcal{B}_R$ for all future time $t \ge 0$. This establishes the stability of the equilibrium point $x = 0$.<br><br>
  
  Let's assume now that $\dot{V}(x) < 0$ for all $x \in \mathcal{B}_{R_0}$, $x \neq 0$ and show asymptotic stability, by contradiction. Suppose there exists an initial condition $x_0$ within the ball $\mathcal{B}_r$ as constructed above. Then the trajectories $\mathcal{X}(x_0, t)$ remain within the ball $\mathcal{B}_R$ for all future time $t \ge 0$. Since $V(x)$ is lower bounded and decreases continually along the trajectories, it must converge to some limit $L$ such that $L \geq 0$ as $t \to +\infty$, $V(x) \geq L$. 
  
  Then, since $V(x)$ is continuous and $V(0)=0$, there exist a ball $\mathcal{B}_{r_0}$ that the system never reach. However, since $\dot{V}(x) < 0$ for all $x \neq 0$, the trajectory cannot remain in any region where $V(x)$ is greater than $L$ without eventually decreasing below $L$. This leads to a contradiction, as it implies that the trajectory must eventually enter the ball $\mathcal{B}_{r_0}$, where $V(x)$ would be less than $L$. Therefore, the only consistent conclusion is that the trajectory must converge to the equilibrium point $x = 0$ as $t \to +\infty$. This establishes the asymptotic stability of the equilibrium point.


  <div class="images" style="justify-content:center; text-align:center;">
    <figure id="fig_4.4_local_stability_proof">
      <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch4_proof_local_stab.png" alt="Local Stability Proof" width="600"/>
      <figcaption style="text-align: center;"><strong>Figure 4.4:</strong> Illustration of the proof of local stability</figcaption>
    </figure>
  </div>
  <div style="text-align: right; margin-top: 0.5em;">□</div>
</div>

##### Global Stability

In order to assert *global stability* of the system, one might naturally think of extending the local stability theorem by requiring the ball $\mathcal{B}_{R_0}$ to cover the entire state space $\mathbb{R}^n$. However, this approach is not sufficient to guarantee global stability. The key reason is that even if a Lyapunov function satisfies the conditions of local stability everywhere in the state space, it does not necessarily imply that all trajectories will converge to the equilibrium point from any initial condition. An additional requirement is needed to ensure that the Lyapunov function grows unbounded as the state moves away from the equilibrium point. This ensures that trajectories starting far from the equilibrium will still be drawn back toward it. We formalize this idea in the following theorem:

<div class="thm-window">
  <div class="thm-title" id="theorem_4.3">Theorem 4.3 - Global Stability</div>
  If there exist a scalar function $V(x)$ with continuous first partial derivatives such that:
  <ul>
  <li>$V(x)>0$ ($\forall x \in \mathbb{R}^n, x \neq 0$) and $V(0)=0$,</li>
  <li>$\lVert x \rVert \to +\infty \Rightarrow V(x) \to +\infty$,</li>
  <li>$\dot{V}(x) < 0, \forall x \neq 0$.</li>
  </ul>
  Then the equilibrium point $x=0$ of the system $\dot{x} = f(x)$ is <strong>globally asymptotically stable</strong>.
</div>


<div class="proof">
  <strong>Proof</strong><br>
  The proof of global asymptotic stability is the same as in the local case, by noticing that the radial unboundedness of $V(x)$, combined with the negative definiteness of $\dot{V}(x)$, implies that, given any initial condition $x_0 \in \mathbb{R}^n$, the trajectories $\mathcal{X}(x_0, t)$ will remain in the bounded region defined by $V(x) \leq V(x_0)$ for all future time $t \ge 0$.
  <div style="text-align: right; margin-top: 0.5em;">□</div>
</div>

<div class="remark-window">
  <div class="remark-title" id="remark_4.4">Remark 4.4 - Choice of Lyapunov functions</div>
  Many different Lyapunov functions can be constructed for a given system. For instance, if $V$ is a Lyapunov function, for a given system, so is $V_1 = \rho V^\alpha$, where $\rho > 0$ is a constant and $\alpha \geq 1$ is a scalar. Indeed, the properties of positive definiteness and radial unboundedness are preserved, as well as the sign of the time derivative $\dot{V}_1$.<br>

  <br>More importantly, the choice of Lyapunov function is not unique, and different functions may provide different insights into the system's stability properties. The selection of an appropriate Lyapunov function often depends on the specific characteristics of the system being analyzed and may require creativity and intuition. Consider for instance the following pendulum system:
  \[
    \ddot{\theta} + \dot{\theta} + \sin(\theta) = 0
  \]
  A possible Lyapunov function for this system could be:
  \[
    V(\theta, \dot{\theta}) = \dfrac{1}{2} \dot{\theta}^2 + (1 - \cos(\theta))
  \]
  which represents the total mechanical energy of the pendulum. This function is positive definite and radially unbounded, and its time derivative along the system trajectories is negative definite, indicating stability of the equilibrium point at $\theta = 0$. If now, we consider a different Lyapunov function:
  \[
    V_1(\theta, \dot{\theta}) = \dfrac{1}{2} \dot{\theta}^2 + \dfrac{1}{2}(\dot{\theta} + \theta)^2 + 2 (1 - \cos(\theta))
  \]
  This function also satisfies the conditions for being a Lyapunov function, because locally:
  \[
    \dot{V}_1(\theta, \dot{\theta}) = -(\dot{\theta}^2 + \theta \sin(\theta)) \leq 0
  \]
  However, this second Lyapunov function has the added benefit the $\dot{V_1}$ is actually negative definite, and therefor it can be used to prove asymptotic stability of the equilibrium point at $\theta = 0$.<br>

  <br>Along the same line, it is important to note that the theorems in Lyapunov's analysis presented earlier are all <i>sufficient</i> theorems. If for a given system and a particular choice of Lyapunov function candidate $V$, the conditions on $\dot{V}$ are not satisfied, one cannot conclude on the stability or instability of the system. In such cases, it may be necessary to explore alternative Lyapunov function candidates. 
</div>

---

#### LaSalle's Invariance Principle

It is possible to relax the condition on the time derivative of the Lyapunov function $\dot{V}(x)$ in order to prove asymptotic stability. Indeed, in this section, we will show which supplementary conditions can be added to Lyapunov's direct method in order to conclude on asymptotic stability, even when $\dot{V}(x) \leq 0$. Moreover, this approach will also relax the conditions on the positive definiteness of the Lyapunov function $V(x)$. Doing so will give us a criterion to prove asymptotic convergence, equally for equilibrium points and for limit cicles, however this theorem will not be a proof of Lyapunov stability anymore.

Before stating LaSalle's invariance principle, we need to define the concept of invariant set. This set will represent the combination of all points in the state space where, for a given system dynamics, the trajectories remain indefenetly in that set.

<div class="def-window">
  <div class="def-title" id="def_4.12">Definition 4.12 - Invariant set</div>
  Consider an autonomous system with dynamics $\dot{x} = f(x)$, where $x \in \mathbb{R}^n$ is the state vector and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function. The <b>invariant set</b> $\mathcal{I}$ is defined as the set of of initial conditions $x_0$ such that the corresponding trajectories $\mathcal{X}(x_0, t)$ remain in $\mathcal{I}$ for all future time $t \geq 0$.
  \[
    \mathcal{I} = \{ x_0 \in \mathbb{R}^n \mid \mathcal{X}(x_0, t) \in \mathcal{I}, \forall t \geq 0 \}
  \]
</div>

*For more details on invariant sets, please refer to the section on [Invariant Sets](MPC#22-invariant-sets) from the lecture on MPC.*

In parallel to invariant sets, we can also define a set containing all points where the time derivative of a given Lyapunov function is equal to zero. This set will be useful in the statement of LaSalle's invariance principle since we try to extand the asymptotic stabilisty analysis to the case where $\dot{V}(x) \leq 0$, which means we need to include only the case $\dot{V}(x)=0$ compared to our previous analysis. This set is denoted as $\mathcal{V}$ and defined as follows:
<div>
\[\mathcal{V} = \{ x \in \mathbb{R}^n \mid \dot{V}(x) = 0 \} \cap \Omega\]
</div>
where $\Omega$ is a compact invariant set for the system. Be careful that the set $\mathcal{V}$ is not necessarily invariant.

<div class="thm-window">
  <div class="thm-title" id="theorem_4.4">Theorem 4.4 - LaSalle's Invariance Theorem</div>
  Consider a continuous function $V: \mathbb{R}^n \rightarrow \mathbb{R}$ and an autonomous dynamical system $\dot{x} = f(x)$, where $x \in \mathbb{R}^n$ is the state vector and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function. If the sets $\Omega$, $\mathcal{V}$ and $\mathcal{I}$ are defined and follow the properties:
  <ol>
  <li>$\Omega$ is a compact set (closed and borned) and is invariant for the system
  \[\boxed{x_0\in\Omega\Rightarrow\mathcal{X}(x_0,t)\in\Omega\quad\forall t\geq 0}\]</li>
  <li>In the set $\Omega$, the function $V(x)$ is such that:
  \[\boxed{\forall x \in \Omega, \dot{V}(x) := \tfrac{\partial V}{\partial x}f \leq 0 }\]</li>
  <li>The set $\mathcal{V}$ is defined as the set of points in $\Omega$ where $\dot{V}(x) = 0$:
  \[\boxed{\mathcal{V} = \{ x \in \Omega \mid \dot{V}(x) = 0 \}}\]</li>
  <li>The set $\mathcal{I}$ is the largest invariant among the set contained in $\mathcal{V}$:
  \[\boxed{\mathcal{I} \subseteq \mathcal{V}\quad \forall x \in\mathcal{I}\Rightarrow\mathcal{X}(x,t)\in\mathcal{I}\quad\forall t\geq 0}\]</li>
  </ol>
  Then, for any initial condition $x_0 \in \Omega$, the trajectory $\mathcal{X}(x_0, t)$ asymptotically approaches the set $\mathcal{I}$ as $t \to +\infty$.
  \[\forall x_0 \in \Omega \Rightarrow \mathcal{X}(x_0, t) \to \mathcal{I} \; \text{as} \; t \to +\infty\]
</div>
  
**Example: simple pendulum**

Consider the simple pendulum system, comprised of a mass $m$ attached to a rod of unit length, swinging under the influence of gravity and subject to a viscous force proportional to its angular velocity. From basic mechanical principles, the dynamics of this system are described by the second-order differential equation:

<div>
\[
m\ddot{\theta} + b\dot{\theta} + mg\sin(\theta) = 0
\]
</div>

where:
- $\theta$ is the angular displacement of the pendulum from the vertical position,
- $b$ is the damping coefficient,
- $g$ is the acceleration due to gravity.

To analyze the stability of this system using LaSalle’s invariance principle, we first rewrite the second-order equation as a first-order system by defining the state vector $x = [\theta, \dot{\theta}]^\top$. The state-space representation becomes:

<div>
\[
\begin{aligned}
\dot{x}_1 &= x_2 \\
\dot{x}_2 &= -\frac{b}{m}x_2 - g\sin(x_1)
\end{aligned}
\]
</div>

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_4.5_pendulum_system">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch4_pendul.jpeg" alt="Pendulum System" width="150"/>
    <figcaption style="text-align: center;"><strong>Figure 4.5:</strong> Simple pendulum system</figcaption>
  </figure>
</div>

We would like to analyze the stability of the equilibrium point at $\theta = 0$ (the downward position). A natural Lyapunov function for this system is the total mechanical energy:

<div>
\[
\begin{aligned}
V(x) &= E_c + E_p \\
     &= \tfrac{1}{2} m x_2^2 + mg\big(1 - \cos(x_1)\big)
\end{aligned}
\]
</div>

This function is positive for all $x$ except when $1-\cos(x_1)=0$, which occurs at $x_1 = 0$ (the downward position) and at $x_1 = 2k\pi$ for any integer $k$ (the upright positions).

Next, we compute the time derivative of $V(x)$ along system trajectories:

<div>
\[
\begin{aligned}
\dot{V}(x) &= \frac{\partial V}{\partial x}\,\dot{x} \\
&= mx_2\dot{x}_2 + mg\sin(x_1)\dot{x}_1 \\
&= mx_2\left(-\frac{b}{m}x_2 - g\sin(x_1)\right) + mg\sin(x_1)x_2 \\
&= -b x_2^2 \le 0.
\end{aligned}
\]
</div>

Thus, near the equilibrium point $\theta = 0$, the Lyapunov function satisfies:
1. $V(x) = 0$ at $x = 0$,
2. $V(x) > 0$ for all $x \neq 0$,
3. $\dot{V}(x) \le 0$ for all $x$.

From Lyapunov’s direct method, we can conclude that the equilibrium at $\theta = 0$ is locally stable. However, because $\dot{V}(x) = 0$ whenever $x_2 = 0$, we cannot conclude asymptotic stability from Lyapunov’s theorem alone. To proceed further, we apply LaSalle’s invariance principle.

First, consider the set $\mathcal{V}$ where $\dot{V}(x) = 0$. This occurs whenever $x_2 = 0$, regardless of the value of $x_1$. Hence:

<div>
\[\mathcal{V} = \{x \in \mathbb{R}^2 \mid x_2 = 0 \}\]
</div>

which corresponds to the horizontal axis in the state space.

Next, we determine the largest invariant subset $\mathcal{I} \subseteq \mathcal{V}$. When $x_2 = 0$, the system dynamics reduce to:

<div>
\[
\begin{aligned}
\dot{x}_1 &= 0, \\
\dot{x}_2 &= - g\sin(x_1).
\end{aligned}
\]
</div>

To remain in $\mathcal{V}$ and be invariant, we must also have $\dot{x}_2 = 0$, which requires $\sin(x_1)=0$, leading to $x_1 = k\pi$ for any integer $k$. Thus,

<div>
\[\mathcal{I} = \{(\theta,\dot{\theta}) \mid \dot{\theta}=0,\; \theta = k\pi,\; k\in\mathbb{Z}\}\]
</div>

Applying LaSalle’s invariance principle, we now distinguish two cases:

**Case 1 — No damping ($b=0$)**

The system is conservative, and $\dot{V}(x) = 0$ everywhere. Trajectories remain on the level sets of the energy function and exhibit periodic motion around the equilibrium. The system is locally stable but not asymptotically stable, since trajectories do not converge.

**Case 2 — With damping ($b>0$)**

In this case, $\dot{V}(x)$ is negative semidefinite, and trajectories decrease in energy. Because the pendulum has saddle points at $\theta = 2k\pi+\pi$, separatrices appear in the phase portrait, enclosing a compact region around the downward equilibrium. Any level set of the Lyapunov function inside this region (e.g., $V(x) \le mg - \epsilon$) forms a compact invariant set:

<div>
\[
\Omega_{mg-\epsilon} = \{ x \in \mathbb{R}^2 \mid V(x) \le mg-\epsilon,\; x_1 \in (-\pi, \pi) \}
\]
</div>

Within this set, all trajectories converge to $\theta = 0$ because of damping. Thus, the downward equilibrium is **locally asymptotically stable** within $\Omega_{mg-\epsilon}$.

Finally, even though LaSalle’s invariance principle allows us to conclude local asymptotic stability of the downward equilibrium, we cannot extend this to global asymptotic stability. The presence of multiple invariant sets, the upright equilibria at $\theta = 2k\pi+\pi$, prevents all trajectories from converging to $\theta = 0$ from arbitrary initial conditions. While every trajectory eventually converges to an equilibrium point, LaSalle’s principle and the Lyapunov function alone do not determine which equilibrium will be reached from a given initial state.

---

#### Lyapunov Functions Construction

Until now, in order to work with a Lyapunov function, we had to propose a candidate function $V(x)$ and then proceed through trial and error or construction and correction to verify if it satisfied the conditions to be clasified as a lyapunov function. The issue with this approach is that one needs to have some intuition on the system dynamics in order to propose a relevant Lyapunov function candidate. However, there exists systematic methods to construct Lyapunov candidats for specific classes of systems. In this section, we will focus on one of those methods, the first one help us know if a particular Lyapunov candidat is indeed leading to a Lyapunov function. 

##### Krasovskii's Method

<div class="thm-window">
  <div class="thm-title" id="theorem_4.5">Theorem 4.5 - Krasovskii's Method</div>
  Consider the autonomous system $\dot{x} = f(x)$, where $x \in \mathbb{R}^n$ is the state vector and $f: \mathbb{R}^n \rightarrow \mathbb{R}^n$ is a continuous function, with the equilibrium point being at the origin $f(0) = 0$. Let define the matrix $A(x)$ as the Jacobian of $f(x)$:
  \[A(x) = \dfrac{\partial f}{\partial x}\]
  If there exists on open set $\Omega \subseteq \mathbb{R}^N$ containing the origin, such that the matrix $F(x)=A(x) + A^\top(x) < 0$ is negative definite $\forall x\neq 0, x \in \Omega$ (i.e. $x^\top F(x) x < 0 $), then a Lyapunov function for the system is given by:
  \[V(x) = f^\top(x) f(x)\]
  and the equilibrium point $x=0$ is asymptotically stable. Additionally, if $\Omega = \mathbb{R}^n$ and $V(x) \to +\infty$ as $\lVert x \rVert \to +\infty$, then the equilibrium point is globally asymptotically stable.
</div>

<div class="proof">
  <strong>Proof</strong><br>
  First, let's verify that the negative definiteness of $F(x)$ implies that $f(x) \neq 0$ for all $x \neq 0$. Since the square matrix $F(x)$ is negative definite for non-zero $x$, one can show that the Jacobian matrix $A(x)$ is invertible, by contradiction. Indeed, if there existed a non-zero vector $v$ such that $A(x)v = 0$, then we would have:

  \[v^\top F(x) v = 2 v^\top A(x)v + v^\top A^\top(x)v\]

  which contradicts the negative definiteness of $F(x)$. Therefore, $A(x)$ is invertible for all $x \neq 0$, which implies that $f(x) \neq 0$ for all $x \neq 0$.This also implies that the equilibrium point is unique in $\Omega$.

  We can now proceed to show the asymptotic stability of the equilibrium point using the proposed Lyapunov function $V(x) = f^\top(x) f(x)$. First, we note that $V(x)$ is positive definite since $f(x) \neq 0$ for all $x \neq 0$ and $V(0) = 0$. Next, we compute the time derivative of $V(x)$ along the system trajectories, using the fact that $\dot{f}(x) = A(x)f(x)$:
  
  \[\dot{V}(x) = f^\top \dot{f} + \dot{f}^\top f = f^\top A f + f^\top A^\top f = f^\top F f\]
  

  The negative definiteness of $F(x)$ implies that $\dot{V}(x) < 0$ for all $x \neq 0$. Therefore, by Lyapunov's direct method, the equilibrium point $x = 0$ is asymptotically stable.

  <div style="text-align: right; margin-top: 0.5em;">□</div>
</div>

While the use of the Krasovskii's model theorem is straightforward, it is limited to systems where the Jacobian matrix $A(x)$ can be computed and satisfies the negative definiteness condition. In addition, for system of higher dimensions, verifying the negative definiteness of $F(x)$ for all $x$ can be computationally intensive. 

Thus a generalization of this method exists and is as follows:

<div class="thm-window">
  <div class="thm-title" id="theorem_4.6">Theorem 4.6 - Generalized Krasovskii's Theorem</div>
  Consider the same system as in <a href="#theorem_4.5">Theorem 4.5</a>, if there exists $\Omega \subseteq \mathbb{R}^n$, and $P>0$ and $\exists Q>0$ two positive definite matrices such that $\forall x \neq 0, x \in \Omega$, the it is true that:
  \[F(x)=A^\top(x) P + P A(x) = -Q < 0 \]
  is a negative definite matrix, then a Lyapunov function for the system is given by:
  \[V(x) = f^\top(x) P f(x) \]
  and the equilibrium point $x=0$ is asymptotically stable. Additionally, if $\Omega = \mathbb{R}^n$ and $V(x) \to +\infty$ as $\lVert x \rVert \to +\infty$, then the equilibrium point is globally asymptotically stable.
</div>

<div class="proof">
  <strong>Proof</strong><br>
  The proof follows the same structure as that of <a href="#theorem_4.5">Theorem 4.5</a>. First, we verify that $f(x) \neq 0$ for all $x \neq 0$ in $\Omega$, using the negative definiteness of $F(x)$ to show that $A(x)$ is invertible. Next, we define the Lyapunov function $V(x) = f^\top(x) P f(x)$, which is positive definite since $P > 0$ and $f(x) \neq 0$ for all $x \neq 0$. 

  We then compute the time derivative of $V(x)$ along the system trajectories:

  \[\dot{V}(x) = f^\top P \dot{f} + \dot{f}^\top P f = f^\top P A f + f^\top A^\top P f = f^\top F f -  f^\top Q f\]

  The negative definiteness of $F(x)$ and the positive definiteness of $Q$ imply that $\dot{V}(x) < 0$ for all $x \neq 0$. Therefore, by Lyapunov's direct method, the equilibrium point $x = 0$ is asymptotically stable. Additionally, if $\Omega = \mathbb{R}^n$ and $V(x) \to +\infty$ as $\lVert x \rVert \to +\infty$, then the equilibrium point is globally asymptotically stable.
  <div style="text-align: right; margin-top: 0.5em;">□</div>
</div>

##### Variable Gradient Method

If we know the Lyapunove function $V(x)$ and its gradient $\nabla V(x)$, we can use the variable gradient method as a formal approach to constructing Lyapunov functions. For low order systems, this method sometimes lead to the succesful construction of a Lyapunov function. 

To start, let us note the following relationship between the time derivative of the Lyapunov function and its gradient:
<div>
\[\dot{V}(x) = \nabla V(x)^\top f(x)\]
</div>
where $\nabla V(x) = \left[\frac{\partial V}{\partial x_1}, \frac{\partial V}{\partial x_2}, \ldots, \frac{\partial V}{\partial x_n}\right]^\top$. In order to recover a unique scalar function $V(x)$ from its gradient $\nabla V(x)$, the gradient must satisfy the following condition:
<div>
\[\dfrac{\partial \nabla V_i}{\partial x_j} = \dfrac{\partial \nabla V_j}{\partial x_i} \quad \forall i,j = 1, \ldots, n\]
</div>
For a two-dimensional system, this condition reduces to:
<div>
\[\dfrac{\partial \nabla V_1}{\partial x_2} = \dfrac{\partial \nabla V_2}{\partial x_1}\]
</div>
While respecting the above conditions, we can propose a parametric form for the gradient $\nabla V(x)$, to make $\dot{V}(x)$ negative definite: 
<div>
\[\dot{V} = \nabla V f < 0\]
</div>

Since satisfaction of this conditions implies that the integration relust is independent of the integration path, it is usually convenient to obtain $V(x)$ by integrating along a path which is parallel to each axis in turn:
<div>
\[V(x) = \int_0^{x_1} \nabla V_1(\zeta_1, 0, \ldots, 0) d\zeta_1 + \int_0^{x_2} \nabla V_2(x_1, \zeta_2, 0, \ldots, 0) d\zeta_2 + \ldots + \int_0^{x_n} \nabla V_n(x_1, x_2, \ldots, \zeta_n) d\zeta_n\]
</div>

**Example:**

Let us use the variable gradient method to construct a Lyapunov function for the following system:
<div>
\begin{align*}
\dot{x}_1 &= -2x_1 \\
\dot{x_2} &= -2x_2+2x_1x_2^2
\end{align*}
</div>
We assume the gradient of the Lyapunov function has the following parametric form:
<div>
\begin{align*}
\nabla V_1(x) &= a_{11} x_1 + a_{12} x_2 \\
\nabla V_2(x) &= a_{21} x_1 + a_{22} x_2
\end{align*}
</div>
where $a_{ij}$ are unknown parameters to be determined. The condition for the gradient to be integrable gives:
<div>
\[\dfrac{\partial \nabla V_1}{\partial x_2} = \dfrac{\partial \nabla V_2}{\partial x_1}\]
\[\Rightarrow a_{12} = a_{21}\]
</div>
If whe chose the following values for the parameters:
<div>
\[a_{11} = a_{22} = 1, \quad a_{12} = a_{21} = 0,\]
</div>
then the gradient becomes:
<div>
\begin{align*}
\nabla V_1(x) &= x_1 \\
\nabla V_2(x) &= x_2
\end{align*}
</div>
and the time derivative of the Lyapunov function is:
<div>
\[\dot{V}(x)=\nabla V \dot{x} = -2x_1^2-2x_2^2(1-x_1x_2)\]
</div>
which is negative definite in the region $\mathcal{D} = \{x \in \mathbb{R}^2 \mid x_1x_2 < 1\}$. Finally, we can compute the Lyapunov function by integrating the gradient:
<div>
\[V(x) = \int_0^{x_1} x_1dx_1 + \int_0^{x_2} x_2 dx_2 = \dfrac{1}{2} x_1^2 + \dfrac{1}{2} x_2^2\]
</div>
Which is positive semi definite, thus the Lyapunov function $V(x) = \frac{1}{2} x_1^2 + \frac{1}{2} x_2^2$ proves that the equilibrium point at the origin is locally asymptotically stable within the region $\mathcal{D}$.

---

#### Exercises

**Stability and Lyapunov equation**

Using the Lyapunov function $V(x)=x^2+\dot{x}^2$, show that the systems described by the following differential equations are asymptotically stable:
<ul>
<li>$\ddot{x} + (1+x^2)\dot{x}+x = 0$</li>
<li>$\ddot{x} + (1-x^2)\dot{x}+x = 0$</li>
</ul>

Are those systems also globally stable ?

<details markdown="1">
  <summary><strong>Solution</strong></summary>

</details>

**RLC Circuit**

Consider the following RLC circuit:

<div class="images" style="justify-content:center; text-align:center;">
  <figure id="fig_4.1_RLC_circuit">
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch4_ex1_electrical_circuit.png" alt="RLC Circuit" width="450"/>
    <figcaption style="text-align: center;"><strong>Figure 4.1:</strong> RLC Circuit</figcaption>
  </figure>
</div>

<ol>
<li>Derive the state-space representation of the circuit, choosing the capacitor voltage $v_C$ and inductor current $i_L$ as state variables $x_1$ and $x_2$.</li>
<li>Consider 
<div>
\[
P = \begin{bmatrix} p_{11} & p_{12} \\ p_{12} & p_{22} \end{bmatrix} \quad Q= I
\]
and solve the Lyapunov equation
\[
A^\top P + PA=-Q
\]
</div>
in order to find the unknown coefficients $p_{11}$, $p_{12}$ and $p_{22}$.</li>
<li>Using the Kronecker product, defined as:
<div>
  \[
    A \otimes B = \begin{bmatrix}
    a_{11}B & a_{12}B & \cdots & a_{1n}B \\
    a_{21}B & a_{22}B & \cdots & a_{2n}B \\
    \vdots & \vdots & \ddots & \vdots \\ 
    a_{m1}B & a_{m2}B & \cdots & a_{mn}B
    \end{bmatrix}
  \]
show that the Lyapunov equation can be rewritten as:
\[
p=-\left(I \otimes A^\top + A^\top \otimes I\right)^{-1}q
\]
</div>
where $p = [p_{11}, p_{12}, p_{12}, p_{22}]^\top$ and $q = [1, 0, 0, 1]^\top$.</li>

<li>Using the <code>kron</code> function in MATLAB write a s;aal script that computes the matrix $P$ solving the Lyapunov equation (replacing the <code>lyap</code> function).</li>
</ol>

<details markdown="1">
  <summary><strong>Solution</strong></summary>

  **(1)** The state-space representation of the RLC circuit can be derived using Kirchhoff's laws.  
  We define the state variables as:
  $$
  x_1 = u_C \quad \text{(capacitor voltage)}, \quad x_2 = i_L \quad \text{(inductor current)}.
  $$

  From the voltage and current relationships in the circuit, we can write:
  <div>
  \begin{align}
    Ri_L + L \dfrac{di_L}{dt} + u_C &= 0 \tag{4.3}\label{eq:RLC_eq1} \\
    i_L + C\dfrac{du_C}{dt} + \dfrac{u_C}{R} &= 0 \tag{4.4}\label{eq:RLC_eq2}
  \end{align}
  </div>

  Substituting the state variables into these equations gives:
  <div>
  \begin{align}
    &\begin{cases}
    R x_2 + L \dfrac{dx_2}{dt} + x_1 = 0, \\[4pt]
    x_2 + C\dfrac{dx_1}{dt} + \dfrac{x_1}{R} = 0.
    \end{cases}\\[6pt]
    \Rightarrow &
    \begin{cases}
    \dot{x}_2 = -\dfrac{x_1}{L} - \dfrac{R}{L}x_2, \\[4pt]
    \dot{x}_1 = -\dfrac{x_1}{RC} - \dfrac{x_2}{C}.
    \end{cases}
  \end{align}
  </div>

  In matrix form:
  <div>
  \[
  \dot{x} = A x \quad \text{with} \quad
  A = \begin{bmatrix}
  -\tfrac{1}{RC} & \tfrac{1}{C} \\[6pt]
  -\tfrac{1}{L} & -\tfrac{R}{L}
  \end{bmatrix}.
  \]
  </div>

  **(2)** To find the Lyapunov equation terms, we compute  $A^\top P$ and $P A$:

  <div>
  \[
  A^\top P = \begin{bmatrix} 
  -\tfrac{p_{11}}{RC} - \tfrac{p_{12}}{L} & -\tfrac{p_{12}}{RC} - \tfrac{p_{22}}{L} \\
  \tfrac{p_{11}}{C} - \tfrac{p_{12}R}{L} & \tfrac{p_{12}}{C} - \tfrac{p_{22}R}{L}
  \end{bmatrix}, \quad
  P A = \begin{bmatrix} 
  -\tfrac{p_{11}}{RC} - \tfrac{p_{12}}{L} & \tfrac{p_{11}}{C} - \tfrac{p_{12}R}{L} \\
  -\tfrac{p_{12}}{RC} - \tfrac{p_{22}}{L} & \tfrac{p_{12}}{C} - \tfrac{p_{22}R}{L}
  \end{bmatrix}.
  \]
  </div>

  Then:
  <div>
  \[
  \Rightarrow A^\top P + P A =
  \begin{bmatrix}
  -2\tfrac{p_{11}}{RC} - 2\tfrac{p_{12}}{L} &
  \tfrac{p_{11}}{C} - \tfrac{p_{22}}{L} - \tfrac{p_{12}}{RC} - p_{12}\tfrac{R}{L} \\[4pt]
  \tfrac{p_{11}}{C} - \tfrac{p_{22}}{L} - \tfrac{p_{12}}{RC} - p_{12}\tfrac{R}{L} &
  2\tfrac{p_{12}}{C} - 2p_{22}\tfrac{R}{L}
  \end{bmatrix} = -Q.
  \]
  </div>

  This leads to the system:
  <div>
  \[
  \begin{cases}
  -1 = -2p_{11}\dfrac{1}{RC} - 2p_{12}\dfrac{1}{L}, \\[4pt]
  -1 = 2p_{11}\dfrac{1}{C} - 2p_{22}\dfrac{R}{L}, \\[4pt]
  0 = p_{11}\dfrac{1}{C} - p_{22}\dfrac{1}{L} - p_{12}\dfrac{1}{RC} - p_{12}\dfrac{R}{L}.
  \end{cases}
  \]
  </div>

  Solving this system yields:
  <div>
  \begin{align}
    p_{11} &= \dfrac{RC(R^2C + 2L + C)}{4(R^2C + L)}, \\[6pt]
    p_{12} &= \dfrac{LC(R^2 - 1)}{4(R^2C + L)}.
    p_{22} &= \dfrac{L(2R^2C + R^2L + L)}{4R(R^2C + L)}, \\[6pt]
  \end{align}
  </div>

  **(3)** To compute $I \otimes A^\top + A^\top \otimes I$:

  <div>
  \begin{align}
    I \otimes A^\top &=
    \begin{bmatrix}
    -\tfrac{1}{RC} & -\tfrac{1}{L} & 0 & 0 \\
    \tfrac{1}{C} & -\tfrac{R}{L} & 0 & 0 \\
    0 & 0 & -\tfrac{1}{RC} & -\tfrac{1}{L} \\
    0 & 0 & \tfrac{1}{C} & -\tfrac{R}{L}
    \end{bmatrix}, \\[10pt]
    A^\top \otimes I &=
    \begin{bmatrix}
    -\tfrac{1}{RC} & 0 & -\tfrac{1}{L} & 0 \\
    0 & -\tfrac{1}{RC} & 0 & -\tfrac{1}{L} \\
    \tfrac{1}{C} & 0 & -\tfrac{R}{L} & 0 \\
    0 & \tfrac{1}{C} & 0 & -\tfrac{R}{L}
    \end{bmatrix}.
  \end{align}
  </div>

  Therefore:
  <div>
  \[
  I \otimes A^\top + A^\top \otimes I =
  \begin{bmatrix}
  -2\tfrac{1}{RC} & -\tfrac{1}{L} & -\tfrac{1}{L} & 0 \\[4pt]
  \tfrac{1}{C} & -\tfrac{R}{L}-\tfrac{1}{RC} & 0 & -\tfrac{1}{L} \\[4pt]
  \tfrac{1}{C} & 0 & -\tfrac{R}{L}-\tfrac{1}{RC} & -\tfrac{1}{L} \\[4pt]
  0 & \tfrac{1}{C} & \tfrac{1}{C} & -2\tfrac{R}{L}
  \end{bmatrix}.
  \]
  </div>

  Taking its inverse we obtain (recommended to compute using MATLAB or another computational tool):
  <div>
  \[
  \left(I \otimes A^\top + A^\top \otimes I\right)^{-1} =
  \begin{bmatrix}
  -\dfrac{C^2 R^3 + 2 L C R}{4 (C R^2 + L)} & \dfrac{C^2 R^2}{4 (C R^2 + L)} & \dfrac{C^2 R^2}{4 (C R^2 + L)} & -\dfrac{C^2 R}{4 (C R^2 + L)} \\[10pt]
  -\dfrac{C L R^2}{4 (C R^2 + L)} & -\dfrac{3 C L R}{4 (C R^2 + L)} & \dfrac{C L R}{4 (C R^2 + L)} & \dfrac{C L}{4 (C R^2 + L)} \\[10pt]
  -\dfrac{C L R^2}{4 (C R^2 + L)} & \dfrac{C L R}{4 (C R^2 + L)} & -\dfrac{3 C L R}{4 (C R^2 + L)} & \dfrac{C L}{4 (C R^2 + L)} \\[10pt]
  -\dfrac{L^2 R}{4 (C R^2 + L)} & -\dfrac{L^2}{4 (C R^2 + L)} & -\dfrac{L^2}{4 (C R^2 + L)} & -\dfrac{L^2 + 2 C L R^2}{4 (C R^3 + L R)}
  \end{bmatrix}.
  \]
  </div>
  Which leads to:
  <div>
  \[
  p = -\left(I \otimes A^\top + A^\top \otimes I\right)^{-1} q =
  \begin{bmatrix} p_{11} \\[4pt] p_{12} \\[4pt] p_{12} \\[4pt] p_{22} \end{bmatrix} = 
  \begin{bmatrix}
  \dfrac{C R (C R^2 + C + 2L)}{4 (C R^2 + L)} \\[10pt]
  \dfrac{C L (R^2 - 1)}{4 (C R^2 + L)} \\[10pt]
  \dfrac{C L (R^2 - 1)}{4 (C R^2 + L)} \\[10pt]
  \dfrac{L (L + 2 C R^2 + L R^2)}{4 R (C R^2 + L)}
  \end{bmatrix}
  \]
  </div>

  **(4)** The MATLAB script to compute the matrix $P$ solving the Lyapunov equation using the Kronecker product is as follows:

  ```matlab
  P=-inv(kron(eye(2),A.')+kron(A.',eye(2)))*[1;0;0;1]
  ```

</details>

---

### 3.2.3.5: Frobenius Theorem

---

### 3.2.3.6: Control Design Methods

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

## 3.2.4 Credits:
- Slotine's Nonlinear Control Book and Lectures: https://web.mit.edu/nsl/www/videos/lectures.html
- Philippe Müllhaupt's lecture: **Nonlinear Control Course (ME-523)** at EPFL in Autumn 2024
- **Introduction à l'analyse et à la commande des systems non linéaires** textbook by Philippe Müllhaupt, first edition (french)

## 3.2.5 Resources
https://hankyang.seas.harvard.edu/OptimalControlEstimation/stability.html

---

[Back to Top](#start)