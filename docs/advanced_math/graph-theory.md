---
title: Graph Theory
parent: Course
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
.mcq input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  background: #fff;
  border: 2px solid #9ca3af;
  width: 18px;
  height: 18px;
  border-radius: 6px; /* <- makes it a rounded square */
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.mcq input[type="radio"]:checked {
  background-color: #111827;
  border-color: #111827;
  box-shadow: 0 0 0 2px #e5e7eb inset;
}
.mcq label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 15px;
  margin: 4px 0;
}
.mcq .options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 0.5rem;
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

# Graph Theory
- Table of Contents
{:toc}

---



## Books

- *Introduction to Algorithms* — Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein (2022).  
  *Comprehensive reference covering algorithm design and analysis, including graph traversal, shortest paths, and spanning trees.*

- *Introduction to Graph Theory* — Richard J. Trudeau.  
  *A visual and conceptual introduction to the fundamentals of graph theory and mathematical reasoning.*

---

## Prerequisites
- **Basic Set Theory**  
  Sets, subsets, unions, intersections, Cartesian products, and relations.
- **Data Structures**  
  Lists, stacks, queues, trees, heaps, and adjacency-based graph representations.
- **Algorithmic Complexity**  
  Big-O notation, asymptotic analysis, and time–space trade-offs.  
  Understanding how runtime grows with input size is essential for comparing graph algorithms.

<!-- - [Graph search algorithms](../graph-theory) -->
<!-- - Collision checking in robot environments -->

---
---

## Chapter 1: Motivation

Graph theory provides the mathematical foundation for reasoning about motion planning. When a robot navigates through an environment, its possible configurations and the feasible transitions between them naturally form a graph. Each node represents a state of the system, and each edge corresponds to a feasible transition. Planning then becomes the task of finding a path through this graph that connects an initial configuration to a goal configuration while respecting certain constraints such as feasibility or optimality.

### Example 1: GPS Navigation

The most intuitive real-world example of a graph is the road network used by your car’s GPS or a mapping app. Intersections are nodes; road segments are edges. To find the “best” route, we assign each edge a weight (typically travel time), computed from distance, speed limits, and live traffic. A shortest-path algorithm then finds the path with minimum total weight from start to destination.


<figure style="margin:1em 0; display:flex; justify-content:center; flex-direction:column; align-items:center;">
  <img src="{{ '/assets/images/graph_theory/googlemaps.png' | relative_url }}"
       alt="Route on a city map"
       style="width:70%; max-width:760px; height:auto; border-radius:6px;">
  <figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
    <!-- Example road-network route with edge weights representing travel time. <br> -->
    <small>Map data & imagery © Google. Source: <a href="https://maps.google.com" target="_blank" rel="noopener">Google Maps</a>.</small>
  </figcaption>
</figure>

---

### Example 2: Warehouse Robotics

Autonomous robots navigating a warehouse are another classic example. We can model the warehouse floor as a grid, where each free square is a node. Edges implicitly connect adjacent squares, representing a possible move. While a simple path-finding algorithm on this graph can find the route with the fewest moves, we can add weights to edges to represent "slower" zones or areas to avoid. This model also scales to complex multi-agent problems. To coordinate dozens of robots, the graph can be expanded to include time, allowing a search algorithm to find collision-free paths for the entire fleet.

<figure style="margin:1em 0; display:flex; justify-content:center; flex-direction:column; align-items:center;">
  <img src="{{ '/assets/images/graph_theory/warehouse.jpg' | relative_url }}"
       alt="Autonomous mobile robots in a warehouse"
       style="width:100%; max-width:760px; height:auto; border-radius:6px;">
  <figcaption style="font-size:0.9em; color:#555; text-align:center; margin-top:6px;">
    <!-- Autonomous robots navigating aisles modeled as a grid graph. <br> -->
    <small>Image source: <a href="https://www.guidanceautomation.com/5-ways-robotic-automation-can-improve-your-warehouse-efficiency/" target="_blank" rel="noopener">Guidance Automation</a>.</small>
  </figcaption>
</figure>



---

# Chapter 2. Basic Definitions

## 1.1 Graphs

A graph is one of the simplest and most powerful mathematical abstractions used to represent relationships between entities.  
Formally, a graph is an ordered pair

$$
G = (V, E)
$$

where $V$ is a finite, nonempty set of vertices (or nodes) and $E$ is a set of edges that connect pairs of vertices.  
Each edge can be represented as an ordered or unordered pair $(u, v)$, depending on whether the graph is directed or undirected.

In an undirected graph, $(u, v) \in E$ implies $(v, u) \in E$, meaning that the connection between the two vertices is symmetric. In contrast, directed graphs encode asymmetric relationships, such as one-way communication links, dependencies, or flows of information.  

The number of vertices connected to a vertex $v$ is called its degree.  
In directed graphs, we often distinguish between the in-degree and out-degree, referring to the number of incoming and outgoing edges respectively.


---

<div class="assignment" markdown="1">

### Exercise 1 — In-degree and Out-degree

Consider the directed graph shown below:

<p align="center">
  <img src="/assets/images/graph_theory/example_graph.png" alt="Example directed graph" width="400">
</p>

The graph consists of vertices  
$V = \{A, B, C, D, E\}$ and directed edges  
$E = \{(A,B), (A,C), (B,C), (C,A), (C,D), (D,E)\}$.

1. List the **incoming** and **outgoing** edges for each vertex.  
2. Compute the **in-degree** and **out-degree** of vertex **C**.  
3. Verify that the sum of all in-degrees equals the sum of all out-degrees.

<details markdown="1"><summary>Solution</summary>

1.  
- $A$: out = $\{(A,B),(A,C)\}$, in = $\{(C,A)\}$  
- $B$: out = $\{(B,C)\}$, in = $\{(A,B)\}$  
- $C$: out = $\{(C,A),(C,D)\}$, in = $\{(A,C),(B,C)\}$  
- $D$: out = $\{(D,E)\}$, in = $\{(C,D)\}$  
- $E$: out = $\emptyset$, in = $\{(D,E)\}$

2. For vertex **C**,  
in-degree = 2 (from A, B),  
out-degree = 2 (to A, D).

3. $\sum_v \text{in-degree}(v) = 6 = \sum_v \text{out-degree}(v)$ — as expected for any directed graph.

</details>

</div>


---

## 1.2 Weighted Graphs

Many problems require not only knowing whether two vertices are connected, but also how *costly* that connection is.  
A weighted graph extends the definition of $G = (V, E)$ by associating a real-valued weight function

$$
w : E \rightarrow \mathbb{R}^+
$$

that assigns a positive cost or length to each edge.  
The weight may represent distance, time, energy, or any quantitative measure of effort required to traverse that edge.  

The inclusion of weights allows us to formalize the notion of optimality.  
A path connecting two vertices may exist, but the one with minimal total weight is often of greater interest than any arbitrary path.

---

## 1.3 Paths and Connectivity

A path in a graph is a finite sequence of vertices

$$
P = (v_0, v_1, \ldots, v_k)
$$

such that each consecutive pair $(v_i, v_{i+1})$ is an edge in $E$.  
The length of a path can refer either to the number of edges it contains (for unweighted graphs) or to the sum of edge weights (for weighted graphs).

A graph is said to be connected if, for every pair of vertices $u$ and $v$, there exists at least one path from $u$ to $v$.  
Otherwise, the graph is disconnected, meaning that it consists of multiple connected components that are isolated from one another.  
Connectivity plays a central role in determining whether traversal or communication between parts of the graph is possible.


<div class="assignment" markdown="1">
<strong>Quiz.</strong>
  <div class="mcq" id="mcq-g1">
    <h4>Based on the graph below, select the correct statements.</h4>
    <p>
      <img src="{{ '/assets/images/graph_theory/graph_connected_weighted.png' | relative_url }}" alt="Connected weighted graph" style="max-width:520px;width:100%;border:1px solid #e5e7eb;border-radius:8px;">
    </p>
    <div class="options">
      <label><input type="radio" name="g1-w" value="weighted"> Weighted</label>
      <label><input type="radio" name="g1-w" value="unweighted"> Unweighted</label>
    </div>
    <div class="options">
      <label><input type="radio" name="g1-c" value="connected"> Connected</label>
      <label><input type="radio" name="g1-c" value="disconnected"> Disconnected</label>
    </div>
    <div class="actions">
      <button onclick="checkG1()">Check</button>
    </div>
    <div class="result" id="g1-result"></div>
  </div>

  <div class="mcq" id="mcq-g2">
    <h4>Based on the graph below, select the correct statements.</h4>
    <p>
      <img src="{{ '/assets/images/graph_theory/graph_disconnected_unweighted.png' | relative_url }}" alt="Disconnected unweighted graph" style="max-width:520px;width:100%;border:1px solid #e5e7eb;border-radius:8px;">
    </p>
    <div class="options">
      <label><input type="radio" name="g2-w" value="weighted"> Weighted</label>
      <label><input type="radio" name="g2-w" value="unweighted"> Unweighted</label>
    </div>
    <div class="options">
      <label><input type="radio" name="g2-c" value="connected"> Connected</label>
      <label><input type="radio" name="g2-c" value="disconnected"> Disconnected</label>
    </div>
    <div class="actions">
      <button onclick="checkG2()">Check</button>
    </div>
    <div class="result" id="g2-result"></div>
  </div>

  <script>
  function pick(name) {
    const xs = document.querySelectorAll(`input[name="${name}"]`);
    for (const x of xs) if (x.checked) return x.value;
    return null;
  }
  function mark(el, ok) {
    el.textContent = ok ? "Correct ✅" : "Try again ❌";
    el.parentElement.classList.toggle("correct", ok);
    el.parentElement.classList.toggle("incorrect", !ok);
  }
  function checkG1() {
    const w = pick("g1-w");
    const c = pick("g1-c");
    const ok = (w === "weighted") && (c === "connected");
    mark(document.getElementById("g1-result"), ok);
  }
  function checkG2() {
    const w = pick("g2-w");
    const c = pick("g2-c");
    const ok = (w === "unweighted") && (c === "disconnected");
    mark(document.getElementById("g2-result"), ok);
  }
  </script>

  <div class="mcq" id="mcq-dir1">
    <h4>  Is this graph directed or undirected?</h4>
    <p>
      <img src="{{ '/assets/images/graph_theory/graph_directed.png' | relative_url }}" alt="Directed graph"
          style="max-width:520px;width:100%;border:1px solid #e5e7eb;border-radius:8px;">
    </p>
    <div class="options">
      <label><input type="radio" name="dir1" value="directed"> Directed</label>
      <label><input type="radio" name="dir1" value="undirected"> Undirected</label>
    </div>
    <div class="actions">
      <button onclick="checkDir1()">Check</button>
    </div>
    <div class="result" id="dir1-result"></div>
  </div>

  <script>
  function pick(name) {
    const xs = document.querySelectorAll(`input[name="${name}"]`);
    for (const x of xs) if (x.checked) return x.value;
    return null;
  }
  function mark(el, ok) {
    el.textContent = ok ? "Correct ✅" : "Try again ❌";
    el.parentElement.classList.toggle("correct", ok);
    el.parentElement.classList.toggle("incorrect", !ok);
  }
  function checkDir1() {
    const v = pick("dir1");
    const ok = (v === "directed");
    mark(document.getElementById("dir1-result"), ok);
  }
  </script>
</div>


---
# Chapter 3: Graph Representations

Before we can run algorithms like BFS or Dijkstra, we must represent the abstract concept of a graph $G = (V, E)$ in a computer’s memory. The choice of representation is a fundamental design decision that has a major impact on both runtime and memory usage.

A representation is a data structure that allows us to store vertices and edges and perform key operations such as:

- Checking if an edge $(u, v)$ exists  
- Finding all neighbors of a vertex $v$  
- Adding or removing vertices and edges  
- Storing and retrieving edge weights

We will explore the three most common methods:

1. Adjacency Matrix  
2. Adjacency List  
3. Edge List

---

## 3.1 Adjacency Matrix

An adjacency matrix represents a graph with $V$ vertices as a $V \times V$ matrix (a 2D array) of booleans or weights. For any two vertices $i$ and $j$, the entry $A[i, j]$ stores information about the edge $(i, j)$:

$$
A[i, j] = 
\begin{cases}
w(i, j), & \text{if edge } (i, j) \in E \\ <br>
\infty\ \text{(or 0 for unweighted)}, & \text{otherwise}
\end{cases}
$$

For an undirected graph, the matrix is symmetric, meaning $A[i, j] = A[j, i]$.

<div class="example" markdown="1">

<strong> Example. </strong> Consider this simple weighted, undirected graph:

<p align="center">
  <img src="{{ '/assets/images/graph_theory/graph_connected_weighted.png' | relative_url }}" 
       alt="Simple 4-node weighted graph" width="400">
</p>

Its adjacency matrix representation (using $\infty$ for non-edges) would be:

$$
A =
\begin{bmatrix}
 & \mathbf{A} & \mathbf{B} & \mathbf{C} & \mathbf{D} & \mathbf{E} \\ <br>
\mathbf{A} & 0 & 2.0 & 1.5 & \infty & \infty \\ <br>
\mathbf{B} & 2.0 & 0 & \infty & 3.0 & \infty \\ <br>
\mathbf{C} & 1.5 & \infty & 0 & 2.5 & 1.0 \\ <br>
\mathbf{D} & \infty & 3.0 & 2.5 & 0 & 4.0 \\ <br>
\mathbf{E} & \infty & \infty & 1.0 & 4.0 & 0
\end{bmatrix}
$$

</div>

### Analysis

**Pros**

- Fast edge lookup: Checking if an edge $(i, j)$ exists or finding its weight is $O(1)$.  
- Simple updates: Adding or removing an edge is $O(1)$.

**Cons**

- High space complexity: Requires $O(V^2)$ space regardless of how many edges exist.  
- Inefficient for sparse graphs:
  Example with $V = 10{,}000$ vertices and each connected to $k = 15$ neighbors:  
  $E \approx V \cdot k / 2 = 75{,}000$ edges.  
  The matrix stores $V^2 = 10{,}000^2 = 10^8$ entries — over 99.9% are $\infty$.  
- Slow neighbor iteration: To find all neighbors of vertex $i$, you must scan its entire row ($O(V)$).

---

## 3.2 Adjacency List

An adjacency list is the most common representation for sparse graphs. It consists of an array (or map) of $V$ lists. The list at index $i$ stores all neighbors of vertex $i$. For a weighted graph, each entry stores both the neighbor ID and the edge weight.

<div class="example" markdown="1">

<strong> Example. </strong> Consider the following graph:

<p align="center">
  <img src="{{ '/assets/images/graph_theory/graph_4node_weighted.png' | relative_url }}" 
       alt="Simple 4-node weighted graph" width="400">
</p>

Adjacency list representation:

$$
\begin{aligned}
A &\rightarrow [(B,\, 1.0),\; (C,\, 2.5)] \\ <br>
B &\rightarrow [(A,\, 1.0),\; (C,\, 1.8)] \\ <br>
C &\rightarrow [(A,\, 2.5),\; (B,\, 1.8),\; (D,\, 3.2)] \\ <br>
D &\rightarrow [(C,\, 3.2)]
\end{aligned}
$$

</div>

### Analysis

**Pros**

- Space-efficient: $O(V + E)$ total space.  
- Fast neighbor iteration: $O(\text{degree}(i))$, ideal for BFS/Dijkstra.

**Cons**

- Slower edge lookup: To check if $(i, j)$ exists, you must scan vertex $i$’s list ($O(\text{degree}(i))$).

---

## 3.3 Edge List

An edge list is the simplest of all representations.  
It is a single list (or array) containing all edges in the graph.  
For a weighted graph, each entry is a tuple $(u, v, w)$.

<div class="example" markdown="1">

<strong>Example. </strong> Consider the following graph:

<p align="center">
  <img src="{{ '/assets/images/graph_theory/graph_5node_weighted.png' | relative_url }}" 
       alt="Simple 4-node weighted graph" width="400">
</p>

Edge list representation:


$$
E = [
(A,\, B,\, 2.2),\;
(A,\, D,\, 3.1),\;
(B,\, C,\, 1.7),\;
(C,\, D,\, 2.8),\;
(C,\, E,\, 1.5),\;
(D,\, E,\, 2.3)
]
$$


</div>

### Analysis

**Pros**

- Very simple: Minimal implementation complexity.  
- Space-efficient: $O(E)$.  
- Ideal for edge-based algorithms such as Kruskal’s Minimum Spanning Tree.

**Cons**

- Slow neighbor iteration: Finding all neighbors of $i$ requires scanning all $E$ edges ($O(E)$).  
- Slow node-centric operations: Adding nodes or checking degrees is inefficient.

---

## 3.4 Summary and Comparison

The best representation depends entirely on the graph’s density and the operations you need.

| **Operation** | **Adjacency Matrix** | **Adjacency List** | **Edge List** |
|:--------------|:-------------------:|:------------------:|:--------------:|
| **Space** | $O(V^2)$ | $O(V + E)$ | $O(E)$ |
| **Find neighbors of $v$** | $O(V)$ | $O(\text{degree}(v))$ | $O(E)$ |
| **Check if edge $(u,v)$ exists** | $O(1)$ | $O(\text{degree}(u))$ | $O(E)$ |
| **Add edge** | $O(1)$ | $O(1)$ | $O(1)$ |
| **Remove edge $(u,v)$** | $O(1)$ | $O(\text{degree}(u))$ | $O(E)$ |

---

### Summary Takeaway

- Use **Adjacency Matrix** for **dense** graphs or frequent edge lookups.  
- Use **Adjacency List** for **sparse** graphs and search algorithms (BFS, Dijkstra, A*).  
- Use **Edge List** for **edge-sorted** or **edge-centric** algorithms (Kruskal, clustering, etc.).

---

# Chapter 4. Traversal and Search

Once a graph is defined, we can explore it systematically using *search algorithms*. Traversal algorithms visit nodes according to specific rules, allowing us to enumerate vertices, discover components, or find optimal paths between nodes. Although many variants exist, two of the most fundamental search paradigms are breadth-first and depth-first exploration.

---

## 2.1 Breadth-First Search (BFS)

Breadth-First Search explores a graph in layers, visiting all vertices at distance one from the starting node before proceeding to vertices at distance two, and so on. This systematic expansion guarantees that the first time a vertex is reached, it is reached via the shortest possible path in terms of edge count.  

The algorithm maintains a queue of vertices to be explored. When a vertex is dequeued, all of its unvisited neighbors are enqueued for later exploration. The process continues until the queue is empty or a target vertex is reached.

<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">

<strong>Algorithm 1:</strong> Breadth-First Search

<pre>
<strong>procedure</strong> BFS(G, s)
    for each vertex v in G do
        visited[v] ← false
        parent[v] ← NIL
    queue ← empty queue
    visited[s] ← true
    ENQUEUE(queue, s)
    while queue is not empty do
        u ← DEQUEUE(queue)
        for each neighbor v of u do
            if not visited[v] then
                visited[v] ← true
                parent[v] ← u
                ENQUEUE(queue, v)
    <strong>return</strong> parent
</pre>
</div>

<div class = 'note' markdown='1'>
<strong>Note.</strong>
The array `parent` records the predecessor of each vertex along the discovered path, enabling reconstruction of the shortest path by backtracking from the goal to the start.
</div>

![BFS for Motion Planning](https://www.youtube.com/watch?v=x6cGmE0XpY8&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=43)
><sub>*Breadth-First Search for Robot Motion Planning. YouTube video, Nov 12, 2017. Available at: https://www.youtube.com/watch?v=x6cGmE0XpY8&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=43*</sub>

<div class="note">
    Demonstrates step-by-step how the Breadth-First Search algorithm explores a grid to compute a <em>distance map</em> from a start position. The video builds intuition for BFS as a wavefront expansion process, using a queue to visit nodes in increasing order of distance. In robotics, BFS underpins many grid-based planning and navigation systems, such as occupancy-grid mapping or maze-solving robots. It provides a foundation for understanding how robots can discover feasible paths by systematically expanding reachable states. Although simple and optimal for unweighted environments, it also motivates more advanced planners like Dijkstra’s and A* for continuous or weighted spaces.
    <div style="font-size: 0.85em; color: #555; margin-top: 0.5em;">
        Source: Aaron Becker - YouTube  
        <a href="https://www.youtube.com/watch?v=x6cGmE0XpY8&list=PLYZT24lofrjXcuu1iBNWu-NprW2wZD3zu&index=43" target="_blank" style="color: #2a7ae2; text-decoration: underline; margin-left: 8px;">Watch here</a>
    </div>
</div>

---

## 2.2 Depth-First Search (DFS)

While BFS explores in expanding layers, Depth-First Search follows a single branch of the graph as far as possible before backtracking.  
It uses a stack (either explicit or via recursion) to remember the path being followed.  
This makes DFS more memory-efficient than BFS, though it does not guarantee finding the shortest path.

DFS is particularly useful for tasks such as detecting cycles, testing graph connectivity, and performing topological sorting in directed acyclic graphs.

<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">

<strong>Algorithm 2:</strong> Depth-First Search

<pre>
<strong>procedure</strong> DFS(G, s)
    for each vertex v in G do
        visited[v] ← false
    STACK ← empty stack
    PUSH(STACK, s)
    while STACK is not empty do
        u ← POP(STACK)
        if not visited[u] then
            visited[u] ← true
            for each neighbor v of u in reverse order do
                if not visited[v] then
                    PUSH(STACK, v)
</pre>
</div>
By changing the order in which neighbors are pushed onto the stack, DFS can yield different traversal sequences while maintaining the same overall structure.

---

## 2.3 Shortest Paths in Weighted Graphs

In graphs where edges carry positive weights, we are often interested in the shortest path between two vertices, that is, the path with the minimal total cost.  
For a path $P = (v_0, v_1, \ldots, v_k)$, its cost is given by

$$
C(P) = \sum_{i=0}^{k-1} w(v_i, v_{i+1})
$$

The two most classical algorithms for finding shortest paths are *Dijkstra’s algorithm* and *A\* search*.

---

<!-- ## Coding Exercise: Implement DFS and Visualize the Traversal

{% raw %}
<!-- ====== CDNs (include ONCE per page) ====== -->


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

<!-- ================== Load Pyodide & CodeMirror ================== -->
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/theme/monokai.css">
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.js"></script>
<script src="https://cdn.jsdelivr.net/npm/codemirror@5.65.16/mode/python/python.js"></script>


## Coding Exercise 2: DFS Traversal and Tree Construction

In this exercise, you will implement an iterative Depth-First Search (DFS) on a fixed undirected graph:

```python
def dfs_order(G, start)
```

Your function should explore the graph starting from the node `start` and return:

- `order`: a list of nodes in the order they are first discovered,  
- `parent`: a dictionary mapping each node to its parent in the DFS tree  
  (the start node should have `parent[start] = None`)

After you implement the function, click **Run ▶** below to animate your DFS traversal.  
The visualization will show:

- **red edges** for the growing DFS tree,  
- **light-gray edges** for non-tree edges,  
- a **green start node**,  
- the **current node** highlighted during traversal,  
- and the **discovery order** displayed above each visited node.

<details> <summary><strong>💡 Hints</strong></summary> <ul> <li> Use a Python <em>list</em> as a stack to implement DFS iteratively: push nodes onto the stack, and pop from the end. </li> <li> When you first pop a node from the stack, mark it as visited, record its parent, and append it to <code>order</code>. </li> <li> To ensure deterministic behavior, push neighbors in a <code>sorted(..., reverse=True)</code> order so that the smallest neighbor is explored first. </li> <li> Only push neighbors onto the stack if they have not yet been visited. </li> </ul> </details>


<div class="exercise-card">
  <textarea id="code">def dfs_order(G, start):&#10;&#9;"""&#10;&#9;Implement Depth-First Search on the given undirected NetworkX graph G,&#10;&#9;starting from node `start`.&#10;&#10;&#9;Return:&#10;&#9;&#9;order  : list of nodes in discovery order&#10;&#9;&#9;parent : dict mapping node -&gt; its parent in the DFS tree (start has None)&#10;&#10;&#9;Hints:&#10;&#9;&#9;- Use an explicit stack (list) for iterative DFS.&#10;&#9;&#9;- When visiting a node for the first time, record its parent and append it to 'order'.&#10;&#9;&#9;- Push neighbors in a consistent order (e.g., sorted) to get deterministic output.&#10;&#9;"""&#10;&#9;order = []&#10;&#9;parent = {start: None}&#10;&#9;visited = set()&#10;&#10;&#9;# TODO: replace with your DFS&#10;&#10;&#9;return order, parent&#10;</textarea>



  <div class="toolbar">
    <label>Start node:
      <select id="start-node">
        <option>A</option>
        <option selected>B</option>
        <option>C</option>
        <option>D</option>
        <option>E</option>
        <option>E</option>
        <option>F</option>
        <option>G</option>
      </select>
    </label>
    <button id="run" class="btn">Run ▶</button>
    <button id="show-solution" class="btn">Show Solution 💡</button>
    <span id="status" class="muted"></span>
  </div>

  <div id="solution-box">
    <b>✅ Reference Solution:</b>
    <pre style="white-space: pre-wrap; font-size:13px; background:#fff; padding:8px; border-radius:5px; border:1px solid #ddd;">
def dfs_order(G, start):
    order = []
    parent = {start: None}
    visited = set()
    stack = [(start, None)]
    while stack:
        node, par = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        parent[node] = par
        order.append(node)
        # deterministic neighbor order
        for nb in sorted(G.neighbors(node), reverse=True):
            if nb not in visited:
                stack.append((nb, node))
    return order, parent
    </pre>
  </div>

  <div class="outbox">
    <div class="muted">Output:</div>
    <img id="plot" alt="DFS visualization will appear here">
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python", theme: "monokai", lineNumbers: true, indentUnit: 4, tabSize: 4, lineWrapping: true
  });

  const pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/" });
  await pyodide.loadPackage(["numpy", "matplotlib", "micropip"]);
  await pyodide.runPythonAsync(`import micropip; await micropip.install("networkx"); await micropip.install("imageio")`);

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
  const startSel = document.getElementById("start-node");

  runBtn.addEventListener("click", async () => {
    runBtn.disabled = true; status.textContent = "Running…";
    const startNode = startSel.value;
    const codeUser = editor.getValue();

    const script = `import matplotlib\nmatplotlib.use("Agg")\nimport matplotlib.pyplot as plt\nimport networkx as nx\nfrom io import BytesIO\nimport base64\nfrom collections import deque\nimport imageio.v2 as imageio\n\n# ---------- Hidden: build a larger graph (8 nodes) ----------\nG = nx.Graph()\nG.add_edges_from([\n\t("A","B"), ("A","C"),\n\t("B","C"), ("B","D"),\n\t("C","D"),\n\t("D","E"),\n\t("E","F"), ("F","G"), ("G","H"),\n\t("C","F"), ("D","G")\n])\npos = {\n\t"A": (-2.0,  1.4),\n\t"B": (-2.0, -0.3),\n\t"C": (-0.7,  0.6),\n\t"D": ( 0.8, -0.4),\n\t"E": ( 2.0, -1.0),\n\t"F": ( 0.0,  1.5),\n\t"G": ( 1.5,  1.0),\n\t"H": ( 3.0,  0.7)\n}\n\n# ---------- Student function ----------\n${codeUser}\n\n# ---------- Run DFS ----------\nstart = "${startNode}"\norder, parent = dfs_order(G, start)\n\nresult = None\n\nif not order:\n\tfig, ax = plt.subplots(figsize=(9.0, 6.5), dpi=150)\n\tax.axis('off')\n\tbuf = BytesIO()\n\tplt.savefig(buf, format=\"png\", dpi=150)\n\tplt.close(fig)\n\tresult = \"data:image/png;base64,\" + base64.b64encode(buf.getvalue()).decode()\nelse:\n\ttree_edges_full = []\n\tfor v, p in parent.items():\n\t\tif p is not None and G.has_edge(v, p):\n\t\t\ta, b = sorted((v, p))\n\t\t\tif (a, b) not in tree_edges_full:\n\t\t\t\ttree_edges_full.append((a, b))\n\n\tdisc_index = {v: i + 1 for i, v in enumerate(order)}\n\n\tframes = []\n\n\tfor step in range(1, len(order) + 1):\n\t\tvisited_step = set(order[:step])\n\t\tcurr = order[step - 1]\n\n\t\ttree_edges_step = []\n\t\tfor v in visited_step:\n\t\t\tp = parent.get(v, None)\n\t\t\tif p is not None and G.has_edge(v, p):\n\t\t\t\ta, b = sorted((v, p))\n\t\t\t\tif (a, b) not in tree_edges_step:\n\t\t\t\t\ttree_edges_step.append((a, b))\n\n\t\tfig, ax = plt.subplots(figsize=(9.0, 6.5), dpi=150)\n\t\tax.axis('off')\n\n\t\t# Base graph\n\t\tnx.draw_networkx_edges(G, pos, width=1.6, edge_color=\"#d0d0d0\", ax=ax)\n\n\t\tnon_tree = [e for e in G.edges() if tuple(sorted(e)) not in tree_edges_step]\n\t\tif non_tree:\n\t\t\tnx.draw_networkx_edges(G, pos, edgelist=non_tree, width=1.8, edge_color=\"#b0b0b0\", ax=ax)\n\n\t\tif tree_edges_step:\n\t\t\tnx.draw_networkx_edges(G, pos, edgelist=tree_edges_step, width=3.0, edge_color=\"red\", ax=ax)\n\n\t\tnode_colors = []\n\t\tfor v in G.nodes():\n\t\t\tif v == start:\n\t\t\t\tnode_colors.append(\"#22c55e\")\n\t\t\telif v == curr:\n\t\t\t\tnode_colors.append(\"#facc15\")\n\t\t\telif v in visited_step:\n\t\t\t\tnode_colors.append(\"white\")\n\t\t\telse:\n\t\t\t\tnode_colors.append(\"#e5e7eb\")\n\n\t\tnx.draw_networkx_nodes(G, pos,\n\t\t\tnode_color=node_colors,\n\t\t\tedgecolors=\"black\",\n\t\t\tnode_size=1600,\n\t\t\tlinewidths=2.4,\n\t\t\tax=ax)\n\n\t\tnx.draw_networkx_labels(G, pos, font_size=16, font_weight=\"bold\", ax=ax)\n\n\t\tfor v in visited_step:\n\t\t\ti = disc_index[v]\n\t\t\tx, y = pos[v]\n\t\t\tax.annotate(\n\t\t\t\tstr(i),\n\t\t\t\txy=(x, y),\n\t\t\t\txycoords='data',\n\t\t\t\ttextcoords='offset points', xytext=(0, 28),\n\t\t\t\tha='center', va='bottom', fontsize=13,\n\t\t\t\tcolor=\"#222\",\n\t\t\t\tbbox=dict(boxstyle=\"round,pad=0.25\", facecolor='white', edgecolor='none', alpha=0.9))\n\n\t\tbuf = BytesIO()\n\t\tplt.savefig(buf, format=\"png\", dpi=150)\n\t\tplt.close(fig)\n\t\tbuf.seek(0)\n\t\tframes.append(imageio.imread(buf))\n\n\tgif_buf = BytesIO()\n\t# slower animation: 1.0 sec per frame\n\timageio.mimsave(gif_buf, frames, format=\"GIF\", duration=1.0)\n\tgif_buf.seek(0)\n\tresult = \"data:image/gif;base64,\" + base64.b64encode(gif_buf.getvalue()).decode()\n\nresult
`.trim();

    try {
      const dataURL = await pyodide.runPythonAsync(script);
      img.src = dataURL;
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


---

### Dijkstra’s Algorithm (1959) [<a href="#ref1">1</a>]

Dijkstra’s algorithm generalizes BFS to weighted graphs by always expanding the vertex with the lowest cumulative cost from the start.  
It maintains a *priority queue* of vertices, ordered by their current best-known distance.  

<div class="note" markdown="1">
<strong>Quick Fact — Priority Queue.</strong>  
Dijkstra’s algorithm relies on a priority queue to always expand the vertex with the smallest tentative distance.  
Using a binary heap keeps insertions and extractions logarithmic in the number of vertices, making the overall complexity  
$\mathcal{O}(E + V\log V)$.
</div>

Once a vertex has been expanded, its shortest distance is guaranteed and never updated again.

<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">
<strong>Algorithm 3:</strong> Dijkstra’s Shortest Path

<pre>
<strong>procedure</strong> DIJKSTRA(G, s)
    for each vertex v in G do
        dist[v] ← ∞
        parent[v] ← NIL
    dist[s] ← 0
    Q ← priority queue ordered by dist
    INSERT(Q, s)
    while Q is not empty do
        u ← EXTRACT-MIN(Q)
        for each neighbor v of u do
            alt ← dist[u] + w(u, v)
            if alt < dist[v] then
                dist[v] ← alt
                parent[v] ← u
                DECREASE-KEY(Q, v, alt)
    <strong>return</strong> dist, parent
</pre>

</div>
The algorithm runs in $\mathcal{O}((V + E)\log V)$ time when implemented with a binary heap. It guarantees optimality when all edge weights are positive.

The efficiency of Dijkstra’s algorithm depends primarily on how the priority queue is implemented. Each vertex is inserted once into the queue and may be updated (via a 'decrease-key' operation) whenever a shorter path is found. Using a binary heap, both 'insertion' and 'extraction' of the minimum element take $O(\log V)$ time. Since every edge can cause at most one key update, there are up to $O(E)$ decrease-key operations and $O(V)$ extractions overall. This yields a total running time of $O((V + E)\log V)$, which simplifies to $O(E\log V)$ for sparse graphs where $E \approx O(V)$.  
For dense graphs, where $E$ grows quadratically with $V$, the complexity approaches $O(V^2 \log V)$. In practice, the algorithm performs efficiently on most real-world graphs because they are typically sparse.

---

### A-Star (A*) Search (1968) [<a href="#ref2">2</a>]

A\* extends Dijkstra’s algorithm by adding a heuristic function $h(v)$ that estimates the remaining cost from a vertex $v$ to the goal. This heuristic guides the search toward promising directions, potentially reducing the number of expanded nodes.

Each vertex maintains two quantities:  
$g(v)$ — the cost from the start to $v$, and  
$f(v) = g(v) + h(v)$ — the estimated total cost through $v$.  

The algorithm always expands the vertex with the lowest $f(v)$. If the heuristic is admissible (never overestimates the true cost), the resulting path is guaranteed to be optimal.

<div style="border-left:4px solid #16a34a;background:#ecfdf5;padding:14px 18px;border-radius:6px;margin:1.2em 0;font-family:JetBrains Mono,Menlo,monospace;font-size:14px;line-height:1.55;" markdown="1">
<strong>Algorithm 4:</strong> A-Star Search

<pre>
<strong>procedure</strong> ASTAR(G, s, goal, h)
    for each vertex v in G do
        g[v] ← ∞
        f[v] ← ∞
        parent[v] ← NIL
    g[s] ← 0
    f[s] ← h(s)
    OPEN ← priority queue ordered by f
    INSERT(OPEN, s)
    while OPEN is not empty do
        u ← EXTRACT-MIN(OPEN)
        if u = goal then
            <strong>return</strong> RECONSTRUCT-PATH(parent, u)
        for each neighbor v of u do
            tentative ← g[u] + w(u, v)
            if tentative < g[v] then
                g[v] ← tentative
                f[v] ← g[v] + h(v)
                parent[v] ← u
                INSERT-OR-DECREASE(OPEN, v, f[v])
</pre>
</div>
When $h(v) = 0$ for all vertices, A\* reduces to Dijkstra’s algorithm. When $h$ is perfectly accurate, the algorithm expands only the nodes along the optimal path.

---

Together, BFS, DFS, Dijkstra, and A\* form the foundation of graph search theory, illustrating how the structure of a graph and the information available about costs or heuristics influence the efficiency and guarantees of traversal algorithms.

---
<div class="assignment" markdown="1">

### Exercise 2: Tracing Dijkstra's Algorithm

Consider the following weighted graph, with start node A.

<p align="center">
  <img src="{{ '/assets/images/graph_theory/dijkstra_exercise.png' | relative_url }}" alt="A simple weighted graph for Dijkstra exercise" width="450">
</p>

Trace Dijkstra's algorithm. Fill out a table showing the `dist` and `parent` for each node, and list the order in which nodes are `EXTRACT-MIN`ed from the priority queue.

<details markdown="1"><summary>Solution</summary>

![Dijkstra]({{ '/assets/images/graph_theory/dijkstra_animation.gif' | relative_url }})

Priority Queue (Q): `[ (A, 0) ]`

1. Extract: A (dist=0)  
   - Visit B: `dist[B] = 2`, `parent[B] = A` → Add (B, 2)  
   - Visit C: `dist[C] = 5`, `parent[C] = A` → Add (C, 5)  
   - Q = `[ (B, 2), (C, 5) ]`

2. Extract: B (dist=2)  
   - Visit C: `2 + 2 = 4 < 5` → Update `dist[C] = 4`, `parent[C] = B`  
   - Visit D: `2 + 6 = 8` → Add (D, 8)  
   - Q = `[ (C, 4), (D, 8) ]`

3. Extract: C (dist=4)  
   - Visit D: `4 + 1 = 5 < 8` → Update `dist[D] = 5`, `parent[D] = C`  
   - Q = `[ (D, 5) ]`

4. Extract: D (dist=5)  
   - Visit E: `5 + 1 = 6 < 10` → Update `dist[E] = 6`, `parent[E] = D`  
   - Q = `[ (E, 6) ]`

5. Extract: E (dist=6)  
   - Q = `[ ]` (empty)

Final State:

| Node | dist | parent |
|:-----|:----:|:------:|
| A    | 0    | NIL    |
| B    | 2    | A      |
| C    | 4    | B      |
| D    | 5    | C      |
| E    | 6    | D      |

Extraction Order: A, B, C, D, E



</details>
</div>


<div class="assignment" markdown="1">
### Exercise 3: A* vs. Dijkstra

Now, use the same graph from the previous exercise. We want to find a path from A to E. We are given the following admissible heuristic values $h(v)$:

| Node | $h(v)$ (Est. cost to E) |
|:-----|:-----------------------:|
| A    | 5                       |
| B    | 4                       |
| C    | 2                       |
| D    | 1                       |
| E    | 0                       |

Trace the A\* algorithm. What is the $f(v) = g(v) + h(v)$ value for each node when it is extracted? Notice which nodes Dijkstra expanded that A\* did not need to (or vice-versa).

<details markdown="1"><summary>Solution</summary>
* `g[v]` is cost-from-start (same as `dist` in Dijkstra).
* `f[v]` is priority `g[v] + h(v)`.

Priority Queue (OPEN): `[ (A, f=5) ]` (g=0, h=5)

1.  Extract: A (g=0, f=5)
    * Visit B: `g[B]` = 2. `f[B]` = `g[B] + h(B)` = 2 + 4 = 6. Add (B, 6) to Q.
    * Visit C: `g[C]` = 5. `f[C]` = `g[C] + h(C)` = 5 + 2 = 7. Add (C, 7) to Q.
    * **Q:** `[ (B, 6), (C, 7) ]`

2.  Extract: B (g=2, f=6)
    * Visit C: `g = 2 + 2 = 4`. This is `< 5`.
        * Update `g[C]` = 4. `f[C]` = 4 + 2 = 6. DECREASE-KEY(C, 6).
    * Visit D: `g = 2 + 6 = 8`.
        * `g[D]` = 8. `f[D]` = 8 + 1 = 9. Add (D, 9) to Q.
    * **Q:** `[ (C, 6), (D, 9) ]`

3.  Extract: C (g=4, f=6)
    * Visit D: `g = 4 + 1 = 5`. This is `< 8`.
        * Update `g[D]` = 5. `f[D]` = 5 + 1 = 6. DECREASE-KEY(D, 6).
    * **Q:** `[ (D, 6)`

4.  Extract: D (g=5, f=6)
    * Visit E: `g = 5 + 1 = 6`. This is `< 10`.
        * Update `g[E]` = 6. `f[E]` = 6 + 0 = 6. DECREASE-KEY(E, 6).
    * **Q:** `[ (E, 6) ]`

5. Extract: E (g=6, f=6)
    * **Goal Reached!** Return path E $\to$ D $\to$ C $\to$ B $\to$ A.

**Observation:** The final path and costs are identical. The *order* of exploration was A, B, C, D, E. In this specific case, the heuristic was good enough to guide the search along the optimal path, but it didn't save any expansions because the "cheapest-first" path (A-B-C-D-E) also happened to be the one Dijkstra would have explored.
</details>
</div>

---

### Traversal Cheat Sheet

The following table summarizes the core properties of the traversal algorithms introduced so far.

| Algorithm | Works on weighted? | Finds shortest path? | Typical data structure | Time complexity (unweighted) |
| :--- | :--- | :--- | :--- | :--- |
| **BFS** | No (unweighted only) | Yes, fewest edges | Queue | $\mathcal{O}(V + E)$ |
| **DFS** | Yes (ignores weights) | No (arbitrary path) | Stack (or recursion) | $\mathcal{O}(V + E)$ |
| **Dijkstra** | Yes (positive weights) | Yes, minimum total cost | Priority queue | $\mathcal{O}((V + E)\log V)$ |
| **A\*** | Yes (positive weights) | Yes (with admissible heuristic) | Priority queue | $\mathcal{O}((V + E)\log V)$ in practice, often fewer expansions |

<div class="note" markdown="1">
**Rule of thumb.**

- Use **BFS** if all edges have equal cost and you only care about fewest steps.
- Use **Dijkstra** if edges have different positive costs and no heuristic is available.
- Use **A\*** if you have a good heuristic and want to guide the search.
- Use **DFS** when you care about exploring structure (components, cycles) rather than finding shortest paths.
</div>

---

## References

1.  <a id="ref1"></a>Dijkstra, E. W. (1959). *A note on two problems in connexion with graphs.* Numerische Mathematik, 1(1), 269–271.
2.  <a id="ref2"></a>Hart, P. E., Nilsson, N. J., & Raphael, B. (1968). *A Formal Basis for the Heuristic Determination of Minimum Cost Paths.* IEEE Transactions on Systems Science and Cybernetics, 4(2), 100–107.
3. <a id="ref3"></a>Cormen, T. H., Leiserson, C. E., Rivest, R. L., & Stein, C. (2022). *Introduction to Algorithms* (4th ed.). MIT Press.
