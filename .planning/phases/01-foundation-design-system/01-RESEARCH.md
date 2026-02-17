# Phase 1: Foundation & Design System - Research

**Researched:** 2026-02-17
**Domain:** CSS Design Systems, WCAG Accessibility, GitHub Pages Deployment, Monorepo Architecture
**Confidence:** HIGH

## Summary

Phase 1 establishes the foundational infrastructure for a multi-platform portfolio using vanilla HTML/CSS/JS with GitHub Pages hosting. The research confirms that a three-layer CSS design token architecture (primitives → semantic → component) is the industry standard for scalable design systems. WCAG 4.5:1 contrast compliance for dark mode requires careful color selection and automated testing tools like Pa11y or Lighthouse CLI. GitHub Actions provides first-class support for deploying static sites to GitHub Pages with minimal configuration. For monorepo structure without build tools, npm workspaces offer a native solution requiring only standard Node.js installation.

The key technical insight is that vanilla JavaScript projects can achieve professional-grade design systems and monorepo organization without introducing build complexity, making deployment to GitHub Pages truly zero-friction. However, dark mode accessibility is deceptively complex—simply inverting colors fails WCAG standards, and pure black causes eye strain. The research reveals specific pitfalls (missing fallbacks in CSS variables, incorrect GitHub Pages path prefixes, inadequate focus indicators) that must be proactively addressed in planning.

**Primary recommendation:** Implement a three-layer CSS custom property system with WCAG-validated dark colors (charcoal #0E0E0E, not pure black), use npm workspaces for monorepo structure, deploy via official GitHub Actions (actions/configure-pages + actions/deploy-pages), and integrate Pa11y CLI for automated contrast testing in CI/CD.

## Standard Stack

### Core
| Library/Tool | Version | Purpose | Why Standard |
|--------------|---------|---------|--------------|
| CSS Custom Properties | Native (CSS3) | Design token implementation | Built into all modern browsers, no build step needed, supports dynamic theming |
| npm workspaces | Native (npm 7+) | Monorepo management | Native to npm, zero additional dependencies, supports symlinks between packages |
| GitHub Actions | Latest | CI/CD and deployment | First-class GitHub Pages integration, free for public repos, official actions available |
| GitHub Pages | Latest | Static site hosting | Free hosting, automatic HTTPS, integrates with Actions, perfect for portfolios |

### Supporting
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Pa11y | Latest (via npm) | Automated WCAG testing | CI/CD pipeline integration, headless browser testing, WCAG 2.1 compliance validation |
| WebAIM Contrast Checker | Web-based | Manual contrast validation | Design phase color selection, quick ad-hoc testing |
| Lighthouse CLI | Latest | Comprehensive accessibility audit | Full page audits including contrast, can run in CI/CD or locally |
| actions/cache | v4 | Cache npm dependencies | Speed up workflow runs by caching ~/.npm directory |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| npm workspaces | Turborepo, Nx, Lerna | Better for large teams with complex build pipelines; overkill for vanilla JS projects without transpilation |
| CSS Custom Properties | Sass variables, Style Dictionary | Sass requires compilation (contradicts zero-build approach); Style Dictionary better for multi-platform token export (not needed here) |
| GitHub Pages | Netlify, Vercel | More features (redirects, serverless functions) but unnecessary for static portfolio; GitHub Pages is simpler and free |
| Pa11y | axe-core CLI, Lighthouse only | axe-core requires more setup; Lighthouse alone may miss color-specific issues; Pa11y balances ease-of-use with WCAG coverage |

**Installation:**
```bash
# Global Pa11y for CI/CD integration
npm install -g pa11y

# Optional: Lighthouse for comprehensive audits
npm install -g lighthouse

# No installation needed for CSS Custom Properties, npm workspaces, or GitHub Actions
```

## Architecture Patterns

### Recommended Project Structure
```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── shared/
│   └── styles/
│       ├── tokens.css          # Three-layer design tokens
│       ├── reset.css           # CSS reset/normalize
│       └── utilities.css       # Shared utility classes
├── web/
│   ├── index.html
│   ├── css/
│   │   └── main.css           # Web-specific styles (imports tokens)
│   ├── js/
│   │   └── main.js
│   └── assets/
│       └── images/
├── ios-demo/
│   ├── index.html              # Web demo of iOS app
│   ├── css/
│   │   └── demo.css           # Demo-specific styles
│   └── screenshots/
└── package.json                # Workspace configuration
```

### Pattern 1: Three-Layer Design Token Architecture

**What:** Hierarchical CSS custom property system with primitives (raw values), semantic tokens (contextual meaning), and component usage.

**When to use:** All design systems, especially when supporting theming (light/dark mode) or maintaining consistency across multiple projects.

**Example:**
```css
/* Source: https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/ */

/* Layer 1: Primitives - fundamental design values without context */
:root {
  /* Color primitives */
  --color-charcoal-800: #0E0E0E;
  --color-charcoal-700: #1A1A1A;
  --color-charcoal-600: #2D2D2D;
  --color-neon-green-400: #22C55E;
  --color-neon-green-500: #16A34A;
  --color-electric-blue-400: #3A82FF;
  --color-electric-blue-500: #2563EB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-800: #9CA3AF;

  /* Spacing primitives */
  --spacing-1: 0.25rem;   /* 4px */
  --spacing-2: 0.5rem;    /* 8px */
  --spacing-3: 0.75rem;   /* 12px */
  --spacing-4: 1rem;      /* 16px */
  --spacing-6: 1.5rem;    /* 24px */
  --spacing-8: 2rem;      /* 32px */

  /* Typography primitives */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
}

/* Layer 2: Semantic - map primitives to specific UI roles */
:root {
  /* Background colors with semantic meaning */
  --color-bg-primary: var(--color-charcoal-800);
  --color-bg-secondary: var(--color-charcoal-700);
  --color-bg-elevated: var(--color-charcoal-600);

  /* Text colors */
  --color-text-primary: var(--color-gray-100);
  --color-text-secondary: var(--color-gray-200);
  --color-text-muted: var(--color-gray-800);

  /* Interactive colors */
  --color-interactive-primary: var(--color-neon-green-400);
  --color-interactive-primary-hover: var(--color-neon-green-500);
  --color-interactive-secondary: var(--color-electric-blue-400);

  /* Layout spacing */
  --spacing-page-padding: var(--spacing-6);
  --spacing-section-gap: var(--spacing-8);
  --spacing-component-gap: var(--spacing-4);
}

/* Layer 3: Component - specific usage in components */
.button-primary {
  background-color: var(--color-interactive-primary);
  color: var(--color-bg-primary);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
}

.button-primary:hover {
  background-color: var(--color-interactive-primary-hover);
}

.card {
  background-color: var(--color-bg-elevated);
  padding: var(--spacing-component-gap);
  border-radius: var(--spacing-2);
}
```

**Naming convention:** Use `[category]-[property]-[element]-[modifier]-[state]` pattern for clarity (e.g., `--color-background-button-primary-active`).

### Pattern 2: npm Workspaces Monorepo

**What:** Native npm feature enabling multiple packages in a single repository with shared dependencies and cross-package symlinks.

**When to use:** When managing multiple related projects (web, iOS demo) that share common code (design tokens, utilities) without build tool complexity.

**Example:**
```json
// Source: https://medium.com/@sanjaytomar717/the-ultimate-guide-to-building-a-monorepo-in-2025-sharing-code-like-the-pros-ee4d6d56abaa

// Root package.json
{
  "name": "portfolio-monorepo",
  "private": true,
  "workspaces": [
    "shared/*",
    "web",
    "ios-demo"
  ],
  "scripts": {
    "test:a11y": "pa11y-ci --config .pa11yci.json",
    "deploy": "echo 'Deployment handled by GitHub Actions'"
  }
}

// shared/styles/package.json
{
  "name": "@portfolio/styles",
  "version": "1.0.0",
  "main": "tokens.css"
}

// web/package.json
{
  "name": "@portfolio/web",
  "version": "1.0.0",
  "dependencies": {
    "@portfolio/styles": "*"
  }
}
```

**Installation:** Run `npm install` at the root. npm automatically creates symlinks allowing projects to import shared packages.

### Pattern 3: GitHub Actions Static Deployment

**What:** Official GitHub workflow using `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages` for automated static site deployment.

**When to use:** Any static site deployment to GitHub Pages, especially when artifacts are built (or in this case, when deploying specific directories from monorepo).

**Example:**
```yaml
# Source: https://github.com/actions/starter-workflows/blob/main/pages/static.yml

name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'web'  # Deploy only web directory from monorepo

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Critical requirements:**
- Minimum permissions: `pages: write` and `id-token: write`
- Must set `environment: github-pages` for deployment protection
- Artifact must be gzip tar file under 10GB
- No symbolic or hard links in artifact

### Pattern 4: WCAG Contrast Validation in CI/CD

**What:** Automated accessibility testing using Pa11y CLI to validate contrast ratios during deployment.

**When to use:** Every deployment to catch accessibility regressions before production.

**Example:**
```yaml
# Add to .github/workflows/deploy.yml before deployment step

- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

- name: Install Pa11y
  run: npm install -g pa11y-ci

- name: Run Accessibility Tests
  run: |
    # Start local server (or test deployed preview)
    npx http-server web -p 8080 &
    sleep 3
    pa11y-ci http://localhost:8080 \
      --standard WCAG2AA \
      --threshold 0
```

**.pa11yci.json configuration:**
```json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"],
    "threshold": 0
  },
  "urls": [
    "http://localhost:8080",
    "http://localhost:8080/about.html"
  ]
}
```

### Anti-Patterns to Avoid

- **Pure black backgrounds (#000000):** Causes eye strain and halation effect. Use charcoal (#0E0E0E to #1A1A1A) instead while maintaining 4.5:1 contrast.

- **Missing fallback values in CSS variables:** Always provide fallbacks: `var(--color-primary, #22C55E)` not `var(--color-primary)`.

- **Inverting light mode colors for dark mode:** Rarely maintains WCAG compliance. Design dark palette from scratch with contrast testing.

- **Relying solely on color for meaning:** Use icons, labels, or patterns alongside color to support colorblind users.

- **Caching node_modules in CI/CD:** Cache `~/.npm` directory instead. Caching node_modules conflicts with `npm ci` and slows down workflows.

- **Forgetting path prefixes for GitHub Pages:** Assets deployed to `username.github.io/repo-name/` need path prefix `/repo-name/` for CSS, JS, images. Test locally with base path.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Contrast ratio calculation | Custom color contrast function | WebAIM Contrast Checker, Pa11y CLI | WCAG formula is complex: requires relative luminance calculation with sRGB transformation, non-linear RGB conversion thresholds, and precise rounding rules. Easy to implement incorrectly. |
| CSS reset/normalize | Custom reset stylesheet | Modern-normalize or sanitize.css | Browser inconsistencies are extensive and constantly changing. Established libraries track quirks across Chrome, Firefox, Safari, Edge. |
| Monorepo dependency management | Custom symlink scripts | npm workspaces | Handles transitive dependencies, version resolution, lifecycle scripts. Custom scripts break on edge cases. |
| GitHub Pages deployment | Custom git push scripts | GitHub Actions (actions/deploy-pages) | Handles artifact compression, CNAME configuration, branch protection, deployment status tracking. Rolling your own misses edge cases. |

**Key insight:** Accessibility testing and monorepo management appear simple but have extensive edge cases. Using established tools prevents regressions and compatibility issues that only surface in production.

## Common Pitfalls

### Pitfall 1: Incorrect Contrast Calculation Leading to False WCAG Pass

**What goes wrong:** Manually calculating contrast ratios without proper relative luminance conversion, causing colors to appear compliant when they're not. For example, assuming lighter hex values automatically meet 4.5:1 contrast.

**Why it happens:** WCAG contrast formula requires non-linear sRGB to linear RGB transformation before luminance calculation. The formula `(L1 + 0.05) / (L2 + 0.05)` uses relative luminance `L = 0.2126 * R + 0.7152 * G + 0.0722 * B`, but R, G, B must first be transformed based on specific thresholds. Skipping transformation produces incorrect ratios.

**How to avoid:** Always use automated tools (Pa11y, WebAIM Contrast Checker, Lighthouse) for validation. Never rely on visual judgment or simplified calculations. Include automated testing in CI/CD.

**Warning signs:**
- Colors that "look fine" but fail automated testing
- Inconsistent results between different testing tools (indicates manual calculation error)
- Complaints from users about readability despite "passing" tests

**Reference:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html

### Pitfall 2: GitHub Pages 404s Due to Missing Path Prefixes

**What goes wrong:** Site deploys successfully but all assets (CSS, JS, images) return 404 errors. Navigation links break. Page loads but appears unstyled.

**Why it happens:** Local development serves from root (`/`), but GitHub Pages deploys to `/<repository-name>/`. Absolute paths like `/css/main.css` resolve to `username.github.io/css/main.css` instead of `username.github.io/repo-name/css/main.css`.

**How to avoid:**
- Use relative paths (`./css/main.css`) instead of absolute paths (`/css/main.css`)
- Test locally with a base path using `<base href="/repo-name/">` in `<head>`
- Configure `actions/configure-pages` to inject correct base URL
- Use repository name variable in paths: `{{ site.baseurl }}/css/main.css` (if using Jekyll) or JavaScript to prepend path

**Warning signs:**
- GitHub Actions shows successful deployment but site is broken
- HTML loads but no styling applied
- Browser console shows 404 errors for all assets
- Works locally but fails in production

**Reference:** https://maximorlov.com/deploying-to-github-pages-dont-forget-to-fix-your-links/

### Pitfall 3: Pure Black (#000000) Causing Eye Strain and Accessibility Issues

**What goes wrong:** Using pure black backgrounds creates harsh contrast that causes eye strain, reduces legibility for users with astigmatism (halation effect), and ironically fails accessibility goals despite high contrast ratios.

**Why it happens:** Designers assume "maximum contrast = maximum accessibility." Pure black (#000000) with white text (#FFFFFF) achieves 21:1 contrast, far exceeding WCAG requirements. However, extreme contrast creates a "bleeding" effect where white text appears to glow, making reading difficult.

**How to avoid:**
- Use dark charcoal (#0E0E0E to #1A1A1A) instead of pure black
- Pair with off-white text (#F3F4F6 or #E5E7EB) instead of pure white
- Maintain 4.5:1 contrast ratio for normal text (18px+) and 3:1 for large text (24px+ or 18px bold)
- Test with users who have astigmatism or light sensitivity

**Warning signs:**
- User feedback about eye strain or difficulty reading
- Text appears to "glow" or have halos around letters
- Design looks harsh or aggressive instead of comfortable

**Reference:** https://www.accessibilitychecker.org/blog/dark-mode-accessibility/

### Pitfall 4: Missing CSS Variable Fallbacks Breaking Theme Inheritance

**What goes wrong:** Components silently fail when CSS variables are undefined in certain scopes. Colors or spacing values disappear, leaving broken layouts or invisible text.

**Why it happens:** CSS variables inherit through the DOM tree. If a variable is defined in `:root` but accessed in a shadow DOM or iframe, it may be undefined. Similarly, typos in variable names (`--color-primary` vs `--color-primry`) cause silent failures—CSS ignores the property rather than throwing errors.

**How to avoid:**
- Always provide fallback values: `color: var(--color-text-primary, #F3F4F6);`
- Use CSS linting tools to catch undefined variables
- Test components in isolation to verify variable availability
- Document required CSS variables in component comments

**Warning signs:**
- Intermittent styling issues that appear/disappear
- Components work in some contexts but not others
- No error messages despite visible breakage
- Styles break when moving components between pages

**Reference:** https://blog.pixelfreestudio.com/css-variables-gone-wrong-pitfalls-to-watch-out-for/

### Pitfall 5: Inadequate Focus Indicators on Dark Backgrounds

**What goes wrong:** Focus outlines that are visible on light backgrounds become invisible or barely perceptible on dark backgrounds, making keyboard navigation impossible for low-vision users.

**Why it happens:** Default browser focus styles (often thin blue outline) have insufficient contrast against dark backgrounds. Developers design for default state but overlook hover, focus, and disabled states. Color-only focus indicators (changing button color slightly) fail for colorblind users.

**How to avoid:**
- Design focus states explicitly with 3:1 contrast against background
- Use multi-layered focus indicators: outline + box-shadow for depth
- Never rely solely on color; add border width changes or underlines
- Test with keyboard-only navigation (unplug mouse)
- Use `:focus-visible` for non-intrusive focus styles on mouse users

**Example:**
```css
button:focus-visible {
  outline: 2px solid var(--color-neon-green-400);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}
```

**Warning signs:**
- Difficulty identifying which element has focus during keyboard navigation
- Users complain about losing track of position when tabbing
- Focus indicator blends into background in dark mode

**Reference:** https://www.accessibilitychecker.org/blog/dark-mode-accessibility/

### Pitfall 6: GitHub Actions Timeout on Large Artifact Uploads

**What goes wrong:** Deployment step hangs with "Timeout reached, aborting!" error. Workflow runs for 10+ minutes before failing.

**Why it happens:** GitHub Pages artifact upload has a 10-minute timeout and 10GB size limit. Large artifacts (hundreds of unoptimized images, duplicate dependencies, entire node_modules directory) exceed time or size limits.

**How to avoid:**
- Upload only necessary files (exclude node_modules, .git, source files)
- Optimize images before committing (compress, resize, use modern formats)
- Use `.gitattributes` to exclude large files from Pages artifact
- Configure `actions/upload-pages-artifact` with specific `path` parameter
- Review artifact size in Actions summary before deployment

**Warning signs:**
- Workflow takes >5 minutes for simple static site
- Artifact size shown in Actions UI is >500MB
- Timeout errors in deployment step
- Duplicate or unnecessary files in deployed site

**Reference:** https://github.com/orgs/community/discussions/35197

## Code Examples

Verified patterns from official sources:

### Complete Design Token System

```css
/* Source: https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/ */

/* ============================================
   LAYER 1: PRIMITIVE TOKENS
   Raw design values without semantic meaning
   ============================================ */
:root {
  /* Color primitives - Dark/Tech palette */
  --primitive-color-charcoal-900: #0A0A0A;
  --primitive-color-charcoal-800: #0E0E0E;
  --primitive-color-charcoal-700: #1A1A1A;
  --primitive-color-charcoal-600: #2D2D2D;
  --primitive-color-charcoal-500: #404040;

  --primitive-color-neon-green-300: #4ADE80;
  --primitive-color-neon-green-400: #22C55E;
  --primitive-color-neon-green-500: #16A34A;
  --primitive-color-neon-green-600: #15803D;

  --primitive-color-electric-blue-300: #60A5FA;
  --primitive-color-electric-blue-400: #3A82FF;
  --primitive-color-electric-blue-500: #2563EB;

  --primitive-color-gray-50: #F9FAFB;
  --primitive-color-gray-100: #F3F4F6;
  --primitive-color-gray-200: #E5E7EB;
  --primitive-color-gray-800: #9CA3AF;

  /* Spacing primitives - 4px base scale */
  --primitive-spacing-1: 0.25rem;   /* 4px */
  --primitive-spacing-2: 0.5rem;    /* 8px */
  --primitive-spacing-3: 0.75rem;   /* 12px */
  --primitive-spacing-4: 1rem;      /* 16px */
  --primitive-spacing-5: 1.25rem;   /* 20px */
  --primitive-spacing-6: 1.5rem;    /* 24px */
  --primitive-spacing-8: 2rem;      /* 32px */
  --primitive-spacing-10: 2.5rem;   /* 40px */
  --primitive-spacing-12: 3rem;     /* 48px */

  /* Typography primitives */
  --primitive-font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --primitive-font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', monospace;

  --primitive-font-size-xs: 0.75rem;    /* 12px */
  --primitive-font-size-sm: 0.875rem;   /* 14px */
  --primitive-font-size-base: 1rem;     /* 16px */
  --primitive-font-size-lg: 1.125rem;   /* 18px */
  --primitive-font-size-xl: 1.25rem;    /* 20px */
  --primitive-font-size-2xl: 1.5rem;    /* 24px */
  --primitive-font-size-3xl: 1.875rem;  /* 30px */
  --primitive-font-size-4xl: 2.25rem;   /* 36px */

  --primitive-font-weight-normal: 400;
  --primitive-font-weight-medium: 500;
  --primitive-font-weight-semibold: 600;
  --primitive-font-weight-bold: 700;

  --primitive-line-height-tight: 1.25;
  --primitive-line-height-normal: 1.5;
  --primitive-line-height-relaxed: 1.75;

  /* Border radius primitives */
  --primitive-radius-sm: 0.125rem;   /* 2px */
  --primitive-radius-base: 0.25rem;  /* 4px */
  --primitive-radius-md: 0.375rem;   /* 6px */
  --primitive-radius-lg: 0.5rem;     /* 8px */
  --primitive-radius-xl: 0.75rem;    /* 12px */
  --primitive-radius-full: 9999px;
}

/* ============================================
   LAYER 2: SEMANTIC TOKENS
   Contextual meaning mapped to primitives
   ============================================ */
:root {
  /* Background colors - semantic roles */
  --color-bg-primary: var(--primitive-color-charcoal-800, #0E0E0E);
  --color-bg-secondary: var(--primitive-color-charcoal-700, #1A1A1A);
  --color-bg-elevated: var(--primitive-color-charcoal-600, #2D2D2D);
  --color-bg-overlay: var(--primitive-color-charcoal-900, #0A0A0A);

  /* Text colors */
  --color-text-primary: var(--primitive-color-gray-50, #F9FAFB);
  --color-text-secondary: var(--primitive-color-gray-100, #F3F4F6);
  --color-text-muted: var(--primitive-color-gray-200, #E5E7EB);
  --color-text-disabled: var(--primitive-color-gray-800, #9CA3AF);

  /* Interactive colors */
  --color-interactive-primary: var(--primitive-color-neon-green-400, #22C55E);
  --color-interactive-primary-hover: var(--primitive-color-neon-green-300, #4ADE80);
  --color-interactive-primary-active: var(--primitive-color-neon-green-500, #16A34A);

  --color-interactive-secondary: var(--primitive-color-electric-blue-400, #3A82FF);
  --color-interactive-secondary-hover: var(--primitive-color-electric-blue-300, #60A5FA);
  --color-interactive-secondary-active: var(--primitive-color-electric-blue-500, #2563EB);

  /* Border colors */
  --color-border-default: var(--primitive-color-charcoal-500, #404040);
  --color-border-focus: var(--primitive-color-neon-green-400, #22C55E);

  /* Semantic spacing */
  --spacing-page-padding-mobile: var(--primitive-spacing-4, 1rem);
  --spacing-page-padding-desktop: var(--primitive-spacing-8, 2rem);
  --spacing-section-gap: var(--primitive-spacing-12, 3rem);
  --spacing-component-gap: var(--primitive-spacing-6, 1.5rem);
  --spacing-element-gap: var(--primitive-spacing-3, 0.75rem);

  /* Semantic typography */
  --font-family-body: var(--primitive-font-family-sans);
  --font-family-code: var(--primitive-font-family-mono);

  --font-size-heading-1: var(--primitive-font-size-4xl, 2.25rem);
  --font-size-heading-2: var(--primitive-font-size-3xl, 1.875rem);
  --font-size-heading-3: var(--primitive-font-size-2xl, 1.5rem);
  --font-size-body: var(--primitive-font-size-base, 1rem);
  --font-size-caption: var(--primitive-font-size-sm, 0.875rem);

  /* Semantic borders */
  --radius-button: var(--primitive-radius-md, 0.375rem);
  --radius-card: var(--primitive-radius-lg, 0.5rem);
  --radius-input: var(--primitive-radius-base, 0.25rem);
}

/* ============================================
   LAYER 3: COMPONENT TOKENS
   Specific component implementations
   ============================================ */

/* Button component */
.button-primary {
  background-color: var(--color-interactive-primary);
  color: var(--color-bg-primary);
  padding: var(--primitive-spacing-2) var(--primitive-spacing-4);
  font-size: var(--font-size-body);
  font-weight: var(--primitive-font-weight-medium);
  border-radius: var(--radius-button);
  border: none;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.button-primary:hover {
  background-color: var(--color-interactive-primary-hover);
}

.button-primary:active {
  background-color: var(--color-interactive-primary-active);
}

.button-primary:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}

/* Card component */
.card {
  background-color: var(--color-bg-elevated);
  padding: var(--spacing-component-gap);
  border-radius: var(--radius-card);
  border: 1px solid var(--color-border-default);
}

/* Typography components */
h1 {
  font-size: var(--font-size-heading-1);
  font-weight: var(--primitive-font-weight-bold);
  line-height: var(--primitive-line-height-tight);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-element-gap);
}

body {
  font-family: var(--font-family-body);
  font-size: var(--font-size-body);
  line-height: var(--primitive-line-height-normal);
  color: var(--color-text-secondary);
  background-color: var(--color-bg-primary);
}

/* Code blocks */
code {
  font-family: var(--font-family-code);
  font-size: var(--primitive-font-size-sm);
  background-color: var(--color-bg-secondary);
  padding: var(--primitive-spacing-1) var(--primitive-spacing-2);
  border-radius: var(--primitive-radius-sm);
  color: var(--color-text-primary);
}
```

### GitHub Actions Deployment Workflow with Caching

```yaml
# Source: https://github.com/actions/starter-workflows/blob/main/pages/static.yml
# Enhanced with: https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows

name: Deploy to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'  # Automatically caches ~/.npm

      - name: Install dependencies
        run: npm ci

      - name: Install Pa11y globally
        run: npm install -g pa11y-ci

      - name: Start test server
        run: |
          npx http-server web -p 8080 &
          sleep 3

      - name: Run accessibility tests
        run: |
          pa11y-ci http://localhost:8080 \
            --standard WCAG2AA \
            --threshold 0

  deploy:
    needs: test  # Only deploy if tests pass
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'web'  # Deploy only web directory from monorepo

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Pa11y Configuration for WCAG Testing

```json
// .pa11yci.json
// Source: https://github.com/pa11y/pa11y-ci

{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": [
      "axe",
      "htmlcs"
    ],
    "chromeLaunchConfig": {
      "args": [
        "--no-sandbox",
        "--disable-setuid-sandbox"
      ]
    },
    "timeout": 10000,
    "threshold": 0,
    "includeNotices": false,
    "includeWarnings": true
  },
  "urls": [
    "http://localhost:8080/",
    "http://localhost:8080/about.html",
    "http://localhost:8080/projects.html"
  ]
}
```

### npm Workspaces Configuration

```json
// Root package.json
// Source: https://medium.com/@sanjaytomar717/the-ultimate-guide-to-building-a-monorepo-in-2025-sharing-code-like-the-pros-ee4d6d56abaa

{
  "name": "portfolio-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "shared/styles",
    "web",
    "ios-demo"
  ],
  "scripts": {
    "test:a11y": "pa11y-ci --config .pa11yci.json",
    "dev:web": "cd web && npx http-server -p 8080",
    "dev:ios-demo": "cd ios-demo && npx http-server -p 8081"
  },
  "devDependencies": {
    "pa11y-ci": "^4.0.0",
    "http-server": "^14.1.1"
  }
}
```

```json
// shared/styles/package.json
{
  "name": "@portfolio/styles",
  "version": "1.0.0",
  "description": "Shared design tokens and CSS utilities",
  "main": "tokens.css",
  "files": [
    "tokens.css",
    "reset.css",
    "utilities.css"
  ]
}
```

```json
// web/package.json
{
  "name": "@portfolio/web",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@portfolio/styles": "*"
  }
}
```

**Usage in HTML:**
```html
<!-- web/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>

  <!-- Import shared design tokens from workspace -->
  <!-- In development: served via symlink -->
  <!-- In production: GitHub Actions copies shared files -->
  <link rel="stylesheet" href="../shared/styles/tokens.css">
  <link rel="stylesheet" href="../shared/styles/reset.css">
  <link rel="stylesheet" href="./css/main.css">
</head>
<body>
  <button class="button-primary">Call to Action</button>
</body>
</html>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| GitHub Pages from `gh-pages` branch | GitHub Actions with `actions/deploy-pages` | 2022-2023 | Eliminates manual branch management, supports build steps, provides deployment protection |
| Sass/LESS for theming | CSS Custom Properties | 2020-2021 | Native browser support, no compilation, dynamic runtime theming, simpler setup |
| Lerna for monorepos | npm workspaces (native) | 2020 (npm 7) | Zero dependencies, built into npm, simpler configuration |
| Manual WCAG testing | Automated CI/CD testing (Pa11y, Lighthouse) | 2019-2021 | Prevents regressions, scales to large sites, catches issues before deployment |
| Pure black (#000) dark mode | Charcoal (#0E0E0E-#1A1A1A) dark mode | 2021-2023 | Reduces eye strain, improves readability for users with astigmatism, maintains accessibility |

**Deprecated/outdated:**
- **Jekyll themes for GitHub Pages:** Still supported but unnecessary for custom HTML/CSS. Adds complexity and build step.
- **Bower for front-end dependencies:** Dead since 2017. Use npm even for front-end-only projects.
- **`actions/checkout@v2` and older:** Use v4+ for better performance and security.
- **Pure `#000000` black in dark themes:** Industry moved to softer charcoal (#0E0E0E) around 2021-2023 for better accessibility.

## Open Questions

1. **Responsive breakpoints in shared tokens**
   - What we know: Design tokens typically define primitives and semantics but not media queries
   - What's unclear: Best practice for sharing responsive breakpoints across web and iOS demo (which has different viewport)
   - Recommendation: Define breakpoint primitives (`--breakpoint-mobile: 640px`, `--breakpoint-tablet: 768px`, `--breakpoint-desktop: 1024px`) but implement media queries in project-specific CSS. iOS demo can use different breakpoints while maintaining same spacing/color tokens.

2. **GitHub Pages base URL injection for monorepo**
   - What we know: `actions/configure-pages` can inject base URL into builds
   - What's unclear: How to handle base URL for vanilla HTML/CSS without build step
   - Recommendation: Use relative paths (`./css/main.css`) instead of absolute paths (`/css/main.css`), or add minimal JavaScript to detect base path: `const basePath = window.location.pathname.split('/')[1];` for dynamic asset loading.

3. **Testing iOS demo web version on actual devices**
   - What we know: iOS demo is a web version showing screenshots/demo of the actual iOS app
   - What's unclear: Whether to test iOS web demo on mobile Safari specifically or just desktop browsers
   - Recommendation: Test on desktop browsers only since it's a demo/preview, not the actual iOS app. Real device testing should focus on actual Xcode iOS app, not web demo.

4. **Sharing design tokens between CSS and iOS (Swift UI)**
   - What we know: iOS project will be native Xcode, web uses CSS
   - What's unclear: Whether to maintain synchronized tokens between CSS and Swift or treat them independently
   - Recommendation: Start with independent tokens. If synchronization becomes critical, consider Style Dictionary to generate both CSS and Swift token files from single JSON source. However, this adds build complexity that contradicts "zero build step" requirement. Revisit in later phase if needed.

## Sources

### Primary (HIGH confidence)
- [W3C WCAG 2.1 Contrast Minimum](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) - Official WCAG specification
- [GitHub Actions: deploy-pages](https://github.com/actions/deploy-pages) - Official GitHub deployment action
- [GitHub Actions: Starter Workflows - Static Pages](https://github.com/actions/starter-workflows/blob/main/pages/static.yml) - Official workflow template
- [GitHub Docs: Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) - Official documentation
- [GitHub Docs: Caching dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows) - Official caching guide
- [MDN: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/--*) - CSS variables reference

### Secondary (MEDIUM confidence)
- [Penpot: The developer's guide to design tokens and CSS variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) - Comprehensive guide with code examples
- [Smashing Magazine: Best Practices For Naming Design Tokens](https://www.smashingmagazine.com/2024/05/naming-best-practices/) - Industry naming conventions
- [WebAIM: Contrast Checker](https://webaim.org/resources/contrastchecker/) - Trusted accessibility resource
- [The Ultimate Guide to Building a Monorepo in 2026](https://medium.com/@sanjaytomar717/the-ultimate-guide-to-building-a-monorepo-in-2025-sharing-code-like-the-pros-ee4d6d56abaa) - npm workspaces tutorial
- [Pa11y GitHub Repository](https://github.com/pa11y/pa11y) - Official Pa11y documentation
- [Colour Contrast CLI](https://github.com/Pushedskydiver/Colour-Contrast-CLI) - CLI tool for contrast testing

### Secondary (MEDIUM confidence) - Design patterns
- [Accessibility Checker: The Designer's Guide to Dark Mode Accessibility](https://www.accessibilitychecker.org/blog/dark-mode-accessibility/) - Dark mode best practices
- [WebPortfolios.dev: Best Color Palettes for Developer Portfolios (2025)](https://www.webportfolios.dev/blog/best-color-palettes-for-developer-portfolio) - Portfolio-specific color guidance
- [Vev: 6 Dark Mode Website Color Palette Ideas](https://www.vev.design/blog/dark-mode-website-color-palette/) - Dark mode palette examples
- [Go Make Things: How I structure my vanilla JS projects](https://gomakethings.com/how-i-structure-my-vanilla-js-projects/) - Vanilla JS project structure

### Secondary (MEDIUM confidence) - Pitfalls
- [Pixel Free Studio: CSS Variables Gone Wrong](https://blog.pixelfreestudio.com/css-variables-gone-wrong-pitfalls-to-watch-out-for/) - Common CSS variable mistakes
- [Maxim Orlov: Deploying to GitHub Pages? Don't Forget to Fix Your Links](https://maximorlov.com/deploying-to-github-pages-dont-forget-to-fix-your-links/) - Path prefix issues
- [GitHub Community: Troubleshooting pages build and deployment timeout](https://github.com/orgs/community/discussions/35197) - Deployment timeout issues
- [BOIA: Offering a Dark Mode Doesn't Satisfy WCAG Color Contrast Requirements](https://www.boia.org/blog/offering-a-dark-mode-doesnt-satisfy-wcag-color-contrast-requirements) - Dark mode misconceptions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All tools are official (native CSS, npm workspaces, GitHub Actions) or widely adopted (Pa11y)
- Architecture: HIGH - Three-layer token pattern verified across multiple authoritative sources (Penpot, Smashing Magazine, design system documentation)
- Pitfalls: MEDIUM-HIGH - Common issues verified through GitHub community discussions and accessibility resources; contrast calculation verified via W3C specification
- Dark mode colors: MEDIUM - Best practices confirmed across multiple 2025-2026 sources, though specific hex values vary by source

**Research date:** 2026-02-17
**Valid until:** ~2026-04-17 (60 days - stable domain with slow-moving standards)

**Notes:**
- WCAG standards are stable; contrast requirements unlikely to change
- GitHub Actions syntax evolves slowly; verify action versions quarterly
- CSS Custom Properties are mature technology; minimal breaking changes expected
- npm workspaces feature-complete as of npm 7; no major changes anticipated
- Dark mode color trends may shift, but accessibility principles remain constant
