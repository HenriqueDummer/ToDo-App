// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC65jhW35-C9PDtOCTuSPT6nlj4HlhiesE",
  authDomain: "todoapp-12762.firebaseapp.com",
  projectId: "todoapp-12762",
  storageBucket: "todoapp-12762.appspot.com",
  messagingSenderId: "500450937217",
  appId: "1:500450937217:web:0c05e7037132af445b4080",
  measurementId: "G-6L6MWM1MRQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)