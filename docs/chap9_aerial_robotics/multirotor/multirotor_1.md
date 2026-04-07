---
title: "9.4 Mathematical Tools"
parent: "Multirotor Drones"
layout: default
nav_order: 4
chapter: 9
section: 4
publish: true
nav_exclude: false
---
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

<link rel="stylesheet" href="../styles.css">

<!-- <a href="/docs/chap9_aerial_robotics/multirotor/multirotor_2" id="go-to-next" title="Go to Next Chapter">➡​</a> -->

# Multirotor Drones: Chapter 0

-Forewords
This course offers an introduction to the control of *multirotors*, a type of Unmanned Aerial Vehicle (UAV), i.e., drones. Multirotors are UAVs driven by several rotors that provide vertical lift and propulsion. A typical example is the *quadcopter*, an unmanned helicopter with four rotors, which can operate in confined spaces and requires only a small, flat area. Multirotors are similar in principle to helicopters in that they can take off and land vertically, making them ideally suited for operation in confined environments. Multirotor systems are highly maneuverable and can operate in hovering modes at low speeds with high stability. This is why they are so popular for a variety of applications, ranging from photography to inspection and surveillance.

This course covers methods for modeling and controlling multirotors, from stabilizing the drone to planning trajectories and controlling trajectory tracking. The course assumes several prerequisites, notably a foundation in control theory, which is covered in previous classes at [RAS University](https://www.ieee-ras.org/ras-university) (see list below).

- Table of Contents
{:toc}

## 1. Prerequisites
1. **Basic Mathematics**
  - Trigonometry
  - Linear algebra (vectors, matrices and basic matrix operations)

2. **Kinematics**[Kinematics]    
  - Coordinate transformations and rotation matrices

3. **Dynamics**[Dynamics]     
  Analysis of forces and their effects on motion, crucial for modeling and simulating drone behavior.

4. **PID Control**[Closeloop&PID]  
  Basics of Control Theory. Stability, Controllability etc.

5. **Model Predictive Control (MPC)**[MPC]    
  In the last chapter we will use mpc to control the drone. Previous knowledge is needed.

6. **Sensors and Sensing**[sensors-and-sensing]    
  Understanding the role of sensors like IMUs, GPS, and cameras in perceiving the environment and providing feedback for control. Have an idea about sensor fusion algorithms, especially the Kalman Filter. 

## 2. General Motivation

Since the 2000's the market for consumer quadcopters grows at a high speed. While the first available drones were difficult to control and tended to crash easily, nowadays the average multicopter on the market is highly performant, offers a great stability and is easy to control.  
This module about multicopters aims to provide you with the tools to model, simulate and control a multirotor drone. For the sake of simplicity all the steps will be shown on a quadcopter but are extendable to other multirotor drone configurations. At the end of the module there is a simulation exercise where you will need to control a drone to fly through gates as fast as possible.  
Until there we will first introduce the mathematical language for drone modeling to then later model a drone, derive the dynamics of a drone and finally present control strategies.

This page will establish the different reference frames needed to describe the position of a drone in 3D space and give a short refresher on how rotations in the 3d space are described mathematically.


## Chapter 0 : Mathematical tools for modelling and control of UAV's

### Coordinate System 
In order to control a drone we need to describe the position and orientation of the drone relative to a fixed frame. In this module we use the ENU convention which is standard in robotics.

The **world-fixed frame** or also **inertial frame** is a coordinate frame fixed at an arbitrary point on the ground (i.e. ground station or take-off point) and has the *x-axis* pointing East, the *y-axis* pointing North and the *z-axis* pointing up.  
For the rest of this module we will refer to this frame as the *world frame* and denote $\mathcal{W}$ or ${W}$ with its axes $\mathbf{x}_W$, $\mathbf{y}_W$, and $\mathbf{z}_W$.

<div class="note-box">
  <strong>Note: </strong>For the duration and speed of quadrotor flights in this course, we assume that the World Frame is an Inertial Frame. We neglect the rotation of the Earth (Coriolis effect) and the curvature of the Earth.
</div>


The **body frame** $\mathcal{B}$ or ${B}$ is a right-handed coordinate system fixed on the drone, typically located at its center of mass. Using the FLU convention it has the *x-axis* pointing forward to the nose/head, *y-axis* to the left and the *z-axis* pointing upwards. We denote them with $\mathbf{x}_B$, $\mathbf{y}_B$, and $\mathbf{z}_B$.

<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/multirotor/drone_frames.png" alt="World frame and body frame illustration." style="width: 90%; height: auto;">
  <p style="font-size: small;">Illustration of reference frames used in this module. The body frame is fixed on the drone while the world frame is fixed on the ground.</p>
</div>

For rotations of the drones we use the following convention:
1. *Roll angle* $\phi$ describes a rotation around the $\mathbf{x}_B$ axis.
2. *Pitch angle* $\theta$ describes a rotation around the $\mathbf{y}_B$ axis.
3. *Yaw angle* $\psi$ describes a rotation around the $\mathbf{z}_B$ axis.

The positive direction of the angles are defined using the right-hand-rule.

### Attitude Representation
The attitude is the orientation of the drone in the 3D space. We describe the orientation of the **body frame** $\mathcal{B}$ relative to the **world frame** $\mathcal{W}$ using a rotation. Below we will briefly describe three methods to do so for a drone: rotation matrices, Euler angles and quaternions.

#### Rotation Matrices
Rotation matrices provide the most fundamental and mathematically rigorous way to describe the orientation of a rigid body in a different frame. They are explained in more detail in the fundamental chapter about [kinematics](/docs/kinematics#chapter-1-coordinate-transformations-in-2D).

A **Rotation Matrix** $R\in \mathbb{R}^{3 \times 3}$ is a transformation that, when multiplied by a vector expressed in the body frame, yields the coordinates of that same vector expressed in the world frame. We will denote it by $R_\mathcal{B}^\mathcal{W}$.

If for instance $\mathbf{p}_B$ is a point measured in the body frame and $\mathbf{p}_W$ is the same point expressed in the world frame, the transformation is:

<script type="math/tex; mode=display">
\mathbf{p}_W = R_\mathcal{B}^\mathcal{W} \mathbf{p}_B
</script>

To construct the rotation matrix $R_\mathcal{B}^\mathcal{W}$ you simply express the basis vectors of the body frame ( $\mathbf{x}_B$, $\mathbf{y}_B$, $\mathbf{z}_B$) which then correspond to the columns of the rotation matrix:

<script type="math/tex; mode=display">
R_{\mathcal{B}}^{\mathcal{W}} =
\begin{bmatrix}
\vert & \vert & \vert \\
\mathbf{x}_B & \mathbf{y}_B & \mathbf{z}_B \\
\vert & \vert & \vert
\end{bmatrix}_{\mathcal{W}}
</script>

**Drawbacks**: While rotation matrices are mathematically complete, easy to use and simple to understand they have one big draw back which is the redundancy. They need 9 parameters to represent only three degrees of freedom which makes them computationally expensive.

#### Euler Angles
A more intuitive and compact way to express a rotation is with the euler angles. This representation uses three sequential rotations around the principal axes: *roll*, *pitch* and *yaw*.

The order in which these three rotations are applied matters. Rotating 90° in roll and then 90° in pitch results in a different final orientation than pitch and then roll. In robotics the standard convention is the $RPY$ sequence:
1. Rotate around the $\mathbf{x_1}$-axis (roll, $\psi$)
2. Rotate around the intermediate $\mathbf{y_2}$-axis (pitch, $\theta$)
3. Rotate around the final $\mathbf{z_3}$-axis (yaw, $\psi$)

<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/multirotor/drone_rotations.png" alt="Illustration for rotation angles." style="width: 90%; height: auto;">
  <p style="font-size: small;">Euler angles describe a sequence of rotations around the three principal axes. First the yaw-rotation around the z-axis, then a pitch rotation around th y-axis and finally a roll rotation around the x-axis are applied.</p>
</div>

The total rotation matrix $R_\mathcal{B}^\mathcal{W}$ is the product of the three individual elementary rotations:

$$
R_{tot} = R_\mathcal{B}^\mathcal{W} = R_\psi R_\theta R_\phi
$$

where the elementary rotations are:

<script type="math/tex; mode=display">
R_\psi =
\begin{bmatrix}
cos(\psi) & -sin(\psi) & 0 \\
sin(\psi) & cos(\psi) & 0 \\
0 & 0 & 1
\end{bmatrix}, \\
R_\theta =
\begin{bmatrix}
cos(\theta) & 0 & sin(\theta) \\
0 & 1 & 0 \\
-sin(\theta) & 0 & cos(\theta)
\end{bmatrix}, \\
R_\phi =
\begin{bmatrix}
1 & 0 & 0 \\
0 & cos(\phi) & -sin(\phi) \\
0 & sin(\phi) & cos(\phi)
\end{bmatrix}
</script>

**Singularities**:  
When using Euler angles you encounter singularities: some attitudes do not have an *unique* Euler angle representation. For a pitch angle of $\theta = \pm \pi/2$ there are infinite many RPY angles representing the same attitude. Mathematically the following product produces the same rotation matrix for any choice of $\delta$:

<script type="math/tex; mode=display">
  R = R_\psi(\delta) R_\theta(\pi/2) R_\phi(\alpha + \delta)
</script>

This phenomena is called *Gimbal lock*. Furthermore it is proven that no 3 parameter representation can be free of singularities. They occur whenever the second Euler angle aligns the first and third rotation axes causing the loss of a degree of freedom.

#### Unit Quaternions
To overcome singularities of euler angles and the redundancy of rotation matrices, a fourth parameter is sufficient. **Unit quaternions** integrate the idea to rotate an angle $\alpha$ around an arbitrary axis $\mathcal{v}$.

A quaternion $\mathbf{q}$ extends complex numbers into four dimensions. It consists of a scalar part $q_w$ (sometimes denoted $q_0$) and a vector part $\mathbf{q}_v = [q_x, q_y, q_z]^T$:

$$
\mathbf{q} = q_x i + q_y j + q_z k + q_w= \begin{bmatrix} \mathbf{q}_v  \\ q_w \end{bmatrix}
$$

The basis elements $i, j, k$ satisfy the fundamental Hamilton's rule: $i^2 = j^2 = k^2 = ijk = -1$.

If a point rotates by an angle $\alpha$ around a unit axis unit vector $\mathbf{v} = [v_x, v_y, v_z]^T$, the corresponding quaternion is:

$$
\mathbf{q} = \begin{bmatrix} \mathbf{v} \sin(\alpha/2) \\ \cos(\alpha/2) \end{bmatrix} = \begin{bmatrix} v_x \sin(\alpha/2) \\ v_y \sin(\alpha/2) \\ v_z \sin(\alpha/2) \\ \cos(\alpha/2) \end{bmatrix}
$$



<div class="note-box">
  <strong>Note: </strong>For a quaternion to represent a valid pure rotation, it must be a <strong>Unit Quaternion</strong>, meaning its norm must be equal to 1:
  <script type="math/tex; mode=display">\|\mathbf{q}\| = \sqrt{q_w^2 + q_x^2 + q_y^2 + q_z^2} = 1</script>
</div>

**Rotating a Vector**
To rotate a vector $\mathbf{p}_B$ (point in body frame) to $\mathbf{p}_W$ (world frame) using quaternions, we first treat the vector $\mathbf{p}$ as a "pure quaternion" (where the scalar part is 0).

<div class="note-box">
<strong>Definition:</strong> For a vector $\mathbf{p} = [x, y, z]^T$, the pure quaternion is defined as $\mathbf{p}' = [\mathbf{p}, 0]^T$.
</div>

The rotation is performed using the **Hamilton product** (denoted by $\otimes$) and the conjugate $\mathbf{q}^*$:

<script type="math/tex; mode=display">
\mathbf{p}_{W}' = \mathbf{q} \otimes \mathbf{p}_{B}' \otimes \mathbf{q}^*
</script>

Where the conjugate is $\mathbf{q}^* = [-\mathbf{q}_v, q_w]^T$.

_The Hamilton Product:_  
The Hamilton product of two quaternions $\mathbf{q}$ and $\mathbf{p}$ is determined by the distributive law and the fundamental rules of the basis elements:
<script type="math/tex; mode=display">
i^2 = j^2 = k^2 = ijk = -1
</script>

By expanding the product $\mathbf{q} \otimes \mathbf{p} = (q_w + q_x i + q_y j + q_z k)(p_w + p_x i + p_y j + p_z k)$, we obtain:

<script type="math/tex; mode=display">
\begin{aligned}
\mathbf{q} \otimes \mathbf{p} &= (q_w p_w - q_x p_x - q_y p_y - q_z p_z) \\
&+ (q_w p_x + q_x p_w + q_y p_z - q_z p_y)\mathbf{i} \\
&+ (q_w p_y - q_x p_z + q_y p_w + q_z p_x)\mathbf{j} \\
&+ (q_w p_z + q_x p_y - q_y p_x + q_z p_w)\mathbf{k}
\end{aligned}
</script>

_Compact Vector Form:_  
A more concise way to express this product is using the scalar and vector parts. Given $\mathbf{q} = [\mathbf{q}_v, q_w]^T$ and $\mathbf{p} = [\mathbf{p}_v, p_w]^T$:

<script type="math/tex; mode=display">
\mathbf{q} \otimes \mathbf{p} =
\begin{bmatrix}
q_w \mathbf{p}_v + p_w \mathbf{q}_v + \mathbf{q}_v \times \mathbf{p}_v \\
q_w p_w - \mathbf{q}_v \cdot \mathbf{p}_v
\end{bmatrix}
</script>

This vector form is particularly useful for implementation in code.



**Composition of Rotations**  
Unlike Euler angles, composing rotations with quaternions is straightforward and computationally efficient. If we have a rotation $\mathbf{q}_1$ followed by a rotation $\mathbf{q}_2$, the total rotation is simply the product of the two quaternions:

<script type="math/tex; mode=display">
\mathbf{q}_{tot} = \mathbf{q}_2 \otimes \mathbf{q}_1
</script>

**Drawbacks**:
- **Double Cover**: The quaternions $\mathbf{q}$ and $-\mathbf{q}$ represent the exact same rotation. This can cause control issues if the controller tries to take the "long way around" to get to the negative quaternion.
- **Visualization**: Unlike Euler angles ($30^\circ$ roll), quaternions are not human-readable. You cannot look at $[0.707, 0, 0.707, 0]$ and immediately visualize the orientation without calculation.

Due to these two points we will continue to use rotation matrices for the rest of this module. Quaternions remain nevertheless a powerful mathematical tool.


<div class="note-box">
  <strong>Note: </strong>Here we only looked at pure rotations assuming that the body and world frame share the same origin. In reality this is never the case and we need to use a translation as well. If we know the coordinate of a point $\mathbf{b}$ in the body frame and want to express it in the world frame we can use:

  <script type="math/tex; mode=display">
    \mathbf{b}_W = R_B^W \mathbf{b}_B + \mathbf{p}_W
    </script>
  Where $\mathbf{p}_W$ is the relative pose of the body frame expressed in the world frame. <br>
  Are more compact and mathematically more interesting way of representing these transformations are with the use of <bold>homogenous</bold> matrices. They were introduced in the chapter about Kinematics and won't be repeated here.
</div>


### Exercises

**Exercise 1:**
Prove that the following expression is indeed independent of $\delta$:
<script type="math/tex; mode=display">
  R = R_\psi(\delta) R_\theta(\pi/2) R_\phi(\alpha + \delta)
</script>

<details markdown="1">
<summary><strong>Solutions</strong></summary>

**Exercise 1**:
Let us proceed by inspection and compute the product $R_z(\delta) R_y(\pi/2)$.
Recalling that $\psi, \theta, \phi$ correspond to rotations around $z, y, x$:

$$
R_z(\delta) R_y(\pi/2) = \begin{bmatrix} \cos(\delta) & -\sin(\delta) & 0 \\ \sin(\delta) & \cos(\delta) & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 0 & 0 & 1 \\ 0 & 1 & 0 \\ -1 & 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -\sin(\delta) & \cos(\delta) \\ 0 & \cos(\delta) & \sin(\delta) \\ -1 & 0 & 0 \end{bmatrix}
$$

Now doing the overall multiplication with the third matrix $R_x(\alpha + \delta)$:

<script type="math/tex; mode=display">
\begin{aligned}
R_{tot} &= \begin{bmatrix} 0 & -\sin(\delta) & \cos(\delta) \\ 0 & \cos(\delta) & \sin(\delta) \\ -1 & 0 & 0 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos(\alpha + \delta) & -\sin(\alpha + \delta) \\ 0 & \sin(\alpha + \delta) & \cos(\alpha + \delta) \end{bmatrix} \\
&= \begin{bmatrix} 
0 & -\sin(\delta)\cos(\delta + \alpha) + \cos(\delta)\sin(\delta + \alpha) & \sin(\delta)\sin(\delta + \alpha) + \cos(\delta)\cos(\delta + \alpha) \\ 
0 & \sin(\delta)\sin(\delta + \alpha) + \cos(\delta)\cos(\delta + \alpha) & \sin(\delta)\cos(\delta + \alpha) - \cos(\delta)\sin(\delta + \alpha) \\ 
-1 & 0 & 0 
\end{bmatrix}
\end{aligned}
</script>

Using the trigonometric difference identities $\sin(A-B)$ and $\cos(A-B)$, where $A=(\delta+\alpha)$ and $B=\delta$:

$$
\begin{bmatrix} 
0 & \sin((\delta + \alpha) - \delta) & \cos((\delta + \alpha) - \delta) \\ 
0 & \cos((\delta + \alpha) - \delta) & -\sin((\delta + \alpha) - \delta) \\ 
-1 & 0 & 0 
\end{bmatrix} = \begin{bmatrix} 
0 & \sin(\alpha) & \cos(\alpha) \\ 
0 & \cos(\alpha) & -\sin(\alpha) \\ 
-1 & 0 & 0 
\end{bmatrix}
$$

The result is **independent from $\delta$**, proving the claim.
</details>

**Exercise 2:**

Imagine a mapping drone flying horizontally over a field to map crops. A 3D camera is rigidly mounted on the drone's body to point straight down. We detect a Point of Interest (**POI**) in the camera's frame ($\mathcal{C}$) and want to find its global position in the World Frame ($\mathcal{W}$) to create a map of the field.

_Camera Reference Frame Definition ($\mathcal{C}$)_:  
The camera frame is a standard right-handed frame fixed at the camera's optical center:
* **$\mathbf{x}_{\mathcal{C}}$:** Points to the image sensor's **right**.
* **$\mathbf{y}_{\mathcal{C}}$:** Points to the image sensor's **bottom**.
* **$\mathbf{z}_{\mathcal{C}}$:** Is perpendicular to the image sensor's plane pointing **forward** .

Refer to the drawing below.
<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/multirotor/chapter0_ex2_all.svg" alt="Illustration of the camera position on the drone used for exercise 2." style="width: 70%; height: auto;">
  <p style="font-size: small;">Drawing of the camera positioned on the drone.</p>
</div>

_Given Information:_

1.  **POI position in Camera Frame:** <script type="math/tex; mode=display">\mathbf{p}_{\mathcal{C},POI} = [x_{\mathcal{C}}, y_{\mathcal{C}}, z_{\mathcal{C}}]^T = [0.5m, 0m, 4m]^T</script>.
2.  **Camera position in Body Frame:** <script type="math/tex; mode=display">\mathbf{p}_{\mathcal{B}, \mathcal{C}} = [x_{\mathcal{B}}, y_{\mathcal{B}}, z_{\mathcal{B}}]^T</script> (Offset from the drone's center of mass to the camera's origin). Refer to the drawing and take $a=b=0.1m$.
3.  **Drone position in World Frame:** <script type="math/tex; mode=display">\mathbf{p}_{\mathcal{W}, \mathcal{B}} = [x_{\mathcal{W}}, y_{\mathcal{W}}, z_{\mathcal{W}}]^T = [50m, 20m, 6m]^T</script>
4.  **Drone orientation (Yaw) in World Frame:** <script type="math/tex; mode=display">\psi = 30°</script>
<div class="note-box">
<strong>Assumption:</strong> The drone is flying completely horizontally, hence: <script type="math/tex; mode=display">\phi = 0, \theta = 0</script>.
</div>

_Task:_
Find the total position of the POI in the World Frame, $\mathbf{p}_{\mathcal{W}, POI}$, as a function of the given parameters.

<details markdown="1">
<summary>Hints</summary>

<details markdown="1">
<summary>Hint 1</summary>

Start by understanding the transformation chain. The total transformation involves three steps:
1. Rotate the point from the Camera frame to the Body frame using $R_{\mathcal{C}}^{\mathcal{B}}$.
2. Add the offset $\mathbf{p}_{B, C}$ to account for the camera's position relative to the drone's center of mass.
3. Rotate the result from the Body frame to the World frame using $R_{\mathcal{B}}^{\mathcal{W}}$ and add the drone's position $\mathbf{p}_{\mathcal{W}, \mathcal{B}}$ in the World frame.

</details>

<details markdown="1">
<summary>Hint 2</summary>

To calculate $R_{\mathcal{C}}^{\mathcal{B}}$, express the basis vectors of the Camera frame $\mathbf{x}_C, \mathbf{y}_C, \mathbf{z}_C$ in terms of the Body frame. Use the given definitions of the Camera frame axes relative to the Body frame.

</details>

<details markdown="1">
<summary>Hint 3</summary>

For $R_{\mathcal{B}}^{\mathcal{W}}$, since $\phi = 0$ and $\theta = 0$, the rotation matrix simplifies to a pure yaw rotation around the Z-axis:
<script type="math/tex; mode=display">
R_\psi =
\begin{bmatrix}
cos(\psi) & -sin(\psi) & 0 \\
sin(\psi) & cos(\psi) & 0 \\
0 & 0 & 1
\end{bmatrix}
</script>
Substitute the given yaw angle $\psi$ to compute the matrix.

</details>

</details>

<details markdown="1">
<summary>Solution</summary>
We have:
<script type="math/tex; mode=display">
  \mathbf{p}_{C, POI} = \begin{bmatrix}0.5m\\0m\\4m \end{bmatrix}, \mathbf{p}_{B, C} = \begin{bmatrix}0.1m\\0m\\-0.1m\end{bmatrix},
</script>

<script type="math/tex; mode=display">
R_{\mathcal{C}}^{\mathcal{B}} =
\begin{bmatrix}
0 & -1 & 0 \\
-1 & 0 & 0 \\
0 & 0 & -1
\end{bmatrix}
</script>

This gives us the POI expressed in the Body frame:
<script type="math/tex; mode=display">
  \mathbf{p}_{B, POI} = \mathbf{p_{B, C}} + R_{\mathcal{C}}^{\mathcal{B}} \quad \mathbf{p}_{C, POI} = \begin{bmatrix}0.1m\\-0.5m\\-4.1m \end{bmatrix}
</script>

For $\psi=30°$ we get:

<script type="math/tex; mode=display">
R_{\mathcal{B}}^{\mathcal{W}} =
\begin{bmatrix}
cos(30) & -sin(30) & 0 \\
sin(30) & cos(30) & 0 \\
0 & 0 & 1
\end{bmatrix}
</script>

Leading to the **final result**:
<script type="math/tex; mode=display">
  \mathbf{p}_{W, POI} = \mathbf{p_{W, B}} + R_{\mathcal{B}}^{\mathcal{W}} \quad \mathbf{p}_{B, POI} = \begin{bmatrix}50.34m\\19.62m\\1.9m \end{bmatrix}
</script>

</details>

### Other prerequisites
Link to other foundations that are needed such as mpc, optimization and

## Additional Resources

### Credits:
<!-- List all the sources that you used to create the page   -->
This course page was created by **Lisa Romana Schneider, MSc in Robotics at EPFL**, under supervision of **[Dr. Charbel Toumieh](https://scholar.google.com/citations?user=34d6O30AAAAJ&hl=en)** and **[Prof. Aude Billard](https://scholar.google.com/citations?user=tM4JMcQAAAAJ&hl=en&oi=ao)**, and funded by **IEEE RAS** and **EPFL**.

This course page is partly based on the Aerial Robotics class taught by [Prof. Dario Floreano](https://people.epfl.ch/dario.floreano) at EPFL (Ecole Polytéchnique Fédérale de Lausanne).

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->
[Introduction to Multicopter Design and Control (Quan Quan)](https://link.springer.com/book/10.1007/978-981-10-3382-7)- Textbook offering a systematic overview over multicopters from basic design guidelines to high-level control. 


<div class="page-navigation">
  <a href="/docs/chap9_aerial_robotics/multirotor/multirotor_2"
     id="go-to-next"
     title="Go to Next Chapter">➡</a>
</div>

