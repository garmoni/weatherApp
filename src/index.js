import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thank from 'redux-thunk'
import './index.css';
import App from './App';

import { rootReduser } from './components/redux/rootReducer';

const store = createStore(rootReduser, compose(
  applyMiddleware(thank),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'));

