import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";

// Config Firebase du projet
const firebaseConfig = {
  apiKey: "AIzaSyBswMYzRv2gUuW4QW3RQpXVrCdEtrvcOk4",
  authDomain: "scream-d495f.firebaseapp.com",
  projectId: "scream-d495f",
  storageBucket: "scream-d495f.firebasestorage.app",
  messagingSenderId: "340705494025",
  appId: "1:340705494025:web:0e6a663fdcef7b25c364d8",
  measurementId: "G-4N6TJDJCMM"
}

// Configuration de l'app
export const app = initializeApp(firebaseConfig);

// Base de données
export const db = getFirestore(app);
