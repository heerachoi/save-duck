import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';

const LOGIN = 'LOGIN';

// Action Creator
// LIST를 추가하는 Action Creator
export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

const loginState = (state = false, action) => {
  switch (action.type) {
    case LOGIN:
      const unsub = onAuthStateChanged(authService, user);
      return unsub;
    default:
      return state;
  }
};

export default loginState;
