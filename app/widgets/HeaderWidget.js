import React, { Component } from 'react';
import { css } from 'emotion';
import { lighten } from 'polished';
import { auth } from 'firebase';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { flavours, factors } from '../constants/styleTokens';
import { mapStateToProps, mapActionCreators } from '../redux/store';

const headerStyles = {
  wrapper: css(`
    display: flex;
    flex-direction: row;
    padding: 0 4em;
    margin-bottom: 2em;
    height: 4.3em;
    background-color: ${lighten(0.99, flavours.black)};
    div {
      display: flex;
    }
  `),
  brand: css(`
    width: 15em;
    box-sizing: border-box;
    padding: 1.5em 0.4em;
  `),
  breadCrumb: css(`
    width: 15em;
    padding: 1.5em 0.4em;
  `),
  navigation: css(`
    flex:1;
    justify-content: flex-end;
    ul {
      list-style: none;
      margin: 0;
      display: flex;
      flex-direction: row;
      li {
        display: flex;
        a {
          padding: 1.5em 1em;
          cursor: pointer;
          margin-left: 0.1em;
          box-sizing: content-box;
          text-decoration: none;
          color: ${flavours.black};
          &:visited {
            color: ${flavours.black};
          }
          &:focus {
            outline: 2px solid ${flavours.outline};
          }
          &:hover, &.active {
            color: ${flavours.default};
          }
          &.active {
            background: ${lighten(factors.lightenNav, flavours.default)};
            border-bottom: 0.1em solid ${flavours.default};
          }
        }
      }
    }
  `),
  profile: css(`
    width: 10em;
    justify-content: space-around;
    a {
      padding: 1.5em 1em;
    }
  `),
  logout: css(`
    justify-content: flex-end;
    a {
      padding: 1.5em 1em;
    }
  `)
}

class Header extends Component {

  logout = async () => {
    try {
      await auth().signOut();
      this.props.logoutUser();
      this.props.history.push('/login');
    } catch (e) {
      console.warn('err' + e);
    }
  }

  render() {
    return (
      <div className={headerStyles.wrapper}>
        <div className={headerStyles.brand}>
          <span>
            e-fleetman
        </span>
        </div>
        <div className={headerStyles.breadCrumb}>
          <span>
            Driver &gt; <span>Doe, John</span>
          </span>
        </div>
        <div className={headerStyles.navigation}>
          <ul>
            <li>
              <NavLink to={'/home'} activeClassName={'active'}>Dashboard</NavLink>
            </li>
            <li>
              <a>Reports</a>
            </li>
            <li>
              <a>Admin</a>
            </li>
          </ul>
        </div>
        <div className={headerStyles.profile}>
          <a>
            Saini, Aman
          </a>
        </div>
        <div className={headerStyles.logout}>
          <a onClick={this.logout}>
            Logout
          </a>
        </div>
      </div>
    );
  }
};


export const HeaderWidget = connect(mapStateToProps, mapActionCreators)(withRouter(Header));
