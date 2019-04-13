import {
	ActionTypes,
	AlertType,
	NavigateAction,
	ReplaceAction,
	ServiceAction,
	ShowAlertAction,
	ShowProgressAction,
	ShowSnackbarAction,
	State,
} from '../types/service';
import { RouteName } from '../types/store';
import { history, routes } from '../config/routes';

import language from '../assets/language';

// Navigation
export const navigate = (routeName: RouteName, options?: {}): NavigateAction => {
	const route = routes[routes.findIndex((route) => route.name === routeName)];

	history.push(route.path, options);

	return {
		type: ActionTypes.navigate,
		routeName,
		location,
	};
};
export const replace = (routeName: string): ReplaceAction => {
	const route = routes[routes.findIndex((route) => route.name === routeName)];
	history.replace(route.path);

	return {
		type: ActionTypes.replace,
		routeName,
	};
};
export const goBack = (): ServiceAction => {
	history.goBack();

	return {
		type: ActionTypes.go_back,
	};
};
export const goForward = (): ServiceAction => {
	history.goBack();

	return {
		type: ActionTypes.go_forward,
	};
};

// Progress
export const showProgress = (message?: string): ShowProgressAction => ({
	type: ActionTypes.show_progress,
	message,
});
export const hideProgress = (): ServiceAction => ({
	type: ActionTypes.hide_progress,
});

// Alert
export const showAlert = (alertType: AlertType, title?: string, message: string = '', duration?: number): ShowAlertAction => ({
	type: ActionTypes.show_alert,
	alertType,
	title,
	message,
	duration,
});

export const clearAlert = (): ServiceAction => ({
	type: ActionTypes.clear_alert,
});

export const showHttpErrorAlert = (error: { response: any }) => {
	if (!error || !error.response || !error.response.status) {
		return showAlert('error', language.titleUnexpectedError, language.textUnexpectedError);
	}

	const { response } = error;
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') console.log(response);

	switch (response.status) {
		case 400: // Bad Request
			return showAlert('warn', '', response.data.message);
		case 500: // Internal Server Error
		case 503: // Service Unavailable
		case 404: // Not Found
			return showAlert('error', language.titleServiceUnavailable, language.textServiceUnavailable);
		default:
			return showAlert('error', language.titleUnexpectedError, language.textUnexpectedError);
	}
};

// Snackbar
export const showSnackbar = (message: string, actions?: State['snackbar']['actions'], duration: number = 3000): ShowSnackbarAction => ({
	type: ActionTypes.show_snackbar,
	message,
	actions,
	duration,
});
export const hideSnackbar = (): ServiceAction => ({
	type: ActionTypes.hide_snackbar,
});