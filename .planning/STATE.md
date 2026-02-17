# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-17)

**Core value:** Wiarygodne, profesjonalne portfolio z działającym kodem, które przekona potencjalnych klientów Useme do zlecenia pierwszego projektu.
**Current focus:** Phase 2 Complete — Ready for Phase 3

## Current Position

Phase: 3 of 5 (Habit Tracker)
Plan: 3 of 3 in current phase — Phase complete
Status: Ready for Phase 4
Last activity: 2026-02-17 — Completed 03-03-PLAN.md (Web Demo)

Progress: [███████░░░] 70%

## Performance Metrics

**Velocity:**
- Total plans completed: 7
- Average duration: 6 min
- Total execution time: 0.7 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation-design-system | 2 | 18 min | 9 min |
| 02-web-projects | 3 | 20 min | 7 min |
| 03-habit-tracker | 2 | 5 min | 3 min |

**Recent Trend:**
- Last 5 plans: 02-02 (3 min), 02-03 (15 min), 03-01 (1 min), 03-03 (4 min)
- Trend: Consistent execution with web/CSS tasks averaging 4-7 minutes

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- GitHub Pages as hosting — darmowe, proste, wystarczające dla statycznego portfolio
- Czysty HTML/CSS/JS zamiast frameworków — najprostszy deploy, zero build step
- Dark/Tech theme — pasuje do wizerunku developera AI-first
- Dual format iOS (Xcode + web-demo) — klienci bez Maca mogą zobaczyć apkę w przeglądarce

**From Plan 01-01:**
- Use charcoal #0E0E0E as primary background instead of pure black #000000 for better visual hierarchy
- Three-layer token architecture: primitives (raw values) → semantic (UI roles) → component (reusable classes)
- All var() CSS references include fallback values for browser compatibility
- Relative stylesheet paths for GitHub Pages static hosting compatibility

**From Plan 01-02:**
- Serve http-server from project root (.) not web/ — ../shared/styles/ paths need parent directory access
- Deploy preserves web/shared directory structure in _site/ for correct path resolution
- Pa11y WCAG2AA with htmlcs runner gates deployment

**From Plan 02-01:**
- Mobile hamburger menu with full-screen overlay instead of dropdown - better touch targets and UX
- IntersectionObserver for active nav highlighting instead of scroll event listener - better performance
- CSS Grid auto-fit with minmax(min(100%, 280px), 1fr) prevents mobile overflow per best practices

**From Plan 02-02:**
- Use EmailJS for client-side email delivery — zero backend, works on GitHub Pages, free tier sufficient
- Validate on blur instead of on input — avoid premature errors, better UX
- Mock testimonials with clear code comments — social proof section present, clearly marked for replacement

**From Plan 02-03:**
- Cache-busting ?v=N query parameter on CSS links to prevent Safari serving stale styles
- Remove tool attribution (Claude Code) from client-facing sites — unprofessional per user feedback
- Real avatar photo instead of SVG placeholder — adds authenticity

**From Plan 03-01:**
- Use SwiftData @Model directly without ViewModel layer — modern pattern where @Model classes are automatically Observable
- Store CompletionStatus enum as raw string value for SwiftData compatibility
- @Relationship(deleteRule: .cascade) for automatic completion cleanup on habit deletion
- Store colors as string keys, convert to SwiftUI Color via helper function

**From Plan 03-03:**
- CSS iPhone mockup component with device frame, notch, and home indicator
- Versioned localStorage schema with migration stub for future-proofing
- Pre-seeded demo data on first visit to showcase functionality immediately
- Chart.js 4.x via CDN for zero-build chart rendering with dark theme

### Pending Todos

- Configure EmailJS keys before launch (landing/js/emailjs-form.js)
- Replace mock testimonials with real ones (landing/index.html)
- Update placeholder project links with real URLs (web/index.html)

### Blockers/Concerns

None.

## Session Continuity

Last session: 2026-02-17 (phase 3 complete)
Stopped at: Habit Tracker web demo complete, ready for Phase 4 (Budget Calculator)
Resume file: .planning/phases/03-habit-tracker/03-03-SUMMARY.md
