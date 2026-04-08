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

Shravan has developed a precise philosophy about how to build software, especially as a PM-turned-builder who ships production code using AI tools. It is not the Silicon Valley orthodoxy of moving fast and breaking things. It is closer to the opposite: move deliberately, ship things that work, and never confuse motion with progress. This philosophy was not adopted from a book or borrowed from a conference talk. It was forged through the experience of maintaining multiple production applications simultaneously as a single builder — discovering which shortcuts create tech debt, which guardrails enable speed, and which instincts to trust versus which to override.

## Details

### The Three Gates

The foundation rests on three gates that govern every action, and each one was earned through a specific kind of experience.

The first gate is **do, then report** — never narrate intent, never announce what you are about to do, just do the work and show the result. This principle emerged from observing how AI-assisted development creates a seductive failure mode: the temptation to describe what you plan to build rather than actually building it. In a Claude Code session, saying "Let me search for the file" and then searching for the file are two different actions, and only one produces value. The first gate eliminates the theater of work and demands the substance of it.

The second gate is **only what was asked** — no bonus features, no "while I'm here" refactors, no scope creep disguised as initiative. This is the hardest gate to enforce because it runs counter to every builder's instinct. When you are inside a codebase fixing a bug, you see three other things that could be improved. The temptation to fix them feels responsible. It is not. Unsolicited improvements create untested surface area, expand the blast radius of changes, and introduce the most dangerous kind of bug: the one nobody knows to look for because nobody asked for the change. Discipline is doing only the work that was requested, doing it well, and stopping.

The third gate is **prove it** — nothing is done until there is evidence: output, a file at a specific line, a passing test, or a screenshot. This gate exists because AI-generated code can look correct, read correctly, and be entirely wrong. The only reliable signal is evidence. Not the appearance of correctness, but proof of it.

These three gates are not aspirational values pinned to a wall. They are enforced in every Claude Code session, every commit, every review. Underneath them sits a deeper conviction: **do less, verify more**. The instinct when building with AI is to optimize, to add, to polish. Shravan deliberately resists that instinct, because verification before shipping is the discipline that makes speed sustainable rather than reckless.

### Engineering Triggers

The building philosophy encodes specific behavioral triggers for common situations — each one a response to a pattern that caused real problems in real projects.

When a task requires three or more steps, switch to plan mode with verifiable subtasks — not vague phases, but concrete checkpoints. This trigger was born from watching multi-step tasks drift without clear milestones, producing work that looked complete but missed critical intermediate steps.

When an approach breaks, stop and re-plan entirely; never retry the same thing twice. This is perhaps the most counterintuitive trigger. The natural response to a broken approach is to try it again with a small adjustment. That response wastes time. If the approach broke, it broke for a reason, and the reason is usually structural rather than superficial. A fresh plan, informed by what the broken approach revealed, is almost always faster than a second attempt.

When something is unclear, ask exactly one question before writing a single line of code. Not zero questions (which leads to building the wrong thing) and not five questions (which is procrastination disguised as diligence). One question, targeted at the point of greatest ambiguity.

Before editing any file, read it first — understand before changing. This trigger prevents the most common source of AI-assisted bugs: making changes to a file based on assumptions about its structure rather than knowledge of it. When three or more duplicates appear, extract them. When a file exceeds 500 lines, decompose it. When a test fails, read the full error output rather than guessing at the fix.

These triggers exist because AI-assisted development creates a specific failure mode: the temptation to generate code faster than you can understand it. The triggers are guardrails against that temptation, and they are what allow a PM — not a trained engineer — to ship production software that holds up under real usage.

### The Ship Gate

Before anything ships, five questions must be answered, and each question tests a different dimension of production readiness.

Does it break at scale? The demo with ten users is meaningless if the architecture collapses at ten thousand. Does it break at zero — the empty state with no data? This is the most commonly missed failure mode because developers test with populated databases, not empty ones. A first-time user sees the empty state before they see anything else. Does it break with malice — can a bad actor exploit it? Every input is potentially hostile. Every URL parameter is a potential injection vector. Can we undo the change if something goes wrong? Irreversible changes require a higher bar of confidence. And will someone reading this code in six months understand what it does and why?

These questions are not a checklist to rush through. They represent the difference between software that works in a demo and software that works in production. Happy path alone is never sufficient. The PrabhupadaAI project exposed this vividly: a mic-voice quota coupling bug would have blocked elderly devotees from speaking their questions, a failure that code review missed but these Ship Gate questions caught.

### The Twelve Systems Principles

A deep analysis of Claude Code's own source code — 1,902 files, 33 megabytes — distilled twelve engineering principles that now govern all of Shravan's building. These are not aspirational. They are extracted from production systems that serve millions of users, and each one traces to a specific, quantified problem that Anthropic's engineers encountered and solved.

**Map the startup DAG** — parallelize independent I/O operations. When a system starts, some operations depend on others, but many are independent. Mapping the dependency graph and parallelizing independent work cuts startup time dramatically.

**Defer non-critical work past first render** — users see results before everything finishes loading. The perception of speed matters as much as actual speed. A screen that shows content immediately and fills in details asynchronously feels fast even if total load time is the same.

**Use the smallest state primitive** — get, set, subscribe, nothing more. State management complexity is the root cause of a disproportionate number of bugs. Using the simplest possible state primitive reduces the surface area for errors.

**Module-level mutable state needs friction** — make it hard to modify by accident. Shared mutable state is the source of concurrency bugs, and making it intentionally hard to change ensures that every mutation is deliberate.

**Every cache needs eviction** — LRU as the default, because unbounded caches caused 300MB+ memory leaks in Claude Code itself. This principle is absolute: if you create a cache, you must define when entries expire. No exceptions.

**Order payloads for cache-key stability** — sorting tools so that additions do not invalidate the cache prefix. A subtle optimization that prevented the prompt cache from thrashing every time a new MCP tool was added.

**Shape schemas to match capabilities** — Zod schemas that encode what a tool can and cannot do. The schema is not just validation — it is documentation and enforcement of the tool's contract.

**Enforce access at the earliest boundary** — fail-closed defaults, assume destructive unless proven safe. This is the security principle that prevents an entire category of bugs: when in doubt, deny.

**Circuit-break repeated failures with a low cap** — three consecutive failures maximum. In Claude Code, this prevented an estimated 250,000 wasted API calls per day from a runaway auto-compact loop.

**Wrap shared async operations in sequential queues** — prevent race conditions on shared resources. Concurrent writes to the same resource produce unpredictable results. Sequential queues eliminate the unpredictability.

**Default to full isolation; shared state is opt-in** — never the reverse. Every component starts isolated. Sharing state requires a deliberate, explicit decision.

**Reserve headroom in bounded resources** — warn, then remediate, then block. Hitting a hard limit without warning is always worse than a graceful degradation path.

The meta-lesson behind all twelve: Anthropic builds from measurement, not anxiety. Every mechanism traces to a quantified problem, not a theoretical concern. This is the insight that transformed Shravan's own building practice — the realization that engineering decisions should be responses to observed problems, not defenses against imagined ones.

### AI-Assisted Building

The relationship with **[[claude-code-as-cto]]** is explicitly framed as a CTO partnership, not a code-monkey arrangement. Shravan decides what to build — product direction, priorities, what matters. Claude decides how — architecture, implementation, holding the engineering bar. The contract demands honesty over agreement: when "just do it" is the instruction, that is precisely when Claude should push back hardest, because that is when shortcuts happen.

This framing is not metaphorical. The CLAUDE.md configuration file that governs every session encodes the CTO contract as behavioral rules: ask the questions a developer would not ask ("Should we build this at all?"), push back when the PM says "just do it," and hold the engineering bar even when speed is tempting. The result is a building partnership where the PM brings product judgment and the AI brings engineering discipline, and neither defers to the other without reason.

Development uses **[[subagent-driven-development]]** for large builds, dispatching parallel Opus agents per task. The model quality is never downgraded — always Opus for subagents, because engineering judgment should not be compromised for speed. This principle was tested when faster, cheaper models became available, and the answer was always the same: the cost of a bad architectural decision exceeds the savings from a cheaper model by orders of magnitude.

### Patterns From the Build Log

Across all nine project session journals, certain hard-won lessons recur with the consistency of natural law.

**Multi-agent code review is mandatory** — it caught an infinite loop that would have spammed Supabase in production (Rethink Dashboard), a cross-cohort data leak (BFF route), an XSS vector via javascript: URLs (case studies), and a mic-voice quota coupling bug that blocked elderly users from speaking their questions (PrabhupadaAI). Each of these bugs was invisible to the original builder and obvious to the reviewer. The lesson: the same mind that wrote the code cannot effectively review it.

**Three-layer defense** appears repeatedly across projects: application-level guard, upsert guard, and database constraint for Zoom dedup; FAQ cache, exact-match cache, and semantic search for PrabhupadaAI; timeout, SWR cache, and error state for flaky networks. The pattern is always the same: one layer is not enough, because each layer covers failure modes the others miss.

**Screenshot review on mobile viewport catches compounding issues that code review cannot** — each fix reveals new problems. In PrabhupadaAI, making a hidden quota bar visible revealed it was too verbose for mobile width, which required text truncation, which shifted the layout, which exposed a padding inconsistency. Code review alone would have caught none of this. A single screenshot caught all of it.

**Verify data shape before writing the plan** — the PrabhupadaAI source graph assumed structured chunk IDs that did not exist, wasting time debugging a data gap that could have been discovered in sixty seconds of inspection before any code was written.

## Impact

This philosophy is what allows a product manager to ship production-grade code. The guardrails are not limitations — they are what make the speed sustainable. Every project in this wiki, from [[prabhupada-ai]] to the tools documented in [[claude-code-as-cto]], was built under these exact principles. The proof is in the shipping record: multiple concurrent production applications, maintained by one person, with an engineering bar that holds under real-world usage. The three gates, the ship gate, the twelve principles — they are not a framework adopted for its elegance. They are the accumulated wisdom of hundreds of Claude Code sessions, thousands of commits, and the hard-won realization that the fastest way to build is to build carefully.

## Related
- [[shravan-tickoo]]
- [[design-philosophy]]
- [[claude-code-as-cto]]
- [[prabhupada-ai]]
- [[subagent-driven-development]]
- [[predict-my-layoff]]
- [[systems-thinking]]
