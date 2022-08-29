// import the firebase project keys
import firebaseConfig from "./config/firebase-keys"
 
// other imports from firebase libraries
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
 
//instantiate the firebase app
export const firebaseApp = initializeApp(firebaseConfig);
 
//instantiate any other firebase services here
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

