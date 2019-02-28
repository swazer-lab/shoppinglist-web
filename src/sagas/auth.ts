import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';

import {register_api, login_api, confirm_email_api, forgot_password_api} from '../api/auth';
import {registerResult, loginResult, confirmEmailResult, forgotPasswordResult} from '../actions/auth';

import { EMAIL_VALIDATOR } from '../config/utilities';
import {ActionTypes, ConfirmEmailAction, ForgotPasswordAction} from '../types/auth';

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

function* confirmEmailSaga(action: ConfirmEmailAction): SagaIterator {
	const { userId, token } = action;

	yield put(showProgress('Confirming Email'));
	try {
		yield call(confirm_email_api, userId, token);
		yield put(confirmEmailResult(true, true));
	} catch (e) {
		yield put(confirmEmailResult(false, false));
	} finally {
		yield put(hideProgress());
	}
}

function* forgotEmailSaga(action: ForgotPasswordAction): SagaIterator {
	const { email} = yield select((state: AppState) => state.auth);

	try {
		yield call(forgot_password_api, email);
		yield put(forgotPasswordResult(false, true));
	} catch (e) {
		yield put(forgotPasswordResult(true, false));
	}
}

export default [
	takeLatest(ActionTypes.register, registerSaga),
	takeLatest(ActionTypes.login, loginSaga),
	takeLatest(ActionTypes.confirm_email, confirmEmailSaga),
	takeLatest(ActionTypes.forgot_password_email, forgotEmailSaga)
];
