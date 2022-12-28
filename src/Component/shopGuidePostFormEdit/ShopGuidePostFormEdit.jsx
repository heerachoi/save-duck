import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import {
  StSGPInfo,
  StSGPInputContainer,
  StSGPTitleInput,
  StSGPPhotoInput,
  StSGPDescriptionInput,
  StSGPButtonGroup,
  StSGPSubmitButton,
  StSGPCancelButton,
} from './shopGuidePostFormEdit.js';

// Form 컴포넌트를 생성 후 useState를 통해 lists 객체를 생성한다. lists 객체의 키값은 id,number, title, username,date, profilepicture, description 이다.
const ShopGuidePostFormEdit = ({ item, syncpostingstatewithfirestore }) => {
  const param = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadImage, setUploadImage] = useState();

  // 게시글 정보 불러오기
  const getPostingFirebase = async () => {
    const ref = doc(db, 'posting', param.id);
    let res = await getDoc(ref);
    setTitle(res.data().title);
    setDescription(res.data().description);
    return res.data();
  };
  // getPostingFirebase();

  useEffect(() => {
    getPostingFirebase();
  }, []);

  // 게시물 수정사항 입력시 - state 반영하기
  const onChangeTitle = (event) => {
    const { value } = event.target;
    setTitle(value);
  };
  const onChangeDescription = (event) => {
    const { value } = event.target;
    setDescription(value);
  };

  // 게시물 수정사항 입력시 - firebase 반영하기
  const updatePostingFirebase = async () => {
    const ref = doc(db, 'posting', param.id);
    const time = moment().format('YYYY-MM-DD');
    try {
      const response = await updateDoc(ref, {
        title: title,
        description: description,
        created: time,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // 게시물 수정 버튼
  const updatePostButton = async (id) => {
    const ref = doc(db, 'posting', param.id);
    const time = moment().format('YYYY-MM-DD');
    try {
      const response = await updateDoc(ref, {
        title: title,
        description: description,
        created: time,
      });
      window.location.href = '/shopGuide';
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posting'), {
        id: uuidv4(),
        title: title,
        description: description,
        created: moment().format('YYYY-MM-DD'),
      });
      alert('게시글이 성공적으로 저장되었습니다.');
      window.location.href = '/shopGuide';
    } catch (err) {
      alert(err);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  // const onChange = (e) => {
  //   const { name, value } = e.target;
  //   setLists({
  //     ...lists,
  //     [name]: value,
  //     id: nextId(),
  //   });
  // };

  const Back = () => {
    navigate(-1, true);
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
        onChange={onChangeTitle}
        value={title}
        required
      />
      <StSGPPhotoInput onChange={onFileChange}>
        <label htmlFor='ex_file'>
          <div className='btnStart'>
            <img src={'camera.png'} id="view" alt='' />
            <div className='submitPic'>사진 등록</div>
          </div>
        </label>
        <input
          type='file'
          id='ex_file'
          accept='image/jpg, image/png, image/jpeg'
          onChange={(e) => console.log(e.target.files[0])}
        />
      </StSGPPhotoInput>

      <StSGPDescriptionInput
        type='text'
        name='description'
        value={description}
        placeholder='내용을 입력해주세요.'
        onChange={onChangeDescription}
        required
      />

      <StSGPButtonGroup>
        <StSGPSubmitButton type='submit'>Save</StSGPSubmitButton>

        <StSGPCancelButton onClick={Back}>Cancel</StSGPCancelButton>
      </StSGPButtonGroup>
      <StSGPInfo type='text' name='date' value={lists.date}></StSGPInfo>
    </StSGPInputContainer>
  );
};

export default ShopGuidePostFormEdit;
