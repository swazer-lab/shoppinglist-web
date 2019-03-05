import { Action, ActionTypes, State } from '../types/auth';

const initialState: State = {
	name: '',
	email: '',
	phone: '',
	password: '',

	isResettingPassword: false,
	resetPasswordCode: '',

	errorMessage: '',
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

		case ActionTypes.change_reset_password_code:
			return {
				...state,
				resetPasswordCode: action.code,
			};

		case ActionTypes.register:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.register_result:
			if (action.hasError) return { ...state, isLoading: false, errorMessage: action.errorMessage };
			return {
				...state,
				isLoading: false,
				errorMessage: '',
			};

		case ActionTypes.login:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.login_result:
			if (action.hasError) return { ...state, isLoading: false, errorMessage: action.errorMessage };
			return {
				...state,
				isLoading: false,
				errorMessage: '',
			};

		case ActionTypes.confirm_email:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.confirm_email_result:
			if (action.hasError) return { ...state, isLoading: false, errorMessage: action.errorMessage };
			return {
				...state,
				isLoading: false,
				errorMessage: '',
			};

		case ActionTypes.send_forgot_password_email:
			return {
				...state,
				isLoading: true,
			};
		case ActionTypes.send_forgot_password_email_result:
			if (action.hasError)
				return { ...state, isLoading: false, errorMessage: action.errorMessage };
			return {
				...state,
				isLoading: false,
				errorMessage: '',

				isResettingPassword: true,
			};

		case ActionTypes.reset_password:
			return {
				...state,
				isLoading: true,
			};

		case ActionTypes.reset_password_result:
			if (action.hasError) return { ...state, isLoading: false, errorMessage: action.errorMessage };
			return {
				...state,
				isLoading: false,
				errorMessage: '',
			};

		default:
			return state;
	}
}
