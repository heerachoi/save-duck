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
          savetime: doc.data().savetime,
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
