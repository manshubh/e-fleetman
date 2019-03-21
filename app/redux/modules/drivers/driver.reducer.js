import {
  SET_DRIVERS,
  CREATE_DRIVER,
  CLEAR_DRIVERS,
  FINISH_DRIVERS_LOADING,
  LOAD_DRIVERS,
  REMOVE_DRIVER,
  SET_DRIVERS_ERROR,
  SET_DRIVERS_LOADING
} from './driver.actions';

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
