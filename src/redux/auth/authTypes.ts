import { Action } from "redux";
import IAuth from "../../interfaces/IAuth";

export interface IAuthState {
    loggedIn: boolean;
    user: IAuth;
    token: string | null;
}

export enum ActionTypes {
    USER_AUTH_SUCCESS = "USER_AUTH_SUCCESS",
    USER_AUTH_FAILURE = "USER_AUTH_FAILURE",
    USER_LOGOUT = "USER_LOGOUT"
}

export interface IUserAuthSuccessAction extends Action {
    type: ActionTypes.USER_AUTH_SUCCESS;
    payload: IAuth;
}

export interface IUserAuthFailureAction extends Action {
    type: ActionTypes.USER_AUTH_FAILURE;
}

export interface IUserLogoutAction extends Action {
    type: ActionTypes.USER_LOGOUT;
}

export type AuthActions = IUserAuthSuccessAction | IUserAuthFailureAction | IUserLogoutAction;