import { Action as ReduxAction } from 'redux';

export enum ActionTypes {
	change_is_logged_in = 'STORAGE__CHANGE_IS_LOGGED_IN',
	change_access_token = 'STORAGE__CHANGE_ACCESS_TOKEN',
	change_is_email_confirmed = 'STORAGE__CHANGE_IS_EMAIL_CONFIRMED',
	change_active_language = 'STORAGE__CHANGE_ACTIVE_LANGUAGE',
  set_user_name = 'STORAGE__SET_USER_NAME'
}

export interface StorageAction extends ReduxAction<ActionTypes> {
}

export interface ChangeIsLoggedInAction extends StorageAction {
	type: ActionTypes.change_is_logged_in,
	isLoggedIn: boolean
}

export interface ChangeAccessTokenAction extends StorageAction {
	type: ActionTypes.change_access_token,
	accessToken: string,
}

export interface ChangeIsEmailConfirmedAction extends StorageAction {
	type: ActionTypes.change_is_email_confirmed,
	isEmailConfirmed: boolean,
}

export interface ChangeActiveLanguageAction extends StorageAction {
	type: ActionTypes.change_active_language,
	activeLanguage: AvailableLanguages
}

export interface SetUserNameAction extends StorageAction {
	type: ActionTypes.set_user_name,
	userName: string
}

export type Action =
	& StorageAction
	& ChangeIsLoggedInAction
	& ChangeAccessTokenAction
	& ChangeIsEmailConfirmedAction
	& ChangeActiveLanguageAction
	& SetUserNameAction;

export interface State {
	isLoggedIn: boolean
	accessToken: string,
	isEmailConfirmed: boolean,
	activeLanguage: AvailableLanguages,
	userName: string
}

export enum AvailableLanguages {
	en = 'en',
	tr = 'tr',
	ar = 'ar'
}