import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { changeEmail, changePassword, login } from '../../actions/auth';

interface Props {
	dispatch: Function,

	email: string,
	password: string,

	isLoading: boolean,
}

const Login = (props: Props) => {
	const { dispatch, email, password, isLoading } = props;

	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangePassword = (e: any) => dispatch(changePassword(e.target.value));

	const onLoginClicked = () => dispatch(login());

	return (
		<div>
			<input value={email} onChange={handleChangeEmail} />
			<input value={password} onChange={handleChangePassword} />

			{!isLoading ? <button onClick={onLoginClicked}>Login</button> : <progress max={2} value={1} />}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, password, isLoading } = state.auth;

	return {
		email,
		password,

		isLoading,
	};
};

export default connect(mapStateToProps)(Login);
