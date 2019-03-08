import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { AuthContainer, Input, Button } from '../../components';

import { navigate } from '../../actions/service';
import { changeName, changeEmail, changePassword, register } from '../../actions/auth';

import language from '../../assets/language';

import './styles.scss';

interface Props {
	dispatch: Function,

	name: string,
	email: string,
	password: string,

	isLoading: boolean,
	errorMessage?: string,
}

const Register = (props: Props) => {
	const { dispatch, name, email, password, isLoading, errorMessage } = props;

	const handleNameChange = (e: any) => dispatch(changeName(e.target.value));
	const handleEmailChange = (e: any) => dispatch(changeEmail(e.target.value));
	const handlePasswordChange = (e: any) => dispatch(changePassword(e.target.value));

	const onLoginClicked = () => dispatch(navigate('Login'));
	const onRegisterClicked = (e: any) => {
		dispatch(register());
		e.preventDefault();
	};

	const message = errorMessage ? errorMessage : language.textRegisterSubtitle;

	return (
		<AuthContainer className='page_auth' isLoading={isLoading}>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>{language.titleRegister}</h1>
				<p className='page_auth__subtitle'>{message}</p>

				<form onSubmit={onRegisterClicked}>
					<Input
						className='page_auth__input'
						value={name}
						onChange={handleNameChange}
						placeholder={language.textEnterName}
						type='text'
						required
					/>
					<Input
						className='page_auth__input'
						value={email}
						onChange={handleEmailChange}
						type='email'
						placeholder={language.textEnterEmail}
						required
					/>
					<Input
						className='page_auth__input'
						value={password}
						onChange={handlePasswordChange}
						type='password'
						placeholder={language.textEnterPassword}
						required
						pattern='.{6,}'
					/>

					<div className='page_auth__buttons_container'>
						<Button
							className='page_auth__action_button'
							type='button'
							mode='text'
							title={language.actionLoginInstead}
							onClick={onLoginClicked}
						/>
						<Button type='submit' title={language.actionRegister} />
					</div>
				</form>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { name, email, password, isLoading, errorMessage } = state.auth;

	return {
		name,
		email,
		password,
		isLoading,
		errorMessage,
	};
};

export default connect(mapStateToProps)(Register);
