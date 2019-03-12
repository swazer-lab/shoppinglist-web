import React, { useState } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../types/store';

import { NavigationBar, ProfileModal } from './';

import { navigate } from '../actions/service';
import { logout } from '../actions/auth';
import { updateProfilePhoto } from '../actions/profile';

import { useLocalStorage } from '../config/utilities';
import './styles.scss';

interface Props {
	dispatch: Function,
	children: any,

	layoutOptions?: any,
	progress: AppState['service']['progress'],

	name?: string,
	email?: string,
	phoneNumber?: string,
	photoUrl?: string,
}

const Layout = (props: Props) => {
	const { dispatch, children, layoutOptions, progress, name, email, phoneNumber, photoUrl } = props;
	const { isLoggedIn } = useLocalStorage();

	if (layoutOptions.authorized && !isLoggedIn) dispatch(navigate('Login'));

	const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

	const onOpenProfileModalClicked = () => setIsProfileModalVisible(true);
	const onCloseProfileModalClicked = () => setIsProfileModalVisible(false);

	const onUpdateProfilePhotoClicked = (photoData: string) => dispatch(updateProfilePhoto(photoData));
	const onLogoutClicked = () => dispatch(logout());

	return (
		<div className='main_layout'>
			<NavigationBar
				progress={progress}
				profilePhotoUrl={photoUrl}
				onOpenProfileModalClick={onOpenProfileModalClicked}
			/>
			<ProfileModal
				isVisible={isProfileModalVisible}
				isLoading={progress.visible}
				onCloseProfileModalClick={onCloseProfileModalClicked}
				name={name}
				email={email}
				phoneNumber={phoneNumber}
				photoUrl={photoUrl}
				onLogoutClick={onLogoutClicked}
				onUpdateProfilePhotoClick={onUpdateProfilePhotoClicked}
			/>
			{children}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { progress } = state.service;
	const { name, email, phoneNumber, photoUrl } = state.profile;

	return {
		progress,

		name,
		email,
		phoneNumber,
		photoUrl,
	};
};

export default connect(mapStateToProps)(Layout);
