/**
 * Chart Renderer Module
 * Handles Chart.js rendering with dark theme
 */

const ChartRenderer = {
  currentChart: null,
  detailChart: null,

  /**
   * Render weekly bar chart
   * @param {string} canvasId - Canvas element ID
   * @param {Object} weeklyData - { labels, data }
   * @param {string} accentColor - Hex color for bars
   */
  renderWeeklyChart(canvasId, weeklyData, accentColor = '#22C55E') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Destroy existing chart to prevent canvas reuse error
    if (this.currentChart) {
      this.currentChart.destroy();
    }

    this.currentChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weeklyData.labels,
        datasets: [{
          label: 'Completions',
          data: weeklyData.data,
          backgroundColor: accentColor,
          borderRadius: 4,
          barThickness: 32
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            displayColors: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#9CA3AF',
              stepSize: 1,
              precision: 0
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            }
          },
          x: {
            ticks: {
              color: '#9CA3AF'
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
   * Render detail chart for 30-day view
   * @param {string} canvasId - Canvas element ID
   * @param {Array} monthlyData - Array of { date, completed }
   * @param {string} accentColor - Hex color for bars
   */
  renderDetailChart(canvasId, monthlyData, accentColor = '#22C55E') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Destroy existing detail chart
    if (this.detailChart) {
      this.detailChart.destroy();
    }

    // Extract labels (day of month) and data (1 if completed, 0 if not)
    const labels = monthlyData.map(d => {
      const date = new Date(d.date);
      return date.getDate();
    });
    const data = monthlyData.map(d => d.completed ? 1 : 0);

    this.detailChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Completed',
          data: data,
          backgroundColor: accentColor,
          borderRadius: 2,
          barThickness: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            padding: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return context.parsed.y === 1 ? 'Completed' : 'Not completed';
              }
            }
          }
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            max: 1
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
  }
};
