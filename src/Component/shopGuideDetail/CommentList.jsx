import React, { useEffect, useState } from 'react';

import CommentItem from './CommentItem';
import {
  collection,
  getDocs,
  query,
  orderBy,
  // where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import styled from 'styled-components';

const CommentList = ({
  collectionName,
  commentItemtList,
  setCommentItemList,
}) => {
  // const globalComment = useSelector((state) => state.comments);

  // const [commentList, setCommentList] = useState([]);

  // 댓글 불러오기
  const syncCommentListStateWithFirestore = () => {
    const q = query(
      collection(db, collectionName),
      // where('userId', '==', currentUser),
      !orderBy('savetime', 'desc')
    );

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        firestoreTodoItemList.push({
          id: doc.id,
          comment: doc.data().comment,
          userId: doc.data().userId,
          savetime: doc.data().savetime,
          modify: doc.data().modify,
        });
      });
      setCommentItemList(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    syncCommentListStateWithFirestore();
  }, []);

  return (
    <StCommentListContainer>
      {commentItemtList.map((item) => {
        return (
          <CommentItem
            key={item.id}
            item={item}
            syncCommentListStateWithFirestore={
              syncCommentListStateWithFirestore
            }
            collectionName={collectionName}
          />
        );
      })}
    </StCommentListContainer>
  );
};

export default CommentList;

const StCommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
