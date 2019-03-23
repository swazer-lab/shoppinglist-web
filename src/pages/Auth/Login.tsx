import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { Button, Input } from '../../components';

import { navigate } from '../../actions/service';
import { changeEmail, changePassword, login } from '../../actions/auth';

import { useDocumentTitle } from '../../config/utilities';
import language from '../../assets/language';

import './styles.scss';

interface Props {
	dispatch: Function,

	email: string,
	password: string,

	isLoading: boolean,
	errorMessage?: string,
}

const Login = (props: Props) => {
	const { dispatch, email, password, isLoading, errorMessage } = props;

	useDocumentTitle(language.titleLogin);

	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangePassword = (e: any) => dispatch(changePassword(e.target.value));

	const onForgotPasswordClicked = () => dispatch(navigate('ForgotPassword'));
	const onRegisterClicked = () => dispatch(navigate('Register'));

	const onLoginClicked = (event: any) => {
		dispatch(login());
		event.preventDefault();
	};

	const message = errorMessage ? errorMessage : language.textLoginSubTitle;

	return (
		<div className='page_auth__content_container'>
			<h1 className='page_auth__title'>{language.titleLogin}</h1>
			<p className='page_auth__subtitle'>{message}</p>

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
					<Button type='submit' title={language.actionLogin} />
				</div>
			</form>
		</div>
	);
};

Login.layoutOptions = {
	title: 'Login',
	layout: 'Auth',
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
