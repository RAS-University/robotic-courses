"""Grading helper for Practical 4. Thresholds below are placeholders --
calibrate against a real reference-solution run before using for grading.
"""

import numpy as np

MIN_JUMP_HEIGHT = 0.03   # meters, single-jump mode
MIN_NUM_HOPS = 3          # continuous-hopping mode
HOP_PROMINENCE = 0.02     # meters, min peak height to count as a hop


def check_hopping(base_z_history, nominal_base_z, single_jump: bool, verbose=True):
    """Pass/fail check on a recorded base-height trajectory."""
    base_z_history = np.asarray(base_z_history)
    jump_height = base_z_history.max() - nominal_base_z

    if single_jump:
        passed = jump_height > MIN_JUMP_HEIGHT
        if verbose:
            status = "PASS" if passed else "FAIL"
            print(f"[{status}] jump height = {jump_height:.3f} m (need > {MIN_JUMP_HEIGHT:.3f} m)")
        return passed

    # count local maxima with enough prominence above nominal height
    num_hops = 0
    for i in range(1, len(base_z_history) - 1):
        is_peak = base_z_history[i] > base_z_history[i - 1] and base_z_history[i] > base_z_history[i + 1]
        if is_peak and (base_z_history[i] - nominal_base_z) > HOP_PROMINENCE:
            num_hops += 1

    passed = num_hops >= MIN_NUM_HOPS
    if verbose:
        status = "PASS" if passed else "FAIL"
        print(f"[{status}] counted {num_hops} hops (need >= {MIN_NUM_HOPS})")
    return passed


if __name__ == "__main__":
    t = np.linspace(0, 5, 5000)
    fake_history = 0.2 + 0.05 * np.abs(np.sin(2 * np.pi * 1.5 * t))
    check_hopping(fake_history, nominal_base_z=0.2, single_jump=False)
