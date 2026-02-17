import SwiftUI
import SwiftData

struct HabitListView: View {
    @Query(sort: \Habit.createdAt, order: .reverse)
    private var habits: [Habit]

    @Environment(\.modelContext)
    private var modelContext

    @State private var showingAddHabit = false
    @State private var habitToEdit: Habit? = nil

    var body: some View {
        NavigationStack {
            Group {
                if habits.isEmpty {
                    emptyStateView
                } else {
                    habitListView
                }
            }
            .navigationTitle("My Habits")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        showingAddHabit = true
                    } label: {
                        Image(systemName: "plus")
                    }
                }
            }
            .sheet(isPresented: $showingAddHabit) {
                AddHabitView()
            }
            .sheet(item: $habitToEdit) { habit in
                AddHabitView(habitToEdit: habit)
            }
        }
    }

    private var emptyStateView: some View {
        VStack(spacing: 16) {
            Image(systemName: "plus.circle.fill")
                .font(.system(size: 60))
                .foregroundStyle(.secondary)

            Text("Tap + to add your first habit")
                .font(.headline)
                .foregroundStyle(.secondary)
        }
    }

    private var habitListView: some View {
        List {
            ForEach(habits) { habit in
                HabitRow(habit: habit)
                    .contentShape(Rectangle())
                    .onTapGesture {
                        // NavigationLink to HabitDetailView will be wired in Plan 02
                    }
            }
            .onDelete(perform: deleteHabits)
        }
    }

    private func deleteHabits(at offsets: IndexSet) {
        for index in offsets {
            let habitToDelete = habits[index]
            modelContext.delete(habitToDelete)
        }

        try? modelContext.save()
    }
}

#Preview {
    HabitListView()
        .modelContainer(for: [Habit.self, HabitCompletion.self])
}
