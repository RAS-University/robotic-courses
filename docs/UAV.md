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
But, did you know that drones/UAV's are much more than only quadcopters?
The first consumer drone entered the market in 2013 - the DJI Phantom 1. In the last decade the drone market got revolutionized and is growing in a incredible pace. More complex mechanics, more stable control and more autonomy. This and the following lectures will give you an overview of different drone types, aerodynamic principles, and what it takes to build and control an UAV.

This course aims to give an introduction to aerial robotics and provide an overview over different drone types, their aerodynamical principles and their associated cost and benefits.

## Chapter 1 : Introduction to aerodynamic principles

On the image below you see in <span style="color: #FFAA00;">yellow</span> a flying object - here you can think of it as the profile of a wing. Suppose the wing is moving in the direction of the <span style="color: #020FA4;">blue</span> vector. What kind of forces are acting on it? There is of course the gravity coming from the weight of the wing - here in <span style="color: black;">black</span>. The force that makes the wing stay in the air - instead of being restrained to the ground as us humans - is called <span style="color: #C20000;">*lift*</span> force. But the wing is not simply hovering in the air, it moves in the <span style="color: #020FA4;">direction of movement</span>. The force making this possible is the <span style="color: #02E308;">*thrust*</span>, which is counteracted by the *drag*. For a wing we call the angle between the direction of movement and the centerline of the wing the *angle of attack*. 

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/Lift-force-en.svg" alt="Illustration of lift, drag and thrust force." style="width: 450px; height: auto;">
  <p style="font-size: small;">The figure illustrates lift, thrust and drag force. Schema by <a href="https://commons.wikimedia.org/wiki/File:Lift-force-en.svg" target="_blank">Bartosz Kosiorek</a></p>
</div>

The three most important forces when it comes to drones are lift, thrust and drag. For simplicity, lift and drag will be explained on a fixed wing aircraft - i.e. an airplane. The next chapter will cover how for different drone types, lift and thrust is generated. But it is important to get a basic grasp of what the forces are now.

<!-- <div class="disclaimer-panel"> -->
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
There are different way of generating thrust, here we will only cover the most frequently used in aerial robotics which are propellers.

*Propellers*:

Propellers consist of rotating blades at high speed. The way they are generating thrust is in essence very similar to how an airfoil generates lift. 

  <div style="text-align: center;">
    <img src="{{ site.baseurl }}/assets/images/uav/propeller_designations.png" alt="Designation of a propeller on a De Havilland Canada DHC-1 Chipmunk." style="width: 80%; height: auto;">
    <p style="font-size: small;">The figure shows designations of a propeller on a De Havilland Canada DHC-1 Chipmunk. Original photo from <a href="https://commons.wikimedia.org/wiki/File:DHC1_Chipmunk_WP976_nose.jpg" target="_blank">wikimedia.</a></p>
  </div>

<!-- The video below explains this in a bit more detail. -->

<!-- ![video](https://www.youtube.com/watch?v=6FAcVRBx0kc)
><sub>Propelling Flight: The Science of Propellers. Available at: https://www.youtube.com/watch?v=6FAcVRBx0kc</sub> -->

<!-- <details markdown='2'> -->
  <!-- <summary>Description of Video</summary> -->

#### How Propellers generate Thrust

Spinning propellers are like spinning wings - an airfoil in rotation. They are usually compromised of two wings, called blades, attached to a central rotating nose - the propeller hub. As an airfoil a blade of a propeller has a rounded leading edge and a more pointy trailing edge. It has a curved front and a flat back surface and is fixed at the hub with a certain angle of attack. The air on the curved front surface moves faster than the one on the rear surface, creating as explained before a region of low pressure in front and region of high pressure in the back of the propeller. This forward force called thrust propels the aircraft forward.
Another way to reason about this is with Newton's third law of motion: a spinning propeller accelerates the air backwards and as a equal opposite reaction pushes the plane forward.

The design of the blades — their curvature, camber, pitch angle, and even the number of blades — determines how efficiently they can deflect air and therefore how much thrust they generate. 

#### Factors Influencing Thrust

**Angle of Attack**:

The Angle of Attack for a propeller, similar to the one of a wing, is the angle between the chord line of the blade and the direction of movement of the air. However for a propeller the direction of movement of the air is less trivial than for a wing. It consists of two components:
1. The vertical speed caused by the rotation of the propeller.
2. The horizontal airspeed caused by the forward movement of the plane.

The relative airflow relevant for the thrust generation is the combination of those two components. 

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/propeller_AoA.jpg" alt="Angle of attack for a propeller" style="width: 60%; height: auto;">
  <p style="font-size: small;">The figure illustrates the angle of attack on a propeller. Schematic from <a href="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Flearntoflyblog.com%2Fwp-content%2Fuploads%2F2017%2F05%2F5-9.jpg&f=1&nofb=1&ipt=6ebd7ebe5f412eaa171ed6adc8a1fd4ccaa2ff14449795e1940e7f46ed064104" target="_blank">learntoflyblog.com.</a></p>
</div>

**Propeller Pitch**:

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/Propeller-Pitch.png" alt="Propller pitch illustration for low and high pitch." style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates a high and low pitch propeller.<a href="https://www.boatingbasicsonline.com/how-does-a-boat-propeller-work/" target="_blank">boatingbasicsonline</a>.</p>
</div>

The propeller pitch is the theoretical distance a propeller would move through the air per single revolution of the engine. This is similar to how a screw travels through wood. The higher the pitch, the more distance the propeller covers in one turn. The pitch is changed with the angle the propeller blade is attached to the hub. Low pitch propellers "bite" less air per turn, decrease the angle of attack which allows the engine to spin them faster. This is desireable for take-off but inefficient at cruise.

Modern aircraft often use variable pitch propellers allowing pilots to adjust the pitch in different flight regimes. This allows optimal thrust generation while fixed pitch propeller compromise between performance at different speed.

**Rotation Speed and Aircraft Speed**:

If RPM increases, the vertical speed increases which causes an increase in the angle of attack.
If aircraft forward speed increases, the angle of attack is decreased and with it the efficiency of a propeller. At very high speed there are compressibility effects present, which drastically drops efficiency. Also with increasing speed the noise increases. Therefore often larger blades at lower speed. There is a metric known as the advance ratio, which is big if the airspeed is high relative to the propeller speed:
$$J=\frac{V}{nD}$$
where $V$ is the true airspeed, $n$ is the propeller speed and $D$ is the propeller Diameter.

On the image below it is well visible that for every propeller blade pitch there is an optimal advance ratio. Hence in order to achieve the most efficient flight for all advance ratios the pitch needs to change constantly. That's where the variable pitch propeller come into play.
<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/prop_eff_adv_ratio.jpg" alt="Propeller efficiency for different propeller pitches against advance ratio." style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates propeller efficiency for different blade pitches against advance ratio. Schema by <a href="http://www.epi-eng.com/images/Redrives/NavWeps%20Prop%20Eff-600.jpg" target="_blank">EPI inc.</a></p>
</div>

**Blade Twist and Area**:

Unlike a wing, a propeller blade does not move at a uniform speed along it's span. The tip of a blade travels faster than the root. Since the force produced by a blade is quadratically proportional to the speed, the force produced along the length of a blade would vary substantially. The larger the blades, the greater that difference. Blade twist compensates for the speed difference. So what exactly happens?

The root of the blade is fixed with an angle in order to have a big angle of attack, while the tip is almost flat. This allows a more equal distribution of the force, allowing the entire length of the blade to contribute equally to the total thrust vector. This blade twist is illustrated on the image beneath.

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/aircraft_propeller_twist.png" alt="Blade twist along span of propeller blade" style="width: 90%; height: auto;">
  <p style="font-size: small;">The figure illustrates propeller blade twist. You can see how the pitch is the highest at the hub and the lowest at the tip. Schema from <a href="https://commons.wikimedia.org/wiki/File:Aircraft_propeller_twist.png" target="_blank">Pilot's Handbook of Aeronautical Knowledge, page 7-5.</a></p>
</div>

Another way, often used in combination with blade twist, to counter the difference in speed between the root and the tip is to adapt the area of the blade. In the section about lift generation we concluded the force generated is linearly proportional to the area of the blade. Hence by gradually decreasing the surface area along the length of a blade, relatively increases the thrust generated at the root compared to the tip.

**Diameter**:

The diameter of a propeller is the length of one propeller from tip to tip. Larger diameters are more efficient.

**Number of blades**:

The majority of propellers used in UAV's have two blades, because they are more efficient. However more blades can be chosen to achieve more thrust in a small area. Each blade increases the volume of accelerated air per turn, but also increases drag which in total makes efficiency drop.

More advanced architectures include variable pitch propellers or contra-rotating propellers. The type of propeller must therefore be carefully chosen to balance thrust generation against drag and stability.

<div style="background-color: #e8f4fd; border-left: 4px solid #2b7bb9; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Propellers in Rotorcraft</strong> By turning propellers by 90 degrees and orienting them to spin in the horizontal plane, it generates lift instead of thrust. That is the principle rotorcraft like a helicopter or a multirotor drone uses.
</div>

<!-- #### Other ways to generate thrust
While as explained above, propellers are the most important concept to understand thrust in the context of aerial robotics, there are different ways. Jet engines for example use fuel to compress air and expell it high speed and are used in bigger aircrafts.

*Jet Engines*:

Jet engines, the type of engine any bigger airplane has, works as follows: Air is drawn inside the engine, compressed, mixed it with fuel, and expelled at high speed at the rear. The reaction pushes the aircraft forward. 

  <details markdown='1'>
  <summary><strong>How jet engines work in detail</strong></summary>

  >![video](https://www.youtube.com/watch?v=Pt24Pptvt_M)
  > > <sub>*Aviators World: How Jet Engine Produces Thrust. Available at: https://www.youtube.com/watch?v=Pt24Pptvt_M*</sub>  
  > >
  > > *The video explains how a turbofan engine generates thrust by using a large front fan and a series of compressors, turbines, and a combustion chamber to accelerate air.*

  > Explain more?
  ><hr>
  </details>

*Electric Ducted Fans (EDF)*:
<div style="float: left; margin-right: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/edf.jpg" alt="." style="width: 200px; height: auto;">
  <p style="font-size: small;">An example of an electric ducted fan. Image available <a href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F617txcEYGTL.jpg&f=1&nofb=1&ipt=c80014e84ed580e0768f820cb3bec239527cdd26c4a640b9880fcdc526bf74a9" target="_blank">here</a>.</p>
</div>
A ducted fan is a small, high speed propeller enclosed in a cylindrical duct that accelerates air through a narrow channel.They work similarly to open propellers but are more efficient in certain conditions, as the duct helps streamline airflow, increase static thrust, and reduce tip vortices. Ducted fans also tend to produce less noise, making them ideal for compact aerial vehicles like drones where reduced acoustic signature and improved efficiency are important. -->

<!-- </details> -->

### 1.4 Conditions to fly
With drag, lift, thrust and gravity as basic forces, we can already understand the conditions for an aircraft to fly.

<!-- <div style="display: flex; justify-content: flex-start; align-items: center;">
  <span style="margin-right: 20px;">\(L > F_G\)</span>
  <span>If the lift force is bigger than the weight of the drone, it rises.</span>
</div>
<div style="display: flex; justify-content: flex-start; align-items: center;">
  <span style="margin-right: 20px;">\(F_G > L\)</span>
  <span>If the gravitational force is bigger than the lift force, the drone loses height.</span>
</div>
<div style="display: flex; justify-content: flex-start; align-items: center;">
  <span style="margin-right: 20px;">\(T > D\)</span>
  <span>If the thrust is bigger than the drag, the drone accelerates forward.</span>
</div>
<div style="display: flex; justify-content: flex-start; align-items: center;">
  <span style="margin-right: 20px;">\(D > T\)</span>
  <span>If the drag is bigger than the thrust, the drone slows down.</span>
</div>
<div style="display: flex; justify-content: flex-start; align-items: center;">
  <span style="margin-right: 20px;">\(L = F, T = D\)</span>
  <span>Finally, if all the forces are balanced, the drone is in steady level flight. It neither moves up nor down, nor does it accelerate or decelerate.</span>
</div> -->

<!-- <div class="formula-window">
  \[
  \begin{aligned}
  &L > F_G &\text{If the lift force is greater than the weight of the drone, it rises.} \\
  &F_G > L &\text{If the gravitational force is greater than the lift force, the drone descends.} \\
  &T > D &\text{If the thrust is greater than the drag, the drone accelerates forward.} \\
  &D > T &\text{If the drag is greater than the thrust, the drone slows down.} \\
  &L = F_G,\ T = D &\text{If all forces are balanced, the drone is in steady level flight — no change in speed or altitude.}
  \end{aligned}
  \]
</div> -->


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

### 2.1 Rotorcrafts:

Rotorcrafts are aerial vehicles that generate lift using high speed rotary blades called rotors. They are able to do vertical take-off and landing, posses a high maneuverability (rapid change of velocity vector in multiple directions), but are usually energetically less efficient than fixed wing vehicle. 

The lift force generation principle is the same as for the thrust force using propellers, but turned to the same axis as the gravity.

*History*:

The first flying rotorcrafts were quadrotors - a machine with four rotors - in 1922 by Etienne Oehmichen. They were quickly overtaken by helicopters - one single rotor - due to the difficulty to control the four motors for the pilot. The comeback of the quadrotors was in 2000's with the availability of small and highly efficient, microcontroller, electric motors and imu's, which allowed to build small-scale unmanned aerial vehicles.

![video](https://www.youtube.com/watch?v=oM6TqjHfC5I)
><sub>De Bothezat 1922 helicopter. Available at: https://www.youtube.com/watch?v=oM6TqjHfC5I</sub>

*Flying dynamics*:

As mentioned above, the bottleneck for quadcopters in the 20th century was the unprecise control of motor speeds. But how can a quadrotor take-off, hover, turn and move forward?

![video](https://www.youtube.com/watch?v=C0KBu2ihp-s)
><sub>Drones flight dynamics. Video from Sabin Civil Engineering available at: https://www.youtube.com/watch?v=C0KBu2ihp-s</sub>

<span style="color: red;">Add schema with forces and torques</span>

> To **take off**, all rotors increase their speed until the generated lift force is greater than the weight of the drone. If the the lift force exactly balances the gravitational force, the drone hovers. 

> Each rotor does not only generate lift, but also a **torque**, which will spin the drone in the opposite direction. To prevent spinning of the drone during flight rotorcrafts use an equal number of clockwise and anticlockwise spinning rotors. The torques from each pair cancel each other out, ensuring stability during flight.

> Movement in 3D space for quadcopter is initiated by changing the rotation speeds of some of the propellers. To generate a **pitch** movement front rotor speeds are decreased and back rotor speeds increased, which will tilt the drone forward (or vie-versa to tilt backward). If now the rotor speeds are again balanced, the lift force has an angle to the gravitational force and the non-parallel part is a thrust moving the drone forwards. The same principle applies to create a **roll** movement and move sideways. Finally to create a **yaw** rotation, the speeds of clockwise and anticlockwise rotors are adapted to rotate the drone to the left or right.


### 2.2 Flapping Wings:
A flapping wing drone is an aircraft where lift and thrust generation and maneuvers are obtained by flapping wings. They seek to imitate the flapping-wing flight of birds, bats and insects.

*History*:

Flapping-wing drones have roots in early aviation, as the most intuitive approach to create a flying machine was tot get inspired by nature: birds and insects. In the 15th century Leonardo da Vinci sketched designs for bird-like flying machines. But the modern era of flapping-wing drones started in the late 20th century with the advancements in materials science and lightweight electric motors. Until today it is mainly a research topic with potential applications in agriculture, search-and-rescue and environmental monitoring.

*Insect-inspired drones:*

![video](https://www.youtube.com/watch?v=ca6Yviy5w2c)
><sub>Kubeetle, bee inspired flapping wing drone. Available at: https://www.youtube.com/watch?v=ca6Yviy5w2c</sub>

- hovering
- smaller scale
- flapping frequency: 200-300Hz
- wings flap mainly forward and backward (horizontal plane)
- tailless control
- very agile, typically unstable
- power demanding

*Bid-inspired drones*:

![video](https://www.youtube.com/watch?v=hUE8o056Cpc)
><sub>Festo, BionicSwift 2021. Available at: https://www.youtube.com/watch?v=hUE8o056Cpc</sub>

- forward flight
- larger scale
- flapping frequency 2-20Hz
- wings flap mainly up and down (vertical plane)
- tail control
- passively stable
- glide-capable



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
<span style="color: red;">Question: treat as separate type or include as special case of rotor crafts and fixed wing drones?</span>


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


