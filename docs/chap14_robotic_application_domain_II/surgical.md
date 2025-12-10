---
title: Surgical Robots
parent: Courses
layout: default
math: mathjax
nav_order: 2
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

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


# 14.3 Surgical Robotics 

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 14.3.1 Key terms

No deep prerequisites here, this section is just to spark your curiosity and show what surgical robots can do.

Before we dive in, have a look at the terms below. You will see them throughout the chapter and videos, and having them fresh in mind will make everything that follows much clearer!

| Term | Definition |
|------|------------|
| **Open surgery** | Traditional approach that uses a large incision to give the surgeon direct, hands-on access to the operative field. |
| **Minimally invasive surgery (MIS)** | Techniques that operate through small incisions (or none at all) with slender instruments and a camera, reducing trauma, pain, and recovery time: based on *how you reach the surgical site* |
| **[Laparoscopic surgery](https://www.youtube.com/watch?v=IB_NMkMF-qU)** | A form of MIS in which rigid instruments and a camera (laparoscope) are inserted through several small abdominal ports; the surgeon views the field on a video monitor. |
| **Microsurgery** | Procedures carried out under an operating microscope with specialized micro-instruments, enabling work on vessels, nerves, and other tiny structures at sub-millimetre scales (focus is on precision at the tissue level, not incision size): it is about *what you do once you are there*. |
| **[Single-port](https://www.youtube.com/watch?v=wLuMnNgF8B4&t=23s) / single-site surgery** | MIS executed through a single multi-channel port—often hidden in the navel, using articulating tools and cameras that fan out inside the body. |
| **Hybrid (robot + laparoscope) procedures** | Surgeries that mix robotic assistance for precision tasks with conventional laparoscopic or open steps, blending the strengths of each method. |

---

## 14.3.2 Course Content

### 14.3.2.1 What exactly *is* a Surgical Robot?

Robotic surgery turns a surgeon’s hands into micron-level instruments. While the surgeon sits at a 3-D console, the robot scales big hand moves down to hair-thin motions, filters out tremor, and bends its “wrists” in ways no human wrist can. The payoff: cleaner cuts, steadier sutures, and faster healing for the patient.

To see that precision in action, watch the clip below, a surgical robot neatly stitches the fragile skin of a corn kernel with thread finer than a human hair. If it can sew corn, imagine what it can do for arteries, nerves, or the delicate lining of the eye.

<figure>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/bgRAkBNFMHk" title="Microsurgical suturing of a corn kernel"></iframe>
  <figcaption>Suturing a corn kernel with 12‑0 suture (Sony R&D Center, 2024).</figcaption>
</figure>

---

### 14.3.2.2 How Do Surgeons *Drive* the Robot?
*(The steps below describe a **typical multi-arm, master-slave platform**—think da Vinci, Hugo, Versius, etc.)*

1. **Console in, scalpel out** – The surgeon slips fingers into two pen-like master grips, peers into a magnified 3-D viewer, and rests feet on pedals, no handheld scalpels at the bedside.  
2. **Hand to micro-hand translation** – Every twist, pinch, or roll of the grips is mirrored at the instrument tips but motion-scaled (e.g., 10 mm hand move → 1 mm instrument move) and tremor-filtered.  
3. **Pedals for “extras”** – Left foot cycles camera zoom/focus; right foot fires energy (cautery, stapler) or toggles motion-scaling ratios on the fly.  
4. **Head-tracking safety** – Lift your head and the image blanks, freezing the arms—an instant pause button built into the viewer.  
5. **Team play** – A scrub nurse swaps single-use instruments; an assistant may steady tissue through an extra laparoscopic port.  
6. **Setup hurdle** – Before all this, a trained team spends few minutes “docking” the robot’s arms around the patient; good positioning makes the case smooth, poor positioning causes arm clashes.

In short, surgeons drive the robot with **finger finesse and foot taps**, while the software handles scaling, tremor filtering, and safety limits.




Here is a short documentary that traces the rise of surgical robots, explains how the technology works, and shows the real-world benefits for patients.
![Robotic Surgery Unlocks a New Era of Medicine](https://www.youtube.com/watch?v=_aJhNXXWmq0&t=34s)
><sub>*Robotic Surgery Unlocks a New Era of Medicine, 5-minute mini-doc tracing the rise of surgical robots, how the da Vinci works, and how this is benefit for patients, Youtube video, 1 july 2020. Available at:https://www.youtube.com/watch?v=_aJhNXXWmq0&t=34s*</sub>

Follow up with this surgeon’s-eye view: Dr Mary Maish takes you inside the cockpit, describing how she drives the robot for lung-cancer operations and why her patients recover faster than with open surgery.

![Inside the world of a robotic surgeon](https://www.youtube.com/watch?v=8z0oJR9S1Ps)
><sub>*Interview, talk from Dr. Mary Maish, M.D, talking about her expereince using the surgery robot. Youtube video, 1 july 2020. Available at:https://www.youtube.com/watch?v=8z0oJR9S1Ps*</sub>

---

### 14.3.2.3 Challenges of robotic-assisted surgery (RAS) adoption

| **Challenge Zone** | **Operational Impact** | **Representative Limitations** |
|------------|------------------------|--------------------------------|
| **A. Human–Robot Fit** | Ensuring the console, instruments, and feedback feel intuitive and non-fatiguing for the surgeon. | • Limited instrument DOF can force awkward wrist/arm postures.<br>• Long sessions in a closed console may strain neck and back.<br>• Haptic feeback cues remain sparse or lagging.<br>• Camera/tool motion may not match individual surgeon style. <sup>[3]</sup> |
| **B. Operating-Room (OR) Environment** | Harmonising the robot’s footprint with existing OR traffic, equipment and acoustics. | • Tight layouts and umbilical cables create trip hazards.<br>• Frequent redocking to reach multiple quadrants.<br>• Console placement and ambient noise could affect team communication.<br> <sup>[3]</sup>|
| **C. Workforce & Training** | Building a uniformly competent team across all roles who interact with the system. | • Inconsistent curricula (formal courses vs. peer shadowing).<br>• Lack of universal, competency-based credentialing.<br>• Novices struggle without tactile cues that open surgery provides. <sup>[3]</sup>|
| **D. Autonomy & Core Technology** | Moving from teleoperation to context-aware assistance without compromising safety. | • **Decision support**—robot must know *when* and *how* to help.<br>• **Safe navigation** through soft, mobile anatomy.<br>• **Reliable tissue recognition**.<br>• Real-time motion/force control cannot tolerate latency. <sup>[4]</sup>|
| **E. Cost & Workflow Integration** | Justifying capital outlay while maintaining, or improving, throughput and outcomes. | • High purchase and consumable costs.<br>• Learning-curve case times initially longer than laparoscopy.<br>• Extra storage, maintenance and service contracts. <sup>[5]</sup>|
| **F. Ethics & Regulation** | Defining accountability and patient trust as autonomy increases. | • Ambiguous responsibility for semi- or fully autonomous steps.<br>• Regulatory pathways for AI modules still evolving.<br>• Patient concerns over robotic intervention in critical organs.<br>• Data-privacy issues around OR video and telemetry. <sup>[4]</sup>|

---

### 14.3.2.4 Types of Surgical-Robot 

No single robot can tackle *every* anatomy or access route, so the field has splintered into task-specific platforms.  
A practical way to organise them is by **where they enter the body** and **what they must do once inside**:


| **Robot family (entry route)** | **Typical use-cases** |
|--------------------------------|-----------------------|
| **Multi-port laparoscopic**  <br>(3-4 small abdominal trocars) | Urology, gynaecology, general soft-tissue resections |
| **Single-port & NOTES**  <br>(single umbilical port or natural orifice) | Scar-less cholecystectomy, trans-oral / trans-anal procedures |
| **Orthopaedic milling / alignment** | Knee & hip arthroplasty, fracture screw guidance |
| **Spine & neuro navigation** | Pedicle screws, stereotactic biopsies, DBS lead placement |
| **Endovascular & cardiac catheter** | Coronary stents, structural-heart repair, EP ablation |
| **Flexible endoluminal** | Colonoscopy, bronchoscopy, GI sub-mucosal dissection |
| **Capsule & micro-robots** | Wireless GI imaging, targeted drug delivery, micro-suturing research |

<sub>*Adapted from Zhang et al., 2024 IEEE ICMA review on laparoscopic, orthopaedic, vascular-intervention and NOTES robots.*</sub>


If you want to explore more examples, head over to **[robots.sfits.ch](https://robots.sfits.ch/)** — an open, continuously-updated catalogue where you can:

* **Filter** systems by access route, end-effector motion type, degree of autonomy, specialty and more.  
* Open each robot’s profile for a concise tech overview **plus the latest manufacturer news & milestones**.

---

### 14.3.2.5 News & Emerging Innovations

#### Humans-in-the-Loop — For Now  
Focus-group interviews suggest that clinicians are **eager for “light” autonomy** but demand an instant-override option:
  
* **Assist, don’t replace** – surgeons are happy to let the robot hold tissue tension or re-centre the scope **as long as they remain in charge**.  
* **Full autonomy = mixed feelings** – enthusiasm is tempered by worries over edge cases and liability.

Result: current Research and Development focuses on **decision-support or task-support modules** rather than “driver-less” surgery.

#### Stay on the Cutting Edge  
For real-time breakthroughs—autonomous suturing prototypes, first-in-human trials, clever camera algorithms—bookmark **[Surgical Robotics Technology › News](https://www.surgicalroboticstechnology.com/category/news/)**, this provides the latest news, events, products, technology and jobs from the Surgical Robotics industry.


#### Spotlight Videos 

- [Will robots replace surgeons? Testing surgical robots, Robots in Japan](https://www.youtube.com/watch?v=OfX6qiJKDMk)  
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

> Innovation is sprinting ahead, but **trust, tactile realism, and transparent AI oversight** must grow just as fast—winners will be helpers that *earn* surgeon confidence, not “black-box” pilots.


<!-- 
## 5. News & Emerging Innovations
*(synthesised from Fuller et al., 2025 Applied Ergonomics)*
A lag in the amount of trust in automation integrated in surgery and 
the current efforts of automation in RAS could be observed from clini
cians. This sentiment was expounded upon through focus groups and 
surgeon interviews, with most circulating nurses and surgical techni
cians being unfamiliar with any attempts at automation despite previous 
attempts at automation in plan generation, plan execution, and plan 
monitoring during RAS procedures and current attempts at automated 
surgical tasks and artificial intelligence integration (Fiorini et al., 2022; 
Reddy et al., 2023). However, many were open to the idea of lower 
levels of automation in RAS. Similarly, surgeons were cautious about 
fully autonomous RAS platforms, but showed interest in additional 
automation for simple tasks and decision support so long as they 
remained in control. These interviews suggest that any immediate at
tempts at automation in RAS should ensure that surgeons can still exert 
high levels of control over the system,___
____

If you want a real-time pulse on fresh breakthroughs - whether it’s an autonomous-suturing prototype, a first-in-human trial, or a smart new camera-control algorithm - bookmark the [Surgical Robotics Technology](https://www.surgicalroboticstechnology.com/category/news/) news feed. The site provides coverage from companies and research labs pushing the frontiers of microsurgery and robotic surgery.


- [Can AI make surgery safer?](https://www.youtube.com/watch?v=NEgUaGHYxNg)  
  <sub>*YouTube, 2024 – https://www.youtube.com/watch?v=NEgUaGHYxNg*</sub>  
  *Shows how operating-room video and instrument data can be fed to machine-learning models to **score a surgeon’s technique in real time**—turning subjective judgements into objective numbers and actionable feedback.*

## Old version 

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

- [Will robots replace surgeons? Testing surgical robots, Robots in Japan](https://www.youtube.com/watch?v=OfX6qiJKDMk)  
  <sub>*YouTube, 14 Aug 2020 – https://www.youtube.com/watch?v=OfX6qiJKDMk*</sub>  
  *A Tokyo-based surgical-robotics specialist tackles three big questions:*  
  **Why do we need surgical robots? What happens if one makes a mistake? Could they ever replace human surgeons?**  
  The clip blends lab footage with expert commentary to give balanced, easy-to-grasp answers.

- [How are surgical robots made? Go behind the scenes](https://www.youtube.com/watch?v=_WsgJznDVIc)  
  <sub>*YouTube, 15 Sep 2020 – https://www.youtube.com/watch?v=_WsgJznDVIc*</sub>  
  *Step onto Intuitive Surgical’s factory floor and watch a da Vinci robot come to life—from precision machining and clean-room assembly to surgeon training, stress testing, and final quality inspection.*

- [Can AI make surgery safer?](https://www.youtube.com/watch?v=NEgUaGHYxNg)  
  <sub>*YouTube, 2024 – https://www.youtube.com/watch?v=NEgUaGHYxNg*</sub>  
  *Shows how operating-room video and instrument data can be fed to machine-learning models to **score a surgeon’s technique in real time**—turning subjective judgements into objective numbers and actionable feedback.* -->

-----------------------

## 14.3.3 Credit

This course page was created by **Shujiro Shobayashi, MSc in Robotics at EPFL**, and funded by **IEEE RAS** and **EPFL**.  

-----------------------


## 14.3.4 Reference:

1. <a id="ref1"></a>Morrell, A. L. G., Morrell-Junior, A. C., Morrell, A. G., Mendes, J. M. F., Tustumi, F., de Oliveira-e-Silva, L. G., & Morrell, A. (2021). *The history of robotic surgery and its evolution: when illusion becomes reality.* Revista do Colégio Brasileiro de Cirurgiões, 48, e20202798. https://doi.org/10.1590/0100-6991e-20202798  

2. <a id="ref2"></a>Pugin, F., Bucher, P., & Morel, P. (2011). *History of robotic surgery: From AESOP® and ZEUS® to da Vinci®.* Journal of Visceral Surgery, 148(6), e3–e9. https://doi.org/10.1016/j.jviscsurg.2011.04.007  

3. <a id="ref3"></a>Fuller, P., Joseph, A., Kennedy, S., Ball, M., Carbonell, A., Duffie, H., Cha, J. S., Gainey, M., & Luo, Q. (2025). *Understanding the challenges of robotic-assisted surgery adoption: Perspectives from stakeholders and the general population on human interaction, built environment, and training.* Applied Ergonomics, 122, 104403. https://doi.org/10.1016/j.apergo.2024.104403

4. <a id="ref4"></a>Shan, J. (2025). Surgical Robotics: Recent Development Trends and Challenges. In Proceedings of the 2025 IEEE International Conference on Robotics and Technologies for Industrial Automation (ROBOTHIA) (pp. 1-6). Kuala Lumpur, Malaysia. https://doi.org/10.1109/ROBOTHIA63806.2025.10986348

5. <a id="ref5"></a>Zhang, L., Qi, X., Peng, Y., Bao, S., Yuan, J., & Guo, S. (2024). Review on Development Status, Challenges and Development Trends of Surgical Robots. In Proceedings of the 2024 IEEE International Conference on Mechatronics and Automation (ICMA) (pp. 709-714). Tianjin, China. https://doi.org/10.1109/ICMA61710.2024.10633193




*Last updated: June 26, 2025*
---

[Back to Top](#start)