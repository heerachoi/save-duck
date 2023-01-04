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
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import defaultProfileImg from '../../image/default_profile.webp';

export default function Modal() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(defaultProfileImg);
  const [updateProfileInput, setUpdateProfileInput] = useState('');
  const [updateNickName, setUpdateNickName] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const profileName = useSelector((state) => state.profileName);
  // const [profileName, setProfileName] = useState(currentUser.profileName);
  // const [uploadImage, setUploadImage] = useState();
  // 회수 수정
  const [attachment, setAttachment] = useState();

  const dispatch = useDispatch(); // 디스패치 함수
  const navigate = useNavigate();

  // function handleChange(e) {
  //   if (e.target.files[0]) {
  //     setPhoto(e.target.files[0]);
  //   }
  // }

  function handleClick() {
    console.log('handle');
    console.log(currentUser.uid);
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  // const theFile = test;
  // onFileChange는 사용자가 인풋에 파일을 업로드 했을때 실행된다.
  // oneFileChange 를 통해 사진이 업로드 되기 전 미리보기 기능을 구현한다.
  const onFileChange = (event) => {
    // const theFile = event.target.files[0];
    // setUploadImage(theFile);

    // console.log('the File : ', theFile);
    // const reader = new FileReader();
    // reader.readAsDataURL(theFile);
    // reader.onloadend = (finishedEvent) => {
    //   const imgDataUrl = finishedEvent.currentTarget.result;
    //   localStorage.setItem('imgDataUrl', imgDataUrl);
    //   document.getElementById('profileView').src = imgDataUrl;
    // };
    //회수 수정
    console.log(event.target);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    // console.log(theFile);
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
    reader.readAsDataURL(theFile);
  };

  // console.log(profileName);

  const modifyProfileButtonHandler = (id) => {
    dispatch(modifyProfile(id));
    setReadOnly(false);
  };

  const onChangeProfile = (event) => {
    const { value } = event.target;
    // console.log(currentUser);
    // console.log(value);
    setUpdateNickName(value);
  };
  // const updateCompleteButtonHandler = (item) => {
  //   dispatch(updateProfile(item));
  //   dispatch(modifyProfile(item.id));

  // };
  const updateCompleteButtonHandler = async (id) => {
    console.log(updateProfileInput);
    console.log(id);
    const docRef = doc(db, 'users', id);
    console.log(docRef);
    try {
      await updateDoc(docRef, {
        // nickname: updateProfileInput,
        nickname: id.profile,
      });
    } catch (event) {
      console.log('error');
    }
    setReadOnly(true);
  };

  const onLogOutClick = async () => {
    try {
      authService.signOut();
      // await logout();
      navigate('/');
      window.location.href = '/';
      alert('로그아웃 되었습니다.');
    } catch (e) {
      console.log(e.message);
    }
    // authService.signOut();
    // window.location.href = '/';
  };

  return (
    <div>
      <Container>
        <ProfileImageContainer>
          <label htmlFor='imgInput'>
            {/* <img
              src={photoURL}
              id='profileView'
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            /> */}
            <img
              src={attachment ? attachment : photoURL}
              // id='profileView'
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            {/* <input
              style={{ display: 'none' }}
              type='file'
              id='imgInput'
              accept='image/*'
              onChange={handleChange}
            /> */}
            <input
              style={{ display: 'none' }}
              type='file'
              id='imgInput'
              accept='image/*'
              onChange={onFileChange}
            />
          </label>
        </ProfileImageContainer>
        <CameraContainer>
          <CameraImage src='camera.png' alt='' />
        </CameraContainer>
        <StyledProfileForm onSubmit={onFileChange}>
          {profileName.map((item) => {
            return (
              <StyledDivBox key={item.id}>
                {/* {console.log(item)} */}
                <StyledProfileInput
                  readOnly={readOnly}
                  onChange={onChangeProfile}
                  defaultValue={item.profile}
                />
                <StyledVector
                  onClick={() => {
                    modifyProfileButtonHandler(item.id);
                    console.log(item.id);
                    window.confirm('수정 하시겠습니까?');
                  }}
                  src='Vector.png'
                />
                <StyledCheckButton
                  onClick={(event) => {
                    event.preventDefault();
                    updateCompleteButtonHandler(item.id);
                    alert('수정 완료!!');
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
