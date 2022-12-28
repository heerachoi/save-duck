import { v4 as uuidv4 } from 'uuid';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';

// POST를 추가하는 Action Creator
export const addpost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    post,
  };
};

// POST를 삭제하는 Action Creator
export const deletepost = (post) => {
  return {
    type: DELETE_POST,
    post,
  };
};

const initialState = [
  {
    id: uuidv4(),
    title: '오늘 이마트에서 떡볶이 재료 구매 리스트 공유드려요! 핵맛!!',
    user: '닉네임1189',
    date: '22.12.19',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate diam in nisl lobortis, at elementum purus consectetur. Aliquam sodales pellentesque neque eu mollis. Mauris justo magna, pretium non risus dapibu...',
  },
  {
    id: uuidv4(),
    title: '[쇼핑가이드] 한국소비자원 비교공감 - 무선청소기편!!',
    user: '닉네임1189',
    date: '22.12.19',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate diam in nisl lobortis, at elementum purus consectetur. Aliquam sodales pellentesque neque eu mollis. Mauris justo magna, pretium non risus dapibu...',
  },
];

const lists = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const new_post = [...state, action.post];
      return new_post;

    case DELETE_POST:
      const deleted_post = state.filter((post) => post.id !== action.id);
      return deleted_post;

    default:
      return state;
  }
};

export default lists;
