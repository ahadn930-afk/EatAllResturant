import {
  collection, addDoc, getDocs,
  getDoc, doc, updateDoc, deleteDoc,
  setDoc, serverTimestamp, query,
  orderBy, onSnapshot
} from "firebase/firestore";
import { db } from "./config";

const COLLECTION = "menuItems";

export const createItem = (data) =>
  addDoc(collection(db, COLLECTION), data);

export const getAllItems = () =>
  getDocs(collection(db, COLLECTION));

export const getSingleItem = (id) =>
  getDoc(doc(db, COLLECTION, id));

export const updateItem = (id, data) =>
  updateDoc(doc(db, COLLECTION, id), data);

export const deleteItem = (id) =>
  deleteDoc(doc(db, COLLECTION, id));

// Save user to Firestore (no duplicates)
export const saveUserToFirestore = async (user, extraData = {}) => {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    await setDoc(userRef, {
      uid:       user.uid,
      name:      user.displayName || "",
      email:     user.email,
      role:      "user",
      createdAt: serverTimestamp(),
      ...extraData,
    });
  }
};

// Get all users
export const getAllUsers = () =>
  getDocs(collection(db, "users"));

// Generate a unique chat room ID from two user UIDs
export const getChatId = (uid1, uid2) =>
  [uid1, uid2].sort().join("_");

// Send a message
export const sendMessage = (chatId, message) =>
  addDoc(collection(db, "chats", chatId, "messages"), {
    ...message,
    createdAt: serverTimestamp(),
  });

// Listen to messages in real time
export const subscribeToMessages = (chatId, callback) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const messages = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(messages);
  });
};