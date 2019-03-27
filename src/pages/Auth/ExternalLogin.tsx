import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { FACEBOOK_APP_ID, GOOGLE_CLIENT_ID } from '../../config/constants';
import language from '../../assets/language';

interface Props {
	loginWithFacebook: (response: any) => void,
	loginWithFacebookFailure: () => void

	loginWithGoogle: (response: any) => void
	loginWithGoogleFailure: () => void
}

const ExternalLogin = (props: Props) => {
	const { loginWithFacebook, loginWithFacebookFailure, loginWithGoogle, loginWithGoogleFailure } = props;

	const onLoginWithGoogleClicked = () => {
		const google_button = document.getElementsByClassName('login_with_google_badge')[0];
		// @ts-ignore
		google_button.click();
	};

	const onLoginWithFacebookClicked = () => {
		const facebook_button = document.getElementsByClassName('login_with_facebook_badge')[0];
		// @ts-ignore
		facebook_button.click();
	};

	return (
		<>
			<div className='page_auth__separator'>
				<div/>
				<span>{language.titleExternalLogin}</span>
				<div/>
			</div>

			<div className='page_auth__external_login_container'>
				<FacebookLogin
					cssClass='login_with_facebook_badge'
					appId={FACEBOOK_APP_ID}
					fields="name, email, picture"
					callback={loginWithFacebook}
					onFailure={loginWithFacebookFailure}
				/>

				<GoogleLogin
					className='login_with_google_badge'
					clientId={GOOGLE_CLIENT_ID}
					buttonText="REGISTER WITH GOOGLE"
					onSuccess={loginWithGoogle}
					onFailure={loginWithGoogleFailure}
				/>

				<div onClick={onLoginWithGoogleClicked}>{language.actionLoginWithGoogle}</div>
				<div onClick={onLoginWithFacebookClicked}>{language.actionLoginWithGoogle}</div>
			</div>
		</>
	);
};

export default ExternalLogin;
