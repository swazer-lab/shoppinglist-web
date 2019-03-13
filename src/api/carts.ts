/* @flow */

import axios from 'axios';
import { Cart } from '../types/api';

import * as urls from '../config/urls';

export const fetch_carts_api = (pageNumber?: number, pageSize?: number, searchQuery?: string) => {
	const config = {
		params: {
			currentPage: pageNumber,
			pageSize: pageSize,
			title: searchQuery,
		},
	};

	return axios.get(urls.fetch_carts_url, config);
};

export const create_cart_api = (cart: Cart) => {
	return axios.post(urls.create_cart_url, cart);
};

export const remove_cart_api = (cartId: string) => {
	const config = {
		params: {
			cartId,
		},
	};

	return axios.post(urls.remove_cart_url, null, config);
};


export const share_cart_with_contacts_api = (cartId: string, emails: Array<string>) => {
	const body = {
		cartId,
		emails
	};

	return axios.post(urls.share_cart_with_contacts_url, body);
};

