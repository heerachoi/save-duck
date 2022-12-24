import { createStore, combineReducers, applyMiddleware } from 'redux';
import shoppingList from '../modules/shoppingListActions';
import lists from '../modules/list';
import comments from '../modules/comment';

const rootReducer = combineReducers({
  lists,
  comments,
  shoppingList,
});

const store = createStore(rootReducer);

export default store;
