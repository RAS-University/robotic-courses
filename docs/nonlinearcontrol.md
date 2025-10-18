---
title: Nonlinear Control
parent: Courses
layout: default
nav_order: 7
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

# Prerequisites
<!-- List courses required for this, including all course of Chapter 1 coming prior to this one, hence close-loop control, MPC, etc.  -->
* Linear Algebra
* Differential Equations
* Laplace Transforms
* Control Systems
  - Linear state
  - Transfer Functions
  - Controllability/observability


# Motivation

The subject of nonlinear control deals with the analysis and design of control systems that exhibit nonlinear behavior, i.e., a control system in which one or more components are nonlinear. In the analysis of nonlinear control systems, we study the stability, controllability, and observability of these systems using various mathematical tools and techniques.

One can wonder why nonlinear control is necessary when linear control techniques are well-established and widely used. Many reasons justify the need for nonlinear control:
- Improvement of performances: Linear control systems operate in a narrow range around an equilibrium point, when the range of control need to be extended, linear controllers fails to provide the desired performance. Nonlinear control techniques can be used to design controllers that can operate over a wider range of operating conditions, leading to improved performance.
- Hard nonlinearity: Many real-world systems exhibit hard nonlinearity, such as saturation, dead zones, and hysteresis, which cannot be adequately modeled using linear control techniques. Nonlinear control techniques can be used to design controllers that can handle these hard nonlinearity effectively.
- Model uncertainties: many control problems involve uncertainties in the model parameters. A linear controller based on an inaccurate model may lead to poor performance or instability. Nonlinear control techniques can be used to design controllers that are robust to model uncertainties, leading to improved performance and stability.

The subject of nonlinear control is an important area of research in control theory. It has applications in various fields, including robotics, aerospace, automotive systems, and process control. Nonlinear control techniques are used to design controllers for complex systems that exhibit nonlinear behavior, leading to improved performance, stability, and robustness. 

# Chapter 1: System definitions

## 1.1: Superposition principle

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

## 1.2: Nonlinearities

Nonlinearities can be classified in two categories, *inherent (natural)* or *intentional (artificial)*.

Inherent nonlinearity naturally comes from the system hardware and motion. To cite a few as an example, there is the centripetal forces, or the Coulomb interaction forces. Usually, those nonlinearities are undesirable and control system have to properly compensate for them. Intentional nonlinearities, on the other hand, are artificially introduces by the designer in the system. 

Nonlinearities can also be classified mathematically, as *continuous* or *discontinuous*. Because of their discontinuous nature, discontinuous nonlinearities are often referred as *hard nonlinearities*, while continuous nonlinearities are called *soft nonlinearities*. Examples of hard nonlinearities include saturation, dead zones, and backlash, it can appear in both small and large range operation systems.

## 1.4: Non symmetrical unit response

Consider the simple linear system defined by the differential equation:

$$
\dot{x} = -x + u
$$

When applying a step input of amplitude 1, the system will respond as shown in the blue dashed curve in Figure 1.1. If we now apply a step input of amplitude -1, the system will respond symmetrically, as shown by the blue dashed curve in Figure 1.1.

Now consider the nonlinear system defined by the differential equation:

$$
\dot{x} = -\|x\|x + u
$$

When applying a step input of amplitude 1, the system will respond as shown in the red solid curve in Figure 1.1. If we now apply a step input of amplitude -1, the system will respond asymmetrically, as shown by the red solid curve in Figure 1.1.

<div class="images">
  <figure>
    <img src="{{ site.baseurl }}/assets/images/Nonlinear_control/ch1_asymmetrical_response.png" alt="Step Response" width="700"/>
    <figcaption style="text-align: center;"><strong>Figure 1.1:</strong> Step response of a linear system (blue dashed curve) and a nonlinear system (red curve)</figcaption>
  </figure>
</div>

## 1.5: Multiple Equilibrium points

Nonlinear systems can exhibit multiple equilibrium points, which are points where the system's state does not change over time. This is in contrast to linear systems, which typically have a single equilibrium point. One classic example of a nonlinear system with multiple equilibrium points is systems with higher order polynomial nonlinearities, such as the cubic nonlinearity.

$$
\dot{x} = - x + x^2
$$

We consider several initial conditions and simulate the system dynamics. The results are shown in Figure 1.2.

<div class="images">
  <figure>
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

# Chapter 2: Phase plane analysis

# Chapter 3: First harmonics method

# Chapter 4: Lyapunov stability theory 

# Chapter ?: Frobenius theory

# Chapter ?: Control design methods
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

<div id="lorenz-sim-container" class="simulator-container">
  <h2>Lorenz Oscillator Simulation</h2>
  <div class="controls">
    <div>
      <label>σ (sigma):</label>
      <input type="range" class="lorenz-sigma-slider" min="0.1" max="30" step="0.1" value="10">
      <span class="lorenz-sigma-value slider-value"></span>
    </div>
    <div>
      <label>ρ (rho):</label>
      <input type="range" class="lorenz-rho-slider" min="0.1" max="50" step="0.1" value="28">
      <span class="lorenz-rho-value slider-value"></span>
    </div>
    <div>
      <label>β (beta):</label>
      <input type="range" class="lorenz-beta-slider" min="0.1" max="10" step="0.01" value="2.67">
      <span class="lorenz-beta-value slider-value"></span>
    </div>
    <div>
      <label>dt:</label>
      <input type="range" class="lorenz-dt-slider" min="0.001" max="0.05" step="0.001" value="0.01">
      <span class="lorenz-dt-value slider-value"></span>
    </div>
  </div>
  <div class="chart-container" style="height: 600px;">
    <canvas class="lorenz-chart"></canvas>
  </div>
  <div class="buttons">
    <button class="reset-button">Reset</button>
  </div>
</div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="Lorenz.js"></script>
<script>
  // Ensure Plotly and DOM are loaded before initializing the widget
  document.addEventListener('DOMContentLoaded', function () {
    // The page markup uses the container with id 'lorenz-sim-container'.
    // Initialize the LorenzWidget only if it exists and Plotly is loaded.
    const targetId = 'lorenz-sim-container';
    if (window.Plotly && window.LorenzWidget && document.getElementById(targetId)) {
      LorenzWidget.init(targetId, { sigma: 10, rho: 28, beta: 8/3, dt: 0.01, trailLen: 800 });
    } else {
      // fallback: try again after a short delay if not loaded yet
      let tries = 0;
      function tryInit() {
        if (window.Plotly && window.LorenzWidget && document.getElementById(targetId)) {
          LorenzWidget.init(targetId, { sigma: 10, rho: 28, beta: 8/3, dt: 0.01, trailLen: 800 });
        } else if (tries < 10) {
          tries++;
          setTimeout(tryInit, 200);
        }
      }
      tryInit();
    }
  });
</script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="lorenz_simulator.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    initializeLorenzSimulator('lorenz-sim-container');
  });
</script>

### Credits:
- Slotine's Nonlinear Control Book and Lectures: https://web.mit.edu/nsl/www/videos/lectures.html
- Philippe Müllhaupt's lecture: **Nonlinear Control Course (ME-523)** at EPFL in Automn 2024
- **Introduction à l'analyse et à la commande des systems non linéaires** textbook by Philippe Müllhaupt, first edition (french)

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including  the page on haptics under Human-Robot Interaction chapter -->

