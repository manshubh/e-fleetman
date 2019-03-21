export const INIT_LOGIN_UI = 'INIT_LOGIN_UI';
export const LOGIN_UI_STARTED = 'LOGIN_UI_STARTED';
export const LOGIN_UI_FAILED = 'LOGIN_UI_FAILED';
export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_FINISHED = 'LOGOUT_USER_FINISHED';
export const CHECK_EXISTING_LOGIN = 'CHECK_EXISTING_LOGIN';

export const authenticationActions = {
  initLoginUI() {
    return {
      type: INIT_LOGIN_UI
    };
  },
  checkExistingLogin() {
    return {
      type: CHECK_EXISTING_LOGIN
    };
  },
  loginInitFinished() {
    return {
      type: LOGIN_UI_STARTED
    };
  },
  loginInitFailed() {
    return {
      type: LOGIN_UI_FAILED
    };
  },
  logout() {
    return {
      type: LOGOUT_USER
    };
  },
  logoutFinished() {
    return {
      type: LOGOUT_USER_FINISHED
    };
  },
  userLoggedIn(user, redirectUrl) {
    return {
      type: USER_LOGGED_IN,
      payload: { user, redirectUrl }
    };
  }
};
