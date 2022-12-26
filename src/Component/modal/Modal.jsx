import React from "react";
import {
  StyledProfileButton,
  StyledLogoutButton,
  StyledVector,
  Container,
  ProfileImageContainer,
  CameraContainer,
  CameraImage,
  StyledDivBox,
  StyledCheckButton,
  StyledProfileForm,
  StyledProfileInput,
} from "./Modal.js";
import { useState } from "react";
import { modifyProfile, updateProfile } from "../../redux/modules/profile.js";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase.js";


export default function Modal() {
  const storage = getStorage();

  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      document.getElementById("profileView").src = imgDataUrl;
      const storageRef = storage.ref();
      const saveRoot = storageRef.child("image/" + theFile.name);
      const 업로드작업 = saveRoot.put(theFile);
    };
  };

  const profileName = useSelector((state) => state.profileName);

  console.log(profileName);

  const dispatch = useDispatch(); // 디스패치 함수
  const [readOnly, setReadOnly] = useState(true);
  const [updateProfileInput, setUpdateProfileInput] = useState("");

  const modifyProfileButtonHandler = (id) => {
    dispatch(modifyProfile(id));
    setReadOnly(false);
  };

  const onChangeProfile = (event) => {
    const { value } = event.target;
    console.log(value);
    setUpdateProfileInput(value);
  };
  const updateCompleteButtonHandler = (item) => {
    dispatch(updateProfile(item));
    dispatch(modifyProfile(item.id));
    setReadOnly(true);
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
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
        <StyledProfileForm onSubmit={handleProfileSubmit}>
          {profileName.map((item) => {
            return (
              <StyledDivBox key={item.id}>
                <StyledProfileInput
                  readOnly={readOnly}
                  onChange={onChangeProfile}
                  defaultValue={item.profile}
                />
                <StyledVector
                  onClick={() => {
                    modifyProfileButtonHandler(item.id);
                    console.log(item.id);
                    window.confirm("수정 하시겠습니까?");
                  }}
                  src="Vector.png"
                />
                <StyledCheckButton
                  onClick={() => {
                    updateCompleteButtonHandler(item.id);
                    alert("수정 완료!!");
                  }}
                >
                  ✔️
                </StyledCheckButton>
              </StyledDivBox>
            );
          })}
          <StyledProfileButton
            onClick={() => {
              alert("프로필 변경 완료!");
            }}
          >
            프로필변경
          </StyledProfileButton>
        </StyledProfileForm>
        <StyledLogoutButton>로그아웃</StyledLogoutButton>
      </Container>
    </div>
  );
}
