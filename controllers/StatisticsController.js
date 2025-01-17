//StatisticsController.js
const StatisticsService = require('../services/StatisticsService');
const ChartFormatter = require('../utils/chartFormatter');

// Estatísticas gerais
exports.getStatistics = async (req, res) => {
    try {
        // Padroniza os parâmetros de data
        const startDate = req.query.dateRange?.start || req.query.startDate;
        const endDate = req.query.dateRange?.end || req.query.endDate;

        // Validação das datas
        if (!startDate || !endDate) {
            return res.status(400).json({
                status: 'error',
                message: 'Datas inicial e final são obrigatórias'
            });
        }

        const data = {
            lineChart: await StatisticsService.getLineChartData(startDate, endDate, req.validatedParams),
            pieChart: await StatisticsService.getPieChartData(startDate, endDate, req.validatedParams),
            barCharts: await StatisticsService.getBarChartData(startDate, endDate, req.validatedParams)
        };

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