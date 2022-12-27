import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 회수
const firebaseConfig = {
  apiKey: "AIzaSyBJAaoGVZAqQ58vnhtT9eTbnx3G6eeOpXM",
  authDomain: "save-duck-project.firebaseapp.com",
  projectId: "save-duck-project",
  storageBucket: "save-duck-project.appspot.com",
  messagingSenderId: "1034061398211",
  appId: "1:1034061398211:web:8eb7aea9f40421db3ee276",
  measurementId: "G-98XHQ8X10T",
};

// 희라

// const firebaseConfig = {
//   apiKey: 'AIzaSyBBwKTsiRRd6wLhCDofXPI1EuFBZRSI6WY',
//   authDomain: 'save-duck-75f52.firebaseapp.com',
//   projectId: 'save-duck-75f52',
//   storageBucket: 'save-duck-75f52.appspot.com',
//   messagingSenderId: '358998119914',
//   appId: '1:358998119914:web:2b9da53f7a566702d2ce93',
//   measurementId: 'G-BP46BNP00N',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
