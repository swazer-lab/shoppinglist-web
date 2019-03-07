import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import { AppState } from './types/store';

import { AppNavigator } from './config/routes';
import { store } from './config/store';

import { updateDefaultHeaders } from './api';
import { fetchProfile } from './actions/profile';

import { useLocalStorage } from './config/utilities';
import './assets/scss/main.scss';

interface Props {
	dispatch: Function,

	isLoggedIn: boolean,
	accessToken: string,
}

class Main extends Component<Props> {
	componentDidMount() {
		const { isLoggedIn, accessToken } = this.props;
		if (isLoggedIn) updateDefaultHeaders(accessToken);
	}

	componentDidUpdate() {
		const { isLoggedIn, dispatch } = this.props;
		if (isLoggedIn) dispatch(fetchProfile());
	}

	render() {
		return (
			<AppNavigator/>
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
			<AppWithNavigation/>
		</Provider>
	);
}
