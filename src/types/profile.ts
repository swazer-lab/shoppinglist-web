import { Action as ReduxAction } from 'redux';
import { Profile } from './api';

export enum ActionTypes {
	fetch_profile = 'PROFILE__FETCH_PROFILE',
	fetch_profile_result = 'PROFILE__FETCH_PROFILE_RESULT',

	update_profile_photo = 'PROFILE__UPDATE_PROFILE_PHOTO',
	update_profile_photo_result = 'PROFILE__UPDATE_PROFILE_PHOTO_RESULT',

	clear_profile = 'PROFILE__CLEAR_PROFILE',
}

export interface ProfileAction extends ReduxAction<ActionTypes> {
}

export interface ProfileActionResult extends ProfileAction {
	hasError: boolean,
}

export interface FetchProfileActionResult extends ProfileActionResult {
	type: ActionTypes.fetch_profile_result,
	profile?: Profile
}

export interface UpdateProfilePhotoAction extends ProfileAction {
	type: ActionTypes.update_profile_photo,
	photoData: string,
}

export interface UpdateProfilePhotoActionResult extends ProfileActionResult {
	type: ActionTypes.update_profile_photo_result,
	photoUrl?: string
}

export type Action =
	& ProfileAction
	& ProfileActionResult
	& FetchProfileActionResult
	& UpdateProfilePhotoAction
	& UpdateProfilePhotoActionResult;

export type State = {
	id?: string,
	name?: string,
	email?: string,
	phoneNumber?: string,
	photoUrl?: string,

	draftProfile?: Profile
}
