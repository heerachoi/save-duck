import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
const User = {
  email: "test@saveduck.com",
  pw: "q1w2e3r4!@",
};

function SignInComponent() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const navigate = useNavigate(); //회원가입 이동 함수
  const navigateSignUp = () => {
    navigate("/SignUp");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    //정규표현식 사용
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  return (
    <LoginWrap>
      <LoginContaier>
        <H2>Login</H2>

        <ContentWrap>
          <EmaillWrap>
            <InputTitle>이메일 주소</InputTitle>

            <InputWrap>
              <Input
                type="text"
                className="input"
                placeholder="saveduck@saveduck.com"
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
                className="input"
                placeholder="비밀번호를 입력해주세요."
                value={pw}
                onChange={handlePw}
              />
            </InputWrap>
            <ErrorMessgeWrap>
              {!pwValid && pw.length > 0 && (
                <div>옳바르지 않은 비밀번호 형식입니다.</div>
              )}
            </ErrorMessgeWrap>
          </div>
        </ContentWrap>

        <ButtonWrap>
          <ButtonSign>
            <div>
              <SignInBtn onClick={onClickConfirmButton}>로그인</SignInBtn>
            </div>
            <div>
              <SignUpBtn onClick={navigateSignUp}>회원가입</SignUpBtn>
            </div>
          </ButtonSign>
          <div>
            <div>
              <Button>Google 로그인</Button>
            </div>
            <div>
              <Button>Github 로그인</Button>
            </div>
          </div>
        </ButtonWrap>
      </LoginContaier>
    </LoginWrap>
  );
}

export default SignInComponent;
