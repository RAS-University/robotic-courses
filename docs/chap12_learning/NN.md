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
<script src="{{ '/assets/js/NN/youtube-trimmer.js' | relative_url }}"></script>

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

##### Step 1: Making a Prediction (Forward Pass)

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

##### Step 2: Measuring the Prediction Error

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


##### Step 3: Improving the Prediction (Gradient Descent)

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


##### Step 4: Computing the Gradients (Backpropagation)

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

###### Following One Weight Through the Network

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

#### Sequential Models

So far, we have focused on **feedforward neural networks**, in which information flows in one direction, from the input layer to the output layer. Each input is processed independently, and once the network produces an output, the computation ends. The network does not retain information about previously processed inputs.

This approach works well when the inputs are independent. For example, when classifying an object in an image, the prediction can often be made using the current image alone. Previous observations are not required.

However, many robotics tasks are inherently **sequential**. Consider a mobile robot navigating through a dynamic environment shared with pedestrians and other robots. To reach its destination safely, the robot must perceive nearby agents, estimate how they are moving, predict where they may move next, and use this information to plan a collision-free trajectory.

A single camera image provides only a snapshot of the environment. Although visual cues may provide limited information about motion, reliably estimating a person’s velocity and direction generally requires multiple observations over time. By comparing consecutive images, the robot can determine how the person’s position is changing.

By processing a **sequence of images**, the robot can: estimate the velocity and direction of nearby agents, predict their possible future trajectories, and continuously adjust its own motion to avoid collisions.

Reasoning over time is important in many other robotics applications as well. A manipulation robot must remember the progress of an action, a legged robot must coordinate its movements across a locomotion cycle, and a collaborative robot must interpret how a human’s actions evolve over time.

These tasks require models that can use information from previous observations while processing the current one. Such models are called **sequential models**. In the following sections, we introduce several important architectures for processing sequential data, including **Recurrent Neural Networks (RNNs)**, **Echo State Networks (ESNs)**, and **Long Short-Term Memory (LSTM)** networks.

##### Recurrent Neural Networks (RNNs)

A **Recurrent Neural Network (RNN)** is one of the fundamental neural network architectures for processing sequential data. Unlike a feedforward neural network, which processes each input independently, an RNN maintains an internal **memory**, which we refer to as the **context**. This context allows information from previous inputs to influence the network's current prediction.

Figure X compares a feedforward neural network with an RNN. As shown in Figure Xb, an RNN extends the architecture of a feedforward neural network by introducing **recurrent connections** (shown in magenta). These recurrent connections carry the context from one time step to the next, enabling the network to remember previously processed information.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/NN/rnn_vs_feedforward.png"
       alt="Comparison between a feedforward neural network and a recurrent neural network"
       width="900">
  <figcaption>
    <strong>Figure 1.</strong> Comparison of a feedforward neural network (left) and a recurrent neural network (right).
  </figcaption>
</figure>

Although Figure 1 illustrates the recurrent connections, it does not show how the network processes an entire sequence. A more intuitive way to understand an RNN is to unroll it through time, as shown in Figure 2.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/NN/rnn_unrolled.png"
       alt="Unrolled recurrent neural network"
       width="900">
  <figcaption>
    <strong>Figure 2.</strong> An unrolled view of an RNN. 
  </figcaption>
</figure>

At each time step, the same network receives the current input together with the context propagated from the previous time step and produces an output. It then updates the context using the newly processed information and forwards it to the next time step.

A natural question is: **where should the context come from, and where should it be fed back into the network?** Two of the earliest and most influential recurrent neural network architectures proposed different answers to this question: the **Elman network** and the **Jordan network**.

As shown in **Figure 3**, the key difference between these two architectures lies in the source of the context.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/NN/elman_vs_jordan.png"
       alt="Comparison between Elman and Jordan recurrent neural network architectures"
       width="900">
  <figcaption>
    <strong>Figure 3.</strong> Comparison of the Elman and Jordan recurrent neural network architectures.
  </figcaption>
</figure>

In the **Elman network** (Figure 3a), the context is obtained from the **hidden layer**. After each time step, the hidden-layer activations are copied into the context units and passed to the next time step, where they are combined with the new input. Intuitively, the network remembers part of **what it was internally representing** at the previous step.

In the **Jordan network** (Figure 3b), the context is instead obtained from the **output layer**. The output produced at one time step is stored in the context units and fed back into the hidden layer at the next time step. Intuitively, the network remembers **what it previously produced**.

At first glance, the two architectures look very similar. However, the difference is subtle and meaningful.

In a Jordan network, the feedback comes from the output, which is usually a more compact and task-specific representation. In other words, the network feeds back its previous prediction or decision.

In an Elman network, the feedback comes from the hidden layer, before the final output is produced. The hidden activations can preserve a richer representation of the current input and its temporal context, including information that may not appear directly in the output.

Although both architectures allow previous information to influence future predictions, the **Elman network** is generally more expressive because the hidden layer can contain more information than the final output. For this reason, many modern recurrent neural networks are conceptually closer to the Elman architecture, where the internal hidden representation is propagated through time and serves as the network's memory.


###### A Robotics Example: Learning Multiple Manipulation Behaviors

A good example of how recurrent neural networks can be used in robotics is presented in the paper *Dynamic and Interactive Generation of Object Handling Behaviors by a Small Humanoid Robot Using a Dynamic Neural Network Model* by Ito *et al.* (2006). The authors investigated whether a robot could learn multiple manipulation skills using a **single recurrent neural network** instead of designing a separate controller for each task. 

The objective was not only for the robot to execute different manipulation behaviors, but also to **automatically select and switch between them** as the environment changed. Figure 4 illustrates two of the learned tasks. In the first task, the robot repeatedly rolls a ball between its two hands. In the second task, it grasps the ball, lifts it from the table, and then releases it. 

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/NN/rnnpb_ball_behaviors.png"
       alt="Humanoid robot learning two different ball manipulation behaviors"
       width="900">
  <figcaption>
    <strong>Figure 4.</strong> Two manipulation behaviors learned by the humanoid robot: (a) rolling a ball and (b) lifting a ball. Adapted from Ito <em>et al.</em> (2006).
  </figcaption>
</figure>

To solve this problem, the authors used a **Recurrent Neural Network with Parametric Bias (RNNPB)**. This architecture extends the **Jordan recurrent neural network** introduced in the previous section by adding a small set of additional neurons called **Parametric Bias (PB) units**. The recurrent feedback mechanism remains the same: the network's outputs are copied into the context units and fed back to the hidden layer at the next time step. The only structural difference is the addition of the PB units, which allow the network to represent different learned behavior patterns.

Figure 5a shows the original RNNPB architecture presented in the paper during the learning phase. At first glance, the original diagram may appear complicated because many of the connections are omitted for clarity and several groups of neurons are shown simultaneously. Figure 5b presents the same architecture using the color convention introduced in the previous figures, making it easier to identify each component and understand how information flows through the network.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/NN/rnnpb_original_and_colored.png"
       alt="Original and colored representations of the RNNPB architecture"
       width="1000">
  <figcaption>
    <strong>Figure 5.</strong> The RNNPB architecture during the learning phase: (a) the original architecture presented by Ito <em>et al.</em> (2006), and (b) a simplified colored representation. Blue nodes represent sensory and motor inputs, purple nodes represent Parametric Bias units, orange nodes represent hidden units, green nodes represent prediction outputs, and pink nodes represent recurrent context units.
  </figcaption>
</figure>

After training, the network is used in the **interaction phase**, where the robot generates actions online while interacting with the object. At each time step, the RNNPB receives the robot’s current sensory information, including the observed position of the object and the measured joint angles of its arms. Together with the context carried from the previous time step and the current PB values, these inputs are processed to produce the motor command for the next time step, and a prediction of the next sensory state. You can see the network in Fingure 6.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/NN/rnnpb_inference.png"
       alt="Information flow through the RNNPB during the interaction phase"
       width="900">
  <figcaption>
    <strong>Figure 6.</strong> Information flow through the RNNPB during inference. 
  </figcaption>
</figure>

The predicted sensory state is then compared with the observation that the robot actually receives. Their difference produces a **prediction error**. This prediction error provides information about whether the behavior currently represented by the PB values is consistent with the ongoing interaction. When the prediction error remains small, the current PB values are appropriate, and the robot continues generating the same behavior. However, when the environment changes, the predicted and observed sensory sequences become different, causing the prediction error to increase.

The network then adjusts the PB values to reduce this error. As the PB values move toward another region of the learned PB space, the motor sequence generated by the network gradually changes. In this way, the robot can recognize that the current interaction is better explained by another learned behavior and smoothly switch to that behavior.

Figure 7 illustrates an interesting experiment performed after the network had been trained. Initially, the robot is executing the **ball-rolling behavior** learned during training. As shown in Figure 7a, the robot repeatedly rolls the ball between its two hands while continuously predicting the next sensory state and generating the corresponding motor commands.

<figure style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/NN/rnnpb_behavior_transition.png"
       alt="Transition from rolling to lifting behavior"
       width="1000">
  <figcaption>
    <strong>Figure 7.</strong> Automatic transition between two learned behaviors. (a) The robot rolls the ball between its hands. (b) After the ball is stopped by a human, the robot gradually switches to the learned lifting behavior. Adapted from Ito <em>et al.</em> (2006).
  </figcaption>
</figure>

During the rolling motion, the sequence of sensory observations matches what the network expects. As a result, the prediction error remains small, and the network continues generating motor commands corresponding to the rolling behavior.

In the middle of the experiment, a human **interrupts the motion** by stopping the ball in front of the robot, as shown in Figure 6b. This changes the sensory observations dramatically. The network's prediction no longer matches the actual sensory input, causing the prediction error to increase.

Rather than replaying the rolling motion, the network updates its **Parametric Bias (PB)** values to reduce the prediction error. As the PB values gradually move toward another learned region of the PB space, the generated motor commands also change. Consequently, the robot smoothly transitions from the **rolling behavior** to the **lifting behavior**, grasps the ball, and lifts it from the table.

One of the most remarkable aspects of this experiment is that the robot was **never explicitly trained on this transition**. During training, the rolling and lifting motions were demonstrated as two independent behaviors. Nevertheless, the recurrent network was able to recognize that the current sensory sequence was no longer consistent with the rolling behavior and automatically generate the lifting behavior instead.

This example demonstrates one of the key advantages of recurrent neural networks in robotics. Because the network continuously combines its **current sensory observations** with its **memory of previous observations**, it can generate actions that adapt smoothly to changes in the environment instead of simply replaying a predefined motion sequence.

##### Echo State Networks (ESNs)

Echo State Networks (ESNs) are another type of **recurrent neural network**, but they take a very different approach to learning.

In a standard RNN, **every weight is trainable**. During training, the network must be unrolled through time, and gradients are propagated backward across every time step using **Backpropagation Through Time (BPTT)**. As sequences become longer, this process becomes computationally expensive and often suffers from unstable gradients.

Echo State Networks were proposed as a way to avoid this costly training procedure. Instead of training the entire recurrent network, an ESN divides the model into two parts:
- A **large recurrent network**, called the **reservoir**, whose weights are randomly initialized and **never updated**.
- A small **readout layer**, whose job is to convert the reservoir's internal state into the desired output. Only this layer is trained.

<figure class="figure">
  <img src="/assets/images/NN/echo-state-network.png"
       alt="Architecture of an Echo State Network">
  <figcaption>
    <strong>Figure 8.</strong> Architecture of an Echo State Network (ESN).
  </figcaption>
</figure>

At first glance, this idea seems surprising. If the recurrent network never learns, **how can the model solve complex sequential tasks?**

The key insight is that the reservoir does not need to learn specific behaviors. Instead, its purpose is to **transform the input sequence into a rich, high-dimensional dynamic representation** that preserves information about recent history. The readout layer then learns how to interpret these dynamics to produce the correct output.

One of the most intuitive and famous ways to understand this idea is through the analogy of **throwing stones into a pond**.

Imagine a calm pond with perfectly fixed physical laws. Every time you throw a stone into the water, it creates ripples that gradually spread outward and slowly disappear. The pond itself never changes, its physics remain exactly the same, but its surface continuously reflects the effects of recent events.

Now imagine throwing another stone before the ripples from the first one have completely faded. The new waves interact with the old ones, producing a unique interference pattern. By observing the shape of the water at a particular moment, you could infer information about **when the stones were thrown, how large they were, and in what order they arrived**.

The reservoir behaves in much the same way.

Each new input perturbs the recurrent network, producing an evolving activation pattern. Since previous activations have not completely disappeared, the current reservoir state contains a mixture of both **present and past inputs**. In other words, the reservoir creates an **echo** of recent history—hence the name **Echo State Network**.

The readout layer does not need to reconstruct the entire sequence. It only needs to learn how to interpret the current "ripples" inside the reservoir to generate the desired output. Since the reservoir remains unchanged during learning, training is much faster than in conventional recurrent neural networks.


###### A Robotics Example: Predicting Tactile Forces

A nice example of how Echo State Networks can be applied in robotics is presented in the paper *A Predictive Model for Tactile Force Estimation Using Audio-Tactile Data*.

Imagine a robot holding a bottle that is partially filled with water. As the robot rotates the bottle to move it from one position to another, the water flows inside the container. Although the robot precisely controls its own motion, it cannot directly observe or control the motion of the liquid. The contents may be hidden because the bottle is opaque or because they are occluded by the robot's own gripper. Consequently, the robot cannot rely on vision to estimate how the liquid is moving.

As the water moves, the mass distribution inside the bottle changes, causing the center of mass of the bottle-and-liquid system to shift. This continuously generates varying inertial forces and torques that act on the robot's hand. Unlike a solid object, whose mass distribution remains constant throughout manipulation, a partially filled bottle behaves as a dynamic system. A grasp that is stable at the beginning of the motion may become unstable a moment later as the liquid shifts inside the container. Therefore, the robot must continuously estimate how these internal dynamics affect the contact forces and adjust its grip accordingly. **Video 1** demonstrates this manipulation task, illustrating how the robot adapts its grip as the contents move inside the bottle.

<div style="text-align: center;">
    <video controls preload="metadata" playsinline style="width: 100%; max-width: 850px; height: auto;">
        <source src="/assets/videos/NN/ESN_tactile_water.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <p>
        <strong>Video 1.</strong> Real-time robotic manipulation of a partially filled bottle. The robot predicts future tactile forces and adjusts its grip to maintain a stable grasp.
    </p>
</div>

Now suppose we make the problem even more challenging. Instead of always manipulating a bottle filled with water, the robot is given bottles containing different materials, such as rice, gummies, or a thick slurry. Each material behaves differently. Water flows smoothly, rice moves as individual particles, gummies shift in larger chunks, while slurry moves much more slowly because of its high viscosity. Consequently, even when the robot performs exactly the same motion, the forces acting on the robotic hand evolve very differently depending on the material inside the bottle. **Video 2** demonstrates this challenge. A model trained only on water fails to accurately predict the tactile forces when the bottle is instead filled with rice, resulting in an unstable grasp. 

<div style="text-align: center;">
    <video controls preload="metadata" playsinline style="width: 100%; max-width: 850px; height: auto;">
        <source src="/assets/videos/NN/ESN_tactile_rice_failure.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <p>
        <strong>Video 2.</strong> A model trained only on water fails to generalize when manipulating a bottle filled with rice. 
    </p>
</div>

Rather than explicitly modeling the complex physics of every material, the robot can learn these dynamics directly from experience. By observing the recent history of tactile measurements, an Echo State Network learns the relationship between past tactile observations and the forces that will act on the robot in the near future. Because the reservoir naturally preserves information about previous measurements, it captures the temporal behavior of the moving contents while requiring only the output layer to be trained. As a result, the robot can anticipate changes in grasp stability and tighten or adjust its grip before the object becomes unstable or begins to slip.

The experimental setup is shown in Figure 9. A **KUKA iiwa** robot arm equipped with an **Allegro robotic hand** repeatedly rotates bottles containing four different materials: **water, rice, gummies, and a high-viscosity slurry**. The hand is covered with a **Tekscan tactile sensor**, while a microphone is mounted close to the bottle. As the contents move, both touch and sound are recorded simultaneously.

<div style="text-align: center;">
    <img src="/assets/images/NN/ESN_tactile_prediction_pipeline.png" alt="Overview of the tactile and audio prediction framework" width="900">
    <p><strong>Figure 9.</strong> Overview of the tactile force prediction framework.</p>
</div>

Instead of using the raw tactile image directly, the pressure measurements are converted into two meaningful quantities for each region of the hand:
- **Center of Pressure (CoP):** the location where the contact force is concentrated.
- **Total Force:** the magnitude of the force acting on that region.

Together, these values provide a compact description of how the object interacts with the robot throughout the manipulation. **Video 3** visualizes both the predicted and measured Center of Pressure and Total Force during the manipulation task, allowing you to compare the ESN's predictions with the actual tactile measurements.

<div style="text-align: center;">
    <video controls preload="metadata" playsinline style="width: 100%; max-width: 850px; height: auto;">
        <source src="/assets/videos/NN/ESN_tactile_prediction.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <p>
        <strong>Video 3.</strong> Comparison between the predicted and measured Center of Pressure (CoP) and Total Force during bottle manipulation.
    </p>
</div>

Since these measurements evolve continuously over time, they naturally form a time series. The ESN first observes a short sequence of tactile measurements to initialize its reservoir. This initialization phase allows the reservoir to encode the recent history of the interaction. Once initialized, the network predicts the tactile measurements for hundreds of future time steps without receiving any new sensor inputs. This open-loop prediction allows the robot to anticipate future contact forces rather than simply reacting to the current ones. 

Touch is not the only clue available to the robot. As the contents move inside the bottle, they also generate distinctive sounds. Rice produces repeated impacts, water creates splashing noises, and each material leaves its own acoustic signature. These sounds reveal information about the internal motion that may not yet appear in the tactile measurements. **Video 4** demonstrates the acoustic signal recorded during the manipulation of a bottle filled with water, similar to what the robot hears through its onboard microphone.

<div style="text-align: center;">
    <video controls preload="metadata" playsinline style="width: 100%; max-width: 850px; height: auto;">
        <source src="/assets/videos/NN/ESN_tactile_sound.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <p>
        <strong>Video 4.</strong> Audio recorded during the manipulation of a bottle filled with water. 
    </p>
</div>

To exploit this additional information, a second ESN is trained using Mel spectrograms extracted from the recorded audio. This network predicts future tactile measurements based solely on sound. Its predictions are then combined with those of the tactile ESN, producing a multimodal prediction that is more accurate than using tactile sensing alone. 

Together, the tactile and audio prediction pipelines shown in **Figure 9** illustrate how Echo State Networks can anticipate future contact forces during robotic manipulation. This example also highlights one of the main strengths of ESNs. Because only the output layer is trained, they provide an efficient way to model complex temporal dynamics while remaining computationally lightweight enough for real-time robotic applications.

For a deeper understanding of the complete framework, **Video 5** explains the proposed method in detail. It presents the experimental procedure, the tactile and audio prediction pipelines, and several analyses of the model's performance.

<div style="text-align: center;">
    <video controls preload="metadata" playsinline style="width: 100%; max-width: 850px; height: auto;">
        <source src="/assets/videos/NN/ESN-tactile_force.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <p><strong>Video 5.</strong> Detailed explanation of the audio-tactile force prediction framework.</p>
</div>

##### Long Short-Term Memory (LSTM)

The simple RNN introduced an important idea: using a context vector to remember previous information. However, in practice, simple RNNs struggle to learn dependencies over long sequences.

Imagine a mobile robot navigating through a building. At the beginning of the corridor, it observes an exit sign pointing left. Several seconds later, after passing many rooms and intersections, it finally reaches the end of the corridor where it must decide whether to turn left or right.

Ideally, the network should remember the information from the exit sign until it reaches the intersection. Unfortunately, a simple RNN often forgets information that occurred many time steps earlier.

The main reason is the vanishing gradient problem. During backpropagation through time, gradients are repeatedly multiplied by the recurrent weights and activation derivatives. As they propagate backwards through many time steps, these gradients often become extremely small, making it difficult for the network to update parameters based on information from the distant past. As a result, the network gradually loses long-term information and mainly relies on recent observations.

To overcome this limitation, Long Short-Term Memory (LSTM) networks were introduced. Rather than using a single context vector as memory, an LSTM introduces a dedicated memory cell together with several gates that control what information should be stored, removed, or used.

The key idea is simple:
> Instead of trying to remember everything, the network learns **what to remember**, **what to forget**, and **when to use the stored information**.

The overall architecture of an LSTM is shown in Figure 10.

<div style="text-align: center;">
    <img src="/assets/images/NN/LSTM_architecture.png" alt="Architecture of a Long Short-Term Memory (LSTM) network" width="900">
    <p><strong>Figure 10.</strong> Architecture of a Long Short-Term Memory (LSTM) network.</p>
</div>

Compared to a simple RNN, an LSTM contains a more sophisticated computational unit.

In addition to the hidden state ($h_t$), each LSTM cell maintains another vector called the **cell state** ($C_t$). The cell state acts as a long-term memory that flows through the sequence with only small modifications at each time step.

At first glance, the architecture in **Figure 10** may look complicated. However, it is actually built from a few simple operations that work together to update the cell state. To better understand how an LSTM works, we will break the architecture into smaller pieces and examine each component one at a time.

Before diving into the details, let's first think about the problem at a high level.

The goal of an LSTM is to decide **what information should be remembered and what information should be forgotten**. But how can a neural network make such decisions?

Suppose we want the network to assign a score to every piece of information indicating how much of it should be kept. Ideally, this score should lie between **0** and **1**:

- **0** means "completely discard this information."
- **1** means "keep it unchanged."
- Values between **0** and **1** mean "keep only part of it."

A natural choice for producing such scores is the **sigmoid activation function**, whose output always lies between 0 and 1.

Once the score has been computed, applying the decision is straightforward. We simply multiply the score by the information itself. If the gate outputs **1**, the information passes through unchanged. If it outputs **0**, the information is completely removed. Intermediate values preserve only a fraction of the information.

This simple idea—using a **sigmoid activation to decide how much information should pass, followed by an element-wise multiplication to apply that decision**—is the fundamental building block of an LSTM.

Now, let's think about the logic behind an LSTM.

At every time step, we have two sources of information:

- The **cell state** from the previous time step, which summarizes everything the network has remembered so far.
- The **current input**, which contains new information that may or may not be important.

Our goal is to combine these two sources into a new cell state that best represents the entire sequence up to the current time step.

But not all old information should be kept, and not all new information should be stored. Instead, the network first decides **how much of the previous memory should be preserved** and **how much of the new information should be added**.

Conceptually, the new cell state is computed as

$$
\text{new memory}
=
\text{kept old memory}
+
\text{selected new information}.
$$

<div style="text-align: center;">
    <img src="/assets/images/NN/LSTM_memory_update.png" alt="Updating the cell state in an LSTM" width="700">
    <p><strong>Figure 11.</strong> The cell state is updated by combining two components: the preserved information from the previous cell state (blue, forget gate) and the selected new information extracted from the current input (orange, input gate). The resulting updated cell state (<em>C<sub>t</sub></em>) is highlighted in red, showing the final memory that is passed to the next time step.</p>
</div>

Mathematically, this idea can be expressed as

$$
C_t =
\text{(how much to keep)} \times C_{t-1}
+
\text{(how much to add)} \times \text{(new information)}.
$$

The first term preserves useful information from the previous memory while discarding information that is no longer relevant. This is the role of the **forget gate**.

For example, suppose a warehouse robot is carrying a package to Shelf A. Halfway through its journey, it receives an update assigning the package to Shelf B instead. The previous destination is no longer useful. The forget gate learns to remove this outdated information from the memory so that future decisions are based only on the new destination.

The second term extracts useful information from the current input and adds it to the memory. This is the role of the **input gate**. For instance, after receiving the new delivery destination (Shelf B), the robot should store this new information in its memory so that it can continue navigating toward the correct location.

So far, we have described the update conceptually. In practice, the "how much to keep" and "how much to add" values are generated by sigmoid gates, while the "new information" is computed from the current input and the previous hidden state using a tanh activation:

$$
f_t=\sigma(W_f[h_{t-1},x_t]+b_f)
$$

$$
i_t=\sigma(W_i[h_{t-1},x_t]+b_i)
$$

$$
\tilde{C}_t=\tanh(W_c[h_{t-1},x_t]+b_c)
$$

Here,

- $f_t$ determines how much of the previous cell state should be preserved.
- $i_t$ determines how much of the candidate memory should be added.
- $\tilde{C}_t$ is called the **candidate memory**. It contains new information extracted from the current input and the previous hidden state.

Substituting these quantities into our conceptual equation gives the LSTM cell-state update rule:

$$
C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t,
$$

where $\odot$ denotes element-wise multiplication.

Up to this point, we have updated the cell state, which serves as the long-term memory of the network. However, not all of this information needs to be exposed at every time step. Some information may be useful to keep internally for future decisions, while only a subset is needed to produce the current output.

This is the role of the **output gate**, illustrated in **Figure 12**.

<div style="text-align: center;">
    <img src="/assets/images/NN/LSTM_output_gate.png" alt="The output gate in an LSTM cell" width="700">
    <p><strong>Figure 12.</strong> The output gate determines which information from the updated cell state is exposed as the hidden state. The cell state continues to the next time step, while the hidden state is passed to the next layer and the next time step.</p>
</div>

Similar to the other gates, the output gate first computes a value between 0 and 1 using a sigmoid activation:

$$
o_t=\sigma(W_o[h_{t-1},x_t]+b_o)
$$

This gate is then applied to the updated cell state to produce the hidden state:

$$
h_t=o_t\odot\tanh(C_t)
$$

Notice that the **cell state** ($C_t$) and the **hidden state** ($h_t$) have different roles. The cell state stores the network's long-term memory and is passed directly to the next time step. The hidden state, on the other hand, contains only the information that the LSTM chooses to reveal at the current time step. It is used to make predictions and is also passed to the next LSTM cell.

One of the main advantages of this design is that the cell state is updated primarily through **additive operations** rather than repeated nonlinear transformations. As a result, gradients can propagate through many time steps much more easily during backpropagation. This significantly reduces the **vanishing gradient problem**, allowing LSTMs to learn long-term dependencies that are difficult for standard RNNs to capture.

By separating **long-term memory** (the cell state) from the **information exposed to the rest of the network** (the hidden state), LSTMs can selectively remember, forget, and reveal information over long sequences. This ability has made LSTMs one of the most successful recurrent neural network architectures for sequential learning tasks, including speech recognition, language modeling, time-series forecasting, and many robotics applications such as robot navigation, motion prediction, and human-robot interaction.

###### A Robotics Example: Human-Robot Handover
One of the most common collaborative tasks in robotics is **object handover**, where a robot passes an object to a human or receives an object from them. Although this appears to be a simple task, successful handovers require the robot to continuously understand the human's intention and adapt its own motion accordingly.

Imagine someone handing you a bottle of water. You do not wait until their hand completely stops before reaching for it. Instead, you continuously observe the motion of their arm, predict where they are moving, and adjust your own hand throughout the interaction. Humans perform this naturally, making the handover smooth and effortless.

A robot should behave in the same way. However, making such predictions is challenging because the robot only observes a **partial motion**. During the first few moments, the human's movement may not clearly reveal the intended handover location. As more observations become available, the robot should continuously refine its prediction rather than committing to a single motion.

In **"Collaborative Human-Robot Motion Generation using LSTM-RNN"** (Humanoids 2018), Zhao *et al.* proposed using an LSTM network to directly generate robot motions from observed human motions. Figure 13 illustrates the proposed architecture. The robot first uses an RGB-D camera to capture a 10-timestep sequence of human arm observations (where each timestep tracks the 3D positions of the palm and elbow). These sequential observations are fed into an LSTM network containing 50 LSTM units, which captures the temporal evolution of the human motion. The output from the LSTM network is then passed through a fully connected layer to predict a corresponding 10-timestep sequence of robot movements (where each timestep defines the 7 joint angles of the robot's arm). Instead of explicitly estimating the human's future trajectory or solving a complex inverse kinematics problem, the network learns to directly map human motions to appropriate robot motions.

<div style="text-align: center;">
    <img src="/assets/images/NN/lstm_handover_architecture.png" alt="LSTM-based human-robot handover architecture" width="900">
    <p><strong>Figure 13.</strong> LSTM-based architecture for human-robot handover.</p>
</div>

This sequence-to-sequence formulation allows the robot to continuously convert human movements into appropriate robot actions. Because the system runs continuously, it rapidly generates short, overlapping predictions of where the robot should move. By averaging these overlapping predictions together, the robot ensures its physical movements are fluid and smooth. As new observations become available, the LSTM updates its predictions, enabling responsive handovers even when the human changes speed or slightly adjusts their movement. Because the LSTM maintains an internal memory of previous observations, it can continuously update its prediction as the human changes direction or speed. As a result, the robot reacts smoothly instead of waiting until the human finishes moving. In the video below, you can see a performance comparison between this proposed method and a traditional baseline approach.

<div style="text-align: center;">
    <iframe class="youtube-trim" data-start="18" data-end="28" data-loop="true" width="735" height="413" src="https://www.youtube.com/embed/HactyuLZWgA?start=18&amp;enablejsapi=1" title="Collaborative human-robot motion generation video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

This example illustrates one of the greatest strengths of LSTMs in robotics. Many robotic tasks cannot be solved by looking at a single observation. Instead, the robot must understand how the current observation relates to everything that has happened previously. By maintaining an internal memory of the interaction, the LSTM enables the robot to infer human intentions and generate appropriate actions in real time.

##### Gated Recurrent Unit (GRU)

Although LSTMs significantly improve the ability of recurrent neural networks to learn long-term dependencies, they achieve this using a relatively complex architecture consisting of a cell state and three gating mechanisms. This increased complexity also means more parameters to train and higher computational cost.

The **Gated Recurrent Unit (GRU)**, was designed as a simpler alternative to the LSTM. The main idea is to retain the ability to learn long-term dependencies while reducing the number of parameters and simplifying the computations. In practice, GRUs often achieve performance comparable to LSTMs while training faster, making them attractive for applications where computational efficiency is important, such as real-time robotics and embedded systems. The overall architecture of a GRU is illustrated in **Figure 14**.

<div style="text-align: center;">
    <img src="/assets/images/NN/gru-architecture.png" alt="Architecture of a Gated Recurrent Unit" width="900">
    <p><strong>Figure 14.</strong> Architecture of a Gated Recurrent Unit (GRU).</p>
</div>

Unlike the LSTM, which maintains both a **cell state** ($C_t$) and a **hidden state** ($h_t$), the GRU keeps only a single hidden state, which serves as both the network's working representation and its long-term memory. It also reduces the number of gates from three to two:
- **Reset gate** ($r_t$)
- **Update gate** ($z_t$)

The reset gate is computed as

$$
r_t=\sigma(W_r x_t+U_r h_{t-1}),
$$

where the values of the reset gate determine how much of the previous hidden state should be used when computing new information.

Using the reset gate, the GRU computes a **candidate hidden state**

$$
\tilde h_t=\tanh\left(W_hx_t+U_h(r_t\odot h_{t-1})\right),
$$

which represents a proposal for what the new hidden state should become. Figure 15 illustrates how the reset gate influences the computation of the candidate hidden state.

<div style="text-align: center;">
    <img src="/assets/images/NN/gru-reset-gate.png" alt="Computation of the candidate hidden state in a GRU." width="500">
    <p><strong>Figure 15.</strong> Computation of the candidate hidden state.</p>
</div>

As shown in **Figure 15**, the reset gate is applied to the previous hidden state before the candidate hidden state is computed. In this way, the GRU can control how much information from the previous hidden state contributes to the candidate hidden state.

If the reset gate is close to one, the previous hidden state contributes almost entirely to the candidate computation. Conversely, if the reset gate is close to zero, its contribution is largely suppressed, and the candidate hidden state depends primarily on the current input. This allows the network to ignore previous context when it is no longer relevant.

Compared to an LSTM, this is an important difference. In an LSTM, the candidate cell state is computed as

$$
\tilde{C}_t=\tanh\left(W_c[h_{t-1},x_t]+b_c\right),
$$

where the previous hidden state always contributes to the candidate computation. In contrast, the GRU first uses the reset gate to determine how much of the previous hidden state should be used before computing the candidate hidden state.

The update gate is computed as

$$
z_t=\sigma(W_zx_t+U_zh_{t-1}),
$$

and is used to determine how much of the previous hidden state should be preserved.

The final hidden state is then computed as

$$
h_t=(1-z_t)\odot h_{t-1}+z_t\odot\tilde h_t,
$$

where the previous hidden state and the candidate hidden state are combined according to the value of the update gate. Figure 16 illustrates how the update gate controls the computation of the new hidden state.

<div style="text-align: center;">
    <img src="/assets/images/NN/gru-update-gate.png" alt="Computation of the hidden state in a GRU." width="500">
    <p><strong>Figure 16.</strong> Computation of the new hidden state.</p>
</div>

As shown in **Figure 16**, the update gate determines how much information should be taken from the previous hidden state and how much should come from the candidate hidden state. Unlike the reset gate, which influences how the candidate hidden state is computed, the update gate determines how the final hidden state is formed.

If the update gate is close to zero, most of the previous hidden state is preserved, and only a small amount of the candidate hidden state is incorporated. Conversely, if the update gate is close to one, the candidate hidden state contributes more strongly, allowing the network to update its memory with new information. In this way, the update gate controls how quickly the hidden state adapts to new inputs while retaining useful information from previous time steps.


If the update gate is close to one, the network largely preserves its previous memory. If it is close to zero, the candidate hidden state replaces most of the old memory. Therefore, the update gate effectively combines the roles of the forget gate and the input gate in an LSTM, while the reset gate provides an additional mechanism that allows the network to selectively ignore previous context when computing new information.

Although GRUs do not explicitly maintain a separate cell state, the additive update of the hidden state allows information and gradients to propagate across many time steps, alleviating the vanishing gradient problem in much the same way as LSTMs.

Overall, GRUs offer a favorable trade-off between model complexity and performance. They require fewer parameters, are computationally more efficient, and often achieve accuracy comparable to LSTMs, especially on moderately long sequences.


#### Deep Learning Applications



## Credits

## Ressources




---

[Back to Top](#start)
