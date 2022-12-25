import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { deleteComment, modifyModeComment } from '../../redux/modules/comment';
import CommentItem from './CommentItem';
import styled from 'styled-components';

const CommentList = () => {
  const globalComment = useSelector((state) => state.comments);

  // 수정 모드 확인 state
  const [edited, setEdited] = useState(false);

  return (
    <div>
      {globalComment.map((item) => {
        return <CommentItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default CommentList;
