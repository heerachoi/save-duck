import { createStore, combineReducers } from 'redux';
import list from '../modules/list';

const rootReducer = combineReducers({
  list,
});

const store = createStore(rootReducer);

export default store;
