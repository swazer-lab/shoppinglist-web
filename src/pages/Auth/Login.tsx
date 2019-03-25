import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import GoogleLogin from 'react-google-login';

import { AppState } from '../../types/store';

import { Button, Input } from '../../components';

import { clearAlert, navigate, showAlert } from '../../actions/service';
import { changeEmail, changePassword, externalLogin, login } from '../../actions/auth';
import language from '../../assets/language';

import './styles.scss';

interface Props {
	dispatch: Function,

	email: string,
	password: string,
}

const Login = (props: Props) => {
	const { dispatch, email, password } = props;

	useEffect(() => {
		dispatch(clearAlert());
		return () => {
			dispatch(clearAlert());
		};
	});

	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangePassword = (e: any) => dispatch(changePassword(e.target.value));

	const onForgotPasswordClicked = () => dispatch(navigate('ForgotPassword'));
	const onRegisterClicked = () => dispatch(navigate('Register'));

	const loginWithGoogle = (response: any) => {
		const { w3, Zi } = response;
		const { U3, ig } = w3;
		const { access_token } = Zi;

		dispatch(externalLogin(ig, U3, access_token, 'Google'));
	};

	const loginWithGoogleFailure = () => dispatch(showAlert('error', language.textUnexpectedError));

	const onLoginClicked = (event: any) => {
		dispatch(login());
		event.preventDefault();
	};

	return (
		<div className='page_auth__content_container'>
			<h1 className='page_auth__title'>{language.titleLogin}</h1>
			<p className='page_auth__subtitle'>{language.textLoginSubtitle}</p>

			<form onSubmit={onLoginClicked}>
				<Input
					className='page_auth__input'
					value={email}
					onChange={handleChangeEmail}
					type='email'
					placeholder={language.textEnterEmail}
					required
				/>
				<Input
					className='page_auth__input'
					value={password}
					onChange={handleChangePassword}
					type='password'
					placeholder={language.textEnterPassword}
					required
					pattern='.{6,}'
				/>
				<Button
					className='page_auth__forgot_password_button'
					type='button'
					mode='text'
					title={language.actionForgotPassword}
					onClick={onForgotPasswordClicked}
				/>
				<div className='page_auth__buttons_container'>
					<Button
						className='page_auth__action_button'
						type='button'
						mode='text'
						title={language.actionRegister}
						onClick={onRegisterClicked}
					/>
					<Button type='submit' title={language.actionLogin}/>
				</div>
			</form>

			<GoogleLogin
				clientId="423023829234-3rdcs6s6q0v8nbp2akd6ir91m25knq1e.apps.googleusercontent.com"
				buttonText="LOGIN WITH GOOGLE"
				onSuccess={loginWithGoogle}
				onFailure={loginWithGoogleFailure}
			/>
		</div>
	);
};

Login.layoutOptions = {
	title: language.titleLogin,
	layout: 'Auth',
};

const mapStateToProps = (state: AppState) => {
	const { email, password } = state.auth;

	return {
		email,
		password,
	};
};

export default connect(mapStateToProps)(Login);
