---
title: Vision for Robotics
parent: Courses
layout: default
---

<!-- Link external JavaScript file -->
<script src="questions.js"></script>

# Vision for Robotics {#start}

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

![img-description]({{ site.baseurl }}/assets/images/Vision/banner.png)

- Table of Contents
{:toc}


## 1. Prerequisites
To get the most out of this Vision for Robotics module, it’s helpful to have:

**Basic Mathematics**  
   - Familiarity with **trigonometry** (sine, cosine, angle addition formulas).  
   - Understanding of **linear algebra** (vectors, matrices, basic matrix operations).  
   - Comfort with **calculus** (especially differentiation).

While you don’t need to be an expert in any one of these areas, having a comfortable grasp of each will make your study of vision for robotics more productive and enjoyable.

If you'd like a refresher on linear algebra, the following YouTube series is an excellent resource.

- [Essence of linear algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) 

## 2. General Motivation

Cameras have become one of the most accessible and data-rich sensors for robots, offering a wealth of visual information compared to traditional positioning or distance sensors. Advances in hardware and algorithms, such as RGB-D cameras and visual-inertial fusion techniques, have significantly improved robot perception. In navigation, robots use vision to detect obstacles, estimate trajectories, and build 3D maps of their environment. For grasping, visual data helps identify objects, estimate their pose, and determine how to interact with them. The following sections will explore the geometric foundations of 3D vision and its applications in robotic grasping.

The following videos demonstrate an application of vision in robotics.

![](https://www.youtube.com/watch?v=GkM4n7RgGaw)

## 3. Course Content

### Chapter 0 : Introduction
Welcome to this introduction on how a camera projects the three-dimensional (3D) world onto a two-dimensional (2D) image plane. We will discuss how to describe a point in 3D space with respect to a camera coordinate system and how these 3D points get projected into pixel coordinates on an image. We will then move on to intrinsic calibration and the issue of lens distortion.

By the end of this chapter, you should understand:

- How a 3D point is projected onto a 2D image plane using the pinhole camera model.

- The role of intrinsic and extrinsic camera parameters in this projection process.

- How lens distortion affects images and how it is mathematically modeled.

- How to perform camera calibration to recover intrinsic parameters.

- How to estimate the pose of a camera using known 3D landmarks (PnP problem).

- How to use Structure from Motion (SfM) for sparse 3D reconstruction from video.

- How 3D vision techniques apply to robot navigation and grasping tasks.

We will keep the mathematical notation to a minimum but include enough details to grasp the core ideas. Small exercises are included to reinforce these concepts.

This course closely follows the Chapter 32: 3-D Vision for Navigation and Grasping from the book *Springer Handbook of Robotics*. Which can be read below.

<iframe src="{{ site.baseurl }}{{'/assets/pdfs/Vision/nav-vision.pdf'}}" width="100%" height="600px"></iframe>

Here are 2 introduction videos to help understand the core problem.

![Intro to Machine Vision and Robotics - part 1](https://www.youtube.com/watch?v=SVcOWYfsBkc)

![Intro to Machine Vision and Robotics - part 2](https://www.youtube.com/watch?v=RS-MXFX0ehs&t=402s)

<details markdown="1">
  <summary>Conceptual questions</summary>

  <p><strong>Question 1:</strong> 	A short exposure / high shutter speed minimises motion‑blur, but it also means you need stronger lighting to obtain a clear image</p>
  <form id="intro-tf-5"><input type="radio" name="intro-tf-5" value="True"> True <br>
  <input type="radio" name="intro-tf-5" value="False"> False <br>
  <button type="button" onclick="checkTrueFalse('intro-tf-5','True','✅ Exactly – brighter light lets you keep the shutter open for a shorter time.','❌ Think about night‑time photos vs daylight.')">Check</button><p id="intro-tf-5-feedback"></p></form>

  <p><strong>Question 2:</strong> 		For best contrast, you should always illuminate a coloured part with LEDs of the same colour as the part (e.g., red part → red light).</p>
  <form id="intro-tf-6"><input type="radio" name="intro-tf-6" value="True"> True <br>
  <input type="radio" name="intro-tf-6" value="False"> False <br>
  <button type="button" onclick="checkTrueFalse('intro-tf-6','False','✅ Right – you usually use the *complementary* colour (opposite on the wheel).','❌ Review the complementary‑lighting examples at ~3 min in video 2.')">Check</button><p id="intro-tf-6-feedback"></p></form>
  
  <p><strong>Question 3:</strong> Increasing the camera’s megapixel count always yields better results in high‑speed robot pick‑and‑place applications.</p>
  <form id="intro-tf-2"><input type="radio" name="intro-tf-2" value="True"> True <br>
    <input type="radio" name="intro-tf-2" value="False"> False <br>
    <button type="button" onclick="checkTrueFalse('intro-tf-2','False','✅ Exactly — more pixels ⇒ more data ⇒ slower processing.','❌ Remember that more data is not always better!')">Check</button><p id="intro-tf-2-feedback"></p></form>


   <p><strong>Question 4:</strong> Roughly 70 % of a successful vision application depends on the proper choice of…</p>
  <form id="intro-mc-1"><input type="radio" name="intro-mc-1" value="camera"> The camera sensor <br>
  <input type="radio" name="intro-mc-1" value="lighting"> Lighting <br>
  <input type="radio" name="intro-mc-1" value="lensing"> The lens focal‑length <br>
  <input type="radio" name="intro-mc-1" value="software"> Image‑processing software <br>
  <button type="button" onclick="checkMCQ('intro-mc-1','lighting','✅ Lighting is the #1 success factor.','❌ Re‑watch the lighting section (≈ 18 min).')">Check</button><p id="intro-mc-1-feedback"></p></form>

   <p><strong>Question 5:</strong> 	Which camera type integrates sensor and on‑board processing in the same small housing?</p>
  <form id="intro-mc-2"><input type="radio" name="intro-mc-2" value="board"> Controller‑board camera <br>
  <input type="radio" name="intro-mc-2" value="smart"> Smart‑camera <br>
  <input type="radio" name="intro-mc-2" value="multi"> Multi‑camera cell controller <br>
  <button type="button" onclick="checkMCQ('intro-mc-2','smart','✅ That’s the definition of a smart camera.','❌ Check the “types of vision systems” at 9 min.')">Check</button><p id="intro-mc-2-feedback"></p></form>


</details>

### Chapter 1.1 : Geometric Vision {#chapter-1-vision}

Before we dive into algorithms and code, we first need a picture of how geometry, cameras, and images fit together.
This chapter lays that foundation. We will

- build the two coordinate systems every vision problem starts with (world vs camera).

- see how a simple rotation + translation moves points from one frame to the other.

- follow each 3‑D point through the pinhole projection onto the image plane and on to actual pixel indices.

- introduce the five classic intrinsic parameters and the common lens‑distortion model.

- and finish by explaining what it really means to have a calibrated camera.

The short video below previews these ideas visually. The text that follows walks through the maths step‑by‑step with conceptual questions so you can test your understanding as you go.


![](https://www.youtube.com/watch?v=qByYk6JggQU&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=2)

---

#### **Transforming From World Coordinates to Camera Coordinates**
{: .no_toc }

Suppose there is a point in the real world, denoted as $(X,Y,Z)$. In order to describe how this point appears to a camera, we need to specify its location relative to the camera’s coordinate system. Usually, we place the camera coordinate system at its center of projection (roughly at the camera’s pinhole or main lens center) such that the $Z$-axis goes straight out from the camera (the optical axis).

Let:

- $X_{world}=(X,Y,Z)^T$ be the coordinates of the point in the world’s coordinate system.

- $X_{ci}=(X_{ci},Y_{ci},Z_{ci})^T$ be the coordinates of the same point in the camera $ci$​’s coordinate system.

The two sets of coordinates are related by:

$$
\begin{bmatrix}
X_{ci} \cr
Y_{ci} \cr
Z_{ci}
\end{bmatrix} = R_i * 
\begin{bmatrix}
X \cr
Y \cr
Z
\end{bmatrix} + T_i,
$$

where:

- $R_i$ is a $3 \times 3$ *rotation matrix* describing how the axes of the world coordinate system relate to the camera’s axes. Because it’s a rotation matrix, $R_i^T R_i = I$ and $\det(R_i) = 1$.
- $T_i$ is a *translation vector* describing the shift from the camera’s origin to the world’s origin (or vice versa, depending on convention).

This transformation says:  
>*“Take the point in world coordinates, rotate it so that the axes align with those of the camera, then translate it so the camera’s center is at the origin.”*

<details markdown="1">
  <summary>Conceptual questions</summary>


  <p><strong>Question 1:</strong> The transformation from world coordinates to camera coordinates involves both a rotation and a translation.</p>
  <form id="q1">
    <input type="radio" name="q1" value="True"> True<br>
    <input type="radio" name="q1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1-feedback"></p>
  </form>

</details>

---

#### **Projection Onto the Image Plane**
{: .no_toc }


In the classical pinhole camera model, we project a 3D point $X_{ci} = (X_{ci}, Y_{ci}, Z_{ci})$ onto a 2D image plane. Typically, we assume the image plane is at $Z_{ci} = 1$. (In reality, camera sensors sit behind the pinhole/center of projection by some distance, but mathematically it is simpler to place a plane in front.)

If $\mathbf{X}_{ci}$ lies in front of the camera, the *normalized* image coordinates $(x_i, y_i)$ (before going into actual pixel coordinates) are:

$$
x_i = \frac{X_{ci}}{Z_{ci}}, \quad
y_i = \frac{Y_{ci}}{Z_{ci}}.
$$

The quantities $x_i$ and $y_i$ are often called *normalized coordinates* because we have divided by $Z_{ci}$.


>**Intuitive Explanation**
>Think of rays of light traveling from the 3D point in the scene, through the camera center, to the image plane. The intersection of that ray with the image plane is >how you figure out the 2D image location. Mathematically, it boils down to dividing by $Z_{ci}$ in the simplest pinhole model.

<details markdown="1">
  <summary>Conceptual questions</summary>

  <p><strong>Multiple choice (choose all statements that are correct) :</strong></p>
  <form id="proj-multi"> <input type="checkbox" name="proj" value="A"> A. The normalized x‑coordinate is obtained by dividing \(X_{ci}\) by \(Z_{ci}\).<br> <input type="checkbox" name="proj" value="B"> B. The normalized y‑coordinate is obtained by dividing \(Y_{ci}\) by \(Z_{ci}\).<br> <input type="checkbox" name="proj" value="C"> C. All normalized points lie on the plane \(Z_{ci}=1\).<br> <input type="checkbox" name="proj" value="D"> D. Normalized coordinates already include the camera’s intrinsic parameters \(f,\alpha,\beta\).<br> <input type="checkbox" name="proj" value="E"> E. If a 3‑D point slides farther away along the same viewing ray, its normalized coordinates \((x_i,y_i)\) stay unchanged.<br><br>

<button type="button" onclick=" const checked=[...document.querySelectorAll('#proj-multi input[name=proj]:checked')].map(cb=>cb.value).sort().join(''); const ok=(checked==='ABCE'); /* correct set */ document.getElementById('proj-multi-feedback').innerText = ok ? '✅ Correct! A, B, C and E all follow directly from $x=X/Z, y=Y/Z$.' : '❌ Not quite – remember: intrinsic parameters come **after** normalisation.'; ">Check</button>
<p id="proj-multi-feedback"></p> </form>

</details>
---

#### **From Normalized Coordinates to Pixel Coordinates**
{: .no_toc }

In a real camera, the image you get consists of pixels indexed by $(u_i, v_i)$. To bridge the gap between the continuous $(x_i, y_i)$ and discrete pixel $(u_i, v_i)$, we often use an affine transformation:

$$
u_i = f \, \alpha \, x_i + \beta \, y_i + c_u, \quad
v_i = f \, y_i + c_v.
$$

Let’s break down these parameters:

1. $f$: The focal length in pixels. It combines the physical focal length (in millimeters) and the sensor’s pixel size (in millimeters per pixel).

2. $\alpha$: The aspect ratio, allowing for rectangular (non-square) pixels or different horizontal vs. vertical sampling rates.

3. $\beta$: The skew factor. In an ideal camera, $\beta$ is zero. In real cameras where the sensor or read-out lines might be slightly tilted, $\beta$ can model that small shear.

4. $(c_u, c_v)$: The principal point, or image center. It is where the optical axis (the camera’s $Z$-axis) intersects the image plane, expressed in pixel coordinates.

These parameters are called the *intrinsic parameters* of the camera. Determining them precisely is known as **intrinsic calibration** (How to find them will be seen in the next chapter )
<details markdown="1">
  <summary>Conceptual questions</summary>

  <p><strong>Question 1:</strong> The conversion from normalized coordinates to pixel coordinates involves intrinsic parameters such as the focal length, aspect ratio, skew factor, and the image center.</p>
  <form id="q1.1.1.1">
    <input type="radio" name="q1.1.1.1" value="True"> True<br>
    <input type="radio" name="q1.1.1.1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1.1.1.1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1.1.1.1-feedback"></p>
  </form>

<p><strong>Question 2:</strong> In the affine transformation ui=f α xi+β yi+cuui​=fαxi​+βyi​+cu​, which parameter determines the horizontal position of the image center?</p>

<form id="Q1.3.2">
  <input type="radio" name="Q1.3.2" value="1"> f<br>
  <input type="radio" name="Q1.3.2" value="2"> α<br>
  <input type="radio" name="Q1.3.2" value="3"> cu<br>
  <input type="radio" name="Q1.3.2" value="4"> β<br><br>

  <button type="button" onclick="checkMCQ('Q1.3.2', '3', 
    '✅ Correct!', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q1.3.2-feedback"></p>
</form>
</details>
---

#### **Lens Distortion**
{: .no_toc }

Many practical camera systems, especially with wide-angle or fisheye lenses, introduce significant *radial distortion*. If you have ever seen lines near the edges of a photo curve outward (*"barrel distortion"*) or inward (*"pincushion distortion"*), that is due to lens imperfections.

![img-description]({{ site.baseurl }}/assets/images/Vision/Radial_distortion.png)

A common way to model this is by adding polynomial correction terms that depend on $(r^2, r^4, r^6, \dots)$, where $r^2 = x_i^2 + y_i^2$. Thus, the distorted coordinates $(x_i^{\text{dist}}, y_i^{\text{dist}})$ become something like:

$$
x_i^{\text{dist}} = x_i \left(1 + k_1 r^2 + k_2 r^4 + k_3 r^6 + \dots \right),
$$

$$
y_i^{\text{dist}} = y_i \left(1 + k_1 r^2 + k_2 r^4 + k_3 r^6 + \dots \right).
$$

The coefficients $k_1, k_2, k_3, \dots$ are additional parameters to be calibrated, especially for wide-angle lenses.

<details markdown="1">
  <summary>Conceptual questions</summary>

  <p><strong>Question 1:</strong> Radial lens distortion is modeled by applying a polynomial function to the normalized coordinates based on their distance from the image center.</p>
  <form id="q1.2.1">
    <input type="radio" name="q1.2.1" value="True"> True<br>
    <input type="radio" name="q1.2.1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1.2.1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1.2.1-feedback"></p>
  </form>


<p><strong>Question 2:</strong> In the context of lens distortion, what does the variable r represent?</p>

<form id="Q1.2.2">
  <input type="radio" name="Q1.2.2" value="1"> r is the ratio of xi​ and yi<br>
  <input type="radio" name="Q1.2.2" value="2"> r is the focal length in pixels<br>
  <input type="radio" name="Q1.2.2" value="3"> r is the radial distance from the image center, defined as xi2+yi2xi2​+yi2​<br>
  <input type="radio" name="Q1.2.2" value="4"> r is one of the distortion coefficients<br><br>

  <button type="button" onclick="checkMCQ('Q1.2.2', '3', 
    '✅ Correct!', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q1.2.2-feedback"></p>
</form>
</details>
---

#### **Putting It All Together: Calibrated Systems**
{: .no_toc }

When we say a system is *calibrated*, it typically means:

1. We know the *intrinsic parameters* ($f, \alpha, \beta, c_u, c_v, k_1, k_2, \dots$).

2. We know how the camera is positioned in some *external* coordinate system (its rotation $R_i$ and translation $T_i$), known as the *extrinsic* parameters.

Once we have done an intrinsic calibration (which can be done using a checkerboard pattern or known calibration target) and accounted for distortion, we can confidently map between:

- 3D coordinates $\boldsymbol{X}_{ci}$ in the camera’s frame
- 2D pixel measurements $(u_i, v_i)$

This is critical for many robotic tasks such as *navigation*, *obstacle avoidance*, *object tracking*, and *grasping*, since everything eventually must go from real-world distances and geometry to image pixel coordinates.

<details markdown="1">
  <summary>Conceptual questions</summary>

  <p><strong>Question 1:</strong> A calibrated camera system requires knowing both its intrinsic parameters (e.g., focal length, skew, distortion coefficients) and its extrinsic parameters (e.g., rotation and translation relative to the world).</p>
  <form id="q1.3.1">
    <input type="radio" name="q1.3.1" value="True"> True<br>
    <input type="radio" name="q1.3.1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('q1.3.1', 'True', 
      '✅ Correct!',
      '❌ Incorrect. Try again!')">
    Check Answer
    </button>
    <p id="q1.3.1-feedback"></p>
  </form>

<p><strong>Question 2:</strong> What is the main benefit of calibrating a camera system in the context of robotic vision?</p>

<form id="Q1.3.3">
  <input type="radio" name="Q1.3.3" value="1"> It allows the accurate mapping between 3D world coordinates and 2D pixel coordinates<br>
  <input type="radio" name="Q1.3.3" value="2"> It eliminates the need for a lens<br>
  <input type="radio" name="Q1.3.3" value="3">  It simplifies only the calculation of the rotation matrix​<br>
  <input type="radio" name="Q1.3.3" value="4"> It converts analog images to digital images<br><br>

  <button type="button" onclick="checkMCQ('Q1.3.3', '1', 
    '✅ Correct!', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q1.3.3-feedback"></p>
</form>
</details>

<details markdown="1">
  <summary>Advanced Mathematical Exerceises</summary>

  <strong>Exercise 1 :</strong> 

  - Determine the Intrinsic Parameter Matrix (𝑲) of a digital camera with an image size 640×480 pixels and a horizontal field of view of 90°
  - Assume square pixels and the principal point as the center of the diagonals
  - What is the vertical field of view?
  - What’s the projection on the image plane of $cP = [1, 1, 2]^T$

<details markdown="2">
  <summary>Solution</summary>

  <img src="{{ '/assets/images/Vision/ex1_1.png' | relative_url }}" alt="Intrinsic‑matrix solution">

  <img src="{{ '/assets/images/Vision/ex1_2.png' | relative_url }}" alt="Projection solution">
</details>

  <strong>Exercise 2 :</strong> 
  <iframe src="{{ site.baseurl }}{{'/assets/pdfs/Vision/01_Camera_Notation_Tutorial.pdf'}}" width="100%" height="600px"></iframe>

</details>

---

### Chapter 1.2 : Calibration

Camera **calibration** is the process by which we determine a camera’s **intrinsic** parameters (like focal length, principal point, and distortion coefficients) and **extrinsic** parameters (its position and orientation with respect to some world reference). A well-calibrated camera allows us to accurately map between real-world 3D coordinates and 2D image pixels, which is essential for tasks like navigation, 3D reconstruction, and robotic grasping.

As we saw in the previous sections, the pinhole camera model provides a neat mathematical description of how a point in 3D $(X,Y,Z)$ maps to a pixel coordinate $(u,v)$. However, real cameras have additional nuances:

- **Focal length and principal point** need to be estimated precisely (intrinsic calibration).

- **Lens distortion** can bend straight lines or enlarge/minimize certain regions (distortion calibration).

- **Camera pose** (rotation and translation) with respect to a world coordinate system may be unknown (extrinsic calibration).

**Calibration** is about figuring out all these parameters so that the projection model in your equations matches the actual camera you are using.

---

#### **Basic Setup: Intrinsic Calibration**
{: .no_toc }

When the camera’s internal parameters remain constant (no zooming in/out) and you can take multiple images of a known reference pattern (e.g., a checkerboard), you can use common methods or toolboxes (e.g. the MATLAB Calibration Toolbox, Zhang’s OpenCV calibration functions) to recover the following:


| **Camera Parameters**  | **Description** | **Symbol** |
|------------------------|---------------|-----------|
| **Intrinsic Parameters** | Define the camera’s internal characteristics. | |
| Focal length          | Determines the scale of projection. | $ f $ |
| Principal point       | The optical center of the image. | $ (c_u, c_v) $ |
| Skew factor          | Accounts for potential shearing. | $ \beta $ |
| Aspect ratio         | Accounts for pixel shape differences. | $ \alpha $ |
| **Extrinsic Parameters** | Define the camera’s position and orientation in the world. | |
| Rotation matrix      | Describes the camera’s orientation. | $ R $ |
| Translation vector   | Specifies the camera’s position relative to a reference frame. | $ T $ |

After calibration, the hope is that for any future image, you can “correct” lens distortions and map each pixel to the corresponding ideal pinhole-ray direction.


<details markdown="1">
 <summary>Conceptual questions</summary>

  <p><strong>Question 1:</strong> What are the typical intrinsic parameters we aim to find when calibrating a camera?</p>

  <form id="Q2.1.1">
    <input type="radio" name="Q2.1.1" value="1"> The rotation and translation of the camera<br>
    <input type="radio" name="Q2.1.1" value="2"> The camera’s focal length, principal point, aspect ratio, skew, and distortion coefficients<br>
    <input type="radio" name="Q2.1.1" value="3"> The lens focal length only<br> 
    <input type="radio" name="Q2.1.1" value="4"> Only the radial distortion parameters<br><br>

  <button type="button" onclick="checkMCQ('Q2.1.1', '2', 
    '✅ Correct! Intrinsic calibration involves those parameters.', 
    '❌ Incorrect. Try again!')">
    Check Answer
  </button>

  <p id="Q2.1.1-feedback"></p>
  </form>

  <p><strong>Question 2:</strong> During standard checkerboard-based calibration, we rely on known 3D positions (in the checkerboard reference) of the corners and their measured 2D positions in the images to solve for the camera’s intrinsic parameters.</p>

  <form id="Q2.1.2">
    <input type="radio" name="Q2.1.2" value="True"> True<br> 
    <input type="radio" name="Q2.1.2" value="False"> False<br> 
    
  <button type="button"
   onclick="checkTrueFalse('Q2.1.2', 'True',
    '✅ Correct!',
    '❌ Incorrect. Think about the standard procedure with known patterns.')"> Check Answer </button>
    <p id="Q2.1.2-feedback"></p>
    </form>
  </details>

---

#### **Varying Intrinsics and Self-Calibration**
{: .no_toc }

Not all systems allow us to fix the camera intrinsics. For example, if the focal length can vary (zoom lenses) or if you cannot practically use a known reference pattern in the field, you might need more advanced methods:

- **Self-calibration** methods (such as the approach by Pollefeys et al.) rely on multiple views of unknown scenes. They track corresponding features across images and use constraints like the Kruppa equations to solve for the camera intrinsics and distortion.

- **Stratified self-calibration** typically requires at least three views and uses epipolar geometry and projective transformations to recover a consistent set of intrinsic parameters across all images.

These approaches can be more sensitive to noise or require many stable point correspondences, but they’re powerful in situations where you can’t do a “checkerboard session.”

---

#### **Projection Matrix Form and Depth Elimination**
{: .no_toc }

Once we include lens distortion (and possibly correct it), the “ideal” pinhole mapping can be summarized in matrix form (assuming we now talk about undistorted, ideal pixel coordinates). Denote:

- $u_i = (u_i, v_i, 1)^T$ as the homogeneous pixel coordinate of a point in the $i$-th image.

- $X = (X, Y, Z, 1)^T$ as the homogeneous coordinate of a world point.

Then, for camera $i$, we have:
$$
\lambda_i \, u_i = K_i \begin{bmatrix} R_i & T_i \end{bmatrix} X
$$
where:

- $\lambda_i = Z_{ci}$ is the depth of the point relative to camera $i$,

- $K_i$ is the $3 \times 3$ matrix of intrinsic parameters,

- $R_i$ and $T_i$ describe the rotation and translation from the world coordinate system to camera $i$’s coordinate system,

- The product $\begin{bmatrix} R_i & T_i \end{bmatrix}$ is often called the extrinsic part.

Because $\lambda_i$ is just a scalar, you can rearrange or eliminate it, leading to two main equations that relate the world coordinates $X$ and the pixel coordinates $u_i$. These become the basis for solving calibration problems in practice.

---

#### **Exercises**
{: .no_toc }

<details markdown="1">
 <summary>Conceptual questions</summary>


<!-- Q3 – True / False -->
<p><strong>Question 1:</strong> If a camera has <em>perfectly square</em> sensor pixels, the aspect‑ratio parameter&nbsp;α in its intrinsic matrix equals&nbsp;1.</p>
<form id="Calib-TF-3">
  <input type="radio" name="Calib-TF-3" value="True"> True<br>
  <input type="radio" name="Calib-TF-3" value="False"> False<br>
  <button type="button"
          onclick="checkTrueFalse('Calib-TF-3','True',
          '✅ Correct – square pixels ⇒ equal horizontal & vertical scale, so α = 1.',
          '❌ Remember, α reflects pixel shape; it is 1 only when pixels are square.')">
    Check Answer
  </button>
  <p id="Calib-TF-3-feedback"></p>
</form>

<!-- Q4 – single‑answer MCQ -->
<p><strong>Question 2:</strong> When you <em>zoom</em> a camera lens during operation, which intrinsic parameter is most directly affected?</p>
<form id="Calib-MC-4">
  <input type="radio" name="Calib-MC-4" value="f"> Focal length (<em>f</em>)<br>
  <input type="radio" name="Calib-MC-4" value="cu"> Principal‑point c<sub>u</sub><br>
  <input type="radio" name="Calib-MC-4" value="beta"> Skew β<br>
  <input type="radio" name="Calib-MC-4" value="k1"> Radial‑distortion k<sub>1</sub><br><br>
  <button type="button"
          onclick="checkMCQ('Calib-MC-4','f',
          '✅ Exactly – zooming changes the effective focal length.',
          '❌ Think about what the zoom ring actually does to the optical system.')">
    Check Answer
  </button>
  <p id="Calib-MC-4-feedback"></p>
</form>

<p><strong>Question 3:</strong> If the matrix $K_i$ is unknown, how many different images of a known pattern are typically required to solve for these intrinsic parameters in a standard calibration method?</p>
<form id="Q2.2.1">
  <input type="radio" name="Q2.2.1" value="1"> Only one image<br>
  <input type="radio" name="Q2.2.1" value="2"> At least two images<br>
  <input type="radio" name="Q2.2.1" value="3"> At least three or more images at various angles<br> 
  <input type="radio" name="Q2.2.1" value="4"> It cannot be determined<br><br>

<button type="button" onclick="checkMCQ('Q2.2.1', '3', 
  '✅ Yes! Typically, you need multiple views (often >5) to reliably solve for intrinsic parameters.', 
  '❌ Think about the degrees of freedom and the need for diverse viewpoints!')">
  Check Answer
  </button>

  <p id="Q2.2.1-feedback"></p>

</form>

<!-- Q4 – multiple‑answer checkbox -->
<p><strong>Question&nbsp;4:</strong> <em>Select <u>all</u> quantities that are typically categorised as <strong>extrinsic</strong> parameters.</em></p>
<form id="Calib-Multi-7">
  <input type="checkbox" name="Calib-Multi-7" value="R"> A. Rotation matrix \(R\)<br>
  <input type="checkbox" name="Calib-Multi-7" value="T"> B. Translation vector \(T\)<br>
  <input type="checkbox" name="Calib-Multi-7" value="f"> C. Focal length \(f\)<br>
  <input type="checkbox" name="Calib-Multi-7" value="cu"> D. Principal‑point \(c_u,c_v\)<br>
  <input type="checkbox" name="Calib-Multi-7" value="k1"> E. Radial‑distortion \(k_1\)<br><br>
  <button type="button"
  onclick="
    const good=['R','T'].sort().join('');
    const chosen=[...document.querySelectorAll('#Calib-Multi-7 input:checked')].map(x=>x.value).sort().join('');
    document.getElementById('Calib-Multi-7-feedback').innerText =
      (chosen===good)
      ? '✅ Correct – extrinsics describe pose (R and T).'
      : '❌ Only R and T are extrinsic; the rest belong to K or distortion.';
  ">Check Answer</button>
  <p id="Calib-Multi-7-feedback"></p>
</form>

<!-- Q5 – True / False -->
<p><strong>Question&nbsp;5:</strong> Radial‑distortion coefficients \(k_1,k_2,\dots\) are applied <em>before</em> we divide by depth \(Z_{ci}\) when computing normalized image coordinates.</p>
<form id="Calib-TF-8">
  <input type="radio" name="Calib-TF-8" value="True"> True<br>
  <input type="radio" name="Calib-TF-8" value="False"> False<br>
  <button type="button"
    onclick="checkTrueFalse('Calib-TF-8','False',
      '✅ Right – distortion acts on <em>already</em> normalised (x,y) coordinates.',
      '❌ Recall the order: project → normalise (x,y) → then distort.')">
    Check Answer
  </button>
  <p id="Calib-TF-8-feedback"></p>
</form>

<!-- Q6 – drag‑and‑drop via <select> combo (simple) -->
<p><strong>Question&nbsp;6:</strong> Match each intrinsic term to the <em>effect</em> it compensates for.</p>

<table>
<tr><th>Parameter</th><th></th><th>Effect on image</th></tr>
<tr><td>Skew β</td><td>→</td><td>
<select id="match-1">
  <option value="">– choose –</option>
  <option value="shear">Sensor columns not perpendicular to rows</option>
  <option value="scale">Overall scale of projection</option>
  <option value="center">Shift of optical axis</option>
</select></td></tr>
<tr><td>Focal length f</td><td>→</td><td>
<select id="match-2">
  <option value="">– choose –</option>
  <option value="scale">Overall scale of projection</option>
  <option value="shear">Sensor columns not perpendicular to rows</option>
  <option value="center">Shift of optical axis</option>
</select></td></tr>
<tr><td>Principal‑point c<sub>u,v</sub></td><td>→</td><td>
<select id="match-3">
  <option value="">– choose –</option>
  <option value="center">Shift of optical axis</option>
  <option value="shear">Sensor columns not perpendicular to rows</option>
  <option value="scale">Overall scale of projection</option>
</select></td></tr>
</table><br>

<button type="button"
onclick="
  const ok =
    document.getElementById('match-1').value==='shear' &&
    document.getElementById('match-2').value==='scale' &&
    document.getElementById('match-3').value==='center';
  document.getElementById('Calib-match-feedback').innerText =
    ok ? '✅ Great match!' : '❌ Try again – revisit the intrinsics table.';
">Check Answer</button>
<p id="Calib-match-feedback"></p>

<!-- Q7 – numeric fill‑in -->
<p><strong>Question&nbsp;7:</strong> Your calibration image is 1280 × 720 pixels and you assume the principal point is exactly in the centre. What value should you enter for&nbsp;c<sub>u</sub>?</p>
<form id="Calib-Num-9">
  <input type="text" id="Calib-Num-9-field" size="6" placeholder="?">
  <button type="button"
   onclick="
     const v=document.getElementById('Calib-Num-9-field').value.trim();
     const ok=(v==='640' || v==='640.0');
     document.getElementById('Calib-Num-9-feedback').innerText =
       ok ? '✅ Correct – half of 1280 pixels.' : '❌ Hint: half the width.';
   ">Check Answer</button>
  <p id="Calib-Num-9-feedback"></p>
</form>

 </details>

---
#### **Key Takeaway:**
{: .no_toc }

- Once you know $K_i$, $R_i$, and $T_i$, you can project any 3D point in the world straight into the 2D image.

- Calibration is about finding all those parameters so that 2D–3D correspondences match reality.

<details markdown="1">
 <summary>Advanced Mathematical Development</summary>

  The following explore more mathematically how to find the Camera Parameters

  ![](https://www.youtube.com/watch?v=GUbWsXU1mac&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=3)

  ![](https://www.youtube.com/watch?v=2XM2Rb2pfyQ&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=4)

</details>

### Chapter 1.3 : Pose estimation or PNP

Once a camera is calibrated (i.e., we know its **intrinsic** parameters and can handle or correct for any lens distortion), we can tackle the problem of finding the camera’s **extrinsic** parameters (its rotation and translation) relative to known objects or landmarks in the world. This is often referred to as the **Pose Estimation** problem.

In many robotics tasks, we know the 3D coordinates of certain points in the environment (so-called landmarks or feature points) and we can detect their corresponding locations in the image. The goal is to solve for the camera’s exact position and orientation that makes those correspondences match the real world.

Here is a youtube video giving a short overview of the Pose estimation problem and how to resolve it

![](https://www.youtube.com/watch?v=xdlLXEyCoJY)

---

#### **The PnP (Perspective-n-Point) Problem**
{: .no_toc }

Suppose you have:

- N known 3D points in the world:
  $X_j=(X_j, Y_j, Z_j)$
  $Xj​=(X_j​,Yj_​,Z_j​)$

- Their corresponding 2D points in the calibrated image:
  $xj=(x_j, y_j)$
  $xj​=(x_j​,y_j​)$

where the camera has already been calibrated, and any lens distortions are accounted for or removed. The **PnP** problem is to find a rotation matrix $R$ and a translation vector $T$ such that, for each 3D–2D match, the pinhole projection equation is satisfied:
$$
z_j \begin{bmatrix}
x_j \cr
y_j \cr
1
\end{bmatrix}
= K \begin{bmatrix}
R & T
\end{bmatrix}
\begin{bmatrix}
X_j \cr
Y_j \cr
Z_j \cr
1
\end{bmatrix},
$$

where $K$ is the intrinsic matrix and $z_j$​ is the point’s depth along the camera’s Z-axis. In simpler words:

>“Given N known 3D points and their 2D images, recover the camera’s orientation and position.”

---

#### **Minimal Example: 3 Points**
{: .no_toc }

When only three world points are visible we are in the Perspective‑3‑Point (P3P) setting – the smallest data set that still lets us compute a full camera pose.

##### **Geometric Setup**
{: .no_toc }

Define :


- $d_i = \|X_i - C\| \quad \text{(distance camera → point)}$


- $d_{ij} = \|X_i - X_j\| \quad \text{(known side lengths of the landmark triangle)}$


- $\cos \delta_{ij} = x_i^\top x_j \quad \text{(measured angle between image rays)}$

Because the rays and the segment $X_i X_j$ form a triangle, **the Law of Cosines** gives (for every $i \ne j$):

$$
d_i^2 + d_j^2 - 2 d_i d_j \cos \delta_{ij} = d_{ij}^2 \tag{1}
$$

There are *three* such equations — one per edge of the landmark triangle — and the *three unknowns* $d_1, d_2, d_3$.

![img-description]({{ site.baseurl }}/assets/images/Vision/p3p_geometry.png)

*Fig. 1  The 3-point pose-estimation problem. Unknown camera–point distances $d_1, d_2, d_3$ and known inter-point distances $d_{12}, d_{13}, d_{23}$. The angles $\delta_{ij}$ between bearing rays are measured in the image.*

##### **Reducing the Unknowns**
{: .no_toc }

A classical trick (Gröbner-free) is to express two of the depths in terms of the first one:

$$
d_2 = u \, d_1, \quad d_3 = v \, d_1 \quad (u, v > 0).
$$

Insert those into (1) and divide by $d_1^2$:

$$
d_{12}^2 = d_1^2 \left( u^2 + 1 - 2u \cos \delta_{12} \right),
$$

$$
d_{13}^2 = d_1^2 \left( v^2 + 1 - 2v \cos \delta_{13} \right),
$$

$$
d_{23}^2 = d_1^2 \left( u^2 + v^2 - 2uv \cos \delta_{23} \right). \tag{2}
$$

Equation (2) immediately yields *three* expressions for the same $d_1^2$.  
Equating any two of them eliminates $d_1$ and leaves a system of **two quadratic equations** in the two variables $(u, v)$:

$$
d_{12}^2 \left( v^2 + 1 - 2v \cos \delta_{13} \right) = d_{13}^2 \left( u^2 + 1 - 2u \cos \delta_{12} \right),
$$

$$
d_{13}^2 \left( u^2 + v^2 - 2uv \cos \delta_{23} \right) = d_{23}^2 \left( v^2 + 1 - 2v \cos \delta_{13} \right). \tag{3}
$$

Now you need to: 

1. **Solve the second equation of (3) linearly for $u^2$.**

2. **Substitute** that expression into the first equation of (3).  
   The result is a single 4-th degree polynomial in $v$.

This 4-th degree polynomial can have up to **four real roots**.

For every admissible root $v$:

- compute $u$ from the quadratic substitution,
- recover $d_1, d_2, d_3$,
- keep only solutions where all depths are **positive** (points must be in front of the camera).

Because each quadratic step can produce two signs, you obtain at most **8 real pose candidates** – the well-known *P3P eight-fold ambiguity*.

##### **From Depths to $R$ and $T$**
{: .no_toc }

Once $\{d_i\}$ are known, the 3-D coordinates of the landmarks **in the camera frame** are

$$
X_i^{\text{cam}} = d_i \, x_i.
$$

You now possess two 3-point sets:

| frame  | point 1 | point 2 | point 3 |
|--------|---------|---------|---------|
| World  | $X_1$   | $X_2$   | $X_3$   |
| Camera | $d_1 x_1$ | $d_2 x_2$ | $d_3 x_3$ |

Compute $R$, $T$ that best align the world set to the camera set.  
That is the classic **absolute orientation** problem and has a closed-form SVD solution (Horn 1987):

$$
\min_{R \in \text{SO}(3), \, T} \sum_{i=1}^{3} \left\| d_i x_i - (R X_i + T) \right\|^2.
$$

<details markdown="1">
  <summary>Additional content</summary>

  For a more thorough lecture on **pnp** you can watch the following youtube videos.

  Part 1:

  ![](https://www.youtube.com/watch?v=C5L7LnNL4oo)

  Part 2:

  ![](https://www.youtube.com/watch?v=8Nh1UeuD9-k)

  Part 3:

  ![](https://www.youtube.com/watch?v=9peph2zvSyY)

</details>

---

### Chapter 1.4 : Triangulation

>**Goal of this section**
>Show how a single 3-D point can be re-built from (at least) two calibrated images by intersecting the two sight-rays that go through the image measurements.

<details markdown="1"><summary>Video explenation</summary>

  Here is a good youtube video explaining in a more visual way how to do **triangulation**. Note that the notation in this video may not follow the notation of this course but the method is the same.

![](https://www.youtube.com/watch?v=hUVyDabn1Mg&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=5)

</details>

---

#### 1 Why one view is never enough
{: .no_toc }   

With a single pinhole camera you can only say that the 3-D point lies somewhere on a ray that starts in the camera centre and passes through the pixel $u_1$. Mathematically (homogeneous notation)

$$
\lambda_1 u_1 = P_1 \begin{bmatrix}
X \cr
Y \cr
Z \cr
1
\end{bmatrix}
$$

where $P_1 = K_1\,[\,R_1\mid T_1]$ and $\lambda_1 = Z_{c1}$ is the **unknown**
depth.

---

#### 2 Two eyes give you depth  
{: .no_toc }

Add a second calibrated view

$$
\lambda_2 u_2 = P_2 \begin{bmatrix}
X \cr
Y \cr
Z \cr
1
\end{bmatrix}
$$

Stack the two equations and eliminate the depths.  
Let $(x,y)$ be the pixel in the current row and
$P_i^{(k)}$ the $k$-th row of $P_i$:

$$
\underbrace{\begin{bmatrix}
x\,P_1^{(3)}-P_1^{(1)} \cr
y\,P_1^{(3)}-P_1^{(2)} \cr
x\,P_2^{(3)}-P_2^{(1)} \cr
y\,P_2^{(3)}-P_2^{(2)}
\end{bmatrix}}_{\displaystyle A}
\begin{bmatrix}
X \cr
Y \cr
Z \cr
1
\end{bmatrix}=0.
$$

Here $P_i^{(k)}$ denotes the $k$-th row of $P_i$, and $(x,y)$ are the pixel coordinates in that view. In practice the two image rays do not intersect perfectly because of measurement noise, so matrix $A$ has full rank 4. The best estimate of $X$ is therefore the right-singular vector of $A$ corresponding to its smallest singular value (Direct Linear Triangulation, or DLT).

>**Quick recipe (DLT)**
  >1. Undistort and normalise the two image points.
  >2. Build the $4\times4$ matrix $A$ in (2).
  >3. Run an SVD $A=U\Sigma V^\top$ and take the last column of $V$.
  >4. De-homogenise to obtain $(X,Y,Z)$.


---

#### 3 Epipolar sanity check 
{: .no_toc }  

The pair $(u_1,u_2)$ must satisfy the **epipolar constraint**  

$$
\mathbf u_2^{\top}\,E\,\mathbf u_1 \;=\;0
$$

with $E$ the essential matrix built from the relative pose $[R\mid T]$ of the two cameras. If that constraint is violated the two rays can never meet and the SVD in (2) will merely return the least-squares compromise.

---

#### 4 Numerical hints   
{: .no_toc }

- Centre and scale image measurements before forming $A$ (improves conditioning).
- A point that is very close to both cameras gives a tiny $Z$—beware of dividing by a noisy depth.
- Use more than two images whenever possible; each extra view adds two more rows to $A$ and makes the SVD solution more robus

---

#### **Exercises**
{: .no_toc }

<details markdown="1"><summary>Conceptual questions</summary>

**True / False**

1. A single calibrated image suffices to recover a point’s depth.  
<form id="tri-tf-1">
<input type="radio" name="tri-tf-1" value="True"> True<br>
<input type="radio" name="tri-tf-1" value="False"> False<br>
<button type="button"
onclick="checkTrueFalse('tri-tf-1','False',
'✅ Correct – one image gives only a ray.',
'❌ Depth needs another view!')">
Check</button>
<p id="tri-tf-1-feedback"></p></form>

**Multiple choice**

2. The linear system $A\,X=0$ admits a *finite* 3-D solution only when …  
<form id="tri-mc-1">
<input type="radio" name="tri-mc-1" value="1"> $\operatorname{rank}A=4$<br>
<input type="radio" name="tri-mc-1" value="2"> $\operatorname{rank}A=3$<br>
<input type="radio" name="tri-mc-1" value="3"> $A$ is symmetric<br>
<button type="button"
onclick="checkMCQ('tri-mc-1','2',
'✅ Right – perfect correspondences drop the rank to 3.',
'❌ Recall: epipolar-consistent rows are not independent.')">
Check</button>
<p id="tri-mc-1-feedback"></p></form>

**Fill-in**

3. Each extra view adds ____ new independent equations for the same 3-D
   point.  
<form id="tri-fi-1">
<input type="text" id="tri-fi-1-box" size="4" placeholder="?">
<button type="button"
onclick="
const ok=document.getElementById('tri-fi-1-box').value.trim()==='2';
document.getElementById('tri-fi-1-feedback').innerText=
 ok?'✅ Correct!':'❌ Hint: one $x$-row + one $y$-row.';">
Check</button>
<p id="tri-fi-1-feedback"></p></form>

</details>

<details markdown="1"><summary>Mathematical questions</summary>

Two pin-hole cameras share  

$$
K=\begin{bmatrix}800&0&320 \cr
                0&800&240 \cr
                0&0&1\end{bmatrix}.
$$

Left camera: $P_1 = K[I\mid 0]$  
Right camera: $P_2 = K[I\mid (-0.1,0,0)^\top]$

Measurements: $\mathbf u_1=(340,240)$, $\mathbf u_2=(300,240)$ px.  
**Estimate its 3-D coordinates.**

Hint: follow the four-step DLT recipe above.
<details markdown="1"><summary>Solution (sketch)</summary>

Normalised points
$\tilde{x}_1=\tfrac{1}{800}(20,0,1)^\top$,
$\tilde{x}_2=\tfrac{1}{800}(-20,0,1)^\top$.
Build $A$, run SVD $\Rightarrow$ $X\approx(0,0,1.0)$ m in the left-camera frame.
</details>
</details>

#### **Key Takeaway:**
{: .no_toc }

- Triangulation turns 2-D correspondences into 3-D positions once the two projection matrices are known.

- A clean linear formulation (DLT) relies on simple linear-algebra tools (SVD).

- The geometry behind it is nothing more than “find the intersection of two lines in space”—but careful algebra keeps that intersection stable in the presence of noise.

---

### Chapter 1.5 : Moving Stereo {#chapter-1-moving-stereo}
>**Goal of this section**
>A **stereo rig** gives you two eyes on the world.  
A **moving stereo rig** (left camera $c_\ell$, right camera $c_r$) straps those eyes to a robot that **moves**.  
This upgrade turns a fixed-baseline depth sensor into a *rolling* 3-D scanner and a *self-motion* estimator – the backbone of many visual-odometry and SLAM systems such as **libviso2** and its successors.

<details markdown="1"><summary>Video explenation</summary>

  Here are 2 good youtube videos explaining in a more visual way how **Motion Stereo** works. Note that the notation in this video may not follow the notation of this course but the method is the same.

  ![](https://www.youtube.com/watch?v=dUDMQ6dwWDA&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=6)

  ![](https://www.youtube.com/watch?v=v30I-BqGfuI&list=PL2zRqk16wsdoCCLpou-dGo7QQNks1Ppzo&index=7)

</details>




---

#### 1 What exactly is “moving stereo”? 
{: .no_toc }

At **time $k$** the rig observes some 3-D scene point $X$ in *both* cameras

$$
\begin{aligned}
u_{\ell,k} &= P_\ell\,X_k ,\\
u_{r ,k} &= P_r\,X_k ,
\end{aligned}
$$

where $P_\ell,P_r$ are the (known, *calibrated*) projection matrices of the **fixed** left–right pair.

At **time $k+1$** the *whole* rig has moved by the rigid transform $(R_{k+1},T_{k+1})$, so the *same* world point now has **camera-frame** coordinates

$$
X_{k} \;=\; R_{k+1}\,X_{k+1} + T_{k+1}. \tag{1}
$$

Once we know pairs $\{X_k,X_{k+1}\}$ we can solve (1) for the unknown pose $(R_{k+1},T_{k+1})$ – i.e.\ the robot’s motion between the two instants.

---

#### 2 Two correspondence problems instead of one 
{: .no_toc }

To *use* (1) we need each 3-D point **twice**:

1. **Left ↔ Right** at **the same time** → disparity → depth ⇒ $X_k$  (classic stereo triangulation).  
2. **Left (k) ↔ Left (k+1)** (or right↔right) → optical flow / feature tracking → cross-time matches.

Only then can we plug two *metric* 3-D clouds into (1).

---

#### 3 Estimating the rig motion: Absolute orientation 
{: .no_toc }

Write the mean-free coordinates of the cross-time matches as

$$
\bar X_k \;=\; X_k - \frac{1}{n}\sum_{i=1}^{n} X_k^{(i)},\qquad
\bar X_{k+1} \;=\; X_{k+1} - \frac{1}{n}\sum_{i=1}^{n} X_{k+1}^{(i)}.
$$

Stack the $n$ pairs into the $n\times3$ matrices $A_k,A_{k+1}$; then minimise the Frobenius norm

$$
\min_{R\in\mathrm{SO}(3)} \;\bigl\lVert A_{k+1} - R\,A_k \bigr\rVert_F .
$$

This *Procrustes* problem has the closed-form SVD solution  
$R = U\,\mathrm{diag}(1,1,\det(UV^\top))\,V^\top$ where $U\Sigma V^\top = A_{k+1}A_k^\top$.  
The translation follows from the centroids.

In practice we wrap the whole thing in **RANSAC**: draw minimal 3-point samples, compute $(R,T)$, count inliers, repeat.

---

#### 4 Depth-on-frame or depth-once? 
{: .no_toc }

Triangulating every point at every frame is *expensive*.  
An alternative is **pose-only refinement**:

* Track 2-D features across time in *one* eye (say the left image).  
* Triangulate them **once** from the left–right disparity at time $k$.  
* Estimate $(R,T)$ that aligns those 3-D points with their 2-D re-projections in the *next* left frame (a 3-D ↔ 2-D PnP problem).

Both routes lead to the same cost function in bundle adjustment; the choice is mostly engineering.

---

#### 5 Why moving stereo beats monocular VO 
{: .no_toc }

* **True scale** – the fixed baseline recovers metric depth ⇒ no scale drift.  
* **Better convergence** – having depth *before* motion estimation shrinks the search space.  
* **Robustness** – parallax from the baseline adds “sideways” view change even on straight trajectories.

---

#### 6 Implementation tips 
{: .no_toc }

| Step                | Practical hint |
|---------------------|----------------|
| Feature detection   | FAST + ORB descriptors give many robust matches at real-time rates. |
| Left-right matching | Slide along the same image row (epipolar line) – rectification makes this 1-D. Reject matches with negative or too-large disparity. |
| Triangulation       | Use linear DLT, but filter out points with depth $Z<0$ or large condition number. |
| Temporal tracking   | Bucketing + KLT keeps features evenly spread and cheap to track. |
| Pose RANSAC         | 3-point Procrustes is the minimal set. Run $\sim$150 iterations per frame pair. |
| Bundle adjustment   | A sliding window of $5$–$10$ keyframes keeps the problem small yet corrects drift. |

---

<details markdown="1">
  <summary>Conceptual questions</summary>

  **True / False**

  <p><strong>Question 1:</strong> A moving-stereo rig can recover <em>metric</em> motion scale <em>without</em> any extra sensors.</p>
  <form id="ms-tf-1">
    <input type="radio" name="ms-tf-1" value="True"> True<br>
    <input type="radio" name="ms-tf-1" value="False"> False<br>
    <button type="button"
      onclick="checkTrueFalse('ms-tf-1','True',
      '✅ Correct – the known baseline gives real-world units.',
      '❌ Think about what sets the depth scale.')">
    Check</button>
    <p id="ms-tf-1-feedback"></p>
  </form>

  **Multiple choice**

  <p><strong>Question 2:</strong> What is the <em>minimal</em> number of <em>3-D</em> point correspondences required to solve the Procrustes absolute-orientation problem?</p>
  <form id="ms-mc-1">
    <input type="radio" name="ms-mc-1" value="2"> 2<br>
    <input type="radio" name="ms-mc-1" value="3"> 3<br>
    <input type="radio" name="ms-mc-1" value="4"> 4<br>
    <input type="radio" name="ms-mc-1" value="6"> 6<br><br>
    <button type="button"
      onclick="checkMCQ('ms-mc-1','3',
        '✅ Three non-collinear points define the motion uniquely.',
        '❌ Remember you need at least two independent vectors after mean subtraction.')">
    Check</button>
    <p id="ms-mc-1-feedback"></p>
  </form>

  **Fill-in**

</details>

---

#### **Key takeaway** 
{: .no_toc }

A rigid stereo pair that <em>moves</em> gives you the best of two worlds:

* **Stereo** provides instant depth at each frame.  
* **Motion** across frames gives you odometry.

By tying them together through **absolute orientation**, a robot can track its 6-D pose and build a consis


### Chapter 1.6 : Structure from Motion

See corresponding chapter in the PDF [*Springer Handbook of Robotics*](#chapter-1-vision)

## Programming

Let's move on to maybe the most exciting part: applying the Vision concepts you've learned in code and seeing your robot working right in front of you!

*(Please refer to the **Install Webots** section if you haven't installed it yet.)*


### Step 1: Setup your environment

1. 📁 [Download the `irb` folder]({{ site.baseurl }}/assets/downloads/kinematics/irb_2025.zip)
2. Extract the downloaded `.zip` file.
3. Launch Webots. From the top-left corner select **File → Open World**.
4. Navigate to the extracted `irb/worlds` folder and select your `.wbt` file.



### Step 2: Let's start coding!

Once successfully opened, your robot and its environment should appear, as illustrated in the screenshot below:

<img src="{{ site.baseurl }}{{ '/assets/images/Vision/arm-camera.png' }}" width="500px" alt="arm_camera Image">


Now, follow the instructions provided on the right side panel within Webots, and complete the code to make your robot move.

Once you've implemented all the "COMPLETE THIS LINE OF CODE" sections, click "Build" or "Save"(`CTRL+S`) to compile your project, and then start the simulation.

**Good luck and have fun!**

## Exercise

### Exercise 1

- Determine the Intrinsic Parameter Matrix (𝑲) of a digital camera with an image size 640×480 pixels and a horizontal field of view of 90°
- Assume square pixels and the principal point as the center of the diagonals
- What is the vertical field of view?
- What’s the projection on the image plane of $cP = [1, 1, 2]^T$

<details markdown="1">
  <summary>Solution</summary>

  ![img-description]({{ site.baseurl }}/assets/images/Vision/ex1_1.png)

  ![img-description]({{ site.baseurl }}/assets/images/Vision/ex1_2.png)

</details>


## Ressources

### Books

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_32) (Chapter 32. 3-D Vision for Navigation and Grasping)

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_34) (Chapter 34. Visual Servoing)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/pose.html) (Chapter 4. Geometric Pose Estimation)

### Videos

- [Intro to Machine Vision and Robotics - part 1](https://www.youtube.com/watch?v=SVcOWYfsBkc)

- [Computer Vision](https://www.youtube.com/watch?v=DOf6ggQQ9ow&list=PLhwIOYE-ldwL6h-peJADfNm8bbO3GlKEy&index=1) (UC Berkley)

- [Multiple View Geometry - Lecture 1 (Prof. Daniel Cremers)](https://www.youtube.com/watch?v=RDkwklFGMfo&list=PLTBdjV_4f-EJn6udZ34tht9EVIW7lbeo4) (TU Munchen)
  
- [First Principles of Computer Vision](https://www.youtube.com/@firstprinciplesofcomputerv3258) (Youtube Channel)
  
### Free Online Courses

- [Vision Algorithms for Mobile Robotics](https://rpg.ifi.uzh.ch/teaching.html) (ETH)

- [Computer Vision](http://www.vision.rwth-aachen.de/course/11/) (RWTH Aachen)


## Additional content

### Camera Notation Tutorial

<details markdown="1">
  <summary>See pdf</summary>

  <iframe src="{{ site.baseurl }}{{'/assets/pdfs/Vision/01_Camera_Notation_Tutorial.pdf'}}" width="100%" height="600px"></iframe>

</details>

### SVD for DLT

<details markdown="1">
  <summary>See pdf</summary>

  <iframe src="{{ site.baseurl }}{{'/assets/pdfs/Vision/02_SVD.pdf'}}" width="100%" height="600px"></iframe>

</details>


[Back to Top](#start)
