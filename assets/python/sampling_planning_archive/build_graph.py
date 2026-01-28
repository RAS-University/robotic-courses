# =========================
# Maze + Equally Spaced Points + Deterministic BFS Connections
# Animation: show ALL points first, then connect them (one edge per frame)
# =========================
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

# -------------------------
# 4-neighborhood visibility adjacency (deterministic order: Right, Down, Left, Up)
# -------------------------
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

def animate(frame):
    # Reveal one edge per frame, in the deterministic order built above
    if frame < len(steps_edges):
        u, v = steps_edges[frame]
        (xu, yu) = samples_world[u]
        (xv, yv) = samples_world[v]
        ln, = ax.plot([xu, xv], [yu, yv], color="#000000", lw=1.8, alpha=0.9, zorder=2)
        edge_lines.append(ln)
        return [ln]
    return []
from matplotlib.animation import PillowWriter
ANIM_INTERVAL_MS = 30000
anim = FuncAnimation(
    fig, animate, init_func=init_anim,
    frames=max(1, len(steps_edges)), interval=ANIM_INTERVAL_MS,
    
    blit=False, repeat=False
)

writer = PillowWriter(fps=5, metadata=dict(artist="RAS-U"))
anim.save("build_graph.gif", writer=writer, dpi=110)
print("Saved build_graph.gif")

plt.show()
plt.show()
