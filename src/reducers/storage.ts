import { Action, ActionTypes, AvailableLanguages, State } from '../types/storage';

const initialState: State = {
	isLoggedIn: false,
	accessToken: '',
	isEmailConfirmed: false,
	activeLanguage: AvailableLanguages.en,
	userName: ''
};

export default (state: State = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.change_is_logged_in:
			return { ...state, isLoggedIn: action.isLoggedIn };
		case ActionTypes.change_access_token:
			return { ...state, accessToken: action.accessToken };
		case ActionTypes.change_is_email_confirmed:
			return { ...state, isEmailConfirmed: action.isEmailConfirmed };
		case ActionTypes.change_active_language:
			return { ...state, activeLanguage: action.activeLanguage };
		case ActionTypes.set_user_name:
			return { ...state, userName: action.userName };

		default:
			return state;
	}
};