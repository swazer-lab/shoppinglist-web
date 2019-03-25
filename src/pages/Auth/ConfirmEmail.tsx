import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { confirmEmail } from '../../actions/auth';
import language from '../../assets/language';

import './styles.scss';
import { clearAlert } from '../../actions/service';

interface Props {
	dispatch: Function,
	location: any,
}

const ConfirmEmail = (props: Props) => {
	const { dispatch, location } = props;

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);

		const userId = queryParams.get('userId');
		const token = queryParams.get('token');

		if (userId && token) dispatch(confirmEmail(userId, token));
	}, []);

	useEffect(() => () => dispatch(clearAlert()), []);

	return (
		<div className='page_auth__content_container'>
			<h1 className='page_auth__title'>{language.titleConfirmEmail}</h1>
			<p className='page_auth__subtitle'>{language.textConfirmEmailSubtitle}</p>
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	return {};
};

ConfirmEmail.layoutOptions = {
	title: language.titleConfirmEmail,
	layout: 'Auth',
};

export default connect(mapStateToProps)(ConfirmEmail);
