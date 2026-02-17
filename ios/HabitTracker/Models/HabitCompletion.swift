import SwiftData
import Foundation

enum CompletionStatus: String, Codable {
    case done
    case missed
    case skipped
}

@Model
final class HabitCompletion {
    var date: Date
    var statusRaw: String // Stored value for SwiftData

    /// Computed property to get/set enum from raw string
    var status: CompletionStatus {
        get {
            CompletionStatus(rawValue: statusRaw) ?? .done
        }
        set {
            statusRaw = newValue.rawValue
        }
    }

    init(date: Date, status: CompletionStatus) {
        self.date = date
        self.statusRaw = status.rawValue
    }
}
