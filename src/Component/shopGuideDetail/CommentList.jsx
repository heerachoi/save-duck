import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { deleteComment, modifyModeComment } from '../../redux/modules/comment';
import CommentItem from './CommentItem';
import styled from 'styled-components';
import {
  collection,
  getDocs,
  query,
  orderBy,
  // where,
} from 'firebase/firestore';
import { db } from '../../firebase';

const CommentList = () => {
  // const globalComment = useSelector((state) => state.comments);

  const [commentList, setCommentList] = useState([]);

  // 댓글 불러오기
  const syncTodoItemListStateWithFirestore = () => {
    const q = query(
      collection(db, 'commentList'),
      // where('userId', '==', currentUser),
      orderBy('savetime', 'desc')
    );

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        firestoreTodoItemList.push({
          id: doc.id,
          comment: doc.data().comment,
          userId: doc.data().userId,
        });
      });
      setCommentList(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    syncTodoItemListStateWithFirestore();
  }, []);

  return (
    <div>
      {commentList.map((item) => {
        return (
          <CommentItem
            key={item.id}
            item={item}
            syncTodoItemListStateWithFirestore={
              syncTodoItemListStateWithFirestore
            }
          />
        );
      })}
    </div>
  );
};

export default CommentList;
