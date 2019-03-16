import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewareList: any = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middlewareList.push(createLogger());

const str = createStore(reducers, {}, compose(applyMiddleware(...middlewareList)));
sagaMiddleware.run(rootSaga);

export const store = str;
