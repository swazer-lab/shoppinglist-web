import { combineReducers } from 'redux';
import { AppState } from '../types/store';

import service from './service';
import auth from './auth';
import carts from './carts';
import profile from './profile';

export default combineReducers<AppState>({
	service,
	auth,
	carts,
	profile
});
