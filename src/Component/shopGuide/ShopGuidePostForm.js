import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/modules/list";



// Form 컴포넌트를 생성 후 useState를 통해 lists 객체를 생성한다. lists 객체의 키값은 id,number, title, username,date, profilepicture, description 이다.
function Form() {
    const dispatch = useDispatch();
    const [lists, setLists] = useState({
        id: "",
        number: "",
        title: "",
        username: "",
        date: "",
        profilepicture: "",
        description: "",
    });


    // input 창의 value 값을 변경할 떄 마다 list 객체의 키값에 맞게 setList를 통해 값을 변경한다.
    const onChange = (e) => {
        const { name, value } = e.target;
        setLists({
            ...lists, [name]: value,
        });
    };

    // submit 버튼을 누르면 dispatch를 통해 addPost를 실행한다.
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addPost(lists));
        setLists({
            number: "",
            title: "",
            username: "",
            date: "",
            profilepicture: "",
            description: "",
        });
    };
    return (

        <StSGPInputContainer onsubmit={onSubmit}>
            <StSGPTitleInput
                type="text"
                name="title"
                placeholder="제목을 입력하여 주세요."
                onChange={onChange}
                value={lists.title}
                required
            />

            <StSGPPictureInput type="file"
                name="picture"
                placeholder="사진을 등록해주세요." />

            <StSGPDescriptionInput>
            </StSGPDescriptionInput>

            <StSGPButtonGroup>
                <StSGPSubmitButton>
                </StSGPSubmitButton>

                <StSGPCancelButton>
                </StSGPCancelButton>
            </StSGPButtonGroup>
        </StSGPInputContainer>

    );
}



const StSGPInputContainer = styled.div`
margin-top : 4rem;
width: 60%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: top;
background-color: white;
`;

const StSGPTitleInput = styled.div`
margin-top : 2rem;
width : 600px;
height : 40px;
margin-bottom : 20px;
background-color: #F5F5F5;

`;

const StSGPPictureInput = styled.div`
width : 400px;
height : 30px;
margin-bottom : 20px;
background-color: #F5F5F5;
`;


const StSGPDescriptionInput = styled.div`
width : 700px;
height : 200px;
background-color: #F5F5F5;
`;

const StSGPButtonGroup = styled.div`
margin-top : 2rem;
`;

const StSGPSubmitButton = styled.div`

display: inline-block;
border: none;
background-color: #FF8A00;
width: 70px;
height: 70px;
border-radius: 50%;
cursor: pointer;
font-weight: bold;
margin-right : 15px;
`;

const StSGPCancelButton = styled.div`
display: inline-block;
border: none;
background-color: #FFC226;
width: 70px;
height: 70px;
border-radius: 50%;
cursor: pointer;
font-weight: bold;
`;



export default Form;