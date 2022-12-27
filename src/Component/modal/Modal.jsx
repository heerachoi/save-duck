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
import { useState, useEffect } from "react";
import { useAuth, upload } from "../../firebase.js";
import { modifyProfile, updateProfile } from "../../redux/modules/profile.js";
import { useSelector, useDispatch } from "react-redux";
import { authService } from "../../firebase.js";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";

export default function Modal() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("blankProfiles.png");
  const [updateProfileInput, setUpdateProfileInput] = useState("");

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    console.log("handle");
    console.log(currentUser.uid);
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  const [uploadImage, setUploadImage] = useState();

  // const theFile = test;
  // onFileChange는 사용자가 인풋에 파일을 업로드 했을때 실행된다.
  const onFileChange = (event) => {
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

  // console.log(profileName);

  const dispatch = useDispatch(); // 디스패치 함수
  const [readOnly, setReadOnly] = useState(true);
  // const [updateProfileInput, setUpdateProfileInput] = useState("");

  const modifyProfileButtonHandler = (id) => {
    dispatch(modifyProfile(id));
    setReadOnly(false);
  };

  const onChangeProfile = (event) => {
    const { value } = event.target;
    console.log(currentUser);
    console.log(value);
    setUpdateProfileInput(value);
  };
  const updateCompleteButtonHandler = (item) => {
    dispatch(updateProfile(item));
    dispatch(modifyProfile(item.id));
    setReadOnly(true);
  };

  const onLogOutClick = () => {
    authService.signOut();
    window.location.href = "/signin";
  };

  return (
    <div>
      <Container>
        <ProfileImageContainer>
          <label htmlFor="imgInput">
            <img src={photoURL} id="profileView" />
            <input
              style={{ display: "none" }}
              type="file"
              id="imgInput"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </ProfileImageContainer>
        <CameraContainer>
          <CameraImage src="camera.png" alt="" />
        </CameraContainer>
        <StyledProfileForm onSubmit={onFileChange}>
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
            disabled={loading || !photo}
            onClick={handleClick}
          >
            프로필변경
          </StyledProfileButton>
        </StyledProfileForm>
        <StyledLogoutButton onClick={onLogOutClick}>
          로그아웃
        </StyledLogoutButton>
      </Container>
    </div>
  );
}
