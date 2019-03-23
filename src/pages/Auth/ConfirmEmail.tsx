import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { confirmEmail } from '../../actions/auth';

import { useLocalStorage } from '../../config/localstorage';
import { useDocumentTitle } from '../../config/utilities';
import language from '../../assets/language';

import './styles.scss';

interface Props {
	dispatch: Function,
	location: any,

	isLoading: boolean,
	errorMessage?: string,
}

const ConfirmEmail = (props: Props) => {
	const { isLoading, errorMessage } = props;
	const { isEmailConfirmed } = useLocalStorage();

	useDocumentTitle(language.titleConfirmEmail);

	useEffect(() => {
		const { dispatch, location } = props;
		const queryParams = new URLSearchParams(location.search);

		const userId = queryParams.get('userId');
		const token = queryParams.get('token');

		if (userId && token) dispatch(confirmEmail(userId, token));
	}, []);

	const message = (!isLoading && isEmailConfirmed) ? language.textConfirmEmailSubTitle : errorMessage || '';
	return (
		<div className='page_auth__content_container'>
			<h1 className='page_auth__title'>{language.titleConfirmEmail}</h1>
			<p className='page_auth__subtitle'>{message}</p>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { isLoading, errorMessage } = state.auth;

	return {
		isLoading,
		errorMessage,
	};
};

ConfirmEmail.layoutOptions = {
	title: 'Login',
	layout: 'ConfirmEmail',
};

export default connect(mapStateToProps)(ConfirmEmail);
