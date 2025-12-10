---
title: Sampling-Based Planning
parent: Courses
layout: default
math: mathjax
---
<style>
.algorithm {
  border-left: 4px solid #3b82f6; /* blue accent */
  background: #f0f7ff;            /* soft blue background */
  padding: 12px 16px;
  margin: 1em 0;
  border-radius: 6px;
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.algorithm strong {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}
</style>


<style>
/* Lightweight styling for callouts and quizzes */
.definition, .assignment, .example, .slide{
  border-left: 4px solid #0ea5e9; padding: 0.75rem 1rem; margin: 1rem 0; background: #0ea5e90d;
}

.note {
  border-left: 4px solid #e9620eff; padding: 0.75rem 1rem; margin: 1rem 0; background: #e9990e0d;
}

.slide { border-left-color:#22c55e; background:#22c55e0d; }
.assignment { border-left-color: #16a34a;background: #ecfdf5 }
.example { border-left-color:#a855f7; background:#a855f70d; }

.mcq { border:1px solid #e5e7eb; border-radius:8px; padding:1rem; margin:1rem 0; }
.mcq h4 { margin:0 0 0.5rem 0; }
.mcq .options { margin:0.5rem 0; }
.mcq label { display:block; cursor:pointer; margin:0.25rem 0; }
.mcq .actions { margin-top:0.5rem; }
.mcq button { border:0; padding:0.5rem 0.8rem; border-radius:6px; background:#111827; color:white; }
.mcq .result { margin-top:0.5rem; font-weight:600; }
.mcq.correct { border-color:#22c55e; background:#22c55e10; }
.mcq.incorrect { border-color:#ef4444; background:#ef444410; }
code.k { background:#f3f4f6; padding:0.1rem 0.3rem; border-radius:4px; }
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

# 3.1 Sampling-Based Planning
- Table of Contents
{:toc}

---



## 3.1.1 Books
- *Planning Algorithms* – Steven LaValle (2006) [Free Online](http://lavalle.pl/planning/)
- *Sampling-Based Motion Planning: A Comparative Review* – Andreas Orthey, Constantinos Chamzas, Lydia E. Kavraki, arXiv:2309.13119 [cs.RO], 2023. [arXiv link](https://arxiv.org/abs/2309.13119) 

---

## 3.1.2 Prerequisites
- [Basic probability theory](../mathematical-foundation)
- [Robot kinematics and configuration space](../kinematics)
- [Graph search algorithms](../advanced_math/graph-theory)
<!-- - Collision checking in robot environments -->

---

## 3.1.3 General Motivation

## 3.1.4 Course Content

### 3.1.4.1: Introduction
<!-- ## The Planner's Mind - A Story of Representation -->

At its heart, motion planning asks a simple question: how does a robot decide to move from point A to point B without hitting anything? While the question seems straightforward, the answer is profoundly complex. For a robot with many joints, the number of possible positions - its "configuration space" - is astronomically large. The key to solving this intractable problem lies not in brute force, but in intelligent representation: the art of simplifying a complex physical world into an abstract map that a computer can understand. To explore this foundational idea, we will begin with a classic, intuitive example: a small, wheeled robot navigating a 2D maze.

![Robot in 2D Maze]({{ '/assets/images/sampling_based_planning/maze.png' | relative_url }})

The robot's goal is simple: travel from a starting point (blue) to an end point (green). It has no "bird's-eye view" and can only sense its immediate surroundings. How can we give this robot the ability to find its way? We must first teach it how to think about the maze.



#### From a Physical Maze to an Abstract Graph

The robot's world of "floors" and "walls" is too literal. We can create a more powerful mental model by simplifying the maze into its two core components: the locations of interest where the robot can actually be, and the possible moves or direct paths between adjacent locations. By focusing on these ideas, we can transform the physical maze into an abstract map of connections. Each open square becomes a point, and each possible move becomes a line connecting the corresponding points. What we have just created is a graph.

<div class="definition">
<strong>Definition.</strong> A graph is a mathematical structure used to represent relationships between objects.  
Formally, a graph is an ordered pair:

\[
G = (V, E)
\]

where: <br>
- $V$ is a non-empty set of vertices (or nodes), and  
<br>
- $E$ is a set of edges.
<br>
An edge $ e \in E $ is typically represented as a pair of vertices:

\[
e = (u, v), \quad \text{where } u, v \in V.
\]

If edges are unordered pairs $\{u,v\}$, the graph is undirected.  
<br>
If edges are ordered pairs $(u,v)$, the graph is directed.
</div>


This abstraction is visualized below, showing how a continuous physical space is transformed into a discrete network of nodes and connections:

![Building a Graph]({{ '/assets/images/sampling_based_planning/build_graph.gif' | relative_url }})

This is a monumental leap. The robot's problem is no longer about navigating a physical space; it's about finding a path within this abstract network. This representation is the common language for nearly all planning algorithms that follow.

### 3.1.4.2: History of Sampling Motion Planning[<a href="#ref1">1</a>]

With our graph representation in hand, we can now explore the history of motion planning, using our maze to understand how different strategies evolved.

#### The Early Days: Exhaustive Search and the Complexity Wall

Early attempts at motion planning in the 1980s tried to be mathematically perfect. They involved precisely defining the robot's shape and all obstacles, a concept known as Configuration Space [<a href="#ref2">2</a>]. While powerful, these "complete" algorithms tried to solve the problem for every possible path. For our maze, this would be like listing every single possible sequence of moves. It was quickly proven that for complex robots, this problem is NP-hard [<a href="#ref3">3</a>]. In simple terms, this means that as the problem gets bigger, the time required to find a perfect solution explodes exponentially. Our simple maze is solvable, but a slightly larger maze or a robot with more joints would be computationally impossible to solve this way. The quest for mathematical perfection had hit a wall.

#### A Reactive Detour: Artificial Potential Fields

One clever idea was to stop planning and start reacting. The Artificial Potential Fields method[<a href="#ref4">4</a>], popular in the late 1980s, treated the robot like a marble rolling on a contoured surface. The goal would be a low point, pulling the robot towards it, while obstacles (walls) would be high points, pushing the robot away. 

<div class="note" markdown="1">
<strong>Note.</strong>
This approach is not purely sampling-based but rather a continuous one, as it relies on smooth potential functions to define motion. In practice, these continuous formulations become discretized once paths are numerically integrated, but their underlying principles remain continuous and dynamic. Such representations are generally more expressive, as they directly describe how motion evolves under forces instead of connecting isolated samples. Potential fields therefore mark the beginning of dynamical-systems–based methods, explored further in [Dynamical-Systems-Based Planning](DS-planning).

</div>
<div class="definition">
<strong>Definition[<a href="#ref5">5</a>].</strong> Formally, the total potential function $ U(q) $ is defined as:

\[
U(q) = U_{\text{att}}(q) + U_{\text{rep}}(q)
\]

where: <br>

- $ q \in \mathbb{R}^n $ is the configuration of the robot.  <br>
- $ U_{\text{att}}(q) $ is the attractive potential guiding the robot toward the goal.  <br>
- $ U_{\text{rep}}(q) $ is the repulsive potential preventing collisions with obstacles. <br>
<br>
A common formulation is:

\[
U_{\text{att}}(q) = \tfrac{1}{2} \, \zeta \, \| q - q_{\text{goal}} \|^2
\]

\[
U_{\text{rep}}(q) =
\begin{cases}
\tfrac{1}{2} \, \eta \, \left( \dfrac{1}{d(q)} - \dfrac{1}{d_0} \right)^2, & \text{if } d(q) \le d_0 \\
0, & \text{if } d(q) > d_0
\end{cases}
\]

where: <br>
- $ \zeta $ — attractive gain,  <br>
- $ \eta $ — repulsive gain,  <br>
- $ d(q) $ — distance from $ q $ to the nearest obstacle,  <br>
- $ d_0 $ — radius of influence of the obstacle. <br>

The force acting on the robot is the negative gradient of the potential:

\[
F(q) = - \nabla U(q)
\]

so the robot moves in the direction of steepest descent of the potential field.
</div>

The resulting movement, which behaves like a ball rolling down a contoured surface, is illustrated in the animation below:
![Potential Fields]({{ '/assets/images/sampling_based_planning/potential.gif' | relative_url }})

This worked well for simple, open environments. However, in a maze, the robot could easily get stuck in a dead-end (a "local minimum") without ever reaching the goal. It was a step forward in creating dynamic motion, but it wasn't a reliable planner.


#### The Breakthrough: Searching the Graph

Before adopting a complex strategy, one might consider a simple heuristic. For our maze, a possible solution could be the "wall-follower" rule: always keep a wall to your left (or right). This can solve simple mazes, but it's not a general solution. It can fail in mazes with islands or complex layouts, and it provides no guarantees about finding the shortest or most efficient path. What was needed was a systematic, robust method.

The most successful solution returned to our graph representation. If the maze is a graph, then planning is simply a matter of finding the best path through that graph. This led to the utilization of graph search algorithms, which remain a cornerstone of robotics today.

#### Dijkstra's Algorithm: The Cost-Conscious Explorer

Let's make our maze more interesting. Imagine some floor tiles are sand, taking more energy to cross. We can represent this by making our graph weighted—an edge over pavement might have a weight of 1, while an edge over sand has a weight of 5. Now, we don't just want any path; we want the cheapest path. Dijkstra's Algorithm is the classic and definitive solution for this. It operates by starting at starting point and exploring outwards like a ripple in a pond. Crucially, it always expands from the vertex that has the lowest total cost discovered so far. It meticulously builds a map of the cheapest way to get to every reachable vertex from the start and doesn't stop until it has found the cheapest path to the goal. The result is a guaranteed optimal path in terms of total weight. Its weakness is that it's "uninformed" - it explores in all directions equally, because it has no sense of direction. 

Its complexity is described as `O(E + V log V)`, meaning its runtime depends on the number of edges `E` and vertices `V` in the graph. For a grid, this is very efficient. But as we'll see, for more complex problems, creating the graph itself is the real challenge.
The process of Dijkstra's algorithm meticulously expanding outward from the start node is demonstrated in the visualization below:
![Dijkstra's shortest path]({{ '/assets/images/sampling_based_planning/dijkstra.gif' | relative_url }})

(For a formal treatment of other graph properties and search algorithms, please refer to the upcoming chapter on [Graph Theory in the Advanced Mathematical Foundations section](../advanced_math/graph-theory))

#### Final step: The Limits of Grids and the Curse of Dimensionality

The grid-based approach with Dijkstra’s algorithm feels powerful, a method that guarantees the best possible path on the grid we’ve defined. But what happens when the problem gets more complicated? The simple truth is that this exhaustive approach fails due to the The Curse of Dimensionality.

Let's move from our simple 2D robot to a more realistic one, like a robotic arm used in manufacturing. A common arm might have 7 joints (7-DOF). To define the robot's complete pose, we need to know the angle of every single one of those 7 joints. This 7-dimensional space of all possible joint angles is the robot's Configuration Space (C-space). 

<div class="definition">
<strong>Definition[<a href="#ref2">2</a>].</strong> The <em>configuration space</em> (often abbreviated as <strong>C-space</strong>) is a mathematical space that represents all possible positions and orientations of a robot.  
Formally, each point in the configuration space corresponds to one unique configuration of the robot in the workspace.

\[
\mathcal{C} = \{ q \mid q \text{ describes the complete state (position, orientation, etc.) of the robot} \}
\]

We can partition the configuration space into two subsets:  
<br>
- Free space$ \mathcal{C}_{\text{free}} $: all configurations where the robot does <em>not</em> intersect any obstacle.  
<br>
- Obstacle space $ \mathcal{C}_{\text{obs}} $: all configurations that result in a collision with an obstacle.

\[
\mathcal{C} = \mathcal{C}_{\text{free}} \cup \mathcal{C}_{\text{obs}}, 
\quad \mathcal{C}_{\text{free}} \cap \mathcal{C}_{\text{obs}} = \emptyset
\]

Motion planning in configuration space then becomes the problem of finding a continuous path in  
$ \mathcal{C}_{\text{free}} $ that connects the start and goal configurations.
</div>


Now, imagine trying to create a grid for this C-space. To keep it simple, let's say we only divide each joint's range of motion into 10 discrete steps. For one joint, that's 10 grid cells. For two joints, it's $10x10 = 100$ cells. For our 7-DOF arm, it becomes $10^7 = 10 000 000$ cells. If we wanted a more reasonable resolution, say 100 steps per joint, we would need $100^7 = 10^{14}$ cells. No modern computer has enough memory to store such a grid, let alone run Dijkstra's on it.

This problem isn't unique to robot arms. Imagine a self-driving car navigating a city. If the map is very large and the resolution is high (e.g., centimeter-level precision to avoid small obstacles), the number of grid cells again becomes astronomically large. This exponential explosion in the number of states as we add more dimensions (or higher resolution) is the Curse of Dimensionality. It makes grid-based methods computationally impossible for almost all real-world robotics problems. We need a fundamentally different way to think about the problem.


<div class="assignment" markdown="1">

##### Exercise: Growth in Planning Complexity

##### 1) Grid Search Scaling
Consider a robot moving on a 2D, 4-connected grid. Compute how the number of cells and connections grows when going from a **10×10** grid to a **100×100** grid. Discuss how this affects the computational cost of Dijkstra’s algorithm.

<details markdown="1">
<summary><strong>Hints</strong></summary> 
- Vertices (cells): $V = N^2$.  
- 4-connected edges: <br>
  horizontal $= N(N-1)$, vertical $= N(N-1)$ → $E = 2N(N-1)$.  
- Dijkstra with binary heap: $\mathcal{O}(E + V \log V)$.

</details>

<details markdown="1">
<summary><strong>Solution</strong></summary>

**Counts**

- For $N=10$: <br>
  <tab> $V_{10} = 10^2 = 100$, <br> 
  <tab> $E_{10} = 2\cdot10\cdot9 = 180$. <br>

- For $N=100$: <br>
  $V_{100} = 100^2 = 10{,}000$, <br> 
  $E_{100} = 2\cdot100\cdot99 = 19{,}800$. <br>

**Work Estimate** (binary-heap Dijkstra)

$$
T(N)\approx E + V\log V.
$$

- $N=10$: <br>
  $T_{10} \approx 180 + 100\log 100 \approx 180 + 100\cdot 4.605 \approx 640.5.$  
- $N=100$: <br> 
  $T_{100} \approx 19{,}800 + 10{,}000\log 10{,}000 \approx 19{,}800 + 10{,}000\cdot 9.210 \approx 111{,}900.$

**Ratio**  
$$
\frac{T_{100}}{T_{10}} \approx \frac{112{,}900}{640.5} \approx 175\times.
$$

So increasing grid size by $10\times$ per side (i.e., $100\times$ cells) increases the approximate Dijkstra work by ~$175\times$, due to the $V\log V$ term.
</details>

---

###### 2) 2-DoF Arm (2D Planar)
A planar 2-DoF arm has two links of $0.5\,\mathrm{m}$ each (total reach $L=1\,\mathrm{m}$).  
You require the end-effector position tolerance of $1\,\mathrm{cm}$. Assume the arm is in a fully extended configuration and small joint changes move the tip by $L\,\Delta\theta$.


1. Choose a uniform joint step $\Delta\theta$ (radians) so that a small joint change moves the end-effector no more than $1\,\mathrm{cm}$. Use a coarse bound: end-effector shift $\approx L\,\Delta\theta$.  
2. Compute steps per joint over $[0,2\pi)$.  
3. Compute the number of joint states (2 DoF).  
4. If each joint action is $\{-\Delta\theta,0,+\Delta\theta\}$, compute actions per state.

<details markdown="1">
<summary><strong>Solution</strong></summary>

1) Tolerance bound: $L\,\Delta\theta \le 0.01\,\mathrm{m}$ with $L=1\,\mathrm{m}$ → $\Delta\theta \le 0.01\,\mathrm{rad}$ (≈ $0.57^\circ$).   <br>

2) Steps per joint: $\frac{2\pi}{0.01} \approx 628$.   <br>

3) States (independent discretization): $628^2 \approx 3.94\times 10^5$.  <br>

4) Actions per state: $3^2 = 9$.<br>

*Note:* This uses a simplified model. In reality, the end-effector motion for a given $\Delta\theta$ depends on the arm’s configuration (via the Jacobian). The fully-extended pose provides a reasonable order-of-magnitude estimate.

</details>

---

###### 3) 4-DoF Arm Extension
Extend the 2-DoF results to a 4-DoF planar arm using the same $\Delta\theta=0.01\,\mathrm{rad}$.

1. Steps per joint?  
2. Number of joint states?  
3. Actions per state with $\{-\Delta\theta,0,+\Delta\theta\}$ for each joint?  
4. Comment on scalability.

<details markdown="1">
<summary><strong>Solution</strong></summary>

1) Steps per joint: ~$628$ (same $\Delta\theta$). <br> 

2) States: $628^4 \approx 1.55\times 10^{11}$.  <br>

3) Actions per state: $3^4 = 81$.  <br>

4) Scalability: State/action spaces grow exponentially with DoF under tight Cartesian tolerances, making exhaustive search intractable and motivating sampling-based and/or continuous dynamical-systems approaches.
</details>

</div>

<!-- Illustration: Show a diagram comparing a 2D grid (10x10=100 cells) next to a 3D grid (10x10x10=1,000 cells) to visually demonstrate the exponential growth. Follow this with a picture of a complex, multi-jointed robot arm like the Franka Emika.

Question for Students: "If a robot arm has 6 joints, and we want to represent each joint's position with 360 discrete steps (one for each degree), how many total cells would our grid have? Why is this a problem for a computer?" -->

### 3.1.4.3: Sampling-Based Methods

Since we can't possibly map out the entire C-space, what if we don't even try? This is the fundamental shift in thinking that leads to Sampling-Based Motion Planning (SBMP). Instead of exhaustively checking every possible location, we can simply generate random configurations in the C-space and check if they are valid (i.e., not in collision).

The core intuition is that if we take enough random samples, we can build a sparse but effective map that captures the essential connectivity of the free space. We don't need to know about every single point; we just need to know enough to find a way from start to goal. This approach trades the guarantee of finding the absolute best path for the ability to find a feasible path, quickly, in incredibly complex, high-dimensional spaces. Early on, these planners proved their power by solving highly constrained problems that were previously intractable, such as the famous "alpha puzzle":

<video width="600" autoplay loop muted playsinline controls>
  <source src="{{ '/assets/videos/sampling_planning/alpha_puzzle.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

This approach is built upon two simple but powerful components, which we will now explore in detail.

---

#### The Sampling Function: The Engine of Exploration[<a href="#ref1">1</a>], [<a href="#ref6">6</a>] 

A sampling function is responsible for generating an infinite sequence of configurations:

$$
S = \{ q_1, q_2, q_3, \dots \}
$$

from the configuration space $\mathcal{C}$.

For a planner to offer theoretical guarantees, this sequence must be dense in $\mathcal{C}$, meaning that for any point in the space, there exists a sampled point arbitrarily close to it.

<div class="definition" markdown="1">
<strong>Definition.</strong>  
A sequence of samples $S$ is dense in $\mathcal{C}$ if for every configuration $q \in \mathcal{C}$ and for every $\varepsilon > 0$, there exists a sample $q_i \in S$ such that:

$$
d(q, q_i) < \varepsilon
$$

where $d(\cdot,\cdot)$ is a valid metric in the configuration space.
</div>

---

##### Distance Metrics: Workspace vs Configuration Space

![Metrics in Configuration space](https://www.youtube.com/watch?v=B8I43AEerUU&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=46)
><sub>*How close are 2 configurations of a robot?. YouTube video, Jan 23, 2018. Available at: https://www.youtube.com/watch?v=B8I43AEerUU&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=46*</sub>

<div class="note">
    Shows how different norms (1, 2, 3, ∞) shape “balls” in both workspace (x–y) and configuration space (θ₁–θ₂), and why measuring distance in <em>configuration space</em> is the right choice for planners like PRM and RRT. The demo illustrates that workspace distances can be misleading (parts of the plane are unreachable), while C-space norms respect joint limits and kinematic mapping. This directly affects <em>k</em>-NN and radius connections in PRM and the nearest-node step in RRT, influencing roadmap density, neighbor sets, and ultimately path quality.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Source: Aaron Becker - YouTube  
        <a href="https://www.youtube.com/watch?v=B8I43AEerUU&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=46" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

---

The most straightforward method is *unbiased (uniform) sampling*, which draws configurations from the C-space such that each has an equal probability of being chosen.  

<div class="example" markdown="1">
<strong>Example.</strong>  
For a 7-DOF arm where each joint angle lies in $[0, 2\pi]$, this means generating 7 random numbers from a uniform distribution.
</div>

While simple, uniform sampling can be inefficient, in environments with many obstacles or narrow passages, most random samples will fall inside obstacles, wasting computational effort.



<!-- ![Uniform sampling in 2D maze]({{ '/assets/images/sampling_based_planning/uniform.png' | relative_url }}) -->

<figure style="text-align:center;">
  <img src="{{ '/assets/images/sampling_based_planning/narrow_passage.png' | relative_url }}" 
       alt="Narrow passage in a 2D maze" 
       width="55%">
  <figcaption style="text-align:center; margin-top:6px; color:#555; font-size:0.9em;">
    <strong>Figure.</strong> Narrow passage in a 2D maze.
  </figcaption>
</figure>


<div class="assignment" markdown="1">

##### Exercise: Narrow Passage Probability and Sample Budget

A narrow passage occupies area fraction $a$ of $\mathcal{C}_{\text{free}}\subset[0,1]^2$.  
With uniform sampling, derive the probability of hitting the passage at least once with $n$ i.i.d. samples.  
Then compute the minimum $n$ needed for 95% success when $a=0.01$ and $a=0.001$.

<details markdown="1"><summary>Solution</summary>

If one sample lands in the passage with probability $a$, missing it has probability $(1-a)$.  
For $n$ i.i.d. samples, the miss probability is $(1-a)^n$.  
Thus the hit probability is
$$
P_{\text{hit}}(n) = 1 - (1-a)^n.
$$
For $P_{\text{hit}}\ge 0.95$: $(1-a)^n \le 0.05 \Rightarrow n \ge \frac{\ln 0.05}{\ln(1-a)}$.

- $a=0.01$: $n \ge \frac{\ln 0.05}{\ln 0.99} \approx \frac{-2.9957}{-0.01005} \approx 298$.  
- $a=0.001$: $n \ge \frac{\ln 0.05}{\ln 0.999} \approx \frac{-2.9957}{-0.0010005} \approx 2994$.

Takeaway: Sample budgets scale roughly like $1/a$ for fixed success probability.
</details>

</div>


<div class="note" markdown="1">

**Uniform (Unbiased) Sampling**

In uniform sampling, every configuration in the free configuration space  
has the same probability of being selected. Formally, the probability density  
function $p(q)$ over $\mathcal{C}_{\mathrm{free}}$ is constant:

$$
p(q) = \frac{1}{\mu(\mathcal{C}_{\mathrm{free}})} \text{ when } q \text{ is in the free space, and } p(q) = 0 \text{ otherwise.}
$$

where $\mu(\mathcal{C}_{\mathrm{free}})$ denotes the measure (volume) of the free space.  
Uniform sampling is simple and unbiased, but can be inefficient in cluttered or high-dimensional environments.

</div>




To improve efficiency, *biased sampling* strategies were developed to focus on regions more likely to be useful. One such strategy is *obstacle-based sampling*, which increases the probability of sampling near obstacle boundaries. The intuition is that the most difficult parts of a path are often found when navigating around obstacles, so focusing effort there can speed up finding a solution in cluttered spaces or through narrow gaps.

<figure style="text-align:center;">
  <img src="{{ '/assets/images/sampling_based_planning/obstacle_based.png' | relative_url }}" 
       alt="Obstacle-based sampling showing higher density near walls and narrow passage"
       width="50%">
  <figcaption><strong>Figure.</strong> Obstacle-based sampling — biased toward regions near obstacles and narrow passages.</figcaption>
</figure>

<div class="note" markdown="1">
<strong>Obstacle-Based Sampling</strong>

Obstacle-based methods bias samples toward regions near obstacles to better  
explore narrow passages. One approach defines the sampling density as inversely  
proportional to the distance to the nearest obstacle $d(q)$:

$$
p(q) \propto \frac{1}{d(q) + \varepsilon},
$$

where $d(q) = \min_{q_o \in \mathcal{C}_{\mathrm{obs}}} \| q - q_o \|$ 
and $\varepsilon > 0$ prevents singularities.  
This concentrates samples around the boundaries of obstacles where planning is most difficult.

</div>


Another approach is *clearance-based sampling*, which prioritizes samples that are far away from obstacles. This leads to safer, smoother paths that are easier for a real robot to execute. This can be achieved by first taking a uniform sample and then performing a short random walk away from the nearest obstacle to improve its clearance. 

<figure style="text-align:center;">
  <img src="{{ '/assets/images/sampling_based_planning/clearance_based.png' | relative_url }}" 
       alt="Clearance-based sampling showing higher density further away from the obstacles"
       width="50%">
  <figcaption><strong>Figure.</strong> Obstacle-based sampling — biased toward regions near obstacles and narrow passages.</figcaption>
</figure>

<div class="note" markdown="1">

**Clearance-Based Sampling**

Clearance-based methods prefer configurations that are far from obstacles,  
favoring safe and smooth trajectories. The sampling density is proportional  
to the clearance $d(q)$ from obstacles:

$$
p(q) \propto d(q)^{\alpha}, \qquad \alpha > 0,
$$

where $d(q) = \min_{q_o \in \mathcal{C}_{\mathrm{obs}}} \| q - q_o \|$.  
A larger exponent $\alpha$ increases the bias toward open, obstacle-free regions.

</div>


Finally, *deterministic sampling* uses low-dispersion sequences (like Halton or Sukharev grid sequences) instead of pseudo-random numbers. These sequences are designed to cover the space more evenly than random sampling, reducing large gaps and improving the reliability and predictability of the planner.

<figure style="text-align:center;">
  <img src="{{ '/assets/images/sampling_based_planning/random_vs_halton.png' | relative_url }}" 
       alt="Pseudo-random uniformly generated sequence vs Halton sequence"
       width="100%">
  <figcaption><strong>Figure.</strong> Pseudo-random uniformly generated sequence vs Halton sequence.</figcaption>
</figure>
<div class="note" markdown="1">

**Halton (Low-Dispersion) Sampling**

The Halton sequence generates deterministic, low-discrepancy samples that  
cover the space more uniformly than random sampling.  
For dimension $j$ with prime base $b_j$, the $i$-th component is:

$$
x_{i,j} = \sum_{k=0}^{\infty} a_k \, b_j^{-(k+1)},
$$

where $i = a_0 + a_1 b_j + a_2 b_j^2 + \dots$ is the base-$b_j$ expansion of $i$.  
The resulting sequence $q_i = (x_{i,1}, x_{i,2}, \dots, x_{i,n})$  
has low dispersion $O(1/N)$ and fills the space evenly without randomness.

</div>

<!-- <div class="example">
<strong>Example.</strong>  
A side-by-side comparison of 200 points generated by a pseudo-random generator versus a Halton sequence shows that the Halton sequence yields a much more uniform distribution across the space.
</div> -->

---

#### The Local Planner: The Reality Check

A local planner determines whether a simple path between two nearby configurations $q_1$ and $q_2$ is collision-free.

The most common approach is the Straight-Line Planner, which parameterizes the path as:

$$
\tau(s) = (1 - s)\, q_1 + s\, q_2, \quad s \in [0, 1]
$$

The local planner discretizes this path into intermediate configurations and checks each for collisions.  
If all intermediate steps are collision-free, the connection is accepted as valid.

For robots with differential constraints (e.g., cars or drones), a more advanced Steering Function is required, one that computes control inputs to move the robot from $q_1$ to $q_2$ while respecting its dynamics.

---


<p>
By combining these two functions, one to propose potential locations and one to verify connections between them, these algorithms gain a powerful property known as
<strong>Probabilistic Completeness</strong>.<br>

<div class="definition">
<strong>Definition[<a href="#ref7">7</a>].</strong>
A randomized motion–planning algorithm is <em>probabilistically complete</em> if, whenever a valid path exists, the probability that the algorithm finds a solution approaches 1 as the number of samples (or iterations) goes to infinity. Formally, if a path exists in $ \mathcal{C}_{\text{free}} $,
\[
\lim_{n \to \infty} \Pr[\text{planner finds a path after } n \text{ samples}] = 1.
\]
If no valid path exists, a probabilistically complete algorithm is not guaranteed to terminate with a definitive “no solution.” 

</div>

We are no longer guaranteed to find the <em>optimal</em> path, but we are guaranteed that we will eventually find <em>a</em> path.
</p>

---

#### (Optional) Extending the Local Planner: Kinodynamic Planning

The straight-line local planner works well for purely geometric planning problems, where the robot can move freely in any direction. However, most real-world robots, cars, drones, manipulators, or legged robots, cannot do this. They have kinodynamic constraints, meaning their motion depends not only on position but also on velocity, acceleration, and actuator limits.

---

##### 1. What Are Kinodynamic Constraints?

In real systems, motion is governed by the robot’s equations of motion, often written as:

$$
\dot{x} = f(x, u)
$$

where:

- $x$ is the state vector (e.g., position, velocity, orientation)
- $u$ is the control input (e.g., motor torque, thrust, or steering angle)

The goal of kinodynamic planning is to find a feasible trajectory $x(t)$ and a sequence of control inputs $u(t)$ that move the robot from $x_{\text{start}}$ to $x_{\text{goal}}$ while avoiding obstacles and satisfying physical limits.

<div class="definition" markdown="1">
<strong>Definition. </strong> Kinodynamic Planning means finding a path that satisfies both kinematic and dynamic constraints, i.e., that lies within the robot’s configuration space $ \mathcal{C}_{\text{free}} $ and also respects its dynamic model $ \dot{x} = f(x, u) $.
</div>

---

##### 2. From Straight Lines to Dynamic Feasibility

The simple local planner assumes the robot can follow a straight line between any two nearby configurations. For a robot with dynamics, this is no longer true — the system may **not be able to stop, turn, or move sideways**. Instead, the planner must connect states using feasible motions that respect the robot’s dynamic model.

There are two general approaches to doing this:

---

###### Method 1: Analytical Steering Function (Two-Point BVP)

A steering function computes a control law that moves the robot exactly from one state to another by solving a two-point boundary value problem (BVP).

How it works:

1. Given two states $x_1$ and $x_2$, solve for a control input $u(t)$ such that integrating $\dot{x} = f(x, u)$ moves $x_1 \rightarrow x_2$.
2. The resulting trajectory is guaranteed to be dynamically feasible.

**Examples:**
- The Dubins Car (forward-only, minimum turning radius)
- The Reeds–Shepp Car (can drive forward and backward)

**Pros:**  
Produces optimal, physically valid connections.

**Cons:**  
Analytical steering functions exist only for a few simple systems.  
For most robots, the BVP is extremely difficult to solve.

---

###### Method 2: Forward Simulation (Sampling in Control Space)

Instead of trying to solve a complex boundary-value problem, this approach samples control inputs and simulates the system forward in time, a much more general technique.

**How it works:**

1. Choose a state $x_{\text{near}}$ already in the tree.  
2. Sample a random control $u_{\text{rand}} \in U$ (e.g., random steering or thrust command).  
3. Simulate the dynamics forward for a short time $\Delta t$:  

   $$
   x_{\text{new}} = \text{Simulate}(x_{\text{near}}, u_{\text{rand}}, \Delta t)
   $$
4. If the simulated motion stays collision-free, accept the new state and continue.

This “forward-propagation” idea enables planners to handle nonholonomic and dynamic systems  
without needing a closed-form steering law.

---

##### 3. Why It Matters

Adding kinodynamic feasibility fundamentally changes the planning problem:

- State space dimension increases (position + velocity + other dynamics)
- Local connections become directional and irreversible
- Paths are trajectories in time, not just curves in space

These challenges make the local planner the core difficulty in motion planning for dynamic robots. Later chapters will show how global planners such as PRM and RRT extend these ideas  
to build complete kinodynamic planning algorithms.


---


<script src="https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/theme/monokai.css">
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/python/python.js"></script>

<style>
.exercise-card {border:1px solid #e5e7eb;border-radius:10px;padding:14px;background:#fff;}
.CodeMirror {height:260px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;}
.toolbar{display:flex;gap:12px;align-items:center;margin:10px 0 6px;}
.btn{padding:6px 12px;border:1px solid #111827;border-radius:6px;background:#111827;color:#fff;cursor:pointer;}
.btn:disabled{opacity:.6;cursor:not-allowed;}
.outbox{border:1px dashed #cbd5e1;border-radius:10px;padding:10px;}
.outbox img{max-width:100%;display:block;}
.muted{color:#6b7280;font-size:.9em;}
</style>

{% raw %}
<!-- ================== Load Pyodide & CodeMirror ================== -->
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/theme/monokai.css">
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/python/python.js"></script>

<style>
.exercise-card {border:1px solid #e5e7eb;border-radius:10px;padding:14px;background:#fff;}
.CodeMirror {height:260px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;}
.toolbar{display:flex;gap:12px;align-items:center;margin:10px 0 6px;}
.btn{padding:6px 12px;border:1px solid #111827;border-radius:6px;background:#111827;color:#fff;cursor:pointer;}
.btn:disabled{opacity:.6;cursor:not-allowed;}
.outbox{border:1px dashed #cbd5e1;border-radius:10px;padding:10px;}
.outbox img{max-width:100%;display:block;}
.muted{color:#6b7280;font-size:.9em;}
#solution-box{display:none;margin-top:8px;border-left:3px solid #22c55e;background:#f0fdf4;padding:10px;border-radius:6px;}
</style>


#### Coding Exercise 1: Sampling Free Configurations

In this exercise, you will implement a sampling function for a 2D maze:

```python
def sampling(grid, num_samples, size_of_grid)
```

The function should return a list of `num_samples` valid positions `(x, y)` inside the maze.  
Each returned point must correspond to a location the robot can occupy without colliding with obstacles.

After you implement the function, click **Run ▶** below to visualize your sampled points on the maze.

<details>
<summary><strong>💡 Hints</strong></summary>

  <ul>
    <li>
      You can sample either from <em>cell centers</em> (e.g., <code>(i+0.5, j+0.5)</code> for integer cell indices <code>i, j</code>)
      or from <em>continuous coordinates</em> within the bounds <code>0 ≤ x &lt; W</code>, <code>0 ≤ y &lt; H</code>, as long as the sample lies in free space.
    </li>
    <li>
      Ensure that sampled points are not inside a wall cell (where <code>grid[y, x] == 1</code>) and, if required, respect a clearance from walls (e.g., a minimum distance ≥ robot radius).
    </li>
  </ul>
</details>


<div class="exercise-card">
  <textarea id="code">def sampling(grid, num_samples, size_of_grid, robot_radius=0.25):&#10;&#9;"""&#10;&#9;Sample 'num_samples' continuous (x,y) in free space with clearance.&#10;&#9;A point is accepted iff its distance to the nearest wall cell&#10;&#9;(axis-aligned unit square) is >= robot_radius.&#10;&#9;&#10;&#9;grid: 2D np.ndarray, 1=wall, 0=free&#10;&#9;size_of_grid: (W, H) in grid units (cells)&#10;&#9;"""&#10;&#9;import numpy as np&#10;&#9;import math&#10;&#10;&#9;H, W = grid.shape&#10;&#9;assert (W, H) == size_of_grid, "size_of_grid must match grid"&#10;&#10;&#9;samples = []&#10;&#9;attempts = 0&#10;&#9;max_attempts = max(1000, num_samples * 100)&#10;&#10;&#9;while len(samples) < num_samples and attempts < max_attempts:&#10;&#9;&#9;attempts += 1&#10;&#9;&#9;# 1. Randomly sample a continuous (x, y) within the maze bounds&#10;&#9;&#9;# 2. Check if it lands inside a free cell (grid[r, c] == 0)&#10;&#9;&#9;# 3. Compute its minimum distance to the nearest wall cell&#10;&#9;&#9;# 4. Keep it only if that distance >= robot_radius&#10;&#9;&#9;# (Hint: distance to a wall cell [xx, xx+1]x[yy, yy+1] can be computed manually)&#10;&#10;&#9;return samples&#10;</textarea>

  <div class="toolbar">
    <label>Samples:
      <input id="num-samples" type="number" min="1" max="2000" value="50">
    </label>
    <button id="run" class="btn">Run ▶</button>
    <button id="show-solution" class="btn" style="background:#065f46;">Show Solution 💡</button>
    <span id="status" class="muted"></span>
  </div>

  <div id="solution-box">
    <b>✅ Solution:</b>
    <pre style="white-space: pre-wrap; font-size:13px; background:#fff; padding:8px; border-radius:5px; border:1px solid #ddd;">
def sampling(grid, num_samples, size_of_grid, robot_radius=0.25):
    import numpy as np, math
    H, W = grid.shape
    samples = []
    attempts = 0
    max_attempts = max(1000, num_samples * 100)
    while len(samples) < num_samples and attempts < max_attempts:
        attempts += 1
        x, y = np.random.uniform(0, W), np.random.uniform(0, H)
        c, r = int(x), int(y)
        if grid[r, c] == 1:
            continue
        pad = int(math.ceil(robot_radius)) + 1
        dmin = float("inf")
        for yy in range(max(0, r - pad), min(H - 1, r + pad) + 1):
            for xx in range(max(0, c - pad), min(W - 1, c + pad) + 1):
                if grid[yy, xx] == 1:
                    dx = max(xx - x, 0, x - (xx + 1))
                    dy = max(yy - y, 0, y - (yy + 1))
                    d = math.hypot(dx, dy)
                    if d < dmin:
                        dmin = d
        if dmin >= robot_radius:
            samples.append((x, y))
    return samples
    </pre>
  </div>

  <div class="outbox">
    <div class="muted">Output:</div>
    <img id="plot" alt="Maze will appear here">
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python", theme: "monokai", lineNumbers: true, indentUnit: 4, tabSize: 4, lineWrapping: true
  });

  const pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/" });
  await pyodide.loadPackage(["numpy", "matplotlib"]);

  const runBtn = document.getElementById("run");
  const showBtn = document.getElementById("show-solution");
  const solutionBox = document.getElementById("solution-box");
  const img = document.getElementById("plot");
  const status = document.getElementById("status");

  showBtn.addEventListener("click", () => {
    const visible = solutionBox.style.display === "block";
    solutionBox.style.display = visible ? "none" : "block";
    showBtn.textContent = visible ? "Show Solution 💡" : "Hide Solution ✖️";
  });

  runBtn.addEventListener("click", async () => {
    runBtn.disabled = true; status.textContent = "Running…";
    const numSamples = parseInt(document.getElementById("num-samples").value);
    const codeUser = editor.getValue();
    const boilerplate = `import numpy as np, matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\nfrom matplotlib.patches import Rectangle, Circle\nfrom io import BytesIO\nimport base64\nCELL_W, CELL_H = 6, 5\nCELL_PX=64\nGRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1\nSTART, GOAL = (1,1), (GRID_W-2, GRID_H-2)\nrng = np.random.default_rng(1)\ndef to_grid_xy(x,y): return 2*x+1, 2*y+1\ndef generate_maze(cw,ch,braid_prob=0.15):\n\t W,H=2*cw+1,2*ch+1\n\t g=np.ones((H,W),dtype=np.uint8)\n\t def nbs(x,y):\n\t \t for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:\n\t \t \t nx,ny=x+dx,y+dy\n\t \t \t if 0<=nx<cw and 0<=ny<ch: yield nx,ny\n\t vis=[[False]*ch for _ in range(cw)]\n\t sx,sy=rng.integers(0,cw),rng.integers(0,ch)\n\t st=[(sx,sy)]; vis[sx][sy]=True\n\t gx,gy=to_grid_xy(sx,sy); g[gy,gx]=0\n\t while st:\n\t\t x,y=st[-1]\n\t\t unv=[(nx,ny) for (nx,ny) in nbs(x,y) if not vis[nx][ny]]\n\t\t if unv:\n\t\t\t nx,ny=unv[rng.integers(0,len(unv))]\n\t\t\t g[2*y+1+(ny-y),2*x+1+(nx-x)]=0\n\t\t\t g[2*ny+1,2*nx+1]=0\n\t\t\t vis[nx][ny]=True; st.append((nx,ny))\n\t\t else:\n \t\t \t st.pop()\n\t g[START[1],START[0]]=0; g[GOAL[1],GOAL[0]]=0\n\t return g\ndef render(grid,samples):\n\t H,W=grid.shape;scale=CELL_PX/110.;fig,ax=plt.subplots(figsize=(W*scale,H*scale))\n\t ax.set_aspect('equal'); ax.set_xlim(0,W); ax.set_ylim(H,0)\n\t ax.axis('off')\n\t for y in range(H):\n\t\t for x in range(W):\n\t\t\t if grid[y,x]==1:\n\t\t\t\t ax.add_patch(Rectangle((x,y),1,1,fc='black'))\n\t sx,sy=START[0]+.5,START[1]+.5;\n\t gx,gy=GOAL[0]+.5,GOAL[1]+.5\n\t ax.add_patch(Circle((sx,sy),0.25,fc='#13adfa',ec='k'))\n\t ax.add_patch(Circle((gx,gy),0.25,fc='#0feb55',ec='k'))\n\t if samples:\n\t\t xs,ys=zip(*samples)\n\t\t ax.scatter(xs,ys,s=30,c='#ff4081',ec='white',lw=0.5)\n\t buf=BytesIO();\n\t plt.savefig(buf,format='png',bbox_inches='tight',dpi=150)\n\t plt.close(fig)\n\t return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()\ngrid=generate_maze(CELL_W,CELL_H)\nSIZE_OF_GRID=(GRID_W,GRID_H)\n${codeUser}\nsamples=sampling(grid,${numSamples},SIZE_OF_GRID)\nimg_url=render(grid,samples)\nimg_url\n
    ` .trimStart();
    try {
      const result = await pyodide.runPythonAsync(boilerplate);
      img.src = result;
      status.textContent = "✅ Success";
    } catch (err) {
      console.error(err);
      status.textContent = "⚠️ " + err;
    } finally {
      runBtn.disabled = false;
    }
  });
});
</script>
{% endraw %}

<!-- Exercise to add edges between previously sampled nodes -->
<!-- ================== Coding Exercise 2: Collision-Checking Graph Building ================== -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/theme/monokai.css">
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/python/python.js"></script>

<style>
.exercise-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px;
  background: #fff;
}
.CodeMirror {
  height: 260px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}
.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  margin: 10px 0 6px;
  flex-wrap: wrap;
}
.btn {
  padding: 6px 12px;
  border: 1px solid #111827;
  border-radius: 6px;
  background: #111827;
  color: #fff;
  cursor: pointer;
}
.btn.alt {
  background: #065f46;
  border-color: #065f46;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.outbox {
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 10px;
}
.outbox img {
  max-width: 100%;
  display: block;
}
.muted {
  color: #6b7280;
  font-size: 0.9em;
}
#solution-box-2 {
  display: none;
  margin-top: 8px;
  border-left: 3px solid #22c55e;
  background: #f0fdf4;
  padding: 10px;
  border-radius: 6px;
}
</style>

#### Coding Exercise 2: Collision-Checking Graph Building

In this exercise, you will implement a function to build a **collision-free graph** connecting sampled configurations in a 2D maze:

```python
def build_graph(grid, nodes, robot_radius=0.25, k=8, max_edge_len=None)
```

The function should return a list of undirected edges `[(i, j)]`, where each edge connects two valid configurations without intersecting walls.  
Each edge must satisfy the robot’s clearance constraints.

After you implement the function, click **Run ▶** below to visualize your constructed roadmap over the maze.
<details>
  <summary><strong>💡 Hints</strong></summary>

  <ul>
    <li>
      For each node <code>i</code>, find up to <code>k</code> nearest neighbors <code>j</code> by Euclidean distance.
    </li>
    <li>
      Optionally ignore distant pairs by using <code>max_edge_len</code> (only connect if distance ≤ <code>max_edge_len</code>).
    </li>
    <li>
      Use the provided helper <code>segment_clearance(grid, p, q)</code> to get the minimum distance from the straight line segment <code>p→q</code> to any wall:<br>
      – If it returns <code>0</code>, the segment collides.<br>
      – If it returns <code>≥ robot_radius</code>, the connection is safe.
    </li>
    <li>
      Add each edge only once (store as <code>(min(i, j), max(i, j))</code> to avoid duplicates).
    </li>
  </ul>
</details>



<div class="exercise-card">
  <textarea id="code-2">def build_graph(grid, nodes, robot_radius=0.25, k=8, max_edge_len=None):&#10;&#9;"""&#10;&#9;Build an undirected graph with collision-checked straight-line edges.&#10;&#9;&#10;&#9;Inputs&#10;&#9;------&#10;&#9;grid : np.ndarray (H, W) with 1=wall, 0=free&#10;&#9;nodes : list[(x, y)] continuous coordinates in free space&#10;&#9;robot_radius : float    minimum clearance required from walls&#10;&#9;k : int                 connect up to k nearest neighbors per node&#10;&#9;max_edge_len : float or None  if set, only connect if distance &lt;= max_edge_len&#10;&#9;&#10;&#9;Returns&#10;&#9;-------&#10;&#9;edges : list[(i, j)] with i &lt; j&#10;&#9;"""&#10;&#9;import numpy as np&#10;&#10;&#9;N = len(nodes)&#10;&#9;edges = []&#10;&#10;&#9;# TODO:&#10;&#9;# 1) Compute pairwise distances (or use a k-NN approach).&#10;&#9;# 2) For each node i, consider nearest neighbors j (skip i==j).&#10;&#9;#    - If max_edge_len is not None and dist(i,j) &gt; max_edge_len: skip&#10;&#9;#    - Query helper: clr = segment_clearance(grid, nodes[i], nodes[j])  # 0 =&gt; collision&#10;&#9;#    - If clr &gt;= robot_radius: accept edge (min(i,j), max(i,j)) once&#10;&#9;#    - Stop after adding up to k neighbors for node i&#10;&#10;&#9;return edges&#10;</textarea>


  <div class="toolbar">
    <label>Samples:
      <input id="num-samples-2" type="number" min="10" max="1500" value="150">
    </label>
    <label>k:
      <input id="knn-2" type="number" min="1" max="32" value="8">
    </label>
    <label>Max edge len:
      <input id="maxlen-2" type="number" min="0" step="0.1" value="3.5">
    </label>
    <label>Robot radius:
      <input id="radius-2" type="number" min="0" step="0.05" value="0.25">
    </label>
    <button id="run-2" class="btn">Run ▶</button>
    <button id="show-solution-2" class="btn alt">Show Solution 💡</button>
    <span id="status-2" class="muted"></span>
  </div>

  <div id="solution-box-2">
    <b>✅ One Possible Solution (for reference):</b>
    <pre style="white-space: pre-wrap; font-size:13px; background:#fff; padding:8px; border-radius:5px; border:1px solid #ddd;">
def build_graph(grid, nodes, robot_radius=0.25, k=8, max_edge_len=None):
    import numpy as np
    pts = np.array(nodes, dtype=float)
    N = len(pts)
    edges = []
    seen = set()

    # pairwise distances (O(N^2))
    dmat = np.sqrt(((pts[:, None, :] - pts[None, :, :])**2).sum(axis=2))

    for i in range(N):
        order = np.argsort(dmat[i])
        added = 0
        for j in order:
            if j == i:
                continue
            dij = dmat[i, j]
            if max_edge_len is not None and dij > float(max_edge_len):
                continue
            if added >= int(k):
                break
            clr = segment_clearance(grid, tuple(pts[i]), tuple(pts[j]))
            if clr >= float(robot_radius):
                a, b = (i, j) if i &lt; j else (j, i)
                if (a, b) not in seen:
                    edges.append((a, b))
                    seen.add((a, b))
                    added += 1
    return edges
    </pre>
  </div>

  <div class="outbox">
    <div class="muted">Output:</div>
    <img id="plot-2" alt="Maze graph will appear here">
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const editor2 = CodeMirror.fromTextArea(document.getElementById("code-2"), {
    mode: "python",
    theme: "monokai",
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true
  });

  const pyodide2 = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
  });
  await pyodide2.loadPackage(["numpy", "matplotlib"]);

  const runBtn2 = document.getElementById("run-2");
  const showBtn2 = document.getElementById("show-solution-2");
  const solutionBox2 = document.getElementById("solution-box-2");
  const img2 = document.getElementById("plot-2");
  const status2 = document.getElementById("status-2");

  showBtn2.addEventListener("click", () => {
    const visible = solutionBox2.style.display === "block";
    solutionBox2.style.display = visible ? "none" : "block";
    showBtn2.textContent = visible ? "Show Solution 💡" : "Hide Solution ✖️";
  });

  runBtn2.addEventListener("click", async () => {
    runBtn2.disabled = true;
    status2.textContent = "Running…";

    const numSamples = parseInt(document.getElementById("num-samples-2").value);
    const k = parseInt(document.getElementById("knn-2").value);
    const maxLen = parseFloat(document.getElementById("maxlen-2").value);
    const radius = parseFloat(document.getElementById("radius-2").value);
    const codeUser = editor2.getValue();

    const boilerplate = `import numpy as np, matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\nfrom matplotlib.patches import Rectangle, Circle\nfrom io import BytesIO\nimport base64\nCELL_W, CELL_H = 6, 5\nCELL_PX=64\nGRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1\nSTART, GOAL = (1,1), (GRID_W-2, GRID_H-2)\nrng = np.random.default_rng(1)\n\ndef to_grid_xy(x,y): return 2*x+1, 2*y+1\n\ndef generate_maze(cw,ch,braid_prob=0.15):\n\tW,H=2*cw+1,2*ch+1\n\tg=np.ones((H,W),dtype=np.uint8)\n\tdef nbs(x,y):\n\t\tfor dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:\n\t\t\tnx,ny=x+dx,y+dy\n\t\t\tif 0<=nx<cw and 0<=ny<ch: yield nx,ny\n\tvis=[[False]*ch for _ in range(cw)]\n\tsx,sy=rng.integers(0,cw),rng.integers(0,ch)\n\tst=[(sx,sy)]; vis[sx][sy]=True\n\tgx,gy=to_grid_xy(sx,sy); g[gy,gx]=0\n\twhile st:\n\t\tx,y=st[-1]\n\t\tunv=[(nx,ny) for (nx,ny) in nbs(x,y) if not vis[nx][ny]]\n\t\tif unv:\n\t\t\tnx,ny=unv[rng.integers(0,len(unv))]\n\t\t\tg[2*y+1+(ny-y),2*x+1+(nx-x)]=0\n\t\t\tg[2*ny+1,2*nx+1]=0\n\t\t\tvis[nx][ny]=True; st.append((nx,ny))\n\t\telse:\n\t\t\tst.pop()\n\tg[START[1],START[0]]=0; g[GOAL[1],GOAL[0]]=0\n\treturn g\n\ndef sampling(grid, num_samples, size_of_grid, robot_radius=0.25):\n\timport numpy as np, math\n\tH, W = grid.shape\n\tsamples = []\n\tattempts = 0\n\tmax_attempts = max(1000, num_samples * 100)\n\twhile len(samples) < num_samples and attempts < max_attempts:\n\t\tattempts += 1\n\t\tx, y = np.random.uniform(0, W), np.random.uniform(0, H)\n\t\tc, r = int(x), int(y)\n\t\tif grid[r, c] == 1:\n\t\t\tcontinue\n\t\tpad = int(math.ceil(robot_radius)) + 1\n\t\tdmin = float(\"inf\")\n\t\tfor yy in range(max(0, r - pad), min(H - 1, r + pad) + 1):\n\t\t\tfor xx in range(max(0, c - pad), min(W - 1, c + pad) + 1):\n\t\t\t\tif grid[yy, xx] == 1:\n\t\t\t\t\tdx = max(xx - x, 0, x - (xx + 1))\n\t\t\t\t\tdy = max(yy - y, 0, y - (yy + 1))\n\t\t\t\t\td = math.hypot(dx, dy)\n\t\t\t\t\tif d < dmin:\n\t\t\t\t\t\tdmin = d\n\t\tif dmin >= robot_radius:\n\t\t\tsamples.append((x, y))\n\treturn samples\n\ndef clearance_point_vs_walls(grid, px, py, pad=3):\n\timport math\n\tH, W = grid.shape\n\tcx, cy = int(px), int(py)\n\tx0, x1 = max(0, cx - pad), min(W - 1, cx + pad)\n\ty0, y1 = max(0, cy - pad), min(H - 1, cy + pad)\n\tdmin = float(\"inf\")\n\tfor yy in range(y0, y1 + 1):\n\t\tfor xx in range(x0, x1 + 1):\n\t\t\tif grid[yy, xx] == 1:\n\t\t\t\tdx = 0.0 if xx <= px <= xx+1 else (xx - px if px < xx else px - (xx+1))\n\t\t\t\tdy = 0.0 if yy <= py <= yy+1 else (yy - py if py < yy else py - (yy+1))\n\t\t\t\td = math.hypot(dx, dy)\n\t\t\t\tif d < dmin: dmin = d\n\treturn dmin\n\ndef segment_clearance(grid, p, q):\n\timport math\n\tpx, py = p; qx, qy = q\n\tL = math.hypot(qx - px, qy - py)\n\tstep = 0.2\n\tn = max(2, int(math.ceil(L/step))+1)\n\tdmin = float(\"inf\")\n\tfor i in range(n):\n\t\tt = i/(n-1)\n\t\tx = px*(1-t) + qx*t\n\t\ty = py*(1-t) + qy*t\n\t\td = clearance_point_vs_walls(grid, x, y, pad=4)\n\t\tif d < dmin: dmin = d\n\t\tif d <= 0.0: return 0.0\n\treturn dmin\n\ndef render_maze_with_graph(grid,nodes,edges):\n\tH,W=grid.shape\n\tscale=CELL_PX/110.\n\tfig,ax=plt.subplots(figsize=(W*scale,H*scale),dpi=150)\n\tax.set_aspect('equal');ax.set_xlim(0,W);ax.set_ylim(H,0);ax.axis('off')\n\tfor y in range(H):\n\t\tfor x in range(W):\n\t\t\tif grid[y,x]==1: ax.add_patch(Rectangle((x,y),1,1,fc='black'))\n\tsx,sy=START[0]+.5,START[1]+.5; gx,gy=GOAL[0]+.5,GOAL[1]+.5\n\tax.add_patch(Circle((sx,sy),0.25,fc='#13adfa',ec='k'))\n\tax.add_patch(Circle((gx,gy),0.25,fc='#0feb55',ec='k'))\n\tfor(i,j) in edges:\n\t\t(x1,y1),(x2,y2)=nodes[i],nodes[j]\n\t\tax.plot([x1,x2],[y1,y2],lw=1.2,color='#111111',alpha=0.9)\n\tif nodes:\n\t\txs,ys=zip(*nodes)\n\t\tax.scatter(xs,ys,s=30,c='#ff4081',ec='white',lw=0.5)\n\tbuf=BytesIO();plt.savefig(buf,format='png',bbox_inches='tight',dpi=150)\n\tplt.close(fig)\n\treturn \"data:image/png;base64,\"+base64.b64encode(buf.getvalue()).decode()\n\ngrid=generate_maze(CELL_W,CELL_H)\nSIZE_OF_GRID=(GRID_W,GRID_H)\nnodes=sampling(grid,${numSamples},SIZE_OF_GRID)\n# add START and GOAL as first and last nodes\nnodes.insert(0,(START[0]+0.5,START[1]+0.5))\nnodes.append((GOAL[0]+0.5,GOAL[1]+0.5))\n${codeUser}\nedges=build_graph(grid,nodes,robot_radius=${radius},k=${k},max_edge_len=${maxLen})\nimg_url=render_maze_with_graph(grid,nodes,edges)\nimg_url


`
      .replace("{numSamples}", String(numSamples))
      .replace("{k}", String(k))
      .replace("{maxLen}", String(maxLen))
      .replace("{radius}", String(radius))
      .replace("{codeUser}", codeUser);

    try {
      const result = await pyodide2.runPythonAsync(boilerplate);
      img2.src = result;
      status2.textContent = "✅ Success";
    } catch (err) {
      console.error(err);
      status2.textContent = "⚠️ " + err;
    } finally {
      runBtn2.disabled = false;
    }
  });
});
</script>


---
<div style="border-left: 4px solid #f47a16ff; background: #fff7f0ff; padding: 12px 16px; border-radius: 6px; margin: 1em 0;" markdown="1">

##### Reflection

Try playing with the parameters `num_samples` and `k`.  
What do you notice as you increase or decrease them? Does a valid path between the start and goal always exist?

When the roadmap has too few samples or too small a `k`, some free regions may remain disconnected — making it impossible to find a path even though one exists.  
Conversely, very large values improve connectivity but increase computation.

Think about how the density and distribution of sampled nodes affect the connectivity of your roadmap. How could we choose or bias samples such that a path **always** exists?

That’s exactly where sampling-based motion planning algorithms such as **PRM**, **RRT**, and their variants come into play — they tackle this issue and provide elegant, efficient solutions by intelligently balancing exploration and connectivity in high-dimensional spaces.


</div>


In the following chapters, we’ll explore several of sampling-based algorithms in depth.  
You’ll learn how they work, their pros and cons, and when to use each one depending on your environment and planning needs.  
We’ll also discuss different variations and extensions designed to improve performance, guarantee completeness, or adapt to complex robot dynamics.



### 3.1.4.4: The Roadmap Approach: Probabilistic Roadmaps (PRM)

The first major algorithm built on this sampling paradigm is the Probabilistic Roadmap (PRM)[<a href="#ref9">9</a>].  
Its philosophy is simple and powerful: 

*"Build a map first, then ask for directions."*  

This makes it a *multi-query planner*, meaning it invests time upfront to build a comprehensive roadmap of the free configuration space ($\mathcal{C}_{\text{free}}$), which can then be reused to solve many different planning problems (e.g., moving between different start and goal points) almost instantly.  
This is ideal for static environments, like a factory floor where the obstacles don't move.

---
#### Construction Phase

PRM operates in two distinct phases. The first is the Construction Phase, where the map is built. This is an automated version of the exercises you just completed.  

1. **Sample a configuration.**  
   Draw a random configuration $ q_{\text{rand}} $ uniformly from the free configuration space (C-space).

2. **Validate the sample.**  
   If $ q_{\text{rand}} $ is collision-free, add it to the roadmap as a vertex; otherwise discard it.

3. **Find neighbors.**  
   Compute the $ k $ nearest existing vertices to $ q_{\text{rand}} $ using a chosen distance metric, typically Euclidean distance.

4. **Call the local planner.**  
   For each neighbor $ q_{\text{near}} $, invoke a straight-line local planner to test whether the segment  
   $ \overline{q_{\text{rand}} q_{\text{near}}} $ is collision-free.

5. **Add edges.**  
   If the local connection is valid, add an undirected edge between $ q_{\text{rand}} $ and $ q_{\text{near}} $.

6. **Repeat.**  
   Iterate steps 1–5 for a fixed number of samples (or until a stopping criterion is met) to  gradually build a rich network that captures the connectivity of the robot's free space.

The pseudocode below follows this logic line by line: it starts by initializing an empty graph, then iteratively performs sampling, collision-checking, neighbor search, and local connections.


<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">

<strong>Algorithm 1:</strong> Basic PRM

<pre>
<strong>procedure</strong> BUILD-ROADMAP(num_samples)
    G ← (V, E) with V = ∅, E = ∅               <em>▷ Initialize empty</em> roadmap:
                                               <em>▷ V = vertices (samples), </em>
                                                <em>E = edges (connections)</em>

    <strong>for</strong> i = 1 <strong>to</strong> num_samples <strong>do</strong>                <em>▷ Repeat construction steps</em>
        q_rand ← sample from 𝒞_free            <em>▷ Step 1: draw a</em> random 
                                            <em>collision-free configuration</em>
        V.add(q_rand)                          <em>▷ Step 2: add it as a new vertex</em>

        N(q_rand) ← k-nearest neighbors of q_rand in V  
                                               <em>▷ Step 3: find its k closest existing </em>
                                              <em>vertices</em>

        <strong>for each</strong> q_near <strong>in</strong> N(q_rand) <strong>do</strong>        <em>▷ Attempt local connections</em>
            <strong>if</strong> LocalPlanner(q_rand, q_near) is collision-free <strong>then</strong>
                                              <em>▷ Step 4: check straight-line validity</em>
                E.add((q_rand, q_near))       <em>▷ Step 5: add an undirected edge</em>

    <strong>return</strong> G                                  <em>▷ Return the completed roadmap</em>
</pre>

📘 *Reference:* Orthey et al., <em>Sampling-Based Motion Planning: A Comparative Review</em>, Algorithm 1 (PRM)[<a href="#ref1">1</a>].
</div>




---

#### Query Phase

The second phase is the Query Phase.  
Now that we have our roadmap, solving a specific problem is easy.  

1. **Insert query configurations.**  
   Take the start $ q_{\text{start}} $ and goal $ q_{\text{goal}} $ configurations.

2. **Connect to the roadmap.**  
   Use the same $ k $-nearest neighbor search and local planner to connect $ q_{\text{start}} $ and $ q_{\text{goal}} $  
   to nearby roadmap vertices (adding edges where collision-free).

3. **Search the graph.**  
   Run a shortest-path algorithm (e.g., Dijkstra’s) on the augmented roadmap to find a path  
   from $ q_{\text{start}} $ to $ q_{\text{goal}} $.

4. **Extract the trajectory.**  
   Concatenate the straight-line local-planner segments along the found graph path to obtain  
   a feasible trajectory in configuration space (C-space).

A major strength of PRM is that if we get a new query (e.g., move from $q_{\text{start}}$ to a new $q_{\text{goal}_2}$), we only need to repeat this trivial query phase, the expensive map construction is already done.  


---
The animation below provides a visual walkthrough of the PRM construction phase, showing how random samples are converted into a connected graph, it then follows with the query phase, resulting in complete path from start to goal:

<figure style="text-align:center;">
  <img src="{{ '/assets/images/sampling_based_planning/prm.gif' | relative_url }}" 
       alt=" PRM algorithm building a roadmap in a 2D maze." 
       width="100%">
  <figcaption style="text-align:center; margin-top:6px; color:#555; font-size:0.9em;">
    <strong>Figure.</strong>  PRM algorithm building a roadmap in a 2D maze.
  </figcaption>
</figure>
<!-- ---

<div class="note" markdown="1">
<strong>Quick Fact — Multi-Query vs. Single-Query Planners</strong>  
PRM is a *multi-query* planner: once the roadmap is built, it can answer many start/goal pairs efficiently.  
In contrast, algorithms like **RRT** are *single-query*: they focus on solving one specific planning problem from scratch.
</div> -->

---



![PRM: Probabilistic Roadmap Method in 3D and with 7-DOF robot arm](https://www.youtube.com/watch?v=tlFVbHENPCI&t=568s)
><sub>*PRM: Probabilistic Roadmap Method in 3D and with 7-DOF robot arm. YouTube video, Nov 23, 2020. Available at: https://www.youtube.com/watch?v=tlFVbHENPCI&t=568s*</sub>



<div class="note">
    This video gives a hands-on tour of the Probabilistic Roadmap (PRM) planner with clear visualizations in higher-dimensional configuration spaces. You’ll see PRM building a reusable roadmap from random, collision-free samples, then connecting start/goal and searching that graph for a path. The demos progress from simple 2-link scenes to 3-link (3D C-space) and a 7-DOF arm, highlighting why PRM was created for high-dimensional robots.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Source: Aaron Becker - YouTube  
        <a href="https://www.youtube.com/watch?v=tlFVbHENPCI&t=568s" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>


##### Takeaways

- In addition to the usual *k-nearest neighbors*, the video highlights a radius-based connection rule, where nodes are linked only if they lie within a fixed spatial threshold. A larger radius increases roadmap density and shortens paths, but also raises computational cost.

- The roadmap can be reused if obstacles remain static, but when they move, one must recompute collisions and rebuild edges, even if the sample points themselves are retained.

- The video compares *Dijkstra’s algorithm* with *A\**:  
  A\* expands fewer nodes when the heuristic (Euclidean distance in C-space) is informative, but behaves like Dijkstra in cluttered or poorly guided spaces.


- Increasing the number of samples or the connection radius reduces average path length, at the expense of longer preprocessing time.

- The 3D and 7-DOF scenes show how PRM approximates complex manifolds in joint space and scales gracefully without explicitly constructing obstacle regions.

---

##### Discussion and Reflection

- How should distance metrics and interpolation be adapted for *toroidal joint spaces* to avoid discontinuities?  
- What are the trade-offs between *k-nearest* and *radius-based* connection strategies?  
- Why is it misleading to show the full configuration-space obstacles when teaching PRM, as the video notes?    
- Can you design an experiment to observe diminishing returns in path length improvement as sample count increases?

<div class="assignment" markdown="1">

##### Exercise: PRM — k-NN vs Radius Connections

You build a PRM with $n$ samples in the unit square $[0,1]^2$ (ignore boundary effects).  
Compare expected edge counts when:  

- Each node connects to its $k$ nearest neighbors, and  
- Each node connects to all nodes within radius $r$.  


1. Give $\mathbb{E}[\|E\|]$ for the k-NN rule.  
2. Assuming uniform i.i.d. samples, derive an approximation for $\mathbb{E}[\|E\|]$ for the radius rule.  
3. For $n = 1{,}000$, compare $\|E\|$ when $k=10$ vs $r=0.06$.

<details markdown="1"><summary>Hints</summary>

- Each undirected edge is counted twice if you sum “neighbors per node”.  
- For the radius rule in 2D, expected neighbors $\approx n \pi r^2$.

</details>

<details markdown="1"><summary>Solution</summary>

1. k-NN: Each node adds $k$ edges (directed); undirected edges thus  
$$
\mathbb{E}[|E|] \approx \frac{n k}{2}.
$$

2. Radius $r$: Expected neighbors per node $\approx n \pi r^2$, hence  
$$
\mathbb{E}[|E|] \approx \frac{\pi}{2}\, n^2 r^2.
$$

3. With $n=1000$:  <br>
  k-NN: $|E| \approx \frac{1000\cdot 10}{2} = 5{,}000$.  <br>
  Radius $r=0.06$: $|E| \approx \frac{\pi}{2}\cdot 10^6 \cdot 0.06^2 \approx 5{,}655$.  <br>

They are of the same order; tuning $k$ and $r$ offers similar densities with different robustness/overhead trade-offs.

</details>

</div>



---

### 3.1.4.5: The Tree-Growing Approach: Rapidly-Exploring Random Trees (RRT)

What if we only need to find a single path quickly, and don’t want to spend time building a comprehensive map of the whole space? This is the problem the Rapidly-Exploring Random Tree (RRT)[<a href="#ref11">11</a>] algorithm solves. Its philosophy is: 

*"Explore purposefully from the start."*  

RRT is a **single-query planner** that grows a tree structure rooted at the start configuration, incrementally expanding into unexplored regions of the C-space until it finds the goal.

---

#### Core Idea

The growth heuristic is simple and powerful:

1. Sample a random configuration $q_{\text{rand}}$ from the entire C-space (note: not just the free space).  
2. Find the node already in the tree that is nearest to this random sample — call it $q_{\text{near}}$.  
3. Instead of trying to connect all the way to $q_{\text{rand}}$, the algorithm extends a new branch from $q_{\text{near}}$ in the direction of $q_{\text{rand}}$, but only for a small, predefined step distance $\varepsilon$. This new point is $q_{\text{new}}$.  
4. The local planner checks if the small path segment from $q_{\text{near}}$ to $q_{\text{new}}$ is collision-free.  
   If it is, $q_{\text{new}}$ is added to the tree as a new vertex with an edge connecting it back to $q_{\text{near}}$.  


<div class="note" markdown="1">
<strong>Quick Fact — Voronoi Regions and Exploration Bias</strong>  
Each node in the tree defines a Voronoi region[<a href="#ref10">10</a>] — the set of configurations that are closer to that node than to any other.  
Nodes on the frontier of the tree, whose Voronoi regions are large, are statistically more likely to be chosen as $q_{\text{near}}$ for new random samples.  
This natural bias drives the RRT to expand into large, unexplored regions — the key reason for its rapid exploration property.

**Implication.** Frontier nodes keep “reaching” toward open areas, so RRT often finds a feasible path quickly, even in high-dimensional problems.

**Trade-off.** The first path is usually jagged and suboptimal. In practice, RRT solutions are commonly post-processed (shortcutting, spline fitting, or RRT*) before execution.

<figure style="display:inline-block; text-align:center;">
  <video width="500" autoplay loop muted playsinline controls style="display:block; margin:0 auto;">
    <source src="{{ '/assets/videos/sampling_planning/2d-voronoi.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
    RRTs have a <em>“Voronoi bias”</em><br>
    <small>
      Source: <a href="https://slides.com/russtedrake/spring24-lec18#/18/0/0" target="_blank">
      Lecture 18: Sampling-Based Motion Planning</a>,
      <a href="https://people.csail.mit.edu/russt" target="_blank">Russ Tedrake</a>,
      MIT Underactuated Robotics (Spring 2024)
    </small>
  </figcaption>
</figure>

</div>


---

To summarize, RRT repeatedly samples a random configuration, finds the closest tree node, takes a small step toward the sample, and adds this new point if the short motion is collision-free. The pseudocode below follows this logic line by line.

<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">

<strong>Algorithm 2:</strong> Basic RRT

<pre>
<strong>procedure</strong> BUILD-RRT(q_start)
    T.initialize(q_start)                   <em>▷ Initialize the tree T with the </em>
                                            <em>  start configuration q_start</em>
                                            <em>  as its root node</em>

    <strong>for</strong> i = 1 <strong>to</strong> num_iterations <strong>do</strong>          <em>▷ Grow the tree by repeating </em>
                                            <em>the expansion</em>
        q_rand ← sample from 𝒞              <em>▷ Step 1: sample a random configuration</em>
                                            <em>  anywhere in the full C-space</em>
        q_near ← NearestNode(q_rand, T)     <em>▷ Step 2: find the node in T whose </em>
                                            <em>  configuration is closest to q_rand</em>
        q_new ← Extend(q_near, q_rand)      <em>▷ Step 3: move a small step ε from q_near </em>
                                            <em> toward q_rand to create a candidate</em>
                                            <em> node q_new</em>
        <strong>if</strong> LocalPlanner(q_near, q_new) is collision-free <strong>then</strong>
                                            <em>▷ Step 4: check that the short motion  </em>
                                            <em>from q_near to q_new is collision-free</em>
            T.add_node(q_new)               <em>▷ Add q_new as a new vertex in the tree</em>
            T.add_edge(q_near, q_new)       <em>▷ Connect q_new back to its parent q_near</em>

    <strong>return</strong> T                                <em>▷ Return the final exploration tree</em>
</pre>

📘 *Reference:* Orthey et al., <em>Sampling-Based Motion Planning: A Comparative Review</em>, Algorithm 2 (RRT)[<a href="#ref1">1</a>].
</div>

---

The following animation provides a visual walkthrough of the RRT graph building and path finding:

<figure style="text-align:center;">
  <img src="{{ '/assets/images/sampling_based_planning/rrt.gif' | relative_url }}" 
       alt=" PRM algorithm building a roadmap in a 2D maze." 
       width="100%">
  <figcaption style="text-align:center; margin-top:6px; color:#555; font-size:0.9em;">
    <strong>Figure.</strong>  RRT algorithm in a 2D maze.
  </figcaption>
</figure>


---

![RRT, RRT* & Random Trees](https://www.youtube.com/watch?v=Ob3BIJkQJEw)
><sub>*RRT, RRT* & Random Trees. YouTube video, Nov 21, 2018. Available at: https://www.youtube.com/watch?v=Ob3BIJkQJEw*</sub>



<div class="note">
    Video provides an intuitive and animated explanation of Random Trees, RRT, and RRT*. The video contrasts how random expansion, nearest-neighbor growth, and rewiring lead to increasingly efficient exploration and smoother paths. It also demonstrates goal bias, optimization through rewiring, and the differences between single-query (RRT) and multi-query (PRM) planning.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Source: Aaron Becker - YouTube  
        <a href="https://www.youtube.com/watch?v=Ob3BIJkQJEw" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>


---

##### Takeaways

- A purely random tree expands from arbitrary existing nodes and often remains clustered near the start. In contrast, RRT always extends the nearest node toward a random sample, driving rapid outward exploration.


- RRT quickly finds a feasible path, but the result is usually jagged and non-optimal.  
  The basic RRT does not improve its path even if more nodes are added.

- *RRT\* (to be covered later)*: Introduces *rewiring*, allowing the algorithm to gradually shorten and smooth the path.  
  As more nodes are added, the solution asymptotically approaches the true optimal path.

- Sampling the goal with some probability (e.g., 5–10%) helps reach the goal faster in open spaces,  
  but excessive bias can trap the tree in local minima or concave regions.

- RRT’s local, forward-projection nature makes it efficient in high-dimensional and obstacle-rich environments, unlike PRM, which must solve many global connection checks.

---

##### Discussion and Reflections

1. In what types of environments can goal bias help or hinder progress?  
2. Why can *RRT\** improve path optimality while RRT cannot?   
3. Compare RRT’s forward projection to PRM’s global roadmap in terms of computational trade-offs.  
4. What post-processing methods could smooth a jagged RRT path while maintaining feasibility?

<div class="assignment" markdown="1">

##### Exercise: RRT Step Size — Coverage and Cost

In an RRT, each extension moves a distance $\varepsilon$ (step size) toward $q_{\text{rand}}$ before collision checking.

1. Given straight-line distance $D$ from start to goal in an obstacle-free region, estimate the minimum number of successful extensions needed to reach the goal.  
2. In a corridor of width $w$ (walls parallel to the path), state a sufficient condition on $\varepsilon$ that avoids skipping over free configurations during discretized collision checking.  
3. Discuss the trade-off of making $\varepsilon$ very small vs very large.

<details markdown="1"><summary>Solution</summary>

1) Each extension adds $\varepsilon$ of progress, so $\lceil D/\varepsilon \rceil$ successful steps suffice (ignoring sampling overhead).  

2) With straight-segment collision checks sampled at step $\varepsilon$, a sufficient conservative condition is  
$$
\varepsilon \le w,
$$
so that successive samples do not jump across a wall; more robustly, use $\varepsilon \le \gamma\,w$ with $\gamma\in(0,1]$ and adequate intermediate checks along the edge.

3) Small $\varepsilon$: finer collision checking and better fidelity, but more local-planner calls and slower growth.  
Large $\varepsilon$: faster outward spread, but higher collision risk and missed narrow corridors; more jagged paths.
</details>

</div>


---

<div class="note" markdown="1">
<strong>Quick Fact — PRM vs. RRT</strong>  
- **PRM** is a *multi-query* planner: expensive upfront but reusable.  
- **RRT** is a *single-query* planner: fast but temporary.  
PRM builds a *roadmap* of the entire space; RRT grows a *tree* from the start.
</div>


---

### 3.1.4.6: Planning for Optimality

The paths found by PRM and RRT are feasible, but they are rarely good. Due to their random nature, the resulting paths are often jagged, inefficient, and unnatural. In many applications, especially in robotics, finding a path that is short, smooth, or energy-efficient is just as important as finding a path at all.

This chapter explores two main strategies for finding higher-quality paths:

- **Post-Processing:** Taking a "bad" path and improving it.
- **Asymptotically-Optimal Planners:** Using algorithms that are guaranteed to find the optimal path, given enough time.

---

#### Post-Processing

Before 2010, optimality was commonly handled as a post-processing step. The planner would quickly find any feasible path, and then a separate optimization algorithm would try to improve it.[<a href="#ref1">1</a>]

##### Path Shortcutting[<a href="#ref12">12</a>]

The simplest and most common post-processing technique is path shortcutting. The idea is to iteratively improve the path by replacing segments with shorter, collision-free "shortcuts."

<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">

<strong>Algorithm 3:</strong> Path Shortcutting  


<pre>
<strong>procedure</strong> SHORTCUT-PATH(path)
    <strong>for</strong> i = 1 <strong>to</strong> N_ITERATIONS <strong>do</strong>               <em>▷ Repeat many shortcut attempts</em>

        t1, t2 ← RandomTimes(path) with t1 < t2
                                               <em>▷ Step 1: pick two random arc-length</em>
                                               <em>  positions along the current path</em>
        q1 ← path(t1)                          <em>▷ Evaluate the first point</em>
        q2 ← path(t2)                          <em>▷ Evaluate the second point</em>

        <strong>if</strong> LocalPlanner(q1, q2) is collision-free <strong>then</strong>
                                               <em>▷ Step 2: check whether a straight-line</em>
                                               <em>  shortcut between q1 and q2 is valid</em>

            path.replace(from=q1, to=q2, with=NewSegment(q1, q2))
                                               <em>▷ Step 3: shorten the path by replacing</em>
                                               <em>  the old section with this shortcut</em>

    <strong>return</strong> path                                <em>▷ Return the smoothed path</em>
</pre>
</div>


This is a gradient-free optimization method that is surprisingly effective. It is not guaranteed to find the true optimal path, but it can dramatically reduce path length and remove unnecessary detours with very little computational effort.
<figure style="text-align:center;">
  <img src="{{ '/assets/images/sampling_based_planning/rrt_shortcut.gif' | relative_url }}" 
       alt="RRT with path shortcutting post-processing" 
       width="70%">
  <figcaption style="text-align:center; margin-top:6px; color:#555; font-size:0.9em;">
    <strong>Figure.</strong> RRT with <em>path shortcutting</em> post-processing.  
    The original jagged RRT path (gray) is progressively shortened by replacing collision-free segments with straight-line shortcuts.
  </figcaption>
</figure>


---

#### Asymptotically-Optimal Planners

In 2011, a breakthrough occurred with the development of planners that are asymptotically optimal.[<a href="#ref1">1</a>]

<div class="definition">
<strong>Definition[<a href="#ref8">8</a>].</strong>
A sampling-based planner is <em>asymptotically optimal</em> if the cost of the best path it has found converges to the global optimum as the number of samples (or time) goes to infinity:
\[
\lim_{n \to \infty} c_{\text{best}}(n) = c^\star .
\]
</div>

This led to the "star" versions of the main algorithms: **PRM\*** and **RRT\***.

---

##### Extending RRT Toward Optimality: RRT*[<a href="#ref8">8</a>]
While the Rapidly-Exploring Random Tree (RRT) is highly effective at finding feasible paths in complex, high-dimensional spaces, it does not account for path quality. In many robotic applications, such as manipulator motion, drone navigation, or autonomous driving, path quality matters just as much as feasibility. A poor trajectory may increase energy consumption, execution time, or even risk of collision when tracking the path dynamically.

To address this, *RRT\** extends the original *RRT* framework to not only explore the configuration space but also to improve the solution quality over time.  
It introduces two critical operations, *ChooseParent* and *Rewire*, which enable local cost optimization and global convergence to the optimal path.  
The resulting planner is asymptotically optimal, meaning that as the number of samples grows, the cost of the best path found converges to the true minimum.

---


---

###### Intuition and Key Ideas

RRT\* follows the same exploratory logic as RRT — sampling random configurations and incrementally growing a tree that covers the free configuration space.  
However, instead of greedily attaching each new node to its nearest neighbor, it performs a local optimization every time a new node is added:

1. **ChooseParent — optimal insertion:**  
   When a new node $q_{\text{new}}$ is created, RRT\* looks at all existing nodes within a neighborhood of radius $r(n)$ and selects as its parent the one that minimizes the total path cost from the start.  
   This ensures that $q_{\text{new}}$ is always connected through the most efficient local route.

2. **Rewire — cost propagation:**  
   Once $q_{\text{new}}$ is added, it may also improve existing connections.  
   RRT\* checks whether connecting any nearby node *through* $q_{\text{new}}$ would yield a cheaper total cost.  
   If so, it “rewires” that neighbor to use $q_{\text{new}}$ as its new parent, effectively reshaping the tree toward a more optimal structure.


The pseudocode below follows this logic line by line.

<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">

<strong>Algorithm 4:</strong> RRT* — Optimal Tree-Growing Planner  

<pre>
<strong>procedure</strong> BUILD-RRT*(q_start)
    T.initialize(q_start)                      <em>▷ Start tree with q_start</em>

    <strong>for</strong> i = 1 <strong>to</strong> num_iterations <strong>do</strong>             <em>▷ Grow the tree</em>
        q_rand ← sample from 𝒞                 <em>▷ Random configuration</em>
        q_near ← NearestNode(q_rand, T)        <em>▷ Nearest existing node</em>
        q_new  ← Extend(q_near, q_rand)        <em>▷ Step toward q_rand</em>

        <strong>if</strong> LocalPlanner(q_near, q_new) is collision-free <strong>then</strong>
                                               <em>▷ Add only if short step is valid</em>

            N_near ← NearNodes(q_new, T, radius=r(n))
                                               <em>▷ Nearby nodes within radius r(n)</em>

            // --- ChooseParent: locally optimal insertion ---
            q_min ← q_near                     <em>▷ Default parent</em>
            c_min ← Cost(q_near) + Cost(q_near, q_new)
                                               <em>▷ Cost via q_near</em>

            <strong>for each</strong> q_neighbor <strong>in</strong> N_near <strong>do</strong>
                c_new ← Cost(q_neighbor) + Cost(q_neighbor, q_new)
                                               <em>▷ Try cheaper parent</em>
                <strong>if</strong> c_new < c_min <strong>and</strong>
                   LocalPlanner(q_neighbor, q_new) <strong>then</strong>
                                               <em>▷ Only if edge is valid</em>
                    q_min ← q_neighbor
                    c_min ← c_new

            T.add_node(q_new)                  <em>▷ Insert q_new</em>
            T.add_edge(q_min, q_new)           <em>▷ Connect to best parent</em>

            // --- Rewire: locally optimal tree repair ---
            <strong>for each</strong> q_neighbor <strong>in</strong> N_near <strong>do</strong>
                c_old ← Cost(q_neighbor)       <em>▷ Old cost</em>
                c_new ← Cost(q_new) + Cost(q_new, q_neighbor)
                                               <em>▷ Cost via q_new</em>
                <strong>if</strong> c_new < c_old <strong>and</strong>
                   LocalPlanner(q_new, q_neighbor) <strong>then</strong>
                                               <em>▷ Rewire if shorter and valid</em>
                    T.rewire(q_neighbor, new_parent=q_new)

    <strong>return</strong> T                                  <em>▷ Return optimal tree</em>
</pre>

📘 *Reference:* Karaman & Frazzoli, <em>Sampling-based Algorithms for Optimal Motion Planning</em>,  
Algorithm 2 (RRT\*)[<a href="#ref8">8</a>].
</div>

The search radius $r(n)$ gradually decreases with the number of samples $n$, ensuring both convergence and computational tractability.  
Through repeated sampling and local rewiring, RRT\* progressively smooths out the tree, pulling all feasible paths toward the globally optimal solution:


<figure style="margin:1.2em 0;">
  <div style="display:flex; gap:12px; align-items:flex-start; justify-content:center; flex-wrap:wrap;">
    <!-- Left: RRT -->
    <div style="flex:1 1 360px; max-width:600px; text-align:center;">
      <img src="{{ '/assets/images/sampling_based_planning/rrt3.gif' | relative_url }}" alt="RRT building a tree" style="width:100%; height:auto; border-radius:6px;" />
      <figcaption style="margin-top:6px; color:#555; font-size:0.9em;">
        <b>RRT</b> — finds a feasible path quickly (no rewiring).
      </figcaption>
    </div>

    <!-- Right: RRT* -->
    <div style="flex:1 1 360px; max-width:600px; text-align:center;">
      <img src="{{ '/assets/images/sampling_based_planning/rrtstar.gif' | relative_url }}" alt="RRT* building and rewiring" style="width:100%; height:auto; border-radius:6px;" />
      <figcaption style="margin-top:6px; color:#555; font-size:0.9em;">
        <b>RRT*</b> — rewires locally to reduce cost, converging toward optimal.
      </figcaption>
    </div>
  </div>

  <figcaption style="text-align:center; margin-top:10px; color:#555; font-size:0.95em;">
    <b>Figure.</b> Side-by-side comparison of <i>RRT</i> and <i>RRT*</i> on the same map.
  </figcaption>
</figure>


---

##### Extending PRM Toward Optimality: PRM*

The primary limitation of the classic Probabilistic Roadmap (PRM) algorithm is its lack of guaranteed optimality. The connection rule based on a fixed number of neighbors ($k$) prevents the graph from fully exploring longer, potentially more optimal connections. The resulting feasible path is often suboptimal, limited by the sparse, static structure of the roadmap.

*PRM\** addresses this by modifying the construction phase to guarantee asymptotic optimality, ensuring the path cost converges to the true optimal cost as the number of samples increases.

The guarantee of optimality in PRM\* comes from replacing the fixed $k$-Nearest Neighbors rule with a dynamic, shrinking search radius $r(n)$, as shown in the following pseudocode:


<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">

<strong>Algorithm 5:</strong> PRM* — Optimal Roadmap Construction  


<pre>
<strong>procedure</strong> BUILD-PRM*(num_samples)
    G.initialize()                            <em>▷ Create empty graph G = (V, E)</em>

    <strong>for</strong> n = 1 <strong>to</strong> num_samples <strong>do</strong>               <em>▷ Add samples one by one</em>
        q_rand ← sample from 𝒞_free           <em>▷ Step 1: draw a collision-free sample</em>
        V.add(q_rand)                         <em>▷ Add new vertex to the roadmap</em>

        r_n ← r(n)                            <em>▷ Step 2: connection radius</em>
                                              <em>   r(n) = γ (log n / n)^(1/d)</em>

        N_near ← NearNodes(q_rand, V, radius=r_n)
                                              <em>▷ Step 3: all neighbors within r_n</em>

        <strong>for each</strong> q_near <strong>in</strong> N_near <strong>do</strong>          <em>▷ Try to connect nearby vertices</em>
            <strong>if</strong> LocalPlanner(q_rand, q_near) is collision-free <strong>then</strong>
                                              <em>▷ Step 4: check if the straight segment</em>
                                              <em>   between q_rand and q_near is valid</em>
                E.add((q_rand, q_near))       <em>▷ Step 5: add undirected edge</em>

    <strong>return</strong> G = (V, E)                         <em>▷ Final optimal roadmap</em>
</pre>

📘 *Reference:* Karaman & Frazzoli, <em>Sampling-based Algorithms for Optimal Motion Planning</em>[<a href="#ref8">8</a>].
</div>

This change ensures that new, shorter connections can be established across the entire free space as the roadmap grows, continuously refining the path toward the optimum.

<div class="definition" markdown=1>
<strong>Definition.</strong> PRM* Neighbor Search Radius

PRM\* connects a new sample $q_{\text{new}}$ to all previously sampled nodes $q \in V$ that lie within a radius $r(n)$, where the radius is given by:

$$
r(n) = \gamma \left(\frac{\log n}{n}\right)^{1/d}
$$

where:
* $\boldsymbol{n}$: The current number of samples (nodes) in the graph.
* $\boldsymbol{d}$: The dimension of the configuration space, $\mathcal{C}$.
* $\boldsymbol{\gamma}$: A constant, $\gamma > \gamma^\star$, selected to satisfy the theoretical optimality guarantees.
</div>

<!-- 
#### Theoretical Basis for Asymptotic Optimality

The mathematical structure of $r(n)$ is crucial for balancing the planner's two requirements:

* **Sparsity & Efficiency ($n$ term):** The term $\left(\frac{1}{n}\right)^{1/d}$ ensures the radius eventually shrinks, which prevents the graph from becoming fully connected (a complete graph) and keeps the computational complexity manageable.
* **Global Optimality ($\log n$ term):** The $\log n$ term ensures the radius shrinks slowly enough that every configuration $q \in \mathcal{C}_{\text{free}}$ is eventually connected to its neighbors through the shortest possible path. This guarantees that the optimal path will eventually be included in the graph.

<div class="definition" markdown=1>
<strong>Theorem. </strong> Asymptotic Optimality of PRM\*

PRM\* is both **probabilistically complete** and **asymptotically optimal**. This means that if a path exists, the planner will eventually find one, and as the number of samples $n$ approaches infinity, the cost of the path found, $C(n)$, converges almost surely to the cost of the optimal path, $C(\tau^\star)$.
$$
\lim_{n \to \infty} C(n) = C(\tau^\star) \quad \text{(a.s.)}
$$

</div> -->

The animation below showcases the performance difference between the standard PRM algorithm and its asymptotically optimal variant, PRM*:

<figure style="margin:1.2em 0;">
  <div style="display:flex; gap:12px; align-items:flex-start; justify-content:center; flex-wrap:wrap;">

    <div style="flex:1 1 360px; max-width:600px; text-align:center;">
      <img src="{{ '/assets/images/sampling_based_planning/prm2.gif' | relative_url }}" alt="PRM building a tree" style="width:100%; height:auto; border-radius:6px;" />
      <figcaption style="margin-top:6px; color:#555; font-size:0.9em;">
        <b>PRM</b>
      </figcaption>
    </div>

    <div style="flex:1 1 360px; max-width:600px; text-align:center;">
      <img src="{{ '/assets/images/sampling_based_planning/prmstar.gif' | relative_url }}" alt="PRM* building and shortest path" style="width:100%; height:auto; border-radius:6px;" />
      <figcaption style="margin-top:6px; color:#555; font-size:0.9em;">
        <b>PRM*</b>
      </figcaption>
    </div>
  </div>

  <figcaption style="text-align:center; margin-top:10px; color:#555; font-size:0.95em;">
    <b>Figure.</b> Side-by-side comparison of <i>PRM</i> and <i>PRM*</i> on the same map.
  </figcaption>
</figure>

---

#### Discussion: The Price of Optimality

- **PRM** is fast. It connects each sample to a fixed number of neighbors and quickly produces a feasible roadmap.
- **PRM\*** is slower. It uses a growing connection radius, requiring many more neighbor checks. But as samples increase, its paths converge to the optimal one.

- **RRT** is fast. It finds a feasible path quickly and stops, making it ideal for fast exploration.
- **RRT\*** is slow. It keeps refining the tree using *ChooseParent* and *Rewire*, performing many more nearest-neighbor and collision checks. Over time, it converges to the true optimal path.

---

#### Exercises

<div class="assignment" markdown="1">

##### 1. Conceptual: Shortcutting vs. Rewiring

Path Shortcutting (a post-processor) and the *Rewire* step in RRT* (an online method) both aim to improve path quality.

Explain two fundamental differences between them in terms of:

- What they optimize (the data structure)
- When they optimize (during or after the search)

<details markdown="1"> <summary><strong>Solution</strong></summary>

**What they optimize:**

- *Path Shortcutting* optimizes a single, completed path (a list of waypoints) *after* it has been found.  
  It does not reuse or modify any of the nodes explored during the search.

- *Rewire* optimizes the entire search tree — not just the final path.  
  It adjusts the connections among many nodes, improving local and global path costs as the tree grows.

**When they optimize:**

- *Path Shortcutting* is a post-processing step.  
  The planner first finds any feasible path, then a separate algorithm tries to shorten or smooth it.

- *Rewire* is an online (in-process) step.  
  The optimization happens during tree expansion, guiding the planner toward better solutions with every iteration.

</details>
</div>


<div class="assignment" markdown="1">

##### 2. Applied: RRT* ChooseParent

A new node $ q_{\text{new}} $ is sampled. The RRT* algorithm finds two nodes in its neighborhood:

| Node | $ C(q_{\text{start}}, q) $ | $ C(q, q_{\text{new}}) $ |
|:-----|:-----------------------------:|:---------------------------:|
| $ q_A $ | 10 | 5 |
| $ q_B $ | 12 | 2 |

A standard RRT would have chosen $ q_B $ as the parent because it is the nearest.

Which node will *RRT\**’s `ChooseParent` function select as the new parent for $ q_{\text{new}} $?  
Show your calculations.

<details markdown="1"> <summary><strong>Solution</strong></summary>

The `ChooseParent` function selects the parent that minimizes the total cost-to-come for $ q_{\text{new}} $:

$$
\begin{aligned}
C_{\text{via } q_A} &= C(q_A) + C(q_A, q_{\text{new}}) = 10 + 5 = 15
\end{aligned}
$$

$$
\begin{aligned}
C_{\text{via } q_B} &= C(q_B) + C(q_B, q_{\text{new}}) = 12 + 2 = 14
\end{aligned}
$$

✅ **Answer:**  
RRT* will select Node $ q_B $ as the parent, because the total path cost (14) is lower than the path via $ q_A $ (15).

</details>
</div>


<div class="assignment" markdown="1">

##### 3. Applied: RRT* Rewire

Continuing from the previous exercise:  
Node $ q_{\text{new}} $ has been added to the tree with $ q_B $ as its parent, and its total cost-to-come is:

$$
C(q_{\text{new}}) = 14
$$

Now the algorithm checks the neighbors of $ q_{\text{new}} $ for potential rewiring.  
One of those neighbors is $ q_A $, which currently has:

$$
C(q_A)_{\text{old}} = 10
$$

$$
C(q_{\text{new}}, q_A) = 5
$$

Will the algorithm rewire $ q_A $ to make $ q_{\text{new}} $ its new parent?  
Why or why not?

<details markdown="1"> <summary><strong>Solution</strong></summary>

The algorithm checks whether the new potential path to $ q_A $ (through $ q_{\text{new}} $) is cheaper:

$$
\begin{aligned}
C_{\text{old}}(q_A) &= 10
\end{aligned}
$$

$$
\begin{aligned}
C_{\text{new}}(q_A) &= C(q_{\text{new}}) + C(q_{\text{new}}, q_A) = 14 + 5 = 19
\end{aligned}
$$

Since $ 19 > 10 $, the new path is more expensive.

❌ **Answer:**  
No, the algorithm will *not* rewire $ q_A $.  
The path through $ q_{\text{new}} $ increases the total cost, so the existing parent of $ q_A $ remains unchanged.

</details>
</div>

---

#### Summary Table: PRM vs PRM* vs RRT vs RRT*

| Planner | Structure | Query Type | Optimal? | Convergence | Best Use |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **PRM** | Graph | Multi-query | ❌ No | Feasible only | Static maps, many queries |
| **PRM\*** | Graph | Multi-query | ✅ Yes | Asymptotic optimum | Offline optimal planning |
| **RRT** | Tree | Single-query | ❌ No | Feasible only | Fast single-shot planning |
| **RRT\*** | Tree | Single-query | ✅ Yes | Asymptotic optimum | Optimal single-query |

#### Rules of thumb

* Use **PRM** when: many queries, static environment.
* Use **RRT** when: you need *one quick feasible path*.
* Use **RRT\*** when: quality matters and time isn't critical.
* Use **PRM\*** when: you are building a high-quality global map (e.g., industrial cells).

---
### 3.1.4.7 Final Project
- Implement and compare RM, RRT, RRT on a chosen benchmark.  
- Evaluate success rate, runtime, and path quality.  
- Extend to one special case (kinodynamic, narrow passage, or uncertainty).  

---

## 3.1.5 Credits:

This course page was created by **Hanka Goralija, EPFL** under the supervision of **Prof. Aude Billard**, and funded by **IEEE RAS** and **EPFL**.  

---

## 3.1.6 References

1. <a id="ref1"></a>Orthey, A., Chamzas, C., & Kavraki, L. E. (2023). *Sampling-Based Motion Planning: A Comparative Review.* arXiv preprint arXiv:2309.13119 [cs.RO]. Available at: [https://arxiv.org/abs/2309.13119](https://arxiv.org/abs/2309.13119)

2. <a id="ref2"></a>Lozano-Pérez, T., & Wesley, M. A. (1979). *An algorithm for planning collision-free paths among polyhedral obstacles.* Communications of the ACM, 22(10), 560–570.

3. <a id="ref3"></a>Canny, J., & Reif, J. (1987). *New lower bound techniques for robot motion planning problems.* In *Proceedings of the 28th Annual Symposium on Foundations of Computer Science (SFCS 1987)*, pp. 49–60. IEEE.

4. <a id="ref4"></a>Khatib, O. (1986). *Real-time obstacle avoidance for manipulators and mobile robots.* In *Autonomous Robot Vehicles.* Springer.

5. <a id="ref5"></a>Choset, H. (with Ji Yeong Lee, G. D. Hager & Z. Dodds). (n.d.). *Robotic Motion Planning: Potential Functions.* 16-735 Robotics Institute, Carnegie Mellon University. Retrieved from https://www.cs.cmu.edu/~motionplanning/lecture/Chap4-Potential-Field_howie.pdf

6. <a id="ref6"></a>LaValle, S. M. (2012). *Motion Planning for Dynamic Environments, Part II: Motion Planning – Finding the Path.* ICRA 2012 Tutorial, University of Illinois at Urbana-Champaign. Retrieved from https://msl.cs.uiuc.edu/~lavalle/ (ICRA 2012 Tutorial, May 14 2012).

7. <a id="ref7"></a>LaValle, S. M. (2006). *Planning Algorithms.* Cambridge University Press. Available at: [https://lavalle.pl/planning/](https://lavalle.pl/planning/)

8. <a id="ref8"></a>Karaman, S., & Frazzoli, E. (2011). *Sampling-based algorithms for optimal motion planning.* The International Journal of Robotics Research, 30(7), 846–894. DOI: [10.1177/0278364911406761](https://doi.org/10.1177/0278364911406761)

9. <a id="ref9"></a>Kavraki, L. E., Švestka, P., Latombe, J.-C., & Overmars, M. H. (1996). *Probabilistic roadmaps for path planning in high-dimensional configuration spaces.* IEEE Transactions on Robotics and Automation, 12(4), 566–580. DOI: [10.1109/70.508439](https://doi.org/10.1109/70.508439)

10. <a id="ref10"></a>Okabe, A., Boots, B., Sugihara, K., & Chiu, S. N. (2000). *Spatial Tessellations: Concepts and Applications of Voronoi Diagrams* (2nd ed.). Wiley.

11. <a id="ref11"></a>LaValle, S. M. (1998). *Rapidly-exploring random trees: A new tool for path planning.* Technical Report TR 98-11, Computer Science Department, Iowa State University.

12. <a id="ref12"></a>Geraerts, R., & Overmars, M. H. (2007). *Creating high-quality paths for motion planning.* International Journal of Robotics Research, 26(8), 845–863.


---

[Back to Top](#start)