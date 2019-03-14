import morphism from 'morphism';

import { SagaIterator } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetch_contacts_api} from '../api';
import { profileMapper } from '../config/mapper';

import { showProgress, hideProgress, showHttpErrorAlert } from '../actions/service';
import {
	fetchContactsResult
} from '../actions/contacts';

import { ActionTypes, FetchContactsAction } from '../types/contacts';
import language from '../assets/language';

function* fetchContactsSaga(action: FetchContactsAction): SagaIterator {
	const { silent, pageNumber, append } = action;
	const pageSize = 15;

	if (!silent) yield put(showProgress(language.textFetchingContacts));

	try {
		const response = yield call(fetch_contacts_api, pageNumber, pageSize);
		const { totalCount, items } = response.data;

		const contacts = yield call(morphism, profileMapper(), items);
		yield put(fetchContactsResult(false, contacts, totalCount, append));
	} catch (e) {
		yield all([
			put(fetchContactsResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		if (!silent) yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.fetch_contacts, fetchContactsSaga)
];