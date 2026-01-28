# =========================
# Maze → Graph build (black points + black edges)
# Then Dijkstra exploration: red relax edges + final thick GREEN path + ROBOT animation
# =========================
import os
import heapq
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from matplotlib.animation import FuncAnimation, PillowWriter
from PIL import Image
from collections import deque

# =========================
# Maze parameters
# =========================
CELL_W, CELL_H = 6, 5     # number of logical cells (corridors at odd indices)
CELL_PX = 64              # visual scaling
GRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1
START = (1, 1)
GOAL  = (GRID_W - 2, GRID_H - 2)
rng = np.random.default_rng(1)

# "More open" tweaks
N_ROOMS   = 3
ROOM_MIN  = (3, 3)
ROOM_MAX  = (7, 5)

def to_grid_xy(cell_x, cell_y):
    return 2*cell_x + 1, 2*cell_y + 1

def cell_to_world(p):
    x, y = p
    return (x + 0.5, y + 0.5)

def add_thymio(ax, pos, size=0.7):
    xw, yw = cell_to_world(pos)
    if os.path.exists("thymio.png"):
        img = Image.open("thymio.png")
        oi = OffsetImage(img, zoom=size)
        ab = AnnotationBbox(oi, (xw, yw), frameon=False)
        ax.add_artist(ab)
        return ab
    else:
        # fallback: return a circle artist we can move
        circ = Circle((xw, yw), 0.3, fc='white', ec='black', lw=1.2)
        ax.add_patch(circ)
        return circ

# =========================
# Maze generation (DFS + braiding)
# =========================
def remove_isolated_walls(grid):
    H, W = grid.shape
    g2 = grid.copy()
    for y in range(1, H-1):
        for x in range(1, W-1):
            if grid[y, x] != 1:
                continue
            if (grid[y, x-1] != 1 and grid[y, x+1] != 1 and
                grid[y-1, x] != 1 and grid[y+1, x] != 1):
                g2[y, x] = 0
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
            grid[2*y+1 + (ny-y), 2*x+1 + (nx-x)] = 0
            grid[2*ny+1, 2*nx+1] = 0
            visited[nx][ny] = True
            stack.append((nx, ny))
        else:
            stack.pop()

    # braid: break some dead ends
    Wg, Hg = grid.shape[1], grid.shape[0]
    for gy in range(1, Hg-1, 2):
        for gx in range(1, Wg-1, 2):
            if grid[gy, gx] != 0:
                continue
            free_nbs = 0
            for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                if 0 <= gx+2*dx < Wg and 0 <= gy+2*dy < Hg and grid[gy+2*dy, gx+2*dx] == 0:
                    free_nbs += 1
            if free_nbs == 1 and rng.random() < braid_prob:
                for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                    wx, wy = gx + dx, gy + dy
                    tx, ty = gx + 2*dx, gy + 2*dy
                    if 0 < tx < Wg-1 and 0 < ty < Hg-1 and grid[wy, wx] == 1 and grid[ty, tx] == 0:
                        grid[wy, wx] = 0
                        break

    grid[START[1], START[0]] = 0
    grid[GOAL[1],  GOAL[0]]  = 0
    return grid

def carve_rooms(grid, n_rooms=N_ROOMS, room_min=ROOM_MIN, room_max=ROOM_MAX):
    H, W = grid.shape
    for _ in range(n_rooms):
        rw = int(rng.integers(room_min[0], min(room_max[0]+1, W-2)))
        rh = int(rng.integers(room_min[1], min(room_max[1]+1, H-2)))
        x0 = int(rng.integers(1, max(2, W - rw - 1)))
        y0 = int(rng.integers(1, max(2, H - rh - 1)))
        if x0 % 2 == 0: x0 += 1
        if y0 % 2 == 0: y0 += 1
        x1, y1 = min(W-2, x0 + rw - 1), min(H-2, y0 + rh - 1)
        grid[y0:y1+1, x0:x1+1] = 0
    grid[START[1], START[0]] = 0
    grid[GOAL[1],  GOAL[0]]  = 0
    return grid

# Build more-open maze
grid = generate_maze(CELL_W, CELL_H, braid_prob=0.15)
grid = carve_rooms(grid, n_rooms=N_ROOMS, room_min=ROOM_MIN, room_max=ROOM_MAX)
grid = remove_isolated_walls(grid)

# =========================
# Build samples (cell centers that are free) + adjacency (4-neighborhood LOS)
# =========================
logical_samples = []
logical_to_idx = {}
for j in range(CELL_H):
    for i in range(CELL_W):
        gx_c, gy_c = 2*i + 1, 2*j + 1
        if 0 <= gx_c < GRID_W and 0 <= gy_c < GRID_H and grid[gy_c, gx_c] == 0:
            logical_to_idx[(gx_c, gy_c)] = len(logical_samples)
            logical_samples.append((gx_c, gy_c))

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
for (gx_c, gy_c), i in logical_to_idx.items():
    for dx, dy in dirs4:
        nx, ny = gx_c + 2*dx, gy_c + 2*dy
        if (nx, ny) in logical_to_idx:
            j = logical_to_idx[(nx, ny)]
            if los_free((gx_c, gy_c), (nx, ny)):
                adj[i].append(j)

# A small BFS only to produce a deterministic edge reveal order for the build animation
if START in logical_to_idx:
    start_idx = logical_to_idx[START]
else:
    sx_i, sy_i = START
    dists = [(abs(cx - sx_i) + abs(cy - sy_i), (cx, cy)) for (cx, cy) in logical_to_idx.keys()]
    dists.sort(key=lambda t: t[0])
    start_idx = logical_to_idx[dists[0][1]]

visited = [False]*len(logical_samples)
q = deque([start_idx])
visited[start_idx] = True
bfs_order_nodes = [start_idx]
parent_edge_order = []

while q:
    u = q.popleft()
    for v in adj[u]:
        if not visited[v]:
            visited[v] = True
            parent_edge_order.append((u, v))
            bfs_order_nodes.append(v)
            q.append(v)

disc_idx = {node: idx for idx, node in enumerate(bfs_order_nodes)}
edges_seen = set()
steps_edges = []
for (u, v) in parent_edge_order:
    a, b = (u, v) if u < v else (v, u)
    if (a, b) not in edges_seen:
        steps_edges.append((u, v))
        edges_seen.add((a, b))
for k, v in enumerate(bfs_order_nodes):
    for u in adj[v]:
        if disc_idx.get(u, 1e9) < disc_idx[v]:
            a, b = (u, v) if u < v else (v, u)
            if (a, b) not in edges_seen:
                steps_edges.append((u, v))
                edges_seen.add((a, b))

# =========================
# Animation 1: Build the graph (BLACK points + BLACK edges)
# =========================
fig_w, fig_h = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig1, ax1 = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
ax1.set_aspect('equal')
ax1.set_xlim(0, GRID_W)
ax1.set_ylim(GRID_H, 0)
ax1.set_xticks([]); ax1.set_yticks([])

# walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax1.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# start/goal
sx, sy = cell_to_world(START)
gx, gy = cell_to_world(GOAL)
ax1.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=3))
ax1.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=3))

# all points: BLACK
xs, ys = zip(*samples_world) if samples_world else ([], [])
scatter_all = ax1.scatter(xs, ys, facecolor="#000000", s=35, alpha=0.95, zorder=4)

edge_lines_build = []

def init_anim_build():
    return [scatter_all]

def animate_build(frame):
    if frame < len(steps_edges):
        u, v = steps_edges[frame]
        (xu, yu) = samples_world[u]
        (xv, yv) = samples_world[v]
        ln, = ax1.plot([xu, xv], [yu, yv], color="#000000", lw=1.8, alpha=0.95, zorder=2)
        edge_lines_build.append(ln)
        return [ln]
    return []

ANIM_INTERVAL_MS_BUILD = 120
anim_build = FuncAnimation(
    fig1, animate_build, init_func=init_anim_build,
    frames=max(1, len(steps_edges)), interval=ANIM_INTERVAL_MS_BUILD,
    blit=False, repeat=False
)
writer = PillowWriter(fps=10, metadata=dict(artist="RAS-U"))
anim_build.save("build_graph.gif", writer=writer, dpi=110)
print("Saved build_graph.gif")
plt.show()

# =========================
# Dijkstra events (for animation 2)
# =========================
# Uniform weights (1 per edge)
weights = [{} for _ in range(len(logical_samples))]
for u in range(len(logical_samples)):
    for v in adj[u]:
        weights[u][v] = 1.0

INF = 1e18
dist = [INF]*len(logical_samples)
prev = [-1]*len(logical_samples)
settled = [False]*len(logical_samples)

goal_idx = logical_to_idx[GOAL]
dist[start_idx] = 0.0

events = []
# event types:
#   'relax_try', u, v         (draw transient RED edge)
#   'settle', u               (optional node highlight)
#   'done', goal              (draw FINAL shortest path in THICK GREEN, then animate robot)

heap = [(0.0, start_idx)]
while heap:
    d, u = heapq.heappop(heap)
    if settled[u]:
        continue
    settled[u] = True
    events.append(('settle', u))
    if u == goal_idx:
        events.append(('done', u))
        break
    for v, w in weights[u].items():
        events.append(('relax_try', u, v))
        nd = d + w
        if nd + 1e-12 < dist[v]:
            dist[v] = nd
            prev[v] = u
            heapq.heappush(heap, (nd, v))

# Reconstruct final path nodes
def backtrack_path(prev, goal_idx, start_idx):
    if prev[goal_idx] == -1 and goal_idx != start_idx:
        return []
    path = []
    cur = goal_idx
    while cur != -1:
        path.append(cur)
        cur = prev[cur]
    return path[::-1]

final_path_nodes = backtrack_path(prev, goal_idx, start_idx)

# Build smooth trajectory along the final path (world coords)
STEPS_PER_EDGE = 12
traj = []
if len(final_path_nodes) >= 2:
    for i in range(len(final_path_nodes)-1):
        (x0, y0) = logical_samples[final_path_nodes[i]]
        (x1, y1) = logical_samples[final_path_nodes[i+1]]
        x0w, y0w = cell_to_world((x0, y0))
        x1w, y1w = cell_to_world((x1, y1))
        for s in range(STEPS_PER_EDGE):
            t = s / STEPS_PER_EDGE
            traj.append((x0w*(1-t) + x1w*t, y0w*(1-t) + y1w*t))
    traj.append(cell_to_world(logical_samples[final_path_nodes[-1]]))
else:
    traj = [cell_to_world(START)]

# =========================
# Animation 2: Dijkstra — base graph BLACK, relax RED, final path thick GREEN + ROBOT
# =========================
fig2, ax2 = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
ax2.set_aspect('equal')
ax2.set_xlim(0, GRID_W)
ax2.set_ylim(GRID_H, 0)
ax2.set_xticks([]); ax2.set_yticks([])

# walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax2.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# start/goal
sx, sy = cell_to_world(START)
gx, gy = cell_to_world(GOAL)
ax2.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=5))
ax2.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=5))

# draw all nodes BLACK
xs, ys = zip(*samples_world) if samples_world else ([], [])
ax2.scatter(xs, ys, facecolor="#000000", s=35, alpha=0.95, zorder=6)

# draw ALL edges upfront as thin BLACK backdrop
seen = set()
for u in range(len(logical_samples)):
    for v in adj[u]:
        a, b = (u, v) if u < v else (v, u)
        if (a, b) in seen: 
            continue
        seen.add((a, b))
        (xu, yu) = samples_world[u]
        (xv, yv) = samples_world[v]
        ax2.plot([xu, xv],[yu, yv], color="#000000", lw=1.2, alpha=0.8, zorder=2)

# containers for animation
relax_lines = []
final_path_line = None
settled_markers = set()

# Robot artist (initialized at START but hidden until robot phase)
robot_artist = add_thymio(ax2, START, size=0.7)
# ensure we can move either artist type
def set_robot_pos(artist, pos_xy):
    if isinstance(artist, AnnotationBbox):
        artist.xy = pos_xy
    elif isinstance(artist, Circle):
        artist.center = pos_xy

# hide robot until path phase
if isinstance(robot_artist, AnnotationBbox):
    robot_artist.set_visible(False)
else:
    robot_artist.set_visible(False)

def draw_edge(ax, u, v, color, lw, alpha=1.0, z=7):
    (xu, yu) = samples_world[u]
    (xv, yv) = samples_world[v]
    ln, = ax.plot([xu, xv], [yu, yv], color=color, lw=lw, alpha=alpha, zorder=z)
    return ln

def init_anim_dij():
    return []

# TOTAL frames = algorithm events + robot trajectory frames
ROBOT_FRAMES = len(traj)
TOTAL_FRAMES = len(events) + ROBOT_FRAMES

def animate_dij(frame):
    global final_path_line
    artists = []

    # Phase 1: Dijkstra event playback
    if frame < len(events):
        e = events[frame]

        if e[0] == 'settle':
            u = e[1]
            # optional subtle halo on settled node
            if u not in settled_markers:
                x, y = samples_world[u]
                halo = ax2.scatter([x],[y], s=60, facecolor=(0,1,0,0.12), edgecolor=None, zorder=4)
                settled_markers.add(u)
                artists.append(halo)

        elif e[0] == 'relax_try':
            u, v = e[1], e[2]
            red = draw_edge(ax2, u, v, color="#ff3b3b", lw=2.2, alpha=0.95, z=8)
            relax_lines.append(red)
            # fade older relax lines slightly
            for ln in relax_lines[:-8]:
                ln.set_alpha(0.2)
            artists.append(red)

        elif e[0] == 'done':
            # draw FINAL SHORTEST PATH in thick GREEN
            if len(final_path_nodes) >= 2:
                xs_fp = [samples_world[i][0] for i in final_path_nodes]
                ys_fp = [samples_world[i][1] for i in final_path_nodes]
                final_path_line, = ax2.plot(xs_fp, ys_fp, color="#05c46b", lw=5.0, alpha=1.0, zorder=9)
                artists.append(final_path_line)

        return artists

    # Phase 2: Robot animation along final path
    robot_step = frame - len(events)
    if ROBOT_FRAMES == 0:
        return []
    if robot_step == 0:
        # reveal robot at the start of motion
        robot_artist.set_visible(True)
    pos = traj[min(robot_step, ROBOT_FRAMES-1)]
    set_robot_pos(robot_artist, pos)
    artists.append(robot_artist)
    return artists

ANIM_INTERVAL_MS_DIJ = 100
anim_dij = FuncAnimation(
    fig2, animate_dij, init_func=init_anim_dij,
    frames=TOTAL_FRAMES, interval=ANIM_INTERVAL_MS_DIJ,
    blit=False, repeat=False
)

# Save
writer2 = PillowWriter(fps=10, metadata=dict(artist="RAS-U"))
anim_dij.save("dijkstra.gif", writer=writer2, dpi=110)
print("Saved dijkstra.gif")

plt.show()
