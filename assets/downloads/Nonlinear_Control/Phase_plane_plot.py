import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp

def sat(u):
    """Saturation function: clips input to the range [-1, 1]."""
    return np.clip(u, -1.0, 1.0)

def f(t, z):
    """Defines the system of ODEs (signature compatible with solve_ivp)."""
    x1, x2 = z
    u = -9/2 * x1 + 1/2 * x2
    dx1 = x1 + sat(u)
    dx2 = -x2 + sat(u)
    return [dx1, dx2]

# grid for vector field
xmin, xmax, ymin, ymax = -4, 4, -3, 3
nx, ny = 25, 25
x1 = np.linspace(xmin, xmax, nx)
x2 = np.linspace(ymin, ymax, ny)
X1, X2 = np.meshgrid(x1, x2)

# vector field for the specified system:
U = X1 + sat(-4.5 * X1 + 0.5 * X2)
V = -X2 + sat(-4.5 * X1 + 0.5 * X2)

# normalize arrows for nicer display
M = np.hypot(U, V)
M[M == 0] = 1.0
U2, V2 = U / M, V / M

fig, ax = plt.subplots(figsize=(15, 8))
ax.set_xlim(xmin, xmax)
ax.set_ylim(ymin, ymax)
ax.set_xlabel('x1', fontsize=14)
ax.set_ylabel('x2', fontsize=14)
ax.set_title('Phase plane: vector field + trajectories', fontsize=20)

# quiver (sparse arrows)
ax.quiver(X1, X2, U2, V2, M, pivot='mid', cmap='plasma', alpha=0.75)

# nullclines: plot contours where dx/dt = 0 and dy/dt = 0 (computed on grid)
DX = U  # dx/dt on grid
DY = V  # dy/dt on grid
ax.contour(X1, X2, DX, levels=[0], colors='r', linestyles='--', linewidths=2)
ax.contour(X1, X2, DY, levels=[0], colors='b', linestyles='--', linewidths=2)

# sample trajectories from several initial conditions (original list)
ic_list = [[-0.5, 2.4], 
           [-1.01, -1.5], 
           [-0.99, -1.5],
           [0, -2.75], 
           [0, -1.0], 
           [1.001, 2], 
           [0.999, 2]]

# plot trajectories (shorter time for illustration)
tspan = (0, 40)
t_eval = np.linspace(tspan[0], tspan[1], 2000)
for ic in ic_list:
    sol = solve_ivp(f, tspan, ic, t_eval=t_eval, rtol=1e-6)
    ax.plot(sol.y[0], sol.y[1], '-k', lw=1, alpha=0.9)

# mark the starting points of each trajectory with a red cross
for ic in ic_list:
    ax.plot(ic[0], ic[1], marker='x', color='red', markersize=8, mew=2, linestyle='None')

# create legend entries for nullclines, trajectories, and starting points
ax.plot([], [], 'r--', lw=2, label='dx1/dt = 0 (nullcline)')
ax.plot([], [], 'b--', lw=2, label='dx2/dt = 0 (nullcline)')
ax.plot([], [], '-k', label='trajectories')
ax.plot([], [], marker='x', color='red', linestyle='None', label='trajectory start')
ax.legend(loc='upper right', fontsize=14)

ax.grid(alpha=0.4)
plt.tight_layout()
plt.savefig('ch2_ex1_phase_plane.png', dpi=300)
# plt.show()
plt.close()