import {
  LOGIN_UI_STARTED,
  LOGIN_UI_FAILED,
  LOGOUT_USER_FINISHED,
  USER_LOGGED_IN
} from "./authentication.actions";

export const authenticationReducer = {
  [LOGIN_UI_STARTED](state = {}) {
    return {
      ...state,
      loginStarted: true,
      loginFailed: false
    };
  },
  [LOGIN_UI_FAILED](state = {}) {
    return {
      ...state,
      loginStarted: true,
      loginFailed: true
    };
  },
  [LOGOUT_USER_FINISHED](state = {}) {
    return {
      ...state,
      logoutFinished: true
    };
  },
  [USER_LOGGED_IN](state = {}, action) {
    const { user = {}, redirectUrl } = action.payload;
    return {
      ...state,
      loginStarted: false,
      loginFailed: false,
      user,
      redirectUrl
    };
  }
};
