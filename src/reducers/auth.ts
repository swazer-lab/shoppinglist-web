import { Action, ActionTypes, State } from '../types/auth';

const initialState: State = {
	accessToken: '',
	isLoggedIn: false,

	name: '',
	email: '',
	phone: '',
	password: '',
	isEmailConfirmed: false,

	isLoading: false,
};

export default (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.change_name:
			return {
				...state,
				name: action.name,
			};
		case ActionTypes.change_email:
			return {
				...state,
				email: action.email,
			};
		case  ActionTypes.change_phone:
			return {
				...state,
				phone: action.phone,
			};
		case ActionTypes.change_password:
			return {
				...state,
				password: action.password,
			};

		case ActionTypes.register:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.register_result:
			if (action.hasError) return { ...state, isLoading: false };
			return {
				...state,
				accessToken: action.accessToken,
				isLoggedIn: true,

				isLoading: false,
			};

		case ActionTypes.login:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.login_result:
			if (action.hasError) return { ...state, isLoading: false };
			return {
				...state,
				accessToken: action.accessToken,
				isLoggedIn: true,

				isLoading: false,
			};

		case ActionTypes.confirm_email_result:
			return {
				...state,
				isEmailConfirmed: action.isEmailConfirmed
			}

		default:
			return state;
	}
}
