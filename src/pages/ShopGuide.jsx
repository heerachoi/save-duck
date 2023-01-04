import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import List from '../Component/shopGuide/ShopGuide.jsx';
import { faChevronUp, faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShopGuide = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StShopGuideContainer>
      <StShopGuideHeader>
        <StShopGuideHeaderLeft>쇼핑가이드</StShopGuideHeaderLeft>
        <StShopGuideHeaderRight>
          가성비 좋았던 쇼핑 기록을 공유하여 주세요. 다른 사람의 쇼핑 목록도
          살짝 참고하면 더욱 좋습니다.
        </StShopGuideHeaderRight>
      </StShopGuideHeader>
      <StShopGuideBody>
        <List />
        <StWritePostButton to='/shopguideposting'>Write</StWritePostButton>
        <StMoveTopButton onClick={handleScrollToTop} icon={faCircleUp} />
      </StShopGuideBody>
    </StShopGuideContainer>
  );
};

const StShopGuideContainer = styled.div`
  text-decoration: none;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 100px;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
  }
`;

const StShopGuideHeader = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 80px;
  justify-content: center;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
  }
`;

const StShopGuideHeaderLeft = styled.div`
  font-size: 28px;
  @media screen and (max-width: 800px) {
    display: flex;
    align-items: center;
  }
`;

const StShopGuideHeaderRight = styled.div`
  height: 20px;
  margin-left: 2rem;
  display: flex;
  align-items: center;
  padding: 9px 0 9px 16px;
  font-size: 14px;
  border-left: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  @media screen and (max-width: 800px) {
    /* border: none;
    width: 80%; */
    display: none;
  }
`;

const StShopGuideBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0px;
  }
`;

const StMoveTopButton = styled(FontAwesomeIcon)`
  height: 50px;
  width: 50px;
  position: fixed;
  bottom: 90px;
  right: 30px;
  z-index: 1;
  /* border: 1px solid #ffc226; */
  color: #ffc226;
  border-radius: 30px;
  cursor: pointer;
`;

const StWritePostButton = styled(NavLink)`
  position: fixed;
  height: 50px;
  width: 50px;
  bottom: 30px;
  right: 30px;
  z-index: 1;
  border: none;
  outline: none;
  color: #ffc226;
  border: 1px solid #ffc226;
  cursor: pointer;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  text-decoration-line: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: #ffc226;
    color: white;
  }
`;

export default ShopGuide;
