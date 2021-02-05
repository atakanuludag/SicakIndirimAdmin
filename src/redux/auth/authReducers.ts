import { ActionTypes, IAuthState, AuthActions } from "./authTypes";
import IAuth from "../../interfaces/IAuth";

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
            return { 
                ...state,
                loggedIn: true,
                token: action.payload.access_token,
                user: action.payload
            };
        case ActionTypes.USER_AUTH_FAILURE:
            return { 
                ...state, 
                loggedIn: false, 
                token: null,
                user: {} as IAuth
            };
        case ActionTypes.USER_LOGOUT:
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