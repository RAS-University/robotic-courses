---
title: 8.1 Foundation of legged locomotion
parent: "Chapter 8: Locomotion"
has_children: false
nav_order: 1
layout: numbered
math: mathjax
chapter: 8
section: 1
publish: true
nav_exclude: true
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


# Foundation of legged locomotion

<!-- bundle exec jekyll serve -->
<style>
/* Hide headings below level 2 from the table of contents */
#markdown-toc > li > ul > li > ul {
  display: none;
}

/* Styling for the collapsible quiz / exercise accordions used throughout this page */
.exercise-accordion {
  margin: 1.5rem 0;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  overflow: hidden;
}
.exercise-accordion > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  background-color: #f6f8fa;
  list-style: none;
}
.exercise-accordion > summary::-webkit-details-marker {
  display: none;
}
.exercise-accordion > summary::after {
  content: "▾";
  font-size: 1.2rem;
  transition: transform 0.25s ease;
}
.exercise-accordion[open] > summary::after {
  transform: rotate(180deg);
}
.exercise-accordion-content {
  padding: 1.25rem;
  border-top: 1px solid #d0d7de;
}
</style>
- Table of Contents
{:toc}

## Course overview

*Several figures in this module are adapted from other sources; full credit is given in the [Credits](#credits) section at the end of the page.*

### Prerequisites

To get the most out of this Central Pattern Generator module, it’s helpful to have:

- Basic proficiency in **Python programming**
- Familiarity with fundamental concepts in **robotics, kinematics, and dynamics**
- Basic knowledge of **linear algebra, differential equations, and feedback control**

Previous coursework in **robot control**, or **model predictive control** is recommended but not mandatory.

Students without this background can still follow the course, provided they are prepared to review the necessary programming and control concepts when needed.



### Motivation

Legged locomotion enables robots to move across uneven terrain, stairs, obstacles, and other environments that are difficult for wheeled platforms. This capability is becoming increasingly relevant as industry shifts from fixed robots in structured factories toward mobile systems operating in uncertain, human-centered, and outdoor environments.

A central challenge is generating stable, coordinated, and adaptable rhythmic motion. Central Pattern Generators (CPGs) provide a bio-inspired solution by producing oscillatory signals that can coordinate multiple legs and generate gaits such as walking, trotting, and bounding. Their compact structure also makes them suitable for real-time control, gait transitions, and integration with sensory feedback.

This course develops these ideas progressively, from single-leg modeling and force control to quadruped locomotion, CPG-based gait generation, and reinforcement learning. It prepares students to understand how dynamics, feedback, rhythmic control, and learning can be combined to create robust locomotion systems for emerging robotic applications.

Here is a video to for you to explore Anymal, a legged robot developped by Anybotics a spin-off from ETH Zurich :

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/REvNnUzVDAA"
    title="ANYmal performing parkour"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

ANYmal is a quadruped robot built for legged locomotion research. It walks, climbs, and recovers its balance on rough and uneven terrain, the kind of behavior this course explains.

*Source: "ANYmal can do parkour and walk across rubble," ETH Zürich, based on Rudin et al., "ANYmal Parkour: Learning Agile Navigation for Quadrupedal Robots," Science Robotics, 2023 ([youtube.com/watch?v=REvNnUzVDAA](https://www.youtube.com/watch?v=REvNnUzVDAA)).*

---

##  Module 0 : A brief history of legged robots

Before we model a single leg, it is worth knowing where legged machines come from. Almost every design decision made in the rest of this course, how many legs, how many joints per leg, rigid or compliant links, which actuator technology, was already explored by the machines below. Their successes and their failures explain why modern quadrupeds look the way they do.

Studying legged locomotion is far older than robotics: Aristotle (384-322 BC) already reasoned about the forces an animal pushes against in *De Motu Animalium*, and Eadweard Muybridge (1830-1904) settled long-running disputes about footfall sequences with the first systematic stop-motion photography of animals in motion, the direct ancestor of the footfall diagrams of Module 2.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;" >

  <div style="width: 20%; min-width: 150px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_aristotle.png' | relative_url }}"
        alt="Eighteenth-century engraved plate accompanying Aristotle's De Motu Animalium, showing a horse and geometric analyses of limb movement"
        style="width: 100%; height: auto;">
      <p><strong>(a) Aristotle, <em>De Motu Animalium</em></strong></p>
  </div>

  <div style="width: 52%; min-width: 260px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_muybridge.png' | relative_url }}"
        alt="Muybridge stop-motion photographic sequence of a cat walking and running, four strips of successive frames"
        style="width: 100%; height: auto;">
      <p><strong>(b) Muybridge, <em>Animal Locomotion</em></strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.1 : Two early studies of animal locomotion.</strong>
    Nussbaum et al. (1985); Muybridge (1969).
  </figcaption>

</figure>

What animals do so easily is negotiate terrain through **discrete footholds**: only a few viable contact points are needed, not a continuous path. That is the property that motivates legged machines, and the price is many degrees of freedom, non-linear dynamics, intermittent contact, and a permanent balance problem. The rest of this module is the history of paying that price with the technology available at the time.

### 1. Milestones in the development of legged robots

The table below, from Raibert's 1986 survey, is a compact map of the field's first 140 years. It is worth scanning once now and returning to as the rest of this module fills in the entries.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/history/hist_milestones.png' | relative_url }}"
    alt="Table listing milestones in the development of legged robots from 1850 to 1983, with year, author, and a short description of each machine"
    style="width: 48%; max-width: 560px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 0.2 : Milestones in the development of legged robots.</strong>
  </figcaption>

</figure>

A few patterns are already visible in this list:

- The earliest entries (Chebyshev 1850, Rygg 1893) are **pure mechanisms**: a linkage converts one rotational input into a walking motion. There is no control.
- From the 1960s onward the entries split into **human-driven hydraulic machines** (Mosher 1968, Bucyrus-Erie 1969, Sutherland 1983) and **computer-controlled walkers** (Frank and McGhee 1968, McGhee 1977, Gurfinkel 1977).
- Only around 1980 do entries about **dynamics and balance** appear (Kato 1980, Matsuoka 1980, Miura and Shimoyama 1981, Raibert), which is when legged robots stop merely stepping and start running.

*References: Raibert, M. H. (1986). Legged Robots. Commun. ACM, 29(6), 499–514. [doi.org/10.1145/5948.5950](https://doi.org/10.1145/5948.5950) — Silva, M. F., & Tenreiro Machado, J. A. (2007). A Historical Perspective of Legged Robots. Journal of Vibration and Control, 13(9–10), 1447–1486. [doi.org/10.1177/1077546307078276](https://doi.org/10.1177/1077546307078276) — Bekey, G. A. (2005). Autonomous Robots: From Biological Inspiration to Implementation and Control. MIT Press.*

### 2. Mechanisms without control : Rygg's mechanical horse, 1893

L. A. Rygg patented a **human-powered mechanical horse** in 1893: pedals drove a gear train and linkages that converted the rider's rotational input into a quadruped walking motion. There was no actuator and no controller, the gait was entirely encoded in the geometry of the linkage. It is not clear that the machine was ever constructed.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/history/hist_rygg.png' | relative_url }}"
    alt="Patent drawing of L. A. Rygg's mechanical horse of 1893, showing the quadruped frame, the rider position, and the gear-and-linkage transmission"
    style="width: 38%; max-width: 440px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 0.3 : The Mechanical Horse, patented by L. A. Rygg, 1893 (US patent 491,927).</strong>
  </figcaption>

</figure>

This is the extreme end of a trade-off you will meet repeatedly: **put the gait in the mechanism, or put it in the controller.** Rygg's design is 100% mechanism. Modern quadrupeds sit at the other end, with the mechanism reduced to a simple articulated leg and the gait generated in software, which is precisely what Central Pattern Generators do in Module 3.

<!-- VIDEO SLOT:
No footage exists for Rygg's mechanical horse (it was most likely never built).
If you find or produce an animation of the linkage, embed it here:

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="TITLE"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
-->

### 3. Human in the loop : the GE walking truck, 1968

Ralph Mosher's quadruped at General Electric (also known as the **Cybernetic Anthropomorphous Machine**, CAM) was a four-legged, hydraulically actuated vehicle about 3 m tall and weighing over a tonne. The driver controlled it with four handles and pedals **hydraulically coupled** to the four legs: the operator's own limbs generated the coordination pattern, and force feedback let him feel the ground through the machine.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/history/hist_ge_truck.png' | relative_url }}"
    alt="Photograph of the General Electric quadruped walking truck of 1968 climbing over stacked wooden beams, with the human driver visible in the open cab"
    style="width: 48%; max-width: 560px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 0.4 : The GE walking truck (Ralph Mosher, General Electric, ~1968).</strong>
    Photograph courtesy of the General Electric Research and Development Center, reproduced in Raibert (1986).
  </figcaption>

</figure>

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/ZMGCFLEYakM"
    title="GE Walking Truck - Cybernetic Anthropomorphous Machine (CAM)"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

Note two things in the footage: the machine really does cross obstacles no wheeled vehicle of its era could, and the driver is visibly exhausted after a few minutes. **Coordinating four legs is hard enough that a trained human cannot sustain it**, which is exactly the argument for automating it.

*Source: "GE Walking Truck – Cybernetic Anthropomorphous Machine (CAM) 1969," YouTube ([youtube.com/watch?v=ZMGCFLEYakM](https://www.youtube.com/watch?v=ZMGCFLEYakM)).*

### 4. The first computer-controlled walkers

#### 4.1 McGhee's hexapods, 1970–1980

Robert McGhee's group at Ohio State University built a series of **hexapods** driven by electric motors through worm gears. The OSU hexapod (1976) was the first machine whose leg coordination was **entirely digital**, with on-board sensing: strain gauges on the legs, contact sensors to stop the descent of a foot, and a gyroscope to hold the chassis attitude constant.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/history/hist_osu_hexapod.png' | relative_url }}"
    alt="Photograph of the 1976 Ohio State University hexapod walking machine in a laboratory, six legs with worm-gear actuators and on-board electronics"
    style="width: 52%; max-width: 620px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 0.5 : The OSU hexapod (Ohio State University, McGhee, 1976).</strong>
    Legs of 40 + 50 cm; 18 actuators using worm gears; fully digital coordination.
  </figcaption>

</figure>

Six legs are a deliberate choice here: with six legs a machine can always keep three feet down in a **statically stable tripod**, so balance is a geometric constraint rather than a dynamics problem. Much of the difficulty of quadruped and biped control disappears, at the cost of weight, actuator count, and speed. You will see the formal version of this argument in Module 2, under static versus dynamic stability.

<!-- VIDEO SLOT:
Add a video of the OSU hexapod here if you find suitable footage.

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="TITLE"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
-->

*Further reading: [cyberneticzoo.com/walking-machines/1976-osu-hexapod-mcghee-american/](http://cyberneticzoo.com/walking-machines/1976-osu-hexapod-mcghee-american/)*

#### 4.2 The Adaptive Suspension Vehicle, 1984

Also from McGhee's group at Ohio State, the **Adaptive Suspension Vehicle (ASV)** was a 2'700 kg hydraulically actuated hexapod capable of carrying a human operator over rough terrain. Each leg is a **pantograph**: a planar linkage that decouples the vertical and horizontal motion of the foot, so that a simple actuator command maps onto a simple foot displacement. This is mechanical design used to *simplify the control problem*, the same philosophy as Rygg's linkage, but now combined with a computer.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/history/hist_asv.png' | relative_url }}"
    alt="Photograph of the Adaptive Suspension Vehicle, a large six-legged hydraulic walking machine with pantograph legs, standing in a workshop"
    style="width: 52%; max-width: 620px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 0.6 : The Adaptive Suspension Vehicle (McGhee and Waldron, Ohio State University, 1984).</strong>
    2'700 kg, hydraulic actuation, six pantograph legs, carries a human operator.
  </figcaption>

</figure>

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/DIiD1JimBXQ"
    title="OSU Adaptive Suspension Vehicle"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

Watch the machine cross uneven outdoor terrain: the body glides almost horizontally while the legs absorb the terrain profile underneath. **Decoupling body motion from foot placement** is still the objective of every modern quadruped controller.

*Source: "OSU Adaptive Suspension Vehicle," YouTube ([youtube.com/watch?v=DIiD1JimBXQ](https://www.youtube.com/watch?v=DIiD1JimBXQ)).*

#### 4.3 Odetics, 1980s

Odetics, a company in California, built the **ODEX** series of hexapods for the inspection of power plants. The design objective was different from the ASV's: instead of open terrain, ODEX had to move **inside man-made structures**, including narrow passages, which is why the legs fold radially around a central column and the whole machine can change its footprint. It could be fitted with a manipulator, and despite weighing only about 300 lb (roughly 135 kg) it could carry loads far heavier than itself.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: flex-end;
    flex-wrap: wrap;" >

  <div style="width: 27%; min-width: 200px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_odex_standing.png' | relative_url }}"
        alt="Odetics ODEX hexapod robot standing with its six legs folded radially around a central cylindrical body topped by a spherical sensor dome"
        style="width: 100%; height: auto;">
      <p><strong>(a) ODEX, radial leg arrangement</strong></p>
  </div>

  <div style="width: 45%; min-width: 260px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_odex_truck.png' | relative_url }}"
        alt="Photograph of ODEX I walking with an alternating tripod gait while carrying a 600 pound payload, next to a pickup truck for scale"
        style="width: 100%; height: auto;">
      <p><strong>(b) ODEX I carrying a payload</strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.7 : The Odetics ODEX hexapod, designed for inspection inside man-made structures.</strong>
    (b) ODEX I walking with an alternating tripod gait while carrying a 600 pound payload on its head.
  </figcaption>

</figure>

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/U9wZAjS1TKU"
    title="Odex Functionoid 6-legged mobile robot (1984)"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

*Source: "Odex 'Functionoid' 6-legged mobile robot (1984)," YouTube ([youtube.com/watch?v=U9wZAjS1TKU](https://www.youtube.com/watch?v=U9wZAjS1TKU)).*

*Reference: Bartholet, S. J. (1987). The Evolution of Odetics Walking Machine Technology. In Mobile Robots I (Vol. 0727, pp. 25–32). SPIE. [doi.org/10.1117/12.937781](https://doi.org/10.1117/12.937781)*

### 5. Bipeds : Waseda University, 1967 – now

While Ohio State was adding legs to buy static stability, Ichiro Kato's group at Waseda University in Japan went the other way and tackled the hardest case: **two legs**. The WL (Waseda Leg) series began in 1967 with pneumatically actuated pedipulators and evolved through decades into the WABIAN humanoids. Waseda is where **quasi-dynamic walking**, and much of the ZMP-based balance theory that dominated humanoid robotics for thirty years, was developed.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;" >

  <div style="width: 58%; min-width: 300px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_waseda_early.png' | relative_url }}"
        alt="Three black and white photographs of early Waseda biped machines: a pneumatic pedipulator, and two early WL series walking robots with external cabling"
        style="width: 100%; height: auto;">
      <p><strong>(a) Early WL-series machines</strong></p>
  </div>

  <div style="width: 22%; min-width: 160px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_wabian.png' | relative_url }}"
        alt="Colour photograph of the WABIAN humanoid robot from Waseda University walking, seen from behind"
        style="width: 100%; height: auto;">
      <p><strong>(b) WABIAN</strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.8 : Fifty years of biped robots at Waseda University: the WL and WABIAN families.</strong>
  </figcaption>

</figure>

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/n0oL1sHAKwE"
    title="Robots of Waseda: WABOT-1"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

WABOT-1 (1973), built on the WL legs, is generally considered the first full-scale anthropomorphic robot. The walking is slow and flat-footed: the robot moves its centre of mass carefully from one support polygon to the next so that it is **statically stable at every instant**. Compare this to the Raibert machines in the next section, which are almost never statically stable and rely entirely on their dynamics.

*Source: "Robots of Waseda: WABOT-1," YouTube ([youtube.com/watch?v=n0oL1sHAKwE](https://www.youtube.com/watch?v=n0oL1sHAKwE)).*

*Reference: Lim, H., & Takanishi, A. (2007). Biped walking robots created at Waseda University: WL and WABIAN family. Philosophical Transactions of the Royal Society A, 365(1850), 49–64. See also [humanoid.waseda.ac.jp/booklet/kato_4.html](http://www.humanoid.waseda.ac.jp/booklet/kato_4.html)*

### 6. Dynamic locomotion : Raibert's machines, 1980–1990

Marc Raibert, first at Carnegie Mellon and then at the famous **MIT Leg Laboratory**, produced the decisive break with static walking. His machines hop and run: they spend most of the cycle in flight or on a single foot, and they are stable only in the sense that the *cycle* is stable, never the instantaneous posture.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;" >

  <div style="width: 32%; min-width: 200px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_raibert_hopper.png' | relative_url }}"
        alt="Photograph of Raibert's 3D one-leg hopping machine, a single telescopic leg with a body frame and gimbal"
        style="width: 100%; height: auto;">
      <p><strong>(a) 3D one-leg hopper</strong></p>
  </div>

  <div style="width: 46%; min-width: 260px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_raibert_quadruped.png' | relative_url }}"
        alt="Photograph of Raibert's four-legged running machine with telescopic legs and hydraulic actuation"
        style="width: 100%; height: auto;">
      <p><strong>(b) Four-legged running machine</strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.9 : Raibert's legged machines (CMU and the MIT Leg Laboratory, 1980–1990).</strong>
  </figcaption>

</figure>

Raibert's celebrated result is that running can be controlled by **three nearly decoupled loops**: one regulating hopping height (energy injected during stance), one regulating forward speed (through where the foot is placed at touch-down), and one regulating body attitude (through hip torque during stance). A behaviour that looks impossibly complex reduces to three simple regulators, because the mechanics do most of the work.

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/XFXj81mvInc"
    title="Robots from MIT's Leg Lab"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

Many of these ideas went on to found **Boston Dynamics**, and we will return to these machines later in the course when we study force control and dynamic gaits.

*Source: "Robots from MIT's Leg Lab," YouTube ([youtube.com/watch?v=XFXj81mvInc](https://www.youtube.com/watch?v=XFXj81mvInc)).*

*Reference: Raibert, M. H. (1986). Legged Robots. Commun. ACM, 29(6), 499–514. [doi.org/10.1145/5948.5950](https://doi.org/10.1145/5948.5950)*

### 7. Passive walkers : locomotion (almost) for free, 1990 – now

Tad McGeer's work on **passive dynamic walking** made the opposite point to Raibert's, and made it just as forcefully. A carefully proportioned pair of legs placed on a shallow slope will walk down it in a **stable periodic gait with no motors, no sensors, no controller and no battery**: gravity supplies the energy and the natural pendulum dynamics of the limbs supply the coordination.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: flex-end;
    flex-wrap: wrap;" >

  <div style="width: 32%; min-width: 200px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_mcgeer.png' | relative_url }}"
        alt="Photograph of McGeer's passive dynamic walker, an unpowered pair of jointed legs with curved feet standing on a slope"
        style="width: 100%; height: auto;">
      <p><strong>(a) McGeer's passive walker</strong></p>
  </div>

  <div style="width: 30%; min-width: 190px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_cornell_ranger.png' | relative_url }}"
        alt="Photograph of the Cornell Ranger, a four-legged minimally actuated walking robot with thin legs and orange handles on top"
        style="width: 100%; height: auto;">
      <p><strong>(b) Cornell Ranger, 2011</strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.10 : Passive dynamic walking and its descendants.</strong>
  </figcaption>

</figure>

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/e2Q2Lx8O6Cg"
    title="Passive dynamic walking robot with knees (Collins, Wisse, Ruina)"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

Walking without control and without a battery. This is the three-dimensional passive-dynamic walker with two legs and knees of Collins, Wisse and Ruina.

*Source: "Steve Collins' Passive Dynamic Robot," YouTube ([youtube.com/watch?v=e2Q2Lx8O6Cg](https://www.youtube.com/watch?v=e2Q2Lx8O6Cg)).*

Adding a minimal amount of actuation to a passive design, just enough to replace the energy lost at foot impact, gives extraordinarily efficient walkers. The **Cornell Ranger** walked 40.5 miles (about 65 km) non-stop on a single battery charge in 2011.

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/rJ56d1UTlKQ"
    title="Cornell Ranger 2011 - Marathon Walking Robot"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

*Source: "Cornell Ranger 2011 – Marathon Walking Robot," YouTube ([youtube.com/watch?v=rJ56d1UTlKQ](https://www.youtube.com/watch?v=rJ56d1UTlKQ)).*

The lesson to carry into the rest of the course is that **the body is part of the controller**. Link lengths, mass distribution, foot shape and compliance are not fixed constraints to be compensated for, they are design variables that determine how much work the controller has to do. This is exactly the perspective behind the CPG approach in Module 3: an oscillator that entrains with the natural dynamics of the body, rather than a trajectory imposed on it.

*Reference: McGeer, T. (1990). Passive dynamic walking. International Journal of Robotics Research, 9(2), 62–82. — Collins, S. H., Wisse, M., & Ruina, A. (2001). A Three-Dimensional Passive-Dynamic Walking Robot with Two Legs and Knees. International Journal of Robotics Research, 20(2), 607–615.*

### 8. Sprawling quadrupeds : the TITAN series, 1976 – now

Shigeo Hirose's laboratory at the Tokyo Institute of Technology has produced the **TITAN** series of quadrupeds for nearly fifty years, and is known for exceptionally creative mechanical design. Its machines typically use a **sprawling posture**, with the legs extending sideways from the body as in a reptile rather than beneath it as in a mammal. The sprawling posture lowers the centre of mass and widens the support polygon, which buys stability, at the cost of larger joint torques to hold the body up.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 24px;
    align-items: center;
    flex-wrap: wrap;" >

  <div style="width: 30%; min-width: 190px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_titan8.png' | relative_url }}"
        alt="Photograph of the TITAN-VIII quadruped robot with its three joints per leg labelled"
        style="width: 100%; height: auto;">
      <p><strong>(a) TITAN-VIII (1996)</strong></p>
  </div>

  <div style="width: 52%; min-width: 280px;">
      <img
        src="{{ '/assets/images/locomotion/history/hist_titan13.png' | relative_url }}"
        alt="Photograph of the TITAN-XIII lightweight sprawling quadruped robot standing on grass"
        style="width: 100%; height: auto;">
      <p><strong>(b) TITAN-XIII (2013)</strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.11 : The TITAN quadrupeds of Hirose's laboratory, Tokyo Institute of Technology.</strong>
  </figcaption>

</figure>

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/xuSAidTF5Jk"
    title="TITAN-XIII : Sprawling-type Quadruped Robot"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

*Source: "TITAN-XIII : Sprawling-type Quadruped Robot," YouTube ([youtube.com/watch?v=xuSAidTF5Jk](https://www.youtube.com/watch?v=xuSAidTF5Jk)).*

*References: Arikawa, K., & Hirose, S. (1996). Development of quadruped walking robot TITAN-VIII. IROS '96, Vol. 1, 208–214. [doi.org/10.1109/IROS.1996.570670](https://doi.org/10.1109/IROS.1996.570670) — Kitano, S., Hirose, S., Endo, G., & Fukushima, E. F. (2013). Development of lightweight sprawling-type quadruped robot TITAN-XIII and its dynamic walking. IROS 2013, 6025–6030.*

### 9. Legged robots today

Legged robots left the laboratory in the last fifteen years. The figure below collects some of the platforms that are, or were, commercially available.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/history/hist_commercial.png' | relative_url }}"
    alt="Collage of commercial legged robots: Asimo and Qrio humanoids, Aibo, Rhex, Minitaur, ANYmal, A1 and Laikago quadrupeds, Cassie biped, Vision 60 and Spot quadrupeds"
    style="width: 85%; max-width: 900px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.12 : Some commercial legged robots.</strong>
  </figcaption>

</figure>

Humanoids in particular have gone from a handful of research platforms to a crowded commercial field in only a few years.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/history/hist_humanoids.png' | relative_url }}"
    alt="Collage of humanoid robots from Wabian and Asimo through HRP2, Atlas, Nao, to recent commercial humanoids including Figure AI, Unitree G1, Tesla Optimus, Digit, Apollo and Agibot A2"
    style="width: 92%; max-width: 950px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 0.13 : Great progress in humanoid robots.</strong>
  </figcaption>

</figure>

The **ANYmal** robot shown in the Course overview above belongs to this generation, and it is the platform whose behaviour this course sets out to explain.

### 10. What this history tells us

Four threads run through everything above, and each one becomes a technical topic later in the course:

- **Mechanism versus controller.** Rygg's linkage, the ASV's pantographs and McGeer's passive walkers all put intelligence in the hardware; Raibert's machines and modern quadrupeds put it in software. Real designs sit somewhere in between, and where they sit determines how hard the control problem is. This is why Module 1 starts by building an explicit **model** of the leg.
- **Static versus dynamic stability.** Hexapods keep three feet down and never fall; running machines are almost never in equilibrium and are stable only over a whole cycle. Module 2 makes this distinction precise.
- **Actuation sets the envelope.** Hydraulics gave the ASV and BigDog their power, electric motors gave the OSU hexapod its controllability, and modern series-elastic and direct-drive actuators gave ANYmal and the MIT Cheetah their ability to survive impacts. Section 3 of Module 1 returns to this.
- **Coordination is the hard part.** The GE truck failed not for lack of power but because a human could not coordinate four legs for long. Generating and adapting that coordination automatically is the subject of Module 3 and of Central Pattern Generators.

With that context in place, we can now start from the smallest useful unit: a single leg.

---

## Module 1 : Foundation of legged locomotion

### 1. Introduction :
We will start with a video that raise the foundational questions for our course :

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/RV9P0w8vZi8"
    title="Five gaits of the Icelandic horse"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

This horse produces five different gaits: walk, trot, canter, tölt, and flying pace. Its body stays the same; only the coordination between its legs changes.

*Source: "5 gaits of the Icelandic horse," YouTube, 2017 ([youtube.com/watch?v=RV9P0w8vZi8](https://www.youtube.com/watch?v=RV9P0w8vZi8)).*

Animals run, jump, recover from disturbances, and change gait almost effortlessly. Why is reproducing these abilities in a machine so difficult?
How can the same body, muscles, and joints generate several distinct locomotion patterns?

This Icelandic horse you have seen can walk, trot, canter, tölt, and perform a flying pace. Its mechanical structure does not change between these gaits. What changes is the coordination of its limbs: their timing, phase relationships, contact sequences, and interaction with the ground.

This observation introduces a central idea of legged locomotion:

> **A gait emerges from the interaction between the body, its actuation, and the coordination strategy controlling it.**

Before studying how Central Pattern Generators produce and coordinate rhythmic movements, we must first understand the physical system on which these rhythms act. This lecture therefore examines how legged robots evolved, how their bodies and legs are structured, and how their actuators generate the forces required for locomotion.




In this lecture, we simplify a robotic leg as a planar mechanism composed of two rigid links connected by rotational joints. This model is simple enough to analyse mathematically while still capturing the main motion of the hip, knee, and foot.

<figure style="margin: 1.5rem auto; text-align: center;">

  <div style="
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: flex-start;
    flex-wrap: wrap;" >

  <div style="width: 40%; min-width: 260px;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot11.png' | relative_url }}"
        alt="Physical quadruped leg showing its articulated mechanical structure"
        style="width: 100%; height: auto;">
      <p><strong>(a) Physical leg structure</strong></p>
  </div>

  <div style="width: 40%; min-width: 260px;">
      <img
        src="{{ '/assets/images/locomotion/Image_slot12.png' | relative_url }}"
        alt="Planar two-link approximation of a quadruped leg"
        style="width: 100%; height: auto;">
      <p><strong>(b) Planar two-link model</strong></p>
  </div>

  </div>

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 1 : Simplification of a robotic leg.</strong>
  </figcaption>

</figure>

What you can see in this figure is the complete leg contains several joints and moves in three-dimensional space. For the first modeling exercises, its sagittal motion is approximated using two rigid links connected by rotational joints. This abstraction preserves the main hip–knee–foot motion while reducing the complexity of
the kinematic and dynamic analysis.

The objective is to understand how joint movements determine the position of the foot. This relationship is the starting point for controlling foot trajectories, applying forces to the ground, and eventually producing locomotion.


### 2. Mechanical Structure of a Robotic Leg

A robotic leg is generally composed of:

- rigid links representing the different leg segments;
- joints allowing relative motion between the links;
- actuators producing joint torques;
- a foot or end effector interacting with the environment.

The number and arrangement of joints determine the leg's **degrees of freedom** and the positions that the foot can reach.

For a typical quadruped, each leg often contains three actuated joints. However, when studying motion in the sagittal plane, the leg can be simplified to two links and two rotational joints.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot2.png' | relative_url }}"
    alt="Quadruped leg and its planar two-link approximation">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 2 : Mechanical structure of a quadruped leg.</strong>
  </figcaption>

</figure>

From this figure, you see the mathematical model to analyze the leg, this simplified model is commonly called a **double pendulum** or a **two-link manipulator**.


### 3. Actuation in legged robots

Actuators generate the torques that move the joints. Legged robots may use electric, hydraulic, pneumatic, or compliant actuators.

For the study of kinematics, the exact actuator technology is not yet essential. Kinematics describes the geometry of motion independently of the forces producing it.

However, actuator properties will later influence:

- how rapidly the joints can move;
- how accurately torque can be controlled;
- how the leg reacts to impacts;
- how safely it interacts with the ground.
<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot4.png' | relative_url }}"
    alt="Comparison of actuator technologies used in legged robots"
    style="width: 45%; max-width: 600px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 3 : Actuation technologies for legged robots.</strong>
    
  </figcaption>

</figure>

Legged robots may use electric, hydraulic, pneumatic, or compliant actuators to generate joint motion and torque. The selected technology influences the available torque, response speed, control accuracy, impact tolerance, and interaction with the environment.

For now, we assume that the two joints can be commanded independently through the joint variables $q_1$ and $q_2$.

### 4. The Planar Two-Link Leg

The model contains:

- two links of lengths $l_1, l_2 \in \mathbb{R}_{>0}$ (meters);
- a fixed hip joint;
- a knee connecting the two links;
- a foot located at the end of the second link;
- two joint angles $q_1, q_2 \in \mathbb{R}$ (radians).

In the convention used here, both joint angles are measured with respect to the downward vertical direction.

The joint configuration is written as:

$$ \mathbf{q} = \begin{bmatrix} q_1 \\ q_2 \end{bmatrix} \in \mathbb{R}^2 $$

The foot position in Cartesian space is written as:

$$ \mathbf{p} = \begin{bmatrix} x \\ y \end{bmatrix} \in \mathbb{R}^2$$

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot3.png' | relative_url }}"
    alt="Planar two-link leg showing the hip, knee, foot, link lengths, joint angles, and Cartesian coordinate frame"
    style="width: 45%; max-width: 600px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 4 : Planar two-link leg model.</strong>
  </figcaption>

</figure>

In this figure, the robotic leg is represented by two rigid links connected through rotational joints. The angles $q_1$ and $q_2$ describe the absolute orientations of the thigh and calf, respectively. The parameters $l_1$ and $l_2$ are the lengths of the two links, while $m_1$ and $m_2$ represent the masses associated with the first and second links. The joint configuration determines the orientation of the links, whereas the Cartesian coordinates describe the position of the foot.

This model creates two different descriptions of the same leg:

- **Joint space:** the leg is described using $q_1$ and $q_2$.
- **Cartesian space:** the leg is described using the foot coordinates $x$ and $y$.

Leg control frequently requires moving between these two representations.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 1 : The Planar Two-Link Leg Model</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Meaning of $q_1$ and $q_2$

What do $q_1$ and $q_2$ represent in this model?

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="a">
  Absolute joint angles, each measured from the downward vertical direction
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="b">
  Relative angles between the two links
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="c">
  The Cartesian coordinates of the foot
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq1" value="d">
  The angular velocities of the joints
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'sec4-mcq1',
    'a',
    'Correct! In this convention, both q1 and q2 are absolute angles measured from the downward vertical.',
    'Incorrect. Revisit the angle convention described under Figure 4.'
  )">
  Check answer
</button>

<p id="sec4-mcq1-feedback"></p>

---

##### Question 2: Meaning of $l_1, l_2, m_1, m_2$

What do $l_1, l_2, m_1, m_2$ represent?

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="a">
  $l_1, l_2$ are the link lengths; $m_1, m_2$ are the masses associated with each link
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="b">
  $l_1, l_2$ are joint angles; $m_1, m_2$ are link lengths
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="c">
  $l_1, l_2$ are Cartesian coordinates; $m_1, m_2$ are torques
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq2" value="d">
  $l_1, l_2$ are motor torques; $m_1, m_2$ are joint angles
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'sec4-mcq2',
    'a',
    'Correct! l1 and l2 are the link lengths, and m1 and m2 are the associated link masses.',
    'Incorrect. Check the parameter definitions given below Figure 4.'
  )">
  Check answer
</button>

<p id="sec4-mcq2-feedback"></p>

---

##### Question 3: Joint space versus Cartesian space

Which statement correctly distinguishes joint space from Cartesian space?

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="a">
  Joint space describes the leg using $q_1, q_2$; Cartesian space describes the foot using $x, y$
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="b">
  Joint space uses $x, y$; Cartesian space uses $q_1, q_2$
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="c">
  Joint space and Cartesian space are always identical descriptions
</label>

<label style="display: block;">
  <input type="radio" name="sec4-mcq3" value="d">
  Joint space only applies to the foot, and Cartesian space only applies to the hip
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'sec4-mcq3',
    'a',
    'Correct! Joint space uses q1, q2; Cartesian space uses the foot coordinates x, y.',
    'Incorrect. Reread the two bullet points defining joint space and Cartesian space.'
  )">
  Check answer
</button>

<p id="sec4-mcq3-feedback"></p>

---

##### Question 4 (True/False): Is $\mathbf{p}$ a joint-space quantity?

$\mathbf{p} = [x, y]^T$ describes the leg in joint space.

<label style="display: block;">
  <input type="radio" name="sec4-tf1" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="sec4-tf1" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'sec4-tf1',
    'false',
    'Correct! \\(\\mathbf{p}=[x,y]^T\\) is a Cartesian-space quantity, not a joint-space quantity.',
    'Incorrect. \\(\\mathbf{p}\\) describes the position of the foot in Cartesian coordinates.'
  )">
  Check answer
</button>

<p id="sec4-tf1-feedback"></p>

---

##### Question 5 (True/False): Uniqueness of the foot position

The same foot position can correspond to more than one joint configuration.

<label style="display: block;">
  <input type="radio" name="sec4-tf2" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="sec4-tf2" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'sec4-tf2',
    'true',
    'Correct! A two-link leg generally has (up to) two configurations reaching the same foot position &mdash; you will see this explicitly in the Inverse Kinematics quiz below.',
    'Incorrect. Think about a leg that can bend its knee either one way or the other while still reaching the same point.'
  )">
  Check answer
</button>

<p id="sec4-tf2-feedback"></p>

</div>
</details>

### 5. Leg kinematics

Before starting this section, students should be familiar with:

- [Forward and Inverse Kinematics]({{ 'docs/chap1_basic_motion_ctrl/kinematics/' | relative_url }})

You can check 1.1.3.3 and 1.1.3.6.

The following section will present exercises to revisit these concepts in the specific context of legged-robot modeling and locomotion.

The planar leg is modeled as a two-link serial mechanism, similar to a planar two-link robotic arm.

Its joint configuration is
$
\mathbf{q} =
\begin{bmatrix} q_1 \\ q_2 \end{bmatrix}
\in \mathbb{R}^2
$
and the Cartesian position of the foot is
$
\mathbf{p} =
\begin{bmatrix} x \\ y
\end{bmatrix}
\in \mathbb{R}^2.
$

#### 5.1 Forward Kinematics

Consider figure 4 for a planar two-link leg with link lengths

$$
l_1=l_2=0.50\text{ m}.
$$

The joint angles are

$$
q_1=30^\circ,
\qquad
q_2=-30^\circ.
$$

Both $q_1$ and $q_2$ are **absolute link orientations** measured relative to the downward vertical direction.

The joint angular velocities are

$$
\dot{q}_1=1.0\text{ rad/s},
\qquad
\dot{q}_2=-0.5\text{ rad/s}.
$$

---
<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 2 : Forward Kinematics of a Planar Leg</span>
</summary>

<div class="exercise-accordion-content" markdown="1">


##### Question 1: Knee position equations

Which equations correctly describe the Cartesian position of the knee?

<label style="display: block;">
  <input type="radio" name="fk-q1" value="a">
  $x_1=l_1\cos(q_1)$ and $y_1=l_1\sin(q_1)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q1" value="b">
  $x_1=l_1\sin(q_1)$ and $y_1=-l_1\cos(q_1)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q1" value="c">
  $x_1=-l_1\sin(q_1)$ and $y_1=l_1\cos(q_1)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q1" value="d">
  $x_1=l_1\cos(q_1)$ and $y_1=-l_1\sin(q_1)$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q1',
    'b',
    'Correct! The angle is measured from the downward vertical direction.',
    'Incorrect. Consider the angle convention and the direction of the vertical axis.'
  )">
  Check answer
</button>

<p id="fk-q1-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

When $q_1=0$, the first link points vertically downward. Therefore,

$$
x_1=0,
\qquad
y_1=-l_1.
$$

  </div>
</details>

---

##### Question 2: Numerical knee position

Using

$$
x_1=l_1\sin(q_1),
\qquad
y_1=-l_1\cos(q_1),
$$

what is the knee position?

<label style="display: block;">
  <input type="radio" name="fk-q2" value="a">
  $x_1=0.25\text{ m}$ and $y_1\approx-0.433\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q2" value="b">
  $x_1\approx0.433\text{ m}$ and $y_1=-0.25\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q2" value="c">
  $x_1=-0.25\text{ m}$ and $y_1\approx0.433\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q2" value="d">
  $x_1=0.50\text{ m}$ and $y_1=0\text{ m}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q2',
    'a',
    'Correct! The knee is 0.25 m forward and approximately 0.433 m below the hip.',
    'Incorrect. Substitute l1 = 0.50 m and q1 = 30 degrees into the knee-position equations.'
  )">
  Check answer
</button>

<p id="fk-q2-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Use

$$
\sin(30^\circ)=0.5
$$

and

$$
\cos(30^\circ)\approx0.866.
$$

  </div>
</details>

---

##### Question 3: Foot position equations

Which equations correctly describe the Cartesian position of the foot?

<label style="display: block;">
  <input type="radio" name="fk-q3" value="a">
  $x_2=l_1\sin(q_1)+l_2\sin(q_2)$ and
  $y_2=-l_1\cos(q_1)-l_2\cos(q_2)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q3" value="b">
  $x_2=l_1\sin(q_1)-l_2\sin(q_2)$ and
  $y_2=-l_1\cos(q_1)+l_2\cos(q_2)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q3" value="c">
  $x_2=l_1\cos(q_1)+l_2\cos(q_2)$ and
  $y_2=l_1\sin(q_1)+l_2\sin(q_2)$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q3" value="d">
  $x_2=l_2\sin(q_2)$ and
  $y_2=-l_2\cos(q_2)$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q3',
    'a',
    'Correct! The foot position is the sum of the Cartesian contributions of both links.',
    'Incorrect. Begin at the hip and add the displacement produced by each link.'
  )">
  Check answer
</button>

<p id="fk-q3-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

The foot position is obtained by adding the hip-to-knee vector and the knee-to-foot vector.

Because $q_2$ is an absolute angle, the second-link contribution directly uses $\sin(q_2)$ and $\cos(q_2)$.

  </div>
</details>

---

##### Question 4: Numerical foot position

Using

$$
x_2=l_1\sin(q_1)+l_2\sin(q_2),
$$

$$
y_2=-l_1\cos(q_1)-l_2\cos(q_2),
$$

what is the foot position?

<label style="display: block;">
  <input type="radio" name="fk-q4" value="a">
  $x_2=0\text{ m}$ and $y_2\approx-0.866\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q4" value="b">
  $x_2=0.50\text{ m}$ and $y_2=0\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q4" value="c">
  $x_2=0\text{ m}$ and $y_2\approx-0.433\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q4" value="d">
  $x_2\approx0.866\text{ m}$ and $y_2=0\text{ m}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q4',
    'a',
    'Correct! The horizontal link contributions cancel, while the vertical contributions add.',
    'Incorrect. Remember that sin(-30 degrees) is negative and cos(-30 degrees) is positive.'
  )">
  Check answer
</button>

<p id="fk-q4-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

For the horizontal coordinate,

$$
x_2
=
0.50\sin(30^\circ)
+
0.50\sin(-30^\circ).
$$

For the vertical coordinate,

$$
y_2
=
-0.50\cos(30^\circ)
-
0.50\cos(-30^\circ).
$$

  </div>
</details>



---

##### Question 5: Knee velocity

Differentiating the knee-position equations gives

$$
\dot{x}_1=l_1\cos(q_1)\dot{q}_1,
$$

$$
\dot{y}_1=l_1\sin(q_1)\dot{q}_1.
$$

What is the velocity of the knee?

<label style="display: block;">
  <input type="radio" name="fk-q5" value="a">
  $\dot{x}_1\approx0.433\text{ m/s}$ and
  $\dot{y}_1=0.25\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q5" value="b">
  $\dot{x}_1=0.25\text{ m/s}$ and
  $\dot{y}_1\approx-0.433\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q5" value="c">
  $\dot{x}_1\approx-0.433\text{ m/s}$ and
  $\dot{y}_1=-0.25\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q5" value="d">
  $\dot{x}_1=0\text{ m/s}$ and
  $\dot{y}_1=0\text{ m/s}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q5',
    'a',
    'Correct! Differentiating the knee position gives approximately 0.433 m/s horizontally and 0.25 m/s vertically.',
    'Incorrect. Apply the chain rule and use dq1 = 1 rad/s.'
  )">
  Check answer
</button>

<p id="fk-q5-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Substitute

$$
l_1=0.50,
\qquad
q_1=30^\circ,
\qquad
\dot{q}_1=1.0.
$$

  </div>
</details>

---

##### Question 6: Foot velocity

The foot velocity is

$$
\dot{x}_2
=
l_1\cos(q_1)\dot{q}_1
+
l_2\cos(q_2)\dot{q}_2,
$$

$$
\dot{y}_2
=
l_1\sin(q_1)\dot{q}_1
+
l_2\sin(q_2)\dot{q}_2.
$$

What is the numerical foot velocity?

<label style="display: block;">
  <input type="radio" name="fk-q6" value="a">
  $\dot{x}_2\approx0.217\text{ m/s}$ and
  $\dot{y}_2=0.375\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q6" value="b">
  $\dot{x}_2\approx0.650\text{ m/s}$ and
  $\dot{y}_2=0.125\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q6" value="c">
  $\dot{x}_2=0\text{ m/s}$ and
  $\dot{y}_2\approx-0.866\text{ m/s}$
</label>

<label style="display: block;">
  <input type="radio" name="fk-q6" value="d">
  $\dot{x}_2\approx-0.217\text{ m/s}$ and
  $\dot{y}_2=-0.375\text{ m/s}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'fk-q6',
    'a',
    'Correct! The two link contributions give a foot velocity of approximately 0.217 m/s horizontally and 0.375 m/s vertically.',
    'Incorrect. Differentiate each link contribution and multiply it by its corresponding angular velocity.'
  )">
  Check answer
</button>

<p id="fk-q6-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

For the horizontal velocity,

$$
\dot{x}_2
=
0.50\cos(30^\circ)(1.0)
+
0.50\cos(-30^\circ)(-0.5).
$$

For the vertical velocity,

$$
\dot{y}_2
=
0.50\sin(30^\circ)(1.0)
+
0.50\sin(-30^\circ)(-0.5).
$$

  </div>
</details>

</div>     
</details>


---

#### 5.2 Inverse Kinematics

A planar two-link leg must place its foot at the desired Cartesian position

$$
\mathbf{p}_d=
\begin{bmatrix} x_d \\ y_d \end{bmatrix} = \begin{bmatrix}
0.30 \\ -0.40 \end{bmatrix}
\text{ m}.
$$

The link lengths are

$$
l_1=l_2=0.50\text{ m}.
$$

The angle $\theta_1$ describes the orientation of the first link relative to the downward vertical direction. The angle $\theta_2$ is the relative angle between the first and second links.

The corresponding absolute-angle convention is

$$
q_1=\theta_1,
\qquad
q_2=\theta_1+\theta_2.
$$

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot5.png' | relative_url }}"
    alt="Two configurations of a planar two-link leg reaching the same desired foot position"
    style="width: 65%; max-width: 750px; height: auto;">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 5: Multiple inverse-kinematics solutions.</strong>
    
  </figcaption>

</figure>


<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 3 : Inverse Kinematics of a Planar Leg</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Reachability

The distance between the hip and the desired foot position is

$$
r=\sqrt{x_d^2+y_d^2}.
$$

What is the value of $r$?

<label style="display: block;">
  <input type="radio" name="ik-q1" value="a">
  $r=0.25\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q1" value="b">
  $r=0.50\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q1" value="c">
  $r=0.70\text{ m}$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q1" value="d">
  $r=1.00\text{ m}$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q1',
    'b',
    'Correct! The desired foot position is 0.50 m from the hip.',
    'Incorrect. Compute the Euclidean distance between the hip and the desired foot position.'
  )">
  Check answer
</button>

<p id="ik-q1-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Substitute the desired coordinates into

$$
r=\sqrt{x_d^2+y_d^2}.
$$

  </div>
</details>

---

##### Question 2: Workspace condition

A target is reachable when

$$
|l_1-l_2|\leq r\leq l_1+l_2.
$$

Is the desired foot position reachable?

<label style="display: block;">
  <input type="radio" name="ik-q2" value="a">
  Yes, because $0\leq 0.50\leq 1.00$.
</label>

<label style="display: block;">
  <input type="radio" name="ik-q2" value="b">
  No, because $r<l_1$.
</label>

<label style="display: block;">
  <input type="radio" name="ik-q2" value="c">
  No, because $r<l_1+l_2$.
</label>

<label style="display: block;">
  <input type="radio" name="ik-q2" value="d">
  Yes, because every Cartesian position is reachable.
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q2',
    'a',
    'Correct! The desired point lies inside the reachable workspace of the leg.',
    'Incorrect. Compare the hip-to-foot distance with the minimum and maximum leg extension.'
  )">
  Check answer
</button>

<p id="ik-q2-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

For this leg,

$$
|l_1-l_2|=0
$$

and

$$
l_1+l_2=1.00\text{ m}.
$$

  </div>
</details>

---

##### Question 3: Relative knee angle

The cosine rule gives

$$
\cos(\theta_2)
=
\frac{x_d^2+y_d^2-l_1^2-l_2^2}
{2l_1l_2}.
$$

What is the value of $\cos(\theta_2)$?

<label style="display: block;">
  <input type="radio" name="ik-q3" value="a">
  $\cos(\theta_2)=1$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q3" value="b">
  $\cos(\theta_2)=0.5$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q3" value="c">
  $\cos(\theta_2)=0$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q3" value="d">
  $\cos(\theta_2)=-0.5$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q3',
    'd',
    'Correct! Substitution into the cosine-rule expression gives -0.5.',
    'Incorrect. Substitute the desired position and both link lengths into the equation.'
  )">
  Check answer
</button>

<p id="ik-q3-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

First compute

$$
x_d^2+y_d^2
=
0.30^2+(-0.40)^2
=
0.25.
$$

Then substitute $l_1=l_2=0.50\text{ m}$.

  </div>
</details>

---

##### Question 4: Two knee configurations

Since

$$
\cos(\theta_2)=-0.5,
$$

which values of $\theta_2$ are possible?

<label style="display: block;">
  <input type="radio" name="ik-q4" value="a">
  $\theta_2=\pm30^\circ$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q4" value="b">
  $\theta_2=\pm60^\circ$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q4" value="c">
  $\theta_2=\pm90^\circ$
</label>

<label style="display: block;">
  <input type="radio" name="ik-q4" value="d">
  $\theta_2=\pm120^\circ$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'ik-q4',
    'd',
    'Correct! The positive and negative solutions correspond to two different knee configurations.',
    'Incorrect. Evaluate the inverse cosine of -0.5.'
  )">
  Check answer
</button>

<p id="ik-q4-feedback"></p>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

Use

$$
\theta_2
=
\pm\cos^{-1}(-0.5).
$$

  </div>
</details>

</div>

</details>

#### 5.3 Why Kinematics Matters for Locomotion

During locomotion, the controller must reason both about the joints and about the foot.

Examples include:

- placing the foot at a desired location;
- generating a swing trajectory;
- maintaining contact with the ground;
- controlling the height of the robot;
- preparing the leg for landing;
- coordinating several legs during a gait.

Forward and inverse kinematics provide the geometric foundation for these operations.

Kinematics describes how the joint angles determine the position and velocity of the leg. **Dynamics** describes how forces and joint torques produce motion.

For the two-link leg, the joint variables are:

$$ \mathbf{q} = \begin{bmatrix} q_1 \\ q_2 \end{bmatrix} \in \mathbb{R}^2,
\qquad
\dot{\mathbf{q}} = \begin{bmatrix} \dot{q}_1 \\ \dot{q}_2 \end{bmatrix} \in \mathbb{R}^2,
\qquad
\ddot{\mathbf{q}} = \begin{bmatrix} \ddot{q}_1 \\ \ddot{q}_2 \end{bmatrix} \in \mathbb{R}^2 $$

The actuator torques are:

$$
\boldsymbol{\tau}
=
\begin{bmatrix}
\tau_1 \\
\tau_2
\end{bmatrix}
\in \mathbb{R}^2
$$

<!-- IMAGE SLOT:
Insert the two-link leg model showing:
- q1 and q2
- l1 and l2
- m1 and m2
- gravity g
- torques tau1 and tau2
-->

> **Angle convention:** in this practical, $q_1$ and $q_2$ are both measured with respect to the downward vertical direction. Therefore, \(q_2\) is an absolute link orientation rather than a relative knee angle.

### 6. Leg dynamics

#### 6.1 General Equation of Motion

The dynamics of a robotic system can be written as:

$$
\boldsymbol{\tau} =
\mathbf{B}(\mathbf{q})\ddot{\mathbf{q}}
+
\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})
+
\mathbf{g}(\mathbf{q})
$$

where:

- $\mathbf{B}(\mathbf{q}) \in \mathbb{R}^{2\times2}$ is the inertia matrix (symmetric, positive definite);
- $\mathbf{C}(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}^{2}$ is a vector containing the velocity-dependent (Coriolis/centrifugal) torques, written here directly as a vector, not as a matrix multiplying $\dot{\mathbf{q}}$;
- $\mathbf{g}(\mathbf{q}) \in \mathbb{R}^{2}$ is the vector of gravitational torques;
- $\boldsymbol{\tau} \in \mathbb{R}^{2}$ is the vector of actuator torques.

Friction and other non-conservative effects may be added as:

$$
\boldsymbol{\tau}
=
\mathbf{B}(\mathbf{q})\ddot{\mathbf{q}}
+
\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})
+
\mathbf{g}(\mathbf{q})
+
\mathbf{F}(\mathbf{q},\dot{\mathbf{q}})
$$

where $\mathbf{F}(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}^{2}$ is the vector of friction torques.

In the following derivation, friction is neglected.

---

#### 6.2 Lagrangian Method

The equations of motion can be derived using the Lagrangian:

$$
L(\mathbf{q},\dot{\mathbf{q}})
=
T(\mathbf{q},\dot{\mathbf{q}})
-
V(\mathbf{q})
$$

where:

- $T(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}$ is the total kinetic energy (a scalar, in joules);
- $V(\mathbf{q}) \in \mathbb{R}$ is the total potential energy (a scalar, in joules);
- $L(\mathbf{q},\dot{\mathbf{q}}) \in \mathbb{R}$ is therefore also a scalar.

For each joint $q_i$, the Euler–Lagrange equation is:

$$
\frac{d}{dt}
\left(
\frac{\partial L}{\partial \dot{q}_i}
\right)
-
\frac{\partial L}{\partial q_i}
=
\tau_i
$$

For the two-link leg:

$$
\frac{d}{dt}
\left(
\frac{\partial L}{\partial \dot{q}_1}
\right)
-
\frac{\partial L}{\partial q_1}
=
\tau_1
$$

$$
\frac{d}{dt}
\left(
\frac{\partial L}{\partial \dot{q}_2}
\right)
-
\frac{\partial L}{\partial q_2}
=
\tau_2
$$

---

#### 6.3 Potential Energy

Potential energy depends on the configuration \(\mathbf{q}\), but not on the joint velocities.

The vertical positions of the two masses are:

$$ y_1=-l_1\cos(q_1) $$

$$ y_2=-l_1\cos(q_1)-l_2\cos(q_2) $$

The potential energy associated with \(m_1\) is:

$$ V_1=m_1gy_1 $$

Therefore:

$$ V_1=-m_1gl_1\cos(q_1) $$

For the second mass:

$$ V_2=m_2gy_2 $$

Therefore:

$$ V_2 = -m_2g\left(l_1\cos(q_1)+l_2\cos(q_2)\right)$$

The total potential energy is:

$$ V(\mathbf{q})=V_1+V_2 $$

Hence:

$$ V(\mathbf{q}) = -(m_1+m_2)gl_1\cos(q_1) - m_2gl_2\cos(q_2) $$

<!-- IMAGE SLOT:
Insert the two-link model with the vertical positions y1 and y2 highlighted.
-->



#### 6.4 Kinetic Energy

Kinetic energy depends on both the configuration and the joint velocities.

For a point mass:

$$ T_i = \frac{1}{2}m_i \left(\dot{x}_i^2+\dot{y}_i^2\right)$$

For the first mass:

$$ T_1 = \frac{1}{2}m_1l_1^2\dot{q}_1^2 $$

For the second mass:

$$ T_2 = \frac{1}{2}m_2 \left[ l_1^2\dot{q}_1^2 + l_2^2\dot{q}_2^2 + 2l_1l_2\cos(q_1-q_2) \dot{q}_1\dot{q}_2 \right] $$

The total kinetic energy is:

$$ T=T_1+T_2 $$

Therefore:

$$ T = \frac{1}{2}(m_1+m_2)l_1^2\dot{q}_1^2 + \frac{1}{2}m_2l_2^2\dot{q}_2^2 + m_2l_1l_2 \cos(q_1-q_2)\dot{q}_1\dot{q}_2 $$

<!-- IMAGE SLOT:
Insert the two-link model with the velocity vectors of m1 and m2.
-->

Once the kinetic and potential energies are known, define the Lagrangian:

$$
L(\mathbf{q},\dot{\mathbf{q}})=T(\mathbf{q},\dot{\mathbf{q}})-V(\mathbf{q})
$$

The kinetic energy can always be written as:

$$
T=
\frac{1}{2}
\dot{\mathbf{q}}^{T}
\mathbf{B}(\mathbf{q})
\dot{\mathbf{q}}
$$

The inertia matrix is therefore obtained by identifying the coefficients of the quadratic velocity terms, for $i,j \in \{1,2\}$:

$$
B_{ij}
=
\frac{\partial^2 T}
{\partial \dot{q}_i\,\partial \dot{q}_j}
\in \mathbb{R}
$$

The potential energy gives the gravity vector:

$$
\mathbf{g}(\mathbf{q})
=
\frac{\partial V}{\partial \mathbf{q}}
$$

Finally, applying the Euler–Lagrange equations produces the complete dynamics:

$$
\boldsymbol{\tau}
=
\mathbf{B}(\mathbf{q})\ddot{\mathbf{q}}
+
\mathbf{C}(\mathbf{q},\dot{\mathbf{q}})
+
\mathbf{g}(\mathbf{q})
$$

#### 6.5 Inertia Matrix

The inertia matrix is:

$$ \mathbf{B}(\mathbf{q}) = \begin{bmatrix}(m_1+m_2)l_1^2 & m_2l_1l_2\cos(q_1-q_2)\\ m_2l_1l_2\cos(q_1-q_2) & m_2l_2^2 \end{bmatrix} $$

The diagonal terms describe the inertia associated with each joint. The off-diagonal terms describe the dynamic coupling between the two links.


#### 6.6 Velocity-Dependent Terms

The velocity-dependent vector is:

$$ \mathbf{C}(\mathbf{q},\dot{\mathbf{q}}) = \begin{bmatrix}m_2l_1l_2 \sin(q_1-q_2)\dot{q}_2^2 \\ -m_2l_1l_2\sin(q_1-q_2)\dot{q}_1^2 \end{bmatrix}$$

These terms arise because the two links move together and influence each other's motion.

---

#### 6.7 Gravity Vector

The gravitational contribution is obtained from the derivatives of the potential energy:

$$ \mathbf{g}(\mathbf{q}) = \frac{\partial V}{\partial \mathbf{q}}$$

Therefore:

$$ \mathbf{g}(\mathbf{q}) = \begin{bmatrix}(m_1+m_2)gl_1\sin(q_1)\\ m_2gl_2\sin(q_2) \end{bmatrix}
$$


#### 6.8 Complete Dynamics

The complete equation of motion is:

$$ \begin{bmatrix} \tau_1 \\ \tau_2 \end{bmatrix} = \begin{bmatrix} (m_1+m_2)l_1^2 & m_2l_1l_2\cos(q_1-q_2) \\ m_2l_1l_2\cos(q_1-q_2) & m_2l_2^2 \end{bmatrix}
\begin{bmatrix} \ddot{q}_1 \\ \ddot{q}_2 \end{bmatrix} $$

$$ + \begin{bmatrix} m_2l_1l_2\sin(q_1-q_2)\dot{q}_2^2 \\ -m_2l_1l_2\sin(q_1-q_2)\dot{q}_1^2 \end{bmatrix} + \begin{bmatrix} (m_1+m_2)gl_1\sin(q_1) \\ m_2gl_2\sin(q_2 \end{bmatrix} $$

Equivalently:

$$
\tau_1
=
(m_1+m_2)l_1^2\ddot{q}_1
+
m_2l_1l_2\cos(q_1-q_2)\ddot{q}_2
+
m_2l_1l_2\sin(q_1-q_2)\dot{q}_2^2
+
(m_1+m_2)gl_1\sin(q_1)
$$

$$
\tau_2
=
m_2l_1l_2\cos(q_1-q_2)\ddot{q}_1
+
m_2l_2^2\ddot{q}_2
-
m_2l_1l_2\sin(q_1-q_2)\dot{q}_1^2
+
m_2gl_2\sin(q_2)
$$

<!-- IMAGE SLOT:
Insert a visual decomposition of the dynamics into:
1. inertia terms;
2. velocity-dependent terms;
3. gravity terms.
-->

#### 6.9 Forward and Inverse Dynamics

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Programming Exercise 1 : Modeling and Simulating a Two-Link Leg</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

This practical consolidates the concepts introduced in this section:

- forward kinematics;
- kinetic and potential energy;
- Lagrangian dynamics;
- inertia, velocity-dependent, and gravity terms;
- passive numerical simulation.

##### Download the exercise files

Download the complete exercise package, extract the ZIP file, and keep all files in the extracted folder.

<a
  href="{{ '/assets/downloads/locomotion/Exercise1.zip' | relative_url }}"
  download
  style="
    display: inline-block;
    padding: 10px 16px;
    background-color: #0075db;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  ">
  Download Practical 1
</a>

##### What's in the package

```text
Exercise_1/
├── locomotion_practical1.ipynb            # the exercise notebook, fill in the TODOs
├── locomotion_practical1_solution.ipynb   # reference solution
├── assertion_check.py                     # validation logic used by the notebook
├── requirements_Ex1.txt                   # Python dependencies
└── README.md                              # environment setup & step-by-step instructions
```

The notebook walks through forward kinematics, energies, and the Lagrangian derivation from this section, one `TODO` cell at a time, each checked automatically against `assertion_check.py`.

**Full environment setup and instructions are in `README.md`** inside the downloaded package.

</div>
</details>

---

### 7. From Leg Modeling to Control

The kinematic and dynamic models allow us to compute the torques required to control the leg. The controller may operate either in:

- **joint space**, using joint angles and velocities;
- **Cartesian space**, using the position, velocity, and force of the foot.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot10.png' | relative_url }}"
    alt="Planar two-link leg illustrating forward kinematics, inverse kinematics, differential kinematics, and force-to-torque mapping"
    style="width: 60%; max-width: 800px; height: auto;">

  <figcaption style="max-width: 850px; margin: 0.5rem auto;">
    <strong>Figure 6 : Main kinematic relationships for a planar leg.</strong>
  </figcaption>

</figure>

The joint configuration $\mathbf{q}$ determines the foot position $\mathbf{p}$ through forward kinematics, while inverse kinematics computes the joint configuration required to reach a desired foot position. The Jacobian $\mathbf{J}(\mathbf{q})$ relates joint velocities $\dot{\mathbf{q}}$ to the Cartesian foot velocity $\dot{\mathbf{p}}$, and its transpose maps a desired Cartesian foot force $\mathbf{F}$ to joint torques $\boldsymbol{\tau}$.

---

#### 7.1 The Jacobian

The forward kinematics defines the foot position as a function of the joint configuration:

$$ \mathbf{p}=f(\mathbf{q}) $$

For the planar two-link leg:

$$
\mathbf{p} = \begin{bmatrix} x_2 \\ y_2 \end{bmatrix}
$$

with:

$$
x_2=l_1\sin(q_1)+l_2\sin(q_2)
$$

$$
y_2=-l_1\cos(q_1)-l_2\cos(q_2)
$$

Differentiating the foot position gives:

$$
\dot{x}_2 =
l_1\cos(q_1)\dot{q}_1
+
l_2\cos(q_2)\dot{q}_2
$$

$$
\dot{y}_2
=
l_1\sin(q_1)\dot{q}_1
+
l_2\sin(q_2)\dot{q}_2
$$

These equations can be written in matrix form:

$$ \begin{bmatrix} \dot{x}_2 \\ \dot{y}_2 \end{bmatrix} = \begin{bmatrix} l_1\cos(q_1) & l_2\cos(q_2) \\ l_1\sin(q_1) & l_2\sin(q_2) \end{bmatrix}
\begin{bmatrix} \dot{q}_1 \\ \dot{q}_2 \end{bmatrix} $$

The matrix relating joint velocity to foot velocity is the **Jacobian**, $\mathbf{J}(\mathbf{q}) \in \mathbb{R}^{2\times2}$:

$$
\mathbf{J}(\mathbf{q})
=
\frac{\partial \mathbf{p}}{\partial \mathbf{q}}
$$

Therefore:

$$
\mathbf{J}(\mathbf{q}) = \begin{bmatrix} l_1\cos(q_1) & l_2\cos(q_2) \\ l_1\sin(q_1) & l_2\sin(q_2) \end{bmatrix}
$$

The velocity relationship becomes:

$$
\mathbf{v}
=
\mathbf{J}(\mathbf{q})\dot{\mathbf{q}}
$$

where $\mathbf{v} \in \mathbb{R}^2$ is the foot velocity:

$$
\mathbf{v}
=
\dot{\mathbf{p}}
=
\begin{bmatrix}
\dot{x}_2 \\ \dot{y}_2
\end{bmatrix}
$$

The Jacobian therefore provides a local mapping between:

$$
\text{joint velocity}
\quad \longrightarrow \quad
\text{foot velocity}
$$

<!-- IMAGE SLOT:
Insert the two-link leg with:
- joint velocities qdot_1 and qdot_2;
- Cartesian foot velocity v;
- the mapping v = J(q)qdot.
-->

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 4 : The Jacobian</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Dimension of $\mathbf{J}(\mathbf{q})$

For this planar two-link leg, what is the size of $\mathbf{J}(\mathbf{q})$?

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="a">
  $1\times2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="b">
  $2\times1$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="c">
  $2\times2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq1" value="d">
  $3\times3$
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'jac-mcq1',
    'c',
    'Correct! J maps 2 joint velocities to a 2D Cartesian foot velocity, so it is 2x2.',
    'Incorrect. Count the rows (Cartesian dimensions of p) and columns (number of joints).'
  )">
  Check answer
</button>

<p id="jac-mcq1-feedback"></p>

---

##### Question 2: Physical meaning of a singular Jacobian

What does a singular (non-invertible) Jacobian mean physically for this leg?

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="a">
  The leg is at rest
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="b">
  The leg is fully extended or fully folded, and loses the ability to move the foot in some direction
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="c">
  The foot has exactly reached the desired position
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq2" value="d">
  The joint torques are all zero
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'jac-mcq2',
    'b',
    'Correct! Near full extension or full retraction, the two link vectors become (anti)parallel and the leg loses a direction of foot motion.',
    'Incorrect. Think about the geometric configurations where the two links become aligned.'
  )">
  Check answer
</button>

<p id="jac-mcq2-feedback"></p>

---

##### Question 3: Configuration dependence

Does $\mathbf{J}(\mathbf{q})$ depend on the current joint configuration?

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="a">
  No, it is constant
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="b">
  Yes, its entries depend on $q_1$ and $q_2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="c">
  It depends only on $l_1$ and $l_2$, never on $q_1, q_2$
</label>

<label style="display: block;">
  <input type="radio" name="jac-mcq3" value="d">
  It is only relevant for torque, not velocity
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'jac-mcq3',
    'b',
    'Correct! J(q) must be re-evaluated at the current configuration, as shown by the cos(q1), cos(q2), sin(q1), sin(q2) entries.',
    'Incorrect. Look at the entries of J(q) derived above &mdash; they contain q1 and q2.'
  )">
  Check answer
</button>

<p id="jac-mcq3-feedback"></p>

---

##### Question 4 (True/False): Constant Jacobian

The Jacobian is the same at every configuration of the leg.

<label style="display: block;">
  <input type="radio" name="jac-tf1" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="jac-tf1" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'jac-tf1',
    'false',
    'Correct! \\(\\mathbf{J}(\\mathbf{q})\\) changes as \\(q_1\\) and \\(q_2\\) change, which is why it must be recomputed at every step of the iterative IK algorithm.',
    'Incorrect. Re-examine the entries of J(q): they explicitly depend on q1 and q2.'
  )">
  Check answer
</button>

<p id="jac-tf1-feedback"></p>

---

##### Question 5 (True/False): Invertibility

$\mathbf{J}^{-1}$ always exists for any configuration $\mathbf{q}$.

<label style="display: block;">
  <input type="radio" name="jac-tf2" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="jac-tf2" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'jac-tf2',
    'false',
    'Correct! Near singular configurations J becomes non-invertible, which is exactly why a damped pseudo-inverse is introduced later in the Iterative Inverse Kinematics subsection.',
    'Incorrect. Consider what happens to J at full leg extension.'
  )">
  Check answer
</button>

<p id="jac-tf2-feedback"></p>

</div>
</details>

#### 7.2 Cartesian PD Control

A Cartesian controller directly controls the position of the foot rather than the individual joint angles.

Let $ \mathbf{p}_d \in \mathbb{R}^2$ be the desired foot position and $ \mathbf{v}_d \in \mathbb{R}^2$ the desired foot velocity.

The position and velocity errors, $\mathbf{e}_p, \mathbf{e}_v \in \mathbb{R}^2$, are:

$$
\mathbf{e}_p = \mathbf{p}_d-\mathbf{p}
$$

$$
\mathbf{e}_v = \mathbf{v}_d-\mathbf{v}
$$

A Cartesian PD controller computes a corrective Cartesian force $\mathbf{F}_{PD} \in \mathbb{R}^2$:

<div class="math-display">
\[
\mathbf{F}_{PD} = \mathbf{K}_{p}(\mathbf{p}_{d}-\mathbf{p}) + \mathbf{K}_{d}(\mathbf{v}_{d}-\mathbf{v})
\]
</div>

where:

- $\mathbf{K}_{p,C} \in \mathbb{R}^{2\times2}$ is the Cartesian proportional gain (typically diagonal);
- $\mathbf{K}_{d,C} \in \mathbb{R}^{2\times2}$ is the Cartesian derivative gain (typically diagonal).

This Cartesian force must then be converted into joint torques:

<div class="math-display">
\[
\boldsymbol{\tau}_{\mathrm{Cartesian}} = \mathbf{J}^{T}(\mathbf{q})\mathbf{F}_{\mathrm{PD}}
\]
</div>

Therefore:

<div class="math-display">
\[
\boldsymbol{\tau}_{Cartesian}
=
\mathbf{J}^{T}(\mathbf{q})
\left[
\mathbf{K}_{p,C}
\left(
\mathbf{p}_d-\mathbf{p}
\right)
+
\mathbf{K}_{d,C}
\left(
\mathbf{v}_d-\mathbf{v}
\right)
\right]
\]
</div>

The controller follows three steps:

1. Measure the current joint configuration $\mathbf{q}$.
2. Use forward kinematics and the Jacobian to compute $\mathbf{p}$ and $\mathbf{v}$.
3. Convert the Cartesian correction into joint torques using $\mathbf{J}^{T}$.

<!-- IMAGE SLOT:
Insert the Cartesian PD control loop:

Desired foot position
        ↓
Cartesian position and velocity errors
        ↓
Desired Cartesian force
        ↓ J(q)^T
Joint torques
        ↓
Two-link leg
-->

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 5 : Cartesian PD Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Role of $\mathbf{K}_{p,C}$ versus $\mathbf{K}_{d,C}$

What is the role of $\mathbf{K}_{p,C}$ versus $\mathbf{K}_{d,C}$?

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="a">
  $\mathbf{K}_{p,C}$ acts on the position error; $\mathbf{K}_{d,C}$ acts on the velocity error
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="b">
  $\mathbf{K}_{p,C}$ acts on the velocity error; $\mathbf{K}_{d,C}$ acts on the position error
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="c">
  Both gains act only on the velocity error
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq1" value="d">
  Both gains are always identical matrices
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'cpd-mcq1',
    'a',
    'Correct! Kp,C multiplies the position error (pd - p), and Kd,C multiplies the velocity error (vd - v).',
    'Incorrect. Look again at the definition of F_PD.'
  )">
  Check answer
</button>

<p id="cpd-mcq1-feedback"></p>

---

##### Question 2: Why $\mathbf{J}^T$ is needed

Why is $\mathbf{J}^T(\mathbf{q})$ needed in the Cartesian PD controller?

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="a">
  To convert the corrective Cartesian force into joint torques
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="b">
  To convert joint angles into a Cartesian position
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="c">
  To compute the inertia matrix
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq2" value="d">
  To linearize the leg dynamics
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'cpd-mcq2',
    'a',
    'Correct! J^T maps the Cartesian force F_PD computed in task space into the joint torques that actually drive the leg.',
    'Incorrect. F_PD is a Cartesian force &mdash; the leg needs joint torques.'
  )">
  Check answer
</button>

<p id="cpd-mcq2-feedback"></p>

---

##### Question 3: Effect of removing damping

What happens if $\mathbf{K}_{d,C}=0$?

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="a">
  The system becomes critically damped
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="b">
  There is no velocity feedback, so the foot may oscillate or overshoot
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="c">
  The controller becomes a pure feedforward controller with no feedback at all
</label>

<label style="display: block;">
  <input type="radio" name="cpd-mcq3" value="d">
  Nothing changes, since $\mathbf{K}_{d,C}$ only affects gravity compensation
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'cpd-mcq3',
    'b',
    'Correct! Without the damping term, only the position error is corrected, which typically leads to oscillation or overshoot.',
    'Incorrect. Removing Kd,C removes the velocity-error feedback term, not the position feedback.'
  )">
  Check answer
</button>

<p id="cpd-mcq3-feedback"></p>

---

##### Question 4 (Select all that apply): Increasing $\mathbf{K}_{p,C}$

Increasing $\mathbf{K}_{p,C}$ tends to:

<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="a"> Produce faster convergence toward $\mathbf{p}_d$</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="b"> Reduce the required joint torque</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="c"> Increase the risk of overshoot</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi1" value="d"> Have no effect on the closed-loop behaviour</label>

<br>

<button
  type="button"
  onclick="checkMultipleAnswers(
    'cpd-multi1',
    ['a','c'],
    'Correct! A higher proportional gain speeds up convergence but, without enough damping, also raises the risk of overshoot.',
    'Not quite. A higher Kp,C pulls the foot toward pd faster, at the cost of higher torque demand and possible overshoot.'
  )">
  Check answer
</button>

<p id="cpd-multi1-feedback"></p>

---

##### Question 5 (Select all that apply): Increasing $\mathbf{K}_{d,C}$

Increasing $\mathbf{K}_{d,C}$ tends to:

<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="a"> Reduce overshoot and oscillation</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="b"> Eliminate steady-state position error on its own</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="c"> Increase sensitivity to noise in the velocity estimate</label>
<label style="display: block;"><input type="checkbox" name="cpd-multi2" value="d"> Guarantee stability regardless of $\mathbf{K}_{p,C}$</label>

<br>

<button
  type="button"
  onclick="checkMultipleAnswers(
    'cpd-multi2',
    ['a','c'],
    'Correct! Damping reduces oscillation but amplifies any noise present in the velocity signal; it does not by itself remove steady-state error or guarantee stability.',
    'Not quite. Kd,C damps velocity error, which reduces oscillation but also amplifies velocity-measurement noise.'
  )">
  Check answer
</button>

<p id="cpd-multi2-feedback"></p>

</div>
</details>

---

#### 7.3 Force Control

The Jacobian transpose also maps a desired foot force $\mathbf{F} \in \mathbb{R}^2$ into the corresponding joint torques:

$$
\boldsymbol{\tau}
=
\mathbf{J}^{T}(\mathbf{q})\mathbf{F}
$$

This relationship follows from the **principle of virtual work**.

For a small virtual joint displacement $\delta\mathbf{q} \in \mathbb{R}^2$:

$$
\delta\mathbf{q}
$$

the corresponding virtual foot displacement $\delta\mathbf{p} \in \mathbb{R}^2$ is:

$$
\delta\mathbf{p}
=
\mathbf{J}(\mathbf{q})\delta\mathbf{q}
$$

The virtual work produced by the Cartesian force is:

$$
\delta W_F
=
\mathbf{F}^{T}\delta\mathbf{p}
$$

Substituting the displacement relationship gives:

$$
\delta W_F
=
\mathbf{F}^{T}
\mathbf{J}(\mathbf{q})
\delta\mathbf{q}
$$

The virtual work produced by the joint torques is:

$$
\delta W_{\tau}
=
\boldsymbol{\tau}^{T}\delta\mathbf{q}
$$

Because both expressions represent the same work:

$$
\boldsymbol{\tau}^{T}\delta\mathbf{q}
=
\mathbf{F}^{T}
\mathbf{J}(\mathbf{q})
\delta\mathbf{q}
$$

Therefore:

$$
\boldsymbol{\tau}
=
\mathbf{J}^{T}(\mathbf{q})\mathbf{F}
$$

This allows the controller to command a desired ground-contact force without explicitly calculating desired joint angles.

An additional force can also be combined with joint-space and Cartesian controllers:

<div class="math-display">
\[
\boldsymbol{\tau}_{final}
=
\boldsymbol{\tau}_{joint}
+
\boldsymbol{\tau}_{Cartesian}
+
\mathbf{J}^{T}(\mathbf{q})\mathbf{F}_{extra}

\]
</div>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 6 : Force Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Principle behind $\boldsymbol{\tau}=\mathbf{J}^{T}\mathbf{F}$

Which principle is used to derive $\boldsymbol{\tau}=\mathbf{J}^{T}(\mathbf{q})\mathbf{F}$?

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="a">
  Newton's second law
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="b">
  The principle of virtual work
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="c">
  Conservation of energy
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq1" value="d">
  Lagrange multipliers on the ground-contact constraint
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'force-mcq1',
    'b',
    'Correct! Equating the virtual work done by F and by tau gives tau = J^T(q)F.',
    'Incorrect. Reread the derivation starting from a virtual joint displacement delta-q.'
  )">
  Check answer
</button>

<p id="force-mcq1-feedback"></p>

---

##### Question 2: Why no inverse kinematics is needed

Why does force control not require solving inverse kinematics first?

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="a">
  Because gravity is neglected
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="b">
  Because it maps a desired Cartesian force directly into joint torques, without needing $\mathbf{q}_d=f^{-1}(\mathbf{p}_d)$
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="c">
  Because friction is neglected
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq2" value="d">
  Because the Jacobian is always the identity matrix
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'force-mcq2',
    'b',
    'Correct! Force control skips the desired-joint-angle step entirely and goes straight from a desired force to torques.',
    'Incorrect. Compare this control sequence with the p_d -> q_d -> tau_joint sequence used for inverse kinematics.'
  )">
  Check answer
</button>

<p id="force-mcq2-feedback"></p>

---

##### Question 3: Composition of $\boldsymbol{\tau}_{final}$

What does $\boldsymbol{\tau}_{final}$ combine?

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="a">
  Only gravity compensation
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="b">
  $\boldsymbol{\tau}_{joint} + \boldsymbol{\tau}_{Cartesian} + \mathbf{J}^{T}(\mathbf{q})\mathbf{F}_{extra}$
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="c">
  Only the output of inverse kinematics
</label>

<label style="display: block;">
  <input type="radio" name="force-mcq3" value="d">
  Only the Cartesian force term
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'force-mcq3',
    'b',
    'Correct! The three contributions -- joint-space, Cartesian, and an extra force term -- can be summed into a single commanded torque.',
    'Incorrect. Look again at the boxed equation for tau_final just above.'
  )">
  Check answer
</button>

<p id="force-mcq3-feedback"></p>

---

##### Question 4 (True/False): Exact positioning

Force control directly guarantees an exact foot position.

<label style="display: block;">
  <input type="radio" name="force-tf1" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="force-tf1" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'force-tf1',
    'false',
    'Correct! Force control commands a contact force, not a position &mdash; this is exactly the limitation listed in the comparison table below.',
    'Incorrect. Recall the comparison table&#39;s stated limitation for force control.'
  )">
  Check answer
</button>

<p id="force-tf1-feedback"></p>

---

##### Question 5 (True/False): Direction of the mapping

$\mathbf{J}^T$ maps a Cartesian force to joint torques, not the reverse.

<label style="display: block;">
  <input type="radio" name="force-tf2" value="true">
  True
</label>

<label style="display: block;">
  <input type="radio" name="force-tf2" value="false">
  False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse2(
    'force-tf2',
    'true',
    'Correct! \\(\\boldsymbol{\\tau}=\\mathbf{J}^{T}(\\mathbf{q})\\mathbf{F}\\) takes a Cartesian force F as input and produces joint torques tau as output.',
    'Incorrect. Look at which quantity is on the left-hand side of tau = J^T(q)F.'
  )">
  Check answer
</button>

<p id="force-tf2-feedback"></p>

</div>
</details>

---

#### 7.4 Inverse Kinematics versus Force Control

There are two main ways to command the foot toward a desired position.

##### Inverse Kinematics with Joint PD Control

Inverse kinematics first computes the desired joint configuration:

$$
\mathbf{q}_d
=
f^{-1}(\mathbf{p}_d)
$$

A joint-space PD controller, with gains $\mathbf{K}_{p,j}, \mathbf{K}_{d,j} \in \mathbb{R}^{2\times2}$ (typically diagonal), then tracks this configuration $\mathbf{q}_d \in \mathbb{R}^2$:

<div class="math-display">
\[
\boldsymbol{\tau}_{joint}
=
\mathbf{K}_{p,j}
\left(
\mathbf{q}_d-\mathbf{q}
\right)
+
\mathbf{K}_{d,j}
\left(
\dot{\mathbf{q}}_d-\dot{\mathbf{q}}
\right)

\]
</div>

The control sequence is:

<div class="math-display">
\[
\mathbf{p}_d
\longrightarrow
\mathbf{q}_d
\longrightarrow
\boldsymbol{\tau}_{joint}
\]
</div>


Inverse kinematics can be computed analytically or numerically.

##### Analytical Inverse Kinematics

For a two-link mechanism, the solution can be derived geometrically using the cosine rule.

Using the coordinate convention $(x,z)$ and relative joint angles $\theta_1, \theta_2 \in \mathbb{R}$:
<div style="display: flex; justify-content: center; gap: 20px; align-items: center;">

<img 
  src="{{ '/assets/images/locomotion/Image_slot7.png' | relative_url }}"
  alt="Quadruped leg"
  style="width: 40%; height: auto;">

<img 
  src="{{ '/assets/images/locomotion/Image_slot8.png' | relative_url }}"
  alt="Quadruped leg"
  style="width: 40%; height: auto;">
</div>
$$
\theta_2
=
\pm
\cos^{-1}
\left(
\frac{x^2+z^2-l_1^2-l_2^2}
{2l_1l_2}
\right)
$$

Then:

$$
\theta_1
=
\operatorname{atan2}(z,x)
\mp
\operatorname{atan2}
\left(
l_2\sin(\theta_2),
l_1+l_2\cos(\theta_2)
\right)
$$

The two signs represent two possible configurations, often described as two different knee or elbow orientations.

> **Reference-frame note:** these equations use the angle and axis convention shown in the inverse-kinematics derivation. Signs must be adapted when using a different simulation reference frame.

Analytical inverse kinematics is fast and exact, but the equations are specific to the robot geometry and become difficult for complex mechanisms.

<!-- IMAGE SLOT:
Insert two different leg configurations reaching the same foot position.
-->

##### Iterative Inverse Kinematics

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot9.png' | relative_url }}"
    alt="Iterative inverse-kinematics algorithm using the Jacobian pseudoinverse to update joint angles until the desired foot position is reached">

  <figcaption style="max-width: 950px; margin: 0.5rem auto;">
    <strong>Figure 7 : Iterative inverse kinematics using the Jacobian pseudoinverse.</strong>
  </figcaption>

</figure>


For more complex robots, inverse kinematics can be solved numerically. We will go through the algorithm presented in Figure 7 in more details below :

Starting from an initial configuration $\mathbf{q}_0 \in \mathbb{R}^2$, compute the Cartesian error $\Delta\mathbf{p} \in \mathbb{R}^2$:

$$
\Delta\mathbf{p}
=
\mathbf{p}_d-\mathbf{p}
$$

The joint configuration is updated using the Jacobian pseudo-inverse:

$$
\mathbf{q}_{k+1}
=
\mathbf{q}_k
+
\alpha
\mathbf{J}^{+}(\mathbf{q}_k)
\Delta\mathbf{p}
$$

where:

- $\mathbf{J}^{+} \in \mathbb{R}^{2\times2}$ is the Moore–Penrose pseudo-inverse;
- $\alpha \in \mathbb{R}_{>0}$ is the (scalar) update step size, not to be confused with the geometric angle $\alpha$ shown in the analytical-IK figure above.

The procedure is repeated until:

$$
\left\|
\mathbf{p}_d-\mathbf{p}
\right\|
<
\varepsilon
$$

where $\varepsilon \in \mathbb{R}_{>0}$ is a small scalar tolerance.

Near singular configurations, a damped pseudo-inverse can improve numerical stability:

$$
\mathbf{J}^{+}_{\lambda}
=
\mathbf{J}^{T}
\left(
\mathbf{J}\mathbf{J}^{T}
+
\lambda^2\mathbf{I}
\right)^{-1}
$$

A larger scalar damping factor $\lambda \in \mathbb{R}_{\geq0}$ improves stability but makes the result less similar to the exact pseudo-inverse.

<!-- IMAGE SLOT:
Insert the iterative inverse-kinematics loop:

Initial joint configuration
        ↓
Forward kinematics
        ↓
Foot-position error
        ↓
Jacobian pseudo-inverse
        ↓
Updated joint configuration
        ↺
-->

##### Comparison

| Method | Main operation | Main advantage | Main limitation |
|---|---|---|---|
| Inverse kinematics with joint PD | Convert desired foot position into desired joint angles | Direct joint reference and accurate geometric positioning | Requires an inverse solution and selection between possible configurations |
| Cartesian PD control | Convert Cartesian position and velocity errors into a corrective force | Controls the foot directly in task space | Performance depends on Cartesian gains and the Jacobian |
| Force control | Convert a desired foot force directly into joint torques | Well suited to ground contact and physical interaction | Does not directly impose an exact foot position |

Inverse kinematics answers:

> **Which joint angles place the foot at the desired position?**

Cartesian and force control answer:

> **Which joint torques produce the desired Cartesian behaviour or contact force?**

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 7 : Comparing Inverse Kinematics, Cartesian PD, and Force Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Which method needs an explicit inverse solution?

Which method requires an explicit inverse solution and a choice between possible joint configurations?

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="a">
  Inverse kinematics with joint PD
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="b">
  Cartesian PD control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="c">
  Force control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq1" value="d">
  None of these methods requires an inverse solution
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'comp-mcq1',
    'a',
    'Correct! Inverse kinematics must solve q_d = f^-1(p_d), which for a two-link leg has (up to) two valid solutions.',
    'Incorrect. Check the &quot;Main limitation&quot; column of the comparison table.'
  )">
  Check answer
</button>

<p id="comp-mcq1-feedback"></p>

---

##### Question 2: Which method suits ground contact?

Which method is best suited to ground contact and physical interaction?

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="a">
  Inverse kinematics with joint PD
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="b">
  Cartesian PD control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="c">
  Force control
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq2" value="d">
  All three methods are equally suited to ground contact
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'comp-mcq2',
    'c',
    'Correct! Force control commands the contact force directly, which is exactly what is needed when interacting physically with the ground.',
    'Incorrect. Check the &quot;Main advantage&quot; column of the comparison table.'
  )">
  Check answer
</button>

<p id="comp-mcq2-feedback"></p>

---

##### Question 3: Main limitation of Cartesian PD

What is the main limitation of Cartesian PD control, according to the comparison table?

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="a">
  It cannot be used near the ground
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="b">
  Its performance depends on the Cartesian gains and the Jacobian
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="c">
  It requires choosing between multiple knee configurations
</label>

<label style="display: block;">
  <input type="radio" name="comp-mcq3" value="d">
  It cannot control the position of the foot at all
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'comp-mcq3',
    'b',
    'Correct! Because the Cartesian force is converted through J^T(q), the quality of tracking depends on both the chosen gains and the current Jacobian.',
    'Incorrect. Check the &quot;Main limitation&quot; column for Cartesian PD control.'
  )">
  Check answer
</button>

<p id="comp-mcq3-feedback"></p>

---

##### Question 4 (Match the method): Explicit inverse solution

Complete the sentence by selecting the correct method:

<p>
The method that requires selecting between two possible knee configurations from an inverse solution is
<select class="answer" data-answer="inverse kinematics with joint pd">
  <option value="">-- choose --</option>
  <option value="inverse kinematics with joint pd">Inverse kinematics with joint PD</option>
  <option value="cartesian pd control">Cartesian PD control</option>
  <option value="force control">Force control</option>
</select>.
</p>

---

##### Question 5 (Match the method): Contact force

Complete the sentence by selecting the correct method:

<p>
The method that is most naturally suited to controlling ground-contact force, without computing a desired joint angle, is
<select class="answer" data-answer="force control">
  <option value="">-- choose --</option>
  <option value="inverse kinematics with joint pd">Inverse kinematics with joint PD</option>
  <option value="cartesian pd control">Cartesian PD control</option>
  <option value="force control">Force control</option>
</select>.
</p>

<br>

<button type="button" onclick="checkDropdownAnswers('comp-dropdown-feedback')">Check answers</button>

<p id="comp-dropdown-feedback"></p>

</div>
</details>

#### 7.5 Single leg hopping

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot13.png' | relative_url }}"
    alt="Simulated planar two-link leg interacting with the ground"
    style="width: 45%; max-width: 600px; height: auto;">

  <figcaption style="max-width: 800px; margin: 0.5rem auto;">
    <strong>Figure 8 : Simulated planar two-link leg.</strong>
    
  </figcaption>

</figure>

The two-link leg model is simulated in contact with the ground, providing a simple environment for studying leg motion, foot placement, and the transition from kinematic modeling to locomotion control.

Single-leg hopping combines the control methods introduced previously. The leg must maintain a suitable configuration while generating a Cartesian force at the foot to push against the ground.

A hopping controller may combine:

- joint PD control to regulate the leg configuration;
- Cartesian PD control to regulate the foot position;
- an additional foot-force command to generate the jump.

The total commanded torque is:
<div class="math-display">
\[
\boldsymbol{\tau}_{\mathrm{final}} = \boldsymbol{\tau}_{\mathrm{joint}} + \boldsymbol{\tau}_{\mathrm{Cartesian}} + \mathbf{J}^{T}(\mathbf{q})\mathbf{F}
\]
</div>

where the desired foot force $\mathbf{F} \in \mathbb{R}^2$ is:

$$
\mathbf{F} = \begin{bmatrix} F_x \\ F_z \end{bmatrix}
$$

For a vertical jump, the main command is the vertical force $F_z$. A single force pulse produces one jump, while a periodic force profile can produce continuous hopping.

<p style="text-align: center;">
 <img 
   src="{{ '/assets/images/locomotion/Image_slot14.png' | relative_url }}"
   alt="Quadruped leg">
</p>

The hopping behaviour depends on several controller parameters:

- peak vertical force;
- hopping frequency;
- initial or nominal leg position;
- joint-space gains;
- Cartesian-space gains;
- gains used during contact and flight.

These parameters determine the jump height, repetition rate, leg posture, and stability of the motion.

They may also be optimized by defining a parameter vector $\mathbf{x} \in \mathbb{R}^n$, where $n$ is the number of parameters being tuned, such as:

$$
\mathbf{x} = \begin{bmatrix} f & F_{z,\mathrm{peak}} & \cdots \end{bmatrix}^{T}
$$

and selecting an objective, for example maximizing the jump height while respecting suitable parameter bounds.

At the end of this section, you will implement and tune a single-leg hopping controller as an exercise.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 8 : Single-Leg Hopping</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Main driver of jump height

Which parameter has the most direct effect on jump height?

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="a">
  The peak vertical force $F_{z,\mathrm{peak}}$
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="b">
  The horizontal force $F_x$
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="c">
  The link length $l_1$ only
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq1" value="d">
  The knee mass $m_1$ only
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'hop-mcq1',
    'a',
    'Correct! The vertical impulse delivered during push-off, driven mainly by F_z,peak, sets the takeoff velocity and therefore the jump height.',
    'Incorrect. Jumping is primarily a vertical motion &mdash; think about which force component accelerates the body upward.'
  )">
  Check answer
</button>

<p id="hop-mcq1-feedback"></p>

---

##### Question 2: Single pulse versus periodic force

What is the difference between a single force pulse and a periodic force profile?

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="a">
  A single pulse produces one jump; a periodic profile can produce continuous hopping
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="b">
  A single pulse produces continuous hopping; a periodic profile produces one jump
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="c">
  Both always produce the same motion
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq2" value="d">
  Neither can produce a jump on its own
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'hop-mcq2',
    'a',
    'Correct! As stated in the text, a single force pulse produces one jump, while a periodic force profile produces continuous hopping.',
    'Incorrect. Reread the paragraph just above Figure 8&#39;s companion image on hopping force profiles.'
  )">
  Check answer
</button>

<p id="hop-mcq2-feedback"></p>

---

##### Question 3: Gains during flight versus contact

Why might a hopping controller use different gains during contact and during flight?

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="a">
  Because gains have no effect once the leg leaves the ground
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="b">
  Because the leg's interaction with the environment (and the control objective) changes between the contact and flight phases
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="c">
  Because $\mathbf{J}(\mathbf{q})$ is undefined during flight
</label>

<label style="display: block;">
  <input type="radio" name="hop-mcq3" value="d">
  Because gravity disappears during flight
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'hop-mcq3',
    'b',
    'Correct! During contact the controller regulates ground force; during flight it typically repositions the leg for the next landing, so different gains are often appropriate.',
    'Incorrect. Consider what the leg is physically doing, and what the controller should prioritize, in each phase.'
  )">
  Check answer
</button>

<p id="hop-mcq3-feedback"></p>

---

##### Question 4 & 5 (Numeric): Estimating takeoff velocity and jump height

Consider a hopping leg with total mass $m = 5\text{ kg}$. During the push-off (contact) phase, lasting $t_c = 0.2\text{ s}$, the controller applies a net average vertical force (i.e. the force above what is needed to support the leg's weight) of $F_{net} = 30\text{ N}$.

Using the impulse–momentum relation $v = \dfrac{F_{net}}{m}\,t_c$ and $v^2 = 2gh$ with $g = 9.81\text{ m/s}^2$:

<p>
Takeoff velocity $v$ (m/s):
<input type="text" id="hop-v" size="8">
</p>

<p>
Jump height $h$ (m):
<input type="text" id="hop-h" size="8">
</p>

<br>

<button type="button" onclick="checkHoppingExercise()">Check answers</button>

<p id="hop-numeric-feedback"></p>

<script>
function checkHoppingExercise() {
  const m = 5, tc = 0.2, Fnet = 30, g = 9.81;
  const vTrue = (Fnet / m) * tc;
  const hTrue = (vTrue * vTrue) / (2 * g);

  const uV = parseFloat(document.getElementById('hop-v').value);
  const uH = parseFloat(document.getElementById('hop-h').value);

  const okV = approxEqual(uV, vTrue, 0.1, 0.05);
  const okH = approxEqual(uH, hTrue, 0.01, 0.1);

  let results = [];
  results.push(okV ? "✅ Takeoff velocity correct (≈ " + vTrue.toFixed(2) + " m/s)" : "❌ Takeoff velocity off (expected ≈ " + vTrue.toFixed(2) + " m/s)");
  results.push(okH ? "✅ Jump height correct (≈ " + hTrue.toFixed(3) + " m)" : "❌ Jump height off (expected ≈ " + hTrue.toFixed(3) + " m)");

  const feedback = document.getElementById('hop-numeric-feedback');
  feedback.innerHTML = results.join("<br>");
  feedback.style.color = (okV && okH) ? "green" : "orange";
}
</script>

<details class="exercise-hint">
  <summary><strong>Hint</strong></summary>

  <div markdown="1">

First find the takeoff velocity from the impulse delivered during contact:

$$
v = \frac{F_{net}}{m}\,t_c.
$$

Then use projectile motion (the leg decelerates under gravity alone once airborne) to find the height:

$$
h = \frac{v^2}{2g}.
$$

  </div>
</details>

</div>
</details>

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Programming Exercise 2 : Single-Leg Hopping Control</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

This practical consolidates the concepts introduced in this section:

- the Jacobian (defined and self-verified directly in the exercise files);
- Cartesian PD control;
- force control and $\mathbf{J}^T(\mathbf{q})$;
- single-leg hopping in a live PyBullet simulation.

##### Download the exercise files

Download the complete exercise package, extract the ZIP file, and keep all files in the extracted folder.

<a
  href="{{ '/assets/downloads/locomotion/Exercise2.zip' | relative_url }}"
  download
  style="
    display: inline-block;
    padding: 10px 16px;
    background-color: #0075db;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  ">
  Download Practical 2
</a>

##### What's in the package

Add these files alongside your existing `env/` folder:

```text
Exercise_2/
├── locomotion_practical2.py    # main exercise, fill in the TODOs
├── check_hopping.py            # grading helper, run automatically at the end
├── requirements_Ex2.txt        # Python dependencies
└── README.md                   # environment setup & step-by-step instructions
```

`locomotion_practical2.py` is the exercise: design a force profile, add Cartesian PD control, and map both to joint torques so the leg hops, either once or continuously.

**Full environment setup and instructions are in `README.md`** inside the downloaded package.

</div>
</details>

##  Module 2 : Gaits

We now leave the single leg of Module 1 and look at the **whole animal or robot**: how its legs coordinate in time. This module introduces **gaits**, what they are, how to describe them quantitatively, and how they are classified.

Before defining anything formally, it helps to simply watch the different gaits in action. The video below shows a dog walking, ambling, pacing and galloping, making the differences in footfall pattern easy to see at normal and slow-motion speed:

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/WrR3fVQ3W3s"
    title="Demonstration of walk, trot, and gallop gaits"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

Keep an eye on how many feet touch the ground at once, and how that changes between the slow walk and the faster gaits, this is exactly the footfall pattern the rest of this module will describe quantitatively.

### 1. What is a gait?

A **gait** is a cyclic pattern of leg coordination used by a legged animal or robot to move. It is defined mainly by the sequence and timing of **footfalls**: which foot touches the ground, and when, relative to the others.

Different animals have different gait repertoires. Cats, dogs, and horses walk, trot, and gallop; elephants and giraffes mostly walk, pace, and gallop; humans walk or run, with variants such as power-walking, jogging, or skipping. The same body can therefore produce very different-looking motions purely by changing how the legs are phased with respect to one another, without changing the mechanical structure at all.

This is a useful mental model to carry into robotics: a legged robot's "gait" is largely a **control choice** (a set of relative phases and contact timings between the legs), not a property of its hardware. The same quadruped robot can trot, pace, bound, or gallop simply by commanding a different coordination pattern.

### 2. Gait terminology: cycles, phases, and duty factor

To describe and compare gaits quantitatively we need a small vocabulary:

- **Stride duration (or period):** the duration of one complete cycle of a limb, i.e. the time between two successive touch-downs of the same foot.
- **Stance phase:** the part of the cycle during which the limb is in contact with the ground and (typically) bearing load.
- **Swing phase:** the part of the cycle during which the limb is off the ground, moving forward to prepare the next touch-down.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot35.gif' | relative_url }}"
    alt="Animation of a single leg cycling through one stride, then replaying the same cycle with the stance phase highlighted, then again with the swing phase highlighted"
    style="width: 55%; max-width: 380px; height: auto; border: 1px solid #e5e7eb; border-radius: 8px;">

  <figcaption style="max-width: 500px; margin: 0.5rem auto; font-size: 0.9rem; color: #4b5563;">
    <strong>Figure 9: One gait cycle, three ways to look at it.</strong> The same leg cycle repeats three times: first as a full stride (touch-down to touch-down), then with the stance phase highlighted in green, then with the swing phase highlighted in orange. The dots below the leg track which of the three the animation is currently illustrating.
  </figcaption>

</figure>

- **Duty factor:** the fraction of the stride duration that a given limb spends in stance,

$$
\beta = \frac{\text{stance duration}}{\text{stride duration}} \in [0,1].
$$

A duty factor close to $1$ means the foot is almost always on the ground (slow, cautious walking); a duty factor below $0.5$ means the foot spends more time in the air than on the ground (running or bounding), which is why low duty factors are associated with flight phases and more dynamic gaits.

### 3. Static versus dynamic stability

A useful first distinction among gaits is whether they can, in principle, be frozen at any instant without the robot falling:

- **Statically stable gaits:** the vertical projection of the center of mass (CoM) stays, at all times, inside the **support polygon**, the convex hull of the ground-contact points. A hexapod tripod gait or a slow quadruped crawl are typically statically stable: you could stop the robot mid-stride and it would not tip over.
- **Dynamically stable gaits:** the CoM projection is only inside the support polygon *on average* over the cycle; at some instants it may lie outside it (or the support polygon may even be a single point or a line, as during a running flight phase). Trotting quadrupeds and running/hopping robots are dynamically stable, stability is a property of the whole trajectory, not of any single frozen instant.

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin: 1.5rem auto;">

  <figure style="margin: 0; text-align: center; max-width: 300px;">
    <img
      src="{{ '/assets/images/locomotion/Image_slot38.png' | relative_url }}"
      alt="Tripod gait of a hexapod: three legs on the ground form a support triangle that contains the center of mass"
      style="width: 100%; height: auto;">
    <figcaption style="font-size: 0.85rem; color: #4b5563; margin-top: 0.3rem;">
      <strong>Figure 10a: Statically stable.</strong> Filled circles are legs on the ground; open circles are legs in the air. The three grounded legs of this hexapod's tripod gait form a support triangle that contains the CoM projection (orange).
    </figcaption>
  </figure>

  <figure style="margin: 0; text-align: center; max-width: 300px;">
    <img
      src="{{ '/assets/images/locomotion/Image_slot39.png' | relative_url }}"
      alt="Trot gait of a quadruped: only two diagonal legs are on the ground, forming a line that does not contain the center of mass"
      style="width: 100%; height: auto;">
    <figcaption style="font-size: 0.85rem; color: #4b5563; margin-top: 0.3rem;">
      <strong>Figure 10b: Dynamically stable.</strong> In a quadruped trot, only two diagonal legs touch the ground at once. Their "support polygon" degenerates to a line segment, which does not contain the CoM projection at this instant.
    </figcaption>
  </figure>

</div>

Static stability is easy to reason about and to guarantee, but it is inherently slow and energy-inefficient (the CoM must stay in a small polygon at all times, which restricts stride length and speed). Most fast, agile locomotion, animal or robotic, is dynamically, not statically, stable. This is precisely why Section 10 introduces dynamic stability criteria such as the Zero Moment Point and the capture point: static-stability reasoning alone cannot describe or guarantee stable trotting, running, or hopping.

### 4. The Hildebrand classification of gaits

The first systematic classification of quadruped gaits was proposed by Hildebrand (1965). It separates gaits into two families:

- **Symmetric gaits:** the footfalls of a fore–hind pair are evenly spaced in time (e.g. walk, trot, pace).
- **Asymmetric gaits:** they are not evenly spaced (e.g. gallop, bound).

For **symmetric** gaits specifically, Hildebrand showed that just **two numbers** are enough to classify essentially any possible gait:

1. **Duty factor** $\beta$ of a reference limb. By convention: $\beta > 0.5$ is called a **walking** gait, $\beta < 0.5$ a **running** gait. This is only a kinematic label, not a statement about speed or energetics, one can have a *walking trot* (duty factor above 0.5, as in a slow salamander trot) or a *running trot* (duty factor below 0.5, as in a fast horse trot).
2. **Relative phase**, i.e. the percentage of the stride interval by which the fore-foot footfall lags the hind-foot footfall on the same side of the body.

Plotting these two numbers against each other produces the classic Hildebrand diagram, in which named gaits (walking pace, walking trot, lateral-sequence walk, diagonal-sequence walk, running pace, running trot, …) occupy characteristic regions.

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot15.png' | relative_url }}"
    alt="Hildebrand footfall diagrams for trot, pace, lateral-sequence walk, and gallop, with the LH/LF/RF/RH leg labeling convention">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 11: Hildebrand footfall diagrams.</strong> Grey blocks mark stance phases for each of the four legs (LH: left hind, LF: left front, RF: right front, RH: right hind) over one stride. Symmetric gaits (trot, pace, lateral-sequence walk) have the fore/hind footfalls of a side evenly spaced; the gallop, an asymmetric gait, does not.
  </figcaption>

</figure>

**Why this matters beyond classification.** The same two numbers (duty factor, relative phase) are exactly the two parameters a Central Pattern Generator needs to *produce* a gait, this is the bridge to Module 3. A CPG network that lets you set a phase-lag matrix between oscillators and a duty-cycle shape is, in effect, implementing the Hildebrand parameterization in a dynamical system that can also transition smoothly between gaits as parameters are changed online, something a purely kinematic footfall table cannot do gracefully.

### 5. Common quadruped gaits and beyond

<figure style="margin: 1.5rem auto; text-align: center;">

  <img
    src="{{ '/assets/images/locomotion/Image_slot16.png' | relative_url }}"
    alt="Duty-factor circle diagrams for lateral-sequence walk, diagonal-sequence walk, trot, pace, bound, rotary gallop, and transverse gallop">

  <figcaption style="max-width: 750px; margin: 0.5rem auto;">
    <strong>Figure 12: Symmetric and asymmetric quadruped gaits.</strong> Numbers give the fraction of the cycle at which each leg touches down, relative to the LH leg at $t=0$. Symmetric gaits sit above the dashed line; asymmetric gaits (bound, rotary gallop, transverse gallop) below it.
  </figcaption>

</figure>

A few gaits are worth naming explicitly, since they recur throughout legged-robotics papers:

- **Trot:** diagonal legs (e.g. LF+RH) move together, the other diagonal pair moves in the opposite half-cycle. The most commonly used quadruped robot gait because it is dynamically self-stabilizing and mechanically simple to coordinate (see Module 3).
- **Pace:** legs on the same side move together (LF+LH, then RF+RH). Prone to inducing more roll/lateral swaying than trot.
- **Bound:** front legs move together, hind legs move together, front and hind out of phase, used by e.g. rabbits and some quadruped robots for high-speed locomotion.
- **Gallop (rotary/transverse):** an asymmetric gait with all four legs having distinct, unevenly-spaced phases; the fastest gait for most quadrupeds, and mechanically the most demanding to control and to actuate.

Beyond mammals, **insect gaits** follow a related, but distinct, logic based on the number of legs that swing simultaneously rather than fore/hind coupling: a **metachronal wave** gait (only one leg in swing at a time, used at very low speeds), a **tetrapod gait** (up to two legs in swing simultaneously), and a **tripod gait** (three legs in swing simultaneously, the classic fast-insect gait, where the front-left, middle-right, and back-left legs swing together while the other triangle provides support). The tripod gait is directly relevant to hexapod robot design, since it is statically stable at every instant (three ground contacts always form a support triangle) while still allowing relatively fast locomotion.

<details class="exercise-accordion" markdown="1">

<summary>
  <span>Quiz 1 : Gaits and duty factor</span>
</summary>

<div class="exercise-accordion-content" markdown="1">

##### Question 1: Duty factor and gait type

A quadruped robot leg is in stance for $0.65$ of the stride and in swing for the remaining $0.35$. According to the Hildebrand convention, is this a walking or a running gait for that limb?

<label style="display: block;">
  <input type="radio" name="mod2-q1" value="a">
  Walking gait, since duty factor $> 0.5$
</label>

<label style="display: block;">
  <input type="radio" name="mod2-q1" value="b">
  Running gait, since duty factor $> 0.5$
</label>

<label style="display: block;">
  <input type="radio" name="mod2-q1" value="c">
  Walking gait, since duty factor $< 0.5$
</label>

<label style="display: block;">
  <input type="radio" name="mod2-q1" value="d">
  Cannot be determined from the duty factor alone
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod2-q1',
    'a',
    'Correct! Duty factor 0.65 &gt; 0.5, so by the Hildebrand convention this limb is walking (note this only characterizes the limb, not necessarily the whole-body gait name).',
    'Incorrect. Remember: duty factor &gt; 0.5 means the foot spends more than half the cycle on the ground, which is the definition of a walking limb.'
  )">
  Check answer
</button>

<p id="mod2-q1-feedback"></p>

---

##### Question 2 (True/False): Statically vs. dynamically stable

A trotting quadruped robot, where diagonal leg pairs alternate and only two feet are ever on the ground at once, is statically stable at every instant.

<label style="display: block;">
  <input type="radio" name="mod2-q2" value="true"> True
</label>
<label style="display: block;">
  <input type="radio" name="mod2-q2" value="false"> False
</label>

<br>

<button
  type="button"
  onclick="checkTrueFalse(
    'mod2-q2',
    'false',
    'Correct! With only two diagonal feet on the ground, the support polygon degenerates to a line segment; the CoM projection generally cannot be kept exactly on that segment at all times. Trotting is dynamically, not statically, stable.',
    'Incorrect. With only two feet on the ground, the support polygon is a line segment, not a polygon that can contain the CoM projection at every instant, this is a dynamically stable gait.'
  )">
  Check answer
</button>

<p id="mod2-q2-feedback"></p>

---

##### Question 3: Symmetric vs. asymmetric

Which of the following gaits is **asymmetric** in the Hildebrand sense?

<label style="display: block;">
  <input type="radio" name="mod2-q3" value="a">
  Trot
</label>

<label style="display: block;">
  <input type="radio" name="mod2-q3" value="b">
  Pace
</label>

<label style="display: block;">
  <input type="radio" name="mod2-q3" value="c">
  Gallop
</label>

<label style="display: block;">
  <input type="radio" name="mod2-q3" value="d">
  Lateral-sequence walk
</label>

<br>

<button
  type="button"
  onclick="checkMCQ(
    'mod2-q3',
    'c',
    'Correct! The gallop has unevenly spaced fore/hind footfalls, which is precisely the definition of an asymmetric gait.',
    'Incorrect. Trot, pace, and lateral-sequence walk all have evenly spaced fore/hind footfalls (symmetric gaits); only the gallop does not.'
  )">
  Check answer
</button>

<p id="mod2-q3-feedback"></p>

</div>
</details>

### 6. To conclude

Everything in this module so far has been about describing and classifying gaits from the outside. The video below shows a real quadruped robot, the Stoch, executing several of the named gaits covered in Section 5, walk, trot, bound, and gallop, along with turning and live transitions between them:

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/Wxx9pwwTIL4"
    title="Stoch quadruped robot demonstrating walk, trot, bound, and gallop gaits"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

*Source: Singla, Bhattacharya, Dholakiya et al., "Realizing Learned Quadruped Locomotion Behaviors through Kinematic Motion Primitives," ICRA 2019, IISc Bengaluru ([youtu.be/Wxx9pwwTIL4](https://youtu.be/Wxx9pwwTIL4)).*

A single gait transition, in this case trot to gallop, is also worth watching in isolation. The clip below shows the MIT Cheetah accelerating to 22 km/h and shifting seamlessly from a trot into a gallop mid-run (in slow motion from about 1:20):

<div style="text-align: center;">
  <iframe
    width="700"
    height="394"
    src="https://www.youtube.com/embed/g9EOOdAicQU"
    title="MIT Cheetah transitioning from a trot to a gallop"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>

*Source: "MIT Cheetah runs at 22 km/h, gait transition from trot to gallop," MIT Biomimetic Robotics Lab ([youtube.com/watch?v=g9EOOdAicQU](https://www.youtube.com/watch?v=g9EOOdAicQU)).*

Notice how each gait produces a visibly different footfall rhythm and body sway, exactly the duty factor and relative-phase differences formalized in the Hildebrand diagram of Section 4, and how the same robot body can shift from one gait to another without any change to its mechanical structure. Producing and switching between rhythms like these online, from a compact controller rather than a hand-tuned footfall table, is precisely the problem that Central Pattern Generators are built to solve, which is where Module 3 picks up.



## Credits

**Module 0 — History of legged robots.** Figures 0.1 to 0.13 are taken from Lecture 1 ("History of legged robots, Mechanical structure, Actuation") of the **Legged Robots** course at EPFL by **Pr. Auke Ijspeert**, and are themselves reproduced there from the original sources cited alongside each figure: Muybridge (1887); the General Electric Research and Development Center (~1968); McGhee & Frank (1968); McGhee & Waldron (1984); Bartholet (1987) for the Odetics ODEX; Lim & Takanishi (2007) for the Waseda robots; Raibert (1986) for the MIT/CMU hoppers; McGeer (1990) for passive-dynamic walking; Arikawa & Hirose (1996) for the TITAN series; and Kitano et al. (2013) / Rygg's 1893 US patent 491,927. The videos embedded in Module 0 are sourced from YouTube and linked individually beneath each player (GE Walking Truck, OSU Adaptive Suspension Vehicle, Odetics ODEX, Waseda WABOT, MIT Leg Lab, Steve Collins passive walker, Cornell Ranger, TITAN-XIII).

**Module 1 — Foundation of legged locomotion.** Figures 1–8 (the planar two-link leg model, actuation comparison, forward/inverse kinematics, Jacobian, and the simulated hopping leg) are adapted from the **Legged Robots** course at EPFL, supervised by **Pr. Auke Ijspeert**. The iterative inverse-kinematics algorithm (Figure 7) follows the presentation in that course. The opening video (five gaits of the Icelandic horse, Figure 0 of Module 1) is sourced from YouTube (2017). The ANYmal parkour video in the course overview is sourced from ETH Zürich / Rudin et al., "ANYmal Parkour: Learning Agile Navigation for Quadrupedal Robots," *Science Robotics*, 2023.

**Module 2 — Gaits.** The animated GIF (Figure 9) was created for this course. Figures 10a and 10b (tripod-gait and trot-gait stability diagrams) were also created for this course. Figures 11 and 12 (Hildebrand footfall diagrams and common quadruped gaits, including the phase-diagram notation) are adapted from Lecture 2 ("Gaits, Models, Stability Criteria, and Locomotion Metrics") of the **Legged Robots** course by **Pr. Auke Ijspeert**, following the original classification of Hildebrand (1965). The two videos in the conclusion (dog gaits: Stoch quadruped, ICRA 2019, IISc Bengaluru; and the MIT Cheetah trot-to-gallop transition, MIT Biomimetic Robotics Lab) are sourced from YouTube and linked beneath each player.

We thank **Pr. Auke Ijspeert** (EPFL Biorobotics Laboratory) for making the Legged Robots course material available, and **Guillaume Bellegarda** (EPFL) for the single-leg PyBullet environment used in Practicals 1 and 2.




---

[Back to Top](#top)