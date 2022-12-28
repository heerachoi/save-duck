import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux'; //useSelector 훅 임포트, state값을 조회한다
import { useDispatch } from 'react-redux'; //useDispatch 훅 임포트, state값을 변경한다
import { NavLink } from 'react-router-dom'; //페이지 이동을 위한 라우터 임포트

import { db } from '../../firebase';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

const List = () => {
  const dispatch = useDispatch(); // useDispatch 훅을 통해 state값을 변경한다.
  const [lists] = useState({});
  const [posting, setPosting] = useState([]);

  // firestore에서 데이터 'posting' 가져오기
  const syncpostingstatewithfirestore = () => {
    const q = query(
      collection(db, "posting"),
      // where('userId', '==', currentUser),
      orderBy("created", "desc")
    );

    getDocs(q).then((querySnapshot) => {
      const firestorePostingList = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        firestorePostingList.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          username: doc.data().username,
          created: doc.data().created,
        });
      });
      setPosting(firestorePostingList);
    });
  };

  useEffect(() => {
    syncpostingstatewithfirestore();
  }, []);

  return (
    <MainWrap>
        {posting.map((item, i) => {
          return (
            <StShopGuidePostWrapper key={item.id}>
              <StShopGuidePostContainer
                item={item}
                to={`/shopguidearticle/${item.id}`}
              >
                <StShopGuideTop>
                  <StShopGuidePostNumbering>
                    <div>{i + 1}</div>
                  </StShopGuidePostNumbering>
                  <StShopGuidePostTitle>
                    글 제목<div>{item.title}</div>
                  </StShopGuidePostTitle>
                </StShopGuideTop>
                <StShopGuidePostInfo>
                  <div type={"picture"}></div>
                  <StShopGuidePostUserPicture></StShopGuidePostUserPicture>

                  <StShopGuidePostUserName>
                    <div>작성자 명{item.username}</div>
                  </StShopGuidePostUserName>
                  <StShopGuidePostDate>
                    <div>{item.created}</div>
                  </StShopGuidePostDate>
                </StShopGuidePostInfo>
                <StShopGuidePostDescription>
                  <div>{item.description}</div>
                </StShopGuidePostDescription>
              </StShopGuidePostContainer>
            </StShopGuidePostWrapper>
          );
        })}

    </MainWrap>
  );
};

export default List;

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 5% auto 0 auto;
  background-color: #8f8f8f;
`;

// const Container = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   max-width: 90%;
//   grid-gap: 40px;
//   margin: 5% 0 5% 0;
//   background-color: beige;
// `;

// const StShopGuidePostbody = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: skyblue;
//   justify-content: center;
//   display: flex;
// `;
const StShopGuidePostWrapper = styled.div`
  /* max-width: 800px; */
  text-decoration: none;
  /* border-bottom: 3px solid #e5e5e5; */
  background-color: #ffc226;
  border-radius: 30px;
  box-shadow: inset;
  max-width: 900px;
  min-width: 700px;
  min-height: 200px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  :hover {
    transform: translateY(-10px);
  }
`;
const StShopGuidePostContainer = styled(NavLink)`
  background-color: yellow;
  /* max-width: 500px; */
  /* margin: 25px 100px 15px 100px; */
  overflow: hidden;
  cursor: pointer;
  /* text-decoration: none; */

  span {
    max-width: 500px;
    margin: 25px 100px 15px 100px;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
`;
const StShopGuideTop = styled.div`
  /* height: 20px;
  display: flex;
  flex-direction: row; */
  background-color: green;
`;
const StShopGuidePostNumbering = styled.div`
  /* width: 50px;
  font-size: 30px; */
  background-color: red;
  text-align: center;
`;
const StShopGuidePostTitle = styled.div`
  /* height: 20px;
  width: 700px;
  font-size: 15px;
  font-weight: 600; */
  text-align: center;
  background-color: #c3a8c3;
  text-decoration: none;
`;
const StShopGuidePostInfo = styled.div`
  /* height: 20px; */
  /* display: flex; */
  /* flex-direction: row; */
  /* margin-left: 55px; */
  text-decoration: none;
  background-color: #56c287;
  label {
    /* display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle; */
    cursor: pointer;
  }
`;

const StShopGuidePostUserPicture = styled.div`
  /* width: 20px;
  /* height: 20px; */
  background-color: blue; */
`;
const StShopGuidePostUserName = styled.div`
  /* width: 8rem;
  font-size: 11px;
  display: flex;
  align-items: center;
  color: coral; */
  /* background-color: #26b7b7; */
`;
const StShopGuidePostDate = styled.div`
  /* width: 10rem;
  font-size: 9px;
  color: gray;
  display: flex; */
  /* align-items: center; */
  text-align: center;
  /* background-color: #5c5c13; */
  span {
    /* width: 50px; */
    /* white-space: nowrap; */
  }
`;
const StShopGuidePostDescription = styled.div`
  /* width: 90%;
  height: 90px;
  font-size: 11px;
  color: gray; */
  /* margin-left: 50px; */
  margin-top: 50px;
  min-height: 90px;
  text-align: center;
  background-color: beige;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.1;
`;
