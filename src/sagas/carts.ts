import morphism from 'morphism';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';

import {
		create_cart_api,
		fetch_carts_api,
		get_access_to_cart_api,
		remove_cart_api,
		search_carts_api,
		share_cart_with_contacts_api,
		update_carts_order_api,
} from '../api';
import { cartMapper, cartUserMapper } from '../config/mapper';

import { hideProgress, navigate, showAlert, showHttpErrorAlert, showProgress } from '../actions/service';
import {
		clearDraftCart,
		copyCartResult,
		createCartResult,
		fetchCartsResult,
		filterCartsResult,
		getAccessToCartResult,
		removeCartResult,
		reorderCartResult,
		setDestinationCartResult,
		setIsCartCopying,
		setIsCartStatusChanging,
		setIsCartUpdating,
		shareCartWithContactsResult,
		updateCartResult,
} from '../actions/carts';

import language from '../assets/language';
import {
		ActionTypes,
		CopyCartAction,
		FetchCartsAction,
		GetAccessToCartAction,
		RemoveCartAction,
		ReorderCartAction,
		SetDestinationCartAction,
		ShareCartWithContactsAction,
} from '../types/carts';
import { Profile } from '../types/api';
import { clearSelectedContacts } from '../actions/contacts';
import {set_destination_carts_api, set_destination_carts_revoke_api } from '../api/carts';

function* filterCartsSaga() {
		const { searchQuery } = yield select((state: AppState) => state.carts);
		if (searchQuery.length < 3) {
				yield put(filterCartsResult(false, []));
				return;
		}

		yield put(showProgress(language.textSearchingCarts));
		try {
				const response = yield call(search_carts_api, searchQuery);
				const { items } = response.data;

				const data = yield morphism(cartMapper(), items);

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

function* fetchCartsSaga(action: FetchCartsAction) {
		const { silent, pageNumber, append } = action;
		const pageSize = 15;

		if (!silent) yield put(showProgress(language.textFetchingCarts));

		try {
				const response = yield call(fetch_carts_api, pageNumber, pageSize);
				const { totalCount, items } = response.data;

				const carts = yield morphism(cartMapper(), items);

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

function* createCartSaga() {
		const { draftCart } = yield select((state: AppState) => state.carts);

		yield put(showProgress(language.textCreatingCart));
		try {
				const cart = yield morphism(cartMapper(true), draftCart);

				const response = yield call(create_cart_api, cart);
				const data = yield morphism(cartMapper(), response.data);

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

function* copyCartSaga(action: CopyCartAction) {

		const { title, notes, items } = yield select((state: AppState) => state.carts.draftCart);

		yield put(showProgress(language.textCopyingCart));

		if (!action.hasToShare) {
				try {
						const copiedCart = yield morphism(cartMapper(true), { title, notes, items });

						const response = yield call(create_cart_api, copiedCart);
						const data = yield morphism(cartMapper(), response.data);

						yield all([
								put(copyCartResult(false, data)),
								put(clearDraftCart()),
						]);
				} catch (e) {
						yield all([
								put(copyCartResult(true)),
								put(showHttpErrorAlert(e)),
						]);
				} finally {
						yield put(setIsCartCopying(false)),
								yield put(hideProgress());
				}
		} else {
				try {
						const { draftCart } = yield select((state: AppState) => state.carts);
						const cart = yield morphism(cartMapper(true), draftCart);
						cart.cartId = null;
						yield put(showProgress(language.textCopyingCart));
						const response = yield call(create_cart_api, cart);
						const responseData = yield morphism(cartMapper(), response.data);
						yield all([
								put(createCartResult(false, responseData)),
								put(clearDraftCart()),
						]);
				} catch (e) {
						yield all([
								put(updateCartResult(true)),
								put(showHttpErrorAlert(e)),
						]);
				} finally {
						yield put(setIsCartCopying(false)),
								yield put(hideProgress());
				}
		}
}

function* updateCartSaga() {
		const { draftCart } = yield select((state: AppState) => state.carts);
		yield put(showProgress(language.textUpdatingCart));

		try {
				const cart = yield morphism(cartMapper(true), draftCart);

				const response = yield call(create_cart_api, cart);
				const data = yield morphism(cartMapper(false), response.data);

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
				yield put(setIsCartUpdating(false)),
						yield put(setIsCartStatusChanging(false)),
						yield put(hideProgress());
		}
}

function* removeCartSaga(action: RemoveCartAction) {
		try {
				yield call(remove_cart_api, action.cart.id);
				yield put(removeCartResult(false, action.cart));
		} catch (e) {
				yield all([
						put(removeCartResult(true)),
						put(showHttpErrorAlert(e)),
				]);
		}
}

function* shareCartWithContactsSaga(action: ShareCartWithContactsAction) {
		const { cartId } = action;
		const { selectedContacts } = yield select((state: AppState) => state.contacts);

		const emails = selectedContacts.map((item: Profile) => item.email);

		if (selectedContacts.length === 0) {
				return;
		}

		yield put(showProgress(language.textSharingCarts));
		try {
				const response = yield call(share_cart_with_contacts_api, cartId, emails);
				const data = yield morphism(cartUserMapper(), response.data);
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

function* getAccessToCartSaga(action: GetAccessToCartAction) {
		const { isLoggedIn } = yield select((state: AppState) => state.storage);
		if (!isLoggedIn) yield put(navigate('Login'));

		yield put(showProgress(language.textAccessingCart));

		try {
				const response = yield call(get_access_to_cart_api, action.accessCode);
				const data = yield morphism(cartMapper(), response.data);

				yield all([
						put(getAccessToCartResult(false, data)),
						put(showAlert('success', '', language.textPersonAddingCart)),
						put(navigate('Carts')),
				]);
		} catch (e) {
				yield all([
						put(getAccessToCartResult(true)),
						put(showHttpErrorAlert(e)),
				]);
		} finally {
				yield put(hideProgress());
		}
}

function* reorderCartSaga(action: ReorderCartAction) {
		yield put(showProgress('Reordering Carts'));

		try {
				yield call(update_carts_order_api, action.cartId, action.destination);
				yield put(reorderCartResult(false));
		} catch (e) {
				yield all([
						put(reorderCartResult(true, action.source, action.destination)),
						put(showHttpErrorAlert(e)),
				]);
		} finally {
				yield put(hideProgress());
		}
}

function* setDestinationCartSaga(action: SetDestinationCartAction) {
		if (action.isFromCartsToArchive) {
				yield put(showProgress('This card is being archived card'));
				try {
						const response = yield call(set_destination_carts_api, action.cart.id);
						const data = yield morphism(cartMapper(), response.data);
						yield put(setDestinationCartResult(false, data));
				} catch (e) {
						yield all([
								put(showHttpErrorAlert(e)),
						]);
				} finally {
						yield put(hideProgress());
				}

		} else {
				yield put(showProgress('This card is being retrieved'));
				try {
						const response = yield call(set_destination_carts_revoke_api, action.cart.id);
						const data = yield morphism(cartMapper(), response.data);
						yield put(setDestinationCartResult(false, data));
				} catch (e) {
						yield all([
								put(showHttpErrorAlert(e)),
						]);
				} finally {
						yield put(hideProgress());

				}
		}
}

export default [
		takeLatest(ActionTypes.filter_carts, filterCartsSaga),
		takeLatest(ActionTypes.fetch_carts, fetchCartsSaga),
		takeLatest(ActionTypes.create_cart, createCartSaga),
		takeLatest(ActionTypes.update_cart, updateCartSaga),
		takeLatest(ActionTypes.remove_cart, removeCartSaga),
		takeLatest(ActionTypes.share_cart_with_contacts, shareCartWithContactsSaga),
		takeLatest(ActionTypes.get_access_to_cart, getAccessToCartSaga),
		takeLatest(ActionTypes.reorder_cart, reorderCartSaga),
		takeLatest(ActionTypes.copy_cart, copyCartSaga),
		takeLatest(ActionTypes.set_destination_carts, setDestinationCartSaga),
];
