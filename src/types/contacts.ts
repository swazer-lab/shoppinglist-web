import { Action as ReduxAction } from 'redux';
import { Profile } from './api';

export enum ActionTypes{
	fetch_contacts = 'CONTACTS__FETCH_CONTACTS',
	fetch_contacts_result = 'CONTACTS__FETCH_CONTACTS_RESULT',
}

export interface ContactsAction extends ReduxAction<ActionTypes> {
}

export interface ContactsActionResult extends ContactsAction {
	hasError: boolean,
}

export interface FetchContactsAction extends ContactsAction {
	type: ActionTypes.fetch_contacts,
	silent?: boolean,
	append?: 'replace' | 'merge',
	pageNumber?: number,
}

export interface FetchContactsActionResult extends ContactsActionResult {
	type: ActionTypes.fetch_contacts_result,
	contacts?: Array<Profile>,
	totalCount?: number,
	append?: 'replace' | 'merge',
}

export type Action =
	& FetchContactsAction
	& FetchContactsActionResult;

export type State = {
	contacts: Array<Profile>,

	isLoading: boolean,
	pageNumber: number,
	totalCount: number,
	searchQuery: string,

	filteredContacts: Array<Profile>,
	selectedContacts: Array<Profile>,
}