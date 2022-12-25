import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'; //useSelector 훅 임포트, state값을 조회한다
import nextId from 'react-id-generator';
import { NavLink } from "react-router-dom";

function List() {
  const listStore = useSelector((state) => state.lists); // useSelector 훅을 통해 state값을 조회한다.

  return (
    <div>
      {listStore.map((lists) => {
        return (
          <StShopGuidePostWrapper>

            <StShopGuidePostContainer key={lists.id} to={'/shopguidedetails'}>
              <StShopGuideTop>
                <StShopGuidePostNumbering>
                  <span>{lists.id}</span>
                </StShopGuidePostNumbering>
                <StShopGuidePostTitle>
                  <span>{lists.title}</span>
                </StShopGuidePostTitle>
              </StShopGuideTop>
              <StShopGuidePostInfo>

                <label type={"picture"}></label>
                <StShopGuidePostUserPicture></StShopGuidePostUserPicture>

                <StShopGuidePostUserName>
                  <span>{lists.username}</span>
                </StShopGuidePostUserName>
                <StShopGuidePostDate>
                  <span>{lists.date}</span>
                </StShopGuidePostDate>
              </StShopGuidePostInfo>
              <StShopGuidePostDescription>
                <span>{lists.description}</span>
              </StShopGuidePostDescription>
            </StShopGuidePostContainer>

          </StShopGuidePostWrapper>
        );
      })}
    </div>
  );
}

export default List;

const StShopGuidePostWrapper = styled.div`
max-width : 800px;
text-decoration : none;
`;
const StShopGuidePostContainer = styled(NavLink)`
  max-width : 500px;
  margin: 25px 100px 15px 100px;
  overflow:visible; cursor:pointer
  text-decoration : none;
`;
const StShopGuideTop = styled.div`
  height: 20px;
  display: flex;
  flex-direction: row;
`;
const StShopGuidePostNumbering = styled.div`
  width: 50px;
  font-size: 12px;
`;
const StShopGuidePostTitle = styled.div`
  height: 20px;
  width: 700px;
  font-size: 12px;
  font-weight: 600;
  text-decoration : none;
`;
const StShopGuidePostInfo = styled.div`
  height: 20px;
  display: flex;
  flex-direction: row;
  margin-left: 55px;
  text-decoration : none;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
`;



const StShopGuidePostUserPicture = styled.div`
  width: 20px;
  height: 20px;
`;
const StShopGuidePostUserName = styled.div`
  width: 8rem;
  font-size: 11px;
  display: flex;
  align-items: center;
  color: coral;
`;
const StShopGuidePostDate = styled.div`
  width: 8rem;
  font-size: 9px;
  color: gray;
  display: flex;
  align-items: center;
`;
const StShopGuidePostDescription = styled.div`
  font-size: 11px;
  color: gray;
  margin-left: 50px;
  text-decoration : none;
`;
