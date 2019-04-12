import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from '../sagas';
import { createStorage } from 'indexa';
import { State } from '../types/storage';
import { updateDefaultHeaders } from '../api';

const sagaMiddleware = createSagaMiddleware();
const middlewareList: any = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middlewareList.push(createLogger());

const storage = createStorage<{ storage: State }>('root');

const str = createStore(reducers, storage.getStorage(), compose(applyMiddleware(...middlewareList)));
sagaMiddleware.run(rootSaga);

export const store = str;

store.subscribe(() => {
	storage.setStorage({ storage: store.getState().storage }, true);
});
