import axios from 'axios';
import 'axios-response-logger';

export const updateDefaultHeaders = (accessToken?: string) => {
	// const language = require('../assets/language/index').default.getLanguage();

	axios.defaults.headers.common['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Accept'] = 'application/json';
	// axios.defaults.headers.common['Accept-Language'] = language || 'en';

	let auth = '';
	if (accessToken) {
		auth = accessToken;
	}
	axios.defaults.headers.common.Authorization = 'bearer ' + auth;
};

export { fetch_carts_api, create_cart_api, remove_cart_api } from './carts';
