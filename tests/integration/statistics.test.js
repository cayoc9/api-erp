const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../models');
const { mockRedis } = require('../mocks/redis');

jest.mock('../../config/redis', () => mockRedis);

describe('Statistics API Integration', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        // Add test data setup here
    });

    describe('GET /api/statistics', () => {
        it('should return complete statistics data', async () => {
            const response = await request(app)
                .get('/api/statistics')
                .query({
                    startDate: '2024-01-01',
                    endDate: '2024-03-31'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('status', 'success');
            expect(response.body.data).toHaveProperty('summary');
            expect(response.body.data).toHaveProperty('lineChart');
            expect(response.body.data).toHaveProperty('pieChart');
            expect(response.body.data).toHaveProperty('barCharts');
        });

        it('should filter by sector', async () => {
            const response = await request(app)
                .get('/api/statistics')
                .query({
                    startDate: '2024-01-01',
                    endDate: '2024-03-31',
                    sectorId: 1
                });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
        });

        it('should filter by status', async () => {
            const response = await request(app)
                .get('/api/statistics')
                .query({
                    startDate: '2024-01-01',
                    endDate: '2024-03-31',
                    status: 'PENDING'
                });

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
        });

        it('should handle invalid date range', async () => {
            const response = await request(app)
                .get('/api/statistics')
                .query({
                    startDate: 'invalid',
                    endDate: '2024-03-31'
                });

            expect(response.status).toBe(400);
        });

        it('should handle missing required parameters', async () => {
            const response = await request(app)
                .get('/api/statistics')
                .query({
                    startDate: '2024-01-01'
                });

            expect(response.status).toBe(400);
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });
});