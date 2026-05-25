---
title: 10.2 Practice - Collective Behaviors # Name of the chapter
parent: "Chapter 10: Swarm Robotics"
has_children: false
nav_order: 2  # Must match the subnumber (e.g., 1 for 10.1, 3 for 10.3;
layout: numbered
math: mathjax
chapter: 10
section: 2 # Must match the subnumber (e.g., 1 for 10.1, 3 for 10.3;
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

/* === Heading hierarchy polish === */
/* h3 — main section dividers (Random Walk, Aggregation, ...) */
.main-content h3,
article h3,
.page-content h3 {
  font-size: 1.7rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 2.5rem;
  padding-bottom: 0.35rem;
  border-bottom: 2px solid #e5e7eb;
}

/* h4 — exercise titles & subsections; make clearly visible */
.main-content h4,
article h4,
.page-content h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0c4a6e;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 0.6rem 0.9rem;
  border-left: 5px solid #0ea5e9;
  background: linear-gradient(90deg, rgba(14,165,233,0.10) 0%, rgba(14,165,233,0.00) 80%);
  border-radius: 0 6px 6px 0;
  line-height: 1.35;
}

/* Keep the MCQ widget h4 compact (reset overrides above) */
.mcq h4 {
  font-size: 1rem;
  font-weight: 600;
  color: inherit;
  margin: 0 0 0.5rem 0;
  padding: 0;
  border: 0;
  background: none;
  border-radius: 0;
}

/* Resources sub-blocks: ensure visible spacing between them */
.freading + .freading {
  margin-top: 1.25rem;
}

/* Make collapsible summaries feel clickable */
.freading details > summary {
  cursor: pointer;
  padding: 0.25rem 0;
  font-size: 1.05rem;
}
.freading details[open] > summary {
  margin-bottom: 0.5rem;
  border-bottom: 1px dashed #cbd5e1;
}

/* Slightly tighter horizontal rules */
hr {
  border: 0;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}
</style>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


# Practice - Collective Behaviors

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## Prerequisites

To get the most out of this XXX module, it's helpful to have:

---

## General Motivation

[Swarm robotics](http://www.scholarpedia.org/article/Swarm_robotics) is the study of how to design large groups of robots that can operate autonomously in a distributed way, and without the intervention of any external infrastructure or any form of centralized control. In a similar fashion as biologist study biological swarms, swarm robotics designers are largely focused on studying behaviors that robot swarms can exhibit.

In these practical sessions we will cover some of these behaviors, focusing mostly on demonstrating how the simple individual actions of each robot in a swarm lead the whole group of robots to act in an intelligent way.

## Course Content

### Getting Started

#### 1. Download the laboratory package (All operating systems)

You will need approximately **6 GB of free disk space**.

Download the laboratory package from the following link:

https://drive.google.com/file/d/1Cw6Fx7HD_i1BM6F-sqIGPoVTNxj-rSY_/view?usp=drive_link

After downloading:

1. Extract the compressed file anywhere on your computer.
2. Once extracted, you should obtain a folder named:

```text
swarm_robotics_lab/
```

This folder already contains:

- `docker-compose.yml`
- All course materials
- All practical exercises
- The complete folder structure required for the course

The structure should look similar to this:

```text
swarm_robotics_lab/
├── docker-compose.yml
└── course_materials/
    └── swarm_robotics/
        ├── sandbox/
        ├── obstacle_avoidance/
        ├── aggregation/
        ├── pattern_formation/
        └── foraging/
```

---

#### 2. Installation instructions by operating system

<div class="freading">
<details>
<summary><strong>🪟 Windows</strong></summary>
<div markdown="1">

<div class="note">
<strong>Important:</strong> This environment has been tested on Windows 11.
</div>

##### Step 1 — Install Docker Desktop

Docker is the software that will run the Ubuntu lab environment on your computer.

You can install **Docker Desktop** in either of these ways:

- From the **Microsoft Store** (recommended for beginners)
- From the official Docker website:
  https://www.docker.com/products/docker-desktop/

During installation, Docker may ask to enable a Windows feature called **WSL2** (*Windows Subsystem for Linux*). This is normal. In most cases, Docker configures it automatically.

After installation:

1. Restart your computer if Windows requests it.
2. Open the **Docker Desktop** application.
3. Wait until Docker finishes starting.

---

##### Step 2 — Start the laboratory for the first time

The first execution must be done from a terminal because Docker needs to download the full laboratory image.

Open:

- **PowerShell**, or
- **Command Prompt (CMD)**

Navigate to the `swarm_robotics_lab/` folder.

For example:

```powershell
cd Desktop\swarm-robotics-lab
```

Your path may be different depending on where you created the folder.

Run:

```bash
docker compose up
```

The first startup may take several minutes because Docker must download a large image.

Wait until you see:

```text
ARGoS Swarm Robotics Lab — Ready
```

---

##### Step 3 — Open the Ubuntu desktop

Open the following URL in your web browser:

```text
http://localhost:6080/vnc.html
```

Click:

```text
Connect
```

When prompted for the password, enter:

```text
swarmbot
```

You should now see the Ubuntu desktop environment running inside your browser.

---

##### Step 4 — Daily usage after the first execution

After the first setup, you usually do **not** need to use the terminal anymore.

Instead:

Open **Docker Desktop**
Locate the container named:

```text
argos-swarm-lab
```

Click the ▶ Start button
Open again:

```text
http://localhost:6080/vnc.html
```

---

##### Step 5 — Running experiments

Inside the Ubuntu desktop:

Right-click on the desktop
Select:

```text
Open Terminal Here
```

Verify that you are able to run an experiment by entering the following commands in the command line and see an interface similar to the image below:
```bash
cd ~/swarm_robotics/sandbox
argos3 -c sandbox.argos
```

![Argos3 Simulation]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/argos_simulation.png)



If the installation was successful, the ARGoS interface will spawn. If the interface displays correctly, you can close it by pressing the icon in the top right corner of the visualization window of the interface.

---

##### Troubleshooting

**The browser says "connection refused"**

Docker is probably still starting. Wait a few seconds and refresh the page.

---

**The simulation feels slow**

Docker runs graphics in software mode. Close heavy applications running in the background.

---

**Accented characters (á, ñ, é) do not work**

Inside Ubuntu:

```text
Applications → Settings → Keyboard → Layout
```

and add your preferred keyboard layout.

</div>
</details>
</div>

---

<div class="freading">
<details>
<summary><strong>🐧 Linux </strong></summary>
<div markdown="1">

<div class="note">
<strong>Important:</strong> The environment has been tested on Ubuntu 20.04.
</div>

##### Step 1 — Install Docker

Open a terminal and install Docker:

```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin
```

---

##### Step 2 — Enable Docker permissions

Add your user to the Docker group:

```bash
sudo usermod -aG docker $USER
```

Then restart your computer or log out and back in.

This step is important. If you skip it, Docker commands may fail unless executed with `sudo`.

---

##### Step 3 — Verify the installation

Run:

```bash
docker --version
```

and

```bash
docker compose version
```

Both commands should print version information without errors.

---

##### Step 4 — Start the laboratory

Open a terminal inside the `swarm_robotics_lab/` directory and run:

```bash
docker compose up
```

The first startup downloads several gigabytes of data, so it may take a while.

Wait until you see:

```text
ARGoS Swarm Robotics Lab — Ready
```

---

##### Step 5 — Open the Ubuntu desktop

Open the following URL in your browser:

```text
http://localhost:6080/vnc.html
```

Click:

```text
Connect
```

Password:

```text
swarmbot
```

You should now see the Ubuntu desktop environment.

---

##### Step 6 — Running experiments

Inside the Ubuntu desktop:

Right-click on the desktop
Select:

```text
Open Terminal Here
```

Verify that you are able to run an experiment by entering the following commands in the command line and see an interface similar to the image below:
```bash
cd ~/swarm_robotics/sandbox
argos3 -c sandbox.argos
```

![Argos3 Simulation]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/argos_simulation.png)


---

##### Daily usage

Open a terminal inside the swarm_robotics_lab/ directory.

To stop the laboratory:

```bash
docker stop argos-swarm-lab 
```

To start it again later:

```bash
docker start -ai argos-swarm-lab 
```


Your files inside `course_materials/` will remain safe.

---

##### Troubleshooting

**Permission denied errors**

This usually means the Docker group permissions were not applied correctly.

Try:

```bash
newgrp docker
```

or restart your session.

---

**The browser page does not open**

Check that the container is running:

```bash
docker compose ps
```

</div>
</details>
</div>

---

<div class="freading">
<details>
<summary><strong>🍎 macOS</strong></summary>
<div markdown="1">

<div class="note">
<strong>Notice:</strong> The macOS installation guide is still under preparation and has not yet been fully tested.

Support instructions for macOS will be added in a future update of the course materials.
</div>

</div>
</details>
</div>

---

### Introduction

During this part of the course: you will use the ARGoS simulator---a multi-robot simulator specialized in swarm robotics; you will simulate swarms of foot-bots---a robot widely used in swarm robotics research; and you will produce control software for the robots by using the LUA programming language.

This part of the course covers three particular cases of swarm robotics behaviors and one project on the topic:

- (P0) [Sandbox: the Foot-bot robot](#sandbox-the-foot-bot)
- (P1) [Random walk](#random-walk)
- (P2) [Aggregation](#aggregation)
- (P3) [Pattern formation](#pattern-formation)
- (P4) [Project: Foraging with forbidden areas](#project-foraging-with-forbidden-areas)

In sessions P1 to P3, you will be given with examples of robots exhibiting specifics swarm behaviors. Your task will be to develop the code that produces those behaviors, and experiment with it.

In session P4, you will be given with a mission to be performed with a robot swarm. Your task will be to design the swarm behaviors and develop the code to perform the mission.

The course is planned in a progressive manner---that is, the code that you develop in a practical session might be required in a following one.

#### Evaluation

The swarm robotics part of the course will be evaluated with the project that you will develop in the session [P4](#project-foraging-with-forbidden-areas).

#### Resources

In this section, you find the resources you will mostly use during this part of the course: an overview the foot-bot robot and the functions to interact with it in ARGoS, the definition of the most used mathematical functions in LUA, and a description of the ARGoS interface.

<div class="freading">
<details>
<summary><strong>User guide: The foot-bot</strong></summary>
<div markdown="1">

The foot-bot is a differential-drive wheeled robot specifically designed to conduct experiments with robot swarms. The robot is endowed with sensors and actuators that enable it to interact with other foot-bots and with the environment.

![The foot-bot]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/fbot.png)

In this course, you will use the wheels of the robot to navigate the scenarios, the proximity sensors to detect objects near the robot, the light sensors to measure the intensity of ambiance light, the ground sensors to identify the color of the floor, the RGB LEDs to display color lights and the omnidirectional camera to perceive those color lights, and finally, the range-and-bearing system to locate and communicate with other robots in the surroundings.

**Designing control software for the foot-bot**

The control software of the foot-bot will be developed in ARGoS by using the programming language LUA. After designing the control software for one robot, the controller will be ported automatically to all the robots in the swarm. The robot-related LUA functions are described in the following.

**Data structure**

The robot-related functions and data are stored in the table `robot`. For instance, to set the robot wheel speed, you need to call

```lua
robot.wheels.set_velocity(5,5)
```

Analogously, if you wish to store the reading of the 4th proximity sensor in a variable named `r`, you can type

```lua
r = robot.proximity[4].value
```

**Important note:** **Never** write directly into the robot attributes---that is, never assign a value to the reading of a sensor. For instance, the following line is an error.

```lua
robot.proximity[4].angle = 1.67
```

**Never** apply operations such as `table.sort()` to the robot table. If you intend to use the values of a robot table, copy that table first:

```lua
myprox = table.copy(robot.proximity)
table.sort(myprox, function(a,b) return a.value < b.value end)
```

**Robot ID** — A string containing a unique ID for each robot: `robot.id`

**Wheels**

![Position of the wheels from a top-view perspective of the robot]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/robot_wheels.png)

You can move the robot by using the function `set_velocity(l,r)`---where `l` and `r` are the left and right wheel velocity, respectively. For instance, to move the robot forward at 5cm/s:

```lua
robot.wheels.set_velocity(5,5)
```

The distance between the two wheels in cm is given by `robot.wheels.axis_length`. The current wheel velocity is stored in `robot.wheels.velocity_left` / `robot.wheels.velocity_right`, and the linear distance covered by the wheels in the last time step in `robot.wheels.distance_left` / `robot.wheels.distance_right`.

**Proximity sensors**

![Position of the proximity sensors from a top-view perspective of the robot]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/robot_proximity.png)

The robot has 24 proximity sensors equally distributed in a ring around the robot body. Each sensor has a range of 10cm and returns a reading composed of an `angle` in radians and a `value` in the range [0,1]. The value 0 corresponds to no object detected, while values > 0 mean that an object has been detected.

```lua
robot.proximity[1].angle
robot.proximity[1].value
```

**Light sensors**

![Position of the light sensors from a top-view perspective of the robot](https://dgarzonramos.github.io/robotics/robotics101/assets/images/robot_light.png)

The robot has 24 light sensors equally distributed in a ring around its body. Each sensor reading is composed of an `angle` in radians and a `value` in the range [0,1]. The value 0 corresponds to no light detected; values > 0 increase as the robot gets closer to a light source.

```lua
robot.light[1].angle
robot.light[1].value
```

**Ground sensors**

![Position of the ground sensors from a top-view perspective of the robot]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/robot_motor_ground.png)

The ground sensors read the color of the floor in a gray-scale. Values range from 0 (black) to 1 (white).

```lua
robot.motor_ground[1].value
robot.motor_ground[1].offset
```

**Range-and-bearing system**

The range-and-bearing system allows robots to perform localized communication. Two robots can exchange data only if they are in direct line of sight, and they can exchange only 10 bytes of data.

To broadcast the number 1 in the first byte:

```lua
robot.range_and_bearing.set_data(1,1)
```

To know the number of messages received and access their content:

```lua
#robot.range_and_bearing
robot.range_and_bearing[1].data[1]
robot.range_and_bearing[1].range
robot.range_and_bearing[1].horizontal_bearing
```

To clear the received messages:

```lua
robot.range_and_bearing.clear_data()
```

**RGB LEDs**

![Position of the RGB LEDs from a top-view perspective of the robot]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/robot_leds.png)

The robot has a total of 13 RGB LEDs. 12 are arranged in a ring around the robot body, and one (the beacon) is positioned at the top. To set a single LED:

```lua
robot.leds.set_single_color(1, "red")
```

To set all LEDs at once:

```lua
robot.leds.set_all_colors("red")
```

**Omnidirectional camera**

The omnidirectional camera returns a list of colored blobs with their position with respect to the robot center. You **must** enable the sensor before use:

```lua
robot.colored_blob_omnidirectional_camera.enable()
```

Each blob contains `distance` (cm), `angle` (radians), and `color` (with `.red`, `.green`, `.blue` components in [0,255]).

```lua
robot.colored_blob_omnidirectional_camera[1].color.red
robot.colored_blob_omnidirectional_camera[1].distance
robot.colored_blob_omnidirectional_camera[1].angle
```

**Robot random number generator**

Do not use `math.random()`. Use `robot.random` instead:

- `robot.random.bernoulli(p)` — returns 0 or 1
- `robot.random.exponential(m)` — exponential distribution with mean `m`
- `robot.random.gaussian(s,m)` — Gaussian distribution
- `robot.random.uniform(min,max)` — uniform real number
- `robot.random.uniform_int(min,max)` — uniform integer

</div>
</details>
</div>


<div class="freading">
<details>
<summary><strong>Lua</strong></summary>
<div markdown="1">

During the swarm robotics part of the course, you will develop the control software for the foot-bot in scripts written in [Lua](http://www.lua.org/) (v5.3). For more information see the [Lua manual](http://www.lua.org/manual/5.3/), [The Lua Crash Course](http://luatut.com/crash_course.html), and the [Lua Wikipedia page](https://en.wikipedia.org/wiki/Lua_(programming_language)).

**Comments**

```lua
-- This is a single-line comment

--[[ This is a multi-line
     comment ]]
```

**Variables** — All variables in Lua are global by default.

```lua
x = 2.55   -- number
x = "ciao" -- string

log("INFO: x = " .. x)     -- print to ARGoS logger
logerr("ERROR: x = " .. x)
```

Note: the standard Lua `print()` function does not work in ARGoS.

**Conditionals**

```lua
if x > 3 then
   logerr("x is too big")
elseif x < 3 then
   logerr("x is too small")
else
   logerr("maybe I just don't like x")
end

if x == 3  then log("equal to 3") end   -- equality
if x ~= 4  then log("not 4")      end   -- inequality
if (x > 3) or  (x < 3) then ... end     -- OR
if (x > 3) and (y > 3) then ... end     -- AND
if not (x > 3) then ... end             -- negation
```

**Loops**

```lua
-- while
x = 0
while x < 5 do x = x + 1; log(x) end

-- repeat until
x = 0
repeat x = x + 1; log(x) until x == 5

-- for (init, end, step)
for x = 1, 5     do log(x) end   -- 1 2 3 4 5
for x = 1, 5, 2  do log(x) end   -- 1 3 5
for x = 5, 1, -1 do log(x) end   -- 5 4 3 2 1
```

**Tables**

```lua
t = {}            -- empty table
t = { x=3 }       -- table with initial value
log(t.x)          -- dot syntax
log(t["x"])       -- string syntax

-- Tables are passed by reference; copy with:
function table.copy(t)
   local t2 = {}
   for key,value in pairs(t) do t2[key] = value end
   return t2
end

-- Tables as arrays
a = { "Huey", "Dewey", "Louie" }
log(a[1])   -- "Huey"
log(#a)     -- 3

-- Sorting
table.sort(a)
table.sort(t, function(a,b) return a.x < b.x end)
```

**Functions**

```lua
function my_fun(p)
   log("Called my_fun(" .. p .. ")")
end

function my_add(a, b)
   return a + b
end
```

**Math — 2D vector utilities**

```lua
function vec2_new_polar(length, angle)
   return { x = length * math.cos(angle),
            y = length * math.sin(angle) }
end

function vec2_sum(v1, v2)
   v1.x = v1.x + v2.x
   v1.y = v1.y + v2.y
end

function vec2_angle(v)
   return math.atan2(v.y, v.x)
end
```

**Random number generator** — Do not use `math.random()`. Use `robot.random` instead (see the foot-bot guide).

</div>
</details>
</div>


<div class="freading">
<details>
<summary><strong>ARGoS3 simulator</strong></summary>
<div markdown="1">

[ARGoS](https://www.argos-sim.info/) is a multi-physics robot simulator developed at IRIDIA, Université libre de Bruxelles. It can simulate large-scale swarms of robots of any kind efficiently.

**Running ARGoS**

To run ARGoS, you need a `.argos` configuration file (XML-based). After installing, run the simulator from a terminal:

```
argos3 -c myfile.argos
```

This opens two windows: a simulation window and a Lua code editor. The code editor opens a template Lua script with empty functions where you develop your controller. In this course all robots in the swarm are identical and share the same control software.

To execute your script: (1) click `Save the current file` to save as `.lua`, (2) click `Execute code` to upload the controller to the robots, (3) click `Play experiment` to start the simulation.

**Visual aids**

On the left side of the simulation window there are predefined camera positions. The top-view perspective is often the best way to visualize robot behavior.

ARGoS can display sensor perception rays on the simulation window. Enable them by modifying the `.argos` file, for example:

```xml
<footbot_proximity implementation="default" show_rays="true" />
```

</div>
</details>
</div>

---

<div class="freading">
<details>
<summary><strong>Further information</strong></summary>
<div markdown="1">

The following reading is a recent literature review on swarm robotics.

1 - [Nedjah, N. and Silva Junior, L. (2019). Review of methodologies and tasks in swarm robotics towards standardization.](https://doi.org/10.1016/j.swevo.2019.100565)

</div>
</details>
</div>


---

### Sandbox: The Foot-bot

In this short sandbox you will experiment with the foot-bot, the robot you will use during the practical lessons of the swarm robotics part of the course. To do so, you will test the functionalities, sensors and actuators of the robot by writing short pieces of code that will be executed in the ARGoS simulator. The control software that you will produce during this practical session might result useful in later exercises.

**Objective**

The objective of this practical session is to explore the functionalities of the foot-bot and familiarize with its set of sensors and actuators.

**General remarks**

Instructions about how to use ARGoS are provided in the section [ARGoS](#resources). The control software of the robot will be produced in Lua; if you are not familiar with this programming language, a miniguide is provided in section [Lua](#resources). A comprehensive list of sensors, actuators and functionalities of the robot is provided in the section [the foot-bot](#resources).

The control software of the robots is executed in the form of time steps---that is, the script is executed in the simulator once for each time step. In this experiment, the time step has a length of 100ms. In other words, each of the actions defined in the Lua script will be executed 10 times per second.

#### Running the sandbox

In this exercise, you will be guided step by step to experiment with the foot-bot. No control software or pseudocode is provided directly. Your task is to search in the section [the foot-bot](fbot.md) for the appropriate functions that will allow you to perform different specific tasks with the robot, and later, implement them in the simulation.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/sandbox/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c sandbox.argos
```

**Experimental setup**

At the beginning of the experiment, a foot-bots is randomly placed in a squared bounded arena.

![Sandbox - the foot-bot]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/argosinterface.png)

<div class="assignment" markdown="1">

**Robot tasks**

You find below a series of behaviors that the foot-bot must display. Your task is to implement the control software to achieve them.

1 - Move the robot forward with a velocity of 15 cm/s.

2 - Rotate the robot in place.

3 - Move the robot backwards and following an arch trajectory.

4 - Move the robot in circles, and print the readings of the proximity sensors in screen.

5 - Move the robot forward until it finds an obstacle in front, then change the velocity and move it backwards until it senses an obstacle in the back. Repeat this cycle continuously.

6 - Turn on the LEDs with color RED when the robot faces an obstacle, with color blue when it senses obstacles in the back, and with color green when there are no nearby obstacles.

After successfully executing the aforementioned behaviors with the robot, you are now able to start your experiments with robot swarms in the practical session [Random Walk](#random-walk).

</div>

<div class="freading">
<details>
<summary><strong>Further information</strong></summary>
<div markdown="1">

The following videos show experiments in which the foot-bot is used to conduct research in swarm robotics.

1 - [Dorigo, M. et al. (2011). Swarmanoid, the movie.](https://www.youtube.com/watch?v=M2nn1X9Xlps)

2 - [Mathews, N. et al. (2012). Spatially Targeted Communication and Self-Assembly.](https://www.youtube.com/watch?v=i3ernrkZ91E)

</div>
</details>
</div>

---

### Random Walk

Random walk can be defined as the behavior in which a robot moves without aiming a particular trajectory. In most random walk methods, changes in the direction of movement of the robots occur when they interact with other robots or objects in the environment. The selection of a direction of movement can follow deterministic or stochastic rules. In many cases, robots also embed obstacle avoidance behaviors to safely navigate in the environment.

**Objective**

The objective of this practical session is to design the control software for a robot swarm in which the individual robots randomly walk in an enclosed environment without colliding with objects, walls or other robots. The swarm, as a whole, must move in the environment evenly---that is, it must cover all the spaces.

**General remarks**

The control software of the robots is executed in the form of time steps---that is, the script is executed in the simulator once for each time step. In this experiment, the time step has a length of 100ms. In other words, each of the actions defined in the Lua script will be executed 10 times per second.

Remember that the individual actions of each robot are the ones that lead the robot swarm to achieve the desired behavior.

---

#### Exercise 1: Obstacle avoidance in a cluttered scenario

In this exercise, you will design random walk and obstacle avoidance behaviors that allow a swarm of foot-bots to safely navigate in an environment cluttered with obstacles.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/obstacle_avoidance/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c obstacle_avoidance_scatter.argos
```

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a squared bounded arena that contains boxes that obstruct the movement of the robots. During the execution of the experiment, the robots must navigate through the arena avoiding possible collisions with the boxes and with other robots. The experiment will end when the robots can effectively navigate in the arena without colliding.

[![Obstacle avoidance in a cluttered scenario]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/rwm1.png)](https://youtu.be/bk9Ge-DW4-Y)

**Ballistic motion with in-place rotation**

An easy implementation of random walk is the that follows the principles of ballistic motion: a robot moves straight to the front until it faces an obstacle, when an obstacle is detected, the robot changes its trajectory. This random walk method can embed in-place rotations as an strategy for obstacle avoidance. In other words, when a robot faces an obstacle it simply rotates a random number of time steps, or alternatively, until it stops perceiving the obstacle on its direction of movement.

<div class="assignment" markdown="1">
**Controller description** — The basic control pseudocode is summarized below.
</div>

**1 - Check if there is an obstacle in front of the robot**

```
for each sensor i in proximity sensors at front
do
  if reading[i] == obstacle
  then
    obstacle_in_front = true
  end
end
```

**2 - If there is an obstacle in front, perform obstacle avoidance**

```
if obstacle_in_front and not rotating
then
  StartRotating(n_timesteps)
end
elseif obstacle in front and n_timesteps != 0
  KeepRotating()
  n_timesteps -= 1
end
else
  StopRotating()
if
```

**3 - Set robot velocity**

```
if rotating
then
  SetRotationVelocity()
end
else
  SetFordwardVelocity()
end
```

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [rw_ballistic_rotation.lua]({{ site.baseurl }}/assets/lua/rw_ballistic_rotation.lua)

</div>
</details>
</div>

---

#### Exercise 2: Obstacle avoidance in an empty scenario

In this exercise, you will test your random walk implementation in a clear environment, and afterwards you will implement a new obstacle avoidance strategy based on repulsion forces.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/obstacle_avoidance/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c obstacle_avoidance_empty.argos
```

**Preliminary test**

Test first the control software you developed in Exercise 1. Do the robots show an smooth movement? Do they uniformly cover the whole arena?

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a squared bounded arena that contains no obstacles. During the execution of the experiment, the robots must navigate the arena avoiding collisions, and in such a way that they uniformly cover space. The experiment will end when the robots can effectively navigate in the arena without colliding.

[![Obstacle avoidance in an empty scenario]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/rwm2.png)](https://youtu.be/mgojexDZnjs)

**Ballistic motion with repulsion forces**

An more complex, and yet, more effective obstacle avoidance strategy follows the principle of vector fields and repulsion forces. A robot is subject to virtual repulsion forces that are originated by the obstacles that a robot can encounter, and hence, it moves in such a way that avoids colliding with them.

The repulsion force is a unique vector that aggregates the effect of one or many objects around the robot. When a robot perceives a repulsion force, it turns its movement in the opposite direction---i.e., if the vector points to the left, the robot turns to the right and vice versa. The closer the obstacle to the front direction of the robot, the quicker the turn.

<div class="assignment" markdown="1">
**Controller description** — The basic control pseudocode is summarized below. In the context of virtual forces, a _vector_ refers to a quantity possessing both magnitude and direction. Useful functions to operate with vectors are provided in the section [Lua](#resources).
</div>

**1 - Aggregate all proximity readings in a repulsion vector**

```
for each sensor i in proximity sensors
do
  Set a 2D vector vec[i] according to {reading_i, angle_i}
  rep_force += vec[i]
end
```

**2 - If there is an obstacle close to the robot, perform obstacle avoidance**

```
rep_length = GetLength(rep_force)
rep_angle  = GetAngle(rep_force)
if rep_length > 0.2
then
  if rep_angle >= 0
  then
    rotate_to_right = true
  else
    rotate_to_left = true
  end
else
  rotate_to_right = false
  rotate_to_left  = false
end
```

**3 - Set robot velocity**

```
if rotate_to_right
then
  SetRotateToRightVelocity()
elseif rotate_to_left
  SetRotateToLeftVelocity()
else
  SetFordwardVelocity()
end
```

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [rw_repulsion_forces.lua]({{ site.baseurl }}/assets/lua/rw_repulsion_forces.lua)

</div>
</details>
</div>

<div class="freading">
<details>
<summary><strong>Further readings</strong></summary>
<div markdown="1">

The following readings discuss the influence of random walk behaviors in swarm robotics experiments.

1 - [Kegeleirs, M. et al. (2019). Random Walk Exploration for Swarm Mapping.](https://doi.org/10.1007/978-3-030-25332-5_19)

2 - [Dimidov, C. et al. (2016). Random Walks in Swarm Robotics: An Experiment with Kilobots.](https://doi.org/10.1007/978-3-319-44427-7_16)

</div>
</details>
</div>

---

### Aggregation

Aggregation is a group behavior in which the individuals approach to each other and form clusters. In nature, for example, bees aggregate in the hive and school of fish remain together in single clusters. In swarm robotics, aggregation behaviors are widely study as they determine the ability of the robots to remain together as a group. Robots can aggregate either because they perceive a region of interest to aggregate in the environment---like the bees aggregate in the hive, or because they sense other robots that are already forming a cluster---like the school of fish.

**Objective**

The objective of this practical session is to design the control software for a robot swarm that aggregates in a specific region of the environment.

**Designing the Control software**

The control software of the robots is executed in the form of time steps---that is, the script is executed in the simulator once for each time step. In this experiment, the time step has a length of 100ms. In other words, each of the actions defined in the Lua script will be executed 10 times per second.

It is expected that you use the control software produced in practical session [Random Walk](#random-walk) to allow the robots move in the environment without colliding with the walls and other robots.

Remember that the individual actions of each robot are the ones that lead the robot swarm to achieve the desired behavior.

**General remarks**

The control software of the robots is executed in the form of time steps---that is, the script is executed in the simulator once for each time step. In this experiment, the time step has a length of 100ms. In other words, each of the actions defined in the Lua script will be executed 10 times per second.

It is expected that you use the control software produced in practical session [Random Walk](#random-walk) to allow the robots move in the environment without colliding with the walls and other robots.

Remember that the individual actions of each robot are the ones that lead the robot swarm to achieve the desired behavior.

---

#### Exercise 1: Aggregation in a region of interest

In this exercise, you will design an aggregation behavior that drives a swarm to cluster within a specific region of the environment.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/aggregation/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c aggregation_one_spot.argos
```

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a squared bounded arena with white floor. In the center of the arena, there is a black spot that indicates the region of interest on which the robots must aggregate. During the execution of the experiment, all the robots must step into the black spot. The experiment will end when all the robots are inside of the black spot.

[![Aggregation in a region of interest]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/agg1.png)](https://youtu.be/_IMzSqcsyY8)

**Individualistic aggregation**

In an _individualistic strategy_, robots _randomly walk_ in the arena looking for the black spot. Once a robot detects the spot, it stops moving and waits for other robots to arrive. Eventually, all robots in the swarm will find and enter the spot and the swarm will be aggregated inside.

<div class="assignment" markdown="1">
**Controller description** — The basic control pseudocode is summarized below.
</div>

**1 - Check the color of the ground**

```
for each sensor i in ground sensors
do
  if reading[i] == black
  then
    in_spot = true
  end
end
```

**2 - Set robot velocity**

```
if in_spot
then
  SetStopVelocity()
else
  SetRandomWalk()
end
```

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [agg_one_spot.lua]({{ site.baseurl }}/assets/lua/agg_one_spot.lua)

</div>
</details>
</div>

---

#### Exercise 2: Aggregation as implicit decision making

In this exercise, you will design a robot swarm that autonomously decides to aggregate in one out of two regions of interest.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/aggregation/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c aggregation_two_spot.argos
```

**Preliminary test**

Test first the control software you developed in Exercise 1. Do the robots aggregate in a single spot? If not, what prevent them to reach a consensus on which spot they should aggregate?

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a squared bounded arena with white floor. In the arena, there are two black spots that indicate two possible regions of interest on which the robots must aggregate. During the execution of the experiment, the robots must aggregate in one out of the two spots. The experiment will end when at least 70% of the robots are aggregated in a single spot.

[![Aggregation as implicit decision making]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/agg2.png)](https://youtu.be/GuMfXMr4eL4)

**Implicit communication**

A first form of communication in swarm robotics is the one defined as _implicit communication_. In this form of communication, robots pass information to their peers without establishing a defined communication channel or message. For example, a robot can change its behavior in regard to the nearby presence, or absence, of other robots. In this sense, robots communicate by relatively positioning themselves with respect to other robots.

This form of communication is particularly relevant to the case in which swarms must aggregate in one out of two possible options. After finding the aggregation spot, a robot can decide whether to stay on it, or leave it, after considering the number of peers it can perceive. If the robot can perceive a large number of peers, it is likely that it is in a large cluster and it will aim to remain there. On the contrary, it the robot perceives just a few peers, its likely that it is not in a cluster and it will leave the spot to find a better aggregation place.

<div class="assignment" markdown="1">
**Controller description** — In this exercise, you can start from the code that you developed in the Exercise 1. Your task is to extend the script so that the robots aggregate in a single spot. The basic control pseudocode is summarized below.
</div>

**1 - Check the color of the ground**

**2 - If the robot is in the spot, set an arbitrary signal that other robots can see and wait an arbitrary time for other robots to arrive**

**3 - Count the number of nearby robots and decide whether to stay or leave**

```
for each robot i seen at range[i]
do
  if range[i] < nearby_range
    n_robots += 1
  end
end

leave = EvaluateLeavingCondition(n_robots)
```

**4 - Set robot velocity**

```
if leave
then
  SetRandomWalk()
  StopSignalEmition()
else
  SetStopVelocity()
end
```

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [agg_two_spots.lua]({{ site.baseurl }}/assets/lua/agg_two_spots.lua)

</div>
</details>
</div>

---

#### Exercise 3: Enhancing aggregation with taxis behaviors

In this exercise, you will use taxis behaviors to improve the performance of a robot swarm that autonomously decides to aggregate in one out of two regions of interest.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/aggregation/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c aggregation_two_spot.argos
```

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a squared bounded arena with white floor. In the arena, there are two black spots that indicate two possible regions of interest on which the robots must aggregate. During the execution of the experiment, the robots must aggregate in one out of the two spots. The experiment will end when at least 70% of the robots are aggregated in a single spot.

[![Enhancing aggregation with taxis behaviors]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/agg2.png)](https://youtu.be/MDQ0pXkGXAw)

**Taxis behaviors**

Taxis can be defined as a form of movement behavior in which individuals move towards or away from a stimulus. For example, the movement towards and away from light sources is defined as phototaxis, and if the stimulus corresponds to chemical components, the behavior is defined as chemotaxis.

Taxis behaviors are widely used in swarm robotics. Robots often change their movement behavior in regard to stimuli produced by other robots, or by the environment itself. In the particular case of aggregation, robots can use taxis to facilitate the formation of clusters of robots. A group of robots that already started aggregating can emit a signal that aims to attract nearby robots, and in consequence, the swarm is likely to aggregate faster.

<div class="assignment" markdown="1">
**Controller description** — In this exercise, you can start from the code that you developed in Exercise 2. Your task is to design the taxis behavior that triggers if the robots senses other robots that are already aggregating. The basic control pseudocode for the taxis behavior is summarized below.
</div>

**1 - Count the number of nearby robots**

**2 - If enough robots are emitting the signal, build a 2D attraction vector**

```
for each robot i seen at {range_i, bearing_i}
do
  Set a 2D vector vec[i] according to {range_i, bearing_i}
  att_vector += vec[i]
end
```

**3 - Compute the direction of movement**

```
att_angle = GetAngle(att_vector)

if att_angle > 0
then
  rotate_to_left = true
elseif att_angle < 0
  rotate_to_right = true
else
  move_forward = true
end
```

**4 - Set robot velocity**

```
if not obstacle_in_front
  if rotate_to_right
  then
    set_velocity(math.max(0.5,math.cos(att_angle)) * 10, 0)
  elseif rotate_to_left
    set_velocity(0, math.max(0.5,math.cos(att_angle)) * 10)
  else
    SetFordwardVelocity()
  end
else
  ObstacleAvoidance()
end
```

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [agg_taxis.lua]({{ site.baseurl }}/assets/lua/agg_taxis.lua)

</div>
</details>
</div>

<div class="freading">
<details>
<summary><strong>Further readings</strong></summary>
<div markdown="1">

The following reading discusses the design of probabilistic strategies in aggregation of robot swarms.

1 - [Soysal, O. and Şahin, E. (2005). Probabilistic aggregation strategies in swarm robotic systems](https://doi.org/10.1109/SIS.2005.1501639).

</div>
</details>
</div>

---

### Pattern Formation

A pattern is an arrangement of objects displaying mathematical, geometric or statistic relationships (e.g., atoms organized in molecules, and molecules that in a big scale can form crystals). In swarm robotics, robots can form patterns by strategically positioning themselves in regard to the position of other robots they perceive. By following simple positioning rules at the individual level, a robot swarm can distributed itself in the form of organized structures.

Robot pattern formation is useful to perform tasks such as uniformly covering a region of interest, establishing specific lattice or network topologies, and performing collective motion (known as flocking in the context of swarm robotics).

**Objective**

The objective of this practical session is to design the control software for a robot swarm that exhibits pattern formation and flocking behaviors.

**General remarks**

The control software of the robots is executed in the form of time steps---that is, the script is executed in the simulator once for each time step. In this experiment, the time step has a length of 100ms. In other words, each of the actions defined in the Lua script will be executed 10 times per second.

It is expected that you use the control software produced in practical session [Aggregation](#aggregation) to allow the robots to detect and localize their peers.

Remember that the individual actions of each robot are the ones that lead the robot swarm to achieve the desired behavior.

---

#### Exercise 1: Hexagonal pattern formation

In this exercise, you will use the notion of artificial potential fields to form hexagonal patterns with a swarm of foot-bots.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/pattern_formation/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c pattern_formation.argos
```

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a rectangular bounded arena. During the execution of the experiment, the robots must position themselves so that the inner structure of the swarm can be appreciated as an hexagonal lattice. The experiment will end when all robots are formed and the lattice remains stable.

[![Hexagonal pattern formation]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/ptr1.png)](https://youtu.be/0JBMbHLiLRw)

**Artificial potential fields**

Artificial potential fields are computing models that emulate the effects of physical potential fields such as electrical, magnetic or gravitational fields. In robotics, artificial potential fields can be used to model virtual forces to which a robot is subject. This forces can represent attraction or repulsion behaviors that lead the robot motion; for example, they can be computed in regard to the position of other robots or objects in the environment.

In swarm robotics, researchers have widely used the Lennard-Jones potential to create virtual forces that enable the formation of patterns with robot swarms. A robot is subject to virtual attraction and repulsion forces that aim to maintain a target distance with respect to nearby robots. The robot is attracted to robots that are farther than the target distance, and on the contrary, it is repealed from robots that are closer. A stable state will be reached when the robot finds a position in which it maintains the target distance with respect to all its nearby peers.

The image below represents the Lennard-Jones potential and indicates the distribution of the forces with respect to the target distance.

![Lennard-Jones potential]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/lngraph.png)

In the graph above, _delta_ is the target distance to be maintained, _rho_ is the distance measured against the position of other robot, and _epsilon_ indicates the strength of the interaction.

The potential is described by the expression,

![Lennard-Jones equation]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/lnp.png)

The corresponding forces can be obtained after applying the firs derivative,

![Forces equation]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/lnf.png)

<div class="assignment" markdown="1">
**Controller description** — You are provided with a [starting Lua script](https://dgarzonramos.github.io/robotics101/assets/docs/argos/pattern_formation/pattern_formation_start.lua) that contains a few constant declarations and functions that will facilitate the development of the control software. Your task is to develop the rest of the script. The basic control pseudocode is summarized below.
</div>

**1 - Compute the force due to Lennard-Jones potential**

```
for each robot i seen at {range_i, bearing_i}
do
  ln_value = ComputeLennardJones(range_i)
  Set a 2D vector vec[i] according to {ln_value, bearing_i}
  ln_force += vec[i]
end
```

**2 - Compute the direction of movement**

```
mov_dir = GetAngle(ln_force)
```

**3 - Set the robot velocity**

```
Velocity{l,r} = ComputeSpeedFromAngle(mov_dir)
```

The function `ComputeSpeedFromAngle()` is provided and described in the starting script.

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [pf_hexagonal.lua]({{ site.baseurl }}/assets/lua/pf_hexagonal.lua)

</div>
</details>
</div>

---

#### Exercise 2: Circular pattern formation

In this exercise, you will combine virtual forces originated by inter-robot interaction with a virtual force originated by an object of the environment.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/pattern_formation/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c pattern_formation.argos
```

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a rectangular bounded arena that contains one small red LED. During the execution of the experiment, the robots must position themselves so that the robot swarm forms a circular pattern around the red LED. The experiment will end when all robots are formed and the lattice remains stable.

[![Circular pattern formation]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/ptr1.png)](https://youtu.be/2wv5CGhiXhM)

<div class="assignment" markdown="1">
**Controller description** — In this exercise, you can start from the code that you developed in the Exercise 1. Your task is to extend the script so that the robots form around the LED. The basic control pseudocode is summarized below. Bear in mind that the LEDs just display color signals, and such signals can be perceived only by the omnidirectional camera. Further information about how to use the LEDs and the omnidirectional camera is provided in the section [the foot-bot](#user-guide-the-foot-bot).
</div>

**1 - Compute the force due to Lennard-Jones potential**

**2 - Compute the attractive force towards the LED at `{range_led, bearing_led}`**

```
Set a 2D vector vec_led according to {range_led, bearing_led}
led_force = vec_led
```

**3 - Aggregate the forces**

```
sum_force = ln_force + led_force
```

**4 - Compute the direction of movement**

```
mov_dir = GetAngle(sum_force)
```

**5 - Set the robot velocity**

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [pf_circular.lua]({{ site.baseurl }}/assets/lua/pf_circular.lua)

</div>
</details>
</div>

---

#### Exercise 3: Flocking

In this exercise, you will create a swarm that flocks---that is, a swarm that moves while forming a pattern.

**Launching the experiment**

1 - Enter the directory that contains the materials for this practical session.

```
cd ~/swarm_robotics/pattern_formation/
```

2 - Run the `ARGoS` simulation.

```
argos3 -c pattern_formation.argos
```

**Experimental setup**

At the beginning of the experiment, a swarm of foot-bots is randomly distributed in a rectangular bounded arena that contains one small red LED and one ambiance light source. During the execution of the experiment, the robots must position themselves so that the inner structure of the swarm can be appreciated as an hexagonal lattice. The experiment will end when all robots are formed and the lattice remains stable.

[![Flocking]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/ptr1.png)](https://youtu.be/GZSIG3vfhcA)

<div class="assignment" markdown="1">
**Controller description** — In this exercise, you can start from the code that you developed in the Exercise 2. Your task is to extend the script so that the robots move towards the ambiance light source after they are formed around the LED. Note that you will need to design a _triggering condition_ that causes a behavior change in the robot: they need to stop being attracted to the LED and start being attracted to the ambiance light source. The basic control pseudocode to drive the robots towards the ambiance light source is summarized below.
</div>

**1 - Compute the force due to Lennard-Jones potential** _(see Exercise 1)_

**2 - Compute the attractive force towards the ambiance light source at `{range_light, bearing_light}`**

```
{range_light, bearing_light} = ComputeVectorToLight()
Set a 2D vector vec_light according to {range_light, bearing_light}
light_force = vec_light
```

**3 - Aggregate the forces**

```
sum_force = ln_force + light_force
```

**4 - Compute the direction of movement**

```
mov_dir = GetAngle(sum_force)
```

**5 - Set the robot velocity**

<div class="freading">
<details>
<summary><strong>Proposed solution</strong></summary>
<div markdown="1">

Download the proposed solution for this exercise: [pf_flocking.lua]({{ site.baseurl }}/assets/lua/pf_flocking.lua)

</div>
</details>
</div>

<div class="freading">
<details>
<summary><strong>Further readings</strong></summary>
<div markdown="1">

The following reading shows an interesting experiment in which a robot swarms uses pattern formation to escort a human in virtual hazardous scenarios.

1 - [Debruyn, A. (2015). Human - robots swarms interaction: an escorting robot swarm that diverts a human away from dangers one cannot perceive](https://areina.staff.shef.ac.uk/pdf/Thesis_Debruyn.pdf).

</div>
</details>
</div>

---

### Project: Foraging with Forbidden Areas

The activity of food search and retrieval is commonly referred to as _foraging_. In swarm robotics, foraging is a commonly used task to compare different algorithms for exploration (what is the best way to discover interesting places in the environment?), division of labor (who should explore? for how long?), etc.

In the most general setting, food items are scattered in an environment at locations unknown to the robots and the robots need to explore the environment, find the food, and take it to the nest. The foraging environments often contain cues, such as light sources, that help the robots in navigating through the environment.

In this project, we consider a foraging environment with a forbidden area: robots than enter this area automatically lose the item that they carry, if any. The swarm is distributed in the arena and the location of the food source is originally unknown to the robots. The swarm can act cooperatively to discover and keep track of the location of the food source for an efficient foraging, and in the same way, to avoid the forbidden area.

In this practical session, you are asked to develop and provide control software for the robot swarm, and to evaluate its performance.

---

#### Problem definition

The robot swarm operates in a diamond-shaped arena that includes a food source, a nest, and one forbidden area. The food source is represented by a black circle, the nest is represented by a white area in the bottom the diamond, and the forbidden area is a gray rectangle---see figure below. A light is placed on top of the food source to indicate its position to the robots. When a robot enters the forbidden area while carrying an item, the item is automatically lost.

**Goal**

The goal of the robot swarm is to retrieve and transport items from the food source to the nest. The overall performance of the swarm is measured by the number of items it is able to collect during a fixed experiment time. Each experiment is automatically terminated after 1000 seconds (10000 time-steps). More precisely, the performance of the swarm is described by

```
Max N_d
```

with `N_d` being the number of items successfully delivered to the nest (that is, items carried by robots from the food source to the nest without entering the forbidden area).

**Swarm composition**

The swarm comprises 30 homogeneous robots. The robots are equipped with the following sensors and actuators:

```
colored_blob_omnidirectional_camera
range_and_bearing
light
motor_ground
proximity
wheels
leds
```

**General remarks**

1 - The maximal wheel velocity should not exceed 30 cm/s.

2 - ARGoS has been configured so that the robots collect items on the food source and drop them at the nest and at the forbidden area automatically. A robot can only carry one item at a time.

3 - The positions of the nest and the forbidden area is fixed, but the position of the food source can change from one experiment to another. The nest corresponds to the white area, the food source is the black spot, and the forbidden area is indicated dark shade of gray. See the figure below (top view of the arena).

![Foraging with forbidden areas]({{ site.baseurl }}/assets/images/swarm-robotics/collective_behaviors/for1.png)

---

#### Experiment

The goal of this project is to design, implement and evaluate control software that aims to maximize the number of items delivered at the nest. It is expected that the control software demonstrates a _cooperative_ behavior: one that takes advantage of the swarm's principles.

ARGoS is configured to automatically dump data on a file `output.txt`. This file contains a table with two columns:

```
- CLOCK: Column indicating the current step
- ITEMS: Column indicating the number of items collected so far
```


**Run the experiment**

```
cd ~/swarm_robotics/foraging/
argos3 -c foraging.argos
```

If the usual ARGoS interface appears, you're ready to go.

---

<!-- #### Evaluation

The deliverable of the project is the control software that you will develop, and a video demonstrating your solution. The script must be delivered to the teacher.

The evaluation criteria are the following:

1 - Originality of the solution.

2 - Performance of the control software measured over a series of experimental runs.

3 - Swarm behaviors and principles involved in the solution.

You might be asked to answer a few questions about your implementation and design choices. -->

<div class="freading">
<details>
<summary><strong>Further readings</strong></summary>
<div markdown="1">

The following reading shows an example of a robot swarm performing foraging. An interesting point in the experiment is that the swarm self-organizes and tackles the problem by dividing the tasks in smaller sub-problems. Then, the robots adopt different behaviors that tackle these sub-problems independently.

1 - [Ferrante, E. et al. (2015). Evolution of self-Organized task specialization in robot swarms.](https://doi.org/10.1371/journal.pcbi.1004273)

</div>
</details>
</div>

---

## Credits

## Ressources


---

<!-- [Back to Top](#start) -->