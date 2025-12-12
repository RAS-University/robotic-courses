<!-- ---
title: Motion Control
parent: Courses
layout: default
math: mathjax
--- -->

<!-- TODO: Is this page used? -->


# Motion Control {#start}

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


- Table of Contents
{:toc}

tema Hallo

# Motivation and recap to control systems

In robotics and automation, a control system is the foundational mechanism that governs how machines behave in response to a desired goal. Whether it's a robotic arm assembling parts or a drone stabilizing itself in mid-air, control systems manage commands, regulate outputs, and adapt to disturbances using control loops. They are found everywhere, from simple thermostats regulating home heating to sophisticated industrial controllers that operate entire manufacturing lines.

At its core, a control system compares what you want the system to do (the reference) with what it is actually doing (the output) and generates a corrective command to minimize the difference. This is achieved through feedback. For example, in a self-driving car, if the vehicle drifts off-course, sensors detect the deviation and send a correction signal to the steering system to get it back on track.


Mettre video de n'importe quelle chose contrôlée.


Key Benefits of an Open Loop Control System
Open loop control systems have several advantages that make them suitable for various applications.

Simplicity: Open-loop systems are typically less complicated than closed control loop systems. Their design and operations are straightforward, making them easier to understand and implement.

Stability: Due to the absence of a feedback loop, open-loop systems remain unaffected by potential disturbances in the feedback, ensuring consistent performance.

Cost Efficiency: Constructing and maintaining an open loop system is usually more cost-effective due to its simple structure.

Speed: Without the need to process feedback information, open-loop systems can often operate more swiftly than their closed-loop counterparts.

Immunity to Feedback Issues: Open loop systems are immune to problems that may arise in the feedback loop, such as noise interference or feedback stability issues. This makes them a reliable choice in certain applications.


Benefits of a Closed Loop Control System
Closed-loop control systems present several advantages, making them an ideal choice for certain applications.

Accuracy: Due to the feedback mechanism, closed-loop systems can provide more accurate control than open-loop systems. The system continuously monitors its output and makes necessary adjustments to achieve the desired output.

Adaptability: Closed loop systems can adapt to changes in the operating environment or process conditions due to their feedback loop. This makes them suitable for applications where the conditions may vary and require continuous adjustment.

Stability: Despite potential disturbances, a well-designed closed-loop system can maintain stability in its output. The feedback mechanism enables the system to correct itself and prevent deviation from the set point.

Automation: With their self-regulating nature, closed-loop systems can operate without much human intervention, making them ideal for automated processes.

Efficiency: By continuously monitoring and adjusting their output, closed-loop systems can operate efficiently, reducing waste and saving resources.


* Intro control --> Le problème c'est que ça peut pas juste être une intro, la personne doit avoir des bases de unit response, impulse response, système LTI https://mrcet.com/downloads/digital_notes/ECE/II%20Year/Control%20Systems.pdf?utm_source=chatgpt.com https://home.uia.no/michaeru/Course_slides_feedback_control_systems_for%20mechatronics_and_robotics.pdf?utm_source=chatgpt.com

* Open-loop vs closed-loop

En fait ce qu'on va faire c'est juste présentetr vite fait les différentss signaux (juste peut-être dire que **1** c'est Dirac), dann on met le tableau sans explication de comment on a tropuvé ces résultats et on met les captures en menu défilant 
Tracking vs régulation --> juste dire intuitivement ce que c'est
mettre les exos de Karimi

* Maintenant on rentre dans la black box, what happens inside the controller
* P vs D vs I : ecrire quelques mots, expliquer un peu les maths und dann, les laisser jouer avec la simu und sagen sie what do you observe ? und après expliciter plus --> on peut aussi mettre les images de karimi

* Combinations: PI vs PD vs PID maybe in the form of an exrcise
* Tuning techniques
