/*import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode'*/

import { IAuth } from '../../interfaces/IAuth';

import { ActionTypes, UserAuthSuccessAction, UserAuthFailureAction } from "./authTypes";

export const SuccessAction = (auth: IAuth): UserAuthSuccessAction => ({
    type: ActionTypes.USER_AUTH_SUCCESS,
    payload: auth
});

export const FailureAction = (): UserAuthFailureAction => ({
    type: ActionTypes.USER_AUTH_FAILURE,
    payload: 1
});