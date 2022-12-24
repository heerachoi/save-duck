import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/modules/comment';
import styled from 'styled-components';

const CommentList = () => {
  const globalComment = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  console.log(globalComment);

  // 댓글 삭제 버튼 - 클릭시 해당만 댓글 삭제
  const deleteCommentHandler = (id) => {
    console.log(id);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      {
        dispatch(deleteComment(id));
      }
    } else {
      return;
    }
  };

  return (
    <div>
      {globalComment.map((item) => {
        return (
          <StCommentListContainer key={item.id}>
            <StCommentProfileImage src='images/default_profile.webp' alt='' />
            <StCommentUserName>사용자 닉네임</StCommentUserName>
            {/* <div>{item.id}</div> */}
            <StCommentContent>{item.comment}</StCommentContent>
            <StCommentContentSaveTime>{item.savetime}</StCommentContentSaveTime>
            <StCommentContentsEditButton>수정</StCommentContentsEditButton>
            <StCommentContentsDeleteButton
              onClick={() => {
                deleteCommentHandler(item.id);
              }}
            >
              삭제
            </StCommentContentsDeleteButton>
          </StCommentListContainer>
        );
      })}
    </div>
  );
};

export default CommentList;

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
  width: 700px;
`;

const StCommentUserName = styled.div`
  font-size: 17px;
`;

const StCommentContentsContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const StCommentContent = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
`;

const StCommentContentSaveTime = styled.div`
  font-size: 13px;
  color: #464646;
`;

const StCommentContentsEditButton = styled.button`
  width: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

const StCommentContentsDeleteButton = styled.button`
  width: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
