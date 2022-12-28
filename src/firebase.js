import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// 회수
// const firebaseConfig = {
//   apiKey: 'AIzaSyBJAaoGVZAqQ58vnhtT9eTbnx3G6eeOpXM',
//   authDomain: 'save-duck-project.firebaseapp.com',
//   projectId: 'save-duck-project',
//   storageBucket: 'save-duck-project.appspot.com',
//   messagingSenderId: '1034061398211',
//   appId: '1:1034061398211:web:8eb7aea9f40421db3ee276',
//   measurementId: 'G-98XHQ8X10T',
// };

// 회수 2차
const firebaseConfig = {
  apiKey: "AIzaSyBJAaoGVZAqQ58vnhtT9eTbnx3G6eeOpXM",
  authDomain: "save-duck-project.firebaseapp.com",
  projectId: "save-duck-project",
  storageBucket: "save-duck-project.appspot.com",
  messagingSenderId: "1034061398211",
  appId: "1:1034061398211:web:8eb7aea9f40421db3ee276",
  measurementId: "G-98XHQ8X10T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const authService = getAuth();
// export const auth = firebase.auth;
export const storage = getStorage();

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(authService, (user) =>
      setCurrentUser(user)
    );
    return unsub;
  }, []);

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);
  alert("Uploaded file!");
}