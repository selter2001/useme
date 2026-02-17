import SwiftUI
import SwiftData

struct AddHabitView: View {
    @Environment(\.modelContext)
    private var modelContext

    @Environment(\.dismiss)
    private var dismiss

    var habitToEdit: Habit?

    @State private var name: String = ""
    @State private var selectedIcon: String = "figure.run"
    @State private var selectedColor: String = "green"

    // Available icon options
    private let iconOptions = [
        "figure.run", "book.fill", "drop.fill", "moon.fill",
        "heart.fill", "dumbbell.fill", "fork.knife", "paintbrush.fill",
        "music.note", "graduationcap.fill", "leaf.fill", "star.fill"
    ]

    // Available color options
    private let colorOptions = ["green", "blue", "orange", "purple", "red", "yellow"]

    var body: some View {
        NavigationStack {
            Form {
                Section("Name") {
                    TextField("Habit name", text: $name)
                }

                Section("Icon") {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 50))], spacing: 16) {
                        ForEach(iconOptions, id: \.self) { icon in
                            Button {
                                selectedIcon = icon
                            } label: {
                                Image(systemName: icon)
                                    .font(.system(size: 30))
                                    .foregroundStyle(selectedIcon == icon ? colorFromString(selectedColor) : .secondary)
                                    .frame(width: 50, height: 50)
                                    .background(
                                        Circle()
                                            .fill(selectedIcon == icon ? colorFromString(selectedColor).opacity(0.2) : Color.clear)
                                    )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.vertical, 8)
                }

                Section("Color") {
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 50))], spacing: 16) {
                        ForEach(colorOptions, id: \.self) { color in
                            Button {
                                selectedColor = color
                            } label: {
                                Circle()
                                    .fill(colorFromString(color))
                                    .frame(width: 50, height: 50)
                                    .overlay(
                                        Circle()
                                            .stroke(Color.primary, lineWidth: selectedColor == color ? 3 : 0)
                                    )
                            }
                            .buttonStyle(.plain)
                        }
                    }
                    .padding(.vertical, 8)
                }
            }
            .navigationTitle(habitToEdit == nil ? "Add Habit" : "Edit Habit")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }

                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        saveHabit()
                    }
                    .disabled(name.isEmpty)
                }
            }
            .onAppear {
                if let habit = habitToEdit {
                    name = habit.name
                    selectedIcon = habit.icon
                    selectedColor = habit.color
                }
            }
        }
    }

    private func saveHabit() {
        if let existingHabit = habitToEdit {
            // Edit mode: update existing habit
            existingHabit.name = name
            existingHabit.icon = selectedIcon
            existingHabit.color = selectedColor
        } else {
            // Create mode: insert new habit
            let newHabit = Habit(name: name, icon: selectedIcon, color: selectedColor)
            modelContext.insert(newHabit)
        }

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
        case "yellow": return .yellow
        default: return .green
        }
    }
}

#Preview {
    AddHabitView()
        .modelContainer(for: [Habit.self, HabitCompletion.self])
}
