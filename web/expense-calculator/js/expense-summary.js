/**
 * Expense Summary Calculator Module
 * Handles expense aggregation, category breakdown, and daily spending data
 */

const ExpenseSummary = {
  /**
   * Calculate total expenses for the current month
   * @param {Array} expenses - Array of expense objects
   * @returns {number} Total amount
   */
  calculateMonthlyTotal(expenses) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses
      .filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, e) => sum + e.amount, 0);
  },

  /**
   * Get expense breakdown by category for the current month
   * @param {Array} expenses - Array of expense objects
   * @returns {Array} Array of { category, displayName, total, icon, hex }
   */
  getCategoryBreakdown(expenses) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totals = {};
    monthlyExpenses.forEach(e => {
      if (!totals[e.category]) {
        totals[e.category] = 0;
      }
      totals[e.category] += e.amount;
    });

    // Map to array with category metadata
    const categoryMap = {
      food: { displayName: 'Food', icon: '🍔', hex: '#22C55E', colorName: 'green' },
      transport: { displayName: 'Transport', icon: '🚗', hex: '#3A82FF', colorName: 'blue' },
      entertainment: { displayName: 'Entertainment', icon: '🎮', hex: '#A855F7', colorName: 'purple' },
      bills: { displayName: 'Bills', icon: '📄', hex: '#F97316', colorName: 'orange' },
      other: { displayName: 'Other', icon: '📦', hex: '#EF4444', colorName: 'red' }
    };

    return Object.keys(totals)
      .map(cat => ({
        category: cat,
        displayName: categoryMap[cat]?.displayName || cat,
        icon: categoryMap[cat]?.icon || '📦',
        hex: categoryMap[cat]?.hex || '#EF4444',
        colorName: categoryMap[cat]?.colorName || 'red',
        total: totals[cat]
      }))
      .sort((a, b) => b.total - a.total);
  },

  /**
   * Get daily spending data for the last N days
   * @param {Array} expenses - Array of expense objects
   * @param {number} days - Number of days to look back (default 30)
   * @returns {Object} { labels: ['1', '2', ...], data: [45.5, 0, ...] }
   */
  getDailySpending(expenses, days = 30) {
    const today = new Date();
    const labels = [];
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dateTime = date.getTime();
      const dayLabel = date.getDate();
      labels.push(dayLabel);

      const dayTotal = expenses
        .filter(e => {
          const expDate = new Date(e.date);
          expDate.setHours(0, 0, 0, 0);
          return expDate.getTime() === dateTime;
        })
        .reduce((sum, e) => sum + e.amount, 0);

      data.push(Math.round(dayTotal * 100) / 100);
    }

    return { labels, data };
  },

  /**
   * Calculate daily average for the current month
   * @param {Array} expenses - Array of expense objects
   * @returns {number} Daily average amount
   */
  getDailyAverage(expenses) {
    const total = this.calculateMonthlyTotal(expenses);
    const now = new Date();
    const dayOfMonth = now.getDate();
    return total / Math.max(dayOfMonth, 1);
  },

  /**
   * Count expenses for the current month
   * @param {Array} expenses - Array of expense objects
   * @returns {number} Count
   */
  getMonthlyCount(expenses) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;
  }
};
