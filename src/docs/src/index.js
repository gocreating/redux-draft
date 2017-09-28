import React from 'react';
import { render } from 'react-snapshot';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as draftReducer } from '../../../lib/index';
import App from './App';

let rootReducer = combineReducers({
  draft: draftReducer,
});
let store = createStore(rootReducer);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));
