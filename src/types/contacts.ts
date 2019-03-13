import { Action as ReduxAction } from 'redux';
import { Profile, CartUser } from './api';

export enum ActionTypes{
	fetch_contacts = 'CONTACTS__FETCH_CONTACTS',
	fetch_contacts_result = 'CONTACTS__FETCH_CONTACTS_RESULT',

	toggle_contact = 'CONTACTS__TOGGLE_CONTACT',
    share_cart_with_contacts = 'CONTACTS__SHARE_CART_WITH_CONTACTS',
	share_cart_with_contacts_result = 'CONTACTS__SHARE_CART_WITH_CONTACTS_RESULT',

	clear_selected_contacts = 'CONTACTS__CLEAR_SELECTED_CONTACTS'
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

export interface ToggleContactAction extends ContactsAction {
	type: ActionTypes.toggle_contact,
	contact: Profile
}

export interface FetchContactsActionResult extends ContactsActionResult {
	type: ActionTypes.fetch_contacts_result,
	contacts?: Array<Profile>,
	totalCount?: number,
	append?: 'replace' | 'merge',
}

export type Action =
	& FetchContactsAction
	& FetchContactsActionResult
	& ToggleContactAction;

export type State = {
	contacts: Array<Profile>,

	isLoading: boolean,
	pageNumber: number,
	totalCount: number,
	searchQuery: string,

	filteredContacts: Array<Profile>,
	selectedContacts: Array<Profile>,
}