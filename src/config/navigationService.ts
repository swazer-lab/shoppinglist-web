/* @flow */

export let _history: any = null;

export const setTopLevelHistory = (historyRef: any) => {
	_history = historyRef;
};

export const navigate = (routeName: string) => {
	const route = require('../config/routes').routes[routeName];
	_history.push(route.path);
};

export const replace = (routeName: string) => {
	const route = require('../config/routes').routes[routeName];
	_history.replace(route.path);
};

export const goBack = () => {
	_history.goBack();
};

export const goForward = () => {
	_history.goForward();
};
