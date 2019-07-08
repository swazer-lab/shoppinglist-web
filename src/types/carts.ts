import { Action as ReduxAction } from 'redux';
import { Cart, CartItemStatusType, CartUser } from './api';

export enum ActionTypes {
	change_draft_cart_title = 'CARTS__CHANGE_DRAFT_CART_TITLE',
	change_draft_cart_notes = 'CARTS__CHANGE_DRAFT_CART_NOTES',
	change_draft_cart_reminder_date = 'CARTS__CHANGE_DRAFT_CART_DATE',

	add_draft_cart_item = 'CARTS__ADD_DRAFT_CART_ITEM',
	change_draft_cart_item_title = 'CARTS__CHANGE_DRAFT_CART_ITEM_TITLE',
	change_draft_cart_item_status = 'CARTS__CHANGE_DRAFT_CART_ITEM_STATUS',
	remove_draft_cart_item = 'CARTS__REMOVE_DRAFT_CART_ITEM',

	pull_cart = 'CARTS__PULL_CART',
	push_cart = 'CARTS__PUSH_CART',

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

	copy_cart = 'CARTS__COPY_CART',
	copy_cart_result = 'CARTS__COPY_CART_RESULT',

	get_access_to_cart = 'CARTS__GET_ACCESS_TO_CART',
	get_access_to_cart_result = 'CARTS__GET_ACCESS_TO_CART_RESULT',

	share_cart_with_contacts = 'CARTS_SHARE_CART_WITH_CONTACTS',
	share_cart_with_contacts_result = 'CARTS_SHARE_CART_WITH_CONTACTS_RESULT',

	reorder_cart = 'CARTS_REORDER_CART',
	reorder_cart_result = 'CARTS_REORDER_CART_RESULT',

	change_visibility_filter = 'CHANGE_VISIBILITY_FILTER',

	clear_carts = 'CARTS__CLEAR_CARTS',

	set_cart_updating = 'CARTS__SET_CART_UPDATING',
  set_cart_copying = 'CARTS__SET_CART_COPYING',
	set_cart_status_changing = 'CARTS__SET_STATUS_CHANGING',

	set_destination_carts = 'CARTS__SET_DESTINATION_CARTS',
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

export interface PullCartAction extends CartsAction {
	type: ActionTypes.pull_cart,
	index: number,
}

export interface PushCartAction extends CartsAction {
	type: ActionTypes.push_cart,
	index: number,
	cart: Cart
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

export interface CopyCartAction extends CartsAction {
	type: ActionTypes.copy_cart,
	hasToShare: boolean,
	oldTitle?: string
}

export interface CopyCartActionResult extends CartsActionResult {
	type: ActionTypes.copy_cart_result,
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

export interface GetAccessToCartAction extends CartsAction {
	type: ActionTypes.get_access_to_cart,
	accessCode: string,
}

export interface ChangeVisibilityFilter extends CartsAction {
	type: ActionTypes.change_visibility_filter,
	visibilityFilter: VisibilityFilter,
}

export interface GetAccessToCartActionResult extends CartsActionResult {
	type: ActionTypes.get_access_to_cart_result,
	cart?: Cart,
}

export interface ReorderCartAction extends CartsAction {
	type: ActionTypes.reorder_cart,
	cartId: string,
	source: number,
	destination: number
}

export interface ReorderCartResultAction extends CartsActionResult {
	type: ActionTypes.reorder_cart_result,
	source?: number,
	destination?: number
}

export interface SetCartUpdatingAction extends CartsAction {
	type: ActionTypes.set_cart_updating,
	isCartUpdating: boolean
}

export interface SetCartCopyingAction extends CartsAction {
	type: ActionTypes.set_cart_copying,
	isCartCopying: boolean
}

export interface SetDestinationCartAction extends CartsAction {
		type: ActionTypes.set_destination_carts,
		cart: Cart,
		isDestinationCart: boolean
}

export interface SetCartStatusChangingAction extends CartsAction {
		type: ActionTypes.set_cart_status_changing,
		isCartStatusChanging: boolean
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
	& CopyCartActionResult
	& RemoveCartAction
	& RemoveCartActionResult
	& PullCartAction
	& PushCartAction
	& UpdateCartResultAction
	& SetDraftCartAction
	& ShareCartWithContactsAction
	& ShareCartWithContactsActionResult
	& GetAccessToCartAction
	& GetAccessToCartActionResult
	& ReorderCartAction
	& ReorderCartResultAction
	& ChangeVisibilityFilter
	& CopyCartAction
	& SetCartUpdatingAction
	& SetCartCopyingAction
	& SetCartStatusChangingAction
	& SetDestinationCartAction;

export type State = {
	draftCart: Cart,
	carts:  Array<Cart>,
	destinationCarts: Array<Cart>,

	filteredCarts?: Array<Cart>,
	searchQuery?: string,

	visibilityFilter: VisibilityFilter,
	isCartUpdating: boolean,
	isCartCopying: boolean,
	isCartStatusChanging: boolean,

	isLoading: boolean,
	pageNumber: number,
	totalCount: number,
}

export enum VisibilityFilter {
	all = 'All',
	completed = 'Completed',
	active = 'Active'
}
