import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Circle
from matplotlib.offsetbox import OffsetImage, AnnotationBbox
from matplotlib.animation import FuncAnimation
from PIL import Image
from collections import deque

# =========================
# Parameters
# =========================
CELL_W, CELL_H = 6, 5              # logical maze size
CELL_PX = 64                       # visual scaling
GRID_W, GRID_H = 2*CELL_W + 1, 2*CELL_H + 1
START = (1, 1)
GOAL  = (GRID_W - 2, GRID_H - 2)
rng = np.random.default_rng(1)

# "More open" knobs
N_ROOMS   = 3
ROOM_MIN  = (3, 3)                 # room size in grid cells
ROOM_MAX  = (7, 5)
GAP_PROB  = 0.18                   # (optional) punch extra gaps

# Navigation potential (used for planning/path only)
ZETA     = 1.0                     # attractive gain
ETA_W    = 2.0                     # wall repulsive gain
QSTAR_W  = 2.5                     # wall influence distance (cells)
USE_8_CONNECTED = True

# Descent/tie-break tolerances
ROUND_DEC   = 14
DESCENT_EPS = 1e-12

# Visual potential & gradient settings
UPSCALE   = 32                     # high-res scalar field scale
SIGMA_PX  = 2.0                    # Gaussian blur in high-res pixels
CMAP      = plt.cm.viridis       # heatmap colormap (walls "hot")

# =========================
# Helpers
# =========================
def to_grid_xy(cell_x, cell_y):
    return 2*cell_x + 1, 2*cell_y + 1

def cell_to_world(p):
    x, y = p
    return (x + 0.5, y + 0.5)

def add_thymio_artist(ax, pos, size=0.7):
    xw, yw = cell_to_world(pos)
    if os.path.exists("thymio.png"):
        img = Image.open("thymio.png")
        oi = OffsetImage(img, zoom=size)
        ab = AnnotationBbox(oi, (xw, yw), frameon=False)
        ax.add_artist(ab)
        return ab
    else:
        body = Circle((xw, yw), 0.3, fc='white', ec='black', lw=1.2)
        ax.add_patch(body)
        return body

# =========================
# Maze generation (DFS + braiding) + post-processing
# =========================
def remove_isolated_walls(grid):
    """Remove any wall cell with no 4-neighbor walls."""
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
    grid = np.ones((H, W), dtype=np.uint8)  # 1=wall, 0=free

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
            # knock wall between (x,y) and (nx,ny)
            grid[2*y+1 + (ny-y), 2*x+1 + (nx-x)] = 0
            grid[2*ny+1, 2*nx+1] = 0
            visited[nx][ny] = True
            stack.append((nx, ny))
        else:
            stack.pop()

    # Braid: break some dead ends
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

    # ensure start/goal free
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

def punch_gaps(grid, gap_prob=GAP_PROB):
    H, W = grid.shape
    for y in range(1, H-1):
        for x in range(1, W-1):
            if grid[y, x] != 1:
                continue
            if grid[y, x-1] == 0 and grid[y, x+1] == 0 and rng.random() < gap_prob:
                grid[y, x] = 0
            elif grid[y-1, x] == 0 and grid[y+1, x] == 0 and rng.random() < gap_prob:
                grid[y, x] = 0
    grid[START[1], START[0]] = 0
    grid[GOAL[1],  GOAL[0]]  = 0
    return grid

# Build maze
grid = generate_maze(CELL_W, CELL_H, braid_prob=0.15)
grid = carve_rooms(grid, n_rooms=N_ROOMS, room_min=ROOM_MIN, room_max=ROOM_MAX)
# grid = punch_gaps(grid, gap_prob=GAP_PROB)  # optional
grid = remove_isolated_walls(grid)

# =========================
# Navigation potential (goal attractor + walls repulsive)
# =========================
def distance_to_walls(g):
    H, W = g.shape
    dist = np.full((H, W), np.inf, dtype=float)
    q = deque()
    for y in range(H):
        for x in range(W):
            if g[y, x] == 1:
                dist[y, x] = 0.0
                q.append((x, y))
    nbr4 = [(1,0), (-1,0), (0,1), (0,-1)]
    while q:
        x, y = q.popleft()
        for dx, dy in nbr4:
            nx, ny = x + dx, y + dy
            if 0 <= nx < W and 0 <= ny < H and dist[ny, nx] > dist[y, x] + 1:
                dist[ny, nx] = dist[y, x] + 1
                q.append((nx, ny))
    return dist

def compute_potential(g, goal, zeta=ZETA, eta_w=ETA_W, qstar_w=QSTAR_W):
    H, W = g.shape
    d_w = distance_to_walls(g)
    gx, gy = goal
    X, Y = np.meshgrid(np.arange(W), np.arange(H))

    # Attractive (quadratic) to goal
    U_att = 0.5 * zeta * ((X - gx)**2 + (Y - gy)**2)

    # Repulsive from walls (within qstar)
    U_rep_w = np.zeros_like(U_att, dtype=float)
    mask = (d_w > 0) & (d_w <= qstar_w)
    U_rep_w[mask] = 0.5 * ETA_W * ((1.0/d_w[mask] - 1.0/qstar_w)**2)

    U = U_att + U_rep_w
    U[g == 1] = np.inf   # hard constraint: walls forbidden for navigation
    return U

U = compute_potential(grid, GOAL)

# =========================
# Shared path extraction (deterministic, no corner cutting)
# =========================
def is_free_cell(p):
    x, y = p
    return 0 <= x < GRID_W and 0 <= y < GRID_H and grid[y, x] == 0

def diagonal_allowed(a, b):
    ax, ay = a; bx, by = b
    dx, dy = bx - ax, by - ay
    if abs(dx) == 1 and abs(dy) == 1:
        c1 = (ax + dx, ay)
        c2 = (ax, ay + dy)
        return is_free_cell(c1) and is_free_cell(c2)
    return True

def neighbors_nocut(p, use8=True):
    x, y = p
    steps4 = [(1,0),(-1,0),(0,1),(0,-1)]
    steps8 = steps4 + [(1,1),(1,-1),(-1,1),(-1,-1)]
    for dx, dy in (steps8 if use8 else steps4):
        nb = (x+dx, y+dy)
        if is_free_cell(nb) and diagonal_allowed(p, nb):
            yield nb

def _best_neighbor(cur, U, goal, neigh_iter, axis_bias=None):
    """
    Tie-breaks: U -> Manhattan gain -> Euclidean -> prefer orthogonal -> optional axis bias
    """
    cx, cy = cur
    gx, gy = goal
    L1_cur = abs(cx - gx) + abs(cy - gy)

    cands = []
    for nb in neigh_iter(cur):
        nx, ny = nb
        val = U[ny, nx]
        if not np.isfinite(val):
            continue
        L1_nb   = abs(nx - gx) + abs(ny - gy)
        dL1     = L1_cur - L1_nb
        h_goal  = (nx - gx)**2 + (ny - gy)**2
        step2   = (nx - cx)**2 + (ny - cy)**2  # prefer orthogonal (1) over diagonal (2)
        bias    = 0.0
        if axis_bias == 'x':
            bias = abs(nx - cx) * 1e-6
        elif axis_bias == 'y':
            bias = abs(ny - cy) * 1e-6
        cands.append((val, -dL1, h_goal, step2, bias, nb))

    if not cands:
        return None, None

    cands.sort(key=lambda t: (round(t[0], ROUND_DEC), t[1], t[2], t[3], t[4]))
    best = cands[0]
    return best[-1], best[0]

def potential_field_path(U, start, goal, max_steps=5000, use8=True, nocut=True, axis_bias=None):
    path = [start]
    cur = start
    last_U = U[cur[1], cur[0]]
    neigh = (neighbors_nocut if nocut else neighbors_nocut)  # always no-cut here

    for _ in range(max_steps):
        if cur == goal:
            break
        best_nb, best_val = _best_neighbor(
            cur, U, goal,
            lambda p: (nb for nb in neigh(p, use8) if is_free_cell(nb)),
            axis_bias=axis_bias
        )
        if best_nb is None or not np.isfinite(best_val) or best_val > last_U - DESCENT_EPS:
            break
        path.append(best_nb)
        cur = best_nb
        last_U = best_val
    return path

pf_path = potential_field_path(U, START, GOAL, use8=USE_8_CONNECTED, nocut=True, axis_bias=None)

# Smooth trajectory from the discrete path
STEPS_PER_EDGE = 12
traj = []
if len(pf_path) >= 2:
    for i in range(len(pf_path)-1):
        (x0, y0), (x1, y1) = pf_path[i], pf_path[i+1]
        x0w, y0w = cell_to_world((x0, y0))
        x1w, y1w = cell_to_world((x1, y1))
        for s in range(STEPS_PER_EDGE):
            t = s / STEPS_PER_EDGE
            traj.append((x0w*(1-t) + x1w*t, y0w*(1-t) + y1w*t))
    traj.append(cell_to_world(GOAL))
else:
    traj = [cell_to_world(START)]

# =========================
# VISUAL potential: walls as COMPLETE OPPOSITE of the goal (highest)
# =========================
def make_visual_potential_opposite(U_nav, grid, wall_margin=1.0):
    """
    Visual potential with walls at the HIGHEST value (opposite of goal).
    Keeps free-space values from U_nav; walls get max_finite+margin.
    """
    U_vis = U_nav.copy()
    finite_vals = U_vis[np.isfinite(U_vis)]
    if finite_vals.size == 0:
        return U_vis
    max_fin = np.nanmax(finite_vals)
    wall_val = max_fin + wall_margin
    U_vis[grid == 1] = wall_val
    U_vis[~np.isfinite(U_vis)] = wall_val
    return U_vis

def bilinear_upsample(U_in, scale):
    """Mask-aware bilinear upsampling."""
    U0 = U_in.copy()
    finite = np.isfinite(U0)
    V = np.where(finite, U0, 0.0).astype(float)
    Wm = finite.astype(float)

    H, Wc = V.shape
    Hr = H * scale
    Wr = Wc * scale

    x_src = np.arange(Wc)
    x_tgt = np.linspace(0, Wc - 1, Wr)
    y_src = np.arange(H)
    y_tgt = np.linspace(0, H - 1, Hr)

    V_row = np.vstack([np.interp(x_tgt, x_src, V[r, :]) for r in range(H)])
    W_row = np.vstack([np.interp(x_tgt, x_src, Wm[r, :]) for r in range(H)])

    V_hr = np.vstack([np.interp(y_tgt, y_src, V_row[:, c]) for c in range(Wr)]).T
    W_hr = np.vstack([np.interp(y_tgt, y_src, W_row[:, c]) for c in range(Wr)]).T

    U_hr = V_hr / np.maximum(W_hr, 1e-9)
    U_hr[W_hr < 1e-3] = np.nan
    return U_hr

def gaussian1d(sigma, radius=None):
    if sigma <= 0:
        return np.array([1.0])
    if radius is None:
        radius = int(np.ceil(3*sigma))
    x = np.arange(-radius, radius+1, dtype=float)
    k = np.exp(-(x*x)/(2*sigma*sigma))
    k /= k.sum()
    return k

def gaussian_blur_separable(img, sigma_y, sigma_x):
    """Pure NumPy separable Gaussian blur, NaN-aware."""
    ky = gaussian1d(sigma_y)
    kx = gaussian1d(sigma_x)
    H, W = img.shape

    # Blur X
    tmp = np.empty_like(img, dtype=float)
    Rx = len(kx)//2
    for y in range(H):
        row = img[y, :]
        w = ~np.isnan(row)
        out = np.zeros(W, dtype=float)
        norm = np.zeros(W, dtype=float)
        for x in range(W):
            xs = slice(max(0, x-Rx), min(W, x+Rx+1))
            ks = kx[Rx - (x - max(0, x-Rx)) : Rx + (min(W, x+Rx+1)-x)]
            ww = w[xs].astype(float)
            rr = row[xs].copy()
            rr[~w[xs]] = 0.0
            out[x] = np.sum(rr * ks)
            norm[x] = np.sum(ww * ks)
        tmp[y, :] = np.divide(out, np.maximum(norm, 1e-12))
        tmp[y, norm < 1e-6] = np.nan

    # Blur Y
    out = np.empty_like(img, dtype=float)
    Ry = len(ky)//2
    for x in range(W):
        col = tmp[:, x]
        w = ~np.isnan(col)
        o = np.zeros(H, dtype=float)
        n = np.zeros(H, dtype=float)
        for y in range(H):
            ys = slice(max(0, y-Ry), min(H, y+Ry+1))
            ks = ky[Ry - (y - max(0, y-Ry)) : Ry + (min(H, y+Ry+1)-y)]
            ww = w[ys].astype(float)
            cc = col[ys].copy()
            cc[~w[ys]] = 0.0
            o[y] = np.sum(cc * ks)
            n[y] = np.sum(ww * ks)
        out[:, x] = np.divide(o, np.maximum(n, 1e-12))
        out[n < 1e-6, x] = np.nan

    return out

# Build visual field (walls highest), upsample & smooth
U_vis = make_visual_potential_opposite(U, grid, wall_margin=1.0)
U_vis_hr = bilinear_upsample(U_vis, UPSCALE)
U_vis_hr_smooth = gaussian_blur_separable(U_vis_hr, SIGMA_PX, SIGMA_PX)

# =========================
# Gradient helpers (for visuals)
# =========================
def add_gradient_quiver_from_hr(ax, U_hr, grid_w, grid_h, stride_px, scale=160, width=0.0022, alpha=0.9):
    """
    Draw -grad(U_hr) arrows (pointing from high to low potential).
    """
    dUy, dUx = np.gradient(U_hr)
    Gx = -dUx
    Gy = -dUy
    H, W = U_hr.shape

    xs, ys, u, v = [], [], [], []
    for y in range(0, H, stride_px):
        for x in range(0, W, stride_px):
            val = U_hr[y, x]
            if not np.isfinite(val):
                continue
            wx = x * (grid_w / (W - 1))
            wy = y * (grid_h / (H - 1))
            xs.append(wx); ys.append(wy)
            u.append(Gx[y, x]); v.append(Gy[y, x])

    if xs:
        ax.quiver(xs, ys, u, v, angles='xy', scale_units='xy', scale=scale,
                  width=width, alpha=alpha, zorder=2)

# =========================
# Visualization 1: Maze (static)
# =========================
fig_w, fig_h = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig, ax = plt.subplots(figsize=(fig_w, fig_h), dpi=110)
ax.set_aspect('equal')
ax.set_xlim(0, GRID_W); ax.set_ylim(GRID_H, 0)
ax.set_xticks([]); ax.set_yticks([])
for y in range(GRID_H):
    for x in range(GRID_W):
        if grid[y, x] == 1:
            ax.add_patch(Rectangle((x, y), 1, 1, linewidth=0, facecolor='black'))
sx, sy = cell_to_world(START)
gx, gy = cell_to_world(GOAL)
ax.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7))
ax.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7))
add_thymio_artist(ax, START, size=0.7)
plt.show()

# =========================
# Visualization 2: Visual potential (walls highest) + path (static)
# =========================
fig_w2, fig_h2 = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig2, ax2 = plt.subplots(figsize=(fig_w2, fig_h2), dpi=110)
ax2.set_aspect('equal')
ax2.set_xlim(0, GRID_W); ax2.set_ylim(GRID_H, 0)
ax2.set_xticks([]); ax2.set_yticks([])

U_draw = U_vis.copy()
U_draw[~np.isfinite(U_draw)] = np.nan
xx, yy = np.meshgrid(np.arange(GRID_W+1), np.arange(GRID_H+1))
pcm2 = ax2.pcolormesh(xx, yy, U_draw, cmap=CMAP, shading='auto', alpha=0.6)
ax2.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=3))
ax2.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=3))
if len(pf_path) >= 2:
    xs = [cell_to_world(p)[0] for p in pf_path]
    ys = [cell_to_world(p)[1] for p in pf_path]
    ax2.plot(xs, ys, linewidth=2.0, zorder=4, color='white')
plt.colorbar(pcm2, ax=ax2, fraction=0.046, pad=0.04).set_label("U_vis (walls highest)")
plt.show()

# =========================
# Visualization 3: Animation • Smooth High-Res Field + Gradient (NO WALLS)
# =========================
fig_w4, fig_h4 = GRID_W * CELL_PX / 110, GRID_H * CELL_PX / 110
fig4, ax4 = plt.subplots(figsize=(fig_w4, fig_h4), dpi=110)
ax4.set_aspect('equal')
ax4.set_xlim(0, GRID_W); ax4.set_ylim(GRID_H, 0)
ax4.set_xticks([]); ax4.set_yticks([])
xx_hr, yy_hr = np.meshgrid(
    np.linspace(0, GRID_W, U_vis_hr_smooth.shape[1]),
    np.linspace(0, GRID_H, U_vis_hr_smooth.shape[0])
)
pcm4 = ax4.pcolormesh(xx_hr, yy_hr, U_vis_hr_smooth, cmap=CMAP, shading='auto', alpha=0.95, zorder=0)

# Gradient arrows
STRIDE_HR = max(UPSCALE // 2, 6)  # arrow density
add_gradient_quiver_from_hr(ax4, U_vis_hr_smooth, GRID_W, GRID_H, stride_px=STRIDE_HR,
                            scale=160, width=0.0022, alpha=0.85)

# Start/Goal + Path
ax4.add_patch(Circle((sx, sy), 0.25, facecolor="#13adfa", edgecolor='black', lw=0.7, zorder=3))
ax4.add_patch(Circle((gx, gy), 0.25, facecolor="#0feb55", edgecolor='black', lw=0.7, zorder=3))
if len(pf_path) >= 2:
    xs = [cell_to_world(p)[0] for p in pf_path]
    ys = [cell_to_world(p)[1] for p in pf_path]
    ax4.plot(xs, ys, linewidth=1.8, alpha=0.75, zorder=3, color='white')

robot_artist4 = add_thymio_artist(ax4, START, size=0.7)

def update_robot4(pos_xy):
    global robot_artist4
    try:
        robot_artist4.remove()
    except Exception:
        pass
    if os.path.exists("thymio.png"):
        img = Image.open("thymio.png")
        oi = OffsetImage(img, zoom=0.7)
        ab = AnnotationBbox(oi, pos_xy, frameon=False, zorder=4)
        ax4.add_artist(ab)
        robot_artist4 = ab
    else:
        robot_artist4 = ax4.add_patch(Circle(pos_xy, 0.3, fc='white', ec='black', lw=1.2, zorder=4))
    return robot_artist4

def init_anim4(): return (robot_artist4,)

ANIM_INTERVAL_MS = 35
def animate4(i):
    pos = traj[min(i, len(traj)-1)]
    artist = update_robot4(pos)
    return (artist,)
from matplotlib.animation import PillowWriter

# ... your code that builds `anim` ...




anim = FuncAnimation(
    fig4, animate4, init_func=init_anim4,
    frames=len(traj), interval=ANIM_INTERVAL_MS,
    blit=False, repeat=False
)

# Save to GIF
writer = PillowWriter(fps=30, metadata=dict(artist="RAS-U"))
anim.save("potential.gif", writer=writer, dpi=110)
print("Saved potential.gif")

plt.show()

# ======== 3D potential (masked walls) + rolling ball + saved animation (append-only) ========
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401
from matplotlib.animation import FuncAnimation
import numpy as np

# Build high-res grid from your smoothed field
X3, Y3 = np.meshgrid(
    np.linspace(0, GRID_W, U_vis_hr_smooth.shape[1]),
    np.linspace(0, GRID_H, U_vis_hr_smooth.shape[0])
)
Z3 = U_vis_hr_smooth.copy()

finite_vals = Z3[np.isfinite(Z3)]
Zmin = float(np.nanmin(finite_vals))
Zmax = float(np.nanmax(finite_vals))
Zwall = Zmax + (Zmax - Zmin) * 0.25  # walls a bit higher

# Bilinear interpolation of Z3 at world coords (xw, yw)
def interp_Z(xw, yw):
    h, w = Z3.shape
    ix = (w - 1) * (xw / GRID_W)
    iy = (h - 1) * (yw / GRID_H)
    x0 = int(np.clip(np.floor(ix), 0, w - 2))
    y0 = int(np.clip(np.floor(iy), 0, h - 2))
    tx = ix - x0
    ty = iy - y0
    z00 = Z3[y0,   x0  ]
    z10 = Z3[y0,   x0+1]
    z01 = Z3[y0+1, x0  ]
    z11 = Z3[y0+1, x0+1]
    z0 = (1 - tx) * z00 + tx * z10
    z1 = (1 - tx) * z01 + tx * z11
    return (1 - ty) * z0 + ty * z1

# ---------- Static 3D view without bar3d ----------
fig3d = plt.figure(figsize=(9, 6), dpi=110)
ax3d = fig3d.add_subplot(111, projection='3d')

# Free-space surface (mask out walls/NaNs)
Z_free = np.ma.masked_invalid(Z3)
surf_free = ax3d.plot_surface(
    X3, Y3, Z_free, cmap=CMAP, linewidth=0, antialiased=True, alpha=0.95, zorder=1
)

# Walls as a second solid black surface (masked where free)
Z_walls = np.full_like(Z3, Zwall)
mask_free = np.isfinite(Z3)  # True on free, False on walls
Z_walls_masked = np.ma.masked_where(mask_free, Z_walls)
surf_walls = ax3d.plot_surface(
    X3, Y3, Z_walls_masked, color='black', linewidth=0, antialiased=False, shade=False, alpha=1.0, zorder=2
)

# Path lifted to surface
if len(pf_path) >= 2:
    xs2 = [cell_to_world(p)[0] for p in pf_path]
    ys2 = [cell_to_world(p)[1] for p in pf_path]
    zs2 = [interp_Z(x, y) for x, y in zip(xs2, ys2)]
    ax3d.plot(xs2, ys2, zs2, lw=2.0, color='white', zorder=3)

# Start/Goal points
sxw, syw = cell_to_world(START)
gxw, gyw = cell_to_world(GOAL)
ax3d.scatter([sxw], [syw], [interp_Z(sxw, syw)], s=40, color="#13adfa", zorder=4)
ax3d.scatter([gxw], [gyw], [interp_Z(gxw, gyw)], s=40, color="#0feb55", zorder=4)

ax3d.view_init(elev=40, azim=-60)
ax3d.set_xlim(0, GRID_W); ax3d.set_ylim(0, GRID_H)
ax3d.set_zlim(Zmin, Zwall)
ax3d.set_xlabel("X"); ax3d.set_ylabel("Y"); ax3d.set_zlabel("Potential")
fig3d.colorbar(surf_free, ax=ax3d, shrink=0.6, pad=0.05)

plt.show()

# ---------- Rolling ball animation on the surface & save ----------
def make_sphere(cx, cy, cz, r=0.22, nu=16, nv=12):
    u = np.linspace(0, 2*np.pi, nu)
    v = np.linspace(0, np.pi, nv)
    uu, vv = np.meshgrid(u, v)
    X = cx + r * np.cos(uu) * np.sin(vv)
    Y = cy + r * np.sin(uu) * np.sin(vv)
    Z = cz + r * np.cos(vv)
    return X, Y, Z

fig3d_anim = plt.figure(figsize=(9, 6), dpi=110)
ax3d_anim = fig3d_anim.add_subplot(111, projection='3d')

# Draw same surfaces (free space + walls)
surf_free2 = ax3d_anim.plot_surface(
    X3, Y3, Z_free, cmap=CMAP, linewidth=0, antialiased=True, alpha=0.95, zorder=1
)
surf_walls2 = ax3d_anim.plot_surface(
    X3, Y3, Z_walls_masked, color='black', linewidth=0, antialiased=False, shade=False, alpha=1.0, zorder=2
)

# Path for reference
if len(pf_path) >= 2:
    ax3d_anim.plot(xs2, ys2, zs2, lw=2.0, color='white', zorder=3)

# Initial ball position
bx, by = traj[0]
bz = interp_Z(bx, by)
ball_r = 0.22
ball_surf = [None]  # mutable handle

def init_anim3d():
    ax3d_anim.view_init(elev=40, azim=-60)
    ax3d_anim.set_xlim(0, GRID_W); ax3d_anim.set_ylim(0, GRID_H)
    ax3d_anim.set_zlim(Zmin, Zwall)
    # draw initial sphere
    Xb, Yb, Zb = make_sphere(bx, by, bz + ball_r, r=ball_r)
    ball_surf[0] = ax3d_anim.plot_surface(
        Xb, Yb, Zb, color='red', linewidth=0, antialiased=True, shade=True
    )
    return (ball_surf[0],)

def animate3d(i):
    # remove old sphere, draw new at next traj point
    try:
        ball_surf[0].remove()
    except Exception:
        pass
    x, y = traj[min(i, len(traj)-1)]
    z = interp_Z(x, y)
    Xb, Yb, Zb = make_sphere(x, y, z + ball_r, r=ball_r)
    ball_surf[0] = ax3d_anim.plot_surface(
        Xb, Yb, Zb, color='red', linewidth=0, antialiased=True, shade=True
    )
    return (ball_surf[0],)

anim3d = FuncAnimation(
    fig3d_anim, animate3d, init_func=init_anim3d,
    frames=len(traj), interval=ANIM_INTERVAL_MS, blit=False, repeat=False
)

# Save animation: try MP4 (ffmpeg), else GIF (Pillow)
saved = False
try:
    from matplotlib.animation import FFMpegWriter
    writer = FFMpegWriter(fps=max(1, int(1000/ANIM_INTERVAL_MS)))
    anim3d.save("rolling_ball.mp4", writer=writer, dpi=110)
    print("Saved rolling_ball.mp4")
    saved = True
except Exception as e:
    print("FFmpeg not available or failed:", e)
    try:
        from matplotlib.animation import PillowWriter
        writer = PillowWriter(fps=max(1, int(1000/ANIM_INTERVAL_MS)))
        anim3d.save("rolling_ball.gif", writer=writer, dpi=110)
        print("Saved rolling_ball.gif")
        saved = True
    except Exception as e2:
        print("GIF save failed:", e2)

plt.show()
