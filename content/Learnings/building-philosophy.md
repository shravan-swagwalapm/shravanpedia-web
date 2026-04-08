---
title: "Building Philosophy"
category: Learnings
created: 2026-04-08
updated: 2026-04-09
source: "CLAUDE.md, Engineering-Principles.md, session patterns, session journals (cross-project patterns)"
tags: [engineering, philosophy, principles, building]
visibility: public
---

> Do less. Verify more. Ship what matters. Prove it works.

## Context

Shravan has developed a precise philosophy about how to build software, especially as a PM-turned-builder who ships production code using AI tools. It is not the Silicon Valley orthodoxy of moving fast and breaking things. It is closer to the opposite: move deliberately, ship things that work, and never confuse motion with progress.

## Details

### Core Principles

The foundation rests on three gates that govern every action. First, **do, then report** -- never narrate intent, never announce what you are about to do, just do the work and show the result. Second, **only what was asked** -- no bonus features, no "while I'm here" refactors, no scope creep disguised as initiative. Third, **prove it** -- nothing is done until there is evidence: output, a file at a specific line, a passing test, or a screenshot. These three gates are not aspirational values pinned to a wall. They are enforced in every Claude Code session, every commit, every review.

Underneath these gates sits a deeper conviction: **do less, verify more**. The instinct when building with AI is to optimize, to add, to polish. Shravan deliberately resists that instinct. Verification before shipping is the discipline that makes speed sustainable rather than reckless.

### Engineering Triggers

The building philosophy encodes specific behavioral triggers for common situations. When a task requires three or more steps, switch to plan mode with verifiable subtasks -- not vague phases, but concrete checkpoints. When an approach breaks, stop and re-plan entirely; never retry the same thing twice. When something is unclear, ask exactly one question before writing a single line of code. Before editing any file, read it first -- understand before changing. When a test fails, read the full error output rather than guessing at the fix. When three or more duplicates appear, extract them. When a file exceeds 500 lines, decompose it.

These triggers exist because AI-assisted development creates a specific failure mode: the temptation to generate code faster than you can understand it. The triggers are guardrails against that temptation.

### The Ship Gate

Before anything ships, five questions must be answered. Does it break at scale? Does it break at zero -- the empty state with no data? Does it break with malice -- can a bad actor exploit it? Can we undo the change if something goes wrong? And will someone reading this code in six months understand what it does and why?

These questions are not a checklist to rush through. They represent the difference between software that works in a demo and software that works in production. Happy path alone is never sufficient.

### The Twelve Systems Principles

A deep analysis of Claude Code's own source code distilled twelve engineering principles that now govern all of Shravan's building. These are not aspirational -- they are extracted from production systems that serve millions of users.

1. **Map the startup DAG** -- parallelize independent I/O operations.
2. **Defer non-critical work past first render** -- users see results before everything finishes.
3. **Use the smallest state primitive** -- get, set, subscribe, nothing more.
4. **Module-level mutable state needs friction** -- make it hard to do by accident.
5. **Every cache needs eviction** -- LRU as the default, because unbounded caches caused 300MB+ memory leaks in Claude Code itself.
6. **Order payloads for cache-key stability** -- sorting tools so that additions do not invalidate the cache prefix.
7. **Shape schemas to match capabilities** -- Zod schemas that encode what a tool can and cannot do.
8. **Enforce access at the earliest boundary** -- fail-closed defaults, assume destructive unless proven safe.
9. **Circuit-break repeated failures with a low cap** -- three consecutive failures maximum, preventing hundreds of thousands of wasted API calls per day.
10. **Wrap shared async operations in sequential queues** -- prevent race conditions on shared resources.
11. **Default to full isolation; shared state is opt-in** -- never the reverse.
12. **Reserve headroom in bounded resources** -- warn, then remediate, then block.

The meta-lesson behind all twelve: Anthropic builds from measurement, not anxiety. Every mechanism traces to a quantified problem, not a theoretical concern.

### AI-Assisted Building

The relationship with **[[claude-code-as-cto]]** is explicitly framed as a CTO partnership, not a code-monkey arrangement. Shravan decides what to build -- product direction, priorities, what matters. Claude decides how -- architecture, implementation, holding the engineering bar. The contract demands honesty over agreement: when "just do it" is the instruction, that is precisely when Claude should push back hardest, because that is when shortcuts happen.

Development uses **[[subagent-driven-development]]** for large builds, dispatching parallel Opus agents per task. The model quality is never downgraded -- always Opus for subagents, because engineering judgment should not be compromised for speed.

### Patterns From the Build Log

Across all nine project session journals, certain hard-won lessons recur. **Multi-agent code review is mandatory** -- it caught an infinite loop that would have spammed Supabase in production (Rethink Dashboard), a cross-cohort data leak (BFF route), an XSS vector via javascript: URLs (case studies), and a mic-voice quota coupling bug that blocked elderly users from speaking their questions (PrabhupadaAI). **Three-layer defense** appears repeatedly: application-level guard, upsert guard, and database constraint for Zoom dedup; FAQ cache, exact-match cache, and semantic search for PrabhupadaAI; timeout, SWR cache, and error state for flaky networks. **Screenshot review on mobile viewport catches compounding issues that code review cannot** -- each fix reveals new problems (making a hidden quota bar visible revealed it was too verbose for mobile width). And **verify data shape before writing the plan** -- the PrabhupadaAI source graph assumed structured chunk IDs that did not exist, wasting time debugging a data gap.

## Impact

This philosophy is what allows a product manager to ship production-grade code. The guardrails are not limitations -- they are what make the speed sustainable. Every project in this wiki, from [[prabhupada-and-iskcon]] to the tools documented in [[claude-code-as-cto]], was built under these exact principles. The proof is in the shipping record: multiple concurrent production applications, maintained by one person, with an engineering bar that holds.

## Related
- [[shravan-tickoo]]
- [[design-philosophy]]
- [[claude-code-as-cto]]
- [[prabhupada-and-iskcon]]
