---
title: "The Four Layers of Design"
category: Learnings
created: 2026-04-09
updated: 2026-04-09
source: "MPM Cohort transcripts, Week 4 Sessions 1-2"
tags: [design, frameworks, teaching, product-management, ux]
visibility: public
---

> Conceptual, information, interaction, visual — the iceberg model Shravan teaches to make PMs think in design before they ever touch a tool.

## Context

In Week 4 of the MPM cohort, Shravan dedicates two full sessions to what he calls "Design Alchemy." While the existing wiki captures his design vocabulary and aesthetic benchmarks, this is something different: a structured pedagogical framework for how design actually works, layer by layer, from the most abstract concept to the final pixel. He teaches it through live product teardowns — Swiggy, Amazon, Edureka, Duolingo, Zepto, Ultra Human — moving between browser tabs, draw.io diagrams, and the Zoom chat in real time. It is his most tactile, example-driven teaching, and it produces the most student engagement of any week.

## Details

### Layer 1: Conceptual Design

The first and deepest layer is conceptual design — the elements you believe should exist in a solution when nothing has been given to you. Shravan demonstrates this by asking a student to describe, from memory, what a food ordering app needs. The student lists: type of food, price, delivery time, images, ratings, whether the dish is new. Then Shravan opens Swiggy and maps every element the student named to the actual interface. That mapping — from a napkin-sketch intuition to a real product — is conceptual design. It is what you draw on a handkerchief in a coffee shop. No wireframes, no tools, just the fundamental hypothesis about what the product should contain.

The conceptual layer is also where the hardest design mistakes happen. In the Swiggy breakout room exercise, Shravan gives students a scenario: a new menu-selector feature was introduced, and average orders per user dropped from five to three per month. Students must diagnose whether the problem is conceptual (the feature itself impedes the basic flow of ordering), visual (it does not look right), or interactional (the mechanics of using it are flawed). The debate reveals that some students think the concept is sound but the implementation is poor, while others argue the concept itself disrupted familiar scrolling behavior that generated impulse purchases. Shravan does not resolve the debate — the point is to show how much divergence exists even among trained operators, which is precisely why design is hard.

### Layer 2: Information Design

Information design is the structure of information on a page and across a site. It governs what the user sees first, second, and third. Shravan teaches this by walking through real websites. On Amazon, the iPhone banner appears in the first fold because Amazon knows that is the highest-value real estate. On Rethink Systems' own site, Shravan's photo and "200+ people have received offers" are at the top because that is the information that converts visitors into applicants. If the instructor photo were buried at the bottom, conversion would collapse.

Information design also includes site structure — how many clicks it takes to reach a destination. Edureka's three-click journey from homepage to category to course page is an information architecture decision. Shravan then shows Unstop's approach, which surfaces intent categories (internships, mentorship, jobs, competitions) on the first screen rather than products, because their audience needs directional guidance more than course listings.

He pushes the framework into physical products: FMCG labels are information design. Protein bars put "25g protein" on the front because that is what their persona checks. Products with low carbs but unremarkable protein lead with "only 5g carbs." And the expiry date? It is always on the back because the brand does not want you to see it first — it is a conscious information design choice driven by business incentive, not user empathy. When a student objects that this is unethical, Shravan does not disagree but redirects: "The questions you are asking are about ethics, not design. Both matter, but they are different."

The Whoop and Ultra Human teardowns are the sharpest examples. Both websites open with metrics language — HRV, strain, recovery scores. If you do not know what HRV is, you are not their persona, and they have no interest in making the information accessible to you. The information design is a filter, not a welcome mat.

### Layer 3: Interaction Design

Interaction design governs what happens when a user touches the product. Shravan makes this tangible by opening Duolingo in the browser and clicking through a Japanese lesson. Every animation — the celebration when an answer is correct, the error sound when it is wrong, the progress bar filling, the transition between screens — is interaction design. He then shifts to Paytm: the sound "500 rupees received on Paytm" is interaction design serving a specific purpose. It is not for the person who sent the money. It is for the grocery store owner who cannot track 600 daily transactions — the sound confirms the payment happened so the merchant can proceed without checking a screen.

He distinguishes interaction design from the layers beneath it: a wireframe (information design) shows what elements exist on a page but says nothing about what happens when you click a button. Interaction design starts with a flowchart — if I click the payment button, I go to the checkout page — and then adds the specifics of transitions, animations, sounds, and feedback. This is where UX designers take the PM's wireframe and bring it to life.

### Layer 4: Visual Design

The outermost layer is visual design — how things look. Shravan teaches six elements: color, font, typography (spacing and legibility), graphics, style guides (brand consistency), and layout grid (the structural skeleton of a page). He demonstrates responsive design using Chrome's device inspector, showing how Edureka's page transforms from a 16-inch MacBook layout to an iPhone SE layout.

But the most memorable teaching moment comes from the circle exercise. Shravan shows four overlapping circles of different sizes and colors and asks students to rank them by importance. The results are wildly divergent: some rank by size, some by color, some by position, some by a combination. One student applies Whoop's ring-tracking color scheme. Another uses web-safe color theory. Shravan reveals that the exercise was deliberately ambiguous — its purpose was to demonstrate how much interpretive divergence exists in visual design. If trained PM students cannot agree on which circle is most important, how can you expect an end user to click where you want them to? That is why design is not decoration; it is the discipline of managing human perception under uncertainty.

### The Thread Through the Layers

The layers are taught sequentially — conceptual first, visual last — because Shravan believes the deepest design mistakes happen at the conceptual level, not the visual level. A beautifully designed feature built on a flawed concept will fail. But a conceptually sound feature with rough visuals can succeed and be polished later. This mirrors his broader product philosophy: substance before surface, always.

## Impact

The Four Layers framework gives PM students a structured way to think about design decisions without needing to become designers. When they review a feature, they can ask: is the concept wrong, is the information structured poorly, is the interaction confusing, or is it just visually unappealing? Each diagnosis leads to a different type of fix. Shravan considers this one of the most practical frameworks in the entire curriculum, because PMs who cannot communicate design intent are, in his words, "incomplete operators."

## Related
- [[design-philosophy]]
- [[product-management-philosophy]]
- [[teaching-and-mentoring]]
