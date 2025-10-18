---
title: Sampling-Based Planning
parent: Courses
layout: default
math: mathjax
---

<style>
/* Lightweight styling for callouts and quizzes */
.definition, .assignment, .example, .slide {
  border-left: 4px solid #0ea5e9; padding: 0.75rem 1rem; margin: 1rem 0; background:#0ea5e90d;
}
.slide { border-left-color:#22c55e; background:#22c55e0d; }
.assignment { border-left-color:#f59e0b; background:#f59e0b0d; }
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

# Chapter 1: Introduction
<!-- ## The Planner's Mind - A Story of Representation -->

At its heart, motion planning asks a simple question: how does a robot decide to move from point A to point B without hitting anything? While the question seems straightforward, the answer is profoundly complex. For a robot with many joints, the number of possible positions - its "configuration space" - is astronomically large. The key to solving this intractable problem lies not in brute force, but in intelligent representation: the art of simplifying a complex physical world into an abstract map that a computer can understand. To explore this foundational idea, we will begin with a classic, intuitive example: a small, wheeled robot navigating a 2D maze.

![Robot in 2D Maze]({{ '/assets/images/sampling_based_planning/maze.png' | relative_url }})

The robot's goal is simple: travel from a starting point (blue) to an end point (green). It has no "bird's-eye view" and can only sense its immediate surroundings. How can we give this robot the ability to find its way? We must first teach it how to think about the maze.



## From a Physical Maze to an Abstract Graph

The robot's world of "floors" and "walls" is too literal. We can create a more powerful mental model by simplifying the maze into its two core components: the locations of interest where the robot can actually be, and the possible moves or direct paths between adjacent locations. By focusing on these ideas, we can transform the physical maze into an abstract map of connections. Each open square becomes a dot, and each possible move becomes a line connecting the corresponding dots. What we have just created is a graph.

<div class="definition">
<strong>Definition.</strong> A graph is a mathematical structure used to represent relationships between objects.  
Formally, a graph is an ordered pair:

\[
G = (V, E)
\]

where: <br>
- \(V\) is a non-empty set of vertices (or nodes), and  
<br>
- \(E\) is a set of edges.
<br>
An edge \( e \in E \) is typically represented as a pair of vertices:

\[
e = (u, v), \quad \text{where } u, v \in V.
\]

If edges are unordered pairs \(\{u,v\}\), the graph is undirected.  
<br>
If edges are ordered pairs \((u,v)\), the graph is directed.
</div>




![Building a Graph]({{ '/assets/images/sampling_based_planning/build_graph.gif' | relative_url }})

This is a monumental leap. The robot's problem is no longer about navigating a physical space; it's about finding a path within this abstract network. We have given it a mind's eye. This representation is the common language for nearly all planning algorithms that follow.

# Chapter 2: History of Motion Planning

With our graph representation in hand, we can now explore the history of motion planning, using our maze to understand how different strategies evolved.

## The Early Days: Exhaustive Search and the Complexity Wall

Early attempts at motion planning in the 1980s tried to be mathematically perfect. They involved precisely defining the robot's shape and all obstacles, a concept known as Configuration Space. While powerful, these "complete" algorithms tried to solve the problem for every possible path. For our maze, this would be like listing every single possible sequence of moves. It was quickly proven that for complex robots, this problem is NP-hard. In simple terms, this means that as the problem gets bigger, the time required to find a perfect solution explodes exponentially. Our simple maze is solvable, but a slightly larger maze or a robot with more joints would be computationally impossible to solve this way. The quest for mathematical perfection had hit a wall.

## A Reactive Detour: Artificial Potential Fields

One clever idea was to stop planning and start reacting. The Artificial Potential Fields method, popular in the late 1980s, treated the robot like a marble rolling on a contoured surface. The goal would be a low point, pulling the robot towards it, while obstacles (walls) would be high points, pushing the robot away. This worked well for simple, open environments. However, in our maze, the robot could easily get stuck in a dead-end (a "local minimum") without ever reaching the goal. It was a step forward in creating dynamic motion, but it wasn't a reliable planner.


<div class="definition">
<strong>Definition.</strong> Formally, the total potential function \( U(q) \) is defined as:

\[
U(q) = U_{\text{att}}(q) + U_{\text{rep}}(q)
\]

where: <br>

- \( q \in \mathbb{R}^n \) is the configuration of the robot.  <br>
- \( U_{\text{att}}(q) \) is the attractive potential guiding the robot toward the goal.  <br>
- \( U_{\text{rep}}(q) \) is the repulsive potential preventing collisions with obstacles. <br>
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
- \( \zeta \) — attractive gain,  <br>
- \( \eta \) — repulsive gain,  <br>
- \( d(q) \) — distance from \( q \) to the nearest obstacle,  <br>
- \( d_0 \) — radius of influence of the obstacle. <br>

The force acting on the robot is the negative gradient of the potential:

\[
F(q) = - \nabla U(q)
\]

so the robot moves in the direction of steepest descent of the potential field.
</div>


![Potential Fields]({{ '/assets/images/sampling_based_planning/potential.gif' | relative_url }})

## The Breakthrough: Searching the Graph

Before adopting a complex strategy, one might consider a simple heuristic. For our maze, a possible solution could be the "wall-follower" rule: always keep a wall to your left (or right). This can solve simple mazes, but it's not a general solution. It can fail in mazes with islands or complex layouts, and it provides no guarantees about finding the shortest or most efficient path. What was needed was a systematic, robust method.

The most successful solution returned to our graph representation. If the maze is a graph, then planning is simply a matter of finding the best path through that graph. This led to the rise of graph search algorithms, which remain a cornerstone of robotics today.

## Dijkstra's Algorithm: The Cost-Conscious Explorer

Let's make our maze more interesting. Imagine some floor tiles are sand, taking more energy to cross. We can represent this by making our graph weighted—an edge over pavement might have a weight of 1, while an edge over sand has a weight of 5. Now, we don't just want any path; we want the cheapest path. Dijkstra's Algorithm is the classic and definitive solution for this. It operates by starting at (S) and exploring outwards like a ripple in a pond. Crucially, it always expands from the vertex that has the lowest total cost discovered so far. It meticulously builds a map of the cheapest way to get to every reachable vertex from the start and doesn't stop until it has found the cheapest path to the goal (G). The result is a guaranteed optimal path in terms of total weight. Its weakness is that it's "uninformed" - it explores in all directions equally, because it has no sense of direction. Still, its ability to find the provably best path on a known map was a revolutionary step.
![Dijkstra's shortest path]({{ '/assets/images/sampling_based_planning/dijkstra.gif' | relative_url }})

(For a formal treatment of other graph properties and search algorithms, please refer to the upcoming chapter on [Graph Theory in the Advanced Mathematical Foundations section](../graph-theory))

## Final step: The Limits of Grids and the Curse of Dimensionality

The grid-based approach with Dijkstra’s algorithm feels powerful, a method that guarantees the best possible path on the grid we’ve defined. But what happens when the problem gets more complicated? The simple truth is that this exhaustive approach fails due to the The Curse of Dimensionality.

Let's move from our simple 2D robot to a more realistic one, like a robotic arm used in manufacturing. A common arm might have 7 joints (7-DOF). To define the robot's complete pose, we need to know the angle of every single one of those 7 joints. This 7-dimensional space of all possible joint angles is the robot's Configuration Space (C-space). Now, imagine trying to create a grid for this C-space. To keep it simple, let's say we only divide each joint's range of motion into 10 discrete steps. For one joint, that's 10 grid cells. For two joints, it's $10x10 = 100$ cells. For our 7-DOF arm, it becomes $10^7 = 10 000 000$ cells. If we wanted a more reasonable resolution, say 100 steps per joint, we would need $100^7 = 10^{14}$ cells. No modern computer has enough memory to store such a grid, let alone run Dijkstra's on it.

This problem isn't unique to robot arms. Imagine a self-driving car navigating a city. If the map is very large and the resolution is high (e.g., centimeter-level precision to avoid small obstacles), the number of grid cells again becomes astronomically large. This exponential explosion in the number of states as we add more dimensions (or higher resolution) is the Curse of Dimensionality. It makes grid-based methods computationally impossible for almost all real-world robotics problems. We need a fundamentally different way to think about the problem.


<!-- Illustration: Show a diagram comparing a 2D grid (10x10=100 cells) next to a 3D grid (10x10x10=1,000 cells) to visually demonstrate the exponential growth. Follow this with a picture of a complex, multi-jointed robot arm like the Franka Emika.

Question for Students: "If a robot arm has 6 joints, and we want to represent each joint's position with 360 discrete steps (one for each degree), how many total cells would our grid have? Why is this a problem for a computer?" -->

# Chapter 3: Sampling-Based Methods

Since we can't possibly map out the entire C-space, what if we don't even try? This is the fundamental shift in thinking that leads to Sampling-Based Motion Planning (SBMP). Instead of exhaustively checking every possible location, we can simply generate random configurations in the C-space and check if they are valid (i.e., not in collision).

The core intuition is that if we take enough random samples, we can build a sparse but effective map that captures the essential connectivity of the free space. We don't need to know about every single point; we just need to know enough to find a way from start to goal. This approach trades the guarantee of finding the absolute best path for the ability to find a feasible path, quickly, in incredibly complex, high-dimensional spaces. Early on, these planners proved their power by solving highly constrained problems that were previously intractable, such as the famous "alpha puzzle"

<video width="600" autoplay loop muted playsinline controls>
  <source src="{{ '/assets/videos/sampling_planning/alpha_puzzle.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>


> #### Core Components of Sampling-Based Planners
>
> **Sampling Function:** Generates a random configuration in the C-space  
> *For a 7-DOF arm, this means generating 7 random joint angles.*
>
> **Local Planner:** Checks if a simple, direct path between two nearby configurations is collision-free.  
> *Most commonly, this is a straight line in the C-space.*
{: .note }



By combining these two components, these algorithms come with a powerful new guarantee: Probabilistic Completeness. This means that if a valid path exists, the probability of the algorithm finding it approaches 1 as the number of samples approaches infinity. We are no longer guaranteed to find the optimal path, but we are guaranteed that we'll eventually find a path.

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

### Coding Exercise: Sampling Free Configurations

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


## Probabilistic Roadmaps (PRM)
<!-- 
The first major algorithm built on this sampling paradigm is the Probabilistic Roadmap (PRM). The philosophy behind PRM is intuitive: "Build a map first, then ask for directions." It focuses on creating a general-purpose roadmap of the free C-space, which can then be used for multiple queries. This makes it a multi-query planner.

The PRM algorithm works in two distinct phases:

- Construction Phase: In this phase, the roadmap is built. The algorithm iterates a set number of times, and in each iteration, it samples a random configuration. If that configuration is collision-free, it is added to the graph as a node. The algorithm then tries to connect this new node to its k-nearest neighbors that are already in the graph. For each neighbor, it uses the local planner to check if the path between them is collision-free. If it is, an edge is added to the graph connecting the two nodes.

- Query Phase: Once the roadmap is constructed, finding a path is easy. We take our specific start and goal configurations and connect them to their nearest neighbors in the pre-computed roadmap. Now, the problem is reduced to a simple graph search, and we can use Dijkstra’s algorithm to find the shortest path between the start and goal on our new roadmap.

The strength of PRM is its reusability. In a static environment like a factory floor, you can spend time building a high-quality roadmap of the entire workspace once. Then, for every new pick-and-place task, you can find a path almost instantly. Its primary weakness is the high upfront computation cost and its struggle with narrow passages, as the random chance of a sample landing inside a very small, constrained area is extremely low. -->


<!-- Animation: Show a step-by-step animation of PRM on the 2D maze. Start with a few nodes, then show more nodes and edges appearing to form a connected graph. Finally, show the start and goal being connected and the final path being highlighted in a different color.

Question for Students: "PRM is called a 'multi-query' planner. Give an example of a real-world robotics application where this would be a significant advantage over a 'single-query' planner." -->

## Rapidly-exploring Random Trees (RRT)

<!-- What if we don't need a map of the whole world, and instead just want to find a single path from A to B as quickly as possible? This is the problem that the Rapidly-exploring Random Tree (RRT) algorithm solves. Its philosophy is: "Explore purposefully from the start." RRT is a single-query planner that doesn't waste time mapping irrelevant regions of the space.

The RRT algorithm works by incrementally growing a tree of feasible paths from the start configuration. The magic is in how it decides where to grow the tree next. The core loop is as follows:

Generate a random configuration in the C-space (the "random target").

Find the node already in your tree that is nearest to this random target.

Extend a new edge from this nearest node in the direction of the random target, but only for a small, fixed distance.

If this new, short edge is collision-free, add its endpoint as a new node to the tree.

This process has a fascinating emergent property: the tree is naturally biased to explore large, uncovered regions of the space. This is because a random sample is, by definition, more likely to land in a large open area than a small, cramped one. This bias makes the tree "rapidly-exploring" and allows it to find a solution very quickly.

RRT's main strength is its speed and effectiveness in finding an initial, feasible path in high-dimensional spaces. However, because of its greedy, sprawling nature, the first path it finds is almost never the best one. It is often jagged and inefficient. RRT prioritizes finding any solution quickly over finding the optimal solution.

Teaching Material Ideas:

Animation: An animation of RRT on the 2D maze is crucial. It should show the tree starting at the robot and growing outwards, with branches visibly reaching towards empty spaces, eventually connecting to the goal region.

Exercise for Students: "In the RRT algorithm, we extend from the nearest node towards a random sample, but not all the way to it. Why is this small, fixed-distance step important for how the tree grows and explores the space?" -->

<!-- 
# Chapter 3: Sampling-based Methods

Dijkstra's works perfectly for our maze, but its reliance on a pre-defined, explicit graph is a critical limitation. What happens when the "maze" becomes impossibly large or complex? This can happen in several ways. We might face a truly enormous 2D map, or a high-resolution map where tiny obstacles create a massive number of states. More commonly, we face a robot with many joints, like a 7-DOF robot arm, whose high-dimensional Configuration Space is continuous and infinite. In these scenarios, creating an explicit graph of the entire state space is computationally impossible.

This is the problem that Sampling-Based Motion Planning (SBMP) was invented to solve in the 1990s. The core idea is brilliant: if the map is too big to build, don't build it. Instead, create a rough sketch of it by taking random samples. These algorithms don't try to capture every detail, but rather to estimate the connectivity of the free space. By doing so, they can offer a powerful guarantee known as probabilistic completeness, meaning that if a solution path exists, the probability of finding one approaches 1 as the algorithm runs for more time.

## Graph-Based Planners: The Probabilistic Roadmap (PRM)

The Probabilistic Roadmap (PRM) is the natural evolution of our maze-solving approach. It constructs a sparse but representative graph, or "roadmap," of the high-dimensional space. The strategy involves a sampling phase, where a set number of samples, or configurations, are randomly placed in the robot's C-space. Any samples that result in a collision are discarded, and the valid ones become the vertices of our graph. To be more efficient, sampling can be biased towards "interesting" regions. For instance, obstacle-based sampling focuses on areas near obstacles to help find paths through narrow passages, while clearance-based sampling prioritizes safer paths away from obstacles.

Next is a connection phase, where a local planner attempts to connect each sample to its nearest neighbors with a simple, collision-free path, forming the edges of the roadmap. Finally, in the querying phase, the start and goal configurations are added to this roadmap, and a graph search algorithm like Dijkstra's is used to find the cheapest path. A key advantage of PRM is that it's a multi-query planner; the roadmap can be built once and then reused for many different start and goal queries within the same environment.

## Tree-Based Planners: Rapidly-exploring Random Trees (RRT)

For problems where we only need a single path quickly, building a whole roadmap can be overkill. The Rapidly-exploring Random Tree (RRT) algorithm is designed for this single-query scenario. It works by growing a tree of reachable configurations starting from the initial state S. In each iteration, it picks a random sample from the C-space, finds the nearest node already in its tree, and extends a new edge from that node a small distance towards the random sample. This process inherently biases the tree's growth towards large, unexplored regions of the space, allowing it to "rapidly explore" and find a feasible path very quickly. To accelerate the search further, RRT-Connect uses a bidirectional approach, growing one tree from the start and another from the goal, attempting to connect them in the middle.

While basic RRT and PRM are designed to find any feasible path, a major breakthrough came with the development of asymptotically optimal planners like RRT* and PRM*. These advanced versions add a "rewiring" step, allowing them to continuously improve the solution quality over time, guaranteeing that the path will converge towards the true optimal solution as more samples are added. -->

---

# Final Project
- Implement and compare RM, RRT, RRT on a chosen benchmark.  
- Evaluate success rate, runtime, and path quality.  
- Extend to one special case (kinodynamic, narrow passage, or uncertainty).  

---

