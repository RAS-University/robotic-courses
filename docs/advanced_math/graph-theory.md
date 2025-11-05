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

---

## Motivation

Graph theory provides the mathematical foundation for reasoning about motion planning. When a robot navigates through an environment, its possible configurations and the feasible transitions between them naturally form a graph. Each node represents a state of the system, and each edge corresponds to a feasible transition. Planning then becomes the task of finding a path through this graph that connects an initial configuration to a goal configuration while respecting certain constraints such as feasibility or optimality.

---

# Chapter 1. Basic Definitions

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

<div class="mcq" id="mcq-g1">
  <h4>Quiz 1 — Based on the graph below, select the correct statements.</h4>
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
  <h4>Quiz 2 — Based on the graph below, select the correct statements.</h4>
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
  <h4>Quiz — Is this graph directed or undirected?</h4>
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


---

# Chapter 2. Traversal and Search

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

### Dijkstra’s Algorithm (1959)

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

### A-Star (A*) Search (1968)

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

## References

<!-- add references -->

<!-- 1. Dijkstra, E. W. (1959). *A Note on Two Problems in Connexion with Graphs.* Numerische Mathematik.  
2. Hart, P. E., Nilsson, N. J., Raphael, B. (1968). *A Formal Basis for the Heuristic Determination of Minimum Cost Paths.* IEEE Trans. Syst. Sci. Cybern.  
3. Canny, J. (1988). *The Complexity of Robot Motion Planning.* MIT Press.  
4. LaValle, S. M. (2006). *Planning Algorithms.* Cambridge University Press.  
5. Choset, H. et al. (2005). *Principles of Robot Motion.* MIT Press.  
6. Orthey, A., Chamzas, C., Kavraki, L. E. (2023). *Sampling-Based Motion Planning: A Comparative Review.* arXiv:2309.13119 [cs.RO]. -->

