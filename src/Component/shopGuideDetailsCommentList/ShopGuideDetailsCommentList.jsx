import React, { useEffect, useState } from 'react';
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
  collectionName,
  commentItemtList,
  setCommentItemList,
  comment,
}) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  let NavId = useParams();
  const commentCollectionName = NavId.id;

  // 댓글 불러오기 - DB에서 이전 댓글 리스트 불러오기
  const syncCommentListStateWithFirestore = () => {






    const q = query(
      collection(db, collectionName),
      // where('userId', '==', currentUser),
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
          commentcreatorid: doc.data().commentcreatorid,
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
          <ShopGuideDetailsComment
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

export default ShopGuideDetailsCommentList;
