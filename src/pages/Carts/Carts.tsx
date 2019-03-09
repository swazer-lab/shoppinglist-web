import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../types/store';
import { Cart } from '../../types/api';

import CreateCart from './CreateCart';
import CartObject from './CartObject';

import { fetchCarts } from '../../actions/carts';
import { useLocalStorage } from '../../config/utilities';

interface Props {
	dispatch: Function,

	carts: Array<Cart>,
	draftCart: Cart,

	isLoading: boolean,
	totalCount: number,
	pageNumber: number,
}

const Carts = (props: Props) => {
	const { dispatch, carts, isLoading, totalCount, pageNumber } = props;

	useEffect(() => {
		const { isLoggedIn } = useLocalStorage();
		if (isLoggedIn) dispatch(fetchCarts(false, 'merge', 1));
	}, []);

	useEffect(() => {
		const onScroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !isLoading && carts.length < totalCount)
				dispatch(fetchCarts(false, 'merge', pageNumber + 1));
		};

		window.addEventListener('scroll', onScroll, false);
		return () => {
			window.removeEventListener('scroll', onScroll, false);
		};
	}, []);

	const renderCarts = () => carts.map(cart => (<CartObject key={cart.uuid} cart={cart}/>));

	return (
		<div>
			<CreateCart/>
			{renderCarts()}
		</div>
	);
};

const mapStateToProps = (state: AppState) => {
	const { carts, isLoading, totalCount, pageNumber } = state.carts;

	return {
		carts,

		isLoading,
		totalCount,
		pageNumber,
	};
};

export default connect(mapStateToProps)(Carts);
