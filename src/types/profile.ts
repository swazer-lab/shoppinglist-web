import { Action as ReduxAction } from 'redux';
import { Profile } from './api';

export enum ActionTypes {
	fetch_profile = 'PROFILE__FETCH_PROFILE',
	fetch_profile_result = 'PROFILE__FETCH_PROFILE_RESULT',
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

export type Action =
	& FetchProfileActionResult;

export type State = {
	id?: string,
	name?: string,
	email?: string,
	phone?: string,
	photoUrl?: string,

	draftProfile?: Profile
}
