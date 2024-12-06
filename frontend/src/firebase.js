// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nextnews-1c100.firebaseapp.com",
  projectId: "nextnews-1c100",
  storageBucket: "nextnews-1c100.firebasestorage.app",
  messagingSenderId: "983833998773",
  appId: "1:983833998773:web:262be628cf119da985d5fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);