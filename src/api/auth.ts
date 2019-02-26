import axios from 'axios';
import qs from 'qs';

import * as urls from '../config/urls';

export const register_api = (name: string, email: string, phone: string, password: string): Promise<any> => {
	const body: any = {
		name,
		email,
		mobile: phone,
		password,
	};

	return axios.post(urls.register_url, body);
};

export const login_api = (email: string, password: string): Promise<any> => {
	const headers: any = {
		'content-type': 'application/x-www-form-urlencoded',
	};
	const body: any = {
		grant_type: 'password',
		scope: 'oauth.shopping.swazer.com',
		userName: email,
		password,
	};

	return axios.post(urls.login_url, qs.stringify(body), headers);
};

