import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBbComqoyMyOJdIEYdcFX9pde0Ps5eAXAM",
  authDomain: "leadershiporg-2669a.firebaseapp.com",
  projectId: "leadershiporg-2669a",
  storageBucket: "leadershiporg-2669a.appspot.com",
  messagingSenderId: "504704370919",
  appId: "1:504704370919:web:552641700f4ccd37077a42",
  measurementId: "G-837EM6WC21"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
export default firebase;

 