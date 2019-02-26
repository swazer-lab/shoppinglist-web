import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';

import authSagas from './auth';

export default function* rootSaga(): SagaIterator {
	yield all([
		...authSagas,
	]);
}
