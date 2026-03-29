import { CacheValue } from '../types'

class ServerStore {
    public cache: Map<string, Map<string, CacheValue>>;

    constructor() {
        this.cache = new Map();
    }

    set(roomId: string, socketId: string, value: CacheValue) {
        var roomDetails = this.cache.get(roomId);
        
        if (!roomDetails)
            roomDetails = new Map<string, CacheValue>();
    
        roomDetails.set(socketId, value);
        this.cache.set(roomId, roomDetails);

        console.log("updated cache: ", this.cache);
    }

    get(roomId: string, userId: string): CacheValue | null | undefined {
        var cachedData: CacheValue;
        var roomDetails = this.cache.get(roomId);

        if (!roomDetails)
            return null;

        const lastUpdatedBy = Array.from(roomDetails.values())
            .filter(s => s.userId != userId)
            .sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime());

        console.log("last: ", lastUpdatedBy)

        cachedData = lastUpdatedBy[0];

        return cachedData;
    }
}

// We export a single instance of the class
export const serverStore = new ServerStore();