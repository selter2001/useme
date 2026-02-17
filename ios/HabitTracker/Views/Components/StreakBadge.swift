import SwiftUI

struct StreakBadge: View {
    let streak: Int
    let label: String

    init(streak: Int, label: String = "Current") {
        self.streak = streak
        self.label = label
    }

    var body: some View {
        HStack(spacing: 6) {
            // Flame icon
            Image(systemName: "flame.fill")
                .font(streak >= 7 ? .title3 : .body)
                .foregroundStyle(flameColor)

            // Streak count
            VStack(alignment: .leading, spacing: 2) {
                Text("\(streak)")
                    .font(.headline)
                    .foregroundStyle(textColor)

                Text(label)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(.horizontal, 12)
        .padding(.vertical, 6)
        .background(
            Capsule()
                .fill(backgroundColor)
        )
    }

    // Styling based on streak value
    private var flameColor: Color {
        if streak == 0 {
            return .gray
        } else if streak >= 7 {
            return .yellow // Gold tint for milestone
        } else {
            return .orange
        }
    }

    private var textColor: Color {
        streak == 0 ? .gray : .primary
    }

    private var backgroundColor: Color {
        if streak == 0 {
            return .gray.opacity(0.1)
        } else if streak >= 7 {
            return .yellow.opacity(0.15)
        } else {
            return .orange.opacity(0.15)
        }
    }
}

#Preview("Active Streak") {
    VStack(spacing: 20) {
        StreakBadge(streak: 0, label: "Current")
        StreakBadge(streak: 3, label: "Current")
        StreakBadge(streak: 7, label: "Best")
        StreakBadge(streak: 15, label: "Best")
    }
    .padding()
}
