# Wojciech Olszak — Portfolio

**iOS & Web Developer** | SwiftUI | HTML/CSS/JS | AI-Assisted Development

[![GitHub Pages](https://img.shields.io/badge/Live_Demo-GitHub_Pages-22C55E?style=for-the-badge&logo=github)](https://selter2001.github.io/useme/web/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Swift](https://img.shields.io/badge/Swift-5.9+-F05138?style=for-the-badge&logo=swift&logoColor=white)](https://swift.org)
[![iOS](https://img.shields.io/badge/iOS-17+-000000?style=for-the-badge&logo=apple&logoColor=white)](https://developer.apple.com/ios/)

---

<details open>
<summary><strong>PL — Polski</strong></summary>

## O projekcie

Portfolio freelancera prezentujace 4 kompletne projekty demo — od natywnych aplikacji iOS po responsywne strony internetowe. Kazdy projekt jest dzialajacym produktem z kodem zrodlowym, nie mockupem.

Zbudowane z wykorzystaniem **Claude Code** (AI-assisted development), co pozwolilo na dostarczenie calego portfolio w rekordowym tempie bez kompromisow w jakosci kodu.

## Projekty

### 1. Portfolio Website
> Responsywna strona portfolio z dark/tech theme

- Sticky nawigacja z hamburger menu na mobile
- Sekcje: hero, o mnie, projekty, kontakt
- Pelna responsywnosc, WCAG accessible
- **Stack:** HTML, CSS, JavaScript

### 2. Landing Page
> Strona uslugowa z formularzem kontaktowym

- Sekcje uslug z ikonami
- Formularz kontaktowy z walidacja inline + EmailJS
- Responsywny layout z dark theme
- **Stack:** HTML, CSS, JavaScript, EmailJS

### 3. Habit Tracker
> Aplikacja iOS + web demo do sledzenia nawykow

- Tworzenie, edycja i usuwanie nawykow
- Codzienne odhaczanie z licznikiem streak
- Wykresy postepu (Swift Charts / Chart.js)
- Persistencja danych (SwiftData / localStorage)
- **Stack iOS:** SwiftUI, SwiftData, Swift Charts
- **Stack Web:** HTML, CSS, JavaScript, Chart.js

### 4. Kalkulator Wydatkow
> Aplikacja iOS + web demo do zarzadzania budzetem

- Dodawanie wydatkow z kategoriami
- Podsumowanie miesieczne z wykresami
- Statystyki wydatkow per kategoria
- Persistencja danych (SwiftData / localStorage)
- **Stack iOS:** SwiftUI, SwiftData, Swift Charts
- **Stack Web:** HTML, CSS, JavaScript, Chart.js

## Struktura repozytorium

```
useme/
├── web/                    # Portfolio + web demo aplikacji iOS
│   ├── index.html          # Strona glowna portfolio
│   ├── css/main.css        # Style portfolio
│   ├── habit-tracker/      # Web demo — Habit Tracker
│   └── expense-calculator/ # Web demo — Kalkulator Wydatkow
├── landing/                # Landing page z formularzem kontaktowym
├── ios/                    # Natywne aplikacje iOS
│   ├── HabitTracker/       # Habit Tracker — SwiftUI
│   └── ExpenseCalculator/  # Kalkulator Wydatkow — SwiftUI
└── shared/                 # Wspoldzielony design system
    └── styles/             # CSS tokens, reset, utilities
```

## Uruchomienie lokalne

```bash
# Klonowanie
git clone https://github.com/selter2001/useme.git
cd useme

# Serwer deweloperski
npx http-server . -p 3000

# Portfolio:           http://localhost:3000/web/
# Landing page:        http://localhost:3000/landing/
# Habit Tracker demo:  http://localhost:3000/web/habit-tracker/
# Expense Calculator:  http://localhost:3000/web/expense-calculator/
```

Projekty iOS wymagaja Xcode 15+ i iOS 17+ Simulator:
```bash
cd ios
xcodegen generate
open UsemeApps.xcodeproj
```

</details>

---

<details>
<summary><strong>EN — English</strong></summary>

## About

Freelancer portfolio showcasing 4 complete demo projects — from native iOS apps to responsive websites. Every project is a working product with source code, not a mockup.

Built with **Claude Code** (AI-assisted development), delivering the entire portfolio at record speed without compromising code quality.

## Projects

### 1. Portfolio Website
> Responsive portfolio site with dark/tech theme

- Sticky navigation with hamburger menu on mobile
- Sections: hero, about, projects, contact
- Fully responsive, WCAG accessible
- **Stack:** HTML, CSS, JavaScript

### 2. Landing Page
> Service page with contact form

- Service sections with icons
- Contact form with inline validation + EmailJS integration
- Responsive layout with dark theme
- **Stack:** HTML, CSS, JavaScript, EmailJS

### 3. Habit Tracker
> iOS app + web demo for tracking daily habits

- Create, edit and delete habits
- Daily check-off with streak counter
- Progress charts (Swift Charts / Chart.js)
- Data persistence (SwiftData / localStorage)
- **iOS Stack:** SwiftUI, SwiftData, Swift Charts
- **Web Stack:** HTML, CSS, JavaScript, Chart.js

### 4. Expense Calculator
> iOS app + web demo for budget management

- Add expenses with categories
- Monthly summary with charts
- Per-category expense statistics
- Data persistence (SwiftData / localStorage)
- **iOS Stack:** SwiftUI, SwiftData, Swift Charts
- **Web Stack:** HTML, CSS, JavaScript, Chart.js

## Repository Structure

```
useme/
├── web/                    # Portfolio + iOS app web demos
│   ├── index.html          # Portfolio homepage
│   ├── css/main.css        # Portfolio styles
│   ├── habit-tracker/      # Web demo — Habit Tracker
│   └── expense-calculator/ # Web demo — Expense Calculator
├── landing/                # Landing page with contact form
├── ios/                    # Native iOS apps
│   ├── HabitTracker/       # Habit Tracker — SwiftUI
│   └── ExpenseCalculator/  # Expense Calculator — SwiftUI
└── shared/                 # Shared design system
    └── styles/             # CSS tokens, reset, utilities
```

## Local Development

```bash
# Clone
git clone https://github.com/selter2001/useme.git
cd useme

# Dev server
npx http-server . -p 3000

# Portfolio:           http://localhost:3000/web/
# Landing page:        http://localhost:3000/landing/
# Habit Tracker demo:  http://localhost:3000/web/habit-tracker/
# Expense Calculator:  http://localhost:3000/web/expense-calculator/
```

iOS projects require Xcode 15+ and iOS 17+ Simulator:
```bash
cd ios
xcodegen generate
open UsemeApps.xcodeproj
```

</details>

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **iOS** | Swift 5.9, SwiftUI, SwiftData, Swift Charts, XcodeGen |
| **Web** | HTML5, CSS3 (Custom Properties), Vanilla JavaScript, Chart.js 4 |
| **Design** | Dark theme (#0E0E0E), neon green accent (#22C55E), 3-layer token system |
| **Infrastructure** | GitHub Pages, GitHub Actions CI/CD, npm workspaces |
| **Development** | AI-assisted with Claude Code |

## Design System

All projects share a unified dark/tech design system built on CSS Custom Properties:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0E0E0E` | Page background |
| `--color-interactive-primary` | `#22C55E` | Accent, buttons, links |
| `--color-text-primary` | `#F9FAFB` | Headings, body text |
| `--color-bg-elevated` | `#262626` | Cards, elevated surfaces |

Three-layer architecture: **Primitives** (raw values) → **Semantic** (meaning) → **Component** (usage).

## Live Demo

| Project | Link |
|---------|------|
| Portfolio | [selter2001.github.io/useme/web/](https://selter2001.github.io/useme/web/) |
| Landing Page | [selter2001.github.io/useme/landing/](https://selter2001.github.io/useme/landing/) |
| Habit Tracker | [selter2001.github.io/useme/web/habit-tracker/](https://selter2001.github.io/useme/web/habit-tracker/) |
| Expense Calculator | [selter2001.github.io/useme/web/expense-calculator/](https://selter2001.github.io/useme/web/expense-calculator/) |

## Author

**Wojciech Olszak** — iOS & Web Developer

- [Useme Profile](https://useme.com/pl/roles/contractor/wojciech-olszak,609067/)
- [GitHub](https://github.com/selter2001)
- [Email](mailto:wojtekolszak12@gmail.com)

## License

This project is licensed under the [MIT License](LICENSE).
