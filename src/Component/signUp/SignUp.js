import styled from "styled-components";

export const SignupWrap = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
`;
export const SignupContitair = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-left: ;
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
  width: 800px;
`;
export const Emailform = styled.div``;

//input part
export const InputTitle = styled.label`
  font-size: 15px;
  margin-top: 30px;
  font-weight: 700;
  text-align: left;
`;

export const Input = styled.input`
  width: 400px;
  border: none;
  outline: none;
  border-bottom: 1px solid #e1e1e1;
  font-size: 14px;
  margin: 10px 0px 5px 0px;
  padding-bottom: 5px;
  ::placeholder {
    color: #e1e1e1;
    font-size: 13px;
  }
  &:hover {
    border-bottom: 2px solid #222;
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

export const ButtonSign = styled.section`
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  border: none;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 2px;
  font-weight: 700;
  height: 52px;
  border-radius: 12px;
  background-color: transparent;
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
  margin-top: 10px;
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
  padding-left: 100px;
  text-align: left;
  color: #ef0000;
  font-size: 12px;
  margin-bottom: 40px;

  padding-top: 5px;
`;

export const ContentWrap = styled.div``;
export const EmailWrap = styled.div``;

export const ErrorpasswordWrap = styled.div``;

// nvibar 안보이도록
// 소셜로그인 btn 수정
// background 오리 애니메이션 구현.
// 회원가입 Html.css 완성
// firebase 연동해서 로그인정보, 회원정보 가져오기

