import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';

import { AppState } from './types/store';

import { AppNavigator } from './config/routes';
import { store } from './config/store';

import { useLocalStorage } from './config/localstorage';
import { updateDefaultHeaders } from './api';

import language from './assets/language';
import './assets/scss/main.scss';

interface Props {
	dispatch: Function,
}

const Main = (props: Props) => {
	const { isLoggedIn, accessToken, activeLanguage } = useLocalStorage();

	useEffect(() => {
		if (isLoggedIn && accessToken) {
			updateDefaultHeaders(accessToken);
		}
	}, [isLoggedIn, accessToken]);

	useEffect(() => {
		language.setLanguage(activeLanguage);
	}, [activeLanguage]);

	return (
		<AppNavigator/>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default () => {
	const AppWithNavigation = connect(mapStateToProps)(Main);

	return (
		<Provider store={store}>
			<AppWithNavigation/>
		</Provider>
	);
}
