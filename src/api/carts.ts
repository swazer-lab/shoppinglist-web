/* @flow */

import axios from 'axios';
import { Cart } from '../types/api';

import * as urls from '../config/urls';

export const fetch_carts_api = (pageNumber?: number, pageSize?: number) => {
		const config = {
				params: {
						currentPage: pageNumber,
						pageSize: pageSize,
				},
		};

		return axios.get(urls.fetch_carts_url, config);
};

export const search_carts_api = (searchQuery?: string) => {
		const config = {
				params: {
						title: searchQuery,
				},
		};

		return axios.get(urls.search_carts_url, config);
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
				emails,
		};

		return axios.post(urls.share_cart_with_contacts_url, body);
};

export const get_access_to_cart_api = (getAccessCode: string) => {
		const body = {
				Id: getAccessCode,
		};

		return axios.post(urls.get_access_to_cart_url, body);
};

export const update_carts_order_api = (cartId: string, destination: number) => {
		const body = {
				cartId,
				destination,
		};

		return axios.post(urls.update_order_url, body);
};

export const set_destination_carts_api = (cartId: string) => {
		debugger;
		const body = {
				CartId: cartId,
		};

		return axios.post(urls.make_archived_url, body);
};

export const set_destination_carts_revoke_api = (cartId: string) => {
		debugger;
		const body = {
				CartId: cartId,
		};

		return axios.post(urls.revoke_archived_url, body);
};
