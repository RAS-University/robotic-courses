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
# ---------- Clearance utilities (continuous clearance to wall squares) ----------
def clearance_point_vs_walls(grid, px, py, pad=10):
    """Euclidean distance from (px,py) to nearest unit wall square (0 if inside)."""
    import math
    H, W = grid.shape
    cx, cy = int(px), int(py)
    x0, x1 = max(0, cx - pad), min(W - 1, cx + pad)
    y0, y1 = max(0, cy - pad), min(H - 1, cy + pad)
    dmin = float("inf")
    nearest = None
    for yy in range(y0, y1 + 1):
        for xx in range(x0, x1 + 1):
            if grid[yy, xx] == 1:
                # distance from point to axis-aligned unit square [xx,xx+1]x[yy,yy+1]
                dx = 0.0 if xx <= px <= xx+1 else (xx - px if px < xx else px - (xx+1))
                dy = 0.0 if yy <= py <= yy+1 else (yy - py if py < yy else py - (yy+1))
                d = math.hypot(dx, dy)
                if d < dmin:
                    dmin = d
                    # return center of the nearest wall cell for a push direction
                    nearest = (xx + 0.5, yy + 0.5)
    return dmin, nearest

# ---------- Clearance-based sampling ----------
def clearance_based_samples(grid, n, robot_radius=0.25, push_steps=2, step_size=0.20):
    """
    1) Uniformly sample continuous points in [0,W) x [0,H)
    2) Nudge each point away from its nearest wall a few times
    3) Keep only those with clearance >= robot_radius
    """
    H, W = grid.shape
    pts = []
    tries = 0
    max_tries = max(2000, 50*n)
    while len(pts) < n and tries < max_tries:
        tries += 1
        x, y = rng.uniform(0, W), rng.uniform(0, H)
        c, r = int(x), int(y)
        if not (0 <= c < W and 0 <= r < H): 
            continue
        if grid[r, c] == 1:
            continue
        # push away from wall centers
        for _ in range(push_steps):
            d, wn = clearance_point_vs_walls(grid, x, y, pad=10)
            if wn is None: break
            wx, wy = wn
            # push vector from nearest wall center to point
            vx, vy = (x - wx), (y - wy)
            norm = np.hypot(vx, vy) + 1e-9
            x = np.clip(x + step_size * vx / norm, 0.0, W - 1e-6)
            y = np.clip(y + step_size * vy / norm, 0.0, H - 1e-6)
        # accept if clearance ok
        dfin, _ = clearance_point_vs_walls(grid, x, y, pad=10)
        if dfin >= robot_radius and grid[int(y), int(x)] == 0:
            pts.append((x, y))
    return pts

# ---------- Make samples ----------
N_SAMPLES = 500
ROBOT_R = 0.30
samples = clearance_based_samples(grid, N_SAMPLES, robot_radius=ROBOT_R,
                                  push_steps=6, step_size=0.15)

# ---------- Plot ----------
SCALE = 2.3
fig, ax = plt.subplots(figsize=(SCALE*GRID_W/2.5, SCALE*GRID_H/2.5), dpi=120)
ax.set_aspect('equal'); ax.set_xlim(0, GRID_W); ax.set_ylim(GRID_H, 0)
ax.set_xticks([]); ax.set_yticks([])

# walls
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black', zorder=0))

# start/goal
def cell_center(p): return (p[0]+0.5, p[1]+0.5)
sx, sy = cell_center(START); gx, gy = cell_center(GOAL)
ax.add_patch(Circle((sx, sy), 0.25, fc="#13adfa", ec="black", lw=0.8, zorder=3))
ax.add_patch(Circle((gx, gy), 0.25, fc="#0feb55", ec="black", lw=0.8, zorder=3))

# plot samples (far from walls -> concentrated in open regions)
if samples:
    xs, ys = zip(*samples)
else:
    xs, ys = [], []
ax.scatter(xs, ys, s=35, c="#22c55e", edgecolors="none", alpha=0.95, zorder=2)

# ax.set_title("Clearance-Based Sampling (points biased away from obstacles)", pad=8)
plt.savefig("clearance_based_sampling.png", bbox_inches="tight", pad_inches=0.05)
plt.savefig("clearance_based_sampling.svg", bbox_inches="tight", pad_inches=0.05)  # crisp vector
plt.show()
print("Saved: clearance_based_sampling.png / .svg")
