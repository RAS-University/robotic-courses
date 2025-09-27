---
title: Unmanned Aerial Vehicles
parent: Courses
layout: default
nav_order: 7
---

<script src="questions.js"></script>

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

## 3. Course Content
This course aims to give an introduction to aerial robotics and provide an overview over different drone types, their aerodynamical principles and their associated cost and benefits.

### Chapter 0 : Introduction to aerodynamic principles

On the image below you see in <span style="color: #FFAA00;">yellow</span> a flying object - here you can think of it as the profile of a wing. Suppose the wing is moving the direction of the <span style="color: #020FA4;">blue</span> vector. What kind of forces are acting on it? There is of course the gravity coming from the weight of the wing - here in <span style="color: black;">black</span>. The force that makes the wing stay in the air - instead of being restrained to the ground as us humans - is called <span style="color: #C20000;">*lift*</span> force. But the wing is not simply hovering in the air, it moves in the <span style="color: #020FA4;">direction of movement</span>. The force making this possible is the <span style="color: #02E308;">*thrust*</span>, which is counteracted by the *drag*. For a wing we call the angle between the direction of movement and the centerline of the wing the *angle of attack*. 

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/Lift-force-en.svg" alt="Illustration of lift, drag and thrust force." style="width: 450px; height: auto;">
  <p style="font-size: small;">The figure illustrates lift, thrust and drag force. Schema by <a href="https://commons.wikimedia.org/wiki/File:Lift-force-en.svg" target="_blank">Bartosz Kosiorek</a></p>
</div>

The three most important forces when it comes to drones are lift, thrust and drag. For simplicity, lift and drag will be explained on a fixed wing aircraft - i.e. an airplane. The next chapter will cover how for different drone types, lift and thrust is generated. But it is important to get a basic grasp of what the forces are now.

<!-- <div class="disclaimer-panel"> -->
<div style="background-color: #f0f0f0; border-left: 4px solid #999; padding: 1em; margin: 1.5em 0; font-size: 0.95em; color: #333; border-radius: 4px;">
  <strong>Disclaimer:</strong> Aerodynamic is an entire subject on it's own. This chapter will not be a full or complete module. It rather aims to provide you with the necessary tools and intuition to understand the relevant aspects of aerodynamics related to drones. This is crucial to understand how drones are controlled.
</div>

#### Drag
When an object moves through a fluid there is a resistive force acting in the opposite direction of motion. Often referred to as air resistance, the drag force depends on the air density, the shape of the moving object and *quadratically* to the speed of the drone. It is always **parallel** to the flow direction. 

To grasp this in more detail, please watch the video below from **0:10** until **10:37** or read the description beneath it:

![video](https://www.youtube.com/watch?v=GMmNKUlXXDs)
><sub>Understanding Aerodynamic Drag by The Efficient Engineer. Available at: https://www.youtube.com/watch?v=GMmNKUlXXDs</sub>

<details markdown='1'>
  <summary><strong>Description of the video</strong></summary>

  The fluid flowing around an object exerts a force on it. You can split the force in two parts:
  - one perpendicular to the flow direction, which is called *lift*.
  - and on in the opposite direction of movement - the *drag*.

  In air, we call these forces aerodynamic forces.
   
  Here we only focus on the drag force. The drag force is usually an undesirable force - it slows your object down or in other words you need more energy to advance in the fluid and loose in efficiency. Therefore engineers usually try to minimize the drag - if it is a car, a boat or an airplane. The same goes for drones. But what exactly does cause drag?
  The cause of drag can be decomposed into two effects:
  1. shear stresses acting tangential to the surface and are caused by frictional forces due to the fluids viscosity. This is the **friction drag**.
  2. pressure stresses acting perpendicular to the surface and are caused by how the pressure is distributed around a object. This is the **pressure drag** or sometimes **form drag**.
  The sum of these two effects in the direction of movement is the drag.

  **Pressure Drag**:
   
  Pressure drag is the strongest for blunt bodies like a ball. It is caused by difference in pressure in front and rear of an object. Pressure drag increases *significantly* in case of flow separation, which is the case when the fluids boundary layer detaches from the body. This causes a recirculating flow, significantly decreasing the pressure behind the body. This is called the *separation region*. To reduce drag forces, you want to minimize flow separation at all cost. Flow separation can also lead to vortex creation, which can lead to instability and turbulence. Why does flow separation occur to begin with?
  
  When the fluid passes over the surface of the sphere it initially accelerates and the pressure decreases in the flow direction. Beyond a certain point the flow then decelerates and the pressure starts increasing. The increase in pressure pushes the fluid backward. But due to the oncoming fluid it cannot travel back, forcing to to detach from the surface, resulting in flow separation. The flow separation occurs at 80° for a smooth sphere in laminar flow. In case of a turbulent flow it can delay until 120° which drastically reduces the drag. This is because the mixing between different flow layers which transfers momentum to the fluid allowing them to sustain a larger pressure difference. That is why for example a golf ball has dimples instead of being completely smooth. The turbulence caused delays flow separation, reduces drag and hence allows the ball to travel further.
  Bodies traveling through fluid like plane wings or racing cars are usually designed in *tear-drop* shape to minimize flow separation. Flow separation is delayed so much or doesn't occur at all, that pressure drag is greatly reduced. For these type of objects it's the shear stresses that contribute most to the total drag force.

  **Friction Drag**:
  
  Friction drag increases with the viscosity of the fluid and the surface of area aligned with the direction of flow. While turbulence decreases pressure drag by delaying the flow separation, it has the opposite effect on friction drag. Laminar and turbulent boundary layers show very different velocity profiles. Turbulence boundary layers have a higher velocity gradients and thus produces larger shear stress. Hence to reduce friction drag, you want to maintain laminar flow for the largest possible distance around the object. 

  If you would manage to maintain laminar flow over   wings of commercial aircraft, could reduce the total drag by 10-15%. But this is very hard to achieve and is an open question in research. One idea that was partially successful is the so called hybrid-laminar flow control, where air is suck downwards along the surface of the wing. Another possibility is to reduce the effect of turbulent flow on friction drag. One interesting research aspect there looks at the microstructure of shark skin.

  We have seen that the magnitude of friction and pressure drag depends on the magnitude of a body relative ot the direction of flow. An obvious example is flat plat at 90° angle to the direction flow. The flow separates easily, creating a separation region and the pressure drag is large. In this case friction drag is almost zero, since shear stresses are not aligned with the drag direction. However if you turn the plate by 90° such that the surface is aligned with the direction of flow, we have a very streamlined body and the pressure drag is small. But the friction is now much more significant. 
  The same logic applies to airfoils, where the angle of attack - i.e. the angle between the centerline of a wing and the direction of flow - has a large influence on the drag force. At high angles of attack (AOA) separation occurs, which significantly increases the drag force. In general it is important to remember that friction drag increases as pressure drag decreases and so these two aspects need to be carefully balanced.

  **Drag Force Calculation**:
  
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
      'Correct! Minimizing total drag requires balancing pressure drag and friction drag. A fully streamlined shape reduces pressure drag but can increase friction drag due to larger surface area.',
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

#### Lift

Gravity holds everyone of us on the ground. To stay in the air, the gravitational force must be compensated. The force pointing in the opposite direction of the gravity is called lift force. The lift force is always **perpendicular** to the direction of the airflow and for most drone types the lift force is generated by the morphology of the wing or the propeller. To fly stable in the air, the parallel part of the lift force must equal the gravitational force.

![video](https://youtu.be/E3i_XHlVCeU?si=uvFe0pPcO3qpL0Z3&t=5)
><sub>Understanding Aerodynamic lift by The Efficient Engineer. Available at: https://youtu.be/E3i_XHlVCeU?si=uvFe0pPcO3qpL0Z3&t=5</sub>

<details markdown='1'>
  <summary><strong>Description of the video</strong></summary>
  Since well before the first  Wright brothers flight in 1903, and all the way to the present day, mankind  has been fascinated by taking to the skies. Once thought to be impossible, heavier-than-air  flight is only a reality because of the lift generated by aircraft wings. But lift is a complicated topic,  and even to this day engineers have  lengthy debates about how it's created. So what exactly is lift? When fluid flows past an object, or an object like this plane wing moves through a stationary  fluid, the fluid exerts a force on the object, which can be split into a component acting in the  same direction as the fluid flow, called drag, and a component acting perpendicular  to the flow direction, called lift. When talking about lift we're mostly interested  in streamlined bodies like this airfoil, which are carefully designed to produce  a lot of lift, but to minimise drag. Lift-producing airfoils can  obviously be found in airplane wings, but also in many other applications, like  wind turbine blades, or propeller blades. They're also used in the wings of Formula 1 cars, which are designed to generate downforce so that corners can be taken at higher speeds. Airfoils come in a huge range of shapes and sizes. One designed for an aircraft wing won't be optimised for a propellor blade, for example. And a wing designed to fly at supersonic speeds will have a very different profile compared to one designed to fly slower than the speed of sound. 

  Airfoil profiles can be defined using a few different parameters. The forward-most edge of the airfoil is called the leading edge, and the trailing edge is at the back of the airfoil. Drawing a straight line between the leading and trailing edges gives us the chord line. The angle between the chord line and the flow direction is called the angle of attack. Drawing a line which is midway between the upper and lower surfaces gives us the mean camber line. Camber describes how curved an airfoil is. We can have positive camber or negative camber, and a symmetrical airfoil has zero camber. Camber and the angle of attack are important parameters that will have a large influence on how much lift an airfoil can generate. 

  Pressure Distribution
  So how does a humble teardrop shape generate enough force to lift heavy aircraft off the ground? As the fluid flows around the airfoil it creates two different types of stress which act on its surface. First we have the wall shear stresses. These stresses act tangential to the object's surface, and are caused by the frictional forces that act on the airfoil because of the fluid's viscosity. Then we have the pressure stresses. They act perpendicular to the object's surface, and are caused by how pressure is distributed around it. Lift is the resultant of these two stresses in the direction perpendicular to the flow. The only way a fluid can impart a force onto an object is through these stresses. Integrating the stresses in the lift direction over the surface of the airfoil gives us the lift force. For streamlined bodies like airfoils, the shear stresses will mostly be acting in the same direction as the flow. They will make a large contribution to the drag force, but won't contribute a significant amount to the lift force. And so we can neglect them and say that the lift acting on an airfoil is caused by the way pressure is distributed around it. A typical pressure distribution looks something like this. The pressure is low above the airfoil and high below it, which creates a net force with a large component in the lift direction. If we plot the pressure profile along the top and bottom surfaces, we can see that the low pressure on the top surface is larger in magnitude than the high pressure on the bottom surface. So the suction pressure on the top surface is what contributes most to the total lift force. We can also see that the majority of the pressure difference is coming from the forward-most part of the airfoil. In truth there's nothing particularly special  about the shape of an airfoil that allows it to generate lift. Any object that creates an uneven  pressure distribution will generate a force in the lift direction, like a flat plate at an angle  relative to the flow, for example. Airfoils are just optimised shapes that have been carefully  designed to have high lift-to-drag ratios. Without a difference in pressure above  and below an object there can be no lift. 

  A symmetrical body like this bullet  doesn't generate any lift force because there's no pressure difference around it. So we know that lift is caused by the pressure   distribution around the airfoil. But where  does the pressure distribution come from? The answer to this question is complex, and  there's much debate about the best way to explain it in a concise way. We can broadly  split the different explanations into two groups - those based on Bernoulli's Principle  and those based on Newton's third law. Bernoulli's Principle explanations  focus on the velocity of the fluid.  If we look at how fluid flows around the airfoil,  we can see that close to the leading edge there's a point where the fluid velocity is reduced  to zero - this is called the stagnation point. Outside of the thin boundary layer surrounding the  airfoil, the fluid flowing above the stagnation point, over the top surface of the airfoil, travels faster than the fluid travelling over the bottom  surface, as we can see from these particles.  Bernoulli's Principle tells us that  when the velocity of a fluid increases,  it's pressure must be reduced, which is just  a statement of the conservation of energy. This means that the increase in velocity above  the airfoil creates an area of lower pressure, and the reduction in velocity below  it creates an area of higher pressure, and this pressure difference  creates the lift force. But then we need to explain what  causes the difference in velocity. One explanation is that the geometry of an airfoil  causes the flow to be pinched together above the   airfoil, but not below it. Because of the conservation of mass,   this results in increased  velocity above the airfoil. A more complete but less intuitive  explanation for the difference in velocity is based on the concept of circulation. The flow around an airfoil can be thought of as the superposition of idealised uniform  irrotational flow, and circulatory flow.  Without circulation, the flow around  the airfoil would look like this. This is clearly non-physical, since the  fluid can't turn such a sharp corner at the trailing edge, and so the airfoil  must be generating some circulation.  If we impose a condition that says that  the flow above and below the airfoil must   be parallel when leaving the trailing edge, we  can calculate the exact amount of circulation   that must be generated by the airfoil to do  this. This is called the Kutta condition.  Circulation has the effect of accelerating the  flow above the airfoil and delaying the flow below it, which gives us the explanation we need  so that we can apply Bernoulli's Principle. 

  Newtons Third Law
  What about the explanations of lift  that are based on Newton's third law? These don't consider the velocity  above and below the airfoil but instead look more generally  at the behaviour of the fluid. If we look at a wider area we can observe  that the effect of an airfoil can be felt far beyond its immediate vicinity. Upstream of  the airfoil the flow is being swept upwards, which is called upwash. And downstream the  flow is deflected downwards, which is called downwash. A very large volume of air  is being displaced by the airfoil. Newton's third law tells us that for every  action there is an equal and opposite reaction. The airfoil must be imparting a  force on the air to create the downwash, and so based on Newton's third law, there must  be a corresponding reaction force acting on the airfoil. In other words an airfoil generates  lift by turning the incoming air downwards. We can use the concept of circulation  again, this time to explain how the upwash and downwash are created. 
  In summary, a lift force acts on an airfoil because of the pressure distribution around it.  The exact cause of this pressure distribution is complex, and can be explained in several  different ways, which approach the problem from different angles. Explanations based  on Bernoulli's Principle and on Newton's Third Law provide valuable insight into how  lift is generated, although both approaches have limitations, partly because they're  based on cause-and-effect relationships. The problem is that there isn't always  a clear cause-and-effect relationship between the different phenomena which  are involved in generating lift, whether we're talking about the fluid velocity,  the pressure distribution around the airfoil, Cause Effect Relationshipor the down-turning of the fluid. In reality  all of these things are happening simultaneously and are mutually interacting. Nevertheless, these explanations are useful and can lead to a more  intuitive understanding of lift. We can easily imagine for example that  increasing the camber of an airfoil will allow it to deflect a larger amount of  fluid, and so will increase the lift force.   The same is true for the angle of  attack. Increasing the angle of attack deflects more fluid and increases lift. However there are limits to this logic. Once the angle of attack reaches a  certain critical value, we can observe a sudden decrease in the lift force. For this  airfoil it occurs at around 16 degrees.  At this angle of attack the boundary layer  is no longer able to remain attached to the airfoil and it detaches from the surface,  creating a wake behind it which affects the pressure distribution around the airfoil,  significantly reducing lift and increasing drag. I covered flow separation in detail  in my video on aerodynamic drag. The sudden reduction in lift is called stalling,  and it can be very dangerous for aircraft. Different airfoil shapes can have drastically  different lift characteristics. This airfoil is cambered. If  an airfoil is symmetrical, and so has zero camber, the lift force  will be zero for zero angle of attack. Aerobatic aircraft usually use symmetrical  airfoils since they allow planes to fly upside down more easily. Lift is generated by lifting the  nose of the plane to create an angle of attack. Aerobatics
  Modern aircraft wings are equipped with  flaps and slats which allow the shape of the airfoil to be adjusted and optimised  for the different phases of flight. During take-off for example you want high lift.  Extending the flaps increases the camber of the wing, which increases lift, and so flaps are  extended during take-off. But the extra lift comes at the expense of increased drag, and so  the flaps are retracted when cruising, since high lift is no longer needed and drag should  be minimised to improve fuel consumption.

</details>

<!-- $C_L=\frac{L}{1/2\rho S v^2}$\\ -->
$L=C_L\frac{1}{2}\rho Sv^2$


$L$:    lift force \\
$C_L$:  lift coefficient, depending on the morphology of the object\\
$\rho$: air density\\
$S$:    wing area\\
$v$:    airspeed



#### Thrust

Thrust is the mechanical force that propels an object forward. According to Newton’s Third Law of Motion — *"for every action, there is an equal and opposite reaction"* — thrust is generated when a system expels mass in one direction, producing an equal force in the opposite direction. There are various way of generating thrust, here three common methods in aerial robotics are explained.

*Propellers*:

![video](https://www.youtube.com/watch?v=6FAcVRBx0kc)
><sub>Propelling Flight: The Science of Propellers. Available at: https://www.youtube.com/watch?v=6FAcVRBx0kc</sub>


Propellers are twisted airfoils, spinning at high speed and thus pushing air backward. As a reaction the vehicle is pushed forward. To create an uniform lift force, the section of the propellers changes because the outer part of the propellers turn at a higher speed than the inner part of it. There are a lot of different possible curvature, blade pitch and number of blades, balancing thrust generation against drag.

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
A ducted fan is a small, high speed propeller enclosed in a cylindrical duct that accelerates air through a narrow channel.They work similarly to open propellers but are more efficient in certain conditions, as the duct helps streamline airflow, increase static thrust, and reduce tip vortices. Ducted fans also tend to produce less noise, making them ideal for compact aerial vehicles like drones where reduced acoustic signature and improved efficiency are important.


<span style="color: red;">Question: How much rewrite what is said in videos?</span>

#### Conditions to fly
With these three basic forces, we can understand how aircraft fly. 

<div style="display: flex; justify-content: flex-start; align-items: center;">
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
</div>


Watch the following video to see how the magnitude of these forces are changing during take-off of an airplane.

![video](https://www.youtube.com/watch?v=BxOeuovzT88)
><sub>4 Forces on Aircraft during the Take-off. Available at: https://www.youtube.com/watch?v=BxOeuovzT88</sub>

### Chapter 1 : Drone Types and Use Case

#### Rotorcrafts:

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


#### Flapping Wings:
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



#### Fixed wing drones
A fixed-wing aircraft is a machine that uses a combination of fixed lifting surfaces (wings) and of forward thrust to fly. They must move forward to generate lift and can thus not take off vertically. 
![video](https://youtu.be/pz4SqIvoyO8?si=tcYfG70DWBQ8RylY&t=9)
><sub>Sensefly Ebee X. Available at: https://youtu.be/pz4SqIvoyO8?si=tcYfG70DWBQ8RylY&t=9</sub>

- higher lift to drag ratio than multicopters --> energetically more efficient
- fuselage contributes to lift generation and provides space for carge
- less agile than multicopters

*History*:

First human gliding flight by George Cayley in 1852, where he identified the four forces lift, weight, drag and thrust. After him Otto Lilienthal (1860-1896) built and flew thousands of gliders, which allowed him to formulate the first equations of aerodynamics. Later the Wright brothers made flight steerable by adding lateral control surfaces and made the first engine powered flight in 1903. Afterwards during the World War I, there was rapid development due to the military use. Since then fixed-wing aircrafts are indispensable for civil and military aviation. 




#### Morphing drones 
<span style="color: red;">Question: treat as separate type or include as special case of rotor crafts and fixed wing drones?</span>


Fixed wing drones that can change shape of the wings, or rotorcrafts that can change frame morphology to pass through narrow gaps

➖adds mechanical complexity


### Chapter 2 : Cost and Benefits

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


