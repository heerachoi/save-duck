import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addpost } from '../../redux/modules/list';
import nextId from 'react-id-generator';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';



// Form 컴포넌트를 생성 후 useState를 통해 lists 객체를 생성한다. lists 객체의 키값은 id,number, title, username,date, profilepicture, description 이다.
const EditForm = ({ item, syncpostingstatewithfirestore }) => {
  const param = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // 게시글 정보 불러오기
  const getPostingFirebase = async () => {
    const ref = doc(db, 'posting', param.id);
    let res = await getDoc(ref);
    setTitle(res.data().title);
    setDescription(res.data().description);
    return res.data();
  };
  getPostingFirebase();


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
    const ref = doc(db, 'posting', id);
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

  return (
    <StSGPInputContainer onSubmit={handleSubmit}>
      <StSGPTitleInput
        type='text'
        name='title'
        placeholder='제목을 입력하여 주세요.'
        onChange={onChangeTitle}
        defaultValue={title}
        required
      />
      <StSGPPhotoInput>
        <label htmlFor='ex_file'>
          <div className='btnStart'>
            <img src={'camera.png'} alt=' 클릭시 사진을 삽입할 수 있습니다.' />
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
        defaultValue={description}
        placeholder='내용을 입력해주세요.'
        onChange={onChangeDescription}
        required
      />

      <StSGPButtonGroup>
        <StSGPSubmitButton
          type='submit'
          onClick={() => {
            updatePostButton();
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
  resize: none;
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

export default EditForm;
