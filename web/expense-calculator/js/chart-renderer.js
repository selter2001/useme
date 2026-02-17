/**
 * Chart Renderer Module
 * Handles Chart.js rendering with dark theme for expense data
 */

const ExpenseChartRenderer = {
  dailyChart: null,
  categoryChart: null,

  /**
   * Render daily spending bar chart
   * @param {string} canvasId - Canvas element ID
   * @param {Object} dailyData - { labels, data }
   */
  renderDailyChart(canvasId, dailyData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (this.dailyChart) {
      this.dailyChart.destroy();
    }

    this.dailyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dailyData.labels,
        datasets: [{
          label: 'Spending',
          data: dailyData.data,
          backgroundColor: '#22C55E',
          borderRadius: 4,
          barThickness: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1A1A1A',
            titleColor: '#F9FAFB',
            bodyColor: '#9CA3AF',
            borderColor: '#262626',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return '$' + context.parsed.y.toFixed(2);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#9CA3AF',
              callback: function(value) {
                return '$' + value;
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            }
          },
          x: {
            ticks: {
              color: '#9CA3AF',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 15
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            }
          }
        }
      }
    });
  },

  /**
   * Render category doughnut chart
   * @param {string} canvasId - Canvas element ID
   * @param {Array} breakdown - Array of { displayName, total, hex }
   */
  renderCategoryChart(canvasId, breakdown) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (this.categoryChart) {
      this.categoryChart.destroy();
    }

    if (breakdown.length === 0) return;

    const labels = breakdown.map(b => b.displayName);
    const data = breakdown.map(b => b.total);
    const colors = breakdown.map(b => b.hex);

    this.categoryChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors,
          borderColor: '#0E0E0E',
          borderWidth: 3,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1A1A1A',
            titleColor: '#F9FAFB',
            bodyColor: '#9CA3AF',
            borderColor: '#262626',
            borderWidth: 1,
            padding: 12,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((context.parsed / total) * 100).toFixed(1);
                return '$' + context.parsed.toFixed(2) + ' (' + percentage + '%)';
              }
            }
          }
        }
      }
    });
  }
};
