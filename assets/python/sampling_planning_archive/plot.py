import matplotlib.pyplot as plt
import numpy as np

# Range of sampling points per joint
samples_per_joint = np.arange(5, 101, 5)  # 5 to 100 in steps of 5

# Degrees of freedom to compare
dofs = [3, 5, 7]

# Compute number of grid cells for each case
cells = {d: samples_per_joint ** d for d in dofs}

# Plot
plt.figure(figsize=(8, 5))
for d in dofs:
    plt.plot(samples_per_joint, cells[d],
             label=f"{d}-DOF robot  ($n^{{{d}}}$)",
             linewidth=2)

# Log scale for Y axis
plt.yscale('log')

# Labels, title, and grid
plt.title("Exponential Growth of Configuration Space Size", fontsize=13)
plt.xlabel("Number of Sampling Points per Joint (Resolution)", fontsize=11)
plt.ylabel("Total Number of Grid Cells (log scale)", fontsize=11)
plt.grid(True, which="both", linestyle="--", alpha=0.6)

# # Highlight key example
# plt.axvline(10, color='gray', linestyle='--', alpha=0.5)
# plt.text(10.5, 1e7, "7-DOF, 10 samples → 10⁷ cells", fontsize=10, color="#000000")

plt.legend()
plt.tight_layout()
plt.show()
