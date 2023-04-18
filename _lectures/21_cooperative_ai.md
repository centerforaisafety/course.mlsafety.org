---
layout: lecture
title: Cooperative AI
youtube_id: ZUi-kP_X2K4
---
**Contributor(s): Bilal Chughtai**

Cooperative AI is an emerging research area even within safety. As such, this lecture focuses primarily on motivation and background concepts. These written notes go further, presenting promising future directions and representative examples of work in them.

# Motivation

Problems of cooperation — in which agents have opportunities to improve their joint utility, but are not easily able to do so — are ubiquitous and important. Mundane day to day examples include driving and meeting scheduling, but the need for cooperation scales all the way up to many of the *world's most pressing problems*. 

* Climate change is a problem where everyone contributes, but rational entities may not be incentivised to take action. Coordination is required so that everyone may equally share the burden of action.
* War is a problem where actors need to coordinate to prevent risks of escalation, which would result in a worse outcome for all parties. 
* Curtailing the spread of a deadly pandemic requires the coordination of every individual in a society.

Equally, cooperation is in no small part responsible for human civilization and the success of the human species. Some of our *greatest successes* can be attributed to cooperation
* Trade allowed society to progress past being solely agricultural, through allowing for highly specialised workers. This significantly increased economic productivity.
* Modern economies of scale require a high degree of cooperation between different industries in different nation states.
  
As our societies, economies, and militaries become ever more powerful and connected, the need for cooperation becomes greater. Advanced AI will only exacerbate existing cooperation problems through increasing power and interconnectedness of actors further. We've seen examples of AI induced cooperation failures already - the 2010 flash crash was a trillion dollar market crash caused by errors with artificial intelligence powered automated trading systems (though a consensus on the precise reasons has still not been reached).

<p align=center>
<img src="images/flash_crash.jpg" style="width:12cm"/></br><i>Figure 1: The 2010 Flash Crash. A 9.2% dip in the valuer of DOW as a result of automated trading system failure.</i>
</p>


Cooperative AI seeks to reverse these problems. It asks *how can we use advances in AI to help us solve cooperation problems?* Prior work in AI safety has focussed primarily on the single-single paradigm, in which a single human interacts with a single AI agent. This seems insufficient - it seems likely that in future we will need to foster cooperation between complex systems of humans, machines and institutions of both. Cooperative AI improves AI safety through reducing risks from cooperation failures. It encompasses both technical and governance work, and falls primarily under systemic safety. 

<p align=center>
<img src="images/system.png" style="width:12cm"/></br><i>Figure 2: Complex future institutions (boxes) of humans (H) and robots (R) cooperating (arrows). Image credit Lewis Hammond. </i>
</p>

# Mathematical Preliminaries

We first require a mathematical framework to think about cooperation. **Game theory** is the study of mathematical models of strategic interactions among rational agents, and can model a large range of possible cooperation problems.

**Definition:** A *game* is a triplet $\mathcal{G} = \left(I, (S_i)_{i\in I}, (h_i)_{i\in I}\right)$, where

1. $I$ is the set of players $I=\{1,...,n\}$.
2. For each $i\in I$, $S_i$ is player $i$'s set of strategies. Let $S=\prod_i S_i$.
3. For each $i\in I$, $h_i: S\rightarrow \mathbb{R}$ is a function mapping overall strategies to payoffs. One can decompose this into a function $g: S\rightarrow A$ from strategies to outcomes in some outcome space $A$, and then utiltity functions $u_i: A \rightarrow \mathbb{R}$ mapping outcomes to payoffs. Then $\forall s\in S$, $h_i(s) = u_i (g(s))$.

In words, a game defines a set of possible strategies and payoffs for each agent.

## Non Cooperative Games

**Example 1:** *The Prisoner's Dilemma*. Suppose two members of a criminal gang are arrested and imprisoned. Each prisoner is in solitary confinement with no means of speaking to or exchanging messages with the other. The police admit they don't have enough evidence to convict the pair on the principal charge. They plan to sentence both to a year in prison on a lesser charge. Simultaneously, the police offer each prisoner a Faustian bargain. The possible outcomes are:
* If A and B each betray the other, each of them serves two years in prison
* If A betrays B but B remains silent, A will be set free and B will serve three years in prison
* If A remains silent but B betrays A, A will serve three years in prison and B will be set free
* If A and B both remain silent, both of them will serve one year in prison (on the lesser charge).

These can be represented in a **payoff matrix**.

<p align=center>
<img src="images/prisoners_dilemma.png" id="fig:PD" style="width:12cm"/></br><i>Figure 3: Payoff matrix for the Prisoner's dilemma. </i>
</p>

We see betraying a partner offers greater reward than cooperating with them, so all purely rational self-interested prisoners will betray the other, despite mutual cooperation yielding a greater reward. 

**Definition:** A *Nash equilibrium* is a collection $(s_i)_{i\in I}$ of stategy profiles for each player, i.e. $s_i \in S_i$, such that no agent can benefit by unilaterally deviating.

That is, if Alice and Bob choose strategy $A$ and $B$ respectively, $(A, B)$ is a Nash equilibrium if and only if Alice has no other strategy available that does better than $A$ at maximizing her payoff in response to Bob choosing $B$, and Bob has no other strategy available that does better than $B$ at maximizing his payoff in response to Alice choosing $A$. In a game in which Carol and Dan are also players, $(A, B, C, D)$ is a Nash equilibrium if and only if A is Alice's best response to $(B, C, D)$, $B$ is Bob's best response to $(A, C, D)$, and so forth.

Given finite games, one can prove at least one Nash equilibrium always exists. These provide the most commonly used definition of a solution to a non cooperative game.

**Definition:** A *dominant strategy* is a strategy that is better than any other strategy for one player, no matter how that player's opponents may play. It follows that if a strictly dominant strategy exists for one player in a game, that player will play that strategy in each of the game's Nash equilibria.

**Example 1:** Betray is a dominant strategy in the Prisoner's dilemma betray for both players (as the game is *symmetric*), and so (betray, betray) is the Nash equilibrium. 

Let us consider one more example of a non-cooperative game

**Example 2:** *Stag Hunt*. In this game, there are two hunters. There are two rabbits and one stag in the hunting range. Before leaving to go hunt, each hunter can only take equipment that catches one type of animal. The stag has more meat than the two rabbits combined, but the hunters have to cooperate with each other to catch it, while the hunter that catches rabbits can catch all the rabbits. The payoff matrix is as follows:

<p align=center>
<img src="images/stag_hunt.png" style="width:12cm"/></br><i>Figure 4: Payoff matrix for Stag Hunt. </i>
</p>

Here, there is no dominant strategy, and both diagonal entries are Nash equilibria. If hunter A knows that hunter B is going to catch stag, then hunter A should also take equipment to catch the stag. If hunter A knows that hunter B is going to catch the rabbits, then that hunter should go to catch a rabbit too! Once again, self interested agents do not necessarily achieve the optimal outcome, so cooperation is important.

**Definition:** A game is said to be *zero-sum* if the total of gains and losses sum to zero, and thus one player benefits at the direct expense at others. 

**Examples:**
* College admissions. The number of recruited students is fixed, so if some student is successfully recruited, some other student is not.
* Chess, tennis, and generally any game where there is one loser and one winner are zero sum.

**Definition:** A game is said to be *positive-sum* if the total of gains and losses is greater than zero. Intuitively, this occurs when resources are somehow increased and there exist approaches, possibly requiring coordination, where desires and needs of all players are satisfied.

**Examples:**
* Trade of goods and services between businesses or nations brings mutually beneficial gains. Both parties benefit from the further specialisation.

**Definition:** The outcome of a game is *Pareto-efficient* or *Pareto-optimal* if no player's expected payoff $u_i$ can be increased without some other player's expected payoff $u_j$ decreasing. 

A natural measure of how cooperative some game outcome is is its distance to the *Pareto-frontier*, the set of Pareto-efficient solutions.

**Examples:**
* A zero-sum game has all outcomes being *Pareto-optimal*.
* For the prisoners dilemma, we see the mutually non cooperative outcome is far from the Pareto-frontier.

<p align=center>
<img src="images/pareto.png"  style="width:12cm"/></br><i>Figure 5: Pareto efficiency of the Prisoner's dilemma. Image credit Lewis Hammond. </i>
</p>

To define this distance, one needs some ordering on the space of outcomes. 

**Definition:** A *social welfare function* is a function that ranks outcomes as less desirable, more desirable, or indifferent for every possible pair of outcomes.

One way of defining this ordering is through a function $w: \mathbb{R}^n \rightarrow \mathbb{R}$ on the space of payoffs. Choosing $w(u_1,...,u_n)=\sum_i u_i$ gives the utilitarian welfare function, where all players are given equal intrinsic moral weight. 

## Other Problem Classes

**Definition:** A *collective action problem*, or *free rider problem*, is a problem where there is a cost for some player to contribute, but all others receive a benefit.

A model for certain types of collective action problem is as follows. Let $x_j\in\{0,1\}$ be the action of individual $j$, and assume $\beta\in (0,1)$. If 

$$u_j = -x_j + \beta \sum_i x_i$$

is the utility of individual $j$, we see $j$ acting reduces their utility, while increaing the utility of the collective. 

**Examples:**
* Carbon emissions. One is not incentivized to reduce their own emissions, but recieves benefit if others do so.

**Definition:** A *common pool resource problem* is one in which agents could deplete resources faster than they can be restored.

**Examples:**
* Overfishing. Any individual fisherman is incentivised to fish more to increase profits, though if everyone does this, the resource gets completely depleted, reducing everyone's profits in the long run.
  
# Cooperative Intelligence

The cooperative intelligence of an agent could be defined as its ability to achieve *high joint welfare* in a variety of environments with a *variety of agents*. We should first ask why cooperation problems in the context of AI are different to those in nature or in humans.

## Cooperative Intelligence in Nature

One can learn a lot through studying mechanisms facilitating cooperation in the natural world, and then apply these to AI. 

Observe that natural selection can *oppose* cooperation by default. Suppose initially there exists some group of cooperators. If there's variation among the individuals, someone with more defecting, or non cooperating dispositions may emerge. This individual may [free ride](#other-problem-classes) on the efforts of the collective, and obtain a comparative evolutionary advantage. Natural selection favours this evolutionary fitness, and so over time the group may become more defective. This raises the question, how does cooperation arise at all in nature? 

<p align=center>
<img src="images/natural_selection.png" style="width:12cm"/></br><i>Figure 6: Evolution may drive down cooperation. Image credit MA Nowak.  </i>
</p>

Nowak presents a theory called the "[Five Rules for the Evolution of Cooperation](#five_rules)". 
1. Kin selection operates when the donor and recipient of an altruistic act are genetic relatives. If the relatedness $r$ of individuals surpasses some cost/benefit then there can potentially be some kin selection. For example, a gazelle may make some loud noise to warn family members of a predator, even if this makes the predator more aware of it's location, as the evolutionary benefit of potentially saving its genetic kin may be greater.
2. Direct reciprocity requires repeated encounters between two individuals. This can be thought of as 'I scratch your back, you scratch mine.
3. Indirect reciprocity is based on reputation; a helpful individual is more likely to receive help.
4. Space selection/network reciprocity means clusters of cooperators out compete defectors. 
5. Group selection is the idea that competition is not only between individuals, but also between groups. Groups with a higher proportion of cooperative members may outcompete groups with a lower such proportion. For example, if one group has individuals more willing to go to war and fight, being less egoistic than the other group, they may win against the other group. Or, a group more willing to cooperate may outbreed the other and dominate without that way without genocide. 

<p align=center>
<img src="images/five_rules.jpg" id="fig:PD" style="width:12cm"/></br><i>Figure 7: Five rules for the evolution of cooperation. Image credit MA Nowak.  </i>
</p>

Another observation from nature is that micromotives need not necessarily match macrobehaviour. That is to say, groups of individuals behave as *complex systems*, and alignment of components does not guarantee alignment of the entire system. For instance, let's say agents have a preference for more than $1/3$ of their neighbours to belong to the same group, else move. Then this mild in-group preference gets exacerbated and the individuals become highly segregated.

<p align=center>
<img src="images/micromotives.gif" style="width:10cm"/></br><i>Figure 8: Schelling’s segregation model. Agents with a mild in-group preference end up segregated. </i>
</p>

Turning to humans in particular, we are endowed with a set of [dispositions](#dispositions) to cooperate.
* Disposition to initiate help for strangers
* Disposition to reciprocate
* Disposition to contribute to a shared effort without distinct expectation of return (indirect reciprocity)
* Some intrinsic reward from success at cooperation or collaboration, beyond the actual gain produced
* Some intrinsic interest in whether other have their goals met or are treated fairly
* Disposition to penalize those who are unfair or harmful, even at some expense to oneself

Cooperation can often increase expected utility. This may relate to morality. The 'morality-as-cooperation' theory asserts that "all of human morality is an attempt to solve a cooperative problem".

<p align=center>
<img src="images/morality.png" style="width:12cm"/></br><i>Figure 9: The morality-as-cooperation theory. </i>
</p>

## Cooperative Intelligence in AI 

AI agents do not possess the traits discussed above. They are not naturally endowed with human dispositions, nor with the biological features biological creatures use to cooperate. They however can be constructed to have certain non biological features that may aid cooperation. The key capabilities necessary for cooperation of AI agents can be grouped into four categories:

1. **Understanding** the world, behaviour and preferences of other agents, and dealing with recursive beliefs
2. **Communicating** effectively by establishing common ground, dealing with problems of bandwidth and latency, teaching others, and efficiently tackling games with mixed motives.
3. Forming **commitments** to overcome incentives to go back on a cooperative arrangement.
4. Creating trustworthy **institutions**, with good norms and reliable reputation systems.

Cooperative AI work encompasses a wide range of research. To give a flavour of the kinds of research in each subfield, we present a representative paper for each.

## Understanding

Previous progress in coordination in zero-sum games has focused on agents competing against themselves through self-play. Examples include [OpenAI's Five](#open_ai_five), or [DeepMind's AlphaGo](#alphago) and successors. Are these systems really learning to coordinate? They fail to coordinate with other players beside themselves, are hyper specialist, and require immense amounts of data to train. Even when they are coordinating, it [has been shown](#learning_about_humans) agents are often substantially worse at coordinating with humans than with other near optimal agents. By contrast, even human babies can infer intentions of others incredibly quickly in very general settings.

An integral part of human cooperation is our 'theory of mind' (ToM), that allows us to infer and understand intentions of others. How can we teach this to an AI? The paper [Too Many Cooks: Coordinating Multi-Agent Collaboration Through Inverse Planning](#too_many_cooks), develops bayesian delegation as a way of doing so. 

Bayesian delegation enables agents to infer the hidden intentions of others by inverse planning. Agents may then flexibly decide in the absence of direct communication when to cooperate on the same sub task, and when to work on different sub tasks in parallel. To suceed, agents must coordinate both high level plans (which sub taks to work on), and low level actions (eg avoiding collisions). 

This is shown to work experimentally in an 'Overcooked' inspired gridworld, where two agents are cooperating to create some recipe within some time limit.


<p align=center>
<img src="images/toomanycooks.png" style="width:12cm"/></br><i>Figure 10: Experimental setup in the 'Too Many Cooks' paper. Two RL agents coordinate in the left environment coordinate to chop and prepare lettuce and tomato in parallel. </i>
</p>




## Communicating
AI has been used for a number of years already to facilitate human-human communication. Machine translation is the most prominent example. Removing barriers to communication may lead to increased international trade, higher productivity and a more borderless world. Other examples include text-to-speech and speech-to-text assistive technologies. Human-machine communication has also been studied in the context of of inputting human preferences into AI systems through comparison, demonstration, correction, language, proxy rewards and direct rewards.

In comparison machine-machine communication is fairly neglected. Software systems today communicate through hard-coded channels and fixed protocols, allowing only for domain specific cooperation. It is a challenging problem to find common ground between unrelated AI agents with potentially very different internal representations. One also wants these communication channels to be human interpretable or at least verifiable, to reduce risks of collusion.

[Sukhbaatar et al. (2016)](#comms_paper) demonstrate it is possible for a group of agents to learn both a policy and continuous communication protocol in tandem if trained simultaneously via backpropogation. This model is simple enough such that it can combined with standard single agent RL algorithms or supervised learning, and demonstrates promising results on a handful of simple games. 



## Commitments

One way in which humans fail to reach efficient outcomes is through a failure of trust. Computers offer promising tools that may allow AI to make verifiable credible commitments to each other and completely overcome this problem. 

Note computer programs have a dual use:
1. A computer program can serve as a set of instructions.
2. A computer program can serve as a file, to be read and compared to, by itself or by other programs.
   
This leads us to the idea of *open source game theory*.

Consider the prisoners dilemma. Suppose instead of actions, AI agents instead submit programs returning cooperate or defect.

<p align=center>
<img src="images/committment.png" style="width:12cm"/></br><i>Figure 11: A verifiable program solution to the Prisoners dilemma. </i>
</p>

Then (my_program, my_program) determines a [*program equilibrium*](#program_equilibrium) which is irrational to deviate from. Note this is a Nash equilibrium in the game where players choose programs, but not in the original game. 



## Institutions

Institutions are proven ways by which human society has becomes more cooperative. Norms, laws, and other governance structures are critical to the functioning of modern civilization. Can AI help us create more rational and better functioning institutions for humans?

<p align=center>
<img src="images/economist1.png" style="width:12cm"/></br><i>Figure 12: The AI economist world. RL agents collect resources to build houses.</i>
</p>

[The AI Economist](#ai_economist) investigates whether in principle an AI can learn a taxation policy that most effectively trades off between productivity and equality. RL agents are spawned in a gather-and-build gridworld, who move around, collect resources such as wood and stone, and build houses to gain coins. Mechanisms for trade allow the agents to exchange resources for coin. Agents are initialised with random skill levels for the various tasks they can complete, with each task also carrying a labour cost. These agents optimise to maximise coin and minimise labour. 

A second type of agent, the 'social planner', is simultaneously training to optimize tax and redistribution policy to improve social outcomes. In general, high taxation reduces productivity as productive workers are disincentivised to work due to added labour costs for reduced economic benefit, while low taxation raises inequality.

<p align=center>
<img src="images/economist2.png" style="width:12cm"/></br><i>Figure 13: The equality-productivty trade off and wealth distribution in the AI economist model under different tax and redistribution policy. </i>
</p>

The Pareto boundary defines the set of maximal trade-offs. Figure 13 shows the AI economist's policy is closer to the pareto boundary than other tax policies from the economic literature. On the right, we see taxes impact productivity (total income, represented by the area of the big squares), and equality (the relative difference in sizes of the smaller squares). The AI Economist achieves the best trade-off (measured in equality times productivity).

# Potential Downsides

As with any technological advance, progress in cooperative AI may be dual to elevating certain risks. Downsides with cooperative AI fall into three broad categories.
1. Cooperative competence itself can cause harms, such as by harming those excluded from the collaborative set and undermining pro-social forms of competition (i.e. **collusion**)
2. Advances in cooperative capabilities may, as a byproduct, **improve coercive capabilities** (e.g., deception).
3.  Successful cooperation often depends on coercion (e.g., pro-social punishment) and competition (e.g., rivalry as an impetus for improvement), making it hard to pull these apart.

Concrete examples include
* Forming credible commitments could be used to make *threats*.
* Reaching mutually beneficial bargaining solutions could lead to *collusion*.
* Forming alliances could be used to create larger factions, and thus greater risks of *conflict*.
 
Care should therefore be taken for advances to lead to *differential progress* on cooperation. This is a special case of minimising capabilities externalities, see the lecture on Safety-Capabilities balance for more on this.

# Conclusion

In this chapter, we discuss the two fold importance of Cooperative AI. It improves AI safety through reducing risks of cooperation failures between humans and future AI systems. It also has the potential to improve systemic safety through helping us solve already existant cooperation failures. We give a brief introduction to game theory, a mathematical framework in which cooperation can be investigated. We discuss cooperative intelligence in nature, and its applications to AI. We discuss several valuable prior contributions to cooperative AI, and finally some potential downsides and ways in which cooperative AI could backfire. We see cooperative AI is a fairly broad and multidisciplinary field.


# References
Dafoe et al. (2020), Open Problems in Cooperative AI, https://arxiv.org/abs/2012.08630

<p id="five_rules">

Nowak (2006), Five Rules for the Evolution of Cooperation, https://www.science.org/doi/abs/10.1126/science.1133755

<p id=dispositions>

Railton (2022), Ethics and Artificial Intelligence, https://www.practicalethics.ox.ac.uk/uehiro-lectures-2022

<p id=open_ai_five> 

OpenAI (2018), OpenAI Five, https://openai.com/blog/openai-five/

<p id=alphago>

DeepMind (2016), AlphaGo, https://www.deepmind.com/research/highlighted-research/alphago

<p id=learning_about_humans>

Caroll et al. (2019), On the Utility of Learning about Humans
for Human-AI Coordination, https://arxiv.org/abs/1910.05789

<p id=too_many_cooks>

Wang et al. (2020), Too many cooks: Bayesian inference for coordinating multi-agent collaboration, https://arxiv.org/abs/2003.11778

<p id=comms_paper>

Sukhbaatar et al. (2016), Learning Multiagent Communication with Backpropagation, https://arxiv.org/abs/1605.07736

<p id=program_equilibrium>

Tennenholtz (2004), Program Equilibrium, https://iew.technion.ac.il/~moshet/progeqnote4.pdf

<p id=ai_economist>

Zheng et al. (2020), The AI Economist:
Improving Equality and Productivity with AI-Driven Tax
Policies, https://arxiv.org/abs/2108.02755