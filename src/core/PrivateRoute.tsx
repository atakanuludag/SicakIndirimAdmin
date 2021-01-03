import React, { ComponentElement } from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import Layout from '../layouts'
//import AuthGuard from '../utils/AuthGuard';

import { useSelector } from 'react-redux';
import AppState from "../redux/appState";



interface IProps extends RouteProps {
    component: React.ComponentType<any>
}

const PrivateRoute = (props: IProps) => {

    const { component: Component, ...rest } = props;
    //const isAuth: boolean = AuthGuard();

    const loggedIn:boolean = useSelector((state: AppState) => state.authReducers.loggedIn);
//http://localhost:3000/employee
    /*return (
        
            <Route {...rest} render={props => (
                !loggedIn ?
                    <Redirect to="/login" />
                    : <Layout><Component {...props} /></Layout>
            )} />
        
    );*/

    return (
        
        <Route {...rest} render={props => (
            <Layout><Component {...props} /></Layout>
        )} />
    
);


}
export default PrivateRoute;