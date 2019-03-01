import * as React from 'react';
import { connect } from 'react-redux';

import { Input, Button } from '../../components';

import { AppState } from '../../types/store';
import {
	changeEmail,
	changeResetCode,
	sendForgotPasswordEmail,
	changeResetPassword,
	sendResetCode,
} from '../../actions/auth';
import { AuthContainer } from '../../components/AuthContainer';

interface Props {
	email: string,
	resetCode: string,
	isResettingPassword: boolean,
	resetPassword: string,
	isLoading: boolean,
	errorMessage: string,
	dispatch: Function,
}

const ForgotPassword = (props: Props) => {
	const { email, isResettingPassword, resetCode, resetPassword, isLoading, errorMessage, dispatch } = props;

	const handleResetCode = (e: any) => dispatch(changeResetCode(e.target.value));
	const handleChangeEmail = (e: any) => dispatch(changeEmail(e.target.value));
	const handleChangeResetPassword = (e: any) => dispatch(changeResetPassword(e.target.value));

	return (
		<AuthContainer className='page_auth' isLoading={isLoading}>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>Forgot Password</h1>
				{isResettingPassword
					?
					<p className='page_auth__subtitle'>We sent reset password to your mail</p>
					:
					<p className='page_auth__subtitle'>Please enter your email to get reset password code</p>
				}

				{errorMessage
					?
					<p className='page_auth__subtitle'>{errorMessage}</p>
					:
					''
				}


				<form action='#'>
					{isResettingPassword
						? <div>
							<Input
								className='page_auth__input'
								value={resetCode}
								onChange={handleResetCode}
								type='text'
								placeholder='Reset Code'
								required
							/>
							<Input
								className='page_auth__input'
								value={resetPassword}
								onChange={handleChangeResetPassword}
								type='password'
								placeholder='New Password'
								required
								pattern='.{6,}'
							/>
						</div>
						:
						<div>
							<Input
								className='page_auth__input'
								value={email}
								onChange={handleChangeEmail}
								type='email'
								placeholder='Email'
								required
							/>
						</div>
					}

					{isResettingPassword
						? <Button
							type='submit'
							className='page_auth__action_forgot_password_button'
							title={'Reset Password'}
							onClick={() => props.dispatch(sendResetCode())}
						/>
						: <Button
							className='page_auth__action_forgot_password_button'
							type='submit'
							title={'Send Email'}
							onClick={() => props.dispatch(sendForgotPasswordEmail())}
						/>
					}

				</form>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { email, isResettingPassword, resetCode, resetPassword, errorMessage, isLoading } = state.auth;

	return {
		isResettingPassword: isResettingPassword,
		email,
		resetCode,
		isLoading,
		resetPassword,
		errorMessage,
	};
};

export default connect(mapStateToProps)(ForgotPassword);
