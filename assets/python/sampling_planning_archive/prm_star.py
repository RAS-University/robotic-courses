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
grid = generate_maze(CELL_W, CELL_H, braid_prob=0.22)
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

# ---------- PRM parameters ----------
PRM_N_SAMPLES   = 110      # number of random roadmap nodes (excluding start/goal)
PRM_K           = 5        # connect each node to up to K nearest visible neighbors
PRM_K_STARTGOAL = 20       # neighbors considered when connecting start/goal
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


# ---------- 3) Connect START and GOAL ----------
def connect_terminal(idx_term, k_term=PRM_K_STARTGOAL):
    """Try to connect terminal node (start or goal) to k nearest visible nodes."""
    d2s = [(euclid2(nodes[idx_term], nodes[j]), j) for j in range(2, len(nodes))]
    d2s.sort(key=lambda t: t[0])
    added_local = []
    count = 0
    for _, j in d2s:
        a, b = (idx_term, j) if idx_term < j else (j, idx_term)
        if (a, b) in edges:
            continue
        if segment_collision_free_world(nodes[idx_term], nodes[j], EDGE_CHECK_STEPS):
            edges.append((a, b))
            added_local.append((a, b))
            count += 1
        if count >= k_term:
            break
    return added_local



def dijkstra(src, dst):
    import heapq
    dist = [float('inf')] * len(nodes)
    prev = [-1] * len(nodes)
    dist[src] = 0.0
    pq = [(0.0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:
            continue
        if u == dst:
            break
        for v, w in adj[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                prev[v] = u
                heapq.heappush(pq, (nd, v))
    # reconstruct
    path_idx = []
    if dist[dst] < float('inf'):
        cur = dst
        while cur != -1:
            path_idx.append(cur)
            cur = prev[cur]
        path_idx.reverse()
    return path_idx, dist[dst]

def init_prm():
    return [scatter_nodes]

def animate_prm(frame):
    artists = []

    # Phase A: reveal nodes (excluding S/G)
    if frame < len(phaseA_frames):
        idx = phaseA_frames[frame]
        shown_nodes_mask[idx] = True
        # refresh scatter (remove old and redraw)
        global scatter_nodes
        try:
            scatter_nodes.remove()
        except Exception:
            pass
        scatter_nodes = update_scatter_from_mask()
        artists.append(scatter_nodes)
        return artists

    # Phase B/C: reveal edges
    edge_idx = frame - len(phaseA_frames)
    if edge_idx < (len(phaseB_frames) + len(phaseC_frames)):
        # Which global edge?
        global_edge_idx = edge_idx
        i, j = edges[global_edge_idx]
        x0, y0 = nodes[i]
        x1, y1 = nodes[j]
        # choose color: core vs terminal
        color = edge_colors_core
        if global_edge_idx >= len(phaseB_frames):
            color = edge_colors_term
        ln, = ax_prm.plot([x0, x1], [y0, y1], lw=1.4, alpha=0.9, color=color, zorder=2)
        edge_lines.append(ln)
        artists.append(ln)
        return artists

    # Phase D: shortest path segments
    path_idx = edge_idx - (len(phaseB_frames) + len(phaseC_frames))
    if 0 <= path_idx < len(path_segments):
        a, b = path_segments[path_idx]
        x0, y0 = nodes[a]
        x1, y1 = nodes[b]
        ln, = ax_prm.plot([x0, x1], [y0, y1], lw=3.2, alpha=1.0, color=path_color, zorder=3)
        edge_lines.append(ln)
        artists.append(ln)
        return artists

    return artists if artists else [scatter_nodes] + edge_lines

# =========================
# PRM*: Asymptotically-Optimal Probabilistic Roadmap
# =========================
import math
from matplotlib.animation import FuncAnimation

# ---------- PRM* parameters ----------
PRMSTAR_N_SAMPLES   = 120  # number of random roadmap nodes (excluding start/goal)
PRMSTAR_DIM         = 2       # configuration space dimension (grid world → 2D)
PRMSTAR_GAMMA       = 13.0     # controls connection radius r(N)
EDGE_CHECK_STEPS    = 16      # collision samples along an edge
PRMSTAR_DOT_SIZE    = 20
PRMSTAR_ANIM_MS     = 30    # ms per frame (also used for FPS when saving)

# ---------- Helpers (reuse your grid + clearance) ----------
def world_to_cell(xw, yw):
    return int(xw), int(yw)

def dist_point_rect(px, py, rx0, ry0, rx1, ry1):
    """Euclidean distance from point (px,py) to axis-aligned rectangle [rx0,rx1]×[ry0,ry1]."""
    if px < rx0: dx = rx0 - px
    elif px > rx1: dx = px - rx1
    else: dx = 0.0
    if py < ry0: dy = ry0 - py
    elif py > ry1: dy = py - ry1
    else: dy = 0.0
    return math.hypot(dx, dy)

def clearance_to_walls(px, py, r_probe):
    """
    Minimum distance from (px,py) to any wall cell's square.
    We only need to check a local window around the point.
    """
    pad = int(math.ceil(r_probe)) + 1
    cx, cy = int(px), int(py)
    x0, x1 = max(0, cx - pad), min(GRID_W - 1, cx + pad)
    y0, y1 = max(0, cy - pad), min(GRID_H - 1, cy + pad)

    dmin = float("inf")
    for yy in range(y0, y1 + 1):
        for xx in range(x0, x1 + 1):
            if grid[yy, xx] == 1:
                d = dist_point_rect(px, py, xx, yy, xx + 1.0, yy + 1.0)
                if d < dmin:
                    dmin = d
    return dmin

def free_world_point(robot_radius=0.22):
    """Sample a uniform world coordinate that falls in a FREE grid cell with clearance."""
    while True:
        x = rng.uniform(0, GRID_W)
        y = rng.uniform(0, GRID_H)
        cx, cy = world_to_cell(x, y)
        if 0 <= cx < GRID_W and 0 <= cy < GRID_H and grid[cy, cx] == 0:
            if clearance_to_walls(x, y, robot_radius) >= robot_radius:
                return (x, y)

def segment_collision_free_world(p0, p1, steps=EDGE_CHECK_STEPS, robot_radius=0.22):
    """Line-of-sight test by sampling the segment; blocked if we hit a wall or lose clearance."""
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

# ---------- 1) Sample PRM* nodes ----------
nodes = []                   # world coordinates
nodes.append(cell_to_world(START))  # index 0 = start
nodes.append(cell_to_world(GOAL))   # index 1 = goal

while len(nodes) < PRMSTAR_N_SAMPLES + 2:
    nodes.append(free_world_point())

N = len(nodes)

# ---------- 2) PRM*: radius-based connections ----------
def prmstar_radius(N, d=PRMSTAR_DIM, gamma=PRMSTAR_GAMMA):
    # r(N) = γ (log N / N)^(1/d)
    if N <= 1:
        return float("inf")
    return gamma * (math.log(N) / N) ** (1.0 / d)

r = prmstar_radius(N)
r2 = r * r

edges = []   # undirected edges, pairs (i,j) with i<j
for i in range(N):
    for j in range(i+1, N):
        if euclid2(nodes[i], nodes[j]) <= r2:
            if segment_collision_free_world(nodes[i], nodes[j], EDGE_CHECK_STEPS):
                edges.append((i, j))

# ---------- 3) Shortest path (Dijkstra run ONCE after graph is built) ----------
adj = [[] for _ in range(N)]
for (i, j) in edges:
    w = math.sqrt(euclid2(nodes[i], nodes[j]))
    adj[i].append((j, w))
    adj[j].append((i, w))

def dijkstra(src, dst):
    import heapq
    dist = [float('inf')] * N
    prev = [-1] * N
    dist[src] = 0.0
    pq = [(0.0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d != dist[u]:
            continue
        if u == dst:
            break
        for v, w in adj[u]:
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                prev[v] = u
                heapq.heappush(pq, (nd, v))
    path_idx = []
    if dist[dst] < float('inf'):
        cur = dst
        while cur != -1:
            path_idx.append(cur)
            cur = prev[cur]
        path_idx.reverse()
    return path_idx, dist[dst]

prm_path_idx, prm_len = dijkstra(0, 1)  # 0=start, 1=goal

# ---------- 4) Build path segments & robot trajectory ----------
path_segments = []
if len(prm_path_idx) >= 2:
    for i in range(len(prm_path_idx) - 1):
        path_segments.append((prm_path_idx[i], prm_path_idx[i+1]))

STEPS_PER_EDGE = 16
traj_pts = []
if len(path_segments) > 0:
    for (a, b) in path_segments:
        x0, y0 = nodes[a]
        x1, y1 = nodes[b]
        for s in range(STEPS_PER_EDGE):
            t = s / STEPS_PER_EDGE
            traj_pts.append((x0*(1-t) + x1*t, y0*(1-t) + y1*t))
    traj_pts.append(nodes[prm_path_idx[-1]])  # ensure we land exactly on the goal

# ---------- 5) Animation schedule ----------
# Phase A: reveal nodes (2..N-1) one by one
phaseA_frames = list(range(2, N))

# Split edges: "core" vs "terminal" (touching start/goal) for nicer colouring
core_edge_indices = []
term_edge_indices = []
for idx, (i, j) in enumerate(edges):
    if i in (0, 1) or j in (0, 1):
        term_edge_indices.append(idx)
    else:
        core_edge_indices.append(idx)

phaseB_frames = core_edge_indices
phaseC_frames = term_edge_indices
phaseD_frames = list(range(len(path_segments)))
phaseE_frames = list(range(len(traj_pts)))

frames_total = (
    len(phaseA_frames)
    + len(phaseB_frames)
    + len(phaseC_frames)
    + len(phaseD_frames)
    + len(phaseE_frames)
)

# ---------- 6) Build figure & animate ----------
fig_prm, ax_prm = plt.subplots(
    figsize=(GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110),
    dpi=110
)
ax_prm.set_aspect('equal')
ax_prm.set_xlim(0, GRID_W)
ax_prm.set_ylim(GRID_H, 0)
ax_prm.set_xticks([]); ax_prm.set_yticks([])
ax_prm.set_title("PRM*: nodes → edges → start/goal → shortest path → robot motion")

# Maze walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax_prm.add_patch(Rectangle((x, y), 1, 1, linewidth=0,
                                       facecolor='black', zorder=0))

# Start/Goal markers
sx, sy = cell_to_world(START)
gx, gy = cell_to_world(GOAL)
ax_prm.add_patch(Circle((sx, sy), 0.28, facecolor="#13adfa",
                        edgecolor='black', lw=0.7, zorder=4))
ax_prm.add_patch(Circle((gx, gy), 0.28, facecolor="#0feb55",
                        edgecolor='black', lw=0.7, zorder=4))

# Scatter for nodes (start with only S/G)
shown_nodes_mask = np.zeros(N, dtype=bool)
shown_nodes_mask[0] = True
shown_nodes_mask[1] = True

def update_scatter_from_mask():
    pts = [nodes[i] for i in range(N) if shown_nodes_mask[i]]
    if not pts:
        return ax_prm.scatter([], [], s=PRMSTAR_DOT_SIZE,
                              facecolor="#000000", alpha=0.95, zorder=3)
    xs, ys = zip(*pts)
    return ax_prm.scatter(xs, ys, s=PRMSTAR_DOT_SIZE,
                          facecolor="#000000", alpha=0.95, zorder=3)

scatter_nodes = update_scatter_from_mask()

edge_lines = []
edge_color_core = "#333333"
edge_color_term = "#0066ff"
path_color       = "#ff7f0e"

robot_artist = None
robot_radius = 0.22  # purely visual

def init_prm():
    return [scatter_nodes]

def animate_prm(frame):
    global scatter_nodes, robot_artist
    artists = []

    # Phase A: reveal nodes
    if frame < len(phaseA_frames):
        idx = phaseA_frames[frame]
        shown_nodes_mask[idx] = True
        try:
            scatter_nodes.remove()
        except Exception:
            pass
        scatter_nodes = update_scatter_from_mask()
        artists.append(scatter_nodes)
        return artists

    frame -= len(phaseA_frames)

    # Phase B: core edges
    if frame < len(phaseB_frames):
        ei = phaseB_frames[frame]
        i, j = edges[ei]
        x0, y0 = nodes[i]; x1, y1 = nodes[j]
        ln, = ax_prm.plot([x0, x1], [y0, y1], lw=1.4, alpha=0.9,
                          color=edge_color_core, zorder=2)
        edge_lines.append(ln)
        artists.append(ln)
        return artists

    frame -= len(phaseB_frames)

    # Phase C: terminal edges (incident to start or goal)
    if frame < len(phaseC_frames):
        ei = phaseC_frames[frame]
        i, j = edges[ei]
        x0, y0 = nodes[i]; x1, y1 = nodes[j]
        ln, = ax_prm.plot([x0, x1], [y0, y1], lw=1.6, alpha=0.95,
                          color=edge_color_term, zorder=2)
        edge_lines.append(ln)
        artists.append(ln)
        return artists

    frame -= len(phaseC_frames)

    # Phase D: shortest path segments
    if frame < len(phaseD_frames):
        seg_i = frame
        a, b = path_segments[seg_i]
        x0, y0 = nodes[a]; x1, y1 = nodes[b]
        ln, = ax_prm.plot([x0, x1], [y0, y1], lw=3.0, alpha=1.0,
                          color=path_color, zorder=3)
        edge_lines.append(ln)
        artists.append(ln)
        return artists

    frame -= len(phaseD_frames)

    # Phase E: robot motion along traj_pts
    if frame < len(phaseE_frames) and len(traj_pts) > 0:
        x, y = traj_pts[frame]
        if robot_artist is None:
            robot_artist = ax_prm.add_patch(Circle(
                (x, y), robot_radius,
                facecolor='white', edgecolor='black',
                lw=0.7, zorder=5
            ))
        else:
            robot_artist.center = (x, y)
        artists.append(robot_artist)
        return artists

    return [scatter_nodes] + edge_lines + ([robot_artist] if robot_artist is not None else [])

anim_prm = FuncAnimation(
    fig_prm, animate_prm, init_func=init_prm,
    frames=max(1, frames_total), interval=PRMSTAR_ANIM_MS,
    blit=False, repeat=False
)

# ---------- 7) Save animation ----------
saved = False
# try:
#     from matplotlib.animation import FFMpegWriter
#     writer = FFMpegWriter(fps=max(1, int(1000 / PRMSTAR_ANIM_MS)))
#     anim_prm.save("prmstar_build_with_robot.mp4", writer=writer, dpi=110)
#     print("Saved prmstar_build_with_robot.mp4")
#     saved = True
# except Exception as e:
#     print("FFmpeg not available or failed:", e)

if not saved:
    try:
        from matplotlib.animation import PillowWriter
        writer = PillowWriter(fps=max(1, int(1000 / PRMSTAR_ANIM_MS)))
        anim_prm.save("prmstar_build_with_robot.gif", writer=writer, dpi=110,
                      savefig_kwargs={"facecolor": "white"})
        print("Saved prmstar_build_with_robot.gif")
        saved = True
    except Exception as e2:
        print("GIF save failed:", e2)
