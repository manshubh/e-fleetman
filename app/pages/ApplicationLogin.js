import React, { Component } from 'react';
import { auth as fireAuth } from 'firebase';
import { auth } from 'firebaseui';
import { css } from 'emotion';
import 'firebaseui/dist/firebaseui.css';
import bgImage from './assets/adventure-calm-clouds.jpg';
import { Button } from '../atoms/Button';

const loginTag = '__logintag__';
const ui = new auth.AuthUI(fireAuth());
const styles = getStyles();
export class ApplicationLogin extends Component {
  loginStarted = false;
  componentDidMount() {
    try {
      if (document.querySelector(`#${loginTag}`) && !this.loginStarted) {
        ui.start(`#${loginTag}`, {
          callbacks: {
            signInSuccessWithAuthResult: (authResult, redirectUrl) => {
              return true;
            },
            uiShown: () => {

            }
          },
          signInFlow: 'popup',
          signInSuccessUrl: '/leaderboard',
          signInOptions: [
            fireAuth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
          ],
          credentialHelper: [
            auth.CredentialHelper.NONE
          ]
        });
        this.loginStarted = true;
      }
    }
    catch (e) { }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div id={loginTag} className={styles.loginWrapper}></div>
      </div>
    );
  }
}

function getStyles() {
  return {
    wrapper: css(`
      background-image: url(${bgImage});
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
