---
title: Sensors and Sensing in Robotics
parent: Courses
layout: default
---

<!-- Link external JavaScript file -->
<script src="questions.js"></script>

# Sensors and Sensing in Robotics [In progress]


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

## 1. Prerequisites
This page does not require any specific prerequisite, outside knowing what a robot consists of.
---

## 2. General Motivation

<!--![](https://www.youtube.com/watch?v=KdNqmxu_V4A)
><sub>HBFS Line Follower - Next Generation of Robots. YouTube video, April 2018. Available at: https://www.youtube.com/watch?v=KdNqmxu_V4A</sub>
-->

From collaborative factory arms to drones and humanoids, every robot relies on **sensing** to perceive their environment and to control their own actions. **Sensors** can acquire and process information from a variety of sources, from recording motor displacement, to detecting light, sound and force. They convert this information into (usually) digital signals that a computer can then further process and analyse. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/ICUBBALL.jpg)
><sub>This <a href="https://icub.iit.it/"> ICub Humanoid Robot</a> is endowed with high resolution binocular cameras for 3-dimensional rendering of the world and tactile sensors to perceive touch at its fingertips. All these sensors are necessary to reach and grab the red ball. Credit: EPFL/LASA Laboratory</sub>

Regardless of the task, meaningful robot actions begin with accurate perception of both the robot’s own state and its surroundings. Without reliable sensory feedback, the most sophisticated control algorithm degenerates into blind open-loop commands. Conversely, well-designed sensing turns a simple robotic platform into a **situationally aware** agent that can:

- **Estimate its own state (proprioception)** – joint encoders, IMUs and force sensors provide the data to infer pose, velocities and loads, yielding an internal state estimate that closes the control loop.  
- **Perceive the external world (exteroception)** – cameras, lidars, radars and tactile arrays reveal obstacles, objects and humans, enabling navigation, manipulation and safe collaboration.  
- **Adapt to uncertainty** – no mathematical model is perfect; sensors observe the difference between expected and actual behaviour and let the controller correct in real time.  
- **Share information with higher-level reasoning** – mapping, planning and learning modules all begin with raw observations turned into meaningful features.  

Early robotics tried to side-step sensing by assuming perfectly known environments. Modern applications, from warehouse fulfilment to planetary exploration, demonstrate that **autonomy becomes feasible only when perception, estimation and control form a tight feedback cycle**.

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

Here are two examples of usage of sensors for state of the art robots. 

![img-description]({{ site.baseurl }}/assets/images/new_sensors/wamsensors.png)
><sub>Examples of sensors mounted on an industrial arm; Credit: EPFL/LASA Laboratory</sub>

An industrial robot arm tasked to manover a shovel must be endowed with motor encoders for accurate positioning and orienting of the shovel, force/toque sensors at its end-effect to sense and react to change in the stiffness of the material, and tactile sensors at its fingertip to guarantee tight grip on the shovel.

![img-description]({{ site.baseurl }}/assets/images/new_sensors/icubsensors.png)
><sub>Examples of sensors mounted on a humanoid robot; Credit: EPFL/LASA Laboratory</sub>

A humanoid robot may be tasked to interact with its environment in more ways than would an industrial robot. In addition to motor encoders, force/torque and tactile sensors, it needs an IMU to measure its global orientation in space. Cameras and microphones are, on the other hand, crucial to allow the robot to interact in human-inhabited environments. 

---

## Chapter 0: What is a sensor
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

### 0.1 The Ideal Sensor

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

### 0.2 Sensor imperfections 

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

## Chapter 1: Characteristics of Sensors
{: #ch1 }


### 1.1 Units & Scales

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

### 1.2 Measurement Range

*Range* is the interval $$[x_{\min},\,x_{\max}]$$ within which the sensor maintains its specified performance.

> **Example** A TMP36 analog temperature sensor typically has a range of  
> $$x_{\min} = -40\,^\circ\mathrm{C} \quad \text{to} \quad x_{\max} = 125\,^\circ\mathrm{C}.$$  
> Temperatures beyond this window may cause incorrect readings or permanent damage.


Key rules:

1. A wider range prevents saturation but often reduces resolution.  
2. Outside the range, data si *invalid*.

---

### 1.3 Resolution

Resolution is the **smallest input increment** $\Delta x_{\text{min}}$  a system can detect.

* For an **ADC-based sensor**  
  $$\Delta x_{\text{min}} = \tfrac{\text{FS}}{2^N}$$  
  where \(N\) = number of bits, and FS the Full Scale of the sensor.

* For an **analog sensor** it is limited by inherent noise.

> **Example** A 12-bit, ±8 g accelerometer:  
> $$\Delta x_{\text{min}} = \frac{16\,\text{g}}{2^{12}} \approx 0.004\,\text{g}.$$

A measurement smaller than $\Delta x_{\text{min}}$ can not be perceived by the sensor

---

### 1.4 Accuracy & Precision

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

### 1.5 Noise

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

### 1.6 Response Time & Bandwidth

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

### Chapter 2: Proprioceptive Sensors
{: #ch2 }

Proprioceptive sensors measure a robot’s **internal state** (joint positions/velocities, body rates, torques/currents, temperatures, power).

**Definition.**  
*Proprioceptive sensing* provides measurements of variables intrinsic to the robot’s body and actuators. Typical measurements feed directly into feedback control and state estimation. In contrast, *exteroceptive sensing* observes the external environment (e.g., range to obstacles, images of the scene).

| Aspect | Proprioceptive | Exteroceptive |
|-------|-----------------|---------------|
| What is measured | Internal state (joints, body motion, actuator/electrical) | External world (terrain, objects, features) |
| Typical sensors | Encoders, IMUs, current/voltage, strain/torque, temperature | Cameras, LiDAR, sonar, GPS, tactile arrays |
| Primary use | Low-level control, odometry, health monitoring | Mapping, localization against world, perception |
| Latency/bandwidth | Generally low latency, high update rate | Often higher latency, heavier processing |

**Role in the control stack.**  
Proprioception closes feedback loops and stabilizes dynamics:
- **Low-level control** (inner loops): current/torque, velocity, and position loops rely on fast, low-latency measurements.  
- **State estimation & odometry**: joint encoders and IMUs provide inputs to kinematics- and dynamics-based estimators.  
- **Safety & monitoring**: temperature, supply voltage, overcurrent/over-torque detection protect hardware.  

A minimal measurement model is
$$
y_k \;=\; h(x_k) \;+\; n_k,
$$
where $x_k$ is the robot’s internal state (e.g., joint angles/velocities, body rates), $h(\cdot)$ maps state to sensor outputs, and $n_k$ represents noise/bias (cf. Ch. 1.5). Low latency and adequate bandwidth (Ch. 1.6) are critical to preserve control stability.

**Common proprioceptive signals.**

| Quantity | Typical sensor | Units | Notes |
|---------|-----------------|-------|------|
| Joint/shaft position | Incremental/absolute encoder, potentiometer | rad, deg, counts | Resolution/CPR, index/homing, backlash sensitivity |
| Joint/shaft velocity | Derived from encoder or tachometer | rad/s, rpm | Differentiation amplifies noise; filtering adds delay |
| Linear position/force (links/structures) | LVDT, strain gauge (bridge) | m, N, Nm | Calibration and temperature compensation required |
| Body acceleration/rotation | IMU (accelerometers, gyroscopes) | m/s², °/s | Bias/scale drift, alignment, Allan characteristics |
| Electrical current/voltage | Shunt/Hall sensor, ADC | A, V | Bandwidth, isolation, burden voltage, ripple/noise |
| Torque (estimate) | From current: $\tau \approx k_t I$; torque sensor | Nm | $k_t$ tolerance, saturation, temperature dependence |
| Temperature | Thermistor/RTD/IC sensor | °C | Warm-up, placement, thermal lag |
| Battery state | Voltage, current (Coulomb counting) | V, A, Ah | SoC estimation; measurement noise vs filtering delay |


---

### 2.2 Rotary & Linear Position Sensing (Encoders & Potentiometers)

Position sensing provides joint/shaft angle and linear travel for feedback control, odometry, and safety. Common technologies include **incremental encoders**, **absolute encoders**, **resolvers/synchros**, and **potentiometers**. Selection should be guided by the characteristics in Ch. 1 (range, resolution, accuracy, noise, bandwidth/latency) and by mechanical integration constraints.

**Incremental encoders.**  
Quadrature encoders emit two square waves (A,B) in quadrature (90° phase shift). Counting edges yields relative motion; direction is inferred from the A/B phase. A once-per-revolution **index (Z)** marks a reference position for homing. With 4× decoding, an encoder with $\text{PPR}$ pulses per revolution produces $\text{CPR}=4\,\text{PPR}$ counts per turn. The angular estimate after $N$ counts is
$$
\theta \;=\; 2\pi\,\frac{N}{\text{CPR}}\quad(\text{rad}).
$$
Velocity is commonly computed by finite differences,
$$
\dot\theta \;\approx\; \frac{\Delta\theta}{\Delta t},
$$
optionally with low-pass filtering (Ch. 1.6) to reduce quantization noise at the cost of added delay. High-speed operation requires adequate **edge-rate capacity** in the interface and **debounce/Schmitt-triggering** to suppress chatter. Missed edges or false transitions directly corrupt counts; differential signaling (e.g., RS-422) improves noise immunity.

**Absolute encoders.**  
Absolute encoders report angle directly, eliminating the need for homing after power-up. **Single-turn** encoders resolve angle within one revolution; **multi-turn** variants also track the number of turns (via gears, magnetic counters, or energy-harvesting). Sensing can be **optical** or **magnetic**; digital outputs typically use **Gray code** so only one bit changes between adjacent positions, minimizing transition ambiguity. Common interfaces include **SSI**, **BiSS-C**, and **SPI**. Resolution is given in bits; an $n$-bit single-turn device has nominal step size
$$
\Delta\theta \;=\; \frac{2\pi}{2^{\,n}}\quad(\text{rad/LSB}),
$$
subject to accuracy/linearity limits (Ch. 1.4). Multi-turn encoders specify both single-turn resolution and turn count.

**Resolvers & synchros (brief).**  
Resolvers are rotary transformers providing analog **sine/cosine** signals proportional to angle. They require AC **excitation** and **demodulation** via a resolver-to-digital converter (RDC). Advantages include wide temperature range, high shock/vibration tolerance, and excellent reliability in harsh environments; disadvantages are added electronics, higher cost, and integration complexity. Synchros are related, legacy three-wire machines used in older aerospace/industrial systems.

**Potentiometers.**  
Rotary or linear potentiometers provide a ratiometric analog voltage proportional to position. Benefits: simplicity, low cost, absolute position without homing, and minimal processing latency. Limitations: **wear** (finite wiper life), **linearity error**, **hysteresis**, and susceptibility to noise on long leads. Mechanical travel is typically less than $360^\circ$ (e.g., $300^\circ$), with **multi-turn** versions available for extended range. Effective resolution is set by the ADC (Ch. 1.3) and electrical noise (Ch. 1.5). Buffering with a high-impedance amplifier reduces loading error.


**Example (rotary to linear).**  
A 2000 PPR quadrature encoder (4×) yields $\text{CPR}=8000$. With a $5\,\text{mm}$ lead screw, the linear resolution is
$$
\Delta x \;=\; \frac{5\,\text{mm}}{8000} \;\approx\; 0.625\,\mu\text{m}\,,
$$
subject to accuracy, alignment, and backlash constraints. Filtering may be required to obtain smooth velocity while respecting latency limits (Ch. 1.6).


---

### 2.2 : Inertial Sensing
(IMUs: Accelerometers, Gyroscopes, Magnetometers)

---

### 2.3 : Motor & Drive Sensing
(Current, Voltage, Back-EMF)

---

### 2.4 : Force/Torque & Strain Sensing

---

### 2.5 : Odometry & Body State Estimation (opt)

---

## Chapter 3: Exteroceptive Sensors

- Contact sensors (switch, bumper, capacitive touch)
- Rangefinders: IR, ultrasonic, time‑of‑flight (ToF)
- Cameras
- LIDAR
- RADAR
- GPS / GNSS
- Environmental sensors (temperature, light, gas, chemicals)

---

## Chapter 4: Multisensor Data Fusion

- Probabilistic grids
- The Kalman Filter
- Sequential Monte Carlo Methods

---

## Chapter 5: Sensor Selection and Integration

- Defining requirements
- Mechanical, electrical & software integration
- EMI, thermal, and environmental considerations
- Safety, redundancy, fail‑safe design
- Maintenance & recalibration schedules


---

## Programming

---

## Ressources

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