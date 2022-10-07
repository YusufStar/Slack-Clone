import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAISTfpyawUfs6SYerYZ2GSMkdMOOk65Yo",
    authDomain: "slack-caf01.firebaseapp.com",
    projectId: "slack-caf01",
    storageBucket: "slack-caf01.appspot.com",
    messagingSenderId: "544711961590",
    appId: "1:544711961590:web:06588de34d2c43c4c5b5d7",
    measurementId: "G-523V4VD59J",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider };