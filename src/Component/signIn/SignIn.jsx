import React, { useEffect, useState } from 'react';
import { NavLink, Router, Link, useNavigate } from 'react-router-dom';
import { authService } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signOut, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  // Img,
  Box,
  LoginWrap,
  LoginContaier,
  GitImgContainer,
  GogImgContainer,
  EmaillWrap,
  PasswordWrap,
  InputTitle,
  ButtonWrap,
  SignInBtn,
  SignUpBtn,
  H2,
  InputWrap,
  Input,
  ErrorMessgeWrap,
  ButtonSign,
  Button,
  GithubBtn,
  GoogleBtn,
  SocialLoginBtn,
} from './SignIn.js';

//더미

const auth = getAuth();

const SignInComponent = () => {
  //이메일, 패스워드 초기화
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  //이메일, 패스워드 유효성 값 초기화
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(false);
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (email.length === 0 || password.length === 0) {
      if (email.length === 0 || password.length === 0) {
        setNotAllow(true);
        return;
      }
      setNotAllow(false);
    }
  }, [email, password]);

  const handleEmail = (e) => {
    // 이메일 정규식
    setEmail(e.target.value);
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // 비밀번호 정규식
  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };
  //로그인
  const login = async (e) => {
    e.preventDefault();
    let data;
    try {
      const response = await signInWithEmailAndPassword(authService, email, password);
      window.location.href = '/';
    } catch (error) {
      alert('등록되지않은 아이디입니다.');
    }
  };

  //소셜로그인
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    window.location.href = '/';
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
  const gotoSignup = (e) => {
    window.location.href = '/signup';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/home');
    } catch (e) {
      console.log(e.mesage);
    }
  };
  return (
    <LoginWrap>
      <Box></Box>
      <LoginContaier>
        <H2>Login</H2>
        <form onSubmit={handleSubmit}>
          <EmaillWrap>
            <InputTitle>이메일 주소</InputTitle>
            <InputWrap>
              <Input type='email' name='email' placeholder='saveduck@saveduck.com' required value={email} onChange={handleEmail} />
            </InputWrap>
            <ErrorMessgeWrap>{!emailValid && email.length > 0 && <div>! 옳바른 아이디를 입력해주세요.</div>}</ErrorMessgeWrap>
          </EmaillWrap>
          <PasswordWrap>
            <InputTitle>비밀번호</InputTitle>
            <InputWrap>
              <Input type='password' name='password' placeholder='비밀번호를 입력해주세요.' required value={password} onChange={handlePassword} />
            </InputWrap>
          </PasswordWrap>
        </form>

        <ButtonWrap>
          <ButtonSign>
            <SignInBtn onClick={login}>로그인</SignInBtn>
            <SignUpBtn onClick={gotoSignup}>회원가입</SignUpBtn>
          </ButtonSign>
          <SocialLoginBtn>
            <GoogleBtn onClick={onSocialClick} name='google'>
              <GogImgContainer />
              Google 로그인
            </GoogleBtn>
            <GithubBtn onClick={onSocialClick} name='github'>
              <GitImgContainer />
              Github 로그인
            </GithubBtn>
          </SocialLoginBtn>
        </ButtonWrap>
      </LoginContaier>
    </LoginWrap>
  );
};

export default SignInComponent;
