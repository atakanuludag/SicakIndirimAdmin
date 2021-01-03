import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

import authReducers from './auth/authReducers';
import themeReducers from './theme/themeReducers';
import InitialState from './initialState'

//Store'u state veri tabanı gibi düşünebiliriz. State yönetimi
//Combine bir araya getirmek demek. Birleştirmek demek.
//Tüm Stateleri birleştirir ve istediğimiz componente kullanabiliriz.

export const reducer = combineReducers<InitialState>({
    authReducers,
    themeReducers
});

const configureStore = (initialState?: InitialState) =>
    createStore(
        reducer,
        initialState,
        applyMiddleware(logger)
    );

const store = configureStore();

export default store;