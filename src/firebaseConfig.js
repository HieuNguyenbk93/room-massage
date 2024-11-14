// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYECr-b_P3VPWKp8N9UPNayY-_6T2dM0U",
  authDomain: "nodejsfirebase-f0d7e.firebaseapp.com",
  projectId: "nodejsfirebase-f0d7e",
  storageBucket: "nodejsfirebase-f0d7e.firebasestorage.app",
  messagingSenderId: "420027309097",
  appId: "1:420027309097:web:0c6b45e49306e61ddd1038",
  measurementId: "G-JPCYDXKM6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();