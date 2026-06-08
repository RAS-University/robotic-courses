---
title: 12.8 Neural Networks for Robotics
parent: "Chapter 12: Robot Learning"
has_children: false
nav_order: 2
layout: numbered
math: mathjax
chapter: 12
section: 8
publish: true
nav_exclude: false
---

<!-- Link external JavaScript file -->
<script src="../questions.js"></script>

<a name="top"></a>
<a href="#top" id="back-to-top" title="Back to Top">🔝​</a>


# Neural Networks for Robotics

<!-- bundle exec jekyll serve -->

- Table of Contents
{:toc}

## Prerequisites

To get the most out of this Neural Networks for Robotics module, it’s helpful to have:

---

## General Motivation


## Course Content

<!-- ### General Concepts -->

### Introduction
The human brain can be viewed as a highly sophisticated biological information-processing system. It receives sensory inputs such as vision, sound, and touch, processes this information, makes decisions, and produces actions. These are exactly the types of capabilities required in robotics and intelligent systems. This idea motivated researchers to ask:
> What if we could mimic the structure and functioning of the brain using computers?

Artificial Neural Networks (ANNs) are simplified mathematical models inspired by how the brain works.

#### How Brain Works?
First, let us introduce the simplest fundamental unit of the brain: **the neuron**. A neuron can be viewed as a tiny processing unit. It receives signals from other neurons, processes the incoming information, makes a decision based on the received signals, and then sends an output signal to other neurons. 

Biological brains contain massive interconnected networks of neurons that continuously communicate with one another.
An individual neuron can perform only a very simple computation. However, when millions or billions of neurons are interconnected, they can collectively perform extremely complex tasks. Intelligence emerges from the cooperation of many simple processing units working in parallel.

The connections between neurons are called **synapses**. Learning in the brain occurs by changing the strength of these synaptic connections. Stronger or weaker connections influence how information flows through the neural network, enabling the brain to adapt, learn from experience, and improve performance over time.


### From Biology to Mathematics: Neurons and Networks

A real neuron in the brain receives signals from many other neurons and processes them. Some signals are more important than others, so they have a stronger influence on the neuron's decision. The neuron combines all the incoming signals and evaluates the overall result. If the combined signal is strong enough, the neuron "fires" and sends a signal to other neurons. If the signal is not strong enough, the neuron remains inactive.

We can model this behavior mathematically using an artificial neuron.

An artificial neuron receives multiple inputs, just as a biological neuron receives signals from other neurons. Each input is assigned a weight, which represents its importance. The neuron multiplies each input by its corresponding weight and computes a weighted sum of all inputs. It then uses this combined signal to decide whether, and how strongly, it should "fire".

Mathematically, an artificial neuron is represented as:

$$y = f\left(\sum_{i} w_i x_i + b\right)$$

Don't worry if the equation looks intimidating at first, we will break down each part step by step: 
- $x_i$ are the **inputs**: the information the neuron receives.
- $w_i$ are the **weights**: numbers that tell the neuron how important each input is.
- $b$ is the **bias**: an extra value that helps adjust how easily the neuron activates.
- $f$ is the **activation function**: a function that takes the combined signal and decides the neuron's final output.

So far, we have introduced two new concepts: the **bias** and the **activation function**. 
Before discussing the bias and activation function, let's first look at the term $\sum_i w_i x_i.$ This expression is called a **linear combination** of the inputs. It takes each input, multiplies it by its corresponding weight, and adds the results together. Geometrically, a linear combination defines a linear function. In two dimensions, this corresponds to a line. In higher dimensions, it corresponds to a plane or, more generally, a hyperplane. But, why do we care about lines? Suppose we have two classes of data, $C_A$ and $C_B$, as shown below. Our goal is to distinguish between the two groups.

<figure style="text-align: center;">
<img src="{{ site.baseurl }}/assets/images/NN/ANN_ex_1.png" alt="Example of Linear classification" width="600">
</figure>

A line can be used as a decision boundary. Points on one side of the line are classified as belonging to class $C_A$, while points on the other side are classified as belonging to class $C_B$. If we can find a line that separates the two classes well, then we can classify new data points simply by checking on which side of the line they lie. This is exactly what a neuron tries to learn. The weights determine the orientation of the decision boundary, allowing the neuron to separate different classes of data.

However, there is a limitation. The expression $\sum_i w_i x_i$ always produces a decision boundary that passes through the origin. In many real-world problems, the best separating line does not pass through the origin. To overcome this limitation, we introduce a bias term:

$$
\sum_i w_i x_i + b
$$

The bias allows us to position the decision boundary wherever we want. However, there is still one problem.

The expression $z = \sum_i w_i x_i + b$ produces a numerical value. While this value tells us on which side of the decision boundary a data point lies, it does not directly provide a classification. It just produces some number based on the weighted sum. What do these numbers mean? How can we automatically convert them into a meaningful output?

In our classification example, we would like the neuron to output:
- $0$ for class $C_A$
- $1$ for class $C_B$

To achieve this, we need a mechanism that converts the neuron's score into a final decision. This is the role of the **activation function**. An activation function takes the value $z = \sum_i w_i x_i + b$ and transforms it into the neuron's final output: $y = f(z).$

One of the simplest activation functions is the **step function**:

$$
f(z)=
\begin{cases}
1, & z \ge 0 \\
0, & z < 0
\end{cases}
$$

With this activation function, the neuron outputs $1$ when the point lies on one side of the decision boundary and $0$ when it lies on the other.

In other words, the activation function converts the neuron's score into a decision. It determines whether the neuron should "fire" and what output it should produce.

The step function closely resembles the behavior of a biological neuron: it either fires or it does not. However, modern neural networks typically use smoother activation functions, such as Sigmoid, Tanh, and ReLU, which make learning more effective. We will explore these activation functions in detail later.

So far, we have seen how a single artificial neuron works. A neuron can make only a simple decision, such as separating two classes with a linear decision boundary. While this is useful, many real-world problems are far more complex and cannot be solved by a single neuron alone.

To tackle more complex tasks, we connect many neurons together to form a **neural network**. The output of one neuron becomes the input to other neurons, allowing the network to learn increasingly sophisticated patterns.

A useful analogy is building with LEGO bricks. A single brick is simple and limited, but by combining many bricks, we can construct complex structures. Similarly, each neuron performs a simple computation, but when thousands or millions of neurons work together, they can solve challenging problems such as image recognition, speech understanding, and robot control.

One of the most remarkable results in machine learning is that neural networks can approximate a very wide range of functions when they have enough neurons, enough training data, and are trained appropriately. In other words, by combining many simple neurons, we can build systems capable of learning highly complex behaviors.

<figure style="text-align: center;">
<img src="{{ site.baseurl }}/assets/images/NN/NN_layers.png" alt="Multi layer neural network" width="600">
</figure>

A neural network is typically organized into layers, as shown in the figure above.

The first layer is called the **input layer**. Its role is to receive the input data and pass it to the rest of the network. Each neuron in the input layer usually represents one feature of the input. For example, in a robot navigation task, the inputs could be sensor readings such as distance measurements, speed, or camera features.

The middle layers are called **hidden layers**. These neurons perform most of the computation in the network. Each hidden neuron receives inputs from the previous layer, computes a weighted sum, applies an activation function, and passes the result to the next layer. By combining many neurons across multiple layers, the network can learn increasingly complex patterns in the data.

The final layer is called the **output layer**. It produces the network's prediction or decision.

Information flows through the network from left to right. Each neuron processes the information it receives and passes its output to neurons in the next layer. This process is known as **forward propagation**.

### Learning Paradigms: How Do Neural Networks Learn?

We have seen how a neural network is structured and how information flows through it via forward propagation. However, a network with randomly initialized weights is not very useful. At first, its predictions are essentially random.

The goal of learning is to adjust the network's weights so that it produces the desired outputs. In other words, learning is the process of finding the right values for the weights and biases.

But how can the network know whether its outputs are correct?

The answer depends on the type of information available during training. Sometimes the network is given the correct answer for every example. Other times, it receives only raw data and must discover patterns on its own.

Based on this, machine learning is commonly divided into two major learning paradigms:

**Supervised Learning:**

In supervised learning, the network is trained using examples that include both the input and the correct output. You can think of this as learning with a teacher.

For example, suppose we want to train a robot to recognize different objects. During training, we show the network many images of objects from different viewpoints along with their correct labels, such as *cup*, *bottle*, or *tool*. The network makes a prediction, compares it to the correct label, measures the error, and then adjusts its weights to reduce that error. By repeating this process over many training examples, the network gradually learns to classify objects accurately.

**Unsupervised Learning:**

In unsupervised learning, the network is given only the inputs and no correct answers. There is no teacher telling the network what the output should be.

For example, suppose a robot observes thousands of objects but is not told their names or categories. By analyzing the visual similarities between the objects, the network may automatically group them into clusters. Objects with similar shapes, colors, or textures may end up in the same group, even though no labels were provided.


### Unsupervised Learning
#### Hebbian Learning

One of the earliest learning rules for neural networks. The main idea is surprisingly simple:
> **If two neurons are often active at the same time, the connection between them should become stronger.**

This idea is commonly summarized as:
> **"Neurons that fire together, wire together."**

Imagine that one neuron consistently becomes active whenever another neuron is active. Over time, the connection between them is strengthened. In contrast, neurons that rarely activate together develop weaker connections.

Unlike supervised learning, no teacher provides the correct answer. The network learns by observing patterns in its inputs and strengthening connections between neurons that frequently activate together.

Mathematically, Hebbian learning updates the connection between two neurons as:

$$
\Delta w_{ij} = \eta x_i x_j
$$

where:
- $\Delta w_{ij}$ is the change in the connection strength between neuron $i$ and neuron $j$,
- $x_i$ and $x_j$ are the activity levels of the two neurons,
- $\eta$ is the learning rate, which controls how quickly learning occurs.

The equation simply states that the stronger the simultaneous activity of two neurons, the stronger their connection becomes.





## Credits

## Ressources




---

[Back to Top](#start)