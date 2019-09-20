import { Action, ActionTypes, State } from '../types/archieveCarts';
import { array } from 'redux-immutable-helper';

const initialState: State = {
		carts: [],
		isLoading: false,
		pageNumber: 0,
		totalCount: 0,
};

export default (state: State = initialState, action: Action): State => {
		switch (action.type) {
				case ActionTypes.fetch_archieve_cards:
						return {
								...state,
								isLoading: true,
								pageNumber: action.pageNumber || 1,
						};

				case ActionTypes.fetch_archieve_cards_result:
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

				case ActionTypes.pull_archive_carts:
						return {
								...state,
								carts: [
										...state.carts.slice(0, action.index),
										...state.carts.slice(action.index + 1)],
						};

				case ActionTypes.push_archive_carts:
						return {
								...state,
								carts: [
										...state.carts.slice(0, action.index),
										action.cart,
										...state.carts.slice(action.index)],
						};

				case ActionTypes.reorder_archived_cart: {
						const movedCart = state.carts[action.source];
						return {
								...state,
								carts: array(array(state.carts).remove(action.source)).insertBefore(action.destination, movedCart)
				    }
				}

				case ActionTypes.reorder_archived_cart_result: {
						if (!action.hasError) return state;
						const movedCart = state.carts[action.destination];
						return {
								...state,
								carts: array(array(state.carts).remove(action.destination)).insertBefore(action.source, movedCart)
				    }
				}

				default:
						return state;
		}

}



