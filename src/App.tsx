import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PrivateRoute from './core/PrivateRoute';

//React Material Theme
import Theme from './Theme';

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
import { axiosInterceptor } from './core/Axios';


const App: React.FC = () => {


  const dispatch = useDispatch();
  const lsAuth = getLocalStorage(AUTH_LOCAL_STORAGE);

  if (lsAuth !== null) dispatch(SuccessAction(lsAuth));
  const loggedIn = useSelector((state: AppState) => state.authReducers.loggedIn);
  const token = useSelector((state: AppState) => state.authReducers.token);
  if (token != null) axiosInterceptor(token);

  console.log("Local Stroge Auth: ", lsAuth);
  console.log("Redux Token: ", token);

  
  return (
    <Theme>
      <Router>
        <Route path="/" exact render={() => {
          if (!loggedIn) return <Redirect to="/login" />
          else return <Redirect to="/dashboard" />
        }} />
        <Route path="/login" name="Login"  component={Login} />
        <PrivateRoute path="/dashboard" name="Dashboard" component={Dashboard} />
        <PrivateRoute path="/categories" name="Categories" component={Category} />
      </Router>
    </Theme>

  );
}

export default App;
