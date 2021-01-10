import { ActionTypes, ToogleMenuAction, DarkModeAction, LoadingAction } from "./themeTypes";

export const ThemeToggleMenuAction = (): ToogleMenuAction => ({
    type: ActionTypes.TOGGLE_MENU
});

export const ThemeDarkModeAction = (): DarkModeAction => ({
    type: ActionTypes.DARK_MODE
});

export const ThemeLoadingAction = (payload: boolean): LoadingAction => ({
    type: ActionTypes.LOADING,
    payload
});
