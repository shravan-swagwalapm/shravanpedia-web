---
title: "Claude Code as CTO"
category: Learnings
created: 2026-04-08
updated: 2026-04-09
source: "CLAUDE.md, workshop content, daily usage patterns, session journals (Claude Code Tooling, shipstack, Systems Builder Plan)"
tags: [claude-code, ai-tools, workflow, meta]
visibility: public
---

> The tool that made a PM into a builder -- and the philosophy behind using it.

## Context

Claude Code is not just a tool for Shravan — it is the enabler of his entire builder identity. Before Claude Code, he was a product manager with a decade of experience, strong opinions about how software should be built, and no ability to build it himself. The ideas lived in PRDs, in wireframes, in conversations with engineers who had their own priorities. After Claude Code, those ideas became production applications — live, deployed, used by real people. The transformation was not gradual. It was a phase change. The same person, with the same product instincts, suddenly had access to engineering execution. And the relationship between those instincts and that execution is explicitly framed as a CTO-level partnership: Shravan decides what to build, Claude decides how to build it, and there is a mutual obligation to push back on bad ideas from either side.

## Details

### The CTO Contract

The partnership operates under a clear contract that is encoded in the CLAUDE.md configuration file loaded at the start of every session. The contract is not metaphorical — it is behavioral rules that shape how every interaction unfolds.

Shravan owns **what** — product direction, priorities, what matters to users. Claude owns **how** — architecture, implementation details, holding the engineering bar. The contract demands **honesty over agreement**: Claude must push back when shortcuts are about to happen, especially when the instruction is "just do it," because that is precisely when corners get cut. "Just do it" is the PM's override command, and the CTO's job is to absorb the pressure of that command and respond with "I can, but should I?"

Claude is expected to ask the questions a developer would not ask, but a CTO must ask. Should we build this at all? Is this the right problem to solve right now? What does this change break in the other active projects? What is the simplest version that proves the concept? These are strategic questions, not implementation questions, and they are what separate AI-assisted building from AI-assisted typing. A code-monkey relationship produces code. A CTO relationship produces the right code — or, equally valuable, the decision not to write any code at all.

The contract also encodes specific behavioral triggers: when three or more steps are required, switch to plan mode. When an approach breaks, stop and re-plan rather than retrying. When something is unclear, ask exactly one question before writing code. These triggers are not suggestions — they are the engineering discipline that makes it possible for a non-engineer to maintain production software. See [[building-philosophy]] for the full treatment.

### Workflow Architecture

The workflow is built on layered context systems that ensure Claude always has the information it needs without drowning in irrelevant detail.

The **Obsidian vault** at `~/ProductBrain/` serves as the persistent context store — not for backlinks and knowledge graphs in the traditional sense, but for agent-readable session context that survives across conversations. When Shravan starts a session on PrabhupadaAI, the vault contains the project's full history: past decisions, known bugs, architectural choices, and the reasoning behind them. This context is what allows continuity across sessions — Claude does not start from zero each time but inherits the accumulated wisdom of every previous session.

The **memory system** at `~/.claude/projects/.../memory/` holds small patterns and rules that are always loaded — workflow preferences, project references, and cross-session learnings. The distinction between vault and memory is deliberate: memory contains what is always relevant (how Shravan works, which projects exist, what tools are configured), while the vault contains what is relevant on demand (the specific context of a particular project at a particular moment). The session trigger "Vault + [project name]" loads full project context when needed.

**RTK (Rust Token Killer)** sits underneath everything as a token optimization proxy, delivering 60-90% savings on development operations. This matters because token efficiency directly translates to longer, more productive sessions — and at Shravan's usage volume, the savings compound into hours of additional productive time per week.

### Advanced Patterns

Several advanced patterns have emerged from daily use, each one solving a specific problem that appeared as the workflow matured.

**[[subagent-driven-development]]** dispatches Opus-level agents per task for parallel execution, allowing multiple independent workstreams to progress simultaneously. This pattern was born from the realization that many building tasks are embarrassingly parallel — writing tests, building components, updating documentation — and that a single serial session wastes time waiting for each task to complete before starting the next. The Builder's Bible was produced through 20+ parallel agents in a single sitting. The PrabhupadaAI frontend was built by agents working simultaneously on different components. The model quality is never downgraded — always Opus for subagents, because engineering judgment should not be compromised for speed.

The **Ralph Loop** handles mechanical, verifiable tasks — repetitive operations where correctness can be checked automatically. This is the distinction between work that requires judgment and work that requires accuracy. A Ralph Loop processes a list of files, applies a transformation, and verifies the result. It does not decide whether the transformation is the right one — that decision was made before the loop started.

**Metacognition review** is a self-adapting code review system that learns which areas of the codebase are error-prone and adjusts review depth over time (see below). The **skills system** provides custom capabilities for recurring workflows — from design reviews to vault operations to deployment checks. And **hooks** automate pre- and post-tool-use behaviors like console.log removal and secret detection, catching the mistakes that are easy to make and hard to notice.

### The Metacognition Review System

The most ambitious tooling project is a **self-adapting code review skill** that progresses through four layers, each one adding capability as usage data accumulates.

Layer 0 (Auto-Review) runs after any coding task with zero configuration — a universal checklist covering security, architecture, common mistakes, and quality that works from the first install. A first-time user gets immediate value. Layer 1 (Pattern Memory) activates after three sessions, detecting recurring mistakes (e.g., "console.logs in 75% of sessions") and adding them to a priority checklist with proactive warnings. Layer 2 (Attention Map) builds automatically after five sessions, creating a component-level attention map from real review data that adjusts review depth per component — spending more time on the files that historically produce more bugs. Layer 3 (Contract Mode) is opt-in for users with planning workflows, providing the full contract-and-checkpoint system.

The system operates across three time horizons simultaneously: **predict** (before writing code, combining user-specific patterns with code context to anticipate likely mistakes), **review** (after writing code, with adversarial self-testing that generates hostile inputs and traces execution), and **learn** (across sessions, updating pattern scores based on correct and incorrect predictions).

The adversarial self-testing is genuinely novel. After writing critical functions, the AI generates adversarial inputs and traces execution to find logic bugs. This is reasoning-based, not grep-based — it requires understanding what the code is supposed to do, generating inputs designed to break it, and tracing the execution path to verify correctness. No other AI coding tool attacks its own output with this level of sophistication.

The key design insight came from recognizing that early versions were power tools for power users — a first-time Claude Code user got zero value from them. The progressive layer redesign ensures the skill works for anyone from session one, with deeper capabilities unlocking as usage data accumulates. Learning data lives at `~/.metacognition/learnings.yaml` rather than requiring a vault, making it vault-optional and accessible to users who have not set up the full Obsidian infrastructure.

### ShipStack: The Knowledge Layer

**[[shipstack]]** emerged from analyzing gstack (48K stars on GitHub) and identifying that Shravan's existing superpowers skills and ShipStack served complementary rather than competing roles. Superpowers owns the **build** dimension (plans and subagents), while ShipStack owns the **knowledge** dimension (vault in, vault out). Neither replaces the other — they are two sides of the same system.

ShipStack v2.0 absorbed seven patterns from gstack: filesystem-as-bus, scope modes, adversarial review, anti-sycophancy worked examples, temporal interrogation, three-strike debugging, and past-mistakes-as-checklist. Each pattern was tested against Shravan's actual workflow and kept only if it produced measurable improvement.

The guard hook was initially broken — it read `$CLAUDE_TOOL_NAME` environment variables, but Claude Code actually passes JSON on stdin. The hook would have silently failed, making scope enforcement appear enabled while never actually blocking anything. Pipe-testing caught this before it became a trust problem — a reminder that the most dangerous bugs are the ones where the system appears to work while doing nothing.

### Inside Claude Code's Architecture

A deep analysis of Claude Code's own source — 1,902 files, 33MB — during the Systems Builder Plan revealed the engineering principles that Anthropic builds on, and those principles now govern Shravan's own building. See [[building-philosophy]] for the full twelve principles.

The architecture is a React-based terminal app running on a forked Ink framework (fully vendored, not an npm dependency). It uses **speculative execution** — pre-running tool calls before user confirmation, with completion boundaries — a pattern that makes the interface feel fast even when the underlying operations are slow. Over 40 tools are defined via Zod schemas with fail-closed defaults (assume destructive unless proven safe). The prompt cache is kept stable by sorting tools so that the built-in prefix is never invalidated by MCP additions — a subtle optimization that prevents cache thrashing and saves thousands of dollars in API costs at scale. A circuit breaker on auto-compact allows a maximum of three consecutive failures, which prevented an estimated 250,000 wasted API calls per day. An LRU eviction policy on all caches replaced unbounded lodash memoize that had caused 300MB+ memory leaks.

The meta-lesson: Anthropic builds from measurement, not anxiety. Every mechanism in their codebase traces back to a quantified problem. This insight transformed how Shravan thinks about engineering decisions — the realization that good engineering is not about preventing every possible problem but about measuring which problems actually occur and building mechanisms to address those specific problems.

### Teaching Others

Shravan runs a workshop series — "Learn 90% of Claude Code in 90 minutes" — teaching this exact workflow to PMs and non-developers. The series covers everything from basic CLI usage to git worktrees, team collaboration, and PR review workflows. The workshops are hosted on [[the-swagwala-pm]] and draw an audience that extends beyond the PM community into designers, marketers, and operators.

The core insight he communicates is one that reframes the entire conversation about AI and software development: AI does not replace engineering judgment. What it does is give non-engineers access to engineering execution while still requiring judgment about what to build, when to ship, and what tradeoffs to accept. The judgment is the hard part. The code generation was always the easier part — people just did not realize it until AI made it obvious.

This insight is what makes his teaching distinctive. He is not teaching people to use a tool. He is teaching them to think like a CTO — to make the strategic decisions about what to build, to evaluate tradeoffs, to push back on scope creep, and to hold a quality bar. Claude Code is the executor. The human is the decision-maker. The workshop teaches the decision-making, not the keystrokes.

## Impact

This is the meta-tool that enables everything else in Shravan's portfolio. [[prabhupada-ai]], [[builders-bible]], [[predict-my-layoff]], the tools and pipelines — all of them exist because Claude Code as CTO made it possible for a product manager to maintain multiple production applications simultaneously. The distinction between "PM with ideas" and "PM who ships" is the thesis behind everything he teaches at [[the-swagwala-pm]] and [[rethink-systems]]. Claude Code is the bridge that makes the distinction real — and the CTO contract is the philosophy that makes the bridge safe to cross.

## Related
- [[shravan-tickoo]]
- [[building-philosophy]]
- [[the-swagwala-pm]]
- [[builders-bible]]
- [[subagent-driven-development]]
- [[shipstack]]
- [[systems-thinking]]
- [[predict-my-layoff]]
- [[prabhupada-ai]]
