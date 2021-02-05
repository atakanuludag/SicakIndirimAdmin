import React, { useEffect } from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import Layout from '.'
import { useDispatch, useSelector } from 'react-redux';
import AppState from "../redux/appState";
import { RouterTitleAction } from '../redux/theme/themeActions';

interface IProps extends RouteProps {
    title: string;
    component: React.ComponentType<any>
}

const PrivateRoute = (props: IProps) => {

    const { title, component: Component, ...rest } = props;
    const dispatch = useDispatch();
    const loggedIn: boolean = useSelector((state: AppState) => state.authReducers.loggedIn);
    const routerTitle = () => dispatch(RouterTitleAction(title));
    
    return (
        <Route {...rest} render={props => {
            routerTitle();
            return !loggedIn ?
                <Redirect to="/login" />
                : <Layout><Component {...props} /></Layout>
        }} />

    );
}
export default PrivateRoute;