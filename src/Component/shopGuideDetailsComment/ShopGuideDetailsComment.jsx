import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { modifyModeComment, updateComment } from '../../redux/modules/comment';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  StCommentProfileImage,
  StCommentListContainer,
  StCommentUserName,
  StCommentContentInput,
  StCommentContentSaveTime,
  StCommentContentsEditButton,
  StCommentContentsDeleteButton,
} from './ShopGuideDetailsComment.js';

// 민성 수정 
import { useParams } from 'react-router-dom';
import { useAuth } from '../..//firebase';
import { getAuth } from "firebase/auth";

const ShopGuideDetailsComment = ({
  item,
  syncCommentListStateWithFirestore,
  collectionName,
}) => {
  const time = moment().format('YYYY-MM-DD-hh:mm');
  const { id, comment, savetime, modify } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateCommentInput, setUpdateCommentInput] = useState(comment);

  // 민성 수정
  // uid 가져오기
  const auth = getAuth();
  const currentUser = auth.currentUser;

  console.log(auth);
  console.log(currentUser);
  // 댓글 수정 취소를 위한 state (이전, 이후 댓글 저장)
  // const [originComment, setNewComment] = useState(comment);

  const dispatch = useDispatch();

  // 댓글 수정 -> 완료 모드 토글링 state에 반영하기
  const modifyCommentButtonHandler = (id) => {
    dispatch(modifyModeComment(id));
    setReadOnly(false);
  };

  // 댓글 입력시 - state 반영하기
  const onChangeComment = (event) => {
    // console.log(event.target.value);
    const { value } = event.target;
    // setNewComment(value);
    setUpdateCommentInput(value);
  };

  // 댓글 수정 -> 완료 모드 토글링
  const updateCommentModify = async (id) => {
    const docRef = doc(db, collectionName, id);
    // console.log(docRef);
    try {
      const response = await updateDoc(docRef, { modify: true });
      console.log(response);
    } catch (event) {
      console.log('error', event);
    } finally {
      console.log('edit mode toggled');
      modifyCommentButtonHandler(id);
    }
    syncCommentListStateWithFirestore();
  };

  // 댓글 수정 완료하기
  const updateCompleteButtonHandler = async (id) => {
    const docRef = doc(db, collectionName, id);
    try {
      await updateDoc(docRef, {
        modify: false,
        savetime: time,
        comment: updateCommentInput,
      });
      // console.log(response);
    } catch (event) {
      console.log(event);
    } finally {
      console.log('comment updated');
      modifyCommentButtonHandler(id);
      alert('수정이 완료되었습니다.');
    }
    setUpdateCommentInput(updateCommentInput);
    syncCommentListStateWithFirestore();
    setReadOnly(true);
  };

  // 댓글 수정 취소하기
  const editCancelButtonHandler = async (id) => {
    const docRef = doc(db, collectionName, id);
    // console.log(docRef.comment);
    console.log(comment);
    try {
      await updateDoc(docRef, {
        modify: false,
        comment: comment,
      });
      // console.log(response);
    } catch (event) {
      console.log(event);
    } finally {
      console.log('comment update canceled');
      modifyCommentButtonHandler(id);
      alert('수정이 취소되었습니다.');
    }
    // setUpdateCommentInput(comment);
    // dispatch(modifyModeComment(id));
    syncCommentListStateWithFirestore();
    setReadOnly(true);
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
          defaultValue={comment}
          onChange={onChangeComment}
        />

        {/* <span>{item.comment}</span> */}
        <StCommentContentSaveTime>{savetime}</StCommentContentSaveTime>
        {/* {console.log(item.modify)} */}


        {
          item.commentcreatorid === currentUser.uid ? (


            modify ? (
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
            ),
            modify ? (
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
            )

          ) : (
            <></>
          )}

      </StCommentListContainer>
    </div >
  );
};

export default ShopGuideDetailsComment;
