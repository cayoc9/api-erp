const ChartFormatter = require('../../utils/chartFormatter');

describe('ChartFormatter', () => {
    let formatter;

    beforeEach(() => {
        formatter = new ChartFormatter();
    });

    describe('formatResponse', () => {
        it('should format complete statistics response', () => {
            const data = {
                summary: { total: 100, resolved: 75, pending: 25 },
                line: [{ month: '2024-01', rate: 0.75 }],
                pie: { resolved: 75, pending: 25 },
                bars: {
                    byType: [{ type: 'Type1', count: 50 }],
                    byForm: [{ form: 'Form1', count: 30 }]
                }
            };

            const result = formatter.formatResponse(data);

            expect(result).toHaveProperty('status', 'success');
            expect(result).toHaveProperty('data.summary');
            expect(result).toHaveProperty('data.lineChart');
            expect(result).toHaveProperty('data.pieChart');
            expect(result).toHaveProperty('data.barCharts');
        });
    });

    describe('formatLineChart', () => {
        it('should format monthly resolution rates', () => {
            const data = [
                { month: '2024-01', resolvedCount: 75, totalCount: 100 }
            ];

            const result = formatter.formatLineChart(data);

            expect(result[0]).toHaveProperty('month', '2024-01');
            expect(result[0]).toHaveProperty('resolvedRate', 0.75);
        });
    });

    describe('formatPieChart', () => {
        it('should format resolved vs pending counts', () => {
            const data = {
                resolved: 75,
                pending: 25
            };

            const result = formatter.formatPieChart(data);

            expect(result).toHaveProperty('resolved', 75);
            expect(result).toHaveProperty('pending', 25);
        });
    });

    describe('formatBarCharts', () => {
        it('should format all bar chart types', () => {
            const data = {
                byType: [{ type: 'Type1', count: 50 }],
                byForm: [{ form: 'Form1', count: 30 }],
                bySector: [{ sector: 'Sector1', count: 20 }],
                byResponsible: [{ responsible: 'User1', count: 10 }],
                byRole: [{ role: 'Role1', count: 5 }]
            };

            const result = formatter.formatBarCharts(data);

            expect(result).toHaveProperty('byType');
            expect(result).toHaveProperty('byForm');
            expect(result).toHaveProperty('bySector');
            expect(result).toHaveProperty('byResponsible');
            expect(result).toHaveProperty('byRole');
        });
    });
});