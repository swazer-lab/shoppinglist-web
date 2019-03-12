import { Action, ActionTypes, State } from '../types/profile';

const initialState: State = {
	id: '',
	name: '',
	email: '',
	phoneNumber: '',

	photoUrl: '',

	draftProfile: {
		id: '',
		name: '',
		phoneNumber: '',
		email: '',

		photoUrl: '',
	},
};

export default (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.fetch_profile_result:
			if (action.hasError) return state;

			return {
				...state,
				...action.profile,

				draftProfile: action.profile,
			};

		case ActionTypes.clear_profile:
			return initialState;

		case ActionTypes.update_profile_photo_result:
			if (action.hasError) return state;
			return {
				...state,
				photoUrl: action.photoUrl,
			};

		default:
			return state;
	}
}
