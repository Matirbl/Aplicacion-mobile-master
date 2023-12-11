import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBSbNq6OxSo1PtK-sYKdjSq6f763NKzEds",
  authDomain: "musicstoreapp-8d6e0.firebaseapp.com",
  projectId: "musicstoreapp-8d6e0",
  storageBucket: "musicstoreapp-8d6e0.appspot.com",
  messagingSenderId: "877282941419",
  appId: "1:877282941419:web:547d551575eff62e7a21ae",
  measurementId: "G-9WJBR3C3DT",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//export const db = getFirestore(app);
export const db = firebase.firestore();
export const storage = getStorage(app);

export const getPaginatedData = (cantidad) => {
  const queryRef = db.collection("productos").limit(cantidad);
  return queryRef.get();
};

export default {
  firebase,
  db,
};
