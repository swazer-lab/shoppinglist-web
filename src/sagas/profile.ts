import { morphism } from 'morphism';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetch_profile_api } from '../api';
import { profileMapper } from '../config/mapper';

import { showProgress, hideProgress, showHttpErrorAlert } from '../actions/service';
import { fetchProfileResult } from '../actions/profile';

import { ActionTypes } from '../types/profile';

function* fetchProfileSaga() {
	yield put(showProgress('Fetch Profile'));
	try {
		const response = yield call(fetch_profile_api);
		const data = yield call(morphism, profileMapper(), response.data);

		yield put(fetchProfileResult(false, data));
	} catch (e) {
		yield all([
			put(fetchProfileResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.fetch_profile, fetchProfileSaga),
];