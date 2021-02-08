import React from 'react';

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { trTR } from '@material-ui/core/locale';

//Redux
import { useSelector } from 'react-redux';
import AppState from "./redux/appState";

interface ITheme {
  children: React.ReactNode;
}

const Theme = (props: ITheme): React.ReactElement => {

  const { children } = props;

  const darkMode = useSelector((state: AppState) => state.themeReducers.darkMode);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        light: '#63a4ff',
        main: '#1976d2',
        dark: '#004ba0',
        contrastText: '#fff',
      },
      secondary: {
        light: '#5472d3',
        main: '#0d47a1',
        dark: '#002171',
        contrastText: '#fff',
      },
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
      {children}
    </ThemeProvider>
  );
}

export default Theme;
