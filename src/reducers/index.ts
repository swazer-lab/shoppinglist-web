import { combineReducers } from 'redux';
import { AppState } from '../types/store';

import storage from 'redux-persist/es/storage';
import { persistReducer } from 'redux-persist';

import ServiceReducer from './service';
import AuthReducer from './auth';

const generateConfig = (reducer: Function, key: string, blacklist?: Array<string>, whitelist?: Array<string>) => {
	const config = {
		storage,

		key,
		blacklist,
		whitelist,
	};

	// @ts-ignore
	return persistReducer(config, reducer);
};

export default combineReducers<AppState>({
	service: ServiceReducer,
	auth: generateConfig(AuthReducer, '__auth', undefined, ['accessToken', 'isLoggedIn']),
});
