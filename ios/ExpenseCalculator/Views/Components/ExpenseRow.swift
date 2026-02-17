import SwiftUI

struct ExpenseRow: View {
    let expense: Expense

    var body: some View {
        HStack(spacing: 12) {
            // Category icon
            Image(systemName: expense.category.icon)
                .font(.title3)
                .foregroundStyle(colorFromString(expense.category.colorName))
                .frame(width: 40)

            // Description and category
            VStack(alignment: .leading, spacing: 4) {
                Text(expense.descriptionText)
                    .font(.body)

                HStack(spacing: 8) {
                    CategoryBadge(category: expense.category)

                    Text(expense.date, style: .date)
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            Spacer()

            // Amount
            Text(expense.amount, format: .currency(code: "PLN"))
                .font(.headline)
                .foregroundStyle(colorFromString(expense.category.colorName))
        }
        .padding(.vertical, 4)
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
    let expense = Expense(amount: 45.50, description: "Groceries", category: .food)

    return List {
        ExpenseRow(expense: expense)
    }
}
