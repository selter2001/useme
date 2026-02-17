# Project Research Summary

**Project:** Useme Freelancer Portfolio (Multi-Project Showcase)
**Domain:** Freelancer Portfolio + iOS Demo Applications
**Researched:** 2026-02-17
**Confidence:** MEDIUM

## Executive Summary

This portfolio project targets the Polish freelance market (Useme.com) by demonstrating AI-assisted development speed through working software rather than empty claims. The portfolio consists of four web projects (main portfolio site, service landing page, and two iOS app web demos) plus two native iOS apps (Habit Tracker and Expense Calculator), all unified by a dark/tech design system and hosted on GitHub Pages.

The recommended approach uses vanilla HTML/CSS/JS for web projects to demonstrate strong fundamentals and achieve fast load times, combined with SwiftUI for native iOS apps. A monorepo structure with shared design tokens ensures visual consistency across all projects. The key differentiator—AI-assisted development speed—must be proven through transparent build logs, commit histories showing Claude Code co-authorship, and quantified velocity metrics, not just claimed.

Critical risks include: appearing like "tutorial clones" instead of demonstrating real problem-solving (requires unique features and documented decision-making), dark mode accessibility failures (must test all color combinations for WCAG 4.5:1 contrast), GitHub Pages SPA routing issues (implement 404.html redirect early), and missing performance/results data (integrate Lighthouse metrics from start). The portfolio must balance speed of delivery with depth of presentation—quality over quantity, with 3-4 exceptional projects that include problem statements, technical approach, and measurable outcomes.

## Key Findings

### Recommended Stack

The research reveals a deliberately simple tech stack that proves fundamentals rather than hiding behind framework abstractions. For web projects, pure HTML5/CSS3/vanilla JavaScript demonstrates strong skills while achieving optimal GitHub Pages performance. iOS apps use SwiftUI (iOS 26 SDK) as the current standard, with SwiftData for persistence. The web demos use Konsta UI with Tailwind CSS to achieve iOS-like appearance in the browser.

**Core technologies:**
- **Vanilla JavaScript (ES2023+)**: No frameworks for portfolio—demonstrates fundamentals, zero build step, faster than React/Vue overhead for static sites
- **GitHub Pages**: Free hosting with HTTPS, zero config deployment, integrated with Git workflow
- **SwiftUI (iOS 26 SDK)**: Apple's declarative standard for modern iOS development, required for App Store submissions after April 2026
- **CSS Variables (Design Tokens)**: Three-layer system (primitives, semantic, component) enables dark mode and cross-project consistency
- **Konsta UI + Tailwind CSS**: iOS 26 pixel-perfect components for web demos, vanilla JS compatible, 92.6% market share for Tailwind
- **SwiftData**: Modern replacement for Core Data, simplified API for local persistence in iOS apps

**Critical version requirements:**
- Xcode 26.2+ required for iOS 26 SDK (App Store requirement starting April 28, 2026)
- No jQuery, React, Vue, or Angular for portfolio (adds unnecessary complexity, hides fundamentals)
- BEM naming convention for pure CSS sections (maintainability without framework)

### Expected Features

Research shows the portfolio must prove capability through interactive working software, not just screenshots. The AI-assisted development speed differentiator requires unique treatment—documenting build velocity, showing commit histories, and providing measurable before/after metrics.

**Must have (table stakes):**
- Responsive mobile-first design (83% of portfolio visits are mobile)
- Fast load times (<2s TTI, Lighthouse >90)
- Professional bio with skills, experience, specialization
- Project showcase with interactive demos
- Contact form with validation
- Dark/tech aesthetic with system theme detection
- iOS widgets for habit tracker (essential in 2026, enables <1s check-off)
- Basic CRUD and calculations for expense tracker
- Streak tracking and visual progress for habit tracker

**Should have (competitive differentiators):**
- **AI development transparency**: Build logs with Claude Code commits, velocity metrics dashboard, before/after comparison
- **Live interactive demos**: Embedded iOS simulators or functional web versions, not just screenshots
- **Technical case studies**: 3-5 detailed writeups showing problem/solution/results structure
- **Bilingual content (PL/EN)**: Language toggle for Polish primary market + international opportunities
- **Performance metrics display**: Lighthouse scores, Core Web Vitals visible on portfolio
- **Visual charts/graphs**: SwiftUI Charts in iOS apps demonstrate modern framework skills
- **iCloud sync**: Shows advanced iOS capability (Phase 2 feature)

**Defer (v2+):**
- Blog section (maintenance burden, feels abandoned if stale)
- Social features/leaderboards (scope creep, backend complexity)
- Paid subscriptions/IAP (adds complexity, not demo purpose)
- AI habit suggestions (buzzwordy, often inaccurate)
- Bank account integration (security complexity, regulatory issues)
- Multi-currency support (adds complexity vs value for demo)

### Architecture Approach

Monorepo structure is required because all projects share the same dark/tech design system. Separate repos would create design token drift and require multiple PRs for theme updates. The portfolio website acts as the hub, with each demo app in its own subdirectory deployed to GitHub Pages subpaths.

**Major components:**
1. **Shared Design System** (`shared/css/tokens.css`) — Three-layer CSS variables (primitives, semantic, component) serve as single source of truth for all web projects; iOS Asset Catalog colors manually synced via documented mapping
2. **Portfolio Website** (root `/`) — Static HTML/CSS/JS hub showcasing all projects, acts as main entry point and navigation center
3. **Service Landing Page** (`/landing/`) — Dynamic contact form demonstration with EmailJS, showcases AI speed value proposition
4. **Web Demos** (`/expenses/`, `/fitness/`) — Parallel implementations using vanilla JS and Konsta UI, mimic iOS apps but don't share code (lightweight, fast load)
5. **iOS Apps** (separate Xcode projects) — SwiftUI View pattern with `@State` (not MVVM for small demos), SwiftData persistence, native iOS capabilities
6. **GitHub Actions Deployment** — Workflow copies web projects to `dist/` with shared assets inlined, deploys to `gh-pages` branch

**Key patterns:**
- CSS Design Tokens with three-layer architecture (primitives → semantic → component)
- SwiftUI View pattern without MVVM (appropriate for 3-5 screen demos)
- Parallel web demos (not native port)—separate implementations optimized for each platform
- Asset Catalog colors mirror web tokens via documented mapping

### Critical Pitfalls

1. **The "Tutorial Clone" Smell** — Projects look fake or copy-pasted rather than demonstrating real capability. **Prevention:** Add unique features beyond tutorial basics, document technical decisions and tradeoffs, include problem statements explaining what you were solving and why, show real-world complexity like error handling and edge cases. Address in Phase 1 planning and Phase 2 core features.

2. **Missing Performance and Results Data** — Portfolio lacks measurable outcomes and proof-driven hiring signals. **Prevention:** Document Lighthouse scores, performance benchmarks, load time improvements; use case study format with problem → approach → solution → results → learnings; add technical metrics visibly. Address in Phase 2 (build with metrics) and Phase 4 (audit and display).

3. **Dark Mode Accessibility Failures** — Dark theme violates WCAG contrast guidelines. **Prevention:** Never use pure black (#000000), use #121212 instead; test all color combinations with WebAIM contrast checker for 4.5:1 minimum; design dark palette deliberately, don't just invert colors; ensure focus indicators work in dark mode. Address in Phase 1 design system.

4. **GitHub Pages SPA Routing Nightmare** — Direct navigation to routes returns 404s because GitHub Pages expects static files. **Prevention:** Implement 404.html redirect hack early, or use hash-based routing; test actual deployment, not just dev server; verify all routes work with direct navigation. Address in Phase 1 architecture and Phase 2 infrastructure.

5. **SwiftUI Demo Looks Amateur** — Overusing @State, excessive view nesting, missing accessibility, poor performance. **Prevention:** Plan state management strategy (use @State only for view-owned value types), use LazyVStack for large lists, refactor after solving problems, add accessibility labels from start, test with VoiceOver. Address in Phase 1 architecture and Phase 2-3 implementation/review.

## Implications for Roadmap

Based on research, the build order must follow dependency structure: shared design system first (everything depends on it), then web projects in parallel (independent after tokens exist), finally iOS apps (can mirror web demo UI). The portfolio website should come early as a hub even if it links to incomplete projects.

### Suggested Phase Structure

**Phase 1: Foundation & Design System**
**Rationale:** All projects depend on shared design tokens. Setting up proper architecture (monorepo, GitHub Actions, accessible dark mode palette) prevents rework later. GitHub Pages routing strategy must be chosen early.
**Delivers:** Monorepo structure, shared CSS design tokens with WCAG-tested dark mode, GitHub Actions deployment workflow, portfolio website skeleton
**Addresses:** Design token architecture pattern, dark mode accessibility pitfall, GitHub Pages routing pitfall
**Avoids:** Tutorial clone smell (by planning unique value propositions first), design token drift across projects

**Phase 2: Portfolio Website & Landing Page**
**Rationale:** Build entry points first so portfolio can be published early and iterated. Landing page demonstrates contact form and AI speed value proposition. These are independent and can be built in parallel.
**Delivers:** Complete portfolio website with project showcase, bio, contact info; service landing page with working contact form
**Uses:** Vanilla HTML/CSS/JS, EmailJS, shared design tokens, Anime.js for subtle animations
**Implements:** Portfolio and Landing Page components from architecture
**Addresses:** Table stakes features (responsive design, fast load times, professional bio), missing performance data (integrate Lighthouse from start)
**Avoids:** Portfolio presentation over substance pitfall (build case study structure early)

**Phase 3: iOS Habit Tracker (Native + Web Demo)**
**Rationale:** Build one complete vertical slice (native iOS app + web demo) before starting second app. Proves the pattern works and surfaces issues early.
**Delivers:** iOS Habit Tracker app (SwiftUI, widgets, streaks, persistence), web demo using Konsta UI
**Uses:** SwiftUI, SwiftData, Konsta UI + Tailwind CSS for web demo
**Implements:** iOS App and Web Demo components, demonstrates SwiftUI View pattern
**Addresses:** iOS-specific table stakes (widgets, streak tracking, visual progress), SwiftUI amateur patterns pitfall (plan state management)
**Avoids:** Tutorial clone smell (add unique features like flexible scheduling), mobile web viewport failures (proper meta tags from start)

**Phase 4: iOS Expense Calculator (Native + Web Demo)**
**Rationale:** Second vertical slice follows proven pattern from Phase 3. Can reuse architecture decisions and component structures.
**Delivers:** iOS Expense Calculator app (SwiftUI, charts, categories, persistence), web demo
**Uses:** SwiftUI Charts for visualizations, same patterns as Habit Tracker
**Implements:** Second iOS app demonstrating SwiftUI capabilities
**Addresses:** Visual charts/graphs differentiator, expense-specific features
**Avoids:** Repeating mistakes from Phase 3, over-architecting (keep View pattern, don't add MVVM)

**Phase 5: Integration & Polish**
**Rationale:** All projects exist, now connect them and add AI transparency features. Case studies require completed projects to document.
**Delivers:** Portfolio website linking to all demos, technical case studies, AI velocity metrics dashboard, bilingual content, Useme profile optimization
**Uses:** GitHub API for commit activity, performance metrics from all projects
**Addresses:** AI development transparency differentiator, Useme profile trust signals pitfall, missing performance data display
**Avoids:** Portfolio presentation over substance (case studies have real depth), Useme profile lacks trust signals

### Phase Ordering Rationale

- **Foundation first** because design tokens and deployment infrastructure are dependencies for everything else
- **Web projects before iOS apps** because web demos can use placeholders initially, then be updated to match iOS UI once apps are complete. Actually, research shows iOS apps should come before finalizing web demos so web can mirror native UI.
- **Revised: One vertical slice at a time** (iOS app + corresponding web demo together) is better than all iOS then all web—proves the pattern and surfaces integration issues earlier
- **Integration last** because case studies and AI transparency features require completed projects to document
- **Parallelization opportunities**: Portfolio website and landing page can be built simultaneously (Phase 2); the two iOS app vertical slices (Phases 3-4) are independent after Phase 1

### Research Flags

**Phases likely needing deeper research:**
- **Phase 2 (Contact Form)**: EmailJS integration specifics, form validation patterns, spam prevention without CAPTCHA
- **Phase 3 (Habit Tracker)**: iOS widget implementation (WidgetKit), notification patterns, SwiftData schema design
- **Phase 4 (Expense Calculator)**: SwiftUI Charts framework specifics, export to CSV/PDF on iOS

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation)**: CSS variables and GitHub Actions are well-documented
- **Phase 2 (Portfolio Website)**: Static HTML/CSS/JS is straightforward
- **Phase 5 (Integration)**: Documentation and linking, no novel technical challenges

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified with official docs (Apple SwiftUI, GitHub Pages), current versions confirmed, multiple sources agree on best practices |
| Features | MEDIUM | Based on web search of competitor analysis and portfolio best practices; no Context7 available for freelance portfolio domain; feature priorities derived from multiple sources |
| Architecture | MEDIUM | Monorepo patterns and CSS design tokens verified; SwiftUI View pattern sourced from Apple forums and authoritative blogs; deployment workflow verified with multiple sources |
| Pitfalls | MEDIUM | Common mistakes identified from multiple freelance/portfolio/SwiftUI sources; WCAG accessibility requirements are HIGH confidence; GitHub Pages SPA routing is HIGH confidence (official docs) |

**Overall confidence:** MEDIUM

### Gaps to Address

- **EmailJS specifics**: Research shows it's recommended for contact forms, but implementation details (rate limiting, reCAPTCHA setup, error handling) need validation during Phase 2 planning
- **Konsta UI practical usage**: Documentation exists, but real-world implementation patterns for iOS 26 simulation need validation during Phase 3
- **SwiftUI widget implementation**: High-level guidance available, but specific iOS 26 widget patterns and data flow need deeper research in Phase 3
- **Useme.com API integration**: Research found Useme profile best practices, but unclear if landing page contact form can integrate with Useme API—may need to fallback to EmailJS only
- **Performance optimization thresholds**: Lighthouse score >90 is recommended, but specific optimization tactics for hitting this with Konsta UI + Tailwind need validation during implementation
- **AI transparency implementation**: Concept is clear (show Claude Code commits, velocity metrics), but specific implementation approach (GitHub API for commit data, dashboard design) needs planning

## Sources

### Primary (HIGH confidence)
- Apple SwiftUI Official Documentation
- Apple Xcode 26.2 Release Notes
- Apple iOS Safari Viewport Documentation
- GitHub Pages Official Documentation
- WebAIM WCAG 2.2 Standards and Contrast Checker
- ESLint v10.0.0 Official Release

### Secondary (MEDIUM confidence)
- Konsta UI Official Docs (v5.0.6 verified)
- Tailwind CSS Market Share 2026 (multiple sources agree: 92.6%, 31.1M weekly downloads)
- Clean Architecture for SwiftUI (nalexn.github.io—authoritative community source)
- Freelancer Portfolio Best Practices 2026 (Elementor, ColorLib, SiteBuilderReport)
- iOS Habit Tracker App Research (Zapier, Reclaim, Knack comparisons)
- Landing Page Conversion Research (Branded Agency, LeadFeeder, ToimiPro)
- GitHub Pages SPA Routing Solutions (rafgraph/spa-github-pages, community discussions)
- CSS Design Tokens Guide (DevToolbox, Penpot, RichInfante)

### Tertiary (LOW confidence, needs validation)
- iOS 26 SDK April 2026 requirement (Medium article, needs Apple official confirmation)
- AI-assisted development productivity metrics (single source, anecdotal)
- Useme.com platform specifics (help docs available, but API integration unclear)

---
*Research completed: 2026-02-17*
*Ready for roadmap: yes*
