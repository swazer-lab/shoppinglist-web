import { Action as ReduxAction } from 'redux';
import { Cart, CartItemStatusType, CartUser } from './api';
import { ContactsAction, ContactsActionResult } from './contacts';

export enum ActionTypes {
	change_draft_cart_title = 'CARTS__CHANGE_DRAFT_CART_TITLE',
	change_draft_cart_notes = 'CARTS__CHANGE_DRAFT_CART_NOTES',
	change_draft_cart_reminder_date = 'CARTS__CHANGE_DRAFT_CART_DATE',

	add_draft_cart_item = 'CARTS__ADD_DRAFT_CART_ITEM',
	change_draft_cart_item_title = 'CARTS__CHANGE_DRAFT_CART_ITEM_TITLE',
	change_draft_cart_item_status = 'CARTS__CHANGE_DRAFT_CART_ITEM_STATUS',
	remove_draft_cart_item = 'CARTS__REMOVE_DRAFT_CART_ITEM',

	set_draft_cart = 'CARTS__SET_DRAFT_CART',
	clear_draft_cart = 'CARTS__CLEAR_DRAFT_CART',

	change_search_query = 'CARTS__CHANGE_SEARCH_QUERY',

	filter_carts = 'CARTS__FILTER_CARTS',
	filter_carts_result = 'CARTS__FILTER_CARTS_RESULT',

	fetch_carts = 'CARTS__FETCH_CARTS',
	fetch_carts_result = 'CARTS__FETCH_CARTS_RESULT',

	create_cart = 'CARTS__CREATE_CART',
	create_cart_result = 'CARTS__CREATE_CART_RESULT',

	update_cart = 'CARTS__UPDATE_CART',
	update_cart_result = 'CARTS__UPDATE_CART_RESULT',

	remove_cart = 'CARTS__REMOVE_CART',
	remove_cart_result = 'CARTS__REMOVE_CART_RESULT',

	// UNCHECKED
	share_share_link = 'CARTS__SHARE_SHARE_LINK',
	copy_share_link = 'CARTS__COPY_SHARE_LINK',

	get_access_to_cart = 'CARTS__GET_ACCESS_TO_CART',
	get_access_to_cart_result = 'CARTS__GET_ACCESS_TO_CART_RESULT',

	share_cart_with_contacts = 'CARTS_SHARE_CART_WITH_CONTACTS',
	share_cart_with_contacts_result = 'CARTS_SHARE_CART_WITH_CONTACTS_RESULT',

	set_cart_reminder = 'CARTS_SET_CART_REMINDER',

	cancel_update_cart = 'CARTS__CANCEL_UPDATE_CART',
	clear_carts = 'CARTS__CLEAR_CARTS',
}

export interface CartsAction extends ReduxAction<ActionTypes> {
}

export interface CartsActionResult extends CartsAction {
	hasError: boolean,
}

export interface ChangeDraftCartTitleAction extends CartsAction {
	type: ActionTypes.change_draft_cart_title,
	title: string,
}

export interface ChangeDraftCartNotesAction extends CartsAction {
	type: ActionTypes.change_draft_cart_notes,
	notes: string,
}

export interface ChangeDraftCartReminderDateAction extends CartsAction {
	type: ActionTypes.change_draft_cart_reminder_date,
	reminderDate: string,
}

export interface ChangeDraftCartItemTitleAction extends CartsAction {
	type: ActionTypes.change_draft_cart_item_title,
	uuid: string,
	title: string,
}

export interface ChangeDraftCartItemStatusAction extends CartsAction {
	type: ActionTypes.change_draft_cart_item_status,
	uuid: string,
	status: CartItemStatusType,
}

export interface RemoveDraftCartItemAction extends CartsAction {
	type: ActionTypes.remove_draft_cart_item,
	uuid: string,
}

export interface SetDraftCartAction extends CartsAction {
	type: ActionTypes.set_draft_cart,
	cart: Cart,
}

export interface ChangeSearchQueryAction extends CartsAction {
	type: ActionTypes.change_search_query,
	searchQuery: string
}

export interface FilterCartsActionResult extends CartsActionResult {
	type: ActionTypes.filter_carts_result,
	carts?: Array<Cart>
}

export interface UpdateCartResultAction extends CartsActionResult {
	type: ActionTypes.update_cart_result,
	cart?: Cart,
}

export interface FetchCartsAction extends CartsAction {
	type: ActionTypes.fetch_carts,
	silent?: boolean,
	append?: 'replace' | 'merge',
	pageNumber?: number
}

export interface FetchCartsActionResult extends CartsActionResult {
	type: ActionTypes.fetch_carts_result,
	carts?: Array<Cart>,
	totalCount?: number,
	append?: 'replace' | 'merge',
}

export interface CreateCartActionResult extends CartsActionResult {
	type: ActionTypes.create_cart_result,
	cart?: Cart,
}

export interface RemoveCartAction extends CartsAction {
	type: ActionTypes.remove_cart,
	cart: Cart,
}

export interface RemoveCartActionResult extends CartsActionResult {
	type: ActionTypes.remove_cart_result,
	cart?: Cart,
}


export interface ShareCartWithContactsAction extends CartsAction {
	type: ActionTypes.share_cart_with_contacts,
	cartId: string
}

export interface ShareCartWithContactsActionResult extends CartsActionResult {
	type: ActionTypes.share_cart_with_contacts_result,
	cartId?: string,
	cartUsers?: Array<CartUser>
}

export type Action =
	& CartsAction
	& CartsActionResult
	& ChangeDraftCartTitleAction
	& ChangeDraftCartNotesAction
	& ChangeDraftCartReminderDateAction
	& ChangeDraftCartItemTitleAction
	& ChangeDraftCartItemStatusAction
	& RemoveDraftCartItemAction
	& ChangeSearchQueryAction
	& FilterCartsActionResult
	& FetchCartsAction
	& FetchCartsActionResult
	& CreateCartActionResult
	& RemoveCartAction
	& RemoveCartActionResult
	& UpdateCartResultAction
	& SetDraftCartAction
	& ShareCartWithContactsAction
	& ShareCartWithContactsActionResult;

export type State = {
	draftCart: Cart,
	carts: Array<Cart>,

	filteredCarts?: Array<Cart>,
	searchQuery?: string,

	isLoading: boolean,
	pageNumber: number,
	totalCount: number,
}
