import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { Button, Input } from '../../components';

import { clearAlert, navigate } from '../../actions/service';
import { changeEmail, changeName, changePassword, register } from '../../actions/auth';
import language from '../../assets/language';

import './styles.scss';

interface Props {
	dispatch: Function,

	name: string,
	email: string,
	password: string,
}

const Register = (props: Props) => {
	const { dispatch, name, email, password } = props;

	useEffect(() => () => dispatch(clearAlert()), []);

	const handleNameChange = (e: any) => dispatch(changeName(e.target.value));
	const handleEmailChange = (e: any) => dispatch(changeEmail(e.target.value));
	const handlePasswordChange = (e: any) => dispatch(changePassword(e.target.value));

	const onLoginClicked = () => dispatch(navigate('Login'));
	const onRegisterClicked = (e: any) => {
		dispatch(register());
		e.preventDefault();
	};

	return (
		<div className='page_auth__content_container'>
			<h1 className='page_auth__title'>{language.titleRegister}</h1>
			<p className='page_auth__subtitle'>{language.textRegistersubtitle}</p>

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
	);
};

Register.layoutOptions = {
	title: language.titleRegister,
	layout: 'Auth',
};

const mapStateToProps = (state: AppState) => {
	const { name, email, password } = state.auth;

	return {
		name,
		email,
		password,
	};
};

export default connect(mapStateToProps)(Register);
