---
title: Courses
has_children: true
nav_order: 2
layout: default
---

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

<style>
.ak-drop { margin: .4rem 0 .8rem 0; border: 1px solid #e5e7eb; border-radius: .5rem; }
.ak-drop > summary { cursor: pointer; padding: .6rem .9rem; font-weight: 600; list-style: none; }
.ak-drop[open] > summary { border-bottom: 1px solid #e5e7eb; }
.ak-drop > .content { padding: .7rem .9rem .9rem; }
.ak-drop summary::-webkit-details-marker { display: none; }
.ak-drop summary::before { content: "▸"; display: inline-block; margin-right: .45rem; }
.ak-drop[open] summary::before { content: "▾"; }
</style>

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


<style>
ul {
  margin: 0;            /* remove top/bottom margin of the whole list */
  padding-left: 1.2em;  /* keep normal indentation */
  list-style: disc;      /* optional: keep bullets, or none */
}

li {
  margin: 0;            /* remove extra spacing around list items */
  padding: 0.3em;           /* remove padding */
  line-height: 1.2em;   /* compact vertical spacing */
}

li p {
  margin: 0;            /* remove paragraph spacing inside list items */
  display: inline;      /* keeps text flow like regular Markdown */
}
</style>

<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>

# Robotics Courses 

Explore the structured robotics courses below, designed to guide you from fundamental concepts to advanced robotics topics. Choose a topic to start your journey, and progressively build your robotics expertise. 

**Background/Prerequisites**: The RAS University assumes that you have an undergraduate-level training in mathematics. This includes knowledge of calculus, linear algrebra, probabilitis and statistics. 

If you are new to robotics, we recommend starting with Chapter 1 and progressing through the chapters in order. If you already have some background in the field, you may skip ahead to Advanced Topics I and II and explore the areas that interest you most. Each course begins with a list of prerequisites to help you determine whether you have the necessary foundation to follow along effectively. 
If you are already a robotics expert—or an expert in another field simply curious about the future of robotics—this course may not be the best fit. However, stay tuned: we will soon be launching an Executive Robotics Course Series designed specifically for you.


## Table of Contents 📚


<!-- Get all courses: pages whose parent is "Courses", sorted by nav_order -->
{% assign courses = site.pages | where: "parent", "Courses" | sort: "nav_order" %}
{% for course in courses %}
## {{ course.title }}

  <!-- Get chapters: pages whose parent is the course title -->
  {% assign chapters = site.pages | where: "parent", course.title | sort: "nav_order" %}

  {% for chapter in chapters %}

<!-- Special case: Chapter 9 has intermediate layers -->
{% if chapter.title == "Chapter 9: Aerial Robotics" %}
### {{ chapter.title }}
{% assign parents = site.pages | where: "parent", chapter.title | sort: "nav_order" %}
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
<!-- Default behavior for other chapters -->
### {{ chapter.title }}

        {% assign sections = site.pages | where: "parent", chapter.title | sort: "section" %}
        {% for section in sections %}
- {% if section.publish == false %}
  <span class="unfinished">{{ section.title }} </span>
  {% else %}
  [{{ section.title }}]({{ section.url }})
  {% endif %}
        {% endfor %}
    {% endif %}

  {% endfor %}

{% endfor %}

