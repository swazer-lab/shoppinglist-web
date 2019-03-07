import { Action, ActionTypes, State } from '../types/profile';

const initialState: State = {
	id: '',
	name: '',
	email: '',
	phone: '',

	photoUrl: '',

	draftProfile: {
		id:'',
		name: '',
		phone: '',
		email: '',

		photoUrl: ''
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

		default:
			return state;
	}
}