import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '../redux/modules/comment';
import CommentList from '../Component/commentList/CommentList';
import moment from 'moment';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ShopGuideDetails = () => {
  const [comment, setComment] = useState('');
  const globalComment = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  const onChangeHandler = (event) => {};

  // 게시글 삭제 버튼 - 클릭 시 comfirm 확인 후 삭제
  const deleteButtonClickHandler = () => {
    window.confirm('해당 게시글을 삭제하시겠습니까?');
  };

  // 댓글 등록 버튼 - 클릭시 댓글 리스트에 작성한 댓글 추가
  const commentSubmitHandler = (event) => {
    event.preventDefault();
    const newComment = {
      id: uuidv4(),
      comment,
      savetime: moment().format('YYYY-MM-DD-hh:mm'),
    };
    // console.log(newComment);
    dispatch(addComment(newComment));
    setComment('');
  };

  // 댓글 작성 인풋창 - 내용 입력 시 state 업데이트
  const CommentChangeHandler = (event) => {
    setComment(event.target.value);
  };

  return (
    <StShopDetailsContainer>
      {/* 게시글 영역 */}
      <StShopDetailsArticle>
        <StShopDetailsArticleTitle>
          게시글의 제목이 들어갑니다.
        </StShopDetailsArticleTitle>
        <StShopDetailsImage
          className='detailsMainImage'
          src='images/shop_guide_detail_image.jpg'
          alt='떡볶이 사진'
        />
        <StShopDetailsArticleContents>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          vulputate diam in nisl lobortis, at elementum purus consectetur.
          Aliquam sodales pellentesque neque eu mollis. Mauris justo magna,
          pretium non risus dapibu in nisl lobortis, at elementum purus
          consectetur. Aliquam sodales pellentesque neque eu mollis. Mauris
          justo magna, pretium non risus dapibu in nisl lobortis, at elementum
          purus consectetur. Aliquam sodales pellentesque neque eu mollis.
          Mauris justo magna, pretium non risus dapibu in nisl lobortis, at
          elementum purus consectetur. Aliquam sodales pellentesque neque eu
          mollis. Mauris justo magna, pretium non risus dapibu
        </StShopDetailsArticleContents>
      </StShopDetailsArticle>
      {/* 수정 / 삭제 버튼 */}
      <StShopDetailsEditButtons>
        <FontAwesomeIcon
          id='articleEditButton'
          icon={faPen}
          style={{ cursor: 'pointer' }}
        />
        <FontAwesomeIcon
          id='articleDeleteButton'
          icon={faTrashCan}
          onClick={deleteButtonClickHandler}
          style={{ cursor: 'pointer' }}
        />
      </StShopDetailsEditButtons>
      {/* 댓글 영역 */}
      <br />
      <StCommentContainer>
        {/* 댓글 작성란 */}

        <StCommentMyProfileImage src='images/default_profile.webp' alt='' />
        <StCommentForm onSubmit={commentSubmitHandler}>
          <StCommentInput
            id='comment'
            placeholder='댓글을 입력해주세요.'
            value={comment}
            onChange={CommentChangeHandler}
          />
          <StCommentSaveButton type='submit'>댓글 등록</StCommentSaveButton>
        </StCommentForm>
      </StCommentContainer>
      {/* 댓글 리스트 */}
      <div>
        <ul>
          <CommentList />
        </ul>
      </div>
    </StShopDetailsContainer>
  );
};

export default ShopGuideDetails;

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
`;

const StShopDetailsImage = styled.img`
  width: 500px;
  height: 300px;
  margin-bottom: 30px;
  object-fit: cover;
`;

// 게시글 수정 버튼
const StShopDetailsEditButtons = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 80px;
  font-size: 20px;
`;

// 댓글 영역
const StCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
`;

const StCommentInput = styled.textarea`
  width: 600px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
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
