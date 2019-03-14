import { morphism } from 'morphism';
import { SagaIterator } from 'redux-saga';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import { AppState } from '../types/store';

import { fetch_profile_api, update_profile_api, update_profile_photo_api } from '../api';
import { profileMapper } from '../config/mapper';
import { get_photo_url } from '../config/urls';

import { showProgress, hideProgress, showHttpErrorAlert } from '../actions/service';
import { fetchProfileResult, updateProfilePhotoResult, updateProfileResult } from '../actions/profile';

import language from '../assets/language';
import { ActionTypes, UpdateProfilePhotoAction } from '../types/profile';

function* fetchProfileSaga(): SagaIterator {
	yield put(showProgress(language.textFetchingProfile));

	try {
		const response = yield call(fetch_profile_api);
		const data = yield call(morphism, profileMapper(), response.data);

		yield put(fetchProfileResult(false, data));
	} catch (e) {
		yield all([
			put(fetchProfileResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* updateProfileSaga(): SagaIterator {
	const { draftProfile } = yield select((state: AppState) => state.profile);

	yield put(showProgress(language.textUpdatingProfile));

	try {
		const profile = yield call(morphism, profileMapper(true), draftProfile);
		yield call(update_profile_api, profile);

		yield put(updateProfileResult(false));
	} catch (e) {
		yield all([
			put(updateProfileResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

function* updateProfilePhotoSaga(action: UpdateProfilePhotoAction): SagaIterator {
	const { photoData } = action;
	yield put(showProgress(language.textUpdatingProfilePhoto));

	try {
		const response = yield call(update_profile_photo_api, photoData);
		const data = get_photo_url(response.data);

		yield put(updateProfilePhotoResult(false, data));
	} catch (e) {
		yield all([
			put(updateProfilePhotoResult(true)),
			put(showHttpErrorAlert(e)),
		]);
	} finally {
		yield put(hideProgress());
	}
}

export default [
	takeLatest(ActionTypes.fetch_profile, fetchProfileSaga),
	takeLatest(ActionTypes.update_profile, updateProfileSaga),
	takeLatest(ActionTypes.update_profile_photo, updateProfilePhotoSaga),
];
