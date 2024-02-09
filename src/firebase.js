// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "ganna-sunno.firebaseapp.com",
  projectId: "ganna-sunno",
  storageBucket: "ganna-sunno.appspot.com",
  messagingSenderId: "647941951525",
  appId: "1:647941951525:web:1bad1afbcd8acd6c69afcc",
  measurementId: "G-PPFGZPJHJD"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export {provider, auth, db };

