
# Programming Exercise — Task-Space Mass Ellipse (Exercise 10)
#
# Robot: RP robot from Exercise 1 (revolute + prismatic)
#   x2 = θ2 * cos(θ1)      (end-effector position)
#   y2 = θ2 * sin(θ1)
# Requirements: pip install numpy matplotlib

print("loading mass_matrix.py...")

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# ── Robot Parameters (same as Exercise 1) ───────────────────────
m1 = 1.0    # mass of link 1 [kg]
m2 = 1.0    # mass of link 2 [kg]
L1 = 0.5    # distance from joint 1 to CoM of link 1 [m]
I1 = 0.05   # inertia of link 1 about its CoM [kg·m²]
I2 = 0.02   # inertia of link 2 about its CoM [kg·m²]


#================================================================
def jacobian(theta):
    """Compute the 2x2 Jacobian J(θ).

    Maps joint velocities to end-effector velocity:
        [ẋ2]   = J(θ) [θ̇1]
        [ẏ2]           [θ̇2]

    End-effector position:
        x2 = θ2 * cos(θ1)
        y2 = θ2 * sin(θ1)

    Differentiate both rows with respect to θ1 and θ2.
    """
    t1, t2 = theta
    J = np.zeros((2, 2))

    # ── COMPLETE THESE LINES OF CODE :
    J[0, 0] = __________

    J[0, 1] = __________

    J[1, 0] = __________

    J[1, 1] = __________
    # ────────────────────────────────────────────────────────────

    return J


#================================================================
def mass_matrix(theta):
    """Compute the 2x2 mass matrix M(θ) for the RP robot.

    From Exercise 1(f), M is DIAGONAL for this robot:

        M[0,0] = I1 + I2 + m1*L1² + m2*θ2²
        M[1,1] = m2
        M[0,1] = M[1,0] = 0

    Note: M[0,0] grows with θ2, as the arm extends,
    more inertia accumulates about joint 1.
    M[1,1] = m2 is constant.
    """
    t1, t2 = theta
    M = np.zeros((2, 2))

    # ── COMPLETE THESE LINES OF CODE ────────────────────────────
    # M[0,0]: total inertia about joint 1
    M[0, 0] = __________

    # M[1,1]: mass of link 2
    M[1, 1] = __________

    # off-diagonal: 0 for RP robot
    M[0, 1] = 0.0
    M[1, 0] = 0.0
    # ────────────────────────────────────────────────────────────

    return M


#================================================================
def task_space_mass(theta, M_override=None):
    """Compute the task-space mass matrix Λ(θ).

    From the Task-Space Dynamics section:
        Λ(θ) = J(θ)⁻ᵀ M(θ) J(θ)⁻¹

    If M_override is provided, use it instead of mass_matrix(theta).
    This is used in Part 2 to test wrong mass matrices.
    """
    J = jacobian(theta)
    M = M_override if M_override is not None else mass_matrix(theta)

    # ── COMPLETE THESE LINES OF CODE ────────────────────────────
    # Hint: J⁻ᵀ = (J⁻¹)ᵀ
    Ji     = __________     # inverse of J
    Lambda = __________    
    # ────────────────────────────────────────────────────────────

    return Lambda


#================================================================
# Part 2 
# Three bugs are provided :  Observe the effect of each.

def mass_matrix_scaled(theta):
    """Bug 1: M scaled by 0.1, underestimates all inertia.
    The ellipse shape stays identical but shrinks.
    What does this mean for a controller?
    """
    return 0.1 * mass_matrix(theta)


def mass_matrix_frozen(theta):
    """Bug 2: M frozen at θ2 = 1, ignores configuration dependence.
    The ellipse is only correct at θ2=1, wrong everywhere else.
    What happens at very small or very large θ2?
    """
    return mass_matrix(np.array([theta[0], 1.0]))


def mass_matrix_asymmetric(theta):
    """Bug 3: M[0,1] ≠ M[1,0] — breaks symmetry.
    A valid mass matrix must always be symmetric (and positive definite).
    What does breaking symmetry do to the eigenvalues?
    """
    M = mass_matrix(theta).copy()

    # ── COMPLETE THIS LINE OF CODE ───────────────────────────────
    # Add 5.0 to M[0,1] only — this breaks symmetry
    M[0, 1] = __________
    # ────────────────────────────────────────────────────────────

    return M


#================================================================
def draw_ellipse(ax, Lambda, color='steelblue', label='', lw=2):
    """Draw the force ellipse defined by Λ.
    Semi-axes = sqrt(eigenvalues of Λ)
    Orientation = eigenvectors of Λ
    """
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
        ax.text(0, 0, 'singular J', ha='center', va='center',
                color='red', fontsize=8)


#================================================================
# ── PART 1: How does the ellipse change with θ2?
print("\nPart 1 — Correct Λ(θ), varying θ2 (θ1 = 0)...")

theta2_values = [0.3, 1.0, 3.0, 8.0]
fig1, axes1   = plt.subplots(1, 4, figsize=(16, 4))
fig1.suptitle(
    'Force ellipse Λ(θ) — θ₁=0, θ₂ increasing\n'
    'Each ellipse shows forces needed for unit end-effector acceleration',
    fontsize=11
)

for ax, t2 in zip(axes1, theta2_values):
    theta = np.array([0.0, t2])
    try:
        Lambda = task_space_mass(theta)
        draw_ellipse(ax, Lambda, color='steelblue')
        lim = max(np.sqrt(np.abs(Lambda).max()) * 1.5, 0.5)
    except Exception:
        lim = 1.0
    ax.set_xlim(-lim, lim)
    ax.set_ylim(-lim, lim)
    ax.set_title(f'θ₂ = {t2}', fontsize=10)
    ax.set_xlabel('$f_x$ [N]')
    ax.set_ylabel('$f_y$ [N]')

plt.tight_layout()
plt.savefig('part1_theta2.png', dpi=120, bbox_inches='tight')
print("Saved: part1_theta2.png")

# ── PART 1b: How does the ellipse rotate with θ1? ───────────────
print("Part 1b — Correct Λ(θ), varying θ1 (θ2 = 2.0)...")

theta1_values = [0.0, np.pi/4, np.pi/2, 3*np.pi/4]
fig2, axes2   = plt.subplots(1, 4, figsize=(16, 4))
fig2.suptitle(
    'Force ellipse Λ(θ) — θ₂=2.0, θ₁ increasing\n'
    'Observe: does the shape change or just the orientation?',
    fontsize=11
)

for ax, t1 in zip(axes2, theta1_values):
    theta = np.array([t1, 2.0])
    try:
        Lambda = task_space_mass(theta)
        draw_ellipse(ax, Lambda, color='steelblue')
        lim = max(np.sqrt(np.abs(Lambda).max()) * 1.5, 0.5)
    except Exception:
        lim = 1.0
    ax.set_xlim(-lim, lim)
    ax.set_ylim(-lim, lim)
    ax.set_title(f'θ₁ = {np.round(t1, 2)} rad', fontsize=10)
    ax.set_xlabel('$f_x$ [N]')
    ax.set_ylabel('$f_y$ [N]')

plt.tight_layout()
plt.savefig('part1_theta1.png', dpi=120, bbox_inches='tight')
print("Saved: part1_theta1.png")


#================================================================
# ── PART 2: Wrong mass matrices
print("\nPart 2 — Effect of wrong M(θ)...")

bugs = [
    (mass_matrix_scaled,     'tomato',    'Bug 1: Scaled (×0.1)'),
    (mass_matrix_frozen,     'orange',    'Bug 2: Frozen (θ₂=1)'),
    (mass_matrix_asymmetric, 'purple',    'Bug 3: Asymmetric'),
]

theta2_values_p2 = [0.5, 1.5, 3.0, 6.0]

for bug_fn, color, title in bugs:
    fig, axes = plt.subplots(1, 4, figsize=(16, 4))
    fig.suptitle(
        f'{title}\n'
        f'Blue = correct Λ    {color} = wrong Λ',
        fontsize=11
    )

    for ax, t2 in zip(axes, theta2_values_p2):
        theta = np.array([0.0, t2])

        # Correct Lambda
        try:
            L_correct = task_space_mass(theta)
            draw_ellipse(ax, L_correct,
                         color='steelblue', label='Correct', lw=2)
            lim = max(np.sqrt(np.abs(L_correct).max()) * 2.0, 0.5)
        except Exception:
            lim = 1.0

        # Wrong Lambda
        try:
            M_wrong = bug_fn(theta)
            L_wrong = task_space_mass(theta, M_override=M_wrong)
            draw_ellipse(ax, L_wrong,
                         color=color, label='Wrong M', lw=1.5)
        except Exception as e:
            ax.text(0, 0, f'error:\n{e}',
                    ha='center', va='center', fontsize=7, color=color)

        ax.set_xlim(-lim, lim)
        ax.set_ylim(-lim, lim)
        ax.set_title(f'θ₁=0, θ₂={t2}', fontsize=10)
        ax.set_xlabel('$f_x$ [N]')
        ax.set_ylabel('$f_y$ [N]')
        if t2 == theta2_values_p2[0]:
            ax.legend(fontsize=7)

    fname = f'part2_{title.split(":")[0].strip().lower().replace(" ","_")}.png'
    plt.tight_layout()
    plt.savefig(fname, dpi=120, bbox_inches='tight')
    print(f"Saved: {fname}")

plt.show()
print("\nDone. Check the saved .png files to answer the questions.")