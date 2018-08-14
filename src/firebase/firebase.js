import firebase from 'firebase/app';
import 'firebase/auth';

const prodConfig = {
  apiKey: "AIzaSyAt8YVD706Uab1qhEAw8TUxIi2EsXIMv6M",
  authDomain: "priorities-to-do-app.firebaseapp.com",
  databaseURL: "https://priorities-to-do-app.firebaseio.com",
  projectId: "priorities-to-do-app",
  storageBucket: "",
  messagingSenderId: "875426345623"
};

const devConfig = {
  apiKey: "AIzaSyDaUozIxggyD5xKOEsJjnv3e7W3Lnx-frA",
  authDomain: "priorities-to-do-app-dev.firebaseapp.com",
  databaseURL: "https://priorities-to-do-app-dev.firebaseio.com",
  projectId: "priorities-to-do-app-dev",
  storageBucket: "",
  messagingSenderId: "3010514295"
};

const config = process.env.NOVE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
