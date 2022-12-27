import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 회수
const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보

  apiKey: "AIzaSyB8LgkaqTPSWzLf6V9stRdhLIwDBqWJC3U",
  authDomain: "save-duck-project-02.firebaseapp.com",
  projectId: "save-duck-project-02",
  storageBucket: "save-duck-project-02.appspot.com",
  messagingSenderId: "826960173825",
  appId: "1:826960173825:web:f88026b906d29f65621900",
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
export const authService = getAuth();
// export const auth = firebase.auth;
export const storage = getStorage();
