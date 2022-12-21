import { createStore, combineReducers } from 'redux';
import lists from '../modules/list';

const rootReducer = combineReducers({
  lists,
});

const store = createStore(rootReducer);

export default store;
