// //firebase.js
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   // firebase 설정과 관련된 개인 정보

//   apiKey: 'AIzaSyBBwKTsiRRd6wLhCDofXPI1EuFBZRSI6WY',
//   authDomain: 'save-duck-75f52.firebaseapp.com',
//   projectId: 'save-duck-75f52',
//   storageBucket: 'save-duck-75f52.appspot.com',
//   messagingSenderId: '358998119914',
//   appId: '1:358998119914:web:2b9da53f7a566702d2ce93',
//   measurementId: 'G-BP46BNP00N',
// };

// // firebaseConfig 정보로 firebase 시작
// firebase.initializeApp(firebaseConfig);

// // firebase의 firestore 인스턴스를 변수에 저장
// const firestore = firebase.firestore();

// // 필요한 곳에서 사용할 수 있도록 내보내기
// // 다른 곳에서 불러올때 firestore로 불러와야 함!!
// export { firestore };

// Import the functions you need from the SDKs you need
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
