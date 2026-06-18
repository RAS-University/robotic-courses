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

### Introduction

Welcome to this chapter, we will build your expertise in robotic decision-making from the ground-up. We will begin with the mathematical foundations of decision-making in simplified, discrete environments. Once you understand how a robot evaluates its choices mathematically, we will transition to continuous spaces, the real-world physics where actual robots operate. Finally, we will explore advanced paradigms where the robot learns not from blind trial and error, but by observing human experts. By then, you will be well-equipped to engage in complex programming assignments and build autonomous agents. 

By the end of this chapter, you should understand these core concepts:

- How a robot's world is modeled as a grid.
- The fundamental Markov Decision Process framework, Bellman equations, and the core algorithms that allow a robot to navigate and take actions, such as Value Iteration & Q-Learning.

- How function approximation & policy gradient allow RL to operate in continuous real-world environments.

- How does the robot infer the reward function directly from expert human demonstrations.

We will keep mathematical equations to a minimum but detailed enough to grasp the core ideas & be able to implement them in code.

### Discrete reinforcement Learning

To program a robot to learn, we must first translate its physical reality into a mathematical framework. In Discrete RL, we treat the world as a finite set of possibilities.

#### **Markov Decision Process** (MDP)

Before we write any algorithm, we formulate the robot's task as a Markov Decision Process. An MDP is a mathematical framework used to model decision-making in situations where outcomes are not entirely under the agent's (decision-maker) control, but are also partly random.

The MDP replies on five key components:

- **States (S)**: A finite set of conditions. For our Mars rover, this could be a set of discrete topological coordinates on a map ($S = {s_{0}, s_{1}, ..., s_{n}}$) (environment + agent).
- **Actions (A)**: What the robot can do (eg., move up, down, left, right).
- **Transition Probabilities ($P^{a}_{ss'}$)**: The probability that taking action $a$ in state $s$ will successfully move the robot to state $s'$. Real environments are usually stochastic and cannot be expected, sometimes the wheels might slip on sand.

To simplify the equations, we assume a **first-order Markov property**. Meaning that the probability of transitioning to a new state depends ***only*** on the current state and action, and not the entire history of where the robot has been.
$$P(s_{t+1} | a_{t}, s_{t}, s_{t-1}, ..., s_{0}) \approxeq P(s_{t+1} | a_{t}, s_{t})$$

- **Reward ($R_{ss'}^{a}$)**: The feedback for the robot. Finding a rock sample yields a positive reward, while falling into a lava pit yields a severe negative penalty. Like the environment, rewards may be also stochastic (eg., finding a rock has an average reward of 10, but can go up to 15 or down to 5). $\rightarrow R_{ss'}^{a} = p(r_{t+1} | a_{t}, s_{t}, s_{t+1})$ 
- **Discount factor ($\gamma$)**: A value between 0 and 1 that determines if the robot is shortsighted (prioritizing immediate rewards) or rather farsighted (prioritizing long-term success).

#### **Optimal Policy $\pi(s, a)$**

A policy is a mapping or rule that tells the robot exactly which action $a$ to take whenever it finds itself in any state $s$. Simply put, the strategy the robot follows.

A few notes about policies:

- If $\pi(s, a)$ is equiprobable for all actions $a$, pick $a$ at random.
- Otherwise pick the best action $\underset{a}{\mathrm{argmax}}\space\pi(s, a)$

The ultimate goal of RL is to discover the optimal policy $\pi^{\star}(s, a)$. The optimal policy $\pi^{\star}(s, a)$ is the one that maximizes the expected reward.

- A common way to decide a policy $\pi$ is the **Greedy Policy**.

#### **Measuring Success: Value Functions**

How does a robot know if a policy is actually good? It uses Value Functions to estimate future rewards (success):

- **State-Value Function ($V^{\pi}(s)$)**: Gives for each state an estimate of the expected reward starting from that state, all depending on the agent's policy: 
$$V^{\pi}(s) = E_{\pi}\left\{\sum_{k=0}^{\infty}\gamma^{k}r_{t+k+1} | s_{t} = s\right\},\space 0\le \gamma \le 1$$
$$\rm{shortsighted}\space 0 \leftarrow \gamma \rightarrow 1 \space\rm{farsighted}$$

Practically computing the expected total discounted reward the robot will accumulate starting from state $s$ and following policy $\pi$. Simply put, it tells a robot "how good" a specific state $s$ (ie., location) is.
  
**Greedy Policy $\pi(s, a)$** can be computed from the State-Value Function for a specific (next) state $V^{\pi}$ $\rightarrow \pi(s, a) = \underset{a}{\mathrm{max}}\space V^{\pi}(s')$. 

- **Action-Value Function ($Q^{\pi}(s, a)$)**: Gives for each action $a$ taken in a state $s$ under policy $\pi$ a measure of the expected reward.
$$Q^{\pi}(s, a) = E_{\pi}\left\{\sum_{k=0}^{\infty}\gamma^{k}r_{t+k+1} | s_{t}=s, a_{t}=a\right\}$$

Practically computes the expected reward for taking a specific action $a$ in state $s$, and then following policy $\pi$ thereafter. Simply put, it tells the robot "how good" a specific action $a$ (ie., maneuver) is.

**Greedy Policy $\pi(s, a)$** can also be computed from the Action-Value Function for a given state/action couple $Q^{\pi}$ $\rightarrow \pi(s, a) = \underset{a}{\mathrm{max}}\space Q^{\pi}(s, a)$.

## Credits

This course page was created by **[Seif Labib](https://www.linkedin.com/in/seif-labib/), MSc in Robotics at EPFL**, under supervision of [Prof. Aude Billard](https://scholar.google.com/citations?user=tM4JMcQAAAAJ&hl=en&oi=ao), and funded by **IEEE RAS** and **EPFL**.

## Ressources




---

[Back to Top](#start)