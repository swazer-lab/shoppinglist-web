import { ActionTypes, NavigationServiceAction, NavigateAction, ReplaceAction } from '../types/navigationService';
import * as navigationService from '../config/navigationService';

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
export const goBack = (): NavigationServiceAction => {
	navigationService.goBack();
	return {
		type: ActionTypes.go_back,
	};
};
export const goForward = (): NavigationServiceAction => {
	navigationService.goForward();
	return {
		type: ActionTypes.go_forward,
	};
};
