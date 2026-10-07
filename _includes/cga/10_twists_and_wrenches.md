<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

## Twists and Wrenches

### Screws in CGA

The bivector $\bivector\_{\rigid} \in \algebra{\bivector}\_\rigid$ that was identified in the previous section is the screw axis of the motion defined by its exponential. Continuing to use the terminology of screw theory, the screws that carry velocity and force information are called twists and wrenches, respectively. Hence, twists are identified with the time derivatives of the bivectors that generate rigid body motions, i.e. their space is found as

<div markdown="0">
\begin{equation}\label{eq:twist_space}
    \twist \in \algebra{\bivector}_\rigid = \text{span}\{\gae{23},\gae{13},\gae{12},\gae{1\infty},\gae{2\infty},\gae{3\infty}\},
\end{equation}
</div>

where the six objects forming a twist are bivectors. The space of twists algebraically corresponds to the bivector dual lines that form the screw axes of motors.

{% include gafro_scene.html slug="screw-axis" %}

{% include gafro_scene.html slug="velocity-field-screw" %}

Wrenches, on the other hand, are usually called co-screws, meaning that there is a certain duality relationship between twists and wrenches. In matrix Lie algebra, however, this duality is not directly visible, since both twists and wrenches are simply 6-dimensional vectors. In conformal geometric algebra, this duality is explicitly found via multiplication with the conjugate pseudo-scalar $I\_c = I\gae{0}$ (Hestenes, 2010). Multiplication of $I\_c$ with a twist yields the space of wrenches as

<div markdown="0">
\begin{equation}\label{eq:wrench_space}
    \wrench \in \text{span}\{\gae{23},\gae{13},\gae{12},\gae{01},\gae{02},\gae{03}\}.
\end{equation}
</div>

Using these definitions, the inner product of a twist $\twist$ and a wrench $\wrench$ reduces to the scalar product and calculates the power of the motion, i.e.

<div markdown="0">
\begin{equation}\label{eq:power_of_motion}
    p = -\twist\inner\wrench.
\end{equation}
</div>

{% include gafro_scene.html slug="power-pairing-frames" height="480" %}

In Lie theory, twists are elements of the Lie algebra and wrenches are elements of the dual Lie algebra. As per the above definitions, this duality relationship can be directly seen from the different bivector blades in the respective spaces. The elements also allow for a direct geometrical interpretation: the linear velocity part of twists (i.e. $\gae{1\infty},\gae{2\infty},\gae{3\infty}$) corresponds to a direction bivector, whereas the force part of wrenches (i.e. $\gae{01},\gae{02},\gae{03}$) corresponds to a tangent bivector. This geometric interpretation further clarifies why twists and wrenches transform differently under rigid body transformations, i.e. why in matrix Lie algebra the adjoint matrix $\bm{Ad}$ transforms twists and the dual adjoint matrix $\bm{Ad}^\*$ transforms wrenches. Using conformal geometric algebra, this distinction is not necessary, since, by definition of the algebra, direction and tangent bivectors (i.e. linear velocities and forces) multiply differently using the geometric product. Hence, a motor can be used to transform both twists and wrenches using the same sandwiching operation introduced for versors, which means it simultaneously represents the adjoint and the dual adjoint operation.

Similarly, a unified expression for the Lie bracket can be found in conformal geometric algebra. The Lie bracket is a linear mapping between elements of the Lie algebra. For twists acting on twists or wrenches, this mapping can be found as

<div markdown="0">
\begin{equation}\label{eq:lie_bracket_twist_and_wrench}
    \twist' = \twist_1 \times \twist_2
    \hspace{5mm}
    \text{and}
    \hspace{5mm}
    \wrench' = \twist \times \wrench,
\end{equation}
</div>

where $\times$ is the commutator product introduced earlier.

The implications of these definitions are very interesting, since CGA simultaneously clarifies the duality relationship of twists and wrenches, by removing the ambiguity of what a 6-dimensional vector represents through an algebraically determined difference. Furthermore, it also unifies their treatment by having the same adjoint operations.

##### Quick quiz — twists and wrenches

{% include mcq.html id="q-cga-tw-1"
   q="Which blades carry the linear velocity of a twist?"
   options="$e_{01}, e_{02}, e_{03}$ ;; $e_{1\infty}, e_{2\infty}, e_{3\infty}$ ;; $e_{12}, e_{13}, e_{23}$ ;; $e_{123}$"
   answer="2" explain="Linear velocities are direction bivectors with e∞; forces sit on the tangent blades e0i." %}

{% include mcq.html id="q-cga-tw-2"
   q="How is the power of a wrench $\mathcal{W}$ acting along a twist $\mathcal{V}$ computed?"
   options="$p = \mathcal{V} \cdot \mathcal{W}$ ;; $p = -\mathcal{V} \cdot \mathcal{W}$ ;; $p = \mathcal{V} \times \mathcal{W}$ ;; $p = \mathcal{V} \wedge \mathcal{W}$"
   answer="2" explain="Both pairings, e12·e12 and e1∞·e01, give −1, hence the minus sign." %}

{% include mcq.html id="q-cga-tw-3"
   q="How does a motor $M$ transform twists and wrenches?"
   options="twists by a sandwich, wrenches only through a separate dual adjoint matrix ;; both by the same sandwich $M X \widetilde{M}$ ;; neither can be transformed by a motor ;; wrenches by the sandwich with $M^{-1}$ only"
   answer="2" explain="The sandwich acts as Ad on twists and Ad* on wrenches automatically, because their blades differ." %}

{% include mcq.html id="q-cga-tw-4"
   q="Which product computes the Lie bracket of two twists?"
   options="the outer product ;; the inner product ;; the commutator product ;; the geometric product"
   answer="3" explain="V' = V1 × V2 = ½(V1V2 − V2V1); the same product gives the action of a twist on a wrench." %}
