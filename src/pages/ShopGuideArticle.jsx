import React, { useState, useEffect } from 'react';
import ShopGuideDetails from '../pages/ShopGuideDetails.jsx';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Minsung 수정
import { useSelector } from 'react-redux'; // useSelector를 사용해 store에 있는 state를 구독하기 위해해 import
import { useParams } from 'react-router-dom'; // path에 있는 id를 가져오기 위해 import
import lists from '../redux/modules/list';
import { db } from '../firebase';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  deleteDoc,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ShopGuideArticle = ({ item }) => {
  // Minsung 수정
  let NavId = useParams();
  const [lists] = useState({});
  const [posting, setPosting] = useState([]);

  // 게시글 삭제 기능
  const deleteButtonClickHandler = async () => {
    if (window.confirm('해당 게시글을 삭제하시겠습니까?')) {
      await deleteDoc(doc(db, 'posting', NavId.id));
      alert('삭제되었습니다.');
      window.location.href = '/shopGuide';
    } else {
      return;
    }
  };

  // firestore에서 데이터 'posting' 가져오기
  const syncpostingstatewithfirestore = () => {
    const q = query(collection(db, 'posting'), orderBy('created', 'desc'));

    getDocs(q).then((querySnapshot) => {
      const firestorePostingList = [];
      querySnapshot.forEach((doc) => {
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
      <StShopDetailsContainer>
        {/* 게시글 영역 */}
        {posting.map((item) => {
          if (item.id === NavId.id) {
            return (
              <StShopDetailsArticle key={item.id} item={item}>
                <StShopDetailsArticleTitle>
                  {item.title}
                </StShopDetailsArticleTitle>
                <StShopDetailsImage
                  className='detailsMainImage'
                  src={`${lists.profilepicture}`}
                  alt='첨부된 이미지'
                />
                <StShopDetailsArticleContents>
                  {item.description}
                </StShopDetailsArticleContents>
              </StShopDetailsArticle>
            );
          } else {
            return null;
          }
        })}
        {/* 수정 / 삭제 버튼 */}
        <StShopDetailsEditButtons>
          {posting.map((item) => {
            if (item.id === NavId.id) {
              return (
                <StArticleEditLink
                  key={item.id}
                  to={`/shopguidepostingEdit/${item.id}`}
                >
                  <FontAwesomeIcon
                    id='articleEditButton'
                    icon={faPen}
                    style={{ cursor: 'pointer' }}
                  />
                </StArticleEditLink>
              );
            } else {
              return null;
            }
          })}
          <FontAwesomeIcon
            id='articleDeleteButton'
            icon={faTrashCan}
            onClick={deleteButtonClickHandler}
            style={{ cursor: 'pointer' }}
          />
        </StShopDetailsEditButtons>
      </StShopDetailsContainer>
      <ShopGuideDetails />
    </div>
  );
};

export default ShopGuideArticle;

const StShopDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 게시글 영역
const StShopDetailsArticle = styled.div`
  text-align: center;
  width: 800px;
`;

const StShopDetailsArticleTitle = styled.h1`
  font-size: 32px;
  margin-top: 100px;
`;

const StShopDetailsArticleContents = styled.div`
  width: 100%;
  display: inline-block;
  text-align: start;
  margin-bottom: 40px;
`;

const StShopDetailsImage = styled.img`
  width: 500px;
  height: 300px;
  margin-bottom: 30px;
  object-fit: cover;
  margin-top: 40px;
`;

// 게시글 수정 버튼
const StShopGuideFormEdit = styled(NavLink)`
  color: black;
`;

const StShopDetailsEditButtons = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 80px;
  font-size: 20px;
`;

const StArticleEditLink = styled(NavLink)`
  color: black;
`;
