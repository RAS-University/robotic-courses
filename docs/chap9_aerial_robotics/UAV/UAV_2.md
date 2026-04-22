---
title: "9.2 UAV/Drone Types"
parent: "Introduction to UAVs"
layout: default
nav_order: 2
chapter: 9
section: 2
publish: true
---

<script src="../../questions.js"></script>
<link rel="stylesheet" href="../styles.css">

<style>
  .formula-window{
    border-left: 4px solid #E7250C; 
    background: #f8f9fa; 
    padding: 1em;
  }
</style>

<style>
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 10px;
    min-height: 150px;
    width: 45%;
    background-color: #f9f9f9;
  }

  .drag-item {
    background-color: #e3e3e3;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    margin: 4px;
  }

  .check-button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 10px;
    font-weight: bold;
  }
</style>

<style>
.tab-window {
  border: 2px solid #e8f4fd;
  border-radius: 10px;
  background: #f8f9fa;
  width: 100%;
  max-width: 900px;
  margin: 1.5em auto;
  box-shadow: 0 2px 8px rgba(42,122,226,0.08);
  overflow: hidden;
}

.tab-title {
  background: #e8f4fd; 
  padding: 0.5em; 
  font-size: 1.2em; 
  font-weight: bold; 
  color: #2b7bb9; 
  border-top-left-radius: 5px; 
  border-top-right-radius: 5px;
}

.tab-header {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #e8f4fd;
}

.tab-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.7em 1em;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #2b7bb9;
  transition: background 0.2s;
}
.tab-btn.active {
  background: #e8f4fd;
  color: #2b7bb9;
}

.tab-content {
  display: none;
  padding: 1em;
}
.tab-content.active {
  display: block;
}

.images {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.images img {
  width: 100%;
  max-width: 550px;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* Responsive video container */
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin: 1em 0;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Responsive behavior */
@media (max-width: 700px) {
  .tab-btn {
    flex: 1 1 100%;
    text-align: center;
  }
  .tab-title {
    text-align: center;
  }
}
</style>

<script>
function showTab(idx, windowId) {
  var windowElem = document.getElementById(windowId);
  var btns = windowElem.querySelectorAll('.tab-btn');
  var tabs = windowElem.querySelectorAll('.tab-content');
  btns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
  tabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
}
</script>

#  UAV/Drone Types

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1. Prerequisites
To get the most of this module, it is recommended that you have knowledge in:
1. **Basic Principles of Aerodynamics**
  - See the introduction to aerodynamics in [Advanced Mathematical Foundations](http://128.178.145.16:8080/feature-chap9/docs/chap4_advanced_math/)


## 2. Overview : Drone Types and Use Case
In this chapter we want to give you an overview of different drone types, their flying principle and history. We grouped for that UAVs according to three groups that are representative of distinct flying patterns: *rotorcrafts* or *multirotor drones*, *fixed-wing drones* and *flapping wing drones*. 

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/drone_types.png" alt="Overview of UAV categories" style="width: 100%; height: auto;">
  <p style="font-size: small;">Overview over the three main drone types: <it>multirotor drone</it>, <it>flapping-wing drone</it> and <it>fixed-wing drone</it>. </p>
</div>

**Multirotor drones (rotorcraft)** generate lift using multiple propellers and can hover, take off vertically, and move in any direction with high precision. Their control relies on continuously adjusting the speed of individual rotors to tilt the vehicle and redirect thrust, allowing for stable, responsive motion and the ability to hold position in place.

**Fixed-wing drones**, by contrast, require constant forward motion to produce lift through their wings, much like airplanes. They follow smooth, continuous flight paths and cannot hover; instead, they maneuver using aerodynamic control surfaces such as ailerons, elevators, and rudders, which change the aircraft’s orientation while airflow over the wings sustains lift.

**Flapping wing drones** mimic birds or insects by generating lift and thrust through oscillating wing motions. Their flight is often agile but inherently less stable, and control is achieved by varying flapping frequency, amplitude, or wing asymmetry, making their aerodynamics more complex and less standardized compared to the other two types.

<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Disclaimer:</strong> These categorisations are by no means inclusive of all existing designs. Drone designs is a fast growing area and nowadays we see many more interesting designs that bear no resemblances neither with traditional aircrafts and helicopters, nor with birds. 
</div>

### 2.1 Rotorcrafts

Rotorcrafts are aerial vehicles that generate lift using high speed rotary blades called rotors. They are relatively easy to build, capable of vertical take-off and landing (VTOL), possess high maneuverability (rapid change of velocity vector in multiple directions), but are less energy-efficient for long-range flight than fixed wing vehicle. 

The image below shows a collection of some state-of-the-art commercial rotorcrafts. These include tricopters, quadcopter, hexacopters and octocopters, ranging from underactuated to fully actuated systems. Today, rotorcraft UAVs are used in a wide variety of fields including agriculture, search and rescue, infrastructure inspection, cargo delivery, mapping, entertainment, and more.

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/rotorcrafts_overview_named.png" alt="A selection of different multirotor drones" style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates various multicopters. From top left: DJI Mavic Air 2, Autel Robotics EVO II, DJI Phantom Pro, CyPhy LVL 1 Drone, Freefly Alta 8, Skydio 2, Voliro T, Yuneec H520E, Yuneec Typhoon H Plus. </p>
</div>

#### Control principle
The lift force generation principle of a rotorcraft is similar to that of thrust generation using propellers -  only the force acts vertically, countering gravity. Each rotor generates both lift and torque. To maintain balance, the system includes an equal number of clockwise and counterclockwise spinning rotors to cancel out rotational torque. 

Drone movement is achieved by adjusting the rotational speed of individual rotors. For example increasing all rotors speed equally generates more lift, allowing the drone to ascend. By tilting the drone, the direction of the thrust force becomes misaligned with gravity, allowing the drone to move laterally or to rotate. 

Multirotor systems are primarily distinguished by the number of rotors they use, which directly influences their lift capacity, redundancy, and overall complexity. Different rotor configurations - both in number and arrangement - serve different operational needs and control strategies, see figure below for a few examples. 
<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/rotorcraft_configuration.png" alt="An overview of common drone configuration." style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates four common drone configurations. A classic quadcopter, a hexacopter, octocopter and a co-axial copter. Each shows rotor rotation directions (blue: counterclockwise, green: clockwise) along with a representative commercial model. From left: DJI Mavic Air 2, Yuneec H520E, Freefly Alta 8, OnyxStar HYDRA-12. </p>
</div>

Tricopters, with three rotors, achieve yaw control through a tilting rear motor. This mechanical feature makes them lighter but adds a layer of maintenance complexity. Quadcopters, featuring four rotors, are the most common configuration because they strike an ideal balance between simplicity and performance—requiring only motor speed adjustments for control, without additional moving parts. Hexacopters (six rotors) or octocopters (eight rotors) benefit from increased lifting capacity and fault tolerance, that is the drone can remain stable even if a motor fails. However, these advantages come with higher energy consumption, added weight, and more intricate control requirements. Rotor arrangement also plays a crucial role. The "X" configuration in quadcopters, where arms are diagonally aligned, is widely adopted for its balanced control and minimal obstruction of forward-facing cameras. The older "+" configuration, with rotors aligned front and back, simplifies geometry but is less practical for many applications. Other designs, like stretched or asymmetric frames, enhance forward-flight efficiency or optimize sensor placement. Coaxial configurations, with stacked rotors on each arm, boost thrust without expanding the vehicle’s footprint, though they face challenges like aerodynamic interference and tuning complexity.

Control principles remain consistent across configurations: multirotors adjust individual rotor speeds to redistribute thrust. Increasing overall thrust raises altitude, while differential thrust between motors controls roll, pitch, and yaw. Yaw is typically managed by leveraging the reaction torques of counter-rotating propellers, except in tricopters, which use mechanical tilting.
Control systems rely on real-time feedback from an inertial measurement unit (IMU) and a flight controller. The controller uses PID loops to compare the vehicle’s current state with the desired trajectory, adjusting motor speeds accordingly. As rotor count increases, control allocation becomes more flexible, improving disturbance rejection and fault tolerance.
Operational trade-offs are evident: fewer rotors mean greater agility and energy efficiency but less redundancy, making the system more vulnerable to failure. More rotors enhance stability and safety, particularly for heavy payloads or critical missions, though they reduce responsiveness and increase power consumption. Coaxial and asymmetric designs introduce further compromises between compactness, efficiency, and control complexity. Ultimately, the choice of configuration reflects a balance between performance needs, reliability, and the sophistication of the control system.

To learn more about control of multirotors, follow the dedicated module: [multirotors](https://www.ieee-ras.org/ras-university/?ras_page=docs/chap9_aerial_robotics/multirotor)

#### Questions

<div class="open-question-container" style="margin-bottom: 2em;">
  <p><strong>Question: What is the advantage of increasing the number of rotors on a multirotor drone??</strong></p>
  
  <button type="button" onclick="showAnswer('open1')">
    Show/Hide Answer
  </button>

  <div id="answer-open1" class="answer-box" style="display: none; margin-top: 10px; padding: 15px; border-left: 4px solid #2196F3; background-color: #f9f9f9;">
    <p><strong>Answer:</strong></p>
    <p>
      Increasing the number of rotors on a multirotor drone offers several advantages:
      <ul>
        <li><strong>Redundancy and Reliability:</strong> More rotors mean that if one fails, the drone can still maintain flight, enhancing safety.</li>
        <li><strong>Increased Lift Capacity:</strong> Additional rotors can generate more lift, allowing the drone to carry heavier payloads.</li>
        <li><strong>Improved Stability and Control:</strong> More rotors provide finer control over movement and stability, especially in windy conditions.</li>
        <li><strong>Smoother Flight:</strong> The distribution of thrust across more rotors can lead to smoother flight characteristics.</li>
      </ul>
    </p>
  </div>
</div>

<div class="open-question-container" style="margin-bottom: 2em;">
  <p><strong>Question: Is this quadcopter configuration stable?</strong></p>
  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/quadcopter_unstable_configuration.png" alt="Quadcopter configuration with 2 clockwise and 2 counterclockwise rotors arranged with same rotation direction on the same axis." style="width: 20%; height: auto;">
  </div>
  
  <button type="button" onclick="showAnswer('open2')">
    Show/Hide Answer
  </button>

  <div id="answer-open2" class="answer-box" style="display: none; margin-top: 10px; padding: 15px; border-left: 4px solid #2196F3; background-color: #f9f9f9;">
    <p><strong>Answer:</strong></p>
    <p>
      No, this quadcopter configuration is not stable. In this arrangement, the rotors spinning in the same direction are aligned on the same side of the drone. While this configuration still cancels the net torque around the vertical axis, it creates an imbalance in the distribution of lift around the drone's center of mass. This will lead to instability in pitch and roll, making it difficult to maintain level flight. A more stable configuration would have alternating rotor directions on opposite sides, which helps balance the forces and torques more effectively.
    </p>
  </div>
</div>

#### Applications

Early developments of rotorcrafts were focused on quadrotors. Below you see a test flight from one such early design in 1922. The flight was not yet that stable nor high.
![video](https://www.youtube.com/watch?v=oM6TqjHfC5I)
><sub>De Bothezat 1922 helicopter. First flying quadrotor. Available at: https://www.youtube.com/watch?v=oM6TqjHfC5I</sub>

Due to the difficulty of simultaneously controlling four motor speeds for a human pilot, the development of quadcopters was overtaken by the development of helicopters. Helicopters have a single rotor but need a more complex mechanical structure to balance torques and maneuver. <!-- While helicopters are extremely fascinating vehicules, in this module, we focus on modern multirotor drones.  UAVs. The rise of compact, efficient microcontrollers, brushless electric motors, and miniaturized inertial measurement units (IMUs) finally solved the core challenge that had hindered quadcopters for decades: stable and responsive electronic control of multiple rotors. Thanks to these advances, flight control could now be fully automated and stabilized by onboard processors rather than a human pilot managing four motors manually.  

Nowadays the drone market covers a wide range of different applications with new spin-offs and start-ups continuously pushing the boundaries.  
These drones overcame early limitations in battery life, GPS accuracy, and control range through continual improvements in battery technology, GNSS systems, and wireless communication protocols. The result was a rapid evolution from basic remote-controlled flying toys to highly capable autonomous systems used in filmmaking, surveying, agriculture, and more.

<ins>Search and rescue:</ins>

<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 280px;">
    <img src="{{ site.baseurl }}/assets/images/uav/drone_rescue.webp" alt="A selection of different multirotor drones" style="width: 100%; height: auto;">
    <p style="font-size: small; text-align: center;">
      On the right, Mike Smith the chief drone pilot accompanied by Jim Cooper, a drone pilot in training.<br>
      Image from <a href="https://dronexl.co/2022/01/10/drones-revolutionize-search-and-rescue-operations/" target="_blank">Murdo MacLeod/The Guardian</a>.
    </p>
  </div>

  <div style="flex: 2; min-width: 300px;">
    <p>
      Multirotor drones have become very useful tools in search and rescue operations due to their agility, stability, and ability to access hard-to-reach areas. They allow to search inaccessible and remote areas much faster and safer than a rescue team on the ground and much cheaper than a search team in a helicopter. Equipped with thermal imaging cameras, GPS, and live video feeds, these drones can quickly scan vast terrain where ground teams may struggle to reach. They assist in locating missing persons and pets, delivering emergency supplies, and providing real-time situational awareness to rescue teams.
    </p>
  </div>
</div>

<ins>Aerial photography and mapping:</ins>

<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">

  <div style="flex: 1; min-width: 300px;">
    <p>
      In the fields of aerial photography and mapping, multirotor drones offer flexibility and precision. They are commonly used by photographers, filmmakers, and surveyors to capture high-resolution images and videos from various angles and altitudes. 
      In combination with GPS and automated flight paths, drones can perform detailed topographic surveys and 3D mapping of landscapes, infrastructure, construction sites or archaeological sites. 
    </p>
  </div>

  <div style="flex: 2; min-width: 280px;">
    <img src="{{ site.baseurl }}/assets/images/uav/drone_shot.png" alt="Cinematic drone shot of lake bled in Slovenia." style="width: 90%; height: auto;">
    <p style="font-size: small;">Cinematic drone shots—like this one of Lake Bled in Slovenia—have become an integral part of modern photography and filmmaking. Screenshot from <em>DJI Mavic Air Lake Bled, Slovenia</em> by The Leisure Club, available on <a href="https://www.youtube.com/watch?v=4FWChWcOeHQ" target="_blank">Youtube</a>.</p>
  </div>
</div> 

<ins>Inspection:</ins>

![video]([https://youtu.be/Q29N_pTc6kA?si=kTuKMjH5e8VwasCl&t=11](https://youtu.be/Q29N_pTc6kA?si=kTuKMjH5e8VwasCl&t=11))
><sub>Voliro T for NDT and LPS inspection on a wind turbine and a gaz power plant. Available at: https://youtu.be/Q29N_pTc6kA?si=kTuKMjH5e8VwasCl&t=11</sub>

Multirotor drones are transforming inspection processes across industries by offering a safer, faster, and more cost-effective alternative to traditional methods. They are widely used to inspect infrastructure such as power lines, wind turbines, pipelines, bridges, and telecommunications towers. High-definition cameras, thermal sensors, and LiDAR enable detailed visual and thermal analysis, reducing the need for scaffolding, cranes, or rope access. This not only improves worker safety but also minimizes downtime, reduces cost and enhances maintenance planning.

<ins>Transportation:</ins>

The last mile in goods delivery is the most cost and time intensive of an entire delivery chain. The idea to deliver goods over urban areas with drones is in the meanwhile already an old story. First companies and test flights occurred already in the 2010s. However, until today, they are struggling with restrictive regulatory laws, safety concerns, noise concerns and limited payload capacities. Nevertheless there exist some success stories, one of them is the Platform 2 from Zipline. They use a hybrid fixed wing and multirotor drone in combination with a droid, a small deliver unit, lowered on a tethered rope to achieve fast, quiet and high precision home delivery. 
<div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/zipline_platform2.png" alt="Zipline Platform 2, autonomous drone delivery system." style="width: 90%; height: auto;">
    <p style="font-size: small;">The Zipline Platform 2 autonomous drone delivery system focused on home delivery. They use a hybrid multirotor and fixed wing drone with a tethered delivery system from air. Image from <a href="https://www.zipline.com/about/zipline-fact-sheet" target="_blank">Zipline</a>.</p>
</div> 
Companies and research institutions are also developing larger multirotor systems for human transport and urban air mobility, exploring the potential for future drone taxis. However none of them is fully operational up to this day.

<ins>Agriculture:</ins>

<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <p>
      With the advancements in technology, drones offer farmers new and innovative ways to improve efficiency and crop yields. They are used in crop monitoring, yield estimation and to spray fertilizers or pesticides in a targeted manner. This reduces chemical usage, labor cost and can increase crop productivity. An example from [XAG](https://www.xag-au.com/) in Australia.
    </p>
  </div>

  <div style="flex: 2; min-width: 280px;">
    <img src="{{ site.baseurl }}/assets/images/uav/drone-agriculture2.jpg" alt="Agriculture drone." style="width: 90%; height: auto;">
    <p style="font-size: small;"> An example of use of agricultural drone in Vietnam to make rice production more sustainable, as monsoon season starts, from <a href="https://www.xag-au.com/" target="_blank">XAG (Australia)</a>.</p>
  </div>
</div>

<ins>Military:</ins>

Drones form an integral part of modern warfare. Most of them being fixed wing drones for higher payload and range, multirotor drones are also used due to their small size and cost. They are mainly used for strategic purposes to spot enemy troops and direct attacks.

<ins>Entertainment:</ins>

<div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">
  <!-- Video Section -->
  <div style="flex: 1; min-width: 350px;">
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
      <iframe
        src="https://www.youtube.com/embed/3G1KBu6H6BM"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <sub>
      Dragon Boat Show with 1500 drones in Shenzhen, China. Source: <a href="https://www.youtube.com/watch?v=3G1KBu6H6BM">YouTube</a>
    </sub>
  </div>

  <!-- Text Section -->
  <div style="flex: 2; min-width: 280px;">
    <p>
      Multirotor drones have found a creative niche in the entertainment industry, transforming the way audiences experience live events and media. From drone light shows replacing traditional fireworks to aerial cinematography in films and concerts, drones add dynamic visual elements that were previously unattainable. Another field of application is in sports broadcasting, where they offer immersive, bird's-eye views of the action, enhancing the viewer's experience.
    </p>
  </div>
</div>


### 2.2 Fixed wing drones
A fixed-wing aircraft is a machine that uses a combination of fixed lifting surfaces (wings) and of forward thrust to fly. They generate lift through one or more stationary wings, relying on forward motion provided by a propeller or jet engine. Unlike rotorcrafts they cannot hover or take-off vertically, but are highly efficient for long-distance flight and can carry heavier payloads over extended duration.


#### Design Principles
<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/NASA-Glenn-Airplane-Parts.jpg" alt="DJI mini pro 5 - a small consumer camera drone." style="width: 70%; height: auto;">
  <p style="font-size: small;">Airplane parts and control surfaces definition. Image from <a href="https://www1.grc.nasa.gov/wp-content/uploads/NASA-Glenn-Airplane-Parts-2.pdf" target="_blank">Glenn Research Center</a></p>
</div>

To better understand the challenges and oppourtunities of a fixed-wing UAV, it is helpful to understand the basics of a how an aircraft operates. The image above shows a standard airplane where all major parts and control surfaces are named. We will use these names in the following section to describe the design principles and flight dynamics of a fixed-wing aircraft. Do not hesitate to come back to this overview image to see where a specific part is nomarlly located on an aircraft.

<ins>Wing Geometry:</ins>  
The wings are the part which contribute usually the most to the lift generation of a plane. As we have already seen in the section about aerodynamic lift, there are many factors having an impact on the dynamics of a wing. While wing design is an entire topic for itself, we want to introduce here a few more of the most important design parameters of an airfoil.  
Despite the pressure drag (also form drag) and friction drag (also parasite drag), there exists a commonly used third type of drag: <em>induced drag</em>. Induced drag is drag that is <it>"induced"</it> by the lift generation. The high pressure difference between the top and bottom of the wing during lift generation, causes air to <it>"spill"</it> around the wing. This in turn, causes vortex generation leading to an increase in the total drag.
<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/wing_geometry.svg" alt="Illustration of aircraft with swept and tapered wings." style="width: 50%; height: auto;">
  <p style="font-size: small;">Illustration of aircraft with swept and tapered wings.</p>
</div>


<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">
<div style="flex: 1; min-width: 400px;">
  <p>The aspect ratio is defined as:
  </p>

  \(AR = \frac{s^2}{A} = \frac{s}{c}\)

  <p>
    where:<br>
    \( s \): span [m] <br>
    \( A \): wing area [m²] <br>
    \( c \): chord length [m]
  </p>

  <p>
      The <strong>aspect ratio</strong> (AR) of a wing is an important aerodynamic parameter that influences the efficiency (lift to drag ratio) of a wing. 
    A high aspect ratio reduces induced drag and generally leads to a higher lift-to-drag ratio, and a better glide angle. 
    Gliders, for instance, have wings with high aspect ratios (usually around 30). 
  </p>
</div>

  <div style="flex: 3; min-width: 200px;">
    <img src="{{ site.baseurl }}/assets/images/uav/aspect_ratio_effect.png" 
         alt="Effect of different aspect ratios on lift coefficient." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      Effect of different aspect ratios on lift coefficient. Schema from
      <a href="https://soaneemrana.org/onewebmedia/AIRCRAFT%20DESIGN%20%3B%20A%20Conceptual%20Approach%20BY%20DANIEL%20P%20RAYMER.pdf" target="_blank">Raymer, 1992, Aircraft design: a conceptual approach</a>.
    </p>
  </div>
</div>

<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">

<div style="flex: 1; min-width: 300px;">
  <p>
    <strong>Wing sweep</strong> is the angle between the quarter-chord-line and the plane's longitidunal axis. Swept wings are primarily used for transonic and supersonic aircrafts as it efficiently delays shock wave formation. By reducing the component of airflow perpendicular to the leading edge, the <em>effective Mach number</em> experienced by the wing is decreased, allowing higher flight speeds before reaching critical Mach conditions.
  </p>

</div>
</div>


<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">

  <div style="flex: 3; min-width: 250px;">
    <img src="{{ site.baseurl }}/assets/images/uav/taper_ratio_lift.png" 
         alt="Effect of taper ratio on lif distribution along the span compared to optimal elliptical distribution." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      Effect of taper ratio on lif distribution along the span compared to optimal elliptical distribution. Schema from
      <a href="https://soaneemrana.org/onewebmedia/AIRCRAFT%20DESIGN%20%3B%20A%20Conceptual%20Approach%20BY%20DANIEL%20P%20RAYMER.pdf" target="_blank">Raymer, 1992, Aircraft design: a conceptual approach</a>.
    </p>
  </div>

<div style="flex: 1; min-width: 300px;">
  <p>
    <strong>Taper ratio</strong> is defined as the ratio of the tip chord length to the root chord length:
  </p>

  \(\lambda = \frac{c_t}{c_r}\)

  <p>
    where:<br>
    \( \lambda \): taper ratio<br>
    \( c_t \): tip chord length [m]<br>
    \( c_r \): root chord length [m]
  </p>
</div>
</div>
<p>
  Tapering is used to improve the <em>lift-to-drag ratio</em> and achieve a lift distribution closer to the ideal <it>elliptical distribution</it>, which minimizes induced drag. An elliptical lift distribution provides the best aerodynamic efficiency but is difficult and expensive to manufacture due to complex wing shapes.  
  A properly designed tapered wing can approximate this behavior, reducing excessive lift near the wingtips 
  and improving overall efficiency of up to 6%.
</p>


<div style="display: flex; align-items: center; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">

<div style="flex: 1; min-width: 300px;">
  <p>
    <strong>Wing tips</strong> offer another way to reduce induced drag by preventing high-pressure air from beneath the wing to flow around the tip toward the low-pressure region above the wing.  
    Various wing tip configurations - such as <em>sharp</em>, <em>cut-off</em>, <em>hoerner</em>, or <em>winglets</em> - are used to reduce the energy lost in vortex formation and thus decrease induced drag. The worst case aerodynamically is a simple rounded wing tip, which allows the air to "escape" easily around the tip.
  </p>
</div>

  <div style="flex: 3; min-width: 250px;">
    <img src="{{ site.baseurl }}/assets/images/uav/wing_tips.png" 
         alt="Different wing tips to prevent vortex formation and reduce induced drag." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      Different wing tips to prevent vortex formation and reduce induced drag. Illustration from
      <a href="https://soaneemrana.org/onewebmedia/AIRCRAFT%20DESIGN%20%3B%20A%20Conceptual%20Approach%20BY%20DANIEL%20P%20RAYMER.pdf" target="_blank">Raymer, 1992, Aircraft design: a conceptual approach</a>.
    </p>
  </div>
</div>

- dihedral angle  
Balances at what angle of attack an aircraft is longitidunal stable.


<ins>Control Surfaces:</ins>  
<div style="display: flex; justify-content: center; align-items: center; gap: 20px; text-align: center;">
  <div style="flex: 1; max-width: 60%;">
    <img src="{{ site.baseurl }}/assets/images/uav/aircraft_axis.jpg" alt="The yaw, roll and pitch axis of an aircraft." style="width: 90%; height: auto;">
    <p style="font-size: small;">Three priniciple axis of an aircraft: Roll, Pitch and Yaw.<a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/aircraft-rotations/" target="_blank">Glenn Research Center</a></p>
  </div>

  <div style="flex: 1; max-width: 40%;">
    <img src="{{ site.baseurl }}/assets/images/uav/Aileron_yaw.gif" 
         alt="Illustration of yaw movement of an aircraft with rudder." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      A change in yaw of the aircraft is achieved by deflecting the rudder on the tail to the right or left.
      <a href="https://commons.wikimedia.org/wiki/File:Rollpitchyawplain.png" target="_blank">Glenn Research Center, NASA</a>.
    </p>
  </div>
</div>

To understand the rotations of an aircraft we must first define the different axes. The __yaw axis__ is defined to be perpendicular to the wings and point downwards from the center of gravity of the plane. A yaw motion is a movement of the nose of the aircraft from side to side.  
The __pitch axis__ is perpendicular to the yaw axis and is parallel to the plane of the wings and directed towards the right wing tip. A pitch motion is an up or down movement of the nose of the aircraft.  
Fianlly, the __roll axis__ is perpendicular to the other two axes and is directed towards the nose of the aircraft. A rolling motion is an up and down movement of the wing tips of the aircraft.

In flight, rotations are produced with the use of control surfaces which are located around the aircraft. By deflecting a control surface an aerodynamical force acts on it which induces a torque around the center of gravity of the plane.  
A _yaw motion_ is created by turning the rudder to the left or right which as a result turns the plane to the right or left.  
The _pitch_ of the aircraft is changed by deflecting the elevators at the tail: if they are deflected downards, the camber increases leading to an increase in the lift force at the tail, which in turn pitches the nose of the plane downwards.  
Similarily, a _roll rotation_ is achieved with the ailerons of the wings. By tilting the aileron of one wing downwards while tilting the one of the other wing upwards, the lift of the two wings is no longer balanced which leads to a roll motion.

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; text-align: center;">
  <div style="flex: 1; max-width: 40%;">
    <img src="{{ site.baseurl }}/assets/images/uav/Aileron_pitch.gif" 
         alt="Illustration of pitch movement of aircraft using elevators." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      A change in pitch of the aircraft is achieved by deflecting the elevators up or down.
      <a href="https://commons.wikimedia.org/wiki/File:Rollpitchyawplain.png#/media/File:Aileron_pitch.gif" target="_blank">Glenn Research Center, NASA</a>.
    </p>
  </div>

  <div style="flex: 1; max-width: 40%;">
    <img src="{{ site.baseurl }}/assets/images/uav/Aileron_roll.gif" 
         alt="Illustration of roll movement of an aircraft with ailerons." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      A change in roll of the aircraft is achieved by deflecting the ailerons on the wings in opposite direction up or down.
      <a href="https://commons.wikimedia.org/wiki/File:Rollpitchyawplain.png" target="_blank">Glenn Research Center, NASA</a>.
    </p>
  </div>
</div>


<ins>Propulsion:</ins>  
To generate lift, a fixed-wing aircraft needs to generate thrust. While big aircrafts usually use a type of jet engine to produce thrust, smaller aircrafts and UAVs often use propellers for their thrust generation. Although less efficient at high speed, they are easier to implement and offer equal efficiency at lower speeds where most fixed-wing UAVs operate.

<ins>Launch and Recovery:</ins>  
Since stand-alone fixed-wing aircraft are not capable to to vertical take-off and landing (VTOL), their take-off and landing is more complex than for rotorcrafts. Big fixed-wing aircraft almost always use a runway to build up enough speed to produce enough lift to take off. A runway is also used for the landing to deaccelerate once the wheels touched the ground.  
Smaller fixed-wing drones usually require a smaller take-off speed. While a lot of them are launched by throwing them in the air by hand, there are some which make use of catapult to generate take-off. To recover smaller fixed-wing drones and UAVs they usually land on their belly.

#### History

The history of modern havier-than-air flight starts in the late 18th century with George Cayley from York, England. Recognised by many as "The Father of Aeronautics" he successfully identified in 1799 the four forces: lift, weight, drag and thrust and how they are linked together. Towards the end of his life, in 1852, he created a glider that successfully did the first human gliding flight.

In the second half of the 19th century the German Otto Lilienthal made thousands of repeated human gliding flights. He is known for having formulated the first aerodynamic equations before he died in 1896 from injuries as a result of a crash from 15 meters during one of his flights.

The early history of aviation ends with the famous Wright brothers at the beginning of the 20th century where they made the first recognised _"sustained and controlled heavier-than-air powered flight"_. It was them who made airplanes steerable by adding lateral control surfaces and laid the foundation for the developments towards modern aviation in the 20th century.

![video](https://www.youtube.com/watch?v=W6y3bsBXrHc)
><sub>Early Flight Vintage Films. Footage of failed flight attempts and the successful flights of the Wright Brothers (last clip). Available at: https://www.youtube.com/watch?v=W6y3bsBXrHc</sub>

In the decades that followed, driven by rapid innovation, aviation transformed from dangerous experiments to a cornerstone of our modern society. The development of lightweight, durable materials, new propulsion systems, and aerodynamic improvements to wing and aircraft design enabled aircraft to fly farther, faster, and higher. The two world wars acted as accelerators of innovation, leading to more powerful engines, higher payloads, jet engines, and the first all-metal aircraft, among other things. Today, fixed-wing aircraft are used in a variety of areas, from large civil aircraft up to fighter jets. 

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; text-align: center;">
  <div style="flex: 1; max-width: 50%;">
    <img src="{{ site.baseurl }}/assets/images/uav/Sukhoi_T-50_Maksimov.jpg" 
         alt="A modern fighter Jet the Sukhoi Su-57 of the Russian Air Force. Photograph taken by Maxim Maksimov." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      A modern fighter Jet the Sukhoi Su-57 of the Russian Air Force. Photograph taken by Maxim Maksimov. 
      <a href="https://commons.wikimedia.org/wiki/File:Sukhoi_T-50_Maksimov.jpg" target="_blank">Wikimedia</a>.
    </p>
  </div>

  <div style="flex: 1; max-width: 50%;">
    <img src="{{ site.baseurl }}/assets/images/uav/British_Airways_A320.jpg" 
         alt="An Airbus A320 from the British Airways while landing at Zurich Airport." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      An Airbus A320 from the British Airways while landing at Zurich Airport. One of the most used civil airplanes today.
      <a href="https://commons.wikimedia.org/wiki/File:British_Airways_A320-232_G-EUYC_ZRH_2025.jpg" target="_blank">Wikimedia</a>.
    </p>
  </div>
</div>

While big fixed-wing aircrafts offer a big variety of interesting designs, we want to focus here on UAVs.  
Unmanned fixed-wing aircrafts already had their beginning during World War I with unmanned remotely controlled aircrafts over radio-frequency. In 1917 the British developped their first UAV *Aerial Target* around the same time as the US the *Kettering Bug* - a forerunner of modern-day missiles. Since then fixed-wing UAVs became important for military and civil use, where they often cover similar fields of applications. Their main use case is in long-range missions in surveillance and mapping.

#### Applications
Since the application fields of fixed-wing UAVs are quite similar to the ones of multirotor drones, they will not be described in detail again. However, due to their higher efficiency and longer range, fixed-wing UAVs are often preferred for applications where long endurance and higher payload capacity are required. These include:
1. Mapping surveying
2. Surveillance and Security
3. Agriculture
4. environmental monitoring
5. Disaster management
6. Cargo & delivery

#### Challenges
Controlling UAVs require to overcome a number of challenges, such as:

1. VTOL capabilities
Achieving efficient vertical takeoff and landing (VTOL) requires handling complex aerodynamic interactions and underactuated dynamics, while balancing hover efficiency with forward-flight performance. Hybrid configurations must address trade-offs between endurance, payload capacity, and control complexity. We will see more about this in the [multirotor page](https://www.ieee-ras.org/ras-university/?ras_page=docs/chap9_aerial_robotics/multirotor).

2. Autonomous navigation
Reliable autonomy demands robust state estimation, mapping, and path planning in uncertain and dynamic environments. Challenges include dealing with limited onboard sensing, GPS-denied scenarios, real-time obstacle avoidance, and maintaining stability under disturbances. We will see more about this in the [aerial advanced control](https://www.ieee-ras.org/ras-university/?ras_page=docs/chap9_aerial_robotics/aac).

4. Energy management
UAVs are strongly constrained by onboard energy density, requiring efficient propulsion, power-aware control strategies, and optimal mission planning. Extending flight endurance while supporting computation, sensing, and payload operation remains a critical limitation.

5. Miniaturization
Reducing size and weight while maintaining sensing, computation, and actuation capabilities introduces constraints on hardware integration, power consumption, and aerodynamic performance. Scaling effects also significantly impact flight dynamics and control.

6. Safety and airspace integration
Ensuring safe operation involves fault-tolerant control, redundancy, and reliable communication. Integration into shared airspace requires compliance with regulations, collision avoidance systems, and coordination with manned and unmanned traffic management frameworks.

### Costs and Benefits

Most commercial drones are small (<1kg), but depending on their principle they offer different applications. Different architectures bring more autonomy, stability or maneuverability. The below graphic shows an interesting relationship between range and weight of the aircrafts. While very small-scale drones are almost exclusively flapping-wing drones, their flight time is also short. For long range flights, fixed wing aircrafts achieve by far the greatest autonomy. Rotorcrafts are covering the space in between: mid-range flights and small (<1kg) mid-sized drones.

<div style="float: left; margin-right: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/dronetype_flighttime_weight.webp" alt="Drone types against flight time and weight" style="width: 600px; height: auto;">
  <p style="font-size: small;">The figure shows different drone types and compares flight time against weight. From <a href="https://www.nature.com/articles/nature14542/figures/3" target="_blank">Floreano & Woods, Nature 2015, Fig. 3</a></p>
</div>

## Questions

<div class="open-question-container" style="margin-bottom: 2em;">
  <p><strong>Question: What are the main differences between fixed-wing drones and multirotor drones in terms of flight capabilities and applications?</strong></p>
  
  <button type="button" onclick="showAnswer('open3')">
    Show/Hide Answer
  </button>

  <div id="answer-open3" class="answer-box" style="display: none; margin-top: 10px; padding: 15px; border-left: 4px solid #2196F3; background-color: #f9f9f9;">
    <p><strong>Answer:</strong></p>
    <p>
      Main differences include: 
      <ul>
        <li><strong>Flight Capabilities:</strong> Fixed-wing drones are more efficient for long-distance flight and can carry heavier payloads, while multirotor drones can perform vertical take-off and landing (VTOL) and hover in place.</li>
        <li><strong>Applications:</strong> Fixed-wing drones  as well as rotorcrafts are often used for mapping, surveillance, and agriculture. Due to their endurance, fixed-wing drones are used for applications where a long flight endurance is benefical, whereas multirotor drones are used higher precison and navigation in confined spaces.</li>
      </ul>
    </p>
  </div>
</div>

<div class="open-question-container" style="margin-bottom: 2em;">
  <p><strong>Question: What type of different control surfaces are used to control the pitch, roll and yaw of a fixed-wing aircraft?</strong></p>

  <button type="button" onclick="showAnswer('open4')">
    Show/Hide Answer
  </button>

  <div id="answer-open4" class="answer-box" style="display: none; margin-top: 10px; padding: 15px; border-left: 4px solid #2196F3; background-color: #f9f9f9;">
    <p><strong>Answer:</strong></p>
    <p>
      The main control surfaces used to control the pitch, roll, and yaw of a fixed-wing aircraft are:
      <ul>
        <li><strong>Pitch:</strong> Controlled by the elevators located on the horizontal stabilizer at the tail of the aircraft.</li>
        <li><strong>Roll:</strong> Controlled by the ailerons located on the trailing edge of each wing.</li>
        <li><strong>Yaw:</strong> Controlled by the rudder located on the vertical stabilizer at the tail of the aircraft.</li>
      </ul>
    </p>
  </div>
</div>




### 2.3 Flapping Wings:
A flapping wing drone is an aircraft where lift and thrust generation and maneuvers are obtained by the actuation of flapping wings. They seek to imitate the flapping-wing flight of birds, bats and insects and are also known as ornithopters. 

Flapping-wing robots can be split into three groups based on their size and weight: _large-scale_ over 100g, _small-scale_ between 1g and 100g and _insect-size_ flappers below 1g. Despite the weight the different flapping-wing systems differ in the frequency of flapping, which is faster for small- and insect-scale robots, their hover capacity which decreases or vanishes for large-scale systems and their type of actuation used which usually are conventional electric motors for large-scale system and electro-static actuators for insect-scale systems.

While bird-inspired flapping wing drones usually incoorporate a tail providing lateral control surfaces used for stability and maneuverability, most insect-inspired flapping wing drones do not have a tail.

#### History

Flapping-wing drones have roots in early aviation, as the most intuitive approach to create a flying machine was to get inspiration by nature: birds and insects. Attempts to create flapping-wing aerial vehicle date back to the ancien Greek legend of Daedalus and Icarus and the work of Architas 400 BC. In the 15th century Leonardo da Vinci sketched designs for bird-like flying machines. In the 1990s a research team around James DeLaurier developed a piloted ornithopter that was flying in 2006 for 40s. 

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; text-align: center;">
  <div style="flex: 1; max-width: 30%;">
    <img src="{{ site.baseurl }}/assets/images/uav/Pieter_Thijs_deadakus-icarus.jpeg" 
         alt="Painting from Pieter Thijs of Deadalus and Icarus from the 17th century." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      Daedalus fixing wings onto the shoulders of Icarus. A painting of the flemish painter Pieter Thjis from the 17th century. 
      <!-- <a href="https://commons.wikimedia.org/wiki/File:Airfoil_lift_improvement_devices_(flaps).png" target="_blank">Wikimedia</a>. -->
    </p>
  </div>

  <div style="flex: 1; max-width: 60%;">
    <img src="{{ site.baseurl }}/assets/images/uav/Birdlike_plane.jpeg" 
         alt="Flapping wing birdlike plane by DeLaurier" 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      Ornithopter designed by James DeLaurier which was flying for 40s with its flapping wings in 2002.
      <a href="https://commons.wikimedia.org/wiki/File:Birdlike_plane.jpg" target="_blank">Institute for Aerospace Studies via Wikimedia</a>.
    </p>
  </div>
</div>

But the modern era of flapping-wing drones started in the late 20th century with the advancements in materials science and lightweight electric motors allowing for smaller insect- and bird-scale robots. Until today it is mainly a research topic with potential applications in agriculture, search-and-rescue, entertainement and environmental monitoring.

You might now rightfully ask yourself: Why with the maturity of very efficient fixed wing drones and very agile multirotor drones is the research nowadays still interested in flapping wing robots?

Well there are several interesting opportunities when working with flapping wing drones. From a neuroscience point of view, FWFR serve as a robotic platform to explore control algorithms used by birds and insect, offering insights into biological flight. Aerodynamically, flapping wings offer an advantage over fixed wings or propeller at small scale which lose efficiency due to low Reynolds numbers. Lastly, oscillating wing motion produces less noise than fast spinning propellers and producing a more natural sound that tends to have a higher acceptance in human environments.

#### Bird-inspired Flapping-Wing Robots

Bird inspired flapping-wing robots produce lift and thrust by flapping their wings. The flapping motion consists mainly of an up-and-down motion typically at moderate frequencies. Lift and thrust are principally generated during the downstroke of the wing. Birds also use their tail to produce control forces for stability and maneuvering during flight. In nature, bird flight varies vastly from agile short distance flight (as in small birds) to extremely efficient long distance flights over thousands of kilometers when birds commute between the northern and southern hemisphere.

<p>Look at the impressive footage below from a sparrowhaw. Despite flying at around 50km/h at top speed, it manages to take sharp turns, to maneuver in confined spaces and even to temporairily tuck the wings to pass through narrow gaps.</p>
![video](https://www.youtube.com/watch?v=Ra6I6svXQPg)
><sub>How sparrowhawks catch garden birds. Agile maneuvers of a hawk in slow motion. Available at: https://www.youtube.com/watch?v=Ra6I6svXQPg</sub>

There are several challenges when trying to mimick a bird with a robot. An obvious one is to replicate the agile flying maneuvers which require a complex wing and tail mechanismn to achieve multiple degree of freedoms together with robust control algorithmns in a complex aerodynamical regime. Additionally, long-range flights require a hybrid strategy allowing to change between flapping and gliding modes. Another major challenge is the trade-off between a lightweight robot with yet powerful actuators, capable of providing sufficient force and torque. Despite that, specific maneuvers like take-off and landing are a big challenge for flapping robots.

Below you find some the key characteristics for bird-insipired flapping-wing robots:
- forward flight
- larger scale
- flapping frequency 2-20Hz
- wings flap mainly up and down (vertical plane)
- tail control
- passively stable
- glide-capable

<div class="tab-window" id="birdFlappers">
  <div class="tab-title">Bird-inspired Flappers</div>
  
  <div class="tab-header">
    <button class="tab-btn active" onclick="showTab(0, 'birdFlappers')">RoboFalcon</button>
    <button class="tab-btn" onclick="showTab(1, 'birdFlappers')">P-Flap</button>
    <button class="tab-btn" onclick="showTab(2, 'birdFlappers')">BionicSwift</button>
  </div>

  <!-- TAB 2 -->
  <div class="tab-content active">
    <p><strong>RoboFalcon:</strong> The RoboFalcon developped by Ang Chen and his team is equipped with a wing morphing mechanismn to achieve fast rolling agility in flapping level flight. The robot has wingspan of 1.2m and a weight of 600 grams.</p>
    <div class="images">
      <figure>
        <img src="{{ site.baseurl }}/assets/images/uav/robofalcon.png" alt="RoboFalcon by Ang Cheng."/>
      </figure>
    </div>
    <div class="ytb-window">
      <div class="video-container">
        <iframe
          src="{{ site.baseurl }}/assets/images/uav/robofalcon.mp4"
          title="RoboFalcon flight demonstration."
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    <pre>Source: </pre> <a href="https://doi.org/10.1109/TRO.2022.3189812" target="_blank">A. Chen, B. Song, Z. Wang, D. Xue and K. Liu, "A Novel Actuation Strategy for an Agile Bioinspired FWAV Performing a Morphing-Coupled Wingbeat Pattern," in IEEE Transactions on Robotics, vol. 39, no. 1, pp. 452-469, Feb. 2023</a>.
  </div>

  <!-- TAB 3 -->
  <div class="tab-content">
    <p><strong>P-Flap:</strong> This 700 gramm flapping-wing robot developped by Raphael Zufferey and his team includes a grasping mechanismn on the claw which grasp a branch within 25 miliseconds. This allows the robot to perch and land autonomously on a branch.</p>
    <div class="ytb-window">
    <div class="images">
      <figure>
        <img src="{{ site.baseurl }}/assets/images/uav/pflap.png" alt="P-Flap by Raphael Zufferey."/>
      </figure>
    </div>
      <div class="video-container">
        <iframe src="{{ site.baseurl }}/assets/images/uav/pflap.mp4" 
          title="P-Flap flight demonstration" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <pre>Source: </pre> <a href="https://doi.org/10.1038/s41467-022-35356-5" target="_blank">Zufferey, R., Tormo-Barbero, J., Feliu-Talegón, D. et al. How ornithopters can perch autonomously on a branch. Nat Commun 13, 7713 (2022)</a>.
  </div>

  <!-- TAB 4 -->
  <div class="tab-content">
    <p><strong>BionicSwift:</strong> Commercial flapping wing robot developped by festo. This 42 grams robot has a wingspan of 68 centimeters and is a highly agile flyer.</p>
    <div class="ytb-window">
    <div class="images">
      <figure>
        <img src="{{ site.baseurl }}/assets/images/uav/bionicswift.png" alt="Concept C figure"/>
      </figure>
    </div>
      <div class="video-container">
        <iframe src="https://www.youtube.com/embed/hUE8o056Cpc" 
          title="Concept C Video" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <pre>Source: </pre> <a href="https://www.festo.com/us/en/e/about-festo/research-and-development/bionic-learning-network/bionic-flying-objects/bionicswift-id_326830/" target="_blank">Festo (2021)</a>.
  </div>
</div>

#### Insect-inspired Flapping Wing Robots

Next to birds, insects are one of the most versatile and diverse fliers on the planet. While their size ranges from a few centimeters to only a fraction of a millimeter, they manage to hover in place, fly in strong winds, and develop swarm intelligence. Researchers around the world try to understand how insects achieve this. One way of doing so is by mimicking them in robots to better understand the underlying physics and the control techniques used.

<p>We invite you to have a look at the video below from the YouTube channel <em>Ant Lab</em>. They do an incredible job of making stunning video shots of a wide variety of insects. The video below shows several fascinating insects taking off in super slow-motion. Thanks to that, you can see well the complex but rhythmic flapping of the wings, the diversity of the wing structures, and how some of them manage to fly despite seeming unstable in the air. While this does not yet talk about UAVs, it is a great way to understand the motivation and goal behind the research to develop such tiny flying robots.</p>

![video](https://www.youtube.com/watch?v=gDI5g3rd0Ls)
><sub>23 Insect Species in Slow-motion flight. Available at: https://www.youtube.com/watch?v=gDI5g3rd0Ls</sub>

<!-- ![video](https://www.youtube.com/watch?v=ca6Yviy5w2c)
><sub>Kubeetle, bee inspired flapping wing drone. Available at: https://www.youtube.com/watch?v=ca6Yviy5w2c</sub> -->

Insect inspired drones, try to replicate those kind of flying behaviors at their small scale. From an engineering point of view this miniaturization is extremely challenging, since on a robot, often lighter than a single gram, you must fit an actuator, a processor and a power system. This being said there does not yet exist a small-scale flapping wing flying robot completely mastering all of these challenges.
Another challenge is to control those small UAVs. Compared to larger UAVs, the small sized insect inspired drones operate at different reynold number, where viscous forces dominate and standard aerodynamic models fail to model the dynamics. However, research suggests that aerodynamically flapping-wing flight becomes the preferred solution compared to propellers at a very small scale.

Before showing you a few examples of existing robots, the main characteristics of insect-inspired flight can be summarized as follows:
- hovering capability 
- small scale and ultra lightweight designs
- high flapping frequency, typically ranging from 20 Hz to 300 Hz 
- wings motion mainly in the horizontal plane with wings flapping forward and backward (horizontal plane)
- tailless flight control, relying on wing modulation for stability and maneuvers
- very agile, but typically inherently unstable
- high power demand relative to weight

<div class="tab-window" id="insectFlappers">
  <div class="tab-title">Insect-Size Flapping-Wing Drones</div>
  
  <div class="tab-header">
    <button class="tab-btn active" onclick="showTab(0, 'insectFlappers')">RoboBee</button>
    <button class="tab-btn" onclick="showTab(1, 'insectFlappers')">RoboFly</button>
    <button class="tab-btn" onclick="showTab(2, 'insectFlappers')">SoftFly</button>
    <button class="tab-btn" onclick="showTab(3, 'insectFlappers')">PMN-PT-Flyer</button>
  </div>


  <div class="tab-content active">
  <p><strong>RoboBee:</strong> This 80mg flapping-wing robot with 35mm wingspan was loosely modeled on the morphology of flies. Built by Kevin Ma it uses piezo-electric artificial flight muscles and is powered using a tethered wire. Closed-loop controlled it can hover and make controlled flight maneuvers.</p>
    <div class="ytb-window">
    <div class="images">
      <figure>
        <img src="{{ site.baseurl }}/assets/images/uav/robobee.jpg" alt="Robobee built by Kevin Ma."/>
      </figure>
    </div>
      <div class="video-container">
        <iframe src="{{ site.baseurl }}/assets/images/uav/robobee.mov" 
          title="Robobee flight demonstration." frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <pre>Source: </pre> <a href="https://doi.org/10.1126/science.1231806" target="_blank">Kevin Y. Ma et al., Controlled Flight of a Biologically Inspired, Insect-Scale Robot. Science 340, 603-607(2013)</a>.
  </div>

  <div class="tab-content">
    <p><strong>Laser RoboFly:</strong> This laser powered RoboFly capable of a wireless take-off with a weight of only 190mg was developped by Johannes James. It's powered by photovoltaic cell receving energy from a laser. As soon as the cell leaves the laser beam, the actuators stop and hence this robot is only capable of take-off but no sustained flight.</p>
    <div class="images">
      <figure>
        <img src="{{ site.baseurl }}/assets/images/uav/robofly.png" alt="Laser powered RoboFly."/>
      </figure>
    </div>
    <div class="ytb-window">
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/17ATyC0kf2c"
          title="Laser powered RobotFly lift-off demonstration."
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    </div>
    <pre>Source: </pre> <a href="https://doi.org/10.1109/ICRA.2018.8460582" target="_blank">J. James, V. Iyer, Y. Chukewad, S. Gollakota and S. B. Fuller, "Liftoff of a 190 mg Laser-Powered Aerial Vehicle: The Lightest Wireless Robot to Fly," 2018 IEEE International Conference on Robotics and Automation (ICRA)</a>.
  </div>

  <div class="tab-content">
    <p><strong>SoftFly:</strong> This SoftFly uses biomimetic artifical muscles that are capable of deformation to withstand external impact. With a weight of 120mg and a wingspan of 660mm is capable of stable flight. It uses a dielectric elastomer as an actuator and is powered using thin thethered wire.</p>
    <div class="images">
      <figure>
        <img src="{{ site.baseurl }}/assets/images/uav/softfly.png" alt="SoftFly robotic fly."/>
      </figure>
    </div>
    <div class="ytb-window">
      <div class="video-container">
        <iframe src="{{ site.baseurl }}/assets/images/uav/softfly.mp4" 
          title="SoftFly kinematic demonstration." frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="video-container">
        <iframe src="{{ site.baseurl }}/assets/images/uav/softfly_2.mp4" 
          title="SoftFly closed-loop flight demonstration." frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
    <pre>Source: </pre> <a href="https://doi.org/10.1038/s41586-019-1737-7" target="_blank">Chen, Y., Zhao, H., Mao, J. et al. Controlled flight of a microrobot powered by soft artificial muscles. Nature 575, 324–329 (2019).</a>.
  </div>

  <div class="tab-content">
    <p><strong>Pmn-pt flyer:</strong> This robot called pmn-pt flyer after its actuator type - a pmn-pt cantilever. Developped by Takashi Ozaki and his team this  robot uses wireless power-transmission, weighs 1.8g and has a wingspan of 100mm. It is able to take-off but no longer distance flight is possible since it needs to stay in proximity of the energy transmitting antenna.</p>
    <div class="images">
      <figure>
        <img src="{{ site.baseurl }}/assets/images/uav/pmn-pt-flyer.png" alt="Pmn-pt flyer insect inspired drone by Takashi Ozaki."/>
      </figure>
    </div>
    <div class="ytb-window">
      <div class="video-container">
        <iframe src="{{ site.baseurl }}/assets/images/uav/pmn-pt-flyer.mp4" 
          title="Pmn-pt flyer insect inspired drone by Takashi Ozaki during test-flight." frameborder="0" 
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      </div>
    </div>
    <pre>Source: </pre> <a href="https://doi.org/10.1038/s41928-021-00669-8" target="_blank">Ozaki, T., Ohta, N., Jimbo, T. et al. A wireless radiofrequency-powered insect-scale flapping-wing aerial vehicle. Nat Electron 4, 845-852 (2021)</a>.
  </div>

</div>

#### Questions

<div class="open-question-container" style="margin-bottom: 2em;">
  <p><strong>Question: What are the main differences between bird-inspired and insect-inspired flapping-wing drones in terms of design and flight capabilities?</strong></p>
  
  <button type="button" onclick="showAnswer('open5')">
    Show/Hide Answer
  </button>

  <div id="answer-open5" class="answer-box" style="display: none; margin-top: 10px; padding: 15px; border-left: 4px solid #2196F3; background-color: #f9f9f9;">
    <p><strong>Answer:</strong></p>
    <p>
      The main differences include:
      <ul>
        <li><strong>Design:</strong> Bird-inspired flapping-wing drones have larger wingspans, typically lower flapping frequencies, and often incorporate tails for stability and maneuverability. In contrast, insect-inspired drones are smaller, have higher flapping frequencies, and usually lack tails, relying on wing modulation for control.</li>
        <li><strong>Flight Capabilities:</strong> Bird-inspired drones are designed for forward flight and gliding capabilities, while insect-inspired drones mainly hover and are capable of agile maneuvers. Additionally, bird-inspired drones tend to be passively stable, whereas insect-inspired drones are often inherently unstable and require active control.</li>
      </ul>
    </p>
  </div>
</div>

<div class="open-question-container" style="margin-bottom: 2em;">
  <p><strong>Question: What are the main challenges when designing flapping-wing drones compared to fixed-wing or multirotor drones?</strong></p>
  
  <button type="button" onclick="showAnswer('open6')">
    Show/Hide Answer
  </button>

  <div id="answer-open6" class="answer-box" style="display: none; margin-top: 10px; padding: 15px; border-left: 4px solid #2196F3; background-color: #f9f9f9;">
    <p><strong>Answer:</strong></p>
    <p>
      The main challenges include:
      <ul>
        <li><strong>Complex Aerodynamics:</strong> While aerodynamic forces for fixed-wing ircrafts are mostly very well understood, flapping-wing drones operate in a complex aerodynamic regime that is difficult to model and predict. </li>
        <li><strong>Miniaturization:</strong> Designing lightweight yet powerful actuators and power systems for small-scale flapping-wing drones is challenging.</li>
        <li><strong>Control Algorithms:</strong> Developing robust control algorithms to manage the inherently unstable flight dynamics of flapping-wing drones is more complex than for fixed-wing or multirotor drones.</li>
        <li><strong>Energy Efficiency:</strong> Flapping-wing drones have higher power demands relative to their weight, making energy management a critical challenge. Especially for very small-scale drones, where normal batteries are too heavy and big to be implemented.</li>
      </ul>
    </p>
  </div>
</div>

<div class="open-question-container" style="margin-bottom: 2em;">
  <p><strong>Question: What are potential advantages of flapping-wing drones over traditional fixed-wing or multirotor drones?</strong></p>
  
  <button type="button" onclick="showAnswer('open7')">
    Show/Hide Answer
  </button>

  <div id="answer-open7" class="answer-box" style="display: none; margin-top: 10px; padding: 15px; border-left: 4px solid #2196F3; background-color: #f9f9f9;">
    <p><strong>Answer:</strong></p>
    <p>
      Potential advantages include:
      <ul>
        <li><strong>Agility:</strong> Flapping-wing drones could technically achieve highly agile maneuvers, making them suitable for navigating complex environments.</li>
        <li><strong>Small Scales:</strong> At very small scales, flapping-wing flight can be more efficient than propeller-based systems due to aerodynamic advantages at low Reynolds numbers. Additionally, minituarization of rotorcrafts or fixed wing drones are often impossible due to size contraints of electric motors.</li>
        <li><strong>Biomimicry:</strong> Flapping-wing drones can mimic the flight patterns of birds and insects, potentially leading to new insights in biology.</li>
        <li><strong>Reduced Noise:</strong> Flapping wings can produce less noise compared to fast-spinning propellers, making them more suitable for operations in noise-sensitive environments.</li>
      </ul>
    </p>
  </div>
</div>


## Additional Resources

### Credits:
This course page was created by **Lisa Romana Schneider, MSc in Robotics at EPFL**, under supervision of **Dr. Charbel Toumieh (EPFL LIS)** and **Prof. Aude Billard**. It was funded by **IEEE RAS** and **EPFL**. 

This course page is partly based on the Aerial Robotics class taught by [Prof. Dario Floreano](https://people.epfl.ch/dario.floreano) at EPFL (Ecole Polytéchnique Fédérale de Lausanne).

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->
Raymer, D. P. (1992). Aircraft design: A conceptual approach (2. ed). American Institute of Aeronautics and Astronautics.
Beard, Randal W., and Timothy W. McLain. Small unmanned aircraft: Theory and practice. Princeton university press, 2012.

<div class="page-navigation">
  <a href="/docs/chap9_aerial_robotics/UAV/UAV_1"
     id="go-to-previous"
     title="Go to Previous Chapter">⬅</a>

  <a href="/docs/chap9_aerial_robotics/UAV/UAV_3"
     id="go-to-next"
     title="Go to Next Chapter">➡</a>

</div>

