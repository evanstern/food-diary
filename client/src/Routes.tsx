import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import { Home } from './pages/Home';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route to="/" component={Home} />
      <Redirect to="/" />
    </Switch>
  );
};
