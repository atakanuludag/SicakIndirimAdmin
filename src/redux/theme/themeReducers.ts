import { ActionTypes, ThemeState, ThemeActions } from "./themeTypes";
import { setLocalStorage, getLocalStorage } from '../../utils/LocalStorage';
import { THEME_SETTINGS_LOCAL_STORAGE } from '../../core/Constants';

const menuOpenLs = getLocalStorage(THEME_SETTINGS_LOCAL_STORAGE.MENU_OPEN_KEY);
const darkModeLs = getLocalStorage(THEME_SETTINGS_LOCAL_STORAGE.DARK_MODE_KEY);


const initialState: ThemeState = {
    menuOpen: menuOpenLs !== null ? menuOpenLs : true,
    darkMode: darkModeLs !== null ? darkModeLs : false,
    loading: true
};

const reducer = (
    state: ThemeState = initialState,
    action: ThemeActions
): ThemeState => {
    switch (action.type) {
        case ActionTypes.TOGGLE_MENU:
            setLocalStorage(THEME_SETTINGS_LOCAL_STORAGE.MENU_OPEN_KEY, !state.menuOpen);
            return {
                ...state,
                menuOpen: !state.menuOpen
            };
        case ActionTypes.DARK_MODE:
            setLocalStorage(THEME_SETTINGS_LOCAL_STORAGE.DARK_MODE_KEY, !state.darkMode);
            return {
                ...state,
                darkMode: !state.darkMode
            };
        case ActionTypes.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};

export default reducer;