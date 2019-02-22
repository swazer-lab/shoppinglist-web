import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from '../reducers';
import sagas from '../sagas';

const browserHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewareList = [routerMiddleware(browserHistory), sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewareList.push(logger);
}

const store = createStore(
    createRootReducer(browserHistory),
    compose(applyMiddleware(...middlewareList)),
);
sagaMiddleware.run(sagas);

export default store;
