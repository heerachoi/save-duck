import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

const CommentList = () => {
  const globalComment = useSelector((state) => state.comments);

  // // 수정 모드 확인 state
  // const [edited, setEdited] = useState(false);

  return (
    <div>
      {globalComment.map((item) => {
        return <CommentItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default CommentList;
