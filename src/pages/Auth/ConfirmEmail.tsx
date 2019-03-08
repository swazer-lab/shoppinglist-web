import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { AuthContainer } from '../../components';

import { confirmEmail } from '../../actions/auth';
import { useLocalStorage } from '../../config/utilities';
import language from '../../assets/language';

interface Props {
	dispatch: Function,
	location: any,

	isLoading: boolean,
	errorMessage?: string,
}

const ConfirmEmail = (props: Props) => {
	useEffect(() => {
		const { dispatch, location } = props;
		const queryParams = new URLSearchParams(location.search);

		const userId = queryParams.get('userId');
		const token = queryParams.get('token');

		if (userId && token) dispatch(confirmEmail(userId, token));
	});
	const { isEmailConfirmed } = useLocalStorage();
	const { isLoading, errorMessage } = props;

	const message = (!isLoading && isEmailConfirmed) ? language.textConfirmEmailSubTitle : errorMessage || '';
	return (
		<AuthContainer className='page_auth' isLoading={isLoading}>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>{language.titleConfirmEmail}</h1>
				<p className='page_auth__subtitle'>{message}</p>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { isLoading, errorMessage } = state.auth;

	return {
		isLoading,
		errorMessage,
	};
};

export default connect(mapStateToProps)(ConfirmEmail);
