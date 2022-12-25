import { useEffect, useState, useRef } from "react";
import {
  LoginWrap,
  LoginContaier,
  ContentWrap,
  EmaillWrap,
  InputTitle,
  ButtonWrap,
  SignUpSummit,
  H1,
  H2,
  InputWrap,
  Input,
  ErrorMessgeWrap,
  ButtonSign,
} from "./SignUp.js";

function SignUpComponent() {
  //* State초기화
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setconfirmPw] = useState("");
  const [name, setName] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [confirmPwValid, setconfirmPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  // 회원가입 버튼 활성화
  useEffect(() => {
    if (emailValid && pwValid && nameValid && confirmPwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid, nameValid, confirmPwValid]);
  console.log(emailValid, pwValid, nameValid, confirmPwValid);

  const onClickSummit = () => {
    alert("SaveDuck 회원이 되신걸 환영합니다.");
  };

  const handleEmail = (e) => {
    //* 이메일 정규식
    setEmail(e.target.value);
    const regex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  //* 비밀번호 정규식
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

  //* 비밀번호 확인
  const handleConfirmPw = (e) => {
    setconfirmPw(e.target.value);
    if (pw === confirmPw) {
      setconfirmPwValid(false);
    } else setconfirmPwValid(true);
  };

  //* 닉네임 정규식
  const handleName = (e) => {
    setName(e.target.value);
    const regex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    if (regex.test(e.target.value)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // const onClickConfirmButton = () => {
  //   if (email === User.email && pw === User.pw) {
  //     alert("로그인에 성공했습니다.");
  //   } else {
  //     alert("등록되지 않은 회원입니다.");
  //   }
  // };

  return (
    <LoginWrap>
      <LoginContaier>
        <H1>SaveDuck</H1>
        <H2>Record everything. The duck will show you the way.</H2>

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
              {emailValid ? (
                <div style={{ color: "green" }}>! 사용가능한 이메일입니다.</div>
              ) : (
                <div></div>
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
                <div>
                  ! 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                </div>
              )}
              {pwValid ? (
                <div style={{ color: "green" }}>
                  ! 사용가능한 비밀번호입니다.
                </div>
              ) : (
                <div></div>
              )}
            </ErrorMessgeWrap>
          </div>
          <div>
            <InputTitle>비밀번호 확인</InputTitle>

            <InputWrap>
              <Input
                type="password"
                className="input"
                placeholder="입력한 비밀번호를 다시 한번 입력해주세요."
                value={confirmPw}
                onChange={handleConfirmPw}
              />
            </InputWrap>
            <ErrorMessgeWrap>
              {confirmPw.length == 0 ? (
                <div></div>
              ) : pw === confirmPw ? (
                <div style={{ color: "green" }}>! 비밀번호가 일치합니다.</div>
              ) : (
                <div>! 비밀번호가 일치하지 않습니다.</div>
              )}
            </ErrorMessgeWrap>
          </div>
          <div>
            <InputTitle>닉네임</InputTitle>

            <InputWrap>
              <Input
                type="text"
                className="input"
                placeholder="닉네임은 영문, 숫자, 한글로 2 ~ 8자만 가능합니다 "
                value={name}
                onChange={handleName}
              />
            </InputWrap>
            <ErrorMessgeWrap onChange={handleConfirmPw}>
              {!nameValid && name.length > 0 && (
                <div>! 사용할 수 없는 닉네임입니다.</div>
              )}
              {nameValid ? (
                <div style={{ color: "green" }}>! 사용가능한 닉네임입니다.</div>
              ) : (
                <div></div>
              )}
            </ErrorMessgeWrap>
          </div>
        </ContentWrap>

        <ButtonWrap>
          <ButtonSign>
            <div>
              <SignUpSummit onClick={onClickSummit} disabled={notAllow}>
                회원가입
              </SignUpSummit>
            </div>
          </ButtonSign>
        </ButtonWrap>
      </LoginContaier>
    </LoginWrap>
  );
}

export default SignUpComponent;
