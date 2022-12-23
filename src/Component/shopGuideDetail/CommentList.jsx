import React from 'react';
import { useSelector } from 'react-redux';

const CommentList = () => {
  const globalComment = useSelector((state) => state.comments);

  console.log(globalComment);

  return (
    <div>
      {globalComment.map((item) => {
        return (
          <li key={item.id}>
            <div>{item.id}</div>
            <div>{item.comment}</div>
          </li>
        );
      })}
    </div>
  );
};

export default CommentList;
