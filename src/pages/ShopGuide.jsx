import React from "react";
import styled from "styled-components";

import nextId from "react-id-generator";


const ShopGuide = () => {
  return (
    <StShopGuideContainer>

      <StShopGuideHeader>
        <StShopGuideHeaderLeft>
          <span> 쇼핑가이드</span>
        </StShopGuideHeaderLeft>
        <StShopGuideHeaderRight>
          <span> 가성비 좋았던 쇼핑 기록을 공유하여 주세요. 다른 사람의 쇼핑 목록도 살짝 참고하면 더욱 좋습니다. </span>
        </StShopGuideHeaderRight>
      </StShopGuideHeader>

      <StShopGuideBody>
        <StShopGuidePostContainer>
          <StShopGuideTop>
            <StShopGuidePostNumbering>
              <span>1</span>
            </StShopGuidePostNumbering>
            <StShopGuidePostTitle>
              <span>오늘 이마트에서 떡볶이 재료 구매 리스트 공유드려요! 핵맛!!</span>
            </StShopGuidePostTitle>
          </StShopGuideTop>
          <StShopGuidePostInfo>
            <StShopGuidePostUserPicture>
            </StShopGuidePostUserPicture>
            <StShopGuidePostUserName>
              <span>닉네임1189</span>
            </StShopGuidePostUserName>
            <StShopGuidePostDate>
              <span>22.12.19</span>
            </StShopGuidePostDate>
          </StShopGuidePostInfo>
          <StShopGuidePostDescription>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate diam in nisl lobortis, at elementum purus consectetur. Aliquam sodales pellentesque neque eu mollis. Mauris justo magna, pretium non risus dapibu...</span>
          </StShopGuidePostDescription>
        </StShopGuidePostContainer>

        <StShopGuidePostContainer>
          <StShopGuideTop>
            <StShopGuidePostNumbering>
              <span>2</span>
            </StShopGuidePostNumbering>
            <StShopGuidePostTitle>
              <span>[쇼핑가이드] 한국소비자원 비교공감 - 무선청소기편</span>
            </StShopGuidePostTitle>
          </StShopGuideTop>
          <StShopGuidePostInfo>
            <StShopGuidePostUserPicture>
            </StShopGuidePostUserPicture>
            <StShopGuidePostUserName>
              <span>닉네임1219</span>
            </StShopGuidePostUserName>
            <StShopGuidePostDate>
              <span>22.12.20</span>
            </StShopGuidePostDate>
          </StShopGuidePostInfo>
          <StShopGuidePostDescription>
            <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate diam in nisl lobortis, at elementum purus consectetur. Aliquam sodales pellentesque neque eu mollis. Mauris justo magna, pretium non risus dapibu...</span>
          </StShopGuidePostDescription>
        </StShopGuidePostContainer>

        <StWirtePostButton>Write</StWirtePostButton>
        <StMoveTopButton>︿</StMoveTopButton>

      </StShopGuideBody>
    </StShopGuideContainer>


  )
};

const StShopGuideContainer = styled.div`
  margin-top : 3rem;
  width: 100%;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StShopGuideHeader = styled.div`
  width: 80%;
  color: black;
  display: flex;
  flex-direction: row;
  `;

const StShopGuideHeaderLeft = styled.div`
width : 150px;
font-size : 25px;
margin-top : 1rem;
  `;

const StShopGuideHeaderRight = styled.div`
width : 500px;
height : 22px;
margin-top : 1rem;
margin-left : 3rem; 
padding-top : 0.5rem;
padding-left : 1rem;
padding-bottom : 8px;
font-size : 11px;
border-left : 1px solid lightgray;
border-bottom : 1px solid lightgray;
@media screen and (max-width : 800px) {
  display : none;
  `;

const StShopGuideBody = styled.div`
width: 80%;
display: flex;
flex-direction: column-reverse;
padding-top : 5rem;
padding-bottom : 2rem;
padding-left : 2rem; 
padding-right : 2rem;
  `;

const StShopGuidePostContainer = styled.div`
margin : 25px 100px 15px 100px;
`;

const StShopGuideTop = styled.div`
height : 20px;
display: flex;
flex-direction: row;

  `;
const StShopGuidePostNumbering = styled.div`
width : 50px;

font-size : 12px;
  `;
const StShopGuidePostTitle = styled.div`
height : 20px;
width : 700px;
font-size : 12px;
font-weight : 600;
  `;

const StShopGuidePostInfo = styled.div`
height : 20px;
display: flex;
flex-direction: row;
margin-left : 55px;
  `;

const StShopGuidePostUserPicture = styled.div`
width : 20px;
height : 20px;
  `;
const StShopGuidePostUserName = styled.div`
width : 8rem;
font-size : 11px;
display: flex;
align-items: center;
color : coral;
  `;
const StShopGuidePostDate = styled.div`
width : 8rem;
font-size : 9px;
color : gray;
display: flex;
align-items: center;
  `;
const StShopGuidePostDescription = styled.div`
font-size : 11px;
color : gray;
margin-left : 50px;
  `;

const StMoveTopButton = styled.div`
// display: none; 
height: 60px;
    width: 60px;
  position: fixed; 
  bottom: 150px; 
  right: 130px; 
  z-index: 1; 
  border: none;
  outline: none; 
  background: #FFC226;
  color: white; 
  cursor: pointer;
  border-radius: 30px; 
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  `;

const StWirtePostButton = styled.div`
position: fixed; 
height: 60px;
    width: 60px;
bottom: 80px; 
right: 130px; 
z-index: 1; 
border: none;
outline: none; 
background: #FFC226;
color: white; 
cursor: pointer;
border-radius: 30px; 
font-size: 18px;
font-weight: 700;
display: flex;
align-items: center;
justify-content: center;
`;



export default ShopGuide;
