import React, { useEffect } from 'react';
import ShopGuideDetailsComment from '../shopGuideDetailsComment/ShopGuideDetailsComment.jsx';
import { StCommentListContainer } from './ShopGuideDetailsCommentList.js';
import {
  collection,
  getDocs,
  query,
  orderBy,
  // where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { getAuth } from "firebase/auth";
import { useAuth } from '../../firebase.js';
import { useParams } from 'react-router-dom';



const ShopGuideDetailsCommentList = ({
  // collectionName,
  commentItemtList,
  setCommentItemList,
  comment,
  postingId,
}) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  let NavId = useParams();
  const commentCollectionName = NavId.id;

  // 댓글 불러오기 - DB에서 이전 댓글 리스트 불러오기
  const syncCommentListStateWithFirestore = () => {






    const q = query(
      collection(db, 'commentList'),
      // where('postingId', '==', CurrentPostingId),
      !orderBy('savetime', 'desc')
    );

    getDocs(q, currentUser).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          comment: doc.data().comment,
          userId: doc.data().userId,
          savetime: doc.data().savetime,
          modify: doc.data().modify,
          postingId: doc.data().postingId,
          creatorId: doc.data().creatorId,
          commentcreatorid: doc.data().commentcreatorid,
        });
      });
      setCommentItemList(firestoreTodoItemList);
    });
  };

  // useEffect(() => {
  //   syncCommentListStateWithFirestore();
  // }, [commentItemtList]);

  useEffect(() => {
    syncCommentListStateWithFirestore();
  }, []);


  return (
    <StCommentListContainer>
      {commentItemtList.map((item) => {
        if (postingId === item.postingId) {
          return (
            <ShopGuideDetailsComment
              key={item.id}
              item={item}
              commentItemtList={commentItemtList}
              setCommentItemList={setCommentItemList}
              syncCommentListStateWithFirestore={
                syncCommentListStateWithFirestore
              }
            />
          );
        }
      })}
    </StCommentListContainer>
  );
};

export default ShopGuideDetailsCommentList;
