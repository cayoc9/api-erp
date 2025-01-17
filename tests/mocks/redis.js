class MockRedis {
    constructor() {
        this.data = new Map();
    }

    async get(key) {
        return this.data.get(key);
    }

    async set(key, value, options) {
        this.data.set(key, value);
    }

    async del(key) {
        this.data.delete(key);
    }

    clear() {
        this.data.clear();
    }
}

const mockRedis = new MockRedis();

module.exports = { mockRedis };