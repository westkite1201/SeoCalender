import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'mobx-react';
import './index.css';
//import './Loading.css'
import Root from './client/Root';
//import RootStore from './stores';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// const root = new RootStore(); // *** 루트 스토어 생성
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
