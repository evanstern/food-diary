import React from 'react';

import { Route, Redirect, Switch } from 'react-router-dom';

import { Home } from 'pages/Home';
import { FoodDiary } from 'pages/FoodDiary';
import { AddItem } from 'pages/AddItem';
import { useAuth0 } from 'utils/auth0';

export const Routes: React.FC = () => {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Home />;
  }

  return (
    <Switch>
      <Route path="/food-diary/add/:date" component={AddItem} />
      <Route path="/food-diary" component={FoodDiary} />
      <Redirect from="/" to="/food-diary" />
    </Switch>
  );
};
