import React from 'react';
import { StyledProfileButton, StyledLogoutButton, StyledVector, Container, ProfileImageContainer, CameraContainer, CameraImage, StyledprofileName } from './Modal.js';

export default function Modal() {
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem('imgDataUrl', imgDataUrl);
      document.getElementById('profileView').src = imgDataUrl;
    };
  };
  return (
    <div>
      <Container>
        <ProfileImageContainer>
          <label htmlFor='imgInput'>
            <img src='blankProfiles.png' id='profileView' />
            <input type='file' id='imgInput' accept='image/*' onChange={onFileChange} />
          </label>
        </ProfileImageContainer>
        <CameraContainer>
          <CameraImage src='camera.png' alt='' />
        </CameraContainer>
        <StyledprofileName>
          AppleDuck <StyledVector src='Vector.png' />
        </StyledprofileName>
        <StyledProfileButton
          onClick={() => {
            alert('변경 완료');
          }}
        >
          프로필변경
        </StyledProfileButton>
        <StyledLogoutButton>로그아웃</StyledLogoutButton>
      </Container>
    </div>
  );
}
