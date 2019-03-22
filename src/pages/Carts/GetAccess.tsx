import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { getAccessToCart } from '../../actions/carts';
import { useLocalStorage } from '../../config/localstorage';
import { navigate } from '../../actions/service';

interface Props {
	dispatch: Function,
	match: any,
}

const GetAccess = (props: Props) => {
	const { isLoggedIn } = useLocalStorage();

	useEffect(() => {
		const { dispatch, match } = props;
		if (match.params.id && isLoggedIn) {
			dispatch(getAccessToCart(match.params.id));
		} else {
			dispatch(navigate('Login'));
		}
	}, []);

	return (
		<div/>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(GetAccess);
