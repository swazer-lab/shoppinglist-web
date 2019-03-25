import { Action as ReduxAction } from 'redux';

export enum ActionTypes {
	change_name = 'AUTH__CHANGE_NAME',
	change_email = 'AUTH__CHANGE_EMAIL',
	change_phone = 'AUTH__CHANGE_PHONE',
	change_password = 'AUTH__CHANGE_PASSWORD',

	change_reset_password_code = 'AUTH__CHANGE_RESET_PASSWORD_CODE',

	register = 'AUTH__REGISTER',
	register_result = 'AUTH__REGISTER_RESULT',

	external_login = 'AUTH__EXTERNAL_LOGIN',
	external_login_result = 'AUTH__EXTERNAL_LOGIN_RESULT',

	login = 'AUTH__LOGIN',
	login_result = 'AUTH__LOGIN_RESULT',

	confirm_email = 'AUTH__CONFIRM_EMAIL',
	confirm_email_result = 'AUTH__CONFIRM_EMAIL_RESULT',

	send_forgot_password_email = 'AUTH__SEND_FORGOT_PASSWORD_EMAIL',
	send_forgot_password_email_result = 'AUTH__SEND_FORGOT_PASSWORD_EMAIL_RESULT',

	reset_password = 'AUTH__RESET_PASSWORD',
	reset_password_result = 'AUTH__RESET_PASSWORD_RESULT',

	logout = 'AUTH__LOGOUT',
}

export interface AuthAction extends ReduxAction<ActionTypes> {
}

export interface AuthActionResult extends AuthAction {
	hasError: boolean
}

export interface ChangeNameAction extends AuthAction {
	type: ActionTypes.change_name,
	name: string,
}

export interface ChangeEmailAction extends AuthAction {
	type: ActionTypes.change_email,
	email: string,
}

export interface ChangePhoneAction extends AuthAction {
	type: ActionTypes.change_phone,
	phone: string,
}

export interface ChangePasswordAction extends AuthAction {
	type: ActionTypes.change_password,
	password: string,
}

export interface ChangeResetPasswordCode extends AuthAction {
	type: ActionTypes.change_reset_password_code,
	code: string,
}

export interface ConfirmEmailAction extends AuthAction {
	type: ActionTypes.confirm_email,
	userId: string,
	token: string,
}

export interface ExternalLoginAction extends AuthAction {
	type: ActionTypes.external_login,
	name: string,
	email: string,
	provider: string,
	tokenId: string
}

export type Action =
	& AuthAction
	& AuthActionResult
	& ChangeNameAction
	& ChangeEmailAction
	& ChangePhoneAction
	& ChangePasswordAction
	& ChangeResetPasswordCode
	& ConfirmEmailAction
	& ExternalLoginAction;

export interface State {
	name: string,
	email: string,
	phone: string,
	password: string,

	isResettingPassword: boolean,
	resetPasswordCode: string,
}
