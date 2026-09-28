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
