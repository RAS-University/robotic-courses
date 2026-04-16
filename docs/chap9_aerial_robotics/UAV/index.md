---
title: "Introduction to UAVs"
parent: "Chapter 9: Aerial Robotics"
has_children: true
nav_order: 1
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

# Introduction to UAVs  

## 1. General Motivation

Unmanned Aerial Vehicles (UAV) are flying object's without a pilot and controlled remotely or are autonomous. They are usually referred to as drones. And probably now, when you hear the word _drone_ you are thinking of a small commercial quadcopter people use to take stunning video shots like on the image above? Or maybe you are thinking of drone racing? Or maybe of military drones used more and more frequently in modern war?

<p style="margin-bottom: 15px;">
  <img src="{{ site.baseurl }}/assets/images/uav/dji_mini_5_pro.webp"
       alt="DJI mini pro 5 - a small consumer camera drone."
       style="width: 120px; height: auto; vertical-align: middle; margin-right: 10px;">
  DJI mini pro 5 - a small consumer camera drone. Picture from
  <a href="https://store.dji.com/ch/product/dji-mini-5-pro?vid=199551g" target="_blank">DJI</a>
</p>

But, did you know that drones/UAVs are much more than only quadcopters? They now can mimic flying dynamics of birds and insects in stunning ways. Of course, each design comes with different control challenges. This course module will give you an overview of different drone types, and what it takes to build and control an UAV.

{% assign sections = site.pages | where: "parent", page.title | sort: "section" %}
{% for section in sections %}
- {% if section.publish == false %}
  <span class="unfinished">{{ section.title }} </span>
  {% else %}
  [{{ section.title }}]({{ section.url }})
  {% endif %}
{% endfor %}
