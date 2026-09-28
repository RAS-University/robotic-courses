# =========================
# Uniform Sampling vs Obstacles (Valid = Green, Invalid = Red)
# =========================
import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from PIL import Image

# -------------------------
# Maze parameters
# -------------------------
CELL_W, CELL_H = 6, 5      # logical cells
CELL_PX = 64               # visual scaling
GRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1
START = (1, 1)
GOAL  = (GRID_W - 2, GRID_H - 2)
rng = np.random.default_rng(1)

# Tunables for a more open look (optional, used by carve_rooms)
N_ROOMS   = 3
ROOM_MIN  = (3, 3)
ROOM_MAX  = (7, 5)
GAP_PROB  = 0.18

# -------------------------
# Helpers
# -------------------------
def to_grid_xy(cell_x, cell_y):
    return 2*cell_x + 1, 2*cell_y + 1

def remove_isolated_walls(grid):
    """Removes any wall cell (1) that has no adjacent wall (4-neighbors)."""
    H, W = grid.shape
    g2 = grid.copy()
    for y in range(1, H-1):
        for x in range(1, W-1):
            if grid[y, x] != 1:
                continue
            wall_neighbors = 0
            for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                if grid[y+dy, x+dx] == 1:
                    wall_neighbors += 1
            if wall_neighbors == 0:
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
            # Knock down the wall between (x,y) and (nx,ny)
            grid[2*y+1 + (ny-y), 2*x+1 + (nx-x)] = 0
            grid[2*ny+1, 2*nx+1] = 0
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
            free_nbs = 0
            for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
                if 0 <= gx+2*dx < Wg and 0 <= gy+2*dy < Hg and grid[gy+2*dy, gx+2*dx] == 0:
                    free_nbs += 1
            if free_nbs == 1 and rng.random() < braid_prob:
                dirs = [(1,0),(-1,0),(0,1),(0,-1)]
                rng.shuffle(dirs)
                for dx, dy in dirs:
                    wx, wy = gx + dx, gy + dy
                    tx, ty = gx + 2*dx, gy + 2*dy
                    if 0 < tx < Wg-1 and 0 < ty < Hg-1 and grid[wy, wx] == 1 and grid[ty, tx] == 0:
                        grid[wy, wx] = 0
                        break

    # ensure start/goal open
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

# -------------------------
# Build a more-open maze
# -------------------------
grid = generate_maze(CELL_W, CELL_H, braid_prob=0.15)
grid = carve_rooms(grid, n_rooms=N_ROOMS, room_min=ROOM_MIN, room_max=ROOM_MAX)
grid = remove_isolated_walls(grid)

# -------------------------
# Uniform sampling over the entire map
# -------------------------
NUM_SAMPLES = 500  # tweak as you like
H, W = grid.shape

# Sample (x, y) ~ Uniform(0, W) × Uniform(0, H)
xs = rng.uniform(0.0, W, size=NUM_SAMPLES)
ys = rng.uniform(0.0, H, size=NUM_SAMPLES)

# Classify samples: colliding if they fall in a wall cell
collide_mask = []
for x, y in zip(xs, ys):
    c, r = int(x), int(y)
    if 0 <= r < H and 0 <= c < W and grid[r, c] == 1:
        collide_mask.append(True)
    else:
        collide_mask.append(False)
collide_mask = np.array(collide_mask, dtype=bool)

xs_free, ys_free = xs[~collide_mask], ys[~collide_mask]
xs_bad,  ys_bad  = xs[collide_mask],  ys[collide_mask]

# -------------------------
# Render
# -------------------------
fig_w, fig_h = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig, ax = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
ax.set_aspect('equal')
ax.set_xlim(0, GRID_W)
ax.set_ylim(GRID_H, 0)
ax.set_xticks([]); ax.set_yticks([])

# Walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# Start/Goal markers (same style/size as your other figures)
sx, sy = START[0] + 0.5, START[1] + 0.5
gx, gy = GOAL[0]  + 0.5, GOAL[1]  + 0.5
ax.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=3))
ax.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=3))

# Samples: valid (green), invalid (red)
# Match your node styling (white edge, similar size)
if xs_bad.size:
    ax.scatter(xs_bad, ys_bad, s=30, c="#ef4444", ec="white", lw=0.6, zorder=2, label="colliding")
if xs_free.size:
    ax.scatter(xs_free, ys_free, s=30, c="#22c55e", ec="white", lw=0.6, zorder=2, label="free")

# Optional legend (small)
ax.legend(frameon=False, loc="upper right", fontsize=9)

out_path = "uniform_sampling.png"
plt.savefig(out_path, bbox_inches="tight", dpi=130)
plt.show()
print(f"Saved {out_path}")
