---
title: 2.4 Tactile Perception 
parent: "Chapter 2: Sensing in Robotics"
has_children: false
nav_order: 4
layout: numbered
author: Mael Studer, Aude Billard (EPFL)
chapter: 2
section: 4
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<!-- Back-To-Top Button -->
<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

<!-- Style definitions -->
<style>

  .goal-title {
    /* Text */
    font-weight: bold;
    font-style: normal;
    color: #0053d9ff;
  }
  .goal-window {
    /* Layout */
    display: inline-block;
    margin: 0.6em auto 0.3em auto; /* vertical spacing */
    padding: 0.6em 1.4em; /* inner spacing */
    /* Border and shape */
    border-left: 4px solid #0053d9ff;
    /* Text */
    color: #053838;
  }

  .window-title {
    /* Text */
    font-weight: bold;
    font-style: normal;
    text-align: left;
  }

  .note-window {
    /* Layout */
    max-width: 600px;
    margin: 3em 0 3em auto;
    padding: 0.6em 1.4em;
    /* Border and shape */
    border-right: 4px solid #999;
    border-radius: 10px 0 0 10px;
    /* Background */
    background: #f5f5f5;
    /* Text */
    color: #717171ff;
    font-size: 0.8em;
  }

  .quiz-btn {
    /* Layout */
    display: inline-block;
    margin: 2em auto 1.5em auto;
    padding: 0.55em 1.2em;
    /* Border and shape */
    border: 1px solid #f0bf1fff;
    border-radius: 10px;
    /* Background */
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(186, 115, 2, 0.08);
    /* Text */
    color: #dfb21dff;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
  }
  .quiz-btn:hover {
    background: #f9efcfff;
  }
  .quiz-btn:active {
    transform: translateY(1px);
    box-shadow: 0 1px 4px rgba(186, 115, 2, 0.08);
  }
  .quiz-details {
    margin: 1em 0;
    text-align: center;
  }
  .quiz-details > *:not(summary) {
    text-align: left;
  }
  .quiz-details > summary {
    list-style: none;
  }
  .quiz-details > summary::-webkit-details-marker {
    display: none;
  }
  .quiz-details > summary .quiz-label::after {
    content: " (tap to show)";
    font-weight: 700;
  }
  .quiz-details[open] > summary .quiz-label::after {
    content: " (tap to hide)";
    font-weight: 700;
  }
  .quiz-window {
    /* Layout */
    margin: 0 auto 0 auto; /* space below button */
    padding: 0.6em 1.4em;
    /* Border and shape */
    border: 1px solid #333;
    border-radius: 10px;
  }
  .quiz-question-text {
    /* Layout */
    margin-bottom: 0.6em;
    /* Text */
    font-weight: 600;
    color: #333;
  }

  .section-title {
    /* Layout */
    margin: 2em 0 1.6em 0;
    padding: 0.6em 1em;
    /* Border and shape */
    border: 1px solid #ddd;
    border-radius: 10px;
    /* Background */
    background: #fafafa;
    /* Text */
    font-weight: 700;
  }
  .section-label {
    font-weight: 700;
    color: #4F3DDB;
    margin-right: 0.4em;
  }

  .solution-btn {
    /* Layout */
    display: inline-block;
    margin: 0.4em 0 0.4em 1.2em;
    /* Border & shape */
    border-radius: 6px;
    /* Background */
    background: transparent;
    /* Text */
    color: #2e7d32;
    font-weight: 600;
    font-size: 0.95em;
    cursor: pointer;
    user-select: none;
  }
  .solution-btn:hover {
    text-decoration: underline;
  }
  .solution-details > summary .solution-label::before {
    content: "▶ ";
    font-size: 1.2em;
  }
  .solution-details[open] summary .solution-label::before {
    content: "▼ ";
    font-size: 1.2em;
  }
  .solution-details > summary .solution-label::after {
    content: " (tap to show)";
    font-weight: 400;
  }
  .solution-details[open] > summary .solution-label::after {
    content: " (tap to hide)";
  }
  .solution-details > summary {
    list-style: none;
  }
  .solution-details > summary::-webkit-details-marker {
    display: none;
  }
  .solution-window {
    /* Layout */
    margin: 0.6em 0 1em 0;
    padding: 0.6em 1em;
    /* Border */
    border-left: 4px solid #2e7d32;
    /* Background */
    background: #f6fbf7;
    /* Text */
    color: #2b2b2b;
  }

  .optional-btn {
    /* Layout */
    display: inline-block;
    margin: 0.6em 0 0.6em 0;
    /* Shape */
    border-radius: 6px;
    /* Background */
    background: transparent;
    /* Text */
    color: #555555;
    font-weight: 600;
    font-size: 0.95em;
    cursor: pointer;
    user-select: none;
  }
  .optional-btn:hover {
    text-decoration: underline;
  }
  .optional-details summary .optional-label::before {
    content: "▶ ";
    font-size: 1.2em;
  }
  .optional-details[open] > summary .optional-label::before {
    content: "▼ ";
    font-size: 1.2em;
  }
  .optional-details > summary .optional-label::after {
    content: " (optional)";
    font-weight: 400;
    color: #777777;
  }
  .optional-details[open] > summary .optional-label::after {
    content: " (tap to hide)";
  }
  .optional-details > summary {
    list-style: none;
  }
  .optional-details > summary::-webkit-details-marker {
    display: none;
  }
  .optional-window {
    /* Layout */
    margin: 0.6em 0 1em 0;
    padding: 0.6em 1em;
    /* Border */
    border-left: 4px solid #000000;
    /* Background */
    background: #f2f2f2;
    /* Text */
    font-size: 0.95em;
  }

</style>

# Tactile Perception (in Robotics)

- Table of Contents
{:toc}

## Prerequisites

- Read [Sensors and Sensing]({{ '/docs/chap2_sensing/new-sensors-for-robotics' | relative_url }}) page
- Basics of electrical circuits (resistance, capacitance, voltage-divider, etc.)
- Basics of optics (internal reflection)

## General Motivation

**Tactile Perception** tells the robot *where* and *how* that contact is happening. This page focuses on the **fine-grained, localized information** acquired at the contact interface, in opposition to global interaction information seen in [Force Perception]({{ '/docs/chap2_sensing/force_perception' | relative_url }}).

Below are two illustrations and explanations of the two main interaction categories in which tactile perception is used in robotics: **manipulation** and **exploration**.

- During **manipulation**, the robot senses the object and adapts its actions to **control** it accordingly. Object manipulation is essential in fields like industrial robotics. In tasks like dexterous **grasping**, tactile perception is used to estimate the grasp force applied by the robotic hand, to prevent damaging the object or slipping. More about grasping can be found on its dedicated page [here]({{ '/docs/chap7_manipulation/grasping' | relative_url }}).  

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/tactile_perception/manipulation_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Robotic Hand manipulating a Champagne Glass
    (<a href="https://doi.org/10.1109/TRO.2023.3280028">F. Khadivar and A. Billard, TRO 2023</a>)
  </i></sub></div>
</div>

*Key points of the video:*  
A robotic hand manipulates a **water-filled champagne glass**. As the hand tilts the glass, the moving water changes the internal mass distribution, creating disturbances during manipulation. Using **tactile sensors at the fingertips**, the robotic fingers adapt their movement and contact forces to control the glass despite these disturbances. In the end of the sequence, a larger motion causes the water to spill.  

- During **exploration**, the robot performs movements to **discover unknown properties** of an object, without the objective of directly controlling it. Touch can be used to determine material properties such as **softness**, **surface texture**, **shape**, **temperature** or sometimes even the **friction coefficient**. For example, it is possible to determine whether an object is stiff or compliant, smooth or rough.

<div style="text-align: center;">
  <video width="640" controls>
    <source src="{{ '/assets/videos/tactile_perception/exploration_ex.mp4' | relative_url }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div><sub><i>
    Humanoid Robot performs Shape Detection
    (<a href="https://doi.org/10.1109/ICRA.2014.6907804">N. Sommer, M. Li and A. Billard, ICRA 2014</a>)
  </i></sub></div>
</div>

*Key points of the video:*  
A **humanoid robot** explores different objects by moving its fingers along their surface, trying to **identify** them through touch. First it explores a bottle, then a jar, a telephone handset and finally a glass. Tactile sensors at the robot’s fingertips provide **contact information** as the fingers slide over the object. These contact points are accumulated into a noisy point cloud, which is then used to **reconstruct an approximate shape** of the object. This type of tactile exploration is useful in situations where **vision is unavailable**, for example due to bad lighting conditions.  

---

## Course Content

Now that we have seen in what situations robots need tactile feedback, we can dive into how it is implemented. The tactile sensors are mounted directly at the robot’s **contact surface** with the object (illustrated below).

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/extrinsic_sensor.jpg' }}"
       width="530"
       alt="Location of tactile sensors on a robot arm">
  <figcaption>
    <sub><i>
      Figure 1: Location of tactile sensors on a robot arm
      (<a href="https://doi.org/10.1038/s44172-025-00407-4" target="_blank">K. Junge and J. Hughes, Commun Eng 2025</a>)
    </i></sub>
  </figcaption>
</figure>

<div class="goal-window">
  <div class="goal-title">Summary</div>
  <strong>Tactile sensing</strong> measures stress or <strong>pressure distributions over a surface</strong> rather than at a single point. It relies on an array of sensing elements, forming what can be thought of as an <strong>electronic skin</strong>. Because multiple contact points are available, tactile sensing can detect slippage and precise contact location.
</div>

This page is separated into the following sections:

- **Section 2.4.3.1: Tactile Sensing Technologies**  
  Overview of the main physical sensing principles.

- **Section 2.4.3.2: Advanced Tactile Sensing**  
  Presentation of flexible and stretchable tactile sensors.

- **Section 2.4.3.3: Issues and Difficulties**  
  Discussion of hardware challenges in large sensor arrays.

---

### Tactile Sensing Technologies

This section presents the following tactile sensing technologies:

- Resistive sensors  
- Capacitive sensors  
- Piezoelectric sensors  
- Optical sensors  
- Magnetism-based sensors  

<!-- - Vision-based sensors  -->

<!-- - Electrorheological / magnetorheological sensors  -->

Let's begin with **resistive tactile** sensors.

#### A) Resistive Sensors

There are two different types of resistive tactile sensors:

- **Type 1:** Sensors designed to determine the **contact location** on a surface.
- **Type 2:** Sensors designed to measure the **contact force or pressure**.

We will first take a closer look at resistive tactile sensors of the **first type** and see how resistive technology can be used to localize contact on a surface.  

<h4 class="section-title">
  <span class="section-label">Type 1</span>
  Determination of contact location
</h4>

We start with **single-strip resistive sensors** to understand the working principle of resistive tactile sensing. We then extend this concept to a more complete version: **the multi-strip resistive sensor**.

*1) Single-strip resistive sensors:*  

Resistive tactile sensors are composed of **two thin sheets coated with a resistive material**, positioned one on top of the other. In the figure below, the first resistive layer is shown in green and the second in grey. 

These layers are separated by **microscopic spacer elements** (often microspheres), which keep them **electrically isolated** when no pressure is applied. These spacers are represented by the black dots in the figure.

When an object presses onto the sensor surface, the applied pressure **locally** brings the two resistive layers into contact. This creates an **electrical connection** at the point of touch, allowing the sensor to detect the location.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/single-strip-resistive-sensor1.png' }}"
       width="300px"
       alt="Analog resistive strip sensor schematic">
  <figcaption>
    <sub><i>
      Figure 2: Schematic of single-strip resistive touch sensing
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

To determine the **contact location** on the sensor surface, the **x- and y-coordinates** of the touch point must be extracted. This is achieved by **alternating** the roles (active vs. passive) of the two resistive layers.

The measurement procedure follows these key steps:

<div style="margin-left: 1.6em;">
  <ol>
    <li><strong>Layer activation:</strong> The first resistive layer is activated by applying a <strong>uniform voltage gradient</strong> across its length.</li>
    <li><strong>Hi-Z state:</strong> The second resistive layer is placed in a <strong>Hi-Z</strong> (high-impedance) configuration. Because it draws no current, it does <strong>not</strong> disturb the <strong>voltage distribution</strong> along the active layer.</li>
    <li><strong>Voltage transfer:</strong> During contact, the physical connection between the sheets forms a <strong>measurement node</strong>. The voltage at the specific contact point on the active layer is transferred onto the passive layer.</li>
    <li><strong>Coordinate calculation:</strong> The voltage measured at the output of the passive layer correlates linearly with the contact location. This value is used to compute the <strong>corresponding coordinate</strong> (x or y).</li>
  </ol>
</div>

The roles of the active and passive layers are then swapped. In practice, the controller switches at a **high frequency** between x- and y-measurements, providing a response time (often 10 ms or faster) that is imperceptible to a human user.

Both measurement states are illustrated in the figure below. Panel (a) shows the first state, where the green layer is active and the grey layer is in a Hi-Z state. The applied **voltage gradient**, indicated as $V_x$, decreases uniformly along the length of the active layer. 

Similarly, panel (b) illustrates the second state where the roles are swapped.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/single-strip-resistive-sensor2.png' }}"
       width="540px"
       alt="Measurement procedure of single-strip resistive touch sensors">
  <figcaption>
    <sub><i>
      Figure 3: Measurement procedure of single-strip resistive touch sensors. (a) Active x-layer, (b) Active y-layer 
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

To compute the **contact location**, we need to have a look at the equivalent electrical circuit of the resistive layers, as illustrated in panel (a) below. We define $R_{x1}, R_{x2}$ and $R_{y1}, R_{y2}$ as the **resistive segments** formed between the contact point and the boundaries of the respective layers. Note that in the resting state, the layers are physically separated and the circuit lines do not intersect.

Panels (b) and (c) show the equivalent circuits when the layers are alternatingly activated. The physical contact introduces an equivalent **touch resistance** ($R_{touch}$) at the junction.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/single-strip-resistive-sensor3.png' }}"
       width="540px"
       alt="Equivalent electrical circuit of single-strip resistive touch sensors">
  <figcaption>
    <sub><i>
      Figure 4: Equivalent electrical circuit of single-strip resistive touch sensors. (a) Initial equivalent circuit during no touch, (b) Touch while active x-layer, (c) Touch while active y-layer
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

In ideal conditions (assuming no current is drawn by the Hi-Z passive layer), the measured output voltage behaves as a standard **voltage divider**. The simplified expressions for the output voltages are:

$$
V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x
$$

$$
V_{y,\text{out}} = \frac{R_{y2}}{R_{y1} + R_{y2}} \, V_y
$$

Where $V_{x,\text{out}}$ and $V_{y,\text{out}}$ are the measured voltages used to calculate the coordinates of the touch.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Going deeper: Formula in non-ideal conditions</span>
  </summary>

  <div class="optional-window">
    <p>
      In a real-world circuit, the passive layer is never <i>infinitely</i> resistive. A small amount of current may flow through the measurement terminal, meaning we must consider the <strong>load resistance</strong> ($R_L$).
    </p>

    <p>
      Consider the equivalent electrical circuit shown in panel (b) of the previous figure. The total resistance seen from the contact point toward the measurement terminal is defined as:
      \[ R_L = R_{touch} + R_{y1} \text{ (or } R_{y2}\text{)} + R_{Hi\text{-}Z} \]
      where $R_{Hi\text{-}Z}$ represents the impedance at the measuring terminal. 
    </p>

    <p>
      For the opposite measurement state, $R_L$ is defined similarly by swapping the respective layer resistances (replace $R_{yi}$ by $R_{xi}$).
    </p>

    <p>
      Under these non-ideal conditions, the actual output voltage expressions are:
    </p>

    <p>
      \[ V_{x,\text{out}} = \frac{R_{x2} R_L}{R_{x1} R_L + R_{x2} R_L + R_{x1} R_{x2}} V_x \]
      \[ V_{y,\text{out}} = \frac{R_{y2} R_L}{R_{y1} R_L + R_{y2} R_L + R_{y1} R_{y2}} V_y \]
    </p>

    <p>
      When the impedance at the measuring terminal ($R_{Hi\text{-}Z}$) is very high, $R_L$ becomes much larger than the layer resistances ($R_{x1}, R_{x2}$). In this mathematical limit, the $R_{x1}R_{x2}$ term in the denominator becomes negligible, the $R_L$ terms cancel out, which reduces the formula back to the simplified formula used in the main text.
    </p>

  </div>
</details>

---

<div class="quiz-question-text">
  Exercise: Contact localization with a single-strip resistive sensor
</div>

A single-strip resistive sensor of total length $L = 100\ \text{mm}$ is energised with a voltage $V_x = 5\ \text{V}$.  

<div style="margin-left: 1.2em;">
  <p>
    <strong>1)</strong> The measured output voltage is \(V_{x,\text{out}} = 2.3\ \text{V}\).<br>
    Compute the x-coordinate of the touch point (distance from the left boundary).
  </p>
  <p>
    <strong>2)</strong> The contact point is located at \(x = 70\ \text{mm}\) from the left boundary.<br>
    Compute the expected output voltage \(V_{x,\text{out}}\).
  </p>
  <p>
    <strong>3)</strong> What output voltage is expected if the contact occurs exactly at the center of the sensor?
  </p>
  <p>
    <em>Hint:</em> the resistance is proportional to length (\(R_{x1} \propto x\)).
  </p>
</div>


<details class="solution-details" markdown="1">
  <summary class="solution-btn">
    <span class="solution-label">Solution</span>
  </summary>

  <div class="solution-window">

  <!-- ===================== PART 1 ===================== -->
  <p><strong>1) Determine the x-coordinate of the contact location</strong></p>

  <p>
    As mentioned, the resistance is proportional to length for a
    <strong>uniform</strong> resistive strip. Therefore we have:
  </p>
  <ul>
    <li>\( R_{x1} \propto x \)</li>
    <li>\( R_{x2} \propto L - x \)</li>
  </ul>

  <p>
    We can replace these expressions in the formula seen above:
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x
    = \frac{L - x}{L} \, V_x
    \]
  </p>

  <p>
    Solving for \(x\):
  </p>
  <p>
    \[
    x = L - L \frac{V_{x,\text{out}}}{V_x}
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 0.1\,\text{m}\), \(V_x = 5\,\text{V}\), \(V_{x,\text{out}} = 2.3\,\text{V}\)):
  </p>
  <p>
    \[
    x = 0.1 - 0.1 \cdot \frac{2.3}{5}
    = \boxed{0.054 \, \text{m}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the contact is located at \(x = 54\ \text{mm}\) from the left boundary.
  </p>

  <hr>

  <!-- ===================== PART 2 ===================== -->
  <p><strong>2) Predict the output voltage</strong></p>

  <p>
    We again start from the voltage divider relation:
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{L - x}{L}\, V_x
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 100\,\text{mm}\), \(x = 70\,\text{mm}\), \(V_x = 5\,\text{V}\)):
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{100 - 70}{100}\cdot 5
    = 0.3 \cdot 5
    = \boxed{1.5\ \text{V}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the expected output voltage is \(V_{x,\text{out}} = 1.5\ \text{V}\).
  </p>

  <hr>

  <!-- ===================== PART 3 ===================== -->
  <p><strong>3) Contact exactly at the center of the sensor</strong></p>

  <p>
    At the center, the contact is located at:
  </p>
  <p>
    \[
    x = \frac{L}{2}
    \]
  </p>

  <p>
    Using the same expression:
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{L - x}{L}\, V_x
    \]
  </p>

  <p>
    Substitute \(x = \frac{L}{2}\):
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{L - \frac{L}{2}}{L}\, V_x
    = \frac{1}{2} V_x
    \]
  </p>

  <p>
    With \(V_x = 5\,\text{V}\):
  </p>
  <p>
    \[
    V_{x,\text{out}} = \frac{1}{2}\cdot 5
    = \boxed{2.5\ \text{V}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    if the contact occurs at the center, the output voltage is \(V_{x,\text{out}} = 2.5\ \text{V}\).
  </p>

  </div>
</details>

Single-strip resistive sensors have an important drawback: they **can't distinguish multiple simultaneous touch points**, which is why multi-strip resistive sensors are used.

---

*2) Multi-strip resistive sensors:*  

As with the single-strip version, the **multi-strip resistive sensor** consists of two resistive layers and the **measuring principle** remains the same. However, each layer is **divided into multiple independent strips** along its length, as shown in the figure below. 

This configuration allows for the detection of **multiple simultaneous contacts**, as each strip provides its own independent measurement. While the output voltage of a given strip still depends on the contact position, the **narrow geometry** of the strips means the measurement is also affected by the **contact width**.

For a **single strip** within the array, the measured **output voltage** is given by:

$$
V_{\text{out}} = \frac{l_x + \frac{w}{2}}{L - \frac{w}{2}} \, V_{\text{ref}}
$$

where:  
- $l_x$ is the distance from the left boundary of the strip to the **center** of the applied contact,
- $w$ is the **width** of the contact area (for example the width of a fingertip),
- $L$ is the **total length** of the strip,
- $V_{\text{ref}}$ is the applied reference voltage.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/multi-strip-resistive-sensor.png' }}"
       width="540px"
       alt="Multi-strip analog resistive sensor schematic">
  <figcaption>
    <sub><i>
      Figure 5: Schematic of multi-strip resistive touch sensing
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

Instead of performing only one measurement per layer, we must now conduct **$n$ separate measurements** for all $n$ strips. If both resistive layers are divided into $n$ strips, the total number of measurements per full scan increases from 2 to $2n$. As a result, scanning the entire sensor surface becomes **more time-consuming** as the resolution increases.

Furthermore, the **wiring complexity** increases with the number of strips. While the single-strip version requires only four connection wires, the multi-strip version typically requires $2+2n$ wires: one for $V_{\text{ref}}$ and one for ground (shared), plus $n$ independent measurement wires for each of the two stripped layers. This increase in wiring complexity will be addressed later in the course.

---

<div class="quiz-question-text">
  Exercise: Contact position and width estimation on a multi-strip resistive sensor
</div>

A single strip of length $L = 60\ \text{mm}$ is energised with a reference voltage
$V_{\text{ref}} = 5\ \text{V}$.

<div style="margin-left: 1.2em;">

  <p>
    <strong>1)</strong>
    The measured output voltage is \(V_{\text{out}} = 2.5\ \text{V}\).
    Assuming a point contact (\(w = 0\)), compute the contact position \(l_x\)
    from the left boundary.
  </p>

  <p>
    <strong>2)</strong>
    A fingertip presses on the strip at a position whose centre is located at
    \(l_x = 25\ \text{mm}\) from the left boundary.
    The measured output voltage is \(V_{\text{out}} = 3.75\ \text{V}\).
    Compute the contact width \(w\).
  </p>

</div>

<details class="solution-details" markdown="1">
  <summary class="solution-btn">
    <span class="solution-label">Solution</span>
  </summary>

  <div class="solution-window">

  <!-- ===================== PART 1 ===================== -->
  <p><strong>1) Determine the contact position \(l_x\)</strong></p>

  <p>
    For a point contact, the contact width is \(w = 0\). The output voltage
    expression simplifies to:
  </p>
  <p>
    \[
    V_{\text{out}} = \frac{l_x}{L}\, V_{\text{ref}}
    \]
  </p>

  <p>
    Solving for \(l_x\):
  </p>
  <p>
    \[
    l_x = L\,\frac{V_{\text{out}}}{V_{\text{ref}}}
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 0.06\,\text{m}\),
    \(V_{\text{out}} = 2.5\,\text{V}\),
    \(V_{\text{ref}} = 5\,\text{V}\)):
  </p>
  <p>
    \[
    l_x = 0.06 \cdot \frac{2.5}{5}
    = \boxed{0.03\,\text{m}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the contact is located at \(l_x = 30\ \text{mm}\) from the left boundary.
  </p>

  <hr>

  <!-- ===================== PART 2 ===================== -->
  <p><strong>2) Determine the contact width \(w\)</strong></p>

  <p>
    Using the given formula:
  </p>
  <p>
    \[
    V_{\text{out}} = \frac{l_x + \frac{w}{2}}{L - \frac{w}{2}} \, V_{\text{ref}}
    \]
  </p>

  <p>
    Solving for \(w\):
  </p>
  <p>
    \[
    w = 2 \cdot \frac{ \frac{V_{\text{out}}}{V_{\text{ref}}} \cdot L - l_x}{1 + \frac{V_{\text{out}}}{V_{\text{ref}}}}
    \]
  </p>

  <p>
    Inserting numerical values (\(L = 0.06\,\text{m}\),
    \(V_{\text{out}} = 3.75\,\text{V}\),
    \(V_{\text{ref}} = 5\,\text{V}\), \(l_x = 0.025\,\text{m}\)):
  </p>
  <p>
    \[
    w = 2 \cdot \frac{ \frac{3.75}{5} \cdot 0.06 - 0.025}{1 + \frac{3.75}{5}}
    = \boxed{0.0229 \, \text{m}}
    \]
  </p>

  <p>
    <strong>Answer:</strong>
    the contact width is \(w \approx 22.9\ \text{mm}\).
  </p>

  </div>
</details>

Next, we move on to sensors of the second type: how resistive tactile sensors are used to **measure force and pressure**.

<h4 class="section-title">
  <span class="section-label">Type 2</span>
  Determination of applied force or pressure
</h4>

As mentioned, sensors of this type are designed to measure how much force or pressure is applied on the surface. These sensors rely on **piezoresistive materials**, whose electrical resistance changes when they are mechanically deformed. When an external force compresses the sensitive material, its resistance varies and by measuring this resistance change, the applied pressure can be estimated.

Note that the resistance change is **not** the quantity **measured directly**. Instead, the electronics measure the resulting voltage drop at the boundaries of the piezoresistive layer. This is usually done using a voltage-divider configuration.

Materials used as piezoresistive layers are conductive **rubber**, conductive **polymers**, conductive **gels**, and others.

An example of piezoresistive tactile sensor is the *Force Sensing Resistor (FSR)*. These sensors combine two electrodes and a piezoresistive layer. When a voltage is applied across the electrodes, current flows **through the piezoresistive layer** from one electrode to the other. On panel (a) of the figure below, the different layers of the FSR can be observed. Panel (b) shows a commercially available FSR from [Interlink Electronics](https://www.interlinkelectronics.com).

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px;">

  <div style="flex: 1;">
    <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/fsr_schematic.png' }}"
         width="300px"
         alt="(a) Schematic structure of a force sensing resistor">
    <figcaption>
      <sub><i>
        (a) Schematic of a FSR
        (<a href="http://www.openmusiclabs.com/learning/sensors/fsr/index.html">OpenMusicLabs</a>)
      </i></sub>
    </figcaption>
  </div>

  <div style="flex: 1;">
    <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/fsr_interlink.png' }}"
         width="300px"
         alt="(b) Commercial Interlink FSR">
    <figcaption>
      <sub><i>
        (b) Commercial FSR from Interlink Electronics  
        (<a href="https://www.interlinkelectronics.com/fsr-400-series">FSR-400 Series</a>)
      </i></sub>
    </figcaption>
  </div>

  </div>

  <figcaption style="margin-top: 8px;">
    <sub><i>
      Figure 6: Force Sensing Resistor (FSR)
    </i></sub>
  </figcaption>

</figure>

These sensors are **low cost**, offer good sensitivity and have **simple electronics**, but their main drawback is the presence of **hysteresis**, meaning that the sensor does not follow the same resistance–pressure curve when the force increases as when it decreases.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Illustrative video about Force Sensing Resistors</span>
  </summary>

  <div class="optional-window"><br>

  <div style="text-align: center;">
    <iframe width="640" height="360"
            src="https://www.youtube.com/embed/sSdEwA7s8bE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
  </div>
  <div style="text-align: center;">
      <sub><i>
        Force Sensitive Resistors  
        (available on <a href="https://youtu.be/sSdEwA7s8bE">YouTube</a>)
      </i></sub>
  </div>

  <p>
    <em>Key points of the video:</em><br>
    This video is a practical introduction to FSRs. It first presents FSRs with <strong>different shapes and sizes</strong>, then the video shows the key operating principle: their electrical resistance decreases as the applied pressure increases. Towards the end, a simple electrical circuit is shown, where an operational amplifier is used in comparator mode to turn on an LED when pressure is applied.
  </p>

  </div>
</details>

Test your knowledge about resistive tactile sensors in the quiz below.

<details class="quiz-details" markdown="1">
  <summary class="quiz-btn"><span class="quiz-label">Quiz</span></summary>
  <div class="quiz-window">

  <!-- ===================== QUESTION 1 ===================== -->
  <div class="quiz-question-text">
    What is the role of the high-impedance (Hi-Z) connection in a single-strip resistive sensor?
    (single answer possible)
  </div>

  <form id="type1-q1">
  <input type="radio" name="type1-q1" value="option2">
  To increase the sensitivity of the sensor. <br>

  <input type="radio" name="type1-q1" value="option1">
  To ensure that almost no current flows through the reading layer. <br>

  <input type="radio" name="type1-q1" value="option3">
  To reduce the resistance of the active strip. <br>

  <input type="radio" name="type1-q1" value="option4">
  To allow both resistive layers to be energised simultaneously. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type1-q1',
    'option1',
    {
      option1: 'The Hi-Z input draws almost no current, so it does not disturb the voltage distribution along the active layer.',
      option2: 'The Hi-Z configuration does not increase sensitivity, it prevents loading the active layer.',
      option3: 'The resistance of the active strip is determined by its geometry and material, not by the Hi-Z connection.',
      option4: 'The two layers are never energised simultaneously, they are switched one after the other.'
    }
  )">
    Check Answer
  </button>

  <p id="type1-q1-feedback"></p>
  </form>

  <!-- ===================== QUESTION 2 ===================== -->
  <div class="quiz-question-text">
    In a single-strip resistive sensor, the output voltage is given by
    \(V_{x,\text{out}} = \frac{R_{x2}}{R_{x1} + R_{x2}} \, V_x\).
    What does a larger value of \(V_{x,\text{out}}\) indicate?
    (single answer possible)
  </div>

  <form id="type1-q2">
  <input type="radio" name="type1-q2" value="option1">
  The contact point is closer to the right boundary of the strip. <br>

  <input type="radio" name="type1-q2" value="option2">
  The contact point is in the middle of the strip. <br>

  <input type="radio" name="type1-q2" value="option3">
  The strip has a lower overall resistance. <br>

  <input type="radio" name="type1-q2" value="option4">
  The sensor is detecting multiple simultaneous touch points. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type1-q2',
    'option1',
    {
      option1: 'A larger $V_{x,\\text{out}}$ means that $R_{x2}$ is larger relative to $R_{x1}$, which corresponds to a contact closer to the right boundary.',
      option2: 'A middle contact would produce an output voltage close to half of $V_x$, not necessarily a larger value.',
      option3: 'The overall resistance of the strip does not affect the voltage ratio used for localisation.',
      option4: 'Single-strip sensors cannot distinguish multiple simultaneous contacts.'
    }
  )">
    Check Answer
  </button>

  <p id="type1-q2-feedback"></p>
  </form>

  <!-- ===================== QUESTION 3 ===================== -->
  <div class="quiz-question-text">
    What happens inside a piezoresistive tactile sensor when a force is applied?
    (single answer possible)
  </div>

  <form id="type2-q1">

  <input type="radio" name="type2-q1" value="option2">
  The electrodes move apart, breaking the electrical contact. <br>

  <input type="radio" name="type2-q1" value="option3">
  The sensor generates a voltage internally, like a piezoelectric element. <br>

  <input type="radio" name="type2-q1" value="option4">
  The electronics directly measure the resistance without using a voltage drop. <br>

  <input type="radio" name="type2-q1" value="option1">
  The resistance of the piezoresistive layer changes due to mechanical deformation. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type2-q1',
    'option1',
    {
      option1: 'Piezoresistive materials change their electrical resistance when mechanically deformed by an applied force.',
      option2: 'The electrodes remain in contact. The resistance change occurs in the piezoresistive material.',
      option3: 'Piezoresistive sensors do not generate a voltage themselves. We will see more about piezoelectric sensors later.',
      option4: 'In practice, the resistance change is inferred through a voltage-divider configuration.'
    }
  )">
    Check Answer
  </button>

  <p id="type2-q1-feedback"></p>
  </form>

  <!-- ===================== QUESTION 4 ===================== -->
  <div class="quiz-question-text">
    Which of the following is a known limitation of Force Sensing Resistors (FSRs)?
    (single answer possible)
  </div>

  <form id="type2-q2">
  <input type="radio" name="type2-q2" value="option2">
  They require complex multi-strip wiring like localisation sensors. <br>

  <input type="radio" name="type2-q2" value="option3">
  They can't be used to measure pressure, only position. <br>

  <input type="radio" name="type2-q2" value="option4">
  They must be operated with a high-impedance reading layer to avoid disturbing the voltage distribution. <br>

  <input type="radio" name="type2-q2" value="option1">
  They exhibit hysteresis, with different resistance–pressure curves when loading and unloading. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'type2-q2',
    'option1',
    {
      option1: 'FSRs are known to exhibit hysteresis, meaning their response differs when the applied force increases or decreases.',
      option2: 'FSRs are simple sensors and do not require multi-strip wiring.',
      option3: 'FSRs are designed to measure force or pressure.',
      option4: 'The Hi-Z configuration is used for resistive localisation sensors, not for FSRs.'
    }
  )">
    Check Answer
  </button>

  <p id="type2-q2-feedback"></p>
  </form>

  </div>
</details>

---

#### B) Capacitive Sensors

**Capacitive tactile sensors** make use of the fact that the electrical capacitance between two conductive electrodes changes when the geometry of the capacitor is modified. When a force or pressure is applied on the surface of the sensor, the deformation of the structure leads to a measurable **variation of capacitance**. This variation is then used to estimate the contact force or to detect touch.

<h4 class="section-title">Basic parallel-plate capacitive sensor:</h4>

The simplest capacitive tactile sensor can be modelled as a **parallel-plate capacitor**. It consists of two conductive plates (electrodes) separated by a flexible dielectric layer (figure below).

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/parallel-plate-capacitor.png' }}"
       width="300px"
       alt="Parallel-plate capacitive tactile sensor schematic">
  <figcaption>
    <sub><i>
      Figure 7: Parallel-plate capacitive sensor (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

The formula of the capacitance of a parallel-plate capacitor is given by

$$
C = \varepsilon \frac{A}{d},
$$

where,

- $A$ is the area of the electrodes,
- $d$ is the thickness of the dielectric layer separating the electrodes,
- $\varepsilon$ is the permittivity of the dielectric material placed between the electrodes.

When a force $F$ presses on the sensor surface, the dielectric layer is compressed and the distance $d$ between the two electrodes decreases. The key principle is the **inverse proportionality** between capacitance and distance ($C \propto \tfrac{1}{d}$): as the distance $d$ becomes smaller, the capacitance $C$ increases.

This change in capacitance is then converted into an **electrical output signal**. The electronics circuitry used for this purpose is beyond the scope if this class. If interested, a review of different methods can be found below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Further Reading: Capacitance Measurement Techniques</span>
  </summary>

  <div class="optional-window">
    <p>
      In this paper, the authors provide an overview of the main <strong>electronic methods</strong> used to measure capacitance in capacitive sensors. They review classical and modern readout circuits that convert small capacitance changes into voltage, frequency or digital signals. Then they compare the different measurement approaches in terms of accuracy, complexity and robustness.  
    </p>
    <p>
      <a href="https://doi.org/10.1016/j.measurement.2022.111067" target="_blank" rel="noopener">
        Measurement Methods for Capacitances in the Range of 1 pF–1 nF: A Review
      </a>
      <br>
      <em>O. Kanoun, A. Kallel et al., Measurement 2022</em>
    </p>
  </div>
</details>

Note that in this basic model the object deforms the capacitor mechanically. It does not need to be a conductive object, as it does not interact electrically with the capacitor.

<h4 class="section-title">Capacitive sensing systems:</h4>

Capacitive tactile sensors are of two types: **self-capacitance** and **mutual capacitance**. Self-capacitance measures the change in capacitance between a **single electrode** and ground when contact happens, whereas mutual capacitance measures the change in coupling between **two electrodes** when being touched.

*1) Self-capacitance type*  
In the self-capacitance mode, there is only one electrode, instead of two as in the parallel-plate capacitor seen above. *Self-capacitance* refers to the intrinsic capacitance an electrode has with respect to the circuit ground ($C_{electrode}$), shown in panel (a) of the figure below.


<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/self-capacitance-type.png' }}"
       width="500px"
       alt="Self-capacitance touch sensing schematic">
  <figcaption>
    <sub><i>
      Figure 8: Self-capacitance touch sensing (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

When a conducting object (such as a finger) touches or approaches the dielectric layer, it acts as the second plate of the capacitor. As a result, an additional capacitance $C_{touch}$ appears in parallel with the electrode’s intrinsic capacitance, **increasing** the total measured capacitance. This is illustrated on panel (b).

*2) Mutual capacitance type*  

In the mutual-capacitance mode, the two electrodes are arranged orthogonally (X- and Y-direction electrodes). Each electrode has its own intrinsic capacitance $C_{electrode}$, and together they form a coupling capacitor with capacitance $C_{mutual}$, as shown in panel (a) of the next figure.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/mutual-capacitance-type.png' }}"
       width="640px"
       alt="Mutual-capacitance touch sensing schematic">
  <figcaption>
    <sub><i>
      Figure 9: Mutual-capacitance touch sensing (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

When a conducting object presses on or approaches the sensor, it distorts the electric field and reduces the coupling between the crossing electrodes. As a result, the measured capacitance **decreases**.

The mutual capacitance type is usually used in tactile arrays, with multiple X and Y electrode lines. At each X–Y crossing a distinct sensing capacitor is formed. This configuration is suitable for high-resolution tactile skins capable of detecting **multiple simultaneous contacts**, making mutual capacitance attractive for larger tactile surfaces.

An illustrative implementation of a capacitive tactile array is the system developed by <a href="https://doi.org/10.1109/JMEMS.2006.886021">Lee et al.</a>, as shown in the figure below. This sensor employs a tactile array with $16 \times 16$ sensing points. These individual tactile modules can be combined to cover larger areas of a robot’s body, as presented in panel (a).  

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/mutual-capacitance-grid-on-robot.png' }}"
           width="300px"
           alt="(a) Modular mutual-capacitance tactile array deployed on a robotic arm">
      <figcaption>
        <sub><i>
          (a) Modular mutual-capacitance tactile array on robot arm (<a href="https://doi.org/10.1109/JMEMS.2006.886021">H.-K. Lee, S.-I. Chang and E. Yoon, JMEMS 2006</a>)
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/mutual-capacitance-grid.png' }}"
           width="300px"
           alt="(b) Close-up views of the mutual-capacitance sensor grid">
      <figcaption>
        <sub><i>
          (b) Close-up views of the mutual-capacitance sensor grid (<a href="https://doi.org/10.1109/JMEMS.2006.886021">H.-K. Lee, S.-I. Chang and E. Yoon, JMEMS 2006</a>)
        </i></sub>
      </figcaption>
    </div>
  </div>

  <figcaption style="margin-top: 8px;">
    <sub><i>
      Figure 10: Mutual-capacitance tactile sensing array
    </i></sub>
  </figcaption>

</figure>

In this example, the mutual capacitance $C_{mutual}$ of a single sensing node is read in $100\,\mu\text{s}$, which results in the entire grid being scanned 20 times per second. Such fast scanning is needed for generating a high-resolution tactile image in real time, like for mobile touch screens.

<details class="quiz-details" markdown="1">
  <summary class="quiz-btn"><span class="quiz-label">Quiz</span></summary>
  <div class="quiz-window">

  <!-- ===================== QUESTION 1 ===================== -->
  <div class="quiz-question-text">
    In a parallel-plate capacitive tactile sensor, what happens when the dielectric layer is compressed by an external force?
    (single answer possible)
  </div>

  <form id="cap-q1">

  <input type="radio" name="cap-q1" value="option3">
  The capacitance $C$ remains unchanged because the permittivity is constant. <br>

  <input type="radio" name="cap-q1" value="option2">
  The capacitance $C$ decreases because the electrode area $A$ becomes smaller. <br>

  <input type="radio" name="cap-q1" value="option1">
  The capacitance $C$ increases because the distance $d$ between the electrodes becomes smaller. <br>

  <input type="radio" name="cap-q1" value="option4">
  The capacitance $C$ remains unchanged because compression does not affect the capacitor geometry. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q1',
    'option1',
    {
      option1: 'Compressing the dielectric reduces the distance $d$ between the electrodes. Since $C = \\varepsilon A / d$, the capacitance increases.',
      option2: 'The electrode area $A$ does not change when pressure is applied.',
      option3: 'The permittivity $\\varepsilon$ is assumed constant. The capacitance change comes from geometry, not material properties.',
      option4: 'Compression directly modifies the geometry of the capacitor by reducing $d$.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q1-feedback"></p>
  </form>

  <!-- ===================== QUESTION 2 ===================== -->
  <div class="quiz-question-text">
    In a self-capacitance tactile sensor, why does the measured capacitance increase when a finger approaches the electrode?
    (single answer possible)
  </div>

  <form id="cap-q2">
  <input type="radio" name="cap-q2" value="option4">
  Because the electrode spacing decreases under pressure. <br>

  <input type="radio" name="cap-q2" value="option1">
  Because the finger increases the dielectric constant of the material. <br>

  <input type="radio" name="cap-q2" value="option2">
  Because the finger acts as a conductive object, adding an extra capacitance $C_{touch}$ in parallel. <br>

  <input type="radio" name="cap-q2" value="option3">
  Because the electrode self-capacitance naturally increases over time. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q2',
    'option2',
    {
      option2: 'In self-capacitance sensing, a conductive finger behaves like a second electrode, adding a parallel capacitance $C_{touch}$.',
      option4: 'Self-capacitance sensing does not rely on mechanical compression of a dielectric.',
      option1: 'The dielectric material itself is not modified by the finger.',
      option3: 'The change is caused by interaction with the finger, not by time-dependent effects.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q2-feedback"></p>
  </form>

  <!-- ===================== QUESTION 3 ===================== -->
  <div class="quiz-question-text">
    In a mutual-capacitance tactile sensor, why does the measured capacitance decrease when a finger touches an X–Y electrode crossing?
    (single answer possible)
  </div>

  <form id="cap-q3">
  <input type="radio" name="cap-q3" value="option3">
  Because the finger electrically shorts the X and Y electrodes. <br>

  <input type="radio" name="cap-q3" value="option1">
  Because the dielectric layer is compressed and the distance $d$ decreases. <br>

  <input type="radio" name="cap-q3" value="option4">
  Because the permittivity of air decreases when displaced by the finger. <br>

  <input type="radio" name="cap-q3" value="option2">
  Because the finger distorts the electric field and reduces the coupling between the electrodes. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q3',
    'option2',
    {
      option2: 'In mutual capacitance, a conductive finger distorts the electric field and reduces coupling between the X and Y electrodes.',
      option3: 'The electrodes are not shorted together by the finger.',
      option1: 'Mutual capacitance sensing does not rely on mechanical compression.',
      option4: 'The dominant effect is field distortion, not a change in permittivity.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q3-feedback"></p>
  </form>

  <!-- ===================== QUESTION 4 ===================== -->
  <div class="quiz-question-text">
    Which statement correctly distinguishes the basic parallel-plate capacitive sensor from the mutual-capacitance sensor?
    (single answer possible)
  </div>

  <form id="cap-q4">
  <input type="radio" name="cap-q4" value="option1">
  In both cases, the object must be conductive to affect the capacitance. <br>

  <input type="radio" name="cap-q4" value="option4">
  The basic model relies on electric-field disturbance, whereas mutual capacitance relies on mechanical deformation. <br>

  <input type="radio" name="cap-q4" value="option2">
  The basic model relies on mechanical deformation of $d$, while mutual capacitance requires a conductive object that disturbs the electric field. <br>

  <input type="radio" name="cap-q4" value="option3">
  Mutual capacitance changes only when the dielectric layer is compressed. <br><br>

  <button type="button" onclick="checkMultipleTrueFalseMapped(
    'cap-q4',
    'option2',
    {
      option2: 'The parallel-plate model measures capacitance changes due to mechanical compression, while mutual capacitance relies on electric field distortion by a conductive object.',
      option1: 'The basic parallel-plate model does not require a conductive object.',
      option4: 'The roles are reversed: mechanical deformation applies to the basic model, not to mutual capacitance.',
      option3: 'Mutual capacitance does not depend on compression of the dielectric layer.'
    }
  )">
    Check Answer
  </button>

  <p id="cap-q4-feedback"></p>
  </form>

  </div>
</details>

By the way, most touch screens use the mutual-capacitance principle. Ever wondered why you can’t operate them with gloves or wet hands?

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Complement: Touch screens</span>
  </summary>

  <div class="optional-window"><br>

  <div style="text-align: center;">
    <iframe width="640" height="360"
            src="https://www.youtube.com/embed/IdWXT391FJE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
  </div>

  <div style="text-align: center;">
      <sub><i>
        Effect of conductive object in capacitive tactile sensors (available on <a href="https://youtu.be/IdWXT391FJE">YouTube</a>)
      </i></sub>
  </div>

  <p>
    <em>Key points of the video:</em><br>
    The video explains briefly the difference between resistive and capacitive touch screens. It explains why conductive objects, like a snack sausage, can activate the screen while insulating gloves cannot. Moreover, it explains why the activation becomes perturbed when water is on the screen.
  </p>

  </div>
</details>

---

#### C) Piezoelectric Sensors

Unlike FSRs, which change their resistance when pressed, piezoelectric sensors are **active transducers**. Instead of needing an external current to measure a change, they generate an electrical charge **directly** from mechanical deformation.

<h4 class="section-title">Principle of the piezoelectric effect:</h4>

The **piezoelectric effect** is defined as the generation of an electrical charge within a crystalline material when it is deformed by an applied force.

At a molecular level, the application of mechanical stress causes a **rearrangement of particles** (such as positive ions and negative electrons) within the material’s crystal lattice. While the material is electrically neutral in its resting state, the internal shifting caused by deformation creates a measurable macroscopic increase in electrical potential. This is due to the accumulation of opposite charges ($+Q$ and $-Q$) on the exterior surfaces of the material.

A primary example of such a material is **Polyvinylidene Fluoride (PVDF)**, a human-made polymer frequently used in touch sensors due to its flexibility and chemical stability. In PVDF, the molecules are organized such that the electrical dipoles align. When the material is physically **stretched or shrunk**, the displacement of these molecular dipoles causes charges to migrate to opposite sides of the film, as illustrated in the figure below.

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/piezoelectric_effect_pvdf_shrunk.jpg' }}"
           width="260px"
           alt="Piezoelectric effect in PVDF when shrunk">
      <figcaption>
        <sub><i>
          (a) PVDF film shrunk: Negative charge accumulation on the top surface, positive on the bottom one
          (<a href="https://physics.montana.edu/eam/polymers/piezopoly.html" target="_blank">Montana State University</a>)
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/piezoelectric_effect_pvdf_stretched.jpg' }}"
           width="260px"
           alt="Piezoelectric effect in PVDF when stretched">
      <figcaption>
        <sub><i>
          (b) PVDF film stretched: Positive charge accumulation on the top surface, negative on the bottom one
          (<a href="https://physics.montana.edu/eam/polymers/piezopoly.html" target="_blank">Montana State University</a>)
        </i></sub>
      </figcaption>
    </div>
  </div>

  <figcaption style="margin-top: 8px;">
    <sub><i>
      Figure 11: Charge accumulation in PVDF polymer under mechanical deformation
    </i></sub>
  </figcaption>

</figure>

A characteristic of these sensors is that they are primarily suited for **dynamic sensing**. If a constant (static) load is maintained, the generated electrical charge decays to zero. This means they are excellent at detecting **vibrations** or the exact moment of initial contact, but they cannot "feel" a steady weight over a long period.

<h4 class="section-title">Integration into a sensor:</h4>

To create a functional tactile sensor, the piezoelectric material is integrated into a **multi-layered** structure. The piezoelectric material is usually sandwiched between two conductive **electrodes**, as showed in the figure below. In this configuration, the sensor operates as a capacitor. 

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/piezoelectric_sensor.png' }}"
       width="300px"
       alt="Schematic of a piezoelectric sensor construction">
  <figcaption>
    <sub><i>
      Figure 12: Piezoelectric tactile sensing element 
      (<a href="https://doi.org/10.1088/0964-1726/20/4/045009" target="_blank">Y. Wang, J. Zheng et al, Smart Mater. Struct. 2011</a>)
    </i></sub>
  </figcaption>
</figure>

When a force is applied, the internal charge generated by the piezoelectric effect accumulates at these electrodes. This induced charge leads to a measurable potential $V$ across the element, which can be simplified by the following relationship:

$$V = \frac{Q}{C} \approx \frac{d}{C} F$$

Where:
* **$V$** is the measured potential.
* **$Q$** is the induced charge.
* **$C$** is the static capacitance of the element.
* **$d$** is the piezoelectric constant of the material.
* **$F$** is the applied Force.

In our simplified formula, we treat $d$ as a single value. However, in reality, $d$ is a **tensor**. 

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Going deeper: The Piezoelectric Constant $d$ as a Tensor</span>
  </summary>

  <div class="optional-window">
    <p>
      Because piezoelectric materials are crystalline or polarized polymers, their electrical response depends on the <strong>orientation</strong> of the applied mechanical stress relative to the material's axes.
    </p>

    <p>
      The relationship between the generated charge and the applied stress is defined by a matrix of coefficients. The subscripts (of $d_{ij}$) tell us the direction: the first number ($i$) indicates the direction of the generated electrical field and the second number ($j$) indicates the direction of the mechanical stress.
    </p>

    <figure style="text-align: center;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/piezoelectric_constant.png' }}"
           width="360px"
           alt="Piezoelectric constant matrix and axes definition">
      <figcaption>
        <sub><i>
          Figure 13: Definition of axes and piezoelectric constant tensor 
          (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5" target="_blank">Tactile Sensing Technologies, Springer</a>)
        </i></sub>
      </figcaption>
    </figure>

    <p>
      Mathematically, the piezoelectric constant is represented as a $3 \times 6$ matrix. This matrix maps the three directions of the generated electrical field to the six possible components of mechanical stress (three normal stresses and three shear stresses).
    </p>

    <p>
      For a typical piezoelectric polymer like <strong>PVDF</strong>, the tensor matrix is structured as follows:
    </p>

    \[
    d = \begin{pmatrix} 
    0 & 0 & 0 & 0 & d_{15} & 0 \\ 
    0 & 0 & 0 & d_{24} & 0 & 0 \\ 
    d_{31} & d_{32} & d_{33} & 0 & 0 & 0 
    \end{pmatrix}
    \]

    <ul>
      <li><strong>$d_{33}$ (Longitudinal Mode):</strong> This is the most common value for tactile sensors. It relates a compressive force applied along the thickness of the film (axis 3) to the charge collected on the same surfaces.</li>
      <li><strong>$d_{31}$ and $d_{32}$ (Transverse Mode):</strong> These coefficients describe the charge generated on the surfaces (axis 3) when the film is stretched or pulled along its length or width (axes 1 and 2).</li>
      <li><strong>$d_{15}$ and $d_{24}$ (Shear Mode):</strong> These relate shear (sliding) stresses to electrical displacement in the orthogonal directions.</li>
    </ul>

    <p>
      In the majority of tactile sensing applications, we use the <strong>uniaxial case</strong>. We apply a compressive force along the the z-axis of the film (axis "3" in the figure) and collect the charge from the electrodes on those same top and bottom surfaces. 
    </p>
  </div>
</details>

<h4 class="section-title">
  <span class="section-label">Example</span>
  Endoscopic Grasper
</h4>

An example application of the piezoelectric technology is the integration of sensors into **endoscopic graspers** to restore tactile feedback.

The design utilizes a multi-layered sensing unit integrated into the grasper's jaw. When the surgeon grips an object, the mechanical stress is converted into a localized electrical signal that indicates both the magnitude and the position of the contact force.

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/endoscopic_grasper2.png' }}"
           width="300px"
           alt="Endoscopic grasper with integrated tactile sensor">
      <figcaption>
        <sub><i>
          (a) Endoscopic grasper with integrated piezoelectric sensor
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/endoscopic_grasper1.png' }}"
           width="300px"
           alt="Schematic of the micromachined sensor layers">
      <figcaption>
        <sub><i>
          (b) Schematic showing the sensor layers including silicon teeth, PVDF film and electrodes
        </i></sub>
      </figcaption>
    </div>
  </div>

  <figcaption style="margin-top: 8px;">
    <sub><i>
      Figure 14: Piezoelectric tactile sensor for an endoscopic grasper (<a href="https://doi.org/10.1109/84.870059" target="_blank">J. Dargahi, M. Parameswaran and S. Payandeh, JMEMS 2000</a>)
    </i></sub>
  </figcaption>

</figure>

The sensor structure consists of a **silicon** top layer with a rigid tooth-like pattern that concentrates the force onto the **PVDF film**, as shown on panel (b) of the figure. The independent electrodes allow the system to distinguish between different contact points across the grasper's surface.

#### D) Optical Sensors

We are going to have a look at two types of optical tactile sensors. First, sensors that measure a **change in light intensity** when the optical path is obstructed, then sensors that detect **changes in the light’s path** via internal reflection.

<h4 class="section-title">
  <span class="section-label">Type A: </span>
  Light Intensity Variation Sensor
</h4>

The most straightforward form of optical sensing relies on measuring the intensity of light between an **emitter** and a **detector**. To implement such a sensor, the following components are needed:

-  **Emitter:** Usually an infrared LED that injects light into the sensing area.
-  **Detector:** A photodiode or phototransistor that senses the light coming from the LED.
-  **Deformable cover:** A mechanically flexible layer (like silicone) that includes an internal structure to obstruct the light path.

When an external force is applied, it mechanically deforms the elastic membrane cover. This causes the internal **piston to move downward**, **obstructing** the light path between the emitter and the detector. Depending on the **magnitude** of the applied force, the path is obstructed more or less, creating a measurable variation in light intensity. This variation is converted into a change in output voltage, making the **voltage proportional to the applied force** ($ V_{out} \propto F$), similar behavior as in the resistive tactile sensors seen earlier.

The working principle is illustrated in the figure below.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/optical_intensity_sensor.png' }}"
       width="450px"
       alt="Working principle of light intensity optical tactile sensor">
  <figcaption>
    <sub><i>
      Figure 15: Working principle of a light intensity optical tactile sensor. (a) In the initial state, light travels freely from emitter to detector, (b) During contact, the piston obstructs the optical path which diminishes the received light intensity 
      (<a href="https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5" target="_blank">Tactile Sensing Technologies, Springer</a>)
    </i></sub>
  </figcaption>
</figure>

It is important to note that the **sensitivity** and **sensing range** of this type of sensor rely heavily on the mechanical properties of the membrane material. For instance, a stiffer material will increase the force range but decrease the sensitivity to light touches, whereas a softer material will be more sensitive but saturate more quickly under heavy loads.

The electrical circuit of such a sensor can be as simple as in the schematic below. 

Where:  

- **LED**: infrared emitter that provides the light source
- **PD (Photo Diode)**: infrared detector that receives the light
- **$R_{LED}$**: resistor used to fix the amount of light emitted by the LED
- **$R_{PD}$**: resistor that converts the current drawn by the PD into a measurable output voltage ($V_{out}$)

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/optical_sensor_light_intensity_electrical_circuit.png' }}"
       width="320px"
       alt="Electrical circuit of an optical light intensity tactile sensor">
  <figcaption>
    <sub><i>
      Figure 16: Electrical circuit of an optical light intensity tactile sensor, with an infrared LED emitter and a photodiode detector 
      (<a href="https://doi.org/10.1109/ICRoM48714.2019.9071868" target="_blank">L. Hajshahvaladi, A. Amralizadeh et al., ICRoM 2019</a>)
    </i></sub>
  </figcaption>
</figure>

<h4 class="section-title">
  <span class="section-label">Type B: </span>
  Light Path Variation Sensor
</h4>

A light path variation sensor is based on the optical phenomenon of **Total Internal Reflection** (TIR). For a quick reminder about TIR, have a look at the drop-down below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Reminder: Total internal reflection</span>
  </summary>

  <div class="optional-window">
    <p>
      <strong>Total internal reflection</strong> is a phenomenon that occurs when light travels from a medium with a higher refractive index to one with a lower refractive index ($n_1 > n_2$). Similar to the principle used in optical fibers, the light remains trapped within the first medium if it strikes the interface at an angle larger than a specific <strong>critical angle</strong> ($\theta_c$) with respect to the normal. 
    </p>
    <p>
      Mathematically, this occurs when $n_1 \sin \theta \geq n_2$. If this condition is met, the light is reflected back into the denser medium rather than being refracted.
    </p>

    <figure style="text-align: center;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/total_internal_reflection.jpg' }}"
           width="600px"
           alt="Physics of Total Internal Reflection">
      <figcaption>
        <sub><i>
          Figure 17: Physics of refraction, the critical angle, and total internal reflection
          (<a href="https://avantierinc.com/resources/knowledge-center/what-is-total-internal-reflection-tir/" target="_blank">Avantier</a>)
        </i></sub>
      </figcaption>
    </figure>
  </div>
</details>

Light is injected into the edge of a transparent plate (acrylic board), which acts as a **waveguide**. Inside this waveguide, the light remains trapped (TIR) because it is surrounded by air, which has a lower refractive index. A soft **rubber sheet** with an array of small feelers is placed above the waveguide. 

When an object applies **force** to the rubber, these feelers collapse and make physical contact with the acrylic plate. This contact changes the refractive index at the interface (air is replaced by the rubber medium) which *frustrates* the internal reflection. At these exact points of contact, we now have **Frustrated Total Internal Reflection** (FTIR), causing light to scatter out of the waveguide. This creates bright patches of light that can be detected by an **optical sensor** (such as a CCD camera or photodiode array) placed beneath the waveguide. An illustration is shown below.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/Light_Path_Variation_Sensor.png' }}"
       width="500px"
       alt="Working principle of an optical tactile sensor based on frustrated total internal reflection">
  <figcaption>
    <sub><i>
      Figure 18: Light path variation optical tactile sensor based on the principle of total internal reflection 
      (<a href="https://doi.org/10.5772/6619" target="_blank">M. Ohka, J. Takata et al., InTech 2008</a>)
    </i></sub>
  </figcaption>
</figure>

As **more force** is applied, the contact area between the rubber feelers and the waveguide increases. This causes more light to scatter, which the optical sensor perceives as a brighter patch. By calculating the **total brightness** of these patches, the system determines the **magnitude** of the normal force.  

This principle can be extended into a three-axis tactile sensor, also detecting **shear forces**. To do so, the flat waveguide is replaced by a **hemispherical waveguide**, which makes the sensor suitable to be integrated into a **robotic fingertip**.

As shown in panel (a) of the figure below, the fingertip utilizes an **acrylic dome** as the waveguide. Instead of a single contact point, several **sensing elements** (each containing an array of small **feelers**) are arranged along the curved surface. Same as before, the light is trapped inside this dome via TIR, until a force causes the feelers to touch the dome, scattering the light. These light signals are then redirected into a **CCD camera**, which observes the bright light patches.  

By analyzing the image data, it is possible to determine the magnitude and direction of the force:

- **Normal Force**: determined based on the total **brightness** of the light patches
- **Shear Force**: determined by tracking the movement of the **centroids** of the light patches

On panel (b) of the figure below, we can see an example in action. When a force is applied, the eight feelers of the tip appear to move to the left on the monitor.

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px; align-items: flex-end;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/3Axis_waveguide_sensor1.png' }}"
           width="300px"
           alt="Hemispherical three-axis optical tactile sensor design">
      <figcaption>
        <sub><i>
          (a) Design of the hemispherical tactile sensor integrated into a robotic fingertip
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/3Axis_waveguide_sensor2.png' }}"
           width="300px"
           alt="Working principle of three-axis force detection">
      <figcaption>
        <sub><i>
          (b) Principle of three-axis force detection using a CCD camera and centroid tracking
        </i></sub>
      </figcaption>
    </div>
  </div>

  <figcaption style="margin-top: 15px;">
    <sub><i>
      Figure 19: Hemispherical three-axis optical tactile sensor 
      (<a href="https://doi.org/10.1109/ROBOT.2008.4543734" target="_blank">M. Ohka, N. Morisawa et al., ICRA 2008</a>)
    </i></sub>
  </figcaption>

</figure>

Optical tactile sensors don't react to **electromagnetic interference**, which can be useful in some applications.







#### E) Magnetism-Based Sensors

Magnetism-based tactile sensors work by measuring changes in a magnetic field caused by the mechanical deformation of an elastomer.

The design of a magnetism-based tactile sensor usually consists of a permanent magnet, that creates a constant magnetic field, placed on top of a **Hall sensor**.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/magnetism_based_sensor_design.png' }}"
       width="300px"
       alt="Design of a magnetism-based tactile sensor">
  <figcaption>
    <sub><i>
      Figure 20: Structure of a magnetism-based tactile sensor, showing the permanent magnet (embedded in elastomer) and the Hall effect sensor at the base 
      (<a href="https://doi.org/10.3390/s16091356" target="_blank">H. Wang, G. De Boer et al., Sensors 2016</a>)
    </i></sub>
  </figcaption>
</figure>

If needed, a quick reminder about the working principle of Hall sensors is in the drop-down below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Reminder: Hall sensor</span>
  </summary>

  <div class="optional-window">
    <p>
      The Hall sensor varies its output voltage in response to a magnetic field. It works based on the <strong>Hall effect</strong>: when a current-carrying conductor is placed in a magnetic field, the field exerts a transverse force on the charge carriers. This force pushes the electrons to one side of the conductor, creating a measurable voltage across it. This voltage is called the <strong>Hall voltage</strong>
    </p>
    <p>
      The Hall voltage is <strong>perpendicular</strong> to the direction of the electrical current, aswell as the direction of the magnetic field ($B$). By measuring this voltage, the sensor can determine the strength of the magnetic flux density.
    </p>

    <p>
      On the schematic below, we can observe a conductor with current flowing through it from left to right, generated by a battery. When a magnet is placed on top, the magnetic field causes the Hall voltage to appear perpendicular to the current, which is measurable via the two <strong>electrodes</strong> placed on both sides of the conductor.
    </p>

    <figure style="text-align: center;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/hall_effect.png' }}"
           width="300px"
           alt="The Hall Effect Principle">
      <figcaption>
        <sub><i>
          Figure 21: Schematic of the Hall Effect showing the generation of voltage perpendicular to current and magnetic field
          (<a href="https://www.electronics-tutorials.ws/electromagnetism/hall-effect.html" target="_blank">Electronics Tutorials</a>)
        </i></sub>
      </figcaption>
    </figure>

    <p>
    </p>
  </div>
</details>

The working principle is based on the **displacement** of the magnet relative to the Hall sensor. When an external force is applied, the elastomer body deforms, which moves the permanent magnet. 

The Hall sensor basically acts as a proximity and displacement detector. When a normal force is applied, the magnet moves closer to the sensor, increasing the magnetic flux density and the resulting Hall voltage. When shear forces are applied, the magnet moves laterally. To track this 3D movement, sensors use an **array of Hall elements** (typically four) or an integrated **3D Hall chip**. By comparing the variations in magnetic field strength across these different elements, the system can determine the magnet's 3D position and calculate the force vector ($F_x$, $F_y$, $F_z$).

An example of the sensor in action is shown in the figure below:

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/magnetism_based_sensor_in_action.png' }}"
       width="400px"
       alt="Magnetism-based tactile sensor in action">
  <figcaption>
    <sub><i>
      Figure 22: Magnetism-based tactile sensor in action: the left panel illustrates the deformation under a pure normal force ($F_z$); the right panel shows the response to a transverse force causing lateral displacement of the magnet 
      (<a href="https://doi.org/10.3390/s16091356" target="_blank">H. Wang, G. De Boer et al., Sensors 2016</a>)
    </i></sub>
  </figcaption>
</figure>

In summary, the applied force displaces the magnet, which changes the magnetic field acting on the Hall sensor. In equations, it looks like this:

$$D = f_1(B)$$
$$F = f_2(D)$$

Where **$B$** is the magnetic flux density measured by the Hall sensor, **$D$** is the displacement of the magnet from its resting position and **$F$** is the external force applied to the sensor.

The functions are determined by the following factors:
* **$f_1$** is mainly determined by the **magnetic properties** of the permanent magnet and its **spatial distance** relative to the sensor.
* **$f_2$** is mainly determined by the **mechanical properties** of the elastomer, such as its Young's modulus and the specific geometric design of the elastomer.

Knowing $f_1$ and $f_2$, we can directly deduct the resulting force $F$ from the magnetic field:

$$F = f_2(f_1(B))$$

As with the optical tactile sensors, the **range and sensitivity** of this kind of sensor heavily rely on the mechanical properties of the used elastomer (such as its stiffness or Young's modulus). A softer elastomer will allow for higher sensitivity to small forces, while a stiffer material will be better suited for high-range force sensing.

An example of magnetism-based tactile sensors can be found below.

<details class="optional-details" markdown="1">
  <summary class="optional-btn">
    <span class="optional-label">Illustrative video about magnetic tactile sensors</span>
  </summary>

  <div class="optional-window"><br>

  <div style="text-align: center;">
    <iframe width="640" height="360"
            src="https://www.youtube.com/embed/CmU8fq0Ivt8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>
  </div>
  <div style="text-align: center;">
      <sub><i>
        Melexis magnetic tactile sensor demo (available on <a href="https://youtu.be/CmU8fq0Ivt8">YouTube</a>)
      </i></sub>
  </div>

  <p>
    <em>Key points of the video:</em><br>
    This video shows a magnetic tactile sensor integrated into a robotic gripper. By measuring the 3D force vector, the robot can detect an object's orientation, calculate its center of gravity and manipulate it precisely.
  </p>

  </div>
</details>


<!--

#### F) Vision-Based Sensors

-> make link to vision course
-> video from TEDX MIT, guy explains how his vision based tactile sensor works

Finally, one more tactile sensing technology relies on **vision**. The design of such a sensor ressembles the *type B* optical tactile sensor, seen earlier.

Now that we have seen different basic tactile sensing technologies, let’s take a closer look at some more advanced tactile sensors.

-->



<!--

#### F) Electrorheological / Magnetorheological

tactile sensing 5.2.7 – 5.2.8 

-->

---

### Advanced Tactile Sensing

Most tactile sensor technologies are rigid and limited to specific industrial tasks. However, there are applications where flexibility is predominant, such as **soft robotics**, **human-machine interfaces** and **wearable electronics**.

In these fields, sensors must act more like biological skin: protecting internal components while providing feedback during contact with humans or fragile objects. It is important to note that these *advanced* sensors do not necessarily rely on new physical principles. Their transduction (capacitive, resistive, etc.) remains the same as previously discussed. But instead, the advancement lies more in **materials science**, which allows these sensing elements to be integrated into flexible or stretchable substrates.

We distinguish sensors based on how they conform to the robot's body:

- **Flexible sensors**: Designed to be **bendable**, allowing them to conform to simple curved surfaces like a robot’s forearm.
- **Stretchable sensors**: Designed to both **bend and expand**, making them useful for covering moving joints, like a robotic elbow.

The development of such sensors is in part made possible by **additive manufacturing (3D printing)**, which allows the integration of sensing elements directly into soft structures.

Below, we explore examples of how these sensors are implemented.

#### A) Flexible Capacitive Tactile Sensors

The design is based on a sandwich structure that uses common materials like paper and flexible polymers to create a capacitiv sensor capable of detecting pressure.

<h4 class="section-title">
  Multi-Layer Design and Fabrication:
</h4>

The sensor is fabricated through **all-inkjet-printing**, a manufacturing method that allows for a multi-layered structure where the sensing elements are deposited directly on the flexible substrates. The different layers are:

- **Substrate:** A thin polyethylene naphthalate (PEN) film serves as the flexible base.
- **Bottom Electrode:** A conductive ink made of **silver nanoparticles (AgNPs)** is printed directly onto the PEN to form the bottom electrode.
- **Dielectric Layer:** A layer of **Ecoflex** silicone is coated over the bottom electrode to act as the dielectric medium.
- **Spacer:** A piece of **paper** is tiled on top of the Ecoflex. It acts as a porous dielectric material that separates the electrodes and provides a stable surface for the second electrode.
- **Top Electrode:** A second layer of conductive silver nanoparticles is printed on top of the paper.
- **Encapsulation:** The entire device is sealed with another layer of Ecoflex to maintain flexibility and protect the components.

The manufacturing of these layers is shown in the figure below.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/inkjet_printed_fabrication.png' }}"
       width="600px"
       alt="Manufacturing steps for an inkjet-printed capacitive sensor">
  <figcaption>
    <sub><i>
      Figure 23: Step-by-step fabrication of the capacitive tactile sensor via 3D printing, showing the layering of PEN, silver electrodes, Ecoflex and paper 
      (<a href="https://doi.org/10.1002/admt.201800703" target="_blank">S.Fu, J.Tao et al., Adv. Mater. Technol. 2019</a>)
    </i></sub>
  </figcaption>
</figure>

<h4 class="section-title">
  Working Principle:
</h4>

The working principle is identical to the capacitive sensors we have seen earlier. When external pressure is applied, the **dielectric layers** (Ecoflex and paper) compress, reducing the distance between the top and bottom silver electrodes. This reduction in separation leads to an **increase** in the measured **capacitance**.

As shown in the right plot of the figure below, the relative change in capacitance ($\Delta C/C_0$) is highly sensitive to the applied pressure. The bigger the applied pressure, the bigger the change in capacitance.

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px; align-items: flex-end;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/capacitive_pressing.png' }}"
           width="200px"
           alt="Physical pressing of the capacitive sensor">
      <figcaption>
        <sub><i>
          (a) Illustration of the sensor deformation under physical pressing
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/capacitive_pressure_plot.png' }}"
           width="350px"
           alt="Capacitance change plot">
      <figcaption>
        <sub><i>
          (b) Relative capacitance change ($\Delta C/C_0$) as a function of applied pressure
        </i></sub>
      </figcaption>
    </div>
  </div>

  <figcaption style="margin-top: 15px;">
    <sub><i>
      Figure 24: Flexible capacitive tactile sensor in action
      (<a href="https://doi.org/10.1002/admt.201800703" target="_blank">S.Fu, J.Tao et al., Adv. Mater. Technol. 2019</a>)
    </i></sub>
  </figcaption>

</figure>

<h4 class="section-title">
  Sensing Arrays:
</h4>

These individual units can be scaled into a **flexible sensing arrays** using the same inkjet printing process.

An example of usage of such a flexible sensing array would be the attachment directly to human skin, such as the back of the hand, to map pressure distribution (illustrated in the figure below). This could be useful for **human-machine interaction**, allowing a user to interact with a computer or **control a robotic system** through a skin-mounted interface that identifies the position and intensity of touch across a wide area.

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px; align-items: flex-end;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/capacitive_array_design.png' }}"
           width="350px"
           alt="3D schematic of the sensing array">
      <figcaption>
        <sub><i>
          (a) Schematic of the $4 \times 4$ pixel sensing array
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/capacitive_array_skin.png' }}"
           width="200px"
           alt="Flexible array mounted on skin">
      <figcaption>
        <sub><i>
          (b) The flexible array mounted on the back of a human hand to detect contact
        </i></sub>
      </figcaption>
    </div>
  </div>

  <figcaption style="margin-top: 15px;">
    <sub><i>
      Figure 25: Flexible capacitive tactile sensing array
      (<a href="https://doi.org/10.1002/admt.201800703" target="_blank">S.Fu, J.Tao et al., Adv. Mater. Technol. 2019</a>)
    </i></sub>
  </figcaption>

</figure>

#### B) Stretchable Resistive Tactile Sensor

Now, we have a look at a **stretchable** resistive tactile sensor, in opposition to the flexible sensor seen above. Again, by using a multimaterial 3D printing approach, the sensing elements are directly integrated into a soft matrix that can conform to and move with human skin or soft robotic joints.

<h4 class="section-title">
  Multi-Layer Design and Fabrication:
</h4>

The layers are composed of:

- **Base and isolating layers:** These are printed using a silicone ink which provides stretchability and electrical isolation.
- **Electrodes:** The top and bottom electrodes are printed using a silver nanoparticle Ag/silicone ink. The concentration is chosen to balance electrical conductivity with mechanical stretchability.
- **Sensor layer:** It is also printed using an Ag/silicone ink, but with a different concentration. The specific silver loading is near the *percolation threshold*, making the electrical properties of the layer very sensitive to physical deformation.
- **Supporting layer:** An additional layer made of Pluronic ink is used during printing to support the top electrode and is later dissolved by immersing the sensor in water.

The structure is printed from the bottom up in **eight sequential steps**, shown below:

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/stretchable_res_fabrication.png' }}"
       width="700px"
       alt="3D printing process of the stretchable tactile sensor">
  <figcaption>
    <sub><i>
      Figure 26: 3D printing process of the stretchable capacitive tactile sensor, illustrating the layering of silicone and silver electrodes
      (<a href="https://doi.org/10.1002/adma.201701218" target="_blank">S.-Z.Guo, K.Qiu et al., Adv. Mater. 2017</a>)
    </i></sub>
  </figcaption>
</figure>

<h4 class="section-title">
  Working Principle:
</h4>

The sensor layer is printed as a 3D cylinder wall that connects the top and bottom electrodes. When the structure is **compressed**, the silver nanoparticles within the sensor layer are forced to pack more closely together. This increases the electrical **conduction** pathways, leading to a **decrease** in the electrical **resistance**. As a result, when a constant voltage is applied, the measured **current increases**.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/stretchable_res_structure.png' }}"
       width="500px"
       alt="Exploded view of the stretchable sensor structure">
  <figcaption>
    <sub><i>
      Figure 27: Schematic of the strechable resistive tactile sensor: (a) Exploded view showing the layers; (b) Side view of the completed monolithic sensor 
      (<a href="https://doi.org/10.1002/adma.201701218" target="_blank">S.-Z.Guo, K.Qiu et al., Adv. Mater. 2017</a>)
    </i></sub>
  </figcaption>
</figure>

<h4 class="section-title">
  Application:
</h4>

Here is an example of how this type of sensor can be used in **wearable electronics**. By mounting it directly onto the wrist, it can monitor a human **pulse**. The small mechanical pressure exerted by the expansion of arteries during a heartbeat is enough to deform the sensor layer and change its resistance. In the left panel of the figure below, we can see how the sensor was mounted on the wrist, whereas on the right we can see plots of current changes monitored by the sensor, first in a sedentary state, then immediately after exercise.

<figure style="text-align: center;">

  <div style="display: flex; justify-content: center; gap: 20px; align-items: flex-end;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/pulse_wrist.png' }}"
           width="270px"
           alt="Sensor mounted on wrist for pulse monitoring">
      <figcaption>
        <sub><i>
          (a) Tactile sensor mounted above the radial artery
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/pulse_plot.png' }}"
           width="430px"
           alt="Current change signals of radial pulse">
      <figcaption>
        <sub><i>
          (b) Pulse signals detected under sedentary and post-exercise states
        </i></sub>
      </figcaption>
    </div>
  </div>

  <figcaption style="margin-top: 15px;">
    <sub><i>
      Figure 28: Stretchable resistive tactile sensor used for radial pulse monitoring
      (<a href="https://doi.org/10.1002/adma.201701218" target="_blank">S.-Z.Guo, K.Qiu et al., Adv. Mater. 2017</a>)
    </i></sub>
  </figcaption>

</figure>

---

### Issues and Difficulties

When used in robotics, tactile sensors often need to cover **broad areas**. This can be challenging as simply scaling up individual sensors creates significant hurdles in **physical integration** and also in **data processing**. To cover larger areas, tactile sensor arrays are formed out of hundreds of individual sensing elements, which leads to issues we are adressing below.

#### A) Wiring Complexity

<!--
tactile sensing chapter 4.4.5
emphasize the wealth of computation, issues with electronic and cabling to tackle so much input, compute, etc. give examples of how this is computed today.

add challenges of electronics: wiring, data transfer, power consumption  
-> examples of how it is done today
-> look at latest paper of Gordon Cheng (TUM) on humanoïd robot
-->

The most immediate problem with scaling is the **physical connection** between the sensors and the controller. In a *brute-force* approach, a system with $n$ sensors would require $2n$ or $n+1$ wires (if sharing a ground). For a robot covered in thousands of sensors, this leads to a huge amount of wires. These wire bundles make the robot stiff and can be source of problems in moving joints. How to reduce the number of wires?

<h4 class="section-title">
  Bus-based Architectures
</h4>

A possible solution is to use **bus-based architectures**. Instead of each sensor having a direct line to the controller, multiple sensors share the same physical wires. Below is an example of multiple integrated sensors that share the same communication bus.

<figure style="text-align: center;">
  <div style="display: flex; justify-content: center; gap: 20px; align-items: flex-end;">
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/bus_architecture_a.png' }}"
           width="350px"
           alt="Circuit diagram of bus-based sensor integration">
      <figcaption>
        <sub><i>
          (a) Circuit schematic of a bus-based shared wiring system
        </i></sub>
      </figcaption>
    </div>
    <div style="flex: 1;">
      <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/bus_architecture_b.png' }}"
           width="300px"
           alt="Micrograph of integrated sensor bus">
      <figcaption>
        <sub><i>
          (b) Integrated sensor nodes sharing a common flexible bus
        </i></sub>
      </figcaption>
    </div>
  </div>
  <figcaption style="margin-top: 15px;">
    <sub><i>
      Figure 29: Implementation of bus-based shared wiring to reduce wiring complexity 
      (<a href="https://doi.org/10.1109/Transducers.2013.6627370" target="_blank">M. Makihata, M. Muroyama et al., Transducers 2013</a>)
    </i></sub>
  </figcaption>
</figure>

The difficulty of this architecture lies in identifying which sensor the data on the bus is coming from. To solve this problem, various **multiplexing protocols** exist, like for example:

- **Time Multiplexing:** Sensors are read one after another. The controller knows which sensor the data belongs to based on the specific time slot in which the signal arrives.

- **Frequency Multiplexing:** Each sensor is assigned a unique frequency. All sensors can send data simultaneously over the same wire, and the controller uses filters to separate the signals.

<h4 class="section-title">
  Local Modular Routing
</h4>

Another way of solving the wiring problem is through **local modular routing**. Instead of every sensor communicating directly with the central controller, sensors are organized into independent **modules**. 

This system is achieved by separating the architecture into **sensor modules** and a **main controller**. Each sensor module is connected directly to a specific sensor array to take local measurements. These modules contain their own microcontrollers that collect and process data from the local *taxels*. The main controller then manages a common bus that connects multiple sensor modules, reading the pre-processed data from each one.

Because the complex wiring is handled entirely inside the small, local patch, only a single communication cable is needed to connect the entire module to the rest of the robot. This hierarchical structure mimics the human peripheral nervous system, where local clusters of nerves process information before sending it to the spinal cord.

Below is a schematic of such an architecture.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/modular_system_architecture.png' }}"
       width="600px"
       alt="Modular system architecture showing sensor modules and main controller">
  <figcaption>
    <sub><i>
      Figure 30: Architecture of a modular tactile system
      (<a href="https://doi.org/10.1109/IROS51168.2021.9635851" target="_blank">N. Fiedler, P. Ruppel et al., IROS 2021</a>)
    </i></sub>
  </figcaption>
</figure>

<!--

<h4 class="section-title">
  Wireless Communication for Critical Joints
</h4>

Another way of solving the wiring problem is through **wireless communication**. In areas where mechanical rotation is extreme, such as the wrist or shoulder, wires may eventually fail due to fatigue. **Wireless communication** can bypass these critical regions entirely. By using **electromagnetic coils**, data can be transmitted via inductive coupling. This allows the signal to "jump" across a physical gap or a rotating joint without any mechanical connection, ensuring the robot maintains tactile feedback without the risk of wire breakage.

-->

#### B) Big Data Management

As the number of sensing elements in an array increases, the volume of generated information increases as well and affects the robot's ability to interact with its environment in **real-time**.

A primary cause of this problem is the way data is collected. In large sensor arrays, a **scanning algorithm** is typically used to read the sensor matrix, moving systematically from one end of the grid to the other (from left to right and top to bottom). Because each value is read one at a time, a significant **time latency** is introduced between the first and last sensor measurement, which makes it difficult for a robot to react instantaneously to a quick touch. The plot below illustrates this growing latency with an increasing number of sensors.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}{{ '/assets/images/tactile_perception/scanning_latency.png' }}"
       width="600px"
       alt="Comparison of different data management and scanning strategies">
  <figcaption>
    <sub><i>
      Figure 31: Graph showing the linear relationship between read-out speed (latency) and number of sensors of a tactile sensor array
      (<a href="https://doi.org/10.1109/JPROC.2026.3660184" target="_blank">A. Slepyan, J. Chen and N. Thakor, Proceedings of the IEEE 2025</a>)
    </i></sub>
  </figcaption>
</figure>

Here are some solutions to address the data problem:

- **Event-Driven Sensing:** This method replaces continuous scanning with *send-on-delta* logic. Sensors only transmit data when a significant change is detected, such as a new contact. This keeps the communication network quiet when there is no interaction and reduces the amount of data.

- **Edge Computing** Instead of sending all raw data to the central controller, data processing is distributed to local microcontrollers. By filtering noise and only sending essential tactile features, the amount of data traveling through the main bus is minimized.

- **Machine Learning Methods:** It is also possible to enhance tactile perception using AI algorithms, without needing additional tactile sensors. By combining strategically placed sensors with machine learning, the system can predict high-resolution tactile maps from a smaller amount of data.

#### C) Power Management

A final challenge worth mentioning is the power consumption of large sensor arrays.

For example, in applications like **prosthetics**, it is not ideal to rely on large and heavy batteries. Batteries require frequent recharging, which limits the user's independence and the overall autonomy of the device.

Here are some paths that address these energy constraints:

* **Energy-Autonomous Skin:** The idea is to integrate energy-harvesting materials directly into the sensor array. This includes using *tactile solar patches* that charge from light or *triboelectric nanogenerators* that convert the robot's own mechanical movements into electricity.
* **Low-Power Sensors:** The idea is to develop new sensing materials that allow sensors to consume almost no power when they are not in active use.

This concludes the tactile perception page.

---

## Credits

This page was created by Mael Studer, under the supervision of Prof. Aude Billard and Prof. Ravinder Dahiya.

The following resources were used:

<!-- List all the sources that you used to create the page   -->

- [Tactile Sensing Technologies, Springer](https://link.springer.com/chapter/10.1007/978-94-007-0579-1_5)

- [Design and Fabrication of a Low Cost Optical Tactile Sensor](https://doi.org/10.1109/ICRoM48714.2019.9071868) (L. Hajshahvaladi, A. Amralizadeh et al., ICRoM 2019)

- [A robotic finger equipped with an optical three-axis tactile sensor](https://doi.org/10.1109/ROBOT.2008.4543734) (M. Ohka, N. Morisawa et al., ICRA 2008)

- [Design Methodology for Magnetic Field-Based Soft Tri-Axis Tactile Sensors](https://doi.org/10.3390/s16091356) (H. Wang, G. De Boer et al., Sensors 2016)

- [Fabrication of Large-Area Bimodal Sensors by All-Inkjet-Printing](https://doi.org/10.1002/admt.201800703) (S. Fu, J. Tao et al., Adv. Mater. Technol. 2019)

- [3D Printed Stretchable Tactile Sensors](https://doi.org/10.1002/adma.201701218) (S.-Z. Guo, K. Qiu et al., Adv. Mater. 2017)

- [Scalable Tactile Sensing Skins: Wiring and Data Management](https://doi.org/10.1109/JPROC.2026.3660184) (A. Slepyan, J. Chen and N. Thakor, Proceedings of the IEEE 2025)

- [Large-Area Soft e-Skin: The Challenges Beyond Sensor Designs](https://doi.org/10.1109/JPROC.2019.2941366) (R. Dahiya et al., Proceedings of the IEEE 2019)

### Additional Resources
<!-- List all the sources that could be relevant to a reader who would like to know more, including the page on haptics under Human-Robot Interaction chapter -->

- [Measurement Methods for Capacitances in the Range of 1 pF–1 nF: A Review](https://doi.org/10.1016/j.measurement.2022.111067) (O. Kanoun, A. Kallel et al., Measurement 2022)

- [A Review of Printable Flexible and Stretchable Tactile Sensors](https://doi.org/10.34133/2019/3018568) (K. Kumar, P.-Y. Chen and H. Ren, Research 2019)

[Back to Top](#start)