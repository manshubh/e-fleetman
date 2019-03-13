import { driverService } from '../../../backend/drivers/DriverService';

const LOAD_DRIVERS = 'LOAD_DRIVERS';
const SET_DRIVERS = 'SET_DRIVERS';
const SET_DRIVERS_ERROR = 'SET_DRIVERS_ERROR';
const CLEAR_DRIVERS = 'CLEAR_DRIVERS';
const CREATE_DRIVER = 'CREATE_DRIVER';
const REMOVE_DRIVER = 'REMOVE_DRIVER';
const SET_DRIVERS_LOADING = 'SET_DRIVERS_LOADING';
const FINISH_DRIVERS_LOADING = 'FINISH_DRIVERS_LOADING';


export const driverActions = {
  loadDrivers: () => {
    return {
      type: LOAD_DRIVERS
    }
  },
  setDrivers: driversList => {
    return {
      type: SET_DRIVERS,
      payload: { driversList }
    };
  },
  clearDrivers: () => {
    return {
      type: CLEAR_DRIVERS
    };
  },
  setDriversLoading: () => {
    return {
      type: SET_DRIVERS_LOADING
    };
  },
  finishDriversLoading: () => {
    return {
      type: FINISH_DRIVERS_LOADING
    };
  },
  setDriversError: (errorMessage) => {
    return {
      type: SET_DRIVERS_ERROR,
      payload: {
        errorMessage
      }
    }
  }
};

export const driversReducer = {
  [SET_DRIVERS](state = {}, action) {
    const { driversList } = action.payload;
    return {
      ...state,
      driversList
    };
  },
  [CLEAR_DRIVERS](state = {}) {
    return {
      ...state,
      driversList: []
    };
  },
  [SET_DRIVERS_LOADING](state = {}) {
    return {
      ...state,
      isLoading: true
    };
  },
  [FINISH_DRIVERS_LOADING](state = {}) {
    return {
      ...state,
      isLoading: false
    };
  },
  [SET_DRIVERS_ERROR](state = {}, action) {
    const { errorMessage } = action.payload;
    return {
      ...state,
      errorMessage
    };
  }
};

export const driversLogic = [
  {
    type: LOAD_DRIVERS,
    cancelType: 'ABORT',
    latest: true,
    process({ getState, action }, dispatch, done) {
      dispatch(driverActions.setDriversLoading());
      driverService
        .fetchAll()
        .then(drivers => {
          dispatch(driverActions.setDrivers(drivers));
          dispatch(driverActions.finishDriversLoading());
          done();
        })
        .catch(err => {
          dispatch(driverActions.finishDriversLoading());
          done();
        });
    }
  }
];
