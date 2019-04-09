import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';

import { AppState } from '../types/store';

import {
	confirm_email_api,
	login_api,
	login_external_api,
	register_api,
	resend_confirm_email_api,
	reset_password_api,
	send_forgot_password_email_api,
	update_password_api
} from '../api';

import {
	hideProgress,
	navigate,
	setAccessToken,
	setIsEmailConfirmed,
	setIsLoggedIn,
	showAlert,
	showHttpErrorAlert,
	showProgress,
} from '../actions/service';
import {
	confirmEmailResult,
	loginResult,
	registerResult,
	resetPasswordResult,
	sendForgotPasswordEmailResult, updatePasswordResult,
} from '../actions/auth';

import { clearProfile } from '../actions/profile';
import { clearCarts } from '../actions/carts';

import { ActionTypes, ConfirmEmailAction, ExternalLoginAction, ResendConfirmEmailAction } from '../types/auth';
import language from '../assets/language';

function* registerSaga() {
	const { name, email, password } = yield select((state: AppState) => state.auth);

	yield put(showProgress(language.textRegisteringUser));
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
		yield all([
			put(registerResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* loginSaga() {
	const { email, password } = yield select((state: AppState) => state.auth);

	yield put(showProgress(language.textLoggingUser));
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
		yield all([
			put(loginResult(true)),
			put(showAlert('error', '', language.titleAuthFailed)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* externalLoginSaga(action: ExternalLoginAction) {
	const { name, email, tokenId, provider } = action;

	yield put(showProgress(language.textLoggingUser));
	try {
		const response = yield call(login_external_api, name, email, tokenId, provider);
		const { access_token } = response.data;

		yield all([
			put(loginResult(false)),
			put(setAccessToken(access_token)),
			put(setIsLoggedIn(true)),
		]);
		yield put(navigate('Carts'));
	} catch (e) {
		yield all([
			put(loginResult(true)),
			put(showAlert('error', '', language.titleAuthFailed)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* confirmEmailSaga(action: ConfirmEmailAction) {
	const { userId, token } = action;

	yield put(showProgress(language.textConfirmingEmail));
	try {
		yield call(confirm_email_api, userId, token);
		yield all([
			put(confirmEmailResult(false)),
			put(setIsEmailConfirmed(true)),
		]);
	} catch (e) {
		yield all([
			put(confirmEmailResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* updatePasswordSaga() {
	const { oldPassword, password } = yield select((state: AppState) => state.auth);

	yield put(showProgress('Updating password'));
	try {
		yield call(update_password_api, oldPassword, password);
		yield all([
			put(updatePasswordResult(false)),
			put(navigate('Login')),
		]);
	} catch (e) {
		yield all([
			put(updatePasswordResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* resendConfirmEmailSaga(action: ResendConfirmEmailAction) {
	const { userId } = action;

	yield put(showProgress(language.textConfirmingEmail));
	try {
		yield call(resend_confirm_email_api, userId);
		yield all([
			put(confirmEmailResult(false)),
			put(showAlert('success', '', language.textConfirmEmailSuccessMessage)),
		]);
	} catch (e) {
		yield all([
			put(confirmEmailResult(true)),
			put(showAlert('error', '', language.textConfirmEmailErrorMessage)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* sendForgotPasswordEmailSaga() {
	const { email } = yield select((state: AppState) => state.auth);

	yield put(showProgress(language.textSendingEmailForForgotPassword));
	try {
		yield call(send_forgot_password_email_api, email);
		yield all([
			put(sendForgotPasswordEmailResult(false)),
			put(showAlert('success', '', language.textWeSentResetPasswordEmail)),
		]);
	} catch (e) {
		yield all([
			put(sendForgotPasswordEmailResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* resetPasswordSaga() {
	const { email, password, resetPasswordCode } = yield select((state: AppState) => state.auth);

	yield put(showProgress(language.textResettingEmail));
	try {
		yield call(reset_password_api, email, password, resetPasswordCode);

		yield all([
			put(resetPasswordResult(false)),
			put(navigate('Login')),
		]);
	} catch (e) {
		yield all([
			put(resetPasswordResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* logoutSaga() {
	yield all([
		put(clearProfile()),
		put(clearCarts()),
		put(setIsLoggedIn(false)),
		put(setIsEmailConfirmed(false)),
		put(setAccessToken('')),
	]);
}

export default [
	takeLatest(ActionTypes.register, registerSaga),
	takeLatest(ActionTypes.login, loginSaga),
	takeLeading(ActionTypes.confirm_email, confirmEmailSaga),
	takeLatest(ActionTypes.send_forgot_password_email, sendForgotPasswordEmailSaga),
	takeLatest(ActionTypes.reset_password, resetPasswordSaga),
	takeLatest(ActionTypes.logout, logoutSaga),
	takeLatest(ActionTypes.external_login, externalLoginSaga),
	takeLatest(ActionTypes.resend_confirm_email, resendConfirmEmailSaga),
	takeLatest(ActionTypes.update_password, updatePasswordSaga)
];
