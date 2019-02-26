import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';

import { register_api, login_api } from '../api/auth';
import { registerResult, loginResult } from '../actions/auth';

import { EMAIL_VALIDATOR } from '../config/utilities';
import { ActionTypes } from '../types/auth';

function* registerSaga(): SagaIterator {
	const { name, email, phone, password } = yield select((state: AppState) => state.auth);

	if (!name) {
		yield put(registerResult(true));
		return;
	}
	if (!email) {
		yield put(registerResult(true));
		return;
	}
	if (!phone) {
		yield put(registerResult(true));
		return;
	}
	if (!password) {
		yield put(registerResult(true));
		return;
	}
	if (!EMAIL_VALIDATOR.test(String(email).toLowerCase())) {
		yield put(registerResult(true));
		return;
	}
	if (password.length > 6) {
		yield put(registerResult(true));
		return;
	}

	try {
		const response = yield call(register_api, name, email, phone, password);
		const { data } = response;

		yield put(registerResult(false, data.access_token));
	} catch (e) {
		yield put(registerResult(true));
	}
}

function* loginSaga(): SagaIterator {
	const { email, password } = yield select((state: AppState) => state.auth);

	if (!email) {
		yield put(loginResult(true));
		return;
	}
	if (!password) {
		yield put(loginResult(true));
		return;
	}
	if (!EMAIL_VALIDATOR.test(String(email).toLowerCase())) {
		yield put(loginResult(true));
		return;
	}
	if (password.length > 6) {
		yield put(loginResult(true));
		return;
	}

	try {
		const response = yield call(login_api, email, password);
		const { data } = response;

		yield put(loginResult(false, data.access_token));
	} catch (e) {
		yield put(loginResult(true));
	}
}

export default [
	takeLatest(ActionTypes.register, registerSaga),
	takeLatest(ActionTypes.login, loginSaga),
];
