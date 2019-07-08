import { Action as ReduxAction } from 'redux';
import { Cart, CartItem, CartUser } from './api';


export enum ActionTypes {
		add_archieve = 'CARTS__ADD_ARCHİEVE',
		add_archieve_result = 'CARTS__ADD_ARCHİEVE_RESULT',

		fetch_archieve_cards = 'CARTS__FETCH_ARCHİEVE_CARDS',
		fetch_archieve_cards_result = 'CARTS__FETCH_ARCHİEVE_CARDS_RESULT',
}

export interface ArchieveAction extends ReduxAction<ActionTypes> {
}

export interface ArchieveActionResult extends ArchieveAction {
		hasError: boolean,
}

export interface AddArchieveAction extends ArchieveAction {
		type: ActionTypes.add_archieve,
		cart?: Cart,

}

export interface AddArchieveActionResult extends ArchieveActionResult {
		type: ActionTypes.add_archieve_result,
		cart?: Cart,

}

export interface FetchArchieveCardsAction extends ArchieveAction {
		type:ActionTypes.fetch_archieve_cards,
		silent?: boolean,
		append?: 'replace' | 'merge',
		pageNumber?: number

}

export interface FetchArchieveCardsActionResult extends ArchieveActionResult{
		type:ActionTypes.fetch_archieve_cards_result,
		carts?:Cart[],
		totalCount?: number,
		append?: 'replace' | 'merge',
}

export type Action =
		& AddArchieveAction
		& AddArchieveActionResult
		& FetchArchieveCardsActionResult
		& FetchArchieveCardsAction

export type State = {
		carts: Cart[],

		isLoading: boolean,
		pageNumber: number,
		totalCount: number,
}


