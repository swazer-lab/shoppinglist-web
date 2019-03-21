import React, { useState } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../types/store';
import { Profile } from '../types/api';

import { Snackbar } from '../components';
import { NavigationBar, ProfileModal } from './';

import { hideSnackbar, navigate } from '../actions/service';
import { logout } from '../actions/auth';

import {
	changeDraftProfileName,
	changeDraftProfilePhoneNumber,
	updateProfile,
	updateProfilePhoto,
} from '../actions/profile';

import {
	changeSearchQuery,
	filterCarts
} from '../actions/carts';

import { useDocumentTitle, useLocalStorage } from '../config/utilities';
import './styles.scss';

interface Props {
	dispatch: Function,
	children: any,

	layoutOptions?: any,
	progress: AppState['service']['progress'],
	snackbar: AppState['service']['snackbar'],

	name?: string,
	email?: string,
	phoneNumber?: string,
	photoUrl?: string,
	searchQuery?: string,
	draftProfile: Profile,
}

const Layout = (props: Props) => {
	const { children, dispatch, layoutOptions, progress, snackbar, name, email, phoneNumber, photoUrl, draftProfile, searchQuery } = props;
	const { isLoggedIn } = useLocalStorage();

	useDocumentTitle(layoutOptions.title);

	if (layoutOptions.authorized && !isLoggedIn) {
		dispatch(navigate('Login'));
	}

	const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

	const onChangeDraftProfileName = (name: string) => dispatch(changeDraftProfileName(name));
	const onChangeDraftProfilePhoneNumber = (phoneNumber: string) => dispatch(changeDraftProfilePhoneNumber(phoneNumber));
	const onUpdateProfileClicked = () => dispatch(updateProfile());

	const onUpdateProfilePhotoClicked = (photoData: string) => dispatch(updateProfilePhoto(photoData));
	const onLogoutClicked = () => dispatch(logout());

	const onSearchQueryChanged = (queryString: string) => dispatch(changeSearchQuery(queryString));
	const onFilterClicked = () => dispatch(filterCarts());

	const onSnackbarRequestClose = () => {
		if (snackbar.visible) {
			dispatch(hideSnackbar());
		}
	};

	return (
		<div className='main_layout'>
			<NavigationBar
				progress={progress}
				profilePhotoUrl={photoUrl}
				searchQuery={searchQuery}
				onOpenProfileModalClick={() => setIsProfileModalVisible(true)}
				onSearchQueryChange={onSearchQueryChanged}
				onFilterClick = {onFilterClicked}
			/>
			<ProfileModal
				isVisible={isProfileModalVisible}
				isLoading={progress.visible}
				onCloseProfileModalClick={() => setIsProfileModalVisible(false)}
				name={name}
				email={email}
				phoneNumber={phoneNumber}
				photoUrl={photoUrl}
				draftProfile={draftProfile}
				onDraftProfileNameChange={onChangeDraftProfileName}
				onDraftProfilePhoneNumberChange={onChangeDraftProfilePhoneNumber}
				onUpdateProfileClick={onUpdateProfileClicked}
				onUpdateProfilePhotoClick={onUpdateProfilePhotoClicked}
				onLogoutClick={onLogoutClicked}
			/>
			<Snackbar
				visible={snackbar.visible}
				message={snackbar.message}
				actions={snackbar.actions}
				duration={snackbar.duration}
				onRequestClose={onSnackbarRequestClose}
			/>

			{children}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { progress, snackbar } = state.service;
	const { name, email, phoneNumber, photoUrl, draftProfile } = state.profile;
	const { searchQuery } = state.carts;

	return {
		progress,
		snackbar,

		name,
		email,
		phoneNumber,
		photoUrl,
		draftProfile,

		searchQuery
	};
};

export default connect(mapStateToProps)(Layout);
