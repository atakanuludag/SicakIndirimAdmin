import React from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import Layout from '../layouts'
import { useSelector } from 'react-redux';
import AppState from "../redux/appState";

interface IProps extends RouteProps {
    component: React.ComponentType<any>
}

const PrivateRoute = (props: IProps) => {

    const { component: Component, ...rest } = props;
    const loggedIn: boolean = useSelector((state: AppState) => state.authReducers.loggedIn);

    return (
        <Route {...rest} render={props => (
            !loggedIn ?
                <Redirect to="/login" />
                : <Layout><Component {...props} /></Layout>
        )} />

    );
}
export default PrivateRoute;