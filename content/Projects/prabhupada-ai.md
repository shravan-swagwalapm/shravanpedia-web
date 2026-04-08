---
title: "PrabhupadaAI"
category: Projects
created: 2026-04-08
updated: 2026-04-09
source: "vault project files, session history, session journals (4 sessions, March 2026)"
tags: [project, rag, spiritual, prabhupada, product]
visibility: public
infobox:
  Type: "RAG Web Application"
  Status: "Active"
  Stack: "FastAPI, Next.js, SQLite, FAISS"
  Deploy: "Railway"
  Voice: "ElevenLabs (Prabhupada synthesis)"
  Purpose: "AI spiritual Q&A grounded in Prabhupada's teachings"
  Significance: "Most personally meaningful project"
---

> AI-powered spiritual Q&A grounded in Srila Prabhupada's teachings — the project with the deepest personal meaning.

## Context

Of all the projects in Shravan's portfolio, **PrabhupadaAI** is the one with soul. It is not a portfolio piece or a growth hack — it is an expression of devotion through technology, the kind of project a builder creates when the work itself is an offering. The goal is deceptively simple: make Prabhupada's teachings accessible to anyone who has a spiritual question, with AI-generated answers grounded in actual scripture and delivered in Prabhupada's own voice. Where other projects showcase product instinct or distribution savvy, this one reveals something deeper — the builder who builds because building is seva.

The idea was born from a personal experience. Shravan, a daily reader of the Bhagavad Gita As It Is, found himself returning to the same texts with new questions as his life circumstances changed. The 2020 encounter with the Gita had been transformative — see [[prabhupada-and-iskcon]] — but the questions never stopped. What if anyone, at any hour, could ask a spiritual question and receive an answer grounded in the same teachings that had reshaped his own life? What if the answer could come in the voice of the teacher himself — warm, authoritative, infinitely patient? That question became a product.

## Details

### What It Does

Users ask spiritual questions in natural language — anything from "How should I deal with anger?" to "What does Krishna say about the purpose of work?" — and a **RAG pipeline** searches across Prabhupada's body of work: the Bhagavad Gita, Srimad Bhagavatam, and recorded lectures. The AI then generates answers with source citations drawn directly from actual verses and purports, ensuring that nothing is hallucinated wisdom; everything traces back to scripture. This is not a chatbot making up spiritual advice. It is a retrieval system that finds the specific passages where Prabhupada addressed the question, synthesizes them into a coherent answer, and shows its work.

Through **ElevenLabs voice synthesis**, answers can also be heard in a voice modeled on Prabhupada himself. This feature transforms a text-based Q&A into something that feels like sitting at the feet of a spiritual master. The voice carries warmth and gravity that text alone cannot convey, and for elderly devotees who grew up listening to Prabhupada's lectures, the experience is not merely informational but deeply emotional. The app also includes history tracking so users can revisit previous questions, a subscription model for sustainability, and sharing features that let users pass along answers to family members and fellow devotees.

### Technical Stack

The backend runs on **FastAPI** with **SQLite** for persistence and **FAISS** for vector search — a combination chosen for its simplicity and reliability. FAISS performs the semantic search that matches user questions to relevant scripture passages, while SQLite handles user data, history, and the FAQ cache. The frontend is a **Next.js** application exported as static files and served directly by the FastAPI backend — a pattern that keeps deployment simple while maintaining a modern user experience. The whole system is deployed on **Railway** via a Docker multi-stage build that has been security-hardened with non-root users, minimal base images, and explicit health checks. The **ElevenLabs** Prabhupada voice clone is the same provider used by [[shortstack]], though the two projects use entirely different voices — one carries the authority of a spiritual master, the other the warmth of a teacher sharing knowledge.

### Three-Tier Answer Resolution

A significant architectural evolution emerged from the March 2026 sessions, born from a practical realization about user experience and cost management. Rather than routing every question through the full FAISS-to-Claude pipeline — which is both expensive and slow on cold start — answers now resolve through three tiers of decreasing cost.

The first tier is a **FAQ cache** — five pre-rendered answers generated offline via `scripts/seed_faq.py`, stored in `data/faq.json`, and served at zero quota cost. These cover the questions that come up most often ("What is the purpose of life?", "How do I start practicing Krishna consciousness?") and work even during FAISS cold start, meaning the very first user of the day gets an instant answer rather than a loading screen. The second tier is an **exact-match history cache** — a per-user SQLite lookup that refunds quota on hit, so returning users who ask the same question again are not penalized. The third tier is the original **semantic search and fresh generation** pipeline for novel questions.

This architecture was born from a practical discovery: the FAQ check must bypass three separate gates — the FAISS readiness guard returning 503 during cold start, the quota check returning 402 for exhausted users, and the disabled UI state that greys out the input — or the experience breaks entirely. A user whose first question happens to be a common FAQ should never see a loading screen, a quota error, or a disabled input. The three-tier architecture ensures they see an answer.

### Scripture Source Graph

An interactive d3-force SVG graph was built to visualize scripture sources as clickable nodes arranged around the user's question, replacing the earlier flat list of citations. The visual metaphor is powerful: the user's question sits at the center, and the relevant verses radiate outward like the rays of a spiritual sun, each one clickable, each one leading deeper into the scripture. The implementation revealed a data gap that taught a broader lesson: FAISS `chunk_id` values are simple integers (0, 1, 2...), not structured identifiers like `bg_2_47`, making verse-level references impossible without enriching the FAISS metadata at index build time. Only 1 out of 6,292 Bhagavad Gita chunks contained a verse header in its text. The graph includes a detail panel for exploring individual verses and a full-screen drawer, and history pages show a compact graph for each past question — a visual timeline of the user's spiritual journey.

### The Dark Mode Decision

Dark mode was added and removed in the same session — a decision that exemplifies the [[design-philosophy]] principle of designing for the actual user, not the imagined one. The user base is elderly devotees aged 60-75. For this audience, a single bright "Devotional Light" theme (cream and royal blue) eliminates testing complexity for minimal benefit. Dark mode is a feature that engineers add because they themselves prefer it and designers include because it feels modern. But the actual users — people in their sixties and seventies who are accustomed to printed books and well-lit temple rooms — are better served by a single, warm, high-contrast theme that never asks them to choose.

The guiding principle extended further: for elderly-targeted applications, start with 16px minimum body text from the beginning, because retrofitting larger text is significantly more work than designing for it upfront. Every padding decision, every font size, every touch target was made with a specific person in mind — not a "user persona" on a whiteboard, but someone's grandmother who wants to hear what Prabhupada says about dealing with grief.

### Build Quality Findings

Across four sessions, a total of 33 UI fixes were made in a single audit — a testament to the [[building-philosophy]] principle that multi-agent code review catches what single-builder sessions miss.

Critical issues discovered and resolved include SQLite thread-safety (thread-local connections with context managers and `PRAGMA busy_timeout=5000`), which would have caused intermittent database corruption under concurrent access. SSE disconnect detection that refunds quota if a client drops mid-stream — without this, a user whose phone loses signal while receiving an answer would lose their daily quota for a response they never received. An O(n-squared)-to-O(n) fix in the RichAnswer component that previously re-parsed markdown on every new line of the streaming response — a performance issue invisible with short answers but devastating with long scripture passages.

The SSE sentence-splitter regex `(?<=[.!?])\s+` was found to silently destroy markdown paragraph breaks because `\s+` matches newlines — a subtle bug that affected both FAQ and history cache replay, causing multi-paragraph answers to collapse into single paragraphs. The fix was to split by paragraphs first, then by sentences within each paragraph, preserving the structure that makes long answers readable. The mic-voice quota coupling bug blocked elderly users from speaking their questions — a critical accessibility issue for the exact demographic the app was designed to serve.

### Personal Significance

This project is seva — spiritual service channeled through code. Every architectural decision reflects the tension between sustainability and service. The pricing has been carefully researched to ensure the app can sustain itself without becoming a cash grab. The intent is service, not profit maximization. An admin console is planned for managing content and users over time, ensuring that the app can grow without requiring Shravan's direct intervention for every operational decision.

Alongside building the app, Shravan also created presentations for ISKCON leadership, further bridging the worlds of devotion and technology. The presentations explore how ISKCON — a movement founded on the principle that Krishna's message belongs to the entire world — can use modern tools to reach people who will never walk into a temple but who carry the same spiritual questions that Arjuna carried on the battlefield of Kurukshetra.

Technical details live in the vault at `../../Projects/PrabhupadaAI/`, and the Railway deployment pattern is shared with the OpenClaw project. The shared infrastructure means that lessons learned deploying PrabhupadaAI — Docker security hardening, health check patterns, environment variable management — immediately benefit every other Railway-deployed project in the portfolio.

### The Devotee-Builder Convergence

What makes PrabhupadaAI unique in Shravan's portfolio is that it is the project where the two sides of his identity — the builder and the devotee — are not just coexisting but are the same thing. When he writes a three-tier caching architecture for FAQ answers, he is simultaneously optimizing latency and ensuring that a devotee's first question is answered instantly, without friction, without waiting. When he builds the ElevenLabs voice synthesis pipeline, he is simultaneously solving a technical challenge and creating an experience that brings tears to elderly devotees who hear a voice they thought they would never hear again.

The project is proof that technology and devotion are not in tension — they amplify each other. Prabhupada himself understood this. He used printing presses, record albums, and international air travel to spread Krishna's message across the globe. PrabhupadaAI is a continuation of that principle: use whatever tools exist to make the teachings accessible to whoever needs them.

## Impact

PrabhupadaAI is where Shravan's two identities — builder and devotee — merge completely. If you understand why this project exists, you understand Shravan. It is the product that no market analysis would have justified, no VC would have funded, and no growth metric can adequately measure. Its success is not in user numbers or revenue but in the moment when someone asks a question that has been weighing on their heart, and hears an answer in a voice that carries the warmth and wisdom of a teacher who dedicated his life to making ancient knowledge accessible to the modern world.

## Related
- [[prabhupada-and-iskcon]]
- [[shravan-tickoo]]
- [[building-philosophy]]
- [[design-philosophy]]
- [[subagent-driven-development]]
- [[claude-code-as-cto]]
- [[shortstack]]
