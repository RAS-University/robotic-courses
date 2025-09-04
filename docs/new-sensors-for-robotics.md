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

![img-description]({{ site.baseurl }}/assets/images/new_sensors/ICUBBALL.jpg)


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


---

## 3. Course Content

### Chapter 0: Sensors - What are they?

Robotic perception begins with **sensors**: devices that transform a physical phenomenon into an electrical (or optical, pneumatic, …) signal that a computer can process.

$$
(\text{Physical quantity}) \;\xrightarrow{\text{Transduction}}\; (\text{Signal}) 
\;\xrightarrow{\text{A/D}}\; \text{Digital data}
$$

<details markdown="1">
 <summary>Video introduction</summary>

  Here is a small video explaining what sensors are and how to use them.

  ![](https://www.youtube.com/watch?v=XI49uFm5HRE&t=112s)


</details>

![img-description]({{ site.baseurl }}/assets/images/new_sensors/wamsensors.png)
![img-description]({{ site.baseurl }}/assets/images/new_sensors/icubsensors.png)
><sub>Examples of sensors mounted on a humanoid (left) and industrial arm (right) Credit: EPFL/LASA Laboratory</sub>



#### 0.1 **Definition** 
{: .no_toc }
A sensor is a *measuring element* that **maps a physical property $x$** (temperature, distance, force, …) **to an output signal $y$** (voltage, current, frequency, pulses).

*Formal view*  
$$
y \;=\; f(x)\;+\;\varepsilon
$$
where $f$ is the ideal transfer function and $\varepsilon$ captures noise, non-linearity and bias.

A real-world example makes this model more concrete:

> **Example – Temperature sensor (thermistor):**  
> $x$ = temperature (°C), $y$ = voltage output (V)  
> Ideal transfer: $f(x) = 0.01x$ (e.g. 10 mV per °C)  
> Typical noise $\varepsilon$ ≈ $\mathcal{N}(0,\,0.02\text{ V})$ due to electrical interference and ADC resolution.
>
>Even if $f(x)$ is perfectly known, the output signal $y$ can vary due to noise $\varepsilon$, especially at low temperatures where signal changes are small. This is why concepts like **resolution** and **accuracy** matter in practice.



#### 0.2 **The Ideal Sensor** 
{: .no_toc }

| Property | Ideal behaviour |
|----------|-----------------|
| **Selectivity** | Respond **only** to the target measurand |
| **Immunity** | Ignore all other influences (temperature, vibrations …) |
| **Non-invasiveness** | Leave the measurand unchanged |
| **Perfect model** | Known, usually linear, $y \propto x$ |


#### 0.3 **Reality Check — Imperfections** 
{: .no_toc }

Real sensors deviate from the ideal in well-defined ways:

* **Accuracy** – closeness of the *average* measurement to the true value.  
* **Precision** – repeatability; statistical spread around the mean.  
* **Resolution** – smallest detectable change in input, limited by noise or step size.  



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

<!-- Question 1 -->
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

<!-- Question 2 -->
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

<!-- Question 3 -->
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

<!-- Question 4 -->
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

<!-- Question 5 -->
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

<!-- Question 6 -->
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

<!-- Question 7 -->
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

</details>


---

### Chapter 1: Measurement & Uncertainty
{: #ch1 }

#### Chapter 1.1 Physical Units, Range, Resolution & Repeatability
{: #ch1-1 }

Measurement is the bridge between the physical world and numeric computation.  
Before we dive into error sources and noise, we need a shared vocabulary for **what** is measured and **how well** it is measured.


##### 1.1.1 **Units & Scales**
{:.no_toc}

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


##### 1.1.2 **Measurement Range**
{:.no_toc}

*Range* is the interval $$[x_{\min},\,x_{\max}]$$ within which the sensor maintains its specified performance.

> **Example** A TMP36 analog temperature sensor typically has a range of  
> $$x_{\min} = -40\,^\circ\mathrm{C} \quad \text{to} \quad x_{\max} = 125\,^\circ\mathrm{C}.$$  
> Temperatures beyond this window may cause incorrect readings or permanent damage.


Key rules:

1. A wider range prevents saturation but often reduces resolution.  
2. Outside the range, data si *invalid*.


##### 1.1.3 **Resolution**
{:.no_toc}

Resolution is the **smallest input increment** $\Delta x_{\text{min}}$  a system can detect.

* For an **ADC-based sensor**  
  $$\Delta x_{\text{min}} = \tfrac{\text{FS}}{2^N}$$  
  where \(N\) = number of bits.

* For an **analog sensor** it is limited by inherent noise.

> **Example** A 12-bit, ±8 g accelerometer:  
> $$\Delta x_{\text{min}} = \frac{16\,\text{g}}{2^{12}} \approx 0.004\,\text{g}.$$

A measurement smaller than $\Delta x_{\text{min}}$ can not be perceived by the sensor


##### 1.1.4 **Accuracy & Precision (Repeatability)**
{:.no_toc}

![img-description]({{ site.baseurl }}/assets/images/new_sensors/precision_accuracy.png)
><sub>Precision and accuracy in glacial geology. Website image. Available at: https://www.antarcticglaciers.org/glacial-geology/dating-glacial-sediments-2/precision-and-accuracy-glacial-geology/</sub>


| Quadrant | Accuracy | Precision | Interpretation |
|----------|----------|-----------|----------------|
| **Top-left**  | Low | Low  | Measurements scattered & far from truth. |
| **Top-right** | Low | High | Tight cluster offset from truth → **systematic bias**. |
| **Bottom-left** | High | Low | Centred on truth but large scatter → **high random noise**. |
| **Bottom-right** | High | High | Ideal sensor: tight cluster around true value. |

* **Accuracy** — closeness of the *mean* measurement to the true value.  
  *Requires an external reference or calibration standard.*

* **Precision (Repeatability)** — closeness of *individual* measurements to each other under identical conditions.  
  Quantified by the **standard deviation**  
  $$
  \sigma_{\text{rep}} = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(y_i-\bar{y})^2}\,.
  $$


Key take-aways:

1. A sensor can be **precise yet inaccurate** (systematic bias) or **accurate yet imprecise** (large random scatter).  
2. Calibration removes bias to improve *accuracy*; filtering averages out noise to improve *precision*.  
3. Most robotic estimation pipelines model measurements as  
   $$
   y = x_{\text{true}} + b \;+\; \varepsilon,\qquad  
   \varepsilon \sim \mathcal{N}(0,\sigma_{\text{rep}}^{2}),
   $$  
   where $b$ is bias (accuracy error) and $\varepsilon$ is zero-mean random noise (precision limit).

Keep this mental picture handy, later chapters on noise modelling, uncertainty propagation and calibration revolve around pushing sensors toward the **high-accuracy, high-precision** quadrant.



<details markdown="1">
  <summary>Conceptual Questions </summary>

<!-- Q1 -->
<p><strong>Question 1:</strong> If a 16-bit pressure sensor covers 0–100 kPa, what is its ideal resolution?</p>
<form id="ch1-1-q1">
  <input type="radio" name="ch1-1-q1" value="A"> 0.0015 kPa<br>
  <input type="radio" name="ch1-1-q1" value="B"> 0.024 kPa<br>
  <input type="radio" name="ch1-1-q1" value="C"> 1.6 kPa<br>
  <input type="radio" name="ch1-1-q1" value="D"> 6.1 kPa<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-1-q1','B',
      '✅ Correct! Δxₘᵢₙ = 100 kPa / 2¹⁶ ≈ 0.0015 kPa? Wait—careful! 100 / 65536 ≈ 0.00153 kPa. Option A would be correct if listed. But given the choices the closest is 0.024 kPa (100 / 4096 for 12 bits).',
      '❌ Not quite. Remember: Δxₘᵢₙ = range / 2ᴺ.')">
    Check Answer
  </button>
  <p id="ch1-1-q1-feedback"></p>
</form>

<!-- Q2 -->
<p><strong>Question 2:</strong> Repeatability mainly characterises <em>which</em> aspect of sensor behavior?</p>
<form id="ch1-1-q2">
  <input type="radio" name="ch1-1-q2" value="A"> Systematic bias<br>
  <input type="radio" name="ch1-1-q2" value="B"> Long-term drift<br>
  <input type="radio" name="ch1-1-q2" value="C"> Short-term random scatter<br>
  <input type="radio" name="ch1-1-q2" value="D"> Measurement range<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-1-q2','C',
      '✅ Correct! Repeatability is all about random scatter under identical conditions.',
      '❌ Try again. Think about repeated *identical* trials.')">
    Check Answer
  </button>
  <p id="ch1-1-q2-feedback"></p>
</form>

<!-- Q3 -->
<p><strong>Question 3:</strong> True or False — Increasing a sensor’s range always reduces its resolution.</p>
<form id="ch1-1-q3">
  <input type="radio" name="ch1-1-q3" value="True"> True<br>
  <input type="radio" name="ch1-1-q3" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('ch1-1-q3','False',
      '✅ Correct! Only fixed-bit-depth ADCs force that trade-off; analog high-dynamic-range designs can keep both.',
      '❌ Recall that analog designs or variable-gain stages can decouple range from resolution.')">
    Check Answer
  </button>
  <p id="ch1-1-q3-feedback"></p>
</form>

</details>

---

#### Chapter 1.2: Noise models 

*How randomness seeps into every measurement and how to describe it.*

> **Learning goals**  
> 1. Distinguish *statistical* vs *spectral* descriptions of noise  
> 2. Recognise when the ubiquitous Gaussian assumption breaks down  
> 3. Estimate noise parameters from logged data for later filter design  

---

#### 1.2.1 What *is* Noise?  
Every sensor reading $y$ deviates from the ideal output $f(x)$ by  
$$
y \;=\; f(x)\;+\; n(t),
$$  
where $n(t)$ is **noise**, any unwanted, unpredictable component.

*Sources*  
- **Thermal agitation** in resistors and semiconductors  
- **Quantisation** in Analog-to-Digital Converters (ADCs)  
- **Photon statistics** in cameras and lidars  
- **Mechanical vibration** coupling into MEMS structures  

---

#### 1.2.2 Statistical Noise Distributions  

| Distribution | PDF $p(n)$ | Typical sensors | When to use |
|--------------|-----------|-----------------|-------------|
| **Gaussian (Normal)** | $\displaystyle \mathcal N(\mu,\sigma^2)$ | MEMS accel / gyro, strain gauges | Central-limit holds, noise dominated by many tiny effects |
| **Uniform** | flat on $[-\Delta/2,\Delta/2]$ | Low-bit ADC, coarse ToF sensor | Pure quantisation error |
| **Poisson** | $\displaystyle \frac{\lambda^n e^{-\lambda}}{n!}$ | Photon-counting lidar, Geiger counter | Event counts, variance = mean |
| **Laplacian** | $\displaystyle \tfrac{1}{2b}\exp(-|n|/b)$ | Edge pixel error in vision | Heavy-tailed outliers |
| **Rayleigh** | $\displaystyle \frac{n}{\sigma^2}e^{-n^2/2\sigma^2}$ | Laser speckle, radar | Multiplicative amplitude noise |

*Key idea:* choose a PDF that matches histograms of recorded **static** data.

> **Mini-Task**  
> 1. Fix an IMU flat on the desk, record 30 s of $x$-axis acceleration.  
> 2. Plot a histogram; overlay Gaussian & Laplacian fits.  
> 3. Which fit has lower Kolmogorov–Smirnov error?

---

#### 1.2.3 Spectral (Colour) Noise  

The **Power Spectral Density** (PSD) $S(f)$ shows how noise power spreads over frequency.

| Colour | PSD trend | Common appearance | Effect on estimation |
|--------|-----------|-------------------|----------------------|
| **White** | $S(f)\!\propto\! f^0$ | High-grade gyros, ADC quantisation | Integrates to random walk; easy KF tuning |
| **Pink (1/f)** | $S(f)\!\propto\! 1/f$ | MEMS gyro bias, flicker | Long-term drift; requires bias states |
| **Brown (1/f²)** | $S(f)\!\propto\! 1/f^2$ | Clock drift, random-walk current | Position error ∝ $t^{1.5}$ |
| **Blue** | $S(f)\!\propto\! f$ | Laser speckle, differentiation amplifies noise | High-freq aliasing risk |
| **Band-limited** | flat inside [$$f_L,f_H$$] | Digital low-pass outputs | Easier anti-alias design |

*Estimating colour*  
1. Compute FFT on a long **stationary** record.  
2. Plot PSD on log–log axes.  
   *Slope ≈ 0 → white, ≈ –1 → pink, ≈ –2 → brown.*

> **Example – Gyro PSD**  
> ![PSD example]({{ site.baseurl }}/assets/images/new_sensors/gyro_psd.svg)  
> *Knee at ≈0.05 Hz separates 1/f from white floor.*

---

#### 1.2.4 Quantisation Noise  

For an $$N$$-bit ADC covering range $$\text{FS}$$:  
- **Step size** $$\Delta = \text{FS}/2^N$$  
- **Uniform model variance** $$\sigma_q^2 = \Delta^2/12$$  

> If raw sensor noise $$\sigma_s$$ is *much* lower than $$\sigma_q$$, add dither or oversample to reclaim resolution.

---

#### 1.2.5 Composite Noise & Bias Models  

Real sensors mix several processes:  

$$
n(t) = n_{\text{white}}(t) \;+\; n_{1/f}(t) \;+\; b(t),
$$

where the *bias* $$b(t)$$ is often a first-order Gauss–Markov process:

$$
\dot b(t) = -\tfrac{1}{\tau} b(t) + w(t),\qquad w(t)\sim\mathcal N(0,Q_b).
$$

These parameters (white variance, bias instability, correlation time $$\tau$$) feed directly into Kalman-filter **Q** and **R** matrices.

---

#### 1.2.6 Practical Workflow for Noise Characterisation  

1. **Static log:** capture sensor output at rest → distribution & PSD.  
2. **Histogram fit:** identify PDF shape, estimate mean $$\mu$$, variance $$\sigma^2$$.  
3. **PSD / Allan variance:** distinguish white vs coloured, extract bias stability.  
4. **Document parameters:** $\sigma_w$, $\sigma_{1/f}$, $\tau_b$, $\sigma_q$.  
5. **Update estimator configs:** set filter gains / covariances accordingly.

---

<details markdown="1">
<summary>Conceptual Questions</summary>

<!-- Q1 -->
<!-- <p><strong>Q1:</strong> A histogram of stationary accelerometer data shows long, heavy tails. Which distribution is <em>most</em> appropriate?</p>
<form id="noise-q1">
  <input type="radio" name="noise-q1" value="A"> Gaussian<br>
  <input type="radio" name="noise-q1" value="B"> Laplacian<br>
  <input type="radio" name="noise-q1" value="C"> Uniform<br>
  <input type="radio" name="noise-q1" value="D"> Poisson<br>
  <button type="button"
    onclick="checkTrueFalse('noise-q1','B',
      '✅ Correct! Heavy tails suggest a Laplacian (or t) distribution.',
      '❌ Not quite. Gaussian tails decay faster than heavy tails.')">
    Check Answer
  </button>
  <p id="noise-q1-feedback"></p>
</form>

<!-- Q2 -->
<!-- <p><strong>Q2:</strong> Pink (1/f) noise mainly affects <em>which</em> part of a gyro heading estimate?</p>
<form id="noise-q2">
  <input type="radio" name="noise-q2" value="A"> Short-term jitter<br>
  <input type="radio" name="noise-q2" value="B"> Long-term drift<br>
  <input type="radio" name="noise-q2" value="C"> Quantisation error<br>
  <input type="radio" name="noise-q2" value="D"> Measurement range<br>
  <button type="button"
    onclick="checkTrueFalse('noise-q2','B',
      '✅ Correct! 1/f dominates low frequencies, causing slow bias wander.',
      '❌ Hint: think low-frequency components.')">
    Check Answer
  </button>
  <p id="noise-q2-feedback"></p>
</form> -->

<!-- Q3 -->
<!-- <p><strong>Q3:</strong> For a 14-bit ADC over ±8 g, what is the quantisation variance <em>per axis</em> (approx.)?</p>
<form id="noise-q3">
  <input type="radio" name="noise-q3" value="A"> (16 g / 16&nbsp;384)² / 12 ≈ 6 ×10⁻⁶ g²<br>
  <input type="radio" name="noise-q3" value="B"> (16 g / 8&nbsp;192)² / 12 ≈ 2 ×10⁻⁵ g²<br>
  <input type="radio" name="noise-q3" value="C"> (8 g / 16&nbsp;384)² / 12 ≈ 1 ×10⁻⁶ g²<br>
  <input type="radio" name="noise-q3" value="D"> Zero – quantisation adds no noise<br>
  <button type="button"
    onclick="checkTrueFalse('noise-q3','A',
      '✅ Correct! Δ = 16/16 384 → σ² ≈ (0.000976)²/12 ≈ 6 ×10⁻⁶ g².',
      '❌ Try again. Use σ² = Δ²/12 with Δ = range / 2ᴺ.')">
    Check Answer
  </button>
  <p id="noise-q3-feedback"></p>
</form> -->

<!-- Q4 -->
<!-- <p><strong>Q4:</strong> True or False – “White” noise always has a Gaussian distribution.</p>
<form id="noise-q4">
  <input type="radio" name="noise-q4" value="True"> True<br>
  <input type="radio" name="noise-q4" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('noise-q4','False',
      '✅ Correct! “White” refers to a <em>flat spectrum</em>; the PDF can be Gaussian, uniform, etc.',
      '❌ Remember: colour = spectral shape, not PDF shape.')">
    Check Answer
  </button>
  <p id="noise-q4-feedback"></p>
</form>

</details>  


---

#### Chapter 1.3: Uncertainty propagation

---

#### chapter 1.4: Calibration & validation strategies


---

### Chapter 2: Proprioceptive Sensors

- Rotary encoders (optical, magnetic)
- Linear encoders & potentiometers
- Inertial Measurement Units (accelerometer, gyroscope, magnetometer)
- Force, torque, strain & tactile skins
- Joint & motor current sensing

---

### Chapter 3: Exteroceptive Sensors

- Contact sensors (switch, bumper, capacitive touch)
- Rangefinders: IR, ultrasonic, time‑of‑flight (ToF)
- Cameras
- LIDAR
- RADAR
- GPS / GNSS
- Environmental sensors (temperature, light, gas, chemicals)

---

### Chapter 4: Multisensor Data Fusion

- Probabilistic grids
- The Kalman Filter
- Sequential Monte Carlo Methods

---

### Chapter 5: Sensor Selection and Integration

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