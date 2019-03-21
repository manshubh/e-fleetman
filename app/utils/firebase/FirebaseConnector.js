import firebase, { initializeApp } from 'firebase';

class FirebaseConnector {
  static config = {
    apiKey: 'AIzaSyC3pway3KYhxWOeWP8pSxb6dpSjaBiAlnI',
    authDomain: 'fleetman-e0cfa.firebaseapp.com',
    databaseURL: 'https://fleetman-e0cfa.firebaseio.com',
    projectId: 'fleetman-e0cfa',
    storageBucket: 'fleetman-e0cfa.appspot.com',
    messagingSenderId: '70343576408'
  };

  constructor() {
    initializeApp(FirebaseConnector.config);
  }

  getInstance() {
    return firebase;
  }
}

export const firebaseConnection = new FirebaseConnector();

