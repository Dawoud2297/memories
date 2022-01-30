import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import {  BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import thunk from 'redux-thunk'
import { reducers } from './reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducers,compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
,  document.getElementById('root')
);