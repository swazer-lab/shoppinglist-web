import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';

import { AuthContainer } from '../../components';

import { fetchProfile } from '../../actions/profile';
import { useLocalStorage } from '../../config/utilities';

interface Props {
	dispatch: Function,

	name?: string,
	email?: string,
	phone?: string,
}

const Profile = (props: Props) => {
	const { dispatch, name, email, phone } = props;
	const { isLoggedIn } = useLocalStorage();

	useEffect(() => {
		if (isLoggedIn) dispatch(fetchProfile());
	}, [isLoggedIn]);

	return (
		<AuthContainer className='page_auth'>
			<div className='page_auth__content_container'>
				<h1 className='page_auth__title'>Profile</h1>
				<p className='page_auth__subtitle'>Your profile</p>
				<div><span>Name:</span>{name}</div>
				<div><span>Email:</span>{email}</div>
				<div><span>Phone:</span>{phone}</div>
			</div>
		</AuthContainer>
	);
};

const mapStateToProps = (state: AppState) => {
	const { name, email, phone } = state.profile;

	return {
		name, email, phone,
	};
};

export default connect(mapStateToProps)(Profile);
