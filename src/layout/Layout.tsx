import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../types/store';

import NavigationBar from './NavigationBar/NavigationBar';

import { navigate } from '../actions/service';
import { useLocalStorage } from '../config/utilities';

import './styles.scss';

interface Props {
	dispatch: Function,
	children: any,

	layoutOptions?: any,
	progress: AppState['service']['progress']
}

const Layout = (props: Props) => {
	const { dispatch, children, layoutOptions, progress } = props;
	const { isLoggedIn } = useLocalStorage();

	if (layoutOptions.authorized && !isLoggedIn) dispatch(navigate('Login'));

	return (
		<div className='main_layout'>
			<NavigationBar progress={progress} />
			{children}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { progress } = state.service;

	return {
		progress,
	};
};

export default connect(mapStateToProps)(Layout);
