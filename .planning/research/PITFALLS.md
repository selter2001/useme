# Pitfalls Research

**Domain:** Freelancer Portfolio + Demo Applications
**Researched:** 2026-02-17
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: The "Tutorial Clone" Smell

**What goes wrong:**
Portfolio projects scream "fake" or "tutorial-followed" rather than demonstrating real capability. Recruiters see the same signals loop on repeat: todo apps, weather apps, generic chat apps, basic e-commerce clones. These projects get instantly dismissed as copy-paste work, especially with AI-generated code becoming common.

**Why it happens:**
Developers follow tutorials verbatim without adding unique features or demonstrating problem-solving beyond the guided path. The lack of customization, missing problem statements, and absence of technical depth signals "I followed instructions" rather than "I can build solutions."

**How to avoid:**
- Go beyond tutorial basics with unique features that weren't in the original tutorial
- Document what problem you were solving and why you made specific technical decisions
- Include features that show you understand the domain, not just the framework
- Add real-world complexity (error handling, edge cases, performance considerations)
- Show your process: architecture decisions, tradeoffs considered, why you chose solution X over Y

**Warning signs:**
- Project description is vague: "A todo app built with React" without explaining unique aspects
- No explanation of technical challenges overcome
- Every demo looks visually identical (same CSS framework defaults, same layout patterns)
- Missing information about your role, decisions made, or problems solved
- Code lacks error handling, loading states, or edge case considerations

**Phase to address:**
Phase 1 (Planning/Architecture) - Define unique value propositions for each demo project before coding
Phase 2 (Core Features) - Implement at least one "not in tutorial land" feature per project

---

### Pitfall 2: Missing Performance and Results Data

**What goes wrong:**
Freelancers spend months perfecting presentation while clients are looking for performance data and proof-driven hiring. Portfolio lacks measurable outcomes, concrete metrics, or evidence of impact. This is becoming one of the fastest growing hidden freelance mistakes in competitive marketplaces in 2026.

**Why it happens:**
Focus on aesthetics over substance. Developers think "beautiful portfolio = hired" when clients actually want "proven results = hired." Trust signals (reliability proof) matter more than skill claims.

**How to avoid:**
- Document measurable outcomes even for demo projects (load time improvements, bundle size, accessibility scores)
- Include technical metrics: Lighthouse scores, performance benchmarks, test coverage
- For each project, answer: "What problem did this solve?" and "How do you know it worked?"
- Add case study format: problem → approach → solution → results → learnings
- Use real data visualization where possible (even if synthetic data for demos)

**Warning signs:**
- No metrics anywhere in portfolio
- Vague claims: "improved performance" without numbers
- Missing Lighthouse scores, accessibility audit results, or other objective measurements
- Cannot articulate impact or outcomes of work
- No "lessons learned" or reflection on what you'd do differently

**Phase to address:**
Phase 2 (Core Features) - Build with metrics in mind (performance monitoring, analytics setup)
Phase 4 (Polish) - Audit all projects and add performance/accessibility scores to documentation

---

### Pitfall 3: Portfolio Presentation Over Substance

**What goes wrong:**
Portfolio looks pretty but lacks depth. Common issues include: too many half-baked projects rather than few polished ones; missing or vague problem statements (top pet peeve for recruiters); unclear role in projects; no credits or collaboration details; excessive clutter instead of focused case studies.

**Why it happens:**
Misunderstanding what recruiters value. Assumption that "more projects = better" when reality is "depth beats breadth." Not understanding that recruiters need to quickly assess: What did you build? Why? What was your role? What was the outcome?

**How to avoid:**
- Quality over quantity: 3-4 exceptional projects beat 15 mediocre ones
- Every project needs: clear problem statement, your specific role, technical approach, outcome
- Make case studies scannable: headlines, short paragraphs, captions
- Include self-reflection and learnings to show growth
- First couple sentences should cover: role, responsibilities, methods, deliverables
- Give credit to collaborators/tools (shows honesty and team capability)

**Warning signs:**
- More than 6-7 projects in portfolio (signals quantity over quality)
- Cannot explain what problem each project solves in one sentence
- Missing "your role" information (were you solo? team member? what specifically did you build?)
- No reflection on what you learned or would do differently
- Using overused stock photos or generic placeholder content
- Excessive text without scannable structure

**Phase to address:**
Phase 3 (Documentation) - Write compelling case studies with problem/solution/outcome structure
Phase 5 (Integration) - Portfolio site organization and presentation strategy

---

### Pitfall 4: Dark Mode Accessibility Failures

**What goes wrong:**
Dark theme looks modern but violates WCAG accessibility guidelines. Common mistakes: gray text on dark backgrounds (poor contrast), highly saturated colors on dark backgrounds (poor visibility), pure black backgrounds (#000000) causing eye strain and halation effect, missing or invisible focus indicators, visual vibrations from high-contrast color combinations.

**Why it happens:**
Assumption that offering dark mode automatically improves accessibility, when reality is it can make things worse without deliberate accessible design. Not testing with actual contrast ratio checkers. Copying dark mode aesthetics without understanding accessibility requirements.

**How to avoid:**
- **Never use pure black (#000000)** - use dark grays like #121212 instead
- Test all color combinations with contrast ratio checker tools (WebAIM, Coolors, CCA)
- WCAG requires minimum 4.5:1 for normal text, 3:1 for large text (AA level)
- Adapt focus indicators for dark backgrounds (ensure 3:1 contrast)
- Avoid highly saturated colors on dark backgrounds
- Test with actual users who have astigmatism, dyslexia, or use keyboard navigation
- Design dark mode deliberately for accessibility, not just invert colors

**Warning signs:**
- Using gray text on dark background without checking contrast
- Pure black (#000000) used for backgrounds
- Focus indicators that worked in light mode disappear in dark mode
- Color combinations that create visual vibrations
- No contrast ratio testing performed
- Assuming dark mode is accessible by default

**Phase to address:**
Phase 1 (Design System) - Establish accessible dark mode color palette with tested contrast ratios
Phase 4 (Accessibility Audit) - Test all components against WCAG 2.1 AA standards with contrast checker tools

---

### Pitfall 5: GitHub Pages SPA Routing Nightmare

**What goes wrong:**
Single Page Application deployed to GitHub Pages returns 404 errors on direct navigation to any route except root. Fresh page load for URLs like `example.com/foo` fails because GitHub Pages expects static files for each URL, but SPAs rely on client-side routing from a single HTML file. This breaks sharing links, browser refresh, and search engine indexing.

**Why it happens:**
GitHub Pages doesn't natively support single page apps. It knows nothing of client-side routes and treats them as requests for non-existent files. Developers test only from root URL during development and miss this critical deployment issue.

**How to avoid:**
Two main approaches:

**Option 1: Hash-based routing (simplest)**
- Use HashRouter instead of BrowserRouter in React Router
- URLs become `example.com/#/foo` instead of `example.com/foo`
- Works because part after # isn't sent to server
- Downside: less clean URLs, SEO implications

**Option 2: 404.html redirect hack (cleaner URLs)**
- Create custom 404.html that redirects to index.html with path in query string
- Index.html script reads query string and updates browser history
- Maintains clean URLs
- Downside: Every page initially returns 404 (SEO penalty, browser error banners)

**Warning signs:**
- Direct navigation to `/about` works in dev server, fails on GitHub Pages
- Refresh on any route except `/` returns 404
- Shared links to specific pages don't work
- Testing only from root URL during development
- Not testing actual deployment until end of project

**Phase to address:**
Phase 1 (Architecture) - Choose routing strategy (hash vs browser history) based on requirements
Phase 2 (Infrastructure) - Implement 404.html redirect or configure hash routing
Phase 4 (Testing) - Test all routes with actual GitHub Pages deployment, not just dev server

---

### Pitfall 6: SwiftUI Demo Looks Amateur

**What goes wrong:**
SwiftUI app looks like beginner work due to: overusing @State and @ObservedObject (unnecessary re-renders), overcomplicated layouts with excessive view nesting, writing more code than necessary, neglecting @Binding (child view changes don't reflect in parent), poor error handling, missing accessibility features, using regular stacks instead of LazyVStack/LazyHStack for large lists.

**Why it happens:**
Following SwiftUI tutorials that teach basics but not best practices. Not refactoring code after figuring out a problem. Cargo-culting patterns without understanding when to use each state wrapper. Ignoring performance implications and accessibility from the start.

**How to avoid:**
- **State management discipline:**
  - @State for value-type properties owned by current view (ints, strings, arrays)
  - @Binding for two-way communication between parent/child views
  - @ObservedObject/@StateObject for reference types and shared data
  - Don't overuse - each triggers re-render

- **Performance optimization:**
  - Use LazyVStack/LazyHStack for large lists (loads on-demand vs all at once)
  - Extract expensive subviews to prevent unnecessary recomputation
  - Profile and optimize re-render frequency

- **Code quality:**
  - Refactor after solving problem - remove experimental code
  - Keep view nesting shallow, extract subviews for readability
  - Implement proper error handling from start, not as afterthought

- **Accessibility:**
  - Add accessibility labels and hints
  - Test with VoiceOver
  - Support Dynamic Type
  - Ensure sufficient contrast ratios

**Warning signs:**
- Every property is @State regardless of type or scope
- Deeply nested view hierarchies (more than 3-4 levels)
- No error handling (assumes happy path always works)
- No accessibility modifiers
- List of 100+ items uses VStack instead of LazyVStack
- Preview canvas constantly crashes or won't load
- Code left over from experimentation not cleaned up

**Phase to address:**
Phase 1 (Architecture) - Plan state management strategy and view hierarchy
Phase 2 (Core Features) - Implement with performance and accessibility from start
Phase 3 (Code Review) - Refactor and remove unnecessary complexity
Phase 4 (Accessibility) - Full VoiceOver and Dynamic Type testing

---

### Pitfall 7: Web Demo Fails Mobile Simulation

**What goes wrong:**
Web-based mobile app simulation breaks on actual mobile devices. Common issues: broken layouts, unreadable text, elements overflowing viewport, buttons too small to tap, improper viewport meta tag configuration, missing shrink-to-fit handling, hover/right-click events that don't translate to touch, fixed widths that don't adapt to device.

**Why it happens:**
Testing only in desktop browser DevTools device emulator, not on real devices. Not understanding iOS Safari's specific viewport behaviors. Using desktop interaction patterns (hover, right-click) without mobile alternatives. Viewport meta tag copy-pasted without understanding what each property does.

**How to avoid:**
- **Viewport meta tag (critical for iOS Safari):**
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  ```
  - `width=device-width` - match screen width in device-independent pixels
  - `initial-scale=1` - 1:1 pixel ratio
  - `shrink-to-fit=no` - prevent iOS 9+ from shrinking content (required!)
  - **NEVER use:** `user-scalable=no`, `maximum-scale=1`, `minimum-scale=1` (blocks zoom, accessibility violation)
  - **NEVER use:** fixed pixel widths like `width=320`

- **Interaction patterns:**
  - No hover-dependent functionality (provide touch alternatives)
  - No right-click menus (use long-press or alternative UI)
  - Buttons minimum 44x44pt touch target (iOS HIG requirement)
  - Form inputs must handle mobile keyboards (return button behavior)

- **Testing:**
  - Test on actual iOS and Android devices, not just emulators
  - Test in portrait and landscape orientations
  - Test with different screen sizes (iPhone SE, Pro Max, iPad)
  - Test with slow network (mobile data conditions)
  - Use BrowserStack or similar for real device testing

**Warning signs:**
- Viewport meta tag missing or using old iOS 8 patterns
- Testing only in Chrome DevTools, not real devices
- Horizontal scroll appears on mobile viewport
- Text becomes microscopic on mobile
- Tap targets smaller than 44pt
- Hover effects with no touch alternative
- Layout breaks when rotating device
- No consideration for notch/safe areas on modern iPhones

**Phase to address:**
Phase 1 (Foundation) - Set up proper viewport meta tag and responsive base styles
Phase 2 (Core Features) - Build mobile-first with touch interactions from start
Phase 4 (Testing) - Real device testing on iOS Safari and Android Chrome

---

### Pitfall 8: Useme Profile Lacks Trust Signals

**What goes wrong:**
New freelancer on Useme looks untrustworthy despite having skills. Profile gets overlooked because it lacks credibility markers: no portfolio links, incomplete profile information, missing tags/categories, generic "About me" section, no specialization (trying to be everything to everyone), unverified account status limiting to 5 offers.

**Why it happens:**
Not understanding that clients hire based on trust signals rather than skill claims alone. Focusing on listing skills without proving expertise. Ignoring platform-specific requirements like verification and tags. Not narrowing specialization (one of strongest visibility mistakes in freelance marketplaces).

**How to avoid:**
- **Complete profile requirements:**
  - Add avatar (professional, not generic)
  - Fill out "About me" with specific expertise, not generic claims
  - Add tags with strongest skills (helps employers find you)
  - Select relevant categories (boosts Useme Jobs matches)
  - Complete verification process (unlocks unlimited offers)

- **Build trust signals:**
  - Link to polished portfolio with case studies
  - Publish work that proves expertise (blog posts on solving problems)
  - Show measurable results, not just skills claimed
  - Demonstrate specialization, not "I do everything"
  - Include GitHub profile with quality code samples
  - Transparency about experience level and learning journey

- **Specialization strategy:**
  - Pick specific niche instead of "full stack developer"
  - Example: "SwiftUI iOS apps with focus on accessibility" beats "mobile and web developer"
  - Narrow focus improves visibility in marketplace ranking
  - Demonstrates expertise depth rather than breadth

**Warning signs:**
- Generic "About me": "I'm a passionate developer who loves coding"
- No portfolio links or GitHub profile
- Profile says "I do everything" (web, mobile, desktop, design, marketing)
- Missing tags and categories (invisible in searches)
- Account not verified (stuck at 5 offer limit)
- No evidence of specialization or unique value
- Skills listed without proof or examples

**Phase to address:**
Phase 5 (Integration) - Build complete Useme profile linking to finished portfolio
Phase 5 (Content) - Write compelling "About me" and case studies demonstrating expertise

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip accessibility from start, "add later" | Faster initial development | Retrofitting accessibility is 3x harder; violates WCAG; excludes users | Never - build accessible from day 1 |
| Use inline styles instead of CSS system | Quick styling without setup | Unmaintainable, no dark mode support, massive duplication | Never in production code |
| Hard-code content instead of i18n structure | No translation setup needed | Cannot add languages later without refactor | Only if 100% certain single language forever |
| Skip error handling in demos | Happy path works quickly | Looks amateur when anything fails; crashes on edge cases | Never - error states show professionalism |
| Copy-paste code without understanding | Feature works immediately | Cannot debug, explain, or extend; interview red flag | Never - understand before using |
| Skip performance monitoring | No setup overhead | Cannot prove optimization claims; slow sites unnoticed | Never in portfolio projects |
| Use deprecated SwiftUI patterns | Tutorials use old code | Won't work in future Xcode; looks outdated | Never - check official docs for current patterns |
| Deploy without testing on target platform | Skips device testing time | Broken on real devices; embarrassing to share broken links | Never - always test deployment |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages deployment | Assuming SPA routing works like dev server | Test actual deployment; implement 404.html redirect or hash routing |
| iOS Safari viewport | Using old `user-scalable=no` pattern | Use modern viewport tag with `shrink-to-fit=no`; allow zoom for accessibility |
| SwiftUI Previews | Expecting previews to work with all dependencies | Disable auto-refresh; build before preview; avoid WebKit in preview targets |
| Dark mode colors | Inverting light theme colors | Design dark palette separately; test contrast ratios; use #121212 not #000000 |
| Firebase in SwiftUI | Importing Firebase breaks preview canvas | Use conditional compilation or dependency injection for previews |
| Responsive testing | Only testing in Chrome DevTools emulator | Test on real iOS/Android devices; different screen sizes; both orientations |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| VStack with 100+ items in SwiftUI | Slow rendering, high memory usage | Use LazyVStack/LazyHStack for large lists | >50 items noticeable lag |
| Every property as @State | Unnecessary re-renders, slow UI | Use @State only for view-owned value types | >10 @State vars in one view |
| Inline styles in HTML | CSS bundle bloat, no caching | Use CSS classes and design system | >1000 lines HTML |
| No image optimization | Slow page loads, poor Lighthouse scores | Use modern formats (WebP), lazy loading, responsive images | Images >100KB each |
| Synchronous operations in SwiftUI body | Frozen UI, poor responsiveness | Async operations with Task, background threads | Any network/file I/O |
| Deep view nesting in SwiftUI | Slow compilation, preview crashes | Extract subviews, flatten hierarchy | >4 levels deep |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Hardcoding API keys in demo code | Keys exposed in public GitHub repos | Use environment variables; .env in .gitignore; public/private key pairs |
| Exposing real user data in portfolio | GDPR violations, privacy breach | Use synthetic/anonymized data; get explicit permission for real examples |
| No HTTPS on GitHub Pages custom domain | MITM attacks, browser warnings | Enable HTTPS in repository settings; required for custom domains |
| Committing .env files | Credentials leaked publicly | Add .env to .gitignore BEFORE first commit; rotate exposed keys immediately |
| Client-side-only authentication in demo | Security theater, no actual protection | Either implement real backend auth or clearly label as "UI demo only" |
| Using production credentials in dev | Accidental data modification/deletion | Separate dev/staging/production environments; never mix credentials |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No loading states | User thinks app crashed/frozen | Skeleton screens, spinners, progress indicators for all async operations |
| No error messages | User confused when something fails | Clear error messages explaining what happened and what user can do |
| Tiny touch targets on mobile | Frustration, accidental taps | Minimum 44x44pt for all interactive elements (iOS HIG) |
| Disabled zoom on mobile | Accessibility violation, user cannot read small text | Never use `user-scalable=no` or `maximum-scale=1` in viewport |
| Hover-only interactions | Doesn't work on touch devices | Provide touch alternatives for all hover interactions |
| Auto-playing media | Annoying, accessibility issue, data usage | User-initiated playback only; respect prefers-reduced-motion |
| Missing focus indicators in dark mode | Keyboard users cannot navigate | Test focus indicators in both light and dark themes |
| Generic placeholder text | Looks unfinished, unprofessional | Use realistic, domain-appropriate content; avoid "Lorem ipsum" in demos |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Dark mode:** Often missing WCAG contrast testing — verify all text/background combinations meet 4.5:1 ratio
- [ ] **Responsive design:** Often missing real device testing — verify on actual iOS/Android, not just DevTools
- [ ] **SwiftUI app:** Often missing accessibility labels — verify with VoiceOver, not just visual inspection
- [ ] **GitHub Pages SPA:** Often missing route handling — verify direct navigation to /about works, not just navigation from /
- [ ] **Portfolio case studies:** Often missing problem statement — verify each project explains what problem it solves
- [ ] **Demo projects:** Often missing error handling — verify what happens when API fails, network offline, invalid input
- [ ] **Mobile web demo:** Often missing viewport meta tag — verify `shrink-to-fit=no` present for iOS Safari
- [ ] **Performance claims:** Often missing metrics — verify Lighthouse scores, bundle sizes, load times documented
- [ ] **Code samples:** Often missing README — verify installation instructions, tech stack, run instructions present
- [ ] **Freelance profile:** Often missing specialization — verify profile communicates specific niche, not "I do everything"

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Dark mode contrast failures | LOW | Run contrast checker on all combinations; adjust colors to meet 4.5:1; takes 1-2 hours |
| GitHub Pages SPA 404s | LOW | Implement 404.html redirect hack; takes 30 minutes; or switch to hash routing |
| Missing accessibility | MEDIUM | Retrofit labels, test with VoiceOver, fix contrast; takes 1-2 days per app |
| Amateur SwiftUI code | MEDIUM | Refactor state management, flatten hierarchy, add lazy loading; takes 2-3 days |
| Portfolio lacks depth | HIGH | Rewrite case studies with problem/solution/outcome; requires rethinking projects; 1-2 weeks |
| Tutorial clone smell | HIGH | Add unique features, document decisions, explain tradeoffs; essentially rebuild; 2-4 weeks per project |
| Unverified Useme account | LOW | Complete profile verification; provide required documents; 1-2 days wait time |
| Mobile web viewport issues | LOW | Add correct viewport meta tag; test on devices; takes 1-2 hours |
| No performance metrics | MEDIUM | Run Lighthouse audits, document scores, optimize if needed; 1 day per project |
| Missing error handling | MEDIUM | Add try-catch, error boundaries, user-facing error states; 1-2 days per app |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Tutorial clone smell | Phase 1 (Planning) | Each project has unique value proposition documented |
| Missing performance data | Phase 2 (Core Features) | Lighthouse/metrics tracking integrated from start |
| Dark mode accessibility | Phase 1 (Design System) | All colors tested with WebAIM contrast checker |
| GitHub Pages SPA routing | Phase 1 (Architecture) | Routing strategy chosen and documented |
| SwiftUI amateur patterns | Phase 2 (Implementation) | State management strategy defined and followed |
| Mobile web viewport | Phase 1 (Foundation) | Viewport meta tag in base template, tested on iPhone |
| Portfolio presentation | Phase 3 (Documentation) | Case studies follow problem/solution/outcome structure |
| Useme profile trust signals | Phase 5 (Integration) | Profile complete with specialization, links, verification |
| No error handling | Phase 2 (Core Features) | Error states designed and implemented for all async operations |
| Missing accessibility | Phase 1 (Foundation) | Accessibility requirements defined in design system |

## Sources

### Portfolio & Credibility
- [Hidden Freelance Mistakes That Secretly Stop Your Career Growth](https://www.bluebirdrank.com/2026/02/10/hidden-freelance-mistakes-career-growth/)
- [Portfolio Mistakes Designers Make](https://workspace.fiverr.com/blog/6-wildly-common-portfolio-mistakes-designers-might-make/)
- [UX Portfolio Case Study Mistakes](https://blog.uxfol.io/case-study-mistakes/)
- [Portfolio Roadmap 2026: Projects That Get Interviews](https://medium.com/@ashusk_1790/portfolio-roadmap-2026-5-projects-that-get-interviews-ddcb9716b46b)
- [Mobile App Developer Portfolio Warning Signs](https://thisisglance.com/blog/mobile-app-developer-portfolio-analysis-decode-the-warning-signs)

### GitHub Pages Deployment
- [GitHub Pages SPA Routing Problem](https://github.com/orgs/community/discussions/64096)
- [SPA GitHub Pages Solutions](https://github.com/rafgraph/spa-github-pages)
- [Deploying SPAs on GitHub Pages: Direct URL Challenges](https://pearpages.com/blog/2023/12/09/deploying-spas-on-github-pages-solving-direct-url-challenges)
- [GitHub Pages Deployment Issues Community Discussion](https://github.com/orgs/community/discussions/23885)

### SwiftUI Best Practices
- [8 Common SwiftUI Mistakes - Hacking with Swift](https://www.hackingwithswift.com/articles/224/common-swiftui-mistakes-and-how-to-fix-them)
- [10 Common SwiftUI Mistakes Beginners Make](https://www.techedubyte.com/swiftui-mistakes-beginners-avoid/)
- [SwiftUI Best Practices: Avoiding Common Pitfalls](https://medium.com/@veeranjain04/best-practices-in-swiftui-avoiding-common-pitfalls-15461027e777)
- [Troubleshooting SwiftUI Preview Issues](https://swiftuirecipes.com/blog/troubleshooting-common-swiftui-preview-issues)

### Mobile Web & Responsive Design
- [Responsive Design Failures: Debugging Mobile Issues](https://blog.pixelfreestudio.com/responsive-design-failures-debugging-mobile-issues/)
- [iOS Safari Viewport Meta Tag Documentation](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/UsingtheViewport/UsingtheViewport.html)
- [The Problem with iOS Safari and shrink-to-fit](https://bitsofco.de/ios-safari-and-shrink-to-fit/)
- [Stop Using user-scalable=no in Viewport Meta Tags](https://lukeplant.me.uk/blog/posts/you-can-stop-using-user-scalable-no-and-maximum-scale-1-in-viewport-meta-tags-now/)

### Dark Mode Accessibility
- [Dark Mode Doesn't Satisfy WCAG Color Contrast Requirements](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements)
- [Dark Mode Accessibility Myth Debunked](https://stephaniewalter.design/blog/dark-mode-accessibility-myth-debunked/)
- [Designer's Guide to Dark Mode Accessibility](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Dark Mode Contrast Checker Tool](https://invernessdesignstudio.com/design-tools/dark-mode-contrast-checker)

### Useme Platform
- [Useme Freelancer Profile Help](https://help.useme.com/en/editing-information-in-the-freelancers-profile)
- [Useme Account Verification](https://help.useme.com/en/account-verification)

---
*Pitfalls research for: Freelancer Portfolio + Demo Applications*
*Researched: 2026-02-17*
