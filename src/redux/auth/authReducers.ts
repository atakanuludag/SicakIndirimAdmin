import { ActionTypes, AuthState, AuthActions } from "./authTypes";
//import { Action } from "redux";
import { act } from "react-dom/test-utils";

//Mutable & immutable
//Reducers içinde bir apiye bağlanılmaz veya veritabanı işlemleri yapılmaz.
//Reducers'in amacı state bilgisini döndürmektir.


const initialState: AuthState = {
    loggedIn: false,
    user: {},
    token: null
};

const reducer = (
    state: AuthState = initialState,
    action: AuthActions
): AuthState => {
    switch (action.type) {
        case ActionTypes.USER_AUTH_SUCCESS:
            return { 
                ...state,
                loggedIn: true,
                token: action.payload
            };
        case ActionTypes.USER_AUTH_FAILURE:
            return { ...state, loggedIn: false, token: null };
        default:
            return state;
    }
};

export default reducer;