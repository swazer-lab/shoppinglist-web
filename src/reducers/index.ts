import { combineReducers } from 'redux';
import { AppState } from '../types/store';

import service from './service';
import auth from './auth';
import carts from './carts';

export default combineReducers<AppState>({
	service,
	auth,
	carts,
});
