import { Profile } from '../types/api';

import {
	ActionTypes,
	ChangeDraftProfileNameAction,
	ChangeDraftProfilePhoneNumberAction,
	FetchProfileActionResult,
	ProfileAction,
	ProfileActionResult,
	SetProfileAvatarUrl,
	UpdateProfilePhotoAction,
	UpdateProfilePhotoActionResult,
} from '../types/profile';

export const changeDraftProfileName = (name: string): ChangeDraftProfileNameAction => ({
	type: ActionTypes.change_draft_profile_name,
	name,
});
export const changeDraftProfilePhoneNumber = (phoneNumber: string): ChangeDraftProfilePhoneNumberAction => ({
	type: ActionTypes.change_draft_profile_phone_number,
	phoneNumber,
});

export const fetchProfile = (): ProfileAction => ({
	type: ActionTypes.fetch_profile,
});

export const fetchProfileResult = (hasError: boolean, profile?: Profile): FetchProfileActionResult => ({
	type: ActionTypes.fetch_profile_result,
	hasError,
	profile,
});

export const updateProfile = (): ProfileAction => ({
	type: ActionTypes.update_profile,
});
export const updateProfileResult = (hasError: boolean): ProfileActionResult => ({
	type: ActionTypes.update_profile_result,
	hasError,
});

export const updateProfilePhoto = (photoData: string): UpdateProfilePhotoAction => ({
	type: ActionTypes.update_profile_photo,
	photoData,
});

export const updateProfilePhotoResult = (hasError: boolean, photoUrl?: string): UpdateProfilePhotoActionResult => ({
	type: ActionTypes.update_profile_photo_result,
	hasError,
	photoUrl,
});

export const deleteProfilePhoto = (): ProfileAction => ({
	type: ActionTypes.delete_profile_photo,
});

export const deleteProfilePhotoResult = (hasError: boolean): ProfileActionResult => ({
	type: ActionTypes.delete_profile_photo_result,
	hasError
});


export const setProfileAvatarUrl = (avatarUrl: string): SetProfileAvatarUrl => ({
	type: ActionTypes.set_avatar_url,
	avatarUrl,
});

export const clearProfile = (): ProfileAction => ({
	type: ActionTypes.clear_profile,
});
