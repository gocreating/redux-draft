import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as draftReducer } from '../../lib';
import App from './App';

let rootReducer = combineReducers({
  draft: draftReducer,
});
let store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
