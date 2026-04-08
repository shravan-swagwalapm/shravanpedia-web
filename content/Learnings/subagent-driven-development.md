---
title: "Subagent-Driven Development"
category: Learnings
created: 2026-04-09
updated: 2026-04-09
source: "session journals (all 9 projects, cross-session pattern analysis)"
tags: [engineering, ai-tools, workflow, pattern, subagents]
visibility: public
---

> The pattern that lets one person build like a team -- dispatch Opus agents per task, review the output, ship.

## Context

Subagent-driven development is the single most recurring engineering pattern across Shravan's entire build log. It appears in every major project: 20+ parallel agents for the [[builders-bible]], 22 tasks across 3 phases for [[predict-my-layoff]], 10 tasks for the PrabhupadaAI scripture source graph, 8 tasks for the [[financial-vault]], and 9 agents producing the 640-page Systems Bible. It is the mechanism that allows a solo PM-builder to maintain the shipping velocity of a small engineering team.

## Details

### How It Works

The pattern is straightforward in concept. Break a build into independent tasks. Dispatch each task to a separate Opus-level agent (never downgrade model quality -- engineering judgment should not be compromised for speed). Each agent receives the same context package: a style reference from existing code, project context from the vault, and a clear structure template. Review the output of each agent. Integrate, fix, ship.

The constraint that makes it work is **independence**. Tasks must not share mutable state or depend on each other's output. This forces the builder to decompose work into genuinely parallel units, which is itself a valuable design exercise. When tasks do have dependencies, they must be sequenced into waves.

### Lessons From the Build Log

**Agents produce consistent output when given consistent inputs.** The nine agents that produced the Systems Bible chapters all matched style because each received the exact same Chapter 1 style reference, the same project context, and the same structure template. Consistency is a function of input specificity, not agent coordination.

**Context compaction kills agents.** During the Systems Bible build, the sixth agent was lost to context compaction -- an auth error after the session ran out of context window. The lesson: for large-scale parallel work, batch agents into groups of three to four per wave to avoid context pressure. When re-dispatching a failed agent, include a "previously on" context blob so it does not waste tokens re-reading what the failed agent already processed.

**Agents create files in wrong directories.** During the PrabhupadaAI source graph build, subagents created files in a double-nested path (`ai-prabhupada-rag/ai-prabhupada-rag/web/components/`) instead of the correct location. The working directory must be pinned explicitly in the agent's prompt. This is an easy mistake to miss and a hard one to debug after the fact.

**Multi-agent code review is mandatory, not optional.** Across the session journals, multi-agent code review caught: an infinite loop that would have spammed Supabase (Rethink Dashboard), cross-cohort data leaks (BFF route), XSS via javascript: URLs (case studies), a mic-voice quota coupling bug blocking elderly users (PrabhupadaAI), and 14 bugs across four review rounds in a single BFF implementation. The pattern is clear: the more agents that write code, the more agents need to review it.

**Cache hits double-emitted data.** In PrabhupadaAI, FAISS search ran unconditionally before the cache check, so passage data was already on the wire when the cache returned a hit. The code review agent caught this -- a subtle timing issue that only appears when both paths are active. This class of bug (unconditional side effects before conditional early returns) is characteristic of subagent-built systems where different agents wrote different branches.

### When Not to Use It

Subagent-driven development works for independent, well-specified tasks with clear acceptance criteria. It does not work for creative or subjective work where the output depends on iterative human judgment. The Ralph Loop pattern is better for mechanical, verifiable repetitive tasks. And single-agent execution is better when tasks are deeply interdependent and share significant state.

## Impact

This pattern is what makes Shravan's shipping velocity legible. It is not AI magic -- it is decomposition discipline combined with parallel execution. The pattern forces good architecture (independent modules), demands clear specifications (each agent needs a complete brief), and produces reviewable output (discrete changes that can be evaluated independently). The fact that it appears in every single major project session journal makes it the closest thing to a signature move in Shravan's building practice.

## Related
- [[claude-code-as-cto]]
- [[building-philosophy]]
- [[shipstack]]
- [[prabhupada-ai]]
- [[builders-bible]]
- [[predict-my-layoff]]
- [[financial-vault]]
- [[rethink-dashboard]]
