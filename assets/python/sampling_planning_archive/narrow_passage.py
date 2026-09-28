# =========================
# Narrow Passage Demo (guaranteed 1-cell gap)
# =========================
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle

# Small grid + constants
CELL_W, CELL_H = 4, 4
CELL_PX = 64
GRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1   # -> 9 x 9
START = (1, 1)
GOAL  = (GRID_W - 2, GRID_H - 2)              # (7, 7)

# --- Build a clean “two rooms + one gap” map ---
grid = np.ones((GRID_H, GRID_W), dtype=np.uint8)   # all walls
grid[1:-1, 1:-1] = 0                               # carve one big room

mid_x = GRID_W // 2        # central column (=4)
grid[1:-1, mid_x] = 1      # erect vertical interior wall
gap_y = GRID_H // 2        # central row (=4)
grid[gap_y, mid_x] = 0     # open exactly one-cell gap

# keep start/goal free
grid[START[1], START[0]] = 0
grid[GOAL[1],  GOAL[0]]  = 0

# --- Uniform samples (to show how few hit the gap) ---
rng = np.random.default_rng(20)
NUM_SAMPLES = 250
H, W = grid.shape
xs = rng.uniform(0.0, W, size=NUM_SAMPLES)
ys = rng.uniform(0.0, H, size=NUM_SAMPLES)

# --- helper: point-to-nearest-wall clearance (>= 0.3 means safe) ---
def clearance_point_vs_walls(grid, px, py, pad=4):
    import math
    H, W = grid.shape
    cx, cy = int(px), int(py)
    x0, x1 = max(0, cx - pad), min(W - 1, cx + pad)
    y0, y1 = max(0, cy - pad), min(H - 1, cy + pad)
    dmin = float("inf")
    for yy in range(y0, y1 + 1):
        for xx in range(x0, x1 + 1):
            if grid[yy, xx] == 1:
                # distance from point (px,py) to axis-aligned unit square [xx,xx+1]×[yy,yy+1]
                dx = 0.0 if xx <= px <= xx + 1 else (xx - px if px < xx else px - (xx + 1))
                dy = 0.0 if yy <= py <= yy + 1 else (yy - py if py < yy else py - (yy + 1))
                d = math.hypot(dx, dy)
                if d < dmin:
                    dmin = d
    return dmin

ROBOT_R = 0.3

ROBOT_R = 0.3

def is_collision(grid, px, py, robot_r=ROBOT_R, pad=4):
    import math
    H, W = grid.shape

    # quick reject: outside bounds
    if not (0 <= px < W and 0 <= py < H):
        return True

    # precise check: if *any part* of the robot circle overlaps a wall cell
    cx, cy = int(px), int(py)
    x0, x1 = max(0, cx - pad), min(W - 1, cx + pad)
    y0, y1 = max(0, cy - pad), min(H - 1, cy + pad)
    for yy in range(y0, y1 + 1):
        for xx in range(x0, x1 + 1):
            if grid[yy, xx] != 1:
                continue
            # distance from center (px,py) to wall cell [xx,xx+1]×[yy,yy+1]
            dx = 0.0 if xx <= px <= xx + 1 else (xx - px if px < xx else px - (xx + 1))
            dy = 0.0 if yy <= py <= yy + 1 else (yy - py if py < yy else py - (yy + 1))
            d = math.hypot(dx, dy)
            if d < robot_r:   # overlap => collision
                return True
    return False


# Apply it to all samples
collide = [is_collision(grid, x, y) for x, y in zip(xs, ys)]
collide = np.array(collide, dtype=bool)

xs_free, ys_free = xs[~collide], ys[~collide]
xs_bad,  ys_bad  = xs[collide],  ys[collide]


# --- Render in same style ---
fig_w, fig_h = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig, ax = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
ax.set_aspect('equal'); ax.set_xlim(0, GRID_W); ax.set_ylim(GRID_H, 0)
ax.set_xticks([]); ax.set_yticks([])

# walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# start/goal markers (same size/colors)
sx, sy = START[0] + 0.5, START[1] + 0.5
gx, gy = GOAL[0]  + 0.5, GOAL[1]  + 0.5
ax.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=3))
ax.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=3))

# samples: valid (green), invalid (red)
if xs_bad.size:
    ax.scatter(xs_bad, ys_bad, s=30, c="#ef4444", ec="white", lw=0.6, zorder=2, label="colliding")
if xs_free.size:
    ax.scatter(xs_free, ys_free, s=30, c="#22c55e", ec="white", lw=0.6, zorder=2, label="free")

# (optional) outline the gap cell to make it obvious
# ax.add_patch(Rectangle((mid_x, gap_y), 1, 1, fill=False, edgecolor="#fde047", lw=2, zorder=4))

# ax.legend(frameon=False, loc="upper right", fontsize=9)
plt.tight_layout()
plt.savefig("narow_passage.png", dpi=400, bbox_inches="tight")
plt.show()
print("Saved uniform_based.png")
