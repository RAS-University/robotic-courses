---
title: "Robotic Application Domains"
parent: Courses
has_children: true
nav_order: 4
layout: default
---


<style>
  .unfinished { color: #b39ddb; }
  .unfinished::after {
  content: " (Release in Fall 2026)";
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

# Robotic Application Domains

{% assign sections = site.pages | where: "parent", page.title | sort: "nav_order" %}
{% for section in sections %}
- {% if section.publish == false %}
  <span class="unfinished">{{ section.title }} </span>
  {% else %}
  [{{ section.title }}]({{ section.url }})
  {% endif %}
{% endfor %}