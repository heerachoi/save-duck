import { initializeApp } from 'firebase/app';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore, collection, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

// save-duck-project
// const firebaseConfig = {
//   apiKey: 'AIzaSyBJAaoGVZAqQ58vnhtT9eTbnx3G6eeOpXM',
//   authDomain: 'save-duck-project.firebaseapp.com',
//   projectId: 'save-duck-project',
//   storageBucket: 'save-duck-project.appspot.com',
//   messagingSenderId: '1034061398211',
//   appId: '1:1034061398211:web:8eb7aea9f40421db3ee276',
//   measurementId: 'G-98XHQ8X10T',
// };

// save-duck-project-02
const firebaseConfig = {
  apiKey: 'AIzaSyB8LgkaqTPSWzLf6V9stRdhLIwDBqWJC3U',
  authDomain: 'save-duck-project-02.firebaseapp.com',
  projectId: 'save-duck-project-02',
  storageBucket: 'save-duck-project-02.appspot.com',
  messagingSenderId: '826960173825',
  appId: '1:826960173825:web:f88026b906d29f65621900',
};

// save-duck-project-03
// const firebaseConfig = {
//   apiKey: 'AIzaSyApfHtpJBMNFt9y8HX7sA8PCKc88AfmmwU',
//   authDomain: 'save-duck-03.firebaseapp.com',
//   projectId: 'save-duck-03',
//   storageBucket: 'save-duck-03.appspot.com',
//   messagingSenderId: '454939921742',
//   appId: '1:454939921742:web:f6c0f21694313658f9621f',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const authService = getAuth();
// export const auth = firebase.auth;
export const storage = getStorage();

// Custom Hook
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
  const fileRef = ref(storage, `profileImg/${currentUser.uid + '.png'}`);

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);
  console.log(photoURL)
  updateProfile(currentUser, { photoURL });

  setLoading(false);
  alert('프로필 이미지가 변경되었습니다.');


  // console.log(currentUser.uid)
  // console.log(photoURL)

  // const docRef = doc(db, 'users', currentUser.);
  // try {
  //   const response = await updateDoc(docRef, {
  //     imgUrl: photoURL,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }


}



