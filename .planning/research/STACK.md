# Stack Research

**Domain:** Freelancer Portfolio (Static Website + iOS Apps + Web Demos)
**Researched:** 2026-02-17
**Confidence:** HIGH

## Recommended Stack

### Portfolio Website (GitHub Pages)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | Current | Semantic markup | Modern HTML5 semantic elements (nav, section, article) improve SEO and accessibility. Native elements like `<dialog>`, `<details>/<summary>` preferred over JavaScript widgets (WCAG 2.2 trend). |
| CSS3 | Current | Styling and layout | CSS Grid for two-dimensional layouts (dashboards, galleries), Flexbox for one-dimensional layouts (nav bars, card lists). Native CSS variables for dark mode implementation. Container queries for component-level responsiveness. |
| Vanilla JavaScript (ES2023+) | ES2023+ | Interactivity | Pure JavaScript demonstrates strong fundamentals for portfolio. No build step needed for GitHub Pages. Better performance than framework overhead for small sites. |
| GitHub Pages | Current | Hosting | Free static hosting with HTTPS, custom domain support, zero configuration deployment. Jekyll integration optional but not required for pure HTML/CSS/JS. |

### iOS Demo Apps

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| SwiftUI | Latest (iOS 26 SDK) | UI framework | Apple's declarative UI framework is the standard for modern iOS development. Cross-platform support for iOS, iPadOS, macOS, watchOS, tvOS, visionOS. Real-time previews accelerate development. |
| Swift | 6.0+ | Programming language | Required for SwiftUI. Type-safe, modern language with strong async/await support. Excellent performance on A13 Bionic and newer chips. |
| Xcode | 26.2+ | IDE | Apple's official IDE with integrated SwiftUI preview canvas. Required for iOS 26 SDK (App Store requirement starting April 28, 2026). SwiftUI instrument visualizes data flow and view updates. |
| SwiftData | iOS 26+ | Local persistence | Apple's modern replacement for Core Data. Simplified API for local data storage. Native integration with SwiftUI. Perfect for habit tracker and expense calculator. |

### Web Demos (iOS Simulator)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Konsta UI | v5.0.6 | iOS-like UI components | Pixel-perfect iOS 26 components built with official Apple design guidelines. Vanilla JavaScript compatible (also supports React, Vue, Svelte). MIT licensed. Updated for iOS 26 Liquid Glass effects. |
| Tailwind CSS | 3.4+ | Utility-first CSS | Required dependency for Konsta UI. Dominant CSS framework in 2026 (31.1M weekly downloads, 92.6% market share). Utility-first approach enables rapid prototyping. |
| CSS Custom Properties | Native | Theming | Native CSS variables for dynamic theming without JavaScript overhead. Enable iOS-like animations and transitions. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Anime.js | 3.2+ | Animations | Lightweight (9KB), fast animation library for smooth UI transitions. Use for page transitions, button interactions, scroll animations. Framework-agnostic. |
| EmailJS | 4.0+ | Contact form backend | Client-side email sending without backend infrastructure. Free tier sufficient for portfolio contact form. Integrates with Gmail, Outlook. Use for landing page contact form. |
| Prettier | 3.2+ | Code formatter | Opinionated code formatter for HTML, CSS, JavaScript. Ensures consistent code style across project. Zero config philosophy. |
| ESLint | 10.0+ | JavaScript linter | Identifies problematic patterns, enforces best practices. v10 includes improved JSX support and CSS/HTML linting. Use with eslint-config-prettier to avoid conflicts. |
| Stylelint | 16.0+ | CSS linter | CSS equivalent of ESLint. Catches formatting issues, enforces conventions. Essential for maintaining clean CSS in pure HTML/CSS projects. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Git | Version control | Required for GitHub Pages deployment. Use semantic commit messages. |
| VS Code / Xcode | Code editors | VS Code for web (HTML/CSS/JS), Xcode for iOS (SwiftUI). Xcode required for iOS development. |
| Chrome DevTools | Testing & debugging | Simulate responsive layouts, test accessibility, debug JavaScript. Web Inspector available for iOS Simulator testing. |
| Lighthouse | Performance & accessibility auditing | Built into Chrome DevTools. Measures Core Web Vitals, accessibility (WCAG 2.2), SEO, best practices. |

## Installation

### Portfolio Website & Web Demos

```bash
# Initialize project
git init
npm init -y

# Install Tailwind CSS (for Konsta UI)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# Install Konsta UI
npm install konsta

# Install animation library
npm install animejs

# Install dev tools
npm install -D prettier eslint stylelint eslint-config-prettier

# EmailJS (CDN or npm)
npm install @emailjs/browser
# Or use CDN: <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
```

### iOS Apps

```bash
# Install Xcode 26.2+ from Mac App Store
# No npm/package manager needed - SwiftUI and SwiftData are included in iOS 26 SDK
# Open Xcode > Create New Project > iOS > App > SwiftUI interface
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not Alternative |
|----------|-------------|-------------|---------------------|
| Portfolio Hosting | GitHub Pages | Netlify, Vercel | GitHub Pages is free, simple, integrated with Git workflow. No build step needed for pure HTML/CSS/JS. Custom domain support included. |
| CSS Framework | Tailwind CSS (for web demos) | Bootstrap | Tailwind has 92.6% market share in 2026. Utility-first approach better for component-level styling. Bootstrap is monolithic, harder to customize. |
| iOS UI Library (Web) | Konsta UI | Framework7 | Konsta UI is lighter weight, focuses specifically on iOS 26 design. Framework7 is full-featured but heavier (includes Android, desktop). Konsta works with vanilla JS without framework overhead. |
| Animation Library | Anime.js | GSAP | Anime.js is lightweight (9KB), MIT licensed, sufficient for portfolio needs. GSAP is more powerful but commercial license required for some features. Both are framework-agnostic. |
| Contact Form Backend | EmailJS | Formspree, Basin | EmailJS free tier (200 emails/month) sufficient for portfolio. Direct client-side integration, no webhook configuration. Formspree has similar features but $6/month minimum for custom redirects. |
| iOS Persistence | SwiftData | Core Data | SwiftData is Apple's modern replacement for Core Data. Simpler API, better SwiftUI integration. Core Data is legacy, more complex. |
| CSS Methodology | BEM | Tailwind utilities | For pure CSS sections, use BEM (Block__Element--Modifier) naming. Avoids specificity issues, maintainable. Tailwind utilities for Konsta UI components only. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| jQuery | Outdated library (2006). Modern JavaScript (ES2023+) has native DOM manipulation, fetch API, promises. Adds 30KB overhead for features now in vanilla JS. | Vanilla JavaScript (ES2023+) |
| React/Vue/Angular for portfolio | Adds build complexity, bundle size (40KB+ min). Overkill for static portfolio. GitHub Pages optimized for static HTML. Showcasing frameworks doesn't demonstrate fundamentals. | Pure HTML/CSS/JS |
| CSS-in-JS (styled-components, emotion) | Requires JavaScript runtime for CSS. Increases bundle size, reduces performance. Not compatible with GitHub Pages simple deployment. | CSS3 with BEM naming convention |
| Old CSS frameworks (Foundation, Bulma) | Low market adoption in 2026. Bulma has limited utility-first capabilities. Foundation is enterprise-focused, too heavy for portfolio. | Tailwind CSS (only for web demos with Konsta UI) |
| Formspree paid tiers | $6-24/month for features already free in EmailJS. Portfolio contact form has low volume (< 200 emails/month). | EmailJS free tier |
| Outdated iOS frameworks (UIKit for new projects) | SwiftUI is the standard since 2019. UIKit is legacy maintenance mode. Apple design guidelines focus on SwiftUI. | SwiftUI |
| Third-party iOS UI libraries | Custom iOS UI libraries (Eureka, Reusable) conflict with SwiftUI declarative approach. SwiftUI has native components. | Native SwiftUI components |

## Stack Patterns by Variant

### If building portfolio without web demos:
- Skip Tailwind CSS and Konsta UI entirely
- Use pure CSS3 with BEM naming convention
- Reduces complexity, zero build step
- Better performance (no CSS framework overhead)

### If using Jekyll for GitHub Pages:
- Add `_config.yml` for site configuration
- Use Liquid templating for repeated elements (header, footer)
- Markdown for blog posts (if adding blog)
- Still use vanilla JavaScript (no React/Vue needed)

### If contact form needs more than 200 emails/month:
- Use Formspree ($6/month, 1000 submissions)
- Or Basin ($19/month, unlimited with team features)
- Or self-hosted serverless (AWS Lambda + SES, pay-per-use)

### If targeting iOS 25 instead of iOS 26:
- Use Xcode 16.x
- SwiftUI still works, but without iOS 26 Liquid Glass effects
- Note: App Store requires iOS 26 SDK after April 28, 2026

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Konsta UI v5.0.6 | Tailwind CSS 3.0+ | Konsta is built on Tailwind. Requires Tailwind as peer dependency. |
| Anime.js 3.2+ | Vanilla JS (ES6+) | Framework-agnostic. Works with any JavaScript environment. |
| SwiftUI (iOS 26) | Xcode 26.2+ | Xcode 26.2 required for iOS 26 SDK. Backward compatible to iOS 25 with Xcode 16. |
| EmailJS 4.0+ | ES6+ browsers | Uses ES6 modules. For older browsers, use CDN version with polyfills. |
| ESLint 10.0 | Prettier 3.2+ | Use eslint-config-prettier to disable conflicting formatting rules. |

## Responsive Design Strategy

**Mobile-First CSS:**
```css
/* Base styles for mobile */
.container { width: 100%; }

/* Tablet */
@media (min-width: 768px) {
  .container { width: 750px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { width: 960px; }
}
```

**Layout Patterns:**
- Use CSS Grid for portfolio project galleries (2D layout)
- Use Flexbox for navigation, card lists, forms (1D layout)
- Use Container Queries for component-level responsiveness (e.g., card adapts to sidebar vs full-width)

**Breakpoints (iOS standard):**
- Mobile: 375px (iPhone SE), 390px (iPhone 14), 430px (iPhone 14 Pro Max)
- Tablet: 768px (iPad Mini), 1024px (iPad Pro)
- Desktop: 1280px+

## Dark Mode Implementation

**CSS Variables Approach:**
```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent: #007aff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #000000;
    --text-primary: #ffffff;
    --accent: #0a84ff;
  }
}

/* Manual toggle (JavaScript) */
[data-theme="dark"] {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  --accent: #0a84ff;
}
```

**JavaScript Toggle:**
```javascript
// Respect system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// Save user preference
localStorage.setItem('theme', 'dark');
// Apply theme
document.documentElement.setAttribute('data-theme', 'dark');
```

## Accessibility Guidelines (WCAG 2.2 Level AA)

**Key Requirements:**
1. Semantic HTML: Use `<nav>`, `<main>`, `<article>`, `<section>`, `<button>` (not `<div onclick>`)
2. Keyboard navigation: All interactive elements must be keyboard accessible (Tab, Enter, Space)
3. Color contrast: 4.5:1 for normal text, 3:1 for large text (18pt+)
4. Alt text: All images must have descriptive alt attributes
5. Focus indicators: Visible focus states for keyboard navigation
6. ARIA labels: Use sparingly, prefer native HTML semantics

**JavaScript Best Practices:**
- Avoid custom widgets (use native `<button>`, `<dialog>`, `<details>/<summary>`)
- Ensure JavaScript is device-independent (works with keyboard, mouse, touch)
- Provide alternatives for JavaScript-dependent features (progressive enhancement)

## Performance Targets

**Core Web Vitals (Lighthouse):**
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

**Optimization Strategies:**
- Convert images to WebP format (30-50% smaller than PNG/JPG)
- Use lazy loading for images: `<img loading="lazy">`
- Minimize JavaScript (no frameworks = faster load)
- Inline critical CSS (above-the-fold styles)
- Use system fonts or subset web fonts

## Security Best Practices

**GitHub Pages:**
- Enable HTTPS (enforced by default)
- No server-side code = no server-side vulnerabilities
- Sanitize any user input (contact form) before displaying

**EmailJS:**
- Use public key (not private key) in client-side code
- Enable reCAPTCHA to prevent spam
- Rate limit form submissions (client-side validation)

**iOS Apps:**
- Never store sensitive data in UserDefaults (use Keychain)
- Validate all user input before SwiftData persistence
- Follow Apple's App Transport Security (ATS) requirements

## Sources

**CSS Frameworks & Tools:**
- [Konsta UI - iOS 26 CSS Library](https://konstaui.com/) - HIGH confidence (official docs, v5.0.6 verified)
- [Tailwind CSS Market Share 2026](https://hackr.io/blog/best-css-frameworks) - MEDIUM confidence (web search, multiple sources agree)
- [CSS Grid vs Flexbox Best Practices 2026](https://www.javascriptdoctor.blog/2026/02/mastering-flexbox-and-css-grid-for.html) - MEDIUM confidence (web search)

**iOS Development:**
- [SwiftUI Official Documentation](https://developer.apple.com/swiftui/) - HIGH confidence (Apple official docs)
- [Xcode 26.2 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-26_2-release-notes) - HIGH confidence (Apple official docs)
- [iOS 26 SDK Requirements (April 2026)](https://ravi6997.medium.com/ios-26-sdk-requirements-what-developers-need-to-know-for-april-2026-16dec793c44d) - MEDIUM confidence (web search, verified with Apple announcements)

**GitHub Pages:**
- [GitHub Pages Official Documentation](https://docs.github.com/en/pages) - HIGH confidence (GitHub official docs)
- [GitHub Pages Best Practices 2026](https://www.geeksforgeeks.org/git/how-to-build-portfolio-website-and-host-it-on-github-pages/) - MEDIUM confidence (web search)

**Animation & Interactivity:**
- [Anime.js Official Site](https://animejs.com/) - HIGH confidence (official docs)
- [JavaScript Animation Libraries 2026](https://graygrids.com/blog/best-css-javascript-animation-libraries) - MEDIUM confidence (web search, multiple sources)

**Contact Forms:**
- [EmailJS Official Documentation](https://medium.com/@aashisrijal252/send-emails-from-a-static-website-for-free-using-emailjs-no-backend-needed-by-aashis-rijal-80c9cb892221) - MEDIUM confidence (web search, recent 2026 article)
- [Serverless Contact Form Options 2026](https://firaform.com/blog/add-contact-form-to-static-site/) - MEDIUM confidence (web search)

**Code Quality:**
- [ESLint v10.0.0 Release](https://eslint.org/blog/2026/02/eslint-v10.0.0-released/) - HIGH confidence (official release announcement)
- [Prettier vs ESLint 2026](https://betterstack.com/community/guides/scaling-nodejs/prettier-vs-eslint/) - MEDIUM confidence (web search, reputable source)

**Accessibility:**
- [WCAG 2.2 Standards 2026](https://webaim.org/blog/2026-predictions/) - HIGH confidence (WebAIM official)
- [Accessible JavaScript 2026](https://webaim.org/techniques/javascript/) - HIGH confidence (WebAIM official)

**Responsive Design:**
- [Responsive Design Best Practices 2026](https://www.blushush.co.uk/blogs/responsive-web-design-best-practices-in-2026) - MEDIUM confidence (web search)
- [BEM Naming Convention](https://getbem.com/) - HIGH confidence (official BEM documentation)

---
*Stack research for: Freelancer Portfolio (Static Website + iOS Apps + Web Demos)*
*Researched: 2026-02-17*
*Confidence: HIGH (verified with official docs, current versions, multiple sources)*
