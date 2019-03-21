import React from 'react';
import { connect, Provider } from 'react-redux';

import { AppState } from './types/store';

import { AppNavigator } from './config/routes';
import { store } from './config/store';

import { updateDefaultHeaders } from './api';
import { fetchProfile } from './actions/profile';
import { fetchContacts } from './actions/contacts';

import language from '../src/assets/language';
import './assets/scss/main.scss';

interface Props {
	dispatch: Function,
}

class Main extends React.Component<Props> {
	componentWillMount(): void {
		const activeLanguage = localStorage.getItem('activeLanguage') || 'en';
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		const accessToken = localStorage.getItem('accessToken') || '';

		const { dispatch } = this.props;

		if (isLoggedIn) {
			updateDefaultHeaders(accessToken);

			dispatch(fetchProfile());
			dispatch(fetchContacts());
		}

		language.setLanguage(activeLanguage);
	}

	render() {
		return (
			<AppNavigator />
		);
	}
}

const mapStateToProps = (state: AppState) => {
	return {};
};

export default () => {
	const AppWithNavigation = connect(mapStateToProps)(Main);

	return (
		<Provider store={store}>
			<AppWithNavigation />
		</Provider>
	);
}
