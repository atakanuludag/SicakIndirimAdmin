import { Action } from "redux";

export interface ThemeState {
    menuOpen: boolean;
    darkMode: boolean;
    loading: boolean;
}

export enum ActionTypes {
    TOGGLE_MENU = "TOGGLE_SIDE_MENU",
    DARK_MODE = "DARK_MODE",
    LOADING = "LOADING"
}

export interface ToogleMenuAction extends Action {
    type: ActionTypes.TOGGLE_MENU;
}
export interface DarkModeAction extends Action {
    type: ActionTypes.DARK_MODE;
}
export interface LoadingAction extends Action {
    type: ActionTypes.LOADING;
    payload: boolean;
}


export type ThemeActions = ToogleMenuAction | DarkModeAction | LoadingAction;