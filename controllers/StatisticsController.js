//StatisticsController.js
const StatisticsService = require('../services/StatisticsService');
const ChartFormatter = require('../utils/chartFormatter');

// Estatísticas gerais
exports.getStatistics = async (req, res) => {
    const { startDate, endDate, ...filters } = req.validatedParams;

    try {
        const data = {
            lineChart: await StatisticsService.getLineChartData(startDate, endDate, filters),
            pieChart: await StatisticsService.getPieChartData(startDate, endDate, filters),
            barCharts: await StatisticsService.getBarChartData(startDate, endDate, filters)
        };

        res.json(ChartFormatter.formatResponse(data));
    } catch (error) {
        res.status(500).json({
            message: 'Erro ao obter estatísticas',
            error: error.message
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