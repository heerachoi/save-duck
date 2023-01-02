import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { authService } from "../../firebase";
import "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import React from "react";
import {
  H1,
  H2,
  SignupWrap,
  SignupContaier,
  SignupTitle,
  SignUpSubmit,
  Input,
  InputTitle,
  InputWrap,
  passwordWrp,
  ContentWrap,
  EmailWrap,
  ErrorMessgeWrap,
  ErrorMessge,
  PasswordWrap,
} from "./SignUp.js";

const SignUpComponent = () => {
  // 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = useState("");

  // 오류메세지 상태 저장
  const [emailMessage, setEmailMessage] = React.useState("");
  const [passwordMessage, setPasswordMessage] = React.useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    React.useState("");
  const [nameMessage, setNameMessage] = React.useState("");

  // 유효성 검사
  const [isname, setIsName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);

  // 회원가입 버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  const auth = getAuth();
  //* 회원가입 완료
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      await createUserWithEmailAndPassword(authService, email, password);
      alert("SaveDuck 회원이 되신걸 환영합니다.");
      window.location.href = "/home";
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  console.log("email:", email, "passord:", password);
  //* 회원가입 버튼 활
  useEffect(() => {
    if (isname && isPassword && isPasswordConfirm && isEmail) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [isname, isPassword, isPasswordConfirm, isEmail]);
  console.log(isEmail, isname, isPassword, isPasswordConfirm);

  // 회원가입 완료 const onClickSummit = () => {   alert("SaveDuck 회원이 되신걸 환영합니다.");
  // window.location.href = "/"; };

  //* 이메일
  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("! 잘못된 이메일 주소입니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("! 사용가능한 이메일입니다.");
      setIsEmail(true);
    }
  };

  //* 비밀번호
  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("! 사용 가능한 비밀번호에요.");
      setIsPassword(true);
    }
  };

  //* 비밀번호 확인
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password === currentPasswordConfirm) {
      setPasswordConfirmMessage("! 비밀번호가 일치합니다.");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage(
        "! 비밀번호가 일치하지 않아요. 다시 입력해주세요."
      );
      setIsPasswordConfirm(false);
    }
  };

  //* 닉네임
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 8) {
      setNameMessage("! 2글자 이상, 8글자 미만으로만 사용할 수 있습니다.");
      setIsName(false);
    } else {
      setNameMessage("! 사용 가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

  return (
    <SignupWrap>
      <SignupTitle>
        <H1>SaveDuck</H1>
        <H2>Record everything. The duck will show you the way.</H2>
      </SignupTitle>
      <ContentWrap>
        <SignupContaier>
          <form onSubmit={onSubmit} className="form">
            <EmailWrap>
              <InputTitle placeholder="saveduck@saveduck.com">
                이메일
              </InputTitle>
              <Input
                type="email"
                name="name"
                value={email}
                onChange={onChangeEmail}
              />
              <ErrorMessgeWrap>
                <ErrorMessge>
                  {email.length > 0 && (
                    <span
                      className={`message ${isEmail ? "success" : "error"}`}
                    >
                      {emailMessage}
                    </span>
                  )}
                </ErrorMessge>
              </ErrorMessgeWrap>
            </EmailWrap>

            <>
              <InputTitle>비밀번호</InputTitle>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              <ErrorMessgeWrap>
                <ErrorMessge>
                  {password.length > 0 && (
                    <span
                      className={`message ${isPassword ? "success" : "error"}`}
                    >
                      {passwordMessage}
                    </span>
                  )}
                </ErrorMessge>
              </ErrorMessgeWrap>
              <InputTitle>비밀번호 확인</InputTitle>
              <Input
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
              />
              <ErrorMessgeWrap>
                <ErrorMessge>
                  {passwordConfirm.length > 0 && (
                    <span
                      className={`message ${
                        isPasswordConfirm ? "success" : "error"
                      }`}
                    >
                      {passwordConfirmMessage}
                    </span>
                  )}
                </ErrorMessge>
              </ErrorMessgeWrap>
            </>
            <InputTitle>닉네임</InputTitle>
            <Input id="name" name="name" value={name} onChange={onChangeName} />
            <ErrorMessgeWrap>
              <ErrorMessge>
                {name.length > 0 && (
                  <span
                    className={`message ${isPassword ? "success" : "error"}`}
                  >
                    {nameMessage}
                  </span>
                )}
              </ErrorMessge>
            </ErrorMessgeWrap>
            <SignUpSubmit disabled={notAllow}>회원가입</SignUpSubmit>
          </form>
        </SignupContaier>
      </ContentWrap>
    </SignupWrap>
  );
};

export default SignUpComponent;
