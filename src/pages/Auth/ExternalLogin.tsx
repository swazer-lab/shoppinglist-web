import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

interface Props {
	loginWithFacebook: (response: any) => void,
	loginWithFacebookFailure: () => void

	loginWithGoogle: (response: any) => void
	loginWithGoogleFailure: () => void

	onLoginWithGoogleClicked: () => void
	onLoginWithFacebookClicked: () => void
}

const ExternalRegister = (props: Props) => {
	const { loginWithFacebook, loginWithFacebookFailure, loginWithGoogle, loginWithGoogleFailure, onLoginWithGoogleClicked, onLoginWithFacebookClicked} = props;

	return (
		<div className='page_auth__external_login_container'>
			<FacebookLogin
				cssClass='login_with_facebook_badge'
				appId="395394161261342"
				fields="name, email"
				callback={loginWithFacebook}
				onFailure={loginWithFacebookFailure}
			/>

			<GoogleLogin
				className='login_with_google_badge'
				clientId="423023829234-3rdcs6s6q0v8nbp2akd6ir91m25knq1e.apps.googleusercontent.com"
				buttonText="REGISTER WITH GOOGLE"
				onSuccess={loginWithGoogle}
				onFailure={loginWithGoogleFailure}
			/>

			<div onClick={onLoginWithGoogleClicked}>Continue with Google</div>
			<div onClick={onLoginWithFacebookClicked}>Continue with Facebook</div>
		</div>
	);
};

export default ExternalRegister;
