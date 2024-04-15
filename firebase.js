// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD79bHQFe84XX4BCmVkkCPDovCuQnQGbRw",
  authDomain: "minly-media.firebaseapp.com",
  projectId: "minly-media",
  storageBucket: "minly-media.appspot.com",
  messagingSenderId: "804634788804",
  appId: "1:804634788804:web:759b0d66e64f1723be1a91",
  measurementId: "G-C15KCXJELE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
