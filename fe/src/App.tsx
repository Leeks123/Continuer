import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import TimeLinePage from './page/TimeLinePage';

import Auth from './hoc/auth';
import { useAppSelector } from './hooks/redux';

function App() {
  
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Auth(LandingPage,null)} />
      <Route path="/timeline" component={Auth(TimeLinePage,true)} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
