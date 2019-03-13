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

		case ActionTypes.toggle_contact:
			const _selected_contacts_list = [...state.selectedContacts];

			if (_selected_contacts_list.filter(item => item.id === action.contact.id).length > 0) {
				const removedContactItemIndex = _selected_contacts_list.findIndex(item => item.id === action.contact.id);
				_selected_contacts_list.splice(removedContactItemIndex, 1);
			} else
				_selected_contacts_list.push(action.contact);

			return {
				...state,
				selectedContacts: [..._selected_contacts_list],
			};

		case ActionTypes.clear_selected_contacts: {
			return {
				...state,
				selectedContacts: [],
			};
		}

		default:
			return state;
	}
}