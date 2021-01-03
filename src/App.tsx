import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from './core/PrivateRoute';

//Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Categories from './components/Categories';

/*
import { useSelector, useDispatch } from 'react-redux';
import AppState from "./redux/appState";
import { SuccessAction } from './redux/auth/authActions';*/

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { trTR } from '@material-ui/core/locale';

//Redux
import { Provider, useDispatch, useSelector } from 'react-redux';
import redux from "./redux";
import AppState from "./redux/appState";
import { getLocalStorage } from './utils/LocalStorage';
import { AUTH_LOCAL_STORAGE } from './core/Constants';
import { SuccessAction, FailureAction } from './redux/auth/authActions';
import { axiosInterceptor } from './core/Axios';


const App: React.FC = () => {

  
  const dispatch = useDispatch();
  const lsAuth = getLocalStorage(AUTH_LOCAL_STORAGE);

  if(lsAuth !== null)  dispatch(SuccessAction(lsAuth));
  const loggedIn = useSelector((state: AppState) => state.authReducers.loggedIn);
  const token = useSelector((state: AppState) => state.authReducers.token);
  if(token != null) axiosInterceptor(token);

  console.log("Local Stroge Auth: ", lsAuth);
  console.log("Redux Token: ", token);

  /*if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // dark mode
  }*/

  const darkMode = useSelector((state: AppState) => state.themeReducers.darkMode);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Cabin',
        'sans-serif'
      ].join(','),
    },
  }, trTR);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
        <Router>
          <Route path="/" exact render={() => {
            if (!loggedIn) return <Redirect to="/login" />
            else return <Redirect to="/dashboard" />
          }} />

          <Route path="/login" component={Login} />
          
        
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/categories" component={Categories} />
        

          
        </Router>
     
    </ThemeProvider>
  );
}

export default App;
