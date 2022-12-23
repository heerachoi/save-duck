import React from "react";
import styled from "styled-components";







const ShopGuidePosting = () => {
    return (



        <StSGPContainer>

            <StSGPTitleInput type="text"
                name="title"
                placeholder="제목을 입력하여 주세요." />

            <StSGPPictureInput type="file"
                name="picture"
                placeholder="사진을 등록해주세요." />

            <StSGPInfo>
            </StSGPInfo>

            <StSGPDescriptionInput>
            </StSGPDescriptionInput>

            <StSGPButtonGroup>
                <StSGPSubmitButton>
                </StSGPSubmitButton>

                <StSGPCancelButton>
                </StSGPCancelButton>
            </StSGPButtonGroup>

        </StSGPContainer>



    )
};



export default ShopGuidePosting;

const StSGPContainer = styled.div`
width: 90%;
height: 120vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: white;
`;

const StSGPTitleInput = styled.div`
width : 600px;
height : 40px;
`;

const StSGPPictureInput = styled.div`
width : 400px;
height : 30px;
`;

const StSGPInfo = styled.div`
width : 300px;
height : 15px;
`;

const StSGPDescriptionInput = styled.div`
width : 700px;
height : 200px;
`;

const StSGPButtonGroup = styled.div`
`;

const StSGPSubmitButton = styled.div`
display: inline-block;

border: none;

background-color: coral;

width: 120px;
height: 40px;

cursor: pointer;

font-weight: bold;
`;

const StSGPCancelButton = styled.div`
display: inline-block;

border: none;

background-color: coral;

width: 120px;
height: 40px;

cursor: pointer;

font-weight: bold;
`;