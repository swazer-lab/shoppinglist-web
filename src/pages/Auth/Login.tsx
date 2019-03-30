import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { Button, Input } from '../../components';

import { clearAlert, navigate, showAlert } from '../../actions/service';
import { changeEmail, changePassword, externalLogin, login } from '../../actions/auth';
import { setProfileAvatarUrl } from '../../actions/profile';
import language from '../../assets/language';

import './styles.scss';
import ExternalLogin from './ExternalLogin';

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

	const onLoginClicked = (event: any) => {
		dispatch(login());
		event.preventDefault();
	};

	const loginWithGoogle = (response: any) => {
		const name = response.w3.ig;
		const email = response.w3.U3;
		const profilePhoto = response.w3.Paa;
		const accessToken = response.Zi.access_token;

		dispatch(setProfileAvatarUrl(profilePhoto));
		dispatch(externalLogin(name, email, accessToken, 'Google'));
	};

	const loginWithGoogleFailure = () => dispatch(showAlert('error', '', language.textUnexpectedError));

	const loginWithFacebook = (response: any) => {
		const { accessToken, name, email, picture } = response;

		dispatch(setProfileAvatarUrl(picture.data.url));
		dispatch(externalLogin(name, email, accessToken, 'Facebook'));
	};

	const loginWithFacebookFailure = () => dispatch(showAlert('error', '', language.textUnexpectedError));

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

			<ExternalLogin loginWithFacebook={loginWithFacebook} loginWithFacebookFailure={loginWithFacebookFailure}
			               loginWithGoogle={loginWithGoogle} loginWithGoogleFailure={loginWithGoogleFailure}/>
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
