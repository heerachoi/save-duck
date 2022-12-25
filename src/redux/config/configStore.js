import { createStore, combineReducers, applyMiddleware } from 'redux';
import shoppingList from '../modules/shoppingListActions';
import lists from '../modules/list';
import comments from '../modules/comment';
// import ItemsReducer from '../modules/ItemReducer';
const rootReducer = combineReducers({
  lists,
  comments,
  shoppingList,
});

export default rootReducer;
