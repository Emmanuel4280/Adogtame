// src/componentes/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPrymdLcz-DcuhrAW6Rasx4SME3XHfL3k",
  authDomain: "adogtame-8a817.firebaseapp.com",
  projectId: "adogtame-8a817",
  storageBucket: "adogtame-8a817.firebasestorage.app",
  messagingSenderId: "871145626698",
  appId: "1:871145626698:web:8215d9ae54a4e2133a5ab3",
  measurementId: "G-5X2ZVVPCFH",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
