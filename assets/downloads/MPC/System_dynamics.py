import control as ctrl
import numpy as np
import matplotlib.pyplot as plt

# Define the values
c_A0 = 1.0  # Initial concentration of A (mol/L)
C_B0 = 0.0  # Initial concentration of B (mol/L)
C_C0 = 0.0  # Initial concentration of C (mol/L)
k1 = 2.0    # Rate constant for A -> B (1/min)
k2 = 1      # Rate constant for B -> C (1/min)

A = 5.0  # Initial concentration of A

T = np.linspace(0, 10, 100)  # time vector
U = np.zeros_like(T)          # input (step)
X0 = [A, 0, 0]                  # initial state

# Define the state-space representation
A = [[-k1, 0, 0],
     [k1, -k2, 0],
     [0, k2, 0]]
B = [[0], [0], [0]]  # No input
C = [[0, 0, 1]]  # We are interested in the concentration of C
D = [[0]]

# Create the state-space system
system = ctrl.StateSpace(A, B, C, D)
T, yout, xout = ctrl.forced_response(system, T, U, X0, return_states=True)

def plot_dynamics(T, yout, xout):
    """Plot the dynamics of the system."""
    plt.figure(figsize=(10, 6))
    # Plot each state variable

    plt.plot(T, xout[0, :], label=f'Concentration of A', color='blue', linestyle='--')
    plt.plot(T, xout[1, :], label=f'Concentration of B', color='green', linestyle='--')
    plt.plot(T, yout.T, label=f'Concentration of C', color='red', linewidth=2)
    plt.xlabel('Time')
    plt.ylabel('Concentration (mol/L)')
    plt.title('System Dynamics initial state A=5 mol/L')
    plt.legend()
    plt.show()

# Plot the results
plot_dynamics(T, yout, xout)