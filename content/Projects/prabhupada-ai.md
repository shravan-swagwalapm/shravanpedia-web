---
title: "PrabhupadaAI"
category: Projects
created: 2026-04-08
updated: 2026-04-09
source: "vault project files, session history, session journals (4 sessions, March 2026)"
tags: [project, rag, spiritual, prabhupada, product]
visibility: public
---

> AI-powered spiritual Q&A grounded in Srila Prabhupada's teachings — the project with the deepest personal meaning.

## Context

Of all the projects in Shravan's portfolio, **PrabhupadaAI** is the one with soul. It is not a portfolio piece or a growth hack — it is an expression of devotion through technology. The goal is deceptively simple: make Prabhupada's teachings accessible to anyone who has a spiritual question, with AI-generated answers grounded in actual scripture and delivered in Prabhupada's own voice. Where other projects showcase product instinct or distribution savvy, this one reveals something deeper — the builder who builds because building is seva.

## Details

### What It Does

Users ask spiritual questions in natural language, and a **RAG pipeline** searches across Prabhupada's body of work — the Bhagavad Gita, Srimad Bhagavatam, and recorded lectures. The AI then generates answers with source citations drawn directly from actual verses and purports, ensuring that nothing is hallucinated wisdom; everything traces back to scripture. Through **ElevenLabs voice synthesis**, answers can also be heard in a voice modeled on Prabhupada himself, turning a text-based Q&A into something that feels like sitting at the feet of a spiritual master. The app also includes history tracking, a subscription model, and sharing features that let users pass along answers to others.

### Technical Stack

The backend runs on **FastAPI** with **SQLite** for persistence and **FAISS** for vector search. The frontend is a **Next.js** application exported as static files and served directly by the FastAPI backend — a pattern that keeps deployment simple while maintaining a modern user experience. The whole system is deployed on **Railway** via a Docker multi-stage build that has been security-hardened. The **ElevenLabs** Prabhupada voice clone is the same provider used by [[shortstack]], though the two projects use entirely different voices.

### Three-Tier Answer Resolution

A significant architectural evolution emerged from the March 2026 sessions. Rather than routing every question through the full FAISS-to-Claude pipeline, answers now resolve through three tiers of decreasing cost. The first tier is a **FAQ cache** -- five pre-rendered answers generated offline via `scripts/seed_faq.py`, stored in `data/faq.json`, and served at zero quota cost. These work even during FAISS cold start. The second tier is an **exact-match history cache** -- a per-user SQLite lookup that refunds quota on hit. The third tier is the original **semantic search and fresh generation** pipeline. This architecture was born from a practical realization: the FAQ check must bypass three separate gates (FAISS readiness guard returning 503, quota check returning 402, and the disabled UI state) or the experience breaks entirely.

### Scripture Source Graph

An interactive d3-force SVG graph was built to visualize scripture sources as clickable nodes around the user's question, replacing the earlier flat list. The implementation revealed a data gap: FAISS `chunk_id` values are simple integers (0, 1, 2...), not structured identifiers like `bg_2_47`, making verse-level references impossible without enriching the FAISS metadata at index build time. Only 1 out of 6,292 Bhagavad Gita chunks contained a verse header in its text. The graph includes a detail panel and full-screen drawer, and history pages show a compact graph for each past question.

### The Dark Mode Decision

Dark mode was added and removed in the same session. The user correctly identified that for an audience of elderly devotees aged 60-75, a single bright "Devotional Light" theme (cream and royal blue) eliminates testing complexity for minimal benefit. The guiding principle: for elderly-targeted applications, start with 16px minimum body text from the beginning, because retrofitting larger text is significantly more work than designing for it upfront.

### Build Quality Findings

Across four sessions, a total of 33 UI fixes were made in a single audit, including critical issues like SQLite thread-safety (thread-local connections with context managers and `PRAGMA busy_timeout=5000`), SSE disconnect detection that refunds quota if a client drops mid-stream, and an O(n-squared)-to-O(n) fix in the RichAnswer component that previously re-parsed markdown on every new line. The SSE sentence-splitter regex `(?<=[.!?])\s+` was found to silently destroy markdown paragraph breaks because `\s+` matches newlines -- a subtle bug that affected both FAQ and history cache replay. The fix was to split by paragraphs first, then by sentences within each paragraph.

### Personal Significance

This project is seva — spiritual service channeled through code. The pricing has been carefully researched to ensure sustainability without becoming a cash grab; the intent is service, not profit maximization. An admin console is planned for managing content and users over time. Alongside building the app, Shravan also created presentations for ISKCON leadership, further bridging the worlds of devotion and technology. Technical details live in the vault at `../../Projects/PrabhupadaAI/`, and the Railway deployment pattern is shared with the OpenClaw project.

## Impact

PrabhupadaAI is where Shravan's two identities — builder and devotee — merge completely. If you understand why this project exists, you understand Shravan.

## Related
- [[prabhupada-and-iskcon]]
- [[shravan-tickoo]]
- [[building-philosophy]]
- [[subagent-driven-development]]
- [[claude-code-as-cto]]
