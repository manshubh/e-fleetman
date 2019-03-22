import { initializeApp } from 'firebase';

class FirebaseConnector {
  static config = {
    apiKey: "AIzaSyAVfRSkb5O4VxAD4PeOq652DLXBCAHU0hU",
    authDomain: "rac-quiz.firebaseapp.com",
    databaseURL: "https://rac-quiz.firebaseio.com",
    projectId: "rac-quiz",
    storageBucket: "rac-quiz.appspot.com",
    messagingSenderId: "161925869282"
  };

  constructor() {
    initializeApp(FirebaseConnector.config);
  }
}

export const connection =  new FirebaseConnector();