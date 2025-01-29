const { AppError } = require('../utils/errorHandler');

const paginate = (defaultLimit = 100, maxLimit = 1000) => {
    return (req, res, next) => {
        const cursor = req.query.cursor;
        let limit = parseInt(req.query.limit) || defaultLimit;

        // Validate limit
        if (limit > maxLimit) {
            limit = maxLimit;
        }

        req.pagination = {
            limit,
            cursor: cursor ? new Date(cursor) : new Date(),
            sortField: req.query.sortField || 'createdAt',
            sortOrder: req.query.sortOrder?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
        };

        next();
    };
};

module.exports = paginate;