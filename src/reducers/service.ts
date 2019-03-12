import { Action, ActionTypes, State } from '../types/service';

const initialState: State = {
	progress: {
		visible: false,
		message: '',
	},
	alert: {
		visible: false,
		type: 'info',
		title: '',
		message: '',
		duration: 3000,
	},
};

export default (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.show_progress:
			return {
				...state,
				progress: {
					visible: true,
					message: action.message,
				},
			};
		case ActionTypes.hide_progress:
			return {
				...state,
				progress: initialState.progress,
			};

		case ActionTypes.show_alert:
			return {
				...state,
				alert: {
					visible: true,
					type: action.alertType,
					title: action.title,
					message: action.message,
					duration: action.duration,
				},
			};
		case ActionTypes.clear_alert:
			return {
				...state,
				alert: initialState.alert,
			};

		default:
			return state;
	}
}