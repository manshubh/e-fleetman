import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApplicationHome } from '../pages/ApplicationHome';
import { ApplicationLogin } from '../pages/ApplicationLogin';

export const ApplicationRouter = () => (
  <Switch>
    <Route path="/login" component={ApplicationLogin} />
    <Route path="/home" component={ApplicationHome} />
    <Redirect from="/" to="/login" />
  </Switch>
);
