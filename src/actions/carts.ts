import {
	ActionTypes,
	CartsAction,
	ChangeDraftCartItemStatusAction,
	ChangeDraftCartItemTitleAction,
	ChangeDraftCartNotesAction,
	ChangeDraftCartReminderDateAction,
	ChangeDraftCartTitleAction,
	ChangeSearchQueryAction,
	CreateCartActionResult,
	FetchCartsAction,
	FetchCartsActionResult,
	FilterCartsActionResult,
	GetAccessToCartAction,
	GetAccessToCartActionResult,
	PullCartAction,
	PushCartAction,
	RemoveCartAction,
	RemoveCartActionResult,
	RemoveDraftCartItemAction,
	ReorderCartAction,
	ReorderCartResultAction,
	SetDraftCartAction,
	ShareCartWithContactsAction,
	ShareCartWithContactsActionResult,
	UpdateCartResultAction,
} from '../types/carts';
import { Cart, CartItemStatusType, CartUser } from '../types/api';

export const changeDraftCartTitle = (title: string): ChangeDraftCartTitleAction => ({
	type: ActionTypes.change_draft_cart_title,
	title,
});
export const changeDraftCartNotes = (notes: string): ChangeDraftCartNotesAction => ({
	type: ActionTypes.change_draft_cart_notes,
	notes,
});
export const changeDraftCartReminderDate = (reminderDate: string): ChangeDraftCartReminderDateAction => ({
	type: ActionTypes.change_draft_cart_reminder_date,
	reminderDate,
});

export const addDraftCartItem = (): CartsAction => ({
	type: ActionTypes.add_draft_cart_item,
});
export const changeDraftCartItemTitle = (uuid: string, title: string): ChangeDraftCartItemTitleAction => ({
	type: ActionTypes.change_draft_cart_item_title,
	uuid,
	title,
});
export const changeDraftCartItemStatus = (uuid: string, status: CartItemStatusType): ChangeDraftCartItemStatusAction => ({
	type: ActionTypes.change_draft_cart_item_status,
	uuid,
	status,
});
export const removeDraftCartItem = (uuid: string): RemoveDraftCartItemAction => ({
	type: ActionTypes.remove_draft_cart_item,
	uuid,
});

export const pullCart = (index: number): PullCartAction => ({
	type: ActionTypes.pull_cart,
	index,
});
export const pushCart = (index: number, cart: Cart): PushCartAction => ({
	type: ActionTypes.push_cart,
	index,
	cart,
});

export const setDraftCart = (cart: Cart): SetDraftCartAction => ({
	type: ActionTypes.set_draft_cart,
	cart,
});

export const updateCart = (): CartsAction => ({
	type: ActionTypes.update_cart,
});

export const updateCartResult = (hasError: boolean, cart?: Cart): UpdateCartResultAction => ({
	type: ActionTypes.update_cart_result,
	hasError,
	cart,
});

export const clearDraftCart = (): CartsAction => ({
	type: ActionTypes.clear_draft_cart,
});

export const changeSearchQuery = (searchQuery: string): ChangeSearchQueryAction => ({
	type: ActionTypes.change_search_query,
	searchQuery,
});

export const filterCarts = (): CartsAction => ({
	type: ActionTypes.filter_carts,
});

export const filterCartsResult = (hasError: boolean, carts?: Array<Cart>): FilterCartsActionResult => ({
	type: ActionTypes.filter_carts_result,
	hasError,
	carts,
});

export const fetchCarts = (silent?: boolean, append?: 'merge' | 'replace', pageNumber?: number): FetchCartsAction => ({
	type: ActionTypes.fetch_carts,
	silent,
	append,
	pageNumber,
});
export const fetchCartsResult = (hasError: boolean, carts?: Array<Cart>, totalCount?: number, append?: 'replace' | 'merge'): FetchCartsActionResult => ({
	type: ActionTypes.fetch_carts_result,
	hasError,
	carts,
	totalCount,
	append,
});

export const createCart = (): CartsAction => ({
	type: ActionTypes.create_cart,
});
export const createCartResult = (hasError: boolean, cart?: Cart): CreateCartActionResult => ({
	type: ActionTypes.create_cart_result,
	hasError,
	cart,
});

export const removeCart = (cart: Cart): RemoveCartAction => ({
	type: ActionTypes.remove_cart,
	cart,
});
export const removeCartResult = (hasError: boolean, cart?: Cart): RemoveCartActionResult => ({
	type: ActionTypes.remove_cart_result,
	hasError,
	cart,
});

export const clearCarts = (): CartsAction => ({
	type: ActionTypes.clear_carts,
});

export const shareCartWithContacts = (cartId: string): ShareCartWithContactsAction => ({
	type: ActionTypes.share_cart_with_contacts,
	cartId,
});
export const shareCartWithContactsResult = (hasError: boolean, cartId?: string, cartUsers?: Array<CartUser>): ShareCartWithContactsActionResult => ({
	type: ActionTypes.share_cart_with_contacts_result,
	hasError,
	cartId,
	cartUsers,
});

export const getAccessToCart = (accessCode: string): GetAccessToCartAction => ({
	type: ActionTypes.get_access_to_cart,
	accessCode,
});
export const getAccessToCartResult = (hasError: boolean, cart?: Cart): GetAccessToCartActionResult => ({
	type: ActionTypes.get_access_to_cart_result,
	hasError,
	cart,
});

export const reorderCart = (cartId: string, source: number, destination: number): ReorderCartAction => ({
	type: ActionTypes.reorder_cart,
	cartId,
	source,
	destination,
});
export const reorderCartResult = (hasError: boolean, source?: number, destination?: number): ReorderCartResultAction => ({
	type: ActionTypes.reorder_cart_result,
	hasError,
	source,
	destination,
});
