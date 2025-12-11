---
title: 2.1 Sensors and Sensing in Robotics
parent: "Chapter 2: Sensing in Robotics"
has_children: false
nav_order: 1
layout: default
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

# 2.1 Sensors and Sensing in Robotics [In progress]


<a name="top"></a>

<style>
  #back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color:rgb(0, 0, 0); /* Green background */
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 50%;
    font-size: 30px;
    cursor: pointer;
    text-decoration: none;
    z-index: 1000;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }

  #back-to-top:hover {
    opacity: 1;
  }
</style>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


- Table of Contents
{:toc}

---

## 2.1.1 Prerequisites
This page does not require any specific prerequisite, outside knowing what a robot consists of.
---

## 2.1.2 General Motivation

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
      '❌ Not quite. Think about how the robot\'s brain learns what is happening around it.')">
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
## 2.1.3 Course Content

### 2.1.3.0: What is a sensor
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


The ideal sensor doesn’t exist, but it’s a useful reference. When engineers design robots, they compare real sensors against this “perfect” baseline to reason about **range, resolution, noise, latency, linearity, drift,** and **environmental robustness**.

---

#### Sensor imperfections 

Real sensors are always imperfect. They come with **limitations** and **trade-offs**, such as:

- **Noise** : Random variations in the signal, making readings uncertain.  
  >*Example:* an IMU yaw reading jitters even while the robot is stationary.

- **Limited range** : Every sensor has minimum and maximum values it can detect.  
  >*Example:* an ultrasonic module may only work from ~2 cm to ~4 m.

- **Finite resolution** : Sensors (and ADCs) can only detect changes above a threshold (quantization).  
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
      '✅ Correct! Performance depends on illumination—an environmental factor.',
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

### 2.1.3.1: Characteristics of Sensors
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
2. Outside the range, data si *invalid*.

---

#### Resolution

Resolution is the **smallest input increment** $\Delta x_{\text{min}}$  a system can detect.

* For an **ADC-based sensor**  
  $$\Delta x_{\text{min}} = \tfrac{\text{FS}}{2^N}$$  
  where \(N\) = number of bits, and FS the Full Scale of the sensor.

* For an **analog sensor** it is limited by inherent noise.

> **Example** A 12-bit, ±8 g accelerometer:  
> $$\Delta x_{\text{min}} = \frac{16\,\text{g}}{2^{12}} \approx 0.004\,\text{g}.$$

A measurement smaller than $\Delta x_{\text{min}}$ can not be perceived by the sensor

---

#### Accuracy & Precision

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


<details markdown="1">
 <summary>Video Explaining Accuracy and Precision</summary>

  A short video that illustrates the concepts of accuracy and precision in the context of sensors.

  ![](https://www.youtube.com/watch?v=KEeSQvMCPLg)
  ><sub>Accuracy and Precision | It's Easy! . YouTube video, 06.11.2017. Available at: https://www.youtube.com/watch?v=KEeSQvMCPLg</sub>

</details>

---

#### Noise

*Noise* is any undesired variation added to a measurement. It limits how well we can estimate the true value, even when the sensor is otherwise “perfect.”

We model a measured signal \(y(t)\) as:
$$
y(t) \;=\; x(t) \;+\; b \;+\; \varepsilon(t)
$$
where $x(t)$ is the true signal, $b$ is a (possibly time/temperature-dependent) **bias** (systematic error), and $\varepsilon(t)$ is **random noise**.

To understand and manage noise effectively, it is important to distinguish between **random noise**, which is unpredictable and varies from reading to reading, and **systematic errors**, which are repeatable biases built into the measurement process.


**Random noise** (stochastic, zero-mean)  
Unpredictable jitter that causes repeated readings to fluctuate around the true value.

**Examples**
>- A distance sensor reports 100.2, 99.8, 100.5, 100.1 cm while the target is fixed at 100 cm.
>- A light sensor varies slightly due to mains flicker or transient shadows.
>- An IMU yaw estimate wanders by about ±0.2° when the platform is stationary.

**Mitigation**  
Averaging or low-pass filtering. If the standard deviation of single readings is $\sigma$, averaging $M$ independent readings yields approximately
$$
\sigma_{\text{avg}} \approx \frac{\sigma}{\sqrt{M}}.
$$
This reduces scatter but increases latency.

**Systematic noise (errors)** (deterministic, repeatable)  
Consistent deviations that bias measurements in a fixed direction. Averaging does **not** remove these; **calibration** is required.

**Examples**
>- **Bias/offset**: A thermometer consistently reads $+2\,^\circ\mathrm{C}$ high.  
>- **Scale factor error**: Wheel odometry overestimates distance because the wheel diameter is set too large, reporting $1.02\times$ the true travel.  
>- **Misalignment**: A range sensor tilted upward returns longer distances than actual.  
>- **Drift**: A sensor’s output shifts gradually with warm-up or supply voltage changes.

**Mitigation**  
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

#### Response Time & Bandwidth

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

### 2.1.3.2: Proprioceptive Sensors
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

#### Odometry
{: #ch2-odom }

*Odometry* estimates a robot’s change in pose by integrating *proprioceptive* motion measurements over time (e.g., wheel/track motion, joint motion, IMU). Historically known as *dead reckoning*, odometry develops a kinematic model relating actuator motions to body motion, then integrates that model to produce pose as a function of time. Errors from modeling and sensing accumulate and must be managed or corrected with additional measurements.


##### Differential-drive wheel odometry 
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

##### Odometry in the estimation stack
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

#### Rotary & Linear Position Sensing (Encoders & Potentiometers)

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

#### Main classes of gyroscopes

##### 1) Mechanical gyroscopes and gyrocompasses

* **Principle.** Gyroscopes and gyrocompasses rely on the principle of the  **conservation of angular momentum** $L=I\omega$. Angular momentum is the tendency of a rotating object to keep rotating at the same angular speed about the same axis of rotation in the absence of an external torque. A rapidly spinning rotor maintains its orientation; torques cause **precession** perpendicular to both spin and applied torque. Classical **gyrocompasses** exploit precession with a pendulous weight and damping so the spin axis aligns with true north in the Earth frame. 
* **Notes for robots.** Pure mechanical gyrocompasses are bulky, need careful damping (often oil reservoirs), and are sensitive to vehicle motions and latitude corrections. They are now uncommon in mobile robots compared to optical or MEMS devices. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/gyrocompas.png)
><sub>Simple gyrocompass. (a) Pendulus gyro. (b) Precessional motion. Source: Springer Handbook of Robotics, Chapter 20.1</sub>

##### 2) Optical gyroscopes

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

##### 3) MEMS (micro-electromechanical) gyroscopes

* **Principle (Coriolis).** A vibrating proof mass with velocity $\mathbf{v}$ inside a frame rotating at rate $\boldsymbol{\Omega}$ experiences **Coriolis acceleration**. Coriolis acceleration is the apparent acceleration that arises in a rotating frame of references. Suppose that an object moves along a straight line in a rotating frame of reference. To an outside observer in an inertial frame the object’s path is curved, thus there must be some force acting on the object to maintain the straight line motion as viewed by the rotating observer. An object moving in a straight line with local velocity $\mathbf{v}$ in a frame rotating at rate $\boldsymbol{\Omega}$ relative to an inertial frame will experience a Coriolis acceleration given by : 
  $$
  \mathbf{a}_{\text{Coriolis}} = 2\mathbf{v}\times \boldsymbol{\Omega}.
  $$
  By driving a known vibration and sensing the orthogonal motion induced by Coriolis forces, the device estimates angular rate. Common structures: **tuning-fork**, **vibrating-wheel**, and **wine-glass resonators**. Compact, low-power, and inexpensive, MEMS gyros dominate robotics platforms. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/mems_gyroscope.png)
><sub>MEMS gyroscope: principle of operation. Source: Springer Handbook of Robotics, Chapter 20.2.3</sub>

Wine-glass resonator gyroscopes use the effect of Coriolis forces on the position of nodal points on a resonating structure to estimate the external rotation. As MEMS gyroscopes have no rotating parts, have low-power consumption requirements, and are very mall, MEMS gyros are quickly replacing mechanical and optical gyroscope sensors in robotic applications.

---

#### What gyros actually deliver

* **Rate gyros (RG).** Output angular **rate** $\dot{\theta}$ directly.
* **Rate-integrating gyros (RIG).** Internally integrate to report **angle**, though most robotic pipelines still integrate rate in software to keep timing consistent with other sensors. 

**Why fusion is essential.**
All gyros exhibit **drift** due to bias and noise. Drift causes orientation error; in an IMU this misorients gravity removal for accelerometers, so residual gravity integrates to large position error over time. Robots therefore combine gyro data with other references (accelerometers, magnetometers, GPS, vision) using filters or factor graphs. 

---

#### Important Performance metrics of Inertial measurement units

* **Bias repeatability / stability.** How much the zero-rate output wanders over time at constant conditions; dominates long-term drift. 
* **Angle Random Walk (ARW).** Noise-induced angle error growth when integrating rate; sets short-term orientation precision. 
* **Scale factor.** Mapping from physical rate to volts or counts (e.g., mV per deg/s); errors here scale the estimate. 

---

#### Practical selection and integration tips

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
{:.no_toc}

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


#### Force, Torque, and Strain Sensing

Force, torque, and strain sensing enable a robot to perceive its own interactions with the environment. These measurements close the loop for compliant control, grasp stability, slip detection, and safe physical human–robot interaction. In practice, measurements are combined from multiple points along the actuation chain: motor currents (effort), joint or wrist force–torque (F/T) sensors, and tactile sensors on the skin or fingertips. Each measurement location captures a different portion of the system’s mechanics and noise characteristics, making the intended application of the data the central consideration in sensor design.

---

##### Measurement Location: From Effort to Contact

* **Actuator effort (motor current).** In many electric drives, torque is approximately proportional to current, $\tau \approx k_t I$. This relationship is useful for fast inner-loop control, however, gearbox losses, friction, and compliance makes current an imperfect indicator of external contact forces at the output. 
* **Joint or wrist F/T sensors.** Multi-axis load cells or flexure-based sensors mounted at the wrist or fingertip directly measure forces and moments with high bandwidth. With a known fingertip geometry, the contact point can also be inferred from the measured $[\mathbf{f},\ \boldsymbol{\tau}]$, a capability often referred to as *intrinsic tactile sensing*.


---

##### Actuator effort: motor current as a torque sensor

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

Strain-based sensing measures tiny elastic deformations in a compliant mechanical element and infers the applied force or torque through a known stiffness model. It is the workhorse behind joint torque sensors, six-axis wrist force–torque (F/T) sensors, weigh-scale load cells, and many tactile skins.

###### What is measured

* **Strain** is the relative change in length, $\varepsilon = \Delta L / L$ (unitless). In metals operating in the linear elastic regime, stress $\sigma$ and strain relate by $\sigma = E \varepsilon$, where $E$ is Young’s modulus.
* **Strain gauges** convert strain to an electrical signal. The most common are metal-foil resistive gauges; alternatives include piezoresistive silicon and piezoelectric ceramics.

###### Core transducer physics

* **Foil (resistive) strain gauges.** Electrical resistance $R$ changes approximately linearly with strain:
  $$
  \frac{\Delta R}{R} \approx \mathrm{GF},\varepsilon,
  $$
  where $\mathrm{GF}$ is the gauge factor (typically 2.0 for metal foil). Gauges are bonded to the elastic element with adhesive; alignment sets sensitivity to axial, bending, or torsional strain.
* **Piezoresistive silicon.** Doped silicon has a larger effective gauge factor (10–150), enabling compact, low-noise sensors, often integrated on diaphragms or micro-flexures.
* **Piezoelectric.** Generates charge proportional to dynamic strain. Very high bandwidth but poor at true DC; best for vibration or impact sensing (dynamic tactile).

###### From strain to force/torque

A compliant element (beam, ring, cross-shape, diaphragm, or torsion tube) concentrates strain where gauges are placed. With a linear elastic model,
$$
\mathbf{v} = \mathbf{S},\mathbf{w} + \mathbf{b},
$$
where $\mathbf{v}$ collects bridge voltages, $\mathbf{w} = [F_x, F_y, F_z, \tau_x, \tau_y, \tau_z]^\top$ is the wrench (forces and torques) at a reference point, $\mathbf{S}$ is the sensitivity matrix determined by geometry and gauge placement, and $\mathbf{b}$ is an offset. Calibration identifies $\mathbf{S}$ (and $\mathbf{b}$) by applying known loads and solving a linear regression; the inverse then maps voltages back to forces and torques.

###### Bridge circuits and signal conditioning

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

### 2.1.3.3: Exteroceptive Sensors

- Contact sensors (switch, bumper, capacitive touch)
- Rangefinders: IR, ultrasonic, time‑of‑flight (ToF)
- Cameras
- LIDAR
- RADAR
- GPS / GNSS
- Environmental sensors (temperature, light, gas, chemicals)

---

### 2.1.3.4: Multisensor Data Fusion

- Probabilistic grids
- The Kalman Filter
- Sequential Monte Carlo Methods

---

### 2.1.3.5: Sensor Selection and Integration

- Defining requirements
- Mechanical, electrical & software integration
- EMI, thermal, and environmental considerations
- Safety, redundancy, fail‑safe design
- Maintenance & recalibration schedules


---

### 2.1.3.6 Programming

---
## 2.1.4 Credits

## 2.1.5  Ressources

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