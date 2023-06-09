// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUhO6FHfH1P8WWQNv-uDxP7gH0sgTeqxs",
  authDomain: "ganna-sunno.firebaseapp.com",
  projectId: "ganna-sunno",
  storageBucket: "ganna-sunno.appspot.com",
  messagingSenderId: "647941951525",
  appId: "1:647941951525:web:1bad1afbcd8acd6c69afcc",
  measurementId: "G-PPFGZPJHJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export {provider, auth };
