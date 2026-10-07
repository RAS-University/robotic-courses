<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

## Conformal Geometric Algebra

### The Conformal Model

This section uses the specific variant of geometric algebra that is known as Conformal Geometric Algebra (CGA) and denoted as $\cga$. Accordingly, the underlying vector space of CGA is $\mathbb{R}^{4,1}$, which extends the Euclidean space $\mathbb{R}^3$, characterized by the three basis vectors $\gae{1}, \gae{2}, \gae{3}$, by two additional basis vectors $\gae{4}$ and $\gae{5}$, where $\gae{4}^2=1$ and $\gae{5}^2=-1$. It is clearly a pseudo-Euclidean space, in fact it has a Minkowski signature. It can be understood as extending the Euclidean space $\mathbb{R}^3$ with a Minkowski plane $\mathbb{R}^{1,1}$, i.e. $\mathbb{R}^{4,1} = \mathbb{R}^3 \oplus \mathbb{R}^{1,1}$ (Li et al., 2001). In practice, the conformal model is found by a change of basis, which introduces two new basis vectors in order to obtain a null basis. These basis vectors are

<div markdown="0">
\begin{equation}\label{eq:cga_origin_infinity_basis_vectors}
    \gae{0} = \frac{1}{2}(\gae{5} - \gae{4}) \hspace{5mm}\text{and}\hspace{5mm} \gae{\infty} = \gae{4} + \gae{5},
\end{equation}
</div>

which can be understood as a point at the origin and one at infinity. This effectively leads to a non-orthogonal basis with a metric tensor of the following form

| | $\gae{0}$ | $\gae{1}$ | $\gae{2}$ | $\gae{3}$ | $\gae{\infty}$ |
|---|---|---|---|---|---|
| $\gae{0}$ | 0 | 0 | 0 | 0 | -1 |
| $\gae{1}$ | 0 | 1 | 0 | 0 | 0 |
| $\gae{2}$ | 0 | 0 | 1 | 0 | 0 |
| $\gae{3}$ | 0 | 0 | 0 | 1 | 0 |
| $\gae{\infty}$ | -1 | 0 | 0 | 0 | 0 |

Since the underlying vector space $\mathbb{R}^{4,1}$ is five-dimensional, the algebraic basis of CGA consequently consists of 32 basis blades of grades zero to five. Grade 0 and 5 are the scalar and pseudoscalar, respectively. Grade 1 are vectors. Grades 2 to 4 are called bi-, tri- and quadvectors.

#### CGA and PGA

The flat primitives of CGA, i.e. lines and planes, are exactly the elements that contain $\gae{\infty}$. Fixing $\gae{\infty}$ and dropping the round primitives yields projective geometric algebra (PGA) $\ga{3,0,1}$, which has only 16 basis blades and a degenerate metric. Both models describe the same flats and the same rigid body motions, and motors can be converted between them without loss.

| | PGA $\ga{3,0,1}$ | CGA $\cga$ |
|---|---|---|
| basis blades | 16 | 32 |
| points, lines, planes | yes | yes |
| rigid body motions as versors | yes | yes |
| spheres, circles, point pairs | no | yes |
| point–point distance as one inner product | no | yes |
| scaling as a versor | no | yes |

A simple rule of thumb is to decide based on the constraints of a problem: if all of them concern flats and poses, PGA suffices; as soon as a constraint involves a distance to a point, a radius, a sphere or a scale, CGA is required for that constraint. This chapter uses CGA throughout, since it covers both cases in one algebra.

##### Quick quiz — the conformal model

{% include mcq.html id="q-cga-model-1"
   q="What is the vector space underlying CGA?"
   options="$\mathbb{R}^{3}$ ;; $\mathbb{R}^{4,1}$ ;; $\mathbb{R}^{3,0,1}$ ;; $\mathbb{R}^{5}$"
   answer="2" explain="Euclidean 3D space is extended by a Minkowski plane: R^{4,1} = R^3 ⊕ R^{1,1}." %}

{% include mcq.html id="q-cga-model-2"
   q="Using the metric table above, what is $e_0 \cdot e_\infty$?"
   options="$0$ ;; $1$ ;; $-1$ ;; $\frac{1}{2}$"
   answer="3" explain="The off-diagonal entry of the metric is −1, which is what makes the conformal embedding work." %}

{% include mcq.html id="q-cga-model-3"
   q="Why are $e_0$ and $e_\infty$ called null vectors?"
   options="because they are equal to zero ;; because they square to zero ;; because they are orthogonal to each other ;; because they have no geometric meaning"
   answer="2" explain="e0² = e∞² = 0 although neither vector is zero: they are null directions of the indefinite metric." %}

{% include mcq.html id="q-cga-model-4"
   q="How many basis blades does CGA have?"
   options="$5$ ;; $10$ ;; $16$ ;; $32$"
   answer="4" explain="The underlying space is five-dimensional, so there are 2^5 = 32 blades." %}

{% include mcq.html id="q-cga-model-5"
   q="A task only constrains a tool to lie on a plane and to be aligned with a line. Which algebra is sufficient?"
   options="CGA is required for any constraint ;; PGA suffices, since all constraints concern flats ;; neither, this needs matrices ;; only a dual quaternion algebra"
   answer="2" explain="Flats and rigid motions are fully covered by PGA; CGA is needed once spheres, radii or point distances appear." %}
