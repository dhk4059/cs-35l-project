// Firebase api and config set up for access to the
// Firebase project set up. For convenience and for the
// purposes of this MVP project, the config is stored
// within a .js file. Normally, it would be safer to
// store within .env.

// This app uses several features of Firebase:
// - user authentication via email/password
// - firebase database for ratings
// - firebase firestore for text reviews
// - firebase hosting to host the web app outside of localhost

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBx9poUw9yI_tFyNdvpdpucA5vP1bk5AUs",
  authDomain: "l-housing.firebaseapp.com",
  databaseURL: "https://l-housing-default-rtdb.firebaseio.com",
  projectId: "l-housing",
  storageBucket: "l-housing.appspot.com",
  messagingSenderId: "188451864443",
  appId: "1:188451864443:web:b7129960a0067d322047de",
  measurementId: "G-E8JRF3ZJY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
