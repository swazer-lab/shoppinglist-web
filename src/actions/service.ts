import {
	ActionTypes,
	AlertType,
	NavigateAction,
	ReplaceAction,
	ServiceAction,
	ShowAlertAction,
	ShowProgressAction,
} from '../types/service';
import * as navigationService from '../config/navigationService';

// Navigation
export const navigate = (routeName: string): NavigateAction => {
	navigationService.navigate(routeName);
	return {
		type: ActionTypes.navigate,
		routeName,
	};
};
export const replace = (routeName: string): ReplaceAction => {
	navigationService.replace(routeName);
	return {
		type: ActionTypes.replace,
		routeName,
	};
};
export const goBack = (): ServiceAction => {
	navigationService.goBack();
	return {
		type: ActionTypes.go_back,
	};
};
export const goForward = (): ServiceAction => {
	navigationService.goForward();
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
