import React, { useState, useEffect } from 'react';
import ShopGuideDetails from './ShopGuideDetails.jsx';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
import { authService } from '../firebase';
import { useAuth } from '../firebase';

const ShopGuideArticle = ({ item }) => {
  // Minsung 수정
  let NavId = useParams();
  const [lists] = useState({});
  const [posting, setPosting] = useState([]);
  const currentUser = useAuth();

  const postingId = NavId.id;

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

  // DB에서 'posting' 데이터 가져오기
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
          image: doc.data().image,
          creatorid: doc.data().creatorid,
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
                {/* 게시글에 사진을 등록하지 않은 경우 이미지를 보이지 않게 하기. */}
                {item.image === '' ? null : (
                  <StShopDetailsImage
                    className='detailsMainImage'
                    src={item.image}
                    alt='등록된 사진이 없습니다.'
                  />)}
                <StShopDetailsArticleContents>
                  {item.description}
                </StShopDetailsArticleContents>
                {/* 뒤로가기 버튼 */}
                <StBackButton to={`/shopguide`}> Back</StBackButton>
              </StShopDetailsArticle>
            );
          } else {
            return null;
          }
        })}
        {/* 수정 / 삭제 버튼 */}

        {posting.map((item) => {
          if (item.id === NavId.id) {
            if (item.creatorid === currentUser.uid) {
              return (
                <StShopDetailsEditButtons>
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
                  <FontAwesomeIcon
                    id='articleDeleteButton'
                    icon={faTrashCan}
                    onClick={deleteButtonClickHandler}
                    style={{ cursor: 'pointer' }}
                  />
                </StShopDetailsEditButtons>
              );
            }
          } else {
            return null;
          }
        })}
      </StShopDetailsContainer>
      <ShopGuideDetails postingId={postingId} />
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
  line-height: 120%;
  white-space: pre-line;
`;

const StShopDetailsImage = styled.img`
  width: 500px;
  height: 300px;
  margin-bottom: 30px;
  object-fit: cover;
  margin-top: 40px;
  font-size: xx-small;
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

const StBackButton = styled(NavLink)`
  position: absolute;
  line-height: 45px;
  right: 50px;
  width: 50px;
  height: 50px;
  background-color: #000;
  color: #fff;
  border-radius: 100px;
  border: none;
  top: 230px;
  text-decoration: none;
`;
