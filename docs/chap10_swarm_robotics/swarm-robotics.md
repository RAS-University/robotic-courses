---
title: 10.1 Fundamentals # Name of the chapter
parent: "Chapter 10: Swarm Robotics"
has_children: false
nav_order: 1  # Must match the subnumber (e.g., 1 for 10.1, 3 for 10.3;
layout: numbered
math: mathjax
chapter: 10
section: 1 # Must match the subnumber (e.g., 1 for 10.1, 3 for 10.3;
publish: true # To see your page on the menu. Should be set to false on branch main and develop before it's ready
nav_exclude: false # Link to the page on the navigation menu. Should be set to true on main and develop before it's ready
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<style>
.algorithm {
  border-left: 4px solid #3b82f6; /* blue accent */
  background: #f0f7ff;            /* soft blue background */
  padding: 12px 16px;
  margin: 1em 0;
  border-radius: 6px;
  font-family: "JetBrains Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.algorithm strong {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}
</style>


<style>
/* Lightweight styling for callouts and quizzes */
.definition, .assignment, .example, .slide{
  border-left: 4px solid #0ea5e9; padding: 0.75rem 1rem; margin: 1rem 0; background: #0ea5e90d;
}

.note {
  border-left: 4px solid #e9620eff; padding: 0.75rem 1rem; margin: 1rem 0; background: #e9990e0d;
}

.freading {
  border-left: 4px solid rgb(141, 141, 141); padding: 0.75rem 1rem; margin: 1rem 0; background: #ecececdd;
}

.slide { border-left-color:#22c55e; background:#22c55e0d; }
.assignment { border-left-color: #16a34a;background: #ecfdf5 }
.example { border-left-color:#a855f7; background:#a855f70d; }

.mcq { border:1px solid #e5e7eb; border-radius:8px; padding:1rem; margin:1rem 0; }
.mcq h4 { margin:0 0 0.5rem 0; }
.mcq .options { margin:0.5rem 0; }
.mcq label { display:block; cursor:pointer; margin:0.25rem 0; }
.mcq .actions { margin-top:0.5rem; }
.mcq button { border:0; padding:0.5rem 0.8rem; border-radius:6px; background:#111827; color:white; }
.mcq .result { margin-top:0.5rem; font-weight:600; }
.mcq.correct { border-color:#22c55e; background:#22c55e10; }
.mcq.incorrect { border-color:#ef4444; background:#ef444410; }
code.k { background:#f3f4f6; padding:0.1rem 0.3rem; border-radius:4px; }
</style>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


# Swarm Robotics

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## Prerequisites

To get the most out of this XXX module, it’s helpful to have:

---

## General Motivation

We are becoming increasingly familiar with robots that can perform tasks in a wide range of domains. Think, for example, of a lawn mower robot, an autonomous vacuum cleaner, or a flying drone for leisure photography. Today, these robots are mostly limited to operating as individual solutions. Soon, cooperation between robots will play a major role in transforming these solutions into large-scale robotics services. The problem is that programming robots to work together remains a challenging task that demands the expertise of skilled designers.

In this chapter, we explore how swarm robotics has emerged as a field to help address this problem. First, we introduce key concepts and provide a context to the field. Then, we discuss the challenges of designing robot swarms and approaches to help in designing their coordinated collective behavior. The chapter ends with practical sessions on the design of typical swarm robotics collective behaviours.

Swarm robotics is a rapidly developing field and the goal of the material presented here is not to be comprehensive. Rather, it is to provide robotics enthusiasts and practitioners with sufficient bases to explore the field on their own. Ideas on how to improve this chapter are welcomed—please refer to the contact section by the end.

---

## Course Content

---

### Introduction

In a nutshell, a robot swarm is a self-organized group of robots that, by working together, can collectively perform missions beyond the capabilities of individual robots. 

![Swarm of e-puck robots](../../assets/images/swarm-robotics/e-swarm.png)
*Figure 1. Swarm of [e-puck](<CITE:MonBonRae-etal2009arsc>) robots.*

A particularity of robot swarms is that the robots operate autonomously without relying on a leader robot or on external infrastructure. The collective behavior of a robot swarm—and hence the swarm’s ability to accomplish a particular mission—results solely from the interactions that the robots have with the environment and with their peers.

The problem is that, as of today, conceiving and implementing a collective behavior for a robot swarm is challenging. The desired collective behavior for the robots is specified globally for the swarm, but this behavior cannot be programmed directly. At design time, one must produce control software to program the individual actions of the robots. At deployment time, the collective behavior of the swarm will emerge from the interactions between robots, and robots and their environment. The challenge is that no generally applicable method exists to tell what an individual robot should do so that the desired collective behavior is obtained in the swarm.

Swarm robotics emerged therefore as the study of how to design robot swarms. The field's seminal work is often dated to 2005, with work by [Sah2005sab](<CITE:Sah2005sab>) and [Ben2005sab](<CITE:Ben2005sab>). Since then, swarm robotics has attracted attention in the scientific community, with numerous papers published in high visibility venues such as *Nature*, *Science*, *Science Robotics*, and similar ones.

Indeed, the design of robot swarms has been identified as one of the [major robotics challenges](<CITE:YanBelDup-etal2018SCIROB>) to be addressed in the upcoming years. [Recent discussions](<CITE:DorTheTri2020SCIROB>) have foreseen the enablers that would drive the advance of swarm robotics:

1. the appearance of novel robot platforms that can operate in unstructured and dynamic environments;
2. the development of new methodologies for the design of collective behaviors ;
3. new opportunities to exploit emergence;
4. the shift of focus towards applications suited for large groups of coordinated robots—e.g., precision agriculture, ecological monitoring, and city cleaning.

Although the future is promising, it is worth noting that, at present, most achievements in swarm robotics research still occur under controlled laboratory conditions.

<div class="freading">
  <details markdown="1">
  <summary><strong>Read further</strong></summary> 
  Examples of swarm robotics enablers:
  1. Novel platforms: ([BerGauNag2021SCIROB](<CITE:BerGauNag2021SCIROB>))
  2. New methodologies: ([MatChrOgr-etal2017NATUCOM](<CITE:MatChrOgr-etal2017NATUCOM>))
  3. Exploiting emergence: ([GarBir2018SCIROB](<CITE:GarBir2018SCIROB>))
  4. Focusing on application challenges: ([HunHau2020NATUMINT](<CITE:HunHau2020NATUMINT>))

  Exciting research in swarm robotics:
  - [RubCorNag2014SCI](<CITE:RubCorNag2014SCI>)
  - [WerPetNag2014SCI](<CITE:WerPetNag2014SCI>)
  - [GarBir2018SCIROB](<CITE:GarBir2018SCIROB>)
  - [SlaCarCar-etal2018SCIROB](<CITE:SlaCarCar-etal2018SCIROB>)
  - [YuWanDu-etal2018NATUCOM](<CITE:YuWanDu-etal2018NATUCOM>)
  - [LiBatBro-etal2019NATU](<CITE:LiBatBro-etal2019NATU>)
  - [XieSunFan-etal2019SCIROB](<CITE:XieSunFan-etal2019SCIROB>)
  - [HasLigRudBir2021NATUCOM](<CITE:HasLigRudBir2021NATUCOM>)
  - [TalSahMarRei2021SCIROB](<CITE:TalSahMarRei2021SCIROB>)
  - [CasHarPenDor2021SCIROB](<CITE:CasHarPenDor2021SCIROB>)
  - [StrPacDor2023SCIROB](<CITE:StrPacDor2023SCIROB>)
  - [SalGarBir2024COMMENG](<CITE:SalGarBir2024COMMENG>)
  - [ZhuOguHeie-etal2024SCIROB](<CITE:ZhuOguHeie-etal2024SCIROB>)
  </details>
</div>

### How to get started into swarm robotics?

**Beginners work** building robots, instantiating robots in simulator. Simple robots are a convenient way to work with physical and simulated swarms. emerging collective capabilities.

**Enthusiasts work** Experimenting with collective behaviours. Why? Fascinating biology- and physics-inspired behaviours. Closed and easy-to-understand models. Vast literature. Typical behaviours: X, y, z. Covered in the practical sessions

**Advanced work** Using machine learning. Covered later in this chapter.

---

### Fundamentals of robot swarms and swarm robotics

A robot swarm is a redundant and self-organized group of robots capable of coordination and cooperation. Individually, the robots of a swarm are usually simple and have limited capabilities with respect to the task they must perform. However, through the collective actions of the group, the swarm can overcome the limitations of individual robots and perform missions that a single robot could not perform alone.

Robot swarms are the embodiment of the ideas and concepts of [swarm intelligence](<CITE:DorBir2007SCHOLAR>). This characterization has remained consistent since the early work that formally introduced the systems. For example, [Ben2005sab](<CITE:Ben2005sab>) described robot swarms as groups of non-intelligent robots that, when combined, function as a single intelligent entity. 

Indeed, the robots of a swarm are mostly considered to operate with reactive control and limited information-processing. They miss the inference or planning abilities typical of other robotic systems. However, despite these limitations, they can achieve complex collective behaviors by relying solely on local interactions between robots and between robots and the environment.

The increasing interest in the design and realization of robot swarms gave rise to swarm robotics: a research field devoted to the study, development, validation and application of groups of robots that coordinate via swarm intelligence. Originally, swarm robotics emerged from the need to empirically validate theoretical models of social animal behavior—primarily driven by research in biology. 

However, in recent years, the field has gradually shifted its focus. Although there is still interest in applying biological principles to the design of robot swarms, an increasing amount of research is now focused on developing engineering approaches that stand on their own. There is a growing body of literature that emphasizes the need for systematic design methods that guarantee system properties and performance levels in the operation of robot swarms.

<div class="freading">
  <details markdown="1">
  <summary><strong>Read further</strong></summary> 
  Virtual-physics models have been used to describe swarm behaviors such as:
  - Seminal work ([Ben2005sab](<CITE:Ben2005sab>); [Sah2005sab](<CITE:Sah2005sab>))
  - Scholarpedia  [DorBirBra2014SCHOLAR](<CITE:DorBirBra2014SCHOLAR>)
  - Brambilla  [BraFerBirDor2013SI](<CITE:BraFerBirDor2013SI>) and [SchUmlSenElm2020FRAI](<CITE:SchUmlSenElm2020FRAI>)
  - Evolution of the field [DorTheTri2021PIEEE](<CITE:DorTheTri2021PIEEE>)  
  - Heiko Hamann  [Ham2018book](<CITE:Ham2018book>)
  </details>
</div>

---

### Understanding collective behavior

The emergence of collective behavior from local interactions can be described and analyzed from two perspectives: the microscopic level and the macroscopic one.

---

At the **microscopic level**, the focus is on understanding how the individual actions of the robots contribute to the collective behavior of the swarm. Microscopic analyses study the behavior rules on which individual robots operate. The discussion centers on how a robot perceives its environment and how it responds to the local information it has available. 

In these analyses, the behavior of a robot is usually described by microscopic models that describe its control logic. Common approaches consider monolithic principled methods, such as virtual-physics models, or structured control architectures like finite-state machines. 

The microscopic perspective enables the application of bottom-up approaches to the design of robot swarms: one refines the control software of individual robots until a desired collective behavior emerges.

<div class="freading">
  <details markdown="1">
  <summary><strong>Read further</strong></summary> 
  Virtual-physics models have been used to describe swarm behaviors such as:
  - [Pattern formation](<CITE:SpeSpeHamHei2004AR>)
  - [Chain formation](<CITE:MaxSpeSpe2009IFACPV>)
  - [Collective exploration](<CITE:HowMatSuk2002dars>)

  Probabilistic finite-state machines have been used to describe collective behaviors such as:
  - [Aggregation](<CITE:SoySah2005sis>)
  - [Chain formation](<CITE:NouCamDor2008SI>) 
  - [Division of labor](<CITE:LabDorDen2006ACMTAAS>)
  - [Task allocation](<CITE:LiuWinSa-etal2006AB>)
  </details>
</div>

---

In contrast, the focus at the **macroscopic level** is on understanding the behavior of the swarm as a whole and describing how it evolves over time. These analyses aim to characterize the overall functioning of the collective behavior of the robots and its related properties.

The traditional approach to conducting macroscopic studies is to apply mathematical analysis and modeling. Work by [Hamann](<CITE:Ham2012ants>), for example, promotes the development of generally applicable swarm models and formalisms to provide insight into the behavior and properties of robot swarms. Differential equations are commonly used for this purpose in the literature. 

Recently, data-driven approaches have gained notable attention as an alternative for characterizing and analyzing collective behaviors. Data-driven approaches typically rely on the application of performance measures that specify the collective behavior under study. 

However, most effective approaches combine mathematical modeling and data-driven protocols to better understand intrinsec properties of the collective behavior of groups of robots. For example, [KucLucAvr-etal2024icra](<CITE:KucLucAvr-etal2024icra>) combined traditional mathematical modeling with data-driven analysis to shed light on misunderstood aspects of the scalability of robot swarms.

<div class="freading">
  <details markdown="1">
  <summary><strong>Read further</strong></summary> 
  Examples on the analysis of collective behavior via differential equations:
  - [Object clustering](<CITE:MarIjsMon1999RAS>)
  - [Foraging](<CITE:LerGal2002AR>)
  - [Flocking](<CITE:WinLiuNemMar2008SI>)
  - [Stick pulling](<CITE:LerGalMarIjs2001AL>)

  Analysis of collective behavior via data-driven methods:
  - [Swarm performance indicators](<CITE:SoySah2005sis>), measurements derived from empirical data that describe the degree of robustness, scalability, and flexibility of a robot swarm.
  - [Sim2real predictors](<CITE:MilSooHau2023arxiv>), data-driven protocol to predict the real-world performance of robot swarms by analyzing their statistical performance in simulation.
  </details>
</div>

---

### Characteristics of a robot swarm

Robot swarms share the typical characteristics of swarm intelligence systems. As discussed before, the behavior of a robot swarm emerges from local interactions between individuals and between the individuals and their environment. Despite being limited to local perception and communication, the robots can coordinate to perform missions that are relatively complex given their individual capabilities.

Robot swarms operate in large groups without the need for centralized control or external infrastructure to guide their actions, or to assist with their localization and communication. A swarm is capable of self-organization and parallelization. If required by the mission, it can autonomously define roles and distribute tasks among its members. For example, [FerTurDue-etal2015PLOSCB](<CITE:FerTurDue-etal2015PLOSCB>) investigated how roles emerge in a robot swarm during a complex foraging mission. In the experiments, the task was autonomously divided into simpler sub-tasks and distributed among the robots. Similarly, [GarBir2018SCIROB](<CITE:GarBir2018SCIROB>) demonstrated that a group of robots can adopt specific roles to collectively sequence and plan the execution of sub-tasks.

Robot swarms are often characterized as redundant homogeneous systems. In the literature, the most common swarm configuration is a group of robots that share the same physical design, are built with identical hardware, and run the same control software. This homogeneity, originally adopted from other disciplines in swarm intelligence, has facilitated the study of self-organization with groups of robots in simple scenarios. However, it is at the same time a restrictive working hypothesis. Recent discussions have emphasized the need to inject a degree of heterogeneity into the system to tackle more complex missions ([DorTheTri2021PIEEE](<CITE:DorTheTri2021PIEEE>)).

At a basic level, this has been achieved by considering **quasi-homogeneous** robot swarms. These configurations rely on robots that have similar, but not identical, physical capabilities and/or operate with different control software. This approach was adopted by [StrCasDor2018aamas](<CITE:StrCasDor2018aamas>) to study collective decision-making in swarms that comprise two types of robots: those susceptible to change their opinion and those that exhibit stubborn behavior, remaining fixed on a single opinion. In a different context, [JonWinHauStu2019AIS](<CITE:JonWinHauStu2019AIS>) experimented with the automatic design of collective behaviors by allowing each robot to independently develop its own control software.

Studies on fully operational heterogeneous robot swarms are rare and are mainly conducted in simulation. For example, [AswPin2023iros](<CITE:AswPin2023iros>) conducted simulations of multi-skilled groups of robots that must coordinate to perform a series of tasks. In their experiments, robots dynamically form coalitions to complete tasks that require the combined skills of different robots in the group.

The most notable example of a heterogeneous robot swarm using physical robots was achieved by [DorFloGam-etal2013IEEERAM](<CITE:DorFloGam-etal2013IEEERAM>) in the Swarmanoid project. In this project, the researchers created a swarm of aerial, wheeled, and grasping robots that could self-organize and cooperate to perform an object retrieval mission.

##### Distinction from other multi-robot systems

Swarm robotics is a specific approach to the coordination of multi-robot systems that can be distinguished from other more general approaches. Overall, other multi-robot systems typically incorporate advanced capabilities that are excluded from robot swarms, such as:

- global localization and information about their environment;
- complex planning and interaction rules between robots;
- sophisticated communication protocols with guaranteed connectivity;
- explicit assignment of roles and identities;
- precise knowledge of the number of operating robots;
- an explicit definition of the mission to be performed; and
- centralized control or coordination.

It is worth noting that this is not a strict boundary between swarm robotics and other forms of multi-robot systems. In fact, many systems discussed in this Chapter may incorporate some of these capabilities. The distinction between robot swarms and other multi-robot systems is meant to provide a useful framework for organizing the literature. It allows for fair comparisons between approaches, sets appropriate expectations for the collective capabilities of the systems, and helps to give context to the design challenges addressed. 

For a broader overview of swarm robotics in the context of other multi-robot systems, we refer the reader to [ParRusSuk2016hr](<CITE:ParRusSuk2016hr>).

---

#### Desirable properties of a robot swarm

The main characteristics of a robot swarm—self-organization, redundancy, and locality—enable the group of robots to operate with varying degrees of *robustness*, *scalability*, and *flexibility*. These are desirable system properties that have traditionally attracted attention to the realization of robot swarms.

---

The **robustness** of a robot swarm refers to the group's ability to tolerate individual robot failures. As discussed before, a robot swarm is a redundant system composed of a large number of individuals. If a few robots in the swarm fail, the overall operation is not significantly impacted as other robots continue to operate. Furthermore, because the swarm operates autonomously without a leader or external control infrastructure, the system has no single point of failure.

In this topic, [ChrOgrDor2009IEEETEVC](<CITE:ChrOgrDor2009IEEETEVC>) conducted studies on the autonomous detection and repair of failing robots—thus improving the overall resilience of the system. In their experiments, the failure of a robot could be collectively detected by its peers, which could then take action to make it operative again. More recently, [LeeMilHau2022IEEERAL](<CITE:LeeMilHau2022IEEERAL>) investigated methods to quantify the severity of individual robot failures and their impact on the overall performance of the swarm. The study aimed to support autonomous decision-making processes that could identify when interventions are needed.

---

The **scalability** of a robot swarm refers to the possibility of adding or removing robots to the group without having to redefine their behavior rules. More precisely, it refers to the ability of the swarm to remain unaffected by changes in the number of robots.

The scalability of a swarm is closely related to the locality of the information with which robots operate. Each robot interacts only with neighboring peers, which makes it unaffected by the actions (or inaction) of robots outside its perception range. As a result, a robot is not severely affected by the appearance or disappearance of robots in portions of the swarm that are not directly perceivable.

A remarkable demonstration of the scalability of robot swarms was presented by [RubCorNag2014SCI](<CITE:RubCorNag2014SCI>) with the successful deployment of one thousand coin-sized legged robots named Kilobots. It is important to note that the environment in which the robots operate affects the scalability of the swarm. A significant change in the number of robots can drastically affect the density of the swarm, which in turn can greatly impact its operation. The scalability is therefore tied to the density of interactions between robots ([Ham2018book](<CITE:Ham2018book>)). [HamRei2021IEEETC](<CITE:HamRei2021IEEETC>) studied this phenomenon in depth and proposed a general model to predict the potential for scalability in robot swarms and other parallelized systems.

---

The **flexibility** of a robot swarm refers to the group's ability to adapt to a wide range of tasks and/or potential changes in its environment. As already mentioned, the robots of a swarm are typically homogeneous, unspecialized, and deployed without predefined roles. Through self-organization, they can adapt to the specific requirements of the mission at hand. This flexibility allows the swarm to be easily reconfigured, display a variety of collective behaviors, and coordinate in different ways to perform its mission.

The adaptability of robot swarms is well demonstrated by the evolution of the field itself. Much of the existing swarm robotics literature reports results obtained with generic simple robots endowed with similar functional capabilities ([DorTheTri2021PIEEE](<CITE:DorTheTri2021PIEEE>))—for example, the foot-bot ([DorFloGam-etal2013IEEERAM](<CITE:DorFloGam-etal2013IEEERAM>)) and the e-puck ([MonBonRae-etal2009arsc](<CITE:MonBonRae-etal2009arsc>)). Relying on similar functional capabilities, swarms of foot-bots and e-pucks have been shown to be capable of addressing problems that require abilities as diverse as the emergence of shape ([MatChrOgr-etal2017NATUCOM](<CITE:MatChrOgr-etal2017NATUCOM>)) and planning ([GarBir2018SCIROB](<CITE:GarBir2018SCIROB>)). Moreover, foot-bots, e-pucks, and similar robots are the common base of numerous studies on typical problems like aggregation, foraging, and collective decision-making—as detailed in the reviews by ([BraFerBirDor2013SI](<CITE:BraFerBirDor2013SI>); [NedSil2019SWEVO](<CITE:NedSil2019SWEVO>); [SchUmlSenElm2020FRAI](<CITE:SchUmlSenElm2020FRAI>)).

In the literature, robot swarms are often described as inherently robust, scalable, and flexible systems. However, it has been noted that these properties cannot be taken for granted and may require careful system design to achieve them to a certain degree ([DorTheTri2021PIEEE](<CITE:DorTheTri2021PIEEE>); [MilSooHau2023arxiv](<CITE:MilSooHau2023arxiv>)).

---

### Designing robot swarms: an open problem

In a robot swarm, coordinated collective behavior emerges from interactions among robots and between robots and their environment. Consequently, *designing a robot swarm* has traditionally been associated with identifying or engineering interaction rules to achieve a specific desired collective behavior. This association has been applied throughout the field, from studying self-organization in laboratory settings ([RubCorNag2014SCI](<CITE:RubCorNag2014SCI>)) to devising robot swarms that can help tackle real-world environmental challenges ([TzoSalMcc-etal2024arso](<CITE:TzoSalMcc-etal2024arso>)).

Although the issue of designing a desired collective behavior could be perceived as similar in many of these cases, the complexity of the design and assessment process varies as much as the diversity of the scenarios. Depending on the research goals, differences arise in the underlying hypotheses guiding the development of the system, the opportunities to abstract intervening factors and isolate key study variables, and the ability to establish experimental protocols suitable for statistical analysis.

As noted earlier in this chapter, there is no generally applicable way to tell how to program robots so that they effectively act as a robot swarm. There is a need for design methodologies that will enable the transition from laboratory experiments to real-world applications ([HunHau2020NATUMINT](<CITE:HunHau2020NATUMINT>); [JonMilSooHau2020AIS](<CITE:JonMilSooHau2020AIS>)). Today, researchers promote the adoption of engineering principles in the realization of robot swarms ([WinHarNem2005sab](<CITE:WinHarNem2005sab>); [BraFerBirDor2013SI](<CITE:BraFerBirDor2013SI>); [BozBir2018rose](<CITE:BozBir2018rose>); [BirLigBoz-etal2019FRAI](<CITE:BirLigBoz-etal2019FRAI>)).

### Manual design: the traditional approach

Researchers commonly design robot swarms via an iterative manual process. In this approach, a designer manually produces and refines the control software for individual robots until the desired collective behavior emerges—see, for example, [StoVarSvoBel2020FRAI](<CITE:StoVarSvoBel2020FRAI>). A few principled methods have been proposed to aid in the manual design process for specific problems and classes of missions ([SpeSpeHamHei2004AR](<CITE:SpeSpeHamHei2004AR>); [Kaz2009IJICC](<CITE:Kaz2009IJICC>); [SchHam2011bioinspired](<CITE:SchHam2011bioinspired>); [BerKumNag2011icra](<CITE:BerKumNag2011icra>); [BeaDulUsb-etal2012fpadl](<CITE:BeaDulUsb-etal2012fpadl>); [LopLeaDod-etal2014ants](<CITE:LopLeaDod-etal2014ants>); [BraBruDorBir2014ACMTAAS](<CITE:BraBruDorBir2014ACMTAAS>); [ReiValFer-etal2015PLOSONE](<CITE:ReiValFer-etal2015PLOSONE>); [ReiMilDorTri2015SI](<CITE:ReiMilDorTri2015SI>); [LopTreLea-etal2016SI](<CITE:LopTreLea-etal2016SI>); [PinBel2016IEEESW](<CITE:PinBel2016IEEESW>)). However, the underlying assumptions of these methods prevent them from offering a single universally applicable solution ([BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>)).

That is, they cannot offer on their own a single approach to design all types of collective behaviors. When these principled methods fall short or their underlying hypotheses are too restrictive for the problem at hand, manual trial-and-error remains the dominant approach for producing control software for robot swarms.

The manual approach has served to demonstrate the feasibility of a wide variety of collective behaviors ([BraFerBirDor2013SI](<CITE:BraFerBirDor2013SI>); [SchUmlSenElm2020FRAI](<CITE:SchUmlSenElm2020FRAI>)). However, it is labor-intensive and challenging to accurately evaluate or characterize its performance. Manual design heavily depends on the designer's expertise, which is difficult to transfer and makes the process challenging to reproduce by designers with different skill sets.

We argue that for swarm robotics to scale current robotics solutions into large-scale services, the common approach to producing control software for robot swarms must undergo a significant change. It must shift from a labor-intensive, ad hoc approach to a systematic engineering practice capable of producing robot swarms that are ready to operate out of the box. In this context, adopting automated practices can offer swarm designers a reproducible design process, enabling the production of control software with clearly defined performance guarantees. This is particularly relevant for application scenarios where the swarm must be repeatedly deployed and adapted to ever-changing environments ([BirLigBoz-etal2019FRAI](<CITE:BirLigBoz-etal2019FRAI>))—where lengthy manual development is not feasible.

Ackoff defines *puzzles* as issues in which the intervening factors and their relationships can be known and explicitly formulated. Puzzles are well-structured and have solutions that can be identified through reasoning or principled approaches. They are issues where all the necessary information can be made available and the solution becomes reproducible when the correct method is applied. The puzzle exists within a closed system where the intervening factors can be isolated and studied independently; however, solving the puzzle may still require significant effort.

A *puzzle* in the design of robot swarms is to find the set of rules and conditions that lead to the emergence of a particular collective behavior. The aim is to understand underlying principles. Typically, solving the puzzle involves manually applying a specific behavior model or a principled method to produce control software for the robots. This research is described in a large part of the swarm robotics literature. In the early years of swarm robotics, the puzzles helped to attract attention to the field with questions such as: how can a robot swarm aggregate? ([GarJosGau-etal2008AL](<CITE:GarJosGau-etal2008AL>)) or how can division of labor emerge in a robot swarm? ([KriBilKel2000NATU](<CITE:KriBilKel2000NATU>)). In a puzzle, the swarm is seen as a closed system, and it is expected that a solution to the puzzle can be discovered with enough time, expertise and effort devoted to the design process.

A significant body of literature now demonstrates that self-organization is viable in autonomous groups of robots, supported by the application of behavior models and principled methods. Recent examples include the emergence of shape ([SunZhoMa-etal2023NATUCOM](<CITE:SunZhoMa-etal2023NATUCOM>)), locomotion ([LiBatBro-etal2019NATU](<CITE:LiBatBro-etal2019NATU>)), and planning ([GarBir2018SCIROB](<CITE:GarBir2018SCIROB>)). Moreover, rather established taxonomies have characterized the diverse set of collective behaviors demonstrated ([BraFerBirDor2013SI](<CITE:BraFerBirDor2013SI>); [SchUmlSenElm2020FRAI](<CITE:SchUmlSenElm2020FRAI>)). Currently, addressing the design of robot swarms in the form of a puzzle helps unveil mechanisms of self-organization—for example, underwater coordination ([BerGauNag2021SCIROB](<CITE:BerGauNag2021SCIROB>)) or self-assembly under microgravity ([NisCheMak-etal2022icra](<CITE:NisCheMak-etal2022icra>)).

#### Challenges of the manual approach

This procedure is costly, time-consuming, and does not guarantee that the results are reproducible. Reproducibility is a fundamental attribute to be achieved in the design of robot swarms—as in all branches of engineering. It ensures that the outcomes of the design process are reliable and predictable, regardless of the designer’s subjective decisions, level of expertise, or any random variations in the process. In research, reproducibility is a cornerstone of scientific validity ([Bak2016NATU](<CITE:Bak2016NATU>)), as methods that produce reproducible results are more likely to gain acceptance and be further developed by the scientific community. A lack of reproducibility in the proposed design methodologies can limit the practical application of swarm robotics in real-world scenarios, where consistent and reliable performance is paramount.

### Computer-aided design: a more...

As an alternative to manual design, optimization-based methods can reduce the need for human intervention in the design process. In this approach, the design problem is restated as an optimization problem: an optimization algorithm explores a space of possible instances of control software for the individual robots, and selects the one that maximizes the collective performance of the swarm—according to a mission-specific performance measure. This approach can potentially allow the design problem to be addressed in a systematic and fully automatic way ([BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>)).

Common classifications of optimization-based design methods divide them into on-line and off-line methods, and into semi-automatic and (fully) automatic methods ([BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>)). This was discussed in further detail in Chapter `chap:int`. The methods presented in this dissertation belong to the automatic off-line design of robot swarms ([BirLigBoz-etal2019FRAI](<CITE:BirLigBoz-etal2019FRAI>)). We therefore limit our discussion to this approach.

Automatic off-line design methods produce the control software of the robots before the swarm is deployed. Typically, the design process is conducted first in simulation, and the control software obtained is then ported to the robots. The largest body of literature on the automatic offline design of robot swarms belongs to neuroevolution ([NolFlo2000book](<CITE:NolFlo2000book>); [Tri2008book](<CITE:Tri2008book>); [DonBreMouEib2015FRAI](<CITE:DonBreMouEib2015FRAI>))—both in the semi-automatic and fully automatic cases. In recent years, AutoMoDe ([FraBraBru-etal2014SI](<CITE:FraBraBru-etal2014SI>); [BirLigFra2021admlsa](<CITE:BirLigFra2021admlsa>)) has also received notable attention. In the remainder of the section, we provide a brief overview of notable studies in the automatic off-line design of robot swarms. We focus here on optimization-based methods other than those belonging to the AutoMoDe family, which are discussed in detail in Section `sec:soa:auto`.

For a more general overview of the approaches to the optimization-based design of robot swarms, we recommend the literature reviewed and organized by ([FraBir2016FRAI](<CITE:FraBir2016FRAI>); [BreHaaPri2018FRAI](<CITE:BreHaaPri2018FRAI>); [BirLigBoz-etal2019FRAI](<CITE:BirLigBoz-etal2019FRAI>); [BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>); [Kuc2023FRAI](<CITE:Kuc2023FRAI>)).

Optimization-based design is an alternative approach to the design of collective behaviors for robot swarms ([BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>)). In this approach, an optimization algorithm explores possible instances of control software for the robots and selects the one that maximizes performance on the specific mission at hand—according to a given performance measure. The computer-based nature of the approach improves the reproducibility achievable in the design process. Being performed by a machine, it reduces the influence of the designer’s subjective decisions, level of expertise, and any biases that may be manually introduced into the design process.

Optimization-based methods can be categorized with respect to different criteria. Common classifications divide them into (i) on-line and off-line methods, and into (ii) semi-automatic and (fully) automatic ones ([BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>)). When the control software is produced or refined while the robot operates in the target environment, the method is referred to as **on-line**. When the control software is generated before deployment, typically in simulation, the method is referred to as **off-line**. In semi-automatic methods, a human designer operates an optimization algorithm that serves as their primary design tool. On the contrary, automatic methods do not require any human intervention during the design process. Although these classifications are not to be considered as strict—indeed, hybrids exist—they are convenient to appreciate the relative merits of different methods and to properly define expectations on their performance ([BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>)).

In Ackoff's framework, a *problem* is more complex than a puzzle. Although a problem may still have identifiable solutions, they are not immediately apparent, and discovering them may require developing innovative approaches to assist the process. Moreover, a problem often has multiple solutions, and finding the optimal one requires balancing preferences on various intervening factors. A problem exists within a closed system, like a puzzle, but also requires handling uncertainties or incomplete information.

A more general *problem* in the design of robot swarms is to systematically explore, select, customize, and combine sets of rules and conditions that enable self-organization, with the aim of controlling the emergence of diverse and tailored collective behaviors. The complexity of the design process increases. In a sense, solving the problem requires developing a single general approach to solving many diverse swarm robotics puzzles. The design space to be explored is therefore much larger than that of a puzzle, and addressing this broader problem requires developing methods to aid in the generation of control software for robots, semi- or fully automatic ([BirLigBoz-etal2019FRAI](<CITE:BirLigBoz-etal2019FRAI>)).

To this end, literature focuses on developing automatic methods for designing robot swarms, rather than manually applying specific models or principled methods ([BirLigHas2020NATUMINT](<CITE:BirLigHas2020NATUMINT>)). In this approach, the issue of designing robot swarms is turned into an optimization problem. Given the specifications of a task for the swarm, an optimization process searches for suitable instances of control software that allow the robots to collectively perform the task ([BirLigBoz-etal2019FRAI](<CITE:BirLigBoz-etal2019FRAI>)).

In the design of robot swarms, the more general *problem* arises as the field matures into an engineering discipline, focusing on questions such as: how to develop automatic methods that generalize to various robot platforms and tasks? ([KegGarHas-etal2024RAL](<CITE:KegGarHas-etal2024RAL>); [Tri2008book](<CITE:Tri2008book>)) or how do automatic methods perform compared to manually producing control software for the robots? ([FraBraBru-etal2015SI](<CITE:FraBraBru-etal2015SI>)).

Recent demonstrations include the use of neuroevolution ([DuaCosGom-etal2016PLOSONE](<CITE:DuaCosGom-etal2016PLOSONE>)), modular methods ([SalGarBir2024COMMENG](<CITE:SalGarBir2024COMMENG>)), novelty search ([HasLigBir2023SWEVO](<CITE:HasLigBir2023SWEVO>)), and surprise minimization algorithms ([KaiHam2022IEEETR](<CITE:KaiHam2022IEEETR>)). These methods are meant to be task-agnostic, robust to performance variance, and capable of identifying a best solution among multiple potential ones.

Currently, addressing the design of robot swarms as a general problem leads to the development of methods that support the realization of robot swarms under predefined task requirements—for example, with the specification of tasks via demonstrations ([GhaKucGarBir2023icra](<CITE:GhaKucGarBir2023icra>)) and the on-board automatic generation of control software ([JonWinHauStu2019AIS](<CITE:JonWinHauStu2019AIS>)). Most of these approaches still consider the robot swarm as a closed system. Thus, the design process mostly handles uncertainties caused by the swarm itself, within controlled limits.

#### Challenges of the computer-aided approach

Computationally costly, objective function, etc. No progress.

---

#### Moving forward: designing swarms for the real-world

A *mess* is the most complex and challenging issue. Ackoff describes messes as systems of problems that are interconnected and interdependent. The core issue cannot be clearly defined; neither can a straightforward strategy be outlined to address it satisfactorily. In a mess, problems cannot be separated and solved individually; they must be understood and addressed as a whole. Messes are characterized by ambiguity, complexity, and uncertainty, and their resolution requires a holistic, systems-thinking approach ([Ack1981INTRF](<CITE:Ack1981INTRF>)).

We argue that designing large-scale robot swarms capable of operating out of the box in real-world settings is currently *a mess*. Swarm robotics is approaching real-world applications ([DorTheTri2021PIEEE](<CITE:DorTheTri2021PIEEE>)). A central focus remains in identifying suitable rules for self-organization, both in the form of a puzzle or a problem. However, the design process now extends to other interconnected issues, functional and non-functional, which relate to how robot swarms will operate in the real world.

We illustrate the current complexity of designing robot swarms by highlighting some of the issues that have gained attention in recent years, how they interrelate, and the research questions they raise.

In the real world, a robot swarm will have to function as an open system, exposed to unpredictable interactions with its environment. In this scenario, should a swarm operate as a static rule-following system, or should it be capable of learning and adapting? A swarm operating in an open and unstructured world could be endowed with distributed situational awareness to rapidly and accurately understand its environment and act accordingly ([JonMilSooHau2020AIS](<CITE:JonMilSooHau2020AIS>)). This awareness could also enable the collective accumulation of information and experience, opening opportunities for the continuous optimization of the behavior of the swarm through lifelong social learning and cultural evolution ([BreFon2021PTRSLSB](<CITE:BreFon2021PTRSLSB>); [CamAlbFre-etal2021ASOC](<CITE:CamAlbFre-etal2021ASOC>)).

In the real world, robots will not operate in isolation. They will interact with simple machines, other robots (or swarms), animals, and humans to perform their tasks ([RahCebObr-etal2019NATU](<CITE:RahCebObr-etal2019NATU>)). Therefore, when should a swarm engage and coordinate with other entities and when should it remain independent from them? To be more effective, a swarm could tailor its interaction rules to engage with entities that populate the environment ([AswPin2023iros](<CITE:AswPin2023iros>); [GarBir2024icra](<CITE:GarBir2024icra>))—whether cooperatively or non-cooperatively. However, safety and security measures may need to be implemented to protect both the swarm and others ([HunHau2020NATUMINT](<CITE:HunHau2020NATUMINT>); [CasHarPenDor2021SCIROB](<CITE:CasHarPenDor2021SCIROB>)).

Robot swarms will transition from the laboratory to the real world only if the design process effectively embodies societal motivations and concerns. Under these conditions, how can the design process address the diverse interests of relevant stakeholders? Robot swarms will have to be developed under policies and regulations that oversee their societal and ecological impact ([SwaIveHau2023tas](<CITE:SwaIveHau2023tas>); [KinPorStr-etal2023](<CITE:KinPorStr-etal2023>)). To foster societal trust and widespread adoption, advances in the design of robot swarms must be accompanied by the development of technologies to monitor, explain, and verify their actions ([WilChaWin-etal2023tas](<CITE:WilChaWin-etal2023tas>); [AlhAbdHau2022ants](<CITE:AlhAbdHau2022ants>); [NaiSooRam2024dars](<CITE:NaiSooRam2024dars>)). This should be applicable both during normal operation and in the edge cases ([KucLucAvr-etal2024icra](<CITE:KucLucAvr-etal2024icra>)). On the other hand, the design process should ensure that the swarms are cost-effective and allow for the implementation of financial strategies to generate economic value with the robots ([SalLigBir2019PEERJCS](<CITE:SalLigBir2019PEERJCS>); [DorPacReiStr2024NATUREN](<CITE:DorPacReiStr2024NATUREN>)).

Addressing the aforementioned problems and questions individually is difficult, and integrating their solutions into a cohesive research and development framework will be even more challenging. We contend that to solve *the mess*, a significant effort must be devoted to rethinking research goals and hypotheses, and to developing new holistic approaches and frameworks to design robot swarms.

---


## Credits

## Ressources




---

[Back to Top](#start)