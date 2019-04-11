import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from '../sagas';
import { updateDefaultHeaders } from '../api';

const sagaMiddleware = createSagaMiddleware();
const middlewareList: any = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') middlewareList.push(createLogger());

const write = (storage: any) => {
	localStorage.setItem('root', JSON.stringify(storage));
};
const read = (): any => {
	let storage = {
		isLoggedIn: false,
		accessToken: '',
		isEmailConfirmed: false,
		activeLanguage: 'en',
	};
	const data = localStorage.getItem('root');

	if (data) {
		storage = JSON.parse(data);
	}
	return storage;
};

const str = createStore(reducers, read(), compose(applyMiddleware(...middlewareList)));
sagaMiddleware.run(rootSaga);

export const store = str;

store.subscribe(() => {
	write({ storage: store.getState().storage });
});