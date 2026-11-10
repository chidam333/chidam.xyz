While i was testing the accuracy of different decision models for an internal eval, i found out some interesting pricing quirks on how they are calculated. 

My assumption for pricing was that they would follow input pricing differential - Luna is 2.4 times costlier than jev, so the final cost for a request would be 2.4 times to that of jev.

Here is the price of these models during the time of writing (Nov 2026), per 1M input tokens. None of them charge for output tokens.

 - Jev (TypeSafe, jev-latest): **$0.042**
 - Luna (OpenAI Decisions API, openai/gpt-6-luna-decisions): **$0.10**
 - Perplexity Decider Flash v1.2 (perplexity/pplx-decider-flash-v1.2): **$0.01**
 - Clef Flash (Cloudflare, cloudflare/clef-flash): **$0.038**[^clef-price]
 - Parallel Decisions Fast (parallel/decisions-fast): **$0** 

 Going by input price alone, Luna should cost about 2.4x Jev and 10x Perplexity on any request. 

I replayed same request with jev and luna and interestingly there was a considerable difference in input tokens. Input tokens scaled linearly but slope was steep for luna. For requests with few questions luna would cost 2x that of jev, but for requests with many questions it would cost 20x

![[Pasted image 20261110173657.png]]

Request payload (input) consists of 3 variables :
- State
- Question
- Number of questions

So we can conduct few experiments to check where the slope is coming from by isolating the variables. Took a base call and then :  
- Just changed the State size 
- Just changed the Question size
- Just added an extra question


Here is a demonstrative example when we just change the question size
Inputs:

![[Pasted image 20261110182700.png]]


Output:

![[Pasted image 20261110182740.png]]

200 -> status code
1 & 0.98 -> ans (as expected)
**44 & 51 -> used a standard gpt tokenizer** 
**192 & 199 -> input tokens** 

Focus on how **148 tokens are fixed**, these are added by the provider by default. They are split between question and state. We will be finding the exact figures in a jiffy. Luna has a cost of 0.1$ for a million tokens so the cost lines up and there is no deviation in per token cost.

We will do one more experiment to find the exact fixed tokens, in first request we send a simple state + one question, in second request we keep those 2 components but an extra question

Input:

![[Pasted image 20261110195839.png]]

Output:

![[Pasted image 20261110195904.png]]

200 -> status code
1 & (1 & 0.75) -> ans 
**44 & 48 -> used a standard gpt tokenizer, extra question adds 4 tokens** 
**192 & 340 -> input tokens** 

Focus on how **fixed tokens increased to 292**, so we can deduce that each question has a fixed token of **340-192-4=144**, also fixed token for the whole request is **192-44-144=4**

Changing just the state size adds exactly the state's own tokens (2,520 more state tokens → 2,520 more input tokens), so the state has no hidden tokens of its own beyond the 4 per request.

The math I showed you is for human convenience, i asked ai to write a better and a more structured way to test and find all the variables 

Luna: `N = 4 + S + 144·Q + T`
Jev :  `N = 250 + S + 8·Q + T`

S -> Total tokens for state
Q -> Number of questions
T -> Total tokens for all the questions
N -> Input tokens

These variables will be used in future :
C -> 4 and 250  (fixed constant for each request)
H -> 144 and 8 (fixed constant for each question)


C+S+T = K -> form a near constant base for all models, sure 250 is higher than 4 but in any serious question with big enough dataset it will not matter, so the formula can be simplified to N = K + H.Q

H stands for **hidden tokens per question** is the main thing which matters and here are the H for some famous models

|   Model    |   H   |
| :--------: | :---: |
|    Luna    |  144  |
|    Jev     |   8   |
|    Clef    |  79[^clef-limit]   |
| Perplexity |  25   |
|  Parallel  | 45-50[^parallel-h] |

![[Pasted image 20261110205722.png]]
\* The per-question numbers in the chart include each question's own 9 tokens; subtract 9 to get H.

This chart helps us bring back some focus to C (fixed token for every request), as you can see parallel's free api has a massive initial fixed cost.

|   Model    |   C   |
| :--------: | :---: |
|    Luna    |   4   |
|    Jev     |  250  |
|    Clef    |  34   |
| Perplexity |  34   |
|  Parallel  | ~3000 |

The above graphs have input tokens in y axis, when we bring in the fact that luna is per token 2.4x costlier than jev, it really makes things look way worse

![[Pasted image 20261110214257.png]]

For my peace of mind, i tested the same on openai's api and the result stayed the same. 

I also created a small artifact to play around with [pricing numbers](https://decision-model-pricing.chidam.xyz)

The code used for these experiments is on [GitHub](https://github.com/chidam333/decision-model-pricing)

[^clef-price]: Clef's listed price is $0.038 per 1M tokens, but many requests were charged about half ($0.019), including the ones in the cost chart, so Clef's line there is at the lower price.
[^clef-limit]: Clef accepts at most 64 questions per request, and about 1 call in 6 failed with an intermittent `400 This model does not support /v1/decisions` error; identical requests worked at other times.
[^parallel-h]: Parallel's token counts don't follow a clean formula: it adds web search results that vary from request to request, so 45-50 is a rough fit.

