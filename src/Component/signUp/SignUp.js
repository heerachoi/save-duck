import styled from 'styled-components';

export const SignupWrap = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
`;
export const H1 = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;
export const H2 = styled.h2`
  margin-bottom: 100px;
`;
export const SignupTitle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
export const SignupContaier = styled.section`
  text-align: center;
  width: 400px;
`;
export const Emailform = styled.div``;

//input part
export const EmailWrap = styled.label`
  font-size: 17px;
  text-align: left;
  /* background-color: aqua; */
  /* margin-left: 170px; */
  margin-top: 30px;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #e2e0e0;
  font-size: 18px;
  padding: 10px;
  ::placeholder {
    color: #e1e1e1;
    font-size: 13px;
  }
`;

export const InputTitle = styled.div`
  font-size: 17px;
  width: 500px;
  padding: 16px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #e2e0e0;
  border: none;
  text-align: left;
`;

//* Btn Part

export const ButtonSign = styled.section`
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  width: 300px;
  height: 40px;
  margin-top: 10px;
  font-weight: 700;
  cursor: pointer;
  font-size: 15px;
`;

export const SignUpBtn = styled(Button)`
  background-color: transparent;
  border-radius: 7px;
  border: 1px solid #ffc226;
  outline: none;
  padding: 5px;
`;
export const SignUpSubmit = styled(Button)`
  width: 300px;
  margin-top: 40px;
  font-weight: 700;
  font-size: 15px;
  background-color: #ffc226;
  border-radius: 7px;
  border: none;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  :disabled {
    background-color: #dadada;
    color: #fff;
  }
`;
export const ErrorMessgeWrap = styled.div`
  text-align: left;
  color: #ef0000;
  font-size: 12px;
  margin-top: 5px;
`;

export const PasswordWrap = styled.div``;
export const ContentWrap = styled.div``;
export const EmaillWrap = styled.div``;

export const ErrorpasswordWrap = styled.div``;

// nvibar 안보이도록
// 소셜로그인 btn 수정
// background 오리 애니메이션 구현.
// 회원가입 Html.css 완성
// firebase 연동해서 로그인정보, 회원정보 가져오기
