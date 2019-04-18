import {
	ActionTypes,
	AvailableLanguages,
	ChangeAccessTokenAction,
	ChangeActiveLanguageAction,
	ChangeIsEmailConfirmedAction,
	ChangeIsLoggedInAction,
	SetUserNameAction
} from '../types/storage';

export const changeIsLoggedIn = (isLoggedIn: boolean): ChangeIsLoggedInAction => ({
	type: ActionTypes.change_is_logged_in,
	isLoggedIn,
});
export const changeAccessToken = (accessToken: string): ChangeAccessTokenAction => ({
	type: ActionTypes.change_access_token,
	accessToken,
});
export const changeIsEmailConfirmed = (isEmailConfirmed: boolean): ChangeIsEmailConfirmedAction => ({
	type: ActionTypes.change_is_email_confirmed,
	isEmailConfirmed,
});
export const setUserName = (userName: string): SetUserNameAction => ({
	type: ActionTypes.set_user_name,
	userName,
});
export const changeActiveLanguage = (activeLanguage: AvailableLanguages): ChangeActiveLanguageAction => ({
	type: ActionTypes.change_active_language,
	activeLanguage,
});