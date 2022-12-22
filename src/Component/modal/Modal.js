import styled from "styled-components";

export const StyledProfileButton = styled.button`
  background-color: white;
  border: 1px solid #ffc226;
  width: 150px;
  border-radius: 10px;
  margin-bottom: 8px;
  cursor: pointer;
`;

export const StyledLogoutButton = styled.button`
  background-color: white;
  border: 1px solid #ffc226;
  width: 150px;
  border-radius: 10px;
  cursor: pointer;
`;

export const StyledVector = styled.img`
  margin-left: 10px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  text-decoration: none;
  color: black;
  width: 400px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  border: 1px solid black;
  border-radius: 8px;
`;
