# Practical 1: Modeling and Simulating a Two-Link Leg

This practical consolidates the concepts introduced in Section 6 (Leg Dynamics):

- forward kinematics;
- kinetic and potential energy;
- Lagrangian dynamics;
- inertia, velocity-dependent, and gravity terms;
- passive numerical simulation.

Your exercise folder should have the following structure:

```text
Exercise_1/
├── locomotion_practical1.ipynb
├── locomotion_practical1_solution.ipynb
├── assertion_check.py
├── requirements_Ex1.txt
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
python -m pip install -r requirements_Ex1.txt
```

### 3. Register the Jupyter kernel

```bash
python -m ipykernel install --user --name rasu-legged --display-name "(RAS U Locomotion)"
```

### 4. Open the notebook

**Using JupyterLab**

```bash
jupyter lab
```

Open:

```text
locomotion_practical1.ipynb
```

Then select the following kernel:

```text
Python (RAS U Locomotion)
```

**Using Visual Studio Code**

1. Open `locomotion_practical1.ipynb`.
2. Click the kernel selector in the top-right corner.
3. Select **(RAS U Locomotion)**.
4. You can start running cells.

## Exercise instructions

1. Replace only the expressions marked `TODO`.
2. Run the validation cell immediately below each answer.
3. A correct answer displays a check mark.
4. An incorrect answer displays an assertion message.
5. Restart the kernel and run all cells before finishing the practical.
