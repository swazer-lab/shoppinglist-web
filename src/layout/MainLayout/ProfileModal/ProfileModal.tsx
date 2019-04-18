import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import { Profile } from '../../../types/api';

import { Button, Input, Modal, ProgressBar } from '../../../components';

import './styles.scss';
import language from '../../../assets/language';

interface Props {
	isVisible: boolean,
	isLoading: boolean,
	onCloseProfileModalClick: () => void,

	id?: string,
	name?: string,
	email?: string,
	phoneNumber?: string,
	photoUrl?: string,
	avatarUrl?: string,
	isEmailConfirmed: boolean,

	password: string,
	newPassword: string,

	draftProfile: Profile,
	onDraftProfileNameChange: (name: string) => void,
	onDraftProfilePhoneNumberChange: (phoneNumber: string) => void,

	onUpdateProfileClick: () => void,
	onUpdateProfilePhotoClick: (photoData: string) => void,
	onDeleteProfilePhotoClick: (e: any) => void,
	onResendConfirmEmailConfirmClick: (userId: string) => void,

	onLogoutClick: () => void,

	onChangePassword: (e: any) => void,
	onChangeNewPassword: (e: any) => void,
	onUpdatePasswordClick: () => void,
}

const ProfileModal = (props: Props) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [isChangingPassword, setIsChangingPassword] = useState(false);

	const slider = useRef(null);

	const {
		isVisible,
		isLoading,
		onCloseProfileModalClick,
		id,
		name,
		email,
		isEmailConfirmed,
		photoUrl,
		avatarUrl,
		draftProfile,
		password,
		newPassword,
		onDraftProfileNameChange,
		onDraftProfilePhoneNumberChange,
		onUpdateProfileClick,
		onUpdateProfilePhotoClick,
		onDeleteProfilePhotoClick,
		onResendConfirmEmailConfirmClick,
		onLogoutClick,
		onChangePassword,
		onChangeNewPassword,
		onUpdatePasswordClick,
	} = props;

	useEffect(() => {
		onBackToOverviewClicked();
	}, [isVisible]);

	const onSelectImageClicked = () => {
		const input = document.getElementById('profile_photo_input');
		if (input) {
			input.click();
		}
	};

	const handleImageChange = (e: any) => {
		const imageFile = e.currentTarget.files[0];
		if (imageFile) {
			const fileReader = new FileReader();
			fileReader.onload = (e: any) => {
				onUpdateProfilePhotoClick(e.target.result.slice(22));
			};

			fileReader.readAsDataURL(imageFile);
		}
	};

	const onUpdatePasswordClicked = () => {
		// @ts-ignore
		slider.current.slickGoTo(1, false);

		setIsUpdating(true);
		setIsChangingPassword( false);
		onUpdatePasswordClick();
	};

	const onUpdateProfileClicked = () => {
		// @ts-ignore
		slider.current.slickGoTo(0, false);
		setIsUpdating(false);
		setIsChangingPassword( false);

		onUpdateProfileClick();
	};

	const onResendConfirmEmailConfirmClicked = () => {
		onResendConfirmEmailConfirmClick(id || '');
	};

	const onGoToChangePasswordClicked = () => {
		setIsChangingPassword(true);
		setIsUpdating(false);
		// @ts-ignore
		slider.current.slickGoTo(2, false);
	};

	const onGoToUpdateProfileClicked = () => {
		setIsUpdating(true);
		setIsChangingPassword(false);

		// @ts-ignore
		slider.current.slickGoTo(1, false);
	};
	const onBackToOverviewClicked = () => {
		setIsUpdating(false);
		setIsChangingPassword(false);

		// @ts-ignore
		slider.current.slickGoTo(0, false);
	};

	const onDeleteProfilePhotoClicked = (e: any) => onDeleteProfilePhotoClick(e);

	const handleDraftProfileNameChange = (e: FormEvent<HTMLFormElement>) => onDraftProfileNameChange(e.currentTarget.value);
	const handleDraftProfilePhoneNumberChange = (e: FormEvent<HTMLFormElement>) => onDraftProfilePhoneNumberChange(e.currentTarget.value);

	const handlePasswordChange = (e: FormEvent<HTMLFormElement>) => onChangePassword(e.currentTarget.value);
	const handleNewPasswordChange = (e: FormEvent<HTMLFormElement>) => onChangeNewPassword(e.currentTarget.value);

	const overviewContent = (
		<div>
			<div className='profile_modal'>
				<div className='profile_modal__photo'
				     style={{ backgroundImage: `url(${photoUrl ? photoUrl : avatarUrl})` }}
				     onClick={onSelectImageClicked}>
					<i className='material-icons'>camera_alt</i>
					<div className='profile_modal__photo__remove_button' onClick={onDeleteProfilePhotoClicked}>
						<i className='material-icons'>cancel</i>
					</div>
				</div>

				<input id='profile_photo_input' type='file' name='pic' accept='image/*' onChange={handleImageChange} />
				<h3 className='profile_modal__name'>{name}</h3>

				<div className='profile_modal__email'>{email}</div>
				<span className='profile_modal__verify_label'>{isEmailConfirmed ? 'Verified!' : 'Not verified!'}</span>

				<div className='profile_modal__resend_confirm_email'>
					{
						!isEmailConfirmed ?
							<Button mode='normal' title='Resend Confirm Email'
							        onClick={onResendConfirmEmailConfirmClicked} /> : ''
					}
				</div>

				<div className='profile_modal__actions_container'>
					<Button mode='text' accentColor='text' title='Logout' onClick={onLogoutClick} />
				</div>
			</div>
		</div>
	);

	const updateContent = (
		<div>
			<div className='update_profile_modal'>
				<Input
					value={draftProfile.name}
					onChange={handleDraftProfileNameChange}
					placeholder={language.textEnterName}
					required
				/>
				<Input
					value={draftProfile.phoneNumber}
					onChange={handleDraftProfilePhoneNumberChange}
					placeholder={language.textEnterPhoneNumber}
				/>

				<div className='update_profile_modal__actions_container'>
					<Button title='Update' onClick={onUpdateProfileClicked} />
				</div>
			</div>
		</div>
	);

	const changePasswordContent = (
		<div>
			<div className='update_profile_modal'>
				<Input
					value={password}
					onChange={handlePasswordChange}
					placeholder={language.textEnterPassword}
					type='password'
					autocomplete='new-password'
					required
				/>
				<Input
					value={newPassword}
					onChange={handleNewPasswordChange}
					placeholder={language.textEnterNewPassword}
					type='password'
					autocomplete='new-password'
					required
				/>

				<div className='update_profile_modal__actions_container'>
					<Button title='Change Password' onClick={onUpdatePasswordClicked} />
				</div>
			</div>
		</div>
	);

	const getRightButtons = () => {
		if (isUpdating) {
			return [{ iconName: 'lock', onClick: onGoToChangePasswordClicked }];
		}
		if (isChangingPassword) {
			return;
		}
		return [{ iconName: 'edit', onClick: onGoToUpdateProfileClicked }];
	};

	const getLeftButtons = () => {
		if (isUpdating) {
			return [{ iconName: 'arrow_back', onClick: onBackToOverviewClicked }];
		}
		if (isChangingPassword) {
			return [{ iconName: 'arrow_back', onClick: onGoToUpdateProfileClicked }];
		}
		return [{ iconName: 'close', onClick: onCloseProfileModalClick }];
	};

	const getTitle = () => {
		if (isUpdating) {
			return 'Update Profile';
		}
		if (isChangingPassword) {
			return 'Change Password';
		}
		return 'Profile';
	};

	return (
		<Modal isVisible={isVisible} onCloseModalClick={onCloseProfileModalClick}
		       title={getTitle()} rightButtons={getRightButtons()}
		       leftButtons={getLeftButtons()}>
			<ProgressBar isLoading={isLoading} />
			<Slider ref={slider} swipe={false} arrows={false} speed={300}>
				{overviewContent}
				{updateContent}
				{changePasswordContent}
			</Slider>
		</Modal>
	);
};

export default ProfileModal;
