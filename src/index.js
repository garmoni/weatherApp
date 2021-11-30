import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import thank from 'redux-thunk'
import './index.css';
import App from './App';

import { rootReduser } from './components/redux/rootReducer';

const persistedState = localStorage.getItem('redux-store') 
? JSON.parse(localStorage.getItem('redux-store'))
: {}

const store = createStore(rootReduser, persistedState, compose(
    applyMiddleware(thank),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)
//localStorage.clear()
store.subscribe(() => {
  localStorage.setItem('redux-store', JSON.stringify(store.getState()))
})

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'));

