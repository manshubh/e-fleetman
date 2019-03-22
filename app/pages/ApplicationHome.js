import React, { Component } from "react";
import { HeaderWidget } from "../widgets/HeaderWidget";
import { auth } from 'firebase';
import { Switch, Route, Redirect } from "react-router-dom";
import QuizContainer from "../components/QuizContainer";
import Leaderboard from './LeaderBoard';

export class ApplicationHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HeaderWidget />
        <Switch>
          <Route path="/home/leaderboard" component={Leaderboard} />
          <Route path="/home/quiz" component={QuizContainer} />
          <Route path="/home/guidelines">
            <h1>Yaha Guidelines</h1>
          </Route>
          <Redirect from="/" to="/home/leaderboard" />
        </Switch>
      </div>
    );
  }
}