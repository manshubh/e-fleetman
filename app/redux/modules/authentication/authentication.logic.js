import {
  INIT_LOGIN_UI,
  LOGOUT_USER,
  CHECK_EXISTING_LOGIN
} from './authentication.actions';

export const authenticationLogic = [
  {
    type: INIT_LOGIN_UI,
    cancelType: 'ABORT',
    latest: true,
    process(
      {
        getState,
        actions: { authenticationActions },
        services: { authenticationService }
      },
      dispatch,
      done) {
      try {
        const { authentication: { loginTag } } = getState();
        authenticationService.beginLogin(loginTag);
        dispatch(authenticationActions.checkExistingLogin());
        dispatch(authenticationActions.loginInitFinished());
        done();
      } catch (err) {
        console.error(err);
        dispatch(authenticationActions.loginInitFailed());
        done();
      }
    }
  },
  {
    type: CHECK_EXISTING_LOGIN,
    cancelType: 'ABORT',
    latest: true,
    process(
      {
        getState,
        actions: { authenticationActions },
        services: { authenticationService }
      },
      dispatch,
      done) {
      try {
        const { application: { firebase } } = getState();
        console.warn(firebase);
        done();
      } catch (err) {

        done();
      }
    }
  }
];
