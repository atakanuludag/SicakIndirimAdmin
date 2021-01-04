import ILocalStorage from '../interfaces/ILocalStroge'

export const API_URL = 'http://localhost:5050/test';

export const AUTH_LOCAL_STORAGE: ILocalStorage = {
    key: "AUTH",
    expired: 24
};

export const THEME_SETTINGS_LOCAL_STORAGE = {
    DARK_MODE_KEY: {
        key: "DARK_MODE"
    } as ILocalStorage,
    MENU_OPEN_KEY: {
        key: "MENU_OPEN"
    } as ILocalStorage
}
