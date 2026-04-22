---
title: "Chapter 9: Aerial Robotics"
parent: Robotics Advanced Topics I
has_children: true
nav_order: 9
layout: default
---


<style>
  .unfinished { color: #b39ddb; }
  .unfinished::after {
  content: " (Release in Summer 2026)";
  font-size: 0.9em;
  color: #b39ddb;
}
</style>

<style>
  /* Hide the theme-generated "Table of contents" that appears right after the page <hr> */
  hr + h2.text-delta,
  hr + h2.text-delta + ul {
    display: none;
  }
</style>

# Chapter 9: Aerial Robotics  

This chapter offers an introduction to aerial robotics, that consists of all robots that can fly autonomously. These are known as **Unmanned Aerial Vehicles (UAV)** or **drones**.  

## Sneak Peek into current state of the art of flying robots

Before we dive into the details of how UAVs work, we invite you to have a look at the video below, which gives you an overview of the current state of the art of flying robots and their main research questions. It doesn't go much into technical details, but it is a good starting point to make you curious about the topic and to give you a glimpse of the different drone types that exist.

![video](https://www.youtube.com/watch?v=U6ZP38XUrGs)
><sub>The present and future of flying robots - IEEE Robotics and Automation Society. Learn about the work of Dr. Roland Siegwart, Dr. Anibal Ollero, Dr. Dario Floreano, and Dr. Margarita Chli on flying robots and some of the challenges they are still trying to tackle. Available at: https://www.youtube.com/watch?v=U6ZP38XUrGs</sub>

## Course content

The aerial robotics course is divided into three sections. 

1: We begin with a brief review of aerodynamic principles, followed by an analysis of UAV design and the associated aerodynamic models, comparing conventional fixed-wing configurations with more advanced bio-inspired flapping-wing platforms.

2: We then address the modeling and control of quadrotor systems, a class of multirotor UAVs capable of vertical takeoff and landing (VTOL), emphasizing their nonlinear dynamics, flight stability, and control architectures, which underpin their widespread adoption due to high maneuverability and robustness. 

3: Finally, we present advanced control methodologies for UAVs, including cooperative and distributed control for multi-agent systems, vision-based feedback control, and the integration of aerial manipulation capabilities through onboard robotic manipulators, enabling tasks such as object transportation, perching, and physical interaction with the environment.

{% assign parents = site.pages | where: "parent", page.title | sort: "nav_order" %}
{% if parents.size > 0 %}
  {% for parent in parents %}
#### {{ parent.title }}
    {% assign sections = site.pages | where: "parent", parent.title | sort: "section" %}
    {% for section in sections %}
- {% if section.publish == false %}
  <span class="unfinished">{{ section.title }} </span>
  {% else %}
  [{{ section.title }}]({{ section.url }})
  {% endif %}
    {% endfor %}
  {% endfor %}
{% else %}
  {% assign sections = site.pages | where: "parent", page.title | sort: "section" %}
  {% for section in sections %}
  - {% if section.publish == false %}
  <span class="unfinished">{{ section.title }} </span>
  {% else %}
  [{{ section.title }}]({{ section.url }})
  {% endif %}
  {% endfor %}
{% endif %}
