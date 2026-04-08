---
title: "Predict My Layoff"
category: Projects
created: 2026-04-08
updated: 2026-04-09
source: "vault project files, predict-my-layoff.vercel.app, session journals (6 sessions, March-April 2026)"
tags: [project, product, viral, career]
visibility: public
---

> Career Risk Scanner — log-odds scoring over 1,800+ companies with viral LinkedIn sharing.

## Context

**Predict My Layoff** is the most "product-brain" project in Shravan's portfolio — the one that reveals the PM who understands distribution, human psychology, and the art of building something people cannot help but share. It is designed to go viral: a career risk scanner that tells you how likely your company is to have layoffs. The kind of tool people share on LinkedIn because the output is personally relevant and slightly terrifying. Where [[prabhupada-ai]] reveals the devotee and [[builders-bible]] reveals the teacher, this project reveals the PM who knows that the best distribution is the product itself.

The timing was deliberate. Between 2024 and 2026, over 200,000 tech workers were laid off across Amazon, Google, Microsoft, IBM, Oracle, and hundreds of other companies. The layoffs were not because people performed poorly — they were structural, driven by companies racing to automate with AI. Shravan saw an opportunity to do something genuinely useful: give individuals the data and analysis they needed to assess their own risk, in a format that was transparent, shareable, and actionable. The project is product thinking applied to career self-defense.

## Details

### What It Does

Users enter their company name, and a **log-odds scoring model** evaluates layoff risk across more than 1,800 companies. The results are immediately shareable on LinkedIn — that shareability is the core viral mechanic. The output format is deliberately designed for screenshots: clean, quotable, and alarming enough that people feel compelled to pass it along. A score of 73 next to a well-known company name is the kind of content that stops a LinkedIn scroll. Version 3 is deployed at **predict-my-layoff.vercel.app**.

But the product goes deeper than a single score. The timeline prediction engine answers not just "if" but "when" — deterministic log-odds predicting layoff timing across four buckets (0-3 months, 3-6, 6-12, 12+). The Company Risk Index provides context by ranking the user's company against all 1,800+ in the database. And the personalized analysis factors in individual vulnerability — role, department, tenure, and seniority — to produce a risk assessment that feels personal rather than generic. The timeline feature proved to be the highest-perceived-value component: "when, not just if" is a far stronger pitch than a number alone.

### Technical Architecture

The app is built on **Next.js 16** with **Supabase** and the **Vercel AI Gateway**. It shares its Supabase instance with [[rethink-dashboard]] — same project, separate tables — a pragmatic architectural decision that keeps infrastructure costs low while maintaining clean data boundaries. This pattern exemplifies the [[building-philosophy]] principle of shared infrastructure across projects: one Supabase instance serves two completely different products without either contaminating the other.

The scoring engine uses a **three-layer model**: company risk at 55%, individual vulnerability at 30%, and industry climate at 15%. Scores are fused post-sigmoid rather than in log-odds space, preventing any single layer from dominating the output. This is a critical technical decision — in log-odds space, a single extreme signal can pull the entire score to its pole, producing nonsensical results. Post-sigmoid fusion keeps every score in a meaningful range regardless of individual layer extremes.

The scan flow is **asynchronous by design**. Scoring returns in under 500 milliseconds, giving the user an instant result. Claude narrative generation — the personalized analysis text that explains what the score means and what the user should do about it — happens in the background via Next.js `after()`, and the client polls for completion. This was a deliberate architectural decision born from user testing: blocking 3-5 seconds for the AI narrative killed the feeling of instant feedback. Users who waited three seconds for their score felt anxious. Users who saw a score instantly and then watched a narrative appear felt informed. The same information, delivered differently, produced a dramatically different emotional response.

### The Data Pipeline

The company database grew from 22 hand-curated entries to **1,640 companies** (734 US, 523 India, 380 global) through a Karpathy-inspired autoresearch pipeline — a methodology for systematically expanding a dataset through living documents, validation scripts, and iterative research. The key data source was layoffs.fyi, which required a two-step cookie authentication flow through its Airtable embed (not a simple API call — the REST API returns 401). The embed view caps at 1,500 rows, but that single source yielded 1,262 unique companies with verified layoff data.

India's dataset required a different approach entirely, since no WARN Act equivalent exists there — no public database of layoffs, no required disclosure. IT services giants, unicorns, and documented shutdowns were hand-verified through news searches, LinkedIn announcements, and industry sources to reach 523 entries. The effort reflects a conviction that the product should serve the Indian tech community as well as the American one, even when the data infrastructure is harder to work with.

The pipeline follows an **autoresearch pattern**: a living document (`autoresearch.md`) that evolves with each research session, a metrics script that quantifies coverage and data quality, a validation checks script that catches inconsistencies before they reach production, and an ideas backlog for future improvements. Scripts run offline — scrape, normalize, merge-dedupe, generate TypeScript — with zero runtime changes required. Hand-curated overrides for the original 20 companies are immutable; the pipeline appends after them, ensuring that the most carefully verified data is never overwritten by automated processes.

### Personalization and Virality

The viral mechanics of Predict My Layoff are not an afterthought bolted onto a utility tool — they are the product architecture. Every design decision optimizes for the moment when a user sees their score and thinks "I need to share this."

A **Company Risk Index** pre-computes scores for all 1,800+ companies with a neutral profile at build time, stored as sorted arrays for instant percentile lookups via binary search. The **Percentile Engine** computes personalized context including overall, company, and industry percentiles, department rankings, and top factor identification. These contextual layers transform a single number into a story: "Your company ranks in the 89th percentile for layoff risk among SaaS companies, and your engineering department is the highest-risk division."

Four hook types drive LinkedIn sharing based on score range: **fear** (70+) — the most direct emotional trigger, producing share text that sounds an alarm; **debate** (45-69) — moderate risk that includes both a scary statistic and a reassuring one, triggering discussion rather than panic; **solidarity** (25-44) — shared anxiety that connects people in similar situations; and **brag** (under 25) — the relief of a low score that people share to feel good and to subtly signal the strength of their company. The "debate" hook for moderate risk may be the most viral of all — it gives people something to argue about, and arguments drive engagement.

The methodology page was redesigned to replace raw weight numbers with colored pill labels and credit score analogies — transforming technical transparency into something a non-technical user finds both understandable and shareable. The 78% accuracy statistic — the most persuasive claim on the entire page — had been buried at line 700 where nobody would see it. Moving it to position two (the Trust Bar) was the single highest-leverage change to the landing page. This is the kind of insight that comes from product thinking, not engineering thinking — the data was always there, but it was in the wrong place to do its job.

### Growth Mechanics

LinkedIn sharing is the primary distribution channel, and every design decision reinforces that loop. The **autoresearch loop** was used to iteratively improve both the landing and results pages across four iterations, making every element understandable by non-technical users — because the person who shares a Predict My Layoff result on LinkedIn is sharing it with an audience that includes HR managers, CEOs, and people who have never heard of log-odds scoring.

The methodology page deliberately publishes all scoring weights transparently — the formula IS the viral content, because transparency builds trust and generates LinkedIn discussion. When someone questions the methodology, the conversation drives more people to the tool, who then run their own scores, which generates more sharing. The objection itself is a growth mechanism.

Sample scores on the landing page are Server Components computed at build time, so they are always accurate and re-computed with each deploy. This eliminates the embarrassment of showing a sample score that contradicts the user's actual result — a credibility killer that Shravan identified as a high-priority risk during the landing page redesign.

## Impact

This project shows a different side of Shravan — the PM who understands distribution and virality at a deep, structural level. Not every project needs spiritual depth; some need to be sharp, timely, and shareable. Predict My Layoff is proof that he can build for growth when the moment calls for it — and that the product instinct he teaches in the MPM cohort is not theoretical but battle-tested. The four-hook emotional model, the asynchronous architecture that preserves the feeling of speed, the autoresearch data pipeline, the methodology-as-content transparency play — these are the moves of a PM who has internalized that distribution is not something you add after building. It is something you build into the architecture from the first line of code.

## Related
- [[shravan-tickoo]]
- [[design-philosophy]]
- [[building-philosophy]]
- [[subagent-driven-development]]
- [[rethink-dashboard]]
- [[claude-code-as-cto]]
- [[content-flywheel]]
