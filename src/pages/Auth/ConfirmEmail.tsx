import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { confirmEmail } from '../../actions/auth';

import language from '../../assets/language';

import './styles.scss';

interface Props {
	dispatch: Function,
	location: any,
}

interface Props {
	history: { push(url: string): void };
	isConfirmed: boolean;
}

function ConfirmEmail(props: Props) {
	useEffect(() => {
		const queryParams = new URLSearchParams(props.location.search);
		const userId = queryParams.get('userId');
		const token = queryParams.get('token');

		if (!userId || !token) {
			props.history.push('/admin/login');
			return;
		}
		props.dispatch(confirmEmail(userId, token));
	}, []);

	return (
		<div className='page_auth__content_container'>
			<h1 className='page_auth__title'>{language.titleConfirmEmail}</h1>
			<p className='page_auth__subtitle'>{language.textConfirmEmailSubtitle}</p>
		</div>
	);
}

const mapStateToProps = (state: AppState) => {
	return {};
};

export default connect(mapStateToProps)(ConfirmEmail);
