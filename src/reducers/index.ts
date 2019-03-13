import { combineReducers } from 'redux';
import { AppState } from '../types/store';

import service from './service';
import auth from './auth';
import carts from './carts';
import profile from './profile';
import contacts from './contacts';

export default combineReducers<AppState>({
	service,
	auth,
	carts,
	profile,
	contacts
});
