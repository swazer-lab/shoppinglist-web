import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetch_archieve_carts_api } from '../api/archieveCarts';
import { ActionTypes, FetchArchieveCardsAction } from '../types/archieveCarts';
import { fetchArchieveCardsResult, reorderAchivedCartResult } from '../actions/archieveCarts';
import { hideProgress, showHttpErrorAlert, showProgress } from '../actions/service';
import language from '../assets/language';
import morphism from 'morphism';
import { cartMapper } from '../config/mapper';
import { ReorderArchivedCartAction } from '../types/archieveCarts';
import { update_carts_order_api } from '../api';

function* fetchArchieveCartsSaga(action: FetchArchieveCardsAction) {
		const { silent, pageNumber, append } = action;
		const pageSize = 15;

		if (!silent) yield put(showProgress(language.textFetchingCarts));

		try {
				const response = yield call(fetch_archieve_carts_api, pageNumber, pageSize);
				const { totalCount, items } = response.data;

				const carts = yield morphism(cartMapper(), items);

				yield put(fetchArchieveCardsResult(false, carts, totalCount, append));

		} catch (e) {
				yield all([
						put(fetchArchieveCardsResult(true)),
						put(showHttpErrorAlert(e)),

				]);
		} finally {
				if (!silent) yield put(hideProgress());
		}
}

function* reorderArchivedCartSaga(action: ReorderArchivedCartAction) {
		yield put(showProgress('Reordering Carts'));

		try {
				yield call(update_carts_order_api, action.cartId, action.destination);
				yield put(reorderAchivedCartResult(false));
		} catch (e) {
				yield all([
						put(reorderAchivedCartResult(true, action.source, action.destination)),
						put(showHttpErrorAlert(e)),
				]);
		} finally {
				yield put(hideProgress());
		}
}

export default [
		takeLatest(ActionTypes.fetch_archieve_cards, fetchArchieveCartsSaga),
		takeLatest(ActionTypes.reorder_archived_cart, reorderArchivedCartSaga)
];
