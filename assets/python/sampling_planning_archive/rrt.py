# =========================
# Animation: show ALL points first, then connect them, and SAVE GIF/MP4
# =========================
from matplotlib.animation import FuncAnimation
import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from PIL import Image
from collections import deque
from matplotlib.animation import FuncAnimation
import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from PIL import Image

# =========================
# Maze parameters
# =========================
CELL_W, CELL_H = 6, 5     # number of cells in logical maze
CELL_PX = 64              # visual scaling
GRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1
START = (1, 1)
GOAL  = (GRID_W - 2, GRID_H - 2)
rng = np.random.default_rng(1)

# Tunables for "more open" look
N_ROOMS   = 3                  # how many rooms to try carving
ROOM_MIN  = (3, 3)             # min room size in grid cells (including walls grid, not logical)
ROOM_MAX  = (7, 5)             # max room size in grid cells
GAP_PROB  = 0.18               # probability to punch an extra gap in a wall (between free cells)

# =========================
# Helper to convert logical cell coords to grid coords
# (logical cells live at odd indices in the grid)
# =========================
def to_grid_xy(cell_x, cell_y):
    return 2*cell_x + 1, 2*cell_y + 1

# =========================
# Maze generation (DFS + optional braiding)
# =========================
def remove_isolated_walls(grid):
    """
    Removes any wall cell (1) that has no adjacent wall (4-neighbors).
    """
    H, W = grid.shape
    g2 = grid.copy()
    for y in range(1, H-1):
        for x in range(1, W-1):
            if grid[y, x] != 1:
                continue
            # Check 4-neighbors
            wall_neighbors = 0
            for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                if grid[y+dy, x+dx] == 1:
                    wall_neighbors += 1
            if wall_neighbors == 0:
                g2[y, x] = 0  # isolate: remove it
    return g2



def generate_maze(cw, ch, braid_prob=0.25):
    W, H = 2*cw + 1, 2*ch + 1
    grid = np.ones((H, W), dtype=np.uint8)

    def neighbors(cx, cy):
        for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < cw and 0 <= ny < ch:
                yield nx, ny

    visited = [[False]*ch for _ in range(cw)]
    sx, sy = rng.integers(0, cw), rng.integers(0, ch)
    stack = [(sx, sy)]
    visited[sx][sy] = True
    gx, gy = to_grid_xy(sx, sy)
    grid[gy, gx] = 0

    while stack:
        x, y = stack[-1]
        unvisited = [(nx, ny) for (nx, ny) in neighbors(x, y) if not visited[nx][ny]]
        if unvisited:
            nx, ny = unvisited[rng.integers(0, len(unvisited))]
            # knock down the wall between (x,y) and (nx,ny)
            wx, wy = x + nx + 1, y + ny + 1
            grid[2*y+1 + (ny-y), 2*x+1 + (nx-x)] = 0  # the between-cell wall
            grid[2*ny+1, 2*nx+1] = 0                  # the cell itself
            visited[nx][ny] = True
            stack.append((nx, ny))
        else:
            stack.pop()

    # Simple “braid”: remove some dead ends
    Wg, Hg = grid.shape[1], grid.shape[0]
    for gy in range(1, Hg-1, 2):
        for gx in range(1, Wg-1, 2):
            if grid[gy, gx] != 0:
                continue
            # find free neighbors (cells only)
            free_nbs = 0
            for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                if 0 <= gx+2*dx < Wg and 0 <= gy+2*dy < Hg and grid[gy+2*dy, gx+2*dx] == 0:
                    free_nbs += 1
            if free_nbs == 1 and rng.random() < braid_prob:
                # try knocking down a random adjacent wall leading to another free cell
                rng.shuffle([(1,0),(-1,0),(0,1),(0,-1)])
                for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                    wx, wy = gx + dx, gy + dy
                    tx, ty = gx + 2*dx, gy + 2*dy
                    if 0 < tx < Wg-1 and 0 < ty < Hg-1 and grid[wy, wx] == 1 and grid[ty, tx] == 0:
                        grid[wy, wx] = 0
                        break

    # ensure start/goal open
    grid[START[1], START[0]] = 0
    grid[GOAL[1],  GOAL[0]]  = 0
    
    return grid

# =========================
# Post-processing: carve a few rectangular rooms
# =========================
def carve_rooms(grid, n_rooms=N_ROOMS, room_min=ROOM_MIN, room_max=ROOM_MAX):
    H, W = grid.shape
    for _ in range(n_rooms):
        rw = int(rng.integers(room_min[0], min(room_max[0]+1, W-2)))
        rh = int(rng.integers(room_min[1], min(room_max[1]+1, H-2)))
        # place room aligned to odd coordinates so it blends with corridors
        x0 = int(rng.integers(1, max(2, W - rw - 1)))
        y0 = int(rng.integers(1, max(2, H - rh - 1)))
        # snap to odd indices
        if x0 % 2 == 0: x0 += 1
        if y0 % 2 == 0: y0 += 1
        x1, y1 = min(W-2, x0 + rw - 1), min(H-2, y0 + rh - 1)
        # carve the room
        grid[y0:y1+1, x0:x1+1] = 0
    # keep start/goal free
    grid[START[1], START[0]] = 0
    grid[GOAL[1],  GOAL[0]]  = 0
    return grid

# =========================
# Post-processing: punch extra gaps in walls (widen openings / loops)
# =========================
def punch_gaps(grid, gap_prob=GAP_PROB):
    H, W = grid.shape
    # iterate over interior walls
    for y in range(1, H-1):
        for x in range(1, W-1):
            if grid[y, x] != 1:
                continue
            # wall between two free cells horizontally or vertically?
            if grid[y, x-1] == 0 and grid[y, x+1] == 0 and rng.random() < gap_prob:
                grid[y, x] = 0
            elif grid[y-1, x] == 0 and grid[y+1, x] == 0 and rng.random() < gap_prob:
                grid[y, x] = 0
    # keep start/goal free
    grid[START[1], START[0]] = 0
    grid[GOAL[1],  GOAL[0]]  = 0
    return grid

# =========================
# Generate more-open maze
# =========================
grid = generate_maze(CELL_W, CELL_H, braid_prob=0.15)
grid = carve_rooms(grid, n_rooms=N_ROOMS, room_min=ROOM_MIN, room_max=ROOM_MAX)
# grid = punch_gaps(grid, gap_prob=GAP_PROB)
grid = remove_isolated_walls(grid)

# =========================
# Visualization
# =========================
fig_w, fig_h = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig, ax = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
ax.set_aspect('equal')
ax.set_xlim(0, GRID_W)
ax.set_ylim(GRID_H, 0)
ax.set_xticks([])
ax.set_yticks([])

# Draw walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black'))

# Start/goal markers
def cell_to_world(p):
    x,y = p
    return (x + 0.5, y + 0.5)

sx, sy = cell_to_world(START)
gx, gy = cell_to_world(GOAL)
ax.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7))
ax.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7))

# Optional robot glyph/image
def add_thymio(ax, pos, size=0.7):
    xw, yw = cell_to_world(pos)
    if os.path.exists("thymio.png"):
        img = Image.open("thymio.png")
        oi = OffsetImage(img, zoom=size)
        ab = AnnotationBbox(oi, (xw, yw), frameon=False)
        ax.add_artist(ab)
        return ab
    # else:
    #     body = Circle((xw, yw), 0.3, fc='white', ec='black', lw=1.2)
    #     ax.add_patch(body)
    #     return body


add_thymio(ax, START)
plt.show()

# -------------------------
# Equally spaced samples: centers of logical cells (odd,odd free cells)
# -------------------------
logical_samples = []
logical_to_idx = {}
for j in range(CELL_H):
    for i in range(CELL_W):
        gx, gy = 2*i + 1, 2*j + 1
        if 0 <= gx < GRID_W and 0 <= gy < GRID_H and grid[gy, gx] == 0:
            logical_to_idx[(gx, gy)] = len(logical_samples)
            logical_samples.append((gx, gy))

# Ensure START and GOAL included if free
for special in [START, GOAL]:
    if 0 <= special[0] < GRID_W and 0 <= special[1] < GRID_H and grid[special[1], special[0]] == 0:
        if special not in logical_to_idx:
            logical_to_idx[special] = len(logical_samples)
            logical_samples.append(special)

samples_world = [cell_to_world(p) for p in logical_samples]

def los_free(a, b):
    (x0, y0) = cell_to_world(a)
    (x1, y1) = cell_to_world(b)
    for t in np.linspace(0.0, 1.0, 60):
        x = x0*(1-t) + x1*t
        y = y0*(1-t) + y1*t
        cx, cy = int(x), int(y)
        if cx < 0 or cx >= GRID_W or cy < 0 or cy >= GRID_H:
            return False
        if grid[cy, cx] == 1:
            return False
    return True

adj = [[] for _ in range(len(logical_samples))]
dirs4 = [(1,0),(0,1),(-1,0),(0,-1)]  # R, D, L, U
for (gx, gy), i in logical_to_idx.items():
    for dx, dy in dirs4:
        nx, ny = gx + 2*dx, gy + 2*dy
        if (nx, ny) in logical_to_idx:
            j = logical_to_idx[(nx, ny)]
            if los_free((gx, gy), (nx, ny)):
                adj[i].append(j)

# -------------------------
# Deterministic BFS from START; record edges and also "side" connections
# -------------------------
if START in logical_to_idx:
    start_idx = logical_to_idx[START]
else:
    sx, sy = START
    dists = [(abs(cx - sx) + abs(cy - sy), (cx, cy)) for (cx, cy) in logical_to_idx.keys()]
    dists.sort(key=lambda t: t[0])
    start_idx = logical_to_idx[dists[0][1]]

visited = [False]*len(logical_samples)
q = deque([start_idx])
visited[start_idx] = True
bfs_order_nodes = [start_idx]
parent_edge_order = []

while q:
    u = q.popleft()
    for v in adj[u]:   # already deterministic order
        if not visited[v]:
            visited[v] = True
            parent_edge_order.append((u, v))
            bfs_order_nodes.append(v)
            q.append(v)

# For animation that also shows cross/side edges once both ends are discovered:
disc_idx = {node: idx for idx, node in enumerate(bfs_order_nodes)}
edges_seen = set()
steps_edges = []

# First, add the BFS tree edges in discovery order
for (u, v) in parent_edge_order:
    a, b = (u, v) if u < v else (v, u)
    if (a, b) not in edges_seen:
        steps_edges.append((u, v))
        edges_seen.add((a, b))

# Then for each node in discovery order, add edges to previously discovered neighbors
for k, v in enumerate(bfs_order_nodes):
    for u in adj[v]:
        if disc_idx.get(u, 1e9) < disc_idx[v]:
            a, b = (u, v) if u < v else (v, u)
            if (a, b) not in edges_seen:
                steps_edges.append((u, v))
                edges_seen.add((a, b))

# -------------------------
# Animation: show ALL points first, then connect them edge-by-edge
# -------------------------
fig_w, fig_h = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig, ax = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
ax.set_aspect('equal')
ax.set_xlim(0, GRID_W)
ax.set_ylim(GRID_H, 0)
ax.set_xticks([]); ax.set_yticks([])

# Draw walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# Start/Goal markers
sx, sy = cell_to_world(START)
gx, gy = cell_to_world(GOAL)
ax.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=3))
ax.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=3))

# Show *all* points immediately
xs, ys = zip(*samples_world) if samples_world else ([], [])
scatter_all = ax.scatter(xs, ys, facecolor="#000000", s=35, alpha=0.95, zorder=4)

# Prepare edge list for animation
edge_lines = []

def init_anim():
    # Points already visible; nothing special to init
    return [scatter_all]

# New figure for the animation (keeps your earlier static plots intact)
fig_anim, ax_anim = plt.subplots(figsize=(GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110), dpi=110)
ax_anim.set_aspect('equal')
ax_anim.set_xlim(0, GRID_W)
ax_anim.set_ylim(GRID_H, 0)
ax_anim.set_xticks([]); ax_anim.set_yticks([])

# Draw walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax_anim.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# Start/Goal markers
sx, sy = cell_to_world(START)
gx, gy = cell_to_world(GOAL)
ax_anim.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=3))
ax_anim.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=3))

# Show *all* equally-spaced points immediately
xs, ys = zip(*samples_world) if samples_world else ([], [])
scatter_all = ax_anim.scatter(xs, ys, facecolor="#000000", s=35, alpha=0.95, zorder=4)

# Prepare the edge list (already built as `steps_edges`)
edge_lines = []

def init_anim():
    return [scatter_all]

def animate(frame):
    # Reveal one edge per frame, in deterministic BFS-derived order
    if frame < len(steps_edges):
        u, v = steps_edges[frame]
        (xu, yu) = samples_world[u]
        (xv, yv) = samples_world[v]
        ln, = ax_anim.plot([xu, xv], [yu, yv], color="#000000", lw=1.8, alpha=0.95, zorder=2)
        edge_lines.append(ln)
        return [ln]
    return []

# Reasonable playback speed
ANIM_INTERVAL_MS = 50  # 20 fps-ish
anim = FuncAnimation(
    fig_anim, animate, init_func=init_anim,
    frames=max(1, len(steps_edges)), interval=ANIM_INTERVAL_MS,
    blit=False, repeat=False
)

# --- Save the animation at the end ---
saved = False
try:
    # Try MP4 with ffmpeg first (smaller file, smoother playback)
    from matplotlib.animation import FFMpegWriter
    mp4_writer = FFMpegWriter(fps=max(1, int(1000/ANIM_INTERVAL_MS)))
    anim.save("build_graph.mp4", writer=mp4_writer, dpi=110)
    print("Saved build_graph.mp4")
    saved = True
except Exception as e:
    print("FFmpeg not available or failed:", e)

if not saved:
    try:
        from matplotlib.animation import PillowWriter
        gif_writer = PillowWriter(fps=max(1, int(1000/ANIM_INTERVAL_MS)))
        anim.save("build_graph.gif", writer=gif_writer, dpi=110, savefig_kwargs={"facecolor": "white"})
        print("Saved build_graph.gif")
        saved = True
    except Exception as e2:
        print("GIF save failed:", e2)

plt.close(fig_anim)  # close the figure after saving

# =========================
# PRM: Probabilistic Roadmap (random nodes, k-NN visibility) + Animated build + Save
# =========================
import math
from matplotlib.animation import FuncAnimation

# ---------- PRM parameters ----------
PRM_N_SAMPLES   = 80      # number of random roadmap nodes (excluding start/goal)
PRM_K           = 5        # connect each node to up to K nearest visible neighbors
PRM_K_STARTGOAL = 12       # neighbors considered when connecting start/goal
EDGE_CHECK_STEPS = 64      # collision samples along an edge
ANIM_INTERVAL_MS = 40      # animation speed (ms per frame)
DOT_SIZE = 20

# ---------- Helpers ----------
def world_to_cell(xw, yw):
    return int(xw), int(yw)

def dist_point_rect(px, py, rx0, ry0, rx1, ry1):
        """Euclidean distance from point (px,py) to axis-aligned rectangle [rx0,rx1]×[ry0,ry1]."""
        # dx: distance along x to the rectangle (0 if inside x-range)
        if px < rx0: dx = rx0 - px
        elif px > rx1: dx = px - rx1
        else: dx = 0.0
        # dy: distance along y to the rectangle (0 if inside y-range)
        if py < ry0: dy = ry0 - py
        elif py > ry1: dy = py - ry1
        else: dy = 0.0
        return math.hypot(dx, dy)

def clearance_to_walls(px, py, r_probe):
        """
        Minimum distance from (px,py) to any wall cell's square.
        We only need to check a local window around the point.
        """
        # Local search window in cell indices (pad by ceil(radius)+1)
        pad = int(math.ceil(r_probe)) + 1
        cx, cy = int(px), int(py)
        x0, x1 = max(0, cx - pad), min(GRID_W - 1, cx + pad)
        y0, y1 = max(0, cy - pad), min(GRID_H - 1, cy + pad)

        dmin = float("inf")
        for yy in range(y0, y1 + 1):
            for xx in range(x0, x1 + 1):
                if grid[yy, xx] == 1:
                    # wall cell is rectangle [xx, xx+1] × [yy, yy+1]
                    d = dist_point_rect(px, py, xx, yy, xx + 1.0, yy + 1.0)
                    if d < dmin:
                        dmin = d
        return dmin

def free_world_point(robot_radius=0.22):
    """Sample a uniform world coordinate that falls in a FREE grid cell."""
    while True:
        x = rng.uniform(0, GRID_W)
        y = rng.uniform(0, GRID_H)
        cx, cy = world_to_cell(x, y)
        if 0 <= cx < GRID_W and 0 <= cy < GRID_H and grid[cy, cx] == 0 and clearance_to_walls(x, y, robot_radius) >= robot_radius:
            return (x, y)


def segment_collision_free_world(p0, p1, steps=EDGE_CHECK_STEPS, robot_radius=0.22):
    """Line-of-sight test by sampling the segment inside grid; blocks if any wall is hit."""
    x0, y0 = p0; x1, y1 = p1
    for t in np.linspace(0.0, 1.0, steps):
        x = x0*(1-t) + x1*t
        y = y0*(1-t) + y1*t
        cx, cy = int(x), int(y)
        if cx < 0 or cx >= GRID_W or cy < 0 or cy >= GRID_H:
            return False
        if grid[cy, cx] == 1:
            return False
        if clearance_to_walls(x, y, robot_radius) < robot_radius:
            return False
    return True

def euclid2(a, b):
    dx = a[0] - b[0]
    dy = a[1] - b[1]
    return dx*dx + dy*dy

# =========================
# RRT: Rapidly-exploring Random Tree (2D grid world) + Animated build + Save
# =========================
import math
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from matplotlib.animation import FuncAnimation

# This script assumes you already executed the maze/grid utilities above, i.e.:
# - grid, GRID_W, GRID_H, START, GOAL
# - cell_to_world(), world_to_cell(), clearance_to_walls(), segment_collision_free_world()
# If not, define them first (they exist in your PRM block).

# ---------- RRT parameters ----------
RRT_MAX_ITERS     = 15000     # max iterations to grow the tree
RRT_STEP_SIZE     = 0.9      # max extension step in world units
RRT_GOAL_SAMPLE_P = 0.07     # probability of sampling the goal (goal bias)
RRT_GOAL_CONNECT  = True     # try to connect to goal when near
RRT_GOAL_TOL      = 0.9      # distance threshold to "near goal"
EDGE_CHECK_STEPS  = 48       # samples along an edge for collision test
ANIM_INTERVAL_MS  = 30       # animation speed
NODE_SIZE         = 18       # scatter size for nodes

rng = np.random.default_rng(3)  # independent seed from PRM part, for visual variety

# ---------- Helpers ----------
def dist2(a, b):
    dx = a[0] - b[0]; dy = a[1] - b[1]
    return dx*dx + dy*dy

def steer(q_near, q_rand, step=RRT_STEP_SIZE):
    """Return a new point by moving from q_near toward q_rand by at most 'step'."""
    dx, dy = q_rand[0] - q_near[0], q_rand[1] - q_near[1]
    d = math.hypot(dx, dy)
    if d < 1e-9:
        return q_near
    if d <= step:
        return (q_rand[0], q_rand[1])
    s = step / d
    return (q_near[0] + dx*s, q_near[1] + dy*s)

# --- replace your sample_free_world() with this version ---
def sample_free_world(goal_bias=RRT_GOAL_SAMPLE_P,
                      p_goal_ball=0.25,            # prob. to sample near-goal region
                      goal_ball_radius=2.0,        # radius of the near-goal ball (world units)
                      it=None, it_max=None):       # for adaptive bias (optional)
    """
    Mixture sampler:
      - with prob p_goal_eff: return the exact goal (hard bias)
      - else with prob p_goal_ball: sample uniformly inside a ball around the goal
      - else: uniform free sample in the world
    An optional adaptive schedule can increase goal bias over iterations.
    """
    # --- adaptive bias (optional): ramp goal bias from 50% to 100% of given value
    p_goal_eff = float(goal_bias)
    if it is not None and it_max is not None and it_max > 0:
        ramp = 0.5 + 0.5 * (it / it_max)          # from 0.5 → 1.0
        p_goal_eff = min(1.0, p_goal_eff * ramp)

    u = rng.random()
    if u < p_goal_eff:
        return cell_to_world(GOAL)

    u = rng.random()
    if u < p_goal_ball:
        # sample uniformly inside a disk centered at goal
        gx, gy = cell_to_world(GOAL)
        for _ in range(200):  # try a few times to respect collision/clearance
            # polar uniform in disk
            r = goal_ball_radius * math.sqrt(rng.random())
            th = 2*math.pi * rng.random()
            x = gx + r * math.cos(th)
            y = gy + r * math.sin(th)
            cx, cy = world_to_cell(x, y)
            if 0 <= cx < GRID_W and 0 <= cy < GRID_H and grid[cy, cx] == 0:
                if clearance_to_walls(x, y, 0.22) >= 0.22:
                    return (x, y)
        # fallback to uniform if we failed to find a near-goal free point

    # uniform free sample fallback
    while True:
        x = rng.uniform(0, GRID_W)
        y = rng.uniform(0, GRID_H)
        cx, cy = world_to_cell(x, y)
        if 0 <= cx < GRID_W and 0 <= cy < GRID_H and grid[cy, cx] == 0:
            if clearance_to_walls(x, y, 0.22) >= 0.22:
                return (x, y)


def visible_segment(p0, p1):
    return segment_collision_free_world(p0, p1, steps=EDGE_CHECK_STEPS, robot_radius=0.22)

# ---------- 1) Build RRT (record growth order for animation) ----------
start_world = cell_to_world(START)
goal_world  = cell_to_world(GOAL)

nodes   = [start_world]   # list of (x,y)
parent  = [-1]            # parent index
growth_steps = []         # list of tuples (idx_parent, idx_new) in time order

goal_idx = None

for it in range(RRT_MAX_ITERS):
    q_rand = sample_free_world()
    # nearest
    idx_near = int(np.argmin([dist2(q_rand, n) for n in nodes]))
    q_near = nodes[idx_near]
    # extend
    q_new = steer(q_near, q_rand, RRT_STEP_SIZE)
    # local planner
    if visible_segment(q_near, q_new):
        nodes.append(q_new)
        parent.append(idx_near)
        growth_steps.append((idx_near, len(nodes)-1))

        # goal connection check
        if RRT_GOAL_CONNECT:
            if math.hypot(q_new[0]-goal_world[0], q_new[1]-goal_world[1]) <= RRT_GOAL_TOL:
                # Try to connect directly to goal
                if visible_segment(q_new, goal_world):
                    nodes.append(goal_world)
                    parent.append(len(nodes)-2)  # parent is q_new
                    growth_steps.append((len(nodes)-2, len(nodes)-1))
                    goal_idx = len(nodes)-1
                    break

# If not connected explicitly, try to find the nearest node to GOAL and connect once
if goal_idx is None:
    idx_near_goal = int(np.argmin([dist2(goal_world, n) for n in nodes]))
    if visible_segment(nodes[idx_near_goal], goal_world):
        nodes.append(goal_world)
        parent.append(idx_near_goal)
        growth_steps.append((idx_near_goal, len(nodes)-1))
        goal_idx = len(nodes)-1

# ---------- 2) Reconstruct path if goal reached ----------
path_idx = []
if goal_idx is not None:
    cur = goal_idx
    while cur != -1:
        path_idx.append(cur)
        cur = parent[cur]
    path_idx.reverse()

# Build path segments for drawing
path_segments = []
if len(path_idx) >= 2:
    for i in range(len(path_idx)-1):
        path_segments.append((path_idx[i], path_idx[i+1]))

# Build interpolated robot trajectory along path (for optional Phase E motion)
STEPS_PER_EDGE = 16
traj_pts = []
if len(path_segments) > 0:
    for (a, b) in path_segments:
        x0, y0 = nodes[a]; x1, y1 = nodes[b]
        for s in range(STEPS_PER_EDGE):
            t = s / STEPS_PER_EDGE
            traj_pts.append((x0*(1-t) + x1*t, y0*(1-t) + y1*t))
    traj_pts.append(nodes[path_segments[-1][1]])

# ---------- 3) Animation schedule ----------
# Phase A: reveal one edge (one new node) per frame in growth_steps order
# Phase B: if path exists, reveal path segments (bold)
# Phase C: optional robot motion along the path

phaseA_frames = list(range(len(growth_steps)))
phaseB_frames = list(range(len(path_segments)))
phaseC_frames = list(range(len(traj_pts)))

frames_total = len(phaseA_frames) + len(phaseB_frames) + len(phaseC_frames)

# ---------- 4) Build figure & animate ----------
fig_rrt, ax_rrt = plt.subplots(figsize=(GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110), dpi=110)
ax_rrt.set_aspect('equal')
ax_rrt.set_xlim(0, GRID_W)
ax_rrt.set_ylim(GRID_H, 0)
ax_rrt.set_xticks([]); ax_rrt.set_yticks([])
ax_rrt.set_title("RRT: tree growth → shortest path → robot motion")

# Draw maze
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax_rrt.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# Start/Goal markers
sx, sy = start_world
gx, gy = goal_world
ax_rrt.add_patch(Circle((sx, sy), 0.28, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=4))
ax_rrt.add_patch(Circle((gx, gy), 0.28, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=4))

# Dynamic artists
shown_nodes_mask = np.zeros(len(nodes), dtype=bool)
shown_nodes_mask[0] = True  # start visible

def update_scatter():
    pts = [nodes[i] for i, m in enumerate(shown_nodes_mask) if m]
    if not pts:
        return ax_rrt.scatter([], [], s=NODE_SIZE, facecolor="#000000", alpha=0.95, zorder=3)
    xs, ys = zip(*pts)
    return ax_rrt.scatter(xs, ys, s=NODE_SIZE, facecolor="#000000", alpha=0.95, zorder=3)

scatter_nodes = update_scatter()
tree_lines = []
path_lines = []
robot_artist = None
edge_color = "#333333"
path_color = "#ff7f0e"

def init_rrt():
    return [scatter_nodes]

def animate_rrt(frame):
    global scatter_nodes, robot_artist
    artists = []

    # Phase A: reveal one growth edge per frame
    if frame < len(phaseA_frames):
        gi = phaseA_frames[frame]
        u, v = growth_steps[gi]
        # mark new node as visible
        shown_nodes_mask[v] = True
        # refresh scatter
        try:
            scatter_nodes.remove()
        except Exception:
            pass
        scatter_nodes = update_scatter()
        artists.append(scatter_nodes)
        # draw the edge
        (x0,y0), (x1,y1) = nodes[u], nodes[v]
        ln, = ax_rrt.plot([x0, x1], [y0, y1], lw=1.3, alpha=0.9, color=edge_color, zorder=2)
        tree_lines.append(ln)
        artists.append(ln)
        return artists

    # Phase B: draw path segments
    frame -= len(phaseA_frames)
    if frame < len(phaseB_frames):
        si = phaseB_frames[frame]
        a, b = path_segments[si]
        x0, y0 = nodes[a]; x1, y1 = nodes[b]
        ln, = ax_rrt.plot([x0, x1], [y0, y1], lw=3.0, alpha=1.0, color=path_color, zorder=3)
        path_lines.append(ln)
        artists.append(ln)
        return artists

    # Phase C: robot moves along trajectory
    frame -= len(phaseB_frames)
    if frame < len(phaseC_frames) and len(traj_pts) > 0:
        x, y = traj_pts[frame]
        if robot_artist is None:
            robot_artist = ax_rrt.add_patch(Circle((x, y), 0.22, facecolor='white',
                                                   edgecolor='black', lw=0.7, zorder=5))
        else:
            robot_artist.center = (x, y)
        artists.append(robot_artist)
        return artists

    return [scatter_nodes] + tree_lines + path_lines + ([robot_artist] if robot_artist is not None else [])

anim_rrt = FuncAnimation(
    fig_rrt, animate_rrt, init_func=init_rrt,
    frames=max(1, frames_total), interval=ANIM_INTERVAL_MS,
    blit=False, repeat=False
)

# ---------- 5) Save animation ----------
saved = False
try:
    from matplotlib.animation import FFMpegWriter
    writer = FFMpegWriter(fps=max(1, int(1000/ANIM_INTERVAL_MS)))
    anim_rrt.save("rrt_build_with_robot.mp4", writer=writer, dpi=110)
    print("Saved rrt_build_with_robot.mp4")
    saved = True
except Exception as e:
    print("FFmpeg not available or failed:", e)

if not saved:
    try:
        from matplotlib.animation import PillowWriter
        writer = PillowWriter(fps=max(1, int(1000/ANIM_INTERVAL_MS)))
        anim_rrt.save("rrt_build_with_robot.gif", writer=writer, dpi=110, savefig_kwargs={"facecolor": "white"})
        print("Saved rrt_build_with_robot.gif")
        saved = True
    except Exception as e2:
        print("GIF save failed:", e2)
