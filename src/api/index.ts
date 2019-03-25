import axios from 'axios';
import 'axios-response-logger';

export const updateDefaultHeaders = (accessToken?: string) => {
	const language = require('../assets/language/index').default.getLanguage();

	axios.defaults.headers.common['Content-Type'] = 'application/json';
	axios.defaults.headers.common['Accept'] = 'application/json';
	axios.defaults.headers.common['Accept-Language'] = language || 'en';

	let auth = '';
	if (accessToken) {
		auth = accessToken;
	}
	axios.defaults.headers.common.Authorization = 'bearer ' + auth;
};

export { register_api, login_api, confirm_email_api, send_forgot_password_email_api, reset_password_api, login_external_api } from './auth';
export { fetch_profile_api, update_profile_api, update_profile_photo_api } from './profile';
export {
	fetch_carts_api, create_cart_api, remove_cart_api, share_cart_with_contacts_api, get_access_to_cart_api,
	search_carts_api,
}from './carts';
export { fetch_contacts_api } from './contacts';
