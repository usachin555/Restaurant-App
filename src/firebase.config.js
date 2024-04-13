import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBrolw4B8KrtqLbccO74pZC8e_tEvAzMgg",
    authDomain: "restaurantapp-5e50c.firebaseapp.com",
    databaseURL: "https://restaurantapp-5e50c-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-5e50c",
    storageBucket: "restaurantapp-5e50c.appspot.com",
    messagingSenderId: "932548422977",
    appId: "1:932548422977:web:63fa744b723f6b2de405c0"
  };

  const app=getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage = getStorage(app)
  const auth = getAuth(app)

  export { app, firestore, storage,auth}