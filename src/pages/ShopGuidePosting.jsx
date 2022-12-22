import React from "react";
import styled from "styled-components";
import Form from "../Component/shopGuide/ShopGuidePostForm";








const ShopGuidePosting = () => {
    return (



        <StSGPContainer>

            <Form />

        </StSGPContainer>



    )
};



export default ShopGuidePosting;

const StSGPContainer = styled.div`
width: 90%;
height: 110vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: top;
background-color: white;
`;

