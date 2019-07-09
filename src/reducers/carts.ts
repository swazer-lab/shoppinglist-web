import { Action, ActionTypes, State, VisibilityFilter } from '../types/carts';
import { Cart, CartItem } from '../types/api';
import { array } from 'redux-immutable-helper';

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
		destinationCarts: [],

		visibilityFilter: VisibilityFilter.all,
		isCartUpdating: false,
		isCartCopying: false,
		isCartStatusChanging: false,

		searchQuery: '',

		filteredCarts: [],

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

				case ActionTypes.change_search_query:
						return {
								...state,
								searchQuery: action.searchQuery,
						};

				case ActionTypes.filter_carts_result:
						if (action.hasError) return state;
						return {
								...state,
								filteredCarts: action.carts,
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
				case ActionTypes.copy_cart_result:
				case ActionTypes.update_cart_result:
				case ActionTypes.pull_cart:
				case ActionTypes.push_cart:
				case ActionTypes.reorder_cart:
				case ActionTypes.reorder_cart_result:
				case ActionTypes.share_cart_with_contacts_result:
				case ActionTypes.get_access_to_cart_result:
						return {
								...state,
								carts: carts(state.carts, action),
						};

				case ActionTypes.change_visibility_filter:
						return {
								...state,
								visibilityFilter: action.visibilityFilter,
						};

				case ActionTypes.set_cart_updating:
						return {
								...state,
								isCartUpdating: action.isCartUpdating,
						};

				case ActionTypes.set_cart_status_changing:
						return {
								...state,
								isCartStatusChanging: action.isCartStatusChanging,
						};

				case ActionTypes.set_cart_copying:
						return {
								...state,
								isCartCopying: action.isCartCopying,
						};

				case ActionTypes.set_destination_carts:
						if (action.isDestinationCart) {
								console.log(action.cart.id);
								return {
										...state,
										destinationCarts: array(state.destinationCarts).push(action.cart!),
										carts: array(state.carts).remove(Number(action.cart.id))
								};
						} else {
								return {
										...state,
										destinationCarts: array(state.destinationCarts).remove(Number(action.cart.id)),
										carts: array(state.carts).push(action.cart!)
								};
						}

				case ActionTypes.clear_carts:
						return initialState;

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
				case ActionTypes.copy_cart_result:
						return [
								action.cart,
								...state,
						];
				case ActionTypes.update_cart_result:
						if (action.hasError) return state;

						return array(state).replace(cart => cart.id === action.cart.id, (prevCart: Cart) => ({
								...action.cart,
								uuid: prevCart.uuid,
						}));

				case ActionTypes.pull_cart:
						return [
								...state.slice(0, action.index),
								...state.slice(action.index + 1),
						];
				case ActionTypes.push_cart:
						return [
								...state.slice(0, action.index),
								action.cart,
								...state.slice((action.index)),
						];

				case ActionTypes.share_cart_with_contacts_result:
						if (action.hasError) return state;

						const shared_cart_index = state.findIndex((cart) => cart.id === action.cartId);

						return [
								...state.slice(0, shared_cart_index),
								{ ...state[0], users: action.cartUsers ? action.cartUsers : state[0].users },
								...state.slice(shared_cart_index + 1),
						];

				case ActionTypes.reorder_cart: {
						const movedCart = state[action.source];
						return array(array(state).remove(action.source)).insertBefore(action.destination, movedCart);
				}
				case ActionTypes.reorder_cart_result: {
						if (!action.hasError) return state;
						const movedCart = state[action.destination];
						return array(array(state).remove(action.destination)).insertBefore(action.source, movedCart);
				}

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
