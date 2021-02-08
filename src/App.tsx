import React from 'react';
import Theme from './Theme';
import Router from './Router';
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Theme>
      <BrowserRouter><Router /></BrowserRouter>
    </Theme>
  );
}

export default App;
