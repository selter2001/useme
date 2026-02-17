import Foundation

struct ExpenseSummaryCalculator {

    /// Calculate total expenses for a given month
    static func monthlyTotal(from expenses: [Expense], month: Date = Date()) -> Double {
        let filtered = expensesForMonth(from: expenses, month: month)
        return filtered.reduce(0) { $0 + $1.amount }
    }

    /// Calculate totals by category for a given month
    static func categoryBreakdown(from expenses: [Expense], month: Date = Date()) -> [(category: ExpenseCategory, total: Double)] {
        let filtered = expensesForMonth(from: expenses, month: month)

        var totals: [ExpenseCategory: Double] = [:]
        for expense in filtered {
            totals[expense.category, default: 0] += expense.amount
        }

        return ExpenseCategory.allCases
            .filter { totals[$0] != nil }
            .map { (category: $0, total: totals[$0]!) }
            .sorted { $0.total > $1.total }
    }

    /// Calculate daily average for current month
    static func dailyAverage(from expenses: [Expense], month: Date = Date()) -> Double {
        let calendar = Calendar.current
        let filtered = expensesForMonth(from: expenses, month: month)
        let total = filtered.reduce(0) { $0 + $1.amount }

        let today = Date()
        let startOfMonth = calendar.date(from: calendar.dateComponents([.year, .month], from: month))!
        let dayOfMonth = calendar.dateComponents([.day], from: startOfMonth, to: min(today, calendar.date(byAdding: DateComponents(month: 1, day: -1), to: startOfMonth)!)).day ?? 1

        return total / Double(max(dayOfMonth, 1))
    }

    /// Get expenses filtered by month
    static func expensesForMonth(from expenses: [Expense], month: Date = Date()) -> [Expense] {
        let calendar = Calendar.current
        let components = calendar.dateComponents([.year, .month], from: month)

        return expenses.filter { expense in
            let expenseComponents = calendar.dateComponents([.year, .month], from: expense.date)
            return expenseComponents.year == components.year && expenseComponents.month == components.month
        }
    }

    /// Get daily spending data for charting
    static func dailySpending(from expenses: [Expense], daysBack: Int = 30) -> [(date: Date, total: Double)] {
        let calendar = Calendar.current
        let today = calendar.startOfDay(for: Date())

        guard let startDate = calendar.date(byAdding: .day, value: -daysBack, to: today) else {
            return []
        }

        var dailyTotals: [Date: Double] = [:]
        for expense in expenses {
            let day = calendar.startOfDay(for: expense.date)
            if day >= startDate && day <= today {
                dailyTotals[day, default: 0] += expense.amount
            }
        }

        var result: [(date: Date, total: Double)] = []
        var currentDate = startDate

        while currentDate <= today {
            let total = dailyTotals[currentDate] ?? 0
            result.append((date: currentDate, total: total))
            currentDate = calendar.date(byAdding: .day, value: 1, to: currentDate)!
        }

        return result
    }
}
