import {
	ActionTypes,
	FetchContactsAction,
	FetchContactsActionResult
} from '../types/contacts';

import { Profile } from '../types/api';

export const fetchContacts = (silent?: boolean, append?: 'merge' | 'replace', pageNumber?: number): FetchContactsAction => ({
	type: ActionTypes.fetch_contacts,
	silent,
	append,
	pageNumber,
});

export const fetchContactsResult = (hasError: boolean, contacts?: Array<Profile>, totalCount?: number, append?: 'replace' | 'merge'): FetchContactsActionResult => ({
	type: ActionTypes.fetch_contacts_result,
	hasError,
	contacts,
	totalCount,
	append,
});