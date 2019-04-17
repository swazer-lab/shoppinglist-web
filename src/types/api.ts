export interface Profile {
	id: string,

	name: string,
	email: string,
	phoneNumber: string,

	photoUrl?: string,
	avatarUrl?: string,
}

export type CartItemStatusType = 'active' | 'completed' | 'canceled';
export type CartUserAccessLevelType = 'owner' | 'write' | 'read';


export interface Cart {
	id: string,
	uuid: string,

	title: string,
	notes: string,
	reminderDate: string,

	items: Array<CartItem>,
	users: Array<CartUser>,
}

export interface CartItem {
	id: string,
	uuid: string,

	title: string,
	status: CartItemStatusType,
}

export interface CartUser {
	id: string,
	uuid: string,

	name: string,
	email: string,
	phone: string,

	photoUrl: string,
	accessLevel: CartUserAccessLevelType,
}
