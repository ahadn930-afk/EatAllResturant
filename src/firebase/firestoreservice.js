import {
  collection, addDoc, getDocs,
  getDoc, doc, updateDoc, deleteDoc
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