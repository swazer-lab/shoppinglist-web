import { Action, ActionTypes, State } from '../types/carts';
import { Cart, CartItem } from '../types/api';

const initialState: State = {
	draftCart: {
		id: '',
		uuid: '',

		title: '',
		notes: '',
		reminderDate: '',

		items: [],
		users: [],
	},
	carts: [],

	isLoading: false,
	pageNumber: 0,
	totalCount: 0,
};

export default (state: State = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.change_draft_cart_title:
		case ActionTypes.change_draft_cart_notes:
		case ActionTypes.change_draft_cart_reminder_date:
		case ActionTypes.set_draft_cart:
		case ActionTypes.clear_draft_cart:
			return {
				...state,
				draftCart: draftCart(state.draftCart, action),
			};

		case ActionTypes.add_draft_cart_item:
		case ActionTypes.change_draft_cart_item_title:
		case ActionTypes.change_draft_cart_item_status:
		case ActionTypes.remove_draft_cart_item:
			return {
				...state,
				draftCart: {
					...state.draftCart,
					items: draftCartItems(state.draftCart.items, action),
				},
			};

		case ActionTypes.fetch_carts:
			return {
				...state,
				isLoading: true,
				pageNumber: action.pageNumber || 1,
			};
		case ActionTypes.fetch_carts_result:
			if (action.hasError || !action.carts) return { ...state, isLoading: false };
			if (action.append === 'merge') {
				return {
					...state,
					carts: [...state.carts, ...action.carts],

					isLoading: false,
					totalCount: action.totalCount || 0,
				};
			} else {
				return {
					...state,
					carts: [...action.carts],

					isLoading: false,
					totalCount: action.totalCount || 0,
				};
			}

		case ActionTypes.create_cart_result:
			return {
				...state,
				carts: carts(state.carts, action),
			};

		default:
			return state;
	}
}

export const carts = (state: Array<Cart> = initialState.carts, action: Action): Array<Cart> => {
	switch (action.type) {
		case ActionTypes.create_cart_result:
			return [
				action.cart,
				...state,
			];
		default:
			return state;
	}
};

export const draftCart = (state: Cart = initialState.draftCart, action: Action): Cart => {
	switch (action.type) {
		case ActionTypes.change_draft_cart_title:
			return {
				...state,
				title: action.title,
			};
		case ActionTypes.change_draft_cart_notes:
			return {
				...state,
				notes: action.notes,
			};
		case ActionTypes.change_draft_cart_reminder_date:
			return {
				...state,
				reminderDate: action.reminderDate,
			};

		case ActionTypes.set_draft_cart:
			return action.cart;
		case ActionTypes.clear_draft_cart:
			return initialState.draftCart;

		default:
			return state;
	}
};

export const draftCartItems = (state: Array<CartItem> = initialState.draftCart.items, action: Action): Array<CartItem> => {
	switch (action.type) {
		case ActionTypes.add_draft_cart_item:
			return [
				...state,
				{
					id: '',
					uuid: require('uuid/v4')(),
					title: '',
					status: 'active',
				},
			];
		case ActionTypes.change_draft_cart_item_title:
			return state.map(item => {
				if (item.uuid !== action.uuid) return item;

				return {
					...item,
					title: action.title,
				};
			});
		case ActionTypes.change_draft_cart_item_status:
			return state.map(item => {
				if (item.uuid !== action.uuid) return item;

				return {
					...item,
					status: action.status,
				};
			});
		case ActionTypes.remove_draft_cart_item:
			const removed_item_index = state.findIndex(item => item.uuid === action.uuid);
			return [
				...state.slice(0, removed_item_index),
				...state.splice(removed_item_index + 1),
			];

		default:
			return state;
	}
};
