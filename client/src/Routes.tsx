import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { PrivateRoute } from 'components/PrivateRoute';
import { Callback } from 'pages/Callback';
import { FoodDiary } from 'pages/FoodDiary';
import { AddItem } from 'pages/AddItem';
import { Item } from 'pages/Item';
import { Home } from 'pages/Home';

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/callback" component={Callback} />
      <PrivateRoute path="/food-diary/add/:date" component={AddItem} />
      <PrivateRoute path="/food-diary/:date" component={FoodDiary} />
      <PrivateRoute path="/food-diary/" component={FoodDiary} />
      <PrivateRoute path="/item/:id" component={Item} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};
