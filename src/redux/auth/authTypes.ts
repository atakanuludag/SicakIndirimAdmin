import { Action } from "redux";

export interface AuthState {
    loggedIn: boolean;
    user?: any;
    token: string | null;
}

export enum ActionTypes {
    USER_AUTH_SUCCESS = "USER_AUTH_SUCCESS",
    USER_AUTH_FAILURE = "USER_AUTH_FAILURE"
}

export interface UserAuthSuccessAction extends Action {
    type: ActionTypes.USER_AUTH_SUCCESS;
    payload: any;
}

export interface UserAuthFailureAction extends Action {
    type: ActionTypes.USER_AUTH_FAILURE;
    payload: any;
}

export type AuthActions = UserAuthSuccessAction | UserAuthFailureAction;