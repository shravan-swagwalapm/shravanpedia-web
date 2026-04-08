---
title: "Financial Vault"
category: Projects
created: 2026-04-09
updated: 2026-04-09
source: "session journals (FinancialVault, 1 session, April 2026)"
tags: [project, dashboard, finance, gmail, personal-tool]
visibility: public
---

> Personal finance dashboard syncing bank alerts from Gmail -- the internal tool built for daily use.

## Context

Financial Vault is the rare project in Shravan's portfolio that is not meant for an audience. It is a personal finance dashboard that syncs transaction data from bank email alerts via Gmail, displays spending breakdowns by category and month, and provides a searchable transaction table. Built in a single session using [[subagent-driven-development]], it demonstrates the same architectural patterns as the public-facing projects but serves a purely personal need.

## Details

### Architecture

The stack is **Next.js 16** (App Router) with **Tailwind v4** and **Recharts** for visualization. Data is stored as static JSON (`data/transactions.json`) rather than a database -- a deliberate simplicity choice for a single-user tool. The pipeline has two paths: a dashboard "Sync Gmail" button that hits a POST /api/sync route, and a CLI fallback via `python lib/gmail_fallback.py` that uses the Gmail API directly with OAuth. The design follows the "like Linear" aesthetic vocabulary -- dark mode, Inter plus JetBrains Mono, muted category colors.

### Technical Findings

Several framework-level discoveries emerged from this build. **Tailwind v4** uses `@theme` CSS blocks rather than JavaScript configuration for design tokens -- a significant change from v3. **Next.js 16** requires `Response.json()` rather than `NextResponse.json()` for API routes. Recharts `ResponsiveContainer` needs an explicit parent height to render correctly, and dynamic import with `ssr: false` is required for Recharts components that fail during server-side rendering. **Turbopack** cannot resolve imports outside the `web/` boundary, which forced a duplicate types file at both `lib/types.ts` and `web/lib/types.ts` -- an attempt to use `export * from "../../lib/types"` was reverted.

### Gmail MCP Discovery

The Gmail MCP integration revealed an important architectural gap. Gmail MCP is a Claude.ai proxy connector -- it handles authentication for the CLI but does not expose search or read tools in the session tool cache. The workaround requires restarting the Claude Code session after authentication so that the new session picks up the search and read capabilities. The Python fallback needs `credentials.json` from Google Cloud Console, using a different Google account (`shravan@naum.systems`) than the Gmail account (`shravantickoo23@gmail.com`).

### Bugs and Fixes

Five bugs were found and fixed during the build. The `useSync` hook silently swallowed fetch errors. A timezone off-by-one caused `new Date("2026-03-15")` to parse as UTC midnight and display the wrong date in IST -- fixed with a local date parser. The Recharts donut chart needed client-only rendering. A Codex subagent attempted a Turbopack cross-boundary re-export that had to be reverted. And the sync button was not disabled during sync, allowing double-sync on the empty state.

## Impact

Financial Vault is a "eat your own cooking" project -- the same stack, the same patterns, the same [[building-philosophy]], applied to a problem Shravan actually has. It validates that the build system works for personal tools, not just portfolio pieces.

## Related
- [[shravan-tickoo]]
- [[claude-code-as-cto]]
- [[building-philosophy]]
- [[subagent-driven-development]]
