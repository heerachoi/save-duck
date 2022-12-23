import { firestore } from '../../firebase';

const LOAD_LIST = 'LOAD_LIST';
const ADD_LIST = 'ADD_LIST';
const DELETE_LIST = 'DELETE_LIST';

// Action Creators - load list
export const loadList = (shoppingList) => {
  return { type: LOAD_LIST, shoppingList };
};

// Firestore에서 collection을 가져옴
const list_db = firestore.collection('shoppingList');

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

// Firebase와 통신하는 함수. 함수를 반환한다.
// Firebase에서 데이터를 가져오는 부분 (LOAD)
export const loadListFB = () => {
  // 함수를 반환하는 미들웨어 부분
  return function (dispatch) {
    list_db.get().then((docs) => {
      // Firestore에서 가져온 데이터를 저장할 변수
      let list_data = [];
      // "bucket" 콜렉션의 모든 문서에서 데이터와 id를 가져옴!
      docs.forEach((doc) => {
        if (doc.exists) {
          list_data = [...list_data, { id: doc.id, ...doc.data() }];
        }
      });
      console.log('list_data');
      console.log(list_data);

      // firestore에서 가져온 데이터를 action에 넣어서 dispatch 해준다!
      // 리덕스 모듈에서 action을 dispatch 해주므로 컴포넌트에서는 firestore와
      // 통신하는 함수를 불러주면 된다!
      dispatch(loadList(list_data));
    });
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
      console.log(deleted_shopping_list);
      return { shoppingList: deleted_shopping_list };

    default:
      return state;
  }
}
