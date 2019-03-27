import React, { useState } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Profile } from '../../types/api';

import { Snackbar } from '../../components';
import { NavigationBar, ProfileModal } from './';

import { hideSnackbar } from '../../actions/service';
import { logout, resendConfirmEmail } from '../../actions/auth';

import {
	changeDraftProfileName,
	changeDraftProfilePhoneNumber,
	updateProfile,
	updateProfilePhoto,
} from '../../actions/profile';

import { changeSearchQuery, filterCarts } from '../../actions/carts';
import './styles.scss';
import { useLocalStorage } from '../../config/utilities';

interface Props {
	dispatch: Function,
	children: any,

	layoutOptions?: any,
	progress: AppState['service']['progress'],
	snackbar: AppState['service']['snackbar'],

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
	const { children, dispatch, progress, snackbar, id, name, email, phoneNumber, photoUrl, avatarUrl, draftProfile, searchQuery } = props;

	const { isEmailConfirmed } = useLocalStorage();

	const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

	const onChangeDraftProfileName = (name: string) => dispatch(changeDraftProfileName(name));
	const onChangeDraftProfilePhoneNumber = (phoneNumber: string) => dispatch(changeDraftProfilePhoneNumber(phoneNumber));
	const onUpdateProfileClicked = () => dispatch(updateProfile());

	const onResendConfirmEmailConfirmClicked = (userId: string) => dispatch(resendConfirmEmail(userId));

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
				onLogoutClick={onLogoutClicked}
				onResendConfirmEmailConfirmClick={onResendConfirmEmailConfirmClicked}
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
	const { id, name, email, phoneNumber, photoUrl, avatarUrl, draftProfile } = state.profile;
	const { searchQuery } = state.carts;

	return {
		progress,
		snackbar,

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
