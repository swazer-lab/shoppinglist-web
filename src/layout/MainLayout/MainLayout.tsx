import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { AppState, RouteName } from '../../types/store';
import { Profile } from '../../types/api';

import { Alert, Snackbar } from '../../components';
import ConfirmLogout from './ConfirmLogoutModal';
import { NavigationBar, ProfileModal } from './';

import { clearAlert, hideSnackbar, navigate, toggleSideBar } from '../../actions/service';
import { changeNewPassword, changePassword, logout, resendConfirmEmail, updatePassword } from '../../actions/auth';

import {
		changeDraftProfileName,
		changeDraftProfilePhoneNumber,
		deleteProfilePhoto,
		fetchProfile,
		updateProfile,
		updateProfilePhoto,
} from '../../actions/profile';

import { changeSearchQuery, filterCarts } from '../../actions/carts';
import { fetchContacts } from '../../actions/contacts';

import './styles.scss';
import SideBar from '../../components/SideBar/SideBar';

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

		password: string,
		newPassword: string,

		isLoggedIn: boolean,
		accessToken: string,
		isEmailConfirmed: boolean,

		isOpenSideBar?: boolean
}

const MainLayout = (props: Props) => {
		const { children, dispatch, progress, snackbar, alert, id, name, email, phoneNumber, password, newPassword, photoUrl, avatarUrl, draftProfile, searchQuery, isLoggedIn, accessToken, isEmailConfirmed, isOpenSideBar, layoutOptions } = props;


		const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
		const [isOpenedSearchBar, setIsOpenedSearchBar] = useState(false);
		const [isShowDiscardDialog, setShowDiscardDialog] = useState(false);

		useEffect(() => {
				if (isLoggedIn && accessToken) {
						dispatch(fetchProfile());
						dispatch(fetchContacts());
				}
		}, [isLoggedIn, accessToken]);

		const onChangeDraftProfileName = (name: string) => dispatch(changeDraftProfileName(name));
		const onChangeDraftProfilePhoneNumber = (phoneNumber: string) => dispatch(changeDraftProfilePhoneNumber(phoneNumber));
		const onUpdateProfileClicked = () => dispatch(updateProfile());

		const onChangePassword = (password: string) => dispatch(changePassword(password));
		const onChangeNewPassword = (newPassword: string) => dispatch(changeNewPassword(newPassword));
		const onUpdatePasswordClicked = () => dispatch(updatePassword());

		const onResendConfirmEmailConfirmClicked = (userId: string) => {
				setIsProfileModalVisible(false);
				dispatch(resendConfirmEmail(userId));
		};

		const onUpdateProfilePhotoClicked = (photoData: string) => dispatch(updateProfilePhoto(photoData));

		const onDeleteProfilePhotoClicked = (e: any) => {
				e.stopPropagation();
				dispatch(deleteProfilePhoto());
		};

		const onLogoutClicked = () => {
				setShowDiscardDialog(true);
		};

		const onClickChangesDiscard = () => {
				dispatch(logout());
		};

		const onClickCancelLogout = () => {
				setShowDiscardDialog(false);
		};

		const onSearchQueryChanged = (queryString: string) => dispatch(changeSearchQuery(queryString));

		const onFilterClicked = () => {
				setIsOpenedSearchBar(true);
				dispatch(filterCarts());
		};

		const onSnackbarRequestClose = () => {
				if (snackbar.visible) {
						dispatch(hideSnackbar());
				}
		};

		const handleClosedToastr = () => {
				dispatch(clearAlert());
		};

		const onCloseSearchBar = () => {
				setIsOpenedSearchBar(false);
		};

		const onToggleSideBar = () => {
				dispatch(toggleSideBar());
		};

		const onNavigateFromSideBar = (routeName: RouteName) => {
				dispatch(navigate(routeName));
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
								isOpenSearchBar={isOpenedSearchBar}
								onCloseSearchBar={onCloseSearchBar}
								onToggleSideBar={onToggleSideBar}
								isShowSideBar={isOpenSideBar}
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
								password={password}
								newPassword={newPassword}
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
								onChangePassword={onChangePassword}
								onChangeNewPassword={onChangeNewPassword}
								onUpdatePasswordClick={onUpdatePasswordClicked}
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
						<ConfirmLogout
								isShow={isShowDiscardDialog}
								onCancel={onClickCancelLogout}
								onLogout={onClickChangesDiscard}
						/>
						<SideBar isOpen={isOpenSideBar} onNavigate={onNavigateFromSideBar} selectedRoute={layoutOptions.title}
						         routes={[{RouteName: 'Carts' as RouteName, Text: 'Carts', Icon: 'view_day'}, {RouteName: 'ArchivedCarts' as RouteName, Icon: 'archive', Text: 'Archived Carts'}]}/>
						{children}
				</div>
		);
};

const mapStateToProps = (state: AppState) => {
		const { progress, snackbar, alert, isOpenSideBar } = state.service;
		const { id, name, email, phoneNumber, photoUrl, avatarUrl, draftProfile } = state.profile;
		const { searchQuery } = state.carts;
		const { password, newPassword } = state.auth;
		const { isLoggedIn, accessToken, isEmailConfirmed } = state.storage;

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

				password,
				newPassword,

				searchQuery,

				isLoggedIn,
				accessToken,
				isEmailConfirmed,
				isOpenSideBar,
		};
};

export default connect(mapStateToProps)(MainLayout);
