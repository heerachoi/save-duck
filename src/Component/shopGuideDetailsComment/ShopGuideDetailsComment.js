import styled from 'styled-components';

// 댓글 리스트 영역
export const StCommentProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  /* margin-right: 15px; */
`;

export const StCommentListContainer = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 850px;
  margin-bottom: 20px;
`;

export const StCommentUserName = styled.div`
  font-size: 17px;
`;

export const StCommentContentInput = styled.textarea`
  font-size: 15px;
  margin-bottom: 10px;
  width: 400px;
  min-width: 300px;
  min-height: 80px;
  border: none;
  background-color: #eeeeee;
  resize: none;
`;

export const StCommentContentSaveTime = styled.div`
  font-size: 13px;
  color: #464646;
`;

export const StCommentContentsEditButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

export const StCommentContentsDeleteButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
