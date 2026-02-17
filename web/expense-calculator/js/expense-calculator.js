/**
 * Expense Calculator Main Application
 * Handles CRUD operations, localStorage persistence, and UI updates
 */

const ExpenseCalculator = {
  // Application State
  expenses: [],
  selectedCategory: null,

  // Available categories
  categories: [
    { name: 'food', displayName: 'Food', icon: '🍔', hex: '#22C55E', colorName: 'green' },
    { name: 'transport', displayName: 'Transport', icon: '🚗', hex: '#3A82FF', colorName: 'blue' },
    { name: 'entertainment', displayName: 'Entertainment', icon: '🎮', hex: '#A855F7', colorName: 'purple' },
    { name: 'bills', displayName: 'Bills', icon: '📄', hex: '#F97316', colorName: 'orange' },
    { name: 'other', displayName: 'Other', icon: '📦', hex: '#EF4444', colorName: 'red' }
  ],

  /**
   * Storage Module
   */
  Storage: {
    save(expenses) {
      try {
        const data = {
          version: 1,
          expenses: expenses,
          lastUpdated: new Date().toISOString()
        };
        localStorage.setItem('expenseCalculatorData', JSON.stringify(data));
      } catch (e) {
        console.warn('localStorage unavailable:', e);
      }
    },

    load() {
      try {
        const stored = localStorage.getItem('expenseCalculatorData');
        if (!stored) return null;

        const data = JSON.parse(stored);

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
    const stored = this.Storage.load();
    if (stored && stored.expenses.length > 0) {
      this.expenses = stored.expenses;
    } else {
      this.seedDemoData();
    }

    this.bindEvents();
    this.renderExpenseList();
    this.updateMonthlyTotal();
    try {
      this.renderDailyChart();
    } catch (e) {
      console.warn('Chart render failed:', e);
    }
  },

  /**
   * Seed demo data for first-time visitors
   */
  seedDemoData() {
    const today = new Date();
    const getDate = (daysAgo) => {
      const d = new Date(today);
      d.setDate(d.getDate() - daysAgo);
      return d.toISOString();
    };

    this.expenses = [
      { id: Date.now() - 10000, amount: 85.50, description: 'Grocery shopping', category: 'food', date: getDate(0), createdAt: getDate(0) },
      { id: Date.now() - 9000, amount: 45.00, description: 'Uber to airport', category: 'transport', date: getDate(1), createdAt: getDate(1) },
      { id: Date.now() - 8000, amount: 120.00, description: 'Electric bill', category: 'bills', date: getDate(2), createdAt: getDate(2) },
      { id: Date.now() - 7000, amount: 35.90, description: 'Cinema tickets', category: 'entertainment', date: getDate(3), createdAt: getDate(3) },
      { id: Date.now() - 6000, amount: 22.50, description: 'Lunch at restaurant', category: 'food', date: getDate(3), createdAt: getDate(3) },
      { id: Date.now() - 5000, amount: 15.00, description: 'Bus monthly pass', category: 'transport', date: getDate(5), createdAt: getDate(5) },
      { id: Date.now() - 4000, amount: 199.00, description: 'Internet bill', category: 'bills', date: getDate(6), createdAt: getDate(6) },
      { id: Date.now() - 3000, amount: 49.99, description: 'Spotify subscription', category: 'entertainment', date: getDate(7), createdAt: getDate(7) },
      { id: Date.now() - 2000, amount: 67.30, description: 'Weekly groceries', category: 'food', date: getDate(8), createdAt: getDate(8) },
      { id: Date.now() - 1000, amount: 25.00, description: 'Gift for friend', category: 'other', date: getDate(10), createdAt: getDate(10) }
    ];

    this.Storage.save(this.expenses);
  },

  /**
   * Bind event listeners
   */
  bindEvents() {
    document.getElementById('add-expense-btn').addEventListener('click', () => {
      this.showAddModal();
    });

    document.getElementById('modal-cancel').addEventListener('click', () => {
      this.hideAddModal();
    });

    document.getElementById('modal-save').addEventListener('click', () => {
      this.saveNewExpense();
    });

    document.getElementById('expense-amount-input').addEventListener('input', () => {
      this.validateModalForm();
    });

    document.getElementById('expense-desc-input').addEventListener('input', () => {
      this.validateModalForm();
    });

    document.getElementById('summary-btn').addEventListener('click', () => {
      this.showSummary();
    });

    document.getElementById('summary-back').addEventListener('click', () => {
      this.hideSummary();
    });
  },

  /**
   * Render expense list
   */
  renderExpenseList() {
    const listContainer = document.getElementById('expense-list');
    const emptyState = document.getElementById('empty-state');

    listContainer.innerHTML = '';

    if (this.expenses.length === 0) {
      emptyState.classList.add('visible');
      return;
    }

    emptyState.classList.remove('visible');

    // Sort expenses by date descending
    const sorted = [...this.expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(expense => {
      const cat = this.categories.find(c => c.name === expense.category) || this.categories[4];

      const item = document.createElement('div');
      item.className = 'expense-item';

      // Icon
      const iconDiv = document.createElement('div');
      iconDiv.className = `expense-icon expense-color-${cat.colorName}`;
      iconDiv.textContent = cat.icon;

      // Info
      const infoDiv = document.createElement('div');
      infoDiv.className = 'expense-info';

      const descDiv = document.createElement('div');
      descDiv.className = 'expense-desc';
      descDiv.textContent = expense.description;

      const metaDiv = document.createElement('div');
      metaDiv.className = 'expense-meta';

      const badge = document.createElement('span');
      badge.className = `expense-category-badge badge-${cat.colorName}`;
      badge.textContent = cat.displayName;

      const dateSpan = document.createElement('span');
      const dateObj = new Date(expense.date);
      dateSpan.textContent = dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

      metaDiv.appendChild(badge);
      metaDiv.appendChild(dateSpan);

      infoDiv.appendChild(descDiv);
      infoDiv.appendChild(metaDiv);

      // Amount
      const amountDiv = document.createElement('div');
      amountDiv.className = `expense-amount text-${cat.colorName}`;
      amountDiv.textContent = '$' + expense.amount.toFixed(2);

      // Delete on click
      item.addEventListener('click', () => {
        this.deleteExpense(expense.id);
      });

      item.appendChild(iconDiv);
      item.appendChild(infoDiv);
      item.appendChild(amountDiv);

      listContainer.appendChild(item);
    });
  },

  /**
   * Update monthly total display
   */
  updateMonthlyTotal() {
    const total = ExpenseSummary.calculateMonthlyTotal(this.expenses);
    document.getElementById('monthly-total-value').textContent = '$' + total.toFixed(2);
  },

  /**
   * Show add expense modal
   */
  showAddModal() {
    const modal = document.getElementById('add-modal');
    const amountInput = document.getElementById('expense-amount-input');
    const descInput = document.getElementById('expense-desc-input');
    const dateInput = document.getElementById('expense-date-input');

    // Reset form
    amountInput.value = '';
    descInput.value = '';
    dateInput.value = new Date().toISOString().split('T')[0];
    this.selectedCategory = null;
    document.getElementById('modal-save').disabled = true;

    // Render category picker
    this.renderCategoryPicker();

    modal.removeAttribute('hidden');
    amountInput.focus();
  },

  /**
   * Hide add expense modal
   */
  hideAddModal() {
    document.getElementById('add-modal').setAttribute('hidden', '');
  },

  /**
   * Render category picker
   */
  renderCategoryPicker() {
    const container = document.getElementById('category-picker');
    container.innerHTML = '';

    this.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'category-choice';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.setAttribute('aria-label', cat.displayName);

      const iconSpan = document.createElement('span');
      iconSpan.className = 'category-choice-icon';
      iconSpan.textContent = cat.icon;

      const labelSpan = document.createElement('span');
      labelSpan.className = 'category-choice-label';
      labelSpan.textContent = cat.displayName;

      btn.appendChild(iconSpan);
      btn.appendChild(labelSpan);

      btn.addEventListener('click', () => {
        this.selectCategory(cat.name);
      });

      container.appendChild(btn);
    });
  },

  /**
   * Select a category
   */
  selectCategory(categoryName) {
    this.selectedCategory = categoryName;

    document.querySelectorAll('.category-choice').forEach(btn => {
      btn.classList.remove('selected');
      btn.setAttribute('aria-checked', 'false');
      if (btn.getAttribute('aria-label') === this.categories.find(c => c.name === categoryName)?.displayName) {
        btn.classList.add('selected');
        btn.setAttribute('aria-checked', 'true');
      }
    });

    this.validateModalForm();
  },

  /**
   * Validate modal form
   */
  validateModalForm() {
    const amountInput = document.getElementById('expense-amount-input');
    const descInput = document.getElementById('expense-desc-input');
    const saveBtn = document.getElementById('modal-save');

    const amount = parseFloat(amountInput.value);
    const isValid = amount > 0 && descInput.value.trim().length > 0 && this.selectedCategory;
    saveBtn.disabled = !isValid;
  },

  /**
   * Save new expense
   */
  saveNewExpense() {
    const amountInput = document.getElementById('expense-amount-input');
    const descInput = document.getElementById('expense-desc-input');
    const dateInput = document.getElementById('expense-date-input');

    const amount = parseFloat(amountInput.value);
    const description = descInput.value.trim();
    const date = dateInput.value ? new Date(dateInput.value).toISOString() : new Date().toISOString();

    if (!amount || amount <= 0 || !description || !this.selectedCategory) return;

    const newExpense = {
      id: Date.now(),
      amount: Math.round(amount * 100) / 100,
      description: description,
      category: this.selectedCategory,
      date: date,
      createdAt: new Date().toISOString()
    };

    this.expenses.push(newExpense);
    this.Storage.save(this.expenses);

    this.hideAddModal();
    this.renderExpenseList();
    this.updateMonthlyTotal();
    this.renderDailyChart();
  },

  /**
   * Delete expense
   */
  deleteExpense(expenseId) {
    if (!confirm('Are you sure you want to delete this expense?')) return;

    this.expenses = this.expenses.filter(e => e.id !== expenseId);
    this.Storage.save(this.expenses);

    this.renderExpenseList();
    this.updateMonthlyTotal();
    this.renderDailyChart();
  },

  /**
   * Show summary view
   */
  showSummary() {
    document.getElementById('expense-list').style.display = 'none';
    document.getElementById('monthly-total').style.display = 'none';
    document.getElementById('summary-view').removeAttribute('hidden');

    // Update total
    const total = ExpenseSummary.calculateMonthlyTotal(this.expenses);
    document.getElementById('summary-total').textContent = '$' + total.toFixed(2);

    // Render category chart
    const breakdown = ExpenseSummary.getCategoryBreakdown(this.expenses);
    ExpenseChartRenderer.renderCategoryChart('categoryChart', breakdown);

    // Render breakdown list
    const breakdownContainer = document.getElementById('summary-breakdown');
    breakdownContainer.innerHTML = '';

    breakdown.forEach(item => {
      const row = document.createElement('div');
      row.className = 'breakdown-item';

      row.innerHTML = `
        <span class="breakdown-icon">${item.icon}</span>
        <span class="breakdown-name">${item.displayName}</span>
        <span class="breakdown-amount text-${item.colorName}">$${item.total.toFixed(2)}</span>
      `;

      breakdownContainer.appendChild(row);
    });

    // Render stats
    const statsContainer = document.getElementById('summary-stats');
    const count = ExpenseSummary.getMonthlyCount(this.expenses);
    const avg = ExpenseSummary.getDailyAverage(this.expenses);
    const topCat = breakdown.length > 0 ? breakdown[0].displayName : '—';

    statsContainer.innerHTML = `
      <div class="stat-row">
        <span class="stat-label">Total Expenses</span>
        <span class="stat-value">${count}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Daily Average</span>
        <span class="stat-value">$${avg.toFixed(2)}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Top Category</span>
        <span class="stat-value">${topCat}</span>
      </div>
    `;
  },

  /**
   * Hide summary view
   */
  hideSummary() {
    document.getElementById('summary-view').setAttribute('hidden', '');
    document.getElementById('expense-list').style.display = '';
    document.getElementById('monthly-total').style.display = '';
  },

  /**
   * Render daily spending chart
   */
  renderDailyChart() {
    const dailyData = ExpenseSummary.getDailySpending(this.expenses, 30);
    ExpenseChartRenderer.renderDailyChart('dailyChart', dailyData);
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ExpenseCalculator.init();
});
