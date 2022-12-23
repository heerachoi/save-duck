import React from "react";
import {
  StyledProfileButton,
  StyledLogoutButton,
  StyledVector,
  Container,
  StyledblankProfilesImg,
  ProfileImageContainer,
  CameraContainer,
  CameraImage,
} from "./Modal.js";

export default function Modal() {
  return (
    <>
      <Container>
        <ProfileImageContainer>
          <StyledblankProfilesImg src="blankProfiles.png" />
        </ProfileImageContainer>
        <CameraContainer>
          <CameraImage src="camera.png" alt="" />
        </CameraContainer>
        <h3>
          AppleDuck <StyledVector src="Vector.png" />
        </h3>
        <StyledProfileButton>프로필변경</StyledProfileButton>
        <StyledLogoutButton>로그아웃</StyledLogoutButton>
      </Container>
    </>
  );
}
