import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { authService } from '../../firebase';
import 'firebase/firestore';
import {
  H1,
  H2,
  SignupWrap,
  SignupContaier,
  SignupTitle,
  Emailform,
  SignUpSubmit,
  Label,
  Input,
  InputTitle,
  InputWrap,
  passwordWrp,
  ContentWrap,
  EmailWrap,
  ErrorMessgeWrap,
  PasswordWrap,
} from './SignUp.js';

import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import React from 'react';
import { useAuth } from '../../firebase.js';

const SignUpComponent = () => {
  // 초기값 세팅 - 아이디, 닉네임, 비밀번호, 비밀번호확인, 이메일, 전화번호, 생년월일
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = useState('');

  // 오류메세지 상태 저장
  const [emailMessage, setEmailMessage] = React.useState('');
  const [passwordMessage, setPasswordMessage] = React.useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = React.useState('');
  const [nameMessage, setNameMessage] = React.useState('');

  // 유효성 검사
  const [isname, setIsName] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);

  // 회원가입 버튼 활성화
  const [notAllow, setNotAllow] = useState(true);

  const auth = getAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(authService, email, password);
      alert('SaveDuck 회원이 되신걸 환영합니다.');
      window.location.href = '/home';
      // await createUserWithEmailAndPassword(authService, email, password);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  console.log('email:', email, 'passord:', password);
  //
  useEffect(() => {
    if (isname && isPassword && isPasswordConfirm && isEmail) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [isname, isPassword, isPasswordConfirm, isEmail]);
  console.log(isEmail, isname, isPassword, isPasswordConfirm);

  //회원가입 완료
  const onClickSummit = () => {
    alert('SaveDuck 회원이 되신걸 환영합니다.');
    window.location.href = '/home';
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage(<div style={{ color: 'red' }}>! 잘못된 이메일 주소입니다.</div>);
      setIsEmail(false);
    } else {
      setEmailMessage(<div style={{ color: 'green' }}>! 사용가능한 이메일입니다.</div>);
      setIsEmail(true);
    }
  };

  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 5) {
      setNameMessage(<div style={{ color: 'red' }}>! 닉네임은 2글자 이상 5글자 이하로 입력해주세요!</div>);
      setIsName(false);
    } else {
      setNameMessage(<div style={{ color: 'green' }}>! 사용가능한 닉네임입니다.</div>);
      setIsName(true);
    }
  };

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(<div style={{ color: 'red' }}>! 비밀번호는 영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>);
      setIsPassword(false);
    } else {
      setPasswordMessage(<div style={{ color: 'green' }}>! 사용가능한 비밀번호입니다.</div>);
      setIsPassword(true);
    }
  };
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage(<div style={{ color: 'red' }}>! 비밀번호가 일치하지않습니다</div>);
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage(<div style={{ color: 'green' }}>! 비밀번호가 일치합니다.</div>);
      setIsPasswordConfirm(true);
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
          <form onSubmit={onSubmit} className='form'>
            <EmailWrap>
              <InputTitle placeholder='saveduck@saveduck.com' htmlFor='email'>
                Email
              </InputTitle>
              <Input id='email' name='name' value={email} onChange={onChangeEmail} />
              <ErrorMessgeWrap>
                <div className='message'>{emailMessage}</div>
              </ErrorMessgeWrap>
            </EmailWrap>
            <label htmlFor='name'>Nick Name</label>
            <Input id='name' name='name' value={name} onChange={onChangeName} />
            <ErrorMessgeWrap>
              <div className='message'>{nameMessage}</div>
            </ErrorMessgeWrap>
            <PasswordWrap>
              <label htmlFor='password'>Password</label>
              <Input id='password' name='password' value={password} onChange={onChangePassword} />
              <ErrorMessgeWrap>
                <div className='message'>{passwordMessage}</div>
              </ErrorMessgeWrap>
              <label htmlFor='passwordConfirm'>Password Confirm</label>
              <Input id='passwordConfirm' name='passwordConfirm' value={passwordConfirm} onChange={onChangePasswordConfirm} />
              <ErrorMessgeWrap>
                <div className='message'>{passwordConfirmMessage}</div>
              </ErrorMessgeWrap>
            </PasswordWrap>
            <SignUpSubmit onClick={onClickSummit} disabled={notAllow}>
              회원가입
            </SignUpSubmit>
          </form>
        </SignupContaier>
      </ContentWrap>
    </SignupWrap>
  );
};

export default SignUpComponent;