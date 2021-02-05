import { Action } from "redux";

export interface IThemeState {
    menuOpen: boolean;
    darkMode: boolean;
    loading: boolean;
    routerTitle: string;
}

export enum ActionTypes {
    TOGGLE_MENU = "TOGGLE_SIDE_MENU",
    DARK_MODE = "DARK_MODE",
    LOADING = "LOADING",
    ROUTER_TITLE = "ROUTER_TITLE"
}

export interface IToogleMenuAction extends Action {
    type: ActionTypes.TOGGLE_MENU;
}
export interface IDarkModeAction extends Action {
    type: ActionTypes.DARK_MODE;
}
export interface ILoadingAction extends Action {
    type: ActionTypes.LOADING;
    payload: boolean;
}
export interface IRouterTitleAction extends Action {
    type: ActionTypes.ROUTER_TITLE;
    payload: string;
}


export type ThemeActions = IToogleMenuAction | IDarkModeAction | ILoadingAction | IRouterTitleAction;