module.exports = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
    },
    maxRetriesPerRequest: 3
};