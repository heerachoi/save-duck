import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addpost } from '../../redux/modules/list';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import moment from 'moment';
import { storage } from '../../firebase.js';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';
import firebase from 'firebase/app';
import 'firebase/functions';
import { authService } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useAuth } from '../../firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faC, faCamera } from '@fortawesome/free-solid-svg-icons';

// Form 컴포넌트를 생성 후 useState를 통해 lists 객체를 생성한다. lists 객체의 키값은 id,number, title, username,date, profilepicture, description 이다.
const Form = ({ userObj }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 사진 업로드 용 정의
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(100);
  const [uploadImage, setUploadImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setUserObj] = useState(null);
  const currentUser = useAuth();

  const onImageChange = (event) => {
    const theFile = event.target.files[0]; // file 객체
    const reader = new FileReader();
    reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
    reader.onloadend = (finished) => {
      setImageUrl(finished.currentTarget.result);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `image/${uuidv4()}`);
    let downloadimage;
    if (imageUrl) {
      const imageResponse = await uploadString(imageRef, imageUrl, 'data_url');
      downloadimage = await getDownloadURL(imageResponse.ref);
    } else {
      downloadimage = '';
    }
    console.log(downloadimage);
    // console.log(userObj)
    // console.log(currentUser.uid)
    // console.log(currentUser.displayName)
    // console.log(title)
    // console.log(description)
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    try {
      await addDoc(
        collection(db, 'posting'),
        {
          id: uuidv4(),
          title: title,
          description: description,
          created: moment().format('YYYY-MM-DD HH:mm:ss'),
          image: downloadimage,
          // user: userObj.displayName,
          creatorid: currentUser.uid, // 고정
        },
        previousPageHanlder()
      );
    } catch (err) {
      alert(err);
    }
  };

  const previousPageHanlder = async () => {
    if (window.confirm('해당 게시글을 등록하시겠습니까?')) {
      alert('등록되었습니다.');
      navigate('/shopGuide');
    } else {
      return;
    }
  };

  const [lists, setLists] = useState({
    id: '',
    number: '',
    title: '',
    username: '',
    date: '',
    profilepicture: '',
    description: '',
  });

  // input 창의 value 값을 변경할 떄 마다 list 객체의 키값에 맞게 setList를 통해 값을 변경한다.
  const onChange = (e) => {
    const { name, value } = e.target;
    setLists({
      ...lists,
      [name]: value,
      id: uuidv4(),
    });
  };

  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    setUploadImage(theFile);

    console.log('the File : ', theFile);
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem('imgDataUrl', imgDataUrl);
      document.getElementById('view').src = imgDataUrl;
    };
  };

  return (
    <StSGPInputContainer onSubmit={handleSubmit}>
      <StSGPTitleInput
        type='text'
        name='title'
        placeholder='제목을 입력하여 주세요.'
        onChange={(e) => setTitle(e.target.value.toUpperCase())}
        value={title}
        required
      />
      <StSGPPhotoInput>
        <label htmlFor='ex_file'>
          <input
            type='file'
            id='ex_file'
            accept='image/jpg, image/png, image/jpeg'
            onChange={(e) => onImageChange(e)}
          />
          <div className='btnStart'>
            <CameraIcon icon={faCamera} />
            <div className='submitPic'>사진 등록</div>
          </div>
        </label>
        <input
          type='file'
          id='ex_file'
          accept='image/jpg, image/png, image/jpeg'
          onChange={(e) => onImageChange(e)}
        />
      </StSGPPhotoInput>

      <StSGPDescriptionInput
        type='text'
        name='description'
        value={description}
        placeholder='내용을 입력해주세요.'
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <StSGPButtonGroup>
        <StSGPSubmitButton type='submit' onClick={() => {}}>
          Save
        </StSGPSubmitButton>

        <StSGPCancelButton to='/shopguide'>Cancel</StSGPCancelButton>
      </StSGPButtonGroup>
      <StSGPInfo
        type='text'
        name='date'
        value={lists.date}
        onChange={onChange}
      ></StSGPInfo>
    </StSGPInputContainer>
  );
};

export default Form;

// const StSGContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: grey;
//   background-size: cover;
// `;

const StSGPInfo = styled.div``;

const StSGPInputContainer = styled.form`
  position: absolute;
  margin-top: 2.5rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  background-color: white;
  /* background-color: grey; */
`;

const StSGPTitleInput = styled.input`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 300;
  margin-top: 2rem;
  width: 600px;
  height: 40px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  padding: 0 10px;
  border-radius: 8px;
  &::placeholder: {
    color: #707070;
  }
`;

const StSGPPhotoInput = styled.div`
  margin-bottom: 1rem;
  width: 120px;
  height: 25px;
  background-color: #ffc226;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  /* flex-direction: row; */
  align-items: center;
  text-align: center;
  line-height: 17px;
  outline: none;
  padding: 5px;
  margin-bottom: 20px;
  &:hover {
    background-color: #ff8a00;
  }

  .btnStart {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 150px;
  }

  .submitPic {
    /* width: 80px; */
    margin-left: 5px;
    height: 15px;
    font-size: 12px;
    color: white;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }

  input[type='file'] {
    position: absolute;
    width: 300px;
    height: 40px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

const CameraIcon = styled(FontAwesomeIcon)`
  font-size: 13px;
  color: #fff;
`;

const StSGPDescriptionInput = styled.textarea`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 300;
  width: 700px;
  height: 200px;
  background-color: #f5f5f5;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 15px;
  resize: none;
  &::placeholder: {
    color: #707070;
  }
`;

const StSGPButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
`;

const StSGPSubmitButton = styled.button`
  display: inline-block;
  border: none;
  background-color: #ff8a00;
  width: 80px;
  height: 35px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 400;
  text-decoration: none;
  color: white;
  font-size: 16px;
  /* margin-left: 15px; */
  margin-right: 10px;
  position: relative;
  &:hover {
    background-color: #ffc226;
  }
`;

const StSGPCancelButton = styled(NavLink)`
  display: inline-block;
  border: none;
  background-color: #ff8a00;
  width: 80px;
  height: 35px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 400;
  text-decoration: none;
  color: white;
  font-size: 16px;
  margin-left: 15px;
  position: relative;
  text-align: center;
  line-height: 33px;
  &:hover {
    background-color: #ffc226;
  }
`;

const StSGBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #ffc226;
`;
