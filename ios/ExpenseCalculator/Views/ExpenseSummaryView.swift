import SwiftUI
import SwiftData
import Charts

struct ExpenseSummaryView: View {
    @Query(sort: \Expense.date, order: .reverse)
    private var allExpenses: [Expense]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 24) {
                // Monthly total
                totalSection

                // Category chart
                categoryChartSection

                // Category breakdown list
                categoryListSection

                // Daily spending chart
                dailyChartSection

                // Stats
                statsSection
            }
            .padding()
        }
        .navigationTitle("Summary")
        .navigationBarTitleDisplayMode(.large)
    }

    // MARK: - Total Section
    private var totalSection: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text("This Month")
                .font(.headline)
                .foregroundStyle(.secondary)

            Text(monthlyTotal, format: .currency(code: "PLN"))
                .font(.system(size: 36, weight: .bold))
                .foregroundStyle(.green)
        }
    }

    // MARK: - Category Chart
    private var categoryChartSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("By Category")
                .font(.headline)
                .foregroundStyle(.secondary)

            if breakdown.isEmpty {
                Text("No expenses this month")
                    .foregroundStyle(.secondary)
                    .padding(.vertical, 20)
            } else {
                Chart(breakdown, id: \.category) { item in
                    SectorMark(
                        angle: .value("Amount", item.total),
                        innerRadius: .ratio(0.6),
                        angularInset: 2
                    )
                    .foregroundStyle(colorFromString(item.category.colorName))
                    .annotation(position: .overlay) {
                        Text(item.category.displayName)
                            .font(.caption2)
                            .fontWeight(.bold)
                            .foregroundStyle(.white)
                    }
                }
                .frame(height: 220)
                .padding(.vertical, 8)
            }
        }
    }

    // MARK: - Category List
    private var categoryListSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            ForEach(breakdown, id: \.category) { item in
                HStack {
                    Image(systemName: item.category.icon)
                        .foregroundStyle(colorFromString(item.category.colorName))
                        .frame(width: 30)

                    Text(item.category.displayName)

                    Spacer()

                    Text(item.total, format: .currency(code: "PLN"))
                        .font(.headline)
                        .foregroundStyle(colorFromString(item.category.colorName))
                }
                .padding(.vertical, 4)
            }
        }
    }

    // MARK: - Daily Spending Chart
    private var dailyChartSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Daily Spending")
                .font(.headline)
                .foregroundStyle(.secondary)

            let data = ExpenseSummaryCalculator.dailySpending(from: allExpenses, daysBack: 30)

            Chart(data, id: \.date) { item in
                BarMark(
                    x: .value("Date", item.date, unit: .day),
                    y: .value("Amount", item.total)
                )
                .foregroundStyle(.green)
                .cornerRadius(4)
            }
            .chartXAxis {
                AxisMarks(values: .stride(by: .day, count: 7)) { _ in
                    AxisValueLabel(format: .dateTime.day())
                }
            }
            .chartPlotStyle { plotArea in
                plotArea.frame(height: 200)
            }
            .padding(.vertical, 8)
        }
    }

    // MARK: - Stats Section
    private var statsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Statistics")
                .font(.headline)
                .foregroundStyle(.secondary)

            VStack(spacing: 16) {
                StatRow(
                    label: "Total Expenses",
                    value: monthlyExpenseCount
                )

                StatRow(
                    label: "Daily Average",
                    value: dailyAverageText
                )

                if let topCategory = breakdown.first {
                    StatRow(
                        label: "Top Category",
                        value: topCategory.category.displayName
                    )
                }
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
    private var monthlyTotal: Double {
        ExpenseSummaryCalculator.monthlyTotal(from: allExpenses)
    }

    private var breakdown: [(category: ExpenseCategory, total: Double)] {
        ExpenseSummaryCalculator.categoryBreakdown(from: allExpenses)
    }

    private var monthlyExpenseCount: String {
        let count = ExpenseSummaryCalculator.expensesForMonth(from: allExpenses).count
        return "\(count)"
    }

    private var dailyAverageText: String {
        let avg = ExpenseSummaryCalculator.dailyAverage(from: allExpenses)
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = "PLN"
        return formatter.string(from: NSNumber(value: avg)) ?? "0 zł"
    }

    private func colorFromString(_ colorString: String) -> Color {
        switch colorString {
        case "green": return .green
        case "blue": return .blue
        case "orange": return .orange
        case "purple": return .purple
        case "red": return .red
        default: return .green
        }
    }
}

#Preview {
    NavigationStack {
        ExpenseSummaryView()
    }
    .modelContainer(for: [Expense.self])
}
