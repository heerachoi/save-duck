import { createStore, combineReducers, applyMiddleware } from "redux";
import shoppingList from "../modules/shoppingListActions";
import lists from "../modules/list";
import comments from "../modules/comment";
import profileName from "../modules/profile";
// import ItemsReducer from '../modules/ItemReducer';
const rootReducer = combineReducers({
  lists,
  comments,
  shoppingList,
  profileName,
});

export default rootReducer;
