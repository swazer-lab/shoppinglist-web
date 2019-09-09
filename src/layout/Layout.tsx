import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../types/store';

import { AuthLayout, MainLayout } from './';
import { useDocumentTitle } from '../config/utilities';
import { navigate } from '../actions/service';

interface Props {
		children?: any,

		match?: any,
		location?: any,
		history?: any,

		dispatch: Function,
		layoutOptions?: any,

		isLoggedIn: boolean
}

const Layout = (props: Props) => {
		const { children, match, location, history, dispatch, layoutOptions, isLoggedIn } = props;

		console.log(children, match, location, history, dispatch, layoutOptions, isLoggedIn);

		useDocumentTitle(layoutOptions.title);

		useEffect(() => {
				if (layoutOptions.authorized && !isLoggedIn) {
						dispatch(navigate('Login'));
				}
		}, []);

		const LayoutComponent = layoutOptions.layout && layoutOptions.layout === 'Main' ? MainLayout : layoutOptions.layout === 'Auth' ? AuthLayout : React.Fragment;
		const layoutProps = LayoutComponent === React.Fragment ? {} : {
				layoutOptions,
		};

		const content = React.Children.map(children, (child, index) => (
				React.cloneElement(child, { index, match, location, history })
		));

		return (
				<LayoutComponent {...layoutProps}>
						{content}
				</LayoutComponent>
		);
};

const mapStateToProps = (state: AppState) => {
		const { isLoggedIn } = state.storage;

		return { isLoggedIn };
};

export default connect(mapStateToProps)(Layout);
