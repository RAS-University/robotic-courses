---
title: Unmanned Aerial Vehicles
parent: Courses
layout: default
nav_order: 7
---

<script src="questions.js"></script>

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

# Unmanned Aerial Vehicles

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1. Prerequisites
To get the most of this module, it is recommended that you have knowledge in:
1. **Basic Mechanical Physics**
  - Newton's laws of motion, especially the third law of action and reaction. 
  - Concepts of **moments** and **torques**.

## 2. General Motivation
<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/dji_mini_5_pro.webp" alt="DJI mini pro 5 - a small consumer camera drone." style="width: 400px; height: auto;">
  <p style="font-size: small;">DJI mini pro 5 - a small consumer camera drone. Picture from <a href="https://store.dji.com/ch/product/dji-mini-5-pro?vid=199551g" target="_blank">DJI</a></p>
</div>

Unmanned Aerial Vehicles (UAV) are flying object's without a pilot and controlled remotely or are autonomous. They are usually referred to as drones. And probably now, when you hear the word _drone_ you are thinking of a small commercial quadcopter people use to take stunning video shots like on the image above? Or maybe you are thinking of drone racing? Or maybe of military drones used more and more frequently in modern war?
But, did you know that drones/UAVs are much more than only quadcopters?
The first consumer drone entered the market in 2013 - the DJI Phantom 1. In the last decade the drone market got revolutionized and is growing in an incredible pace. More complex mechanics, more stable control and more autonomy. This and the following lectures will give you an overview of different drone types, aerodynamic principles, and what it takes to build and control an UAV.

This module about UAVs aims to give an introduction to aerial robotics and provide an overview over different drone types, their aerodynamical principles and their associated cost and benefits.

## Chapter 1 : Introduction to aerodynamic principles

On the image below you see in <span style="color: #FFAA00;">yellow</span> a flying object - here you can think of it as the profile of a wing. Suppose the wing is moving in the direction of the <span style="color: #020FA4;">blue</span> vector. What kind of forces are acting on it? There is of course the gravity coming from the weight of the wing - here in <span style="color: black;">black</span>. The force that makes the wing stay in the air - instead of being restrained to the ground as us humans - is called <span style="color: #C20000;">*lift*</span> force. But the wing is not simply hovering in the air, it moves in the <span style="color: #020FA4;">direction of movement</span>. The force making this possible is the <span style="color: #02E308;">*thrust*</span>, which is counteracted by the *drag*. For a wing we call the angle between the direction of movement and the centerline of the wing the *angle of attack*. 

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/Lift-force-en.svg" alt="Illustration of lift, drag and thrust force." style="width: 450px; height: auto;">
  <p style="font-size: small;">The figure illustrates lift, thrust and drag force. Schema by <a href="https://commons.wikimedia.org/wiki/File:Lift-force-en.svg" target="_blank">Bartosz Kosiorek</a></p>
</div>

The three most important forces when it comes to drones are lift, thrust and drag. For simplicity, lift and drag will be explained on a fixed wing aircraft - i.e. an airplane. The next chapter will cover how for different drone types, lift and thrust is generated. But it is important to get a basic grasp of what the forces are now.

<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Disclaimer:</strong> Aerodynamic is an entire subject on it's own. This chapter will not be a full or complete module. It rather aims to provide you with the necessary tools and intuition to understand the relevant aspects of aerodynamics related to drones. This is crucial to understand later how drones are controlled.
</div>

### 1.1 Drag
When an object moves through a fluid there is a resistive force acting in the opposite direction of motion. Often referred to as air resistance, the drag force depends on the air density, the shape of the moving object and *quadratically* to the speed of the drone. It is always **parallel** to the flow direction. 

To grasp this in more detail, please watch the video below from **0:10** until **10:37** or read the description beneath it:

![video](https://www.youtube.com/watch?v=GMmNKUlXXDs)
><sub>Understanding Aerodynamic Drag by The Efficient Engineer. Available at: https://www.youtube.com/watch?v=GMmNKUlXXDs</sub>

<details markdown='1'>
  <summary>Description of the video</summary>

  The fluid flowing around an object exerts a <span style="color: #73DBD8;">force</span> on it. You can split the force in two parts:
  - one perpendicular to the flow direction, which is called <span style="color: #91D1EF;">*lift*</span>.
  - and one in the opposite direction of movement - the <span style="color: #FAD255;">*drag*</span>.

  In air, we call these forces aerodynamic forces.

  <div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/foil_forces.svg" alt="Illustration of lift and drag force of an airfoil in laminar flow." style="width: 95%; height: auto;">
  <p style="font-size: small;">Lift and drag force of an airfoil in laminar flow. Illustration by author.</p>
</div>
   
  Here we only focus on the drag force. The drag force is usually an undesirable force - it slows your object down or in other words you need more energy to advance in the fluid and loose in efficiency. Therefore engineers usually try to minimize the drag - if it is a car, a boat or an airplane. The same goes for drones. But what exactly does cause drag?
  The cause of drag can be decomposed into two effects:
  1. shear stresses acting *tangential* to the surface and are caused by frictional forces due to the fluids viscosity. This is the **friction drag**.
  2. pressure stresses acting *perpendicular* to the surface and are caused by how the pressure is distributed around a object. This is the **pressure drag** or sometimes also called **form drag**.

  The sum of these two effects in the direction of movement is the drag.

#### Pressure Drag
   
  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/ball_pressure.svg" alt="Pressure distribution of a ball." style="width: 95%; height: auto;">
    <p style="font-size: small;">Pressure distribution of a ball moving through a fluid. Illustration by author.</p>
  </div>
  Pressure drag is the strongest for blunt bodies like a ball. It is caused by a difference in pressure in front and rear of an object. While air in front of the body is compressed and thus pressure increases, the air behind the body becomes separated and turbulent, leading to a region of lower pressure. Pressure drag increases *substantially* in case of flow separation, which is the case when the fluid's boundary layer detaches from the body. This causes a recirculating flow, significantly decreasing the pressure behind the body. This is called the *separation region*. To reduce drag forces, it is desirable to minimize flow separation at all cost. Flow separation can also lead to vortex creation, which can lead to instability and turbulence. Why does flow separation occur to begin with?

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/ball_flow_separation.svg" alt="Flow separation of a ball." style="width: 95%; height: auto;">
    <p style="font-size: small;">Flow separation on rear side of a ball moving through a fluid. Illustration by author.</p>
  </div>

  When the fluid passes over the surface of the sphere it initially accelerates and the pressure decreases in the flow direction. Beyond a certain point the flow then decelerates and the pressure starts increasing. The increase in pressure pushes the fluid backward. But due to the oncoming fluid it cannot travel back, forcing it to detach from the surface, resulting in flow separation. Flow separation occurs at 80° for a smooth sphere in laminar flow. In case of a turbulent flow it can be delayed until 120°, which drastically reduces the drag. This is because the mixing between different flow layers transfers momentum to the fluid, allowing them to sustain a larger pressure difference. That is why for example a golf ball has dimples instead of being completely smooth. The turbulence caused them delays flow separation, reduces drag and hence allows the ball to travel further.
  Bodies traveling through fluid like plane wings or racing cars are usually designed in a *tear-drop* shape to minimize flow separation. Flow separation is delayed so much or doesn't occur at all, that pressure drag is greatly reduced. For these type of objects it's the shear stresses that contribute most to the total drag force.

#### Friction Drag

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/shear_stresses.svg" alt="Shear stress over an airfoil in a fluid." style="width: 95%; height: auto;">
    <p style="font-size: small;">Shear stress over an airfoil caused by flow of fluid. Illustration by author.</p>
  </div>
  
  Friction drag increases with the viscosity of the fluid and the surface of area aligned with the direction of flow. While turbulence decreases pressure drag by delaying the flow separation, it has the opposite effect on friction drag. Laminar and turbulent boundary layers show very different velocity profiles. Turbulence boundary layers have higher velocity gradients and thus produces larger shear stress. Hence to reduce friction drag, you want to maintain laminar flow for the largest possible distance around the object. 

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/Velocity-profiles-for-laminar-and-turbulent-flow.jpg" alt="Shear stress over an airfoil in a fluid." style="width: 95%; height: auto;">
    <p style="font-size: small;">The figure illustrates typical velocity profiles for laminar and turbulent flow along a surface. Schema from <a href="https://doi.org/10.13140/RG.2.2.29149.56802" target="_blank">Landis (2018). CFD Analysis of RAM Air Flow in an Aircraft Air Conditioning System. </a></p>
  </div>

  If you would manage to maintain laminar flow over the wings of commercial aircraft, you could reduce the total drag by 10-15%. But this is very hard to achieve and is an open question in research. One idea that was partially successful is the so called hybrid-laminar flow control, where air is suck downwards along the surface of the wing. Another possibility is to reduce the effect of turbulent flow on friction drag. One interesting research aspect there looks at the microstructure of shark skin.

  We have seen that the magnitude of friction and pressure drag depends on the surface of a body relative to the direction of flow. An obvious example is flat plat at 90° angle to the direction of flow. The flow separates easily, creating a separation region and the pressure drag is large. In this case friction drag is almost zero, since shear stresses are not aligned with the drag direction. However if you turn the plate by 90° such that the surface is aligned with the direction of flow, we have a very streamlined body and the pressure drag is small. But the friction is now much more significant. 

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/airfoil_angles_of_attack.jpg" alt="Effect of angle of attack on flow separation for an airfoil." style="width: 80%; height: auto;">
    <p style="font-size: small;">The figure shows the influence of the angle of attack on flow separation for an airfoil. Schema from <a href="https://www.centennialofflight.net/essay/Theories_of_Flight/Two_dimensional_coef/TH14G4.htm" target="_blank">NASA.</a></p>
  </div>

  The same logic applies to airfoils, where the angle of attack - i.e. the angle between the centerline of a wing and the direction of flow - has a large influence on the drag force. At high angles of attack (AOA) separation occurs, which significantly increases the drag force. In general it is important to remember that friction drag increases as pressure drag decreases and so these two aspects need to be carefully balanced.

#### Drag Force Calculation
  
  If you would integrate the pressure stress and wall shear stresses of an object, you would obtain the exact drag force. However those information are almost never available. That is why usually the drag equation is used to represent the total drag force:
  $$D=C_D\frac{1}{2}\rho A v^2$$

  $D$:    drag force \\
  $C_D$:  drag coefficient, depending on the morphology of the object\\
  $\rho$: fluid density\\
  $A$:    wing area\\
  $v$:    airspeed 

  The $C_D$ drag coefficient includes all of the hard to measure parameters such as object geometry or the effect of flow regime. It can be determined experimentally by running wind tunnel experiments or by running numerical simulations. $\rho$ is the fluids density, $v$ the relative velocity of the fluid to the object and usually assumed to be steady and uniform. Finally $A$ is a reference area, that depends on how the drag coefficient is determined. For airfoils it is usually the object's planform area. For blunt bodies it is usually the projected frontal area.
  ><hr>
</details>

<!-- Conceptual questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<p><strong>Question 1: Pressure drag is caused by shear stresses acting along the surface.</strong></p>
<form id="q1">
  <input type="radio" name="q1" value="True"> True<br>
  <input type="radio" name="q1" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('q1', 'False', 
      'Correct! It is friction drag that is caused by shear stresses. Pressure drag is caused by the difference in pressure between the front and the rear of the body. This occurs in the presence of flow separation.',
      'Incorrect! Pressure drag is caused by the difference in pressure between the front and the rear of the body. This occurs in the presence of flow separation. Friction drag is caused by shear stresses.')">
    Check Answer
  </button>
  <p id="q1-feedback"></p>
</form>

<p><strong>Question 2: Does using the most streamlined shape, always result in the lowest drag?</strong></p>
<form id="drag-q2">
  <input type="radio" name="drag-q2" value="True"> True<br>
  <input type="radio" name="drag-q2" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('drag-q2', 'False', 
      'Correct! Minimizing total drag requires balancing pressure drag and friction drag. A fully streamlined shape reduces pressure drag to a minimum but increases friction drag due to a larger surface area.',
      'Incorrect. While streamlining reduces pressure drag, it increases friction drag from the extended surface. The optimal shape is a compromise between both drag components.')">
    Check Answer
  </button>
  <p id="drag-q2-feedback"></p>
</form>

<p><strong>Question 3: Which changes would likely help reduce total aerodynamic drag on a vehicle?</strong></p>
<form id="drag-q3">
  <input type="checkbox" name="drag-q3" value="A"> <strong>(A)</strong> Streamlining the shape<br>
  <input type="checkbox" name="drag-q3" value="B"> <strong>(B)</strong> Maintaining laminar flow over the surface<br>
  <input type="checkbox" name="drag-q3" value="C"> <strong>(C)</strong> Increasing the surface area exposed to flow<br>
  <input type="checkbox" name="drag-q3" value="D"> <strong>(D)</strong> Inducing early flow separation<br>
  <input type="checkbox" name="drag-q3" value="E"> <strong>(E)</strong> Using textures like dimples or riblets in the right locations<br>
  <button type="button" onclick="checkMultipleAnswers('drag-q3', ['A', 'B', 'E'], 
    'Correct!<br><br>
    <ul>
      <li><strong>(A)</strong> Correct! Streamlining delays or even prevents flow separations which drastically reduce pressure drag.</li>
      <li><strong>(B)</strong> Correct! Maintaining laminar flow reduces significantly the contribution of friction drag to the total drag force.</li>
      <li><strong>(C)</strong> Incorrect! Increasing the surface area exposed to the flow of the fluid, increases friction drag, which scales linearly with surface area.</li>
      <li><strong>(D)</strong> Incorrect! The earlier flow separation occurs the greater the influence of pressure drag. Flow separation should be delayed as long as possible.</li>
      <li><strong>(E)</strong> Correct! Using textures like dimples causes turbulent flow which delays flow separation. Since turbulent flow also increases friction drag, it must be carefully balanced.</li>
    </ul>
    ', 
    'Incorrect. Try again!')">
    Check Answer
  </button>
  <p id="drag-q3-feedback"></p>
</form>

</details>

<details markdown="1">
  <summary>Mathematical Exercise</summary>

**EXERCISE 1:**

A small drone is flying at a constant speed of 15 m/s at sea level. The drone has:

- A frontal area $A=0.2 m^2$
- A drag coefficient $C_D=0.9$	​

The air density at sea level is $ρ=1.225 kg/m^3$.

Calculate the drag force acting on the plane.

<details markdown="1">
<summary><strong>Solutions</strong></summary>

**Exercise 1**:

We use the drag equation:

$$D = C_D \cdot \frac{1}{2} \rho A v^2$$

Substitute the values:

$$D = 0.9 \cdot \frac{1}{2} \cdot 1.225 \cdot 0.2 \cdot (15)^2$$

$$D = 0.9 \cdot 0.6125 \cdot 0.2 \cdot 225$$

$$D = 0.9 \cdot 27.5625 = 24.80625 \, \text{N}$$

Final Answer:

$$
\boxed{D \approx 24.8 \, \text{N}}
$$
</details>


</details>

### 1.2 Lift

Gravity holds everyone of us on the ground. To stay in the air, the gravitational force must be compensated. The force pointing in the opposite direction of the gravity is called lift force and is always **perpendicular** to the direction of the airflow. For most drone types the lift force is generated by the morphology of the wing or the propeller. To fly stable in the air, the parallel part of the lift force must equal the gravitational force.

To understand how the lift force is created with a typical airfoil, please watch the video below until **12:10** or read the description beneath it:

![video](https://youtu.be/E3i_XHlVCeU?si=uvFe0pPcO3qpL0Z3&t=5)
><sub>Understanding Aerodynamic lift by The Efficient Engineer. Available at: https://youtu.be/E3i_XHlVCeU?si=uvFe0pPcO3qpL0Z3&t=5</sub>

<details markdown='1'>
  <summary>Description of the video</summary>

  Humans have always been fascinated by the possibility to fly. Once thought to be impossible, heavier-than-air flight is only a reality because of the lift generated by aircraft wings. But lift is a complicated topic, and even to this day engineers do not entirely agree on about how it's created. So what exactly is lift? 

  **Forces on an Airfoil**:

  <div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/foil_forces.svg" alt="Illustration of lift and drag force of an airfoil in laminar flow." style="width: 95%; height: auto;">
  <p style="font-size: small;">Lift and drag force of an airfoil in laminar flow. Illustration by author.</p>
  </div>

  When fluid flows past an object, or an object like the plane wing on the image above moves through a stationary  fluid, the fluid exerts a force on the object, which can be split into two components: 
  1. acting in the same direction as the fluid flow, called drag, 
  2. and a component acting perpendicular to the flow direction, called lift.

  When talking about lift we're mostly interested in streamlined bodies like an airfoil, which are designed to produce a lot of lift, but to minimize drag at the same time. Airfoils aren’t just found on airplane wings — they’re used in wind turbines, propellers, and even Formula 1 cars. They come in a huge range of shapes and sizes. One designed for an aircraft wing won't be optimized for a propellor blade, for example. And a wing designed to fly at supersonic speeds will have a very different profile compared to one designed to fly slower than the speed of sound. 

#### Airfoil Parameters

  <div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/camber.svg" alt="Illustration of camber, chord, leading and trailing edge and angle of attack of a airfoil in laminar flow." style="width: 95%; height: auto;">
  <p style="font-size: small;">Chord, camber, trailing and leading edge and the angle of attack presented on an airfoil in laminar flow. Illustration by author.</p>
  </div>

  Airfoil profiles can be defined using a few different parameters. The forward-most edge of the airfoil is called the leading edge, and the trailing edge is at the back of the airfoil. Drawing a straight line between the leading and trailing edges gives us the chord line. The angle between the chord line and the flow direction is called the angle of attack. Drawing a line which is midway between the upper and lower surfaces gives us the mean camber line. Camber describes how curved an airfoil is. We can have positive camber or negative camber, and a symmetrical airfoil has zero camber. Camber and the angle of attack are important parameters that will have a large influence on how much lift an airfoil can generate. 

#### How Lift is Generated

  So how does a humble teardrop shape generate enough force to lift heavy aircraft off the ground? As the fluid flows around the airfoil it creates two different types of stress which act on its surface. 
  1. First we have the wall shear stresses. These stresses act tangential to the object's surface, and are caused by the frictional forces that act on the airfoil because of the fluid's viscosity. 
  2. Then we have the pressure stresses. They act perpendicular to the object's surface, and are caused by how pressure is distributed around it. 
  
  Lift is the sum of these two stresses in the direction perpendicular to the flow. The only way a fluid can create a force onto an object is through these stresses. For streamlined bodies like airfoils, the shear stresses will mostly be acting in the same direction as the flow. They make a large contribution to the drag force, but won't contribute a significant amount to the lift force. Thus, we neglect them and say that the lift acting on an airfoil is mainly caused by the way pressure is distributed around it. 


  *Pressure Distribution:*

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/lift_pressure.gif" alt="Pressure distribution over an cambered airfoil." style="width: 95%; height: auto;">
    <p style="font-size: small;">The figure shows the pressure distribution over a typical cambered airfoil. Schema from <a href="https://doi.org/10.13140/RG.2.1.5041.4562" target="_blank">Chakraborty, Manash (2015). A Computational Study on two horizontally close sequential airfoils to determine conjoined pressure distribution and aerodynamic influences on each other.</a></p>
  </div>

  You can see a typical pressure distribution on the image above. The pressure is low above the airfoil and high below it, which creates a net force with a large component in the <span style="color: #229222;">lift direction</span>. Also note that the low pressure on the top surface is larger in magnitude than the high pressure on the bottom surface. So the suction pressure on the top surface is what contributes most to the total lift force, in fact it's usually around 2/3 of it. We can also see that the majority of the pressure difference is coming from the forward-most part of the airfoil. 
  
  In truth there's nothing particularly special about the shape of an airfoil that allows it to generate lift. Any object that creates an uneven pressure distribution will generate a force in the lift direction, like a flat plate at an angle relative to the flow, for example. Airfoils are just optimized shapes that have been carefully designed to have high lift-to-drag ratios. **Without a difference in pressure above and below an object there can be no lift.** A symmetrical body like a bullet or a ball does not generate any lift force because there's no pressure difference around it. 
  
  But where does the pressure distribution come from? The answer to this question is complex, and  there is still much debate about the best way to explain it in a concise way. We can broadly split the different explanations into two groups - those based on Bernoulli's Principle and those based on Newton's third law. 
 
  *Bernoulli's Principle:*

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/velocity-distribution-airfoil.png" alt="Pressure velocity over an cambered airfoil." style="width: 95%; height: auto;">
    <p style="font-size: small;">The figure shows the velocity distribution over a typical cambered airfoil. Schema from <a href="https://doi.org/10.9734/BJAST/2017/31893" target="_blank">Petinrin (2017). Computational Study of Aerodynamic Flow over NACA 4412 Airfoil. British Journal of Applied Science & Technology.</a></p>
  </div>

Bernoulli's Principle relates pressure and velocity of a fluid. As it can be seen on the image above, the leading edge of an airfoil creates a stagnation point where velocity drops to zero. Fluid flowing above that point on the top surface travels faster than the fluid flowing on the bottom surface. After Bernoulli's Principle, an increase in speed occurs simultaneously with a decrease in pressure. That means the greater increase in velocity on the top surface creates a zone of *lower pressure* and below the bottom surface a zone of *higher pressure*.

 <!-- Bernoulli's Principle explanations focus on the velocity of the fluid. If we look at the velocity of the air around the airfoil, we can see that close to the leading edge there's a point where the fluid velocity is reduced to zero - this is called the stagnation point. Outside of the thin boundary layer surrounding the airfoil, the fluid flowing above the stagnation point, over the top surface of the airfoil, travels faster than the fluid traveling over the bottom  surface. Bernoulli's Principle tells us that when the velocity of a fluid increases, it's pressure must be reduced, which comes from the conservation of energy. This means that the increase in velocity above the airfoil creates an area of lower pressure, and the reduction in velocity below it creates an area of higher pressure, and this pressure difference creates the lift force.  -->
 
 But what causes the velocity difference? Two explanations are common:
 1. One explanation is that the geometry of an airfoil causes the flow to be pinched together above the airfoil, but not below it. Because of the conservation of mass, this results in increased velocity above the airfoil.
 2. A more complete but less intuitive explanation for the difference in velocity is based on the *concept of circulation*. The flow around an airfoil can be thought of as the superposition of idealized uniform  irrotational flow, and circulatory flow. If we impose a condition that the flow above and below the airfoil must be parallel when leaving the trailing edge, we can calculate the exact amount of circulation that must be generated by the airfoil to do this. This is called the Kutta condition. Circulation has the effect of accelerating the flow above the airfoil and delaying the flow below it. 

  *Newtons Third Law*:

  A second type of explanations are based on Newton's third law and the momentum exchange. If we look at a wider area we can observe that the effect of an airfoil can be felt far beyond its immediate vicinity. Upstream of the airfoil the flow is being swept upwards, which is called upwash. And downstream the flow is deflected downwards, which is called downwash. A very large volume of air is being displaced by the airfoil. Newton's third law tells us that for every action there is an equal and opposite reaction. The airfoil must be imparting a force on the air to create the downwash, and so based on Newton's third law, there must be a corresponding reaction force acting on the airfoil. In other words an airfoil generates lift by turning more incoming air downwards than upwards.


  In summary, a lift force acts on an airfoil because of the pressure distribution around it.  The exact cause of this pressure distribution is complex, and can be explained in several  different ways, which approach the problem from different angles. Explanations based on Bernoulli's Principle and on Newton's Third Law provide valuable insight into how lift is generated, although both approaches have limitations. Nevertheless, these explanations are useful and can lead to a more  intuitive understanding of lift. 
  
#### Stall and Angle of Attack

  We can easily imagine for example that increasing the camber or the angle of attack of an airfoil will allow it to deflect a larger amount of fluid downwards, and so will increase the lift force. However beyond a **critical angle of attack**, we can observe a sudden decrease in the lift force and increase in the drag force. At this angle of attack the boundary layer is no longer able to remain attached to the airfoil and it detaches from the surface  creating a wake behind it which affects the pressure distribution around the airfoil, significantly reducing lift and increasing drag. Flow separation is explained in more detail in the section about aerodynamical drag. The sudden reduction in lift is called stalling, and it can be very dangerous for aircraft. 
  
  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/camber-cl-aoa.png" alt="Effect of camber and angle of attack on lift coefficient of an airfoil." style="width: 95%; height: auto;">
    <p style="font-size: small;">Effect of camber and angle of attack on lift coefficient of an airfoil. Schema from <a href="https://aerotoolbox.com/media/uploads/2020/05/flap-setting-cl-alpha.png" target="_blank">AeroToolbox.</a></p>
  </div>
  

  Different airfoil shapes can have drastically different lift characteristics. For example if an airfoil is symmetrical, and so has zero camber, the lift force will be zero for zero angle of attack - as for any symmetrical body. Aerobatic aircraft usually use symmetrical airfoils since they allow planes to fly upside down more easily. Lift is then solely generated by adjusting the angle of attack.

#### Control Surfaces

<div style="display: flex; justify-content: center; align-items: center; gap: 20px; text-align: center;">
  <div style="flex: 1; max-width: 45%;">
    <img src="{{ site.baseurl }}/assets/images/uav/flap.png" 
         alt="Illustration of a trailing edge flap for an airfoil." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      Illustration of a trailing edge flap for an airfoil. Original image from <a href="https://commons.wikimedia.org/wiki/File:Airfoil_lift_improvement_devices_(flaps).png" target="_blank">Wikimedia</a>.
    </p>
  </div>

  <div style="flex: 1; max-width: 45%;">
    <img src="{{ site.baseurl }}/assets/images/uav/slat.jpg" 
         alt="Airbus A310-300 with leading edge slats and trailing edge flaps." 
         style="width: 100%; height: auto;">
    <p style="font-size: small;">
      Airbus A310-300 with leading edge slats and trailing edge flaps.
      <a href="https://commons.wikimedia.org/wiki/File:Wing.slat.600pix.jpg" target="_blank">Wikimedia</a>.
    </p>
  </div>
</div>


  Modern aircraft wings are equipped with control surfaces - flaps and slats - which allow the shape of the airfoil to be adjusted and optimized for the different phases of flight through mechanical actuation. During take-off for example you want high lift. Extending the flaps increases the camber of the wing, which increases lift, and so flaps are extended during take-off. But the extra lift comes at the expense of increased drag, and so the flaps are retracted when cruising, since high lift is no longer needed and drag should be minimized to improve fuel consumption.

</details>

#### Lift Force Calculation

In practice the lift force is often calculated using an empirical formula similar to the one used for drag. It models the most important relationships - *linear* to surface area and *quadratic* to velocity - and combines the rest of the hard to explain values into $C_L$, the lift coefficient.

$$L=C_L\frac{1}{2}\rho Sv^2$$


$L$:    lift force \\
$C_L$:  lift coefficient, depending on the morphology of the object\\
$\rho$: air density\\
$S$:    wing area\\
$v$:    airspeed

<details markdown="1"> 
  <summary>Conceptual Questions on Lift</summary> 
  
<p><strong>Question 1: Lift is primarily generated due to the pressure difference between the upper and lower surfaces of a body.</strong></p> 
  <form id="lift-q1"> 
  <input type="radio" name="lift-q1" value="True"> True<br> 
  <input type="radio" name="lift-q1" value="False"> False<br> 
  <button type="button" onclick="checkTrueFalse('lift-q1', 'True', 'Correct! Lift is caused by a pressure difference — lower pressure on the upper surface and higher pressure on the lower surface due to the flow characteristics around the body.', 'Incorrect! Lift arises due to the pressure difference between the upper and lower surfaces of an airfoil or body moving through a fluid.')"> 
  Check Answer 
  </button> <p id="lift-q1-feedback"></p> </form> 
  
  <p><strong>Question 2: Which of the following factors contribute to generating lift on a wing or airfoil? (Select all that apply)</strong></p> 
  <form id="lift-q2"> 
  <input type="checkbox" name="lift-q2" value="A"> <strong>(A)</strong> Angle of attack<br> 
  <input type="checkbox" name="lift-q2" value="B"> <strong>(B)</strong> Pressure difference across the wing<br> 
  <input type="checkbox" name="lift-q2" value="C"> <strong>(C)</strong> Shape of the wing (airfoil)<br> 
  <input type="checkbox" name="lift-q2" value="D"> <strong>(D)</strong> Surface roughness alone<br> 
  <input type="checkbox" name="lift-q2" value="E"> <strong>(E)</strong> Flow velocity around the wing<br> 
  <button type="button" onclick="checkMultipleAnswers('lift-q2', ['A', 'B', 'C', 'E'], 'Correct!<br><br> 
    <ul> 
      <li><strong>(A)</strong> Correct! Increasing angle of attack increases lift — up to a certain point before stall.</li> 
      <li><strong>(B)</strong> Correct! Pressure difference is the root cause of lift.</li> <li><strong>(C)</strong> Correct! Airfoil shape affects how air flows and how pressure is distributed.</li> 
      <li><strong>(D)</strong> Incorrect! While surface roughness affects drag and possibly boundary layer transition, it doesn’t directly generate lift.</li> 
      <li><strong>(E)</strong> Correct! Lift is proportional to the square of the flow velocity over the wing.</li> 
    </ul> 
    ', 
    'Not quite. Check your understanding and try again.')"> 
  Check Answer 
  </button> 
  <p id="lift-q2-feedback"></p> 
  </form> 
  
  <p><strong>Question 3: Flow separation on the upper surface of an airfoil usually leads to:</strong></p> 
  <form id="lift-q3"> 
    <input type="radio" name="lift-q3" value="A"> (A) Increased lift and reduced drag<br> 
    <input type="radio" name="lift-q3" value="B"> (B) Decreased lift and increased drag<br> <input type="radio" name="lift-q3" value="C"> (C) No change in lift<br> 
    <input type="radio" name="lift-q3" value="D"> (D) Complete reversal of lift<br> 
    <button type="button" onclick="checkTrueFalse('lift-q3', 'B', 'Correct! Flow separation causes a drop in lift and a rise in pressure drag due to the turbulent wake.', 'Incorrect! When flow separates from the upper surface, lift decreases significantly and drag increases due to the formation of a wake.')"> 
    Check Answer 
    </button> 
    <p id="lift-q3-feedback"></p> 
  </form> 
  
</details>

<details markdown="1"> 
  <summary>Mathematical Questions</summary> 

**EXERCISE 1:**

  Imagine a Boeing-777 is flying at an altitude of $500 m$ with a speed of $400 km/h$. The total weight of the airplane is $250 t$ and the wing area is $427 m²$.

  *Remark*:

  The image below shows the density of air with respect to the altitude.

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/air-density-to-altitude.png" alt="Change of air density to altitude." style="width: 70%; height: auto;">
    <p style="font-size: small;">Change of air density with altitude. Schema from <a href="https://www.researchgate.net/figure/Change-of-air-density-to-altitude_fig1_326209923" target="_blank">Sabrije Osmanaj.</a></p>
  </div>


  **Question 1**: What is the lift coefficient of the airplane at 500m, supposed it flies straight?

  **Question 2**: How much faster must the airplane fly at 10,000 m to maintain level flight (same lift force)?

  **Question 3**: How much does the drag increase when flying at 10,000 m?

  <details markdown="1">
  <summary><strong>Solutions</strong></summary>

  **Question 1**:

  To achieve a level-flight, the lift force must equal the gravitational force. We use the lift equation to calculate it:

  $$L = C_L \cdot \frac{1}{2} \rho A v^2$$

  Reformulate and setting $L=F_G=m g$:

  $$C_L = \frac{2mg}{\rho A v^2}$$

  Substitute the values, using $\rho = 1.2 kg/m^3$:

  $$C_L = \frac{2\cdot 250 \cdot 10^3 \cdot 9.81}{1.2 \cdot 427 \cdot (400\cdot \frac{1000}{3600})^2}=0.775$$

  Final Answer:

  $$
  \boxed{C_L \approx 0.78}
  $$

  **Question 2**:

  The air density at 10km altitude decreases to approximately $0.4 kg/m^3$. This loss in density must be compensated by a higher flight velocity.

  We solve the lift equation for the velocity:

  $$v=\sqrt{\frac{2L}{C_L\rho A}}$$

  Substitute the values using the lift coefficient found in the previous question:

  $$v=\sqrt{\frac{2\cdot 250 \cdot 10^3 \cdot 9.81}{0.78\cdot 0.4 \cdot 427}}=192.45 m/s$$

  $$v=692.82 km/h$$

  Hence the airplane must fly approximately **1.73** times faster at a speed of  **693 km/h**.

  **Question 3**:

  The drag force and the lift force have the same relationship with respect to air density and velocity:

  <div style="text-align: center;">
  $L \propto \rho v^2$, $D \propto \rho v^2$
  </div>

  Therefore, even though the airplane flies nearly twice as fast at higher altitudes, the drag force does not increase. This is because the decrease in air density offsets the increase in speed. As a result, fuel consumption per hour remains roughly the same — or may in reality even decrease — despite the higher speed. Consequently, flying at high altitude not only saves time but can also improve fuel efficiency over a given distance.
  
  </details>

</details>

### 1.3 Thrust

Thrust is the mechanical force that propels an flying object forward. 
<!-- The physical principle behind them are all based on Newton’s Third Law of Motion, according to which *"for every action, there is an equal and opposite reaction"*. Thrust is generated when a system expels mass in one direction, producing an equal force in the opposite direction.  -->
There are different ways of generating thrust, here we will only cover the most frequently used in aerial robotics which are propellers.

<!-- The video below explains this in a bit more detail. -->

<!-- ![video](https://www.youtube.com/watch?v=6FAcVRBx0kc)
><sub>Propelling Flight: The Science of Propellers. Available at: https://www.youtube.com/watch?v=6FAcVRBx0kc</sub> -->

<!-- <details markdown='2'> -->
  <!-- <summary>Description of Video</summary> -->

#### How Propellers generate Thrust
  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/propeller_designations.png" alt="Designation of a propeller on a De Havilland Canada DHC-1 Chipmunk." style="width: 80%; height: auto;">
    <p style="font-size: small;">The figure shows designations of a propeller on a De Havilland Canada DHC-1 Chipmunk. Original photo from <a href="https://commons.wikimedia.org/wiki/File:DHC1_Chipmunk_WP976_nose.jpg" target="_blank">wikimedia.</a></p>
  </div>

Spinning propellers are like spinning wings - an airfoil in rotation. They are usually composed of two wings, called blades, attached to a central rotating nose - the propeller hub. Like an airfoil, the blade of a propeller has a cambered cross-section, with a rounded leading edge and a flatter trailing edge. It is fixed at the hub with a certain angle called blade angle. The air on the curved front surface moves faster than the one on the rear surface, creating as explained before a region of low pressure in front and region of high pressure in the back of the propeller. This forward force called thrust propels the aircraft forward.
Another way to reason about this is with Newton's third law of motion: a spinning propeller accelerates the air backwards and as a equal opposite reaction pushes the plane forward.

The design of the blades - their curvature, camber, pitch angle, and even the number of blades - determines how efficiently they can deflect air and therefore how much thrust they generate. 

#### Factors Influencing Thrust

**Propeller Pitch**:

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/Propeller-Pitch.png" alt="Propller pitch illustration for low and high pitch." style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates a high and low pitch propeller. Schema from <a href="https://www.boatingbasicsonline.com/how-does-a-boat-propeller-work/" target="_blank">boatingbasicsonline.com</a>.</p>
</div>

The propeller pitch is the theoretical distance a propeller would move through the air per single revolution of the engine. This is similar to how a screw travels through wood. The higher the pitch, the more distance the propeller covers in one turn. The pitch is changed with the angle the propeller blade is attached to the hub. Low pitch propellers "bite" less air per turn, decrease the angle of attack which allows the engine to spin them faster. This is desirable for take-off but inefficient at cruise.

Modern aircraft often use variable pitch propellers allowing pilots to adjust the pitch in different flight regimes. This allows optimal thrust generation while fixed pitch propeller compromise between performance at different speed.

**Angle of Attack**:

The Angle of Attack for a propeller, similar to the one of a wing, is the angle between the chord line of the blade and the direction of movement of the air. However for a propeller the direction of movement of the air is less trivial than for a wing. It consists of two components:
1. The vertical speed caused by the rotation of the propeller.
2. The horizontal airspeed caused by the forward movement of the plane.

The relative airflow relevant for the thrust generation is the combination of those two components. 

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/propeller_AoA.jpg" alt="Angle of attack for a propeller" style="width: 60%; height: auto;">
  <p style="font-size: small;">The figure illustrates the angle of attack on a propeller. Schematic from <a href="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flearntoflyblog.com%2Fwp-content%2Fuploads%2F2017%2F05%2F5-9.jpg&f=1&nofb=1&ipt=6ebd7ebe5f412eaa171ed6adc8a1fd4ccaa2ff14449795e1940e7f46ed064104" target="_blank">learntoflyblog.com.</a></p>
</div>

**Rotation Speed and Aircraft Speed and Propeller Diameter**:

An increase in propeller RPM increases the vertical speed, which in turn causes an increase in the angle of attack.
Conversely, if aircraft forward speed increases, the angle of attack is decreased. At very high airspeeds there, compressibility effects can occur, which drastically drops propeller efficiency. Additionally, higher propeller speeds generate more noise, which is why you usually prefer larger propeller blades rotating at lower speeds. A useful metric for analyzing propeller performance is the advance ratio, defined as:
$$J=\frac{V}{nD}$$
where $V$ is the true airspeed (m/s), $n$ is the propeller speed (rev/s) and $D$ is the propeller diameter (m). A higher advance ratio indicates that the aircraft is moving forward faster relative to the speed of the propeller.


The figure below illustrates propeller efficiency as a function of advance ratio for various blade pitch settings. What do you observe?
<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/prop_eff_adv_ratio.jpg" alt="Propeller efficiency for different propeller pitches against advance ratio." style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates propeller efficiency for different blade pitches against advance ratio. Schema by <a href="http://www.epi-eng.com/images/Redrives/NavWeps%20Prop%20Eff-600.jpg" target="_blank">EPI inc.</a></p>
</div>

For each propeller pitch, there is a distinct optimal advance ratio at which maximum efficiency occurs. Typically, propellers are designed to achieve peak efficiency near the cruise advance ratio, since cruise is where the aircraft spends most of its time.

At low advance ratios ($J \rightarrow 0$), efficiency is low. This corresponds to conditions where the aircraft speed is low and the propeller speed is high — such as during takeoff. In this regime the angle of attack is very high and causes a large area of the propeller blade to stall, increasing drag and hence decreasing efficiency.

At the opposite end, when the advance ratio is high, the aircraft is moving fast while the propeller rotates relatively slowly. This causes the angle of attack to decrease up to a point where it becomes negative and the propeller might produce negative thrust. This drastically decreases efficiency.

A final observation from the figure is that higher blade pitches reach their maximum efficiency at higher advance ratios. This observation supports the use of variable-pitch propellers, which adjust the blade pitch during flight to maintain high efficiency across a wide range of operating conditions.

**Blade Twist and Area**:

Unlike a wing, a propeller blade does not move at a uniform speed along it's span. The tip of a blade travels faster than the root. Since the force produced by a blade is quadratically proportional to the speed, the force produced along the length of a blade would vary substantially. The larger the blades, the greater that difference. Blade twist compensates for the speed difference. So what exactly happens?

The root of the blade is fixed with an angle in order to have a big angle of attack, while the tip is almost flat. This allows a more equal distribution of the force, allowing the entire length of the blade to contribute equally to the total thrust vector. 

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/aircraft_propeller_twist.png" alt="Blade twist along span of propeller blade" style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates propeller blade twist in combination with area change. You can see how the pitch and area is the highest at the hub and the lowest at the tip. This balances the difference in velocity from hub to the tip to produce a constant force along the entire span. Schema from <a href="https://commons.wikimedia.org/wiki/File:Aircraft_propeller_twist.png" target="_blank">Pilot's Handbook of Aeronautical Knowledge, page 7-5.</a></p>
</div>

Another way, often used in combination with blade twist, to counter the difference in speed between the root and the tip is to adapt the area of the blade. In the section about lift generation we concluded the force generated is linearly proportional to the area of the blade. Hence by gradually decreasing the surface area along the length of a blade, relatively increases the thrust generated at the root compared to the tip.

**Number of blades**:

The majority of propellers used in UAVs have two blades, because they are more efficient. However more blades can be chosen to achieve more thrust in a small area. Each blade increases the volume of accelerated air per turn, but also increases drag which in total makes efficiency drop.

More advanced architectures include variable pitch propellers or contra-rotating propellers. The type of propeller must therefore be carefully chosen to balance thrust generation against drag and stability.


In summary, propeller thrust is generated through aerodynamic principles similar to those of wings, with rotating blades acting as airfoils to create a pressure difference and accelerate air backwards. Thrust output and efficiency depend on several interacting factors — including blade pitch, angle of attack, rotation speed, and aircraft velocity — all of which determine how effectively the propeller can convert engine power into forward motion. Blade twist and surface area modifications ensure a more uniform thrust distribution along the blade span, while the number of blades represents a tradeoff between thrust capability and aerodynamic efficiency. Variable-pitch systems enhance adaptability, allowing modern aircraft to maintain optimal thrust across diverse operating conditions.

<div style="background-color: #e8f4fd; border-left: 4px solid #2b7bb9; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Propellers in Rotorcraft:</strong> By turning propellers by 90 degrees and orienting them to spin in the horizontal plane, they generate lift instead of thrust. That is the principle rotorcraft like a helicopter or a multirotor drone uses.
</div>

While propellers are commonly used in smaller aircraft and UAVs due to their efficiency at lower speeds and altitudes, other forms of thrust generation also exist. Jet engines, for example, dominate in commercial and high-speed aviation, where their superior performance at high speeds and altitudes makes them more suitable than propellers. This module will not further explain these.


<details markdown="1"> 
  <summary>Conceptual Questions on Thrust</summary> 
  
<p><strong>Question 1: Thrust using a propeller is generated because the blades create a pressure difference between the front and rear of the propeller.</strong></p> 
  <form id="thrust-q1"> 
  <input type="radio" name="thrust-q1" value="True"> True<br> 
  <input type="radio" name="thrust-q11" value="False"> False<br> 
  <button type="button" onclick="checkTrueFalse('thrust-q1', 'True', 'Correct! The shape of moving propeller blades create a pressure difference between the front and back of it which pushes the aircraft forward.', 'Incorrect! The shape of moving propeller blades create a pressure difference between the front and back of it which pushes the aircraft forward.')"> 
  Check Answer 
  </button> <p id="thrust-q1-feedback"></p> </form> 
  
<p><strong>Question 2: Which of the following is true about the relationship between propeller rotation speed and thrust generation? (Select all that apply)</strong></p> 
  <form id="thrust-q2-1"> 
  <input type="checkbox" name="thrust-q2" value="A"> <strong>(A)</strong> Higher rotation speeds result in an increased angle of attack<br> 
  <input type="checkbox" name="thrust-q2" value="B"> <strong>(B)</strong> Faster forward speeds decrease the angle of attack<br> 
  <input type="checkbox" name="thrust-q2" value="C"> <strong>(C)</strong> At very high speeds, propellers may generate negative thrust<br> 
  <input type="checkbox" name="thrust-q2" value="D"> <strong>(D)</strong> Fast forward speed combined with low rotation speeds cause part of the blade to stall<br> 
  <button type="button" onclick="checkMultipleAnswers('thrust-q2', ['A', 'B', 'C'], 'Correct!<br><br> 
    <ul> 
      <li><strong>(A)</strong> Correct! Higher rotation speeds increase the vertical speed component which results in an increased angle of attack.</li> 
      <li><strong>(B)</strong> Correct! Fast forward speeds decrease the angle of attack.</li> 
      <li><strong>(C)</strong> Correct! The angle of attack at very high speeds may become negative and the propeller produce negative thrust.</li> 
      <li><strong>(D)</strong> Incorrect! Fast forward speed with low rotation speed decreases the angle of attack. Stalling happens at too high angles of attack, which happens for slow forward speeds and high rotation speeds.</li> 
    </ul> 
    ', 
    'Not quite. Check your understanding and try again.')"> 
    Check Answer 
  </button> 
  <br>
  
  <button type="button" onclick="showAnswer('thrust-q2')">Show Answer</button>
  <div id="answer-thrust-q2" style="display:none;">
    <ul>
      <li><strong>(A)</strong> Correct! Higher rotation speeds increase the vertical speed component which results in an increased angle of attack.</li>
      <li><strong>(B)</strong> Correct! Fast forward speeds decrease the angle of attack.</li>
      <li><strong>(C)</strong> Correct! The angle of attack at very high speeds may become negative and the propeller produce negative thrust.</li>
      <li><strong>(D)</strong> Incorrect! Fast forward speed with low rotation speed decreases the angle of attack. Stalling happens at too high angles of attack, which happens for slow forward speeds and high rotation speeds.</li>
    </ul>
  </div>
  <p id="thrust-q2-feedback"></p> 
</form>

  
  <p><strong>Question 3: What is the primary purpose of a variable-pitch propeller?</strong></p> 
  <form id="thrust-q3"> 
    <input type="radio" name="thrust-q3" value="A"> (A) To decrease drag at high speeds<br> 
    <input type="radio" name="thrust-q3" value="B"> (B) To increase the number of blades on the propeller<br> 
    <input type="radio" name="thrust-q3" value="C"> (C) To maintain optimal thrust generation across different flight conditions<br> 
    <input type="radio" name="thrust-q3" value="D"> (D) To reduce the rotation speed of the engine<br> 
    <button type="button" onclick="checkTrueFalse('thrust-q3', 'C', 'Correct! Variable pitch propellers aim to maximize efficiency over various advance ratios, which occur at different flight regimes.', 'Incorrect! Variable pitch propellers aim to maximize efficiency over various advance ratios, which occur at different flight regimes.')"> 
    Check Answer 
    </button> 
    <p id="thrust-q3-feedback"></p> 
  </form> 
  
</details>

### 1.4 Conditions to fly
With drag, lift, thrust and gravity as basic forces, we can already understand the conditions for an aircraft to fly.


<div class="formula-window">

  \[L > F_G\]
  If the lift force is greater than the weight of the drone, it rises.

  \[F_G > L\]
  If the gravitational force is greater than the lift force, the drone descends.

  \[T > D\]
  If the thrust is greater than the drag, the drone accelerates forward.
  
  \[D > T\] 
  If the drag is greater than the thrust, the drone slows down.
  
  \[L = F_G, \quad T = D\]
  Finally, if all forces are balanced, the drone is in steady level flight — it neither changes altitude nor speed.
</div>

Watch the following video to see how the magnitude of these forces are changing during take-off of an airplane.

![video](https://www.youtube.com/watch?v=BxOeuovzT88)
><sub>4 Forces on Aircraft during the Take-off. Available at: https://www.youtube.com/watch?v=BxOeuovzT88</sub>

## Chapter 2 : Drone Types and Use Case
In this chapter we want to give you an overview of different drone types, their flying principle and history. We grouped for that UAVs in three big groups: *rotorcrafts*, *fixed wing drones* and *flapping wing robots*. Then we will finish with a short discussion about morphing drones.

<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Disclaimer:</strong> While there are fundamental differences between the three drone types, there is a big number of drones combining principles from different types. There exist bird inspired fixed wing drones, hybrid fixed wing rotorcrafts or morphing rotorcrafts etc... 
</div>

### 2.1 Rotorcrafts

Rotorcrafts are aerial vehicles that generate lift using high speed rotary blades called rotors. They are relatively easy to build, capable of vertical take-off and landing (VTOL), possess high maneuverability (rapid change of velocity vector in multiple directions), but are less energy-efficient for long-range flight than fixed wing vehicle. 

The image below shows a collection of some state-of-the-art commercial rotorcrafts. These include tricopters, quadcopter, hexacopters and octocopters, ranging from underactuated to fully actuated systems. Today, rotorcraft UAVs are used in a wide variety of fields including agriculture, search and rescue, infrastructure inspection, cargo delivery, mapping, entertainment, and more.

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/rotorcrafts_overview_named.png" alt="A selection of different multirotor drones" style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates various multicopters. From top left: DJI Mavic Air 2, Autel Robotics EVO II, DJI Phantom Pro, CyPhy LVL 1 Drone, Freefly Alta 8, Skydio 2, Voliro T, Yuneec H520E, Yuneec Typhoon H Plus. </p>
</div>

The lift force generation principle of a rotorcraft is similar to that of thrust generation using propellers -  only the force acts vertically, countering gravity. Each rotor generates both lift and torque. To maintain balance, the system includes an equal number of clockwise and counterclockwise spinning rotors to cancel out rotational torque. 

Drone movement is achieved by adjusting the rotational speed of individual rotors. For example increasing all rotors speed equally generates more lift, allowing the drone to ascend. By tilting the drone, the direction of the thrust force becomes misaligned with gravity, allowing the drone to move laterally or to rotate. 

Different rotor configurations - both in number and arrangement - serve different operational needs and control strategies. You will learn more about this in the dedicated module about multirotor UAVs.

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/rotorcraft_configuration.png" alt="An overview of common drone configuration." style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates four common drone configurations. A classic quadcopter, a hexacopter, octocopter and a co-axial copter. Each shows rotor rotation directions (blue: counterclockwise, green: clockwise) along with a representative commercial model. From left: DJI Mavic Air 2, Yuneec H520E, Freefly Alta 8, OnyxStar HYDRA-12. </p>
</div>

#### History

The first flying rotorcrafts were quadrotors - a machine with four rotors - in 1922 by George de Bothezat. Luckily there exists some footage of that time, which allows us follow the development of rotorcrafts up to the modern age. Below you see a test flight from de Bothezat. The flight was not yet that stable nor high but here we have our first flying rotorcraft!

![video](https://www.youtube.com/watch?v=oM6TqjHfC5I)
><sub>De Bothezat 1922 helicopter. First flying quadrotor. Available at: https://www.youtube.com/watch?v=oM6TqjHfC5I</sub>

Due to the difficulty of simultaneously controlling four motor speeds for a human pilot, the development of quadcopters was paused and overtaken by the development of helicopters. Helicopters have a single rotor but need a more complex mechanical structure to balance torques and maneuver. On September 14, 1939, the world's first practical helicopter took flight in Stratford, Connecticut. The VS-300, designed by Igor Sikorsky led the foundation of controllable rotorcraft. On the footage below you can see some of the early flights of the VS-300. Note the complex mechanical structure necessary for a helicopter to work. Mechanically a quadcopter is much simpler!

![video](https://www.youtube.com/watch?v=PnbKZOG2gII)
><sub>Igor Sikorsky test flies VS-300. Available at: https://www.youtube.com/watch?v=PnbKZOG2gII</sub>

<!-- While helicopters are extremely fascinating vehicules, we don't want to spend more time on them and focus on modern multirotor drones. During the post-war era some development of quadcopters took place again - like the Curtiss-Wright VZ-7 in the 1950s - but the true comeback of multirotos was in the early 2000s with small-scale UAVs. The rise of compact, efficient microcontrollers, brushless electric motors, and miniaturized inertial measurement units (IMUs) finally solved the core challenge that had hindered quadcopters for decades: stable and responsive electronic control of multiple rotors. Thanks to these advances, flight control could now be fully automated and stabilized by onboard processors rather than a human pilot managing four motors manually.  -->

<div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <p>
      While helicopters are extremely fascinating vehicules, we don't want to spend more time on them and focus on modern multirotor drones. During the post-war era some development of quadcopters took again place - like the Curtiss-Wright VZ-7 in the 1950s - but the true comeback of multirotors was in the early 2000s with small-scale UAVs.
    </p>
  </div>

  <div style="flex: 2; min-width: 280px;">
    <img src="{{ site.baseurl }}/assets/images/uav/Curtiss-Wright_VZ-7.webp" alt="Curtiss-Wright_VZ-7 helicopter." style="width: 100%; height: auto;">
    <p style="font-size: small; text-align: center;">
      The Curtiss-Wright VZ-7 machine developed for the U.S. Army in the 1950s. It was retired only a few years later due to insufficient performance. Image from <a href="https://aviationsmilitaires.net/v3/kb/picture/10742/curtiss-wright-vz-7-au-sol" target="_blank">Librairie Images Collège Léodate Volmar</a>.
    </p>
  </div>

</div>

The rise of compact, efficient microcontrollers, brushless electric motors, and miniaturized inertial measurement units (IMUs) finally solved the core challenge that had hindered quadcopters for decades: stable and responsive electronic control of multiple rotors. Thanks to these advances, flight control could now be fully automated and stabilized by onboard processors rather than a human pilot managing four motors manually. Those processors are usually referred to as autopilot.

<div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 2em; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 280px;">
    <img src="{{ site.baseurl }}/assets/images/uav/phantom_1.jpg" alt="A selection of different multirotor drones" style="width: 100%; height: auto;">
    <p style="font-size: small; text-align: center;">
      Phantom 1 from DJI, released on January 7, 2013. With this drone, camera drones became accessible to a wider audience for the first time.<br>
      Image from <a href="https://se-cdn.djiits.com/tpc/uploads/sku/cover/p1-1@ultra.png" target="_blank">DJI</a>.
    </p>
  </div>

  <div style="flex: 2; min-width: 300px;">
    <p>
      This technological breakthrough sparked a wave of innovation. By the 2010s, several commercial brands entered the market, bringing drones to a wider audience. Chinese company DJI became a dominant player with the launch of the Phantom series in 2013, combining a compact quadcopter frame with integrated GPS, camera stabilization, and user-friendly controls. It was the first consumer drone on the market. Other notable companies like Parrot, 3D Robotics, and Yuneec also contributed to the growing drone ecosystem, offering different designs such as hexacopters and octocopters, tailored for heavier payloads and enhanced stability.
    </p>
  </div>
</div>

These drones overcame early limitations in battery life, GPS accuracy, and control range through continual improvements in battery technology, GNSS systems, and wireless communication protocols. The result was a rapid evolution from basic remote-controlled flying toys to highly capable autonomous systems used in filmmaking, surveying, agriculture, and more.

Today, multirotor drones take the biggest piece of the drone market and continue to evolve with the integration of obstacle avoidance, collision resilience, machine learning, and swarm coordination, opening up even more applications.

#### Applications
Nowadays the drone market covers a wide range of different applications with new spin-offs and start-ups continuously pushing the boundaries.

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

![video](https://youtu.be/Q29N_pTc6kA?si=kTuKMjH5e8VwasCl&t=11)
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
      With the advancements in technology, drones offer farmers new and innovative ways to improve efficiency and crop yields. They are used in crop monitoring, yield estimation and to spray fertilizers or pesticides in a targeted manner. This reduces chemical usage, labor cost and can increase crop productivity. An example is the Argas T-50 from DJI, specifically developed for the use in agriculture.
    </p>
  </div>

  <div style="flex: 2; min-width: 280px;">
    <img src="{{ site.baseurl }}/assets/images/uav/dji-argas-t50.png" alt="The DJI Argas T-50, an agriculture drone." style="width: 90%; height: auto;">
    <p style="font-size: small;">The Argas T-50 from DJI equipped with a sprayer for agricultural use. Image from <a href="https://ag.dji.com/newsroom/agras-t50-and-t25-global-launch" target="_blank">DJI</a>.</p>
  </div>
</div>

<ins>Military:</ins>

Drones from an integral part of modern warfare. Most of them being fixed wing drones for higher payload and range, multirotor drones are also used due to their small size and cost. They are mainly used for strategic purposes to spot enemy troops and direct attacks. Despite that there are also some reports claiming small bombs being attached to the drones.

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

#### Challenges
While the market and the innovation of multirotor drones grew exponentially over the past decade, there is still a lot of research going on, aiming to make drones more versatile and efficient. We want to provide below a non-exhaustive list with ongoing challenges.
<!-- Agile, Efficience and autonomous
Manipulation in Air
squeezing through thight spaces
landing on uneven surfaces
swarm
obstacle avoidance -->

1. <ins>Agility, Efficiency, and Autonomy</ins><br>
  <em>Goals:</em>  
   - Faster and more responsive flight  
   - Reduce energy consumption and decrease need for human control  
   - <em>Challenges:</em> limited onboard processing power, battery life constraints, complex control algorithms

2. <ins>Aerial Physical Manipulation</ins><br>
  <em>Goals:</em>    
   - Grasping or moving objects mid-air  
   - <em>Challenges:</em> lightweight but stable design, complex mechanical structure & control

3. <ins>Tight or Cluttered Environments</ins><br>
  <em>Goals:</em>    
   - Flying through narrow spaces (e.g., buildings, pipelines)  
   - <em>Challenges:</em> adaptive design, real-time navigation

4. <ins>Landing on complex Surfaces</ins><br>
  <em>Goals:</em>    
   - Inclined, moving, or uneven terrain indoors and outdoors 
   - <em>Challenges:</em> ensure stable landing without human interaction

5. <ins>Drone Swarms</ins><br>
  <em>Goals:</em>    
   - Coordinating multiple drones simultaneously 
   - <em>Challenges:</em> communication, task distribution, swarm intelligence

6. <ins>Robust Obstacle Avoidance</ins><br>
  <em>Goals:</em>    
   - Detecting and avoiding dynamic objects in complex environments at high speeds
   - <em>Challenges:</em> reliable sensors and fast processing

Addressing these challenges to improve drone safety, functionality and to expand their application is question of current research.

### 2.2 Flapping Wings:
A flapping wing drone is an aircraft where lift and thrust generation and maneuvers are obtained by the actuation of flapping wings. They seek to imitate the flapping-wing flight of birds, bats and insects and are also known as ornithopters. 

Flapping-wing robots can be split into three groups based on their size and weight: _large-scale_ over 100g, _small-scale_ between 1g and 100g and _insect-size_ flappers below 1g. Despite the weight the different flapping-wing systems differ in the frequency of flapping, which is faster for small- and insect-scale robots, their hover capacity which decreases or vanishes for large-scale systems and their type of actuation used which usually are conventional electric motors for large-scale system and electro-static actuators for insect-scale systems.

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

But the modern era of flapping-wing drones started in the late 20th century with the advancements in materials science and lightweight electric motors allowing for smaller insect- and bird-scale robots. Until today it is mainly a research topic with potential applications in agriculture, search-and-rescue and environmental monitoring.

You might now rightfully ask yourself: Why with the maturity of very efficient fixed wing drones and very agile multirotor drones is the research nowadays still interested in flapping wing robots?

Well there are several interesting opportunities when working with flapping wing drones. From a neuroscience point of view, FWFR serve as a robotic platform to explore control algorithms used by birds and insect, offering insights into biological flight. Aerodynamically, flapping wings offer an advantage at over fixed wings or propeller at small scale who lose efficiency at due to low Reynolds numbers. Lastly, oscillating wing motion produces less noise than fast spinning propellers and producing a more natural sound that tends to have a higher acceptance in human environments.

#### Bird-inspired Flapping-Wing Robots

Bird inspired flapping-wing robots produce lift and thrust by flapping their wings. The flapping motion consists mainly of an up-and-down motion typically at moderate frequencies. Lift and thrust are principally generated during the downstroke of the wing. Birds also use their tail to produce control forces for stability and maneuvering during flight. In nature, bird flight varies vastly from agile short distance flight (as in small birds) to extremely efficient long distance flights over thousands of kilometers when birds commute between the northern and southern hemisphere.

<p>Look at the impressive footage below from a sparrowhaw. Despite flying at around 50km/h at top speed, it manages to take sharp turns, to maneuver in confined spaces and even to temporairily tuck the wings to pass through narrow gaps.</p>
![video](https://www.youtube.com/watch?v=Ra6I6svXQPg)
><sub>How sparrowhawks catch garden birds. Agile maneuvers of a hawk in slow motion. Available at: https://www.youtube.com/watch?v=Ra6I6svXQPg</sub>

There are several challenges when trying to mimick a bird with a robot. An obvious one is to replicate the agile flying maneuvers which require a complex wing and tail mechanismn to achieve multiple degree of freedoms together with robust control algorithmns in a complex aerodynamical regime. Additionally, long-range flights require a hybrid strategy allowing to change between flapping and gliding modes. Another major challenge is the trade-off between a lightweight robot with yet powerful actuators, capable of providing sufficient force and torque. Despite thath, specific maneuvers like take-off and landing are a big challenge for flapping robots.

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

### 2.3 Fixed wing drones
A fixed-wing aircraft is a machine that uses a combination of fixed lifting surfaces (wings) and of forward thrust to fly. They must move forward to generate lift and can thus not take off vertically. 
![video](https://youtu.be/pz4SqIvoyO8?si=tcYfG70DWBQ8RylY&t=9)
><sub>Sensefly Ebee X. Available at: https://youtu.be/pz4SqIvoyO8?si=tcYfG70DWBQ8RylY&t=9</sub>

- higher lift to drag ratio than multicopters --> energetically more efficient
- fuselage contributes to lift generation and provides space for carge
- less agile than multicopters

*History*:

First human gliding flight by George Cayley in 1852, where he identified the four forces lift, weight, drag and thrust. After him Otto Lilienthal (1860-1896) built and flew thousands of gliders, which allowed him to formulate the first equations of aerodynamics. Later the Wright brothers made flight steerable by adding lateral control surfaces and made the first engine powered flight in 1903. Afterwards during the World War I, there was rapid development due to the military use. Since then fixed-wing aircrafts are indispensable for civil and military aviation. 




### 2.4 Morphing drones 

Fixed wing drones that can change shape of the wings, or rotorcrafts that can change frame morphology to pass through narrow gaps

➖adds mechanical complexity


## Chapter 3 : Cost and Benefits

Most commercial drones are small (<1kg), but depending on principle offer different applications. Different architectures bring more autonomy, stability or maneuverability. The below graphic shows an interesting relationship between range and weight of the aircrafts. While very small-scale drones are almost exclusively flapping-wing drones, their flight time is also short. For long range flights, fixed wing aircrafts achieve by far the greatest autonomy. Rotorcrafts are covering the space in between: mid-range flights and small (<1kg) mid-sized drones.

<div style="float: left; margin-right: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/dronetype_flighttime_weight.webp" alt="Drone types against flight time and weight" style="width: 600px; height: auto;">
  <p style="font-size: small;">The figure shows different drone types and compares flight time against weight. From <a href="https://www.nature.com/articles/nature14542/figures/3" target="_blank">Floreano & Woods, Nature 2015, Fig. 3</a></p>
</div>

## Additional Resources

### Credits:
This course page was created by **Lisa Romana Schneider, MSc in Robotics at EPFL**, and funded by **IEEE RAS** and **EPFL**. 

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->


