import { ActionTypes, IAuthState, AuthActions } from "./authTypes";
import IAuth from "../../interfaces/IAuth";
import { setLocalStorage, removeLocalStorage } from '../../utils/LocalStorage';
import { AUTH_LOCAL_STORAGE } from '../../core/Constants';

//import { Action } from "redux";
//import { act } from "react-dom/test-utils";

//Mutable & immutable
//Reducers içinde bir apiye bağlanılmaz veya veritabanı işlemleri yapılmaz.
//Reducers'in amacı state bilgisini döndürmektir.


const initialState: IAuthState = {
    loggedIn: false,
    user: {} as IAuth,
    token: null
};

const reducer = (
    state: IAuthState = initialState,
    action: AuthActions
): IAuthState => {
    switch (action.type) {
        case ActionTypes.USER_AUTH_SUCCESS:
            setLocalStorage(AUTH_LOCAL_STORAGE, action.payload);
            return { 
                ...state,
                loggedIn: true,
                token: action.payload.access_token,
                user: action.payload
            };
        case ActionTypes.USER_AUTH_FAILURE:
            removeLocalStorage(AUTH_LOCAL_STORAGE);
            return { 
                ...state, 
                loggedIn: false, 
                token: null,
                user: {} as IAuth
            };
        case ActionTypes.USER_LOGOUT:
            removeLocalStorage(AUTH_LOCAL_STORAGE);
            return { 
                ...state, 
                loggedIn: false, 
                token: null,
                user: {} as IAuth
            };
        default:
            return state;
    }
};

export default reducer;