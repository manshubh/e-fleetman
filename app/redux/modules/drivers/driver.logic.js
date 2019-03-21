import { LOAD_DRIVERS } from './driver.actions';

export const driversLogic = [
  {
    type: LOAD_DRIVERS,
    cancelType: 'ABORT',
    latest: true,
    async process(
      {
        actions: { driverActions },
        services: { driverService }
      },
      dispatch,
      done) {
      dispatch(driverActions.setDriversLoading());
      try {
        const drivers = await driverService.fetchAll();
        dispatch(driverActions.setDrivers(drivers));
        dispatch(driverActions.finishDriversLoading());
      } catch (err) {
        dispatch(driverActions.finishDriversLoading());
      }
      done();
    }
  }
];
