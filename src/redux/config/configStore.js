import { createStore, combineReducers } from 'redux';
import lists from '../modules/list';
import comments from '../modules/comment';

const rootReducer = combineReducers({
  lists,
  comments,
});

const store = createStore(rootReducer);

export default store;
