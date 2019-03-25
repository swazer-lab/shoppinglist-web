import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';

import { Profile } from '../../../types/api';

import { Button, Input, Modal, ProgressBar } from '../../../components';
import { useLocalStorage } from '../../../config/utilities';

import './styles.scss';
import language from '../../../assets/language';

interface Props {
	isVisible: boolean,
	isLoading: boolean,
	onCloseProfileModalClick: () => void,

	name?: string,
	email?: string,
	phoneNumber?: string,
	photoUrl?: string,
	avatarUrl?: string,

	draftProfile: Profile,
	onDraftProfileNameChange: (name: string) => void,
	onDraftProfilePhoneNumberChange: (phoneNumber: string) => void,

	onUpdateProfileClick: () => void,
	onUpdateProfilePhotoClick: (photoData: string) => void,
	onLogoutClick: () => void,
}

const ProfileModal = (props: Props) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const slider = useRef(null);
	const { isEmailConfirmed } = useLocalStorage();

	const {
		isVisible,
		isLoading,
		onCloseProfileModalClick,
		name,
		email,
		photoUrl,
		avatarUrl,
		draftProfile,
		onDraftProfileNameChange,
		onDraftProfilePhoneNumberChange,
		onUpdateProfileClick,
		onUpdateProfilePhotoClick,
		onLogoutClick,
	} = props;

	useEffect(() => {
		if (isUpdating && !isLoading) {
			onBackToOverviewClicked();
		}
	}, [isLoading]);

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

	const onGoToUpdateProfileClicked = () => {
		setIsUpdating(true);

		// @ts-ignore
		slider.current.slickGoTo(1, false);
	};
	const onBackToOverviewClicked = () => {
		setIsUpdating(false);

		// @ts-ignore
		slider.current.slickGoTo(0, false);
	};

	const handleDraftProfileNameChange = (e: FormEvent<HTMLFormElement>) => onDraftProfileNameChange(e.currentTarget.value);
	const handleDraftProfilePhoneNumberChange = (e: FormEvent<HTMLFormElement>) => onDraftProfilePhoneNumberChange(e.currentTarget.value);

	const overviewContent = (
		<div>
			<div className='profile_modal'>
				<div className='profile_modal__photo'
				     style={{ backgroundImage: `url(${photoUrl ? photoUrl : avatarUrl})` }}
				     onClick={onSelectImageClicked}>

					<i className='material-icons'>camera_alt</i>
				</div>
				<input id='profile_photo_input' type='file' name='pic' accept='image/*' onChange={handleImageChange}/>
				<h3 className='profile_modal__name'>{name}</h3>

				<div className='profile_modal__email'>{email}</div>
				<span className='profile_modal__verify_label'>{isEmailConfirmed ? 'Verified!' : 'Not verified!'}</span>

				<div className='profile_modal__actions_container'>
					<Button mode='text' accentColor='text' title='Logout' onClick={onLogoutClick}/>
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
					<Button title='Update' onClick={onUpdateProfileClick}/>
				</div>
			</div>
		</div>
	);

	const buttons = isUpdating ? [{ iconName: 'arrow_forward', onClick: onBackToOverviewClicked }] : [
		{ iconName: 'edit', onClick: onGoToUpdateProfileClicked },
		{ iconName: 'close', onClick: onCloseProfileModalClick },
	];

	return (
		<Modal isVisible={isVisible} onCloseModalClick={onCloseProfileModalClick} title='Profile' buttons={buttons}>
			<ProgressBar isLoading={isLoading}/>
			<Slider ref={slider} swipe={false} arrows={false} speed={300}>
				{overviewContent}
				{updateContent}
			</Slider>
		</Modal>
	);
};

export default ProfileModal;
