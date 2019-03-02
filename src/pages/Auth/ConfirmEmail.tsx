import * as React from 'react';
import { connect } from 'react-redux';

import { AppState, Location } from '../../types/store';
import { navigate } from '../../actions/service';
import { confirmEmail, login } from '../../actions/auth';
import { AuthContainer } from '../../components/AuthContainer';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

interface Props {
	isEmailConfirmed: boolean,
	errorMessage: string,
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

	onLoginClicked = () => this.props.dispatch(login());
	onRegisterClicked = () => this.props.dispatch(navigate('Register'));

	render() {
		const { isEmailConfirmed, errorMessage } = this.props;

		let content;

		if (isEmailConfirmed) {
			content = <div>Your account has been activated sucessfully</div>;
		} else {
			content = <div>{errorMessage}</div>;
		}

		return (
			<AuthContainer className='page_auth'>
				<div className='page_auth__content_container'>
					<h1 className='page_auth__title'>Confirm Email</h1>
					<p className='page_auth__subtitle'>{content}</p>
				</div>
			</AuthContainer>
		);
	}
}

const mapStateToProps = (state: AppState) => {
	const { isEmailConfirmed, errorMessage } = state.auth;

	return {
		isEmailConfirmed,
		errorMessage
	};
};

export default connect(mapStateToProps)(ConfirmEmail);
