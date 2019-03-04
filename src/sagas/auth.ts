import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { AppState } from '../types/store';

import { register_api, login_api, confirm_email_api, forgot_password_api, send_reset_code_api } from '../api/auth';
import { registerResult, loginResult, confirmEmailResult, sendForgotPasswordEmailResult } from '../actions/auth';
import { ActionTypes, ConfirmEmailAction } from '../types/auth';
import { hideProgress, showProgress, setAccessToken, setIsLoggedIn } from '../actions/service';

import { EMAIL_VALIDATOR } from '../config/utilities';

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
		const { access_token } = response.data;

		yield all([
			put(loginResult(false, access_token)),
			put(setAccessToken(access_token)),
			put(setIsLoggedIn(true)),
		]);
	} catch (e) {
		yield put(loginResult(true));
	}
}

function* confirmEmailSaga(action: ConfirmEmailAction): SagaIterator {
	const { userId, token } = action;

	yield put(showProgress('Confirming Email'));
	try {
		yield call(confirm_email_api, userId, token);
		yield put(confirmEmailResult(false));
	} catch (e) {
		yield put(confirmEmailResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* sendForgotPasswordEmailSaga(): SagaIterator {
	console.log('Sending reset password email...');

	const { email } = yield select((state: AppState) => state.auth);

	yield put(showProgress('Sending reset password email...'));
	try {
		yield call(forgot_password_api, email);
		yield put(sendForgotPasswordEmailResult(false));
	} catch (e) {
		yield put(sendForgotPasswordEmailResult(true));
	} finally {
		yield put(hideProgress());
	}
}

function* sendResetPasswordSaga(): SagaIterator {
	const { resetCode, resetPassword } = yield select((state: AppState) => state.auth);

	try {
		yield call(send_reset_code_api, resetCode, resetPassword);
		yield put(sendForgotPasswordEmailResult(false));
	} catch (e) {
		yield put(sendForgotPasswordEmailResult(true));
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.register, registerSaga),
	takeLatest(ActionTypes.login, loginSaga),
	takeLatest(ActionTypes.confirm_email, confirmEmailSaga),
	takeLatest(ActionTypes.send_forgot_password_email, sendForgotPasswordEmailSaga),
	takeLatest(ActionTypes.send_reset_password, sendResetPasswordSaga),
];
