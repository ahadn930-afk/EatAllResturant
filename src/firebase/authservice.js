import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  updateProfile,
  signInWithPopup
} from "firebase/auth";
import { auth, googleProvider } from "./config";

// 1. Create user with email and password
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

// 2. Sign in with email and password
export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// 3. Sign out
export const logoutUser = () => signOut(auth);

// 4. Reset / Forgot password
export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

// 5. Delete user
export const removeUser = () => deleteUser(auth.currentUser);

// 6. Update profile
export const updateUserProfile = (name) =>
  updateProfile(auth.currentUser, { displayName: name });

// 7. Google sign in
export const googleSignIn = () =>
  signInWithPopup(auth, googleProvider);