import {
		ActionTypes,
		AddArchieveAction,
		AddArchieveActionResult,
		FetchArchieveCardsAction,
		FetchArchieveCardsActionResult,
} from '../types/archieveCarts';
import { Cart } from '../types/api';

export const AddArchieve = (cart?: Cart): AddArchieveAction => ({
		type: ActionTypes.add_archieve,
		cart,
});

export const AddArchieveResult = (hasError: boolean, cart?: Cart): AddArchieveActionResult => ({
		type: ActionTypes.add_archieve_result,
		hasError,
		cart,
});

export const FetchArchieveCards = (silent?: boolean, append?: 'merge' | 'replace', pageNumber?: number): FetchArchieveCardsAction => ({
		type: ActionTypes.fetch_archieve_cards,
		silent,
		append,
		pageNumber,
});

export const FetchArchieveCardsResult = (hasError: boolean, carts?: Cart[],totalCount?: number, append?: 'replace' | 'merge'): FetchArchieveCardsActionResult => ({
		type: ActionTypes.fetch_archieve_cards_result,
		hasError,
		carts,
		totalCount,
		append,
});

