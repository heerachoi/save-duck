import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledProfileButton = styled.button`
  margin-left: 28px;
  color: #000;
  border: 1px solid #ffc226;
  width: 200px;
  height: 30px;
  border-radius: 30px;
  margin-top: 15px;

  cursor: pointer;
  &:hover {
    background-color: #ffc226;
    color: #fff;
  }
`;

export const ProfileImageContainer = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  /* object-fit: cover; */
  background-color: transparent;
  border: 1px solid transparent;
  overflow: hidden;
`;

export const ProfileImageInput = styled.input`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

export const CameraContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  border: 1px solid black;
  position: absolute;
  bottom: 230px;
  right: 110px;
`;

export const CameraIcon = styled(FontAwesomeIcon)`
  width: 20px;
`;

export const StyledLogoutButton = styled.button`
  background-color: white;
  border: 1px solid #ffc226;
  width: 200px;
  height: 30px;
  border-radius: 30px;
  margin-top: 10px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: #ffc226;
    color: #fff;
  }
`;

export const StyledEditButton = styled(FontAwesomeIcon)`
  margin-right: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: #808080;
  }
`;

// export const StyledVector = styled.img`
//   margin-right: 10px;
//   padding-top: 10px;
//   margin-bottom: 10px;
//   cursor: pointer;
// `;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  color: black;
  width: 400px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  position: absolute;
  bottom: -503px;
  right: 20px;

  /* 모달창 디자인 */
  border: 1px solid #ddd;
  box-shadow: 3px 3px 10px 3px #eee;
  border-radius: 10px;
`;

export const StyledblankProfilesImg = styled.img`
  margin-bottom: 10px;
`;
export const StyledprofileName = styled.h3``;

export const StyledDivBox = styled.div`
  margin-left: 55px;
  display: flex;
  align-items: center;
  width: 200px;
`;
export const StyledCheckButton = styled(FontAwesomeIcon)`
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 18px;
  position: relative;
  bottom: 1px;
  right: 8px;
  margin-left: 5px;
  &:hover {
    color: #808080;
  }
`;

export const StyledProfileForm = styled.form`
  margin-top: 10px;
  /* margin-bottom: 10px; */
`;
export const StyledProfileInput = styled.input`
  height: 20px;
  width: 160px;
  outline: none;
  border: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
