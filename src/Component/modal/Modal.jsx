import React from "react";
import {
  StyledProfileButton,
  StyledLogoutButton,
  StyledVector,
  Container,
} from "./Modal.js";

export default function Modal() {
  return (
    <>
      <Container>
        <img src="blankProfiles.png" />
        <h3>
          AppleDuck <StyledVector src="Vector.png" />
        </h3>
        <StyledProfileButton>프로필변경</StyledProfileButton>
        <StyledLogoutButton>로그아웃</StyledLogoutButton>
      </Container>
    </>
  );
}
