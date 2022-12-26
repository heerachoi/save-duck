import React, { useEffect, useState } from "react";
import { NavLink, Router, Link, useNavigate } from "react-router-dom";
import { authService } from "../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  LoginWrap,
  LoginContaier,
  ContentWrap,
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
  Button,
} from "./SignIn.js";

//더미

const auth = getAuth();

const SignInComponent = () => {
  //이메일, 패스워드 초기화
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  //이메일, 패스워드 유효성 값 초기화
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const [init, setInit] = useState(false);
  // 처음에는 false이고 나중에 사용자 존재 판명이 모두 끝났을 때 true를 통해 해당 화면을 render
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      // user 판명을 듣고
      if (user) {
        // 있으면
        setIsLoggedIn(true); // 로그인 됨
      } else {
        setIsLoggedIn(false); // 로그인 안됨
      }
      setInit(true); // user 판명 끝
    });
  }, []);

  // onAuthStateChanged(authService, (currentUser) => {
  //   console.log("onAuthStateChanged: ", onAuthStateChanged);
  //   setUser(currentUser);
  // });
  //User 정보 추적
  const handleEmail = (e) => {
    // 이메일 정규식
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // 비밀번호 정규식
  const handlePassword = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    let data;
    try {
      await signInWithEmailAndPassword(authService, email, password);
    } catch (error) {
      // window.location.href = "/";
      console.log(error);
    }
  };
  console.log("email:", email, "passord:", password);
  // const login = async (email, password) => {
  //   try {
  //     await signInWithEmailAndPassword(authService, email, password);
  //     console.log(email, password);
  //   } catch (error) {
  //     console.log(error.message);
  //     console.log("로그인 실패");
  //   }
  // };

  //로그아웃
  const logout = async () => {
    console.log("logout");
    await signOut(auth);
  };

  return (
    <LoginWrap>
      <LoginContaier>
        <H2>Login</H2>

        <form>
          <EmaillWrap>
            <InputTitle>이메일 주소</InputTitle>

            <InputWrap>
              <Input
                type="email"
                name="email"
                placeholder="saveduck@saveduck.com"
                required
                value={email}
                onChange={handleEmail}
              />
            </InputWrap>

            <ErrorMessgeWrap>
              {!emailValid && email.length > 0 && (
                <div>! 잘못된 이메일주소입니다.</div>
              )}
            </ErrorMessgeWrap>
          </EmaillWrap>

          <div>
            <InputTitle>비밀번호</InputTitle>

            <InputWrap>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                required
                value={password}
                onChange={handlePassword}
              />
            </InputWrap>
            <h4> User Logged In</h4>
            {user?.email}
            <button onClick={logout}>Sign out</button>
            {/* <ErrorMessgeWrap>
              {!pwValid && password.length > 0 && (
                <div>! 이메일과 패스워드가 일치하지 않습니다.</div>
              )}
            </ErrorMessgeWrap> */}
          </div>
        </form>

        <ButtonWrap>
          <ButtonSign>
            <div>
              <SignInBtn onClick={login}>로그인</SignInBtn>
              {/* <Route exact path="/" element={<Home />} /> */}
            </div>
            <div>
              <SignUpBtn>회원가입</SignUpBtn>
            </div>
          </ButtonSign>
          <div>
            <div>
              <Button name="Google">Google 로그인</Button>
            </div>
            <div>
              <Button name="Gtihub">Github 로그인</Button>
            </div>
          </div>
        </ButtonWrap>
      </LoginContaier>
    </LoginWrap>
  );
};

export default SignInComponent;
