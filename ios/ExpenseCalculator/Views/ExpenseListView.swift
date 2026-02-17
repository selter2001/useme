import SwiftUI
import SwiftData

struct ExpenseListView: View {
    @Query(sort: \Expense.date, order: .reverse)
    private var expenses: [Expense]

    @Environment(\.modelContext)
    private var modelContext

    @State private var showingAddExpense = false

    var body: some View {
        NavigationStack {
            Group {
                if expenses.isEmpty {
                    emptyStateView
                } else {
                    expenseListView
                }
            }
            .navigationTitle("My Expenses")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        showingAddExpense = true
                    } label: {
                        Image(systemName: "plus")
                    }
                }

                ToolbarItem(placement: .topBarLeading) {
                    NavigationLink(destination: ExpenseSummaryView()) {
                        Image(systemName: "chart.pie.fill")
                    }
                }
            }
            .sheet(isPresented: $showingAddExpense) {
                AddExpenseView()
            }
        }
    }

    private var emptyStateView: some View {
        VStack(spacing: 16) {
            Image(systemName: "plus.circle.fill")
                .font(.system(size: 60))
                .foregroundStyle(.secondary)

            Text("Tap + to add your first expense")
                .font(.headline)
                .foregroundStyle(.secondary)
        }
    }

    private var expenseListView: some View {
        List {
            // Monthly total header
            Section {
                HStack {
                    Text("This Month")
                        .font(.headline)
                    Spacer()
                    Text(ExpenseSummaryCalculator.monthlyTotal(from: expenses), format: .currency(code: "PLN"))
                        .font(.title2)
                        .fontWeight(.bold)
                        .foregroundStyle(.green)
                }
                .padding(.vertical, 4)
            }

            // Expense list
            Section {
                ForEach(expenses) { expense in
                    ExpenseRow(expense: expense)
                }
                .onDelete(perform: deleteExpenses)
            }
        }
    }

    private func deleteExpenses(at offsets: IndexSet) {
        for index in offsets {
            let expense = expenses[index]
            modelContext.delete(expense)
        }

        try? modelContext.save()
    }
}

#Preview {
    ExpenseListView()
        .modelContainer(for: [Expense.self])
}
