import { auth as fireAuth } from 'firebase';
import { auth } from 'firebaseui';

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
                return true;
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