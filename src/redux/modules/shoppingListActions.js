import { v4 as uuidv4 } from 'uuid';

//  Action Value
const ADD_LIST = 'ADD_LIST';
const DELETE_LIST = 'DELETE_LIST';
const LOAD_LIST = 'LOAD_LIST';
const MODIFY_MODE_LIST = 'MODIFY_MODE_LIST';
const UPDATE_LIST = 'UPDATE_LIST';
const CHECK_LIST = 'CHECK_LIST';

// Action Creator
// LIST를 추가하는 Action Creator
export const addList = (payload) => {
  return {
    type: ADD_LIST,
    payload,
  };
};

// LIST를 삭제하는 Action Creator
export const deleteList = (payload) => {
  return {
    type: DELETE_LIST,
    payload,
  };
};

// LIST를 가져오는 Action Creator
export const loadList = (payload) => {
  return { type: LOAD_LIST, payload };
};

// LIST를 수정중인지 확인하는 Action Creator
export const modifyModeList = (payload) => {
  return {
    type: MODIFY_MODE_LIST,
    payload,
  };
};

// LIST를 수정하는 Action Creator
export const updateList = (payload) => {
  return { type: UPDATE_LIST, payload };
};

// LIST에 체크하는 Action Creator
export const checkList = (payload) => {
  return { type: CHECK_LIST, payload };
};

// Initial State
const initialState = [
  {
    id: uuidv4(),
    name: '복숭아',
    date: '20221219',
    price: 1000,
    isChecked: false,
    modify: false,
  },
  {
    id: uuidv4(),
    name: '감자',
    date: '20221219',
    price: 4000,
    isChecked: true,
    modify: false,
  },
];

const lists = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          date: action.payload.date,
          price: action.payload.price,
          isChecked: action.payload.isChecked,
        },
      ];
    case DELETE_LIST:
      return state.filter((item) => {
        return item.id !== action.payload;
      });
    case LOAD_LIST:
      return state.map((item) => {
        if (item.date === action.payload) {
          return {
            ...item,
            modify: !item.modify,
          };
        } else {
          return item;
        }
      });
    case MODIFY_MODE_LIST:
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
    case UPDATE_LIST:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            item: action.payload.item,
          };
        } else {
          return item;
        }
      });
    case CHECK_LIST: {
      const newState = state.map((item) => {
        return item.id === action.payload.id
          ? {
              ...item,
              isChecked: !item.isChecked,
            }
          : item;
      });
      return newState;
    }
    default:
      return state;
  }
};

export default lists;
