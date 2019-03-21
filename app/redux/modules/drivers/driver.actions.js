export const LOAD_DRIVERS = 'LOAD_DRIVERS';
export const SET_DRIVERS = 'SET_DRIVERS';
export const SET_DRIVERS_ERROR = 'SET_DRIVERS_ERROR';
export const CLEAR_DRIVERS = 'CLEAR_DRIVERS';
export const CREATE_DRIVER = 'CREATE_DRIVER';
export const REMOVE_DRIVER = 'REMOVE_DRIVER';
export const SET_DRIVERS_LOADING = 'SET_DRIVERS_LOADING';
export const FINISH_DRIVERS_LOADING = 'FINISH_DRIVERS_LOADING';


export const driverActions = {
  loadDrivers() {
    return {
      type: LOAD_DRIVERS
    }
  },
  /**
   *
   * @param {*} driversList 
   */
  setDrivers(driversList) {
    return {
      type: SET_DRIVERS,
      payload: { driversList }
    };
  },
  clearDrivers() {
    return {
      type: CLEAR_DRIVERS
    };
  },
  setDriversLoading() {
    return {
      type: SET_DRIVERS_LOADING
    };
  },
  finishDriversLoading() {
    return {
      type: FINISH_DRIVERS_LOADING
    };
  },
  /**
   *
   * @param {*} errorMessage 
   */
  setDriversError(errorMessage) {
    return {
      type: SET_DRIVERS_ERROR,
      payload: {
        errorMessage
      }
    }
  }
};
