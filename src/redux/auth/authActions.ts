import IAuth from '../../interfaces/IAuth';

import { ActionTypes, IUserAuthSuccessAction, IUserAuthFailureAction, IUserLogoutAction } from "./authTypes";

export const SuccessAction = (auth: IAuth): IUserAuthSuccessAction => ({
    type: ActionTypes.USER_AUTH_SUCCESS,
    payload: auth
});

export const FailureAction = (): IUserAuthFailureAction => ({
    type: ActionTypes.USER_AUTH_FAILURE
});

export const LogoutAction = (): IUserLogoutAction => ({
    type: ActionTypes.USER_LOGOUT
});