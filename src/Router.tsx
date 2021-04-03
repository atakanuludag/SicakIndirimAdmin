import React from 'react';
import { BrowserRouter as Router, Route, Redirect, useHistory } from "react-router-dom";
import PrivateRoute from './layouts/PrivateRoute';
import { useSnackbar } from 'notistack';

//Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CategoryList from './components/CategoryList';
import UserList from './components/UserList';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import AppState from "./redux/appState";
import { getLocalStorage } from './utils/LocalStorage';
import { AUTH_LOCAL_STORAGE } from './core/Constants';
import { SuccessAction } from './redux/auth/authActions';
import { AxiosTokenInterceptor, AxiosInterceptor } from './core/Axios';



const RouterComponent: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const lsAuth = getLocalStorage(AUTH_LOCAL_STORAGE);

    AxiosInterceptor(history, dispatch, enqueueSnackbar);
    
    if (lsAuth !== null) dispatch(SuccessAction(lsAuth));
    const loggedIn = useSelector((state: AppState) => state.authReducers.loggedIn);
    const token = useSelector((state: AppState) => state.authReducers.token);
    if (token != null) AxiosTokenInterceptor(token);

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
            <PrivateRoute path="/categories" component={CategoryList} title="Kategoriler" />
            <PrivateRoute path="/users" component={UserList} title="Kullanıcılar" />
        </Router>
    );
}

export default RouterComponent;
