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
      collection(db, 'posting'),
      // where('userId', '==', currentUser),
      orderBy('created', 'desc')
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
    <div>
      {posting.map((item, i) => {
        return (
          <StShopGuidePostWrapper key={item.id}>
            <StShopGuidePostContainer
              item={item}
              to={`/shopguidearticle/${item.id}`}
            >
              <StShopGuideTop>
                <StShopGuidePostNumbering>
                  <span>{i + 1}</span>
                </StShopGuidePostNumbering>
                <StShopGuidePostTitle>
                  <span>{item.title}</span>
                </StShopGuidePostTitle>
              </StShopGuideTop>
              <StShopGuidePostInfo>
                <label type={'picture'}></label>
                <StShopGuidePostUserPicture></StShopGuidePostUserPicture>

                <StShopGuidePostUserName>
                  <span>{item.username}</span>
                </StShopGuidePostUserName>
                <StShopGuidePostDate>
                  <span>{item.created}</span>
                </StShopGuidePostDate>
              </StShopGuidePostInfo>
              <StShopGuidePostDescription>
                <span>{item.description}</span>
              </StShopGuidePostDescription>
            </StShopGuidePostContainer>
          </StShopGuidePostWrapper>
        );
      })}
    </div>
  );
};

export default List;

const StShopGuidePostWrapper = styled.div`
  max-width: 800px;
  text-decoration: none;
  border-bottom: 2px solid #e5e5e5;
`;
const StShopGuidePostContainer = styled(NavLink)`
  max-width: 500px;
  margin: 25px 100px 15px 100px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;

  span {
    max-width: 500px;
    margin: 25px 100px 15px 100px;
    overflow: ;
    cursor: pointer;
    text-decoration: none;
    color: black;
  }
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
  text-decoration: none;
`;
const StShopGuidePostInfo = styled.div`
  height: 20px;
  display: flex;
  flex-direction: row;
  margin-left: 55px;
  text-decoration: none;
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
  width: 10rem;
  font-size: 9px;
  color: gray;
  display: flex;
  align-items: center;

  span {
    width: 50px;
    white-space: nowrap;
  }
`;
const StShopGuidePostDescription = styled.div`
  width: 90%;
  height: 90px;
  font-size: 11px;
  color: gray;
  margin-left: 50px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
`;
