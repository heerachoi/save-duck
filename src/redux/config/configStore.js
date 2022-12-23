import { createStore, combineReducers } from 'redux';
import lists from '../modules/list';
import comments from '../modules/comments';

const rootReducer = combineReducers({
  lists,
});

const store = createStore(rootReducer);

export default store;
