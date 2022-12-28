import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import githubimg from '../../image/githubicon.png';
import googleimg from '../../image/googleicon.png';

export const LoginWrap = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const LoginContaier = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const H2 = styled.h2`
  font-size: 30px;
  letter-spacing: 2px;
  padding-bottom: 40px;
  font-weight: 600;
`;

export const EmaillWrap = styled.div`
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const PasswordWrap = styled.div`
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  text-align: left;
`;

//* Input part
export const InputTitle = styled.div`
  font-size: 14px;
  margin-top: 30px;
  font-weight: 700;
`;

export const InputWrap = styled.div`
  width: 400px;
  /* padding: 16px; */
  /* margin-top: 8px; */
  /* margin-left: 150px; */
  background-color: white;
  border: 1px solid #e1e1e1;
  border: none;
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
    /* border: 2px solid blue; */
  }
`;
export const Box = styled.div`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background-color: #000;
  position: fixed;
`;
//* Btn Part
export const ButtonWrap = styled.div`
  /* margin-top: 30px; */
`;

export const ButtonSign = styled.section`
  /* margin-top: 50px; */
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 30px 0px;
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

export const SocialLoginBtn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SignInBtn = styled(Button)`
  cursor: pointer;
  width: 400px;
  height: 50px;
  background-color: #ffc226;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 15px;
  letter-spacing: -0.03px;
`;

export const SignUpBtn = styled(Button)`
  cursor: pointer;
  width: 400px;
  height: 50px;
  border: 1px solid #ffc226;
  font-weight: 700;
  border-radius: 12px;
  font-size: 15px;
  letter-spacing: -0.03px;
  background-color: transparent;
  color: #ffc226;
  outline: none;
`;

export const GoogleBtn = styled(Button)`
  cursor: pointer;
  width: 400px;
  height: 50px;
  border: 1px solid #e1e1e1;
  font-weight: 600;
  border-radius: 12px;
  font-size: 15px;
  letter-spacing: -0.03px;
  background-color: transparent;
  outline: none;
  display: flex;
  flex-direction: row;
  gap: 120px;
  align-items: center;
`;

export const GithubBtn = styled(Button)`
  cursor: pointer;
  width: 400px;
  height: 50px;
  border: 1px solid #e1e1e1;
  font-weight: 600;
  border-radius: 12px;
  font-size: 15px;
  letter-spacing: -0.03px;
  background-color: transparent;
  outline: none;
  display: flex;
  flex-direction: row;
  gap: 120px;
  align-items: center;
`;

export const ErrorMessgeWrap = styled.div`
  /* padding-left: 170px; */
  /* text-align: left; */
  color: #ef0000;
  font-size: 12px;
`;

export const GitImgContainer = styled.img.attrs({
  src: `${githubimg}`,
})`
  width: 24px;
  height: 24px;
  padding-left: 10px;
`;

export const GogImgContainer = styled.img.attrs({
  src: `${googleimg}`,
})`
  width: 24px;
  height: 24px;
  padding-left: 10px;
`;

export const ErrorpasswordWrap = styled.div``;

// nvibar 안보이도록
// 소셜로그인 btn 수정
// background 오리 애니메이션 구현.
// 회원가입 Html.css 완성
// firebase 연동해서 로그인정보, 회원정보 가져오기
