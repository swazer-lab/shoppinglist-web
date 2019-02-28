import * as React from 'react';
import { connect } from 'react-redux';

import { AppState, Location } from '../../types/store';
import { navigate } from '../../actions/service';
import { confirmEmail } from '../../actions/auth';

interface Props {
	isEmailConfirmed: boolean;
	dispatch: Function,
	location: Location,
}

class ConfirmEmail extends React.Component<Props> {
	componentDidMount() {
		const { location } = this.props;
		const queryParams = new URLSearchParams(location.search);

		const userId = queryParams.get('userId');
		const token = queryParams.get('token');

		if (userId != null && token != null)
			this.props.dispatch(confirmEmail(userId, token));
	}

	render() {
		const isConfirmed = this.props.isEmailConfirmed;
		let content;

		if (isConfirmed) {
			content = <div>Your account has been activated</div>;
		} else {
			content = <div>Your account has not been activated</div>;
		}

		return (
			<div>
				<button onClick={() => this.props.dispatch(navigate('Carts'))}>Navigate Carts</button>
				{content}
			</div>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	const { isEmailConfirmed } = state.auth;

	return {
		isEmailConfirmed,
	};
};

export default connect(mapStateToProps)(ConfirmEmail);
