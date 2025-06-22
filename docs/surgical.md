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
No need any prerequisite, this section is made just to catch your interest, introcuding the coolest part of what robot can do and how this can be useful in the future. 
just have fun. 

Here are somes keywords list to understand **Surgical Approaches & Techniques**:

| Term | Definition |
|------|------------|
| **Open surgery** | Traditional approach that uses a large incision to give the surgeon direct, hands-on access to the operative field. |
| **Minimally invasive surgery (MIS)** | Umbrella term for techniques that operate through small incisions (or none at all) with slender instruments and a camera, reducing trauma, pain, and recovery time. |
| **Laparoscopic surgery** | A form of MIS in which rigid instruments and a camera (laparoscope) are inserted through several small abdominal ports; the surgeon views the field on a video monitor. |
| **Microsurgery** | Procedures carried out under an operating microscope with specialized micro-instruments, enabling work on vessels, nerves, and other tiny structures at sub-millimetre scales. |
| **Single-port / single-site surgery** | MIS executed through a single multi-channel port—often hidden in the navel—using articulating tools and cameras that fan out inside the body. |
| **Hybrid (robot + laparoscope) procedures** | Surgeries that mix robotic assistance for precision tasks with conventional laparoscopic or open steps, blending the strengths of each method. |


## 2. General Motivation

![Sony](https://www.youtube.com/watch?v=bgRAkBNFMHk)
><sub>*Suturing of a corn kernel with tiny suture needles. YouTube video, 9 mai 2024. Available at: https://www.youtube.com/watch?v=bgRAkBNFMHk*</sub>

Maybe you have ever watched this very famous video that showing the suturing of a corn kernel with tiny suture needles called 12-0 using a prototype of microsurgery assistance robot. this driven by the desire to make advanced surgeries more accessible to both those performing treatment and those in need of treatment, is advancing research and development of surgical assistance robot technology.

how does it control, how do they train. 

What kind of surgery, we have been doing in surgical robotic, 
what it can do, what it doesnt 

what its for ?why is it important 

at what stage we are now in surgical robotic 

what the future might be ?

The small introduction of surgery: 
1. Open surgery with big incisions --> long recover 
2. minimal surgery, laparocopic surgery which was small incisions,
3. Davinci system --> see more durin operation

![Robotic Surgery Unlocks a New Era of Medicine](https://www.youtube.com/watch?v=_aJhNXXWmq0&t=34s)
><sub>* Youtube video, 1 july 2020. Available at:https://www.youtube.com/watch?v=_aJhNXXWmq0&t=34s*</sub>


![Inside the world of a robotic surgeon](https://www.youtube.com/watch?v=8z0oJR9S1Ps)
><sub>*Interview, talk from Dr. Mary Maish, M.D, talking about her expereince using the surgery robot. Youtube video, 1 july 2020. Available at:https://www.youtube.com/watch?v=8z0oJR9S1Ps*</sub>


# Surgical Robotics

## 1.  Why Care About Surgical Robotics?

Robotic surgery lets surgeons operate through tiny incisions with wrist‑like micro‑instruments, tremor filtration, and immersive 3‑D vision. The viral clip below shows a robot suturing the delicate skin of a corn kernel—an eye‑catching example of the precision that is now possible.

<figure>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/bgRAkBNFMHk" title="Microsurgical suturing of a corn kernel"></iframe>
  <figcaption>Suturing a corn kernel with 12‑0 suture (Sony R&D Center, 2024).</figcaption>
</figure>

## 2.  How We Got Here – A 30‑Year Timeline

| Era                     | Key Milestones                                                                                                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1990s – Early 2000s** | Transition from open to laparoscopic (“key‑hole”) surgery. First FDA clearance for *da Vinci* System (2000).                                                                                                                   |
| **2010s**               | Broader adoption, >1 million robot‑assisted procedures/year worldwide. Multi‑port platforms mature; single‑port systems emerge.                                                                                                |
| **2020‑2025**           | Competitive landscape grows (*Hugo™*, *Versius*, *Ottava*, etc.). Growth in new specialties (thoracic, colorectal, microsurgery) and geographic expansion. AI‑guided camera control, image fusion and 5G teleoperation pilots. |

## 3  What Exactly *Is* a Surgical Robot?

Robotic surgery (also called robotic-assisted surgery) is perphapsthe most cutting-edge medical techonology of modern times: the surgeon sits at a console, guiding articulated instruments that pivot around small incisions perfoming minimally invasive surgery technique. Core technologies:

* 3‑D stereoscopic vision (high‑definition or 4K).
* Wristed end‑effectors with 7+ degrees of freedom.
* Tremor filtering & motion scaling (e.g. 10 mm hand motion → 1 mm instrument motion).
* Advanced imaging integration (fluorescence, ultrasound, CT overlay).
* Cloud‑connected simulators for skills training and credentialing.

## 4  What Can Surgical Robots Do *Today*? (2025)

* **Soft‑tissue procedures** – prostatectomy, hysterectomy, hernia & colorectal resections are routine.
* **Thoracic & cardiac** – lobectomy, mitral‑valve repair with fewer sternotomies.
* **Head‑and‑neck & trans‑oral** – tumor resection with better access.
* **Microsurgery prototypes** – super‑microsurgical lymph‑venous anastomosis at 0.3 mm scale.

> **Numbers at a glance (2025)**
> • 1.6 M *da Vinci* procedures in 2024; >8 million cumulative
> • *Hugo™* in use across 25 + countries, pivotal U.S. urology trial met endpoints
> • *Versius* surpassed 30 k procedures in 30 countries
> • First‑in‑human cases with *Ottava* completed April 2025

## 5  Limitations & Challenges

* Up‑front capital cost (€1–2 M) and disposable instrument pricing.
* Bulky footprints in tight ORs.
* Limited haptic feedback (though force‑sensing instruments are under development).
* Learning curves & credentialing logistics.
* Reimbursement frameworks still evolving beyond urology & gynecology.

## 6  Where Are We Now?

2025 marks a transition from **single‑vendor dominance** to a **multi‑platform era**. New entrants focus on modularity, portability, and procedure‑specific robots, while incumbents add AI‑driven assistance (e.g., autonomous suturing algorithms in validation). Regulatory bodies are drafting **IEC 80601‑2‑2xx** standards to cover partial autonomy and cybersecurity.

## 7  What’s Next?

* **Autonomous sub‑tasks** – camera targeting, tissue tracking, knot‑tying.
* **Augmented reality overlays** – intra‑operative MRI/CT visible in the console.
* **Miniaturization** – magnetically anchored robots & in‑body ‘robots in a pill’.
* **Telesurgery** – 5G pilots showing sub‑150 ms latency across continents.
* **Data‑driven ORs** – intra‑operative analytics feeding back to training simulators.

## 8  Watch & Learn

<figure>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/_aJhNXXWmq0" title="Robotic Surgery Unlocks a New Era of Medicine"></iframe>
  <figcaption>Short explainer on the benefits of robot‑assisted surgery (Kurzgesagt, 2020).</figcaption>
</figure>

<figure>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/8z0oJR9S1Ps" title="Inside the world of a robotic surgeon"></iframe>
  <figcaption>Interview with Dr Mary Maish on day‑to‑day robotic practice (2020).</figcaption>
</figure>

## 9  Further Reading & Resources

* **Society of Robotic Surgery (SRS)** – guidelines & conference talks
* **FDA MAUDE database** – adverse event reports for robotic systems
* **Intuitive | Clinical Evidence Hub** – peer‑reviewed outcomes data
* **Medtronic Hugo™ Clinical Evidence**
* **CMR Surgical Versius®** – modular RAS platform details
* **IEEE Transactions on Medical Robotics and Bionics** – latest research

## 10  News & Emerging Innovations

If you’d like a real‑time pulse on fresh breakthroughs—whether it’s an autonomous suturing prototype, a first‑in‑human trial, or a clever new camera‑control algorithm—bookmark the Surgical Robotics Technology news feed. Each week they curate announcements from companies and research labs pushing the frontier of microsurgery and robotic surgery.

https://www.surgicalroboticstechnology.com/category/news/
---

*Last updated: June 17, 2025*


Surgical Robotics 🚀 When Precision Meets Possibility

Table of Contents
{:toc}

1  Why This Should Blow Your Mind

Picture a robot sewing the fragile skin of a corn kernel with hair‑thin 12‑0 thread—flawless knots, zero tremor. That’s not sci‑fi; it’s 2024 R&D. Surgical robots turn a surgeon’s hands into micron‑level instruments, opening a new chapter where tiny cuts mean giant recoveries.

2  30 Years in 30 Seconds – The Fast‑Forward Timeline

Era

Surgical Reality

Mic‑Drop Moment

1990s

Keyhole laparoscopy replaces 10‑inch incisions.

First FDA nod for da Vinci (2000).

2010s

Robots go mainstream—>1 M cases/yr.

3‑D HD vision & wristed tools rock urology.

2020‑25

Multi‑vendor arms race. AI sneaks into the console.

First autonomous camera steering & 5 G telesurgery pilots.

3  Under the Hood – Anatomy of a Surgical Robot

Master Console – cockpit‑style controls & immersive 4 K 3‑D displays.

Wristed End‑effectors – 7 DoF freedom mimicking the human wrist, scaled down 10:1.

Motion Magic – tremor filtering, haptic mapping, and tissue‑specific force limits.

Imaging Fusion – fluorescence, ultrasound, CT overlays dancing in real time.

Cloud Simulators – VR gyms where rookies level‑up without touching a patient.

4  What Robots Can Do for Patients (2025)

🌟 Soft‑Tissue All‑Stars – prostate, uterus, colon… mini scars, maxi precision.

🫀 Chest‑Cracking? No More – lobectomies & valve repairs through keyholes.

🗣️ Trans‑oral Tumor Takedown – reach the unreachable angles of the throat.

🪡 Super‑Microsurgery – lymph‑venous vessels thinner than a human hair.

Stat Snapshot

1.6 M da Vinci procedures in 2024.

Hugo™ active on 25 + countries; pivotal U.S. trial ✔︎.

Versius® crosses 30 k cases; first FDA gall‑bladder nod.

Ottava first‑in‑human surgery completed (Apr 2025).

5  Dragons Yet to Slay

💰 Price Tag – €1–2 M per system + disposables.

📦 OR Real Estate – big foot‑prints in tiny theatres.

🖐️ Feel vs Steel – limited tactile feedback (but force‑sensing probes are coming).

🎓 Learning Curve – surgeons need practice hours & credentialing pathways.

💼 Reimbursement – beyond urology & gyn, payers still crunch the numbers.

6  The 2025 Landscape – A Multi‑Platform Sprint

Platform

Focus

Cool Factor

da Vinci Xi

Versatile workhorse

4 arms, single‑port variant, AI camera assist.

Hugo™ RAS

Modularity

Cart‑based pods fit tight ORs.

Versius®

Portability

Lightweight arms & open‑console design.

Ottava

In‑ceiling robotics

Clears floor space; first human cases 2025.

Niche bots

Ortho, eye, spinal

Procedure‑specific precision.

7  Glancing at the Horizon

🤖 Autonomous Sub‑tasks – suture, staple, debride while the surgeon supervises.

🕶️ AR Overlays – real‑time CT “X‑ray vision” inside the patient.

🩺 Magnetically‑Anchored Mini‑Bots – swim inside the abdomen, leave no scar.

🌐 5 G Telesurgery – continent‑spanning ORs with <150 ms latency.

📊 OR Analytics – every move logged → smarter training & error prevention.

8  Watch & Learn – Two Must‑See Clips

9  Dive Deeper – Curated Resources

Society of Robotic Surgery – best‑practice guidelines & conferences.

FDA MAUDE – adverse‑event database for transparency.

Intuitive Clinical Hub – peer‑reviewed outcomes.

Medtronic Hugo™ Evidence – ongoing trials & white papers.

CMR Surgical Versius® – modular RAS platform data.

IEEE Trans. Medical Robotics & Bionics – cutting‑edge research.

10  🔥 Fresh Off the Robot Arm

Feel the pulse of progress! The Surgical Robotics Technology news feed drops weekly adrenaline shots: autonomous knot‑tying breakthroughs, first‑in‑human nano‑vascular repairs, fresh regulatory green‑lights, and head‑to‑head platform showdowns.

https://www.surgicalroboticstechnology.com/category/news/

Other interesting videos:
- [Will robots replace surgeons? | Testing surgical robots | Robots in Japan](https://www.youtube.com/watch?v=OfX6qiJKDMk)
><sub>*Will robots replace surgeons? | Testing surgical robots | Robots in Japan YouTube video, 14 August 2020. Available at: https://www.youtube.com/watch?v=OfX6qiJKDMk*</sub>
This video answers to the questions Why do we need surigcal robots ? What if they made mistake ? And could they really replace huan surgeons one day ? To find the answers to thoses questions, in this videos, a specialist in srugical system in tokyo. 

- [How are surgical robots made? Go behind the scenes.](https://www.youtube.com/watch?v=_WsgJznDVIc)
><sub>*ow are surgical robots made? Go behind the scenes, Youtube video, 15 September 202. Available at: https://www.youtube.com/watch?v=_WsgJznDVIc*</sub>
This video present how to make the famous surgical robots, Da Vinci surgical systems, developped by Intuitive Surgical. this video presents from manufacturing to training and tetsing and quality insecption. 

Last updated: June 17 2025

