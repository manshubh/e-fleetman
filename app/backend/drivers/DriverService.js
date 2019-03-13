import { FireStoreBaseObject } from '../../utils/firebase/FireStoreBaseObject';
import { Driver } from './Driver';

class DriverService extends FireStoreBaseObject {
  collectionName = 'drivers';

  mapFirebaseToUI = (doc) => {
    return new Driver(doc.data());
  }
}

export const driverService = new DriverService();
