import React from 'react';

import moment from 'moment';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Home } from 'pages/Home';
import { FoodDiary } from 'pages/FoodDiary';
import { AddItem } from 'pages/AddItem';
import { Item } from 'pages/Item';
import { useAuth0 } from 'utils/auth0';

export const Routes: React.FC = () => {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Home />;
  }

  const today = moment().format('YYYY-MM-DD');

  return (
    <Switch>
      <Route path="/food-diary/add/:date" component={AddItem} />
      <Route path="/food-diary/:date" component={FoodDiary} />
      <Route path="/item/:id" component={Item} />
      <Redirect from="/" to={`/food-diary/${today}`} />
    </Switch>
  );
};
