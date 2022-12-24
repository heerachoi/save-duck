import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment } from '../../redux/modules/comment';

const CommentList = () => {
  const globalComment = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  console.log(globalComment);

  // 댓글 삭제 버튼 - 클릭시 해당만 댓글 삭제
  const deleteCommentHandler = (id) => {
    console.log(id);
    if (window.confirm('정말 삭제하시겠습니까?')) {
      {
        dispatch(deleteComment(id));
      }
    } else {
      return;
    }
  };

  return (
    <div>
      {globalComment.map((item) => {
        return (
          <li key={item.id}>
            <div>{item.id}</div>
            <div>{item.comment}</div>
            <div>{item.savetime}</div>
            <button>수정</button>
            <button
              onClick={() => {
                deleteCommentHandler(item.id);
              }}
            >
              삭제
            </button>
          </li>
        );
      })}
    </div>
  );
};

export default CommentList;
