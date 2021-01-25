import IAuth from '../../interfaces/IAuth';

import { ActionTypes, UserAuthSuccessAction, UserAuthFailureAction, UserLogoutAction } from "./authTypes";

export const SuccessAction = (auth: IAuth): UserAuthSuccessAction => ({
    type: ActionTypes.USER_AUTH_SUCCESS,
    payload: auth
});

export const FailureAction = (): UserAuthFailureAction => ({
    type: ActionTypes.USER_AUTH_FAILURE
});

export const LogoutAction = (): UserLogoutAction => ({
    type: ActionTypes.USER_LOGOUT
});