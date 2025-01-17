class ChartFormatter {
  static formatResponse(data) {
    return {
      status: "success",
      data: {
        summary: this.formatSummary(data.summary),
        lineChart: this.formatLineChart(data.monthlyRates),
        pieChart: this.formatPieChart(data.statusDistribution),
        barCharts: this.formatBarCharts(data.distributions)
      }
    };
  }

  static formatSummary(summary) {
    return {
      totalCount: summary.total || 0,
      resolvedCount: summary.resolved || 0,
      pendingCount: summary.pending || 0
    };
  }

  static formatLineChart(monthlyData) {
    return monthlyData.map(item => ({
      month: item.month,
      resolvedRate: parseFloat((item.resolvedCount / item.totalCount * 100).toFixed(2))
    }));
  }

  static formatPieChart(statusData) {
    return {
      resolved: statusData.resolved || 0,
      pending: statusData.pending || 0
    };
  }

  static formatBarCharts(distributions) {
    return {
      byType: this.formatDistribution(distributions.types),
      byForm: this.formatDistribution(distributions.forms),
      bySector: this.formatDistribution(distributions.sectors),
      byResponsible: this.formatDistribution(distributions.responsibles),
      byRole: this.formatDistribution(distributions.roles)
    };
  }

  static formatDistribution(items) {
    return items.map(item => ({
      [item.key]: item.label,
      count: item.count
    }));
  }
}

module.exports = ChartFormatter;