import {
	ActionTypes,
	AuthAction,
	AuthActionResult,
	ChangeEmailAction,
	ChangeNameAction,
	ChangePasswordAction,
	ChangePhoneAction,
	ChangeResetPasswordCode,
	ConfirmEmailAction,
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
export const changeResetPasswordCode = (code: string): ChangeResetPasswordCode => ({
	type: ActionTypes.change_reset_password_code,
	code,
});

export const register = (): AuthAction => ({
	type: ActionTypes.register,
});
export const registerResult = (hasError: boolean, errorMessage?: string): AuthActionResult => ({
	type: ActionTypes.register_result,
	hasError,
	errorMessage,
});

export const login = (): AuthAction => ({
	type: ActionTypes.login,
});
export const loginResult = (hasError: boolean, errorMessage?: string): AuthActionResult => ({
	type: ActionTypes.login_result,
	hasError,
	errorMessage,
});

export const confirmEmail = (userId: string, token: string): ConfirmEmailAction => ({
	type: ActionTypes.confirm_email,
	userId,
	token,
});
export const confirmEmailResult = (hasError: boolean, errorMessage?: string): AuthActionResult => ({
	type: ActionTypes.confirm_email_result,
	hasError,
	errorMessage,
});

export const sendForgotPasswordEmail = (): AuthAction => ({
	type: ActionTypes.send_forgot_password_email,
});
export const sendForgotPasswordEmailResult = (hasError: boolean, errorMessage?: string): AuthActionResult => ({
	type: ActionTypes.send_forgot_password_email_result,
	hasError,
	errorMessage,
});

export const resetPassword = (): AuthAction => ({
	type: ActionTypes.reset_password,
});
export const resetPasswordResult = (hasError: boolean, errorMessage?: string): AuthActionResult => ({
	type: ActionTypes.reset_password_result,
	hasError,
	errorMessage,
});
