import { v4 as uuidv4 } from 'uuid';

//  Action Value

const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// Action Creator
// comment 추가 액션
export const addComment = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};

// comment 삭제 액션
export const deleteComment = (payload) => {
  return {
    type: DELETE_COMMENT,
    payload,
  };
};

// Initial State

const initialState = [
  {
    id: uuidv4(),
    comment: '댓글 내용 1',
    savetime: '2022-12-24-09:11',
  },
  {
    id: uuidv4(),
    comment: '댓글 내용 2',
    savetime: '2022-12-25-09:20',
  },
];

// Reducer

const comments = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        ...state,
        {
          id: action.payload.id,
          comment: action.payload.comment,
          savetime: action.payload.savetime,
        },
      ];
    case DELETE_COMMENT:
      return state.filter((todo) => {
        return todo.id !== action.payload;
      });

    default:
      return state;
  }
};

// export default reducers
export default comments;
