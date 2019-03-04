import morphism from 'morphism';

import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';
import { CartItem } from '../types/api';

import { fetch_carts_api, create_cart_api } from '../api';
import { cartMapper } from '../config/mapper';

import { showProgress, hideProgress, showAlert, showHttpErrorAlert } from '../actions/service';
import { createCartResult, fetchCartsResult, clearDraftCart } from '../actions/carts';

import { ActionTypes, FetchCartsAction } from '../types/carts';

function* fetchCartsSaga(action: FetchCartsAction): SagaIterator {
	const { silent, pageNumber, append } = action;
	const pageSize = 15;

	if (!silent) yield put(showProgress('Fetching Carts'));

	try {
		const response = yield call(fetch_carts_api, pageNumber, pageSize);
		const { totalCount, items } = response.data;

		const carts = yield call(morphism, cartMapper(), items);
		yield put(fetchCartsResult(false, carts, totalCount, append));
	} catch (e) {
		yield all([
			put(fetchCartsResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		if (!silent) yield put(hideProgress());
	}
}

function* createCartSaga(): SagaIterator {
	const { draftCart } = yield select((state: AppState) => state.carts);

	if (draftCart && !draftCart.title) {
		yield put(showAlert('info', 'Cart Title Required'));
		return;
	}
	if (draftCart.items.length > 0 && draftCart.items.filter((item: CartItem) => item.title === '').length > 0) {
		yield put(showAlert('info', 'Cart Item Title Required'));
		return;
	}

	yield put(showProgress('Creating Cart'));
	try {
		const cart = yield call(morphism, cartMapper(true), draftCart);

		const response = yield call(create_cart_api, cart);
		const data = yield call(morphism, cartMapper(), response.data);

		yield all([
			put(createCartResult(false, data)),
			put(clearDraftCart()),
		]);
	} catch (e) {
		yield all([
			put(createCartResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.fetch_carts, fetchCartsSaga),
	takeLatest(ActionTypes.create_cart, createCartSaga),
];
