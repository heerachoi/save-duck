import styled from "styled-components";

export const StyledProfileButton = styled.button`
  margin-left: 28px;
  background-color: white;
  border: 1px solid #ffc226;
  width: 200px;
  height: 30px;
  border-radius: 30px;
  margin-bottom: 8px;
  margin-top: 10px;
  cursor: pointer;
`;

export const ProfileImageContainer = styled.div`
  width: 200px;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  object-fit: fill;

  background-color: transparent;
  border: 1px solid transparent;

  overflow: hidden;
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

export const CameraImage = styled.img`
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
`;

export const StyledVector = styled.img`
  margin-right: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  text-decoration: none;
  background-color: white;
  color: black;
  width: 400px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  position: absolute;
  bottom: -503px;
  right: 0;

  /* 모달창 디자인 */
  border: 1px solid black;
  border-radius: 8px;
  border-top-right-radius: 0px;
`;

export const StyledblankProfilesImg = styled.img`
  margin-bottom: 10px;
`;
export const StyledprofileName = styled.h3``;

export const StyledDivBox = styled.div`
  margin-left: 55px;
  display: flex;
`;
export const StyledCheckButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 18px;
  position: relative;
  bottom: 1px;
  right: 8px;
`;

export const StyledProfileForm = styled.form`
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const StyledProfileInput = styled.input`
  border: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
