/**
 * Habit Tracker Main Application
 * Handles CRUD operations, localStorage persistence, and UI updates
 */

const HabitTracker = {
  // Application State
  habits: [],
  currentDetailHabitId: null,

  // Available icons (emoji)
  availableIcons: ['🏃', '📖', '💧', '🌙', '❤️', '💪', '🍴', '🎨', '🎵', '🎓', '🌿', '⭐'],

  // Available colors
  availableColors: [
    { name: 'green', hex: '#22C55E' },
    { name: 'blue', hex: '#3A82FF' },
    { name: 'orange', hex: '#F97316' },
    { name: 'purple', hex: '#A855F7' },
    { name: 'red', hex: '#EF4444' },
    { name: 'yellow', hex: '#EAB308' }
  ],

  // Selected values for modal
  selectedIcon: null,
  selectedColor: null,

  /**
   * Storage Module
   */
  Storage: {
    save(habits) {
      try {
        const data = {
          version: 1,
          habits: habits,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('habitTrackerData', JSON.stringify(data));
      } catch (e) {
        console.warn('localStorage unavailable:', e);
      }
    },

    load() {
      try {
        const stored = localStorage.getItem('habitTrackerData');
        if (!stored) return null;

        const data = JSON.parse(stored);

        // Validate version (migration stub for future)
        if (data.version !== 1) {
          console.warn('Data version mismatch, using defaults');
          return null;
        }

        return data;
      } catch (error) {
        console.error('Failed to load data:', error);
        return null;
      }
    }
  },

  /**
   * Initialize application
   */
  init() {
    // Load habits from storage or seed demo data
    const stored = this.Storage.load();
    if (stored && stored.habits.length > 0) {
      this.habits = stored.habits;
    } else {
      this.seedDemoData();
    }

    // Bind event listeners first so UI is always interactive
    this.bindEvents();

    // Render UI (chart may fail if Chart.js CDN blocked)
    this.renderHabitList();
    try {
      this.renderWeeklyChart();
    } catch (e) {
      console.warn('Chart render failed:', e);
    }
  },

  /**
   * Seed demo data for first-time visitors
   */
  seedDemoData() {
    const today = new Date();
    const getDateDaysAgo = (days) => {
      const d = new Date(today);
      d.setDate(d.getDate() - days);
      return d.toISOString();
    };

    this.habits = [
      {
        id: Date.now() - 3000,
        name: 'Morning Run',
        icon: '🏃',
        color: 'green',
        createdAt: getDateDaysAgo(10),
        completions: [
          { date: getDateDaysAgo(6), status: 'done' },
          { date: getDateDaysAgo(5), status: 'done' },
          { date: getDateDaysAgo(4), status: 'done' },
          { date: getDateDaysAgo(3), status: 'done' },
          { date: getDateDaysAgo(2), status: 'done' },
          { date: getDateDaysAgo(1), status: 'done' },
          { date: getDateDaysAgo(0), status: 'done' }
        ]
      },
      {
        id: Date.now() - 2000,
        name: 'Read 30min',
        icon: '📖',
        color: 'blue',
        createdAt: getDateDaysAgo(8),
        completions: [
          { date: getDateDaysAgo(5), status: 'done' },
          { date: getDateDaysAgo(3), status: 'done' },
          { date: getDateDaysAgo(1), status: 'done' }
        ]
      },
      {
        id: Date.now() - 1000,
        name: 'Drink Water',
        icon: '💧',
        color: 'purple',
        createdAt: getDateDaysAgo(7),
        completions: [
          { date: getDateDaysAgo(6), status: 'done' },
          { date: getDateDaysAgo(5), status: 'done' },
          { date: getDateDaysAgo(4), status: 'done' },
          { date: getDateDaysAgo(3), status: 'done' },
          { date: getDateDaysAgo(2), status: 'done' },
          { date: getDateDaysAgo(1), status: 'done' },
          { date: getDateDaysAgo(0), status: 'done' }
        ]
      }
    ];

    this.Storage.save(this.habits);
  },

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Add habit button
    document.getElementById('add-habit-btn').addEventListener('click', () => {
      this.showAddModal();
    });

    // Modal cancel
    document.getElementById('modal-cancel').addEventListener('click', () => {
      this.hideAddModal();
    });

    // Modal save
    document.getElementById('modal-save').addEventListener('click', () => {
      this.saveNewHabit();
    });

    // Habit name input — revalidate on every keystroke
    document.getElementById('habit-name-input').addEventListener('input', () => {
      this.validateModalForm();
    });

    // Detail view back button
    document.getElementById('detail-back').addEventListener('click', () => {
      this.hideDetail();
    });

    // Detail view delete button
    document.getElementById('detail-delete').addEventListener('click', () => {
      this.deleteHabit(this.currentDetailHabitId);
    });
  },

  /**
   * Render habit list
   */
  renderHabitList() {
    const listContainer = document.getElementById('habit-list');
    const emptyState = document.getElementById('empty-state');

    listContainer.innerHTML = '';

    if (this.habits.length === 0) {
      emptyState.classList.add('visible');
      return;
    }

    emptyState.classList.remove('visible');

    this.habits.forEach(habit => {
      const habitItem = document.createElement('div');
      habitItem.className = 'habit-item';

      // Icon
      const iconDiv = document.createElement('div');
      iconDiv.className = `habit-icon habit-color-${habit.color}`;
      iconDiv.textContent = habit.icon;

      // Info
      const infoDiv = document.createElement('div');
      infoDiv.className = 'habit-info';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'habit-name';
      nameDiv.textContent = habit.name;

      const streak = StreakCalculator.calculateStreak(habit.completions);
      const streakDiv = document.createElement('div');
      streakDiv.className = 'habit-streak';
      streakDiv.textContent = streak.current > 0 ? `🔥 ${streak.current} day streak` : 'No streak yet';

      infoDiv.appendChild(nameDiv);
      infoDiv.appendChild(streakDiv);

      // Check button
      const checkBtn = document.createElement('button');
      checkBtn.type = 'button';
      checkBtn.className = 'habit-check';
      checkBtn.setAttribute('aria-label', 'Toggle completion');

      // Check if completed today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const completedToday = habit.completions.some(c => {
        const compDate = new Date(c.date);
        compDate.setHours(0, 0, 0, 0);
        return compDate.getTime() === today.getTime() && c.status === 'done';
      });

      if (completedToday) {
        checkBtn.classList.add('completed');
      }

      checkBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleCompletion(habit.id);
      });

      // Click on item to show detail
      habitItem.addEventListener('click', () => {
        this.showDetail(habit.id);
      });

      habitItem.appendChild(iconDiv);
      habitItem.appendChild(infoDiv);
      habitItem.appendChild(checkBtn);

      listContainer.appendChild(habitItem);
    });
  },

  /**
   * Toggle habit completion for today
   */
  toggleCompletion(habitId) {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed today
    const existingIndex = habit.completions.findIndex(c => {
      const compDate = new Date(c.date);
      compDate.setHours(0, 0, 0, 0);
      return compDate.getTime() === today.getTime();
    });

    if (existingIndex >= 0) {
      // Remove completion
      habit.completions.splice(existingIndex, 1);
    } else {
      // Add completion
      habit.completions.push({
        date: new Date().toISOString(),
        status: 'done'
      });
    }

    this.Storage.save(this.habits);
    this.renderHabitList();
    this.renderWeeklyChart();
  },

  /**
   * Show add habit modal
   */
  showAddModal() {
    const modal = document.getElementById('add-modal');
    const nameInput = document.getElementById('habit-name-input');

    // Reset form
    nameInput.value = '';
    this.selectedIcon = null;
    this.selectedColor = null;
    document.getElementById('modal-save').disabled = true;

    // Render icon picker
    this.renderIconPicker();

    // Render color picker
    this.renderColorPicker();

    modal.removeAttribute('hidden');
    nameInput.focus();
  },

  /**
   * Hide add habit modal
   */
  hideAddModal() {
    const modal = document.getElementById('add-modal');
    modal.setAttribute('hidden', '');
  },

  /**
   * Render icon picker
   */
  renderIconPicker() {
    const container = document.getElementById('icon-picker');
    container.innerHTML = '';

    this.availableIcons.forEach(icon => {
      const iconBtn = document.createElement('button');
      iconBtn.type = 'button';
      iconBtn.className = 'icon-choice';
      iconBtn.textContent = icon;
      iconBtn.setAttribute('role', 'radio');
      iconBtn.setAttribute('aria-checked', 'false');

      iconBtn.addEventListener('click', () => {
        this.selectIcon(icon);
      });

      container.appendChild(iconBtn);
    });
  },

  /**
   * Select an icon
   */
  selectIcon(icon) {
    this.selectedIcon = icon;

    // Update UI
    document.querySelectorAll('.icon-choice').forEach(btn => {
      btn.classList.remove('selected');
      btn.setAttribute('aria-checked', 'false');
      if (btn.textContent === icon) {
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');
      }
    });

    this.validateModalForm();
  },

  /**
   * Render color picker
   */
  renderColorPicker() {
    const container = document.getElementById('color-picker');
    container.innerHTML = '';

    this.availableColors.forEach(color => {
      const colorBtn = document.createElement('button');
      colorBtn.type = 'button';
      colorBtn.className = 'color-choice';
      colorBtn.style.backgroundColor = color.hex;
      colorBtn.setAttribute('role', 'radio');
      colorBtn.setAttribute('aria-checked', 'false');
      colorBtn.setAttribute('aria-label', color.name);

      colorBtn.addEventListener('click', () => {
        this.selectColor(color.name);
      });

      container.appendChild(colorBtn);
    });
  },

  /**
   * Select a color
   */
  selectColor(colorName) {
    this.selectedColor = colorName;

    // Update UI
    document.querySelectorAll('.color-choice').forEach(btn => {
      btn.classList.remove('selected');
      btn.setAttribute('aria-checked', 'false');
      if (btn.getAttribute('aria-label') === colorName) {
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');
      }
    });

    this.validateModalForm();
  },

  /**
   * Validate modal form and enable/disable save button
   */
  validateModalForm() {
    const nameInput = document.getElementById('habit-name-input');
    const saveBtn = document.getElementById('modal-save');
    const isValid = nameInput.value.trim().length > 0 && this.selectedIcon && this.selectedColor;
    saveBtn.disabled = !isValid;
  },

  /**
   * Save new habit
   */
  saveNewHabit() {
    const nameInput = document.getElementById('habit-name-input');
    const name = nameInput.value.trim();

    if (!name || !this.selectedIcon || !this.selectedColor) return;

    const newHabit = {
      id: Date.now(),
      name: name,
      icon: this.selectedIcon,
      color: this.selectedColor,
      createdAt: new Date().toISOString(),
      completions: []
    };

    this.habits.push(newHabit);
    this.Storage.save(this.habits);

    this.hideAddModal();
    this.renderHabitList();
    this.renderWeeklyChart();
  },

  /**
   * Show habit detail view
   */
  showDetail(habitId) {
    const habit = this.habits.find(h => h.id === habitId);
    if (!habit) return;

    this.currentDetailHabitId = habitId;

    // Hide habit list, show detail view
    document.getElementById('habit-list').style.display = 'none';
    document.getElementById('detail-view').removeAttribute('hidden');

    // Render header
    const headerContainer = document.getElementById('detail-header');
    headerContainer.innerHTML = `
      <div class="detail-icon habit-color-${habit.color}">${habit.icon}</div>
      <div class="detail-name">${habit.name}</div>
    `;

    // Calculate and render streaks
    const streak = StreakCalculator.calculateStreak(habit.completions);
    const streaksContainer = document.getElementById('detail-streaks');
    streaksContainer.innerHTML = `
      <div class="streak-badge">
        <span class="streak-value">${streak.current}</span>
        <span class="streak-label">Current Streak</span>
      </div>
      <div class="streak-badge">
        <span class="streak-value">${streak.longest}</span>
        <span class="streak-label">Longest Streak</span>
      </div>
    `;

    // Render monthly chart
    const monthlyData = StreakCalculator.getMonthlyData(habit.completions);
    const colorObj = this.availableColors.find(c => c.name === habit.color);
    ChartRenderer.renderDetailChart('detailChart', monthlyData, colorObj?.hex || '#22C55E');
  },

  /**
   * Hide detail view
   */
  hideDetail() {
    document.getElementById('detail-view').setAttribute('hidden', '');
    document.getElementById('habit-list').style.display = '';
    this.currentDetailHabitId = null;
  },

  /**
   * Delete habit
   */
  deleteHabit(habitId) {
    if (!confirm('Are you sure you want to delete this habit?')) {
      return;
    }

    this.habits = this.habits.filter(h => h.id !== habitId);
    this.Storage.save(this.habits);

    this.hideDetail();
    this.renderHabitList();
    this.renderWeeklyChart();
  },

  /**
   * Render weekly chart for all habits combined
   */
  renderWeeklyChart() {
    // Combine all completions from all habits
    const allCompletions = this.habits.flatMap(h => h.completions);

    const weeklyData = StreakCalculator.getWeeklyData(allCompletions);
    ChartRenderer.renderWeeklyChart('weeklyChart', weeklyData);
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  HabitTracker.init();
});
