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