//StatisticsController.js
const StatisticsService = require('../services/StatisticsService');
const ChartFormatter = require('../utils/chartFormatter');

// Estatísticas gerais
exports.getStatistics = async (req, res) => {
    try {
      const startDate = req.query.dateRange?.start || req.query.startDate;
      const endDate = req.query.dateRange?.end || req.query.endDate;
  
      if (!startDate || !endDate) {
        return res.status(400).json({
          status: 'error',
          message: 'Datas inicial e final são obrigatórias'
        });
      }
  
      // Chama StatisticsService
      const lineChart = await StatisticsService.getLineChartData(startDate, endDate, req.validatedParams);
      const pieChart = await StatisticsService.getPieChartData(startDate, endDate, req.validatedParams);
      const barCharts = await StatisticsService.getBarChartData(startDate, endDate, req.validatedParams);
  
      // Ajustar para o "chartFormatter" (que espera summary, monthlyRates, statusDistribution, distributions)
      const data = {
        // Se quisermos summary, definimos manualmente algo
        summary: {
          total: pieChart.resolved + pieChart.pending, // Exemplo
          resolved: pieChart.resolved,
          pending: pieChart.pending
        },
        monthlyRates: lineChart, // ou "monthlyData" => lineChart
        statusDistribution: pieChart, // o chartFormatter chama "statusData"
        distributions: {
          types: barCharts.byType,
          forms: barCharts.byForm,
          sectors: barCharts.bySector,
          responsibles: barCharts.byResponsible,
          roles: barCharts.byRole
        }
      };
  
      // Agora formatResponse(data) não terá erro
      res.json(ChartFormatter.formatResponse(data));
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro ao processar estatísticas'
      });
    }
  };

// Taxa de resolução ao longo do tempo
exports.getResolutionRates = async (req, res) => {
    const { startDate, endDate, ...filters } = req.validatedParams;

    try {
        const data = await StatisticsService.getLineChartData(startDate, endDate, filters);
        res.json({
            status: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao obter taxas de resolução',
            error: error.message
        });
    }
};

// Distribuição atual de status
exports.getStatusDistribution = async (req, res) => {
    const { startDate, endDate, ...filters } = req.validatedParams;

    try {
        const data = await StatisticsService.getPieChartData(startDate, endDate, filters);
        res.json({
            status: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao obter distribuição de status',
            error: error.message
        });
    }
};

// Detalhamento em gráficos de barra
exports.getBreakdowns = async (req, res) => {
    const { startDate, endDate, ...filters } = req.validatedParams;

    try {
        const data = await StatisticsService.getBarChartData(startDate, endDate, filters);
        res.json({
            status: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao obter detalhamentos',
            error: error.message
        });
    }
};