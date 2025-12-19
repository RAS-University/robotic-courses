---
title: "Chapter 1: Basics of Motion Control"
parent: "Robotics Foundation"
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

# Chapter 1: Basics of Motion Control

{% assign sections = site.pages | where: "parent", page.title | sort: "section" %}
{% for section in sections %}
- {% if section.publish == false %}
  <span class="unfinished">{{ section.title }} </span>
  {% else %}
  [{{ section.title }}]({{ section.url }})
  {% endif %}
{% endfor %}