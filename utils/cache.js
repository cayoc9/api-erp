const Redis = require('ioredis');
const config = require('../config/redis');

class CacheManager {
    constructor() {
        this.redis = new Redis(config);
        this.defaultTTL = 3600; // 1 hour
    }

    async get(key) {
        try {
            const value = await this.redis.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }

    async set(key, value, ttl = this.defaultTTL) {
        try {
            await this.redis.setex(key, ttl, JSON.stringify(value));
        } catch (error) {
            console.error('Cache set error:', error);
        }
    }

    async invalidate(pattern) {
        try {
            const keys = await this.redis.keys(pattern);
            if (keys.length > 0) {
                await this.redis.del(keys);
            }
        } catch (error) {
            console.error('Cache invalidation error:', error);
        }
    }

    generateKey(type, filters) {
        const filterHash = JSON.stringify(filters);
        return `stats:${type}:${Buffer.from(filterHash).toString('base64')}`;
    }
}

module.exports = new CacheManager();