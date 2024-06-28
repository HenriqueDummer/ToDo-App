// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH7F1w9BGyksyv4xSCzN0DUbbB-ASoNnA",
  authDomain: "todo-app-960f4.firebaseapp.com",
  projectId: "todo-app-960f4",
  storageBucket: "todo-app-960f4.appspot.com",
  messagingSenderId: "299725137014",
  appId: "1:299725137014:web:4de5b5839c873f429bab57",
  measurementId: "G-GLWRDC67DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()