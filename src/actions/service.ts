import {
	ActionTypes,
	AlertType,
	NavigateAction,
	ReplaceAction,
	ServiceAction,
	ShowAlertAction,
	ShowProgressAction,
} from '../types/service';
import { getHistory, getRoutes } from '../config/navigator';

// Navigation
export const navigate = (routeName: string): NavigateAction => {
	const route = getRoutes()[routeName];
	getHistory().push(route.path);

	return {
		type: ActionTypes.navigate,
		routeName,
	};
};
export const replace = (routeName: string): ReplaceAction => {
	const route = getRoutes()[routeName];
	getHistory().replace(route.path);

	return {
		type: ActionTypes.replace,
		routeName,
	};
};
export const goBack = (): ServiceAction => {
	getHistory().goBack();

	return {
		type: ActionTypes.go_back,
	};
};
export const goForward = (): ServiceAction => {
	getHistory().goBack();

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
