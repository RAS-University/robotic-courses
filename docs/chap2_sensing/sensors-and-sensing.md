---
title: 2.1 Sensors and Sensing in Robotics
parent: "Chapter 2: Sensing in Robotics"
has_children: false
nav_order: 1
layout: numbered
chapter: 2
section: 1
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

# Sensors and Sensing in Robotics 

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


- Table of Contents
{:toc}

---

## Prerequisites
This page does not require any specific prerequisite, outside knowing what a robot consists of.
---

## General Motivation

<!--![](https://www.youtube.com/watch?v=KdNqmxu_V4A)
><sub>HBFS Line Follower - Next Generation of Robots. YouTube video, April 2018. Available at: https://www.youtube.com/watch?v=KdNqmxu_V4A</sub>
-->

From collaborative factory arms to drones and humanoids, every robot relies on **sensing** to perceive their environment and to control their own actions. **Sensors** can acquire and process information from a variety of sources, from recording motor displacement, to detecting light, sound and force. They convert this information into (usually) digital signals that a computer can then further process and analyse. 

Regardless of the task, meaningful robot actions begin with accurate perception of both the robot’s own state and its surroundings. Without reliable sensory feedback, the most sophisticated control algorithm degenerates into blind open-loop commands. Conversely, well-designed sensing turns a simple robotic platform into a **situationally aware** agent that can:

- **Estimate its own state (proprioception)** – joint encoders, IMUs and force sensors provide the data to infer pose, velocities and loads, yielding an internal state estimate that closes the control loop.  
- **Perceive the external world (exteroception)** – cameras, lidars, radars and tactile arrays reveal obstacles, objects and humans, enabling navigation, manipulation and safe collaboration.  
- **Adapt to uncertainty** – no mathematical model is perfect; sensors observe the difference between expected and actual behaviour and let the controller correct in real time.  
- **Share information with higher-level reasoning** – mapping, planning and learning modules all begin with raw observations turned into meaningful features.  

Early robotics tried to side-step sensing by assuming perfectly known environments. Modern applications, from warehouse fulfilment to planetary exploration, demonstrate that **autonomy becomes feasible only when perception, estimation and control form a tight feedback cycle**.

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What is the PRIMARY reason every robot needs sensing?</strong></p>
<form id="sens-1">
  <input type="radio" name="sens-1" value="A"> To display colorful status LEDs<br>
  <input type="radio" name="sens-1" value="B"> To convert physical phenomena into digital signals the controller can use<br>
  <input type="radio" name="sens-1" value="C"> To supply electrical power to the motors<br>
  <input type="radio" name="sens-1" value="D"> To make the robot lighter<br>
  <button type="button"
    onclick="checkTrueFalse('sens-1', 'B',
      '✅ Correct! Sensing turns motion, light, sound, and force into data that closes the control loop.',
      '❌ Not quite. Think about how the robot brain learns what is happening around it.')">
    Check Answer
  </button>
  <p id="sens-1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: Which pair correctly matches the type of perception with WHAT it measures?</strong></p>
<form id="sens-2">
  <input type="radio" name="sens-2" value="A"> Proprioception → external obstacles, Exteroception → joint angles<br>
  <input type="radio" name="sens-2" value="B"> Proprioception → joint angles &amp; forces, Exteroception → obstacles &amp; objects<br>
  <input type="radio" name="sens-2" value="C"> Both terms mean exactly the same thing<br>
  <input type="radio" name="sens-2" value="D"> Proprioception → Wi-Fi strength, Exteroception → battery voltage<br>
  <button type="button"
    onclick="checkTrueFalse('sens-2', 'B',
      '✅ Correct! “Proprio” is the robot’s own body; “Extero” is the outside world.',
      '❌ Try again. One term is about the robot itself, the other about its surroundings.')">
    Check Answer
  </button>
  <p id="sens-2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Which of these sensors is MOSTLY used for <em>proprioception</em>?</strong></p>
<form id="sens-3">
  <input type="radio" name="sens-3" value="A"> RGB camera<br>
  <input type="radio" name="sens-3" value="B"> 3-D lidar<br>
  <input type="radio" name="sens-3" value="C"> Inertial Measurement Unit (IMU)<br>
  <input type="radio" name="sens-3" value="D"> Radar<br>
  <button type="button"
    onclick="checkTrueFalse('sens-3', 'C',
      '✅ Correct! An IMU measures the robot’s own accelerations and rotations, its internal state.',
      '❌ Hint: Which sensor tells the robot about itself rather than the environment?')">
    Check Answer
  </button>
  <p id="sens-3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: Why is sensor feedback essential even when we have a precise mathematical model of the robot?</strong></p>
<form id="sens-4">
  <input type="radio" name="sens-4" value="A"> Because models never need updating<br>
  <input type="radio" name="sens-4" value="B"> Because real-world conditions differ from the model and sensors reveal those differences<br>
  <input type="radio" name="sens-4" value="C"> Because sensors make the robot heavier<br>
  <input type="radio" name="sens-4" value="D"> It isn’t essential; open-loop control is always sufficient<br>
  <button type="button"
    onclick="checkTrueFalse('sens-4', 'B',
      '✅ Exactly! Sensors capture unmodeled disturbances so the controller can correct in real time.',
      '❌ Close! Think about uncertainty and the gap between theory and reality.')">
    Check Answer
  </button>
  <p id="sens-4-feedback"></p>
</form>

</details>

---

Here are two examples of usage of sensors for state of the art robots. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/wamsensors.png)
><sub>Examples of sensors mounted on an industrial arm; Credit: EPFL/LASA Laboratory</sub>

An industrial robot arm tasked to manover a shovel must be endowed with motor encoders for accurate positioning and orienting of the shovel, force/toque sensors at its end-effect to sense and react to change in the stiffness of the material, and tactile sensors at its fingertip to guarantee tight grip on the shovel.

<!-- ![img-description]({{ site.baseurl }}/assets/images/new_sensors/icubsensors.png)
><sub>Examples of sensors mounted on a humanoid robot; Credit: EPFL/LASA Laboratory</sub> -->

![img-description]({{ site.baseurl }}/assets/images/new_sensors/icubsensors.png)
><sub>This <a href="https://icub.iit.it/"> ICub Humanoid Robot</a> is endowed with high resolution binocular cameras for 3-dimensional rendering of the world and tactile sensors to perceive touch at its fingertips. All these sensors are necessary to reach and grab the red ball. Credit: EPFL/LASA Laboratory</sub>


A humanoid robot may be tasked to interact with its environment in more ways than would an industrial robot. In addition to motor encoders, force/torque and tactile sensors, it needs an IMU to measure its global orientation in space. Cameras and microphones are, on the other hand, crucial to allow the robot to interact in human-inhabited environments. 

---
## Course Content

### What is a sensor
{: #ch0 }

A **sensor** is a device that detects or measures a physical property, the **measurand** (e.g., distance, light, temperature, pressure, motion), and converts it into a signal that can be read, interpreted, and used by a computer.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/What_is_a_sensor.png)
><sub>Illustration of the sensing principle: a physical phenomenon (light) interacts with a sensor, which converts it into an electrical signal that can be processed. Image source : https://fity.club/lists/suggestions/types-of-electrical-sensors/ </sub>

<!-- $$
(\text{Physical quantity}) \;\xrightarrow{\text{Transduction}}\; (\text{Signal}) 
\;\xrightarrow{\text{A/D}}\; \text{Digital data}
$$ -->

> **Example:**  
> - A **light sensor** detects the intensity of light and converts it into a varying electrical signal.  
> - An **ultrasonic** sensor measures the time it takes for a sound pulse to bounce back from an object, then converts that into a distance value.
> - An **accelerometer** measures acceleration and outputs a voltage proportional to the force it experiences.

In robotics, sensors are essential because they provide the link between the robot and its environment. Without them, a robot would be “blind” and unable to adapt.

<details markdown="1">
 <summary>Video introduction</summary>

  Here is a small video explaining what sensors are and how they are used.

  ![](https://www.youtube.com/watch?v=XI49uFm5HRE&t)
  ><sub>*What is a Sensor? Different Types of Sensors, Applications . YouTube video, 19 August 2020. Available at: https://www.youtube.com/watch?v=XI49uFm5HRE&t*</sub>

</details>

---

#### The Ideal Sensor

To understand real sensors, it helps to imagine the **ideal sensor**, a theoretical device that:

| Property              | Ideal Behaviour                                                   |
|-----------------------|-------------------------------------------------------------------|
| **Perfect accuracy**  | Measures the true value with **no error**                         |
| **Noise-free**            | Output has **zero noise** (no random fluctuations)                                        |
| **Infinite resolution** | Detects the **smallest possible change** in the measurand       |
| **Instantaneous response** | Responds to changes with **no delay or lag**                 |
| **Selectivity**       | Respond **only** to the target measurand                          |
| **Immunity**          | Ignore all other influences (temperature, vibrations …)           |
| **Non-invasiveness**  | Leave the measurand unchanged                                     |
| **Perfect model**     | Known, usually linear, $y \propto x$                              |
| **Universal conditions** | Operates in **all environments** (temperature, lighting, etc.) |
| **Unlimited lifetime** | **Never degrades** or wears out over time                        |


The ideal sensor does not exist, but it is a useful reference. When designing a robot, it is useful to compare real sensors against this “perfect” baseline to reason about **range, resolution, noise, latency, linearity, drift,** and **environmental robustness**.

#### Sensor encoding: analog to digital converter

Sensors usually employ Analog-to-Digital Converter (ADC) to convert a continuous analog input signal into a discrete digital value, so as to ease computer interpretation. An ADC samples an analog quantity (such as voltage). It then quantizes that value into one of a finite number of digital codes. For an N-bit ADC, there are $2^N$ possible digital codes. For instance, a 3-bit ADC produces 8 codes: 000, 001, 010, 011, 100, 101, 110, 111. Each code corresponds to a small range of the analog input, often called a quantization level or bin.

#### Sensor imperfections 

Real sensors are always imperfect. They come with **limitations** and **trade-offs**, such as:

- **Noise** : Random variations in the signal, making readings uncertain.  
  >*Example:* an IMU yaw reading jitters even while the robot is stationary.

- **Limited range** : Every sensor has minimum and maximum values it can detect.  
  >*Example:* an ultrasonic module may only work from ~2 cm to ~4 m.

- **Finite resolution** : Sensors encoded in Analog-to-Digital Converter (ADC) can only detect changes above a threshold (quantization).  
  >*Example:* a 10-bit ADC over 3.3 V has ≈3.2 mV per LSB.

- **Accuracy vs precision** : A sensor may be consistent but biased, or accurate on average but inconsistent.  
  >*Example:* readings are tightly clustered but offset by +0.5 °C.

- **Latency** : Some sensors take time to respond or update slowly.  
  >*Example:* GPS typically updates at 1–10 Hz; barometers often require filtering.

- **Environmental sensitivity** : Performance may drop under certain conditions (lighting, temperature, materials, EMI, vibrations).  
  >*Example:* cameras in low light; sonar on soft or angled surfaces.

**Trade-off examples**
>- A **LiDAR** provides very accurate distance maps but is **expensive** and **power-hungry**.  
>- An **ultrasonic** sensor is **cheap and robust**, but has **low resolution** and can be **confused by certain materials**.  
>- A **camera** captures **rich information** but requires **heavy processing power** (and favorable lighting).

**Key takeaway:** A sensor is the robot’s window into the physical world. The “ideal” sensor helps us define what we want, but real sensors always involve trade-offs. Understanding those trade-offs is the first step to choosing the right sensor for a robotic application.

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: What is the primary role of a sensor in robotics?</strong></p>
<form id="ch0-q1">
  <input type="radio" name="ch0-q1" value="A"> To convert physical quantities into signals usable by a computer<br>
  <input type="radio" name="ch0-q1" value="B"> To control the actuators directly<br>
  <input type="radio" name="ch0-q1" value="C"> To store data permanently<br>
  <input type="radio" name="ch0-q1" value="D"> To generate movement<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q1', 'A',
      '✅ Correct! A sensor translates a property of the environment into a usable signal.',
      '❌ Not quite. Sensors measure, they don’t directly control or generate movement.')">
    Check Answer
  </button>
  <p id="ch0-q1-feedback"></p>
</form>

<!-- Question 2 -->
<p><strong>Question 2: In the chain <em>Physical Quantity → Sensor → Signal → A/D → Digital data</em>, what does the A/D step represent?</strong></p>
<form id="ch0-q2">
  <input type="radio" name="ch0-q2" value="A"> Amplification of the signal<br>
  <input type="radio" name="ch0-q2" value="B"> Analog-to-Digital conversion<br>
  <input type="radio" name="ch0-q2" value="C"> Automatic decision-making<br>
  <input type="radio" name="ch0-q2" value="D"> Adjustment for noise<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q2', 'B',
      '✅ Correct! A/D is the Analog-to-Digital conversion step.',
      '❌ Careful. A/D refers specifically to turning analog signals into digital form.')">
    Check Answer
  </button>
  <p id="ch0-q2-feedback"></p>
</form>

<!-- Question 3 -->
<p><strong>Question 3: Which of the following is <em>not</em> an example of a sensor?</strong></p>
<form id="ch0-q3">
  <input type="radio" name="ch0-q3" value="A"> Ultrasonic distance module<br>
  <input type="radio" name="ch0-q3" value="B"> Accelerometer<br>
  <input type="radio" name="ch0-q3" value="C"> DC motor<br>
  <input type="radio" name="ch0-q3" value="D"> Temperature probe<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q3', 'C',
      '✅ Correct! A DC motor is an actuator, not a sensor.',
      '❌ Try again. Remember, sensors measure properties, actuators cause motion.')">
    Check Answer
  </button>
  <p id="ch0-q3-feedback"></p>
</form>

<!-- Question 4 -->
<p><strong>Question 4: Which statement correctly distinguishes accuracy and precision?</strong></p>
<form id="ch0-q4">
  <input type="radio" name="ch0-q4" value="A"> Accuracy is repeatability; precision is closeness to truth<br>
  <input type="radio" name="ch0-q4" value="B"> Precision is closeness to truth; accuracy is repeatability<br>
  <input type="radio" name="ch0-q4" value="C"> Accuracy is closeness to the true value; precision is repeatability<br>
  <input type="radio" name="ch0-q4" value="D"> They mean the same thing<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q4', 'C',
      '✅ Correct! Accuracy = closeness to truth; precision = repeatability/spread.',
      '❌ Not quite. Accuracy is about truth; precision is about spread/repeatability.')">
    Check Answer
  </button>
  <p id="ch0-q4-feedback"></p>
</form>

<!-- Question 5 -->
<p><strong>Question 5: A camera struggles in low light. Which limitation best describes this?</strong></p>
<form id="ch0-q5">
  <input type="radio" name="ch0-q9" value="A"> Environmental sensitivity<br>
  <input type="radio" name="ch0-q9" value="B"> Non-invasiveness<br>
  <input type="radio" name="ch0-q9" value="C"> Infinite resolution<br>
  <input type="radio" name="ch0-q9" value="D"> Unlimited lifetime<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q5', 'A',
      '✅ Correct! Performance depends on illumination, an environmental factor.',
      '❌ Think about how lighting conditions affect the sensor.')">
    Check Answer
  </button>
  <p id="ch0-q5-feedback"></p>
</form>
</details>

<!-- 

#### 0.4 **Key Sensor Characteristics** 
{: .no_toc }

| Category | Typical values / notes |
|----------|------------------------|
| **Active vs Passive** | Active sensors inject energy (radar, lidar); passive rely on ambient energy (camera, thermistor). |
| **Proprioceptive vs Exteroceptive** | Measures robot’s internal state (encoders) or the environment (ultrasonic range finder). |
| **Range** | Valid input span, e.g. 0–10 m or ±200 °C. |
| **Bandwidth / Frequency response** | How fast the sensor can track changes (Hz). |
| **Sampling rate** | *Discrete-time counterpart of bandwidth*—maximum number of samples per second (e.g. 200 Hz IMU, 30 fps camera). |
| **Dynamic range** | Ratio between largest and smallest measurable signals (often in dB). |
| **Sensitivity** | Slope $\partial y / \partial x$; units e.g. mV / °C. |
| **Linearity** | Deviation of $f(x)$ from a straight line across range. |
| **Cross-sensitivity** | Undesired response to a second quantity (e.g. force sensor drifting with temperature). |

<details markdown="1">
  <summary>Conceptual Questions</summary>


<p><strong>Question 1: In the relation&nbsp;$y = f(x) + \varepsilon$, what does the term&nbsp;$\varepsilon$ represent?</strong></p>
<form id="ch0-q1">
  <input type="radio" name="ch0-q1" value="A"> The ideal, noise-free output<br>
  <input type="radio" name="ch0-q1" value="B"> The sensor’s transfer function<br>
  <input type="radio" name="ch0-q1" value="C"> Noise, bias and other error sources<br>
  <input type="radio" name="ch0-q1" value="D"> The measured physical quantity<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q1', 'C',
      '✅ Correct! $\\varepsilon$ lumps together all deviations from the ideal transfer function.',
      '❌ Not quite. $\\varepsilon$ captures the imperfections the sensor introduces.')">
    Check Answer
  </button>
  <p id="ch0-q1-feedback"></p>
</form>

<p><strong>Question 2: Which feature is <em>not</em> part of the definition of an <em>ideal</em> sensor?</strong></p>
<form id="ch0-q2">
  <input type="radio" name="ch0-q2" value="A"> Responds only to the target measurand<br>
  <input type="radio" name="ch0-q2" value="B"> Has infinite dynamic range<br>
  <input type="radio" name="ch0-q2" value="C"> Does not influence the measured property<br>
  <input type="radio" name="ch0-q2" value="D"> Has a known, usually linear, $y \propto x$ relationship<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q2', 'B',
      '✅ Correct! Infinite dynamic range was never listed; range limits always exist.',
      '❌ Think again. Which option was <em>not</em> in the table of ideal sensor traits?')">
    Check Answer
  </button>
  <p id="ch0-q2-feedback"></p>
</form>


<p><strong>Question 3: The <em>smallest input change</em> a sensor can detect is called:</strong></p>
<form id="ch0-q3">
  <input type="radio" name="ch0-q3" value="A"> Accuracy<br>
  <input type="radio" name="ch0-q3" value="B"> Precision<br>
  <input type="radio" name="ch0-q3" value="C"> Resolution<br>
  <input type="radio" name="ch0-q3" value="D"> Linearity<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q3', 'C',
      '✅ Correct! Resolution sets the minimum detectable step.',
      '❌ Recall the definitions of accuracy, precision and resolution.')">
    Check Answer
  </button>
  <p id="ch0-q3-feedback"></p>
</form>


<p><strong>Question 4: A force sensor whose reading drifts when the ambient temperature changes suffers primarily from:</strong></p>
<form id="ch0-q4">
  <input type="radio" name="ch0-q4" value="A"> Poor bandwidth<br>
  <input type="radio" name="ch0-q4" value="B"> Cross-sensitivity<br>
  <input type="radio" name="ch0-q4" value="C"> Low dynamic range<br>
  <input type="radio" name="ch0-q4" value="D"> High precision<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q4', 'B',
      '✅ Correct! Temperature is an unwanted secondary measurand influencing the output.',
      '❌ Hint: the problem is sensitivity to something <em>other than</em> force.')">
    Check Answer
  </button>
  <p id="ch0-q4-feedback"></p>
</form>


<p><strong>Question 5: Which of these sensors is <em>active</em> rather than passive?</strong></p>
<form id="ch0-q5">
  <input type="radio" name="ch0-q5" value="A"> Thermistor<br>
  <input type="radio" name="ch0-q5" value="B"> Monocular RGB camera<br>
  <input type="radio" name="ch0-q5" value="C"> 2-D radar altimeter<br>
  <input type="radio" name="ch0-q5" value="D"> Barometric pressure sensor<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q5', 'C',
      '✅ Correct! Radar emits its own radio waves, making it an active sensor.',
      '❌ Remember: active sensors inject energy into the environment.')">
    Check Answer
  </button>
  <p id="ch0-q5-feedback"></p>
</form>


<p><strong>Question 6: <em>Dynamic range</em> is best described as:</strong></p>
<form id="ch0-q6">
  <input type="radio" name="ch0-q6" value="A"> The time delay between input and output<br>
  <input type="radio" name="ch0-q6" value="B"> The ratio of the largest to smallest measurable signals<br>
  <input type="radio" name="ch0-q6" value="C"> The slope $\partial y / \partial x$<br>
  <input type="radio" name="ch0-q6" value="D"> The statistical spread of repeated measurements<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q6', 'B',
      '✅ Correct! Dynamic range is often quoted in dB as that ratio.',
      '❌ Check the definition table in Section 0.4.')">
    Check Answer
  </button>
  <p id="ch0-q6-feedback"></p>
</form>


<p><strong>Question 7: True or False – A highly precise sensor is always accurate.</strong></p>
<form id="ch0-q7">
  <input type="radio" name="ch0-q7" value="True"> True<br>
  <input type="radio" name="ch0-q7" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch0-q7', 'False',
      '✅ Correct! Data can be tightly clustered (precise) yet biased (inaccurate).',
      '❌ Precision and accuracy are not the same thing.')">
    Check Answer
  </button>
  <p id="ch0-q7-feedback"></p>
</form>

</details> -->


---

### Characteristics of Sensors
{: #ch1 }


#### Units & Scales

Every sensor output is ultimately expressed in a **physical unit** defined by the International System of Units (SI).

| Quantity | Base unit (symbol) | Typical sensor example |
|----------|-------------------|------------------------|
| Length | metre (m) | Laser range-finder |
| Mass | kilogram (kg) | Load cell |
| Time | second (s) | Real-time clock |
| Electric current | ampere (A) | Current probe |
| Temperature | kelvin (K) or °C | Thermistor, RTD |
| Luminous intensity | candela (cd) | Photodiode |
| Amount of substance | mole (mol) | Gas sensor |

For robots, it’s important to always check what units a sensor outputs and whether conversion or calibration is needed.

**Example**: 
>A temperature sensor might output a voltage that corresponds to °C, but you need to apply a formula (e.g., 10 mV per °C).

---

#### Measurement Range

*Range* is the interval $$[x_{\min},\,x_{\max}]$$ within which the sensor maintains its specified performance.

> **Example** A TMP36 analog temperature sensor typically has a range of  
> $$x_{\min} = -40\,^\circ\mathrm{C} \quad \text{to} \quad x_{\max} = 125\,^\circ\mathrm{C}.$$  
> Temperatures beyond this window may cause incorrect readings or permanent damage.


Key rules:

1. A wider range prevents saturation but often reduces resolution.  
2. Outside the range, data is *invalid*.

---

#### Resolution

Resolution is the **smallest input increment** $\Delta x_{\text{min}}$  a system can detect. 

* For an **ADC-based sensor**, the resolution is determined by the maximal number of bits \(N\) one can use to encode the signal:  
  $$\Delta x_{\text{min}} = \tfrac{\text{FS}}{2^N}$$  
  where \(N\) = number of bits, and FS the Full Scale of sensor measurement.
  
A measurement smaller than $\Delta x_{\text{min}}$ can not be perceived by the sensor

> **Example** A Potentiometer placed on a motor shaft can measure the displacement of the robot joint moved by that motor. The potentiometer outputs a continuous analog voltage
> (e.g., 0–5 V) proportional to the angle that can then be converted into a digital signal with an ADC. 
> If one uses a 8-bit ADC encoder and the joint can move ±90 degrees, the resolution is: 
> $$\Delta x_{\text{min}} = \frac{180\,\text{g}}{2^{8}} \approx 0.7\,\text{degrees}.$$
> A resolution of less than 1 degree may be insufficient for generating highly accurate displacements. In a robot arm, such angular imprecision accumulates along the kinematic
> chain, resulting in significant positional error at the end effector.

* For an **analog sensor**, the resolution is determined by the sensor's physics and construction. For instance, the sensor's material properties (e.g. resistive or capacitive elements) may limit what it can respond to. Additionally, mechanical tolerances (e.g., friction, backlash) may further reduce resolution.

The resolution and range of measurement of a sensor is usually documented in the manufacturer's datasheet.

---

#### Accuracy & Precision

When evaluating a sensor, two related but distinct concepts often come up: **accuracy** and **precision**. These terms are sometimes confused, but they describe different aspects of measurement quality.

- **Accuracy** is about how close the average measurement is to the true or reference value.

  $$
  \text{Accuracy Error} = \big|\bar{y} - y_{\text{true}}\big|
  $$  

- **Precision (Repeatability)** is about how close repeated measurements are to one another, regardless of whether they are correct on average.

  $$
  \sigma_{\text{rep}} = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(y_i-\bar{y})^2}\,.
  $$

The dartboard analogy below is a classic way to illustrate this difference:

![img-description]({{ site.baseurl }}/assets/images/new_sensors/precision_accuracy.png)
><sub>Precision and accuracy. Website image. Available at: https://www.antarcticglaciers.org/glacial-geology/dating-glacial-sediments-2/precision-and-accuracy-glacial-geology/</sub>


| Quadrant | Accuracy | Precision | Interpretation |
|----------|----------|-----------|----------------|
| **Top-left**  | Low | Low  | Measurements scattered & far from truth. |
| **Top-right** | Low | High | Tight cluster offset from truth → **systematic bias**. |
| **Bottom-left** | High | Low | Centred on truth but large scatter → **high random noise**. |
| **Bottom-right** | High | High | Ideal sensor: tight cluster around true value. |


**Key take-aways:**

1. A sensor can be **precise yet inaccurate** (systematic bias) or **accurate yet imprecise** (large random scatter).  
2. Calibration removes bias to improve *accuracy*; filtering averages out noise to improve *precision*.
3. While a sensor may be highly accurate, the resolution of the sensor's ADC may reduce this accuracy to the lowest resolution of its encoder.

<details markdown="1">
 <summary>Video Explaining Accuracy and Precision</summary>

  A short video that illustrates the concepts of accuracy and precision in the context of sensors.

  ![](https://www.youtube.com/watch?v=KEeSQvMCPLg)
  ><sub>Accuracy and Precision | It's Easy! . YouTube video, 06.11.2017. Available at: https://www.youtube.com/watch?v=KEeSQvMCPLg</sub>

</details>

When controling a robot, knowing the sensor’s resolution, precision and accuracy is crucial, as it can constrain or even rule out certain actions. For example, if distances to objects cannot be measured with a resolution or accuracy finer than 10 cm, the robot must operate with great caution when moving close to objects. 

---

#### Noise

*Noise* is any undesired variation added to a measurement. It limits how well we can estimate the true value, even when the sensor is otherwise “perfect.”

We model a measured signal \(y(t)\) as:
$$
y(t) \;=\; x(t) \;+\; b \;+\; \varepsilon(t)
$$
where $x(t)$ is the true signal, $b$ is a (possibly time/temperature-dependent) **bias** (systematic error), and $\varepsilon(t)$ is **random noise**.

To understand and manage noise effectively, it is important to distinguish between **random noise**, which is unpredictable and varies from reading to reading, and **systematic errors**, which are repeatable biases built into the measurement process.


-**Random noise** (stochastic, zero-mean)  
Unpredictable jitter that causes repeated readings to fluctuate around the true value.

>-**Examples**
>- A distance sensor reports 100.2, 99.8, 100.5, 100.1 cm while the target is fixed at 100 cm.
>- A light sensor varies slightly due to mains flicker or transient shadows.
>- An IMU yaw estimate wanders by about ±0.2° when the platform is stationary.

-**Mitigation**  
Averaging or low-pass filtering. If the standard deviation of single readings is $\sigma$, averaging $M$ independent readings yields approximately
$$
\sigma_{\text{avg}} \approx \frac{\sigma}{\sqrt{M}}.
$$
This reduces scatter but increases latency.

-**Systematic noise (errors)** (deterministic, repeatable)  
Consistent deviations that bias measurements in a fixed direction. Averaging does **not** remove these; **calibration** is required.

>**Examples**
>- **Bias/offset**: A thermometer consistently reads $+2\,^\circ\mathrm{C}$ high.  
>- **Scale factor error**: Wheel odometry overestimates distance because the wheel diameter is set too large, reporting $1.02\times$ the true travel.  
>- **Misalignment**: A range sensor tilted upward returns longer distances than actual.  
>- **Drift**: A sensor’s output shifts gradually with warm-up or supply voltage changes.

-**Mitigation**  
Zeroing and multi-point calibration (to remove bias and correct scale), improved mounting/alignment, temperature compensation, stable power, and appropriate warm-up time.

> **Rule of thumb**  
> Use **calibration** to remove *systematic* errors; use **filtering/averaging** to reduce *random* noise.

<details markdown="1">
 <summary>Videos</summary>

  Two short videos provide additional context: the first introduces the concept of noise in sensors, while the second explains the distinction between random and systematic errors.


  ![](https://www.youtube.com/watch?v=cPm3ii1ngmw)
  ><sub>*Whats's the Noise about Sensor Technology? . YouTube video, 17.11.2016. Available at: https://www.youtube.com/watch?v=cPm3ii1ngmw*</sub>

  ![](https://www.youtube.com/watch?v=huDRfgbc1HA)
  ><sub>*Random and systematic error explained: from fizzics.org . YouTube video, 15.02.2021. Available at: https://www.youtube.com/watch?v=huDRfgbc1HA*</sub>
</details>

---

#### Response Time & Bandwidth

A sensor’s **dynamic performance** determines how well it tracks changes over time. Two core notions are used:

- **Response time**: how quickly the output reacts to a change at the input (latency, rise/settling time).
- **Bandwidth**: the highest signal frequency the sensor and its electronics can follow with acceptable attenuation and phase lag.

**First-order model**  
Many sensors can be approximated by a first-order low-pass system with time constant $\tau$:
$$
y(t)=x_0\big(1-e^{-t/\tau}\big)\quad\text{(step input)}.
$$
Common timing metrics include:
- **Rise time** $t_r$: time to move from 10% to 90% of the final value (about $2.2\tau$ for a first-order system).
- **Settling time** $t_s$: time to enter and remain within $\pm2\%$ of the final value (about $4\tau$).
- **Latency**: total end-to-end delay (sensor physics, internal filtering, communication, and processing).

The corresponding $-3$ dB bandwidth is
$$
f_{3\text{dB}}\approx\frac{1}{2\pi\tau},
$$
the frequency at which amplitude falls to roughly $70\%$ and phase lag becomes appreciable.

**Update rate, bandwidth, and latency are distinct**  
- **Update/sample rate** $f_s$: how often samples are produced (e.g., 100 Hz IMU, 30 fps camera).
- **Bandwidth** $f_{3\text{dB}}$: how rapidly the *content* may vary without being smoothed away.
- **Latency**: the delay before a change appears in the data stream.

A device may output at $f_s=1\,\text{kHz}$ yet exhibit a small **bandwith** due to internal filtering, with several milliseconds of **latency**.

**Sampling and aliasing**  
To represent a signal with highest relevant frequency $f_{\text{signal}}$, the sampling frequency should satisfy
$$
f_s\ge 2\,f_{\text{signal}}\quad\text{(Nyquist criterion)}.
$$
In feedback control, $f_s$ in the range $5\text{–}10\times f_{\text{signal}}$ is commonly selected to preserve phase margin. An anti-alias filter is typically applied so that content above $f_s/2$ is attenuated prior to sampling.

**Effect of filtering**  
Filters reduce noise at the cost of delay. A simple $M$-point moving average introduces a group delay
$$
\text{delay}\approx\frac{M-1}{2\,f_s},
$$
and lowers effective bandwidth roughly in proportion to $M$. Digital filter cutoffs should therefore be configured to avoid excessive lag when responsiveness is critical.

> **Example 1 — Temperature probe**  
> For $\tau=5\,\text{s}$, $t_s\approx20\,\text{s}$ and $f_{3\text{dB}}\approx\frac{1}{2\pi\cdot5}\approx0.032\,\text{Hz}$ (period $\sim31\,\text{s}$). Suitable for slow variations; unsuitable for fast control.

> **Example 2 — Quadcopter attitude**  
> If body-rate content extends to $f_{\text{signal}}\approx10\,\text{Hz}$, an IMU bandwidth $\ge100\,\text{Hz}$ and sample rate $f_s\approx1\,\text{kHz}$ are typical. End-to-end latency $\lesssim10\,\text{ms}$ (preferably a few ms) supports stable control.

> **Example 3 — Ultrasonic ranging on a rover**  
> Round-trip time to $4\,\text{m}$ is approximately $2\cdot4/343\approx0.023\,\text{s}$, plus processing, leading to tens of milliseconds latency and update rates around $10\text{–}20\,\text{Hz}$. Adequate for slow navigation; inadequate for high-speed avoidance.

**Practical guidelines**
1. The highest relevant signal frequency $f_{\text{signal}}$ should be identified from task dynamics.  
2. Sensor bandwidth should satisfy $f_{3\text{dB}}\gtrsim2\,f_{\text{signal}}$ (preferably higher), and the sample rate $f_s\gtrsim5\text{–}10\,f_{\text{signal}}$.  
3. Latency should be budgeted across the entire pipeline (sensor → bus → driver → estimator).  
4. Dynamic performance should be validated on the platform by injecting steps, ramps, or sinusoids and measuring $t_s$, $\tau$, and phase lag.

**Key takeaway**  
High-speed robotic systems require sensors with sufficient bandwidth and low end-to-end latency. Bandwidth and sampling choices should reflect task dynamics, and filtering should be treated as a trade-off between noise reduction and delayed response.

<details markdown="1">
 <summary>Videos</summary>

  Two short videos provide additional context: the first introduces the concept of aliasing and the Nyquist theorem, while the second explains what the terme Bandwith means.


  ![](https://www.youtube.com/watch?v=IZJQXlbm2dU&t)
  ><sub>*What is aliasing and the Nyquist theorem? . YouTube video, 04.03.2022. Available at: https://www.youtube.com/watch?v=IZJQXlbm2dU&t*</sub>

  ![](https://www.youtube.com/watch?v=whUkZUORix0)
  ><sub>*What is Bandwidth? (Bandwidth and Signal Processing) . YouTube video, 21.08.2017. Available at: https://www.youtube.com/watch?v=whUkZUORix0*</sub>
</details>


<details markdown="1">
 <summary>Conceptual questions</summary>
<!-- ========================= -->
<!-- Chapter 1: Practice Items -->
<!-- ========================= -->

<!-- ========== 1.1 Units & Scales ========== -->

<!-- ========== 1.2 Measurement Range ========== -->

<p><strong>Question 3: The <em>measurement range</em> of a sensor is best described as:</strong></p>
<form id="ch1-q3">
  <input type="radio" name="ch1-q3" value="A"> The smallest input change that can be detected<br>
  <input type="radio" name="ch1-q3" value="B"> The interval $[x_{\min}, x_{\max}]$ where specifications hold<br>
  <input type="radio" name="ch1-q3" value="C"> The average error relative to the true value<br>
  <input type="radio" name="ch1-q3" value="D"> The time to reach 90% of a step input<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q3', 'B',
      '✅ Correct! Range is the valid interval $[x_{\min}, x_{\max}]$ with specified performance.',
      '❌ Review the definition of range in Section 1.2.')">
    Check Answer
  </button>
  <p id="ch1-q3-feedback"></p>
</form>

<p><strong>Question 4: True or False : Data measured outside the specified range should be considered invalid.</strong></p>
<form id="ch1-q4">
  <input type="radio" name="ch1-q4" value="True"> True<br>
  <input type="radio" name="ch1-q4" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q4', 'True',
      '✅ Correct! Outside-range readings may saturate or be misleading.',
      '❌ Outside the range, performance is not guaranteed and readings are unreliable.')">
    Check Answer
  </button>
  <p id="ch1-q4-feedback"></p>
</form>

<hr>

<!-- ========== 1.3 Resolution ========== -->

<p><strong>Question 5: An ADC spans 0–5 V with $N=10$ bits. What is the ideal voltage resolution?</strong></p>
<form id="ch1-q5">
  <input type="radio" name="ch1-q5" value="A"> $5/512 \approx 9.77$ mV<br>
  <input type="radio" name="ch1-q5" value="B"> $5/1024 \approx 4.88$ mV<br>
  <input type="radio" name="ch1-q5" value="C"> $5/2048 \approx 2.44$ mV<br>
  <input type="radio" name="ch1-q5" value="D"> $5/256 \approx 19.5$ mV<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q5', 'B',
      '✅ Correct! $\Delta x_{\min}=\mathrm{FS}/2^N=5/1024\ \mathrm{V}\approx4.88$ mV.',
      '❌ Use $\Delta x_{\min}=\mathrm{FS}/2^N$ with FS = 5 V and $N=10$.')">
    Check Answer
  </button>
  <p id="ch1-q5-feedback"></p>
</form>

<p><strong>Question 6: True or False : Higher resolution guarantees higher accuracy.</strong></p>
<form id="ch1-q6">
  <input type="radio" name="ch1-q6" value="True"> True<br>
  <input type="radio" name="ch1-q6" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q6', 'False',
      '✅ Correct! Resolution concerns smallest detectable step; accuracy depends on bias, linearity, calibration.',
      '❌ Resolution and accuracy measure different aspects.')">
    Check Answer
  </button>
  <p id="ch1-q6-feedback"></p>
</form>

<hr>

<!-- ========== 1.4 Accuracy & Precision ========== -->

<p><strong>Question 7: Which statement best defines <em>precision</em>?</strong></p>
<form id="ch1-q7">
  <input type="radio" name="ch1-q7" value="A"> Closeness of the average to the true value<br>
  <input type="radio" name="ch1-q7" value="B"> Closeness of repeated measurements to each other<br>
  <input type="radio" name="ch1-q7" value="C"> The maximum measurable value<br>
  <input type="radio" name="ch1-q7" value="D"> The derivative $\partial y/\partial x$<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q7', 'B',
      '✅ Correct! Precision is repeatability (tight clustering).',
      '❌ Accuracy relates to closeness to truth; precision is about repeatability.')">
    Check Answer
  </button>
  <p id="ch1-q7-feedback"></p>
</form>

<p><strong>Question 8: True or False : Averaging many measurements removes systematic bias.</strong></p>
<form id="ch1-q8">
  <input type="radio" name="ch1-q8" value="True"> True<br>
  <input type="radio" name="ch1-q8" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q8', 'False',
      '✅ Correct! Averaging reduces random noise but does not remove bias; calibration addresses bias.',
      '❌ Averaging combats random noise, not systematic error.')">
    Check Answer
  </button>
  <p id="ch1-q8-feedback"></p>
</form>

<hr>

<!-- ========== 1.5 Noise ========== -->

<p><strong>Question 9: Which of the following is a <em>systematic</em> error?</strong></p>
<form id="ch1-q9">
  <input type="radio" name="ch1-q9" value="A"> Readings fluctuating ±0.2 °C due to electrical interference<br>
  <input type="radio" name="ch1-q9" value="B"> A thermometer consistently reading $+2\,^\circ\mathrm{C}$ high<br>
  <input type="radio" name="ch1-q9" value="C"> Random encoder jitter at standstill<br>
  <input type="radio" name="ch1-q9" value="D"> Shot noise in a photodiode<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q9', 'B',
      '✅ Correct! A constant offset is a systematic (bias) error.',
      '❌ Systematic errors are repeatable biases; random fluctuations are not.')">
    Check Answer
  </button>
  <p id="ch1-q9-feedback"></p>
</form>

<p><strong>Question 10: True or False : Averaging $M$ independent samples reduces the standard deviation approximately by $1/\sqrt{M}$.</strong></p>
<form id="ch1-q10">
  <input type="radio" name="ch1-q10" value="True"> True<br>
  <input type="radio" name="ch1-q10" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q10', 'True',
      '✅ Correct! $\sigma_{\text{avg}}\approx\sigma/\sqrt{M}$ for independent, zero-mean noise.',
      '❌ See the averaging relation in Section 1.5.')">
    Check Answer
  </button>
  <p id="ch1-q10-feedback"></p>
</form>

<hr>

<!-- ========== 1.6 Response Time & Bandwidth ========== -->

<p><strong>Question 11: For a first-order sensor with time constant $\tau$, which relation holds for the $-3$ dB bandwidth?</strong></p>
<form id="ch1-q11">
  <input type="radio" name="ch1-q11" value="A"> $f_{3\text{dB}}=\dfrac{1}{\tau}$<br>
  <input type="radio" name="ch1-q11" value="B"> $f_{3\text{dB}}=\dfrac{1}{2\pi\tau}$<br>
  <input type="radio" name="ch1-q11" value="C"> $f_{3\text{dB}}=2\pi\tau$<br>
  <input type="radio" name="ch1-q11" value="D"> $f_{3\text{dB}}=\tau$<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q11', 'B',
      '✅ Correct! $f_{3\text{dB}} \approx 1/(2\pi\tau)$ for a first-order low-pass.',
      '❌ Review the time constant–bandwidth relation in Section 1.6.')">
    Check Answer
  </button>
  <p id="ch1-q11-feedback"></p>
</form>

<p><strong>Question 12: True or False : A 1 kHz sample rate implies a 1 kHz sensor bandwidth.</strong></p>
<form id="ch1-q12">
  <input type="radio" name="ch1-q12" value="True"> True<br>
  <input type="radio" name="ch1-q12" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-q12', 'False',
      '✅ Correct! Sample rate $f_s$ differs from bandwidth; internal filtering and dynamics often make bandwidth lower.',
      '❌ Update rate, bandwidth, and latency are distinct quantities (see Section 1.6).')">
    Check Answer
  </button>
  <p id="ch1-q12-feedback"></p>
</form>
</details>

<!-- ================================================ -->
<!-- Harder multi-part problem combining Ch. 1 topics -->
<!-- ================================================ -->
<details markdown="1">
<summary>Mathematical Problem</summary>
<p><strong>Comprehensive Problem (Range, Resolution, Accuracy/Precision, Noise, Response Time & Bandwidth)</strong></p>

<p>
A temperature measurement chain is designed as follows:
</p>
<ul>
  <li>Physical span: maps from <code>-40&nbsp;°C</code> to <code>+125&nbsp;°C</code> into <code>0–5 V</code> (span <code>165&nbsp;°C</code>).</li>
  <li>ADC: ideal, <code>12-bit</code>, full-scale <code>0–5 V</code>.</li>
  <li>Uncalibrated sensor bias: <code>+0.6&nbsp;°C</code> (systematic; constant over the range).</li>
  <li>Random noise per sample: <code>&sigma; = 0.30&nbsp;°C</code> (zero-mean, independent between samples).</li>
  <li>Sensor dynamics: first-order low-pass with time constant <code>&tau; = 0.8&nbsp;s</code>.</li>
  <li>Sampling rate: <code>f<sub>s</sub> = 10&nbsp;Hz</code>. A simple moving average of <code>M</code> samples is applied before logging.</li>
  <li>Application: The control loop may contain temperature oscillations up to <code>0.20&nbsp;Hz</code>.</li>
</ul>

<p><em>Tasks:</em> Enter numerical answers (rounded sensibly). The checker accepts small tolerances.</p>

<form id="ch1-hard">
  <ol>
    <li>
      ADC <em>temperature resolution per LSB</em> (in °C): 
      <input type="number" id="hard-delta" step="0.0001" placeholder="°C/LSB">
    </li>
    <li>
      Quantization noise standard deviation <em>&sigma;<sub>q</sub></em> (in °C), assuming uniform quantization: 
      <input type="number" id="hard-sigmaq" step="0.0001" placeholder="°C">
    </li>
    <li>
      Minimum moving-average length <em>M</em> to achieve post-filter standard deviation <code>&le; 0.10&nbsp;°C</code>: 
      <input type="number" id="hard-M" step="1" placeholder="integer">
    </li>
    <li>
      Group delay introduced by that moving average (in seconds): 
      <input type="number" id="hard-delay" step="0.01" placeholder="s">
    </li>
    <li>
      Sensor <em>$-3$ dB bandwidth</em> <code>f<sub>3dB</sub></code> from <code>&tau = 0.8&nbsp;s</code> (in Hz): 
      <input type="number" id="hard-f3db" step="0.001" placeholder="Hz">
    </li>
    <li>
      First-order amplitude ratio at <code>0.20&nbsp;Hz</code> (i.e., output/input magnitude; 0–1): 
      <input type="number" id="hard-atten" step="0.001" placeholder="ratio">
    </li>
    <li>
      Post-average random standard deviation using your <em>M</em> (in °C): 
      <input type="number" id="hard-sigmaavg" step="0.001" placeholder="°C">
    </li>
    <li>
      Uncalibrated accuracy error magnitude due to bias (in °C): 
      <input type="number" id="hard-bias" step="0.1" placeholder="°C">
    </li>
  </ol>

  <button type="button" onclick="checkCh1Hard()">Check Answers</button>
  <p id="ch1-hard-feedback"></p>
</form>
</details>

<details markdown="1">
<summary>Show Full Worked Solution</summary>

**1) ADC resolution (°C/LSB):**  
The temperature span is $165\,^\circ\mathrm{C}$ over $2^{12}=4096$ codes, so  

$$
\Delta T_{\text{LSB}} = \frac{165}{4096}\,^\circ\mathrm{C} \;\approx\; 0.0403\,^\circ\mathrm{C/LSB}.
$$

---

**2) Quantization noise (std):**  
For uniform quantization, $\sigma_q = \Delta/\sqrt{12}$, hence  

$$
\sigma_q \;\approx\; \frac{0.0403}{\sqrt{12}}\,^\circ\mathrm{C} \;\approx\; 0.0116\,^\circ\mathrm{C}.
$$

---

**3) Minimum $M$ for post-filter $\leq 0.10\,^\circ\mathrm{C}$:**  
Single-sample random standard deviation combines as  

$$
\sigma_{\text{single}} = \sqrt{\sigma^2 + \sigma_q^2}, \qquad \sigma = 0.30\,^\circ\mathrm{C},
$$

so  

$$
\sigma_{\text{single}} \;\approx\; \sqrt{0.30^2 + 0.0116^2} \;\approx\; 0.3002\,^\circ\mathrm{C}.
$$

Averaging $M$ independent samples gives  

$$
\sigma_{\text{avg}} = \frac{\sigma_{\text{single}}}{\sqrt{M}}.
$$

Require $\sigma_{\text{avg}} \leq 0.10$, so  

$$
M \;\geq\; \left(\frac{0.3002}{0.10}\right)^2 \approx 9.01 \;\;\Rightarrow\;\; M_{\min}=10.
$$

---

**4) Moving-average delay:**  
For a length-$M$ moving average at $f_s=10\,\mathrm{Hz}$, group delay is  

$$
\text{delay} \;\approx\; \frac{M-1}{2 f_s}.
$$

With $M=10$:  

$$
\text{delay} = \frac{9}{20} = 0.45\,\mathrm{s}.
$$

---

**5) Sensor $-3$ dB bandwidth:**  
For a first-order system,  

$$
f_{3\text{dB}} = \frac{1}{2\pi\tau}.
$$

With $\tau=0.8\,\mathrm{s}$:  

$$
f_{3\text{dB}} = \frac{1}{2\pi\cdot 0.8}\,\mathrm{Hz} \;\approx\; 0.199\,\mathrm{Hz}.
$$

---

**6) First-order amplitude ratio at $f=0.20\,\mathrm{Hz}$:**  
Let $r = f/f_{3\text{dB}}$, with magnitude  

$$
|H(j2\pi f)| = \frac{1}{\sqrt{1+r^2}}.
$$

For $f=0.20\,\mathrm{Hz}$:  

$$
r = \frac{0.20}{0.199} \approx 1.005, \qquad |H| \approx \frac{1}{\sqrt{1+1.005^2}} \approx 0.705.
$$

Thus about $70.5\%$ of the amplitude passes (≈ $-3.0$ dB).

---

**7) Post-average random std with $M=10$:**  

$$
\sigma_{\text{avg}} = \frac{0.3002}{\sqrt{10}}\,^\circ\mathrm{C} \;\approx\; 0.0949\,^\circ\mathrm{C}.
$$

---

**8) Uncalibrated accuracy error:**  
The systematic bias contributes an absolute error of  

$$
|\text{bias}| = 0.6\,^\circ\mathrm{C}.
$$

---

**Notes & cross-checks:**  
- The measurement range includes the expected operating window (e.g., $[-20,110]\,^\circ\mathrm{C}$) since it lies within $[-40,125]\,^\circ\mathrm{C}$.  
- Nyquist for $0.20\,\mathrm{Hz}$ content is $f_s \geq 0.40\,\mathrm{Hz}$; here $f_s=10\,\mathrm{Hz}$ is ample.  
- The total latency includes the sensor’s lag (from $\tau$) plus digital filtering delay; both influence controller stability (see §1.6).  

</details>





---

### Proprioceptive Sensors
{: #ch2 }

Proprioceptive sensors measure a robot’s **internal state** (joint positions/velocities, body rates, torques/currents, temperatures, power). In contrast, *exteroceptive sensing* observes the external environment (e.g., range to obstacles, images of the scene). 

In the following figure, a humanoid robot demonstrates the use of multiple proprioceptive sensors to estimate its internal state. The robot employs an inertial measurement unit (IMU) to determine its orientation and body motion, joint encoders to measure joint positions, and force–torque sensors to monitor internal loads and interaction forces. Tactile sensors embedded in the fingertips provide additional feedback on contact conditions. Together, these sensors enable precise estimation and control of the robot’s posture and movement. In addition to these proprioceptive sensors, the robot is also equipped with cameras and microphones, exteroceptive sensors that capture visual and auditory information from the surrounding environment, allowing it to perceive and respond to external stimuli.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/icubsensors.png)
><sub>This <a href="https://icub.iit.it/"> ICub Humanoid Robot</a> is endowed with high resolution binocular cameras for 3-dimensional rendering of the world and tactile sensors to perceive touch at its fingertips. All these sensors are necessary to reach and grab the red ball. Credit: EPFL/LASA Laboratory</sub>

**Common proprioceptive signals.**

Here are some of the typical proprioceptive sensors used in robotics, measuring key internal quantities that describe the robot’s mechanical and electrical state. These signals form the foundation for accurate estimation, feedback, and control.


| Quantity                                 | Typical sensor                                                         | Units            |
| ---------------------------------------- | ---------------------------------------------------------------------- | ---------------- |
| Joint/shaft position                     | Incremental/absolute encoder, potentiometer                            | rad, deg, counts |
| Joint/shaft velocity                     | Derived from encoder or tachometer                                     | rad/s, rpm       |
| Linear position/force (links/structures) | Strain gauge (bridge), Linear variable differential transformer (LVDT) | m, N, Nm         |
| Body acceleration/rotation               | IMU (accelerometers, gyroscopes)                                       | m/s², °/s        |
| Electrical current/voltage               | Shunt/Hall sensor, ADC                                                 | A, V             |
| Torque (estimate)                        | From current: $\tau \approx k_t I$; torque sensor                      | Nm               |
| Temperature                              | Thermistor/RTD/IC sensor                                               | °C               |
| Battery state                            | Voltage, current (Coulomb counting)                                    | V, A, Ah         |


**Difference between proprioceptive and exteroceptive sensors**

Proprioceptive and exteroceptive sensing form two complementary views of a robot’s perception system. Proprioceptive sensors describe the robot’s own internal state, while exteroceptive sensors capture information about the surrounding environment. The table below summarizes their main distinctions.

| Aspect                  | Proprioceptive                                                                                | Exteroceptive                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **What is measured**    | Internal state (joint angles, velocities, forces, body motion, actuator/electrical variables) | External world (terrain, obstacles, objects, features, lighting, sound)     |
| **Typical sensors**     | Encoders, IMUs, current/voltage sensors, strain gauges, torque sensors, thermistors           | Cameras (mono/stereo/RGB-D), LiDAR, radar, sonar, GPS/UWB, microphones      |
| **Primary use**         | Low-level control, odometry, state estimation, diagnostics, health monitoring                 | Mapping, localization relative to the world, object and scene perception    |
| **Latency / bandwidth** | Low latency, high update rate, directly used in feedback loops                                | Higher latency, lower update rate, requires heavier processing              |
| **Dependence**          | Independent of environment; depends on internal calibration                                   | Strongly dependent on environmental conditions (lighting, texture, clutter) |

Together, these two sensing modalities provide the foundation for robust robotic behavior: proprioceptive sensors keep the robot stable and aware of itself, while exteroceptive sensors keep it situated and responsive to the world.

#### Odometry
{: #ch2-odom }

*Odometry* estimates a robot’s change in pose by integrating *proprioceptive* motion measurements over time (e.g., wheel/track motion, joint motion, IMU). Historically known as *dead reckoning*, odometry develops a kinematic model relating actuator motions to body motion, then integrates that model to produce pose as a function of time. Errors from modeling and sensing accumulate and must be managed or corrected with additional measurements.


**Differential-drive wheel odometry** 
{: .no_toc }
![img-description]({{ site.baseurl }}/assets/images/new_sensors/Differential_drive.png)
><sub>Differential drive kinematics. Source : Springer Handbook of Robotics, Chapter : 20.1</sub>

One of the most common forms of odometry is wheel odometry. Consider a planar robot with two powered wheels mounted on a common axle, separated by track width $b=2d$ (so $d$ is the half-baseline). Let the right/left wheel **linear** speeds be $v_{r}, v_{\ell}$ (positive forward) and the corresponding incremental **travels** over a sample be $\Delta s_{r}, \Delta s_{\ell}$. The body’s instantaneous motion is a rigid twist about an *instantaneous center of curvature* (ICC) on the axle line.

**Kinematic relations .** With body angular rate $\omega$ and ICC radius $R$ (signed, measured from the body center):
$$
\omega (R+d)=v_{\ell}, \qquad \omega (R-d)=v_{r}.
$$

We can rearrange these two equations to solve for ω the rate of rotation about the ICC and R the distance from the center of the robot to the ICC :
$$
V=\tfrac{1}{2}(v_{r}+v_{\ell}), \qquad 
\omega=\frac{v_{r}-v_{\ell}}{b}, \qquad
R=\frac{V}{\omega}=\frac{b}{2}\,\frac{v_{r}+v_{\ell}}{\,v_{r}-v_{\ell}\,}.
$$

Now as $v_{r}, v_{\ell}$ are functions of time we can generate a set of equations of motion for the differential drive robot. Using the point midway between the wheels as the origin of the robot, and writing $\omega$ as the orientation of the robot with respect to the x-axis of a global Cartesian coordinate system, one obtains

$$
x(t) = \int V(t)\cos(\theta(t))\,dt, \qquad
y(t) = \int V(t)\sin(\theta(t))\,dt, \qquad
\theta(t) = \int \omega(t)\,dt .
$$

**From encoders to wheel travel.**  
Encoders report **counts** as the wheel (or motor) turns. Over one sample, let the right/left counts be $\Delta N_r,\ \Delta N_\ell$. If each **wheel** revolution produces $\text{CPR}$ (Counts Per Rotation) counts and the wheel radius is $r$, then

$$
\Delta \phi = 2\pi\,\frac{\Delta N}{\text{CPR}}\quad(\text{rad}),\qquad
\Delta s = r\,\Delta \phi = \frac{2\pi r}{\text{CPR}}\,\Delta N.
$$

Apply the same to each side:
$$
\Delta s_r = \frac{2\pi r}{\text{CPR}}\,\Delta N_r,\qquad
\Delta s_\ell = \frac{2\pi r}{\text{CPR}}\,\Delta N_\ell.
$$

A simple **velocity** estimate uses the sample time $\Delta t$:
$$
v \approx \frac{\Delta s}{\Delta t}.
$$

> **Example** $r=0.05\,\text{m}$, $\text{CPR}=8000$. One count corresponds to  
> $$
> \Delta s_{\text{per count}} = \frac{2\pi r}{\text{CPR}} \approx \frac{2\pi\cdot 0.05}{8000} \approx 0.0000393\,\text{m} = 0.039\,\text{mm}.
> $$
> If $\Delta N_r=+300$ and $\Delta N_\ell=+280$ over $\Delta t=0.02\,\text{s}$, then  
> $\Delta s_r\approx 11.8\,\text{mm}$, $\Delta s_\ell\approx 11.0\,\text{mm}$ and $v_r\approx 0.59\,\text{m/s}$, $v_\ell\approx 0.55\,\text{m/s}$.

---

##### Calibration & error sources (typical)
{: .no_toc }
- **Wheel radius / scale factor.** Misestimated radius scales $\Delta s_{\ell},\Delta s_{r}$ ⇒ linear drift.  
- **Baseline $2d$.** Misestimated track width biases $\Delta\theta$ ⇒ heading drift.  
- **Encoder quantization & missed counts.** Sets resolution and adds random noise (cf. Ch. 1.3, 1.5).  
- **Backlash & compliance.** Reversals cause transient under/over-counting; mount encoders on motor vs. output shaft accordingly.  
- **Wheel slip & terrain effects.** Slip, sinkage, uneven contact violate the no-slip model; *systematic* curvature error accumulates.  
- **Time synchronization.** Pose errors arise if encoder/IMU samples are integrated with inconsistent time stamps.  
- **Integration drift.** Dead reckoning accumulates error; *pose maintenance* requires fusing with external references (e.g., vision, LiDAR, GPS) or loop closures.

---

**Odometry in the estimation stack**
{: .no_toc }
Odometry provides a *high-rate, low-latency* motion prior for controllers and filters; drift is bounded by fusing with exteroceptive/global measurements (e.g., GPS outdoors, visual landmarks indoors) in extended Kalman filters or factor-graph optimizers. GPS–IMU fusion is a canonical example of complementary sensors combined via Kalman filtering. The same principle applies to wheel/IMU/vision fusion for terrestrial robots.

**Key takeaway.**  
Odometry turns local actuator/IMU readings into an integrated pose estimate using a kinematic model. It is indispensable for *short-term* motion tracking and control, but uncorrected errors inevitably accumulate; calibration, careful time stamping, and sensor fusion are essential to maintain accuracy over distance.

---

<details markdown="1">
 <summary>Conceptual Quesetions</summary>

  <p><strong>Question 1: </strong> What is the core idea of odometry?</p>
  <form id="ch2-odom-q1">
    <input type="radio" name="ch2-odom-q1" value="A"> Estimating pose by matching images to a map<br>
    <input type="radio" name="ch2-odom-q1" value="B"> Estimating pose by integrating proprioceptive motion with a kinematic model<br>
    <input type="radio" name="ch2-odom-q1" value="C"> Estimating pose using GPS only<br>
    <input type="radio" name="ch2-odom-q1" value="D"> Estimating pose by triangulating radio beacons<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q1','B',
        '✅ Correct! Odometry integrates internal motion measurements through a kinematic model.',
        '❌ Odometry relies on internal sensing and kinematics, not external references.')">
      Check Answer
    </button>
    <p id="ch2-odom-q1-feedback"></p>
  </form>

  <hr>

  <p><strong>Question 2: </strong> If $v_r=v_\ell\neq 0$ for a differential drive with track width $b=2d$, what is the angular rate $\omega$?</p>
  <form id="ch2-odom-q2">
    <input type="radio" name="ch2-odom-q2" value="A"> $\omega = \dfrac{2v_r}{b}$<br>
    <input type="radio" name="ch2-odom-q2" value="B"> $\omega = \dfrac{v_r-v_\ell}{b}=0$<br>
    <input type="radio" name="ch2-odom-q2" value="C"> $\omega = \dfrac{v_r+v_\ell}{b}$<br>
    <input type="radio" name="ch2-odom-q2" value="D"> $\omega$ is undefined<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q2','B',
        '✅ Correct! Equal wheel speeds imply zero yaw rate and straight motion.',
        '❌ Try again')">
      Check Answer
    </button>
    <p id="ch2-odom-q2-feedback"></p>
  </form>

  <hr>

  <p><strong>Question 3: </strong> With the sign convention $v_r,v_\ell&gt;0$ forward and $\omega=(v_r-v_\ell)/b$, if $v_r&gt;v_\ell$ the robot turns:</p>
  <form id="ch2-odom-q3">
    <input type="radio" name="ch2-odom-q3" value="A"> Toward the right wheel (clockwise)<br>
    <input type="radio" name="ch2-odom-q3" value="B"> Toward the left wheel (counterclockwise)<br>
    <input type="radio" name="ch2-odom-q3" value="C"> Straight ahead<br>
    <input type="radio" name="ch2-odom-q3" value="D"> Backward<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q3','B',
        '✅ Correct! $\omega&gt;0$ and the instantaneous center lies on the left side.',
        '❌ Compare $v_r$ vs $v_\ell$ in $\omega=(v_r-v_\ell)/b$ and the ICC interpretation.')">
      Check Answer
    </button>
    <p id="ch2-odom-q3-feedback"></p>
  </form>

  <hr>

  <p><strong>Question 4: </strong> If $\mathrm{CPR}$ doubles and all else is unchanged, the distance represented by one count:</p>
  <form id="ch2-odom-q6">
    <input type="radio" name="ch2-odom-q6" value="A"> Doubles<br>
    <input type="radio" name="ch2-odom-q6" value="B"> Halves<br>
    <input type="radio" name="ch2-odom-q6" value="C"> Stays the same<br>
    <input type="radio" name="ch2-odom-q6" value="D"> Becomes zero<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q6','B',
        '✅ Correct! Distance per count is inversely proportional to CPR.',
        '❌ Use $\Delta s_{\text{per count}}=2\pi r/\mathrm{CPR}$.')">
      Check Answer
    </button>
    <p id="ch2-odom-q6-feedback"></p>
  </form>

  <hr>

  <p><strong>Question 5: </strong> True or False: Mounting encoders on the motor shaft removes the influence of gearbox backlash on wheel odometry.</p>
  <form id="ch2-odom-q7">
    <input type="radio" name="ch2-odom-q7" value="True"> True<br>
    <input type="radio" name="ch2-odom-q7" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q7','False',
        '✅ Correct! Motor-side encoders do not measure output-side lash and compliance, so wheel motion can be misestimated during reversals.',
        '❌ See the note on backlash and encoder mounting in the error sources list.')">
      Check Answer
    </button>
    <p id="ch2-odom-q7-feedback"></p>
  </form>

  <hr>

  <p><strong>Question 6: </strong> True or False: Even with perfect encoders and calibration, persistent wheel slip can create systematic curvature errors in odometry.</p>
  <form id="ch2-odom-q9">
    <input type="radio" name="ch2-odom-q9" value="True"> True<br>
    <input type="radio" name="ch2-odom-q9" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q9','True',
        '✅ Correct! Slip violates the no-slip kinematic assumption and introduces bias.',
        '❌ Slip breaks the kinematic model assumptions and biases path estimates.')">
      Check Answer
    </button>
    <p id="ch2-odom-q9-feedback"></p>
  </form>

  <hr>

  <p><strong>Question 7: </strong> For $v_r=0.60$ m/s, $v_\ell=0.40$ m/s, and $b=0.50$ m, what is $\omega$?</p>
  <form id="ch2-odom-q11">
    <input type="radio" name="ch2-odom-q11" value="A"> $0.20$ rad/s<br>
    <input type="radio" name="ch2-odom-q11" value="B"> $0.40$ rad/s<br>
    <input type="radio" name="ch2-odom-q11" value="C"> $1.00$ rad/s<br>
    <input type="radio" name="ch2-odom-q11" value="D"> $2.00$ rad/s<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q11','B',
        '✅ Correct! $\omega=(v_r-v_\ell)/b=(0.60-0.40)/0.50=0.40$ rad/s.',
        '❌ Apply $\omega=(v_r-v_\ell)/b$ carefully with units.')">
      Check Answer
    </button>
    <p id="ch2-odom-q11-feedback"></p>
  </form>

  <hr>

  <p><strong>Question 8: </strong> Which statement best describes odometry in a modern fusion system?</p>
  <form id="ch2-odom-q12">
    <input type="radio" name="ch2-odom-q12" value="A"> It replaces exteroceptive sensors entirely<br>
    <input type="radio" name="ch2-odom-q12" value="B"> It provides a high-rate motion prior, while drift is corrected by global or exteroceptive measurements<br>
    <input type="radio" name="ch2-odom-q12" value="C"> It is only used when GPS is available<br>
    <input type="radio" name="ch2-odom-q12" value="D"> It estimates absolute position without drift<br>
    <button type="button"
      onclick="checkTrueFalse('ch2-odom-q12','B',
        '✅ Correct! Odometry is low-latency input to filters; vision, LiDAR, or GPS bound drift.',
        '❌ See the odometry-in-the-stack discussion and the key takeaway.')">
      Check Answer
    </button>
    <p id="ch2-odom-q12-feedback"></p>
  </form>

</details>

---

<details markdown="1">
 <summary>Further exploration</summary>

  Video explaining differential drive odometry in more detail.

  ![](https://www.youtube.com/watch?v=LrsTBWf6Wsc)
  ><sub>*wheeled robot control and odometry. YouTube video, Sep 11, 2019. Available at: https://www.youtube.com/watch?v=LrsTBWf6Wsc*</sub>

  Article explaining differential Drive odometry :
  - [Wheel Odometry Model for Differential Drive Robotics](https://medium.com/@nahmed3536/wheel-odometry-model-for-differential-drive-robotics-91b85a012299)

</details>

---

#### Rotary & Linear Position Sensing (Encoders & Potentiometers)

Position sensing provides joint/shaft angle and linear travel for feedback control, odometry, and safety. Common technologies include **incremental encoders**, **absolute encoders**, **resolvers/synchros**, and **potentiometers**. Selection should be guided by the characteristics in Ch. 1 (range, resolution, accuracy, noise, bandwidth/latency) and by mechanical integration constraints.

---

**Incremental encoders.**  
![img-description]({{ site.baseurl }}/assets/images/new_sensors/encoder.png)
><sub>Sketch of the quadrature encoder disc, and output from photodetectors placed over each of the two pattern. The corresponding state changes are shown on the right</sub>

Incremental encoders measure relative motion by generating a series of pulses as the shaft rotates. The position is obtained by **counting pulses** from a reference point.

A typical incremental encoder produces two output signals, **Channel A** and **Channel B**, which are square waves shifted by 90° (in quadrature). By observing the phase relationship between these two signals, the direction of rotation can be determined:

- If Channel A leads Channel B, the shaft is rotating in one direction.
- If Channel B leads Channel A, the shaft is rotating in the opposite direction.

Each pair of transitions (rising and falling edges of A and B) defines a **state**. By cycling through four distinct states $(S_1, S_2, S_3, S_4)$, one complete quadrature period is formed. Counting all four edges per cycle provides **4× resolution** compared to a single channel.

Many incremental encoders also include an **Index (I)** signal, which generates a single pulse per revolution. This provides a reference or “home” position for absolute alignment.

<details markdown="1">
 <summary>Video</summary>

  This short video explains how a incremental encoders works.

  ![](https://www.youtube.com/watch?v=zzHcsJDV3_o)
  ><sub>*Incremental Encoder (Shaft Encoder)- how it works. YouTube video, Mar 22, 2017. Available at: https://www.youtube.com/watch?v=zzHcsJDV3_o*</sub>


</details>

---

**Absolute encoders.**  

Absolute encoders use typically a coded disc attached to the rotating shaft. The disc is divided into concentric tracks, each containing a pattern of opaque and transparent (or reflective) segments. Each track corresponds to a bit in the digital output word. As the shaft rotates, a light source (LED) and photodetectors (or optical sensors) read the pattern on each track, generating a unique binary code for every position.

Single-Turn Absolute Encoders: Provide a unique code for one full rotation (360°). The number of unique positions is determined by the resolution (e.g., 8-bit = 256 positions, 12-bit = 4096 positions).
Multi-Turn Absolute Encoders: Include additional gears or battery-backed counters to track the number of full rotations, enabling position measurement beyond 360° (e.g., 16-bit for turns + 12-bit for position within a turn).

![img-description]({{ site.baseurl }}/assets/images/new_sensors/Absolute_encoder.png)
><sub>Each concentric track on the encoder disk represents one bit of resolution. Note that each track, starting from the inside of the disk, has double the number of light-and-dark bands than the previous track. The encoder shown here has 4 tracks, so has 4 bits of resolution and can measure 16 positions (2^4) for each rotation of the encoder. Source : https://www.linearmotiontips.com/when-is-encoder-resolution-specified-in-bits-and-what-does-that-tell-us/</sub>

Absolute encoders, whether rotary or linear, track the position of an axis by assigning a unique value to each position on the encoder. This means that no matter where the axis is located, its exact position can always be determined. Because each position is uniquely identified, this remains true even if the encoder has been powered off and restarted, there is no need to re-home the encoder upon power-up to determine its position.

For most absolute rotary encoders, resolution is defined in terms of **bits**. The encoder disk is patterned with concentric tracks around its circumference (and a corresponding number of sensors, one for each track), with each track representing one bit of resolution.

To convert bits of resolution into the number of positions the encoder can detect in one shaft revolution, raise 2 to the power of the number of bits:

- An 8-bit encoder can measure  
  $2^8 = 256$ positions per revolution.  

- A 16-bit encoder can measure  
  $2^{16} = 65{,}536$ positions per revolution.

<details markdown="1">
 <summary>Video</summary>

  This short video explains how an absolute encoder works.

  ![](https://www.youtube.com/watch?v=yOmYCh_i_JI)
  ><sub>*Absolute Encoder (Shaft Encoder, Rotary encoder) - how it works!. YouTube video, Mar 22, 2017. Available at: https://www.youtube.com/watch?v=yOmYCh_i_JI*</sub>


</details>

**Take-home message**
An absolute encoder  provides a unique digital code for each distinct position of its shaft, allowing it to determine the absolute angular position immediately upon power-up, without the need for homing or reference movements. In contrast, incremental encoders only provide relative position changes. Absolute encoders are hence advantageous in that they retain their position information even after power loss.
---

**Potentiometers.**  
![img-description]({{ site.baseurl }}/assets/images/new_sensors/poten.jpg)
><sub>A linear potentiometer: a wiper slides along a resistive track (A–C). The output at B is a fraction of the excitation proportional to displacement.</sub>

**Operating principle.**  
A potentiometer (rotary or linear) forms a **voltage divider**. With excitation $V_{\text{ref}}$ across the end terminals and the wiper at normalized position $0\le \alpha \le 1$ (measured from the low end), the **ideal** output is
$$
V_{\text{out}} = \alpha\,V_{\text{ref}} \quad \text{(no load).}
$$
Therefore the reading is **absolute** (no homing needed after power cycles). Rotary devices map angle $\theta$ to $\alpha=\theta/\theta_{\max}$; linear devices map travel $x$ to $\alpha=x/L$.

**Key specs.**
- **Range (mechanical/electrical travel).** Rotary parts often provide $\theta_{\max}\!\approx\!300^\circ$; **multi-turn** (e.g., $5$–$10$ turns) extends range. Linear parts specify stroke $L$ and electrical travel (slightly less than mechanical).  
- **Resolution.** Set by the ADC and noise, not by “bits” in the pot:
  $$
  \Delta \alpha = \frac{1}{2^N},\qquad
  \Delta \theta = \theta_{\max}\,\Delta\alpha,\qquad
  \Delta x = L\,\Delta\alpha.
  $$
- **Accuracy/linearity & hysteresis.** Typical linearity $\pm(0.5\%\text{–}2\%)$ FS; small **hysteresis** from wiper and bearings.  

**Loading & ratiometric readout.**  
Finite input impedance $R_{\text{in}}$ of the ADC/load **pulls down** $V_{\text{out}}$ and introduces gain error. With total track resistance $R_{\text{pot}}$, the loaded divider is
$$
V_{\text{out,loaded}} \;=\; V_{\text{ref}}\,
\frac{(\alpha R_{\text{pot}} \parallel R_{\text{in}})}
{(1-\alpha)R_{\text{pot}} + (\alpha R_{\text{pot}} \parallel R_{\text{in}})}\,,
$$
which reduces to $V_{\text{out}}\!\approx\!\alpha V_{\text{ref}}$ when $R_{\text{in}}\!\gg\!R_{\text{pot}}$.  

**Integration notes.**
- Buffer the wiper with a high-impedance amplifier if $R_{\text{in}}$ is not large.  
- Add a small **RC** near the ADC to tame contact noise; keep leads short or shielded.  
- Avoid mechanical end-stops in normal operation; select stroke so the application stays inside the **electrical** travel.  

> **Examples**  
> 1) *ADC-limited resolution (rotary)*: $\theta_{\max}=300^\circ$, $N=12$.  
> $$\Delta\theta = \frac{300^\circ}{2^{12}} \approx 0.073^\circ \text{ per LSB}.$$
> 2) *Loading error check*: $R_{\text{pot}}=10\,\text{k}\Omega$, $R_{\text{in}}=1\,\text{M}\Omega$. At mid-travel ($\alpha\=\0.5$), the error relative to $\alpha V_{\text{ref}}$ is $\approx 0.25\%$; with $R_{\text{in}}=100\,\text{k}\Omega$ it rises to a few percent.

---

<details markdown="1">
  <summary>Conceptual questions</summary>

<p><strong>Question 1: Incremental vs. absolute encoders.</strong> Which statement best differentiates the two?</p>
<form id="ch2-pos-q1">
  <input type="radio" name="ch2-pos-q1" value="A"> Incremental reports a unique code for every angle; absolute provides pulses only<br>
  <input type="radio" name="ch2-pos-q1" value="B"> Incremental counts motion from a reference (often needs homing); absolute reports a unique position code at all times<br>
  <input type="radio" name="ch2-pos-q1" value="C"> Both require homing after power-up<br>
  <input type="radio" name="ch2-pos-q1" value="D"> Both provide continuous analog voltage outputs<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q1','B',
      '✅ Correct! Incremental measures relative motion; absolute encodes position uniquely and survives power cycles.',
      '❌ Review how incremental counting differs from absolute coding.')">
    Check Answer
  </button>
  <p id="ch2-pos-q1-feedback"></p>
</form>

<hr>

<p><strong>Question 2: Quadrature resolution.</strong> An incremental encoder outputs 1000 <em>quadrature cycles</em> per revolution (i.e., 1000 A–B state periods). With 4× edge counting, the counts per revolution are:</p>
<form id="ch2-pos-q2">
  <input type="radio" name="ch2-pos-q2" value="A"> 1000<br>
  <input type="radio" name="ch2-pos-q2" value="B"> 2000<br>
  <input type="radio" name="ch2-pos-q2" value="C"> 4000<br>
  <input type="radio" name="ch2-pos-q2" value="D"> 8000<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q2','C',
      '✅ Correct! 4 edges per cycle ⇒ $4\times1000=4000$ counts/rev.',
      '❌ Each quadrature cycle contributes four countable edges with 4× decoding.')">
    Check Answer
  </button>
  <p id="ch2-pos-q2-feedback"></p>
</form>

<hr>

<p><strong>Question 3: Direction from A/B.</strong> In a quadrature encoder, if Channel A <em>leads</em> Channel B, the direction is:</p>
<form id="ch2-pos-q3">
  <input type="radio" name="ch2-pos-q3" value="A"> One direction (by convention, forward)<br>
  <input type="radio" name="ch2-pos-q3" value="B"> The opposite direction<br>
  <input type="radio" name="ch2-pos-q3" value="C"> Cannot be determined<br>
  <input type="radio" name="ch2-pos-q3" value="D"> Always alternating<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q3','A',
      '✅ Correct! A leading B indicates one direction; B leading A indicates the other.',
      '❌ The phase relationship between A and B encodes direction.')">
    Check Answer
  </button>
  <p id="ch2-pos-q3-feedback"></p>
</form>

<hr>

<p><strong>Question 4: Index pulse.</strong> The Index (I or Z) signal on many incremental encoders is used primarily to:</p>
<form id="ch2-pos-q4">
  <input type="radio" name="ch2-pos-q4" value="A"> Double the resolution<br>
  <input type="radio" name="ch2-pos-q4" value="B"> Provide one reference mark per revolution for homing/alignment<br>
  <input type="radio" name="ch2-pos-q4" value="C"> Measure temperature<br>
  <input type="radio" name="ch2-pos-q4" value="D"> Filter noise on A/B<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q4','B',
      '✅ Correct! The index gives a once-per-rev absolute reference.',
      '❌ The index does not improve edge resolution nor filter signals.')">
    Check Answer
  </button>
  <p id="ch2-pos-q4-feedback"></p>
</form>

<hr>

<p><strong>Question 5: Angle per count.</strong> If a shaft yields 4096 counts per revolution, the ideal angular resolution is approximately:</p>
<form id="ch2-pos-q5">
  <input type="radio" name="ch2-pos-q5" value="A"> $0.18^\circ$/count<br>
  <input type="radio" name="ch2-pos-q5" value="B"> $0.088^\circ$/count<br>
  <input type="radio" name="ch2-pos-q5" value="C"> $0.0088^\circ$/count<br>
  <input type="radio" name="ch2-pos-q5" value="D"> $0.44^\circ$/count<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q5','B',
      '✅ Correct! $360^\circ/4096\approx0.0879^\circ$ per count.',
      '❌ Divide $360^\circ$ by counts/rev to get degrees per count.')">
    Check Answer
  </button>
  <p id="ch2-pos-q5-feedback"></p>
</form>

<hr>

<p><strong>Question 6: Absolute encoder bits.</strong> A 14-bit absolute rotary encoder can uniquely report how many positions per revolution?</p>
<form id="ch2-pos-q6">
  <input type="radio" name="ch2-pos-q6" value="A"> $2^{10}=1024$<br>
  <input type="radio" name="ch2-pos-q6" value="B"> $2^{12}=4096$<br>
  <input type="radio" name="ch2-pos-q6" value="C"> $2^{14}=16384$<br>
  <input type="radio" name="ch2-pos-q6" value="D"> $2^{16}=65536$<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q6','C',
      '✅ Correct! Bits $\rightarrow$ positions: $2^{14}=16384$.',
      '❌ Convert bits to positions with $2^n$.')">
    Check Answer
  </button>
  <p id="ch2-pos-q6-feedback"></p>
</form>

<hr>

<p><strong>Question 7: Potentiometer ideal output.</strong> A linear potentiometer is excited with $V_{\text{ref}}=5\,$V. Ignoring loading, at $\alpha=0.25$ the output is:</p>
<form id="ch2-pos-q7">
  <input type="radio" name="ch2-pos-q7" value="A"> $0.25$ V<br>
  <input type="radio" name="ch2-pos-q7" value="B"> $1.25$ V<br>
  <input type="radio" name="ch2-pos-q7" value="C"> $2.5$ V<br>
  <input type="radio" name="ch2-pos-q7" value="D"> $3.75$ V<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q7','B',
      '✅ Correct! $V_{\text{out}}=\alpha V_{\text{ref}}=0.25\times5=1.25$ V.',
      '❌ Use the ideal divider relation $V_{\text{out}}=\alpha V_{\text{ref}}$ (no load).')">
    Check Answer
  </button>
  <p id="ch2-pos-q7-feedback"></p>
</form>

<hr>

<p><strong>Question 8: Loading effect.</strong> True or False: With $R_{\text{pot}}=10\,\text{k}\Omega$ and ADC input $R_{\text{in}}=100\,\text{k}\Omega$, loading error is negligible across the stroke.</p>
<form id="ch2-pos-q8">
  <input type="radio" name="ch2-pos-q8" value="True"> True<br>
  <input type="radio" name="ch2-pos-q8" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q8','False',
      '✅ Correct! $R_{\text{in}}$ only $10\times$ larger than $R_{\text{pot}}$ causes noticeable gain error (a few percent). Prefer $R_{\text{in}}\!\gg\!R_{\text{pot}}$ or buffer the wiper.',
      '❌ See the loading discussion: finite $R_{\text{in}}$ pulls down $V_{\text{out}}$.')">
    Check Answer
  </button>
  <p id="ch2-pos-q8-feedback"></p>
</form>

<hr>

<p><strong>Question 9: Ratiometric readout.</strong> True or False: Driving a potentiometer with the same $V_{\text{ref}}$ used by the ADC reference makes the reading insensitive (ideally) to supply variation.</p>
<form id="ch2-pos-q9">
  <input type="radio" name="ch2-pos-q9" value="True"> True<br>
  <input type="radio" name="ch2-pos-q9" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q9','True',
      '✅ Correct! The ratio $V_{\text{out}}/V_{\text{ref}}=\alpha$ cancels common $V_{\text{ref}}$ changes.',
      '❌ Ratiometric measurement exploits the normalized divider output to reject supply drift.')">
    Check Answer
  </button>
  <p id="ch2-pos-q9-feedback"></p>
</form>

<hr>

<p><strong>Question 10: Resolution origin (potentiometers).</strong> Which statement is most accurate?</p>
<form id="ch2-pos-q10">
  <input type="radio" name="ch2-pos-q10" value="A"> Potentiometers have “bits” of resolution like absolute encoders<br>
  <input type="radio" name="ch2-pos-q10" value="B"> Resolution is set by ADC quantization and noise on $V_{\text{out}}$<br>
  <input type="radio" name="ch2-pos-q10" value="C"> Resolution is unlimited in practice<br>
  <input type="radio" name="ch2-pos-q10" value="D"> Resolution depends only on mechanical stroke<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q10','B',
      '✅ Correct! The divider is analog; effective resolution comes from the ADC and noise.',
      '❌ Pots do not have discrete position codes; the ADC sets the LSB.')">
    Check Answer
  </button>
  <p id="ch2-pos-q10-feedback"></p>
</form>

<hr>

<p><strong>Question 11: Range and travel.</strong> Which statement is correct for typical devices?</p>
<form id="ch2-pos-q11">
  <input type="radio" name="ch2-pos-q11" value="A"> Rotary pots commonly allow unlimited turns<br>
  <input type="radio" name="ch2-pos-q11" value="B"> Single-turn rotary pots often have $\theta_{\max}\approx300^\circ$; multi-turn versions increase range<br>
  <input type="radio" name="ch2-pos-q11" value="C"> Electrical travel always equals mechanical travel<br>
  <input type="radio" name="ch2-pos-q11" value="D"> Linear pots cannot specify stroke<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q11','B',
      '✅ Correct! Single-turn pots are ~300°; multi-turn extend range and electrical travel is slightly less than mechanical.',
      '❌ Revisit the range definitions for rotary and linear potentiometers.')">
    Check Answer
  </button>
  <p id="ch2-pos-q11-feedback"></p>
</form>

<hr>

<p><strong>Question 12: Integration best practice.</strong> When $R_{\text{in}}$ cannot be made $\gg R_{\text{pot}}$, the recommended interface is to:</p>
<form id="ch2-pos-q12">
  <input type="radio" name="ch2-pos-q12" value="A"> Add a large series resistor in the wiper lead<br>
  <input type="radio" name="ch2-pos-q12" value="B"> Buffer the wiper with a high-impedance amplifier before the ADC<br>
  <input type="radio" name="ch2-pos-q12" value="C"> Lower the ADC reference voltage<br>
  <input type="radio" name="ch2-pos-q12" value="D"> Short the ends of the potentiometer<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-pos-q12','B',
      '✅ Correct! A high-impedance buffer prevents loading and gain error.',
      '❌ Series resistance does not fix divider loading.')">
    Check Answer
  </button>
  <p id="ch2-pos-q12-feedback"></p>
</form>

</details>


---

#### Inertial Sensing

##### Gyroscopic Systems

The goal of gyroscopic systems is to measure changes in vehicle orientation by taking advantage of physical laws that produce predictable effects under rotation. Effectively they measure how fast a robot is rotating about an axis (angular rate). By **integrating** this rate, we can track changes in orientation over time. In practice, every real gyro has noise and bias, so orientation from pure integration will drift and must be calibrated and often fused with other sensors. 

**How a Gyroscope Works (YouTube, 9 min).** A visual refresher on mechanical intuition:
![How a Gyroscope Works](https://www.youtube.com/watch?v=V6XSsNAWg00).
  ><sub>*How a Gyroscope Works. What a Gyroscope Is . YouTube video, Aug 25, 2022. Available at: https://www.youtube.com/watch?v=V6XSsNAWg00*</sub>

---

###### Main classes of gyroscopes
{: .no_toc }

**1) Mechanical gyroscopes and gyrocompasses**

* **Principle.** Gyroscopes and gyrocompasses rely on the principle of the  **conservation of angular momentum** $L=I\omega$. Angular momentum is the tendency of a rotating object to keep rotating at the same angular speed about the same axis of rotation in the absence of an external torque. A rapidly spinning rotor maintains its orientation; torques cause **precession** perpendicular to both spin and applied torque. Classical **gyrocompasses** exploit precession with a pendulous weight and damping so the spin axis aligns with true north in the Earth frame. 
* **Notes for robots.** Pure mechanical gyrocompasses are bulky, need careful damping (often oil reservoirs), and are sensitive to vehicle motions and latitude corrections. They are now uncommon in mobile robots compared to optical or MEMS devices. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/gyrocompas.png)
><sub>Simple gyrocompass. (a) Pendulus gyro. (b) Precessional motion. Source: Springer Handbook of Robotics, Chapter 20.1</sub>

**2) Optical gyroscopes**

* **Principle (Sagnac effect).** Send light both ways around a closed loop (see Fig below) of length $D=2\pi R$. If the loop is stationary, both pulses traverse the same distance at speed $c$ and arrive together after
$$
t = \frac{D}{c} = \frac{2\pi R}{c}.
$$
Now suppose the loop rotates clockwise at angular speed $\omega$. The clockwise pulse must travel farther to “catch” the moving end point, while the counterclockwise pulse travels a shorter distance.

**Distances while the loop rotates.**

* Clockwise path length: $D_c = 2\pi R + \omega R t_c$
* Counterclockwise path length: $D_a = 2\pi R - \omega R t_a$

Because speed is $c$ for both beams,
$$
c,t_c = D_c \Rightarrow t_c=\frac{2\pi R}{c-\omega R},\qquad
c,t_a = D_a \Rightarrow t_a=\frac{2\pi R}{c+\omega R}.
$$

**Time difference (Sagnac delay).**
$$
\Delta t \equiv t_c - t_a
= 2\pi R\left(\frac{1}{c-\omega R}-\frac{1}{c+\omega R}\right).
$$

This $\Delta t$ is what RLGs and FOGs convert into a measurable phase or frequency shift to estimate the rotation rate $\omega$. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/opti-gyro-schematic.png)
><sub>Circular light path. (a) Stationary path. (b) Moving path. Source: Springer Handbook of Robotics, Chapter 20.2.3</sub>

Fiber-optic gyros (FOG) use long polarization-maintaining fiber loops; ring-laser gyros (RLG) use a laser cavity and measure the beat frequency between the two standing waves. Optical gyros are accurate, with no spinning mass. 

**3) MEMS (micro-electromechanical) gyroscopes**

* **Principle (Coriolis).** A vibrating proof mass with velocity $\mathbf{v}$ inside a frame rotating at rate $\boldsymbol{\Omega}$ experiences **Coriolis acceleration**. Coriolis acceleration is the apparent acceleration that arises in a rotating frame of references. Suppose that an object moves along a straight line in a rotating frame of reference. To an outside observer in an inertial frame the object’s path is curved, thus there must be some force acting on the object to maintain the straight line motion as viewed by the rotating observer. An object moving in a straight line with local velocity $\mathbf{v}$ in a frame rotating at rate $\boldsymbol{\Omega}$ relative to an inertial frame will experience a Coriolis acceleration given by : 
  $$
  \mathbf{a}_{\text{Coriolis}} = 2\mathbf{v}\times \boldsymbol{\Omega}.
  $$
  By driving a known vibration and sensing the orthogonal motion induced by Coriolis forces, the device estimates angular rate. Common structures: **tuning-fork**, **vibrating-wheel**, and **wine-glass resonators**. Compact, low-power, and inexpensive, MEMS gyros dominate robotics platforms. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/mems_gyroscope.png)
><sub>MEMS gyroscope: principle of operation. Source: Springer Handbook of Robotics, Chapter 20.2.3</sub>

Wine-glass resonator gyroscopes use the effect of Coriolis forces on the position of nodal points on a resonating structure to estimate the external rotation. As MEMS gyroscopes have no rotating parts, have low-power consumption requirements, and are very mall, MEMS gyros are quickly replacing mechanical and optical gyroscope sensors in robotic applications.

---

###### What gyros actually deliver
{: .no_toc }

* **Rate gyros (RG).** Output angular **rate** $\dot{\theta}$ directly.
* **Rate-integrating gyros (RIG).** Internally integrate to report **angle**, though most robotic pipelines still integrate rate in software to keep timing consistent with other sensors. 

**Why fusion is essential.**
All gyros exhibit **drift** due to bias and noise. Drift causes orientation error; in an IMU this misorients gravity removal for accelerometers, so residual gravity integrates to large position error over time. Robots therefore combine gyro data with other references (accelerometers, magnetometers, GPS, vision) using filters or factor graphs. 

---

##### Important Performance metrics of Inertial measurement units
{: .no_toc }

* **Bias repeatability / stability.** How much the zero-rate output wanders over time at constant conditions; dominates long-term drift. 
* **Angle Random Walk (ARW).** Noise-induced angle error growth when integrating rate; sets short-term orientation precision. 
* **Scale factor.** Mapping from physical rate to volts or counts (e.g., mV per deg/s); errors here scale the estimate. 

---

##### Practical selection and integration tips
{: .no_toc }

* **Match range and bandwidth to dynamics.** Choose full-scale so saturation is unlikely during worst maneuvers, and pick bandwidth high enough for control needs without excessive noise or latency.
* **Mounting and alignment.** Keep axes orthogonal, rigidly mount near the robot’s center to reduce vibration coupling, and include axis misalignment in calibration.
* **Bias handling.** Estimate bias at startup while the robot is still; track slowly varying bias in your estimator during operation.
* **Thermal behavior.** Expect temperature-dependent bias and scale factors; if possible, calibrate across temperature.
* **Triads and IMUs.** Three orthogonal gyros are ganged for full 3-D rotation; in practice they live with accelerometers in an IMU. 

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: Why does integrating gyro rate to get orientation drift over time?</strong></p>
<form id="ch2-3-q1">
  <input type="radio" name="ch2-3-q1" value="A"> Small bias and noise in the rate estimate accumulate when integrated<br>
  <input type="radio" name="ch2-3-q1" value="B"> Magnetometers directly disturb the gyro reading<br>
  <input type="radio" name="ch2-3-q1" value="C"> Higher sampling rate always causes more drift<br>
  <input type="radio" name="ch2-3-q1" value="D"> Drift only happens if the robot is moving quickly<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-3-q1', 'A',
      '✅ Correct! Bias and noise in the rate integrate into angle error (drift).',
      '❌ Try again. ')">
    Check Answer
  </button>
  <p id="ch2-3-q1-feedback"></p>
</form>

<!-- Question 2 -->

<p><strong>Question 2: What physical principle do MEMS gyroscopes use to sense rotation?</strong></p>
<form id="ch2-3-q2">
  <input type="radio" name="ch2-3-q2" value="A"> Coriolis forces on a vibrating proof mass<br>
  <input type="radio" name="ch2-3-q2" value="B"> Doppler shift of light in a fiber loop<br>
  <input type="radio" name="ch2-3-q2" value="C"> Conservation of linear momentum in a sliding mass<br>
  <input type="radio" name="ch2-3-q2" value="D"> Thermal expansion of a silicon beam<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-3-q2', 'A',
      '✅ Correct! Rotation couples energy into the orthogonal sense axis via Coriolis force.',
      '❌ Try again.')">
    Check Answer
  </button>
  <p id="ch2-3-q2-feedback"></p>
</form>

<!-- Question 3 -->

<p><strong>Question 3: The Sagnac effect used in optical gyros (FOG/RLG) is best described as:</strong></p>
<form id="ch2-3-q3">
  <input type="radio" name="ch2-3-q3" value="A"> A magnetic torque aligning the laser cavity with Earth’s field<br>
  <input type="radio" name="ch2-3-q3" value="B"> A difference in light path time/phase for counter-propagating beams in a rotating loop<br>
  <input type="radio" name="ch2-3-q3" value="C"> A thermal delay between clockwise and counterclockwise beams<br>
  <input type="radio" name="ch2-3-q3" value="D"> A piezoelectric effect in the fiber under strain<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-3-q3', 'B',
      '✅ Correct! Rotation changes the effective path length, creating a measurable phase or frequency shift.',
      '❌ Try again.')">
    Check Answer
  </button>
  <p id="ch2-3-q3-feedback"></p>
</form>

<!-- Question 4 -->

<p><strong>Question 4: Which spec mainly limits short-term orientation precision when integrating gyro rate?</strong></p>
<form id="ch2-3-q4">
  <input type="radio" name="ch2-3-q4" value="A"> Angle Random Walk (ARW)<br>
  <input type="radio" name="ch2-3-q4" value="B"> Long-term bias stability only<br>
  <input type="radio" name="ch2-3-q4" value="C"> Scale-factor linearity at full temperature range<br>
  <input type="radio" name="ch2-3-q4" value="D"> Maximum measurable rate (full-scale)<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-3-q4', 'A',
      '✅ Correct! ARW characterizes noise that integrates into short-term angle uncertainty.',
      '❌ Try again.')">
    Check Answer
  </button>
  <p id="ch2-3-q4-feedback"></p>
</form>

<!-- Question 5 -->

<p><strong>Question 5: What is a good practice to reduce orientation drift in an IMU-based estimator?</strong></p>
<form id="ch2-3-q5">
  <input type="radio" name="ch2-3-q5" value="A"> Rely only on double-integrated accelerometer data<br>
  <input type="radio" name="ch2-3-q5" value="B"> Mount the IMU far from the center to increase sensed vibration<br>
  <input type="radio" name="ch2-3-q5" value="C"> Maximize bandwidth regardless of noise<br>
  <input type="radio" name="ch2-3-q5" value="D"> Fuse gyro with accelerometer/magnetometer (e.g., complementary/Kalman filter) and estimate bias<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-3-q5', 'D',
      '✅ Correct! Sensor fusion with bias estimation constrains drift using gravity and heading references.',
      '❌ Try again.')">
    Check Answer
  </button>
  <p id="ch2-3-q5-feedback"></p>
</form>
</details>

---

<details markdown="1">
 <summary>Further exploration</summary>

* **Optical gyros.** Read about the Sagnac effect and ring laser gyros on [Wikipedia – Sagnac effect](https://en.wikipedia.org/wiki/Sagnac_effect).
  
* **MEMS gyro basics.** Short primer on tuning-fork MEMS designs: [Wikipedia – MEMS gyroscope](https://en.wikipedia.org/wiki/Microelectromechanical_systems#Sensors).

</details>

---

##### Accelerometer

Just as gyroscopes can be used to measure changes in orientation of a robot, other inertial sensors, known as **accelerometers**, can be used to measure **external forces** acting on the vehicle. One important factor concerning accelerometers is that they are sensitive to all external forces acting upon them, including gravity. Accelerometers use one of a number of different mechanisms (e.g., gravity), the force acts on the mass and displaces the spring.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/accel.png)
><sub>Accelerometers. (a) Mechanical accelerometer. (b) Piezoelectric accelerometer. Source: Springer Handbook of Robotics, Chapter 20.3</sub>

**Physical model (spring–mass–damper).**  
A basic accelerometer can be idealized as a proof mass $m$ attached to a spring $k$ with damping $c$; external force produces displacement $x$ measured by the readout:
$$
\begin{array}{rl}
F_{\text{applied}} &= F_{\text{inertial}} + F_{\text{damping}} + F_{\text{spring}} \\
&= m\ddot{x} + c\dot{x} + kx \, .
\end{array}
$$


Under a constant acceleration $a$ (e.g., gravity component), static equilibrium gives $k\,x \approx m\,a$ (ignoring damping), so displacement is proportional to acceleration; dynamics (bandwidth, settling) follow from the second-order system above. Mechanical implementations are sensitive to vibration and may converge slowly if under-damped. 

**Common transduction mechanisms.**
- **Mechanical (displacement-measured).** Uses the spring–mass–damper directly; simple but vibration-prone and slower to settle.
- **Piezoelectric.** A crystal stressed by the proof mass generates a measurable voltage; well suited to dynamic acceleration.
- 
*(Modern MEMS devices often use capacitive sensing of the proof-mass displacement; principles still map to the model above.)*

**Link to the inertial pipeline.**  
In an IMU, tri-axial gyros integrate attitude, accelerometer readings are rotated to the navigation frame, gravity is subtracted, and the result is integrated to **velocity** and then **position**. Any gyro/accel bias mis-orients gravity removal, so residual gravity integrates to large position drift over time, hence the need for sensor fusion.

**Key specifications**
- **Range** (e.g., $\pm2g,\ \pm16g$): prevent saturation during maneuvers.  
- **Scale factor / sensitivity** (e.g., mV/$(\mathrm{m/s^2})$): maps output to acceleration; accuracy matters for bias/scale calibration. 
- **Bias & bias stability / drift**: dominant long-term error; characterize across temperature and time.
- **Bandwidth / response time**: choose high enough for platform dynamics; avoid excessive internal filtering that adds latency.
- **Alignment & orthogonality**: small axis misalignments couple motions; include in calibration.

**Calibration & usage notes.**
- **Six-position “1 g” check.** Place each axis alternately up/down to estimate per-axis bias and scale ($\lVert a\rVert\approx g$ at rest).  
- **Ratiometric, low-noise readout.** Stable reference and clean analog path reduce noise; average multiple samples with care (filtering adds delay, Ch. 1.6).  
- **Mounting & temperature.** Rigid mounting minimizes parasitics; allow warm-up and compensate temperature coefficients.  
- **Gravity handling.** For motion estimation, subtract gravity using the best available attitude estimate before integration.

**Key takeaway.**  
Accelerometers convert proof-mass deflection into acceleration, inherently sensing gravity as well as motion. Their usefulness in robotics hinges on proper range selection, noise/bias management, bandwidth/latency budgeting, and calibration, and on fusing with other sensors to prevent integrated drift.

---

<details markdown="1">
  <summary>Conceptual questions</summary>

<p><strong>Question 1: Gravity sensitivity.</strong> True or False: An accelerometer at rest on a table will measure a nonzero acceleration magnitude of approximately $g$ because it senses gravity.</p>
<form id="ch2-acc-q1">
  <input type="radio" name="ch2-acc-q1" value="True"> True<br>
  <input type="radio" name="ch2-acc-q1" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-acc-q1','True',
      '✅ Correct! Accelerometers measure all external specific forces, including gravity.',
      '❌ Accelerometers are gravity sensitive; at rest they read about $1g$.')">
    Check Answer
  </button>
  <p id="ch2-acc-q1-feedback"></p>
</form>

<hr>

<p><strong>Question 2: Static equilibrium model.</strong> In the spring–mass–damper model with mass $m$, spring $k$, damping $c$, under constant acceleration $a$ (steady state), which relation best describes the displacement $x$?</p>
<form id="ch2-acc-q2">
  <input type="radio" name="ch2-acc-q2" value="A"> $kx \approx ma$<br>
  <input type="radio" name="ch2-acc-q2" value="B"> $cx \approx ma$<br>
  <input type="radio" name="ch2-acc-q2" value="C"> $m\ddot{x} \approx ma$<br>
  <input type="radio" name="ch2-acc-q2" value="D"> $kx \approx 0$<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-acc-q2','A',
      '✅ Correct! At steady state $\dot{x}=\ddot{x}=0$, so $kx=ma$ ignoring damping.',
      '❌ At equilibrium the spring balances the inertial force: $kx=ma$.')">
    Check Answer
  </button>
  <p id="ch2-acc-q2-feedback"></p>
</form>

<hr>

<p><strong>Question 3: Piezoelectric use case.</strong> Which statement best describes a piezoelectric accelerometer?</p>
<form id="ch2-acc-q3">
  <input type="radio" name="ch2-acc-q3" value="A"> Best for static measurements of $1g$ with no motion<br>
  <input type="radio" name="ch2-acc-q3" value="B"> Well suited to dynamic acceleration and vibration sensing<br>
  <input type="radio" name="ch2-acc-q3" value="C"> Measures velocity directly via Faraday induction<br>
  <input type="radio" name="ch2-acc-q3" value="D"> Immune to bias and temperature effects<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-acc-q3','B',
      '✅ Correct! Piezoelectric transducers respond to changing stress, ideal for dynamic signals.',
      '❌ Piezo devices are poor for true DC $1g$ measurements; they excel at dynamics.')">
    Check Answer
  </button>
  <p id="ch2-acc-q3-feedback"></p>
</form>

<hr>

<p><strong>Question 4: Six-position calibration.</strong> The primary goal of a six-position “1 g” test is to estimate per-axis:</p>
<form id="ch2-acc-q4">
  <input type="radio" name="ch2-acc-q4" value="A"> Bandwidth and latency<br>
  <input type="radio" name="ch2-acc-q4" value="B"> Bias and scale factors using the known magnitude $\lVert a\rVert\approx g$ at rest<br>
  <input type="radio" name="ch2-acc-q4" value="C"> Cross-axis vibration rejection only<br>
  <input type="radio" name="ch2-acc-q4" value="D"> Gyro alignment<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-acc-q4','B',
      '✅ Correct! Flipping each axis up/down lets you recover bias and scale against the $1g$ reference.',
      '❌ The six-position test targets bias/scale using gravity as a known input.')">
    Check Answer
  </button>
  <p id="ch2-acc-q4-feedback"></p>
</form>

<hr>

<p><strong>Question 5: Gravity removal in an IMU.</strong> True or False: Accurate attitude from gyros is important because any tilt error misprojects gravity, leaving a residual that integrates to large velocity/position drift.</p>
<form id="ch2-acc-q5">
  <input type="radio" name="ch2-acc-q5" value="True"> True<br>
  <input type="radio" name="ch2-acc-q5" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-acc-q5','True',
      '✅ Correct! Misestimated attitude corrupts gravity subtraction, causing integrated drift.',
      '❌ Gravity must be removed in the correct frame; attitude errors cause significant drift.')">
    Check Answer
  </button>
  <p id="ch2-acc-q5-feedback"></p>
</form>

</details>


---

<details markdown="1">
 <summary>Further exploration</summary>

  This short video explains how an accelerometer works.

  ![](https://www.youtube.com/watch?v=KZVgKu6v808)
  ><sub>*How a Smartphone Knows Up from Down (accelerometer) . YouTube video, 22.05.2012. Available at: https://www.youtube.com/watch?v=KZVgKu6v808*</sub>


</details>


---

#### Force, Torque, and Strain Sensing

Force, torque, and strain sensing enable a robot to perceive its own interactions with the environment. These measurements close the loop for compliant control, grasp stability, slip detection, and safe physical human–robot interaction. In practice, measurements are combined from multiple points along the actuation chain: motor currents (effort), joint or wrist force–torque (F/T) sensors, and tactile sensors on the skin or fingertips. Each measurement location captures a different portion of the system’s mechanics and noise characteristics, making the intended application of the data the central consideration in sensor design.

---

##### Measurement Location: From Effort to Contact
{: .no_toc }

* **Actuator effort (motor current).** In many electric drives, torque is approximately proportional to current, $\tau \approx k_t I$. This relationship is useful for fast inner-loop control, however, gearbox losses, friction, and compliance makes current an imperfect indicator of external contact forces at the output. 
* **Joint or wrist F/T sensors.** Multi-axis load cells or flexure-based sensors mounted at the wrist or fingertip directly measure forces and moments with high bandwidth. With a known fingertip geometry, the contact point can also be inferred from the measured $[\mathbf{f},\ \boldsymbol{\tau}]$, a capability often referred to as *intrinsic tactile sensing*.


---

##### Actuator effort: motor current as a torque sensor
{: .no_toc }

In most electric drives, **electromagnetic torque** is proportional to **motor current**. This makes the drive itself a built-in torque sensor.

**Core relation.**
For a motor with torque constant $k_t$,
$$
\tau_m \approx k_t I \quad \text{(SI units: } k_t[\mathrm{Nm/A]} \text{).}
$$
With a gear ratio $g$ (output torque is $g$ times motor shaft torque) and efficiency $\eta$,
$$
\tau_{\text{joint}} \approx \eta g k_t I - \tau_f(\dot{q}) - J_{\text{refl}} \ddot{q},
$$
where $\tau_f(\dot{q})$ captures friction and cogging effects, $J_{\text{refl}}$ is reflected inertia, and $q$ is the joint angle.

**Why it is popular.**

* Zero added mechanics or wiring; readings arrive at **drive rates** with minimal latency.
* Sufficient for many inner-loop controllers, collision detection, and coarse force regulation.

**Implementation notes.**

* **Current measurement.** Shunt resistor (precise, adds burden voltage) or Hall-effect/isolated sensors (galvanic isolation, lower insertion loss).
* **Calibration.** Identify $k_t$ from datasheet then verify under load; characterize $\tau_f(\dot{q})$ via slow sweeps; measure $\eta$ under representative speeds/loads.
* **Limits and pitfalls.**

  * Gear friction, stiction, and cogging bias the estimate at low speeds.
  * Thermal drift of phase resistance and $k_t$ changes the mapping over temperature.
  * Current loops and PWM add ripple; bandwidth and filtering trade latency against noise.
  * Backlash/compliance decouple motor torque from external interaction torque during reversals.

**When to add a true torque sensor.**
If precise low-force regulation, contact transients, or model uncertainties dominate, **joint torque sensors**, **series elastic elements**, or **wrist F/T sensors** provide more reliable interaction measurements.

---

##### Strain-based sensing
{: .no_toc }

Strain-based sensing measures tiny elastic deformations in a compliant mechanical element and infers the applied force or torque through a known stiffness model. It is the workhorse behind joint torque sensors, six-axis wrist force–torque (F/T) sensors, weigh-scale load cells, and many tactile skins.

##### What is measured
{: .no_toc }

* **Strain** is the relative change in length, $\varepsilon = \Delta L / L$ (unitless). In metals operating in the linear elastic regime, stress $\sigma$ and strain relate by $\sigma = E \varepsilon$, where $E$ is Young’s modulus.
* **Strain gauges** convert strain to an electrical signal. The most common are metal-foil resistive gauges; alternatives include piezoresistive silicon and piezoelectric ceramics.

##### Core transducer physics
{: .no_toc }

* **Foil (resistive) strain gauges.** Electrical resistance $R$ changes approximately linearly with strain:
  $$
  \frac{\Delta R}{R} \approx \mathrm{GF},\varepsilon,
  $$
  where $\mathrm{GF}$ is the gauge factor (typically 2.0 for metal foil). Gauges are bonded to the elastic element with adhesive; alignment sets sensitivity to axial, bending, or torsional strain.
* **Piezoresistive silicon.** Doped silicon has a larger effective gauge factor (10–150), enabling compact, low-noise sensors, often integrated on diaphragms or micro-flexures.
* **Piezoelectric.** Generates charge proportional to dynamic strain. Very high bandwidth but poor at true DC; best for vibration or impact sensing (dynamic tactile).

##### From strain to force/torque
{: .no_toc }

A compliant element (beam, ring, cross-shape, diaphragm, or torsion tube) concentrates strain where gauges are placed. With a linear elastic model,
$$
\mathbf{v} = \mathbf{S},\mathbf{w} + \mathbf{b},
$$
where $\mathbf{v}$ collects bridge voltages, $\mathbf{w} = [F_x, F_y, F_z, \tau_x, \tau_y, \tau_z]^\top$ is the wrench (forces and torques) at a reference point, $\mathbf{S}$ is the sensitivity matrix determined by geometry and gauge placement, and $\mathbf{b}$ is an offset. Calibration identifies $\mathbf{S}$ (and $\mathbf{b}$) by applying known loads and solving a linear regression; the inverse then maps voltages back to forces and torques.

##### Bridge circuits and signal conditioning
{: .no_toc }

* **Wheatstone bridge.** Gauges are wired as quarter-, half-, or full-bridges. Full-bridges place gauges in tension and compression, doubling sensitivity and providing temperature compensation.
* **Excitation.** Constant-voltage (e.g., $V_\mathrm{ex}=2$–10 V) is common; constant-current can reduce self-heating drift.
* **Amplification.** Instrumentation amplifiers provide high common-mode rejection ratio (CMRR). Typical strain signals are millivolts, so gain of 100–1000 is routine.
* **Filtering and sampling.** Anti-alias filters and low-latency digitization (16–24 bit ADCs) preserve bandwidth while controlling noise.
* **Ratiometric readout.** Measuring $V_\mathrm{out}/V_\mathrm{ex}$ cancels excitation drift.

**Back-of-the-envelope.** Quarter-bridge, 120 Ω, $\mathrm{GF}=2$, $\varepsilon=1000,\mu\varepsilon$ gives $\Delta R/R = 0.002$. Approximate bridge output $V_\mathrm{out} \approx (V_\mathrm{ex}/4)(\Delta R/R)$, so with $V_\mathrm{ex}=5$ V, $V_\mathrm{out}\approx 2.5$ mV. An instrumentation amplifier is thus required.

<!-- #### Dynamic tactile sensing (catching slip and events)

Dynamic touch sensors respond to rapid, small disturbances at the contact. They are invaluable for:

* **Slip detection.** Incipient slip starts at the contact periphery as micro-slips that create small vibrations. High-bandwidth elements (e.g., accelerometers on the skin, PVDF piezo films, or even acoustic emissions on metal grippers) detect these before gross sliding occurs, enabling you to *raise grip force just enough*. 
* **Texture and fine feature perception.** Lightly dragging a ridged or fibered skin over a surface turns micro-geometry into vibrations that can be analyzed for material or texture cues. 

Dynamic channels are often paired with slow/steady channels (F/T or pressure) so that you get both event timing and steady load level. Practically, you must distinguish true slip/contact events from drivetrain vibrations; comparing “at-contact” vs “off-contact” sensors or using pattern recognition helps. 

---

#### Array sensors (from “is it touching?” to “how is it touching?”)

Tactile arrays turn contact patches into spatial maps. Families differ mainly by **transduction**, **robustness**, and **integration** needs.

| Family                                                     | What it measures                                     | Typical build                                           | Strengths                                                  | Trade-offs                                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Capacitive pressure arrays**                             | Local normal pressure via change in capacitance      | Row/column electrodes with elastomer dielectric         | Good sensitivity, low hysteresis, scalable to large skins  | Needs shielding from stray capacitance; multiplexing and wiring complexity |
| **Piezoresistive arrays (FSR, inks, elastomers, fabrics)** | Pressure via resistance change                       | Conductive rubber or inks; sometimes woven fabrics      | Simple electronics, low cost, conformable over large areas | Drift and hysteresis; limited absolute accuracy                            |
| **MEMS micro-arrays**                                      | Normal and sometimes shear forces                    | Silicon or hybrid flexible devices with on-chip readout | High spatial resolution, integration with local processing | Brittle if silicon-only; packaging into soft skins is non-trivial          |
| **Optical tactiles**                                       | Skin deformation or contact location via light paths | Tiny camera + marked membrane, or LED–photodiode pairs  | Immune to EM noise; can read rich deformations             | More computation; packaging and calibration of optics                      |
| **Skin-deflection sensors**                                | Membrane shape or impedance change                   | Fluid or gel-filled skins with internal sensing         | Compliant, robust contact; can infer contact geometry      | Need models or deconvolution to map deflection to pressure                 |

Large tactile coverings increasingly integrate local MCUs for capacitance measurement and scanning to reduce wiring, often borrowing touch-screen tech. For fingertips, hybrid “multimodal” tips combine pressure, vibration, and thermal sensing for robust grasping and surface characterization. 

---

#### Using force and tactiles in the control stack

Tactile/force information flows neatly into manipulation tasks:

* **From joints and F/T to contact forces.** With joint torques $\boldsymbol{\tau}$ and Jacobian $\mathbf{J}$, the mapping $\mathbf{J}^\top \mathbf{f}=\boldsymbol{\tau}$ links external wrench $\mathbf{f}$ to measured efforts. Wrist or fingertip F/T sensors give $\mathbf{f}$ directly and with better signal-to-noise for fast contact transients. Pair with geometry to localize contacts. 
* **From arrays to distributed contact.** Sub-surface sensing blurs sharp pressure peaks. Simple elasticity models or deconvolution reconstruct approximate surface pressure and shear from the measured strains or deflections so controllers can react to not just *how much* but *where*. 
* **Event channels.** Dynamic tactiles flag first touch, incipient slip, or impact, letting the controller switch modes or adjust gains quickly. 

---

#### Practical selection and integration notes

* **Match sensor location to the job.** Inner torque loop: motor current. Grasp and contact regulation: wrist/fingertip F/T. Exploring shape or monitoring slip: add tactile arrays and dynamic channels. 
* **Bandwidth and latency.** Choose bandwidth high enough to catch slip onset and contact transitions. Beware heavy filtering that adds delay.
* **Mechanical design matters.** Flexure-based F/T sensors need stiffness without saturating; fingertip skins need compliance and friction for stable grasps. Mount rigidly and protect cables. 
* **Calibration and drift.** Piezoresistive skins drift and show hysteresis; capacitives need shielding; optical tactiles need periodic reference frames. Temperature compensation helps across all types. 
* **Wiring and modularity.** Dense arrays benefit from local scanning and digital buses to reduce harness bulk. Consider modular tiles with onboard microcontrollers. 

**Key takeaway.** Effort, F/T, and tactile sensing are complementary. Use the simplest sensor that gives the information you actually need, and place it as *close to the contact* as practicality and robustness allow.

---

#### Conceptual questions

1. What are two reasons motor current is often a poor *contact* force estimate at the end effector?
2. Why are dynamic tactile sensors well suited to detecting *incipient* slip rather than only gross sliding?
3. What key advantage do capacitive tactile arrays have over piezoresistive arrays, and what common challenge do they introduce?
4. How can a wrist or fingertip F/T sensor plus fingertip geometry estimate the contact point without a tactile array?
5. In a fingertip skin that senses sub-surface strain, why is deconvolution or a mechanical model needed to estimate surface pressure?

---

#### Further exploration (free resources)

* Overview of tactile sensing in robotics: [Wikipedia – Tactile sensor](https://en.wikipedia.org/wiki/Tactile_sensor)
* Manipulation and contact models: [MIT OCW – Underactuated Robotics (contact & manipulation lectures)](https://ocw.mit.edu)
* Slip detection intuition: short demo talks on PVDF and accelerometer-based tactiles (search on YouTube for “robotic slip detection PVDF”). -->


---

### Exteroceptive Sensors

{: #ch3 }

Exteroceptive sensors provide the measurements that allow a robot to build an understanding of what surrounds it, not just what it is doing internally. This is the sensing foundation for tasks like avoiding obstacles, following corridors, recognizing objects, estimating position in a map, and adapting behavior to changing environments.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/icubsensors.png)
><sub>This <a href="https://icub.iit.it/"> ICub Humanoid Robot</a> is endowed with high resolution binocular cameras for 3-dimensional rendering of the world and tactile sensors to perceive touch at its fingertips. All these sensors are necessary to reach and grab the red ball. Credit: EPFL/LASA Laboratory</sub>

In the ICub humanoid robot shown in the image, the exteroceptive sensors complement the internal sensing used for control. Its RGB cameras provide rich visual information about nearby objects, their relative position in the scene, and motion cues from frame-to-frame changes. Its microphones provide auditory information, enabling detection and localization of sound sources (for example, a human voice or an alarm) and supporting interaction. Together, these exteroceptive sensors give the robot a more complete and task-relevant picture of the world around it, extending perception beyond what can be inferred from internal measurements alone.

A key feature of exteroceptive sensing is that the raw signals often describe the world indirectly. A camera produces images, a range sensor produces distances, and a satellite receiver produces global position estimates. Turning these signals into actionable information usually requires a processing pipeline that may include filtering, feature extraction, geometric reasoning, and sometimes machine learning. As a result, exteroceptive sensing is typically more computationally demanding and more sensitive to measurement conditions than internal sensing.

Exteroceptive sensors also come in a wide range of “data shapes” and trade-offs:

* Single-value measurements (for example, distance-to-obstacle from an ultrasonic sensor)
* Structured arrays (for example, depth images from a time-of-flight camera)
* High-dimensional observations (for example, RGB images and 3D point clouds from LiDAR)
* Global references (for example, Global Navigation Satellite System (GNSS) position outdoors)

Each modality brings different strengths and failure modes. Cameras can provide rich semantic information but depend strongly on lighting and texture. Ultrasonic sensors are inexpensive and robust at close range but struggle with soft materials and angled surfaces. LiDAR provides accurate geometry but can be affected by reflective or absorbing surfaces and weather. Practical robot designs often combine multiple exteroceptive sensors to reduce blind spots and improve robustness.

This chapter introduces common exteroceptive sensor families, the physical principles behind their measurements, and the practical considerations that determine real-world performance. 

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: Why do many exteroceptive sensors require substantial processing before their outputs can guide robot decisions?</strong></p>
<form id="ch3-extero-intro-q1">
  <input type="radio" name="ch3-extero-intro-q1" value="A"> Because exteroceptive sensors always measure motor currents, which are hard to interpret<br>
  <input type="radio" name="ch3-extero-intro-q1" value="B"> Because they often produce raw signals (images, point clouds, distances) that must be converted into higher-level information (features, objects, geometry)<br>
  <input type="radio" name="ch3-extero-intro-q1" value="C"> Because their measurements are already decisions, but robots still double-check for safety<br>
  <input type="radio" name="ch3-extero-intro-q1" value="D"> Because exteroceptive sensors can only be read at very low rates, so processing replaces sampling<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-extero-intro-q1', 'B',
      '✅ Correct! Exteroceptive sensors often output raw measurements that need filtering and interpretation (for example, extracting depth, obstacles, or landmarks).',
      '❌ Try again. The key idea is that exteroceptive sensors often produce raw data that must be transformed into meaningful world information.')">
    Check Answer
  </button>
  <p id="ch3-extero-intro-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: Which scenario best describes a case where a range sensor might work well but a camera might fail?</strong></p>
<form id="ch3-extero-intro-q2">
  <input type="radio" name="ch3-extero-intro-q2" value="A"> A dark hallway with very little light, where obstacle distances are still needed<br>
  <input type="radio" name="ch3-extero-intro-q2" value="B"> A bright sunny day, where cameras always saturate but range sensors always fail<br>
  <input type="radio" name="ch3-extero-intro-q2" value="C"> A scene with many colorful objects, where range sensors cannot measure distance at all<br>
  <input type="radio" name="ch3-extero-intro-q2" value="D"> A textured wall, where cameras cannot detect edges but ultrasonic sensors detect texture patterns<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-extero-intro-q2', 'A',
      '✅ Correct! Cameras depend strongly on illumination, while many range sensors can still return useful distances in low-light conditions.',
      '❌ Try again. Think about which sensor is most sensitive to lighting conditions and which can still report distance without relying on visible light.')">
    Check Answer
  </button>
  <p id="ch3-extero-intro-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: What is the most practical meaning of a sensor’s “field of view” (FoV) for a mobile robot?</strong></p>
<form id="ch3-extero-intro-q3">
  <input type="radio" name="ch3-extero-intro-q3" value="A"> The robot’s allowed driving area, defined by safety regulations<br>
  <input type="radio" name="ch3-extero-intro-q3" value="B"> The maximum battery capacity needed to power the sensor for one hour<br>
  <input type="radio" name="ch3-extero-intro-q3" value="C"> The sensor’s measurement precision, expressed in degrees<br>
  <input type="radio" name="ch3-extero-intro-q3" value="D"> The region of the environment the sensor can observe at a given moment (angular coverage and sometimes range limits)<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-extero-intro-q3', 'D',
      '✅ Correct! The field of view describes what part of the surroundings the sensor can see at once, which directly affects coverage and blind spots.',
      '❌ Try again. Field of view is about what portion of the environment is observable, not about power, precision alone, or regulations.')">
    Check Answer
  </button>
  <p id="ch3-extero-intro-q3-feedback"></p>
</form>

<hr>

<!-- Question 4 -->

<p><strong>Question 4: Why is time alignment between different exteroceptive sensor measurements important when the robot is moving?</strong></p>
<form id="ch3-extero-intro-q4">
  <input type="radio" name="ch3-extero-intro-q4" value="A"> Because time alignment removes all measurement noise, making filters unnecessary<br>
  <input type="radio" name="ch3-extero-intro-q4" value="B"> Because time alignment increases the sensor’s field of view by averaging timestamps<br>
  <input type="radio" name="ch3-extero-intro-q4" value="C"> Because sensors can have different update times, and combining mis-timed data can create a distorted or inconsistent view of the world
<br>
  <input type="radio" name="ch3-extero-intro-q4" value="D"> Because time alignment is only needed for stationary robots, not moving robots<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-extero-intro-q4', 'C',
      '✅ Correct! If the robot moves, data captured at different times can correspond to different robot poses, causing errors when fusing measurements.',
      '❌ Try again. Consider what happens if one sensor sees the world “earlier” than another while the robot is changing position or orientation.')">
    Check Answer
  </button>
  <p id="ch3-extero-intro-q4-feedback"></p>
</form>

<hr>

<!-- Question 5 -->

<p><strong>Question 5: What is a strong reason to use multiple different exteroceptive sensing modalities on the same robot?</strong></p>
<form id="ch3-extero-intro-q5">
  <input type="radio" name="ch3-extero-intro-q5" value="A"> Different sensors have complementary strengths, so combining them reduces blind spots and improves robustness under changing conditions<br>
  <input type="radio" name="ch3-extero-intro-q5" value="B"> Multiple sensors guarantee perfect measurements, so calibration is no longer needed<br>
  <input type="radio" name="ch3-extero-intro-q5" value="C"> Using more sensors always reduces computation because work is split automatically<br>
  <input type="radio" name="ch3-extero-intro-q5" value="D"> Multiple sensors are only useful to increase robot speed, not perception reliability<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-extero-intro-q5', 'A',
      '✅ Correct! Sensor modalities can compensate for each other’s weaknesses (for example, geometry from LiDAR and semantics from cameras).',
      '❌ Try again. Think about robustness: different sensors fail in different ways, so combining them can make perception more reliable.')">
    Check Answer
  </button>
  <p id="ch3-extero-intro-q5-feedback"></p>
</form>

</details>


---

#### Contact Sensors (Touch and Tactile Sensing)

Contact sensors measure the environment **through physical interaction**. Unlike cameras or rangefinders that observe at a distance, contact sensing becomes informative only when the robot **touches** something. This makes contact sensors especially important for tasks where “knowing by touching” is unavoidable, such as grasping an object reliably, detecting collisions, or walking on uncertain terrain.

In robotics curricula, contact sensing is often discussed together with **force perception**, because many contact sensors ultimately aim to estimate contact forces, torques, pressure distributions, and slip events. The detailed sensor principles (resistive, capacitive, piezoelectric, optical tactile sensors), calibration procedures, and force-control use cases are covered in [Force Perception]({{ site.baseurl }}/docs/chap2_sensing/force_perception), so this section focuses on how contact sensing fits into exteroceptive perception.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/touch_sensors.png){: width="500" }
> <sub>Uses of tactile sensing in robotics. Source: Springer Handbook of Robotics, Fig. 28.1. </sub>

Contact sensing is typically used in three recurring interaction modes: manipulation, exploration, and response. During manipulation, contact measurements help regulate grasp force, infer contact constraints, and assess stability. During exploration, the robot deliberately touches surfaces to estimate properties like texture, friction, or hardness. During response, contact sensing serves safety and robustness by detecting unexpected contact and triggering fast reactions.

Contact sensing spans a spectrum from simple “touch happened” signals to rich measurements of how contact is distributed:

* **Binary contact sensors (contact switches, bumpers):** output a yes/no signal indicating contact. These are common in mobile robots for low-cost collision detection and as safety bumpers.
* **Local force or pressure sensors (force-sensitive resistors, pressure pads):** output a continuous value related to contact intensity. These are often placed in grippers, fingertips, or foot soles.
* **Tactile arrays (tactile skin, fingertip taxels):** measure pressure over many small sensing elements (often called *taxels*, short for tactile pixels), producing a “pressure image” of contact. This supports estimating contact location, contact area, and detecting slip or rolling.
* **Force/torque sensing at an end-effector (force–torque sensor):** measures the net interaction at a mounting point, typically providing forces and torques along three axes each (often called 6-axis force/torque sensing). This is widely used for compliant manipulation, surface following, and safe physical interaction.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/force_torque_contact.png){: width="500" }
> <sub>Miniature fingertip force–torque sensor for a prosthetic hand. Source: Springer Handbook of Robotics, Fig. 28.2. </sub>

---

##### Why contact sensing matters in practice
{: .no_toc }

* **Robust manipulation:** vision can suggest where an object is, but contact sensing confirms *when* the object is actually grasped, whether it is slipping, and how firmly it is held.
* **Safe physical interaction:** contact sensors can trigger fast reflexes (stop, retract, compliant behavior) when unexpected contact occurs.
* **Locomotion and terrain adaptation:** foot contact sensors help detect touch-down, estimate load distribution, and improve balance on uneven or deformable ground.
* **Exploration of unknown objects:** tactile arrays can reveal local geometry and material cues (edges, ridges, softness) that may be ambiguous visually.

---

##### Practical design trade-offs
{: .no_toc }

When selecting or integrating a contact sensor, typical engineering trade-offs include:

* **Sensitivity vs durability:** soft compliant skins can detect light touch but may wear out faster in harsh environments.
* **Spatial resolution vs wiring and computation:** high-resolution tactile arrays provide richer information but increase cabling complexity, data rate, and processing demands.
* **Bandwidth (speed) vs noise:** fast contact events (taps, slip onset) require higher sampling rates, which can amplify noise and require filtering.
* **Calibration and drift:** many tactile and force sensors exhibit offset drift, hysteresis, and temperature dependence, so periodic calibration and compensation can be necessary.
* **Placement:** fingertip sensors give precise local contact details, while wrist-mounted force–torque sensing gives a global interaction measurement but cannot directly localize contact along a finger without additional modeling.

---

##### How contact sensing complements other exteroceptive sensors
{: .no_toc }

Contact sensing is often the “last meter” of perception: cameras and range sensors guide the robot toward a target, and contact sensors confirm and regulate the final interaction. A practical example is grasping: vision estimates an object pose and plans an approach, while tactile sensing confirms contact timing, corrects grasp alignment, and detects slip during lifting.

---
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: Why can a contact sensor be considered exteroceptive even though it is mounted on the robot?</strong></p>
<form id="ch3-contact-q1">
  <input type="radio" name="ch3-contact-q1" value="A"> Because it directly measures the robot’s internal joint torques during motion<br>
  <input type="radio" name="ch3-contact-q1" value="B"> Because it measures properties of the environment through physical interaction at the robot’s surface<br>
  <input type="radio" name="ch3-contact-q1" value="C"> Because it only works when the robot is stationary, so it must be external sensing<br>
  <input type="radio" name="ch3-contact-q1" value="D"> Because it estimates global position like GNSS when contact occurs<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-contact-q1', 'B',
      '✅ Correct! Contact sensors measure the external world through interaction at the robot-environment interface, even if the hardware is mounted on the robot.',
      '❌ Try again. Exteroceptive sensing is defined by measuring the environment, not by where the sensor is mounted.')">
    Check Answer
  </button>
  <p id="ch3-contact-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: A bumper switch on a mobile robot is most directly used for which purpose?</strong></p>
<form id="ch3-contact-q2">
  <input type="radio" name="ch3-contact-q2" value="A"> Measuring a detailed pressure map to infer object shape<br>
  <input type="radio" name="ch3-contact-q2" value="B"> Estimating the full 6-axis force and torque at the end-effector<br>
  <input type="radio" name="ch3-contact-q2" value="C"> Detecting that contact occurred and triggering a safety or reflex response<br>
  <input type="radio" name="ch3-contact-q2" value="D"> Identifying object class from tactile texture patterns over time<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-contact-q2', 'C',
      '✅ Correct! A bumper switch is typically a binary sensor used to detect collisions or contact events and trigger fast reactions.',
      '❌ Try again. A bumper switch usually provides a yes/no contact signal, not a rich force map or object classification.')">
    Check Answer
  </button>
  <p id="ch3-contact-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: Which task benefits most from a tactile array (many taxels) compared to a single force sensor?</strong></p>
<form id="ch3-contact-q3">
  <input type="radio" name="ch3-contact-q3" value="A"> Detecting whether any contact occurred at all<br>
  <input type="radio" name="ch3-contact-q3" value="B"> Estimating where contact occurs on the fingertip and how contact pressure is distributed<br>
  <input type="radio" name="ch3-contact-q3" value="C"> Measuring the robot battery voltage during grasping<br>
  <input type="radio" name="ch3-contact-q3" value="D"> Estimating global position drift during long navigation missions<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-contact-q3', 'B',
      '✅ Correct! Tactile arrays provide spatial information: contact location, area, and pressure distribution, which a single force sensor cannot directly resolve.',
      '❌ Try again. A single force sensor can indicate net force, but a tactile array is mainly valuable for spatially resolved contact information.')">
    Check Answer
  </button>
  <p id="ch3-contact-q3-feedback"></p>
</form>

<hr>

<!-- Question 4 -->

<p><strong>Question 4: A wrist-mounted force–torque (F/T) sensor reports a large net force during a grasp. Which situation could produce a similar reading even if the object is not securely grasped?</strong></p>
<form id="ch3-contact-q4">
  <input type="radio" name="ch3-contact-q4" value="A"> The robot’s camera exposure time is set too long<br>
  <input type="radio" name="ch3-contact-q4" value="B"> The gripper lightly touches a rigid table edge, creating a large reaction force without stable grasp closure<br>
  <input type="radio" name="ch3-contact-q4" value="C"> The robot increases its Wi-Fi transmit power<br>
  <input type="radio" name="ch3-contact-q4" value="D"> The robot reads higher-resolution images from its RGB camera<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-contact-q4', 'B',
      '✅ Correct! A large net force can result from pushing against the environment (e.g., table or fixture) even if the grasp itself is weak or slipping.',
      '❌ Try again. The F/T sensor measures mechanical interaction at the wrist; similar net forces can come from unintended contacts with the environment.')">
    Check Answer
  </button>
  <p id="ch3-contact-q4-feedback"></p>
</form>

<hr>

<!-- Question 5 -->

<p><strong>Question 5: Why do high-resolution tactile skins often create system-level challenges beyond the sensor physics?</strong></p>
<form id="ch3-contact-q5">
  <input type="radio" name="ch3-contact-q5" value="A"> They require an outdoor satellite link to synchronize all taxels<br>
  <input type="radio" name="ch3-contact-q5" value="B"> They always eliminate the need for vision and range sensing, so planning becomes harder<br>
  <input type="radio" name="ch3-contact-q5" value="C"> They increase wiring, data rate, and processing demands because many sensing elements must be read and interpreted in real time<br>
  <input type="radio" name="ch3-contact-q5" value="D"> They can only measure torque, not pressure, so additional sensors are mandatory<br>
  <button type="button"
    onclick="checkTrueFalse('ch3-contact-q5', 'C',
      '✅ Correct! Many taxels mean more channels to read, more cabling, higher bandwidth, and more computation for filtering and interpretation.',
      '❌ Try again. The main difficulty is practical integration: wiring, data transfer, power, and real-time processing for large numbers of sensing elements.')">
    Check Answer
  </button>
  <p id="ch3-contact-q5-feedback"></p>
</form>

</details>

---

<details markdown="1">
  <summary>Further exploration</summary>
* [Chapter 2.3 : Force Perception]({{ site.baseurl }}/docs/chap2_sensing/force_perception)
* [Tactile sensor](https://en.wikipedia.org/wiki/Tactile_sensor)
* [Force sensor](https://en.wikipedia.org/wiki/Force_sensor)
* [Force sensing resistor](https://en.wikipedia.org/wiki/Force-sensing_resistor)

</details>

---

#### Rangefinders

Rangefinders are a family of exteroceptive sensors that provide measurements of the distance between the robot and objects in its environment. These sensors are vital for tasks such as obstacle avoidance, mapping, localization, and autonomous navigation. Unlike contact sensors, which rely on physical interaction, rangefinders gather data from a distance and are typically used to understand the environment beyond the immediate vicinity of the robot.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/lidar.png)

> <sub>LiDAR-based rangefinders are used in various robotic applications for obstacle detection, navigation, and spatial mapping. Source: https://news.panasonic.com/global/stories/805</sub>

In the image above, we see the principle of LiDAR technology, where the sensor emits a laser beam towards an object. The time it takes for the laser to travel to the object and return to the sensor is measured, and this time delay is used to calculate the distance. This technology is commonly used in autonomous vehicles and industrial robots for tasks like obstacle detection and spatial mapping. By measuring distances to surrounding objects, it helps robots understand their environment and make decisions about their movement.

Rangefinders operate on the principle of **time-of-flight (ToF)**, where the sensor measures the time it takes for a signal (typically infrared or ultrasonic) to travel to an object and back. By knowing the speed of the signal and the round-trip time, the distance can be computed using the formula:

$$
\text{Distance} = \frac{c \cdot t}{2}
$$

Where:

* (c) is the speed of the signal (typically the speed of light for lasers or sound speed for ultrasonic),
* (t) is the round-trip travel time of the signal.

The key advantage of rangefinders is their ability to provide **absolute distance measurements** directly, without requiring complex image processing or external references, making them well-suited for both indoor and outdoor navigation tasks.

---

##### Types of Rangefinders
{: .no_toc }

Rangefinders come in various technologies, each with its strengths and limitations. The most common types include:

* **Ultrasonic Rangefinders:** Use sound waves to measure distances. They are widely used in robotics for short-range applications due to their low cost and simplicity.
* **Infrared (IR) Rangefinders:** Measure distance using infrared light. They are compact, inexpensive, and often used in small robots and consumer devices.
* **Laser Rangefinders (LiDAR):** Use laser beams to measure distances with high precision and are widely used in autonomous vehicles and drones. They provide highly accurate 3D distance measurements and are often used in mapping and localization tasks.

---

##### Rangefinder Applications
{: .no_toc }

Rangefinders are utilized in a variety of tasks across different robotic applications:

* **Obstacle Detection and Avoidance:** Robots use rangefinders to measure the distance to surrounding objects and avoid collisions by navigating around them.
* **Mapping and Localization:** Robots equipped with rangefinders can create detailed maps of their environment by collecting distance data from multiple points, allowing them to localize themselves within the map.
* **Autonomous Navigation:** Rangefinders support path planning and trajectory control by continuously measuring distances to obstacles and ensuring safe navigation through dynamic environments.

---

##### Practical Design Trade-offs
{: .no_toc }

When selecting a rangefinder for a robot, there are several design considerations and trade-offs to take into account:

* **Range vs. Resolution:** High-resolution rangefinders can measure small distance variations, but their range may be limited. Conversely, long-range sensors may offer less fine-grained resolution.
* **Accuracy vs. Cost:** Ultrasonic and IR sensors are less expensive but provide lower accuracy compared to more advanced technologies like LiDAR.
* **Environmental Sensitivity:** Some rangefinders are affected by environmental conditions such as lighting (for IR sensors) or weather (for LiDAR), so robustness to different conditions is a key factor in sensor selection.
* **Speed vs. Noise:** Fast-range measurement systems may suffer from higher noise, while slower systems offer better stability but might be unsuitable for fast-moving robots.

---

##### Why Rangefinders Matter in Practice
{: .no_toc }

Rangefinders are essential for building an accurate and reliable model of the robot's surroundings. By providing real-time distance data, they allow the robot to make informed decisions about its movement and interactions. For example, LiDAR enables high-precision navigation in environments that are too complex or dynamic for simpler sensors like ultrasonic or IR rangefinders.

Additionally, rangefinders support **sensor fusion**, where their data is combined with information from other exteroceptive sensors (e.g., cameras, IMUs) to create a richer, more reliable understanding of the environment. This fusion improves performance in complex scenarios such as indoor navigation, dynamic obstacle avoidance, and multi-robot coordination.

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: What is the primary advantage of using a rangefinder compared to a camera in robotic applications?</strong></p>
<form id="ch4-rangefinder-q1">
  <input type="radio" name="ch4-rangefinder-q1" value="A"> Rangefinders provide detailed visual information about objects<br>
  <input type="radio" name="ch4-rangefinder-q1" value="B"> Rangefinders provide direct measurements of distance without requiring complex image processing<br>
  <input type="radio" name="ch4-rangefinder-q1" value="C"> Rangefinders are only useful for navigation, not for object recognition<br>
  <input type="radio" name="ch4-rangefinder-q1" value="D"> Rangefinders are only effective in high-light environments<br>
  <button type="button"
    onclick="checkTrueFalse('ch4-rangefinder-q1', 'B',
      '✅ Correct! Rangefinders provide direct distance measurements, which are less computationally intensive than image processing for object recognition.',
      '❌ Try again. The key advantage of rangefinders is their ability to measure distance directly, without needing image analysis.')">
    Check Answer
  </button>
  <p id="ch4-rangefinder-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: Which type of rangefinder is most commonly used for precise 3D mapping in autonomous vehicles?</strong></p>
<form id="ch4-rangefinder-q2">
  <input type="radio" name="ch4-rangefinder-q2" value="A"> Ultrasonic sensors<br>
  <input type="radio" name="ch4-rangefinder-q2" value="B"> LiDAR (Laser Rangefinders)<br>
  <input type="radio" name="ch4-rangefinder-q2" value="C"> IR sensors<br>
  <input type="radio" name="ch4-rangefinder-q2" value="D"> Sonar sensors<br>
  <button type="button"
    onclick="checkTrueFalse('ch4-rangefinder-q2', 'B',
      '✅ Correct! LiDAR sensors are commonly used for high-precision 3D mapping and are widely deployed in autonomous vehicles.',
      '❌ Try again. LiDAR provides highly accurate 3D distance measurements, making it ideal for detailed mapping and localization.')">
    Check Answer
  </button>
  <p id="ch4-rangefinder-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: What is the main limitation of ultrasonic rangefinders in practical robotics applications?</strong></p>
<form id="ch4-rangefinder-q3">
  <input type="radio" name="ch4-rangefinder-q3" value="A"> They are only useful for long-range detection<br>
  <input type="radio" name="ch4-rangefinder-q3" value="B"> They are sensitive to environmental factors like lighting and weather<br>
  <input type="radio" name="ch4-rangefinder-q3" value="C"> They have low accuracy and are prone to interference from reflective surfaces<br>
  <input type="radio" name="ch4-rangefinder-q3" value="D"> They can only measure distances in one direction<br>
  <button type="button"
    onclick="checkTrueFalse('ch4-rangefinder-q3', 'C',
      '✅ Correct! Ultrasonic rangefinders are less accurate than other types and can be affected by interference from reflective surfaces.',
      '❌ Try again. While ultrasonic sensors are inexpensive, their accuracy is lower, and they struggle with reflective materials and angled surfaces.')">
    Check Answer
  </button>
  <p id="ch4-rangefinder-q3-feedback"></p>
</form>

<hr>

<!-- Question 4 -->

<p><strong>Question 4: Why is sensor fusion important when using rangefinders on robots?</strong></p>
<form id="ch4-rangefinder-q4">
  <input type="radio" name="ch4-rangefinder-q4" value="A"> It improves the robot's ability to recognize objects by color<br>
  <input type="radio" name="ch4-rangefinder-q4" value="B"> It allows the robot to estimate distances more accurately in real-time<br>
  <input type="radio" name="ch4-rangefinder-q4" value="C"> It enables the robot to combine multiple sensor inputs for a more reliable understanding of the environment<br>
  <input type="radio" name="ch4-rangefinder-q4" value="D"> It allows rangefinders to work without needing any other sensors<br>
  <button type="button"
    onclick="checkTrueFalse('ch4-rangefinder-q4', 'C',
      '✅ Correct! Sensor fusion combines multiple sensor modalities to create a more accurate and robust perception of the environment.',
      '❌ Try again. Sensor fusion allows the robot to combine different sensor inputs to compensate for individual sensor weaknesses.')">
    Check Answer
  </button>
  <p id="ch4-rangefinder-q4-feedback"></p>
</form>

<hr>

<!-- Question 5 -->

<p><strong>Question 5: What trade-off must be considered when choosing between ultrasonic and LiDAR rangefinders for a robot?</strong></p>
<form id="ch4-rangefinder-q5">
  <input type="radio" name="ch4-rangefinder-q5" value="A"> Ultrasonic rangefinders are always more accurate than LiDAR<br>
  <input type="radio" name="ch4-rangefinder-q5" value="B"> LiDAR is typically more expensive but provides higher accuracy and longer range than ultrasonic sensors<br>
  <input type="radio" name="ch4-rangefinder-q5" value="C"> Ultrasonic rangefinders work better in bright light conditions<br>
  <input type="radio" name="ch4-rangefinder-q5" value="D"> LiDAR has lower energy consumption than ultrasonic sensors<br>
  <button type="button"
    onclick="checkTrueFalse('ch4-rangefinder-q5', 'B',
      '✅ Correct! LiDAR provides better accuracy and range than ultrasonic sensors but comes at a higher cost.',
      '❌ Try again. LiDAR offers superior range and precision but is more expensive than ultrasonic sensors.')">
    Check Answer
  </button>
  <p id="ch4-rangefinder-q5-feedback"></p>
</form>

</details>

---

<details markdown="1">
  <summary>Further exploration</summary>
* [Laser Rangefinder](https://en.wikipedia.org/wiki/Laser_rangefinder)
* [Ultrasonic Sensor](https://en.wikipedia.org/wiki/Ultrasonic_sensor)
* [LiDAR](https://en.wikipedia.org/wiki/Lidar)
</details>

---


#### Satellite-Based Positioning: GPS and GNSS

![img-description]({{ site.baseurl }}/assets/images/new_sensors/sat_image.jpg){: width="600" }
> <sub> Source: ESA : https://www.esa.int/Applications/Satellite_navigation/How_satellite_navigation_works </sub>


Satellite-based positioning is an **exteroceptive** sensing modality because it estimates a robot’s position by observing **external signals** transmitted from satellites. The global navigation satellite system (GNSS) is the umbrella term for satellite constellations that provide this service, while the global positioning system (GPS) is the most widely used instance (NAVSTAR). GNSS provides an estimate of **3D position in absolute coordinates**, plus a precise **time and date** reference, as long as satellite signals can be received reliably. 

Robotics uses GNSS heavily in outdoor navigation because it provides a globally referenced position that does not drift with time in the same way that pure inertial sensing does. For many field robots, GNSS is the primary external reference used to correct accumulated drift from inertial measurement units (IMUs). 

<details markdown="1">
 <summary>Video introduction</summary>

  Here is a small optional video explaining gps.

  ![](https://www.youtube.com/watch?v=AlHPDRQ08jU)
  ><sub>*How GPS Works 🛰️ What is GPS . YouTube video, 19.04.2023. Available at: https://www.youtube.com/watch?v=AlHPDRQ08jU*</sub>

</details>

---

##### Core idea: position from time-of-flight
{: .no_toc }

GNSS works by measuring how long radio signals take to travel from satellites to a receiver. If signal propagation time were known perfectly, the distance to each satellite could be computed and the receiver position could be determined by **trilateration** (intersection of spheres in 3D). In practice, the receiver does not carry an atomic clock like the satellites do, so the measured distances are **pseudo-ranges** that include clock bias and other errors. 

A common measurement model for satellite $i$ is:

$$
\rho_i = \lVert \mathbf{r} - \mathbf{s}_i \rVert + c,\delta t + \varepsilon_i , .
$$

* $\rho_i$: pseudo-range measurement to satellite $i$ (meters)
* $\mathbf{r}$: receiver position (meters, in a chosen reference frame)
* $\mathbf{s}_i$: satellite position (meters, same frame as $\mathbf{r}$)
* $c$: speed of light (meters per second)
* $\delta t$: receiver clock bias (seconds)
* $\varepsilon_i$: residual errors (atmosphere, multipath, noise, ephemeris uncertainty)

Because there are four unknowns in the simplest case (3D position plus clock bias), a position fix typically requires **at least four satellites** in view. GNSS receivers solve this using estimation algorithms (commonly Kalman-filter-based) and satellite broadcast information (including satellite position and timing). 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/gps_trilateration.png){: width="400" }

> <sub>GPS trilateration concept (2D sketch). In 3D, each pseudo-range constrains the receiver to a sphere; multiple spheres intersect at the receiver position. Source: Springer Handbook of Robotics, Fig. 29.8. </sub>

**From geometry to equations (trilateration).**  
In the figure above, each emitter (satellite) at known position $\mathbf{s}_i$ defines a sphere with radius equal to the measured distance $d_i$ to the receiver. Ignoring errors for intuition, the idealized relation is

$$
\lVert \mathbf{r} - \mathbf{s}_i \rVert = d_i .
$$

Including receiver clock bias and other effects, the measured distance becomes a pseudo-range,

$$
d_i = \rho_i = \lVert \mathbf{r} - \mathbf{s}_i \rVert + c\,\delta t + \varepsilon_i .
$$

$$
\lVert \mathbf{r} - \mathbf{s}_i \rVert = \rho_i - c\,\delta t - \varepsilon_i.
$$

Squaring both sides gives a quadratic equation in the unknown receiver position $\mathbf{r} = [x\ y\ z]^T$:

$$
(x - x_i)^2 + (y - y_i)^2 + (z - z_i)^2 = (\rho_i - c\,\delta t - \varepsilon_i)^2 .
$$

With multiple satellites, this yields a **system of nonlinear equations**, one per satellite. Subtracting one equation from another eliminates the squared terms and leads to equations that are approximately **linear** in $(x, y, z, \delta t)$ around an initial guess. In practice, receivers solve this system using iterative least-squares or Kalman filtering.

**Geometric intuition.**
- One satellite → receiver lies somewhere on a sphere  
- Two satellites → intersection of two spheres (a circle)  
- Three satellites → two possible points (in 3D)  
- Four satellites → unique solution for position **and** clock bias  

This geometric requirement is why a minimum of four satellites is needed for a full 3D GNSS fix.

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: Why does GNSS need at least four satellites to solve for 3D position?</strong></p>
<form id="ch2-gps-s1-q1">
  <input type="radio" name="ch2-gps-s1-q1" value="A"> To estimate $x$, $y$, $z$ position and the receiver clock bias $\delta t$<br>
  <input type="radio" name="ch2-gps-s1-q1" value="B"> To estimate only $x$ and $y$ plus a compass heading<br>
  <input type="radio" name="ch2-gps-s1-q1" value="C"> Because three satellites can only work at night<br>
  <input type="radio" name="ch2-gps-s1-q1" value="D"> Because the fourth satellite provides the Earth’s gravity reference<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s1-q1', 'A',
      '✅ Correct! The receiver must solve for three position components plus clock bias, so at least four independent pseudo-range measurements are needed.',
      '❌ Try again. The key issue is that the receiver clock is not perfectly synchronized, so the clock bias must be estimated in addition to 3D position.')">
    Check Answer
  </button>
  <p id="ch2-gps-s1-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: What makes a pseudo-range different from a true geometric range?</strong></p>
<form id="ch2-gps-s1-q2">
  <input type="radio" name="ch2-gps-s1-q2" value="A"> It includes receiver clock bias and other propagation errors, not just the geometric distance<br>
  <input type="radio" name="ch2-gps-s1-q2" value="B"> It is measured only from maps, not from satellite signals<br>
  <input type="radio" name="ch2-gps-s1-q2" value="C"> It is the range measured only in the vertical direction<br>
  <input type="radio" name="ch2-gps-s1-q2" value="D"> It is always noiseless because it uses atomic clocks<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s1-q2', 'A',
      '✅ Correct! Pseudo-range is an apparent distance that includes clock offset and other error sources in addition to geometry.',
      '❌ Try again. Pseudo-range is not purely geometric; it also contains timing bias and propagation effects.')">
    Check Answer
  </button>
  <p id="ch2-gps-s1-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: In the pseudo-range equation, what physical effect does the term $c\,\delta t$ represent?</strong></p>
<form id="ch2-gps-s1-q3">
  <input type="radio" name="ch2-gps-s1-q3" value="A"> A correction for satellite mass and gravitational pull on the robot<br>
  <input type="radio" name="ch2-gps-s1-q3" value="B"> An apparent range error caused by the receiver clock offset multiplied by the speed of light<br>
  <input type="radio" name="ch2-gps-s1-q3" value="C"> The curvature of the Earth converted into meters<br>
  <input type="radio" name="ch2-gps-s1-q3" value="D"> The Doppler shift used only for velocity, not range<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s1-q3', 'B',
      '✅ Correct! A clock bias of $\delta t$ seconds maps into an apparent distance error of $c\,\delta t$ meters.',
      '❌ Try again. The receiver clock offset directly appears as a range-equivalent error when multiplied by $c$.')">
    Check Answer
  </button>
  <p id="ch2-gps-s1-q3-feedback"></p>
</form>

</details>

---

##### Satellite constellations and signals
{: .no_toc }

![]({{ site.baseurl }}/assets/images/new_sensors/nastar_constellation.gif){: width="400" }

> <sub>NASTAR constellation. Source: https://www.defenseindustrydaily.com/the-gps-constellation-now-and-future-01069/. </sub>

The NAVSTAR GPS constellation is built around a baseline of **24 satellites** (with additional operational satellites often present) in medium Earth orbit, arranged so that most locations have **four or more satellites visible** when the sky is unobstructed. GNSS receivers may also use other constellations such as GLONASS and Galileo, and multi-constellation reception is now common in consumer and robotic hardware. 

GPS satellites broadcast navigation signals on specific **radio frequency bands**. The primary civilian signal is the coarse-acquisition (C/A) code transmitted on the **L1 band**, centered at **1575.42 MHz**. The term *L1* simply refers to this designated carrier frequency used by GPS satellites for timing and ranging measurements.

![]({{ site.baseurl }}/assets/images/new_sensors/gps_freq_spectrum.jpg){: width="600" }

> <sub>Talcom. Source: https://www.tualcom.com/gnss-frequency-bands-and-signals/ </sub>


Historically, most civilian receivers relied only on the L1 signal. Modern GNSS receivers often track **multiple frequency bands**, which allows them to estimate and compensate for ionospheric delay by comparing how **different signal frequencies experience different amounts of propagation delay** as they pass through the ionosphere. This frequency dependence makes it possible to reduce a major source of range error and improves positioning accuracy and robustness.

A key geometric idea is that accuracy depends not only on noise level, but also on **satellite geometry**. Satellites spread widely across the sky provide a better-conditioned solution than satellites clustered in one direction.

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: Why does satellite geometry matter even if measurement noise is unchanged?</strong></p>
<form id="ch2-gps-s2-q1">
  <input type="radio" name="ch2-gps-s2-q1" value="A"> Geometry can be ignored if more than four satellites are visible<br>
  <input type="radio" name="ch2-gps-s2-q1" value="B"> Geometry only affects the time it takes satellites to transmit messages<br>
  <input type="radio" name="ch2-gps-s2-q1" value="C"> Geometry matters only for altitude, never for horizontal position<br>
  <input type="radio" name="ch2-gps-s2-q1" value="D"> Poor geometry amplifies measurement errors into larger position errors<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s2-q1', 'D',
      '✅ Correct! The arrangement of satellites affects how pseudo-range errors map into position error.',
      '❌ Try again. Even with the same noise level, clustered satellites yield a poorly conditioned solution and larger position uncertainty.')">
    Check Answer
  </button>
  <p id="ch2-gps-s2-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: Why can dual-frequency or multi-frequency reception improve accuracy?</strong></p>
<form id="ch2-gps-s2-q2">
  <input type="radio" name="ch2-gps-s2-q2" value="A"> It helps estimate and compensate frequency-dependent ionospheric delay<br>
  <input type="radio" name="ch2-gps-s2-q2" value="B"> It makes satellites transmit at higher power automatically<br>
  <input type="radio" name="ch2-gps-s2-q2" value="C"> It removes the need to estimate the clock bias $\delta t$<br>
  <input type="radio" name="ch2-gps-s2-q2" value="D"> It guarantees zero multipath in cities<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s2-q2', 'A',
      '✅ Correct! Comparing signals at different frequencies helps correct ionospheric propagation errors.',
      '❌ Try again. Multiple frequencies mainly help correct propagation errors that depend on frequency (especially ionospheric delay).')">
    Check Answer
  </button>
  <p id="ch2-gps-s2-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: What practical environmental feature most directly breaks the GNSS assumption of line-of-sight reception?</strong></p>
<form id="ch2-gps-s2-q3">
  <input type="radio" name="ch2-gps-s2-q3" value="A"> A smooth concrete pad with no nearby structures<br>
  <input type="radio" name="ch2-gps-s2-q3" value="B"> A flat open field with clear horizon<br>
  <input type="radio" name="ch2-gps-s2-q3" value="C"> Tall buildings or dense canopy blocking direct paths to satellites<br>
  <input type="radio" name="ch2-gps-s2-q3" value="D"> A high sampling rate in the receiver<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s2-q3', 'C',
      '✅ Correct! Obstructions like buildings and canopy block or degrade direct satellite signals.',
      '❌ Try again. The key failure is losing clear line-of-sight to satellites due to obstructions.')">
    Check Answer
  </button>
  <p id="ch2-gps-s2-q3-feedback"></p>
</form>

</details>

---

##### Performance, failure modes, and practical limitations
{: .no_toc }

**Baseline accuracy.** Under typical conditions and without specialized enhancements, standard GPS accuracy is on the order of **20 to 25 m horizontally** and about **43 m vertically**, with a typical fix rate of **1 Hz** (though faster or slower rates are possible). 

**Dominant error sources in robotics deployments:**

* **Line-of-sight obstruction:** buildings, trees, mountains, canyons, and indoor environments can block satellites or reduce usable geometry. 
* **Atmospheric effects:** ionosphere and troposphere introduce propagation delays that vary with conditions. 
* **Multipath:** reflections from buildings, canyon walls, terrain, or the ground can delay signals and bias pseudo-ranges. Specialized receiver techniques and antennas can mitigate some multipath, but short-delay ground reflections are particularly difficult. 
* **Geometry metrics (DOP/PDOP):** dilution of precision (DOP), especially positional DOP (PDOP), captures how measurement errors map into position errors. Receivers often use PDOP-driven satellite selection and periodically recompute it. 

**Important implication for robot safety:** GNSS can sometimes produce **wildly incorrect estimates** when conditions degrade (for example due to multipath or poor geometry). Robust navigation stacks therefore treat GNSS as one input among several, with sanity checks and estimator consistency tests.

---


<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: Why is vertical GNSS accuracy typically worse than horizontal accuracy?</strong></p>
<form id="ch2-gps-s3-q1">
  <input type="radio" name="ch2-gps-s3-q1" value="A"> Satellites are mostly above the receiver, giving weaker geometric constraints in the vertical direction<br>
  <input type="radio" name="ch2-gps-s3-q1" value="B"> GNSS signals do not contain any altitude information<br>
  <input type="radio" name="ch2-gps-s3-q1" value="C"> The receiver clock bias only affects altitude, not horizontal position<br>
  <input type="radio" name="ch2-gps-s3-q1" value="D"> Vertical accuracy is limited only by Earth’s magnetic field<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s3-q1', 'A',
      '✅ Correct! Satellite geometry often provides a poorer baseline for estimating altitude than for horizontal coordinates.',
      '❌ Try again. The vertical component is typically less well constrained by satellite geometry, so errors project more strongly into altitude.')">
    Check Answer
  </button>
  <p id="ch2-gps-s3-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: What is multipath, and why can it bias position estimates rather than just adding noise?</strong></p>
<form id="ch2-gps-s3-q2">
  <input type="radio" name="ch2-gps-s3-q2" value="A"> Multipath is a software bug in the navigation message decoding<br>
  <input type="radio" name="ch2-gps-s3-q2" value="B"> The satellite changes its orbit randomly, producing white noise only<br>
  <input type="radio" name="ch2-gps-s3-q2" value="C"> Receiver temperature changes the speed of signal, shifting ranges uniformly<br>
  <input type="radio" name="ch2-gps-s3-q2" value="D"> Reflected signals arrive later than the direct signal, creating a systematic pseudo-range delay
<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s3-q2', 'D',
      '✅ Correct! Reflections add extra path length (delay), which can systematically bias the measured pseudo-range.',
      '❌ Try again. Multipath introduces delayed replicas of the signal, which looks like extra distance and can shift the solution, not merely add random noise.')">
    Check Answer
  </button>
  <p id="ch2-gps-s3-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: What does a high PDOP value suggest about the current satellite configuration?</strong></p>
<form id="ch2-gps-s3-q3">
  <input type="radio" name="ch2-gps-s3-q3" value="A"> The receiver clock is perfectly synchronized to GPS time<br>
  <input type="radio" name="ch2-gps-s3-q3" value="B"> Satellite geometry is poor, so position estimates will be more sensitive to measurement errors<br>
  <input type="radio" name="ch2-gps-s3-q3" value="C"> Multipath cannot occur because PDOP is high<br>
  <input type="radio" name="ch2-gps-s3-q3" value="D"> The solution is guaranteed to be centimeter-level accurate<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s3-q3', 'B',
      '✅ Correct! High PDOP indicates an unfavorable satellite arrangement and an error-amplifying geometry.',
      '❌ Try again. High PDOP means small measurement errors can produce larger position errors due to weak geometry.')">
    Check Answer
  </button>
  <p id="ch2-gps-s3-q3-feedback"></p>
</form>

</details>

---

##### Augmentation and “enhanced GPS” options
{: .no_toc }

Many systems improve GNSS accuracy by providing external corrections or by using carrier-phase information.

- **Satellite-based augmentation systems (SBAS)**

A **satellite-based augmentation system (SBAS)** is an enhancement layer built on top of GNSS. SBAS uses a network of **ground reference stations** at precisely surveyed locations to monitor GNSS satellite signals. These stations estimate common error sources—such as satellite clock errors, orbit (ephemeris) errors, and ionospheric delay, and broadcast **correction messages** to users via geostationary satellites.

One example of SBAS is the **Wide Area Augmentation System (WAAS)**, operated in North America. When SBAS corrections are available, horizontal positioning accuracy can improve from roughly **10–12 m** (standalone GPS) to about **1–2 m** within the system’s coverage region.

- **Differential GPS (DGPS)**

Differential GPS (DGPS) improves positioning accuracy by using a **reference receiver** placed at a precisely surveyed, fixed location. Because the true position of this reference is known, it can estimate the current GNSS errors affecting its measurements (such as satellite timing and atmospheric delays). These estimated errors are then transmitted to nearby robot receivers, which apply the same corrections to their own measurements.

This approach works well only when the robot is **close to the reference station**, since many GNSS errors vary gradually with location. As the distance increases, the reference errors no longer match the robot’s local errors, and correction effectiveness decreases.

- **Receiver Autonomous Integrity Monitoring (RAIM)**

Receiver Autonomous Integrity Monitoring (RAIM) is a technique that allows a GNSS receiver to **detect faulty measurements** without relying on external corrections. The receiver computes multiple position solutions using different combinations of visible satellites and checks whether these solutions are mutually consistent.

If one satellite is providing incorrect data, the solutions will disagree, allowing the receiver to detect (and sometimes exclude) the faulty measurement. RAIM requires **more satellites than the minimum needed for positioning**, since this redundancy is essential for consistency checks and integrity monitoring.

- **Real-Time Kinematic positioning (RTK)**

Real-Time Kinematic positioning (RTK) is a high-precision GNSS technique that uses not only the navigation code, but also the **carrier signal itself**. GNSS signals are transmitted as radio waves at a known frequency. This underlying radio wave is called the **carrier**, and its oscillation is much faster than the navigation code modulated on top of it.

The **carrier phase** is the position within this repeating wave cycle (for example, whether the wave is at a peak, trough, or somewhere in between) when it arrives at the receiver. By tracking this phase very precisely, the receiver can measure changes in distance with **millimeter-level resolution**.

However, the receiver does not know how many **full carrier wavelengths** lie between the satellite and the receiver-only the fractional part of the current wave cycle can be observed directly. Determining this unknown whole-number count is known as resolving the **integer ambiguity**.

RTK combines carrier-phase measurements with corrections from a nearby base station to determine this integer number of wavelengths. Once the integer ambiguity is resolved, the distance between satellite and receiver can be estimated with very high precision, enabling **centimeter-level horizontal positioning accuracy** under good signal conditions. This level of precision is why RTK is often referred to as “survey grade.”

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: What additional information does RTK exploit that basic GNSS pseudo-range methods do not?</strong></p>
<form id="ch2-gps-s4-q1">
  <input type="radio" name="ch2-gps-s4-q1" value="A"> Only satellite color codes that identify each satellite<br>
  <input type="radio" name="ch2-gps-s4-q1" value="B"> Carrier-phase measurements and integer ambiguity resolution (often with base-station corrections)<br>
  <input type="radio" name="ch2-gps-s4-q1" value="C"> The robot wheel diameter and encoder ticks<br>
  <input type="radio" name="ch2-gps-s4-q1" value="D"> A magnetometer heading as the main accuracy source<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s4-q1', 'B',
      '✅ Correct! RTK leverages carrier phase and resolves integer cycle ambiguities, enabling very high precision.',
      '❌ Try again. RTK is based on carrier-phase measurements (plus corrections) rather than only code-phase pseudo-ranges.')">
    Check Answer
  </button>
  <p id="ch2-gps-s4-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: Why do DGPS and RTK accuracy degrade as the robot moves farther from the reference station?</strong></p>
<form id="ch2-gps-s4-q2">
  <input type="radio" name="ch2-gps-s4-q2" value="A"> Satellites stop broadcasting corrections beyond a fixed radius<br>
  <input type="radio" name="ch2-gps-s4-q2" value="B"> The speed of light becomes smaller at larger distances<br>
  <input type="radio" name="ch2-gps-s4-q2" value="C"> Atmospheric and orbit-related errors become less correlated between base and rover with distance<br>
  <input type="radio" name="ch2-gps-s4-q2" value="D"> The receiver clock bias $\delta t$ disappears, making the solution unstable<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s4-q2', 'C',
      '✅ Correct! Corrections rely on shared error sources; farther separation reduces how well the base corrections match the rover’s errors.',
      '❌ Try again. Differential methods assume base and rover see similar errors; that assumption weakens with distance.')">
    Check Answer
  </button>
  <p id="ch2-gps-s4-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: What is the difference between “accuracy” and “integrity,” and which does RAIM primarily address?</strong></p>
<form id="ch2-gps-s4-q3">
  <input type="radio" name="ch2-gps-s4-q3" value="A"> Accuracy is update rate; integrity is battery life, and RAIM improves battery life<br>
  <input type="radio" name="ch2-gps-s4-q3" value="B"> Accuracy is closeness to truth; integrity is the ability to detect faults, and RAIM focuses on integrity<br>
  <input type="radio" name="ch2-gps-s4-q3" value="C"> Accuracy is 2D position; integrity is altitude, and RAIM improves altitude only<br>
  <input type="radio" name="ch2-gps-s4-q3" value="D"> Accuracy and integrity are identical, and RAIM improves both equally<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s4-q3', 'B',
      '✅ Correct! RAIM is an integrity technique: it checks consistency to detect faulty measurements or satellites.',
      '❌ Try again. RAIM is mainly about fault detection and trustworthiness (integrity), not only reducing average error (accuracy).')">
    Check Answer
  </button>
  <p id="ch2-gps-s4-q3-feedback"></p>
</form>

</details>

---


##### GNSS in a full navigation system: integration with IMU
{: .no_toc }

GNSS provides strong absolute position references but has three major limitations for robot state estimation:

1. **Orientation is not directly measured** (yaw, and often pitch/roll require other sensors or motion-based inference). 
2. **Measurements are discrete and can be delayed,** so they do not provide a continuous state estimate at control rate. 
3. **Fixes can be unavailable** (indoors, underwater, heavy canopy, deep urban canyons). 

A common solution is a GPS-aided inertial navigation system (GPS/INS), where an **extended Kalman filter (EKF)** or factor-graph estimator fuses:

* IMU: high-rate motion propagation (but drifting)
* GNSS: low-rate absolute position correction (but occasionally unavailable or biased)

The IMU “bridges” between GNSS updates, and GNSS constrains long-term drift. This complementarity is a standard pattern in mobile robotics. 

**Practical note: antenna lever arm.** GNSS measures the position of the **antenna**, not the robot body origin. If the antenna is far from the IMU or vehicle reference point, that offset (lever arm) must be modeled, or apparent position changes can create orientation and stability issues in the fused solution. 

---

<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: Why does GNSS not directly provide full robot pose (position and orientation)?</strong></p>
<form id="ch2-gps-s6-q1">
  <input type="radio" name="ch2-gps-s6-q1" value="A"> Standard GNSS provides position (and time), but not full 3D orientation without additional sensors or special antenna setups<br>
  <input type="radio" name="ch2-gps-s6-q1" value="B"> GNSS measures only orientation and not position<br>
  <input type="radio" name="ch2-gps-s6-q1" value="C"> GNSS provides pose only when fewer than four satellites are visible<br>
  <input type="radio" name="ch2-gps-s6-q1" value="D"> GNSS provides pose only indoors where signals are stable<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s6-q1', 'A',
      '✅ Correct! A single GNSS antenna estimates position; orientation typically requires IMU, magnetometer, vision, or multi-antenna GNSS.',
      '❌ Try again. GNSS primarily provides position (and time). Orientation is not directly observed by basic GNSS.')">
    Check Answer
  </button>
  <p id="ch2-gps-s6-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: In a GNSS-IMU EKF, what role does the IMU play when GNSS is temporarily unavailable?</strong></p>
<form id="ch2-gps-s6-q2">
  <input type="radio" name="ch2-gps-s6-q2" value="A"> It propagates the state forward at high rate (dead reckoning), but drift grows until GNSS returns<br>
  <input type="radio" name="ch2-gps-s6-q2" value="B"> It replaces satellites by broadcasting its own navigation signals<br>
  <input type="radio" name="ch2-gps-s6-q2" value="C"> It eliminates bias automatically, so drift cannot grow<br>
  <input type="radio" name="ch2-gps-s6-q2" value="D"> It provides a global absolute position fix with no drift<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s6-q2', 'A',
      '✅ Correct! The IMU provides continuous motion integration; without GNSS updates, uncertainty and drift accumulate.',
      '❌ Try again. The IMU is the high-rate propagation sensor; it bridges gaps but drifts without external correction.')">
    Check Answer
  </button>
  <p id="ch2-gps-s6-q2-feedback"></p>
</form>

<hr>

<!-- Question 3 -->

<p><strong>Question 3: Why does antenna placement relative to the IMU matter in fused navigation?</strong></p>
<form id="ch2-gps-s6-q3">
  <input type="radio" name="ch2-gps-s6-q3" value="A"> GNSS measures the antenna position; if offset from the body/IMU, rotation induces apparent motion that must be modeled as a lever arm<br>
  <input type="radio" name="ch2-gps-s6-q3" value="B"> Antenna placement changes the speed of light, altering $c$ in the pseudo-range equation<br>
  <input type="radio" name="ch2-gps-s6-q3" value="C"> Antenna placement only affects Wi-Fi, not GNSS<br>
  <input type="radio" name="ch2-gps-s6-q3" value="D"> Antenna placement matters only for indoor GNSS<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-s6-q3', 'A',
      '✅ Correct! A nonzero lever arm means body rotations move the antenna; ignoring this offset can distort fused estimates.',
      '❌ Try again. The GNSS sensor is physically located at the antenna, so its offset from the IMU/body frame must be accounted for.')">
    Check Answer
  </button>
  <p id="ch2-gps-s6-q3-feedback"></p>
</form>

</details>

---

<details markdown="1">
  <summary>Further exploration</summary>

* Overview of GNSS concepts: [Wikipedia - GNSS](https://en.wikipedia.org/wiki/Satellite_navigation)
* Differential corrections and augmentation: [Wikipedia - Differential GPS](https://en.wikipedia.org/wiki/Differential_GPS)
* High-precision methods: [Wikipedia - Real-time kinematic positioning](https://en.wikipedia.org/wiki/Real-time_kinematic_positioning)
* Receiver output format often seen in robotics: [Wikipedia - NMEA 0183](https://en.wikipedia.org/wiki/NMEA_0183)
</details>

---

<details markdown="1">
  <summary>Chapter wrap-up conceptual questions</summary>

<!-- Question 1 -->

<p><strong>Question 1: A robot drives from open sky into a street canyon between tall buildings. Which GNSS error mechanisms become more severe, and why?</strong></p>
<form id="ch2-gps-wrap-q1">
  <input type="radio" name="ch2-gps-wrap-q1" value="A"> Satellite clocks become less accurate because buildings block time<br>
  <input type="radio" name="ch2-gps-wrap-q1" value="B"> Obstruction and multipath increase, reducing line-of-sight satellites and biasing pseudo-ranges via reflections<br>
  <input type="radio" name="ch2-gps-wrap-q1" value="C"> The speed of light decreases between buildings, stretching ranges uniformly<br>
  <input type="radio" name="ch2-gps-wrap-q1" value="D"> IMU bias becomes zero because GNSS is present nearby<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-wrap-q1', 'B',
      '✅ Correct! Buildings block direct paths (fewer satellites, worse geometry) and create reflections (multipath), both of which degrade accuracy and reliability.',
      '❌ Try again. Street canyons reduce line-of-sight and increase reflections, which causes degraded geometry and biased measurements.')">
    Check Answer
  </button>
  <p id="ch2-gps-wrap-q1-feedback"></p>
</form>

<hr>

<!-- Question 2 -->

<p><strong>Question 2: Why can GNSS provide long-term global accuracy while IMU-only dead reckoning drifts over time?</strong></p>
<form id="ch2-gps-wrap-q2">
  <input type="radio" name="ch2-gps-wrap-q2" value="A"> GNSS works only for short time intervals; IMUs are better long term<br>
  <input type="radio" name="ch2-gps-wrap-q2" value="B"> IMUs measure absolute position directly with no integration needed<br>
  <input type="radio" name="ch2-gps-wrap-q2" value="C"> GNSS references external satellites and does not accumulate integration drift like IMU integration does<br>
  <input type="radio" name="ch2-gps-wrap-q2" value="D"> IMUs drift only when the robot is not moving<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-wrap-q2', 'C',
      '✅ Correct! IMU errors accumulate through integration, while GNSS provides an external absolute reference that constrains drift over long durations.',
      '❌ Try again. IMU dead reckoning integrates noisy signals, so error grows over time; GNSS ties position to an external reference.')">
    Check Answer
  </button>
  <p id="ch2-gps-wrap-q2-feedback"></p>
</form>

<hr>

<!-- Question 4 -->

<p><strong>Question 3: Why is RTK often described as “survey grade,” and what hidden assumptions must hold for centimeter-level accuracy?</strong></p>
<form id="ch2-gps-wrap-q4">
  <input type="radio" name="ch2-gps-wrap-q4" value="A"> It uses carrier phase with integer ambiguity resolution; it assumes good satellite visibility, low multipath, and reliable base corrections/links<br>
  <input type="radio" name="ch2-gps-wrap-q4" value="B"> It measures distance using camera images, so it assumes good lighting only<br>
  <input type="radio" name="ch2-gps-wrap-q4" value="C"> It requires only two satellites, so it assumes fewer satellites are available<br>
  <input type="radio" name="ch2-gps-wrap-q4" value="D"> It is survey grade because it ignores the ionosphere entirely, so conditions do not matter<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-wrap-q4', 'A',
      '✅ Correct! RTK can reach centimeter precision, but only when carrier-phase tracking is stable and corrections and environment support ambiguity resolution.',
      '❌ Try again. RTK relies on stable carrier-phase tracking and good conditions (visibility, low multipath, valid corrections).')">
    Check Answer
  </button>
  <p id="ch2-gps-wrap-q4-feedback"></p>
</form>

<hr>

<!-- Question 5 -->

<p><strong>Question 4: Which GNSS outputs and metadata should a navigation stack log for debugging estimator failures (at minimum)?</strong></p>
<form id="ch2-gps-wrap-q5">
  <input type="radio" name="ch2-gps-wrap-q5" value="A"> Only IMU gyro bias estimates, because GNSS has no useful debug fields<br>
  <input type="radio" name="ch2-gps-wrap-q5" value="B"> Only latitude and longitude, because everything else is redundant<br>
  <input type="radio" name="ch2-gps-wrap-q5" value="C"> Only the receiver serial number and firmware version<br>
  <input type="radio" name="ch2-gps-wrap-q5" value="D"> Position/velocity (if available), timestamp, fix type/quality, satellite count, and DOP/PDOP (plus covariance if provided)<br>
  <button type="button"
    onclick="checkTrueFalse('ch2-gps-wrap-q5', 'D',
      '✅ Correct! Quality fields (fix type, satellites, DOP/PDOP, covariance) are essential for diagnosing bad updates and gating issues.',
      '❌ Try again. Debugging GNSS in estimation requires both the measurement and its quality indicators (fix type, satellites, DOP/PDOP, covariance).')">
    Check Answer
  </button>
  <p id="ch2-gps-wrap-q5-feedback"></p>
</form>

</details>

---

#### Environmental Sensors (Temperature, Light, Gas, Chemicals)

Environmental sensors allow a robot to perceive the physical and chemical properties of the ambient medium surrounding it. While humans use their skin to feel temperature and their noses to smell, robots use a variety of specialized sensors to measure these ambient conditions. This sensing modality is particularly important for robots operating in unstructured, hazardous, or agricultural environments where the physical state of the environment dictates the robot's behavior or forms the core mission objective itself.

---

##### Thermodynamic Sensing: How Robots Feel Heat

{: .no_toc }

Temperature sensing is critical for both internal diagnostics (such as preventing motor burnout or monitoring battery health) and exteroceptive perception (locating fires, monitoring agricultural climates, or detecting human presence). 

---

<details markdown="1">
 <summary>Video introduction</summary>

  Temperature sensors explained. How do temperature sensors work? In this video we learn the basics of how different temperature sensors work. We look at thermometers, thermocouples, thermistors and resistance temperature detectors RTD.

  ![](https://www.youtube.com/watch?v=w3Hfj2kMrGo)
  ><sub>*Temperature Sensors Explained. YouTube video, 11.07.2019. Available at: https://www.youtube.com/watch?v=w3Hfj2kMrGo*</sub>

</details>

---

Engineers generally choose between three distinct technologies depending on the required temperature range, sensitivity, and operating environment:



* **Resistance Temperature Detectors (RTDs):**

RTDs are typically made of pure metals, most commonly platinum. The physical principle is straightforward: as a metal heats up, its atoms vibrate more intensely, which scatters conduction electrons and causes a predictable increase in electrical resistance. Platinum is favored because it is chemically inert, highly stable, and offers a very linear response over a wide temperature range (often -200°C to +850°C).
Over standard ranges, the resistance can be mapped to temperature using linear approximation:
$$R_T = R_0(1 + \alpha(T - T_0))$$
Where $R_T$ is the measured resistance, $R_0$ is the resistance at a reference temperature $T_0$ (usually 0°C), and $\alpha$ is the metal's temperature coefficient. Because the absolute resistance changes are tiny, long wires running through a robot arm can introduce significant errors. To counteract this, engineers often use complex 3-wire or 4-wire measuring circuits to cancel out the resistance of the lead wires.

![]({{ site.baseurl }}/assets/images/new_sensors/Thin_Film_PRT.png)
> <sub>Thin-film PRT (platinum resistance thermometer). Source: https://en.wikipedia.org/wiki/Resistance_thermometer</sub>


**Thermistors:**

The name comes from "thermal resistor." Unlike metallic RTDs, thermistors are made from ceramic or polymer semiconductor materials. They offer exceptionally high sensitivity (large resistance changes for small temperature changes), fast response times, and low cost, making them the most common temperature sensor in robotics for narrow, everyday ranges (typically -50°C to +150°C). They come in two primary types:

>**1) NTC (Negative Temperature Coefficient):** The resistance *decreases* as temperature *increases*. Heating the semiconductor frees up more charge carriers (electrons), making it more conductive. NTCs are the standard choice for continuous temperature measurement, such as monitoring ambient air or battery pack heat. Their response is highly non-linear, typical approximation rely on the exponential $\beta$-constant model for basic applications:
$$R = R_0 \cdot e^{\beta(\frac{1}{T} - \frac{1}{T_0})}$$
*(Note: For higher precision, engineers use the more complex Steinhart-Hart polynomial equation instead of the $\beta$-parameter model).*

>**2) PTC (Positive Temperature Coefficient):** The resistance *increases* as temperature *increases*. In certain PTC materials, the resistance spikes abruptly at a specific threshold temperature. Because of this non-linear "switch-like" behavior, PTCs are rarely used for continuous measurement. Instead, they act as fail-safes in robotics, functioning as self-resetting fuses (polyfuses) to cut off current if a motor controller or heater gets dangerously hot.


![]({{ site.baseurl }}/assets/images/new_sensors/ntc_ptc.png)
> <sub>NTC thermistors respond quickly to temperature changes. PTC thermistors, however, react slower but provide thermal protection. Source: https://www.dxmht.com/article/difference-between-ntc-and-ptc-thermistors.html</sub>


* **Thermocouples:**

For extreme conditions where a thermistor or RTD would melt, such as inside a 3D printer hotend or on a firefighting robot, engineers use thermocouples. They rely on the **Seebeck effect**: when two dissimilar metal wires are joined at one end and heated, the temperature difference between that "hot junction" and the "cold junction" (where the wires connect to the circuit board) generates a tiny, proportional micro-voltage.
Thermocouples are rugged and require no external excitation power to operate. However, because they only measure a temperature *difference*, the robot's circuit board must include a secondary temperature sensor (like a thermistor) to measure the temperature of the board itself. This process, known as **Cold Junction Compensation (CJC)**, allows the microcontroller to calculate the absolute temperature at the hot tip. They also require specialized, high-gain amplifiers to read the micro-volt signals accurately amidst the electrical noise of a robot.

![]({{ site.baseurl }}/assets/images/new_sensors/thermocouples.png)
> <sub>Diagram of a thermocouple showing two different metal wires (Type A and Type B) joined at a heated hot junction, producing a millivolt output relative to a cold junction connected to copper lead wires and a measuring instrument (example shown: 829 °C / 1500 °F). Source: https://www.dwyeromega.com/en-us/resources/how-thermocouples-work</sub>

The diagram shows two dissimilar metal wires joined at the hot junction near a flame, generating a small voltage due to the temperature difference between the hot junction and the cold junction where the wires transition to copper.

---

<details markdown="1">
  <summary>Conceptual questions</summary>

<p><strong>What is the primary reason platinum is the most common metal used in Resistance Temperature Detectors (RTDs)?</strong></p>
<form id="chk-rtd-1">
  <input type="radio" name="chk-rtd-1" value="A"> It is highly conductive and generates its own power.<br>
  <input type="radio" name="chk-rtd-1" value="B"> It is chemically inert, highly stable, and offers a very linear response over a wide temperature range.<br>
  <input type="radio" name="chk-rtd-1" value="C"> It has the highest resistance of any metal, eliminating the need for complex wiring.<br>
  <input type="radio" name="chk-rtd-1" value="D"> It reacts quickly to sudden temperature spikes, acting as a fail-safe.<br>
  <button type="button" onclick="checkTrueFalse('chk-rtd-1', 'B', '✅ Correct! Platinum is favored for its chemical stability and predictable, linear resistance changes across a massive temperature range.', '❌ Try again. Review the properties of platinum mentioned in the RTD physical principle.')">Check Answer</button>
  <p id="chk-rtd-1-feedback"></p>
</form>
<hr>

<p><strong>Which mathematical model is typically used to map resistance to temperature in an RTD over standard ranges?</strong></p>
<form id="chk-rtd-2">
  <input type="radio" name="chk-rtd-2" value="A"> An exponential beta-constant model.<br>
  <input type="radio" name="chk-rtd-2" value="B"> A power-law relationship.<br>
  <input type="radio" name="chk-rtd-2" value="C"> The Steinhart-Hart polynomial equation.<br>
  <input type="radio" name="chk-rtd-2" value="D"> A linear approximation using a reference resistance and temperature coefficient.<br>
  <button type="button" onclick="checkTrueFalse('chk-rtd-2', 'D', '✅ Correct! Because RTDs are highly linear, a simple linear approximation formula is used for standard ranges.', '❌ Try again. RTDs are known for being very linear, unlike thermistors.')">Check Answer</button>
  <p id="chk-rtd-2-feedback"></p>
</form>
<hr>

<p><strong>In terms of material composition, how do thermistors fundamentally differ from RTDs?</strong></p>
<form id="chk-therm-1">
  <input type="radio" name="chk-therm-1" value="A"> Thermistors use ceramic or polymer semiconductors instead of pure metals.<br>
  <input type="radio" name="chk-therm-1" value="B"> Thermistors are made entirely of platinum, while RTDs use cheap alloys.<br>
  <input type="radio" name="chk-therm-1" value="C"> Thermistors contain an internal electrolyte fluid.<br>
  <input type="radio" name="chk-therm-1" value="D"> Thermistors are composed of two dissimilar metal wires welded together.<br>
  <button type="button" onclick="checkTrueFalse('chk-therm-1', 'A', '✅ Correct! While RTDs use pure metals like platinum, thermistors are built from semiconductor materials.', '❌ Try again. Think about the definition of a thermal resistor mentioned at the start of the section.')">Check Answer</button>
  <p id="chk-therm-1-feedback"></p>
</form>
<hr>

<p><strong>What is the primary advantage of choosing a thermistor over an RTD for narrow, everyday temperature ranges in robotics?</strong></p>
<form id="chk-therm-2">
  <input type="radio" name="chk-therm-2" value="A"> They offer a perfectly linear response.<br>
  <input type="radio" name="chk-therm-2" value="B"> They generate their own voltage via the Seebeck effect.<br>
  <input type="radio" name="chk-therm-2" value="C"> They provide exceptionally high sensitivity, fast response times, and are low cost.<br>
  <input type="radio" name="chk-therm-2" value="D"> They can withstand extreme heat inside 3D printer hotends.<br>
  <button type="button" onclick="checkTrueFalse('chk-therm-2', 'C', '✅ Correct! Thermistors are cheap, fast, and highly sensitive, making them ideal for everyday ambient and component monitoring.', '❌ Try again. RTDs are more linear, and thermocouples are used for extreme heat. What makes thermistors good for everyday use?')">Check Answer</button>
  <p id="chk-therm-2-feedback"></p>
</form>
<hr>

<p><strong>What physical principle allows a thermocouple to measure extreme temperatures without external excitation power?</strong></p>
<form id="chk-tc-1">
  <input type="radio" name="chk-tc-1" value="A"> The internal photoelectric effect.<br>
  <input type="radio" name="chk-tc-1" value="B"> The Seebeck effect.<br>
  <input type="radio" name="chk-tc-1" value="C"> An electron depletion layer.<br>
  <input type="radio" name="chk-tc-1" value="D"> The Steinhart-Hart principle.<br>
  <button type="button" onclick="checkTrueFalse('chk-tc-1', 'B', '✅ Correct! The Seebeck effect dictates that a temperature difference between joined dissimilar metals generates a tiny voltage.', '❌ Try again. Review the physical phenomenon that governs how two dissimilar metal wires behave when heated.')">Check Answer</button>
  <p id="chk-tc-1-feedback"></p>
</form>
<hr>

<p><strong>Why is a specialized, high-gain amplifier strictly necessary when integrating a thermocouple into a robot?</strong></p>
<form id="chk-tc-2">
  <input type="radio" name="chk-tc-2" value="A"> To power the hot junction of the thermocouple.<br>
  <input type="radio" name="chk-tc-2" value="B"> To convert the sensor's massive resistance changes into a safe voltage.<br>
  <input type="radio" name="chk-tc-2" value="C"> To actively heat the sensor to its 400°C working temperature.<br>
  <input type="radio" name="chk-tc-2" value="D"> To accurately read the very tiny micro-volt signals amidst the electrical noise of the robot.<br>
  <button type="button" onclick="checkTrueFalse('chk-tc-2', 'D', '✅ Correct! Thermocouples generate micro-voltages that are easily lost in a robot electrical noise without high-gain amplification.', '❌ Try again. Remember that thermocouples require no external power, but the signal they output is extremely small.')">Check Answer</button>
  <p id="chk-tc-2-feedback"></p>
</form>

</details>


---

##### Optical Sensing: Beyond the Camera

{: .no_toc }

While cameras capture dense, high-dimensional arrays of pixels, they require heavy computation and are bottlenecked by relatively slow frame rates (typically 30 to 60 Hz). When a robot needs to react to its environment *instantaneously*, such as an industrial arm triggering an emergency stop or a mobile robot counting motor rotations, engineers rely on discrete optical sensors. These transducers convert incident photons directly into changes in resistance or current, trading spatial resolution for blazing speed and low computational overhead.

* **Photoresistors (LDRs):**

Light Dependent Resistors (LDRs) are typically made from a semiconductor material like Cadmium Sulfide (CdS). They operate on the principle of the internal photoelectric effect: as photons strike the material, they excite bound electrons up into the conduction band. In pitch darkness, an LDR might have a resistance of several Megohms ($M\Omega$); under bright light, this resistance plummets to just a few hundred ohms.
Because the resistance change is so massive, they are incredibly easy to integrate into a robot using a simple voltage divider circuit. However, LDRs are notoriously slow. It can take tens or even hundreds of milliseconds for the resistance to fully change after the light level drops. This "memory effect" makes them suitable for slow tasks like solar tracking or turning on a robot's headlights, but useless for high-speed obstacle detection.

![]({{ site.baseurl }}/assets/images/new_sensors/ldr.png)
> <sub>Structure and circuit symbols of a Light Dependent Resistor (LDR), showing the zigzag photoconductive track on a ceramic substrate with metal electrodes and wire terminals. Source: https://engineeringlearn.com/what-is-ldr-photoresistor-types-working-application-diagram-symbol-complete-details/</sub>


---

<details markdown="1">
 <summary>Deep dive: video explanation of LDRs</summary>

  A simple explanation of a Light Dependent Resistor (LDR). Understand the working principle of a Light Dependent Resistor circuit, and exactly how an LDR sensor works.

  ![](https://www.youtube.com/watch?v=ilN8XIK77dc)
  ><sub>*Light Dependent Resistors (LDR): Working Principle. YouTube video, 07.02.2016. Available at: https://www.youtube.com/watch?v=ilN8XIK77dc*</sub>

</details>

---

* **Photodiodes:**

When speed is critical, engineers use photodiodes. These are specialized silicon PN junctions designed to absorb light. When a photon strikes the depletion region of the diode, it creates an electron-hole pair. In robotics circuits, photodiodes are usually operated in *reverse bias*. In this state, the light generates a tiny "photocurrent" that is highly linear with respect to the light intensity.
Photodiodes are exceptionally fast, reacting in the nanosecond range. This makes them the sensor of choice for high-speed applications (for example for optical motor encoders or the receivers in LiDAR systems). The main engineering trade-off is that the generated photocurrent is tiny (often in the microamp range). To be read by a robot's microcontroller, this tiny current must be fed into a specialized op-amp circuit called a Transimpedance Amplifier (TIA) to convert it into a usable voltage.


![]({{ site.baseurl }}/assets/images/new_sensors/photodiode.png)
> <sub>Photodiode components: (Left) TO-5 metal header package; (Center) Schematic symbol; (Right) Internal semiconductor stack showing the light-sensitive PN junction. Source: https://www.electricalvolt.com/photodiode-working-characteristics-applications/</sub>

---

<details markdown="1">
 <summary>Deep dive: video explanation of Photodiodes</summary>

  Let's explore the working of a photodiode - a PN junction that converts light into electricity - its working, its applications, and why it's reverse biased. 

  ![](https://www.youtube.com/watch?v=KgKcbW77txY)
  ><sub>*Photodiodes (working & why it's reverse biased) | Class 12 | Semiconductors | Physics | Khan Academy. YouTube video, 12.12.2020. Available at: https://www.youtube.com/watch?v=KgKcbW77txY*</sub>

</details>

---

* **Phototransistors:** 

A phototransistor combines the light-sensing capability of a photodiode with the signal amplification of a Bipolar Junction Transistor (BJT). Instead of a wired electrical connection to the transistor's base, the base is exposed to light. The photons generate a small base current, which the transistor then amplifies by its inherent gain ($\beta$).
$$I_{collector} = \beta \cdot I_{photo}$$
This built-in amplification is a huge advantage for simple robotics. A phototransistor outputs a signal large enough to be read directly by a microcontroller pin, eliminating the need for complex amplifier circuits. The trade-off is a slight loss in speed: the internal capacitance of the transistor slows its reaction time down to the microsecond range. They are the standard component found in infrared (IR) line-following arrays, optical limit switches, and short-range proximity sensors.

![]({{ site.baseurl }}/assets/images/new_sensors/phototransistor.png)
> <sub>Phototransistor circuit symbol and common package styles (metal can and epoxy-encapsulated types), illustrating a light-sensitive transistor in which incident light generates base current and controls collector–emitter conduction. Source: https://www.y-ic.fr/blog/Understanding-Phototransistors-Definition,Principles,Advantages,and-Applications.html</sub>

---

<details markdown="1">
 <summary>Deep dive: video explanation of phototransistor</summary>

  Video explanation about the working principle of phototransistor.

  ![](https://www.youtube.com/watch?v=Og7km30Du80)
  ><sub>*Working principle of phototransistor. YouTube video, 27.01.2019. Available at: https://www.youtube.com/watch?v=Og7km30Du80*</sub>

</details>

---

<details markdown="1">
  <summary>Conceptual questions</summary>

<p><strong>What physical phenomenon describes how an LDR reacts to incident photons?</strong></p>
<form id="chk-ldr-1">
  <input type="radio" name="chk-ldr-1" value="A"> The Seebeck effect.<br>
  <input type="radio" name="chk-ldr-1" value="B"> The internal photoelectric effect, where photons excite bound electrons into the conduction band.<br>
  <input type="radio" name="chk-ldr-1" value="C"> A reduction-oxidation (redox) reaction.<br>
  <input type="radio" name="chk-ldr-1" value="D"> The dielectric constant changes based on light absorption.<br>
  <button type="button" onclick="checkTrueFalse('chk-ldr-1', 'B', '✅ Correct! Photons strike the Cadmium Sulfide, exciting electrons into the conduction band and lowering resistance.', '❌ Try again. Look at the description of how photons interact with the semiconductor material in an LDR.')">Check Answer</button>
  <p id="chk-ldr-1-feedback"></p>
</form>
<hr>

<p><strong>How extreme is the resistance change in a typical LDR when transitioning from pitch darkness to bright light?</strong></p>
<form id="chk-ldr-2">
  <input type="radio" name="chk-ldr-2" value="A"> It drops from several Megohms to just a few hundred ohms.<br>
  <input type="radio" name="chk-ldr-2" value="B"> It increases from zero ohms to a few hundred ohms.<br>
  <input type="radio" name="chk-ldr-2" value="C"> It changes by only a few micro-ohms, requiring a Wheatstone bridge.<br>
  <input type="radio" name="chk-ldr-2" value="D"> The resistance stays the same, but it generates a massive voltage.<br>
  <button type="button" onclick="checkTrueFalse('chk-ldr-2', 'A', '✅ Correct! The resistance change is massive, plummeting from Megohms in the dark to mere hundreds of ohms in the light.', '❌ Try again. The text explicitly mentions the scale of resistance change that makes LDRs easy to use with simple voltage dividers.')">Check Answer</button>
  <p id="chk-ldr-2-feedback"></p>
</form>
<hr>

<p><strong>In what electrical state are photodiodes typically operated in robotics circuits to generate a linear photocurrent?</strong></p>
<form id="chk-pd-1">
  <input type="radio" name="chk-pd-1" value="A"> Forward bias<br>
  <input type="radio" name="chk-pd-1" value="B"> Reverse bias<br>
  <input type="radio" name="chk-pd-1" value="C"> Zero bias (short circuit)<br>
  <input type="radio" name="chk-pd-1" value="D"> Alternating current (AC) bias<br>
  <button type="button" onclick="checkTrueFalse('chk-pd-1', 'B', '✅ Correct! Photodiodes are operated in reverse bias to generate a tiny, highly linear photocurrent when struck by light.', '❌ Try again. Review the text on how the PN junction of a photodiode is electrically configured in a robot circuit.')">Check Answer</button>
  <p id="chk-pd-1-feedback"></p>
</form>
<hr>

<p><strong>What happens inside the depletion region of a photodiode when a photon successfully strikes it?</strong></p>
<form id="chk-pd-2">
  <input type="radio" name="chk-pd-2" value="A"> It excites the atoms to vibrate, increasing resistance.<br>
  <input type="radio" name="chk-pd-2" value="B"> It creates a temporary electron depletion layer.<br>
  <input type="radio" name="chk-pd-2" value="C"> It generates an electron-hole pair.<br>
  <input type="radio" name="chk-pd-2" value="D"> It multiplies the photons by the transistor gain.<br>
  <button type="button" onclick="checkTrueFalse('chk-pd-2', 'C', '✅ Correct! The energy of the photon creates an electron-hole pair in the depletion region, which drives the photocurrent.', '❌ Try again. What is the sub-atomic result of a photon hitting the specialized silicon PN junction?')">Check Answer</button>
  <p id="chk-pd-2-feedback"></p>
</form>
<hr>

<p><strong>How does the physical structure of a phototransistor differ from a standard Bipolar Junction Transistor (BJT)?</strong></p>
<form id="chk-pt-1">
  <input type="radio" name="chk-pt-1" value="A"> It lacks a collector pin entirely.<br>
  <input type="radio" name="chk-pt-1" value="B"> Instead of a wired electrical connection, the transistor base is exposed to light.<br>
  <input type="radio" name="chk-pt-1" value="C"> It uses two dissimilar metal wires joined at the base.<br>
  <input type="radio" name="chk-pt-1" value="D"> It contains a vacuum cavity above the silicon diaphragm.<br>
  <button type="button" onclick="checkTrueFalse('chk-pt-1', 'B', '✅ Correct! Light entering the exposed base generates a small base current, which the transistor then amplifies.', '❌ Try again. Think about how the signal amplification actually gets triggered in a phototransistor.')">Check Answer</button>
  <p id="chk-pt-1-feedback"></p>
</form>
<hr>

<p><strong>Which of the following is a common robotics application perfectly suited for the reaction speed and output size of a phototransistor?</strong></p>
<form id="chk-pt-2">
  <input type="radio" name="chk-pt-2" value="A"> High-speed LiDAR receivers<br>
  <input type="radio" name="chk-pt-2" value="B"> Measuring the temperature of a battery pack<br>
  <input type="radio" name="chk-pt-2" value="C"> Infrared (IR) line-following arrays and optical limit switches<br>
  <input type="radio" name="chk-pt-2" value="D"> Continuous solar tracking over many hours<br>
  <button type="button" onclick="checkTrueFalse('chk-pt-2', 'C', '✅ Correct! The built-in amplification and microsecond response time make them ideal for standard IR line followers and proximity sensors.', '❌ Try again. Photodiodes are used for LiDAR, and LDRs are used for solar tracking. What are phototransistors standardly used for?')">Check Answer</button>
  <p id="chk-pt-2-feedback"></p>
</form>

</details>

---

##### Atmospheric Perception: Robotic Olfaction (Smell)

{: .no_toc }

Giving a robot a "nose" is essential for tasks ranging from detecting hazardous industrial leaks to monitoring indoor air quality. Unlike temperature or light, which are forms of physical energy, chemical sensing requires a physical interaction between ambient molecules and the sensor's surface. This makes robotic olfaction inherently slower and more susceptible to cross-sensitivity (where a sensor gets "confused" by a non-target gas). Engineers generally choose from the following dominant technologies based on power constraints and required precision:

* **Metal-Oxide (MOX) Semiconductor Sensors:**

These are the most common and inexpensive gas sensors in robotics, widely used for detecting Volatile Organic Compounds (VOCs), carbon monoxide, and combustible gases. They consist of a ceramic substrate coated in a thin film of metal oxide, typically Tin Dioxide ($SnO_2$).
The physics rely on the formation of an **electron depletion layer (EDL)**. The sensor must be actively heated to an optimal working temperature (often 200°C to 400°C). In clean air, atmospheric oxygen adsorbs onto the hot metal oxide surface, trapping electrons from the semiconductor's conduction band and keeping its electrical resistance very high. When a target reducing gas (like methane) hits the sensor, it reacts with the adsorbed oxygen. This reaction releases the trapped electrons back into the conduction band, causing a massive, measurable drop in the sensor's resistance.
The gas concentration ($C$) is calculated by comparing the sensor's current resistance ($R_s$) to its baseline resistance in clean air ($R_0$) using a power-law relationship:
$$R_s = A \cdot C^{-\alpha}$$
Where $A$ and $\alpha$ are sensor-specific constants determined through calibration.
While cheap and sensitive, the active heating element draws significant, continuous current (often tens of milliamps). This power drain is a major design constraint for small, battery-operated mobile robots.

![]({{ site.baseurl }}/assets/images/new_sensors/mox_sensor.png)
> <sub>MOx sensor working principle, where oxygen is adsorbed onto the surface of the metal oxide. Source: Fukuda et al. (2024). A Feasibility Study of a Respiratory Rate Measurement System Using Wearable MOx Sensors. Information. 15. 492. 10.3390/info15080492. </sub>

---

<details markdown="1">
 <summary>Complementary: video explanation of Metal-Oxide Semiconductor Sensors</summary>

  Structure and operating principle of MOS type gas sensors will be explained in this animation.

  ![](https://www.youtube.com/watch?v=usEe3spV5vI)
  ><sub>*How do MOS type gas sensors detect gas? YouTube video, 28.01.2019. Available at: https://www.youtube.com/watch?v=usEe3spV5vI*</sub>

</details>

---

* **Electrochemical Sensors:** 

When a robot requires highly precise, parts-per-million (ppm) detection of toxic gases (like hydrogen sulfide, ammonia, or ozone), engineers use electrochemical cells. These act like tiny, gas-specific batteries.
The target gas diffuses through a hydrophobic membrane into an electrolyte solution, where it meets a catalytic sensing electrode. Here, a reduction-oxidation (redox) reaction occurs. For example, in a carbon monoxide sensor, the CO is oxidized at the anode, generating a flow of electrons. This reaction produces a tiny electrical current that is linearly proportional to the gas concentration:
$$I = S \cdot C$$
Where $I$ is the generated current, $S$ is the sensor's sensitivity (e.g., nanoamps per ppm), and $C$ is the gas concentration. Because the current is in the nanoamp or microamp range, the robot's circuitry requires a highly precise transimpedance amplifier (or a specialized potentiostat circuit) to read it.
Electrochemical sensors consume almost zero power, making them ideal for long-term deployment on environmental monitoring drones. However, because the redox reaction consumes the internal electrodes and electrolyte over time, these sensors have a finite lifespan (typically 1 to 3 years) and require frequent recalibration.

---

<details markdown="1">
 <summary>Complementary: video explanation of Electrochemical Sensors</summary>

  Video explanation about the working principle of electrochemical sensors.

  ![](https://www.youtube.com/watch?v=yjQyJjiatl0)
  ><sub>*How do electrochemical-type sensors detect gas? YouTube video, 28.06.2019. Available at: https://www.youtube.com/watch?v=yjQyJjiatl0*</sub>

</details>

---

* **Non-Dispersive Infrared (NDIR) Sensors:** 

Often used in indoor autonomous robots to monitor carbon dioxide ($CO_2$) or in agricultural robots for methane detection. Unlike the previous two contact-based sensors, NDIR is an optical technique. It relies on the fact that specific gas molecules absorb specific wavelengths of infrared light. An IR lamp shoots light through a sampling tube; if the target gas is present, it absorbs some of the light, and an optical detector at the other end measures the drop in intensity. NDIR sensors are bulky and expensive but offer incredible accuracy and do not suffer from chemical degradation over time.

![]({{ site.baseurl }}/assets/images/new_sensors/NDIR_sensor.png)
> <sub> Sketch of the Non Dispersive Infra-Red (NDIR) carbon dioxide (CO2) sensor structure. Source: Mendes et al. NDIR Gas Sensor for Spatial Monitoring of Carbon Dioxide Concentrations in Naturally Ventilated Livestock Buildings. Sensors 2015, 15, 11239-11257. https://doi.org/10.3390/s150511239 </sub> 


---

<details markdown="1">
  <summary>Conceptual questions</summary>

<p><strong>In clean air, what physically keeps the electrical resistance of a heated MOX sensor very high?</strong></p>
<form id="chk-mox-1">
  <input type="radio" name="chk-mox-1" value="A"> Atmospheric oxygen adsorbs onto the surface, trapping electrons from the conduction band.<br>
  <input type="radio" name="chk-mox-1" value="B"> The heater causes the metal oxide to expand and break the electrical circuit.<br>
  <input type="radio" name="chk-mox-1" value="C"> The ceramic substrate blocks all electron flow until a gas dissolves it.<br>
  <input type="radio" name="chk-mox-1" value="D"> Atmospheric nitrogen forms a highly conductive layer on the sensor.<br>
  <button type="button" onclick="checkTrueFalse('chk-mox-1', 'A', '✅ Correct! The adsorbed oxygen creates an electron depletion layer by trapping electrons, which keeps baseline resistance very high.', '❌ Try again. Review the physics of the electron depletion layer (EDL) in clean air.')">Check Answer</button>
  <p id="chk-mox-1-feedback"></p>
</form>
<hr>

<p><strong>What mathematical relationship is used to calculate gas concentration from a MOX sensor's resistance change?</strong></p>
<form id="chk-mox-2">
  <input type="radio" name="chk-mox-2" value="A"> The international barometric formula<br>
  <input type="radio" name="chk-mox-2" value="B"> A linear approximation<br>
  <input type="radio" name="chk-mox-2" value="C"> A power-law relationship<br>
  <input type="radio" name="chk-mox-2" value="D"> The Steinhart-Hart equation<br>
  <button type="button" onclick="checkTrueFalse('chk-mox-2', 'C', '✅ Correct! Gas concentration is calculated using a power-law equation comparing current resistance to baseline resistance.', '❌ Try again. Look at the specific equation provided in the MOX sensor section.')">Check Answer</button>
  <p id="chk-mox-2-feedback"></p>
</form>
<hr>

<p><strong>How does the target gas physically reach the catalytic sensing electrode in an electrochemical sensor?</strong></p>
<form id="chk-ec-1">
  <input type="radio" name="chk-ec-1" value="A"> It is pulled in by a microscopic mechanical fan.<br>
  <input type="radio" name="chk-ec-1" value="B"> It diffuses through a hydrophobic membrane into an electrolyte solution.<br>
  <input type="radio" name="chk-ec-1" value="C"> It adsorbs onto a heated metal oxide thin film.<br>
  <input type="radio" name="chk-ec-1" value="D"> It travels down a sampling tube illuminated by an IR lamp.<br>
  <button type="button" onclick="checkTrueFalse('chk-ec-1', 'B', '✅ Correct! The gas must diffuse through a specialized membrane to interact with the electrolyte and the electrode.', '❌ Try again. Review the physical structure of an electrochemical cell as described in the text.')">Check Answer</button>
  <p id="chk-ec-1-feedback"></p>
</form>
<hr>

<p><strong>What is the relationship between the generated electrical current and the gas concentration in an electrochemical sensor?</strong></p>
<form id="chk-ec-2">
  <input type="radio" name="chk-ec-2" value="A"> Exponentially proportional<br>
  <input type="radio" name="chk-ec-2" value="B"> Inverse power-law<br>
  <input type="radio" name="chk-ec-2" value="C"> Highly non-linear<br>
  <input type="radio" name="chk-ec-2" value="D"> Linearly proportional<br>
  <button type="button" onclick="checkTrueFalse('chk-ec-2', 'D', '✅ Correct! The redox reaction produces a tiny current that scales linearly with the gas concentration ($I = S \\cdot C$).', '❌ Try again. Unlike MOX sensors, electrochemical cells have a very straightforward mathematical relationship with gas concentration.')">Check Answer</button>
  <p id="chk-ec-2-feedback"></p>
</form>
<hr>

<p><strong>What is a major longevity advantage of NDIR sensors over electrochemical cells?</strong></p>
<form id="chk-ndir-1">
  <input type="radio" name="chk-ndir-1" value="A"> They do not suffer from chemical degradation over time because they are optical.<br>
  <input type="radio" name="chk-ndir-1" value="B"> They consume zero power and can run indefinitely.<br>
  <input type="radio" name="chk-ndir-1" value="C"> Their metal oxide coating replenishes itself automatically.<br>
  <input type="radio" name="chk-ndir-1" value="D"> They generate their own light using the Seebeck effect.<br>
  <button type="button" onclick="checkTrueFalse('chk-ndir-1', 'A', '✅ Correct! Because NDIR relies on infrared light absorption rather than chemical redox reactions, the sensor does not degrade chemically over time.', '❌ Try again. Think about the fundamental difference between an optical technique and a contact-based chemical technique.')">Check Answer</button>
  <p id="chk-ndir-1-feedback"></p>
</form>
<hr>

<p><strong>In agricultural or indoor robotic applications, which gases are NDIR sensors most commonly used to detect?</strong></p>
<form id="chk-ndir-2">
  <input type="radio" name="chk-ndir-2" value="A"> Oxygen and Nitrogen<br>
  <input type="radio" name="chk-ndir-2" value="B"> Carbon Dioxide ($CO_2$) and Methane<br>
  <input type="radio" name="chk-ndir-2" value="C"> Hydrogen Sulfide and Ozone<br>
  <input type="radio" name="chk-ndir-2" value="D"> Carbon Monoxide and VOCs<br>
  <button type="button" onclick="checkTrueFalse('chk-ndir-2', 'B', '✅ Correct! The text highlights NDIR as the standard choice for monitoring indoor $CO_2$ or agricultural methane.', '❌ Try again. Review the specific examples of gases targeted by NDIR sensors at the beginning of the section.')">Check Answer</button>
  <p id="chk-ndir-2-feedback"></p>
</form>

</details>

---

##### Meteorological Perception: Weather and Altitude

{: .no_toc }

While temperature, light, and gases cover many immediate environmental hazards, robots operating outdoors (like agricultural rovers or delivery drones) or navigating multi-story buildings need to understand meteorological variables. Humidity and atmospheric pressure are the two most common parameters measured here, providing critical data for weather forecasting, greenhouse management, and 3D spatial positioning.

* **Capacitive Humidity Sensors:**

When robots need to measure Relative Humidity (RH), engineers almost always use capacitive sensors. They are almost always packaged alongside a thermistor on a single digital chip (like the DHT22, SHT31, or BME280).

The physical principle is based on a variable capacitor. The sensor consists of two conductive electrodes separated by a thin layer of a hygroscopic (water-absorbing) dielectric polymer. The capacitance $C$ of a parallel-plate capacitor is defined as:


$$C = \frac{\varepsilon_0 \varepsilon_r A}{d}$$


Where $\varepsilon_0$ is the vacuum permittivity, $A$ is the area of the plates, and $d$ is the distance between them. The key variable here is $\varepsilon_r$, the relative permittivity (or dielectric constant) of the polymer. Pure water has a massive relative permittivity ($\varepsilon_r \approx 80$) compared to the dry polymer ($\varepsilon_r \approx 2$ to $5$). As the ambient humidity increases, the polymer absorbs water vapor from the air, drastically increasing its overall dielectric constant and therefore increasing the sensor's capacitance.

For robotics, these sensors are excellent because they consume microamps of power. However, they have a major constraint: **response time**. Unlike a photodiode that reacts in nanoseconds, a capacitive polymer must physically absorb and desorb water molecules. It can take anywhere from 5 to 30 seconds for the sensor to stabilize after a sudden change in humidity, meaning it cannot be used for high-speed dynamic control.

![]({{ site.baseurl }}/assets/images/new_sensors/humidity_sensor.jpg)
> <sub>Multi-layer construction of a thin-film capacitive humidity sensor. The diagram identifies the electrodes, polymer sensing layer, and glass substrate used to detect atmospheric moisture levels. Source: https://automationforum.co/capacitive-type-humidity-measurement/</sub>


---

* **Piezoresistive Barometric Pressure Sensors:**

While barometers measure atmospheric pressure, in robotics, they are primarily used as **altimeters**. For a flying drone, a barometer enables "altitude hold" flight modes. For a legged or wheeled indoor robot, a barometer is sensitive enough to detect which floor of a building the robot is on by sensing the pressure drop as it rides an elevator.

Modern robotic barometers utilize Micro-Electromechanical Systems (MEMS) technology. Inside the microscopic chip, there is a tiny silicon diaphragm covering a sealed reference cavity (which is usually a vacuum). As the ambient air pressure pushes down on this diaphragm, it bends. Piezoresistive elements are etched directly into the flexing silicon. As the diaphragm stretches, the mechanical stress changes the electrical resistance of the piezoresistors. The robot's onboard circuitry reads this tiny resistance change using a Wheatstone bridge.

To convert this measured pressure ($p$) into a usable altitude estimate ($h$) in meters, the robot's navigation stack relies on the simplified international barometric formula:


$$h = 44330 \cdot \left(1 - \left(\frac{p}{p_0}\right)^{\frac{1}{5.255}}\right)$$


Where $p_0$ is the reference pressure at sea level (typically 1013.25 hPa). The constant 44330 represents the theoretical height where air temperature would reach absolute zero based on a standard cooling rate, while the exponent 5.255 accounts for the non-linear relationship between pressure and density as the air thins.

The primary engineering constraint when using these sensors on a moving robot is **dynamic pressure interference**. The spinning propellers of a drone or the HVAC vents in an office building create localized high-pressure air currents that will cause massive spikes in the altitude reading. To counteract this, engineers must physically shield the tiny hole on the barometer chip with a piece of open-cell acoustic foam to block wind while still allowing ambient static pressure to pass through.

---

<details markdown="1">
  <summary>Conceptual questions</summary>

<p><strong>What acts as the dielectric material between the conductive electrodes in a capacitive humidity sensor?</strong></p>
<form id="chk-hum-1">
  <input type="radio" name="chk-hum-1" value="A"> A sealed vacuum cavity.<br>
  <input type="radio" name="chk-hum-1" value="B"> Pure distilled water.<br>
  <input type="radio" name="chk-hum-1" value="C"> A hygroscopic (water-absorbing) polymer.<br>
  <input type="radio" name="chk-hum-1" value="D"> A layer of platinum.<br>
  <button type="button" onclick="checkTrueFalse('chk-hum-1', 'C', '✅ Correct! The thin layer of polymer absorbs water vapor, which dramatically increases the dielectric constant between the plates.', '❌ Try again. Look at the description of the parallel-plate capacitor structure in the sensor.')">Check Answer</button>
  <p id="chk-hum-1-feedback"></p>
</form>
<hr>

<p><strong>What is the primary electrical advantage of using capacitive humidity sensors on small robots?</strong></p>
<form id="chk-hum-2">
  <input type="radio" name="chk-hum-2" value="A"> They generate a large voltage that can power the microcontroller.<br>
  <input type="radio" name="chk-hum-2" value="B"> They only consume microamps of power.<br>
  <input type="radio" name="chk-hum-2" value="C"> They require an active heating element to burn off moisture.<br>
  <input type="radio" name="chk-hum-2" value="D"> They process data internally at high frame rates.<br>
  <button type="button" onclick="checkTrueFalse('chk-hum-2', 'B', '✅ Correct! Capacitive humidity sensors are extremely low power, consuming only microamps, though they suffer from a slow response time.', '❌ Try again. What does the text state about their power consumption compared to their response time constraint?')">Check Answer</button>
  <p id="chk-hum-2-feedback"></p>
</form>
<hr>

<p><strong>In MEMS barometers, how are the piezoresistive elements integrated into the sensor?</strong></p>
<form id="chk-baro-1">
  <input type="radio" name="chk-baro-1" value="A"> They are glued to the outside of the robot chassis.<br>
  <input type="radio" name="chk-baro-1" value="B"> They are submerged in an electrolyte solution.<br>
  <input type="radio" name="chk-baro-1" value="C"> They are etched directly into the flexing silicon diaphragm.<br>
  <input type="radio" name="chk-baro-1" value="D"> They are printed onto an open-cell acoustic foam.<br>
  <button type="button" onclick="checkTrueFalse('chk-baro-1', 'C', '✅ Correct! The piezoresistive elements are etched directly into the silicon so that when the diaphragm bends, the mechanical stress changes their resistance.', '❌ Try again. Review the microscopic internal structure of the MEMS chip described in the text.')">Check Answer</button>
  <p id="chk-baro-1-feedback"></p>
</form>
<hr>

<p><strong>What circuit layout does the robot's onboard electronics use to read the tiny resistance changes in the barometer piezoresistors?</strong></p>
<form id="chk-baro-2">
  <input type="radio" name="chk-baro-2" value="A"> A Transimpedance Amplifier (TIA)<br>
  <input type="radio" name="chk-baro-2" value="B"> A Wheatstone bridge<br>
  <input type="radio" name="chk-baro-2" value="C"> A Cold Junction Compensator (CJC)<br>
  <input type="radio" name="chk-baro-2" value="D"> A simple voltage divider<br>
  <button type="button" onclick="checkTrueFalse('chk-baro-2', 'B', '✅ Correct! A Wheatstone bridge is utilized to accurately measure the tiny changes in electrical resistance caused by the flexing diaphragm.', '❌ Try again. A TIA is for photodiodes. What circuit reads the piezoresistors?')">Check Answer</button>
  <p id="chk-baro-2-feedback"></p>
</form>

</details>


---



<details markdown="1">
  <summary>Chapter wrap-up conceptual questions</summary>

<p><strong>Question 1: Why do engineers often use complex 3-wire or 4-wire measuring circuits when integrating Resistance Temperature Detectors (RTDs) in a robot arm?</strong></p>
<form id="ch-env-q1">
  <input type="radio" name="ch-env-q1" value="A"> Because RTDs generate a massive voltage that needs to be stepped down safely.<br>
  <input type="radio" name="ch-env-q1" value="B"> To cancel out the resistance of the long lead wires, since absolute resistance changes in RTDs are very tiny.<br>
  <input type="radio" name="ch-env-q1" value="C"> Because RTDs require three to four different power sources to operate correctly.<br>
  <input type="radio" name="ch-env-q1" value="D"> To provide a cold junction reference for the platinum element.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q1', 'B', '✅ Correct! RTD resistance changes are minimal, so long lead wires can introduce significant errors. 3-wire and 4-wire circuits help cancel out this extra wire resistance.', '❌ Try again. Think about the physical layout of a robot arm and how the small resistance changes of the RTD might be affected by long cables.')">Check Answer</button>
  <p id="ch-env-q1-feedback"></p>
</form>
<hr>

<p><strong>Question 2: In robotics, what is the primary function of a Positive Temperature Coefficient (PTC) thermistor?</strong></p>
<form id="ch-env-q2">
  <input type="radio" name="ch-env-q2" value="A"> Continuous temperature monitoring of ambient air due to its highly linear response.<br>
  <input type="radio" name="ch-env-q2" value="B"> Measuring extreme temperatures inside a 3D printer hotend.<br>
  <input type="radio" name="ch-env-q2" value="C"> Acting as a fail-safe or self-resetting fuse to cut off current if a component overheats.<br>
  <input type="radio" name="ch-env-q2" value="D"> Canceling out the cold junction errors of a thermocouple.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q2', 'C', '✅ Correct! Because their resistance spikes abruptly at a specific threshold, PTCs are rarely used for continuous measurement and instead act as thermal fail-safes.', '❌ Try again. Unlike NTC thermistors, PTCs have a switch-like behavior. How might that be useful for protecting circuits?')">Check Answer</button>
  <p id="ch-env-q2-feedback"></p>
</form>
<hr>

<p><strong>Question 3: Why is Cold Junction Compensation (CJC) required when using a thermocouple?</strong></p>
<form id="ch-env-q3">
  <input type="radio" name="ch-env-q3" value="A"> Because thermocouples measure a temperature difference, so the circuit board's temperature must be known to calculate the absolute hot tip temperature.<br>
  <input type="radio" name="ch-env-q3" value="B"> Because thermocouples draw too much current and the cold junction prevents short circuits.<br>
  <input type="radio" name="ch-env-q3" value="C"> Because the metal wires will melt if the cold junction is not actively cooled by a fan.<br>
  <input type="radio" name="ch-env-q3" value="D"> Because it converts the thermocouple's resistance into a readable voltage.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q3', 'A', '✅ Correct! The Seebeck effect generates a voltage based on the difference between the hot and cold junctions. A secondary sensor is needed at the cold junction to find the absolute temperature.', '❌ Try again. Thermocouples rely on the Seebeck effect, which depends on two different temperatures. What does the circuit need to know to find the absolute temperature at the tip?')">Check Answer</button>
  <p id="ch-env-q3-feedback"></p>
</form>
<hr>

<p><strong>Question 4: Why are Light Dependent Resistors (LDRs) generally unsuitable for high-speed robotic applications like fast obstacle detection?</strong></p>
<form id="ch-env-q4">
  <input type="radio" name="ch-env-q4" value="A"> They produce too much electrical noise for microcontrollers to process.<br>
  <input type="radio" name="ch-env-q4" value="B"> They require heavy computation similar to a camera.<br>
  <input type="radio" name="ch-env-q4" value="C"> Their resistance changes are too small to detect without expensive amplifiers.<br>
  <input type="radio" name="ch-env-q4" value="D"> They suffer from a memory effect and can take tens to hundreds of milliseconds to fully react to light changes.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q4', 'D', '✅ Correct! LDRs are notoriously slow to react, making them better suited for slow tasks like solar tracking rather than high-speed obstacle detection.', '❌ Try again. Consider the physical properties of LDRs mentioned in the text regarding how quickly their resistance changes in response to light.')">Check Answer</button>
  <p id="ch-env-q4-feedback"></p>
</form>
<hr>

<p><strong>Question 5: What specialized circuit is typically required to convert the output of a high-speed photodiode into a usable voltage for a robot?</strong></p>
<form id="ch-env-q5">
  <input type="radio" name="ch-env-q5" value="A"> Cold Junction Compensator (CJC)<br>
  <input type="radio" name="ch-env-q5" value="B"> Transimpedance Amplifier (TIA)<br>
  <input type="radio" name="ch-env-q5" value="C"> Simple voltage divider<br>
  <input type="radio" name="ch-env-q5" value="D"> Bipolar Junction Transistor (BJT)<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q5', 'B', '✅ Correct! Photodiodes generate a very tiny photocurrent (often microamps) that must be fed into a Transimpedance Amplifier to be converted into a usable voltage.', '❌ Try again. A photodiode produces a tiny current in reverse bias. What kind of amplifier converts this tiny current into a voltage?')">Check Answer</button>
  <p id="ch-env-q5-feedback"></p>
</form>
<hr>

<p><strong>Question 6: What is the primary advantage of using a phototransistor instead of a photodiode in simple robotics?</strong></p>
<form id="ch-env-q6">
  <input type="radio" name="ch-env-q6" value="A"> Built-in signal amplification allows it to be read directly by a microcontroller pin.<br>
  <input type="radio" name="ch-env-q6" value="B"> It responds much faster to light changes than a photodiode.<br>
  <input type="radio" name="ch-env-q6" value="C"> It can measure absolute temperature as well as light intensity.<br>
  <input type="radio" name="ch-env-q6" value="D"> It generates a high voltage without needing an external power source.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q6', 'A', '✅ Correct! The inherent gain of the transistor amplifies the photocurrent, eliminating the need for complex external amplifier circuits.', '❌ Try again. Phototransistors are actually slightly slower than photodiodes due to internal capacitance. What benefit makes up for this loss of speed?')">Check Answer</button>
  <p id="ch-env-q6-feedback"></p>
</form>
<hr>

<p><strong>Question 7: How does a Metal-Oxide (MOX) semiconductor sensor detect the presence of a target reducing gas like methane?</strong></p>
<form id="ch-env-q7">
  <input type="radio" name="ch-env-q7" value="A"> The gas absorbs infrared light emitted by the sensor, dropping the detected light intensity.<br>
  <input type="radio" name="ch-env-q7" value="B"> The gas reacts with adsorbed oxygen on the heated surface, releasing trapped electrons and dropping the sensor resistance.<br>
  <input type="radio" name="ch-env-q7" value="C"> The gas dissolves in an electrolyte, creating a redox reaction that generates a nanoamp current.<br>
  <input type="radio" name="ch-env-q7" value="D"> The gas cools down the sensor surface, generating a voltage via the Seebeck effect.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q7', 'B', '✅ Correct! The reducing gas reacts with the oxygen on the metal oxide surface, dismantling the electron depletion layer and severely lowering resistance.', '❌ Try again. Consider the chemical interaction that occurs on the heated ceramic substrate of the MOX sensor.')">Check Answer</button>
  <p id="ch-env-q7-feedback"></p>
</form>
<hr>

<p><strong>Question 8: What is a major design constraint when implementing MOX gas sensors on small, battery-operated mobile robots?</strong></p>
<form id="ch-env-q8">
  <input type="radio" name="ch-env-q8" value="A"> They are extremely heavy and bulky.<br>
  <input type="radio" name="ch-env-q8" value="B"> They require complex optical lenses to focus gas molecules.<br>
  <input type="radio" name="ch-env-q8" value="C"> They have a very short lifespan of only a few weeks.<br>
  <input type="radio" name="ch-env-q8" value="D"> They require an active heating element that draws significant continuous current.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q8', 'D', '✅ Correct! MOX sensors must be actively heated to 200°C–400°C to function, causing a constant drain on a small robot battery.', '❌ Try again. Review the operating principles of MOX sensors. What physical condition is required for the electron depletion layer to form and react properly?')">Check Answer</button>
  <p id="ch-env-q8-feedback"></p>
</form>
<hr>

<p><strong>Question 9: Which gas sensor technology acts like a tiny, gas-specific battery, consuming almost zero power but suffering from a finite lifespan due to internal chemical consumption?</strong></p>
<form id="ch-env-q9">
  <input type="radio" name="ch-env-q9" value="A"> Non-Dispersive Infrared (NDIR) Sensors<br>
  <input type="radio" name="ch-env-q9" value="B"> Metal-Oxide (MOX) Sensors<br>
  <input type="radio" name="ch-env-q9" value="C"> Electrochemical Sensors<br>
  <input type="radio" name="ch-env-q9" value="D"> Photoresistors (LDRs)<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q9', 'C', '✅ Correct! Electrochemical sensors rely on a redox reaction that consumes the electrodes and electrolyte, giving them a finite lifespan but incredibly low power consumption.', '❌ Try again. Which sensor relies on a redox reaction inside an electrolyte solution to generate a tiny current?')">Check Answer</button>
  <p id="ch-env-q9-feedback"></p>
</form>
<hr>

<p><strong>Question 10: Which of the following sensors uses an optical technique rather than physical contact with the gas molecules to determine concentration?</strong></p>
<form id="ch-env-q10">
  <input type="radio" name="ch-env-q10" value="A"> Metal-Oxide (MOX) Sensors<br>
  <input type="radio" name="ch-env-q10" value="B"> Electrochemical Sensors<br>
  <input type="radio" name="ch-env-q10" value="C"> Non-Dispersive Infrared (NDIR) Sensors<br>
  <input type="radio" name="ch-env-q10" value="D"> Resistance Temperature Detectors (RTDs)<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q10', 'C', '✅ Correct! NDIR sensors work by shining an IR lamp through a sampling tube and measuring the light intensity drop caused by specific gas absorption.', '❌ Try again. Look for the sensor type that uses an IR lamp and relies on specific wavelengths being absorbed.')">Check Answer</button>
  <p id="ch-env-q10-feedback"></p>
</form>
<hr>

<p><strong>Question 11: Which temperature sensor relies on the exponential beta-constant model for basic applications due to its highly non-linear response?</strong></p>
<form id="ch-env-q11">
  <input type="radio" name="ch-env-q11" value="A"> NTC Thermistor<br>
  <input type="radio" name="ch-env-q11" value="B"> Platinum RTD<br>
  <input type="radio" name="ch-env-q11" value="C"> Thermocouple<br>
  <input type="radio" name="ch-env-q11" value="D"> Photodiode<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q11', 'A', '✅ Correct! Negative Temperature Coefficient (NTC) thermistors have a highly non-linear response that is commonly modeled using the exponential beta-constant equation.', '❌ Try again. RTDs are very linear, and thermocouples use the Seebeck effect. Which sensor is made from semiconductor ceramics and uses the beta-constant model?')">Check Answer</button>
  <p id="ch-env-q11-feedback"></p>
</form>
<hr>

<p><strong>Question 12: In an NTC thermistor, what happens physically when the ambient temperature increases?</strong></p>
<form id="ch-env-q12">
  <input type="radio" name="ch-env-q12" value="A"> The atoms vibrate more intensely, scattering conduction electrons and increasing resistance.<br>
  <input type="radio" name="ch-env-q12" value="B"> Heating the semiconductor frees up more charge carriers (electrons), decreasing the resistance.<br>
  <input type="radio" name="ch-env-q12" value="C"> The hot and cold junctions create a larger micro-voltage.<br>
  <input type="radio" name="ch-env-q12" value="D"> The resistance spikes abruptly at a threshold, cutting off the current.<br>
  <button type="button"
    onclick="checkTrueFalse('ch-env-q12', 'B',
      '✅ Correct! For Negative Temperature Coefficient (NTC) thermistors, higher temperatures free more charge carriers, which makes the material more conductive and lowers the resistance.',
      '❌ Try again. Option A describes an RTD. Option D describes a PTC thermistor. What does Negative Temperature Coefficient mean for resistance as temperature rises?')">Check Answer</button>
  <p id="ch-env-q12-feedback"></p>
</form>

<hr>

<p><strong>Question 13: How does a capacitive humidity sensor detect changes in the air's moisture levels?</strong></p>
<form id="ch-env-q13">
  <input type="radio" name="ch-env-q13" value="A"> Water molecules increase the distance between the capacitor plates.<br>
  <input type="radio" name="ch-env-q13" value="B"> A hygroscopic polymer absorbs water, increasing the dielectric constant and thus the capacitance.<br>
  <input type="radio" name="ch-env-q13" value="C"> The sensor measures the electrical resistance of water droplets on a ceramic substrate.<br>
  <input type="radio" name="ch-env-q13" value="D"> It uses an IR lamp to measure the light absorption of water vapor.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q13', 'B', '✅ Correct! Water has a high dielectric constant; as the polymer absorbs it, the overall capacitance of the sensor increases.', '❌ Try again. Review the section on capacitive humidity sensors and how the dielectric constant (epsilon) changes.')">Check Answer</button>
  <p id="ch-env-q13-feedback"></p>
</form>
<hr>

<p><strong>Question 14: In the barometric formula, why is the relationship between pressure and altitude non-linear (using an exponent like 5.255)?</strong></p>
<form id="ch-env-q14">
  <input type="radio" name="ch-env-q14" value="A"> Because gravity increases significantly as the robot flies higher.<br>
  <input type="radio" name="ch-env-q14" value="B"> Because the sensor's silicon diaphragm becomes stiffer at higher altitudes.<br>
  <input type="radio" name="ch-env-q14" value="C"> Because air is compressible, causing density and pressure to drop more slowly at higher altitudes.<br>
  <input type="radio" name="ch-env-q14" value="D"> Because the formula must account for the rotation of the Earth.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q14', 'C', '✅ Correct! Air is a compressible gas; the non-linear exponent accounts for the decreasing density of the air column as altitude increases.', '❌ Try again. Think about the physical properties of air as a gas versus a solid.')">Check Answer</button>
  <p id="ch-env-q14-feedback"></p>
</form>
<hr>

<p><strong>Question 15: Why might an engineer place a piece of open-cell foam over a drone's barometer chip?</strong></p>
<form id="ch-env-q15">
  <input type="radio" name="ch-env-q15" value="A"> To keep the sensor warm so the silicon diaphragm doesn't freeze.<br>
  <input type="radio" name="ch-env-q15" value="B"> To prevent "dynamic pressure" from wind or propellers from causing false altitude spikes.<br>
  <input type="radio" name="ch-env-q15" value="C"> To absorb moisture so the barometer doesn't turn into a humidity sensor.<br>
  <input type="radio" name="ch-env-q15" value="D"> To increase the surface area for gas molecules to hit the sensor.<br>
  <button type="button" onclick="checkTrueFalse('ch-env-q15', 'B', '✅ Correct! Foam acts as a wind shield, blocking high-speed air currents (dynamic pressure) while still allowing the sensor to measure the ambient (static) pressure.', '❌ Try again. Review the section on engineering constraints for barometers on moving robots.')">Check Answer</button>
  <p id="ch-env-q15-feedback"></p>
</form>

</details>

---

<details markdown="1">
<summary>Further exploration</summary>

* [NTC vs PTC thermistors](https://www.dxmht.com/article/difference-between-ntc-and-ptc-thermistors.html)
* [Seebeck effect & Thermocouples (Wikipedia)](https://en.wikipedia.org/wiki/Thermocouple)
* [Steinhart–Hart equation for Thermistors (Wikipedia)](https://en.wikipedia.org/wiki/Steinhart%E2%80%93Hart_equation)
* [What is a Photoresistor?](https://engineeringlearn.com/what-is-ldr-photoresistor-types-working-application-diagram-symbol-complete-details/)
* [Photodiode](https://www.electricalvolt.com/photodiode-working-characteristics-applications/)
* [Metal-Oxide Semiconductor Gas Sensors (Wikipedia)](https://en.wikipedia.org/wiki/Gas_detector#Semiconductor)
* [Capacitive type Humidity measurement](https://automationforum.co/capacitive-type-humidity-measurement/)

</details>

---
## Credits

##  Ressources

### Books

- [Springer Handbook of Robotics ](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_5) (Sensing and Estimation)

- [Springer Handbook of Robotics ](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_23) (Range Sensors)

- [Springer Handbook of Robotics ](https://link.springer.com/rwe/10.1007/978-3-540-30301-5_26) (Multisensor Data Fusion)

### Videos

- [Sensors and Perception](https://www.youtube.com/watch?v=k-V1jUWc7-o) (University of Cambridge)
  
### Free Online Courses

- [Perception in Robotics course Skoltech 2021](https://github.com/MobileRoboticsSkoltech/Perception-in-Robotics-course-T3-2021-Skoltech?tab=readme-ov-file) 


### Websites

- [Interactive Kalman filter](https://calerga.ch/projects/epfl/mobots/18/kalman.html)

[Back to Top](#start)
