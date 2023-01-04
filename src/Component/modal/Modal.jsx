import React, { useState, useEffect } from 'react';

import { authService, upload, db } from '../../firebase.js';
import { modifyProfile } from '../../redux/modules/profile.js';
import { useSelector, useDispatch } from 'react-redux';
import {
  collection,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import {
  StyledProfileButton,
  StyledLogoutButton,
  StyledVector,
  Container,
  ProfileImageContainer,
  CameraContainer,
  StyledDivBox,
  StyledCheckButton,
  StyledProfileForm,
  StyledProfileInput,
  StyledEditButton,
  CameraIcon,
} from './Modal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrashCan,
  faCircleUp,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';

export default function Modal() {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('blankProfiles.png');
  const [updateNickName, setUpdateNickName] = useState('');
  const [modify, setModify] = useState(false);
  const [infoId, setInfoId] = useState('');
  const [readOnly, setReadOnly] = useState(true);
  const [uploadImage, setUploadImage] = useState();

  const profileName = useSelector((state) => state.profileName);

  const dispatch = useDispatch(); // 디스패치 함수
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleClick = () => {
    upload(photo, currentUser, setLoading);
  };

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);
  //
  // const theFile = test;
  // onFileChange는 사용자가 인풋에 파일을 업로드 했을때 실행된다.
  // oneFileChange 를 통해 사진이 업로드 되기 전 미리보기 기능을 구현한다.
  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    setUploadImage(theFile);

    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem('imgDataUrl', imgDataUrl);
      document.getElementById('profileView').src = imgDataUrl;
    };
  };

  const modifyProfileButtonHandler = (id) => {
    dispatch(modifyProfile(id));
    setReadOnly(false);
    setModify(true);
  };

  const onChangeProfile = (event) => {
    const { value } = event.target;
    setUpdateNickName(value);
  };

  const updateButtonModify = async (id) => {
    const docRef = doc(db, 'users', id);
    try {
      await updateDoc(docRef, {
        username: updateNickName,
        modify: true,
      });
    } catch (event) {
    } finally {
      modifyProfileButtonHandler(id);
    }
  };

  const updateCompleteButtonHandler = async (id) => {
    const docRef = doc(db, 'users', id);
    try {
      await updateDoc(docRef, {
        username: updateNickName,
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
      navigate('/');
      alert('로그아웃 되었습니다.');
    } catch (e) {
      console.log(e.message);
    }
  };

  const getNickName = () => {
    const q = query(
      collection(db, 'users'),
      where('uid', '==', currentUser.uid)
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
        setInfoId(nickNameList[0].id);
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
          <label htmlFor='imgInput'>
            <img
              src={photoURL}
              id='profileView'
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            <input
              style={{ display: 'none' }}
              type='file'
              id='imgInput'
              accept='image/*'
              onChange={handleChange}
            />
          </label>
        </ProfileImageContainer>
        <CameraContainer>
          <CameraIcon icon={faCamera} />
          {/* <CameraImage src='camera.png' alt='' /> */}
        </CameraContainer>
        <StyledProfileForm onSubmit={onFileChange}>
          <StyledDivBox key={profileName.id}>
            <StyledProfileInput
              readOnly={readOnly}
              onChange={onChangeProfile}
              value={updateNickName}
              maxLength='8'
            />
            {modify ? (
              <StyledCheckButton
                onClick={(event) => {
                  event.preventDefault();
                  updateCompleteButtonHandler(infoId);
                }}
                icon={faCheck}
              />
            ) : (
              ''
            )}
            {/* <StyledVector
              onClick={() => {
                updateButtonModify(infoId);
              }}
              src='Vector.png'
            /> */}
            <StyledEditButton
              onClick={() => {
                updateButtonModify(infoId);
              }}
              id='articleEditButton'
              icon={faPen}
              style={{ cursor: 'pointer' }}
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
