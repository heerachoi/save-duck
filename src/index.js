import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import store from '../src/redux/config/configStore';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../src/redux/config/configStore';
import thunk from 'redux-thunk';

const container = document.getElementById('root');
const root = createRoot(container);
const store = createStore(rootReducer, applyMiddleware(thunk));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
