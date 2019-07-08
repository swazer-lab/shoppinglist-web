import { Action, ActionTypes, State } from '../types/archieveCarts';
import array from 'redux-immutable-helper/lib/array';

const initialState: State = {
		carts: [],
		isLoading: false,
		pageNumber: 0,
		totalCount: 0,
};

export default (state: State = initialState, action: Action): State => {
		switch (action.type) {
				case ActionTypes.add_archieve_result:
						if (action.hasError) return state;
						return {
								...state,
								carts: array(state.carts).push(action.cart!),
						};

				case ActionTypes.fetch_archieve_cards:
						return {
								...state,
								isLoading: true,
								pageNumber: action.pageNumber || 1,
						};

				case ActionTypes.fetch_archieve_cards_result:
						if (action.hasError || !action.carts) return { ...state, isLoading: false };

						if (action.append === 'merge') {

								console.log('**********',state.carts, action.carts);

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

				default:
						return state;
		}

}



