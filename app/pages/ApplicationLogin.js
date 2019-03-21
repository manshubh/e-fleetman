import React, { Component } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import 'firebaseui/dist/firebaseui.css';
import bgImage from './assets/adventure-calm-clouds.jpg';
import { mapStateToProps, mapActionCreators } from '../redux/store';

const styles = getStyles();
class ApplicationLoginComponent extends Component {
  loginStarted = false;
  componentDidMount() {
    const { authenticationActions } = this.props;
    authenticationActions.initLoginUI();
  }

  componentWillReceiveProps(newProps) {
    console.info(newProps);
  }

  /** disable component update since firebase will do all the DOM manipluations here */
  shouldComponentUpdate = () => false;

  render() {
    const { authentication: { loginTag } } = this.props;
    return (
      <div className={styles.wrapper}>
        <div id={loginTag} className={styles.loginWrapper}></div>
      </div>
    );
  }
}

export const ApplicationLogin = connect(mapStateToProps, mapActionCreators)(ApplicationLoginComponent);

function getStyles() {
  return {
    wrapper: css(`
      background-image: url(/${bgImage});
      width: 100%;
      height: 100%;
      position: fixed;
      background-size: cover;
    `),
    loginWrapper: css(`
      position: fixed;
      height: 100%;
      width: 450px;
      right: 0;
      .firebaseui-container{
        height: 100%;
        width: 100%;
        display: flex;
        max-width: 100%;
        background-color: rgba(255,255,255,.95);
        form {
          margin-top: auto;
          margin-bottom: auto;
        }
      }
    `)
  }
}
