/**
 * Streak Calculator Module
 * Handles streak calculations and weekly/monthly data formatting
 */

const StreakCalculator = {
  /**
   * Calculate current and longest streak from completion history
   * @param {Array} completions - Array of {date, status} objects
   * @returns {Object} { current, longest }
   */
  calculateStreak(completions) {
    // Filter to done completions only
    const doneCompletions = completions.filter(c => c.status === 'done');

    if (doneCompletions.length === 0) {
      return { current: 0, longest: 0 };
    }

    // Normalize dates to start of day and deduplicate
    const normalizedDates = doneCompletions.map(c => {
      const date = new Date(c.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    });

    // Remove duplicates and sort descending (newest first)
    const uniqueDates = [...new Set(normalizedDates)].sort((a, b) => b - a);

    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();
    const yesterdayTime = todayTime - 86400000; // 1 day in ms

    // Current streak only valid if most recent completion is today or yesterday
    if (uniqueDates[0] === todayTime || uniqueDates[0] === yesterdayTime) {
      let expectedDate = uniqueDates[0];
      for (const date of uniqueDates) {
        if (date === expectedDate) {
          currentStreak++;
          expectedDate -= 86400000; // Go back one day
        } else {
          break;
        }
      }
    }

    // Calculate longest streak
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 0; i < uniqueDates.length - 1; i++) {
      const diff = uniqueDates[i] - uniqueDates[i + 1];
      if (diff === 86400000) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { current: currentStreak, longest: longestStreak };
  },

  /**
   * Get weekly completion data for last 7 days
   * @param {Array} completions - Array of {date, status} objects
   * @returns {Object} { labels: ['Mon', 'Tue', ...], data: [1, 0, 1, ...] }
   */
  getWeeklyData(completions) {
    const today = new Date();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const labels = [];
    const data = [];

    // Build last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayName = daysOfWeek[date.getDay()];
      labels.push(dayName);

      // Count completions for this day
      const dateTime = date.getTime();
      const count = completions.filter(c => {
        if (c.status !== 'done') return false;
        const compDate = new Date(c.date);
        compDate.setHours(0, 0, 0, 0);
        return compDate.getTime() === dateTime;
      }).length;

      data.push(count);
    }

    return { labels, data };
  },

  /**
   * Get monthly completion data for last 30 days
   * @param {Array} completions - Array of {date, status} objects
   * @returns {Array} Array of { date, completed } objects
   */
  getMonthlyData(completions) {
    const today = new Date();
    const monthlyData = [];

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dateTime = date.getTime();
      const completed = completions.some(c => {
        if (c.status !== 'done') return false;
        const compDate = new Date(c.date);
        compDate.setHours(0, 0, 0, 0);
        return compDate.getTime() === dateTime;
      });

      monthlyData.push({
        date: date.toISOString().split('T')[0],
        completed
      });
    }

    return monthlyData;
  }
};
