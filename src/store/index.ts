// The top-level state object
//
import { State as AuthState } from './auth/types';

export interface AppState {
    auth: AuthState;
}

//
// Additional props for connected React components. This prop is passed by default with `connect()`
import { Dispatch, Action, AnyAction } from 'redux';

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

//
// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
import { combineReducers } from 'redux';
import AuthReducer from './auth/reducer';

export const rootReducer = (history: any) => combineReducers<AppState>({
    auth: AuthReducer,
});

//
// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
import { SagaIterator } from 'redux-saga';
import { all } from 'redux-saga/effects';
import AuthSagas from './auth/sagas';

export function* rootSaga(): SagaIterator {
    yield all([
        ...AuthSagas,
    ]);
}
