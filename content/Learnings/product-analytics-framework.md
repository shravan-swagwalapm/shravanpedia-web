---
title: "Product Analytics Framework"
category: Learnings
created: 2026-04-09
updated: 2026-04-09
source: "MPM Cohort transcripts, Weeks 5-8; MPM session notes PDFs Weeks 5-6"
tags: [analytics, metrics, experimentation, ab-testing, product-market-fit, activation]
visibility: public
---

> Analytics is the craft of understanding whether the expected behavior of the user at scale is what was hypothesized by the product manager.

## Context

Shravan dedicates two full sessions in the MPM cohort (Week 5, Sessions 1 and 2) to product analytics, treating it not as a tool-level skill but as a foundational way of thinking about products. His definition departs from the standard "making sense of numbers" framing that most PM courses teach. For him, analytics is about the gap between intended action and true action -- and the relentless experimentation required to close that gap. This connects directly to his broader conviction that product management is about systems, not features.

## Details

The analytics framework Shravan teaches begins with a first-principles definition. He draws a system diagram: data flows into a product from multiple sources, the product has an in-memory compute layer (what you are processing right now) and a deep compute layer (what you store for later pattern recognition). Analytics is the processing layer that tells you whether your hypothesis about user behavior actually matches reality. He uses an analogy to human memory -- your brain has short-term working memory and long-term recall, and a product's analytics system mirrors this architecture.

From this foundation, he builds toward the concept of intended action versus true action. When a product manager hypothesizes that users will behave a certain way and the actual behavior diverges, the gap between those two states is what drives experimentation. Each experiment is a new hypothesis designed to narrow that gap. When the intended action and the true action converge at scale, that state is product-market fit. This is an elegant reframing that avoids the usual abstract definitions of PMF and grounds it in something measurable and iterative.

Shravan is emphatic that activation is discovered, not hypothesized. He teaches this through the famous Facebook example -- "7 friends in 10 days" was not a number someone guessed at in a planning meeting. It was discovered through data analysis that showed this specific threshold predicted long-term retention. The same principle applies everywhere: activation points are not static, they shift as markets change, competitors enter, and user expectations evolve. A product manager's job is to keep rediscovering where activation truly happens.

On metrics specifically, Shravan teaches three categories of analytics: product analytics (what users do after entering the product -- tools like Mixpanel, Amplitude, MoEngage), marketing analytics (characterizing incoming traffic by geography, device, demographics -- tools like Google Analytics, HubSpot, Adobe Omniture), and business analytics (churn, retention, revenue, contribution margins -- tools like Tableau, Power BI, Looker, Metabase). He is clear that the tools are not the point; understanding the user journey and knowing what to measure at each stage is what matters.

His teaching on A/B testing goes deeper than the standard control-versus-test explanation. He uses a form-field example to illustrate a counterintuitive point: a form with fewer fields (removing salary and location) will get more submissions, but that does not necessarily mean better business outcomes. The form with more fields may yield fewer but higher-intent leads whose conversion rate is dramatically better. The lesson is that A/B testing must be evaluated against the right business outcome, not just the surface metric. He also teaches that A/B testing is not limited to the frontend -- it can and should be done algorithmically on the backend, testing different recommendation engines, ranking algorithms, and personalization strategies.

Perhaps the most distinctive element is his insistence that every business can be expressed as a mathematical equation. In Week 5 Session 2, he walks through how the product layer has a parallel mathematical journey: customer acquisition cost leads to activation metrics, which lead to retention rates, which feed into lifetime value calculations. He works through a detailed CarDekho LTV example in the QnA session, showing how to trace a car buyer's lifetime value through purchase commission, annual servicing fees, and eventual resale -- making the abstract concept of LTV concrete and industry-specific.

His teaching on retention rate as the single most important indicator of product-market fit is paired with the concept of area under the curve. The terminal retention rate tells you how sticky the product is, but the area under the retention curve tells you the total value a cohort delivers to the business. Different cohorts can have different terminal rates but dramatically different total value depending on the shape of their curves.

He also introduces Fermi estimation as a critical PM skill, teaching students that in any estimate with ten variables, only two or three have meaningful correlation to the final number. He challenges students live: "What is the population of Bangalore?" Most guess wrong. His point: if your foundational assumptions are off, no amount of analytical sophistication will save you.

### Business Equations and Financial Literacy

The Week 5 session notes reveal a substantial teaching block on business equations that the existing wiki did not capture. Shravan frames every startup as "a mathematical equation trying to maximize user happiness" and introduces the happiness function: Maximize f(x) = a1x1 + a2x2 + ... + anxn, where each ai represents a company's internal strength in a domain (marketing, product, engineering) and each xi represents that domain's effort or input. The result is the perceived value or "happiness score" for the end user. If the score exceeds the user's internal happiness benchmark, they stay. This mathematical framing connects product thinking directly to optimization theory.

He then walks through the core business equations every PM must know: the basic business equation (Revenue minus Cost equals Profit), the internet business revenue formula (number of users times average revenue per user), the cash flow calculation (Revenue minus COGS minus Operating Expenses), and EBITDA as the metric that captures all operating and non-operating costs except taxes. He distinguishes between COGS (cost to deliver the product — hosting, delivery, creator costs), operating expenses (marketing, tools, salaries, customer support), non-operating expenses (rent, equipment), and R&D cost (salaries of product, engineering, and design teams — investments in future value, not expenses). The practical lesson: salary is an R&D cost when hiring for long-term capacity building, but an operating expense when hiring operations or support staff. Smart founders track R&D as a percentage of revenue — if it is too high with no progress, the company is burning.

He also introduces VC investor types and what each looks for: seed-stage investors evaluate founder credibility, the idea, and founder-market fit; growth-stage investors evaluate operating profitability and the roadmap; late-stage investors evaluate profits, EBITDA, ARPU, and LTV/CAC. The teaching that "VCs love founders who are operationally profitable, even if net profitability is yet to come" gives students a lens for understanding how financial metrics connect to fundraising strategy.

### A/B Testing as Rigorous Experimentation

The Week 6 session notes add substantial depth to the experimentation teaching. Shravan draws a sharp distinction: A/B testing is not limited to visual design changes — it applies equally to backend logic, business flows, and recommendation engines. The Uber pre-payment case study illustrates this: Uber's shift from post-ride to pre-ride payment changed nothing visually but fundamentally altered backend behavior and the user journey, and was itself an A/B test that saved the company real money despite worsening UX.

He teaches the mechanics with precision. A good A/B test requires a clearly defined traffic source (you must isolate to a known, consistent traffic stream), a control versus variant structure, and a metric that is quantifiable, directional, and business-impacting. Good metrics have a numerator and denominator — percentage of form completions, average cart value, bounce rate. Bad metrics are vague aspirations like "improve UX" or "get more interest." Statistical significance is taught with specific thresholds: the p-value must be below 0.05 (a five percent or lower probability that the result occurred by chance), sample size must be sufficient for valid conclusions, and test duration depends on how fast you can reach that sample size.

He introduces the traffic allocation tradeoff: one to five percent of traffic is low risk but takes longer to reach significance; ten to twenty percent is balanced; fifty percent is fast but high risk if the variant is bad. The right choice depends on the stage of the company (startups can afford fifty-fifty splits for speed), how critical the flow is, and how fast answers are needed. He distinguishes A/B testing from split testing — A/B tests use the same URL with different logic, while split tests direct traffic to completely separate URLs — and from multivariate testing, which changes multiple elements simultaneously and tracks all permutations but requires dramatically more traffic to reach significance.

Netflix and Amazon serve as case studies: Netflix tested "Top 10 in your country" versus "All-time popular" carousels against session time increase, using twenty percent of Philippines traffic. Amazon tested testimonials in the first fold versus the third fold against checkout conversion rate. These examples reinforce that experimentation at scale is a culture, not a technique — Amazon and Netflix run thousands of tests in parallel and use chaos engineering (simulating server crashes, tenfold load increases, recommendation engine failures) to build resilience alongside feature optimization.

## Impact

This analytics framework has become the intellectual spine of the MPM cohort. By reframing analytics as the discipline of closing the gap between intended and true user behavior, Shravan gives students a mental model that applies regardless of the tool, the industry, or the product stage. The activation-is-discovered principle is particularly powerful because it combats the common PM mistake of designing metrics in a conference room rather than finding them in the data. His emphasis on the mathematical equation behind every business connects analytics to the financial literacy that separates senior PMs from junior ones.

## Related
- [[product-management-philosophy]]
- [[systems-thinking]]
- [[growth-loops-and-defensible-growth]]
- [[rethink-systems]]
