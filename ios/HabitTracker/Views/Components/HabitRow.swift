import SwiftUI
import SwiftData

struct HabitRow: View {
    let habit: Habit

    @Environment(\.modelContext)
    private var modelContext

    @State private var isCompleted: Bool = false

    private var currentStreak: Int {
        StreakCalculator.calculateStreak(from: habit.completions).current
    }

    var body: some View {
        HStack(spacing: 16) {
            // Icon
            Image(systemName: habit.icon)
                .font(.title2)
                .foregroundStyle(colorFromString(habit.color))
                .frame(width: 40)

            // Name
            Text(habit.name)
                .font(.body)

            Spacer()

            // Streak badge (only show if streak > 0)
            if currentStreak > 0 {
                StreakBadge(streak: currentStreak, label: "")
            }

            // Checkmark button
            Button {
                toggleCompletion()
            } label: {
                Image(systemName: isCompleted ? "checkmark.circle.fill" : "circle")
                    .font(.title2)
                    .foregroundStyle(isCompleted ? colorFromString(habit.color) : .secondary)
            }
            .buttonStyle(.plain)
            .sensoryFeedback(.impact, trigger: isCompleted)
        }
        .padding(.vertical, 4)
        .onAppear {
            isCompleted = habit.isCompletedToday
        }
        .onChange(of: habit.completions) {
            isCompleted = habit.isCompletedToday
        }
    }

    private func toggleCompletion() {
        habit.toggleToday(context: modelContext)
        isCompleted = habit.isCompletedToday
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

#Preview {
    let config = ModelConfiguration(isStoredInMemoryOnly: true)
    let container = try! ModelContainer(for: Habit.self, HabitCompletion.self, configurations: config)

    let habit = Habit(name: "Morning Run", icon: "figure.run", color: "green")
    container.mainContext.insert(habit)

    return List {
        HabitRow(habit: habit)
    }
    .modelContainer(container)
}
