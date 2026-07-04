import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLwjxoON6bYg4nXhPHCl2ACf65yK7soME",
  authDomain: "trashofcse.firebaseapp.com",
  projectId: "trashofcse",
  storageBucket: "trashofcse.firebasestorage.app",
  messagingSenderId: "67566959040",
  appId: "1:67566959040:web:70b8bd73edc99dafc8f025",
  measurementId: "G-0CB0JGD4TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' }); // Always force account selection popup

export const githubProvider = new GithubAuthProvider();
