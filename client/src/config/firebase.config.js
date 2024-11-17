
import {getApp, getApps, initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';


// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
//     appId: process.env.REACT_APP_FIREBASE_APPI_ID
//   };

const firebaseConfig = {
    apiKey: "AIzaSyAh5-HBYsnjWyHlQAcJsFv6k1HV3Nuy6do",
    authDomain: "project-musicapp-6f509.firebaseapp.com",
    projectId: "project-musicapp-6f509",
    storageBucket: "project-musicapp-6f509.appspot.com",
    messagingSenderId: "304018965869",
    appId: "1:304018965869:web:1793a085a03a75fd0bc664"
  };


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage, app};