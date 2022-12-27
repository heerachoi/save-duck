//firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from "firebase/auth";

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

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();
// 필요한 곳에서 사용할 수 있도록 내보내기
// 다른 곳에서 불러올때 firestore로 불러와야 함!!
export const authService = getAuth();
// export const auth = firebase.auth;
export { firestore };
