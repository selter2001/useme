import Foundation

enum ExpenseCategory: String, Codable, CaseIterable {
    case food = "food"
    case transport = "transport"
    case entertainment = "entertainment"
    case bills = "bills"
    case other = "other"

    var displayName: String {
        switch self {
        case .food: return "Food"
        case .transport: return "Transport"
        case .entertainment: return "Entertainment"
        case .bills: return "Bills"
        case .other: return "Other"
        }
    }

    var icon: String {
        switch self {
        case .food: return "fork.knife"
        case .transport: return "car.fill"
        case .entertainment: return "gamecontroller.fill"
        case .bills: return "doc.text.fill"
        case .other: return "ellipsis.circle.fill"
        }
    }

    var colorName: String {
        switch self {
        case .food: return "green"
        case .transport: return "blue"
        case .entertainment: return "purple"
        case .bills: return "orange"
        case .other: return "red"
        }
    }
}
