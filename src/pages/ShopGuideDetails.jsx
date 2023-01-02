import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ShopGuideDetailsCommentList from '../Component/shopGuideDetailsCommentList/ShopGuideDetailsCommentList.jsx';
import { addComment } from '../redux/modules/comment';
import moment from 'moment';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { db, useAuth } from '../firebase';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';

const ShopGuideDetails = ({ postingId }) => {
  // 댓글 기본 state
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const [comment, setComment] = useState('');
  const [commentItemtList, setCommentItemList] = useState([]);
  const currentUser = useAuth();
  const dispatch = useDispatch();

  // 댓글 input 내용 입력 시 input value state 업데이트
  const CommentChangeHandler = (event) => {
    const currentComment = event.target.value;
    if (currentComment.length > 100) {
      alert('100자 이내로 입력해주세요.');
      return;
    } else {
      setComment(event.target.value);
    }
  };

  //  댓글 등록 하기

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    await addDoc(collection(db, 'commentList'), {
      id: uuidv4(),
      comment,
      savetime: time,
      modify: false,
      postingId: postingId,
      creatorId: currentUser.uid,
    });
    // console.log(docRef);

    setComment('');
  };

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
            // maxLength={100}
            id='comment'
            placeholder='댓글을 입력해주세요. (100자 이내)'
            value={comment}
            onChange={CommentChangeHandler}
          />
          {/* <StCommentSaveButton onClick={addItem}>댓글 등록</StCommentSaveButton> */}
          <StCommentSaveButton type='submit'>댓글 등록</StCommentSaveButton>
        </StCommentForm>
      </StCommentContainer>
      {/* 댓글 리스트 */}
      <div>
        <ul>
          <ShopGuideDetailsCommentList
            commentItemtList={commentItemtList}
            setCommentItemList={setCommentItemList}
            // syncCommentListStateWithFirestore={
            //   syncCommentListStateWithFirestore
            // }
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
