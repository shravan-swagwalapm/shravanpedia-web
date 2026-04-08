# Shravanpedia Website — Design Spec

> A Wikipedia-style personal knowledge wiki website for Shravan Tickoo, reading from the Obsidian vault at `~/ProductBrain/Shravanpedia/` and deploying as a static site to Vercel.

## Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Project location | `~/shravanpedia-web/` | Separate from vault, clean boundary |
| Deploy target | Vercel (static export) | Known stack, same as Builder's Bible |
| Design direction | Modern Wikipedia | Clean 2026 typography, warm, premium |
| Visibility model | Default private, opt-in public | Frontmatter `visibility: public` per article |
| Data sync | Build-time read from vault | Vault is source of truth, no duplication |
| Article layout | Left sidebar + TOC | Wiki-first navigation, scroll-spy |
| Dark mode | Light default, toggle available | CSS custom properties make this trivial |

## Tech Stack

- **Next.js 16** — App Router, static export (`output: 'export'`)
- **Tailwind CSS** — utility-first styling
- **gray-matter** — parse YAML frontmatter from markdown files
- **unified/remark/rehype** — markdown-to-HTML pipeline with custom plugins
- **Fuse.js** — client-side fuzzy search (no server needed)
- **Inter** (sans-serif body), **Newsreader** (serif quotes/summaries), **JetBrains Mono** (code)

Zero backend. Zero database. Pure static site.

## Architecture

```
~/ProductBrain/Shravanpedia/     (Obsidian vault — source of truth)
         │
         │  read at build time (SHRAVANPEDIA_PATH env var)
         ▼
~/shravanpedia-web/              (Next.js project)
  ├── lib/wiki.ts                content loading + filtering + link resolution
  ├── app/                       pages
  │   ├── page.tsx               home
  │   ├── [category]/[slug]/     article pages
  │   ├── category/[name]/       category listing
  │   ├── search/                search page (client-side)
  │   └── random/                redirect to random public article
  ├── components/                shared components
  └── out/                       static export output
         │
         │  vercel deploy --prod
         ▼
Vercel                           (public URL: shravanpedia.vercel.app)
```

### Deployment Flow

```bash
# One command to deploy
npm run deploy
# Which runs:
# 1. next build (reads vault, filters public, generates static pages)
# 2. vercel deploy --prod ./out
```

Build happens locally where the vault lives. Only static output goes to Vercel. No vault content in git. No CI/CD needed.

### Environment Variable

```bash
SHRAVANPEDIA_PATH=~/ProductBrain/Shravanpedia  # defaults to this
```

## Content Pipeline

### 1. Read Phase (`lib/wiki.ts`)

```
Read all .md files from SHRAVANPEDIA_PATH
  → Exclude: SCHEMA.md, index.md, log.md, files in .superpowers/
  → Parse YAML frontmatter with gray-matter
  → Filter: only articles with `visibility: public`
  → Fallback defaults:
     - Missing `visibility` → private (excluded)
     - Missing `title` → derive from filename (kebab-to-title)
     - Missing `category` → "Uncategorized"
     - Missing `created` → file stat birthtime
     - Missing `updated` → file stat mtime
```

### 2. Transform Phase (remark/rehype plugins)

```
Parse markdown body
  → Custom plugin: resolve [[wiki-links]]
     - Target is public article → <a href="/category/slug" class="wiki-link">Title</a>
     - Target is private → <span class="wiki-link-private" title="This article is private">Title</span>
     - Target doesn't exist → <span class="wiki-link-missing" title="Article does not exist">Title</span>
  → Custom plugin: resolve ![[image.md]] Obsidian image syntax
     - Copy referenced images to public/images/
     - Rewrite to standard <img> tags
  → remark-gfm (tables, strikethrough, task lists)
  → rehype-slug (add IDs to headings for TOC anchors)
  → rehype-autolink-headings (make headings linkable)
  → Extract headings for TOC generation
  → Calculate reading time (~200 wpm)
```

### 3. Generate Phase

```
For each public article → generate static page at /[category]/[slug]
For each category with public articles → generate listing at /category/[name]
Generate home page with: featured article, recently updated, category counts
Generate search index JSON (title + summary + body excerpt per article)
Generate sitemap.xml + robots.txt
```

### 4. Backlink Resolution

At build time, scan all public articles and build a reverse-link map:

```typescript
// For each article, find all other articles that link to it
backlinks: Map<slug, Array<{ slug, title, category, context }>>
```

The `context` field extracts the sentence containing the [[wiki-link]] for the "Linked from" section.

## Frontmatter Schema

### Required Addition

Every article that should appear on the website needs:

```yaml
visibility: public    # appears on website
# or
visibility: private   # default — excluded at build time
```

### Full Schema

```yaml
---
title: "Article Title"                    # required
category: People | Projects | ...        # required
created: 2026-04-08                      # required
updated: 2026-04-08                      # required
source: "description of source"          # optional
tags: [tag1, tag2]                       # optional
visibility: public | private             # default: private
featured: true                           # optional — pins to home page featured slot
---
```

## Pages

### Home Page (`/`)

**Header** (sticky, frosted glass):
- Logo mark (gradient "S" + "Shravanpedia")
- Nav: Browse, Categories, Random
- Search trigger (⌘K opens modal)

**Sidebar** (persistent, 248px):
- Navigation: Home, All Articles, Random
- Categories: color-coded dots + names + counts (only categories with public articles)
- About: brief description box

**Main content**:
- Hero: title (gradient text), serif italic subtitle, stat chips (articles, categories, posts analyzed, books cataloged)
- Subtle blue gradient wash behind hero
- Featured article card: avatar monogram, gradient left accent, category badge, summary, "Read article →" with animated arrow
- Recently updated: 5 most recent with category dots + relative dates
- Browse by category: 3-column grid, each card tinted with category color, colored top bar, article count badge, description

### Article Page (`/[category]/[slug]`)

**Header**: same as home

**Reading progress bar**: fixed below header, gradient fill (accent → purple), updates on scroll

**Sidebar**:
- "In This Article" TOC: extracted from h2/h3 headings, scroll-spy highlights active section, h3s indented
- Categories: same as home, current category highlighted

**Main content**:
- Meta line: category badge (colored) + "Updated [date]" + "X min read" + visibility indicator
- Title: 34px, font-weight 800, tight letter-spacing
- Summary quote: Newsreader serif italic, gradient left border (accent → category color)
- Article body: 15px body text, 1.8 line-height, proper heading hierarchy
- Blockquotes: warm gray background, left border, serif italic, optional attribution
- Wiki links: blue text with bottom-40% highlight that fills on hover
- Private wiki links: gray text, dashed underline, "Private article" tooltip
- Missing wiki links: red text, dashed underline (Wikipedia red-link style)
- **Backlinks section**: "Linked from X articles" — shows each linking article with category dot + link + context snippet (the sentence containing the reference)
- Related articles: pill buttons, white with border, hover → accent tint + lift

### Category Page (`/category/[name]`)

- Category header: name, color, description, article count
- List of all public articles in category: title, summary, updated date, tags
- Sorted by updated date (most recent first)

### Search (`/search` + ⌘K modal)

**⌘K modal** (primary search interface):
- Backdrop blur overlay
- Input with search icon, ESC to close
- Result count hint bar
- Results: category dot + title + category badge + one-line preview
- Keyboard navigation: ↑↓ to navigate, Enter to open, ESC to close
- Footer: keyboard shortcut hints
- Powered by Fuse.js searching: title (weight 3), summary (weight 2), body (weight 1), tags (weight 2)

**`/search` page** (fallback for direct URL access):
- Same results rendering as modal, but full-page layout

### Random (`/random`)

- Client-side redirect to a random public article
- Reads from the search index (already loaded) to pick randomly

## Design System

### Colors

```css
:root {
  /* Base */
  --bg: #faf9f7;                    /* warm off-white */
  --bg-surface: #ffffff;
  --bg-sidebar: #f7f6f3;
  --text-primary: #1a1816;          /* warm near-black */
  --text-secondary: #6b6560;
  --text-tertiary: #a39e98;
  --text-link: #1d4ed8;
  --border: #e8e5e0;
  --accent: #1d4ed8;

  /* Category colors (text + background pairs) */
  --cat-people: #7c3aed;       --cat-people-bg: #f5f3ff;
  --cat-projects: #059669;     --cat-projects-bg: #ecfdf5;
  --cat-learnings: #b45309;    --cat-learnings-bg: #fffbeb;
  --cat-inspirations: #be123c; --cat-inspirations-bg: #fff1f2;
  --cat-ideas: #1d4ed8;        --cat-ideas-bg: #eef2ff;
  --cat-interests: #0e7490;    --cat-interests-bg: #ecfeff;
  --cat-places: #4d7c0f;       --cat-places-bg: #f7fee7;
}
```

### Typography

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Hero title | Inter | 36px | 800 | 1.15 |
| Article title | Inter | 34px | 800 | 1.15 |
| h2 | Inter | 22px | 700 | 1.3 |
| h3 | Inter | 16px | 650 | 1.4 |
| Body | Inter | 15px | 400 | 1.8 |
| Summary/blockquote | Newsreader | 18px | 400 italic | 1.6 |
| Code | JetBrains Mono | 14px | 400 | 1.6 |
| Section label | Inter | 10px | 600 | — |
| Nav/sidebar | Inter | 13px | 450 | — |

### Spacing

8px grid system:
- Sidebar width: 248px
- Main content max-width: 820px
- Main padding: 36px top, 48px sides
- Section gap: 36-40px
- Card padding: 20-24px
- Sidebar item padding: 7px 20px

### Shadows

```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.03);
--shadow-sm: 0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02);
--shadow-md: 0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03);
--shadow-lg: 0 8px 30px rgba(0,0,0,0.08);
```

### Interaction States

- **Card hover**: translateY(-2px) + shadow-md
- **Link hover**: highlight fill animation (40% → 100% background)
- **Related pill hover**: accent tint + border color + translateY(-1px)
- **Search result hover**: background fill
- **Sidebar active**: left border accent + blue tint background
- **TOC active**: same as sidebar active
- **Featured card**: "Read article →" arrow gap widens on card hover
- **All transitions**: 0.15s ease

### Responsive Breakpoints

| Breakpoint | Layout Change |
|-----------|---------------|
| ≥1280px | Full layout: sidebar (248px) + content (820px max) |
| 768-1279px | Sidebar collapses to hamburger, content full-width |
| <768px | Single column, TOC becomes expandable accordion, tables get horizontal scroll, category grid → 2 columns then 1 |

### Mobile Sidebar

- Hamburger icon in header (replaces sidebar)
- Slide-in drawer from left (280px) with backdrop overlay
- Same content as desktop sidebar
- Swipe-to-close gesture support
- Body scroll locked when open

## Component States

Every component handles four states:

| Component | Loading | Empty | Error | Success |
|-----------|---------|-------|-------|---------|
| Home page | Skeleton cards | "No public articles yet" | N/A (static) | Full layout |
| Article | Skeleton text | N/A | 404 page | Full article |
| Category | Skeleton list | "No articles in this category" | 404 | Article list |
| Search | Typing indicator | "No results for [query]" | N/A | Result list |
| Backlinks | — | Section hidden | — | Link list |
| TOC | — | Hidden (< 2 headings) | — | Section links |

## SEO & Social Sharing

### Meta Tags (per article)

```html
<title>Article Title — Shravanpedia</title>
<meta name="description" content="[summary quote from frontmatter]">
<meta property="og:title" content="Article Title">
<meta property="og:description" content="[summary quote]">
<meta property="og:image" content="/og/[category]/[slug].png">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
```

### OG Image Generation

Auto-generated at build time using `@vercel/og` or satori:
- Article title (large, Inter bold)
- Category badge (colored)
- "Shravanpedia" branding
- Warm background matching site aesthetic
- 1200x630px

### Structured Data

JSON-LD per article:
```json
{
  "@type": "Article",
  "headline": "Article Title",
  "dateModified": "2026-04-08",
  "author": { "@type": "Person", "name": "Shravan Tickoo" },
  "publisher": { "@type": "Organization", "name": "Shravanpedia" }
}
```

### Sitemap & Robots

- `sitemap.xml` generated at build time listing all public articles
- `robots.txt` allows all crawlers

## Edge Cases & Robustness

### Wiki Link Resolution

| Scenario | Rendering |
|----------|-----------|
| `[[slug]]` → public article exists | `<a class="wiki-link" href="/cat/slug">Title</a>` |
| `[[slug]]` → article is private | `<span class="wiki-link-private" title="Private article">Title</span>` |
| `[[slug]]` → article doesn't exist | `<span class="wiki-link-missing" title="Article not found">slug</span>` |
| `[[slug\|Display Text]]` | Same resolution, but display text overrides |

### Build Validation

At build time, log warnings for:
- Public articles linking to >3 private articles (might mean the article itself should be private)
- Missing frontmatter fields (title, category)
- Broken wiki-links (target doesn't exist at all)
- Articles with `visibility: public` but no `updated` date
- Empty categories (hidden from nav but logged)

### Graceful Degradation

- If vault path doesn't exist → build fails with clear error message
- If zero public articles → home page shows "No public articles yet. Mark articles with `visibility: public` in frontmatter."
- If featured article is private → fall back to most recently updated public article
- If category has zero public articles → hide from sidebar and category grid
- If article has < 2 headings → hide TOC entirely
- If article has no Related section → hide Related pills (don't show empty section)
- If article has no backlinks → hide Backlinks section

### Image Handling

- Images referenced as `![[image.png]]` are searched in the article's category folder
- Found → copied to `public/images/[category]/[filename]`, rewritten to `<img>` tag
- Not found → render placeholder with alt text
- Images are NOT optimized at build time initially (can add sharp later)

## Dark Mode

CSS custom properties swap to dark values when `[data-theme="dark"]` is set on `<html>`:

```css
[data-theme="dark"] {
  --bg: #0f0f10;
  --bg-surface: #1a1a1c;
  --bg-sidebar: #141416;
  --text-primary: #e8e6e3;
  --text-secondary: #9a958f;
  --text-tertiary: #5c5750;
  --border: #2a2a2d;
  --accent: #6b8eff;
  /* category colors lighten slightly */
}
```

Toggle button in header (sun/moon icon). Preference saved to localStorage. Respects `prefers-color-scheme` on first visit.

## File Structure

```
~/shravanpedia-web/
├── app/
│   ├── layout.tsx              root layout (header, sidebar, theme)
│   ├── page.tsx                home page
│   ├── [category]/
│   │   └── [slug]/
│   │       └── page.tsx        article page
│   ├── category/
│   │   └── [name]/
│   │       └── page.tsx        category listing
│   ├── search/
│   │   └── page.tsx            search page (fallback)
│   ├── random/
│   │   └── page.tsx            random redirect
│   └── globals.css             tailwind + custom properties
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── TOC.tsx                 table of contents (scroll-spy)
│   ├── SearchModal.tsx         ⌘K search
│   ├── ArticleBody.tsx         rendered markdown content
│   ├── RelatedPills.tsx
│   ├── Backlinks.tsx
│   ├── CategoryCard.tsx
│   ├── FeaturedArticle.tsx
│   ├── RecentlyUpdated.tsx
│   ├── ReadingProgress.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── wiki.ts                 content loading, filtering, link resolution
│   ├── markdown.ts             remark/rehype pipeline + custom plugins
│   ├── backlinks.ts            reverse-link map builder
│   ├── search-index.ts         search index generator
│   ├── categories.ts           category metadata (colors, descriptions)
│   └── types.ts                TypeScript types
├── public/
│   ├── fonts/                  self-hosted Inter, Newsreader, JetBrains Mono
│   ├── images/                 copied from vault at build time
│   └── og/                     generated OG images
├── docs/
│   └── superpowers/specs/      this file
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── tsconfig.json
└── .gitignore                  includes: out/, .next/, node_modules/, public/images/, public/og/
```

## Performance Budget

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1s |
| Largest Contentful Paint | < 1.5s |
| Total page weight | < 200KB (excluding images) |
| Search index size | < 100KB (for 100 articles) |
| Lighthouse score | > 95 on all categories |

Static site + self-hosted fonts + zero JS framework overhead beyond Next.js minimal = fast by default.

## Accessibility

- All interactive elements keyboard accessible
- Focus visible outlines on all focusable elements
- ARIA labels on icon-only buttons
- Skip-to-content link
- Proper heading hierarchy (h1 → h2 → h3)
- Color contrast AA minimum on all text
- Search modal traps focus when open
- Sidebar navigation has proper ARIA roles
- Reduced motion: disable transitions when `prefers-reduced-motion: reduce`

## What This Spec Does NOT Cover

- Analytics (add later if needed)
- Comments or discussion features
- Edit-in-place or CMS
- Automatic vault-to-website sync (manual deploy only)
- User authentication
- RSS feed (could add later easily)

## Reference

- Design mockup: `~/ProductBrain/Shravanpedia/.superpowers/brainstorm/*/content/full-design-v2.html`
- Wiki content: `~/ProductBrain/Shravanpedia/`
- Wiki schema: `~/ProductBrain/Shravanpedia/SCHEMA.md`
