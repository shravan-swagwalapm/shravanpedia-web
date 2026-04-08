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

### Design Philosophy in Practice: Project-by-Project Examples

Each of Shravan's shipped projects embodies different facets of the design philosophy, making the portfolio itself a case study in applied design thinking.

**[[prabhupada-ai]]** demonstrates the principle that design must serve the actual user, not the imagined user. The audience is elderly devotees aged 60-75. This led to a 16px minimum body text rule from the start (because retrofitting larger text is significantly more work than designing for it upfront), a single bright "Devotional Light" theme in cream and royal blue (dark mode was added and removed in the same session because for this audience it eliminates testing complexity for minimal benefit), and 44px minimum touch targets throughout. The Scripture Source Graph -- an interactive d3-force SVG that visualizes scripture sources as clickable nodes around the user's question -- replaced a flat list, using visual hierarchy to make complex citation networks navigable. The design decisions are "premium" in the Stripe sense (generous whitespace, careful typography) but filtered through the needs of a devotional application where trust and warmth matter more than information density.

**[[predict-my-layoff]]** demonstrates the opposite end of the spectrum: design as a viral mechanic. The output format was deliberately designed for LinkedIn screenshots -- clean, quotable, and alarming enough that people feel compelled to share. The four-hook engagement model (fear, debate, solidarity, brag) generates different visual treatments based on score range, each optimized for a different emotional pattern. The methodology page was redesigned to replace raw weight numbers with colored pill labels and credit score analogies -- turning technical transparency into something a non-technical user finds both understandable and shareable. The 78% accuracy statistic, which had been buried at line 700 where nobody would see it, was moved to position two in the Trust Bar. This single change -- information architecture, not visual design -- was the highest-leverage design decision in the entire product. It exemplifies the [[four-layers-of-design]] teaching: the deepest design problems are rarely visual.

**[[builders-bible]]** demonstrates "premium" design at book scale. The 700+ page free book at build.rethinksystems.in uses MDX and Next.js 16 with section pagination, 3D diagram styling, and a custom landing page. The PDF version features a clickable table of contents with CSS leader dots and `target-counter` page numbers, plus a premium dark gradient book cover rendered entirely in CSS. The email gate overlay uses Framer Motion staggered animations. The most instructive design bug was that `backdrop-filter: blur()` on the sticky header silently broke `position: fixed` on the mobile drawer -- a CSS specification behavior where backdrop-filter creates a containing block that confines fixed-position descendants. The fix (`createPortal(document.body)`) established a pattern that any component rendering fixed-position overlays inside a parent with visual CSS effects should default to portals from the start. This is "needs hierarchy" in practice -- one element (the gate overlay) must dominate the screen, and CSS containment rules must not prevent it.

**[[rethink-dashboard]]** demonstrates the "like Linear" end of the design vocabulary: high information density with monospace accents and a muted palette. As an internal ed-tech platform for managing cohorts, students, and mentors, the information density requirement is genuine -- administrators need to see many data points simultaneously without scrolling. The design challenge is making density beautiful rather than suffocating, which is exactly the distinction Linear achieves and that Shravan references when specifying this aesthetic.

### The Four Layers Applied to Teaching

Shravan's design teaching in the MPM cohort -- the [[four-layers-of-design]] framework -- is itself a demonstration of how he applies design philosophy to non-visual domains. He teaches conceptual design (what elements should exist), information design (what the user sees first, second, and third), interaction design (what happens when the user touches the product), and visual design (how things look) as a strict hierarchy where the deepest design mistakes happen at the conceptual level, not the visual level.

The most memorable teaching examples come from real product teardowns conducted live during the cohort. The Swiggy menu-selector exercise asks students to diagnose whether a drop in average orders per user is a conceptual, visual, or interactional problem. The Duolingo walkthrough examines every celebration animation, error sound, and progress bar as interaction design serving a specific behavioral purpose. The FMCG label analysis reveals that "25g protein" on the front of a protein bar is an information design choice driven by persona research, while the expiry date on the back is an information design choice driven by business incentive -- and when a student objects that this is unethical, Shravan redirects: "The questions you are asking are about ethics, not design. Both matter, but they are different."

The Whoop and Ultra Human teardowns are the sharpest demonstration of "design as filter." Both websites open with metrics language -- HRV, strain, recovery scores. If you do not know what HRV is, you are not their persona, and the information design has no interest in making itself accessible to you. This is the opposite of "breathing room" -- it is deliberate exclusion as a design choice, and Shravan teaches it without judgment, because understanding a design choice requires separating what it does from whether you approve of it.

### Design Vocabulary as Engineering Contract

What makes Shravan's design vocabulary distinctive is that it functions as an engineering contract, not a mood board. When "like Stripe" appears in a Claude Code session, it triggers specific implementation decisions: generous padding (16-24px between elements), a constrained type scale (likely Inter or system font at 14-16px body), subtle depth through box-shadows rather than borders, and whitespace as the primary organizational element. When "needs hierarchy" appears, it means measuring the largest element and ensuring it is roughly three times bigger than the next largest. When "AI slop" is flagged, the response is always to go bolder and more specific -- replace generic gradients with a defined color palette, replace rounded cards with a layout that has one clear focal point, replace safe symmetry with deliberate visual weight.

This vocabulary evolved from the practical need to communicate design intent to AI tools. Shravan is not a designer by training -- he is a PM who builds with Claude Code. The vocabulary bridges the gap between his aesthetic sensibility and the implementation layer, turning subjective preferences into measurable instructions. Each term in the vocabulary has been tested across multiple projects and refined based on whether the output matched the intent. It is a living design system expressed in natural language rather than Figma tokens, and it works because the terms are precise enough to be falsifiable: you can look at a screen and objectively determine whether it has "breathing room" or not.

## Impact

Design is not decoration for Shravan -- it is credibility. A well-designed product teaches trust before the user reads a word. He believes "eye candy" has functional value, that psychology drives every pixel, and that PMs who cannot think in design are incomplete operators. This philosophy shapes every frontend decision across his projects -- from PrabhupadaAI's elderly-first accessibility to Predict My Layoff's viral screenshot optimization to the Builder's Bible's premium PDF rendering. Every curriculum choice at [[rethink-systems]] reflects the conviction that design thinking is a core PM competency, not an optional workshop. The vocabulary is the implementation layer: when a term like "breathing room" or "like Stripe" appears in a session, it carries the full weight of this philosophy behind it, and the projects in the portfolio are the proof that the vocabulary produces real results.

## Related
- [[shravan-tickoo]]
- [[building-philosophy]]
- [[builders-bible]]
- [[product-management-philosophy]]
- [[books-and-reading]]
- [[four-layers-of-design]]
- [[prabhupada-ai]]
- [[predict-my-layoff]]
- [[rethink-dashboard]]
- [[claude-code-as-cto]]
- [[teaching-and-mentoring]]
