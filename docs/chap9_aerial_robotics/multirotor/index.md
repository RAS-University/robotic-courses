---
title: "Multirotor Drones"
parent: "Chapter 9: Aerial Robotics"
layout: default
nav_order: 1
chapter: 9
section: 3
publish: true
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

# Multirotor Drones 

{% assign sections = site.pages | where: "parent", page.title | sort: "section" %}
{% for section in sections %}
- {% if section.publish == false %}
  <span class="unfinished">{{ section.title }} </span>
  {% else %}
  [{{ section.title }}]({{ section.url }})
  {% endif %}
{% endfor %}
