// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "expense-tracker-426a2.firebaseapp.com",
  projectId: "expense-tracker-426a2",
  storageBucket: "expense-tracker-426a2.appspot.com",
  messagingSenderId: "677661436977",
  appId: "1:677661436977:web:4744de86760b4c6c983910",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
