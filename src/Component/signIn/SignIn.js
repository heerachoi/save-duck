import styled from "styled-components";



export const LoginWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const H2 = styled.h2`
  margin-bottom: 100px;
`;
export const LoginContaier = styled.section`
  text-align: center;
  width: 800px;
`;
export const InputTitle = styled.div`
  font-size: 20px;
  text-align: left;
  /* background-color: aqua; */
  margin-left: 170px;
  margin-top: 30px;
`;
export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #e2e0e0;
  font-size: 18px;
  ::placeholder {
    color: #dadada;
    font-size: 15px;
  }
`;

export const InputWrap = styled.div`
  width: 500px;
  padding: 16px;
  margin-top: 8px;
  margin-left: 150px;
  background-color: white;
  border: 1px solid #e2e0e0;
  border: none;
`;

//* Btn Part

export const ButtonWrap = styled.div`
  margin-top: 50px;
`;

export const ButtonSign = styled.section`
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  width: 300px;
  margin-top: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 15px;
`;

export const SignInBtn = styled(Button)`
  background-color: #ffc226;
  border-radius: 7px;
  border: none;
  color: white;
  padding: 5px;
`;

export const SignUpBtn = styled(Button)`
  background-color: transparent;
  border-radius: 7px;
  border: 1px solid #ffc226;
  outline: none;
  padding: 5px;
`;

export const ContentWrap = styled.div``;
export const EmaillWrap = styled.div``;
export const ErrorMessgeWrap = styled.div`
  padding-left: 170px;
  text-align: left;
  color: #ef0000;
  font-size: 12px;
`;

export const ErrorpasswordWrap = styled.div``;

//! nvibar 안보이도록
//! 소셜로그인 btn 수정
//! background 오리 애니메이션 구현.
//! 회원가입 Html.css 완성
//! firebase 연동해서 로그인정보, 회원정보 가져오기

