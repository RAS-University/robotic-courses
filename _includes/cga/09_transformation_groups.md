<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

## Transformation Groups in CGA

### Overview

In general, since the orthogonal group $O(n+1,1)$ is isomorphic to the conformal group $C(n)$, i.e. the group of angle-preserving transformations, CGA contains conformal transformations via the group $Pin(4,1)$. Pure reflections and special conformal transformations are neglected here. As the relevant transformation groups, only subgroups that are formed by an even number of unit vectors are considered, i.e. subgroups of $Spin(4,1)$. In particular, this covers the subgroups formed by rotations, translations, and uniform scaling.

{% include gafro_scene.html slug="reflection-composer" %}

### Rotation Group

The group of rotations in three-dimensional Euclidean space is usually represented by the special orthogonal group $\bm{SO}(3)$, i.e. a matrix Lie group. The group $Spin(3)$ is its double-cover and can be represented as unit quaternions. In CGA, it is the rotors that form an isomorphic group to unit quaternions, denoted here as $\group{\rotor}$. Their Lie algebra is the bivector algebra $\algebra{\bivector}\_{\rotor} = \text{span} \left\\{ \gae{12}, \gae{13}, \gae{23} \right\\}$. Given the elements $\rotor\in\group{\rotor}$ and $\bivector\_{\rotor} \in \algebra{\bivector}\_{\rotor}$, the exponential map $\exp\_{\group{\rotor}}: \algebra{\bivector}\_{\rotor} \to \group{\rotor}$ and its inverse the logarithmic map $\log\_{\group{\rotor}}: \group{\rotor} \to \algebra{\bivector}\_{\rotor}$ are

<div markdown="0">
\begin{equation}\label{eq:expmap_rotor}
        \rotor
        = \exp_{\group{\rotor}} (\bivector_{\rotor})
        = \exp\left(-\tfrac{1}{2}\bivector_{\rotor}\right)
        = \cos\left( \frac{1}{2} \norm{\bivector_{\rotor}} \right)
        - \sin\left( \frac{1}{2} \norm{\bivector_{\rotor}} \right) \inverse{\norm{\bivector_{\rotor}}} \bivector_{\rotor},
\end{equation}
</div>

and

<div markdown="0">
\begin{equation}\label{eq:logmap_rotor}
    B_R = \log_{\group{\rotor}}(\rotor) = \frac{-2\arccos \big( \grade{\rotor}{0} \big) }{\sin \Big( \arccos \big( \grade{\rotor}{0} \big)  \Big)}  \grade{\rotor}{2}.
\end{equation}
</div>

The factor $-\frac{1}{2}$ is the *half-angle convention* used throughout this chapter and in gafro: a bivector of norm $\theta$ produces a rotor that contains $\theta/2$, and the sandwich $\rotor X \reverse{\rotor}$ then rotates by the full angle $\theta$. The same convention applies to all exponential maps below, and $\log$ always denotes the inverse of the respective map, i.e. it already includes the factor $-2$.

{% include gafro_scene.html slug="rotor-sandwich" %}

### Translation Group

The translation group of $\mathbb{R}^3$ is the Euclidean space itself under the addition operation, i.e. $(\mathbb{R}^3,+)$, which is often shortened to simply $\mathbb{R}^3$. In CGA, this group can be represented in versor form. Here, the translation group containing all translation versors in CGA is denoted as $\group{\translator}$. Note that, unlike the rotation group in CGA, the group $\group{\translator}$ is not a double-cover of $(\mathbb{R}^3,+)$, since $(\mathbb{R}^3,+)$ is already a simply-connected group. The Lie algebra of the group $\group{\translator}$ is the bivector algebra $\algebra{\bivector}\_{\translator} = \text{span} \left\\{ \gae{1\infty},\gae{2\infty},\gae{3\infty} \right\\}$. Given the elements $\translator\in\group{\translator}$ and $\bivector\_{\translator} \in \algebra{\bivector}\_{\translator}$, the exponential map $\exp\_{\group{\translator}}: \algebra{\bivector}\_{\translator} \to \group{\translator}$ and its inverse the logarithmic map $\log\_{\group{\translator}}: \group{\translator} \to \algebra{\bivector}\_{\translator}$ are

<div markdown="0">
\begin{equation}\label{eq:expmap_translator}
    \translator = \exp_{\group{\translator}} \left( \bivector_{\translator} \right) = \exp\left(-\tfrac{1}{2}\bivector_{\translator}\right) = 1 - \frac{1}{2} \bivector_{\translator},
\end{equation}
</div>

and

<div markdown="0">
\begin{equation}\label{eq:logmap_translator}
    \bivector_{\translator} = \log_{\group{\translator}}(\translator) = -2 \grade{\translator}{2}.
\end{equation}
</div>

The series of the exponential terminates after the linear term, since $\bivector\_{\translator}^2 = 0$.

In general, the translation bivector $\bivector\_{\translator}$ can be found from a Euclidean vector $\bm{t} \in \mathbb{R}^3$ as

<div markdown="0">
\begin{equation}\label{eq:translation_vector}
    \bivector_{\translator} = \bm{t} \outer \gae{\infty}.
\end{equation}
</div>

### Uniform Scaling Group

Uniform scaling is a transformation that preserves geometric similarity, i.e. the shape, proportions, angles and orientation as well as parallelism and collinearity are preserved while distances are changed by an isotropic scaling factor. Uniform scaling is restricted here to positive scalars $\mathbb{R}^+$ to preserve the handedness as well. In CGA, the versor achieving this is called a dilator $\dilator$ and consequently the set of all dilators forms the dilation group $\group{\dilator}$, with its corresponding bivector Lie algebra $\algebra{\bivector}\_{\dilator}$. Given the elements $\dilator\in\group{\dilator}$ and $\bivector\_{\dilator} \in \algebra{\bivector}\_{\dilator} = \text{span}\left\\{ \gae{0\infty} \right\\}$, the exponential map $\exp\_{\group{\dilator}}: \algebra{\bivector}\_{\dilator} \to \group{\dilator}$ and its inverse the logarithmic map $\log\_{\group{\dilator}}: \group{\dilator} \to \algebra{\bivector}\_{\dilator}$ are

Writing $\bivector\_{\dilator} = \lambda\, \gae{0\infty}$ with $\lambda \in \mathbb{R}$, and using $\gae{0\infty}^2 = 1$,

<div markdown="0">
\begin{equation}\label{eq:expmap_dilator}
        \dilator
        = \exp_{\group{\dilator}} \left( \bivector_{\dilator} \right)
        = \exp\left(-\tfrac{1}{2}\bivector_{\dilator}\right)
        = \cosh \left( \frac{\lambda}{2} \right) - \sinh \left( \frac{\lambda}{2} \right) \gae{0\infty},
\end{equation}
</div>

and

<div markdown="0">
\begin{equation}\label{eq:logmap_dilator}
    \bivector_{\dilator} = \log_{\group{\dilator}}(\dilator) = -2\, \text{arsinh}\big(\dilator_{0\infty}\big) \gae{0\infty},
\end{equation}
</div>

where $\dilator\_{0\infty}$ is the $\gae{0\infty}$ coefficient of $\dilator$. Unlike $\text{arccosh}\big(\grade{\dilator}{0}\big)$, this keeps the sign of $\lambda$, i.e. it distinguishes enlarging from shrinking. The bivector $\bivector\_{\dilator}$ relates to the scaling factor $d \in \mathbb{R}^+$ via

<div markdown="0">
\begin{equation}\label{eq:scaling_factor}
    \bivector_{\dilator} = \log (d) \gae{0\infty}.
\end{equation}
</div>

Note that the scaling is always with respect to the origin.

{% include gafro_scene.html slug="conformal-versors" %}

### Rigid Transformation Group

The group of rigid transformations in Euclidean space is the most commonly used group in robotics. Traditionally, it is represented by the matrix Lie group $\bm{SE}(3)$ called the special Euclidean group. Alternative representations, such as dual quaternions, are representations of $Spin(3) \ltimes \mathbb{R}^3$, which is the double-cover of $\bm{SE}(3)$. Here, this group is denoted as $\group{\rigid}$ and its elements are usually called motors $\motor$. The group is found as $\group{\rigid} = \group{\rotor} \ltimes \group{\translator}$, and the canonical decomposition of an element $\motor \in \group{\rigid}$ is defined as

<div markdown="0">
\begin{equation}\label{eq:canonical_decomposition_rigid_transformation}
    \motor = \translator\rotor.
\end{equation}
</div>

The Lie algebra of $\group{\rigid}$ is the bivector algebra $\algebra{\bivector}\_{\rigid} = \text{span}\left\\{ \gae{12}, \gae{13}, \gae{23}, \gae{1\infty}, \gae{2\infty}, \gae{3\infty} \right\\}$ and an element $\bivector\_{\rigid}\in\algebra{\bivector}\_{\rigid}$ is decomposed as

<div markdown="0">
\begin{equation}\label{eq:decomposition_rigid_algebra}
    \bivector_{\rigid} = \bivector_{\translator} + \bivector_{\rotor}.
\end{equation}
</div>

Consequently, given the elements $\motor\in\group{\rigid}$ and $\bivector\_{\rigid} \in \algebra{\bivector}\_{\rigid}$, the exponential map $\exp\_{\group{\rigid}}: \algebra{\bivector}\_{\rigid} \to \group{\rigid}$ is

<div markdown="0">
\begin{equation}\label{eq:expmap_rigid}
    \motor
    = \exp_{\group{\rigid}} \left( \bivector_{\rigid} \right)
    = \exp \left( -\tfrac{1}{2}\bivector_{\rigid} \right).
\end{equation}
</div>

It is tempting to split this into $\exp\_{\group{\translator}}(\bivector\_{\translator})\exp\_{\group{\rotor}}(\bivector\_{\rotor})$, but this is **not** the same motor: $\bivector\_{\translator}$ and $\bivector\_{\rotor}$ do not commute, so the exponential of their sum is not the product of their exponentials. Writing $\bivector\_{\translator} = \bm{u} \outer \gae{\infty}$ and letting $\bm{\omega}$, with $\theta = \norm{\bm{\omega}}$, be the rotation vector of $\rotor = \exp\_{\group{\rotor}}(\bivector\_{\rotor})$, the motor exponential factors as $\motor = \translator\rotor$ with $\translator = \exp\_{\group{\translator}}(\bm{t} \outer \gae{\infty})$ and

<div markdown="0">
\begin{equation}\label{eq:expmap_rigid_translation}
    \bm{t} = \bm{J}(\bm{\omega})\,\bm{u},
    \qquad
    \bm{J}(\bm{\omega}) = \bm{I} + \frac{1-\cos\theta}{\theta^2}\,[\bm{\omega}]_\times + \frac{\theta-\sin\theta}{\theta^3}\,[\bm{\omega}]_\times^2,
\end{equation}
</div>

where $\bm{J}$ is the left Jacobian of $SO(3)$, exactly as for the matrix exponential of $\bm{SE}(3)$. The motor is a screw motion: it rotates by $\theta$ about an axis and translates along it. Only when $\bm{u}$ is parallel to the rotation axis does $\bm{J}(\bm{\omega})\,\bm{u} = \bm{u}$ hold, and the split form becomes exact. The logarithmic map $\log\_{\group{\rigid}}: \group{\rigid} \to \algebra{\bivector}\_{\rigid}$ inverts this,

<div markdown="0">
\begin{equation}\label{eq:logmap_rigid}
    \bivector_{\rigid} = \log_{\group{\rigid}} (\motor) = \log_{\group{\rotor}} \left( \rotor \right) + \left(\bm{J}(\bm{\omega})^{-1} \bm{t}\right) \outer \gae{\infty},
\end{equation}
</div>

where $\rotor$ and $\bm{t}$ are read off the canonical decomposition $\motor = \translator\rotor$. The split $\log\_{\group{\translator}}(\translator) + \log\_{\group{\rotor}}(\rotor)$ is still a valid set of coordinates for motors, and is sometimes used for interpolation, but it is not the logarithm of the group, and interpolating in it does not produce screw motions.

{% include gafro_scene.html slug="motor-from-screw" %}

Since the motors and the geometric primitives are part of the same algebra, the motors can be used to apply rigid body transformations to these primitives, using the sandwiching operation introduced for versors, $Y = \sandwich{\motor}{X}$. Some visual examples of how motors transform geometric primitives are shown below.

{% include gafro_scene.html slug="motor-interpolation" %}

Bayro-Corrochano (2020) showed that efficient interpolation between motors can be achieved via the bivector space, which is similar to spherical linear interpolation (SLERP). In this case the parameterized motor curve $M(t)$ can be found as an interpolation in the bivector space of via-point motors using the exponential and logarithmic map

<div markdown="0">
\begin{equation}\label{eq:motorcurve}
    M(t) = \exp \left( \sum_{j=1}^{n} w_j(t) \log (M_j) \right).
\end{equation}
</div>

The weights need to fulfill $\sum\_{j=1}^{n} w\_j = 1$ for each timestep, but can otherwise be chosen arbitrarily. Belon (2013) exploits this for mesh deformation.

{% include gafro_scene.html slug="interpolation-charts" %}

##### Quick quiz — transformation groups

{% include mcq.html id="q-cga-groups-1"
   q="With the half-angle convention, a rotor that rotates by the angle $\theta$ is ..."
   options="$\cos\theta - \sin\theta\,\hat{B}$ ;; $\cos\frac{\theta}{2} - \sin\frac{\theta}{2}\,\hat{B}$ ;; $\cos 2\theta - \sin 2\theta\,\hat{B}$ ;; $1 - \frac{1}{2}\theta\hat{B}$"
   answer="2" explain="The rotor carries θ/2 and the sandwich R X R~ applies it twice, rotating by θ." %}

{% include mcq.html id="q-cga-groups-2"
   q="Why is the translator $\exp(-\frac{1}{2}B_T) = 1 - \frac{1}{2}B_T$ exact, not an approximation?"
   options="because translations are usually small ;; because $B_T = \bm{t} \wedge e_\infty$ squares to zero, so the series stops ;; because $e_\infty$ is a unit vector ;; because translations commute with rotations"
   answer="2" explain="B_T² = 0, so every term of the exponential series beyond the linear one vanishes." %}

{% include mcq.html id="q-cga-groups-3"
   q="A motor generator $B = B_R + B_T$ rotates about the $z$-axis and translates along $x$. Is $\exp(-\frac{1}{2}B) = \exp(-\frac{1}{2}B_T)\exp(-\frac{1}{2}B_R)$?"
   options="yes, always ;; no, it only holds when the translational part is parallel to the rotation axis ;; yes, but only for small angles ;; no, the two motors rotate by different angles"
   answer="2" explain="B_T and B_R do not commute here; the true exponential moves the translation by the left Jacobian J(ω)." %}

{% include mcq.html id="q-cga-groups-4"
   q="About which point does the dilator $D = \exp(-\frac{1}{2}\lambda e_{0\infty})$ scale?"
   options="the origin ;; the point at infinity ;; the centre of the object it is applied to ;; it depends on the sign of $\lambda$"
   answer="1" explain="Dilators built from e0∞ scale about the origin; to scale about another point, conjugate with a translator." %}
