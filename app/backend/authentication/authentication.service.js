import { auth as fireAuth } from 'firebase';
import { auth } from 'firebaseui';
import store from '../../redux/store';
import { authenticationActions } from '../../redux/modules/authentication/authentication.actions';

const ui = new auth.AuthUI(fireAuth());

class AuthenticationService {
  constructor() { }

  beginLogin(domTag) {
    return new Promise((resolve, reject) => {
      if (domTag) {
        try {
          ui.start(`#${domTag}`, {
            callbacks: {
              signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                store.dispatch(authenticationActions.userLoggedIn(authResult, redirectUrl));
                return false;
              },
              uiShown: () => {
                resolve();
              }
            },
            signInFlow: 'popup',
            signInSuccessUrl: '/home/dashboard',
            signInOptions: [
              fireAuth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD,
            ],
            credentialHelper: [
              auth.CredentialHelper.NONE
            ]
          });
        } catch (e) {
          reject(e);
        }
      }
    });
  }

  isLoggedin() { }

  logout() { }
}

export const authenticationService = new AuthenticationService();
