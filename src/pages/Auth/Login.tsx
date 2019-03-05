import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { AuthContainer, Input, Button } from '../../components';

import { navigate } from '../../actions/service';
import { changeEmail, changePassword, login } from '../../actions/auth';

import './styles.scss';

interface Props {
	dispatch: Function,

	email: string,
	password: string,

	isLoading: boolean,
	errorMessage?: string,
}

const Login = (props: Props) => {
	const { dispatch, email, password, isLoading } = props;

	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangePassword = (e: any) => dispatch(changePassword(e.target.value));

	const onForgotPasswordClicked = () => dispatch(navigate('ForgotPassword'));
	const onRegisterClicked = () => dispatch(navigate('Register'));

	const onLoginClicked = (event: any) => {
		dispatch(login());
		event.preventDefault();
	};

	return (
		<AuthContainer className='page_auth' isLoading={isLoading}>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>Login</h1>
				<p className='page_auth__subtitle'>with your Google account</p>

				<form onSubmit={onLoginClicked}>
					<Input
						className='page_auth__input'
						value={email}
						onChange={handleChangeEmail}
						type='email'
						placeholder='Email'
						required
					/>
					<Input
						className='page_auth__input'
						value={password}
						onChange={handleChangePassword}
						type='password'
						placeholder='Password'
						required
						pattern='.{6,}'
					/>
					<Button
						className='page_auth__forgot_password_button'
						type='button'
						mode='text'
						title='Forgot Password'
						onClick={onForgotPasswordClicked}
					/>

					<div className='page_auth__buttons_container'>
						<Button
							className='page_auth__action_button'
							type='button'
							mode='text'
							title='Create Account'
							onClick={onRegisterClicked}
						/>
						<Button type='submit' title='Login' />
					</div>
				</form>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, password, isLoading, errorMessage } = state.auth;

	return {
		email,
		password,

		isLoading,
		errorMessage,
	};
};

export default connect(mapStateToProps)(Login);
