import { Action as ReduxAction } from 'redux';

export enum ActionTypes {
	navigate = 'GENERAL__NAVIGATE',
	replace = 'GENERAL__REPLACE',
	go_back = 'GENERAL__GO_BACK',
	go_forward = 'GENERAL__GO_FORWARD',
}

export interface NavigationServiceAction extends ReduxAction<ActionTypes> {
}

export interface NavigateAction extends NavigationServiceAction {
	type: ActionTypes.navigate,
	routeName: string,
}

export interface ReplaceAction extends NavigationServiceAction {
	type: ActionTypes.replace,
	routeName: string
}
