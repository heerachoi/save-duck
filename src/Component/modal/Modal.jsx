import React from 'react';
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
} from './Modal.js';
import { useState, useEffect } from 'react';
import { useAuth, upload } from '../../firebase.js';
import { modifyProfile, updateProfile } from '../../redux/modules/profile.js';
import { useSelector, useDispatch } from 'react-redux';
import { authService } from '../../firebase.js';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase.js';
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  setDoc,
  doc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function Modal() {
  // const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("blankProfiles.png");
  const [updateProfileInput, setUpdateProfileInput] = useState("");
  const [updateNickName, setUpdateNickName] = useState("");
  const [modify, setModify] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  // console.log("currentUser", currentUser);
  // const [id, setId] = useState(currentUser.uid);

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    // console.log("handle");
    // console.log(currentUser.uid);
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
  // oneFileChange 를 통해 사진이 업로드 되기 전 미리보기 기능을 구현한다.
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    setUploadImage(theFile);

    // console.log("the File : ", theFile);
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
    setModify(true);
  };

  const onChangeProfile = (event) => {
    const { value } = event.target;
    // console.log(currentUser);
    setUpdateNickName(value);
  };

  const updateButtonModify = async (id) => {
    const docRef = doc(db, "users", id);
    try {
      const response = await updateDoc(docRef, {
        username: updateProfileInput,
        modify: true,
      });
    } catch (event) {
    } finally {
      // console.log('수정 완료 end');
      modifyProfileButtonHandler(id);
    }
  };

  const updateCompleteButtonHandler = async (id) => {
    const docRef = doc(db, "users", currentUser.id);
    console.log("docRef", docRef);
    try {
      const response = await updateDoc(docRef, {
        username: updateProfileInput,
        modify: false,
      });
    } catch (event) {
      console.log(event.message);
    } finally {
      modifyProfileButtonHandler(id);
    }
    setReadOnly(true);
    setModify(false);
    setUpdateNickName(updateNickName);
  };

  const onLogOutClick = async () => {
    try {
      authService.signOut();
      // await logout();
      navigate("/");
      // window.location.href = '/';
      alert("로그아웃 되었습니다.");
    } catch (e) {
      console.log(e.message);
    }
    // authService.signOut();
    // window.location.href = '/';
  };

  const getNickName = () => {
    const q = query(
      collection(db, "users"),
      where("uid", "==", currentUser.uid)
    );
    getDocs(q).then((querySnapshop) => {
      const nickNameList = [];
      querySnapshop.forEach((doc) => {
        nickNameList.push({
          id: doc.data().id,
          uid: doc.data().uid,
          email: doc.data().email,
          username: doc.data().username,
          modify: doc.data().modify,
        });
        setUpdateNickName(nickNameList[0].username);
        setModify(modify);
        // setId(id);
        // console.log("id", id);
        // console.log(id);
      });
    });
  };

  useEffect(() => {
    getNickName();
  }, []);
  return (
    <div>
      <Container>
        <ProfileImageContainer>
          <label htmlFor="imgInput">
            <img
              src={photoURL}
              id="profileView"
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
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
          <StyledDivBox key={profileName.id}>
            <StyledProfileInput
              readOnly={readOnly}
              onChange={onChangeProfile}
              value={updateNickName}
              maxLength="8"
            />
            {modify ? (
              <StyledCheckButton
                onClick={(event) => {
                  event.preventDefault();
                  updateCompleteButtonHandler(id);
                  alert("수정 완료!!");
                }}
              >
                v
              </StyledCheckButton>
            ) : (
              ""
            )}

            <StyledVector
              onClick={() => {
                modifyProfileButtonHandler(id);
                window.confirm("수정 하시겠습니까?");
              }}
              src="Vector.png"
            />
          </StyledDivBox>
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
