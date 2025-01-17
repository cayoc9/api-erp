const StatisticsService = require('../../services/StatisticsService');
const { mockRedis } = require('../mocks/redis');

jest.mock('../../config/redis', () => mockRedis);

describe('StatisticsService', () => {
    let service;

    beforeEach(() => {
        service = new StatisticsService();
        mockRedis.clear();
    });

    describe('getLineChartData', () => {
        it('should return monthly resolution rates', async () => {
            const params = {
                startDate: '2024-01-01',
                endDate: '2024-03-31'
            };

            const result = await service.getLineChartData(params);

            expect(result).toBeInstanceOf(Array);
            expect(result[0]).toHaveProperty('month');
            expect(result[0]).toHaveProperty('resolvedRate');
        });

        it('should filter by sector', async () => {
            const params = {
                startDate: '2024-01-01',
                endDate: '2024-03-31',
                sectorId: 1
            };

            const result = await service.getLineChartData(params);

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('getPieChartData', () => {
        it('should return resolved vs pending counts', async () => {
            const params = {
                startDate: '2024-01-01',
                endDate: '2024-03-31'
            };

            const result = await service.getPieChartData(params);

            expect(result).toHaveProperty('resolved');
            expect(result).toHaveProperty('pending');
        });
    });

    describe('getBarChartData', () => {
        it('should return all bar chart data types', async () => {
            const params = {
                startDate: '2024-01-01',
                endDate: '2024-03-31'
            };

            const result = await service.getBarChartData(params);

            expect(result).toHaveProperty('byType');
            expect(result).toHaveProperty('byForm');
            expect(result).toHaveProperty('bySector');
            expect(result).toHaveProperty('byResponsible');
            expect(result).toHaveProperty('byRole');
        });
    });
});