---
phase: 02-web-projects
plan: 03
subsystem: deployment
tags: [deployment, pa11y, wcag, github-actions, visual-verification, avatar, branding]
dependency_graph:
  requires: [02-01, 02-02, 01-02-deploy-pipeline]
  provides: [dual-site-deployment, wcag-gate-both-sites, visual-verification]
  affects: [github-pages, ci-cd]
tech_stack:
  added: []
  patterns: [dual-site-deploy, cache-busting-query-params]
key_files:
  created: [web/assets/images/avatar.jpg, shared/images/avatar.jpg, landing/assets/images/avatar.jpg]
  modified: [.github/workflows/deploy.yml, .pa11yci.json, package.json, web/index.html, web/css/main.css, landing/index.html]
decisions:
  - decision: "Add ?v=2 cache-busting parameter to CSS links"
    rationale: "Safari aggressively caches CSS files, causing old styles to persist after updates"
    alternatives_considered: ["Cache-Control headers (requires server config)", "Filename hashing (requires build step)"]
    impact: "Increment version parameter when CSS changes significantly"
  - decision: "Remove all Claude Code branding from both sites"
    rationale: "User feedback: looks unprofessional for client-facing portfolio"
    alternatives_considered: ["Keep branding (rejected by user)"]
    impact: "Both sites present as purely professional developer portfolio without tool attribution"
  - decision: "Use real avatar photo instead of SVG placeholder"
    rationale: "Personal avatar adds authenticity and professionalism to portfolio"
    alternatives_considered: ["Keep SVG placeholder (too generic)"]
    impact: "Avatar stored in web/assets/images/, shared/images/, landing/assets/images/"
metrics:
  duration_minutes: 15
  tasks_completed: 2
  commits: 3
  files_created: 3
  files_modified: 6
  completed_date: "2026-02-17"
---

# Phase 02 Plan 03: Deployment Pipeline & Visual Verification Summary

**Updated GitHub Actions deployment pipeline for dual-site deploy, added avatar, removed Claude Code branding, and passed visual verification checkpoint.**

## What Was Built

Updated the deployment infrastructure to support both the portfolio website and landing page, then passed human visual verification with iterative fixes.

**Key components:**

1. **Deployment Pipeline Update** — `.github/workflows/deploy.yml` now copies both `web/` and `landing/` directories to `_site/` alongside `shared/`. Root redirect still points to `web/` as primary entry.

2. **WCAG Accessibility Gate** — `.pa11yci.json` updated to test both `/web/` and `/landing/` URLs for WCAG2AA compliance.

3. **Workspace Registration** — `package.json` root now includes `"landing"` in workspaces array with `dev:landing` convenience script.

4. **Avatar Integration** — Real avatar photo (`avatar.jpg`) added to `web/assets/images/`, `shared/images/`, and `landing/assets/images/`. Replaced SVG data URI placeholder in hero section with `<img>` tag using `object-fit: cover` and green border.

5. **Branding Cleanup** — Removed all "Claude Code" references from both sites:
   - Portfolio subtitle: "AI-Powered Development z Claude Code" → "Szybkie dostarczanie nowoczesnych rozwiązań"
   - Bio text: removed Claude Code mentions
   - Skill pill: "Claude Code" → "Swift"
   - Both footers: removed "Zbudowane z Claude Code"
   - Landing service card: "AI-Powered Development" → "Szybka realizacja"

6. **Cache-Busting** — Added `?v=2` to `main.css` link in `web/index.html` to prevent Safari serving stale CSS.

## Deviations from Plan

- **Avatar addition** — Not in original plan, added per user request during checkpoint verification.
- **Branding removal** — Not in original plan, added per user feedback during checkpoint ("looks unprofessional").
- **CSS cache-busting** — Not in original plan, added to fix Safari caching issue discovered during verification.

## Blockers Encountered

- **Safari CSS caching** — Browser served old Phase 1 CSS despite correct file on disk. Resolved with `?v=2` cache-busting parameter.

## Commits

1. `c3287b5` — feat(02-03): update deployment pipeline and accessibility tests
2. `8bec304` — feat(02-03): add avatar image to portfolio and shared assets
3. `b29161f` — style(02-03): remove Claude Code branding from portfolio and landing

## Next Phase Readiness

**Phase 2 complete.** Ready for Phase 3 (Habit Tracker).

**User setup still required before launch (from Plan 02-02):**
1. Configure EmailJS keys in `landing/js/emailjs-form.js`
2. Replace mock testimonials in `landing/index.html`
3. Update placeholder project links in `web/index.html` with real URLs

## Impact on Project Goals

- Dual-site deployment ensures both portfolio and landing page are accessible to Useme clients
- Professional appearance without tool attribution builds client trust
- Real avatar adds personal touch and authenticity
- WCAG accessibility gate maintains quality standards across both sites
