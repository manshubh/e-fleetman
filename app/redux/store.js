import { createStore, applyMiddleware, bindActionCreators, combineReducers } from 'redux';
import { createReducer } from '../utils/redux/createReducer';

import { driverActions, driversLogic, driversReducer } from './modules/drivers/driver.reducer';
import { createLogic, createLogicMiddleware } from 'redux-logic';

const appReducer = combineReducers({
  drivers: createReducer(driversReducer)
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = {
      drivers: {}
    };
  }
  return appReducer(state, action)
}


const rootLogic = [...driversLogic];
const logicDeps = {};

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
    logoutUser: () => dispatch({ type: 'USER_LOGOUT' })
  };
}

export function mapStateToProps(state) {
  return {
    drivers: state.drivers
  };
}

const store = createStore(rootReducer, {}, logicMiddleWares);

export default store;
