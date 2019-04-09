import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Profile } from '../../types/api';

import { Alert, Snackbar } from '../../components';
import { NavigationBar, ProfileModal } from './';

import { clearAlert, hideSnackbar, navigate } from '../../actions/service';
import { logout, resendConfirmEmail } from '../../actions/auth';

import {
	changeDraftProfileName,
	changeDraftProfilePhoneNumber,
	deleteProfilePhoto,
	fetchProfile,
	updateProfile,
	updateProfilePhoto,
} from '../../actions/profile';

import { useLocalStorage } from '../../config/localstorage';

import { changeSearchQuery, filterCarts } from '../../actions/carts';
import { fetchContacts } from '../../actions/contacts';

import './styles.scss';

interface Props {
	dispatch: Function,
	children: any,

	layoutOptions?: any,
	progress: AppState['service']['progress'],
	snackbar: AppState['service']['snackbar'],
	alert: AppState['service']['alert'],

	id?: string,
	name?: string,
	email?: string,
	phoneNumber?: string,
	photoUrl?: string,
	avatarUrl?: string,
	draftProfile: Profile,

	searchQuery?: string,
}

const MainLayout = (props: Props) => {
	const { children, dispatch, progress, snackbar, alert, id, name, email, phoneNumber, photoUrl, avatarUrl, draftProfile, searchQuery } = props;

	const { isLoggedIn, accessToken, isEmailConfirmed } = useLocalStorage();

	const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

	useEffect(() => {
		if (isLoggedIn && accessToken) {
			dispatch(fetchProfile());
			dispatch(fetchContacts());
		}
	}, [isLoggedIn, accessToken]);

	const onChangeDraftProfileName = (name: string) => dispatch(changeDraftProfileName(name));
	const onChangeDraftProfilePhoneNumber = (phoneNumber: string) => dispatch(changeDraftProfilePhoneNumber(phoneNumber));
	const onUpdateProfileClicked = () => dispatch(updateProfile());

	const onResendConfirmEmailConfirmClicked = (userId: string) => {
		setIsProfileModalVisible(false);
		dispatch(resendConfirmEmail(userId));
	};

	const onRedirectingToChangePasswordClicked = () => dispatch(navigate('ChangePassword'));

	const onUpdateProfilePhotoClicked = (photoData: string) => dispatch(updateProfilePhoto(photoData));

	const onDeleteProfilePhotoClicked = (e: any) => {
		e.stopPropagation();
		dispatch(deleteProfilePhoto());
	};

	const onLogoutClicked = () => dispatch(logout());

	const onSearchQueryChanged = (queryString: string) => dispatch(changeSearchQuery(queryString));
	const onFilterClicked = () => dispatch(filterCarts());

	const onSnackbarRequestClose = () => {
		if (snackbar.visible) {
			dispatch(hideSnackbar());
		}
	};

	const handleClosedToastr = () => {
		dispatch(clearAlert());
	};

	return (
		<div className='main_layout'>
			<NavigationBar
				progress={progress}
				profilePhotoUrl={photoUrl}
				profileAvatarUrl={avatarUrl}
				searchQuery={searchQuery}
				onOpenProfileModalClick={() => setIsProfileModalVisible(true)}
				onSearchQueryChange={onSearchQueryChanged}
				onFilterClick={onFilterClicked}
			/>
			<ProfileModal
				isVisible={isProfileModalVisible}
				isLoading={progress.visible}
				onCloseProfileModalClick={() => setIsProfileModalVisible(false)}
				id={id}
				name={name}
				email={email}
				phoneNumber={phoneNumber}
				isEmailConfirmed={isEmailConfirmed}
				photoUrl={photoUrl}
				avatarUrl={avatarUrl}
				draftProfile={draftProfile}
				onDraftProfileNameChange={onChangeDraftProfileName}
				onDraftProfilePhoneNumberChange={onChangeDraftProfilePhoneNumber}
				onUpdateProfileClick={onUpdateProfileClicked}
				onUpdateProfilePhotoClick={onUpdateProfilePhotoClicked}
				onDeleteProfilePhotoClick={onDeleteProfilePhotoClicked}
				onLogoutClick={onLogoutClicked}
				onResendConfirmEmailConfirmClick={onResendConfirmEmailConfirmClicked}
				onRedirectingToChangePasswordClick={onRedirectingToChangePasswordClicked}
			/>
			<Snackbar
				visible={snackbar.visible}
				message={snackbar.message}
				actions={snackbar.actions}
				duration={snackbar.duration}
				onRequestClose={onSnackbarRequestClose}
			/>
			<Alert
				visible={alert.visible}
				type={alert.type}
				message={alert.message}
				handleCloseToastr={handleClosedToastr}
			/>

			{children}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { progress, snackbar, alert } = state.service;
	const { id, name, email, phoneNumber, photoUrl, avatarUrl, draftProfile } = state.profile;
	const { searchQuery } = state.carts;

	return {
		progress,
		snackbar,
		alert,

		id,
		name,
		email,
		phoneNumber,
		photoUrl,
		avatarUrl,
		draftProfile,

		searchQuery,
	};
};

export default connect(mapStateToProps)(MainLayout);
