import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';

export interface ReduxState {
    router: RouterState
}

export default (history: any) => combineReducers({
    router: connectRouter(history),
});
