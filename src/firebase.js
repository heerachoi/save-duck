import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBBwKTsiRRd6wLhCDofXPI1EuFBZRSI6WY',
  authDomain: 'save-duck-75f52.firebaseapp.com',
  projectId: 'save-duck-75f52',
  storageBucket: 'save-duck-75f52.appspot.com',
  messagingSenderId: '358998119914',
  appId: '1:358998119914:web:2b9da53f7a566702d2ce93',
  measurementId: 'G-BP46BNP00N',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
