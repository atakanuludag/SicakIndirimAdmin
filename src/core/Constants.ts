import ILocalStorage from '../interfaces/ILocalStroge';
import { UserRoles } from '../models/Enum';

export const APP_URL = 'https://sicakindirim.com';
export const API_URL = 'http://localhost:5050/api';

export const AUTH_LOCAL_STORAGE: ILocalStorage = {
    key: "AUTH",
    expired: 24
}

export const USER_ROLES: UserRoles[] = [UserRoles.Admin, UserRoles.User];

export const THEME_SETTINGS_LOCAL_STORAGE = {
    DARK_MODE_KEY: {
        key: "DARK_MODE"
    } as ILocalStorage,
    MENU_OPEN_KEY: {
        key: "MENU_OPEN"
    } as ILocalStorage
}
