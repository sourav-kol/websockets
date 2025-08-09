import { storageType } from "@/types";
import { IUseStorage } from "@/interfaces/IUseSession";

export const useStorage = (): IUseStorage => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

    const getStoreItem = (key: string, type: storageType = 'localStorage'): string => {
        const storageType: storageType = type;
        return isBrowser ? window[storageType][key] : '';
    };

    const setStoreItem = (key: string, value: string, type: storageType = 'localStorage'): void => {
        const storageType: storageType = type;
        if (isBrowser) {
            window[storageType][key] = value;
        }
    }

    return {
        getStoreItem,
        setStoreItem
    };
};
