import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAN2ep7Hn3faw4xywZTWRUG205XbkTuN-Q",
  authDomain: "restaurant-menu-1afca.firebaseapp.com",
  projectId: "restaurant-menu-1afca",
  storageBucket: "restaurant-menu-1afca.firebasestorage.app",
  messagingSenderId: "707977386431",
  appId: "1:707977386431:web:adb3fa2adc49375612290a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();