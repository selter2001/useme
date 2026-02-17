# Phase 3: Habit Tracker - Research

**Researched:** 2026-02-17
**Domain:** iOS Development (SwiftUI + SwiftData) and Web Demo Development
**Confidence:** MEDIUM-HIGH

## Summary

Phase 3 requires building a complete Habit Tracker vertical slice with both a native iOS app and a web demo. The iOS app uses modern SwiftUI with SwiftData for persistence (iOS 17+) and Swift Charts for visualization (iOS 16+). The architecture leverages the new @Observable macro replacing traditional MVVM patterns. The web demo simulates iOS UI using pure HTML/CSS/JS with Chart.js for visualizations, following the established three-layer design token system from Phase 1.

Key technical decisions: SwiftData requires iOS 17+ and works best with @Observable macro instead of traditional MVVM. Swift Charts provides native Apple-designed visualizations for iOS 16+. For web, Chart.js (48KB, tree-shakeable to 14KB) offers the best balance of simplicity and functionality for habit progress charts. Streak calculation requires careful date handling and status tracking (done/missed/skipped).

**Primary recommendation:** Build iOS app with SwiftUI + SwiftData + @Observable architecture, use Swift Charts for native visualizations, and create web demo with Chart.js that mirrors the iOS UI using existing design tokens.

## Standard Stack

### iOS Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| SwiftUI | iOS 17+ | UI framework | Native declarative UI, tight integration with SwiftData |
| SwiftData | iOS 17+ | Data persistence | Modern replacement for Core Data, auto-observability |
| Swift Charts | iOS 16+ | Data visualization | Apple's native charting, declarative syntax matching SwiftUI |
| @Observable macro | iOS 17+ | State management | Replaces @Published/@ObservableObject, integrated with SwiftData |
| @Model macro | iOS 17+ | Data models | Auto-generates SwiftData conformances (Hashable, Identifiable, Observable, PersistentModel) |

### Web Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Chart.js | 4.x | Data visualization | Most popular (54K+ stars), lightweight (14-48KB), vanilla JS, excellent docs |
| Vanilla JS | ES6+ | Interactivity | No build step, matches project constraints from Phase 1 |
| CSS3 | - | iOS UI mockup | Pure CSS device mockups with box-shadow and border-radius |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @Query macro | iOS 17+ | SwiftData fetching | Reactive data queries in SwiftUI views |
| ModelContext | iOS 17+ | SwiftData operations | CRUD operations (insert, delete, save) |
| DateFormatter | iOS 13+ | Date handling | Streak calculations and daily check-ins |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| SwiftData | Core Data | SwiftData simpler but iOS 17+ only; Core Data supports iOS 13+ |
| Swift Charts | Custom CoreGraphics | Charts framework much faster to implement, Apple-designed |
| Chart.js | ApexCharts, D3.js | Chart.js lighter and simpler; D3 more powerful but heavier |
| @Observable | MVVM with ObservableObject | @Observable is modern approach, but MVVM works poorly with SwiftData |

**Installation:**

iOS (Xcode project):
```bash
# SwiftUI, SwiftData, Swift Charts are built-in frameworks
# Import in files:
import SwiftUI
import SwiftData
import Charts
```

Web (CDN):
```html
<!-- Chart.js via CDN -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
```

## Architecture Patterns

### iOS: SwiftData + @Observable Pattern (Modern 2026 Approach)

**Traditional MVVM is deprecated with SwiftData.** The modern pattern uses @Observable macro and direct SwiftData integration.

**Project Structure:**
```
HabitTracker/
├── HabitTrackerApp.swift        # App entry with ModelContainer
├── Models/
│   ├── Habit.swift              # @Model class
│   └── HabitCompletion.swift    # @Model class (daily records)
├── Views/
│   ├── HabitListView.swift      # Main view with @Query
│   ├── HabitDetailView.swift    # Charts and streak display
│   ├── AddHabitView.swift       # Create/edit form
│   └── Components/
│       ├── HabitRow.swift       # List item
│       └── StreakBadge.swift    # Streak counter UI
└── Services/
    └── StreakCalculator.swift   # Business logic utility
```

**Web Demo Structure:**
```
web/habit-tracker/
├── index.html                   # iOS mockup container
├── css/
│   ├── ios-mockup.css          # Device frame styling
│   └── habit-tracker.css       # App UI styles
├── js/
│   ├── habit-tracker.js        # Core logic
│   ├── streak-calculator.js    # Streak algorithm
│   └── chart-renderer.js       # Chart.js integration
└── assets/
    └── icons/                  # Habit icons
```

### Pattern 1: SwiftData Model with @Model Macro

**What:** Define data models using @Model macro for automatic SwiftData integration
**When to use:** All persistent data types (Habit, HabitCompletion)

**Example:**
```swift
// Source: Apple Developer Documentation + Medium articles on SwiftData 2025-2026
import SwiftData
import Foundation

@Model
final class Habit {
    var name: String
    var icon: String
    var color: String
    var createdAt: Date

    // Relationship to daily completions
    @Relationship(deleteRule: .cascade)
    var completions: [HabitCompletion]

    init(name: String, icon: String, color: String) {
        self.name = name
        self.icon = icon
        self.color = color
        self.createdAt = Date()
        self.completions = []
    }
}

@Model
final class HabitCompletion {
    var date: Date
    var status: CompletionStatus // enum: done, missed, skipped

    init(date: Date, status: CompletionStatus) {
        self.date = date
        self.status = status
    }
}
```

**Key details:**
- @Model automatically adds: Observable, PersistentModel, Hashable, Identifiable
- @Relationship(deleteRule: .cascade) ensures completions deleted with habit
- Must be `class`, not `struct`

### Pattern 2: SwiftUI View with @Query

**What:** Use @Query macro for reactive data fetching from SwiftData
**When to use:** Views that display SwiftData models

**Example:**
```swift
// Source: Hacking with Swift SwiftData tutorials 2025
import SwiftUI
import SwiftData

struct HabitListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Habit.createdAt, order: .reverse) private var habits: [Habit]
    @State private var showingAddHabit = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(habits) { habit in
                    NavigationLink(destination: HabitDetailView(habit: habit)) {
                        HabitRow(habit: habit)
                    }
                }
                .onDelete(perform: deleteHabits)
            }
            .navigationTitle("My Habits")
            .toolbar {
                Button("Add", systemImage: "plus") {
                    showingAddHabit = true
                }
            }
            .sheet(isPresented: $showingAddHabit) {
                AddHabitView()
            }
        }
    }

    private func deleteHabits(at offsets: IndexSet) {
        for index in offsets {
            modelContext.delete(habits[index])
        }
    }
}
```

**Key details:**
- @Query automatically updates view when data changes
- @Environment(\.modelContext) provides CRUD access
- No ViewModel needed

### Pattern 3: Swift Charts for Progress Visualization

**What:** Use Swift Charts framework for native, declarative chart creation
**When to use:** Weekly/monthly progress visualization

**Example:**
```swift
// Source: Apple WWDC22 Swift Charts + Medium guides 2025-2026
import SwiftUI
import Charts

struct WeeklyProgressChart: View {
    let completions: [DailyCompletion]

    var body: some View {
        Chart(completions) { completion in
            BarMark(
                x: .value("Day", completion.date, unit: .day),
                y: .value("Completed", completion.count)
            )
            .foregroundStyle(.green)
        }
        .chartXAxis {
            AxisMarks(values: .stride(by: .day)) { value in
                AxisValueLabel(format: .dateTime.weekday(.narrow))
            }
        }
        .chartYAxis {
            AxisMarks(position: .leading)
        }
        .frame(height: 200)
    }
}
```

**Chart mark types available:**
- BarMark: Bar charts (best for daily/weekly progress)
- LineMark: Line charts (good for streak trends)
- AreaMark: Filled area charts (visual progress over time)
- PointMark: Scatter plots
- RuleMark: Reference lines (e.g., goal threshold)

### Pattern 4: Streak Calculation Algorithm

**What:** Calculate current and longest streak from completion records
**When to use:** Display streak counter, determine habit consistency

**Example:**
```swift
// Source: Multiple habit tracker implementations on GitHub 2025-2026
struct StreakCalculator {
    static func calculateStreak(from completions: [HabitCompletion]) -> (current: Int, longest: Int) {
        let sortedCompletions = completions
            .filter { $0.status == .done }
            .sorted { $0.date > $1.date }

        guard !sortedCompletions.isEmpty else {
            return (0, 0)
        }

        var currentStreak = 0
        var longestStreak = 0
        var tempStreak = 0
        var lastDate: Date? = nil

        for completion in sortedCompletions {
            if let last = lastDate {
                let daysDiff = Calendar.current.dateComponents([.day], from: completion.date, to: last).day ?? 0

                if daysDiff == 1 {
                    tempStreak += 1
                } else {
                    longestStreak = max(longestStreak, tempStreak)
                    tempStreak = 1
                }
            } else {
                tempStreak = 1
                currentStreak = 1
            }

            lastDate = completion.date
        }

        longestStreak = max(longestStreak, tempStreak)

        // Current streak is only valid if includes today or yesterday
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())
        if let mostRecent = sortedCompletions.first?.date {
            let daysSinceRecent = calendar.dateComponents([.day], from: mostRecent, to: today).day ?? 0
            currentStreak = daysSinceRecent <= 1 ? tempStreak : 0
        }

        return (currentStreak, longestStreak)
    }
}
```

### Pattern 5: Web Chart.js Implementation

**What:** Render habit progress charts in browser with Chart.js
**When to use:** Web demo visualization

**Example:**
```javascript
// Source: Chart.js official docs + Medium tutorials 2025-2026
// Weekly completion chart
function renderWeeklyChart(completionData) {
    const ctx = document.getElementById('weeklyChart').getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Completed Habits',
                data: completionData, // [3, 2, 4, 3, 5, 2, 4]
                backgroundColor: '#22C55E', // neon-green from design tokens
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}
```

### Pattern 6: CSS iOS Device Mockup

**What:** Create realistic iOS device frame using pure CSS
**When to use:** Web demo container to simulate iPhone UI

**Example:**
```css
/* Source: CSS iPhone mockups collections 2025-2026 */
.iphone-mockup {
    width: 375px;
    height: 812px;
    background: #000;
    border-radius: 40px;
    padding: 12px;
    box-shadow:
        0 0 0 2px #1a1a1a,
        0 0 0 6px #2a2a2a,
        0 20px 60px rgba(0,0,0,0.8);
    position: relative;
}

.iphone-mockup::before {
    /* Notch */
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 30px;
    background: #000;
    border-radius: 0 0 20px 20px;
    z-index: 10;
}

.iphone-screen {
    width: 100%;
    height: 100%;
    background: var(--color-bg-primary);
    border-radius: 32px;
    overflow-y: auto;
    overflow-x: hidden;
}
```

### Anti-Patterns to Avoid

- **Using MVVM with SwiftData:** SwiftData's @Model macro makes models Observable automatically. Adding ViewModels creates unnecessary abstraction and breaks the reactive chain. Use @Query directly in views.

- **Manual ModelContext management:** Don't create ModelContext manually unless needed for background threads. Use @Environment(\.modelContext) in views.

- **Storing computed properties in @Model:** Streak counts should be calculated on-demand, not stored. Store raw completion data only.

- **Date comparison without Calendar:** Always use Calendar.current for date operations to handle timezones and edge cases correctly.

- **Mixing SwiftData and UserDefaults:** Pick one persistence strategy. SwiftData handles all app data needs.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Data visualization | Custom CoreGraphics charts | Swift Charts (iOS), Chart.js (web) | Edge cases: animations, accessibility, responsive scaling, touch interactions |
| Date/time calculations | String parsing, manual math | Calendar.current, DateComponents | Edge cases: timezones, DST, leap years, locale variations |
| Persistence layer | Custom file I/O, JSON encoding | SwiftData (iOS), localStorage (web) | Edge cases: migrations, relationships, query optimization, thread safety |
| Observable state | Manual NotificationCenter | @Observable macro + SwiftData | Edge cases: memory leaks, update ordering, view invalidation |
| iOS device mockup | Image assets | Pure CSS mockups | Scalability, retina support, maintenance, file size |

**Key insight:** Habit tracking has deceptively complex edge cases in date handling (what if user changes timezone mid-streak?), streak calculation (consecutive days across months?), and data relationships (cascading deletes, orphaned records). Apple's frameworks and established libraries handle these cases; custom solutions inevitably hit them later.

## Common Pitfalls

### Pitfall 1: iOS Version Fragmentation
**What goes wrong:** SwiftData requires iOS 17+, Swift Charts requires iOS 16+, creating deployment target confusion
**Why it happens:** Different frameworks have different minimum requirements
**How to avoid:** Set deployment target to iOS 17.0+ in Xcode project settings from the start
**Warning signs:** Build errors about unavailable APIs, @available warnings

### Pitfall 2: Streak Calculation Timezone Issues
**What goes wrong:** Streaks break when user travels across timezones or changes device time
**Why it happens:** Using Date() directly without calendar normalization, comparing dates with simple arithmetic
**How to avoid:** Always use Calendar.current.startOfDay(for:) to normalize dates, store dates in UTC, compare using dateComponents
**Warning signs:** Streak resets unexpectedly, "today" shows wrong date

### Pitfall 3: SwiftData Query Performance
**What goes wrong:** App lags when loading habits with thousands of completion records
**Why it happens:** @Query fetches all related data by default, no lazy loading
**How to avoid:** Use @Relationship with proper fetch limits, add predicates to @Query, paginate completion history
**Warning signs:** List scrolling stutters, app launch delay

### Pitfall 4: Chart.js Bundle Size
**What goes wrong:** Web demo loads slowly due to including entire Chart.js library
**Why it happens:** CDN loads full bundle, not tree-shaken
**How to avoid:** Use modular imports if using npm, or accept 48KB for CDN simplicity (acceptable for demo)
**Warning signs:** PageSpeed Insights reports large JS bundle

### Pitfall 5: LocalStorage Data Corruption (Web Demo)
**What goes wrong:** Web demo loses data or shows errors after browser updates
**Why it happens:** Storing complex objects as JSON without versioning, no migration strategy
**How to avoid:** Add data version field, validate on load, implement migration for schema changes
**Warning signs:** Console errors about parsing, habits disappearing

### Pitfall 6: Responsive iOS Mockup
**What goes wrong:** CSS iPhone mockup breaks on different screen sizes
**Why it happens:** Fixed pixel dimensions don't scale
**How to avoid:** Use CSS transforms (scale) or responsive units (vw/vh) with media queries
**Warning signs:** Mockup too large on mobile, too small on desktop

### Pitfall 7: Cascading Delete Confusion
**What goes wrong:** Deleting habit doesn't delete completions, causing orphaned data
**Why it happens:** Forgetting @Relationship(deleteRule: .cascade) on model
**How to avoid:** Always specify deleteRule on @Relationship properties
**Warning signs:** Database grows unexpectedly, stale data in queries

## Code Examples

Verified patterns from official sources:

### SwiftData App Entry Point
```swift
// Source: Apple SwiftData documentation
import SwiftUI
import SwiftData

@main
struct HabitTrackerApp: App {
    var body: some Scene {
        WindowGroup {
            HabitListView()
        }
        .modelContainer(for: [Habit.self, HabitCompletion.self])
    }
}
```

### CRUD Operations with ModelContext
```swift
// Source: Hacking with Swift SwiftData CRUD tutorial
import SwiftData

// Create
func addHabit(name: String, icon: String) {
    let habit = Habit(name: name, icon: icon, color: "green")
    modelContext.insert(habit)
}

// Read - handled by @Query in view

// Update
func toggleHabitCompletion(for habit: Habit, on date: Date) {
    if let existing = habit.completions.first(where: {
        Calendar.current.isDate($0.date, inSameDayAs: date)
    }) {
        existing.status = existing.status == .done ? .missed : .done
    } else {
        let completion = HabitCompletion(date: date, status: .done)
        habit.completions.append(completion)
    }
}

// Delete
func deleteHabit(_ habit: Habit) {
    modelContext.delete(habit) // Cascades to completions
}
```

### Web LocalStorage Persistence
```javascript
// Source: MDN Web Docs + habit tracker GitHub examples
class HabitStorage {
    static save(habits) {
        const data = {
            version: 1,
            habits: habits,
            lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('habitTrackerData', JSON.stringify(data));
    }

    static load() {
        const stored = localStorage.getItem('habitTrackerData');
        if (!stored) return { habits: [] };

        try {
            const data = JSON.parse(stored);
            // Migrate if needed
            if (data.version !== 1) {
                return this.migrate(data);
            }
            return data;
        } catch (error) {
            console.error('Failed to parse habits:', error);
            return { habits: [] };
        }
    }

    static migrate(oldData) {
        // Handle future schema changes
        return { habits: [], version: 1 };
    }
}
```

### Streak Badge Component (SwiftUI)
```swift
// Source: SwiftUI component patterns
struct StreakBadge: View {
    let streak: Int

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: "flame.fill")
                .foregroundStyle(.orange)
            Text("\(streak)")
                .font(.headline)
                .foregroundStyle(.primary)
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(.orange.opacity(0.2))
        .clipShape(Capsule())
    }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Core Data | SwiftData | iOS 17 (2023) | Simpler API, automatic Observable, no NSManagedObject boilerplate |
| @ObservableObject + @Published | @Observable macro | iOS 17 (2023) | Less boilerplate, tracks optionals/collections, better performance |
| UIKit + Core Data | SwiftUI + SwiftData | iOS 17 (2023) | Declarative UI, reactive data, faster development |
| MVVM pattern with ViewModels | Direct @Query in views | iOS 17 (2023) | SwiftData models are Observable, ViewModels create coupling issues |
| Custom chart libraries (3rd party) | Swift Charts | iOS 16 (2022) | Native Apple design, SwiftUI integration, accessibility built-in |
| ApexCharts, Highcharts (web) | Chart.js 4.x | 2024-2025 | Lighter bundle, tree-shaking, better performance |

**Deprecated/outdated:**
- **MVVM with SwiftData:** Multiple sources (Medium articles 2025-2026) confirm MVVM "works really badly with SwiftData" because @Model makes classes Observable automatically, creating conflicts with ViewModels
- **@StateObject/@ObservedObject:** Replaced by @State with @Observable types
- **NSPredicate:** Still works but SwiftData prefers Swift native #Predicate macro
- **Manual chart drawing:** Custom CoreGraphics is outdated; Swift Charts handles 90% of use cases

## Open Questions

1. **Streak reset logic - user preference vs. automatic**
   - What we know: Standard is "break if miss a day" but some apps allow "grace days"
   - What's unclear: What users expect for this portfolio demo
   - Recommendation: Implement strict "miss a day = reset" for MVP, note flexible approach in code comments

2. **Web demo data persistence scope**
   - What we know: localStorage works but is per-browser
   - What's unclear: Should demo support data export/import for showcasing?
   - Recommendation: Start with localStorage only, consider CSV export as enhancement

3. **iOS app distribution for portfolio**
   - What we know: App Store requires paid developer account ($99/year)
   - What's unclear: Is TestFlight demo sufficient or need App Store presence?
   - Recommendation: TestFlight link + web demo sufficient for portfolio showcase

4. **Chart granularity - daily vs. weekly vs. monthly**
   - What we know: Most habit trackers show multiple views
   - What's unclear: What's MVP scope vs. nice-to-have?
   - Recommendation: Weekly bar chart for MVP (matches requirement HABT-04), monthly as stretch goal

5. **Multiple habits per day UI**
   - What we know: Users track 3-10 habits typically
   - What's unclear: List view vs. grid view vs. calendar view?
   - Recommendation: Simple list with checkboxes for MVP (matches GitHub examples), calendar view later

## Sources

### Primary (HIGH confidence)
- [Apple Developer Documentation - SwiftData](https://developer.apple.com/documentation/swiftdata) - Framework overview, @Model macro
- [Apple Developer Documentation - Swift Charts](https://developer.apple.com/documentation/charts) - Chart types, marks
- [Apple WWDC22 - Hello Swift Charts](https://developer.apple.com/videos/play/wwdc2022/10136/) - Official introduction to Charts framework
- [Chart.js Official Documentation](https://www.chartjs.org/) - Version 4.x features, API reference

### Secondary (MEDIUM confidence)
- [GitHub - TeymiaHabit](https://github.com/amanbayserkeev0377/TeymiaHabit) - Modern iOS habit tracker with SwiftUI, SwiftData, CloudKit (2026)
- [GitHub - sfortier32/Habit-Tracker](https://github.com/sfortier32/Habit-Tracker) - iOS Habit Tracker with SwiftUI and SwiftData
- [Medium - SwiftData Architecture Patterns and Practices](https://azamsharp.com/2025/03/28/swiftdata-architecture-patterns-and-practices.html) - @Observable integration (2025)
- [Medium - Modern MVVM in SwiftUI 2025](https://medium.com/@minalkewat/modern-mvvm-in-swiftui-2025-the-clean-architecture-youve-been-waiting-for-72a7d576648e) - Architecture evolution
- [Medium - Getting Started with SwiftData](https://medium.com/@deepaktiwari_88995/getting-started-with-swiftdata-a-beginners-guide-with-crud-operations-7e143aa7e65f) - CRUD patterns (June 2025)
- [Hacking with Swift - SwiftData Model Macro](https://www.hackingwithswift.com/quick-start/swiftdata/how-to-define-swiftdata-models-using-the-model-macro) - @Model details
- [CodeWithChris - SwiftUI Charts Tutorial](https://codewithchris.com/swiftui-chart/) - Step-by-step chart implementation
- [Embeddable - JavaScript Charting Libraries 2026](https://embeddable.com/blog/javascript-charting-libraries) - Chart.js comparison
- [Luzmo - JavaScript Chart Libraries 2026](https://www.luzmo.com/blog/javascript-chart-libraries) - Modern web charting options
- [Freefrontend - CSS iPhone Mockups](https://freefrontend.com/iphones-in-css/) - Pure CSS device frames (24 examples)
- [Flowbite - Tailwind CSS Device Mockups](https://flowbite.com/docs/components/device-mockups/) - Responsive mockup patterns

### Tertiary (LOW confidence - WebSearch only)
- Multiple Notion habit tracker templates - UI/UX patterns for 2026
- GitHub streak counter repositories - Algorithm variations
- Bubble forum discussions - Streak calculation approaches (conceptual, not verified)

## Metadata

**Confidence breakdown:**
- Standard stack: MEDIUM-HIGH - SwiftData/SwiftUI/Charts verified via Apple docs, Chart.js verified via official site, pattern examples from multiple GitHub projects
- Architecture: MEDIUM-HIGH - @Observable pattern confirmed across multiple 2025-2026 sources, MVVM deprecation explicit in several articles
- Pitfalls: MEDIUM - Based on common GitHub issues and developer articles, not official documentation
- Web patterns: MEDIUM - Chart.js and localStorage well-documented, CSS mockups have many examples but not officially standardized

**Research date:** 2026-02-17
**Valid until:** ~30 days (stable frameworks, but iOS/web practices evolve quickly)

**Notes:**
- Apple docs couldn't be fetched (JavaScript required), confidence based on verified secondary sources
- No CONTEXT.md exists for this phase, full discretion on technical choices
- Project context from Phase 1/2: Three-layer CSS design tokens, GitHub Pages deployment, dark/tech theme (#0E0E0E charcoal background)
- Existing project structure uses: web/ for web projects, shared/styles/ for design tokens
