# LIP Footstep Planning and DCM Balance Control

## What this practical covers

- Implementing the LIP **closed-form solution** to propagate the CoM state exactly.
- Understanding the **growing exponential** instability of the LIP.
- Implementing the **Divergent Component of Motion (DCM)** and using it as an instantaneous footstep target.
- Visualising all of the above in a live **PyBullet** simulation.

## Package contents

```text
Exercise1_stability/
├── Exercise_LIP.py                  # exercise – fill in the three TODOs
├── Solution_LIP.py                  # reference solution
├── lip_env.py                       # LIP visualisation environment (do not modify)
├── requirements.txt                 # Python dependencies
└── README.md                        # this file
```

## Environment setup

If you have already set up the environment from the Exercises before, simply install the extra dependency:

```bash
pip install pybullet pybullet_utils
```

Otherwise, create a fresh virtual environment:

```bash
python -m venv env
source env/bin/activate          # Windows: env\Scripts\activate
pip install -r requirements.txt
```

## Running the exercise

```bash
python Exercise_LIP.py
```

This will run **Scenario 1** (uncontrolled LIP, CoM diverges) followed by **Scenario 2** (DCM recovery from a push). Both open a PyBullet GUI window; and **Scenario 3** (Continuous walking)

## What to implement

Open `Exercise_LIP.py` and complete the three functions marked `TODO`:

| TODO | Function | What to implement |
|---|---|---|
| 1 | `lip_next_state` | The LIP closed-form solution: compute A, B, then x(dt) and xdot(dt). |
| 2 | `compute_dcm` | The DCM formula: xi = x + xdot / omega. |
| 3 | `dcm_footstep_target` | The capture-point rule: return xi as the next footstep position. |

All necessary formulas are given in the docstrings and in the course notes (Section 8.2.1 for the LIP solution, Section 8.3.3 for the DCM).

## What you should observe

**Scenario 1 (Uncontrolled):** The orange CoM sphere drifts away from the green foot disc, with increasing speed. The purple DCM line moves further and further ahead. The simulation stops when the CoM is too far from the foot.

**Scenario 2 (DCM recovery):** After each step, the foot is placed at the current DCM position (purple). You should see the step length decrease with each step, the CoM velocity decay toward zero, and the robot come to a controlled stop within a few steps.

**Scenario 3 (Continuous walking):**

Once the required scenarios work, uncomment `scenario_walking()` at the bottom of the file and implement or inspect the walking controller. Stepping *short* of xi by a fixed offset keeps the robot walking forward rather than stopping.
