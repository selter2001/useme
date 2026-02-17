import Foundation

struct StreakCalculator {

    /// Calculate current and longest streak from habit completions
    /// - Parameter completions: Array of HabitCompletion objects
    /// - Returns: Tuple with (current streak, longest streak)
    static func calculateStreak(from completions: [HabitCompletion]) -> (current: Int, longest: Int) {
        // Filter only completed (.done) items
        let doneCompletions = completions.filter { $0.status == .done }

        // If no completions, return (0, 0)
        guard !doneCompletions.isEmpty else {
            return (0, 0)
        }

        // Normalize dates to start of day to handle timezone issues
        let calendar = Calendar.current
        let normalizedDates = doneCompletions.map { completion in
            calendar.startOfDay(for: completion.date)
        }

        // Remove duplicates (same day multiple completions) and sort descending (most recent first)
        let uniqueDates = Array(Set(normalizedDates)).sorted(by: >)

        // Calculate longest streak and current streak
        var longestStreak = 0
        var currentStreakCount = 0
        var tempStreak = 1

        for i in 0..<uniqueDates.count {
            if i > 0 {
                let dayDifference = calendar.dateComponents([.day], from: uniqueDates[i], to: uniqueDates[i-1]).day ?? 0

                if dayDifference == 1 {
                    // Consecutive day - increment streak
                    tempStreak += 1
                } else {
                    // Streak broken - save longest and reset
                    longestStreak = max(longestStreak, tempStreak)
                    tempStreak = 1
                }
            }
        }

        // Save final streak as potential longest
        longestStreak = max(longestStreak, tempStreak)

        // Calculate current streak - only valid if most recent completion is today or yesterday
        let today = calendar.startOfDay(for: Date())
        let mostRecentDate = uniqueDates.first!
        let daysSinceRecent = calendar.dateComponents([.day], from: mostRecentDate, to: today).day ?? 0

        if daysSinceRecent <= 1 {
            // Current streak is active - count from most recent backwards
            currentStreakCount = 1
            for i in 1..<uniqueDates.count {
                let dayDifference = calendar.dateComponents([.day], from: uniqueDates[i], to: uniqueDates[i-1]).day ?? 0
                if dayDifference == 1 {
                    currentStreakCount += 1
                } else {
                    break
                }
            }
        } else {
            // Streak has expired - reset to 0
            currentStreakCount = 0
        }

        return (currentStreakCount, longestStreak)
    }

    /// Get weekly completion data for charting
    /// - Parameters:
    ///   - completions: Array of HabitCompletion objects
    ///   - weeksBack: Number of weeks to look back (default 1)
    /// - Returns: Array of (date, count) tuples for each day in range
    static func weeklyCompletions(from completions: [HabitCompletion], weeksBack: Int = 1) -> [(date: Date, count: Int)] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())

        // Calculate start date (weeksBack * 7 days ago)
        guard let startDate = calendar.date(byAdding: .day, value: -(weeksBack * 7), to: today) else {
            return []
        }

        // Filter completions to .done status within date range
        let doneCompletions = completions.filter { completion in
            let normalizedDate = calendar.startOfDay(for: completion.date)
            return completion.status == .done && normalizedDate >= startDate && normalizedDate <= today
        }

        // Group by day
        var dailyCounts: [Date: Int] = [:]
        for completion in doneCompletions {
            let day = calendar.startOfDay(for: completion.date)
            dailyCounts[day, default: 0] += 1
        }

        // Build array for all days in range (fill 0 for missing days)
        var result: [(date: Date, count: Int)] = []
        var currentDate = startDate

        while currentDate <= today {
            let count = dailyCounts[currentDate] ?? 0
            result.append((date: currentDate, count: count))
            currentDate = calendar.date(byAdding: .day, value: 1, to: currentDate)!
        }

        return result
    }

    /// Get monthly completion rate for grid/chart display
    /// - Parameters:
    ///   - completions: Array of HabitCompletion objects
    ///   - monthsBack: Number of months to look back (default 1)
    /// - Returns: Array of (date, completed) tuples for each day
    static func monthlyCompletionRate(from completions: [HabitCompletion], monthsBack: Int = 1) -> [(date: Date, completed: Bool)] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())

        // Calculate start date (approximately monthsBack * 30 days ago)
        guard let startDate = calendar.date(byAdding: .day, value: -(monthsBack * 30), to: today) else {
            return []
        }

        // Filter completions to .done status within date range
        let doneCompletions = completions.filter { completion in
            let normalizedDate = calendar.startOfDay(for: completion.date)
            return completion.status == .done && normalizedDate >= startDate && normalizedDate <= today
        }

        // Build set of completed dates
        let completedDates = Set(doneCompletions.map { calendar.startOfDay(for: $0.date) })

        // Build array for all days in range
        var result: [(date: Date, completed: Bool)] = []
        var currentDate = startDate

        while currentDate <= today {
            let isCompleted = completedDates.contains(currentDate)
            result.append((date: currentDate, completed: isCompleted))
            currentDate = calendar.date(byAdding: .day, value: 1, to: currentDate)!
        }

        return result
    }
}
