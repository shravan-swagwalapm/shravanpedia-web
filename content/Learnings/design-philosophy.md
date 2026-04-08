---
title: "Design Philosophy"
category: Learnings
created: 2026-04-08
updated: 2026-04-09
source: "CLAUDE.md design vocab, session patterns, project aesthetics, LinkedIn posts (436 design/UX posts)"
tags: [design, aesthetics, ui, ux, philosophy, product-thinking]
visibility: public
---

> Shravan's design language: premium, breathing, hierarchical -- never generic AI slop.

## Context

Shravan is not a designer by training, but he has unusually strong aesthetic opinions and a specific vocabulary for communicating them. He expects Claude to operate as a "90th percentile designer" and maintains per-project DESIGN-LANGUAGE.md files that capture the visual identity of each build. Across 436 LinkedIn posts on design and UX, he teaches design thinking as a core PM skill -- not an optional nice-to-have but a foundational competency. He curates articles about the psychology of design alongside product strategy, because in his view they are inseparable.

## Details

### The Vocabulary

Shravan's design vocabulary is precise and maps directly to concrete CSS and layout decisions. When he says **"breathing room,"** he means more padding -- let elements breathe, stop crowding. **"Premium"** means bigger type, lighter font weight, and generous whitespace. **"Like Linear"** calls for high information density with monospace accents and a muted color palette. **"Like Stripe"** demands perfect typography, whitespace, and subtle depth. **"Needs hierarchy"** means one element must be roughly three times bigger than everything else -- visual dominance, not democracy. And **"AI slop"** is the anti-pattern: generic, safe, bland output that could have come from any prompt. The instruction when something feels like AI slop is always the same -- go bolder, go more specific.

These are not casual references. "Make it feel like Linear" is a precise engineering instruction with measurable output, not a mood board suggestion.

### Design Benchmarks

Four companies serve as calibration points across his work. **Linear** is the gold standard for dense, functional UI -- proof that high information density and beauty are not in tension. **Stripe** is the gold standard for typography and whitespace, where every pixel of padding earns its place. **Superhuman** is referenced for its obsessive pursuit of product-market fit through design quality; he recommends "How Superhuman Built an Engine to Find Product/Market Fit" as essential reading. **Spotify** gets deconstructed in a dedicated session on his YouTube channel, studying how design decisions at scale shape user behavior. **TikTok** is studied through Eugene Wei's "TikTok and the Sorting Hat," examining how algorithmic design becomes the product itself.

### Design as Psychology

Shravan sees design as applied psychology, not decoration. His recommended reading reveals this lens clearly. "The Psychology of Design" from A List Apart appears in every article list he has shared since 2022. "In Defense of Eye Candy" represents his pushback against purely utilitarian design -- he argues that beauty itself is functional, that aesthetics build trust before a user reads a single word. "The Scientists Who Make Apps Addictive" is studied not to deploy addictive patterns blindly but to understand the emotional levers products pull. "Your Life is Driven by Network Effects" extends design thinking to the systems level, beyond individual screens. And "Replacing the User Story with the Job Story" reflects his preference for Jobs-to-be-Done framing over traditional user stories, which fundamentally shapes how he designs product surfaces.

### Design Thinking as a PM Core Skill

He teaches two dedicated "Design Thinking for Product Managers" sessions on his YouTube channel and recommends a canon of foundational books: *Don't Make Me Think* by Steve Krug as the accessibility-first bible, *The Design of Everyday Things* by Don Norman ("still a classic, will always be a classic"), *The Design Thinking Playbook* by Michael Lewrick, *100 Things Every Designer Needs to Know About People* by Susan Weinschenk, and *About Face: The Essentials of Interaction Design* by Alan Cooper.

He also teaches wireframing as a PM skill with a dedicated YouTube video, believing that product managers should be able to communicate design intent visually, not just describe it in words.

### Gamification and Design

His love of simulation games -- Age of Empires, strategy titles -- connects directly to his design philosophy. He recommends "How to use game design to improve your product" (lessons from Yu-Kai Chou) and sees product design as fundamentally game-like: "There is no end, there is no winning. Playing the game, not winning it, is the point."

### Anti-Patterns

Generic gradients and rounded cards are AI slop. Every element rendered at the same size means no hierarchy. Tight spacing everywhere is suffocating, not dense -- there is a difference. Copy-pasted case studies with no unique insight are the design equivalent of content without context.

### Design System Approach

Each project gets its own DESIGN-LANGUAGE.md file to capture project-specific aesthetics. CSS custom properties handle theming. The build philosophy demands mobile-first layouts, 44px minimum touch targets, and dark mode support. Every component must account for four states: loading, empty, error, and success -- the happy path alone is never done. For the emerging frontier of AI interfaces, he recommends "Shape of AI" (50+ AI UX patterns) and "Agentic UX Patterns" for human-AI interaction design.

### The WhatsApp UX Case Study

He consistently recommends studying WhatsApp's UX-driven approach to fake news detection as an example of how design can solve systemic problems, not just cosmetic ones. Design at its best is not about screens -- it is about systems.

## Impact

Design is not decoration for Shravan -- it is credibility. A well-designed product teaches trust before the user reads a word. He believes "eye candy" has functional value, that psychology drives every pixel, and that PMs who cannot think in design are incomplete operators. This philosophy shapes every frontend decision across his projects and every curriculum choice at [[rethink-systems]]. The vocabulary is the implementation layer: when a term like "breathing room" or "like Stripe" appears in a session, it carries the full weight of this philosophy behind it.

## Related
- [[shravan-tickoo]]
- [[building-philosophy]]
- [[builders-bible]]
- [[product-management-philosophy]]
- [[books-and-reading]]
- [[four-layers-of-design]]
