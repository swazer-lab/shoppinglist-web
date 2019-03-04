import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { AuthContainer } from '../../components/AuthContainer';
import {
	changeEmail,
	changePassword,
	changePhone,
	changeName,
	register,
	login,
	sendForgotPasswordEmail,
} from '../../actions/auth';
import { navigate } from '../../actions/service';

interface Props {
	dispatch: Function,

	email: string,
	password: string,
	name: string,
	phone: string,

	errorMessage: string,

	isRegistered: boolean,

	isLoggedIn: boolean,
	isLoading: boolean,
}

const Register = (props: Props) => {
	const { dispatch, email, password, name, phone, errorMessage, isLoading, isRegistered} = props;

	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangePassword = (e: any) => dispatch(changePassword(e.target.value));
	const handlePhone = (e: any) => dispatch(changePhone(e.target.value));
	const handleName = (e: any) => dispatch(changeName(e.target.value));

	const onRegisterClicked = () => dispatch(register());

	const submitRegister = (e: any) => {
		dispatch(register());
		e.preventDefault();
	};

	const message = errorMessage ? errorMessage : 'create your account';

	return (
		<AuthContainer className='page_auth' isLoading={isLoading}>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>Register</h1>
				<p className='page_auth__subtitle'>{message}</p>

				<form onSubmit={submitRegister}>
					<Input
						className='page_auth__input'
						value={name}
						onChange={handleName}
						type='text'
						placeholder='Name'
						required
					/>
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
					<div className='page_auth__action_auth_button'>
						<Button type='submit' title='Register' onClick={onRegisterClicked} />
					</div>
				</form>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, name, phone, password, errorMessage, isLoading, isLoggedIn, isRegistered } = state.auth;

	return {
		email,
		name,
		phone,
		password,
		isLoading,
		errorMessage,
		isLoggedIn,
		isRegistered
	};
};

export default connect(mapStateToProps)(Register);
