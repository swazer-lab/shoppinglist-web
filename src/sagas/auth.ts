import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';

import { register_api, login_api, confirm_email_api, send_forgot_password_email_api, reset_password_api } from '../api';

import { navigate, setAccessToken, setIsLoggedIn, setIsEmailConfirmed } from '../actions/service';
import {
	registerResult,
	loginResult,
	confirmEmailResult,
	sendForgotPasswordEmailResult,
	resetPasswordResult,
} from '../actions/auth';

import { ActionTypes, ConfirmEmailAction } from '../types/auth';

function* registerSaga(): SagaIterator {
	const { name, email, password } = yield select((state: AppState) => state.auth);

	try {
		const response = yield call(register_api, name, email, password);
		const { access_token } = response.data;

		yield all([
			put(registerResult(false)),
			put(setAccessToken(access_token)),
			put(setIsLoggedIn(true)),
		]);
		yield put(navigate('Carts'));
	} catch (e) {
		yield put(registerResult(true, e.response.data.message));
	}
}

function* loginSaga(): SagaIterator {
	const { email, password } = yield select((state: AppState) => state.auth);

	try {
		const response = yield call(login_api, email, password);
		const { access_token } = response.data;

		yield all([
			put(loginResult(false)),
			put(setAccessToken(access_token)),
			put(setIsLoggedIn(true)),
		]);
		yield put(navigate('Carts'));
	} catch (e) {
		yield put(loginResult(true, e.response.data.message));
	}
}

function* confirmEmailSaga(action: ConfirmEmailAction): SagaIterator {
	const { userId, token } = action;

	try {
		yield call(confirm_email_api, userId, token);
		yield all([
			put(confirmEmailResult(false)),
			put(setIsEmailConfirmed(true)),
		]);
	} catch (e) {
		yield put(confirmEmailResult(true, e.response.data.message));
	}
}

function* sendForgotPasswordEmailSaga(): SagaIterator {
	const { email } = yield select((state: AppState) => state.auth);

	try {
		yield call(send_forgot_password_email_api, email);
		yield put(sendForgotPasswordEmailResult(false));
	} catch (e) {
		yield put(sendForgotPasswordEmailResult(true, e.response.data.message));
	}
}

function* resetPasswordSaga(): SagaIterator {
	const { email, password, resetPasswordCode } = yield select((state: AppState) => state.auth);

	try {
		yield call(reset_password_api, email, password, resetPasswordCode);

		yield all([
			put(resetPasswordResult(false)),
			put(navigate('Login')),
		]);
	} catch (e) {
		yield put(resetPasswordResult(true, e.response.data.message));
	}
}

export default [
	takeLatest(ActionTypes.register, registerSaga),
	takeLatest(ActionTypes.login, loginSaga),
	takeLatest(ActionTypes.confirm_email, confirmEmailSaga),
	takeLatest(ActionTypes.send_forgot_password_email, sendForgotPasswordEmailSaga),
	takeLatest(ActionTypes.reset_password, resetPasswordSaga),
];