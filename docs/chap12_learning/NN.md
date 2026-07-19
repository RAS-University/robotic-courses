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

The step function closely resembles the behavior of a biological neuron: it either fires or it does not. However, modern neural networks typically use smoother activation functions, such as Sigmoid, Tanh, and ReLU, which make learning more effective. 

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

Imagine you're learning to catch a ball. Every time you see the ball flying toward you, one group of neurons processes its position and motion. At the same time, another group of neurons controls the movements of your arm and hand as you reach to catch it. If this happens over and over again, your brain gradually strengthens the connections between these groups of neurons. Eventually, your eyes and hands work together almost automatically, allowing you to catch the ball quickly and accurately without consciously thinking about every movement.

This is exactly Hebbian's idea:
> **If two neurons are often active at the same time, the connection between them should become stronger.**

This idea is commonly summarized as:
> **"Neurons that fire together, wire together."**

If one neuron consistently becomes active whenever another neuron is active, over time, the connection (the weight) between them is strengthened. In contrast, neurons that rarely activate together develop weaker connections. 

Unlike supervised learning, no teacher provides the correct answer. The network learns by observing patterns in its inputs and strengthening connections between neurons that frequently activate together.

Mathematically, Hebbian learning updates the connection between two neurons as:

$$
\Delta w_{ij} = \eta x_i x_j
$$

where:
- $\Delta w_{ij}$ is the change in the connection strength between neuron $i$ and neuron $j$,
- $x_i$ and $x_j$ are the activity levels of the two neurons,
- $\eta$ is the learning rate, which controls how quickly learning occurs.

The equation simply states that the stronger the simultaneous activity of two neurons, the stronger their connection becomes. So that, they will have more influence on each other. 

##### **Application: Phototaxis in Robots**

One of the simplest demonstrations of Hebbian learning in robotics is **phototaxis**—the ability of a robot to move toward a light source.

Consider a robot equipped with two light sensors (left and right) and two motors controlling its wheels. Initially, the connections between the sensors and the motors are weak or randomly initialized. The robot also has a simple controller that generates exploratory movements, causing it to turn and move around its environment.

As the robot explores, there are moments when a light sensor detects a bright light while the corresponding motor is active. For example, the left light sensor may become highly active at the same time the left motor is turning the robot toward the light. According to the Hebbian learning rule, because these neurons are active together, the connection between them is strengthened.

After many such experiences, sensor-motor pairs that consistently activate together develop stronger connections. As a result, the robot gradually becomes more likely to generate movements that steer it toward the light source. Importantly, Hebbian learning does not specify the correct behavior beforehand. Instead, it reinforces sensor-motor relationships that repeatedly occur during the robot's interaction with its environment.

This idea is closely related to Braitenberg vehicles—simple robots whose behaviors emerge from direct connections between sensors and motors. Hebbian learning allows these connections to adapt over time based on the robot's experience, enabling the robot to develop more effective behaviors through interaction with its environment.


##### **Application: Principal Component Analysis (PCA)**

A more mathematical application of Hebbian learning is its connection to **Principal Component Analysis (PCA)** — a technique for finding the most important directions of variation in a dataset.

Oja's rule (1982) is a normalized variant of Hebbian learning:

$$\Delta w_i = \eta \cdot y \cdot (x_i - y \cdot w_i)$$

Where $y = \sum_i w_i x_i$ is the neuron's output. The extra term $-\eta \cdot y^2 \cdot w_i$ prevents the weights from growing indefinitely. Remarkably, a single neuron trained with Oja's rule converges to the **first principal component** of the input data — the direction that captures the most variance. This is a beautiful result: a simple, local, biologically plausible learning rule naturally discovers the most informative structure in the data.

In robotics, PCA via Hebbian learning has been used for dimensionality reduction in sensory processing, for example, compressing high-dimensional 
camera inputs into a compact representation that retains the most useful information for navigation or object recognition.

#### Anti-Hebbian Learning
While Hebbian learning strengthens connections between neurons that fire together, Anti-Hebbian learning (often referred to as lateral inhibition) does the exact opposite. By doing that we want to decorrelate inputs and reduce redundancy. By removing redundant information, the network maximizes the amount of unique information it can process and transmit. Anti-Hebbian learning is naturally self-limiting and does not require the artificial "weight decay" bounds that standard Hebbian networks need to prevent weights from expanding infinitely. Because, The weights stop changing as soon as the outputs are successfully decorrelated.


Standard Hebbian learning strengthens connections between co-active neurons. But this can lead to a problem: if every neuron follows the same rule, they tend to become correlated, all responding to the same dominant features in the data and ignoring everything else.

**Anti-Hebbian learning** flips the rule: connections between co-active neurons are *weakened* rather than strengthened:

$$\Delta w_{ij} = -\eta \cdot x_i \cdot x_j$$

The effect is **decorrelation** — neurons are pushed to respond to *different* features of the input, rather than all converging on the same dominant signal.

In practice, Hebbian and anti-Hebbian rules are often combined. A neuron strengthens its connections to the inputs it responds to (Hebbian), while weakening its lateral connections to other neurons that are active at the same time (anti-Hebbian). This **competitive learning** mechanism encourages neurons to specialize, each becoming sensitive to a different pattern in the data — a simple, local mechanism for feature extraction.



### Supervised Learning
#### The Learning Cycle

So far, we have seen that a neural network can discover patterns in data on its own. However, many robotics applications require the network to perform a specific task. For example, we may want a robot to recognize objects, estimate the position of its arm, or determine how its gripper should move to grasp an object.

This is where supervised learning comes in.

Recall that a neural network is essentially a mathematical function with many adjustable parameters—its weights and biases. These parameters determine how the network transforms an input into an output. By changing them, we change the network's behavior.

The goal of supervised learning is to automatically adjust these parameters so that, for a given input, the network produces the desired output. To achieve this, we train the network using a dataset containing input-output pairs, where each input is accompanied by the correct answer, called the target or label.

Rather than explaining the learning process abstractly, we will use a simple robotics example throughout this section and follow one complete training iteration.

Imagine a robot arm has already detected the position of an object using a camera. The robot's task is to move its gripper toward the object.

To determine the required movement, the robot uses a neural network. The network receives the position of the object relative to the current gripper position and predicts how the gripper should move in the horizontal and vertical directions.

The overall processing pipeline is therefore:

`Object position → Neural Network → Predicted gripper movement`

For simplicity, we consider a robot operating in a two-dimensional plane.

The input to the neural network consists of two values:

$$
x_1 = \text{horizontal position error}
$$

$$
x_2 = \text{vertical position error}
$$

These values describe how far the object is from the current gripper position along the horizontal and vertical directions.

The network produces two outputs:

$$
\hat{y}_1 = \text{predicted horizontal gripper movement }(\Delta x)
$$

$$
\hat{y}_2 = \text{predicted vertical gripper movement }(\Delta y)
$$

Together, these outputs represent the movement that the network predicts will move the gripper toward the object.

During training, we also know the correct movement that the robot should make. We denote this desired movement by

$$
\mathbf{y}
=
\begin{bmatrix}
y_1\\
y_2
\end{bmatrix},
$$

where

$$
y_1 = \text{desired horizontal gripper movement}
$$

$$
y_2 = \text{desired vertical gripper movement}.
$$

The network's prediction can therefore be written as

$$
\hat{\mathbf{y}}
=
\begin{bmatrix}
\hat{y}_1\\
\hat{y}_2
\end{bmatrix}.
$$

Our objective is to adjust the network's weights and biases so that the predicted movement $\hat{\mathbf{y}}$ becomes as close as possible to the desired movement $\mathbf{y}$.

To keep the example simple, we will use a neural network with **two input neurons**, **three hidden neurons**, and **two output neurons**, as shown below.

<figure style="text-align: center;">
<img src="{{ site.baseurl }}/assets/images/NN/backpropagation.png" alt="Example neural network used to illustrate backpropagation" width="600">
<figcaption>Neural network used for example.</figcaption>
</figure>

Now that we have defined the problem, the next question is:

> **How does the neural network learn to produce the correct output?**

Like every supervised learning algorithm, the network follows the same learning cycle:

1. Make a prediction using a forward pass.
2. Measure the prediction error using a loss function.
3. Compute how each weight contributed to the error using backpropagation.
4. Update the weights using gradient descent.
5. Repeat until the predictions become sufficiently accurate.

In the following sections, we will go through each of these steps one by one.

#### Step 1: Making a Prediction (Forward Pass)

The first step in the learning cycle is to make a prediction. This process is called the **forward pass** because information flows from the input layer to the output layer.

Starting with the object's position $(x_1, x_2)$, the network gradually transforms the inputs into a prediction by passing information through each layer. At every neuron, three operations are performed:

1. Compute a weighted sum of the inputs.
2. Apply an activation function.
3. Pass the result to the next layer.

This process continues until the network reaches the output layer and produces its final prediction.

Recall from the previous section that the weighted sum of a neuron is

$$
z=\sum_i w_i x_i+b.
$$

This value, often called the neuron's pre-activation, is simply a weighted combination of its inputs. On its own, however, it is only a linear function of the inputs.

To produce the neuron's final output, we apply an activation function

$$
y=f(z).
$$

The activation function introduces non-linearity into the network. This is one of the most important ideas in neural networks. Without activation functions, every neuron would perform only a linear transformation. Even if we stacked multiple layers together, the entire network would still be equivalent to a single linear transformation.

As a result, the network would only be able to learn simple linear relationships and would fail on many complex problems.

For example, imagine trying to classify the two datasets below.

In the previous section, we introduced the step function, which closely resembles the behavior of a biological neuron. However, modern neural networks rarely use it during training. The reason is that the learning algorithm requires differentiable activation functions. At this point, you do not need to worry about the details, we will return to this idea when we study **backpropagation**, where the importance of differentiability will become clear.

Instead, modern neural networks typically use smooth and differentiable activation functions such as **Sigmoid**, **Tanh**, or **ReLU**, which allow gradients to flow through the network during training. 

> **Further reading:**  For a comparison of these functions and their properties, read this article:
>
> https://www.geeksforgeeks.org/machine-learning/activation-functions-neural-networks/

#### Step 2: Measuring the Prediction Error

In the previous step, our robot used the neural network to predict how the gripper should move. However, making a prediction is only half of the learning process. The network must also determine **how good that prediction is**.

Suppose the robot predicts a movement that is slightly different from the desired one. How can the network tell whether its prediction is good or bad? More importantly, how can it compare two different predictions and decide which one is better?

This is the role of the **loss function**.

A loss function is a mathematical function that compares the network's prediction with the desired output (the target) and returns a single numerical value representing the prediction error.

You can think of the loss function as the network's objective during training. It provides numerical feedback on how well the network is performing, and the goal of the learning algorithm is to adjust the network's weights and biases so that this loss becomes as small as possible.

Different loss functions measure prediction errors in different ways, meaning they can influence how the network learns. As a result, the choice of loss function can have a significant impact on the model's final performance. Different machine learning tasks also require different loss functions. For example, **Mean Squared Error (MSE)** is commonly used for regression problems, while **cross-entropy loss** is typically used for classification tasks.

> **Further reading:** You can find an overview of many commonly used loss functions here:
>
> https://www.geeksforgeeks.org/deep-learning/loss-functions-in-deep-learning/


More generally, the loss function allows us to define what we want the network to achieve. It is not limited to measuring prediction accuracy alone. We can combine multiple objectives into a single loss function, allowing the network to optimize several goals simultaneously. For example, in addition to minimizing the prediction error, we may include a term that penalizes large weight values. This encourages the network to learn simpler models, helping to reduce overfitting and improving its ability to generalize to unseen data.

There are many loss functions designed for different machine learning tasks and objectives. In this chapter, however, we will focus on one of the simplest and most widely used loss functions, **Mean Squared Error (MSE)**, because it clearly illustrates the fundamental ideas behind supervised learning.

For a network with $n$ output neurons, the MSE is defined as

$$
\mathcal{L}
=
\frac{1}{n}
\sum_{i=1}^{n}
(\hat{y}_i-y_i)^2.
$$

In our robotics example, the network predicts two outputs—the horizontal and vertical movement of the gripper. Therefore, the loss becomes

$$
\mathcal{L}
=
\frac{1}{2}
\left(
(\hat{y}_1-y_1)^2
+
(\hat{y}_2-y_2)^2
\right).
$$

The squared term has two important advantages. First, it ensures that the loss is always non-negative, so positive and negative errors cannot cancel each other out. Second, it penalizes large prediction errors more heavily than small ones, encouraging the network to produce more accurate predictions.

Our objective during training is therefore to find the values of the weights and biases that minimize the loss. In other words, we want to adjust the network's parameters so that the predicted gripper movement becomes as close as possible to the desired movement.


#### Step 3: Improving the Prediction (Gradient Descent)

At this point, the network knows how wrong its prediction is. However, knowing that the prediction is incorrect is not enough, we also need a way to improve it.

Our objective is now clear: we want to **minimize** the loss. In other words, we want to find the values of the network's weights and biases that produce the most accurate predictions.

From calculus, we know that the minimum (or, more generally, an extremum) of a differentiable function occurs at a point where its derivative is zero. If we could directly solve

$$
\frac{\partial \mathcal{L}}{\partial w}=0
$$

for every weight in the network, we would obtain a candidate for the minimum.

Unfortunately, this is not practical. A modern neural network may contain millions or even billions of parameters, making the loss function an extremely complex, high-dimensional surface. Solving such a system of equations directly is computationally infeasible.

Instead of trying to jump directly to the minimum, we use an iterative optimization algorithm called gradient descent.

To understand the idea, imagine you are standing somewhere on a mountain in thick fog. Your goal is to reach the bottom of the valley, but you cannot see the entire landscape. The only information available is the slope of the ground beneath your feet. If the ground slopes upward in one direction, you know that walking in the opposite direction will take you downhill. By repeatedly taking small downhill steps, you gradually approach the bottom of the valley.

Training a neural network follows exactly the same principle. Instead of moving through a physical landscape, we move through the loss landscape, where every point represents a different set of weights and biases, and the height of the landscape corresponds to the value of the loss.

The quantity that tells us the slope of this landscape is called the gradient. For a single weight $w$, the gradient is

$$
\frac{\partial \mathcal{L}}{\partial w},
$$

which measures how much the loss changes when the weight changes by a very small amount.

- If the gradient is **positive**, increasing the weight increases the loss. Therefore, we should decrease the weight.
- If the gradient is **negative**, increasing the weight decreases the loss. Therefore, we should increase the weight.
- If the gradient is **close to zero**, changing the weight has very little effect on the loss, suggesting that we are close to a minimum.

Since the gradient always points in the direction of the steepest increase, we minimize the loss by moving in the opposite direction, known as the negative gradient.

This leads to the gradient descent update rule:

$$
w \leftarrow w - \eta \frac{\partial \mathcal{L}}{\partial w},
$$

where

- $w$ is the weight being updated,
- $\eta$ is the learning rate, a small positive constant that controls the size of each update step,
- $\frac{\partial \mathcal{L}}{\partial w}$ is the gradient of the loss with respect to the weight.

The learning rate, denoted by $\eta$, is a **hyperparameter**, meaning that its value is chosen by the user before training begins rather than being learned by the network itself. It determines the size of each update step and, consequently, how quickly the network learns.

If the learning rate is too small, the network learns very slowly, and training may require many iterations before converging. On the other hand, if the learning rate is too large, the updates may overshoot the minimum, causing the loss to oscillate or even diverge instead of converging.

The effect of different learning rates is illustrated in the figure below.
<figure style="text-align: center;">
<img src="{{ site.baseurl }}/assets/images/NN/learning_rate.png" alt="Effect of different learning rates on training" width="400">
<figcaption>
Effect of the learning rate on the convergence of gradient descent. A learning rate that is too small leads to slow learning, while one that is too large may cause the optimization to oscillate or diverge. An appropriate learning rate enables fast and stable convergence.
</figcaption>
</figure>


#### Step 4: Computing the Gradients (Backpropagation)

Gradient descent tells us how to update the network's parameters:

$$
w \leftarrow w-\eta\frac{\partial \mathcal{L}}{\partial w}.
$$

However, this update rule assumes that we already know the gradient

$$
\frac{\partial \mathcal{L}}{\partial w}.
$$

This immediately raises an important question:

> **How do we compute the gradient of the loss with respect to every weight in a neural network that may contain millions of parameters?**

Computing each gradient independently from the beginning would require repeating many of the same calculations and would therefore be extremely inefficient. Neural networks instead use an algorithm called **backpropagation**, which applies the chain rule systematically and reuses intermediate computations to calculate all the gradients efficiently.

Let us return to the neural network introduced earlier:

<figure style="text-align: center;">
<img src="{{ site.baseurl }}/assets/images/NN/backpropagation.png" alt="Example neural network used to illustrate backpropagation" width="600">
<figcaption>Neural network used throughout the backpropagation example.</figcaption>
</figure>

To understand the main idea, consider what happens when one weight in the first layer changes slightly.

Suppose the weight changes by a small amount. This change affects the weighted sum computed by the hidden neuron connected to that weight. The hidden neuron's activation then changes, which influences the output neurons. Consequently, the predicted horizontal and vertical gripper movements may change. Because the prediction changes, the loss may also change.

We can summarize this sequence as

$$
\text{weight}
\rightarrow
\text{hidden pre-activation}
\rightarrow
\text{hidden activation}
\rightarrow
\text{network outputs}
\rightarrow
\text{loss}.
$$

Therefore, a weight does not affect the loss in isolation. Its influence passes through a chain of intermediate computations. To determine the effect of the weight on the final loss, we must account for every step along this chain.

This is precisely what the **chain rule** allows us to do.

---

##### Following One Weight Through the Network

Suppose we want to compute the gradient of the loss with respect to the first-layer weight

$$
w_{12}^{(1)}.
$$

We use the convention that $w_{ij}^{(1)}$ represents the weight connecting input $x_i$ to hidden neuron $h_j$. Therefore, $w_{12}^{(1)}$ connects input $x_1$ to the second hidden neuron.

Let the pre-activation of the second hidden neuron be

$$
z_2^{(1)}
=
w_{12}^{(1)}x_1
+
w_{22}^{(1)}x_2
+
b_2^{(1)},
$$

and let its activation be

$$
h_2=f\left(z_2^{(1)}\right).
$$

The weight $w_{12}^{(1)}$ first affects $z_2^{(1)}$, which in turn changes the activation $h_2$. The activation $h_2$ then contributes to both output neurons, which predict the horizontal and vertical movements of the gripper.

$$
\hat{y}_1
= \text{predicted horizontal movemen,}
$$

$$
\hat{y}_2
= \text{predicted vertical movement.}$$

The relevant paths through the network are therefore

$$
w_{12}^{(1)}
\rightarrow
z_2^{(1)}
\rightarrow
h_2
\rightarrow
\hat{y}_1
\rightarrow
\mathcal{L},
$$

and

$$
w_{12}^{(1)}
\rightarrow
z_2^{(1)}
\rightarrow
h_2
\rightarrow
\hat{y}_2
\rightarrow
\mathcal{L}.
$$

Because the hidden neuron affects both outputs, the total effect of $w_{12}^{(1)}$ on the loss is the sum of its effects through these two paths:

$$\frac{\partial \mathcal{L}}{\partial w_{12}^{(1)}}=
\left(
\frac{\partial \mathcal{L}}{\partial \hat{y}_1}
\frac{\partial \hat{y}_1}{\partial h_2}
+
\frac{\partial \mathcal{L}}{\partial \hat{y}_2}
\frac{\partial \hat{y}_2}{\partial h_2}
\right) \cdot \frac{\partial h_2}{\partial z_2^{(1)}} \cdot \frac{\partial z_2^{(1)}}{\partial {w_{12}^{(1)}}}$$

Although this expression may look complicated at first, each factor answers a simple question:

- $\frac{\partial \hat{y}_1}{\partial h_2}$: How does the predicted horizontal movement change when the activation of the second hidden neuron changes?
- $\frac{\partial \hat{y}_2}{\partial h_2}$: How does the predicted vertical movement change when the activation of the second hidden neuron changes?
- $\frac{\partial h_2}{\partial z_2^{(1)}}$: How does the activation of the second hidden neuron change when its pre-activation changes?
- $\frac{\partial z_2^{(1)}}{\partial w_{12}^{(1)}}$: How does the second hidden neuron's pre-activation change when the selected weight changes?

Backpropagation evaluates these derivatives from the output of the network toward its input. It first determines how the loss depends on the predictions, then how the predictions depend on the hidden activations, and finally how the hidden activations depend on the weights.

This backward order allows intermediate derivatives to be reused. As a result, backpropagation can efficiently compute the gradients of the loss with respect to every weight and bias in the network.


x



## Credits

## Ressources




---

[Back to Top](#start)