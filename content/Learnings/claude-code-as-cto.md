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

Claude Code is not just a tool for Shravan -- it is the enabler of his entire builder identity. Without it, he is a product manager with ideas. With it, he is a product manager who ships production software. The relationship is explicitly framed as a CTO-level partnership: Shravan decides what to build, Claude decides how to build it, and there is a mutual obligation to push back on bad ideas from either side.

## Details

### The CTO Contract

The partnership operates under a clear contract. Shravan owns what -- product direction, priorities, what matters to users. Claude owns how -- architecture, implementation details, holding the engineering bar. The contract demands **honesty over agreement**: Claude must push back when shortcuts are about to happen, especially when the instruction is "just do it," because that is precisely when corners get cut.

Claude is expected to ask the questions a developer would not. Should we build this at all? What does this change break in the other active projects? What is the simplest version that proves the concept? These are CTO questions, not code-monkey questions, and they are what separate AI-assisted building from AI-assisted typing.

### Workflow Architecture

The workflow is built on layered context systems. The **Obsidian vault** at `~/ProductBrain/` serves as the persistent context store -- not for backlinks and knowledge graphs, but for agent-readable session context that survives across conversations. The **memory system** at `~/.claude/projects/.../memory/` holds small patterns and rules that are always loaded. The distinction between vault and memory is deliberate: memory contains what is always relevant, while the vault contains what is relevant on demand. The session trigger "Vault + [project name]" loads full project context when needed.

**RTK (Rust Token Killer)** sits underneath everything as a token optimization proxy, delivering 60-90% savings on development operations. This matters because token efficiency directly translates to longer, more productive sessions.

### Advanced Patterns

Several advanced patterns have emerged from daily use. **[[subagent-driven-development]]** dispatches Opus-level agents per task for parallel execution, allowing multiple independent workstreams to progress simultaneously -- this pattern has been used in virtually every major project build. The **Ralph Loop** handles mechanical, verifiable tasks -- repetitive operations where correctness can be checked automatically, as opposed to creative or subjective work. **Metacognition review** is a self-adapting code review system that learns which areas of the codebase are error-prone and adjusts review depth over time (see below). The **skills system** provides custom capabilities for recurring workflows. And **hooks** automate pre- and post-tool-use behaviors like console.log removal and secret detection.

### The Metacognition Review System

The most ambitious tooling project is a **self-adapting code review skill** that progresses through four layers. Layer 0 (Auto-Review) runs after any coding task with zero configuration -- a universal checklist covering security, architecture, common mistakes, and quality that works from the first install. Layer 1 (Pattern Memory) activates after three sessions, detecting recurring mistakes (e.g., "console.logs in 75% of sessions") and adding them to a priority checklist with proactive warnings. Layer 2 (Attention Map) builds automatically after five sessions, creating a component-level attention map from real review data that adjusts review depth per component. Layer 3 (Contract Mode) is opt-in for users with planning workflows, providing the full contract-and-checkpoint system.

The system operates across three time horizons simultaneously: **predict** (before writing code, combining user-specific patterns with code context to anticipate likely mistakes), **review** (after writing code, with adversarial self-testing that generates hostile inputs and traces execution), and **learn** (across sessions, updating pattern scores based on correct and incorrect predictions). The adversarial self-testing is genuinely novel -- after writing critical functions, the AI generates adversarial inputs and traces execution to find logic bugs. This is reasoning-based, not grep-based. No other AI coding tool attacks its own output.

The key design insight came from recognizing that v1 and v2 were power tools for power users. A first-time Claude Code user got zero value. The progressive layer redesign ensures the skill works for anyone from session one, with deeper capabilities unlocking as usage data accumulates. Learning data lives at `~/.metacognition/learnings.yaml` rather than requiring a vault, making it vault-optional.

### ShipStack: The Knowledge Layer

**[[shipstack]]** emerged from analyzing gstack (48K stars on GitHub) and identifying that Shravan's existing superpowers skills and ShipStack served complementary rather than competing roles. Superpowers owns the **build** dimension (plans and subagents), while ShipStack owns the **knowledge** dimension (vault in, vault out). Neither replaces the other.

ShipStack v2.0 absorbed seven patterns from gstack: filesystem-as-bus, scope modes, adversarial review, anti-sycophancy worked examples, temporal interrogation, three-strike debugging, and past-mistakes-as-checklist. The guard hook was initially broken -- it read `$CLAUDE_TOOL_NAME` environment variables, but Claude Code actually passes JSON on stdin. The hook would have silently failed, making scope enforcement appear enabled while never actually blocking anything. Pipe-testing caught this before it became a trust problem.

### Inside Claude Code's Architecture

A deep analysis of Claude Code's own source (1,902 files, 33MB) during the Systems Builder Plan revealed the engineering principles that Anthropic builds on. The architecture is a React-based terminal app running on a forked Ink framework (fully vendored, not an npm dependency). It uses **speculative execution** -- pre-running tool calls before user confirmation, with completion boundaries. Over 40 tools are defined via Zod schemas with fail-closed defaults (assume destructive unless proven safe). The prompt cache is kept stable by sorting tools so that the built-in prefix is never invalidated by MCP additions. A circuit breaker on auto-compact allows a maximum of three consecutive failures, which prevented an estimated 250,000 wasted API calls per day. An LRU eviction policy on all caches replaced unbounded lodash memoize that had caused 300MB+ memory leaks.

The meta-lesson: Anthropic builds from measurement, not anxiety. Every mechanism in their codebase traces back to a quantified problem.

### Teaching Others

Shravan runs a workshop series teaching this exact workflow to PMs and non-developers. The core insight he communicates: AI does not replace engineering judgment. What it does is give non-engineers access to engineering execution while still requiring judgment about what to build, when to ship, and what tradeoffs to accept. The judgment is the hard part. The code generation was always the easier part -- people just did not realize it until AI made it obvious.

## Impact

This is the meta-tool that enables everything else in Shravan's portfolio. [[prabhupada-and-iskcon]], [[builders-bible]], the tools and pipelines -- all of them exist because Claude Code as CTO made it possible for a product manager to maintain multiple production applications simultaneously. The distinction between "PM with ideas" and "PM who ships" is the thesis behind everything he teaches at [[the-swagwala-pm]] and [[rethink-systems]].

## Related
- [[shravan-tickoo]]
- [[building-philosophy]]
- [[the-swagwala-pm]]
- [[builders-bible]]
- [[subagent-driven-development]]
- [[shipstack]]
- [[systems-thinking]]
