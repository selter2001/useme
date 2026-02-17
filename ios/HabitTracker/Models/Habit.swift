import SwiftData
import Foundation

@Model
final class Habit {
    var name: String
    var icon: String // SF Symbol name (e.g. "figure.run", "book.fill", "drop.fill")
    var color: String // Hex color string for UI accent
    var createdAt: Date

    @Relationship(deleteRule: .cascade)
    var completions: [HabitCompletion]

    init(name: String, icon: String, color: String) {
        self.name = name
        self.icon = icon
        self.color = color
        self.createdAt = Date()
        self.completions = []
    }

    /// Check if habit is completed today
    var isCompletedToday: Bool {
        let calendar = Calendar.current
        let today = Date()

        return completions.contains { completion in
            calendar.isDate(completion.date, inSameDayAs: today) && completion.status == .done
        }
    }

    /// Toggle today's completion status
    func toggleToday(context: ModelContext) {
        let calendar = Calendar.current
        let today = Date()

        // Find existing today's completion
        if let existingCompletion = completions.first(where: { completion in
            calendar.isDate(completion.date, inSameDayAs: today)
        }) {
            // Remove it
            context.delete(existingCompletion)
        } else {
            // Add new completion
            let newCompletion = HabitCompletion(date: today, status: .done)
            completions.append(newCompletion)
            context.insert(newCompletion)
        }

        try? context.save()
    }
}
