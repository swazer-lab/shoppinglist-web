import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import redux_logger from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, redux_logger));
sagaMiddleware.run(rootSaga);
