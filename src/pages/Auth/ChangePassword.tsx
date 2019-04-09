import React, { FormEvent } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import language from '../../assets/language';
import { changePassword, updatePassword, changeNewPassword } from '../../actions/auth';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { navigate } from '../../actions/service';

interface Props {
	dispatch: Function,

	password: string,
	newPassword: string
}

const ChangePassword = (props: Props) => {
	const { dispatch, password, newPassword } = props;

	const onForgotPasswordClicked = () => dispatch(navigate('ForgotPassword'));

	const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => dispatch(changePassword(e.currentTarget.value));
	const handleNewPasswordChange = (e: FormEvent<HTMLInputElement>) => dispatch(changeNewPassword(e.currentTarget.value));

	const onChangePasswordClicked = (event: any) => {
		dispatch(updatePassword());
		event.preventDefault();
	};

    return (
	    <div className='page_auth__content_container'>
		    <h1 className='page_auth__title'>{language.titleChangePassword}</h1>
		    <p className='page_auth__subtitle'>{language.textChangePasswordsubtitle}</p>

		    <form onSubmit={onChangePasswordClicked}>
			    <Input
				    className='page_auth__input'
				    value={password}
				    onChange={handlePasswordChange}
				    type='password'
				    placeholder={language.textEnterPassword}
				    required
			    />
			    <Input
				    className='page_auth__input'
				    value={newPassword}
				    onChange={handleNewPasswordChange}
				    type='password'
				    placeholder={language.textEnterNewPassword}
				    required
			    />

			    <div className='page_auth__buttons_container'>
				    <Button
					    className='page_auth__action_button'
					    type='button'
					    mode='text'
					    title={language.actionForgotPassword}
					    onClick={onForgotPasswordClicked}
				    />
				    <Button type='submit' title={language.actionChangePassword}/>
			    </div>
		    </form>
	    </div>
    );
};

const mapStateToProps = (state: AppState) => {
	const { password, newPassword} = state.auth;

	return {
		password,
		newPassword
	};
};

ChangePassword.layoutOptions = {
	title: language.titleForgotPassword,
	layout: 'Auth',
};

export default connect(mapStateToProps)(ChangePassword);
