import {
		ActionTypes,
		FetchArchieveCardsAction,
		FetchArchieveCardsActionResult,
		PushArchiveCartsAction,
		PullArchiveCartsAction,
		ReorderArchivedCartAction,
		ReorderArchivedCartResultAction
} from '../types/archieveCarts';
import { Cart } from '../types/api';

export const pullArchiveCarts = (index: number): PullArchiveCartsAction => ({
		type: ActionTypes.pull_archive_carts,
		index,
});
export const pushArchiveCarts = (index: number, cart: Cart): PushArchiveCartsAction => ({
		type: ActionTypes.push_archive_carts,
		index,
		cart,
});

export const reorderArchivedCart = (cartId: string, source: number, destination: number): ReorderArchivedCartAction => ({
		type: ActionTypes.reorder_archived_cart,
		cartId,
		source,
		destination,
});

export const reorderAchivedCartResult = (hasError: boolean, source?: number, destination?: number): ReorderArchivedCartResultAction => ({
		type: ActionTypes.reorder_archived_cart_result,
		hasError,
		source,
		destination,
});

export const fetchArchieveCards = (silent?: boolean, append?: 'merge' | 'replace', pageNumber?: number): FetchArchieveCardsAction => ({
		type: ActionTypes.fetch_archieve_cards,
		silent,
		append,
		pageNumber,
});

export const fetchArchieveCardsResult = (hasError: boolean, carts?: Cart[],totalCount?: number, append?: 'replace' | 'merge'): FetchArchieveCardsActionResult => ({
		type: ActionTypes.fetch_archieve_cards_result,
		hasError,
		carts,
		totalCount,
		append,
});

