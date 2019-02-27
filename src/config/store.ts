import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewareList = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
	// @ts-ignore
	middlewareList.push(createLogger());
}

const enhancers = [applyMiddleware(...middlewareList)];
const initialState = {};
const persistConfig = { enhancers };
const str = createStore(reducers, initialState, compose(...enhancers));
// @ts-ignore
const prst = persistStore(str, persistConfig);
sagaMiddleware.run(rootSaga);

export const store = str;
export const persistor = prst;
