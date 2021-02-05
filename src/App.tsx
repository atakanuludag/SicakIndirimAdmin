import React, { useEffect } from 'react';
import Theme from './Theme';
import Loading from './components/shared/Loading';
import Router from './Router';

const App: React.FC = () => {
  return (
    <Theme>
      <Router />
    </Theme>
  );
}

export default App;
