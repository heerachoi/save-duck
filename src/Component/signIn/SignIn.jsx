import React, { useEffect, useState } from 'react';
import { authService } from '../../firebase';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  LoginWrap,
  LoginContaier,
  GitImgContainer,
  GogImgContainer,
  EmaillWrap,
  InputTitle,
  ButtonWrap,
  SignInBtn,
  SignUpBtn,
  H2,
  InputWrap,
  Input,
  ErrorMessgeWrap,
  ButtonSign,
  GithubBtn,
  GoogleBtn,
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
  const [error, setError] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (email.length === 0 || password.length === 0) {
      setNotAllow(true);

      return;
    }
    setNotAllow(false);
  }, [password, email]);

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
    try {
      signInWithEmailAndPassword(authService, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          window.location.href = '/home';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          setError(errorMessage);
        });
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
    window.location.href = '/home';
    const data = await signInWithPopup(authService, provider);
  };
  const gotoSignup = (e) => {
    window.location.href = '/signup';
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(authService, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        window.location.href = '/home';
      })
      .catch((error) => {
        alert('없는 계정 또는 잘못된 비밀번호 입니다.');
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <LoginWrap>
      <LoginContaier>
        <H2>Login</H2>

        <form onSubmit={onSubmit}>
          <EmaillWrap>
            <InputTitle>이메일 주소</InputTitle>

            <InputWrap>
              <Input type='email' name='email' placeholder='saveduck@saveduck.com' required value={email} onChange={handleEmail} />
            </InputWrap>

            <ErrorMessgeWrap>{!emailValid && email.length > 0 && <div>! 옳바른 아이디를 입력해주세요.</div>}</ErrorMessgeWrap>
          </EmaillWrap>

          <div>
            <InputTitle>비밀번호</InputTitle>

            <InputWrap>
              <Input type='password' name='password' placeholder='비밀번호를 입력해주세요.' required value={password} onChange={handlePassword} />
            </InputWrap>
          </div>
        </form>

        <ButtonWrap>
          <ButtonSign>
            <div>
              <SignInBtn disabled={notAllow} onClick={onSubmit}>
                로그인
              </SignInBtn>
            </div>
            <div>
              <SignUpBtn onClick={gotoSignup}>회원가입</SignUpBtn>
            </div>
          </ButtonSign>
          <div>
            <div>
              <GoogleBtn onClick={onSocialClick} name='google'>
                <GogImgContainer />
                Google 로그인
              </GoogleBtn>
            </div>
            <div>
              <GithubBtn onClick={onSocialClick} name='github'>
                <GitImgContainer />
                Github 로그인
              </GithubBtn>
            </div>
          </div>
        </ButtonWrap>
      </LoginContaier>
    </LoginWrap>
  );
};

export default SignInComponent;
