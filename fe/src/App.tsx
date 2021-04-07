import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import TimeLinePage from './page/TimeLinePage';

function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/timeline" component={TimeLinePage} />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
