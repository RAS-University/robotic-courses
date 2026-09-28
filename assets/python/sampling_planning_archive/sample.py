def sampling(grid, num_samples, size_of_grid, robot_radius=0.25):
    """
    Sample 'num_samples' continuous (x,y) in free space with clearance.
    A point is accepted iff its Euclidean distance to the nearest wall cell
    (axis-aligned unit square) is >= robot_radius.

    grid: 2D np.ndarray, 1=wall, 0=free
    size_of_grid: (W, H) in grid units (cells)
    """
    import numpy as np
    import math

    H, W = grid.shape
    assert (W, H) == size_of_grid, "size_of_grid must match grid"

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
        x0, x1 = max(0, cx - pad), min(W - 1, cx + pad)
        y0, y1 = max(0, cy - pad), min(H - 1, cy + pad)

        dmin = float("inf")
        for yy in range(y0, y1 + 1):
            for xx in range(x0, x1 + 1):
                if grid[yy, xx] == 1:
                    # wall cell is rectangle [xx, xx+1] × [yy, yy+1]
                    d = dist_point_rect(px, py, xx, yy, xx + 1.0, yy + 1.0)
                    if d < dmin:
                        dmin = d
        return dmin

    samples = []
    attempts = 0
    max_attempts = max(1000, num_samples * 100)  # generous cap

    while len(samples) < num_samples and attempts < max_attempts:
        attempts += 1
        # Uniform in continuous map bounds
        x = np.random.uniform(0.0, W)
        y = np.random.uniform(0.0, H)

        # Must land in a free *cell*
        c, r = int(x), int(y)
        if not (0 <= c < W and 0 <= r < H):  # paranoia guard
            continue
        if grid[r, c] == 1:
            continue

        # Clearance check against walls
        if clearance_to_walls(x, y, robot_radius) >= robot_radius:
            samples.append((x, y))

    return samples
