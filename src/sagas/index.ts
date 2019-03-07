import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';

import authSagas from './auth';
import cartsSagas from './carts';
import profileSagas from './profile';

export default function* rootSaga(): SagaIterator {
	yield all([
		...authSagas,
		...cartsSagas,
		...profileSagas
	]);
}
