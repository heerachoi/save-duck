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

// 순수 파이어베이스에서 가져온것
import { ref, uploadBytes } from "firebase/storage";

// 이건 너네가 만든 코드
// export const storage = getStorage();
import { storage } from "../../firebase.js";

export default function Modal() {
  const [uploadImage, setUploadImage] = useState();

  // const theFile = test;
  // onFileChange는 사용자가 인풋에 파일을 업로드 했을때 실행된다.
  const onFileChange = (event) => {
    console.log("event.target이 뭐지?", event.target);
    console.log("event.target.files이 뭐지?", event.target.files);
    const theFile = event.target.files[0];
    setUploadImage(theFile);

    console.log("the File : ", theFile);
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      document.getElementById("profileView").src = imgDataUrl;
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

    // const storage = getStorage();
    const storageRef = ref(storage, uploadImage.name);

    uploadBytes(storageRef, uploadImage)
      .then((snapshot) => {
        // console.log("앞에 함수가 실행되고 성공하면 실행할거에요.");
        alert("프로필 변경 완료!");
      })
      .catch(() => {
        console.log("uploadBytes가 실패했다.");
      });
  };

  return (
    <div>
      <Container>
        <ProfileImageContainer>
          <label htmlFor="imgInput">
            <img src="blankProfiles.png" id="profileView" />
            <input
              type="file"
              id="imgInput"
              accept="image/*"
              onChange={onFileChange}
            />
          </label>
        </ProfileImageContainer>
        <CameraContainer>
          <CameraImage src="camera.png" alt="" />
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
          <StyledProfileButton>프로필변경</StyledProfileButton>
        </StyledProfileForm>
        <StyledLogoutButton>로그아웃</StyledLogoutButton>
      </Container>
    </div>
  );
}
