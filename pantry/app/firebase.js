// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0GIqUW5SROj2-PaqPGCHZhbMVsLs7f-I",
  authDomain: "food-pantry-5eaea.firebaseapp.com",
  projectId: "food-pantry-5eaea",
  storageBucket: "food-pantry-5eaea.appspot.com",
  messagingSenderId: "1042609435972",
  appId: "1:1042609435972:web:54899c3cf4f331256e1311"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { app, firestore };
