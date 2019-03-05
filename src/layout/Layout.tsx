import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../types/store';

import { navigate } from '../actions/service';
import { useLocalStorage } from '../config/utilities';

interface Props {
	dispatch: Function,
	children: any,

	layoutOptions?: any,
}

const Layout = (props: Props) => {
	const { dispatch, children, layoutOptions } = props;
	const { isLoggedIn } = useLocalStorage();

	if (layoutOptions.authorized && !isLoggedIn) dispatch(navigate('Login'));

	return (
		<div>
			{children}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(Layout);
