import SwiftData
import Foundation

@Model
final class Expense {
    var amount: Double
    var descriptionText: String
    var categoryRaw: String
    var date: Date
    var createdAt: Date

    var category: ExpenseCategory {
        get { ExpenseCategory(rawValue: categoryRaw) ?? .other }
        set { categoryRaw = newValue.rawValue }
    }

    init(amount: Double, description: String, category: ExpenseCategory, date: Date = Date()) {
        self.amount = amount
        self.descriptionText = description
        self.categoryRaw = category.rawValue
        self.date = date
        self.createdAt = Date()
    }
}
