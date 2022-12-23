import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ShopGuideDetails = () => {
  const [comment, setComment] = useState('');

  const onChangeHandler = (event) => {};

  // 게시글 삭제 기능
  const deleteButtonClickHandler = () => {
    window.confirm('해당 게시글을 삭제하시겠습니까?');
  };

  // 댓글 작성 인풋창 내용 입력 시 state 업데이트
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
        <StCommentForm>
          <StCommentInput
            id='comment'
            placeholder='댓글을 입력해주세요.'
            value={comment}
            onChange={CommentChangeHandler}
          />
          <StCommentSaveButton>댓글 등록</StCommentSaveButton>
        </StCommentForm>
      </StCommentContainer>
      {/* 댓글 리스트 */}
      <div>
        <ul>
          <StCommentListContainer>
            <StCommentProfileImage src='images/default_profile.webp' alt='' />
            <StCommentUserName>사용자 닉네임</StCommentUserName>
            <StCommentContentsContainer>
              <StCommentContent>작성된 댓글이 보여집니다.</StCommentContent>
              <StCommentContentSaveTime>
                2022년 12월 19일 20시 20분
              </StCommentContentSaveTime>
            </StCommentContentsContainer>
            <StCommentContentsEditButton>수정</StCommentContentsEditButton>
            <StCommentContentsDeleteButton>삭제</StCommentContentsDeleteButton>
          </StCommentListContainer>
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
  /* align-items: center; */
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
  /* text-align: right; */
  /* width: 60%; */
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
