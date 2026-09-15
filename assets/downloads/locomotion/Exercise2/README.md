# Practical 2: Single-Leg Hopping Control

This practical consolidates the concepts introduced in Section 7 (From Leg Modeling to Control):

- the Jacobian (defined and self-verified directly in the exercise files);
- Cartesian PD control;
- force control and $\mathbf{J}^T(\mathbf{q})$;
- single-leg hopping in a live PyBullet simulation.

Your exercise folder should have the following structure (add these files alongside your existing `env/` folder):

```text
Exercise2/
├── locomotion_practical2.py 
├── locomotion_practical2_solution.py
├── check_hopping.py            # grading helper
├── requirements_Ex2.txt
└── README.md
```

## Environment setup

### 1. Create a Python environment

Open a terminal in the folder containing the exercise files.

**Windows Command Prompt**

```bat
py -m venv .venv
.venv\Scripts\activate.bat
```

**macOS or Linux**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install the required packages

```bash
python -m pip install -r requirements_Ex4.txt
```

### 3. Run the exercise

This practical is a set of plain Python scripts, not a notebook — there is no kernel to register. Run Part A directly:

```bash
python practical4_hopping.py
```

With `render=True`, this opens a live PyBullet window so you can watch the leg hop as you iterate.

## Exercise instructions

1. In `locomotion_practical2.py `, replace only the expressions marked `TODO` (the force profile, the Cartesian PD term, and the force-profile-to-torque mapping).
2. Run the script. `check_hopping.py` runs automatically at the end and reports a pass/fail based on the achieved jump height (single-jump mode) or number of hops detected (continuous mode).
3. An incorrect or incomplete controller will show as a `FAIL` with the measured height/hop count; a correct one shows `PASS`.
4. Try both `SINGLE_JUMP = True` and `SINGLE_JUMP = False` and compare — this is the same single-pulse vs. periodic-profile distinction from Quiz 8, Question 2, now something you can watch happen.
