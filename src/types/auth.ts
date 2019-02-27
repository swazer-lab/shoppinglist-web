import { Action as ReduxAction } from 'redux';

export enum ActionTypes {
	change_name = 'AUTH__CHANGE_NAME',
	change_email = 'AUTH__CHANGE_EMAIL',
	change_phone = 'AUTH__CHANGE_PHONE',
	change_password = 'AUTH__CHANGE_PASSWORD',

	register = 'AUTH__REGISTER',
	register_result = 'AUTH__REGISTER_RESULT',

	login = 'AUTH__LOGIN',
	login_result = 'AUTH__LOGIN_RESULT',
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

export interface ChangePhoneAction extends AuthAction {
	type: ActionTypes.change_phone,
	phone: string,
}

export interface ChangePasswordAction extends AuthAction {
	type: ActionTypes.change_password,
	password: string,
}

export interface RegisterResultAction extends AuthResultAction {
	type: ActionTypes.register_result,
	accessToken?: string,
}

export interface LoginResultAction extends AuthResultAction {
	type: ActionTypes.login_result,
	accessToken?: string,
}

export type Action =
	& AuthAction
	& ChangeNameAction
	& ChangeEmailAction
	& ChangePhoneAction
	& ChangePasswordAction
	& RegisterResultAction
	& LoginResultAction;

export interface State {
	accessToken?: string,
	isLoggedIn: boolean,

	name: string,
	email: string,
	phone: string,
	password: string,

	isLoading: boolean,
}
