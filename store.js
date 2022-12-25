import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';

const middlewares = [thunk.withExtraArgument(getFirebase)];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
