---
title: "Builder's Bible"
category: Projects
created: 2026-04-08
updated: 2026-04-09
source: "vault project files, build.rethinksystems.in, session journals (3 sessions, March 2026)"
tags: [project, book, teaching, content]
visibility: public
---

> A 700+ page free book on engineering + AI — the long-form expression of Shravan's teaching mission.

## Context

The **Builder's Bible** is what happens when a PM who taught himself to build decides to write down everything he learned. It is free, it is massive, and it is the backbone of [[the-swagwala-pm]]'s credibility as a teacher. More than a reference manual, it is a statement of intent: knowledge this valuable should not live behind a paywall.

## Details

### What It Is

The Builder's Bible spans over 700 pages covering engineering fundamentals and AI-assisted development. It is hosted at **build.rethinksystems.in** and built with MDX and Next.js 16 on Vercel, featuring section pagination, 3D diagram styling, and a custom landing page. The technical depth is real — this is not a curated link collection but original material written from the experience of actually shipping production software.

### Why It's Free

The decision to keep the Bible free is rooted in the same spiritual foundation that drives [[prabhupada-ai]] — teaching as service. But it is also strategically sound. The book builds credibility for the @TheSwagWalaPM brand, and that credibility feeds workshops, which feed the channel, which feeds the book. Giving away the content creates a flywheel where every piece of the system makes the others stronger.

### The Build Story

The first session tells the whole story. All 61 markdown files -- 34 chapters plus frontmatter, backmatter, and projects -- were written and assembled in a single sitting, orchestrated through 20+ parallel agents. The total output was 198,000 words, roughly 792 pages. The PDF was generated through WeasyPrint, which exposed an instructive split: the Python API could not find Homebrew's native libraries, but the CLI worked perfectly. A clickable table of contents with CSS leader dots and `target-counter` page numbers was added, along with a premium dark gradient book cover rendered entirely in CSS. Double `break-before` rules (one on the section, one on the h1) created blank pages between sections -- a non-obvious CSS interaction that required testing with a small preview before applying to all 61 files.

The home directory was initially the git root, which caused `Downloads/` to leak into the repository push -- a mistake that reinforced the principle of always initializing git inside the project directory.

### The Email Gate

A subsequent session added an email gate for lead capture. The implementation used capture-phase click interception on all CTAs, a full-page editorial overlay with Framer Motion staggered animations, and a Supabase upsert on the backend. The most instructive bug was that `backdrop-filter: blur()` on the sticky header silently broke `position: fixed` on the mobile drawer. Per CSS specification, backdrop-filter creates a containing block that confines fixed-position descendants -- no error, no warning, the drawer simply disappeared inside the 56-pixel header. The fix was `createPortal(document.body)` with a mounted guard for SSR safety. This is a pattern worth remembering: any component rendering fixed-position overlays inside a parent with visual CSS effects (blur, transforms, filters) should default to portals from the start.

### The Systems Bible Spinoff

The same build pipeline was reused to produce "The Systems Bible -- Shravan Edition," a personalized 640-page learning book covering ML fundamentals, infrastructure, API design, and state machines. Nine parallel agents produced consistent output because each received the exact style reference from Chapter 1, project context from the vault, and a clear structure template. One agent was lost to context compaction mid-session -- a lesson that for books this large, agents should be batched in groups of three to four per wave to avoid context pressure.

### Technical Patterns Learned

Building the Bible and its siblings taught hard lessons. **Tailwind v4 purging** behaves differently than expected -- data-attribute selectors survive the purge, but class-based selectors do not. SSR progressive enhancement was needed for section pagination. Vercel multi-account domains require TXT verification, and Cloudflare proxy must be turned off for Vercel SSL provisioning to work. **WeasyPrint** has a CLI-vs-API split where the CLI finds native libraries that the Python API cannot. **Framer Motion** ease arrays need `as const` assertion in TypeScript or they fail with a cryptic type error. These kinds of battle scars are what make the Bible's technical content credible.

### The Content Flywheel

The Bible sits at the center of a broader system: Builder's Bible (the book) feeds Claude Code Tooling (workshops), which feeds the Systems Builder Plan (personal learning), which feeds @TheSwagWalaPM (distribution). Each node strengthens the others, and the Bible is the heavyweight anchor that gives the whole cycle its gravity. See [[content-flywheel]] for the full picture.

## Impact

The Bible is the artifact that proves Shravan is not just a PM who uses AI to code — he understands what he is building deeply enough to teach it. That combination of doing and explaining is rare, and the 700+ pages are the evidence.

## Related
- [[the-swagwala-pm]]
- [[shravan-tickoo]]
- [[claude-code-as-cto]]
- [[design-philosophy]]
- [[subagent-driven-development]]
- [[content-flywheel]]
