import morphism from 'morphism';

import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';
import { CartItem } from '../types/api';

import { fetch_carts_api, create_cart_api, remove_cart_api } from '../api';
import { cartMapper } from '../config/mapper';

import { showProgress, hideProgress, showAlert, showHttpErrorAlert } from '../actions/service';
import { createCartResult, fetchCartsResult, clearDraftCart, removeCartResult } from '../actions/carts';

import { ActionTypes, FetchCartsAction, RemoveCartAction } from '../types/carts';
import language from '../assets/language';

function* fetchCartsSaga(action: FetchCartsAction): SagaIterator {
	const { silent, pageNumber, append } = action;
	const pageSize = 15;

	if (!silent) yield put(showProgress(language.textFetchingCarts));

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

	yield put(showProgress(language.textCreatingCart));
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

function* removeCartSaga(action: RemoveCartAction): SagaIterator {
	yield put(showProgress(language.textCreatingCart));

	try {
		yield call(remove_cart_api, action.cart.id);

		console.log(action.cart);

		yield put(removeCartResult(false, action.cart));
	} catch (e) {
		yield all([
			put(removeCartResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.fetch_carts, fetchCartsSaga),
	takeLatest(ActionTypes.create_cart, createCartSaga),
	takeLatest(ActionTypes.remove_cart, removeCartSaga)
];
