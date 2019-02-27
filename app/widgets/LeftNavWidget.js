import React from 'react';
import { css } from 'emotion';
import { lighten } from 'polished';
import { NavLink } from 'react-router-dom';
import { factors, flavours } from '../constants/styleTokens';

const leftNavStyels = {
  container: css(`
    display: flex;
    flex-direction: column;
    section {
      h3 {
        padding: 0.5em 0.5em;
        margin: 1em 0 0.8em 0;
      }
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        margin-bottom: 0.3em;
        a {
          display: flex;
          flex: 1;
          padding: 0.5em 0.5em;
          text-decoration: none;
          color: ${flavours.black};
          &:visited {
            color: ${flavours.black};
          }
          &:hover {
            background-color: ${lighten(factors.lightenNav, flavours.default)};
            color: ${flavours.default};
            border-radius: 0.2em 1em 1em 0.2em;
          }
          &.active {
            background-color: ${flavours.default};
            color: ${flavours.white};
            border-radius: 0.2em 1em 1em 0.2em;
          }
        }
      }
    }
  `)
}

export const LeftNavWidget = () => (
  <div className={leftNavStyels.container}>
    <section>
      <h3>My Fleet</h3>
      <ul>
        <li>
          <NavLink to="/home/dashboard" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/drivers" activeClassName="active">
            Drivers
          </NavLink>
        </li>
      </ul>
    </section>
    <section>
      <h3>Device Manager</h3>
      <ul>
        <li>
          <NavLink to="/home/vehicles" activeClassName="active">
            Vehicles
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/devices" activeClassName="active">
            Devices
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/locations" activeClassName="active">
            Locations
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/routes" activeClassName="active">
            Routes
          </NavLink>
        </li>
        <li>
          <NavLink to="/home/saved-maps" activeClassName="active">
            Saved Maps
          </NavLink>
        </li>
      </ul>
    </section>
  </div>
);
