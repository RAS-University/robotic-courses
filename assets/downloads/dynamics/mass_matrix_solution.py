# SOLUTION

print("loading task_space_ellipse_solution.py...")

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

m1 = 1.0
m2 = 1.0
L1 = 0.5
I1 = 0.05
I2 = 0.02


def jacobian(theta):
    t1, t2 = theta
    J = np.zeros((2, 2))
    J[0, 0] = -t2 * np.sin(t1)
    J[0, 1] =  np.cos(t1)
    J[1, 0] =  t2 * np.cos(t1)
    J[1, 1] =  np.sin(t1)
    return J


def mass_matrix(theta):
    t1, t2 = theta
    M = np.zeros((2, 2))
    M[0, 0] = I1 + I2 + m1*L1**2 + m2*t2**2
    M[1, 1] = m2
    M[0, 1] = 0.0
    M[1, 0] = 0.0
    return M


def task_space_mass(theta, M_override=None):
    J  = jacobian(theta)
    M  = M_override if M_override is not None else mass_matrix(theta)
    Ji = np.linalg.inv(J)
    return Ji.T @ M @ Ji


def mass_matrix_scaled(theta):
    return 0.1 * mass_matrix(theta)


def mass_matrix_frozen(theta):
    return mass_matrix(np.array([theta[0], 1.0]))


def mass_matrix_asymmetric(theta):
    M = mass_matrix(theta).copy()
    M[0, 1] = M[0, 1] + 5.0
    return M


def draw_ellipse(ax, Lambda, color='steelblue', label='', lw=2):
    try:
        eigvals, eigvecs = np.linalg.eigh(Lambda)
        if np.any(eigvals <= 0):
            ax.text(0, 0, 'invalid Λ\n(not PD)',
                    ha='center', va='center', color=color, fontsize=8)
            return
        a     = np.sqrt(eigvals[0])
        b     = np.sqrt(eigvals[1])
        angle = np.degrees(np.arctan2(eigvecs[1, 0], eigvecs[0, 0]))
        ell   = patches.Ellipse(
            (0, 0), 2*a, 2*b, angle=angle,
            fill=False, color=color, linewidth=lw, label=label
        )
        ax.add_patch(ell)
        ax.set_aspect('equal')
        ax.grid(True, alpha=0.3)
        ax.axhline(0, color='gray', lw=0.5)
        ax.axvline(0, color='gray', lw=0.5)
    except np.linalg.LinAlgError:
        ax.text(0, 0, 'singular J', ha='center',
                va='center', color='red', fontsize=8)


# Part 1
theta2_values = [0.3, 1.0, 3.0, 8.0]
fig1, axes1   = plt.subplots(1, 4, figsize=(16, 4))
fig1.suptitle('Force ellipse — θ₁=0, θ₂ increasing', fontsize=11)
for ax, t2 in zip(axes1, theta2_values):
    theta  = np.array([0.0, t2])
    Lambda = task_space_mass(theta)
    draw_ellipse(ax, Lambda, color='steelblue')
    lim = max(np.sqrt(np.abs(Lambda).max()) * 1.5, 0.5)
    ax.set_xlim(-lim, lim); ax.set_ylim(-lim, lim)
    ax.set_title(f'θ₂={t2}'); ax.set_xlabel('$f_x$'); ax.set_ylabel('$f_y$')
plt.tight_layout()
plt.savefig('part1_theta2.png', dpi=120, bbox_inches='tight')

theta1_values = [0.0, np.pi/4, np.pi/2, 3*np.pi/4]
fig2, axes2   = plt.subplots(1, 4, figsize=(16, 4))
fig2.suptitle('Force ellipse — θ₂=2.0, θ₁ increasing', fontsize=11)
for ax, t1 in zip(axes2, theta1_values):
    theta  = np.array([t1, 2.0])
    Lambda = task_space_mass(theta)
    draw_ellipse(ax, Lambda, color='steelblue')
    lim = max(np.sqrt(np.abs(Lambda).max()) * 1.5, 0.5)
    ax.set_xlim(-lim, lim); ax.set_ylim(-lim, lim)
    ax.set_title(f'θ₁={np.round(t1,2)}'); ax.set_xlabel('$f_x$'); ax.set_ylabel('$f_y$')
plt.tight_layout()
plt.savefig('part1_theta1.png', dpi=120, bbox_inches='tight')

# Part 2
bugs = [
    (mass_matrix_scaled,     'tomato', 'Bug 1: Scaled'),
    (mass_matrix_frozen,     'orange', 'Bug 2: Frozen'),
    (mass_matrix_asymmetric, 'purple', 'Bug 3: Asymmetric'),
]
theta2_values_p2 = [0.5, 1.5, 3.0, 6.0]
for bug_fn, color, title in bugs:
    fig, axes = plt.subplots(1, 4, figsize=(16, 4))
    fig.suptitle(f'{title} : Blue=correct, {color}=wrong', fontsize=11)
    for ax, t2 in zip(axes, theta2_values_p2):
        theta     = np.array([0.0, t2])
        L_correct = task_space_mass(theta)
        M_wrong   = bug_fn(theta)
        L_wrong   = task_space_mass(theta, M_override=M_wrong)
        draw_ellipse(ax, L_correct, color='steelblue', label='Correct', lw=2)
        draw_ellipse(ax, L_wrong,   color=color,       label='Wrong',   lw=1.5)
        lim = max(np.sqrt(np.abs(L_correct).max()) * 2.0, 0.5)
        ax.set_xlim(-lim, lim); ax.set_ylim(-lim, lim)
        ax.set_title(f'θ₂={t2}'); ax.set_xlabel('$f_x$'); ax.set_ylabel('$f_y$')
        if t2 == 0.5: ax.legend(fontsize=7)
    plt.tight_layout()
    plt.savefig(f'part2_{title.split(":")[0].strip().lower().replace(" ","_")}.png',
                dpi=120, bbox_inches='tight')

plt.show()