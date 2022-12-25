import React from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import List from "../Component/shopGuide/ShopGuide";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopGuide = () => {
  // useSelector()를 통해 Redux의 상태를 가져올 수 있습니다. store에 있는 state를 구독합니다.

  const post_list = useSelector((state) => state.lists);

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


        <List />

        <StWritePostButton to="/shopguideposting">Write</StWritePostButton>
        <StMoveTopButton>︿</StMoveTopButton>

      </StShopGuideBody >
    </StShopGuideContainer >


  )
};


const StShopGuideContainer = styled.div`
  margin-top: 3rem;
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
  width: 150px;
  font-size: 25px;
  margin-top: 1rem;
`;

const StShopGuideHeaderRight = styled.div`
  width: 500px;
  height: 22px;
  margin-top: 1rem;
  margin-left: 3rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-bottom: 8px;
  font-size: 11px;
  border-left: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const StShopGuideBody = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column-reverse;
  padding-top: 5rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

// const StShopGuidePostContainer = styled.div`
//   margin: 25px 100px 15px 100px;
// `;

// const StShopGuideTop = styled.div`
//   height: 20px;
//   display: flex;
//   flex-direction: row;
// `;
// const StShopGuidePostNumbering = styled.div`
//   width: 50px;

//   font-size: 12px;
// `;
// const StShopGuidePostTitle = styled.div`
//   height: 20px;
//   width: 700px;
//   font-size: 12px;
//   font-weight: 600;
// `;

// const StShopGuidePostInfo = styled.div`
//   height: 20px;
//   display: flex;
//   flex-direction: row;
//   margin-left: 55px;
// `;

// const StShopGuidePostUserPicture = styled.div`
//   width: 20px;
//   height: 20px;
// `;
// const StShopGuidePostUserName = styled.div`
//   width: 8rem;
//   font-size: 11px;
//   display: flex;
//   align-items: center;
//   color: coral;
// `;
// const StShopGuidePostDate = styled.div`
//   width: 8rem;
//   font-size: 9px;
//   color: gray;
//   display: flex;
//   align-items: center;
// `;
// const StShopGuidePostDescription = styled.div`
//   font-size: 11px;
//   color: gray;
//   margin-left: 50px;
// `;

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
  background: #ffc226;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  font - size: 18px;
  font - weight: 700;
  display: flex;
  align - items: center;
  justify - content: center;
  `;

const StWritePostButton = styled(NavLink)`
  position: fixed;
  height: 60px;
  width: 60px;
  bottom: 80px;
  right: 130px;
  z - index: 1;
  border: none;
  outline: none;
  background: #FFC226;
  color: white;
  cursor: pointer;
  border - radius: 30px;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default ShopGuide;