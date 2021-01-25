import { Action } from "redux";
import IAuth from "../../interfaces/IAuth";

export interface AuthState {
    loggedIn: boolean;
    user: IAuth;
    token: string | null;
}

export enum ActionTypes {
    USER_AUTH_SUCCESS = "USER_AUTH_SUCCESS",
    USER_AUTH_FAILURE = "USER_AUTH_FAILURE",
    USER_LOGOUT = "USER_LOGOUT"
}

export interface UserAuthSuccessAction extends Action {
    type: ActionTypes.USER_AUTH_SUCCESS;
    payload: IAuth;
}

export interface UserAuthFailureAction extends Action {
    type: ActionTypes.USER_AUTH_FAILURE;
}

export interface UserLogoutAction extends Action {
    type: ActionTypes.USER_LOGOUT;
}

export type AuthActions = UserAuthSuccessAction | UserAuthFailureAction | UserLogoutAction;