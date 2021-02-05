import { ActionTypes, IToogleMenuAction, IDarkModeAction, ILoadingAction, IRouterTitleAction } from "./themeTypes";

export const ThemeToggleMenuAction = (): IToogleMenuAction => ({
    type: ActionTypes.TOGGLE_MENU
});

export const ThemeDarkModeAction = (): IDarkModeAction => ({
    type: ActionTypes.DARK_MODE
});

export const ThemeLoadingAction = (payload: boolean): ILoadingAction => ({
    type: ActionTypes.LOADING,
    payload
});

export const RouterTitleAction = (payload: string): IRouterTitleAction => ({
    type: ActionTypes.ROUTER_TITLE,
    payload
});