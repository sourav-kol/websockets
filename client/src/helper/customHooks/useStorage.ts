import { storageType } from "@/types";
import { IUseStorage } from "@/interfaces/IUseSession";

export const useStorage = (): IUseStorage => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

    const getStoreItem = (key: string, type?: storageType): string => {
        const storageType: storageType = type || 'sessionStorage';
        return isBrowser ? window[storageType][key] : '';
    };

    const setStoreItem = (key: string, value: string, type?: storageType): void => {
        const storageType: storageType = type || 'sessionStorage';
        if (isBrowser) {
            window[storageType][key] = value;
        }
    }

    return {
        getStoreItem,
        setStoreItem
    };
};
