// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const FIREBASE_KEY = import.meta.env.FIREBASE_KEY;

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "mind-scribe-6d4a7.firebaseapp.com",
  projectId: "mind-scribe-6d4a7",
  storageBucket: "mind-scribe-6d4a7.appspot.com",
  messagingSenderId: "24324440186",
  appId: "1:24324440186:web:ef7d2ab8338bbcc0bb7bc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export firebase database
export const db = getFirestore(app)



// Export authentication
export const auth = getAuth(app);
export default app