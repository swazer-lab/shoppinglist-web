import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { getAccessToCart } from '../../actions/carts';
import { navigate } from '../../actions/service';

interface Props {
	dispatch: Function,
	match: any,
	isLoggedIn: boolean,
	location: any
}

const GetAccess = (props: Props) => {
	const { isLoggedIn } = props;

	useEffect(() => {
		const { dispatch, match } = props;

		const Id = props.location.state ? props.location.state.id : undefined;

		if (Id && isLoggedIn) {
			dispatch(getAccessToCart(Id));
		} else {
			dispatch(navigate('Login', { routeName: `GetAccess/${match.params.id}` }));
		}
	}, []);

	return (
		<div />
	);
};

GetAccess.layoutOptions = {
	title: 'Carts',
	layout: 'Main',
	authorized: false,
};

const mapStateToProps = (state: AppState) => {
	const { isLoggedIn } = state.storage;

	return {
		isLoggedIn,
	};
};

export default connect(mapStateToProps)(GetAccess);
