import axios from 'axios';
import qs from 'qs';

import * as urls from '../config/urls';

export const register_api = (name: string, email: string, password: string): Promise<any> => {
	const body: any = {
		name,
		email,
		password,
	};

	return axios.post(urls.register_url, body);
};

export const login_external_api = (name: string, email: string, token: string, provider: string): Promise<any> => {
	const body: any = {
		name,
		email,
		token,
		provider,
	};

	return axios.post(urls.external_login_url, body);
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

export const confirm_email_api = (userId: string, token: string): Promise<any> => {
	const body = {
		userId,
		token,
	};

	return axios.post(urls.confirm_email_url, body);
};

export const update_password_api = (oldPassword: string, newPassword: string): Promise<any> => {
	const body = {
		oldPassword,
		newPassword,
	};

	return axios.post(urls.update_password_url, body);
};

export const resend_confirm_email_api = (userId: string): Promise<any> => {

	return axios.post(urls.resend_confirm_email_url(userId));
};

export const send_forgot_password_email_api = (email: string): Promise<any> => {
	const body = {
		email,
	};

	return axios.post(urls.forgot_password_url, body);
};
export const reset_password_api = (email: string, password: string, resetPasswordCode: string): Promise<any> => {
	const body = {
		password,
		email,
		code: resetPasswordCode,
	};

	return axios.post(urls.reset_password_url, body);
};
