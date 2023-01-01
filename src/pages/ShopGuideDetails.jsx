import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ShopGuideDetailsCommentList from '../Component/shopGuideDetailsCommentList/ShopGuideDetailsCommentList.jsx';
import { addComment } from '../redux/modules/comment';
import moment from 'moment';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { db } from '../firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

const ShopGuideDetails = ({ collectionName }) => {
  // 댓글 기본 state
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const [comment, setComment] = useState('');
  const [commentItemtList, setCommentItemList] = useState([]);
  const dispatch = useDispatch();

  // 댓글 등록 기능 - 버튼 클릭시 댓글 리스트에 작성한 댓글 추가
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if (window.confirm('댓글을 등록하시겠습니까?')) {
      const newComment = {
        id: uuidv4(),
        comment,
        savetime: time,
        modify: false,
      };
      dispatch(addComment(newComment));
      // addItem();
      setComment('');
    }
  };

  // 댓글 작성 인풋창 내용 입력 시 state 업데이트
  const CommentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  // 회수 수정
  // 댓글 등록 기능 - 버튼 클릭 시 DB 컬렉션에 댓글 내용 추가

  const addItem = async (newComment) => {
    const docRef = await addDoc(collection(db, 'commentList'), {
      id: uuidv4(),
      comment,
      savetime: time,
      modify: false,
    });
    console.log(docRef);
    setCommentItemList([
      {
        id: uuidv4(),
        comment,
        savetime: time,
        modify: false,
      },
      ...commentItemtList,
    ]);
  };

  // 댓글 불러오기

  const syncCommentListStateWithFirestore = () => {
    const q = query(
      collection(db, 'commentList'),
      // where('userId', '==', currentUser),
      orderBy('savetime', 'desc')
    );

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        firestoreTodoItemList.push({
          id: doc.id,
          comment: doc.data().comment,
          userId: doc.data().userId,
          modify: doc.data().modify,
          savetime: doc.data().savetime,
        });
      });
      setCommentItemList(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    syncCommentListStateWithFirestore();
  }, []);

  // console.log(lists);
  return (
    <div>
      {/* 댓글 영역 */}
      <br />
      <StCommentContainer>
        {/* 댓글 작성란 */}

        <StCommentMyProfileImage src='images/default_profile.webp' alt='' />
        <StCommentForm onSubmit={commentSubmitHandler}>
          <StCommentInput
            type='text'
            max-length='10'
            id='comment'
            placeholder='댓글을 입력해주세요. (50자 이내)'
            value={comment}
            onChange={CommentChangeHandler}
          />
          <StCommentSaveButton onClick={addItem}>댓글 등록</StCommentSaveButton>
        </StCommentForm>
      </StCommentContainer>
      {/* 댓글 리스트 */}
      <div>
        <ul>
          <ShopGuideDetailsCommentList
            collectionName={collectionName}
            commentItemtList={commentItemtList}
            setCommentItemList={setCommentItemList}
          />
        </ul>
      </div>
    </div>
  );
};

export default ShopGuideDetails;

// 댓글 영역
const StCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  width: 100%;
  margin-top: 50px;
`;

// 댓글 작성폼
const StCommentMyProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: 15px;
`;

const StCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  // text-align: right;
  // width: 60%;
`;

const StCommentInput = styled.input`
  width: 600px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  overflow: scroll;
`;

const StCommentSaveButton = styled.button`
  width: 80px;
  height: 45px;
  background-color: #ffc226;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
