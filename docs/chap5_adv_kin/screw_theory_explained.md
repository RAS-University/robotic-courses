---
title: "Screw Theory, Explained"
parent: "Chapter 5: Advanced Kinematics"
has_children: false
nav_order: 1.1
layout: default
math: mathjax
chapter: 5
publish: true
nav_exclude: false
---

<link rel="stylesheet" href="{{ '/assets/css/styles.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/docs/chap5_adv_kin/screw_theory_explained.css' | relative_url }}">

<div class="st-lecture" markdown="1">

# Screw Theory {#screw-theory}

<div class="st-journey" markdown="1">
Imagine picking up a cup, opening a door, or asking a robot to turn a tool while inserting it. Our question is simple: **how do we describe what moved, how it moved, and what can make it move?**

We will follow that question from familiar objects to robot kinematics. At each stop, make a prediction, move something in a scene, and then give the observation a mathematical name. You do not need to know what a screw is yet.
</div>

{::options toc_levels="2" /}

<nav class="st-toc" aria-labelledby="st-toc-label" markdown="1">
<p id="st-toc-label"><strong>Table of contents</strong></p>

- Table of contents
{:toc}

</nav>

<div class="st-reading-guide" markdown="1">
**Reading the interactive sessions.** Each session has its own color key and a **Symbols and units** glossary. Read colors together with object shape and labels: the same color can serve different purposes in different experiments. Short red, green, and blue frame axes always mean positive x, y, and z.

An arrow's direction gives a vector's direction; its length uses the scale stated in that session. A 3D arrow disappears when its vector is zero or too small to draw. The numerical readouts are rounded, so a printed zero can represent a small value. **Play** advances the pose for illustration; velocity arrows use the stated motion rate, which can differ from playback speed.

Teal buttons and slider thumbs are controls. A faded control is disabled. A green quiz border marks a correct answer; an amber border invites another attempt. Page backgrounds, borders, and lighting are styling, rather than extra physical quantities.
</div>

## 5.1 Motivation {#motivation-start-with-a-cup-not-an-equation}

Put a cup on a table. Slide it a little to the right. Now leave it in the same place and turn its handle toward you. Finally, lift it while turning it. You have just performed translation, rotation, and a combination of the two.

How would you tell a robot to repeat those actions? “Move the cup to this point” is incomplete: its handle could face anywhere. “Turn it by this angle” is incomplete too: about which axis, and through which point? We need a description that carries both **position and orientation**.

Attaching a small coordinate frame to the cup gives us a way to record both. The frame travels with the cup. Describing the cup's pose means describing the pose of that frame relative to a frame on the table. The cup is a rigid body in this model: the distances between its material points stay fixed. For a flexible object, we may use rigid links or local rigid approximations, but deformation needs additional coordinates.

**Predict before you move:** if we rotate the cup, does the handle move along a straight line, stay still, or trace a circle?

<div class="st-lab" id="st-motion" data-st-lab="motion">
<p><strong>Try it — one object, three motions.</strong> Select a slide, a turn, and then both. The faint cup is the reference pose; the small moving frame records the current pose.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #1697a0" aria-hidden="true"></span></span><div><strong>Solid teal cup</strong><span>The rigid object at its current pose; its surface color does not encode a velocity or force.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d57a21" aria-hidden="true"></span></span><div><strong>Orange dot painted on the cup</strong><span>A material point fixed to the cup, useful for noticing its orientation. The dot is not a velocity arrow.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #1697a0" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #d57a21" aria-hidden="true"></span></span><div><strong>Faint cup and faint painted dot</strong><span>The reference pose before the selected motion. Transparency distinguishes the starting object from the current one.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #9fadb5" aria-hidden="true"></span></span><div><strong>Gray trail</strong><span>The path of the moving cup-frame origin. It does not track the painted dot.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>F₀, Fᵢ</var></dt><dd>F₀ is the fixed table/world frame; Fᵢ is attached to the moving cup. Subscript 0 is the number zero, not the letter O.</dd>
<dt><var>φ (phi)</var></dt><dd>Motion progress. The slider displays degrees; the calculation converts them to radians. In slide mode it controls the slide; in turn mode the rotation; in combined mode both.</dd>
<dt><var>°, rad, m</var></dt><dd>Degrees and radians measure angles; m means metres and measures the displayed height change.</dd>
</dl>
<p class="st-key-note">Sliding changes position. Turning changes orientation and, in this example, carries the cup around the world z axis. The moving frame records both.</p>
</details>
</div>
<p class="st-fallback">The interaction loads as you approach it. Without 3D, imagine marking the cup's handle and tracking both its position and orientation.</p>
</div>

There is already a small surprise here. A cup may be “only rotating,” yet a point on its handle has a **linear velocity**. Rotation produces linear motion at points away from the axis. Turn the thought around: push on a door handle with a linear force. The door turns because that force produces a **moment** about the hinge.

These are clues. Angular and linear quantities are different physical quantities, but their effects are coupled through geometry. We would like a language that keeps the coupled information together. Later, vector spaces will let us add and scale these descriptions without losing their meaning.

### 5.1.1 The question has a history {#the-question-has-a-history}

Long before robots, the motion of a solid body posed the same puzzle: could a complicated change of position and orientation have a simple description? Begin with an easier case. Imagine holding one corner of a book fixed while turning the book into a new orientation. You might make several turns about different axes, yet Leonhard **Euler's** result from 1775 tells us that the final orientation can be reached by one rotation about a suitable axis through the fixed corner. Many turns can have the same result as a single turn. [1](https://rotations.berkeley.edu/kinematics-of-rigid-bodies/)

Now let go of the corner. The book can change both its position and its orientation, just as our cup did. A translation followed by a rotation can reach its new pose, but there is a more revealing possibility: can the turn and the slide share one axis? In 1830, Michel **Chasles** showed that a suitable axis can always be chosen for a general rigid-body displacement. The rotation occurs about that axis, and the translation occurs along it. [2](https://dev.gutenberg.org/files/42473/42473-h/42473-h.htm)

We can state **Chasles' theorem** in the language of our original question:

> Any orientation-preserving displacement of a rigid body can be achieved by rotating about a suitable axis and translating along that same axis.

This is an equivalent description of the displacement between the two poses. Either the rotation or the translation may vanish. [2](https://dev.gutenberg.org/files/42473/42473-h/42473-h.htm)

Think of a threaded screw advancing through a nut: turn it, and it also slides along its axis. This is the image behind **screw motion**. A door hinge gives rotation without axial slide. An elevator gives translation without rotation. Both fit into the same description as special cases.

Notice what the theorem promises: an equivalent way to connect **two poses**. A hand may take a cup along a curved, changing route; that entire route need not be one constant-axis screw motion. The theorem describes the net displacement. Instant by instant, however, rigid-body velocity also has a screw description.

<figure class="st-figure">
<img src="{{ '/docs/chap5_adv_kin/assets/motion_story.svg' | relative_url }}" alt="A cup slides, turns, and follows a helical motion, with a coordinate frame attached to it.">
<figcaption>Position and orientation travel together. A screw axis provides a single geometric description of a combined turn and slide.</figcaption>
</figure>

<div class="st-quiz" id="quiz-motivation" data-answer="1">
<fieldset>
<legend>Checkpoint — Can a point on a rotating door have linear velocity?</legend>
<label><input type="radio" name="quiz-motivation" value="0" data-explanation="A body can rotate while points away from its axis have nonzero tangential velocities.">No: rotation excludes linear velocity.</label>
<label><input type="radio" name="quiz-motivation" value="1" data-explanation="Rotation describes the body; the velocity of each point follows from its distance to the axis.">Yes: the handle moves tangentially even though the body rotates.</label>
<label><input type="radio" name="quiz-motivation" value="2" data-explanation="A fixed hinge is enough: points away from it trace circles.">Only if the hinge translates.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Imagine marking the handle with a dot and following it for a short time.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.1.2 What we hope to gain {#what-we-hope-to-gain}

Suppose a screw describes a small motion. If we repeatedly apply it to an initial frame, could it carry us to a final frame? Yes: the **exponential map** will turn a motion generator and an amount of motion into a transformation. A bare screw axis does not specify a final pose; we also need that amount and an initial pose.

The same geometric language will help us describe velocities and force systems. Twists will package angular and linear velocity. Wrenches will package force and moment. Their pairing will tell us whether a force system does work on an allowed motion.

For robotics, this connects forward kinematics, velocity control, and dynamics. In a two-arm task, both hands must agree on the object's motion and the forces they transmit. In computer vision, a camera's change of pose is also a rigid transformation. The underlying question stays the same: **how can we describe motion in space, and how can we reason about its effects?**

Our route is now clear: first learn how descriptions can be added, then learn how small changes accumulate. Only then will we name and use screws.

## 5.2 Preliminaries: fields and vector spaces {#preliminaries-the-tools-our-story-needs}

### 5.2.1 Fields: where our scalars live {#fields-where-our-scalars-live}

If a velocity is doubled, “2” is a scalar. If we reverse it, “−1” is a scalar. Scalars come from a **field**: a set in which addition, subtraction, multiplication, and division by nonzero elements obey familiar arithmetic rules. More precisely, addition forms a commutative group, nonzero elements form a commutative group under multiplication, multiplication distributes over addition, and $0\ne1$.

The real numbers $\mathbb{R}$ are our main field. The complex numbers $\mathbb{C}$ are another field; we will briefly visit them when we meet Euler's formula. Integers are not a field: $1/2$ is not an integer.

The intuition is ordinary arithmetic that remains available when we add or scale something more interesting than a number.

### 5.2.2 Vector spaces: descriptions that can be added and scaled {#vector-spaces-descriptions-that-can-be-added-and-scaled}

An arrow drawn on paper is one example of a vector, but the idea is broader. A vector can be a column of numbers, a polynomial, or a velocity field. What matters is how its addition and scalar multiplication behave.

For vectors $\mathbf{a},\mathbf{b},\mathbf{c}$ and scalars $\alpha,\beta$ in a field $\mathbb{K}$, we can organize the requirements into **four groups of rules**. These groups contain the full axioms; they are not four isolated tests.

| Rule group | What must hold | What it lets us do |
|:--|:--|:--|
| 1. Closure | $\mathbf{a}+\mathbf{b}$ and $\alpha\mathbf{a}$ stay in the set. | Combine descriptions without leaving our language. |
| 2. Addition is a commutative group | Addition is associative and commutative; there is a zero vector and every vector has an additive inverse. | Add in any grouping or order, cancel, and describe no effect. |
| 3. Scalar action | $1\mathbf{a}=\mathbf{a}$ and $\alpha(\beta\mathbf{a})=(\alpha\beta)\mathbf{a}$. | Scale consistently. |
| 4. Distributivity | $\alpha(\mathbf{a}+\mathbf{b})=\alpha\mathbf{a}+\alpha\mathbf{b}$ and $(\alpha+\beta)\mathbf{a}=\alpha\mathbf{a}+\beta\mathbf{a}$. | Expand and collect linear combinations. |

The plane $\mathbb{R}^2$ passes these rules. The set of **unit** vectors does not: scaling a unit vector by zero produces a vector outside the set, and adding two unit vectors need not produce a unit vector.

<div class="st-lab" id="st-vectors" data-st-lab="vectors">
<p><strong>Try it — stay inside the plane.</strong> Change the two scalar multipliers. Make the sum disappear by setting both to zero, then reverse a contribution with a negative multiplier.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Teal arrow a</strong><span>The fixed vector a = [1, 0.4].</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #913f84" aria-hidden="true"></span></span><div><strong>Purple arrow b</strong><span>The fixed vector b = [−0.3, 1].</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange arrow αa + βb</strong><span>The sum after each fixed vector has been multiplied by its scalar.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #b5c7d3" aria-hidden="true"></span></span><div><strong>Pale gray crossing lines</strong><span>The horizontal x axis and vertical y axis of the vector plane.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #304d62" aria-hidden="true"></span></span><div><strong>Dark dot labeled 0</strong><span>The origin and zero vector; an arrow of zero length starts and ends here.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>a, b</var></dt><dd>The two fixed vectors, each described by its horizontal and vertical components.</dd>
<dt><var>α (alpha), β (beta)</var></dt><dd>Real scalar multipliers. A negative multiplier reverses that contribution; zero removes it.</dd>
<dt><var>αa + βb</var></dt><dd>A linear combination: scale each vector, then add the matching components.</dd>
<dt><var>0</var></dt><dd>The zero vector, not a unit vector. Setting both multipliers to zero produces it.</dd>
<dt><var>[x, y]</var></dt><dd>The horizontal and vertical components, in that order.</dd>
</dl>
<p class="st-key-note">The teal and purple arrows show a and b themselves. Their scaled contributions are used to calculate the orange arrow; the two original arrows keep their original lengths.</p>
</details>
</div>
<p class="st-fallback">For a = [1, 0.4] and b = [−0.3, 1], every real linear combination αa + βb is still a vector in the plane.</p>
</div>

Different units do not prevent a product space. We can package an angular velocity and a linear velocity as an ordered pair, then add each component to its matching component. We never add metres per second directly to radians per second.

At a fixed configuration, unrestricted rigid-body velocity descriptions form a six-dimensional vector space. A hinge permits a one-dimensional subspace. Finite rotations themselves are different: adding two rotation matrices generally does not produce another rotation matrix. This difference between **velocity space** and **pose space** will matter when we reach exponentials.

<div class="st-quiz" id="quiz-vectors" data-answer="0">
<fieldset>
<legend>Checkpoint — Which set fails to be a real vector space with ordinary addition and scaling?</legend>
<label><input type="radio" name="quiz-vectors" value="0" data-explanation="Scaling by zero leaves this set, and addition can change the length.">Only the unit vectors in the plane.</label>
<label><input type="radio" name="quiz-vectors" value="1" data-explanation="The plane includes zero and remains closed under all real linear combinations.">All vectors in the plane.</label>
<label><input type="radio" name="quiz-vectors" value="2" data-explanation="Componentwise addition and scaling make these pairs a product vector space.">All ordered pairs of a 3D angular velocity and a 3D linear velocity.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Try multiplying an element by zero.</p>
<p class="st-feedback" role="status"></p>
</div>

## 5.3 Exponentials and rotations: accumulate small changes {#exponentials-and-rotations}

### 5.3.1 Exponentials, first route: many small proportional changes {#exponentials-first-route-many-small-proportional-changes}

Before an exponential describes a robot, let it describe a growing quantity.

Imagine one unit of principal earning a nominal annual rate of 100%, compounded once. After a year it becomes $2$. Compound twice at 50% per half-year and it becomes $(1+1/2)^2=2.25$. Four times gives $(1+1/4)^4=2.44140625$. More frequent compounding lets newly earned amounts earn further interest.

Jacob Bernoulli studied this limit in 1683. This is a historical motivation, not a financial model we need for robotics; see [MacTutor's history of the number $e$](https://mathshistory.st-andrews.ac.uk/HistTopics/e/).

After $n$ small updates, each multiplying the current amount by $1+1/n$,

$$
e=\lim\_{n\to\infty}\left(1+\frac1n\right)^n
\approx 2.718281828.
$$

We need a function, not just one number. Replace the total unit change by a real parameter $t$:

$$
E(t)=\lim\_{n\to\infty}\left(1+\frac{t}{n}\right)^n.
$$

Use the binomial theorem:

$$
\left(1+\frac{t}{n}\right)^n
=\sum\_{k=0}^{n}\binom nk\frac{t^k}{n^k}.
$$

For each fixed $k$, the coefficient becomes

$$
\frac{\binom nk}{n^k}
=\frac1{k!}\left(1-\frac0n\right)\left(1-\frac1n\right)
\cdots\left(1-\frac{k-1}{n}\right)
\longrightarrow\frac1{k!}.
$$

For bounded $t$, the absolute values of the terms are bounded by $\lvert t\rvert ^k/k!$, whose sum converges. This also controls the tails, so passing to the limit is justified. We obtain

$$
\boxed{E(t)=1+t+\frac{t^2}{2!}+\frac{t^3}{3!}+\cdots
=\sum\_{k=0}^{\infty}\frac{t^k}{k!}.}
$$

This function is $e^t$. The factorials are not decoration: they come directly from counting combinations of small updates.

<div class="st-lab" id="st-growth" data-st-lab="growth">
<p><strong>Try it — turn discrete updates into continuous change.</strong> Increase n. Use a positive rate for growth and a negative rate for decay. Compare the repeated-update curve with the exponential.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Teal curve</strong><span>The exact continuous solution x(t) = exp(at), starting from x(0) = 1.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange connected segments</strong><span>n discrete proportional updates. Each step multiplies the previous value by 1 + a/n.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #b5c7d3" aria-hidden="true"></span></span><div><strong>Pale gray graph axes</strong><span>Time t runs horizontally; the quantity x(t) runs vertically.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #304d62" aria-hidden="true"></span></span><div><strong>Dark graph labels</strong><span>The quantity being plotted, its initial value, and the endpoint t = 1.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x(t), x(0)</var></dt><dd>The amount at time t and its starting amount, which is 1 in this experiment.</dd>
<dt><var>t</var></dt><dd>Time over the displayed interval from 0 to 1; this example uses a normalized time unit.</dd>
<dt><var>a</var></dt><dd>The proportional rate. Positive means growth, negative means decay, and zero means no change.</dd>
<dt><var>n</var></dt><dd>The number of equally spaced updates over that interval; each time step is 1/n.</dd>
<dt><var>ẋ = ax</var></dt><dd>The dot means a time derivative: the amount changes at a rate proportional to its present value.</dd>
<dt><var>exp(at), eᵃ</var></dt><dd>exp denotes the exponential. At t = 1 its value is exp(a) = eᵃ.</dd>
<dt><var>(1 + a/n)ⁿ</var></dt><dd>The amount after all n discrete updates; the superscript n means an ordinary scalar power.</dd>
<dt><var>Absolute error</var></dt><dd>The nonnegative difference between the two endpoint amounts.</dd>
</dl>
<p class="st-key-note">As n grows, the orange approximation approaches the teal curve. At a = 0 the two curves overlap, because both describe a constant amount.</p>
</details>
</div>
<p class="st-fallback">At rate a = 1, four steps give 2.44140625 while continuous change gives e ≈ 2.71828 at t = 1.</p>
</div>

### 5.3.2 Exponentials, second route: the present value determines its rate {#exponentials-second-route-the-present-value-determines-its-rate}

Imagine an ideal population in which the net growth rate is proportional to the current population. Twice as many individuals give twice as many net additions. In suitably scaled time,

$$
\frac{dx}{dt}=x,\qquad x(0)=1.
$$

Can we build the solution without already knowing $e^t$? Try a power series

$$
x(t)=a\_0+a\_1t+a\_2t^2+\cdots.
$$

Differentiate and compare coefficients in $\dot x=x$:

$$
\sum\_{k=0}^{\infty}(k+1)a\_{k+1}t^k
=\sum\_{k=0}^{\infty}a\_kt^k
\quad\Longrightarrow\quad
a\_{k+1}=\frac{a\_k}{k+1}.
$$

The initial value gives $a\_0=1$, hence $a\_k=1/k!$. We rediscover

$$
x(t)=1+t+\frac{t^2}{2!}+\cdots=e^t.
$$

The series converges everywhere, can be differentiated term by term, and satisfies the equation and initial value; uniqueness of the linear initial-value problem identifies it as the solution. More generally,

$$
\dot x=ax,\quad x(0)=x\_0
\quad\Longrightarrow\quad x(t)=x\_0e^{at}.
$$

For $a>0$, this is ideal proportional growth. For $a=-\lambda<0$, it gives an ideal decay law $x(t)=x\_0e^{-\lambda t}$, including the standard model for the expected remaining amount of a radioactive substance. The key idea is **repeated change governed by the current state**.

Here is the bridge between our two routes: a short time step gives

$$
x(t+\Delta t)\approx x(t)+a\,x(t)\Delta t
=(1+a\Delta t)x(t).
$$

Repeat that update with $\Delta t=t/n$, and the differential equation leads back to the compounding limit. We met the same function from two directions.

<div class="st-quiz" id="quiz-growth" data-answer="2">
<fieldset>
<legend>Checkpoint — What connects repeated compounding to the equation ẋ = a x?</legend>
<label><input type="radio" name="quiz-growth" value="0" data-explanation="The added amount is proportional to the current value, so it changes as the value changes.">Both add the same fixed amount at each step.</label>
<label><input type="radio" name="quiz-growth" value="1" data-explanation="Finite steps approximate continuous evolution; the limit gives the exponential.">A single finite step always equals the exact exponential.</label>
<label><input type="radio" name="quiz-growth" value="2" data-explanation="The recurrence x_next = (1 + a Δt)x has the differential equation as its continuous limit.">Each small update uses the current value; infinitely small updates converge to exp(at).</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Compare one step with four steps and then with 128 steps.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.3.3 A point on a circle: derive the 2D rotation {#a-point-on-a-circle-derive-the-2d-rotation}

Place a point at $\mathbf{r}(0)=[1\;0]^T$. Increase its angle $\phi$ counterclockwise. At each position, its change per unit angle points along the tangent, perpendicular to the radius:

$$
\frac{d\mathbf{r}}{d\phi}
=\boldsymbol{\Omega}\mathbf{r},\qquad
\boldsymbol{\Omega}=
\begin{bmatrix}
0&-1 \\ <br>
1&0
\end{bmatrix}.
$$

Indeed, $\boldsymbol{\Omega}[x\;y]^T=[-y\;x]^T$: a quarter-turn of the radius. Unlike growth, this change turns the vector rather than lengthening it. Check that

$$
\frac{d}{d\phi}\lVert \mathbf{r}\rVert ^2
=2\mathbf{r}^T\boldsymbol{\Omega}\mathbf{r}=0.
$$

Now rotate every vector, not just one point. Collect the rotated basis vectors into $\mathbf{R}(\phi)$. Each column follows the same equation:

$$
\frac{d\mathbf{R}}{d\phi}=\boldsymbol{\Omega}\mathbf{R},
\qquad \mathbf{R}(0)=\mathbf{I}\_2.
$$

The scalar equation $\dot x=ax$ gave $e^{at}$. The matrix version gives

$$
\boxed{\mathbf{R}(\phi)=e^{\boldsymbol{\Omega}\phi}.}
$$

You can derive this with exactly the same coefficient recurrence, replacing scalar powers by matrix powers:

$$
e^{\boldsymbol{\Omega}\phi}
=\mathbf{I}\_2+\phi\boldsymbol{\Omega}
+\frac{\phi^2}{2!}\boldsymbol{\Omega}^2+\cdots.
$$

### 5.3.4 The “aha”: growth and trigonometry meet {#the-aha-growth-and-trigonometry-meet}

We found the exponential from a differential equation. Now return to the series we obtained from the **binomial expansion**. For this particular generator,

$$
\boldsymbol{\Omega}^2=-\mathbf{I}\_2,\quad
\boldsymbol{\Omega}^3=-\boldsymbol{\Omega},\quad
\boldsymbol{\Omega}^4=\mathbf{I}\_2.
$$

Group the even and odd powers:

$$
e^{\boldsymbol{\Omega}\phi}
=\left(1-\frac{\phi^2}{2!}+\frac{\phi^4}{4!}-\cdots\right)\mathbf{I}\_2
+\left(\phi-\frac{\phi^3}{3!}+\frac{\phi^5}{5!}-\cdots\right)\boldsymbol{\Omega}.
$$

Those two familiar series are cosine and sine:

$$
\mathbf{R}(\phi)=\cos\phi\,\mathbf{I}\_2+\sin\phi\,\boldsymbol{\Omega}
=\begin{bmatrix}
\cos\phi&-\sin\phi \\ <br>
\sin\phi&\cos\phi
\end{bmatrix}.
$$

The exponential did not acquire a new meaning by magic. The **generator's powers** determined the kind of evolution: a scalar produces growth or decay, while this quarter-turn generator produces rotation.

Recall the imaginary unit $i$, with $i^2=-1$. Multiplying $x+iy$ by $i$ also sends $(x,y)$ to $(-y,x)$. Consequently,

$$
e^{i\phi}
=\left(1-\frac{\phi^2}{2!}+\cdots\right)
+i\left(\phi-\frac{\phi^3}{3!}+\cdots\right)
=\boxed{\cos\phi+i\sin\phi}.
$$

Euler's formula is the complex-number version of the same planar rotation. In this formula $i$ is the imaginary unit; in a frame label $\mathcal{F}\_i$, the subscript $i$ is an index.

<div class="st-lab" id="st-rotation2" data-st-lab="rotation2">
<p><strong>Try it — the tangent becomes a rotation.</strong> Set φ = 90°. The teal point is the exact rotation; the purple point uses n finite updates (I + Ωφ/n). Increase n and watch the approximation converge.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Teal point and radius line</strong><span>The exact rotated point r = exp(Ωφ)[1, 0], and the line from the origin to that point.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #913f84" aria-hidden="true"></span></span><div><strong>Purple point</strong><span>The approximation obtained by applying n finite Euler steps.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange tangent arrow</strong><span>The direction of dr/dφ = Ωr at the exact point. Its plotted length is half the derivative length, a scale factor of 0.5 rad.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #9fadb5" aria-hidden="true"></span></span><div><strong>Gray circle</strong><span>The unit circle: the exact rotated point stays on it.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>F₀</var></dt><dd>The fixed reference frame; this experiment lies in its xy plane.</dd>
<dt><var>r, r(0)</var></dt><dd>The current point vector and its initial value [1, 0]. The third coordinate is zero and is omitted from the readout.</dd>
<dt><var>φ (phi)</var></dt><dd>The signed counterclockwise rotation angle; displayed in degrees, evaluated in radians.</dd>
<dt><var>Ω (capital omega)</var></dt><dd>The planar generator [0, −1; 1, 0]. Multiplication by Ω turns a vector by a quarter-turn.</dd>
<dt><var>I, n</var></dt><dd>I is the identity matrix; n is the number of small approximation steps.</dd>
<dt><var>exp(Ωφ)</var></dt><dd>The exact rotation operator, obtained by accumulating the constant generator.</dd>
<dt><var>(I + Ωφ/n)ⁿ</var></dt><dd>Repeated finite Euler updates. Their length error decreases as the step size decreases.</dd>
<dt><var>dr/dφ, &#124;r&#124;</var></dt><dd>The change in position per unit angle, and the vector length. This tangent is not a time velocity until an angular rate is supplied.</dd>
</dl>
<p class="st-key-note">The exact and approximate points can overlap when the approximation is close. Both begin at [1, 0].</p>
</details>
</div>
<p class="st-fallback">At φ = π/2, exp(Ωφ)[1,0] = [0,1]. A single linear update gives [1,π/2], which is not on the unit circle.</p>
</div>

<div class="st-quiz" id="quiz-rotation2" data-answer="1">
<fieldset>
<legend>Checkpoint — Why do sine and cosine appear in exp(Ωφ) for the 2D rotation generator?</legend>
<label><input type="radio" name="quiz-rotation2" value="0" data-explanation="Scalar exponentials also describe growth and decay. The generator determines the behavior.">Because every exponential is a rotation.</label>
<label><input type="radio" name="quiz-rotation2" value="1" data-explanation="The same exponential series takes this trigonometric form because of the powers of the generator.">Because Ω² = −I, and even and odd powers collect into the cosine and sine series.</label>
<label><input type="radio" name="quiz-rotation2" value="2" data-explanation="The matrix rotation uses a real angle and real matrices; complex numbers provide an equivalent planar picture.">Because φ must be a complex number.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Write the first five powers of Ω.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.3.5 Carry the same idea into 3D {#carry-the-same-idea-into-3d}

Choose a unit axis direction $\mathbf{e}$. A point rotating about the axis through the origin obeys

$$
\frac{d\mathbf{r}}{d\phi}=\mathbf{e}\times\mathbf{r}.
$$

The cross product is linear in $\mathbf{r}$, so it has a matrix representation. We use the existing chapter's **tilde** notation:

$$
\widetilde{\mathbf{e}}
=\begin{bmatrix}
0&-e\_z&e\_y \\ <br>
e\_z&0&-e\_x \\ <br>
-e\_y&e\_x&0
\end{bmatrix},
\qquad \widetilde{\mathbf{e}}\mathbf{r}=\mathbf{e}\times\mathbf{r}.
$$

Set $\boldsymbol{\Omega}=\widetilde{\mathbf{e}}$. As before,

$$
\frac{d\mathbf{R}}{d\phi}=\boldsymbol{\Omega}\mathbf{R},\qquad
\mathbf{R}(0)=\mathbf{I}\_3
\quad\Longrightarrow\quad
\mathbf{R}(\phi)=e^{\boldsymbol{\Omega}\phi}.
$$

The 3D powers are slightly different. The vector triple-product identity gives

$$
\boldsymbol{\Omega}^2\mathbf{r}
=\mathbf{e}(\mathbf{e}\cdot\mathbf{r})-\mathbf{r},
\qquad
\boldsymbol{\Omega}^2=\mathbf{e}\mathbf{e}^T-\mathbf{I}\_3,
\qquad
\boldsymbol{\Omega}^3=-\boldsymbol{\Omega}.
$$

Separate the identity term and collect odd and even powers in the exponential:

$$
\boxed{
\mathbf{R}(\phi)
=\mathbf{I}\_3+\sin\phi\,\boldsymbol{\Omega}
+(1-\cos\phi)\boldsymbol{\Omega}^2.}
$$

This is Rodrigues' formula. Its geometry becomes clearer when it acts on a vector:

$$
\mathbf{R}(\phi)\mathbf{r}
=\cos\phi\,\mathbf{r}
+\sin\phi\,(\mathbf{e}\times\mathbf{r})
+(1-\cos\phi)\mathbf{e}(\mathbf{e}\cdot\mathbf{r}).
$$

Split $\mathbf{r}$ into a component along the axis and a component perpendicular to it. The parallel component stays fixed; the perpendicular component rotates in its own plane. A 3D rotation is a planar rotation around an unchanged axis.

<div class="st-lab" id="st-rotation3" data-st-lab="rotation3">
<p><strong>Try it — tilt the axis.</strong> Change its azimuth and tilt, then rotate. Compare the rotated vector's length and its component along e before and after the motion.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Long teal arrow</strong><span>The chosen rotation-axis direction e, drawn with length 1.3 so it remains visible.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange vector</strong><span>The rotated vector r = Rr(0), starting from r(0) = [1, 0, 0]. Here orange represents a vector, not a velocity.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #913f84" aria-hidden="true"></span></span><div><strong>Purple vector</strong><span>The parallel component e(e · r(0)), unchanged as φ varies about a fixed axis. It can point along e or opposite to it, depending on the projection sign.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>F₀, Fᵢ</var></dt><dd>The fixed frame and the frame obtained by applying the displayed rotation.</dd>
<dt><var>e</var></dt><dd>A unit vector defining the rotation axis through the origin.</dd>
<dt><var>φ (phi)</var></dt><dd>The signed rotation angle about e, in degrees on the slider and radians in the calculation.</dd>
<dt><var>Axis azimuth, axis tilt</var></dt><dd>Azimuth turns the axis around z; tilt measures its angle away from positive z.</dd>
<dt><var>R, det(R)</var></dt><dd>The rotation matrix and its determinant. A proper rotation has determinant 1.</dd>
<dt><var>r, r(0), &#124;r&#124;</var></dt><dd>The rotated vector, its initial value, and its length. Rotation keeps this length unchanged.</dd>
<dt><var>·, e · r</var></dt><dd>The dot product, which gives the component along a unit axis. e · r remains equal to e · r(0).</dd>
</dl>
<p class="st-key-note">The purple vector may disappear when the parallel component is zero. The short frame axes and the long teal rotation-axis arrow have different roles.</p>
</details>
</div>
<p class="st-fallback">The length stays fixed, e·r stays fixed, and det(R) = 1. Only the component perpendicular to the axis turns.</p>
</div>

<div class="st-quiz" id="quiz-rotation3" data-answer="0">
<fieldset>
<legend>Checkpoint — Which part of a vector stays unchanged under rotation about e?</legend>
<label><input type="radio" name="quiz-rotation3" value="0" data-explanation="The cross product with e vanishes on that component; the perpendicular component rotates.">Its component parallel to e.</label>
<label><input type="radio" name="quiz-rotation3" value="1" data-explanation="That component generally turns in the plane perpendicular to the axis.">Its entire perpendicular component.</label>
<label><input type="radio" name="quiz-rotation3" value="2" data-explanation="Only an axis-dependent parallel component is guaranteed to remain fixed.">Its x component for every axis direction.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Use the 3D axis lab and compare e·r before and after.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.3.6 Why keep the exponential? {#why-keep-the-exponential}

We now know the sine-and-cosine formula. Why keep its exponential form?

For a **constant** generator $\boldsymbol{\Omega}$,

$$
\frac{d}{d\phi}e^{\boldsymbol{\Omega}\phi}
=\boldsymbol{\Omega}e^{\boldsymbol{\Omega}\phi},\qquad
\left(e^{\boldsymbol{\Omega}\phi}\right)^{-1}=e^{-\boldsymbol{\Omega}\phi}.
$$

Two amounts about the same fixed axis combine cleanly:

$$
e^{\boldsymbol{\Omega}\phi\_1}e^{\boldsymbol{\Omega}\phi\_2}
=e^{\boldsymbol{\Omega}(\phi\_1+\phi\_2)}.
$$

It also preserves the rotation constraints automatically. Since $\boldsymbol{\Omega}^T=-\boldsymbol{\Omega}$,

$$
\mathbf{R}^T\mathbf{R}
=e^{-\boldsymbol{\Omega}\phi}e^{\boldsymbol{\Omega}\phi}
=\mathbf{I}\_3.
$$

The determinant starts at $1$ and cannot change sign while $\mathbf{R}$ remains orthogonal, so $\mathbf{R}(\phi)\in SO(3)$.

These advantages extend to rigid motions. But do not generalize the multiplication rule to different generators: in general $e^{\mathbf{A}}e^{\mathbf{B}}\ne e^{\mathbf{A}+\mathbf{B}}$. Try turning a book about two different axes in opposite orders. **The product is easy to write; its order still matters.**

We have learned how small linear changes accumulate into valid rotations. We are ready to ask what the corresponding small change looks like when a body can also translate.

## 5.4 Screws: keep the effects that belong together {#screws-keep-the-effects-that-belong-together}

### 5.4.1 Our notation, carried over from the existing chapter {#our-notation-carried-over-from-the-existing-chapter}

We retain the conventions in [the existing Screw Theory lecture]({{ '/docs/chap5_adv_kin/01_screw_theory.html' | relative_url }}). In particular, we do **not** reorder wrenches to match a different textbook.

| Symbol | Meaning |
|:--|:--|
| $\mathbf{e},\mathbf{p},h$ | Unit axis direction, position of a point on the axis, and pitch. |
| $X=[\boldsymbol{\xi}^T\;\boldsymbol{\eta}^T]^T$ | Generic six-dimensional screw-coordinate vector. |
| $V=[\boldsymbol{\omega}^T\;\mathbf{v}^T]^T$ | Twist: angular part first, linear part second. |
| $W=[\mathbf{f}^T\;\mathbf{m}^T]^T$ | Wrench: force first, moment second. |
| $Y\_i\equiv{}^0Y\_i$ | Joint $i$'s constant spatial screw at the reference configuration. |
| $\,{}^{i}X\_i$ | Constant joint screw in body $i$'s local frame. |
| $\widetilde{\mathbf{a}}$, $\widehat X$ | The 3 × 3 cross-product matrix and the 4 × 4 motion-generator matrix. |
| $\mathcal{F}\_0,\mathcal{F}\_i$ | Fixed frame and a frame attached to body $i$. |
| $\,{}^{a}\mathbf{H}\_b$ | Pose of frame $b$ relative to frame $a$; maps coordinates from $b$ to $a$. |
| $\mathbf{H}\_i\equiv{}^0\mathbf{H}\_i$, $\mathbf{A}\_i=\mathbf{H}\_i(\mathbf{0})$ | Absolute current pose and absolute reference pose of body $i$. |
| $\,{}^{k}{}\_{i}\mathbf{r}\_j$ | Vector from point $i$ to point $j$, expressed in frame $k$. |
| $\phi$, $q\_i$ | General motion parameter and joint coordinate. |

A left superscript answers **“expressed in which frame?”** A right subscript identifies the body, frame, or joint. Thus $\,{}^{3}\mathbf{J}\_4$ means a Jacobian for **body 4**, expressed in **frame 3**.

### 5.4.2 What does the angular velocity tell us? {#what-does-the-angular-velocity-tell-us}

Open a door slowly. A point near the hinge barely moves; a point near the handle moves faster. The entire door has one angular velocity $\boldsymbol{\omega}$, but its points have different linear velocities.

If $\mathbf{p}$ is a stationary point on the rotation axis, then a body point at $\mathbf{r}$ has

$$
\dot{\mathbf{r}}=\boldsymbol{\omega}\times(\mathbf{r}-\mathbf{p}).
$$

For example, take $\boldsymbol{\omega}=[0\;0\;2]^T$ rad/s and $\mathbf{p}=\mathbf{0}$. A point at $\mathbf{r}=[0.5\;0\;0]^T$ m has velocity $[0\;1\;0]^T$ m/s. The body rotates; the point translates instantaneously along its tangent.

Now let a rigid body's frame have origin $\mathbf{t}$ and orientation $\mathbf{R}$. For a fixed material coordinate $\mathbf{r}\_{\mathrm{body}}$,

$$
\mathbf{r}=\mathbf{R}\mathbf{r}\_{\mathrm{body}}+\mathbf{t}.
$$

Differentiate, using $\dot{\mathbf{R}}=\widetilde{\boldsymbol{\omega}}\mathbf{R}$:

$$
\dot{\mathbf{r}}
=\boldsymbol{\omega}\times(\mathbf{r}-\mathbf{t})+\dot{\mathbf{t}}
=\boldsymbol{\omega}\times\mathbf{r}+
\underbrace{\left(\dot{\mathbf{t}}-\boldsymbol{\omega}\times\mathbf{t}\right)}\_{\mathbf{v}}.
$$

This is why a twist needs six components:

$$
\boxed{
V=\begin{bmatrix}
\boldsymbol{\omega} \\ <br>
\mathbf{v}
\end{bmatrix},
\qquad
\dot{\mathbf{r}}=\boldsymbol{\omega}\times\mathbf{r}+\mathbf{v}.}
$$

Here $\mathbf{v}$ is the **linear component of the spatial twist**, the intercept of the velocity field at the coordinate origin. It is generally **not** the velocity $\dot{\mathbf{t}}$ of the moving frame origin. To obtain the velocity of a specified point, substitute its position into the field.

Compare two examples:

| Motion, in the fixed frame | Twist | Velocity of a point $\mathbf{r}$ |
|:--|:--|:--|
| Uniform translation at 0.2 m/s along $x$ | $V=[0,0,0;\;0.2,0,0]^T$ | $[0.2,0,0]^T$ everywhere. |
| Rotation at 2 rad/s about $z$ through the origin | $V=[0,0,2;\;0,0,0]^T$ | $[-2r\_y,\;2r\_x,\;0]^T$. |
| Rotation at 2 rad/s about $z$ through $\mathbf{p}=[0.5,0,0]^T$ | $V=[0,0,2;\;0,-1,0]^T$ | Zero on the axis; nonzero away from it. |

The last row is particularly useful: a nonzero $\mathbf{v}$ can accompany pure rotation about an offset axis. Its presence does not, by itself, mean that the body slides along the axis.

Adding two twists adds their velocity fields. Scaling a twist scales its velocity field. This is the six-dimensional vector-space structure we wanted.

### 5.4.3 A force also needs its geometry {#a-force-also-needs-its-geometry}

Push a door at its hinge, then apply the same force at its handle. The three force components may be identical, while the turning effect differs. About an origin $O$, a force $\mathbf{f}$ applied at $\mathbf{r}$ contributes

$$
\mathbf{m}\_O=\mathbf{r}\times\mathbf{f}.
$$

For $\mathbf{r}=[0.8\;0\;0]^T$ m and $\mathbf{f}=[0\;10\;0]^T$ N, the moment is $[0\;0\;8]^T$ N·m.

There is a second surprise: two equal and opposite forces applied at different points can have **zero resultant force and a nonzero resultant moment**. This is a pure couple.

<div class="st-lab" id="st-forces" data-st-lab="forces">
<p><strong>Try it — cancel the forces, keep the turn.</strong> Switch from one force to two opposite forces. Change their separation. Does a zero resultant force erase the moment?</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #779dae" aria-hidden="true"></span></span><div><strong>Translucent blue-gray block</strong><span>The body receiving the forces; its transparency helps you see their application points.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #913f84" aria-hidden="true"></span></span><div><strong>Purple force arrows</strong><span>Applied forces at x = +a and, in couple mode, x = −a. Length scale: 0.08 m of drawing per newton.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Teal moment arrow</strong><span>The resultant moment m about O, directed by the right-hand rule. Length scale: 0.12 m of drawing per N·m.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>O (letter O)</var></dt><dd>The fixed origin about which moments are computed; this is the origin of the colored frame.</dd>
<dt><var>a</var></dt><dd>Half the separation of the force application points, in metres.</dd>
<dt><var>f</var></dt><dd>The resultant force, found by adding all applied forces, in newtons.</dd>
<dt><var>m</var></dt><dd>The resultant moment about O, in N·m. Moving a force away from O changes its moment.</dd>
<dt><var>W = [f; m]</var></dt><dd>The force-first wrench. The first three entries are force components; the last three are moment components.</dd>
<dt><var>×</var></dt><dd>The cross product: a force at position r contributes the moment r × f.</dd>
<dt><var>N, N·m</var></dt><dd>Newtons measure force; newton-metres measure moment.</dd>
</dl>
<p class="st-key-note">In couple mode the purple forces cancel as forces, while their moments add. The surviving teal arrow explains why zero resultant force need not mean zero wrench.</p>
</details>
</div>
<p class="st-fallback">For forces [0,5,0] N and [0,−5,0] N at x = ±0.4 m, their resultant force is zero and their resultant moment is [0,0,4] N·m.</p>
</div>

Force vectors **do** form $\mathbb{R}^3$. The difficulty is that a force vector alone does not fully describe the action of a force system on a rigid body. Moreover, the set of wrenches representable by one applied force, with no free couple, is not closed under addition: the pair of forces above sums to a pure couple.

We keep the complete information in a wrench, reduced at one common origin:

$$
\boxed{
W=\begin{bmatrix}
\mathbf{f} \\ <br>
\mathbf{m}
\end{bmatrix},\qquad
\mathbf{f}=\sum\_k\mathbf{f}\_k,\quad
\mathbf{m}=\sum\_k\mathbf{r}\_k\times\mathbf{f}\_k+\mathbf{m}\_{\mathrm{couple}}.}
$$

With a fixed coordinate frame and moment origin, arbitrary wrenches form a six-dimensional vector space. Moments alone also form $\mathbb{R}^3$. Pairing the components preserves the complete mechanical effect.

<div class="st-quiz" id="quiz-forces" data-answer="2">
<fieldset>
<legend>Checkpoint — Two equal and opposite forces at different points have zero resultant force. What can remain?</legend>
<label><input type="radio" name="quiz-forces" value="0" data-explanation="Their moments can add to a nonzero pure couple.">No mechanical effect of any kind.</label>
<label><input type="radio" name="quiz-forces" value="1" data-explanation="Force vectors remain vectors; the complete force system also needs its moment.">A force that has stopped being a vector.</label>
<label><input type="radio" name="quiz-forces" value="2" data-explanation="This is why a force vector alone cannot represent every force system on a rigid body.">A nonzero moment, so the resultant wrench is not zero.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Switch the force lab to the couple and increase the separation.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.4.4 From angular velocity to an axis and pitch {#from-angular-velocity-to-an-axis-and-pitch}

Return to motion. Suppose a body rotates about an axis through $\mathbf{p}$ with direction $\mathbf{e}$, and also slides along that axis. Let $\dot\phi$ be its signed angular rate and let $h\dot\phi$ be its axial speed:

$$
\boldsymbol{\omega}=\dot\phi\,\mathbf{e},\qquad
\dot{\mathbf{r}}
=\dot\phi\,\mathbf{e}\times(\mathbf{r}-\mathbf{p})
+h\dot\phi\,\mathbf{e}.
$$

Expand the first term and compare with the twist velocity field:

$$
\mathbf{v}
=\dot\phi\left(\mathbf{p}\times\mathbf{e}+h\mathbf{e}\right).
$$

Therefore,

$$
\boxed{
V=\dot\phi X,\qquad
X=\begin{bmatrix}
\mathbf{e} \\ <br>
\mathbf{p}\times\mathbf{e}+h\mathbf{e}
\end{bmatrix}.}
$$

Each part has a job. The direction $\mathbf{e}$ says how we turn. The term $\mathbf{p}\times\mathbf{e}$ records where the axis lies. The term $h\mathbf{e}$ adds the slide along it. The magnitude $\dot\phi$ says how fast we execute that motion.

What does the **pitch** mean? It is axial translation per radian of rotation:

$$
h=\frac{\text{signed axial speed}}{\text{signed angular rate}},
\qquad \text{axial slide}=h\phi.
$$

It has units m/rad for a motion screw. A mechanical thread's advance per full turn is often called its **lead**: lead $=2\pi h$. For $h=0.01$ m/rad, one full turn advances about 62.8 mm.

Can we recover pitch without already knowing the axis? Dot $\mathbf{v}$ with $\boldsymbol{\omega}$. The offset contribution is perpendicular to $\boldsymbol{\omega}$, so

$$
\boxed{
h=\frac{\boldsymbol{\omega}\cdot\mathbf{v}}
{\boldsymbol{\omega}\cdot\boldsymbol{\omega}},
\qquad \boldsymbol{\omega}\ne\mathbf{0}.}
$$

We can also recover the closest point on the axis to the origin:

$$
\boxed{
\mathbf{p}\_\perp
=\frac{\boldsymbol{\omega}\times\mathbf{v}}
{\lVert \boldsymbol{\omega}\rVert ^2}.}
$$

To see why, write $\mathbf{v}=\mathbf{p}\times\boldsymbol{\omega}+h\boldsymbol{\omega}$. Then

$$
\boldsymbol{\omega}\times\mathbf{v}
=\lVert \boldsymbol{\omega}\rVert ^2\mathbf{p}
-(\boldsymbol{\omega}\cdot\mathbf{p})\boldsymbol{\omega}.
$$

Dividing removes the component of $\mathbf{p}$ along the axis. Every $\mathbf{p}\_\perp+\lambda\mathbf{e}$ describes the same line.

<div class="st-lab" id="st-screw" data-st-lab="screw">
<p><strong>Try it — discover pitch.</strong> Set h to zero, then positive, then negative. Move the axis sideways and distinguish the frame origin's velocity from v. Change the rate to reverse the velocity. Finally choose pure translation.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #1697a0" aria-hidden="true"></span></span><div><strong>Solid teal cup</strong><span>The rigid object at its current pose; its surface color does not encode a velocity or force.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d57a21" aria-hidden="true"></span></span><div><strong>Orange dot painted on the cup</strong><span>A material point fixed to the cup, useful for noticing its orientation. The dot is not a velocity arrow.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #1697a0" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #d57a21" aria-hidden="true"></span></span><div><strong>Faint cup and faint painted dot</strong><span>The reference pose before the selected motion. Transparency distinguishes the starting object from the current one.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Teal vertical line</strong><span>The screw axis through p for rotation or helical motion. In pure translation it is only a direction guide: a translation has no unique finite axis line.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange arrow at the moving frame origin</strong><span>The velocity of that particular point, scaled by 0.4 s. This arrow is separate from the painted orange dot.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #9fadb5" aria-hidden="true"></span></span><div><strong>Gray trail</strong><span>The path of the cup-frame origin from the reference pose to the selected pose.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>F₀, Fᵢ</var></dt><dd>The fixed world frame and the moving cup frame.</dd>
<dt><var>e, p, pₓ</var></dt><dd>e = [0, 0, 1] is the axis direction. p is a chosen point on the axis; pₓ controls its x offset in metres.</dd>
<dt><var>h</var></dt><dd>Pitch: axial translation per radian of rotation, in m/rad. Pure rotation has h = 0.</dd>
<dt><var>φ (phi)</var></dt><dd>The motion amount: an angle for rotation/helical motion, or a distance for pure translation. Degree input is converted to radians.</dd>
<dt><var>φ̇ (phi dot)</var></dt><dd>The chosen motion rate: rad/s for rotation/helical motion and m/s for translation. It changes the velocity arrow without changing the selected pose.</dd>
<dt><var>X = [ξ; η]</var></dt><dd>The screw coordinates: ξ (xi) is the upper block and η (eta) the lower block. For rotation/helical motion ξ = e and η = p × e + he; for translation ξ = 0 and η = e.</dd>
<dt><var>V = [ω; v] = Xφ̇</var></dt><dd>The angular-first twist. ω (omega) is angular velocity; v is the linear intercept of the spatial velocity field.</dd>
<dt><var>r, ṙ = ω × r + v</var></dt><dd>The current cup-frame origin and its point velocity. The arrow depicts ṙ, rather than v alone.</dd>
<dt><var>hφ, 2πh</var></dt><dd>The axial slide at the selected angle, and the lead (axial travel for one full turn). π is the circle constant.</dd>
<dt><var>×, [ ; ]</var></dt><dd>× denotes a cross product. The semicolon separates the upper angular block from the lower linear block.</dd>
</dl>
<p class="st-key-note">A negative rate reverses the velocity arrow. A negative pitch reverses the axial slide relative to the rotation. In translation mode, the pitch control is disabled.</p>
</details>
</div>
<p class="st-fallback">For e = [0,0,1], p = [0.1,0,0] m and h = 0.12 m/rad, X = [0,0,1; 0,−0.1,0.12]. At φ = π, the axial slide is 0.12π m.</p>
</div>

Pure rotation has $h=0$. Pure translation has $\boldsymbol{\omega}=\mathbf{0}$ and is written directly as $X=[\mathbf{0}^T\;\mathbf{e}^T]^T$, with $\phi$ now a distance. It is conventionally an infinite-pitch limiting case, but we do not divide by zero or assign it a unique finite axis line. The zero twist describes rest and also has no unique axis.

<div class="st-quiz" id="quiz-pitch" data-answer="1">
<fieldset>
<legend>Checkpoint — For a motion screw with h = 0.1 m/rad, what is the axial slide after one full turn?</legend>
<label><input type="radio" name="quiz-pitch" value="0" data-explanation="A full turn is 2π radians, so the slide is h·2π.">0.1 m.</label>
<label><input type="radio" name="quiz-pitch" value="1" data-explanation="Pitch is advance per radian; the lead per revolution is 2πh.">Approximately 0.628 m.</label>
<label><input type="radio" name="quiz-pitch" value="2" data-explanation="A helical screw combines rotation with axial translation.">Zero, because rotation cannot produce axial motion.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Use axial slide = hφ and set φ = 2π.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.4.5 Wrenches have an axis-and-pitch description too {#wrenches-have-an-axis-and-pitch-description-too}

For a nonzero resultant force, separate its moment into a perpendicular part and a part along the force. Let $\mathbf{e}=\mathbf{f}/\lVert \mathbf{f}\rVert $ and $f\_0=\lVert \mathbf{f}\rVert $. Then

$$
W=f\_0\begin{bmatrix}
\mathbf{e} \\ <br>
\mathbf{p}\times\mathbf{e}+h\mathbf{e}
\end{bmatrix},
\qquad
h=\frac{\mathbf{f}\cdot\mathbf{m}}{\lVert \mathbf{f}\rVert ^2},\qquad
\mathbf{p}\_\perp=\frac{\mathbf{f}\times\mathbf{m}}{\lVert \mathbf{f}\rVert ^2}.
$$

Here the pitch has units of length. Its axial term represents a couple parallel to the force. For example, $\mathbf{f}=[0,0,10]^T$ N and $\mathbf{m}=[0,-2,1]^T$ N·m give $\mathbf{p}\_\perp=[0.2,0,0]^T$ m and $h=0.1$ m. This force system is a 10 N force along an offset $z$ axis together with a 1 N·m axial couple.

When $\mathbf{f}=\mathbf{0}$ but $\mathbf{m}\ne\mathbf{0}$, the wrench is a pure couple, another infinite-pitch limiting case. Twists and wrenches share the same screw-coordinate geometry while representing different physical entities.

### 5.4.6 Plücker coordinates: locate a line without picking a special point {#plcker-coordinates-locate-a-line-without-picking-a-special-point}

A line needs a direction and a location. A point $\mathbf{p}$ plus a direction $\mathbf{e}$ works, but there is redundancy: moving $\mathbf{p}$ along the line does not change the line.

The **Plücker line coordinates** package

$$
\begin{bmatrix}
\mathbf{e} \\ <br>
\mathbf{p}\times\mathbf{e}
\end{bmatrix}.
$$

Why use the cross product? Replace $\mathbf{p}$ by another point $\mathbf{p}+\lambda\mathbf{e}$ on the line:

$$
(\mathbf{p}+\lambda\mathbf{e})\times\mathbf{e}
=\mathbf{p}\times\mathbf{e}.
$$

The location component is independent of that choice. It also satisfies the Plücker relation

$$
\mathbf{e}\cdot(\mathbf{p}\times\mathbf{e})=0.
$$

General Plücker line coordinates are homogeneous: a common nonzero scale factor describes the same unoriented line. Choosing a unit $\mathbf{e}$ fixes the scale; choosing its sign specifies the direction. The six coordinates obey a constraint and a scale equivalence, so a spatial line has four independent geometric parameters.

Now compare the line coordinates with a screw:

$$
X=\begin{bmatrix}
\mathbf{e} \\ <br>
\mathbf{p}\times\mathbf{e}+h\mathbf{e}
\end{bmatrix}.
$$

We need **pitch as well as line geometry**. Then we can attach a magnitude to obtain a twist or a wrench. A finite nonzero-pitch screw is not literally a zero-pitch Plücker line pair, because its components satisfy $\boldsymbol{\xi}\cdot\boldsymbol{\eta}=h$ when $\lVert \boldsymbol{\xi}\rVert =1$. For a general nonnormalized screw with nonzero upper component, $h=(\boldsymbol{\xi}\cdot\boldsymbol{\eta})/\lVert \boldsymbol{\xi}\rVert ^2$.

<figure class="st-figure">
<img src="{{ '/docs/chap5_adv_kin/assets/screw_family.svg' | relative_url }}" alt="Plücker coordinates give a line; adding pitch gives a normalized screw; adding an angular rate gives a twist and adding a force magnitude gives a wrench.">
<figcaption>Line geometry + pitch + magnitude. A twist and a wrench have the same geometric pattern, with different units and meanings.</figcaption>
</figure>

<div class="st-lab" id="st-plucker" data-st-lab="plucker">
<p><strong>Try it — many points, one line.</strong> Slide the chosen point using λ. Watch p change while p × e stays fixed. Then add pitch and observe e·η.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Teal line and short arrow</strong><span>The directed axis line and its unit direction e; the short arrow is drawn at half length.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange point and position arrow</strong><span>The selected point p on the line, and the position vector from O to p.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #913f84" aria-hidden="true"></span></span><div><strong>Purple point</strong><span>p⊥, the point on the line closest to O. It stays fixed as λ selects a different point on the same line.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>O (letter O)</var></dt><dd>The coordinate origin, shown by the labeled frame.</dd>
<dt><var>e</var></dt><dd>The unit line direction; the tilt slider changes its angle from z in the xz plane.</dd>
<dt><var>p, p⊥</var></dt><dd>A selected point on the line and the closest point to O. The symbol ⊥ means perpendicular: p⊥ · e = 0.</dd>
<dt><var>λ (lambda)</var></dt><dd>The signed distance along the axis from p⊥: p = p⊥ + λe.</dd>
<dt><var>p × e</var></dt><dd>The line moment in Plücker coordinates. It encodes line location and is a geometric quantity, not a mechanical torque.</dd>
<dt><var>[e; p × e]</var></dt><dd>The normalized, directed Plücker line pair: direction first, line moment second.</dd>
<dt><var>h, η (eta) = p × e + he</var></dt><dd>Pitch and the lower screw block. The displayed h is in m/rad; adding he gives a finite-pitch screw.</dd>
<dt><var>X = [e; η]</var></dt><dd>The normalized screw, which includes both line geometry and pitch.</dd>
<dt><var>·, ×, e · η = h</var></dt><dd>Dot product, cross product, and the pitch relation for a unit e. e · (p × e) is zero.</dd>
</dl>
<p class="st-key-note">When λ = 0, the selected orange point coincides with the purple closest point. Changing h alters the screw coordinates without changing the axis line.</p>
</details>
</div>
<p class="st-fallback">Moving p along e leaves p × e unchanged. Adding h e to the lower component makes e·η = h for a unit direction.</p>
</div>

<div class="st-quiz" id="quiz-plucker" data-answer="0">
<fieldset>
<legend>Checkpoint — If p moves to p + λe on the same line, what happens to p × e?</legend>
<label><input type="radio" name="quiz-plucker" value="0" data-explanation="The added term is λ(e × e) = 0, so the line coordinates do not depend on the chosen point along the axis.">It stays unchanged.</label>
<label><input type="radio" name="quiz-plucker" value="1" data-explanation="That would be a pitch contribution, not the effect of moving the chosen point along the line.">It increases by λe.</label>
<label><input type="radio" name="quiz-plucker" value="2" data-explanation="An offset line still has a nonzero line-location component.">It becomes zero for every line.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Expand (p + λe) × e.</p>
<p class="st-feedback" role="status"></p>
</div>

We have answered the velocity question: a rigid body's instantaneous motion is a screw with a rate. But our robot also needs to know where the body goes. That takes us back to exponentials.

## 5.5 Screws and exponentials: from a velocity field to a pose {#screws-and-exponentials-from-a-velocity-field-to-a-pose}

### 5.5.1 Put rotation and translation into one transformation {#put-rotation-and-translation-into-one-transformation}

Use homogeneous coordinates to carry a rotation and a translation together:

$$
\mathbf{H}=
\begin{bmatrix}
\mathbf{R}&\mathbf{t} \\ <br>
\mathbf{0}^T&1
\end{bmatrix},\qquad
\begin{bmatrix}
{}^0\mathbf{r} \\ <br>
1
\end{bmatrix}
=\mathbf{H}\begin{bmatrix}
{}^i\mathbf{r} \\ <br>
1
\end{bmatrix}.
$$

The set of valid rigid transformations is $SE(3)$. It is not a vector space: adding two valid homogeneous transformations does not preserve their defining constraints. Its infinitesimal motion generators do form a vector space, denoted $\mathfrak{se}(3)$.

For $X=[\boldsymbol{\xi}^T\;\boldsymbol{\eta}^T]^T$, the chapter's **hat** operation gives

$$
\widehat X=
\begin{bmatrix}
\widetilde{\boldsymbol{\xi}}&\boldsymbol{\eta} \\ <br>
\mathbf{0}^T&0
\end{bmatrix}.
$$

The bottom-right entry is **zero**, because this is a generator, not a pose.

For a constant spatial screw per unit parameter,

$$
\frac{d\mathbf{H}}{d\phi}=\widehat X\mathbf{H},\qquad
\mathbf{H}(0)=\mathbf{A}.
$$

Thus, by the same series argument as before,

$$
\boxed{\mathbf{H}(\phi)=e^{\widehat X\phi}\mathbf{A}.}
$$

The exponential is a **displacement operator**. Multiplying the initial pose $\mathbf{A}$ turns it into the new pose. If $\phi=\phi(t)$, then $V=X\dot\phi$ and $\dot{\mathbf{H}}=\widehat V\mathbf{H}$.

### 5.5.2 Derive its rotation and translation blocks {#derive-its-rotation-and-translation-blocks}

Let

$$
e^{\widehat X\phi}=
\begin{bmatrix}
\mathbf{R}(\phi)&\mathbf{t}(\phi) \\ <br>
\mathbf{0}^T&1
\end{bmatrix},
\qquad \boldsymbol{\Omega}=\widetilde{\boldsymbol{\xi}}.
$$

The block differential equations are

$$
\frac{d\mathbf{R}}{d\phi}=\boldsymbol{\Omega}\mathbf{R},\qquad
\frac{d\mathbf{t}}{d\phi}=\boldsymbol{\Omega}\mathbf{t}+\boldsymbol{\eta},
\qquad \mathbf{R}(0)=\mathbf{I}\_3,\quad\mathbf{t}(0)=\mathbf{0}.
$$

The first is our rotation equation. For the second, multiply by $e^{-\boldsymbol{\Omega}\phi}$:

$$
\frac{d}{d\phi}\left(e^{-\boldsymbol{\Omega}\phi}\mathbf{t}\right)
=e^{-\boldsymbol{\Omega}\phi}\boldsymbol{\eta}.
$$

Integrating and changing the integration variable gives

$$
\mathbf{t}(\phi)=\int\_0^\phi e^{\boldsymbol{\Omega}s}\boldsymbol{\eta}\,ds.
$$

For a revolute or helical screw normalized so that $\lVert \boldsymbol{\xi}\rVert =1$, insert Rodrigues' formula and integrate each coefficient:

$$
\boxed{
\mathbf{R}(\phi)=\mathbf{I}\_3+\sin\phi\,\boldsymbol{\Omega}
+(1-\cos\phi)\boldsymbol{\Omega}^2,}
$$

$$
\boxed{
\mathbf{t}(\phi)=
\left[\phi\mathbf{I}\_3+(1-\cos\phi)\boldsymbol{\Omega}
+(\phi-\sin\phi)\boldsymbol{\Omega}^2\right]\boldsymbol{\eta}.}
$$

Nothing has been guessed: the rotation follows from its generator, and the translation is the accumulated linear part carried by that rotation.

### 5.5.3 Read the formula as geometry {#read-the-formula-as-geometry}

Substitute $\boldsymbol{\xi}=\mathbf{e}$ and $\boldsymbol{\eta}=\mathbf{p}\times\mathbf{e}+h\mathbf{e}$. Since $\mathbf{R}(\phi)\mathbf{e}=\mathbf{e}$,

$$
\mathbf{t}(\phi)=(\mathbf{I}\_3-\mathbf{R}(\phi))\mathbf{p}+h\phi\mathbf{e}.
$$

Applied to a point $\mathbf{r}(0)$, the displacement becomes

$$
\boxed{
\mathbf{r}(\phi)
=\mathbf{p}+\mathbf{R}(\phi)\big(\mathbf{r}(0)-\mathbf{p}\big)
+h\phi\mathbf{e}.}
$$

Read it aloud: move the point relative to the axis, rotate that relative vector, restore the axis location, then slide along the axis. This is exactly the turn-and-slide motion we imagined with the cup.

For a prismatic screw, $\boldsymbol{\xi}=\mathbf{0}$ and $\boldsymbol{\eta}=\mathbf{e}$. The powers of the hat matrix simplify, giving

$$
e^{\widehat X\phi}=
\begin{bmatrix}
\mathbf{I}\_3&\phi\mathbf{e} \\ <br>
\mathbf{0}^T&1
\end{bmatrix}.
$$

We now have exponentials for **general screw motion**, including rotation and translation. Return to the [screw laboratory](#st-screw): the moving cup uses precisely this formula. Choose an offset axis with zero pitch and observe that the transformation still has a translation column.

<div class="st-quiz" id="quiz-exponential" data-answer="2">
<fieldset>
<legend>Checkpoint — For a constant spatial screw X and initial pose A, which expression gives the new pose?</legend>
<label><input type="radio" name="quiz-exponential" value="0" data-explanation="A six-dimensional generator cannot be added to a pose to produce a rigid transformation.">H = X + φA.</label>
<label><input type="radio" name="quiz-exponential" value="1" data-explanation="That gives a displacement from the identity. A general starting pose still requires A.">H = exp(X̂φ), regardless of the initial pose.</label>
<label><input type="radio" name="quiz-exponential" value="2" data-explanation="The exponential accumulates the screw motion, and its left action carries the initial pose.">H = exp(X̂φ)A.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Check that the formula returns A when φ = 0.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.5.4 Spatial and body descriptions: two sides of the same motion {#spatial-and-body-descriptions-two-sides-of-the-same-motion}

For the current pose $\mathbf{H}\_i$, define

$$
\widehat{ {}^{0}V\_i}=\dot{\mathbf{H}}\_i\mathbf{H}\_i^{-1},
\qquad
\widehat{ {}^{i}V\_i}=\mathbf{H}\_i^{-1}\dot{\mathbf{H}}\_i.
$$

Consequently,

$$
\dot{\mathbf{H}}\_i=\widehat{ {}^{0}V\_i}\mathbf{H}\_i
=\mathbf{H}\_i\widehat{ {}^{i}V\_i}.
$$

Spatial generators act from the **left**; body generators act from the **right**. For a constant body screw $\,{}^{i}X\_i$, a single joint motion can be written $\mathbf{H}\_i(q\_i)=\mathbf{A}\_i e^{\widehat{ {}^{i}X\_i}q\_i}$ when the parent is fixed. We will derive the map connecting these descriptions shortly.

For a time-varying screw, simply exponentiating the integral of the generator is generally insufficient because different generators need not commute. Our joint exponentials use constant joint screws, which is precisely the setting in which these formulas apply.

## 5.6 Applications of PoE: assemble a robot one motion at a time {#applications-of-poe-assemble-a-robot-one-motion-at-a-time}

### 5.6.1 First, one joint and its home pose {#first-one-joint-and-its-home-pose}

Place a serial robot at a reference configuration $\mathbf{q}=\mathbf{0}$. Record each joint's axis in $\mathcal{F}\_0$ and the reference pose $\mathbf{A}\_n$ of the last body. For a revolute joint,

$$
Y\_i=\begin{bmatrix}
\mathbf{e}\_i \\ <br>
\mathbf{p}\_i\times\mathbf{e}\_i
\end{bmatrix}.
$$

For a prismatic joint, use $Y\_i=[\mathbf{0}^T\;\mathbf{e}\_i^T]^T$. These are constant **home screws**, not axes that are recomputed in the base frame at every configuration.

If only joint 1 moves, it carries the entire downstream robot:

$$
\mathbf{H}\_n(q\_1,0,\ldots,0)
=e^{\widehat Y\_1q\_1}\mathbf{A}\_n.
$$

The initial pose is essential. An axis and a joint angle alone do not tell us where the tool started.

### 5.6.2 Add joint 2 {#add-joint-2}

With joint 1 at zero, joint 2 generates $e^{\widehat Y\_2q\_2}\mathbf{A}\_n$. Now moving joint 1 carries both this downstream motion and its axis. Its displacement acts on the left:

$$
\mathbf{H}\_n(q\_1,q\_2,0,\ldots,0)
=e^{\widehat Y\_1q\_1}e^{\widehat Y\_2q\_2}\mathbf{A}\_n.
$$

The matrix expression acts on coordinates from right to left; the written factor order records the base-to-tip joint order. This is a composition of geometry, not a requirement that a controller move the joints one after another in time.

### 5.6.3 Keep going {#keep-going}

Each additional joint contributes another constant home screw exponential:

$$
\boxed{
\mathbf{H}\_n(\mathbf{q})=
e^{\widehat Y\_1q\_1}
e^{\widehat Y\_2q\_2}\cdots
e^{\widehat Y\_nq\_n}\mathbf{A}\_n.}
$$

For any intermediate body $i$,

$$
\mathbf{H}\_i(\mathbf{q})=
e^{\widehat Y\_1q\_1}\cdots e^{\widehat Y\_iq\_i}\mathbf{A}\_i.
$$

This is the **Product of Exponentials**, or PoE. The robot's geometry is encoded by its home screws and reference poses. Changing a joint coordinate changes the amount of motion produced by one generator; upstream motions carry the downstream generators.

For a simple two-joint planar example, let both axes point along $z$, put joint 1 at the origin and joint 2 at $\mathbf{p}\_2=[a,0,0]^T$, and place the tool at $[a+b,0,0]^T$ in the home configuration. Then

$$
Y\_1=[0,0,1;\;0,0,0]^T,\qquad
Y\_2=[0,0,1;\;0,-a,0]^T,
$$

$$
\mathbf{H}\_2=e^{\widehat Y\_1q\_1}e^{\widehat Y\_2q\_2}
\begin{bmatrix}
\mathbf{I}\_3&[a+b,0,0]^T \\ <br>
\mathbf{0}^T&1
\end{bmatrix}.
$$

Apply joint 2 first in this expression. Its rotation is about $x=a$, so the tool position becomes $[a+b\cos q\_2,\;b\sin q\_2,\;0]^T$. Joint 1 then rotates this whole result about the origin:

$$
\mathbf{t}\_2=
\begin{bmatrix}
a\cos q\_1+b\cos(q\_1+q\_2) \\ <br>
a\sin q\_1+b\sin(q\_1+q\_2) \\ <br>
0
\end{bmatrix}.
$$

The familiar planar formula has emerged from two screw motions.

<div class="st-quiz" id="quiz-poe" data-answer="1">
<fieldset>
<legend>Checkpoint — Why does the spatial PoE formula keep separate, ordered joint exponentials?</legend>
<label><input type="radio" name="quiz-poe" value="0" data-explanation="Generators about different axes generally do not commute.">All joint generators commute.</label>
<label><input type="radio" name="quiz-poe" value="1" data-explanation="The ordered product describes that carrying; combining the generators in one ordinary sum would generally change the motion.">Each joint generates a motion, and upstream motions carry downstream geometry.</label>
<label><input type="radio" name="quiz-poe" value="2" data-explanation="The factor order is a geometric composition, not a required timing schedule.">The robot must physically finish joint 1 before moving joint 2.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Compare rotating a book about two different axes in opposite orders.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.6.4 Read a URDF as a chain of local poses {#read-a-urdf-as-a-chain-of-local-poses}

A URDF tells software which links are connected and how the joint frames are placed. Its joint <code>origin</code> gives a fixed local pose, and its <code>axis</code> is expressed in the joint frame. Visual mesh origins locate CAD geometry separately from the joint geometry. The [ROS URDF data structures](https://github.com/ros/urdfdom_headers/blob/master/include/urdf_model/joint.h) explicitly distinguish the axis and the parent-to-joint origin transform.

Let the fixed parent-to-child home transform of joint $i$ be

$$
\mathbf{B}\_i={} ^{i-1}\mathbf{H}\_i(\mathbf{0}).
$$

The local edge is naturally a fixed pose followed by a joint exponential:

$$
{}^{i-1}\mathbf{H}\_i(q\_i)
=\mathbf{B}\_i e^{\widehat{ {}^{i}X\_i}q\_i},
\qquad
{}^{i}X\_i=
\begin{bmatrix}
\mathbf{a}\_i \\ <br>
\mathbf{0}
\end{bmatrix}
\quad\text{for a local revolute axis }\mathbf{a}\_i.
$$

For a prismatic edge, use $\,{}^{i}X\_i=[\mathbf{0}^T\;\mathbf{a}\_i^T]^T$. Here $\mathbf{a}\_i$ is the URDF's unit local axis; it need not point along the base frame's $z$ direction.

Multiplying the fixed origins at zero gives $\mathbf{A}\_i=\mathbf{B}\_1\cdots\mathbf{B}\_i$. Its rotation and translation place that joint axis in the base frame:

$$
\mathbf{e}\_i=\mathbf{R}(\mathbf{A}\_i)\mathbf{a}\_i,\qquad
\mathbf{p}\_i=\mathbf{t}(\mathbf{A}\_i),\qquad
Y\_i=\begin{bmatrix}
\mathbf{e}\_i \\ <br>
\mathbf{p}\_i\times\mathbf{e}\_i
\end{bmatrix}.
$$

Why does this agree with spatial PoE? Conjugation moves a local generator into the home base frame:

$$
\mathbf{A}\_i e^{\widehat{ {}^{i}X\_i}q\_i}\mathbf{A}\_i^{-1}
=e^{\widehat Y\_iq\_i}.
$$

For two joints, substitute these expressions:

$$
e^{\widehat Y\_1q\_1}e^{\widehat Y\_2q\_2}\mathbf{A}\_2
=\mathbf{B}\_1e^{\widehat{ {}^{1}X\_1}q\_1}
\mathbf{B}\_2e^{\widehat{ {}^{2}X\_2}q\_2}.
$$

The intermediate home transforms cancel. The same cancellation works for the whole chain. **URDF local edges and spatial PoE describe the same mechanism.**

<div class="st-quiz" id="quiz-urdf" data-answer="0">
<fieldset>
<legend>Checkpoint — When extracting a home screw from a URDF, where is the joint axis initially expressed?</legend>
<label><input type="radio" name="quiz-urdf" value="0" data-explanation="Use the joint origins and axis for kinematics. Visual origins only position the meshes.">In the joint frame; accumulated home transforms place it in the base frame.</label>
<label><input type="radio" name="quiz-urdf" value="1" data-explanation="The URDF axis belongs to the local joint frame and may need rotation into the base frame.">Always in the base frame, regardless of the joint origin.</label>
<label><input type="radio" name="quiz-urdf" value="2" data-explanation="Visual origins locate CAD geometry independently of the joint origins and axes.">In the visual mesh frame, so changing a visual origin changes the screw.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Separate the joint element from the visual element in the supplied URDF.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.6.5 A real example: FANUC CRX-10iA/L {#a-real-example-fanuc-crx-10ial}

Use the model supplied with ENG_654, whose URDF is named <code>crx10ial.urdf</code>. We take $\mathcal{F}\_0$ at <code>base_link</code> and $\mathcal{F}\_6$ at <code>link_6</code>, which coincides with the supplied flange. The URDF also contains a fixed <code>base</code> frame and a fixed <code>tool0</code> frame; those are distinct frame choices. A tool0 pose requires the additional fixed flange-to-tool0 transform.

Read the home joint axes and accumulate the joint origins. Distances below are metres:

| Joint $i$ | $\mathbf{p}\_i$ in $\mathcal{F}\_0$ at home | $\mathbf{e}\_i$ in $\mathcal{F}\_0$ at home |
|:--|:--|:--|
| 1 | $[0,0,0.245]^T$ | $[0,0,1]^T$ |
| 2 | $[0,0,0.245]^T$ | $[0,1,0]^T$ |
| 3 | $[0,0,0.955]^T$ | $[0,-1,0]^T$ |
| 4 | $[0,0,0.955]^T$ | $[-1,0,0]^T$ |
| 5 | $[0.540,-0.150,0.955]^T$ | $[0,-1,0]^T$ |
| 6 | $[0.700,-0.150,0.955]^T$ | $[-1,0,0]^T$ |

For example, joint 5 has

$$
\mathbf{p}\_5\times\mathbf{e}\_5
=[0.955,\;0,\;-0.540]^T,
\qquad Y\_5=[0,-1,0;\;0.955,0,-0.540]^T.
$$

Stacking all six **home** screws gives

$$
\begin{bmatrix}
Y\_1&Y\_2&Y\_3&Y\_4&Y\_5&Y\_6
\end{bmatrix}
=
\begin{bmatrix}
0&0&0&-1&0&-1 \\ <br>
0&1&-1&0&-1&0 \\ <br>
1&0&0&0&0&0 \\ <br>
0&-0.245&0.955&0&0.955&0 \\ <br>
0&0&0&-0.955&0&-0.955 \\ <br>
0&0&0&0&-0.540&-0.150
\end{bmatrix}.
$$

At this home configuration the stacked home screws are also the space Jacobian; away from home, we must transport the columns. The reference flange pose is

$$
\mathbf{A}\_6=
\begin{bmatrix}
1&0&0&0.700 \\ <br>
0&1&0&-0.150 \\ <br>
0&0&1&0.955 \\ <br>
0&0&0&1
\end{bmatrix}.
$$

Insert these into the six-factor PoE formula. In the [FANUC laboratory](#st-fanuc) in the next section, open **Adjust the pose and PoE factors** to apply 0, 1, 2, … factors; factors not included use zero joint coordinates. Open **Pose and determinant checks** to compare the URDF local-edge chain with PoE.



**A guided investigation of PoE.** With only joint 1 nonzero, the entire arm turns about the base axis. With joint 1 and joint 2 nonzero, the shoulder axis has already been carried by joint 1. With all six included, the flange reaches the composed pose. The equality of the two pose calculations checks our axis signs, home pose, and frame convention.

The progression from 2D rotation through screw exponentials to URDF and PoE follows the teaching approach of ENG_654's <code>lectures_main/lectures/lecture_02.html</code>. This chapter retains the symbols of the existing RAS University lecture.

## 5.7 Applications of screws: the geometric Jacobian {#applications-of-screws-the-geometric-jacobian}

### 5.7.1 A Jacobian answers a local question {#a-jacobian-answers-a-local-question}

Forward kinematics asks: “Where is the tool for these joint coordinates?” A controller often needs a different answer: “If I change the joints a little, how will the tool move?”

Start with a familiar function,

$$
g(q\_1,q\_2)=q\_1^2+3q\_2.
$$

For small changes,

$$
\delta g\approx
\begin{bmatrix}
2q\_1&3
\end{bmatrix}
\begin{bmatrix}
\delta q\_1 \\ <br>
\delta q\_2
\end{bmatrix}.
$$

The coefficients collect the local sensitivities. For several output coordinates, stack their derivatives into a matrix: the **Jacobian**. It turns input rates into output rates and tells us which output directions are locally achievable.

The name honors Carl Gustav Jacob Jacobi, whose 1841 paper *De determinantibus functionalibus* developed functional determinants; see the [record of Jacobi's original paper](https://eudml.org/doc/147138). In robotics, the same local idea connects joint rates to a tool's instantaneous motion.

Orientation needs care: differentiating Euler-angle coordinates gives an **analytic** Jacobian tied to that angle chart. A **geometric** Jacobian describes angular and linear motion directly. Here we first use the spatial-twist version, matching the existing chapter.

### 5.7.2 A column is a question with only one joint moving {#a-column-is-a-question-with-only-one-joint-moving}

Freeze every joint except joint $i$. Give it unit rate. What twist does body $n$ acquire? That answer is the $i$th Jacobian column.

Allow all joints to move and add their instantaneous contributions:

$$
{}^0V\_n
=\sum\_{i=1}^n{}^0J\_{n,i}(\mathbf{q})\dot q\_i
=
\underbrace{\begin{bmatrix}
{}^0J\_{n,1}&{}^0J\_{n,2}&\cdots&{}^0J\_{n,n}
\end{bmatrix}}\_{ {}^0\mathbf{J}\_n(\mathbf{q})}
\dot{\mathbf{q}}.
$$

This is the intuition: **the Jacobian is the current joint screws placed side by side**. We still need to discover what “current” means.

### 5.7.3 Derive the columns from PoE {#derive-the-columns-from-poe}

Write $\mathbf{E}\_i=e^{\widehat Y\_iq\_i}$ and

$$
\mathbf{G}\_{i-1}=\mathbf{E}\_1\cdots\mathbf{E}\_{i-1},\qquad
\mathbf{G}\_0=\mathbf{I}\_4.
$$

The derivative of one factor is $\dot{\mathbf{E}}\_i=\widehat Y\_i\mathbf{E}\_i\dot q\_i$. Differentiate the full product, one factor at a time:

$$
\dot{\mathbf{H}}\_n
=\sum\_{i=1}^n
\mathbf{G}\_{i-1}\widehat Y\_i
\mathbf{E}\_i\cdots\mathbf{E}\_n\mathbf{A}\_n\,\dot q\_i.
$$

Multiply on the right by $\mathbf{H}\_n^{-1}$. All factors downstream of joint $i$ cancel:

$$
\widehat{ {}^0V\_n}
=\dot{\mathbf{H}}\_n\mathbf{H}\_n^{-1}
=\sum\_{i=1}^n
\mathbf{G}\_{i-1}\widehat Y\_i\mathbf{G}\_{i-1}^{-1}\dot q\_i.
$$

The conjugated generator is the home screw carried by the preceding joints. We call its coordinate map the **adjoint**:

$$
\widehat{\mathrm{Ad}\_{\mathbf{H}}X}
=\mathbf{H}\widehat X\mathbf{H}^{-1}.
$$

Consequently,

$$
\boxed{
{}^0J\_{n,i}(\mathbf{q})
=\mathrm{Ad}\_{\mathbf{G}\_{i-1}(\mathbf{q})}Y\_i,\qquad
{}^0V\_n={}^0\mathbf{J}\_n\dot{\mathbf{q}}.}
$$

Column 1 is $Y\_1$. Column 2 depends on $q\_1$. Column 3 depends on $q\_1,q\_2$. Upstream joints move an axis; its own joint angle does not change that joint's screw contribution in the spatial frame.

At home, every $\mathbf{G}\_{i-1}=\mathbf{I}\_4$, so the Jacobian is the stack of the home screws. Away from home, stacking those unchanged home screws would give the wrong Jacobian.

<div class="st-quiz" id="quiz-jacobian" data-answer="2">
<fieldset>
<legend>Checkpoint — What does one spatial Jacobian column represent?</legend>
<label><input type="radio" name="quiz-jacobian" value="0" data-explanation="Except for the first column, upstream joints can carry the axis to a new pose.">The fixed home screw, unchanged at every pose.</label>
<label><input type="radio" name="quiz-jacobian" value="1" data-explanation="A column describes instantaneous motion, not a finite pose.">The final pose produced by a joint.</label>
<label><input type="radio" name="quiz-jacobian" value="2" data-explanation="Adding the rate-scaled columns gives the total body twist; each column is a current joint screw.">The body twist produced by that joint at unit rate, with other joint rates zero.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Imagine locking every joint except the highlighted one.</p>
<p class="st-feedback" role="status"></p>
</div>

Enter the [FANUC laboratory](#st-fanuc) below. Choose joint 3 with **Inspect screw**, hold every other joint rate at zero conceptually, and read its column. The orange arrow is the corresponding velocity of the selected body's origin for $\dot q\_3=1$ rad/s. Change $q\_1$ or $q\_2$ and watch the axis move. Change $q\_3$ alone and compare the column in the fixed frame.

<div class="st-lab" id="st-fanuc" data-st-lab="fanuc">
<p><strong>Try it — build the FANUC Jacobian from its screws.</strong> Keep the worked pose fixed. Inspect a joint's colored axis, read its direction and position, form its linear component, and place the resulting six-component screw in the matching matrix column.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #147b8b" aria-hidden="true"></span></span><div><strong>Teal · joint 1</strong><span>Axis line, axis-point sphere, direction arrow, and matrix-column underline for joint 1. Its color identifies that joint, not a coordinate direction.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #b55b14" aria-hidden="true"></span></span><div><strong>Brown-orange · joint 2</strong><span>Axis line, axis-point sphere, direction arrow, and matrix-column underline for joint 2. Its color identifies that joint, not a coordinate direction.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #7951ad" aria-hidden="true"></span></span><div><strong>Violet · joint 3</strong><span>Axis line, axis-point sphere, direction arrow, and matrix-column underline for joint 3. Its color identifies that joint, not a coordinate direction.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #187a47" aria-hidden="true"></span></span><div><strong>Green · joint 4</strong><span>Axis line, axis-point sphere, direction arrow, and matrix-column underline for joint 4. Its color identifies that joint, not a coordinate direction.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #b83b73" aria-hidden="true"></span></span><div><strong>Magenta · joint 5</strong><span>Axis line, axis-point sphere, direction arrow, and matrix-column underline for joint 5. Its color identifies that joint, not a coordinate direction.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #315fbd" aria-hidden="true"></span></span><div><strong>Blue · joint 6</strong><span>Axis line, axis-point sphere, direction arrow, and matrix-column underline for joint 6. Its color identifies that joint, not a coordinate direction.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange sphere and velocity arrow</strong><span>The selected target-body origin and its velocity from the inspected joint alone at 1 rad/s. The arrow is scaled by 0.4 s; it keeps the same physical direction when only the expression frame changes.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #304d62" aria-hidden="true"></span></span><div><strong>Dark blue-gray position arrow</strong><span>From the chosen expression-frame origin to a point on the selected joint axis. It depicts p geometrically, not a velocity.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #9fadb5" aria-hidden="true"></span></span><div><strong>Gray connector</strong><span>From F₀ to the chosen expression-frame origin; its vector is t.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #edf5f8" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #f4f7f9" aria-hidden="true"></span></span><div><strong>Tinted column and pale empty cells</strong><span>A tinted column is selected for inspection. A gray cell containing — has not been built yet; — is not a zero. Bright axes identify the inspected joint; faint axes belong to other built columns.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #eeede8" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #868686" aria-hidden="true"></span></span><div><strong>Cream/white links and gray base/flange</strong><span>The supplied CAD appearance. Surface shading, opacity, and lighting reveal link geometry; these surface colors do not identify Jacobian columns.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>i, j, k</var></dt><dd>i selects the expression frame, j the target body, and k the inspected joint/column. Changing i changes coordinates; changing j changes the body whose motion is described.</dd>
<dt><var>F₀, Fᵢ, F₆</var></dt><dd>F₀ is base_link. Fᵢ is the chosen expression frame, attached to link i for i &gt; 0. F₆ is link_6/flange. The scene displays F₀ and the chosen frame.</dd>
<dt><var>q₁, …, q₆; q</var></dt><dd>Joint angles and their ordered vector. Sliders use degrees; the calculations use radians.</dd>
<dt><var>pₖ, eₖ</var></dt><dd>A point on the current axis and its unit direction, expressed in the selected frame. p is in metres; e has unit length.</dd>
<dt><var>ξ (xi), η (eta)</var></dt><dd>The upper/angular and lower/linear blocks of a screw column. For this revolute robot, ξ = e and η = p × e.</dd>
<dt><var>ξₓ, ξᵧ, ξ_z; ηₓ, ηᵧ, η_z</var></dt><dd>The x, y, z components of the angular block, then the x, y, z components of the linear block: the six Jacobian rows.</dd>
<dt><var>ᶦJⱼ; ⁰J₆, ³J₄, ⁴J₆</var></dt><dd>The Jacobian of body j expressed in frame i. For example, ³J₄ describes body 4 in frame 3 and has four columns; ⁴J₆ describes body 6 in frame 4 and has six.</dd>
<dt><var>ᶦJⱼ,ₖ</var></dt><dd>One column of that Jacobian: the target body’s twist when joint k alone has unit rate, 1 rad/s. The column number is the joint number.</dd>
<dt><var>[ξ; η], [ ; ], —</var></dt><dd>The angular block comes first, then the linear block. A semicolon separates those blocks. A dash in the matrix denotes an unbuilt slot, not a zero value.</dd>
<dt><var>Yₖ</var></dt><dd>The constant home screw for joint k, expressed in F₀ at zero joint angles. It is transported to obtain the current column.</dd>
<dt><var>Gₖ₋₁, G₀ = I</var></dt><dd>The product of upstream joint displacements before joint k. G₀ is the identity because joint 1 has no upstream joints. I means the identity matrix.</dd>
<dt><var>Hᵢ = [R, t; 0ᵀ, 1]</var></dt><dd>The pose of frame i in F₀. R is its orientation and t is its origin position. 0ᵀ is a row of three zeros; the final 1 is the homogeneous coordinate.</dd>
<dt><var>Rᵀ, Hᵢ⁻¹</var></dt><dd>The transpose of R, used to rotate base-frame coordinates into frame i, and the inverse pose, mapping from F₀ into Fᵢ.</dd>
<dt><var>Ad(Hᵢ⁻¹)</var></dt><dd>The adjoint that reexpresses each whole screw column in Fᵢ, accounting for orientation and origin position.</dd>
<dt><var>ξ⁰, ξⁱ; η⁰, ηⁱ</var></dt><dd>The angular/linear components before and after the frame change. Here the superscript states the expression frame; it is not a power.</dd>
<dt><var>Rᵀη⁰, −Rᵀ(t × ξ⁰)</var></dt><dd>The rotated old linear component and the correction for the new origin. Their sum is ηⁱ; ξⁱ = Rᵀξ⁰.</dd>
<dt><var>H₆, A₆</var></dt><dd>The current flange pose and its fixed home pose, both in F₀. A is a home pose, not an adjoint.</dd>
<dt><var>PoE, exp(Ŷₖqₖ)</var></dt><dd>Product of Exponentials. The hat on Y makes its 4 × 4 generator; exp gives the joint displacement. Factors are multiplied in joint order.</dd>
<dt><var>det(J), 6 × 6, 6 × 4</var></dt><dd>The determinant and matrix dimensions (rows × columns). Only a square matrix has a determinant; the four-column Jacobian does not.</dd>
<dt><var>ω (omega), v, r; ω × r + v</var></dt><dd>The target twist’s angular velocity, spatial linear intercept, and target-origin position. Their combination is the actual point velocity shown by the orange arrow.</dd>
<dt><var>rad/s, m/s, s</var></dt><dd>Angular rate, point speed, and seconds. Multiplying a velocity by the arrow’s 0.4 s scale makes its displayed length a distance.</dd>
<dt><var>CAD opacity; URDF chain versus PoE</var></dt><dd>CAD means computer-aided design; opacity changes surface visibility only. URDF means Unified Robot Description Format. The pose check compares its ordered local transforms with the exponential calculation.</dd>
</dl>
<p class="st-key-note">Matrix column values are per unit joint rate: ξ is angular contribution per radian of joint motion and η is linear contribution per radian. The orange arrow is velocity at the target origin, ω × r + v; it is not η alone. Joint-axis colors and coordinate-axis colors are separate conventions.</p>
</details>
</div>
<p class="st-fallback">For each revolute joint, the column is [e; p × e] in the chosen expression frame. Put these columns side by side. Reexpress all columns with the same adjoint when the expression frame changes.</p>
</div>

**Build it by hand, one click at a time.** Choose **Worked pose**, then **Start again**. The empty slots are waiting for screws; they do not represent zero columns. Choose **Add screw 1**. Its color links the physical joint axis, the construction card, and column 1. Continue with joint 2: its current axis already includes joint 1's motion. The card shows the current point and direction, their cross product, and the six-component column. **Animate assembly** fills all columns in sequence; click a column heading to inspect any screw again.

**Change the description, then check the geometry.** Once all columns are built, change **Express in** from the base frame to frame 3. The joint angles, robot, physical screw lines, and orange velocity arrow stay in place. The new frame's origin and axes appear, and each column acquires new coordinates. The comparison shows the same selected screw in both frames and separates the rotated linear part from the correction for the new origin.

Choose **Use selected joint frame**. The origin of that frame is on its own revolute axis, so the selected screw's linear component becomes zero, within numerical precision. This does not mean the flange stops moving: its velocity still depends on its distance from the axis. The orange arrow makes that distinction visible.

**Predict before switching:** will changing only the expression frame move the flange, or change only the numbers used to describe its motion? Keep that observation in mind as we derive the adjoint next.

### 5.7.4 Derive the adjoint instead of memorizing it {#derive-the-adjoint-instead-of-memorizing-it}

Let

$$
{}^a\mathbf{H}\_b=
\begin{bmatrix}
{}^a\mathbf{R}\_b&\mathbf{p} \\ <br>
\mathbf{0}^T&1
\end{bmatrix},
\qquad \mathbf{R}={}^a\mathbf{R}\_b.
$$

The vector $\mathbf{p}$ locates the origin of frame $b$ relative to frame $a$, expressed in $a$. We are reexpressing the **same instantaneous velocity field**, rather than differentiating coordinates observed from a moving observer.

**Step 1: rotate the angular component.**

$$
{}^a\boldsymbol{\omega}=\mathbf{R}\,{}^b\boldsymbol{\omega}.
$$

**Step 2: use the same physical point.** Its positions satisfy $\,{}^a\mathbf{r}=\mathbf{R}\,{}^b\mathbf{r}+\mathbf{p}$. Reexpress its velocity vector:

$$
{}^a\dot{\mathbf{r}}
=\mathbf{R}\left({}^b\boldsymbol{\omega}\times{}^b\mathbf{r}+{}^b\mathbf{v}\right)
=(\mathbf{R}\,{}^b\boldsymbol{\omega})\times({}^a\mathbf{r}-\mathbf{p})
+\mathbf{R}\,{}^b\mathbf{v}.
$$

**Step 3: collect the constant part of the field.**

$$
{}^a\dot{\mathbf{r}}
={}^a\boldsymbol{\omega}\times{}^a\mathbf{r}
+\underbrace{\left(\mathbf{p}\times\mathbf{R}\,{}^b\boldsymbol{\omega}
+\mathbf{R}\,{}^b\mathbf{v}\right)}\_{ {}^a\mathbf{v}}.
$$

Thus the complete map is

$$
\boxed{
{}^aV=\mathrm{Ad}\_{ {}^a\mathbf{H}\_b}\,{}^bV,\qquad
\mathrm{Ad}\_{ {}^a\mathbf{H}\_b}=
\begin{bmatrix}
\mathbf{R}&\mathbf{0} \\ <br>
\widetilde{\mathbf{p}}\mathbf{R}&\mathbf{R}
\end{bmatrix}.}
$$

The lower-left block is the geometry we have been seeing all along: changing the origin couples angular and linear descriptions. Just rotating both three-component blocks would miss it.

As a quick example, take $\mathbf{R}=\mathbf{I}\_3$, $\mathbf{p}=[1,0,0]^T$ m, and $\,{}^bV=[0,0,1;\;0,0,0]^T$. Then

$$
{}^aV=[0,0,1;\;0,-1,0]^T.
$$

The motion is still pure rotation about the same physical axis. That axis now lies one metre from the coordinate origin.

<div class="st-lab" id="st-adjoint" data-st-lab="adjoint">
<p><strong>Try it — change the description, preserve the effect.</strong> Rotate and shift frame b. Compare the two twist coordinate vectors. The wrench is reexpressed at the corresponding origins too; their power pairing stays equal.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange point</strong><span>A point with fixed coordinates [0.6, 0, 0.2] in frame b. Its world position follows that frame.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange arrow</strong><span>The actual velocity at that point for the chosen twist, scaled by 0.5 s. Its base is the orange point.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>Fₐ, Fᵦ; a, b</var></dt><dd>The reference frames. Superscripts a and b state which frame expresses a vector; they are labels, not powers.</dd>
<dt><var>pₓ, p</var></dt><dd>The adjustable x offset, and the position of frame b’s origin in frame a. The other offsets are 0.2 and 0.1 m.</dd>
<dt><var>H = ᵃHᵦ = [R, p; 0ᵀ, 1]</var></dt><dd>The pose of frame b in frame a. R rotates coordinates; p locates the origin; the bottom row makes a homogeneous transform.</dd>
<dt><var>ᵇV, ᵃV</var></dt><dd>The same twist at the chosen placement, written in b or a. Each uses angular-first ordering [ω; v].</dd>
<dt><var>ᵇW, ᵃW</var></dt><dd>The same wrench written in b or a, using force-first ordering [f; m]. Wrenches appear in the numerical readout in this scene.</dd>
<dt><var>Ad(H)</var></dt><dd>The adjoint map: it rotates the angular coordinates and accounts for both rotation and origin offset in the linear coordinates.</dd>
<dt><var>ω, v, f, m</var></dt><dd>Angular velocity, spatial linear intercept, resultant force, and moment about the coordinate origin.</dd>
<dt><var>⊙ (reciprocal product)</var></dt><dd>The power pairing W ⊙ V = f · v + m · ω, combining force with linear velocity and moment with angular velocity.</dd>
<dt><var>W after a power value</var></dt><dd>The SI unit watt. For example, “0.2 W” is a power, whereas “W = [f; m]” describes a wrench.</dd>
</dl>
<p class="st-key-note">At each chosen placement, both coordinate descriptions give the same power. The sliders place frame b while its listed ᵇV and ᵇW remain fixed, so moving those sliders also changes the world point and field being illustrated.</p>
</details>
</div>
<p class="st-fallback">A pure coordinate translation adds p × ω to the twist's linear part, and adds p × f to the wrench's moment part.</p>
</div>

For our **force-first** wrench convention, the same numerical block matrix also reexpresses a wrench:

$$
{}^a\mathbf{f}=\mathbf{R}\,{}^b\mathbf{f},\qquad
{}^a\mathbf{m}=\mathbf{p}\times\mathbf{R}\,{}^b\mathbf{f}+\mathbf{R}\,{}^b\mathbf{m},
\qquad
{}^aW=\mathrm{Ad}\_{ {}^a\mathbf{H}\_b}\,{}^bW.
$$

This is consistent with the mixed power pairing $\mathbf{f}\cdot\mathbf{v}+\mathbf{m}\cdot\boldsymbol{\omega}$. A textbook using **moment-first** wrenches writes a different coordinate transformation; its formula cannot be copied without changing the ordering.

<div class="st-quiz" id="quiz-adjoint" data-answer="1">
<fieldset>
<legend>Checkpoint — If two frames differ only by an offset p, how does a twist change?</legend>
<label><input type="radio" name="quiz-adjoint" value="0" data-explanation="The angular part stays the same, but the velocity-field intercept changes with the origin.">Neither component changes.</label>
<label><input type="radio" name="quiz-adjoint" value="1" data-explanation="The lower-left adjoint block captures the offset of the same rotational velocity field.">ω stays the same and v gains p × ω.</label>
<label><input type="radio" name="quiz-adjoint" value="2" data-explanation="The cross term belongs to the linear component and uses the angular velocity.">ω gains p × v and v stays the same.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Use the offset-axis rotation example with p = [1,0,0].</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.7.5 Express the Jacobian in another frame {#express-the-jacobian-in-another-frame}

The same body twist can be represented in frame $i$:

$$
{}^iV\_n
=\mathrm{Ad}\_{\mathbf{H}\_i^{-1}}\,{}^0V\_n
=\underbrace{\mathrm{Ad}\_{\mathbf{H}\_i^{-1}}\,{}^0\mathbf{J}\_n}\_{ {}^i\mathbf{J}\_n}
\dot{\mathbf{q}}.
$$

Hence

$$
\boxed{ {}^i\mathbf{J}\_n=\mathrm{Ad}\_{\mathbf{H}\_i^{-1}}\,{}^0\mathbf{J}\_n.}
$$

When $i=n$, this is the **body Jacobian**. Describing a body's absolute twist in moving coordinates is different from computing its motion **relative to that moving frame**. Differentiating $\mathbf{H}\_i^{-1}\mathbf{H}\_n$ would introduce the reference frame's motion as well.

Many geometric Jacobians instead return the velocity of a chosen body point $\mathbf{t}\_n$ together with angular velocity. In our angular-first ordering,

$$
\begin{bmatrix}
\boldsymbol{\omega} \\ <br>
\dot{\mathbf{t}}\_n
\end{bmatrix}
=
\begin{bmatrix}
\mathbf{I}\_3&\mathbf{0} \\ <br>
-\widetilde{\mathbf{t}}\_n&\mathbf{I}\_3
\end{bmatrix}
{}^0\mathbf{J}\_n\dot{\mathbf{q}}.
$$

This is the same local motion information with a different linear component. Knowing which version a controller expects prevents mistakes.

### 5.7.6 Which determinant stays unchanged? {#which-determinant-stays-unchanged}

The adjoint is block triangular, so for a rigid transformation,

$$
\det(\mathrm{Ad}\_{\mathbf{H}})
=\det(\mathbf{R})^2=1.
$$

For a **square 6 × 6 Jacobian describing the same body's motion**, a change of expression frame therefore gives

$$
\det({}^i\mathbf{J}\_n)
=\det(\mathrm{Ad}\_{\mathbf{H}\_i^{-1}})
\det({}^0\mathbf{J}\_n)
=\boxed{\det({}^0\mathbf{J}\_n)}.
$$

Changing the reference point on that same rigid body also preserves this determinant: the point-shift matrix just above has determinant one. These changes preserve rank even for rectangular Jacobians.

However, **changing the body subscript is not merely changing coordinates**. Body 4 of a serial 6R robot depends on four joint coordinates; its minimal Jacobian is 6 × 4. A determinant of that rectangular matrix is undefined. If we retain all six joint-rate inputs instead, its last two columns are zero and its 6 × 6 determinant is zero. Neither description supports an arbitrary invariance claim when the body changes.

The determinant's numerical value also presumes fixed joint units and ordering. Nonorthogonal adjoint maps preserve rank and the square determinant, but they do not generally preserve Euclidean singular values or condition numbers.

### 5.7.7 Calculate the FANUC example: $\,{}^3\mathbf{J}\_4$ {#calculate-the-fanuc-example-3mathbf-j4}

Use the worked pose

$$
\mathbf{q}=[20,-35,40,25,-30,15]^T\;\text{degrees},
$$

converting to radians before evaluation. Compute the upstream products, the first four space-Jacobian columns, and the pose $\mathbf{H}\_3$. The latter is

$$
\mathbf{H}\_3\approx
\begin{bmatrix}
0.243210&-0.342020&-0.907673&-0.382680 \\ <br>
0.088521&0.939693&-0.330366&-0.139284 \\ <br>
0.965926&0&0.258819&0.826598 \\ <br>
0&0&0&1
\end{bmatrix}.
$$

Now apply the adjoint:

$$
{}^3\mathbf{J}\_4
=\mathrm{Ad}\_{\mathbf{H}\_3^{-1}}
\begin{bmatrix}
{}^0J\_{4,1}&{}^0J\_{4,2}&{}^0J\_{4,3}&{}^0J\_{4,4}
\end{bmatrix}
\approx
\begin{bmatrix}
0.965926&0&0&-1 \\ <br>
0&1&-1&0 \\ <br>
0.258819&0&0&0 \\ <br>
0&0.543892&0&0 \\ <br>
-0.407239&0&0&0 \\ <br>
0&-0.456379&0&0
\end{bmatrix}.
$$

It is 6 × 4 and has rank 4 at this pose. The final column is easy to recognize: joint 4 rotates about $-x$ through the origin of frame 3, so it contributes $[-1,0,0;\;0,0,0]^T$. Joint 3 contributes rotation about $-y$ through that same origin.

To demonstrate determinant invariance, keep **body 6** as the target and express its six-column Jacobian in frames 0, 3, and 4:

$$
{}^3\mathbf{J}\_6=\mathrm{Ad}\_{\mathbf{H}\_3^{-1}}\,{}^0\mathbf{J}\_6,\qquad
{}^4\mathbf{J}\_6=\mathrm{Ad}\_{\mathbf{H}\_4^{-1}}\,{}^0\mathbf{J}\_6,
$$

$$
\boxed{
\det({}^0\mathbf{J}\_6)
=\det({}^3\mathbf{J}\_6)
=\det({}^4\mathbf{J}\_6)
\approx-0.0243893167.}
$$

The angular rows use radians and the linear rows metres, with joints ordered 1 through 6. The reported number uses the unrounded matrices.

In the [FANUC laboratory](#st-fanuc), choose **Worked pose**, then **Calculate ³J₄** below the frame comparison. Compare with the matrix above. Then choose **Compare ³J₆ / ⁴J₆**. The entries change while the determinants agree.

<div class="st-quiz" id="quiz-determinant" data-answer="0">
<fieldset>
<legend>Checkpoint — Which determinant comparison is valid for the same FANUC configuration and joint units?</legend>
<label><input type="radio" name="quiz-determinant" value="0" data-explanation="The adjoint has determinant one when reexpressing the same six-column Jacobian. Changing the target body changes the task.">det(³J₆) = det(⁴J₆); ³J₄ is 6 × 4 and has no determinant.</label>
<label><input type="radio" name="quiz-determinant" value="1" data-explanation="Body 4 depends on four joints and its minimal Jacobian is rectangular. The body index is not only a coordinate label.">det(³J₄) equals det(⁴J₆) because every index can be changed freely.</label>
<label><input type="radio" name="quiz-determinant" value="2" data-explanation="The adjoint preserves rank and the square determinant, but its entries and generally its Euclidean singular values change.">Every entry and singular value stays unchanged when the frame changes.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>Read the left index as the expression frame and the right index as the target body.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.7.8 Why the Jacobian matters to control {#why-the-jacobian-matters-to-control}

Given a desired twist, the controller seeks joint rates satisfying $V=\mathbf{J}\dot{\mathbf{q}}$. If the appropriate six-column Jacobian is nonsingular, the local solution is $\dot{\mathbf{q}}=\mathbf{J}^{-1}V$. For other cases, a pseudoinverse and task or joint constraints enter the problem.

If the current joint screws become linearly dependent, the Jacobian loses rank: an instantaneous motion direction disappears, and some joint-rate combinations may produce zero tool twist. This is the geometric beginning of a **singularity**.

The same Jacobian connects force and motion through power. With our wrench ordering, joint efforts satisfy

$$
\tau\_i=W\odot J\_{n,i}
=\mathbf{f}\cdot\boldsymbol{\eta}\_i+\mathbf{m}\cdot\boldsymbol{\xi}\_i.
$$

For revolute joints these efforts are torques; for prismatic joints they are forces. This pairing leads directly to our final stop.

## 5.8 Reciprocals: what can move, and what can resist it? {#reciprocals-what-can-move-and-what-can-resist-it}

### 5.8.1 First understand one scalar: power {#first-understand-one-scalar-power}

For a twist and a wrench represented in the same frame and at the same origin, the instantaneous power is

$$
\boxed{
W\odot V
=\mathbf{f}\cdot\mathbf{v}+\mathbf{m}\cdot\boldsymbol{\omega}.}
$$

The existing chapter uses $\odot$ for the reciprocal product. For generic screws,

$$
X\_1\odot X\_2
=\boldsymbol{\xi}\_1\cdot\boldsymbol{\eta}\_2
+\boldsymbol{\xi}\_2\cdot\boldsymbol{\eta}\_1.
$$

Why does the power formula use the spatial twist's $\mathbf{v}$, rather than one chosen point's velocity? For a force at $\mathbf{r}$,

$$
\mathbf{f}\cdot\dot{\mathbf{r}}
=\mathbf{f}\cdot(\boldsymbol{\omega}\times\mathbf{r}+\mathbf{v})
=(\mathbf{r}\times\mathbf{f})\cdot\boldsymbol{\omega}
+\mathbf{f}\cdot\mathbf{v}.
$$

Its point geometry has already entered the wrench's moment. The formula therefore captures the full effect without counting the lever arm twice.

A wrench and a twist are **reciprocal** when their power pairing is zero. This is zero power on that motion, not necessarily zero force or zero moment.

### 5.8.2 A door hinge gives us a whole example {#a-door-hinge-gives-us-a-whole-example}

Place $O$ on an ideal hinge whose direction is $\mathbf{e}=[0,0,1]^T$. Its allowed twist is

$$
V=\dot\phi[0,0,1;\;0,0,0]^T.
$$

The power of any wrench on this motion is

$$
W\odot V=m\_z\dot\phi.
$$

A tangential push at the handle creates $m\_z$ and can open the door. A force pointing toward the hinge has zero hinge-axis moment. A vertical force at the handle can create moments about $x$ and $y$, but gives $m\_z=0$: the ideal hinge resists those effects while still permitting its $z$ rotation.

<figure class="st-figure">
<img src="{{ '/docs/chap5_adv_kin/assets/door_power.svg' | relative_url }}" alt="Top view of a hinged door: a tangential push creates hinge torque and power; a force along the door toward the hinge has zero hinge torque.">
<figcaption>A large force can be reciprocal to the permitted motion. The lever arm and direction decide the power.</figcaption>
</figure>

<div class="st-lab" id="st-door" data-st-lab="door">
<p><strong>Try it — which push can open the door?</strong> Compare a tangential push, a force toward the hinge, a vertical force, and a pure hinge-axis couple. Rotate the door and inspect the power at each pose.</p>
<div class="st-session-key" aria-label="Color and symbol key">
<p class="st-key-heading"><strong>Read this scene — colors and shapes</strong></p>
<ul class="st-color-key">
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #ff0000" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #00ff00" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #0000ff" aria-hidden="true"></span></span><div><strong>Coordinate axes: red x, green y, blue z</strong><span>The short segments point along the positive axes of the frame named beside them. These colors identify coordinates, not joint numbers.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #c4d3dd" aria-hidden="true"></span><span class="st-key-swatch" style="--st-key-color: #e0e8ed" aria-hidden="true"></span></span><div><strong>Gray ground grid</strong><span>The reference xy plane, with z = 0. Darker central lines and lighter grid lines help you judge position and depth; they are not a trajectory.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #bcccad" aria-hidden="true"></span></span><div><strong>Pale green panel</strong><span>The rigid door; the panel color is an object color, not a force or motion category.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #137d92" aria-hidden="true"></span></span><div><strong>Teal vertical line</strong><span>The ideal hinge axis, through O and along positive z.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #304d62" aria-hidden="true"></span></span><div><strong>Dark blue-gray sphere</strong><span>The handle point r, located 0.85 m from the hinge and 0.9 m high.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #913f84" aria-hidden="true"></span></span><div><strong>Purple arrow at the handle</strong><span>The applied force f, in tangential, radial, or vertical mode. Length scale: 0.035 m of drawing per newton.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #913f84" aria-hidden="true"></span></span><div><strong>Purple arrow on the hinge</strong><span>The applied pure hinge-axis couple in couple mode. Length scale: 0.04 m of drawing per N·m; it is a moment, not a force.</span></div></li>
<li><span class="st-key-swatches"><span class="st-key-swatch" style="--st-key-color: #d4751a" aria-hidden="true"></span></span><div><strong>Orange arrow at the handle</strong><span>The handle velocity for φ̇ = 1 rad/s, scaled by 0.5 s. It is tangent to the handle’s circular path.</span></div></li>
</ul>
<details class="st-symbol-key">
<summary>Symbols and units — what every label means</summary>
<dl>
<dt><var>x, y, z</var></dt><dd>Ordered coordinate directions of the labeled frame; a three-number vector lists its x, y, z components.</dd>
<dt><var>O (letter O), φ (phi)</var></dt><dd>O is the origin on the hinge. φ is the selected door angle, displayed in degrees and evaluated in radians.</dd>
<dt><var>r, ṙ</var></dt><dd>The handle position in metres and its point velocity in m/s.</dd>
<dt><var>ω, φ̇</var></dt><dd>Angular velocity and signed hinge rate. The comparison uses ω = [0, 0, 1] rad/s and φ̇ = 1 rad/s.</dd>
<dt><var>V = [ω; v]</var></dt><dd>The angular-first hinge twist. Here v = 0 because the coordinate origin is on the fixed hinge axis.</dd>
<dt><var>f, m, m_z</var></dt><dd>The applied force, its resultant moment about O, and that moment’s z component. A pure couple adds a moment without a resultant force.</dd>
<dt><var>W = [f; m]</var></dt><dd>The force-first wrench, including both force and moment.</dd>
<dt><var>⊙, W ⊙ V = m_z φ̇</var></dt><dd>The reciprocal product gives power. Zero means this wrench is reciprocal to the allowed hinge twist; a nonzero value can drive or oppose it.</dd>
<dt><var>N, N·m, W after a number</var></dt><dd>Force in newtons, moment in newton-metres, and power in watts. The trailing watt unit W is distinct from the wrench variable W.</dd>
</dl>
<p class="st-key-note">A negative force/couple setting reverses the purple arrow. The force selector changes which kind of action is applied. This scene compares power at the chosen pose; it does not calculate force-driven door acceleration.</p>
</details>
</div>
<p class="st-fallback">With a 10 N tangential force at a 0.85 m handle radius and angular rate 1 rad/s, the power is 8.5 W. A radial or vertical force gives zero power on the ideal hinge motion.</p>
</div>

<div class="st-quiz" id="quiz-door" data-answer="1">
<fieldset>
<legend>Checkpoint — Which wrench is reciprocal to an ideal z-axis hinge motion?</legend>
<label><input type="radio" name="quiz-door" value="0" data-explanation="This moment does power m_z·φ̇ on the hinge rotation.">A pure nonzero moment about the hinge axis.</label>
<label><input type="radio" name="quiz-door" value="1" data-explanation="It may produce moments about x and y, but m_z = 0, so it does zero power on the allowed z rotation.">A vertical force at the handle, giving zero hinge-axis moment.</label>
<label><input type="radio" name="quiz-door" value="2" data-explanation="A tangential handle force or axial couple can drive the allowed motion.">Every wrench, because a door has only one degree of freedom.</label>
</fieldset>
<button type="button" data-check>Check my prediction</button>
<button type="button" data-show-hint aria-expanded="false">Hint</button>
<p data-hint hidden>For this hinge the pairing reduces to m_z·φ̇.</p>
<p class="st-feedback" role="status"></p>
</div>

### 5.8.3 Leave with one idea for the next chapter {#leave-with-one-idea-for-the-next-chapter}

The hinge's allowed motions form the one-dimensional twist subspace

$$
\mathcal{T}=\mathrm{span}\lbrace [0,0,1;\;0,0,0]^T\rbrace .
$$

The wrenches reciprocal to **every** allowed motion form its reciprocal subspace:

$$
\mathcal{T}^\perp\_\odot
=\lbrace W:\;W\odot V=0\text{ for every }V\in\mathcal{T}\rbrace 
=\lbrace [\mathbf{f}^T\;\mathbf{m}^T]^T:\;m\_z=0\rbrace .
$$

It has dimension five: three force components and two moment components. Under this nondegenerate pairing, a $d$-dimensional twist subspace has a $(6-d)$-dimensional reciprocal wrench subspace.

Twists and wrenches are screws with **dual roles**. Allowed motions and ideal constraint wrenches are complementary in this reciprocal, power-based sense. They are not automatically an ordinary Euclidean orthogonal pair, and an arbitrary twist and wrench need not be reciprocal. Real hinge friction or a hinge motor can transmit an axial moment; those effects do work and are not in the ideal reciprocal constraint space.

For a robot Jacobian, a wrench satisfying $W\odot J\_{n,i}=0$ for every column does no power on any instantaneous motion the joints can produce. The size of this reciprocal space is tied to the rank of the joint screw system. That is why reciprocity is a fundamental tool for studying constraints, motion capabilities, and singularities.

We will carry this question into the next chapter: **which motions are available, which force systems resist them, and what changes when the screws lose independence?**

## A final confidence check {#a-final-confidence-check}

Before moving on, explain these connections in your own words:

1. A rotating door has points with linear velocity. What does the spatial twist's linear component mean, and how do you recover the handle velocity?
2. Two forces can cancel while leaving a moment. What information does the wrench preserve?
3. Compounding and $\dot x=x$ gave the same exponential. What changes when its generator is a skew matrix?
4. A line plus pitch gives a screw geometry. What additional quantity turns it into a twist, and what quantities turn it into a finite pose?
5. Why is a Jacobian column a current screw rather than always the unchanged home screw?
6. What does a zero wrench–twist pairing tell you about an ideal hinge?

<details class="st-reveal" markdown="1">
<summary>Compare with a worked explanation</summary>

A spatial twist stores the velocity-field intercept $\mathbf{v}$ at the chosen coordinate origin, together with $\boldsymbol{\omega}$. The handle velocity is $\boldsymbol{\omega}\times\mathbf{r}+\mathbf{v}$. A wrench preserves the resultant force **and** its moment about that origin, including a pure couple.

The exponential accumulates a constant generator's action. A scalar generator gives proportional growth or decay; a skew generator turns a vector while preserving its length. An axis, pitch, and rate describe a twist; an axis, pitch, motion amount, and initial pose determine the corresponding constant-screw finite motion.

Upstream joints carry a joint's axis, so its Jacobian column is its home screw transported to the current configuration. A zero pairing means that the wrench does no instantaneous power on the allowed motion. It may still exert substantial constraint forces or moments.
</details>

<p class="st-progress" id="st-quiz-progress" role="status">Checkpoints are available throughout the lecture. Answers can be retried without a penalty.</p>

## Bibliography {#bibliography}

1. University of California, Berkeley. [“Kinematics of rigid bodies.” *Rotations: A website devoted to the mathematics of rotations and their applications*.](https://rotations.berkeley.edu/kinematics-of-rigid-bodies/) Euler's fixed-point rotation theorem and the geometry of screw displacements.
2. *Encyclopædia Britannica*. [“Mechanics.” Vol. XVII, 11th edition, 1911.](https://dev.gutenberg.org/files/42473/42473-h/42473-h.htm) Historical account of Chasles' theorem, credited to 1830; digitized by Project Gutenberg.
3. O'Connor, J. J., and Robertson, E. F. [“The number e.” *MacTutor History of Mathematics*, University of St Andrews, 2001.](https://mathshistory.st-andrews.ac.uk/HistTopics/e/) Bernoulli's compound-interest problem and the development of the exponential.
4. ROS. [*urdfdom_headers*, “joint.h.”](https://github.com/ros/urdfdom_headers/blob/master/include/urdf_model/joint.h) Joint axes, local origins, and the parent-to-joint pose in the URDF data model.
5. Jacobi, C. G. J. [“De determinantibus functionalibus.” *Journal für die reine und angewandte Mathematik*, vol. 22, 1841.](https://eudml.org/doc/147138) Original work on functional determinants; bibliographic record in the European Digital Mathematics Library.
6. Lynch, K. M., and Park, F. C. [*Modern Robotics: Mechanics, Planning, and Control*. Cambridge University Press, 2017.](https://hades.mech.northwestern.edu/images/2/25/MR-v2.pdf) Chapters 3–5 cover rigid motions, twists, wrenches, PoE, and Jacobians. The book uses a different wrench ordering from this lecture.
7. RAS University. [“5.1 Screw Theory.”]({{ '/docs/chap5_adv_kin/01_screw_theory.html' | relative_url }}) The notation and frame conventions followed throughout this lecture.
8. ENG_654 course materials. *Lecture 02: URDF, Screw Motion, and Product of Exponentials*; accompanying FANUC CRX-10iA/L URDF and STL model. Local source: <code>/home/durghy/Documents/Projects/Teaching/ENG_654/eng-654/lectures_main</code>. The [chapter's asset notes]({{ '/docs/chap5_adv_kin/screw_theory_assets.txt' | relative_url }}) record the model provenance and interactive implementation.

</div>

<script src="{{ '/docs/chap5_adv_kin/screw_theory_quizzes.js' | relative_url }}" defer></script>
<script type="importmap">
{
  "imports": {
    "three": "{{ '/docs/chap5_adv_kin/vendor/three/build/three.module.js' | relative_url }}",
    "three/addons/": "{{ '/docs/chap5_adv_kin/vendor/three/examples/jsm/' | relative_url }}"
  }
}
</script>
<script type="module">
import("{{ '/docs/chap5_adv_kin/screw_theory_explained.js' | relative_url }}").catch(error => {
  document.querySelectorAll('[data-st-lab] .st-fallback').forEach(p => {
    p.textContent = "The 3D module could not load. Use the prediction and worked example alongside this scene.";
  });
  console.error("Screw theory interactions:", error);
});
</script>
