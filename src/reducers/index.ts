import { combineReducers } from 'redux';
import { AppState } from '../types/store';

import AuthReducer from './auth';

export default combineReducers<AppState>({
	auth: AuthReducer,
});
