import { Action, ActionTypes, State } from '../types/contacts';

const initialState: State = {
	contacts: [],

	isLoading: false,
	pageNumber: 0,
	totalCount: 0,

	searchQuery: '',
	filteredContacts: [],

	selectedContacts: [],
};

export default (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.fetch_contacts:
			return {
				...state,
				isLoading: true,
				pageNumber: action.pageNumber || 1,
			};
		case ActionTypes.fetch_contacts_result:
			if (action.hasError || !action.contacts) return { ...state, isLoading: false };
			if (action.append === 'merge') {
				return {
					...state,
					contacts: [...state.contacts, ...action.contacts],

					isLoading: false,
					totalCount: action.totalCount || 0,
				};
			} else {
				return {
					...state,
					contacts: [...action.contacts],

					isLoading: false,
					totalCount: action.totalCount || 0,
				};
			}


		default:
			return state;
	}
}