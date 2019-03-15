import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApplicationHome } from '../pages/ApplicationHome';
import { ApplicationLogin } from '../pages/ApplicationLogin';
import QuizContainer from '../components/QuizContainer';

export const ApplicationRouter = () => (
  <Switch>
    <Route path="/login" component={ApplicationLogin} />
    <Route path="/leaderboard" component={ApplicationHome} />
    <Route path="/quiz" component={QuizContainer} />
    <Redirect from="/" to="/leaderboard" />
  </Switch>
);
