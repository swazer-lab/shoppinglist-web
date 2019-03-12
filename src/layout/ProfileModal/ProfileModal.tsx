import React from 'react';

import { Modal, Button, ProgressBar } from '../../components';
import { useLocalStorage } from '../../config/utilities';

import './styles.scss';

interface Props {
	isVisible: boolean,
	isLoading: boolean,
	onCloseProfileModalClick: () => void,

	name?: string,
	email?: string,
	phoneNumber?: string,
	photoUrl?: string,

	onLogoutClick: () => void,
	onUpdateProfilePhotoClick: (photoData: string) => void,
}

const ProfileModal = (props: Props) => {
	const { isVisible, isLoading, onCloseProfileModalClick, name, email, photoUrl, onLogoutClick, onUpdateProfilePhotoClick } = props;
	const { isEmailConfirmed } = useLocalStorage();

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

	return (
		<Modal isVisible={isVisible} onCloseModalClick={onCloseProfileModalClick} title='Profile'>
			<ProgressBar isLoading={isLoading} />
			<div className='profile_modal'>
				<div
					className='profile_modal__photo'
					style={{ backgroundImage: `url(${photoUrl})` }}
					onClick={onSelectImageClicked}>

					<i className='material-icons'>camera_alt</i>
				</div>
				<input id='profile_photo_input' type='file' name='pic' accept='image/*' onChange={handleImageChange} />
				<h3 className='profile_modal__name'>{name}</h3>

				<div className='profile_modal__email'>{email}</div>
				<span className='profile_modal__verify_label'>{isEmailConfirmed ? 'Verified!' : 'Not verified!'}</span>

				<div className='profile_modal__actions_container'>
					<Button mode='text' accentColor='text' title='Logout' onClick={onLogoutClick} />
				</div>
			</div>
		</Modal>
	);
};

export default ProfileModal;
