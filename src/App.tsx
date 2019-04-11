import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';

import { AppState } from './types/store';
import { AvailableLanguages } from './types/storage';

import { AppNavigator } from './config/routes';
import { store } from './config/store';

import { updateDefaultHeaders } from './api';

import language from './assets/language';
import './assets/scss/main.scss';

interface Props {
	dispatch: Function,
	isLoggedIn: boolean,
	accessToken: string,
	activeLanguage: AvailableLanguages
}

const Main = (props: Props) => {
	const { isLoggedIn, accessToken, activeLanguage } = props;

	useEffect(() => {
		updateDefaultHeaders(accessToken);
	}, [accessToken]);

	useEffect(() => {
		language.setLanguage(activeLanguage);
	}, [activeLanguage]);

	return (
		<AppNavigator/>
	);
};

const mapStateToProps = (state: AppState) => {
	const { isLoggedIn, accessToken, activeLanguage } = state.storage;

	return { isLoggedIn, accessToken, activeLanguage };
};

export default () => {
	const AppWithNavigation = connect(mapStateToProps)(Main);

	return (
		<Provider store={store}>
			<AppWithNavigation/>
		</Provider>
	);
}
