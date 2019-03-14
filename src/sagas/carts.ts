import morphism from 'morphism';

import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';

import { fetch_carts_api, create_cart_api, remove_cart_api, share_cart_with_contacts_api } from '../api';
import { cartMapper, cartUserMapper } from '../config/mapper';

import { showProgress, hideProgress, showHttpErrorAlert } from '../actions/service';
import {
	createCartResult,
	fetchCartsResult,
	clearDraftCart,
	removeCartResult,
	updateCartResult,
	filterCartsResult,
	shareCartWithContactsResult
} from '../actions/carts';

import language from '../assets/language';
import { ActionTypes, FetchCartsAction, RemoveCartAction, ShareCartWithContactsAction } from '../types/carts';
import { Profile } from '../types/api';
import { clearSelectedContacts } from '../actions/contacts';

function* filterCartsSaga(): SagaIterator {
	const { searchQuery } = yield select((state: AppState) => state.carts);
	if (searchQuery.length < 3) return;

	const pageNumber = 1;
	const pageSize = 15;

	yield put(showProgress(language.textSearchingCarts));
	try {
		const response = yield call(fetch_carts_api, pageNumber, pageSize, searchQuery);
		const data = yield call(morphism, cartMapper(), response.data.items);

		yield put(filterCartsResult(false, data));
	} catch (e) {
		yield all([
			put(filterCartsResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

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

function* updateCartSaga() {
	const { draftCart } = yield select((state: AppState) => state.carts);

	yield put(showProgress(language.textUpdatingCart));

	try {
		const cart = yield call(morphism, cartMapper(true), draftCart);

		const response = yield call(create_cart_api, cart);
		const data = yield call(morphism, cartMapper(false), response.data);

		yield all([
			put(updateCartResult(false, { ...data, uuid: draftCart.uuid })),
			put(clearDraftCart()),
		]);
	} catch (e) {
		yield all([
			put(updateCartResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* removeCartSaga(action: RemoveCartAction): SagaIterator {
	yield put(showProgress(language.textRemovingCart));

	try {
		yield call(remove_cart_api, action.cart.id);

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

function* shareCartWithContactsSaga(action: ShareCartWithContactsAction): SagaIterator {
	const { cartId} = action;
	const { selectedContacts } = yield select((state: AppState) => state.contacts);

	const emails = selectedContacts.map((item: Profile) => item.email);

	if (selectedContacts.length === 0) {
		return;
	}

	yield put(showProgress(language.textSharingCarts));
	try {
		const response = yield call(share_cart_with_contacts_api, cartId, emails);
		const data = yield call(morphism, cartUserMapper(), response.data);

		yield put(shareCartWithContactsResult(false, cartId, data));

	} catch (e) {
		yield all([
			put(shareCartWithContactsResult(true)),
			put(showHttpErrorAlert(e)),
		]);

	} finally {
		yield all([
			put(hideProgress()),
			put(clearSelectedContacts()),
		]);
	}
}

export default [
	takeLatest(ActionTypes.filter_carts, filterCartsSaga),
	takeLatest(ActionTypes.fetch_carts, fetchCartsSaga),
	takeLatest(ActionTypes.create_cart, createCartSaga),
	takeLatest(ActionTypes.update_cart, updateCartSaga),
	takeLatest(ActionTypes.remove_cart, removeCartSaga),
	takeLatest(ActionTypes.share_cart_with_contacts, shareCartWithContactsSaga)
];
