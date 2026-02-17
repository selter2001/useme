# Architecture Research

**Domain:** Multi-Project Freelancer Portfolio (Web + iOS)
**Researched:** 2026-02-17
**Confidence:** MEDIUM

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         GitHub Pages Hosting                             │
│                    username.github.io/useme/                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   Portfolio   │  │   Landing    │  │  Expenses    │  │  Fitness   │ │
│  │   Website     │  │     Page     │  │  Calculator  │  │  Tracker   │ │
│  │  (root / )    │  │  (/landing)  │  │ (/expenses)  │  │ (/fitness) │ │
│  └───────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬─────┘ │
│          │                 │                 │                 │        │
│          └─────────────────┴─────────────────┴─────────────────┘        │
│                                   │                                      │
│                          Shared Assets Layer                             │
│  ┌──────────────────────────────────────────────────────────────┐       │
│  │  • CSS Variables (dark theme)                                │       │
│  │  • Color Tokens (:root, [data-theme="dark"])                 │       │
│  │  • Typography System (fonts, scales)                         │       │
│  │  • Reusable Components (buttons, cards, forms)               │       │
│  └──────────────────────────────────────────────────────────────┘       │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         SwiftUI iOS Apps                                 │
│                      (Separate XCode Projects)                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────────────┐  ┌──────────────────────────────────┐│
│  │   ExpensesCalculatorApp       │  │   FitnessTrackerApp              ││
│  │                               │  │                                  ││
│  │  App/                         │  │  App/                            ││
│  │  Views/                       │  │  Views/                          ││
│  │  └─ Screens/                  │  │  └─ Screens/                     ││
│  │     └─ Components/            │  │     └─ Components/               ││
│  │  Models/                      │  │  Models/                         ││
│  │  Services/ (optional)         │  │  Services/ (optional)            ││
│  │  Resources/                   │  │  Resources/                      ││
│  │  └─ Assets.xcassets/          │  │  └─ Assets.xcassets/             ││
│  │     └─ Colors (semantic)      │  │     └─ Colors (semantic)         ││
│  │                               │  │                                  ││
│  └───────────────────────────────┘  └──────────────────────────────────┘│
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Portfolio Website | Root site showcasing all projects, main entry point | Static HTML/CSS/JS at root (`/`), links to other apps |
| Landing Page | Dynamic contact form demonstration | Static HTML/CSS/JS at `/landing/`, form validation |
| Web Demos | Browser versions of iOS apps | Static HTML/CSS/JS at `/expenses/` and `/fitness/`, mimic iOS UI |
| SwiftUI Apps | Native iOS applications | Separate XCode projects, SwiftUI View pattern |
| Shared Assets | Design system consistency | CSS variables for web, Asset Catalog colors for iOS |
| GitHub Actions | Build and deployment pipeline | Workflow to deploy all web projects to `gh-pages` branch |

## Recommended Project Structure

### Monorepo Structure (Recommended)

**Verdict:** Use a monorepo. All projects share the same dark/tech theme and need asset consistency. Separate repos would duplicate design tokens and make updates painful.

```
useme/                              # Root repository
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment workflow
├── .planning/                      # Project planning (GSD system)
│   ├── research/
│   └── roadmap/
├── portfolio/                      # Root website (/)
│   ├── index.html
│   ├── css/
│   │   ├── tokens.css             # Design tokens (CSS variables)
│   │   ├── reset.css
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   └── assets/
│       ├── images/
│       └── fonts/
├── landing/                        # Landing page with contact form (/landing)
│   ├── index.html
│   ├── css/
│   │   └── landing.css
│   ├── js/
│   │   └── form-validation.js
│   └── assets/
├── expenses/                       # Expenses Calculator web demo (/expenses)
│   ├── index.html
│   ├── css/
│   │   └── expenses.css
│   ├── js/
│   │   ├── app.js                 # Main app logic
│   │   └── calculator.js          # Calculator engine
│   └── assets/
├── fitness/                        # Fitness Tracker web demo (/fitness)
│   ├── index.html
│   ├── css/
│   │   └── fitness.css
│   ├── js/
│   │   ├── app.js
│   │   └── tracker.js
│   └── assets/
├── shared/                         # Shared assets across all web projects
│   ├── css/
│   │   ├── tokens.css             # Master design tokens
│   │   ├── components.css         # Reusable components (buttons, cards)
│   │   └── utilities.css          # Utility classes
│   ├── js/
│   │   └── utils.js               # Shared utilities
│   └── assets/
│       ├── fonts/
│       └── icons/
├── ios-apps/                       # SwiftUI apps (not deployed to web)
│   ├── ExpensesCalculator/
│   │   ├── ExpensesCalculator.xcodeproj
│   │   ├── ExpensesCalculator/
│   │   │   ├── App/
│   │   │   │   └── ExpensesCalculatorApp.swift
│   │   │   ├── Views/
│   │   │   │   ├── Screens/
│   │   │   │   │   ├── MainView.swift
│   │   │   │   │   └── HistoryView.swift
│   │   │   │   └── Components/
│   │   │   │       ├── CalculatorButton.swift
│   │   │   │       └── ExpenseCard.swift
│   │   │   ├── Models/
│   │   │   │   └── Expense.swift
│   │   │   └── Resources/
│   │   │       └── Assets.xcassets/
│   │   │           └── Colors/       # Semantic colors matching web tokens
│   │   └── README.md
│   └── FitnessTracker/
│       ├── FitnessTracker.xcodeproj
│       ├── FitnessTracker/
│       │   ├── App/
│       │   ├── Views/
│       │   ├── Models/
│       │   └── Resources/
│       └── README.md
├── dist/                           # Build output (GitHub Pages deployment)
│   ├── index.html                  # Portfolio (root)
│   ├── landing/
│   ├── expenses/
│   ├── fitness/
│   └── 404.html                    # SPA routing support
└── README.md
```

### Structure Rationale

- **`portfolio/`**: Root site lives at domain root (`/`), acts as hub linking to all projects
- **`landing/`, `expenses/`, `fitness/`**: Each web app in its own subdirectory, deployed to `username.github.io/useme/[app-name]`
- **`shared/`**: Single source of truth for design tokens, prevents drift across projects
- **`ios-apps/`**: Separate from web deployments, each is a full XCode project with its own `.xcodeproj`
- **`dist/`**: Build target for GitHub Pages, workflow copies web projects here with shared assets inlined

**Why not separate repos?**
- Design system consistency requires shared assets
- Updates to dark theme would need 4+ PRs across repos
- Harder to show "complete portfolio" in one place
- GitHub Pages URL structure works well with subdirectories

## Architectural Patterns

### Pattern 1: CSS Design Tokens with Three-Layer Architecture

**What:** Organize CSS variables into primitive, semantic, and component-level tokens.

**When to use:** Always. Required for dark theme consistency across 4 web projects.

**Trade-offs:**
- Pros: Single source of truth, instant theme switching, maintainable at scale
- Cons: Initial setup overhead, requires discipline to use semantic tokens instead of primitives

**Example:**
```css
/* shared/css/tokens.css */

/* Layer 1: Primitives (raw values) */
:root {
  --color-gray-900: #0a0a0a;
  --color-gray-800: #1a1a1a;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}

/* Layer 2: Semantic tokens (purpose-based) */
:root {
  --color-background: var(--color-gray-900);
  --color-surface: var(--color-gray-800);
  --color-primary: var(--color-blue-500);
  --color-primary-hover: var(--color-blue-600);
  --color-text: #ffffff;
  --color-text-muted: #a3a3a3;
}

/* Layer 3: Component tokens (component-specific) */
:root {
  --button-background: var(--color-primary);
  --button-background-hover: var(--color-primary-hover);
  --button-text: var(--color-text);
  --card-background: var(--color-surface);
  --card-border: rgba(255, 255, 255, 0.1);
}

/* All projects import this file */
```

**How other projects use it:**
```html
<!-- portfolio/index.html -->
<link rel="stylesheet" href="../shared/css/tokens.css">
<link rel="stylesheet" href="css/main.css">
```

```css
/* portfolio/css/main.css */
.hero-section {
  background: var(--color-background);
  color: var(--color-text);
}

.cta-button {
  background: var(--button-background);
  color: var(--button-text);
}
```

**Confidence:** HIGH (verified via [CSS Variables Complete Guide](https://devtoolbox.dedyn.io/blog/css-variables-complete-guide), [Dark Mode with Design Tokens](https://www.richinfante.com/2024/10/21/tailwind-dark-mode-design-tokens-themes-css))

### Pattern 2: SwiftUI View Pattern (Not MVVM for Small Apps)

**What:** Use SwiftUI's built-in state management (`@State`, `@Binding`) without explicit ViewModels for small demo apps.

**When to use:** For Expenses Calculator and Fitness Tracker iOS apps. These are demos, not production apps requiring 97% test coverage.

**Trade-offs:**
- Pros: Simpler, less boilerplate, embraces SwiftUI's natural patterns
- Cons: Harder to unit test (but demos don't need extensive tests)

**Example:**
```swift
// ios-apps/ExpensesCalculator/Views/Screens/MainView.swift

struct MainView: View {
    @State private var expenses: [Expense] = []
    @State private var currentAmount: String = ""
    @State private var selectedCategory: Category = .food

    var body: some View {
        VStack(spacing: 16) {
            ExpenseInputView(
                amount: $currentAmount,
                category: $selectedCategory,
                onAdd: addExpense
            )

            ExpenseListView(expenses: expenses)
        }
        .padding()
        .background(Color("Background")) // Semantic color from Assets
    }

    private func addExpense() {
        guard let amount = Double(currentAmount) else { return }
        let expense = Expense(amount: amount, category: selectedCategory)
        expenses.append(expense)
        currentAmount = ""
    }
}
```

**When to upgrade to MVVM/Clean Architecture:**
- App grows beyond 5-6 screens
- Need extensive unit testing
- Complex business logic emerges
- State management becomes difficult

**Confidence:** HIGH (verified via [Clean Architecture for SwiftUI](https://nalexn.github.io/clean-architecture-swiftui/), [Stop using MVVM for SwiftUI](https://developer.apple.com/forums/thread/699003), [MVVM in SwiftUI](https://www.avanderlee.com/swiftui/mvvm-architectural-coding-pattern-to-structure-views/))

### Pattern 3: Parallel Web Demos (Not Native Port)

**What:** Web demos mimic iOS UI but use vanilla JavaScript, not SwiftUI-to-web compilation.

**When to use:** Always for this portfolio. Web demos showcase design skills, not code-sharing.

**Trade-offs:**
- Pros: Lightweight, no framework overhead, fast load times, easy to understand
- Cons: Code duplication between iOS and web (but that's fine for demos)

**Example:**
```javascript
// expenses/js/app.js

class ExpenseApp {
    constructor() {
        this.expenses = [];
        this.currentAmount = '';
        this.selectedCategory = 'food';
        this.init();
    }

    init() {
        this.renderInput();
        this.renderList();
        this.attachEventListeners();
    }

    addExpense() {
        const amount = parseFloat(this.currentAmount);
        if (isNaN(amount)) return;

        this.expenses.push({
            amount,
            category: this.selectedCategory,
            date: new Date()
        });

        this.currentAmount = '';
        this.renderList();
    }

    renderList() {
        const container = document.getElementById('expense-list');
        container.innerHTML = this.expenses
            .map(expense => `
                <div class="expense-card">
                    <span class="amount">$${expense.amount.toFixed(2)}</span>
                    <span class="category">${expense.category}</span>
                </div>
            `)
            .join('');
    }
}

const app = new ExpenseApp();
```

**Confidence:** MEDIUM (verified via [Vanilla JS TodoMVC](https://frontendmasters.com/blog/vanilla-javascript-todomvc/), [Capacitor with VanillaJS](https://ionic.io/blog/create-powerful-native-mobile-apps-with-capacitor-vanillajs))

### Pattern 4: Asset Catalog Colors for iOS (Mirroring Web Tokens)

**What:** Use Xcode Asset Catalog to define semantic colors that mirror web CSS variables.

**When to use:** Both iOS apps. Ensures visual consistency between web and iOS versions.

**Trade-offs:**
- Pros: Automatic dark mode support, semantic naming, consistent with web
- Cons: Manual synchronization between web tokens and iOS assets (document mapping)

**Example:**
```
ios-apps/ExpensesCalculator/Resources/Assets.xcassets/Colors/
├── Background.colorset/
│   └── Contents.json          # Maps to --color-background
├── Surface.colorset/
│   └── Contents.json          # Maps to --color-surface
├── Primary.colorset/
│   └── Contents.json          # Maps to --color-primary
└── TextPrimary.colorset/
    └── Contents.json          # Maps to --color-text
```

**Usage in SwiftUI:**
```swift
VStack {
    Text("Total Expenses")
        .foregroundColor(Color("TextPrimary"))
}
.background(Color("Background"))
.cornerRadius(12)
```

**Mapping document** (create in `shared/DESIGN_TOKENS.md`):
```markdown
| Token Name | Web (CSS Variable) | iOS (Asset Catalog) | Value (Dark) |
|------------|-------------------|---------------------|--------------|
| Background | --color-background | Background | #0a0a0a |
| Surface | --color-surface | Surface | #1a1a1a |
| Primary | --color-primary | Primary | #3b82f6 |
| Text | --color-text | TextPrimary | #ffffff |
```

**Confidence:** HIGH (verified via [Supporting Dark Mode in iOS](https://developer.apple.com/documentation/uikit/appearance_customization/supporting_dark_mode_in_your_interface/), [Dark Mode Assets for UI Design](https://webpeak.org/blog/designing-dark-mode-assets-for-ui-design/))

## Data Flow

### GitHub Pages Deployment Flow

```
[Local Development]
    ↓
[Developer edits in portfolio/, landing/, expenses/, fitness/]
    ↓
[Git push to main branch]
    ↓
[GitHub Actions workflow triggers]
    ↓
[Workflow copies projects to dist/ with shared assets]
    ↓
    ├─→ dist/index.html (portfolio/index.html + shared/css/tokens.css)
    ├─→ dist/landing/* (landing/* + shared assets)
    ├─→ dist/expenses/* (expenses/* + shared assets)
    └─→ dist/fitness/* (fitness/* + shared assets)
    ↓
[Workflow deploys dist/ to gh-pages branch]
    ↓
[GitHub Pages serves from gh-pages branch]
    ↓
[Live at username.github.io/useme/]
    ├─→ / (portfolio)
    ├─→ /landing/
    ├─→ /expenses/
    └─→ /fitness/
```

### Web App State Flow (Per App)

```
[User Interaction]
    ↓
[Event Handler in app.js]
    ↓
[Update In-Memory State (JavaScript object)]
    ↓
[Render Updated UI (DOM manipulation)]
    ↓
[Optional: Persist to localStorage]
```

**No backend, no database.** All web demos are client-side only.

### iOS App State Flow

```
[User Interaction]
    ↓
[SwiftUI View triggers action]
    ↓
[@State variable updates]
    ↓
[SwiftUI automatically re-renders View]
    ↓
[Optional: Persist to UserDefaults or SwiftData]
```

### Design Token Synchronization Flow

```
[Design decision made]
    ↓
[Update shared/css/tokens.css]
    ↓
[Update shared/DESIGN_TOKENS.md mapping]
    ↓
[Manually update iOS Asset Catalog colors]
    ↓
[Commit all changes together]
```

**Manual sync is fine for portfolio.** Only 10-15 color tokens. Automation overkill.

## URL Structure and Routing

### GitHub Pages URL Structure

| Project | URL | Source Folder | Notes |
|---------|-----|---------------|-------|
| Portfolio | `username.github.io/useme/` | `portfolio/` | Root site, main hub |
| Landing | `username.github.io/useme/landing/` | `landing/` | Contact form demo |
| Expenses | `username.github.io/useme/expenses/` | `expenses/` | Web demo of iOS app |
| Fitness | `username.github.io/useme/fitness/` | `fitness/` | Web demo of iOS app |

### Clean URLs Configuration

**GitHub Pages limitation:** Cannot deploy multiple repos under single custom domain with subpaths.

**Workaround for cleaner URLs:**
- Use `index.html` in each subdirectory (already planned)
- Trailing slashes handled automatically by GitHub Pages
- No `.html` extensions needed in links

**Links from portfolio to apps:**
```html
<!-- portfolio/index.html -->
<a href="landing/">Landing Page Demo</a>
<a href="expenses/">Expenses Calculator</a>
<a href="fitness/">Fitness Tracker</a>
```

**Confidence:** MEDIUM (verified via [Deploying Multiple Apps from Monorepo to GitHub Pages](https://www.thisdot.co/blog/deploying-multiple-apps-from-a-monorepo-to-github-pages), [GitHub Pages Subdirectory Deployment](https://samhermes.com/posts/deploying-repository-subdirectory-github-pages-site/))

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Initial (4 projects) | Current monorepo structure is perfect. No changes needed. |
| 6-10 projects | Consider build tool (Vite/Parcel) to bundle shared assets automatically instead of manual copying. |
| 10+ projects | Evaluate workspace tools (npm workspaces, Turborepo) for dependency management. Still keep monorepo. |

### Scaling Priorities

**This portfolio won't scale.** It's a fixed scope: 1 portfolio site + 1 landing page + 2 demo apps.

**If it did scale:**

1. **First bottleneck:** Manual asset copying in GitHub Actions workflow
   - **Fix:** Introduce bundler (Vite) to handle shared assets automatically

2. **Second bottleneck:** Inconsistent design tokens between web and iOS
   - **Fix:** Generate iOS Asset Catalog from CSS tokens using script (Style Dictionary)

**Don't prematurely optimize.** Current structure is fine for this scope.

## Anti-Patterns

### Anti-Pattern 1: Framework Overengineering

**What people do:** Use React/Vue/Svelte for simple static portfolio sites.

**Why it's wrong:**
- Adds build complexity
- Slower load times (framework overhead)
- Harder for potential clients to read source (vanilla HTML/CSS/JS is universal)
- Portfolio purpose is to showcase skills, not hide them behind abstraction

**Do this instead:** Use vanilla HTML/CSS/JS. Show you can build without dependencies.

**Exception:** If your portfolio demonstrates framework expertise, then use that framework. But not for general freelancer portfolio.

**Confidence:** HIGH (common industry knowledge)

### Anti-Pattern 2: Separate Repos for Related Projects

**What people do:** Create `useme-portfolio`, `useme-landing`, `useme-expenses`, `useme-fitness` as separate repos.

**Why it's wrong:**
- Shared assets get duplicated or drift out of sync
- Design system updates require 4 PRs
- Can't atomic commit across projects (e.g., "Update primary blue color")
- Harder to showcase "complete portfolio" to potential clients

**Do this instead:** Monorepo with shared assets. All projects in one repo with clear subdirectories.

**Confidence:** HIGH (verified via [Monorepo Guide](https://medium.com/@julakadaredrishi/monorepos-a-comprehensive-guide-with-examples-63202cfab711), direct experience)

### Anti-Pattern 3: Over-architecting iOS Demo Apps

**What people do:** Implement full MVVM + Clean Architecture + Repository Pattern for 3-screen demo app.

**Why it's wrong:**
- Massive overkill for demos
- Harder to understand for portfolio reviewers
- Time-consuming to build
- Fights SwiftUI's natural patterns

**Do this instead:** Use SwiftUI's View pattern with `@State` for small apps. Only add architecture when complexity demands it.

**Confidence:** HIGH (verified via [Clean Architecture for SwiftUI](https://nalexn.github.io/clean-architecture-swiftui/), [Stop using MVVM for SwiftUI](https://developer.apple.com/forums/thread/699003))

### Anti-Pattern 4: Using Git Submodules for Shared Assets

**What people do:** Put `shared/` in separate repo, include as git submodule in each project.

**Why it's wrong:**
- Git submodules are notoriously difficult to work with
- Submodule version drift causes confusion
- Harder onboarding for collaborators
- Overkill for 10-15 CSS variables

**Do this instead:** Keep `shared/` in monorepo. Import via relative paths.

**Confidence:** HIGH (common industry knowledge, monorepo best practices)

## Build Order and Dependencies

### Dependency Graph

```
Shared Assets (CSS tokens, components)
    ↓
    ├─→ Portfolio (root site)
    ├─→ Landing Page
    ├─→ Expenses Web Demo
    └─→ Fitness Web Demo

(Parallel, independent)
    ├─→ Expenses iOS App
    └─→ Fitness iOS App
```

### Recommended Build Order

**Phase 1: Foundation (Build first)**
1. Set up monorepo structure
2. Create `shared/css/tokens.css` with design tokens
3. Create `shared/css/components.css` with reusable components (button, card)
4. Set up GitHub Actions workflow for deployment

**Phase 2: Web Core (Build second)**
5. Build Portfolio website (root site)
   - Uses shared tokens
   - Links to other projects (even if they don't exist yet)
   - Acts as navigation hub

**Phase 3: Web Demos (Build in parallel)**
6. Build Landing Page (independent)
7. Build Expenses Web Demo (independent)
8. Build Fitness Web Demo (independent)

**Phase 4: iOS Apps (Build last, optional for MVP)**
9. Build Expenses iOS App (mirrors web demo UI)
10. Build Fitness iOS App (mirrors web demo UI)

### Why This Order?

1. **Shared assets first** because everything depends on them
2. **Portfolio website second** because it's the entry point and can be published immediately
3. **Web demos in parallel** because they're independent of each other
4. **iOS apps last** because they're nice-to-have, not required for portfolio to be functional

### Build Dependencies

| Project | Depends On | Can Start When |
|---------|------------|----------------|
| Shared Assets | Nothing | Immediately |
| Portfolio | Shared Assets | After tokens defined |
| Landing Page | Shared Assets | After tokens defined |
| Expenses Web | Shared Assets | After tokens defined |
| Fitness Web | Shared Assets | After tokens defined |
| Expenses iOS | Shared Assets (for color mapping) | After web demo complete (to match UI) |
| Fitness iOS | Shared Assets (for color mapping) | After web demo complete (to match UI) |

### Parallel vs Sequential

**Can be built in parallel:**
- Landing Page + Expenses Web + Fitness Web (all depend on shared assets but not each other)

**Must be sequential:**
- Shared Assets → Everything else
- Expenses Web Demo → Expenses iOS App (iOS mirrors web UI)
- Fitness Web Demo → Fitness iOS App (iOS mirrors web UI)

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Deploy via GitHub Actions | Workflow builds dist/ and pushes to gh-pages branch |
| Useme.com | Landing page contact form submits to Useme API | Need API endpoint from Useme platform |
| (Optional) Google Analytics | Script tag in shared header | Track portfolio visits |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Portfolio ↔ Web Apps | HTML links (`<a href="landing/">`) | One-way navigation from portfolio to apps |
| Web Apps ↔ Shared Assets | CSS imports via `<link>` tag | All apps import shared tokens |
| Shared Tokens ↔ iOS Assets | Manual mapping via documentation | Developer manually syncs color values |
| GitHub Actions ↔ Repo Folders | Copy files to dist/ during build | Workflow script copies and inlines shared assets |

## Component Communication Patterns

### Web Projects Communication

```
Portfolio (index.html)
    └─→ Links to landing/, expenses/, fitness/
        (No data passing, just navigation)
```

**No inter-app communication needed.** Each web app is self-contained.

### iOS Apps

**Each iOS app is completely independent.** No shared code between Expenses and Fitness apps.

If you wanted to share SwiftUI components in the future:
```
ios-apps/
├── Shared/
│   ├── Components/
│   └── Extensions/
├── ExpensesCalculator/ (imports from ../Shared)
└── FitnessTracker/ (imports from ../Shared)
```

**Don't build this now.** Only add if you build 3+ iOS apps and see duplication.

## GitHub Actions Deployment Architecture

### Workflow Strategy

**Trigger:** Push to `main` branch

**Steps:**
1. Checkout repository
2. Create `dist/` directory
3. Copy web projects to dist/ with shared assets
4. Deploy dist/ to `gh-pages` branch
5. GitHub Pages serves from `gh-pages`

**Example workflow:**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build dist
        run: |
          mkdir -p dist

          # Copy portfolio (root)
          cp -r portfolio/* dist/

          # Copy other apps to subdirectories
          mkdir -p dist/landing && cp -r landing/* dist/landing/
          mkdir -p dist/expenses && cp -r expenses/* dist/expenses/
          mkdir -p dist/fitness && cp -r fitness/* dist/fitness/

          # Inline shared assets (or copy to each project)
          # Option 1: Copy to each project
          for dir in dist dist/landing dist/expenses dist/fitness; do
            mkdir -p $dir/css
            cp shared/css/tokens.css $dir/css/tokens.css
          done

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Confidence:** MEDIUM (verified via [Deploying Multiple Apps from Monorepo](https://www.thisdot.co/blog/deploying-multiple-apps-from-a-monorepo-to-github-pages))

## Sources

### GitHub Pages & Monorepo Structure
- [Deploying Multiple Apps From a Monorepo to GitHub Pages](https://www.thisdot.co/blog/deploying-multiple-apps-from-a-monorepo-to-github-pages) - MEDIUM confidence, primary source for multi-app deployment
- [Monorepos: A Comprehensive Guide with Examples](https://medium.com/@julakadaredrishi/monorepos-a-comprehensive-guide-with-examples-63202cfab711) - MEDIUM confidence
- [GitHub Pages for a repo with multiple subfolders](https://github.com/orgs/community/discussions/58276) - MEDIUM confidence
- [Deploying a repository to a subdirectory of GitHub Pages site](https://samhermes.com/posts/deploying-repository-subdirectory-github-pages-site/) - MEDIUM confidence

### Static Site Structure
- [File and Folder Structure for Web Development](https://medium.com/@nmayurashok/file-and-folder-structure-for-web-development-8c5c83810a5) - MEDIUM confidence
- [Static Folder Structure](https://static.devdojo.com/docs/guides/folder-structure/) - MEDIUM confidence

### SwiftUI Architecture
- [Clean Architecture for SwiftUI](https://nalexn.github.io/clean-architecture-swiftui/) - HIGH confidence, authoritative source
- [Stop using MVVM for SwiftUI](https://developer.apple.com/forums/thread/699003) - HIGH confidence, Apple Developer Forums
- [MVVM: An architectural coding pattern to structure SwiftUI Views](https://www.avanderlee.com/swiftui/mvvm-architectural-coding-pattern-to-structure-views/) - MEDIUM confidence
- [SwiftUI Architecture — A Complete Guide to the MV Pattern Approach](https://betterprogramming.pub/swiftui-architecture-a-complete-guide-to-mv-pattern-approach-5f411eaaaf9e) - MEDIUM confidence

### Design Tokens & Dark Theme
- [CSS Custom Properties (Variables): The Complete Guide for 2026](https://devtoolbox.dedyn.io/blog/css-variables-complete-guide) - MEDIUM confidence
- [Dark Mode with Design Tokens in Tailwind CSS](https://www.richinfante.com/2024/10/21/tailwind-dark-mode-design-tokens-themes-css) - MEDIUM confidence
- [The developer's guide to design tokens and CSS variables](https://penpot.app/blog/the-developers-guide-to-design-tokens-and-css-variables/) - MEDIUM confidence
- [Supporting Dark Mode in Your Interface](https://developer.apple.com/documentation/uikit/appearance_customization/supporting_dark_mode_in_your_interface/) - HIGH confidence, Apple official docs
- [Designing Dark Mode Assets for UI Design](https://webpeak.org/blog/designing-dark-mode-assets-for-ui-design/) - MEDIUM confidence

### Vanilla JavaScript Architecture
- [Writing a TodoMVC App with Modern Vanilla JavaScript](https://frontendmasters.com/blog/vanilla-javascript-todomvc/) - MEDIUM confidence
- [Create Powerful Native Mobile Apps with Capacitor & VanillaJS](https://ionic.io/blog/create-powerful-native-mobile-apps-with-capacitor-vanillajs) - MEDIUM confidence

### Portfolio Build Structure
- [How to Build a Portfolio Website with React](https://www.freecodecamp.org/news/build-portfolio-website-react/) - MEDIUM confidence
- [Building a Modern Developer Portfolio: A Technical Deep Dive](https://medium.com/@zulfikarditya/building-a-modern-developer-portfolio-a-technical-deep-dive-a95d068b99fd) - MEDIUM confidence

---
*Architecture research for: Useme Freelancer Portfolio (Multi-Project)*
*Researched: 2026-02-17*
