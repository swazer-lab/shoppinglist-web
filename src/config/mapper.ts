import morphism, { Schema } from 'morphism';
import _ from 'lodash';

import { CartItem, CartUser } from '../types/api';
import { get_photo_url } from './urls';

export const cartItemStatusMapper: any = {
	'active': 0,
	'completed': 1,
	'canceled': 2,
};

export const cartUserAccessLevelMapper: any = {
	'owner': 0,
	'write': 1,
	'read': 2,
};

export const profileMapper = (toApi: boolean = false) => {
	const mapper = {
		id: 'userId',

		name: 'name',
		email: 'email',
		isConfirmed: 'isConfirmed',

		phoneNumber: {
			path: 'mobile',
			fn: (value: string) => value !== null ? value : '',
		},

		photoUrl: {
			path: 'photoId',
			fn: (value: number) => value !== null ? get_photo_url(value) : undefined,
		},
	};
	const apiMapper = {
		userId: 'id',

		name: 'name',
		mobile: 'phoneNumber',
	};

	return toApi ? apiMapper : mapper;
};

export const cartMapper = (toApi: boolean = false): Schema => {
	const mapper: Schema = {
		id: 'cart.cartId',
		uuid: (): string => require('uuid/v4')(),

		title: 'cart.title',
		notes: 'cart.notes',
		date: 'cart.date',

		createdBy: {
			path: 'users',
			fn: (value: Array<any>) => value !== null ? morphism(cartUserMapper(), value.filter((user: any) => user.accessLevel === 0)[0]) : undefined,
		},
		items: {
			path: 'items',
			fn: (value: Array<any>) => value !== null ? morphism(cartItemMapper(), value) : undefined,
		},
		users: {
			path: 'users',
			fn: (value: Array<any>) => value !== null ? morphism(cartUserMapper(), value) : undefined,
		},
	};
	const apiMapper: Schema = {
		cartId: 'id',

		title: 'title',
		notes: 'notes',
		date: 'date',
		items: {
			path: 'items',
			fn: (value: Array<CartItem>): any => value !== null ? morphism(cartItemMapper(true), value) : undefined,
		},
		users: {
			path: 'users',
			fn: (value: Array<CartUser>): any => value !== null ? morphism(cartUserMapper(true), value) : undefined,
		},
	};

	return toApi ? apiMapper : mapper;
};

export const cartItemMapper = (toApi: boolean = false) => {
	const mapper = {
		id: 'itemId',
		uuid: () => require('uuid/v4')(),

		title: 'title',
		status: {
			path: 'status',
			fn: (value: any) => value !== null ? _.invert(cartItemStatusMapper)[value] : undefined,
		},
	};
	const apiMapper = {
		title: 'title',
		status: {
			path: 'status',
			fn: (value: string) => value !== null ? cartItemStatusMapper[value] : undefined,
		},
	};

	return toApi ? apiMapper : mapper;
};

export const cartUserMapper = (toApi: boolean = false): CartUser | any => {
	const mapper = {
		id: 'userId',
		uuid: () => require('uuid/v4')(),

		name: 'name',
		email: 'email',
		phone: 'mobile',

		photoUrl: {
			path: 'photoId',
			fn: (value: any) => value !== null ? get_photo_url(value) : undefined,
		},
		accessLevel: {
			path: 'accessLevel',
			fn: (value: any) => value !== null ? _.invert(cartUserAccessLevelMapper)[value] : undefined,
		},
	};
	const apiMapper = {
		userId: 'id',

		name: 'name',
		email: 'email',
		phone: 'phone',

		accessLevel: {
			path: 'accessLevel',
			fn: (value: string) => value !== null ? cartUserAccessLevelMapper[value] : undefined,
		},
	};

	return toApi ? apiMapper : mapper;
};
