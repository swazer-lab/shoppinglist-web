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
	ChangeResetPasswordAction,
	SendForgotPasswordEmailResultAction,
	SendResetPasswordResultAction,
	ChangeResetCode, AuthResultAction,
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

export const changeResetPassword = (resetPassword: string): ChangeResetPasswordAction => ({
	type: ActionTypes.change_reset_password,
	resetPassword,
});

export const register = (): AuthAction => ({
	type: ActionTypes.register,
});
export const registerResult = (hasError: boolean, message: string, accessToken?: string): RegisterResultAction => ({
	type: ActionTypes.register_result,
	hasError,
	accessToken,
	message
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
export const confirmEmailResult = (hasError: boolean): AuthResultAction => ({
	type: ActionTypes.confirm_email_result,
	hasError,
});

export const changeResetCode = (resetCode: string): ChangeResetCode => ({
	type: ActionTypes.change_reset_code,
	resetCode,
});
export const sendForgotPasswordEmail = (): AuthAction => ({
	type: ActionTypes.send_forgot_password_email,
});

export const sendResetCode = (): AuthAction => ({
	type: ActionTypes.send_reset_password,
});

export const sendForgotPasswordEmailResult = (hasError: boolean, message: string): SendForgotPasswordEmailResultAction => ({
	type: ActionTypes.send_forgot_password_email_result,
	hasError,
	message
});

export const sendResetPasswordEmailResult = (hasError: boolean, message: string): SendResetPasswordResultAction => ({
	type: ActionTypes.send_reset_password_result,
	hasError,
	message
});
