import { Action as ReduxAction } from 'redux';
import { Cart } from './api';

export enum ActionTypes {
		push_archive_carts = 'CARTS__PUSH_ARCHİEVE_CARTS',
		pull_archive_carts = 'CARTS__PULL_ARCHİEVE_CARTS',

		fetch_archieve_cards = 'CARTS__FETCH_ARCHİEVE_CARD',
		fetch_archieve_cards_result = 'CARTS__FETCH_ARCHİEVE_CARD_RESULT',

		reorder_archived_cart = 'CARTS_REORDER_ARCHIVED_CART',
		reorder_archived_cart_result = 'CARTS_REORDER_ARCHIVED_CART_RESULT'
}

export interface ArchieveAction extends ReduxAction<ActionTypes> {
}

export interface ArchieveActionResult extends ArchieveAction {
		hasError: boolean,
}


export interface PushArchiveCartsAction extends ArchieveAction {
		type: ActionTypes.push_archive_carts,
		index: number,
		cart: Cart
}

export interface PullArchiveCartsAction extends ArchieveAction {
		type: ActionTypes.pull_archive_carts,
		index: number,
}


export interface FetchArchieveCardsAction extends ArchieveAction {
		type: ActionTypes.fetch_archieve_cards,
		silent?: boolean,
		append?: 'replace' | 'merge',
		pageNumber?: number
}

export interface FetchArchieveCardsActionResult extends ArchieveActionResult {
		type: ActionTypes.fetch_archieve_cards_result,
		carts?: Cart[],
		totalCount?: number,
		append?: 'replace' | 'merge',
}

export interface ReorderArchivedCartAction extends ArchieveAction {
		type: ActionTypes.reorder_archived_cart,
		cartId: string,
		source: number,
		destination: number
}

export interface ReorderArchivedCartResultAction extends ArchieveActionResult {
		type: ActionTypes.reorder_archived_cart_result,
		source?: number,
		destination?: number
}

export type Action =
		& FetchArchieveCardsActionResult
		& FetchArchieveCardsAction
		& PushArchiveCartsAction
		& PullArchiveCartsAction
		& ReorderArchivedCartAction
		& ReorderArchivedCartResultAction

export type State = {
		carts: Cart[],

		isLoading: boolean,
		pageNumber: number,
		totalCount: number,
}


