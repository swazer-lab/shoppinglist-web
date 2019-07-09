import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetch_archieve_carts_api } from '../api/archieveCarts';
import { ActionTypes, FetchArchieveCardsAction } from '../types/archieveCarts';
import { FetchArchieveCardsResult } from '../actions/archieveCarts';
import { hideProgress, showHttpErrorAlert, showProgress } from '../actions/service';
import language from '../assets/language';
import morphism from 'morphism';
import { cartMapper } from '../config/mapper';

function* fetchArchieveCartsSaga(action: FetchArchieveCardsAction) {
		const { silent, pageNumber, append } = action;
		const pageSize = 15;

		if (!silent) yield put(showProgress(language.textFetchingCarts));

		try {
				const response = yield call(fetch_archieve_carts_api, pageNumber, pageSize);
				const { totalCount, items } = response.data;

				const carts = yield morphism(cartMapper(), items);

				yield put(FetchArchieveCardsResult(false, carts, totalCount, append));

		} catch (e) {
				yield all([
						put(FetchArchieveCardsResult(true)),
						put(showHttpErrorAlert(e)),

				]);
		} finally {
				if (!silent) yield put(hideProgress());
		}
}

export default [
		takeLatest(ActionTypes.fetch_archieve_cards, fetchArchieveCartsSaga),
];
