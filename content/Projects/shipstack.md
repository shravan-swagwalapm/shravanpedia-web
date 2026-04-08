---
title: "ShipStack"
category: Projects
created: 2026-04-09
updated: 2026-04-09
source: "session journals (shipstack, 1 session, March 2026)"
tags: [project, tooling, knowledge-os, claude-code, skills]
visibility: public
---

> Knowledge OS for AI-assisted development -- the system that remembers what you learned across sessions.

## Context

Where [[claude-code-as-cto]] describes how Shravan uses AI to build, ShipStack is the infrastructure that makes that usage compound over time. It is a knowledge layer for Claude Code -- a system of skills, hooks, and templates that ensures lessons learned in one session are not forgotten in the next. If superpowers (the skills system) owns the build dimension (plans and subagents), ShipStack owns the knowledge dimension (vault in, vault out). Neither replaces the other; they are complementary halves of the same pipeline.

## Details

### Origin

ShipStack v2.0 was built by analyzing gstack (48,000 stars on GitHub) and identifying seven patterns worth absorbing: filesystem-as-bus, scope modes, adversarial review, anti-sycophancy worked examples, temporal interrogation, three-strike debugging, and past-mistakes-as-checklist. Rather than forking gstack or replacing the existing superpowers system, the design chose a Pipeline-First approach with skills stored in the repository and symlinked into Claude Code's skills directory.

### The Skill Pipeline

Eight skills form the core pipeline. `/brainstorm` enforces six forcing questions and uses an adversarial cold subagent with a hard gate that prevents any code output. `/challenge` provides four scope modes with temporal interrogation and an error-and-rescue map. `/review-plan` generates ASCII diagrams, test matrices, and past-mistakes-per-component checklists. `/investigate` implements four-phase debugging with a three-strike rule and scope lock via `freeze-scope.txt`. `/review` performs scope drift detection with past-mistakes-as-checklist and auto-scaling adversarial review. `/ship-check` produces a readiness dashboard with staleness detection and GO/NO-GO/RE-REVIEW verdicts. `/retro` handles session detection, eureka aggregation, and knowledge compound rate calculation.

### The Guard Hook

The guard hook (`hooks/guard.sh`) enforces scope at the PreToolUse boundary, reading JSON from stdin and outputting `{"decision":"block"}` when an operation falls outside the current scope. The original implementation read `$CLAUDE_TOOL_NAME` environment variables, but Claude Code actually passes tool information as JSON on stdin. The hook would have silently failed -- scope enforcement would appear enabled while never actually blocking anything. Pipe-testing during development caught this before it became a trust problem, reinforcing the principle that security mechanisms that fail silently are worse than no mechanism at all.

### The /ship-feature Orchestrator

A meta-skill chains the superpowers build pipeline (design, plan, execute) with ShipStack's knowledge pipeline (scope, review, knowledge) in a single command with five gates. Three terminal state overrides were needed: brainstorm-to-challenge (not writing-plans), writing-plans-to-review-plan (not execution), and execution-to-review (not finishing-branch). These integration seams are where the bugs live -- each system assumes it owns the full pipeline, and the overrides are the glue that makes them share.

## Impact

ShipStack is v1.0 shipped: the repo is public, the skills are symlinked, and the guard hook is active. It represents the infrastructure play behind Shravan's building philosophy -- not just building better, but building in a way where every session makes the next one better. The knowledge compound rate is the metric that matters.

## Related
- [[claude-code-as-cto]]
- [[building-philosophy]]
- [[subagent-driven-development]]
- [[shravan-tickoo]]
