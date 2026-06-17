---
title: 12.2 Reinforcement Learning
parent: "Chapter 12: Robot Learning"
has_children: false
nav_order: 2
layout: numbered
math: mathjax
chapter: 12
section: 2
publish: false
nav_exclude: true
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


# Reinforcement Learning 

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## Prerequisites

To get the most out of this **Reinforcement Learning module**, it’s helpful to have:

**Probability & Statistics**

RL operates in uncertain, stochastic environments. You should be comfortable with:

- Understanding expected values (denoted as $\Bbb{E}_{\pi}$) is crucial as RL algorithms optimize the ***expected*** sum of future rewards rather than guaranteed outcomes. $\rightarrow$ **Random Variables & Expectations**.
- Familiarity with Gaussian distributions, means and covariances. You will use these heavily when adding exploration noise (eg., drawing actions from $\mathcal{N}(\mu , \Sigma)$) or learning from failure. $\rightarrow$ **Probability Distributions**.
- The entire RL framework assumes the world is a **first-order Markov Decision Process (MDP)**. You must understand transition probabilities $p(s_{t+1} | a_{t}, s_{t})$, meaning the probability of transitioning to a new state depends ***only*** on the current state and action, not the whole history of previous states. $\rightarrow$ **Markov Chains & MDPs**.

**Linear Alegbra**

Robotic states (like joint angles, velocities & 3D positions) and actions (like motor torques) are represented as high-dimensional vectors and matrices.

- Operations in $\Bbb{R}^{N}$ and $\Bbb{R}^{p}$ spaces, matrix multiplication, transposes, and determinants. $\rightarrow$ **Vectors & Matrices**.
- For continuous control and Inverse RL, you will need to compute the Jacobian matrices of system dynamics. $\rightarrow$ **Jacobians & Block Matrices**.
- You must know how to solve linear systems, compute matrix inverses ($H^{-1}$), and use pseudo-inverses ($B^{\dagger}$) for non-square matrices. $\rightarrow$ **Linear Systems & Inverses**.

**Calculus (Differential & Integral)**

Moving from grid-worlds to real physical spaces requires continuous mathematics.

- To optimize policies, you will use gradient descent. You need to know how to calculate partial derivatives of a complex objective functions. $\rightarrow$ **Derivatives & Gradients**.
- Advanced RL & Inverse RL rely heavily on second-order Taylor series expansions. You must be able to compute and interpret the Hessian matrix (second-order partial derivatives) to estimate the shape of reward landscapes. $\rightarrow$ **Hessians & Taylor Expansions**.
- Calculating the partition function or expected values over continuous state-action spaces requires integration over probability densities. $\rightarrow$ **Integrals**

**Optimization**

- Understanding objective functions, constraints, and Lagrange multipliers. Inverse RL formulates reward-finding as a maximum-margin convex optimization problem (similar to SVMs). $\rightarrow$ **Convex Optimization**.
- Formulating and solving linear least-squares problems to approximate the Bellman residual error. $\rightarrow$ **Least-Squares**.

---

## General Motivation

Reinforcement Learning is a form of Machine Learning, where we have the agent (the entity making decisions & taking actions, such as a robot) learn exactly how a human and animal learn, through trials and errors. At its core, Reinforcement learning is different than supervised learning, where we provide the model with a desired output and train it until it could map the inputs to the desired outputs, unlike unsupervised learning, where the model identifies hidden patterns in the given data, groups the data or simplifies it, acting as an `explorer`, acting entirely without external guidance or `reinforcement`. 

Imagine sending a rover to planet Mars, with the purpose of collecting rock samples, in traditional algorithm planning & supervised learning, we would have to plan EVERYTHING in advance, program step-by-step instructions for any and every single situation the rover might encounter. In the real world, this is impossible.

In reinforcement learning however, the agent receives indirect supervision. It learns through receiving rewards (success) and penalties (failure) and must figure out the optimal path entirely on its own, just like a human learns how to walk, not falling over in `unseen` environments and places. Reinforcement Learning is the fundamental framework for teaching machines (robots) how to make a sequence of decisions & actions in complex, uncertain & unpredicted environments.

## Course Content

### RL Vocabulary

- **Agent**: The decision-maker, ie. the robot.
- **Environment**: The world the agent interacts with.
- **State (s)**: Where/How the agent is.
- **Actions (a)**: What the agent can do.
- **Reward (r)**: The feedback the agent gets from performing the *action* & getting to the (new) *state*.
- **Policy ($\pi$)**: The strategy or mapping from a state to an action.

### General Concepts

The agent




## Credits

This course page was created by **[Seif Labib](https://www.linkedin.com/in/seif-labib/), MSc in Robotics at EPFL**, under supervision of [Prof. Aude Billard](https://scholar.google.com/citations?user=tM4JMcQAAAAJ&hl=en&oi=ao), and funded by **IEEE RAS** and **EPFL**.

## Ressources




---

[Back to Top](#start)