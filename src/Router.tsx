import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory, useLocation } from "react-router-dom";
import PrivateRoute from './layouts/PrivateRoute';

//Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Category from './components/Category';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import AppState from "./redux/appState";
import { getLocalStorage } from './utils/LocalStorage';
import { AUTH_LOCAL_STORAGE } from './core/Constants';
import { SuccessAction } from './redux/auth/authActions';
import { axiosTokenInterceptor, axiosRequestLoading } from './core/Axios';

const RouterComponent: React.FC = () => {

    const dispatch = useDispatch();
    const lsAuth = getLocalStorage(AUTH_LOCAL_STORAGE);

    axiosRequestLoading(dispatch);
    
    if (lsAuth !== null) dispatch(SuccessAction(lsAuth));
    const loggedIn = useSelector((state: AppState) => state.authReducers.loggedIn);
    const token = useSelector((state: AppState) => state.authReducers.token);
    if (token != null) axiosTokenInterceptor(token);

    console.log("Local Stroge Auth: ", lsAuth);
    console.log("Redux Token: ", token);

    return (
        <Router>
            <Route path="/" exact render={() => {
                if (!loggedIn) return <Redirect to="/login" />
                else return <Redirect to="/dashboard" />
            }} />
            <Route path="/login"  component={Login} />

            <PrivateRoute path="/dashboard" component={Dashboard} title="Dashboard" />
            <PrivateRoute path="/categories" component={Category} title="Kategoriler" />
            
            
        </Router>
    );
}

export default RouterComponent;