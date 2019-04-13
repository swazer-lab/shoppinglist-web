import { Action as ReduxAction } from 'redux';
import { History, LocationState } from 'history';

export enum ActionTypes {
	navigate = 'SERVICE_NAVIGATION__NAVIGATE',
	replace = 'SERVICE_NAVIGATION__REPLACE',
	go_back = 'SERVICE_NAVIGATION__GO_BACK',
	go_forward = 'SERVICE_NAVIGATION__GO_FORWARD',

	show_progress = 'SERVICE_PROGRESS__SHOW_PROGRESS',
	hide_progress = 'SERVICE_PROGRESS__HIDE_PROGRESS',

	show_alert = 'SERVICE_ALERT__SHOW_ALERT',
	clear_alert = 'SERVICE_ALERT__CLEAR_ALERT',

	show_snackbar = 'SERVICE_SNACKBAR__SHOW_SNACKBAR',
	hide_snackbar = 'SERVICE_SNACKBAR__CLOSE_SNACKBAR',

	setAccessToken = 'SERVICE_LOCALSTORAGE__SET_ACCESS_TOKEN',
	setIsLoggedIn = 'SERVICE_LOCALSTORAGE__SET_IS_LOGGED_IN',
	setActiveLanguage = 'SERVICE_LOCALSTORAGE__SET_ACTIVE_LANGUAGE',
	setIsEmailConfirmed = 'SERVICE_LOCALSTORAGE__SET_IS_EMAIL_CONFIRMED',
}

export interface ServiceAction extends ReduxAction<ActionTypes> {
}

// Navigation
export interface NavigateAction extends ServiceAction {
	type: ActionTypes.navigate,
	routeName: string,
	location?:  LocationState
}

export interface ReplaceAction extends ServiceAction {
	type: ActionTypes.replace,
	routeName: string
}

// Progress
export interface ShowProgressAction extends ServiceAction {
	type: ActionTypes.show_progress,
	message?: string,
}

// Alert
export type AlertType = 'info' | 'error' | 'warn' | 'success' | 'noConnection';

export interface ShowAlertAction extends ServiceAction {
	type: ActionTypes.show_alert,
	alertType: AlertType,
	title?: string,
	message: string,
	duration?: number,
}

// Snackbar
export interface ShowSnackbarAction extends ServiceAction {
	type: ActionTypes.show_snackbar,
	message: string,
	actions?: State['snackbar']['actions'],
	duration?: number
}

// LocalStorage
export interface SetAccessTokenAction extends ServiceAction {
	type: ActionTypes.setAccessToken,
	accessToken: string,
}

export interface SetIsLoggedInAction extends ServiceAction {
	type: ActionTypes.setIsLoggedIn,
	isLoggedIn: boolean,
}

export interface SetActiveLanguageAction extends ServiceAction {
	type: ActionTypes.setActiveLanguage,
	activeLanguage: string,
}

export interface SetIsEmailConfirmed extends ServiceAction {
	type: ActionTypes.setIsEmailConfirmed,
	isEmailConfirmed: boolean
}

export type Action = &
	ServiceAction
	& NavigateAction
	& ReplaceAction
	& ShowProgressAction
	& ShowAlertAction
	& ShowSnackbarAction;

export interface State {
	progress: {
		visible: boolean,
		message: string
	},
	alert: {
		visible: boolean,
		type: AlertType,
		title?: string,
		message: string,
		duration?: number,
	},
	snackbar: {
		visible: boolean,
		message?: string,
		actions?: { title: string, onClick: (e: any) => void }[],
		duration?: number
	}
}
