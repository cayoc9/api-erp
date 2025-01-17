//StatisticsController.js
const StatisticsService = require('../services/StatisticsService');
const ChartFormatter = require('../utils/chartFormatter');

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