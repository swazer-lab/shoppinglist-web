import { Action, ActionTypes, State } from '../types/auth';

const initialState: State = {
	name: '',
	email: '',
	phone: '',
	password: '',

	isResettingPassword: false,
	resetPasswordCode: '',
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

		case ActionTypes.send_forgot_password_email_result:
			if (action.hasError) return state;
			return {
				...state,
				isResettingPassword: true,
			};

		case ActionTypes.change_reset_password_code:
			return {
				...state,
				resetPasswordCode: action.code,
			};

		case ActionTypes.logout:
			return { ...initialState };

		default:
			return state;
	}
}
