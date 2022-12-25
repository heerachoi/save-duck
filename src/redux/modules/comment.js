import { v4 as uuidv4 } from 'uuid';

//  Action Value

const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const MODIFY_MODE_COMMENT = 'MODIFY_MODE_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';

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

export const modifyModeComment = (payload) => {
  return {
    type: MODIFY_MODE_COMMENT,
    payload,
  };
};

export const updateComment = (payload) => {
  return {
    type: UPDATE_COMMENT,
    payload,
  };
};

// Initial State

const initialState = [
  {
    id: uuidv4(),
    comment: '댓글 내용 1',
    savetime: '2022-12-24-16:32',
    modify: false,
  },
  {
    id: uuidv4(),
    comment: '댓글 내용 2',
    savetime: '2022-12-25-09:05',
    modify: false,
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
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    case MODIFY_MODE_COMMENT:
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            modify: !item.modify,
          };
        } else {
          return item;
        }
      });
    case UPDATE_COMMENT:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            comment: action.payload.comment,
          };
        } else {
          return item;
        }
      });

    default:
      return state;
  }
};

export default comments;
