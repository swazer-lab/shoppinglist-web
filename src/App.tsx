import React from 'react';
import { connect, Provider } from 'react-redux';

import { AppState } from './types/store';
import { AvailableLanguages } from './types/storage';

import { AppNavigator } from './config/routes';
import { store } from './config/store';
import './assets/scss/main.scss';
import { updateDefaultHeaders } from './api';
import language from './assets/language';

interface Props {
	dispatch: Function,
	isLoggedIn: boolean,
	accessToken: string,
	activeLanguage: AvailableLanguages
}

class Main extends React.Component<Props> {
	componentDidMount() {
		const { accessToken, activeLanguage } = this.props;

		updateDefaultHeaders(accessToken);
		language.setLanguage(activeLanguage);
	}

	componentDidUpdate(prevProps: Props) {
		if (prevProps.accessToken !== this.props.accessToken) {
			updateDefaultHeaders(this.props.accessToken);
		}
	}

	render() {
		return (
			<AppNavigator />
		);
	}
}

const mapStateToProps = (state: AppState) => {
	const { isLoggedIn, accessToken, activeLanguage } = state.storage;

	return {
		isLoggedIn,
		accessToken,
		activeLanguage,
	};
};

export default () => {
	const AppWithNavigation = connect(mapStateToProps)(Main);

	return (
		<Provider store={store}>
			<AppWithNavigation />
		</Provider>
	);
}
