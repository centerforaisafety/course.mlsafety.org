---
layout: lecture
title: Detecting Emergent Behaviour
youtube_id: _4qrAck4q18
---
**Contributor(s): Bilal Chughtai**

This lecture discusses emergent behaviour. Discussion surrounding emergent behaviour in AI Safety can sometimes be fairly speculative, so we ground our discussion with many examples and present some work on detecting emergent proxy gaming.

It is difficult to ensure the safety of models if we do not know what they are capable of. Consider a programming bot that suddenly learns how to access the internet and hack as the bot is scaled to more parameters or compute. This rise in performance could be dangerous. Unfortunately, recent work has shown cases like this to be fairly common. Let's look at some distinct kinds of emergent capability. Some of these are substantially more difficult to detect than others.

## Performance Spikes

Some models possess quantitative capabilities that are hard to predict. For example, an [adversarially trained MNIST model](#mnist) has it's accuracy discontinuously increase as it's capability scale increases. 

<p align=center>
<img src="images/MNIST.png"  style="width:12cm"/>
</br>
<i>Figure 1: MNIST classification accuracy suddenly increases as capacity is scaled. </i>
</p>

## Unanticipated Behaviour

More problematically, some capabilities can be entirely *unanticipated*. Qualitatively distinct capabilities may spontaneously emerge, even if we do not train models to have these capabilities explicitly; a key step towards general intelligence. Large language models, such as GPT-3, are trained to predict the next token in a sequence of words. We see empirically that as the number of parameters are scaled these models become capable of [performing tasks they were not explicitly trained on](#predictability_and_surprise), including
* Three digit addition.
* [Massive multitask language understanding](#MMML): answering multiple choice questions on elementary mathematics, US history, computer science, law, and more.
* Program synthesis: writing code.

<p align=center>
<img src="images/unanticipated.png"  style="width:12cm"/>
</br>
<i>Figure 2: Large language models have untancipated spontaneously emergent capabilities as parameter count is scaled. </i>
</p>

## Emergent Internal Computation

Sometimes, interpretable internal computation can emerge. Some self-supervised vision Transformers [learn to use self-attention to segment images](#vision_transformers), even without explicit segmentation supervision. This can be seen by producing saliency maps thresholding the self-attention maps to retain 60% of the probability mass. This leads to worries about potentially dangerous internal latent knowledge models may have.

<p align=center>
<img src="images/vision_transformers.png"  style="width:12cm"/>
</br>
<i>Figure 3: Self-supervised Vision Transformers learn to use self-attention to segment images without explicitly training on this task. </i>
</p>

## Grokking 

[Grokking](#open_ai_grokking) is a phenomenon by which emergent capabilities may result from scaling the number of *optimization steps* rather than model size. Model's undergo a *phase transition*, suddenly generalizing and sharply increasing validation accuracy, after initially only memorizing and overfitting to training data. 

<p align=center>
<img src="images/grokking.png"  style="width:12cm"/>
</br>
<i>Figure 4: Grokking on a modular division task. Validation accuracy spontaneously increases after a certain number of optimization steps. </i>
</p>

Recent [interpretability work](#neelnanda) claims grokking is really all about phase changes. If one takes a task exhibiting phase changes, limits the data and regularises just enough such that the generalised solution is preferred over the memorised solution, we see grokking. Furthermore, grokking can be interpreted as the model interpolating smoothly between the memorising and generalising solution, and not just some random walk in the search space.

## Instrumental Goals
Instrumental goals provide reason for us to want to better understand and detect emergent behaviour in future AI systems. Self-preservation is an instrumental goal of many biological creatures, institutions, and so likely also future powerful AI systems. It increases the probability any agent is able to accomplish its goals; an agent can't achieve it's goals if it's off or dead. A goal like this is said to be *instrumentally convergent* if it's so useful that it is a likely tendency for various sufficiently advanced agents to attain it. Other examples include seeking power, cognitive enhancement, and obtaining resources. One can imagine these to emerge suddenly if agents obtain the ability to plan suddenly.

## Future Work

Future work in detecting and forecasting emergent capabilities and goals could include:
* developing benchmarks to detect qualitatively distinct emergent behaviour
* developing tools to better foresee unexpected jumps in capabilities
* developing infrastructure to improve the rate at which researchers can discover hidden capabilities when interacting with models
* creating diverse testbeds with many not-yet-demonstrated capabilities and screen new models to see if they possess them

# Proxy Gaming

## Examples
The *cobra effect* is an anecdote of an occurrence in India during British rule. The British government, concerned about the number of venomous cobras in Delhi, offered a bounty for every dead cobra. Initially, this was a successful strategy; large numbers of snakes were killed for the reward. Eventually, however, enterprising people began to breed cobras for the income. When the government became aware of this, the reward program was scrapped. When cobra breeders set their now-worthless snakes free, the wild cobra population further increased. Can you spot the proxy gaming? Incentivizing the proxy goal of dead cobras failed at achieving the objective of a reduced cobra population, as it was *over-optimized* or *gamed* through raising cobras for slaughter. 

If one seeks to optimise website user satisfaction, a proxy may be the number of clicks. This can be gamed through promoting clickbait, or addicting users. The AI agent does not care whether the content converges to the user's interests, or the user's interests converge to the content. This observation has been termed [auto-induced distributional shift](#krueger) and has been shown to be detectable in principle.

<p align=center>
<img src="images/clickbait.png"  style="width:12cm"/>
</br>
<i>Figure 5: Clickbait is a pathway to radicalize users and change their preferences. The red paths of influence should be disincentivised, while the green paths are okay. Image credit David Krueger.</i>
</p>

One can find many examples of proxy gaming in the reinforcement learning paradigm. [CoinRun](#coinrun) is a Sonic the Hedgehog platformer inspired game in which the agent needs to reach a coin in a linear platform level. During training, this coin was always placed at the end of a level. If the coin is moved, we see the agent does not generalise, but instead just runs to the end of the level. It has learned a bad proxy.

<p align=center>
<img src="images/coin_run.gif"  style="width:12cm"/>
</br>
<i>Figure 5: The training CoinRun task.</i>
</p>

<p align=center>
<img src="images/coin_run_bad.gif"  style="width:12cm"/>
</br>
<i>Figure 6: The learned CoinRun policy does not generalise when the coin is moved.</i>
</p>

Another classic example is from a [boat racing game](#openai_boat). An RL agent was given the goal of achieving a high score in this game as a proxy for completing the circuit, but instead managed to obtain high score through 'turbo boosting' on loop, while also crashing, burning, colliding into other boats, and going in the wrong direction... 

<p align=center>
<img src="images/boat.gif"  style="width:12cm"/>
</br>
<i>Figure 7: Clear proxy gaming in a boat racing game.</i>
</p>

## Principles

Recall *Le Châtelier's principle* from high school chemistry. This states that if a dynamic equilibrium is disturbed by changing the conditions, the position of equilibrium shifts to counteract the change to reestablish an equilibrium. This may be extrapolated to many other adaptive systems, including that of an AI agent optimizing a goal.

*Goodhart's Law* is a heuristic stating that any observed statistical regularity will tend to collapse once pressure is placed upon it. Or, when a measure becomes a target, it ceases to be a good measure. It would be wrong to rely too heavily on this latter simplification. It should not be extrapolated too far and taken to mean all metrics are useless, as then no goal would be worth pursuing. 

Some goals can be deemed better than others however, if they are *more robust* to optimisation pressures. GDP is a better proxy for national wealth than a worker's performance review is a proxy for employee quality. A number of factors contribute to poor objective approximation by proxies
* limited oversight (spatially and temporally) 
* computational costs
* measurement error
* evaluation costs
* lack of adaptivity or robustness to distribution shift and adversaries
* lack of complete foresight of structural proxy problems
* difficulty encapsulating everything that the proxy setter actually cares about

Recent work has attempted to formally [define and characterize](#krueger2) proxy gaming. A proxy can be said to be *ungameable* if increasing the expected proxy return can never decrease the return according to the true reward. Under this strict (but potentially incorrect) definition it seems that optimizing a proxy is almost always bad, and we should view optimization as more of a *heuristic* instead of goal, and be careful not to over optimise given our uncertainty.

Since deficient proxies seem ubiquitous, further work could attempt to create optimization algorithms accounting for the fact that proxies aren't perfect, find better ways of detecting when proxy gaming os occurring, or find ways to make proxies more robust.

## A Proxy Gaming Detection Benchmark

[Pan et al. (2022)](#pan) present a benchmark for proxy gaming detectors. They use four distinct environments: traffic control, glucose monitoring, covid response, and an Atari game. Here, we'll just discuss the traffic environment. An autonomous vehicle (AV) simulation models vehicles driving on a highway network and is controlled by an RL policy. The RL agent has access to observations only from the AV it controls i.e. it's position and velocity, and the position and velocity of the cars immediately in front and behind. The RL agent acts through modifying its AV's acceleration. 

<p align=center>
<img src="images/traffic.png"  style="width:12cm"/>
</br>
<i>Figure 8: Schematic of the traffic control environment. Image credit Pan et al. (2022).</i>
</p>

Stronger optimizers, with more parameters or training steps, may have access to a larger action space at finer resolution, so may better exploit misspecifications in this environment, which are grouped into three classes:
1. **Misweighting**. Suppose that the true reward is a linear combination of commute time and acceleration (for reducing carbon emissions). Downweighting the acceleration term thus underpenalizes carbon emissions. In general, misweighting occurs when the proxy and true reward capture the
same desiderata, but differ on their relative importance. 
2. **Ontological**. Congestion could be operationalized as either high average commute time or low average vehicle velocity. In general, ontological misspecification occurs when the proxy and true
reward use different desiderata to capture the same concept. Figure 8 shows this.
3. **Scope**. If monitoring velocity over all roads is too costly, a city might instead monitor them only over highways, thus pushing congestion to local streets. In general, scope misspecification occurs when the proxy measures desiderata over a restricted domain (e.g. time, space).

<p align=center>
<img src="images/traffic2.png"  style="width:12cm"/></br>
<i>Figure 9: True reward vs proxy reward in benchmark environments. This shape of true vs proxy reward graph is characteristic of emergent proxy gaming. Image credit Pan et al. (2022).</i>
</p>

A baseline to detect emergent proxy gaming is to use *policies as detectors*. One can measure the distance between a trusted policy, such as the Intelligent Driver Model, a widely accepted approximation of human driving behaviour, and the learned policy. Three different methods of doing this are evaluated, using two measurements of effectiveness (AUROC and Max F-1), across several types of misspecification in various environments. Traffic-Mer refers to the merge-in traffic problem discussed above. 

<p align=center>
<img src="images/traffic3.png"  style="width:12cm"/></br>
<i>Figure 10: Baseline detector scores in a number of proxy gameable environments. Image credit Pan et al. (2022).</i>
</p>

# Conclusion

In this chapter, we discuss the problems of emergent behaviour. We provide several motivating examples, and offer some potential future work directions. We then discuss proxy gaming and the dangers of over optimizing even subtly incorrect reward functions. Finally we discuss one approach to detecting emergent proxy gaming.


# References
<p id=mnist>

Madry et al. (2019), Towards Deep Learning Models Resistant to Adversarial
Attacks, https://arxiv.org/abs/1706.06083

<p id=predictability_and_surprise> 

Ganguli et al. (2022), Predictability and Surprise in Large Generative Models, https://arxiv.org/abs/2202.07785

<p id=MMML> 

Hendrycks et al. (2020),Measuring Massive Multitask Language Understanding, https://arxiv.org/abs/2009.03300

<p id=vision_transformers> 

Caron et al. (2021), Emerging Properties in Self-Supervised Vision Transformers, https://arxiv.org/abs/2104.14294

<p id=open_ai_grokking>

Power et al. (2022), Grokking: Generalization Beyond Overfitting on Small Algorithmic Datasets, https://arxiv.org/abs/2201.02177

<p id=neelnanda>

Nanda et al. (2022), A Mechanistic Interpretability Analysis of Grokking,  https://www.alignmentforum.org/posts/N6WM6hs7RQMKDhYjB/

<p id=coinrun>

OpenAI (2018), Quantifying Generalization in Reinforcement Learning, https://openai.com/blog/quantifying-generalization-in-reinforcement-learning


<p id=krueger>

Krueger et al. (2020), Hidden Incentives for Auto-Induced Distributional Shift, https://arxiv.org/abs/2009.09153

<p id=open_ai_boat>

OpenAI (2016), Faulty Reward Functions in the Wild, https://openai.com/blog/faulty-reward-functions/

<p id=krueger2>

Skalse et al. (2022), Defining and Characterizing Reward Gaming, https://responsibledecisionmaking.github.io/assets/pdf/papers/27.pdf

<p id=pan>

Pan et al. (2022), The Effects of Reward Misspecification: Mapping and Mitigating Misaligned Models, https://arxiv.org/abs/2201.03544