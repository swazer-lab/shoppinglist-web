import { Profile } from '../types/api';

import {
	ActionTypes,
	ProfileAction,
	FetchProfileActionResult,
} from '../types/profile';

export const fetchProfile = () : ProfileAction => ({
	type: ActionTypes.fetch_profile
});

export const fetchProfileResult = (hasError: boolean, profile?: Profile): FetchProfileActionResult => ({
	type: ActionTypes.fetch_profile_result,
	hasError,
	profile
});