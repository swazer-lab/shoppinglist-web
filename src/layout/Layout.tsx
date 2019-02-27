import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { AppState } from '../types/store';

import { setTopLevelHistory } from '../config/navigationService';
import { navigate } from '../actions/service';

interface Props {
	dispatch: Function,

	children: any,
	history: any,

	isLoggedIn: boolean,
}

class Layout extends React.Component<Props> {
	componentDidMount() {
		this.setListenerUp();
	}

	componentDidUpdate(prevProps: Props) {
		this.setListenerUp();
	}

	setListenerUp = () => {
		const { history } = this.props;
		setTopLevelHistory(history);

		const routes: any = require('../config/routes').routes;
		const routePath: string = history.location.pathname;


		let routeObject: any;
		Object.keys(routes).map((route: any) => {
			const { path } = routes[route];
			if (path.toLowerCase() === routePath.toLowerCase() || path.toLowerCase() + '/' === routePath.toLowerCase()) routeObject = routes[route];
		});

		if (routeObject && routeObject.options && routeObject.options.authorized && !this.props.isLoggedIn) {
			this.props.dispatch(navigate('Login'));
			return;
		}

		if (routeObject !== undefined && routeObject.page.layoutOptions) {
			const layoutOptions = routeObject.page.layoutOptions;
			if (layoutOptions.title) document.title = layoutOptions.title;
		}
	};

	render() {
		const { children } = this.props;
		return (
			<div>
				{children}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	const { isLoggedIn } = state.auth;

	return {
		isLoggedIn,
	};
};

// @ts-ignore
export default withRouter(connect(mapStateToProps)(Layout));
