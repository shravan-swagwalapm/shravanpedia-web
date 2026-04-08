---
title: "Rethink Dashboard"
category: Projects
created: 2026-04-08
updated: 2026-04-09
source: "vault project files, session journals (12 sessions, February-March 2026)"
tags: [project, edtech, dashboard, product]
visibility: public
---

> Ed-tech platform dashboard — student/admin views, attendance, case studies, RAG chatbot planned.

## Context

**Rethink Dashboard** is the ed-tech infrastructure project. If [[the-swagwala-pm]] is the public teaching brand, Rethink Dashboard is the platform underneath it — the dashboards, student tracking, and admin tools that make structured education possible at scale.

## Details

### What It Is

The dashboard serves both students and administrators with distinct views. Students can track their progress, access case studies, and manage their cohort experience. Admins get attendance tracking, case study management, and operational oversight. A **RAG chatbot** is planned as the next major feature, using pgvector and building on the retrieval patterns learned from [[prabhupada-ai]].

### Technical Stack

The app runs on **Next.js** with **Supabase** and **Tailwind**. It shares its Supabase instance with [[predict-my-layoff]] -- same project, separate tables -- keeping infrastructure lean. The dashboard pages use a **BFF (Backend-for-Frontend) pattern** with server-side parallel fetch, ensuring that the data-heavy admin views load quickly without waterfalling API calls.

### The BFF Pattern Story

The BFF pattern was not the original design. The first version of the student dashboard made 11 parallel client-to-Supabase requests, and it worked fine on fast connections. Then a student on an Indian mobile network reported that the dashboard stuck on "Loading your dashboard..." forever. The root cause was browser connection pool starvation: Indian mobile browsers have roughly six connections per host, and 11 dashboard requests plus the Supabase WebSocket meant connection contention, timeouts, partial failures, and infinite loading. `Promise.all` never settled, so `finally { setLoading(false) }` never ran.

The fix came in two phases. V1 added band-aids: per-query timeouts via an AbortController-based `fetchWithTimeout` helper, SWR cache via localStorage (making return visits instant), and error states with retry. V2 eliminated the root cause entirely by consolidating 11 requests into a single BFF route (`/api/dashboard/student`) that runs all queries server-side where connection limits do not apply. The admin dashboard had already used this exact pattern with zero flaky-network complaints, which is what made the diagnosis clear. Four rounds of code review caught 14 bugs in the BFF route, including a critical cross-cohort data leak where attendance was not scoped to the current cohort.

Key Supabase lessons emerged: `.single()` errors on zero rows (PGRST116), so `.maybeSingle()` is needed when a row may not exist. Supabase never rejects promises on query errors -- it returns `{ data: null, error }` as a fulfilled promise, so the `error` field must always be checked explicitly. And multi-cohort sessions require the `session_cohorts` junction table, not the legacy `sessions.cohort_id` column.

### Case Study Submission Pipeline

The largest feature build was a full case study submission and review system spanning six phases: database migration (5 new tables, 7 new columns on `case_studies`, RLS policies), student submission UI with file upload and countdown timers, admin review and management, mentor review, student feedback with leaderboard, and mobile polish. The visibility state machine -- `draft`, `submitted`, `admin_reviewed`, `mentor_visible`, `subgroup_published`, `cohort_published` -- hides internal states from students who never see the mentor review step.

A three-agent code review caught critical issues: XSS via `javascript:` URLs in link attachments (fixed with a protocol whitelist allowing only `http:` and `https:`), RLS policies that were too permissive (`FOR ALL USING (true)` replaced with restrictive SELECT policies scoped to subgroup membership), and an infinite loop in attendance dependency tracking that would have spammed Supabase in production.

### Zoom Meeting Deduplication

The Meetings Manager showed duplicate rows because Zoom's Reports API returns one row per meeting instance (each `uuid`), not per meeting (`id`). Host reconnections create separate records. Combined with no `UNIQUE` constraint on `sessions.zoom_meeting_id`, this produced wrong durations (1 minute from false starts) and inflated attendance percentages (99.5% average against a 1-minute duration). The fix used three-layer defense: application-level deduplication by maximum participant count, an upsert guard before insert, and a database-level partial unique index.

### Cross-Project Connections

The planned RAG pipeline represents an evolution from FAISS (used in PrabhupadaAI) to **pgvector**, keeping the retrieval architecture within Supabase rather than requiring a separate vector store. This is a natural progression -- same conceptual pattern, better integration with the existing database. The dashboard is part of the broader [[rethink-systems]] brand at rethinksystems.in.

## Impact

This is the operational backbone for Shravan's teaching at scale. If Rethink Systems grows beyond YouTube and cohorts into a structured education platform, the dashboard is the infrastructure that makes that future possible. It is the unglamorous but essential plumbing beneath the brand.

## Related
- [[shravan-tickoo]]
- [[the-swagwala-pm]]
- [[prabhupada-ai]]
- [[building-philosophy]]
- [[predict-my-layoff]]
- [[rethink-systems]]
- [[subagent-driven-development]]
