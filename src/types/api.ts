export interface Profile {
	id: string,

	name: string,
	email: string,
	phone: string,

	photoUrl: string,
}

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
	status: 'active' | 'completed' | 'canceled',
}

export interface CartUser {
	uuid: string,

	name: string,
	email: string,
	phone: string,

	photoUrl: string,
	accessLevel: 'owner' | 'write' | 'read',
}
