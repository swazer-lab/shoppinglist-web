import React, { FormEvent, useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Button, Input } from '../../components';

import {
	changeEmail,
	changePassword,
	changeResetPasswordCode,
	resetPassword,
	sendForgotPasswordEmail,
} from '../../actions/auth';
import language from '../../assets/language';

import './styles.scss';
import { clearAlert, navigate } from '../../actions/service';

interface Props {
	dispatch: Function,

	email: string,
	password: string,
	resetPasswordCode: string,
	isResettingPassword: boolean,
}

const ForgotPassword = (props: Props) => {
	const { dispatch, email, password, resetPasswordCode, isResettingPassword } = props;

	useEffect(() => {
		dispatch(clearAlert());
		return () => {
			dispatch(clearAlert());
		};
	});

	const onLoginClicked = () => dispatch(navigate('Login'));

	const handleEmailChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeEmail(e.currentTarget.value));
	const handleResetPasswordCodeChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeResetPasswordCode(e.currentTarget.value));
	const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => dispatch(changePassword(e.currentTarget.value));

	const onSendForgotPasswordEmailClicked = (e: FormEvent<HTMLFormElement>) => {
		dispatch(sendForgotPasswordEmail());
		e.preventDefault();
	};
	const onResetPasswordClicked = (e: FormEvent<HTMLFormElement>) => {
		dispatch(resetPassword());
		e.preventDefault();
	};

	const getSubtitle = () => {
		if (!isResettingPassword) {
			return <p className='page_auth__subtitle'>{language.textForgotPasswordSubtitleStep1}</p>;
		} else {
			return <p className='page_auth__subtitle'>{language.textForgotPasswordSubtitleStep2}</p>;
		}
	};

	const renderForm = () => {
		if (!isResettingPassword) {
			return (
				<form onSubmit={onSendForgotPasswordEmailClicked}>
					<Input
						className='page_auth__input'
						value={email}
						onChange={handleEmailChange}
						type='email'
						placeholder={language.textEnterEmail}
						autoFoucus={true}
						required
					/>

					<div className='page_auth__buttons_container'>
						<Button
							className='page_auth__action_button'
							type='button'
							mode='text'
							title={language.actionLogin}
							onClick={onLoginClicked}
						/>
						<Button type='submit' title={language.actionSendResetPasswordEmail} />
					</div>
				</form>
			);
		} else {
			return (
				<form onSubmit={onResetPasswordClicked}>
					<Input
						className='page_auth__input'
						value={resetPasswordCode}
						onChange={handleResetPasswordCodeChange}
						type='text'
						placeholder={language.textEnterResetPasswordCode}
						autoFoucus={true}
						required
					/>
					<Input
						className='page_auth__input'
						value={password}
						onChange={handlePasswordChange}
						type='password'
						placeholder={language.textEnterNewPassword}
						pattern='.{6,}'
						required
					/>

					<Button
						type='submit'
						className='page_auth__action_auth_button'
						title={language.actionResetPassword}
					/>
				</form>
			);
		}
	};

	return (
		<div className='page_auth__content_container'>
			<h1 className='page_auth__title'>{language.titleForgotPassword}</h1>
			{getSubtitle()}
			{renderForm()}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, password, resetPasswordCode, isResettingPassword } = state.auth;

	return {
		email,
		password,
		resetPasswordCode,
		isResettingPassword,
	};
};

ForgotPassword.layoutOptions = {
	title: language.titleForgotPassword,
	layout: 'Auth',
};

export default connect(mapStateToProps)(ForgotPassword);
