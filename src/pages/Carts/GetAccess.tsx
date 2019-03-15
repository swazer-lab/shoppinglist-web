import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { getAccessToCart } from '../../actions/carts';

interface Props {
	dispatch: Function,
	match: any,
}

const GetAccess = (props: Props) => {
	useEffect(() => {
		const { dispatch, match } = props;
		if (match.params.id) dispatch(getAccessToCart(match.params.id));
	}, []);

	return (
		<div/>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(GetAccess);
