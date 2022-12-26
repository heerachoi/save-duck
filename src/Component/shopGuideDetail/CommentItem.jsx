import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { modifyModeComment, updateComment } from '../../redux/modules/comment';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styled from 'styled-components';

const CommentItem = ({ item, syncTodoItemListStateWithFirestore }) => {
  const { id, comment, savetime, modify } = item;
  const [readOnly, setReadOnly] = useState(true);
  const [updateCommentInput, setUpdateCommentInput] = useState(comment);

  const dispatch = useDispatch();

  // 댓글 수정하기
  const modifyCommentButtonHandler = (id) => {
    console.log('modify!');
    dispatch(modifyModeComment(id));
    setReadOnly(false);
  };

  const onChangeComment = (event) => {
    const { value } = event.target;
    setUpdateCommentInput(value);
  };

  // 댓글 수정 완료하기
  const updateCompleteButtonHandler = (item) => {
    dispatch(updateComment(item));
    dispatch(modifyModeComment(id));
    setReadOnly(true);
  };

  // 댓글 수정 취소하기
  const editCancelButtonHandler = (id) => {
    dispatch(modifyModeComment(id));
    setReadOnly(true);
  };

  // 댓글 삭제하기
  const deleteCommentButtonHandler = async (removedComment) => {
    // console.log(removedComment);

    if (window.confirm('정말 삭제하시겠습니까?')) {
      const commentRef = doc(db, 'commentList', removedComment);
      await deleteDoc(commentRef);
      syncTodoItemListStateWithFirestore();
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
        {console.log(item)}
        <StCommentContentSaveTime>{savetime}</StCommentContentSaveTime>
        {item.modify ? (
          <StCommentContentsEditButton
            type='button'
            className='comment-edit-complete-btn'
            onClick={() => {
              updateCompleteButtonHandler(item);
            }}
          >
            완료
          </StCommentContentsEditButton>
        ) : (
          <StCommentContentsEditButton
            className='comment-edit-btn'
            onClick={() => {
              modifyCommentButtonHandler(id);
            }}
          >
            수정
          </StCommentContentsEditButton>
        )}
        {item.modify ? (
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

export default CommentItem;

// 댓글 리스트 영역
const StCommentProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  /* margin-right: 15px; */
`;

const StCommentListContainer = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-around;
  width: 850px;
  margin-bottom: 20px;
`;

const StCommentUserName = styled.div`
  font-size: 17px;
`;

const StCommentContentInput = styled.input`
  font-size: 15px;
  margin-bottom: 10px;
  width: 400px;
  min-width: 300px;
`;

const StCommentContentSaveTime = styled.div`
  font-size: 13px;
  color: #464646;
`;

const StCommentContentsEditButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const StCommentContentsDeleteButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
