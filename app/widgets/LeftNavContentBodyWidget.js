import React from 'react';
import { LeftNavWidget } from './LeftNavWidget';
import { css } from 'emotion';
import { Switch, Route, Redirect } from 'react-router-dom';
import { DriversPage } from '../pages/application/DriversPage';

const leftNavStyles = {
  container: css(`
    display: flex;
    flex-direction: row;
    padding: 0 4em;
    div {
      display: flex;
    }
  `),
  leftNav: css(`
    width: 15em;
  `),
  content: css(`
    flex: 1;
    flex-direction: column;
    padding: 0 0.4em;
  `)
}

export const LeftNavContentBodyWidget = ({ }) => (
  <div className={leftNavStyles.container}>
    <div className={leftNavStyles.leftNav}>
      <LeftNavWidget />
    </div>
    <div className={leftNavStyles.content}>
      <Switch>
        <Route path="/home/dashboard">
          <h1>Dashboard</h1>
        </Route>
        <Route path="/home/drivers">
          <DriversPage />
        </Route>
        <Route path="/home/vehicles">
          <h1>Vehicles</h1>
        </Route>
        <Route path="/home/devices">
          <h1>Devices</h1>
        </Route>
        <Route path="/home/locations">
          <h1>Locations</h1>
        </Route>
        <Route path="/home/routes">
          <h1>Routes</h1>
        </Route>
        <Route path="/home/saved-maps">
          <h1>Saved Maps</h1>
        </Route>
        <Redirect from="/home" to="/home/dashboard" />
      </Switch>
    </div>
  </div>
);
