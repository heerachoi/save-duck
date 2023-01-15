import styled from 'styled-components';
// import ShopGuideArticle from '../../pages/ShopGuideArticle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 댓글 리스트 영역

export const StCommentContainer = styled.div`
  width: 60%;
`;

export const StCommentListContainer = styled.li`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  margin-top: 10px;
  gap: 10px;
  position: relative;
`;

export const StCommentCreateInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StCommentProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-right: 10px;
`;

export const StCreateInfo = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const StCommentUserName = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-right: 10px;
`;

export const StCommentContentInput = styled.textarea`
  font-size: 15px;
  margin-bottom: 10px;
  width: 500px;
  min-width: 300px;
  min-height: 40px;
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

export const StButtonContainer = styled.div`
  width: 100px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: -10px;
  right: 125px;
`;

export const StCommentContentsEditButton = styled.button`
  width: 50px;
  height: 30px;
  font-size: 10px;
  border-radius: 100px;
  background-color: lightgray;
  color: black;
  border: none;
  cursor: pointer;
  margin-right: 5px;
  &:hover {
    background-color: #ff8a00;
    color: #fff;
  }
`;

export const StCommentContentsDeleteButton = styled.button`
  width: 50px;
  height: 30px;
  font-size: 10px;
  border-radius: 100px;
  background-color: lightgray;
  color: black;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ff8a00;
    color: #fff;
  }
`;
