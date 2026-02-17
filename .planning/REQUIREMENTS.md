# Requirements: UsemePortfolio

**Defined:** 2026-02-17
**Core Value:** Wiarygodne, profesjonalne portfolio z działającym kodem, które przekona klientów Useme do zlecenia pierwszego projektu.

## v1 Requirements

### Useme Profile

- [ ] **PROF-01**: Zoptymalizowany opis profilu Useme (polski, max 300 słów, podkreśla AI + szybkość)
- [ ] **PROF-02**: Lista 10-15 słów kluczowych/tagów dla widoczności na Useme
- [ ] **PROF-03**: Porady prezentacji projektów na platformie (screeny, linki, opisy)

### Portfolio Website

- [ ] **PORT-01**: Hero section z opisem "About Me" i avatarem
- [ ] **PORT-02**: Galeria projektów — karty z miniaturkami, linkami do demo i GitHub
- [ ] **PORT-03**: Sekcja kontakt z linkiem do profilu Useme
- [ ] **PORT-04**: Dark/tech theme — responsywny, mobile-first
- [ ] **PORT-05**: Deploy na GitHub Pages

### Landing Page

- [ ] **LAND-01**: Hero section z przyciskiem CTA
- [ ] **LAND-02**: Dynamiczny formularz kontaktowy z walidacją i EmailJS
- [ ] **LAND-03**: Sekcja usług z ikonkami
- [ ] **LAND-04**: Sekcja testimonials/social proof (mock)
- [ ] **LAND-05**: Dark/tech theme spójny z portfolio

### Habit Tracker (iOS)

- [ ] **HABT-01**: Lista nawyków — dodawanie, edycja, usuwanie
- [ ] **HABT-02**: Dzienne checkowanie nawyków jako wykonane
- [ ] **HABT-03**: Streak counter — licznik serii dni
- [ ] **HABT-04**: Wykres postępów (tygodniowy/miesięczny)
- [ ] **HABT-05**: Persystencja danych (SwiftData)

### Habit Tracker (Web-Demo)

- [ ] **HABW-01**: Web-demo symulujący wygląd iOS apki w przeglądarce
- [ ] **HABW-02**: Funkcjonalna lista nawyków z checkboxami i streak counter
- [ ] **HABW-03**: Dark/tech theme spójny z portfolio

### Expenses Calculator (iOS)

- [ ] **EXPN-01**: Lista wydatków — dodawanie z kwotą i opisem
- [ ] **EXPN-02**: Kategorie wydatków (jedzenie, transport, rozrywka, rachunki, inne)
- [ ] **EXPN-03**: Podsumowanie miesięczne — suma wydatków
- [ ] **EXPN-04**: Wykres kategorii (pie/bar chart)
- [ ] **EXPN-05**: Persystencja danych (SwiftData)

### Expenses Calculator (Web-Demo)

- [ ] **EXPW-01**: Web-demo symulujący wygląd iOS apki w przeglądarce
- [ ] **EXPW-02**: Funkcjonalna lista wydatków z kategoriami i wykresem
- [ ] **EXPW-03**: Dark/tech theme spójny z portfolio

### Design System

- [ ] **DSGN-01**: Shared CSS design tokens (kolory, typography, spacing) — dark/tech theme
- [ ] **DSGN-02**: Responsywność we wszystkich projektach webowych

## v2 Requirements

### AI Showcase

- **AISH-01**: AI Speed Showcase — metryki szybkości budowania z Claude Code
- **AISH-02**: Commit history visualization — timeline postępów projektu

### Infrastructure

- **INFR-01**: Custom domain zamiast username.github.io
- **INFR-02**: Analytics (Plausible lub Google Analytics)

### iOS Enhancements

- **IOSN-01**: iOS widgets (WidgetKit) dla Habit Tracker
- **IOSN-02**: CSV/PDF export wydatków w Expenses Calculator
- **IOSN-03**: App Store deployment

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend/bazy danych serwerowe | Projekty działają lokalnie — statyczne strony + SwiftData |
| React/Vue/Next.js | Czysty HTML/CSS/JS wystarcza, prostszy deploy na GitHub Pages |
| Pełna integracja chatbota AI | Zbyt złożone dla portfolio, nie dodaje wartości |
| Automatyczne testy | Projekty demonstracyjne — testy to overkill |
| OAuth/logowanie użytkowników | Apki działają offline, nie wymagają kont |
| Real-time features | WebSockets/SSE niepotrzebne w statycznym portfolio |
| Video nagrania demo | Zbyt czasochłonne, live demo wystarczy |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| PROF-01 | — | Pending |
| PROF-02 | — | Pending |
| PROF-03 | — | Pending |
| PORT-01 | — | Pending |
| PORT-02 | — | Pending |
| PORT-03 | — | Pending |
| PORT-04 | — | Pending |
| PORT-05 | — | Pending |
| LAND-01 | — | Pending |
| LAND-02 | — | Pending |
| LAND-03 | — | Pending |
| LAND-04 | — | Pending |
| LAND-05 | — | Pending |
| HABT-01 | — | Pending |
| HABT-02 | — | Pending |
| HABT-03 | — | Pending |
| HABT-04 | — | Pending |
| HABT-05 | — | Pending |
| HABW-01 | — | Pending |
| HABW-02 | — | Pending |
| HABW-03 | — | Pending |
| EXPN-01 | — | Pending |
| EXPN-02 | — | Pending |
| EXPN-03 | — | Pending |
| EXPN-04 | — | Pending |
| EXPN-05 | — | Pending |
| EXPW-01 | — | Pending |
| EXPW-02 | — | Pending |
| EXPW-03 | — | Pending |
| DSGN-01 | — | Pending |
| DSGN-02 | — | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 0
- Unmapped: 31 ⚠️

---
*Requirements defined: 2026-02-17*
*Last updated: 2026-02-17 after initial definition*
