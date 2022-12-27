import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { authService } from "../../firebase";
import "firebase/firestore";
import { H1 } from "./SignUp.js";
// import { H2 } from "../signIn/SignIn.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import React from "react";

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
  //db 저장
  const auth = getAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      await createUserWithEmailAndPassword(authService, email, password);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  console.log("email:", email, "passord:", password);

  // const provider = new GoogleAuthProvider();

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage("이메일의 형식이 올바르지 않습니다!");
      setIsEmail(false);
    } else {
      setEmailMessage("사용 가능한 이메일 입니다.");
      setIsEmail(true);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage("닉네임은 2글자 이상 5글자 이하로 입력해주세요!");
      setIsName(false);
    } else {
      setNameMessage("사용가능한 닉네임 입니다.");
      setIsName(true);
    }
  };

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
      setPasswordMessage("안전한 비밀번호 입니다.");
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage("비밀번호가 똑같지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage("똑같은 비밀번호를 입력했습니다.");
      setIsPasswordConfirm(true);
    }
  };
  return (
    <>
      <H1>SaveDuck</H1>
      <form onSubmit={onSubmit} className="form">
        <div className="form-el">
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            name="name"
            value={email}
            onChange={onChangeEmail}
          />
          <p className="message">{emailMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="name">Nick Name</label>
          <br />
          <input id="name" name="name" value={name} onChange={onChangeName} />
          <p className="message">{nameMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
          <p className="message">{passwordMessage}</p>
        </div>
        <div className="form-el">
          <label htmlFor="passwordConfirm">Password Confirm</label>
          <br />
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChangePasswordConfirm}
          />
          <p className="message">{passwordConfirmMessage}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default SignUpComponent;
