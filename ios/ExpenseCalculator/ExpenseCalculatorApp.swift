import SwiftUI
import SwiftData

@main
struct ExpenseCalculatorApp: App {
    var body: some Scene {
        WindowGroup {
            ExpenseListView()
        }
        .modelContainer(for: [Expense.self])
    }
}
