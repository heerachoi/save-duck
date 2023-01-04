import styled from 'styled-components';
import ShopGuideArticle from '../../pages/ShopGuideArticle';

// 댓글 리스트 영역

export const StCommentListContainer = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 850px;
  margin-bottom: 20px;
  margin-top: 10px;
  gap: 10px;
`;

export const StCommentCreateInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StCommentProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  /* margin-right: 15px; */
`;

export const StCommentUserName = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

export const StCommentContentInput = styled.textarea`
  font-size: 15px;
  margin-bottom: 10px;
  width: 500px;
  min-width: 300px;
  min-height: 80px;
  border: none;
  border-radius: 5px;
  background-color: #eeeeee;
  resize: none;
  padding: 10px;
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
