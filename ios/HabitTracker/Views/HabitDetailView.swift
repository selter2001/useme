import SwiftUI
import SwiftData
import Charts

enum ChartPeriod: String, CaseIterable {
    case week = "Week"
    case month = "Month"
}

struct HabitDetailView: View {
    let habit: Habit

    @Environment(\.modelContext)
    private var modelContext

    @State private var selectedChartPeriod: ChartPeriod = .week
    @State private var showingEditSheet = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Header section
                headerSection

                // Streak section
                streakSection

                // Today's status
                todayStatusSection

                // Chart section
                chartSection

                // Stats section
                statsSection
            }
            .padding()
        }
        .navigationTitle(habit.name)
        .navigationBarTitleDisplayMode(.large)
        .sheet(isPresented: $showingEditSheet) {
            AddHabitView(habitToEdit: habit)
        }
    }

    // MARK: - Header Section
    private var headerSection: some View {
        HStack {
            // Large icon
            Image(systemName: habit.icon)
                .font(.system(size: 48))
                .foregroundStyle(colorFromString(habit.color))
                .frame(width: 60, height: 60)

            Spacer()

            // Edit button
            Button {
                showingEditSheet = true
            } label: {
                Label("Edit", systemImage: "pencil.circle.fill")
                    .font(.headline)
            }
        }
    }

    // MARK: - Streak Section
    private var streakSection: some View {
        let streaks = StreakCalculator.calculateStreak(from: habit.completions)

        return VStack(alignment: .leading, spacing: 12) {
            Text("Streaks")
                .font(.headline)
                .foregroundStyle(.secondary)

            HStack(spacing: 16) {
                StreakBadge(streak: streaks.current, label: "Current")
                StreakBadge(streak: streaks.longest, label: "Best")
            }
        }
    }

    // MARK: - Today's Status Section
    private var todayStatusSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Today")
                .font(.headline)
                .foregroundStyle(.secondary)

            Button {
                toggleToday()
            } label: {
                HStack {
                    Image(systemName: habit.isCompletedToday ? "checkmark.circle.fill" : "circle")
                        .font(.title2)

                    Text(habit.isCompletedToday ? "Completed" : "Mark as Done")
                        .font(.headline)

                    Spacer()
                }
                .padding()
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(habit.isCompletedToday ? colorFromString(habit.color).opacity(0.2) : Color.gray.opacity(0.1))
                )
                .foregroundStyle(habit.isCompletedToday ? colorFromString(habit.color) : .secondary)
            }
            .sensoryFeedback(.impact, trigger: habit.isCompletedToday)
        }
    }

    // MARK: - Chart Section
    private var chartSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Progress")
                .font(.headline)
                .foregroundStyle(.secondary)

            Picker("Period", selection: $selectedChartPeriod) {
                ForEach(ChartPeriod.allCases, id: \.self) { period in
                    Text(period.rawValue).tag(period)
                }
            }
            .pickerStyle(.segmented)

            if selectedChartPeriod == .week {
                weeklyChart
            } else {
                monthlyChart
            }
        }
    }

    private var weeklyChart: some View {
        let data = StreakCalculator.weeklyCompletions(from: habit.completions, weeksBack: 1)

        return Chart(data, id: \.date) { item in
            BarMark(
                x: .value("Day", item.date, unit: .day),
                y: .value("Completions", item.count)
            )
            .foregroundStyle(colorFromString(habit.color))
            .cornerRadius(4)
        }
        .chartXAxis {
            AxisMarks(values: .stride(by: .day)) { value in
                AxisValueLabel(format: .dateTime.weekday(.abbreviated))
            }
        }
        .chartYAxis {
            AxisMarks { value in
                AxisValueLabel()
            }
        }
        .chartPlotStyle { plotArea in
            plotArea.frame(height: 200)
        }
        .padding(.vertical, 8)
    }

    private var monthlyChart: some View {
        let data = StreakCalculator.monthlyCompletionRate(from: habit.completions, monthsBack: 1)
            .map { DailyCompletion(date: $0.date, completed: $0.completed) }

        return Chart(data) { item in
            BarMark(
                x: .value("Date", item.date, unit: .day),
                y: .value("Completed", item.completed ? 1 : 0)
            )
            .foregroundStyle(item.completed ? colorFromString(habit.color) : Color.gray.opacity(0.2))
            .cornerRadius(4)
        }
        .chartXAxis {
            AxisMarks(values: .stride(by: .day, count: 5)) { value in
                AxisValueLabel(format: .dateTime.day())
            }
        }
        .chartYAxis {
            AxisMarks(values: [0, 1]) { value in
                AxisValueLabel()
            }
        }
        .chartPlotStyle { plotArea in
            plotArea.frame(height: 200)
        }
        .padding(.vertical, 8)
    }

    // MARK: - Stats Section
    private var statsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Statistics")
                .font(.headline)
                .foregroundStyle(.secondary)

            VStack(spacing: 16) {
                StatRow(
                    label: "Total Completions",
                    value: "\(totalCompletions)"
                )

                StatRow(
                    label: "Completion Rate",
                    value: completionRateText
                )

                StatRow(
                    label: "Date Created",
                    value: formattedCreatedDate
                )
            }
        }
    }

    // MARK: - Helper Views
    private struct StatRow: View {
        let label: String
        let value: String

        var body: some View {
            HStack {
                Text(label)
                    .foregroundStyle(.secondary)
                Spacer()
                Text(value)
                    .font(.headline)
            }
            .padding(.vertical, 8)
        }
    }

    // MARK: - Computed Properties
    private var totalCompletions: Int {
        habit.completions.filter { $0.status == .done }.count
    }

    private var completionRateText: String {
        let calendar = Calendar.current
        let daysSinceCreation = calendar.dateComponents([.day], from: habit.createdAt, to: Date()).day ?? 1
        let days = max(daysSinceCreation, 1)
        let rate = (Double(totalCompletions) / Double(days)) * 100.0
        return String(format: "%.0f%%", rate)
    }

    private var formattedCreatedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        return formatter.string(from: habit.createdAt)
    }

    // MARK: - Actions
    private func toggleToday() {
        habit.toggleToday(context: modelContext)
    }

    private func colorFromString(_ colorString: String) -> Color {
        switch colorString {
        case "green": return .green
        case "blue": return .blue
        case "orange": return .orange
        case "purple": return .purple
        case "red": return .red
        case "yellow": return .yellow
        default: return .green
        }
    }
}

// MARK: - Supporting Types
private struct DailyCompletion: Identifiable {
    let id = UUID()
    let date: Date
    let completed: Bool
}

#Preview {
    let config = ModelConfiguration(isStoredInMemoryOnly: true)
    let container = try! ModelContainer(for: Habit.self, HabitCompletion.self, configurations: config)

    let habit = Habit(name: "Morning Run", icon: "figure.run", color: "green")

    // Add some sample completions for preview
    let calendar = Calendar.current
    for i in 0..<15 {
        if let date = calendar.date(byAdding: .day, value: -i, to: Date()) {
            let completion = HabitCompletion(date: date, status: .done)
            habit.completions.append(completion)
            container.mainContext.insert(completion)
        }
    }

    container.mainContext.insert(habit)

    return NavigationStack {
        HabitDetailView(habit: habit)
    }
    .modelContainer(container)
}
