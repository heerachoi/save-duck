// applyMiddleware는 스토어에 미들웨어를 적용하기 위해 불러옴
import { createStore, combineReducers, applyMiddleware } from 'redux';
// 만든 리덕스 모듈의 리듀서
import shoppingList from '../modules/shoppingListActions';

const rootReducer = combineReducers({
  shoppingList,
});

const store = createStore(rootReducer);

export default store;
