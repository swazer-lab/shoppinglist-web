import { Action as ReduxAction } from 'redux';

export enum ActionTypes {
	change_name = 'AUTH__CHANGE_NAME',
	change_email = 'AUTH__CHANGE_EMAIL',
	change_phone = 'AUTH__CHANGE_PHONE',
	change_password = 'AUTH__CHANGE_PASSWORD',
	change_reset_password = 'AUTH__CHANGE_RESET_PASSWORD',

	change_reset_code = 'AUTH__CHANGE_RESET_CODE',

	register = 'AUTH__REGISTER',
	register_result = 'AUTH__REGISTER_RESULT',

	login = 'AUTH__LOGIN',
	login_result = 'AUTH__LOGIN_RESULT',

	confirm_email = 'AUTH__CONFIRM_EMAIL',
	confirm_email_result = 'AUTH__CONFIRM_EMAIL_RESULT',

	send_forgot_password_email = 'AUTH__SEND_FORGOT_PASSWORD_EMAIL',
	send_forgot_password_email_result = 'AUTH__SEND_FORGOT_PASSWORD_EMAIL_RESULT',

	send_reset_password = 'AUTH__SEND_RESET_PASSWORD',
	send_reset_password_result = 'AUTH__SEND_RESET_PASSWORD_RESULT',
}

export interface AuthAction extends ReduxAction<ActionTypes> {
}

export interface AuthResultAction extends AuthAction {
	hasError: boolean,
}

export interface ChangeNameAction extends AuthAction {
	type: ActionTypes.change_name,
	name: string,
}

export interface ChangeEmailAction extends AuthAction {
	type: ActionTypes.change_email,
	email: string,
}

export interface ChangeResetCode extends AuthAction {
	type: ActionTypes.change_reset_code,
	resetCode: string,
}

export interface SendForgotPasswordEmailResultAction extends AuthResultAction {
	type: ActionTypes.send_forgot_password_email_result,
	message: string,
}

export interface SendResetPasswordResultAction extends AuthResultAction {
	type: ActionTypes.send_reset_password_result,
	message: string,
}

export interface ChangePhoneAction extends AuthAction {
	type: ActionTypes.change_phone,
	phone: string,
}

export interface ChangePasswordAction extends AuthAction {
	type: ActionTypes.change_password,
	password: string,
}

export interface ChangeResetPasswordAction extends AuthAction {
	type: ActionTypes.change_reset_password,
	resetPassword: string,
}

export interface RegisterResultAction extends AuthResultAction {
	type: ActionTypes.register_result,
	accessToken?: string,
	message: string
}

export interface LoginResultAction extends AuthResultAction {
	type: ActionTypes.login_result,
	accessToken?: string,
}

export interface ConfirmEmailAction extends AuthAction {
	type: ActionTypes.confirm_email,
	userId: string,
	token: string,
}

export type Action =
	& AuthAction
	& ChangeNameAction
	& ChangeEmailAction
	& ChangePhoneAction
	& ChangePasswordAction
	& ChangeResetCode
	& RegisterResultAction
	& LoginResultAction
	&ChangeResetPasswordAction
	& ConfirmEmailAction
	& SendForgotPasswordEmailResultAction
	& SendResetPasswordResultAction;

export interface State {
	accessToken?: string,
	isLoggedIn: boolean,

	name: string,
	email: string,
	phone: string,
	password: string,

	isEmailConfirmed: boolean,
	isResettingPassword: boolean,
	resetCode: string,
	resetPassword: string,

	errorMessage: string,
	isLoading: boolean,

}
