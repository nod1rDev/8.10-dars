// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLMbzrEtUzSzRyln7Zjn8Vel_nApJc0fc",
  authDomain: "telegram-19f86.firebaseapp.com",
  projectId: "telegram-19f86",
  storageBucket: "telegram-19f86.appspot.com",
  messagingSenderId: "300816010146",
  appId: "1:300816010146:web:67c0bce29960b6cf4b40fb",
  measurementId: "G-H8DJSZVF00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
