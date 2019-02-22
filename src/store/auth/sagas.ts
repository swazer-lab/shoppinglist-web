import { SagaIterator } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { ActionTypes } from './types';

function* loginSaga(): SagaIterator {

}

export default [
    takeLatest(ActionTypes.login, loginSaga),
];
