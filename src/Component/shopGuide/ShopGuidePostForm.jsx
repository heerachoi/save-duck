import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addpost } from '../../redux/modules/list';
import nextId from 'react-id-generator';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import moment from 'moment';
import { storage } from "../../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL, uploadString } from "firebase/storage";
import firebase from 'firebase/app';
import 'firebase/functions';
import { authService } from '../../firebase';
import { getAuth } from "firebase/auth";
import { useAuth } from '../../firebase.js';


// Form 컴포넌트를 생성 후 useState를 통해 lists 객체를 생성한다. lists 객체의 키값은 id,number, title, username,date, profilepicture, description 이다.
const Form = ({ userObj }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 사진 업로드 용 정의
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
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
      const imageResponse = await uploadString(imageRef, imageUrl, "data_url");
      downloadimage = await getDownloadURL(imageResponse.ref);
    }
    console.log(downloadimage)
    console.log(userObj)
    try {
      await addDoc(collection(db, 'posting'), {
        id: uuidv4(),
        title: title,
        description: description,
        created: moment().format('YYYY-MM-DD'),
        image: downloadimage,
        // user: userObj.displayName,
        creatorid: currentUser.uid, // 고정

      });

      //  CreatorId와 currentUser.uid가 같으면 해당 게시물을 삭제할 수 있도록 한다.
      // true or false 값을 가진 isOnwer 함수를  생성한다.
      // const isOwner = (posting) => {
      //   if (posting.creatorid === currentUser.uid) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }



    } catch (err) {
      alert(err);
    }
  };




  const previousPageHanlder = () => {
    navigate(-1, true);
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
      id: nextId(),
    });
  };

  const onFileChange = (event) => {
    const theFile = event.target.files[0];
    setUploadImage(theFile);

    console.log("the File : ", theFile);
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) => {
      const imgDataUrl = finishedEvent.currentTarget.result;
      localStorage.setItem("imgDataUrl", imgDataUrl);
      document.getElementById("view").src = imgDataUrl;
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
      <StSGPPhotoInput onChange={onFileChange}>
        <label htmlFor='ex_file'>
          <input
            type='file'
            id='ex_file'
            accept='image/jpg, image/png, image/jpeg'
            onChange={(e) => onImageChange(e)}
          />
          <div className='btnStart'>
            <img src={'camera.png'} id="view" alt=' 클릭시 사진을 삽입할 수 있습니다.' />
            <div className='submitPic'>사진 등록</div>
          </div>
        </label>

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
        <StSGPSubmitButton
          type='submit'
          onClick={() => {
            previousPageHanlder();
            alert('게시글이 성공적으로 저장되었습니다.');
          }}
        >
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


const StSGPInfo = styled.div``;

const StSGPInputContainer = styled.form`
  margin-top: 4rem;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  background-color: white;
`;

const StSGPTitleInput = styled.input`
  margin-top: 2rem;
  width: 600px;
  height: 40px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  outline: hidden;
  border: none;
`;

const StSGPPhotoInput = styled.div`
  margin-bottom: 1rem;
  width: 300px;
  height: 30px;
  background-color: #ffc226;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;

  .btnStart {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .submitPic {
    position: absolute;
    top: px;
    width: 80px;
    height: 15px;
    font-size: 12px;
    color: white;
    margin: 10px 0 0px 110px;
  }

  img {
    max-width: 20px;
    margin-left: 80px;
    margin-top: 7px;
  }

  label {
    width: 300px;
    height: 40px;
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

const StSGPDescriptionInput = styled.textarea`
  width: 700px;
  height: 200px;
  background-color: #f5f5f5;
  outline: none;
  border: none;
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
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: white;
  font-size: 10px;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;
`;

const StSGPCancelButton = styled(NavLink)`
  display: inline-block;
  border: none;
  background-color: #ffc226;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  color: white;
  font-size: 18px;
  margin-left: 15px;
  position: relative;
  line-height: 350%;
  text-align: center;
`;

export default Form;
