const { validateFilters } = require('../../middlewares/statisticsValidation');

describe('Statistics Validation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('validateFilters', () => {
        it('should validate valid date range', () => {
            req.query = {
                startDate: '2024-01-01',
                endDate: '2024-03-31'
            };

            validateFilters(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled();
        });

        it('should reject invalid date format', () => {
            req.query = {
                startDate: 'invalid-date',
                endDate: '2024-03-31'
            };

            validateFilters(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                error: expect.any(String)
            }));
        });

        it('should reject end date before start date', () => {
            req.query = {
                startDate: '2024-03-31',
                endDate: '2024-01-01'
            };

            validateFilters(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should validate optional sectorId', () => {
            req.query = {
                startDate: '2024-01-01',
                endDate: '2024-03-31',
                sectorId: '1'
            };

            validateFilters(req, res, next);

            expect(next).toHaveBeenCalled();
        });

        it('should reject invalid sectorId format', () => {
            req.query = {
                startDate: '2024-01-01',
                endDate: '2024-03-31',
                sectorId: 'invalid'
            };

            validateFilters(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        it('should validate optional status', () => {
            req.query = {
                startDate: '2024-01-01',
                endDate: '2024-03-31',
                status: 'PENDING'
            };

            validateFilters(req, res, next);

            expect(next).toHaveBeenCalled();
        });

        it('should reject invalid status value', () => {
            req.query = {
                startDate: '2024-01-01',
                endDate: '2024-03-31',
                status: 'INVALID'
            };

            validateFilters(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
        });
    });
});