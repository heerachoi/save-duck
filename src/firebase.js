import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

<<<<<<< Updated upstream
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
  apiKey: 'AIzaSyBJAaoGVZAqQ58vnhtT9eTbnx3G6eeOpXM',
  authDomain: 'save-duck-project.firebaseapp.com',
  projectId: 'save-duck-project',
  storageBucket: 'save-duck-project.appspot.com',
  messagingSenderId: '1034061398211',
  appId: '1:1034061398211:web:8eb7aea9f40421db3ee276',
=======
// 회수 2차
const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보

  apiKey: 'AIzaSyB8LgkaqTPSWzLf6V9stRdhLIwDBqWJC3U',
  authDomain: 'save-duck-project-02.firebaseapp.com',
  projectId: 'save-duck-project-02',
  storageBucket: 'save-duck-project-02.appspot.com',
  messagingSenderId: '826960173825',
  appId: '1:826960173825:web:f88026b906d29f65621900',
>>>>>>> Stashed changes
  measurementId: 'G-98XHQ8X10T',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const authService = getAuth();
// export const auth = firebase.auth;
export const storage = getStorage();
