import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";

import AuthService from '../services/AuthService';
import Alerts from '../utils/Alerts';
import { APP_URL } from '../core/Constants';

import { useDispatch, useSelector } from 'react-redux';
import { SuccessAction } from '../redux/auth/authActions';
import AppState from '../redux/appState';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login: React.FC = () => {

  const history = useHistory();
  const loggedIn = useSelector((state: AppState) => state.authReducers.loggedIn);
  if(loggedIn) history.push('/dashboard');

  const service = new AuthService();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [loginData, setloginData] = React.useState({
    username: "atakanuludag",
    password: "123456"
  });
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  }

  //https://stackoverflow.com/questions/41930443/how-to-async-await-redux-thunk-actions

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
   
    const ret = await service.getToken(loginData);
    console.log("[Login] handleFormSubmit()", ret);

    if(ret === null) {
      Alerts.errorAlert("Giriş yapılırken bir hata meydana geldi. Daha sonra tekrar deneyiniz.");
      return;
    }

    if(ret.roles.findIndex((role) => role === 'admin') < 0){
      Alerts.errorAlert("Sadece adminler giriş yapabilir.");
      window.location.href = APP_URL;
      return;
    }
    
    Alerts.successAlert("Başarıyla giriş yapıldı.");
    dispatch(SuccessAction(ret));
    history.push('/dashboard');
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Panel
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit} autoComplete="off" noValidate>
          <TextField
            disabled={loading}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Kullanıcı Adı"
            name="username"
            autoComplete="username"
            autoFocus
            value={loginData.username} onChange={handleInputChange}
          />
          <TextField
            disabled={loading}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre  "
            type="password"
            id="password"
            autoComplete="current-password"
            value={loginData.password} onChange={handleInputChange}
          />
          <FormControlLabel
            disabled={loading}
            control={<Checkbox value="remember" color="primary" />}
            label="Beni hatırla"
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? <CircularProgress size={25} /> : "GİRİŞ"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Login;