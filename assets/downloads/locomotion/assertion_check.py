"""Hidden validation helpers for Practical 1.

Place this file in the same folder as the notebook.
The expected symbolic expressions are kept here rather than in notebook cells.
"""

from __future__ import annotations

from collections.abc import Callable, Mapping
from typing import Any

import numpy as np
import sympy as sp


def _require_defined(name: str, value: Any) -> None:
    assert value is not None, f"{name} is still None. Replace the TODO."


def _simplify(expr: sp.Expr) -> sp.Expr:
    return sp.trigsimp(sp.simplify(expr))


def _assert_symbolic_equal(
    name: str,
    actual: sp.Expr,
    expected: sp.Expr,
) -> None:
    _require_defined(name, actual)
    difference = _simplify(actual - expected)
    assert difference == 0, f"{name} is incorrect."


def _assert_matrix_equal(
    name: str,
    actual: Any,
    expected: sp.Matrix,
) -> None:
    _require_defined(name, actual)

    actual_matrix = sp.Matrix(actual)
    expected_matrix = sp.Matrix(expected)

    assert actual_matrix.shape == expected_matrix.shape, (
        f"{name} has shape {actual_matrix.shape}; "
        f"expected {expected_matrix.shape}."
    )

    difference = (actual_matrix - expected_matrix).applyfunc(_simplify)
    assert difference == sp.zeros(*expected_matrix.shape), (
        f"{name} is incorrect."
    )


def total_time_derivative(
    expr: sp.Expr,
    *,
    q1: sp.Symbol,
    q2: sp.Symbol,
    dq1: sp.Symbol,
    dq2: sp.Symbol,
    ddq1: sp.Symbol,
    ddq2: sp.Symbol,
) -> sp.Expr:
    """Compute d(expr)/dt using the chain rule."""
    return sp.simplify(
        sp.diff(expr, q1) * dq1
        + sp.diff(expr, q2) * dq2
        + sp.diff(expr, dq1) * ddq1
        + sp.diff(expr, dq2) * ddq2
    )


def check_mass1_kinematics(
    *,
    x1: sp.Expr,
    y1: sp.Expr,
    dx1: sp.Expr,
    dy1: sp.Expr,
    q1: sp.Symbol,
    dq1: sp.Symbol,
    l1: sp.Symbol,
) -> None:
    expected = {
        "x1": l1 * sp.sin(q1),
        "y1": -l1 * sp.cos(q1),
        "dx1": l1 * sp.cos(q1) * dq1,
        "dy1": l1 * sp.sin(q1) * dq1,
    }

    actual = {"x1": x1, "y1": y1, "dx1": dx1, "dy1": dy1}

    for name in expected:
        _assert_symbolic_equal(name, actual[name], expected[name])

    print("✓ Kinematics of m1")


def check_mass2_kinematics(
    *,
    x2: sp.Expr,
    y2: sp.Expr,
    dx2: sp.Expr,
    dy2: sp.Expr,
    q1: sp.Symbol,
    q2: sp.Symbol,
    dq1: sp.Symbol,
    dq2: sp.Symbol,
    l1: sp.Symbol,
    l2: sp.Symbol,
) -> None:
    expected = {
        "x2": l1 * sp.sin(q1) + l2 * sp.sin(q2),
        "y2": -l1 * sp.cos(q1) - l2 * sp.cos(q2),
        "dx2": (
            l1 * sp.cos(q1) * dq1
            + l2 * sp.cos(q2) * dq2
        ),
        "dy2": (
            l1 * sp.sin(q1) * dq1
            + l2 * sp.sin(q2) * dq2
        ),
    }

    actual = {"x2": x2, "y2": y2, "dx2": dx2, "dy2": dy2}

    for name in expected:
        _assert_symbolic_equal(name, actual[name], expected[name])

    print("✓ Kinematics of m2")


def check_energies(
    *,
    T1: sp.Expr,
    V1: sp.Expr,
    T2: sp.Expr,
    V2: sp.Expr,
    q1: sp.Symbol,
    q2: sp.Symbol,
    dq1: sp.Symbol,
    dq2: sp.Symbol,
    l1: sp.Symbol,
    l2: sp.Symbol,
    m1: sp.Symbol,
    m2: sp.Symbol,
    g: sp.Symbol,
) -> None:
    expected_T1 = sp.Rational(1, 2) * m1 * l1**2 * dq1**2
    expected_V1 = -m1 * g * l1 * sp.cos(q1)

    expected_T2 = sp.Rational(1, 2) * m2 * (
        l1**2 * dq1**2
        + l2**2 * dq2**2
        + 2 * l1 * l2 * sp.cos(q1 - q2) * dq1 * dq2
    )

    expected_V2 = -m2 * g * (
        l1 * sp.cos(q1) + l2 * sp.cos(q2)
    )

    checks = {
        "T1": (T1, expected_T1),
        "V1": (V1, expected_V1),
        "T2": (T2, expected_T2),
        "V2": (V2, expected_V2),
    }

    for name, (actual, expected) in checks.items():
        _assert_symbolic_equal(name, actual, expected)

    print("✓ Kinetic and potential energies")


def check_lagrangian(
    *,
    T: sp.Expr,
    V: sp.Expr,
    L: sp.Expr,
    T1: sp.Expr,
    T2: sp.Expr,
    V1: sp.Expr,
    V2: sp.Expr,
) -> None:
    expected_T = sp.simplify(T1 + T2)
    expected_V = sp.simplify(V1 + V2)
    expected_L = sp.simplify(expected_T - expected_V)

    _assert_symbolic_equal("T", T, expected_T)
    _assert_symbolic_equal("V", V, expected_V)
    _assert_symbolic_equal("L", L, expected_L)

    print("✓ Lagrangian")


def check_euler_lagrange_derivatives(
    *,
    dLddq1: sp.Expr,
    dLddq2: sp.Expr,
    dLdq1: sp.Expr,
    dLdq2: sp.Expr,
    dLddq1_dt: sp.Expr,
    dLddq2_dt: sp.Expr,
    L: sp.Expr,
    q1: sp.Symbol,
    q2: sp.Symbol,
    dq1: sp.Symbol,
    dq2: sp.Symbol,
    ddq1: sp.Symbol,
    ddq2: sp.Symbol,
) -> None:
    expected_dLddq1 = sp.diff(L, dq1)
    expected_dLddq2 = sp.diff(L, dq2)
    expected_dLdq1 = sp.diff(L, q1)
    expected_dLdq2 = sp.diff(L, q2)

    expected_dLddq1_dt = total_time_derivative(
        expected_dLddq1,
        q1=q1,
        q2=q2,
        dq1=dq1,
        dq2=dq2,
        ddq1=ddq1,
        ddq2=ddq2,
    )

    expected_dLddq2_dt = total_time_derivative(
        expected_dLddq2,
        q1=q1,
        q2=q2,
        dq1=dq1,
        dq2=dq2,
        ddq1=ddq1,
        ddq2=ddq2,
    )

    checks = {
        "dLddq1": (dLddq1, expected_dLddq1),
        "dLddq2": (dLddq2, expected_dLddq2),
        "dLdq1": (dLdq1, expected_dLdq1),
        "dLdq2": (dLdq2, expected_dLdq2),
        "dLddq1_dt": (dLddq1_dt, expected_dLddq1_dt),
        "dLddq2_dt": (dLddq2_dt, expected_dLddq2_dt),
    }

    for name, (actual, expected) in checks.items():
        _assert_symbolic_equal(name, actual, expected)

    print("✓ Euler–Lagrange derivatives")


def check_equations_of_motion(
    *,
    Eq1: sp.Expr,
    Eq2: sp.Expr,
    L: sp.Expr,
    q1: sp.Symbol,
    q2: sp.Symbol,
    dq1: sp.Symbol,
    dq2: sp.Symbol,
    ddq1: sp.Symbol,
    ddq2: sp.Symbol,
) -> None:
    expected_Eq1 = (
        total_time_derivative(
            sp.diff(L, dq1),
            q1=q1,
            q2=q2,
            dq1=dq1,
            dq2=dq2,
            ddq1=ddq1,
            ddq2=ddq2,
        )
        - sp.diff(L, q1)
    )

    expected_Eq2 = (
        total_time_derivative(
            sp.diff(L, dq2),
            q1=q1,
            q2=q2,
            dq1=dq1,
            dq2=dq2,
            ddq1=ddq1,
            ddq2=ddq2,
        )
        - sp.diff(L, q2)
    )

    _assert_symbolic_equal("Eq1", Eq1, expected_Eq1)
    _assert_symbolic_equal("Eq2", Eq2, expected_Eq2)

    print("✓ Equations of motion")


def check_dynamic_decomposition(
    *,
    M: Any,
    C: Any,
    G: Any,
    q1: sp.Symbol,
    q2: sp.Symbol,
    dq1: sp.Symbol,
    dq2: sp.Symbol,
    l1: sp.Symbol,
    l2: sp.Symbol,
    m1: sp.Symbol,
    m2: sp.Symbol,
    g: sp.Symbol,
) -> None:
    expected_M = sp.Matrix(
        [
            [
                (m1 + m2) * l1**2,
                m2 * l1 * l2 * sp.cos(q1 - q2),
            ],
            [
                m2 * l1 * l2 * sp.cos(q1 - q2),
                m2 * l2**2,
            ],
        ]
    )

    expected_h = sp.Matrix(
        [
            m2 * l1 * l2 * sp.sin(q1 - q2) * dq2**2,
            -m2 * l1 * l2 * sp.sin(q1 - q2) * dq1**2,
        ]
    )

    expected_G = sp.Matrix(
        [
            (m1 + m2) * g * l1 * sp.sin(q1),
            m2 * g * l2 * sp.sin(q2),
        ]
    )

    _assert_matrix_equal("M", M, expected_M)
    _assert_matrix_equal("G", G, expected_G)

    _require_defined("C", C)
    C_matrix = sp.Matrix(C)
    assert C_matrix.shape == (2, 2), (
        f"C has shape {C_matrix.shape}; expected (2, 2)."
    )

    dq_vector = sp.Matrix([dq1, dq2])
    _assert_matrix_equal("C*dq", C_matrix * dq_vector, expected_h)

    print("✓ Dynamic decomposition")


def check_complete_model(
    *,
    M: Any,
    C: Any,
    G: Any,
    Eq1: sp.Expr,
    Eq2: sp.Expr,
    ddq1: sp.Symbol,
    ddq2: sp.Symbol,
    dq1: sp.Symbol,
    dq2: sp.Symbol,
) -> None:
    _require_defined("M", M)
    _require_defined("C", C)
    _require_defined("G", G)
    _require_defined("Eq1", Eq1)
    _require_defined("Eq2", Eq2)

    ddq_vector = sp.Matrix([ddq1, ddq2])
    dq_vector = sp.Matrix([dq1, dq2])

    from_matrices = (
        sp.Matrix(M) * ddq_vector
        + sp.Matrix(C) * dq_vector
        + sp.Matrix(G)
    )

    from_lagrange = sp.Matrix([Eq1, Eq2])

    _assert_matrix_equal(
        "M*ddq + C*dq + G",
        from_matrices,
        from_lagrange,
    )

    print("✓ Complete dynamic model")


def check_forward_dynamics(
    *,
    dynamics: Callable[[float, np.ndarray], np.ndarray],
    parameters: Mapping[str, float],
) -> None:
    required_parameters = {"m1", "m2", "l1", "l2", "g"}
    missing = required_parameters.difference(parameters)

    assert not missing, (
        "Missing parameter(s): " + ", ".join(sorted(missing))
    )

    test_states = [
        np.array([0.2, -0.7, 0.4, -0.3], dtype=float),
        np.array([-0.4, 0.9, -0.2, 0.5], dtype=float),
        np.array([0.8, -0.1, 0.0, 0.6], dtype=float),
    ]

    m1_value = float(parameters["m1"])
    m2_value = float(parameters["m2"])
    l1_value = float(parameters["l1"])
    l2_value = float(parameters["l2"])
    g_value = float(parameters["g"])

    for index, state in enumerate(test_states, start=1):
        derivative = np.asarray(dynamics(0.0, state), dtype=float)

        assert derivative.shape == (4,), (
            f"Test {index}: dynamics must return shape (4,), "
            f"received {derivative.shape}."
        )
        assert np.all(np.isfinite(derivative)), (
            f"Test {index}: dynamics returned non-finite values."
        )
        assert np.allclose(derivative[:2], state[2:]), (
            f"Test {index}: the first two derivatives must be dq."
        )

        q1_value, q2_value, dq1_value, dq2_value = state

        M_expected = np.array(
            [
                [
                    (m1_value + m2_value) * l1_value**2,
                    m2_value
                    * l1_value
                    * l2_value
                    * np.cos(q1_value - q2_value),
                ],
                [
                    m2_value
                    * l1_value
                    * l2_value
                    * np.cos(q1_value - q2_value),
                    m2_value * l2_value**2,
                ],
            ],
            dtype=float,
        )

        h_expected = np.array(
            [
                m2_value
                * l1_value
                * l2_value
                * np.sin(q1_value - q2_value)
                * dq2_value**2,
                -m2_value
                * l1_value
                * l2_value
                * np.sin(q1_value - q2_value)
                * dq1_value**2,
            ],
            dtype=float,
        )

        G_expected = np.array(
            [
                (m1_value + m2_value)
                * g_value
                * l1_value
                * np.sin(q1_value),
                m2_value
                * g_value
                * l2_value
                * np.sin(q2_value),
            ],
            dtype=float,
        )

        expected_acceleration = np.linalg.solve(
            M_expected,
            -(h_expected + G_expected),
        )

        assert np.allclose(
            derivative[2:],
            expected_acceleration,
            atol=1e-9,
            rtol=1e-9,
        ), f"Test {index}: forward acceleration is incorrect."

    print("✓ Forward dynamics")
