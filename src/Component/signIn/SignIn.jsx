import { collection, addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink, Router, Link, useNavigate } from "react-router-dom";
import { authService } from "../../firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  GithubAuthProvider,
  signInWithPopup,
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
  // 처음에는 false이고 나중에 사용자 존재 판명이 모두 끝났을 때 true를 통해 해당 화면을 render
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   authService.onAuthStateChanged((user) => {
  //     // user 판명을 듣고
  //     if (user) {
  //       // 있으면
  //       setIsLoggedIn(true); // 로그인 됨
  //     } else {
  //       setIsLoggedIn(false); // 로그인 안됨
  //     }
  //     setInit(true); // user 판명 끝
  //   });
  // }, [user]);

  // onAuthStateChanged(authService, (currentUser) => {
  //   console.log(onAuthStateChanged);
  //   setUser(currentUser);
  // });
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(authService, (user) => {
  //     console.log("test");
  //     if (user) {
  //       console.log("user");
  //       console.log(user);
  //       setUser({ id: user.uid, email: "" });
  //     } else {
  //       console.log("null");
  //       setUser(null);
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });

  }, [])

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
  //로그인
  const login = async (e) => {
    e.preventDefault();
    let data;
    try {
      const response = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );
      // const docRef = await addDoc(collection(data, "users"), {
      //   email: "email",
      // });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  console.log("email:", email, "passord:", password);

  //로그아웃
  const logout = async () => {
    await signOut(auth);
  };
  //소셜로그인
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    window.location.href = "/";
    const data = await signInWithPopup(authService, provider);
    console.log(data);
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
              <Button onClick={onSocialClick} name="google">
                Google 로그인
              </Button>
            </div>
            <div>
              <Button onClick={onSocialClick} name="github">
                Github 로그인
              </Button>
            </div>
          </div>
        </ButtonWrap>
      </LoginContaier>
    </LoginWrap>
  );
};

export default SignInComponent;
