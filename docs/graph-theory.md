---
title: Graph Theory
parent: Course
layout: default
math: mathjax
---

# Graph Theory

---
<!-- 
## Motivation

Graph theory provides the mathematical foundation for **motion planning**.  
When a robot navigates through an environment, its **possible configurations** and the **feasible transitions** between them naturally form a **graph**.  
Motion planning then becomes the problem of finding a **path** through this graph that connects a start state to a goal state efficiently and safely.

Understanding graphs is therefore essential before studying **sampling-based** or **optimization-based** planning.

---

## Chapter 1. Basic Definitions

### 1.1 Graph

A **graph** is an ordered pair:

$$
G = (V, E)
$$

where:
- $V$ is a finite, nonempty set of **vertices** (also called *nodes*),  
- $E \subseteq V \times V$ is a set of **edges** representing connections between vertices.

If $(u, v) \in E$ implies $(v, u) \in E$, the graph is **undirected**;  
otherwise, it is **directed**.

---

### 1.2 Weighted Graphs

Each edge $(u, v)$ may carry a **weight** or **cost** $w(u,v) > 0$,  
representing physical quantities such as:
- distance between configurations,  
- time to traverse,  
- or energy consumption.

The weight function is formally written as:

$$
w: E \rightarrow \mathbb{R}^+
$$

Weighted graphs allow us to define **optimality**, not just feasibility.

---

### 1.3 Paths and Connectivity

A **path** is a finite sequence of vertices

$$
P = (v_0, v_1, \ldots, v_k)
$$

such that $(v_i, v_{i+1}) \in E$ for all $i = 0, \ldots, k-1$.

A graph is **connected** if for any two vertices $u, v \in V$,  
there exists at least one path connecting them.  
Otherwise, the graph is **disconnected** and consists of multiple **connected components**.

In motion planning, disconnected components represent **separate regions of free space** that cannot be reached from each other.

---

## Chapter 2. Traversal and Search

Graphs can be **explored** using systematic algorithms that expand nodes in different orders.

### 2.1 Breadth-First Search (BFS)

BFS expands all nodes at distance $1$ from the start, then all nodes at distance $2$, and so on.  
It guarantees the **shortest path** (in number of edges) in unweighted graphs.

### 2.2 Depth-First Search (DFS)

DFS explores one branch as deeply as possible before backtracking.  
It is memory-efficient but not guaranteed to find the shortest path.

---

### 2.3 Shortest Path in Weighted Graphs

In weighted graphs, we define the **cost** of a path:

$$
C(P) = \sum_{(u,v) \in P} w(u,v)
$$

The **shortest path** between vertices $s$ and $t$ is the path minimizing $C(P)$.

#### Dijkstra’s Algorithm (1959)

- Expands nodes in order of increasing cost from the start.  
- Guarantees an optimal path when all weights are positive.  

#### A-Star (A\*) Search (1968)

- Extends Dijkstra by introducing a heuristic $h(v)$ estimating the remaining cost to the goal.  
- Evaluates each node using $f(v) = g(v) + h(v)$,  
  where $g(v)$ is the cost so far.  
- Guarantees optimality if $h(v)$ never overestimates the true cost (an *admissible heuristic*).

Both algorithms underpin graph-based motion planners and are later reused inside sampling-based methods such as PRM\* and BIT\*.

---

---

## References

1. Dijkstra, E. W. (1959). *A Note on Two Problems in Connexion with Graphs.* Numerische Mathematik.  
2. Hart, P. E., Nilsson, N. J., Raphael, B. (1968). *A Formal Basis for the Heuristic Determination of Minimum Cost Paths.* IEEE Trans. Syst. Sci. Cybern.  
3. Canny, J. (1988). *The Complexity of Robot Motion Planning.* MIT Press.  
4. LaValle, S. M. (2006). *Planning Algorithms.* Cambridge University Press.  
5. Choset, H. et al. (2005). *Principles of Robot Motion.* MIT Press.  
6. Orthey, A., Chamzas, C., Kavraki, L. E. (2023). *Sampling-Based Motion Planning: A Comparative Review.* arXiv:2309.13119 [cs.RO].

---

## Suggested Next Chapter

Continue to [Sampling-Based Planning]({% link docs/motion_planning/sampling-planning.md %})  
to see how these graph-theoretic principles are applied to real robot motion. -->
