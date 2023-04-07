// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnjcsJ76YhejRzgEnsoeL4FfByEjH5nMU",
  authDomain: "login-signup-b9688.firebaseapp.com",
  projectId: "login-signup-b9688",
  storageBucket: "login-signup-b9688.appspot.com",
  messagingSenderId: "641884260075",
  appId: "1:641884260075:web:24cd620482f8bb8cc0e0ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Exporting for usage across project
export const db = getFirestore(app);
export const usersReference = collection(db, "users");
export const auth = getAuth(app);
export default app;
