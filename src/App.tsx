import React, { useEffect } from 'react';
import { connect, Provider } from 'react-redux';

import { AppState } from './types/store';

import { AppNavigator } from './config/routes';
import { store } from './config/store';

import { updateDefaultHeaders } from './api';
import { fetchProfile } from './actions/profile';
import { fetchContacts } from './actions/contacts';

import language from '../src/assets/language';
import './assets/scss/main.scss';
import { useLoStorage } from './config/utilities';

interface Props {
	dispatch: Function,
}

const Main = (props: Props) => {
	const { dispatch } = props;
	const { isLoggedIn, accessToken, activeLanguage } = useLoStorage();

	useEffect(() => {
		console.log('______________________,', isLoggedIn, accessToken, activeLanguage);

		if (isLoggedIn) {
			updateDefaultHeaders(accessToken);

			dispatch(fetchProfile());
			dispatch(fetchContacts());
		}

		language.setLanguage(activeLanguage);
	}, [isLoggedIn, accessToken, activeLanguage]);

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
