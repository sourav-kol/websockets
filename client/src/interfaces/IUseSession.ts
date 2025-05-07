import { storageType } from "@/types";

export interface IUseStorage {
    getStoreItem: (key: string, type?: storageType) => string;
    setStoreItem: (key: string, value: string, type?: storageType) => void;
};