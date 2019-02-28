import * as React from 'react';
import { connect } from 'react-redux';

import { Input, Button } from '../../components';

import { AppState } from '../../types/store';
import { changeEmail, changePassword, changeResetCode, sendForgotPasswordEmail } from '../../actions/auth';
import { AuthContainer } from '../../components/AuthContainer';

interface Props {
	email: string,
	resetCode: string,
	isResettingPassword: boolean,
	resetPassword: string,
	dispatch: Function,
}

const ForgotPassword = (props: Props) => {
	const { email, isResettingPassword, resetCode, resetPassword, dispatch } = props;

	const handleResetCode = (e: any) => dispatch(changeResetCode(e.target.value));
	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangeResetPassword = (e: any) => dispatch(changePassword(e.target.value));

	return (
		<AuthContainer className='page_auth'>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>Forgot Password</h1>
				<p className='page_auth__subtitle'/>

				<form action='#'>
					{isResettingPassword
						? <div>
							<Input
							className='page_auth__input'
							value={resetCode}
							onChange={handleResetCode}
							type='password'
							placeholder='Reset Code'
							required
							pattern='.{6,}'
						/>
							<Input
								className='page_auth__input'
								value={resetPassword}
								onChange={handleChangeResetPassword}
								type='password'
								placeholder='Password'
								required
								pattern='.{6,}'
							/>
						</div>
						: <Input
							className='page_auth__input'
							value={email}
							onChange={handleChangeEmail}
							type='email'
							placeholder='Email'
							required
						/>
					}

					<div className='page_auth__buttons_container'>
						<Button
							type='submit'
							title={isResettingPassword ? 'Reset Password' : 'Send Email'}
							onClick={() => props.dispatch(sendForgotPasswordEmail())}
						/>
					</div>

				</form>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, isResettingPassword, resetCode, resetPassword } = state.auth;

	return {
		isResettingPassword: isResettingPassword,
		email,
		resetCode,
		resetPassword
	};
};

export default connect(mapStateToProps)(ForgotPassword);
