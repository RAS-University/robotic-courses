<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

## Geometric Primitives

### Points and Constructions

Points are the basic geometric primitives that can be used to construct others by the spanning operation of the outer product. Euclidean points $\bm{x}$ are embedded in CGA by using the conformal embedding

<div markdown="0">
\begin{equation}\label{eq:conformal_embedding}
    \point(\bm{x}) = \gae{0} + \bm{x} + \frac{1}{2}\bm{x}^2\gae{\infty}.
\end{equation}
</div>

These conformal points form the basic building blocks for geometric primitives that can be represented in the algebra. Note that, this nonlinear embedding turns flat Euclidean space into a parabolic space. Furthermore, this embedding is similar to how vectors in $\mathbb{R}^3$ are traditionally embedded into $\mathbb{R}^4$ when using homogeneous coordinates.

In general, geometric primitives, such as lines, circles and spheres, can be constructed from conformal points using the outer product, i.e.

<div markdown="0">
\begin{equation}\label{eq:outer_product_construction}
    X = \bigwedge_{i=1}^n P_i.
\end{equation}
</div>

In the above equation, depending on the number of points $n$ and the presence of the point at infinity $\gae{\infty}$, different geometric primitives can be constructed:

- a line can be constructed from two points passing through it and the point at infinity

<div markdown="0">
\begin{equation}\label{eq:cga_line_construction}
    \line = \point_1 \outer \point_2 \outer \gae{\infty};
\end{equation}
</div>

- a circle can be constructed from any three distinct points lying on its orbit

<div markdown="0">
\begin{equation}\label{eq:cga_circle_construction}
    \circle = \point_1 \outer \point_2 \outer \point_3;
\end{equation}
</div>

- a plane can be constructed from three points and a point at infinity

<div markdown="0">
\begin{equation}\label{eq:cga_plane_construction}
    \plane = \point_1 \outer \point_2 \outer \point_3 \outer \gae{\infty};
\end{equation}
</div>

- a sphere can be constructed from four points.

<div markdown="0">
\begin{equation}\label{eq:cga_sphere_construction}
    S = \point_1 \outer \point_2 \outer \point_3 \outer \point_4.
\end{equation}
</div>

{% include gafro_scene.html slug="primitive-ladder" %}

The geometric primitives of CGA are in general nullspace representations with respect to either the inner (IPNS) or the outer (OPNS) product, meaning that a geometric primitive is defined by the set of all Euclidean points that result in zero upon multiplication when embedded in CGA, i.e.

<div markdown="0">
\begin{align}\label{eq:product_nullspaces}
    & \text{IPNS: } \mathbb{NI}_G(\bm{A}) = \left\{ \vec{x} \in \mathbb{R}^3: \point(\vec{x}) \inner \bm{A} = 0 \right\} ,
    \\
    & \text{OPNS: } \mathbb{NO}_G(\bm{X}) = \left\{ \vec{x} \in \mathbb{R}^3: \point(\vec{x}) \outer \bm{X} = 0 \right\} .
\end{align}
</div>

The IPNS and OPNS representations are dual to each other. Duality in this case means multiplication with the pseudo-scalar. The OPNS is generally referred to as the primal space for its more convenient usage, which consequently makes the IPNS the dual representation, although both representations can be used to represent all geometric primitives.

Of the 32 basis blades of CGA, only a sparse number is used to represent each of the geometric primitives in their primal representation: a point uses 5 (grade 1), a point pair 10 (grade 2), a line 6 and a circle 10 (both grade 3), and a plane 4 and a sphere 5 (both grade 4). Flat primitives need fewer blades than round ones because they always contain $\gae{\infty}$. Geometric primitives are single-grade objects, while transformations are mixed-grade.

#### Interactive Primitive Gallery

The scene below renders a point, a vector, a line, a plane, a sphere, a circle and a point pair, all constructed directly as CGA multivectors with gafrojs. Drag to orbit, scroll to zoom.

{% include gafro_scene.html slug="primitive-gallery" %}

### Operators using Geometric Primitives

As part of the geometric algebra, the geometric primitives can be used in algebraic expressions that have geometrically meaningful interpretations. For example, the projection of a point $P$ to another geometric primitive $X$ is achieved by the general formula

<div markdown="0">
\begin{equation}\label{eq:projection}
    P' = (P\inner X)\inverse{X}.
\end{equation}
</div>

Using what is known as the *meet* operator, it is also possible to calculate intersections between any two geometric primitives

<div markdown="0">
\begin{equation}\label{eq:meet_operator}
    Y = (\dual{X_1} \outer \dual{X_2})^*.
\end{equation}
</div>

Here, it is not required to additionally consider edge cases. The resulting multivector retains a geometric meaning, e.g. when a line meets a sphere there are three possibilities:

- the line intersects the sphere, in which case $Y$ is a point pair;
- the line is tangential to the sphere, which results in a degenerate point pair, i.e. a single point together with the tangent direction;
- the line and the sphere are completely separate, resulting in an imaginary point pair that is related to the distance between the objects.

This geometric result is directly encoded in the result and no special cases need to be considered. Similarly, in the case of a line and a circle, it is not necessary to check whether the line is tangential, intersecting the circle twice, or not at all. The meet will always return a meaningful geometric primitive that conveys the information of these different cases.

{% include gafro_scene.html slug="intersections" %}

The geometric primitives can also directly be used for geometric operations such as reflections and projections, which result in rigid body motions. Here, two consecutive reflections on intersecting planes result in a rotation and on parallel planes in a translation.

### Distances and Angles

Since CGA has a non-degenerate metric, the inner product directly evaluates Euclidean measurements. For spheres and planes, it is the dual (IPNS) representation that is a single vector: a sphere with center $\bm{c}$ and radius $\rho$ is $\bm{s} = \point(\bm{c}) - \frac{1}{2}\rho^2\gae{\infty}$, and a plane with unit normal $\bm{n}$ at distance $d$ from the origin is $\bm{\pi} = \bm{n} + d\,\gae{\infty}$. With $\gae{0}\inner\gae{\infty} = -1$ and normalized points $\point(\bm{x})$, $\point(\bm{y})$, one inner product covers all of the following queries.

| query | expression | value |
|---|---|---|
| point–point | $\point(\bm{x}) \inner \point(\bm{y})$ | $-\frac{1}{2}\norm{\bm{x}-\bm{y}}^2$ |
| point–plane | $\point(\bm{x}) \inner \bm{\pi}$ | $\bm{x}\cdot\bm{n} - d$, the signed distance |
| point–sphere | $\point(\bm{x}) \inner \bm{s}$ | $\frac{1}{2}\left(\rho^2 - \norm{\bm{x}-\bm{c}}^2\right)$, positive inside, negative outside |
| plane–plane | $\bm{\pi}\_1 \inner \bm{\pi}\_2$ | $\bm{n}\_1\cdot\bm{n}\_2$, the cosine of the angle between the planes |
| sphere–sphere | $\bm{s}\_1 \inner \bm{s}\_2$ | $\frac{1}{2}\left(\rho\_1^2 + \rho\_2^2 - \norm{\bm{c}\_1-\bm{c}\_2}^2\right)$, zero iff the spheres intersect orthogonally |

The type of query is carried by the arguments themselves, so no case distinction is needed in the code that evaluates it. The same holds for the meet: a point pair $T$ in its primal form satisfies $T^2 > 0$ if its two points are real, $T^2 = 0$ if they coincide, and $T^2 < 0$ if they are imaginary. When a line misses a sphere, $T^2$ therefore becomes a smooth, signed measure of how far the configuration is from intersecting, which is exactly what an optimizer needs as a constraint, where a classical intersection test only returns a boolean.

Finally, all of these constructions are covariant. Because the sandwich product is an outermorphism, transforming the inputs transforms the result, e.g. $\motor (X\_1 \meet X\_2) \reverse{\motor} = (\motor X\_1 \reverse{\motor}) \meet (\motor X\_2 \reverse{\motor})$, so a constraint formulated once in a convenient frame is valid in all of them.

### Tangent and Direction Elements

Two limits of the round primitives complete the picture. Letting the radius go to zero gives *tangent elements*: a point pair whose two points coincide is a tangent vector, i.e. a location and a direction in a single blade, and similarly a vanishing circle gives a tangent bivector. Tangents are derivatives in the literal sense: for a curve of conformal points $\point(\lambda)$, the wedge $\point \outer \dot{\point}$ is the tangent element at $\point$, and $\point \outer \dot{\point} \outer \ddot{\point}$ is the osculating circle.

Removing the location instead gives *direction elements* $\bm{d}\outer\gae{\infty}$ for a Euclidean blade $\bm{d}$. These are the free vectors of Euclidean geometry, and they are invariant under translations, $\translator(\bm{d}\outer\gae{\infty})\reverse{\translator} = \bm{d}\outer\gae{\infty}$. As shown in the section on twists and wrenches, linear velocities are direction elements, and forces are tangent elements at the origin, which is why the two transform differently.

##### Quick quiz — geometric primitives

{% include mcq.html id="q-cga-prim-1"
   q="Which multivector is the conformal embedding $P(\bm{x})$ of a Euclidean point $\bm{x}$?"
   options="$e_0 + \bm{x} + \frac{1}{2}\bm{x}^2 e_\infty$ ;; $\bm{x} + e_\infty$ ;; $e_0 + \bm{x}$ ;; $\bm{x} + \frac{1}{2}\bm{x}^2 e_0$"
   answer="1" explain="The quadratic term in e∞ makes points null vectors, P² = 0." %}

{% include mcq.html id="q-cga-prim-2"
   q="Three distinct points that do not lie on a line are combined as $P_1 \wedge P_2 \wedge P_3$. Which primitive is this?"
   options="a line ;; a plane ;; the circle through the three points ;; a sphere"
   answer="3" explain="Three points span a circle; adding e∞ instead of a third point would flatten it to a line." %}

{% include mcq.html id="q-cga-prim-3"
   q="Which primitive is $P_1 \wedge P_2 \wedge e_\infty$?"
   options="a point pair ;; the line through $P_1$ and $P_2$ ;; a circle ;; a plane"
   answer="2" explain="A circle through the point at infinity is a line." %}

{% include mcq.html id="q-cga-prim-4"
   q="A line misses a sphere entirely. What does their meet return?"
   options="nothing, this case has to be handled separately ;; always exactly zero ;; an imaginary point pair, which still carries information about how the objects are placed ;; the closest point on the sphere"
   answer="3" explain="The meet has no special cases: a real, a degenerate and an imaginary point pair cover intersecting, tangent and separate." %}

{% include mcq.html id="q-cga-prim-5"
   q="For two normalized conformal points, what is $P(\bm{x}) \cdot P(\bm{y})$?"
   options="$\norm{\bm{x}-\bm{y}}$ ;; $-\frac{1}{2}\norm{\bm{x}-\bm{y}}^2$ ;; $\bm{x}\cdot\bm{y}$ ;; $0$, because points are null vectors"
   answer="2" explain="The cross terms with e0·e∞ = −1 turn x·y into −½‖x−y‖²; only P·P itself is zero." %}
