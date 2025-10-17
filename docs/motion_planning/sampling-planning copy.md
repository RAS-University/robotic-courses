---
title: Sampling-Based Planning
parent: Courses
layout: default
math: mathjax
---

# Sampling-Based Planning

---

## Books
- *Planning Algorithms* – Steven LaValle (2006) [Free Online](http://lavalle.pl/planning/)
- *Sampling-Based Motion Planning: A Comparative Review* – Andreas Orthey, Constantinos Chamzas, Lydia E. Kavraki, arXiv:2309.13119 [cs.RO], 2023. [arXiv link](https://arxiv.org/abs/2309.13119) 

---

## Prerequisites
- [Basic probability theory](../mathematical-foundation)
- [Robot kinematics and configuration space](../kinematics)
- [Graph search algorithms](../graph-theory)
<!-- - Collision checking in robot environments -->

---

# Chapter 1 : History of Motion Planning

---
title: Graph Theory
parent: Advanced Mathematical Foundations
layout: default
math: mathjax
---

# Graph Theory

---

## Introduction

Graph theory is one of the most universal languages in mathematics and engineering.  
Whenever we speak about **objects connected by relationships**—cities by roads, computers by cables, or configurations by feasible motions—we are already speaking the language of graphs.

In robotics, graphs describe how a robot can move from one configuration to another;  
in algorithms, they describe how information or influence travels through systems.  
What began as puzzles and mazes became the backbone of modern network science, optimization, and motion planning.

---

## Chapter 1. From Mazes to Mathematics

Imagine a small wheeled robot placed at the entrance of a maze.  
At the far end lies an exit, and the robot’s task is to reach it without colliding with walls.

At first, this seems intuitive:  
the robot can **move forward, turn, and backtrack** whenever it encounters a dead end.  
But how can we guarantee it always finds a path—and preferably the shortest one?  
To answer that, we need to formalize the problem.

---

### 1.1 Representing the Maze

We begin by representing every **open cell** of the maze as a **node (vertex)**,  
and every **free passage** between two neighboring cells as an **edge** connecting them.

If we denote the set of all reachable cells as $V$ and all allowed movements as $E$,  
then the maze becomes a mathematical object called a **graph**:

$$
G = (V, E)
$$

Here:
- $V$ is a *finite set of vertices* (states of the robot),
- $E \subseteq V \times V$ is a *set of pairs* representing connections.

Each edge may be **undirected** (movement possible both ways) or **directed** (only one direction allowed).  
This abstraction captures the essence of connectivity, regardless of what the “maze” actually is.

---

### 1.2 A Simple Example

|   |   |   |   |   |
|:-:|:-:|:-:|:-:|:-:|
| **A** | ▓ |   |   |   |
|   | ▓ |   | ▓ |   |
|   |   |   | ▓ | **B** |
|   |   |   |   |   |

In this 2D grid:
- Each free cell corresponds to a node.
- Each adjacency (up, down, left, right) forms an edge.
- The start cell A and goal cell B are nodes $x_I$ and $x_G$.

The robot’s motion planning task now becomes:  
> *Find a sequence of edges connecting $x_I$ to $x_G$.*

---

## Chapter 2. Connectivity and Paths

### 2.1 Connectivity

Two vertices $u$ and $v$ are said to be **connected** if there exists a path $(u, v_1, v_2, …, v)$ such that each consecutive pair is an edge in $E$.  
If every vertex in $V$ can reach every other, the graph is **connected**.

Disconnected graphs consist of multiple **connected components**—disjoint subgraphs with no bridges between them.

In the maze analogy, this means certain rooms have **no doors** connecting them.  
A robot starting in one component cannot reach another unless a new edge (door) is added.

---

### 2.2 Paths and Cycles

A **path** in $G$ is a sequence of vertices:
$$
P = (v_0, v_1, \ldots, v_k), \quad (v_i, v_{i+1}) \in E
$$
A **cycle** is a path where $v_0 = v_k$ and no edges are repeated.

Cycles represent loops in the maze, and paths correspond to valid sequences of moves.

---

## Chapter 3. Early Strategies — Exploration as Search

The first strategy one might try is simple exploration.

### 3.1 Depth-First Search (DFS)

The robot moves forward whenever it can;  
when blocked, it backtracks to the most recent intersection and tries another branch.

DFS is easy to implement and memory-efficient,  
but it can explore deeply into wrong corridors before finding a solution.

Formally, DFS performs a recursive traversal:
$$
\text{DFS}(v): \text{ visit } v; \text{ for each } (v, u) \in E, \text{ if } u \text{ not visited, DFS}(u)
$$

### 3.2 Breadth-First Search (BFS)

A more systematic explorer expands evenly in *layers*—first visiting all nodes one step away from the start, then two steps, and so on.

BFS guarantees the **shortest path** in unweighted graphs, since it expands in increasing distance order.

---

## Chapter 4. Adding Realism — Weighted Graphs

Real mazes (and real worlds) are not uniform.  
Moving uphill, turning sharply, or traversing rough terrain costs energy.  
To capture this, each edge $(u, v)$ is assigned a **weight** $w(u, v) > 0$.

Now the task becomes finding a path of **minimum total cost**:
$$
C(P) = \sum_{i=0}^{k-1} w(v_i, v_{i+1})
$$

### 4.1 Dijkstra’s Algorithm

Proposed in 1959 by Edsger Dijkstra, this algorithm expands nodes in order of **accumulated cost**.  
At each step, it chooses the unexplored vertex with the smallest current cost, ensuring that once a vertex is finalized, its path cost is minimal.

This elegant algorithm introduced the principle of *optimal exploration*,  
and forms the mathematical basis of modern routing systems.

### 4.2 A-Star (A\*) Search

In 1968, Hart, Nilsson, and Raphael extended Dijkstra’s idea by adding **heuristic guidance**—  
an estimate $h(v)$ of the remaining cost to the goal.

The total evaluation becomes:
$$
f(v) = g(v) + h(v)
$$
where $g(v)$ is the cost so far.  
If $h(v)$ never overestimates the true remaining cost, A\* guarantees optimality while exploring fewer nodes.

In the maze, this heuristic could be the straight-line distance between the robot and the goal.

---

## Chapter 5. The Limits of Exhaustive Search

When the maze grows from 10×10 to a 1000-room building,  
the number of possible paths increases explosively.  
For robots with many joints, the “maze” becomes high-dimensional:  
each axis represents an angle or coordinate.

Mathematically, this explosion in possibilities led to a sobering discovery:  
the **general motion planning problem is NP-hard**.

### 5.1 What NP-Hard Means

The term **NP-hard** comes from computational complexity theory.  
It means that *no known algorithm* can solve all instances of the problem efficiently (in polynomial time).  
For large systems, the number of possibilities grows exponentially with the number of degrees of freedom.

Formally, a problem $A$ is NP-hard if every problem in NP can be reduced to $A$ by a polynomial-time transformation.  
In simpler words: motion planning is at least as hard as any problem whose solution can be *verified* quickly.

In practice, this tells us that **exact algorithms**—those that guarantee the perfect optimal path—become infeasible for high-dimensional robots.

---

## Chapter 6. The Pragmatic Revolution — Sampling and Approximation

The realization of NP-hardness did not end motion planning research;  
it *redirected* it toward practical methods.

Instead of exhaustively enumerating every configuration,  
researchers began to **sample** the space—drawing random or quasi-random points and connecting them if they were reachable.

The resulting graph of samples approximated the robot’s **configuration space**,  
and traditional graph search algorithms (like Dijkstra or A\*) could be applied to it.

This compromise between rigor and feasibility gave rise to the now-dominant **Sampling-Based Motion Planning** family:  
PRM (Probabilistic Roadmaps), RRT (Rapidly-Exploring Random Trees), and their optimal variants RRT*, PRM*, and BIT*.

---

## Chapter 7. Graph Theory Beyond the Maze

Although we discovered graphs through the maze story,  
their power extends far beyond motion planning.

| Domain | Graph Meaning |
|---------|----------------|
| **Computer Networks** | Nodes are routers; edges are data links. |
| **Transportation** | Cities as nodes, roads as edges. |
| **Epidemiology** | People as nodes, disease transmission as edges. |
| **Machine Learning** | Samples or variables connected by similarity or dependency. |
| **Mathematics** | Abstract relations among sets or algebraic objects. |

Graphs unify problems of **structure and connectivity** across disciplines,  
and graph theory provides the rigorous mathematical tools to reason about them.

---

## Chapter 8. Mathematical Summary

### Definition 1 (Graph)
A **graph** is an ordered pair $G = (V, E)$ where $V$ is a nonempty finite set and $E \subseteq V \times V$.  
If $(u, v) \in E \Rightarrow (v, u) \in E$, the graph is **undirected**.

### Definition 2 (Path)
A **path** is a sequence $(v_0, v_1, \ldots, v_k)$ with $(v_i, v_{i+1}) \in E$ for all $i$.

### Definition 3 (Connected Graph)
A graph is **connected** if every pair $(u, v) \in V$ is joined by some path.

### Definition 4 (Weighted Graph)
A graph is **weighted** if a function $w : E \to \mathbb{R}^+$ assigns costs to edges.

### Definition 5 (Shortest Path)
Given a weighted graph and vertices $s, t \in V$, the **shortest path** is the path $P$ minimizing:
$$
C(P) = \sum_{(u,v) \in P} w(u,v)
$$

These abstract definitions formalize what our robot intuitively faced in the maze:  
finding efficient, valid sequences of moves between connected states.

---

## Chapter 9. References and Further Reading

1. Dijkstra, E. W. (1959). *A Note on Two Problems in Connexion with Graphs.* Numerische Mathematik.  
2. Hart, P. E., Nilsson, N. J., Raphael, B. (1968). *A Formal Basis for the Heuristic Determination of Minimum Cost Paths.* IEEE Trans. Systems Science and Cybernetics.  
3. Lozano-Pérez, T. (1979). *Algorithm for Planning Collision-Free Paths Among Polyhedral Obstacles.* *Commun. ACM*.  
4. Canny, J. (1988). *The Complexity of Robot Motion Planning.* MIT Press.  
5. LaValle, S. M. (2006). *Planning Algorithms.* Cambridge University Press.  
6. Orthey, A., Chamzas, C., Kavraki, L. E. (2023). *Sampling-Based Motion Planning: A Comparative Review.* arXiv:2309.13119 [cs.RO].  
7. West, D. B. (2001). *Introduction to Graph Theory.* Prentice Hall.  
8. Choset, H. et al. (2005). *Principles of Robot Motion.* MIT Press.

---




- Pre-sampling Era (1979–1989): C-space formalization, NP-hardness proofs, potential fields.  
- Sampling Advent (1990–1999): First PRM, EST, RRT.  
- Consolidation (2000–2009): Biased sampling, dynamic-domain RRT.  
- Optimality & Learning (2010–today): RRT*/PRM*, learning-based sampling.  

---

# Chapter 2 : Motion Planning Problem
![Overview of Motion Planning](https://www.youtube.com/watch?v=aC4LQuB4Cic&list=PLggLP4f-rq01Q3clJrnWFPRtpUwSlr4mG)
><sub>*Overview of Motion Planning. YouTube video, 16 March 2018. Available at: https://www.youtube.com/watch?v=aC4LQuB4Cic&list=PLggLP4f-rq01Q3clJrnWFPRtpUwSlr4mG*</sub>

- Definition: $X\_{free}, x\_I, X\_G$

- Variants:  
  - Path planning (geometry only)  
  - Kinodynamic planning (dynamics, control limits)  
  - Optimal planning (minimize cost functional)  


---

# Chapter 3 : Sampling-Based Planning

<video width="600" autoplay loop muted playsinline controls>
  <source src="{{ '/assets/videos/sampling_planning/alpha_puzzle.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>


*Source: [James J. Kuffner](http://www.kuffner.org/james/plan/)*


---

# Chapter 3 : Components of SBMP
## 3.1 Sampling Functions
- Biased, unbiased
- Uniform, obstacle-based, clearance-based, deterministic sequences (Halton, Sukharev).  

## 3.2 Local Planning
- Connect samples with feasible short paths (straight-line, steering functions, forward propagation).  

---

# Chapter 4 : Categories of Planners
## 4.1 Graph-based (PRM family)
- Multi-query  
- Reusable roadmaps  
- Example: PRM, Lazy PRM, SPARS  

**Exercise:**  
Implement PRM on 2D maze problem. 

## 4.2 Tree-based (RRT family)
- Single-query  
- Fast online growth  
- Example: RRT, RRT-Connect, EST, FMT  

**Exercise:**  
Implement RRT on 2D maze problem. 

---

# Chapter 5 : General-purpose Improvements
- Lazy checking  
- Bidirectional search  
- Sparsity (memory-efficient roadmaps)  
- Asymptotic optimality (RRT*/PRM*)  
- Informed heuristics (BIT*, AIT*)  
- Parameter tuning & auto-optimization  

---

# Chapter 6 : Optimality guarantees
- planner property: probabilistic completeness
- asymptotic optimality: RRT*, PRM*, BIT*

---

# Chapter 7 : Kinodynamic planning
- steering method
- forward propagation

---

# Chapter 8 : Alternative Frameworks
- **Motion Optimization** (CHOMP, TrajOpt, KOMO).  
- **Motion Primitives** (RMPflow, learned primitives).  
- **Search-based Planning** (A*, SBPL).  
- **Control-based Planning** (PID, LQR, MPC, RL).  

---

<!-- # Chapter 8 : Comparative Evaluations
- Large-scale OMPL benchmarks on **24 scenarios**.  
- Classical tests (maze, cubicles, apartment).  
- Manipulation problems (UR5 shelf, Baxter table).  
- Narrow passages (bugtrap, snake).  
- Dynamic systems (Dubins car, UAV).  

**Observation:**  
No single planner dominates across all tasks. Planner choice depends on robot, environment, and task.   -->

---

# Final Project
- Implement and compare RM, RRT, RRT on a chosen benchmark.  
- Evaluate success rate, runtime, and path quality.  
- Extend to one special case (kinodynamic, narrow passage, or uncertainty).  

---

