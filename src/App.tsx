import * as React from 'react';
import { Provider, connect } from 'react-redux';

import { AppState } from './types/store';
import { AppNavigator } from './config/routes';

import { store } from './config/store';

interface Props {

}

class Main extends React.Component<Props> {
	public render() {
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
