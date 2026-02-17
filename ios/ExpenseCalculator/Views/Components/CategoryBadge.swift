import SwiftUI

struct CategoryBadge: View {
    let category: ExpenseCategory

    var body: some View {
        HStack(spacing: 4) {
            Image(systemName: category.icon)
                .font(.caption2)

            Text(category.displayName)
                .font(.caption)
                .fontWeight(.medium)
        }
        .padding(.horizontal, 10)
        .padding(.vertical, 4)
        .background(
            Capsule()
                .fill(colorFromString(category.colorName).opacity(0.15))
        )
        .foregroundStyle(colorFromString(category.colorName))
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
    VStack(spacing: 12) {
        ForEach(ExpenseCategory.allCases, id: \.self) { category in
            CategoryBadge(category: category)
        }
    }
    .padding()
}
