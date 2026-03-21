import { CacheValue } from '../types'

class ServerStore {
    public cache: Map<string, CacheValue>;
    constructor() {
        this.cache = new Map();
    }

    set(key: string, value: CacheValue) {
        this.cache.set(key, value);
    }

    get(key: string): CacheValue | undefined {
        return this.cache.get(key);
    }
}

// We export a single instance of the class
export const serverStore = new ServerStore();