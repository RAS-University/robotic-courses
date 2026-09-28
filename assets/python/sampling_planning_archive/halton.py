# =========================
# Side-by-side: Pseudo-random vs Halton sampling (200 pts each)
# on a narrow-passage maze, with geometric collision (robot radius)
# =========================
import math
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle

# -------------------------
# Maze (narrow passage with 1-cell gap)
# -------------------------
CELL_W, CELL_H = 4, 4
CELL_PX = 64
GRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1   # 9 x 9
START = (1, 1)
GOAL  = (GRID_W - 2, GRID_H - 2)              # (7, 7)

grid = np.ones((GRID_H, GRID_W), dtype=np.uint8)   # all walls
grid[1:-1, 1:-1] = 0                               # carve one big room

mid_x = GRID_W // 2        # central column (=4)
grid[1:-1, mid_x] = 1      # vertical interior wall
gap_y = GRID_H // 2        # central row (=4)
grid[gap_y, mid_x] = 0     # exactly one-cell gap

# keep start/goal free
grid[START[1], START[0]] = 0
grid[GOAL[1],  GOAL[0]]  = 0

H, W = grid.shape

def cell_center(p):
    return (p[0] + 0.5, p[1] + 0.5)

# -------------------------
# Collision & clearance utilities (geometric, with robot radius)
# -------------------------
ROBOT_R = 0.30  # change to visualize stricter/looser clearance

def clearance_point_vs_walls(grid, px, py, pad=4):
    """
    Minimum Euclidean distance from (px,py) to the nearest wall cell's unit square.
    Returns +inf if no walls in the local 'pad' window.
    """
    H, W = grid.shape
    cx, cy = int(px), int(py)
    x0, x1 = max(0, cx - pad), min(W - 1, cx + pad)
    y0, y1 = max(0, cy - pad), min(H - 1, cy + pad)
    dmin = float("inf")

    for yy in range(y0, y1 + 1):
        for xx in range(x0, x1 + 1):
            if grid[yy, xx] == 1:
                # Distance from point to axis-aligned unit square [xx,xx+1]×[yy,yy+1]
                dx = 0.0 if xx <= px <= xx + 1 else (xx - px if px < xx else px - (xx + 1))
                dy = 0.0 if yy <= py <= yy + 1 else (yy - py if py < yy else py - (yy + 1))
                d = math.hypot(dx, dy)
                if d < dmin:
                    dmin = d
    return dmin

def is_collision(grid, px, py, robot_r=ROBOT_R, pad=4):
    """
    True if a circular robot of radius 'robot_r' centered at (px,py)
    intersects any wall cell. Handles fractional coordinates.
    """
    H, W = grid.shape
    # quick reject: outside bounds
    if not (0 <= px < W and 0 <= py < H):
        return True

    cx, cy = int(px), int(py)
    x0, x1 = max(0, cx - pad), min(W - 1, cx + pad)
    y0, y1 = max(0, cy - pad), min(H - 1, cy + pad)

    for yy in range(y0, y1 + 1):
        for xx in range(x0, x1 + 1):
            if grid[yy, xx] != 1:
                continue
            # Min distance from center to wall cell [xx,xx+1]×[yy,yy+1]
            dx = 0.0 if xx <= px <= xx + 1 else (xx - px if px < xx else px - (xx + 1))
            dy = 0.0 if yy <= py <= yy + 1 else (yy - py if py < yy else py - (yy + 1))
            d = math.hypot(dx, dy)
            if d < robot_r:
                return True
    return False

def collide_mask(xs, ys, grid, robot_r=ROBOT_R):
    """Vectorized wrapper to compute collision mask for arrays xs, ys."""
    return np.array([is_collision(grid, x, y, robot_r=robot_r) for x, y in zip(xs, ys)], dtype=bool)

# -------------------------
# Sampling: pseudo-random and Halton (200 points each)
# -------------------------
NUM_SAMPLES = 200
rng = np.random.default_rng(42)

# Pseudo-random uniform samples over [0, W) x [0, H)
xs_rand = rng.uniform(0.0, W, size=NUM_SAMPLES)
ys_rand = rng.uniform(0.0, H, size=NUM_SAMPLES)

# Halton sequence (bases 2 and 3)
def _van_der_corput(n, base):
    vdc, denom = 0.0, 1.0
    while n:
        n, remainder = divmod(n, base)
        denom *= base
        vdc += remainder / denom
    return vdc

def halton_sequence(n_points, dim_bases=(2, 3), seed_index=1):
    pts = np.zeros((n_points, 2), dtype=float)
    for i in range(n_points):
        idx = seed_index + i
        pts[i, 0] = _van_der_corput(idx, dim_bases[0])
        pts[i, 1] = _van_der_corput(idx, dim_bases[1])
    return pts

halton = halton_sequence(NUM_SAMPLES, (2, 3), seed_index=5)
xs_hal = halton[:, 0] * W
ys_hal = halton[:, 1] * H

# Collisions using geometric model
coll_rand = collide_mask(xs_rand, ys_rand, grid, robot_r=ROBOT_R)
coll_hal  = collide_mask(xs_hal,  ys_hal,  grid, robot_r=ROBOT_R)

# -------------------------
# Drawing helpers
# -------------------------
def draw_maze(ax, grid):
    H, W = grid.shape
    ax.set_aspect('equal')
    ax.set_xlim(0, W)
    ax.set_ylim(H, 0)
    ax.set_xticks([]); ax.set_yticks([])
    for y in range(H):
        for x in range(W):
            if grid[y, x] == 1:
                ax.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black'))
    # start/goal markers (matching your colors/sizes)
    sx, sy = cell_center(START)
    gx, gy = cell_center(GOAL)
    ax.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.8))
    ax.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.8))

def scatter_valid_invalid(ax, xs, ys, coll_mask, s=34):
    if len(xs) == 0:
        return
    xs, ys = np.asarray(xs), np.asarray(ys)
    mask_ok = ~coll_mask
    ax.scatter(xs[mask_ok], ys[mask_ok], s=s, c="#22c55e", ec="white", lw=0.4, alpha=0.95, zorder=3, label="Free")
    ax.scatter(xs[coll_mask], ys[coll_mask], s=s, c="#ef4444", ec="white", lw=0.4, alpha=0.95, zorder=3, label="Collision")

# -------------------------
# Figure (high DPI for crisp output)
# -------------------------
fig_w, fig_h = (W * CELL_PX / 110, H * CELL_PX / 110)
fig, axes = plt.subplots(1, 2, figsize=(fig_w*2.0, fig_h), dpi=220)

# Left: Pseudo-random
axL = axes[0]
draw_maze(axL, grid)
scatter_valid_invalid(axL, xs_rand, ys_rand, coll_rand, s=36)
axL.set_title("Uniform", fontsize=12, pad=6)
axL.legend(loc="lower right", frameon=False, fontsize=9)

# Right: Halton
axR = axes[1]
draw_maze(axR, grid)
scatter_valid_invalid(axR, xs_hal, ys_hal, coll_hal, s=36)
axR.set_title("Halton Sequence", fontsize=12, pad=6)
axR.legend(loc="lower right", frameon=False, fontsize=9)

plt.tight_layout()
plt.savefig("random_vs_halton.png", bbox_inches="tight")
plt.show()
print("Saved random_vs_halton.png")
