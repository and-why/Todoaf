import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://priorities-to-do-app.firebaseio.com',
  projectId: 'priorities-to-do-app',
  storageBucket: '',
  messagingSenderId: '875426345623',
};

const devConfig = {
  apiKey: process.env.FIREBASE_API_KEY_DEV,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN_DEV,
  databaseURL: 'https://priorities-to-do-app-dev.firebaseio.com',
  projectId: 'priorities-to-do-app-dev',
  storageBucket: '',
  messagingSenderId: '3010514295',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export { auth, database };
