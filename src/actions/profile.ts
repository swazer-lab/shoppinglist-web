import { Profile } from '../types/api';

import {
	ActionTypes,
	FetchProfileActionResult,
	ProfileAction,
	UpdateProfilePhotoAction,
	UpdateProfilePhotoActionResult,
} from '../types/profile';

export const fetchProfile = (): ProfileAction => ({
	type: ActionTypes.fetch_profile,
});

export const fetchProfileResult = (hasError: boolean, profile?: Profile): FetchProfileActionResult => ({
	type: ActionTypes.fetch_profile_result,
	hasError,
	profile,
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

export const clearProfile = (): ProfileAction => ({
	type: ActionTypes.clear_profile,
});
