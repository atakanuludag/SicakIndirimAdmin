import ILocalStorage from '../interfaces/ILocalStroge';

const LocalStorageTimestamp: number = new Date().getTime();
const CacheVersion: number = 1;

export const setLocalStorage = (lsConstant: ILocalStorage, data: any) => {
    try {
        const ls: any = { data: data, timestamp: LocalStorageTimestamp, CacheVersion: CacheVersion };
        localStorage.setItem(lsConstant.key, JSON.stringify(ls));
    } catch (error) {
        console.log("[LocalStorage] setLocalStorage Err", error);
    }
};

export const removeLocalStorage = (lsConstant: ILocalStorage) => {
    try {
        localStorage.removeItem(lsConstant.key);
    } catch (error) {
        console.log("[LocalStorage] removeLocalStorage Err", error);
    }
};

export const getLocalStorage = (lsConstant: ILocalStorage) => {
    try {

        const ls: any = localStorage.getItem(lsConstant.key);
        if (ls != null) {

            const parseLs = JSON.parse(ls);

            if (CacheVersion > parseLs.CacheVersion || typeof parseLs.CacheVersion === "undefined") {
                console.log("Local Strorage date updating...");
                localStorage.removeItem(lsConstant.key);
                return null;
            }

            if(lsConstant.expired){
                if (LocalStorageTimestamp - parseLs.timestamp > lsConstant.expired * 60 * 60 * 1000) {
                    localStorage.removeItem(lsConstant.key);
                    return null;
                }
            }

            return parseLs ? parseLs.data : null;
        }

        return null;

    } catch (error) {
        console.log("[LocalStorage] getLocalStorage Err", error);
        return null;
    }
};