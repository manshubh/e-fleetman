import { FirebaseConnector } from './FirebaseConnector';
import { firestore } from 'firebase';

export class FireStoreBaseObject {
  collectionName = '';

  async fetchAll() {
    const db = firestore();
    if (this.collectionName == '') {
      throw 'collectionName is not defined';
    }
    try {
      const data = await db.collection(this.collectionName).get();
      const finalData = [];
      data.forEach(doc => {
        const row = this.mapFirebaseToUI(doc);
        finalData.push(row);
      });
      return finalData;
    } catch (ex) {
      throw ex;
    }
  }

  mapFirebaseToUI = doc => {
    return doc;
  }
}