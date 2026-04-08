---
title: "Design Philosophy"
category: Learnings
created: 2026-04-08
updated: 2026-04-09
source: "CLAUDE.md design vocab, session patterns, project aesthetics, LinkedIn posts (436 design/UX posts); MPM session notes PDF Week 4"
tags: [design, aesthetics, ui, ux, philosophy, product-thinking]
visibility: public
---

> Shravan's design language: premium, breathing, hierarchical -- never generic AI slop.

## Context

Shravan is not a designer by training, but he has unusually strong aesthetic opinions and a specific vocabulary for communicating them — a vocabulary that has been refined across dozens of shipping sessions into something that functions less like a mood board and more like an engineering contract. He expects Claude to operate as a "90th percentile designer" and maintains per-project DESIGN-LANGUAGE.md files that capture the visual identity of each build. Across 436 LinkedIn posts on design and UX, he teaches design thinking as a core PM skill — not an optional nice-to-have but a foundational competency that separates complete operators from incomplete ones. He curates articles about the psychology of design alongside product strategy, because in his view they are inseparable: a product that works perfectly but looks generic has already lost the user's trust before they interact with it.

## Details

### The Vocabulary

The story of Shravan's design vocabulary is the story of a PM who needed to communicate visual intent to AI tools with enough precision that the output matched the vision in his head. Every term evolved through trial and error across real projects — tested, refined, and kept only if it reliably produced the right result.

When he says **"breathing room,"** he means more padding — let elements breathe, stop crowding. The instruction emerged from a pattern in early Claude Code sessions where AI-generated interfaces packed elements too tightly, creating layouts that were technically correct but visually suffocating. "Breathing room" became the shorthand that reliably produced the desired result: generous margins, comfortable line heights, and the kind of whitespace that makes a screen feel calm.

**"Premium"** means bigger type, lighter font weight, and generous whitespace. This is the aesthetic of products that cost money — not loud or attention-grabbing, but quietly confident. The reference points are brands like Stripe and Apple, where every pixel of padding earns its place and the typography alone communicates quality.

**"Like Linear"** calls for high information density with monospace accents and a muted color palette. Linear proved that density and beauty are not in tension — you can show a lot of data on a single screen without it feeling overwhelming, if the typography is right and the palette is restrained. This instruction appears most often for dashboard and admin interfaces where operators need to see many data points simultaneously.

**"Like Stripe"** demands perfect typography, whitespace, and subtle depth through box-shadows rather than borders. Stripe's design is the proof that whitespace is not wasted space but the most powerful organizational tool in a designer's arsenal.

**"Needs hierarchy"** means one element must be roughly three times bigger than everything else — visual dominance, not democracy. When every element on a screen is the same size, nothing matters. When one element is three times larger, the user's eye knows exactly where to go.

And **"AI slop"** is the anti-pattern: generic, safe, bland output that could have come from any prompt. The instruction when something feels like AI slop is always the same — go bolder, go more specific. Replace generic gradients with a defined color palette. Replace rounded cards with a layout that has one clear focal point. Replace safe symmetry with deliberate visual weight.

These are not casual references. "Make it feel like Linear" is a precise engineering instruction with measurable output, not a mood board suggestion. Each term has been tested across multiple projects and refined based on whether the output matched the intent.

### Design Benchmarks

Four companies serve as calibration points across his work, and each represents a different dimension of design excellence. **Linear** is the gold standard for dense, functional UI — proof that high information density and beauty are not in tension, that a project management tool can show dozens of issues on a single screen and still feel elegant. **Stripe** is the gold standard for typography and whitespace, where the documentation alone is a masterclass in information design and every page feels like it was designed by someone who cares about the reader's experience at a molecular level. **Superhuman** is referenced for its obsessive pursuit of product-market fit through design quality; Shravan recommends "How Superhuman Built an Engine to Find Product/Market Fit" as essential reading because it demonstrates that design quality is not just aesthetics but a competitive moat. **Spotify** gets deconstructed in a dedicated session on his YouTube channel, studying how design decisions at scale shape user behavior and how algorithmic personalization becomes itself a design choice. **TikTok** is studied through Eugene Wei's "TikTok and the Sorting Hat," examining how algorithmic design becomes the product itself — the algorithm is not a feature of TikTok, it is TikTok.

### Design as Psychology

Shravan sees design as applied psychology, not decoration, and his recommended reading reveals this lens with clarity. "The Psychology of Design" from A List Apart appears in every article list he has shared since 2022 — the piece that made explicit what he had always intuited: that every design decision is a psychological intervention, whether the designer intends it or not.

"In Defense of Eye Candy" represents his pushback against purely utilitarian design. He argues that beauty itself is functional, that aesthetics build trust before a user reads a single word. When a user lands on a page that looks premium, they are more willing to enter their email, more likely to trust the information, more patient with loading times. The "eye candy" is not cosmetic — it is the trust layer.

"The Scientists Who Make Apps Addictive" is studied not to deploy addictive patterns blindly but to understand the emotional levers products pull. A PM who does not understand behavioral hooks will accidentally create them or accidentally prevent them — neither is acceptable.

"Your Life is Driven by Network Effects" extends design thinking to the systems level, beyond individual screens and into the architecture of how products create and capture value.

"Replacing the User Story with the Job Story" reflects his preference for Jobs-to-be-Done framing over traditional user stories, which fundamentally shapes how he designs product surfaces. Instead of "As a user, I want to..." the framing becomes "When I am in this situation, I want to... so I can..." — a shift that keeps the design anchored in context rather than persona.

### Design Thinking as a PM Core Skill

He teaches two dedicated "Design Thinking for Product Managers" sessions on his YouTube channel and recommends a canon of foundational books: *Don't Make Me Think* by Steve Krug as the accessibility-first bible, *The Design of Everyday Things* by Don Norman ("still a classic, will always be a classic"), *The Design Thinking Playbook* by Michael Lewrick, *100 Things Every Designer Needs to Know About People* by Susan Weinschenk, and *About Face: The Essentials of Interaction Design* by Alan Cooper.

He also teaches wireframing as a PM skill with a dedicated YouTube video, believing that product managers should be able to communicate design intent visually, not just describe it in words. The conviction is clear: a PM who cannot sketch a wireframe, who cannot point to the specific element on a screen that matters most, who cannot articulate why one layout serves the user better than another — that PM is missing a dimension of their craft.

### Gamification and Design

His love of simulation games — Age of Empires, strategy titles — connects directly to his design philosophy. He recommends "How to use game design to improve your product" (lessons from Yu-Kai Chou) and sees product design as fundamentally game-like: "There is no end, there is no winning. Playing the game, not winning it, is the point." The insight extends beyond gamification mechanics. Games teach progression systems, reward timing, difficulty curves, and the art of making the player feel competent while always challenging them to grow — all of which apply directly to product design.

### Anti-Patterns

The anti-patterns are as clearly defined as the positive vocabulary, and Shravan is unsparing about them. Generic gradients and rounded cards are AI slop — the visual equivalent of a cover letter that could be addressed to any company. Every element rendered at the same size means no hierarchy, which means no guidance for the user's eye, which means confusion dressed up as simplicity. Tight spacing everywhere is suffocating, not dense — there is a critical difference between Linear's elegant density and a page that simply crams too much into too little space. Copy-pasted case studies with no unique insight are the design equivalent of content without context. Each anti-pattern is a specific warning, not a vague complaint, and each has a specific fix.

### The Design Sprint as Taught in the Cohort

The Week 4 session notes reveal that Shravan teaches a full five-day design sprint methodology adapted for PM teams, drawing on the Google Ventures sprint model but reframed through his own lens. Monday focuses on revisiting the product value template and using empathy maps to pinpoint the one or two most critical problem areas — not the full list, but the ones that matter most right now. Tuesday is for ideation using techniques like the "crazy eights" method — generating multiple sketches rapidly, favoring volume over polish, because the best ideas often emerge from the thirtieth sketch, not the first. Wednesday is for collaborative evaluation through dot voting, speed critiques, or heat maps, with the PM or executive serving as the "decider" who breaks deadlocks — a role that requires judgment, not authority. Thursday is prototype development with close designer-PM collaboration. Friday is beta testing with real users to gather feedback on whether the design meets the previously defined need.

Shravan presents this not merely as a design methodology but as a "product sprint" that mirrors the iterative nature of real product development. The design sprint is the same muscle as the product sprint — rapid iteration, tight feedback loops, and the discipline to kill ideas that do not survive contact with users.

He also teaches a progression in design fidelity — from hand sketches (fast, flexible, ideal for internal ideation), through wireframes (structure and layout without visual polish), to mockups and interactive prototypes that approach the final product. The key insight is the interactivity-fidelity matrix: as fidelity increases, designs become more polished but less flexible. The choice of fidelity level at each stage is itself a product decision — spending time on high-fidelity mockups for a concept that has not been validated is waste, while using hand sketches to communicate a finalized design to engineers is ambiguity. For digital tools, he recommends InVision for clickable prototypes and evaluates tools on pre-built assets, ease of sharing, and time efficiency. AI is positioned as a refinement assistant — useful for enhancing copy or streamlining layout ideas — but explicitly not a substitute for the creative, conceptual input of a human designer or PM. The narrative and strategic decisions must remain human-driven.

A particularly notable exercise from the Week 4 notes involves students designing an app for "finding an ideal partner safely in a new city." Teams must articulate three sets of instructions separately: conceptual design (what elements should exist), information design (how information is structured on each screen), and interaction design (what happens when you touch each element). The exercise forces students to think in design layers before touching any tool, reinforcing that design articulation is a PM skill distinct from visual craft. You do not need to be a designer, but you must communicate design intent at each layer — and the students who learn this distinction produce dramatically better products.

### Design System Approach

Each project gets its own DESIGN-LANGUAGE.md file to capture project-specific aesthetics — a living document that ensures consistency across sessions and across time. CSS custom properties handle theming, allowing the same component to express different visual identities across projects. The build philosophy demands mobile-first layouts, 44px minimum touch targets, and dark mode support. Every component must account for four states: loading, empty, error, and success — the happy path alone is never done, because users spend more time in non-happy-path states than designers imagine. For the emerging frontier of AI interfaces, he recommends "Shape of AI" (50+ AI UX patterns) and "Agentic UX Patterns" for human-AI interaction design.

### The WhatsApp UX Case Study

He consistently recommends studying WhatsApp's UX-driven approach to fake news detection as an example of how design can solve systemic problems, not just cosmetic ones. WhatsApp did not solve misinformation with algorithms or content moderation teams. They solved it with design — limiting forwarding, labeling forwarded messages, reducing the friction of reporting. Design at its best is not about screens — it is about systems. This case study is his go-to example for teaching students that the deepest design problems cannot be solved at the visual layer.

### Design Philosophy in Practice: Project-by-Project Examples

Each of Shravan's shipped projects embodies different facets of the design philosophy, making the portfolio itself a case study in applied design thinking.

**[[prabhupada-ai]]** demonstrates the principle that design must serve the actual user, not the imagined user. The audience is elderly devotees aged 60-75. This led to a 16px minimum body text rule from the start (because retrofitting larger text is significantly more work than designing for it upfront), a single bright "Devotional Light" theme in cream and royal blue (dark mode was added and removed in the same session because for this audience it eliminates testing complexity for minimal benefit), and 44px minimum touch targets throughout. The Scripture Source Graph — an interactive d3-force SVG that visualizes scripture sources as clickable nodes around the user's question — replaced a flat list, using visual hierarchy to make complex citation networks navigable. The design decisions are "premium" in the Stripe sense (generous whitespace, careful typography) but filtered through the needs of a devotional application where trust and warmth matter more than information density.

**[[predict-my-layoff]]** demonstrates the opposite end of the spectrum: design as a viral mechanic. The output format was deliberately designed for LinkedIn screenshots — clean, quotable, and alarming enough that people feel compelled to share. The four-hook engagement model (fear, debate, solidarity, brag) generates different visual treatments based on score range, each optimized for a different emotional pattern. The methodology page was redesigned to replace raw weight numbers with colored pill labels and credit score analogies — turning technical transparency into something a non-technical user finds both understandable and shareable. The 78% accuracy statistic, which had been buried at line 700 where nobody would see it, was moved to position two in the Trust Bar. This single change — information architecture, not visual design — was the highest-leverage design decision in the entire product. It exemplifies the [[four-layers-of-design]] teaching: the deepest design problems are rarely visual.

**[[builders-bible]]** demonstrates "premium" design at book scale. The 700+ page free book at build.rethinksystems.in uses MDX and Next.js 16 with section pagination, 3D diagram styling, and a custom landing page. The PDF version features a clickable table of contents with CSS leader dots and `target-counter` page numbers, plus a premium dark gradient book cover rendered entirely in CSS. The email gate overlay uses Framer Motion staggered animations. The most instructive design bug was that `backdrop-filter: blur()` on the sticky header silently broke `position: fixed` on the mobile drawer — a CSS specification behavior where backdrop-filter creates a containing block that confines fixed-position descendants. The fix (`createPortal(document.body)`) established a pattern: any component rendering fixed-position overlays inside a parent with visual CSS effects should default to portals from the start. This is "needs hierarchy" in practice — one element (the gate overlay) must dominate the screen, and CSS containment rules must not prevent it.

**[[rethink-dashboard]]** demonstrates the "like Linear" end of the design vocabulary: high information density with monospace accents and a muted palette. As an internal ed-tech platform for managing cohorts, students, and mentors, the information density requirement is genuine — administrators need to see many data points simultaneously without scrolling. The design challenge is making density beautiful rather than suffocating, which is exactly the distinction Linear achieves and that Shravan references when specifying this aesthetic.

### The Four Layers Applied to Teaching

Shravan's design teaching in the MPM cohort — the [[four-layers-of-design]] framework — is itself a demonstration of how he applies design philosophy to non-visual domains. He teaches conceptual design (what elements should exist), information design (what the user sees first, second, and third), interaction design (what happens when the user touches the product), and visual design (how things look) as a strict hierarchy where the deepest design mistakes happen at the conceptual level, not the visual level.

The most memorable teaching examples come from real product teardowns conducted live during the cohort. The Swiggy menu-selector exercise asks students to diagnose whether a drop in average orders per user is a conceptual, visual, or interactional problem. The class splits three ways and Shravan does not resolve the split — the pedagogical intent is to develop judgment, not provide answers. The Duolingo walkthrough examines every celebration animation, error sound, and progress bar as interaction design serving a specific behavioral purpose. The FMCG label analysis reveals that "25g protein" on the front of a protein bar is an information design choice driven by persona research, while the expiry date on the back is an information design choice driven by business incentive — and when a student objects that this is unethical, Shravan redirects: "The questions you are asking are about ethics, not design. Both matter, but they are different."

The Whoop and Ultra Human teardowns are the sharpest demonstration of "design as filter." Both websites open with metrics language — HRV, strain, recovery scores. If you do not know what HRV is, you are not their persona, and the information design has no interest in making itself accessible to you. This is the opposite of "breathing room" — it is deliberate exclusion as a design choice, and Shravan teaches it without judgment, because understanding a design choice requires separating what it does from whether you approve of it. The circle exercise in the visual design session drives this home: four overlapping circles of different sizes and colors, and students cannot agree on which is most important. The exercise reveals the interpretive divergence inherent in visual design — if trained PM students cannot agree on which circle matters most, the designer must make the hierarchy unmistakable.

### Design Vocabulary as Engineering Contract

What makes Shravan's design vocabulary distinctive is that it functions as an engineering contract, not a mood board. When "like Stripe" appears in a Claude Code session, it triggers specific implementation decisions: generous padding (16-24px between elements), a constrained type scale (likely Inter or system font at 14-16px body), subtle depth through box-shadows rather than borders, and whitespace as the primary organizational element. When "needs hierarchy" appears, it means measuring the largest element and ensuring it is roughly three times bigger than the next largest. When "AI slop" is flagged, the response is always to go bolder and more specific — replace generic gradients with a defined color palette, replace rounded cards with a layout that has one clear focal point, replace safe symmetry with deliberate visual weight.

This vocabulary evolved from the practical need to communicate design intent to AI tools. Shravan is not a designer by training — he is a PM who builds with Claude Code. The vocabulary bridges the gap between his aesthetic sensibility and the implementation layer, turning subjective preferences into measurable instructions. Each term has been tested across multiple projects and refined based on whether the output matched the intent. It is a living design system expressed in natural language rather than Figma tokens, and it works because the terms are precise enough to be falsifiable: you can look at a screen and objectively determine whether it has "breathing room" or not. This precision is what makes a PM without design training capable of directing the visual output of AI-generated interfaces to a standard that rivals what trained designers produce.

## Impact

Design is not decoration for Shravan — it is credibility. A well-designed product teaches trust before the user reads a word. He believes "eye candy" has functional value, that psychology drives every pixel, and that PMs who cannot think in design are incomplete operators. This philosophy shapes every frontend decision across his projects — from PrabhupadaAI's elderly-first accessibility to Predict My Layoff's viral screenshot optimization to the Builder's Bible's premium PDF rendering. Every curriculum choice at [[rethink-systems]] reflects the conviction that design thinking is a core PM competency, not an optional workshop. The vocabulary is the implementation layer: when a term like "breathing room" or "like Stripe" appears in a session, it carries the full weight of this philosophy behind it, and the projects in the portfolio are the proof that the vocabulary produces real results.

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
