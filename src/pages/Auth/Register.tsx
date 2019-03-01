import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { AuthContainer } from '../../components/AuthContainer';
import { changeEmail, changePassword, changePhone, changeName, register, login } from '../../actions/auth';
import { navigate } from '../../actions/service';

interface Props {
	dispatch: Function,

	email: string,
	password: string,
	name: string,
	phone: string,

	errorMessage: string,

	isLoading: boolean,
}

const Register = (props: Props) => {
	const { dispatch, email, password, name, phone, errorMessage, isLoading } = props;

	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangePassword = (e: any) => dispatch(changePassword(e.target.value));
	const handlePhone = (e: any) => dispatch(changePhone(e.target.value));
	const handleName = (e: any) => dispatch(changeName(e.target.value));
	const handleKeyPress = (e: any) => dispatch(register());

	const onRegisterClicked = () => dispatch(register());

	return (
		<AuthContainer className='page_auth' isLoading={isLoading}>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>Register</h1>
				<p className='page_auth__subtitle'></p>

				{errorMessage
					?
					<p className='page_auth__subtitle'>{errorMessage}</p>
					:
					''
				}

				<form action='#'>
					<Input
						className='page_auth__input'
						value={email}
						onChange={handleChangeEmail}
						type='email'
						placeholder='Email'
						onKeyPress={handleKeyPress}
						required
					/>
					<Input
						className='page_auth__input'
						value={password}
						onChange={handleChangePassword}
						type='password'
						placeholder='Password'
						onKeyPress={handleKeyPress}
						required
						pattern='.{6,}'
					/>
					<Input
						className='page_auth__input'
						value={phone}
						onChange={handlePhone}
						type='text'
						placeholder='Mobile'
						onKeyPress={handleKeyPress}
						required
					/>
					<Input
						className='page_auth__input'
						value={name}
						onChange={handleName}
						type='text'
						placeholder='Name'
						onKeyPress={handleKeyPress}
						required
					/>
					<div className='page_auth__buttons_container'>
						<Button type='submit' title='Register' onClick={onRegisterClicked} />
					</div>
				</form>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, name, phone, password, errorMessage, isLoading } = state.auth;
	console.log(errorMessage);

	return {
		email,
		name,
		phone,
		password,
		isLoading,
		errorMessage,
	};
};

export default connect(mapStateToProps)(Register);
