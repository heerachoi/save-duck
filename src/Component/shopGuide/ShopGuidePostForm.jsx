import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addpost } from '../../redux/modules/list';
import nextId from 'react-id-generator';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore'
import moment from 'moment';


// Form 컴포넌트를 생성 후 useState를 통해 lists 객체를 생성한다. lists 객체의 키값은 id,number, title, username,date, profilepicture, description 이다.
const Form = () => {


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'posting'), {
        id: uuidv4(),
        title: title,
        description: description,
        created: moment().format('YYYY-MM-DD')
      })
    } catch (err) {
      alert(err)
    }
  }

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
  const onChange = (e) => {
    const { name, value } = e.target;
    setLists({
      ...lists,
      [name]: value,
      id: nextId()
    });
  };

  return (

    <StSGPInputContainer onSubmit={handleSubmit}>
      <StSGPTitleInput
        type="text"
        name="title"
        placeholder="제목을 입력하여 주세요."
        onChange={(e) => setTitle(e.target.value.toUpperCase())}
        value={title}
        required
      />
      <StSGPPhotoInput>
        <label htmlFor="ex_file">
          <div className="btnStart">
            <img src={'camera.png'} alt=" 클릭시 사진을 삽입할 수 있습니다." /><div className="submitPic">사진 등록</div>
          </div>
        </label>
        <input
          type="file"
          id="ex_file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={(e) => console.log(e.target.files[0])}
        />
      </StSGPPhotoInput>

      <StSGPDescriptionInput
        type="text"
        name="description"
        value={description}
        placeholder="내용을 입력해주세요."
        onChange={(e) => setDescription(e.target.value)}
        required />

      <StSGPButtonGroup>
        <StSGPSubmitButton type='submit' onClick={() => { previousPageHanlder(); alert("게시글이 성공적으로 저장되었습니다.") }}>Save
        </StSGPSubmitButton>

        <StSGPCancelButton to="/shopguide">Cancel
        </StSGPCancelButton>
      </StSGPButtonGroup>
      <StSGPInfo
        type="text"
        name="date"
        value={lists.date}
        onChange={onChange}>
      </StSGPInfo>
    </StSGPInputContainer>

  );
}


const StSGPInfo = styled.div`
`;

const StSGPInputContainer = styled.form`
margin-top : 4rem;
width: 60%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: top;
background-color: white;
`;

const StSGPTitleInput = styled.input`
margin-top : 2rem;
width : 600px;
height : 40px;
margin-bottom : 20px;
background-color: #F5F5F5;
outline : hidden;
border : none;

`;

const StSGPPhotoInput = styled.div`
  margin-bottom:1rem;
  width : 300px;
  height : 30px;
  background-color : #FFC226;
  border-radius:10px;
  display: flex;
  flex-direction: row;
  align-item: center;

  .btnStart {
    display: flex;
    flex-direction: row;
    align-item: center;
  }

  
  .submitPic {
    position : absolute;
    top: px;
    width : 80px;
    height : 15px;
    font-size: 12px;
    color: white;
    margin:10px 0 0px 110px;
  }

  img {
    max-width: 20px;
    margin-left:80px;
    margin-top: 7px;

  }

  label {
    width: 300px;
    height: 40px;
    cursor: pointer;
    
  }

  input[type="file"] {
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


const StSGPDescriptionInput = styled.input`
width : 700px;
height : 200px;
background-color: #F5F5F5;
outline : none;
border: none;
`;

const StSGPButtonGroup = styled.div`
margin-top:2rem;
display: flex;
align-item:center;
`;

const StSGPSubmitButton = styled.button`
display: inline-block;
border: none;
background-color: #FF8A00;
width: 70px;
height: 70px;
border-radius: 50%;
cursor: pointer;
font-weight: bold;
text-decoration: none;
color: white;
text-size: 10px;
margin-left:15px;
margin-right : 15px;
position : relative;
`;

const StSGPCancelButton = styled(NavLink)`
display: inline-block;
border: none;
background-color: #FFC226;
width: 70px;
height: 70px;
border-radius: 50%;
cursor: pointer;
font-weight: bold;
text-decoration: none;
color: white;
font-size: 18px;
margin-left:15px;
position : relative;
line-height: 350%;
text-align: center;
`;



export default Form;