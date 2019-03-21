/** load libs */
import { createStore, applyMiddleware, bindActionCreators, combineReducers } from 'redux';
import { createLogic, createLogicMiddleware } from 'redux-logic';
/** load utils */
import { createReducer } from '../utils/redux/createReducer';
/** load services */
import { firebaseConnection } from '../utils/firebase/FirebaseConnector';
import { driverService } from '../backend/drivers/DriverService';
import { authenticationService } from '../backend/authentication/authentication.service';
/** load reducers */
/** drivers */
import { driverActions } from './modules/drivers/driver.actions';
import { driversReducer } from './modules/drivers/driver.reducer';
import { driversLogic } from './modules/drivers/driver.logic';
/** authentication */
import { authenticationReducer } from './modules/authentication/authentication.reducer';
import { authenticationActions } from './modules/authentication/authentication.actions';
import { authenticationLogic } from './modules/authentication/authentication.logic';
import { authentication } from './modules/authentication/authentication.initalState';

const intialState = {
  authentication,
  application: {
    firebase: firebaseConnection.getInstance()
  }
};

/** combine reducers */
const appReducer = combineReducers({
  drivers: createReducer(driversReducer),
  authentication: createReducer(authenticationReducer),
  application: createReducer({})
});

/** create root reducer */
const rootReducer = (state = {}, action) => {
  console.info(`ACTION : [${action.type}]`, state);
  if (action.type === 'USER_LOGOUT') {
    state = {
      ...state,
      drivers: {}
    };
  }
  return appReducer(state, action)
};

/** combine middlewares */
const rootLogic = [
  ...driversLogic,
  ...authenticationLogic
];

/** add dependecies to middlewares */
const logicDeps = {
  actions: { driverActions, authenticationActions },
  services: { driverService, authenticationService }
};

/** create middleware from redux-logic */
const logicMiddleWares = applyMiddleware(
  createLogicMiddleware(
    rootLogic.map(logic =>
      createLogic(
        logic
      )
    ),
    logicDeps
  )
);

/**
 *
 * @param {*} dispatch 
 */
export function mapActionCreators(dispatch) {
  return {
    driverActions: bindActionCreators(driverActions, dispatch),
    authenticationActions: bindActionCreators(authenticationActions, dispatch),
    logoutUser: () => dispatch({ type: 'USER_LOGOUT' })
  };
}

/**
 *
 * @param {*} state
 */
export function mapStateToProps(state) {
  return {
    drivers: state.drivers,
    authentication: state.authentication
  };
}

const store = createStore(rootReducer, intialState, logicMiddleWares);

export default store;
