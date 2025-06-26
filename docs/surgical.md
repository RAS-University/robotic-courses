---
title: Surgical Robots
parent: Courses
layout: default
math: mathjax
nav_order: 2
---

<!-- Link external JavaScript file -->
<script src="questions.js"></script>

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


# Surgical Robotic 

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## Talk also about the market 

## 1. Prerequisites
No need any prerequisite, this section is made just to catch your interest, introcuding one part of what robot can do and how this can be useful in the future. 

But just before we dive in, here are a few key terms you’ll see throughout the chapter, take a quick look at them now and the rest will make a lot more sense!

| Term | Definition |
|------|------------|
| **Open surgery** | Traditional approach that uses a large incision to give the surgeon direct, hands-on access to the operative field. |
| **Minimally invasive surgery (MIS)** | Umbrella term for techniques that operate through small incisions (or none at all) with slender instruments and a camera, reducing trauma, pain, and recovery time. |
| **[Laparoscopic surgery](https://www.youtube.com/watch?v=IB_NMkMF-qU)** | A form of MIS in which rigid instruments and a camera (laparoscope) are inserted through several small abdominal ports; the surgeon views the field on a video monitor. |
| **Microsurgery** | Procedures carried out under an operating microscope with specialized micro-instruments, enabling work on vessels, nerves, and other tiny structures at sub-millimetre scales. |
| **[Single-port](https://www.youtube.com/watch?v=wLuMnNgF8B4&t=23s) / single-site surgery** | MIS executed through a single multi-channel port—often hidden in the navel—using articulating tools and cameras that fan out inside the body. |
| **Hybrid (robot + laparoscope) procedures** | Surgeries that mix robotic assistance for precision tasks with conventional laparoscopic or open steps, blending the strengths of each method. |


## 1.  Why Care About Surgical Robotics?

Robotic surgery lets surgeons operate through tiny incisions with wrist‑like micro‑instruments, tremor filtration, and immersive 3‑D vision. The viral clip below shows a robot suturing the delicate skin of a corn kernel—an eye‑catching example of the precision that is now possible.

<figure>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/bgRAkBNFMHk" title="Microsurgical suturing of a corn kernel"></iframe>
  <figcaption>Suturing a corn kernel with 12‑0 suture (Sony R&D Center, 2024).</figcaption>
</figure>

## 2.  How We Got Here – A 30‑Year Timeline

From a voice-controlled camera arm to AI-ready multi-port platforms, here’s the overall journey of surgical robots—one milestone at a time.

| Year       | Robot / Event                                      | Why it matters (plain words)                                           |
| ---------- | -------------------------------------------------- | ---------------------------------------------------------------------- |
| **1921**   | Word **“robot”** is created in a Czech play.       | Gave us the name we still use.                                         |
| **1985**   | **PUMA** robot guides a brain biopsy.              | First time a robot helps a surgeon.                                    |
| **1992**   | **[ROBODOC](https://americanhistory.si.edu/collections/object/nmah_1842522)** shapes bone for hip parts.             | Shows robots can cut with perfect repeatability.                       |
| **1994**   | **AESOP** voice-controlled camera arm.             | Surgeon gets a steady “third hand” for the camera.                     |
| **1998**   | **ZEUS** adds two remote-controlled arms.          | Surgeon now moves tools from a console, not the bedside.               |
| **2000**   | **da Vinci** wins U.S. approval.                   | Brings 3-D vision and wrist-like instruments to many operations.       |
| **2001**   | **[Operation Lindbergh](https://en.wikipedia.org/wiki/Lindbergh_operation)** (NY ↔ France).             | Proves long-distance surgery by robot is possible.                     |
| **2006**   | **da Vinci S** model.                              | Sharper HD picture and easier setup.                                   |
| **2009**   | **da Vinci Si** adds a second console.             | Expert can teach or assist during the same case.                       |
| **2014**   | **da Vinci Xi** redesigns arms.                    | Arms swing around the patient so one setup covers the whole belly.     |
| **2018**   | **Single-Port (SP)** robots.                       | All tools enter through one tiny hole—fewer scars.                     |
| **2020 s** | New systems (**Versius, Senhance, Hugo, REVO-I**). | More brands mean lower costs and smarter features like haptics and AI. |

## 3  What Exactly *Is* a Surgical Robot?

Robotic surgery (also called robotic-assisted surgery) is perphaps the most cutting-edge medical techonology of modern times. Imagine a super-precise set of mini hands inside the patient, while the surgeon sits a few feet away at a video-game-style console.
That’s robotic surgery in a sentence. The robot never acts on its own; it simply “shrinks” the surgeon’s hand motions so the work is steadier and the cuts are smaller.

| Features                          | Functionnality                                                                                                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **3-D HD vision**                     | The surgeon looks through a special viewer that feels like sticking your head inside the body cavity: depth, color, ... |
| **Wrist-like tips**                   | Each tool bends and rotates far more than normal laparoscopy sticks, so tying knots or sewing tiny vessels is easier.                                |
| **Tremor filtering + motion scaling** | Shaky fingers? The computer smooths them out. Big hand move? Robot can shrink it almost 10× for fine work.                                                  |
| **Smart imaging**                     | A foot-tap switches to “night-vision” green (fluorescence) to spot blood flow, or overlays a CT map so the surgeon sees hidden vessels.              |
| **Built-in simulators**               | Surgeons practise on a video sim—like a flight-sim for pilots—before touching real patients, and hospitals can track their scores.                   |

Here is a short documentary that traces the rise of surgical robots, explains how the technology works, and shows the real-world benefits for patients.
![Robotic Surgery Unlocks a New Era of Medicine](https://www.youtube.com/watch?v=_aJhNXXWmq0&t=34s)
><sub>*Youtube video, 1 july 2020. Available at:https://www.youtube.com/watch?v=_aJhNXXWmq0&t=34s*</sub>

Follow up with this surgeon’s-eye view: Dr Mary Maish takes you inside the cockpit, describing how she drives the robot for lung-cancer operations and why her patients recover faster than with open surgery.
![Inside the world of a robotic surgeon](https://www.youtube.com/watch?v=8z0oJR9S1Ps)
><sub>*Interview, talk from Dr. Mary Maish, M.D, talking about her expereince using the surgery robot. Youtube video, 1 july 2020. Available at:https://www.youtube.com/watch?v=8z0oJR9S1Ps*</sub>

## 4  Where Are We Now? What’s Next?

Surgical robotics is racing ahead ([market report](https://www.grandviewresearch.com/industry-analysis/surgical-robot-market)), yet it’s not perfect. Today’s systems are pricey, offer limited “feel” (haptic feedback), and still rely on the surgeon for every move. But as computing power, sensors, and AI improve, expect robots to pick up small autonomous tasks—auto-centering the camera, tracking moving tissue, even handing suture back to the needle. Those small steps free the surgeon to focus on judgement, not joystick work.  


## 5  News & Emerging Innovations

If you want a real-time pulse on fresh breakthroughs - whether it’s an autonomous-suturing prototype, a first-in-human trial, or a smart new camera-control algorithm - bookmark the [Surgical Robotics Technology](https://www.surgicalroboticstechnology.com/category/news/) news feed. The site provides coverage from companies and research labs pushing the frontiers of microsurgery and robotic surgery.

---

Other interesting videos
-----------------------

- [Will robots replace surgeons? | Testing surgical robots | Robots in Japan](https://www.youtube.com/watch?v=OfX6qiJKDMk)  
  <sub>*YouTube, 14 Aug 2020 – https://www.youtube.com/watch?v=OfX6qiJKDMk*</sub>  
  *A Tokyo-based surgical-robotics specialist tackles three big questions:*  
  **Why do we need surgical robots? What happens if one makes a mistake? Could they ever replace human surgeons?**  
  The clip blends lab footage with expert commentary to give balanced, easy-to-grasp answers.

- [How are surgical robots made? Go behind the scenes](https://www.youtube.com/watch?v=_WsgJznDVIc)  
  <sub>*YouTube, 15 Sep 2020 – https://www.youtube.com/watch?v=_WsgJznDVIc*</sub>  
  *Step onto Intuitive Surgical’s factory floor and watch a da Vinci robot come to life—from precision machining and clean-room assembly to surgeon training, stress testing, and final quality inspection.*

- [Can AI make surgery safer?](https://www.youtube.com/watch?v=NEgUaGHYxNg)  
  <sub>*YouTube, 2024 – https://www.youtube.com/watch?v=NEgUaGHYxNg*</sub>  
  *Shows how operating-room video and instrument data can be fed to machine-learning models to **score a surgeon’s technique in real time**—turning subjective judgements into objective numbers and actionable feedback.*

-----------------------

Reference:

1. <a id="ref1"></a>Morrell, A. L. G., Morrell-Junior, A. C., Morrell, A. G., Mendes, J. M. F., Tustumi, F., de Oliveira-e-Silva, L. G., & Morrell, A. (2021). *The history of robotic surgery and its evolution: when illusion becomes reality.* Revista do Colégio Brasileiro de Cirurgiões, 48, e20202798. https://doi.org/10.1590/0100-6991e-20202798  

4. <a id="ref2"></a>Pugin, F., Bucher, P., & Morel, P. (2011). *History of robotic surgery: From AESOP® and ZEUS® to da Vinci®.* Journal of Visceral Surgery, 148(6), e3–e9. https://doi.org/10.1016/j.jviscsurg.2011.04.007  



*Last updated: June 26, 2025*
