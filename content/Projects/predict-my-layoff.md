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

**Predict My Layoff** is the most "product-brain" project in Shravan's portfolio. It is designed to go viral — a career risk scanner that tells you how likely your company is to have layoffs. The kind of tool people share on LinkedIn because the output is personally relevant and slightly scary. Where [[prabhupada-ai]] reveals the devotee and [[builders-bible]] reveals the teacher, this project reveals the PM who understands distribution and human psychology.

## Details

### What It Does

Users enter their company name, and a **log-odds scoring model** evaluates layoff risk across more than 1,800 companies. The results are immediately shareable on LinkedIn — that shareability is the core viral mechanic. The output format is deliberately designed for screenshots: clean, quotable, and alarming enough that people feel compelled to pass it along. Version 3 is deployed at **predict-my-layoff.vercel.app**.

### Technical Architecture

The app is built on **Next.js 16** with **Supabase** and the **Vercel AI Gateway**. It shares its Supabase instance with [[rethink-dashboard]] -- same project, separate tables -- a pragmatic architectural decision that keeps infrastructure costs low while maintaining clean data boundaries.

The scoring engine uses a **three-layer model**: company risk at 55%, individual vulnerability at 30%, and industry climate at 15%. Scores are fused post-sigmoid rather than in log-odds space, preventing any single layer from dominating the output. A **timeline prediction engine** was added to answer not just "if" but "when" -- deterministic log-odds predicting layoff timing across four buckets (0-3 months, 3-6, 6-12, 12+). The timeline proved to be the highest-perceived-value feature: "when, not just if" is a far stronger pitch.

The scan flow is **asynchronous by design**. Scoring returns in under 500 milliseconds. Claude narrative generation happens in the background via Next.js `after()`, and the client polls for completion. This was a deliberate architectural decision -- blocking 3-5 seconds for the AI narrative killed the feeling of instant feedback.

### The Data Pipeline

The company database grew from 22 hand-curated entries to **1,640 companies** (734 US, 523 India, 380 global) through a Karpathy-inspired autoresearch pipeline. The key data source was layoffs.fyi, which required a two-step cookie authentication flow through its Airtable embed (not a simple API call -- the REST API returns 401). The embed view caps at 1,500 rows, but that single source yielded 1,262 unique companies. India's dataset was mostly manual research since no WARN Act equivalent exists there; IT services giants, unicorns, and documented shutdowns were hand-verified to reach 523 entries.

The pipeline follows an **autoresearch pattern**: a living document (`autoresearch.md`), a metrics script, a validation checks script, and an ideas backlog. Scripts run offline -- scrape, normalize, merge-dedupe, generate TypeScript -- with zero runtime changes required. Hand-curated overrides for the original 20 companies are immutable; the pipeline appends after them.

### Personalization and Virality

A **Company Risk Index** pre-computes scores for all 1,800+ companies with a neutral profile at build time, stored as sorted arrays for instant percentile lookups via binary search. The **Percentile Engine** computes personalized context including overall, company, and industry percentiles, department rankings, and top factor identification. Four hook types drive LinkedIn sharing based on score range: fear (70+), debate (45-69), solidarity (25-44), and brag (under 25). Each generates different pre-written LinkedIn text optimized for that engagement pattern. The "debate" hook for moderate risk may be the most viral -- it includes both a scary statistic (company ranking) and a reassuring one (department safety), which triggers discussion.

The methodology page was redesigned to replace raw weight numbers with colored pill labels and credit score analogies. The 78% accuracy statistic -- the most persuasive claim on the entire page -- had been buried at line 700 where nobody would see it. Moving it to position two (the Trust Bar) was the single highest-leverage change to the landing page.

### Growth Mechanics

LinkedIn sharing is the primary distribution channel, and every design decision reinforces that loop. The **autoresearch loop** was used to iteratively improve both the landing and results pages across four iterations, making every element understandable by non-technical users. The methodology page deliberately publishes all scoring weights transparently -- the formula IS the viral content, because transparency builds trust and generates LinkedIn discussion. Sample scores on the landing page are Server Components computed at build time, so they are always accurate and re-computed with each deploy.

## Impact

This project shows a different side of Shravan — the PM who understands distribution and virality. Not every project needs spiritual depth; some need to be sharp, timely, and shareable. Predict My Layoff is proof that he can build for growth when the moment calls for it.

## Related
- [[shravan-tickoo]]
- [[design-philosophy]]
- [[building-philosophy]]
- [[subagent-driven-development]]
- [[rethink-dashboard]]
- [[claude-code-as-cto]]
