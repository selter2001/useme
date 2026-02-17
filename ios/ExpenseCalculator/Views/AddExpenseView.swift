import SwiftUI
import SwiftData

struct AddExpenseView: View {
    @Environment(\.modelContext)
    private var modelContext

    @Environment(\.dismiss)
    private var dismiss

    @State private var amount: String = ""
    @State private var descriptionText: String = ""
    @State private var selectedCategory: ExpenseCategory = .food
    @State private var date: Date = Date()

    var body: some View {
        NavigationStack {
            Form {
                Section("Amount") {
                    TextField("0.00", text: $amount)
                        .keyboardType(.decimalPad)
                }

                Section("Description") {
                    TextField("What did you spend on?", text: $descriptionText)
                }

                Section("Category") {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 80))], spacing: 12) {
                        ForEach(ExpenseCategory.allCases, id: \.self) { category in
                            Button {
                                selectedCategory = category
                            } label: {
                                VStack(spacing: 6) {
                                    Image(systemName: category.icon)
                                        .font(.title2)
                                    Text(category.displayName)
                                        .font(.caption)
                                }
                                .frame(maxWidth: .infinity)
                                .padding(.vertical, 12)
                                .background(
                                    RoundedRectangle(cornerRadius: 12)
                                        .fill(selectedCategory == category ? colorFromString(category.colorName).opacity(0.2) : Color.gray.opacity(0.1))
                                )
                                .foregroundStyle(selectedCategory == category ? colorFromString(category.colorName) : .secondary)
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.vertical, 8)
                }

                Section("Date") {
                    DatePicker("Expense date", selection: $date, displayedComponents: .date)
                }
            }
            .navigationTitle("Add Expense")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveExpense()
                    }
                    .disabled(parsedAmount == nil || parsedAmount == 0 || descriptionText.isEmpty)
                }
            }
        }
    }

    private var parsedAmount: Double? {
        Double(amount.replacingOccurrences(of: ",", with: "."))
    }

    private func saveExpense() {
        guard let amountValue = parsedAmount, amountValue > 0 else { return }

        let expense = Expense(
            amount: amountValue,
            description: descriptionText.trimmingCharacters(in: .whitespaces),
            category: selectedCategory,
            date: date
        )
        modelContext.insert(expense)
        try? modelContext.save()
        dismiss()
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
    AddExpenseView()
        .modelContainer(for: [Expense.self])
}
