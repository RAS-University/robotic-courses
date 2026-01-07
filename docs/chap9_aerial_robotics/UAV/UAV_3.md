---
title: "9.3 Cost and Benefits"
parent: "Introduction to UAVs"
layout: default
nav_order: 3
chapter: 9
section: 3
publish: true
---

<script src="../../questions.js"></script>

<style>
  #go-to-next {
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

  #go-to-next:hover {
    opacity: 1;
  }
  </style>

<style>
  #go-to-previous {
    position: fixed;
    bottom: 100px;
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

  #go-to-previous:hover {
    opacity: 1;
  }
  </style>  

  <a href="/docs/chap9_aerial_robotics/UAV/UAV_2" id="go-to-previous" title="Go to Previous Chapter">⬅​</a>

<style>
  .formula-window{
    border-left: 4px solid #E7250C; 
    background: #f8f9fa; 
    padding: 1em;
  }
</style>

<style>
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 10px;
    min-height: 150px;
    width: 45%;
    background-color: #f9f9f9;
  }

  .drag-item {
    background-color: #e3e3e3;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    margin: 4px;
  }

  .check-button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 10px;
    font-weight: bold;
  }
</style>

<style>
.tab-window {
  border: 2px solid #e8f4fd;
  border-radius: 10px;
  background: #f8f9fa;
  width: 100%;
  max-width: 900px;
  margin: 1.5em auto;
  box-shadow: 0 2px 8px rgba(42,122,226,0.08);
  overflow: hidden;
}

.tab-title {
  background: #e8f4fd; 
  padding: 0.5em; 
  font-size: 1.2em; 
  font-weight: bold; 
  color: #2b7bb9; 
  border-top-left-radius: 5px; 
  border-top-right-radius: 5px;
}

.tab-header {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #e8f4fd;
}

.tab-btn {
  flex: 1;
  min-width: 120px;
  padding: 0.7em 1em;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: #2b7bb9;
  transition: background 0.2s;
}
.tab-btn.active {
  background: #e8f4fd;
  color: #2b7bb9;
}

.tab-content {
  display: none;
  padding: 1em;
}
.tab-content.active {
  display: block;
}

.images {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
.images img {
  width: 100%;
  max-width: 550px;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* Responsive video container */
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin: 1em 0;
}
.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* Responsive behavior */
@media (max-width: 700px) {
  .tab-btn {
    flex: 1 1 100%;
    text-align: center;
  }
  .tab-title {
    text-align: center;
  }
}
</style>

<script>
function showTab(idx, windowId) {
  var windowElem = document.getElementById(windowId);
  var btns = windowElem.querySelectorAll('.tab-btn');
  var tabs = windowElem.querySelectorAll('.tab-content');
  btns.forEach((btn, i) => btn.classList.toggle('active', i === idx));
  tabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
}
</script>

# Unmanned Aerial Vehicles

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## 1. Prerequisites
To get the most of this module, it is recommended that you have knowledge in:
1. **Basic Mechanical Physics**
  - Newton's laws of motion, especially the third law of action and reaction. 
  - Concepts of **moments** and **torques**.

## 2. General Motivation
<div style="margin-bottom: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/dji_mini_5_pro.webp" alt="DJI mini pro 5 - a small consumer camera drone." style="width: 400px; height: auto;">
  <p style="font-size: small;">DJI mini pro 5 - a small consumer camera drone. Picture from <a href="https://store.dji.com/ch/product/dji-mini-5-pro?vid=199551g" target="_blank">DJI</a></p>
</div>

Unmanned Aerial Vehicles (UAV) are flying object's without a pilot and controlled remotely or are autonomous. They are usually referred to as drones. And probably now, when you hear the word _drone_ you are thinking of a small commercial quadcopter people use to take stunning video shots like on the image above? Or maybe you are thinking of drone racing? Or maybe of military drones used more and more frequently in modern war?
But, did you know that drones/UAVs are much more than only quadcopters?
The first consumer drone entered the market in 2013 - the DJI Phantom 1. In the last decade the drone market got revolutionized and is growing in an incredible pace. More complex mechanics, more stable control and more autonomy. This and the following lectures will give you an overview of different drone types, aerodynamic principles, and what it takes to build and control an UAV.

This module about UAVs aims to give an introduction to aerial robotics and provide an overview over different drone types, their aerodynamical principles and their associated cost and benefits.


## Chapter 3 : Cost and Benefits

Most commercial drones are small (<1kg), but depending on their principle they offer different applications. Different architectures bring more autonomy, stability or maneuverability. The below graphic shows an interesting relationship between range and weight of the aircrafts. While very small-scale drones are almost exclusively flapping-wing drones, their flight time is also short. For long range flights, fixed wing aircrafts achieve by far the greatest autonomy. Rotorcrafts are covering the space in between: mid-range flights and small (<1kg) mid-sized drones.

<div style="float: left; margin-right: 15px; text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/uav/dronetype_flighttime_weight.webp" alt="Drone types against flight time and weight" style="width: 600px; height: auto;">
  <p style="font-size: small;">The figure shows different drone types and compares flight time against weight. From <a href="https://www.nature.com/articles/nature14542/figures/3" target="_blank">Floreano & Woods, Nature 2015, Fig. 3</a></p>
</div>

### Questions
TODO...

## Additional Resources

### Credits:
This course page was created by **Lisa Romana Schneider, MSc in Robotics at EPFL**, and funded by **IEEE RAS** and **EPFL**. 

### Additional Resources:
<!-- List all the sources that could be relevant to a reader who would like to know more, including   -->
Raymer, D. P. (1992). Aircraft design: A conceptual approach (2. ed). American Institute of Aeronautics and Astronautics.




