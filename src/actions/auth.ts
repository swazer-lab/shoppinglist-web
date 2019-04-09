import {
	ActionTypes,
	AuthAction,
	AuthActionResult,
	ChangeEmailAction,
	ChangeNameAction, ChangeNewPasswordAction,
	ChangePasswordAction,
	ChangePhoneAction,
	ChangeResetPasswordCode,
	ConfirmEmailAction,
	ExternalLoginAction, ResendConfirmEmailAction,
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

export const changeNewPassword = (newPassword: string): ChangeNewPasswordAction => ({
	type: ActionTypes.change_new_password,
	newPassword,
});

export const updatePassword = () : AuthAction => ({
	type: ActionTypes.update_password
});

export const updatePasswordResult = (hasError: boolean) : AuthActionResult => ({
	type: ActionTypes.update_password_result,
	hasError
});

export const changeResetPasswordCode = (code: string): ChangeResetPasswordCode => ({
	type: ActionTypes.change_reset_password_code,
	code,
});

export const register = (): AuthAction => ({
	type: ActionTypes.register,
});
export const registerResult = (hasError: boolean): AuthActionResult => ({
	type: ActionTypes.register_result,
	hasError,
});

export const login = (): AuthAction => ({
	type: ActionTypes.login,
});
export const loginResult = (hasError: boolean): AuthActionResult => ({
	type: ActionTypes.login_result,
	hasError,
});

export const confirmEmail = (userId: string, token: string): ConfirmEmailAction => ({
	type: ActionTypes.confirm_email,
	userId,
	token,
});
export const confirmEmailResult = (hasError: boolean): AuthActionResult => ({
	type: ActionTypes.confirm_email_result,
	hasError,
});

export const resendConfirmEmail = (userId: string): ResendConfirmEmailAction => ({
	type: ActionTypes.resend_confirm_email,
	userId
});

export const sendForgotPasswordEmail = (): AuthAction => ({
	type: ActionTypes.send_forgot_password_email,
});
export const sendForgotPasswordEmailResult = (hasError: boolean): AuthActionResult => ({
	type: ActionTypes.send_forgot_password_email_result,
	hasError,
});

export const resetPassword = (): AuthAction => ({
	type: ActionTypes.reset_password,
});
export const resetPasswordResult = (hasError: boolean): AuthActionResult => ({
	type: ActionTypes.reset_password_result,
	hasError,
});

export const externalLogin = (name: string, email: string, tokenId: string, provider: string): ExternalLoginAction => ({
	type: ActionTypes.external_login,
	name,
	email,
	tokenId,
	provider
});

export const logout = (): AuthAction => ({
	type: ActionTypes.logout,
});
