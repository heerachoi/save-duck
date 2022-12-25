import { db } from '../../firebase';

const LOAD_LIST = 'LOAD_LIST';
const ADD_LIST = 'ADD_LIST';
const DELETE_LIST = 'DELETE_LIST';

// Action Creators - load list
export const loadList = (shoppingList) => {
  return { type: LOAD_LIST, shoppingList };
};

// Firestore에서 collection을 가져옴
// const list_db = firestore.collection('shoppingList');
// const list_db = db.collection('shoppingList');

const initialState = [
  {
    id: 12,
    title: '복숭아',
    date: '22.12.19',
    price: 1000,
    buy: false,
  },
  {
    id: 13,
    title: '감자',
    date: '22.12.19',
    price: 4000,
    buy: false,
  },
];

// LIST를 추가하는 Action Creator
export const addList = (shoppingList) => {
  return {
    type: ADD_LIST,
    shoppingList,
  };
};

// LIST를 삭제하는 Action Creator
export const deleteList = (shoppingList) => {
  return {
    type: DELETE_LIST,
    shoppingList,
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case 'LOAD_LIST':
      // Firestore에 데이터가 있을때 리턴
      if (action.shoppingList.length > 0) {
        return { shoppingList: action.shoppingList };
      }
      // 없으면 initialState를 리턴해줌
      return state;

    case 'DELETE_LIST':
      const deleted_shopping_list = state.shoppingList.filter((item, index) => index !== action.index);
      // console.log(deleted_shopping_list);
      return { shoppingList: deleted_shopping_list };

    default:
      return state;
  }
}
