import * as React from 'react';
import { Provider, connect } from 'react-redux';

import { AppState } from './types/store';

import { AppNavigator } from './config/routes';
import { store } from './config/store';

import './assets/scss/main.scss';
import { useLocalStorage } from './config/utilities';
import { updateDefaultHeaders } from './api';

interface Props {
	dispatch: Function,

	isLoggedIn: boolean,
	accessToken: string,
}

class Main extends React.Component<Props> {
	componentDidMount() {
		const { isLoggedIn, accessToken } = this.props;
		if (isLoggedIn) updateDefaultHeaders(accessToken);
	}

	render() {
		return (
			<AppNavigator />
		);
	}
}

const mapStateToProps = (state: AppState) => {
	const { isLoggedIn, accessToken } = useLocalStorage();
	return {
		isLoggedIn,
		accessToken,
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
