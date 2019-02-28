import {
	ActionTypes,
	AuthAction,
	ChangeEmailAction,
	ChangeNameAction,
	ChangePhoneAction,
	ChangePasswordAction,
	LoginResultAction,
	RegisterResultAction,
	ConfirmEmailAction,
	ConfirmEmailResultAction,
	ForgotPasswordAction,
	ForgotPasswordResultAction
} from '../types/auth';

export const changeName = (name: string): ChangeNameAction => ({
	type: ActionTypes.change_name,
	name,
});
export const changeEmail = (email: string): ChangeEmailAction => ({
	type: ActionTypes.change_email,
	email,
});
export const changePhone = (phone: string): ChangePhoneAction => ({
	type: ActionTypes.change_phone,
	phone,
});
export const changePassword = (password: string): ChangePasswordAction => ({
	type: ActionTypes.change_password,
	password,
});

export const register = (): AuthAction => ({
	type: ActionTypes.register,
});

export const registerResult = (hasError: boolean, accessToken?: string): RegisterResultAction => ({
	type: ActionTypes.register_result,
	hasError,
	accessToken,
});

export const login = (): AuthAction => ({
	type: ActionTypes.login,
});
export const loginResult = (hasError: boolean, accessToken?: string): LoginResultAction => ({
	type: ActionTypes.login_result,
	hasError,
	accessToken,
});

export const confirmEmail = (userId: string, token: string): ConfirmEmailAction => ({
	type: ActionTypes.confirm_email,
	userId,
	token,
});

export const confirmEmailResult = (hasError: boolean, isEmailConfirmed: boolean): ConfirmEmailResultAction => ({
	type: ActionTypes.confirm_email_result,
	isEmailConfirmed,
	hasError
});

export const forgotPassword = (email: string): ForgotPasswordAction => ({
	type: ActionTypes.forgot_password_email,
	email: email
});

export const forgotPasswordResult = (hasError: boolean, isForgotPassword: boolean): ForgotPasswordResultAction => ({
	type: ActionTypes.forgot_password_email_result,
	isForgotPassword,
	hasError
});