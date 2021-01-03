import { ActionTypes, ToogleMenuAction, DarkModeAction } from "./themeTypes";

export const ThemeToggleMenuAction = (): ToogleMenuAction => ({
    type: ActionTypes.TOGGLE_MENU
});

export const ThemeDarkModeAction = (): DarkModeAction => ({
    type: ActionTypes.DARK_MODE
});
