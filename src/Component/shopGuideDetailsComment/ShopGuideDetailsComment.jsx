import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { modifyModeComment, updateComment } from '../../redux/modules/comment';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  StCommentProfileImage,
  StCommentListContainer,
  StCommentUserName,
  StCommentContentInput,
  StCommentContentSaveTime,
  StCommentContentsEditButton,
  StCommentContentsDeleteButton,
} from './shopGuideDetailsComment.js';

const ShopGuideDetailsComment = ({
  item,
  syncCommentListStateWithFirestore,
  collectionName,
}) => {
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const { id, comment, savetime, modify } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateCommentInput, setUpdateCommentInput] = useState(comment);

  const dispatch = useDispatch();

  // 댓글 수정 -> 완료 모드 토글링 state에 반영하기
  const modifyCommentButtonHandler = (id) => {
    dispatch(modifyModeComment(id));
    setReadOnly(false);
  };

  // 댓글 입력시 - state 반영하기
  const onChangeComment = (event) => {
    const { value } = event.target;
    setUpdateCommentInput(value);
  };

  // 댓글 수정 -> 완료 모드 토글링
  const updateCommentModify = async (id) => {
    const docRef = doc(db, collectionName, item.id);
    // console.log(docRef);
    try {
      const response = await updateDoc(docRef, { modify: true });
      console.log(response);
    } catch (event) {
      console.log(event);
    } finally {
      console.log('end');
      modifyCommentButtonHandler(id);
    }
    syncCommentListStateWithFirestore();
  };

  // 댓글 수정 완료하기
  const updateCompleteButtonHandler = async (id) => {
    const docRef = doc(db, collectionName, id);
    try {
      const response = await updateDoc(docRef, {
        modify: false,
        savetime: time,
        comment: updateCommentInput,
      });
      // console.log(response);
    } catch (event) {
      console.log(event);
    } finally {
      console.log('end');
      modifyCommentButtonHandler(id);
    }
    syncCommentListStateWithFirestore();
    setReadOnly(true);
  };

  // 댓글 수정 취소하기
  const editCancelButtonHandler = (id) => {
    dispatch(modifyModeComment(id));
    setReadOnly(true);
    setUpdateCommentInput(comment);
  };

  // 댓글 삭제하기
  const deleteCommentButtonHandler = async (removedComment) => {
    console.log(removedComment);

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const commentRef = doc(db, collectionName, removedComment);
      await deleteDoc(commentRef);
      syncCommentListStateWithFirestore();
    } else {
      return;
    }
  };

  return (
    <div>
      <StCommentListContainer key={id}>
        <StCommentProfileImage src='images/default_profile.webp' alt='' />
        <StCommentUserName>사용자 닉네임</StCommentUserName>
        <StCommentContentInput
          name='comment'
          readOnly={readOnly}
          maxlength='200'
          defaultValue={comment}
          onChange={onChangeComment}
        />

        {/* <span>{item.comment}</span> */}
        <StCommentContentSaveTime>{savetime}</StCommentContentSaveTime>
        {/* {console.log(item.modify)} */}
        {modify ? (
          <StCommentContentsEditButton
            type='button'
            className='comment-edit-complete-btn'
            onClick={() => {
              updateCompleteButtonHandler(id);
            }}
          >
            완료
          </StCommentContentsEditButton>
        ) : (
          <StCommentContentsEditButton
            className='comment-edit-btn'
            onClick={() => {
              updateCommentModify(id);
            }}
          >
            수정
          </StCommentContentsEditButton>
        )}
        {modify ? (
          <StCommentContentsDeleteButton
            onClick={() => {
              editCancelButtonHandler(id);
            }}
          >
            취소
          </StCommentContentsDeleteButton>
        ) : (
          <StCommentContentsDeleteButton
            onClick={() => {
              deleteCommentButtonHandler(id);
            }}
          >
            삭제
          </StCommentContentsDeleteButton>
        )}
      </StCommentListContainer>
    </div>
  );
};

export default ShopGuideDetailsComment;
