import {Action as ReduxAction} from 'redux';

export enum ActionTypes {
    change_name = 'AUTH__CHANGE_NAME',
    change_email = 'AUTH__CHANGE_EMAIL',
    change_phone = 'AUTH__CHANGE_PHONE',
    change_password = 'AUTH__CHANGE_PASSWORD',

    register = 'AUTH__REGISTER',
    register_result = 'AUTH__REGISTER_RESULT',

    login = 'AUTH__LOGIN',
    login_result = 'AUTH__LOGIN_RESULT',

    confirm_email = 'AUTH__CONFIRM_EMAIL',
    confirm_email_result = 'AUTH__CONFIRM_EMAIL_RESULT',

    forgot_password_email = 'AUTH__FORGOT_PASSWORD_EMAIL',
    forgot_password_email_result = 'AUTH__FORGOT_PASSWORD_EMAIL_RESULT',
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

export interface ConfirmEmailAction extends AuthAction {
    type: ActionTypes.confirm_email,
    userId: string,
    token: string,
}

export interface ConfirmEmailResultAction extends AuthResultAction {
    type: ActionTypes.confirm_email_result,
    isEmailConfirmed: boolean
}

export interface ForgotPasswordAction extends AuthAction {
    type: ActionTypes.forgot_password_email,
    email: string
}

export interface ForgotPasswordResultAction extends AuthResultAction {
    type: ActionTypes.forgot_password_email_result,
    isForgotPassword: boolean
}

export type Action =
    & AuthAction
    & ChangeNameAction
    & ChangeEmailAction
    & ChangePhoneAction
    & ChangePasswordAction
    & RegisterResultAction
    & LoginResultAction
    & ConfirmEmailAction
    & ConfirmEmailResultAction
    & ForgotPasswordAction
    & ForgotPasswordResultAction;

export interface State {
    accessToken?: string,

    isLoggedIn: boolean,
    isEmailConfirmed: boolean,

    name: string,
    email: string,
    phone: string,
    password: string,

    isLoading: boolean,
}
