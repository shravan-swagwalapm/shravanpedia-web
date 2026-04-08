# Shravanpedia Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build a Wikipedia-style static website that reads markdown articles from ~/ProductBrain/Shravanpedia/ and deploys to Vercel.

**Architecture:** Next.js 16 App Router with static export. Content pipeline reads Obsidian vault at build time, filters by visibility: public frontmatter, resolves wiki-links, computes backlinks, and generates static pages. Fuse.js for client-side search. Tailwind for styling.

**Tech Stack:** Next.js 16, Tailwind CSS, gray-matter, unified/remark/rehype, Fuse.js, TypeScript

**Spec:** docs/superpowers/specs/2026-04-08-shravanpedia-website-design.md
**Design Mockup:** ~/ProductBrain/Shravanpedia/.superpowers/brainstorm/*/content/full-design-v2.html

---

## Phase 1: Foundation (Tasks 1-3)

### Task 1: Project Scaffolding

**Files:** package.json, tsconfig.json, next.config.ts, tailwind.config.ts, .gitignore, lib/types.ts, lib/categories.ts

- [ ] Step 1: Initialize Next.js project with create-next-app (TypeScript, Tailwind, App Router)
- [ ] Step 2: Install deps: gray-matter, unified, remark-parse, remark-gfm, remark-rehype, rehype-stringify, rehype-slug, rehype-autolink-headings, fuse.js, reading-time, unist-util-visit
- [ ] Step 3: Set next.config.ts output to export with unoptimized images
- [ ] Step 4: Configure tailwind.config.ts with custom colors (CSS vars), fonts (Inter, Newsreader, JetBrains Mono), shadows, spacing
- [ ] Step 5: Create lib/types.ts with Article, Heading, Backlink, CategoryMeta, SearchEntry interfaces
- [ ] Step 6: Create lib/categories.ts with 7 category definitions (name, slug, color, bgColor, description)
- [ ] Step 7: Update .gitignore to exclude out/, public/images/, public/og/
- [ ] Step 8: Commit

### Task 2: Content Pipeline Core

**Files:** lib/wiki.ts

- [ ] Step 1: Create lib/wiki.ts with vault reader, frontmatter parser, public article filter, backlink builder, search index generator. Key functions: getAllArticles(), getBacklinks(), getArticle(), getArticlesByCategory(), getCategoryCounts(), getFeaturedArticle(), getSearchIndex(). Uses SHRAVANPEDIA_PATH env var defaulting to ~/ProductBrain/Shravanpedia. Excludes SCHEMA.md, index.md, log.md, .superpowers/. Default visibility is private. Build warnings use process.stderr.write (not logger).
- [ ] Step 2: Commit

### Task 3: Markdown Rendering Pipeline

**Files:** lib/markdown.ts

- [ ] Step 1: Create lib/markdown.ts with unified pipeline: remarkParse -> remarkGfm -> remarkWikiLinks (custom plugin) -> remarkRehype -> rehypeSlug -> rehypeAutolinkHeadings -> rehypeStringify. The remarkWikiLinks plugin resolves [[slug]] to public links, private spans, or missing spans based on the slug map. Also extracts h2/h3 headings from rendered HTML for TOC.
- [ ] Step 2: Commit

## Phase 2: Design System + Layout (Tasks 4-5)

### Task 4: Design System

**Files:** app/globals.css

- [ ] Step 1: Replace globals.css with full design system: CSS custom properties for light/dark themes, all 7 category color pairs, wiki-link styles (public=highlight underline, private=dashed gray, missing=dashed red), article body typography (h2/h3/p/ul/blockquote/table/code), reading progress bar, reduced motion support, focus-visible outlines, table overflow wrapper
- [ ] Step 2: Commit

### Task 5: Root Layout + Header + Sidebar

**Files:** components/Header.tsx, components/Sidebar.tsx, components/ThemeToggle.tsx, app/layout.tsx

- [ ] Step 1: Create ThemeToggle.tsx — client component, reads localStorage/prefers-color-scheme, toggles data-theme attribute, sun/moon icons
- [ ] Step 2: Create Header.tsx — sticky, frosted glass (backdrop-blur), gradient S logo mark, nav links (Browse, Categories, Random), search trigger button with Cmd+K hint, ThemeToggle
- [ ] Step 3: Create Sidebar.tsx — 248px, sticky, shows Navigation (Home, All Articles), Categories (color dots + counts, only non-empty), About box, optional TOC section (for article pages, with scroll-spy-ready anchor links, h3s indented)
- [ ] Step 4: Create app/layout.tsx — Google Fonts links, inline theme init script, skip-to-content link, ClientShell wrapper (from Task 11)
- [ ] Step 5: Commit

## Phase 3: Pages (Tasks 6-10)

### Task 6: Home Page

**Files:** components/FeaturedArticle.tsx, components/RecentlyUpdated.tsx, components/CategoryCard.tsx, app/page.tsx

- [ ] Step 1: Create FeaturedArticle.tsx — card with gradient left accent, avatar monogram circle, category badge, summary text, animated read-more arrow on hover
- [ ] Step 2: Create RecentlyUpdated.tsx — list of 5 articles with category color dots, relative dates (today/yesterday/Xd ago)
- [ ] Step 3: Create CategoryCard.tsx — tinted background per category color, colored top bar, count badge, description
- [ ] Step 4: Build app/page.tsx — hero section (gradient title, serif subtitle, stat chips), featured article + recently updated grid, divider, category grid 3-col. Empty state if no public articles.
- [ ] Step 5: Test build with 1+ public articles
- [ ] Step 6: Commit

### Task 7: Article Page

**Files:** app/[category]/[slug]/page.tsx, components/ReadingProgress.tsx, components/RelatedPills.tsx, components/Backlinks.tsx

- [ ] Step 1: Create ReadingProgress.tsx — client component, fixed bar below header, gradient fill, updates width on scroll
- [ ] Step 2: Create RelatedPills.tsx — flex-wrap pill buttons from Related section wiki-links, white bg + border, hover lifts with accent tint
- [ ] Step 3: Create Backlinks.tsx — "Linked from X articles" section, each with category dot + link + context snippet. Hidden if no backlinks.
- [ ] Step 4: Build app/[category]/[slug]/page.tsx — generateStaticParams from all public articles, generateMetadata with OG tags, page renders: meta line (category badge + date + reading time), title, serif summary with gradient border, article body HTML, backlinks, related pills. TOC passed to sidebar.
- [ ] Step 5: Test with a public article
- [ ] Step 6: Commit

### Task 8: Category Page

**Files:** app/category/[name]/page.tsx

- [ ] Step 1: Build category listing — generateStaticParams from category counts, header with color dot + name + count badge + description, article cards sorted by updated date, each showing title + summary + date + reading time + tags. Empty state for categories with no public articles. 404 for unknown categories.
- [ ] Step 2: Commit

### Task 9: Search Modal

**Files:** components/SearchModal.tsx, app/search/page.tsx

- [ ] Step 1: Create SearchModal.tsx — client component, Fuse.js fuzzy search (title weight 3, summary 2, tags 2, body 1), backdrop blur overlay, input with icon, result count hint, results with category dots + badges + preview, keyboard nav (up/down/enter/esc), footer with key hints. Opens/closes via props.
- [ ] Step 2: Create app/search/page.tsx — all articles listing page as fallback for direct URL
- [ ] Step 3: Commit

### Task 10: Random + 404

**Files:** app/random/page.tsx, app/not-found.tsx

- [ ] Step 1: Create random page — server component, picks random public article, redirect()
- [ ] Step 2: Create 404 page — "This article doesn't exist or is private" with back link
- [ ] Step 3: Commit

## Phase 4: Integration + Polish (Tasks 11-12)

### Task 11: Wire Search Modal Globally

**Files:** components/ClientShell.tsx, app/layout.tsx update, components/Header.tsx update

- [ ] Step 1: Create ClientShell.tsx — client component wrapping children, manages search modal open state, global Cmd+K keybinding, passes search index to SearchModal, provides hidden trigger button for Header
- [ ] Step 2: Update app/layout.tsx — fetch searchIndex via getSearchIndex(), wrap children in ClientShell with searchIndex prop
- [ ] Step 3: Update Header.tsx — search button onClick triggers hidden search-trigger button via DOM
- [ ] Step 4: Test full flow: home, articles, search, dark mode, random
- [ ] Step 5: Commit

### Task 12: Deploy Pipeline + Initial Public Articles

**Files:** package.json update

- [ ] Step 1: Add deploy script to package.json: "next build && npx vercel deploy --prod ./out"
- [ ] Step 2: Mark 3-5 articles as visibility: public in vault frontmatter
- [ ] Step 3: Run npm run build — verify out/ directory created with correct static pages
- [ ] Step 4: Test locally with npx serve out
- [ ] Step 5: Commit

---

## Summary

| Phase | Tasks | Delivers |
|-------|-------|----------|
| Foundation | 1-3 | Scaffolding, content pipeline, markdown rendering |
| Design + Layout | 4-5 | CSS system, header, sidebar, root layout |
| Pages | 6-10 | Home, article, category, search, random, 404 |
| Integration | 11-12 | Search wiring, deploy pipeline |

**Total: 12 tasks, ~40 steps.**

After all tasks complete, the website reads from the Obsidian vault, renders public articles with wiki-link resolution and backlinks, provides Cmd+K search, supports dark mode, and deploys to Vercel with one command.
