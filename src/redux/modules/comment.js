import { v4 as uuidv4 } from 'uuid';

//  Action Value

const ADD_COMMENT = 'ADD_COMMENT';

// Action Creator
// comment 추가 액션
export const addTodo = (payload) => {
  return {
    type: ADD_COMMENT,
    payload,
  };
};

// Initial State

const initialState = {
  commentList: [
    {
      id: uuidv4(),
      comment: '댓글 내용 1',
    },
    {
      id: uuidv4(),
      comment: '댓글 내용 2',
    },
  ],
};

// Reducer

const comments = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        todos: [...state.commentList, action.payload],
      };

    default:
      return state;
  }
};

// export default reducers
export default comments;
