//firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보

  apiKey: "AIzaSyBJAaoGVZAqQ58vnhtT9eTbnx3G6eeOpXM",
  authDomain: "save-duck-project.firebaseapp.com",
  projectId: "save-duck-project",
  storageBucket: "save-duck-project.appspot.com",
  messagingSenderId: "1034061398211",
  appId: "1:1034061398211:web:8eb7aea9f40421db3ee276",
  measurementId: "G-98XHQ8X10T",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export const authService = getAuth();
// export const auth = firebase.auth;
export { firestore };
